---
type: Trading Pitfall
title: Stock-based deal consideration — verify share-anchored vs dollar-anchored (and the split basis) before pricing flow-through
description: A fixed reference price ("$X of stock valued at $P/share") = a fixed SHARE count that marks to market; a closing-VWAP value = a fixed DOLLAR amount that doesn't. Confirm from the primary agreement, normalize split basis, cross-check the tape — before judging whether the target's stock flows through.
severity: HIGH
appliesTo: merger-arbitrage, event-driven, sum-of-parts, spin-off, stock-consideration, valuation, holdco-stub
tags: [merger-arbitrage, stock-consideration, share-anchored, dollar-anchored, sotp, nav, stock-split, primary-source-verification, event-driven, ownership-percent]
timestamp: 2026-06-15T23:00:00Z
---

## Stock-based deal consideration — verify share-anchored vs dollar-anchored (and the split basis) before pricing flow-through

**Severity: HIGH (gets the entire flow-through backwards — a 5x NAV error in the SATS case).**

When a company is paid (or pays) in another company's **stock** — M&A consideration, a spectrum/asset sale paid in equity, a spin-off stub, a stake in a soon-to-list private co — the single most important question before you value it is: **is the consideration a fixed NUMBER OF SHARES, or a fixed DOLLAR amount of shares?** They behave oppositely, and the language that distinguishes them is one clause you must read in the primary agreement, not infer.

- **Share-anchored (fixed share count)** ⟺ a **fixed reference price**: *"$X of stock, **valued at $P per share**"* with `P` fixed at signing. Share count `= $X / P` is locked; the recipient then **bears the target's price risk/reward**. The target's moves **flow through ~1:1**. Value today = (fixed shares) × (current price) = **ownership % × current market cap**.
- **Dollar-anchored (fixed value)** ⟺ price = a **closing-date measure**: *"shares **with a value of $X** determined by the VWAP over the N days prior to closing."* The recipient gets **$X regardless**; the share count floats at delivery; the target's moves **do NOT flow through**.

Get this wrong and every downstream number is wrong: NAV, the discount/premium to NAV, the hedge ratio, whether the name is even a "proxy" for the target at all.

**Why it matters** — the SATS case (June 2026): EchoStar's SpaceX consideration reads *"up to $11.117B of SpaceX Class A stock, **valued at $212 per share**."* I pattern-matched "a dollar figure appears" → **dollar-anchored** → concluded "SpaceX's IPO pop barely flows to SATS" and the bull's "~$42B stake" was a *phantom*. Wrong. The fixed $212 reference means a **fixed ~52M-share (pre-split) count ≈ ~2% of SpaceX**, which **marks to market**. SpaceX re-rated ~$0.55T → ~$2.5T, so the stake is **~$50B, not ~$11B**, and it flows through ~1:1. The 10-K even said so: EchoStar would hold *"a minority, non-controlling position"* whose *"valuation … would remain inherently uncertain"* — the signature of a marked-to-market equity stake. The tape had said so too: the proxy ($SATS) rose every time the target ($SPCX) raised its pre-IPO price — a clean revealed-preference proof of share-anchoring that I ignored.

**Compounding trap — split-basis hygiene.** A stock split is **value-neutral**. Never (a) multiply a **post-split** share count by a **pre-split** price, or (b) compare a **pre-split** reference price to a **post-split** quote. Both produce an N× error. In SATS, "$192.50 (post-split) < $212 (pre-split) ⇒ underwater" was wrong; the bull's "$42B" was 261.8M **post-split** shares × $160 **pre-split** — the same bug, inverted (his share count was actually right). When in doubt, value via **ownership % × current market cap**, which is split-invariant.

**How to apply**:
- **Read the consideration clause in the primary agreement** — the merger-agreement summary in the **8-K**, or the deal note in the **10-K / 10-Q**. Do not infer the mechanism from a secondary write-up or from memory.
- **Classify the anchor by the price term**: fixed reference price → **share-anchored** (flows through, marks to market). Closing-VWAP/average value → **dollar-anchored** (fixed $, no flow-through). Watch for **collars/caps** that blend the two (e.g. fixed shares within a price band, fixed value outside it).
- **Normalize the split basis** before any arithmetic; prefer **ownership % × current market cap** (split-invariant) over share-count × price when a split is in play or suspected. Sanity-check: does `reference price × current share count` imply a valuation the target plausibly had at signing? If it implies an impossible (e.g. higher-than-a-later-IPO) valuation, you've mixed bases — a split intervened.
- **Cross-check against the tape**: if the proxy/holdco moves with the target's valuation, it's share-anchored; if it's indifferent, dollar-anchored. The market frequently reveals the mechanism before you finish the contract — look for it early.
- **Pull live prices** for both the proxy and the target; never assert a quote you derived from a third party's "+X%".
- **Only then** apply the discounts that explain price vs NAV — delivery timing / lock-up, illiquidity, deal-close + going-concern **hazard** (pitfall 23), and **taxes on a low-basis gain**. The discount is the risk premium, not proof the asset is absent.
- **When pushed back on the mechanism, re-verify from the agreement and update** — don't defend the prior read (this rule was born from getting it backwards and being corrected by the tape).

**Cross-references**:
- `../ticker/sats-2026-06.md` — the case that produced this rule (share-anchored mis-read as dollar-fixed; ~5x NAV error; the tape was the tell).
- Pitfall 23 — hazard-rate discounting (why a correctly-valued but undelivered/locked stake still trades at a discount).
- Pitfall 08 — "priced in" is a percentage (the discount-to-NAV is the residual to size, not a binary).
- Pitfall 02 — a single large flow ≠ smart money (adjacent: don't take a big options print as confirmation of a SOTP thesis).
- `../ticker/cbrs-2026-05.md` — adjacent fully-diluted-share-count / IPO-mechanics discipline.
