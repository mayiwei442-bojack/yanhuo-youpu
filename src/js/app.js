(function initYanhuoApp(global) {
  "use strict";

  const recipes = Array.isArray(global.YANHUO_RECIPES) ? global.YANHUO_RECIPES : [];
  const ingredients = Array.isArray(global.YANHUO_INGREDIENTS) ? global.YANHUO_INGREDIENTS : [];
  const features = global.YANHUO_FEATURES || {};
  const services = global.YanhuoServices || global.YanhuoFutureServices || {};
  const STORAGE_KEY = "yanhuo-html-demo-v1";
  const imageRoot = "assets/pixel-food/selected/";

  const ALLERGENS = [
    { id: "peanut", label: "花生" },
    { id: "dairy", label: "乳制品" },
    { id: "egg", label: "蛋类" },
    { id: "fish", label: "鱼类" },
    { id: "shellfish", label: "甲壳/贝类" },
    { id: "wheat", label: "小麦/麸质" },
    { id: "soy", label: "大豆" },
    { id: "sesame", label: "芝麻" }
  ];

  const RESTRICTIONS = [
    { id: "no-pork", label: "不吃猪肉" },
    { id: "no-beef", label: "不吃牛肉" },
    { id: "vegetarian", label: "蛋奶素" }
  ];

  const SPECIAL_GROUPS = [
    { id: "children", label: "儿童用餐" },
    { id: "elderly", label: "老年人用餐" },
    { id: "pregnancy", label: "孕期提醒" }
  ];

  const FEATURE_COPY = {
    "ai.ingredientNlp": {
      title: "AI 自然语言录入",
      description: "输入“两个番茄、三个鸡蛋和半颗洋葱”，由服务端 DeepSeek 整理为可确认的食材清单。",
      limitation: "需要通过本地服务器或公网部署网址打开，并在服务端配置 DeepSeek API；不会在浏览器中保存密钥。",
      fallbackLabel: "先手动选择食材",
      fallback: "pantry"
    },
    "ai.ingredientVision": {
      title: "食材照片识别",
      description: "通义千问视觉模型识别照片中的食材，DeepSeek 负责文字理解、推荐解释和替换建议。",
      limitation: "识别结果必须逐项确认后才会加入食材篮；服务端未配置视觉模型时会明确提示，照片不会上传。",
      fallbackLabel: "从食材库选择",
      fallback: "pantry"
    },
    "ai.recommendationExplanation": {
      title: "AI 深度推荐解释",
      description: "DeepSeek 结合菜谱、时间、现有食材和匹配结果，用自然语言解释推荐理由。",
      limitation: "需要已部署的服务端与 DeepSeek API；AI 只解释，不修改排序和安全结论。",
      fallbackLabel: "继续查看规则说明",
      fallback: "close"
    },
    "ai.substitutionSuggestion": {
      title: "AI 食材替换建议",
      description: "DeepSeek 从风味、口感、饮食需求和应急替换角度给出候选，并说明与传统做法的差异。",
      limitation: "需要已部署的服务端与 DeepSeek API；返回候选仍会经过食材库和忌口校验。",
      fallbackLabel: "返回配料表",
      fallback: "close"
    },
    "cooking.beginnerGame": {
      title: "烹饪新手小游戏",
      description: "以后会把下锅后的顺序、等待和翻炒做成无失败、无惩罚的新手教程，火力只有低、中、高三档。",
      limitation: "本阶段只展示界面构想，操作逻辑和鼓励评分将在第三阶段实现。",
      fallbackLabel: "改用图文教程",
      fallback: "cook"
    },
    "account.login": {
      title: "微信登录",
      description: "小程序阶段登录后，可以在不同设备之间同步食材篮、收藏和采购清单。",
      limitation: "当前 HTML Demo 不要求登录，所有数据仅保存在本机浏览器。",
      fallbackLabel: "继续本机使用",
      fallback: "close"
    },
    "cloud.sync": {
      title: "云端同步",
      description: "以后可以同步收藏、饮食设置、采购清单与未完成的烹饪进度。",
      limitation: "当前没有连接云数据库；清理浏览器数据会同时清除本地记录。",
      fallbackLabel: "知道了",
      fallback: "close"
    },
    "platform.wechatShare": {
      title: "微信分享卡片",
      description: "小程序阶段可以分享菜谱卡片或采购清单给家人朋友。",
      limitation: "HTML Demo 没有微信分享环境，目前可复制采购清单文字。",
      fallbackLabel: "关闭预览",
      fallback: "close"
    },
    "platform.wechatMiniProgram": {
      title: "微信小程序版本",
      description: "最终版本将把当前业务规则迁移到微信小程序，并接入平台导航、登录、分享和隐私能力。",
      limitation: "当前优先验证完整 HTML 产品体验，尚未进入小程序适配与审核阶段。",
      fallbackLabel: "继续体验 HTML",
      fallback: "close"
    },
    "heritage.story": {
      title: "地域技艺故事",
      description: "以后会补充来源、代表工序、地域背景和可核验参考资料，让风味故事与菜谱操作真正连接。",
      limitation: "相关名录与资料仍需核验，本阶段只使用“地域风味”标识，不直接作正式非遗认定。",
      fallbackLabel: "返回菜谱",
      fallback: "close"
    }
  };

  const defaultState = {
    pantry: [
      { id: "tomato", name: "番茄", custom: false },
      { id: "eggs", name: "鸡蛋", custom: false },
      { id: "scallion", name: "小葱", custom: false }
    ],
    favorites: [],
    history: [],
    shopping: [],
    preferences: {
      allergens: [],
      restrictions: [],
      specialGroups: []
    },
    cooking: {},
    game: {},
    servings: {}
  };

  const ui = {
    pantryQuery: "",
    pantryCategory: "全部",
    recipeQuery: "",
    recipeCategory: "全部",
    recipeDifficulty: "全部",
    recipeTime: "全部",
    recommendationGroup: "ready"
  };

  let state = loadState();
  let timerInterval = null;
  let timerRemaining = 0;
  let toastTimer = null;
  let previousRouteKey = "";
  let pendingAiCandidates = [];
  let pendingAiSource = "";
  let pendingAiMeta = null;
  let pendingAiInput = "";
  let pendingAiRetry = null;
  let pendingPhotoDataUrl = "";
  let pendingPhotoName = "";
  let pendingSubstitutionSuggestions = [];
  let pendingBackupState = null;

  const view = document.getElementById("app-view");
  const sheet = document.getElementById("action-sheet");
  const sheetContent = document.getElementById("sheet-content");
  const toast = document.getElementById("toast");

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return structuredCloneSafe(defaultState);
      return {
        ...structuredCloneSafe(defaultState),
        ...saved,
        preferences: {
          ...structuredCloneSafe(defaultState.preferences),
          ...(saved.preferences || {})
        },
        cooking: saved.cooking || {},
        game: saved.game || {},
        servings: saved.servings || {}
      };
    } catch (_error) {
      return structuredCloneSafe(defaultState);
    }
  }

  function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateShoppingCount();
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[\s、，,；;（）()\-_/]/g, "");
  }

  function getRoute() {
    const raw = (location.hash || "#/home").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { name: parts[0] || "home", id: parts[1] || "" };
  }

  function navigate(hash) {
    if (!hash) return;
    if (location.hash === hash) renderApp(false);
    else location.hash = hash;
  }

  function recipeById(id) {
    return recipes.find((recipe) => recipe.id === id);
  }

  function catalogById(id) {
    return ingredients.find((item) => item.id === id);
  }

  function pantryItemImage(item, extraClass) {
    const catalog = catalogById(item.id);
    if (!catalog) {
      return `<span class="custom-pixel ${extraClass || ""}" aria-hidden="true">${esc(item.name.slice(0, 1))}</span>`;
    }
    return `<img class="${extraClass || ""}" src="${imageRoot}${encodeURIComponent(catalog.file)}" alt="${esc(catalog.name)}">`;
  }

  function itemMatchesIngredient(pantryItem, recipeIngredient) {
    const haystack = normalize(`${recipeIngredient.name}${recipeIngredient.label}`);
    const catalog = catalogById(pantryItem.id);
    const aliases = catalog ? [catalog.name, ...catalog.aliases] : [pantryItem.name];
    return aliases.some((alias) => {
      const needle = normalize(alias);
      return needle.length > 0 && (haystack.includes(needle) || needle.includes(normalize(recipeIngredient.name)));
    });
  }

  function ingredientAvailability(recipe) {
    return recipe.ingredients.map((ingredient) => ({
      ingredient,
      available: state.pantry.some((item) => itemMatchesIngredient(item, ingredient))
    }));
  }

  function evaluateSafety(recipe) {
    const warnings = [];
    const notes = [];
    state.preferences.allergens.forEach((id) => {
      if (recipe.allergens.includes(id)) {
        const label = ALLERGENS.find((item) => item.id === id)?.label || id;
        warnings.push(`含${label}相关配料，配料表规则已触发提醒`);
      }
    });
    if (state.preferences.restrictions.includes("no-pork") && recipe.flags.containsPork) {
      warnings.push("包含猪肉或猪肉制品，与“不吃猪肉”设置冲突");
    }
    if (state.preferences.restrictions.includes("no-beef") && recipe.flags.containsBeef) {
      warnings.push("包含牛肉或牛肉制品，与“不吃牛肉”设置冲突");
    }
    if (state.preferences.restrictions.includes("vegetarian") && !recipe.flags.vegetarian) {
      warnings.push("包含肉类或水产，不符合当前蛋奶素设置");
    }
    if (state.preferences.specialGroups.includes("pregnancy")) {
      if (recipe.flags.containsAlcohol) notes.push("含酒类配料；烹调后仍可能有残留，请结合个人情况谨慎选择");
      if (recipe.allergens.some((id) => id === "fish" || id === "shellfish" || id === "egg")) {
        notes.push("含蛋类或水产时请确保充分熟制；如有特殊医嘱，以专业建议为准");
      }
    }
    if (state.preferences.specialGroups.includes("children") && recipe.flags.spicy) {
      notes.push("口味可能偏辛辣，儿童用餐可酌情减少辣椒与花椒用量");
    }
    if (state.preferences.specialGroups.includes("elderly")) {
      notes.push("可根据咀嚼与吞咽情况调整软硬度和食材大小");
    }
    return { blocked: warnings.length > 0, warnings, notes };
  }

  function matchRecipe(recipe) {
    const availability = ingredientAvailability(recipe);
    const core = availability.filter((item) => item.ingredient.isCore);
    const matchedCore = core.filter((item) => item.available);
    const missingCore = core.filter((item) => !item.available);
    const matchedAll = availability.filter((item) => item.available);
    const coverage = availability.length ? matchedAll.length / availability.length : 0;
    const safety = evaluateSafety(recipe);
    const group = missingCore.length === 0 ? "ready" : missingCore.length <= 2 ? "almost" : "inspiration";
    const matchedNames = matchedCore.map((item) => item.ingredient.name);
    const missingNames = missingCore.map((item) => item.ingredient.name);
    const reason = group === "ready"
      ? `核心食材已齐${matchedNames.length ? `：${matchedNames.join("、")}` : ""}`
      : group === "almost"
        ? `已有${matchedNames.length ? matchedNames.join("、") : "部分配料"}，还差${missingNames.join("、")}`
        : `目前覆盖 ${Math.round(coverage * 100)}%，可作为下一次采购灵感`;
    return {
      recipe,
      group,
      coverage,
      matchedCore: matchedNames,
      missingCore: missingNames,
      missingAll: availability.filter((item) => !item.available),
      reason,
      safety
    };
  }

  function rankedRecipes() {
    const order = { ready: 0, almost: 1, inspiration: 2 };
    return recipes
      .map(matchRecipe)
      .filter((result) => !result.safety.blocked)
      .sort((a, b) => {
        if (order[a.group] !== order[b.group]) return order[a.group] - order[b.group];
        if (b.coverage !== a.coverage) return b.coverage - a.coverage;
        return a.recipe.time - b.recipe.time;
      });
  }

  function activeTab(route) {
    if (["recipes", "recipe"].includes(route.name)) return "recipes";
    if (["pantry", "recommendations"].includes(route.name)) return "pantry";
    if (["me", "shopping"].includes(route.name)) return "me";
    return "home";
  }

  function updateNav(route) {
    document.querySelectorAll("#bottom-nav [data-tab]").forEach((button) => {
      const active = button.dataset.tab === activeTab(route);
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function updateShoppingCount() {
    const count = state.shopping.filter((item) => !item.checked).length;
    const badge = document.getElementById("shopping-count");
    if (badge) badge.textContent = String(count);
  }

  function renderApp(preserveScroll) {
    const route = getRoute();
    const routeKey = `${route.name}/${route.id}`;
    const changed = routeKey !== previousRouteKey;
    previousRouteKey = routeKey;
    if (!(["cook", "game"].includes(route.name))) stopTimer();
    document.body.classList.toggle("cooking-mode", ["cook", "game"].includes(route.name));
    updateNav(route);
    updateShoppingCount();

    const renderers = {
      home: renderHome,
      pantry: renderPantry,
      recommendations: renderRecommendations,
      recipes: renderRecipes,
      recipe: () => renderRecipeDetail(route.id),
      shopping: renderShopping,
      cook: () => renderCook(route.id),
      game: () => renderGame(route.id),
      me: renderMe
    };
    const renderer = renderers[route.name] || renderNotFound;
    view.innerHTML = renderer();
    document.title = titleForRoute(route);
    if (changed && !preserveScroll) window.scrollTo({ top: 0, behavior: "auto" });
  }

  function titleForRoute(route) {
    if (["recipe", "cook", "game"].includes(route.name)) {
      const recipe = recipeById(route.id);
      return recipe ? `${recipe.name}｜烟火有谱` : "烟火有谱";
    }
    const names = {
      home: "今天吃什么",
      pantry: "我的食材篮",
      recommendations: "现在能做什么",
      recipes: "菜谱库",
      shopping: "采购清单",
      game: "烹饪小游戏",
      me: "我的烟火"
    };
    return `${names[route.name] || "烟火有谱"}｜烟火有谱`;
  }

  function renderHome() {
    const ranked = state.pantry.length ? rankedRecipes() : [];
    const readyCount = ranked.filter((item) => item.group === "ready").length;
    const picks = state.pantry.length
      ? ranked.slice(0, 5).map((item) => item.recipe)
      : ["cn-001", "cn-003", "west-001"].map(recipeById).filter(Boolean);
    const pantryPixels = state.pantry.slice(0, 4).map((item) => pantryItemImage(item)).join("");

    return `
      <section class="page home-page">
        <div class="hero-intro">
          <div class="eyebrow">TODAY'S KITCHEN / 今天的厨房</div>
          <h1 class="hero-title">今天吃什么，<br><em>家里有什么。</em></h1>
          <p class="hero-lead">从现有食材出发，或者从一道想吃的菜开始。两条路，最后都落到一份能执行的清单和一步步教程。</p>
        </div>

        <div class="main-choices">
          <button class="choice-card primary" type="button" data-nav="#/pantry">
            <span class="choice-number">01</span>
            <span class="choice-kicker">INGREDIENT → RECIPE</span>
            <strong>我有这些食材<br>看看现在能做什么</strong>
            <p>食材篮已有 ${state.pantry.length} 样，${readyCount ? `目前可直接做 ${readyCount} 道菜` : "选好后立即计算匹配结果"}。</p>
            <span class="choice-arrow">→</span>
          </button>

          <button class="choice-card secondary" type="button" data-nav="#/recipes">
            <span class="choice-number">02</span>
            <span class="choice-kicker">RECIPE → SHOPPING LIST</span>
            <strong>我想吃一道菜<br>看看需要准备什么</strong>
            <p>从 90 道中西餐里挑一道，自动区分已有食材和待采购项目。</p>
            <span class="choice-arrow">→</span>
          </button>
        </div>

        <button class="status-ribbon" type="button" data-action="open-stage-map">
          <span>
            <strong>联网产品能力持续接入</strong>
            <small>DeepSeek 录入、解释、替换与通义千问拍照识别已接服务端，小游戏与数据能力可用</small>
          </span>
          <span class="stage-tag">查看能力图</span>
        </button>

        <div class="section-head">
          <h2>你的食材篮</h2>
          <button class="text-action" type="button" data-nav="#/pantry">去调整 →</button>
        </div>
        <button class="pantry-summary-card wide-button" type="button" data-nav="#/pantry">
          <span>
            <strong>${state.pantry.length ? `${state.pantry.length} 样食材已入篮` : "食材篮还是空的"}</strong>
            <p>${state.pantry.length ? "点击继续添加，或直接寻找现在能做的菜。" : "从常用食材开始选，几秒钟就能得到结果。"}</p>
          </span>
          <span class="mini-pixels">${pantryPixels || `<span class="custom-pixel">+</span>`}</span>
        </button>

        <div class="section-head">
          <h2>${state.pantry.length ? "按现有食材推荐" : "今天先从这几道开始"}</h2>
          <button class="text-action" type="button" data-nav="${state.pantry.length ? "#/recommendations" : "#/recipes"}">查看全部 →</button>
        </div>
        <div class="recipe-strip">
          ${picks.map((recipe) => renderRecipeCard(recipe, state.pantry.length ? matchRecipe(recipe) : null)).join("")}
        </div>
      </section>
    `;
  }

  function renderPantry() {
    const categories = ["全部", ...new Set(ingredients.map((item) => item.category))];
    return `
      <section class="page pantry-page">
        <div class="page-head">
          <div>
            <div class="eyebrow">PANTRY / 根据食材找菜</div>
            <h1 class="page-title">食材篮</h1>
            <p class="page-subtitle">先告诉我家里有什么。示例食材已经放入篮中，你可以自由增删。</p>
          </div>
        </div>

        <div class="pantry-board" id="pantry-board">
          ${renderPantryBoardContent()}
        </div>

        <div class="feature-shortcuts">
          <button class="feature-shortcut enabled" type="button" data-action="open-ai-text">
            <span>阶段二 · DeepSeek AI</span>
            <strong>用一句话录入食材</strong>
          </button>
          <button class="feature-shortcut enabled" type="button" data-action="open-ai-photo">
            <span>阶段二 · 通义千问视觉</span>
            <strong>拍照识别桌面食材</strong>
          </button>
        </div>

        <div class="search-bar">
          <input class="search-input" id="pantry-search" type="search" value="${esc(ui.pantryQuery)}" placeholder="搜索番茄、鸡蛋、牛肉……" autocomplete="off">
          <span class="search-symbol" aria-hidden="true"></span>
        </div>

        <div class="chip-row" id="pantry-categories" aria-label="食材分类">
          ${categories.map((category) => `<button class="chip ${ui.pantryCategory === category ? "active" : ""}" type="button" data-action="pantry-category" data-value="${esc(category)}">${esc(category)}</button>`).join("")}
        </div>

        <div class="ingredient-grid" id="ingredient-grid">
          ${renderIngredientTiles()}
        </div>

        <form class="custom-add" id="custom-ingredient-form">
          <input id="custom-ingredient" maxlength="12" placeholder="没有找到？手动输入食材名" aria-label="手动输入食材名">
          <button class="primary-button" type="submit">加入</button>
        </form>

        <div class="sticky-action">
          <button class="ghost-button" type="button" data-action="clear-pantry">清空</button>
          <button class="primary-button fire" type="button" data-action="find-recipes">用这些食材找菜</button>
        </div>
      </section>
    `;
  }

  function renderPantryBoardContent() {
    const readyCount = state.pantry.length ? rankedRecipes().filter((item) => item.group === "ready").length : 0;
    return `
      <strong>${state.pantry.length} 样食材 · ${readyCount} 道可直接做</strong>
      <p>${state.pantry.length ? "从下方继续添加；需要移除时，点击已选食材右上角的 ×。" : "从下方选择食材，匹配结果会在这里出现。"}</p>
      <div class="selected-ingredient-row">
        ${state.pantry.length
          ? state.pantry.map((item) => `<span class="selected-pixel" title="${esc(item.name)}">${pantryItemImage(item)}<button class="selected-remove" type="button" data-action="remove-pantry" data-id="${esc(item.id)}" aria-label="移除${esc(item.name)}">×</button></span>`).join("")
          : `<span style="color:rgba(255,255,255,.6);font-size:11px">还没有选择食材</span>`}
      </div>
    `;
  }

  function filteredIngredients() {
    const query = normalize(ui.pantryQuery);
    return ingredients.filter((item) => {
      const categoryMatch = ui.pantryCategory === "全部" || item.category === ui.pantryCategory;
      const queryMatch = !query || [item.name, ...item.aliases].some((alias) => normalize(alias).includes(query));
      return categoryMatch && queryMatch;
    });
  }

  function renderIngredientTiles() {
    const list = filteredIngredients();
    if (!list.length) return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-mark">寻</div><h2>没有找到</h2><p>可以在下方直接输入食材名加入食材篮。</p></div>`;
    return list.map((item) => {
      const selected = state.pantry.some((pantry) => pantry.id === item.id);
      return `
        <button class="ingredient-tile ${selected ? "selected" : ""}" type="button" data-action="toggle-pantry" data-id="${esc(item.id)}" aria-pressed="${selected}">
          <img src="${imageRoot}${encodeURIComponent(item.file)}" alt="">
          <span>${esc(item.name)}</span>
        </button>
      `;
    }).join("");
  }

  function updatePantryPartial() {
    const board = document.getElementById("pantry-board");
    const grid = document.getElementById("ingredient-grid");
    if (board) board.innerHTML = renderPantryBoardContent();
    if (grid) grid.innerHTML = renderIngredientTiles();
    updateShoppingCount();
  }

  function renderRecommendations() {
    if (!state.pantry.length) {
      return `
        <section class="page">
          <div class="page-head"><div><div class="eyebrow">MATCH / 匹配结果</div><h1 class="page-title">现在能做什么</h1></div></div>
          ${renderEmpty("篮", "先放几样食材进来", "没有食材就无法计算可靠的匹配结果。", "去选择食材", "#/pantry")}
        </section>
      `;
    }
    const results = rankedRecipes();
    const groups = {
      ready: results.filter((item) => item.group === "ready"),
      almost: results.filter((item) => item.group === "almost"),
      inspiration: results.filter((item) => item.group === "inspiration")
    };
    if (!groups[ui.recommendationGroup]?.length) {
      ui.recommendationGroup = groups.ready.length ? "ready" : groups.almost.length ? "almost" : "inspiration";
    }
    const current = groups[ui.recommendationGroup] || [];
    return `
      <section class="page recommendation-page">
        <div class="page-head">
          <div>
            <div class="eyebrow">MATCH / 可解释食材匹配</div>
            <h1 class="page-title">现在能做什么</h1>
            <p class="page-subtitle">先排除明确的饮食冲突，再按核心食材缺失数量和覆盖率排序。</p>
          </div>
        </div>
        <div class="result-stats">
          <div class="result-stat"><strong>${groups.ready.length}</strong><span>马上能做</span></div>
          <div class="result-stat"><strong>${groups.almost.length}</strong><span>还差 1–2 样</span></div>
          <div class="result-stat"><strong>${groups.inspiration.length}</strong><span>换个灵感</span></div>
        </div>
        <div class="chip-row">
          <button class="chip ${ui.recommendationGroup === "ready" ? "active" : ""}" type="button" data-action="recommendation-group" data-value="ready">马上能做</button>
          <button class="chip ${ui.recommendationGroup === "almost" ? "active" : ""}" type="button" data-action="recommendation-group" data-value="almost">还差 1–2 样</button>
          <button class="chip ${ui.recommendationGroup === "inspiration" ? "active" : ""}" type="button" data-action="recommendation-group" data-value="inspiration">换个灵感</button>
        </div>
        <div class="filter-summary">
          <span>当前显示 <strong>${current.length}</strong> 道菜</span>
          <button class="text-action" type="button" data-nav="#/pantry">调整食材篮 →</button>
        </div>
        <div class="recommendation-list">
          ${current.slice(0, 30).map(renderRecommendationCard).join("")}
        </div>
      </section>
    `;
  }

  function renderRecommendationCard(result) {
    const recipe = result.recipe;
    const label = result.group === "ready" ? "核心食材齐全" : result.group === "almost" ? `还差 ${result.missingCore.length} 样` : `${Math.round(result.coverage * 100)}% 覆盖`;
    return `
      <article class="recommendation-card">
        <div class="rec-image" role="button" tabindex="0" data-action="open-recipe" data-id="${recipe.id}">
          <img src="${recipe.imageThumb}" alt="${esc(recipe.name)}" loading="lazy">
        </div>
        <div class="rec-copy">
          <div class="card-meta"><span>${esc(recipe.category)}</span><span>${label}</span></div>
          <h3>${esc(recipe.name)}</h3>
          <p class="rec-reason">${esc(result.reason)}</p>
          <div class="ingredient-mini-list">
            ${result.matchedCore.slice(0, 3).map((name) => `<span>已有 ${esc(name)}</span>`).join("")}
            ${result.missingCore.slice(0, 2).map((name) => `<span class="missing">缺 ${esc(name)}</span>`).join("")}
          </div>
          <div class="rec-actions">
            <button class="small-button" type="button" data-action="open-recipe" data-id="${recipe.id}">查看菜谱</button>
            <button class="small-button ai" type="button" data-action="ai-explain" data-id="${recipe.id}">智能解释推荐理由</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderRecipes() {
    const categories = ["全部", "中餐", "西餐", "地域风味"];
    const list = filteredRecipes();
    return `
      <section class="page recipes-page">
        <div class="page-head">
          <div>
            <div class="eyebrow">90 RECIPES / 根据菜谱找食材</div>
            <h1 class="page-title">今天想吃什么</h1>
            <p class="page-subtitle">60 道中餐、30 道西餐。选择菜谱后，系统会区分已有食材和待采购项目。</p>
          </div>
        </div>
        <div class="search-bar">
          <input class="search-input" id="recipe-search" type="search" value="${esc(ui.recipeQuery)}" placeholder="搜索菜名、菜系或主食材" autocomplete="off">
          <span class="search-symbol" aria-hidden="true"></span>
        </div>
        <div class="chip-row" id="recipe-categories">
          ${categories.map((category) => `<button class="chip ${ui.recipeCategory === category ? "active" : ""}" type="button" data-action="recipe-category" data-value="${category}">${category}</button>`).join("")}
        </div>
        <div class="filter-summary">
          <span>找到 <strong id="recipe-count">${list.length}</strong> 道菜</span>
          <span>
            <select class="select-compact" id="recipe-time" aria-label="按时间筛选">
              <option value="全部" ${ui.recipeTime === "全部" ? "selected" : ""}>全部时间</option>
              <option value="30" ${ui.recipeTime === "30" ? "selected" : ""}>30 分钟内</option>
              <option value="45" ${ui.recipeTime === "45" ? "selected" : ""}>45 分钟内</option>
            </select>
            <select class="select-compact" id="recipe-difficulty" aria-label="按难度筛选">
              <option value="全部" ${ui.recipeDifficulty === "全部" ? "selected" : ""}>全部难度</option>
              <option value="简单" ${ui.recipeDifficulty === "简单" ? "selected" : ""}>简单</option>
              <option value="适中" ${ui.recipeDifficulty === "适中" ? "selected" : ""}>适中</option>
              <option value="进阶" ${ui.recipeDifficulty === "进阶" ? "selected" : ""}>进阶</option>
            </select>
          </span>
        </div>
        <div class="recipe-grid" id="recipe-grid">
          ${renderRecipeGrid(list)}
        </div>
      </section>
    `;
  }

  function filteredRecipes() {
    const query = normalize(ui.recipeQuery);
    return recipes.filter((recipe) => {
      const queryMatch = !query || normalize(`${recipe.name}${recipe.en}${recipe.cuisine}${recipe.ingredients.map((item) => item.name).join("")}`).includes(query);
      const categoryMatch = ui.recipeCategory === "全部" || recipe.category === ui.recipeCategory;
      const difficultyMatch = ui.recipeDifficulty === "全部" || recipe.difficulty === ui.recipeDifficulty;
      const timeMatch = ui.recipeTime === "全部" || recipe.time <= Number(ui.recipeTime);
      return queryMatch && categoryMatch && difficultyMatch && timeMatch;
    });
  }

  function renderRecipeGrid(list) {
    if (!list.length) return renderEmpty("寻", "没有符合条件的菜", "换一个关键词或放宽时间、难度筛选。", "清除筛选", "action:reset-recipe-filters");
    return list.map((recipe) => renderRecipeCard(recipe, state.pantry.length ? matchRecipe(recipe) : null)).join("");
  }

  function updateRecipeGrid() {
    const list = filteredRecipes();
    const grid = document.getElementById("recipe-grid");
    const count = document.getElementById("recipe-count");
    if (grid) grid.innerHTML = renderRecipeGrid(list);
    if (count) count.textContent = String(list.length);
  }

  function renderRecipeCard(recipe, match) {
    const saved = state.favorites.includes(recipe.id);
    const matchLine = match
      ? `<div class="match-line ${match.group === "ready" ? "" : "missing"}"><span class="match-dot"></span>${match.group === "ready" ? "核心食材齐全" : match.group === "almost" ? `还差 ${match.missingCore.length} 样核心食材` : `现有食材覆盖 ${Math.round(match.coverage * 100)}%`}</div>`
      : "";
    return `
      <article class="recipe-card" role="button" tabindex="0" data-action="open-recipe" data-id="${recipe.id}">
        <div class="recipe-card-media">
          <img src="${recipe.imageThumb}" alt="${esc(recipe.name)}" loading="lazy">
          <button class="favorite-button ${saved ? "saved" : ""}" type="button" data-action="toggle-favorite" data-id="${recipe.id}" aria-label="${saved ? "取消收藏" : "收藏"}${esc(recipe.name)}">${saved ? "♥" : "♡"}</button>
        </div>
        <div class="recipe-card-body">
          <div class="card-meta"><span>${esc(recipe.category)} · ${esc(recipe.cuisine)}</span><span>${recipe.time} MIN</span></div>
          <h3>${esc(recipe.name)}</h3>
          <div class="en-name">${esc(recipe.en)}</div>
          ${matchLine}
        </div>
      </article>
    `;
  }

  function renderRecipeDetail(id) {
    const recipe = recipeById(id);
    if (!recipe) return renderNotFound();
    rememberHistory(id);
    const match = matchRecipe(recipe);
    const availability = ingredientAvailability(recipe);
    const servings = Number(state.servings[id] || recipe.defaultServings);
    const factor = servings / recipe.defaultServings;
    const safety = evaluateSafety(recipe);
    const inherentAllergens = recipe.allergens.map((allergen) => ALLERGENS.find((item) => item.id === allergen)?.label).filter(Boolean);
    const availableCount = availability.filter((item) => item.available).length;
    const substitutionCount = substitutableMissingIngredients(recipe).length;
    const safetyClass = safety.blocked ? "danger" : safety.notes.length ? "warning" : "";
    return `
      <section class="detail-page">
        <div class="detail-hero">
          <img src="${recipe.imageFull}" data-fallback="${recipe.imageThumb}" alt="${esc(recipe.name)}">
          <button class="back-button" type="button" data-action="back" aria-label="返回">←</button>
          <button class="favorite-button ${state.favorites.includes(id) ? "saved" : ""}" style="top:16px;right:16px" type="button" data-action="toggle-favorite" data-id="${id}" aria-label="收藏">${state.favorites.includes(id) ? "♥" : "♡"}</button>
          <div class="detail-title-block">
            <span class="tag">${esc(recipe.category)} · ${esc(recipe.cuisine)}</span>
            <h1>${esc(recipe.name)}</h1>
            <p>${esc(recipe.en)}</p>
          </div>
        </div>

        <div class="detail-content">
          <div class="fact-row">
            <div class="fact"><strong>${recipe.time} 分</strong><span>预计用时</span></div>
            <div class="fact"><strong>${recipe.difficulty}</strong><span>烹饪难度</span></div>
            <div class="fact"><strong>${recipe.steps.length} 步</strong><span>图文教程</span></div>
          </div>

          <div class="match-panel">
            <span>
              <strong>你已有 ${availableCount}/${availability.length} 样配料</strong>
              <p>${match.reason}</p>
            </span>
            <span class="match-ring">${Math.round(match.coverage * 100)}%</span>
          </div>

          <div class="section-head">
            <h2>准备食材</h2>
            <div class="serving-control" aria-label="调整份数">
              <button type="button" data-action="servings" data-id="${id}" data-delta="-1" aria-label="减少一份">−</button>
              <strong>${servings} 人</strong>
              <button type="button" data-action="servings" data-id="${id}" data-delta="1" aria-label="增加一份">+</button>
            </div>
          </div>
          <div class="ingredient-list">
            ${availability.map(({ ingredient, available }) => `
              <div class="ingredient-row">
                <span class="ingredient-state ${available ? "" : "missing"}">${available ? "✓" : "+"}</span>
                <span class="ingredient-copy">
                  <strong>${esc(ingredient.name)}</strong>
                  <span>${esc(ingredient.label)}${factor !== 1 ? ` · 按 ${servings} 人约 ×${factor.toFixed(1)}` : ""}</span>
                </span>
                ${ingredient.isCore ? `<span class="core-label">核心食材</span>` : ""}
              </div>
            `).join("")}
          </div>
          <button class="secondary-button wide-button" style="margin-top:12px" type="button" data-action="open-substitutions" data-id="${id}">${substitutionCount ? `智能找替代食材 · ${substitutionCount} 项可选` : "查看食材替换说明"}</button>
          <button class="ghost-button wide-button" style="margin-top:8px" type="button" data-action="share-recipe" data-id="${id}">分享这道菜</button>

          <div class="section-head"><h2>食用提醒</h2><button class="text-action" type="button" data-nav="#/me">调整设置 →</button></div>
          <div class="safety-card ${safetyClass}">
            <h3>过敏原、忌口与特殊人群食用提醒</h3>
            <p>配料规则识别：${inherentAllergens.length ? inherentAllergens.join("、") : "暂未识别到常见过敏原"}。本提醒不替代医疗或营养专业建议。</p>
            ${(safety.warnings.length || safety.notes.length) ? `<ul>${[...safety.warnings, ...safety.notes].map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
          </div>

          ${recipe.isHeritageFlavor ? `
            <div class="section-head"><h2>地域风味</h2></div>
            <div class="heritage-preview">
              <div class="sheet-kicker" style="color:#f2c46c">REGIONAL FLAVOR / 待资料核验</div>
              <h3>一碗风味背后的技艺故事</h3>
              <p>后续将连接来源、代表工序和可核验资料。当前不把地域美食直接等同于正式非遗项目。</p>
              <button class="ghost-button" style="position:relative;z-index:2;color:white;border-color:rgba(255,255,255,.35)" type="button" data-action="feature-preview" data-feature="heritage.story">查看功能预览</button>
            </div>
          ` : ""}

          <div class="section-head"><h2>烹饪步骤</h2><span>${recipe.steps.length} 步 · 火力已简化</span></div>
          <div class="step-preview-list">
            ${recipe.steps.map((step, index) => `
              <div class="step-preview">
                <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
                <span>
                  <p>${esc(step.instruction)}</p>
                  <span class="step-meta"><b>${heatLabel(step.heat)}火</b><b>${formatDuration(step.duration)}</b>${step.timerRequired ? "<b>可计时</b>" : ""}</span>
                </span>
              </div>
            `).join("")}
          </div>

          <div class="sticky-action">
            <button class="secondary-button" type="button" data-action="add-shopping" data-id="${id}">加入采购清单</button>
            <button class="primary-button fire" type="button" data-action="open-cook-modes" data-id="${id}">开始烹饪</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderShopping() {
    const remaining = state.shopping.filter((item) => !item.checked).length;
    const checked = state.shopping.length - remaining;
    return `
      <section class="page shopping-page">
        <div class="page-head">
          <div>
            <div class="eyebrow">SHOPPING LIST / 从菜谱到食材</div>
            <h1 class="page-title">采购清单</h1>
            <p class="page-subtitle">由菜谱自动生成，重复食材会合并，并保留它来自哪道菜。</p>
          </div>
        </div>
        ${state.shopping.length ? `
          <div class="shopping-summary">
            <span><strong>还要买 ${remaining} 样</strong><p>${checked ? `已有 ${checked} 项完成，可加入食材篮。` : "勾选买到的食材，进度会保存在本机。"}</p></span>
            <span class="stage-tag" style="color:#f2c46c">LOCAL</span>
          </div>
          <div class="shopping-list">
            ${state.shopping.map((item) => `
              <div class="shopping-item ${item.checked ? "checked" : ""}">
                <button class="check-button" type="button" data-action="toggle-shopping" data-id="${item.id}" aria-label="${item.checked ? "取消完成" : "标记完成"}">✓</button>
                <span class="shopping-copy">
                  <strong>${esc(item.name)}</strong>
                  <span>${esc(item.label)} · 来自 ${item.sources.map(esc).join("、")}</span>
                </span>
                <button class="remove-button" type="button" data-action="remove-shopping" data-id="${item.id}" aria-label="删除">×</button>
              </div>
            `).join("")}
          </div>
          <div class="feature-shortcuts" style="margin-top:16px">
            <button class="feature-shortcut" type="button" data-action="copy-shopping"><span>阶段一 · 可用</span><strong>复制清单文字</strong></button>
            <button class="feature-shortcut" type="button" data-action="shopping-to-pantry"><span>阶段一 · 可用</span><strong>已购食材加入食材篮</strong></button>
          </div>
          <button class="feature-row wide-button enabled" type="button" data-action="share-shopping">
            <span class="feature-icon">享</span><span><strong>分享采购清单</strong><span>优先调用系统分享，不支持时复制文字</span></span><b>可用</b>
          </button>
          <button class="danger-button wide-button" style="margin-top:18px" type="button" data-action="clear-checked-shopping">清除已完成项目</button>
        ` : renderEmpty("单", "采购清单还是空的", "先选一道菜，在详情页把缺少的配料加入清单。", "去挑一道菜", "#/recipes")}
      </section>
    `;
  }

  function renderCook(id) {
    const recipe = recipeById(id);
    if (!recipe) return renderNotFound();
    if (!state.cooking[id]) state.cooking[id] = { stepIndex: 0, completed: false };
    const session = state.cooking[id];
    if (session.completed || session.stepIndex >= recipe.steps.length) return renderCookDone(recipe);
    const index = Math.max(0, Math.min(session.stepIndex, recipe.steps.length - 1));
    const step = recipe.steps[index];
    const progress = ((index + 1) / recipe.steps.length) * 100;
    return `
      <section class="cooking-page">
        <div class="cook-top">
          <button type="button" data-nav="#/recipe/${id}">← 返回菜谱</button>
          <span style="font:10px var(--mono);color:rgba(255,255,255,.62)">图文教程 · 可用</span>
          <button type="button" data-action="open-cook-modes" data-id="${id}">切换方式</button>
        </div>
        <div class="cook-progress">
          <div class="progress-track"><span style="width:${progress}%"></span></div>
          <div class="progress-label"><span>${esc(recipe.name)}</span><span>${index + 1} / ${recipe.steps.length}</span></div>
        </div>
        <div class="cook-card">
          <div class="step-big-number">${String(index + 1).padStart(2, "0")}</div>
          <h1>${esc(step.instruction)}</h1>
          ${step.safetyNote ? `<div class="cook-note">${esc(step.safetyNote)}</div>` : `<div class="cook-note">先确认上一步已经完成，再继续操作。做饭不用赶，节奏稳定更重要。</div>`}
          <div class="heat-control" aria-label="当前建议火力">
            ${["low", "medium", "high"].map((heat) => `<div class="heat-level ${heat} ${step.heat === heat ? "active" : ""}">${heatLabel(heat)}火</div>`).join("")}
          </div>
          <div class="timer-panel">
            <span><strong id="timer-display">${formatClock(step.duration)}</strong><span>${step.timerRequired ? "这一步建议使用计时器" : "参考时长，可按实际状态调整"}</span></span>
            <button class="secondary-button" type="button" data-action="start-timer" data-seconds="${step.duration}">开始计时</button>
          </div>
        </div>
        <div class="cook-actions">
          <button class="ghost-button" style="color:white;border-color:rgba(255,255,255,.25)" type="button" data-action="cook-prev" data-id="${id}" ${index === 0 ? "disabled" : ""}>上一步</button>
          <button class="primary-button fire" type="button" data-action="cook-next" data-id="${id}">${index === recipe.steps.length - 1 ? "完成烹饪" : "完成这一步"}</button>
        </div>
      </section>
    `;
  }

  function renderCookDone(recipe) {
    return `
      <section class="cooking-page" style="display:grid;place-items:center;padding:35px 16px">
        <div class="cook-card cook-done" style="width:min(100%,620px)">
          <div class="cook-done-mark">成</div>
          <div class="sheet-kicker">COOKING COMPLETE</div>
          <h1>这道 ${esc(recipe.name)}，你已经稳稳做完了。</h1>
          <p style="color:var(--muted);line-height:1.7;font-size:12px">完成度 100 · 步骤节奏很稳。这里的评分只用于鼓励，不设置惩罚或失败。</p>
          <div class="sheet-actions">
            <button class="primary-button fire" type="button" data-nav="#/recipe/${recipe.id}">回到菜谱</button>
            <button class="ghost-button" type="button" data-action="restart-cook" data-id="${recipe.id}">再做一遍</button>
          </div>
        </div>
      </section>
    `;
  }

  const GAME_ACTIONS = {
    add: { label: "放入锅中", icon: "入" },
    stir: { label: "翻炒均匀", icon: "翻" },
    wait: { label: "耐心等待", icon: "候" },
    plate: { label: "关火出锅", icon: "成" },
    confirm: { label: "确认状态", icon: "看" }
  };

  function inferGameAction(instruction) {
    const text = String(instruction || "");
    if (/(出锅|盛出|装盘|起锅)/.test(text)) return "plate";
    if (/(倒入|加入|下锅|放入|撒入|下入)/.test(text)) return "add";
    if (/(翻炒|炒至|炒香|煎至|快速翻|拌匀|翻匀)/.test(text)) return "stir";
    if (/(焖|炖|煮|蒸|烤|静置|收汁|等待)/.test(text)) return "wait";
    return "confirm";
  }

  function gameSteps(recipe) {
    const cookingWords = /(锅|油|火|炒|煎|炸|煮|炖|焖|蒸|烤|倒入|加入|放入|出锅|盛出|收汁|定型|调味)/;
    const expanded = recipe.steps.flatMap((step) => {
      const parts = String(step.instruction || "").split(/[，；。]|后(?=[^，；。])/).map((part) => part.trim()).filter(Boolean);
      return parts.map((instruction) => ({ ...step, instruction, duration: Math.max(15, Math.round(Number(step.duration || 60) / parts.length)) }));
    });
    const filtered = expanded.filter((step) => cookingWords.test(step.instruction));
    return (filtered.length ? filtered : expanded).map((step, index) => {
      const action = inferGameAction(step.instruction);
      let used = action === "add"
        ? recipe.ingredients.filter((ingredient) => normalize(step.instruction).includes(normalize(ingredient.name)))
        : [];
      if (!used.length && action === "add") {
        const core = recipe.ingredients.filter((ingredient) => ingredient.isCore);
        if (core.length) used = [core[index % core.length]];
      }
      return { ...step, gameAction: step.gameAction && step.gameAction !== "confirm" ? step.gameAction : action, ingredientsUsed: used };
    });
  }

  function gameSessionFor(recipe) {
    const steps = gameSteps(recipe);
    if (!state.game[recipe.id]) {
      state.game[recipe.id] = {
        stepIndex: 0,
        heat: steps[0]?.heat || "medium",
        attempts: 0,
        readyIngredients: [],
        completed: false,
        score: 100,
        feedback: "看清提示再操作，做饭不用赶。"
      };
      saveState();
    }
    const session = state.game[recipe.id];
    session.stepIndex = Math.max(0, Math.min(Number(session.stepIndex || 0), steps.length));
    return session;
  }

  function gameIngredientImage(ingredient) {
    const item = catalogForRecipeIngredient(ingredient);
    if (item) return pantryItemImage({ id: item.id, name: item.name });
    return `<span class="custom-pixel">${esc(ingredient.name.slice(0, 1))}</span>`;
  }

  function renderGame(id) {
    const recipe = recipeById(id);
    if (!recipe) return renderNotFound();
    const steps = gameSteps(recipe);
    const session = gameSessionFor(recipe);
    if (session.completed || session.stepIndex >= steps.length) return renderGameDone(recipe, session);
    const step = steps[session.stepIndex];
    const action = GAME_ACTIONS[step.gameAction] || GAME_ACTIONS.confirm;
    const progress = ((session.stepIndex + 1) / steps.length) * 100;
    const trayIngredients = step.gameAction === "add" ? step.ingredientsUsed : [];
    return `
      <section class="cooking-page game-page">
        <div class="cook-top">
          <button type="button" data-nav="#/recipe/${id}">← 返回菜谱</button>
          <span style="font:10px var(--mono);color:rgba(255,255,255,.62)">新手小游戏 · 无失败</span>
          <button type="button" data-action="open-cook-modes" data-id="${id}">切换方式</button>
        </div>
        <div class="cook-progress">
          <div class="progress-track"><span style="width:${progress}%"></span></div>
          <div class="progress-label"><span>${esc(recipe.name)}</span><span>${session.stepIndex + 1} / ${steps.length}</span></div>
        </div>
        <div class="game-layout">
          <div class="game-stage">
            <div class="game-step-tag">现在练习 · ${esc(action.label)}</div>
            <h1>${esc(step.instruction)}</h1>
            <div class="game-feedback" aria-live="polite">${esc(session.feedback || "跟着提示慢慢来。")}</div>
            <div class="game-pan-wrap">
              <div class="game-steam"><i></i><i></i><i></i></div>
              <div class="game-pan"><span>${esc(action.icon)}</span></div>
              <div class="game-burner ${session.heat}"><i></i><i></i><i></i></div>
            </div>
            <div class="game-heat-label">建议火力：<strong>${heatLabel(step.heat)}火</strong></div>
          </div>
          <aside class="game-controls">
            <div class="game-control-block">
              <span class="game-control-title">① 选择火力</span>
              <div class="game-heat-buttons">
                ${["low", "medium", "high"].map((heat) => `<button class="${session.heat === heat ? "active" : ""}" type="button" data-action="game-heat" data-id="${id}" data-heat="${heat}">${heatLabel(heat)}火</button>`).join("")}
              </div>
            </div>
            <div class="game-control-block">
              <span class="game-control-title">② 食材托盘${step.ingredientsUsed.length ? " · 按提示选择" : ""}</span>
              <div class="game-ingredient-tray">
                ${trayIngredients.length ? trayIngredients.map((ingredient) => {
                  const ready = session.readyIngredients.includes(ingredient.id);
                  return `<button class="${ready ? "ready" : ""}" type="button" data-action="game-ingredient" data-id="${id}" data-ingredient="${esc(ingredient.id)}">${gameIngredientImage(ingredient)}<span>${esc(ingredient.name)}</span>${ready ? "<b>✓</b>" : ""}</button>`;
                }).join("") : `<div class="game-tray-empty">这一步不用添加新食材，直接完成下面的操作。</div>`}
              </div>
            </div>
            <div class="game-control-block">
              <span class="game-control-title">③ 进行操作</span>
              <div class="game-action-grid">
                ${Object.entries(GAME_ACTIONS).map(([key, value]) => `<button class="${key === step.gameAction ? "suggested" : ""}" type="button" data-action="game-action" data-id="${id}" data-game-action="${key}"><b>${value.icon}</b><span>${value.label}</span></button>`).join("")}
              </div>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function setGameHeat(id, heat) {
    const recipe = recipeById(id);
    if (!recipe || !["low", "medium", "high"].includes(heat)) return;
    const session = gameSessionFor(recipe);
    session.heat = heat;
    const step = gameSteps(recipe)[session.stepIndex];
    session.feedback = heat === step.heat ? `火力调到${heatLabel(heat)}火，正合适。` : `已经调到${heatLabel(heat)}火；看看提示是否需要再调整。`;
    saveState(); renderApp(true);
  }

  function chooseGameIngredient(id, ingredientId) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const session = gameSessionFor(recipe);
    const step = gameSteps(recipe)[session.stepIndex];
    const expected = step.ingredientsUsed.map((ingredient) => ingredient.id);
    if (expected.length && !expected.includes(ingredientId)) {
      session.attempts += 1;
      session.feedback = "还没到放这个食材的时候，再看看当前提示。";
    } else {
      session.readyIngredients = [...new Set([...session.readyIngredients, ingredientId])];
      const item = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId);
      session.feedback = `${item?.name || "食材"}已经准备好，接着选择正确操作。`;
    }
    saveState(); renderApp(true);
  }

  function submitGameAction(id, action) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const steps = gameSteps(recipe);
    const session = gameSessionFor(recipe);
    const step = steps[session.stepIndex];
    if (session.heat !== step.heat) {
      session.attempts += 1;
      session.feedback = `这一步更适合${heatLabel(step.heat)}火。先调整火力，我会等你。`;
      saveState(); renderApp(true); return;
    }
    const expectedIngredients = step.ingredientsUsed.map((ingredient) => ingredient.id);
    const ingredientsReady = expectedIngredients.every((ingredientId) => session.readyIngredients.includes(ingredientId));
    if (step.gameAction === "add" && expectedIngredients.length && !ingredientsReady) {
      session.attempts += 1;
      session.feedback = `先从托盘选中${step.ingredientsUsed.map((ingredient) => ingredient.name).join("、")}，再放入锅中。`;
      saveState(); renderApp(true); return;
    }
    if (action !== step.gameAction) {
      session.attempts += 1;
      session.feedback = `现在更适合“${GAME_ACTIONS[step.gameAction]?.label || "确认状态"}”。没关系，再试一次。`;
      saveState(); renderApp(true); return;
    }
    session.stepIndex += 1;
    session.readyIngredients = [];
    session.feedback = session.stepIndex >= steps.length ? "关键步骤都完成了，准备出锅。" : "节奏很好，继续下一步。";
    if (session.stepIndex >= steps.length) {
      session.completed = true;
      session.score = Math.max(80, 100 - session.attempts * 3);
    } else {
      session.heat = steps[session.stepIndex].heat;
    }
    saveState(); renderApp(true);
  }

  function renderGameDone(recipe, session) {
    const score = Number(session.score || 100);
    const encouragement = score >= 96 ? "节奏很稳，你已经抓住这道菜的关键。" : score >= 88 ? "关键顺序已经掌握，再做一次会更从容。" : "每次尝试都在积累手感，你已经完整走完流程。";
    return `
      <section class="cooking-page game-page game-complete-page">
        <div class="game-complete-card">
          <div class="cook-done-mark">稳</div>
          <div class="sheet-kicker">BEGINNER GUIDE COMPLETE</div>
          <h1>${esc(recipe.name)}的新手练习完成</h1>
          <div class="game-score"><strong>${score}</strong><span>鼓励评分</span></div>
          <p>${esc(encouragement)}</p>
          <small>评分只用于鼓励，不设失败、排名或惩罚。</small>
          <div class="sheet-actions"><button class="primary-button fire" type="button" data-action="restart-game" data-id="${recipe.id}">再练一次</button><button class="ghost-button" type="button" data-action="start-cook" data-id="${recipe.id}">进入图文教程</button><button class="ghost-button" type="button" data-nav="#/recipe/${recipe.id}">回到菜谱</button></div>
        </div>
      </section>
    `;
  }

  function restartGame(id) {
    delete state.game[id];
    saveState(); renderApp(false);
  }

  function renderMe() {
    const completed = new Set([
      ...Object.entries(state.cooking).filter(([, item]) => item.completed).map(([id]) => id),
      ...Object.entries(state.game).filter(([, item]) => item.completed).map(([id]) => id)
    ]).size;
    return `
      <section class="page profile-page">
        <div class="profile-hero">
          <span><h1>我的烟火</h1><p>当前无需登录，收藏、清单和设置均保存在本机。</p></span>
          <span class="profile-seal">谱</span>
        </div>
        <div class="profile-stats">
          <div class="profile-stat"><strong>${state.favorites.length}</strong><span>收藏菜谱</span></div>
          <div class="profile-stat"><strong>${state.history.length}</strong><span>最近浏览</span></div>
          <div class="profile-stat"><strong>${completed}</strong><span>完成烹饪</span></div>
        </div>

        <div class="section-head"><h2>饮食设置</h2><span>明确配料 · 可解释</span></div>
        <div class="settings-card">
          <h3>常见过敏原</h3>
          <p>选中后，存在明确配料冲突的菜谱不会进入“马上能做”。</p>
          <div class="preference-grid">
            ${ALLERGENS.map((item) => preferenceChip("allergens", item)).join("")}
          </div>
        </div>
        <div class="settings-card">
          <h3>忌口与饮食方式</h3>
          <p>根据明确肉类配料进行过滤，不使用 AI 猜测。</p>
          <div class="preference-grid">
            ${RESTRICTIONS.map((item) => preferenceChip("restrictions", item)).join("")}
          </div>
        </div>
        <div class="settings-card">
          <h3>特殊人群提醒</h3>
          <p>只提供克制的食材与熟制提醒，不替代医疗或营养专业建议。</p>
          <div class="preference-grid">
            ${SPECIAL_GROUPS.map((item) => preferenceChip("specialGroups", item)).join("")}
          </div>
        </div>

        <div class="section-head"><h2>数据与小程序能力</h2><span>本地增强已开放</span></div>
        <div class="feature-list">
          <button class="feature-row enabled" type="button" data-action="export-local-data"><span class="feature-icon">备</span><span><strong>导出本机数据</strong><span>备份食材篮、收藏、清单与进度</span></span><b>可用</b></button>
          <button class="feature-row enabled" type="button" data-action="open-import-data"><span class="feature-icon">入</span><span><strong>恢复本机备份</strong><span>从烟火有谱 JSON 文件恢复</span></span><b>可用</b></button>
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="account.login"><span class="feature-icon">登</span><span><strong>微信登录</strong><span>不登录也能完整使用阶段一</span></span><b>阶段三</b></button>
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="cloud.sync"><span class="feature-icon">云</span><span><strong>跨设备云同步</strong><span>收藏、清单和烹饪进度</span></span><b>阶段三</b></button>
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="platform.wechatMiniProgram"><span class="feature-icon">微</span><span><strong>微信小程序版本</strong><span>最终产品形态与平台能力</span></span><b>阶段三</b></button>
        </div>

        <div class="section-head"><h2>项目与数据</h2></div>
        <button class="danger-button wide-button" style="margin-top:10px" type="button" data-action="reset-local-data">清除本机体验数据</button>
      </section>
    `;
  }

  function preferenceChip(group, item) {
    const active = state.preferences[group].includes(item.id);
    return `<button class="preference-chip ${active ? "active" : ""}" type="button" data-action="toggle-preference" data-group="${group}" data-id="${item.id}" aria-pressed="${active}">${esc(item.label)}</button>`;
  }

  function renderNotFound() {
    return `<section class="page">${renderEmpty("谱", "这一页没有找到", "可能是链接已经失效，回到首页重新开始。", "返回首页", "#/home")}</section>`;
  }

  function renderEmpty(mark, title, description, buttonLabel, target) {
    const action = target.startsWith("action:")
      ? `data-action="${target.slice(7)}"`
      : `data-nav="${target}"`;
    return `<div class="empty-state"><div class="empty-mark">${mark}</div><h2>${title}</h2><p>${description}</p><button class="primary-button" type="button" ${action}>${buttonLabel}</button></div>`;
  }

  function rememberHistory(id) {
    const next = [id, ...state.history.filter((item) => item !== id)].slice(0, 12);
    if (next.join("|") !== state.history.join("|")) {
      state.history = next;
      saveState();
    }
  }

  function heatLabel(heat) {
    return ({ low: "低", medium: "中", high: "高" })[heat] || "中";
  }

  function formatDuration(seconds) {
    if (seconds >= 3600) return `${Math.round(seconds / 3600)} 小时`;
    return `${Math.max(1, Math.round(seconds / 60))} 分钟`;
  }

  function formatClock(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  }

  function togglePantry(id) {
    const exists = state.pantry.some((item) => item.id === id);
    if (exists) state.pantry = state.pantry.filter((item) => item.id !== id);
    else {
      const item = catalogById(id);
      if (item) state.pantry.push({ id: item.id, name: item.name, custom: false });
    }
    saveState();
  }

  function addCustomIngredient(name) {
    const clean = String(name || "").trim();
    if (!clean) return false;
    const catalog = ingredients.find((item) => [item.name, ...item.aliases].some((alias) => normalize(alias) === normalize(clean)));
    if (catalog) {
      if (!state.pantry.some((item) => item.id === catalog.id)) state.pantry.push({ id: catalog.id, name: catalog.name, custom: false });
    } else if (!state.pantry.some((item) => normalize(item.name) === normalize(clean))) {
      state.pantry.push({ id: `custom-${Date.now()}`, name: clean, custom: true });
    }
    saveState();
    return true;
  }

  function toggleFavorite(id) {
    state.favorites = state.favorites.includes(id)
      ? state.favorites.filter((item) => item !== id)
      : [id, ...state.favorites];
    saveState();
  }

  function addRecipeToShopping(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const availability = ingredientAvailability(recipe).filter((item) => !item.available);
    if (!availability.length) {
      showToast("这道菜所需配料都已在食材篮中");
      return;
    }
    availability.forEach(({ ingredient }) => {
      const key = normalize(ingredient.name);
      const existing = state.shopping.find((item) => item.key === key);
      if (existing) {
        if (!existing.sources.includes(recipe.name)) existing.sources.push(recipe.name);
      } else {
        state.shopping.push({
          id: `shop-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          key,
          name: ingredient.name,
          label: ingredient.label,
          checked: false,
          sources: [recipe.name]
        });
      }
    });
    saveState();
    showToast(`已把 ${availability.length} 样缺少配料加入采购清单`);
  }

  function shoppingToPantry() {
    const checked = state.shopping.filter((item) => item.checked);
    if (!checked.length) {
      showToast("先勾选已经买到的食材");
      return;
    }
    checked.forEach((shoppingItem) => {
      const catalog = ingredients.find((item) => [item.name, ...item.aliases].some((alias) => normalize(shoppingItem.name).includes(normalize(alias)) || normalize(alias).includes(normalize(shoppingItem.name))));
      if (catalog && !state.pantry.some((item) => item.id === catalog.id)) {
        state.pantry.push({ id: catalog.id, name: catalog.name, custom: false });
      } else if (!catalog && !state.pantry.some((item) => normalize(item.name) === normalize(shoppingItem.name))) {
        state.pantry.push({ id: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: shoppingItem.name, custom: true });
      }
    });
    saveState();
    showToast(`已把 ${checked.length} 样已购食材加入食材篮`);
  }

  function copyShoppingText() {
    if (!state.shopping.length) return;
    copyText(shoppingText(), "采购清单已复制");
  }

  function shoppingText() {
    return ["烟火有谱｜采购清单", ...state.shopping.map((item) => `${item.checked ? "✓" : "□"} ${item.name}（${item.label}）`)].join("\n");
  }

  async function shareContent(title, text, url) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        showToast("已打开系统分享");
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    copyText(`${text}${url ? `\n${url}` : ""}`, "当前环境不支持系统分享，内容已复制");
  }

  function shareShopping() {
    if (!state.shopping.length) return showToast("采购清单还是空的");
    shareContent("烟火有谱采购清单", shoppingText(), "");
  }

  function shareRecipe(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const text = `${recipe.name}｜${recipe.category} · ${recipe.cuisine}\n预计 ${recipe.time} 分钟，共 ${recipe.steps.length} 步。\n来自烟火有谱。`;
    const url = /^https?:$/.test(location.protocol) ? `${location.origin}${location.pathname}#/recipe/${id}` : "";
    shareContent(`${recipe.name}｜烟火有谱`, text, url);
  }

  function exportLocalData() {
    const backup = {
      product: "烟火有谱",
      version: "1.1.0",
      exportedAt: new Date().toISOString(),
      data: state
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `烟火有谱-本机备份-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 500);
    showToast("本机数据备份已导出");
  }

  function openImportData() {
    pendingBackupState = null;
    openSheet(`
      <div class="sheet-kicker">PHASE 3 · LOCAL BACKUP</div>
      <h2 id="sheet-title">恢复本机备份</h2>
      <p class="sheet-lead">选择由烟火有谱导出的 JSON 文件。解析只在浏览器本机完成，确认前不会覆盖当前数据。</p>
      <label class="photo-drop compact" for="backup-file"><span class="photo-mark">入</span><strong>选择备份文件</strong><small>仅接受 .json</small><input id="backup-file" type="file" accept="application/json,.json"></label>
      <div id="backup-summary" class="privacy-note"><b>尚未选择文件</b><span>当前食材篮、收藏和清单保持不变。</span></div>
      <div class="sheet-actions"><button class="primary-button" id="confirm-import-button" type="button" data-action="confirm-import-data" disabled>确认恢复</button><button class="ghost-button" type="button" data-action="close-sheet">取消</button></div>
    `);
  }

  function handleBackupSelection(file) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return showToast("备份文件不能超过 2MB");
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        if (parsed.product !== "烟火有谱" || !parsed.data || typeof parsed.data !== "object") throw new Error("文件不是烟火有谱备份");
        pendingBackupState = parsed.data;
        const summary = document.getElementById("backup-summary");
        if (summary) summary.innerHTML = `<b>备份可以恢复</b><span>${esc(parsed.exportedAt?.slice(0, 10) || "未知日期")} · ${(parsed.data.pantry || []).length} 样食材 · ${(parsed.data.favorites || []).length} 个收藏 · ${(parsed.data.shopping || []).length} 项清单</span>`;
        const button = document.getElementById("confirm-import-button");
        if (button) button.disabled = false;
      } catch (error) {
        pendingBackupState = null;
        showToast(error.message || "备份文件无法读取");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function confirmImportData() {
    if (!pendingBackupState) return;
    state = {
      ...structuredCloneSafe(defaultState),
      ...pendingBackupState,
      preferences: { ...structuredCloneSafe(defaultState.preferences), ...(pendingBackupState.preferences || {}) },
      cooking: pendingBackupState.cooking || {},
      game: pendingBackupState.game || {},
      servings: pendingBackupState.servings || {}
    };
    saveState();
    pendingBackupState = null;
    closeSheet(); renderApp(false); showToast("本机备份已恢复");
  }

  function copyText(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => fallbackCopy(text, message));
    } else fallbackCopy(text, message);
  }

  function fallbackCopy(text, message) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); showToast(message); }
    catch (_error) { showToast("复制失败，请手动记录"); }
    area.remove();
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }

  function openSheet(html, context) {
    sheetContent.innerHTML = html;
    sheet.dataset.context = context || "";
    if (!sheet.open) sheet.showModal();
  }

  function closeSheet() {
    if (sheet.open) sheet.close();
    sheet.dataset.context = "";
    pendingAiRetry = null;
    pendingPhotoDataUrl = "";
    pendingPhotoName = "";
    pendingBackupState = null;
  }

  function providerBadge(meta) {
    if (meta?.provider === "deepseek") return `<span class="provider-badge ai-live">DeepSeek · ${esc(meta.model || "服务端 AI")}</span>`;
    if (meta?.provider === "qwen-vision") return `<span class="provider-badge ai-live">通义千问视觉 · ${esc(meta.model || "服务端 AI")}</span>`;
    return `<span class="provider-badge">服务端 AI</span>`;
  }

  function openAiTextSheet(initialValue = "") {
    pendingAiInput = String(initialValue || "");
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · SMART INPUT</div>
      <h2 id="sheet-title">一句话加入食材</h2>
      <p class="sheet-lead">例如：“两个番茄、三个鸡蛋和半颗洋葱”。内容会发送到烟火有谱服务端，再由 DeepSeek 整理为候选食材。</p>
      <label class="ai-input-label" for="ai-ingredient-text">你家里现在有什么？</label>
      <textarea class="ai-textarea" id="ai-ingredient-text" maxlength="500" rows="4" placeholder="两个番茄、三个鸡蛋、半颗洋葱">${esc(pendingAiInput)}</textarea>
      <div class="privacy-note"><b>联网与安全</b><span>需要通过本地服务器或公网部署网址打开；结果必须由你确认后才会加入食材篮，DeepSeek 密钥不会进入浏览器。</span></div>
      <div class="sheet-actions"><button class="primary-button fire" type="button" data-action="parse-ai-text">开始整理</button><button class="ghost-button" type="button" data-action="close-sheet">取消</button></div>
    `);
  }

  function showAiLoading(title, message) {
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · WORKING</div>
      <h2 id="sheet-title">${esc(title)}</h2>
      <p class="sheet-lead">${esc(message)}</p>
      <div class="ai-loading" aria-live="polite"><span></span><span></span><span></span><b>正在整理候选，不会自动写入食材篮</b></div>
    `);
  }

  async function parseAiText() {
    const text = document.getElementById("ai-ingredient-text")?.value.trim();
    if (!text) return showToast("先输入一句食材描述");
    pendingAiInput = text;
    return requestAiText(text);
  }

  async function requestAiText(text) {
    pendingAiRetry = () => requestAiText(text);
    showAiLoading("DeepSeek 正在理解这句话", "正在调用烟火有谱服务端，不使用本机规则生成替代结果。");
    const result = await services.ai?.parseIngredients?.({ text, locale: "zh-CN" });
    if (!result?.ok) return showAiError("没有识别到可确认的食材", result?.error, { fallbackAction: "edit-ai-text", fallbackLabel: "修改原句" });
    pendingAiRetry = null;
    showAiCandidates("确认识别结果", result.data.ingredients || [], result.meta, "text");
  }

  function showAiCandidates(title, candidates, meta, source) {
    pendingAiSource = source || "text";
    pendingAiMeta = meta || null;
    pendingAiCandidates = candidates.map((candidate) => ({
      ...candidate,
      canonicalId: candidate.canonicalId || candidate.ingredientId || "",
      selected: true
    })).filter((candidate) => catalogById(candidate.canonicalId));
    if (!pendingAiCandidates.length) return showAiError("没有可靠候选", "本次结果无法对应到现有食材库，请改用手动选择。");
    renderAiCandidateSheet(title, meta);
  }

  function renderAiCandidateSheet(title, meta) {
    const provider = meta || { provider: "deepseek", model: "服务端 AI" };
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · CONFIRM FIRST</div>
      <div class="provider-row">${providerBadge(provider)}<span>识别结果不会自动保存</span></div>
      <h2 id="sheet-title">${esc(title)}</h2>
      <p class="sheet-lead">逐项确认，需要的保持选中，不准确的点一下取消。</p>
      <div class="ai-candidate-list">
        ${pendingAiCandidates.map((candidate, index) => {
          const catalog = catalogById(candidate.canonicalId);
          const amount = candidate.quantity ? `${candidate.quantity}${candidate.unit || "份"}` : "数量未指定";
          const confidence = Number.isFinite(Number(candidate.confidence)) ? `${Math.round(Number(candidate.confidence) * 100)}%` : "待确认";
          return `<button class="ai-candidate ${candidate.selected ? "selected" : ""}" type="button" data-action="toggle-ai-candidate" data-index="${index}" aria-pressed="${candidate.selected}">
            ${pantryItemImage({ id: catalog.id, name: catalog.name })}
            <span><strong>${esc(catalog.name)}</strong><small>${esc(amount)} · 置信度 ${confidence}</small></span>
            <b>${candidate.selected ? "✓" : "+"}</b>
          </button>`;
        }).join("")}
      </div>
      <div class="sheet-actions"><button class="primary-button fire" type="button" data-action="apply-ai-candidates">把选中项加入食材篮</button><button class="ghost-button" type="button" data-action="close-sheet">取消</button></div>
    `);
  }

  function toggleAiCandidate(index) {
    const candidate = pendingAiCandidates[Number(index)];
    if (!candidate) return;
    candidate.selected = !candidate.selected;
    renderAiCandidateSheet("确认识别结果", pendingAiMeta);
  }

  function aiErrorPresentation(error) {
    const code = String(error?.code || "AI_REQUEST_FAILED");
    const message = String(error?.message || "DeepSeek 服务暂时不可用");
    if (code === "RATE_LIMITED" || code === "AI_RATE_LIMITED") {
      return { label: "请求过快", message, guidance: "请稍等约一分钟再试，刚才的内容仍然保留。" };
    }
    if (code === "AI_BALANCE_INSUFFICIENT" || /余额|balance|insufficient/i.test(message)) {
      return { label: "账户余额不足", message: "DeepSeek 账户当前没有足够余额完成请求。", guidance: "充值后可直接点击重新尝试，不需要重新填写内容。" };
    }
    if (code === "AI_AUTH_FAILED" || /authentication|api key|密钥/i.test(message)) {
      return { label: "服务端密钥异常", message: "服务器没有通过 DeepSeek 身份验证。", guidance: "请检查服务器环境变量中的 API Key，密钥不会保存在浏览器。" };
    }
    if (code === "AI_TIMEOUT") {
      return { label: "响应超时", message, guidance: "网络或模型响应较慢，可以保留当前内容重新尝试。" };
    }
    if (code === "AI_SERVICE_UNAVAILABLE" || code === "AI_NOT_CONFIGURED") {
      return { label: "AI 服务未连接", message, guidance: "请从本地服务器或已部署网址打开，并确认服务端已经配置 DeepSeek。" };
    }
    if (code === "AI_CAPABILITY_UNAVAILABLE") {
      return { label: "能力尚未接入", message, guidance: "本次内容没有上传或写入，可先使用页面中的现有方式完成操作。" };
    }
    return { label: "本次请求未完成", message, guidance: "没有写入任何结果。你可以重新尝试，或先使用页面中的普通功能。" };
  }

  function showAiError(title, error, options = {}) {
    const detail = aiErrorPresentation(error);
    const canRetry = options.retry !== false && typeof pendingAiRetry === "function";
    const fallbackAction = options.fallbackAction || "close-sheet";
    const fallbackLabel = options.fallbackLabel || "关闭";
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · AI SERVICE</div>
      <h2 id="sheet-title">${esc(title)}</h2>
      <div class="preview-note ai-error-card"><span class="ai-error-code">${esc(detail.label)}</span><strong>${esc(detail.message)}</strong><p>${esc(detail.guidance)}</p></div>
      <div class="sheet-actions">${canRetry ? `<button class="primary-button fire" type="button" data-action="retry-ai">重新尝试</button>` : ""}<button class="ghost-button" type="button" data-action="${fallbackAction}">${esc(fallbackLabel)}</button></div>
    `);
  }

  async function retryPendingAi() {
    const retry = pendingAiRetry;
    if (typeof retry !== "function") return showToast("当前没有可重试的 AI 操作");
    await services.refreshStatus?.();
    return retry();
  }

  function applyAiCandidates() {
    let added = 0;
    pendingAiCandidates.filter((candidate) => candidate.selected).forEach((candidate) => {
      const item = catalogById(candidate.canonicalId);
      if (item && !state.pantry.some((pantry) => pantry.id === item.id)) {
        state.pantry.push({ id: item.id, name: item.name, custom: false });
        added += 1;
      }
    });
    saveState();
    pendingAiInput = "";
    closeSheet();
    if (getRoute().name === "pantry") updatePantryPartial();
    else renderApp(true);
    showToast(added ? `已加入 ${added} 样食材` : "选中食材已经在篮中");
  }

  function openAiPhotoSheet() {
    pendingPhotoDataUrl = "";
    pendingPhotoName = "";
    renderAiPhotoSheet();
  }

  function renderAiPhotoSheet() {
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · INGREDIENT VISION</div>
      <h2 id="sheet-title">拍照识别桌面食材</h2>
      <p class="sheet-lead">选择照片后先只在本机预览；只有点击“开始识别”才会上传到你配置的 AI 服务。</p>
      <label class="photo-drop" for="ai-photo-file">
        ${pendingPhotoDataUrl ? `<img src="${pendingPhotoDataUrl}" alt="待识别食材照片"><span>${esc(pendingPhotoName)}</span>` : `<span class="photo-mark">照</span><strong>选择或拍摄照片</strong><small>PNG、JPEG、WebP，最大 5MB</small>`}
        <input id="ai-photo-file" type="file" accept="image/png,image/jpeg,image/webp" capture="environment">
      </label>
      <div class="privacy-note"><b>照片用途</b><span>仅用于本次食材候选识别；照片在本机压缩后上传，不写入本地历史，关闭弹层即清除预览。服务端不记录请求正文。</span></div>
      <div class="sheet-actions"><button class="primary-button fire" type="button" data-action="recognize-ai-photo" ${pendingPhotoDataUrl ? "" : "disabled"}>开始识别</button><button class="ghost-button" type="button" data-action="close-sheet">取消</button></div>
    `);
  }

  function compressImageFile(file) {
    return new Promise((resolvePromise, rejectPromise) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const maxSide = 1280;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolvePromise(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        rejectPromise(new Error("图片无法读取"));
      };
      image.src = objectUrl;
    });
  }

  function handlePhotoSelection(file) {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/i.test(file.type)) return showToast("请选择 PNG、JPEG 或 WebP 图片");
    if (file.size > 5 * 1024 * 1024) return showToast("图片不能超过 5MB");
    compressImageFile(file)
      .then((dataUrl) => {
        pendingPhotoDataUrl = dataUrl;
        pendingPhotoName = file.name;
        renderAiPhotoSheet();
      })
      .catch(() => showToast("图片无法读取，请换一张照片"));
  }

  async function recognizeAiPhoto() {
    if (!pendingPhotoDataUrl) return showToast("请先选择照片");
    pendingAiRetry = () => recognizeAiPhoto();
    showAiLoading("正在识别照片", "照片先在本机压缩，再发送给你配置的烟火有谱服务端，由通义千问视觉模型识别。");
    const result = await services.ai?.recognizeIngredientPhoto?.({ imageDataUrl: pendingPhotoDataUrl, locale: "zh-CN" });
    if (!result?.ok) return showAiError("照片识别没有完成", result?.error, { fallbackAction: "close-sheet", fallbackLabel: "返回食材篮" });
    pendingAiRetry = null;
    pendingPhotoDataUrl = "";
    pendingPhotoName = "";
    showAiCandidates("确认照片中的食材", result.data.candidates || [], result.meta, "photo");
  }

  async function explainRecommendation(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const matchResult = matchRecipe(recipe);
    pendingAiRetry = () => explainRecommendation(id);
    showAiLoading(`DeepSeek 正在解释为什么推荐${recipe.name}`, "AI 负责自然语言解释；食材匹配、排序与安全校验保持可检查。");
    const result = await services.ai?.explainRecommendation?.({ recipe, pantry: state.pantry, matchResult, preferences: state.preferences });
    if (!result?.ok) return showAiError("暂时无法生成解释", result?.error, { fallbackAction: "close-sheet", fallbackLabel: "返回推荐结果" });
    pendingAiRetry = null;
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · EXPLAINABLE</div>
      <div class="provider-row">${providerBadge(result.meta)}<span>不改变产品排序</span></div>
      <h2 id="sheet-title">为什么推荐 ${esc(recipe.name)}</h2>
      <p class="sheet-lead">${esc(result.data.summary)}</p>
      <ul class="ai-bullet-list">${(result.data.bullets || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      <div class="privacy-note"><b>安全说明</b><span>${esc(result.data.caveat || "过敏原和忌口继续由明确配料规则判断。")}</span></div>
      <div class="sheet-actions"><button class="primary-button" type="button" data-action="open-recipe" data-id="${id}">查看菜谱</button><button class="ghost-button" type="button" data-action="close-sheet">关闭</button></div>
    `, id);
  }

  function catalogForRecipeIngredient(ingredient) {
    const haystack = normalize(`${ingredient?.name || ""}${ingredient?.label || ""}`);
    return ingredients.find((item) => [item.name, ...(item.aliases || [])].some((alias) => haystack.includes(normalize(alias)) || normalize(alias).includes(normalize(ingredient?.name || ""))));
  }

  function substitutableMissingIngredients(recipe) {
    return ingredientAvailability(recipe)
      .filter((item) => !item.available)
      .map((item) => ({ ...item, catalogItem: catalogForRecipeIngredient(item.ingredient) }))
      .filter((item) => item.catalogItem)
      .sort((a, b) => Number(b.ingredient.isCore) - Number(a.ingredient.isCore));
  }

  function openSubstitutionPicker(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const allMissing = ingredientAvailability(recipe).filter((item) => !item.available);
    const missing = substitutableMissingIngredients(recipe);
    pendingAiRetry = null;
    if (!allMissing.length) {
      openSheet(`<div class="sheet-kicker">PHASE 2 · SUBSTITUTE</div><h2 id="sheet-title">现在不需要替换</h2><p class="sheet-lead">这道菜的配料已经都在食材篮中，可以直接按原菜谱准备。</p><div class="sheet-actions"><button class="primary-button" type="button" data-action="close-sheet">知道了</button></div>`);
      return;
    }
    if (!missing.length) {
      const missingNames = allMissing.slice(0, 5).map(({ ingredient }) => ingredient.name).join("、");
      openSheet(`
        <div class="sheet-kicker">PHASE 2 · SUBSTITUTE</div>
        <h2 id="sheet-title">没有可校验的替换目标</h2>
        <p class="sheet-lead">当前缺少：${esc(missingNames)}。这些项目不在现有常用食材目录中，因此不会让 AI 随意给出无法核验的替代。</p>
        <div class="privacy-note"><b>为什么这样处理</b><span>盐、糖、油等基础调味品暂不纳入食材篮；需要替换核心食材时，可选择“还差 1–2 样”的菜谱体验。</span></div>
        <div class="sheet-actions"><button class="primary-button" type="button" data-action="close-sheet">返回配料表</button></div>
      `, id);
      return;
    }
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · SUBSTITUTE</div>
      <h2 id="sheet-title">想替换哪样缺少的食材</h2>
      <p class="sheet-lead">替换会说明风味或口感差异；最终安全提醒按实际选用配料重新判断。</p>
      <div class="substitution-picker">
        ${missing.map(({ ingredient }) => `<button type="button" data-action="ai-substitute" data-id="${id}" data-ingredient="${esc(ingredient.id)}"><span><strong>${esc(ingredient.name)}</strong><small>${esc(ingredient.label)}${ingredient.isCore ? " · 核心食材" : ""}</small></span><b>找替代 →</b></button>`).join("")}
      </div>
      <div class="sheet-actions"><button class="ghost-button" type="button" data-action="close-sheet">取消</button></div>
    `, id);
  }

  async function requestSubstitutions(id, ingredientId) {
    const recipe = recipeById(id);
    const missingIngredient = recipe?.ingredients.find((item) => item.id === ingredientId);
    if (!recipe || !missingIngredient) return;
    const catalogItem = catalogForRecipeIngredient(missingIngredient);
    pendingAiRetry = () => requestSubstitutions(id, ingredientId);
    showAiLoading(`DeepSeek 正在为${missingIngredient.name}寻找替代`, "会同时考虑当前忌口设置，并明确风味或口感差异。");
    const result = await services.ai?.suggestSubstitutions?.({
      recipe,
      missingIngredient: { ...missingIngredient, canonicalId: catalogItem?.id || "" },
      preferences: state.preferences
    });
    if (!result?.ok) return showAiError("暂时没有替代建议", result?.error, { fallbackAction: "close-sheet", fallbackLabel: "返回配料表" });
    pendingAiRetry = null;
    pendingSubstitutionSuggestions = (result.data.suggestions || []).filter((suggestion) => catalogById(suggestion.ingredientId));
    openSheet(`
      <div class="sheet-kicker">PHASE 2 · SUBSTITUTE</div>
      <div class="provider-row">${providerBadge(result.meta)}<span>原配料：${esc(missingIngredient.name)}</span></div>
      <h2 id="sheet-title">${pendingSubstitutionSuggestions.length ? "可以考虑这些替代" : "没有足够可靠的替代"}</h2>
      <div class="substitution-results">
        ${pendingSubstitutionSuggestions.map((suggestion, index) => `<div class="substitution-result">
          ${pantryItemImage({ id: suggestion.ingredientId, name: suggestion.name })}
          <span><strong>${esc(suggestion.name)}</strong><small>${esc(suggestion.note)}</small></span>
          <button type="button" data-action="add-substitution" data-index="${index}">加入食材篮</button>
        </div>`).join("") || `<p class="sheet-lead">${esc(result.data.note || "DeepSeek 没有返回通过食材库与忌口校验的替代项。")}</p>`}
      </div>
      <div class="privacy-note"><b>注意</b><span>${esc(result.data.note || "替换会改变传统风味，过敏原仍按实际配料判断。")}</span></div>
      <div class="sheet-actions"><button class="ghost-button" type="button" data-action="close-sheet">关闭</button></div>
    `, id);
  }

  function addSubstitution(index) {
    const suggestion = pendingSubstitutionSuggestions[Number(index)];
    const item = suggestion && catalogById(suggestion.ingredientId);
    if (!item) return;
    if (!state.pantry.some((pantry) => pantry.id === item.id)) state.pantry.push({ id: item.id, name: item.name, custom: false });
    saveState();
    showToast(`${item.name}已加入食材篮`);
  }

  function openStageMap() {
    openSheet(`
      <div class="sheet-kicker">DEVELOPMENT ROADMAP</div>
      <h2 id="sheet-title">阶段二、三已经推进到哪里</h2>
      <p class="sheet-lead">新增能力仍然服务于“根据食材选菜谱”和“根据菜谱选食材”，不会变成独立聊天栏目。</p>
      <div class="stage-timeline">
        <div class="stage-line current"><b>01</b><span><strong>HTML 核心产品</strong><span>找菜、配料、清单、图文烹饪与本地保存</span></span><b>完成</b></div>
        <div class="stage-line current"><b>02</b><span><strong>DeepSeek 联网能力</strong><span>文字录入、推荐解释和替换走 DeepSeek；照片识别由通义千问视觉模型完成</span></span><b>已接入</b></div>
        <div class="stage-line current"><b>03</b><span><strong>互动与数据能力</strong><span>烹饪小游戏、系统分享、数据备份已开放</span></span><b>可体验</b></div>
        <div class="stage-line"><b>网</b><span><strong>公网部署</strong><span>让其他设备使用 AI 必须部署网页与服务端，并在服务器设置 DeepSeek 与通义千问密钥</span></span><b>待上线</b></div>
        <div class="stage-line"><b>微</b><span><strong>微信平台接入</strong><span>登录、云同步和正式小程序仍需 AppID、云环境与审核配置</span></span><b>待配置</b></div>
      </div>
      <div class="sheet-actions"><button class="primary-button" type="button" data-action="close-sheet">继续体验</button></div>
    `);
  }

  function openFeaturePreview(featureId, context) {
    const copy = FEATURE_COPY[featureId];
    if (!copy) return;
    const config = features[featureId] || { phase: featureId === "heritage.story" ? 3 : 2, status: "preview" };
    if (featureId === "cooking.beginnerGame") {
      if (context) navigate(`#/game/${context}`);
      else openGamePreview(context);
      return;
    }
    openSheet(`
      <div class="sheet-kicker">PHASE ${config.phase} · FEATURE PREVIEW</div>
      <h2 id="sheet-title">${copy.title}</h2>
      <p class="sheet-lead">${copy.description}</p>
      <div class="preview-note"><strong>为什么现在不能用：</strong><br>${copy.limitation}</div>
      <div class="sheet-actions">
        <button class="primary-button" type="button" data-action="feature-fallback" data-fallback="${copy.fallback}">${copy.fallbackLabel}</button>
        <button class="ghost-button" type="button" data-action="close-sheet">关闭</button>
      </div>
    `, context);
  }

  function openGamePreview(recipeId) {
    const recipe = recipeById(recipeId) || recipes[0];
    const previewImages = recipe.ingredients.slice(0, 3).map((ingredient) => {
      const catalog = ingredients.find((item) => item.aliases.some((alias) => normalize(ingredient.label).includes(normalize(alias))));
      return catalog ? `<img src="${imageRoot}${catalog.file}" alt="${esc(catalog.name)}">` : "";
    }).join("") || `<img src="${imageRoot}Tomato.png" alt="番茄"><img src="${imageRoot}Eggs.png" alt="鸡蛋">`;
    const copy = FEATURE_COPY["cooking.beginnerGame"];
    openSheet(`
      <div class="sheet-kicker">PHASE 3 · INTERACTIVE PREVIEW</div>
      <h2 id="sheet-title">${copy.title}</h2>
      <p class="sheet-lead">${copy.description}</p>
      <div class="game-preview" aria-label="烹饪小游戏界面预览">
        <div class="game-hint">现在把提示的食材放进锅里。顺序不对也没关系，我会等你。</div>
        <div class="game-stove"></div><div class="game-flame">▲ ▲</div>
        <div class="game-tray">${previewImages}<span style="margin-left:auto;font:9px var(--mono);color:rgba(255,255,255,.6)">低火 · 中火 · 高火</span></div>
      </div>
      <div class="preview-note">${copy.limitation}</div>
      <div class="sheet-actions"><button class="primary-button fire" type="button" data-action="feature-fallback" data-fallback="cook">改用图文教程</button><button class="ghost-button" type="button" data-action="close-sheet">关闭预览</button></div>
    `, recipe.id);
  }

  function openCookModes(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    openSheet(`
      <div class="sheet-kicker">START COOKING</div>
      <h2 id="sheet-title">怎么学习 ${esc(recipe.name)}</h2>
      <p class="sheet-lead">三种学习方式都已保留在烹饪流程中；小游戏是无失败、无惩罚的新手教程。</p>
      <div class="mode-list">
        <button class="mode-card" type="button" data-action="start-cook" data-id="${id}"><span class="mode-icon">文</span><span><strong>分步图文教程</strong><span>大字步骤、三档火力、计时和进度保存</span></span><b style="color:var(--good)">可用</b></button>
        <button class="mode-card" type="button" data-action="douyin-preview" data-id="${id}"><span class="mode-icon">搜</span><span><strong>去抖音搜索教程</strong><span>生成“${esc(recipe.name)} 家常做法”搜索词</span></span><b style="color:var(--good)">可用</b></button>
        <button class="mode-card" type="button" data-action="start-game" data-id="${id}"><span class="mode-icon">玩</span><span><strong>烹饪新手小游戏</strong><span>无关卡、无惩罚，重点练下锅后的顺序与时机</span></span><b style="color:var(--good)">可用</b></button>
      </div>
    `, id);
  }

  function openDouyinPreview(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const query = `${recipe.name} 家常做法 新手教程`;
    openSheet(`
      <div class="sheet-kicker">EXTERNAL SEARCH</div>
      <h2 id="sheet-title">去抖音继续学习</h2>
      <p class="sheet-lead">生成准确搜索词并尝试打开抖音搜索；不会抓取或内嵌未经授权的视频。跳转失败时可以直接复制。</p>
      <div class="preview-note" style="font-size:15px"><strong>建议搜索：</strong><br>${esc(query)}</div>
      <div class="sheet-actions"><button class="primary-button" type="button" data-action="open-douyin" data-query="${esc(query)}">打开抖音搜索</button><button class="ghost-button" type="button" data-action="copy-douyin" data-query="${esc(query)}">复制搜索词</button><button class="ghost-button" type="button" data-action="start-cook" data-id="${id}">改用图文教程</button></div>
    `, id);
  }

  function openDouyinSearch(query) {
    const clean = String(query || "").trim();
    if (!clean) return;
    const url = `https://www.douyin.com/search/${encodeURIComponent(clean)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) copyText(clean, "浏览器阻止了跳转，搜索词已复制");
  }

  function handleFeatureFallback(fallback) {
    const context = sheet.dataset.context;
    closeSheet();
    if (fallback === "pantry") navigate("#/pantry");
    if (fallback === "cook" && context) navigate(`#/cook/${context}`);
  }

  function startTimer(seconds) {
    stopTimer();
    timerRemaining = Math.max(1, Number(seconds) || 60);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timerRemaining -= 1;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        stopTimer(false);
        showToast("这一段时间到了，看看锅里的状态再继续");
      }
    }, 1000);
    showToast("计时开始");
  }

  function updateTimerDisplay() {
    const display = document.getElementById("timer-display");
    if (display) display.textContent = formatClock(Math.max(0, timerRemaining));
  }

  function stopTimer(reset) {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    if (reset !== false) timerRemaining = 0;
  }

  function handleClick(event) {
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      closeSheet();
      navigate(nav.dataset.nav);
      return;
    }
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;

    if (action === "close-sheet") closeSheet();
    else if (action === "open-stage-map") openStageMap();
    else if (action === "back") history.length > 1 ? history.back() : navigate("#/home");
    else if (action === "toggle-pantry") {
      togglePantry(target.dataset.id);
      if (getRoute().name === "pantry") updatePantryPartial();
      else renderApp(true);
    }
    else if (action === "remove-pantry") {
      state.pantry = state.pantry.filter((item) => item.id !== target.dataset.id);
      saveState();
      if (getRoute().name === "pantry") updatePantryPartial();
      else renderApp(true);
    }
    else if (action === "pantry-category") {
      ui.pantryCategory = target.dataset.value;
      document.querySelectorAll("#pantry-categories .chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.value === ui.pantryCategory));
      updatePantryPartial();
    }
    else if (action === "clear-pantry") {
      state.pantry = [];
      saveState();
      updatePantryPartial();
      showToast("食材篮已清空");
    }
    else if (action === "find-recipes") {
      if (!state.pantry.length) showToast("先选择至少一样食材");
      else navigate("#/recommendations");
    }
    else if (action === "recommendation-group") {
      ui.recommendationGroup = target.dataset.value;
      renderApp(true);
    }
    else if (action === "recipe-category") {
      ui.recipeCategory = target.dataset.value;
      document.querySelectorAll("#recipe-categories .chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.value === ui.recipeCategory));
      updateRecipeGrid();
    }
    else if (action === "reset-recipe-filters") {
      ui.recipeQuery = ""; ui.recipeCategory = "全部"; ui.recipeDifficulty = "全部"; ui.recipeTime = "全部";
      renderApp(true);
    }
    else if (action === "open-recipe") navigate(`#/recipe/${target.dataset.id}`);
    else if (action === "toggle-favorite") {
      event.stopPropagation();
      toggleFavorite(target.dataset.id);
      renderApp(true);
      showToast(state.favorites.includes(target.dataset.id) ? "已收藏" : "已取消收藏");
    }
    else if (action === "servings") {
      const recipe = recipeById(target.dataset.id);
      const current = Number(state.servings[target.dataset.id] || recipe.defaultServings);
      state.servings[target.dataset.id] = Math.max(1, Math.min(12, current + Number(target.dataset.delta)));
      saveState();
      renderApp(true);
    }
    else if (action === "add-shopping") addRecipeToShopping(target.dataset.id);
    else if (action === "toggle-shopping") {
      const item = state.shopping.find((entry) => entry.id === target.dataset.id);
      if (item) item.checked = !item.checked;
      saveState(); renderApp(true);
    }
    else if (action === "remove-shopping") {
      state.shopping = state.shopping.filter((entry) => entry.id !== target.dataset.id);
      saveState(); renderApp(true);
    }
    else if (action === "clear-checked-shopping") {
      state.shopping = state.shopping.filter((entry) => !entry.checked);
      saveState(); renderApp(true); showToast("已清除完成项目");
    }
    else if (action === "shopping-to-pantry") shoppingToPantry();
    else if (action === "copy-shopping") copyShoppingText();
    else if (action === "share-shopping") shareShopping();
    else if (action === "open-cook-modes") openCookModes(target.dataset.id);
    else if (action === "start-cook") { closeSheet(); navigate(`#/cook/${target.dataset.id}`); }
    else if (action === "start-game") { closeSheet(); navigate(`#/game/${target.dataset.id}`); }
    else if (action === "douyin-preview") openDouyinPreview(target.dataset.id);
    else if (action === "open-douyin") openDouyinSearch(target.dataset.query);
    else if (action === "copy-douyin") copyText(target.dataset.query, "搜索词已复制");
    else if (action === "share-recipe") shareRecipe(target.dataset.id);
    else if (action === "open-ai-text") openAiTextSheet();
    else if (action === "edit-ai-text") openAiTextSheet(pendingAiInput);
    else if (action === "parse-ai-text") parseAiText();
    else if (action === "retry-ai") retryPendingAi();
    else if (action === "toggle-ai-candidate") toggleAiCandidate(target.dataset.index);
    else if (action === "apply-ai-candidates") applyAiCandidates();
    else if (action === "open-ai-photo") openAiPhotoSheet();
    else if (action === "recognize-ai-photo") recognizeAiPhoto();
    else if (action === "ai-explain") explainRecommendation(target.dataset.id);
    else if (action === "open-substitutions") openSubstitutionPicker(target.dataset.id);
    else if (action === "ai-substitute") requestSubstitutions(target.dataset.id, target.dataset.ingredient);
    else if (action === "add-substitution") addSubstitution(target.dataset.index);
    else if (action === "game-heat") setGameHeat(target.dataset.id, target.dataset.heat);
    else if (action === "game-ingredient") chooseGameIngredient(target.dataset.id, target.dataset.ingredient);
    else if (action === "game-action") submitGameAction(target.dataset.id, target.dataset.gameAction);
    else if (action === "restart-game") restartGame(target.dataset.id);
    else if (action === "export-local-data") exportLocalData();
    else if (action === "open-import-data") openImportData();
    else if (action === "confirm-import-data") confirmImportData();
    else if (action === "cook-next" || action === "cook-prev") {
      stopTimer();
      const recipe = recipeById(target.dataset.id);
      const session = state.cooking[target.dataset.id] || { stepIndex: 0, completed: false };
      session.stepIndex += action === "cook-next" ? 1 : -1;
      session.stepIndex = Math.max(0, session.stepIndex);
      if (session.stepIndex >= recipe.steps.length) session.completed = true;
      state.cooking[target.dataset.id] = session;
      saveState(); renderApp(true);
    }
    else if (action === "restart-cook") {
      state.cooking[target.dataset.id] = { stepIndex: 0, completed: false };
      saveState(); renderApp(true);
    }
    else if (action === "start-timer") startTimer(target.dataset.seconds);
    else if (action === "toggle-preference") {
      const list = state.preferences[target.dataset.group];
      state.preferences[target.dataset.group] = list.includes(target.dataset.id) ? list.filter((id) => id !== target.dataset.id) : [...list, target.dataset.id];
      saveState(); renderApp(true);
    }
    else if (action === "reset-local-data") {
      if (confirm("确定清除食材篮、收藏、采购清单和设置吗？")) {
        state = structuredCloneSafe(defaultState);
        saveState(); renderApp(false); showToast("本机体验数据已重置");
      }
    }
    else if (action === "feature-preview") openFeaturePreview(target.dataset.feature, target.dataset.context || target.dataset.id || "");
    else if (action === "feature-fallback") handleFeatureFallback(target.dataset.fallback);
  }

  function handleInput(event) {
    if (event.target.id === "pantry-search") {
      ui.pantryQuery = event.target.value;
      const grid = document.getElementById("ingredient-grid");
      if (grid) grid.innerHTML = renderIngredientTiles();
    }
    if (event.target.id === "recipe-search") {
      ui.recipeQuery = event.target.value;
      updateRecipeGrid();
    }
    if (event.target.id === "recipe-time") {
      ui.recipeTime = event.target.value;
      updateRecipeGrid();
    }
    if (event.target.id === "recipe-difficulty") {
      ui.recipeDifficulty = event.target.value;
      updateRecipeGrid();
    }
    if (event.target.id === "ai-photo-file") handlePhotoSelection(event.target.files?.[0]);
    if (event.target.id === "backup-file") handleBackupSelection(event.target.files?.[0]);
  }

  function handleSubmit(event) {
    if (event.target.id !== "custom-ingredient-form") return;
    event.preventDefault();
    const input = document.getElementById("custom-ingredient");
    if (addCustomIngredient(input?.value)) {
      input.value = "";
      updatePantryPartial();
      showToast("食材已加入篮中");
    }
  }

  function handleKeyboard(event) {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches('[role="button"][data-action]')) {
      event.preventDefault();
      event.target.click();
    }
  }

  function handleImageError(event) {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    const fallback = image.dataset.fallback;
    if (fallback && image.src !== new URL(fallback, location.href).href) {
      image.src = fallback;
      return;
    }
    image.style.display = "none";
    image.parentElement?.classList.add("image-fallback");
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleInput);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("keydown", handleKeyboard);
  document.addEventListener("error", handleImageError, true);
  window.addEventListener("hashchange", () => renderApp(false));
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) closeSheet();
  });

  if (!location.hash) location.hash = "#/home";
  else renderApp(false);
})(window);
