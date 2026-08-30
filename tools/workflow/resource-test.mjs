import { mkdir, writeFile } from "node:fs/promises";
import { loadRagEnv, createConfiguredSupabaseClient } from "../../src/rag/supabase-client.mjs";
import { createConfiguredEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { ingestDocument } from "../../src/rag/ingest-document.mjs";
import { retrieve } from "../../src/rag/retrieve.mjs";
import { hybridSearch } from "../../src/rag/hybrid-search.mjs";
import { extractDouguoRecipe, extractJsonLdRecipe, fetchHtml } from "../../src/rag/website-extractor.mjs";

const target = { recipeId: "cn-001", recipeName: "番茄炒蛋", category: "chinese" };
const startedAt = new Date().toISOString();
const sources = [
  {
    name: "The Woks of Life",
    searchUrl: "https://thewoksoflife.com/?s=tomato+egg",
    detailUrl: "https://thewoksoflife.com/stir-fried-tomato-and-egg/",
    extractor: extractJsonLdRecipe,
    searchEvidence: /stir-fried-tomato-and-egg/iu
  },
  {
    name: "豆果美食",
    searchUrl: "https://m.douguo.com/caipu/%E7%95%AA%E8%8C%84%E7%82%92%E8%9B%8B",
    detailUrl: "https://www.douguo.net/cookbook/1192179.html",
    extractor: extractDouguoRecipe,
    searchEvidence: /番茄炒蛋的做法大全|\/cookbook\/\d+\.html/iu
  },
  {
    name: "下厨房",
    searchUrl: "https://www.xiachufang.com/search/?keyword=%E7%95%AA%E8%8C%84%E7%82%92%E8%9B%8B",
    detailUrl: "https://www.xiachufang.com/recipe/106748907/",
    extractor: extractJsonLdRecipe,
    searchEvidence: /番茄炒蛋的搜索结果|\/recipe\/\d+\//iu
  }
];

await loadRagEnv({ cwd: process.cwd() });
const client = await createConfiguredSupabaseClient({ cwd: process.cwd() });
const embeddingProvider = createConfiguredEmbeddingProvider();
const results = [];
const successfulIngestions = [];

for (const source of sources) {
  const result = {
    sourceName: source.name,
    searchUrl: source.searchUrl,
    originalUrl: source.detailUrl,
    searchSucceeded: false,
    detailLocated: false,
    complete: false,
    retrievalMethod: null,
    recipeName: null,
    ingredients: [],
    steps: [],
    cookingTime: null,
    normalized: false,
    ingested: false,
    chunks: 0,
    embeddingDimension: null,
    failureReason: null
  };
  try {
    const search = await fetchHtml(source.searchUrl);
    result.searchSucceeded = source.searchEvidence.test(search.html);
    if (!result.searchSucceeded) throw new Error("站内搜索页未定位到相关候选");
    result.detailLocated = true;
    const detail = await fetchHtml(source.detailUrl);
    if (!source.extractor) throw new Error("该来源没有可用的安全提取器");
    const normalized = source.extractor(detail.html, {
      canonicalName: target.recipeName,
      category: target.category,
      sourceName: source.name,
      url: detail.finalUrl,
      retrievedAt: new Date().toISOString()
    });
    result.complete = normalized.ingredients.length > 0 && normalized.steps.length > 1;
    result.retrievalMethod = normalized.source.retrievalMethod;
    result.recipeName = normalized.recipeName;
    result.ingredients = normalized.ingredients;
    result.steps = normalized.steps;
    result.cookingTime = normalized.metadata.totalTime || normalized.technique.map((item) => item.text).find((text) => /用时|分钟|小时/u.test(text)) || null;
    result.normalized = true;
    const ingestion = await ingestDocument({
      normalizedRecipe: normalized,
      rawText: detail.html,
      client,
      embeddingProvider
    });
    result.ingested = true;
    result.documentId = ingestion.document.id;
    result.recipeEntityId = ingestion.entity.id;
    result.chunks = ingestion.chunks.length;
    result.chunkTypes = [...new Set(ingestion.chunks.map((chunk) => chunk.chunk_type))];
    result.embeddingDimension = embeddingProvider.dimension;
    result.deduplicated = ingestion.deduplicated;
    successfulIngestions.push(ingestion);
  } catch (error) {
    result.failureReason = error.message;
    result.finalUrl = error.finalUrl || null;
  }
  results.push(result);
}

const recipeEntityId = successfulIngestions[0]?.entity.id || null;
let semanticResults = [];
let hybridResults = [];
let retrievalFailure = null;
if (successfulIngestions.length >= 2) {
  try {
    semanticResults = await retrieve({
      query: "番茄炒蛋的原料、步骤、火候和技巧",
      client,
      embeddingProvider,
      recipeEntityId,
      limit: 10,
      maxPerSource: 5
    });
    hybridResults = await hybridSearch({
      query: "番茄炒蛋",
      client,
      embeddingProvider,
      recipeEntityId,
      limit: 10,
      maxPerSource: 5
    });
  } catch (error) {
    retrievalFailure = error.message;
  }
} else {
  retrievalFailure = `仅 ${successfulIngestions.length} 个独立来源成功，至少需要 2 个`;
}
const retrievedSourceIds = new Set(semanticResults.map((item) => item.source_id || item.metadata?.sourceId).filter(Boolean));
const chunkTypes = new Set(successfulIngestions.flatMap((item) => item.chunks.map((chunk) => chunk.chunk_type)));
const report = {
  ...target,
  startedAt,
  completedAt: new Date().toISOString(),
  status: !retrievalFailure && semanticResults.length > 0 && retrievedSourceIds.size >= 2 ? "PASS" : "FAIL",
  sources: results,
  summary: {
    successfulSources: successfulIngestions.length,
    failedSources: results.filter((item) => item.failureReason).length,
    chunkTypes: [...chunkTypes],
    embeddingModel: embeddingProvider.model,
    embeddingDimension: embeddingProvider.dimension,
    semanticResults: semanticResults.length,
    hybridResults: hybridResults.length,
    retrievedIndependentSources: retrievedSourceIds.size
  },
  retrievalFailure,
  retrieval: {
    semantic: semanticResults.map((item) => ({
      id: item.id,
      documentId: item.document_id,
      sourceId: item.source_id,
      chunkType: item.chunk_type,
      similarity: item.similarity,
      contentPreview: item.content.slice(0, 180)
    })),
    hybrid: hybridResults.map((item) => ({
      id: item.id,
      chunkType: item.chunk_type,
      hybridScore: item.hybridScore,
      contentPreview: item.content.slice(0, 180)
    }))
  }
};

const outputDir = new URL("../../workflow/resource-tests/", import.meta.url);
await mkdir(outputDir, { recursive: true });
const date = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date()).replaceAll("/", "-");
const outputUrl = new URL(`${date}-${target.recipeId}-tomato-egg.json`, outputDir);
await writeFile(outputUrl, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ ...report.summary, ok: report.status === "PASS", status: report.status, output: outputUrl.pathname }, null, 2));
if (report.status !== "PASS") process.exitCode = 1;
