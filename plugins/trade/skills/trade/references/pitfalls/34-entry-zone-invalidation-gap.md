---
type: Trading Pitfall
title: An entry zone and an invalidation level are two different prices — when the zone's lower bound touches the stop, the plan is unexecutable and the sizing formula degenerates
description: Publishing "buy $216–235" alongside "below $216 I'm wrong" gives the bottom of your own zone a zero-width stop, so size = risk$ / stop distance diverges and the buy signal and the wrong signal fire at the same price. Requires a measured gap, (E_low − S) / ATR >= 0.5, and a deliberate choice between lifting the entry, deepening the stop, or splitting the entry into tranches with different stops.
severity: HIGH
appliesTo: entry-timing, position-sizing, risk-management, directional, swing, post-event, trade-planning
tags: [entry-zone, invalidation, stop-placement, position-sizing, atr, noise-band, trade-plan, retracement, post-event, degenerate-sizing]
timestamp: 2026-08-19T14:40:00Z
---

## An entry zone and an invalidation level are two different prices — they need a measured gap

A trade plan that carries both an **entry zone** `[E_low, E_high]` and an **invalidation level** `S` encodes two opposite instructions. If `E_low` touches or crosses `S`, the plan is not merely imprecise — it is **unexecutable**, and it fails at the exact moment it is needed.

Three things break at once:

1. **The sizing formula degenerates.** [Pitfall 30](30-stop-distance-determines-size.md) fixes the causal order: invalidation → stop distance → `size = risk$ ÷ (stop distance × point value)`. At the bottom of the zone the stop distance is **zero**, so the size the formula returns is **unbounded**. Anywhere near the bound it is merely absurd rather than infinite, which is worse, because it looks like a number.
2. **The two signals fire simultaneously.** The session that first reaches your entry zone is the same session that touches your stop. The plan says "buy" and "you were wrong" at one price.
3. **Every R:R claim in the plan is fictional.** A target measured against a stop you cannot place is not a ratio.

**Why it matters**: the collision is **structural, not careless**. The two numbers come out of two different analyses performed at different moments. The entry zone answers *"where would I like to own this?"* — retracement levels, prior support, value. The invalidation answers *"where is the thesis dead?"* — the structural low. On any name that has just made a large directional move, **the most attractive entry is usually the event-day low, and the event-day low is also the natural invalidation.** The same price is the best place to buy and the proof you are wrong. Nothing warns you, because each number is defensible on its own; only their *geometry* is broken, and geometry is what nobody re-checks before publishing.

This survives a correct pitfall-30 derivation. You can get the causal order perfectly right and still write an entry that makes the derivation divide by zero.

**How to apply**:

### 1. Run the gap test before publishing any plan with both numbers

```
margin = (E_low − S) ÷ ATR        # ATR on the holding timeframe
```

| margin | verdict |
|---|---|
| < 0.25 | **unexecutable** — the bottom of your own zone has no survivable stop |
| 0.25 – 0.5 | only valid if `S` sits beyond a second, independent structural level |
| ≥ 0.5 | workable — same noise-band logic as pitfall 30 |

The requirement is that the **tightest trade your own plan permits** still clears the noise band. Checking the midpoint of the zone is not enough; check `E_low`.

### 2. Publish the sizing table — it takes 30 seconds and the bottom row is the tell

| entry | stop | distance | ÷ ATR | size @ risk $5,000 |
|---|---|---|---|---|
| `E_high` | `S` | wide | ok | small |
| midpoint | `S` | ... | ... | ... |
| **`E_low`** | `S` | **→ 0** | **→ 0** | **→ ∞** ← if this row is absurd, the zone is wrong |

### 3. Resolve the collision deliberately — pick exactly one, never leave both published

- **Lift the entry**: `E_low := S + k·ATR`, `k ≥ 0.5`. You give up the best price in exchange for a plan that can be executed. Usually correct.
- **Deepen the stop**: if you genuinely intend to buy *at* the structural level, then `S` must move down to the next independent level (prior consolidation, pre-event close, next retracement). Size shrinks proportionally — that is the honest cost of buying the low, not a reason to skip the step.
- **Split the entry into tranches**: a starter above `S` sized off the wide stop, plus an add **only on a volume-confirmed hold** ([pitfall 27](27-retest-entry-confirmation.md)). The two tranches carry different stops and different sizes; write both.

### 4. The prose tell

If a plan contains, in the same document, a sentence of the form *"entry zone $A–$B"* and a sentence of the form *"below $A the thesis is dead"* — stop and fix it before anything else. Those two sentences cannot both be acted on.

### 5. Generalize to any pair of opposite-action levels

The same geometry check applies wherever two published levels trigger opposite actions:

- entry zone vs stop
- add / average-down level vs de-gearing level ([pitfall 31](31-daily-loss-limit-drawdown-governor.md))
- take-profit zone vs trailing stop
- "buy the dip" band vs "structure broken" line

Any two such levels need a gap measured in volatility units, not a shared number.

### Case reference

[`../ticker/nbis-2026-08.md`](../ticker/nbis-2026-08.md) — a post-earnings plan named an entry zone of **$216–235** and an invalidation at **$216.11** (the earnings-day low) in the same message. Five sessions later a convertible-note issuance drove a one-off delta-hedge flow of roughly 40–70% of ADV; the stock entered the zone and printed through the low intraday on ~2x average volume. At that moment the plan instructed both "enter" and "you are wrong" at the same price, and the position-sizing formula returned an unbounded size at the zone's lower bound. The underlying analysis — mechanical-versus-structural, the fair-value work, the flow read — was unaffected; only the geometry of the two published levels was broken.
