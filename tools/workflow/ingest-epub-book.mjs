import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { loadRagEnv, createConfiguredSupabaseClient } from "../../src/rag/supabase-client.mjs";
import { createConfiguredEmbeddingProvider } from "../../src/rag/embedding-provider.mjs";
import { extractRecipeFromEpub, parseEpubNavigation, readEpubEntry } from "../../src/rag/epub-extractor.mjs";
import { ingestDocument } from "../../src/rag/ingest-document.mjs";

function option(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function recipeNumber(item) {
  return Number.parseInt(item.anchor.replace(/^subid/u, ""), 10);
}

const epubPath = option("--epub") || process.env.RAG_EPUB_PATH;
if (!epubPath) throw new Error("请通过 --epub <path> 或 RAG_EPUB_PATH 指定 EPUB 文件");

const bookTitle = option("--book-title", "贝太厨房:从小爱吃的菜2");
const author = option("--author", "《贝太厨房》工作室");
const reportPath = resolve(process.cwd(), option("--report", "workflow/book-ingestions/betai-kitchen-2.json"));
const startedAt = new Date().toISOString();
const report = {
  startedAt,
  completedAt: null,
  status: "in_progress",
  book: {
    fileName: basename(epubPath),
    title: bookTitle,
    author,
    format: "EPUB",
    originalFilePreserved: true,
    fixedPageNumbersAvailable: false
  },
  embeddingModel: null,
  embeddingDimension: null,
  summary: {
    candidates: 0,
    extracted: 0,
    processed: 0,
    embeddedDocuments: 0,
    deduplicatedDocuments: 0,
    documents: 0,
    chunks: 0,
    failures: 0
  },
  recipes: [],
  errors: []
};

async function persistReport() {
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

await persistReport();

const navigation = parseEpubNavigation(readEpubEntry(epubPath, "OEBPS/toc.ncx"));
const candidates = navigation
  .filter((item) => /^subid\d+$/u.test(item.anchor))
  .sort((left, right) => recipeNumber(left) - recipeNumber(right));
report.summary.candidates = candidates.length;

const duplicateNames = candidates
  .filter((item, index) => candidates.findIndex((candidate) => candidate.name === item.name) !== index)
  .map((item) => item.name);
if (!candidates.length || duplicateNames.length) {
  const message = !candidates.length
    ? "EPUB 目录中没有找到菜谱锚点"
    : `EPUB 菜名不唯一：${[...new Set(duplicateNames)].join("、")}`;
  report.status = "FAIL";
  report.completedAt = new Date().toISOString();
  report.errors.push({ stage: "navigation", message });
  report.summary.failures = report.errors.length;
  await persistReport();
  throw new Error(message);
}

const extracted = [];
for (const candidate of candidates) {
  try {
    extracted.push(extractRecipeFromEpub(epubPath, candidate.name, {
      bookTitle,
      author,
      retrievedAt: startedAt
    }));
  } catch (error) {
    report.errors.push({
      stage: "extraction",
      recipeName: candidate.name,
      location: candidate.location,
      message: error.message
    });
  }
}
report.summary.extracted = extracted.length;
report.summary.failures = report.errors.length;

if (report.errors.length) {
  report.status = "FAIL";
  report.completedAt = new Date().toISOString();
  await persistReport();
  throw new Error(`EPUB 预检失败：${report.errors.length} 道菜无法可靠提取`);
}

await loadRagEnv({ cwd: process.cwd() });
const client = await createConfiguredSupabaseClient({ cwd: process.cwd() });
const embeddingProvider = createConfiguredEmbeddingProvider();
report.embeddingModel = embeddingProvider.model;
report.embeddingDimension = embeddingProvider.dimension;

for (const extractedRecipe of extracted) {
  const recipe = extractedRecipe.normalizedRecipe;
  const item = {
    recipeName: recipe.recipeName,
    location: recipe.source.location,
    status: "in_progress",
    documentId: null,
    recipeEntityId: null,
    chunks: 0,
    embedded: false,
    deduplicated: false,
    error: null
  };
  report.recipes.push(item);
  await persistReport();

  try {
    const ingestion = await ingestDocument({
      normalizedRecipe: recipe,
      rawText: extractedRecipe.rawText,
      client,
      embeddingProvider
    });
    item.status = "done";
    item.documentId = ingestion.document.id;
    item.recipeEntityId = ingestion.entity.id;
    item.chunks = ingestion.chunks.length;
    item.embedded = ingestion.embedded;
    item.deduplicated = ingestion.deduplicated;
    report.summary.processed += 1;
    report.summary.documents += 1;
    report.summary.chunks += ingestion.chunks.length;
    if (ingestion.embedded) report.summary.embeddedDocuments += 1;
    if (ingestion.deduplicated) report.summary.deduplicatedDocuments += 1;
    await persistReport();
  } catch (error) {
    item.status = "failed";
    item.error = error.message;
    report.errors.push({
      stage: "ingestion",
      recipeName: recipe.recipeName,
      location: recipe.source.location,
      message: error.message
    });
    report.summary.failures = report.errors.length;
    report.status = "FAIL";
    report.completedAt = new Date().toISOString();
    await persistReport();
    throw error;
  }
}

report.status = "PASS";
report.completedAt = new Date().toISOString();
report.summary.failures = 0;
await persistReport();

console.log(JSON.stringify({
  ok: true,
  status: report.status,
  book: report.book.title,
  ...report.summary,
  report: reportPath
}, null, 2));
