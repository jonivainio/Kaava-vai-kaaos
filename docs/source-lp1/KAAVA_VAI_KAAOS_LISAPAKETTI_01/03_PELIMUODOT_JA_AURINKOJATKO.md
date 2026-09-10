# Pelimuodot ja hybridin aurinkojatko — tilasopimus

**Sitova toteutustavoite lisäpaketille 01. Kenttien nimet ovat ehdotuksia; niiden kuvaamat erot ja invarianssit eivät ole valinnaisia.**

## 1. Kolme aloitusmuotoa ja yksi ehdollinen jatkoreitti

| Aloitus / reitti | Aktiivinen tuotanto | BESS tässä toimituksessa | Sallittu muutos |
|---|---|---|---|
| Tuuli | Vain tuuli | Ei | Ei aurinkoon eikä hybridiin |
| Aurinko | Vain aurinko | Ei | Ei tuuleen eikä hybridiin |
| Hybridi | Tuuli ja aurinko; mahdollinen alkuperäinen BESS | Nykyinen valinnainen toteutus säilyy | Joissakin aidosti sopivissa tilanteissa pelaajan hyväksymä aurinkojatko |
| Hybridi → Aurinko | Vain olemassa oleva aurinko-osa | Pois, jos erotettavissa; muuten tämä jatko ei ole käytettävissä | Ei paluuta tuuleen tai hybridiin; enintään yksi konversio |

Käyttäjä nimenomaisesti kieltää tuulen ja auringon lisäämisen toistensa puhtaisiin pelimuotoihin. BESSin jättäminen puhtaista tiloista pois on tämän ensimmäisen toimituksen selkeyttävä laajuusratkaisu, ei väite siitä, ettei aurinkoon tai tuuleen voisi tosielämässä liittää akkua. Nykyisen hybridin akkupolkua ei poisteta.

Määritä aloituksessa muuttumaton `originMode`. `activeMode` ohjaa nykyistä valmistelua ja esitystä. `routeCategory` erottaa `wind`, `solar`, `hybrid` ja `hybrid_solar`. Sama hanke voi säilyttää `run.mode = hybrid` alkuperäistä tallennuskehystä varten, mutta silloin yksikään jatkon kelpoisuustarkistus ei saa päätellä aktiivisia hankeosia tästä vanhasta arvosta. Vaihtoehtoinen tyypitetty fyysisen tilan muutos on sallittu vain, jos alkuperäinen tila säilyy ja restore toimii.

### Koko sovelluksen komponenttisopimus

`hasComponent` ei tarkoita vain positiivista megawattilukua. Se tarkistaa pelimuodon sallimat hankeosat, nykyisen aktiivisuuden ja kohteiden tilan. Poistettu tuulipuisto voi jäädä historiassa windSite-tietueiksi, mutta se ei ole aktiivinen hankeosa.

Toteuta keskitetty kelpoisuus esimerkiksi muodossa:

```text
modeAllows(state, contentId, originatingCase)
  = contexts sallii reitin
  AND jokainen vaadittu oma hankeosa on aktiivinen
  AND kiellettyä omaa hankeosaa ei ole
  AND lähdetapaus, laji, paikka, menettely ja aineistoversio täsmäävät
  AND cardRule.eligible(state, id)
```

Käytä tätä valintapakan lisäksi pakollisiin tilanteisiin, jonotukseen, tuloksen julkaisuun, pelaajan vahvistukseen, esikatseluun ja vanhan jonon tarkistukseen. `shared` ei yksin ole hyväksyvä päätös: esimerkiksi yhteismelukortti voi olla koodissa shared, vaikka sen teksti ja vaikutus edellyttävät omia tuulivoimaloita.

Ulkoisen naapurihankkeen toinen tekniikka ei sinänsä muuta pelaajan hanketta. Sen saa mainita yhteisvaikutuksessa vain, jos kortti oikeasti arvioi sitä eikä tarjoa toisen tuotantomuodon rakentamista omaksi. Tässä ensimmäisessä laajennuksessa omia tuulivoimaloita edellyttävät yhteismelukortit eivät kuulu aurinkopakkaan; erillinen paneelihäikäisy ei käytä niiden sääntöjä.

## 2. Puhtaan pelimuodon alustus ja eteneminen

### Tuuli

