# V5:n toimitus- ja hyväksymisraportti — 9.9.2026

## Tarkastettava lähde ja toteutus

Lähtöcommit `b032765605de236464042a574700b69fe49475a0`, työhaara `codex/v5-content-logic`. Työ aloitettiin puhtaasta hakemistosta; vanhat pelimoottorit, korttipilotit ja nimipankki säilytettiin. Lopullinen toimituscommit ja julkaisutunniste kirjataan `release.json`:iin julkaisun yhteydessä. Testattu käännös yksilöidään tiedoston SHA-256:lla, ei pelkällä version nimellä.

Ensisijainen sisältö on paketin muuttamaton `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md`, SHA-256 `03ae272389667c41412e8fef7a86f091db147aa72fbe6907a54b79661d3003f2`. Sisältöversio `v5-fi-03ae27238966`, sääntöversio `v5-rules-1`, tallennus `swipe-v5-1`.

Toteutettu: 159 kanonisen A/B-päätöksen sääntökytkentää, 89 tapahtumaa, yhteensä 248 lähde-ID:tä. Niissä on 318 valintaa ja 143 lähteen tuloshaaraa. Haara tunnistetaan tapahtuman, valinnan ja branchId:n yhdistelmällä: pelkkä branchId ei ole kaikkialla yksilöllinen. Kaikki lähteen tekstit tarkistetaan kentittäin. Korttitekstistä ei tulkita vaikutuksia.

Peli käyttää pysyviä paikkoja ja tapaustunnuksia, todellista rinnakkaisten töiden kalenteria, määräaikoja, käsittelyvaiheeseen sidottuja tuloksia, BESSin erillisiä tehoja ja lupatarpeita sekä luvituksen lopullista maalitilaa. Pisteytys on 400/200/250/150; vähennykset täsmäävät kirjanpitoon. Tarkka tilasopimus: `docs/v5/TILASOPIMUS.md`.

Käyttöliittymässä tavalliset tapahtumat ovat molempiin suuntiin pyyhkäistäviä tekstikortteja. Vaihesiirtymät ovat omia näkymiään. Loppunäkymissä on maltillista SVG/CSS-liikettä ja vähennetyn liikkeen tuki. Taidepankissa on 82 SVG:tä, joista 61 on tämän päivityksen uusia kuvia. Valikossa vain Hybridi on avoinna käyttäjän rajauksen mukaisesti; erillisiä Tuuli- ja Aurinko-pelejä ei ole julkaistu.

## Ajettu varmennus

Ympäristö: Windows, Node.js, TypeScript 5.9.3, Vite 7.3.6, Vitest 3.2.7, Playwright 1.63.0:n Chromium. Runtime-polut ovat paikallisia; globaaleja asetuksia ei muutettu.

| Komento / koe | Toteutunut tulos |
|---|---|
| `pnpm test` | Viimeinen koko sarja 355/355 läpi 02:02, 17 tiedostoa. Aiemman lisätestin virheellinen nimipankkifixture korjattiin ennen tätä ajoa. |
| `pnpm typecheck` | Läpi 01:57 viimeisten testimuutosten jälkeen. |
| `pnpm build` | Läpi 01:54; app, PWA sekä erilliset moottorikäännökset. Riippuvuuden Rollup-annotaatiovaroitus ei estänyt käännöstä. |
| `pnpm test:e2e` | 9/9 läpi 01:55. 360/390/430/1163 px, pitkät kentät, pyyhkäisyn peruutus, kosketustapahtuma, toistuva näppäin, kokonainen peli ja jokaisen kolmen vaihesiirtymän lataus. |
| `pnpm test:offline` | 2/2 läpi 01:55. Tuotantobuild repoalihakemistossa, offline-jatkaminen ja odottavan palvelutyöntekijän päivitys valikossa. |
| Pythonin sisältötestit | 17/17 läpi; vanhojen 64/76/69 kortin aineistojen tarkistimet läpi. Nämä ovat säilytetyn sisällön regressiotarkistuksia, eivät v5:n toiminnallisen kattavuuden todiste. |
| `python tools/import_v5.py --check` | 248 ID:n täsmällinen tuonti ja lähdehash läpi. |
| Paketin `tools/tarkista_toimitus.py` | Toimitusaineiston eheys ja indeksi läpi. |
| `node tools/create-v5-art.mjs --check` | Generaattorin 55 omistettua SVG:tä läpi. Kuusi aiempaa uutta pilottikuvaa säilyvät erillisinä. |
| Kehittäjäkatselmus `/?review-v5` | Kaikki 248 ID:tä ja 143 haaraa paikallisesti, tavallinen tallenne ja RNG muuttumattomia. Tuotantoon ei tule kehittäjäkatselmuksen käyttöliittymää. |

