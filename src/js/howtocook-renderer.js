/* Source Markdown is data: escape HTML and resolve images only to copied assets. */
(() => {
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function inline(value) {
    return esc(value)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\([^\s)]+\)/g, "$1");
  }
  window.renderHowToCook = (source) => {
    if (!source?.rawMarkdown) return "";
    const lines = source.rawMarkdown.replace(/\r\n/g, "\n").split("\n");
    let code = null;
    const html = [];
    const lists = [];
    const closeList = () => { const list = lists.pop(); if (list.openItem) html.push("</li>"); html.push(`</${list.tag}>`); };
    const closeLists = () => { while (lists.length) closeList(); };
    for (const line of lines) {
      if (/^\s*```/.test(line)) {
        if (code !== null) { html.push(`<pre style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(code.join("\n"))}</pre>`); code = null; }
        else code = [];
        continue;
      }
      if (code !== null) { code.push(line); continue; }
      if (!line.trim()) continue;
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) { closeLists(); const level = Math.min(6, heading[1].length + 1); html.push(`<h${level}>${inline(heading[2])}</h${level}>`); continue; }
      const image = line.match(/^\s*(?:\d+\.\s*)?!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (image) {
        const asset = source.images?.find((item) => item.originalReference === image[2]);
        if (asset && /^assets\/dishes\/howtocook\//.test(asset.path) && !asset.path.includes("..")) html.push(`<figure><img src="${esc(asset.path)}" alt="${esc(image[1])}" loading="lazy" style="max-width:100%;height:auto"></figure>`);
        else html.push(`<p>${inline(image[1] || "原文图片")}</p>`);
        continue;
      }
      const item = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
      if (item) {
        const indent = item[1].length;
        const tag = /\d/.test(item[2]) ? "ol" : "ul";
        while (lists.length && (lists.at(-1).indent > indent || (lists.at(-1).indent === indent && lists.at(-1).tag !== tag))) closeList();
        if (!lists.length || lists.at(-1).indent < indent) {
          html.push(`<${tag}${tag === "ol" ? ` start="${parseInt(item[2], 10)}"` : ""} style="padding-left:1.5em;list-style:${tag === "ol" ? "decimal" : "disc"}">`);
          lists.push({tag, indent, openItem:false});
        }
        const list = lists.at(-1);
        if (list.openItem) html.push("</li>");
        html.push(`<li style="margin:0.4em 0;overflow-wrap:anywhere">${inline(item[3])}`);
        list.openItem = true;
        continue;
      }
      if (lists.length && line.search(/\S/) <= lists.at(-1).indent) closeLists();
      if (/^>\s?/.test(line)) { html.push(`<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`); continue; }
      html.push(`<p style="white-space:pre-wrap;overflow-wrap:anywhere">${inline(line)}</p>`);
    }
    if (code !== null) html.push(`<pre style="white-space:pre-wrap">${esc(code.join("\n"))}</pre>`);
    closeLists();
    return `<section class="howtocook-original" aria-label="HowToCook 原文">${html.join("\n")}</section>`;
  };
})();