Aloita vain nykyisen katalogin tuulipaikoilla ja niitä palvelevilla yhteisillä rakenteilla. Aurinkoalue, aurinko-MWp ja aurinko-MWac ovat nolla / ei sovelleta; niille ei saa syntyä varauksia, maksuja, lupia, pistepainoa tai korjaustarpeita. Akku on excluded. Käytä tuulelle nykyisiä kpl-, kokonaiskorkeus-, MW- ja vuosituottoarvoja erillisinä. Näytä liityntä samalla tavalla kuin nykyisessä pelissä; kuljetusreitin km ei ole liityntäkilometri.

Säilytä tuulen maanhallinta-, lausunto-, arviointi-, kaava- ja luvitusketjut oikeilla ehdoilla. Uudet välke- ja vastaanottoaiheet voivat esiintyä; kuljetusreittiaihe on erikoiskortti vain tähän suoraan aloitusmuotoon. Tuulihankkeen tappio päättää tämän pelikerran: aurinkojatkoa ei tarjota eikä synnytetä aurinkoaluetta tyhjästä.

### Aurinko

Aloita vain nykyisillä aurinkolohkoilla ja niiden omilla sähkö-/kulkurakenteilla. Tuulipaikkoja ei luoda, tuuliteho ja korkeus eivät näy pisteissä, eikä Puolustusvoimien tuulitutkaketjua tai tuulivoimalan lentoestelupaa tilata. Aurinkohankkeellakin voi olla tapauskohtaisia ilmailun heijastus- tai muun maankäytön vaikutuksia; se ei tee siitä tuulihanketta.

Käytä ha, MWp (DC), invertteriteho MWac ja liitynnän vientiraja erillisinä arvoina. Maanvuokrauksen puuttuva aurinkolohko vähentää todella vain siihen sidottua alaa ja tehoa, ei tuulipuolen ”sijoittelun tiivistymistä”. Säästynyt paneeliala ei yksin lisää liittymän kapasiteettia.

#### YVA ei saa olla pelimuodon vakio

Nykyinen `newProcedure(mode !== "solar")` ei riitä. Määritä skenaariolle dokumentoitu menettelyprofiili ja syy YVA-ratkaisulle. Aurinkohankkeessa on tässä toimituksessa kaksi mahdollista valmistelupolkua:

1. **YVA tarvitaan:** toteutetaan ohjelma, selostus, kuulemiset ja perusteltu päätelmä. Merkittäviä vaikutuksia edellyttävä arviointi ei riipu pelaajan halusta jättää menettely pois.
2. **Erillistä YVAa ei tarvita:** toimivaltainen ratkaisu / varmennettu menettelytarpeen selvittäminen on kirjattu; kaavoituksen ja lupien vaatimat vaikutusselvitykset tehdään. Ei fiktiivistä YVA-ohjelmaa, päätelmää tai näiden maksuja vain vaihenumeron vuoksi.

Tuntematon ei ole sama asia kuin ”ei tarvita”. Ratkaisu tehdään lähtöprofiilin hankeominaisuuksien ja arvioinnin perusteella. Sen tulosta ei arvota uudelleen ladatessa eikä valita rahalla. Vanhat aurinkoprofiilit on auditoitava, ei automaattisesti hyväksyttävä no-YVA:ksi.

Ensimmäiseen pelattavaan aurinkoversioon rajataan **kuntakaavoitusta edellyttävät fiktiiviset hankkeet**, jotta pelin nelivaiheinen kehitysrakenne säilyy. Tämä on pelin skenaarioiden rajaus, ei väite, että jokainen aurinkovoimala tarvitsee uuden yleiskaavan. Myöhemmin laajempi lupapolkumalli on erillinen työ.

Vaiheotsikot no-YVA-profiilissa:
- 1 Maanvuokraus
- 2 Kaava-aloite ja selvityssuunnitelma
- 3 Vaikutusselvitykset ja kaavaluonnos
- 4 Kaavaehdotus ja luvitus

Jos YVA tarvitaan, nykyiset YVA-vaiheotsikot säilyvät. Vaiheiden taustatunnisteet 1–4 voivat säilyä samana. `programmeReady` ja yva-milestone eivät saa teeskennellä viranomaisratkaisua no-YVA-polulla: tarvittaessa erota yleinen selvitysohjelman valmistuminen YVA-asiakirjasta.

