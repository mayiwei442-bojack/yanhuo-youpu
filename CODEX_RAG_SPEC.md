# 烟火有谱：RAG + Codex 自动菜谱更新系统 Spec

> 版本：v0.2
> 状态：Implementation Spec
> 目标仓库：`mayiwei442-bojack/yanhuo-youpu`
> 本文档是 Codex 的实施依据。除非实现上存在明确阻塞，不要自行改变本文已经确定的架构决策。

---

## 1. 项目目标

在现有《烟火有谱》项目上新增一套可长期运行的 **RAG 知识库 + Codex 多 Agent 自动菜谱更新工作流**。

系统需要同时满足两个长期目标：

1. **自动更新现有菜谱**
   按既有菜谱清单逐道处理。Codex 定时启动后，自动选择下一道待更新菜品，在指定可信网站中主动搜索该菜品教程，抓取完整内容，沉淀到知识库，再由 Editor 生成新菜谱、Reviewer 验收，最后提交到 GitHub 自动化分支。

2. **沉淀长期知识库**
   网站抓取内容不能只用于一次生成，必须格式化后长期写入 Supabase RAG 知识库。未来用户会继续提供 PDF / EPUB 等菜谱书，由 Codex 读取、结构化并写入同一知识库，为后续自然语言找菜、问菜、生成菜谱提供数据基础。

未来需要支持这类查询：

> 找几道适合夏天、酸辣口、十分钟以内、鸡肉为主、不要油炸的菜。

因此知识库从第一版开始就必须支持 Embedding 和向量检索，而不是只做关键词数据库。

---

## 2. 已确定的架构决策

以下决策视为已确认，不要重新选型：

- AI 工作流由 **用户自己的 Codex** 执行。
- 不为 Researcher / Editor / Reviewer 接 DeepSeek、OpenAI Chat Completions 或其他独立大模型 API。
- Codex Desktop Scheduled Task 作为第一版调度器。
- 每次定时运行使用一个新的父 Agent 上下文；长期状态由文件、日志、Git 和 Supabase 持久化。
- 父 Agent 负责协调 3 个 Codex 子 Agent：Researcher、Editor、Reviewer。
- 不使用 n8n。
- 不使用 Redis / Queue。
- 第一版不使用 worktree。
- 自动化不得直接提交到 `main`。
- 使用一个长期自动化分支：`codex/recipe-automation`。
- 当前项目没有其他并行开发任务，因此自动化直接使用现有本地仓库工作目录。
- 正式菜谱仍以现有静态数据链路为主，不迁移到数据库。
- 当前 canonical 菜谱源继续使用 `tools/recipe_data.mjs`。
- `data/recipes.js` 继续由现有构建脚本生成，不允许 Agent 直接手改。
- RAG 知识库使用 **Supabase 托管 PostgreSQL + pgvector**。
- Embedding 使用 **Voyage AI 云端 API 的 `voyage-4`**，输出维度固定为 **1024 维**。
- Embedding provider 必须做成可替换适配层，不把模型名称写死在业务逻辑中。
- 多来源编辑必须选择一个最完整、工艺最自洽的完整主变体；其他来源仅允许补充与主变体不冲突的信息，不得拼接出新的混合变体。
- 公开菜谱的单位表达以忠实保留来源为前提：重量和长度可以进行确定的物理单位换算，杯、汤匙、茶匙等容器单位不得在缺乏来源公制值时自行换算为毫升。
- Chunk 类型固定包含：`summary`、`ingredients`、`steps`、`technique`、`tips`。
- Reviewer 不主动重新搜索网站，也不自己再次查询 RAG；Reviewer 只使用 Researcher 已形成的同一份 evidence package 进行独立验收。
- 书籍 ingestion 第一版不额外调用 Codex Validator，以节约 Codex 额度。
- 所有网页和书籍资料必须保留可追溯来源。
- 禁止绕过登录、验证码、访问控制或平台反自动化措施。

---

## 3. 现有项目约束

现有项目已经有以下关键数据链路：

```text
tools/recipe_data.mjs
        ↓
tools/build_html_demo_data.mjs
        ↓
data/recipes.js
        ↓
前端使用
```

因此：

- Editor 只能修改 `tools/recipe_data.mjs` 中目标菜品对应的数据。
- `data/recipes.js` 必须通过构建脚本重新生成。
- 自动化不得直接批量重写其他无关菜品。
- 自动化不得因为本项目新增 RAG 而删除或替换现有前端 / 后端 AI 功能。

现有 Node.js 项目继续保留。

---

## 4. 总体系统结构

