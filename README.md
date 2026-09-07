# Kaava vai kaaos

Tehtävä 01: puhdas TypeScript-pelimoottori ja testit. React + Vite sisältää vain aloitussivun; pelattava mobiilidemo toteutetaan tehtävässä 02. Alkuperäiset 64 korttia, 80 nimeä ja sisältöohjeet on säilytetty.

## Paikallinen käyttö

Node.js 22+ ja pnpm 11:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm run typecheck
pnpm run build
pnpm dev
```

Build tuottaa aloitussivun `dist/`-kansioon ja itsenäisen ES-moduulin `dist/engine/kaava-engine.js`. Moottori ei käytä Reactia, DOMia, verkkopalvelua tai LLM:ää. Riippuvuuslukko on `pnpm-lock.yaml`; vain esbuildin asennusskripti sallitaan projektin asetuksessa.

Pythonin alkuperäiset sisältötestit (Python 3.12, oma virtuaaliympäristö):

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements-content.txt
.venv\Scripts\python tools/validate_content.py
.venv\Scripts\python tools/test_pack.py
```

Tässä työympäristössä kirjastot asennettiin paikalliseen `.python-deps`-kansioon. Testiprosessin `PYTHONPATH` asetettiin siihen; Windowsin sandbox-oikeuksien vuoksi Pythonin onnistunut ajo tehtiin käyttäjän oikeuksilla. Globaalin Pythonin asetuksia ei muutettu.

## Moottorin käyttö

```ts
import { createRun, offerCard, previewChoice, applyChoice, serializeRun, restoreRun } from './src/engine';

let state = createRun({ seed: 'oma-toistettava-siemen', mode: 'hybrid' });
state = offerCard(state, 'P001');
const token = state.offeredCard!.token;
const preview = previewChoice(state, token, 'left');
state = applyChoice(state, token, 'left');
const loaded = restoreRun(serializeRun(state));
// Virhetilanteessa säilytä loaded.recoverableRaw vientiä varten.
```

Rajapinnan ajastus, tilan omistus ja demo-fixturet: [tilasopimus](docs/TILASOPIMUS_01.md). Seuraava rajattu työ: [NEXT_STEPS.md](NEXT_STEPS.md).
