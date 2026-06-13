---
type: Trading Pitfall
title: AH order-book lopsidedness is a fade signal at extremes
description: When AH bid/ask size ratio exceeds 5:1 at a price extreme, thin liquidity is driving the move and it likely reverts within 30-60 min.
severity: MEDIUM
appliesTo: after-hours, scalping
tags: [order-book, fade, ah, mean-reversion]
timestamp: 2026-05-09T02:45:35Z
---

## AH order-book lopsidedness is a fade signal at extremes

When AH bid/ask size ratio exceeds 5:1 in either direction at a price extreme (within 1% of AH high or low), the move is being driven by thin liquidity and is highly likely to revert.

**Why it matters**: APP case — AH peak $483.5 had ask size 310 vs bid size 30 (10:1). Reverted to $476 within 40 minutes. Selling Call Spread or shorting leveraged proxy at the lopsided extreme captures this reversion.

**How to apply**:
- Check bid/ask size ratio at AH extremes
- 5:1 ask-heavy at AH high → fade with short call spread or leveraged-proxy short
- 5:1 bid-heavy at AH low → fade with bull put spread or leveraged-proxy long
- Best between 18:00–20:00 ET (book is real but retail asleep — good signal-to-noise)
- **Not a position trade** — book within 30–60 minutes

Reference: `../ticker/app-2026-05.md` — fade at $483.5 AH peak captured ~$5 reversion within 40 min.
