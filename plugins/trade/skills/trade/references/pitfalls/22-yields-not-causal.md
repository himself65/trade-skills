---
title: Bond yields don't "cause" equity moves — both are downstream of the same macro drivers
severity: HIGH
appliesTo: macro-framing, directional, regime-identification
tags: bond-yields, macro, causality, real-yield, term-premium, japan
---

## Bond yields don't "cause" equity moves — both are downstream of the same macro drivers

The reflex commentary "stocks fell because 10Y hit X%" treats a **downstream price variable as a causal explanation**. Bond yields and equity returns are both endogenous outputs of a deeper set of macro inputs (growth expectations, inflation expectations, term premium, liquidity preference, policy path). Their correlation **changes sign across regimes**, which is mechanically impossible if one truly caused the other. Building a directional thesis on "yields up → stocks down" — or any fixed-sign rule — is the rooster-crowing-at-sunrise fallacy: observing two co-moving shadows and drawing an arrow between them while ignoring the light source.

**Why it matters**: The yield/equity correlation has flipped sign multiple times in living memory:

| Period | Dominant driver | Correlation (yield ↑ vs. SPX) |
|---|---|---|
| 1970s–early 1990s | Inflation | **Negative** — yields up → stocks down |
| Mid 1990s–2008 | Growth | **Positive** — yields up → stocks up |
| 2022–2024 | Duration/valuation re-pricing | **Negative** — yields up → stocks down |
| Japan 2013–2023 (YCC) | BOJ administered | **~Zero** — JGB yield was a policy peg, not a market signal |
| Japan 2024–present | YCC exit + governance reform | **Positive** — yields up + Nikkei new highs |

A rule that flips sign with the regime is not a causal law — it is **co-movement reflecting a shared upstream driver**. The actual upstream variables:
1. **Growth expectations** — pushes yields and stocks in the same direction
2. **Inflation expectations** — pushes yields up and stocks down (real-rate channel + multiple compression)
3. **Term premium** — risk-appetite signal; rising term premium = both bonds and stocks under pressure
4. **Liquidity / policy path** — controls discount rate and risk asset bid simultaneously
5. **Positioning** — which side is forced to unwind first

Japan is the cleanest falsification sample. Under YCC (2013–2023), BOJ owned 60%+ of the JGB market and capped 10Y yield at 0.25–1.0% as an **administered price**. Simultaneously, BOJ was the largest single buyer of Nikkei ETFs. In that regime, asking "what does the bond/stock correlation tell us" is like asking which way a compass points when it's glued to a magnet — the price signal carries no information about the underlying economy. Post-YCC (2024+), JGB yields rose AND Nikkei printed new highs together, because both reflected the same upstream story (capital repatriation, governance reform, end of deflation regime).

**How to apply**:

1. **Never write "X happened because yields moved Y" as a thesis sentence.** Replace it with: "X and yields both moved because the market revised its [growth / inflation / policy] expectation." If you can't fill in the bracket, the move isn't explained yet — the yield number is just another symptom.

2. **Identify the dominant driver before applying any yield/equity rule**:
   - **Inflation-dominant** (CPI prints driving market): yield up = stocks down. Default for 2022–2024-style tape.
   - **Growth-dominant** (ISM/payrolls driving market): yield up = stocks up. Default for goldilocks re-rates.
   - **Policy-dominant** (FOMC / Powell speeches driving market): correlation flips with the surprise direction of the policy revision, not the yield level.
   - **Liquidity-dominant** (QT/QE, TGA, RRP): both move together with the liquidity tide.

3. **Look at the right yield decomposition, not the headline nominal**:
   - **Real yield (10Y TIPS)** — the actual discount-rate anchor for equity valuation. Headline 10Y rising due to higher inflation breakevens is bullish-neutral for stocks (nominal earnings rise too). 10Y rising due to higher *real* yields is the genuine valuation headwind.
   - **Term premium** (ACM, Kim-Wright models) — when term premium expands without the policy path changing, it's a risk-off signal that hits stocks regardless of nominal yield direction.
   - **2s10s slope** — bear-steepener (long end up faster) and bull-steepener (front end down faster) are different regime signals even if the 10Y print looks identical.

4. **Sanity test for any "yield narrative" you encounter**:
   - Ask: "What caused the yield move?" If the answer is another price ("because the dollar moved" / "because oil moved"), you're 2 levels deep into co-movement, 0 levels deep into causation.
   - Ask: "Does this rule hold in Japan?" If not, the rule isn't structural — it's regime-conditional.
   - Ask: "What sign did this correlation have 5 years ago?" If it flipped, the rule is regime-dependent, not causal.

5. **Operational implications for options trades**:
   - Don't size a vega-short or vega-long trade based on "yields are high/low." Size it based on **IV regime (IVR, IV vs. realized)** and **what's actually driving the IV** (see pitfall 21).
   - For LEAPS / long-dated structures, the relevant macro variable is **real yield path**, not nominal yield path. A 50bp move in real yields meaningfully shifts long-duration equity valuation; an equivalent move in breakevens does not.
   - For event trades, the "macro backdrop" is irrelevant noise unless the event itself is a macro print (CPI, NFP, FOMC). Don't let a CNBC yield narrative override a clean idiosyncratic setup.

**When the rule does NOT apply (yield moves genuinely are the primary signal)**:
- **Auction tail / failed auction**: yield spike reflects real Treasury supply/demand imbalance, transmits directly to risk assets via term premium. Watch for it.
- **Funding stress** (repo blow-up, SVB-style bank run): front-end yields move because liquidity has broken, and equities respond to the liquidity event, not the yield number itself.
- **Single-day FOMC surprise**: the yield move and the equity move share a common cause (revised policy expectation) and happen in the same 30-minute window — calling one "the cause" is wrong but the co-movement is at least informationally clean.

**Cross-references**:
- Pitfall 3 — tape > opinion > DCF (the macro narrative is just another opinion until it's confirmed by tape)
- Pitfall 9 — preconditions ≠ direction (yield level is a precondition, not a direction)
- Pitfall 17 — dealer flow drives moves, not retail psychology (and not CNBC yield narratives)
- Pitfall 21 — event-IV vs demand-IV (the equivalent "check the source before applying the rule" structure)
- `../strategies.md` — structure selection is driven by IV regime, not macro yield level
