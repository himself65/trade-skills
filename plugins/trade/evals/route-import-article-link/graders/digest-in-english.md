---
type: regex
target: trace
pattern: '"file_path"\s*:\s*"[^"]*notes/trade-knowledge/writedowns/[^"]*\.md"\s*,\s*"content"\s*:\s*"(?:[^"\\]|\\.)*?[\u4e00-\u9fff]{12,}'
match: not_contains
---

The digest written to writedowns/ is English (knowledge-dir files are git content). The check looks for any run of 12 or more consecutive CJK characters inside the Write call's content. That run length is Chinese prose; the source's title and publisher, kept as-is, stay under it. The regex runs over the whole trace because an llm judge on the trace sees only the first and last 12 messages, and the Write call usually falls in the elided middle.
