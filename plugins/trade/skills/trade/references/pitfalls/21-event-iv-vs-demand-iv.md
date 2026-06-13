---
type: Trading Pitfall
title: Elevated IV without a near-term event = demand-driven (sustains), not event-driven (crushes) — check the catalyst clock + flow first
description: Before calling IV crush on high IVR, check catalyst clock and net options flow — demand-driven IV sustains for weeks while event-IV mean-reverts.
severity: HIGH
appliesTo: iv-elevation, structure-selection, vega, flow-analysis
tags: [iv-crush, flow-check, demand-iv, event-iv, catalyst-clock]
timestamp: 2026-05-11T18:05:43Z
---

## Elevated IV without a near-term event = demand-driven, not event-driven — check catalyst clock + flow first

IV crush is reflexively expected at any IV Rank >65. But IV elevation has **two distinct sources** with opposite forward dynamics: **event-driven IV** (pre-earnings, FDA, regulatory) mean-reverts hard after the event, while **demand-driven IV** (sustained options buying on thematic narrative) can persist or expand for weeks. Recommending vega-short structures based on IV level alone — without checking what's *causing* the IV — is the dominant failure mode when reading elevated IV in a momentum theme stock.

**Why it matters**: A stock can sit at IV Rank 65-75 for 4-8 weeks during a thematic re-rate while net options flow stays heavily call-side positive. Assuming "IV is too high, must crush" leads to (a) selling premium into a sustained bid (vega + delta both wrong), or (b) rolling out of long-vol positions just as IV continues to expand. The standing pitfall 7 ("high IV favors short premium") is correct *for event-driven IV*; it under-specifies the demand-driven case.

Concrete failure (NOK 2026-05-11): NOK at IV Rank 66, IV 74%. I recommended "roll Jan-27 $14C to Jan-28 $15C because IV crush is coming." User pushed back: "钱才刚刚进入" (money is just flowing in). Net options premium check showed:
- Net CALL premium: **+$14.23M** (massive buy)
- Net PUT premium: -$0.87M (puts being sold)
- Net Directional: **+$15.10M** (vs -$2.06M same metric 3 weeks earlier pre-earnings)
- $848K single block buy at $16C 9/18 OTM
- $1.8M cumulative at $25C 1/27 (deep OTM lottery, multiple buyers)
- Q2 earnings still 2 months away — no near-term event

**No event → IV elevation is reflecting genuine option demand from accumulating institutions, not pre-event speculation. IV will sustain or expand, not crush.**

**How to apply**:

1. **Before calling IV crush, check the catalyst clock**:
   - Days to next earnings? <14 days = event-driven IV (will crush hard post-print)
   - 14-45 days to earnings = mixed (event premium is building but not dominant)
   - >45 days to earnings AND IVR elevated = **demand-driven default** — investigate flow before assuming crush

2. **Always pull net premium data before making a vega recommendation**:
   ```
   Funda API: /v1/options/stock?ticker=X&type=net-prem-ticks
   ```
   - Net call premium >+$5M/day on 3+ consecutive days = sustained institutional accumulation
   - Net premium turning negative or sharply bid-side = event-style top forming
   - Check for "block clusters" — a single $400K+ trade or 5+ trades in one strike inside 30 minutes = real institution at work

3. **Catalysts that drive sustained demand-IV (not event-IV)**:
   - Thematic re-rate (AI optical, weight-loss drugs, crypto cycle)
   - Sector index inclusion / large fund accumulation
   - KOL / social momentum on previously-underowned name
   - Multi-stock co-rally (peers also bid)
   - Newly initiated coverage with Buy ratings cascading

4. **Distinguish demand-IV from event-IV by structure of the curve**:
   - Event-IV: front-week IV >> back-month IV (steep term skew toward catalyst date)
   - Demand-IV: all expiries elevated proportionally; back-month LEAPS IV also high (real vol bid)
   - Demand-IV often shows ATM AND OTM IV elevated (long call bid pushes OTM IV)

5. **When you DO see demand-driven IV elevation**:
   - Don't sell premium reflexively
   - Don't roll out of long-vol positions
   - If anything, the long-vol side is being underpaid in real-money — let it run
   - The legitimate "sell premium" trigger comes when net premium turns negative for 2+ days

6. **The dialectic with pitfall 7**:
   - Pitfall 7: "High IV Rank → sell premium" — TRUE when IV is event-driven (pre-earnings, etc.)
   - Pitfall 21: "But check the source first" — sustained-demand IV doesn't crush on a calendar; it crushes when demand flow reverses
   - Both rules together: **IV regime + flow data + catalyst clock → structure decision**

**When the rule does NOT apply (event-IV is real)**:
- <14 days to earnings → assume event-driven, IV will crush regardless of flow
- Stock had a one-time catalyst that just resolved (M&A close, settlement) — IV will fall as event-vol unwinds
- Net premium negative + IV elevated → distribution / hedging IV, will normalize once distribution stops

**Quantitative thresholds for "IV will sustain"**:
- IVR >50 AND
- No earnings/event in next 30 days AND
- Net call premium positive on 5-day rolling sum AND
- Sector index +5% trailing 5 days
- → Sustained-demand IV regime. Treat as "real vol bid", not "peak to fade."

**Cross-references**:
- Pitfall 7 — IV crush favors SHORT premium (the event-IV case)
- Pitfall 2 — single flow ≠ smart money (but **net flow >$10M with multiple blocks IS information**, not a single trade)
- Pitfall 17 — dealer flow + 0DTE drives moves (the dealer side of the demand-IV story)
- Pitfall 20 — post-earnings momentum continuation (often co-occurs with demand-IV)
- `../ticker/nok-2026-04.md` — the demand-IV misread case study
- `../gamma-framework.md` — combines flow, OI, and dealer positioning for the full picture
