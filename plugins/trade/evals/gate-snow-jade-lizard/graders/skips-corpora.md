---
type: tool_used
tool: Read
input_match: '"file_path"\s*:\s*"[^"]*/corpora/'
min: 0
max: 0
---

corpora/ is L3 evidence, queried on demand and never scanned. Its "snow" filenames tempt a preflight that skims every subdirectory, which is the fossil v2.16.0 removed.
