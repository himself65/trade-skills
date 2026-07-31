---
type: Changelog
title: Trade Knowledge Base — Change Log
description: Chronological history of the curated trade knowledge bundle — pitfalls, case studies, and frameworks added over time.
tags: [log, changelog, history]
timestamp: 2026-06-13T00:00:00Z
---

# Change Log

OKF reserved `log.md` — chronological history of this knowledge bundle, most recent first. Seeded from git history; append a dated entry whenever you add or materially revise a concept (see [`OKF.md`](OKF.md) conformance checklist).

## 2026-07-30 — Language rule v3: mirror the user's language in chat; git files stay English

- Supersedes the English-only rule set earlier the same day (entry below): in practice the user asked for Chinese replies three times in one session. New rule — **chat replies mirror whatever language the user is writing, message by message**; **anything committed to git stays English** (this repo's `references/` and the personal knowledge dir's writedowns / digests / YAML). Updated [`../SKILL.md`](../SKILL.md) User Profile + `description` (`replies in English` → `user-language replies, English files`), [`commands/import.md`](commands/import.md) step 4, [`commands/report.md`](commands/report.md) output rules, and the [`macro-framework.md`](macro-framework.md) §9 preamble.
- Trigger-position Chinese (the `SKILL.md` description, `commands/analysis.md` situation rows, §9 mode-trigger column) is unchanged — still input matchers.

## 2026-07-30 — Response language switched to English (standing preference)

- The user set a standing preference: **all output is English from now on**, even when the request is written in Chinese. Updated [`../SKILL.md`](../SKILL.md) User Profile (was "Writes in Chinese — respond in Chinese") and `description` (`replies in Chinese` → `English`), [`commands/import.md`](commands/import.md) step 4 (digests are written in English; pre-2026-07-30 writedowns stay Chinese — match their structure, don't rewrite them), [`commands/report.md`](commands/report.md) (respond in English; the output table's column headers are now English), and the [`macro-framework.md`](macro-framework.md) §9 preamble.
- **Chinese is deliberately retained in trigger positions only** — the `SKILL.md` description, the `commands/analysis.md` situation rows, and the §9 mode-trigger column. Those are **input matchers**, not output language: removing them would silently break routing for Chinese-phrased requests. This extends the convention recorded in the 2026-07-30 macro entry below rather than replacing it.
- Untranslated on purpose when citing: document titles, author handles, and domain terms with no clean English equivalent (母单, 格局, 散户 / 大单 / 机构) — gloss on first use.

## 2026-07-30 — Risk-management pitfalls 30–31 (sizing causality + session/drawdown governors)

