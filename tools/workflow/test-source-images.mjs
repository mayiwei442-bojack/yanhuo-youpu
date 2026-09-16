import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { chinese, western } from "../recipe_data.mjs";

const recipes = [...chinese, ...western];
const refreshed = recipes.filter((recipe) => recipe.media);

async function assertLocalImage(recipeName, label, mediaItem) {
  assert.match(mediaItem?.path || "", /^assets\/dishes\/sources\//u, `${recipeName}: ${label} 不是受管仓库路径`);
  assert.doesNotMatch(mediaItem.path, /^https?:/u, `${recipeName}: ${label} 仍在运行时加载原始外链`);
  assert.match(mediaItem?.originalUrl || "", /^https:\/\//u, `${recipeName}: ${label} 缺少 HTTPS 来源 provenance`);
  const absolute = resolve(mediaItem.path);
  const fileStat = await stat(absolute);
  assert(fileStat.isFile() && fileStat.size > 0, `${recipeName}: ${label} 本地文件缺失或为空`);
  const bytes = await readFile(absolute);
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes.at(-2) === 0xff && bytes.at(-1) === 0xd9;
  const png = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const webp = bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  assert(jpeg || png || webp, `${recipeName}: ${label} 不是有效 JPEG/PNG/WebP 文件`);
}

for (const recipe of refreshed) {
  const stepCount = recipe.steps.split(/(?=\d+[）)])/u).map((part) => part.trim()).filter(Boolean).length;
  assert.equal(recipe.media.recipePageUrl, recipe.source, `${recipe.name}: 媒体菜谱 URL 与正文主信源不一致`);
  assert.equal(recipe.media.repositoryCopyAuthorization, "user_confirmed_2026-09-16", `${recipe.name}: 缺少用户授权记录`);
  assert(Array.isArray(recipe.media.steps) && recipe.media.steps.length >= 1, `${recipe.name}: 没有本地步骤图`);
  assert(recipe.media.steps.length <= stepCount, `${recipe.name}: 步骤图数量超过公开步骤`);
  assert.equal(new Set(recipe.media.steps.map((item) => item.stepOrder)).size, recipe.media.steps.length, `${recipe.name}: 步骤图序号重复`);
  await assertLocalImage(recipe.name, "成品图", recipe.media.hero);
  for (const item of recipe.media.steps) {
    assert(Number.isInteger(item.stepOrder) && item.stepOrder >= 1 && item.stepOrder <= stepCount, `${recipe.name}: 第 ${item.stepOrder} 张步骤图序号越界`);
    await assertLocalImage(recipe.name, `第 ${item.stepOrder} 步图片`, item);
  }
}

console.log(JSON.stringify({ ok: true, refreshedRecipes: refreshed.length }, null, 2));
