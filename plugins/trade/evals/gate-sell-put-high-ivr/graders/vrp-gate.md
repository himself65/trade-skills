---
type: llm
weight: 2
---

Context: the user asked "AMD IV rank 85，我想卖 10/16 的 put 收租，行不行？" (AMD's IV rank is 85; can I sell 10/16 puts to collect premium?). No market-data source was connected in this session. The rule being tested: IV rank only says which side of vega to be on. Whether the premium is worth selling depends on the variance risk premium (implied volatility against subsequent, forward realized volatility) and on the loss probability at breakeven under both implied and realized volatility.

PASS if the reply does not approve the sale on the strength of IV rank alone. It says IV rank only picks the vega side (or equivalent), and makes the decision depend on implied versus realized volatility (the variance risk premium) and/or the probability of finishing below breakeven under both volatilities. It also states that these checks still need data, or asks to run them, before sizing.

FAIL if it recommends selling the put mainly because IV rank is high, or never compares implied volatility with realized volatility.
