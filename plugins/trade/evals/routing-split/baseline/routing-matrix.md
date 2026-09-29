# Routing split: 120 runs over 60 cases (0 errored, excluded)

**Accuracy 87%** (104/120, 95% CI 79–92%)

Lookup judge (daily-lookup cases): 11/12 pass

| route | n | precision | recall |
|---|---|---|---|
| analysis | 46 | 95% | 78% |
| daily | 44 | 93% | 93% |
| report | 10 | 82% | 90% |
| import | 12 | 100% | 83% |
| setup | 6 | 100% | 100% |
| none | 2 | 18% | 100% |

Confusion matrix (rows = expected, columns = first commands file read):

| expected \ got | analysis | daily | report | import | setup | none |
|---|---|---|---|---|---|---|
| analysis | 36 | 2 | 2 | · | · | 6 |
| daily | 2 | 41 | · | · | · | 1 |
| report | · | 1 | 9 | · | · | · |
| import | · | · | · | 10 | · | 2 |
| setup | · | · | · | · | 6 | · |
| none | · | · | · | · | · | 2 |

Cost $45.62 total, $0.36 median/run · tool calls median 7, max 27

Misses:

- split-analysis-13 rep 0: expected analysis, got none (skill fired, no commands file read) — 查一下s-1 doc，SATS手里的SpaceX股票是否是固定的30b，年底才会到账
- split-analysis-13 rep 1: expected analysis, got none (skill never fired) — 查一下s-1 doc，SATS手里的SpaceX股票是否是固定的30b，年底才会到账
- split-analysis-17 rep 0: expected analysis, got none (skill fired, no commands file read) — @preview-tsmc-26q2.pdf 给我TSMC的策略和目标价
- split-analysis-17 rep 1: expected analysis, got none (skill fired, no commands file read) — @preview-tsmc-26q2.pdf 给我TSMC的策略和目标价
- split-analysis-18 rep 0: expected analysis, got daily — 分析一下今天NBIS的走势，给我一个股价的分析和策略
- split-analysis-18 rep 1: expected analysis, got daily — 分析一下今天NBIS的走势，给我一个股价的分析和策略
- split-analysis-21 rep 0: expected analysis, got report — 查询一下今天是否有skew，能否周五出现扎空行情，特别是一些nbis、intc、crdo、be……等股票
- split-analysis-21 rep 1: expected analysis, got report — 查询一下今天是否有skew，能否周五出现扎空行情，特别是一些nbis、intc、crdo、be……等股票
- split-analysis-23 rep 0: expected analysis, got none (skill fired, no commands file read) — 今天个股的iv是不是都在暴跌
- split-analysis-23 rep 1: expected analysis, got none (skill fired, no commands file read) — 今天个股的iv是不是都在暴跌
- split-daily-lookup-03 rep 1: expected daily, got none (skill fired, no commands file read) — /trade NOK 今天是不是有一个10月份的nok蝴蝶大单？
- split-daily-lookup-04 rep 0: expected daily, got daily (lookup judge FAIL) — STM 2026-11-20 $55 Call 看涨 $2.01M | iso_sweep  深挖一下
- split-daily-lookup-05 rep 0: expected daily, got analysis — /trade NVDA jan 27为什么这么多200c，这是建仓吗
- split-daily-lookup-05 rep 1: expected daily, got analysis — /trade NVDA jan 27为什么这么多200c，这是建仓吗
- split-import-06 rep 0: expected import, got none (skill never fired) — Digest this for my notes: https://example.substack.com/p/hbm-supply-2027
- split-import-06 rep 1: expected import, got none (skill never fired) — Digest this for my notes: https://example.substack.com/p/hbm-supply-2027
- split-report-01 rep 1: expected report, got daily — /trade BE NBIS. 特别看一下大单
