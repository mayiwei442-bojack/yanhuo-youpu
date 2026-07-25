import { chromium } from "file:///C:/Users/myw/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.61.1/node_modules/playwright/index.mjs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const baseUrl = process.env.DEMO_URL || pathToFileURL(resolve(process.env.DEMO_ENTRY || "index.html")).href;
const expectDeepSeek = process.env.EXPECT_DEEPSEEK === "1";
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

  await page.locator('[data-action="open-ai-text"]').click();
  await page.fill("#ai-ingredient-text", "两个番茄、三个鸡蛋和半颗洋葱");
  await page.locator('[data-action="parse-ai-text"]').click();
  if (expectDeepSeek) {
    await page.waitForSelector(".ai-candidate-list, .preview-note");
    assert(await page.locator(".ai-candidate-list").count() === 1, `DeepSeek 文字录入失败：${await page.locator("#sheet-content").innerText()}`);
    assert(await page.locator(".ai-candidate").count() === 3, "DeepSeek 没有返回 3 样候选食材");
    assert((await page.locator(".provider-badge").innerText()).includes("DeepSeek"), "没有显示 DeepSeek 提供方");
    await page.screenshot({ path: "outputs/qa-html-ai-text-mobile.png", fullPage: true });
    await page.locator('[data-action="apply-ai-candidates"]').click();
    assert((await page.locator(".pantry-board strong").innerText()).includes("4 样食材"), "确认后的 DeepSeek 候选没有加入食材篮");
    await page.locator('.selected-pixel[title="洋葱"] .selected-remove').click();
    assert((await page.locator(".pantry-board strong").innerText()).includes("3 样食材"), "DeepSeek 录入测试没有恢复初始食材篮");
  } else {
    await page.waitForSelector(".preview-note");
    const aiError = await page.locator("#sheet-content").innerText();
    assert(aiError.includes("本地服务器") || aiError.includes("DeepSeek API"), "file:// 模式没有明确说明 AI 服务要求");
    assert(!aiError.includes("本机解析"), "AI 失败时仍然回退到了本机规则");
    assert((await page.locator(".pantry-board strong").innerText()).includes("3 样食材"), "AI 失败时不应修改食材篮");
    await page.screenshot({ path: "outputs/qa-html-ai-unavailable-mobile.png", fullPage: true });
    await page.locator('[data-action="close-sheet"]').last().click();
  }

  await page.locator('[data-feature="ai.ingredientVision"]').click();
  assert((await page.locator("#sheet-content").innerText()).includes("需要另接支持图像输入的模型"), "照片识别没有明确标记视觉模型边界");
  await page.screenshot({ path: "outputs/qa-html-ai-photo-mobile.png", fullPage: true });
  await page.locator('[data-action="close-sheet"]').last().click();

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
  await page.locator('.recommendation-card [data-action="ai-explain"]').first().click();
  await page.waitForSelector("#action-sheet[open]");
  if (expectDeepSeek) {
    await page.waitForSelector(".provider-badge, .preview-note");
    assert(await page.locator(".provider-badge").count() === 1, `DeepSeek 推荐解释失败：${await page.locator("#sheet-content").innerText()}`);
    assert((await page.locator("#sheet-content").innerText()).includes("为什么推荐"), "DeepSeek 推荐解释没有生成");
    assert((await page.locator("#sheet-content").innerText()).includes("DeepSeek"), "推荐解释没有显示 DeepSeek 提供方");
  } else {
    await page.waitForSelector(".preview-note");
    const explanationError = await page.locator("#sheet-content").innerText();
    assert(explanationError.includes("DeepSeek"), "未配置时推荐解释没有显示真实服务错误");
    assert(!explanationError.includes("本机解析"), "推荐解释不应回退本机规则");
  }
  await page.locator('[data-action="close-sheet"]').last().click();
  await page.screenshot({ path: "outputs/qa-html-recommendations-mobile.png", fullPage: true });

  await page.locator('.recommendation-card [data-action="open-recipe"]').first().click();
  await page.waitForSelector(".detail-page");
  assert(await page.locator(".ingredient-row").count() > 0, "菜谱详情没有配料");
  await page.locator('[data-action="open-substitutions"]').click();
  assert((await page.locator("#sheet-content").innerText()).includes("没有可校验的替换目标"), "基础调味品仍被当作 AI 替换目标");
  await page.locator('[data-action="close-sheet"]').last().click();

  const recipeId = "cn-003";
  await page.goto(`${baseUrl}#/recipe/${recipeId}`, { waitUntil: "load" });
  await page.waitForSelector(".detail-page");
  if (expectDeepSeek) {
    await page.locator('[data-action="open-substitutions"]').click();
    await page.locator('.substitution-picker [data-action="ai-substitute"]').first().click();
    await page.waitForSelector(".provider-badge, .preview-note");
    assert(await page.locator(".provider-badge").count() === 1, `DeepSeek 食材替换失败：${await page.locator("#sheet-content").innerText()}`);
    assert((await page.locator("#sheet-content").innerText()).includes("DeepSeek"), "食材替换没有显示 DeepSeek 提供方");
    assert(await page.locator(".substitution-result").count() > 0, `DeepSeek 替换建议没有通过服务端校验（菜谱 ${recipeId}）：${await page.locator("#sheet-content").innerText()}`);
    await page.screenshot({ path: "outputs/qa-html-ai-substitution-mobile.png", fullPage: true });
    await page.locator('[data-action="close-sheet"]').last().click();
  }
  await page.locator('[data-action="add-shopping"]').click();
  await page.locator('[data-action="open-cook-modes"]').click();
  await page.waitForSelector(".mode-list");
  assert(await page.locator(".mode-card").count() === 3, "烹饪方式不是 3 种");
  await page.locator('[data-action="start-game"]').click();
  await page.waitForSelector(".game-page");
  assert((await page.locator(".cook-top").innerText()).includes("新手小游戏"), "未进入烹饪新手小游戏");
  await page.screenshot({ path: "outputs/qa-html-game-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1200, height: 900 });
  const stageBox = await page.locator(".game-stage").boundingBox();
  const controlsBox = await page.locator(".game-controls").boundingBox();
  assert(stageBox && controlsBox && controlsBox.x > stageBox.x, "桌面端小游戏没有形成舞台与操作区双栏布局");
  await page.screenshot({ path: "outputs/qa-html-game-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });

  for (let guard = 0; guard < 30 && await page.locator(".game-complete-card").count() === 0; guard += 1) {
    const suggested = page.locator(".game-action-grid button.suggested");
    await suggested.waitFor();
    if (await suggested.getAttribute("data-game-action") === "add") {
      const ingredientIds = await page.locator(".game-ingredient-tray button").evaluateAll((buttons) => buttons.map((button) => button.dataset.ingredient));
      for (const ingredientId of ingredientIds) {
        const ingredientButton = page.locator(`.game-ingredient-tray button[data-ingredient="${ingredientId}"]`);
        const classes = await ingredientButton.getAttribute("class");
        if (!classes?.includes("ready")) await ingredientButton.click();
      }
    }
    await page.locator(".game-action-grid button.suggested").click();
  }
  await page.waitForSelector(".game-complete-card");
  assert(Number(await page.locator(".game-score strong").innerText()) >= 80, "小游戏鼓励评分低于设计下限");
  assert((await page.locator(".game-complete-card").innerText()).includes("不设失败、排名或惩罚"), "小游戏无奖惩说明缺失");
  await page.locator('.game-complete-card [data-action="start-cook"]').click();
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
  assert(await page.locator('[data-action="export-local-data"]').count() === 1, "本机数据导出入口缺失");
  assert(await page.locator('[data-action="open-import-data"]').count() === 1, "本机数据恢复入口缺失");
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
    testedRoutes: ["home", "pantry", "recommendations", "recipe", "game", "cook", "shopping", "recipes", "me"],
    browserErrors: errors
  }, null, 2));
} finally {
  await browser.close();
}
