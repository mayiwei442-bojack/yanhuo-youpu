export function detectIngredientAllergens(text) {
  const rules = [
    ["peanut", /花生/u],
    ["dairy", /牛奶|奶油|黄油|芝士|奶酪|干酪|马苏里拉|帕玛森|酪乳|白酱/u],
    ["egg", /鸡蛋|蛋黄|蛋液|蛋白/u],
    ["fish", /鱼(?!香)|鳕|鲈|凤尾鱼|三文鱼|鱼汤/u],
    ["shellfish", /虾|蟹|贝|蛤|青口|贻贝|鱿鱼|牡蛎|蚝油/u],
    ["wheat", /面粉|面包|意大利面|面条|面片|馄饨|饺子|馍|馒头|薄饼|松饼|披萨|汉堡|酥皮|面包糠/u],
    ["soy", /豆腐|豆浆|腐竹|黄豆|豆皮|豆豉|豆瓣酱|生抽|老抽|酱油/u],
    ["sesame", /芝麻|香油/u]
  ];
  return rules.filter(([id, pattern]) => pattern.test(id === "shellfish"
    ? String(text).replace(/(?:纯素|素食?)蚝油/gu, "")
    : text)).map(([id]) => id);
}

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
