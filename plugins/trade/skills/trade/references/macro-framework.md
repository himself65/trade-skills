---
type: Framework
title: Macro Analysis Framework (pricing before forecasting)
description: Turning macro reading into a tradeable judgment — the seven questions any macro call must answer, the seven-stage pipeline (marginal driver → micro-to-macro → market-implied pricing → second derivative → price as evidence → cross-asset confirmation → expression & sizing), the eight dashboard families mapped to this stack's data tiers, and the eight output modes (morning note, EOD review, weekly, pre-trade consult, monthly regime review, 13F, divergence watch, thematic deep dive). Load for macro regime reads, data prints, digesting a brokerage macro report, or translating a macro view into an equity/options expression.
tags: [macro, regime, market-implied-pricing, second-derivative, cross-asset, expression, position-sizing, morning-note, dashboard, druckenmiller]
timestamp: 2026-07-30T05:10:00Z
---

# Macro Analysis Framework (pricing before forecasting)

How to turn macro *reading* into macro *judgment*: a Druckenmiller-style PM pipeline adapted to a US-equity **options** book. The discipline is the seven-stage sell-side workflow; the adaptation here is the pricing map (§3), the expression bridge (§7), and the honest limits (§11) for this data stack.

**Where this sits**: this is the top of the funnel — it produces a *regime and a ranked driver list*. Structure selection still runs through [`strategies.md`](strategies.md)'s three axes (direction / vega / asymmetry); entry timing still runs through [`pitfalls/27-retest-entry-confirmation.md`](pitfalls/27-retest-entry-confirmation.md); market-level session attribution has its own file, [`overnight-futures-framework.md`](overnight-futures-framework.md), which is §1 + §3 specialized to the Globex night.

> **Hard rule of this file — pricing before forecasting.** Never call a macro outcome bullish or bearish before stating what the market already implies. No gap, no trade (see §3, and pitfalls [`08`](pitfalls/08-priced-in-not-binary.md) / [`28`](pitfalls/28-macro-right-trade-wrong.md)).

---

## 0. The seven questions (gate — answer all seven or the view isn't finished)

| # | Question | Plain reading |
|---|---|---|
| 1 | What is changing at the margin? | Not "is the economy good" — *which variable turned versus last month* |
| 2 | Is the change accelerating or decelerating? | Direction and speed are separate facts |
| 3 | What does the market currently imply? | Which scenario the price already assumes |
| 4 | Where is the widest gap between fundamentals and pricing? | The gap **is** the alpha; no gap, no trade |
| 5 | What catalyst forces a repricing? | Right with no catalyst = bleeding carry until you're wrong |
| 6 | Which asset / structure expresses it most cleanly? | Same view, wrong expression, same loss |
| 7 | What proves me wrong, and how do I cut? | Traders who can't admit error get removed by the market |

**Being right on the economy is not the same as being right on the trade.** A correct forecast still loses money if it is ① already priced, ② early or late, ③ expressed through a contaminated instrument, or ④ sized too large for the vol. That is pitfall [`28`](pitfalls/28-macro-right-trade-wrong.md) — read it before publishing any macro-driven trade.

---

## 1. Identify the marginal driver (dynamic driver hierarchy)

No permanent ranking of asset classes. Rates, FX and liquidity are usually good anchors (they set the cost of capital), but each regime has its **own** dominant marginal variable: monetary policy · fiscal and Treasury supply · bank credit · housing · corporate earnings · technology adoption · commodity supply shock · FX and external imbalance · positioning and forced flows · geopolitics.

Every analysis opens by answering: what the dominant marginal variable is **now**; what leads it versus what merely confirms it; what the transmission path is; which markets *must* respond if the call is right; and which markets, by *not* confirming, would weaken or kill it.

