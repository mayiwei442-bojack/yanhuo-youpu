// Linked component recipes carry dietary risks, not their cooking times.
export function applyComponentDietaryMetadata(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const finished = new Set();
  const visiting = new Set();
  function visit(recipe) {
    if (finished.has(recipe.id)) return;
    if (visiting.has(recipe.id)) throw new Error(`关联菜谱存在循环：${recipe.id}`);
    visiting.add(recipe.id);
    for (const link of recipe.recipeLinks || []) {
      const target = byId.get(link.recipeId);
      if (!target || target.name !== link.name) throw new Error(`关联菜谱不存在或名称不符：${link.recipeId}`);
      visit(target);
      recipe.allergens = [...new Set([...recipe.allergens, ...target.allergens])];
      for (const key of ["containsPork", "containsBeef", "containsAlcohol", "spicy"]) recipe.flags[key] ||= target.flags[key];
      recipe.flags.vegetarian &&= target.flags.vegetarian;
    }
    visiting.delete(recipe.id);
    finished.add(recipe.id);
  }
  recipes.forEach(visit);
  return recipes;
}
