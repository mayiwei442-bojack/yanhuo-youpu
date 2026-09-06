import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRecipeCatalog, splitRecipeIngredients, splitRecipeSteps } from "./recipe-state.mjs";

const REQUIRED_FIELDS = ["name", "en", "region", "ingredients", "steps", "img", "source"];
const STABLE_TARGET_FIELDS = ["name", "en", "region", "img", "source"];

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function validateRecipeChange({ beforeSnapshot, currentCatalog, targetId, requireChange = false }) {
  const errors = [];
  const checks = [];
  const beforeCatalog = beforeSnapshot?.recipes;
  if (!Array.isArray(beforeCatalog)) {
    return { ok: false, targetId, checks, errors: ["编辑前快照缺少 recipes 数组"] };
  }

  const currentIds = currentCatalog.map((item) => item.id);
  checks.push({ name: "unique_ids", passed: new Set(currentIds).size === currentIds.length });
  if (!checks.at(-1).passed) errors.push("菜谱 ID 重复");

  const targetMatches = currentCatalog.filter((item) => item.id === targetId);
  checks.push({ name: "target_exists_once", passed: targetMatches.length === 1 });
  if (targetMatches.length !== 1) errors.push(`目标 ${targetId} 应存在且唯一，实际 ${targetMatches.length} 条`);

  const beforeById = new Map(beforeCatalog.map((item) => [item.id, item]));
  const currentById = new Map(currentCatalog.map((item) => [item.id, item]));
  if (beforeById.size !== currentById.size) errors.push("菜谱总数发生变化");

  for (const item of currentCatalog) {
    for (const field of REQUIRED_FIELDS) {
      if (typeof item.record?.[field] !== "string" || !item.record[field].trim()) {
        errors.push(`${item.id} 缺少必要字段 ${field}`);
      }
    }
  }
  checks.push({ name: "required_fields", passed: !errors.some((error) => error.includes("缺少必要字段")) });

  const target = targetMatches[0];
  const beforeTarget = beforeById.get(targetId);
  if (!beforeTarget) errors.push(`编辑前快照中不存在目标 ${targetId}`);
  if (target && beforeTarget) {
    const ingredientCount = splitRecipeIngredients(target.record.ingredients).length;
    const stepCount = splitRecipeSteps(target.record.steps).length;
    checks.push({ name: "target_name", passed: Boolean(target.record.name.trim()) });
    checks.push({ name: "target_ingredients", passed: ingredientCount > 0, count: ingredientCount });
    checks.push({ name: "target_steps", passed: stepCount >= 2, count: stepCount });
    if (!target.record.name.trim()) errors.push("目标菜名为空");
    if (ingredientCount === 0) errors.push("目标 ingredients 为空");
    if (stepCount < 2) errors.push(`目标 steps 至少需要 2 条，实际 ${stepCount} 条`);

    for (const field of STABLE_TARGET_FIELDS) {
      if (!same(target.record[field], beforeTarget.record[field])) {
        errors.push(`目标稳定字段 ${field} 被修改`);
      }
    }
    checks.push({
      name: "stable_target_fields",
      passed: STABLE_TARGET_FIELDS.every((field) => same(target.record[field], beforeTarget.record[field]))
    });
    if (requireChange && same(target.record, beforeTarget.record)) errors.push("目标菜谱内容没有发生变化");
    checks.push({ name: "target_changed", passed: !same(target.record, beforeTarget.record), required: requireChange });
  }

  const unrelatedChanges = [];
  for (const [id, before] of beforeById) {
    if (id === targetId) continue;
    const current = currentById.get(id);
    if (!current || !same(current, before)) unrelatedChanges.push(id);
  }
  checks.push({ name: "target_only_diff", passed: unrelatedChanges.length === 0, changed: unrelatedChanges });
  if (unrelatedChanges.length) errors.push(`目标外菜谱发生变化：${unrelatedChanges.join(", ")}`);

  return { ok: errors.length === 0, targetId, checks, errors };
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
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

async function main() {
  const targetId = option("--target");
  const beforePath = option("--before");
  if (!targetId || !beforePath) {
    throw new Error("用法：npm run rag:validate -- --target <cn-001> --before <snapshot.json> [--require-change] [--full]");
  }
  const beforeSnapshot = JSON.parse(await readFile(resolve(process.cwd(), beforePath), "utf8"));
  const validation = validateRecipeChange({
    beforeSnapshot,
    currentCatalog: createRecipeCatalog(),
    targetId,
    requireChange: process.argv.includes("--require-change")
  });
  const commands = [];
  if (validation.ok) {
    commands.push(run(process.execPath, ["tools/build_html_demo_data.mjs"]));
    const generated = await readFile(resolve(process.cwd(), "data/recipes.js"), "utf8");
    const targetName = createRecipeCatalog().find((item) => item.id === targetId)?.record.name;
    const generatedCheck = { name: "generated_target_exists", passed: Boolean(targetName && generated.includes(targetName)) };
    validation.checks.push(generatedCheck);
    if (!generatedCheck.passed) validation.errors.push("生成后的 data/recipes.js 中找不到目标菜谱");
  }
  if (validation.errors.length === 0 && process.argv.includes("--full")) {
    commands.push(run(process.execPath, ["tools/test_html_demo.mjs"]));
    commands.push(run(process.execPath, ["tools/build_vercel_output.mjs"]));
  }
  validation.commands = commands;
  validation.ok = validation.errors.length === 0 && commands.every((item) => item.passed);
  for (const command of commands.filter((item) => !item.passed)) {
    validation.errors.push(`命令失败：${command.command}`);
  }
  console.log(JSON.stringify(validation, null, 2));
  if (!validation.ok) process.exitCode = 1;
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedDirectly) await main();
