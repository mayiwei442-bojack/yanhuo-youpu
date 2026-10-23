# 测试

从仓库根目录运行以下命令。浏览器检查使用 `playwright-core` 和本机 Chrome / Edge；截图与构建产物写入 Git 已忽略的 `outputs/`、`dist/` 和 `.vercel/`。

| 命令 | 用途 |
| --- | --- |
| `npm test` | 页面交互、全部菜谱和响应式呈现 |
| `npm run test:ai` | 文字录入、推荐解释与照片识别接口，使用本地模拟服务 |
| `npm run test:assistant` | 助手检索、来源约束、错误边界与部署函数打包，上游服务使用 mock |
| `npm run test:assistant:ui` | 助手的桌面、手机、追问和重试交互，自动启动本地服务器 |
| `npm run test:vercel` | 构建、Vercel 函数和公开文件边界 |
| `npm run test:workflow:deterministic` | 菜谱、RAG 与来源证据的确定性工作流验收 |
| `npm run test:all` | 页面、AI 接口及 Vercel 的组合检查 |

`fixtures/` 保存测试模拟服务器，`workflow/` 保存 RAG、菜谱校验和来源政策检查。需要更细的检查时，使用 `package.json` 中的 `test:rag:*`、`test:workflow:*` 命令。

检查需串行运行，避免同时写入同一个构建目录或使用相同端口。计划菜谱任务按 `AGENTS.md` 运行确定性检查，不调用 `test:ai`。旧运行记录中的 `tools/test_*` 路径是执行当时的历史记录；当前命令已统一使用 `tests/`。
