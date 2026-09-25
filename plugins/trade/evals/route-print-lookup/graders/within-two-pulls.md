---
type: regex
target: mock_calls
pattern: '(?:"tool":"[^"]+"[\s\S]*?){3}'
match: not_contains
weight: 2
---

At most two data pulls. Each mocked call is one JSON line with exactly one "tool" key (quotes inside tool outputs are escaped), so three occurrences means a third pull.
