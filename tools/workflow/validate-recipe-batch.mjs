import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { createRecipeCatalog } from "./recipe-state.mjs";
import { validateRecipeChange } from "./validate-recipe.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: process.cwd(), encoding: "utf8", shell: false });
  return {
    command: [command, ...args].join(" "),
    passed: result.status === 0,
    status: result.status,
    stdout: result.stdout?.trim() || "",
    stderr: result.stderr?.trim() || ""
  };
}

const targetIds = (option("--targets") || "").split(",").map((id) => id.trim()).filter(Boolean);
const beforePath = option("--before");
if (!targetIds.length || !beforePath) {
  throw new Error("用法：node tools/workflow/validate-recipe-batch.mjs --targets cn-010,cn-024 --before <snapshot.json> [--full]");
}

const beforeSnapshot = JSON.parse(await readFile(resolve(process.cwd(), beforePath), "utf8"));
const currentCatalog = createRecipeCatalog();
const targetSet = new Set(targetIds);
const currentById = new Map(currentCatalog.map((item) => [item.id, item]));
const beforeById = new Map(beforeSnapshot.recipes.map((item) => [item.id, item]));
const errors = [];
const targetResults = [];

for (const before of beforeSnapshot.recipes) {
  const current = currentById.get(before.id);
  if (!targetSet.has(before.id) && !same(before, current)) errors.push(`允许列表外菜谱发生变化：${before.id}`);
}

for (const targetId of targetIds) {
  if (!beforeById.has(targetId) || !currentById.has(targetId)) {
    errors.push(`目标不存在：${targetId}`);
    continue;
  }
  if (same(beforeById.get(targetId), currentById.get(targetId))) errors.push(`目标没有变化：${targetId}`);
  const isolatedBefore = structuredClone(beforeSnapshot);
  for (const recipe of isolatedBefore.recipes) {
    if (recipe.id !== targetId && targetSet.has(recipe.id)) Object.assign(recipe, structuredClone(currentById.get(recipe.id)));
  }
  const result = validateRecipeChange({ beforeSnapshot: isolatedBefore, currentCatalog, targetId, requireChange: true });
  targetResults.push(result);
  if (!result.ok) errors.push(...result.errors.map((error) => `${targetId}: ${error}`));
}

const commands = [];
if (!errors.length) commands.push(run(process.execPath, ["tools/build_html_demo_data.mjs"]));
if (!errors.length && commands.every((command) => command.passed) && process.argv.includes("--full")) {
  commands.push(run(process.execPath, ["tools/test_html_demo.mjs"]));
  commands.push(run(process.execPath, ["tools/build_vercel_output.mjs"]));
}
for (const command of commands.filter((item) => !item.passed)) errors.push(`命令失败：${command.command}`);

const result = {
  ok: errors.length === 0,
  phase: 6,
  mode: "explicit_initial_batch",
  targets: targetIds,
  unrelatedRecipesUnchanged: !errors.some((error) => error.startsWith("允许列表外")),
  targetResults,
  commands,
  errors
};
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
