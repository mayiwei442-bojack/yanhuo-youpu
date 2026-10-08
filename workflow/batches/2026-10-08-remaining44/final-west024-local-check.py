import json,pathlib,hashlib
b=pathlib.Path('workflow/batches/2026-10-08-remaining44');j=json.loads((b/'final-database-verification.json').read_text(encoding='utf-8'));rows=[]
for image in j['west024IndependentMediaAudit']['images']:
 p=pathlib.Path(image['repositoryPath']);h=hashlib.sha256(p.read_bytes()).hexdigest();rows.append({**image,'localFileExists':p.is_file(),'localFileSha256':h,'localFileHashMatches':h==image['sha256']})
a={'recipeId':'west-024','source':'Independent local-file SHA256 readback following full two-copy database media readback in final-database-verification.json','images':rows,'ok':all(r['localFileHashMatches'] for r in rows)};(b/'west-024.final-local-media-verification.json').write_text(json.dumps(a,ensure_ascii=False,indent=2),encoding='utf-8');print('west024 local file hashes',a['ok'],len(rows))
