# Frank 模块 — `/trade --frank`

把 macro trader Frank（`franktrading.substack.com` / Discord「Franktradingroom」/ X @Franktradinglog）
的方法论沉淀成可随时调用的子命令。**触发词**：`/trade --frank`、`学习frank`、`frank周报`、`frank复盘`、`frank方法`。

## 三种调用模式

SKILL.md 收到上述触发词后，按用户意图选模式（默认「周报」）：

1. **方法模式**（"frank方法""学习frank是怎么找支撑阻力的"）
   → 读 `methodology.md`，讲他的 S/R = 受迫资金流触发位 / HVL gamma / vanna / 受迫流玩家清单 / 选股 RS。

2. **周报模式**（"frank周报""给我这周的 frank 式复盘展望"）—— **默认**
   → 按 `weekly-template.md` 拉真实数据（TradingView 优先，Funda 补 GEX/DEX）生成三段式复盘+展望。
   → 风格参考 `voice.md`，但**诚实标注数据 vs 推断**。

3. **回测模式**（"frank准不准""frank历史命中率"）
   → 读 `backtest.md`：周线方向混合命中率约 62.5%（24 周），CONDITIONAL/NEUTRAL 强、单边硬方向≈抛硬币。

## 文件

| 文件 | 内容 |
|---|---|
| `methodology.md` | 核心：S/R 怎么找、HVL 规则、VIX→gamma/vanna、受迫流玩家、选股 RS、执行规则、决策树 |
| `weekly-template.md` | 周报生成规范（数据采集 + 三段式结构 + GEX 子模板 + 自检清单）|
| `backtest.md` | 历史命中率回测与分桶结论（怎么用 Frank）|
| `voice.md` | 语气还原 + 红线 |
| `corpus-excerpts.md` | 分主题原文引用（溯源）|

## 数据来源与重抓

- **Discord**：`opencli discord auth --save`（用本地 Chrome 的用户 token，存到仓库 `.env`，已 gitignore；
  注意这用的是个人 user token，有 ToS 风险，仅自用）→ `opencli discord dc history <channel_id> -n N`。
  Guild `Franktradingroom`，频道：`#frank`（他的核心操作）、`#tradingroom`（讨论+教学）、
  `#discussion-repost`（AskBot 镜像他在讨论区的全部发言，是最干净的全量来源）。
- **Substack**：用户有订阅。`opencli browser <session> open <url>` + `extract`（走用户已登录的浏览器，
  可读付费墙内 GEX/DEX 全文）。URL 列表见 `franktrading.substack.com/sitemap.xml`。
- **解析脚本**（本机临时目录，非入库）：`/tmp/frank_scrape/build_corpus.py`（周报→结构化 calls）、
  `extract_calls.py`、`backtest_clean.json`。

## 边界
- 不下单、不声称已成交；多腿期权手动，Equity/ETF 仅 `create_order_instruction` 暂存草单待二次确认。
- 模仿框架做**独立分析**，非冒充本人、非投资建议。结尾可 DYOR。
- 见 `[[feedback_ibkr_order_staging]]`、`[[feedback_thesis_writing]]`、`[[user_trading_profile]]`。
