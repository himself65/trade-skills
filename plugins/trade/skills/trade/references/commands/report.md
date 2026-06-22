---
type: Command Reference
title: "/trade report [tickers | basket]"
description: Today's capital-flow / 资金流向 read for one or more names — retail / 大单 / institutional proxied from Funda options premium-flow, mapped to a comparison table + cross-section synthesis. Read-only, not investment advice.
tags: [command, report, capital-flow, money-flow, options-flow, funds-flow]
timestamp: 2026-06-22T20:00:00Z
---

# /trade report &lt;tickers | basket&gt;

A daily **capital-flow / 资金流向** read across one or more names: who is buying vs selling today, split as a **散户 / 大单 / 机构** proxy, plus the price/volume context — rendered as a comparison table with a cross-section synthesis.

Runs whenever the user invokes `/trade report ...`, or asks for 资金流向 / 流入流出 / 净流入·净流出 / 散户·大单·机构 / capital flow / money flow / "who's buying" across a name or a basket.

> **Read the 口径 (data-source reality) FIRST — and state it in every reply.** There is **no** stock-side "retail / large-order / institutional daily net inflow" feed available here. The moomoo / Futu three-layer stock flow needs a logged-in **FutuOpenD gateway + the `futu-api` SDK** (`get_financial_unusual`) — env-gated and usually not running. So this command builds the read from **Funda options premium-flow** as the proxy:
>
> - **大单 / 机构 (smart money)** ← options `bullish/bearish premium`, net call/put premium, ask-vs-bid volume, and big-ticket flow alerts. Real institutional/large positioning shows up in options $ first.
> - **散户 (retail)** ← `news/sentiment` tone (a *weak* proxy, not $ flow; coverage is thin on small / niche names).
> - **机构 stock-side daily net flow** ← **not available** (Funda only has quarterly 13F `ownership`). Say so; don't fabricate it.
>
> If the user wants the *true* moomoo three-layer stock flow, point them to the Futu path: `pip install futu-api` + start FutuOpenD on `127.0.0.1:11111` (you can install the SDK but cannot log in their gateway). See `futu-capital-anomaly` skill.

## Arguments

- **Explicit tickers** (space- or comma-separated): `report COHR LITE MU` → run those.
- **A sector / theme word** (e.g. "光" / optical, "存储" / memory, "光模块+存储"): **confirm the ticker universe first** (propose constituents + a market, ask via `AskUserQuestion`) — don't silently guess a basket. Once confirmed, group the output by basket.
- **Optional date**: default **today**. The endpoints return the latest session; if the user names a date, pass it through where the endpoint supports `date=`.
- Mixed baskets → render one table per basket so the cross-section reads cleanly.

## Workflow

### 1. Resolve the data path

