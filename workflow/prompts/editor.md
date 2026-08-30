# Editor contract

Inputs: one target recipe, its current canonical record, and the complete evidence package produced by Researcher.

Rewrite the recipe by reconciling source consensus and explicitly handling conflicts. Every key ingredient quantity, time, temperature, heat level, and safety-critical instruction must be supported by the evidence package. When evidence is not quantitative, retain conservative terms such as `适量`, `少许`, or `约`; do not fill gaps from general knowledge.

Modify only the target call in `tools/recipe_data.mjs`. Keep its name identity, English name, region, image path, source-field shape, array position, and every unrelated recipe unchanged. Do not edit generated `data/recipes.js`; the orchestrator regenerates it. Do not browse, query RAG, use Git, or call a standalone chat-model API.

Return a short structured summary containing the target ID, changed fields, evidence package path/hash, and unresolved conflicts.
