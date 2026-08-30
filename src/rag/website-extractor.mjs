import { normalizeRecipe } from "./normalize.mjs";

const requestHeaders = {
  "User-Agent": "Mozilla/5.0 (compatible; YanhuoRecipeResearch/0.1; +https://github.com/mayiwei442-bojack/yanhuo-youpu)",
  Accept: "text/html,application/xhtml+xml"
};

const entities = new Map([
  ["amp", "&"], ["lt", "<"], ["gt", ">"], ["quot", "\""], ["apos", "'"], ["nbsp", " "]
]);

export function decodeHtml(value) {
  return String(value || "").replace(/&(#x?[0-9a-f]+|[a-z]+);/giu, (_match, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return entities.get(entity.toLowerCase()) || `&${entity};`;
  });
}

export function stripHtml(value) {
  return decodeHtml(String(value || "")
    .replace(/<br\s*\/?\s*>/giu, "\n")
    .replace(/<script\b[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " "))
    .replace(/[ \t\f\v]+/gu, " ")
    .replace(/\s*\n\s*/gu, "\n")
    .trim();
}

function isoDuration(value) {
  const match = String(value || "").match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/u);
  if (!match) return null;
  const minutes = Number(match[1] || 0) * 60 + Number(match[2] || 0);
  return minutes ? `${minutes}分钟` : null;
}

function amountAndName(raw) {
  const value = stripHtml(raw);
  const match = value.match(/^((?:\d+(?:[./]\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s*[-–]\s*(?:\d+(?:[./]\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞]))?\s*(?:(?:small to medium|small|medium|large)\s+)?(?:(?:tsp|tbsp|teaspoons?|tablespoons?|cups?|g|kg|ml|oz|pounds?)\b)?)(?:\s+)(.+)$/iu);
  return match
    ? { name: match[2].trim(), amount: match[1].trim(), raw: value, evidence: "explicit" }
    : { name: value, amount: null, raw: value, evidence: "explicit" };
}

function instructionText(item) {
  if (typeof item === "string") return stripHtml(item);
  if (Array.isArray(item?.itemListElement)) return item.itemListElement.map(instructionText).filter(Boolean).join(" ");
  return stripHtml(item?.text || item?.name || "");
}

function stepFromText(text, index) {
  const duration = text.match(/(?:约|大约)?\s*\d+(?:\s*[-–至]\s*\d+)?\s*(?:秒|分钟|小时|seconds?|minutes?|hours?)/iu)?.[0] || null;
  const heat = text.match(/大火|中大火|中火|中小火|小火|high heat|medium(?:-high)? heat|low heat/iu)?.[0] || null;
  return { order: index + 1, instruction: text, duration, heat, evidence: "explicit" };
}

function recipeNodeFromJsonLd(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)];
  for (const match of scripts) {
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = Array.isArray(parsed) ? parsed : (parsed?.["@graph"] || [parsed]);
      const recipe = nodes.find((node) => {
        const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
        return types.includes("Recipe");
      });
      if (recipe) return recipe;
    } catch {
      // Ignore malformed third-party JSON-LD and continue with the next block.
    }
  }
  return null;
}

function metaContent(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, "iu"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["'][^>]*>`, "iu")
  ];
  return stripHtml(patterns.map((pattern) => html.match(pattern)?.[1]).find(Boolean) || "");
}

export function extractJsonLdRecipe(html, { canonicalName, category, sourceName, url, retrievedAt = new Date().toISOString() }) {
  const node = recipeNodeFromJsonLd(html);
  if (!node) throw new Error("页面没有可用的 Recipe JSON-LD");
  const instructionItems = typeof node.recipeInstructions === "string" && /(?:^|\s)\d+[.)、]/u.test(node.recipeInstructions)
    ? node.recipeInstructions.split(/(?=(?:^|\s)\d+[.)、])/u)
    : (Array.isArray(node.recipeInstructions) ? node.recipeInstructions : [node.recipeInstructions]);
  const instructions = instructionItems
    .map(instructionText)
    .map((text) => text.replace(/^\d+[.)、]\s*/u, ""))
    .filter(Boolean);
  const technique = [node.prepTime, node.cookTime, node.totalTime]
    .map(isoDuration)
    .filter(Boolean)
    .map((text, index) => `${["准备", "烹饪", "总用时"][index] || "用时"}：${text}`);
  const possibleTips = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/giu)]
    .map((match) => stripHtml(match[1]))
    .filter((text) => text.length >= 12 && text.length <= 280 && /substitut|if you can'?t find|be sure|make sure|avoid|小贴士|注意|想要|尽量|不要|建议/iu.test(text))
    .slice(0, 5);
  return normalizeRecipe({
    recipeName: canonicalName,
    aliases: [stripHtml(node.name)].filter((name) => name && name !== canonicalName),
    category,
    cuisine: "家常菜",
    summary: stripHtml(node.description),
    ingredients: (node.recipeIngredient || []).map(amountAndName),
    steps: instructions.map(stepFromText),
    technique,
    tips: possibleTips,
    source: {
      type: "website",
      name: sourceName,
      url,
      retrievalMethod: "JSON-LD + HTML正文",
      retrievedAt
    },
    metadata: {
      prepTime: isoDuration(node.prepTime),
      cookTime: isoDuration(node.cookTime),
      totalTime: isoDuration(node.totalTime),
      recipeYield: stripHtml(node.recipeYield)
    }
  });
}

