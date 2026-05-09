---
name: trade
description: >
  Personal US-equity options trading knowledge base. Use when the user asks for
  trade analysis, options strategy recommendations, earnings plays, post-mortems
  on prior trades, or mentions tickers in a trading context (e.g., "analyze APP",
  "should I sell put on TSLA", "what's the structure for NVDA earnings"). Triggers
  on mentions of multi-leg options (Jade Lizard, bull put spread, iron condor,
  diagonal, calendar), IV/IV crush, channel checks, earnings positioning, AH price
  action, LEAPS / stock replacement, dealer GEX / gamma exposure / max pain /
  options chain analysis, or any single-stock options play. Provides concrete
  strikes, IV-aware structures, probability-weighted scenarios drawn from a curated
  library of 18 trading pitfalls, a gamma/options-structure framework, and prior
  case studies (INTC, Mag-7, APP). Pulls market data via Funda AI API. Responds in
  Chinese with English technical terms.
---

# Trade — Options Trading Assistant

Active US-equity options trader's personal knowledge base. Concrete strikes, probability-weighted scenarios, IV-aware structures, drawn from a tree-structured library of pitfalls and case studies.

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

| Regime | Default structure |
|--------|-------------------|
| High IV + bullish | Bull put spread |
| High IV + bearish | Bear call spread |
| High IV + neutral | Iron condor |
| High IV + manipulator-tape | Jade Lizard + leveraged-proxy scalp |
| Low IV + directional | Debit spread |
| Front-week IV >> back-month | Diagonal / calendar |

## Reference Files

This skill uses lazy loading — read individual reference files only when relevant.

| File | Description |
|---|---|
| `references/strategies.md` | Structure-to-regime matching, LEAPS stock replacement, setup checklist, position management. Always relevant; load when planning a new trade. |
| `references/gamma-framework.md` | Dealer GEX + options chain + IV term + flow → multi-factor probability map. Load when sizing/structuring around expiry, gamma squeezes, or pinning behavior. |
| `references/pitfalls/README.md` | Index of 18 trading pitfalls with quick lookup by trade type. |
| `references/pitfalls/NN-*.md` | Individual pitfall rules — load only when a relevant trade situation arises. |
| `references/ticker/README.md` | Index of closed trade case studies (INTC, Mag-7, APP). |
| `references/ticker/<name>.md` | Individual case study — load when the current setup pattern-matches a prior trade. |

## When to Read Which File

| Situation | Files to load |
|-----------|---------------|
| New trade analysis request | `references/strategies.md` |
| Earnings play | `references/pitfalls/05`, `07`, `09`, `10`, `11` |
| Channel-check-driven thesis | `references/pitfalls/14` |
| High-vol single name (APP/MSTR/COIN/PLTR) | `references/pitfalls/12`, `13`, `15`; `references/ticker/app-2026-05.md` |
| Sell-the-news fade attempt | `references/pitfalls/01`, `02`, `03`, `04`; `references/ticker/intc-2026-04.md` |
| Multi-name cluster earnings | `references/pitfalls/09`, `10`, `11`; `references/ticker/mag7-2026-q1.md` |
| LEAPS / stock-replacement thesis | `references/strategies.md` (LEAPS section); `references/pitfalls/11`, `16`, `18` |
| Vol-mispricing / IV-thesis claim | `references/pitfalls/16`, `18` |
| Expiry-day / gamma squeeze / pinning | `references/gamma-framework.md`; `references/pitfalls/17` |
| Dealer flow / options market structure question | `references/pitfalls/17`; `references/gamma-framework.md` |

## Adding to the Knowledge Base

- **New pitfall**: copy `references/pitfalls/_template.md` → `references/pitfalls/NN-slug.md`, add row to `references/pitfalls/README.md` table
- **New case study**: copy `references/ticker/_template.md` → `references/ticker/<ticker>-YYYY-MM.md`, add row to `references/ticker/README.md` table
- **Strategy update**: edit `references/strategies.md` directly — it stays flat because it's always-relevant framework
