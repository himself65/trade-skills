---
description: "Routing split: daily-lookup. Source: synthesized to fill a thin route."
expected_outcome: "Loads references/commands/daily.md first and treats the question as a one-print lookup: answers about that print, then offers the full daily ladder instead of running it."
tags: [routing-split, daily-lookup, synth]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

What was that 2M-share MU block around 10:30?
