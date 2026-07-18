(function attachFutureServices(global) {
  "use strict";

  const FEATURE_NOT_AVAILABLE = "FEATURE_NOT_AVAILABLE";

  function previewResult(featureId, message) {
    const feature = (global.YANHUO_FEATURES || {})[featureId] || { phase: 2 };
    return Promise.resolve({
      ok: false,
      data: null,
      error: { code: FEATURE_NOT_AVAILABLE, message },
      meta: {
        featureId,
        phase: feature.phase,
        provider: "none",
        fallback: true
      }
    });
  }

  global.YanhuoFutureServices = {
    FEATURE_NOT_AVAILABLE,
    ai: {
      parseIngredients: function () {
        return previewResult("ai.ingredientNlp", "自然语言食材录入将在第二阶段接入");
      },
      recognizeIngredientPhoto: function () {
        return previewResult("ai.ingredientVision", "食材照片识别将在第二阶段接入；当前不会上传照片");
      },
      explainRecommendation: function () {
        return previewResult("ai.recommendationExplanation", "AI 深度解释将在第二阶段接入");
      },
      suggestSubstitutions: function () {
        return previewResult("ai.substitutionSuggestion", "AI 替换建议将在第二阶段接入");
      }
    },
    game: {
      start: function () {
        return previewResult("cooking.beginnerGame", "烹饪小游戏将在第三阶段实现");
      }
    },
    account: {
      login: function () {
        return previewResult("account.login", "登录与云同步将在小程序阶段接入");
      },
      sync: function () {
        return previewResult("cloud.sync", "当前数据仅保存在本机");
      }
    },
    share: {
      createRecipeCard: function () {
        return previewResult("platform.wechatShare", "微信分享卡片将在小程序阶段接入");
      }
    }
  };
})(window);

