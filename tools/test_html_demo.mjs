import { chromium } from "playwright-core";
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

function assertNoInternalAiCopy(text, context) {
  const forbidden = ["PHASE", "DeepSeek", "通义千问", "API Key", "账户余额", "服务端密钥", "服务端配置"];
  assert(!forbidden.some((term) => String(text).includes(term)), `${context}仍显示内部 AI 信息：${text}`);
}

try {
  await page.goto(`${baseUrl}#/home`, { waitUntil: "load" });
  await page.waitForSelector(".hero-title");
  assert(await page.locator("#bottom-nav button").count() === 4, "底部导航不是 4 项");
  assert((await page.locator(".hero-title").innerText()).includes("今天吃什么"), "首页主标题缺失");
  assert(await page.locator(".status-ribbon, .stage-button").count() === 0, "首页仍显示开发阶段提示");
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
  assert((await page.locator(".pantry-board strong").innerText()).includes("0 样食材"), "新用户食材篮不是空的");
  assert(!((await page.locator(".feature-shortcuts").innerText()).includes("阶段") || (await page.locator(".feature-shortcuts").innerText()).includes("DeepSeek") || (await page.locator(".feature-shortcuts").innerText()).includes("通义千问")), "食材入口仍显示阶段或模型名称");

  await page.locator('[data-action="open-ai-text"]').click();
  await page.fill("#ai-ingredient-text", "两个番茄、三个鸡蛋和半颗洋葱");
  await page.locator('[data-action="parse-ai-text"]').click();
  if (expectDeepSeek) {
    await page.waitForSelector(".ai-candidate-list, .preview-note");
    assert(await page.locator(".ai-candidate-list").count() === 1, `DeepSeek 文字录入失败：${await page.locator("#sheet-content").innerText()}`);
    assert(await page.locator(".ai-candidate").count() === 3, "DeepSeek 没有返回 3 样候选食材");
    assert((await page.locator(".provider-badge").innerText()) === "智能服务", "AI 徽标没有改成通用名称");
    assertNoInternalAiCopy(await page.locator("#sheet-content").innerText(), "文字识别弹层");
    await page.screenshot({ path: "outputs/qa-html-ai-text-mobile.png", fullPage: true });
    await page.locator('[data-action="apply-ai-candidates"]').click();
    assert((await page.locator(".pantry-board strong").innerText()).includes("3 样食材"), "确认后的 DeepSeek 候选没有加入食材篮");
    await page.locator('.selected-pixel[title="洋葱"] .selected-remove').click();
    assert((await page.locator(".pantry-board strong").innerText()).includes("2 样食材"), "DeepSeek 候选移除失败");
  } else {
    await page.waitForSelector(".preview-note");
    const aiError = await page.locator("#sheet-content").innerText();
    assert(aiError.includes("智能服务现在无法完成这次请求"), "AI 错误没有使用用户友好文案");
    assertNoInternalAiCopy(aiError, "AI 错误弹层");
    assert((await page.locator(".pantry-board strong").innerText()).includes("0 样食材"), "AI 失败时不应修改食材篮");
    await page.screenshot({ path: "outputs/qa-html-ai-unavailable-mobile.png", fullPage: true });
    await page.locator('[data-action="close-sheet"]').last().click();
  }

  await page.locator('[data-action="open-ai-photo"]').click();
  await page.waitForSelector("#ai-photo-library-file");
  const photoSheet = await page.locator("#sheet-content").innerText();
  assert(photoSheet.includes("拍照识别桌面食材"), "照片识别入口没有打开拍照弹层");
  assert(photoSheet.includes("选择照片") && photoSheet.includes("拍摄照片"), "照片弹层没有分开选择与拍摄入口");
  assertNoInternalAiCopy(photoSheet, "照片识别弹层");
  assert(await page.locator(".photo-source-button").count() === 2, "照片入口不是两个独立圆角按钮");
  assert(await page.locator("#ai-photo-library-file").getAttribute("capture") === null, "选择照片入口不应强制打开相机");
  assert(await page.locator("#ai-photo-camera-file").getAttribute("capture") === "environment", "拍摄照片入口没有请求后置相机");
  assert(photoSheet.includes("本机压缩"), "照片弹层没有说明本机压缩与用途边界");
  assert(await page.locator('[data-action="recognize-ai-photo"]').getAttribute("disabled") !== null, "未选择照片时不应允许开始识别");
  await page.screenshot({ path: "outputs/qa-html-ai-photo-mobile.png", fullPage: true });
  await page.setInputFiles("#ai-photo-library-file", resolve("assets/pixel-food/selected/Tomato.png"));
  await page.waitForFunction(() => {
    const button = document.querySelector('[data-action="recognize-ai-photo"]');
    return Boolean(button) && !button.hasAttribute("disabled");
  }, { timeout: 10000 });
  assert((await page.locator(".photo-preview img").getAttribute("src") || "").startsWith("data:image/"), "照片没有压缩为 data URL 预览（CSP 回归）");
  await page.locator('[data-action="close-sheet"]').last().click();

  await page.fill("#custom-ingredient", "香菜");
  await page.locator("#custom-ingredient-form button[type=submit]").click();
  const pantryAfterCustomAdd = expectDeepSeek ? "3 样食材" : "1 样食材";
  const pantryAfterCustomRemove = expectDeepSeek ? "2 样食材" : "0 样食材";
  assert((await page.locator(".pantry-board strong").innerText()).includes(pantryAfterCustomAdd), "自定义食材未加入");
  await page.locator(".selected-pixel .custom-pixel").click();
  assert((await page.locator(".pantry-board strong").innerText()).includes(pantryAfterCustomAdd), "点击已选食材图像不应直接删除");
  await page.locator(".selected-remove").last().click();
  assert((await page.locator(".pantry-board strong").innerText()).includes(pantryAfterCustomRemove), "右上角删除按钮没有移除食材");
  await page.locator('[data-action="clear-pantry"]').click();
  for (const id of ["tomato", "eggs", "scallion"]) await page.locator(`.ingredient-tile[data-id="${id}"]`).click();
  assert((await page.locator(".pantry-board strong").innerText()).includes("3 样食材"), "基础食材没有正确加入");
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
    assertNoInternalAiCopy(await page.locator("#sheet-content").innerText(), "推荐解释弹层");
  } else {
    await page.waitForSelector(".preview-note");
    const explanationError = await page.locator("#sheet-content").innerText();
    assert(explanationError.includes("智能服务现在无法完成这次请求"), "推荐解释错误没有使用通用文案");
    assertNoInternalAiCopy(explanationError, "推荐解释错误弹层");
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
    assertNoInternalAiCopy(await page.locator("#sheet-content").innerText(), "食材替换弹层");
    assert(await page.locator(".substitution-result").count() > 0, `DeepSeek 替换建议没有通过服务端校验（菜谱 ${recipeId}）：${await page.locator("#sheet-content").innerText()}`);
    await page.screenshot({ path: "outputs/qa-html-ai-substitution-mobile.png", fullPage: true });
    await page.locator('[data-action="close-sheet"]').last().click();
  }
  await page.locator('[data-action="add-shopping"]').click();
  await page.locator('[data-action="open-cook-modes"]').click();
  await page.waitForSelector(".mode-list");
  assert(await page.locator(".mode-card").count() === 3, "烹饪方式不是 3 种");
  assert(!(await page.locator(".mode-list").innerText()).includes("可用"), "烹饪方式仍显示可用状态");
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
  await page.locator('.game-complete-card [data-nav="#/recipes"]').click();
  await page.waitForSelector(".recipes-page");
  assert(new URL(page.url()).hash === "#/recipes", "小游戏完成后没有回到菜谱列表");
  await page.goto(`${baseUrl}#/cook/${recipeId}`, { waitUntil: "load" });
  await page.waitForSelector(".cooking-page");
  assert((await page.locator(".cook-top").innerText()).includes("图文教程"), "未进入图文教程");
  await page.screenshot({ path: "outputs/qa-html-cook-mobile.png", fullPage: true });
  await page.locator('[data-action="cook-next"]').click();
  assert((await page.locator(".progress-label").innerText()).includes("2 /"), "烹饪进度没有前进");
  while (await page.locator('[data-action="cook-next"]').count()) await page.locator('[data-action="cook-next"]').click();
  await page.waitForSelector(".cook-done");
  await page.locator('.cook-done [data-nav="#/recipes"]').click();
  await page.waitForSelector(".recipes-page");
  assert(new URL(page.url()).hash === "#/recipes", "烹饪完成后没有回到菜谱列表");

  await page.goto(`${baseUrl}#/shopping`, { waitUntil: "load" });
  await page.waitForSelector(".shopping-page");
  assert(await page.locator(".shopping-item").count() > 0, "采购清单没有生成");
  const shoppingText = await page.locator(".shopping-page").innerText();
  assert(!shoppingText.includes("阶段") && !shoppingText.includes("可用"), "采购清单仍显示开发阶段或可用状态");

  await page.goto(`${baseUrl}#/recipes`, { waitUntil: "load" });
  await page.waitForSelector("#recipe-grid");
  assert(await page.locator(".recipe-card").count() === 90, "菜谱库不是 90 道菜");
  await page.fill("#recipe-search", "番茄炒蛋");
  assert(await page.locator(".recipe-card").count() === 1, "菜谱搜索结果不正确");

  await page.goto(`${baseUrl}#/me`, { waitUntil: "load" });
  await page.waitForSelector(".profile-page");
  assert(await page.locator('[data-action="export-local-data"]').count() === 1, "本机数据导出入口缺失");
  assert(await page.locator('[data-action="open-import-data"]').count() === 1, "本机数据恢复入口缺失");
  assert((await page.locator('[data-action="reset-local-data"]').innerText()) === "清除本机数据", "清除数据按钮仍带体验版措辞");
  assert(await page.locator('[data-feature="account.login"], [data-feature="cloud.sync"], [data-feature="platform.wechatMiniProgram"]').count() === 0, "我的页面仍显示阶段规划入口");
  await page.locator('[data-action="open-import-data"]').click();
  const importSheet = await page.locator("#sheet-content").innerText();
  assert(!importSheet.includes("PHASE") && !importSheet.includes("LOCAL BACKUP"), "数据恢复弹层仍显示开发阶段");
  await page.locator('[data-action="close-sheet"]').last().click();
  await page.screenshot({ path: "outputs/qa-html-me-mobile.png", fullPage: true });

  await page.goto(`${baseUrl}#/recipe/cn-011`, { waitUntil: "load" });
  await page.waitForSelector(".heritage-preview");
  const heritageText = await page.locator(".heritage-preview").innerText();
  assert(!["待资料核验", "后续将连接", "功能预览"].some((term) => heritageText.includes(term)), "地域风味仍显示开发期文案");

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
