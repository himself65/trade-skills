# Trading Pitfalls

24 analytical biases to avoid when evaluating directional/options trades. One file per rule, designed for lazy loading — read individual files only when relevant.

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

## Quick Lookup by Trade Type

- **Earnings**: 5, 7, 9, 10, 11, **20**, **24**
- **Directional / fundamental**: 1, 2, 3, 4, 19, **24**
- **Volatile / manipulator tapes**: 12, 13, 15, **23**
- **Exit / take-profit / optimal-stopping**: 13, **23** (hazard rate sets the exit threshold)
- **Channel-check / fundamental research**: 14, **24** (confluence ≥ 3 aligned sources overrides single-source discount)
- **Structure / vol regime**: 6, 7, 8, 18, 19, **21**, **24**
- **Structure asymmetry / upside profile**: **24** (the third axis beyond direction + vega)
- **Sentiment / sector mood**: 9, 10, **20**
- **LEAPS / stock replacement**: 11, 16, 18, **21**, **23** (long horizons compound the termination hazard)
- **Options market structure / dealer flow**: 17, **21** (also see `../gamma-framework.md`)
- **Vol-thesis reasoning**: 16, 19, **21**
- **Credit vs debit at low/high IV**: 7, 19, **21**, **24**
- **Post-earnings drift / continuation**: 9, 10, **20**
- **Multi-week thematic re-rate / sector co-move**: **20**, **21**, **24**
- **Pattern recognition vs flow data check**: **20**, **21** (always pull data before applying pattern)
- **Macro framing / yield narratives**: **22** (yield moves are a symptom, not a cause)
- **High-conviction bull (channel confluence + thematic re-rate)**: **24** — banned: Jade Lizard, IC, Calendar; required: bull put spread, naked short put, risk reversal, long call

## Adding a New Pitfall

1. Copy `_template.md` to `NN-slug.md` (next sequential number)
2. Fill out frontmatter (`title`, `severity`, `appliesTo`, `tags`)
3. Write rule + why it matters + how to apply
4. Reference relevant case study under `../ticker/`
5. Add row to the table above
