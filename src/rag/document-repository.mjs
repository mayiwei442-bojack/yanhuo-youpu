export function createDocumentRepository(client) {
  return {
    async findBySourceAndHash(sourceId, contentHash) {
      const rows = await client.select("kb_documents", {
        filters: { source_id: sourceId, content_hash: contentHash },
        limit: 1
      });
      return rows?.[0] || null;
    },

    async createIfMissing(document) {
      const existing = await this.findBySourceAndHash(document.source_id, document.content_hash);
      if (existing) return { document: existing, created: false };
      const [created] = await client.insert("kb_documents", document);
      return { document: created, created: true };
    }
  };
}
