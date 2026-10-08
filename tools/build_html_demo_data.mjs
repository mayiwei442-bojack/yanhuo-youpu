import { writeFile } from "node:fs/promises";
import { chinese, western } from "./recipe_data.mjs";
import { isAuthorizedHeroOnly } from "./workflow/source-policy.mjs";
import { stepDuration, stepHeat, recipeTotalMinutes, sourceStepDurations } from "./recipe-step-metadata.mjs";
import { cleanIngredientName } from "./recipe-ingredient-metadata.mjs";
import { applyComponentDietaryMetadata } from "./recipe-component-metadata.mjs";
import { splitRecipeSteps } from "./workflow/recipe-state.mjs";

const HERITAGE_FLAVORS = new Set([
  "桂林米粉",
  "羊肉泡馍",
  "胡辣汤",
  "柳州螺蛳粉",
  "兰州清汤牛肉面"
]);

const BASIC_INGREDIENT = /盐|糖|油|水|淀粉|胡椒|料酒|醋|生抽|老抽|酱油|香料|八角|香叶|花椒|葱|姜|蒜|高汤|鸡汤|鱼汤|牛高汤|百里香|迷迭香|孜然|泡打粉|小苏打/;

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
  const parts = splitRecipeSteps(text);
  return parts.map((part, index) => {
    const instruction = part.replace(/^\d+[）)]\s*/u, "").trim();
    const duration = stepDuration(instruction);
    const heat = stepHeat(instruction);
    return {
      id: `step-${String(index + 1).padStart(2, "0")}`,
      instruction,
      duration,
      heat,
      timerRequired: duration !== null && duration >= 300,
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
    ["dairy", /牛奶|奶油|黄油|芝士|奶酪|干酪|马苏里拉|帕玛森|酪乳|白酱/u],
    ["egg", /鸡蛋|鸭蛋|鹌鹑蛋|皮蛋|咸蛋|荷包蛋|蛋黄|蛋液|蛋白|蛋清/u],
    ["fish", /鱼(?!香)|鳕|鲈|凤尾鱼|三文鱼|鱼汤/u],
    ["shellfish", /虾|蟹|贝|蛤|青口|贻贝|鱿鱼|蚝|牡蛎/u],
    ["wheat", /面粉|面包|意大利面|面条|碱水面|挂面|面筋|面片|馄饨|饺子|馍|馒头|薄饼|松饼|披萨|汉堡|酥皮|面包糠/u],
    ["soy", /豆腐|豆浆|腐竹|黄豆|豆皮|豆豉|豆瓣酱|生抽|老抽|酱油/u],
    ["sesame", /芝麻|香油/u]
  ];
  return rules.filter(([, pattern]) => pattern.test(text)).map(([id]) => id);
}

