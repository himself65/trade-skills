---
name: trade
description: >
  Personal US-equity options trading knowledge base with subcommands.
  `/trade setup` scaffolds a knowledge directory (substack, X,
  writedowns); `/trade import [file]` parses one raw file (PDF,
  screenshot, text) into structured YAML; `/trade analysis` (or any
  unrecognized first word) runs the default analysis flow, auto-loading
  the knowledge directory. Use for trade analysis, options strategy,
  earnings plays, post-mortems, or ticker mentions (e.g., "analyze APP").
  Triggers on multi-leg options (Jade Lizard, bull put spread, iron
  condor, diagonal, calendar), IV / IV crush, channel checks, earnings
  positioning, AH action, LEAPS / stock replacement, dealer GEX / gamma /
  max pain / options chain analysis, or VIX / volatility hedging. 25
  pitfalls, a gamma framework, case studies (INTC, APP, NOK, TSEM, SNOW,
  MDB, VIX). TradingView + Funda for data; replies in Chinese. Check 3
  axes: vega vs IVR (pitfall 19), delta vs thesis, asymmetry —
  bull-conviction >= 4 forbids Jade Lizard / IC / Calendar (pitfall 24).
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
- **Writes in Chinese — respond in Chinese.** Technical terms (delta, IV crush, diagonal, etc.) stay in English.

## Data Access

**Use TradingView desktop reader (`finance-data-providers:tradingview-reader`) FIRST** for quotes, options chains, IV, screener, watchlists, gainers / losers. Fall back to **Funda AI API (`finance-data-providers:funda-data`)** for anything TradingView can't provide: fundamentals, filings, transcripts, analyst estimates, options flow / GEX, supply chain, sentiment, Polymarket, congressional trades, economics. Do not substitute yfinance, web search, or guesses.

**Credentials live in the root repo `.env`, not the worktree.** When running inside a worktree (path matches `.claude/worktrees/*`), the worktree itself has no `.env` — resolve to the main repo's `.env` by stripping the `.claude/worktrees/<name>` suffix from the current working directory.

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
| `analysis [ticker | situation]` | Default trade analysis flow — preflight (knowledge dir, vega sanity, market data), then situation-specific loads | [references/commands/analysis.md](references/commands/analysis.md) |

### Routing rules

1. **No argument** → render the commands table above as the user-facing menu and ask what they'd like to do.
2. **First word matches `setup`, `import`, or `analysis`** → load the matching reference file and follow its instructions. Everything after the command name is the argument (file path, ticker, situation, etc.).
3. **First word doesn't match** → default to `analysis`. Load [references/commands/analysis.md](references/commands/analysis.md) and treat the full input as the analysis target. This is the common case for natural language ("analyze NVDA", "structure for TSLA earnings", "sell put on APP", a single ticker, etc.).

The always-on content above (Hard Rule, User Profile, Data Access, Response Rules, Core Principles, Structure-to-Regime) applies to every command. Subcommand references add their specific workflow on top.

## Always-relevant frameworks

This knowledge base is an **[Open Knowledge Format (OKF) v0.1](references/OKF.md)** bundle — markdown concepts with YAML frontmatter, cross-linked into a graph and navigable from [references/index.md](references/index.md). These reference files are domain-wide and may be loaded by any command when relevant:

| File | When to load |
|---|---|
| [references/strategies.md](references/strategies.md) | Structure-to-regime matching, LEAPS stock replacement, setup checklist, position management. Loaded by default in `analysis`. |
| [references/gamma-framework.md](references/gamma-framework.md) | Dealer GEX + options chain + IV term + flow → multi-factor probability map. Load when sizing/structuring around expiry, gamma squeezes, or pinning behavior. |
| [references/price-action-framework.md](references/price-action-framework.md) | Orderbook microstructure mental model. Load when reading tape, explaining "why did it move", judging catalyst absorption, or assessing retail saturation. |
| [references/pitfalls/index.md](references/pitfalls/index.md) | Index of 25 trading pitfalls — lookup by trade type. |
| [references/pitfalls/NN-*.md](references/pitfalls/) | Individual pitfall rules — load when a relevant trade situation arises. The `analysis` reference has a full situation → pitfall map. |
| [references/ticker/index.md](references/ticker/index.md) | Index of trade case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX). |
| [references/ticker/&lt;name&gt;.md](references/ticker/) | Individual case study — load when the current setup pattern-matches a prior trade. |
| `<knowledge>/` (user-chosen path, scaffolded by `/trade setup`) | User-owned documents. `substack/*.yaml` and `twitter/*.yaml` are parsed external content; `writedowns/*.md` are user-authored notes; any other subdir (e.g. a curated module) is loaded too. `*/raw/` holds source PDFs / screenshots and is normally not loaded. Checked at the start of every `analysis` — see `references/commands/analysis.md` for the full situation → reference map. |

## Adding to the Knowledge Base

### Curated library (this skill — shared)

- **New pitfall**: copy `references/pitfalls/_template.md` → `references/pitfalls/NN-slug.md` (fill the OKF frontmatter per [references/OKF.md](references/OKF.md)), add a row to `references/pitfalls/index.md` and a dated entry to `references/log.md`
- **New case study**: copy `references/ticker/_template.md` → `references/ticker/<ticker>-YYYY-MM.md` (fill the OKF frontmatter), add a row to `references/ticker/index.md` and a dated entry to `references/log.md`
- **Strategy update**: edit `references/strategies.md` directly — it stays flat because it's always-relevant framework

### Personal knowledge (user's cwd — private)

For documents the user collects themselves (substack posts, X / twitter threads, their own writedowns):

- Run `/trade setup` once to scaffold the knowledge directory (user chooses the path; default `./knowledge/`).
- Run `/trade import <file_path>` to parse each new raw artifact (PDF, screenshot, text) into structured YAML.
- Author writedowns directly as markdown in `<knowledge>/writedowns/`.

The `analysis` command auto-loads matching files from the knowledge dir on every invocation — see [references/commands/analysis.md](references/commands/analysis.md).
