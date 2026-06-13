# Frank 模块 — `/trade --frank`

把 macro trader Frank（公开账号 `franktrading.substack.com` / X @Franktradinglog）
的交易方法论**独立提炼**成可随时调用的子命令。
**触发词**：`/trade --frank`、`学习frank`、`frank周报`、`frank复盘`、`frank方法`。

本模块是对其公开框架的转述与工具化，不收录付费/私域内容的逐字摘录，不冒充本人。

## 三种调用模式

SKILL.md 收到上述触发词后，按用户意图选模式（默认「周报」）：

1. **方法模式**（"frank方法""frank是怎么找支撑阻力的"）
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

## 数据来源

- 行情/结构数据走本 skill 既有的 **TradingView 优先、Funda AI 补 GEX/DEX** 通道（见 SKILL.md「Data Access」）。
- 方法论提炼基于其**公开**的 Substack 周报与 X 帖子；周报模式只消费实时市场数据，不依赖任何离线语料。

## 边界
- 不下单、不声称已成交；多腿期权手动，Equity/ETF 仅 `create_order_instruction` 暂存草单待二次确认。
- 模仿框架做**独立分析**，非冒充本人、非投资建议。结尾可 DYOR。
- 约束与响应规则以 SKILL.md / CLAUDE.md 为准。
