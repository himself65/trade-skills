---
description: "Routing split: analysis. link + ticker, no \"save\". Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/analysis.md before any other commands/*.md file."
tags: [routing-split, analysis, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade https://x.com/illyquid/status/2102564233125019762 IONQ
