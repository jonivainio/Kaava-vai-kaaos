# Kaava vai kaaos

**[Avaa peli puhelimella](https://kaava-vai-kaaos.joni-vainio.chatgpt.site)** — julkinen testiversio, ei vaadi ChatGPT-kirjautumista. Linkin voi jakaa testaajille. Lähdekoodi: [GitHub](https://github.com/jonivainio/Kaava-vai-kaaos).

Suomalainen hankekehityskorttipeli. Kehitä fiktiivinen hybridihanke maanvuokrauksesta YVA:n ja kaavoituksen kautta luvitetuksi. V5:n sisältöpankissa on 159 päätöstä, 89 tapahtumaa ja 143 tuloshaaraa. Yhteen peliin valikoituu osa sisällöstä: neljä vaihetta, 21 peruspäätöksen tavoite sekä tarvittavat jatkopäätökset. Hyväksyminen yksin ei ole voitto; tarvittavien lupien ja lainvoiman on oltava kunnossa. Tuuli ja Aurinko ovat valikossa vielä suljettuja. Vanha 64 kortin pilotti ja aiemmat kampanjat säilyvät vertailuaineistona.

Vedä korttia hiirellä tai sormella. Vedon aikana näet valinnan; palauta keskelle peruuttaaksesi. Nuolinäppäimet toimivat myös. Tarinat ovat omia tekstikorttejaan, joissa kumpikin suunta jatkaa samaa tarinaa. Vaiheiden vaihtuminen vahvistetaan erikseen. Lupavoitosta saat enintään 1 000 pistettä ja perustelut vähennyksille. Vapaaehtoinen akku-epilogi ei peru voittoa.

Mobiiliselaimessa koko näytön tilaa pyydetään **Aloita hanke** / **Jatka** -eleestä, jos selain tukee sitä. iPhonessa käytä **Jaa → Lisää Koti-valikkoon**. Sivusto toimii myös tavallisessa selainikkunassa. Automaattista fullscreeniä ilman käyttäjän elettä ei voida luvata kaikissa selaimissa.

## Paikallinen käynnistys

Node.js 22+ ja pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Avaa päätteen paikallinen osoite, yleensä http://127.0.0.1:5173. Pelivalikosta voi antaa toistettavan siemenen. **Jatka** palauttaa nimen, tilanteen ja keskeneräiset työt arpomatta mitään uudelleen. Tallennus on selaimen localStoragessa; eri laite tai osoite ei jaa sitä. JSON-vienti ja tuonti löytyvät pelivalikosta. Väärän version tallennus säilytetään vientiin. Käytä yhtä pelikertaa yhdessä välilehdessä.

## Testit

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:offline
node tools/simulate-v5.mjs 3000 v5-development random
node tools/simulate-v5.mjs 10000 v5-validation cautious
python tools/import_v5.py --check
python tools/validate_swipe.py
python tools/validate_content.py
python tools/test_pack.py
python tools/validate_campaign.py
```

Vanhojen sisältöjen Python-validoinnit tarvitsevat requirements-content.txt:n riippuvuudet. V5-tuonti käyttää Pythonin vakiokirjastoa. Build tekee selainpelin dist-kansioon ja moottorien erilliset ES-moduulit, myös `dist/v5/index.js`:n. Simulaatio käyttää viimeisintä buildia; strategiat ovat `random`, `cautious`, `economy`, `scope`, `canonical-a` ja `canonical-b`. Paikallinen `/?review-v5` näyttää kaikki lähde-ID:t ja haarat kirjoittamatta pelitallennukseen. Ei taustapalvelinta tai pelinaikaista tekoälyä.

## Jatkokehitys

- Aktiivinen sisältö: `content/v5.fi.json`; säännöt `src/game/v5`. V5-käsikirjoitus on ensisijainen, teksteistä ei päätellä efektejä.
- [V5-tilasopimus](docs/v5/TILASOPIMUS.md): determinismi, ajastus, luvat, pisteet ja tallennus.
- [248 ID:n kohdistus ja kuvakartta](reports/v5/content-coverage.json).
- [143 tuloshaaran testitulokset](reports/v5/result-branch-tests.json).
- [V5:n K01–K60-hyväksymisraportti, simulaatiot ja rajaukset](reports/v5/QA_V5.md).
- [Alueprofiilit, ajastus ja lähteet](docs/ALUEET_JA_AJASTUS.md).
- [Alueversion testit ja julkaisun tarkistus](reports/QA_REGIONS_2026-09-08.md).
- [Sisällön uskottavuustarkistus ja lähteet](docs/SISALTOAUDITOINTI_2026-09-08.md).
- [Testitulokset ja rajoitukset](reports/QA_SWIPE_2026-09-08.md).
- [Täsmällinen seuraavan työn lähtökohta](NEXT_STEPS.md).

Peli on fiktiota. Kustannukset, käsittelyajat, riskimäärät ja onnistumisprosentit ovat pelisääntöjä, eivät hankkeiden tilastoa tai viranomaisohjeita.
