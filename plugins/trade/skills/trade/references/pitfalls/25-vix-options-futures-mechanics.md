---
title: VIX options are priced off VIX futures, not spot — contango bleed, sub-1 beta, and the debit-spread skew bite
severity: HIGH
appliesTo: volatility-hedge, tail-hedge, macro-short, directional-short, vix
tags: vix, vega, contango, term-structure, futures-beta, debit-spread, skew, tail-hedge
---

## VIX options are priced off VIX futures, not spot — contango bleed, sub-1 beta, and the debit-spread skew bite

**Severity: HIGH (a VIX call hedge can be "right" on direction and still barely move — or bleed to zero — because spot VIX is the wrong reference)**

A VIX call/call-spread is the natural "short the market with convexity" trade, but three mechanics blindside anyone who reasons off **spot VIX**. Each VIX option settles against the **VIX future** of its expiry, not spot. Get this wrong and you mis-pick strikes, mis-size, and mis-set P/L expectations — see `../ticker/vix-2026-06.md`, where spot VIX +40% on a −2.6% SPX day produced only +3–8% on live VIX call spreads.

**Why it matters** (the three traps):

1. **Anchor = the future, not spot.** When spot VIX is 16 but the 2-month future is 18.5 (steep contango), a "VIX 20 call" is only *mildly* OTM relative to its own future — not a cheap deep-OTM lottery off spot. Pick strikes off the relevant **future**, always.
2. **Contango bleed.** The future converges to spot as it approaches expiry. In a calm tape your long calls bleed every day even if spot VIX is flat. This is why you (a) don't buy too far out, (b) use a spread to cut carry, (c) never naked-hold long VIX calls indefinitely.
3. **Futures beta < 1, and it falls the further out you go.** On a spot-VIX spike the *front* future moves a fraction of spot; back months move even less (the curve flattens/inverts, back months "lag"). Spot 16→22 (+40%) might move the July future +2 and the August future +1. **Model every P/L scenario off the future, not spot VIX.** In `vix-2026-06.md` the further-dated Aug spread (+3.2%) underperformed the nearer Jul spread (+8.2%) on the same day for exactly this reason.

**The debit-spread skew bite (the fourth, sneakiest trap):**
On a vol spike, VIX call **skew steepens** — far-OTM call IV explodes more than near-the-money call IV. In a debit call spread you are *short* that far-OTM leg, so its IV balloon eats much of your long leg's gain and the spread barely widens. Real example: on the +40% spot day, the long Jul-20C gained +0.36 while the short Jul-32C gained +0.226 — the short leg captured **63%** of the long leg's move, so the net spread widened only +0.13. A spread trades raw crash convexity for lower carry; on the *first* down-day it can look dead even when "right."

**How to apply**:
- **Pull the VIX futures term structure first** (proxy: VIX9D / VIX / VIX3M / VIX6M constant-maturity indices). Steep contango = high carry = use spreads, shorter-dated, smaller size.
- **Strikes off the future.** A "20 call" means ~ATM-to-mild-OTM when the future is ~18; don't think in spot terms.
- **Build P/L tables off the future** with a beta assumption (~0.5–0.65 for 1–3M futures vs a spot spike; lower for further out). Never write "VIX +40% → my position +40%."
- **Expect the convexity to live in the tail.** These structures pay on SPX −8%+ crashes where the future re-rates toward your strikes and backwardation flips. A −2–3% day is noise to them — being only mildly green on such a day is *correct behavior*, not failure.
- **Don't chase the spike intraday.** Adding into a ripping VIX pays escalating vol-of-vol on the later lots — set full size at a calm entry, or wait for the curve to settle.
- **Take profit fast in backwardation.** VIX mean-reverts hard; book at 60–70% of max value, don't wait for the cap.
- **If you underwrite the right tail, stay net-long it — don't be net-short the leg whose IV balloons most.** Three ways, cheapest-carry to most-convex: (1) **1:1 debit spread** — cheapest, but capped and skew-bitten; (2) **2:1 long ratio** (buy 2 lower / sell 1 higher) = a 1:1 spread + 1 extra long call → **uncapped above the short strike, net-long the right tail**, profits across the whole spike range (NB: buy-low/sell-high, the opposite of a textbook backspread, which loses in the most-likely mid-spike zone); (3) **outright calls / wide ladder** — most convex, highest carry. Cost rises with convexity, so does calm-tape bleed — match the ratio to conviction (stronger crash view → sell fewer / none). **Warning:** buy-2/sell-1 is long-biased; do NOT confuse with sell-2/buy-1 front-ratio, which is naked-short vol and lethal in a crash.
- For a pure directional (non-crash) short, prefer **SPY/SPX put spreads** — linear, no contango, no futures-beta drag.
