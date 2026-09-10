# LP1 — toteutus ja hyväksymisnäyttö

Sääntöversio v5-lp1-1. 442/442 TS-testiä. Lähteiden tarkistus: LP1 399/399, v5 248/248 sekä Pythonin 17/17 sisältötestiä. Tyypitys ja build läpäisty.

Tallennuskoe: 3 000 kokonaista polkua, 79 oikeasti saavutettua tilafikstuuria, 111 replay-tarkistusta; 0 virhettä. Kaikki 16 uutta päätös-/vahvistus-ID:tä sekä 33 tuloshaaraa on käsitelty. Teknisten tapahtumien 27 haaraa: branch-results.json. Konversion kuusi haaraa: lp1-contract ja lp1-replay; rescued_win tarkistetaan oikean lupamaalin ja toistettavan lähdeketjun kautta, sillä se ei ole vapaasti jonotettava resolveri.

Selain: Chromium 23/23, 360/390/430/1163 px. Erillinen lopullisen korttikoon tarkistus layout-final.json. Uudet päätökset, kaikki kolme teknistä vahvistusta molempiin suuntiin, peruutettu veto, näppäimistö, kosketusemulaatio, puhtaat pelimuodot, YVA/ei-YVA ja onnistuva/epäonnistuva aurinkojatko. Tuotannon offline/päivitys/vienti 3/3. Fyysistä puhelinta, iOS/Safaria tai asennettua iPhone-PWA:ta ei ole testattu.

## 15 000 lopullista simulaatiota

Kolme aloitusmuotoa: 3 000 vertailuajoa + 1 000 varovaista + 1 000 talouspainotteista per muoto. Kaikilla sama siemenperhe lp1-final-20260911-N; politiikkakoodi ei lue piilotettuja tuloksia. 0 suoritusvirhettä ja 0 yli 200 toiminnon kierrosta. Lähdecommit ja bundlehash ovat jokaisessa raportissa. Mahdolliset myöhemmät UI-/raporttimuutokset eivät muuta tämän moottoribundlen mekaniikkaa.

| Muoto | Politiikka | Voitto / ajoa | Voitto-% (95 % väli) | Päätöksiä p50 / p90 / max |
|---|---|---:|---:|---:|
| hybrid | cautious | 599/1000 | 59.90 (56.83–62.89) | 20 / 22 / 25 |
| hybrid | economy | 598/1000 | 59.80 (56.73–62.80) | 19 / 20 / 23 |
| hybrid | reference | 1057/3000 | 35.23 (33.54–36.96) | 19 / 22 / 25 |
| solar | cautious | 615/1000 | 61.50 (58.45–64.47) | 18 / 20 / 23 |
| solar | economy | 594/1000 | 59.40 (56.33–62.40) | 17 / 19 / 23 |
| solar | reference | 1204/3000 | 40.13 (38.39–41.90) | 18 / 20 / 24 |
| wind | cautious | 480/1000 | 48.00 (44.92–51.10) | 19 / 21 / 24 |
| wind | economy | 502/1000 | 50.20 (47.11–53.29) | 18 / 20 / 24 |
| wind | reference | 722/3000 | 24.07 (22.57–25.63) | 19 / 22 / 26 |

Vertailuhybridit: alkuperäisen hybriditavoitteen voitto 1 044/3 000. Aurinkojatko pelasti lisäksi 13, yhteensä 1 057/3 000 (35,23 %). Todettuja tuuliosan loppuja 805; jatkotarjouksia 70/805. Hyväksyttyjä 32/70, kieltäytymisiä 37/70 ja yhden tarjouksen jatkokelpoisuus poistui muun samalla valmistuneen esteen vuoksi. Pelastuneita 13/32 hyväksyneestä. Näitä nimittäjiä ei yhdistetä eikä kolmasosia pakoteta politiikkoihin.

