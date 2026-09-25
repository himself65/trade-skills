---
type: Index
title: Personal Trade Knowledge — Index
description: Entry point for your private trade-knowledge OKF bundle — substack, X, and writedowns scanned alongside the curated library.
tags: [index, knowledge-base, personal]
timestamp: 2026-06-13T00:00:00Z
---

# Personal Trade Knowledge

This directory holds **your own** trading research and notes. It sits alongside the curated `trade` skill library (pitfalls + case studies + frameworks) but is owned and edited entirely by you.

It is an **Open Knowledge Format (OKF) bundle** — the same portable markdown + YAML convention the curated library uses (see the skill's `references/OKF.md`). The `trade` skill automatically scans this directory for context that matches the current ticker, theme, or trade question. Filenames matter — put the ticker, author handle, or topic in the filename so the model can match.

## Two ingestion paths

### External content (substack, X) — import

External posts usually arrive as a **PDF export**, a **screenshot**, or a **link**. The flow:

1. Run `/trade import <file_path>` on the file wherever it is — supported: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.txt` — or on a link (or ask in natural language: "import `~/Downloads/anonresearch-nvda.pdf`").
2. The `import` flow reads the artifact, extracts fields per `_template.yaml`, and writes a structured YAML here. Example output: `substack/anonresearch-nvda-thesis.yaml`.
3. A copy of the source file is kept in a corpus under `corpora/` (or `$TRADE_CORPUS_DIR`) so the YAML can be re-checked later. The original is never modified or deleted — remove it yourself if you want to.

Parsed YAML artifacts are kept as structured-data OKF concepts. Their fields map to the OKF standard set: `source` → `type`, `title` → `title`, `url` → `resource`, `date` → `timestamp`, `tags` → `tags`.

### User-authored writedowns — direct markdown

Writedowns are your own notes (trade journal, thesis docs, channel-check summaries, post-mortems). You write them yourself, no parsing needed — each is an OKF markdown concept with `type: Writedown` in its frontmatter.

1. Copy `writedowns/_template.md` → `writedowns/YYYY-MM-DD-<topic>.md`
2. Fill in the frontmatter and body
3. Commit / sync as you like

## Layout

| Folder | Contents | Format |
|---|---|---|
| `substack/` | Parsed substack posts | `.yaml` |
| `twitter/` | Parsed X / twitter posts and threads | `.yaml` |
| `writedowns/` | Your own notes and research digests | `.md` |
| `corpora/` | Source files and anything collected (crawls, scrapes, bulk pulls) — one directory per corpus with a `MANIFEST.md`; never auto-loaded | mixed |

## Naming convention

| Folder | Pattern | Example |
|---|---|---|
| `substack/` | `<author-slug>-<short-title-slug>.yaml` | `anonresearch-nvda-thesis.yaml` |
| `twitter/` | `<handle>-<topic-or-date>.yaml` | `unusual_whales-nvda-gex-pin.yaml` |
| `writedowns/` | `YYYY-MM-DD-<topic>.md` | `2026-05-15-cbrs-leg-management.md` |

Slugs are kebab-case, lowercase, ASCII only. If a document is ticker-specific, include the **ticker in lowercase** somewhere in the filename so the model can match on it.

## How the `trade` skill loads from here

When you ask a trade question, the model:

1. Locates this directory by resolving, in order: `$TRADE_KNOWLEDGE_DIR` → a `knowledge_path:` line in the nearest `CLAUDE.md` → `./knowledge/` in the current repo. (The first two let this dir live in a **different** repo and still be found from anywhere — see `/trade setup` step 6.)
2. Reads this `index.md` (the OKF index) if it exists.
3. Skims **every** subdir's filenames (substack, twitter, writedowns, and any curated module dir) for matches against the current ticker / theme, skipping `corpora/` and any legacy `*/raw/` folder.
4. Loads matched files — YAML for parsed external content, markdown for writedowns / module docs.

User documents **augment** the curated library, they don't replace it. Pitfalls remain authoritative for framework rules; your knowledge adds primary sources and personal context.

## Git tracking

This directory is private, and it is meant to be **version-tracked in a private repo**. Commit it like any other notes, so they get history and a backup. `/trade setup` never adds it to your global gitignore. What setup did depends on where this directory sits:

| Where this directory sits | What `/trade setup` did |
|---|---|
| In a private repo meant for your notes | Nothing to ignore. It checked that no ignore rule hides the directory. |
| Inside a repo that isn't meant to hold it (a code or public repo) | Added an entry for this path to that clone's `.git/info/exclude`, which is local and never committed. Your notes are unversioned there; a separate private repo, found via `knowledge_path`, gives them history. |
| In no git repo | Nothing. Run `git init` and add a **private** remote whenever you want history. |

**If a new note never shows up in `git status`**, an ignore rule is hiding it. Files git already tracks keep showing their edits, so the repo looks healthy while new notes never reach a commit. Find the rule:

```
git check-ignore -v --no-index <path/to/new-note.md>
```

Older versions of `/trade setup` wrote a `knowledge/` line to your global gitignore, under a comment starting `# Personal trade knowledge scaffolded by`. It hides every `knowledge/` directory in every repo. Delete it, or re-run setup and it will offer to.

**Keep the repo private, and keep bulk out of it.** A single `paid` or `closed-community` corpus in `corpora/` makes the whole repo private. A large corpus (tens of MB and up) belongs in its own repository: point `$TRADE_CORPUS_DIR` at it instead of growing your notes repo.

## Re-running setup

Running `/trade setup` again is safe — it never overwrites existing files. It fills in missing scaffolding (subdirectories, templates, this index) and re-runs the git check above, including the offer to remove an old global `knowledge/` entry.
