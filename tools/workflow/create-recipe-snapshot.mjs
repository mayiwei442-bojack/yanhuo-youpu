import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createRecipeSnapshot } from "./recipe-state.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const output = option("--output");
if (!output) throw new Error("用法：npm run rag:snapshot -- --output <snapshot.json>");

const absoluteOutput = resolve(process.cwd(), output);
await mkdir(dirname(absoluteOutput), { recursive: true });
const snapshot = createRecipeSnapshot();
await writeFile(absoluteOutput, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ ok: true, recipes: snapshot.recipes.length, output: absoluteOutput }, null, 2));
