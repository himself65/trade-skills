---
type: Command Reference
title: "/trade report [tickers | basket]"
description: Today's capital-flow / 资金流向 read for one or more names — retail / 大单 / institutional proxied from options premium-flow (Unusual Whales direct when subscribed, Funda otherwise), mapped to a comparison table + cross-section synthesis. Read-only, not investment advice.
tags: [command, report, capital-flow, money-flow, options-flow, funds-flow]
timestamp: 2026-06-22T20:00:00Z
---

# /trade report &lt;tickers | basket&gt;

A daily **capital-flow / 资金流向** read across one or more names: who is buying vs selling today, split as a **散户 / 大单 / 机构** proxy, plus the price/volume context — rendered as a comparison table with a cross-section synthesis.

Runs whenever the user invokes `/trade report ...`, or asks for 资金流向 / 流入流出 / 净流入·净流出 / 散户·大单·机构 / capital flow / money flow / "who's buying" across a name or a basket.

> **Read the 口径 (data-source reality) FIRST — and state it in every reply.** There is **no** stock-side "retail / large-order / institutional daily net inflow" feed available here. The moomoo / Futu three-layer stock flow needs a logged-in **FutuOpenD gateway + the `futu-api` SDK** (`get_financial_unusual`) — env-gated and usually not running. So this command builds the read from **options premium-flow** as the proxy:
>
> - **大单 / 机构 (smart money)** ← options `bullish/bearish premium`, net call/put premium, ask-vs-bid volume, and big-ticket flow alerts. Real institutional/large positioning shows up in options $ first.
> - **散户 (retail)** ← `news/sentiment` tone (a *weak* proxy, not $ flow; coverage is thin on small / niche names).
> - **机构 stock-side daily net flow** ← **not a net-flow feed.** With a UW key you *do* get the off-exchange print tape (`/api/darkpool/{t}`, `/api/stock/{t}/stock-volume-price-levels`) — size, price, and off-vs-lit split — but prints carry **no aggressor side**, so it is block *activity* at price levels, not signed institutional inflow. Without UW there is nothing here but quarterly 13F `ownership`. Either way, say which one you have; don't fabricate a signed number.
>
> If the user wants the *true* moomoo three-layer stock flow, point them to the Futu path: `pip install futu-api` + start FutuOpenD on `127.0.0.1:11111` (you can install the SDK but cannot log in their gateway). See `futu-capital-anomaly` skill.

## Arguments

- **Explicit tickers** (space- or comma-separated): `report COHR LITE MU` → run those.
- **A sector / theme word** (e.g. "光" / optical, "存储" / memory, "光模块+存储"): **confirm the ticker universe first** (propose constituents + a market, ask via `AskUserQuestion`) — don't silently guess a basket. Once confirmed, group the output by basket.
- **Optional date**: default **today**. The endpoints return the latest session; if the user names a date, pass it through where the endpoint supports `date=`.
- Mixed baskets → render one table per basket so the cross-section reads cleanly.

## Workflow

### 1. Resolve the data path

