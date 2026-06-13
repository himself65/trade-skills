---
type: Specification
title: Open Knowledge Format (OKF) Conformance & Mapping
description: How this trade knowledge base maps to the Open Knowledge Format v0.1 — type vocabulary, frontmatter schema, and bundle conventions.
tags: [okf, conformance, schema, meta]
timestamp: 2026-06-13T00:00:00Z
---

# Open Knowledge Format (OKF) Conformance

This knowledge base conforms to **[Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)** — an open, vendor-neutral standard for portable, agent- and human-readable knowledge. An OKF bundle is a directory of markdown "concept" files, each carrying YAML frontmatter, cross-linked into a graph via relative markdown links, and navigated through reserved `index.md` files. No SDK, runtime, or proprietary account is required to produce or consume it.

Background: [How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/) (Google Cloud).

## What is the bundle?

The `references/` tree is the curated, shared OKF bundle that ships with this skill. The user-private knowledge directory scaffolded by [`/trade setup`](commands/setup.md) (default `./knowledge/`) is a second OKF bundle built on the same conventions. Both are plain markdown + YAML — version-controllable, renderable on GitHub, and parseable by any agent.

## Why OKF fits this repo

The skill was already built on the OKF design pattern before adopting the name:

- **Concept = file.** Each pitfall, case study, and framework is one markdown file; its path is its identity (URI).
- **Cross-linked graph.** Pitfalls ↔ case studies ↔ frameworks reference each other with relative markdown links.
- **Progressive disclosure.** `SKILL.md` → directory `index.md` → individual concepts, loaded lazily only when relevant. This *is* OKF's `index.md` navigation model.

Adopting OKF v0.1 formalizes this: it adds the OKF-standard frontmatter fields, the reserved `index.md` / `log.md` filenames, and this conformance contract.

## Frontmatter schema

Every concept file carries a YAML frontmatter block. OKF v0.1 requires only `type`; this repo additionally always sets OKF's recommended fields (`title`, `description`, `tags`, `timestamp`) plus domain-specific **extension fields**. OKF is minimally opinionated — producers may define their own content model, so the extension fields coexist with the standard ones.

| Field | OKF role | Set here | Notes |
|---|---|---|---|
| `type` | **required** | always | Concept type — see the vocabulary below |
| `title` | recommended | always | Human-readable title |
| `description` | recommended | always | One-line relevance summary; this is what an agent reads to decide whether to load the file |
| *(extension fields)* | producer-defined | varies | e.g. `severity`, `appliesTo` on pitfalls; `ticker`, `event`, `date`, `status`, `result`, `structures` on case studies |
| `tags` | recommended | always | YAML array, e.g. `[earnings, iv-crush]` |
| `timestamp` | recommended | always | ISO 8601 UTC — the document's last-updated time (sourced from git history) |
| `resource` | recommended | conditional | URL of the underlying real-world resource. Omitted for self-describing curated concepts; set on imported substack/X documents (their source `url`) |

**Field order** is: `type`, `title`, `description`, then extension fields, then `tags`, `timestamp` (and `resource` where present).

## Type vocabulary

| `type` | Concept | Location |
|---|---|---|
| `Trading Pitfall` | analytical-bias rule | `pitfalls/NN-*.md` |
| `Trade Case Study` | closed/in-progress trade post-mortem | `ticker/*.md` |
| `Framework` | always-relevant decision framework | `strategies.md`, `gamma-framework.md`, `price-action-framework.md` |
| `Command Reference` | subcommand workflow | `commands/*.md` |
| `Index` | directory navigation index | `index.md` (every directory) |
| `Changelog` | chronological change history | `log.md` |
| `Specification` | this document | `OKF.md` |
| `Writedown` | user-authored note | `<knowledge>/writedowns/*.md` |

The user-private substack/X artifacts stay as `.yaml` structured-data concepts (machine-extracted data is a valid OKF producer content model). Their fields map to OKF as: `source` → `type`, `title` → `title`, `url` → `resource`, `date` → `timestamp`, `tags` → `tags`. See [`commands/templates/substack-template.yaml`](commands/templates/substack-template.yaml).

## Bundle conventions

- **Identity = path.** A file's path is its concept URI. Links between concepts are relative markdown links (e.g. `../ticker/snow-2026-05.md`), forming the knowledge graph.
- **`index.md` is the canonical navigable index** (OKF reserved name). To preserve GitHub's directory-level rendering without duplicating content, each directory also keeps a one-line `README.md` stub that points to its `index.md`.
- **`log.md`** (OKF reserved name) records the knowledge base's chronological evolution — see [`log.md`](log.md).
- **Bundle entry point** is [`index.md`](index.md) at the `references/` root, which links out to every sub-area.
- **Portable.** The bundle ships as a git repo / tarball; nothing here depends on a specific cloud, model provider, or agent framework.

## Conformance checklist (new concept)

When adding a pitfall, case study, framework, or writedown:

- [ ] File has YAML frontmatter with at least `type`.
- [ ] `title`, `description`, `tags` (array), and `timestamp` (ISO 8601) are set.
- [ ] Extension fields for the type are filled (see `_template.md` in the directory).
- [ ] Cross-links to related concepts use relative markdown links.
- [ ] A row is added to the directory's `index.md`.
- [ ] A dated entry is added to [`log.md`](log.md).

## OKF spec & tooling

- **Spec, reference bundles, and tooling:** https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf
- **Announcement:** https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/
- **Lineage** OKF cites: Karpathy's LLM-wiki gist, Obsidian vaults, and the `AGENTS.md` / `CLAUDE.md` convention.
