import { readFile, writeFile } from "node:fs/promises";
import { createRecipeCatalog, splitRecipeIngredients, splitRecipeSteps } from "./recipe-state.mjs";
import { isAuthorizedIncomplete } from "./source-policy.mjs";
import { loadRagEnv, createConfiguredSupabaseClient } from "../../src/rag/supabase-client.mjs";
import { createConfiguredEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { createWindowsHttpFetch } from "../../src/rag/windows-http.mjs";
import { ingestDocument } from "../../src/rag/ingest-document.mjs";
import { normalizedRecipeToText } from "../../src/rag/normalize.mjs";
import { retrieve } from "../../src/rag/retrieve.mjs";
import { hybridSearch } from "../../src/rag/hybrid-search.mjs";

const option = (name) => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1]; };
const output = option("--output");
if (!output) throw new Error("--output is required");
const backfillId = option("--project-backfill");
const evidencePath = option("--evidence");
if (Boolean(backfillId) === Boolean(evidencePath)) throw new Error("Provide exactly one of --project-backfill or --evidence");
await loadRagEnv();
const fetchImpl = process.argv.includes("--windows-http") ? createWindowsHttpFetch() : globalThis.fetch;
const client = await createConfiguredSupabaseClient({ fetchImpl });
const embeddingProvider = createConfiguredEmbeddingProvider({ fetchImpl });
let evidence;
if (backfillId) {
  if (backfillId !== "cn-016") throw new Error("Only the explicitly accepted cn-016 project backfill is authorized");
  const target = createRecipeCatalog().find((item) => item.id === backfillId);
  const r = target.record;
  evidence = { recipeId: backfillId, recipeName: r.name, category: target.category,
    projectAcceptedBackfill: true, sources: [{ sourceName: "HowToCook", sourceType: "website", url: r.source, complete: true,
      retrievalMethod: "User-accepted project recipe backfill; no new upstream fetch", ingredients: splitRecipeIngredients(r.ingredients).map((raw) => ({ name: raw, raw, amount: null })),
      steps: splitRecipeSteps(r.steps).map((text, i) => ({ order: i + 1, instruction: text.replace(/^\d+[）)]/u, ""), duration: null, heat: null })),
      technique: [`项目已验收总时长：${r.timing.totalMinutes}分钟`], tips: [],
      mediaReferences: { hero: `assets/dishes/ai/${r.img}`, relatedImages: r.relatedImages },
      acceptedProjectRecord: r
    }] };
} else evidence = JSON.parse(await readFile(evidencePath, "utf8"));

const result = { recipeId: evidence.recipeId, recipeName: evidence.recipeName, startedAt: new Date().toISOString(), documents: [] };
for (const source of evidence.sources) {
  if (!source.complete && !isAuthorizedIncomplete({ recipeId: evidence.recipeId, source })) throw new Error("Incomplete source is not explicitly authorized");
  const rawText = source.acceptedProjectRecord
    ? normalizedRecipeToText({ recipeName: evidence.recipeName, summary: "用户已验收的项目版本回填，不冒充网站原文。", ingredients: source.ingredients, steps: source.steps, technique: source.technique.map((text) => ({ text })), tips: [] })
    : source.rawExcerpt;
  const metadata = {
    projectRecipeId: evidence.recipeId, sourceComplete: source.complete,
    ...(evidence.projectAcceptedBackfill ? { projectAcceptedBackfill: true, acceptedProjectRecord: source.acceptedProjectRecord, acceptedAt: "2026-10-07", mediaReferences: source.mediaReferences } : {}),
    ...(source.userAuthorizedIncomplete ? { userAuthorizedIncomplete: source.userAuthorizedIncomplete } : {}),
    ...(source.recipeDependencies ? { recipeDependencies: source.recipeDependencies } : {}),
    ...(source.media ? { mediaReferences: source.media } : {})
  };
  const normalizedRecipe = { recipeName: evidence.recipeName, category: evidence.category, cuisine: evidence.category === "western" ? "意大利" : evidence.recipeId === "cn-011" ? "广西" : "川菜",
    aliases: evidence.recipeId === "cn-016" ? ["Twice-cooked Pork"] : [], summary: evidence.projectAcceptedBackfill ? "用户已验收的 HowToCook 项目菜谱，按 UTF-8 原样回填。" : source.rawExcerpt,
    ingredients: source.ingredients, steps: source.steps, technique: source.technique, tips: source.tips, metadata,
    source: { type: source.sourceType, name: source.sourceName, url: source.url, author: source.media?.author, retrievalMethod: source.retrievalMethod } };
  const ingested = await ingestDocument({ normalizedRecipe, rawText, client, embeddingProvider });
  const documentId = ingested.document.id;
  const mergedDocumentMetadata = { ...ingested.document.metadata, ...metadata };
  await client.update("kb_documents", { metadata: mergedDocumentMetadata, normalized_json: { ...ingested.document.normalized_json, metadata: { ...ingested.document.normalized_json.metadata, ...metadata } } }, { id: documentId });
  for (const chunk of ingested.chunks) await client.update("kb_chunks", { metadata: { ...chunk.metadata, ...metadata } }, { id: chunk.id, document_id: documentId });
  source.documentId = documentId;
  result.documents.push({ documentId, url: source.url, sourceName: source.sourceName, deduplicated: ingested.deduplicated, embedded: ingested.embedded,
    chunkCount: ingested.chunks.length, embeddingModel: embeddingProvider.model, dimension: embeddingProvider.dimension, metadata });
}
const entityId = (await client.select("kb_recipe_entities", { filters: { canonical_name: evidence.recipeName }, limit: 1 }))[0]?.id;
const semantic = await retrieve({ query: evidence.recipeName, client, embeddingProvider, recipeEntityId: entityId, limit: 20, maxPerSource: 20 });
const hybrid = await hybridSearch({ query: evidence.recipeName, client, embeddingProvider, recipeEntityId: entityId, limit: 20, maxPerSource: 20 });
const documentIds = new Set(result.documents.map((item) => item.documentId));
result.retrieval = { semanticCount: semantic.filter((item) => documentIds.has(item.document_id)).length, hybridCount: hybrid.filter((item) => documentIds.has(item.document_id)).length };
if (!result.retrieval.semanticCount || !result.retrieval.hybridCount) throw new Error("New documents were not found by both retrieval modes");
result.completedAt = new Date().toISOString();
if (evidencePath) await writeFile(output, `${JSON.stringify({ ...evidence, ragEvidence: semantic.filter((item) => documentIds.has(item.document_id)).map((item) => ({ chunkId: item.id, documentId: item.document_id, sourceName: item.metadata.sourceName, chunkType: item.chunk_type, content: item.content, similarity: item.similarity ?? null })) }, null, 2)}\n`, { flag: "wx" });
else await writeFile(output, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ ok: true, recipeId: result.recipeId, documents: result.documents.map(({ documentId, chunkCount, deduplicated, embedded }) => ({ documentId, chunkCount, deduplicated, embedded })), retrieval: result.retrieval }, null, 2));
