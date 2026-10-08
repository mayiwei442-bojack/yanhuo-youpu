import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const id=process.argv[2];
if(!/^(cn|west)-\d{3}$/.test(id??''))throw Error('Recipe ID required');
const dir=new URL('./',import.meta.url);
const read=async name=>JSON.parse(await readFile(new URL(name,dir),'utf8'));
const evidence=await read(`${id}.base-evidence.json`);
const imported=await read(`${id}.media-import.json`);
if(evidence.recipeId!==id||imported.recipeId!==id)throw Error('Recipe ID mismatch');
const selected=evidence.sources.find(s=>s.url===evidence.selectedSourceUrl);
if(!selected?.complete||!selected.media)throw Error('Missing complete selected source and media');
for(const item of [selected.media.hero,...selected.media.steps]){
 const local=imported.items.find(i=>i.originalUrl===(item.originalUrl??item.url));
 if(!local)throw Error('Missing imported image '+(item.originalUrl??item.url));
 const bytes=await readFile(new URL('../../../'+local.repositoryPath,dir));
 if(bytes.length!==local.bytes||createHash('sha256').update(bytes).digest('hex')!==local.sha256)throw Error('Image hash/size mismatch');
 Object.assign(item,{repositoryPath:local.repositoryPath,sha256:local.sha256,httpStatus:local.httpStatus,contentType:local.contentType});
}
selected.media.repositoryCopyAuthorized=true;
const raw=JSON.stringify(evidence,null,2)+'\n';
await writeFile(new URL(`${id}.evidence.json`,dir),raw,{flag:'wx'});
console.log(JSON.stringify({ok:true,recipeId:id,evidencePackageHash:createHash('sha256').update(raw).digest('hex'),selectedImages:1+selected.media.steps.length,importedImages:imported.items.length}));
