import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../../',import.meta.url);
const dir=new URL('./',import.meta.url);
const read=async url=>JSON.parse(await readFile(url,'utf8'));
const save=async(url,value)=>writeFile(url,JSON.stringify(value,null,2)+'\n');
const manifest=await read(new URL('manifest.json',dir));
const progressUrl=new URL('recipe-progress.json',root);
const progress=await read(progressUrl);
const [command,id,...args]=process.argv.slice(2);
const now=new Date().toISOString();
for(const recipe of manifest.recipes.filter(r=>!id||r.recipeId===id)){
 const runId=`2026-10-08-remaining44-${recipe.recipeId}`;
 const runUrl=new URL(`runs/${runId}.json`,root);
 const entry=progress[recipe.category].find(r=>r.id===recipe.recipeId);
 let run=await read(runUrl).catch(()=>null);
 if(command==='init'){
  if(run)continue;
  run={runId,recipeId:recipe.recipeId,recipeName:recipe.recipeName,category:recipe.category,status:'in_progress',startedAt:now,completedAt:null,steps:Object.fromEntries(['research','ingestion','edit','validator','review','build','gitPush'].map(s=>[s,{status:s==='research'?'in_progress':'pending',attempts:s==='research'?1:0}])),sources:[],errors:[],branch:'codex/recipe-automation',commit:null};
  Object.assign(entry,{status:'in_progress',lastRunId:runId,completedAt:null});
 }else if(command==='resume'){
  const historyUrl=new URL(`${recipe.recipeId}.run-history.json`,dir);
  const history=await read(historyUrl).catch(()=>[]);
  history.push({status:run.status,errors:run.errors,completedAt:run.completedAt,resumedAt:now});
  await save(historyUrl,history);
  run.status='in_progress';run.completedAt=null;run.errors=[];
  Object.assign(entry,{status:'in_progress',completedAt:null});
 }else if(command==='evidence'||command==='candidate'){
  const evidenceName=`${recipe.recipeId}.${command==='candidate'?'base-evidence':'evidence'}.json`;
  const raw=(await readFile(new URL(evidenceName,dir),'utf8')).replace(/\r\n/g,'\n');
  const evidence=JSON.parse(raw);
  const selected=evidence.sources.find(s=>s.url===evidence.selectedSourceUrl);
  if(!selected?.complete||!selected.documentId||!evidence.ragEvidence.length)throw Error('Incomplete evidence');
  run.steps.research={status:'done',attempts:1,details:{evidencePath:`workflow/batches/2026-10-08-remaining44/${evidenceName}`,evidencePackageHash:createHash('sha256').update(raw).digest('hex'),selectedSourceUrl:evidence.selectedSourceUrl,sourceMode:evidence.sourceMode,...(evidence.singleSourceReason?{singleSourceReason:evidence.singleSourceReason}:{}),...(command==='candidate'?{publicationGate:'Final image/evidence acceptance pending'}:{})}};
  run.steps.ingestion={status:'done',attempts:1,details:{selectedDocumentId:selected.documentId,documentIds:evidence.sources.map(s=>s.documentId),ragEvidence:evidence.ragEvidence.length}};
  run.sources=evidence.sources.map(s=>({name:s.sourceName,url:s.url,status:'success',failureReason:null}));
 }else if(command==='step'){
  const [step,status,detailsPath]=args;
  const details=detailsPath?await read(new URL(detailsPath,root)):{};
  run.steps[step]={status,attempts:Math.max(1,run.steps[step].attempts),details};
 }else if(command==='research-failure'){
  const failure=await read(new URL(`${recipe.recipeId}.research-failure.json`,dir));
  if(failure.status!=='failed'||failure.recipeId!==recipe.recipeId)throw Error('Failure record mismatch');
  run.status='failed';run.completedAt=now;
  run.steps.research={status:'failed',attempts:1,details:{resultPath:`workflow/batches/2026-10-08-remaining44/${recipe.recipeId}.research-failure.json`,bookSearch:failure.bookSearch}};
  run.errors=[{step:'research',code:'NO_QUALIFYING_COMPLETE_SOURCE',message:failure.reason,at:now}];
  run.sources=(failure.attemptedSources??run.sources).map(s=>({name:s.source??s.name,url:s.url??null,status:'failed',failureReason:s.result??failure.reason}));
  entry.status='failed';entry.completedAt=now;
 }else if(command==='fail'){
  const [step,...message]=args;
  run.status='failed';run.completedAt=now;
  run.steps[step]={...run.steps[step],status:'failed',attempts:Math.max(1,run.steps[step].attempts)};
  run.errors.push({step,code:'RECIPE_ACCEPTANCE_FAILED',message:message.join(' '),at:now});
  entry.status='failed';entry.completedAt=now;
 }else if(command==='publish'){
  const commit=args[0];
  if(!commit||!['research','ingestion','edit','validator','review','build'].every(s=>run.steps[s].status==='done'))throw Error(`${recipe.recipeId} not ready`);
  const finalChecks=await read(new URL('deterministic-result.json',dir));
  if(finalChecks.ok!==true||finalChecks.exitCode!==0)throw Error('Final deterministic suite not passed');
  run.status='done';run.completedAt=now;run.commit=commit;run.steps.gitPush={status:'done',attempts:1,details:{publishedCommit:commit}};
  Object.assign(entry,{status:'done',lastRunId:runId,completedAt:now});
 }else throw Error('Unknown command '+command);
 await save(runUrl,run);
}
await save(progressUrl,progress);
const rows=[];
for(const recipe of manifest.recipes){const run=await read(new URL(`runs/2026-10-08-remaining44-${recipe.recipeId}.json`,root)).catch(()=>null);rows.push({recipeId:recipe.recipeId,name:recipe.recipeName,status:run?.status??'pending',steps:run?.steps,errors:run?.errors??[]});}
await save(new URL('state.json',dir),{updatedAt:now,branch:'codex/recipe-automation',recipes:rows});
console.log(JSON.stringify({command,id,done:rows.filter(r=>r.status==='done').length,failed:rows.filter(r=>r.status==='failed').length,inProgress:rows.filter(r=>r.status==='in_progress').length}));
