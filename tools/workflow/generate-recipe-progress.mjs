import { readFile, writeFile } from "node:fs/promises";
import { chinese, western } from "../recipe_data.mjs";

const outputUrl = new URL("../../workflow/recipe-progress.json", import.meta.url);
const allowedStatuses = new Set(["pending", "in_progress", "done", "failed"]);

function recipeId(category, index) {
  const prefix = category === "chinese" ? "cn" : "west";
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

async function readExistingProgress() {
  try {
    return JSON.parse(await readFile(outputUrl, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return { chinese: [], western: [] };
    throw error;
  }
}

function buildCategory(category, recipes, existingEntries) {
  const existingById = new Map(
    (Array.isArray(existingEntries) ? existingEntries : []).map((entry) => [entry.id, entry])
  );

  return recipes.map((recipe, index) => {
    const id = recipeId(category, index);
    const existing = existingById.get(id);
    const canPreserve = existing?.name === recipe.name && allowedStatuses.has(existing?.status);
    return {
      id,
      name: recipe.name,
      status: canPreserve ? existing.status : "pending",
      lastRunId: canPreserve && typeof existing.lastRunId === "string" ? existing.lastRunId : null,
      completedAt: canPreserve && typeof existing.completedAt === "string" ? existing.completedAt : null
    };
  });
}

const existing = await readExistingProgress();
const progress = {
  chinese: buildCategory("chinese", chinese, existing.chinese),
  western: buildCategory("western", western, existing.western)
};
const output = `${JSON.stringify(progress, null, 2)}\n`;

if (process.argv.includes("--check")) {
  const current = await readFile(outputUrl, "utf8").catch(() => "");
  if (current !== output) {
    console.error("workflow/recipe-progress.json 与 tools/recipe_data.mjs 不一致，请运行 npm run rag:state:generate");
    process.exitCode = 1;
  } else {
    console.log(`recipe-progress.json 已同步：${progress.chinese.length + progress.western.length} 道菜。`);
  }
} else {
  await writeFile(outputUrl, output, "utf8");
  console.log(`Generated recipe progress for ${progress.chinese.length + progress.western.length} recipes.`);
}
