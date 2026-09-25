---
type: llm
weight: 2
---

Context: the user asked about one specific trade ("刚才那笔巨量成交是什么"). The expected behavior is a quick lookup of that print, not a full daily report.

PASS if all of these hold:
- The reply stays a lookup and answers about that one print.
- It offers the full daily read (activity check, block filtering, volatility, GEX / max pain) as an optional next step instead of delivering it.
- It does not state who traded or why as fact. Attribution is either held back or explicitly labelled unconfirmed until filings or corporate actions (for example a convertible offering) are checked.

FAIL if the reply is a full daily report (sections on activity versus average, IV term structure, GEX or max pain, dark-pool baseline, a composite state), or if it asserts a buyer or seller identity or a directional intent (such as "institutions are accumulating") as fact.
