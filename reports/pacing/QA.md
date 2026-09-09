# Pelikerran tiivistys ja näkyvät hankemuutokset — 9.9.2026

Lähtötilanne: puhdas `2911d12`-commit, julkaistu v5 / `v5-rules-1`. Käyttäjän uusi pyyntö ohittaa aiemman 21 peruspäätöksen rytmityksen. Muuttamaton v5-käsikirjoitus ja kaikki 248 sisältö-ID:tä säilyvät.

## Toteutus

- Peruskiintiöt 3/5/6/4 eli 18 aiemman 21:n sijaan. Akulta korkeintaan kaksi satunnaisesti valittavaa peruspäätöstä. Jo valitun ketjun pakollisia jatkoja tai tarpeellisia lupia ei jätetä käsittelemättä.
- Hybridin selostus- ja ehdotusvaiheessa varmistetaan aurinkosisältö. Muut kelpoisuudet ja siemenjärjestys säilyvät. Akku ei vie suurta osaa jäljelle jäävistä valintapaikoista.
- Yksi odotuspyyhkäisy käsittelee hiljaiset valmistumiset yksi kerrallaan, samoine kustannuksineen, havaintoineen ja kellonaikoineen. Se pysähtyy ensimmäiseen varsinaiseen tapahtumaan, päätökseen tai siirtymään. Tulos- ja vaihesiirtymäkortteja ei ohiteta.
- HUD:n voimalamäärä, korkeus/korkeusväli, nimellisteho ja aurinkoala näyttävät viimeisimmän toteutuneen muutoksensa. Kunkin mittarin muutos säilyy tarinoiden ja latauksen yli seuraavaan saman mittarin muutokseen. Nimellisteholuku ei muutu pelkästä tuotannon rajoittamisesta. Lyhyt korostus huomioi vähennetyn liikkeen asetuksen.
- Sääntöversio `v5-rules-2`; aiemman version tallennus säilyy vientiin. Vanhoja valintoja ei toisteta eri pituisen pakan sääntöjen mukaan.

## Mitattu ennen/jälkeen

`comparison.json`: 1 000 samaa siementä kummallakin versiolla, kanoninen A, mukaan lukien tarpeelliset jatkopäätökset. Voiton jälkeistä vapaaehtoista epilogia ei lasketa. Molemmat 1 000:n ajot valmistuivat ilman suoritusvirheitä.

| Mittari | Ennen | Nyt |
|---|---:|---:|
| Peräkkäiset odotusruudut koko otoksessa | 9751 | 0 |
| Odotusruudut / aloitettu peli | 23,37 | 13,26 |
| Päätökset / voitollinen peli | 24,19 | 21,10 |
| Akkupäätökset / voitollinen akun sisältävä peli | 3,29 | 2,17 |
| Tuulipäätökset / voitollinen peli | 8,64 | 7,93 |
| Aurinkopäätökset / voitollinen peli | 4,65 | 4,56 |
| Akkupäätökset / voitollinen peli | 3,32 | 2,19 |

Yhteisiä menettely-/sopimus-/verkkopäätöksiä ei väitetä tuulipäätöksiksi: ne ovat raportissa erillinen `shared`-luokka. Vertailu kertoo keskimääräisestä aihejakaumasta, ei takaa samaa kiintiötä ennenaikaisesti kaatuvalle pelille tai jokaiselle pakolliselle jatkoketjulle.

Vanha moottoribundle: `ce0f98fa4f036e36c8e2db7e2eb83b17d349fb27089d9a17cad26a1a6fe842f1`. Uusi: `98877d3f7811604e14e565c7e15ed04c30834f264eb190d8125fc689b16bfc39`.

## Varmennukset

- `pnpm test`: 359/359, 18 tiedostoa, viimeinen koko ajo klo 07:15. Neljä uutta testiä: hiljaisten töiden yhdistyminen, pysähtyminen todelliseen tulokseen, yksikkökohtaiset muutosluvut ja niiden lataus.
- `pnpm build` ja tyypitys läpi. `python tools/import_v5.py --check` vahvisti kaikki 248 lähdetekstiä muuttumattomiksi.
- `pnpm test:e2e`: 11/11 läpi. Aiemmat koko pelin/pyyhkäisyn kokeet sekä 360/430 px:n neljän muuttuneen mittarin näkymä (myös korkeusväli), uudelleenlataus ja ylivuototarkistus. Kuvakaappaukset `hud-360.png`, `hud-430.png` ja `browser/`; 360 px:n näkymä katsottu.
- `pnpm test:offline`: 2/2, offline-jatkaminen ja palvelutyöntekijän päivitys. Ei fyysisen puhelimen tai iOS/Safarin testiä.
- `node tools/compare-pacing.mjs 1000`: vanha vertailubundle otettiin talteen `.deploy/v5-before-pacing.mjs`:ksi ennen ensimmäistä buildia. `--reuse-before` käyttää jo ajettua saman siemenjoukon vertailuriviä; uudet jälkimmäiset pelit ajetaan joka kerta. Tuoreessa checkoutissa vertailubundle on rakennettava lähtöcommitista ensin.
- Lopullisen satunnaisstrategian 3 000 siementä: `reports/v5/simulation/pacing-release.json`. Aiemmat `pacing-final*` ja `comparison-draft.json` ovat viimeistelyn väliajoja, eivät lopullisen bundlen tuloksia.

Lopullinen 3000 satunnaisvalinnan ajo: 1140 voittoa, 985 ulkoista loppua, 842 valintaloppua, 33 laajuusloppua, 0 suoritusvirhettä. Kaikki otoksen siemenet ovat nimittäjässä.

Julkaisu estyi ensin automaattiseen hyväksyntätarkistukseen, joka ei pitänyt Sites-lähdevarastoa valtuutettuna. Käyttäjän nimenomaisen kohdehyväksynnän jälkeen sama lähdepush onnistui. Sites-versio 5 julkaistiin 9.9.2026 lähdecommitista `6c480fd6aa17b0afe2a683216cfc6e0343267862` nykyisellä public-oikeudella; tunnisteet `release.json`.

Julkinen kokonaisen pelin koe läpäisi klo 07:09 UTC: uusi evästeetön Chromium-konteksti, ei auth-/ohitustunnuksia, HTTP 200 ja oikea `v5-rules-2`-build (JS:n SHA vastasi paikallista buildia). Siemen `v5-ui-win-2`, 22 päätöstä, kolme vaihesiirtymää ja latausta, voitto 743 pisteellä. Jokainen tila vastasi puhdasta moottoria, ei selainvirheitä. Todisteet `public-check.json` ja `public/`. Fyysisen puhelimen testi jää käyttäjälle.