```text
Codex Scheduled Task
        ↓
父 Agent / Orchestrator
        ↓
读取 workflow/recipe-progress.json
        ↓
恢复未完成任务或选择下一道 pending 菜
        ↓
Agent 1: Researcher
        ↓
指定网站内搜索 + 抓取 + RAG 查询/入库
        ↓
Evidence Package
        ↓
Agent 2: Editor
        ↓
完整重写目标菜谱
        ↓
非 AI Validator
        ↓
Agent 3: Reviewer
        ↓
PASS / FAIL
        ↓
最终 build/test
        ↓
更新 progress + run log
        ↓
commit + push
        ↓
codex/recipe-automation
```

另有独立知识入库入口：

```text
网站内容 ─┐
         ├→ Normalize → Chunk → Embedding → Supabase pgvector
菜谱书 ───┘
```

---

## 5. 目录结构

Codex 应尽量按以下结构实现：

```text
yanhuo-youpu/
│
├── workflow/
│   ├── recipe-progress.json
│   ├── source-config.json
│   ├── prompts/
│   │   ├── orchestrator.md
│   │   ├── researcher.md
│   │   ├── editor.md
│   │   └── reviewer.md
│   ├── schemas/
│   │   ├── evidence-package.schema.json
│   │   ├── reviewer-result.schema.json
│   │   └── run-log.schema.json
│   └── runs/
│       └── <run-id>.json
│
├── .codex/
│   └── agents/
│       ├── researcher.toml
│       ├── editor.toml
│       └── reviewer.toml
│
├── src/
│   └── rag/
│       ├── supabase-client.mjs
│       ├── source-repository.mjs
│       ├── document-repository.mjs
│       ├── chunk-repository.mjs
│       ├── normalize.mjs
│       ├── chunker.mjs
│       ├── embedding-provider.mjs
│       ├── ingest-document.mjs
│       ├── retrieve.mjs
│       └── hybrid-search.mjs
│
├── tools/
│   ├── recipe_data.mjs
│   ├── build_html_demo_data.mjs
│   └── workflow/
│       ├── validate-recipe.mjs
│       ├── validate-run-state.mjs
│       └── resource-test.mjs
│
├── data/
│   └── recipes.js
│
├── books/
│   └── .gitkeep
│
├── supabase/
│   └── migrations/
│       ├── 001_rag_base.sql
│       └── 002_rag_vector_index.sql
│
├── AGENTS.md
└── .env.example
```

若现有目录结构与此冲突，应以最小改动方式适配，不要为追求目录一致性重构无关代码。

---

## 6. 菜谱进度文件

文件：

```text
workflow/recipe-progress.json
```

用途：

- 记录所有现有菜品。
- 区分中餐与西餐。
- 记录每道菜的处理状态。
- 每次 Scheduled Task 的第一个业务动作必须读取此文件。
- Agent 3 在任务完整通过后更新此文件。

建议结构：

```json
{
  "chinese": [
    {
      "id": "cn-001",
      "name": "番茄炒蛋",
      "status": "pending",
      "lastRunId": null,
      "completedAt": null
    }
  ],
  "western": [
    {
      "id": "west-001",
      "name": "Spaghetti Carbonara",
      "status": "pending",
      "lastRunId": null,
      "completedAt": null
    }
  ]
}
```

允许状态：

```text
pending
in_progress
done
failed
```

规则：

- `done` 只有在 Reviewer PASS、最终非 AI 测试 PASS、Git commit/push 成功后才可写入。
- 如果上一轮未完成，不得直接跳到下一道菜。
- 新的一天的新父 Agent 必须先检查最后一个 run log。
- 若上一轮未完成：优先继续同一道菜；如果工作区状态不一致，则回滚到上一成功 commit 后重新执行该菜。

---

## 7. 来源配置

文件：

```text
workflow/source-config.json
```

用途：限制 Researcher 的可搜索网站范围。

Researcher **不是全网搜索 Agent**，而是“指定可信网站内自主搜索 Agent”。

初始示例：

```json
{
  "chinese": [
    {
      "name": "The Woks of Life",
      "baseUrl": "https://thewoksoflife.com/",
      "enabled": true
    },
    {
      "name": "豆果美食",
      "baseUrl": "https://www.douguo.com/",
      "enabled": true
    }
  ],
  "western": [
    {
      "name": "Serious Eats",
      "baseUrl": "https://www.seriouseats.com/",
      "enabled": true
    },
    {
      "name": "BBC Good Food",
      "baseUrl": "https://www.bbcgoodfood.com/",
      "enabled": true
    }
  ]
}
```

Codex 不得把示例列表视为永远固定。实现必须支持用户以后继续新增、禁用和删除网站。

### 7.1 来源身份与页面选择

