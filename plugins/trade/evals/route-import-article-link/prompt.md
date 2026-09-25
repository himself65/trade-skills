---
description: A shared research link to save is an ingestion request. The digest is written in English to the personal knowledge dir that knowledge_path points at, never to the curated references/, even when the user says "our knowledge base".
expected_outcome: Loads references/commands/import.md; resolves the knowledge dir from knowledge_path in CLAUDE.md; writes notes/trade-knowledge/writedowns/YYYY-MM-DD-<slug>.md in English with attribution, a not-verified caveat and a bear case; touches nothing under references/; replies in Chinese with the path.
tags: [routing, import, needs-scaffold, needs-write, audit-v2.16]
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
---

这篇研报帮我读一下，存到我们的知识库里：https://research.example.com/notes/2026-09-22-hbm4-pricing-reset

链接要登录才能看，原文我贴在下面：

---

《HBM4 定价重置：2027 年长约的三个信号》
北辰研究 · 半导体组｜2026-09-22

核心观点：2027 年 HBM4 长约价格大概率比 2026 年低 8%–12%，而市场还在按"价格持平"给存储股定价。

一、供给端。三星 HBM4 12-Hi 预计四季度通过主要客户验证，2027 年三星的 HBM 供给份额有望从约 18% 回升到 30% 以上，行业格局从"一家独大"回到"三家比价"。

二、需求端。头部 GPU 客户 2027 年 HBM 采购量指引同比 +45%，低于 2026 年的 +80%；单颗加速器的 HBM 容量增速也在放缓（288GB → 384GB）。

三、价格。渠道调研显示，首批 2027 年 HBM4 报价比 2026 年长约低 8%–12%。传统 DRAM 合约价四季度环比 +3%–5%，但已经是连续第三个季度涨幅收窄。

结论：2027 年 HBM 毛利率可能从约 70% 回落到 60% 出头。存储链（MU、SK 海力士、三星）当前估值隐含 HBM 价格持平，下修风险尚未被定价。后续关注：MU 12 月中旬的 FQ1 业绩指引、三星 HBM4 验证公告、TrendForce 月度合约价。

风险提示：AI 资本开支再度加速；三星验证延期；HBM4E 提前放量带来结构性涨价。
