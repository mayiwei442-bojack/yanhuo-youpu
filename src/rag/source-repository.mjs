export function createSourceRepository(client) {
  return {
    async findWebsiteByBaseUrl(baseUrl) {
      const rows = await client.select("kb_sources", {
        filters: { source_type: "website", base_url: baseUrl },
        limit: 1
      });
      return rows?.[0] || null;
    },

    async findBook({ name, title = null, author = null }) {
      const rows = await client.select("kb_sources", {
        filters: { source_type: "book", name, title, author },
        limit: 1
      });
      return rows?.[0] || null;
    },

    async getOrCreate(source) {
      const existing = source.source_type === "website"
        ? await this.findWebsiteByBaseUrl(source.base_url)
        : await this.findBook(source);
      if (existing) return { source: existing, created: false };
      const [created] = await client.insert("kb_sources", {
        source_type: source.source_type,
        name: source.name,
        base_url: source.base_url || null,
        title: source.title || null,
        author: source.author || null,
        active: source.active ?? true,
        metadata: source.metadata || {}
      });
      return { source: created, created: true };
    }
  };
}
