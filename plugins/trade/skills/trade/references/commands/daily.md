---
type: Command Reference
title: "/trade daily <TICKER>"
description: The repeatable one-name daily read — tape, activity gate, block (大单) filtering, dark-pool baseline, IV term structure, dealer GEX + max pain, sector cross-check — ending in a named composite state and explicit falsification signposts. Read-only, not investment advice.
tags: [command, daily, block-flow, 大单, volume, max-pain, gex, iv-term-structure, dark-pool, opex, routine]
timestamp: 2026-08-21T17:30:00Z
---

# /trade daily &lt;TICKER&gt;

The **daily 看盘 read for one name**. Runs whenever the user invokes `/trade daily <TICKER>`, or asks any variant of *"what's `<TICKER>` doing today"* — 今天有没有大单 / 成交量怎么样 / IV 拉升了吗 / max pain 在哪 / 现在呢 / what's the state of `<X>` today.

It answers one question in a fixed order: **is anything real happening in this name today, and if so what kind of thing is it?** It is deliberately *not* a trade decision — it ends at a named state and a list of things that would change the read.

## How it differs from `report` and `analysis`

| | Scope | Ends at |
|---|---|---|
| [`report`](report.md) | **Many names**, one metric family (net options premium flow) | A comparison table + cross-section synthesis |
| **`daily`** | **One name**, every metric family | A **named composite state** + falsification signposts |
| [`analysis`](analysis.md) | One name, one decision | A structure, strikes, sizing, P/L matrix |

Route a multi-name money-flow sweep to `report`. Route "should I put this trade on" to `analysis`. `daily` is the thing you run every morning, and again when the user says *"现在呢"*.

## Arguments

- **One ticker** — `daily NBIS`. This is the normal case.
- **Two or three tickers** — run the full flow per name, then add a one-paragraph relative read. Beyond three names it is a `report`, not a `daily`.
- **No ticker** — ask which name, or offer the tickers named in the last few turns.
- **A re-run inside the same session** (*"现在呢"*, "refresh") — do **not** re-render the whole report. Produce a **delta table** against your own prior read (metric | prior value | now | Δ), then only expand the rows that actually moved. Always restate the timestamp of both reads.

---

## Step 0 — Preflight

1. **Clock.** Get the current ET time and the session phase: pre-market / RTH / after-hours / closed. Every number below is *incomplete* intraday, and the reply must say so. **Never** present an intraday aggregate as an end-of-day number.
2. **Is today an expiry?** Third Friday = monthly opex; also check weeklies. Opex changes the meaning of almost every metric in this file (see the opex box in Step 6).
3. **Corporate-action gate — MANDATORY, run this BEFORE reading any block.** See [`../pitfalls/35-mechanical-volume-not-opinion.md`](../pitfalls/35-mechanical-volume-not-opinion.md). Pull the issuer's recent filings from EDGAR:
   ```
   https://data.sec.gov/submissions/CIK##########.json      (company facts / recent filings)
   https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=<name>&output=atom   (find the CIK)
   ```
   with a real `User-Agent`. Read the **exhibit** (EX-99.1), not just the form cover. A convertible note, secondary, ATM program, exchange offer, index rebalance, lock-up expiry or M&A consideration **generates enormous volume that carries no opinion**. Attributing that volume to positioning is the single most expensive error this command exists to prevent.
4. **Knowledge dir.** Resolve it per [`analysis.md`](analysis.md) preflight step 1 and load any file matching the ticker — the user's own prior read on this name is context you must not re-derive or contradict silently.
5. **Data path.** Run the Unusual Whales availability gate in [`../unusual-whales.md`](../unusual-whales.md) §1. UW direct is the assumed path for this command; several steps below have **no** substitute without it, and the reply must name the path either way.

---

## Step 1 — Tape

`/api/stock/{t}/ohlc/5m?limit=300` (sort ascending by `start_time`; the API does not guarantee order) and `/api/stock/{t}/ohlc/1d?limit=400` (filter `market_time == "r"` for regular session).

Report: last, % vs prior close, session high/low, **and the intraday path** — where the high and low occurred, and whether the current price is near the high, the low, or back at the open. "+0.2% on the day" and "+4.8% at 09:45 then a full round trip back to flat" are different facts, and only the second one is a read.

Volume vs `avg30_volume` (from `/api/stock/{t}/info`), stated as a **multiple**, and scaled for time of day.

