---
name: trade
description: >
  Personal US-equity options trading KB.
  `/trade setup` scaffolds a knowledge dir; `/trade import [file]`
  parses a raw file (PDF/image) into YAML; `/trade report [tickers]`
  reads today's 资金流向 (散户/大单/机构, options + dark pool);
  `/trade daily <ticker>` is the one-name 看盘 read — 大单 block
  filtering, volume vs own average, IV term/IVR, dealer GEX +
  max pain, dark-pool baseline;
  `/trade analysis` (or any unknown first word) runs the default
  flow. For earnings plays, 今天有没有大单 / 成交量 / 流入流出 /
  母单吸筹·派发, or ticker mentions. Triggers on multi-leg options
  (Jade Lizard, bull put spread, iron condor, diagonal, calendar),
  IV / IV crush, LEAPS, dealer GEX / gamma / options flow / dark
  pool, VIX / vol hedging, NQ / ES 夜盘, position sizing / 仓位 /
  止损 / leverage, macro (宏观, 晨报, 收盘复盘, CPI / FOMC).
  35 pitfalls, frameworks, cases. Unusual Whales / TradingView /
  Funda; user-language replies, English files. 3 axes: vega vs IVR
  (p19), delta, asymmetry; conviction >= 4 forbids Jade Lizard /
  IC / Calendar (p24). Size = risk$ / stop (p30).
metadata:
  okf_version: "0.1"
  okf_conformance: references/OKF.md
---

# Trade — Options Trading Assistant

Active US-equity options trader's personal knowledge base. Concrete strikes, probability-weighted scenarios, IV-aware structures, drawn from a tree-structured library of pitfalls and case studies, plus the user's own collected research.

## Hard Rules (read before any prediction or structure recommendation)

1. **Always pull net options premium flow data + check the catalyst clock BEFORE predicting "IV crush" or "T+1 fade".** Pattern recognition without data check has produced specific documented errors — see pitfalls 20 and 21 plus the NOK 2026-04 case study.

2. **Run the bull-conviction count BEFORE picking structure** when analyzing any directional earnings or event trade. If count ≥ 4 (see `references/strategies.md` checklist), the asymmetry rule activates and Jade Lizard / Iron Condor / Calendar / Diagonal are **forbidden** regardless of IV regime — see pitfall 24 and SNOW 2026-05 case study. "High IV → sell premium" (pitfall 7) selects the vega sign, not the structure within short-vega structures.

3. **Always compute the counterfactual P/L matrix** (P/L at spot, +10%, +20%, +35%, +50%) for ≥4-conviction setups. Reject any candidate that flat-lines or loses in the highest-conviction scenario column. A 30-second matrix prevents Jade-Lizard-in-bull-tail failures.

## User Profile

- Trades multi-leg options on mega-cap US equities (earnings plays, event-driven)
- Fluent in Greeks, IV term structure, IV crush dynamics
- **Chat replies mirror the user's language, message by message** — they write Chinese, reply in Chinese; they switch to English, reply in English (rule set 2026-07-30, superseding the earlier English-only preference from the same day). **Anything written to a git-tracked file stays English**: this repo (`references/` — pitfalls, case studies, frameworks, `log.md`) and the personal knowledge dir (writedowns, digests, parsed YAML). Chinese in **trigger positions** (this file's `description`, the `commands/analysis.md` situation rows, `macro-framework.md` §9 mode triggers) stays as-is — those are input matchers, not output language. Keep proper nouns untranslated when citing them (document titles, author handles, and domain terms like 母单 / 格局, glossed on first use).

## Data Access

