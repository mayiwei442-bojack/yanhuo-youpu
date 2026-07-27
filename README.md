# 烟火有谱｜联网 HTML 产品

当前版本：**v1.3.0（DeepSeek API＋Vercel 适配版）**

更新日期：2026-07-27

烟火有谱围绕两条主线工作：根据现有食材选菜谱，以及根据菜谱整理所需食材。智能文字录入、推荐解释和食材替换已经统一接入服务端 DeepSeek API，不再使用本机规则生成 AI 替代结果。

## 一、能力状态

### 已完成

- 90 道中西餐菜谱和 35 种像素食材。
- 根据食材推荐菜谱、根据菜谱生成采购清单。
- DeepSeek 一句话食材录入，候选确认后才加入食材篮。
- DeepSeek 推荐理由解释，不改变产品排序。
- DeepSeek 食材替换建议，并经过食材库与忌口校验。
- 过敏原、忌口与特殊人群食用提醒。
- 图文烹饪教程和无失败、无惩罚的新手小游戏。
- 抖音搜索跳转、Web Share、本机 JSON 备份与恢复。
- 服务端同源限制、请求限流、超时控制和输出校验。

### 需要后续服务

- 照片识别：当前 DeepSeek Chat Completions 是文本输入，需要另接视觉模型。
- 微信登录、云同步、正式小程序分享和发布：需要 AppID、云环境和平台配置。

## 二、为什么只分享 HTML 不能使用 AI

DeepSeek API 密钥不能写进 HTML 或浏览器 JavaScript，否则任何访问者都能复制密钥并消耗你的余额。因此 AI 请求必须经过服务端：

```text
浏览器 → 烟火有谱服务端 → DeepSeek API
```

访问者不需要购买 DeepSeek，也不需要输入自己的密钥；他们共同使用你部署在服务器上的 API 配置。

直接双击 `index.html` 仍能体验菜谱、食材匹配、清单、教程和小游戏，但 DeepSeek 功能会明确提示需要通过本地服务器或公网部署网址打开，不会回退到本机规则。

## 三、本机运行 DeepSeek 版本

项目没有第三方运行依赖，需要 Node.js 18 或更高版本。

1. 把 `.env.example` 复制为 `.env`。
2. 在 `.env` 中填写：

```text
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_MODEL=deepseek-v4-flash
```

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

## 四、让其他设备正常使用

需要把整个项目部署到支持 Node.js 和 Secret 环境变量的公网平台，并设置 `DEEPSEEK_API_KEY`。网页和 `/api/ai/*` 必须使用同一个 HTTPS 域名。

详细步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。项目同时提供 `Dockerfile`，可以部署到支持容器的平台。

纯静态托管、GitHub Pages、只发送 Zip 或直接双击 HTML 都不能安全提供公共 AI。

Vercel 适配已经在 `codex/vercel-deployment` 分支完成：公开网页会构建到 `dist/`，静态页面与图片交给 Vercel CDN，`/api/ai/*` 由 Vercel Functions 运行。真实密钥只在 Vercel Project Settings 的 Environment Variables 中配置。

## 五、DeepSeek 接口设计

默认模型：`deepseek-v4-flash`。

服务端接口：

- `GET /api/ai/status`
- `POST /api/ai/parse-ingredients`
- `POST /api/ai/explain-recommendation`
- `POST /api/ai/suggest-substitutions`
- `POST /api/ai/recognize-ingredient-photo`：当前返回视觉能力未接入，不上传照片。

DeepSeek 使用 JSON Output 返回结构化结果。服务端会再次检查食材 ID、数量、置信度、替换类型和忌口设置，不直接信任模型输出。

## 六、数据与安全边界

- `DEEPSEEK_API_KEY` 只从服务端 `.env` 或部署平台 Secret 读取。
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
  recipes.js                      # 90 道菜谱
  ingredients.js                  # 35 种食材及别名
  features.js                     # 功能状态
src/
  js/app.js                       # 页面和业务逻辑
  js/future-services.js           # DeepSeek 前端服务适配器
  server/ai-service.mjs           # 本机与 Vercel 共用的 DeepSeek 服务逻辑
  styles/app.css                  # 响应式视觉样式
tools/build_vercel_output.mjs      # 生成只含公开网页资源的 dist
tools/test_html_demo.mjs           # 浏览器自动化验收
tools/test_vercel_functions.mjs    # Vercel 函数、构建与密钥边界验收
docs/
  中西餐菜品数据库_图片已补全.xlsx   # 菜谱数据源与图片对应表
```

## 八、仓库边界

仓库只保存正式产品源码、运行素材、数据源、部署配置和自动化测试。以下内容仅保留在本机，不提交到 GitHub：

- `.env` 和其他真实密钥文件。
- Trae、社区上传和阶段性开发交接包。
- 旧报名页面、Zip 压缩包和浏览器验收截图。
- `work/`、`.agents/`、`.qa_vibe_plan/` 等本地工作目录。

## 九、验证

```powershell
npm run test:all
```

自动化测试覆盖首页、食材篮、DeepSeek 文字录入、推荐解释、菜谱详情、采购清单、图文烹饪、新手小游戏、菜谱搜索和“我的”，并检查 Vercel 函数路由、公开构建边界、90 张原图、90 张缩略图及密钥泄露风险。DeepSeek 联网流程使用本地模拟服务器验证，不消耗真实 API 额度。
