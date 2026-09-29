---
description: "Routing split: daily. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/daily.md before any other commands/*.md file (the daily-read or single-name capital-flow exception)."
tags: [routing-split, daily, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

NOK这几天有没有大单，IV有没有拉升？
