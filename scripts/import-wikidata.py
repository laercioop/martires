#!/usr/bin/env python3
"""Download a reproducible CC0 snapshot; never promotes imports to reviewed records."""
from pathlib import Path
import argparse, datetime, json, re, subprocess, tempfile
ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--input', type=Path, help='Use an existing SPARQL JSON response')
args = parser.parse_args()
if args.input:
    raw = json.loads(args.input.read_text())
else:
    result = subprocess.run(['curl', '--fail', '--retry', '2', '--max-time', '120', '-sG',
        'https://query.wikidata.org/sparql', '-H', 'Accept: application/sparql-results+json',
        '-A', 'MartiresAtlas/1.0 (https://github.com/laercioop/martires)',
        '--data-urlencode', f'query@{ROOT / "scripts/martyrs.sparql"}'], check=True, capture_output=True)
    raw = json.loads(result.stdout)
people = {}
for row in raw['results']['bindings']:
    value = lambda key, default='': row.get(key, {}).get('value', default)
    qid = value('person').split('/')[-1]
    year = int(value('death').split('-')[0] or '0')
    if int(value('precision')) < 9 or not 1 <= year <= datetime.date.today().year:
        continue
    p = people.setdefault(qid, dict(id=qid, name=value('personLabel'), description=value('personDescription'),
        status='Beato(a)' if value('status').endswith('/Q2369287') else 'Santo(a)',
        dates=[], locations=[], sources=[dict(label='Wikidata · dados e referências', url=f'https://www.wikidata.org/wiki/{qid}')], reviewed=False))
    date = dict(value=value('death')[:10], year=year, precision=int(value('precision')))
    if date not in p['dates']: p['dates'].append(date)
    if value('place'):
        location = dict(id=value('place').split('/')[-1], name=value('placeLabel'), country=value('countryLabel', 'País não informado'))
        match = re.fullmatch(r'Point\(([-\d.]+) ([-\d.]+)\)', value('coord'))
        if match: location.update(lon=float(match[1]), lat=float(match[2]))
        if location not in p['locations']: p['locations'].append(location)
# Editorial overrides are independent of future imports.
overrides_path = ROOT / 'data/reviewed.json'
if overrides_path.exists():
    for patch in json.loads(overrides_path.read_text()):
        qid = patch['id']
        if qid in people:
            people[qid].update(patch)
        else:
            people[qid] = patch
# Identity references add citations and localized labels without changing review status.
identity = json.loads((ROOT / 'data/identity-references.json').read_text())
registry_url = (
    'https://github.com/CatholicOS/crmedr/blob/'
    f'{identity["crmedrRevision"]}/data/persons_commemorated.json'
)
for qid, reference in identity['people'].items():
    person = people.get(qid)
    if person is None:
        continue
    if 'name' in reference and not person['reviewed']:
        person['name'] = reference['name']
        if 'nameSource' in reference:
            person['sources'].append(dict(
                label='Martirológio Romano em português · grafia do nome',
                url=reference['nameSource'],
            ))
    if 'martyrologyLine' in reference:
        person['sources'].append(dict(
            label='Martirológio Romano · identificação no CRMEDR',
            url=f'{registry_url}#L{reference["martyrologyLine"]}',
        ))

records = list(people.values())
for p in records:
    p['dates'].sort(key=lambda d: d['value'])
    p['year'] = min(d['year'] for d in p['dates'])
    p['yearEnd'] = max(d['year'] for d in p['dates'])
    p['locations'].sort(key=lambda l: ('lat' not in l, l['name']))
records.sort(key=lambda p: (p['year'], p['name']))
output = dict(updatedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),
    source='Wikidata', license='CC0-1.0', records=records)
if len(records) < 100: raise SystemExit('Unexpected small result: refusing to replace the snapshot')
with tempfile.NamedTemporaryFile('w', dir=ROOT/'data', delete=False) as f:
    json.dump(output, f, ensure_ascii=False, indent=2); temp=Path(f.name)
temp.replace(ROOT / 'data/martyrs.json')
(ROOT/'data/wikidata.raw.json').write_text(json.dumps(raw, ensure_ascii=False))
print(f'{len(records)} people; {sum(any("lat" in l for l in p["locations"]) for p in records)} mapped; {sum(p["reviewed"] for p in records)} reviewed')
