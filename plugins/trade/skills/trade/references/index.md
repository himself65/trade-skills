---
type: Index
title: Trade Knowledge Base — Bundle Root
description: OKF v0.1 entry point for the curated trade knowledge bundle — frameworks, 25 pitfalls, case studies, command references.
tags: [index, okf, bundle-root, trading]
timestamp: 2026-06-13T00:00:00Z
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

## Pitfalls

**[`pitfalls/index.md`](pitfalls/index.md)** — 25 analytical biases (`Trading Pitfall`), one file per rule, with lookup-by-trade-type. Load individual `pitfalls/NN-*.md` files when a matching situation arises.

## Case studies

**[`ticker/index.md`](ticker/index.md)** — closed/in-progress trade post-mortems (`Trade Case Study`): INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX. Load when the current setup pattern-matches a prior trade.

## Command references

| File | Command | What it does |
|---|---|---|
| [`commands/setup.md`](commands/setup.md) | `/trade setup` | Scaffold the user's personal knowledge OKF bundle. |
| [`commands/import.md`](commands/import.md) | `/trade import` | Parse one raw artifact into a structured knowledge file. |
| [`commands/analysis.md`](commands/analysis.md) | `/trade analysis` | Default analysis flow — preflight + situation → reference map. |

## User-private knowledge bundle

`/trade setup` scaffolds a second OKF bundle in a user-chosen directory (default `./knowledge/`) for substack posts, X threads, and writedowns. It is never committed back here. Its index template is [`commands/templates/knowledge-index.md`](commands/templates/knowledge-index.md).
