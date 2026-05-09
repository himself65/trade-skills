---
title: Roll frequency is independent from IV thesis — over-rolling kills the alpha
severity: MEDIUM
appliesTo: leaps, position-management, stock-replacement
tags: roll, vega, capital-mgmt, leaps
---

## Roll frequency is independent from IV thesis — over-rolling kills the alpha

If your thesis is "long-dated IV is cheap, lock it in via LEAPS," the optimal expression is buy-and-hold. Each ITM → ATM roll **resets vega exposure** (ATM has highest extrinsic), **cuts delta in half** (0.85 → 0.5), and **pays bid-ask twice**. The more you roll, the less of the alleged IV alpha you actually capture. Roll is a capital management decision, not an alpha generator.

**Why it matters**: The internal contradiction: "I believe far-dated vol is underpriced" + "I'll continuously reset to ATM" cancels itself out. Each roll says "I no longer want the cheap-IV exposure I locked in; give me a new ATM contract at current IV." If current IV is no longer the bargain you bought into, the roll is paying retail for what you thought was wholesale.

**How to apply**:
- Ask honestly before rolling: am I capturing IV alpha, or just taking profit because delta got high?
- **Take-profit is fine** — but call it that. Don't dress it up as an alpha capture.
- If you genuinely believe far-dated IV is cheap → **buy the deep ITM LEAPS once and hold** until thesis changes. Let delta drift.
- Roll only when:
  - Delta > 0.95 (no more directional growth from same contract)
  - Stock has moved enough that strike is far below current price (capital tied up in intrinsic, no leverage left)
  - Thesis duration extension required (rolling out in time, not strike)
- **ATM roll cost** ≈ 30-40% of contract value as new extrinsic in high-IVR names. In current MU/SNDK regime, this is brutal.
- Tactical near-term puts around catalysts are a **separate edge** — independent timing alpha. Don't bundle "roll frequency" with "tactical hedge" as one strategy. Evaluate the put-timing hit rate on its own merits.

Cross-ref: pitfall 06 (clever structures = fading conviction — over-rolling is its own clever structure), pitfall 16 (drift vs vol), pitfall 11 (LEAPS vega tax).
