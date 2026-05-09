---
title: Dealer flow + 0DTE drive options-related price moves, not retail psychology
severity: HIGH
appliesTo: options-flow, expiry, dealer-gamma
tags: dealers, flow, retail-fallacy, gamma
---

## Dealer flow + 0DTE drive options-related price moves, not retail psychology

Stories like "CC sellers will buy back to avoid taxes" or "put buyers won't sell stock" describe retail behavior, not market drivers. Market makers and systematic short-vol funds dominate options supply — they delta-hedge dynamically, are agnostic to assignment and taxes, and price IV based on hedging cost + risk premium. Retail flow is a price-taker on large-caps.

**Why it matters**: Trading on retail-psychology stories ("expiry day will pump because CC sellers buy back") systematically loses to dealer gamma flow. The mechanism described is real-but-small; the actual mechanism (dealer gamma + 0DTE) is real-and-large and often opposite in direction.

**How to apply**:
- **Naked premium exists at scale** on the dealer side. "Nobody sells naked" is wrong — it ignores the largest seller (market makers).
- **CC buyback flow is small** on large-caps. MU/AAPL daily volume in millions of shares; a few thousand retail CC buybacks don't move price.
- **Put buyer ≠ stock holder.** Directional speculators have no underlying to "not want to sell." Conflating hedger and speculator put flow is a logic error.
- **Expiry-day moves**: look at dealer gamma sign first, 0DTE positioning second, ETF rebalance third. Retail position management is a footnote.
  - Net short gamma + price away from pin → dealers chase (amplifies move)
  - Net long gamma → dealers fade (pins price near max OI strike)
- **Tax argument is real but bounded**: only matters for short-term holdings, and the EV calc against assignment is closer than it looks (buyback realizes a call loss; assignment realizes the larger stock gain — buyback is deferral, not avoidance).
- Reserve retail-psychology explanations for **low-liquidity small-caps** where retail flow actually dominates the book.

Cross-ref: `references/gamma-framework.md` for the proper dealer-flow framework. Pitfall 15 (AH order-book lopsidedness).
