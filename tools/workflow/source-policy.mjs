export function isAuthorizedHeroOnly({ recipeId, sourceUrl, authorization }) {
  return recipeId === "west-031"
    && sourceUrl === "https://www.seriouseats.com/basic-ragu-bolognese-recipe"
    && authorization === "user_explicit_2026-10-07_west-031";
}

export function isAuthorizedIncomplete({ recipeId, source }) {
  const approval = source?.userAuthorizedIncomplete;
  return recipeId === "cn-011"
    && source?.complete === false
    && source.url === "https://www.douguo.com/cookbook/2331633.html"
    && approval?.authorization === "user_explicit_2026-10-07_cn-011"
    && approval.recipeId === recipeId && approval.sourceUrl === source.url
    && Array.isArray(approval.omissions) && approval.omissions.length > 0
    && approval.omissions.every((text) => typeof text === "string" && text.trim());
}
