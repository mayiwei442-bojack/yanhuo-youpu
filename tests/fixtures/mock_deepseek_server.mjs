import { createServer } from "node:http";

const port = Number(process.env.MOCK_DEEPSEEK_PORT || 8792);
const requests = [];

function json(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/healthz") return json(response, 200, { ok: true });
  if (request.method === "GET" && request.url === "/requests") return json(response, 200, { requests });
  if (request.method !== "POST" || request.url !== "/chat/completions") return json(response, 404, { error: { message: "Not found" } });
  const allowedKeys = new Set(["Bearer test-deepseek-key", "Bearer test-qwen-key"]);
  if (!allowedKeys.has(request.headers.authorization)) return json(response, 401, { error: { message: "Invalid test key" } });

  const body = await readJson(request);
  requests.push(body);
  const system = String(body.messages?.find((message) => message.role === "system")?.content || "");
  let result;
  if (system.includes("厨房食材结构化助手")) {
    result = {
      ingredients: [
        { name: "番茄", canonicalId: "tomato", quantity: 2, unit: "个", confidence: 0.99 },
        { name: "鸡蛋", canonicalId: "eggs", quantity: 3, unit: "个", confidence: 0.98 },
        { name: "洋葱", canonicalId: "onion", quantity: 0.5, unit: "颗", confidence: 0.97 }
      ],
      needsConfirmation: true
    };
  } else if (system.includes("菜谱推荐解释助手")) {
    result = {
      summary: "现有核心食材与这道菜高度匹配，可以直接进入准备。",
      bullets: ["核心食材覆盖充分", "步骤适合当前食材篮", "仍需按实际配料检查安全提醒"],
      caveat: "AI 只解释推荐依据，排序与过敏原仍由产品逻辑校验。"
    };
  } else if (system.includes("中西餐食材替换建议助手")) {
    result = {
      suggestions: [
        { ingredientId: "eggplant", name: "茄子", type: "texture", note: "可以提供柔软口感，但风味和传统做法会明显变化。" }
      ],
      note: "替换后请按实际使用配料重新检查过敏原和忌口。"
    };
  } else if (system.includes("厨房食材照片识别助手")) {
    result = {
      ingredients: [
        { name: "番茄", canonicalId: "tomato", quantity: 2, unit: "个", confidence: 0.93 },
        { name: "鸡蛋", canonicalId: "eggs", quantity: null, unit: "份", confidence: 0.88 }
      ],
      needsConfirmation: true
    };
  } else {
    return json(response, 400, { error: { message: "Unknown test prompt" } });
  }

  json(response, 200, {
    id: `mock-${requests.length}`,
    object: "chat.completion",
    model: body.model,
    choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: JSON.stringify(result) } }],
    usage: { prompt_tokens: 120, completion_tokens: 60, total_tokens: 180 }
  });
});

server.listen(port, "127.0.0.1", () => console.log(`Mock DeepSeek listening on ${port}`));

function close() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", close);
process.on("SIGINT", close);
