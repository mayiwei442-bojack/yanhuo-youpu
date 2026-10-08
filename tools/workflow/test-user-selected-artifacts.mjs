import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { isAuthorizedHeroOnly, isAuthorizedIncomplete } from "./source-policy.mjs";
const json = async (path) => JSON.parse(await readFile(path, "utf8"));
const cases = [
  ["cn-003", "2026-09-16-cn-003-source-images", "2026-10-07-cn-003-total-time", "2026-10-07-cn-003-total-time"],
  ["cn-004", "cn-004-yuxiang-pork-source-images", "2026-10-07-cn-004-total-time", "2026-10-07-cn-004-total-time-retry"],
  ["cn-006", "2026-10-05-cn-006-source-images", "2026-10-07-cn-006-total-time", "2026-10-07-cn-006-total-time-retry"],
  ["cn-011", "2026-10-07-cn-011-user-selected-verified-final", "2026-10-07-cn-011-user-selected", "2026-10-07-cn-011-user-selected-retry"],
  ["west-012", "2026-10-07-west-012-user-selected-final", "2026-10-07-west-012-user-selected", "2026-10-07-west-012-user-selected-retry"],
  ["west-031", "2026-10-07-west-031-user-selected-final", "2026-10-07-west-031-append", "2026-10-07-west-031-append-retry"]
];
for (const [id, evidenceSlug, reviewSlug, validatorSlug] of cases) {
  const raw = await readFile(`workflow/evidence/${evidenceSlug}.json`, "utf8");
  const evidence = JSON.parse(raw);
  const review = await json(`workflow/reviews/${reviewSlug}.json`);
  const validator = await json(`workflow/validation/${validatorSlug}.json`);
  assert.equal(evidence.recipeId, id);
  assert.equal(review.status, "PASS");
  assert.equal(review.validatorPassed, true);
  assert.equal(review.evidencePackageHash, createHash("sha256").update(raw.replace(/\r\n/gu, "\n")).digest("hex"));
  assert.deepEqual(review.issues, []);
  assert(Object.values(review.adversarialReview).every((value) => value === true));
  assert.equal(validator.ok, true);
  for (const source of evidence.sources) {
    assert(source.documentId);
    assert(source.complete || isAuthorizedIncomplete({ recipeId: id, source }));
    if (source.media?.steps?.length === 0) assert(isAuthorizedHeroOnly({ recipeId: id, sourceUrl: source.url, authorization: source.media.heroOnlyAuthorization }));
  }
}
const scope = await json("workflow/validation/2026-10-07-canonical-scope.json");
assert(scope.ok && scope.existingIdsStable && scope.after === scope.before + 1);
const rag = await json("workflow/reports/2026-10-07-user-selected-rag-verification.json");
assert(rag.ok && rag.dimension === 1024 && rag.embeddingModel === "voyage-4");
assert(rag.targets.every((item) => item.invalidHistoryExcluded && item.semanticSelectedChunks > 0 && item.hybridSelectedChunks > 0));
console.log(JSON.stringify({ ok: true, reviewedRecipes: cases.map((item) => item[0]), sameEvidenceHashesVerified: true, explicitExceptionsScoped: true, ragVerified: true, existingIdsStable: true }));
