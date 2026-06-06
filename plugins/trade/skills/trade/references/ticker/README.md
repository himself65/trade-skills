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
| SNOW | Q1 FY26 earnings (Cortex Code GA) | 2026-05-27 | loss (small, $50/contract if taken — vs counterfactual long calls +$4,500) | **Canonical**: Jade Lizard recommended into a 6/8 bull-conviction setup; AH +35.75% (3.2 SD) made the capped-upside structure forbidden. Asymmetry is a third axis beyond direction + vega. Confluence ≥ 3 independent channel checks overrides single-source discount rule. | `snow-2026-05.md` |
| MDB | Q1 FY27 earnings (AI-database re-rate) | 2026-05-28 | profit (bull put spread ~99% of max; small long-call tail marginal) | **SNOW lesson applied correctly the next day**: same AI-database theme, but mechanical ~4/8 count had 3 *inversions* (chasing-not-de-risked, put-heavy flow, −22% crash from the same $325 level last quarter) → reclassified **mixed-conviction**, not high-conviction bull. Bull put spread workhorse won across the whole up-range; refused IC/JL (don't sell a freshly-demonstrated tail). **Conviction count needs a quality/inversion overlay, not just a tally.** | `mdb-2026-05.md` |
| VIX | Market selloff (SPX −2.6% / spot VIX +40%) | 2026-06-05 | illustrative (~+3–8% marked on the spreads) | **VIX call spreads track the FUTURE, not spot.** Spot VIX +40% marked only ~+3–8% on a Jul 20/32 and Aug 20/30 spread. Three reasons: futures beta < 1 (further-dated Aug +3% < nearer Jul +8%); debit-spread **skew bite** (short far-OTM leg's IV ballooned, captured 63% of the long leg's move); a −2.6% day is *noise* to a structure built for −8%+ crash convexity. Don't chase the spike (adding into a ripping VIX pays escalating vol-of-vol). | `vix-2026-06.md` |

## Quick Lookup by Pattern

- **Earnings flip (sell-the-news fail)**: `intc-2026-04.md`
- **High-IV cluster + LEAPS exposure**: `mag7-2026-q1.md`
- **Manipulator-tape + channel-check edge**: `app-2026-05.md`
- **Post-earnings momentum + sector co-rally + demand-IV**: `nok-2026-04.md`
- **Analyst error: gap-up fade misread / IV crush misread**: `nok-2026-04.md`
- **KOL amplification / thematic re-rate**: `nok-2026-04.md`
- **High-conviction directional setup → structure selection**: `tsem-2026-05.md`, `snow-2026-05.md`
- **Diagonal/calendar strike placement vs implied move ratio**: `tsem-2026-05.md`
- **AI optical / silicon photonics earnings play**: `tsem-2026-05.md`
- **Hot AI IPO / pre-options-listing / lock-up front-run**: `cbrs-2026-05.md`
- **Execution-vs-analysis gap / traded against your own anti-rules / right thesis wrong trade**: `cbrs-2026-05.md`
- **Capped-upside structure failure / Jade Lizard in bull tail**: `snow-2026-05.md`
- **Channel-check confluence (N≥3 sources) overrides sample-bias discount**: `snow-2026-05.md`
- **AI platform re-rate / thematic multiple expansion / new-customer tier disclosure**: `snow-2026-05.md`, `mdb-2026-05.md`
- **Bull-conviction count → asymmetry rule activates**: `snow-2026-05.md`
- **Mixed-conviction (count high but ≥2 inversions) → bull put spread workhorse, NOT long calls**: `mdb-2026-05.md`
- **Conviction-count quality/inversion overlay (chasing-not-de-risked / flow-against / adverse same-level prior print)**: `mdb-2026-05.md`
- **Stock ripping INTO the print (chasing) + priced-in / fade-risk after run-up**: `mdb-2026-05.md`
- **"Don't sell a freshly-demonstrated fat tail" (refuse IC/JL even when ex-post it would've worked)**: `mdb-2026-05.md`
- **Asymmetry rule applied CORRECTLY (win) vs the SNOW failure (loss) — A/B one day apart**: `mdb-2026-05.md` + `snow-2026-05.md`
- **VIX call spread / "short the market with VIX" / tail hedge**: `vix-2026-06.md` (futures-anchored, contango bleed, beta<1, debit-spread skew bite)
- **Why "VIX +40%" ≠ "my position +40%" (futures beta < 1, further-dated moves less)**: `vix-2026-06.md`
- **Debit call-spread short-leg skew bite on a vol spike**: `vix-2026-06.md`
- **Don't chase the spike / adding into a ripping VIX pays escalating vol-of-vol**: `vix-2026-06.md`
- **2:1 long ratio (buy 2 / sell 1) to stay net-long the right tail vs the 1:1 spread's skew bite**: `vix-2026-06.md`, `../pitfalls/25-vix-options-futures-mechanics.md`

## Adding a New Case Study

1. Copy `_template.md` to `<ticker>-YYYY-MM.md`
2. Fill out frontmatter (`ticker`, `event`, `date`, `status`, `result`, `structures`, `tags`)
3. Document the trade arc — Setup, Strategy Evolution by stage, Outcome, What Worked, What Got Wrong, Lessons, Reusable Framework
4. Add row to the index above
5. If the case yields new pitfalls, add files under `../pitfalls/` and link them from this case study
