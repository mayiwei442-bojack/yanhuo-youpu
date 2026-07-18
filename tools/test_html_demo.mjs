import { chromium } from "file:///C:/Users/myw/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.61.1/node_modules/playwright/index.mjs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const baseUrl = pathToFileURL(resolve(process.env.DEMO_ENTRY || "index.html")).href;
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox", "--allow-file-access-from-files"]
});

const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});
page.on("pageerror", (error) => errors.push(`page: ${error.message}`));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(`${baseUrl}#/home`, { waitUntil: "load" });
  await page.waitForSelector(".hero-title");
  assert(await page.locator("#bottom-nav button").count() === 4, "底部导航不是 4 项");
  assert((await page.locator(".hero-title").innerText()).includes("今天吃什么"), "首页主标题缺失");
  const primaryBackground = await page.locator(".choice-card.primary").evaluate((element) => getComputedStyle(element, "::before").backgroundImage);
  assert(primaryBackground.includes("home-ingredient-basket-v1.png"), "第一张主入口卡没有食材篮背景图");
  const secondaryBackground = await page.locator(".choice-card.secondary").evaluate((element) => getComputedStyle(element, "::before").backgroundImage);
  assert(secondaryBackground.includes("32-beijing-kaoya.png"), "第二张主入口卡没有高清菜品背景图");
  await page.setViewportSize({ width: 938, height: 945 });
  const primaryBox = await page.locator(".choice-card.primary").boundingBox();
  const secondaryBox = await page.locator(".choice-card.secondary").boundingBox();
  assert(primaryBox && secondaryBox, "首页主入口卡尺寸无法读取");
  assert(Math.abs(primaryBox.width - secondaryBox.width) < 1, "01、02 主入口卡宽度不一致");
  assert(Math.abs(primaryBox.height - secondaryBox.height) < 1, "01、02 主入口卡高度不一致");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "outputs/qa-html-home-mobile.png", fullPage: true });

  await page.goto(`${baseUrl}#/pantry`, { waitUntil: "load" });
  await page.waitForSelector("#ingredient-grid");
  assert(await page.locator(".ingredient-tile").count() === 35, "食材库不是 35 项");
  await page.fill("#custom-ingredient", "香菜");
  await page.locator("#custom-ingredient-form button[type=submit]").click();
  assert((await page.locator(".pantry-board strong").innerText()).includes("4 样食材"), "自定义食材未加入");
  await page.locator(".selected-pixel .custom-pixel").click();
  assert((await page.locator(".pantry-board strong").innerText()).includes("4 样食材"), "点击已选食材图像不应直接删除");
  await page.locator(".selected-remove").last().click();
  assert((await page.locator(".pantry-board strong").innerText()).includes("3 样食材"), "右上角删除按钮没有移除食材");
  await page.screenshot({ path: "outputs/qa-html-pantry-mobile.png", fullPage: true });

  await page.locator('[data-action="find-recipes"]').click();
  await page.waitForSelector(".recommendation-page");
  assert(await page.locator(".recommendation-card").count() > 0, "没有生成推荐结果");
  await page.screenshot({ path: "outputs/qa-html-recommendations-mobile.png", fullPage: true });

  await page.locator('.recommendation-card [data-action="open-recipe"]').first().click();
  await page.waitForSelector(".detail-page");
  assert(await page.locator(".ingredient-row").count() > 0, "菜谱详情没有配料");
  const detailUrl = page.url();
  const recipeId = detailUrl.split("/recipe/")[1];
  await page.locator('[data-action="add-shopping"]').click();
  await page.locator('[data-action="open-cook-modes"]').click();
  await page.waitForSelector(".mode-list");
  assert(await page.locator(".mode-card").count() === 3, "烹饪方式不是 3 种");
  await page.locator('[data-action="start-cook"]').click();
  await page.waitForSelector(".cooking-page");
  assert((await page.locator(".cook-top").innerText()).includes("图文教程"), "未进入图文教程");
  await page.screenshot({ path: "outputs/qa-html-cook-mobile.png", fullPage: true });
  await page.locator('[data-action="cook-next"]').click();
  assert((await page.locator(".progress-label").innerText()).includes("2 /"), "烹饪进度没有前进");

  await page.goto(`${baseUrl}#/shopping`, { waitUntil: "load" });
  await page.waitForSelector(".shopping-page");
  assert(await page.locator(".shopping-item").count() > 0, "采购清单没有生成");

  await page.goto(`${baseUrl}#/recipes`, { waitUntil: "load" });
  await page.waitForSelector("#recipe-grid");
  assert(await page.locator(".recipe-card").count() === 90, "菜谱库不是 90 道菜");
  await page.fill("#recipe-search", "番茄炒蛋");
  assert(await page.locator(".recipe-card").count() === 1, "菜谱搜索结果不正确");

  await page.goto(`${baseUrl}#/me`, { waitUntil: "load" });
  await page.waitForSelector(".profile-page");
  await page.locator('[data-action="feature-preview"][data-feature="cloud.sync"]').click();
  await page.waitForSelector("#action-sheet[open]");
  assert((await page.locator("#sheet-content").innerText()).includes("当前没有连接云数据库"), "云同步预览说明缺失");
  await page.locator('[data-action="close-sheet"]').last().click();
  await page.screenshot({ path: "outputs/qa-html-me-mobile.png", fullPage: true });

  await page.goto(`${baseUrl}#/recipe/${recipeId}`, { waitUntil: "load" });
  await page.waitForSelector(".detail-page");
  await page.screenshot({ path: "outputs/qa-html-detail-mobile.png", fullPage: true });

  assert(errors.length === 0, `发现浏览器错误：${errors.join(" | ")}`);
  console.log(JSON.stringify({
    ok: true,
    recipes: 90,
    pantryItems: 35,
    testedRoutes: ["home", "pantry", "recommendations", "recipe", "cook", "shopping", "recipes", "me"],
    browserErrors: errors
  }, null, 2));
} finally {
  await browser.close();
}
