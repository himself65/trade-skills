---
type: regex
target: trace
pattern: '^(?:(?!"file_path"\s*:\s*"[^"]*references/commands/)[\s\S])*"file_path"\s*:\s*"[^"]*references/commands/setup\.md"'
weight: 2
---

Routing: the first commands/*.md file Read is setup.md. Reading another commands file first counts as a misroute even if setup.md is read later.