Viimeistelyn aikana selainvertailu löysi yhden eron: testi käytti vanhempaa `dist/v5`-käännöstä samalla kun Vite käytti uutta lähdettä. Käännöksen valmistuttua koko 9 testin sarja ajettiin uudelleen ja läpäisi vertailun. Tätä epäonnistunutta väliyritystä ei lasketa hyväksytyksi kokeeksi.

Haarakokeet ovat oikean `publishDue`-julkaisuputken testejä: työ ennen määräaikaa, vaadittu käsittelyvaihe, täsmällinen yksi branchId ja vaikutukset. Kontrolloiduissa testifixtureissä havainto asetetaan tarkoituksella; pelissä se tulee siemenestä työtilauksen yhteydessä. Kokeiden caseId/lähde/valinta/haara/dueAt ovat `result-branch-tests.json`:ssa. Kaikkien 143 yhdistelmän läsnäolo on testin lopussa pakollinen ehto.

## K01–K60: käyttäytyminen ja todisteet

Lyhenteet tarkoittavat tiedostoja `tests/v5-<nimi>.test.ts`. Yhdistelmäketjujen kaikki mahdolliset permutaatiot eivät ole tyhjentävästi todistettuja; taulukossa yksilöidään toteutetut positiiviset ja estävät kokeet.

