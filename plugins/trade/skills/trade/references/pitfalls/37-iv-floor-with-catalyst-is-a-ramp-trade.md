---
type: Trading Pitfall
title: An IV floor with a dated catalyst 30–60 days out is a long-vega regime — express it as a ramp trade (right carrier, right clock, T−1 conversion), never as "buy options and wait"
description: When a name's IV sits in the bottom decile of its own year AND a scheduled event is 30–60 days out, the base rate is a pre-event IV ramp and the pre-event forward VRP flips negative — the vega side must be LONG, and a post-crush lull's positive trailing VRP is not evidence against it. But event-month theta at T−40 eats an average ramp; carry the vega 2–3 expiries out or in a no-event/event calendar, buy the event month only from ~T−15, and convert the long leg into a spread at T−1 instead of holding vega through the print.
severity: HIGH
appliesTo: vega, structure-selection, low-iv, pre-earnings, calendar, long-call, timing
tags: [iv-floor, iv-rank, vega, pre-earnings-ramp, theta, vega-theta-ratio, calendar, t-minus-1-conversion, vrp-window, event-clock]
timestamp: 2026-09-03T00:30:00Z
---

## An IV floor with a dated catalyst on the clock is a long-vega regime — express it as a ramp trade, not a purchase

**Severity: HIGH (the bundle recorded only the post-event crush; without the pre-event ramp it defaults to a flat or short vega stance at exactly the point where the base rate says be long)**

