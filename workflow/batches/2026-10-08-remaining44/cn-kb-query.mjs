import {readFile,writeFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
const c=await createConfiguredSupabaseClient({fetchImpl:createWindowsHttpFetch()});
const m=JSON.parse(await readFile(new URL('./manifest.json',import.meta.url)));
const sources=await c.select('kb_sources',{filters:{source_type:'book'},limit:1000});
const results=[];
for(const r of m.recipes.filter(x=>x.category==='chinese')){
const documents=(await c.select('kb_documents',{filters:{recipe_name:`ilike.*${r.recipeName}*`},limit:100})).filter(d=>!['invalid','superseded','rejected'].includes(d.metadata?.evidenceStatus));
results.push({...r,documents});console.log(r.recipeId,r.recipeName,documents.map(d=>[d.source_type,d.book_title,d.recipe_name]));
await writeFile(new URL('./cn-kb-audit.json',import.meta.url),JSON.stringify({queriedAt:new Date().toISOString(),bookSources:sources,results},null,2));
}
