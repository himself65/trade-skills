---
type: llm
weight: 2
---

Context: the user asked whether to sell a Jade Lizard on SNOW into earnings while very bullish. Before recommending, the agent must build a counterfactual P/L matrix: P/L at spot, +10%, +20%, +35% and +50%, for the Jade Lizard and for at least one alternative structure.

PASS if the reply contains that comparison, as a table or equivalent, and all of these hold:
- It shows P/L for the Jade Lizard and for at least one other structure, for example a bull put spread, a short put, a risk reversal, a long call or a call spread. Strikes may be illustrative.
- It covers spot, +10%, +20%, +35% and +50%.
- It appears before the final recommendation.

FAIL if there is no such comparison, if it lacks the +35% or +50% scenarios, or if only the Jade Lizard is shown.