- **Open with one variable, then a three-link chain.** e.g. `oil supply shock → core-inflation risk → Fed reaction function → rate path repriced → cross-asset`. Never open with YoY GDP — that's the rear-view mirror.
- The previous phase's dominant variable has usually been superseded (2023's hike expectations → 2026's oil supply shock / AI capex). Re-ask the question monthly, not once a cycle.
- Multiple central banks mean multiple independent paths, not one "global rates" object (Fed holding longer, ECB hiking and BoJ hiking price very differently).

**Self-check**: ☐ the opening paragraph names a single dominant variable (not a list of data points) ☐ the chain variable → transmission → repriced asset is drawn ☐ it says which markets *must* respond if the call is right ☐ it says which markets, by not confirming, weaken the call

## 2. The micro-to-macro jigsaw

A macro conclusion built only on GDP / CPI / payrolls / central-bank statements is crippled. Official data should **confirm, challenge or update** the bottom-up picture — not dictate it just because it is official.

| Family | Leading evidence to pull | Typical lead (empirical, not a law) |
|---|---|---|
| Banks | loan demand, lending standards (SLOOS), deposit flow, funding cost, delinquency | 2–4 quarters on capex and defaults |
| Housing | mortgage rate, permits, starts, builder orders, cancellation rate | 1–3 quarters on the housing GDP line |
| Consumer | card spend, foot traffic, units, inventory, promo intensity, low-income stress | 1–2 quarters on retail sales |
| Manufacturing | new orders, backlog, lead times, utilization, freight, industrial production | 1–2 quarters on industrial production |
| Corporate investment | capex guidance, equipment orders, **data-center spend**, software / ad budgets | 2–4 quarters |
| Labor | job postings, temp help, hours worked, hiring intentions, wage pressure | 1–3 months on payrolls |
| Tech | semi demand, lead times, cloud capex, **power demand**, component bottlenecks | 1–3 quarters |
| Commodities | inventories, spot premium, producer discipline, term structure, freight | weeks to months |
| Corporate comms | management tone, guidance, order visibility, margin commentary | contemporaneous to 1 quarter |
| Earnings revisions | breadth, magnitude, sector leadership, dispersion | 1–2 quarters, and a *top* warning when breadth deteriorates while growth holds |

For each micro signal, state which macro variable it leads, the typical lead, whether other indicators confirm it, and **whether the market has already reacted** (reacted = the value is eaten).

**The industry-scale test**: when a sector-level boom appears (AI power demand, memory pricing, defense), force the question *"are these orders / this capex large enough to move the aggregate?"* If yes, you have a genuine micro-to-macro chain (AI power demand → grid and generation capex → total fixed investment → GDP composition → pull on rates and inflation), not just a narrative. Cross-check the single-name side with [`parent-order-flow-framework.md`](parent-order-flow-framework.md) before assuming the theme is still uncrowded.

**Self-check**: ☐ at least 1–2 micro leading indicators support the conclusion ☐ for each signal you can state what it leads and by how long ☐ the signals confirm each other rather than conflict ☐ you checked whether the market already reacted

## 3. Pricing before forecasting (the highest-value stage)

Split every material call into: **fundamental view** (what will happen) · **market-implied view** (what the price assumes) · **mispricing** (the gap) · **catalyst** (what forces convergence) · **time window** (when) · **failure point** (what proves the market right and you wrong).

Where the implied view lives, and how to pull it **in this stack** (tiers per `SKILL.md` → Data Access):

