# Trade

Multi-leg options trading assistant — concrete strikes, IV-aware structures, probability-weighted scenarios. Single skill with five subcommands, modeled on the [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) pattern.

## Commands

```
/trade setup                           # scaffold a personal knowledge directory
/trade import <file_path | url>        # parse one PDF / screenshot / text artifact into YAML, or digest shared research
/trade report [tickers | basket]       # today's capital-flow read
/trade daily <ticker>                  # one-name daily read — blocks, volume, IV, GEX + max pain → named state
/trade analysis [ticker | situation]   # default — trade analysis flow
/trade <natural language>              # any unrecognized first word routes to analysis
```

Each subcommand has its own reference file under `references/commands/`. The main `SKILL.md` carries always-on context (Hard Rules, Response Rules, Core Principles, the structure-selection rule) plus the routing logic.

## Triggers

- Trade analysis requests, options strategy recommendations, post-mortems
- Mentions of multi-leg structures: Jade Lizard, bull put / bear call spread, iron condor, diagonal, calendar
- Earnings positioning, IV / IV crush, channel checks, AH price action
- Any single-stock options play in a US-equity context
- Personal-knowledge management: "save this substack post", "parse this tweet screenshot", "set up my trade knowledge"

Full trigger list in the `description` field of `SKILL.md`.

## Platform

**CLI only** — **tier 0 (optional): Unusual Whales**, used directly when the user has a subscription, for options flow, dark pool, dealer GEX, IV rank and intraday net-premium ticks (see `references/unusual-whales.md`); then the headless TradingView MCP (`finance-data-providers:tradingview-mcp`, bundled server, no app/login); TradingView desktop reader (`finance-data-providers:tradingview-reader`) for watchlists / alerts / chart screenshots; Funda AI API (`finance-data-providers:funda-data`) for fundamentals, transcripts, supply chain, sentiment, and as the options flow / GEX fallback.

## Setup

