import pathlib,re,json
D=pathlib.Path(__file__).parent
mapping={'the-ultimate-beef-wellington-recipe':'west-016','coq-au-vin-chicken-red-wine-braise-recipe':'west-017','pressure-cooker-mushroom-risotto-recipe':'west-014','ultra-crispy-burgers-recipe':'west-005','fettuccine-alfredo-sauce-italian-pasta-recipe':'west-013','lighter-fettuccine-alfredo-recipe':'west-013','chicken-schnitzel-recipe':'west-024','the-best-chicken-parmesan-recipe':'west-015','ratatouille-provence-vegetable-stew-recipe':'west-018','beef-bourguignon-red-wine-stew-recipe':'west-021','crispy-fried-fish-tacos-recipe':'west-027','light-and-fluffy-pancakes-recipe':'west-030','grilled-bratwurst-with-beer-mustard-and-sauerkraut-recipe':'west-009'}
mapping.update({'the-best-swedish-meatballs-recipe':'west-025','bouillabaisse-marseillaise-fish-stew-recipe':'west-019'})
collected={}
for p in D.glob('west-se-*.txt'):
 for block in p.read_text(encoding='utf8').split('--------------------------------------------------------------------------------'):
  u=re.search(r'\((https://www.seriouseats.com/[^)]+)\)',block)
  if not u:continue
  url=u.group(1);slug=url.split('/')[-1]
  if slug not in mapping:continue
  lines={int(n):t.strip() for n,t in re.findall(r'L(\d+): (.*?)(?=L\d+: |$)',block,re.S)}
  collected.setdefault(url,{}).update(lines)
def clean(t):
 t=re.sub(r'cite\d+†(.*?)',r'\1',t)
 return t.strip()
for url,rows in collected.items():
 seq=[clean(t) for n,t in sorted(rows.items())];text='\n'.join(seq)
 if '## Ingredients' not in text or '## Directions' not in text:continue
 ingredients=text.split('## Ingredients',1)[1].split('## Directions',1)[0]
 rawings=[re.sub(r'^\*\s*','',s) for s in ingredients.splitlines() if s.startswith('*')]
 method=text.split('## Directions',1)[1];method=re.split(r'\n## ',method)[0]
 steps=[]
 for row in method.splitlines():
  if not row or 'Image:' in row or 'Serious Eats' in row:continue
  m=re.match(r'^(\d+)\.\s*(.*)',row)
  if m:steps.append({'@type':'HowToStep','text':m.group(2)})
  elif steps and not row.startswith('['):steps[-1]['text']+=' '+row
 if len(steps)<2:continue
 if not text.endswith('Newsletter Sign Up') and ('## Special' not in text and '## Notes' not in text):continue
 name=next((s[2:] for s in seq if s.startswith('# ')),url.split('/')[-1])
 recipe={'name':name,'recipeIngredient':rawings,'recipeInstructions':steps,'recipeYield':None,'image':[],'description':name}
 for label,key in [('Prep Time:','prepTime'),('Cook Time:','cookTime'),('Total Time:','totalTime'),('Servings:','recipeYield')]:
  if label in seq:
   i=seq.index(label);recipe[key]=next((s for s in seq[i+1:] if s),'')
 tips=[]
 if '## Notes' in text:tips=[s for s in text.split('## Notes',1)[1].split('## ',1)[0].splitlines() if s]
 out={'url':url,'sourceName':'Serious Eats','recipe':recipe,'tips':tips,'rawText':text,'retrievalMethod':'normal web.open full accessible page; merged overlapping line ranges; direct requests460 and browser402 retained as transport history','mediaNote':'Page images and step adjacencies visible in web.open; original binary URLs not returned by failed web.click. No verified downloadable media available, no invented image mappings.'}
 id=mapping[url.split('/')[-1]];f=D/(id+'.se-'+url.split('/')[-1]+'.json');f.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf8');print(id,name,len(rawings),len(steps))
