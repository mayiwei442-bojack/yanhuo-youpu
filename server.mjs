import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createAiService } from "./src/server/ai-service.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));

try {
  const envFile = await readFile(join(root, ".env"), "utf8");
  envFile.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
    if (!match || match[1] in process.env) return;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  });
} catch (error) {
  if (error?.code !== "ENOENT") console.warn("未能读取 .env，继续使用系统环境变量");
}

const port = Number(process.env.PORT || 8787);
const aiService = createAiService(process.env);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const pathSegments = pathname.split("/").filter(Boolean);
  if (
    pathSegments.some((segment) => segment.startsWith("."))
    || ["/server.mjs", "/package.json", "/vercel.json"].includes(pathname)
    || pathname.startsWith("/api/")
    || pathname.startsWith("/src/server/")
  ) {
    response.writeHead(404, aiService.securityHeaders("text/plain; charset=utf-8"));
    return response.end("Not found");
  }

  const filePath = normalize(join(root, pathname.replace(/^[/\\]+/, "")));
  if (relative(root, filePath).startsWith("..")) {
    response.writeHead(403, aiService.securityHeaders("text/plain; charset=utf-8"));
    return response.end("Forbidden");
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("Not a file");
    const content = await readFile(filePath);
    response.writeHead(200, {
      ...aiService.securityHeaders(mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream"),
      "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404, aiService.securityHeaders("text/plain; charset=utf-8"));
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (url.pathname === "/healthz") return aiService.handleHealth(request, response);
    if (url.pathname.startsWith("/api/ai/")) {
      return await aiService.handleRoute(request, response, url.pathname.slice("/api/ai/".length));
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return aiService.sendServiceError(
        response,
        "METHOD_NOT_ALLOWED",
        "不支持的请求方法",
        405,
        {},
        { Allow: "GET, HEAD, POST" }
      );
    }
    return await serveStatic(request, response);
  } catch (error) {
    return aiService.handleError(response, error);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`烟火有谱已启动：http://127.0.0.1:${port}`);
  console.log(aiService.configured ? `DeepSeek 已配置：${aiService.model}` : "DeepSeek 未配置：AI 功能会明确不可用，不回退本机规则");
  console.log(aiService.visionConfigured ? `通义千问视觉已配置：${aiService.visionModel}` : "通义千问视觉未配置：照片识别会明确不可用，不上传照片");
});

function closeServer() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