Tarkista myös vanhojen aurinkotulosten `milestone=yva`-odotus: no-YVA-polussa tulos julkaistaan sille oikeassa kaavan arviointiaineiston käsittelyssä esimerkiksi `assessmentComplete`-välitavoitteella, ei jää odottamaan päätelmää jota ei koskaan anneta. Pelkkä `yvaConclusion=true` oikaisuksi on kielletty. Aito tuuli-YVA-tulos edellyttää edelleen oikeaa päätelmää.

Ympäristöministeriön yleiskuvaus, LVV:n nykyinen päätössivu sekä Loimaan ja Pyhtään tapaukset antavat tähän taustan (LPA06, LPA15–LPA18). Historiallisen ELY-lähteen virastonimi ei määrää vuoden 2026 pelaajatekstin toimijaa.

### Kaikille tiloille

Pysyvä pelitila ei vaihdu valikon nappia painamalla. Valikko valitsee seuraavan uuden kierroksen. Jatka palauttaa tallenteen oikean reitin. UI:n otsikko, aloitusteksti, tavoitemittarit, loppukuva ja pisteet kuvaavat valittua tai aktiivista tilaa.

Uudet peruskiintiöt eivät ole tilojen vaikeutta säätelevä piilomekanismi. Pidä ensisijaisesti 18 päätöksen tavoite / 3–5–6–4, erilliset aiheketjujen valinnat ja aidot jatkot. Ohjaaja ei odota mahdotonta wind-casea Aurinko-tilassa tai loppumatonta BESS-valintaa puhtaassa tilassa. Jos soveltuva peruspooli on tyhjä, käsittele olemassa olevat työt ja menettely, kirjaa coverage-varoitus ja etene vain oikeilla edellytyksillä; älä keksi täytekorttia.

## 3. Hybridin aurinkojatkon kelpoisuus

Aurinkojatko ei ole yleinen ”yksi lisäelämä”. Tee ensin tyypitetty epäonnistumisarvio (`FailureAssessment`), jossa on vähintään lähdetapaus, paljastettu peruste, estyneet hankeosat, tiedossa olevat muut esteet, alkuperäinen loppuluokka ja aiemmin mahdolliset korjausvaihtoehdot. **Älä päättele estynyttä hankeosaa otsikon sanasta ”tuuli”.**

Tarjous LP1-H01 on sallittu vain, kun kaikki täyttyvät:

1. originMode on hybrid, jatkoa ei ole aiemmin tarjottu eikä käytetty, ja lupavoittoa ei ole saavutettu.
2. Alkuperäinen toteuttamiskelpoinen tuulivaihtoehto todella estyy. Kyse ei ole vain yhdestä selvitystä odottavasta paikasta tai halusta vaihtaa pisteitä kesken onnistuvan hankkeen.
3. Este on rajattavissa tuuliosaan tai tuuliosan lopettaminen aidosti poistaa sen vaikutuksen. Jäljellä ei ole jo tunnettua aurinko- tai kaikkia hankeosia estävää asiaa.
4. Aurinkoalue on ollut hankkeessa ennen estettä. Aktiivinen, hallittu ja jäljellä oleva ala sekä MWac täyttävät näkyvät aurinkojatkon vähimmäisehdot. Tuulialueita ei muuteta paneelimaaksi ilman uutta erikseen hyväksyttyä hanketta; tämä paketti ei sisällä sellaista.
5. Aurinkoalueelle on alustavasti itsenäinen verkko-, maa- ja kulkuratkaisu ja tarvittavat yhteiset lievennykset säilyvät. ”Alustavasti mahdollinen” ei tarkoita jo saatua lupaa tai sopimusta.
6. Omistaja on valmis rahoittamaan tämän jatkovalmistelun. Kokonaan hankekehityksestä vetäytyvä omistaja ei samalla tarjoa aurinkojatkoa.
7. BESS voidaan erottaa ja aurinkohanke on mahdollinen ilman sitä. Ei akun automaattista säilyttämistä puhtaan jatkon sisällä tai yhteisten velvoitteiden hävittämistä.

