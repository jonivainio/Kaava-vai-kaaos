# Tilamallin ja korttiformaatin toteutussopimus

Versio 2.0. Tämä dokumentti määrittelee pilotin JSONin tulkinnan. Se ei ole valmis ohjelmisto. Tuotantomoottori toteutetaan Codexissa ja sen oikeellisuus testataan erikseen.

## 1. Perusrakenne

`content/cards.pilot.fi.json` sisältää paketin metatiedot ja `cards`-taulukon. Korteilla on pysyvät ID:t P001–P048 ja H001–H016. Tuotantokorteille voidaan käyttää uusia nimiavaruuksia; vanhoja ID:itä ei käytetä uudelleen eri tilanteisiin. `version` kasvaa, kun kortin sisältö muuttuu. Tallennus sisältää sekä sääntöpaketin että sisältöpaketin version.

`phases` ovat käyttöliittymän päävaiheet 01–08. `modes` kertoo, sopiiko kortti tuuleen, aurinkoon vai hybridiin. `tone` on toimituksellinen sävyluokka, ei hyvän tai huonon päätöksen tunniste. `weight` on vain korttiohjaajan paino kelvollisten vaihtoehtojen joukossa; sitä ei käytetä lupapäätöksen todennäköisyytenä.

`trigger`:
- `ambient`: satunnaiseen vaihesisältöön sopiva kortti, jos kaikki ehdot toteutuvat.
- `milestone`: pakolliseen tapahtumaan tai päätökseen liittyvä kortti; sitä ei nosteta vain painon vuoksi.
- `followup`: tilatun työn, aiemman päätöksen tai ajastetun maailmantapahtuman seuraus. Ehdot eivät yksin todista, että taustatapahtuma on tapahtunut.
- `epilogue`: vain erikseen käynnistetyssä muutoksenhaun jatkotilassa.

Pilotin kaikki seuraukset ja viranomaispäätökset eivät synny pakan sisällä. Osa porteista tulee tuotantomoottorin skenaariokohtaisesta menettelymallista. Korttikatselimessa ne ovat näkyvästi merkittyjä testifixtureja. Niitä ei saa asettaa todeksi automaattisesti varsinaisessa kampanjassa.

`maxPerRun: 1` estää jokaisen pilotin kortin toiston samassa pelikerrassa. Kortti merkitään käsitellyksi onnistuneen päätöstransaktion jälkeen. Esikatselu ei kuluta korttia.

## 2. Pelitila

Pelitilan vähimmäisrakenne:

```
GameState
  schemaVersion, rulesVersion, contentVersion
  runId, seed, rngState, mode, phase, elapsedMonths
  projectIdentity              # nameId, displayName, namePoolVersion; kosmeettinen RNG erikseen
  site                          # muuttumaton skenaariotieto
  assets.windSites[]            # id, paikka/ryhmä, modelId, poissulkuperusteet
  assets.solarParcels[]          # id, ha, maankäyttötila, poissulkuperusteet
  windHeightCapM, selectedModelId
  grid.segments[]               # id, km, yhteinen/tuuli/aurinko, tila
  grid.exportLimitMWac, technicalStatus
  resources                     # budget/trust/quality/patience
  economicsIndex, windYieldIndex
  flags, tracks
  jobs[], pendingEvents[]
  offeredCard, offeredOutcomeState
  seenCardIds[], decisionLog[], ending
```

Pilotin sääntörajapinta tarjoaa johdettuina kenttinä `wind.count` ja `solar.hectares`. Tuotannon oma laskenta voi olla tarkempi. `flags`-avainten sallittu joukko on manifestissa ja tuntematon avain on virhe. Puuttuvan tunnetun boolean-lipun oletusarvo on false. `site`-kentät asetetaan skenaarion alussa; kortit eivät saa muokata niitä. `site.windClass` on pilotissa `weak` tai `good`; muut nykyiset site-kentät ovat booleaneja.

