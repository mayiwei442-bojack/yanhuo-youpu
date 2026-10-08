import json,pathlib,hashlib,datetime,jsonschema
b=pathlib.Path('workflow/batches/2026-10-08-remaining44');fp=b/'cn-053.evidence.json';oldbytes=fp.read_bytes();old=json.loads(oldbytes);e=json.loads(oldbytes);s=next(x for x in e['sources'] if x['url']==e['selectedSourceUrl']);oldmedia=json.loads(json.dumps(s['media']));orders={x['order']:x['instruction'] for x in s['steps']};mapping={'step-1-2.jpg':4,'step-2-3.jpg':4,'step-3-4.jpg':5,'step-4-5.jpg':5,'step-4-6.jpg':5,'step-5-7.jpg':5,'step-5-8.jpg':6,'step-5-9.jpg':6,'step-5-10.jpg':6,'step-6-12.jpg':7,'step-6-13.jpg':7,'step-7-14.jpg':7};excluded='step-5-11.jpg';files=[]
for x in [oldmedia['hero'],*oldmedia['steps']]:
 p=pathlib.Path(x['repositoryPath']);raw=p.read_bytes();h=hashlib.sha256(raw).hexdigest();assert h==x['sha256'] and len(raw)==x['bytes'];files.append({'repositoryPath':str(p).replace('\\','/'),'bytes':len(raw),'sha256':h})
def fix(items):
 out=[]
 for x in items:
  name=x['repositoryPath'].split('/')[-1]
  if name==excluded:continue
  if name in mapping:x['stepOrder']=mapping[name];x['adjacentText']=orders[mapping[name]]
  out.append(x)
 return out
s['media']['steps']=fix(s['media']['steps']);s['selectionAssessment']['mappedStepImages']=len(s['media']['steps']);s['selectionAssessment']['stepImageCoverage']=len(set(x['stepOrder'] for x in s['media']['steps']))/len(s['steps']);e['notes'].append('CN053 source-photo mapping corrected against independently inspected local pixels and cached source fulltext; source steps 4/5/6/7 have photos. Leftover-salt recovery photo removed from cooking-step media and retained only in audit. Existing download filenames are historical names; stepOrder is authoritative. See cn-053.media-mapping-reaudit.json.')
jsonschema.validate(e,json.loads(pathlib.Path('workflow/schemas/evidence-package.schema.json').read_text(encoding='utf-8')));archive=b/'cn-053.evidence-attempt1.json';assert not archive.exists(),'attempt1 already exists; do not overwrite';assert e['sources'][0]['steps']==old['sources'][0]['steps'];assert e['sources'][0]['ingredients']==old['sources'][0]['ingredients'];assert e['sources'][0]['rawExcerpt']==old['sources'][0]['rawExcerpt']
newbytes=(json.dumps(e,ensure_ascii=False,indent=2)+'\n').encode();(b/'cn-053.base-evidence.json').write_bytes(newbytes);mp=b/'cn-053.media-manifest.json';m=json.loads(mp.read_text(encoding='utf-8'));oldmanifest=json.loads(json.dumps(m));m['items']=fix(m['items']);mp.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');fp.rename(archive)
with fp.open('xb') as f:f.write(newbytes)
assert archive.read_bytes()==oldbytes
for x in files:
 raw=pathlib.Path(x['repositoryPath']).read_bytes();assert len(raw)==x['bytes'] and hashlib.sha256(raw).hexdigest()==x['sha256']
a={'recipeId':'cn-053','reviewedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'independentPixelInspection':True,'sourceStepProof':'cn-053.web-extract.txt L166 step4 preparation/wrapping; L167-168 step5 heat/embed/cook; L169 step6 lift/unwrap; L170 step7 debone/serve. Salt reuse advice L79 is a separate tip.','priorEvidenceHash':hashlib.sha256(oldbytes).hexdigest(),'replacementEvidenceHash':hashlib.sha256(newbytes).hexdigest(),'priorFrozenArchive':archive.name,'priorMediaReferences':oldmedia,'priorManifest':oldmanifest,'correctedMappings':mapping,'excludedStepPhoto':{'file':excluded,'reason':'Leftover salt recovery tip, not a cooking step'},'allOriginalImageFilesUnchanged':True,'allImageFiles':files,'textAndIngredientsAndStepsUnchanged':True,'schemaValidation':'PASS','freezeMode':'exclusive_create_xb_after_original_byte_exact_archive','databaseSync':'pending'};(b/'cn-053.media-mapping-reaudit.json').write_text(json.dumps(a,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'replacementEvidenceHash':a['replacementEvidenceHash'],'selectedImageCount':1+len(s['media']['steps']),'originalImageFilesUnchanged':len(files),'schema':'PASS'}))
