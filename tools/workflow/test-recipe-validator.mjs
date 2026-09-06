import assert from "node:assert/strict";
import { createRecipeCatalog, createRecipeSnapshot } from "./recipe-state.mjs";
import { validateRecipeChange } from "./validate-recipe.mjs";

const original = createRecipeCatalog();
const beforeSnapshot = createRecipeSnapshot(original);
const validEdit = structuredClone(original);
validEdit.find((item) => item.id === "cn-001").record.ingredients += "；白胡椒少许";
const valid = validateRecipeChange({ beforeSnapshot, currentCatalog: validEdit, targetId: "cn-001", requireChange: true });
assert.equal(valid.ok, true);

const unrelatedEdit = structuredClone(validEdit);
unrelatedEdit.find((item) => item.id === "cn-002").record.steps += "4）不应出现的改动。";
const unrelated = validateRecipeChange({ beforeSnapshot, currentCatalog: unrelatedEdit, targetId: "cn-001", requireChange: true });
assert.equal(unrelated.ok, false);
assert(unrelated.errors.some((error) => error.includes("cn-002")));

const malformed = structuredClone(validEdit);
malformed.find((item) => item.id === "cn-001").record.steps = "只有一步";
const badStructure = validateRecipeChange({ beforeSnapshot, currentCatalog: malformed, targetId: "cn-001", requireChange: true });
assert.equal(badStructure.ok, false);
assert(badStructure.errors.some((error) => error.includes("至少需要 2 条")));

const stableFieldEdit = structuredClone(validEdit);
stableFieldEdit.find((item) => item.id === "cn-001").record.img = "changed.png";
const badStableField = validateRecipeChange({ beforeSnapshot, currentCatalog: stableFieldEdit, targetId: "cn-001", requireChange: true });
assert.equal(badStableField.ok, false);
assert(badStableField.errors.some((error) => error.includes("img")));

console.log(JSON.stringify({
  ok: true,
  phase: 6,
  validTargetOnlyEdit: valid.ok,
  detectsUnrelatedEdit: !unrelated.ok,
  detectsMalformedSteps: !badStructure.ok,
  protectsStableFields: !badStableField.ok
}, null, 2));
