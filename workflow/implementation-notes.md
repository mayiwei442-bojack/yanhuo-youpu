# RAG implementation notes

## 2026-08-30 — Phase 1

- `CODEX_RAG_SPEC.md` was supplied at `D:\OneDrive\桌面\rag\CODEX_RAG_SPEC.md`, while the actual Git repository is `C:\Users\myw\Documents\做饭`. The external file is treated as the authoritative Spec; Phase 1 does not relocate or rewrite it.
- The existing canonical recipe records contain compact `ingredients` and numbered `steps` strings. Phase 1 derives workflow state from those records without changing their shape or touching generated `data/recipes.js` by hand.
- The existing `npm run test:all` includes an AI integration test backed by a local mock server. Scheduled RAG validation will still use a separate deterministic command so it cannot accidentally call a configured chat-model endpoint.
- Local Supabase configuration currently uses the newer `SUPABASE_SECRET_KEY` name while the Spec names `SUPABASE_SERVICE_ROLE_KEY`. Phase 2 accepts either server-only variable and never exposes either key to browser code.
- EPUB processing remains after the website ingestion path, in the Spec's Phase 8 order. The supplied book is preserved unchanged at its original path.

## 2026-08-30 — Phase 2 / 3

- Applied `001_rag_base.sql` and `002_rag_vector_index.sql` to the existing `yanhuo-youpu` Supabase project. The four knowledge-base tables are server-only, have RLS enabled, and expose no `anon` / `authenticated` table privileges.
- The server client supports the configured modern `SUPABASE_SECRET_KEY` and the Spec's legacy `SUPABASE_SERVICE_ROLE_KEY` name. Neither is browser code or URL data.
- Douguo is registered under one canonical website source, `https://www.douguo.com/`. Future ingestion maps both `.com` and legacy `.net` detail URLs to that source while retaining each document's original URL for provenance.
- Voyage is behind an adapter and uses `voyage-4`, explicit `document` / `query` input types, and fixed 1024-dimensional float vectors.
- Document deduplication uses normalized content hashes. Chunk reuse also verifies expected type/index/content hash and vector dimension, so a changed chunker can safely rebuild stale chunks.
- All five chunk types are materialized. When a source omits technique or tips, the chunk states that the original did not specify the field; it does not invent culinary content.

## 2026-08-30 — Phase 4

- The first live tomato-and-egg attempt had only one accessible source and was preserved as a FAIL report. After correcting the Douguo configured-site search path, the next run passed with The Woks of Life and Douguo, ten chunks, two independent sources, and semantic plus hybrid retrieval.

## 2026-08-30 — Phase 5 / 6

- Role behavior is enforced primarily by repository prompts and JSON schemas. The `.codex/agents/*.toml` files are deliberately small role metadata; desktop Scheduled Task activation is not claimed as validated by those files alone.
- Scheduled deterministic validation excludes `npm run test:ai`. The workflow calls the local browser test and build entry points directly so Windows does not need to spawn `npm.cmd` from the validator.
- The normal automation validator remains one-target-only. `validate-recipe-batch.mjs` exists only for the user's explicitly requested five-recipe seed batch and proves that exactly the allowlisted five changed while validating each target in isolation.

## 2026-08-30 — Phase 7

- The repository is already on the required long-lived `codex/recipe-automation` branch. The orchestrator runbook processes one recipe, resumes incomplete state, bounds Editor retries, stops on failure, and does not run paid chat-model tests.
- The Spec recommends daily scheduling but gives no execution time. No desktop automation was activated without that user choice; activation remains the final operational switch after this seed batch is pushed.

## 2026-08-30 — Phase 8 / initial seed batch

- The supplied EPUB has no stable printed page numbers. Book provenance therefore keeps `page_start` / `page_end` null and records the exact XHTML `entry#anchor`, while preserving the original EPUB unchanged outside the repository.
- The EPUB and current project have six exact-name overlaps. Five were selected for canonical updates: `cn-010`, `cn-024`, `cn-027`, `cn-036`, and `cn-054`.
- Book-only selection uses seed `20260830` after an eligibility filter requiring an exact, accessible match on a configured website. `墨鱼干炒肉丝` was rejected because configured sites only exposed materially named variants; `栗子焖鸡` was the next eligible item.
- Douguo changed only a dynamic SEO summary between two test fetches of 锅包肉. The precisely identified older incomplete test document was removed; after retiring the removed website records, the retained seed result is exactly 10 entities, 18 documents, 90 chunks, 90 stored 1024-dimensional vectors, and 50 entity/chunk-type combinations.

## 2026-08-30 — Phase 8 full EPUB ingestion

- The supplied EPUB contains 80 uniquely anchored recipes. All 80 passed deterministic structural extraction; 10 existing book documents were deduplicated and 70 new documents were embedded with `voyage-4`.
- The retained book source now has 80 documents and 400 chunks, with 80 chunks for each fixed chunk type and 400 stored 1024-dimensional vectors. The EPUB has no fixed printed page numbers, so every document retains its exact XHTML `entry#anchor` location instead.
- Some recipe introductions contain the word `做法` before the ingredient list. The extractor now searches for the actual method marker only after `用料`, preventing the introduction from being mistaken for the start of the steps.

## 2026-08-30 — ten-recipe website RAG batch

- Before this run, project state contained 90 recipes: 5 `done` seed recipes and 85 `pending`. This batch selected 10 of the pending recipes for RAG-only ingestion; it did not edit `tools/recipe_data.mjs`, regenerate recipe content, or advance their workflow state.
- The final targets are `宫保鸡丁`, `麻婆豆腐`, `鱼香肉丝`, `红烧肉`, `干煸四季豆`, `凯撒沙拉`, `法式洋葱汤`, `意式培根蛋面`, `千层面`, and `牧羊人派`. Each has two complete independent website documents and all five fixed chunk types.
- The batch retained exactly 20 documents and 107 `voyage-4` / 1024-dimensional chunks. Entity-scoped semantic and hybrid retrieval both returned 10 diversified results from two sources for every target.
- `炸鱼薯条` was initially considered but rejected because Serious Eats did not expose a complete exact target page. It was replaced by `千层面`; the one temporary BBC document, its six chunks, and its now-empty entity were deleted after exact-ID guards, while the shared BBC source remained.
- Direct programmatic requests to Serious Eats returned HTTP 402/403, while its public page reader was available to the Researcher. Later repeat requests to Douguo returned HTTP 403 and one older red-braised-pork candidate returned HTTP 404. No access control was bypassed, and failed candidates were not treated as complete evidence.
