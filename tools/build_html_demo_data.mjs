import { writeFile } from "node:fs/promises";
import { chinese, western } from "./recipe_data.mjs";

const HERITAGE_FLAVORS = new Set([
  "桂林米粉",
  "羊肉泡馍",
  "胡辣汤",
  "柳州螺蛳粉",
  "兰州清汤牛肉面"
]);

const BASIC_INGREDIENT = /盐|糖|油|水|淀粉|胡椒|料酒|醋|生抽|老抽|酱油|香料|八角|香叶|花椒|葱|姜|蒜|高汤|鸡汤|鱼汤|牛高汤|百里香|迷迭香|孜然|泡打粉|小苏打/;

function cleanIngredientName(raw) {
  return raw
    .replace(/约\s*\d.*$/u, "")
    .replace(/\d.*$/u, "")
    .replace(/各适量|适量|少许|若干|一头|一瓣|一根|一块|一张|一罐|一袋/gu, "")
    .replace(/[；，,。]+$/u, "")
    .trim();
}

function parseIngredients(text) {
  return text
    .split(/[；;]/u)
    .map((raw, index) => {
      const label = raw.trim();
      const name = cleanIngredientName(label) || label;
      return {
        id: `ingredient-${String(index + 1).padStart(2, "0")}`,
        name,
        label,
        isCore: false
      };
    })
    .filter((item) => item.label);
}

function splitSteps(text) {
  const parts = text.split(/(?=\d+[）)])/u).map((part) => part.trim()).filter(Boolean);
  return parts.map((part, index) => {
    const instruction = part.replace(/^\d+[）)]\s*/u, "").trim();
    const durationMatch = [...instruction.matchAll(/(\d+)(?:[–—-](\d+))?\s*(分钟|小时)/gu)][0];
    const duration = durationMatch
      ? Number(durationMatch[2] || durationMatch[1]) * (durationMatch[3] === "小时" ? 3600 : 60)
      : /翻炒|拌匀|收汁|上色/u.test(instruction)
        ? 120
        : 180;
    const heat = /小火|低温/u.test(instruction)
      ? "low"
      : /大火|高温|200℃|190℃|180℃/u.test(instruction)
        ? "high"
        : "medium";
    return {
      id: `step-${String(index + 1).padStart(2, "0")}`,
      instruction,
      duration,
      heat,
      timerRequired: duration >= 300,
      ingredientsUsed: [],
      gameAction: /倒入|加入|放入|下锅/u.test(instruction)
        ? "add"
        : /翻炒|搅拌|拌匀/u.test(instruction)
          ? "stir"
          : /焖|炖|煮|烤|蒸/u.test(instruction)
            ? "wait"
            : "confirm",
      safetyNote: /炸|热油/u.test(instruction) ? "注意热油飞溅" : ""
    };
  });
}

function detectAllergens(text) {
  const rules = [
    ["peanut", /花生/u],
    ["dairy", /牛奶|奶油|黄油|芝士|奶酪|马苏里拉|帕玛森|酪乳|白酱/u],
    ["egg", /鸡蛋|蛋黄|蛋液|蛋白/u],
    ["fish", /鱼|鳕|鲈|凤尾鱼|三文鱼|鱼汤/u],
    ["shellfish", /虾|蟹|贝|蛤|青口|贻贝|鱿鱼/u],
    ["wheat", /面粉|面包|意大利面|面条|面片|馄饨|饺子|馍|馒头|薄饼|松饼|披萨|汉堡|酥皮|面包糠/u],
    ["soy", /豆腐|豆浆|腐竹|黄豆|豆皮|豆豉|豆瓣酱|生抽|老抽|酱油/u],
    ["sesame", /芝麻|香油/u]
  ];
  return rules.filter(([, pattern]) => pattern.test(text)).map(([id]) => id);
}

function estimateTime(text, steps) {
  const ranges = [...text.matchAll(/(\d+)(?:[–—-](\d+))?\s*(分钟|小时)/gu)].map((match) => {
    const value = Number(match[2] || match[1]);
    return value * (match[3] === "小时" ? 60 : 1);
  });
  const explicit = ranges.reduce((sum, value) => sum + value, 0);
  const estimate = explicit || 10 + steps.length * 7;
  return Math.max(15, Math.min(180, Math.ceil(estimate / 5) * 5));
}

function buildRecipe(recipe, index, type) {
  const ingredients = parseIngredients(recipe.ingredients);
  const steps = splitSteps(recipe.steps);
  const combined = `${recipe.ingredients} ${recipe.steps}`;
  const core = ingredients.filter((item) => !BASIC_INGREDIENT.test(item.name)).slice(0, 3);
  const coreIds = new Set(core.map((item) => item.id));
  ingredients.forEach((item) => {
    item.isCore = coreIds.has(item.id);
  });
  const time = estimateTime(combined, steps);
  const difficulty = time >= 70 || /复炸|酥皮|乳化|分次|隔水|发酵/u.test(combined)
    ? "进阶"
    : time <= 30 && ingredients.length <= 8
      ? "简单"
      : "适中";
  const isHeritageFlavor = HERITAGE_FLAVORS.has(recipe.name);
  const id = `${type === "chinese" ? "cn" : "west"}-${String(index + 1).padStart(3, "0")}`;
  const vegetarianCheckText = recipe.ingredients.replace(/鸡蛋|蛋黄|蛋液|蛋白/gu, "");

  return {
    id,
    name: recipe.name,
    en: recipe.en,
    cuisine: recipe.region,
    category: isHeritageFlavor ? "地域风味" : type === "chinese" ? "中餐" : "西餐",
    isHeritageFlavor,
    heritageStatus: isHeritageFlavor ? "pending-verification" : null,
    ingredients,
    steps,
    imageThumb: `assets/dishes/thumbnails/${recipe.img.replace(/\.png$/u, ".jpg")}`,
    imageFull: `assets/dishes/ai/${recipe.img}`,
    source: recipe.source,
    time,
    difficulty,
    defaultServings: /整鸡|600克|700克|800克/u.test(recipe.ingredients) ? 4 : 2,
    allergens: detectAllergens(recipe.ingredients),
    flags: {
      containsPork: /猪|五花肉|培根|火腿|香肠|叉烧|排骨|腊肠|腊味/u.test(recipe.ingredients),
      containsBeef: /牛肉|牛排|牛里脊|牛肩/u.test(recipe.ingredients),
      containsAlcohol: /红酒|白酒|料酒|啤酒|葡萄酒/u.test(recipe.ingredients),
      spicy: /辣椒|辣椒粉|泡椒|胡辣|花椒/u.test(recipe.ingredients),
      vegetarian: !/鸡|鸭|鱼|虾|蟹|贝|猪|牛|羊|肉|培根|火腿|香肠|排骨|螺蛳|螺狮|螺丝|海鲜|高汤|鸡汤|鱼汤|牛高汤/u.test(vegetarianCheckText)
    },
    demoEnriched: true
  };
}

const recipes = [
  ...chinese.map((recipe, index) => buildRecipe(recipe, index, "chinese")),
  ...western.map((recipe, index) => buildRecipe(recipe, index, "western"))
];

const output = `/* 由 tools/build_html_demo_data.mjs 生成，请勿直接手改。 */\nwindow.YANHUO_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`;
await writeFile(new URL("../data/recipes.js", import.meta.url), output, "utf8");
console.log(`Generated ${recipes.length} recipes.`);
