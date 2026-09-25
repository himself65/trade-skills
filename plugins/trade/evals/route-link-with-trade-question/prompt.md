---
description: Control for the ingestion exception. A link sent along with a live trade question is still a trade analysis, so nothing gets imported or written.
expected_outcome: Loads references/commands/analysis.md; engages the call-buying decision (vega side, catalyst, conviction or an alternative structure); says the link could not be read or asks for its text; writes no file.
tags: [routing, analysis, control]
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

看到这篇说 NBIS Q3 算力订单要大超预期：https://research.example.com/notes/2026-09-23-nbis-q3-preview

我现在该不该买 11 月的 260 call？
