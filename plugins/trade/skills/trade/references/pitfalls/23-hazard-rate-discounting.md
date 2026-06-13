---
type: Trading Pitfall
title: Discounting is a hazard rate, not just time-value — your optimal exit threshold falls as blow-up/termination risk rises
description: Decompose your discount rate into time + hazard; high blow-up/termination risk lowers your optimal exit bar, so book sooner on distressed/manipulated names.
severity: HIGH
appliesTo: exit, take-profit, optimal-stopping, directional, leaps, distressed
tags: [discounting, hazard-rate, optimal-stopping, take-profit, delisting, continuation-value, real-options]
timestamp: 2026-05-26T05:52:28Z
---

## Discounting is a hazard rate, not just time-value — your optimal exit threshold falls as blow-up/termination risk rises

"Let it run to my target" / "hold for the higher exit" / "don't exercise early" are all the **same optimal-stopping decision**: keep holding (a live wait-option on a better price) until value crosses a threshold `V*`, then act. The mistake is discounting that future exit **only for time** (theta, cost of carry, risk-free rate) while ignoring the term that usually dominates: the **hazard that you never get to act at all** — the name delists, halts, gaps to zero, blows up on fraud, files Ch. 11, or *you* are forced out (margin call, liquidity need, forced redemption). In the real-options framework that hazard *is* the discount rate, and it pulls the optimal threshold **toward acting now**. The higher the hazard, the lower your optimal exit bar — book sooner, don't wait for the thesis to fully play out.

**Why it matters — the math is exact, not hand-waving.** Oprea, Friedman & Anderson, *Learning to Wait* (Review of Economic Studies, 2009) put this real-options problem (Dixit & Pindyck 1994, ch. 5) in the lab. A risk-neutral agent holds an opportunity whose value `V` follows GBM `dV = αV dt + σV dz` and may act (sink cost `C`) at any time for payoff `(V − C)e^{−ρt}`. The optimal policy is a **threshold**: wait until `V` hits `V* = (1 + w*)C`, where the wait-option premium is

```
w* = 1 / (B − 1),    B = ½ − α/σ² + √[ (α/σ² − ½)² + 2ρ/σ² ]   (> 1)
```

Read the comparative statics off that formula — they are the whole pitfall:
- **↑ discount rate `ρ` ⇒ ↑ B ⇒ ↓ w* ⇒ lower threshold.** More impatience ⇒ act at a lower bar.
- **↑ volatility `σ` ⇒ B → 1 ⇒ ↑ w* ⇒ higher threshold.** More uncertainty ⇒ the option to wait is worth more ⇒ demand a bigger premium.

Drift and vol get attention; the discount/hazard term is the one traders eyeball and the lab confirms it's the formula's most decisive — and most-misjudged — input. The non-obvious part is **where `ρ` comes from**. To run an infinite-horizon model in a finite lab, the experimenters did *not* use an interest rate — they gave the asset a fixed per-step probability `q` that **the next tick is the last and the opportunity disappears (you get nothing)**. The discount rate *was* that delisting hazard:

```
ρ = −ln(1 − q) / Δt        (higher delisting hazard q ⇒ higher ρ)
```

> Sell now and book a small, certain sum — or hold for more and risk walking away with an empty basket.

That is the entire concept: the per-period discount factor `e^{−ρ}` is not the T-bill rate, it's **your survival probability**. A 2%/yr risk-free rate is rounding error next to a name carrying a 10–30%/yr probability of a thesis-ending event. (The source essay generalizes it: life is a long-dated position you plan to "cash out high" later — but that stock also delists; the hazard term is why you shouldn't defer indefinitely.)

**What the experiment actually found (and where my first instinct was wrong).** The headline result is *not* "people over-hold." 69 subjects over 80 rounds **systematically acted too early — they under-valued the option to wait**, and the gap was largest exactly when waiting was most valuable: in the High treatment the optimal premium was `w*≈0.80` but subjects realized `≈0.60`; Low (`w*≈0.18`) was hit near-optimally. They **converged toward the optimum with experience** (≈40 rounds in Low). The authors' favored read: people are *initially naive about the expiration hazard* and only calibrate it through painful ex-post feedback (a profitable hold that expired before they sold; a sale that left money on the table). **The robust, direction-agnostic lesson: the termination hazard is the input humans estimate worst and learn only by getting burned — so estimate it explicitly instead of discovering it the hard way.**

