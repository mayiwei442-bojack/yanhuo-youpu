(function initRecipeAssistant(global) {
  "use strict";
  const launcher = document.getElementById("assistant-launcher");
  const panel = document.getElementById("assistant-panel");
  const messages = document.getElementById("assistant-messages");
  const form = document.getElementById("assistant-form");
  const input = document.getElementById("assistant-input");
  const sendButton = document.getElementById("assistant-send");
  let history = [];
  let busy = false;
  let composing = false;

  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "收起菜谱 AI 助手" : "打开菜谱 AI 助手");
    if (open) { input.focus({ preventScroll: true }); messages.scrollTop = messages.scrollHeight; }
    else launcher.focus({ preventScroll: true });
  }

  function updateSend() { sendButton.disabled = busy || !input.value.trim(); }
  function appendMessage(role, content) {
    const message = document.createElement("div");
    message.className = `assistant-message assistant-message-${role}`;
    const label = document.createElement("span");
    label.className = "assistant-message-label";
    label.textContent = role === "user" ? "你" : "菜谱助手";
    const text = document.createElement("p");
    text.className = "assistant-message-content";
    text.textContent = content;
    message.append(label, text);
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function appendSources(message, sources) {
    if (!Array.isArray(sources) || !sources.length) return;
    const list = document.createElement("div");
    list.className = "assistant-sources";
    const label = document.createElement("span");
    label.className = "assistant-sources-label";
    label.textContent = "回答依据";
    list.append(label);
    sources.forEach((source) => {
      const card = document.createElement("div");
      card.className = "assistant-source";
      const name = document.createElement("strong");
      name.textContent = source.recipeName;
      const origin = document.createElement("small");
      const pages = source.pageStart ? ` · 第 ${source.pageStart}${source.pageEnd && source.pageEnd !== source.pageStart ? `–${source.pageEnd}` : ""} 页` : "";
      origin.textContent = `${source.title || "菜谱知识库"}${pages}${source.location ? ` · ${source.location}` : ""}`;
      card.append(name, origin);
      const links = document.createElement("div");
      links.className = "assistant-source-links";
      const names = [source.recipeName, ...(Array.isArray(source.aliases) ? source.aliases : [])];
      const recipe = (global.YANHUO_RECIPES || []).find((item) => names.some((value) => value === item.name || value === item.en));
      if (recipe) {
        const local = document.createElement("a");
        local.href = `#/recipe/${encodeURIComponent(recipe.id)}`;
        local.textContent = recipe.source && recipe.source.replace(/\/$/, "") === String(source.url || "").replace(/\/$/, "")
          ? "查看菜谱 →" : "站内同名菜谱 →";
        local.addEventListener("click", () => setOpen(false));
        links.append(local);
      }
      try {
        const url = new URL(source.url);
        if (["https:", "http:"].includes(url.protocol)) {
          const link = document.createElement("a");
          link.href = url.href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "查看原始资料 ↗";
          links.append(link);
        }
      } catch { /* Books may have a page reference without a public URL. */ }
      card.append(links);
      list.append(card);
    });
    message.append(list);
  }

  async function send(question, addUser = true) {
    if (busy || !question.trim()) return;
    if (!/^https?:$/.test(global.location.protocol)) {
      appendMessage("assistant", "请通过网站或本地服务器打开页面后使用菜谱助手。");
      return;
    }
    busy = true;
    input.value = "";
    updateSend();
    document.getElementById("assistant-welcome")?.remove();
    if (addUser) appendMessage("user", question);
    const pending = appendMessage("assistant", "正在查找菜谱资料，请稍候……");
    pending.classList.add("assistant-message-loading");
    messages.setAttribute("aria-busy", "true");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55000);
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: question, history }),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok || typeof result.data?.answer !== "string") {
        const safeMessages = {
          RATE_LIMITED: "问得有点快，稍等片刻再试。",
          AI_TIMEOUT: "这次查询时间较长，请稍后重试。",
          RAG_UNAVAILABLE: "暂时无法查询菜谱知识库，请稍后重试。"
        };
        throw new Error(safeMessages[result?.error?.code] || "菜谱助手暂时无法回答，请稍后重试。");
      }
      pending.querySelector(".assistant-message-content").textContent = result.data.answer;
      appendSources(pending, result.data.sources);
      history = [...history, { role: "user", content: question }, { role: "assistant", content: result.data.answer }].slice(-8);
    } catch (error) {
      pending.querySelector(".assistant-message-content").textContent = error.name === "AbortError"
        ? "这次查询时间较长，请稍后重试。" : error.message === "Failed to fetch"
          ? "网络连接失败，请检查网络后重试。" : error.message;
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "assistant-retry";
      retry.textContent = "重新查询";
      retry.addEventListener("click", () => {
        if (busy) return;
        pending.remove();
        send(question, false);
      });
      pending.append(retry);
    } finally {
      clearTimeout(timer);
      busy = false;
      pending.classList.remove("assistant-message-loading");
      messages.setAttribute("aria-busy", "false");
      updateSend();
      messages.scrollTop = messages.scrollHeight;
    }
  }

  launcher.addEventListener("click", () => setOpen(panel.hidden));
  document.getElementById("assistant-close").addEventListener("click", () => setOpen(false));
  input.addEventListener("input", updateSend);
  input.addEventListener("compositionstart", () => { composing = true; });
  input.addEventListener("compositionend", () => { composing = false; });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing && !composing && event.keyCode !== 229) {
      event.preventDefault();
      if (!sendButton.disabled) form.requestSubmit();
    }
  });
  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
  });
  form.addEventListener("submit", (event) => { event.preventDefault(); send(input.value.trim()); });
  panel.querySelectorAll(".assistant-prompts button").forEach((button) => {
    button.addEventListener("click", () => send(button.textContent));
  });
})(window);
