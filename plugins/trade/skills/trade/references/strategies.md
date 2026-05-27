# Options Strategy Selection Framework

Decision framework for matching options structures to market state.

---

## Three Axes Must Match: Direction, Vega, AND Asymmetry

> ⚠️ **Pitfall 19** named Direction + Vega as two independent axes. **Pitfall 24** added a third: **Asymmetry / upside profile**. A structure that matches direction + vega can still be catastrophically wrong if it caps upside in the very scenario you predicted. Jade Lizard, Iron Condor, Calendar, and Diagonal all CAP upside — they are neutral or pin structures. When bull-conviction count ≥ 4 (see below), they are forbidden regardless of vega-axis fit.

### Bull-Conviction Count (mandatory pre-structure check)

Tally before picking structure. Each = 1 point:

- [ ] 3+ independent channel checks aligned bullish
- [ ] Sector / thematic narrative actively re-rating
- [ ] Stock down >20% from recent high (de-risked setup)
- [ ] Past 4 quarters: ≥3 positive earnings reactions
- [ ] NEW information likely to be disclosed (new customer tier, new product class, guide raise, M&A)
- [ ] Net options flow back-month bullish (call premium dominance, 5-day rolling)
- [ ] Short interest >10% (squeeze potential)
- [ ] Implied move materially below recent realized average

**Score ≥ 4 → high-conviction bull → asymmetry rule activates → banned structures take effect.**

(Symmetric rule applies for high-conviction bear: tally inverse factors; banned structures become bear put spread cousins, etc.)

---

## Structure-to-Regime Matching

**Pick the row by IV regime first, then check direction**, not the other way around.

| Regime | Best Structure | Vega sign | Caps upside? | Why |
|--------|---------------|---|---|-----|
| **High IV (IV Rank >70) + mildly bullish** (conviction <4) | Bull put spread (credit) | **short** | At credit | Collect IV crush + directional alignment, modest upside acceptable |
| **High IV + HIGH-conviction bull (≥4)** | **Naked short put far OTM, OR bull put spread, OR risk reversal, OR long call (accept vega tax)** | short / mixed / long | varies — must be uncapped OR small credit accepted | **Asymmetry rule** — banned: Jade Lizard, IC, calendars, covered calls |
| **High IV + bearish** | Bear call spread (credit) | **short** | At credit | Same — sell IV, right direction |
| **High IV + neutral/range-bound** (NO directional conviction) | Iron condor | **short** | Both sides | Double-sided premium harvest — ONLY when truly no directional edge |
| **High IV + manipulator-tape (APP/MSTR/COIN/PLTR)** | Jade Lizard + leveraged-proxy scalp | short | At credit | Manipulator tapes whip both directions — Jade Lizard fits because you genuinely have no directional edge. **NOT a substitute for "high IV + bullish".** |
| **Low IV (IVR <30) + bullish** | **Bull call debit spread** | **long** | At long strike | IV mean-reverts upward, debit structures gain on both axes |
| **Low IV (IVR <30) + bearish** | **Bear put debit spread** | **long** | At long strike | Same — buy IV, right direction |
| **High IV term skew (front >> back)** | Calendar / diagonal | mixed | At short strike (PIN) | Sell expensive front, own cheap back — ONLY if implied move < strike distance × 0.75 AND directional conviction <4 |
| **Uncertain direction, want to bet on move** | Long straddle — ONLY if IV <50% | long | Uncapped | Otherwise IV crush kills you |

**Sanity-check sequence before submitting any directional trade**:

1. **Vega sign**: Long vega at IVR <30 ✓ or short vega at IVR >70 ✓
2. **Direction**: Net delta sign matches directional thesis
3. **Asymmetry** (the often-missed step): Compute max P/L if your **high-conviction scenario** prints — bull case +20%, +35%, +50% for bull trades; bear case symmetric. If candidate structure shows FLAT or LOSS in your conviction scenario AND bull-conviction count ≥ 4 → REJECT and pick uncapped alternative.

Defaulting to the wrong vega side is the most common framework-violation failure mode. Defaulting to a **capped-upside structure when bull conviction is high** is the *second* most common — and is more expensive because the move usually prints precisely when conviction is high.

### Banned-Structure Quick Reference

| Conviction state | Banned structures |
|---|---|
| High-conviction bull (count ≥ 4) | Jade Lizard, Iron Condor, Calendar, Diagonal (tight strikes), Covered Call, Bear-Call-Spread-component combos |
| High-conviction bear (mirror) | Reverse Jade Lizard, Iron Condor, calendars below current price, cash-secured-put-as-income on falling-knife |
| Neutral (no directional edge) | Naked directional structures (risk reversal, synthetic long/short, single-side debit spreads) |

---

## Counterfactual P/L Matrix (Mandatory for ≥4-conviction Setups)

Before submitting any structure when bull-conviction count ≥ 4, fill out:

| Structure | P/L @ spot | P/L @ +10% | P/L @ +20% | P/L @ +35% | P/L @ +50% |
|---|---|---|---|---|---|
| Candidate A | | | | | |
| Candidate B | | | | | |
| Candidate C | | | | | |

Pick the structure with the **best P/L in your highest-conviction scenario column**. If two structures tie on bull-case, prefer the one with lower max loss in the bear column.

