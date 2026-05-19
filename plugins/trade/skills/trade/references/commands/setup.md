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
  README.md                     # Index + usage guide (from template)
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
| `references/commands/templates/knowledge-README.md` | `README.md` |
| `references/commands/templates/substack-template.yaml` | `substack/_template.yaml` |
| `references/commands/templates/twitter-template.yaml` | `twitter/_template.yaml` |
| `references/commands/templates/writedown-template.md` | `writedowns/_template.md` |

### 4. Tell the user how to add content

After scaffolding, explain the two ingestion paths:

**External content (substack, X) — drop & import:**

1. Drop the raw artifact (PDF / screenshot / `.txt`) into `substack/raw/` or `twitter/raw/`.
2. Run `/trade import <file_path>` to parse it into structured YAML alongside the parsed-content folder.
3. Optional: move or delete the raw artifact after import. Nothing deletes raw files automatically.

**User-authored writedowns — direct markdown:**

1. Copy `writedowns/_template.md` → `writedowns/YYYY-MM-DD-<topic>.md`
2. Edit directly. No parsing needed.

## Constraints

- **Always ask for the directory first.** Never assume a target path.
- **Never write outside the user-confirmed directory.**
- **Never overwrite existing files.** Skip and report.

Parsing rules (file types, field extraction, slug naming, idempotency) live in [`import.md`](import.md) — this command only handles scaffolding.