**Tier 0 — Unusual Whales, only when the user has a subscription.** If a UW MCP server is in the session, or `UNUSUAL_WHALES_API_KEY` resolves (env → repo-root `.env` → the knowledge dir's repo `.env`), UW is the **first** stop for options flow, dark pool, dealer GEX, IV rank, and intraday net-premium ticks — it is the upstream source behind the Funda options fields, queried directly instead of through a proxy. Load [references/unusual-whales.md](references/unusual-whales.md) for the availability gate, auth headers (`UW-CLIENT-API-ID: 100001` is required), endpoint map, and entitlement traps. **No key → this tier does not exist**: fall back to the three below and say which proxy the read is built on. Never present a UW-only dataset (dark pool, market tide, multi-leg legs) as available when it isn't.

Then, in order:

1. **TradingView MCP (`finance-data-providers:tradingview-mcp`) FIRST** for quotes, TA readouts / indicator ratings, multi-timeframe alignment, screeners / scans, gainers / losers, futures (NQ / ES 夜盘 overview + movers — UW futures endpoints 500, so 夜盘 stays here), pre/after-market prices, unusual options activity, and quick options-chain looks. Headless — no desktop app, no login, no CDP relaunch that closes the user's charts.
2. **TradingView desktop reader (`finance-data-providers:tradingview-reader`)** when you need what the MCP can't give: options chain **with greeks** (delta / gamma / theta / vega), per-strike IV skew, expiries with contract counts, watchlists, alerts, TV news, chart screenshots. With tier 0 live, most greeks / skew pulls no longer need this trip.
3. **Funda AI API (`finance-data-providers:funda-data`)** for everything fundamental or flow-based: fundamentals, filings, transcripts, analyst estimates, options premium flow / GEX (the `report` command's fallback backbone), supply chain, sentiment, Polymarket, congressional trades, economics.

**Collected data is never written to the scratchpad or any temp path.** A crawl, a scraped post history, a downloaded filing set, or a price series pulled for reuse goes to the durable corpus directory (`$TRADE_CORPUS_DIR` → `<knowledge>/corpora/` → **ask**), with a MANIFEST written first, an append-only `raw/`, a regenerable `derived/`, and a **resumable** fetcher. Temp directories are purged on every OS boot — an 84,601-comment corpus was lost twice that way. See [references/data-collection.md](references/data-collection.md). The scratchpad stays correct for genuinely disposable artifacts; the test is whether losing it would cost more than a minute to rebuild.

Do not substitute yfinance, web search, or guesses. The MCP's options-chain IV is Yahoo-sourced — fine for chain shape / OI / volume, not for IV-rank or skew decisions (use UW `iv-rank`, or tier 2 / 3).

**Credentials live in the root repo `.env`, not the worktree.** When running inside a worktree (path matches `.claude/worktrees/*`), the worktree itself has no `.env` — resolve to the main repo's `.env` by stripping the `.claude/worktrees/<name>` suffix from the current working directory. `UNUSUAL_WHALES_API_KEY` may instead live in the personal knowledge dir's repo — see the resolution order in [references/unusual-whales.md](references/unusual-whales.md) §1.

## Response Rules

**Analysis order**: tape → sentiment/catalysts → valuation. Never start with DCF for short-term trades.

**Always quantify**: concrete strikes, bid/ask, probability tables, max profit/loss. No vague "consider a bull put spread".

**Be self-critical**: when pushed back, update estimates and say so. Don't defensively reinforce prior calls.

**Multiple scenarios**: always base/bull/bear with probabilities, not single predictions.

## Core Principles

1. Tape > opinion > DCF for short-term trades
2. High IV (IV Rank >70) → sell premium; low IV → buy premium
3. Thesis invalidated → flip, don't hold
4. Defined risk always — never naked on event trades
5. "Priced in" is a percentage, not yes/no
6. Clever structures often mask fading conviction
7. Analyst consensus is trailing — not a ceiling
8. Single big institutional order ≠ edge
9. **Pricing before forecasting** — never call an outcome bullish/bearish before stating what the market already implies (pitfall 28)
10. **Margin over level** — level, direction and acceleration are three different facts; "weak but improving" beats "strong but decelerating" (pitfall 29)
11. **Stop distance sets size, never the reverse** — invalidation level → stop distance → `size = risk$ ÷ (stop × point value)`; a stop under 0.2 ATR is noise, and a per-trade cap without a daily loss limit is not risk management (pitfalls 30, 31)

## Structure-to-Regime Quick Reference

> ⚠️ **Three axes must match: Direction, Vega, AND Asymmetry.** See `references/strategies.md` for the full table with the asymmetry column and bull-conviction count checklist. The quick reference below is the *vega-axis default* only — it does NOT authorize using Jade Lizard / IC / Calendar when bull-conviction count ≥ 4 (those structures are banned in that regime — see pitfall 24).

| Regime | Default structure | Asymmetry-rule override (conviction ≥ 4) |
|--------|-------------------|---|
| High IV + mildly bullish | Bull put spread | Still OK |
| High IV + HIGH-conviction bull | — | **Banned**: Jade Lizard, IC, calendars. Use: naked short put, bull put spread, risk reversal, or long call |
| High IV + bearish | Bear call spread | (Symmetric for bear conviction) |
| High IV + neutral (no directional edge) | Iron condor | OK only when no directional conviction |
| High IV + manipulator-tape (APP/MSTR/COIN/PLTR) | Jade Lizard + leveraged-proxy scalp | OK for whipsaw tapes where you genuinely have no directional edge; NOT a substitute for "high IV + bullish" |
| Low IV + directional | Debit spread | Long-vega structure inherently uncapped on upside if single-leg |
| Front-week IV >> back-month | Diagonal / calendar | **Banned if conviction ≥ 4** — pin structures fail in directional tails |

## Commands

| Command | Description | Reference |
|---|---|---|
| `setup` | Scaffold a personal knowledge directory (`./knowledge/` by default) for substack posts, X / twitter threads, and writedowns | [references/commands/setup.md](references/commands/setup.md) |
| `import <file_path>` | Parse one raw artifact (PDF, image, text) into structured YAML inside the knowledge directory | [references/commands/import.md](references/commands/import.md) |
| `report [tickers | basket]` | Today's capital-flow / 资金流向 read (散户 / 大单 / 机构 proxied from Funda options premium-flow) across one or more names, as a comparison table + cross-section synthesis | [references/commands/report.md](references/commands/report.md) |
| `daily <ticker>` | The repeatable one-name daily 看盘 read — tape, activity gate, 大单 block filter ladder, dark-pool baseline, IV term structure / percentile, dealer GEX + max pain, sector cross-check → a **named composite state** + falsification signposts | [references/commands/daily.md](references/commands/daily.md) |
| `analysis [ticker | situation]` | Default trade analysis flow — preflight (knowledge dir, vega sanity, market data), then situation-specific loads | [references/commands/analysis.md](references/commands/analysis.md) |

### Routing rules

1. **No argument** → render the commands table above as the user-facing menu and ask what they'd like to do.
2. **First word matches `setup`, `import`, `report`, `daily`, or `analysis`** → load the matching reference file and follow its instructions. Everything after the command name is the argument (file path, ticker(s), basket, situation, etc.).
3. **First word doesn't match** → default to `analysis`. Load [references/commands/analysis.md](references/commands/analysis.md) and treat the full input as the analysis target. This is the common case for natural language ("analyze NVDA", "structure for TSLA earnings", "sell put on APP", a single ticker, etc.).

> **Daily-read exception (route to `daily`, not `analysis`):** if the request is *"what is `<TICKER>` doing today"* in any form — 今天有没有大单 / 成交量怎么样 / IV 拉升了吗 / max pain 在哪 / 现在呢 / "refresh" / "what's the state of X today" — run [`daily`](references/commands/daily.md) on that one name. `daily` is the state read; `analysis` is the decision. A follow-up *"现在呢"* inside the same session is a **delta re-run** of `daily`, not a fresh full report — see that file's Arguments section.

> **Capital-flow exception (route to `report`, not `analysis`):** if the request is for **today's money flow across several names or a basket** — 资金流向 / 流入流出 / 净流入·净流出 / 散户·大单·机构 / capital flow / "who's buying or selling" — treat it as a [`report`](references/commands/report.md) request even when the first word isn't `report`. For a **single** name prefer [`daily`](references/commands/daily.md), which covers the same flow plus volatility, positioning and levels.

> **Ingestion exception (don't mis-route to `analysis`):** if the input is an external **link / article / pasted research** the user wants you to read, study, digest, or save to the knowledge base (rather than analyze a live trade), treat it as an **ingestion** request — follow [references/commands/import.md](references/commands/import.md) and write the result to the **user's personal knowledge dir** (a writedown, or YAML for a raw artifact), **never** `references/`. See the destination rule under "Adding to the Knowledge Base."

The always-on content above (Hard Rule, User Profile, Data Access, Response Rules, Core Principles, Structure-to-Regime) applies to every command. Subcommand references add their specific workflow on top.

## Always-relevant frameworks

This knowledge base is an **[Open Knowledge Format (OKF) v0.1](references/OKF.md)** bundle — markdown concepts with YAML frontmatter, cross-linked into a graph and navigable from [references/index.md](references/index.md). These reference files are domain-wide and may be loaded by any command when relevant:

| File | When to load |
|---|---|
| [references/strategies.md](references/strategies.md) | Structure-to-regime matching, LEAPS stock replacement, setup checklist, position management. Loaded by default in `analysis`. |
| [references/gamma-framework.md](references/gamma-framework.md) | Dealer GEX + options chain + IV term + flow → multi-factor probability map. Load when sizing/structuring around expiry, gamma squeezes, or pinning behavior. |
| [references/price-action-framework.md](references/price-action-framework.md) | Orderbook microstructure mental model. Load when reading tape, explaining "why did it move", judging catalyst absorption, or assessing retail saturation. |
| [references/macro-framework.md](references/macro-framework.md) | Macro judgment pipeline: seven-question gate, marginal driver, micro-to-macro jigsaw, **pricing before forecasting** (implied-pricing → data-source map), the change in the change, price as evidence, cross-asset confirmation, expression and sizing. Plus the 8 dashboard families and 8 output modes (morning note / EOD review / weekly / pre-trade consult / monthly regime review / 13F / divergence watch / thematic deep dive). Load for macro regime reads, data prints, digesting a macro report, or turning a macro view into an expression. |
| [references/overnight-futures-framework.md](references/overnight-futures-framework.md) | Overnight index-futures (夜盘) attribution — "what's driving NQ/ES right now". Session clock, three-complex divergence read, catalyst clock, scenarios, data-freshness caveats. |
| [references/parent-order-flow-framework.md](references/parent-order-flow-framework.md) | Parent-order (母单) net-flow × volatility × trend state matrix — 吸筹 / 动量 / 派发 / 风险释放 / 承接·换手. Load when classifying who is buying vs selling, reading 母单/大单 net flow, or calling accumulation vs distribution. |
| [references/unusual-whales.md](references/unusual-whales.md) | Direct Unusual Whales access (Data Access tier 0). Load whenever a UW key / MCP is available and the question needs options flow, dark pool, dealer GEX, IV rank, intraday net-premium ticks, or exact multi-leg de-contamination — it carries the availability gate, endpoint map, entitlement gaps, and field traps. |
| [references/data-collection.md](references/data-collection.md) | Durable corpus rule — where crawled or scraped data goes, required MANIFEST and gap accounting, resumable fetchers, and the private-repo line for paid or closed-community sources. Load before starting any collection that runs more than a few minutes. |
| [references/pitfalls/index.md](references/pitfalls/index.md) | Index of 35 trading pitfalls — lookup by trade type. |
| [references/pitfalls/NN-*.md](references/pitfalls/) | Individual pitfall rules — load when a relevant trade situation arises. The `analysis` reference has a full situation → pitfall map. |
| [references/ticker/index.md](references/ticker/index.md) | Index of trade case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX, SATS, 6981, MU, NQ, NBIS). |
| [references/ticker/&lt;name&gt;.md](references/ticker/) | Individual case study — load when the current setup pattern-matches a prior trade. |
| `<knowledge>/` (user-chosen path, scaffolded by `/trade setup`) | User-owned documents. `substack/*.yaml` and `twitter/*.yaml` are parsed external content; `writedowns/*.md` are user-authored notes; any other subdir (e.g. a curated module) is loaded too. `*/raw/` holds source PDFs / screenshots and is normally not loaded. Checked at the start of every `analysis` — see `references/commands/analysis.md` for the full situation → reference map. |

## Knowledge Architecture

Three tiers. The boundary that matters is **how each is used**, not how big it is — **L2 is read every session; L3 is queried on demand.**

| | Where | Visibility | What lives there | How it loads |
|---|---|---|---|---|
| **L1 — Rules** | `references/` (this repo) | **Public** — ships to every installer | Pitfalls, frameworks, conventions, case studies of the **user's own** trades | Selectively, by situation |
| **L2 — Judgement** | Personal knowledge dir (`knowledge_path`; default `./knowledge/`) | Private | The user's own synthesis — writedowns, digests of third-party research, parsed post YAML | **Auto-scanned on every `/trade analysis`** |
| **L3 — Evidence** | Durable corpus repo (`$TRADE_CORPUS_DIR` → `<knowledge>/corpora/` → ask) | Per-corpus `access_class` | Crawled archives, scraped histories, bulk pulls, and the raw source documents behind L2 digests | **Never auto-loaded** — queried by script on demand |

> **Destination rule — decide this FIRST: *whose* knowledge is it, and how will it be used?**
> - A reusable, **de-identified** rule for *every* installer — pitfall, framework, convention, or a case study of the user's **own** trade → **L1**. Never put third-party content here; this library is public.
> - The user's **own conclusion** about outside material — a digest of a substack / X post, a macro or brokerage report, a KOL thread, any article they hand you to read → **L2**, written in English.
> - Anything **collected** — a crawl, a scrape, a bulk pull, or a one-off raw source document you were handed → **L3**, never `references/` and never a temp path. Layout, `access_class`, manifest and privacy rules in [references/data-collection.md](references/data-collection.md).
>
> "Our knowledge base," said while you happen to be working inside this repo, still means the **user's** knowledge — L2 and L3 are usually separate repos found via `knowledge_path` / `$TRADE_CORPUS_DIR`. **If unsure, ask** before writing.

**L2 has a size budget.** It is auto-scanned every session, so it must stay small enough to actually read. When a directory outgrows what one session can scan, the bulk belongs in L3 — move the material down and leave the synthesis behind.

**The pipeline runs upward.** Collect into **L3** → analyse → the *conclusion* becomes an **L2** writedown → if the lesson generalises and de-identifies, it graduates to an **L1** pitfall or framework. Evidence does not skip tiers: an L1 rule states its case in prose and never links into a private corpus, because installers cannot follow that link.

### L1 — curated library (this skill; public, ships to all installers)

- **New pitfall**: copy `references/pitfalls/_template.md` → `references/pitfalls/NN-slug.md` (fill the OKF frontmatter per [references/OKF.md](references/OKF.md)), add a row to `references/pitfalls/index.md` and a dated entry to `references/log.md`
- **New case study** (the user's *own* trade): copy `references/ticker/_template.md` → `references/ticker/<ticker>-YYYY-MM.md` (fill the OKF frontmatter), add a row to `references/ticker/index.md` and a dated entry to `references/log.md`
- **Strategy update**: edit `references/strategies.md` directly — it stays flat because it's always-relevant framework

### L2 — personal knowledge (user's chosen dir; private, usually a *separate* repo found via `knowledge_path`)

For anything the user collects or shares from outside (substack posts, X threads, **macro / brokerage research, articles, links**) plus their own notes:

- Run `/trade setup` once to scaffold the knowledge directory (user chooses the path; default `./knowledge/`).
- **Raw artifact** (PDF / screenshot / text file) → run `/trade import <file_path>` to parse it into structured YAML in `substack/` or `twitter/`.
- **A shared link / article you read and *synthesize*** (a macro thesis, a research report — anything that isn't a clean platform post) → write a **writedown** markdown digest at `<knowledge>/writedowns/YYYY-MM-DD-<topic>.md`, in English (knowledge-dir files are git content — see User Profile), with source attribution, a "not independently verified" caveat, and a bear case. See [references/commands/import.md](references/commands/import.md).
- Author the user's own writedowns directly as markdown in `<knowledge>/writedowns/`.

The `analysis` command auto-loads matching files from the knowledge dir on every invocation — see [references/commands/analysis.md](references/commands/analysis.md).

### L3 — collected corpora (durable, bulk, never auto-loaded)

Everything you **collect** rather than write: crawled archives, scraped histories, bulk API pulls, and the raw source documents (PDFs, screenshots, transcripts) that an L2 digest was written from. One directory per corpus — `MANIFEST.md` / `raw/` / `derived/` / `scripts/` — with the manifest declaring coverage, the resume cursor, the **gap list**, and an **`access_class`** of `public`, `paid`, or `closed-community`.

A repository's visibility is set by the **most restrictive** corpus it holds: one `paid` or `closed-community` corpus makes the whole repo private. Keep genuinely public sources in a separate public repo rather than downgrading everything to private-by-association.

Full rules — path resolution, layout, resumability, gap accounting, and the sharing line between `raw/` and `derived/` — in [references/data-collection.md](references/data-collection.md).
