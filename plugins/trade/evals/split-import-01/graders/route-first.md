---
type: regex
target: trace
pattern: '^(?:(?!"file_path"\s*:\s*"[^"]*references/commands/)[\s\S])*"file_path"\s*:\s*"[^"]*references/commands/import\.md"'
weight: 2
---

Routing: the first commands/*.md file Read is import.md. Reading another commands file first counts as a misroute even if import.md is read later.
