import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chinese, western } from "../recipe_data.mjs";

const rootUrl = new URL("../../", import.meta.url);
const allowedProgressStatuses = new Set(["pending", "in_progress", "done", "failed"]);
const expectedRunSteps = ["research", "ingestion", "edit", "validator", "review", "build", "gitPush"];

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, rootUrl), "utf8"));
}

function expectedId(category, index) {
  return `${category === "chinese" ? "cn" : "west"}-${String(index + 1).padStart(3, "0")}`;
}

function validateProgressCategory(category, recipes, entries, seenIds, seenNames) {
  assert(Array.isArray(entries), `${category} progress 必须是数组`);
  assert.equal(entries.length, recipes.length, `${category} progress 数量与 canonical source 不一致`);

  entries.forEach((entry, index) => {
    const recipe = recipes[index];
    assert.deepEqual(
      Object.keys(entry),
      ["id", "name", "status", "lastRunId", "completedAt"],
      `${category}[${index}] 字段不符合 Spec`
    );
    assert.equal(entry.id, expectedId(category, index), `${category}[${index}] ID 不稳定`);
    assert.equal(entry.name, recipe.name, `${entry.id} 名称与 tools/recipe_data.mjs 不一致`);
    assert(allowedProgressStatuses.has(entry.status), `${entry.id} 状态非法`);
    assert(entry.lastRunId === null || typeof entry.lastRunId === "string", `${entry.id} lastRunId 非法`);
    assert(entry.completedAt === null || !Number.isNaN(Date.parse(entry.completedAt)), `${entry.id} completedAt 非法`);
    assert(!seenIds.has(entry.id), `重复 recipe ID：${entry.id}`);
    assert(!seenNames.has(entry.name), `重复 recipe name：${entry.name}`);
    seenIds.add(entry.id);
    seenNames.add(entry.name);
  });
}

function validateSources(sourceConfig) {
  assert.deepEqual(Object.keys(sourceConfig), ["chinese", "western"], "source-config 顶层分类非法");
  const seen = new Set();
  for (const category of ["chinese", "western"]) {
    assert(Array.isArray(sourceConfig[category]), `${category} source config 必须是数组`);
    assert(sourceConfig[category].length > 0, `${category} 至少需要一个来源`);
    for (const source of sourceConfig[category]) {
      assert.deepEqual(Object.keys(source), ["name", "baseUrl", "enabled"], `${category} 来源字段非法`);
      assert.equal(typeof source.name, "string", "来源名称必须是字符串");
      assert(source.name.trim(), "来源名称不能为空");
      const url = new URL(source.baseUrl);
      assert.equal(url.protocol, "https:", `${source.name} 必须使用 HTTPS`);
      assert.equal(typeof source.enabled, "boolean", `${source.name} enabled 必须是布尔值`);
      assert(!seen.has(url.origin), `重复来源域名：${url.origin}`);
      seen.add(url.origin);
    }
  }
}

function validateRunLogSchema(schema) {
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(schema.type, "object");
  for (const key of [
    "runId", "recipeId", "recipeName", "category", "status", "startedAt", "completedAt",
    "steps", "sources", "errors", "branch", "commit"
  ]) {
    assert(schema.required.includes(key), `run log schema 缺少 required 字段：${key}`);
    assert(schema.properties[key], `run log schema 缺少属性定义：${key}`);
  }
  assert.equal(schema.properties.branch.const, "codex/recipe-automation");
  assert.deepEqual(schema.properties.category.enum, ["chinese", "western"]);
  assert.deepEqual(schema.properties.status.enum, ["in_progress", "done", "failed"]);
  assert.deepEqual(schema.properties.steps.required, expectedRunSteps);
  for (const step of expectedRunSteps) {
    assert(schema.properties.steps.properties[step], `run log schema 缺少步骤：${step}`);
  }
  assert.deepEqual(schema.$defs.step.properties.status.enum, ["pending", "in_progress", "done", "failed"]);
  assert.equal(schema.$defs.step.properties.attempts.minimum, 0);
}

const [progress, sourceConfig, runLogSchema] = await Promise.all([
  readJson("workflow/recipe-progress.json"),
  readJson("workflow/source-config.json"),
  readJson("workflow/schemas/run-log.schema.json")
]);

assert.deepEqual(Object.keys(progress), ["chinese", "western"], "recipe-progress 顶层分类非法");
const seenIds = new Set();
const seenNames = new Set();
validateProgressCategory("chinese", chinese, progress.chinese, seenIds, seenNames);
validateProgressCategory("western", western, progress.western, seenIds, seenNames);
assert.equal(progress.chinese[0].id, "cn-001");
assert.equal(progress.chinese[0].name, "番茄炒蛋");
validateSources(sourceConfig);
validateRunLogSchema(runLogSchema);

console.log(JSON.stringify({
  ok: true,
  phase: 1,
  recipes: seenIds.size,
  chinese: progress.chinese.length,
  western: progress.western.length,
  enabledSources: [...sourceConfig.chinese, ...sourceConfig.western].filter((source) => source.enabled).length,
  firstRecipe: progress.chinese[0]
}, null, 2));
