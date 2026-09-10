# Kaava vai kaaos

**[Avaa peli puhelimella](https://kaava-vai-kaaos.joni-vainio.chatgpt.site)** — julkinen testiversio, ei vaadi ChatGPT-kirjautumista. Linkin voi jakaa testaajille. Lähdekoodi: [GitHub](https://github.com/jonivainio/Kaava-vai-kaaos).

Lisäpaketti 01 on julkaistu 10.9.2026 (Sites-versio 7). Kirjautumaton kokonainen pelikerta on tarkistettu julkisesta osoitteesta. Päivitys (`v5-lp1-1`) avaa Tuuli-, Aurinko- ja Hybridi-pelimuodot. Julkaisun tarkka tila: [NEXT_STEPS](NEXT_STEPS.md). Päivitä vanha selainversio aloitusvalikosta ja aloita uusi peli. Edellisen version tallenne säilyy vietäväksi.

Suomalainen hankekehityskorttipeli: kehitä fiktiivinen hanke maanvuokrauksesta luvitetuksi. V5 ja LP1 sisältävät yhteensä 275 sisältö-ID:tä. Peliin valitaan 18 peruspäätöksen tavoite ja tarpeelliset jatkot. Hybridissä tuuliaiheita on eniten, aurinkoa toiseksi ja akulla enintään kaksi peruspäätöstä. Tuuliosan kaatuessa elinkelpoinen aurinko-osa voi ehdollisesti jatkaa samassa pelikerrassa. Hyväksyminen yksin ei ole voitto: lupien ja lainvoiman pitää olla kunnossa.

Vedä korttia hiirellä tai sormella. Vedon aikana näet valinnan; palauta keskelle peruuttaaksesi. Nuolinäppäimet toimivat myös. Tarinat ovat omia tekstikorttejaan, joissa kumpikin suunta jatkaa samaa tarinaa. Vaiheiden vaihtuminen vahvistetaan erikseen. Lupavoitosta saat enintään 1 000 pistettä ja perustelut vähennyksille. Vapaaehtoinen akku-epilogi ei peru voittoa.

Ajankulkukortteja on enintään kolme koko pelikerrassa, eikä niitä tule peräkkäin. Tavalliset valmistumiskuittaukset yhdistetään etenemiseen, ja ongelmattomia selvitystuloksia näytetään lyhyinä huomioina seuraavan tilanteen yhteydessä. Tärkeät tulokset ja vaihesiirtymät pysyvät näkyvissä. Harkittuihin yllätyksiin on lisätty lyhyt reaktio otsikon yläpuolelle. Yläreunan jokaisen muuttuneen hankeluvun alla näkyy sen viimeisin todellinen muutos, esimerkiksi 7 → 6 kpl.

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
node tools/simulate-lp1.mjs 3000 lp1-development reference hybrid
node tools/simulate-lp1.mjs 1000 lp1-development cautious solar
node tools/import-lp1.mjs --check
python tools/import_v5.py --check
python tools/validate_swipe.py
python tools/validate_content.py
python tools/test_pack.py
python tools/validate_campaign.py
```

Vanhojen sisältöjen Python-validoinnit tarvitsevat requirements-content.txt:n riippuvuudet. V5-tuonti käyttää Pythonin vakiokirjastoa. Build tekee selainpelin dist-kansioon ja moottorien erilliset ES-moduulit, myös `dist/v5/index.js`:n. Simulaatio käyttää viimeisintä buildia; LP1-strategiat ovat `reference`, `cautious` ja `economy`; viimeinen argumentti valitsee `wind`, `solar` tai `hybrid`. Paikallinen `/?review-v5` näyttää kaikki lähde-ID:t ja haarat kirjoittamatta pelitallennukseen. Ei taustapalvelinta tai pelinaikaista tekoälyä.

## Jatkokehitys

- [LP1:n 60 hyväksymistapausta ja 15 000 simulaation raportti](reports/lp1/QA.md).
- [LP1-tilasopimus](docs/LP1_TILASOPIMUS.md).
- Aktiivinen sisältö: `content/v5.fi.json` + `content/lp1.fi.json`; säännöt `src/game/v5`. V5-käsikirjoitus on ensisijainen, teksteistä ei päätellä efektejä.
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
