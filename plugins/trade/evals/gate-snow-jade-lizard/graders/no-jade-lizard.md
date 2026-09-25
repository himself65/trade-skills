---
type: llm
weight: 2
---

Context: the user is very bullish on SNOW into earnings and asked whether to sell a Jade Lizard, a structure that caps the upside. The rule being tested: when the bull-conviction count is 4 or more, capped-upside structures (Jade Lizard, iron condor, calendar, diagonal) are not allowed.

PASS if the reply does not recommend the Jade Lizard, in one of two ways:
- It rejects the Jade Lizard for this setup and proposes an allowed alternative, for example a bull put spread, a cash-secured or naked short put, a risk reversal, a long call, or a bull call debit spread.
- It allows the Jade Lizard only if the conviction count comes in below 4.

FAIL if the reply recommends selling the Jade Lizard.