| What you need implied | Read it from | This stack |
|---|---|---|
| Policy path | fed funds / SOFR futures strip, OIS forwards | **No direct OIS feed here** — proxy with the futures strip via TradingView MCP quotes (ZQ / SR3 continuous) and label it a proxy |
| Inflation expectations | breakevens, 5y5y | FRED via funda-data: `T10YIE`, `T5YIE`, `T5YIFR` |
| Real discount rate | TIPS real yield | FRED `DFII10`, `DFII05` |
| Curve shape / term premium | 2s10s, 3m10y, ACM term premium | FRED `DGS2` `DGS10` `DGS3MO`; ACM series if available |
| Credit risk appetite | IG / HY spreads, CDX | FRED `BAMLC0A0CM`, `BAMLH0A0HYM2`; HYG / LQD tape via TV MCP |
| Equity assumptions | index multiple, EPS growth, margin path, breadth, dispersion | funda-data estimates + TV MCP screeners; equal-weight vs cap-weight (RSP / SPY) |
| Vol / event premium | IV level, term structure, skew, correlation | TV desktop reader (per-strike IV + greeks); VIX9D / VIX / VIX3M / VIX6M — see [`pitfalls/25`](pitfalls/25-vix-options-futures-mechanics.md) |
| FX / cross-border | carry, growth differentials, policy divergence | DXY and pairs via TV MCP |
| Event odds | prediction-market odds | Polymarket via funda-data |
| Positioning | CFTC, CTA / vol-control triggers, dealer gamma | funda-data GEX and flow → [`gamma-framework.md`](gamma-framework.md) |

Then quantify the gap in the *market's* own units: "dot-plot median implies unchanged-or-one-hike for 2026 versus a strip implying X bp of cuts → a Y bp gap" is a tradeable statement. "I think they'll be more hawkish" is not.

**A central bank's minutes are a reaction function, not a forecast.** Your job isn't guessing the next move — it's judging whether the market's pricing of the *reaction function* matches the one the bank just described. A mismatch is the trade.

**Self-check**: ☐ you stated the corresponding market-implied level (which instrument, what value) ☐ you quantified the gap ☐ you accepted that no gap means no alpha ☐ you named a catalyst and a time window

## 4. The change in the change (second derivative)

For every core variable, separate seven dimensions: **level · direction · acceleration · surprise (vs consensus and prior) · breadth (broad vs single line item) · persistence (base effect / weather vs structural) · priced**.

The canonical asymmetries all live in the derivative, not the level:

- **"Weak but improving" is usually more bullish than "strong but decelerating"** — the turn is the trade.
- **"Inflation is decelerating, but the deceleration is slowing"** is a different and more hawkish fact than "inflation is falling", and it's invisible if you only track the YoY level.
- **"Earnings are still growing but revision breadth is deteriorating"** is a top warning while the level still reads healthy.
- **"Liquidity is still ample but its impulse has turned negative"** is a tightening signal while the stock of liquidity looks fine.
- **Headline versus core divergence**: an oil-driven headline pickup with sticky-but-not-accelerating core is a different regime from a broad core re-acceleration — reading headline alone produces the wrong policy conclusion.
- **A single factor can reverse sign over the horizon**: AI capex pushes core PCE *up* near term (memory and hardware pricing) and *down* later (productivity). That is the value of a persistence judgment.

This is pitfall [`29`](pitfalls/29-second-derivative-not-level.md), and the most common failure when reading a data print live.

**Self-check**: ☐ level and direction are separated ☐ you asked about acceleration ☐ the surprise is broad-based rather than a single line item ☐ transitory versus persistent is classified ☐ you checked whether it's priced

## 5. Price reaction as evidence

Price action is **evidence**, not just the scoreboard. Ask every session:

- Can good news still produce upside? Can bad news still produce downside?
- Is the asset out- or under-performing its benchmark on the same news?
- Volume, vol, gaps, intraday reversals — see [`price-action-framework.md`](price-action-framework.md).
- Do correlations behave the way the thesis predicts?
- Is leadership **broadening** (healthy) or **narrowing** (dangerous)?
- Are repeated catalysts producing a **decaying** price response? (the narrative has been digested)
- Is the market accepting or rejecting the current narrative?

**Core rule**: a view supported by data but repeatedly rejected by price needs lower confidence, better timing evidence, or a different expression — not "the market is wrong."

