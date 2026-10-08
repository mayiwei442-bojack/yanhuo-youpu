import {createWindowsHttpFetch} from '../../../src/rag/windows-http.mjs';
const r=await createWindowsHttpFetch()('https://thewoksoflife.com/lanzhou-beef-noodle-soup/');console.log(r.status,(await r.text()).slice(0,100));
