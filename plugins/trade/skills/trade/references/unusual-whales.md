---
type: Data Source
title: Unusual Whales — direct API access (subscription-gated)
description: How to use a live Unusual Whales subscription directly — availability gate, auth headers, endpoint map by trading question, scope/entitlement handling, and verified field traps. Skip the whole tier when no key is present and fall back to TradingView + Funda.
tags: [data-source, unusual-whales, options-flow, dark-pool, gex, iv-rank, api]
timestamp: 2026-08-11T00:00:00Z
---

# Unusual Whales — direct access

**Optional tier.** Unusual Whales (UW) is the upstream source behind most of the options-flow fields this skill already uses through Funda (`bullish_premium`, `net_call_premium`, `*_volume_ask_side`, `flow-alerts`, `greek-exposure`). When the user has their own UW subscription, query it **directly** instead of through a proxy: no shared-credit ceiling, higher resolution (intraday ticks, per-strike spot GEX, multi-leg legs), and several datasets Funda does not expose at all (dark pool prints, market tide, OI change, off/lit price levels).

This file is loaded **only when UW is actually reachable**. When it is not, nothing here applies — use the tiers in [`../SKILL.md`](../SKILL.md) → Data Access and say which proxy the read is built on.

## 1. Availability gate — run this before promising any UW dataset

Check in order; first hit wins:

1. **UW MCP tools present in the session** (server `https://api.unusualwhales.com/api/mcp`) → use them; they are the same data with no shell plumbing.
2. **`$UNUSUAL_WHALES_API_KEY` in the environment** → REST (§2).
3. **`.env` at the repo root.** Inside a worktree (`.claude/worktrees/*`) the worktree has no `.env` — strip the `.claude/worktrees/<name>` suffix and read the main repo's.
4. **The personal knowledge dir's repo** — `<knowledge>/.env` or its parent repo root `<knowledge>/../.env` (the knowledge dir is resolved in the [`commands/analysis.md`](commands/analysis.md) preflight).
5. **Nothing found → UW is unavailable.** Fall back to TradingView MCP / reader / Funda, and state in the reply that the flow read is the Funda proxy. Never present a UW-only dataset (dark pool, market tide, multi-leg legs, net-premium ticks) as if it were available, and never fill the gap with an estimate.

## 2. Access

### A. MCP server (preferred when the user has wired it up)

```
https://api.unusualwhales.com/api/mcp     Authorization: Bearer <UNUSUAL_WHALES_API_KEY>
```

One-time user setup (not something this skill can do for them):

```bash
claude mcp add --transport http unusual-whales https://api.unusualwhales.com/api/mcp --header "Authorization: Bearer $UNUSUAL_WHALES_API_KEY"
```

### B. REST (works immediately with just the key)

```
GET https://api.unusualwhales.com/api/...
Authorization: Bearer $UNUSUAL_WHALES_API_KEY
UW-CLIENT-API-ID: 100001
Accept: application/json
```

- **Every** endpoint is `GET`. Never POST/PUT/DELETE (the sole exception, alert-config creation, is out of scope here — this skill is read-only).
- The `UW-CLIENT-API-ID` header is **required**.
- Never pass the key as `apiKey=` / `api_key=` in the query string.
- More than ~3 tickers → one small loop-and-aggregate script, not dozens of separate calls.
- **Set a real `User-Agent` in any script.** The edge blocks the default `Python-urllib/*` agent with a bare-text `403 / error code: 1010` — a correct key and a valid path still fail. `urllib.request` needs `"User-Agent": "curl/8.7.1"` (or any normal agent) explicitly; `curl` and `requests` send one already. See §5 for telling this 403 apart from an entitlement 403.

## 3. Anti-hallucination whitelist

Only paths that appear in the live docs exist. Verify with either:

```bash
curl -s -H "Accept: text/plain" https://api.unusualwhales.com/docs      # full endpoint table, ~28 KB
curl -s https://api.unusualwhales.com/api/openapi                        # OpenAPI spec (205 paths)
```