**Regime-change tell**: when a catalyst that *should* work stops working (hikes that no longer cool an economy running into supply constraints — an "inelastic" economy), that is not the market being stupid; it is the transmission channel changing. Re-run §1 instead of doubling down. Related: [`pitfalls/04`](pitfalls/04-flip-on-invalidation.md) (precondition broken → flip), [`pitfalls/03`](pitfalls/03-tape-over-dcf.md) (tape outranks the macro opinion), [`pitfalls/20`](pitfalls/20-post-earnings-momentum-vs-fade.md) (pattern versus actual flow).

**Self-check**: ☐ the last 3–5 catalysts produced price reactions consistent with the view ☐ if not, you decided whether it's timing, expression, or the view itself ☐ leadership is broadening rather than narrowing ☐ repeated catalysts are not producing decaying reactions

## 6. Cross-asset confirmation (without forcing causality)

Test the core conclusion across at least two market families, while separating **correlation** (moving together) from **causal transmission** (A drives B) from **coincidence** (both respond to a third variable). Yields are the standing example of a variable that is coincident, never causal — [`pitfalls/22`](pitfalls/22-yields-not-causal.md).

If the call is "the Fed holds longer", then the curve, the dollar, commodities and EM should respond **consistently**. If rates rise but the dollar doesn't, commodities don't move and EM doesn't fall — that's a **divergence, and divergence is more informative than confluence**. Adjudicate it as one of three things: normal transmission lag · temporary positioning distortion · the thesis is wrong.

When leaning on a single leading market, say why it leads, which markets should eventually confirm, the expected lag, and what non-confirmation would mean. **Don't bolt two markets together just to fill the template.**

**Self-check**: ☐ confirmed in ≥2 asset families ☐ you distinguished true causality from shared-cause coincidence ☐ any divergence is attributed (lag / distortion / thesis broken) ☐ you named the leading market and who should follow it

## 7. Best expression and position risk (the options-book bridge)

Same view, different expression, different P/L. Score 2–4 candidates on: **sensitivity · how much is priced · carry · convexity · timing · liquidity · crowding · contamination (exposure to unrelated factors) · portfolio fit · instrument fit**.

For this book, contamination is usually the deciding column:

| Macro view | Contaminated expression | Cleaner expression |
|---|---|---|
| Short-term inflation up, long-term productivity deflation | Long TIPS (the oil leg decides it); long memory / hardware equity (the AI capex cycle decides it) | Front-end real rates versus the long end; buy front-end inflation upside, sell long-end inflation upside |
| A single sector's capex boom | Index long (diluted by nine other sectors) | The bottleneck component name — but check crowding and whether earnings revisions already reflect it |
| Broad risk-off | Single-name puts (idio noise dominates) | Index put spread, or a VIX structure anchored to the **future** ([`pitfalls/25`](pitfalls/25-vix-options-futures-mechanics.md)) |
| Policy repricing | A rate-sensitive equity basket (multi-factor) | Duration proxy versus cyclical, or the rate instrument itself |

Then hand off: the vega sign comes from the IV regime, not from the macro view ([`pitfalls/19`](pitfalls/19-direction-vega-independent-axes.md)); if the macro read produces a **high-conviction directional** setup, capped-upside structures are banned ([`pitfalls/24`](pitfalls/24-capped-upside-vs-bull-conviction.md)); sizing and exit thresholds go through [`pitfalls/13`](pitfalls/13-take-profit-discipline.md) and [`pitfalls/23`](pitfalls/23-hazard-rate-discounting.md).

**Lifecycle tagging** — every live macro judgment carries a stage, and size follows the stage: **watching (small) → developing → confirmed (add) → crowded (trim) → deteriorating → broken (out)**. High conviction is not the same as a big position: size must reflect liquidity, vol, correlation to the rest of the book, and how *clearly falsifiable* the thesis is. A thesis with no clean invalidation level cannot be sized up, however convincing it reads.

**Self-check**: ☐ you listed ≥3 candidate expressions ☐ the chosen one is the least contaminated ☐ the lifecycle stage is tagged and size matches it ☐ the invalidation condition is written down (trim or flip) ☐ size reflects vol, correlation and liquidity — not just conviction

---

## 8. The eight dashboard families

