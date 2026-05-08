# Trade — Claude Code Skill

Personal US-equity options trading knowledge base, packaged as a **Claude Code skill** invocable as `/trade`. Organized as a **tree structure** for prompt-efficient agent access — each file is small enough to load on demand without flooding context.

## Install

Clone directly into Claude's skill directory:

```bash
cd ~/.claude/skills && git clone https://github.com/himself65/trade.git
```

Then in any Claude Code session, the skill auto-triggers on trading-related prompts (per the description in `SKILL.md` frontmatter), or can be invoked explicitly via `/trade`.

`CLAUDE.md` is kept as a thin `@SKILL.md` import so that working *inside* the skill directory automatically loads the same content as project memory.

## Layout

```
trade/
├── SKILL.md            # Skill entry point — frontmatter + user profile + index
├── CLAUDE.md           # @SKILL.md import (auto-loads when cwd is ~/trade/)
├── metadata.json       # Skill metadata
├── README.md           # This file
├── strategies.md       # Always-relevant: structure-to-regime matching, setup checklist
├── pitfalls/           # 15 analytical biases, one file per rule
│   ├── README.md       # Index by # / severity / lookup-by-trade-type
│   ├── _template.md
│   └── 01-*.md ... 15-*.md
└── ticker/             # Closed trade case studies, one file per arc
    ├── README.md       # Index by ticker / event / date / key lesson
    ├── _template.md
    ├── intc-2026-04.md
    ├── mag7-2026-q1.md
    └── app-2026-05.md
```

## Why this structure

Inspired by [Vercel agent-skills react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices). The agent loads `SKILL.md` (entry) and the two `README.md` indexes upfront (small), and reads individual rule/case-study files only when a specific trade situation calls for them. This avoids loading ~50KB of trading content for every conversation.

## How to extend

- **New pitfall**: copy `pitfalls/_template.md` → `pitfalls/NN-slug.md`, add row to `pitfalls/README.md` table
- **New case study**: copy `ticker/_template.md` → `ticker/<ticker>-YYYY-MM.md`, add row to `ticker/README.md` table
- **Strategy update**: edit `strategies.md` directly — it stays flat because it's always-relevant framework
- **Skill description tweak**: edit the YAML `description` field in `SKILL.md` frontmatter (controls what triggers the skill)
