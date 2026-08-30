import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const roles = ["researcher", "editor", "reviewer"];
const prompts = Object.fromEntries(await Promise.all(
  ["orchestrator", ...roles].map(async (name) => [name, await readFile(new URL(`../../workflow/prompts/${name}.md`, import.meta.url), "utf8")])
));
const configs = Object.fromEntries(await Promise.all(
  roles.map(async (name) => [name, await readFile(new URL(`../../.codex/agents/${name}.toml`, import.meta.url), "utf8")])
));
const evidenceSchema = JSON.parse(await readFile(new URL("../../workflow/schemas/evidence-package.schema.json", import.meta.url), "utf8"));
const reviewerSchema = JSON.parse(await readFile(new URL("../../workflow/schemas/reviewer-result.schema.json", import.meta.url), "utf8"));

assert.match(prompts.researcher, /only role allowed to search/iu);
assert.match(prompts.researcher, /At least two independent/iu);
assert.match(prompts.editor, /Do not browse/iu);
assert.match(prompts.editor, /only the target/iu);
assert.match(prompts.reviewer, /Do not search websites, query RAG/iu);
assert.match(prompts.orchestrator, /one recipe per scheduled run/iu);
assert.match(prompts.orchestrator, /excludes `npm run test:ai`/iu);
for (const role of roles) {
  assert.match(configs[role], new RegExp(`name = "${role}"`, "u"));
  assert.match(configs[role], /developer_instructions = /u);
}
assert.equal(evidenceSchema.properties.sources.minItems, 2);
assert.equal(evidenceSchema.additionalProperties, false);
assert.deepEqual(reviewerSchema.properties.status.enum, ["PASS", "FAIL"]);
assert.equal(reviewerSchema.additionalProperties, false);

console.log(JSON.stringify({
  ok: true,
  phase: 5,
  roles,
  evidenceMinimumSources: evidenceSchema.properties.sources.minItems,
  reviewerStatuses: reviewerSchema.properties.status.enum,
  scheduledActivationValidated: false
}, null, 2));
