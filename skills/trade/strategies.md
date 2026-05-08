# Options Strategy Selection Framework

Decision framework for matching options structures to market state.

---

## Structure-to-Regime Matching

| Regime | Best Structure | Why |
|--------|---------------|-----|
| **High IV (IV Rank >70) + bullish** | Bull put spread (credit) | Collect IV crush + directional alignment |
| **High IV + bearish** | Bear call spread (credit) | Same — sell IV, right direction |
| **High IV + neutral/range-bound** | Iron condor | Double-sided premium harvest |
| **Low IV + strong directional** | Debit spread (bull call / bear put) | IV has room to rise, cheap premium |
| **High IV term skew (front >> back)** | Calendar / diagonal | Sell expensive front, own cheap back |
| **Uncertain direction, want to bet on move** | Long straddle — ONLY if IV <50% | Otherwise IV crush kills you |

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
