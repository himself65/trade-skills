---
description: "Routing split: import. no file → should ask for one. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/import.md before any other commands/*.md file (the ingestion exception or rule 2)."
tags: [routing-split, import, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade import
