import { spawn } from "node:child_process";
import { once } from "node:events";

const mockPort = 8792;
const appPort = 8791;
const children = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function start(script, env) {
  const child = spawn(process.execPath, [script], {
    cwd: process.cwd(),
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  children.push(child);
  return child;
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`服务没有按时启动：${url}`);
}

async function stop(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    once(child, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3000))
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

try {
  start("tools/mock_deepseek_server.mjs", { MOCK_DEEPSEEK_PORT: String(mockPort) });
  await waitFor(`http://127.0.0.1:${mockPort}/healthz`);

  start("server.mjs", {
    PORT: String(appPort),
    DEEPSEEK_API_KEY: "test-deepseek-key",
    DEEPSEEK_MODEL: "deepseek-v4-flash",
    DEEPSEEK_BASE_URL: `http://127.0.0.1:${mockPort}`,
    // 本用例只验证纯文本配置；显式置空避免本机 .env 里的视觉密钥影响断言
    QWEN_API_KEY: "",
    AI_RATE_LIMIT_PER_MINUTE: "50",
    TRUST_PROXY: "false"
  });
  await waitFor(`http://127.0.0.1:${appPort}/healthz`);

  const statusResponse = await fetch(`http://127.0.0.1:${appPort}/api/ai/status`);
  const status = await statusResponse.json();
  assert(status.data?.configured === true, "模拟 DeepSeek 状态未显示已配置");
  assert(status.data?.provider === "deepseek", "AI 提供方不是 DeepSeek");
  assert(status.data?.model === "deepseek-v4-flash", "DeepSeek 模型配置错误");
  assert(status.data?.capabilities?.vision === false, "DeepSeek 文本接口不应声称支持照片");

  const browserTest = spawn(process.execPath, ["tools/test_html_demo.mjs"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DEMO_URL: `http://127.0.0.1:${appPort}/index.html`,
      EXPECT_DEEPSEEK: "1"
    },
    stdio: "inherit",
    windowsHide: true
  });
  const [browserExitCode] = await once(browserTest, "exit");
  assert(browserExitCode === 0, `DeepSeek 浏览器流程测试失败：${browserExitCode}`);

  const requestLog = await fetch(`http://127.0.0.1:${mockPort}/requests`).then((response) => response.json());
  assert(requestLog.requests.length >= 3, "没有覆盖三项 DeepSeek 文字能力");
  requestLog.requests.forEach((request) => {
    assert(request.model === "deepseek-v4-flash", "请求使用了错误的 DeepSeek 模型");
    assert(request.response_format?.type === "json_object", "请求没有启用 DeepSeek JSON Output");
    assert(request.thinking?.type === "disabled", "常规结构化任务没有关闭深度思考");
    assert(request.stream === false, "结构化接口不应使用流式返回");
  });

  const blockedEnv = await fetch(`http://127.0.0.1:${appPort}/.env`);
  const blockedServer = await fetch(`http://127.0.0.1:${appPort}/server.mjs`);
  assert(blockedEnv.status === 404, ".env 可被静态访问");
  assert(blockedServer.status === 404, "server.mjs 可被静态访问");

  console.log(JSON.stringify({
    ok: true,
    provider: "deepseek",
    model: "deepseek-v4-flash",
    mockedCalls: requestLog.requests.length,
    visionSupported: false,
    secretsExposed: false
  }, null, 2));
} finally {
  await Promise.all(children.reverse().map(stop));
}