Nykyistä `world.observations.independentSolar`-tietoa voi käyttää alkuvaiheen itsenäisen vaihtoehdon edellytyksenä; se ei yksin korvaa muita tarkistuksia. Silloin kaikilla pelikierroilla ei ole jatkomahdollisuutta luontaisesti. Halutun esiintymistiheyden säätö tehdään alkuvaiheen skenaarioprofiileissa (maa, erottelu, omistajan valmius), ei kieltämällä mielivaltaisesti jo todennettua mahdollista polkua ja väittämällä tilannetta mahdottomaksi.

### Soveltuva ja soveltumaton lähde

| Tilanne | Aurinkojatko |
|---|---|
| Puolustusvoimien tuulivoimaloita koskeva lopullinen kielteinen kanta | Mahdollinen yllä olevilla ehdoilla; korvaa nykyisen automaation |
| Tuulivoimaloiden sijainnit eivät sovi ilmailurajoitteisiin; aurinkokentälle ei samaa estettä | Mahdollinen, jos korvaavia tuulipaikkoja ei ole ja aurinko arvioitu itsenäisesti |
| Tuulen melu-/välke-/törmäysongelma tai tuuliosan laajuusraja alittuu | Tapauskohtaisesti mahdollinen; ei jos sama elinympäristö- tai johtovaikutus estää aurinkoa |
| Metsäpeuran yhteys, jota myös paneeliaita tai yhteinen tie katkaisee | Ei automaattista jatkoa. Yhteisen esteen on ensin ratkettava todellisella suunnitelmalla. |
| Kaavoitus kielletään alueelta kaikilta tuotantovaihtoehdoilta | Ei |
| Kaikki käyttökelpoiset liittymät puuttuvat tai välttämättömät maa-alueet menetetään myös aurinkoa varten | Ei |
| Omistaja/rakennerahoittaja lopettaa kaiken jatkokehityksen eikä jatkajaa ole | Ei |
| Tuuli- tai Aurinko-tilasta aloitettu peli | Ei |
| Luvitusvoitto on jo kirjattu | Ei; voittoa ei peruta tämän ominaisuuden vuoksi |

Vaihtoehto voi tulla vaiheen 2, 3 tai 4 aikana. Tarjous ei kuulu satunnaiseen peruskorttipakkaan. Pelaaja näkee ensin aidon tuuliosan estymisperusteen, sitten yhden kysymyksen. Hänen ei pidä ensin kuitata lopullista ”kaikki kehitys päättyi” -ruutua ja sen jälkeen nähdä ristiriitaista jatkomahdollisuutta.

## 4. Lopetusvaiheen uudelleenjärjestely

Nykyinen `finish()` peruu tuloksia ja poistaa päätöksiä. Lisää sitä ennen yksi yhteinen hallittu kohta, jota käyttävät puolustushaara, ulkoiset tilanteet, tunnettu valintatappio ja laajuustarkistus. Kaikki loput eivät ole jatkokelpoisia, mutta yhdenmukainen portti estää ohitusreittejä.

```text
assessFailure(state, cause)
  -> permitGoalAlreadyReached: ei uutta tappiota
  -> eligibleSolarContinuation:
       säilytä failureAssessment
       merkitse recovery.status = offered
       jonota syytulos ja LP1-H01
       ending pysyy null; älä peru kaikkia töitä
  -> otherwise:
       finalizeFailure alkuperäisellä syyllä
```

Kun offered on voimassa, ohjaaja ei työnnä uutta satunnaista peruskorttia tarjouksen ohi eikä finalizeFailurea automaattisesti myöhemmässä saman reducerin lopussa. Toinen samanaikainen todellinen este yhdistetään arvioon. Kaksi peräkkäistä kutsua samaan failure-caseen ei luo kahta tarjousta.

**B / ei jatketa:** merkitse declined ja kutsu terminal-finish alkuperäisellä syyllä. Kieltäytyminen ei ole uusi ”väärä valinta” vain siksi, että jatkaminen oli mahdollista. Alkuperäinen hybriditavoite kuitenkin jäi saavuttamatta. Älä kirjaa tai laskuta A:n tarkistustyötä.

**A / jatketaan:** tee seuraavat muutokset samassa toistettavassa reducer-toiminnossa ja tallenna sitten. Ei uutta `createGame`-kutsua.

### Konversion atominen tarkistuslista

