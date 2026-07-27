# 烟火有谱｜DeepSeek 公网部署说明

版本：v1.3.0

## 为什么必须部署后端

一句话录入、推荐解释和食材替换现在全部调用 DeepSeek API，不再使用本机规则生成替代结果。

访问者不需要自己的 DeepSeek 密钥，但必须通过你部署的网址访问：

```text
用户浏览器
   ↓ 同源 /api/ai/*
烟火有谱 Node 服务
   ↓ 服务端 DEEPSEEK_API_KEY
DeepSeek API
```

不能把 `DEEPSEEK_API_KEY` 写进 HTML、前端 JavaScript 或公开 GitHub 仓库。只发送 Zip 或使用纯静态托管时，AI 功能会明确不可用。

## 必需环境变量

| 变量 | 示例 | 说明 |
|---|---|---|
| `DEEPSEEK_API_KEY` | `sk-...` | 必填，只放在部署平台的 Secret/Environment 设置中 |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash` | 默认模型，适合常规结构化任务 |
| `PORT` | `8787` | 多数平台会自动注入 |
| `AI_RATE_LIMIT_PER_MINUTE` | `30` | 单 IP 每分钟 AI 请求上限 |
| `AI_TIMEOUT_MS` | `45000` | DeepSeek 请求超时 |
| `TRUST_PROXY` | `true` | 仅在可信反向代理平台上开启 |

不要在部署环境设置自定义 `DEEPSEEK_BASE_URL`，除非你明确使用可信代理。生产环境默认使用 `https://api.deepseek.com`。

## 本机联网测试

1. 把 `.env.example` 复制为 `.env`。
2. 在 `.env` 填写 `DEEPSEEK_API_KEY`。
3. 执行：

```powershell
npm start
```

4. 打开 `http://127.0.0.1:8787`。
5. 访问 `http://127.0.0.1:8787/api/ai/status`，确认 `configured` 为 `true`。

## 通用 Node 部署

部署平台需要满足：

- 支持 Node.js 18 或更高版本；
- 能运行 `npm start`；
- 能配置 Secret 环境变量；
- 能提供 HTTPS 公网域名；
- 网页与 `/api/ai/*` 使用同一域名。

启动命令：

```text
npm start
```

健康检查：

```text
GET /healthz
```

## Vercel 预览部署

当前 Vercel 适配在 `codex/vercel-deployment` 分支开发。首次上线建议先部署这个分支生成 Preview，完整验收后再合并到 `main`。

### 项目结构

```text
GitHub 分支
   → npm run build
dist/ 静态网页与图片
   → Vercel CDN
api/ai/[operation].mjs
   → Vercel Node.js Function
   → DeepSeek API
```

`tools/build_vercel_output.mjs` 只把 `index.html`、`assets/`、`data/`、`src/js/` 和 `src/styles/` 放入 `dist/`。`.env`、`server.mjs`、`package.json` 和服务端源码不会成为公开静态文件。

### Vercel 控制台设置

1. 使用 GitHub 登录 Vercel，并导入私有仓库 `mayiwei442-bojack/yanhuo-youpu`。
2. Production Branch 保持 `main`；`codex/vercel-deployment` 只生成 Preview。
3. `vercel.json` 已声明构建命令 `npm run build` 和输出目录 `dist`，通常不需要在控制台重复填写。
4. 在 Project Settings → Environment Variables 添加下列变量，并至少勾选 Preview：

| 变量 | Preview 建议值 | 是否必需 |
|---|---|---|
| `DEEPSEEK_API_KEY` | 你的真实 DeepSeek Key | 是 |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash` | 建议 |
| `AI_RATE_LIMIT_PER_MINUTE` | `30` | 建议 |
| `AI_TIMEOUT_MS` | `45000` | 建议 |

Vercel 会自动提供端口和代理环境，不要配置 `PORT`，也不需要手动设置 `VERCEL`。真实密钥不得写入 `vercel.json`、GitHub Actions、HTML 或前端 JavaScript。

### Preview 验收

部署成功后依次检查：

```text
GET https://你的预览网址/healthz
GET https://你的预览网址/api/ai/status
```

随后在网页中测试一句话录入、推荐解释和食材替换。三项功能都通过后，才把 `codex/vercel-deployment` 合并到 `main`。

当前每 IP 限流使用函数实例内存，只是基础费用保护；Vercel 多实例之间不会共享计数。正式扩大访问量前，应改用 Vercel Firewall Rate Limiting 或持久化限流服务。

## Docker 部署

构建：

```powershell
docker build -t yanhuo-youpu .
```

运行：

```powershell
docker run --rm -p 8787:8787 --env-file .env yanhuo-youpu
```

本机 `.env` 已被 Git 和 Docker 构建上下文排除。生产环境仍应在平台 Secret 设置中填写密钥，不要把真实密钥保存在命令历史、Dockerfile 或镜像中。

## 已实现的 AI 接口

- `GET /api/ai/status`
- `POST /api/ai/parse-ingredients`
- `POST /api/ai/explain-recommendation`
- `POST /api/ai/suggest-substitutions`

照片识别目前不走 DeepSeek。当前接口会返回明确的 `AI_CAPABILITY_UNAVAILABLE`，照片不会上传。后续需要另外接入支持图像输入的视觉模型。

## 上线前检查

- DeepSeek 账户有可用余额。
- 密钥只存在部署平台 Secret 中。
- 网址使用 HTTPS。
- `/api/ai/status` 显示 DeepSeek 已配置。
- 连续测试一句话录入、推荐解释和替换建议。
- 根据真实访问量调整限流和费用告警。
- 不把 `.env`、日志或用户输入提交到 Git。
