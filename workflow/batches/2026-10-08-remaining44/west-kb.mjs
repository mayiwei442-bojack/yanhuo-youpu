import {readFile,writeFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient,loadRagEnv} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
await loadRagEnv();const client=await createConfiguredSupabaseClient({fetchImpl:createWindowsHttpFetch()});
const manifest=JSON.parse(await readFile(new URL('./manifest.json',import.meta.url),'utf8'));
const sources=await client.select('kb_sources',{limit:1000});
const books=await client.select('kb_documents',{filters:{source_type:'book'},limit:1000});
const targets=[];
for(const r of manifest.recipes.filter(r=>r.category==='western')){
 const docs=await client.select('kb_documents',{filters:{recipe_name:r.recipeName},limit:1000});
 targets.push({...r,documents:docs.filter(d=>!['invalid','superseded','rejected'].includes(d.metadata?.evidenceStatus)),excludedDocuments:docs.filter(d=>['invalid','superseded','rejected'].includes(d.metadata?.evidenceStatus)).map(d=>d.id)});
}
await writeFile(new URL('./west-kb-audit.json',import.meta.url),JSON.stringify({createdAt:new Date().toISOString(),sources,books,targets},null,2)+'\n');
console.log(JSON.stringify({sources:sources.length,books:books.length,targets:targets.map(t=>({id:t.recipeId,docs:t.documents.length}))}));