Johdetut arvot lasketaan joka päätöksen jälkeen:
- windMWac = aktiivisten, yhteensopivien voimalamallien nimellistehojen summa.
- solarHa = käytettävissä olevien nettokenttälohkojen yhdisteen ala.
- solarMWp = solarHa × pelikonfiguraation oletuskerroin.
- solarMWac = solarMWp / pelikonfiguraation DC/AC-suhde.
- combinedNameplateMWac = windMWac + solarMWac.
- ulkoisen yhteyden pituudet muodostetaan segmenttitunnisteista; yhteinen kustannus lasketaan uniikkien segmenttien perusteella.

Korkeusrajan ja mallin ristiriitatilassa älä esitä vanhaa tehoa varmasti toteuttamiskelpoisena. Pidä nimellinen suunnitelmateho ja yhteensopivuustila näkyvinä, ja vaadi erillinen malliratkaisu ennen portin läpäisyä. Suunnitelman ristiriita ei oikeuta automaattiseen piilotettuun mallinvaihtoon.

## 3. Ehdot

`requiresAll` on AND-lista atomisia ehtoja. Sallitut operaattorit ovat `eq`, `neq`, `gte`, `lte`, `gt` ja `lt`. Numeeriset vertailut hyväksyvät vain numerot. Ei tyyppien hiljaista muuntamista, evalia tai merkkijonosta luettavaa koodia.

Esimerkiksi:
```
{ "field": "flags.windMeasured", "operator": "eq", "value": true }
{ "field": "site.windClass", "operator": "eq", "value": "weak" }
```

Tuulen mittaustuloskortti ei näin tule ennen mittauksen valmistumista. Alueen huono tuuli oli olemassa jo alussa, vaikka sitä ei vielä tiedetty.

Ehtojen lisäksi tarkastetaan pelimuoto, vaihe, käsittelyhistoria, laukaisutapa ja mahdollisen ajastetun tapahtuman toteutuminen. Sama kortti ei saa kilpailla itseään vastaan useana jonotettuna tapahtumana. `P025` ja `P026` ovat toisensa poissulkevia saman tuulimittauksen tulosluokkia.

## 4. Valinta ja transaktio

Valinnalla on `label`, `outcomeText`, `timeMonths`, `effects` ja `delayed`. Vaikutukset eivät seuraa tekstin sentimentistä, vaan vain tietorakenteista. Hahmon sanomisia ei tulkita erillisiksi käskyiksi.

Transaktion järjestys:
1. Lukitse tarjottu kortti ja varmistu, ettei päätöstä ole jo käsitelty.
2. Tarkista päätöksen ehdot ja lukujen domainit.
3. Laadi ensin kopiotilaan välittömät vaikutukset ja rekisteröi uudet tehtävät lähtökuukaudesta.
4. Siirrä yhteistä aikaa `timeMonths` verran. Valmistele kaikki tämän välin aikana erääntyvät tapahtumat kronologisesti.
5. Ratkaise erääntyneiden tehtävien valmistuminen ja tilanteeseen sopivat näkyvät ilmoitukset. Pitkä aikahyppy ei saa ohittaa tärkeää keskeyttävää päätöstä: tällöin aika pysähtyy kyseiseen kohtaan, loppuosa odotuksesta kirjataan jäljellä olevaksi.
6. Laske johdetut suureet, invariantit, portit ja lopetusehdot.
7. Vahvista tila, loki ja RNG-tila atomisesti tallennukseen; merkitse kortti nähdyksi.
8. Valitse seuraava tarjottava tapahtuma. UI-animaatio ei ole osa pelisääntöä.

Tunnetun kohtalokkaan vaikutuksen esikatselu käyttää samaa laskentalogiikkaa kuivaharjoittelutilassa. Se ei kuluta RNG:tä. Päätös ei vahvistu kahdesti nopealla napautuksella ja pyyhkäisyllä.

## 5. Välittömät vaikutuskäskyt