Before analyzing, ask which **1–2** families the current regime's dominant driver lives in; go deep there and use the rest as confirmation. In a broad-market mode, sweep all eight.

| Family | Purpose | Panels | Where in this stack |
|---|---|---|---|
| 1. Liquidity and funding | financial-conditions tightness, liquidity impulse | Fed balance sheet, reserves, RRP, TGA, SOFR, FCI, FX basis | FRED via funda-data: `WALCL`, `WRESBAL`, `RRPONTSYD`, `WTREGEN`, `SOFR`, `NFCI` |
| 2. Rates and inflation | market-implied policy and inflation path | nominal / real yields, breakevens, curve, futures strip, term premium | §3 table |
| 3. Credit and banks | credit leads the cycle | IG / HY spreads, CDX, HYG / LQD, issuance, defaults, lending standards | FRED spreads + TV MCP tape |
| 4. Equity internals and earnings | is the move healthy | equal- versus cap-weight, breadth, earnings revisions, dispersion | TV MCP screeners; funda-data estimates |
| 5. Positioning, systematic flow, derivatives | squeeze risk and mechanical flow | CTA, vol-control, dealer gamma, HF exposure, CFTC, fund flows | funda-data GEX and flow → [`gamma-framework.md`](gamma-framework.md), [`parent-order-flow-framework.md`](parent-order-flow-framework.md) |
| 6. Commodities and FX | supply shocks and the global demand thermometer | DXY, carry, copper / gold, oil and metals curves, inventories | TV MCP `futures_category_snapshot`, `futures_top_movers` |
| 7. Micro-to-macro | verify the leading signals | bank lending, builders, retail, freight, semis, cloud capex | funda-data fundamentals / transcripts / supply chain (§2) |
| 8. News and catalyst flow | when the next repricing window is | high-information catalysts tied to the dominant driver | funda-data calendar + TV news; convert foreign prints to ET ([`overnight-futures-framework.md`](overnight-futures-framework.md) §0) |

## 9. The eight output modes

