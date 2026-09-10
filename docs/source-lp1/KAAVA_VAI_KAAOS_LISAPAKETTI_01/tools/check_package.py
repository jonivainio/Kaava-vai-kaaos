#!/usr/bin/env python3
"""Validate the delivered source bundle. Does not execute or test the game."""
from __future__ import annotations
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import sys


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--report', type=Path, help='Optional path for the check result JSON')
    args = parser.parse_args()
    root = args.root.resolve()
    errors: list[str] = []
    checks: list[str] = []
    def check(condition: bool, message: str) -> None:
        (checks if condition else errors).append(message)
    def load(name: str):
        return json.loads((root / name).read_text(encoding='utf-8'))
    try:
        required = ['00_ALOITA_TASTA.txt', '01_TOTEUTUSOHJE.md', '02_UUDET_KORTIT_JA_EVENTIT.md',
                    '03_PELIMUODOT_JA_AURINKOJATKO.md', '04_TESTIT.md', '05_LAHTEET.md',
                    '06_NYKYSISALLON_MOODIAUDITOINTI.md', 'data/uusi_sisalto.json',
                    'data/baseline_index.json', 'data/moodiauditointi.json', 'data/mooditekstit.json',
                    'data/hyvaksyntatestit.json', 'data/lahteet.json']
        check(all((root/f).is_file() for f in required), 'Required files exist')
        data=load('data/uusi_sisalto.json'); base=load('data/baseline_index.json')
        audit=load('data/moodiauditointi.json'); modes=load('data/mooditekstit.json')
        tests=load('data/hyvaksyntatestit.json'); sources=load('data/lahteet.json')
        entries=data['entries']; dialogs=data['confirmationDialogs']; combined=entries+dialogs
        ids=[x['id'] for x in combined]; idset=set(ids); oldids={x['id'] for x in base['entries']}
        check(len(ids)==len(idset), 'New IDs unique')
        check(not(idset&oldids), 'New IDs do not collide with baseline')
        counts=Counter(x['kind'] for x in entries)
        check(counts=={'decision':13,'event':11} and len(dialogs)==3, '13 decisions, 11 events, 3 confirmations')
        check(len(base['entries'])==248 and len(oldids)==248,'248 unique baseline content IDs')
        check({x['id'] for x in audit['entries']}==oldids and len(audit['entries'])==248,'Mode audit covers every baseline ID once')
        check(all(x['runtimeAuditStatus']=='implementation-required' for x in audit['entries']), 'Mode audit not misrepresented as executed')
        validcontexts=set(data['contexts'])
        check(all(set(x['contexts'])<=validcontexts and x['contexts'] for x in combined), 'All context tags valid')
        byid={x['id']:x for x in combined}
        for e in combined:
            for target in e.get('nextIds',[]):
                check(target in idset|oldids, f"{e['id']} -> {target} target exists")
                if target in byid:
                    cross=e['id']=='LP1-H01' and target=='LP1-E-H01'
                    check(bool(set(e['contexts'])&set(byid[target]['contexts'])) or cross, f"{e['id']} -> {target} context transition possible")
        sourceids={x['id'] for x in sources['sources']}
        check(len(sourceids)==18, '18 unique research sources')
        md=(root/'02_UUDET_KORTIT_JA_EVENTIT.md').read_text(encoding='utf-8')
        for e in entries:
            check(e['title'] in md and (not e['body'] or e['body'] in md),f"{e['id']} text matches Markdown")
            check(set(e['sources'])<=sourceids,f"{e['id']} references known sources")
            check(bool(e['eligibility'] and e['artBrief']), f"{e['id']} has eligibility and art brief")
            if e['kind']=='decision':
                check(set(e['choices'])=={'A','B'},f"{e['id']} has A/B")
                for side,c in e['choices'].items():
                    check(bool(c['label'] and c['result'] and c['effect']),f"{e['id']}/{side} has player result and effect")
                    check(len(c['label'])<=60,f"{e['id']}/{side} label <=60 characters")
                    check(c['label'] in md and c['result'] in md,f"{e['id']}/{side} text matches Markdown")
            else:
                bids=[b['id'] for b in e['branches']]
                check(bool(bids) and len(bids)==len(set(bids)),f"{e['id']} branch IDs unique and nonempty")
                for b in e['branches']:
                    check(bool(b['when'] and b['text'] and b['effect']),f"{e['id']}/{b['id']} complete branch")
                    check(b['text'] in md,f"{e['id']}/{b['id']} text matches Markdown")
                    check(set(b['nextIds'])<=idset|oldids,f"{e['id']}/{b['id']} valid targets")
        for d in dialogs:
            check(d['source'] in idset,f"{d['id']} source exists")
            for f in ['title','body','A','B','A_result','B_result']:
                check(bool(d[f]) and d[f] in md,f"{d['id']}/{f} matches Markdown")
        for m in modes['overrides']:
            check(m['sourceId'] in oldids,f"Overlay {m['sourceId']} targets existing entry")
        tids=[t['id'] for t in tests['tests']]
        check(len(tids)==60 and len(set(tids))==60,'60 named acceptance tests')
        check(all(t['status']=='not_run' for t in tests['tests']),'Acceptance tests not claimed executed')
        expected={(e['id'],b['id']) for e in entries for b in e['branches']}
        actual={(b['contentId'],b['branchId']) for b in tests['eventBranchCoverage']}
        check(expected==actual and len(actual)==33,'All 33 event branches in test coverage spec')
        for p in root.rglob('*.md'):
            value=p.read_text(encoding='utf-8')
            check('\ufffd' not in value,f'{p.relative_to(root)} has no replacement characters')
        player='\n'.join(e['title']+' '+e['body']+' '+ ' '.join(c['result'] for c in e['choices'].values())+' '+' '.join(b['text'] for b in e['branches']) for e in entries)
        check(not re.search(r'MUUTOS:|riskikorttien aktivo|CODEX /|branchId|caseId|world\.',player), 'New player prose has no known developer-label leaks')
        variables=set(re.findall(r'\{([A-Za-z]+)\}',json.dumps(data,ensure_ascii=False)))
        allowed={'yieldLossPct','solarAcMW','dcLowMWp','dcHighMWp','solarHa','lostSolarHa','remainingSolarHa','oldWindMW','newWindMW','oldHeightM','newHeightM'}
        check(variables<=allowed, 'Only documented text variables used')
        manifest=root/'SHA256SUMS.txt'
        if manifest.exists():
            for line in manifest.read_text().splitlines():
                digest,name=line.split('  ',1); p=root/name
                check(p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==digest,f'Manifest {name}')
        result={'package':'kaava-lisapaketti-01','bundleValidation':'PASS' if not errors else 'FAIL',
                'checksPassed':len(checks),'errors':errors,'counts':{'decisions':13,'events':11,'confirmations':3,'sources':18,'acceptanceCases':60,'eventBranches':33,'baselineIDs':248},
                'gameTestsExecuted':False,'gameRepositoryModified':False,
                'scope':'Only source bundle structure, references, text correspondence and optional checksums; not implemented gameplay.'}
    except (OSError,ValueError,KeyError,TypeError) as exc:
        result={'bundleValidation':'FAIL','errors':[f'{type(exc).__name__}: {exc}'],'gameTestsExecuted':False}
    if args.report:
        args.report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2))
    return 0 if result['bundleValidation']=='PASS' else 1

if __name__=='__main__':
    sys.exit(main())
