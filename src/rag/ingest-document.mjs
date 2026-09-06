import { chunkRecipe } from "./chunker.mjs";
import { normalizeRecipe, normalizedRecipeToText, sha256 } from "./normalize.mjs";
import { createSourceRepository } from "./source-repository.mjs";
import { createRecipeEntityRepository } from "./recipe-entity-repository.mjs";
import { createDocumentRepository } from "./document-repository.mjs";
import { createChunkRepository } from "./chunk-repository.mjs";

export function canonicalWebsiteBaseUrl(url) {
  const parsed = new URL(url);
  if (["douguo.com", "www.douguo.com", "douguo.net", "www.douguo.net"].includes(parsed.hostname)) {
    return "https://www.douguo.com/";
  }
  return `${parsed.origin}/`;
}

function sourceRecord(recipe) {
  return recipe.source.type === "website"
    ? {
        source_type: "website",
        name: recipe.source.name,
        base_url: canonicalWebsiteBaseUrl(recipe.source.url),
        metadata: { retrievalMethod: recipe.source.retrievalMethod }
      }
    : {
        source_type: "book",
        name: recipe.source.name,
        title: recipe.source.bookTitle,
        author: recipe.source.author,
        metadata: {}
      };
}

function documentRecord(recipe, rawText, sourceId, entityId, contentHash) {
  return {
    source_id: sourceId,
    recipe_entity_id: entityId,
    source_type: recipe.source.type,
    recipe_name: recipe.recipeName,
    url: recipe.source.url,
    book_title: recipe.source.bookTitle,
    page_start: recipe.source.pageStart,
    page_end: recipe.source.pageEnd,
    raw_text: rawText,
    normalized_json: recipe,
    content_hash: contentHash,
    retrieved_at: recipe.source.retrievedAt,
    metadata: {
      retrievalMethod: recipe.source.retrievalMethod,
      location: recipe.source.location,
      originalFilePreserved: recipe.source.type === "book"
    }
  };
}

export async function ingestDocument({
  normalizedRecipe,
  rawText,
  client,
  embeddingProvider,
  repositories,
  chunkOptions
}) {
  if (!client && !repositories) throw new Error("ingestDocument 需要 client 或 repositories");
  if (!embeddingProvider) throw new Error("ingestDocument 需要 embeddingProvider");
  const recipe = normalizeRecipe(normalizedRecipe);
  const traceableRawText = typeof rawText === "string" && rawText.trim()
    ? rawText.trim()
    : normalizedRecipeToText(recipe);
  const contentHash = sha256({
    recipeName: recipe.recipeName,
    aliases: recipe.aliases,
    category: recipe.category,
    cuisine: recipe.cuisine,
    summary: recipe.summary,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    technique: recipe.technique,
    tips: recipe.tips,
    source: {
      type: recipe.source.type,
      name: recipe.source.name,
      url: recipe.source.url,
      bookTitle: recipe.source.bookTitle,
      author: recipe.source.author,
      pageStart: recipe.source.pageStart,
      pageEnd: recipe.source.pageEnd,
      ...(recipe.source.location ? { location: recipe.source.location } : {})
    }
  });
  const repos = repositories || {
    sources: createSourceRepository(client),
    entities: createRecipeEntityRepository(client),
    documents: createDocumentRepository(client),
    chunks: createChunkRepository(client)
  };

  const { source } = await repos.sources.getOrCreate(sourceRecord(recipe));
  const { entity } = await repos.entities.getOrCreate(recipe);
  const documentResult = await repos.documents.createIfMissing(
    documentRecord(recipe, traceableRawText, source.id, entity.id, contentHash)
  );
  const existingChunks = documentResult.created ? [] : await repos.chunks.listByDocument(documentResult.document.id);
  const chunks = chunkRecipe(recipe, chunkOptions);
  const existingByIdentity = new Map(existingChunks.map((chunk) => [`${chunk.chunk_type}:${chunk.chunk_index}`, chunk]));
  const chunksAreCurrent = existingChunks.length === chunks.length && chunks.every((chunk) => {
    const existing = existingByIdentity.get(`${chunk.chunk_type}:${chunk.chunk_index}`);
    return existing?.content_hash === chunk.content_hash && existing?.embedding_dim === embeddingProvider.dimension;
  });
  if (chunksAreCurrent) {
    return {
      source,
      entity,
      document: documentResult.document,
      chunks: existingChunks,
      deduplicated: true,
      embedded: false
    };
  }

  const vectors = await embeddingProvider.embedTexts(chunks.map((chunk) => chunk.content), { inputType: "document" });
  const storedChunks = await repos.chunks.replaceForDocument(
    documentResult.document.id,
    chunks.map((chunk, index) => ({
      ...chunk,
      recipe_entity_id: entity.id,
      metadata: { ...chunk.metadata, sourceId: source.id, documentId: documentResult.document.id },
      embedding_model: embeddingProvider.model,
      embedding_version: embeddingProvider.version,
      embedding_dim: embeddingProvider.dimension,
      embedding: vectors[index]
    }))
  );
  return {
    source,
    entity,
    document: documentResult.document,
    chunks: storedChunks,
    deduplicated: false,
    embedded: true
  };
}
