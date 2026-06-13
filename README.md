# Trade

> [!WARNING]
> This project is for educational and informational purposes only. Nothing here constitutes financial advice. Always do your own research and consult a qualified financial advisor before making investment decisions.

A personal Claude Code plugin marketplace housing one options-trading skill — backed by a curated [Open Knowledge Format (OKF)](plugins/trade/skills/trade/references/OKF.md) library of 25 pitfalls and case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX). Layout follows the [`himself65/finance-skills`](https://github.com/himself65/finance-skills) convention.

## Quick Start

### Claude Code — Install the plugin

```bash
npx plugins add himself65/trade-skills
```

### Claude Code — Install just the skill

```bash
npx skills add himself65/trade-skills
```

### Other agents

```bash
npx skills add himself65/trade-skills -a <agent-name>
```

### Local development install (from a clone)

```bash
git clone https://github.com/himself65/trade-skills.git ~/trade-skills
ln -s ~/trade-skills/plugins/trade/skills/trade ~/.claude/skills/trade
```

## Available Skills

### Trade (`trade`)

Multi-leg options trading assistant with concrete strikes, IV-aware structures, and probability-weighted scenarios.

| Skill | Description |
|---|---|
| [trade](plugins/trade/skills/trade/) | Options trading knowledge base — 25 pitfalls + case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX) + structure-to-regime framework. Lazy-loaded, OKF-conformant. |

## Open Knowledge Format

The skill's knowledge base is an **[Open Knowledge Format (OKF) v0.1](plugins/trade/skills/trade/references/OKF.md)** bundle — a portable, vendor-neutral graph of markdown concept files with YAML frontmatter, navigable via `index.md` and version-controlled alongside the code. Each pitfall, case study, and framework is a typed concept.

- [`references/OKF.md`](plugins/trade/skills/trade/references/OKF.md) — type vocabulary, frontmatter schema, and conformance contract
- [`references/index.md`](plugins/trade/skills/trade/references/index.md) — the bundle root / graph entry point
- [`references/log.md`](plugins/trade/skills/trade/references/log.md) — chronological change history

Learn more about OKF: [Google Cloud announcement](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/) · [spec & tooling](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf).

## License

MIT