- 一个网站在 `kb_sources` 中只注册为一个 website source，以规范化后的 canonical `base_url` 作为唯一身份；同一网站不得因为存在多个菜谱详情页而重复注册多个 source。
- 一个网站可以长期拥有多道菜的 documents，但对于一次目标菜品研究，同一网站最多选中一份名称匹配、内容完整、工艺自洽的正式菜谱详情页作为本轮 evidence document。
- Researcher 可以检查同一网站内的多个候选搜索结果，但不得把同一网站的多份相似菜谱全部入库来凑独立来源数量；未选中的候选只记录淘汰原因，不计为独立来源。
- 独立来源数量按不同网站或不同书籍计算，不按同一网站的页面数量计算。

### 7.2 来源禁用与删除

当用户要求停止使用某一来源时，必须明确区分“禁用”和“删除”并只处理该来源拥有的数据：

- 禁用来源：在 `source-config.json` 和 `kb_sources` 中标记为不可用，停止后续搜索、抓取、入库和检索，但可以保留已有资料用于审计。
- 删除来源：从当前 `source-config.json`、Resource Test 列表和其他活动配置中移除，并清理该 source 在当前数据库中拥有的 documents、chunks、embeddings 及来源专属测试夹具、evidence 和报告。
- 删除不得影响其他网站、书籍、菜谱实体或正式菜谱数据。
- 删除后必须运行确定性检查，并核对数据库中该 source 及其关联活动数据已不存在。
- 普通来源清理不重写 Git 历史；只有用户另行明确授权时才可讨论历史重写和强制推送。

---

## 8. Agent 设计

### 8.1 父 Agent / Orchestrator

父 Agent 只负责编排，不直接承担大量菜谱研究和写作。

职责：

1. 检查 Git 工作区是否处于可运行状态。
2. checkout `codex/recipe-automation`。
3. pull 最新自动化分支。
4. 读取 `recipe-progress.json`。
5. 读取最后一个 run log。
6. 恢复未完成任务或选择下一道 `pending` 菜。
7. 将目标状态改为 `in_progress`。
8. 创建本次 run log。
9. 调用 Researcher。
10. 等待 Researcher 返回 evidence package。
11. 调用 Editor。
12. 运行非 AI Validator。
13. Validator FAIL 时将明确错误返回 Editor，最多重做 2 次。
14. Validator PASS 后调用 Reviewer。
15. Reviewer FAIL 时把 Reviewer 具体问题返回 Editor，最多重做 2 次。
16. Reviewer PASS 后执行最终 build/test。
17. 更新 `recipe-progress.json`。
18. 更新 run log。
19. commit 并 push 到 `codex/recipe-automation`。
20. 任意不可恢复错误发生时记录日志并停止，不得继续发布。

---

### 8.2 Agent 1：Researcher / 信息获取 Agent

Researcher 是唯一允许主动搜索网站的 Agent。

输入：

- 目标菜品名称。
- 目标菜品 ID。
- `chinese` / `western` 分类。
- `source-config.json` 中对应网站白名单。
- RAG 查询工具。

职责：

1. 先查询 Supabase 知识库中是否已经存在目标菜品的相关资料。
2. 在对应白名单网站内主动搜索目标菜品。
3. 对搜索结果进行相关性判断，避免抓错菜、变体菜或名称相近但不同的菜。
4. 获取每个可访问来源中最匹配的一份完整菜谱内容；同一网站的其他候选页面只用于比选，不计为新的独立来源，也不批量入库。
5. 优先提取：
   - 菜名
   - 原料
   - 用量
   - 烹饪步骤
   - 烹饪时间
   - 火候
   - 技法
   - tips（温馨提示、注意事项、小妙招、常见失败原因等）
6. 记录：
   - 网站名称
   - 原始 URL
   - 获取方式：HTML / JSON-LD / API / 其他
   - 是否完整读取
   - 失败原因
7. 不得绕过登录、验证码、访问控制或反自动化措施。
8. 将成功获取的新资料写入 RAG ingestion 流程。
9. 生成结构化 evidence package 返回父 Agent。
10. Researcher 不得修改 `tools/recipe_data.mjs`。
11. Researcher 不得执行 Git commit/push。

Researcher 必须在 raw text 和结构化 evidence 中保留来源原有的用量与单位表达。公开菜谱所需的单位规范由 Editor 按下述规则处理，不得反向覆盖或改写原始来源证据。

最低成功标准：

- 默认至少取得 2 个独立有效来源。
- 推荐目标为 3 个独立来源。
- 若有效来源不足 2 个，任务默认失败，除非已有知识库中存在足够可靠的历史独立来源。

---

### 8.3 Agent 2：Editor / 信息编辑 Agent

Editor 不允许主动搜索互联网。

输入：

- 目标菜品。
- Researcher 生成的完整 evidence package。
- 当前 `tools/recipe_data.mjs` 中该菜品旧内容。

职责：