function htmlSection(html, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start < 0) return "";
  const end = html.indexOf(endMarker, start + startMarker.length);
  return html.slice(start, end < 0 ? undefined : end);
}

export function extractDouguoRecipe(html, { canonicalName, category, sourceName, url, retrievedAt = new Date().toISOString() }) {
  const ingredientSection = htmlSection(html, '<div class="metarial">', '<!-- 步骤 -->');
  const ingredients = [...ingredientSection.matchAll(/<span class=["']scname["'][^>]*>([\s\S]*?)<\/span>\s*<span class=["'][^"']*scnum["'][^>]*>([\s\S]*?)<\/span>/giu)]
    .map((match) => {
      const name = stripHtml(match[1]);
      const amount = stripHtml(match[2]) || null;
      return { name, amount, raw: [name, amount].filter(Boolean).join(" "), evidence: "explicit" };
    })
    .filter((item) => item.name);
  const stepSection = htmlSection(html, '<div class="step">', '<!-- 小贴士 -->');
  const steps = [...stepSection.matchAll(/<div class=["']stepinfo["'][^>]*>\s*<p>[^<]*<\/p>([\s\S]*?)<\/div>/giu)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean)
    .map(stepFromText);
  const tipsSection = htmlSection(html, '<div class="tips">', '<p class="creattime"');
  const tipsText = stripHtml(tipsSection.replace(/<h2[\s\S]*?<\/h2>/iu, ""))
    .replace(/做菜好吃都有技巧[\s\S]*$/u, "")
    .trim();
  const tips = tipsText
    ? tipsText.split(/(?=\d+[、.])/u).map((text) => text.replace(/^\d+[、.]\s*/u, "").trim()).filter(Boolean)
    : [];
  const sourceTitle = stripHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/iu)?.[1] || "");
  const technique = [...new Set(steps.flatMap((step) => [step.duration, step.heat].filter(Boolean)))];
  return normalizeRecipe({
    recipeName: canonicalName,
    aliases: [sourceTitle].filter((name) => name && name !== canonicalName),
    category,
    cuisine: "家常菜",
    summary: metaContent(html, "description"),
    ingredients,
    steps,
    technique,
    tips,
    source: {
      type: "website",
      name: sourceName,
      url,
      retrievalMethod: "HTML正文",
      retrievedAt
    },
    metadata: { sourceRecipeName: sourceTitle }
  });
}

export function detectAccessBlock(response, html) {
  const title = stripHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/iu)?.[1] || "");
  if (response.status === 401 || response.status === 403 || response.status === 429) {
    return `HTTP ${response.status}`;
  }
  if (/humancheck_captcha|滑动验证|访问验证|验证码/iu.test(`${response.url}\n${title}\n${html.slice(0, 10000)}`)) {
    return `访问被人机验证拦截（${title || "captcha"}）`;
  }
  return null;
}

export async function fetchHtml(url, { fetchImpl = globalThis.fetch } = {}) {
  const response = await fetchImpl(url, { redirect: "follow", headers: requestHeaders });
  const html = await response.text();
  const blocked = detectAccessBlock(response, html);
  if (blocked) {
    const error = new Error(blocked);
    error.code = "ACCESS_BLOCKED";
    error.status = response.status;
    error.finalUrl = response.url;
    throw error;
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { html, finalUrl: response.url, status: response.status };
}