Each mode has a **fixed output order** — the point is to force framework order instead of writing thoughts in the order they arrive. All are reachable through the normal `analysis` route, including via the Chinese trigger phrases kept in the table below (input matchers only — **chat output mirrors the user's language; git-tracked files stay English**, see `SKILL.md` User Profile); see [`commands/analysis.md`](commands/analysis.md).

| Mode | Trigger | Output order |
|---|---|---|
| A. Morning note | 晨报 / "how do we look today" | dominant thesis → what changed → what's priced → confirmations and frictions → micro jigsaw → best expression → invalidation → regime |
| B. EOD review | EOD / 收盘复盘 | thesis mark-to-market → what actually drove it → change in the change → new pricing and what's unconfirmed → trade review → tomorrow's verification map |
| C. Weekly | 周报 / "next week" | weekly thesis mark → regime evolution → micro jigsaw → narrative versus pricing → positioning and forced flows → next week's asymmetry → scenario map |
| D. Pre-trade consult | 交易前看一眼 / "how should I size this" | the user's implied thesis → thesis collision check → fundamental-versus-pricing gap → tape and positioning → best instrument → trade plan → size |
| E. Monthly regime review | 月报 / regime review | dominant variable and regime → changes across growth / inflation / policy / liquidity / earnings → three-scenario framework |
| F. 13F review | 13F / "why did he buy" | conclusion first → hard facts → reasonable inference → micro-macro fit → pricing and positioning → alternative explanations |
| G. Divergence watch | 盯住 [TICKER] | target-asset context → narrative versus tape → micro and macro support → positioning and flow → divergence verdict → verification and execution levels |
| H. Thematic / sector deep dive | 深度分析 [topic] | core thesis → value chain and leading indicators → supply, demand, capacity, pricing power → capex and earnings-revision cycle → macro transmission → what's priced → winners and losers → crowding → catalysts, timing, failure points |

Mode D must always run the three-axis check from [`strategies.md`](strategies.md) before it prints a structure.

## 10. Deliberate practice (research-report reps)

Reading is passive; these are active. Apply them to the user's own research library and to anything digested via [`commands/import.md`](commands/import.md).

1. **Decomposition reading** — force a report into the seven stages; mark each ✓ / △ / ✗. Even a top-tier house rarely covers all seven. **Your alpha is the stage it skipped** (typically 5, price reaction, and 7, expression).
2. **Time-series comparison** — read 2–3 consecutive issues of one series: did the dominant driver change, which stage got overturned, and was the confidence adjustment right?
3. **Adversarial debate** — take a bullish report, write the bear case using stages 1–4, and require the bear side to answer all seven questions too. A view a clean opposite can kill should not have been sized.
4. **Quantify the pricing gap** — take a report with an explicit policy path, pull the contemporaneous strip, curve and spreads, and quantify report-versus-market. The gap is candidate alpha.
5. **Cross-asset cross-check** — split a global-macro weekly into rates / commodities / FX / EM, then ask where the four disagree and adjudicate the divergence (§6).
6. **Mock PM decisions** — one week: mode A or B daily, mode C on the weekend, mode D on Monday with entry, invalidation, target and size. This is the only rep that actually builds the skill.

| Stage | Marker | Focus |
|---|---|---|
| L1 | can slot a report into the seven stages | rep 1, ~20 reports |
| L2 | can name *which stage is missing* | reps 1 + 3 |
| L3 | can quantify the pricing gap unaided | rep 4 (needs curve / strip data) |
| L4 | can cross-verify and spot divergence | rep 5 |
| L5 | can run mock-PM decisions with trade parameters | rep 6, ≥4 weeks |
| L6 | admits error fast when price rejects the view | live plus review |

The L5→L6 jump is not accuracy, it is **speed of admitting error**. Druckenmiller has said publicly he was directionally right less than half the time; survival came from cutting. Stage 7's invalidation condition and stage 5's price-as-evidence exist for exactly that jump.

## 11. Limits of this framework here (be honest about these)

- **No OIS or swap-forward feed in this stack.** §3's policy-path row is a *futures-strip proxy*. Label it as a proxy rather than quoting an implied cut count as fact.
- **Macro-to-single-name beta is unstable.** A correct macro call can be completely dominated by idiosyncratic news on any given name. For a clean idiosyncratic setup, the macro backdrop is noise unless the event *is* a macro print ([`pitfalls/22`](pitfalls/22-yields-not-causal.md) §5).
- **The lead times in §2 are empirical regularities, not laws** — they stretch and compress by regime, so treat them as ordering hints, not timing signals.
- **A macro thesis is not a position.** Nothing here authorizes a structure; every trade still passes the three axes, the counterfactual P/L matrix (`SKILL.md` Hard Rule 3), and a written invalidation level.
- **Third-party macro reports are the user's knowledge, not this library's.** A digest of a shared brokerage or macro report belongs in the personal knowledge dir as a writedown ([`commands/import.md`](commands/import.md)); this file is the lens used to read it, not a place to store it.

---

**Related**: [`overnight-futures-framework.md`](overnight-futures-framework.md) (this framework specialized to the overnight session) · [`price-action-framework.md`](price-action-framework.md) (stage 5 microstructure) · [`parent-order-flow-framework.md`](parent-order-flow-framework.md) (stage 5 and family 5 positioning) · [`gamma-framework.md`](gamma-framework.md) (dealer and mechanical flow) · [`strategies.md`](strategies.md) (stage 7 structure selection) · pitfalls [`28`](pitfalls/28-macro-right-trade-wrong.md), [`29`](pitfalls/29-second-derivative-not-level.md), [`22`](pitfalls/22-yields-not-causal.md), [`08`](pitfalls/08-priced-in-not-binary.md), [`19`](pitfalls/19-direction-vega-independent-axes.md), [`24`](pitfalls/24-capped-upside-vs-bull-conviction.md).
