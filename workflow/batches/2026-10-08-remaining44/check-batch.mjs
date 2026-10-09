import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRecipeCatalog,splitRecipeIngredients,splitRecipeSteps} from '../../../tools/workflow/recipe-state.mjs';
const dir=new URL('./',import.meta.url);
const read=async name=>JSON.parse(await readFile(new URL(name,dir),'utf8'));
const manifest=await read('manifest.json');
const before=await read('before.json');
const catalog=createRecipeCatalog();
assert.equal(catalog.length,before.recipes.length);
const results=[];
for(const item of catalog){
 const old=before.recipes.find(r=>r.id===item.id);
 const target=manifest.recipes.find(r=>r.recipeId===item.id);
 if(!target){assert.deepEqual(item,old,`${item.id} outside requested scope`);continue;}
 const run=JSON.parse(await readFile(new URL(`../../runs/2026-10-08-remaining44-${item.id}.json`,dir),'utf8'));
 if(run.status==='failed'){assert.deepEqual(item,old,`${item.id} failed edit must be unpublished`);results.push({recipeId:item.id,status:'failed',errors:run.errors});continue;}
 if(run.steps.research.details?.publicationGate && run.steps.edit.status==='pending'){
  assert.deepEqual(item,old,`${item.id} pending image decision must remain unchanged`);
  results.push({recipeId:item.id,status:'awaiting_photo_decision',gate:run.steps.research.details.publicationGate});continue;
 }
 const evidenceName=run.steps.research.details?.evidencePath?.split('/').at(-1)??`${item.id}.evidence.json`;
 const raw=(await readFile(new URL(evidenceName,dir),'utf8')).replace(/\r\n/g,'\n');
 const evidence=JSON.parse(raw);
 const review=await read(`${item.id}.review.json`);
 const validation=await read(`${item.id}.validation.json`);
 assert.equal(review.status,'PASS',item.id+' reviewer');
 assert.equal(review.evidencePackageHash,createHash('sha256').update(raw).digest('hex'));
 assert.equal(review.validatorPassed,true);
 assert(Object.values(review.adversarialReview).every(v=>v===true));
 assert.equal(validation.ok,true,item.id+' validator');
 for(const key of ['name','en','region','img'])assert.equal(item.record[key],old.record[key]);
 const chosen=evidence.sources.find(s=>s.url===item.record.source);
 assert(chosen?.complete&&chosen.documentId&&evidence.ragEvidence.length>0);
 if(evidence.sourceMode==='single_source')assert.equal(item.record.source,evidence.selectedSourceUrl,`${item.id} single-source selection`);
 else assert(item.record.source===evidence.selectedSourceUrl||run.steps.research.details?.editorSelectedSourceUrl===item.record.source,`${item.id} editor source selection`);
 const ingredientRows=splitRecipeIngredients(item.record.ingredients);
 for(const row of ingredientRows){
  let depth=0;for(const ch of row){if('（('.includes(ch))depth++;if('）)'.includes(ch))depth--;assert(depth>=0,`${item.id} unmatched bracket: ${row}`);}assert.equal(depth,0,`${item.id} unmatched bracket: ${row}`);
 }
 const steps=splitRecipeSteps(item.record.steps);assert(steps.length>=2);
 if(item.record.textOnly===true){
  const authorizationRaw=(await readFile(new URL('text-only-authorization.json',dir),'utf8')).replace(/\r\n/g,'\n');
  const authorization=JSON.parse(authorizationRaw);
  assert.equal(run.steps.research.details?.textOnlyAuthorization?.authorizationId,authorization.authorizationId);
  assert.equal(run.steps.research.details?.textOnlyAuthorization?.authorizationHash,createHash('sha256').update(authorizationRaw).digest('hex'));
  assert.equal(item.record.media,undefined,`${item.id} text-only recipe has runtime media`);
  results.push({recipeId:item.id,status:'accepted_text_only',sourceType:chosen.sourceType,source:chosen.url,documentId:chosen.documentId,images:0});
 }else{
  const media=item.record.media;assert(media?.hero&&media.steps.length>0);
  assert.equal(media.recipePageUrl,chosen.url);
  for(const image of [media.hero,...media.steps]){
   assert(image.path.startsWith('assets/dishes/sources/'));
   const bytes=await readFile(new URL('../../../'+image.path,dir));
   assert(bytes.length>0);assert.equal(createHash('sha256').update(bytes).digest('hex'),image.sha256);
  }
  results.push({recipeId:item.id,status:'accepted',sourceType:chosen.sourceType,source:chosen.url,documentId:chosen.documentId,images:media.steps.length+1});
 }
}
const result={ok:true,checkedAt:new Date().toISOString(),requested:44,accepted:results.filter(r=>r.status==='accepted'||r.status==='accepted_text_only').length,imageBacked:results.filter(r=>r.status==='accepted').length,textOnly:results.filter(r=>r.status==='accepted_text_only').length,failed:results.filter(r=>r.status==='failed').length,awaitingPhotoDecision:results.filter(r=>r.status==='awaiting_photo_decision').length,results};
await writeFile(new URL('acceptance.json',dir),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
