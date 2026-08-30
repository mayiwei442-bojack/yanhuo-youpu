import assert from "node:assert/strict";
import { extractDouguoRecipe, extractJsonLdRecipe, detectAccessBlock } from "../../src/rag/website-extractor.mjs";

const jsonLdHtml = `
<html><head><script type="application/ld+json">{
  "@context":"https://schema.org",
  "@graph":[{
    "@type":"Recipe",
    "name":"Chinese Tomato Egg Stir-fry",
    "description":"A fast tomato and egg dish.",
    "recipeIngredient":["4 eggs","2 medium tomatoes","1 tsp salt"],
    "recipeInstructions":[{"@type":"HowToStep","text":"Cook eggs over high heat for 1 minute."},{"@type":"HowToStep","text":"Cook tomatoes for 2 minutes and combine."}],
    "prepTime":"PT5M","cookTime":"PT5M","totalTime":"PT10M"
  }]}
</script></head><body><p>If you can't find the optional wine, substitute dry sherry.</p></body></html>`;
const woks = extractJsonLdRecipe(jsonLdHtml, {
  canonicalName: "番茄炒蛋",
  category: "chinese",
  sourceName: "The Woks of Life",
  url: "https://example.com/tomato-eggs",
  retrievedAt: "2026-08-30T00:00:00.000Z"
});
assert.equal(woks.ingredients.length, 3);
assert.equal(woks.steps.length, 2);
assert.equal(woks.metadata.totalTime, "10分钟");
assert.equal(woks.tips.length, 1);

const douguoHtml = `
<html><head><meta name="description" content="家常番茄炒蛋"></head><body>
<h1>西红柿炒鸡蛋</h1>
<div class="metarial"><span class="scname">鸡蛋</span><span class='right scnum'>3个</span><span class="scname">西红柿</span><span class='right scnum'>2个</span></div>
<!-- 步骤 --><div class="step"><div class="stepinfo"><p>步骤1</p>大火炒鸡蛋1分钟。</div><div class="stepinfo"><p>步骤2</p>小火炒番茄2分钟后混合。</div></div>
<!-- 小贴士 --><div class="tips"><h2>烹饪技巧</h2><p>1、鸡蛋刚凝固即可。 2、番茄要成熟。<br>做菜好吃都有技巧，我的每道菜都有小妙招</p></div><p class="creattime">创建时间</p>
</body></html>`;
const douguo = extractDouguoRecipe(douguoHtml, {
  canonicalName: "番茄炒蛋",
  category: "chinese",
  sourceName: "豆果美食",
  url: "https://example.com/cookbook/1.html",
  retrievedAt: "2026-08-30T00:00:00.000Z"
});
assert.equal(douguo.aliases[0], "西红柿炒鸡蛋");
assert.equal(douguo.ingredients.length, 2);
assert.equal(douguo.steps.length, 2);
assert.equal(douguo.tips.length, 2);

const response = { status: 200, url: "https://www.xiachufang.com/auth/humancheck_captcha/" };
assert.match(detectAccessBlock(response, "<title>滑动验证</title>"), /人机验证/u);

console.log(JSON.stringify({
  ok: true,
  phase: 4,
  extractors: ["JSON-LD", "豆果HTML"],
  blockedAccessDetected: true,
  bypassAttempted: false
}, null, 2));
