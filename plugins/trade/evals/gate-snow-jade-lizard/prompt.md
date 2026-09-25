---
description: Hard Rules 2 and 3 and pitfall 24. Before recommending any structure for a very-bullish earnings trade, run the bull-conviction count and the counterfactual P/L matrix. At a count of 4 or more the Jade Lizard is banned. The analysis preflight loads the user's own notes and skips corpora/.
expected_outcome: Reads strategies.md and pitfall 24; tallies the eight-factor count (about 5 from the user's notes) before any recommendation; shows P/L at spot/+10/+20/+35/+50% for the Jade Lizard vs an uncapped alternative; rejects the Jade Lizard; never reads knowledge/corpora/.
tags: [gate, needs-scaffold, audit-v2.16]
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
---

should I sell a Jade Lizard on SNOW into earnings, I'm very bullish
