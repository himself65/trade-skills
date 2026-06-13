---
type: Trading Pitfall
title: LEAPS through earnings = unhedged vega tax
description: Holding a LEAPS through earnings is an implicit short-vol bet; IV crush is guaranteed directionless bleed unless explicitly hedged.
severity: HIGH
appliesTo: leaps, earnings
tags: [vega, iv-crush, hedge]
timestamp: 2026-05-09T02:45:35Z
---

## LEAPS through earnings = unhedged vega tax

Long-dated long options carry meaningful vega. Earnings IV crush represents a guaranteed loss component independent of direction. Holding a LEAPS through earnings without hedging is implicitly a short-vol bet.

**Why it matters**: A LEAPS with vega ~1.4/share loses ~$140 per 1pp of IV crush per contract. Earnings IV crush of 4-6pp on LEAPS = ~$500-800 of guaranteed bleed per contract regardless of stock direction. The stock has to rally meaningfully just to break even on the IV component before any direction P&L kicks in.

**How to apply**:
- **Calculate vega tax explicitly** before earnings: `vega × 100 × estimated IV crush in pp`
- Choose one explicit response:
  1. Buy short-dated put as vega-tax insurance (cheap relative to vega bleed if direction goes wrong)
  2. Convert LEAPS to diagonal (sell front-week call against LEAPS) — short call IV crush partially offsets
  3. Close LEAPS pre-earnings, re-enter post-IV-crush at lower IV
  4. Accept the bleed and reduce sizing
- Never hold LEAPS through earnings without consciously choosing one of these
- Sector mood + capex panic can compound vega tax with delta loss → catastrophic LEAPS days exist

Reference: `../ticker/mag7-2026-q1.md` — MSFT LEAPS held through earnings hit by combined vega tax + AI capex sentiment loss.
