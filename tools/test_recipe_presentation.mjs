import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const baseUrl = process.env.DEMO_URL || pathToFileURL(resolve("index.html")).href;
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
const results = [];
try {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}#/recipes`);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  const recipes = await page.evaluate(() => window.YANHUO_RECIPES.map(({ id, name, steps }) => ({ id, name, lastInstruction: steps.at(-1).instruction })));
  const layoutOnly = process.argv.includes("--layout-only");
  for (const viewport of [{ width: 875, height: 811 }, { width: 390, height: 844 }, { width: 320, height: 640 }, { width: 1200, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const recipe of recipes) {
      await page.evaluate((id) => { location.hash = `#/recipe/${id}`; }, recipe.id);
      await page.waitForFunction((name) => document.querySelector(".detail-title-block h1")?.textContent === name, recipe.name);
      if (!layoutOnly) {
        assert.equal(await page.locator(".image-attribution, .hero-attribution, .detail-page a[href^='http']").count(), 0, `${recipe.id}: 仍有来源说明或外部来源链接`);
      }
      const lastText = page.locator(".step-preview:last-child p");
      assert.equal(await lastText.textContent(), recipe.lastInstruction, `${recipe.id}: 最后一步正文不完整`);
      await lastText.evaluate((p) => p.scrollIntoView({ block: "center", behavior: "instant" }));
      const geometry = await lastText.evaluate((p) => {
        const range = document.createRange();
        range.selectNodeContents(p);
        const line = [...range.getClientRects()].at(-1);
        const action = document.querySelector(".detail-content > .sticky-action").getBoundingClientRect();
        const nav = document.querySelector("#bottom-nav").getBoundingClientRect();
        const x = Math.min(innerWidth - 2, Math.max(2, line.left + Math.min(10, line.width / 2)));
        const y = line.top + line.height / 2;
        const hit = document.elementFromPoint(x, y);
        const overlap = (rect) => line.bottom > rect.top && line.top < rect.bottom && line.right > rect.left && line.left < rect.right;
        return { lineBottom: line.bottom, lineTop: line.top, viewportHeight: innerHeight,
          actionOverlap: overlap(action), navOverlap: overlap(nav), textReceivesHit: hit === p || p.contains(hit),
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth };
      });
      assert(geometry.lineBottom <= viewport.height + 1 && geometry.lineTop >= 0 && !geometry.actionOverlap && !geometry.navOverlap && geometry.textReceivesHit && !geometry.horizontalOverflow,
        `${recipe.id} ${viewport.width}x${viewport.height}: 最后一步末行被遮挡 ${JSON.stringify(geometry)}`);
      if (!layoutOnly && recipe.id === "west-012" && viewport.width === 875) await page.screenshot({ path: "outputs/qa-recipe-last-step-875.png" });
      if (!layoutOnly) {
        await page.evaluate((id) => { location.hash = `#/cook/${id}`; }, recipe.id);
        await page.waitForSelector(".cooking-page");
        assert.equal(await page.locator(".image-attribution, .cooking-page a[href^='http']").count(), 0, `${recipe.id}: 图文教程仍有外部来源链接`);
      }
    }
    results.push({ viewport, recipesChecked: recipes.length });
    console.log(JSON.stringify({ viewport, recipesChecked: recipes.length, ok: true }));
  }
  console.log(JSON.stringify({ ok: true, results, sourceMetadataChanged: false }, null, 2));
} finally {
  await browser.close();
}
