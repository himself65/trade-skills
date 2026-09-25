---
type: file_exists
path: '**/notes/trade-knowledge/writedowns/*.md'
weight: 2
---

The digest was created in the knowledge dir that knowledge_path names. Creating ./knowledge/ instead means the resolution order was skipped; stopping at "run /trade setup" means the dir was never found.