| Testi | Toteutus ja ajettu todiste |
|---|---|
| K01 | `content`, `registry`, `coverage`: 159/89/248; rekisteri, lähdekentät ja kuvituspolut. |
| K02 | `content`: kaikki pelaajakentät ja valinnat verrataan muuttamattomaan source-auditiin. |
| K03 | `content`, `run`: viisi poistettua ID:tä eivät ole aktiivisia; aloite ja ohjelma säilyvät prosessitiloina. |
| K04 | `content`, `contracts`, `results`: P3-SOPIMUS on päätös, yhteinen johtoliityntä oikea ketju, 13 interludea säilyvät. |
| K05 | `content`, `e2e/v5.spec.ts`: muotoiltu pelaajanäkymä; pitkät kentät ja kehittäjäkatselmus erikseen. |
| K06 | `results`: jokaisen tuloshaaran ennen/jälkeen julkaisu, vain yksi oikea haara. |
| K07 | `content`, `regressions`: 1/2/4 nominatiivi ja genetiivi; puuttuva muuttuja virhe, kiinteä paikkamäärä ei keksi puuttuvia kohteita. |
| K08 | `run`, `regressions`, selainkokopeli: vaihesiirtymä ei ole pelkkä korttikiintiö; muutetun hankkeen esittely edellyttää pienennystä ja luonnospalautetta. |
| K09 | `run`, `contracts`: vain yksi neljästä alkuvuokraehdosta, sen oma callback on silti päätös. |
| K10 | `run`, simulaatiot: rajatut vaihepakat; jatkot erillisistä lähdetapauksista, lupamaali ei korttirajasta. |
| K11 | `nature`, `permits-battery`, `run`: poronhoitoalue, laji/mekanismi, BESSin poisto ja aurinkosisältö läpimenevissä hybrideissä. |
| K12 | `run`, `results`, selain: kanoninen A/B, vasen/oikea esitysjärjestys; hiiri, CDP-kosketus ja näppäin käyttävät samaa reduceria. |
| K13 | `run`, selain: preview ja keskelle palautettu ele eivät muuta tilaa. |
| K14 | `run`, selain, `calendar`: sama token kerran, sama työ ja lasku kerran. |
| K15 | `storage`, `run`, `calendar`, selain: keskeneräinen työ ja nimi; epilogi ja siirtymien lataus; koko tila toistetaan historiasta. |
| K16 | `regressions`, `contracts`: sotilasjohtorajoitteen todellinen verkkopaluu, eri versio, keskeneräisen yhteisjohdon estoehto, uusi naapuri todellisesta siirrosta. |
| K17 | `permits-battery`, `results`, simulaatiot: melutakuun ja BESS-esitteen odotus kerran, uusi jatkoratkaisu; suorituskatot virheitä. |
| K18 | `contracts`, `results`: B:n hyväksyntä/tuulitiivistys/aurinkomenetys, ei ristikkäistä MW- ja hehtaaripoistoa. |
| K19 | `contracts`, `results`: etusivun vahvistus tai tavoittamattomuus; B:n eri jatko. |
| K20 | `contracts`, `results`: neljä omistajatulosta, päättämispyyntö ei yksin päätä sopimusta, riidan oma jatko. |
| K21 | `contracts`: poikkeusehto ja tiedon leviäminen tarvitaan; voimassa oleva sopimus säilyy eikä sama korotus laskutu uudelleen. |
| K22 | `contracts`, `results`, `regressions`: yhteisjohtoehdotuksen kariutuminen ja oma verkko, ei A-ketjua B:lle. |
| K23 | `contracts`, `results`: etusija koskee samaa palstaa, korvaava alue arvioidaan ennen laajuusloppua. |
| K24 | `contracts`: tekstin 60/84 kk, kolme sopimusta ja todelliset paikkatunnukset. |
| K25 | `score-leases`: viiveketjun puuttuvat ehdot yksitellen, myös jatko/korvaava maa/jo saavutettu voitto. |
| K26 | `score-leases`, `results`: ennakkovaroitus, neuvottelu, vastaus ja todellinen päättyminen erillisiä. |
| K27 | `score-leases`, `results`: kaikki kolme jatkovastausta; osittaisen kieltäytymisen paikat kuuluvat juuri kieltäytyneille. |
| K28 | `nature`: ostamatta jättäminen ei luo lajia tai muuta perussuunnitelmaa. |
| K29 | `nature`, `results`: ostettu oikean valuma-alueen kosteikko palauttaa vain kyseisen poistetun alan, kerran. |
| K30 | `nature`: väärä valuma-alue, puuttuva osto tai väärä tapaus eivät avaa palautusta. |
| K31 | `contracts`, `results`, `regressions`: kaikki neljä selvitysjärjestystä/tulosta, kausi, valmis verkko ja estetty tuplatilaus. |
| K32 | `calendar`: 4+6=6, pidennys 8:aan lisää kaksi; tarinakortin pyyhkäisy 0 kk. |
| K33 | `calendar`, `score-leases`: rinnakkainen ulkoinen työ voi imeä vältettävän viiveen; ei moninkertaista odotusvähennystä. |
| K34 | `nature`, `regressions`, perustan `engine`: sama ID poistetaan kerran, toinen este estää palautuksen. |
| K35 | `contracts`, `run`, `results`: rahoitus ei muuta maailmaa/julkaisua; nimipankki ei muuta skenaariota, ladattu tila jatkuu identtisesti. |
| K36 | `nature`, `results`: saman lajin kielteinen tulos, tutkittu pienempi vaihtoehto ja sen korjausvalinta. |
| K37 | `nature`, `regressions`, `results`: kaksi oikeasta syystä poistettua paikkaa; myöhempi muu este estää palautuksen, pienempi vaihtoehto säilyy. |
| K38 | `permits-battery`, `results`: suorat PV-kannat, VTT:n kolme tulosta, vanhan mallin säilyminen korkeusmuutoksen hylkäyksessä. |
| K39 | `results`, `permits-battery`, selain: työ, YVA:n kuuleminen/päätelmä, Natura, kaava, lainvoima ja lupa erillisiä portteja. |
| K40 | `nature`, `results`: hiljainen käyttö laskee tuottoa, ei suoraan MW:tä; dokumenttipuutteen oma jatko. |
| K41 | `calendar`, `permits-battery`: BESS pois säilyttää tuulen, auringon, maksetut kulut ja tarpeellisen yhteisen työn. |
| K42 | `permits-battery`, `results`: lataus/purku erikseen, MWh ja aurinkoala säilyvät. |
| K43 | `permits-battery`, `results`: laitetiedot, tulva ja häiriövedet omissa haaroissa, rajattu paluu. |
| K44 | `permits-battery`, `results`, `storage`: verkkotila ei ole lupa; oikea määräaika vasta liittymismenettelystä; epilogi ei pura voittoa. |
| K45 | `permits-battery`, `results`: kuusi oikeusprosessin haaraa ja estot ennen valitusta/oikeaa ratkaisua. |
| K46 | `run`, `storage`, selain: hyväksynnän alias ei toistu; lopullinen valmis tila ja pisteet kerran. |
| K47 | `permits-battery`: jokaisen luvan puuttuva nykyversio ja lainvoima estävät voiton; pois jätetty akku ei estä ydinhanketta. |
| K48 | `storage`, `permits-battery`: voitto ja sinetöity pistetulos säilyvät jatkotöistä sekä epilogista huolimatta. |
| K49 | `endings.ts`, `score-leases`, simulaatiot: valintaloppu tarvitsee historiallisen B:n ja tunnetun A-väistön; laajuus ja ulkoinen syy raportoidaan erikseen. |
| K50 | `score-leases`: enimmäispisteet, kirjanpidon pyöristys, lasku kerran, syyt summautuvat täsmälleen. |
| K51 | `score-leases`, `nature`, `permits-battery`: MW/MWp/MWac/MWh/ha/korkeus/tuotto erillään, lähtöpainot eivät vaihdu. |
| K52 | `simulation/v5-validation-03*.json`: sama 10 000 siemenen joukko, satunnainen vertailu sekä varovainen ja talouspainotteinen politiikka. |
| K53 | Samat raportit: `plannedExternal` ja `actualExternal`, aiempi muu tappio ei vaihdu jälkikäteen. |
| K54 | Samat raportit: kaikki siemenet nimittäjässä, 600 askeleen raja ja muuttumaton tila ovat virheitä. |
| K55 | `e2e/v5.spec.ts`, `browser/`: 360/390/430/1163, pisimmät aidot kentät; pystyselaus sallitaan, tekstiä ei katkaista. |
| K56 | `art/`, kuuden kuvan pilotti, kuusi galleriasivua ja selainkuvat katsottu. `coverage` tarkistaa jokaisen päätöksen todelliset kuvituspolut eri siemenillä. |
| K57 | `e2e/v5.spec.ts`: katselmus sisältää 248 ID:tä ja kaikki haarat; ei muutosta tavalliseen tallennukseen. |
| K58 | `storage`: vanha/rikkinäinen sisältö säilyy täsmälleen vientiin uuden pelin rinnalla; ei encounter-indeksin uudelleentulkintaa. |
| K59 | `e2e/offline.spec.ts`: erillinen tuotanto-PWA:n offline- ja päivityskoe, nykyinen tallenne säilyy. |
| K60 | `content-coverage.json`, `result-branch-tests.json`, tämä raportti ja simulaatiot: kaikki ID:t, sääntöryhmä, haarat, esitystapa ja kuvat. |

