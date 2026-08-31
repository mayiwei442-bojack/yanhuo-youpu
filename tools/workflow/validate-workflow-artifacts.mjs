import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const artifacts = [
  ["cn-010", "cn-010-disanxian", "2026-08-30-cn-010-i10a"],
  ["cn-024", "cn-024-guobaorou", "2026-08-30-cn-024-i10b"],
  ["cn-027", "cn-027-scallop-vermicelli", "2026-08-30-cn-027-i10c"],
  ["cn-036", "cn-036-lotus-rib-soup", "2026-08-30-cn-036-i10d"],
  ["cn-054", "cn-054-black-bean-ribs", "2026-08-30-cn-054-i10e"]
];

const results = [];
for (const [recipeId, slug, runId] of artifacts) {
  const evidenceRaw = await readFile(new URL(`../../workflow/evidence/${slug}.json`, import.meta.url), "utf8");
  const evidence = JSON.parse(evidenceRaw);
  const review = JSON.parse(await readFile(new URL(`../../workflow/reviews/${slug}.json`, import.meta.url), "utf8"));
  const run = JSON.parse(await readFile(new URL(`../../workflow/runs/${runId}.json`, import.meta.url), "utf8"));
  const hash = createHash("sha256").update(evidenceRaw).digest("hex");

  assert.equal(evidence.recipeId, recipeId);
  assert(evidence.sources.length >= 2);
  assert.equal(new Set(evidence.sources.map((source) => source.documentId)).size, evidence.sources.length);
  assert.deepEqual(new Set(evidence.sources.map((source) => source.sourceType)), new Set(["book", "website"]));
  assert(evidence.sources.every((source) => source.complete && source.ingredients.length > 0 && source.steps.length >= 2));
  assert(evidence.ragEvidence.length > 0);
  assert.equal(review.status, "PASS");
  assert.deepEqual(review.issues, []);
  assert.equal(review.validatorPassed, true);
  assert.equal(review.evidencePackageHash, hash);
  assert.equal(run.runId, runId);
  assert.equal(run.recipeId, recipeId);
  assert.equal(run.branch, "codex/recipe-automation");
  assert.equal(run.steps.research.status, "done");
  assert.equal(run.steps.ingestion.status, "done");
  assert.equal(run.steps.edit.status, "done");
  assert.equal(run.steps.validator.status, "done");
  assert.equal(run.steps.review.status, "done");
  assert.equal(run.steps.build.status, "done");
  assert(["pending", "done"].includes(run.steps.gitPush.status));
  results.push({ recipeId, sources: evidence.sources.length, ragEvidence: evidence.ragEvidence.length, review: review.status, runStatus: run.status });
}

console.log(JSON.stringify({ ok: true, recipes: results }, null, 2));