- Added [`pitfalls/30-stop-distance-determines-size.md`](pitfalls/30-stop-distance-determines-size.md) — the only correct causal order is **invalidation level → stop distance → size = risk$ ÷ (stop × point value)**. Fixing size first and back-solving the stop puts it at a volatility-arbitrary distance, usually inside the noise band; carries the **ATR-band table** (`< 0.2 ATR` = reject), a worked MNQ example (a $33k account at 2% risk trading "5 MNQ" implies a **66-point = 0.12 ATR** stop against NDX ATR(14) ≈ 560 pts, where correct size at a 0.5-ATR structural stop is **1 contract** — a 5× oversize, and 8.2× account leverage where one average day's range = 17% of equity), the **anti-martingale arithmetic** (under a fixed dollar cap, adding 2 contracts to a loser cuts remaining room from 130 points to 43), and the reminder that a % stop is a target rather than a floor once slippage is priced.
- Added [`pitfalls/31-daily-loss-limit-drawdown-governor.md`](pitfalls/31-daily-loss-limit-drawdown-governor.md) — a per-trade cap bounds one trade, not one day: eight flawlessly-executed 2% stops is −15% with a perfect discipline record, and intraday trades on one instrument are **one bet re-expressed**, so losses cluster by construction. Three mandatory governors (day stop ≈ 2–3× per-trade risk → a **bullet count** known before the open; 3 consecutive stops → flat; de-gear ×0.75 / ×0.5 / paper at −5 / −10 / −15% from the equity high), portfolio heat across correlated tickets, the recovery-asymmetry table (−30% needs +43%), the minimum trade-log field list (**MAE is the load-bearing field** — it is what reveals stops that are too tight, feeding pitfall 30), and withdrawal discipline as a governor that must be paired with de-gearing on the way down.
- Wired into [`commands/analysis.md`](commands/analysis.md) (three new situation rows: position sizing / stop placement / leverage; futures-intraday or 摊平·扛单 questions; **reviewing or critiquing a third-party trading system or educational material** — check sizing causality and session governors first, verify every checkable number against live data, and route the digest to the user's personal knowledge dir), [`pitfalls/index.md`](pitfalls/index.md) (+2 rows, +5 lookup rows), [`index.md`](index.md), [`pitfalls/README.md`](pitfalls/README.md), [`../SKILL.md`](../SKILL.md), [`../README.md`](../README.md), and the repo `CLAUDE.md` (count 29 → 31).
- Source: reviewing a third-party 期货交易入门指南 (Antelope Research, 2026-07-20) the user shared — the two rules generalize the guide's two structural defects, so they belong in the curated library while the review itself stays in the user's personal knowledge dir per the destination rule. Live NDX/TQQQ figures used in the worked example were pulled from Funda (`stock-price?ticker=^NDX`, 2026-07-29 close 27,192.31).

## 2026-07-30 — Macro analysis framework + pitfalls 28–29

- Added [`macro-framework.md`](macro-framework.md) — a Druckenmiller-style macro-PM pipeline adapted to this options book: the **seven-question gate** (what changed at the margin / accelerating or decelerating / what the market implies / where the gap is / what catalyst forces repricing / which expression is cleanest / what proves me wrong), then the seven stages — ① identify the marginal driver (dynamic driver hierarchy; open with one variable plus a three-link transmission chain, never with YoY GDP) ② micro-to-macro (10 leading-evidence families with typical lead times, plus the industry-scale test) ③ **pricing before forecasting**, with an implied-pricing → **data-source map** for this stack (FRED series `T10YIE` / `DFII10` / `DGS2` / `DGS10` / `BAMLH0A0HYM2` / `WALCL` / `RRPONTSYD` / `WTREGEN` via funda-data; futures-strip proxy via TV MCP; per-strike IV via the TV reader) ④ the change in the change (7 dimensions) ⑤ price reaction as evidence (decaying response to repeated catalysts; the regime-change tell) ⑥ cross-asset confirmation versus coincidence ⑦ expression and sizing (10-dimension scoring, a contamination table mapping macro views to cleaner expressions, lifecycle-based sizing). Plus the **8 dashboard families** mapped to this stack's tools, the **8 output modes** (morning note / EOD review / weekly / pre-trade consult / monthly regime review / 13F / divergence watch / thematic deep dive) with fixed output orders, the 6 deliberate-practice reps and the L1–L6 ladder, and an explicit **limits** section (no OIS feed → futures-strip proxy only; macro-to-single-name beta is unstable; lead times are empirical, not laws; a macro thesis is not a position).
- Added [`pitfalls/28-macro-right-trade-wrong.md`](pitfalls/28-macro-right-trade-wrong.md) — being right on the economy is not being right on the trade: four **independent** kill switches (already priced / no dated catalyst → carry bleed / contaminated expression / vol-inappropriate size), each a no-trade on its own, with the catalyst-versus-decay-clock rule and the "no written invalidation level → cannot size up" rule.
- Added [`pitfalls/29-second-derivative-not-level.md`](pitfalls/29-second-derivative-not-level.md) — read the second derivative: level / direction / **acceleration** / surprise / breadth / persistence / priced as seven separable dimensions; "weak but improving" beats "strong but decelerating"; a single-line surprise is not a policy signal; a factor can flip sign over the horizon (AI capex: core PCE up near term, down later); applies to earnings-revision breadth and flow derivatives too.
- Wired into [`commands/analysis.md`](commands/analysis.md) (three new situation rows: macro / regime read, macro output mode requested, digesting a shared macro report), [`commands/import.md`](commands/import.md) (research digests of macro reports now carry a **seven-stage ✓/△/✗ scorecard** — the skipped stage is where the user's edge goes), [`index.md`](index.md), [`pitfalls/index.md`](pitfalls/index.md) (+4 lookup rows), [`OKF.md`](OKF.md) framework locations, and [`../SKILL.md`](../SKILL.md) (frameworks table, trigger description, and two new Core Principles: pricing before forecasting, margin over level).
- Curated content is written in English, matching the rest of this library; Chinese is retained only in trigger positions (the `SKILL.md` description, the `commands/analysis.md` situation rows, and the §9 mode-trigger column) so Chinese-language requests still route correctly.
- Source: the user's own macro-analysis methodology manual (methodology only — its citations to third-party research reports stay in their personal knowledge dir per the destination rule).

## 2026-07-23 — Data Access rewired to three tiers (tradingview-mcp integration)

- Data priority is now: (1) **`finance-data-providers:tradingview-mcp`** — the [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) server, newly bundled in the finance-skills `data-providers` plugin (`.mcp.json`, `uvx`, pinned to a git SHA, 37 tools verified live) — for quotes, TA readouts, multi-timeframe alignment, screeners, futures/夜盘 (`futures_category_snapshot("equity_index")` → NQ/ES/YM/RTY in one call), extended hours, and unusual options activity; (2) the TradingView **desktop reader** only when greeks / per-strike IV skew / watchlists / alerts are needed (its CDP relaunch closes the user's charts, so avoid it for plain quotes); (3) **Funda** for fundamentals and premium-flow/GEX. The MCP's options-chain IV is Yahoo-sourced and carries **no greeks** — not valid for IV-rank or skew decisions.
- Updated: [`../SKILL.md`](../SKILL.md) Data Access, repo `CLAUDE.md`, skill `README.md`, [`commands/analysis.md`](commands/analysis.md) preflight step 4, and the [`overnight-futures-framework.md`](overnight-futures-framework.md) data-source caveats table.

## 2026-07-23 — Parent-order flow classification framework

- Added [`parent-order-flow-framework.md`](parent-order-flow-framework.md) — the user's 5-cell 母单净流向 × volatility × trend matrix, validated and extended to 8 informative states: 稳健吸筹 / 强动量 (with a retail-saturation expiry check) / 冲高派发 / 风险释放**中 vs 完毕** (split by the flow *derivative* — decaying/flipping outflow, not the level) / 承接 vs 高位换手 (with 3 discriminators: location, counterparty, vol path) / **隐性派发** (low-vol + outflow — the earliest top warning) / 接刀 vs 真吸筹 / 无承接阴跌. Includes the measurement-caveat block: parent-order reconstruction is inference (multi-day persistence required, pitfall 02), aggressor-signed flow understates passive accumulation, flow is coincident not leading (entry still via pitfall 27), and 口径 differs by market (this stack's daily read = Funda options premium-flow via `commands/report.md`, dealer-driven per pitfall 17).
- Wired into [`commands/analysis.md`](commands/analysis.md) (new 母单/大单 net-flow state-read situation row), [`index.md`](index.md), [`../SKILL.md`](../SKILL.md) frameworks table + trigger description (母单吸筹·派发), and cross-referenced from [`price-action-framework.md`](price-action-framework.md) and [`commands/report.md`](commands/report.md) (the framework is the interpretation layer on the `report` data pull).

## 2026-07-22 — Overnight index-futures framework + NQ case study

- Added [`overnight-futures-framework.md`](overnight-futures-framework.md) — the 夜盘 attribution method: Globex session clock (foreign catalysts converted to ET), tape-vs-prior-settle read, the **three-complex divergence read** (equity futures vs safe-haven/inflation complex vs live Asia cash — the divergence pattern *is* the attribution), catalyst clock (incl. Fed-blackout awareness), attribution discipline (every driver needs a number + a headline; yields coincident per pitfall 22), and scenario output keyed to levels. Includes verified data-source caveats for the Funda/FMP + TradingView stack (quote freshness vs 5-min candle lag, calendar `limit` ≤ 1000, ADR-dupe filtering, KOSPI intraday empty).
- Added [`ticker/nq-2026-07.md`](ticker/nq-2026-07.md) — worked example, run live 2026-07-21/22 (Asia chip euphoria vs 11th-night-of-Iran-strikes oil bid; KOSPI floor decaying +5.9% → +4.3%; SK Hynix print pending inside the US night). Base scenario (29,150–29,350 range) played out.
- Wired into [`commands/analysis.md`](commands/analysis.md) (new index-futures/夜盘 situation row), [`index.md`](index.md), [`ticker/index.md`](ticker/index.md), and the [`../SKILL.md`](../SKILL.md) frameworks table + trigger description. The same method is productized as the funda-app `overnight-futures` play (funda-app PR #4007).

## 2026-06-24 — MU case study (post-print direction read)

- Added [`ticker/mu-2026-06.md`](ticker/mu-2026-06.md) — FY26Q3 blowout beat (rev +16%, EPS +21%, topping even Funda's aggressive preview). Analyst-side error: called "sell-the-news" off an early AH snapshot (+3.6% @ 16:05) plus full-day flow (−$3.4M); corrected when AH accelerated to +9% and **post-event** flow was +$72.5M bullish. Lesson: post-print, sample the AH price **trend** (not a snapshot) and use **post-event** flow (not full-day); reaction-magnitude ≠ direction. Sister case to NOK 2026-04 (pattern published ahead of the current data).
- Cross-linked into [`commands/analysis.md`](commands/analysis.md) post-earnings rows.

## 2026-06-22 — `/trade report` subcommand (daily capital-flow read)

- Added [`commands/report.md`](commands/report.md) — a standalone `/trade report [tickers | basket]` flow that builds a daily **资金流向 (散户 / 大单 / 机构)** read from **Funda options premium-flow** (`options-volume` bullish/bearish premium, net call/put premium, ask-vs-bid volume, `flow-alerts`) + `news/sentiment`, because no stock-side three-layer net-flow feed is available here (the moomoo / Futu three-layer flow needs a logged-in FutuOpenD gateway + `futu-api`). Encodes the 口径 caveats, the 聪明钱 classification (🟢 confirmed long / 🔴 价涨期权背离-distribution / 🟡 price-only-unconfirmed / ⚖️ earnings two-sided), the `flow-alerts` 200-row truncation trap, and the quote-endpoint trap (use `stock-price?ticker=` for day change; `quotes?type=realtime/price-change` 400s).
- Wired into [`../SKILL.md`](../SKILL.md): new Commands-table row, `report` added to routing rule 2, a capital-flow routing exception (资金流向 / 流入流出 → `report`, not `analysis`), and a refreshed frontmatter description/triggers (kept under the 1024-char `skill-lint` cap). Indexed in [`index.md`](index.md). Cross-linked to pitfalls 02 (single flow ≠ smart money) and 17 (dealer flow ≠ retail).

## 2026-06-18 — Pitfall 27 + 6981 case study (retest entry-timing)

- Added [`pitfalls/27-retest-entry-confirmation.md`](pitfalls/27-retest-entry-confirmation.md) — a pullback entry is the **volume-confirmed hold, not the touch**; a pullback is a Schelling-point retest (key MA / prior high / gap), not an indicator; on extended/parabolic names the nearest real support can be −15 to −25%, so quantify extension first; a blow-off long-upper-wick at a new high is exhaustion, not an entry. The execution layer of the price-action framework (P4 / P5 / P6 / P8).
- Added [`ticker/6981-2026-06.md`](ticker/6981-2026-06.md) — Murata's 2026-06-18 new-ATH blow-off (+187% over its 200-day; ~1-ATR upper wick on 174% volume); worked example of the 3-zone retest ladder, with the honest data caveat that OSE flow / IV were not pullable via TradingView / Funda.
- Cross-linked pitfall 27 into [`commands/analysis.md`](commands/analysis.md) (a new entry-timing / pullback / chasing-extension row) and [`price-action-framework.md`](price-action-framework.md) (cross-references).
## 2026-06-15 — Pitfall 26 + SATS case study

- Added [`pitfalls/26-stock-consideration-share-vs-dollar-anchored.md`](pitfalls/26-stock-consideration-share-vs-dollar-anchored.md) — for stock-based deal consideration, verify **share-anchored vs dollar-anchored** (and normalize the **split basis**) from the primary agreement before pricing flow-through; a fixed reference price means a fixed share count that marks to market.
- Added [`ticker/sats-2026-06.md`](ticker/sats-2026-06.md) — EchoStar (SATS) SpaceX/AT&T spectrum-sale SOTP; an analyst-side error (share-anchored consideration mis-read as dollar-fixed → ~5x NAV error) caught by the tape and corrected from primary filings.
- Cross-linked pitfall 26 into [`commands/analysis.md`](commands/analysis.md) via a new M&A / SOTP / stock-consideration situation row.

## 2026-06-13 — OKF v0.1 alignment

- Adopted [Open Knowledge Format v0.1](OKF.md): added OKF-standard frontmatter (`type`, `title`, `description`, `tags`, `timestamp`) to every pitfall, case study, and framework, preserving existing domain extension fields.
- Added the reserved [`index.md`](index.md) bundle root, per-directory `index.md` indexes (with one-line `README.md` stubs), [`log.md`](log.md), and the [`OKF.md`](OKF.md) conformance & mapping document.
- The user-private knowledge directory (scaffolded by `/trade setup`) is now described as a second OKF bundle.

## 2026-06-05 — Pitfall 25 + VIX case study

- Added [`pitfalls/25-vix-options-futures-mechanics.md`](pitfalls/25-vix-options-futures-mechanics.md) — VIX options price off VIX futures, not spot (contango bleed, sub-1 futures beta, debit-spread skew bite).
- Added [`ticker/vix-2026-06.md`](ticker/vix-2026-06.md) — VIX call spreads track the future, not spot.
- Extended [`strategies.md`](strategies.md) with the VIX section.

## 2026-05-29 — MDB case study

- Added [`ticker/mdb-2026-05.md`](ticker/mdb-2026-05.md) — the SNOW asymmetry lesson applied correctly the next day; the bull-conviction count needs a quality/inversion overlay, not just a tally.

## 2026-05-27 — Pitfall 24 + SNOW case study (asymmetry axis)

- Added [`pitfalls/24-capped-upside-vs-bull-conviction.md`](pitfalls/24-capped-upside-vs-bull-conviction.md) — capped-upside structures are forbidden in high-conviction bull setups; asymmetry is a third axis beyond direction and vega.
- Added [`ticker/snow-2026-05.md`](ticker/snow-2026-05.md) — canonical Jade-Lizard-in-a-bull-tail failure.

## 2026-05-25 — Pitfall 23 + CBRS update

- Added [`pitfalls/23-hazard-rate-discounting.md`](pitfalls/23-hazard-rate-discounting.md) — discounting is a hazard rate, not just time-value.
- Updated [`ticker/cbrs-2026-05.md`](ticker/cbrs-2026-05.md) — Day-1 long stock cut for a loss.

## 2026-05-19 — Pitfall 22

- Added [`pitfalls/22-yields-not-causal.md`](pitfalls/22-yields-not-causal.md) — bond yields don't "cause" equity moves.

## 2026-05-15 — CBRS IPO case study

- Added [`ticker/cbrs-2026-05.md`](ticker/cbrs-2026-05.md) — hot AI IPO modeling and the lock-up front-run framework.

## 2026-05-13 — Price-action framework + TSEM case study

- Added [`price-action-framework.md`](price-action-framework.md) — orderbook microstructure mental model.
- Added [`ticker/tsem-2026-05.md`](ticker/tsem-2026-05.md) — structure-selection lessons (right direction, wrong structure).

## 2026-05-11 — Pitfalls 20-21 + NOK case study

- Added [`pitfalls/20-post-earnings-momentum-vs-fade.md`](pitfalls/20-post-earnings-momentum-vs-fade.md) and [`pitfalls/21-event-iv-vs-demand-iv.md`](pitfalls/21-event-iv-vs-demand-iv.md).
- Added [`ticker/nok-2026-04.md`](ticker/nok-2026-04.md) — post-earnings momentum continuation + demand-driven IV.

## 2026-05-10 — Pitfall 19

- Added [`pitfalls/19-direction-vega-independent-axes.md`](pitfalls/19-direction-vega-independent-axes.md) — direction and vega are independent axes; match both to regime.

## 2026-05-08 — Foundation

- Initial curated library: pitfalls 01-18, [`strategies.md`](strategies.md) (incl. LEAPS stock replacement), [`gamma-framework.md`](gamma-framework.md), and the first case studies ([`ticker/intc-2026-04.md`](ticker/intc-2026-04.md), [`ticker/mag7-2026-q1.md`](ticker/mag7-2026-q1.md), [`ticker/app-2026-05.md`](ticker/app-2026-05.md)).
- Converted the repo into the `/trade` skill with the tree-structured reference layout.
