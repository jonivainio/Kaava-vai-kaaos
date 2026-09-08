#!/usr/bin/env python3
"""Read-only validation of the Kaava vai kaaos v5 handoff package.

Uses only the Python standard library. Does not validate game execution,
legal correctness, visual quality, balancing or implementation completeness.
A changed user manuscript must be re-indexed intentionally; never restore
an older manuscript just to satisfy this snapshot's checksums.
"""
from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import sys


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def inspect_source(path: Path) -> tuple[str, list[dict]]:
    raw = path.read_bytes()
    text = raw.decode('utf-8')
    starts = list(re.finditer(r'^### \[(.+)\][ \t]*$', text, re.MULTILINE))
    records = []
    for i, match in enumerate(starts):
        limit = starts[i + 1].start() if i + 1 < len(starts) else len(text)
        tail = text[match.start():limit]
        separator = re.search(r'^---[ \t]*$', tail, re.MULTILINE)
        block = tail[:separator.start()].rstrip() if separator else tail.rstrip()
        fields: dict[str, list[str]] = {}
        for line in block.splitlines():
            field = re.match(r'^\*\*([^*\n]+):\*\*[ \t]*(.*)$', line)
            if field:
                fields.setdefault(field[1], []).append(field[2])
        is_card = 'Kortti-ID' in fields
        id_key = 'Kortti-ID' if is_card else 'Tapahtuma-ID'
        source_id = fields[id_key][0].strip('`')
        if source_id != match[1]:
            raise ValueError(f'ID ei vastaa otsikkoa: {source_id!r} / {match[1]!r}')
        stage = int(fields['Vaihe'][0].split()[0])
        if stage not in (1, 2, 3, 4):
            raise ValueError(f'Virheellinen vaihe: {source_id}')
        if '#### PELAAJALLE' not in block or '#### CODEX / PELILOGIIKKA' not in block:
            raise ValueError(f'Pelaajatekstin/logiikan osio puuttuu: {source_id}')
        player = block.split('#### PELAAJALLE', 1)[1].split('#### CODEX / PELILOGIIKKA', 1)[0].strip()
        if is_card:
            choices = re.findall(r'^##### Valinta ([AB])[ \t]*$', player, re.MULTILINE)
            if choices != ['A', 'B'] or len(fields.get('Pyyhkäisyteksti', [])) != 2:
                raise ValueError(f'A/B-valintoja puuttuu tai on liikaa: {source_id}')
            for label in fields['Pyyhkäisyteksti']:
                if not label or len(label) > 60:
                    raise ValueError(f'Pyyhkäisyteksti ei täytä lähdeversion 1–60 merkin rajaa: {source_id}')
        source_line = text.count('\n', 0, match.start()) + 1
        references = re.findall(r'`([^`]+)`', ' '.join(fields.get('Kytketyt tunnisteet', [])))
        records.append({
            'id': source_id,
            'kind': 'decision' if is_card else 'event',
            'stage': stage,
            'title_for_navigation': fields['Kortin otsikko' if is_card else 'Tapahtuman otsikko'][0],
            'start_line': source_line,
            'end_line': source_line + len(block.splitlines()) - 1,
            'source_block_sha256': sha256(block.encode('utf-8')),
            'player_section_sha256': sha256(player.encode('utf-8')),
            'referenced_ids': references,
            'branch_conditions_from_source': [key[8:] for key in fields if key.startswith('Haara — ')],
        })
    actual_phases = re.findall(r'^## VAIHE ([1-4]):', text, re.MULTILINE)
    if actual_phases != ['1', '2', '3', '4']:
        raise ValueError(f'Vaiheotsikot eivät vastaa nelijakoa: {actual_phases}')
    return sha256(raw), records


