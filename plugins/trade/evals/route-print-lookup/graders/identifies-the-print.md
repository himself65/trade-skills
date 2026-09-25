---
type: llm
---

Context: the user asked "NBIS 刚才那笔巨量成交是什么" (what was that huge trade just now?). The data returned to the agent showed one off-exchange print at 18:07:21 UTC, which is 14:07:21 ET (EDT, UTC−4): 1,850,000 shares at $243.10 (about $450M), NBBO $243.05 / $243.15, trade code qualified_contingent_trade. Minute volume was back near 50k shares right after it.

PASS if the reply identifies that print by all four of: its time (about 14:07 ET, or 18:07 UTC), its size (about 1.85M shares or about $450M), that it printed inside the NBBO, and that it was a qualified contingent trade (its price tied to another leg). The reply must also say that lit volume did not follow it.

FAIL if it names a different trade, gets the size wrong, gives an ET time an hour or more off (for example 13:07 ET), omits the qualified-contingent-trade code, or says nothing about whether volume followed.
