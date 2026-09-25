#!/usr/bin/env bash
# Seeds the run workspace with a stand-in trade-skills checkout: a writable
# plugins/trade/skills/trade/references/ (the curated library a digest must
# never land in) and a CLAUDE.md whose knowledge_path points at a personal
# knowledge dir outside ./knowledge/, so only the documented resolution order
# ($TRADE_KNOWLEDGE_DIR -> knowledge_path -> ./knowledge/) finds it.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
cp -R "$here/workspace/." .
printf '\nknowledge_path: %s\n' "$PWD/notes/trade-knowledge" >> CLAUDE.md
