import { spawnSync } from "node:child_process";
import { normalizeRecipe } from "./normalize.mjs";

function decodeEntities(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/giu, (_match, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? _match;
  });
}

function stripTags(value) {
  return decodeEntities(value
    .replace(/<img\b[^>]*>/giu, " ")
    .replace(/<br\s*\/?\s*>/giu, "\n")
    .replace(/<\/p\s*>/giu, "\n")
    .replace(/<[^>]+>/gu, " "))
    .replace(/[\t\u00a0]+/gu, " ")
    .replace(/ *\n */gu, "\n")
    .replace(/\n{2,}/gu, "\n")
    .trim();
}

export function readEpubEntry(epubPath, entryPath, { tarCommand = "tar" } = {}) {
  const result = spawnSync(tarCommand, ["-xOf", epubPath, entryPath], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`无法读取 EPUB 条目 ${entryPath}: ${result.stderr || `tar exit ${result.status}`}`);
  return result.stdout;
}

export function parseEpubNavigation(ncx) {
  const entries = [];
  const pattern = /<navPoint\b[^>]*>[\s\S]*?<navLabel>\s*<text>([\s\S]*?)<\/text>\s*<\/navLabel>\s*<content\s+src="([^"]+)"\s*\/>/giu;
  for (const match of ncx.matchAll(pattern)) {
    const [entry, anchor = ""] = decodeEntities(match[2]).split("#");
    entries.push({ name: stripTags(match[1]), entry, anchor, location: `${entry}${anchor ? `#${anchor}` : ""}` });
  }
  return entries;
}

function parseIngredients(raw) {
  const compact = raw.replace(/\s+/gu, " ").trim();
  const matches = [...compact.matchAll(/([\p{Script=Han}A-Za-z、（）()]+?)\s*((?:约\s*)?(?:\d+(?:\.\d+)?|半|一|二|三|四|五|六|七|八|九|十|两)(?:\s*[-–—~～]\s*\d+(?:\.\d+)?)?\s*(?:g|kg|ml|克|千克|毫升|个|只|块|瓣|根|片|棵|枚|条|袋|杯|匙|勺|段|粒|张|截|斤|碗)?(?:左右)?|适量|少许)(?=\s+[\p{Script=Han}A-Za-z、（）()]|$)/giu)];
  if (!matches.length) return compact ? [{ name: compact, amount: null, raw: compact }] : [];
  return matches.map((match) => ({ name: match[1].trim(), amount: match[2].trim(), raw: `${match[1].trim()} ${match[2].trim()}` }));
}

function parseSteps(raw) {
  const matches = [...raw.matchAll(/(?:^|\n)\s*(\d+)[.．、]\s*([\s\S]*?)(?=(?:\n\s*\d+[.．、])|$)/gu)];
  return matches.map((match, index) => ({ order: Number(match[1]) || index + 1, instruction: match[2].replace(/\s+/gu, " ").trim() }));
}

export function extractEpubRecipeSection(html, {
  recipeName,
  anchor,
  entry,
  bookTitle,
  author,
  retrievedAt = new Date().toISOString()
}) {
  const anchorPattern = new RegExp(`<a\\s+[^>]*id=["']${anchor.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}["'][^>]*>\\s*<\\/a>`, "iu");
  const anchorMatch = anchorPattern.exec(html);
  if (!anchorMatch) throw new Error(`EPUB 中找不到锚点 ${entry}#${anchor}`);
  const tail = html.slice(anchorMatch.index + anchorMatch[0].length);
  const nextAnchor = /<a\s+[^>]*id=["'][^"']+["'][^>]*>\s*<\/a>/iu.exec(tail);
  const sectionHtml = nextAnchor ? tail.slice(0, nextAnchor.index) : tail;
  const text = stripTags(sectionHtml);
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const titleIndex = lines.findIndex((line) => line === recipeName);
  const content = titleIndex >= 0 ? lines.slice(titleIndex + 1) : lines;
  const ingredientIndex = content.findIndex((line) => /^用料[：:]?$/u.test(line));
  const methodIndex = content.findIndex((line) => /做法[：:]?/u.test(line));
  if (ingredientIndex < 0 || methodIndex < 0 || methodIndex <= ingredientIndex) {
    throw new Error(`${recipeName} 的 EPUB 结构缺少用料或做法标记`);
  }
  const methodLine = content[methodIndex];
  const embeddedIngredient = methodLine.replace(/做法[：:]?[\s\S]*$/u, "").trim();
  const ingredientText = [...content.slice(ingredientIndex + 1, methodIndex), embeddedIngredient].filter(Boolean).join(" ");
  const tipsIndex = content.findIndex((line, index) => index > methodIndex && /^家传小诀窍[：:]?$/u.test(line));
  const stepsText = content.slice(methodIndex + 1, tipsIndex >= 0 ? tipsIndex : undefined).join("\n");
  const preparationLine = content.find((line) => /准备[：:]?\s*\d+\s*分钟/u.test(line)) || "";
  const cookingLine = content.find((line) => /烹饪[：:]?\s*\d+\s*分钟/u.test(line)) || "";
  const summaryLines = content.slice(0, ingredientIndex).filter((line) => !/准备[：:]?|烹饪[：:]?/u.test(line));
  const tips = tipsIndex >= 0 ? content.slice(tipsIndex + 1).map((line) => line.replace(/\s+/gu, " ").trim()).filter(Boolean) : [];
  const steps = parseSteps(stepsText);
  const ingredients = parseIngredients(ingredientText);
  if (!ingredients.length || steps.length < 2) throw new Error(`${recipeName} 的 EPUB 提取结果不完整`);
  const normalizedRecipe = normalizeRecipe({
    recipeName,
    aliases: [],
    category: "chinese",
    summary: summaryLines.join(" "),
    ingredients,
    steps,
    technique: [preparationLine, cookingLine].filter(Boolean),
    tips,
    source: {
      type: "book",
      name: bookTitle,
      bookTitle,
      author,
      pageStart: null,
      pageEnd: null,
      location: `${entry}#${anchor}`,
      retrievalMethod: "EPUB XHTML section",
      retrievedAt
    },
    metadata: { epubLocation: `${entry}#${anchor}`, fixedPageNumbersAvailable: false }
  });
  return { normalizedRecipe, rawText: text, sectionHtml };
}

export function extractRecipeFromEpub(epubPath, recipeName, {
  bookTitle = "贝太厨房:从小爱吃的菜2",
  author = "《贝太厨房》工作室",
  ncxEntry = "OEBPS/toc.ncx",
  contentRoot = "OEBPS/",
  retrievedAt
} = {}) {
  const navigation = parseEpubNavigation(readEpubEntry(epubPath, ncxEntry));
  const matches = navigation.filter((item) => item.name === recipeName && item.anchor);
  if (matches.length !== 1) throw new Error(`EPUB 菜名 ${recipeName} 应唯一，实际 ${matches.length} 条`);
  const nav = matches[0];
  const html = readEpubEntry(epubPath, `${contentRoot}${nav.entry}`);
  return extractEpubRecipeSection(html, { ...nav, recipeName, bookTitle, author, retrievedAt });
}
