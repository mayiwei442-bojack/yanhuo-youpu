import { retrieve } from "./retrieve.mjs";

function reciprocalRank(rank, k) {
  return 1 / (k + rank + 1);
}

function mergeRanks(semantic, keyword, { limit, rrfK, maxPerSource }) {
  const merged = new Map();
  semantic.forEach((item, index) => {
    merged.set(item.id, { ...item, semanticRank: index + 1, hybridScore: reciprocalRank(index, rrfK) });
  });
  keyword.forEach((item, index) => {
    const previous = merged.get(item.id) || { ...item, semanticRank: null, hybridScore: 0 };
    merged.set(item.id, {
      ...previous,
      keywordRank: index + 1,
      hybridScore: previous.hybridScore + reciprocalRank(index, rrfK)
    });
  });
  const counts = new Map();
  const output = [];
  for (const item of [...merged.values()].sort((a, b) => b.hybridScore - a.hybridScore)) {
    const sourceId = item.source_id || item.metadata?.sourceId || "unknown";
    const count = counts.get(sourceId) || 0;
    if (count >= maxPerSource) continue;
    counts.set(sourceId, count + 1);
    output.push(item);
    if (output.length >= limit) break;
  }
  return output;
}

export async function hybridSearch({
  query,
  client,
  embeddingProvider,
  recipeEntityId = null,
  chunkTypes = null,
  limit = 10,
  maxPerSource = 3,
  rrfK = 50
}) {
  const semantic = await retrieve({
    query,
    client,
    embeddingProvider,
    recipeEntityId,
    chunkTypes,
    limit: limit * 2,
    maxPerSource: limit * 2
  });
  const filters = { content: `ilike.*${query.trim()}*` };
  if (recipeEntityId) filters.recipe_entity_id = recipeEntityId;
  if (chunkTypes?.length) filters.chunk_type = chunkTypes;
  const keyword = await client.select("kb_chunks", {
    filters,
    order: "created_at.desc",
    limit: limit * 2
  });
  return mergeRanks(semantic, keyword || [], { limit, rrfK, maxPerSource });
}