1. 从多个来源中选择一份原料最完整、步骤最连贯、工艺最自洽的完整主变体。
2. 识别来源共识与冲突；次要来源只可补充与主变体不冲突的同一原料用量、时间、火候、成熟判断或安全提示。
3. 保留主变体的关键原料、比例、步骤顺序和烹饪路线，不得借用另一变体的关键食材或操作顺序拼成新的混合菜谱。
4. 生成完整新菜谱；最终原料表必须覆盖所选变体步骤中实际使用的全部内容，包括油、水、腌料、装饰材料、分次使用材料和防干补水。
5. 原料不得遗漏；来源没有可靠数值时可以保留“适量 / 少许 / 约”等保守描述，不得为了形式上的精确编造克数或毫升数。
6. 直接覆写旧菜谱内容，不需要业务层 diff 机制。
7. 只修改目标菜品。
8. 不得根据自己常识凭空补全关键数值。
9. 对来源没有明确量化的信息，优先保留“适量 / 少许 / 约”等保守描述。
10. 不得修改菜品 ID、图片路径等与教程内容无关的稳定字段，除非实现确实要求。
11. 修改目标：`tools/recipe_data.mjs`。
12. 不直接修改 `data/recipes.js`。
13. 不执行 Git commit/push。

#### 8.3.1 公开菜谱单位规则

单位规范只作用于 Editor 生成的正式公开菜谱；RAG 中的 `raw_text`、原始摘录和 ingredient `raw` 字段继续保留信源原文。

- 磅、盎司等重量单位转换为克或千克；英寸等长度单位转换为厘米或毫米。换算必须是确定的物理单位换算，并允许使用“约”处理合理四舍五入。
- 来源明确给出克、千克、毫升或升时，直接保留来源公制值，不用理论换算值覆盖来源值。
- 来源使用杯、汤匙、茶匙或其他容器单位时，正式菜谱保留来源原单位和原数值，不得默认按标准美制或其他标准容量换算为毫升。
- 来源同时明确给出容器单位和公制值时，可以优先显示来源明确给出的公制值；需要表达分次比例时仍可保留来源原有的杯、汤匙或茶匙分配方式，不得自行推算各部分毫升数。
- 油只有汤匙、茶匙、杯或模糊用量且来源没有给出公制值时，保留来源原数值和原单位；来源本身为模糊表达时，保留“适量 / 少许”等原意。
- 来源未指定具体油种时统一写“食用油”；只有来源明确固定为橄榄油、芝麻油等具体油种时才保留该油名。油名的规范不得改变来源用量单位。
- 对来源未提供的单位、容器容量或换算关系，不得从常识、默认量杯标准或其他来源补造。

---

### 8.4 Agent 3：Reviewer / 信息验收 Agent

Reviewer 不允许搜索网站，也不允许重新查询 RAG。

输入：

- Researcher 的同一份 evidence package。
- Editor 修改后的目标菜谱。
- 非 AI Validator 输出。

职责：

检查：

1. 是否存在 Agent 2 凭空增加的关键内容。
2. 原料和用量是否有证据支持。
3. 是否遗漏多个来源共同强调的重要步骤。
4. 时间、火候、温度是否明显错误。
5. 是否把不同菜品或不同变体混在一起。
6. 多来源冲突时是否做了过度武断的选择。
7. 最终烹饪逻辑是否自洽。
8. 是否符合《烟火有谱》当前数据结构。

输出必须结构化：

```json
{
  "status": "PASS",
  "issues": [],
  "summary": ""
}
```

或：

```json
{
  "status": "FAIL",
  "issues": [
    {
      "field": "ingredients",
      "message": "盐 15g 无任何来源支持"
    }
  ],
  "summary": "存在无来源支持的关键用量"
}
```

Reviewer PASS 后：

- 父 Agent 再执行最终 build/test。
- 全部通过后，Reviewer 阶段负责确认可以发布。
- 更新 `recipe-progress.json` 为 `done`。
- 完成 Git commit/push。

---

## 9. 非 AI Validator

Validator 必须是确定性程序，不调用 Codex 或其他 LLM。

文件建议：

```text
tools/workflow/validate-recipe.mjs
```

至少检查：

- `tools/recipe_data.mjs` 可被正常解析。
- 目标菜品存在且唯一。
- 菜名非空。
- ingredients 非空。
- steps 至少 2 条。
- 目标菜品外的无关菜谱没有被意外修改。
- ID 不重复。
- 必要字段未丢失。
- 图片路径未被意外删除。
- 生成 `data/recipes.js` 成功。
- 生成后目标菜品仍存在。
- 本地 deterministic tests 通过。

自动化中禁止为了 Validator 调用付费大模型 API。

如果现有 `npm run test:ai` 会产生模型 API 调用，则 Scheduled Workflow 默认不得运行它。

推荐自动化验证：

```text
node tools/build_html_demo_data.mjs
npm test
npm run build
```

若 `npm run build` 内含无关外部网络依赖，应拆出一个纯本地 workflow build/test 命令。

---

## 10. Run Log / Workflow State

