---
name: trade
description: >
  Personal US-equity options trading knowledge base. Use for trade analysis,
  strategy recommendations, earnings plays, post-mortems, or ticker mentions
  in a trading context (e.g., "analyze APP", "sell put on TSLA", "structure
  for NVDA earnings"). Triggers on multi-leg options (Jade Lizard, bull put
  spread, iron condor, diagonal, calendar), IV / IV crush, channel checks,
  earnings positioning, AH action, LEAPS / stock replacement, dealer GEX /
  gamma exposure / max pain / options chain analysis, or any single-stock
  options play. Concrete strikes, IV-aware structures, probability-weighted
  scenarios from 24 pitfalls, a gamma framework, and case studies (INTC,
  Mag-7, APP, NOK, TSEM, CBRS, SNOW). Market data via TradingView + Funda
  AI. Chinese response, English technical terms. **Check 3 axes before any
  structure**: vega sign matches IVR (pitfall 19); delta matches thesis;
  asymmetry — bull-conviction ≥ 4 (pitfall 24) forbids Jade Lizard / IC /
  Calendar regardless of IV. Pitfall 7 fixes vega sign, not structure.
---

# Trade — Options Trading Assistant

Active US-equity options trader's personal knowledge base. Concrete strikes, probability-weighted scenarios, IV-aware structures, drawn from a tree-structured library of pitfalls and case studies.

## Hard Rules (read before any prediction or structure recommendation)

1. **Always pull net options premium flow data + check the catalyst clock BEFORE predicting "IV crush" or "T+1 fade".** Pattern recognition without data check has produced specific documented errors — see pitfalls 20 and 21 plus the NOK 2026-04 case study.

2. **Run the bull-conviction count BEFORE picking structure** when analyzing any directional earnings or event trade. If count ≥ 4 (see `references/strategies.md` checklist), the asymmetry rule activates and Jade Lizard / Iron Condor / Calendar / Diagonal are **forbidden** regardless of IV regime — see pitfall 24 and SNOW 2026-05 case study. "High IV → sell premium" (pitfall 7) selects the vega sign, not the structure within short-vega structures.

3. **Always compute the counterfactual P/L matrix** (P/L at spot, +10%, +20%, +35%, +50%) for ≥4-conviction setups. Reject any candidate that flat-lines or loses in the highest-conviction scenario column. A 30-second matrix prevents Jade-Lizard-in-bull-tail failures.

## User Profile

- Trades multi-leg options on mega-cap US equities (earnings plays, event-driven)
- Fluent in Greeks, IV term structure, IV crush dynamics
- **Writes in Chinese — respond in Chinese.** Technical terms (delta, IV crush, diagonal, etc.) stay in English.

## Data Access

**MUST use Funda AI API for all market data** — quotes, options chains, IV/Greeks, GEX, flow, fundamentals, sentiment, congressional trades, earnings transcripts. Do not substitute yfinance, web search, or guess values when Funda data is available. Use the `funda-data` skill (or `finance-data-providers:funda-data`) to fetch.

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

## Reference Files

This skill uses lazy loading — read individual reference files only when relevant.

| File | Description |
|---|---|
| `references/strategies.md` | Structure-to-regime matching, LEAPS stock replacement, setup checklist, position management. Always relevant; load when planning a new trade. |
| `references/gamma-framework.md` | Dealer GEX + options chain + IV term + flow → multi-factor probability map. Load when sizing/structuring around expiry, gamma squeezes, or pinning behavior. |
| `references/price-action-framework.md` | Orderbook microstructure mental model — buy/sell imbalance, target-price divergence, vacuum zones, consensus shifts, float composition. Load when reading tape, explaining "why did it move", judging catalyst absorption, or assessing retail saturation. |
| `references/pitfalls/README.md` | Index of 24 trading pitfalls with quick lookup by trade type. |
| `references/pitfalls/NN-*.md` | Individual pitfall rules — load only when a relevant trade situation arises. |
| `references/ticker/README.md` | Index of trade case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW). |
| `references/ticker/<name>.md` | Individual case study — load when the current setup pattern-matches a prior trade. |

## When to Read Which File

