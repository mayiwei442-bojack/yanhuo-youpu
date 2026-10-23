# 烟火有谱｜联网 HTML 产品

当前版本：**v1.4.0（DeepSeek API＋通义千问视觉＋Vercel 适配版）**

更新日期：2026-08-18

菜谱更新：2026-10-07，详见 `workflow/reports/2026-10-07-user-selected-execution.md`。其中千层面可链接到独立肉酱菜谱；来源未知的总时长/份数不再填入默认值。

烟火有谱围绕两条主线工作：根据现有食材选菜谱，以及根据菜谱整理所需食材。智能文字录入、推荐解释和食材替换已经统一接入服务端 DeepSeek API，拍照识别食材接入通义千问视觉模型，不再使用本机规则生成 AI 替代结果。

## 一、能力状态

### 已完成

- 91 道中西餐菜谱和 35 种像素食材（含可从千层面内部链接打开的博洛尼亚肉酱）。
- 根据食材推荐菜谱、根据菜谱生成采购清单。
- DeepSeek 一句话食材录入，候选确认后才加入食材篮。
- DeepSeek 推荐理由解释，不改变产品排序。
- DeepSeek 食材替换建议，并经过食材库与忌口校验。
- 通义千问视觉拍照识别食材，照片本机压缩后上传，候选确认后才加入食材篮。
- 过敏原、忌口与特殊人群食用提醒。
- 图文烹饪教程和无失败、无惩罚的新手小游戏。
- 抖音搜索跳转、Web Share、本机 JSON 备份与恢复。
- 服务端同源限制、请求限流、超时控制和输出校验。
- 右下角圆形菜谱助手：通过现有 Voyage / Supabase RAG 查菜谱、按原料找菜、查询配料用量，交给 DeepSeek 整理回答并展示来源；支持连续追问。

### 需要后续服务

- 微信登录、云同步、正式小程序分享和发布：需要 AppID、云环境和平台配置。

## 二、为什么只分享 HTML 不能使用 AI

DeepSeek API 与通义千问 API 密钥都不能写进 HTML 或浏览器 JavaScript，否则任何访问者都能复制密钥并消耗你的余额。因此 AI 请求必须经过服务端：

```text
浏览器 → 烟火有谱服务端 → DeepSeek API / 通义千问视觉 API
```

访问者不需要购买 DeepSeek，也不需要输入自己的密钥；他们共同使用你部署在服务器上的 API 配置。

直接双击 `index.html` 仍能体验菜谱、食材匹配、清单、教程和小游戏，但 DeepSeek 功能会明确提示需要通过本地服务器或公网部署网址打开，不会回退到本机规则。

## 三、本机运行联网版

项目没有第三方运行依赖，需要 Node.js 18 或更高版本。

1. 把 `.env.example` 复制为 `.env`。
2. 在 `.env` 中填写：

```text
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_MODEL=deepseek-flash
QWEN_API_KEY=你的阿里云百炼密钥
QWEN_VISION_MODEL=qwen-vl-max
```

只填写 DeepSeek 密钥时，文字录入、解释和替换可用，照片识别会明确提示未配置。

3. 启动：

```powershell
npm start
```

4. 打开：

```text
http://127.0.0.1:8787
```

检查 AI 状态：

```text
http://127.0.0.1:8787/api/ai/status
```

菜谱助手还需要在服务端配置 `SUPABASE_URL`、`SUPABASE_SECRET_KEY`（或 `SUPABASE_SERVICE_ROLE_KEY`）和 `EMBEDDING_API_KEY`。继续使用现有的 `voyage-4` / 1024 维设置；知识库项目须处于运行状态。本机启动按系统环境变量、`.env.local`、`.env` 的顺序读取配置。部署时在平台配置这些环境变量。

助手接口为同源 `POST /api/ai/chat`，请求 `{ "message": "宫保鸡丁需要哪些原料？", "history": [] }`。最多保留最近 8 条上下文，每条问题不超过 1000 字。对话保存在当前页面内存中，刷新后清空。回答只引用当前检索到的有效资料，同一道菜使用一个来源版本；资料不足或查询失败时明确说明，不使用本地菜谱冒充 RAG 结果。

`npm run test:assistant` 验证真实检索模块、证据过滤、错误边界及 Vercel 函数打包（上游服务使用 mock）；启动网站后执行 `npm run test:assistant:ui` 验证桌面和手机交互。真实联通仍需使用运行中的 Supabase、Voyage 和 DeepSeek 配置。

## 四、让其他设备正常使用

需要把整个项目部署到支持 Node.js 和 Secret 环境变量的公网平台，并设置 `DEEPSEEK_API_KEY`。网页和 `/api/ai/*` 必须使用同一个 HTTPS 域名。

详细步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。项目同时提供 `Dockerfile`，可以部署到支持容器的平台。

纯静态托管、GitHub Pages、只发送 Zip 或直接双击 HTML 都不能安全提供公共 AI。

