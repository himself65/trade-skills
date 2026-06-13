---
type: Command Reference
title: "/trade import <file_path>"
description: Parse one raw artifact (PDF, image, text) into a structured knowledge file in the user's knowledge bundle.
tags: [command, import, parsing, knowledge-base]
timestamp: 2026-06-13T01:18:31Z
---

# /trade import &lt;file_path&gt;

Import one raw trading-knowledge artifact (PDF, image, screenshot, text) into the user's personal knowledge directory as structured YAML. Detects whether the artifact is a substack post or an X / twitter post / thread, parses the content per the matching template, and writes a new YAML file alongside the parsed-content folder.

## Workflow

### 1. Resolve the source file

The argument is a path to a single raw artifact. Accept:

- Absolute paths
- Paths relative to cwd
- Paths relative to the knowledge dir (e.g., `substack/raw/foo.pdf`)

Verify the file exists and is a supported type. Supported extensions:

| Type | Extensions | Read with |
|---|---|---|
| PDF | `.pdf` | `Read` tool (use `pages` arg if >10 pages) |
| Image | `.png`, `.jpg`, `.jpeg`, `.webp` | `Read` tool |
| Text | `.txt`, `.md` | `Read` tool |

If the file doesn't exist or the type isn't supported, stop and report — do not guess.

### 2. Locate the knowledge directory

Find the user's knowledge tree by checking, in order:

1. If the source path is inside a recognizable `*/{substack,twitter}/raw/` subtree, walk up to that knowledge root.
2. Otherwise, check `./knowledge/` in the cwd.
3. Otherwise, walk up from cwd looking for a directory containing `index.md` (or a legacy `README.md`) with `# Personal Trade Knowledge` as the heading.
4. If none found, stop and tell the user to run `/trade setup` first (or pass `--knowledge-dir=<path>` — accept this as an optional inline flag if the user provides it).

### 3. Detect content kind

Decide whether the artifact is a substack post or an X / twitter post / thread.

**Strong signals (use without asking):**

- Path contains `substack/raw/` → substack
- Path contains `twitter/raw/` → twitter
- URL visible in artifact starts with `https://*.substack.com` → substack
- URL visible in artifact starts with `https://(twitter|x).com` → twitter

**Inference from content (if signals are absent):**

- Long-form (>500 words), paragraphed prose, byline, "Subscribe" CTA → substack
- Short numbered posts, @handle visible, like/retweet counts, "Quote", "Reply" UI → twitter

**Ambiguous → ask the user.** Present the two options (and "other / cancel") via `AskUserQuestion`. Never silently guess on ambiguous input.

### 4. Read and parse

Read the file with the `Read` tool. Then extract every field defined in the matching template:

- Substack → `<knowledge>/substack/_template.yaml`
- X / twitter → `<knowledge>/twitter/_template.yaml`

Field rules:

- **Required fields** (`author`/`handle`, `title`/`posts`, `date`, `tickers`, `body`/`posts`): fill from the source. If a required field truly isn't present, set `null` and note in your post-import summary which fields you couldn't extract.
- **Optional fields**: `null` if not in the source. Do not invent.
- **Tickers**: lowercase, comma-separated string, includes every ticker mentioned in the body.
- **Body / posts text**: verbatim from source. Drop nav, ads, paywall stubs, footer, UI chrome. Preserve paragraph breaks. Use YAML `|` block scalar for multi-line strings.
- **Media description**: if charts / screenshots are embedded, describe what they show in plain English. The model can't recall the image later from a YAML file.
- **Provenance**: always fill `raw_artifact:` with the source path (relative to the knowledge root) and `ingested_at:` with today's date in `YYYY-MM-DD`.

### 5. Choose the output path

Derive a slug from author/handle + a short title or topic, kebab-case, lowercase, ASCII.

| Kind | Path | Example |
|---|---|---|
| substack | `<knowledge>/substack/<author-slug>-<title-slug>.yaml` | `substack/anonresearch-nvda-thesis.yaml` |
| twitter | `<knowledge>/twitter/<handle-slug>-<topic-slug>.yaml` | `twitter/unusual_whales-nvda-gex-pin.yaml` |

If a file at the target path already exists, do **not** overwrite. Append a numeric suffix (`-2`, `-3`, …) and report the rename, or ask whether to skip / overwrite — never silently overwrite.

### 6. Write the YAML

Write the parsed YAML. Validate it's valid YAML 1.2. Common gotchas:

- Multi-line strings: use `|` (preserves newlines) or `|-` (strips trailing newline). Don't use `>` for body text — it folds newlines.
- Strings with `:` or leading `-`: quote them.
- Empty lists / nulls: `[]` and `null`, not blank.

### 7. Summarize

Report to the user:

- The output file path
- Which fields were filled vs left `null`
- Any parsing concerns (multi-page PDF truncation, blurry image regions, ambiguous tickers)
- Suggested next step: review the YAML, fill `why_saved` / `my_take` / `related` if not done

Do **not** delete or move the raw artifact. The user manages that themselves.

## Constraints

- **One file per invocation.** Batch imports happen via multiple invocations — don't walk a directory.
- **Never modify the source file.** Read-only.
- **Never overwrite an existing YAML.** Suffix, skip, or ask.
- **Never invent data.** `null` for missing fields. Note unfilled required fields in the summary.
- **Stop and ask on ambiguous kind.** Do not guess substack vs twitter when signals are absent.
- **Refuse if no knowledge dir exists.** Direct the user to `/trade setup`.