| Situation | Files to load |
|-----------|---------------|
| New trade analysis request | `references/strategies.md`; `references/pitfalls/19` (vega-axis), **`references/pitfalls/24` (asymmetry-axis check)** |
| Reading tape / explaining a move / vacuum-zone identification | `references/price-action-framework.md` |
| "Why did the stock react this way to news?" | `references/price-action-framework.md`; `references/pitfalls/08` |
| Retail saturation / KOL-amplified setup / social-media-saturation check | `references/price-action-framework.md` (float composition); `references/pitfalls/20`, `21`; `references/ticker/nok-2026-04.md` |
| Earnings play | `references/pitfalls/05`, `07`, `09`, `10`, `11`, `20`, `21`, **`24`** |
| Channel-check-driven thesis | `references/pitfalls/14`, **`24`** (confluence ≥ 3 sources overrides single-source discount → activates asymmetry rule) |
| High-vol single name (APP/MSTR/COIN/PLTR) | `references/pitfalls/12`, `13`, `15`, `23`; `references/ticker/app-2026-05.md` |
| Exit / take-profit decision — "let it run to target" vs book now | `references/pitfalls/13`, `23` (hazard rate sets the optimal exit threshold) |
| Sell-the-news fade attempt | `references/pitfalls/01`, `02`, `03`, `04`, `20`; `references/ticker/intc-2026-04.md`, `references/ticker/nok-2026-04.md` |
| Multi-name cluster earnings | `references/pitfalls/09`, `10`, `11`; `references/ticker/mag7-2026-q1.md` |
| LEAPS / stock-replacement thesis | `references/strategies.md` (LEAPS section); `references/pitfalls/11`, `16`, `18`, `21`, `23` |
| Vol-mispricing / IV-thesis claim | `references/pitfalls/16`, `18`, `21` |
| Expiry-day / gamma squeeze / pinning | `references/gamma-framework.md`; `references/pitfalls/17` |
| Dealer flow / options market structure question | `references/pitfalls/17`, `21`; `references/gamma-framework.md` |
| Post-earnings gap-up + intraday fade (consider holding vs reversal) | `references/pitfalls/20`, `10`; `references/ticker/nok-2026-04.md` |
| High IV but no near-term event (>30 days to earnings) | `references/pitfalls/21`, `7`; `references/ticker/nok-2026-04.md` |
| Thematic re-rate / sector co-rally / KOL-amplified setup | `references/pitfalls/20`, `21`, **`24`**; `references/ticker/nok-2026-04.md`, `references/ticker/snow-2026-05.md` |
| About to call "IV crush coming" or "fade incoming" | **MANDATORY**: `references/pitfalls/20`, `21` — pull flow data + catalyst clock BEFORE publishing the prediction |
| Hot IPO / pre-options-listing / lock-up front-run | `references/ticker/cbrs-2026-05.md`; `references/pitfalls/12`, `13`, `15` |
| **About to recommend Jade Lizard / Iron Condor / Calendar / Diagonal** | **MANDATORY**: `references/pitfalls/24`; `references/ticker/snow-2026-05.md`; `references/ticker/tsem-2026-05.md` — run the bull-conviction count + counterfactual P/L matrix FIRST. If count ≥ 4, these structures are forbidden. |
| **High-conviction bull setup (channel confluence + thematic re-rate + de-risked stock)** | `references/pitfalls/24`; `references/ticker/snow-2026-05.md`; `references/strategies.md` (asymmetry-rule section) — use naked short put / bull put spread / risk reversal / long call, NOT Jade Lizard or IC |
| **Structure choice for directional conviction (high or low gap to consensus)** | `references/ticker/tsem-2026-05.md`, `references/ticker/snow-2026-05.md`; `references/pitfalls/24`, `19`, `6` |

## Adding to the Knowledge Base

- **New pitfall**: copy `references/pitfalls/_template.md` → `references/pitfalls/NN-slug.md`, add row to `references/pitfalls/README.md` table
- **New case study**: copy `references/ticker/_template.md` → `references/ticker/<ticker>-YYYY-MM.md`, add row to `references/ticker/README.md` table
- **Strategy update**: edit `references/strategies.md` directly — it stays flat because it's always-relevant framework