- Säilytä runId, nimi, seed, originMode, initialRun, kustannus- ja päätöshistoria sekä koko työkalenterin kulunut aika.
- Aseta activeMode=solar ja routeCategory=hybrid_solar. Tallenna conversion/sourceCase/month/originalFailure, offered/used sekä uusi suunnitelmarevisio.
- Poista aktiivisuudesta vain nykyiset tuulipaikat omalla `windComponentAbandoned`-syyllä. Säilytä niiden aiemmat poissulut ja historia. Tuulesta ei synny aurinkohehtaareja.
- Lopeta tai peru vain tuuliosalle tarpeeton vielä tuleva työ. Maksettu kulu ja jo kulunut aika eivät palaudu. Sopimusvastuinen tekemätön työ ei ole automaattinen hyvitys.
- Sulje tuuliosan enää soveltumattomat päätös- ja tulosjonot perustellulla `cancelled`/`outdated`-syyllä. Säilytä historiassa jo julkaistut havainnot. Estä ne myös ennen julkaisua, jos vanha lataus palauttaa jonon.
- Jaa yhteiset velvoitteet vaikutuksen mukaan. Flat `component=wind` ei saa piilottaa samaan caseen liittyvää yhteistä tietä tai Natura-vesitaloushaittaa. Käytä tarvittaessa `affectedComponents`- ja planEvidence-kattavuutta. Kaikkia wind-caseja ei vain merkitä ratkaistuiksi tarkistamatta tätä.
- Poista tuuliosan tarvitsemat luvat vaadittujen joukosta; säilytä aurinko-/yhteiset luvat ja niiden oikea tila. Vanhentunut suunnitelmakattavuus ei vastaa ”lupa kumottu”: säilytä juridinen päätöshistoria ja tee tarvittavat muutos-/vastaavuustarkistukset.
- Erota akku nykyisen `excludeBattery`-polun kautta vain, jos erottelu on mahdollinen. Yhteiset lupa-, vesienhallinta-, turvallisuus- ja verkkovelvoitteet eivät katoa.
- Muodosta jäljellä olevien vaiheiden päätöspooli uudesta aktiivisesta moodista **samoilla vakailla alkuperäisillä siemenavaimilla**. Säilytä suoritetut aiheet ja niiden lähteet; älä arvo koko maailmaa tai nollaa baseCountia uuteen 18 korttiin.
- Säilytä loppuun käsiteltävät aurinko-/yhteiset tapaukset. Lisää LP1-E-H01 ja sen tarkistus LP1-E-H02. Jo tehtyä samaa työtä ei tilata uudelleen ilman muuttunutta vaikutusta.
- Puhdista aktiivisen tilanteen yhteydestä vanhentunut narratiivinen ilmoitus ”kaikki kehitys lopetetaan”. Säilytä syy historiassa ja muotoile se tuuliosan lopuksi. Max3-ajankulkuraja ei nollaudu konversiossa.
- Päivitä HUD ja tuorein todellinen muutos: näytä ”Hybridi → Aurinko” ja jäljellä oleva aurinkoala; tuuliluvut eivät jää aktiivisen hankkeen tavoitteiksi.

## 5. Mitä aurinkojatkon jälkeen arvioidaan?

Vanhan aineiston uudelleenkäyttö perustuu siihen, mitä se kattaa. Kirjaa esimerkiksi `EvidenceCoverage`: hankeosat, alueet, suunnitelmarevisio, tarkastellut vaikutukset, päätös-/lausuntotila ja mahdollinen deltaWork. Työ voi kattaa useamman revision perustellulla vastaavuusarviolla; pelkkä numeron kasvattaminen ei mitätöi kaikkea.

Vaihe 2: kesken oleva arviointi päivitetään aurinkoratkaisulle ja sen menettelytarve selvitetään. Vaihe 3: jo tehdyt luonto- ja vesityöt voivat säilyä; muuttunut johto, paneeliala tai aidat tarkistetaan. Vaihe 4: jo käsitellyn ehdotuksen muutostarve, kuulemiset ja lupa-asiakirjojen kattavuus tarkistetaan. Älä anna automaattista kaavan hyväksymistä vain siitä, että tuuli poistui. Älä myöskään aloita kaikkia jo päteviä maastotöitä automaattisesti alusta.

