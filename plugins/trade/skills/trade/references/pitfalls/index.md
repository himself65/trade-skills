---
type: Index
title: Trading Pitfalls — Index
description: Lookup index for 34 analytical and risk-management biases to avoid in directional/options/futures trades; load individual files by trade type.
tags: [index, pitfalls, biases]
timestamp: 2026-08-07T17:05:00Z
---

# Trading Pitfalls

34 analytical and risk-management biases to avoid when evaluating directional/options/futures trades. One file per rule, designed for lazy loading — read individual files only when relevant. This is the OKF navigable index for this directory; see [`../OKF.md`](../OKF.md) for the format, [`../index.md`](../index.md) for the bundle root.

## Index

| # | Severity | Title | File |
|---|----------|-------|------|
| 1 | HIGH | Don't treat "price at analyst consensus" as a bearish signal | `01-consensus-not-bearish.md` |
| 2 | HIGH | A single large options trade ≠ "smart money" signal | `02-single-flow-not-smart-money.md` |
| 3 | HIGH | Tape > opinion > DCF for short-term trades | `03-tape-over-dcf.md` |
| 4 | HIGH | When thesis premise is invalidated, FLIP — don't hold | `04-flip-on-invalidation.md` |
| 5 | MEDIUM | Don't overreact to a single news event — check if it's priced in | `05-priced-in-percentage.md` |
| 6 | MEDIUM | "Finding clever structures" signals fading conviction | `06-clever-structures-fading-conviction.md` |
| 7 | HIGH | IV crush benefits SHORT premium structures, not long ones | `07-iv-crush-favors-short.md` |
| 8 | MEDIUM | "Priced in" is not binary — estimate the percentage | `08-priced-in-not-binary.md` |
| 9 | HIGH | Preconditions met ≠ stock direction | `09-preconditions-not-direction.md` |
| 10 | HIGH | T+1 reverse drift — AH price doesn't predict next-day open | `10-t-plus-1-reverse-drift.md` |
| 11 | HIGH | LEAPS through earnings = unhedged vega tax | `11-leaps-vega-tax.md` |
| 12 | HIGH | Recognize "manipulator-tape" names — sell premium, don't buy direction | `12-manipulator-tape.md` |
| 13 | MEDIUM | Take-profit discipline beats target-price obsession | `13-take-profit-discipline.md` |
| 14 | HIGH | Single channel-check is a sample, not a population | `14-channel-check-sample-bias.md` |
| 15 | MEDIUM | AH order-book lopsidedness is a fade signal at extremes | `15-orderbook-fade-signal.md` |
| 16 | HIGH | Don't conflate drift with vol; BSM already prices log-normal paths | `16-bsm-drift-vs-vol.md` |
| 17 | HIGH | Dealer flow + 0DTE drive options moves, not retail psychology | `17-dealer-flow-not-retail.md` |
| 18 | MEDIUM | Roll frequency is independent from IV thesis — over-rolling kills the alpha | `18-roll-frequency-vs-iv-thesis.md` |
| 19 | HIGH | Direction and vega are independent axes — match BOTH to regime | `19-direction-vega-independent-axes.md` |
| 20 | HIGH | Post-earnings momentum continuation overrides intraday fade pattern when fundamentals + sector + flow align | `20-post-earnings-momentum-vs-fade.md` |
| 21 | HIGH | Elevated IV without a near-term event = demand-driven, not event-driven — check catalyst clock + flow first | `21-event-iv-vs-demand-iv.md` |
| 22 | HIGH | Bond yields don't "cause" equity moves — both are downstream of the same macro drivers | `22-yields-not-causal.md` |
| 23 | HIGH | Discounting is a hazard rate, not just time-value — the optimal exit threshold falls as blow-up/termination risk rises | `23-hazard-rate-discounting.md` |
| 24 | HIGH | Capped-upside structures (Jade Lizard, Iron Condor, Calendar) are forbidden in high-conviction bull setups — asymmetry is a third axis beyond direction and vega | `24-capped-upside-vs-bull-conviction.md` |
| 25 | HIGH | VIX options price off VIX futures, not spot — contango bleed, sub-1 futures beta, and the debit-spread skew bite | `25-vix-options-futures-mechanics.md` |
| 26 | HIGH | Stock-based deal consideration — verify share-anchored vs dollar-anchored (and the split basis) before pricing flow-through | `26-stock-consideration-share-vs-dollar-anchored.md` |
| 27 | HIGH | A pullback entry is the confirmed HOLD, not the touch — a retest probes who holds the level; quantify extension first; don't chase a blow-off wick | `27-retest-entry-confirmation.md` |
| 28 | HIGH | A correct macro call is not a profitable trade — four independent kill switches: already priced, no dated catalyst (carry bleed), contaminated expression, vol-inappropriate size | `28-macro-right-trade-wrong.md` |
| 29 | HIGH | Read the second derivative, not the level — "weak but improving" beats "strong but decelerating"; separate level / direction / acceleration / surprise breadth / persistence / priced | `29-second-derivative-not-level.md` |
| 30 | HIGH | Stop distance is an INPUT from structure and volatility — position size is the OUTPUT; fixing size first buries the stop inside the noise band (<0.2 ATR), and averaging down under a fixed cap shrinks the remaining stop | `30-stop-distance-determines-size.md` |
| 31 | HIGH | A per-trade risk cap is not risk management — without a daily loss limit, a consecutive-loss halt, and drawdown-tiered de-gearing, N disciplined stops in a row still ruin the account | `31-daily-loss-limit-drawdown-governor.md` |
| 32 | HIGH | Check the multi-leg share before reading direction off an options block — spread legs print full premium with their own aggressor side and manufacture a net direction that isn't there | `32-multi-leg-share-before-block-direction.md` |
| 33 | HIGH | Compute the subject's share of the corpus before framing a conclusion around it — the ticker that started the inquiry is a convenience sample; measure its share and re-derive the corpus boundary instead of inheriting it from the question | `33-denominator-before-framing.md` |
| 34 | HIGH | An entry zone and an invalidation level are two different prices — when the zone's lower bound touches the stop, the bottom of your own zone has a zero-width stop, `size = risk$ / stop` diverges, and the buy signal and the wrong signal fire at the same price | `34-entry-zone-invalidation-gap.md` |

