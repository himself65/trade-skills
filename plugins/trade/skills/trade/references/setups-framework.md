# High-Conviction Setups Framework

Two recurring price-action setups that pattern-match high win-rate, high payoff-ratio trades on US single-name equities: **volume-laden consolidation breakout** and **catalyst-gap retest hold**. Both are derivable from [`price-action-framework.md`](price-action-framework.md) and the [pitfalls library](pitfalls/README.md), but extracted here as execution templates because they recur frequently enough to be worth memorizing as named patterns.

**Provenance**: Frank Trading, "真正的干货：实战中我最喜欢的setup" (Oct 19, 2025). Internalized from the source and mapped onto this skill's existing microstructure vocabulary; examples are the author's, the cross-references and vega-axis discipline are this skill's overlay.

**Critical rule**: A setup is a *pattern-recognition aid*, not a thesis. Before sizing in, always layer:
- **Catalyst clock** ([pitfalls 20, 21](pitfalls/README.md)) — flow + event timing
- **Vega-axis check** ([pitfall 19](pitfalls/19-direction-vega-independent-axes.md)) — wrong vega kills a right-direction trade
- **Take-profit discipline** ([pitfall 13](pitfalls/13-take-profit-discipline.md)) — these setups can run 30–100%+, but only if you survive the chop and trim into strength

---

## Setup 1: Volume-laden consolidation breakout (放量横盘 → 突破追进)

### Pattern

1. Stock chops sideways for an extended period — months to a year+ — on **consistently elevated volume** (this is not low-volume drift)
2. The range is tight relative to the stock's normal volatility — the "platform"
3. Price breaks the platform on a **distinct volume expansion** above the chop-period baseline
4. Entry: **chase the breakout**, do not wait for the retest

Breakout direction can be either way (向上向下均可), but on US single-name equities upside breakouts are structurally more probable — see Mechanism 4 below.

### Reference examples (from source)

| Ticker | Range period | Breakout |
|---|---|---|
| GC | Apr → late Aug | Volume break of prior high → main wave up |
| TSLA | May 30 → Sep 10 | Volume break of prior high → main wave up |
| NVDA | Mid-2023 → early 2024 | Range breakout → main wave up |
| HOOD | Early 2022 → early 2024 | Earnings-ignited breakout → main wave up |

### Mechanism — why this works

**1. Volume is a divergence signal, not a directional one** ([price-action-framework Primitive 3](price-action-framework.md))
- **High volume = disagreement**: bulls and bears both reject the current price → churn but no net move
- **Low volume = consensus**: either everyone agrees on fair value, or one side overwhelms with no counterparty — A-share 连板 is the limit case
- A long high-volume range therefore = a long, sustained disagreement that has not yet resolved

**2. Range chop is chip rotation (吸筹 + 洗盘)**
- Sellers who originally wanted out at $185/$190 eventually capitulate at $180 (boredom, opportunity cost, frustration)
- Buyers who originally wanted in at $160/$170 eventually pay up to $180 (FOMO, frustration)
- Each rotation cycle moves shares from less-conviction holders to more-conviction holders
- **The longer the range, the deeper the chip transfer**

**3. Float exhaustion → supply distribution shifts up**
- Float is finite; the capital pool tracking the name is also finite
- Once turnover hits a threshold, the original holders have largely cycled out
- New holders at $180 have *higher* upside targets (their plan was $200+, not $185)
- → the seller distribution above the platform has now shifted higher → less buy flow needed to push price up
- This is the vacuum-zone mechanism ([Primitive 4](price-action-framework.md)) applied to an entire post-breakout regime, not a single tick

**4. Equities are asymmetric to the upside**
- Futures: buy and sell sides are mechanically symmetric → up/down resolution probabilities are roughly equal
- Stocks: buy side is unlimited (anyone can buy); sell side is bounded (shorting has hard costs — locate fees, hard-to-borrow, recall risk, no infinite size)
- → range resolutions favor upside as a **base rate**, before any catalyst overlay

### The saying decoded

> 横有多长，竖有多长.

Not TA folklore — it's the chip-transfer mechanism above. Longer range = deeper rotation = more powerful resolution.

### Execution

