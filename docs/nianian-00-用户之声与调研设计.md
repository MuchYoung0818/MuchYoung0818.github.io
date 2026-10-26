# 《念念》00 · 用户之声（VoC）与调研设计

> 定位：本案例的需求证据层，先于 [01-竞品拆解报告](01-竞品拆解报告.md)。叙事顺序：**用户在痛（本文 A）→ 竞品没解决（01）→ 我这样解决（02–04）**。
> 诚实声明：本文 A 部分全部来自公开渠道的真实用户原声与媒体报道，逐条附来源；主题计数是**非完备的公开样本编码，不是统计结论**。B/C 部分为待执行的一手调研设计——**一手数据未回收前，作品集与面试只讲 A 部分与假设，不虚构访谈结果**。
> 取证时间：2026-10-26

---

## A. 二手资料 VoC：用户到底在抱怨什么

### A.1 主题编码表

| 编码 | 主题 | 用户原声/事实（来源见 A.2） | 念念的对应模块 |
|---|---|---|---|
| T1 | **失忆（被动丢失）** | "Why do AI companions still forget everything?"（Reddit 专题讨论帖）；OpenAI 社区"记忆跨会话召回断裂，是最令人沮丧的问题"；用户社区最常见抱怨是上下文自动"压缩"造成信息损伤——"花两小时建立的默契可能下一轮对话就消失"（知乎/MIT 科技评论系报道） | M4 褪色可视化 / M3 诚实降级 |
| T2 | **记错且"屡教不改"** | WSJ 报道：记忆功能常"卡在误解或过时的信息上"；豆包 App Store 差评："频繁出错、屡教不改，严重误导用户"；开发者自述"95% 的 AI 助手感觉没有记忆"（Medium） | M6 先确认后入库 / M7 冲突裁决 |
| T3 | **失控感（记了我不想要的）** | 用户专栏《Why I Turned Off ChatGPT's Memory》：因不适而关闭；豆包官方 FAQ 承认的困惑源——"关闭记忆开关不会清除已记住的记忆，删除聊天记录也不会删除记忆"；研究机构讨论"AI 记得太多"的风险（AG Studies） | M1 授权三步 / M9 暂停≠删除 |
| T4 | **期望落差（该记的记不住）** | Kimi-cli GitHub Issue #1478："能否优化记忆层？……搞大项目的时候很痛苦"；OPPO 行业稿《记忆，该治好 AI 的健忘症了》 | M2 记忆驱动推荐 / M5 置顶 |
| T5 | **静默变更与丢失** | OpenAI 社区帖《Catastrophic Failures》：后端记忆架构更新后，部分用户积累的长期上下文静默消失；豆包 FAQ：删除记忆"需一定时间才停止被参考，非实时生效" | M5 修正账本 / M9 24h 生效承诺 |
| T6 | **情感依赖风险** | 人民日报海外版报道的研究：长期 AI 陪伴用户语言中出现更多焦虑、孤独迹象；行业评论"长期记忆既是资产也是最危险的负债"（新浪财经） | M8 关怀边界 / 空态克制设计 |

### A.2 来源清单

