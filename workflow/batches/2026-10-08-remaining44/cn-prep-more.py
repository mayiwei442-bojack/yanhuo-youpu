import pathlib,json,re,sys
p=pathlib.Path('workflow/batches/2026-10-08-remaining44')
for rid in sys.argv[1:]:
 e=json.loads((p/f'{rid}.draft-evidence.json').read_text(encoding='utf8'));s=e['sources'][0];images=json.loads((p/f'{rid}.image-urls.json').read_text(encoding='utf8'));items=[];unselected=[]
 for i,x in enumerate(images):
  u=x['originalUrl'] or (re.search(r'Failed to fetch (https://[^ :]+)',x.get('fetchResult',''))[1] if 'Failed to fetch https://' in x.get('fetchResult','') else None)
  if not u:continue
  order=x['stepOrder'];role='hero' if order=='hero' else 'step' if isinstance(order,int) else 'finished'
  if role=='finished':unselected.append({'originalUrl':u,'role':'finished_dish','reason':'重复成品图，未伪作过程图。'});continue
  adj=s['steps'][order-1]['instruction'] if role=='step' else e['recipeName']+'成品'
  item={'role':role,'originalUrl':u,'repositoryPath':f'assets/dishes/sources/{rid}-woks/{"hero" if role=="hero" else "step-"+str(order)+"-"+str(i)}.jpg','adjacentText':adj,'pageOrder':i}
  if role=='step':item['stepOrder']=order
  items.append(item)
 for st in s['steps']:st['instruction']=re.sub(r'\n#+[^\n]*','',st['instruction']).strip()
 e['notes'].append('Unselected source images: '+json.dumps(unselected,ensure_ascii=False))
 if rid=='cn-039':
  # Carving is explicitly in the operative body (separate from the compact card).
  s['steps'].append({'order':14,'instruction':'Carve the chicken into pieces and serve with the chicken rice and the sauces.','duration':None,'heat':None});
  for it in items:
   if it.get('stepOrder')==13 and it['originalUrl'] in [x['originalUrl'] for x in images if x['linkId'] in [78,79]]:it['stepOrder']=14;it['adjacentText']='Carve the chicken and serve with the rice and sauces (source narrative).'
 if rid=='cn-044':
  s['ingredients'].append({'name':'Chinese black vinegar','amount':None,'raw':'What you want is Chinese black vinegar. Pour some out into a small, round dipping dish or bowl.'})
  s['ingredients'].append({'name':'ginger','amount':None,'raw':'Add some very thin matchsticks of ginger.'})
 s['selectionAssessment']['ingredientCount']=len(s['ingredients']);s['selectionAssessment']['executableStepCount']=len(s['steps'])
 (p/f'{rid}.draft-evidence.json').write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf8');(p/f'{rid}.media-manifest.json').write_text(json.dumps({'recipeId':rid,'sourceUrl':s['url'],'referer':s['url'],'authorization':'user_confirmed_2026-09-16','items':items},ensure_ascii=False,indent=2),encoding='utf8');print(rid,len(items))
