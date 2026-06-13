---
type: Trading Pitfall
title: Take-profit discipline beats target-price obsession (in volatile tapes)
description: In manipulator/high-vol names, book 60-70% of expected move and close short legs at +50% credit instead of holding for full target.
severity: MEDIUM
appliesTo: volatile-tape, exit
tags: [take-profit, discipline, mechanical-exit]
timestamp: 2026-05-09T02:45:35Z
---

## Take-profit discipline beats target-price obsession

In manipulator/high-vol names, **book 60–70% of expected move** rather than waiting for full target. The marginal last 30% of expected move is rarely worth the hold-time risk.

**Why it matters**: APP case (May 2026): I quoted $510 6M target. User exited APPX at $490 — left ~$20 on the table but avoided 3+ days of pump-dump risk. Each subsequent round-trip earned more than the marginal $20 would have.

**How to apply**:
- For trades held days-to-weeks: book at 60–70% of expected move
- For credit spreads / Jade Lizards: close short legs at +50% of max credit (mechanical Tasty rule)
- For long premium: scale out — 1/3 at +50%, 1/3 at +100%, 1/3 trail with stop
- Never wait for theoretical max profit on event-driven structures

Reference: `../ticker/app-2026-05.md` — closed Jade Lizard short legs at +50%, sold call spread at AH peak $500, exited APPX at $490 vs $510 target. All subscale exits beat full-target hold.
