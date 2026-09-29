---
description: "Routing split: daily. single-name 资金流向 → daily per the capital-flow exception (\"for a single name prefer daily\"). Source: synthesized to fill a thin route."
expected_outcome: "Loads references/commands/daily.md before any other commands/*.md file (the daily-read or single-name capital-flow exception)."
tags: [routing-split, daily, synth]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

NBIS 资金流向