Peruskiintiö enintään 18; sen jälkeen tarvittavat jatkot lasketaan erikseen. Saman sisältö-ID:n käyttö pakollisena jatkona ei tee siitä uutta satunnaista peruskorttia. Lyhyiksi jäävät soveltuvat poolit kirjataan warnings-kenttään; väärän tekniikan täytekortteja ei lisätä. Ajankulkukortteja korkeintaan kolme, ei peräkkäisiä. Pisteet sisältävät vanhat kulut ja viiveet; aurinkojatkon laajuus käyttää alkuperäisen hybridin aurinko-osan nimittäjää.

## Kattavuus

| Tapaus | Tulos | Näyttö |
|---|---|---|
| LP1-QA-001 — Valikkovalinta toimii | PASS | e2e/lp1.spec.ts; browser-results.json; layout-final.json |
| LP1-QA-002 — Jatka ei vaihda moodia | PASS | e2e/lp1.spec.ts; browser-results.json; layout-final.json |
| LP1-QA-003 — Tuulen fyysiset invarianssit | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-004 — Auringon fyysiset invarianssit | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-005 — Jonotuksen ohitus estetään | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-006 — Shared ei ole kaikille salliva | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-007 — Maanomistajan oikea haara | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-008 — Esityskerroksen oikea tekniikka | PASS | tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu |
| LP1-QA-009 — Aurinkopeli ilman YVAa | PASS | e2e/lp1.spec.ts: kokonaiset YVA/ei-YVA- ja aurinkojatkopelit; browser-results.json |
| LP1-QA-010 — Aurinkopeli YVAlla | PASS | e2e/lp1.spec.ts: kokonaiset YVA/ei-YVA- ja aurinkojatkopelit; browser-results.json |
| LP1-QA-011 — Tuntematon menettelytarve | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-012 — BESSin pakotettu kortti puhtaassa tilassa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-013 — Poolin kattavuus | PASS | tests/lp1-run.test.ts; simulation-summary.json; fixtures/index.json |
| LP1-QA-014 — Hybridin regressio | PASS | tests/v5-content.test.ts; tests/v5-permits-battery.test.ts; tests/v5-results.test.ts; legacy/ |
| LP1-QA-015 — Puolustuksesta tarjous eikä automaatio | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-016 — VTT:n kielteinen loppukanta | PASS | tests/v5-content.test.ts; tests/v5-permits-battery.test.ts; tests/v5-results.test.ts; legacy/ |
| LP1-QA-017 — Kieltäytyminen | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-018 — Hyväksyminen atomisena | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-019 — Ei puhtaista moodeista | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-020 — Ei yhteisestä esteestä | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-021 — Ei kaikkialta vetäytyvän omistajan jatkoa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-022 — Luontohaitta koskee myös paneeleja | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-023 — Aurinkolaajuus ei riitä | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-024 — Akku ei ole erotettavissa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-025 — Ei onnistumisen jälkeen | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-026 — Yksi tarjous ja oikea token | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-027 — Tulevat wind-tulokset perutaan | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-028 — Jo valmistunut havainto säilyy | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-029 — Esityssiirtymä | PASS | e2e/lp1.spec.ts; browser-results.json; layout-final.json |
| LP1-QA-030 — Myöhempi vaihe ei aloita kaikkea alusta | PASS | e2e/lp1.spec.ts: kokonaiset YVA/ei-YVA- ja aurinkojatkopelit; browser-results.json |
| LP1-QA-031 — Tarkistus vähentää paneelialaa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-032 — Avoin itsenäisyyden kysymys jää kielteiseksi | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-033 — Jatkon onnistuminen | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-034 — Tallennus tarjouksen jokaisessa rajapisteessä | PASS | tests/lp1-replay.test.ts; fixtures/index.json; e2e/lp1.spec.ts |
| LP1-QA-035 — Teknisen vahvistuksen replay | PASS | tests/lp1-replay.test.ts; fixtures/index.json; e2e/lp1.spec.ts |
| LP1-QA-036 — Vanhan sääntöversion turvallinen avaus | PASS | e2e/offline.spec.ts; offline-results.json; tests/lp1-contract.test.ts |
| LP1-QA-037 — Keskeytetty pyyhkäisy | PASS | e2e/lp1.spec.ts; browser-results.json; layout-final.json |
| LP1-QA-038 — Aurinkojatkon alkuperäinen nimittäjä | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-039 — Koko kustannushistoria mukana | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-040 — Nollanimittäjät | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-041 — Viive ei ole työmäärien summa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-042 — Varjo ja nimellisteho | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-043 — Television lisämittaus ei toistu | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-044 — Kuljetusmallia ei vaihdeta tilattaessa | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-045 — Paneelipinta ei automaattisesti ratkaise häikäisyä | PASS | tests/lp1-branches.test.ts: surface_no / layout_ok / block_out; branch-results.json |
| LP1-QA-046 — Sulfaattiepäily ei ole näytetulos | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-047 — Matalampi kaivu vaatii soveltuvan suunnitelman | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-048 — Laidunnuksesta kieltäytyminen | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-049 — DC/AC-vaihtoehto ei lisää verkon tehoa | PASS | tests/lp1-contract.test.ts; regression.json |
| LP1-QA-050 — Kaksi kuntaa | PASS | tests/lp1-transitions.test.ts; regression.json |
| LP1-QA-051 — Rytmi ei nollaudu jatkossa | PASS | tests/lp1-run.test.ts; simulation-summary.json; fixtures/index.json |
| LP1-QA-052 — Tuntematon uusi event ei katoa | PASS | tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu |
| LP1-QA-053 — Mobiiliasettelu ja näppäimistö | PASS | e2e/lp1.spec.ts; browser-results.json; layout-final.json |
| LP1-QA-054 — Kuvitus vastaa aktiivista tekniikkaa | PASS | art/gallery-1.png; art/gallery-2.png; browser/decision-LP1-*; mode-audit.json; katsottu kuvat |
| LP1-QA-055 — Päivityskokonaisuus offline | PASS | e2e/offline.spec.ts; offline-results.json; tests/lp1-contract.test.ts |
| LP1-QA-056 — Kohtuullinen lisäpituus | PASS | simulation-summary.json; simulation/lp1-final-20260911-*.json; tools/simulate-lp1.mjs |
| LP1-QA-057 — Jatko ei vääristä tilastoa | PASS | simulation-summary.json; simulation/lp1-final-20260911-*.json; tools/simulate-lp1.mjs |
| LP1-QA-058 — Uusien sisältöjen kattavuus | PASS | tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu |
| LP1-QA-059 — Vanhat poistetut kortit eivät palaudu | PASS | tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu |
| LP1-QA-060 — Lähteet eivät muutu tositarinaksi | PASS | tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu |

## Rajat ja jäljitettävyys

Tämä on fiktiivisen pelin hyväksyntä, ei oikeiden hankkeiden oikeudellinen tai tekninen kelpoisuusarvio. Lähdepakettien raportit ovat muuttumattomia aineistoja eivätkä pelin ajotuloksia. Kehitysvaiheen epäonnistuneet kokeet eivät ole loppuhyväksyntä; niissä löydetty tuulijonon jääminen aurinkojatkoon, tutkimuksen väärä kohde sekä kapean HUD:n/rivien ylivuoto korjattiin ennen loppukokeita.

Julkaistu 10.9.2026, Sites-versio 7. Tunnisteet: `release.json`. Kirjautumaton tarkistus: `public-check.json`, HTTP 200, oikea build, 22 päätöstä, kolme siirtymän latausta, 739 pisteen lupavoitto ja nolla selainvirhettä. Jokainen tila verrattiin puhtaaseen moottoriin. Fyysinen puhelin ja iOS/Safari jäävät testaamatta.