## Quick Lookup by Trade Type

- **Position sizing / "how many contracts or shares" / where to put the stop / leverage check**: **30** (invalidation level → stop distance → size; reject any stop < 0.2 ATR; round size down; check notional ÷ equity and what one ATR day does to the account), **31**
- **Futures / index-futures / intraday day-trading / 期货日内 / scalping a session**: **30**, **31** (both mandatory — micro-contract sizing and a day stop are the whole game) — also see [`../overnight-futures-framework.md`](../overnight-futures-framework.md)
- **Averaging down / 摊平 / 扛单 / "add to lower the average cost" / martingale**: **30** (a fixed dollar cap means each add *shrinks* remaining stop distance: 130 pts → 43 pts), **4** (broken structure = exit, not an add), **13**
- **Drawdown / losing streak / tilt / revenge trading / "how do I make it back"**: **31** (day stop = 2–3× per-trade risk; 3 straight losses → flat; de-gear at −5/−10/−15%; −30% needs +43%), **23**
- **Reviewing a trading system, plan, or educational material for soundness**: **30** + **31** first (sizing causality and the missing day-level governor are the two most common structural defects), then **19**, **24**, **28**
- **Earnings**: 5, 7, 9, 10, 11, **20**, **24**
- **Directional / fundamental**: 1, 2, 3, 4, 19, **24**
- **Volatile / manipulator tapes**: 12, 13, 15, **23**
- **Exit / take-profit / optimal-stopping**: 13, **23** (hazard rate sets the exit threshold)
- **Backtesting a KOL / scoring someone's call record / "how good is this analyst"**: **33** (score the full post history, not the calls being cited; rank by count AND by engagement before reading), **14**
- **Post-mortem / 复盘 of your own book / "why did this trade fail"**: **33** (score the whole book over a comparable window, not the position that hurt), **31**, **13**
- **Channel-check / fundamental research**: 14, **33**, **24** (confluence ≥ 3 aligned sources overrides single-source discount)
- **Structure / vol regime**: 6, 7, 8, 18, 19, **21**, **24**
- **Structure asymmetry / upside profile**: **24** (the third axis beyond direction + vega)
- **Sentiment / sector mood**: 9, 10, **20**
- **Entry timing / pullback / dip-buy a runner / retest of a key MA or prior high**: **27** (buy the volume-confirmed hold, not the touch; a pullback is a Schelling-point retest, not an indicator) — also see [`../price-action-framework.md`](../price-action-framework.md)
- **Chasing extension / parabolic name / blow-off candle / new-ATH long-upper-wick**: **27** (a wick-and-close-weak new high on volume is exhaustion, not an entry; the nearest real support can be −20% — quantify extension before waiting for a pullback to the MA)
- **LEAPS / stock replacement**: 11, 16, 18, **21**, **23** (long horizons compound the termination hazard)
- **Options market structure / dealer flow**: 17, **21** (also see [`../gamma-framework.md`](../gamma-framework.md))
- **Reading 大单 / block flow, "who bought the big print", ranking blocks by premium**: **32** (filter `multi_leg` and `stock_multi_leg` share BEFORE reading direction — an unfiltered tally sign-flips), **02**, **17** — also see [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md), [`../commands/report.md`](../commands/report.md)
- **Vol-thesis reasoning**: 16, 19, **21**
- **Credit vs debit at low/high IV**: 7, 19, **21**, **24**
- **Post-earnings drift / continuation**: 9, 10, **20**
- **Multi-week thematic re-rate / sector co-move**: **20**, **21**, **24**
- **Pattern recognition vs flow data check**: **20**, **21** (always pull data before applying pattern)
- **Macro framing / yield narratives**: **22** (yield moves are a symptom, not a cause), **28**, **29** — also see [`../macro-framework.md`](../macro-framework.md)
- **Turning a macro view into a position**: **28** (already priced / no catalyst / contaminated expression / oversized — four separate no-trade gates), **19**, **24**
- **Reading a data print (CPI, NFP, revisions, flow) / regime turn**: **29** (level ≠ direction ≠ acceleration; single-line surprise ≈ no signal; classify persistence), **01**
- **Morning note / EOD review / weekly / monthly regime review**: **28**, **29**, **22** — output order in [`../macro-framework.md`](../macro-framework.md) §9
- **VIX / volatility hedge / "short the market" via VIX**: **25** (anchor to the future not spot; contango bleed; beta<1; debit-spread skew bite) — also see [`../strategies.md`](../strategies.md) VIX section + [`../ticker/vix-2026-06.md`](../ticker/vix-2026-06.md)
- **High-conviction bull (channel confluence + thematic re-rate)**: **24** — banned: Jade Lizard, IC, Calendar; required: bull put spread, naked short put, risk reversal, long call
- **M&A / merger-arb / sum-of-parts / stock-consideration / holdco-stub valuation**: **26** (share-anchored vs dollar-anchored — fixed reference price = fixed share count = marks to market; normalize the split basis; cross-check the tape) — also see [`../ticker/sats-2026-06.md`](../ticker/sats-2026-06.md)
- **Stock split / pre- vs post-split share-count or price basis error**: **26**
- **"Is this a discounted proxy for a private / to-be-listed company?"**: **26** + **23** (the lock/timing/going-concern discount is the risk premium)
- **Writing a trade plan that carries both an entry zone and a stop / add-level vs de-gear-level / take-profit zone vs trailing stop**: **34** (measure the gap — `(E_low − S) / ATR >= 0.5`; publish the sizing table and check the *bottom* row, not the midpoint), **30**, **27**
- **Post-event pullback where the attractive entry IS the event-day low**: **34** (the collision is structural — lift the entry, deepen the stop, or split into tranches; never publish both), **27**, **08**

## Adding a New Pitfall (OKF-conformant)

1. Copy [`_template.md`](_template.md) to `NN-slug.md` (next sequential number).
2. Fill out the OKF frontmatter — `type: Trading Pitfall`, `title`, `description`, `severity`, `appliesTo`, `tags` (YAML array), `timestamp` (ISO 8601). See [`../OKF.md`](../OKF.md) for the schema.
3. Write rule + why it matters + how to apply.
4. Cross-link the relevant case study under [`../ticker/`](../ticker/index.md) with a relative markdown link.
5. Add a row to the table above.
6. Add a dated entry to [`../log.md`](../log.md).
