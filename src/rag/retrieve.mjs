function diversify(results, { limit, maxPerSource }) {
  const counts = new Map();
  const diversified = [];
  for (const result of results) {
    const sourceId = result.source_id || result.metadata?.sourceId || "unknown";
    const count = counts.get(sourceId) || 0;
    if (count >= maxPerSource) continue;
    diversified.push(result);
    counts.set(sourceId, count + 1);
    if (diversified.length >= limit) break;
  }
  return diversified;
}

export async function retrieve({
  query,
  client,
  embeddingProvider,
  recipeEntityId = null,
  chunkTypes = null,
  limit = 10,
  maxPerSource = 3
}) {
  if (typeof query !== "string" || !query.trim()) throw new Error("retrieve query 不能为空");
  const [queryEmbedding] = await embeddingProvider.embedTexts([query], { inputType: "query" });
  const results = await client.rpc("match_kb_chunks", {
    query_embedding: queryEmbedding,
    match_count: Math.max(limit * maxPerSource, limit),
    filter_recipe_entity_id: recipeEntityId,
    filter_chunk_types: chunkTypes
  });
  return diversify(results || [], { limit, maxPerSource });
}
