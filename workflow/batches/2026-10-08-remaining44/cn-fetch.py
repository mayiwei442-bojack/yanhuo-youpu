import requests,bs4,json,re,sys,pathlib,concurrent.futures
sys.stdout.reconfigure(encoding='utf-8')
base=pathlib.Path('workflow/batches/2026-10-08-remaining44')
jobs=[('cn-020','白切鸡','1660218'),('cn-026','龙井虾仁','1443891'),('cn-028','清炒虾仁','1336292'),('cn-035','冬瓜排骨汤','1613563'),('cn-035','冬瓜排骨汤','852479')]
def fetch(job):
 rid,name,num=job;url=f'https://www.douguo.com/cookbook/{num}.html';r=requests.get(url,timeout=35);s=bs4.BeautifulSoup(r.text,'html.parser');o={'recipeId':rid,'recipeName':name,'url':url,'httpStatus':r.status_code,'title':s.h1.get_text(' ',strip=True) if s.h1 else '', 'ingredients':[], 'steps':[], 'images':[]}
 for td in s.select('.metarial td'):
  n=td.select_one('.scname');a=td.select_one('.scnum')
  if n and n.get_text(strip=True):o['ingredients'].append({'name':n.get_text(' ',strip=True),'amount':a.get_text(' ',strip=True) or None if a else None,'raw':' '.join(x for x in [n.get_text(' ',strip=True),a.get_text(' ',strip=True) if a else ''] if x)})
 for i,st in enumerate(s.select('.stepcont'),1):
  t=st.select_one('.stepinfo'); label=t.select_one('p') if t else None
  if label:label.decompose()
  text=t.get_text(' ',strip=True) if t else '';o['steps'].append({'order':i,'instruction':text,'duration':None,'heat':None})
  a=st.select_one('a[data-origin]');img=st.select_one('img');u=a.get('data-origin') if a else img.get('src') if img else None
  if u:o['images'].append({'role':'step','originalUrl':u,'stepOrder':i,'adjacentText':text})
 hero=s.select_one('img.wb100');o['hero']=hero.get('src') if hero else None
 au=s.select_one('.author-info a') or s.select_one('.author-info');o['author']=au.get_text(' ',strip=True) if au else None
 tips=s.select_one('.tips');o['tips']=tips.get_text(' ',strip=True) if tips else ''
 o['rawExcerpt']=json.dumps({'title':o['title'],'ingredients':o['ingredients'],'steps':o['steps'],'tips':o['tips']},ensure_ascii=False)
 (base/f'{rid}-{num}.candidate.json').write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8');print(rid,num,o['title'],len(o['ingredients']),len(o['steps']),len(o['images']));print(o['ingredients']);print(o['steps'])
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:list(ex.map(fetch,jobs))
