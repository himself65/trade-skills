---
type: Trading Pitfall
title: '"Priced in" is not binary — estimate the percentage'
description: Quantify the % of a news event already priced (reaction vs NPV) and size to the residual uncertainty, not nominal magnitude.
severity: MEDIUM
appliesTo: event, news-driven
tags: [priced-in, sizing]
timestamp: 2026-05-09T02:45:35Z
---

## "Priced in" is not binary — estimate the percentage

Events are partially priced in. Use "what % is priced in" framing rather than "is it priced in yes/no".

**Why it matters**: 70% priced in is very different from 100% priced in. The 30% residual uncertainty still drives multi-day price action.

**How to apply**:
- For any news event:
  - Estimate theoretical NPV of the news
  - Compare to actual price reaction
  - If reaction ≈ NPV × X%, then (100 - X)% is still unpriced
- Size positions to the residual uncertainty, not the nominal news magnitude
- Pre-earnings drift up of +5% with implied move ±7% means ~70% of expected beat is already in