所有关键步骤必须写持久化日志。

目录：

```text
workflow/runs/
```

文件名：

```text
<YYYY-MM-DD>-<recipe-id>-<short-run-id>.json
```

建议结构：

```json
{
  "runId": "2026-08-30-cn-001-a1b2",
  "recipeId": "cn-001",
  "recipeName": "番茄炒蛋",
  "category": "chinese",
  "status": "in_progress",
  "startedAt": "",
  "completedAt": null,
  "steps": {
    "research": { "status": "pending", "attempts": 0 },
    "ingestion": { "status": "pending", "attempts": 0 },
    "edit": { "status": "pending", "attempts": 0 },
    "validator": { "status": "pending", "attempts": 0 },
    "review": { "status": "pending", "attempts": 0 },
    "build": { "status": "pending", "attempts": 0 },
    "gitPush": { "status": "pending", "attempts": 0 }
  },
  "sources": [],
  "errors": [],
  "branch": "codex/recipe-automation",
  "commit": null
}
```

每一步开始和结束都更新日志。

新 Scheduled Run：

- 不依赖旧对话作为唯一状态来源。
- 可使用新父 Agent 上下文。
- 必须读取 progress + 最新 run log。
- 若最新任务未完成，先处理该任务，不开启下一道菜。

---

## 11. Supabase RAG 数据模型

使用 Supabase 托管 PostgreSQL。

启用：

```text
pgvector
```

### 11.1 `kb_sources`

记录来源级信息。

建议字段：

```text
id uuid pk
source_type text        -- website | book
name text
base_url text nullable
title text nullable
author text nullable
active boolean
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

website source 必须以规范化后的 `base_url` 唯一标识，一个网站只对应一条活动 source 记录；具体菜谱页面属于 `kb_documents`，不得为每个详情页重复创建 website source。

---

### 11.2 `kb_recipe_entities`

用于统一菜名、别名和中西餐分类。

```text
id uuid pk
canonical_name text
aliases text[]
category text            -- chinese | western
cuisine text nullable
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

---

### 11.3 `kb_documents`

一个 document 表示一份可追溯菜谱资料，例如一个网页菜谱或一本书中的一道菜。

```text
id uuid pk
source_id uuid fk -> kb_sources.id
recipe_entity_id uuid nullable fk -> kb_recipe_entities.id
source_type text
recipe_name text
url text nullable
book_title text nullable
page_start int nullable
page_end int nullable
raw_text text
normalized_json jsonb
content_hash text
retrieved_at timestamptz
ingested_at timestamptz
metadata jsonb
```

要求：

- 原始内容必须可追溯。
- 网站保留 URL。
- 对一次目标菜品研究，同一网站只选中一份正式详情页作为 evidence document；同站其他候选不得用于增加独立来源计数。
- 书籍保留书名和页码。
- `content_hash` 用于防止重复入库。

---

### 11.4 `kb_chunks`

RAG 实际检索单元。

```text
id uuid pk
document_id uuid fk -> kb_documents.id
recipe_entity_id uuid nullable fk -> kb_recipe_entities.id
chunk_type text
content text
metadata jsonb
embedding_model text nullable
embedding_version text nullable
embedding_dim int nullable
embedding vector(1024) nullable
created_at timestamptz
```

`chunk_type` 只允许：

```text
summary
ingredients
steps
technique
tips
```

其中：

- `summary`：菜名、简介、菜系、风味、特征。
- `ingredients`：食材、用量、替代食材。
- `steps`：完整烹饪步骤，可按长度拆成多个 step chunks。
- `technique`：火候、时间、温度、技法。
- `tips`：温馨提示、注意事项、小妙招、常见失败原因。

---

## 12. Embedding 设计

第一版固定使用 Voyage AI 云端 API：

```text
Provider: Voyage AI
Model: voyage-4
Endpoint: https://api.voyageai.com/v1/embeddings
Output dimension: 1024
Output dtype: float
Document input_type: document
Query input_type: query
```

模型选择已锁定，但仍须保留可替换 provider 适配层，避免将来更换模型时改动业务逻辑。

必须实现统一接口：

```js
embedTexts(texts, options)
```

配置来自环境变量，例如：

```text
EMBEDDING_PROVIDER=voyage
EMBEDDING_MODEL=voyage-4
EMBEDDING_DIM=1024
EMBEDDING_API_KEY=
```

要求：

- 业务代码不得直接依赖某个模型厂商。
- 文档和 chunk 入库时必须使用 `input_type=document`。
- 用户查询生成检索向量时必须使用 `input_type=query`。
- API 输出必须使用 `output_dimension=1024` 和 `output_dtype=float`。
- 每个 chunk 记录 `embedding_model` 和版本信息。
- 相同 provider/model 下向量维度必须一致。
- 当模型未来更换时，必须支持重新 embedding，而不是重建全部业务数据。
- 不在用户电脑本地部署 embedding model。
- Codex 负责调用 embedding 流程，但 Codex 本身不被当作 embedding model。

