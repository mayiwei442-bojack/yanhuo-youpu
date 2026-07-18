(function initYanhuoApp(global) {
  "use strict";

  const recipes = Array.isArray(global.YANHUO_RECIPES) ? global.YANHUO_RECIPES : [];
  const ingredients = Array.isArray(global.YANHUO_INGREDIENTS) ? global.YANHUO_INGREDIENTS : [];
  const features = global.YANHUO_FEATURES || {};
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
      description: "以后可以直接输入“两个番茄、三个鸡蛋和半颗洋葱”，由 AI 整理为可确认的食材清单。",
      limitation: "当前 Demo 没有连接大模型服务，不会把文字发送到远程接口。",
      fallbackLabel: "先手动选择食材",
      fallback: "pantry"
    },
    "ai.ingredientVision": {
      title: "AI 食材照片识别",
      description: "以后可以拍下桌面或冰箱里的食材，AI 给出候选名称和置信度，再由用户确认。",
      limitation: "当前 Demo 不申请相机权限，也不会选择或上传照片。",
      fallbackLabel: "从食材库选择",
      fallback: "pantry"
    },
    "ai.recommendationExplanation": {
      title: "AI 深度推荐解释",
      description: "以后会结合口味、时间和现有食材，用自然语言解释推荐理由。",
      limitation: "当前展示的是可检查的本地匹配依据，核心推荐功能不受影响。",
      fallbackLabel: "继续查看规则说明",
      fallback: "close"
    },
    "ai.substitutionSuggestion": {
      title: "AI 食材替换建议",
      description: "以后会从风味、口感、饮食需求和应急替换四个角度给出候选，并说明与传统做法的差异。",
      limitation: "当前没有连接 AI，避免给出未经核验的替换结论。",
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
    if (route.name !== "cook") stopTimer();
    document.body.classList.toggle("cooking-mode", route.name === "cook");
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
      me: renderMe
    };
    const renderer = renderers[route.name] || renderNotFound;
    view.innerHTML = renderer();
    document.title = titleForRoute(route);
    if (changed && !preserveScroll) window.scrollTo({ top: 0, behavior: "auto" });
  }

  function titleForRoute(route) {
    if (route.name === "recipe" || route.name === "cook") {
      const recipe = recipeById(route.id);
      return recipe ? `${recipe.name}｜烟火有谱` : "烟火有谱";
    }
    const names = {
      home: "今天吃什么",
      pantry: "我的食材篮",
      recommendations: "现在能做什么",
      recipes: "菜谱库",
      shopping: "采购清单",
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
            <strong>阶段一核心体验已开放</strong>
            <small>AI、小游戏和小程序能力保留入口，后续接入</small>
          </span>
          <span class="stage-tag">查看阶段图</span>
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
          <button class="feature-shortcut" type="button" data-action="feature-preview" data-feature="ai.ingredientNlp">
            <span>阶段二 · 预览</span>
            <strong>用一句话录入食材</strong>
          </button>
          <button class="feature-shortcut" type="button" data-action="feature-preview" data-feature="ai.ingredientVision">
            <span>阶段二 · 预览</span>
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
            <div class="eyebrow">MATCH / 本地规则匹配</div>
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
            <button class="small-button ai" type="button" data-action="feature-preview" data-feature="ai.recommendationExplanation">AI 深度解释 · 预览</button>
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
          <button class="secondary-button wide-button" style="margin-top:12px" type="button" data-action="feature-preview" data-feature="ai.substitutionSuggestion">AI 找替代食材 · 功能预览</button>

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
          <button class="feature-row wide-button" type="button" data-action="feature-preview" data-feature="platform.wechatShare">
            <span class="feature-icon">享</span><span><strong>微信分享采购清单</strong><span>小程序阶段生成分享卡片</span></span><b>阶段三</b>
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
          <span style="font:10px var(--mono);color:rgba(255,255,255,.62)">图文教程 · 阶段一</span>
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

  function renderMe() {
    const completed = Object.values(state.cooking).filter((item) => item.completed).length;
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

        <div class="section-head"><h2>饮食设置</h2><span>本地规则 · 可解释</span></div>
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

        <div class="section-head"><h2>后续能力</h2><span>入口与接口已预留</span></div>
        <div class="feature-list">
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="account.login"><span class="feature-icon">登</span><span><strong>微信登录</strong><span>不登录也能完整使用阶段一</span></span><b>阶段三</b></button>
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="cloud.sync"><span class="feature-icon">云</span><span><strong>跨设备云同步</strong><span>收藏、清单和烹饪进度</span></span><b>阶段三</b></button>
          <button class="feature-row" type="button" data-action="feature-preview" data-feature="platform.wechatMiniProgram"><span class="feature-icon">微</span><span><strong>微信小程序版本</strong><span>最终产品形态与平台能力</span></span><b>阶段三</b></button>
        </div>

        <div class="section-head"><h2>项目与数据</h2></div>
        <a class="legacy-link" href="legacy/registration-demo.html" target="_blank" rel="noopener"><span>查看报名阶段历史页面</span><b>↗</b></a>
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
    const text = ["烟火有谱｜采购清单", ...state.shopping.map((item) => `${item.checked ? "✓" : "□"} ${item.name}（${item.label}）`)].join("\n");
    copyText(text, "采购清单已复制");
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
  }

  function openStageMap() {
    openSheet(`
      <div class="sheet-kicker">DEVELOPMENT ROADMAP</div>
      <h2 id="sheet-title">哪些已经能用，哪些以后再做</h2>
      <p class="sheet-lead">当前时间优先用在两条核心主线上。后续功能的入口、状态和接口已经保留，但不会伪装成已经完成。</p>
      <div class="stage-timeline">
        <div class="stage-line current"><b>01</b><span><strong>HTML 核心 Demo</strong><span>找菜、配料、清单、图文烹饪与本地保存</span></span><b>可体验</b></div>
        <div class="stage-line"><b>02</b><span><strong>AI 能力增强</strong><span>自然语言、照片识别、推荐解释、替换建议</span></span><b>已预留</b></div>
        <div class="stage-line"><b>03</b><span><strong>小游戏与小程序</strong><span>新手互动教程、登录同步、微信分享与发布</span></span><b>已预留</b></div>
      </div>
      <div class="sheet-actions"><button class="primary-button" type="button" data-action="close-sheet">继续体验阶段一</button></div>
    `);
  }

  function openFeaturePreview(featureId, context) {
    const copy = FEATURE_COPY[featureId];
    if (!copy) return;
    const config = features[featureId] || { phase: featureId === "heritage.story" ? 3 : 2, status: "preview" };
    if (featureId === "cooking.beginnerGame") {
      openGamePreview(context);
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
      <p class="sheet-lead">图文教程现在可用；抖音搜索和小游戏保留为后续能力。</p>
      <div class="mode-list">
        <button class="mode-card" type="button" data-action="start-cook" data-id="${id}"><span class="mode-icon">文</span><span><strong>分步图文教程</strong><span>大字步骤、三档火力、计时和进度保存</span></span><b style="color:var(--good)">可用</b></button>
        <button class="mode-card preview" type="button" data-action="douyin-preview" data-id="${id}"><span class="mode-icon">搜</span><span><strong>去抖音搜索教程</strong><span>生成“${esc(recipe.name)} 家常做法”搜索词</span></span><b>预览</b></button>
        <button class="mode-card preview" type="button" data-action="feature-preview" data-feature="cooking.beginnerGame" data-context="${id}"><span class="mode-icon">玩</span><span><strong>烹饪新手小游戏</strong><span>无关卡、无惩罚，重点练下锅后的顺序与时机</span></span><b>阶段三</b></button>
      </div>
    `, id);
  }

  function openDouyinPreview(id) {
    const recipe = recipeById(id);
    if (!recipe) return;
    const query = `${recipe.name} 家常做法 新手教程`;
    openSheet(`
      <div class="sheet-kicker">EXTERNAL SEARCH · PREVIEW</div>
      <h2 id="sheet-title">去抖音继续学习</h2>
      <p class="sheet-lead">正式版本会在平台能力与审核规则确认后跳转搜索。当前先生成准确搜索词，不抓取或内嵌未授权视频。</p>
      <div class="preview-note" style="font-size:15px"><strong>建议搜索：</strong><br>${esc(query)}</div>
      <div class="sheet-actions"><button class="primary-button" type="button" data-action="copy-douyin" data-query="${esc(query)}">复制搜索词</button><button class="ghost-button" type="button" data-action="start-cook" data-id="${id}">改用图文教程</button></div>
    `, id);
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
    else if (action === "open-cook-modes") openCookModes(target.dataset.id);
    else if (action === "start-cook") { closeSheet(); navigate(`#/cook/${target.dataset.id}`); }
    else if (action === "douyin-preview") openDouyinPreview(target.dataset.id);
    else if (action === "copy-douyin") copyText(target.dataset.query, "搜索词已复制");
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
