export function createRecipeEntityRepository(client) {
  return {
    async findByCanonicalName(canonicalName, category) {
      const rows = await client.select("kb_recipe_entities", {
        filters: { canonical_name: canonicalName, category },
        limit: 1
      });
      return rows?.[0] || null;
    },

    async getOrCreate(recipe) {
      const existing = await this.findByCanonicalName(recipe.recipeName, recipe.category);
      if (existing) {
        const aliases = [...new Set([...(existing.aliases || []), ...recipe.aliases])];
        if (JSON.stringify(aliases) !== JSON.stringify(existing.aliases || [])) {
          const [updated] = await client.update("kb_recipe_entities", { aliases }, { id: existing.id });
          return { entity: updated, created: false };
        }
        return { entity: existing, created: false };
      }
      const [created] = await client.insert("kb_recipe_entities", {
        canonical_name: recipe.recipeName,
        aliases: recipe.aliases,
        category: recipe.category,
        cuisine: recipe.cuisine,
        metadata: recipe.metadata || {}
      });
      return { entity: created, created: true };
    }
  };
}
