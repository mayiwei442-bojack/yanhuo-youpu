import assert from "node:assert/strict";
import { chinese, western } from "../recipe_data.mjs";

const recipes = [...chinese, ...western];
const refreshed = recipes.filter((recipe) => recipe.media);

for (const recipe of refreshed) {
  const stepCount = recipe.steps.split(/(?=\d+[）)])/u).map((part) => part.trim()).filter(Boolean).length;
  assert.equal(recipe.media.recipePageUrl, recipe.source, `${recipe.name}: 媒体菜谱 URL 与正文主信源不一致`);
  assert.match(recipe.media.hero?.url || "", /^https:\/\//u, `${recipe.name}: 成品图不是 HTTPS 原始外链`);
  assert.equal(recipe.media.steps?.length, stepCount, `${recipe.name}: 步骤图数量与公开步骤不一致`);
  assert.equal(new Set(recipe.media.steps.map((item) => item.stepOrder)).size, stepCount, `${recipe.name}: 步骤图序号重复`);
  for (const [index, item] of recipe.media.steps.entries()) {
    assert.equal(item.stepOrder, index + 1, `${recipe.name}: 第 ${index + 1} 张步骤图顺序错误`);
    assert.match(item.url || "", /^https:\/\//u, `${recipe.name}: 第 ${index + 1} 张步骤图不是 HTTPS 原始外链`);
  }
}

console.log(JSON.stringify({ ok: true, refreshedRecipes: refreshed.length }, null, 2));
