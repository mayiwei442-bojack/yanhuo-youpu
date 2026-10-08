import requests,bs4,json,concurrent.futures,pathlib,datetime
ROOT=pathlib.Path(__file__).parent
slugs={
'west-002':['pizza-margherita-4-easy-steps'],
'west-005':['cheeseburger','classic-burger','cheeseburgers'],
'west-007':['classic-fish-chips','beer-battered-fish-chips'],
'west-008':['seafood-paella','easy-paella'],
'west-009':['bratwurst','bratwurst-with-potato-cakes','bratwurst-potatoes'],
'west-013':['fettuccine-alfredo','creamy-mushroom-pasta'],
'west-014':['mushroom-risotto','mushroom-spinach-risotto'],
'west-015':['chicken-parmigiana'],
'west-016':['beef-wellington'],
'west-017':['coq-au-vin','classic-coq-au-vin'],
'west-018':['ratatouille','classic-ratatouille'],
'west-019':['bouillabaisse'],
'west-021':['beef-bourguignon'],
'west-022':['moussaka'],
'west-023':['greek-salad'],
'west-024':['chicken-schnitzel'],
'west-025':['swedish-meatballs'],
'west-026':['beef-goulash','goulash-soup'],
'west-027':['fish-tacos','beer-battered-fish-tacos'],
'west-028':['chicken-quesadillas'],
'west-029':['eggs-benedict'],
'west-030':['buttermilk-pancakes']}
def run(pair):
 id,ss=pair;out={'recipeId':id,'attempts':[],'candidates':[]}
 for slug in ss:
  u='https://www.bbcgoodfood.com/recipes/'+slug
  try:
   r=requests.get(u,timeout=45);out['attempts'].append({'url':u,'status':r.status_code,'bytes':len(r.content)})
   if r.status_code!=200:continue
   soup=bs4.BeautifulSoup(r.content,'html.parser',from_encoding='utf-8')
   recipes=[]
   for tag in soup.find_all('script',type='application/ld+json'):
    try:v=json.loads(tag.string or tag.get_text())
    except:continue
    vals=v if isinstance(v,list) else [v]
    for x in vals:
     if isinstance(x,dict) and x.get('@type')=='Recipe':recipes.append(x)
   for recipe in recipes:
    images=[{'alt':i.get('alt'),'src':i.get('src'),'parentText':i.parent.parent.get_text(' ',strip=True)[:800]} for i in soup.select('img')]
    out['candidates'].append({'url':u,'recipe':recipe,'images':images,'pageText':soup.get_text('\n',strip=True),'encoding':r.encoding,'status':r.status_code})
   if recipes:break
  except Exception as e:out['attempts'].append({'url':u,'error':str(e)})
 (ROOT/(id+'.website-research.json')).write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print(id,[(c['recipe']['name'],len(c['recipe'].get('recipeInstructions',[]))) for c in out['candidates']],flush=True)
if __name__=='__main__':
 import sys
 if len(sys.argv)>1:slugs=json.loads(sys.argv[1])
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:list(ex.map(run,slugs.items()))
