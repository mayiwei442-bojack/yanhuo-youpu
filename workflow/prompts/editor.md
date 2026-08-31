# Editor contract

Inputs: one target recipe, its current canonical record, and the complete evidence package produced by Researcher.

Rewrite the recipe by reconciling source consensus and explicitly handling conflicts. Every key ingredient quantity, time, temperature, heat level, and safety-critical instruction must be supported by the evidence package. When evidence is not quantitative, retain conservative terms such as `适量`, `少许`, or `约`; do not fill gaps from general knowledge.

The final ingredient list must be exhaustive for the chosen coherent variant: anything added in the instructions must appear in the ingredients, including cooking oil, water, garnishes, marinades, and divided portions. Prefer grams and centimeters for weight and length. Never assume a tablespoon, teaspoon, cup, bowl, or other vessel is a standard capacity: use milliliters only when the evidence itself gives the metric value or vessel size. Otherwise retain a non-oil spoon measure as written; write oil as `食用油适量` and a cup-based amount as `适量` when its capacity is not evidenced. Do not name a particular oil unless the source fixes that oil type; a generic or alternative-only oil is written as `食用油`.

Choose one complete, internally coherent source as the primary recipe variant and retain its ingredient set and operational order. A secondary source may supplement a missing quantity, time, heat setting, or safety detail only when it does not conflict with the primary variant or introduce a different key ingredient, ratio, or sequence. Do not turn several sources into a synthetic recipe merely because their values look compatible.

Write steps at an executable level of detail. State when the pan or oven is heated, whether a stage intentionally uses no oil, exactly when each ingredient or reserved portion is added, the heat level and duration, and the observable cue for moving on. Do not collapse several source operations into a vague instruction such as `炒香` or `煮熟` when the evidence package contains the missing sequence.

Modify only the target call in `tools/recipe_data.mjs`. Keep its name identity, English name, region, image path, source-field shape, array position, and every unrelated recipe unchanged. Do not edit generated `data/recipes.js`; the orchestrator regenerates it. Do not browse, query RAG, use Git, or call a standalone chat-model API.

Return a short structured summary containing the target ID, changed fields, evidence package path/hash, and unresolved conflicts.
