# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal options trading Claude Code plugin marketplace. Contains one plugin (`trade`) wrapping one skill (`trade`) — a multi-leg options trading assistant backed by a curated pitfalls library and case-study archive.

## Repository structure

This repo is a Claude Code plugin marketplace. Skills are organized under `plugins/<plugin>/skills/<skill>/` following the [`himself65/finance-skills`](https://github.com/himself65/finance-skills) convention.

```
.claude-plugin/
  marketplace.json        # Marketplace listing — registers the trade plugin
plugins/
  trade/
    plugin.json           # Plugin manifest
    skills/
      trade/
        SKILL.md          # Skill entry point with frontmatter
        README.md         # Skill documentation
        references/       # Lazy-loaded reference content
          strategies.md
          pitfalls/       # 15 trading pitfalls (one file per rule)
          ticker/         # Closed trade case studies (INTC, Mag-7, APP)
```

## How the skill works

`SKILL.md` defines the trigger description and lists the lazy-loaded reference files under `references/`. The model only reads individual `references/pitfalls/NN-*.md` or `references/ticker/<name>.md` files when a specific trade situation calls for them — keeping the entry-point context small.

### SKILL.md format

```markdown
---
name: trade
description: >
  Multi-line description that doubles as the trigger definition.
  Include specific phrases, keywords, and scenarios that should activate this skill.
---

# Skill Title

Step-by-step instructions, structure-to-regime quick reference, and the lazy-load index.

## Reference Files

- `references/strategies.md` — always-relevant framework
- `references/pitfalls/README.md` — index of 15 pitfalls
- `references/ticker/README.md` — index of case studies
```

**Required frontmatter fields:** `name`, `description`. The `description` controls when the skill activates — write it as a comprehensive trigger list, not a summary.

## Adding to the knowledge base

- **New pitfall**: copy `plugins/trade/skills/trade/references/pitfalls/_template.md` → `pitfalls/NN-slug.md`, then add a row to `pitfalls/README.md`
- **New case study**: copy `plugins/trade/skills/trade/references/ticker/_template.md` → `ticker/<ticker>-YYYY-MM.md`, then add a row to `ticker/README.md`
- **Strategy update**: edit `references/strategies.md` directly — flat by design
- **Skill description tweak**: edit the YAML `description` field in `SKILL.md` frontmatter (controls what triggers the skill)

## Plugin system

- `.claude-plugin/marketplace.json` — marketplace listing.
- `plugins/trade/plugin.json` — plugin manifest (name, version, keywords). Skills under `plugins/trade/skills/` with SKILL.md frontmatter are auto-discovered.

Users install via:

```bash
npx plugins add himself65/trade-skills
```

When a skill is invoked as a plugin, it is namespaced as `<plugin-name>:<skill-name>` (e.g., `/trade:trade`).

## Important constraints

- **No live trade execution.** Analysis is read-only. Staging draft orders via the IBKR MCP `create_order_instruction` (which only creates an instruction the user must review and transmit in IBKR) is permitted; never transmit a live order or claim one was filled. Equity/ETF only — multi-leg options cannot be staged and stay manual. Never generate code that places trades.
- **Market data priority:** For options chains and stock quotes, use the TradingView desktop reader (`finance-data-providers:tradingview-reader` skill) FIRST. Fall back to the Funda AI API (`finance-data-providers:funda-data` skill) for data TradingView cannot provide (fundamentals, filings, transcripts, analyst estimates, options flow/GEX, supply chain, sentiment, Polymarket, congressional trades, economics, etc.). Do not substitute yfinance, web search, or guesses.
