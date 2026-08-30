# Recipe automation boundaries

`D:\OneDrive\桌面\rag\CODEX_RAG_SPEC.md` is the architecture authority for this workflow. Do not substitute services or add infrastructure that the Spec excludes.

For an automated recipe run:

1. Work only on `codex/recipe-automation`; never commit directly to `main`.
2. Read `workflow/recipe-progress.json` and the newest run log before selecting work. Resume an unfinished recipe before choosing another pending recipe.
3. Follow `workflow/prompts/orchestrator.md`. The role contracts are in `workflow/prompts/researcher.md`, `editor.md`, and `reviewer.md`.
4. Researcher is the only role allowed to search or fetch websites. It may only use enabled sources in `workflow/source-config.json`, must not bypass access controls, and must not edit recipe data or use Git.
5. Editor receives the evidence package and current target recipe. It must not browse or query RAG, and may modify only the target record in `tools/recipe_data.mjs`.
6. Reviewer receives the exact same evidence package, edited target, and deterministic validator result. It must not browse, query RAG, edit files, or use Git.
7. Never call DeepSeek, OpenAI Chat Completions, or another standalone chat-model API for the three roles. Do not run `npm run test:ai` in scheduled validation.
8. Never edit `data/recipes.js` directly. Regenerate it with `node tools/build_html_demo_data.mjs`.
9. A recipe is `done` only after Reviewer PASS, deterministic tests PASS, commit succeeds, and push to the automation branch succeeds.
10. Stop and persist the failure if a required source, ingestion, validation, review, build, commit, or push step fails.
