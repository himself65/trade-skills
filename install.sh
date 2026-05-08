#!/usr/bin/env bash
# Symlink every skills/<name>/ into ~/.claude/skills/<name>.
# Idempotent — safe to re-run when adding a new skill.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"
TARGET_ROOT="$HOME/.claude/skills"

mkdir -p "$TARGET_ROOT"

for skill_path in "$SKILLS_DIR"/*/; do
  skill_name="$(basename "$skill_path")"
  link_path="$TARGET_ROOT/$skill_name"

  if [[ -L "$link_path" ]]; then
    current_target="$(readlink "$link_path")"
    if [[ "$current_target" == "${skill_path%/}" ]]; then
      echo "✓ $skill_name (already linked)"
      continue
    fi
    echo "↻ $skill_name (re-linking, was → $current_target)"
    rm "$link_path"
  elif [[ -e "$link_path" ]]; then
    echo "✗ $skill_name: $link_path exists and is not a symlink — skipping"
    continue
  fi

  ln -s "${skill_path%/}" "$link_path"
  echo "→ $skill_name → $link_path"
done

echo ""
echo "Installed skills:"
ls -la "$TARGET_ROOT" | grep -E '^l' | awk '{print "  " $9 " " $10 " " $11}'