Supabase migration 设计：

- `001_rag_base.sql` 建基础表并启用 pgvector。
- `embedding` 字段允许为空，以支持尚未完成向量化或向量化失败的 chunk。
- `002_rag_vector_index.sql` 按 `vector(1024)` 建立当前 `voyage-4` 使用的向量字段和索引。
- 维度只能出现在配置和 migration 中，不要散落写死在业务逻辑中。

使用 HNSW 和 cosine distance 建立当前向量索引；具体构建参数应根据首批真实数据的检索测试确定。

---

## 13. RAG Ingestion

统一入口：

```text
Raw Source
   ↓
Normalize
   ↓
Document
   ↓
Chunk
   ↓
Embedding
   ↓
Supabase
```

### 13.1 网站 ingestion

来源：Researcher 抓取。

步骤：

1. 抓取完整可访问内容。
2. 保留原始 URL 和 raw text。
3. Normalize 为统一 recipe JSON。
4. 生成 5 类 chunks。
5. 调用 embedding provider。
6. 写入 Supabase。
7. 基于 URL + content hash 去重。
8. 内容发生变化时允许生成新 document version 或更新当前记录，但必须保留可追溯时间信息。

---

### 13.2 书籍 ingestion

未来用户会把菜谱书提供给 Codex。

允许格式：优先支持 PDF；EPUB 可作为第二阶段支持。

流程：

```text
Book
↓
Codex 读取
↓
识别菜谱边界
↓
提取菜名 / 食材 / 用量 / 步骤 / technique / tips / 页码
↓
Normalize
↓
Chunk
↓
Embedding
↓
Supabase
```

要求：

- 保留原书文件，不覆盖。
- 每一道提取菜谱必须记录 `book_title` 和页码。
- 书籍 ingestion 第一版不增加额外 Codex Validator。
- 若页面文字无法可靠读取，记录失败，不允许凭空补全。

---

## 14. Normalize Schema

所有网站和书籍资料进入知识库前都要统一为类似结构：

```json
{
  "recipeName": "番茄炒蛋",
  "aliases": ["西红柿炒鸡蛋"],
  "category": "chinese",
  "cuisine": "家常菜",
  "summary": "",
  "ingredients": [
    {
      "name": "鸡蛋",
      "amount": "3个",
      "raw": "鸡蛋3个"
    }
  ],
  "steps": [
    {
      "order": 1,
      "instruction": "",
      "duration": null,
      "heat": null
    }
  ],
  "technique": [],
  "tips": [],
  "source": {
    "type": "website",
    "name": "",
    "url": "",
    "bookTitle": null,
    "pageStart": null,
    "pageEnd": null
  }
}
```

Normalize 阶段必须区分：

- 原文明确给出。
- 可以直接结构化得到。
- 原文未说明。

不得为了填满字段而编造信息。

---

## 15. Retrieval / Hybrid Search

系统必须从第一版开始为 Hybrid Search 设计。

未来用户查询：

> 找几道适合夏天、酸辣口、十分钟以内、鸡肉为主、不要油炸的菜。

应拆分为：

### 结构化过滤

适合：

- 时间 <= 10 分钟
- 主食材 = 鸡肉
- 烹饪方式 != 油炸

### 向量语义检索

适合：

- 适合夏天
- 清爽
- 酸辣
- 开胃

### 最终流程

```text
User Query
   ↓
结构化条件解析
   ↓
Metadata / SQL filter
   +
Vector similarity search
   ↓
候选合并
   ↓
Codex / 未来 AI 排序与解释
```

更新某道确定菜品时，优先利用 `recipe_entity_id`、菜名、别名进行 metadata 收窄，再做向量检索。

避免只按全库向量相似度取 Top K。

检索应保证来源多样性，避免 Top K 全部来自同一个网站或同一本书。

---

## 16. Evidence Package

Researcher 交给 Editor 和 Reviewer 的 evidence package 必须相同。

建议结构：

```json
{
  "recipeId": "cn-001",
  "recipeName": "番茄炒蛋",
  "category": "chinese",
  "sources": [
    {
      "sourceName": "豆果美食",
      "url": "",
      "documentId": "",
      "complete": true,
      "ingredients": [],
      "steps": [],
      "technique": [],
      "tips": [],
      "rawExcerpt": ""
    }
  ],
  "ragEvidence": [],
  "notes": []
}
```

Reviewer 不得绕过该 evidence package 自己重新找证据。

---

## 17. Git 策略

第一版不使用 worktree。

使用现有本地项目目录，但所有自动更新写入长期分支：

```text
codex/recipe-automation
```

每次 Scheduled Run：

