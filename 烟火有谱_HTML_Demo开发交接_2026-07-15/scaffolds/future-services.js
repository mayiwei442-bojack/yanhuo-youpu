/**
 * 烟火有谱：阶段二、三能力接口桩。
 * 当前文件不执行网络请求，不包含任何 API 地址或密钥。
 * Trae 可将其复制到实际 src/js/services/ 目录后再按工程结构调整。
 */

export const FEATURE_NOT_AVAILABLE = "FEATURE_NOT_AVAILABLE";

function previewResult(featureId, phase, message) {
  return Promise.resolve({
    ok: false,
    data: null,
    error: {
      code: FEATURE_NOT_AVAILABLE,
      message
    },
    meta: {
      featureId,
      phase,
      provider: "none",
      fallback: true
    }
  });
}

export const aiServices = {
  parseIngredients(_input) {
    return previewResult(
      "ai.ingredientNlp",
      2,
      "AI 自然语言食材录入将在第二阶段接入"
    );
  },

  recognizeIngredientPhoto(_input) {
    return previewResult(
      "ai.ingredientVision",
      2,
      "AI 食材照片识别将在第二阶段接入；当前不会上传照片"
    );
  },

  explainRecommendation(_input) {
    return previewResult(
      "ai.recommendationExplanation",
      2,
      "AI 推荐解释将在第二阶段接入；当前使用本地规则解释"
    );
  },

  suggestSubstitutions(_input) {
    return previewResult(
      "ai.substitutionSuggestion",
      2,
      "AI 食材替换建议将在第二阶段接入"
    );
  }
};

export const gameServices = {
  getPreview({ recipeId }) {
    return Promise.resolve({
      ok: true,
      data: {
        recipeId,
        mode: "preview",
        controls: ["添加食材", "等待", "翻炒", "低火", "中火", "高火"],
        fallbackRoute: `#/cook/${recipeId}`
      },
      error: null,
      meta: {
        featureId: "cooking.beginnerGame",
        phase: 3,
        provider: "local",
        fallback: true
      }
    });
  },

  start(_input) {
    return previewResult(
      "cooking.beginnerGame",
      3,
      "烹饪小游戏将在第三阶段实现；当前请使用图文教程"
    );
  },

  submitAction(_input) {
    return previewResult(
      "cooking.beginnerGame",
      3,
      "小游戏操作与鼓励评分尚未启用"
    );
  }
};

export const accountServices = {
  login() {
    return previewResult(
      "account.login",
      3,
      "登录与跨设备同步将在小程序阶段接入"
    );
  },

  sync(_input) {
    return previewResult(
      "cloud.sync",
      3,
      "云同步尚未启用；当前数据仅保存在本机"
    );
  }
};

export const shareServices = {
  createRecipeCard(_input) {
    return previewResult(
      "platform.wechatShare",
      3,
      "微信分享卡片将在小程序阶段接入"
    );
  },

  createShoppingListText({ shoppingList = [] } = {}) {
    const text = shoppingList
      .map((item) => `□ ${item.name}${item.quantity ? ` ${item.quantity}${item.unit || ""}` : ""}`)
      .join("\n");

    return Promise.resolve({
      ok: true,
      data: { text },
      error: null,
      meta: {
        featureId: "platform.wechatShare",
        phase: 1,
        provider: "local",
        fallback: true
      }
    });
  }
};

