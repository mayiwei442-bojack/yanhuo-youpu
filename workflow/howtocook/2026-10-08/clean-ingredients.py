import json,pathlib,re,sys
base=pathlib.Path(__file__).parent
researchFile='research-additions.json' if '--additions' in sys.argv else 'research.json'
batch=json.loads((base/researchFile).read_text(encoding='utf-8'))
names={
'west-010':['鸡腿肉','盐','黑胡椒','橄榄油','蒜','柠檬汁','欧芹','蜂蜜','烤肉酱'],
'cn-046':['速冻馄饨','盐','鸡精','胡椒粉','香油','香菜','水','调料包'],
'cn-034':['韭菜','鸡蛋','食用油','盐'],
'cn-038':['米','腊肠','鸡蛋','红萝卜','盐','油','生抽','香葱','青菜','水'],
'cn-045':['面粉','冷水','芝麻香油','瘦肉末','肥肉末','姜','葱','盐','蚝油','香油','生抽','鸡蛋','韭菜','黑醋','大蒜/蒜泥'],
'cn-058':['西红柿','牛腩','食用油','葱','姜','生抽','白胡椒粉','白糖','料/黄酒','八角','盐','水'],
'cn-060':['银耳','去心莲子','红枣','枸杞','冰糖','水'],
'cn-014':['袋装螺蛳粉','米粉','螺蛳肉包','汤料包','酸笋包','花生包','豆皮包','木耳包','醋包','辣椒油','水'],
'cn-017':['牛肉','豆芽','鸡蛋','香菜','豆瓣酱','料酒','淀粉','干辣椒粉','姜','蒜','红辣椒','蚝油','油','开水'],
'cn-021':['鸡','食用油','辣椒粉','花椒','花生','小葱','姜','蒜','白糖','生抽','醋','味精','花椒粉','香菜','盐','香油','冰水'],
'cn-030':['红薯粉丝','猪肉末','郫县豆瓣酱','生抽','老抽','食用油','蒜末','姜末','小葱','清水','白胡椒粉'],
'cn-032':['青椒','大蒜','油','白糖','生抽','香醋','盐'],
'cn-033':['土豆','大蒜','青椒','红椒','干辣椒','葱','生抽','陈醋','盐','食用油'],
'cn-041':['肉丁/肉末','面条','蒜','葱','菜码','食用油','豆瓣酱','甜面酱'],
'cn-042':['热干面特有的碱水面','小葱','酸豆角','肉末','蒜水','肉汤汁','萝卜干','芝麻酱','辣椒油','胡椒粉','酱油','食盐','鸡精','水'],
'cn-047':['小葱','食用油','生抽','老抽','白糖','干面条','葱油酱汁','饮用水'],
'cn-048':['河粉','猪肉/牛肉','盐','味精','老抽','生抽','孜然粉','河粉料','胡椒粉','黄瓜','面筋块','绿豆芽','鸡蛋','蒜瓣','小葱','淀粉','食用油'],
'cn-052':['五花肉','梅菜','五香粉','食用油','白砂糖','老抽','生抽','小米椒','蒜末','食用盐','鸡精','清水'],
'cn-055':['花菜','五花肉','辣椒','生抽','白糖','蒜','盐','油','大葱白','大蒜叶'],
'cn-056':['娃娃菜','金针菇','皮蛋','午餐肉','葱','姜','蒜','盐','糖','淀粉','油','蚝油','味精','清水'],
'cn-057':['青茄子','青辣椒','洋葱','西红柿','大葱','大蒜','鸡蛋','面粉','淀粉','酱油','盐','油','水'],
'cn-059':['紫菜','鸡蛋','葱花','水','盐','油','虾仁','香油','虾皮','淀粉'],
'west-001':['意大利面','意大利面酱','肉沫','洋葱','食用油','水'],
'west-003':['牛排','黑胡椒粉','盐','大蒜','橄榄油','黄油','口蘑','小土豆','小番茄','百里香','迷迭香','芦笋','预制牛排酱汁']}
for r in batch['recipes']:
 raw=r['rawMarkdown']; calc=next(s['markdown'] for s in r['sections'] if s['title']=='计算'); required=next(s['markdown'] for s in r['sections'] if s['title']=='必备原料和工具');
 ingredients=[]
 for name in names[r['recipeId']]:
  candidates=[]
  for origin,body in [('计算',calc),('必备原料和工具',required),('操作/附加内容',raw)]:
   lines=[x.strip() for x in body.splitlines() if name in x and not x.startswith('#')]
   if lines:candidates=[(origin,lines[0])];break
  if not candidates:raise Exception(r['recipeId']+' missing '+name)
  origin,line=candidates[0];line=re.sub(r'^(?:[-*]|\d+\.)\s+','',line)
  ingredients.append({'name':name,'raw':line,'amount':None,'sourceSection':origin})

 overrides={'cn-017':{'油':'锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。','开水':'倒入开水，煮成红汤。'},'cn-045':{'香油':'香油 2ml'},'cn-021':{'鸡':'鸡     半只(500g)'}}
 for i in ingredients:
  if i['name'] in overrides.get(r['recipeId'],{}):i['raw']=overrides[r['recipeId']][i['name']]
 r['evidence']['sources'][0]['ingredients']=ingredients
 if r['recipeId']=='cn-014':r['evidence']['sources'][0]['ingredients']=[i for i in ingredients if i['name'] not in ['酸笋包','花生包','豆皮包','木耳包','醋包','辣椒油']]+[{'name':'酸笋包、花生包、豆皮包、木耳包等配料包','raw':'酸笋包、花生包、豆皮包、木耳包等配料包','amount':None},{'name':'醋包、辣椒油等调味包','raw':'醋包、辣椒油等调味包','amount':None}]
 extras={'cn-056':'原文称素菜但含午餐肉和皮蛋；不改动上游描述。','cn-048':'准备工作留出的剩余蛋液，原文未交代后续去向。','cn-059':'操作第3步称起锅后第4步仍转小火，时序存在矛盾，保留原文。'}
 if r['recipeId'] in extras:r['limitations'].append(extras[r['recipeId']]);r['evidence']['notes'].append(extras[r['recipeId']])
 r['evidence']['sources'][0]['documentId']='not-ingested-yet'
 r.pop('ingestion',None)
 (base/(r['recipeId']+'.evidence.json')).write_text(json.dumps(r['evidence'],ensure_ascii=False,indent=2),encoding='utf-8')
(base/researchFile).write_text(json.dumps(batch,ensure_ascii=False,indent=2),encoding='utf-8')
print('Cleaned',len(batch['recipes']),'precise food-only lists')
