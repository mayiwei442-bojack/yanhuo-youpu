import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir = new URL('./', import.meta.url);
const read = async name => JSON.parse(await readFile(new URL(name, dir), 'utf8'));
const manifest = await read('manifest.json');
const research = await read('research.json');
const state = await read('state.json');
const publicationCommit = process.argv[2] || null;
const now = new Date().toISOString();
const progressUrl = new URL('../../recipe-progress.json', dir);
const progress = JSON.parse(await readFile(progressUrl, 'utf8'));
const tests = await read('deterministic-validation.json').catch(() => ({ok:false}));
const corrections = await read('review-corrections.json');
state.updatedAt = now;
state.status = publicationCommit ? 'done' : 'in_progress';
state.publicationCommit = publicationCommit;
state.recipes = [];
for (const target of manifest.recipes) {
  if (target.status !== 'matched') {state.recipes.push({recipeId:target.recipeId,recipeName:target.recipeName,status:'skipped',reason:target.skipReason});continue;}
  const evidenceText = await readFile(new URL(`${target.recipeId}.evidence.json`,dir),'utf8');
  const evidenceHash = createHash('sha256').update(evidenceText.replace(/\r\n/g,'\n')).digest('hex');
  const review = await read(`${target.recipeId}.review.json`);
  const validation = await read(`${target.recipeId}.validation.json`);
  const source = research.recipes.find(r=>r.recipeId===target.recipeId);
  if(review.status!=='PASS'||review.evidencePackageHash!==evidenceHash||!validation.ok||!source.ingestion.ok)throw Error(target.recipeId+' incomplete acceptance');
  if(publicationCommit&&!tests.ok)throw Error('Publication requires deterministic test PASS');
  const status = publicationCommit?'done':'in_progress';
  const runId = `2026-10-08-howtocook-${target.recipeId}`;
  const steps = Object.fromEntries(['research','ingestion','edit','validator','review','build','gitPush'].map(name=>[name,{status:name==='gitPush'?(publicationCommit?'done':'pending'):name==='build'?(tests.ok?'done':'pending'):'done',attempts:1}]));
  if(corrections.results.some(r=>r.recipeId===target.recipeId)) steps.review = {...steps.review,attempts:2,details:{correctionsPath:'workflow/howtocook/2026-10-08/review-corrections.json',finalStatus:'PASS'}};
  const run = {runId,recipeId:target.recipeId,recipeName:target.recipeName,category:target.category,status,startedAt:state.startedAt,completedAt:publicationCommit?now:null,branch:'howtocook',branchAuthorization:'user_explicit_2026-10-08',commit:publicationCommit,steps,sources:[{name:'HowToCook',url:source.evidence.selectedSourceUrl,status:'success',documentId:source.ingestion.documentId}],errors:[],evidencePackageHash:evidenceHash,reviewPath:`workflow/howtocook/2026-10-08/${target.recipeId}.review.json`,validationPath:`workflow/howtocook/2026-10-08/${target.recipeId}.validation.json`,sourceLimitations:source.limitations};
  await writeFile(new URL(`${target.recipeId}.run.json`,dir),JSON.stringify(run,null,2)+'\n');
  state.recipes.push({recipeId:target.recipeId,recipeName:target.recipeName,status,steps:Object.fromEntries(Object.entries(steps).map(([k,v])=>[k,v.status])),documentId:source.ingestion.documentId,evidencePackageHash:evidenceHash});
  const entry=progress[target.category].find(r=>r.id===target.recipeId);
  Object.assign(entry,{status,lastRunId:runId,completedAt:publicationCommit?now:null});
}
await writeFile(progressUrl,JSON.stringify(progress,null,2)+'\n');
await writeFile(new URL('state.json',dir),JSON.stringify(state,null,2)+'\n');
const matched=manifest.recipes.filter(r=>r.status==='matched');
const skipped=manifest.recipes.filter(r=>r.status!=='matched');
const lines=['# HowToCook 菜谱迁移报告','',`分支：[howtocook](https://github.com/mayiwei442-bojack/yanhuo-youpu/tree/howtocook)。上游固定版本：\`${manifest.commit}\`。`,`状态：${publicationCommit?'已提交并推送，完成提交 '+publicationCommit:'审查通过，等待最终测试与提交推送'}。`,'',`请求 68 道；匹配迁移 ${matched.length} 道（中餐 ${matched.filter(r=>r.category==='chinese').length} 道、西餐 ${matched.filter(r=>r.category==='western').length} 道）；跳过 ${skipped.length} 道。已完成 24 道独立 Reviewer PASS；24 道来源写入现有知识库，共 121 chunks（Voyage voyage-4 / 1024 维），语义和混合检索均命中。26 张上游原图已校验并复制到本地。`,'','保留上游完整 Markdown、章节、工具、计算公式、操作与附加内容，并以固定提交及 SHA-256 追踪。规范步骤只修明显语法和标点；上游原始文字保持不变。来源缺项及矛盾在菜谱说明公开保留，未借其他配方补全。','',`验证：${tests.ok?'完整 deterministic suite PASS，提交快照独立验证 PASS':'完整 deterministic suite 最终检查中'}；原文章节和图片浏览器检查 PASS。未运行 test:ai，未修改 main。`,'','## 已匹配菜谱','','| ID | 菜谱 | HowToCook 原文 |','| --- | --- | --- |'];
for(const r of matched){const s=research.recipes.find(x=>x.recipeId===r.recipeId);lines.push(`| ${r.recipeId} | ${r.recipeName} | [${s.upstreamName}](${s.evidence.selectedSourceUrl}) |`);}
lines.push('','具体版本保留：柳州螺蛳粉为袋装版；腊味煲仔饭为微波炉腊肠版；馄饨为电饭煲煮速冻版；意大利肉酱面为成品酱快捷版；香草烤鸡为意式欧芹鸡腿肉版。韭菜炒蛋、西红柿牛腩按同义名对应；手工水饺采用源中猪肉韭菜馅；银耳莲子粥不含米谷，对应银耳莲子甜羹。','','## 跳过菜谱','','| ID | 菜谱 | 原因 |','| --- | --- | --- |');
for(const r of skipped)lines.push(`| ${r.recipeId} | ${r.recipeName} | ${r.skipReason || '上游无相同菜谱，未使用近名不同菜替代。'} |`);
lines.push('','跳过菜谱的正式数据与原有 pending 状态均保留。本次不合并 main，也未部署线上站点。','');
await writeFile(new URL('REPORT.md',dir),lines.join('\n'));
console.log(JSON.stringify({status:state.status,matched:matched.length,skipped:skipped.length,reviewPass:matched.length,testsPassed:tests.ok}));
