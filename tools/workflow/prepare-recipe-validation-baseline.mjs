import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createRecipeSnapshot } from "./recipe-state.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const target = option("--target");
const priorPath = option("--prior");
const output = option("--output");
if (!target || !priorPath || !output) {
  throw new Error("Usage: node tools/workflow/prepare-recipe-validation-baseline.mjs --target <id> --prior <snapshot.json> --output <snapshot.json>");
}

const prior = JSON.parse(await readFile(resolve(process.cwd(), priorPath), "utf8"));
const priorTarget = prior.recipes?.find((recipe) => recipe.id === target);
const allowAddition = process.argv.includes("--allow-addition");
if (!priorTarget && !allowAddition) throw new Error(`Target ${target} is absent from prior snapshot.`);
if (priorTarget && allowAddition) throw new Error(`Target ${target} already exists in prior snapshot.`);

const baseline = createRecipeSnapshot();
const targetIndex = baseline.recipes.findIndex((recipe) => recipe.id === target);
if (targetIndex < 0) throw new Error(`Target ${target} is absent from current snapshot.`);
if (allowAddition) {
  baseline.recipes.splice(targetIndex, 1);
  if (JSON.stringify(baseline.recipes.map((recipe) => recipe.id)) !== JSON.stringify(prior.recipes.map((recipe) => recipe.id))) {
    throw new Error("Addition baseline must preserve the prior catalog IDs and order.");
  }
} else {
  baseline.recipes[targetIndex] = priorTarget;
}

const absoluteOutput = resolve(process.cwd(), output);
await mkdir(dirname(absoluteOutput), { recursive: true });
await writeFile(absoluteOutput, `${JSON.stringify(baseline, null, 2)}\n`, { flag: "wx" });
process.stdout.write(`${JSON.stringify({ ok: true, target, output: absoluteOutput }, null, 2)}\n`);
