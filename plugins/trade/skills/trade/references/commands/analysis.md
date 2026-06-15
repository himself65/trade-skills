---
type: Command Reference
title: "/trade analysis [ticker | situation]"
description: Default analysis flow — preflight (knowledge dir, vega sanity, market data) then a situation → reference map.
tags: [command, analysis, preflight, routing]
timestamp: 2026-06-13T01:18:31Z
---

# /trade analysis [ticker | situation]

The default flow. Runs whenever the user invokes `/trade analysis ...` **or** when the first argument doesn't match a known subcommand (e.g., "analyze NVDA", "structure for TSLA earnings", "sell put on APP", a ticker in a trading context).

> **First, check this isn't an ingestion request.** A pasted **link / article / research the user wants you to read, study, digest, or save to the knowledge base** is *not* a trade-analysis target even though it lands here by default (its first word doesn't match a subcommand). Route it to [`import.md`](import.md) and write the result to the **user's personal knowledge dir** (a writedown), **never** the curated `references/` library. Only proceed with the analysis flow below when the user actually wants a trade analyzed.

## Preflight (always run, in order)

1. **Locate and scan the personal knowledge directory.** Resolve its path in this order — first one that exists wins:
   1. `$TRADE_KNOWLEDGE_DIR` (environment variable), if set.
   2. A `knowledge_path:` line in the nearest `CLAUDE.md` (project root, then `~/.claude/CLAUDE.md`) — an absolute or `~`-path. **This is how a knowledge dir kept in a _different_ repo (e.g. a private notes repo) is found regardless of the current working directory.**
   3. `./knowledge/` relative to the current working directory.

   If none resolves to an existing directory, skip this step. Once located:
   - If `<knowledge>/index.md` (or a legacy `README.md`) exists, read it as the user's personal index.
   - Skim **every** subdir of `<knowledge>/` (e.g. `substack/`, `twitter/`, `writedowns/`, and any curated module dir such as `frank/`) for filenames matching the current ticker / handle / topic, and load matches — parse `.yaml`, read `.md`. **Always ignore `*/raw/`.**

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
| Channel-check-driven thesis | [`../pitfalls/14-channel-check-sample-bias.md`](../pitfalls/14-channel-check-sample-bias.md), [`../pitfalls/24-capped-upside-vs-bull-conviction.md`](../pitfalls/24-capped-upside-vs-bull-conviction.md) (confluence ≥ 3 sources overrides single-source discount → activates the asymmetry rule); [`../ticker/mdb-2026-05.md`](../ticker/mdb-2026-05.md) (bull-conviction count needs a quality / inversion overlay) |
| High-vol single name (APP/MSTR/COIN/PLTR) | [`../pitfalls/12-manipulator-tape.md`](../pitfalls/12-manipulator-tape.md), [`../pitfalls/13-take-profit-discipline.md`](../pitfalls/13-take-profit-discipline.md), [`../pitfalls/15-orderbook-fade-signal.md`](../pitfalls/15-orderbook-fade-signal.md); [`../ticker/app-2026-05.md`](../ticker/app-2026-05.md) |
| Sell-the-news fade attempt | [`../pitfalls/01-consensus-not-bearish.md`](../pitfalls/01-consensus-not-bearish.md), [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md), [`../pitfalls/03-tape-over-dcf.md`](../pitfalls/03-tape-over-dcf.md), [`../pitfalls/04-flip-on-invalidation.md`](../pitfalls/04-flip-on-invalidation.md), [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md); [`../ticker/intc-2026-04.md`](../ticker/intc-2026-04.md), [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| Multi-name cluster earnings | [`../pitfalls/09-preconditions-not-direction.md`](../pitfalls/09-preconditions-not-direction.md), [`../pitfalls/10-t-plus-1-reverse-drift.md`](../pitfalls/10-t-plus-1-reverse-drift.md), [`../pitfalls/11-leaps-vega-tax.md`](../pitfalls/11-leaps-vega-tax.md); [`../ticker/mag7-2026-q1.md`](../ticker/mag7-2026-q1.md) |
| LEAPS / stock-replacement thesis | [`../strategies.md`](../strategies.md) (LEAPS section); [`../pitfalls/11-leaps-vega-tax.md`](../pitfalls/11-leaps-vega-tax.md), [`../pitfalls/16-bsm-drift-vs-vol.md`](../pitfalls/16-bsm-drift-vs-vol.md), [`../pitfalls/18-roll-frequency-vs-iv-thesis.md`](../pitfalls/18-roll-frequency-vs-iv-thesis.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) |
| Vol-mispricing / IV-thesis claim | [`../pitfalls/16-bsm-drift-vs-vol.md`](../pitfalls/16-bsm-drift-vs-vol.md), [`../pitfalls/18-roll-frequency-vs-iv-thesis.md`](../pitfalls/18-roll-frequency-vs-iv-thesis.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) |
| Expiry-day / gamma squeeze / pinning | [`../gamma-framework.md`](../gamma-framework.md); [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md) |
| Dealer flow / options market structure question | [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md); [`../gamma-framework.md`](../gamma-framework.md) |
| Post-earnings gap-up + intraday fade (consider holding vs reversal) | [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/10-t-plus-1-reverse-drift.md`](../pitfalls/10-t-plus-1-reverse-drift.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| High IV but no near-term event (>30 days to earnings) | [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md), [`../pitfalls/07-iv-crush-favors-short.md`](../pitfalls/07-iv-crush-favors-short.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) |
| Thematic re-rate / sector co-rally / KOL-amplified setup | [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md), [`../pitfalls/24-capped-upside-vs-bull-conviction.md`](../pitfalls/24-capped-upside-vs-bull-conviction.md); [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md), [`../ticker/snow-2026-05.md`](../ticker/snow-2026-05.md) |
| About to call "IV crush coming" or "fade incoming" | **MANDATORY**: [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md), [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) — pull flow data + catalyst clock BEFORE publishing the prediction |
| Hot IPO / pre-options-listing / lock-up front-run | [`../ticker/cbrs-2026-05.md`](../ticker/cbrs-2026-05.md); [`../pitfalls/12-manipulator-tape.md`](../pitfalls/12-manipulator-tape.md), [`../pitfalls/13-take-profit-discipline.md`](../pitfalls/13-take-profit-discipline.md), [`../pitfalls/15-orderbook-fade-signal.md`](../pitfalls/15-orderbook-fade-signal.md) |
| Exit / take-profit decision — "let it run to target" vs book now | [`../pitfalls/13-take-profit-discipline.md`](../pitfalls/13-take-profit-discipline.md), [`../pitfalls/23-hazard-rate-discounting.md`](../pitfalls/23-hazard-rate-discounting.md) (hazard rate sets the optimal exit threshold) |
| Rates / yields cited as the cause of an equity move | [`../pitfalls/22-yields-not-causal.md`](../pitfalls/22-yields-not-causal.md) (yields are a coincident read, not the causal driver) |
| **About to recommend Jade Lizard / Iron Condor / Calendar / Diagonal** | **MANDATORY**: [`../pitfalls/24-capped-upside-vs-bull-conviction.md`](../pitfalls/24-capped-upside-vs-bull-conviction.md); [`../ticker/snow-2026-05.md`](../ticker/snow-2026-05.md), [`../ticker/tsem-2026-05.md`](../ticker/tsem-2026-05.md) — run the bull-conviction count + counterfactual P/L matrix FIRST. If count ≥ 4, these structures are forbidden. |
| **High-conviction bull setup (channel confluence + thematic re-rate + de-risked stock)** | [`../pitfalls/24-capped-upside-vs-bull-conviction.md`](../pitfalls/24-capped-upside-vs-bull-conviction.md); [`../ticker/snow-2026-05.md`](../ticker/snow-2026-05.md); [`../strategies.md`](../strategies.md) (asymmetry-rule section) — use naked short put / bull put spread / risk reversal / long call, NOT Jade Lizard or IC |
| **Structure choice for directional conviction (high or low gap to consensus)** | [`../ticker/tsem-2026-05.md`](../ticker/tsem-2026-05.md), [`../ticker/snow-2026-05.md`](../ticker/snow-2026-05.md); [`../pitfalls/24-capped-upside-vs-bull-conviction.md`](../pitfalls/24-capped-upside-vs-bull-conviction.md), [`../pitfalls/19-direction-vega-independent-axes.md`](../pitfalls/19-direction-vega-independent-axes.md), [`../pitfalls/06-clever-structures-fading-conviction.md`](../pitfalls/06-clever-structures-fading-conviction.md) |
| **VIX / volatility hedge / "short the market" via VIX / tail-crash hedge** | **MANDATORY**: [`../pitfalls/25-vix-options-futures-mechanics.md`](../pitfalls/25-vix-options-futures-mechanics.md) (anchor to the future not spot; contango bleed; beta < 1; debit-spread skew bite); [`../strategies.md`](../strategies.md) (VIX section); [`../ticker/vix-2026-06.md`](../ticker/vix-2026-06.md) — pull the VIX term structure (VIX9D / VIX / VIX3M / VIX6M) and model P/L off the future, never spot |
| **M&A / spin / sum-of-parts / "discounted proxy for a private or to-be-listed co" / any stock-based deal consideration** | **MANDATORY**: [`../pitfalls/26-stock-consideration-share-vs-dollar-anchored.md`](../pitfalls/26-stock-consideration-share-vs-dollar-anchored.md) (share-anchored vs dollar-anchored — a fixed reference price = a fixed share count that marks to market; normalize the split basis; cross-check the tape) + [`../ticker/sats-2026-06.md`](../ticker/sats-2026-06.md); [`../pitfalls/23-hazard-rate-discounting.md`](../pitfalls/23-hazard-rate-discounting.md) (why a locked/undelivered stake trades at a discount), [`../pitfalls/08-priced-in-not-binary.md`](../pitfalls/08-priced-in-not-binary.md) — verify the consideration mechanism from the primary 8-K/10-K BEFORE concluding whether the target's stock flows through |

## Output rules (reminders)

- **Analysis order**: tape → sentiment/catalysts → valuation. Never start with DCF for short-term trades.
- **Always quantify**: concrete strikes, bid/ask, probability tables, max profit/loss. No vague "consider a bull put spread".
- **Be self-critical**: when pushed back, update estimates and say so. Don't defensively reinforce prior calls.
- **Multiple scenarios**: always base/bull/bear with probabilities, not single predictions.
- **Defined risk always** on event trades — never naked.
- **Vega sanity check** before publishing any directional structure recommendation.
