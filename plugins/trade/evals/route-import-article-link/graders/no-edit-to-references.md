---
type: tool_used
tool: Edit
input_match: '"file_path"\s*:\s*"[^"]*/references/'
min: 0
max: 0
---

No Edit to references/, for example appending the digest to references/log.md or index.md. file_exists cannot see edits to existing files, so this check covers them.