- Resolve the Funda key per the `finance-data-providers:funda-data` skill (env `FUNDA_API_KEY`, else `.env` at the repo root; **this user's `.env` names it `FUNDA_AI_API_KEY`** — see `SKILL.md` → Data Access). When inside a worktree, the key lives in the **main repo** `.env`.
- All calls are `GET https://api.funda.ai/v1/...` with `Authorization: Bearer $KEY`. For more than ~3 tickers, batch them in one small script (loop + aggregate) rather than dozens of separate calls.

### 2. Pull, per ticker

| # | Endpoint | Gives | Use for |
|---|---|---|---|
| 1 | `options/stock?ticker=<T>&type=options-volume` | today's row: `bullish_premium`/`bearish_premium`, `net_call_premium`/`net_put_premium`, `call/put_volume`, `*_volume_ask_side`/`*_bid_side`, `avg_7/30_day_*_volume`, OI | **核心** — complete daily aggregate; the 大单/机构 direction |
| 2 | `options/flow-alerts?ticker=<T>&min_premium=50000&limit=200` | big tickets: `type` (call/put), `total_premium`, `total_ask_side_prem`, `has_sweep`, `next_earnings_date` | 大单 detail + earnings date |
| 3 | `stock-price?ticker=<T>&limit=2` | last 2 EOD rows (param is **`ticker`**, not `symbol`) | day % change = `historical[0].close` vs `[1].close` |
| 4 | `news/sentiment?ticker=<T>` | `ticker_sentiment` positive/negative/neutral counts + latest direction | 散户 tone proxy |

**Quote-endpoint trap:** `/v1/quotes?type=` rejects `realtime-quotes` / `price-change` / `exchange-quotes` (FMP 400). Use `stock-price` for day change. Mind market-holiday gaps when computing "vs prior close" (e.g. Juneteenth → prior trading day is not yesterday).

**flow-alerts truncation — do not ignore:** the call caps at `limit` (200). When a name returns exactly the limit, there are *more* big tickets than you fetched, so your call/put **counts and summed premium are truncated** — use them only as an *activity* signal and take **direction from `options-volume`** (the complete aggregate). If you bound coverage this way, say so.

### 3. Derive the per-ticker metrics

- **涨跌%** — from #3.
- **净期权流向 (牛−熊)** = `bullish_premium − bearish_premium` ($). Positive = net bullish smart-money $.
- **净 Call 权利金 / 净 Put 权利金** = `net_call_premium` / `net_put_premium`. **Sign matters**: positive = net *bought* (ask-side); **negative call premium = calls net SOLD** (bearish/distribution).
- **放量倍数** = `call_volume / avg_30_day_call_volume` (and puts). <1 = below average / quiet.
- **盘口** — `call_ask_side` vs `call_bid_side` (ask>bid = aggressive call buying); same for puts (put ask>bid = put buying). Cross-check it agrees with the premium signs — that agreement IS your adversarial check.
- **财报日** — `next_earnings_date` from #2.

### 4. Classify each name (聪明钱判定)

| Label | Trigger |
|---|---|
| 🟢 **多头确认** | price up **and** net flow bullish (牛>熊) **and** calls net bought (net_call_prem>0, call ask>bid) **and** puts net sold — ideally with call volume ≥ ~1× avg (放量). Clean, confirmed long. |
| 🔴 **背离 / 派发** | **price up but options bearish** — calls net SOLD (net_call_prem<0, call ask<bid) and/or 熊>牛. The "价涨期权背离" tell; the relative weak name. |
| 🟡 **价拉·期权没跟** | price up but options **light** (volume << avg) and net flow ~flat. Momentum not yet confirmed by smart money — needs follow-through. |
| ⚖️ **双押 / 事件** | **both** call and put premium strongly net-bought **and** earnings within ~1–2 weeks → earnings straddle positioning. **Don't read the big "inflow" as single-direction conviction.** |

Always flag **earnings proximity** (from #2): a name reporting in days explains two-sided premium; a name reporting weeks out gives a *cleaner* directional read.

### 5. Output

- **One table per basket**, columns: `票 | 涨跌% | 净期权流向 (牛−熊, $M) | 净Call $M | 净Put $M | Call量/30日 | 盘口 | 聪明钱判定`. Premiums in `$M`, one decimal.
- Then a **cross-section synthesis**: who's the clean long, who's diverging/distributing, who's price-only-unconfirmed, who's event-driven; and the **basket vs basket** comparison if more than one.
- A **散户 (news 情绪)** line: counts + tone, with the thin-coverage caveat.
- Respond in the user's language (**Chinese** by default — see User Profile).

## Constraints

- **Read-only.** This is data presentation, never a trade recommendation, price target, or buy/sell call. Close with a one-line **非投资建议** note.
- **State the 口径 every time**: options-flow proxy for 大单/机构 + news for 散户; no stock-side three-layer net flow; flow-alerts truncation; earnings-driven two-sided flow ≠ single-direction.
- **A single big order ≠ smart money** — read the *aggregate* premium, not one print. See [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md).
- **Options flow is dealer-/positioning-driven, not "retail money"** — see [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md).
- **Don't fabricate** numbers or a retail/institutional split the feed doesn't provide. If an endpoint errors or a name has no listed options, say so for that name and continue.
- This is a **read**, not the full structure flow — if the user then wants to *act* (size, pick a structure, model P/L), route to [`analysis.md`](analysis.md) and run the three-axes / bull-conviction checks there.

## Related

- [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md) — one institutional order isn't edge.
- [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md) — options flow is dealer hedging, not retail direction.
- [`../pitfalls/20-post-earnings-momentum-vs-fade.md`](../pitfalls/20-post-earnings-momentum-vs-fade.md) · [`../pitfalls/21-event-iv-vs-demand-iv.md`](../pitfalls/21-event-iv-vs-demand-iv.md) — pull flow + check the catalyst clock before any "fade / IV crush" call.
- [`../gamma-framework.md`](../gamma-framework.md) — add GEX (`type=greek-exposure`) for dealer-positioning context when asked.
- [`analysis.md`](analysis.md) — when the read turns into an actual trade decision.