| # | 来源 | 类型 | 支持编码 |
|---|---|---|---|
| 1 | [Reddit r/ChatGPT：Why do AI companions still forget everything?](https://www.reddit.com/r/ChatGPT/comments/1s6kbd6/why_do_ai_companions_still_forget_everything_the) | 用户讨论 | T1 |
| 2 | [OpenAI 社区：ChatGPT's Memory Is Failing Serious Users](https://community.openai.com/t/chatgpt-s-memory-is-failing-serious-users-this-needs-to-be-fixed/1403753) | 官方论坛 | T1 |
| 3 | [OpenAI 社区：Catastrophic Failures of ChatGPT memory](https://community.openai.com/t/catastrophic-failures-of-chatgpt-thats-creating-major-problems-for-users/1156230) | 官方论坛 | T5 |
| 4 | [WSJ：Your AI Has a Long Memory. And That Can be a Problem](https://www.wsj.com/tech/ai/ai-memory-cd1de7f4) | 媒体报道 | T2 |
| 5 | [Every：Why I Turned Off ChatGPT's Memory](https://every.to/also-true-for-humans/why-i-turned-off-chatgpt-s-memory) | 用户专栏 | T3 |
| 6 | [豆包 App Store 评论区（差评原声）](https://apps.apple.com/cn/app/id6459478672) | 应用商店评论 | T2 |
| 7 | [豆包官方《记忆功能FAQ》](https://www.doubao.com/legal/memory_faq)（关闭≠清除、删除非实时——官方承认的困惑点） | 官方文档 | T3/T5 |
| 8 | [Kimi-cli Issue #1478](https://github.com/MoonshotAI/kimi-cli/issues/1478) | 开发者社区 | T4 |
| 9 | [当AI开始"失忆"（知乎/科技媒体报道）](https://zhuanlan.zhihu.com/p/2073051910639304814)、[OPPO：该治好AI的健忘症了](https://www.oppo.com/cn/newsroom/press/542) | 行业分析 | T1/T4 |
| 10 | [人民日报海外版：AI陪伴与心理健康研究报道](https://paper.people.com.cn/rmrbhwb/pc/content/202604/14/content_30150850.html)、[新浪财经：长期记忆为何是情感大模型第一道坎](https://finance.sina.com.cn/stock/t/2026-07-28/doc-inikimee8197315.shtml) | 研究/行业 | T6 |
| 11 | [Medium：Why Most Chatbots Fail at Memory](https://deeflect.medium.com/why-most-chatbots-fail-at-memory-and-how-to-fix-it-cdc40d219fee)、[AG Studies：Does Your AI Remember Too Much?](https://agstudies.org/publications/does-your-ai-remember-too-much-understanding-ai-memory-and-its-risks) | 开发者/研究 | T2/T3 |

### A.3 编码结论（写进作品集的话术）

> 六个主题里，**T1/T2/T5 是"记忆不可靠"，T3 是"记忆不可控"**——前者是能力问题（各家都在卷），后者是信任问题（没有人在做产品化解决）。念念把差异化押在后者：不承诺"记得更牢"，先做到"**记得诚实**"。这个判断同时得到用户原声（T3 的关闭行为）与竞品空白（见 01 §W5 黑盒观察）的双重支持。

---

## B. 待验证假设（一手调研要回答的问题）

| # | 假设 | 验证方式 | 若被推翻 |
|---|---|---|---|
| H1 | 用户愿意花 30 秒/日 处置记忆草稿，换取"不记错" | 访谈 Q4 + 原型 A/B 任务 | 复核队列改为周汇总，降交互频次 |
| H2 | "来源可回查"能提升信任并降低 creepy 感 | 访谈 Q5 + 引文卡开合行为观察 | 弱化入口，只保留面板层 |
| H3 | 褪色机制看得懂且不引起焦虑 | 访谈 Q6（口径文案 A/B） | 文案简化为"模糊了"，不显示天数 |
| H4 | 主动关怀的接受度取决于"可否一键关停单一主题" | 访谈 Q7–Q9 | 边界默认更保守（每周 1 条起步） |
| H5 | 目标用户（被 AI 记错过的人）真实存在且可触达 | 招募筛选 S1–S3 | 转向"隐私敏感型"人群重新定位 |

## C. 一手调研执行包（可直接照做）

### C.1 招募（5–8 人，30 分钟/人）

- S1 必要条件：近 3 个月每周使用任一 AI 对话产品 ≥3 次
- S2 分层要求：至少 3 人开启过记忆/个性化功能，其中 ≥1 人曾删除或关闭它（对应 T3）
- S3 排除：AI 行业从业者（避免专业视角污染）
- 渠道：同学/朋友滚雪法 + 豆瓣/小红书"AI 陪伴"相关小组发帖
- 报酬：30 元红包/人（注明"无对错答案"）

### C.2 访谈提纲（30 分钟）

1. （5'）暖场：最近一次和 AI 聊得开心/烦的经历各一件
2. （5'）记忆感知：它记得你什么？你怎么知道的？（不提示"记忆功能"四个字，先看自发回忆）
3. （5'）失败故事：有没有它忘了/记错的时候？当时你做了什么？（锚定 T1/T2）
4. （4'）**H1**：拿出 M6 复核页原型——"每天花 30 秒处理这个，你愿意吗？多少条是你的上限？"
5. （4'）**H2**：拿出 M3 对话页——点开"来源"前后的信任打分（1–10，两次）
6. （3'）**H3**：看 M4 褪色条两种文案（A"距上次确认 45 天" / B"有点记不清了"）选一个，说原因
7. （4'）**H4**：AI 主动发消息的场景想象——什么可以？什么绝对不行？"关掉某一个"重要吗？
8. （2'）收尾：如果这个产品收费，你付吗？为哪个功能付？

### C.3 分析与产出（回收后 1 天内完成）

- 亲和图：访谈笔记按 A.1 的 T1–T6 编码 + 新增编码（贴墙上或 FigJam）
- 产出三件：① 用户画像 ×2（贴引语）② 痛点—旅程图（发现→积累→出错→处理四阶段）③ H1–H5 判定表（验证/推翻/存疑 + 依据引语）
- 回填位置：本文新增"D. 一手调研结果"章节；02 产品方案 §1 的用户描述替换为真实画像

### C.4 诚实红线

- 原声引语必须逐字，标注受访者编号（P1–P8）与访谈日期
- 打分类数据如实报告，包括不利结果（推翻假设比验证更有讨论价值）
- 样本量 5–8 人**不得**外推为统计结论，呈现时写"定性发现"

## D. 一手调研结果（待回收）

> 空态：尚未执行。回收后按 C.3 规范回填——在作品集里保留这个空态本身就是研究纪律的展示。

---

**四件套（现为五件）互链**：本文 → [01-竞品拆解报告](01-竞品拆解报告.md) → [02-产品方案](02-产品方案.md) → [03-PRD](03-PRD.md) → [04-原型](04-原型/index.html)