## Kattavuuden rajat

`content-coverage.json` ei yksin todista sääntöjä: siksi se linkittää yllä oleviin käyttäytymistesteihin. Jokainen 143 lähdehaara on käyty kontrolloidussa testissä. Satunnaissimulaation puuttuva käynti ei tarkoita, että harvinainen määräaika-, epilogi- tai palautusketju puuttuu; näiden todisteet ovat nimetyissä fixturetesteissä.

`::solar-base` on lähteen aliasnimi. Osa näistä on tarkoituksella myös hybridin aurinkokomponentin kelvollista sisältöä. Erilliset tuuli-/aurinkovalikot ovat käyttäjän päätöksellä suljettuja. Graafinen katselmus tukee niiden sisältöjen tarkistusta, mutta erillisten pelimuotojen täyttä läpipeluu-/tasapainohyväksyntää ei väitetä.

Fyysistä puhelinta, iOS/Safaria, Firefoxia, ruudunlukijaa tai aloitusnäyttöön oikealla puhelimella asennettua PWA:ta ei testattu. Näistä tarvitaan käyttäjän laitepalaute. Selaimen pakottamat koko näytön ja asennuksen käyttöoikeusrajat säilyvät.

## Simulaatiot ja julkaisu

Lopullinen `dist/v5/index.js` SHA-256: `ce0f98fa4f036e36c8e2db7e2eb83b17d349fb27089d9a17cad26a1a6fe842f1`. Se on sama kaikissa kolmessa alla olevassa raportissa. Komennot: `node tools/simulate-v5.mjs 10000 v5-validation-03 random`, vastaavasti `cautious` ja `economy`. Jokainen käyttää samoja siemeniä `v5-validation-03-0`–`v5-validation-03-9999`.

