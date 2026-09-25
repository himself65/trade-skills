---
description: The premium-selling gate (pitfall 36). A high IV rank picks the vega side, but it does not approve a put sale. Whether the premium is worth selling is decided by the variance risk premium and by the breakeven loss probability under both vols.
expected_outcome: Reads pitfall 36; says IVR only picks the vega side; makes the answer conditional on implied vs subsequent realized vol and P(S_T < breakeven) under both, which need data this session does not have; does not approve on IVR alone.
tags: [gate, audit-v2.16]
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

AMD IV rank 85，我想卖 10/16 的 put 收租，行不行？
