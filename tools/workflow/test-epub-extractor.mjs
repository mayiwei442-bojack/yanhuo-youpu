import assert from "node:assert/strict";
import { extractEpubRecipeSection, parseEpubNavigation } from "../../src/rag/epub-extractor.mjs";
import { chunkRecipe, CHUNK_TYPES } from "../../src/rag/chunker.mjs";

const ncx = `<navMap><navPoint><navLabel><text>测试炒菜</text></navLabel><content src="text00001.html#subid1" /></navPoint></navMap>`;
assert.deepEqual(parseEpubNavigation(ncx), [{ name: "测试炒菜", entry: "text00001.html", anchor: "subid1", location: "text00001.html#subid1" }]);

const html = `<body><a id="subid1"></a><p>测试炒菜</p><p>准备：5分钟 烹饪：10分钟</p><p>家常快炒。</p><p>用料：</p><p>猪肉 100g 青椒 2个 盐 适量</p><p>做法：</p><p>1.猪肉切丝。</p><p>2.大火炒熟猪肉和青椒。</p><p>家传小诀窍：</p><p>全程保持大火。</p><a id="subid2"></a></body>`;
const result = extractEpubRecipeSection(html, {
  recipeName: "测试炒菜",
  anchor: "subid1",
  entry: "text00001.html",
  bookTitle: "测试书",
  author: "测试作者",
  retrievedAt: "2026-08-30T00:00:00.000Z"
});
assert.equal(result.normalizedRecipe.ingredients.length, 3);
assert.equal(result.normalizedRecipe.steps.length, 2);
assert.equal(result.normalizedRecipe.source.pageStart, null);
assert.equal(result.normalizedRecipe.source.location, "text00001.html#subid1");
assert.deepEqual([...new Set(chunkRecipe(result.normalizedRecipe).map((chunk) => chunk.chunk_type))], CHUNK_TYPES);

console.log(JSON.stringify({
  ok: true,
  phase: 8,
  recipe: result.normalizedRecipe.recipeName,
  ingredients: result.normalizedRecipe.ingredients.length,
  steps: result.normalizedRecipe.steps.length,
  fixedPageNumbersAvailable: result.normalizedRecipe.metadata.fixedPageNumbersAvailable,
  chunkTypes: CHUNK_TYPES
}, null, 2));
