---
description: "Routing split: report. rule 2. Source: synthesized to fill a thin route."
expected_outcome: "Loads references/commands/report.md before any other commands/*.md file (the capital-flow exception or rule 2)."
tags: [routing-split, report, synth]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade report MU SNDK WDC
