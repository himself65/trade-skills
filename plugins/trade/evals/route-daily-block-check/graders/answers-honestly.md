---
type: llm
weight: 2
---

Context: the user asked "NBIS 今天有没有大单" (did NBIS have any big block orders today?). No market-data source (Unusual Whales, Funda, TradingView) was connected in this session, so no real data could be pulled.

PASS if all of these hold:
- The reply is written in Chinese.
- Its opening line answers the literal question directly. Here that means saying it cannot tell yet without data.
- It names the data source the read depends on (Unusual Whales, or a Funda / TradingView fallback), or says that none is connected.
- It presents no NBIS figures for today (premium dollars, block sizes, trade prices, volume multiples, IV levels) as if they had been observed.

FAIL if it asserts that big orders did or did not happen today, quotes NBIS figures for today as data, opens with general explanation instead of the answer, or is mainly in English.