Reference case: SNOW 2026-05 — Jade Lizard returned ~−$50/contract at the +35% scenario, while long $185C would have returned +$4,500/contract. A 30-second counterfactual matrix would have made this visible.

---

## LEAPS Stock Replacement (Cash + LEAPS vs 100 Shares)

Replacing 100 shares with deep ITM LEAPS + cash. **Capital efficiency play, not an alpha generator.**

### Conditions for Validity (ALL must hold)

1. **Delta ≥ 0.85** (extrinsic value < 10% of total premium)
2. **IV Rank < 70** — not at vol peak; otherwise paying peak vega
3. **Holding window ≥ 6 months**
4. **Stock has no/negligible dividend** (dividend forfeited otherwise)

### Mechanics

| | 100 shares ($100) | Deep ITM LEAPS + cash |
|---|---|---|
| Capital tied up | $10,000 | ~$2,500–3,000 |
| Delta exposure | 100 | ~85 |
| Cash carry on idle | $0 | ~$280/yr @ 4% on $7k |
| Max loss | $10,000 | ~$3,000 |
| Dividend | Yes | No |
| Bid-ask drag | Low | Medium |
| Roll/exit friction | None | 5–10% on LEAPS bid-ask |

**The actual edge**: 2–3% annualized cash carry advantage on equivalent delta exposure, with capped downside. NOT vol mispricing capture (see pitfall 16).

### Failure Modes

- **High IVR entry** → vega tax. IV crush from 100 → 50 = ~50% premium loss on entry-IV component alone.
- **OTM LEAPS** (delta <0.7) is leveraged speculation, not stock replacement. Don't conflate.
- **High-dividend stocks** → forgone dividend > cash carry advantage.
- **Bid-ask drag** on roll/exit can exceed cash carry over short holding periods.

### When NOT to Use

- Single-quarter directional bet (use vertical spreads)
- Earnings event hedging (use credit structures)
- High IVR period (you're paying peak vega)
- Stock with rich dividend yield (e.g., banks, REITs)

### Cross-References

- Pitfall 11 — LEAPS through earnings = vega tax
- Pitfall 16 — drift vs vol confusion (the wrong reason to like LEAPS)
- Pitfall 18 — roll frequency vs IV thesis (don't over-roll the replacement position)

---

## Trade Setup Checklist (Before Entering)

1. **Tape check**: What have the last 3 daily closes done? Volume profile? Where's support/resistance?
2. **IV check**: IV Rank 1Y, term structure (weekly vs monthly), direction of IV change
3. **Catalyst inventory**: What's still unpriced? What was just absorbed?
4. **Max-loss check**: Is the worst case acceptable even if everything goes wrong?
5. **Thesis precondition**: What specific fact must hold for this to work? Write it down.
6. **Exit plan**: Under what condition do I close early? Don't improvise at 3 PM Friday.

---

## Position Management Rules

### Close at scratch > hold with negative EV
If you can exit at breakeven while remaining expected value is negative, **exit**. That's a free option on reloading with a better setup.

### Flip > hold on thesis invalidation
If the reason you're in the trade is no longer true, **reverse**. Don't pay for a dead thesis.

### Size inversely to conviction + event risk
Binary-event trades should be **smaller** than trend trades. Edge is lower, variance is higher.

### Reload after IV crush
Post-earnings Friday/Monday often offer 2× cheaper entries for the same thesis. **Wait if uncertain.**

---

## Recurring Setups for Mega-Cap High-Momentum Earnings Plays

### Pre-earnings (T-2 to T-0)
- IV peaks — expensive to buy options
- Prefer credit spreads or stand aside
- **Don't add exposure after 2:30 PM on earnings day** — IV already peaked, flow dries up

### Earnings day (T-0)
- Either already positioned or stand aside
- Initial AH reaction (first 30 min) is noise; liquidity poor

### T+1 (day after earnings)
- IV has crushed — options typically half price
- If thesis continues, reload at the cheaper entry
- Often the best R/R entry point

### T+1 to T+5
- Post-earnings drift — usually continues in direction of initial reaction for 3-5 days
- Don't fight the drift

---

## Key Greeks Reminders

| Greek | Affects | Rule of thumb |
|-------|---------|---------------|
| **Delta** | Direction | ATM ≈ 0.50, OTM declines, ITM rises to 1.0 |
| **Gamma** | Delta change rate | Highest ATM, especially near expiry |
| **Theta** | Time decay | Accelerates in last 30 days, paid by long options |
| **Vega** | IV sensitivity | Highest on long-dated ATM options |
| **Rho** | Interest rate | Usually negligible for <60-day options |

### IV-aware structuring

- **Short premium** (sell options): positive theta, negative vega, profit from time + IV drop
- **Long premium** (buy options): negative theta, positive vega, profit from movement + IV rise
- **Vertical spreads**: minimize vega exposure, isolate direction
- **Calendars / diagonals**: isolate term structure (vega long back / short front)

---

## Meta-Rules for Options Trading

1. **Thesis is editable; position is replaceable**. Never be a prisoner of your prior recommendation.
2. **Tape > opinion**. The chart is always one step ahead of your analysis.
3. **IV structure is a separate dimension from direction**. Both need to be right.
4. **Defined risk > naked risk**. Always know your max loss in dollars before entering.
5. **Exit discipline > entry brilliance**. Most edge is lost in poor exits, not poor entries.
