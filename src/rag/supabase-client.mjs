import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export class SupabaseRequestError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = "SupabaseRequestError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function parseEnv(text) {
  const values = {};
  for (const line of text.split(/\r?\n/u)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/iu);
    if (!match) continue;
    values[match[1]] = match[2].replace(/^(['"])(.*)\1$/u, "$2");
  }
  return values;
}

export async function loadRagEnv({ cwd = process.cwd(), env = process.env } = {}) {
  for (const filename of [".env.local", ".env"]) {
    try {
      const values = parseEnv(await readFile(resolve(cwd, filename), "utf8"));
      for (const [key, value] of Object.entries(values)) {
        if (!(key in env)) env[key] = value;
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  return env;
}

export function resolveSupabaseConfig(env = process.env) {
  const url = env.SUPABASE_URL?.trim();
  const key = (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY)?.trim();
  if (!url) throw new Error("缺少 SUPABASE_URL");
  if (!key) throw new Error("缺少 SUPABASE_SECRET_KEY 或 SUPABASE_SERVICE_ROLE_KEY");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.hostname !== "127.0.0.1" && parsed.hostname !== "localhost") {
    throw new Error("SUPABASE_URL 必须使用 HTTPS（本地 Supabase 除外）");
  }
  return { url: parsed.origin, key };
}

function isLegacyJwt(key) {
  return key.startsWith("eyJ") && key.split(".").length === 3;
}

function filterValue(value) {
  if (value === null) return "is.null";
  if (Array.isArray(value)) return `in.(${value.join(",")})`;
  return String(value).includes(".") && /^(eq|neq|gt|gte|lt|lte|like|ilike|fts|plfts|phfts|wfts|is|in|cs|cd|ov)\./u.test(String(value))
    ? String(value)
    : `eq.${value}`;
}

export function createSupabaseClient({ url, key, fetchImpl = globalThis.fetch } = {}) {
  if (!url || !key) throw new Error("createSupabaseClient 需要 url 和 server-only key");
  if (typeof fetchImpl !== "function") throw new Error("当前运行环境缺少 fetch");

  async function request(path, { method = "GET", query, body, prefer } = {}) {
    const endpoint = new URL(`/rest/v1/${path}`, url);
    for (const [name, value] of Object.entries(query || {})) {
      if (value !== undefined && value !== null) endpoint.searchParams.set(name, String(value));
    }
    const headers = {
      apikey: key,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "yanhuo-recipe-automation/0.1"
    };
    if (isLegacyJwt(key)) headers.Authorization = `Bearer ${key}`;
    if (prefer) headers.Prefer = prefer;

    const response = await fetchImpl(endpoint, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const responseText = await response.text();
    let payload = null;
    if (responseText) {
      try {
        payload = JSON.parse(responseText);
      } catch {
        payload = responseText;
      }
    }
    if (!response.ok) {
      const safeMessage = payload?.message || `Supabase 请求失败（HTTP ${response.status}）`;
      throw new SupabaseRequestError(safeMessage, {
        status: response.status,
        code: payload?.code,
        details: payload?.details
      });
    }
    return payload;
  }

  return {
    select(table, { columns = "*", filters = {}, order, limit } = {}) {
      const query = { select: columns };
      for (const [name, value] of Object.entries(filters)) query[name] = filterValue(value);
      if (order) query.order = order;
      if (limit !== undefined) query.limit = limit;
      return request(table, { query });
    },
    insert(table, rows) {
      return request(table, { method: "POST", body: rows, prefer: "return=representation" });
    },
    update(table, values, filters = {}) {
      const query = {};
      for (const [name, value] of Object.entries(filters)) query[name] = filterValue(value);
      return request(table, { method: "PATCH", query, body: values, prefer: "return=representation" });
    },
    delete(table, filters = {}) {
      const query = {};
      for (const [name, value] of Object.entries(filters)) query[name] = filterValue(value);
      return request(table, { method: "DELETE", query, prefer: "return=representation" });
    },
    rpc(functionName, args) {
      return request(`rpc/${functionName}`, { method: "POST", body: args });
    }
  };
}

export async function createConfiguredSupabaseClient(options = {}) {
  const env = await loadRagEnv(options);
  return createSupabaseClient({ ...resolveSupabaseConfig(env), fetchImpl: options.fetchImpl });
}