LP1-E-H02:n `reuse`, `supplement`, `reduced` ja `blocked` ovat keskenään eroteltuja tuloksia. `supplement` on paketin rajattu olemassa olevan johtoreitin päivitystyö. `reduced` avaa LP1-H02:n ennen hehtaarien vähennystä. `blocked` ei ole jälkikäteen arvottu jatkorangaistus: se saa tulla vain ennen tarjousta aidosti avoimen, maailmaan sidotun itsenäisen toteutusedellytyksen selvityksestä. Tiedossa ollut kaikkia vaihtoehtoja estävä asia olisi pitänyt havaita jo kelpoisuudessa.

Maakuntakaavan tuulialueriippuvuus tarkistetaan samalla: jos se koski vain poistunutta tuuliosaa, aurinkoa ei jätetä odottamaan sitä. Yhteistä aurinkoalueeseenkin vaikuttavaa kaavakysymystä ei poisteta. Samoin aurinkoaluetta koskevien vuokrasopimusten voimassaolo pysyy todellisena ehtona, vaikka vanha tuulikaavariippuvuuteen sidottu määräaikaketju poistuu.

Jatkossa ei tarjota omia tuulipaikkoja, niiden palautusta, uutta roottorimallia, tuulivoimalan melumoodia tai niiden lupavaatimuksia. Historiallista tutkimustulosta ei pakoteta uudeksi tuulipäätökseksi. Aurinko voi edelleen kohdata omia todellisia luonto-, maaperä-, häikäisy-, kaava- ja lupakysymyksiään.

## 6. Pisteet, vähimmäiskoko ja tilastointi

Suora Tuuli: laajuuden paino tuulessa 1, aurinko ja akku 0. Suora Aurinko: aurinko 1, muut 0. Säilytä ajan, laadun ja resurssien laskennan nykyinen rakenne 400/200/250/150. Nollaa jakavaa suhdetta ei lasketa pois suljetulle komponentille.

Hybridin nykyinen tavoite-/akkupisteytys säilyy tämän työn ulkopuolisilta osin. Sen muuttaminen kokonaan toisenlaiseksi ei kuulu lisäpakettiin.

**Aurinkojatko saa erillisen tulosluokan**, ei alkuperäisen hybridin täyttä voittoa. Laske sen laajuus pisteytyksessä alkuperäisen hybridihankkeen aurinko-osan tavoitteesta, ei konversiohetken jäljellä olevasta määrästä. Esimerkki: alussa 100 ha, konversion hetkellä 70 ha, lopussa 60 ha → pinta-alasuhde 60/100, ei 60/70 eikä 100 %. MWac-osuus lasketaan samalla alkuperäisellä referenssillä nykyisen laajuusmallin mukaisesti. Alkuperäinen tuulitavoite ja sen epäonnistumissyy säilyvät historiassa, eivät sekoitu uuteen aktiiviseen aurinkosuhteeseen.

Kaikki ennen ja jälkeen konversion maksetut kehityskulut, maanhankinta, todellinen välttämätön/valinnoista syntynyt aikahistoria ja todetut laatupuutteet säilyvät. Tulevaa investointiarviota ei lisätä maksettuihin konsulttikuluihin. Alkuperäistä `initial`-tietuetta ei kirjoiteta uudelleen pisteiden parantamiseksi: käytä erillistä scoreReferenceä / aktiivisen tavoitteen projektiota.

Aurinkojatkon vähimmäisala sekä -teho ja toimivuus määritetään skenaarion alussa. Nykyinen 40 ha on pelikalibrointi, ei todellinen taloudellinen/lakisääteinen yleisraja. Myös yhteisen infrastruktuurin jälkeen jäävän alan pitää täyttää ehto. Lähtöprofiileissa on oltava sekä jatkokelpoisia että kelpaamattomia aurinko-osia.

Raportoi simulaatioissa erikseen:
- alkuperäisen hybriditavoitteen onnistuminen tai epäonnistuminen ennen jatkotarjousta;
- tarjouksen saaneiden määrä suhteessa kaikkiin hybrideihin sekä jatkokelpoisiin tuuliesteisiin;
- hyväksytyt/hylätyt tarjoukset, aurinkojatkon onnistumiset ja loppusyyt;
- koko istunnon lopputulos ja reittiluokka.

Jatkomahdollisuus voi lisätä lopullisten onnistumisten määrää. Älä ”korjaa” tätä heikentämällä myöhempiä tuloksia salaa. Aiempi kolmasosajakauma on vertailutavoite, ei joka strategialle pakotettava lopputulos. Tallenna myös yhdistelmäsyyt, älä nimeä alkuperäistä ulkoista tuuliestettä vääräksi valinnaksi vain jatkon vuoksi.

