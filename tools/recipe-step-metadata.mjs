function durationMentions(text) {
  return [...String(text).matchAll(/(?<![\d./])(半|\d+(?:\.\d+)?)(?:\s*[–—-]\s*(\d+(?:\.\d+)?))?\s*(小时|分钟|秒)/gu)].map((match) => ({
    index: match.index,
    end: match.index + match[0].length,
    seconds: (match[2] ? Number(match[2]) : match[1] === "半" ? 0.5 : Number(match[1])) * ({ 小时: 3600, 分钟: 60, 秒: 1 })[match[3]]
  }));
}

export function explicitDurationSeconds(text) {
  return durationMentions(text).reduce((sum, item) => sum + item.seconds, 0);
}

export function recipeTotalMinutes(text, stepCount, timing = null) {
  if (timing) {
    if (!Number.isFinite(timing.totalMinutes) || timing.totalMinutes <= 0) throw new Error("来源总时长必须为正数分钟");
    for (const field of ["prepMinutes", "cookMinutes"]) {
      if (timing[field] != null && (!Number.isFinite(timing[field]) || timing[field] < 0)) throw new Error(`来源${field}必须为非负数分钟`);
    }
    return timing.totalMinutes;
  }
  const explicit = explicitDurationSeconds(text) / 60;
  const estimate = explicit || 10 + stepCount * 7;
  return Math.max(15, Math.min(180, Math.ceil(estimate / 5) * 5));
}

export function stepDuration(text) {
  const mentions = durationMentions(text);
  if (!mentions.length) return null;
  // Adjacent units describe one duration, e.g. 1小时30分钟. Separate phases
  // retain their times in the instructions without inventing one timer.
  if (mentions.some((item, index) => index > 0 && String(text).slice(mentions[index - 1].end, item.index).trim())) return null;
  const seconds = mentions.reduce((sum, item) => sum + item.seconds, 0);
  return seconds > 0 ? seconds : null;
}

export function stepHeat(text) {
  const matches = [...String(text).matchAll(/中高火|中低火|小火|低火|中火|大火|高火/gu)].filter((match) => !/(?:不要|避免|不可|不能|不宜|勿|禁止)[^，。；]{0,8}$/u.test(String(text).slice(Math.max(0, match.index - 12), match.index)));
  const values = new Set(matches.map((match) => ({ 小火: "low", 低火: "low", 中火: "medium", 大火: "high", 高火: "high" })[match[0]]));
  return values.size === 1 && !values.has(undefined) ? [...values][0] : null;
}
