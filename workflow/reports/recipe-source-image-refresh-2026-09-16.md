# 21 道已更新菜谱：单一完整信源与本地图片刷新

- 批次：`2026-09-16-source-image-refresh-21`
- 分支：`codex/recipe-automation`
- 状态：执行中
- 图片授权：用户已确认网站图片可复制进仓库。
- RAG：Researcher 获取的每个新增或变化有效来源独立写入 Supabase；未变化来源复用现有 document/chunk/embedding。
- Editor：单来源直接采用；多来源按完整性、图片及覆盖率、步骤丰富度、原料丰富度选择一个完整来源，禁止跨来源补充。
- 图片：选中来源的成品图和可准确映射的步骤图复制到 `assets/dishes/sources/<recipe-id>-<slug>/`；前端只加载本地文件，原始 URL 仅作 provenance。
- 失败：单道失败后记录原因并继续下一道；只有共享基础设施或仓库发布无法安全继续时才停整批。

## 执行结果

执行完成后在此写入 21 道逐项来源、图片数量、数据库写入/复用、Editor、Reviewer、测试、提交及失败原因。
