import json,pathlib,datetime,hashlib
b=pathlib.Path('workflow/batches/2026-10-08-remaining44');p=b/'cn-040.base-evidence.json';e=json.loads(p.read_text(encoding='utf-8'));s=next(s for s in e['sources'] if s['url']==e['selectedSourceUrl']);old=json.loads(json.dumps(s['media']));steps={x['order']:x['instruction'] for x in s['steps']};mapping={'step-2-3.jpg':1,'step-2-4.jpg':1,'step-3-5.jpg':2,'step-3-6.jpg':2,'step-4-7.jpg':3};removed='step-5-11.jpg'
def fix(items):
 out=[]
 for x in items:
  n=x['repositoryPath'].split('/')[-1]
  if n==removed:continue
  if n in mapping:x['stepOrder']=mapping[n];x['adjacentText']=steps[mapping[n]]
  out.append(x)
 return out
s['media']['steps']=fix(s['media']['steps']);e['notes'].append('Media mapping re-audit: five source-step assignments corrected after local pixel inspection and fullbody review; unrelated Ningbo-peanuts link image excluded. Repository filenames retain historic download names; authoritative stepOrder is corrected. See cn-040.media-mapping-reaudit.json.')
p.write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf-8');mp=b/'cn-040.media-manifest.json';m=json.loads(mp.read_text(encoding='utf-8'));oldm=json.loads(json.dumps(m));m['items']=fix(m['items']);mp.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
a={'recipeId':'cn-040','reviewedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'prior_media_references_superseded_pending_parent_refreeze','priorMediaReferences':old,'priorManifest':oldm,'correctedMappings':mapping,'excludedImage':{'file':removed,'reason':'Unrelated Ningbo peanuts with seaweed linked recipe image, not dan dan noodle process'},'pixelInspection':True,'cachedFulltext':'cn-040.web-extract.txt','sourceBodyProof':'Chili-oil section L81 explicitly Fahrenheit; ground pork and ya cai before sauce mixture.','frozenEvidenceModified':False,'databaseSync':'await parent replacement frozen evidence hash'};(b/'cn-040.media-mapping-reaudit.json').write_text(json.dumps(a,ensure_ascii=False,indent=2),encoding='utf-8')
