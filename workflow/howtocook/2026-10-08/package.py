import json,os,re,pathlib,hashlib,datetime,urllib.parse,posixpath,sys
base=pathlib.Path(__file__).parent
temp=pathlib.Path(os.environ['TEMP'])/'howtocook-2026-10-08'
m=json.loads((base/'manifest.json').read_text(encoding='utf-8'))
texts=json.loads((temp/'texts.json').read_text(encoding='utf-8'))
accepted={'cn-014':('dishes/staple/螺蛳粉.md','正文明确广西柳州；原版为袋装螺蛳粉，不是自制螺蛳汤。'),'west-001':('dishes/staple/意式肉酱面/意式肉酱面.md','意式即意大利式；原版使用成品意大利面酱加肉末。'),'west-003':('dishes/meat_dish/牛排/牛排.md','正文明确为西式煎牛排，操作为平底锅煎制。')}
if '--additions' in sys.argv:
 accepted={'cn-034':('dishes/vegetable_dish/韭菜炒蛋/韭菜炒蛋.md','韭菜炒蛋正文明确鸡蛋，与韭菜炒鸡蛋同菜。'),'cn-038':('dishes/staple/微波炉腊肠煲仔饭/微波炉腊肠煲仔饭.md','原文为微波炉腊肠煲仔饭版腊味饭，保留原题与工具。'),'cn-045':('dishes/staple/手工水饺.md','手工水饺正文明确韭菜和猪肉馅，对应韭菜猪肉饺子。'),'cn-058':('dishes/meat_dish/西红柿牛腩/西红柿牛腩.md','西红柿与番茄同义，同菜。'),'cn-060':('dishes/soup/银耳莲子粥/银耳莲子粥.md','原名银耳莲子粥，材料不含米或谷物，实际为银耳莲子甜羹；保留原题。')}
 accepted.update({'west-010':('dishes/meat_dish/意式烤鸡.md','鸡腿肉配欧芹香草的意式烤鸡，对应香草烤鸡；保留上游原名与具体配方。'),'cn-046':('dishes/semi-finished/速冻馄饨.md','原文为电饭煲煮速冻馄饨版本，不包含自制馄饨皮馅步骤。')})
 m['recipes']=[r for r in m['recipes'] if r['recipeId'] in accepted]
specific={'cn-017':['原料/计算未列炒制及泼油的油类型、用量；操作另用开水但无定量。'], 'cn-021':['操作使用盐、香油但原料/计算未列用量；计算有食用油、花椒粉、香菜但必备表缺列；原必备表重复花椒。'],'cn-030':['小葱为可选未定量；附加内容提及可选白胡椒粉0.5g。','引言全程约20分钟，但操作单列泡粉20分钟及后续煮5分钟；保留原文不校正总时长。'],'cn-041':['必备表列蒜，但计算和操作使用葱；蒜未说明用量及加入时点。'],'cn-042':['肉末和肉汤汁的预制方式未说明；原文碱水面仅焯25秒，未说明是生面或预熟面。'],'cn-048':['肉量、胡椒粉和热锅油未定量；原文混用凉皮和河粉名称，保留原文。'],'cn-052':['原文包含挂掉猪皮、后端、散上等用字；保留未经纠错的原文。'],'cn-055':['操作混用大蒜白色、大葱白、大蒜叶，必备表仅列蒜；不擅自统一。'],'cn-056':['午餐肉、油、蚝油、糖、盐、味精未定量；必备淀粉未说明操作，金针菇/蚝油/味精未列必备。'],'cn-057':['计算是份数公式；不将公式擅自展开为单份克数。'],'cn-059':['葱花、香油、可选虾皮未定量，虾皮和香油未列必备；可选淀粉仅在附加内容出现。']}
supplement={'cn-017':[('油','锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。'),('开水','倒入开水，煮成红汤。')],'cn-021':[('盐','红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉'),('香油','红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉'),('冰水','取出鸡肉，放入冰水中，直至冰凉')],'cn-030':[('白胡椒粉','可加入 0.5g 白胡椒粉调味，风味更佳')],'cn-048':[('食用油','趁锅热，加入 20g 食用油（高血压人群可降低用量），倒入葱白、蒜爆炒出香。')],'cn-055':[('大葱白','锅烧热放油，油热下大葱白爆香')],'cn-056':[('油','热锅凉油, 加热锅倒入油过一遍就倒出来, 重新倒入一点油。'),('蚝油','加入调味料蚝油、糖、盐、味精烧开。'),('味精','加入调味料蚝油、糖、盐、味精烧开。'),('清水','加入适 300g 清水（水量没过娃娃菜即可）, 放入娃娃菜, 金针菇, 午餐肉')],'cn-059':[('香油','关火，出锅前放入几滴香油，也有的会放入一点虾皮，味道也不错。'),('虾皮','关火，出锅前放入几滴香油，也有的会放入一点虾皮，味道也不错。'),('淀粉','如果喜欢浓稠口感，可加入 2g 淀粉.')],'west-001':[('水','锅中加水，烧开后放入意面（等待 6 - 12 分钟）')]}
def section(raw,title):
 match=re.search(r'^## '+re.escape(title)+r'\s*\n(.*?)(?=^## |\Z)',raw,re.M|re.S)
 return match.group(1) if match else ''
