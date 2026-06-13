---
type: Trading Pitfall
title: Don't conflate drift with vol; BSM already prices log-normal paths
description: BSM prices log-normal paths, so "long-dated IV too cheap because stocks compound" is wrong; drift is not vol. Reject before building a LEAPS thesis.
severity: HIGH
appliesTo: leaps, iv-thesis, vol-mispricing
tags: [bsm, drift, vol, term-structure]
timestamp: 2026-05-09T03:02:13Z
---

## Don't conflate drift with vol; BSM already prices log-normal paths

Arguments like "long-dated IV is too cheap because stocks grow exponentially" or "BSM assumes normal distribution so far-dated vol is mispriced" are technically wrong and get rejected on first contact. BSM assumes **log-normal** price distribution — exponential growth paths are already priced in. IV measures the volatility of returns, not the directional drift.

**Why it matters**: Building a thesis on this misconception leads to over-allocating to long-dated long options to "capture mispriced vol." When the alleged mispricing doesn't exist, you're paying full vol risk premium and full theta on a thesis that has no edge. Worse, the strategy that follows ("DCA + roll LEAPS") doesn't actually exploit the alleged mispricing even if it were real (see pitfall 18).

**How to apply**:
- Reject "BSM uses normal distribution" as an argument. It uses log-normal. This stops the discussion if you say it.
- A stock that smoothly compounds 50%/yr can have **lower** realized vol than a stock that ranges ±30%. Drift ≠ vol.
- If you actually want to argue long-dated vol is cheap on a name, compare **historical realized vol on cycle peaks** vs **current implied vol** — not distribution shape.
- The honest defensible version: "in cycle-on regimes, directional moves and vol expansion are correlated, so long-dated calls have a built-in vol kicker if my direction is right." This is conditional on cycle phase, not a permanent edge.
- Vol risk premium normally makes implied > realized on average. Claiming "implied is systematically too low" reverses the long-run pattern — needs strong evidence.

Cross-ref: pitfall 11 (LEAPS vega tax), pitfall 18 (roll frequency vs IV thesis).
