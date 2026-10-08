import {writeFile} from 'node:fs/promises';
import {createConfiguredSupabaseClient} from '../../../src/rag/supabase-client.mjs';
import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
const c=await createConfiguredSupabaseClient({fetchImpl:createWindowsHttpFetch()});
const books=await c.select('kb_documents',{filters:{source_type:'book'},limit:1000});
await writeFile(new URL('./cn-book-inventory.json',import.meta.url),JSON.stringify({queriedAt:new Date().toISOString(),documents:books},null,2));console.log(books.length,books.map(d=>d.recipe_name));