1. 检查工作区。
2. checkout `codex/recipe-automation`。
3. `git pull --ff-only`。
4. 执行一整道菜的工作流。
5. 成功后 commit。
6. push 同一长期自动化分支。

推荐 commit：

```text
chore(recipes): refresh cn-001 番茄炒蛋
```

禁止：

- 直接 push `main`。
- 自动 merge `main`。
- 使用 `git push --force`。
- 在存在未知未提交人工修改时继续运行。

如果工作区在定时任务开始时有非自动化遗留的 dirty changes：

- 写日志。
- 停止任务。
- 不自动 stash / discard 用户修改。

---

## 18. Codex Scheduled Task

第一版采用 Codex Desktop Scheduled Task。

建议频率：每天一次，每次默认处理 1 道菜。

Scheduled Prompt 应只启动父 Orchestrator，不直接塞入所有业务细节；具体规则由仓库中的：

```text
AGENTS.md
workflow/prompts/orchestrator.md
.codex/agents/*.toml
```

提供。

每次定时运行可使用新的父 Agent 上下文。

长期状态来源：

- `workflow/recipe-progress.json`
- `workflow/runs/*.json`
- Git commits
- Supabase KB

如果未来 Scheduled Task 在重试、恢复、日志方面不够稳定，再升级为：

```text
Windows Task Scheduler
        ↓
PowerShell controller
        ↓
codex exec --json --output-schema
```

该升级不改变 Researcher / Editor / Reviewer / RAG 架构。

---

## 19. Resource Test

在正式批量运行前，必须先执行一个 `番茄炒蛋` 的资源能力测试。

目标菜品：

```text
番茄炒蛋
```

初始测试来源：

```text
https://thewoksoflife.com/
https://www.douguo.com/
```

对每个来源输出：

1. 网站名称
2. 原始 URL
3. 菜名
4. 原料
5. 用量
6. 烹饪步骤
7. 烹饪时间
8. 是否成功读取全文
9. 数据获取方式：HTML 正文 / JSON-LD / API / 其他
10. 抓取失败时说明原因

同时验证：

- 能否在网站内搜索目标菜品。
- 能否定位正确详情页。
- 能否完整提取内容。
- 能否 Normalize。
- 能否写入 Supabase。
- 能否生成 chunks。
- 能否通过 Voyage AI `voyage-4` 生成 1024 维向量。
- 能否通过 RAG 查询重新检索回该菜品相关 chunks。

禁止绕过登录、验证码、访问控制或平台反自动化措施。

---

## 20. Supabase 安全要求

- 所有 secrets 放环境变量，不提交 Git。
- `.env.example` 只提供变量名。
- `SUPABASE_SERVICE_ROLE_KEY` 仅允许服务端 / Codex automation 使用。
- 不把 service role key 暴露到浏览器端。
- 知识库写入操作必须通过服务端代码。
- RLS / 权限策略按最小权限原则设计。
- 未来前端若需要 RAG 查询，新增安全 API，不允许前端直接拿 service role key 查询数据库。