| Parameter | Template |
|---|---|
| Entry | Volume-confirmed close above the platform high — chase, do not wait for retest |
| Direction default | Long (asymmetric float mechanic); reverse only on clean downside break |
| Instrument | **3–6 month options** — long enough for the main wave, short enough not to over-pay for vega |
| Sizing | Aggressive — "捕捉主升浪" is the explicit goal; leverage is part of the thesis |
| Stop | Clean re-entry into the platform on volume (breakout failed) |

### Vega-axis check (mandatory before structuring)

- High IVR (>70) + bullish → bull put spread (short put or credit spread)
- Low IVR (<30) + bullish → debit call spread or LEAPS-style long call
- Skipping this is [pitfall 19](pitfalls/19-direction-vega-independent-axes.md)

### When this setup fails or misfires

- **Breakout volume is weak** → likely false break; fade back into range
- **Tape was manipulator-driven** ([pitfall 12](pitfalls/12-manipulator-tape.md)) → orderbook signals unreliable
- **Macro shock day** (Fed / CPI / geopolitical) → single-name microstructure overridden
- **0DTE-dominated name** (SPX, QQQ) → use [`gamma-framework.md`](gamma-framework.md) instead
- **Post-earnings continuation cluster** ([pitfall 20](pitfalls/20-post-earnings-momentum-vs-fade.md)) — confirm flow is still net-buying; do not fade out of habit

---

## Setup 2: Catalyst-gap retest hold (利好跳空 → 回踩缺口不破)

### Pattern

1. Stock gaps up on a **real catalyst** — earnings beat, major partnership, technical breakthrough, policy tailwind (not a vague rumor, not a sympathy move)
2. Initial profit-taking pulls price back toward the gap
3. Longs defend either the **top of the gap**, the **bottom of the gap**, or rarely the **middle** of the gap
4. Clear bottoming price action at that level → enter long

### Reference examples (from source)

| Ticker | Catalyst | Behavior |
|---|---|---|
| SNOW | Earnings gap up | Profit-takers shaken out; longs held gap → continuation |
| CNC | Sep 11 — maintained guidance, gap up | Gap defended → continuation |
| BWXT | Earnings gap up | Gap defended → continuation |
| PATH | NVIDIA partnership announcement | Gap defended → continuation |
| NBIS | (catalyst-driven gap) | Gap defended → continuation |
| UNH | Oct 9 — rallied to top of gap, no follow-on catalyst | Short-term longs exit at gap top (the **negative** case) |

### Mechanism — why this works

**1. Real catalysts redraw the fair-value distribution** ([Primitive 7](price-action-framework.md))
- Earnings, partnerships, breakthroughs, policy = fundamental re-pricing events
- A gap is the orderbook's compressed representation of that re-pricing — there is *no transactional history* inside the gap

**2. The pre-catalyst price becomes a hard floor**
- PATH example from the source: pre-NVIDIA deal, $12.50. Post-deal, the partnership is an objective new fact
- Different traders disagree about the *upside* target ($15? $20? $30?), but they all agree on the *floor*: $12.50 was the price *before* the good news; absent fresh bad news, price cannot rationally be lower
- → smart longs cluster bids near the pre-catalyst price → it holds

**3. Catalyst-anchored S/R is fundamentally stronger than trend-line S/R**
- A trend line is a chart artifact; it works because traders watch it, a self-fulfilling line
- A catalyst-driven gap is a *real* fundamental re-rating anchored to objective new information
- → defend rate is much higher; failure is more informative when it does happen (it means a *new* re-rating has overwritten the old one)

### Execution

| Parameter | Template |
|---|---|
| Entry trigger | Clear bottoming price action at gap top, gap bottom, or (rarely) gap middle |
| Direction | Long |
| Instrument | **9–12 month options** — gap retests can chop multiple times before resolution; short-dated theta will eat the position even when the thesis is right |
| Sizing | Heavy (重仓) — the stop is unusually clean, which justifies size |
| Take profit | Trim majority near prior high; keep a small runner for breakout-above-prior-high optionality |
| Stop | High-volume break of the gap bottom — exit immediately, do not average down |

### Why long-dated options specifically

The gap-retest sequence often involves multiple touches of the gap before final resolution. Front-month options theta-decay through the chop *even when the thesis is right*. The 9–12 month tenor is the time budget for:
1. Gap to hold across multiple retests
2. A new post-catalyst consensus to form
3. The next leg to actually start

