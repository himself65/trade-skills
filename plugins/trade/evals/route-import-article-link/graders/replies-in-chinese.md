---
type: regex
target: last_message
pattern: '[\u4e00-\u9fff]{8,}'
---

The reply mirrors the user's language (SKILL.md: chat replies mirror the user's language, message by message). Eight or more consecutive CJK characters means Chinese prose, while an English reply that quotes a term like 大单 does not qualify. This check is deterministic because a judge asked to weigh language alongside other conditions flips its verdicts.