def check(root: Path) -> list[str]:
    index = json.loads((root / '03_SISALTOINDEKSI.json').read_text(encoding='utf-8'))
    manuscript = root / index['authoritative_manuscript']
    actual_sha, records = inspect_source(manuscript)
    if actual_sha != index['manuscript_sha256']:
        raise ValueError('Käsikirjoitus on muuttunut indeksin jälkeen. Tunnista käyttäjän uusin lähde ja päivitä johdettu indeksi; älä palauta tekstiä vanhaksi.')
    ids = [r['id'] for r in records]
    if len(ids) != len(set(ids)):
        raise ValueError('Sisältö-ID toistuu.')
    kinds = Counter(r['kind'] for r in records)
    if kinds != Counter({'decision': 159, 'event': 89}):
        raise ValueError(f'Sisältömäärät eivät vastaa tämän paketin v5-lähtöversiota: {kinds}')
    actual_by_id = {r['id']: r for r in records}
    indexed_by_id = {r['id']: r for r in index['entries']}
    if set(actual_by_id) != set(indexed_by_id) or len(index['entries']) != len(records):
        raise ValueError('Indeksin ja lähteen tunnistejoukot eroavat.')
    for record in records:
        indexed = indexed_by_id[record['id']]
        for key, value in record.items():
            if indexed.get(key) != value:
                raise ValueError(f'Indeksipoikkeama {record["id"]}: {key}')
        missing = set(record['referenced_ids']) - set(ids)
        if missing:
            raise ValueError(f'Puuttuva viitattu tunniste {record["id"]}: {sorted(missing)}')
    if set(index['removed_active_content_ids']) & set(ids):
        raise ValueError('Poistettu sisältö on edelleen käsikirjoituksessa.')
    if actual_by_id['P3-SOPIMUS']['kind'] != 'decision':
        raise ValueError('P3-SOPIMUS ei ole päätös.')
    if sum(r['id'].startswith('interludes[') for r in records) != 13:
        raise ValueError('Interlude-tunnisteiden määrä ei ole 13.')
    if len(re.findall(r'\| K\d{2} \|', (root / '02_HYVAKSYNTATESTIT.md').read_text(encoding='utf-8'))) != 60:
        raise ValueError('Hyväksymistestejä ei ole 60.')
    checksum_file = root / 'SHA256SUMS.txt'
    verified = 0
    if not checksum_file.is_file():
        raise ValueError('SHA256SUMS.txt puuttuu.')
    for line in checksum_file.read_text(encoding='utf-8').splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        expected, rel = line.split('  ', 1)
        target = root / rel
        if root.resolve() not in target.resolve().parents:
            raise ValueError(f'Paketin ulkopuolinen tarkistuskohde: {rel}')
        if sha256(target.read_bytes()) != expected:
            raise ValueError(f'Tarkistussumma ei täsmää: {rel}')
        verified += 1
    branch_count = sum(len(r['branch_conditions_from_source']) for r in records)
    report = [
        'PASS — Toimitusaineiston eheys ja indeksin vastaavuus',
        f'Ensisijainen lähde: {manuscript.name}',
        f'SHA-256: {actual_sha}',
        f'Yksikäsitteisiä sisältö-ID:itä: {len(records)}',
        f'Päätöksiä/variantteja: {kinds["decision"]}; tapahtumia/tuloksia/loppuja: {kinds["event"]}',
        f'Nimettyjä Haara-otsikoita lähteessä: {branch_count}',
        'Pyyhkäisyvalintoja: 318; kaikki tämän v5-version valintatekstit enintään 60 merkkiä',
        'Vaiheotsikot: 1, 2, 3, 4; täydellisiä interlude-ID:itä: 13',
        'Viisi poistettua ID:tä eivät ole lähdesisällössä; P3-SOPIMUS on päätös',
        'Kaikki eksplisiittiset Kytketyt tunnisteet -viitteet löytyvät lähteestä',
        'Hyväksymistestisuunnitelman rivejä: 60 (EI ajettuja pelitestejä)',
        f'Paketin tiedostotarkistuksia: {verified}',
    ]
    for phase in range(1, 5):
        counts = Counter(r['kind'] for r in records if r['stage'] == phase)
        report.append(f'Vaihe {phase}: {counts["decision"]} päätöstä, {counts["event"]} tapahtumaa')
    report += [
        '',
        'RAJAUS: tämä ei aja pelin TypeScript-moottoria, selaintestejä tai tasapainosimulaatiota.',
        'Tämä ei todista oikeudellista ajantasaisuutta, seurausketjujen runtime-toimintaa tai kuvituksen laatua.',
        'Indeksin referenced_ids on tekstiviitejoukko, ei suoritettava tapahtumagraafi.',
    ]
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
    args = parser.parse_args()
    try:
        print('\n'.join(check(args.root)))
        return 0
    except (OSError, ValueError, KeyError, IndexError, TypeError) as exc:
        print(f'FAIL — {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
