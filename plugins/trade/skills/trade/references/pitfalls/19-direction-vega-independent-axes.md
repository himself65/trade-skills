---
type: Trading Pitfall
title: Direction and vega are independent axes — match BOTH to regime
description: Match both delta and vega to IV regime; a bullish view can be expressed long- or short-vega, so wrong vega loses even when direction is right.
severity: HIGH
appliesTo: directional, structure-selection, low-iv, high-iv
tags: [vega, structure-selection, credit-vs-debit, iv-regime]
timestamp: 2026-05-11T05:31:54Z
---

## Direction and vega are independent axes — match BOTH to regime

A bullish view ≠ a bullish structure. Direction (long/short delta) and vega (long/short premium) are **two separate axes** that must each match the current regime. The same directional view can be expressed by structures with opposite vega — picking the wrong vega side is direction right + structure wrong.

**Why it matters**: A "bullish" label hides which side of vega you're on. Four common bullish structures, four different vega signs:

| Structure | Net delta | Net vega | Net theta |
|---|---|---|---|
| Bull call debit spread | + | **+ (long vega)** | small − |
| Bull put credit spread | + | **− (short vega)** | + |
| Long call | + | + | − |
| Short put | + | − | + |

At **low IVR (<30)**, long vega is favored — IV mean-reverts upward, debit structures gain on both axes. At **high IVR (>70)**, short vega is favored — IV mean-reverts downward, credit structures gain on both axes. **Selecting a short-vega structure at low IV (or vice versa) means you can lose money even when direction is right**, because the vega leg works against you.

Concrete failure (ISRG 2026-05-10): bullish view at IVR 26 → bull put credit spread recommended. Direction correct; vega wrong. Credit collected ($1.35) was suppressed by low IV, but max loss ($8.65) was fixed by strike distance — yielding 1:6.4 R/R. The corresponding bull call **debit** spread at 455/475 had R/R 1:1.5 and was long vega (IV expansion would have added to the win). Same direction, completely different trade.

**How to apply**:

1. **After picking direction, re-derive the structure from the IV regime — do not skip this step.**
   - Low IVR (<30) → debit (long premium, long vega)
   - High IVR (>70) → credit (short premium, short vega)
   - Mid IVR (30–70) → either acceptable; prefer debit if you expect IV to rise into a catalyst, credit if you expect IV decay through a quiet window.
2. **Read the credit/debit label, not the "bull/bear" label.** "Bull put spread" sounds bullish but the premium side is short — verify by checking the net cash sign (credit = short premium, debit = long premium).
3. **Sanity-check the net vega sign before submitting**: long-vega structure at IVR <30 ✓, short-vega at IVR >70 ✓. Anything else needs an explicit written reason (e.g., "I expect IV to compress further because X").
4. **When pushed back on a structure**, first ask: is the pushback about direction, vega, or both? Don't flip direction in response to a vega complaint — that creates two errors instead of one.

**Cross-references**:
- Pitfall 7 — IV crush benefits short premium (the high-IV mirror of this rule)
- Pitfall 6 — clever structures signal fading conviction (don't rationalize a wrong-vega pick with strike geometry)
- `../strategies.md` — Structure-to-regime matching table
