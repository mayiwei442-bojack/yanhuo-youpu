import assert from "node:assert/strict";
import { chinese, western } from "../recipe_data.mjs";

const refreshedRecipes = [...chinese, ...western].filter((recipe) => recipe.media);
const repeatedPunctuation = /，，|。。|；；|、、|，。|；。|。；/u;
const orphanQualifier = /^(另取|另备|可选作|用于装饰|作装饰|分次使用)(?:少许|适量)?/u;

function balanced(text, open, close) {
  let depth = 0;
  for (const character of text) {
    if (character === open) depth += 1;
    if (character === close) depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}

function assertBalanced(text, label) {
  assert(balanced(text, "（", "）"), `${label} 的中文括号不配对`);
  assert(balanced(text, "(", ")"), `${label} 的英文括号不配对`);
}

for (const recipe of refreshedRecipes) {
  assertBalanced(recipe.ingredients, `${recipe.name} ingredients`);
  assert(!repeatedPunctuation.test(recipe.ingredients), `${recipe.name} ingredients 含异常重复或相邻标点`);
  assert(!repeatedPunctuation.test(recipe.steps), `${recipe.name} steps 含异常重复或相邻标点`);

  const ingredientRows = recipe.ingredients.split(/[；;]/u);
  assert(ingredientRows.every((row) => row.trim()), `${recipe.name} 含空食材行`);
  ingredientRows.forEach((rawRow, index) => {
    const row = rawRow.trim();
    const label = `${recipe.name} 第 ${index + 1} 个食材行`;
    assertBalanced(row, label);
    assert(!orphanQualifier.test(row), `${label} 是脱离食材名称的说明：${row}`);
    assert(!/^[）)、，；]/u.test(row), `${label} 以孤立标点开头：${row}`);
    assert(!/[（(]$/u.test(row), `${label} 以未完成括号结尾：${row}`);
  });

  const numberedSteps = [...recipe.steps.matchAll(/(\d+)[）)]/gu)];
  assert(numberedSteps.length >= 2, `${recipe.name} 少于 2 个步骤`);
  numberedSteps.forEach((match, index) => {
    assert.equal(Number(match[1]), index + 1, `${recipe.name} 步骤编号不连续`);
  });
  const stepRows = recipe.steps.split(/(?=\d+[）)])/u).map((row) => row.trim()).filter(Boolean);
  stepRows.forEach((row, index) => {
    const instruction = row.replace(/^\d+[）)]\s*/u, "");
    assertBalanced(instruction, `${recipe.name} 第 ${index + 1} 步`);
  });
  assert(recipe.steps.trim().endsWith("。"), `${recipe.name} 最后一步缺少句号`);
}

console.log(JSON.stringify({
  ok: true,
  check: "adversarial_recipe_language",
  refreshedRecipes: refreshedRecipes.map((recipe) => recipe.name)
}, null, 2));
