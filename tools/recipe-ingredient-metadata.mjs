export function cleanIngredientName(raw) {
  return String(raw)
    .replace(/[（(].*$/u, "")
    .replace(/约\s*\d.*$/u, "")
    .replace(/\d.*$/u, "")
    .replace(/(?:半|[一二两三四五六七八九十百]+)(?:汤匙|茶匙|大勺|小勺|中勺|勺|杯|碗|个|瓣|头|根|块|张|罐|袋|束|片|段|把).*$/u, "")
    .replace(/各适量|适量|少许|若干/gu, "")
    .replace(/[；，,。]+$/u, "")
    .trim();
}
