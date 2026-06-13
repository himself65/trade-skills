---
type: Command Reference
title: /trade setup
description: Scaffold a personal knowledge OKF bundle (substack, X, writedowns) in a user-chosen directory.
tags: [command, setup, knowledge-base, scaffolding]
timestamp: 2026-06-13T01:18:31Z
---

# /trade setup

Scaffold a personal knowledge directory so the user can drop their own trading-related documents — substack posts, X / twitter threads, personal writedowns, screenshots, PDFs — that the `trade` skill loads alongside the curated pitfalls library and case studies.

External content (substack, X) is parsed into structured **YAML** at ingestion time via `/trade import`. User-authored writedowns stay as **markdown**.

## Workflow

### 1. Ask for the target directory (REQUIRED)

Always ask first — never assume. Use `AskUserQuestion` (or a plain conversational ask if more natural). Default suggestion: `./knowledge` relative to the current working directory.

Show the user the resolved absolute path before creating anything. If the path looks unsafe (resolves to `/`, `/usr`, `/etc`, a home directory root, or anywhere outside the cwd tree without explicit confirmation), refuse and ask again.

Accept either:

- A path relative to cwd (e.g., `./knowledge`, `notes/trade-kb`)
- An absolute path (e.g., `/Users/me/trade-knowledge`)

### 2. Create the directory structure

```
<target>/
  index.md                      # OKF navigable index + usage guide (from template)
  README.md                     # One-line stub pointing to index.md (from template)
  substack/
    .gitkeep
    raw/                        # User drops PDFs / screenshots here
      .gitkeep
    _template.yaml              # YAML schema for parsed substack posts
  twitter/                      # Covers X / twitter
    .gitkeep
    raw/
      .gitkeep
    _template.yaml              # YAML schema for parsed X posts / threads
  writedowns/
    .gitkeep
    _template.md                # Markdown template — user authors directly
```

**Idempotency rules:**

- If a file already exists, **do not overwrite**. Skip silently.
- If a directory already exists, ensure templates and `.gitkeep` files are present.
- After running, list which files were created vs skipped.

### 3. Write the templates

Read each template file from `references/commands/templates/` of this skill and write it to the corresponding location in the user's knowledge tree:

| Source (in skill) | Destination (in user's knowledge dir) |
|---|---|
| `references/commands/templates/knowledge-index.md` | `index.md` |
| `references/commands/templates/knowledge-README.md` | `README.md` |
| `references/commands/templates/substack-template.yaml` | `substack/_template.yaml` |
| `references/commands/templates/twitter-template.yaml` | `twitter/_template.yaml` |
| `references/commands/templates/writedown-template.md` | `writedowns/_template.md` |

### 4. Add the knowledge dir to gitignore

The knowledge dir is **always meant to stay local** — it holds personal trade notes, copied substack content, screenshots, and writedowns that should never be committed back to a shared repo. Make sure it's ignored everywhere.

**Always do both, in this order:**

**4a. Local project `.gitignore`.** If a `.gitignore` exists in the project root (resolve via `git rev-parse --show-toplevel`), check whether it already ignores the knowledge dir. If not, append:

```
# Personal trade knowledge scaffolded by `/trade setup` — never commit.
<knowledge-dir-relative-to-repo-root>/
```

If no git repo is detected, skip 4a silently.

**4b. User's global gitignore.** Resolve the path in this order:

1. `git config --global --get core.excludesfile` — if set, use that path.
2. Else `$XDG_CONFIG_HOME/git/ignore`.
3. Else `$HOME/.config/git/ignore` (the git default when `XDG_CONFIG_HOME` is unset).

Create the file (and parent directory) if it doesn't exist. **Do not** modify `git config` — when `core.excludesfile` is unset, git auto-uses `~/.config/git/ignore`, so writing the file is enough.

Check whether the file already contains a `knowledge/` (or equivalent) entry. If not, append:

```
# Personal trade knowledge scaffolded by `/trade setup` — never commit.
knowledge/
```

The global entry is intentionally unanchored so it matches a `knowledge/` directory at any depth in any project. If the user picked a non-default knowledge-dir name (e.g., `notes/trade-kb`), append both `knowledge/` (for default) and the chosen pattern.

**Idempotency:** never duplicate entries. Skip and report if already present.

Report to the user which files were edited (project `.gitignore`, global gitignore) and which were already correct.

### 5. Tell the user how to add content

After scaffolding, explain the two ingestion paths:

**External content (substack, X) — drop & import:**

1. Drop the raw artifact (PDF / screenshot / `.txt`) into `substack/raw/` or `twitter/raw/`.
2. Run `/trade import <file_path>` to parse it into structured YAML alongside the parsed-content folder.
3. Optional: move or delete the raw artifact after import. Nothing deletes raw files automatically.

**User-authored writedowns — direct markdown:**

1. Copy `writedowns/_template.md` → `writedowns/YYYY-MM-DD-<topic>.md`
2. Edit directly. No parsing needed.

### 6. If the knowledge dir is outside the current repo, record its path

`analysis` discovers the knowledge dir by, in order: `$TRADE_KNOWLEDGE_DIR` → a `knowledge_path:` line in the nearest `CLAUDE.md` → `./knowledge/`. The default `./knowledge/` only works when you run from the repo that holds it.

So **if the user chose a path outside the current working directory** (e.g. a separate private notes repo like `~/code/notes/knowledge`), tell them to make it discoverable from anywhere by **either**:

- adding `knowledge_path: <absolute-or-~-path>` to their `~/.claude/CLAUDE.md` (global) or a project `CLAUDE.md`, **or**
- exporting `TRADE_KNOWLEDGE_DIR=<path>` in their shell profile.

Offer to write the `~/.claude/CLAUDE.md` line for them (append-only, deduped). If the chosen path is the default `./knowledge/` inside the current repo, skip this step.

## Constraints

- **Always ask for the directory first.** Never assume a target path.
- **Never write outside the user-confirmed directory** — except the two gitignore files in step 4.
- **Never overwrite existing files.** Skip and report. Gitignore writes are append-only and deduped.
- **Never modify `git config`.** Step 4b creates `~/.config/git/ignore` if needed; git picks it up automatically.

Parsing rules (file types, field extraction, slug naming, idempotency) live in [`import.md`](import.md) — this command only handles scaffolding.
