# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal options trading Claude Code plugin marketplace. Contains one plugin (`trade`) with a **single skill (`trade`) that exposes three subcommands** via the impeccable-style routing pattern:

- `/trade setup` — asks the user where to scaffold a personal knowledge directory (default `./knowledge/`) and creates the substack / twitter / writedowns layout with templates
- `/trade import <file_path>` — parses one raw artifact (PDF, screenshot, text) into structured YAML inside the knowledge directory
- `/trade analysis [ticker | situation]` — default trade analysis flow. Triggered explicitly, or whenever the first argument doesn't match `setup` / `import` (so natural-language invocations like "analyze NVDA" route here)

## Repository structure

```
.claude-plugin/
  marketplace.json              # Marketplace listing — registers the trade plugin
plugins/
  trade/
    plugin.json                 # Plugin manifest
    skills/
      trade/
        SKILL.md                # Single skill — frontmatter, always-on context, Commands table, Routing rules
        README.md
        references/
          index.md              # OKF bundle root (README.md is a one-line stub)
          OKF.md                # Open Knowledge Format conformance & schema
          log.md                # Chronological change history (OKF reserved)
          strategies.md         # Always-relevant framework
          gamma-framework.md
          price-action-framework.md
          macro-framework.md    # Macro judgment pipeline + dashboard families + output modes
          unusual-whales.md     # Data Access tier 0 — direct UW access when subscribed (gate, endpoints, traps)
          overnight-futures-framework.md
          parent-order-flow-framework.md
          pitfalls/             # 32 trading pitfalls + index.md (one file per rule)
          ticker/               # Case studies (INTC, Mag-7, APP, NOK, TSEM, CBRS, SNOW, MDB, VIX, SATS, 6981, MU, NQ) + index.md
          commands/             # Subcommand reference files (impeccable pattern)
            setup.md            # /trade setup workflow
            import.md           # /trade import workflow
            report.md           # /trade report workflow (daily capital-flow read)
            analysis.md         # default analysis preflight + situation→reference map
            templates/          # Files copied into the user's knowledge dir by /trade setup
              knowledge-index.md
              knowledge-README.md
              substack-template.yaml
              twitter-template.yaml
              writedown-template.md
```

## How the skill works

The pattern is modeled on [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable):

1. **SKILL.md is the single entry point.** It carries the trigger description, the always-on context (Hard Rule, Response Rules, Core Principles, Structure-to-Regime matrix, Data Access), a Commands table, and Routing rules.
2. **Subcommand-specific instructions live in `references/commands/<name>.md`** and are lazy-loaded only when the user invokes that subcommand.
3. **Reference content (pitfalls, case studies, frameworks) is lazy-loaded** too — `analysis.md` carries the situation → reference map so the model only reads the specific pitfall / case study files the current question needs.

The `references/` tree is an **Open Knowledge Format (OKF) v0.1** bundle: every pitfall, case study, and framework is a typed markdown concept with YAML frontmatter (`type`, `title`, `description`, `tags`, `timestamp`), cross-linked into a graph and navigated via `index.md` (each directory keeps a one-line `README.md` stub for GitHub rendering). See `references/OKF.md` for the type vocabulary and schema; record notable additions in `references/log.md`.

### Routing rules (from SKILL.md)

1. No argument → render the Commands table as a menu.
2. First word matches `setup`, `import`, or `analysis` → load the matching `references/commands/<name>.md` and follow it.
3. First word doesn't match → default to `analysis`; load `references/commands/analysis.md` and treat the full input as the analysis target.

### SKILL.md frontmatter

`skill-lint` allows only these fields: `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility` — any other key (e.g. `version`, `user-invocable`, `argument-hint`) fails the lint. So keep the frontmatter to:

- `name` — must match the skill directory name; lowercase letters / digits / hyphens, ≤ 64 chars.
- `description` — the trigger definition (comprehensive list of phrases, not a summary). **Hard cap: 1024 characters** — `skill-lint` fails the build past it, so keep it tight.
- `metadata` — a string→string map (skill-lint requirement); used here to declare OKF conformance (`okf_version: "0.1"`, `okf_conformance: references/OKF.md`).

Version lives in `plugins/trade/plugin.json`, not in SKILL.md frontmatter.

## Adding to the knowledge base