**Check Unusual Whales first** — run the availability gate in [`../unusual-whales.md`](../unusual-whales.md) §1 (UW MCP in session, else `UNUSUAL_WHALES_API_KEY` from env → repo-root `.env` → the knowledge dir's repo `.env`).

- **UW reachable → use §2a.** UW is the upstream source of the Funda options fields, so the same metrics come back without the proxy or its shared-credit ceiling, plus intraday ticks and the dark-pool layer.
- **UW not reachable → use §2b (Funda).** Resolve the Funda key per the `finance-data-providers:funda-data` skill: env `FUNDA_API_KEY`, else the repo-root `.env`, where the variable may be named `FUNDA_AI_API_KEY` instead — check both names. When inside a worktree, the key lives in the **main repo** `.env`.
- Either way: for more than ~3 tickers, batch them in one small script (loop + aggregate) rather than dozens of separate calls. **State in the reply which path produced the numbers** — the two are not interchangeable in resolution or coverage.

### 2a. Pull, per ticker — Unusual Whales path (preferred)

`GET https://api.unusualwhales.com/api/...` with `Authorization: Bearer $UNUSUAL_WHALES_API_KEY` **and** `UW-CLIENT-API-ID: 100001`.

| # | Endpoint | Gives | Use for |
|---|---|---|---|
| 1 | `/api/stock/{t}/options-volume` | same daily aggregate as the Funda row below (`bullish_premium`, `net_call_premium`, ask/bid-side volumes, avg volumes, OI) | **核心** — 大单/机构 direction |
| 2 | `/api/stock/{t}/net-prem-ticks` | 5-min intraday series: `net_call_premium`, `net_put_premium`, `net_delta`, ask/bid-side volume | **intraday shape** — morning-vs-close accumulation or distribution, which the daily aggregate flattens |
| 3 | `/api/stock/{t}/flow-alerts` or `/api/option-trades/flow-alerts?ticker_symbol={t}&min_premium=50000` | big tickets, each carrying `has_multileg` / `has_singleleg` / `has_sweep` / `has_floor`, `total_ask_side_prem` vs `total_bid_side_prem`, `volume_oi_ratio`, `iv_start`→`iv_end` | 大单 detail — the per-alert `has_multileg` flag is the pitfall-32 filter applied at the print level |
| 4 | `/api/option-trades/multi-leg` (+ `/multi-leg/{id}/legs`) | spread packages and their legs | **Run before ranking any block** — pitfall 32; here the de-contamination is exact, not a share estimate |
| 5 | `/api/darkpool/{t}` | off-exchange prints: `size`, `price`, `premium`, `executed_at`, `nbbo_bid`/`nbbo_ask`, `market_center` | the off-exchange block layer; direction is an **inference** from print vs NBBO — label it |
| 6 | `/api/stock/{t}/ohlc/1d` (or the TradingView MCP quote) | day % change | 涨跌% |
| 7 | `/api/stock/{t}/info` | `next_earnings_date`, `announce_time` (pre/postmarket), `beta`, `sector`, `avg30_volume` | 财报日 + basket context |
| 8 | `/api/market/market-tide` | market-wide net call/put premium series | the cross-section backdrop — is the name moving with or against the tape |

Values arrive as **strings** — cast before arithmetic and before sorting. `net-prem-ticks` `tape_time` is UTC; `market-tide` timestamps are ET-with-offset. See [`../unusual-whales.md`](../unusual-whales.md) §6.

**散户 tone still comes from Funda** on either path — UW serves headlines (`/api/news/headlines`) but no sentiment scoring. Pull `news/sentiment?ticker=<T>` from Funda for that one line; if no Funda key is available, drop the retail line and say why rather than substituting headline counts for tone.

### 2b. Pull, per ticker — Funda fallback

| # | Endpoint | Gives | Use for |
|---|---|---|---|
| 1 | `options/stock?ticker=<T>&type=options-volume` | today's row: `bullish_premium`/`bearish_premium`, `net_call_premium`/`net_put_premium`, `call/put_volume`, `*_volume_ask_side`/`*_bid_side`, `avg_7/30_day_*_volume`, OI | **核心** — complete daily aggregate; the 大单/机构 direction |
| 2 | `options/flow-alerts?ticker=<T>&min_premium=50000&limit=200` | big tickets: `type` (call/put), `total_premium`, `total_ask_side_prem`, `has_sweep`, `next_earnings_date` | 大单 detail + earnings date |
| 3 | `stock-price?ticker=<T>&limit=2` | last 2 EOD rows (param is **`ticker`**, not `symbol`) | day % change = `historical[0].close` vs `[1].close` |
| 4 | `news/sentiment?ticker=<T>` | `ticker_sentiment` positive/negative/neutral counts + latest direction | 散户 tone proxy |

**Quote-endpoint trap:** `/v1/quotes?type=` rejects `realtime-quotes` / `price-change` / `exchange-quotes` (FMP 400). Use `stock-price` for day change. Mind market-holiday gaps when computing "vs prior close" (e.g. Juneteenth → prior trading day is not yesterday).

**flow-alerts truncation — do not ignore:** the call caps at `limit` (200). When a name returns exactly the limit, there are *more* big tickets than you fetched, so your call/put **counts and summed premium are truncated** — use them only as an *activity* signal and take **direction from `options-volume`** (the complete aggregate). If you bound coverage this way, say so.

### 3. Derive the per-ticker metrics

The metric definitions below are field-identical on both paths (UW is the upstream of the Funda options fields). Row numbers cite the **2b** table; the 2a equivalents are noted inline.

- **涨跌%** — from #3 (2a: #6).
- **净期权流向 (牛−熊)** = `bullish_premium − bearish_premium` ($). Positive = net bullish smart-money $.
- **净 Call 权利金 / 净 Put 权利金** = `net_call_premium` / `net_put_premium`. **Sign matters**: positive = net *bought* (ask-side); **negative call premium = calls net SOLD** (bearish/distribution).
- **放量倍数** = `call_volume / avg_30_day_call_volume` (and puts). <1 = below average / quiet.
- **盘口** — `call_ask_side` vs `call_bid_side` (ask>bid = aggressive call buying); same for puts (put ask>bid = put buying). Cross-check it agrees with the premium signs — that agreement IS your adversarial check.
- **财报日** — `next_earnings_date` from #2 (2a: #7, which also gives `announce_time` pre/postmarket).
- **日内形态 (UW path only)** — from #2 `net-prem-ticks`: where in the session the premium arrived. A daily aggregate that is bullish only because of the first 15 minutes is a different fact from one that builds into the close; say which. Read the *derivative* per [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md).
- **暗池 (UW path only)** — from #5: total off-exchange premium, largest prints, and whether they printed above or below the NBBO midpoint. **Activity at price levels, not signed flow** — never sum it into the net-flow number.

### 4. Classify each name (聪明钱判定)

| Label | Trigger |
|---|---|
| 🟢 **多头确认** | price up **and** net flow bullish (牛>熊) **and** calls net bought (net_call_prem>0, call ask>bid) **and** puts net sold — ideally with call volume ≥ ~1× avg (放量). Clean, confirmed long. |
| 🔴 **背离 / 派发** | **price up but options bearish** — calls net SOLD (net_call_prem<0, call ask<bid) and/or 熊>牛. The "价涨期权背离" tell; the relative weak name. |
| 🟡 **价拉·期权没跟** | price up but options **light** (volume << avg) and net flow ~flat. Momentum not yet confirmed by smart money — needs follow-through. |
| ⚖️ **双押 / 事件** | **both** call and put premium strongly net-bought **and** earnings within ~1–2 weeks → earnings straddle positioning. **Don't read the big "inflow" as single-direction conviction.** |

Always flag **earnings proximity** (from #2): a name reporting in days explains two-sided premium; a name reporting weeks out gives a *cleaner* directional read.

### 5. Output

- **One table per basket**, columns: `Ticker | Chg% | Net options flow (bull−bear, $M) | Net call $M | Net put $M | Call vol / 30d | Bid-ask skew | Smart-money verdict`. Premiums in `$M`, one decimal.
- Then a **cross-section synthesis**: who's the clean long, who's diverging/distributing, who's price-only-unconfirmed, who's event-driven; and the **basket vs basket** comparison if more than one.
- A **retail (散户) news-sentiment** line: counts + tone, with the thin-coverage caveat.
- **On the UW path**, add two lines the Funda path cannot produce: the **intraday shape** (when in the session the premium arrived) and the **dark-pool** layer (off-exchange premium + largest prints vs NBBO), each with its caveat. Name the data path in one clause so the reader knows which 口径 they're reading.
- **Respond in the user's language** (see `SKILL.md` User Profile — the report is chat output; only git-tracked files stay English). The 散户 / 大单 / 机构 taxonomy keeps its Chinese names as domain terms — gloss them (retail / block / institutional) on first use when replying in English.

## Constraints

- **Read-only.** This is data presentation, never a trade recommendation, price target, or buy/sell call. Close with a one-line **非投资建议** note.
- **State the 口径 every time**: which data path (UW direct vs Funda proxy); options-flow proxy for 大单/机构 + news for 散户; no stock-side three-layer net flow (dark pool is unsigned block activity, not a substitute); flow-alerts truncation; earnings-driven two-sided flow ≠ single-direction.
- **A single big order ≠ smart money** — read the *aggregate* premium, not one print. See [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md).
- **Options flow is dealer-/positioning-driven, not "retail money"** — see [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md).
- **Don't fabricate** numbers or a retail/institutional split the feed doesn't provide. If an endpoint errors or a name has no listed options, say so for that name and continue.
- This is a **read**, not the full structure flow — if the user then wants to *act* (size, pick a structure, model P/L), route to [`analysis.md`](analysis.md) and run the three-axes / bull-conviction checks there.

## Related

- [`../unusual-whales.md`](../unusual-whales.md) — the tier-0 data path: availability gate, auth headers, endpoint whitelist, entitlement gaps, field traps.
- [`../pitfalls/32-multi-leg-share-before-block-direction.md`](../pitfalls/32-multi-leg-share-before-block-direction.md) — **read before ranking any block by premium**: spread legs print full premium with their own aggressor side, so an unfiltered tally manufactures a net direction that isn't there (a real case sign-flipped +$68.9M to $0.0M). Filter on `multi_leg_volume` and `stock_multi_leg_volume`.
- [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md) — one institutional order isn't edge.
- [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md) — options flow is dealer hedging, not retail direction.
- [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md) · [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) — pull flow + check the catalyst clock before any "fade / IV crush" call.
- [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md) — the interpretation layer: map the flow read + trend + volatility into a named state (吸筹 / 派发 / 承接 / 风险释放) when the user asks *what the flow means*, not just what it is.
- [`../gamma-framework.md`](../gamma-framework.md) — add GEX (`type=greek-exposure`) for dealer-positioning context when asked.
- [`analysis.md`](analysis.md) — when the read turns into an actual trade decision.
