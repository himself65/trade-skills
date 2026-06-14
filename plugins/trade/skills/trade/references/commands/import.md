---
type: Command Reference
title: "/trade import <file_path>"
description: Ingest one external item — a raw artifact (PDF, image, text) or a shared link/article — into the user's PERSONAL knowledge bundle (YAML for a clean platform post; a writedown digest for research). Never the curated references/ library.
tags: [command, import, parsing, digest, knowledge-base]
timestamp: 2026-06-14T00:00:00Z
---

# /trade import &lt;file_path | url&gt;

Ingest one external trading-knowledge item into the **user's personal knowledge directory** — two shapes:

- **A clean platform post** (a substack post, or an X / twitter post / thread), as a raw artifact *or* a link → parse per the matching template into **structured YAML** in `substack/` or `twitter/`.
- **Other external research** (a macro / brokerage report, a blog or WeChat article, a pasted thesis — anything you must *read and synthesize* rather than mechanically extract) → write a **writedown** markdown digest in `writedowns/`.

> **Destination — read first.** Output **always** lands in the user's personal knowledge dir (resolved the way `analysis` does: `$TRADE_KNOWLEDGE_DIR` → a `knowledge_path:` line in `CLAUDE.md` → `./knowledge/`). A third-party article digest is the *user's* collected research — it does **NOT** go in this repo's curated `references/` library, **even if the user says "our knowledge base."** `references/` is first-party content that ships to every installer; see the destination rule in `SKILL.md` → "Adding to the Knowledge Base." If you genuinely can't tell which is meant, ask before writing.

## Workflow

### 1. Resolve the source

The argument is a single item — a **file path** or a **URL / shared link**. Accept:

- Absolute paths; paths relative to cwd; paths relative to the knowledge dir (e.g., `substack/raw/foo.pdf`)
- A **URL** (substack / X / WeChat / blog / research link) — read it with the web reader (`finance-social-readers:opencli-reader`'s `web read`, or `WebFetch`). If the page is paywalled or unreadable, ask the user for a PDF / screenshot / paste instead.

For a file, verify it exists and is a supported type:

| Type | Extensions | Read with |
|---|---|---|
| PDF | `.pdf` | `Read` tool (use `pages` arg if >10 pages) |
| Image | `.png`, `.jpg`, `.jpeg`, `.webp` | `Read` tool |
| Text | `.txt`, `.md` | `Read` tool |

If a file doesn't exist or the type isn't supported, stop and report — do not guess.

### 2. Locate the knowledge directory

Find the user's knowledge tree by checking, in order:

1. If the source path is inside a recognizable `*/{substack,twitter}/raw/` subtree, walk up to that knowledge root.
2. Otherwise, check `./knowledge/` in the cwd.
3. Otherwise, walk up from cwd looking for a directory containing `index.md` (or a legacy `README.md`) with `# Personal Trade Knowledge` as the heading.
4. If none found, stop and tell the user to run `/trade setup` first (or pass `--knowledge-dir=<path>` — accept this as an optional inline flag if the user provides it).

### 3. Detect content kind

Decide among three kinds: **substack post**, **X / twitter post / thread**, or **research digest** (other external research → a writedown).

**Strong signals (use without asking):**

- Path contains `substack/raw/` or URL on `https://*.substack.com` → substack (YAML)
- Path contains `twitter/raw/` or URL on `https://(twitter|x).com` → twitter (YAML)

**Inference from content (if signals are absent):**

- Long-form (>500 words), paragraphed prose, byline, "Subscribe" CTA → substack (YAML)
- Short numbered posts, @handle visible, like/retweet counts, "Quote" / "Reply" UI → twitter (YAML)
- **Anything that isn't a clean substack/X post** — a macro or brokerage research report, a WeChat / blog article, a long thesis you must read and *synthesize* (distilling viewpoints, not extracting a post's fields) → **research digest → writedown** (markdown, not YAML). This is the default for "read this article and save its viewpoints."

**Ambiguous → ask the user.** Present the options (substack / twitter / research-writedown / cancel) via `AskUserQuestion`. Never silently guess on ambiguous input.

For the **research-digest** kind, skip the YAML steps (4 & 6) and follow [§ Research-digest path](#research-digest-path-writedown) below.

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
| research (digest) | `<knowledge>/writedowns/YYYY-MM-DD-<topic-slug>.md` | `writedowns/2026-06-14-warsh-ai-productivity-jcurve.md` |

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

## Research-digest path (writedown)

When step 3 classifies the item as **research** (not a clean substack/X post), don't force it into YAML — write a **writedown** that captures the *viewpoints*, not the layout.

1. **Read fully** (file or URL via the web reader). Distill the argument; don't translate verbatim.
2. **Output path**: `<knowledge>/writedowns/YYYY-MM-DD-<topic-slug>.md` (kebab-case, lowercase, ASCII). Never overwrite — suffix / ask.
3. **Frontmatter** (per `<knowledge>/writedowns/_template.md`): `source: writedown`, `date`, `tickers` (lowercase, comma-separated — the names the thesis bears on, for the `analysis` scan to match), `tags`, `kind: research`, `status: watching`.
4. **Write in the user's language** (match the existing writedowns — these are typically Chinese).
5. **Structure**: source attribution + a **"data is the source's, not independently verified"** caveat → TL;DR (the one-sentence bet + summary) → the argument (faithful to the source) → **signposts** (how to verify it plays out) → **bear case / what would falsify it** (always include — the user builds both sides) → trading implications **clearly marked as your synthesis, not the source's claims** → related cross-links (to `references/` pitfalls/case-studies and other local knowledge).
6. **Index**: add a one-line entry to the knowledge dir's `README.md` (or `index.md`) under a "Macro thesis digests" / research section, mirroring existing entries.
7. **Summarize** to the user: the output path, the core viewpoints captured, and that data points are the source's (unverified).

Do **not** commit — the personal knowledge repo is version-tracked on purpose; leave staging to the user.

## Constraints

- **One file per invocation.** Batch imports happen via multiple invocations — don't walk a directory.
- **Output to the personal knowledge dir ONLY — never the curated `references/`.** A third-party article/digest is the user's collected research, regardless of "our knowledge base" phrasing. See the destination callout at the top.
- **Never modify the source file.** Read-only.
- **Never overwrite an existing file.** Suffix, skip, or ask.
- **Never invent data.** `null` for missing YAML fields; for digests, attribute figures to the source and flag them not-independently-verified. Note unfilled required fields in the summary.
- **Stop and ask on ambiguous kind.** Don't guess among substack / twitter / research-writedown when signals are absent.
- **Refuse if no knowledge dir exists.** Direct the user to `/trade setup`.
