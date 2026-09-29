---
type: regex
target: trace
pattern: '^(?:(?!"file_path"\s*:\s*"[^"]*references/commands/)[\s\S])*"file_path"\s*:\s*"[^"]*references/commands/daily\.md"'
weight: 2
---

Routing: the first commands/*.md file Read is daily.md. Reading another commands file first counts as a misroute even if daily.md is read later.
