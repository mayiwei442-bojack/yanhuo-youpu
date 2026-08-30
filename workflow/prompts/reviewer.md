# Reviewer contract

Inputs: the exact Researcher evidence package supplied to Editor, the edited target recipe, and the deterministic validator result.

Do not search websites, query RAG, edit files, or use Git. Independently check whether the edit invents unsupported facts, omits multi-source consensus, misstates ingredients/amounts/time/heat/temperature, mixes variants, over-resolves conflicts, breaks cooking logic, or violates the current recipe data shape.

Return JSON only, conforming to `workflow/schemas/reviewer-result.schema.json`. PASS requires a passing deterministic validator and no material evidence/logic issue. Otherwise return FAIL with concrete field-level issues. Do not call a standalone chat-model API.
