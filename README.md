# Kaava vai kaaos

Paikallinen suomalainen hankekehityskorttipeli: tuuli-, aurinko- tai hybridihanke maanvuokrauksesta kaavahyväksyntään ja RtB:hen. Yksi kortti ja kaksi päätöstä, siemenellinen skenaario, rinnakkaiset selvitykset sekä jatkettava pelikerta.

Kampanjassa on 76 erikseen kirjoitettua korttia ja seitsemän vaiheen menettely. Onnistunut peli käyttää 55–59 päätöstä. Alkuperäinen 64 kortin pilotti ja 80 nimen pankki on säilytetty. Kehitystilan työpöydällä on pilottikatselin ja 12 päätöksen prologi. Tuotantopelissä ei ole kehittäjän testitiloja.

## Käynnistys

Node.js 22+ ja pnpm 11:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Avaa päätteen paikallinen osoite, tavallisesti http://127.0.0.1:5173. Valitse hankemuoto ja **Uusi hanke**. Käytä painikkeita, vaakavetoa tai nuolinäppäimiä. **Jatka hanketta** palauttaa tallennetun tilanteen arpomatta mitään uudelleen. Hankekansiossa ovat päätöshistoria ja JSON-vienti.

Tallennus on selaimen localStoragessa. Eri portti tai selain käyttää eri tallennusta; siirrä pelikerta JSON-tiedostolla. Virheellistä tallennusta ei muuteta uudeksi peliksi, ja alkuperäisen tekstin voi viedä talteen. Pelaa yhtä pelikertaa yhdessä välilehdessä: samanaikaisia kirjoituksia ei ole koordinoitu.

## Tarkistukset ja build

```sh
pnpm test
pnpm run typecheck
pnpm run build
pnpm exec playwright install chromium
pnpm run test:e2e
pnpm run test:offline
pnpm run simulate
```

Build tekee selaimen pelin `dist/`-kansioon sekä erilliset ES-moduulit `dist/engine/kaava-engine.js` ja `dist/campaign/kaava-campaign.js`. Simulaatio käyttää viimeisintä buildia. Molemmat moottorit ovat puhdasta TypeScriptiä ilman Reactia, DOMia, palvelinta tai pelinaikaista LLM:ää.

Pythonin sisältötestit omassa ympäristössä:

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements-content.txt
.venv\Scripts\python tools/validate_content.py
.venv\Scripts\python tools/test_pack.py
.venv\Scripts\python tools/validate_campaign.py
```

Tässä työympäristössä Python-riippuvuudet ovat projektin `.python-deps`-kansiossa ja Chromium `.playwright`-kansiossa. Ajossa asetettiin vain prosessin `PYTHONPATH` ja `PLAYWRIGHT_BROWSERS_PATH`. Globaaleja asetuksia ei muutettu. Tulokset ja testaamatta jääneet asiat: [QA-raportti](reports/QA_2026-09-07.md).

## Rakenne

- `src/engine`: perustan efektit, fyysiset kohteet, kello, RNG ja tallennus; [tilasopimus 01](docs/TILASOPIMUS_01.md).
- `src/campaign`: menettely, yleinen tutkimus ja hyväksymisen/RtB:n portit; [kampanjan tilasopimus](docs/TILASOPIMUS_RTB.md).
- `src/ui`: käyttöliittymä, tallennusadapteri ja kehitystilan sisältökatselin.
- `tools/build_campaign.mjs`: kampanjan kirjoitettu lähde; tuottaa `content/cards.campaign.fi.json` ja `content/campaign_flow.json`. Efektit eivät synny tekstin tulkinnasta.
- `tools/build_art.mjs`: 19 alkuperäisen SVG-kuvan lähde; [taiteen tarkistus](docs/TAIDE_JA_QA.md).
- `tools/build_pwa.mjs`: offline-välimuisti ja päivitys; [paikallinen PWA](docs/PAIKALLINEN_PWA.md).

```ts
import { createCampaign, previewCampaignChoice, applyCampaignChoice,
  serializeCampaign, restoreCampaign } from './src/campaign';

let game = createCampaign('valmis-1', 'hybrid');
const preview = previewCampaignChoice(game, 'left');
game = applyCampaignChoice(game, game.run.offeredCard!.token, 'left');
const loaded = restoreCampaign(serializeCampaign(game));
// Virheessä loaded.recoverableRaw säilytetään vientiä varten.
```

Lähdekoodin tallentaminen GitHubiin ei julkaise pelisivustoa. Internetjulkaisua ei ole tehty. Työn seuraava lähtökohta: [NEXT_STEPS.md](NEXT_STEPS.md).
