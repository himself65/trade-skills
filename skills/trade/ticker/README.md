# Ticker Case Studies

One file per closed trade arc. Designed for lazy loading — the index lists ticker, event, date, and key lesson; load full file only when needed.

## Index

| Ticker | Event | Date | Result | Key Lesson | File |
|--------|-------|------|--------|------------|------|
| INTC | Q1 2026 earnings | 2026-04-23 | profit (+$3.78 swing from flip) | Flip thesis when tape invalidates it | `intc-2026-04.md` |
| MSFT/GOOGL/AMZN | Q1 2026 cluster | 2026-04-29 | net profit despite one losing leg | Multi-name diversification absorbs single-thesis failure; LEAPS vega tax is real | `mag7-2026-q1.md` |
| APP | Q1 2026 earnings | 2026-05-06 | profit | Manipulator-tape → sell premium, scalp leveraged proxy, don't buy direction | `app-2026-05.md` |

## Quick Lookup by Pattern

- **Earnings flip (sell-the-news fail)**: `intc-2026-04.md`
- **High-IV cluster + LEAPS exposure**: `mag7-2026-q1.md`
- **Manipulator-tape + channel-check edge**: `app-2026-05.md`

## Adding a New Case Study

1. Copy `_template.md` to `<ticker>-YYYY-MM.md`
2. Fill out frontmatter (`ticker`, `event`, `date`, `status`, `result`, `structures`, `tags`)
3. Document the trade arc — Setup, Strategy Evolution by stage, Outcome, What Worked, What Got Wrong, Lessons, Reusable Framework
4. Add row to the index above
5. If the case yields new pitfalls, add files under `../pitfalls/` and link them from this case study
