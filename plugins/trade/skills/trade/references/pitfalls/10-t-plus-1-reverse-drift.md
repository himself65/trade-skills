---
type: Trading Pitfall
title: T+1 reverse drift — AH price doesn't predict next-day open
description: Initial after-hours earnings reaction often reverses by next-day open; default exit/reload to T+1 morning, not T+0 AH.
severity: HIGH
appliesTo: earnings, after-hours
tags: [ah, t+1, exit-timing]
timestamp: 2026-05-09T02:45:35Z
---

## T+1 reverse drift — AH price doesn't predict next-day open

Initial AH reaction (16:00-20:00 earnings night) often reverses by next-day open. Sell-side notes drop overnight, rating actions hit pre-market, and T+1 sentiment can flip the AH read entirely.

**Why it matters**: A stock that recovers from a sharp AH dip to nearly flat by 21:00 EST can still gap down the next morning and drift further intraday. Extrapolating "AH stabilization" forward leads to over-confident hold decisions overnight.

**How to apply**:
- Don't anchor decisions on 16:00-17:00 AH (still active price discovery)
- 18:00-20:00 AH is more informative but still only ~50% of the eventual T+1 reaction
- Plan for a **2-day window**: T+0 AH + T+1 open. T+1 morning is the "real" price discovery moment
- Sell-side downgrades typically post 6-9 PM EST and hit pre-market
- Default exit/reload decisions to T+1 morning unless a position is already at structural max profit (in which case lock at T+0 AH)

Reference: `../ticker/mag7-2026-q1.md` — MSFT recovered intraday AH but gapped down on T+1, costing thesis-correct holders.
