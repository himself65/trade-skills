# Ticker Case Studies

One file per closed trade arc. Designed for lazy loading — the index lists ticker, event, date, and key lesson; load full file only when needed.

## Index

| Ticker | Event | Date | Result | Key Lesson | File |
|--------|-------|------|--------|------------|------|
| INTC | Q1 2026 earnings | 2026-04-23 | profit (+$3.78 swing from flip) | Flip thesis when tape invalidates it | `intc-2026-04.md` |
| MSFT/GOOGL/AMZN | Q1 2026 cluster | 2026-04-29 | net profit despite one losing leg | Multi-name diversification absorbs single-thesis failure; LEAPS vega tax is real | `mag7-2026-q1.md` |
| APP | Q1 2026 earnings | 2026-05-06 | profit | Manipulator-tape → sell premium, scalp leveraged proxy, don't buy direction | `app-2026-05.md` |
| NOK | Q1 2026 + post-ER re-rate | 2026-04-23 (in-progress) | profit (+100% on Jun-27 LEAPS, ongoing exposure) | Post-earnings momentum continuation beats intraday-fade pattern when fundamentals + sector + flow align; elevated IV without near-term event is demand-driven, not event-driven | `nok-2026-04.md` |
| TSEM | Q1 2026 earnings | 2026-05-13 | profit (small, ~5-15% of capital) | Direction call right (Bull), structure choice wrong — diagonal calendar capped upside in the very scenario predicted; high directional conviction calls for directional defined-risk (bull put spread / risk reversal), not pin-style calendars | `tsem-2026-05.md` |
| CBRS | IPO debut (Nasdaq) | 2026-05-14 | loss on Day-1 long stock (cut ~$290 vs ~$300-311 entry); options plan open | Right thesis, wrong trade: went long Day-1 against the file's own anti-rules, took a small loss; only the cut salvaged it. Plus hot-AI-IPO modeling (no roadshow-range anchoring; fully-diluted incl. warrants; edge is pre-IPO + greenshoe + lock-up, not Day-1) | `cbrs-2026-05.md` |

## Quick Lookup by Pattern

- **Earnings flip (sell-the-news fail)**: `intc-2026-04.md`
- **High-IV cluster + LEAPS exposure**: `mag7-2026-q1.md`
- **Manipulator-tape + channel-check edge**: `app-2026-05.md`
- **Post-earnings momentum + sector co-rally + demand-IV**: `nok-2026-04.md`
- **Analyst error: gap-up fade misread / IV crush misread**: `nok-2026-04.md`
- **KOL amplification / thematic re-rate**: `nok-2026-04.md`
- **High-conviction directional setup → structure selection**: `tsem-2026-05.md`
- **Diagonal/calendar strike placement vs implied move ratio**: `tsem-2026-05.md`
- **AI optical / silicon photonics earnings play**: `tsem-2026-05.md`
- **Hot AI IPO / pre-options-listing / lock-up front-run**: `cbrs-2026-05.md`
- **Execution-vs-analysis gap / traded against your own anti-rules / right thesis wrong trade**: `cbrs-2026-05.md`

## Adding a New Case Study

1. Copy `_template.md` to `<ticker>-YYYY-MM.md`
2. Fill out frontmatter (`ticker`, `event`, `date`, `status`, `result`, `structures`, `tags`)
3. Document the trade arc — Setup, Strategy Evolution by stage, Outcome, What Worked, What Got Wrong, Lessons, Reusable Framework
4. Add row to the index above
5. If the case yields new pitfalls, add files under `../pitfalls/` and link them from this case study
