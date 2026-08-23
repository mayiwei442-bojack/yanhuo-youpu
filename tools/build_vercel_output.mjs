import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputRoot = resolve(projectRoot, "dist");

if (dirname(outputRoot) !== projectRoot) {
  throw new Error(`拒绝清理项目目录之外的构建路径：${outputRoot}`);
}

const copies = [
  ["index.html", "index.html"],
  ["assets", "assets"],
  ["data", "data"],
  ["src/js", "src/js"],
  ["src/styles", "src/styles"]
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const [source, destination] of copies) {
  await cp(resolve(projectRoot, source), resolve(outputRoot, destination), {
    recursive: true,
    force: true
  });
}

const requiredFiles = [
  "index.html",
  "src/js/app.js",
  "src/js/future-services.js",
  "src/styles/app.css",
  "data/recipes.js",
  "data/ingredients.js"
];

for (const file of requiredFiles) {
  const info = await stat(resolve(outputRoot, file));
  if (!info.isFile()) throw new Error(`Vercel 构建缺少必要文件：${file}`);
}

// 生成 Vercel Build Output（.vercel/output）：静态文件交给平台静态层分发，
// AI 后端以 api/ 无服务器函数运行。避免整站被识别为自定义服务器入口后
// 打包成单个函数、静态文件全部丢失的问题。
const vercelOutputRoot = resolve(projectRoot, ".vercel", "output");
const staticRoot = resolve(vercelOutputRoot, "static");
const functionsRoot = resolve(vercelOutputRoot, "functions");

await rm(vercelOutputRoot, { recursive: true, force: true });
await mkdir(vercelOutputRoot, { recursive: true });
await cp(outputRoot, staticRoot, { recursive: true, force: true });

const aiServiceSource = resolve(projectRoot, "src/server/ai-service.mjs");
const aiServiceCode = await readFile(aiServiceSource, "utf8");

async function writeFunction(functionDir, handlerSource) {
  const target = resolve(functionsRoot, functionDir);
  await mkdir(target, { recursive: true });
  const handlerCode = await readFile(handlerSource, "utf8");
  const rewritten = handlerCode.replace(
    /from\s+["']\.\.(?:\/\.\.)?\/src\/server\/ai-service\.mjs["']/g,
    "from \"./ai-service.mjs\""
  );
  if (rewritten === handlerCode) throw new Error(`函数入口未按预期引用 ai-service：${functionDir}`);
  await writeFile(resolve(target, "index.mjs"), rewritten);
  await writeFile(resolve(target, "ai-service.mjs"), aiServiceCode);
  await writeFile(resolve(target, ".vc-config.json"), `${JSON.stringify({
    runtime: "nodejs24.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    maxDuration: 60
  }, null, 2)}\n`);
}

await writeFunction("api/healthz.func", resolve(projectRoot, "api/healthz.mjs"));
await writeFunction("api/ai/[operation].func", resolve(projectRoot, "api", "ai", "[operation].mjs"));

const outputConfig = {
  version: 3,
  routes: [
    {
      src: "/(.*)",
      headers: {
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
        "permissions-policy": "camera=(self), microphone=(), geolocation=()",
        "content-security-policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
      },
      continue: true
    },
    { src: "/healthz", dest: "/api/healthz" },
    { handle: "filesystem" }
  ]
};
await writeFile(resolve(vercelOutputRoot, "config.json"), `${JSON.stringify(outputConfig, null, 2)}\n`);

console.log(`Vercel 静态构建完成：${outputRoot}`);
console.log(`Vercel Build Output 已生成：${vercelOutputRoot}`);
