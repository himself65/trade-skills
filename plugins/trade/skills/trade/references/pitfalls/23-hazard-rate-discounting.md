---
title: Discounting is a hazard rate, not just time-value — your optimal exit threshold falls as blow-up/termination risk rises
severity: HIGH
appliesTo: exit, take-profit, optimal-stopping, directional, leaps, distressed
tags: discounting, hazard-rate, optimal-stopping, take-profit, delisting, continuation-value, real-options
---

## Discounting is a hazard rate, not just time-value — your optimal exit threshold falls as blow-up/termination risk rises

"Let it run to my target" / "hold for the higher exit" / "don't exercise early" are all the **same optimal-stopping decision**: keep holding the position (a live American option on a higher price) until its value crosses a threshold `V*`, then sell. The mistake is discounting that future exit **only for time** (theta, cost of carry, risk-free rate) while ignoring the dominant term: the **hazard that you never get to sell at all** — the name delists, halts, gaps to zero, blows up on fraud, files Chapter 11, or *you* are forced out (margin call, liquidity need, life event). That hazard is a steep, compounding discount. The higher it is, the lower your optimal take-profit threshold — i.e., you should ring the register **sooner**, not "wait for the thesis to fully play out."

**Why it matters**: This is the real-options framework (Dixit & Pindyck, 1994). A risk-neutral holder of a stock following GBM with drift can sell at any time; the optimal policy is a threshold — hold while value < `V*`, sell when value ≥ `V*` — and `V*` is a closed-form function of drift `μ`, vol `σ`, and the **discount rate `ρ`**. Crank `ρ` up and `V*` falls: more impatience ⇒ take profit at a lower bar. The non-obvious part is *where `ρ` comes from*. In Oprea, Friedman & Anderson's "Learning to Wait" lab experiment (RES, 2009), subjects held a GBM-priced asset and could sell for a payoff. To make the discount rate concrete, the experimenters did something brutal: **each period the asset had a fixed probability `δ` of being delisted — and if it delisted, the subject got nothing.** The discount rate *was* a function of the delisting hazard, `ρ = f(δ)`. That accidental design choice is arguably *more* realistic than a clean interest rate:

> Sell now and book a small, certain sum — or hold for more and risk walking away with an empty basket.

The discount factor per period is `β = e^{-ρt}`, and `ρ` is not the T-bill rate — it's **dominated by your hazard of termination**. A 2%/yr risk-free rate is rounding error next to a name carrying a 10–30% annual probability of a thesis-ending event. People price the theta and forget the hazard, so they systematically **over-hold high-blow-up names** waiting for the last leg of the move. (The article's punchline generalizes it: life is itself a long-dated position you plan to "cash out high" later — but that stock also delists. Beware the hazard term.)

**How to apply**:
- **Decompose your discount rate into time + hazard.** Before holding for a higher exit, ask: "What's the per-period probability of an event that takes the *entire* payoff to zero (not just a drawdown)?" That hazard, not the risk-free rate, sets your patience.
- **Map hazard → exit threshold.** High hazard (`δ` large) ⇒ low `V*` ⇒ take profit early; low hazard ⇒ you can afford to let it run. This is the *mechanism* behind pitfall 13's "book 60–70%" heuristic — and it tells you when to book even less.
- **Score the hazard by name type:**
  - **Manipulator / pump-dump tapes (pitfall 12), micro-floats, going concern / dilution risk, binary-event single names** → high `δ`. Cut the target hard; treat the last 30% of "expected move" as nearly worthless after hazard-discounting.
  - **Distressed / sub-$1 / delisting-watch / Chapter-11-risk equities** → `δ` is literal here. The optimal policy is often "sell into any strength," because the continuation value is being eaten by a real terminal probability.
  - **Quality large-caps in a benign regime** → low `δ`. Holding for the higher exit is defensible.
- **Long-dated holds accumulate hazard.** A LEAPS or stock-replacement thesis held for years compounds `δ` over the whole horizon — the cumulative survival probability `(1−δ)^n` decays fast. The "huge discounted future value" you're holding for is multiplied by a shrinking survival term you didn't write down (compounds with the vega tax, pitfall 11).
- **Include *your own* forced-exit hazard in `δ`.** Margin on the position, a hard cash-need date, or any reason you might be liquidated before the thesis matures is part of the termination hazard — even if the underlying is fine. If you can be stopped out, you don't actually hold the full American option.
- **Sanity test:** if your reason to keep holding is purely "the discounted target is still worth more than exiting now," you've only computed the numerator. Multiply by the survival probability. If that flips the decision, exit.

**Cross-references**:
- Pitfall 13 — take-profit discipline (this is the optimal-stopping theory underneath the "book 60–70%" rule; hazard sets *how much* to book)
- Pitfall 12 — manipulator-tape names carry high termination hazard ⇒ lowest exit thresholds
- Pitfall 11 — LEAPS vega tax (long horizons compound both the hazard term and the vega bleed)
- Pitfall 16 — BSM drift vs vol (same real-options / GBM machinery; here the missing input is the discount/hazard term, there it's confusing drift with vol)
- `../strategies.md` — exit sizing is a function of regime and hazard, not a fixed target price