---

## Step 2 — Activity gate: is today even a real day?

`/api/stock/{t}/options-volume` gives the complete daily aggregate. Compute:

| Metric | Formula |
|---|---|
| Call activity | `call_volume / avg_30_day_call_volume` |
| Put activity | `put_volume / avg_30_day_put_volume` |
| Short-run comparison | same, vs `avg_7_day_*` and `avg_3_day_*` |

**This gate runs before anything else in the flow section, and its answer is often the whole answer.**

- **< 0.5×** on both legs → this is a **quiet, information-poor day**. Say so first and loudly. Nothing you find in a 0.4× tape is a signal, and hunting for one manufactures a story. A large fraction of "今天有没有大单" questions terminate correctly right here.
- **0.5–1.5×** → normal. Proceed, but require the block work to clear the filters below.
- **> 2×** → something is happening. Now the corporate-action gate from Step 0 earns its keep.

Compare against **both** the 30-day and 7-day averages: a name whose 7-day average is 1.5× its 30-day average is in an active regime, and 0.7× the 30-day may still be a sharp *deceleration*.

Then read direction off the same complete aggregate — never off the alert list:

- `bullish_premium − bearish_premium` — net smart-money $
- `net_call_premium` / `net_put_premium` — **sign matters**: negative = net **sold**
- `call_volume_ask_side` vs `call_volume_bid_side`, same for puts — must agree with the premium signs; that agreement *is* the adversarial check
- If calls **and** puts are both net sold, that is premium selling / vol supply, not a directional bet — say that instead of forcing a direction

---

## Step 3 — Blocks (大单): the filter ladder

Pull `/api/stock/{t}/flow-alerts?limit=200` **and** the raw tape `/api/option-trades?ticker_symbol={t}&min_premium=500000&limit=100`. Then run every candidate down this ladder. **A print that fails any rung cannot be read directionally** — report it as activity and move on.

### Rung 1 — multi-leg contamination ([pitfall 32](../pitfalls/32-multi-leg-share-before-block-direction.md), MANDATORY)

Keep a print as *outright* only when **both**:
- `multi_leg_volume / volume < 30%` (alert-level: `has_multileg == false` && `has_singleleg == true`)
- `stock_multi_leg_volume / volume < 30%`

> **The `stock_multi_leg` trap is the one that bites.** A 5,000-lot Jan-2028 $30 call on a $10 stock, `stock_multi_vol` 5,515 of 5,851 = **94% tied to stock** — that is a **buy-write**, bullish-to-neutral, and reading it as "someone bought calls" is a two-way error. Check this field on every print, not just the ones that look like spreads.

With UW, reassembly is exact rather than inferred: `/api/option-trades/multi-leg?ticker_symbol={t}` returns the package (`strategy`, `net_premium`, `net_side`, `leg_count`, `all_opening_legs`) and `/multi-leg/{id}/legs` its legs. **Price the package, not the leg.**

### Rung 2 — aggressor side must exist

`no_side` / `mid_side` / cross trades (`slcn` condition, matched crosses) have **no aggressor**. Direction is *unreadable*, full stop. A 5,000-lot $600K cross is a real trade and a non-signal at the same time; report the size, refuse the direction.

Also: **bid-side ≠ bearish.** Bid-side is seller-initiated. Passive institutional accumulation prints as selling.

### Rung 3 — is it an expiry roll or a cleanup?

Deep-ITM options near the front expiry with high `multi_vol`, paired with the same strike at a later expiry, are a **roll**, not a bet. Tells:
- strike far ITM relative to spot
- front expiry is today or this week
- a matching later-expiry print within minutes
- `put_calendar` / `call_calendar` in the multi-leg `strategy` field
- most of the "premium" is **intrinsic value** — compute the intrinsic share before quoting a headline dollar figure

A $49M "put buy" that is 89.6% intrinsic and loses OI at every strike is a pre-expiry cleanup. It should never have been counted as $49M of anything.

### Rung 4 — is it one decision or several?

Collapse prints that share **exchange + trade type + a few minutes** into a **single** decision before counting confirmations. Two floor trades on XPHO two minutes apart are one desk, one view — [pitfall 2](../pitfalls/02-single-flow-not-smart-money.md) applies to the collapsed count, not the raw count.

### Rung 5 — opening or closing?

