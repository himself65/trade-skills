---
type: llm
weight: 2
---

Context: the user asked whether to sell a Jade Lizard on SNOW into earnings while very bullish. Before recommending a structure, the agent must build a counterfactual P/L matrix: P/L at spot, +10%, +20%, +35% and +50%, for the Jade Lizard and for at least one alternative. No live prices were available in this session.

PASS if the reply contains that comparison, as a table or equivalent, and all of these hold:
- It covers the Jade Lizard and at least one other structure, for example a bull put spread, a short put, a risk reversal, a long call or a call spread.
- Every structure has an entry for spot (or flat), +10%, +20%, +35% and +50%. Entries may be illustrative numbers or qualitative outcomes such as "credit kept", "≈ 0", "loss" or "large gain", because there were no live prices.
- It comes before the structure the reply proposes to trade. A one-line verdict on the Jade Lizard at the very top is fine, as long as the count and matrix that justify it follow.

FAIL if there is no such comparison, if the +35% or +50% column is missing, or if only the Jade Lizard is shown.
