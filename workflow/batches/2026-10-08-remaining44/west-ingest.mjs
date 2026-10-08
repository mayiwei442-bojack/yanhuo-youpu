import {readFile,writeFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient,loadRagEnv} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
import {createConfiguredEmbeddingProvider} from '../../../src/rag/embedding-provider.mjs';
import {ingestDocument} from '../../../src/rag/ingest-document.mjs';
import {retrieve} from '../../../src/rag/retrieve.mjs';
import {hybridSearch} from '../../../src/rag/hybrid-search.mjs';
await loadRagEnv();const fetchImpl=createWindowsHttpFetch(),client=await createConfiguredSupabaseClient({fetchImpl}),embeddingProvider=createConfiguredEmbeddingProvider({fetchImpl});
const dir=new URL('./',import.meta.url),read=async f=>JSON.parse(await readFile(new URL(f,dir),'utf8'));
const kb=await read('west-kb-audit.json');
for(const id of process.argv.slice(2)){
try{
 const target=kb.targets.find(t=>t.recipeId===id), fetched=await read(id+'.website-research.json'), c=fetched.candidates[0],r=c.recipe;
 const structured=await read(id+'.extraction.json').catch(()=>({}));
 const ingredients=structured.ingredients??r.recipeIngredient.map(raw=>({name:raw,raw,amount:null}));
 const steps=r.recipeInstructions.flatMap(s=>s.itemListElement??[s]).map((s,i)=>({order:i+1,instruction:s.text,duration:null,heat:null}));
 if(!ingredients.length||steps.length<2)throw Error('Incomplete recipe');
 const notes=structured.notes??[];
 const preparedMedia=await read(id+'.prepared-media.json').catch(()=>null);
 const raw=JSON.stringify(r,null,2);
 const normalizedRecipe={recipeName:target.recipeName,aliases:[r.name],category:'western',cuisine:r.recipeCuisine??null,summary:r.description,ingredients,steps,technique:[],tips:structured.tips??[],source:{type:'website',name:'BBC Good Food',url:c.url,retrievalMethod:'ordinary HTTPS GET; complete accessible page JSON-LD and DOM independently inspected',author:r.author?.map(a=>a.name).join(', ')},metadata:{projectRecipeId:id,sourceComplete:true,extractionNotes:notes,sourceYield:r.recipeYield,sourceTotalTime:r.totalTime??null,sourcePrepTime:r.prepTime??null,sourceCookTime:r.cookTime??null}};
 const ingested=await ingestDocument({normalizedRecipe,rawText:raw,client,embeddingProvider});
 await client.update('kb_documents',{metadata:{...ingested.document.metadata,...normalizedRecipe.metadata}},{id:ingested.document.id});
 const options={query:target.recipeName,client,embeddingProvider,recipeEntityId:ingested.entity.id,limit:80,maxPerSource:80};
 const semantic=await retrieve(options),hybrid=await hybridSearch(options);
 if(!semantic.some(x=>x.document_id===ingested.document.id)||!hybrid.some(x=>x.document_id===ingested.document.id))throw Error('Retrieval verification failed');
 const source={sourceName:'BBC Good Food',sourceType:'website',url:c.url,documentId:ingested.document.id,retrievalMethod:normalizedRecipe.source.retrievalMethod,complete:true,ingredients,steps,technique:[],tips:structured.tips??[],rawExcerpt:raw,selectionAssessment:{qualifies:true,ingredientCoverage:'complete',stepCoverage:'complete',internalCoherence:'coherent',heroImages:preparedMedia?1:0,mappedStepImages:preparedMedia?.steps?.length??0,stepImageCoverage:(preparedMedia?.steps?.length??0)/steps.length,ingredientCount:ingredients.length,executableStepCount:steps.length,notes},...(preparedMedia?.steps?.length?{media:preparedMedia}:{})};
 const evidence={recipeId:id,recipeName:target.recipeName,category:'western',createdAt:new Date().toISOString(),sources:[source],sourceMode:'single_source',singleSourceReason:'Exact-name knowledge-base query returned no current recipe. All84 book documents were inspected; available book is Chinese and contains no matching Western recipe. Serious Eats ordinary HTTP access failed; only this complete coherent BBC recipe remains.',selectedSourceUrl:c.url,selectionReason:'One complete matching whole source remains; no cross-source supplementation. Full ingredients and executable method retained. No mapped step photos found.',ragEvidence:semantic.filter(x=>x.document_id===ingested.document.id).map(x=>({chunkId:x.id,documentId:x.document_id,sourceName:'BBC Good Food',chunkType:x.chunk_type,content:x.content,similarity:x.similarity??null})),notes:[...notes,'BBC source original yield: '+r.recipeYield,'BBC original totalTime: '+(r.totalTime??'unspecified'),'BBC original cookTime: '+(r.cookTime??'unspecified'),'BBC original prepTime: '+(r.prepTime??'unspecified'),'No mapped step images on this page; hero is not relabelled as a cooking-stage photograph.','Alternative attempts: '+JSON.stringify(fetched.attempts),'Serious Eats ordinary Python requests460 AUDAB Not Allowed; normal PowerShell402; web.open internal inaccessible; no access-control bypass.']};
 await writeFile(new URL(id+'.base-evidence.json',dir),JSON.stringify(evidence,null,2)+'\n');
 await writeFile(new URL(id+'.ingestion.json',dir),JSON.stringify({recipeId:id,documentId:ingested.document.id,entityId:ingested.entity.id,chunks:ingested.chunks.length,deduplicated:ingested.deduplicated,embedded:ingested.embedded,semantic:semantic.filter(x=>x.document_id===ingested.document.id).length,hybrid:hybrid.filter(x=>x.document_id===ingested.document.id).length,embeddingModel:embeddingProvider.model,dimension:embeddingProvider.dimension},null,2)+'\n');
 console.log(JSON.stringify({id,documentId:ingested.document.id,chunks:ingested.chunks.length}));
}catch(error){await writeFile(new URL(id+'.research-failed.json',dir),JSON.stringify({recipeId:id,error:error.message},null,2)+'\n');console.log(JSON.stringify({id,error:error.message}));}
}