[Pitfall 7](07-iv-crush-favors-short.md) records what IV does *after* a print. This rule records what it does *before*: on a name whose IV sits at the floor of its own year while a scheduled event is 30–60 days out, IV ramps into the event with high regularity, and realized over the pre-event window tends to exceed the implied that could have been bought at T−30. The vega side is **long**. But "long vega" is not "buy options now and wait": at T−40 the theta of the event-month contract exceeds what an *average* ramp pays, so the expression is a choice of **carrier** (which expiry carries vega per unit of theta), **clock** (when the name's ramp historically starts), and **conversion** (turning the long leg into a spread at T−1 instead of holding vega through the crush).

**Why it matters**: two separate readings both point the wrong way at the floor. (1) [Pitfall 36](36-ivr-ranks-vol-vrp-prices-it.md) says the VRP, not IVR, decides whether vol is cheap — but the VRP measurable at the floor is the *trailing* one, and the floor is usually reached in the post-crush lull, where implied has just beaten realized for weeks. That positive trailing VRP describes the window that just ended, not the pre-event window that starts now, whose sign is different. (2) The vega-side rule in [pitfall 19](19-direction-vega-independent-axes.md) says long vega at low IVR — but the reflex expression, a long option in the event month, loses at flat spot unless the ramp reaches the historical *maximum*, because vega scales with √T while theta scales with 1/√T, and the event month has the worst ratio of the two.

**Concrete case (BE, 2026-09-02)**: IV30 84% at the 1st percentile of its year (range 78–180%, median 114%), the 1-year interpolated IV at percentile 0, earnings 55 days out. The analysis defaulted to "take direction, not a vol side" — a vega-neutral call spread — on the strength of a positive trailing VRP (IV 84 vs RV20 68; implied above subsequent realized on 25 of the last 40 aligned rows, all inside the post-crush lull). The pushback — *IVR is at zero, long vega is available* — was correct, and the name's own last four prints settled it:

| print | IV30 T−30 → T−1 | ramp | RV over T−30→T−1 | IV(T−30) − RV |
|---|---|---|---|---|
| 2025-10 | 96 → 138% | +42 | 111% | −15 |
| 2026-02 | 98 → 139% | +41 | 91% | +7 |
| 2026-04 | 104 → 118% | +14 | 107% | −3 |
| 2026-07 | 104 → 168% | +64 | 132% | −27 |

Four ramps of four, mean +40 vol points; the pre-event forward VRP negative in three of four; at T−38 the name sat ~30 points below where its IV30 usually is at that point in the cycle. Long vega was right. The expression still had to survive the theta arithmetic: an ATM call in the event month (79 DTE, vega 0.40, theta −0.22) bought at T−38 needed IV to reach **~168% at flat spot to break even at T−1** — the July peak, one case in four. The same strike 2–3 expiries out (170 DTE, vega 0.57, theta −0.15) needed only **~+18 vol on its own tenor**, which the ramp delivered in three of four cases at a 60–70% pass-through. Vega per unit of theta (days of theta paid per vol point): event month 1.8, +1 expiry 3.1, +2 expiries 3.8, +9 months 6.5 — the far end is the cheapest carrier but participates least in the ramp; two to three expiries out is the sweet spot. The no-event/event calendar (sell the pre-event expiry, buy the event expiry, same ATM strike) was the positive-carry alternative: net vega +0.10, net theta **+0.06/day**, profitable across ±30% by the front expiry if the ramp arrives and losing only beyond ±20% if it does not.

**How to apply**:

1. **Gate**: 1-year IV percentile of the relevant tenor ≤ 10 (UW `interpolated-iv` per tenor, or `iv-rank`) **and** a scheduled event 30–60 days out. Without the event this is [pitfall 21](21-event-iv-vs-demand-iv.md) territory, not this rule. With the event inside ~14 days the ramp is mostly in the price already.
2. **Measure the name's own ramp, never assume it**: from the daily IV series (UW `volatility/realized` carries `implied_volatility` per day), tabulate IV30 at T−40 / T−30 / T−20 / T−10 / T−1 / T+1 for the last four prints, and realized over T−30→T−1 against IV at T−30. Four ramps of four with a negative pre-event VRP is the green light; two of four is a coin flip — stay vega-neutral.
3. **Match the VRP window to the holding window.** A trailing VRP measured in the post-crush lull says nothing about the pre-event window. Use the forward-aligned rows *from the prior pre-event windows* (`unshifted_rv_date` inside T−30→T−1), not the latest forty.
4. **Compute the breakeven ramp before buying anything naked**: for the candidate contract at flat spot on T−1, solve for the IV that returns the premium paid. If it needs the name's historical maximum, do not buy it now — either (a) move the vega 2–3 expiries out (vega/theta scales with √T; assume 60–70% ramp pass-through at 3–6 months, 40–50% at a year), (b) buy the no-event/event **calendar** for positive carry, or (c) wait and buy the event month at ~T−15, when the remaining theta is small against the ramp still ahead.
5. **Convert at T−1, do not hold vega through the print.** Sell the upper strike against the long leg on the last session before the event, into the ramped IV — the short leg is sold at its richest and the position becomes a defined spread before the crush ([pitfall 7](07-iv-crush-favors-short.md)). In the case above, buying the long leg at the floor and selling the short leg at T−1 priced the same 50-wide spread at ~$11.5 at flat spot and at a *credit* with spot +10%, versus ~$15 to buy the spread outright at the floor.
6. **Long delta + long vega is the same trade split in time**: a bull call spread is a long call and a short call entered *together*; entering the long leg at the floor and the short leg at T−1 is the long-vega version of the identical directional view. Size it on the cut level (−40% of premium, or the structural stop), not on the full premium, and count it as leveraged speculation, not stock replacement (the delta ≥0.85 LEAPS rule in [`../strategies.md`](../strategies.md) does not apply).
7. **Direction is untouched by any of this.** The IV floor moves the vega side only ([pitfall 19](19-direction-vega-independent-axes.md)); the bull-conviction count and the asymmetry rule ([pitfall 24](24-capped-upside-vs-bull-conviction.md)) still size and shape the delta.

**Cross-references**:
- [Pitfall 7](07-iv-crush-favors-short.md) — the crush after the event; this rule is the ramp before it, and step 5 is where the two meet
- [Pitfall 19](19-direction-vega-independent-axes.md) — the vega-side rule this one makes mechanical at the low end
- [Pitfall 36](36-ivr-ranks-vol-vrp-prices-it.md) — VRP decides edge; this rule adds that the VRP must be measured over the window you will hold, and the pre-event window has its own sign
- [Pitfall 11](11-leaps-vega-tax.md) — the mirror failure: long-dated vega bought *at* the peak
- [Pitfall 21](21-event-iv-vs-demand-iv.md) — the no-event case, where a low percentile has no ramp to lean on
- [`../ticker/be-2026-09.md`](../ticker/be-2026-09.md) — the arc this was found in
- [`../unusual-whales.md`](../unusual-whales.md) — `interpolated-iv` (percentile per tenor), `volatility/realized` (daily IV plus forward-aligned RV)
