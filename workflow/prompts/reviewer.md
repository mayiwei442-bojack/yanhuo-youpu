# Reviewer contract

Inputs: the exact Researcher evidence package supplied to Editor, the edited target recipe, and the deterministic validator result.

Do not search websites, query RAG, edit files, or use Git. Independently check whether the edit invents unsupported facts, misstates ingredients/amounts/time/heat/temperature, mixes sources or variants, breaks cooking logic, or violates the current recipe data shape. Also fail a recipe when an instruction uses an ingredient absent from the ingredient list; converts a spoon, cup, bowl, or vessel to milliliters without source-provided capacity; names an oil type not fixed by the selected source; or omits the selected source's supported addition order, heat, time, divided quantity, no-oil stage, or doneness cue needed to execute it reliably. For a multi-source package, confirm that Editor selected one whole source by the required ranking and imported no detail from the others.

For source images, fail when the hero is missing, there is no mapped step image, a mapped image does not match its source step, any runtime image field is an HTTP(S) URL, a referenced local asset is missing/empty, provenance is absent, or text and media come from different sources/variants. Do not fail merely because a complete textual step has no source photo; instead confirm that it remains text-only and no other image was duplicated into it.

Return JSON only, conforming to `workflow/schemas/reviewer-result.schema.json`. PASS requires a passing deterministic validator and no material evidence/logic issue. Otherwise return FAIL with concrete field-level issues. Do not call a standalone chat-model API.
