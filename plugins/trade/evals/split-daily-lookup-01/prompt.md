---
description: "Routing split: daily-lookup. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/daily.md first and treats the question as a one-print lookup: answers about that print, then offers the full daily ladder instead of running it."
tags: [routing-split, daily-lookup, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

nbis刚才的巨量成交是什么，看一下大单
