---
description: "Routing split: menu. no argument → commands menu. Source: a prompt the user actually sent."
expected_outcome: "Reads no commands/*.md file and renders the commands table as a menu."
tags: [routing-split, menu, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade
