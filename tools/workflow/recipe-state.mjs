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
  return String(text || "").split(/(?=\d+[）)])/u).map((part) => part.trim()).filter(Boolean);
}

export function splitRecipeIngredients(text) {
  return String(text || "").split(/[；;]/u).map((part) => part.trim()).filter(Boolean);
}
