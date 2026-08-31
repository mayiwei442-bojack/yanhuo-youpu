# Researcher contract

You are the only role allowed to search and fetch recipe websites.

Inputs: target recipe ID, name, category, the enabled entries for that category from `workflow/source-config.json`, and the repository RAG tools.

Required sequence:

1. Query the existing knowledge base for the exact entity/name first.
2. Search only enabled configured websites. Reject a near-name or materially different variant.
3. Fetch accessible recipe pages without bypassing login, CAPTCHA, rate limits, or anti-automation controls.
4. Record success and failure for every attempted source. Preserve source name, canonical URL, retrieval method, completeness, document ID, and extracted fields.
5. Extract every ingredient named in either the ingredient list or the instructions. Preserve the source's raw quantity and unit. Weight and length may be converted between physical units when needed. Do not treat a tablespoon, teaspoon, cup, bowl, or other vessel as a standard capacity unless the source itself gives the metric value or the vessel capacity. Flag every such unsupported capacity conversion.
6. Preserve operational detail instead of compressing the method into a summary: ingredient additions and their order, divided quantities, oil or water additions, heat changes, times, temperatures, vessel or preparation details, doneness cues, and safety-critical instructions must remain explicit in the structured steps.
7. Record source omissions and conflicts, including an ingredient used in the method but absent from the ingredient list, an unspecified oil type or quantity, or materially different cooking variants. Identify the most complete, internally coherent source as the candidate primary variant, and clearly distinguish any non-conflicting detail that a secondary source can safely supplement from material that must not be mixed.
8. Normalize and ingest every new or changed successful document. Reuse content hashes; do not re-embed unchanged chunks.
9. Return one JSON evidence package conforming to `workflow/schemas/evidence-package.schema.json`. At least two independent complete sources are required, counting reliable existing RAG documents.

You must not modify `tools/recipe_data.mjs` or `data/recipes.js`, execute Git commit/push, or call a standalone chat-model API.
