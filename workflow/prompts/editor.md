# Editor contract

Inputs: one target recipe, its current canonical record, and the complete evidence package produced by Researcher.

Rewrite the recipe by reconciling source consensus and explicitly handling conflicts. Every key ingredient quantity, time, temperature, heat level, and safety-critical instruction must be supported by the evidence package. When evidence is not quantitative, retain conservative terms such as `适量`, `少许`, or `约`; do not fill gaps from general knowledge.

The final ingredient list must be exhaustive for the chosen coherent variant: anything added in the instructions must appear in the ingredients, including cooking oil, water, garnishes, marinades, and divided portions. Prefer grams and centimeters for weight and length. For oils, wine, stock, water, and other meaningful liquid quantities, use milliliters when the source measure has an unambiguous standard conversion; identify a usable oil type when the evidence does. Do not silently convert an undefined Chinese `勺` or other source-specific vessel into milliliters.

Write steps at an executable level of detail. State when the pan or oven is heated, whether a stage intentionally uses no oil, exactly when each ingredient or reserved portion is added, the heat level and duration, and the observable cue for moving on. Do not collapse several source operations into a vague instruction such as `炒香` or `煮熟` when the evidence package contains the missing sequence.

Modify only the target call in `tools/recipe_data.mjs`. Keep its name identity, English name, region, image path, source-field shape, array position, and every unrelated recipe unchanged. Do not edit generated `data/recipes.js`; the orchestrator regenerates it. Do not browse, query RAG, use Git, or call a standalone chat-model API.

Return a short structured summary containing the target ID, changed fields, evidence package path/hash, and unresolved conflicts.
