---
type: Index
title: Trade Knowledge Base — Bundle Root
description: OKF v0.1 entry point for the curated trade knowledge bundle — frameworks, 35 pitfalls, case studies, command references.
tags: [index, okf, bundle-root, trading]
timestamp: 2026-07-30T04:30:00Z
---

# Trade Knowledge Base

The curated, shared knowledge bundle behind the `trade` skill. It is an **[Open Knowledge Format (OKF) v0.1](OKF.md)** bundle: a graph of markdown concept files with YAML frontmatter, loaded lazily via the situation → reference map in [`commands/analysis.md`](commands/analysis.md). The single entry point and always-on context is [`../SKILL.md`](../SKILL.md).

## Conformance

- **[`OKF.md`](OKF.md)** — Open Knowledge Format conformance & mapping (type vocabulary, frontmatter schema, bundle conventions).
- **[`log.md`](log.md)** — chronological change history of this knowledge base.

## Always-relevant frameworks

| File | Type | What it covers |
|---|---|---|
| [`strategies.md`](strategies.md) | Framework | Structure-to-regime matching, the three axes (direction / vega / asymmetry), LEAPS stock replacement, setup checklist, position management. |
| [`gamma-framework.md`](gamma-framework.md) | Framework | Dealer GEX + options chain + IV term + flow → multi-factor probability map. |
| [`price-action-framework.md`](price-action-framework.md) | Framework | Orderbook microstructure mental model — why the same news lands differently. |
| [`macro-framework.md`](macro-framework.md) | Framework | Macro judgment pipeline — seven questions, marginal driver → micro-to-macro → market-implied pricing → second derivative → price as evidence → cross-asset confirmation → expression & sizing; eight dashboard families mapped to this stack; eight output modes (morning note / EOD review / weekly / pre-trade consult / monthly / 13F / divergence watch / thematic deep dive). |
| [`overnight-futures-framework.md`](overnight-futures-framework.md) | Framework | Overnight index-futures (夜盘) attribution — session clock, three-complex divergence read, catalyst clock, scenario output, data-freshness caveats. |
| [`parent-order-flow-framework.md`](parent-order-flow-framework.md) | Framework | Parent-order (母单) net-flow × volatility × trend state matrix — accumulation / momentum / distribution / capitulation / absorption, with measurement caveats. |

## Data sources

| File | Type | What it covers |
|---|---|---|
| [`unusual-whales.md`](unusual-whales.md) | Data Source | Direct Unusual Whales access when the user has a subscription (Data Access **tier 0**) — availability gate, MCP + REST auth, endpoint map by trading question, entitlement gaps (volatility add-on, congress, futures), and verified field traps. Load it before writing any UW request; skip the tier entirely when no key resolves. |
| [`data-collection.md`](data-collection.md) | Convention | Durable corpus rule — collected data never lives in a temp directory. Path resolution (`$TRADE_CORPUS_DIR` → `<knowledge>/corpora/` → ask), the `MANIFEST.md` / `raw/` / `derived/` / `scripts/` layout, mandatory gap accounting that feeds pitfall 33's denominator, resumability rules, and the private-repo requirement for paid or closed-community sources. |

## Pitfalls

**[`pitfalls/index.md`](pitfalls/index.md)** — 35 analytical and risk-management biases (`Trading Pitfall`), one file per rule, with lookup-by-trade-type. Load individual `pitfalls/NN-*.md` files when a matching situation arises.

## Case studies

**[`ticker/index.md`](ticker/index.md)** — closed/in-progress trade post-mortems (`Trade Case Study`): INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX, SATS, 6981, MU, NQ, NBIS. Load when the current setup pattern-matches a prior trade.

## Command references

| File | Command | What it does |
|---|---|---|
| [`commands/setup.md`](commands/setup.md) | `/trade setup` | Scaffold the user's personal knowledge OKF bundle. |
| [`commands/import.md`](commands/import.md) | `/trade import` | Parse one raw artifact into a structured knowledge file. |
| [`commands/report.md`](commands/report.md) | `/trade report` | Daily capital-flow / 资金流向 read (散户 / 大单 / 机构 proxied from options premium-flow). |
| [`commands/daily.md`](commands/daily.md) | `/trade daily` | One-name daily 看盘 read — tape, activity gate, block (大单) filter ladder, dark-pool baseline, IV term/percentile, dealer GEX + max pain → a named composite state + falsification signposts. |
| [`commands/analysis.md`](commands/analysis.md) | `/trade analysis` | Default analysis flow — preflight + situation → reference map. |

## User-private knowledge bundle

`/trade setup` scaffolds a second OKF bundle in a user-chosen directory (default `./knowledge/`) for substack posts, X threads, and writedowns. It is never committed back here. Its index template is [`commands/templates/knowledge-index.md`](commands/templates/knowledge-index.md).
