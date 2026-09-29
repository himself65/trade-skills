---
description: "Routing split: daily. 大单 state read + \"worth following\" decision. I labelled daily. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/daily.md before any other commands/*.md file (the daily-read or single-name capital-flow exception)."
tags: [routing-split, daily, real, judgment-call]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade LQDA 有什么大单是否值得跟
