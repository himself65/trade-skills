---
type: Trading Pitfall
title: Capped-upside structures (Jade Lizard, Iron Condor, Calendar) are forbidden in high-conviction bull setups — asymmetry is a third axis beyond direction and vega
description: Asymmetry is a third axis past direction and vega; when bull-conviction count >=4, capped-upside structures (Jade Lizard, IC, Calendar) are banned.
severity: HIGH
appliesTo: structure-selection, earnings, directional, high-conviction
tags: [jade-lizard, iron-condor, calendar, asymmetry, upside-cap, bull-conviction, tail-event, structure-selection]
timestamp: 2026-05-27T23:20:29Z
---

## Capped-upside structures are forbidden in high-conviction bull setups — asymmetry is a third axis beyond direction and vega

Pitfall 19 named **direction** and **vega** as two independent axes. There is a **third axis**: **upside profile / payoff asymmetry**. A structure that *technically* matches the regime on direction + vega can still be catastrophically wrong if it **caps the upside in the very scenario you predicted**. Jade Lizard, Iron Condor, Calendar, and Diagonal all cap upside — they are NEUTRAL or PIN structures, not directional ones. When bull conviction is high (channel-check confluence + thematic re-rate + de-risked tape), these structures are forbidden.

**Why it matters**: The "high IV → sell premium" rule (pitfall 7) is necessary but not sufficient. It tells you the vega sign, not the asymmetry. Selling premium can be done with structures whose bull-case max profit is *small* (Jade Lizard, IC) OR *large* (naked short put, bull put spread, risk reversal). When the bull tail prints, the small-max-profit structures are not just suboptimal — they actively **transform** into upside losers (Jade Lizard call spread fully ITM, IC short call ITM-to-cap, calendar short leg deep ITM).

Concrete failure (SNOW 2026-05-27): Pre-earnings setup had **5+ independent factors** screaming bull:
- 6/6 Funda partners said 1Q26 beat with Cortex Code acceleration
- AI Labs (OpenAI, Anthropic) had become top customers — new multiple-repricing information
- Stock pre-beaten 30% from 6M high — low expectations
- Past 4/5 quarters positive reactions (avg +7.7%)
- Cortex Code framed as "Claude Code of data" — AI coding agent narrative is hot

Recommendation given: **Jade Lizard 5/29 $155P / $195C / $200C, target credit $4.50.** This structure caps upside at $450/contract for ANY move above $195. The 30/40/30 (bull/base/bear) probability split *severely underweighted* the bull tail because it ignored the multiplicative effect of confluence factors.

