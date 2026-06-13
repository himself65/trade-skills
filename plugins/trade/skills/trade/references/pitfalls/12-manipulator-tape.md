---
type: Trading Pitfall
title: Recognize "manipulator-tape" names — sell premium, don't buy direction
description: High-IV pump-dump names (APP, MSTR, COIN, PLTR) oscillate faster than conviction; sell premium and scalp proxies instead of buying calls.
severity: HIGH
appliesTo: high-vol, single-name
tags: [manipulator, premium-selling, scalping]
timestamp: 2026-05-09T02:45:35Z
---

## Recognize "manipulator-tape" names — sell premium, don't buy direction

Some high-IV names trade with heavy market-maker / large-trader pump-dump patterns. Frequent ±3% intraday swings without news, $10–20 AH wicks on thin liquidity, and programmatic algo selling on specific keywords. **For these names, premium-selling and oscillation-scalping outperform directional buying.**

**Why it matters**: A correct directional thesis can still lose money in a manipulator tape because the price oscillates faster than your conviction window. Buying calls in these names is paying for vol that will be harvested by the next pump-dump cycle.

**How to apply**:
- Tickers that fit the pattern (initial list, expand over time): APP, MSTR, COIN, PLTR, DJT, TSLA (occasional)
- Default structure: Jade Lizard / Iron Condor / Bull Put Spread (sell premium)
- Pair with: scalp leveraged proxy (APPX for APP, MSTU for MSTR, etc.) on the oscillation
- **Avoid**: Long-dated call buying — vol will be harvested out from under you

Reference: `../ticker/app-2026-05.md` — APP earnings: Jade Lizard captured premium, APPX scalped 3 round trips on oscillation. Net profitable despite no directional alpha.
