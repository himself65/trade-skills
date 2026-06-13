---
type: Trading Pitfall
title: IV crush benefits SHORT premium structures, not long ones
description: High IV Rank (>70) favors selling premium; long premium can lose even when direction is right because IV crush kills vega.
severity: HIGH
appliesTo: earnings, high-iv
tags: [iv-crush, vega, structure-selection]
timestamp: 2026-05-09T02:45:35Z
---

## IV crush benefits SHORT premium structures, not long ones

High IV Rank (>70) favors **selling** premium (credit spreads, short puts, iron condors). It hurts long premium (debit spreads, naked long options), even if direction is right.

**Why it matters**: A long put at IV 95% with IV crush to 50% can lose money even on a correct bearish call. Direction right + structure wrong = loss.

**How to apply**:
- High IV Rank + directional view → default to credit structures (sell premium)
- Only buy premium when IV is low OR directional conviction is very high
- Always ask: "Does my structure benefit from or suffer from IV crush?"
- Pre-earnings IV >100% → never buy naked options through the print

Reference: `../ticker/app-2026-05.md` — IV Rank 50% pre-earnings + 150% on 5/8 weeklies → Jade Lizard captured the IV crush instead of paying it.
