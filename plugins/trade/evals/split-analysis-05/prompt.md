---
description: "Routing split: analysis. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/analysis.md before any other commands/*.md file."
tags: [routing-split, analysis, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

AAPL财报出来了，给我推荐一个AAPL建仓leaps的策略