Vercel 适配已经在 `codex/vercel-deployment` 分支完成：公开网页会构建到 `dist/`，静态页面与图片交给 Vercel CDN，`/api/ai/*` 由 Vercel Functions 运行。真实密钥只在 Vercel Project Settings 的 Environment Variables 中配置。

## 五、AI 接口设计

文本能力默认模型：`deepseek-flash`；照片识别默认模型：`qwen-vl-max`（阿里云百炼 OpenAI 兼容接口）。

服务端接口：

- `GET /api/ai/status`
- `POST /api/ai/chat`：从 RAG 知识库找菜谱、查询配料用量，支持上下文追问并展示来源。
- `POST /api/ai/parse-ingredients`
- `POST /api/ai/explain-recommendation`
- `POST /api/ai/suggest-substitutions`
- `POST /api/ai/recognize-ingredient-photo`：接收本机压缩后的 base64 照片，由通义千问视觉模型识别；未配置 `QWEN_API_KEY` 时返回明确错误，照片不会上传。

DeepSeek 使用 JSON Output 返回结构化结果，通义千问视觉按提示词约束输出 JSON。服务端会再次检查食材 ID、数量、置信度、替换类型和忌口设置，不直接信任模型输出。

## 六、数据与安全边界

- `DEEPSEEK_API_KEY` 和 `QWEN_API_KEY` 只从服务端 `.env` 或部署平台 Secret 读取。
- `.env` 已被 Git、Docker 和社区包排除。
- 前端、localStorage 和数据备份不包含 API 密钥。
- AI 失败时显示真实错误，不生成本机替代结果。
- AI 不决定过敏原；安全提醒来自明确配料，并按最终实际配料重新检查。
- 服务端不记录用户输入正文。
- 同源校验阻止其他网站直接调用接口。
- 默认每个 IP 每分钟最多 30 次 AI 请求，可通过环境变量调整。
- 列表页只加载缩略图，不一次性加载约 222 MB 的原图。

## 七、主要文件

```text
index.html                         # 网页入口
server.mjs                         # 本机静态服务与 DeepSeek 接口
vercel.json                        # Vercel 构建、路由、缓存和安全响应头
api/
  ai/[operation].mjs              # Vercel DeepSeek 动态函数路由
  healthz.mjs                     # Vercel 健康检查函数
Dockerfile                         # 公网容器部署
DEPLOYMENT.md                      # 部署说明
.env.example                       # DeepSeek 环境变量示例
data/
  recipes.js                      # 91 道菜谱（由 canonical 数据生成）
  ingredients.js                  # 35 种食材及别名
  features.js                     # 功能状态
src/
  js/app.js                       # 页面和业务逻辑
  js/assistant.js                 # 右下角菜谱助手
  js/future-services.js           # DeepSeek 与通义千问视觉前端服务适配器
  server/ai-service.mjs           # 本机与 Vercel 共用的 AI 服务逻辑
  server/rag-assistant.mjs        # RAG 问答、有效证据筛选与来源校验
  rag/                           # 知识库检索、入库和 Embedding 适配
  styles/app.css                  # 响应式视觉样式
tools/                            # 构建、canonical 数据和工作流工具
tests/                            # 页面、助手、接口和构建验收
  fixtures/                      # 测试使用的本地模拟服务器
  workflow/                      # 菜谱与 RAG 工作流回归检查
workflow/                         # 运行进度、来源证据、评审与验收记录
docs/
  中西餐菜品数据库_图片已补全.xlsx   # 菜谱数据源与图片对应表
```

## 八、仓库边界

仓库只保存正式产品源码、运行素材、数据源、部署配置和自动化测试。以下内容仅保留在本机，不提交到 GitHub：

- `.env` 和其他真实密钥文件。
- Trae、社区上传和阶段性开发交接包。
- 旧报名页面、Zip 压缩包和浏览器验收截图。
- `work/`、`.agents/`、`.qa_vibe_plan/` 等本地工作目录。

正在使用的测试统一放在 `tests/`，命令见 [测试说明](tests/README.md)。`tools/` 只保留构建、数据和工作流工具。历史迁移的一次性执行脚本和未被页面使用的食材大图已清理；`workflow/` 中的来源证据、评审和运行记录用于追溯菜谱，继续保留。测试和历史工作流资料已加入 Vercel / Docker 忽略规则，公开构建仅包含页面运行文件。

## 九、验证

```powershell
npm run test:all
```

自动化测试覆盖首页、食材篮、DeepSeek 文字录入、推荐解释、拍照识别弹层、菜谱详情、采购清单、图文烹饪、新手小游戏、菜谱搜索和“我的”，并检查 Vercel 函数路由、公开构建边界、90 张原图、90 张缩略图及密钥泄露风险。DeepSeek 与通义千问视觉的联网流程使用本地模拟服务器验证，不消耗真实 API 额度。
