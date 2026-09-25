#!/usr/bin/env bash
# Seeds ./knowledge/, the default personal knowledge dir the analysis preflight
# scans, with the user's own SNOW print review (should be loaded) and an L3
# corpus whose filenames also match "snow" (must be skipped). The fixture is
# stored as kb/ because the repo .gitignore ignores any knowledge/ directory.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
mkdir -p knowledge
cp -R "$here/kb/." knowledge/
