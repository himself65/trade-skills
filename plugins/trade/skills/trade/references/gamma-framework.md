# Gamma + Options Structure Framework

Multi-factor confluence framework using dealer gamma, options chain structure, IV term changes, and flow to build short-term price probability maps.

**Critical rule**: This framework outputs **probability + key levels**, not direction predictions. Use it to **size and structure** trades, not to decide direction. Direction comes from tape + catalysts. Inverting this — letting gamma decide direction — fades dealer hedge flow with retail-style "market structure" interpretation.

---

## Signal Effectiveness Triage

| Signal | Effectiveness | Notes |
|--------|---------------|-------|
| **Dealer GEX (Gamma Exposure)** | HIGH | Net short gamma → dealers chase (amplify); net long → dealers fade (pin) |
| **Zero gamma flip level** | HIGH | Crossing this level reverses dealer hedge sign — real regime change |
| **Call wall / put wall** | MEDIUM | OI clusters act as magnets/resistance; broken when catalyst hits |
| **IV term structure shifts** | MEDIUM | Far IV rising before near IV = market pricing mid-term catalyst |
| **Skew shift (put-call IV)** | MEDIUM | Sudden put-skew steepening often leads downside |
| **Unusual flow (sweeps, blocks)** | LOW-MED | Need confluence; single flow is noise unless multi-strike same-direction |
| **Max pain** | LOW | Statistically weak; only weak edge in long-gamma + no-catalyst windows |
| **P/C ratio** | LOW | Hedging and directional flow blended; too coarse |

---

## The Confluence Stack (5 Layers)

Read top-down. Each layer constrains the next.

### Layer 1 — Regime
- **VIX level**: low VIX = breakouts extend; high VIX = breakouts fade
- **Sector cohort direction**: single-name breakouts amplified by cohort confirm; faded by cohort reverse
- **Macro catalyst proximity**: Fed/CPI within 24h erodes gamma signal (cross-asset flow displaces dealer hedge book)

### Layer 2 — Gamma Structure
- **Current price vs zero-gamma flip**:
  - Above flip + dealers long gamma → breakouts compressed, mean-revert
  - Below flip + dealers short gamma → breakouts amplified (gamma squeeze mechanic)
- **Nearest call wall**: resistance trigger (broken call wall → dealers re-hedge upward)
- **Nearest put wall**: support floor (broken put wall → dealers re-hedge downward)

### Layer 3 — IV / Vol
- **IVR < 30**: long premium / debit structure favored (vol has room to expand)
- **IVR > 70**: short premium / credit structure favored (vol has room to compress)
- **Term backwardation** (near > far): trade short end, near catalyst dominates
- **Term contango** (near < far): trade longer-dated, mid-term catalyst pricing

### Layer 4 — Flow
- **Same-direction multi-strike sweeps**: confluence signal (not single-block)
- **Block trades**: distinguish single-desk positioning vs multi-institution flow
- **Dark pool / ETF rebalance**: end-of-day directional pressure indicators

### Layer 5 — Tape
- **Volume vs 5-day average** at key levels
- **Number of prior tests** of resistance/support (3rd test breakout > 1st test)
- **HVN / LVN volume profile**: high-volume nodes are sticky; low-volume nodes get traversed fast

---

## Output Format

NOT: "stock will hit $X"
INSTEAD: probability + levels + triggers + invalidations + structure recommendation

### Template

```
Direction probability: up 65% / down 25% / range 10%

Key levels:
  - Breakout trigger: $108 (call wall + zero gamma confluence)
  - Acceleration:    $112 (next call wall, dealer flips short gamma)
  - Resistance cap:  $118 (far-month OI peak)
  - Drawdown invalidation: $103 (put wall break)

Trigger conditions (ALL must hold):
  - Break $108 with volume > 1.5× 5D avg
  - Sector cohort not down >1% same day
  - VIX not above 22

Failure conditions (ANY triggers exit):
  - No close above $108 within 30 min of break → fade trade
  - Cohort reverses → quick stop

Expected move speed:
  - Short-gamma regime: $112 within 2-4 hours of break
  - Long-gamma regime: choppy, 48 hours to advance

Position structure:
  - IVR 65 → debit call spread > naked long call (vega halved)
  - Sizing: 1× normal (no event proximity)
```

---

## When the Framework Works

1. **Liquid large-caps** — public GEX data approximation acceptable
2. **No major catalyst within 48h** — gamma not overridden by fundamental shift
3. **Short-to-mid horizon** (1–5 days)
4. **As confluence input**, not standalone signal

## When It Fails

1. **Earnings windows** — IV crush invalidates model; fundamental shift overrides gamma. Skip framework.
2. **Macro shocks** (Fed surprise, CPI surprise) — cross-asset flow displaces dealer book
3. **Small-caps / low-liquidity** — public GEX data error too high to trust
4. **Regime change days** — yesterday's OI doesn't reflect today's hedge book
5. **0DTE-dominated names** (SPX, QQQ) — public GEX undercounts intraday gamma flow

---

## Public GEX Data Caveats

Public dealer gamma estimates (SpotGamma, Tier1Alpha, etc.) carry meaningful model error:

- Don't know **which dealers** hold positions (different risk appetites)
- Don't know if hedges are **dynamic vs static**
- Don't know how much OI is **covered** (paired with underlying) vs naked
- **Lagged 1 day** (yesterday's close OI)

Treat public GEX as reasonable approximation, not precision tool. Confluence with tape + flow > raw GEX number.

---

## Practical Workflow for Mag-7 / Earnings Trader

| Window | Use of gamma framework |
|--------|------------------------|
| **Pre-earnings** | Find entry price + structure (NOT direction). Gamma identifies low-risk entry levels and wall resistance. |
| **Earnings T-0 AH** | **Skip framework.** IV crush invalidates model; tape/news leads. |
| **T+1 morning** | **Best window.** Re-build the map. Dealer hedge book has reset post-IV-crush. New levels form, exploitable. |
| **T+1 to T+5 drift** | Use to identify exit / reload levels along the post-earnings drift. |
| **Range-bound non-event week** | Combine with max-pain (only context where max pain has weak measurable edge). |
| **Trend day** | Tape leads; gamma confirms or denies. Don't fight tape with gamma. |

---

## Anti-Patterns (Don't Do This)

- **Single-signal trades**: "GEX flipped negative, buy" — needs Layer 1 (regime) + Layer 5 (tape) confluence
- **Max-pain pinning bets** outside the narrow conditions above
- **Retail-psychology explanations** for moves the framework can't explain (see pitfall 17)
- **Catalyst-window gamma plays** — IV crush + fundamental shift dominate; gamma noise overwhelms
- **Decoupling structure from regime**: trading short-gamma squeeze structures in a long-gamma environment

---

## Cross-References

- **Pitfall 17** — dealer flow drives prices, not retail psychology
- **Pitfall 03** — tape > opinion (tape-leads-direction principle)
- **Pitfall 11** — LEAPS vega tax (gamma framework ignores vega risk in long-dated structures)
- **strategies.md** — structure-to-regime matching for execution
