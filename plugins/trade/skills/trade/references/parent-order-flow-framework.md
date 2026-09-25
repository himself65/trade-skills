---
type: Framework
title: Parent-Order Flow Classification (母单净流向 × Volatility × Trend)
description: Eight-cell state matrix reading trend × volatility × parent-order (母单) net flow into accumulation / momentum / distribution / capitulation states, with measurement caveats — a "who is buying, who is selling" state read, not an entry signal.
tags: [parent-order, 母单, capital-flow, accumulation, distribution, tape-reading, state-matrix]
timestamp: 2026-07-23T00:00:00Z
---

# Parent-Order Flow Classification (母单净流向 × Volatility × Trend)

A state matrix that crosses three axes — **trend** (up / down / range), **volatility** (low / high), and **parent-order net flow** (母单净流入 / 净流出) — into named market states: accumulation, momentum, distribution, capitulation, absorption. It answers *"what state is this tape in, and who is on each side"* — the classification layer on top of the price-action framework's Primitive 5 (a pullback is holder **rotation**; the question is who sells and who bids) and Primitive 8 (float composition determines stress behavior).

**母单 (parent order)**: institutions execute via algos (TWAP / VWAP / iceberg) that slice one parent order into many child orders. "Parent-order flow" is any feed or reconstruction that tries to re-aggregate child prints back into institutional parents and sign them. It is an **inference, not a fact** — see Measurement caveats before trusting any single reading.

**Critical rule**: This is a *state* read, not an *entry* signal. It tells you what regime you're in; the entry itself still goes through confirmation (pitfall 27 — buy the volume-confirmed hold, not the touch) and structure selection still goes through the three axes (`strategies.md`).

---

## The matrix

Trend × flow first; volatility splits the cells that need it. Eight informative states:

| # | Trend | Vol | 母单净流向 | State | Read |
|---|---|---|---|---|---|
| 1 | Up | Low | 净流入 | **稳健吸筹** (steady accumulation) | Low-volume grind + institutional net buy = orderly absorption of float, nobody wants to sell. The most bullish cell (price-action P3: low-volume drift up > high-volume breakout). |
| 2 | Up | High | 净流入 | **强动量** (strong momentum) | Repricing regime, parents still chasing. **Expiry check required**: high vol = divergence, not a bull signal per se. Early in trend = momentum; after retail saturation (social-media / KOL cascade) = blow-off fuel running out. Overlay P8 saturation read. |
| 3 | Up | High | 净流出 | **冲高派发** (distribution into strength) | Retail aggressor buys push price up while parents unload into them. The FOMO-top cell (P5: institutions distributing + retail bidding = dangerous). |
| 4a | Down | High | 净流出 (still accelerating) | **风险释放中** (risk-off in progress) | Consensus shifting lower, parents still exiting. Trend **confirmation**, NOT a bottom signal — do not bottom-fish below broken support (P6). |
| 4b | Down | High | 净流出 (decaying → flipping) | **风险释放完毕** (capitulation complete) | Outflow slope flattens → volume at lows without new price lows → flow flips positive. Only THIS sequence licenses a left-side look. Distinguish 4a vs 4b by the flow *derivative*, not the level. |
| 5 | Range | High | 净流入 | **承接 or 高位换手** (absorption vs high-level churn) | Genuinely ambiguous — keep both hypotheses and discriminate (see below). |
| 6 | Up / Range | Low | 净流出 | **隐性派发** (stealth distribution) | Price holds while parents quietly leave. The sneakiest cell and often the **earliest** top warning — nothing looks wrong on the chart. |
| 7 | Down | High | 净流入 | **接刀 vs 真吸筹** (knife-catch vs genuine accumulation) | Parents buying against the trend. Multi-day persistent inflow + shrinking down-candles = genuine absorption; a single-day print = possibly hedging / passive fills, not signal (pitfall 2). |
| 8 | Down | Low | 净流出 | **无承接阴跌** (bidless grind-down) | No panic, but no absorption either. Usually lasts longer and is harder to trade than a high-vol flush — stand aside until a state transition. |

### Cell 5 discriminators (承接 vs 换手)

| Discriminator | → 承接 (absorption) | → 换手 (churn / pre-distribution) |
|---|---|---|
| **Location** | Range formed after a decline / at a prior consensus level | Range formed after a big run-up, at/near highs |
| **Counterparty** | Retail panicking / capitulating while parents bid | Retail euphoric while parents "inflow" (may be trend-following algos, not smart money) |
| **Vol path inside the range** | Volatility compressing over time + inflow persistent | Volatility NOT compressing + inflow decaying |

Resolution: absorption resolves via low-volume upside drift out of the range (vacuum above intact); churn resolves via a failed push + cell 3/6 signature appearing.

---

## Measurement caveats (where this framework actually breaks)

1. **Parent-order reconstruction is noisy.** Any 母单 feed is an algorithmic re-aggregation of child prints. Large ≠ institutional ≠ smart (pitfall 2). Only **multi-day, direction-consistent** net flow carries signal; treat any single-day reading as noise.
2. **Passive accumulation is invisible to aggressor-signed flow.** Net inflow/outflow is usually signed by the aggressor side. Real accumulation is often institutions **posting passive bids and letting sellers hit them** — which prints as "sell aggressor" and *understates* cell 1. So allow "flow ~flat but price grinding up on low volume" to count as 稳健吸筹.
3. **Flow is coincident, not leading.** The matrix names the current state; it does not time the transition. State → action needs the entry-confirmation layer (pitfall 27) on top.
4. **口径 differs by market.** CN/HK L2 母单 reconstructions, US options premium-flow proxies (`commands/report.md`), and broker three-layer splits are different instruments with different blind spots — state which one you're reading. In this stack, the daily US read comes from options premium-flow — Unusual Whales direct when subscribed, the Funda proxy otherwise (see the `commands/report.md` 口径 block) — which is itself dealer-/positioning-driven (pitfall 17).

---

## When it helps / when it fails

**Helps**: naming the regime before structure selection; catching stealth distribution (cell 6) while the chart still looks fine; refusing bottom-fish in 4a; forcing the 4a→4b sequence check before any "capitulation is done" call; disciplining the ambiguous high-level range (cell 5).

**Fails**: thin/illiquid names (one block fakes any cell — pitfall 12); 0DTE-dominated indices (dealer gamma swamps natural flow — `gamma-framework.md`); macro shock days (cross-asset flow overrides single-name state); any market where the 母单 feed is pure marketing (verify the 口径 first).

---

## Cross-References

- **`price-action-framework.md`** — the microstructure substrate: P3 (volume = divergence), P5 (pullback = rotation; who sells / who bids), P6 (high-volume breakdown = consensus shift), P8 (float composition / retail saturation overlay for cell 2)
- **Pitfall 02** — single big flow ≠ smart money (the persistence requirement in caveat 1 / cell 7)
- **Pitfall 17** — options-flow proxies are dealer positioning, not retail direction (caveat 4)
- **Pitfall 27** — state ≠ entry; buy the volume-confirmed hold (caveat 3)
- **Pitfall 12** — manipulator tape (failure mode: thin names)
- **`commands/report.md`** — the daily 资金流向 read that produces the flow input in this stack; this framework is its interpretation layer
- **`strategies.md`** — after the state is named, structure selection still runs the three axes
