import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const roles = ["researcher", "editor", "reviewer"];
const prompts = Object.fromEntries(await Promise.all(
  ["orchestrator", ...roles].map(async (name) => [name, await readFile(new URL(`../../workflow/prompts/${name}.md`, import.meta.url), "utf8")])
));
const agentsBoundary = await readFile(new URL("../../AGENTS.md", import.meta.url), "utf8");
const configs = Object.fromEntries(await Promise.all(
  roles.map(async (name) => [name, await readFile(new URL(`../../.codex/agents/${name}.toml`, import.meta.url), "utf8")])
));
const evidenceSchema = JSON.parse(await readFile(new URL("../../workflow/schemas/evidence-package.schema.json", import.meta.url), "utf8"));
const reviewerSchema = JSON.parse(await readFile(new URL("../../workflow/schemas/reviewer-result.schema.json", import.meta.url), "utf8"));

assert.match(prompts.researcher, /only role allowed to search/iu);
assert.match(prompts.researcher, /Prioritize multiple independent complete sources/iu);
assert.match(prompts.researcher, /sourceMode: "single_source"/u);
assert.match(prompts.researcher, /Normalize and ingest every new or changed successful document before Editor selection/iu);
assert.match(prompts.researcher, /one finished-dish image and at least one semantically mapped step image/iu);
assert.match(prompts.researcher, /Recommend exactly one whole source/iu);
assert.match(prompts.editor, /Do not browse/iu);
assert.match(prompts.editor, /only the target/iu);
assert.match(prompts.editor, /use it directly/iu);
assert.match(prompts.editor, /Do not supplement it with any fact/iu);
assert.match(prompts.editor, /Never write an HTTP\(S\) URL into a runtime image field/iu);
assert.match(prompts.editor, /retain the source's original number and spoon, cup, bowl/iu);
assert.match(prompts.reviewer, /Do not search websites, query RAG/iu);
assert.match(prompts.reviewer, /runtime image field is an HTTP\(S\) URL/iu);
assert.match(prompts.reviewer, /separate adversarial language review/iu);
assert.match(prompts.reviewer, /splitting it exactly as the UI does/iu);
assert.match(prompts.orchestrator, /one recipe per scheduled run/iu);
assert.match(prompts.orchestrator, /exactly one qualifying source remains/iu);
assert.match(prompts.orchestrator, /`sourceMode: "single_source"` plus `singleSourceReason`/iu);
assert.match(prompts.orchestrator, /continue to the next requested recipe/iu);
assert.match(prompts.orchestrator, /excludes `npm run test:ai`/iu);
assert.match(agentsBoundary, /persist that recipe as `failed`.*continue with the next recipe/isu);
for (const role of roles) {
  assert.match(configs[role], new RegExp(`name = "${role}"`, "u"));
  assert.match(configs[role], /developer_instructions = /u);
}
assert.equal(evidenceSchema.properties.sources.minItems, 1);
assert.deepEqual(evidenceSchema.properties.sourceMode.enum, ["multi_source", "single_source"]);
assert(evidenceSchema.allOf.some((rule) => rule.then?.required?.includes("singleSourceReason")));
assert.equal(evidenceSchema.additionalProperties, false);
assert.equal(evidenceSchema.$defs.sourceMedia.properties.steps.minItems, 1);
assert.deepEqual(evidenceSchema.$defs.sourceMedia.required, ["recipePageUrl", "mediaPageUrl", "sourceName", "author", "rightsNotice", "reuseLicense", "hero", "steps"]);
assert.deepEqual(reviewerSchema.properties.status.enum, ["PASS", "FAIL"]);
assert.deepEqual(reviewerSchema.properties.adversarialReview.required, ["ingredientSemantics", "stepGrammar", "punctuation", "renderedStructure"]);
assert.equal(reviewerSchema.additionalProperties, false);

console.log(JSON.stringify({
  ok: true,
  phase: 5,
  roles,
  evidenceMinimumSources: evidenceSchema.properties.sources.minItems,
  reviewerStatuses: reviewerSchema.properties.status.enum,
  scheduledActivationValidated: false
}, null, 2));