> **Destination rule — decide first: *whose* knowledge is it?** First-party, reusable trading knowledge for *every* installer (a pitfall, a framework, a case study of the user's *own* trade) → the curated **`references/`** library (this repo, public). **Anything the user collected or shared from outside** (a substack/X post, a **macro/brokerage research report**, a KOL thread, **any third-party article or link they ask you to read / digest / save to the knowledge base**) → the **user's personal knowledge dir**, never `references/` — even when they say "our knowledge base." When unsure, ask.

### Curated, shared library (lives in this repo, ships to all installers)

- **New pitfall**: copy `plugins/trade/skills/trade/references/pitfalls/_template.md` → `pitfalls/NN-slug.md` (fill the OKF frontmatter — `type`, `title`, `description`, `tags`, `timestamp` — per `references/OKF.md`), then add a row to `pitfalls/index.md` and a dated entry to `references/log.md`. Also add the pitfall to the relevant situation row in `references/commands/analysis.md`.
- **New case study**: copy `plugins/trade/skills/trade/references/ticker/_template.md` → `ticker/<ticker>-YYYY-MM.md` (fill the OKF frontmatter), then add a row to `ticker/index.md` and a dated entry to `references/log.md`. Cross-link from `references/commands/analysis.md` if it pattern-matches a common situation.
- **Strategy update**: edit `references/strategies.md` directly — flat by design.
- **New subcommand**: add a row to the Commands table in `SKILL.md`, update the Routing rules if needed, and create `references/commands/<name>.md`.
- **Skill description tweak**: edit the YAML `description` field in `SKILL.md` frontmatter (controls what triggers the skill).

### User-private knowledge (lives in a user-chosen directory, default `./knowledge/`, never committed back to this repo)

- Set up by running `/trade setup` — asks for the target path, then scaffolds `<knowledge>/{substack,twitter,writedowns}/` with templates plus an `index.md` (OKF index, with a `README.md` stub). The user dir is itself an OKF bundle.
- `substack/` and `twitter/` each have a `raw/` subdir for source PDFs / screenshots; `/trade import <file_path>` parses raw artifacts into structured YAML.
- `writedowns/` holds user-authored markdown notes (no parsing needed) **and digests of shared external research** — when the user hands over a macro/brokerage report, article, or link to study or save to the knowledge base, `/trade import <file_path | url>` reads & synthesizes it into a `writedowns/YYYY-MM-DD-<topic>.md` digest (source attribution + not-verified caveat + bear case), in the user's language. See `references/commands/import.md`.
- The `analysis` flow auto-loads matching `.yaml` / `.md` files when relevant to the current trade question (it ignores `*/raw/` unless asked to ingest).
- Templates copied into the user's knowledge dir live under `plugins/trade/skills/trade/references/commands/templates/`.

## Plugin system

- `.claude-plugin/marketplace.json` — marketplace listing.
- `plugins/trade/plugin.json` — plugin manifest. The skill under `plugins/trade/skills/trade/` is auto-discovered via its `SKILL.md` frontmatter.

**Version bumps must touch both files.** `plugins/trade/plugin.json` is the source of truth, and `.claude-plugin/marketplace.json` mirrors it in **two** places — `metadata.version` and `plugins[0].version`. They drift silently otherwise: the release workflow only packages the skill directories, so a stale marketplace.json never appears in a release artifact, but it *is* what `npx plugins add himself65/trade-skills` reads off the default branch (v2.4.0 and v2.5.0 both shipped with it pinned at 2.3.0). CI enforces this — `himself65/skill-lint@v3` (3.1.0+) auto-detects `.claude-plugin/marketplace.json` and fails on version drift, so the existing `lint` job covers it with no extra config.

**Release is automatic — bumping the version in `plugin.json` *is* the release.** On every push to `main`, `.github/workflows/auto-tag.yml` reads `plugins/trade/plugin.json`; if no `vX.Y.Z` tag matches that version yet, it creates and pushes the tag, then calls `.github/workflows/release-skills.yml` to zip each skill and publish the GitHub release. It is idempotent — a push whose version is already tagged does nothing — and `workflow_dispatch` can backfill a release that was missed. Pushing a `vX.Y.Z` tag by hand still works and takes the same path.

The two workflows are wired via `workflow_call` rather than letting the tag push trigger the release, because **a tag pushed with `GITHUB_TOKEN` does not fire `on: push: tags`** — GitHub suppresses recursive workflow runs. Don't "simplify" that indirection away; the release would silently stop firing. (This is the failure the automation replaced: v2.7.0 merged to `main` and sat untagged, so the release page kept showing v2.6.0.)

Users install via:

```bash
npx plugins add himself65/trade-skills
```

When invoked as a plugin, the skill is namespaced. Since plugin and skill share the name `trade`, the invocation form is `/trade <subcommand>` (or `/trade:trade <subcommand>` if disambiguation is needed).

## Important constraints

- **No live trade execution.** Analysis is read-only. Staging draft orders via the IBKR MCP `create_order_instruction` (which only creates an instruction the user must review and transmit in IBKR) is permitted; never transmit a live order or claim one was filled. Equity/ETF only — multi-leg options cannot be staged and stay manual. Never generate code that places trades.
- **Market data priority — tier 0 + three tiers:** (0) **Unusual Whales, only when the user has a subscription** (`UNUSUAL_WHALES_API_KEY` resolves, or a UW MCP server is in the session) — first stop for options flow, dark pool, dealer GEX, IV rank, intraday net-premium ticks and multi-leg packages; it is the upstream source behind the Funda options fields. See `plugins/trade/skills/trade/references/unusual-whales.md` for the availability gate, the required `UW-CLIENT-API-ID: 100001` header, the endpoint whitelist, and the entitlement gaps (VIX term structure, congress, futures are **not** on this plan). No key → the tier does not exist; fall back and say which proxy the read used. Then: (1) TradingView MCP (`finance-data-providers:tradingview-mcp` skill, bundled headless [tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) server) FIRST for quotes, TA readouts, screeners, futures/夜盘, extended hours, unusual options activity. (2) TradingView desktop reader (`finance-data-providers:tradingview-reader` skill) for options chains **with greeks**, per-strike IV skew, watchlists, alerts, chart screenshots. (3) Funda AI API (`finance-data-providers:funda-data` skill) for fundamentals, filings, transcripts, analyst estimates, options flow/GEX, supply chain, sentiment, Polymarket, congressional trades, economics, etc. Do not substitute yfinance, web search, or guesses.
