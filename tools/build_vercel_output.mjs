import { cp, mkdir, rm, stat } from "node:fs/promises";
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

console.log(`Vercel 静态构建完成：${outputRoot}`);
