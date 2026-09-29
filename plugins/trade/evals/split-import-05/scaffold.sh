#!/usr/bin/env bash
# Puts the attachment the prompt @-mentions into the run workspace. The real
# prompt pointed at ~/Downloads; the fixture is a short stand-in.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
cp "$here/fixtures/deep-aidc-power.pdf" .
