---
type: llm
---

Context: the user asked about one specific print, contract or block: "/trade NVDA jan 27为什么这么多200c，这是建仓吗". No market-data source was connected in this session, so no real data could be pulled. The expected behavior is a lookup of that one print, not a full daily state report. Length is not a criterion.

PASS if all of these hold:
- The reply stays on that one print or contract. It either says what it would check to identify it (time, size, fill versus the bid/ask, trade code or multi-leg package, the open-interest change, that contract's or expiry's IV), or says it cannot tell without data.
- The full daily read is at most offered as a next step.
- It does not state who traded or why as fact. Hedged possibilities ("可能", "更可能", "could be") and background on the name, such as past earnings moves, a recent convertible or a prior case study, are allowed.

FAIL if the reply is in substance a whole-name daily report or daily plan, meaning it covers two or more of: activity versus the name's own average, GEX or max pain, the dark-pool baseline, a named composite state. Also FAIL if it asserts a buyer, seller or directional intent as fact. Checking the IV of the print's own contract or expiry is part of the lookup and does not count toward the daily report.