1. Install the [`finance-skills`](https://github.com/himself65/finance-skills) plugin marketplace and the `finance-data-providers:tradingview-mcp`, `finance-data-providers:tradingview-reader`, and `finance-data-providers:funda-data` skills (the `finance-data-providers` plugin bundles the [tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) server — requires `uv`).
2. Set the Funda API key (read from repo-root `.env` so worktrees inherit):
   ```bash
   export FUNDA_API_KEY="your-funda-api-key"
   ```
3. (Optional) If you have an [Unusual Whales](https://unusualwhales.com/public-api) API subscription, set the key — the skill then uses UW directly as tier 0 for flow / dark pool / GEX / IV rank:
   ```bash
   export UNUSUAL_WHALES_API_KEY="your-uw-api-key"
   ```
   Or wire up their MCP server instead:
   ```bash
   claude mcp add --transport http unusual-whales https://api.unusualwhales.com/api/mcp --header "Authorization: Bearer $UNUSUAL_WHALES_API_KEY"
   ```
   Without either, this tier is skipped and options flow falls back to Funda.
4. (Optional) Run `/trade setup` once to scaffold a personal knowledge directory for substack posts, X / twitter threads, and writedowns.

## Reference Files

### Always-relevant frameworks

| File | Description |
|---|---|
| `references/strategies.md` | Structure-to-regime matching, LEAPS stock replacement, setup checklist, position management |
| `references/gamma-framework.md` | Dealer GEX + options chain + IV term + flow → multi-factor probability map |
| `references/price-action-framework.md` | Orderbook microstructure mental model — buy/sell imbalance, vacuum zones, consensus shifts |
| `references/macro-framework.md` | Macro judgment pipeline — pricing before forecasting, marginal driver, micro-to-macro, second derivative, cross-asset confirmation, expression & sizing; 8 dashboard families + 8 output modes (morning note / EOD review / weekly / monthly …) |
| `references/overnight-futures-framework.md` | Overnight index-futures attribution — session clock, three-complex divergence read, catalyst clock |
| `references/parent-order-flow-framework.md` | Parent-order net-flow × vol × trend state matrix — accumulation / momentum / distribution / absorption / covert distribution |
| `references/unusual-whales.md` | Data Access tier 0 — direct Unusual Whales access when subscribed: availability gate, MCP + REST auth, endpoint map, entitlement gaps, field traps |

### Subcommand references (lazy-loaded by the router)

| File | Subcommand |
|---|---|
| `references/commands/setup.md` | `/trade setup` workflow |
| `references/commands/import.md` | `/trade import` workflow (raw artifact → YAML; shared research → writedown digest) |
| `references/commands/report.md` | `/trade report` workflow (daily capital-flow read) |
| `references/commands/daily.md` | `/trade daily` workflow (one-name daily state read ending in a named composite state + falsification signposts) |
| `references/commands/analysis.md` | Default analysis preflight + situation → reference map |

### Lazy-loaded library

| File | Description |
|---|---|
| `references/pitfalls/index.md` | Index of 37 trading pitfalls (severity-tagged, lookup by trade type) |
| `references/pitfalls/NN-*.md` | One file per pitfall — loaded only when relevant |
| `references/ticker/index.md` | Index of closed trade case studies |
| `references/ticker/<name>.md` | One file per case study (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX, SATS, 6981, MU, NQ, NBIS, BE) |

### Templates (used by `/trade setup`)

| File | Copied to |
|---|---|
| `references/commands/templates/knowledge-index.md` | `<knowledge>/index.md` |
| `references/commands/templates/knowledge-README.md` | `<knowledge>/README.md` |
| `references/commands/templates/substack-template.yaml` | `<knowledge>/substack/_template.yaml` |
| `references/commands/templates/twitter-template.yaml` | `<knowledge>/twitter/_template.yaml` |
| `references/commands/templates/writedown-template.md` | `<knowledge>/writedowns/_template.md` |

## Coverage

- 37 analytical and risk-management pitfalls covering consensus anchoring, flow misreading, multi-leg block-flow contamination, IV crush traps, T+1 reverse drift, LEAPS vega tax, manipulator-tape recognition, channel-check sample bias, AH order-book fades, demand-IV vs event-IV, vega-axis sanity checks, retest entry confirmation, macro-right/trade-wrong, second-derivative reading, stop-distance-determines-size, daily-loss-limit / drawdown governors, mechanical (corporate-action) volume, IV Rank vs the variance risk premium, IV-floor ramp trades, and more.
- 15 detailed case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX, SATS, 6981, MU, NQ, NBIS, BE) showing thesis evolution, structure selection, and post-mortem lessons.
- Structure-to-regime table (`references/strategies.md`) covering high/low IV regimes paired with directional / neutral / manipulator-tape views, plus the bull-conviction count and banned-structure list.
- Personal-knowledge layer for the user's own substack / X / writedown collection, auto-loaded on every analysis.

## Evals

The repo includes a small behavioral suite for [`claude plugin eval`](https://code.claude.com/docs/en/plugin-evals) (Claude Code 2.1.269+) in [`plugins/trade/evals/`](../../evals/). It lets you measure a prompt edit, such as the v2.16.0 prompt audit, instead of judging it by eye. The suite is not part of the release zip, so changing it never needs a version bump.

| Case | What it checks |
|---|---|
| `route-daily-block-check` | "NBIS 今天有没有大单" loads `daily`. The reply answers the literal question first and invents no numbers without a data source |
| `route-print-lookup` | "刚才那笔巨量成交是什么" is a lookup. It takes at most two data pulls, identifies the print, and offers the daily ladder without running it |
| `route-report-capital-flow` | "COHR LITE MU 资金流向" loads `report` and states the options-flow proxy basis (口径) |
| `route-import-article-link` | A research link to save becomes an English writedown in the knowledge dir that `knowledge_path` names. Nothing is written under `references/` |
| `route-link-with-trade-question` | Control: a link plus a trade question stays in `analysis`, and nothing is imported |
| `pushback-wrong-claim-hold` | A wrong pushback ("high IV rank, so buy calls") is held, with evidence |
| `pushback-right-claim-update` | A correct pushback (IV floor plus a catalyst, so long vega) produces an update that says what changed |
| `gate-snow-jade-lizard` | The bull-conviction count and the P/L matrix come before any structure, and there is no Jade Lizard at a count of 4 or more. The user's notes are loaded and `corpora/` is not |
| `gate-sell-put-high-ivr` | A put sale is not approved on IV rank alone. The VRP gate (pitfall 36) runs first |

Graders check what the run did (which reference files it read, which tools it called, which files it wrote) and the shape of the final answer, which a judge model scores against PASS/FAIL rubrics. No case touches real market data. Runs are sandboxed without your MCP servers or API keys, and the one-print lookup gets its answers from a mocked `unusual-whales` server with canned prints.

### Run the suite

From the repository root:

```bash
claude plugin eval plugins/trade --scaffold --allow-tools Write Edit --ablation none --no-publish
```

- `--scaffold` runs the two fixture scripts. They copy files from their case directory into the run's workspace: a knowledge dir, plus a stand-in checkout of this repo for the import case.
- `--allow-tools Write Edit` lets the import case write its digest. Writes stay inside each run's workspace. Without this flag the import case cannot pass, and the link control's "nothing written" check passes trivially.
- `--ablation none` runs only the with-plugin arm, which is 27 agent runs at the default of 3 runs per case. Drop the flag to add the no-plugin baseline and report Δ (48 runs). The pushback cases resume a transcript, so they always run one arm.
- To iterate cheaply, use `--case route-print-lookup --runs 1`, or `--tag audit-v2.16` for the six cases that pin the audit's behavior changes.
- Pin the model when you compare runs over time (`--model claude-opus-5-5`). The default judge is Haiku; consider `--judge-model sonnet` for the pushback and gate rubrics.
- `--max-cost-usd` caps the spend. Each run prints a list-price cost estimate when it finishes.

Results go to `plugins/trade/evals/results/<timestamp>/` (gitignored): `aggregate-result.json` and a self-contained `report.html`.

### Measure a prompt edit

Run the same suite, with the same model, against each version of the skill you want to compare. For example, use `main` for the baseline and the PR branch for the candidate. Give each version its own worktree with the suite checked out into it:

```bash
git worktree add ../trade-eval-base main
git -C ../trade-eval-base checkout <suite-ref> -- plugins/trade/evals
claude plugin eval ../trade-eval-base/plugins/trade --scaffold --allow-tools Write Edit --ablation none --model claude-opus-5-5 --no-publish --output-dir plugins/trade/evals/results/base
```

`<suite-ref>` is any ref that has this suite, which is `main` once it is merged. Repeat with the candidate ref, a `../trade-eval-cand` worktree and `--output-dir plugins/trade/evals/results/cand`. Then print the per-case scores side by side:

```bash
jq -rn --slurpfile b plugins/trade/evals/results/base/aggregate-result.json --slurpfile c plugins/trade/evals/results/cand/aggregate-result.json '($b[0].cases | map({(.name): .aggregates.score}) | add) as $base | $c[0].cases[] | [.name, $base[.name], .aggregates.score] | @tsv'
```

Three runs per case is noisy. A one-run change (±0.33 on a case) is noise; look for a consistent shift across the cases the edit targets. Remove the worktrees with `git worktree remove --force ../trade-eval-base` (and likewise for `cand`). `--force` is needed because the suite checkout is left staged. Authoring notes (fixtures, mocks, rebuilding a pushback transcript) are in [`plugins/trade/evals/README.md`](../../evals/README.md).
