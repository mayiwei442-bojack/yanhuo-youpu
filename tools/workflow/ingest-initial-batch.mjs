import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadRagEnv, createConfiguredSupabaseClient } from "../../src/rag/supabase-client.mjs";
import { createConfiguredEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { extractRecipeFromEpub } from "../../src/rag/epub-extractor.mjs";
import { extractDouguoRecipe, extractJsonLdRecipe, fetchHtml } from "../../src/rag/website-extractor.mjs";
import { ingestDocument } from "../../src/rag/ingest-document.mjs";
import { retrieve } from "../../src/rag/retrieve.mjs";
import { hybridSearch } from "../../src/rag/hybrid-search.mjs";

function option(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function evidenceSource(normalized, ingestion, rawText) {
  return {
    sourceName: normalized.source.name,
    sourceType: normalized.source.type,
    url: normalized.source.url,
    documentId: ingestion.document.id,
    retrievalMethod: normalized.source.retrievalMethod,
    complete: normalized.ingredients.length > 0 && normalized.steps.length >= 2,
    ingredients: normalized.ingredients.map(({ name, amount, raw }) => ({ name, amount, raw })),
    steps: normalized.steps.map(({ order, instruction, duration, heat }) => ({ order, instruction, duration, heat })),
    technique: normalized.technique.map((item) => item.text),
    tips: normalized.tips.map((item) => item.text),
    rawExcerpt: rawText.slice(0, 600),
    bookTitle: normalized.source.bookTitle,
    pageStart: normalized.source.pageStart,
    pageEnd: normalized.source.pageEnd,
    location: normalized.source.location
  };
}

const manifestPath = resolve(process.cwd(), option("--manifest", "workflow/batches/initial-10.json"));
const epubPath = option("--epub") || process.env.RAG_EPUB_PATH;
if (!epubPath) throw new Error("请通过 --epub <path> 或 RAG_EPUB_PATH 指定 EPUB 文件");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const refreshWeb = process.argv.includes("--refresh-web");

await loadRagEnv({ cwd: process.cwd() });
const client = await createConfiguredSupabaseClient({ cwd: process.cwd() });
const embeddingProvider = createConfiguredEmbeddingProvider();
const report = {
  batchId: manifest.batchId,
  startedAt: new Date().toISOString(),
  completedAt: null,
  status: "in_progress",
  embeddingModel: embeddingProvider.model,
  embeddingDimension: embeddingProvider.dimension,
  recipes: [],
  errors: []
};

for (const recipe of manifest.recipes) {
  const item = {
    key: recipe.key,
    recipeId: recipe.recipeId,
    recipeName: recipe.recipeName,
    mode: recipe.mode,
    status: "in_progress",
    sources: [],
    retrieval: null,
    evidencePath: null,
    error: null
  };
  report.recipes.push(item);
  try {
    if (recipe.mode === "update_existing" && !recipe.website) {
      throw new Error("更新现有菜谱必须配置网站来源");
    }
    const book = extractRecipeFromEpub(epubPath, recipe.recipeName, {
      bookTitle: manifest.book.title,
      author: manifest.book.author
    });
    const bookIngestion = await ingestDocument({
      normalizedRecipe: book.normalizedRecipe,
      rawText: book.rawText,
      client,
      embeddingProvider
    });
    item.sources.push({
      sourceName: manifest.book.title,
      sourceType: "book",
      documentId: bookIngestion.document.id,
      chunks: bookIngestion.chunks.length,
      embedded: bookIngestion.embedded,
      deduplicated: bookIngestion.deduplicated,
      location: book.normalizedRecipe.source.location,
      normalized: book.normalizedRecipe,
      rawText: book.rawText
    });

    let websiteIngestion = null;
    let websiteNormalized = null;
    let websiteRawText = null;
    if (recipe.website) {
      const cachedDocuments = refreshWeb ? [] : await client.select("kb_documents", {
        filters: { url: recipe.website.url },
        order: "retrieved_at.desc",
        limit: 1
      });
      const cachedWebsite = cachedDocuments[0] || null;
      let websiteFinalUrl;
      if (cachedWebsite) {
        websiteRawText = cachedWebsite.raw_text;
        websiteFinalUrl = cachedWebsite.url;
        websiteNormalized = cachedWebsite.normalized_json;
      } else {
        const websiteResponse = await fetchHtml(recipe.website.url);
        const extractor = recipe.website.extractor === "douguo" ? extractDouguoRecipe : extractJsonLdRecipe;
        websiteRawText = websiteResponse.html;
        websiteFinalUrl = websiteResponse.finalUrl;
        websiteNormalized = extractor(websiteResponse.html, {
          canonicalName: recipe.recipeName,
          category: recipe.category,
          sourceName: recipe.website.sourceName,
          url: websiteResponse.finalUrl
        });
      }
      const sourceTitle = websiteNormalized.metadata.sourceRecipeName || websiteNormalized.aliases[0] || recipe.recipeName;
      if (!new RegExp(recipe.website.titlePattern, "u").test(sourceTitle)) {
        throw new Error(`网站候选标题不匹配：${sourceTitle}`);
      }
      websiteIngestion = await ingestDocument({
        normalizedRecipe: websiteNormalized,
        rawText: websiteRawText,
        client,
        embeddingProvider
      });
      item.sources.push({
        sourceName: recipe.website.sourceName,
        sourceType: "website",
        cached: Boolean(cachedWebsite),
        searchUrl: recipe.website.searchUrl,
        url: websiteFinalUrl,
        documentId: websiteIngestion.document.id,
        chunks: websiteIngestion.chunks.length,
        embedded: websiteIngestion.embedded,
        deduplicated: websiteIngestion.deduplicated,
        normalized: websiteNormalized,
        rawText: websiteRawText
      });
    }

    const recipeEntityId = bookIngestion.entity.id;
    const semantic = await retrieve({
      query: `${recipe.recipeName} 的原料、步骤、火候、技法和注意事项`,
      client,
      embeddingProvider,
      recipeEntityId,
      limit: 10,
      maxPerSource: 5
    });
    const hybrid = await hybridSearch({
      query: recipe.recipeName,
      client,
      embeddingProvider,
      recipeEntityId,
      limit: 10,
      maxPerSource: 5
    });
    const independentSources = new Set(semantic.map((chunk) => chunk.source_id || chunk.metadata?.sourceId).filter(Boolean));
    const requiredIndependentSources = recipe.website ? 2 : 1;
    if (independentSources.size < requiredIndependentSources) {
      throw new Error(`检索只返回 ${independentSources.size} 个独立来源`);
    }
    item.retrieval = {
      recipeEntityId,
      semanticResults: semantic.length,
      hybridResults: hybrid.length,
      independentSources: independentSources.size,
      chunkTypes: [...new Set(semantic.map((chunk) => chunk.chunk_type))]
    };

    if (recipe.mode === "update_existing") {
      const sourceNameById = new Map([
        [bookIngestion.source.id, manifest.book.title],
        [websiteIngestion.source.id, recipe.website.sourceName]
      ]);
      const evidence = {
        recipeId: recipe.recipeId,
        recipeName: recipe.recipeName,
        category: recipe.category,
        createdAt: new Date().toISOString(),
        sources: [
          evidenceSource(book.normalizedRecipe, bookIngestion, book.rawText),
          evidenceSource(websiteNormalized, websiteIngestion, websiteRawText.replace(/<[^>]+>/gu, " ").replace(/\s+/gu, " "))
        ],
        ragEvidence: semantic.map((chunk) => ({
          chunkId: chunk.id,
          documentId: chunk.document_id,
          sourceName: sourceNameById.get(chunk.source_id || chunk.metadata?.sourceId) || "可追溯来源",
          chunkType: chunk.chunk_type,
          content: chunk.content,
          similarity: chunk.similarity ?? null
        })),
        notes: [
          "Editor 与 Reviewer 必须使用本文件中的同一份 evidence package。",
          "EPUB 无固定印刷页码；书籍来源使用 XHTML entry#anchor 定位。"
        ]
      };
      const evidenceDir = resolve(process.cwd(), "workflow/evidence");
      await mkdir(evidenceDir, { recursive: true });
      const evidencePath = resolve(evidenceDir, `${recipe.key}.json`);
      await writeFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
      item.evidencePath = evidencePath.replace(`${process.cwd()}\\`, "").replaceAll("\\", "/");
    }
    for (const source of item.sources) {
      delete source.normalized;
      delete source.rawText;
    }
    item.status = "done";
  } catch (error) {
    item.status = "failed";
    item.error = error.message;
    report.errors.push({ recipeName: recipe.recipeName, message: error.message, at: new Date().toISOString() });
    break;
  }
}

report.completedAt = new Date().toISOString();
report.status = report.errors.length === 0 && report.recipes.length === manifest.recipes.length && report.recipes.every((item) => item.status === "done") ? "PASS" : "FAIL";
const reportPath = resolve(process.cwd(), "workflow/batches/initial-10-report.json");
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  ok: report.status === "PASS",
  status: report.status,
  recipes: report.recipes.length,
  completed: report.recipes.filter((item) => item.status === "done").length,
  documents: report.recipes.flatMap((item) => item.sources).length,
  report: reportPath
}, null, 2));
if (report.status !== "PASS") process.exitCode = 1;