| Käsky | Tulkinta |
|---|---|
| `adjust` | Muuta vain manifestin sallimaa numeerista kenttää annetulla arvolla. Mittareiden 0–100 clamp tehdään transaktion lopuksi. `windYieldIndex` käyttää pilotissa rajaa 0–150. |
| `flag` | Aseta tunnettu boolean-lippu. Ei luo luparatkaisua tai puuttuvaa selvitystä tekstin perusteella. |
| `track` | Aseta tunnetun rinnakkaispolun sallittu enum-arvo. Esim. hakemus ei muutu myönnetyksi ilman oikeaa tulostapahtumaa. |
| `windRemove` | Sulje `count` eri aktiivista suunnittelupaikkaa annetun `reason`-rajausryhmän vuoksi. Kokonaisteho päivittyy johdettuna. |
| `solarRemove` | Sulje annetun `reason`-alueen `hectares` nettokenttää. Ei laske jo suljettua samaa aluetta uudestaan. |
| `heightCap` | Aseta raja arvoon min(nykyinen raja, metres). Kirjaa malliyhteensopivuuden uusi tarkistustarve. Ei muuta MW-lukua suhteessa metreihin. |
| `gridDistance` | Muuta nykyisen ulkoisen reittivaihtoehdon pituutta `deltaKm`. Kirjaa uusi reittiversio ja sen selvitystarve. Hybridissä muutos koskee yhteistä segmenttiä kerran. |
| `queueCard` | Jonota mainittu kortti aikaisintaan `delayMonths` jälkeen. Kortin muut ehdot eivät ohitu. Tapahtumalla on yksilöivä tunniste. |
| `pivot` | Vaihda hybridi tuuleksi tai auringoksi. Poista luovuttava komponentti, säilytä historia ja jo kulunut raha, tarkista jäljelle jäävän ratkaisun edellytykset uudestaan. |
| `finish` | Lopeta run annetulla päättymiskoodilla. `planAdopted` vaatii oikean päätöstapahtuman ja portit; `developerWithdraws` on vapaaehtoinen luopuminen. |

Pilotin `economicsIndex` päivittyy vain eksplisiittisillä korttivaikutuksilla. Älä lisää samaan aikaan automaattista tuuli-/km-vähennystä, joka laskisi saman tapahtuman kahdesti. Myöhempi tarkempi talousmalli on erillinen migraatio. Se ei saa käyttää fiktiivisiä pisteitä oikeina euroina tai IRR:nä.

`windRemove` ja `solarRemove` eivät ole lupa keksiä epäuskottavaa paikkageometriaa. Pilotin testiskenaariossa ryhmä voidaan jakaa kelvollisiin paikkoihin deterministisesti. Tuotantoskenaariossa `reason` sidotaan todelliseen skenaariolohkojen joukkoon. Muiden rajausten kanssa päällekkäiset kohteet poistuvat vain kerran. Jos vaikutus ei ole toteutettavissa ehdossa luvatuilla kohteilla, se on skenaariovirhe; älä korvaa sitä satunnaisella toisen alueen menetyksellä.

Korttikohtainen poistettava määrä on tavoitevaikutus kyseiseen rajaukseen, ei lupaus vähentää aina saman verran jo pienentyneestä hankkeesta. Dokumentoi päällekkäisyys lokiin: esimerkiksi ”12 ha rajattu tästä syystä, josta 5 ha oli jo pois; uusi menetys 7 ha”. Tällöin UI voi näyttää todellisen muutoksen ja alkuperäisen vaikutuksen erikseen.

`gridDistance` ei riitä tuotantovaiheen täydelliseksi verkkomalliksi. M2:ssa sama käsky kohdistetaan segmentin uuteen vaihtoehtoon ja kaava-/lupatarpeen tarkistukseen. Alle nollan pituus on virhe, ei sallittu säästö.

## 6. Työn tilaaminen ja valmistuminen

`delayed` sisältää tehtäviä: `jobId`, `afterMonths`, `completionText`, `effects`. Tehtävän valmistumisaika = tilaushetken hankekuukausi + afterMonths. Tehtävää ei ajeta heti.

