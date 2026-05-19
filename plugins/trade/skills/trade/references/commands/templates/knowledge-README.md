# Personal Trade Knowledge

This directory holds **your own** trading research and notes. It sits alongside the curated `trade` skill library (pitfalls + case studies + frameworks) but is owned and edited entirely by you.

The `trade` skill will automatically scan this directory for context that matches the current ticker, theme, or trade question. Filenames matter — put the ticker, author handle, or topic in the filename so the model can match.

## Two ingestion paths

### External content (substack, X) — drop & import

External posts usually start life as a **PDF export** or a **screenshot**. The flow:

1. Drop the raw artifact in `substack/raw/` or `twitter/raw/`. Supported: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.txt`, or a copy-pasted text file.
2. Run `/trade:trade-import <file_path>` (or ask in natural language: "import `substack/raw/anonresearch-nvda.pdf`").
3. The `trade-import` skill reads the artifact, extracts fields per `_template.yaml`, and writes a structured YAML alongside the raw folder. Example output: `substack/anonresearch-nvda-thesis.yaml`.
4. The raw artifact is never modified or deleted. Move or remove it yourself if you want to.

### User-authored writedowns — direct markdown

Writedowns are your own notes (trade journal, thesis docs, channel-check summaries, post-mortems). You write them yourself, no parsing needed.

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

1. Reads this `README.md` (the index) if it exists.
2. Skims subdirectory filenames for matches against the current ticker / theme.
3. Loads matched files — YAML for parsed external content, markdown for writedowns.

User documents **augment** the curated library, they don't replace it. Pitfalls remain authoritative for framework rules; your knowledge adds primary sources and personal context.

## Git tracking

Up to you. Common patterns:

- **Track everything.** Useful if you want versioned notes.
- **Gitignore `knowledge/`.** Useful if you want private notes that never leave your machine.
- **Track parsed YAML, gitignore `raw/`.** Mixed approach if raw artifacts are large or include copyrighted material.

A reasonable `.gitignore` snippet:

```
knowledge/*/raw/
```

## Re-running setup

Running `/trade:trade-setup` again is safe — it never overwrites existing files. It will only fill in missing scaffolding (subdirectories, templates, this README).
