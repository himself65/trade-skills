---
type: regex
target: trace
pattern: '"file_path"\s*:\s*"[^"]*references/commands/'
match: not_contains
weight: 2
---

Routing rule 1: no argument means the menu, so no commands/*.md file is loaded.
