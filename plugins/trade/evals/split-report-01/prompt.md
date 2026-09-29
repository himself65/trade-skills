---
description: "Routing split: report. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/report.md before any other commands/*.md file (the capital-flow exception or rule 2)."
tags: [routing-split, report, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade BE NBIS. 特别看一下大单
