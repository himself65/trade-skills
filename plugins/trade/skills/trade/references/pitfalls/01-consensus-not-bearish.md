---
type: Trading Pitfall
title: Don't treat "price at analyst consensus" as a bearish signal
description: Consensus is a trailing indicator; price hitting the target usually means estimates are being revised up, not capped — check revision velocity.
severity: HIGH
appliesTo: directional, earnings
tags: [consensus, momentum, anchoring]
timestamp: 2026-05-09T02:45:35Z
---

## Don't treat "price at analyst consensus" as a bearish signal

Analyst consensus is a **trailing indicator**. Price leads analysts, not the reverse. When stock reaches consensus target, consensus is usually being revised higher.

**Why it matters**: Anchoring bearish because "price = consensus" ignores that the consensus itself has been rising. If last-month avg >> last-quarter avg, analysts are catching up to momentum, not capping it.

**How to apply**:
- Check the *velocity* of consensus revisions, not just the level
- Rising consensus + rising price = trend intact, not exhaustion
- Pull `analyst price-target-summary` and compare 1M vs 1Q vs 1Y averages

Reference: `../ticker/intc-2026-04.md` — anchored bearish on $66 = $66 consensus, ignored consensus rising $47 → $55 → $66 in 3 months.