`all_opening_legs` / `all_opening_trades` **is not authoritative** — a package tagged `all_opening_legs: true` has been observed losing OI at all seven of its strikes. Clearing is the authority:
- `open_interest == 0` on the contract → unambiguously **new**
- otherwise resolve with `/api/market/oi-change?date=<today>` or `/api/stock/{t}/option-contracts?date=<today>`
- **`date=` is required** — both endpoints default to the **prior** clearing day
- pre-clearing bound: `ΔOI ≥ volume − 2 × prior_OI`. When that floor is positive, the build is **forced open** and you can say so before the clearing data lands.

### Rung 6 — does it agree with the whole-day aggregate?

Always print both numbers:

```
outright-only net (direction)   vs   unfiltered net (activity only)
three blocks, all bullish       vs   whole-day net flow −$0.58M
```

When the surviving blocks point the other way from the aggregate, **say both and rank the aggregate higher.** "I found three bullish prints on a net-negative tape" is an honest sentence; "institutions are buying" is not.

### Rung 7 — persistence

A single outright print, however large, is still [pitfall 2](../pitfalls/02-single-flow-not-smart-money.md). Require **multi-day, direction-consistent** repetition before calling it a signal, and state which day of the streak you are on.

### For a surviving short-put block, also compute

Effective cost basis = `strike − premium`, and both as a % below spot. "Someone wrote insurance at −33%, cost basis −41%" is the readable content, and it is a **fundamental** statement about a price level, not a vol trade.

---

## Step 4 — Dark pool / off-exchange

`/api/darkpool/{t}?limit=500` (prints; caps at 500, so intraday it covers only a trailing window — **say what window you actually got**) and `/api/stock/{t}/stock-volume-price-levels` (full-session lit vs off aggregate; also accepts `date=`).

**Compute off-exchange share against the name's OWN trailing baseline**, not a generic number. Pull `date=` for the previous 4–5 sessions and build the comparison inline:

```
8/14 59.7%   8/18 54.2%   8/19 55.2%   8/20 72.8%   today 71.0%
```

That table is the finding. "69.5% off-exchange" alone means nothing — retail wholesaler internalisation alone runs ~40%+ on most names.

Then:
- **`trade_code`**. `qualified_contingent_trade` = the price is contingent on another leg (a convert hedge, an options delta leg, an EFP). QCT prints are exempt from trade-through and may legitimately print far from the NBBO. **A tape dominated by QCT is plumbing, not positioning.**
- **Repeated identical clip sizes** (47,500 twice, 23,700 three times) = a programmatic parent order, not discretionary accumulation.
- **Equal-size paired prints seconds apart, recurring across days** = a cross-account or hedged program executing over multiple sessions. Note the pattern; do **not** guess what it is hedging — go find the filing or say you don't know.
- **Direction is an inference**, always. Prints carry no aggressor side. Compare `price` vs the NBBO midpoint at execution and **label the lean as inference**. Never sum dark-pool premium into a net-flow number.

### The level test — "why are they all buying at $220?"

When blocks cluster at a price, **check whether that price was simply where the tape was.** For each large print, compare `price` against (a) the `nbbo_bid`/`nbbo_ask` carried on the print, and (b) the 5-minute candle at that timestamp.

- prints inside the then-current NBBO, tracking price through the day → **no level was chosen**; the cluster is an artifact of when you sampled
- prints at a **round number**, **away from** the then-current NBBO, concentrated in a short window → that *is* a negotiated level, and now it is worth explaining

Also check `trf_executed_at` vs `executed_at` before calling a print off-market — a late report is not an off-market trade.

---

## Step 5 — Volatility

Three separate questions; answer them separately.

**(a) Did IV actually move?** `/api/stock/{t}/volatility/term-structure` — tabulate IV by expiry with DTE, and diff it against your own prior read if there is one. A whole curve shifting down 2–6 vol points is the answer to "IV 拉升了吗", and a single ATM number hides it.

**(b) Is IV high or low for this name?** `/api/stock/{t}/iv-rank` (`iv_rank_1y`) and `/api/stock/{t}/interpolated-iv` for the **1-year percentile per tenor** (1d / 7d / 30d / 60d / 90d). Absolute IV is meaningless across names: 92% IV at `iv_rank_1y` 27 is *cheap for that name*. Front-end percentile in the bottom third while the back end holds is the classic "event premium is the only thing left standing" shape — name the expiry that is holding it up and the catalyst it covers.