## 7. Tallennus ja tekniset invarianssit

Lisää uusi sääntöversio ja tarvittaessa save-schema. Sisältöhash kattaa pohjan, lisäsisällön, moodi-overridejen ja esityskerroksen oikean version. `restoreGame` toistaa alkuperäisestä moodista kaikki uudet valinta-, vahvistus- ja jatkotoiminnot. Älä käytä pelkkää aktiivista moodia uutena initialState-syötteenä.

Tarjouksen näyttäminen, A/B-valinta, komponenttisiivous ja tarkistustyön tilaaminen kestävät latauksen jokaisessa rajapisteessä. Vanhentunut token, kaksoispyyhkäisy ja peruttu veto eivät aiheuta toista tarjousta, laskua tai lohkovähennystä. Todelliset haarat valitaan sourceId + caseId + workId + observation + revision -tiedoista, ei tekstin indeksistä.

Kolme teknistä vahvistusta voidaan esittää nykyisinä pyyhkäistävinä jatkokortteina. Dialogin nimike ei saa olla poikkeus replay-säännöistä. Menun muutosta ei kirjata keskeneräisen hankkeen konversioksi.

## 8. Numeeriset skenaarioasetukset ja kentät

Kaikki 02:n euromäärät ja kuukaudet ovat tässä toteutuksessa lähtöehdotuksia. Tallenna yhteen konfiguraatioon ja raportoi muutokset. `baselineDuration` kuvaa vertailutyötä; samaa kuukautta ei vähennetä pisteistä kahdesti. Työn tilaaminen ei tarkoita sen välitöntä valmistumista.

Uudet tekstiarvot sidotaan lähdetapaukseen: `yieldLossPct`, `solarAcMW`, `dcLowMWp`, `dcHighMWp`, `solarHa`, `lostSolarHa`, `remainingSolarHa`, `oldWindMW`, `newWindMW`, `oldHeightM`, `newHeightM`. Käytä suomalaisia numeroita ja yksiköitä. `solarAcMW` tarkoittaa tässä tekstissä vientirajaa, ei koodin invertteritehon automaattista arvoa. Muuttujien ero dokumentoidaan adapterissa.

Esimerkkifikstuuri DC/AC: vientiraja 40 MW, invertteriteho 40 MWac, vaihtoehdot 50/60 MWp, molemmat mahtuvat samaan hallittuun 100 ha:n alueeseen. Kumpikin vuosienergia on oman validoidun tuntiprofiilin summa rajoitusten jälkeen. Luvut eivät ole tuotantolupaus tai yleinen hehtaaritiheys. Pidä `solarYield` / suunnittelun energiavertailu erillään laajuuden pisteistä; korkeampi DC ei saa huijata samaa AC-nimellistehoa kahdeksi tuotannoksi.

Esimerkkifikstuuri välkkeestä: kahden paikallisen koneen ohjaus tuottaa koko hankkeelle 0,4 %:n laskennallisen vuosienergiamuutoksen. Poistamalla samat kaksi konetta myöhemmin niiden ohjauksesta ei jää muuta tuulipuistoa virheellisesti rasittavaa pysyvää kerrointa. Todellinen yhdistetty tuottovaikutus johdetaan aktiivisista lähteistä.

Kahden kunnan kortti tarvitsee kuntakohtaisen päätös-/aineistotilan tai sitä vastaavan case-rakenteen. `procedure.adopted=true` yhdestä kunnasta ei täytä toisen hyväksyntää. Poistuva toinen alue voidaan merkitä excluded vasta päätetyn erottelun ja vaaditun tarkistuksen jälkeen. Tarkista ja näytä vahvistuksessa sidottujen paikkojen kpl ja/tai ha; älä arvo menetystä vasta valinnan jälkeen.

Yhden kunnan vanhat skenaariot saavat kuntakohtaiseen päätösrakenteeseen yhden nykyistä hanketta vastaavan rivin; niiden lupamaali ei saa rikkoutua uuden LP1-Y01-rakenteen vuoksi. Kahden kunnan uusi case käyttää kahta riviä ja nimettyä aluejakoa.
