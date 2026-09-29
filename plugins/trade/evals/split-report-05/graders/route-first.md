---
type: regex
target: trace
pattern: '^(?:(?!"file_path"\s*:\s*"[^"]*references/commands/)[\s\S])*"file_path"\s*:\s*"[^"]*references/commands/report\.md"'
weight: 2
---

Routing: the first commands/*.md file Read is report.md. Reading another commands file first counts as a misroute even if report.md is read later.
