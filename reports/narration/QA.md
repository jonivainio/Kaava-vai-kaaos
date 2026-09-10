# Kerronnan tiivistys — 10.9.2026

Käyttäjän uusi pyyntö sallii ajankulun ja tuloskerronnan tiivistämisen v5-lähteen päälle. Alkuperäiset 248 sisältö-ID:tä ja päätöstekstit pysyvät muuttumattomina. Esityskerros: `src/game/v5/narration.ts`; säännöt `v5-rules-3`.

- Enintään kolme ajankulkukorttia, enintään yksi vaiheessa, ei peräkkäisiä. Asiakirjojen tavallinen valmistuminen käsitellään saman etenemisen sisällä.
- Ongelmitta päättyvät, erikseen määritetyt tuloshaarat näkyvät lyhyinä huomioina seuraavan tilanteen yhteydessä. Muille haaroille oletus on oma kortti. Ei sentimentti-, avainsana- tai RNG-pohjaista piilottamista.
- Tuloskortin otsikko kertoo arvioinnin aiheen, joten sen geneeristä johdantoa ei toisteta ennen varsinaista tulosta. Jo kuitattua tarinaa ei toisteta seuraavan päätöksen päällä.
- Merkittävät myönteisetkin tulokset (tutkimus, palautettavat paikat), haitat, vähennykset, määräajat ja lupavaiheet säilyvät. Viimeinen lupien valmistumisen kuittaus yhdistyy voittoruutuun vasta todellisten lupaehtojen täytyttyä.
- Reaktiot on valittu yksittäin. Esimerkiksi `nature-bird-area`: ”Jaaha, mitä nyt taas?”, `road`: ”Hups!”. Tapahtuman reaktio riippuu myös todellisesta tuloshaarasta. Hyväksymiset ja loppuruudut eivät saa automaattista vitsiä.
- Vanhat sääntöversion 2 tallenteet säilyvät raakamuodossa vientiin. Uusi kierros tarvitaan; historiaa ei tulkita eri kuittausten mukaan.

## Vertailu

`tools/compare-narration.mjs 1000`: tuhat samaa siementä, vuorotellen kanoninen A, B ja vuorotteleva strategia. Vertailubundle tallennettiin julkaistusta rules-2-versiosta ennen uutta buildia (`.deploy/v5-before-narration.mjs`). Molemmat versiot ajetaan; ei uudelleen käytettyjä laskureita. Tuore checkout tarvitsee tämän lähtöbundlen rakentamisen julkaistusta lähteestä.

| Mittari | Ennen | Nyt |
|---|---:|---:|
| Näkyviä ruutuja yhteensä | 55 063 | 32 988 |
| Ruutuja / aloitettu peli | 55,06 | 32,99 |
| Ruutuja / voitollinen peli | 75,80 | 41,35 |
| Ajankulkuruutuja enintään yhdessä pelissä | 25 | 3 |
| Peräkkäiset ajankulkuruudut | 0 | 0 |
| Päätöksiä yhteensä | 16 755 | 16 755 |
| Voittoja | 327 | 327 |

Ruutumäärään kuuluvat päätökset, tarinat ja vaihesiirtymät ennen lopputulosta; vapaaehtoinen voiton jälkeinen epilogi ei kuulu siihen. Mekaaninen loppuvertailu sisältää hankkeen, kellon, työt, tulokset, tapaukset, kustannukset, luvat, päätökset ja pisteet. Vain esitystila, toiminto-/tokenhistoria ja esityksen revisiot on jätetty vertailusta pois. Ei mekaanisia eroja eikä suoritusvirheitä. Tarkat SHA:t ja yhden kokonaisen kierroksen ennen/jälkeen-kohtaukset: `comparison.json`.

## Tarkistettu

- 363/363 TypeScript-testiä (19 tiedostoa), tyypitys ja build.
- Lähteen sisältötuonti: 248 täsmällistä lähdeteksti-ID:tä, PASS.
- Chromium: 12/12 myös viimeistelyn jälkeen. Mukana kokonainen kierros, lataukset, kosketus/peruutus, 360–1163 px sekä uudet reaktiot ja yhdistetyt tulokset oikeista toistettavista pelitiloista. Uusimmat kohdekuvat `browser/narration-decision-360.png`, `narration-event-360.png`, `narration-merged-360.png`; aiemman kehitysajon kuvat samassa raporttikansiossa säilyvät historiaan.
- Ei fyysistä puhelin-, iOS- tai Safari-testiä.
- Offline/päivitys: 2/2 läpi viimeisellä buildilla. Kolme viimeisteltyä reaktio-/yhdistelmätuloskuvaa katsottu. Pitkissä päätöksissä sisältö vierittyy.

## Julkaistu

Sites-versio 6 julkaistiin public-oikeudella 10.9.2026 lähteestä `f916d82b00d7f39c6260278742c2dc9efbd176ac`. Julkinen koko pelin koe läpäisi klo 18:33 UTC: uusi evästeetön Chromium-konteksti, ei auth-/ohitustunnuksia, HTTP 200, JS:n SHA vastaa viimeistä paikallista buildia. Siemen `v5-ui-win-2`: 22 päätöstä, kolme siirtymää/latausta, 743 pisteen voitto, jokainen tila vastaa moottoria, ei selainvirheitä. Todisteet `public-check.json`, `public/` ja `release.json`.

Windows-ympäristössä virallinen `package-site.mjs` ei löytänyt tarvitsemaansa Bash-komentoa. Pakkaus käytti saman työkalun `prepare-site-build.cjs`-validointia ja natiivia tar-komentoa, kuten aiempi julkaisu. Arkisto sisältää vain valmistellun dist-puun; manifesti ja index tarkistettiin ennen tallennusta.