**(c) Is IV cheap or rich vs realised?** `/api/stock/{t}/volatility/realized` — and **match the tenor**. Comparing 30-day IV to 20-day RV when the trade in question is 238 DTE is a category error; a name can be 75% IV vs 138% RV on a 20-day window and 78% vs 100% on a 90-day window, and those two comparisons support opposite conclusions.

This is the vega axis of [pitfall 19](../pitfalls/19-direction-vega-independent-axes.md). Do not let a vol reading imply a direction.

---

## Step 6 — Positioning: GEX, max pain, walls

- `/api/stock/{t}/spot-exposures/strike?limit=500` — **`limit=500` is required.** The default returns 50 rows sorted by strike ascending, which on most names is *entirely deep-OTM low strikes* and produces a total that is wrong by an order of magnitude and wrong in sign. Fields are `call_gamma_oi` / `put_gamma_oi` (OI-based) and `call_gamma_vol` / `put_gamma_vol` (session-volume based) — **say which one you used**; they disagree on heavy-flow days.
- Report: **total net GEX**, the **sum below spot vs above spot**, the **flip level**, and the 3–4 largest strikes on each side.
- `/api/stock/{t}/max-pain` — max pain for the next ~3 expiries, plus `next_upper_strike` / `next_lower_strike`.
- `/gex-levels` for call wall / put wall / gamma magnet where available.

Read it as **levels and probability, never direction** ([`../gamma-framework.md`](../gamma-framework.md)). The useful sentence is: *"below X dealers are short gamma and hedging sells into weakness; above Y they are long gamma and rallies get damped."*

> **Opex box.** On an expiry day: the expiring chain's OI goes to zero after the close, so pinning near max pain is **mechanical and carries no directional information**. Deep-ITM prints in that expiry are cleanup, not positioning. Option volume typically collapses relative to the 7-day average. Say "today is opex" once, early, and let it explain the flat candle instead of inventing a narrative for it.

---

## Step 7 — Intraday shape

`/api/stock/{t}/net-prem-ticks` — the 5-minute series (`net_call_premium`, `net_put_premium`, `net_delta`). Bucket to 30 minutes and show the **cumulative** path.

The daily aggregate flattens the one fact that matters most: **when** the premium arrived. A day that is bearish only because of one 30-minute window at 10:00, and flat for the six windows since, is *not* the same as one that builds steadily into the close. Read the derivative, per [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md).

`tape_time` is **UTC** (`13:30:00Z` = the 09:30 ET open). `market-tide` timestamps are ET-with-offset. Do not mix the two vintages in one sentence.

---

## Step 8 — Cross-section

A one-row peer table, same session, same units:

```
NOK −0.20% | CIEN +0.54% | LITE −1.74% | COHR −1.36% | AAOI −3.79% | ANET +2.79% | NVDA −0.75%
```

The question it answers: **is this move the name's, or the sector's?** Add `/api/market/market-tide` for the market-wide backdrop when the name is moving hard. A name that is flat while its sector is split is not showing relative strength — it is showing nothing.

---

## Step 9 — Name the composite state

Every `daily` ends with a **named state**, not a paragraph of hedged observations. Compose it from the axes above:

> **OpEx 钉盘 + 正 gamma + vol 被卖 + 场外接盘**
> **Settlement plumbing + short gamma below + no directional flow**
> **Quiet tape + one-day outright block + no persistence → non-event**

Then map it through [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md) if the user is asking what the flow *means* (吸筹 / 动量 / 派发 / 风险释放 / 承接·换手).

State the **information content of the day** explicitly. "Today was an information-poor day" is a complete and often correct conclusion, and it is more useful than a manufactured signal.

## Step 10 — Falsification signposts

Close with a short table of **what would change this read**, each with a threshold and a date where possible:

| Watch | Confirms current read | Overturns it |
|---|---|---|
| off-exchange % | falls back to ~55% after 8/24 | stays > 70% past settlement |
| net call premium | stays inside ±$5M | 3 consecutive days > +$5M with IV rising |
| borrow fee | stays ~0.8% | jumps > 3% (directional shorts arriving) |

This is the part that makes tomorrow's `daily` cheap to run: it tells the next session exactly which two or three numbers to pull first.

---

