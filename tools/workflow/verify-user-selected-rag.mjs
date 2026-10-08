import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { loadRagEnv, createConfiguredSupabaseClient } from "../../src/rag/supabase-client.mjs";
import { createConfiguredEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { createWindowsHttpFetch } from "../../src/rag/windows-http.mjs";
import { retrieve } from "../../src/rag/retrieve.mjs";
import { hybridSearch } from "../../src/rag/hybrid-search.mjs";

const outputIndex = process.argv.indexOf("--output");
if (outputIndex < 0 || !process.argv[outputIndex + 1]) throw new Error("--output is required");
await loadRagEnv();
const fetchImpl = process.argv.includes("--windows-http") ? createWindowsHttpFetch() : globalThis.fetch;
const client = await createConfiguredSupabaseClient({ fetchImpl });
const embeddingProvider = createConfiguredEmbeddingProvider({ fetchImpl });
const rejectedIds = new Set(["116d3e27-9d09-481f-9b79-aa8df9a14aaf", "1ba3785d-c85e-4baa-a741-dfce177aad15", "22571b9a-ba39-42ee-9f56-d7b52db7d87c"]);
const targets = [
  ["cn-016", "回锅肉", "8291b14c-022b-4706-b35c-4d6231b9284a", 5],
  ["cn-011", "桂林米粉", "c6f9c9c2-acaf-46a9-9956-79412598d085", 5],
  ["west-012", "千层面", "59f561e7-5520-4137-ac4e-c657cadcae71", 8],
  ["west-031", "博洛尼亚肉酱", "19217549-e928-440d-90eb-3a164426854f", 6]
];
const verified = [];
for (const [recipeId, name, documentId, expectedChunks] of targets) {
  const entity = (await client.select("kb_recipe_entities", { filters: { canonical_name: name }, limit: 1 }))[0];
  assert(entity, `${name}: missing entity`);
  const document = (await client.select("kb_documents", { filters: { id: documentId }, limit: 1 }))[0];
  assert.equal(document.recipe_name, name);
  assert.equal(document.metadata.projectRecipeId, recipeId);
  assert(!["invalid", "superseded"].includes(document.metadata.evidenceStatus));
  const options = { query: name, client, embeddingProvider, recipeEntityId: entity.id, limit: 50, maxPerSource: 50 };
  const semantic = await retrieve(options);
  const hybrid = await hybridSearch(options);
  for (const items of [semantic, hybrid]) {
    assert(!items.some((item) => rejectedIds.has(item.document_id)), `${name}: rejected history returned`);
    assert.equal(items.filter((item) => item.document_id === documentId).length, expectedChunks);
  }
  verified.push({ recipeId, name, documentId, expectedChunks,
    semanticSelectedChunks: semantic.filter((item) => item.document_id === documentId).length,
    hybridSelectedChunks: hybrid.filter((item) => item.document_id === documentId).length,
    invalidHistoryExcluded: true, sourceComplete: document.metadata.sourceComplete,
    stepImageReferences: document.metadata.mediaReferences?.steps?.length ?? 0,
    heroImageSha256: document.metadata.mediaReferences?.hero?.sha256 ?? null });
}
const result = { ok: true, checkedAt: new Date().toISOString(), databaseWrites: false, embeddingModel: embeddingProvider.model, dimension: embeddingProvider.dimension, targets: verified,
  note: "图片文件留在仓库；数据库保存来源、路径、校验和和步骤映射，不是上传图片二进制到 Storage。历史错误保留审计且正常检索排除。" };
await writeFile(process.argv[outputIndex + 1], `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(result, null, 2));
