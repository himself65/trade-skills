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

### External content (substack, X) — drop & import

External posts usually start life as a **PDF export** or a **screenshot**. The flow:

1. Drop the raw artifact in `substack/raw/` or `twitter/raw/`. Supported: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.txt`, or a copy-pasted text file.
2. Run `/trade import <file_path>` (or ask in natural language: "import `substack/raw/anonresearch-nvda.pdf`").
3. The `import` flow reads the artifact, extracts fields per `_template.yaml`, and writes a structured YAML alongside the raw folder. Example output: `substack/anonresearch-nvda-thesis.yaml`.
4. The raw artifact is never modified or deleted. Move or remove it yourself if you want to.

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
| `substack/raw/` | Original PDFs / screenshots / clippings | binary / text |
| `twitter/` | Parsed X / twitter posts and threads | `.yaml` |
| `twitter/raw/` | Original screenshots / PDFs | binary / text |
| `writedowns/` | Your own notes | `.md` |

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
3. Skims **every** subdir's filenames (substack, twitter, writedowns, and any curated module dir) for matches against the current ticker / theme, ignoring `*/raw/`.
4. Loads matched files — YAML for parsed external content, markdown for writedowns / module docs.

User documents **augment** the curated library, they don't replace it. Pitfalls remain authoritative for framework rules; your knowledge adds primary sources and personal context.

## Git tracking

`/trade setup` adds `knowledge/` to both your project `.gitignore` and your global gitignore (`~/.config/git/ignore`) so it never gets committed by accident. This is the safe default — your trade notes stay on your machine.

If you actually want to version-track this directory in a specific repo, remove the entry from that repo's `.gitignore` (the global one will still keep it out of every other repo). If you want a partial setup — track parsed YAML but exclude the large raw artifacts — replace the project `.gitignore` entry with:

```
knowledge/*/raw/
```

## Re-running setup

Running `/trade setup` again is safe — it never overwrites existing files. It will only fill in missing scaffolding (subdirectories, templates, this index, gitignore entries).