Esimerkki: kaksi selvitystä aloitetaan kuukaudessa 4, kestot 3 ja 12. Niiden tulokset tulevat kuukausissa 7 ja 16, eivät kuukausissa 7 ja 19. Tilaukset eivät estä muiden korttien pelaamista. Alustavan selvityksen tekeminen ei itsessään käynnistä vaihtoehtoisen valinnan mittausta.

Pilotin tehtävillä ei ole automaattista epäonnistumisarvontaa. Mahdollinen lisäselvityksen tarve on erillinen alussa esiarvottu tai kausaalisesti syntyvä tapahtuma. Tuotannossa ympäristöstä riippuvat kestot ja tutkimusikkunat määritellään erikseen. Pilotin kesto ei ole tosielämän määräaika.

Samalla `jobId`:llä ei saa olla kahta päällekkäistä aktiivista tilausta samalle sisältöversiolle. Jos tuotannossa tarvitaan uusintatutkimus, lisää erillinen revisio/tutkimuskerta. Valmistumisilmoitus näyttää mitä saatiin ja mitä pitää vielä tulkita; se ei saa muuttaa lausuntoa automaattisesti myönteiseksi.

## 7. Porttiliput ja menettelymalli

Manifestin `readOnlyGateFlags` ovat korttisisällölle vain luettavia. Niitä päivittää menettely- tai maailmankellomalli, ei yksittäinen kortti:
- `leaseDeadlineNear`: maailmankello tunnistaa sopimuksen määräajan lähestymisen; jatkosopimus siirtää määräaikaa erillisen sopimusmallin kautta.
- `electionDue`: vaalitapahtuma on tullut ajankohtaiseksi skenaarion kalenterissa. Ei muuttumaton aloituspaikan ominaisuus.
- `yvaAdequacyConfirmed`: riittävyys on oikeasti ratkaistu menettelymallissa; ei sama kuin yleismittarin korkea arvo.
- `adoptionDecisionPositive`: valtuuston päätöstapahtuma on tapahtunut.
- `adoptionGatesSatisfied`: tarvittavat skenaariokohtaiset portit täyttyivät päätöksen yhteydessä.
- `epilogueEnabled`: pelaaja käynnisti erillisen jatkotilan.

Kaavan hyväksymisporttien minimiryhmät ovat menettelytarpeeseen sopiva kuntakaavaprosessi, riittävä ajantasainen vaikutusaineisto, tarvittava YVA-vaihe, ratkaistut merkitykselliset luonto- ja maankäyttöesteet, maakuntakaavan huomioon ottaminen sekä asianmukaiset kuulemiset ja päätöksentekomenettely. Älä tee yksittäisestä esimerkkilistasta kaikkiin hankkeisiin identtistä oikeudellista tarkistuslistaa.

Yhtiön kehitysvoiton omat kriteerit (budjetti, hankekoko, uskottava sähköliittymä ja jatkamishalu) erotetaan juridisista hyväksymisedellytyksistä. Kaava voi tosielämässä olla hyväksytty, vaikka talous ei johda investointiin; pelin tulosraportti saa kuvata tämän eron.

## 8. Ensimmäisen demon rajaus

`content/pilot_manifest.json` sisältää 12 kortin prologin ja siihen sopivan alkufixturen. Sen tarkoitus on testata pyyhkäisyä, päätösvaikutuksia, ajastettuja töitä ja lukujen näkyvyyttä. Se ei ohita koko hankekehitystä eikä voi tuottaa P046:n voittoa. Lopussa lukee ”Ensimmäinen selvityskierros valmis” ja näkyy myös kesken olevat tehtävät.

Kaikki 64 korttia avataan erillisessä kehittäjän sisältökatselimessa. Katselin voi luoda käsin nimettyjä testitiloja korttien ehtojen mukaisesti. Nämä eivät ole luonnollisesti pelissä saavutettavaksi todistettuja tiloja. Katsoja voi vertailla vasemman ja oikean valinnan esikatselua ja tulosta.

M2:n sisältötilaus täydentää puuttuvat tulostapahtumat, viranomais- ja kaavaportit, korkeusmallin vaihtokortit, rahoituksen onnistumiset, mahdolliset peruutukset, alkuperäisen komponenttirajanusten palautukset vain sallittuun paikkaan sekä odotuskortit. Älä yritä korvata niitä pelkästään uusilla boolean-lipuilla.