| Politiikka | Voitto | Ulkoinen loppu | Valintaloppu | Laajuusloppu | Virhe |
|---|---:|---:|---:|---:|---:|
| Satunnainen kanoninen A/B, 50/50 (vertailu) | 3647 (36,47 %) | 3312 (33,12 %) | 2871 (28,71 %) | 170 (1,70 %) | 0 |
| Varovainen, julkaistu ID-kohtainen politiikka | 6524 | 3353 | 0 | 123 | 0 |
| Talouspainotteinen, julkaistu ID-kohtainen politiikka | 6183 | 3335 | 0 | 482 | 0 |

Alussa arvottu ulkoinen este: kaikissa 3390/10000 (33,90 %). Toteutunut ulkoinen loppu eroaa tästä, koska todellinen aiempi loppu säilyy syynä ja joissakin ketjuissa itsenäinen aurinko-osa voi säilyä. Laajuusloppuja ei siirretä valintatap­pioiksi kolmijaon kaunistamiseksi. Vertailustrategian noin kolmasosajakauma on arvioitu näistä todellisista lopuista; sitä ei pakoteta varovaiselle pelaajalle. Politiikat eivät lue piilotettuja tuloksia. Tarkat säännöt ovat raporttien `policy`-kentässä.

Aiemmat `development-*` ja `validation-01/02` ovat säilytettyä kalibrointihistoriaa, eivät lopullisen käännöksen hyväksyntäraportteja. Kehitysajojen virheellisiä siemeniä ei poistettu otoksesta; korjaukset ja palautukset on tehty regressiotesteiksi. Viimeinen kehitysajo oli 3000/3000 ilman virheitä. Lopulliset kolme 10 000:n ajoa ovat erillinen siemenjoukko.

Julkisen osoitteen kirjautumaton koe tallennetaan julkaisun jälkeen tiedostoon `public-check.json` ja kuvat hakemistoon `public/`. Tarkistin `tools/check-public-v5.mjs` aloittaa uudesta selaimesta ilman evästeitä, tunnuksia tai ohitustokenia, vertaa ladatun JavaScriptin hashia testattuun buildiin ja pelaa koko voitollisen kierroksen sekä lataa vaihesiirtymät uudelleen. Julkaisun onnistumista ei päätellä pelkästä `access_mode: public` -asetuksesta.