batch={'commit':m['commit'],'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'licenseRaw':(temp/'LICENSE').read_text(encoding='utf-8'),'recipes':[]}
for r in m['recipes']:
 if r['recipeId'] in accepted:r.update(status='matched',path=accepted[r['recipeId']][0],matchReason=accepted[r['recipeId']][1])
 if r['status']!='matched':
  if r['status']=='ambiguous':r['skipReason']='近名菜谱做法不同，不替代指定菜谱。'
  else:r['skipReason']='锁定上游完整目录中无对应菜谱。'
  continue
 raw=texts[r['path']]; rid=r['recipeId']; url='https://github.com/Anduin2017/HowToCook/blob/'+m['commit']+'/'+urllib.parse.quote(r['path'])
 headers=list(re.finditer(r'^(#{1,6}) (.+)\n',raw,re.M));sections=[]
 for i,h in enumerate(headers):sections.append({'title':h.group(2),'markdown':raw[h.end():headers[i+1].start() if i+1<len(headers) else len(raw)],'level':len(h.group(1))})
 required=section(raw,'必备原料和工具');calc=section(raw,'计算');operation=section(raw,'操作');tips=section(raw,'附加内容')
 ingredients=[]
 for origin,body in [('必备原料和工具',required),('计算',calc)]:
  matches=list(re.finditer(r'^[ \t]*[-*] (.+)(?:\n(?!\s*(?:[-*]|\d+\.|#)|\s*$).*)*',body,re.M))
  for x in matches:
   text=x.group(0).strip(); content=re.sub(r'^[-*] ','',text);ingredients.append({'name':content,'raw':content,'amount':None,'sourceSection':origin})
 for name,text in supplement.get(rid,[]):ingredients.append({'name':name,'raw':text,'amount':None,'sourceSection':'操作/附加内容'})
 markers=list(re.finditer(r'^(\d+)\. (.*)',operation,re.M));steps=[]
 for i,h in enumerate(markers):
  text=operation[h.start():markers[i+1].start() if i+1<len(markers) else len(operation)];text=re.sub(r'^\d+\. ','',text).strip()
  if re.match(r'^!\[',text):continue
  steps.append({'order':len(steps)+1,'instruction':text,'duration':None,'heat':None,'sourceOrder':int(h.group(1))})
 images=[]
 for i,h in enumerate(re.finditer(r'!\[([^\]]*)\]\(([^)]+)\)',raw)):
  ref=h.group(2);asset=posixpath.normpath(posixpath.join(posixpath.dirname(r['path']),ref));ext=posixpath.splitext(asset)[1]
  images.append({'originalReference':ref,'originalUrl':'https://raw.githubusercontent.com/Anduin2017/HowToCook/'+m['commit']+'/'+urllib.parse.quote(asset),'path':'assets/dishes/howtocook/'+rid+'/'+str(i+1)+ext,'alt':h.group(1),'pageOrder':i+1,'adjacentText':raw[max(0,h.start()-180):min(len(raw),h.end()+180)]})
 limitations=specific.get(rid,[])+(['本上游菜谱无图片，按用户要求不补造图片。'] if not images else [])+(['原文用量、工具、操作及措辞按原样保留；未说明的参数不补造。'])
 if rid=='cn-014':limitations.insert(0,accepted[rid][1])
 if rid=='west-001':limitations.insert(0,accepted[rid][1])
 notes=['用户明确要求仅用 HowToCook，原文完整转录；complete=true 表示上游文档完整抓取，不表示烹饪参数无遗漏。','Source limitations: '+' '.join(limitations),'GitHub commit '+m['commit']+'; path '+r['path'],'媒体按原文位置保留；未要求映射的照片不伪称步骤图。']
 source={'sourceName':'HowToCook','sourceType':'website','url':url,'documentId':'not-ingested-yet','retrievalMethod':'GitHub immutable raw Markdown via configured local HTTP proxy; no access-control bypass','complete':True,'ingredients':ingredients,'steps':steps,'technique':[calc.strip()] if calc.strip() else [],'tips':[tips.strip()] if tips.strip() else [],'rawExcerpt':raw}
 evidence={'recipeId':rid,'recipeName':r['recipeName'],'category':r['category'],'createdAt':batch['createdAt'],'sources':[source],'sourceMode':'single_source','singleSourceReason':'User explicitly directed exclusive HowToCook source and exact upstream transcription.','selectedSourceUrl':url,'selectionReason':r.get('matchReason','上游菜谱文件名与指定菜名完全一致。'),'ragEvidence':[],'notes':notes}
 intro=raw[:raw.index('## 必备原料和工具')]
 result={**r,'upstreamName':re.search(r'^# (.+?)(?:的做法)?\s*$',raw,re.M).group(1),'rawMarkdown':raw,'sha256':hashlib.sha256(raw.encode()).hexdigest(),'sections':sections,'images':images,'limitations':limitations,'introduction':intro,'evidence':evidence}
 batch['recipes'].append(result)
 (base/(rid+'.evidence.json')).write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')
(base/('research-additions.json' if '--additions' in sys.argv else 'research.json')).write_text(json.dumps(batch,ensure_ascii=False,indent=2),encoding='utf-8')
(base/('manifest-additions.json' if '--additions' in sys.argv else 'manifest.json')).write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print('Research ready:',len(batch['recipes']),'matched;',68-len(batch['recipes']),'skipped')
