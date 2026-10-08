import {readFile,writeFile} from 'node:fs/promises';
const id=process.argv[2];
const dir=new URL('./',import.meta.url);
const before=JSON.parse(await readFile(new URL('before.json',dir),'utf8'));
const target=before.recipes.find(r=>r.id===id);
if(!target)throw Error('Unknown target');
const marker=`  ${target.category==='chinese'?'c':'w'}(${JSON.stringify(target.record.name)}`;
function span(source){
 const start=source.indexOf(marker);if(start<0||source.indexOf(marker,start+marker.length)>=0)throw Error('Target call not unique');
 let depth=0,quote=null,escaped=false;
 for(let i=start+marker.indexOf('(');i<source.length;i++){
  const ch=source[i];
  if(quote){if(escaped)escaped=false;else if(ch==='\\')escaped=true;else if(ch===quote)quote=null;continue;}
  if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
  if(ch==='(')depth++;
  if(ch===')'&&--depth===0)return[start,i+1];
 }
 throw Error('Unclosed target call');
}
const currentUrl=new URL('../../../tools/recipe_data.mjs',dir);
const current=await readFile(currentUrl,'utf8');
const original=await readFile(new URL(`../../../work/remaining44/${id}.before.mjs`,dir),'utf8');
const [a,b]=span(current),[c,d]=span(original);
await writeFile(currentUrl,current.slice(0,a)+original.slice(c,d)+current.slice(b));
console.log(JSON.stringify({restored:id,scope:'one exact original target call; all other source bytes retained'}));
