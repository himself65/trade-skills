---
type: Convention
title: Durable corpus rule — collected data never lives in a temp directory
description: Where crawled or scraped trading corpora go and how they must be laid out; path resolution, mandatory manifest and gap accounting, resumable fetchers, and the privacy line for paid or closed-community sources. Load before starting any collection that takes more than a few minutes.
tags: [data-collection, corpus, provenance, durability, reproducibility, scraping]
timestamp: 2026-08-17T04:05:00Z
---

# Durable corpus rule

Anything **collected** — a crawled chat archive, a scraped post history, a downloaded filing set, a price series pulled for reuse — is written to a **durable corpus directory**. Never to the agent scratchpad, never to `/tmp`, never to any path beneath them.

**Why the scratchpad is disqualified.** It is session-scoped, and on macOS it sits under `/private/tmp`, which the OS purges on **every boot**. Measured on one user's machine while building an 84,601-comment corpus: six reboots in seven days, and the corpus — roughly 35 minutes of crawling — was destroyed twice, the second time immediately after the user asked to preserve it. Data you cannot cheaply re-fetch must not live somewhere the OS empties without warning.

**One-off source documents count as collected material.** A PDF, screenshot or transcript handed over so a digest can be written from it is evidence, and the digest is worthless later if the source is gone. It goes to a corpus directory alongside crawled material — not next to the digest, which belongs in the personal knowledge dir.

The scratchpad remains correct for genuinely disposable artifacts: a one-off diff, a scratch script, an intermediate nobody will want tomorrow. The test is simple — **if losing it would cost more than a minute to rebuild, it is not scratch.**

## Where it goes — resolution order

1. `$TRADE_CORPUS_DIR`, if set.
2. `<knowledge>/corpora/`, where `<knowledge>` is the personal knowledge directory (`knowledge_path` in the user's CLAUDE.md, or `$TRADE_KNOWLEDGE_DIR`).
3. Neither resolves → **ask the user for a path.** Never silently fall back to a temp directory.

Never put a collected corpus in `references/` — that library is first-party and ships publicly to every installer (see the destination rule in [`../SKILL.md`](../SKILL.md)). Bulk corpora often deserve **their own repository** rather than living inside the knowledge bundle; a 100 MB comment archive dropped into a notes repo makes the notes repo unusable. Ask when the collection is large.

## Layout

```
<corpus>/<source>-<subject>-<YYYY-MM>/
  MANIFEST.md      # provenance — required, written FIRST
  raw/             # verbatim payloads, append-only, one file per unit
  derived/         # aggregates, ledgers, joined price series — regenerable
  scripts/         # the exact fetch + parse code that produced raw/
```

- **`raw/` is append-only.** Never rewrite or prune it. Re-deriving an aggregate must never require re-crawling.
- **`derived/` is disposable.** Everything in it must be reproducible by running `scripts/` against `raw/`.
- **`scripts/` ships with the corpus.** A corpus whose fetch code exists only in a chat transcript is not reproducible, and the transcript is not durable either.

## MANIFEST.md — required fields

Write it **before** the crawl starts; update it when the crawl finishes.

- **Source** — URL or API base, publication / account id, and access method (public, cookie session, API key)
- **Collected** — start and end timestamps of the crawl itself
- **Coverage** — the date range of the *content* and the unit counts (threads, posts, comments, rows)
- **Gaps** — every unit that could not be retrieved, with reason and count. **A corpus without a stated gap list cannot support a share-of-corpus computation** — see [`pitfalls/33-denominator-before-framing.md`](pitfalls/33-denominator-before-framing.md), which requires a denominator you can defend.
- **Cursor** — the last id or timestamp reached, so the next run is a top-up rather than a full re-crawl
- **`access_class`** — exactly one of:
  - `public` — reachable without credentials by anyone (SEC filings, public timelines, news, open forums)
  - `paid` — behind a paywall or a subscription you hold (subscriber newsletters, research portals, licensed data feeds)
  - `closed-community` — posts by named individuals inside a members-only space they did not publish to the open web

  A corpus may be both `paid` and `closed-community`; record both and treat it as the stricter.

## Resumability — mandatory above ~5 minutes of runtime

- Write a **per-unit completion marker** (a trailing sentinel line, a `.done` file, a status column). A re-run skips completed units.
- **Never** accumulate an entire crawl in memory and write once at the end. A reboot mid-run then costs the whole thing.
- Persist the cursor as you go, so an incremental top-up is an `--after <cursor>` run.
- Parallelise across units, not within a unit's pagination — pagination cursors are sequential, units are independent.

## Paid and closed-community sources

Much trading source material is **paid** (subscriber newsletters, research portals) or comes from **closed communities** whose participants are named individuals who never published to the open web.

**A repository's visibility is set by the most restrictive corpus it contains.** One `paid` or `closed-community` corpus makes the whole repo private. Do not downgrade genuinely `public` corpora by association — keep them in a separate public repo, so open data stays shareable and citable.

- Keep `paid` and `closed-community` corpora in a **private** repository. A personal archive of content the user paid for is ordinary; redistributing it is not.
- Never push a closed community's posts to a public repo, and never reproduce paid articles wholesale in a shipped deliverable — quote briefly, with attribution.
- **`derived/` carries far less of this weight than `raw/`.** Counts, rankings, scored ledgers and price joins are the user's own analysis. When something has to be shared, share `derived/`.
- State the constraint in MANIFEST.md so the next session does not have to re-derive it.

## Incremental top-up

Prefer topping up over re-crawling. Read the cursor from MANIFEST.md, fetch only units newer than it, append to `raw/`, re-run `scripts/` to rebuild `derived/`, and update the coverage, cursor and gap lines in the same commit. A corpus that is cheap to refresh gets refreshed; one that costs a full re-crawl goes stale and then gets rebuilt from scratch anyway.
