# Kaava vai kaaos

**[Avaa peli puhelimella](https://kaava-vai-kaaos.joni-vainio.chatgpt.site)** — julkinen testiversio, ei vaadi ChatGPT-kirjautumista. Linkin voi jakaa testaajille. Lähdekoodi: [GitHub](https://github.com/jonivainio/Kaava-vai-kaaos).

Suomalainen hankekehityskorttipeli. Kehitä fiktiivinen hybridihanke maanvuokrauksesta YVA:n ja kaavoituksen kautta rakentamisvalmiuteen. 18 päätöstä, välitarinoita ja 69 mahdollista hybridikohtaamista. Vaiheiden vaihtuminen näkyy erikseen, ja osa seurauksista selviää vasta myöhemmässä käsittelyssä. Tuuli ja Aurinko ovat valikossa vielä suljettuja. Vanha 64 kortin pilotti ja pitkä kampanja on säilytetty erillisenä vertailuaineistona.

Vedä korttia hiirellä tai sormella. Vedon aikana näet vaihtoehdon ja ennakkotiedon; palauta keskelle peruuttaaksesi. Nuolinäppäimet toimivat myös. Lyhyt tutorial ei tee päätöstä. Voittoruudulla saat pisteet ja selitykset viiveiden, pienennysten ja sijoittelun tiivistämisen vähennyksille.

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
node tools/simulate-swipe.mjs 3000 hybrid
python tools/validate_swipe.py
python tools/validate_content.py
python tools/test_pack.py
python tools/validate_campaign.py
```

Kolme viimeistä Python-komentoa tarvitsevat requirements-content.txt:n riippuvuudet. Build tekee selainpelin dist-kansioon sekä perustan, vanhan kampanjan ja uuden pelin erilliset ES-moduulit. Simulaatio käyttää viimeisintä buildia. Ei palvelinta tai pelinaikaista tekoälyä.

## Jatkokehitys

- Aktiivinen sisältö: `content/deck.fi.json`, `content/encounters.fi.json` ja `content/progress.fi.json`. Teksti ei suorita efektejä. Uudet komennot tarvitsevat tyypin, toteutuksen ja testin.
- [Tilasopimus](docs/TILASOPIMUS_SWIPE.md): determinismi, ajastus, portit, pisteet ja tallennus.
- [Alueprofiilit, ajastus ja lähteet](docs/ALUEET_JA_AJASTUS.md).
- [Alueversion testit ja julkaisun tarkistus](reports/QA_REGIONS_2026-09-08.md).
- [Sisällön uskottavuustarkistus ja lähteet](docs/SISALTOAUDITOINTI_2026-09-08.md).
- [Testitulokset ja rajoitukset](reports/QA_SWIPE_2026-09-08.md).
- [Täsmällinen seuraavan työn lähtökohta](NEXT_STEPS.md).

Peli on fiktiota. Kustannukset, käsittelyajat, riskimäärät ja onnistumisprosentit ovat pelisääntöjä, eivät hankkeiden tilastoa tai viranomaisohjeita.
