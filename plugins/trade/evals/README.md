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
| Routing split | `split-*` (generated) | `routing-split/cases.json`, the source of truth; see below |

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

## Routing split (`split-*`)

A labeled set of 60 routing prompts, 46 of them real prompts the user sent, that measures which subcommand each prompt reaches. Don't edit the `split-*/` directories by hand. They are generated from `routing-split/cases.json` (label, prompt, source, and the route the pre-v2.16 skill took in the real session), plus `routing-split/fixtures/` and `routing-split/history/`:

```bash
node plugins/trade/evals/scripts/build-routing-cases.mjs
```

- **Labels follow the current SKILL.md routing rules, not what the old skill did.** Ten of the real prompts were misrouted when they were sent. Cases tagged `judgment-call` have labels the user confirmed on 2026-09-28. Change a label only together with the routing rule it encodes.
- **`route-first`** is a regex that passes only when the **first** `references/commands/*.md` Read is the labeled one. Reading `report.md` and then `daily.md` counts as a misroute. `daily-lookup` shares `daily.md` and adds the `lookup-not-ladder` judge. `menu` passes only when no commands file is read and all five subcommand names appear in the reply.
- **Confusion matrix.** The harness keeps only pass/fail per grader, so run with `--keep-temp`, then run `node plugins/trade/evals/scripts/routing-matrix.mjs <results-dir>`. It reads each run's trace to find the route actually taken, copies the traces into `<results-dir>/traces/`, and writes `routing-matrix.md`, which holds accuracy with a Wilson 95% CI, per-route precision and recall, and the misses.
- **Run it** with `--tag routing-split --scaffold --ablation none --model claude-opus-5-5 --judge-model claude-sonnet-5-5 --runs 2 -j 8 --keep-temp`. Two cases need `--scaffold` to place an @-mentioned PDF. Runs are capped at 12 turns, since routing happens within the first few.
- **Baseline.** `routing-split/baseline/` holds the first full run (skill at 2148b08, Opus 5.5, 2026-09-28): 87% accuracy (104/120, 95% CI 79–92%), $45.62. It includes the traces, so a candidate can be compared without re-running the baseline: `node plugins/trade/evals/scripts/routing-matrix.mjs plugins/trade/evals/routing-split/baseline`. The `split-analysis-17` result predates the fixture fix, when the PDF was still marked as an eval fixture.
- **Noise.** 60 cases × 2 runs gives about ±8 points on accuracy. When comparing two skill versions, look at whether the cases an edit targets move together, not at one or two flips.
