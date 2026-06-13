# Frank 式周报生成器（复盘 / 展望）

复刻 `franktrading.substack.com` 每周「复盘与展望」的结构与决策逻辑。
**这是 `/trade --frank` 周报模式的执行规范。** 用真实数据填充，不要编造数字。

## 数据采集（先做，按 CLAUDE.md 数据优先级）

1. **TradingView reader 优先**：SPX/ES 盘前 Spot、QQQ、SMH/SOX、关键个股 quote、IV。
2. **Funda AI 补充**：GEX/DEX dashboard（HVL、Call/Put Resistance 全期限 & 0DTE、Total GEX/DEX 及 1D 变化）、
   IV Rank、期权 flow、个股 risk reversal/skew、宏观日历、earnings 日历。
3. 个股结构位看 Unusual Whales 风格的 GEX。
4. 缺数据就说"数据缺失"，**绝不猜**。

> 在 worktree 内运行时 `.env` 在主仓库，不在 worktree —— 见 SKILL.md「Data Access」。

## 输出结构（三段式，中文，技术术语保留英文）

### 一、策略复盘
- 上周的**核心一句话判断**是否被兑现（先给结论，再给证据）。
- 具体执行：哪些仓位 sell into strength / 加对冲 / 抄底，结果如何。
- 自我批评：错的地方直说（pitfall 文化：被打脸就更新，不防御性强化）。
- 收尾：当前仓位状态（"flat 也是一种仓位"），头寸压力大小。

### 二、市场分析
- **（一）本周复盘**：导火索（news）+ 真正的机制（去杠杆/轧空/仓位解除）。
  分清"火柴"和"炸药"（内生理论）。给出指数实际波动幅度。
- **（二）分板块**：Semi / 科技大盘 / 软件 / 板块轮动。每块给"基本面 vs 仓位"的拆解，
  明确"这是仓位事件还是基本面崩塌"。轮动给**下手顺序**（先防御-质量、后硬资产、最后利率敏感周期）。
- **（三）本周重点关注**：列出本周 + 下周的宏观事件（CPI/PPI/FOMC/OPEX）与单票财报，
  每个给 consensus 数字 + 关注的"考点"（哪个分项决定叙事）。
- **（四）GEX / DEX 结构分析**：用下方固定子模板。

#### GEX/DEX 子模板（逐条写，每条绑动作）
```
盘前期货（Spot）：≈ {spot}
HVL（高波动临界）：≈ {hvl}
中枢 Call Resistance：{cr_full}（全期限） / {cr_0dte}（0DTE）
Put Support：{ps_full}（结构性） / {ps_0dte}（0DTE）
IV 30D：{iv30}% ｜IV Rank：{ivr}%   HV 30D：{hv30}%

Total GEX：{gex}  Total DEX：{dex}  GEX 1D：{dgex}  DEX 1D：{ddex}
```
然后逐位解读（**严格按 methodology.md §1 的 HVL 规则**）：
- Spot 相对 HVL 在上方/下方 → 正/负 gamma → 本周默认脚本（压波动 or 放波动）。
- 每道墙：是反弹目标/止盈位，还是减仓/清仓触发位。给出分段路径。
- GEX±1D：结构强化还是退化，是否触发"结构退化警报"。

### 三、本周交易计划与策略（编号清单）
- 每条都要可执行、带具体 level 和动作（"7375 不破可短多""跌破 7350 清仓"）。
- 给出建仓/对冲的时间窗（覆盖到 OPEX 之后）。
- 板块轮动的下手顺序 + 确认/证伪 tell + risk-off 警报阈值（HY 利差等）。
- 收尾永远是风控：先定 invalidation 再定 size，保本止损，"耐心 > 硬上"。

## 风格与纪律检查（生成后自检）
- [ ] 先结论后论证，不绕。
- [ ] 区分"仓位事件 vs 基本面"——这是 Frank 最核心的判断框架。
- [ ] 每条 level 都绑了一个动作（二元化），没有悬空的数字。
- [ ] 正/负 gamma 的脚本和 Spot-vs-HVL 一致（不能 Spot 在 HVL 上方却写"易自由落体"）。
- [ ] 方向观点和 vega 选择分开（pitfall 19）；高 IVR 才卖波动（pitfall 7）。
- [ ] 给了双向不确定性（"不确定性是双向的，空头拥挤反而利空空头" X 06-10）。
- [ ] 语气还原见 `voice.md`；但**对用户的输出要诚实标注哪些是数据、哪些是推断**。

## 重要边界
- **不下单、不声称已成交**。可用 IBKR `create_order_instruction` 仅暂存 Equity/ETF 草单（用户二次确认），
  多腿期权一律手动。见 SKILL.md「Important constraints」。
- 这是**模仿 Frank 的分析框架**做独立分析，不是冒充 Frank 本人、不是投资建议。结尾可加 DYOR。