This is [pitfall 18](pitfalls/18-roll-frequency-vs-iv-thesis.md) applied as setup design: pay for time once, not seven times.

### Vega-axis check (mandatory)

- Post-earnings gap-ups are usually post-IV-crush → low IVR → debit structures preferred
- Partnership / policy gap-ups without an earnings overlay can leave IV elevated → check IVR before structuring
- Same [pitfall 19](pitfalls/19-direction-vega-independent-axes.md) logic — do not assume "bullish view = long calls"

### When this setup fails or misfires

- **Catalyst is weak / rumored / unconfirmed** → not a real re-pricing event; the gap is noise
- **Gap bottom breaks on high volume** → fundamental re-pricing was wrong (or wronger news has arrived); flip per [pitfall 04](pitfalls/04-flip-on-invalidation.md)
- **Price returns to gap top with no follow-on catalyst** (UNH Oct 9 case from the source) — short-term longs exit; this is "consensus is exhausted at the gap, no fresh marginal bull"
- **Sell-the-news fade reflex** ([pitfalls 01, 02, 03, 20](pitfalls/README.md)) — don't conflate "gap up should fade" with "this particular gap will fade"

---

## How the two setups relate

| Aspect | Setup 1 (Consolidation breakout) | Setup 2 (Catalyst gap retest) |
|---|---|---|
| Primary microstructure | Chip rotation + float exhaustion | Fundamental re-pricing + objective floor |
| What kicks off the move | Volume expansion through platform | Catalyst-driven gap |
| Best instrument | 3–6 month options | 9–12 month options |
| Entry timing | Chase the breakout | Wait for the retest |
| Stop placement | Re-entry into platform on volume | High-volume break of gap bottom |
| Typical frequency | Lower (multi-month setups) | Higher (the bread-and-butter) |
| Direction bias | Long (float asymmetry) | Long (catalyst polarity) |

Both rest on the same underlying mechanic — **chips rotating from weaker hands to stronger hands at a known reference level** — but the reference level is different (chop midpoint vs catalyst-anchored gap).

---

## When the framework helps

- Naming the pattern in front of you so you can apply the right execution template instead of improvising
- Justifying tenor selection (3–6 months vs 9–12 months) on mechanism, not gut feel
- Drawing a clean stop level before entry — both setups have unambiguous invalidation points

## When the framework fails or doesn't apply

- **Manipulator-tape names** ([pitfall 12](pitfalls/12-manipulator-tape.md)) — the volume/gap signals are fakeable
- **Index / 0DTE-dominated names** — dealer gamma swamps the natural orderbook → use [`gamma-framework.md`](gamma-framework.md)
- **Macro shock days** — single-name patterns are overridden by cross-asset flow
- **Ultra-thin small caps** — orderbook too shallow for the chip-transfer mechanism to mean anything

---

## Cross-References

- **[`price-action-framework.md`](price-action-framework.md)** — the microstructure layer these setups sit on top of (Primitives 3, 4, 7 especially)
- **[Pitfall 04](pitfalls/04-flip-on-invalidation.md)** — flip on gap-bottom break, do not average down
- **[Pitfall 12](pitfalls/12-manipulator-tape.md)** — when the breakout/gap signal is fake
- **[Pitfall 13](pitfalls/13-take-profit-discipline.md)** — these setups can run hard; trim into strength
- **[Pitfall 18](pitfalls/18-roll-frequency-vs-iv-thesis.md)** — the cost of short-dating a long-thesis trade (motivates Setup 2's 9–12 month tenor)
- **[Pitfall 19](pitfalls/19-direction-vega-independent-axes.md)** — direction and vega are independent axes (mandatory check)
- **[Pitfall 20, 21](pitfalls/README.md)** — post-earnings continuation vs fade; event-IV vs demand-IV
- **[`strategies.md`](strategies.md)** — structure-to-regime matching (the execution layer)
- **[`gamma-framework.md`](gamma-framework.md)** — sibling framework for gamma-dominated names

---

## Closing principle (from the source)

> 市场永远不会奖励最聪明的人，只会奖励最有纪律的人.

Both setups fail not because the pattern is wrong, but because traders abandon the discipline mid-trade — chasing without volume confirmation, holding through gap-bottom breaks, sizing without a vega check, short-dating a long-thesis trade.
