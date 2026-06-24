---
type: Changelog
title: Trade Knowledge Base — Change Log
description: Chronological history of the curated trade knowledge bundle — pitfalls, case studies, and frameworks added over time.
tags: [log, changelog, history]
timestamp: 2026-06-13T00:00:00Z
---

# Change Log

OKF reserved `log.md` — chronological history of this knowledge bundle, most recent first. Seeded from git history; append a dated entry whenever you add or materially revise a concept (see [`OKF.md`](OKF.md) conformance checklist).

## 2026-06-24 — MU case study (post-print direction read)

- Added [`ticker/mu-2026-06.md`](ticker/mu-2026-06.md) — FY26Q3 blowout beat (rev +16%, EPS +21%, topping even Funda's aggressive preview). Analyst-side error: called "sell-the-news" off an early AH snapshot (+3.6% @ 16:05) plus full-day flow (−$3.4M); corrected when AH accelerated to +9% and **post-event** flow was +$72.5M bullish. Lesson: post-print, sample the AH price **trend** (not a snapshot) and use **post-event** flow (not full-day); reaction-magnitude ≠ direction. Sister case to NOK 2026-04 (pattern published ahead of the current data).
- Cross-linked into [`commands/analysis.md`](commands/analysis.md) post-earnings rows.

## 2026-06-22 — `/trade report` subcommand (daily capital-flow read)

- Added [`commands/report.md`](commands/report.md) — a standalone `/trade report [tickers | basket]` flow that builds a daily **资金流向 (散户 / 大单 / 机构)** read from **Funda options premium-flow** (`options-volume` bullish/bearish premium, net call/put premium, ask-vs-bid volume, `flow-alerts`) + `news/sentiment`, because no stock-side three-layer net-flow feed is available here (the moomoo / Futu three-layer flow needs a logged-in FutuOpenD gateway + `futu-api`). Encodes the 口径 caveats, the 聪明钱 classification (🟢 confirmed long / 🔴 价涨期权背离-distribution / 🟡 price-only-unconfirmed / ⚖️ earnings two-sided), the `flow-alerts` 200-row truncation trap, and the quote-endpoint trap (use `stock-price?ticker=` for day change; `quotes?type=realtime/price-change` 400s).
- Wired into [`../SKILL.md`](../SKILL.md): new Commands-table row, `report` added to routing rule 2, a capital-flow routing exception (资金流向 / 流入流出 → `report`, not `analysis`), and a refreshed frontmatter description/triggers (kept under the 1024-char `skill-lint` cap). Indexed in [`index.md`](index.md). Cross-linked to pitfalls 02 (single flow ≠ smart money) and 17 (dealer flow ≠ retail).

## 2026-06-18 — Pitfall 27 + 6981 case study (retest entry-timing)

- Added [`pitfalls/27-retest-entry-confirmation.md`](pitfalls/27-retest-entry-confirmation.md) — a pullback entry is the **volume-confirmed hold, not the touch**; a pullback is a Schelling-point retest (key MA / prior high / gap), not an indicator; on extended/parabolic names the nearest real support can be −15 to −25%, so quantify extension first; a blow-off long-upper-wick at a new high is exhaustion, not an entry. The execution layer of the price-action framework (P4 / P5 / P6 / P8).
- Added [`ticker/6981-2026-06.md`](ticker/6981-2026-06.md) — Murata's 2026-06-18 new-ATH blow-off (+187% over its 200-day; ~1-ATR upper wick on 174% volume); worked example of the 3-zone retest ladder, with the honest data caveat that OSE flow / IV were not pullable via TradingView / Funda.
- Cross-linked pitfall 27 into [`commands/analysis.md`](commands/analysis.md) (a new entry-timing / pullback / chasing-extension row) and [`price-action-framework.md`](price-action-framework.md) (cross-references).
## 2026-06-15 — Pitfall 26 + SATS case study

- Added [`pitfalls/26-stock-consideration-share-vs-dollar-anchored.md`](pitfalls/26-stock-consideration-share-vs-dollar-anchored.md) — for stock-based deal consideration, verify **share-anchored vs dollar-anchored** (and normalize the **split basis**) from the primary agreement before pricing flow-through; a fixed reference price means a fixed share count that marks to market.
- Added [`ticker/sats-2026-06.md`](ticker/sats-2026-06.md) — EchoStar (SATS) SpaceX/AT&T spectrum-sale SOTP; an analyst-side error (share-anchored consideration mis-read as dollar-fixed → ~5x NAV error) caught by the tape and corrected from primary filings.
- Cross-linked pitfall 26 into [`commands/analysis.md`](commands/analysis.md) via a new M&A / SOTP / stock-consideration situation row.

## 2026-06-13 — OKF v0.1 alignment

- Adopted [Open Knowledge Format v0.1](OKF.md): added OKF-standard frontmatter (`type`, `title`, `description`, `tags`, `timestamp`) to every pitfall, case study, and framework, preserving existing domain extension fields.
- Added the reserved [`index.md`](index.md) bundle root, per-directory `index.md` indexes (with one-line `README.md` stubs), [`log.md`](log.md), and the [`OKF.md`](OKF.md) conformance & mapping document.
- The user-private knowledge directory (scaffolded by `/trade setup`) is now described as a second OKF bundle.

## 2026-06-05 — Pitfall 25 + VIX case study

- Added [`pitfalls/25-vix-options-futures-mechanics.md`](pitfalls/25-vix-options-futures-mechanics.md) — VIX options price off VIX futures, not spot (contango bleed, sub-1 futures beta, debit-spread skew bite).
- Added [`ticker/vix-2026-06.md`](ticker/vix-2026-06.md) — VIX call spreads track the future, not spot.
- Extended [`strategies.md`](strategies.md) with the VIX section.

## 2026-05-29 — MDB case study

- Added [`ticker/mdb-2026-05.md`](ticker/mdb-2026-05.md) — the SNOW asymmetry lesson applied correctly the next day; the bull-conviction count needs a quality/inversion overlay, not just a tally.

## 2026-05-27 — Pitfall 24 + SNOW case study (asymmetry axis)

- Added [`pitfalls/24-capped-upside-vs-bull-conviction.md`](pitfalls/24-capped-upside-vs-bull-conviction.md) — capped-upside structures are forbidden in high-conviction bull setups; asymmetry is a third axis beyond direction and vega.
- Added [`ticker/snow-2026-05.md`](ticker/snow-2026-05.md) — canonical Jade-Lizard-in-a-bull-tail failure.

## 2026-05-25 — Pitfall 23 + CBRS update

- Added [`pitfalls/23-hazard-rate-discounting.md`](pitfalls/23-hazard-rate-discounting.md) — discounting is a hazard rate, not just time-value.
- Updated [`ticker/cbrs-2026-05.md`](ticker/cbrs-2026-05.md) — Day-1 long stock cut for a loss.

## 2026-05-19 — Pitfall 22

- Added [`pitfalls/22-yields-not-causal.md`](pitfalls/22-yields-not-causal.md) — bond yields don't "cause" equity moves.

## 2026-05-15 — CBRS IPO case study

- Added [`ticker/cbrs-2026-05.md`](ticker/cbrs-2026-05.md) — hot AI IPO modeling and the lock-up front-run framework.

## 2026-05-13 — Price-action framework + TSEM case study

- Added [`price-action-framework.md`](price-action-framework.md) — orderbook microstructure mental model.
- Added [`ticker/tsem-2026-05.md`](ticker/tsem-2026-05.md) — structure-selection lessons (right direction, wrong structure).

## 2026-05-11 — Pitfalls 20-21 + NOK case study

- Added [`pitfalls/20-post-earnings-momentum-vs-fade.md`](pitfalls/20-post-earnings-momentum-vs-fade.md) and [`pitfalls/21-event-iv-vs-demand-iv.md`](pitfalls/21-event-iv-vs-demand-iv.md).
- Added [`ticker/nok-2026-04.md`](ticker/nok-2026-04.md) — post-earnings momentum continuation + demand-driven IV.

## 2026-05-10 — Pitfall 19

- Added [`pitfalls/19-direction-vega-independent-axes.md`](pitfalls/19-direction-vega-independent-axes.md) — direction and vega are independent axes; match both to regime.

## 2026-05-08 — Foundation

- Initial curated library: pitfalls 01-18, [`strategies.md`](strategies.md) (incl. LEAPS stock replacement), [`gamma-framework.md`](gamma-framework.md), and the first case studies ([`ticker/intc-2026-04.md`](ticker/intc-2026-04.md), [`ticker/mag7-2026-q1.md`](ticker/mag7-2026-q1.md), [`ticker/app-2026-05.md`](ticker/app-2026-05.md)).
- Converted the repo into the `/trade` skill with the tree-structured reference layout.
