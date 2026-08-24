(function attachYanhuoServices(global) {
  "use strict";

  const catalog = Array.isArray(global.YANHUO_INGREDIENTS) ? global.YANHUO_INGREDIENTS : [];
  const API_ROOT = "/api/ai";
  const SERVICE_UNAVAILABLE = "AI_SERVICE_UNAVAILABLE";
  let remoteStatusPromise = null;
  let remoteStatusExpiresAt = 0;

  function success(data, provider, extraMeta) {
    return {
      ok: true,
      data,
      error: null,
      meta: { provider, fallback: false, ...(extraMeta || {}) }
    };
  }

  function failure(code, message, extraMeta) {
    return {
      ok: false,
      data: null,
      error: { code, message },
      meta: { provider: "deepseek", fallback: false, ...(extraMeta || {}) }
    };
  }

  async function remoteAiStatus(forceRefresh) {
    if (!/^https?:$/.test(global.location?.protocol || "")) {
      return {
        configured: false,
        provider: "deepseek",
        capabilities: { text: true, vision: false },
        reason: "AI 功能需要通过本地服务器（例如 http://127.0.0.1:8787）或公网部署网址打开，不能通过 file:// 安全调用。"
      };
    }
    const now = Date.now();
    if (forceRefresh || !remoteStatusPromise || now >= remoteStatusExpiresAt) {
      remoteStatusExpiresAt = now + 10000;
      remoteStatusPromise = fetch(`${API_ROOT}/status`, { headers: { Accept: "application/json" } })
        .then(async (response) => {
          if (!response.ok) return { configured: false, provider: "deepseek", capabilities: { text: true, vision: false }, reason: `AI 状态接口返回 ${response.status}` };
          const result = await response.json().catch(() => null);
          return {
            configured: Boolean(result?.data?.configured),
            provider: result?.data?.provider || "deepseek",
            model: result?.data?.model || null,
            capabilities: result?.data?.capabilities || { text: true, vision: false },
            reason: result?.data?.configured ? "" : "智能服务暂时无法使用"
          };
        })
        .catch((error) => {
          remoteStatusExpiresAt = 0;
          return {
            configured: false,
            provider: "deepseek",
            capabilities: { text: true, vision: false },
            reason: String(error?.message || error)
          };
        });
    }
    return remoteStatusPromise;
  }

  async function apiRequest(operation, payload, capability = "text") {
    const status = await remoteAiStatus();
    const ready = capability === "vision" ? Boolean(status.capabilities?.vision) : status.configured;
    if (!ready) {
      const reason = capability === "vision"
        ? "照片识别暂时无法使用"
        : status.reason || "智能服务暂时无法使用";
      throw Object.assign(new Error(reason), { code: SERVICE_UNAVAILABLE, status });
    }
    const controller = new AbortController();
    const timer = global.setTimeout(() => controller.abort(), 50000);
    try {
      const response = await fetch(`${API_ROOT}/${operation}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload || {}),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        const error = new Error(result?.error?.message || `智能服务返回 ${response.status}`);
        error.code = result?.error?.code || "AI_REQUEST_FAILED";
        throw error;
      }
      return result;
    } catch (error) {
      if (error?.name === "AbortError") throw Object.assign(new Error("AI 服务响应超时，请稍后再试"), { code: "AI_TIMEOUT" });
      throw error;
    } finally {
      global.clearTimeout(timer);
    }
  }

  function catalogPayload() {
    return catalog.map(({ id, name }) => ({ id, name }));
  }

  async function runAi(operation, payload, capability) {
    try {
      return await apiRequest(operation, payload, capability);
    } catch (error) {
      return failure(error?.code || SERVICE_UNAVAILABLE, error?.message || "AI 服务暂时不可用");
    }
  }

  async function recognizeIngredientPhoto(payload) {
    const status = await remoteAiStatus();
    if (!status.capabilities?.vision) {
      return failure("AI_CAPABILITY_UNAVAILABLE", "照片识别暂时无法使用；照片没有上传。", {
        capability: "vision",
        privacy: "not-uploaded"
      });
    }
    return runAi("recognize-ingredient-photo", { ...payload, ingredientCatalog: catalogPayload() }, "vision");
  }

  const services = {
    SERVICE_UNAVAILABLE,
    status: remoteAiStatus,
    refreshStatus() {
      return remoteAiStatus(true);
    },
    ai: {
      parseIngredients(payload) {
        return runAi("parse-ingredients", { ...payload, ingredientCatalog: catalogPayload() });
      },
      recognizeIngredientPhoto,
      explainRecommendation(payload) {
        return runAi("explain-recommendation", payload);
      },
      suggestSubstitutions(payload) {
        return runAi("suggest-substitutions", { ...payload, ingredientCatalog: catalogPayload() });
      }
    },
    game: {
      start(payload) {
        return Promise.resolve(success({ sessionId: `game-${Date.now()}`, recipeId: payload?.recipeId }, "browser"));
      }
    }
  };

  global.YanhuoServices = services;
  global.YanhuoFutureServices = services;
})(window);
