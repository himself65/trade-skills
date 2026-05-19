# /trade analysis [ticker | situation]

The default flow. Runs whenever the user invokes `/trade analysis ...` **or** when the first argument doesn't match a known subcommand (e.g., "analyze NVDA", "structure for TSLA earnings", "sell put on APP", a ticker in a trading context).

## Preflight (always run, in order)

1. **Check the personal knowledge directory** (default `./knowledge/`, or wherever the user configured via `/trade setup`):
   - If `<knowledge>/README.md` exists, read it as the user's personal index.
   - Skim `<knowledge>/{substack,twitter,writedowns}/` filenames for current ticker / handle / topic and load matches. YAML for substack/twitter, markdown for writedowns. Ignore `*/raw/`.

2. **Always load** [`../strategies.md`](../strategies.md) — structure-to-regime matching and setup checklist.

3. **Always load** [`../pitfalls/19-direction-vega-independent-axes.md`](../pitfalls/19-direction-vega-independent-axes.md) — vega-axis sanity check. Wrong net vega sign (credit spread at low IVR, debit spread at high IVR) is the dominant directional-structure failure mode.

4. **Pull market data** via the `finance-data-providers:tradingview-reader` skill first (quotes, options chain, IV, screener). Fall back to `finance-data-providers:funda-data` for anything TradingView doesn't cover (fundamentals, filings, transcripts, analyst estimates, options flow/GEX, supply chain, sentiment, Polymarket, congressional trades, economics). Do not substitute yfinance, web search, or guesses.

5. **Before predicting "IV crush" or "T+1 fade"** — pull net options premium flow data and check the catalyst clock. Required by the Hard Rule. See pitfalls 20 and 21.

## Situation → load index

| Situation | Files to load |
|-----------|---------------|
| Reading tape / explaining a move / vacuum-zone identification | [`../price-action-framework.md`](../price-action-framework.md) |
| "Why did the stock react this way to news?" | [`../price-action-framework.md`](../price-action-framework.md); [`../pitfalls/08-priced-in-not-binary.md`](../pitfalls/08-priced-in-not-binary.md) |
| Retail saturation / KOL-amplified setup / social-media-saturation check | [`../price-action-framework.md`](../price-action-framework.md) (float composition); [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| Earnings play | [`../pitfalls/05-priced-in-percentage.md`](../pitfalls/05-priced-in-percentage.md), [`../pitfalls/07-iv-crush-favors-short.md`](../pitfalls/07-iv-crush-favors-short.md), [`../pitfalls/09-preconditions-not-direction.md`](../pitfalls/09-preconditions-not-direction.md), [`../pitfalls/10-t-plus-1-reverse-drift.md`](../pitfalls/10-t-plus-1-reverse-drift.md), [`../pitfalls/11-leaps-vega-tax.md`](../pitfalls/11-leaps-vega-tax.md), [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) |
| Channel-check-driven thesis | [`../pitfalls/14-channel-check-sample-bias.md`](../pitfalls/14-channel-check-sample-bias.md) |
| High-vol single name (APP/MSTR/COIN/PLTR) | [`../pitfalls/12-manipulator-tape.md`](../pitfalls/12-manipulator-tape.md), [`../pitfalls/13-take-profit-discipline.md`](../pitfalls/13-take-profit-discipline.md), [`../pitfalls/15-orderbook-fade-signal.md`](../pitfalls/15-orderbook-fade-signal.md); [`../ticker/app-2026-05.md`](../ticker/app-2026-05.md) |
| Sell-the-news fade attempt | [`../pitfalls/01-consensus-not-bearish.md`](../pitfalls/01-consensus-not-bearish.md), [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md), [`../pitfalls/03-tape-over-dcf.md`](../pitfalls/03-tape-over-dcf.md), [`../pitfalls/04-flip-on-invalidation.md`](../pitfalls/04-flip-on-invalidation.md), [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md); [`../ticker/intc-2026-04.md`](../ticker/intc-2026-04.md), [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| Multi-name cluster earnings | [`../pitfalls/09-preconditions-not-direction.md`](../pitfalls/09-preconditions-not-direction.md), [`../pitfalls/10-t-plus-1-reverse-drift.md`](../pitfalls/10-t-plus-1-reverse-drift.md), [`../pitfalls/11-leaps-vega-tax.md`](../pitfalls/11-leaps-vega-tax.md); [`../ticker/mag7-2026-q1.md`](../ticker/mag7-2026-q1.md) |
| LEAPS / stock-replacement thesis | [`../strategies.md`](../strategies.md) (LEAPS section); [`../pitfalls/11-leaps-vega-tax.md`](../pitfalls/11-leaps-vega-tax.md), [`../pitfalls/16-bsm-drift-vs-vol.md`](../pitfalls/16-bsm-drift-vs-vol.md), [`../pitfalls/18-roll-frequency-vs-iv-thesis.md`](../pitfalls/18-roll-frequency-vs-iv-thesis.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) |
| Vol-mispricing / IV-thesis claim | [`../pitfalls/16-bsm-drift-vs-vol.md`](../pitfalls/16-bsm-drift-vs-vol.md), [`../pitfalls/18-roll-frequency-vs-iv-thesis.md`](../pitfalls/18-roll-frequency-vs-iv-thesis.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) |
| Expiry-day / gamma squeeze / pinning | [`../gamma-framework.md`](../gamma-framework.md); [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md) |
| Dealer flow / options market structure question | [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md); [`../gamma-framework.md`](../gamma-framework.md) |
| Post-earnings gap-up + intraday fade (consider holding vs reversal) | [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/10-t-plus-1-reverse-drift.md`](../pitfalls/10-t-plus-1-reverse-drift.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| High IV but no near-term event (>30 days to earnings) | [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md), [`../pitfalls/07-iv-crush-favors-short.md`](../pitfalls/07-iv-crush-favors-short.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| Thematic re-rate / sector co-rally / KOL-amplified setup | [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| About to call "IV crush coming" or "fade incoming" | **MANDATORY**: [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) — pull flow data + catalyst clock BEFORE publishing the prediction |
| Hot IPO / pre-options-listing / lock-up front-run | [`../ticker/cbrs-2026-05.md`](../ticker/cbrs-2026-05.md); [`../pitfalls/12-manipulator-tape.md`](../pitfalls/12-manipulator-tape.md), [`../pitfalls/13-take-profit-discipline.md`](../pitfalls/13-take-profit-discipline.md), [`../pitfalls/15-orderbook-fade-signal.md`](../pitfalls/15-orderbook-fade-signal.md) |

## Output rules (reminders)

- **Analysis order**: tape → sentiment/catalysts → valuation. Never start with DCF for short-term trades.
- **Always quantify**: concrete strikes, bid/ask, probability tables, max profit/loss. No vague "consider a bull put spread".
- **Be self-critical**: when pushed back, update estimates and say so. Don't defensively reinforce prior calls.
- **Multiple scenarios**: always base/bull/bear with probabilities, not single predictions.
- **Defined risk always** on event trades — never naked.
- **Vega sanity check** before publishing any directional structure recommendation.
