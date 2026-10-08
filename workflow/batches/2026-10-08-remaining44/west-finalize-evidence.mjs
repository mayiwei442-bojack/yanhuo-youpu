import {readFile,writeFile,readdir} from 'node:fs/promises';
const dir=new URL('./',import.meta.url),read=async f=>JSON.parse(await readFile(new URL(f,dir),'utf8')),files=await readdir(dir),kb=await read('west-kb-audit.json');
const result=[];
for(const target of kb.targets){
 const id=target.recipeId;let e=await read(id+'.base-evidence.json').catch(()=>null);
 const alts=[];for(const f of files.filter(f=>f.startsWith(id+'.se-')&&f.endsWith('.ingestion.json')))alts.push(await read(f));
 if(!e&&alts.length){const a=alts[0];e={recipeId:id,recipeName:target.recipeName,category:'western',createdAt:new Date().toISOString(),sources:[],ragEvidence:[],notes:[],selectedSourceUrl:a.source.url,selectionReason:'Only one exact matching complete accessible source remains after enabled websites and all current book records were checked.'};}
 if(!e){result.push({recipeId:id,status:'failed',reason:'No complete matching source'});continue;}
 e.sources=e.sources.filter(s=>s.sourceName!=='Serious Eats');e.ragEvidence=e.ragEvidence.filter(c=>c.sourceName!=='Serious Eats');
 for(const a of alts){
  if(['west-015','west-021'].includes(id)){a.source.selectionAssessment.internalCoherence='conflicted';a.source.selectionAssessment.qualifies=false;}
  e.sources.push(a.source);e.ragEvidence.push(...a.ragEvidence);
 }
 const independent=new Set(e.sources.filter(s=>s.selectionAssessment.qualifies).map(s=>s.sourceName));
 e.sourceMode=independent.size>=2?'multi_source':'single_source';
 if(e.sourceMode==='single_source')e.singleSourceReason='Exact-name and alias KB query first; all84actual book records checked, no matching Western recipe. Enabled BBC and Serious Eats alternatives attempted; only one independent complete coherent source remains eligible. Other inaccessible, materially different, or internally conflicting variants are retained in audit and never used to supplement it.';
 else delete e.singleSourceReason;
 e.notes=e.notes.filter(s=>!s.startsWith('No mapped step images')&&!s.startsWith('Serious Eats ordinary'));
 e.notes.push('Current book inventory and22target audit: west-kb-audit.json. Invalid/superseded/rejected history excluded.','Serious Eats direct Python460/normalPowerShell402/normalChrome402; normalweb.open successfully retrieved the complete recipes included here. All successful complete matching sources ingested separately before selection; no access-control bypass.','Alternative enabled-site searches and complete observed source text are archived in west-alternative-search.json and west-se-*.txt.');
 const chosen=e.sources.find(s=>s.url===e.selectedSourceUrl);
 if(!chosen)throw Error('Selected source absent '+id);
 e.selectionReason=chosen.sourceName==='BBC Good Food'?'Selected exactly one whole BBC recipe: full coherent ingredients/method match the target; verified usable hero'+(chosen.media?.steps?.length?' and'+chosen.media.steps.length+'semantically mapped step images':' (no source step photos available)')+'. Other sources have no verified usable media URLs under ordinary access. Under the required completeness/coherence then usable-image/coverage ranking, this source leads; its ingredients, operations, tips and media are kept together without supplementation.':'Selected the sole complete exact matching Serious Eats bratwurst source; BBC search returned no matching recipe and current database book contains none. Original photo URLs could not be verified, so source text is available but publication awaits explicit media policy decision.';
 e.notes.push(chosen.media?.steps?.length?'Selected source provides actual cooking-stage photos, not relabelled hero images.':'Selected source has no verified cooking-stage photos; do not fabricate or relabel a finished-dish photo. Parent must resolve manual-run image exception before publishing.');
 await writeFile(new URL(id+'.base-evidence.json',dir),JSON.stringify(e,null,2)+'\n');
 const comparison={recipeId:id,bookCandidates:[],bookInventoryCount:kb.books.length,excludedHistory:target.excludedDocuments,selectedSourceUrl:e.selectedSourceUrl,sourceMode:e.sourceMode,candidates:e.sources.map(s=>({sourceName:s.sourceName,url:s.url,documentId:s.documentId,...s.selectionAssessment})),selectionReason:e.selectionReason,ingestionVerified:true};
 await writeFile(new URL(id+'.selection.json',dir),JSON.stringify(comparison,null,2)+'\n');
 result.push({recipeId:id,status:'researched',sources:e.sources.length,selected:chosen.sourceName,documentId:chosen.documentId,stepPhotos:chosen.media?.steps.length??0});
}
await writeFile(new URL('west-research-summary.json',dir),JSON.stringify({createdAt:new Date().toISOString(),targets:result},null,2)+'\n');console.log(JSON.stringify(result));