建议环境变量：

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
EMBEDDING_PROVIDER=voyage
EMBEDDING_MODEL=voyage-4
EMBEDDING_DIM=1024
EMBEDDING_API_KEY=
```

---

## 21. 成本约束

- Researcher / Editor / Reviewer 使用用户 Codex 订阅，不调用独立聊天模型 API。
- 不为书籍 ingestion 增加额外 Codex Validator。
- Reviewer 不重新搜索网站，不重新查询 RAG。
- Embedding 只对新增或变更 chunks 计算一次。
- 使用 content hash 避免重复 embedding。
- 非 AI 能做的验证全部使用程序完成。
- 自动化默认不运行可能触发 DeepSeek 或其他付费聊天模型调用的测试。

---

## 22. 可观测性与失败策略

每次运行必须能回答：

- 今天处理的是哪道菜？
- Researcher 是否完成？
- 抓到了哪些来源？
- 哪些来源失败？为什么？
- 是否成功入库？
- Editor 重试了几次？
- Validator 是否 PASS？
- Reviewer 是否 PASS？
- build/test 是否 PASS？
- 是否 commit？
- 是否 push？
- 对应 commit SHA 是什么？

失败策略：

- Researcher 有效来源不足 → FAIL。
- Ingestion / Supabase 失败 → FAIL。
- Editor 语法破坏 → Validator FAIL → 最多重试 2 次。
- Reviewer FAIL → Editor 最多重做 2 次。
- 达到最大重试次数 → 记录 `failed`，停止发布。
- 不得因为失败而把目标菜品标记为 `done`。

---

## 23. 第一阶段验收标准

第一阶段仅要求跑通 1 道菜：`番茄炒蛋`。

必须全部满足：

### RAG

- [ ] Supabase 项目连接成功。
- [ ] pgvector 已启用。
- [ ] `kb_sources` 创建成功。
- [ ] `kb_recipe_entities` 创建成功。
- [ ] `kb_documents` 创建成功。
- [ ] `kb_chunks` 创建成功。
- [ ] 至少 2 个独立网站的番茄炒蛋资料成功入库。
- [ ] 已生成 `summary / ingredients / steps / technique / tips` chunks。
- [ ] embedding provider 接口和 Voyage AI 适配器已实现。
- [ ] `voyage-4` 可按 `document` / `query` 输入类型生成并保存 1024 维 embedding。
- [ ] RAG 能检索回番茄炒蛋相关资料。

### 自动化

- [ ] `recipe-progress.json` 可正确选择 `cn-001`。
- [ ] Researcher 能在白名单网站内主动搜索。
- [ ] Researcher 能生成 evidence package。
- [ ] Editor 只修改目标菜品。
- [ ] 非 AI Validator 能识别结构错误。
- [ ] Reviewer 能根据同一 evidence package 输出 PASS/FAIL。
- [ ] `tools/build_html_demo_data.mjs` 成功。
- [ ] 本地 deterministic tests 成功。
- [ ] `recipe-progress.json` 最终正确更新为 `done`。
- [ ] run log 完整。
- [ ] commit 成功。
- [ ] push 到 `codex/recipe-automation` 成功。
- [ ] `main` 未被自动修改。

---

## 24. 推荐实施顺序

Codex 应按以下顺序开发，不要一开始同时修改所有模块。

### Phase 1 — Repository / State

1. 建 `workflow/`。
2. 从现有菜谱生成 `recipe-progress.json`。
3. 创建 `source-config.json`。
4. 建 run log schema。

### Phase 2 — Supabase RAG Base

1. 新建 Supabase migration。
2. 启用 pgvector。
3. 建 sources / recipe_entities / documents / chunks。
4. 建 Supabase server client。
5. 完成去重和 provenance。

### Phase 3 — Ingestion

1. Normalize schema。
2. Chunker。
3. Embedding provider interface 和 Voyage AI `voyage-4` 适配器。
4. Website ingestion。
5. Retrieve / hybrid search。

### Phase 4 — Resource Test

用番茄炒蛋验证：

```text
网站内搜索
→ 抓取
→ Normalize
→ Chunk
→ Supabase
→ Embedding
→ Retrieval
```

### Phase 5 — Agents

1. Researcher。
2. Editor。
3. Reviewer。
4. Orchestrator。

### Phase 6 — Deterministic Validation

1. target-only diff 检查。
2. build。
3. tests。
4. structured results。

### Phase 7 — Scheduled Automation

1. 配置长期自动化分支。
2. 配置 Codex Scheduled Task。
3. 每次只更新 1 道菜。
4. 验证失败恢复。

### Phase 8 — Book Ingestion

网站流程稳定后再加入 PDF / EPUB。

---

## 25. 非目标 / 暂不实现

第一版不要实现：

- 全网搜索。
- 抖音 / 小红书视频抓取。
- n8n。
- Redis / BullMQ。
- 消息队列。
- 微服务拆分。
- worktree。
- 自动 merge main。
- 用户账户系统。
- 用户收藏 / 评论数据库。
- 书籍额外 Reviewer Agent。
- Reviewer 二次 RAG 搜索。
- 本地 embedding model。
- 将正式菜谱整体迁移进 Supabase。

---

## 26. Codex 实施原则

1. **先读现有代码，再改。** 不要假定现有数据结构。
2. 每个 Phase 完成后运行相关测试。
3. 任何自动化写入都必须有可追溯日志。
4. 所有 AI 生成内容必须能追溯到 evidence package。
5. Supabase 是知识库，不是现有正式菜谱数据的替代品。
6. `tools/recipe_data.mjs` 是正式菜谱 canonical source。
7. `data/recipes.js` 是生成文件。
8. 不得为了新架构破坏现有前端。
9. 不得为了“方便”引入未要求的第三方基础设施。
10. 若发现本 Spec 与现有仓库现实冲突，先选择最小兼容改动，并在 run log / implementation note 中记录原因。

---

## 27. Definition of Done

本项目第一版被视为完成，当且仅当：

> Codex Scheduled Task 可以在无人交互情况下启动一个新的父 Agent；父 Agent 从进度文件选择下一道菜，Researcher 在对应白名单网站中主动搜索并抓取资料、把资料写入 Supabase RAG；Editor 根据 evidence package 完整重写目标菜谱；非 AI Validator 与 Reviewer 分别通过程序校验和语义验收；最后自动重新生成 `data/recipes.js`、运行测试、写入日志和进度、提交并 push 到 `codex/recipe-automation`。同时，网站资料已长期沉淀为可追溯的 Document / Chunk / Embedding，未来书籍资料可以通过相同 ingestion pipeline 写入同一知识库。
