#!/usr/bin/env python3
"""Render a text preview from canonical JSON. No image or game rendering is done."""
from pathlib import Path
import json
ROOT = Path(__file__).resolve().parents[1]


def read(name):
    return json.loads((ROOT / name).read_text(encoding='utf-8'))


def main():
    pack = read('content/cards.pilot.fi.json')
    manifest = read('content/pilot_manifest.json')
    editorial = {x['cardId']: x for x in read('content/editorial.fi.json')['cards']}
    lines = [f"# {len(pack['cards'])} fiktiivistä pilottikorttia — esikatselu v2", '',
             'Kortit on kirjoitettu surkuhupaiseksi hankekehityssatiiriksi. Niiden vaatimukset, henkilöt ja tilanteet ovat fiktiivisiä. Tämä on JSON-datasta tuotettu tekstiesikatselu, ei pelattava kampanja.', '',
             'Vasemman ja oikean valinnan vaikutuskäskyt esitetään sellaisinaan, jotta kirjoitettu seuraus voidaan tarkastaa dataa vasten. Pisteet ja kuukaudet ovat pelilukuja. Ehdot ja jonotuksen säännöt sitovat myös hauskoja kortteja.', '']
    for card in pack['cards']:
        meta = editorial[card['id']]
        lines += [f"## {card['id']} — {card['title']}", '', card['body'], '',
                  f"**Puhuja:** {manifest['roles'][card['speakerId']]} · **Kuvitusavain:** `{card['artKey']}`", '',
                  f"**Vaiheet:** {', '.join(card['phases'])} · **Hanketyypit:** {', '.join(card['modes'])} · **Tarjoaminen:** {card['trigger']}", '',
                  f"**Sävy:** {card['tone']} · **Huumoritaso:** {meta['comedyLevel']}/3 · **Perhe:** {meta['family']}", '']
        if card['requiresAll']:
            lines += ['**Kaikkien ehtojen täytyttävä:**', '', '```json', json.dumps(card['requiresAll'], ensure_ascii=False, indent=2), '```', '']
        for direction, label in [('left', 'Vasemmalle'), ('right', 'Oikealle')]:
            choice = card['choices'][direction]
            lines += [f"### {label}: {choice['label']}", '', choice['outcomeText'], '',
                      f"Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **{choice['timeMonths']} kk**.", '',
                      '```json', json.dumps({'effects': choice['effects'], 'delayed': choice['delayed']}, ensure_ascii=False, indent=2), '```', '']
    path = ROOT / 'docs/PILOTTIKORTIT_ESIKATSELU.md'
    path.write_text('\n'.join(lines), encoding='utf-8')
    print(f'WROTE: {path.name}; {len(pack["cards"])} cards')


if __name__ == '__main__':
    main()
