import { createHash } from "node:crypto";

const evidenceKinds = new Set(["explicit", "derived"]);

function cleanText(value) {
  return typeof value === "string" ? value.replace(/\s+/gu, " ").trim() : "";
}

function normalizeEvidence(value, fallback = "explicit") {
  return evidenceKinds.has(value) ? value : fallback;
}

function normalizeIngredient(item) {
  if (typeof item === "string") {
    const raw = cleanText(item);
    return { name: raw, amount: null, raw, evidence: "explicit" };
  }
  const raw = cleanText(item?.raw) || [cleanText(item?.name), cleanText(item?.amount)].filter(Boolean).join(" ");
  const name = cleanText(item?.name) || raw;
  if (!name || !raw) throw new Error("ingredient 必须包含 name/raw");
  return {
    name,
    amount: cleanText(item?.amount) || null,
    raw,
    evidence: normalizeEvidence(item?.evidence)
  };
}

function normalizeStep(item, index) {
  if (typeof item === "string") {
    const instruction = cleanText(item);
    if (!instruction) throw new Error("step instruction 不能为空");
    return { order: index + 1, instruction, duration: null, heat: null, evidence: "explicit" };
  }
  const instruction = cleanText(item?.instruction);
  if (!instruction) throw new Error("step instruction 不能为空");
  return {
    order: Number.isInteger(item?.order) && item.order > 0 ? item.order : index + 1,
    instruction,
    duration: cleanText(item?.duration) || null,
    heat: cleanText(item?.heat) || null,
    evidence: normalizeEvidence(item?.evidence)
  };
}

function normalizeTextList(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    if (typeof item === "string") return { text: cleanText(item), evidence: "explicit" };
    return { text: cleanText(item?.text), evidence: normalizeEvidence(item?.evidence) };
  }).filter((item) => item.text);
}

function normalizeSource(source) {
  if (!source || !["website", "book"].includes(source.type)) {
    throw new Error("source.type 必须是 website 或 book");
  }
  const name = cleanText(source.name);
  if (!name) throw new Error("source.name 不能为空");
  if (source.type === "website" && !cleanText(source.url)) throw new Error("website source.url 不能为空");
  if (source.type === "book" && !cleanText(source.bookTitle)) throw new Error("book source.bookTitle 不能为空");
  return {
    type: source.type,
    name,
    url: cleanText(source.url) || null,
    bookTitle: cleanText(source.bookTitle) || null,
    author: cleanText(source.author) || null,
    pageStart: Number.isInteger(source.pageStart) ? source.pageStart : null,
    pageEnd: Number.isInteger(source.pageEnd) ? source.pageEnd : null,
    location: cleanText(source.location) || null,
    retrievalMethod: cleanText(source.retrievalMethod) || null,
    retrievedAt: cleanText(source.retrievedAt) || new Date().toISOString()
  };
}

export function normalizeRecipe(input) {
  const recipeName = cleanText(input?.recipeName);
  if (!recipeName) throw new Error("recipeName 不能为空");
  if (!["chinese", "western"].includes(input?.category)) throw new Error("category 必须是 chinese 或 western");
  const ingredients = (input.ingredients || []).map(normalizeIngredient);
  const steps = (input.steps || []).map(normalizeStep).sort((a, b) => a.order - b.order);
  if (!ingredients.length) throw new Error("ingredients 不能为空");
  if (!steps.length) throw new Error("steps 不能为空");
  return {
    recipeName,
    aliases: [...new Set((input.aliases || []).map(cleanText).filter(Boolean))],
    category: input.category,
    cuisine: cleanText(input.cuisine) || null,
    summary: cleanText(input.summary),
    ingredients,
    steps,
    technique: normalizeTextList(input.technique),
    tips: normalizeTextList(input.tips),
    source: normalizeSource(input.source),
    metadata: input.metadata && typeof input.metadata === "object" ? input.metadata : {}
  };
}

export function sha256(value) {
  return createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
}

export function normalizedRecipeToText(recipe) {
  return [
    `菜名：${recipe.recipeName}`,
    recipe.summary ? `简介：${recipe.summary}` : "",
    `原料：${recipe.ingredients.map((item) => item.raw).join("；")}`,
    `步骤：${recipe.steps.map((step) => `${step.order}. ${step.instruction}`).join(" ")}`,
    recipe.technique.length ? `技法：${recipe.technique.map((item) => item.text).join("；")}` : "",
    recipe.tips.length ? `提示：${recipe.tips.map((item) => item.text).join("；")}` : ""
  ].filter(Boolean).join("\n");
}