Commonly hallucinated paths that **do not exist** (per UW's own published skill):

| ❌ Fake | ✅ Real |
|---|---|
| `/api/options/flow`, `/api/flow`, `/api/flow/live` | `/api/option-trades/flow-alerts` |
| `/api/stock/{t}/flow` | `/api/stock/{t}/flow-recent` |
| `/api/stock/{t}/options` | `/api/stock/{t}/option-contracts` |
| `/api/unusual-activity` | `/api/screener/option-contracts` |
| anything with `/api/v1/` or `/api/v2/` | — (no version segment) |

## 4. Endpoint map — by the question being asked

| Question | Endpoints | Paired rule |
|---|---|---|
| **Today's flow direction for a name** | `/api/stock/{t}/options-volume` (complete daily aggregate) | [`commands/report.md`](commands/report.md) §3 metric derivations |
| **Intraday accumulation vs distribution** | `/api/stock/{t}/net-prem-ticks` (5-min series incl. `net_delta`) | [`parent-order-flow-framework.md`](parent-order-flow-framework.md) — read the *derivative*, not the level |
| **Big tickets / whale prints** | `/api/option-trades/flow-alerts`, `/api/stock/{t}/flow-alerts`, `/api/option-trades` (raw tape) | [`pitfalls/02-single-flow-not-smart-money.md`](pitfalls/02-single-flow-not-smart-money.md) |
| **Is that block actually a spread leg?** | `/api/option-trades/multi-leg`, `/api/option-trades/multi-leg/{id}/legs` | **MANDATORY** [`pitfalls/32-multi-leg-share-before-block-direction.md`](pitfalls/32-multi-leg-share-before-block-direction.md) — these two endpoints make the filter *exact* instead of a share estimate |
| **Dark pool / off-exchange blocks** | `/api/darkpool/{t}`, `/api/darkpool/recent`, `/api/stock/{t}/stock-volume-price-levels` (off vs lit) | §6 — prints carry **no aggressor side**; infer from `price` vs `nbbo_bid`/`nbbo_ask` and say it is an inference |
| **Dealer gamma / pin risk** | `/api/stock/{t}/spot-exposures/strike` (per-strike gamma·vanna·charm, OI *and* volume based), `/gex-levels`, `/greek-exposure[/expiry|/strike|/strike-expiry]`, `/greek-flow` | [`gamma-framework.md`](gamma-framework.md) — outputs levels + probability, never direction |
| **Expiry / pinning structure** | `/api/stock/{t}/max-pain`, `/oi-per-strike`, `/oi-per-expiry`, `/expiry-breakdown`, `/api/market/oi-change` | `gamma-framework.md` (max pain is a LOW-effectiveness signal — keep it that way) |
| **IV rank / vega axis** | `/api/stock/{t}/iv-rank` (`iv_rank_1y`), `/interpolated-iv`, `/volatility/term-structure`, `/atm-chains`, `/historical-risk-reversal-skew` | **This retires the Yahoo-IV caveat**: the TradingView MCP's chain IV is not valid for IV-rank; `iv-rank` here is. [`pitfalls/19-direction-vega-independent-axes.md`](pitfalls/19-direction-vega-independent-axes.md). **IVR alone never settles a premium sale** — pair with `/volatility/realized` + `/variance-risk-premium` per [`pitfalls/36-ivr-ranks-vol-vrp-prices-it.md`](pitfalls/36-ivr-ranks-vol-vrp-prices-it.md) |
| **Vol mispricing claim** | `/api/stock/{t}/volatility/realized`, `/volatility/stats`, `/volatility/variance-risk-premium`, `/volatility/anomaly` | [`pitfalls/16-bsm-drift-vs-vol.md`](pitfalls/16-bsm-drift-vs-vol.md), [`pitfalls/21-event-iv-vs-demand-iv.md`](pitfalls/21-event-iv-vs-demand-iv.md) |
| **Chain / greeks / per-strike flow** | `/api/stock/{t}/option-chains`, `/greeks`, `/option-contracts`, `/flow-per-strike`, `/flow-per-strike-intraday`, `/flow-per-expiry`, `/option/stock-price-levels` | Removes most desktop-reader trips (which relaunch CDP and close the user's charts) |
| **Market-wide breadth / risk appetite** | `/api/market/market-tide`, `/api/market/{sector}/sector-tide`, `/api/market/{t}/etf-tide`, `/total-options-volume`, `/top-net-impact`, `/movers` | [`macro-framework.md`](macro-framework.md) dashboards |
| **Short interest / FTDs** | `/api/shorts/{t}/data`, `/interest-float/v2`, `/volume-and-ratio`, `/ftds`, `/api/short_screener` | [`price-action-framework.md`](price-action-framework.md) float composition |
| **Who owns it / who's trading it** | `/api/insider/{t}`, `/api/insider/transactions`, `/api/institution/{t}/ownership`, `/api/institution/{name}/holdings`, `/api/politician-portfolios/recent_trades` | 13F is quarterly and stale by construction |
| **Fundamentals / earnings history** | `/api/stock/{t}/financials`, `/income-statements`, `/balance-sheets`, `/cash-flows`, `/earnings`, `/fundamental-breakdown` | Still tape → catalysts → valuation, never DCF-first |
| **Macro calendar** | `/api/market/economic-calendar`, `/api/economy/{indicator}`, `/api/market/fda-calendar`, `/api/calendar/ipo` | `macro-framework.md` |
| **Screening** | `/api/screener/option-contracts` (hottest chains), `/api/screener/stocks`, `/api/screener/analysts` | — |
| **Seasonality** | `/api/seasonality/{t}/monthly`, `/year-month`, `/api/seasonality/market` | Base rate only; never a thesis on its own |

Streaming (`/api/socket/*`, Kafka) exists but is out of scope — never open a socket for a one-shot read.

## 5. Entitlements — a 403/422 is an answer, not a retry

Scopes and add-ons are **per plan**. Verified against this user's key on 2026-08-11:

| Path | Status | Handling |
|---|---|---|
| `/api/volatility/vix-term-structure` | **403 `volatility_scope_required`** (market-wide volatility add-on) | For VIX-curve work ([`pitfalls/25-vix-options-futures-mechanics.md`](pitfalls/25-vix-options-futures-mechanics.md)) keep using TradingView / Funda. Per-ticker `/api/stock/{t}/volatility/*` **does** work. |
| `/api/congress/unusual-trades` | **422 premium endpoint** | Use Funda congressional trades. |
| `/api/futures/*` (`contracts`, `{c}/candles`) | **500** (observed twice, 2026-08-11) | Treat futures as unavailable here. 夜盘 stays on the TradingView MCP — see [`overnight-futures-framework.md`](overnight-futures-framework.md). |

Everything else probed returned 200: options-volume, flow-alerts, multi-leg, option chains, greeks, spot-exposures, gex-levels, max-pain, oi-per-strike, oi-change, iv-rank, interpolated-iv, per-ticker volatility (term-structure / realized / stats), risk-reversal skew, darkpool, net-prem-ticks, market-tide, screener, insider, institutional ownership, shorts, economic calendar.

**Read the body before concluding anything from a 403** — two different failures share the status code:

| Body | Meaning | Do |
|---|---|---|
| JSON naming a scope, e.g. `{"code": "volatility_scope_required", ...}` | The add-on is not on the plan | **Answer, not a retry.** Say the dataset isn't on the plan, name the fallback, move on. |
| Plain text `error code: 1010` | The edge blocked the client **User-Agent** (default `Python-urllib/*`) — nothing to do with entitlements | Set a normal `User-Agent` and retry. Reporting this as "no access" is a misdiagnosis. |

**Rule:** on a genuine scope/entitlement error, say the dataset is not on the plan and name the fallback. Do not retry, do not swap in a different metric silently, do not estimate the number.

## 6. Field traps (verified live, 2026-08-11)

- **Numbers arrive as strings** — `"net_call_premium": "-20818513.00"`, `"price": "217.71"`. Cast before arithmetic and before sorting; a string sort puts `"9"` above `"10"` and will mis-rank a block list.
- **A batch script needs an explicit `User-Agent`** (§2B). The default `Python-urllib/*` agent gets a bare `403 / error code: 1010` on every path — reproducible, and unrelated to the key or to entitlements.
- **Sign convention matches the Funda-proxy convention** already used in `report.md`: negative `net_call_premium` = calls net **sold**.
- **`market-tide` / `net-prem-ticks` are intraday series.** `market-tide` timestamps are ET with offset (`2026-08-11T09:30:00-04:00`); `net-prem-ticks` `tape_time` is **UTC** (`13:30:00Z` = the 09:30 ET open). Don't mix the two vintages in one sentence, and don't read the last element as an end-of-day number before the close.
- **Dark pool prints have no aggressor side.** Fields are `size`, `price`, `premium`, `executed_at`, `nbbo_bid`/`nbbo_ask`, `market_center`, `trade_code`. Direction is an *inference* from print price vs the NBBO at execution — label it as such. A dark-pool print is a *transfer*, so it is not evidence of retail vs institutional intent on its own ([`pitfalls/02-single-flow-not-smart-money.md`](pitfalls/02-single-flow-not-smart-money.md)).
- **`spot-exposures/strike` splits every greek two ways** — `*_oi` (open-interest based) vs `*_vol` (session-volume based), and bid/ask variants. Say which one the read uses; they disagree on days with heavy new flow.
- **Quotas are daily**: API Trial 30k/day, API Basic 40k/day, API Advanced unlimited (per unusualwhales.com/public-api). Any repeated scan should be a bounded batch, and a truncated pull must be disclosed the same way `report.md` discloses `flow-alerts` truncation.
- **`volatility/realized` is a FORWARD-ALIGNED series, not a same-day comparison.** Each row pairs `implied_volatility` at that row's `date` with the vol that actually realized over the window *following* it; `unshifted_rv_date` is the date that realized window **closes**. A row dated `2026-07-28` carrying `implied_volatility 1.556` / `realized_volatility 1.740` means the market charged 155.6% and the name then delivered 174.0% — a properly aligned backtest of a premium sale, and the only correct way to read it. Comparing today's IV to today's *trailing* RV is a different and misleading calculation (non-overlapping windows). The series lags by roughly the horizon, so the newest rows carry `realized_volatility: null` — expected, not missing data; `volatility/variance-risk-premium` lags for the same reason. See [`pitfalls/36-ivr-ranks-vol-vrp-prices-it.md`](pitfalls/36-ivr-ranks-vol-vrp-prices-it.md).
- **`volatility/stats` gives the whole vega picture in one call** — `iv`, `rv`, `iv_rank`, and the 1-year `iv_low`/`iv_high` **and `rv_low`/`rv_high`** bands. The `rv` band is what makes a "vol will mean-revert" forecast checkable instead of asserted.
- **US options only.** Non-US listings (e.g. Tokyo 6981) are not covered — those stay on Funda / IBKR.

## 7. What UW does *not* replace

- **TradingView MCP** — TA readouts / indicator ratings, multi-timeframe alignment, screeners across non-options universes, 夜盘 futures (UW futures 500s), non-US quotes.
- **TradingView desktop reader** — the user's own watchlists, alerts, and chart screenshots.
- **Funda** — filings text, transcripts, analyst estimates, supply chain, enriched news/sentiment, congressional trades (gated here), Polymarket.

## Related

- [`../SKILL.md`](../SKILL.md) — Data Access tier order (UW sits above Funda for flow/GEX/IV-rank when reachable).
- [`commands/report.md`](commands/report.md) — the daily 资金流向 read; the UW path is the preferred one and adds the dark-pool layer.
- [`pitfalls/32-multi-leg-share-before-block-direction.md`](pitfalls/32-multi-leg-share-before-block-direction.md) · [`pitfalls/02-single-flow-not-smart-money.md`](pitfalls/02-single-flow-not-smart-money.md) · [`pitfalls/17-dealer-flow-not-retail.md`](pitfalls/17-dealer-flow-not-retail.md) — better data does not change what the flow *means*.
- [`gamma-framework.md`](gamma-framework.md) · [`parent-order-flow-framework.md`](parent-order-flow-framework.md) — the interpretation layers these endpoints feed.
