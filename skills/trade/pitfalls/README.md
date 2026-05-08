# Trading Pitfalls

15 analytical biases to avoid when evaluating directional/options trades. One file per rule, designed for lazy loading — read individual files only when relevant.

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

## Quick Lookup by Trade Type

- **Earnings**: 5, 7, 9, 10, 11
- **Directional / fundamental**: 1, 2, 3, 4
- **Volatile / manipulator tapes**: 12, 13, 15
- **Channel-check / fundamental research**: 14
- **Structure / vol regime**: 6, 7, 8
- **Sentiment / sector mood**: 9, 10

## Adding a New Pitfall

1. Copy `_template.md` to `NN-slug.md` (next sequential number)
2. Fill out frontmatter (`title`, `severity`, `appliesTo`, `tags`)
3. Write rule + why it matters + how to apply
4. Reference relevant case study under `../ticker/`
5. Add row to the table above
