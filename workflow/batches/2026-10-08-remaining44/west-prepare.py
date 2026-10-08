import pathlib,json,re,html,requests,concurrent.futures
D=pathlib.Path(__file__).parent
extras={
'west-005':[('salt','1 generous tsp salt (method step1)'),('black pepper','black pepper (method step1; amount unspecified)')],
'west-007':[('water','water for boiling potatoes (amount unspecified)'),('salt','salt for chips and fried fish (amount unspecified)'),('tomato sauce','Homemade tomato sauce to serve (amount unspecified; source permits prepared component)')],
'west-008':[('water','2 litres water for stock (method step2)')],
'west-013':[('salt','2 tsp salt for pasta (method step3)'),('black pepper','good grinding of black pepper (method step2)'),('water','boiling pasta water (amount unspecified); retain3 tbsp for sauce')],
'west-014':[('water','1 litre boiling water for soaking mushrooms; splash more if rice undercooked'),('salt','salt (method step4; amount unspecified)'),('pepper','pepper (method step4; amount unspecified)')],
'west-015':[('seasoning','Season sauce (step3; seasoning type and quantity unspecified)'),('vegetables or salad','vegetables or salad to serve (optional; amount unspecified)'),('pasta or potatoes','pasta or potatoes to serve (optional; amount unspecified)')],
'west-016':[('pepper','pepper for beef (step2; amount unspecified)'),('seasoning','Season mushroom mixture (step5; seasoning type and quantity unspecified)'),('water','1 tsp water with egg yolks (step14)')],
'west-017':[('salt','pinch of salt (step7)'),('pepper','pepper (step7; amount unspecified)')],
'west-018':[('water','boiling then cold water to peel tomatoes (step3; amount unspecified)'),('salt','some salt (step8)'),('pepper','some pepper (step8)')],
'west-019':[('salt','salt for broth and pinch for rouille (steps3/4)'),('pepper','pepper for broth (step3; unspecified amount)')],
'west-021':[('pepper','some pepper for overnight marinade (step1)'),('seasoning','Season stew (step6; unspecified type and amount)')],
'west-022':[('water','200ml water for lamb sauce (step2); salted water to boil potato (step3)'),('salt','pinch salt for onion; lightly salted water for potato (steps2/3)'),('seasoning','Season lamb sauce and bechamel (steps2/4; unspecified seasoning)')],
'west-023':[('seasoning','Lightly season (step2; unspecified type and amount)'),('crusty bread','crusty bread to serve (step2; amount unspecified)')],
'west-024':[('seasoning','season coleslaw and flour (steps1/3; seasoning unspecified)')],
'west-025':[('seasoning','seasoning (step1; unspecified type and amount)'),('cranberry jelly','cranberry jelly to serve (step5; amount unspecified)'),('greens','greens to serve (step5; amount unspecified)'),('mash','mash to serve (step5; amount unspecified)')],
'west-027':[('water','150ml water for pickled onions (step1)'),('salt','1 tsp salt for pickled onions (step1; in addition to batter salt)'),('bread','small cube of bread to test oil if no thermometer (step4; optional)')],
'west-029':[('water','at least2 litres poaching water; splash ice-cold water for hollandaise; splash to loosen if needed'),('salt','pinch salt for hollandaise (method)')],
'west-030':[('salt','pinch salt for pancake batter (step2)')]}
special={
'west-008':['Source uses two separate olive oil, onion, tomato and garlic allocations: main paella versus homemade prawn stock; preserve both groups and quantities.'],
'west-016':['Initial beef roast220C/fan200C/gas7 and final pastry200C/fan180C/gas6 are different stages; preserve both.'],
'west-019':['Source ingredient listing includes both1 leek described by white/green parts and a second1 leek row; do not silently merge or delete. Ingredient fish examples and method ordering examples differ (snapper appears in method while ingredient examples list gurnard/red mullet); retain source generic mixedfish and disclose examples as alternatives.'],
'west-022':['Oven source gives200C/180fan/gas4, internally inconsistent gas equivalence; retain200C conventional/180C fan and disclose gas4 conflict, never silently correct.'],
'west-025':['Source says heat meatballs through in gravy without explicit internal temperature or final time; preserve doneness wording and disclose omission.']}
def run(p):
 id=p.name.split('.')[0];a=json.loads(p.read_text(encoding='utf8'))
 if not a['candidates']:return
 c=a['candidates'][0];r=c['recipe'];ings=[]
 for raw in r['recipeIngredient']:
  raw=html.unescape(raw);name=re.sub(r'^(?:[\d½¼¾⅓⅔./\s-]+(?:g|kg|ml|l|tsp|tbsp|oz|cups?|tablespoons?|teaspoons?)?\s*)+','',raw).strip() or raw
  ings.append({'name':name,'raw':raw,'amount':None})
 for name,raw in extras.get(id,[]):ings.append({'name':name,'raw':raw,'amount':None})
 notes=['Full accessible recipe ingredients and all method text preserved; method-only food/water/seasoning extracted separately. Unspecified source quantities remain unspecified. No vessel unit capacity invented.']+special.get(id,[])
 if id!='west-002':(D/(id+'.extraction.json')).write_text(json.dumps({'ingredients':ings,'notes':notes},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 flat=[s for x in r['recipeInstructions'] for s in (x.get('itemListElement') or [x])]
 items=[{'role':'hero','originalUrl':r['image'][0]['url'],'repositoryPath':f'assets/dishes/sources/{id}-bbc-good-food/hero.jpg'}]
 for i,s in enumerate(flat,1):
  if s.get('image'):items.append({'role':'step','stepOrder':i,'originalUrl':s['image']['url'],'repositoryPath':f'assets/dishes/sources/{id}-bbc-good-food/step-{i}.jpg','adjacentText':s['text'],'pageOrder':i})
 for item in items:
  rr=requests.get(item['originalUrl'],timeout=30);item['httpStatus']=rr.status_code;item['contentType']=rr.headers.get('Content-Type','').split(';')[0]
  if rr.status_code!=200 or not item['contentType'].startswith('image/'):return
 media={'recipePageUrl':c['url'],'mediaPageUrl':c['url'],'sourceName':'BBC Good Food','author':', '.join(x['name'] for x in r.get('author',[])),'rightsNotice':'Copyright Good Food/Immediate; source attribution retained; no open reuse license stated.','reuseLicense':None,'repositoryCopyAuthorized':True,'hero':{k:v for k,v in items[0].items() if k!='role'},'steps':[{k:v for k,v in x.items() if k!='role'} for x in items[1:]]}
 (D/(id+'.prepared-media.json')).write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 (D/(id+'.media-manifest.json')).write_text(json.dumps({'recipeId':id,'authorization':'user_confirmed_2026-09-16','sourceUrl':c['url'],'recipePageUrl':c['url'],'referer':c['url'],'items':items},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print(id,'images',len(items),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:list(ex.map(run,sorted(D.glob('west-*.website-research.json'))))
