import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { createRecipeCatalog } from './workflow/recipe-state.mjs';
const directory = 'workflow/howtocook/2026-10-08/';
const research = JSON.parse(await readFile(directory + 'research.json', 'utf8'));
const before = JSON.parse(await readFile(directory + 'before.json', 'utf8'));
const catalog = createRecipeCatalog();
const imported = catalog.filter(r => r.record.howtocook);
assert.equal(imported.length, research.recipes.length);
const allowed = new Set(imported.map(r => r.id));
for (const old of before.recipes) if (!allowed.has(old.id)) assert.deepEqual(catalog.find(r => r.id === old.id), old, `${old.id} outside scope`);
for (const recipe of imported) {
  const source = research.recipes.find(r => r.recipeId === recipe.id);
  assert.equal(recipe.record.howtocook.rawMarkdown, source.rawMarkdown);
  assert.equal(createHash('sha256').update(source.rawMarkdown).digest('hex'), recipe.record.howtocook.sha256);
  assert(recipe.record.source.includes(research.commit));
  assert(source.ingestion?.ok, `${recipe.id} missing verified ingestion`);
}
const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--allow-file-access-from-files']});
const results = [];
try {
  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(pathToFileURL(resolve('index.html')).href + '#/recipes');
  for (const recipe of imported) {
    await page.evaluate(id => {location.hash = `#/recipe/${id}`;}, recipe.id);
    await page.waitForFunction(name => document.querySelector('.detail-title-block h1')?.textContent === name, recipe.record.name);
    const original = page.locator('.howtocook-original');
    assert.equal(await original.count(), 1);
    const headings = await original.locator('h2,h3,h4,h5,h6').allTextContents();
    assert.deepEqual(headings, recipe.record.howtocook.sections.map(s => s.title));
    for (const img of await original.locator('img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(i => i.decode());
      assert(await img.evaluate(i => i.complete && i.naturalWidth > 0));
    }
    assert.equal(await original.locator('img').count(), recipe.record.howtocook.images.length);
    const generated = await page.evaluate(id => window.YANHUO_RECIPES.find(r => r.id === id), recipe.id);
    assert.equal(generated.time, recipe.record.timing?.totalMinutes ?? null);
    assert.equal(generated.defaultServings, recipe.record.servings ?? null);
    results.push({recipeId:recipe.id,originalSections:headings.length,images:recipe.record.howtocook.images.length,passed:true});
  }
  const safe = await page.evaluate(() => window.renderHowToCook({rawMarkdown:'# Test\n<script>window.__injected=true</script>\n![x](https://evil.invalid/x.png)\n[run](javascript:alert(1))'}));
  assert(!safe.includes('<script>'));
  assert(!safe.includes('src="https:'));
  assert(!safe.includes('href="javascript:'));
  await mkdir('outputs', {recursive:true});
  await page.evaluate(() => {location.hash = '#/recipe/cn-017';});
  await page.waitForFunction(() => document.querySelector('.detail-title-block h1')?.textContent === '水煮牛肉');
  await page.screenshot({path:'outputs/howtocook-cn-017-mobile.png', fullPage:true});
} finally {await browser.close();}
await writeFile(directory+'render-validation.json', JSON.stringify({ok:true,recipes:results,sourceHtmlEscaped:true,unrelatedRecipesUnchanged:true},null,2));
console.log(JSON.stringify({ok:true,imported:imported.length,images:results.reduce((n,r)=>n+r.images,0)}));
