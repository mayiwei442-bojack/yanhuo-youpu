import json, pathlib, subprocess, concurrent.futures, hashlib
base = pathlib.Path(__file__).parent
batch = json.loads((base / 'research.json').read_text(encoding='utf-8'))
if (base / 'research-additions.json').exists():
    additions = json.loads((base / 'research-additions.json').read_text(encoding='utf-8'))
    known = {r['recipeId'] for r in batch['recipes']}
    batch['recipes'].extend(r for r in additions['recipes'] if r['recipeId'] not in known)
images = [(r['recipeId'], image) for r in batch['recipes'] for image in r['images']]
previous = {r['path']: r for r in json.loads((base / 'media-import.json').read_text(encoding='utf-8'))} if (base / 'media-import.json').exists() else {}
def download(entry):
    recipe_id, image = entry
    target = pathlib.Path(image['path'])
    if image['path'] in previous and target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == previous[image['path']]['sha256']:
        return previous[image['path']]
    target.parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(['curl.exe', '--proxy', 'http://127.0.0.1:7897', '--fail', '--silent', '--show-error', '--location', '--max-time', '60', '--write-out', '%{http_code}\n%{content_type}', image['originalUrl'], '--output', str(target)], capture_output=True, text=True)
    if proc.returncode:
        return {'recipeId': recipe_id, **image, 'ok': False, 'error': 'Image request failed'}
    status, content_type = proc.stdout.split('\n', 1)
    body = target.read_bytes()
    ok = status == '200' and content_type.startswith('image/') and len(body) > 0
    return {'recipeId': recipe_id, **image, 'ok': ok, 'httpStatus': int(status), 'contentType': content_type, 'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    results = list(pool.map(download, images))
(base / 'media-import.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
(base / 'UPSTREAM-LICENSE.txt').write_text(batch['licenseRaw'], encoding='utf-8')
print(json.dumps({'downloaded': sum(r['ok'] for r in results), 'total': len(results), 'failed': [r['path'] for r in results if not r['ok']]}))
if not all(r['ok'] for r in results): raise SystemExit(1)
