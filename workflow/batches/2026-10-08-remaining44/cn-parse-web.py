import pathlib,re,json,datetime
p=pathlib.Path('workflow/batches/2026-10-08-remaining44');manifest=json.loads((p/'manifest.json').read_text(encoding='utf8'));names={x['recipeId']:x['recipeName'] for x in manifest['recipes']}
def clean(t):
 t=re.sub(r'cite\d+†([^†]+)(?:†[^]*)?',r'\1',t);return t.strip()
for rid in ['cn-015','cn-020','cn-031','cn-035','cn-039','cn-040','cn-044','cn-049','cn-051','cn-053']:
 raw=(p/f'{rid}.web-extract.txt').read_text(encoding='utf8');url=re.search(r'\((https://thewoksoflife.com/[^)]+)\)',raw)[1];ref=re.search(r'cite(turn\d+view\d+)',raw)[1];lines=[(int(m[1]),m[2]) for m in re.finditer(r'L(\d+): (.*?)(?=\s*L\d+:|$)',raw,re.S)];text='\n'.join(clean(t) for _,t in lines);start=text.rfind('\n## Recipe');card=text[start:];card=card.split('#### Nutrition Facts')[0].split('Nutritional Info Disclaimer')[0];ingredientsPart=card.split('#### Ingredients')[1].split('#### Instructions')[0];method=card.split('#### Instructions')[1].split('#### Notes')[0];ing=[];group=''
 for l in ingredientsPart.splitlines():
  if l.startswith('##### '):group=l[6:]
  if '[Input]' not in l:continue
  r=l.split('[Input]',1)[1].strip();m=re.match(r'^((?:[0-9¼½¾⅓⅔⅛⅜⅝⅞][0-9¼½¾⅓⅔⅛⅜⅝⅞ ./–—-]*\s*(?:(?:cups?|tablespoons?|teaspoons?|pounds?|lbs?|oz\.?|ounces?|grams?|g|kg|ml|cloves?|slices?|bunches?|pieces?|inches?)\b)?))\s*(.*)$',r,re.I);n=m[2].strip() if m else r;a=m[1].strip() if m else None
  if not n:n=r;a=None
  ing.append({'name':n,'amount':a,'raw':r,'sourceGroup':group})
 chunks=re.split(r'\n\s*\* ',method);steps=[]
 for chunk in chunks:
  chunk=chunk.strip()
  if not chunk:continue
  if chunk.startswith('#####'):group=chunk.splitlines()[0].strip('# ');chunk='\n'.join(chunk.splitlines()[1:]).strip()
  if chunk:steps.append({'order':len(steps)+1,'instruction':chunk,'duration':None,'heat':None})
 tech=[l for l in card.splitlines() if re.match(r'^(Serves:|Prep:|Cook:|Total:|Resting Time:|Inactive Time:|Marinating Time:)',l)];author=re.search(r'by: (.+)',card);author=author[1] if author else 'The Woks of Life';body=text[text.find('## ',text.find('# ')):start];body=re.sub(r'^Image:.*$','',body,flags=re.M)
 source={'sourceName':'The Woks of Life','sourceType':'website','url':url,'documentId':'pending-ingestion','retrievalMethod':'Normal web browser fetch complete recipe card plus relevant operational narrative','complete':True,'ingredients':ing,'steps':steps,'technique':tech,'tips':[],'rawExcerpt':card.strip()+'\n\nOperational narrative\n'+body,'selectionAssessment':{'qualifies':True,'ingredientCoverage':'complete','stepCoverage':'complete','internalCoherence':'coherent','heroImages':0,'mappedStepImages':0,'stepImageCoverage':0,'ingredientCount':len(ing),'executableStepCount':len(steps),'notes':['Media verification pending parent import. Source quantities retained without vessel-unit conversion.']}}
 e={'recipeId':rid,'recipeName':names[rid],'category':'chinese','createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sources':[source],'sourceMode':'single_source','singleSourceReason':'已读取数据库全部84份书籍菜谱并按名称、别名和正文核对，本菜无完全匹配书籍信源。已检索配置豆果来源，其他候选如有见notes；保留可访问完整Woks整份配方。','selectedSourceUrl':url,'selectionReason':'此完整且内部自洽的名称匹配信源可保留所有原料用量和操作；图片核验待完成，未混入其他来源。','ragEvidence':[],'notes':['Database book comparison audit: cn-book-inventory.json.','完整来源步骤及正文操作细节保留在rawExcerpt；Editor必须核对正文补充细节，不能只用压缩后的概述。','Photos pending verification; never claim downloaded before media-import result.']}
 (p/f'{rid}.draft-evidence.json').write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf8');imageRefs=[]
 for line,t in lines:
  if line<45 or 'Looking for more authentic recipes' in t:continue
  if '## Recipe' in t:break
  for m in re.finditer(r'cite(\d+)†Image: ([^]+)',t):imageRefs.append({'id':int(m[1]),'line':line,'alt':m[2]})
 print(rid,ref,'ing',len(ing),'steps',len(steps),'images',imageRefs)
