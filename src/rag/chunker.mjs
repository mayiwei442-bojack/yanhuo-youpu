import { sha256 } from "./normalize.mjs";

export const CHUNK_TYPES = Object.freeze(["summary", "ingredients", "steps", "technique", "tips"]);

function chunkRecord(recipe, chunkType, chunkIndex, content, extraMetadata = {}) {
  return {
    chunk_type: chunkType,
    chunk_index: chunkIndex,
    content,
    content_hash: sha256(content),
    metadata: {
      recipeName: recipe.recipeName,
      category: recipe.category,
      cuisine: recipe.cuisine,
      sourceType: recipe.source.type,
      sourceName: recipe.source.name,
      sourceUrl: recipe.source.url,
      bookTitle: recipe.source.bookTitle,
      pageStart: recipe.source.pageStart,
      pageEnd: recipe.source.pageEnd,
      location: recipe.source.location,
      ...extraMetadata
    }
  };
}

function splitStepGroups(recipe, maxChars) {
  const groups = [];
  let current = [];
  let length = 0;
  for (const step of recipe.steps) {
    const line = `${step.order}. ${step.instruction}${step.duration ? `（${step.duration}）` : ""}${step.heat ? `【${step.heat}】` : ""}`;
    if (current.length && length + line.length > maxChars) {
      groups.push(current);
      current = [];
      length = 0;
    }
    current.push(line);
    length += line.length;
  }
  if (current.length) groups.push(current);
  return groups;
}

export function chunkRecipe(recipe, { maxStepChars = 1200 } = {}) {
  const summaryParts = [
    `菜名：${recipe.recipeName}`,
    recipe.aliases.length ? `别名：${recipe.aliases.join("、")}` : "",
    recipe.cuisine ? `菜系：${recipe.cuisine}` : "",
    recipe.summary ? `简介：${recipe.summary}` : ""
  ].filter(Boolean);
  const chunks = [chunkRecord(recipe, "summary", 0, summaryParts.join("\n"))];

  chunks.push(chunkRecord(
    recipe,
    "ingredients",
    0,
    [`菜名：${recipe.recipeName}`, ...recipe.ingredients.map((item) => `- ${item.raw}`)].join("\n"),
    { evidence: recipe.ingredients.map((item) => item.evidence) }
  ));

  splitStepGroups(recipe, maxStepChars).forEach((group, index) => {
    chunks.push(chunkRecord(recipe, "steps", index, [`菜名：${recipe.recipeName}`, ...group].join("\n")));
  });

  const derivedTechnique = recipe.steps.flatMap((step) => [step.duration, step.heat].filter(Boolean));
  const techniques = [...recipe.technique.map((item) => item.text), ...derivedTechnique];
  chunks.push(chunkRecord(recipe, "technique", 0, [
    `菜名：${recipe.recipeName}`,
    ...(techniques.length ? techniques.map((text) => `- ${text}`) : ["- 原文未明确说明技法。"])
  ].join("\n"), { sourceFieldPresent: techniques.length > 0 }));

  chunks.push(chunkRecord(recipe, "tips", 0, [
    `菜名：${recipe.recipeName}`,
    ...(recipe.tips.length ? recipe.tips.map((item) => `- ${item.text}`) : ["- 原文未提供额外提示。"])
  ].join("\n"), { sourceFieldPresent: recipe.tips.length > 0 }));

  return chunks;
}
