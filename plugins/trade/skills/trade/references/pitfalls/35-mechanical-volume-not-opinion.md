---
type: Trading Pitfall
title: Check for a corporate action before reading volume as positioning — settlement plumbing generates enormous volume that carries no opinion
description: Convertible pricings, secondaries, exchange offers, index rebalances and lock-up expiries produce record block and dark-pool volume with no directional content; check EDGAR before attributing any of it to buyers or sellers.
severity: HIGH
appliesTo: flow-analysis, block-flow, daily, report, dark-pool, options-flow, parent-order
tags: [corporate-action, convertible, delta-hedge, qualified-contingent-trade, dark-pool, mechanical-volume, edgar, 大单, attribution]
timestamp: 2026-08-21T17:30:00Z
---

## Check for a corporate action before reading volume as positioning

Some of the largest volume a stock ever prints has **no opinion in it at all**. A convertible-note pricing, a secondary, an exchange offer, an index rebalance, an M&A stock-consideration delivery or a lock-up expiry each force enormous, price-insensitive execution — arbitrage desks establishing delta hedges, holders delivering shares against existing shorts, underwriters working negotiated blocks. It clears through the same tape as everything else and looks identical to conviction.

**Severity: HIGH (sign-flip on the whole read, not a rounding error)**

**Why it matters**: mechanical volume is not merely uninformative, it is **systematically misleading in a specific direction**. Hedge flow is short-biased at issue, so a convert deal reads as heavy selling exactly when the company has just raised money — and worse, the two halves of one deal often run **opposite** ways at once. In one case a $5.0B convertible priced alongside an exchange of $800M of deep-ITM older notes for ~15.8M shares: the new deal's arbitrage desks were *establishing* roughly 11–16M shares of short hedge while the exchanged holders were *retiring* about 15.8M shares of existing short. Net positioning barely moved. Off-exchange share jumped from a 54–60% baseline to 71–73% and stayed there for days, and the biggest single prints were `qualified_contingent_trade` clips of 47,500 / 23,700 shares repeating at identical sizes. Read as flow, that tape says "massive institutional activity." Read correctly, it says nothing about direction whatsoever.

The same event also fakes out the *level* read. Negotiated blocks print at round numbers away from the prevailing NBBO — 91,800 and 63,400 shares at exactly $220.00 while the market was 217.95–219.95. That looks like a defended level. It is a settlement price.

The failure has a name in this bundle's history: block flow attributed to positioning on a day when the generating filing was already sitting on EDGAR.

**How to apply**:

1. **Run the filing check first, not as confirmation.** Before attributing any unusual block or dark-pool volume, pull the issuer's recent filings:
   `https://data.sec.gov/submissions/CIK##########.json`, with a real `User-Agent`. Find the CIK via
   `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=<name>&output=atom`.
   **Read the exhibit** (EX-99.1 on a 6-K/8-K), not the form cover — the cover says "press release announcing pricing"; the exhibit carries the size, the reference price, the settlement date and the hedging language.
2. **Look for the disclosure sentence.** Deals that expect hedge flow say so, in near-boilerplate: holders "may sell the shares in the open market and/or enter into or unwind various derivative transactions in connection with hedge positions." That sentence is the generating process for the tape you are looking at.
3. **Anchor on the settlement date.** Hedging concentrates between pricing and settlement (typically T+3 to T+5). Until settlement passes, treat block volume in that name as **unreadable for direction** and say so.
4. **Trade-code tells.** A tape dominated by `qualified_contingent_trade` is contingent on another leg by definition — plumbing. So are **repeated identical clip sizes** and **equal-size paired prints seconds apart recurring across sessions**. None of these are discretionary accumulation.
5. **Baseline the off-exchange share against the name's own history**, 4–5 prior sessions via `date=`. A jump of 15+ points that persists for days is a corporate-action signature. A generic "40% is normal" comparison proves nothing.
6. **Decompose both directions before concluding.** New-issue hedges create short; exchanges, conversions and buybacks retire it. Size both legs or state that you cannot, and never publish only the half that supports a narrative.
7. **Don't confuse a high short interest built this way with bearish conviction.** Convert-arb hedges show up as short interest at an easy borrow. 27% of float short at a 0.80% borrow fee is structural hedging; the same 27% at a 5% fee is a crowd. **The borrow fee, not the short-interest number, tells you which.**
8. **Say "mechanical" out loud in the output.** The reader's default assumption is that record volume means something. Naming the day's volume as settlement plumbing is the finding.

**Cross-references**:
- [`02-single-flow-not-smart-money.md`](02-single-flow-not-smart-money.md) — one big order isn't edge; this is the case where it isn't even an order with a view
- [`32-multi-leg-share-before-block-direction.md`](32-multi-leg-share-before-block-direction.md) — the options-side twin: spread legs fake direction the same way stock-side hedges do
- [`17-dealer-flow-not-retail.md`](17-dealer-flow-not-retail.md) — flow is positioning mechanics, not money with an opinion
- [`26-stock-consideration-share-vs-dollar-anchored.md`](26-stock-consideration-share-vs-dollar-anchored.md) — verify the consideration mechanism from the primary filing before concluding how stock flows through
- [`../commands/daily.md`](../commands/daily.md) — Step 0 makes this check a preflight gate
- [`../ticker/nbis-2026-08.md`](../ticker/nbis-2026-08.md) — the case
