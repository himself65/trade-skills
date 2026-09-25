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

If the cwd sits in a code repo, say so before the user picks: the default then puts the notes inside that repo, where step 4 would exclude them locally and leave them unversioned. A separate private notes repo, made discoverable in step 6, is the way to give them history.

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
    _template.yaml              # YAML schema for parsed substack posts
  twitter/                      # Covers X / twitter
    .gitkeep
    _template.yaml              # YAML schema for parsed X posts / threads
  writedowns/
    .gitkeep
    _template.md                # Markdown template — user authors directly
  corpora/
    .gitkeep                    # Durable home for crawled / scraped corpora
```

**No `raw/` inside the knowledge dir.** Source artifacts — the PDFs, screenshots and transcripts a digest is written from — are **evidence (L3)**, not judgement (L2). They land in a corpus directory, not beside the digest. This directory is auto-scanned every session and has to stay small enough to read; binaries in it are dead weight. If an existing knowledge dir still has `substack/raw/` or `twitter/raw/`, offer to move their contents to a corpus and drop the empty directories.

**On `corpora/`**: this is where anything *collected* lands — a crawled chat archive, a scraped post history, a downloaded filing set — so that it never goes to a temp directory that the OS purges on boot. Each corpus is its own subdirectory with a `MANIFEST.md`, an append-only `raw/`, a regenerable `derived/`, and the `scripts/` that produced it. See [`../data-collection.md`](../data-collection.md).

If the user expects large collections (tens of MB and up), **ask whether they want a separate repository instead** and point `$TRADE_CORPUS_DIR` at it — a bulk archive inside a notes repo makes the notes repo unusable. `corpora/` is the default, not a requirement.

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

### 4. Settle how git treats the knowledge dir

The knowledge dir is **private (L2) and meant to be version-tracked**. It belongs in a private repo the user commits to, usually a separate notes repo found via `knowledge_path` (see `SKILL.md` → Knowledge Architecture). That is also why [`import.md`](import.md) never commits: staging is the user's job. So setup writes **no blanket ignore rule** and **never touches the global gitignore**, because a global pattern cannot tell a notes repo from a code repo. The one thing to prevent is notes being committed to a repo that is *not* meant to hold them. Decide that from the repo that contains the **target**, never from the cwd's repo.

**4a. Classify the host repo.** Find it with `git -C <target> rev-parse --show-toplevel`, then:

| Host repo | Action |
|---|---|
| **None**: the target is in no git repo | Write nothing. Tell the user the notes are unversioned, and that `git init` plus a **private** remote gives them history and a backup. That is their call, not setup's. |
| **Meant to hold the notes**: a private notes repo | Write nothing, then confirm no rule hides the dir (4c). |
| **Not meant to hold them**: a code repo, a work repo, a public repo, a clone of this plugin | Exclude the target in that clone only (4b). |

When there is a host repo, **ask** which of the last two it is. Never infer it silently. Show the repo root and its `origin` remote so the user can answer. Recommend *meant to hold the notes* when the target is the repo root itself, and *not meant* when the repo is plainly code (a package manifest at its root, or this plugin's own repo). If the user picks *meant to hold the notes* and the remote is public (for a GitHub remote, `gh repo view <owner>/<repo> --json visibility`), say so plainly: L2 is private by definition, and a single `paid` or `closed-community` corpus under `corpora/` makes the whole repo private ([`../data-collection.md`](../data-collection.md)). Never change a repo's visibility yourself.

**4b. Not meant to hold them → that clone's `.git/info/exclude`.** This is git's per-clone ignore file. It is never committed, so it adds nothing to the diff of a repo that may not be the user's, and linked worktrees share it. Resolve it with `git -C <target> rev-parse --path-format=absolute --git-path info/exclude` (without `--path-format=absolute` the result is relative to `<target>`). Create the file and its `info/` directory if missing, then append an entry **anchored** at the repo root, so it matches this directory and no other `knowledge/` in the repo:

```
# Personal trade knowledge (/trade setup): this clone only, never committed.
/<target-relative-to-repo-root>/
```

- **Skip the write** if `git -C <target> check-ignore -q --no-index -- index.md` already succeeds. A clone of this plugin, for instance, ignores `knowledge/` in its own `.gitignore`. Report the rule that covers it (`check-ignore -v`).
- **If `git -C <repo-root> ls-files -- <target-relative-to-repo-root>` lists anything**, notes are already committed there, and an ignore rule does not untrack files. Say so and show `git rm -r --cached -- <path>`, which keeps the files on disk. If those commits were pushed, the notes stay in the remote's history until that history is rewritten. Both steps are the user's decision, so run neither.
- Tell the user the notes are now unversioned, and that a separate private repo plus step 6 is how to give them history.

**4c. Meant to hold them → confirm nothing hides the dir.** A stray ignore rule fails silently here. Files git already tracks keep showing their edits, but a **new** note never appears in `git status` and `git add -A` skips it, so the repo looks healthy while new notes never reach a commit. Test the rules directly against files setup just scaffolded:

```
git -C <target> check-ignore -v --no-index -- index.md writedowns/_template.md corpora/.gitkeep
```

Keep `--no-index`: without it, `check-ignore` skips tracked files. No output means nothing hides the dir. Otherwise each line names the rule as `<file>:<line>:<pattern>`. If that rule is an old setup entry, handle it per 4d. If not, the user wrote it: report it and leave the fix to them.

**4d. Remove what older versions wrote.** Versions up to v2.15.0 appended entries under the comment ``# Personal trade knowledge scaffolded by `/trade setup` — never commit.`` to two files:

- **The global gitignore**: an unanchored `knowledge/`, plus the chosen path for a non-default name. It hides every directory named `knowledge` in every repo on the machine, including a notes repo meant to track one. Check for it whatever 4a decided. Resolve the file as `git config --global --get core.excludesfile`, else `$XDG_CONFIG_HOME/git/ignore`, else `~/.config/git/ignore`.
- **The `.gitignore` of whichever repo setup ran in**. It only does harm in a repo meant to hold the notes, where 4c surfaces it. In a code repo it does the right job, so leave it.

When an entry does harm, explain its effect and **offer** to delete that comment and the pattern lines setup wrote directly beneath it, and nothing else. Delete only if the user says yes, and never add anything to the global file.

Report what was written, what was already correct, and what was left to the user.

### 5. Tell the user how to add content

After scaffolding, explain the two ingestion paths:

**External content (substack, X, research) — import:**

1. Run `/trade import <file_path | url>` on the PDF, screenshot, text file or link, wherever it sits. There is no drop folder.
2. A clean substack or X post is parsed into structured YAML in `substack/` or `twitter/`. Anything that has to be read and synthesized (a research report, an article) becomes a digest in `writedowns/`.
3. The source file is evidence (L3). It is filed in a corpus (`$TRADE_CORPUS_DIR` if set, else `corpora/`) rather than beside the parsed file, and the parsed file records where. Nothing deletes it.

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
- **Never write outside the user-confirmed directory**, except the host clone's `.git/info/exclude` (4b) and deleting old setup entries the user agreed to remove (4d).
- **Never overwrite existing files.** Skip and report. The `info/exclude` write is append-only and deduped.
- **Never write the global gitignore, and never modify `git config`.** A global pattern hides the knowledge dir in the one repo meant to track it.
- **Never commit, untrack files, or change a repo's visibility.** Report what needs doing and leave it to the user.

Parsing rules (file types, field extraction, slug naming, idempotency) live in [`import.md`](import.md) — this command only handles scaffolding.
