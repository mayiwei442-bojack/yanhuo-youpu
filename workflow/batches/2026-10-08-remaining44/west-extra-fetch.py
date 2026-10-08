import importlib.util,concurrent.futures
from pathlib import Path
p=Path(__file__).with_name('west-fetch.py');s=importlib.util.spec_from_file_location('wf',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
targets={'west-007':['golden-beer-battered-fish-chips'],'west-013':['fettucine-alfredo'],'west-024':['chicken-schnitzel-coleslaw'],'west-025':['classic-swedish-meatballs'],'west-026':['beef-goulash-soup'],'west-027':['beer-battered-fish-tacos'],'west-030':['buttermilk-pancakes-maple-apples-pecans']}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:list(ex.map(m.run,targets.items()))
