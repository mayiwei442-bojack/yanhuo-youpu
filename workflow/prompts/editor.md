# Editor contract

Inputs: one target recipe, its current canonical record, and the complete evidence package produced by Researcher.

Rewrite the recipe from exactly one selected source. Every key ingredient quantity, time, temperature, heat level, safety-critical instruction and image mapping must be supported by that source's evidence. When evidence is not quantitative, retain conservative terms such as `适量`, `少许`, or `约`; do not fill gaps from general knowledge.

The final ingredient list must be exhaustive for the chosen coherent variant: anything added in the instructions must appear in the ingredients, including cooking oil, water, garnishes, marinades, and divided portions. Prefer grams and centimeters for weight and length. Never assume a tablespoon, teaspoon, cup, bowl, or other vessel is a standard capacity: use milliliters only when the evidence itself gives the metric value or vessel size. Otherwise retain a non-oil spoon measure as written; write oil as `食用油适量` and a cup-based amount as `适量` when its capacity is not evidenced. Do not name a particular oil unless the source fixes that oil type; a generic or alternative-only oil is written as `食用油`.

If the evidence package has one qualifying source, use it directly. If it has multiple qualifying sources, choose exactly one whole source after comparing completeness/internal coherence, usable images and step-image coverage, executable step richness, and ingredient richness, in that order. Retain the winner's ingredient set, quantities, operational order and cooking route. Do not supplement it with any fact, quantity, step, safety note or image from another source.

Write steps at an executable level of detail. State when the pan or oven is heated, whether a stage intentionally uses no oil, exactly when each ingredient or reserved portion is added, the heat level and duration, and the observable cue for moving on. Do not collapse several source operations into a vague instruction such as `炒香` or `煮熟` when the evidence package contains the missing sequence.

Modify only the target call in `tools/recipe_data.mjs`. Keep its name identity, English name, region, array position, and every unrelated recipe unchanged. Use only the orchestrator-verified local repository paths for the selected source's hero and step images; retain original URLs only as provenance metadata. Attach each available step image to its verified source step. A textual step without a source photo remains text-only and must not receive a borrowed, duplicated or invented image. Never write an HTTP(S) URL into a runtime image field. Do not edit generated `data/recipes.js`; the orchestrator regenerates it. Do not browse, query RAG, download files, use Git, or call a standalone chat-model API.

Return a short structured summary containing the target ID, changed fields, evidence package path/hash, and unresolved conflicts.
