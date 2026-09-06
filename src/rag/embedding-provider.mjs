const VOYAGE_ENDPOINT = "https://api.voyageai.com/v1/embeddings";
const allowedInputTypes = new Set(["document", "query"]);

function positiveInteger(value, label) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) throw new Error(`${label} 必须是正整数`);
  return parsed;
}

export function resolveEmbeddingConfig(env = process.env) {
  const provider = (env.EMBEDDING_PROVIDER || "voyage").trim().toLowerCase();
  const model = (env.EMBEDDING_MODEL || "voyage-4").trim();
  const dimension = positiveInteger(env.EMBEDDING_DIM || 1024, "EMBEDDING_DIM");
  const apiKey = env.EMBEDDING_API_KEY?.trim();
  if (!apiKey) throw new Error("缺少 EMBEDDING_API_KEY");
  return { provider, model, dimension, apiKey };
}

export function createEmbeddingProvider(config, { fetchImpl = globalThis.fetch } = {}) {
  if (config.provider !== "voyage") throw new Error(`不支持的 embedding provider：${config.provider}`);
  if (typeof fetchImpl !== "function") throw new Error("当前运行环境缺少 fetch");
  const dimension = positiveInteger(config.dimension, "embedding dimension");
  const batchSize = positiveInteger(config.batchSize || 64, "embedding batchSize");

  return {
    provider: config.provider,
    model: config.model,
    dimension,
    version: config.model,

    async embedTexts(texts, { inputType = "document" } = {}) {
      if (!allowedInputTypes.has(inputType)) throw new Error("inputType 必须是 document 或 query");
      if (!Array.isArray(texts) || !texts.length || texts.some((text) => typeof text !== "string" || !text.trim())) {
        throw new Error("embedTexts 需要非空字符串数组");
      }
      const vectors = [];
      for (let offset = 0; offset < texts.length; offset += batchSize) {
        const batch = texts.slice(offset, offset + batchSize);
        const response = await fetchImpl(config.endpoint || VOYAGE_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            input: batch,
            model: config.model,
            input_type: inputType,
            output_dimension: dimension,
            output_dtype: "float"
          })
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(payload?.detail || payload?.message || `Embedding 请求失败（HTTP ${response.status}）`);
        }
        const ordered = [...(payload?.data || [])].sort((a, b) => a.index - b.index);
        if (ordered.length !== batch.length) throw new Error("Embedding 返回数量与输入不一致");
        for (const item of ordered) {
          if (!Array.isArray(item.embedding) || item.embedding.length !== dimension) {
            throw new Error(`Embedding 维度错误：期望 ${dimension}`);
          }
          if (item.embedding.some((value) => typeof value !== "number" || !Number.isFinite(value))) {
            throw new Error("Embedding 包含非法数值");
          }
          vectors.push(item.embedding);
        }
      }
      return vectors;
    }
  };
}

export function createConfiguredEmbeddingProvider({ env = process.env, fetchImpl } = {}) {
  return createEmbeddingProvider(resolveEmbeddingConfig(env), { fetchImpl });
}
