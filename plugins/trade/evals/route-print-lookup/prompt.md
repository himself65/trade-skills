---
description: A question about one print is a lookup, not a state read. Answer it from the minute bars and the print itself in one or two pulls, then offer the full daily ladder rather than running it. Market data comes from a mocked unusual-whales server (mocks/), never the real API.
expected_outcome: Two mocked pulls (1m candles + dark pool, or option trades); names the 14:07 ET 1.85M-share qualified contingent trade inside the NBBO with no lit follow-through; holds who/why pending the corporate-action gate; offers the full daily read.
tags: [routing, daily, lookup, audit-v2.16]
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

NBIS 刚才那笔巨量成交是什么？
