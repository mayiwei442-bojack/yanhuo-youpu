import pathlib,json,re
p=pathlib.Path('workflow/batches/2026-10-08-remaining44')
for rid in ['cn-020','cn-031','cn-035']:
 e=json.loads((p/f'{rid}.draft-evidence.json').read_text(encoding='utf8'));s=e['sources'][0];images=json.loads((p/f'{rid}.image-urls.json').read_text(encoding='utf8'));items=[];unselected=[]
 for i,x in enumerate(images):
  u=x['originalUrl'] or (re.search(r'Failed to fetch (https://[^ :]+)',x.get('fetchResult',''))[1] if 'Failed to fetch https://' in x.get('fetchResult','') else None)
  if not u:continue
  order=x['stepOrder'];role='hero' if order=='hero' else 'step' if isinstance(order,int) else 'finished'
  if role=='finished':unselected.append({'originalUrl':u,'role':'finished_dish','reason':'重复成品图；保留单独图片审计，不伪作过程图。'});continue
  adj=s['steps'][order-1]['instruction'] if role=='step' else e['recipeName']+'成品'
  item={'role':role,'originalUrl':u,'repositoryPath':f'assets/dishes/sources/{rid}-woks/{"hero" if role=="hero" else "step-"+str(order)+"-"+str(i)}.jpg','adjacentText':adj,'pageOrder':i}
  if role=='step':item['stepOrder']=order
  items.append(item)
 s['steps']=[{**st,'instruction':re.sub(r'\n#+[^\n]*','',st['instruction']).strip()} for st in s['steps']]
 if rid=='cn-020':
  s['ingredients'] +=[{'name':'water','amount':'enough to submerge chicken; about18cups for4poundchicken','raw':'about 18 cups of water to submerge a 4 pound chicken in a deep stock pot'},{'name':'ice water','amount':None,'raw':'a large bowl of ice water'}]
 if rid=='cn-031':
  s['steps'][0]['instruction']+=' If using non-stick, just heat until the pan is hot (do not heat a non-stick pan until smoking). Pat tofu dry before slicing.'
  e['notes'].append('书籍近名候选家常烩豆腐（documentId e.g.cn-031.book-candidate.json）为腐乳/八角/肉桂炖煮白豆腐，Woks是煎炸豆腐炒肉末；工艺和菜品名称不同，因此书籍作为近名拒绝，未混入。')
 s['selectionAssessment']['ingredientCount']=len(s['ingredients']);s['selectionAssessment']['notes'].append('No invented metric conversions; quantities only fromsourcecard or narrative.');e['notes'].append('Unselectedsourceimageaudit:'+json.dumps(unselected,ensure_ascii=False));
 (p/f'{rid}.draft-evidence.json').write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf8');(p/f'{rid}.media-manifest.json').write_text(json.dumps({'recipeId':rid,'sourceUrl':s['url'],'referer':s['url'],'authorization':'user_confirmed_2026-09-16','items':items},ensure_ascii=False,indent=2),encoding='utf8');print(rid,len(items))
