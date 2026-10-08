export function cleanIngredientName(raw) {
  return String(raw)
    .replace(/[（(].*$/u, "")
    .replace(/约\s*\d.*$/u, "")
    .replace(/\d.*$/u, "")
    .replace(/大半(?:个|颗|根|块|碗|杯).*$/u, "")
    .replace(/(?:半|[一二两三四五六七八九十百]+)(?:汤匙|茶匙|大勺|小勺|中勺|勺|杯|碗|个|颗|粒|只|枚|瓣|头|根|块|张|罐|袋|束|片|段|把|撮|滴|千克|克|毫升|升).*$/u, "")
    .replace(/各适量|适量|少许|少量|若干/gu, "")
    .replace(/[；，,。]+$/u, "")
    .replace(/(?:总量|用量|数量)\s*$/u, "")
    .replace(/(?:约锅高|每次|每人|每份)\s*$/u, "")
    .trim();
}
