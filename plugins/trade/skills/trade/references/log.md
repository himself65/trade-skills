---
type: Changelog
title: Trade Knowledge Base — Change Log
description: Chronological history of the curated trade knowledge bundle — pitfalls, case studies, and frameworks added over time.
tags: [log, changelog, history]
timestamp: 2026-06-13T00:00:00Z
---

# Change Log

OKF reserved `log.md` — chronological history of this knowledge bundle, most recent first. Seeded from git history; append a dated entry whenever you add or materially revise a concept (see [`OKF.md`](OKF.md) conformance checklist).

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
