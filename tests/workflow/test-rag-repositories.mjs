import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createSupabaseClient, resolveSupabaseConfig } from "../../src/rag/supabase-client.mjs";
import { createSourceRepository } from "../../src/rag/source-repository.mjs";
import { createDocumentRepository } from "../../src/rag/document-repository.mjs";
import { createChunkRepository } from "../../src/rag/chunk-repository.mjs";

const requests = [];
const fetchImpl = async (url, options) => {
  requests.push({ url: String(url), options });
  return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });
};
const httpClient = createSupabaseClient({
  url: "https://example.supabase.co",
  key: "sb_secret_test-only",
  fetchImpl
});
await httpClient.select("kb_sources", { filters: { source_type: "website", active: true }, limit: 1 });
assert.equal(requests.length, 1);
assert.equal(requests[0].options.headers.apikey, "sb_secret_test-only");
assert.equal(requests[0].options.headers.Authorization, undefined, "新版 secret key 不应伪装成 JWT Bearer token");
assert.match(requests[0].url, /source_type=eq\.website/u);
assert(!requests[0].url.includes("sb_secret_test-only"), "secret key 不得进入 URL");
assert.deepEqual(
  resolveSupabaseConfig({ SUPABASE_URL: "https://example.supabase.co", SUPABASE_SECRET_KEY: "secret" }),
  { url: "https://example.supabase.co", key: "secret" }
);

const calls = [];
const fakeClient = {
  async select(table, options) {
    calls.push(["select", table, options]);
    return [];
  },
  async insert(table, rows) {
    calls.push(["insert", table, rows]);
    return [{ id: `${table}-id`, ...rows }];
  },
  async delete(table, filters) {
    calls.push(["delete", table, filters]);
    return [];
  }
};

const sourceRepository = createSourceRepository(fakeClient);
const sourceResult = await sourceRepository.getOrCreate({
  source_type: "website",
  name: "Example",
  base_url: "https://example.com/",
  metadata: { provenance: true }
});
assert.equal(sourceResult.created, true);
assert.equal(sourceResult.source.base_url, "https://example.com/");

const documentRepository = createDocumentRepository(fakeClient);
const documentResult = await documentRepository.createIfMissing({
  source_id: sourceResult.source.id,
  source_type: "website",
  recipe_name: "番茄炒蛋",
  url: "https://example.com/tomato-eggs",
  raw_text: "原文",
  normalized_json: { recipeName: "番茄炒蛋" },
  content_hash: "hash",
  retrieved_at: "2026-08-30T00:00:00.000Z"
});
assert.equal(documentResult.created, true);
assert.equal(documentResult.document.content_hash, "hash");

const chunkRepository = createChunkRepository(fakeClient);
await chunkRepository.replaceForDocument(documentResult.document.id, [{
  recipe_entity_id: "recipe-id",
  chunk_type: "summary",
  chunk_index: 0,
  content: "番茄炒蛋摘要",
  content_hash: "chunk-hash",
  metadata: {},
  embedding_model: "voyage-4",
  embedding_version: "voyage-4",
  embedding_dim: 1024,
  embedding: Array(1024).fill(0)
}]);
assert(calls.some(([method, table]) => method === "delete" && table === "kb_chunks"));
assert(calls.some(([method, table]) => method === "insert" && table === "kb_chunks"));

const baseSql = await readFile(new URL("../../supabase/migrations/001_rag_base.sql", import.meta.url), "utf8");
const vectorSql = await readFile(new URL("../../supabase/migrations/002_rag_vector_index.sql", import.meta.url), "utf8");
for (const table of ["kb_sources", "kb_recipe_entities", "kb_documents", "kb_chunks"]) {
  assert(baseSql.includes(`public.${table}`), `基础 migration 缺少 ${table}`);
  assert(baseSql.includes(`alter table public.${table} enable row level security`), `${table} 未启用 RLS`);
}
assert(!/grant\s+.+\s+to\s+(anon|authenticated)/iu.test(baseSql), "RAG 表不得授权给浏览器角色");
assert(vectorSql.includes("extensions.vector(1024)"), "embedding 维度不是 1024");
assert(vectorSql.includes("using hnsw"), "缺少 HNSW 索引");
assert(vectorSql.includes("extensions.vector_cosine_ops"), "HNSW 未使用 cosine opclass");

console.log(JSON.stringify({
  ok: true,
  phase: 2,
  repositories: ["sources", "documents", "chunks"],
  rlsTables: 4,
  embeddingDimension: 1024,
  secretInUrl: false
}, null, 2));
