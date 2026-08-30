export function createChunkRepository(client) {
  return {
    listByDocument(documentId) {
      return client.select("kb_chunks", {
        filters: { document_id: documentId },
        order: "chunk_index.asc"
      });
    },

    async replaceForDocument(documentId, chunks) {
      await client.delete("kb_chunks", { document_id: documentId });
      if (!chunks.length) return [];
      return client.insert(
        "kb_chunks",
        chunks.map((chunk) => ({ ...chunk, document_id: documentId }))
      );
    }
  };
}