Mind the **entry-vs-exit duality** before porting the *direction* of any bias: the paper is an *entry/acquisition* timing problem (wait for `V` to rise before committing). The trading translation here is the *exit* dual (hold for a higher sale). The math (hazard ⇒ lower threshold ⇒ act sooner) is identical and robust either way; the *behavioral* bias is context-dependent and **not** a license to claim "traders always over-hold." Use the paper for the mechanism, not for a fixed directional prediction.

**How to apply**:
- **Decompose your discount rate into time + hazard.** Before holding for a higher exit, ask: "What's the per-period probability of an event that takes the *entire* payoff to zero (not just a drawdown)?" That hazard, not the risk-free rate, sets your patience and your `V*`.
- **Two levers, opposite signs.** High hazard pulls the exit threshold *down* (act sooner); high vol pushes it *up* (the wait-option is real — don't cut a high-vol winner short on a low-hazard name). Most traders adjust one and forget the other. This is the theory under pitfall 13's "book 60–70%" — and it tells you *which way* to deviate from it.
- **Score the hazard by name type:**
  - **Manipulator / pump-dump tapes (pitfall 12), micro-floats, going-concern/dilution risk, binary single names** → high `q`. Cut the target hard; the last 30% of "expected move" is nearly worthless after hazard-discounting.
  - **Distressed / sub-$1 / delisting-watch / Ch.-11-risk equities** → `q` is literal. Optimal policy is "sell into strength" — the continuation value is being eaten by a real terminal probability.
  - **Quality large-caps in a benign regime** → low `q`; holding for the higher exit is defensible, and (per the lab) the more likely human error here is *bailing too early*, not too late.
- **Long-dated holds accumulate hazard.** A LEAPS / stock-replacement thesis compounds `q` over the whole horizon; cumulative survival `(1−q)^n` decays fast, multiplying down the "huge discounted target" you didn't write down (compounds with the vega tax, pitfall 11).
- **Include *your own* forced-exit hazard in `q`.** Margin on the position, a hard cash-need date, or any path to being liquidated before the thesis matures is part of the termination hazard — even if the underlying is fine. If you can be stopped out, you don't hold the full wait-option.
- **Sanity test:** if your reason to keep holding is "the discounted target still beats exiting now," you've only computed the numerator. Multiply by survival probability `(1−q)^n`. If that flips the decision, exit.

**Sources** (fetched and verified, not paraphrased from memory):
- Oprea, Friedman & Anderson (2009), "Learning to Wait: A Laboratory Investigation," *Review of Economic Studies* 76(3):1103–1124. Threshold `V*=(1+w*)C`, eq. (2) above, and hazard↔discount map `ρ=−ln(1−q)/Δt`, eq. (5). Formula re-derived and checked against the paper's Table 1: Low (h=.0155, p=.513, q=.007, Δt=.003) → w*=0.1798 vs. reported 0.179; High (h=.03, q=.003) → 0.804 vs. reported 0.804.
- Dixit & Pindyck (1994), *Investment under Uncertainty*, ch. 5 — closed-form wait-option/optimal-stopping threshold; `B` is the positive root of the fundamental quadratic `½σ²β(β−1)+αβ−ρ=0`.

**Cross-references**:
- Pitfall 13 — take-profit discipline (this is the optimal-stopping theory underneath the "book 60–70%" rule; hazard sets *how much* to book and *which direction* to deviate)
- Pitfall 12 — manipulator-tape names carry high termination hazard ⇒ lowest exit thresholds
- Pitfall 11 — LEAPS vega tax (long horizons compound both the hazard term and the vega bleed)
- Pitfall 16 — BSM drift vs vol (same GBM machinery; here the missing input is the discount/hazard term, there it's confusing drift with vol)
- `../strategies.md` — exit sizing is a function of regime and hazard, not a fixed target price
