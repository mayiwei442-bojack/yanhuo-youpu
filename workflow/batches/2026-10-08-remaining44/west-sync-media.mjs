import {readFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient,loadRagEnv} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
await loadRagEnv();const client=await createConfiguredSupabaseClient({fetchImpl:createWindowsHttpFetch()});
for(const id of process.argv.slice(2)){
const e=JSON.parse(await readFile(new URL(id+'.evidence.json',import.meta.url),'utf8')),s=e.sources.find(s=>s.url===e.selectedSourceUrl);
if(!s?.media)throw Error('No frozen media');const d=(await client.select('kb_documents',{filters:{id:s.documentId},limit:1}))[0];
const metadata={...d.metadata,sourceComplete:s.complete,mediaReferences:s.media,selectedForRecipe:id};
await client.update('kb_documents',{metadata,normalized_json:{...d.normalized_json,metadata:{...d.normalized_json.metadata,mediaReferences:s.media}}},{id:d.id});
const check=(await client.select('kb_documents',{filters:{id:d.id},limit:1}))[0];
if(check.metadata.mediaReferences.hero.sha256!==s.media.hero.sha256)throw Error('Media metadata verification failed');
console.log(JSON.stringify({recipeId:id,documentId:d.id,mediaProvenanceVerified:true}));
}