## 9. Tallennus ja tietoturva

Tallenna päätöksen koko transaktio ja RNG-tila. Kaikkien ladattavien tiedostojen ja tallennusten rakenne tarkistetaan. Tuntematon uudempi versio ei saa nollata käyttäjän tallennusta hiljaa: säilytä vientimahdollisuus ja näytä ilmoitus.

PWA:n päivitys ei vaihda kesken kierroksen korttien merkitystä. Lataa uusi versio turvallisesti valikossa tai säilytä käynnissä olevan kampanjan sisältöversio. Paikallinen tallennus ei ole tilisynkronointi. Älä lupaa säilymistä, jos selaimen tiedot poistetaan.

Staattisessa pelissä kaikki kortit ja piilevät skenaariotiedot ovat teknisesti käyttäjän tutkittavissa. Ei kannata rakentaa näennäistä salausjärjestelmää niiden piilottamiseksi. Tämä ei ole tietoturvallinen kilpailupelipalvelin. Reilun pelin oletus riittää työtovereiden yksinpelissä.

## 10. Tarkistukset

Pakettia luotaessa suoritetaan JSON Schema, ID-uniikkius, rooli-/kuvaviitteet, jonotettujen korttien kohteet, liput, polkuarvot, tekstipituudet sekä paketin lukumäärät. Tarkistukset eivät todista:
- kaikkien korttien saavutettavuutta luonnollisessa kampanjassa;
- moottorin puuttuessa vaikutusten oikeaa ajamista;
- tasapainoa, laillista lupaetenemistä tai pelin hauskuutta;
- toimivuutta oikealla puhelimella.

Codexin on toteutettava ja ajettava näitä koskevat testit erikseen. Tulokset merkitään erilleen suunnitelmista.

## 11. V2:n yhteensopiva sisältöpäivitys

Korttien `schemaVersion` pysyy 1.0:ssa; paketin `packId` on `pilot-fi-002`. P001–P048 ovat versiossa 2 ja niiden vaikutukset, ehdot sekä ajastimet on säilytetty. H001–H016 ovat uusia. `sourceIds` on v2:ssa aina tyhjä. Editoritiedosto ja nimipankki käyttävät omia skeemojaan eivätkä lisää uusia `op`-käskyjä.

`content/editorial.fi.json` avaintaa kortit cardId:llä: family, comedyLevel (1–3), fictionLevel, chainId, beat ja reviewStatus. Sisältöohjaajan pehmeä vaihtelu käyttää näitä vasta varsinaisen kelpoisuustarkistuksen jälkeen. Portteja tai erääntyneitä tapahtumia ei tukahduteta komediarytmin vuoksi. `reviewStatus: draft` kertoo kirjoitusvaiheen, ei saavutettavuutta.

H001 valitsee kaksi erillistä haaraa. Vasemmasta valinnasta jonottuu H002, oikeasta H003. Ne ovat `followup`-kortteja ja vaativat todellisen jonotapahtuman, vaikka `requiresAll` on tyhjä. Kumpikaan ei saa nousta satunnaispakasta. Molemmat haarat sulkeutuvat yhden jatkokortin jälkeen.

Prologin `demoFlow` ohjaa vaihe-fixtureja ja valitun haaran jatkumista. `demo.script` on vain yhden haaran esimerkkijono. Älä pelaa väärää haaraa, älä ohita ehtoja äläkä piilota keskeneräisiä töitä demopäätteessä. Demo ei todista varsinaista vaiheporttimallia toimivaksi.

Uuden nimipankin vaatimat tallennuskentät migroidaan vain erillisellä versiopäätöksellä. Vanhaa aktiivista kierrosta ei muuteta kesken pelin: sen sisältöversio säilytetään tai pyydetään siirtymään uuteen kierrokseen tallennus säilyttäen. Vanhasta lähdeaineistosta ei rakenneta uusia runtime-riippuvuuksia.
