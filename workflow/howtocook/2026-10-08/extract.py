import json,os,re,pathlib,subprocess,hashlib,datetime,urllib.parse,concurrent.futures
base=pathlib.Path(__file__).parent
temp=pathlib.Path(os.environ['TEMP'])/'howtocook-2026-10-08'
manifest=json.loads((base/'manifest.json').read_text(encoding='utf-8'))
def fetch(path):
 url='https://raw.githubusercontent.com/Anduin2017/HowToCook/'+manifest['commit']+'/'+urllib.parse.quote(path)
 dest=temp/(hashlib.sha256(path.encode()).hexdigest()+'.txt')
 proc=subprocess.run(['curl.exe','--proxy','http://127.0.0.1:7897','-sS','-L','--fail','--max-time','60',url,'-o',str(dest)],capture_output=True)
 if proc.returncode: raise Exception('Fetch failed '+path+' '+proc.stderr.decode(errors='replace'))
 return dest.read_text(encoding='utf-8')
paths=set(r['path'] for r in manifest['recipes'] if r['path'])
paths.update(q for r in manifest['recipes'] if r['status']=='ambiguous' for q in r['candidates'])
paths.add('LICENSE')
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
 texts=dict(zip(sorted(paths),pool.map(fetch,sorted(paths))))
(temp/'LICENSE').write_text(texts.pop('LICENSE'),encoding='utf-8')
for p,t in texts.items():
 if any(r['status']=='ambiguous' and p in r['candidates'] for r in manifest['recipes']):print('\nCANDIDATE '+p+'\n'+t)
json.dump(texts,open(temp/'texts.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
print('FETCHED',len(texts),'LICENSE',len((temp/'LICENSE').read_text(encoding='utf-8')))
