import { createHash } from "node:crypto";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const manifestIndex = args.indexOf("--manifest");
const outputIndex = args.indexOf("--output");

if (manifestIndex === -1 || !args[manifestIndex + 1]) {
  throw new Error("Usage: node tools/workflow/import-source-images.mjs --manifest <manifest.json>");
}

const workspaceRoot = path.resolve(process.cwd());
const allowedRoot = path.resolve(workspaceRoot, "assets", "dishes", "sources");
const manifestPath = path.resolve(workspaceRoot, args[manifestIndex + 1]);
const manifest = JSON.parse(await (await import("node:fs/promises")).readFile(manifestPath, "utf8"));

if (!/^(cn|west)-\d{3}$/.test(manifest.recipeId ?? "")) {
  throw new Error("Manifest recipeId must match cn-NNN or west-NNN.");
}

if (manifest.authorization !== "user_confirmed_2026-09-16") {
  throw new Error("Manifest must record authorization=user_confirmed_2026-09-16.");
}

if (!Array.isArray(manifest.items) || manifest.items.length < 2) {
  throw new Error("Manifest must contain at least one hero and one step image.");
}

const heroes = manifest.items.filter((item) => item.role === "hero");
const steps = manifest.items.filter((item) => item.role === "step");
if (heroes.length !== 1 || steps.length < 1) {
  throw new Error("Manifest must contain exactly one hero and at least one step image.");
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function sniffImage(buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }
  return null;
}

const imported = [];
for (const item of manifest.items) {
  if (!/^https:\/\//i.test(item.originalUrl ?? "")) {
    throw new Error(`Image URL must use HTTPS: ${item.originalUrl ?? "<missing>"}`);
  }
  if (!/^assets\/dishes\/sources\//.test(item.repositoryPath ?? "")) {
    throw new Error(`Invalid repositoryPath: ${item.repositoryPath ?? "<missing>"}`);
  }
  if (item.role === "step" && (!Number.isInteger(item.stepOrder) || item.stepOrder < 1)) {
    throw new Error(`Step image requires a positive stepOrder: ${item.repositoryPath}`);
  }

  const target = path.resolve(workspaceRoot, item.repositoryPath);
  if (!isInside(allowedRoot, target)) {
    throw new Error(`Target escapes assets/dishes/sources: ${item.repositoryPath}`);
  }

  const response = await fetch(item.originalUrl, {
    redirect: "follow",
    headers: {
      "User-Agent": "YanhuoYoupuAuthorizedMediaImport/1.0",
      Accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
      ...(manifest.referer ? { Referer: manifest.referer } : {})
    }
  });
  if (!response.ok) {
    throw new Error(`Image download failed (${response.status}): ${item.originalUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error(`Image download returned an empty body: ${item.originalUrl}`);
  }
  const detectedType = sniffImage(buffer);
  const responseType = (response.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  if (!detectedType || !responseType.startsWith("image/")) {
    throw new Error(`Downloaded content is not a supported image: ${item.originalUrl}`);
  }

  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.partial`;
  try {
    await writeFile(temporary, buffer, { flag: "wx" });
    await rename(temporary, target);
  } finally {
    await rm(temporary, { force: true });
  }

  imported.push({
    role: item.role,
    ...(item.role === "step" ? { stepOrder: item.stepOrder } : {}),
    originalUrl: item.originalUrl,
    repositoryPath: item.repositoryPath.replaceAll("\\", "/"),
    sha256: createHash("sha256").update(buffer).digest("hex"),
    httpStatus: response.status,
    contentType: detectedType,
    bytes: buffer.length
  });
}

const result = { recipeId: manifest.recipeId, items: imported };
if (outputIndex !== -1) {
  if (!args[outputIndex + 1]) throw new Error("--output requires a JSON path.");
  const outputPath = path.resolve(workspaceRoot, args[outputIndex + 1]);
  if (!isInside(workspaceRoot, outputPath)) throw new Error("Output path must stay inside the workspace.");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
