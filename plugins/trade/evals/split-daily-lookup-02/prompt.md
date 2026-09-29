---
description: "Routing split: daily-lookup. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/daily.md first and treats the question as a one-print lookup: answers about that print, then offers the full daily ladder instead of running it."
tags: [routing-split, daily-lookup, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade NBIS 今天有Jan 2027的大单，这是在做多波动率吗？
