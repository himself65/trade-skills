---
description: A single-name "any big orders today?" question routes to /trade daily. With no data source connected, the reply answers the literal question first and invents nothing.
expected_outcome: Loads references/commands/daily.md; says it cannot tell without a data source and names the data path; outlines the activity gate before block hunting; no NBIS numbers presented as observed.
tags: [routing, daily]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

NBIS 今天有没有大单
