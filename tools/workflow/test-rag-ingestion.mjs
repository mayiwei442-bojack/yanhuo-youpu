import assert from "node:assert/strict";
import { normalizeRecipe } from "../../src/rag/normalize.mjs";
import { CHUNK_TYPES, chunkRecipe } from "../../src/rag/chunker.mjs";
import { createEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { ingestDocument } from "../../src/rag/ingest-document.mjs";
import { retrieve } from "../../src/rag/retrieve.mjs";
import { hybridSearch } from "../../src/rag/hybrid-search.mjs";

const embeddingCalls = [];
const embeddingProvider = createEmbeddingProvider({
  provider: "voyage",
  model: "voyage-4",
  dimension: 1024,
  apiKey: "test-key",
  batchSize: 16
}, {
  fetchImpl: async (_url, options) => {
    const body = JSON.parse(options.body);
    embeddingCalls.push(body);
    return new Response(JSON.stringify({
      data: body.input.map((_text, index) => ({ index, embedding: Array(1024).fill((index + 1) / 1024) }))
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
});

const normalized = normalizeRecipe({
  recipeName: "番茄炒蛋",
  aliases: ["西红柿炒鸡蛋"],
  category: "chinese",
  cuisine: "家常菜",
  summary: "鸡蛋与番茄快炒成菜。",
  ingredients: [
    { name: "鸡蛋", amount: "3个", raw: "鸡蛋3个" },
    { name: "番茄", amount: "2个", raw: "番茄2个" }
  ],
  steps: [
    { order: 1, instruction: "鸡蛋打散后炒至刚凝固。", duration: "约1分钟", heat: "大火" },
    { order: 2, instruction: "番茄炒出汁后倒回鸡蛋。", duration: "约2分钟", heat: "中火" }
  ],
  technique: ["鸡蛋刚凝固即盛出"],
  tips: ["番茄成熟度会影响出汁量"],
  source: {
    type: "website",
    name: "Example Recipes",
    url: "https://example.com/tomato-eggs",
    retrievalMethod: "JSON-LD",
    retrievedAt: "2026-08-30T00:00:00.000Z"
  }
});
const chunks = chunkRecipe(normalized);
assert.deepEqual([...new Set(chunks.map((chunk) => chunk.chunk_type))], CHUNK_TYPES);
assert(chunks.every((chunk) => chunk.content_hash.length === 64));

const storedChunks = [];
const repositories = {
  sources: { async getOrCreate() { return { source: { id: "source-1" }, created: true }; } },
  entities: { async getOrCreate() { return { entity: { id: "entity-1" }, created: true }; } },
  documents: {
    async createIfMissing(document) {
      return { document: { id: "document-1", ...document }, created: true };
    }
  },
  chunks: {
    async listByDocument() { return []; },
    async replaceForDocument(_documentId, rows) {
      storedChunks.push(...rows.map((row, index) => ({ id: `chunk-${index}`, ...row })));
      return storedChunks;
    }
  }
};
const ingestion = await ingestDocument({ normalizedRecipe: normalized, rawText: "可追溯的番茄炒蛋原文", embeddingProvider, repositories });
assert.equal(ingestion.embedded, true);
assert.equal(ingestion.chunks.length, 5);
assert(ingestion.chunks.every((chunk) => chunk.embedding.length === 1024));
assert.equal(embeddingCalls[0].input_type, "document");
assert.equal(embeddingCalls[0].output_dimension, 1024);
assert.equal(embeddingCalls[0].output_dtype, "float");

const queryClient = {
  async rpc(name, args) {
    assert.equal(name, "match_kb_chunks");
    assert.equal(args.query_embedding.length, 1024);
    return storedChunks.map((chunk, index) => ({ ...chunk, source_id: `source-${index % 2}`, similarity: 0.9 - index / 100 }));
  },
  async select() {
    return [storedChunks[0], storedChunks[1]];
  }
};
const retrieved = await retrieve({ query: "番茄炒蛋怎么炒", client: queryClient, embeddingProvider, limit: 3, maxPerSource: 2 });
assert.equal(retrieved.length, 3);
assert.equal(embeddingCalls.at(-1).input_type, "query");

const hybrid = await hybridSearch({ query: "番茄炒蛋", client: queryClient, embeddingProvider, limit: 3, maxPerSource: 2 });
assert.equal(hybrid.length, 3);
assert(hybrid.every((item) => item.hybridScore > 0));

console.log(JSON.stringify({
  ok: true,
  phase: 3,
  chunkTypes: CHUNK_TYPES,
  chunks: chunks.length,
  embeddingDimension: embeddingProvider.dimension,
  documentInputType: embeddingCalls[0].input_type,
  queryInputType: embeddingCalls.at(-1).input_type,
  retrievalResults: retrieved.length,
  hybridResults: hybrid.length
}, null, 2));
