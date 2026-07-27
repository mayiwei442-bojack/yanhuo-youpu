import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const mockPort = 8794;
let mockServer;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`服务没有按时启动：${url}`);
}

async function stop(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    once(child, "exit"),
    new Promise((resolveWait) => setTimeout(resolveWait, 3000))
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.body = "";
    this.ended = false;
  }

  writeHead(status, headers = {}) {
    this.statusCode = status;
    for (const [key, value] of Object.entries(headers)) this.headers[key.toLowerCase()] = String(value);
    return this;
  }

  end(body = "") {
    this.body = body === undefined ? "" : String(body);
    this.ended = true;
    return this;
  }
}

async function invoke(handler, {
  operation,
  method = "POST",
  body,
  origin = "https://yanhuo-preview.vercel.app"
} = {}) {
  const response = new MockResponse();
  const request = {
    method,
    url: operation ? `/api/ai/${operation}` : "/api/healthz",
    query: operation ? { operation } : {},
    body,
    headers: {
      host: "yanhuo-preview.vercel.app",
      origin,
      "x-forwarded-host": "yanhuo-preview.vercel.app",
      "x-forwarded-for": "203.0.113.18"
    },
    socket: { remoteAddress: "127.0.0.1" }
  };
  await handler(request, response);
  assert(response.ended, `${request.url} 没有结束响应`);
  const json = JSON.parse(response.body || "{}");
  return { response, json };
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

try {
  mockServer = spawn(process.execPath, ["tools/mock_deepseek_server.mjs"], {
    cwd: process.cwd(),
    env: { ...process.env, MOCK_DEEPSEEK_PORT: String(mockPort) },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  mockServer.stdout.on("data", (chunk) => process.stdout.write(chunk));
  mockServer.stderr.on("data", (chunk) => process.stderr.write(chunk));
  await waitFor(`http://127.0.0.1:${mockPort}/healthz`);

  process.env.VERCEL = "1";
  process.env.DEEPSEEK_API_KEY = "test-deepseek-key";
  process.env.DEEPSEEK_MODEL = "deepseek-v4-flash";
  process.env.DEEPSEEK_BASE_URL = `http://127.0.0.1:${mockPort}`;
  process.env.AI_RATE_LIMIT_PER_MINUTE = "50";

  const [{ default: aiHandler }, { default: healthHandler }] = await Promise.all([
    import("../api/ai/[operation].mjs"),
    import("../api/healthz.mjs")
  ]);

  const health = await invoke(healthHandler, { method: "GET" });
  assert(health.response.statusCode === 200, "Vercel 健康检查失败");
  assert(health.json.runtime === "vercel", "健康检查没有识别 Vercel 运行环境");
  assert(health.json.aiConfigured === true, "健康检查没有识别 DeepSeek 配置");

  const status = await invoke(aiHandler, { operation: "status", method: "GET" });
  assert(status.response.statusCode === 200, "Vercel AI 状态接口失败");
  assert(status.json.data?.configured === true, "Vercel AI 状态未显示已配置");
  assert(status.json.data?.model === "deepseek-v4-flash", "Vercel AI 状态模型不正确");

  const ingredientCatalog = [
    { id: "tomato", name: "番茄" },
    { id: "eggs", name: "鸡蛋" },
    { id: "onion", name: "洋葱" },
    { id: "eggplant", name: "茄子" }
  ];
  const parsed = await invoke(aiHandler, {
    operation: "parse-ingredients",
    body: { text: "两个番茄、三个鸡蛋和半颗洋葱", ingredientCatalog }
  });
  assert(parsed.response.statusCode === 200, `Vercel 食材解析失败：${parsed.response.body}`);
  assert(parsed.json.data?.ingredients?.length === 3, "Vercel 食材解析结果不正确");

  const explanation = await invoke(aiHandler, {
    operation: "explain-recommendation",
    body: { recipe: { id: "cn-001", name: "番茄炒蛋" }, pantry: ["tomato", "eggs"], matchResult: { score: 100 } }
  });
  assert(explanation.response.statusCode === 200, `Vercel 推荐解释失败：${explanation.response.body}`);
  assert(explanation.json.data?.bullets?.length > 0, "Vercel 推荐解释内容为空");

  const substitutions = await invoke(aiHandler, {
    operation: "suggest-substitutions",
    body: {
      ingredientCatalog,
      recipe: { id: "cn-003", name: "麻婆豆腐" },
      missingIngredient: { canonicalId: "tofu", name: "豆腐" },
      preferences: { restrictions: [], allergens: [] }
    }
  });
  assert(substitutions.response.statusCode === 200, `Vercel 食材替换失败：${substitutions.response.body}`);
  assert(substitutions.json.data?.suggestions?.[0]?.ingredientId === "eggplant", "Vercel 食材替换结果未通过目录校验");

  const blockedOrigin = await invoke(aiHandler, {
    operation: "parse-ingredients",
    origin: "https://unrelated.example",
    body: { text: "番茄", ingredientCatalog }
  });
  assert(blockedOrigin.response.statusCode === 403, "Vercel 函数没有阻止跨站 AI 调用");

  const wrongMethod = await invoke(aiHandler, { operation: "status", method: "POST", body: {} });
  assert(wrongMethod.response.statusCode === 405, "Vercel 状态接口没有限制请求方法");

  const providerRequests = await fetch(`http://127.0.0.1:${mockPort}/requests`).then((response) => response.json());
  assert(providerRequests.requests.length === 3, "Vercel 函数没有完整覆盖三项 DeepSeek 文本能力");

  const vercelConfig = JSON.parse(await readFile("vercel.json", "utf8"));
  assert(vercelConfig.outputDirectory === "dist", "Vercel 静态输出目录不是 dist");
  assert(vercelConfig.rewrites?.some((item) => item.source === "/healthz" && item.destination === "/api/healthz"), "Vercel 健康检查重写缺失");
  assert(!JSON.stringify(vercelConfig).includes("DEEPSEEK_API_KEY"), "vercel.json 不应包含 DeepSeek 密钥");

  const publicFiles = [
    "dist/index.html",
    "dist/src/js/app.js",
    "dist/src/styles/app.css",
    "dist/data/recipes.js",
    "dist/assets/dishes/thumbnails/01-fanqie-chaodan.jpg"
  ];
  for (const file of publicFiles) assert(await fileExists(resolve(file)), `Vercel 静态产物缺少 ${file}`);

  const privateFiles = [
    "dist/.env",
    "dist/.env.example",
    "dist/server.mjs",
    "dist/package.json",
    "dist/vercel.json",
    "dist/src/server/ai-service.mjs"
  ];
  for (const file of privateFiles) assert(!await fileExists(resolve(file)), `Vercel 静态产物错误公开了 ${file}`);

  const originals = await readdir(resolve("dist/assets/dishes/ai"));
  const thumbnails = await readdir(resolve("dist/assets/dishes/thumbnails"));
  const originalImageCount = originals.filter((file) => /\.(png|jpg|jpeg)$/i.test(file)).length;
  const thumbnailImageCount = thumbnails.filter((file) => /\.(png|jpg|jpeg)$/i.test(file)).length;
  assert(originalImageCount === 90, "Vercel 构建没有包含 90 张菜品原图");
  assert(thumbnailImageCount === 90, "Vercel 构建没有包含 90 张菜品缩略图");

  const allBodies = [health, status, parsed, explanation, substitutions].map((item) => item.response.body).join("\n");
  assert(!allBodies.includes("test-deepseek-key"), "Vercel 响应泄露了 DeepSeek 密钥");

  console.log(JSON.stringify({
    ok: true,
    runtime: "vercel",
    staticOutput: "dist",
    deepseekCalls: providerRequests.requests.length,
    publicDishImages: {
      originals: originalImageCount,
      thumbnails: thumbnailImageCount
    },
    secretsExposed: false
  }, null, 2));
} finally {
  await stop(mockServer);
}