## Output shape

Match the language of the user's message. Keep it scannable:

1. **One-line answer to the literal question asked** (今天有没有大单 → yes/no, before any table)
2. Snapshot table (or **delta table** on a re-run)
3. Only the sections that have content — a step that found nothing gets one line, not a table of zeros
4. Composite state
5. Signposts
6. Data-path / 口径 line + **非投资建议**

## Hard rules

- **Read-only.** No entry, exit, target, or size. If the read turns into a trade, route to [`analysis.md`](analysis.md) and run the three-axes / bull-conviction / P&L-matrix checks there.
- **State the 口径 every time**: which data path (UW direct vs Funda proxy), that dark-pool direction is inference, that intraday aggregates are incomplete, and any truncation (`flow-alerts` at `limit`, `darkpool` at 500 prints).
- **Corporate actions before positioning** — [pitfall 35](../pitfalls/35-mechanical-volume-not-opinion.md).
- **Filter before ranking** — [pitfall 32](../pitfalls/32-multi-leg-share-before-block-direction.md).
- **One order is not a signal** — [pitfall 2](../pitfalls/02-single-flow-not-smart-money.md).
- **Options flow is dealer positioning, not retail money** — [pitfall 17](../pitfalls/17-dealer-flow-not-retail.md).
- **Contradict yourself out loud.** If today's read conflicts with something you concluded earlier in the session or in a knowledge-dir writedown, say so and reconcile it. A silent reversal is worse than the original error.
- **Don't fabricate.** An endpoint that errors, a name with no listed options, a dataset not on the plan — say it and continue.

## Field traps (verified live, 2026-08-21)

| Endpoint | Trap |
|---|---|
| `spot-exposures/strike` | Default returns **50 rows** — deep-OTM only. Pass `limit=500` or the total GEX is wrong in magnitude *and* sign. |
| `oi-change`, `option-contracts` | Default to the **prior** clearing day. Pass `date=`. `option-contracts` also mixes today's `volume` with yesterday's `open_interest`. |
| `option-trades/multi-leg` | Param is **`ticker_symbol`**, not `ticker` — a wrong name is silently ignored and returns every ticker. |
| `ohlc/5m` | Not guaranteed sorted; sort by `start_time` before slicing "the last N bars". |
| `darkpool/{t}` | Caps at 500 prints — intraday that is a trailing window of an hour or two, not the session. Use `stock-volume-price-levels` for full-session lit/off totals. |
| `flow-alerts` | Caps at `limit`. Hitting it means your counts and premium sums are **truncated** — take direction from `options-volume`. |
| all numeric fields | Arrive as **strings**. Cast before arithmetic *and* before sorting, or a block ranking sorts `"9"` above `"10"`. |
| `all_opening_legs` | Not authoritative. Clearing (ΔOI) is. |
| any script | Set a real `User-Agent`; the default `Python-urllib/*` gets a bare-text `403 / error code: 1010` that looks like an entitlement failure and is not. |

## Related

- [`../unusual-whales.md`](../unusual-whales.md) — the data path: gate, auth headers, endpoint map, entitlement gaps.
- [`report.md`](report.md) — the multi-name version of Step 2.
- [`analysis.md`](analysis.md) — where a `daily` goes when it becomes a decision.
- [`../gamma-framework.md`](../gamma-framework.md) · [`../parent-order-flow-framework.md`](../parent-order-flow-framework.md) · [`../price-action-framework.md`](../price-action-framework.md) — the interpretation layers.
- [`../pitfalls/35-mechanical-volume-not-opinion.md`](../pitfalls/35-mechanical-volume-not-opinion.md) · [`../pitfalls/32-multi-leg-share-before-block-direction.md`](../pitfalls/32-multi-leg-share-before-block-direction.md) · [`../pitfalls/02-single-flow-not-smart-money.md`](../pitfalls/02-single-flow-not-smart-money.md) · [`../pitfalls/17-dealer-flow-not-retail.md`](../pitfalls/17-dealer-flow-not-retail.md) · [`../pitfalls/19-direction-vega-independent-axes.md`](../pitfalls/19-direction-vega-independent-axes.md)
- [`../ticker/nbis-2026-08.md`](../ticker/nbis-2026-08.md) · [`../ticker/nok-2026-04.md`](../ticker/nok-2026-04.md) — the reads this workflow was distilled from.
