# Trade Skills

Personal Claude Code skills repository for active US-equity options trading. Currently houses one skill — `trade` — with the catalog structure ready for additional skills (e.g., screening, swing-trade, portfolio review) over time.

Layout follows the [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) convention: each skill is a self-contained directory under `skills/<name>/` with its own `SKILL.md`, content tree, and metadata.

## Layout

```
trade/                          (repo root — workspace, not a skill itself)
├── README.md                   (this file — repo-level overview)
├── install.sh                  (symlinks every skills/<name> into ~/.claude/skills/)
└── skills/
    └── trade/                  (the actual skill payload)
        ├── SKILL.md            (entry point, frontmatter)
        ├── CLAUDE.md           (@SKILL.md import for project-memory mode)
        ├── README.md           (skill-level docs)
        ├── metadata.json
        ├── strategies.md
        ├── pitfalls/           (15 lazy-loaded rules)
        └── ticker/             (case studies)
```

## Install

```bash
git clone https://github.com/himself65/trade.git ~/trade
cd ~/trade && ./install.sh
```

`install.sh` symlinks every `skills/<name>/` into `~/.claude/skills/<name>` so each skill becomes auto-discoverable by Claude Code on its description trigger.

## Adding a new skill

1. `mkdir skills/<new-skill>` and add `SKILL.md` with frontmatter
2. Re-run `./install.sh` — it picks up new `skills/*` automatically

## Why this structure

- **Single repo, many skills**: keeps related trading skills versioned together
- **`skills/<name>/` mirrors `~/.claude/skills/<name>/`**: 1:1 correspondence between repo layout and where skills get installed
- **Self-contained skill payloads**: each `skills/<name>/` directory can be symlinked or copied independently
- **Future-proof**: matches the Vercel agent-skills convention, lowest friction if we ever publish or share skills upstream
