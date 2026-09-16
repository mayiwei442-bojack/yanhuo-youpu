import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const basePath = option("--base");
const decisionPath = option("--decision");
const importPath = option("--import");
const outputPath = option("--output");
if (!basePath || !decisionPath || !importPath || !outputPath) {
  throw new Error("Usage: node tools/workflow/prepare-source-image-evidence.mjs --base <json> --decision <json> --import <json> --output <json>");
}

const root = path.resolve(process.cwd());
const loadJson = async (relativePath) => JSON.parse(await readFile(path.resolve(root, relativePath), "utf8"));
const [base, decision, imported] = await Promise.all([
  loadJson(basePath),
  loadJson(decisionPath),
  loadJson(importPath)
]);

if (base.recipeId !== decision.recipeId || base.recipeId !== imported.recipeId) {
  throw new Error("Base evidence, decision, and import result must use the same recipeId.");
}
if (!decision.qualifyingSourceUrls?.includes(decision.selectedSourceUrl)) {
  throw new Error("selectedSourceUrl must be included in qualifyingSourceUrls.");
}

const importByUrl = new Map(imported.items.map((item) => [item.originalUrl, item]));
const selectedMedia = decision.media;
if (selectedMedia.recipePageUrl !== decision.selectedSourceUrl) {
  throw new Error("Selected media recipePageUrl must equal selectedSourceUrl.");
}

function mergeImported(mediaItem) {
  const local = importByUrl.get(mediaItem.originalUrl);
  if (!local) throw new Error(`No imported local image for ${mediaItem.originalUrl}`);
  return {
    ...mediaItem,
    repositoryPath: local.repositoryPath,
    sha256: local.sha256,
    httpStatus: local.httpStatus,
    contentType: local.contentType
  };
}

const sources = base.sources
  .filter((source) => decision.qualifyingSourceUrls.includes(source.url))
  .map((source) => {
    const assessment = decision.assessments?.[source.url];
    if (!assessment) throw new Error(`Missing selection assessment for ${source.url}`);
    const updated = { ...source, selectionAssessment: assessment };
    if (source.url === decision.selectedSourceUrl) {
      updated.media = {
        recipePageUrl: selectedMedia.recipePageUrl,
        mediaPageUrl: selectedMedia.mediaPageUrl ?? selectedMedia.recipePageUrl,
        sourceName: selectedMedia.sourceName,
        author: selectedMedia.author ?? null,
        rightsNotice: selectedMedia.rightsNotice ?? null,
        reuseLicense: selectedMedia.reuseLicense ?? null,
        repositoryCopyAuthorized: true,
        hero: mergeImported(selectedMedia.hero),
        steps: selectedMedia.steps.map(mergeImported)
      };
    }
    return updated;
  });

if (sources.length !== decision.qualifyingSourceUrls.length) {
  throw new Error("At least one qualifyingSourceUrl is absent from the base evidence package.");
}

const output = {
  ...base,
  createdAt: decision.createdAt,
  sourceMode: decision.sourceMode,
  ...(decision.sourceMode === "single_source" ? { singleSourceReason: decision.singleSourceReason } : {}),
  selectedSourceUrl: decision.selectedSourceUrl,
  selectionReason: decision.selectionReason,
  sources,
  notes: [...base.notes, ...(decision.notes ?? [])]
};

const absoluteOutput = path.resolve(root, outputPath);
const relativeOutput = path.relative(root, absoluteOutput);
if (!relativeOutput || relativeOutput.startsWith("..") || path.isAbsolute(relativeOutput)) {
  throw new Error("Output path must stay inside the workspace.");
}
await mkdir(path.dirname(absoluteOutput), { recursive: true });
await writeFile(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, { flag: "wx" });
process.stdout.write(`${JSON.stringify({ ok: true, recipeId: output.recipeId, sources: sources.length, output: relativeOutput }, null, 2)}\n`);
