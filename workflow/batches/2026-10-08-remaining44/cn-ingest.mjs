import {readFile,writeFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
import {createConfiguredEmbeddingProvider} from '../../../src/rag/embedding-provider.mjs';
import {ingestDocument} from '../../../src/rag/ingest-document.mjs';
import {retrieve} from '../../../src/rag/retrieve.mjs';
import {hybridSearch} from '../../../src/rag/hybrid-search.mjs';
const dir=new URL('./',import.meta.url),id=process.argv[2]; const e=JSON.parse(await readFile(new URL(`${id}.draft-evidence.json`,dir)));
const fetchImpl=createWindowsHttpFetch(); const client=await createConfiguredSupabaseClient({fetchImpl});const embeddingProvider=createConfiguredEmbeddingProvider({fetchImpl});const audit=[];
for(const s of e.sources){if(s.sourceType==='book')continue;
const normalizedRecipe={recipeName:e.recipeName,category:e.category,cuisine:'中餐',aliases:[],summary:`完整单一信源：${s.url}`,ingredients:s.ingredients,steps:s.steps,technique:s.technique,tips:s.tips,metadata:{projectRecipeId:id,sourceComplete:true,mediaReferences:s.media},source:{type:s.sourceType,name:s.sourceName,url:s.url,author:s.media?.author,retrievalMethod:s.retrievalMethod}};
const x=await ingestDocument({normalizedRecipe,rawText:s.rawExcerpt,client,embeddingProvider});s.documentId=x.document.id;audit.push({documentId:s.documentId,url:s.url,deduplicated:x.deduplicated,embedded:x.embedded,chunkCount:x.chunks.length,model:embeddingProvider.model,dimension:embeddingProvider.dimension});}
const entity=(await client.select('kb_recipe_entities',{filters:{canonical_name:e.recipeName},limit:1}))[0];const semantic=await retrieve({query:e.recipeName,recipeEntityId:entity?.id,client,embeddingProvider,limit:40,maxPerSource:40});const hybrid=await hybridSearch({query:e.recipeName,recipeEntityId:entity?.id,client,embeddingProvider,limit:40,maxPerSource:40});
e.ragEvidence=semantic.map(c=>({chunkId:c.id,documentId:c.document_id,sourceName:c.metadata.sourceName,chunkType:c.chunk_type,content:c.content,similarity:c.similarity??null}));
for(const a of audit){a.semanticCount=semantic.filter(c=>c.document_id===a.documentId).length;a.hybridCount=hybrid.filter(c=>c.document_id===a.documentId).length;if(!a.semanticCount||!a.hybridCount)throw Error('retrieval verification failed');}
await writeFile(new URL(`${id}.base-evidence.json`,dir),JSON.stringify(e,null,2)+'\n');await writeFile(new URL(`${id}.ingestion.json`,dir),JSON.stringify({ok:true,completedAt:new Date().toISOString(),documents:audit},null,2)+'\n');console.log(id,JSON.stringify(audit));
