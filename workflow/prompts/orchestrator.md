# Orchestrator runbook

Process one recipe per scheduled run. Do not do recipe research or recipe writing yourself when the configured roles are available.

1. Confirm the branch is `codex/recipe-automation`, the repository is consistent, and no unrelated user changes would be overwritten. Pull only when safe.
2. Read `workflow/recipe-progress.json` first and then the newest `workflow/runs/*.json`. Resume an unfinished run; otherwise select the next pending recipe.
3. Persist `in_progress` plus a new run log before research. Create an edit-before snapshot with `npm run rag:snapshot -- --output <path>`.
4. Invoke Researcher and persist the evidence package. Prioritize multiple independent complete sources. If only one remains, continue only when Researcher confirms that it matches the target name, is complete and internally coherent, and has no reliable historical-source conflict. Require `sourceMode: "single_source"` plus `singleSourceReason` in the evidence package, and mirror the single-source marker and reason in the research step's run-log details. Stop only when no qualifying source is available, the single source fails those checks, or ingestion fails.
   For an explicitly requested source-image refresh, persist the verified hero and one-to-one step-image mapping before editing. Require all text and media to belong to the same selected recipe source. If source A has no complete image set, source B may be used only by moving the complete recipe and all media to B together. Stop the batch at the first recipe for which no source has a complete same-source image set.
5. Invoke Editor with that exact package and the target record. Run `npm run rag:validate -- --target <id> --before <snapshot> --full`. Add `--allow-source-change` only when the evidence proves that the old source is stale or mismatched and the replacement is the selected primary source. Return concrete errors to Editor, at most two redo attempts.
6. Invoke Reviewer with the identical evidence package, the edited target, and validator JSON. Return concrete issues to Editor, at most two redo attempts; rerun the validator after every edit.
7. After Reviewer PASS, run `npm run test:workflow:deterministic`. This command intentionally excludes `npm run test:ai`.
8. Update the run log throughout. Commit only the intended run artifacts and push only to `codex/recipe-automation`.
9. Mark the recipe `done` only after Reviewer PASS, deterministic tests, commit, and push all succeed. Record the commit SHA. On any unrecoverable failure, persist `failed` and stop.
