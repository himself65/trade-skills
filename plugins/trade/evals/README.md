# trade evals

Behavioral eval suite for `claude plugin eval`. How to run it and how to compare two skill versions is in the skill README ([`../skills/trade/README.md`](../skills/trade/README.md#evals)). This file covers authoring.

## Layout

Each case is one directory:

- `prompt.md`: the frontmatter sets run limits and tools, and the body is the user turn.
- `graders/*.md`: one check per file.
- `case.yaml`: only when the case needs `context`, meaning a `scaffold_script` or a `history_file`.

Fixtures sit inside the case directory. The agent under test cannot read the eval directory.

| Kind | Cases | Extra files |
|---|---|---|
| Routing | `route-*` | `route-print-lookup/mocks/unusual-whales/`: canned tool answers plus `_tools.json` with the real tool schemas. `route-import-article-link/workspace/` and `scaffold.sh` |
| Pushback | `pushback-*` | `history/*.md`, built into `history.jsonl`, the transcript the case resumes |
| Gates | `gate-*` | `gate-snow-jade-lizard/kb/` and `scaffold.sh` |

## Conventions and traps

- **Grade behavior, not self-report.** Use `tool_used`, `file_exists`, and `regex` on `mock_calls` for what the run actually did. Keep `llm` rubrics to short PASS/FAIL conditions on the final answer, and put the context the judge needs into the rubric itself, because the judge sees only the rubric and the output.
- **Keep each rubric to what the judge must decide.** Check language with the deterministic `replies-in-chinese` regex, not a judge clause. Also write each FAIL clause so it cannot catch behavior the skill requires elsewhere. A clause "FAIL on any path outside `writedowns/`" once failed a correct import reply, because that reply also reported the source copy it filed under `corpora/`. After editing a rubric, replay the judge on saved replies, both good and deliberately bad, before paying for a new run.
- **Routing graders are `arm: with-only`.** They can never pass without the plugin, so in a two-arm run they are reported as indicators. Under `--ablation none` they count toward the score.
- **`input_match` is a regex over the JSON-encoded tool input.** Anchor path checks on `"file_path"`. Otherwise a digest whose body cross-links `references/pitfalls/…` trips a "never write to `references/`" check.
- **`tool_used` matches a tool name exactly**, with no globs. To count calls across several mocked tools, use a `regex` grader with `target: mock_calls`, as `route-print-lookup/graders/within-two-pulls.md` does.
- **Never name a fixture directory `knowledge/`.** The repo `.gitignore` ignores that name at any depth, so the directory would silently never be committed. Store it under another name and copy it in `scaffold.sh`, as `gate-snow-jade-lizard` does with `kb/`.
- **The `trace` is what the child emitted, not everything it saw.** It holds tool calls, tool results and assistant text, plus many `thinking_tokens` events. It does not include the prompt, the resumed history, or an expanded `/command`. So "did the skill load" has to be checked through tool calls (`Skill`, or a `Read` of a reference), never by searching the trace for `SKILL.md` text.
- **An `llm` judge with `focus: trace` sees only the first and last 12 lines**, and in a long run the middle, where a `Write` call usually sits, is elided. Grade content produced mid-run with a `regex` over the trace; a regex sees every line. `route-import-article-link/graders/digest-*.md` are the pattern.
- **Mocked MCP tools are deferred in the child.** The agent loads them through `ToolSearch` first. Those `ToolSearch` calls are not mock calls, so they don't count against a pull budget.
- **Edit a pushback conversation in `history/*.md`, then rebuild the transcript** with `node plugins/trade/evals/scripts/build-history.mjs plugins/trade/evals/<case>`. The pushback prompt starts with `/trade:trade`, the command name a headless run registers, so the resumed turn loads the current `SKILL.md`. Its pushback rule is what these cases measure. A history turn that pasted `SKILL.md` would freeze one version of it into the case. Each run of these cases writes its continued session next to `history.jsonl` as `<session-id>.jsonl`. The repo `.gitignore` covers those files, and runs don't read them back.
- **Validate edits without spending.** `claude plugin eval plugins/trade --scaffold --allow-tools Write Edit --max-cost-usd 0 --no-publish` loads every case (schema, graders, mocks, tool grants) and stops before the first run.
- **Tag cases that pin a specific prompt change** (for example `audit-v2.16`) so `--tag` can rerun just those.
