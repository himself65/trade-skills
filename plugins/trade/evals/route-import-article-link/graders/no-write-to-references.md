---
type: tool_used
tool: Write
input_match: '"file_path"\s*:\s*"[^"]*/references/'
min: 0
max: 0
---

No Write call targeted a references/ path, whether the workspace stand-in or the plugin's own copy (a denied attempt still counts). The match is anchored on file_path because the digest body may legitimately cross-link references/ pitfalls.
