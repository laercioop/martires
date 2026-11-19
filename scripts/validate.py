from pathlib import Path
import json, datetime, urllib.parse
root=Path(__file__).resolve().parent.parent
data=json.loads((root/'data/martyrs.json').read_text())
records=data['records']; ids=set()
assert len(records)>100
for p in records:
 assert p['id'] not in ids, f"Duplicate person {p['id']}"
 ids.add(p['id'])
 assert p['name'] and p['dates'] and p['sources']
 assert 1<=p['year']<=p['yearEnd']<=datetime.date.today().year
 assert p['year']==min(d['year'] for d in p['dates'])
 assert p['yearEnd']==max(d['year'] for d in p['dates'])
 if p['reviewed']: assert len(p['sources'])>=2 and p.get('note')
 for source in p['sources']: assert urllib.parse.urlparse(source['url']).scheme=='https'
 for l in p['locations']:
  if 'lat' in l: assert -90<=l['lat']<=90 and -180<=l['lon']<=180
assert json.loads((root/'assets/land.geojson').read_text())['type']=='FeatureCollection'
assert all((root/p).exists() for p in ['index.html','style.css','app.js','assets/fonts.css'])
print(f'Dados válidos: {len(records)} pessoas únicas, {sum(p["reviewed"] for p in records)} conferidas.')
