"""Validate the active swipe deck, separately from the preserved pilot/campaign."""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
deck=json.loads((ROOT/'content/deck.fi.json').read_text(encoding='utf-8'))
variants=json.loads((ROOT/'content/encounters.fi.json').read_text(encoding='utf-8'))
ids=set(); arts=set(); texts=[]
def collect(value):
    if isinstance(value,dict):
        if 'art' in value: arts.add(value['art'])
        for key,item in value.items():
            if key in ('title','question','body','note','label'): texts.append(item)
            collect(item)
    elif isinstance(value,list):
        for item in value: collect(item)
collect(deck);collect(variants)
for item in deck['decisions']:
    assert item['id'] not in ids
    ids.add(item['id'])
assert [sum(d['stage']==s for d in deck['decisions']) for s in range(4)]==[2,5,7,4]
assert {'solarNature','solarWater','defence','opinions'} <= ids
for family in ('variants','solarVariants'):
    for group,items in variants[family].items():
        assert group in ids
        for item in items:
            assert item['id'] not in ids
            ids.add(item['id'])
            assert len(item['question'])<=250
            assert len(item['title'])<=70
for art in arts|{'hybridscape'}:
    path=ROOT/'public/art'/f'{art}.svg'
    assert path.is_file(),path
    ET.parse(path)
for text in texts:
    assert '\ufffd' not in text,'Encoding error'
    assert not re.search(r'valkolehdok|vuokraoptio|tiekunta|Silta jäi|ainoa mahdollinen paikka',text,re.I),text
hybrid=len(deck['decisions'])+sum(map(len,variants['variants'].values()))
solar_extra=sum(map(len,variants['solarVariants'].values()))
print(f'Active content OK: {hybrid} hybrid situations, {solar_extra} additional solar-mode variants, {len(arts|{"hybridscape"})} referenced SVGs, 18 decisions/run.')
