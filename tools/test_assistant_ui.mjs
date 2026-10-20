import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = process.env.DEMO_URL || "http://127.0.0.1:8791";
let server;
let browser;
const requests = [];
const errors = [];
let mode = "success";
let finishPending;
let checks = 0;
try {
  if (!process.env.DEMO_URL) {
    server = spawn(process.execPath, ["server.mjs"], { env: { ...process.env, PORT: "8791" }, stdio: "ignore", windowsHide: true });
    for (let i = 0; i < 50; i++) {
      try { if ((await fetch(`${base}/healthz`)).ok) break; } catch {}
      await new Promise((done) => setTimeout(done, 100));
    }
  }
  await mkdir("outputs", { recursive: true });
  browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/api/ai/chat", async (route) => {
    requests.push(route.request().postDataJSON());
    if (mode === "pending") await new Promise((done) => { finishPending = done; });
    const data = mode === "no-match" ? { found: false, answer: "知识库里没有找到相关资料。", sources: [] } : {
      found: true, answer: "番茄炒蛋\n原料：番茄 2 个、鸡蛋 3 个、盐适量。\n<script>alert('test')</script>",
      sources: [{ id: "test-doc", recipeName: "番茄炒蛋", title: "HowToCook", url: "https://github.com/Anduin2017/HowToCook" }]
    };
    await route.fulfill({ status: mode === "failure" ? 503 : 200, contentType: "application/json",
      body: JSON.stringify(mode === "failure" ? { ok: false, error: { code: "RAG_UNAVAILABLE" } } : { ok: true, data }) });
  });
  await page.goto(base, { waitUntil: "networkidle" });
  const launcher = page.locator("#assistant-launcher");
  for (const route of ["home", "pantry", "recipes", "me", "recipe/cn-001", "cook/cn-001"]) {
    await page.goto(`${base}/#/${route}`);
    assert(await launcher.isVisible(), `入口在 ${route} 不可见`);
    assert.equal(await launcher.evaluate((el) => getComputedStyle(el).position), "fixed");
    const before = await launcher.boundingBox();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const after = await launcher.boundingBox();
    assert(Math.abs(before.y - after.y) < 1, "入口跟随页面滚动");
    checks++;
  }
  await page.goto(`${base}/#/home`);
  await launcher.click();
  assert(await page.locator("#assistant-input").evaluate((el) => el === document.activeElement));
  assert.equal(await launcher.getAttribute("aria-expanded"), "true");
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    const bounds = await page.locator("#assistant-panel").boundingBox();
    assert(bounds.x >= 0 && bounds.y >= 0 && bounds.x + bounds.width <= viewport.width + 1 && bounds.y + bounds.height <= viewport.height + 1, `对话框越界：${JSON.stringify(viewport)}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "页面横向溢出");
    await page.screenshot({ path: `outputs/assistant-welcome-${viewport.width}.png` });
    checks++;
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".assistant-prompts button").first().click();
  await page.locator(".assistant-source").waitFor();
  assert.equal(requests[0].history.length, 0);
  assert.equal(await page.locator(".assistant-source a").count(), 2);
  assert.equal(await page.locator("#assistant-messages script").count(), 0, "回答被当作 HTML 执行");
  assert((await page.locator(".assistant-message-assistant").innerText()).includes("<script>"));
  await page.locator("#assistant-input").fill("这道菜需要多少鸡蛋？");
  await page.locator("#assistant-input").press("Shift+Enter");
  assert.equal(requests.length, 1, "Shift+Enter 不应发送");
  await page.locator("#assistant-input").press("Enter");
  await page.waitForFunction(() => document.querySelectorAll(".assistant-source").length === 2);
  assert.equal(requests[1].history.length, 2);
  assert(requests[1].history[0].content.includes("鸡蛋和番茄"));
  checks++;
  await page.locator("#assistant-input").fill("中文输入");
  await page.locator("#assistant-input").dispatchEvent("compositionstart");
  await page.locator("#assistant-input").press("Enter");
  assert.equal(requests.length, 2, "输入法确认不应发送");
  await page.locator("#assistant-input").dispatchEvent("compositionend");
  await page.locator("#assistant-input").fill("");
  await page.locator("#assistant-input").press("Escape");
  assert.equal(await page.locator("#assistant-panel").isVisible(), false);
  assert(await launcher.evaluate((el) => el === document.activeElement));
  await launcher.click();
  assert.equal(await page.locator(".assistant-source").count(), 2, "收起后对话丢失");
  await page.screenshot({ path: "outputs/assistant-answer-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "outputs/assistant-answer-desktop.png" });
  checks++;
  mode = "failure";
  await page.locator("#assistant-input").fill("再找一道菜");
  await page.locator("#assistant-send").click();
  await page.locator(".assistant-retry").waitFor();
  assert((await page.locator("#assistant-messages").innerText()).includes("暂时无法查询菜谱知识库"));
  mode = "no-match";
  await page.locator(".assistant-retry").click();
  await page.getByText("知识库里没有找到相关资料。", { exact: true }).waitFor();
  assert.equal(await page.locator(".assistant-message-user").count(), 3, "重试重复添加用户问题");
  checks++;
  mode = "pending";
  await page.locator("#assistant-input").fill("等一下");
  await page.locator("#assistant-send").click();
  await page.locator(".assistant-message-loading").waitFor();
  assert(await page.locator("#assistant-send").isDisabled());
  await page.locator("#assistant-close").click();
  await launcher.click();
  assert(await page.locator(".assistant-message-loading").isVisible());
  mode = "success";
  finishPending();
  await page.locator(".assistant-message-loading").waitFor({ state: "detached" });
  checks++;
  await page.locator(".assistant-source-links a[href='#/recipe/cn-001']").first().click();
  await page.waitForURL("**/#/recipe/cn-001");
  assert.equal(await page.locator("#assistant-panel").isVisible(), false);
  assert(await launcher.isVisible());
  checks++;
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ ok: true, checks, requests: requests.length, pageErrors: errors, upstream: "mock assistant responses; actual page and local HTTP server" }, null, 2));
} finally {
  finishPending?.();
  await browser?.close();
  if (server && server.exitCode === null) {
    server.kill();
    await Promise.race([once(server, "exit"), new Promise((done) => setTimeout(done, 3000))]);
  }
}
