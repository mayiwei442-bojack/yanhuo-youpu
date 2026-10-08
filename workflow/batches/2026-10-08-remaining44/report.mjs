import {readFile,writeFile} from 'node:fs/promises';
const dir=new URL('./',import.meta.url);
const read=async name=>JSON.parse(await readFile(new URL(name,dir),'utf8'));
const state=await read('state.json');
const counts=Object.fromEntries(['done','failed','in_progress'].map(status=>[status,state.recipes.filter(r=>r.status===status).length]));
const awaitingPhotos=state.recipes.filter(r=>r.status==='in_progress'&&r.steps.research.details?.publicationGate).length;
const lines=['# HowToCook 跳过的 44 道菜谱补充报告','',`分支：[codex/recipe-automation](https://github.com/mayiwei442-bojack/yanhuo-youpu/tree/codex/recipe-automation)。更新时间：${state.updatedAt}。`,`请求44道（中餐22道、西餐22道）；完成${counts.done}道、失败${counts.failed}道、处理中${counts.in_progress}道。`,'','每道菜以完整性和内部自洽优先，其次比较来源图片、可执行步骤和原料覆盖，选择恰好一份完整配方。网站候选与数据库书籍分别保存，不跨来源拼接。新资料写入现有 Supabase 知识库，未变化资料复用文档和向量。','', '## 逐菜结果','','| ID | 菜名 | 状态 | 最终信源或原因 |','| --- | --- | --- | --- |'];
lines.splice(lines.indexOf('## 逐菜结果'),0,`处理中包含${awaitingPhotos}道等待用户答复缺图处理方式。`,'');
for(const r of state.recipes){
 const evidence=await read(`${r.recipeId}.evidence.json`).catch(()=>read(`${r.recipeId}.base-evidence.json`).catch(()=>null));
 const chosen=evidence?.sources.find(s=>s.url===evidence.selectedSourceUrl);
 const source=r.status==='failed'?(r.errors.map(e=>e.message).join('；')||'研究或验收失败'):chosen?(chosen.url?`[${chosen.sourceName}](${chosen.url})`:`${chosen.bookTitle??chosen.sourceName} ${chosen.location??''}`):'研究或验收中';
 const status=r.status==='in_progress'&&r.steps.research.details?.publicationGate?'等待缺图答复':({done:'已完成',failed:'未修改（研究失败）',in_progress:'编辑或验收中'}[r.status]??r.status);
 lines.push(`| ${r.recipeId} | ${r.name} | ${status} | ${source.replaceAll('|','/').replaceAll('\n',' ')} |`);
}
lines.push('','## 验证与来源边界','','完成状态以独立 Reviewer PASS、确定性验证及提交推送均成功为前提。失败菜谱的正式数据保持编辑前版本；具体失败与尝试记录保留在本目录和 `workflow/runs/2026-10-08-remaining44-*.json`。书籍比较见 `cn-book-inventory.json`、`cn-kb-audit.json` 和 `west-kb-audit.json`。','', '本批不合入 howtocook 的24道修改，不合并 main，不部署线上站点。','');
await writeFile(new URL('REPORT.md',dir),lines.join('\n'));
console.log(JSON.stringify(counts));