function buildRecipe(recipe, index, type) {
  const ingredients = parseIngredients(recipe.ingredients);
  const steps = splitSteps(recipe.steps);
  const durations = sourceStepDurations(recipe.timing, steps.map((step) => step.instruction));
  steps.forEach((step, index) => {
    step.duration = durations[index];
    if (recipe.howtocook && /\d+(?:\.\d+)?\s*[-–—~～至到]\s*\d+(?:\.\d+)?\s*(?:秒|分钟|小时)/u.test(step.instruction)) step.duration = null;
    if (recipe.howtocook && index > 0 && /^\d+(?:\.\d+)?\s*(?:秒|分钟|小时)后/u.test(step.instruction) && step.duration === durations[index - 1]) step.duration = null;
    if (recipe.howtocook && /\d+(?:\.\d+)?\s*(?:分钟|小时|秒)[\s\S]*?(?:转|改|调)(?:为|至|成)?[中小大高低]/u.test(step.instruction)) step.heat = null;
    if (recipe.howtocook && /一晚|一夜|隔夜|半天/u.test(step.instruction)) step.duration = null;
    step.timerRequired = step.duration !== null && step.duration >= 300;
  });
  if (recipe.servings != null && (!Number.isInteger(recipe.servings) || recipe.servings <= 0)) throw new Error(`${recipe.name} 的来源份数必须是正整数`);
  const media = recipe.media || null;
  if (media) {
    if (media.recipePageUrl !== recipe.source) {
      throw new Error(`${recipe.name} 的媒体菜谱 URL 与正文信源不一致`);
    }
    if (!media.hero?.path || /^https?:/u.test(media.hero.path)) {
      throw new Error(`${recipe.name} 缺少仓库本地成品图`);
    }
    const heroOnly = isAuthorizedHeroOnly({ recipeId: `${type === "chinese" ? "cn" : "west"}-${String(index + 1).padStart(3, "0")}`, sourceUrl: recipe.source, authorization: media.heroOnlyAuthorization });
    if (!Array.isArray(media.steps) || (media.steps.length < 1 && !heroOnly)) {
      throw new Error(`${recipe.name} 至少需要一张仓库本地步骤图`);
    }
    const mappedOrders = new Set();
    for (const mapped of media.steps) {
      if (!Number.isInteger(mapped.stepOrder) || mapped.stepOrder < 1 || mapped.stepOrder > steps.length || mappedOrders.has(mapped.stepOrder)) {
        throw new Error(`${recipe.name} 的步骤图序号无效或重复`);
      }
      if (!mapped.path || /^https?:/u.test(mapped.path)) {
        throw new Error(`${recipe.name} 第 ${mapped.stepOrder} 步缺少仓库本地图片路径`);
      }
      mappedOrders.add(mapped.stepOrder);
      const step = steps[mapped.stepOrder - 1];
      step.image = mapped.path;
      step.imageSource = media.recipePageUrl;
    }
  }
  const combined = `${recipe.ingredients} ${recipe.steps}`;
  const core = ingredients.filter((item) => !BASIC_INGREDIENT.test(item.name)).slice(0, 3);
  const coreIds = new Set(core.map((item) => item.id));
  ingredients.forEach((item) => {
    item.isCore = coreIds.has(item.id);
  });
  const sourceBacked = Boolean(media || recipe.howtocook);
  const time = recipeTotalMinutes(combined, steps.length, recipe.timing, { requireSourceTotal: sourceBacked });
  const sourceStars = recipe.howtocook?.rawMarkdown.match(/预估烹饪难度[：:]\s*(★+)/u)?.[1];
  const difficulty = recipe.difficulty ?? (sourceStars ? (sourceStars.length <= 2 ? "简单" : sourceStars.length >= 4 ? "进阶" : "适中") : time >= 70 || /复炸|酥皮|乳化|分次|隔水|发酵/u.test(combined)
    ? "进阶"
    : time !== null && time <= 30 && ingredients.length <= 8
      ? "简单"
      : "适中");
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
    ...(recipe.howtocook ? { howtocook: { ...recipe.howtocook, difficultyStars: sourceStars || null } } : {}),
    ...(recipe.recipeLinks?.length ? { recipeLinks: recipe.recipeLinks } : {}),
    ...(recipe.sourceLimitations?.length ? { sourceLimitations: recipe.sourceLimitations } : {}),
    ...(Array.isArray(recipe.relatedImages) && recipe.relatedImages.length
      ? { relatedImages: recipe.relatedImages }
      : {}),
    imageThumb: media?.hero?.path || `assets/dishes/thumbnails/${recipe.img.replace(/\.png$/u, ".jpg")}`,
    imageFull: media?.hero?.path || `assets/dishes/ai/${recipe.img}`,
    source: recipe.source,
    ...(media
      ? {
          media: {
            sourceName: media.sourceName,
            recipePageUrl: media.recipePageUrl,
            mediaPageUrl: media.mediaPageUrl,
            author: media.author || null,
            rightsNotice: media.rightsNotice || null,
            reuseLicense: media.reuseLicense || null,
            repositoryCopyAuthorization: media.repositoryCopyAuthorization || null,
            ...(media.heroOnlyAuthorization ? { heroOnlyAuthorization: media.heroOnlyAuthorization } : {})
          }
        }
      : {}),
    time,
    timeBasis: recipe.timing ? "source" : sourceBacked ? "unspecified" : "estimated",
    difficulty,
    defaultServings: recipe.servings ?? (sourceBacked ? null : /整鸡|600克|700克|800克/u.test(recipe.ingredients) ? 4 : 2),
    servingsBasis: recipe.servings != null ? "source" : sourceBacked ? "unspecified" : "estimated",
    allergens: detectAllergens(recipe.ingredients),
    flags: {
      containsPork: /猪|五花肉|培根|火腿|香肠|叉烧|排骨|腊肠|腊味/u.test(recipe.ingredients),
      containsBeef: /牛肉|牛排|牛里脊|牛肩|牛高汤|牛骨/u.test(recipe.ingredients),
      containsAlcohol: /红酒|白酒|料酒|绍兴酒|啤酒|葡萄酒|雪莉酒|味美思|波特酒/u.test(recipe.ingredients),
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

for (const recipe of recipes) {
  for (const link of recipe.recipeLinks || []) {
    const target = recipes.find((item) => item.id === link.recipeId);
    if (!target || target.id === recipe.id || target.name !== link.name) throw new Error(`${recipe.name} 的关联菜谱不存在、名称不符或指向自己`);
    if (!`${recipe.name} ${recipe.ingredients.map((item) => item.label).join(" ")} ${recipe.steps.map((step) => step.instruction).join(" ")}`.includes(link.name)) throw new Error(`${recipe.name} 的关联菜名未出现在正文`);
  }
}
applyComponentDietaryMetadata(recipes);
const output = `/* 由 tools/build_html_demo_data.mjs 生成，请勿直接手改。 */\nwindow.YANHUO_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`;
await writeFile(new URL("../data/recipes.js", import.meta.url), output, "utf8");
console.log(`Generated ${recipes.length} recipes.`);
