import { chinese, western } from "../recipe_data.mjs";

const GROUPS = [
  ["chinese", "cn", chinese],
  ["western", "west", western]
];

export function createRecipeCatalog(groups = GROUPS) {
  return groups.flatMap(([category, prefix, recipes]) => recipes.map((recipe, index) => ({
    id: `${prefix}-${String(index + 1).padStart(3, "0")}`,
    category,
    index,
    record: structuredClone(recipe)
  })));
}

export function createRecipeSnapshot(catalog = createRecipeCatalog()) {
  return {
    schemaVersion: 1,
    source: "tools/recipe_data.mjs",
    createdAt: new Date().toISOString(),
    recipes: catalog
  };
}

export function splitRecipeSteps(text) {
  const value = String(text || "");
  const boundaries = [];
  let depth = 0;
  let expected = 1;
  for (let index = 0; index < value.length; index += 1) {
    if (depth === 0 && /\d/u.test(value[index])) {
      const marker = value.slice(index).match(/^(\d+)[）)]/u);
      if (marker && Number(marker[1]) === expected) {
        boundaries.push(index);
        expected += 1;
        index += marker[0].length - 1;
        continue;
      }
    }
    if (value[index] === "（" || value[index] === "(") depth += 1;
    if (value[index] === "）" || value[index] === ")") depth = Math.max(0, depth - 1);
  }
  if (!boundaries.length) return value.trim() ? [value.trim()] : [];
  if (boundaries[0] !== 0 && value.slice(0, boundaries[0]).trim()) boundaries.unshift(0);
  return boundaries.map((start, index) => value.slice(start, boundaries[index + 1] ?? value.length).trim()).filter(Boolean);
}

export function splitRecipeIngredients(text) {
  return String(text || "").split(/[；;]/u).map((part) => part.trim()).filter(Boolean);
}