Actual outcome: AH +35.75% to **$237.92** — a +3.2 SD move that converted Jade Lizard into a maximum-loss situation on the call spread (gross loss bounded at $50/contract by the long $200C, but the **counterfactual** alternatives:
- Naked $145P short: ~$3.50 credit, fully kept = **+$350/contract**
- Bull put spread $160/$145: ~$3.50 credit, fully kept = **+$350/contract**
- Long 5/29 $185C @ ~$8: now ~$53 = **+$4,500/contract (+560%)**
- Long 5/29 $200C @ ~$3: now ~$38 = **+$3,500/contract (+1,170%)**
- 7/17 $190C diagonal: 4-5x easily

The Jade Lizard captured ~1% of what an uncapped bullish structure would have. **This is not "structure underperformed" — this is "structure mathematically forbidden in this regime."**

**How to apply**:

### 1. Run the bull-conviction count BEFORE picking structure

Tally these factors (each = 1 conviction point):

- [ ] 3+ independent channel checks aligned bullish
- [ ] Sector / thematic narrative actively re-rating
- [ ] Stock down >20% from recent high going into event (de-risked setup)
- [ ] Past 4 quarters: ≥3 positive earnings reactions
- [ ] NEW information likely to be disclosed (new customer, new product launch tier, guide raise)
- [ ] Net options flow back-month bullish (call premium dominance)
- [ ] Short interest >10% (squeeze potential)
- [ ] Implied move materially below recent average realized move

**Conviction count ≥ 4 → "high-conviction bull" → asymmetry rule activates**

### 2. Banned structures in high-conviction bull (conviction ≥4)

| Structure | Why banned in high-conviction bull |
|---|---|
| **Jade Lizard** | Bear call spread caps upside at modest gain; spread max loss triggers in bull tail |
| **Iron Condor** | Short call ITM in bull tail; symmetric structure assumes range-bound |
| **Calendar / Diagonal** | Pin structure; bull tail blows past short strike |
| **Covered Call** | Caps upside at strike + premium; equivalent to short call leg |
| **Cash-Secured Put with simultaneous Bear Call** | Same problem as Jade Lizard |

### 3. Required structures in high-conviction bull (conviction ≥4)

| Structure | Direction | Vega | Upside profile |
|---|---|---|---|
| **Naked Short Put** (defined risk via cash-secured) | + | − (good for high IV) | Capped at credit, but no upside drag |
| **Bull Put Spread** | + | − | Capped at credit, no upside drag |
| **Risk Reversal** (sell put + buy call) | strong + | mixed | Uncapped upside |
| **Long Call (single)** | + | + (BAD at high IV) | Uncapped upside, but pays vega tax |
| **Bull Call Debit Spread** | + | + (BAD at high IV) | Capped at upper strike, pays vega tax |
| **Synthetic Long** (sell put + buy call same strike) | strong + | mixed | Uncapped upside |
| **Stock + protective put** | + | small + | Uncapped upside |

At **high IV + high bull conviction**, the optimal structures combine short-vega with uncapped or wide upside:
- **Naked short put far OTM** (e.g., 1.5-2 SD OTM) — collects vega crush, no upside drag
- **Bull put spread** (defined risk version of above)
- **Risk reversal** (best when IV skew has put-side richness)

### 4. The asymmetry check — mandatory before submitting

Calculate **max profit if the bull tail scenario hits** (stock +20%, +30%, +50%) for each candidate structure:

| Structure | Max profit @ +20% | Max profit @ +35% | Max profit @ +50% |
|---|---|---|---|
| Jade Lizard | capped @ credit | LOSS (call spread ITM) | LOSS (call spread max) |
| Bull put spread | capped @ credit | capped @ credit ✓ | capped @ credit ✓ |
| Naked short put | capped @ credit | capped @ credit ✓ | capped @ credit ✓ |
| Long ATM call | proportional gain | proportional gain ✓ | proportional gain ✓ |
| Risk reversal | proportional gain | proportional gain ✓ | proportional gain ✓ |

**If candidate structure shows LOSS or flat profit at +35% scenario AND your bull-conviction count ≥ 4 → reject it.**

### 5. The "but high IV is the dominant edge" defense — REJECT IT

Pitfall 7 says high IV favors short premium. That's true, but it's a *vega* statement, not an *asymmetry* statement. The right interpretation:
- Pick from structures that are short-vega ✓
- Within that set, pick the one with **best upside profile in the bull tail**
- **Do not pick the one with the most theta/IV crush absorbed if it caps upside catastrophically**

When the bull tail probability is ≥ 40%, the **dollar value of the upside differential** between (long delta uncapped) and (capped) far exceeds the **dollar value of additional IV crush captured** by the more theta-heavy structure. Trade the bigger expected-value source.

### 6. Position sizing for high-conviction directional plays

If the asymmetry rule activates and you're using uncapped-upside structures:
- Position smaller than usual — you're paying for asymmetry with vega tax (long calls) or wider strike requirements (risk reversal)
- 1-2% of capital max per single-name event trade
- Plan multiple structures combined: 70% bull put spread (vol-clipper) + 30% long calls (tail catcher)

### 7. Cross-references

- Pitfall 7 — IV crush favors SHORT premium (still true, but only on the vega axis)
- Pitfall 19 — direction and vega are independent axes (asymmetry is the third axis)
- Pitfall 14 — channel-check sample bias (discount single channel; but **3+ aligned channels = real signal, not selection bias**)
- Pitfall 6 — clever structures signal fading conviction (Jade Lizard in high-conviction bull = textbook fading-conviction structure)
- TSEM 2026-05 — diagonal calendar capped upside in bull case (same family of error)
- SNOW 2026-05 — Jade Lizard capped upside in massive bull tail (canonical case study)
- `../strategies.md` — Asymmetry / upside profile section
