---
description: "Routing split: daily-lookup. one contract cluster. Lookup or analysis?. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/daily.md first and treats the question as a one-print lookup: answers about that print, then offers the full daily ladder instead of running it."
tags: [routing-split, daily-lookup, real, judgment-call]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade NVDA jan 27为什么这么多200c，这是建仓吗
