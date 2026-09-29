---
description: "Routing split: daily. delta re-run: resumes a session where /trade daily NBIS already ran. Source: synthesized to fill a thin route."
expected_outcome: "Loads references/commands/daily.md before any other commands/*.md file (the daily-read or single-name capital-flow exception)."
tags: [routing-split, daily, synth]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

现在呢
