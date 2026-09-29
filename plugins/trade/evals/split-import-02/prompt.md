---
description: "Routing split: import. first word \"study\" is not a command; ingestion exception. Source: a prompt the user actually sent."
expected_outcome: "Loads references/commands/import.md before any other commands/*.md file (the ingestion exception or rule 2)."
tags: [routing-split, import, real]
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
---

/trade study https://www.zhihu.com/question/2070440887121864300/answer/2070854306874630802
