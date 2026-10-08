import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createConfiguredSupabaseClient} from '../../../src/rag/supabase-client.mjs';
import {createConfiguredEmbeddingProvider} from '../../../src/rag/embedding-provider.mjs';
import {ingestDocument} from '../../../src/rag/ingest-document.mjs';
import {retrieve} from '../../../src/rag/retrieve.mjs';
import {hybridSearch} from '../../../src/rag/hybrid-search.mjs';
const dir=new URL('./',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('manifest.json',dir),'utf8'));
const researchFile=process.argv.includes('--additions')?'research-additions.json':process.argv.includes('--correction')?'research-correction.json':'research.json';
// Curl config travels only on stdin. Credentials are never command arguments or logs.
const fetchImpl=async(url,options={})=>{
 const config=['url = '+JSON.stringify(String(url)),'proxy = "http://127.0.0.1:7897"','silent','show-error','max-time = 60','request = '+JSON.stringify(options.method||'GET'),...Object.entries(options.headers||{}).map(([k,v])=>'header = '+JSON.stringify(k+': '+v)),...(options.body?['data = '+JSON.stringify(options.body)]:[])].join('\n');
 const r=spawnSync('curl.exe',['--config','-','--write-out','\n%{http_code}'],{input:config,encoding:'utf8',windowsHide:true,maxBuffer:32*1024*1024,timeout:70000});
 if(r.status!==0)throw new Error('Proxy HTTP transport failure');
 const i=r.stdout.lastIndexOf('\n');return new Response(r.stdout.slice(0,i),{status:Number(r.stdout.slice(i+1)),headers:{'content-type':'application/json'}});
};
const client=await createConfiguredSupabaseClient({fetchImpl});
const excluded=new Set(['invalid','superseded','rejected']);
if(process.argv.includes('--query')){
 const results=[];
 for(const r of manifest.recipes){
  const documents=(await client.select('kb_documents',{filters:{recipe_name:r.recipeName},columns:'id,recipe_name,url,metadata,normalized_json'})).filter(d=>!excluded.has(d.metadata?.evidenceStatus));
  const chunks=[];for(const d of documents)chunks.push(...(await client.select('kb_chunks',{filters:{document_id:d.id},columns:'id,document_id,chunk_type,content,metadata'})).filter(c=>!excluded.has(c.metadata?.evidenceStatus)));
  results.push({recipeId:r.recipeId,recipeName:r.recipeName,documents,chunks});console.log(r.recipeId+' query '+documents.length+' documents');
 }
 await writeFile(new URL('rag-before.json',dir),JSON.stringify({queriedAt:new Date().toISOString(),results},null,2));
}else{
 const provider=createConfiguredEmbeddingProvider({fetchImpl});
 const batch=JSON.parse(await readFile(new URL(researchFile,dir),'utf8'));
 const before=JSON.parse(await readFile(new URL('rag-before.json',dir),'utf8'));
 for(const r of batch.recipes){
  try{
   const source=r.evidence.sources[0];
   const metadata={projectRecipeId:r.recipeId,upstreamCommit:manifest.commit,upstreamPath:r.path,rawMarkdownSha256:r.sha256,sourceComplete:true,sourceLimitations:r.limitations,userDirectedUpstreamTranscription:'2026-10-08',howtocook:{commit:manifest.commit,path:r.path,rawMarkdown:r.rawMarkdown,sections:r.sections}};
   const previous=await client.select('kb_documents',{filters:{url:source.url},columns:'id,metadata'});
   const result=await ingestDocument({normalizedRecipe:{recipeName:r.recipeName,category:r.category,aliases:r.upstreamName!==r.recipeName?[r.upstreamName]:[],summary:r.introduction||r.recipeName,ingredients:source.ingredients,steps:source.steps,technique:source.technique,tips:source.tips,metadata,source:{type:'website',name:'HowToCook',url:source.url,retrievalMethod:source.retrievalMethod}},rawText:r.rawMarkdown,client,embeddingProvider:provider});
   const merged={...result.document.metadata,...metadata};
   await client.update('kb_documents',{metadata:merged},{id:result.document.id});
   for(const c of result.chunks)await client.update('kb_chunks',{metadata:{...c.metadata,...metadata}},{id:c.id,document_id:result.document.id});
   const superseded=[];
   for(const old of previous.filter(d=>d.id!==result.document.id)){
    const audit={evidenceStatus:'superseded',replacementDocumentId:result.document.id,correctionReason:'Remove tools and explanatory bullet rows from normalized ingredients; retain unchanged full upstream raw Markdown.'};
    await client.update('kb_documents',{metadata:{...old.metadata,...audit}},{id:old.id});
    for(const c of await client.select('kb_chunks',{filters:{document_id:old.id},columns:'id,metadata'}))await client.update('kb_chunks',{metadata:{...c.metadata,...audit}},{id:c.id});
    superseded.push(old.id);
   }
   source.documentId=result.document.id;
   const semantic=await retrieve({query:r.recipeName,client,embeddingProvider:provider,recipeEntityId:result.entity.id,limit:20,maxPerSource:20});
   const hybrid=await hybridSearch({query:r.recipeName,client,embeddingProvider:provider,recipeEntityId:result.entity.id,limit:20,maxPerSource:20});
   r.ingestion={ok:true,documentId:result.document.id,entityId:result.entity.id,deduplicated:result.deduplicated,embedded:result.embedded,chunkCount:result.chunks.length,model:provider.model,dimension:provider.dimension,semanticCount:semantic.filter(c=>c.document_id===result.document.id).length,hybridCount:hybrid.filter(c=>c.document_id===result.document.id).length,supersededDocumentIds:superseded,excludedFromSemantic:!semantic.some(c=>superseded.includes(c.document_id)),excludedFromHybrid:!hybrid.some(c=>superseded.includes(c.document_id))};
   if(!r.ingestion.semanticCount||!r.ingestion.hybridCount)throw new Error('Post-ingest retrieval did not find document');
   r.evidence.ragEvidence=semantic.filter(c=>c.document_id===result.document.id).map(c=>({chunkId:c.id,documentId:c.document_id,sourceName:'HowToCook',chunkType:c.chunk_type,content:c.content,similarity:c.similarity??null}));
   r.evidence.notes.push('Existing exact-name knowledge-base documents checked before source fetching: '+(before.results.find(x=>x.recipeId===r.recipeId)?.documents.length??0));
   await writeFile(new URL(r.recipeId+'.evidence.json',dir),JSON.stringify(r.evidence,null,2));
   console.log(r.recipeId+' INGEST OK '+result.document.id+' semantic='+r.ingestion.semanticCount+' hybrid='+r.ingestion.hybridCount);
  }catch(e){r.ingestion={ok:false,error:e.message};console.log(r.recipeId+' FAILED '+e.message);}
  await writeFile(new URL(researchFile,dir),JSON.stringify(batch,null,2));
 }
}
