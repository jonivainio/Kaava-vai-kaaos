# KAAVA VAI KAAOS — Codexin toteutustoimeksianto

**Ohjeistus 1 · 8.9.2026 · toteutuksen sisältölähde: käsikirjoitus v5**

## 1. Toimeksianto ja tavoite

Päivitä olemassa oleva Kaava vai kaaos -peli vastaamaan tämän paketin käsikirjoitusta. Tee sisältömuutokset, niiden edellyttämä pelilogiikka, korttikuvituksen kohdennetut päivitykset ja testaus. Pelkkä tekstien vaihtaminen vanhoihin JSON-kenttiin ei täytä tehtävää. Toisaalta tehtävä ei edellytä koko sovelluksen kirjoittamista uudelleen.

Peli on lyhyt, Reigns-tyyppinen suomalaisen energiahankekehityksen päätöspeli. Pelaaja yrittää saada fiktiivisen hankkeen luvitetuksi. Päätökset koskevat muun muassa vuokrasopimuksia, selvitysten ajoitusta, kustannuksia, sijoittelua ja hankkeen pienentämistä. Osa seurauksista paljastuu vasta myöhemmin. BESS eli akkuvarasto on valinnainen hankeosa, ei jokaisen pelikerran pakollinen tehtävä.

Tavoiteltu kokemus on uskottava ja välillä surkuhupaisa: ”ei ole totta, tähänkin pitää vielä palata”. Huumori syntyy esimerkiksi puuttuvista sopimussivuista, omistajan väärinkäsityksestä, kariutuvasta yhteisliitynnästä ja vuodenaikaan sidotusta lisäselvityksestä. Älä lisää luontoa, karttaa, kalenteria tai Exceliä inhimillistäviä loppuvitsejä. Säilytä myös onnistumiset ja tavalliset työvaiheet. Tämä ei ole koulutusvisa, jossa virallinen oikea vastaus on aina ilmeinen.

**Maalitila:** tämän hankevaiheen tarvittavat kaava- ja lupapäätökset on saatu, niiden vaadittu lainvoima on varmistettu ja käsitelty ratkaisu vastaa lopullista hanketta. Voitto pisteytetään. Kaavahyväksyntä yksin ei riitä. Investointipäätös, rakennettu laitos, käyttöönotto, verkkosopimuksen kaikki toteutusvaiheet tai reservimarkkinan tulot eivät ole uusia pakollisia voittoehtoja.

## 2. Aineiston asema: mitä luet ja mitä et saa korvata

### Ensisijaiset tiedostot

| Tiedosto | Tehtävä |
|---|---|
| `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md` | Ensisijainen peliteksti ja korttikohtaiset seuraus- sekä ajoituskuvaukset. Lue koko tiedosto, tarvittaessa vaihe kerrallaan. |
| `KAAVA_VAI_KAAOS_v5_MUUTOSSELOSTE.md` | Käyttäjän 16 MUUTOS-kohdan käsittely, suorat tekstimuutokset, poistot ja tärkeimmät ketjut. |
| `KAAVA_VAI_KAAOS_v5_LAHTEET.md` | Lähdeavaimet ja tutkimuksen rajat; ei pelissä näytettäviä tositapausrepliikkejä. |
| `01_CODEX_TOTEUTUSOHJE.md` | Tämä toteutustapa ja rajaus. |
| `02_HYVAKSYNTATESTIT.md` | Tarkistettavat tilanteet ja odotetut tulokset. |
| `03_SISALTOINDEKSI.json` ja `04_SISALTOKATTAVUUS.md` | Käsikirjoituksesta johdettu kattavuusindeksi, ei suoritettava pelilogiikka. |

V5 on tämän toimeksiannon valittu lähtöaineisto. Älä palauta v2–v4-versioiden tekstejä, vanhoja `herkkä reuna` -ilmauksia tai välimuistin JSON-sisältöä sen päälle. Esimerkiksi `land`-kortin otsikko **Kovia vaatimuksia** ja valinta **Suostutaan sopimusmuutoksiin** säilytetään.

Jos käyttäjä myöhemmin liittää uuden muokatun tiedoston ja nimeää sen työn pohjaksi, käytä juuri sitä. Saman tiedostonimen tai vanhan indeksin tarkistussumman perusteella ei saa korvata uutta sisältöä vanhalla. Päivitä silloin johdetut indeksit ja dokumentoi käytetty lähdetiedosto sekä SHA-256.

Pelitekstejä ei kirjoiteta uudelleen ”parantamisen” tai merkkirajan vuoksi. Ilmeisen ristiriidan kohdalla tee tunnistekohtainen korjausehdotus; älä muuta tarinan merkitystä hiljaisesti. Tekniset nimet, tietorakenteet ja vielä määrittelemättömät tasapainoarvot ovat toteutustyötä, mutta niiden on säilytettävä kirjoitettujen valintojen lupaukset.

**Lähteistä tuleva vaatimus ja toteutusehdotus on erotettava.** Käsikirjoituksen A/B-valinnat, poistot, seurausten luonne ja maalitila tulevat aineistosta. Jäljempänä ehdotetut tietorakenteet, raporttinimet, testimenetelmät ja työjärjestys ovat tämän ohjeistuksen teknisiä ratkaisuja. Ne eivät ole väite jo olemassa olevasta toteutuksesta.

### Olemassa olevan repon ohjeet ja ristiriidat

Tarkistuksen aikana repon `main` oli commitissa `b032765605de236464042a574700b69fe49475a0`. Sen `AGENTS.md`, `NEXT_STEPS.md` ja `package.json` tarkistettiin tätä ohjeistusta varten. Paikallinen työkopiosi voi olla tätä uudempi: tunnista erot ennen muutoksia, älä palauta sitä tähän commitiin.

Säilytä paikallisten ohjeiden tietoturva-, työskentely- ja julkaisurajat. Päivitä vain tämän nimenomaisen toimeksiannon kanssa vanhentuneet sisällölliset kohdat: kiinteä 18 päätöksen rakenne, RtB-maalin vanhat lisäehdot, poistetut runkokortit sekä uusiin jatkoihin sopimaton periytyminen. Kirjaa v5-ensisijaisuus pysyviin projektiohjeisiin korvaamatta muuta `AGENTS.md`:tä.

## 3. Aloitus: suojaa nykyinen työ ja tunnista oikea toteutus

1. Lue `AGENTS.md`, `NEXT_STEPS.md`, `package.json`, lukitustiedosto sekä aktiivisen pelin tilasopimus. Tarkista `git status`, haara, viimeisin commit ja nykyiset paikalliset muutokset.
2. Erota aktiivinen peli vanhoista piloteista. Tarkistetussa repossa aktiivinen toteutus on `src/game` ja sisältö `content/deck.fi.json`, `content/encounters.fi.json` sekä `content/progress.fi.json`. `src/campaign` ja vanhat korttipaketit ovat vertailua, eivät tämän työn ensisijainen peli.
3. Tarkista aktiivinen UI, tilat, `choose`/`continueStory`, tekstien ajonaikaiset korvaukset, varianttien valinta, ajastus, tallennus, pisteet ja kuvituksen avaimet. Etsi myös koodiin kovakoodatut pelitekstit. Älä jätä vanhaa tekstiä näkymään uuden sisällön päälle.
4. Aja lähtötilan testit, tyypitys ja build. Kirjaa jo ennestään epäonnistuvat testit erikseen.
5. Tallenna tämän työn suunnitelma, lähdetiedoston tarkistussumma ja ID-kohdistus projektin dokumentaatioon. Tee muutokset nykyistä työtä säilyttäen erilliselle työhaaralle, ellei käyttäjän ajantasainen työskentelyohje määrää muuta.

Älä muuta toista peliä, taustapalvelua, tilauksia, globaaleja malliasetuksia tai käyttöoikeuksia. Tässä paketissa ei ole valtuutusta maksullisiin palveluihin. Mallin ja päättelytason valitsee käyttäjä.

## 4. Täsmällinen sisällön siirto

### Näyttöteksti ja logiikka

`PELAAJALLE`-osion kenttien **arvot** ovat pelitekstiä: kortin/tapahtuman otsikko, korttiteksti, pyyhkäisyteksti, välitön vastaus ja toteutuneen haaran teksti. Kentän nimi, `[id]`, `Valinta A`, `Haara — …`, haaran ehto tai `CODEX / PELILOGIIKKA` ei ole pelaajalle näytettävää sisältöä.

A ja B ovat vaihtoehdon pysyvät identiteetit. Fyysisen vasemman ja oikean puolen voi arpoa kuten nykyisessä pelissä, mutta sama A-toiminto säilyy samana puolen vaihtuessa. Testaa vaikutus valinnan identiteetillä, ei näytön suunnalla.

Tilauksen välitön vastaus kertoo vain tehdystä tilauksesta. Se ei paljasta ennenaikaisesti myöhemmän lausunnon tulosta. Haarautuvassa välittömässä vastauksessa näytetään yksi toteutunut haara. Yhteisellä tapahtumatekstillä varustetussa tuloksessa näytetään yhteinen teksti ja yksi siihen sopiva tuloshaara — ei kaikkia vaihtoehtoja.

Käsittele Markdown oikeina osioina. Tunniste voi sisältää hakasulkeita: `interludes[0][0]` on kokonainen ID. Älä katkaise sitä ensimmäiseen `]`-merkkiin. Kaikki neljä vaiheotsikkoa on säilytettävä.

### Poistot ja merkityksen muutokset

| Tunniste | Pakollinen muutos |
|---|---|
| `UUSI-P1-02`, `UUSI-P1-10`, `BESS-P1-04` | Poista aktiivisista pooleista, pakotetuista askelista ja vanhoista jatkokytkennöistä. Älä kierrätä ID:tä toiselle aiheelle. |
| `initiative`, `programme` | Poista nämä kaksi sisältöä, mutta **älä poista kaava-aloitetta tai YVA-ohjelmaa hankekehitysprosessista**. |
| `initiative-rumour`, `initiative-council`, `initiative-cottage` | Säilyvät. Toteuta niiden omat v5-valinnat; ne eivät saa periä poistettua runkotekstiä tai vanhaa toimintoa. |
| `programme-birds`, `programme-range`, `herding-programme`, `programme-cumulative` | Säilyvät omine aiheineen ja valintoineen. Sama koskee muita mukana olevia variantteja. |
| `P3-SOPIMUS` | On nyt A/B-päätöskortti. Älä jatka sen ohi automaattisena välitarinana. |
| `EV-YHTEISASEMA` | Nimi on historiallinen tekninen ID. V5:ssä se koskee **yhteisen johtoliitynnän kariutumista**, ei yhteisaseman odottamista. |
| `interludes[a][b]` | Säilytä kaikki 13 täydellistä tunnistetta. Älä tuo takaisin katkenneita v4-ID:itä. |

Säilytä vanhat pilotit ja varmuuskopiot arkistona; aktiivisen sisällön poistaminen ei tarkoita käyttäjän tiedostojen hävittämistä.

### Kattavuus ja versioiden vastaavuus

Tässä toimituksessa on 159 päätöstä/varianttia ja 89 tapahtuma-, tulos- tai lopputekstiä. Luo raportti, jossa **jokainen 248 lähde-ID:stä** on kohdistettu ajonaikaiseen sisältöön tai perusteltuun alias-/pelitilarajaukseen. Raportoi myös kaikki käytössä olevat runtime-sisällöt, joilla ei ole v5-vastinetta: välttämätön tekninen UI on eri asia kuin vahingossa takaisin jäänyt vanha tarina.

Älä avaa erillisiä Tuuli- ja Aurinko-valikkotiloja vain sisältömäärän vuoksi. Tarkistettu peli julkaisee Hybridi-tilan. Säilytä muiden tilojen aineisto ja osoita sen rajaus kattavuusraportissa sekä kehittäjäesikatselussa. Kaikki nykyiseen hybridiin soveltuvat v5-aiheet ja BESS-jatkot on toteutettava, ei merkitä suljetun pelitilan taakse työn välttämiseksi.

Tee toistettava Markdown → projektin sisältödata -tuonti tai yhtä tarkasti testattu siirtotyökalu. Jos lähde muuttuu, työkalu näyttää erot ID:ittäin. Tuntematon kenttä, ristiriitainen ID tai tulkitsematon haara aiheuttaa näkyvän virheen, ei hiljaista pudotusta. Älä käytä luonnollista tekstiä suoritettavana koodina: ei `eval`-käsittelyä eikä vaikutuksia pelkän ”poistetaan”-sanan perusteella.

## 5. Pelin eteneminen: sisältöpankki ei ole 248 kortin pelikerta

Säilytä neljä päävaihetta:

1. Maanvuokraus.
2. Kaava-aloite ja YVA-ohjelma.
3. YVA-selostus ja kaavaluonnos.
4. Kaavaehdotus ja kaavan hyväksyntä; lopuksi erilliset lainvoima- ja lupapäätösaskeleet.

Käsikirjoitus käyttää vaiheita 1–4. Vanha koodi käyttää myös 0–3-indeksejä; tee muunnos yhteen paikkaan ja testaa se.

Korvaa jäykkä 18 kortin cursor-lista tarvittavilta osin ehdollisella vaihe- ja tapausohjauksella. Erota **menettelyn etenemisedellytys**, **valinnainen alkutilanne**, **vaihtoehtoinen variantti**, **päätöstä vaativa jatkokortti**, **työn tulos**, **välitarina** ja **loppu**. Vaihetta ei hyväksytä vain siksi, että sen korttikiintiö loppui.

Saman ongelman varianttiryhmästä valitaan yleensä yksi alkutilanne. Esimerkiksi vuokraehtojen neljää versiota ei ajeta peräkkäin samoille omistajille. Jatkot eivät kuitenkaan ole estettyjä siksi, että alkutilanne on jo nähty. Samalla pysyvällä sisältö-ID:llä voi tarvittaessa olla uusi tapausinstanssi, kun käsikirjoitus sallii paluun aidosti muuttuneen suunnitelman arviointiin.

Säilytä lyhyen pelikerran luonne. Kirjaa peruskierroksen ja jatkokierrosten tavoitepituus toteutusasetuksiin; v5 ei määritä uutta sitovaa korttimäärää. Korttien enimmäismäärä ei saa ohittaa pakollista lupaa, ratkaisematta olevaa haittaa tai jo käynnistetyn ketjun päätöstä. Neutraaleja välitarinoita voi karsia rytmin vuoksi ennen olennaisia jatkoja.

**Kelpoisuus tarkistetaan ennen tarjoamista:** hankeosa, alueen todellinen aiheprofiili, kyseinen laji, suunnitellut rakenteet, aikaisempi päätös, tarvittavat kiinteistöt ja avoin asia. Pelkkä ”Lappi”-tunniste ei korvaa poronhoitoalueen ehtoa, eikä maakotkatulos saa tulla metsäpeuraselvityksestä. Käytä v5:n tapauskohtaisia rajauksia; älä lisää uusia maantieteellisiä yleissääntöjä.

**Paluukortti ei palauta koko hanketta aiempaan vaiheeseen.** Esimerkiksi `UUSI-P2-04` voi palata yhteisliitynnän kariutumisen jälkeen, `UUSI-P3-14` tutkimustuloksen jälkeen ja `BESS-P1-03` tulvariskin ratkaisussa. Tällöin vain kyseinen päätös tehdään oikeilla uusilla lähtötiedoilla. Saman jo tilatun työn laskua tai tulosta ei synnytetä uudelleen.

## 6. Tilamalli ja ajastus — tekninen toteutusehdotus

Hyödynnä nykyistä puhdasta TypeScript-moottoria, JSON-dataa ja erillistä UI:ta. Laajenna nykyisiä rakenteita vain tarpeen mukaan. Seuraavat käsitteet on pystyttävä esittämään, mutta täsmälliset tyyppinimet voidaan sovittaa projektiin:

| Käsite | Tarvittavat tiedot |
|---|---|
| Pelikerta | Siemen, versiot, vaihe, tilarevisio, hankeosat, alueprofiili, lähtötavoite. |
| Tapaus | Pysyvä `caseId`, sisältö-ID, lähdepäätös, valittu A/B, suunnitelmaversio, laji/vaikutusmekanismi, kiinteistö-/voimala-/lohko-ID:t. |
| Työ | Tilaus, kustannus, alku, kesto, valmistumishetki, edeltävät työt ja mahdollinen maastokauden vaatimus. |
| Tuloksen julkaisu | Valmiin työn tulos, julkaisun menettelyehto, branchId, pending/queued/revealed ja mahdollinen vanhentuminen uuden suunnitelman vuoksi. |
| Vaikutuskirjanpito | Eurokulut, sopimusvastuut, toteutunut lisäviive, paikkamuutokset, säilynyt kapasiteetti ja niiden lähde. |
| Määräajat | Sopimuskohtainen päättymisaika, ennuste, varoitus, jatkoneuvottelu, vastaus ja mahdollinen menetys. |
| Hyväksymisehdot | Kaavan tila, vaadittujen lupien tilat, ratkaisemattomat esteet, lopullisen suunnitelman vastaavuus. |

**Aikajärjestys:** tilaus → työ valmis → tarvittava kuuleminen/arvio → oikea viranomaisen tai muun toimijan vastaus → näkyvä tulos. Kaikki työt eivät tarvitse kaikkia näistä askeleista. VTT:n tekninen selvitys ei itsessään ole Puolustusvoimien kanta; YVA-päätelmä ei ole kaava- tai poikkeuslupa.

Välitarinan lukeminen, kortin esikatselu, kesken jätetty pyyhkäisy ja vaihesiirtymän näyttäminen eivät lisää kuukautta eivätkä kuluta uusia satunnaistuloksia. Aika etenee tehdystä työstä, sovitusta odotuksesta ja päätöksistä, joilla todella on kesto.

Rinnakkaisia töitä ei summata suoraan. Teknisessä yksikkötestissä samanaikaiset 4 kk:n luontotyö ja 6 kk:n verkkotyö valmistuvat molempien ollessa edellytyksenä kuudessa kuukaudessa, eivät kymmenessä. Jos verkkotyö pitenee kahdeksaan kuukauteen, tämän muutoksen lisäviive on kaksi kuukautta, ei kahdeksan. Nämä ovat testilukuja, eivät todellisten selvitysten kestoja.

Säilytä erillisinä toteutunut kokonaisaika, ennustettu valmistuminen, työkohtainen kesto sekä käyttäjän valinnoista johtuva **vältettävissä ollut kriittinen lisäviive**. Maakuntakaavan ulkoinen viive ei muutu valinnan aiheuttamaksi viiveeksi. Päällekkäiset syyt eivät saa tuplata samoja kuukausia.

Maailman tiedot määräytyvät siemenestä erillisillä vakailla avaimilla. Selvityksen tilaaminen tai tutkimusrahoitus ei luo lajia, muuta havaintoa suotuisaksi tai arvo toista maailmaa. Valinta voi silti muuttaa suunnitelmaa, ajoitusta, kerättävän aineiston kattavuutta ja siksi soveltuvaa seurausta. Preview ja uudelleenlataus eivät arvo uudestaan.

**Haaran valinta on kirjoitettu sääntö, ei otsikosta tehty arvaus.** Toteuta kullekin haaralle tyypitetyt ehdot, vaikutukset ja jatko. Kahta toisensa poissulkevaa haaraa ei näytetä. Nolla sopivaa haaraa on kehittäjätestin virhe, ellei kyseessä ole nimenomaisesti odottava työ. `Kytketyt tunnisteet` on viitelista: siinä on myös edeltäjiä ja vaihtoehtoja, joten kaikkia viitattuja tapahtumia ei saa jonottaa peräkkäin.

Suojaa päätöksen vahvistus nykyisen token/revision-periaatteen tapaisesti: kaksoisklikkaus, takaisinpaluu tai sama tallenne ei toteuta vaikutuksia kahdesti. Tallennukseen kuuluvat myös työn lähde, caseId, valittu haara, suunnitelmaversio ja jo esitetyt tapahtumat.

## 7. Keskeiset ketjut: toteuta ja testaa päästä päähän

### 7.1 Allekirjoitettu etusivu

`land-map-versions` → `EV-SOPIMUSSIVUT` → tarvittaessa `EV-MAA`.

A pyrkii vahvistamaan koko sopimuspaketin. Tulos tulee vasta yhteydenoton/selvityksen jälkeen. B jatkaa ilman kyseistä aluetta. Sopimuskysymys koskee nimettyä kiinteistöä; koko hankkeen maat eivät katoa. Älä lisää yleistä kaikkien sivujen allekirjoituspakkoa tai automaattista sopimuksen mitättömyyttä. Muu työ saa edetä rinnalla.

### 7.2 Oma voimala ja sopimusriita

`land-area-explained` → `EV-VOIMALALUPAUS` → tarvittaessa `UUSI-P1-MAARIITA` → `EV-MAARIITA`.

Erota omistajan oma oletus aidosti annetusta ristiriitaisesta lupauksesta. Päättämisvaatimus ei yksin muuta voimassa olevaa sopimusta päättyneeksi. V5:n haarat määräävät, jatketaanko sopimuksella, sovitaanko päättämisestä vai käsitelläänkö riitaa. Vain todellinen maan menetys muuttaa sijoittelua.

### 7.3 Vuokraetujen paluu

`land` / `land-signing` / `land-index` / `land-minimum`, A → `contract-callback` → `P3-SOPIMUS`.

Kirjaa ne omistajat ja edut, joita poikkeus koski. Tiedon leviäminen on callbackin ehto. Jatkossa A lisää todellista sovittua kustannusta; B ei pura aiempia vuokrasopimuksia automaattisesti. Uusien aluevarausten vaikeutuminen tarvitsee todellisen lisäalueen tarpeen ja oikeat osapuolet. Ei loputonta samaa korotuspyyntöä.

### 7.4 Yhteinen johtoliityntä

`UUSI-P1-04/A` → `EV-YHTEISASEMA` → `UUSI-P2-04` tarvittaessa → `EV-VERKKO`.

Tässä kirjoitetussa tilanteessa yhteinen ehdotus epäonnistuu myöhemmässä tarkastelussa. Älä arvo sitä onnistuvaksi hyvityksenä siitä, että A vaikutti järkevältä. Älä myöskään yleistä tätä kaikkien yhteisjohtojen kielloksi. B jatkaa omaa johtoa eikä saa A:n hukkatyötä. A maksaa vain toteutuneen selvityskulun ja kriittisen polun viiveen. Myöhemmässä paluussa käytetään jo saatua tietoa; ei koko verkkoarvion resetointia.

### 7.5 Aiempi kilpaileva vuokra

`UUSI-P1-05` → `EV-ETUSIJA` tai `EV-MAA` → tarvittaessa `LOPPU-LAAJUUS`.

Aiemman vuokran on vaikutettava juuri tarvittavaan käyttöön. Sopimus- ja etusijajärjestelyjen suostumus ei ole sama asia kuin omistajan uuden sopimuksen allekirjoitus. Korvaava sijoittelu tarkistetaan ennen laajuuteen perustuvaa loppua. Parasta etusijaa ei tehdä jokaisen hankkeen yleiseksi lakiehdoksi.

### 7.6 Viiveet ja vuokrasopimusten määräajat

`UUSI-P1-03` + aidot aiemmat viiveet + `UUSI-P2-03/A`:n maakuntakaavariippuvuus → `EV-MAAKUNTAODOTUS` → `UUSI-P4-VUOKRAJATKO` → `EV-OPTIO` → mahdollinen `LOPPU-VUOKRA-AIKA`.

Käsikirjoituksen ensimmäisessä toteutuksessa valmisteluaika on A:ssa 84 kk ja B:ssä 60 kk. 24 kk:n vältettävissä ollut lisäviive on v5:n ehdottama, kalibroitava lähtöraja. Nämä eivät ole lakisääteisiä määräaikoja. Tekstissä näkyvä viisi/seitsen vuotta ja moottorin kuukausimäärä eivät saa erota toisistaan.

Loppu vaatii **kaikki** seuraavat: merkittävä aiempi vältettävissä ollut kriittinen viive; todellinen riippuvuus viivästyneestä maakuntakaavasta; sovittujen olennaisten sopimusten todellinen päättyminen; riittämättömät jatkosuostumukset; ei toteuttamiskelpoista korvaavaa sijoittelua; luvitusvoittoa ei jo saavutettu. Ennustettu ylitys käynnistää varoituksen ja neuvottelun, ei vielä alueiden menetystä. Pidempi sopimus antaa aikaa, ei kuolemattomuutta. Pienempään korvaukseen perustuva jatko voi onnistua, eikä lisämaksu takaa kaikkien suostumusta.

### 7.7 Märän palstan myönteinen yllätys

`UUSI-P1-06/A` + samassa valuma-alueessa oleva, ostosta riippumaton paneelikuivatuksen ongelma → `UUSI-P3-KOSTEIKKO` → `EV-KOSTEIKKO`.

Osto maksaa. Se ei luo uutta pakollista ongelmaa. Ostamatta jättäminen ei muuta perussuunnitelmaa tai lajin esiintymistä. Sopivassa tilanteessa ostettu palsta mahdollistaa nykyisen viitasammakon lisääntymispaikan vedensaantia turvaavan ratkaisun ja pienemmän paneelialamenetyksen. Säilyvä ala sidotaan todelliseen lohkoon: ei ylimääräisiä hehtaareja yli alkuperäisen suunnitelman eikä samaa hyötyä kahdesta tulostapahtumasta.

Älä muuta tätä yleiseksi ”maksa kosteikko, poista Natura-ongelma” -painikkeeksi. Myönteinen tapahtuma edellyttää v5:ssä kuvattua toimivaa ratkaisua ja oikeaa lausunto-/lupakäsittelyä.

### 7.8 Ensimmäisten selvitysten järjestys

`UUSI-P1-09` → `EV-SELVITYSJARJESTYS`.

Luonto ensin voi varmistaa maastokauden, mutta verkko jää myöhemmäksi. Verkko ensin voi säästää turhaa maastotyötä, mutta myöhästyä havaintoajasta. Molemmilla on myös viiveetön onnistumishaara. Työ ei muutu heikkolaatuiseksi siksi, että tarjous on halvempi. Myöhemmät `surveys`-variantit koskevat vain vielä tilaamatonta työtä.

### 7.9 Selvitysten kielteiset ja myönteiset jatkot

`EV-LUONTO`, `EV-KOTKA`, `EV-PORO`, `EV-NATURA` ja muut tulokset käyttävät oman tapausinstanssinsa lajia, valintaa ja paikkoja. Kielteinen siirtotulos voi johtaa `UUSI-P4-01`-korjausvalintaan, jos aidosti mahdollinen pienempi vaihtoehto on olemassa. Vaihtoehdottomuus ei muutu pelaajan virheeksi vain siksi, että pelaaja tilasi selvityksen.

`EV-TUTKIMUS` voi avata metsäpeuratapauksessa `UUSI-P3-14`:n tai maakotkatapauksessa `UUSI-P4-KOTKAPAIKAT`:n. Kahden paikan palautusta tarjotaan vain, jos juuri nämä paikat on aiemmin poistettu kyseisen syyn vuoksi. Toisen lajin havainto, uusi muu este tai puuttuva maaoikeus voi estää palautuksen. Palautustutkimuksen epäonnistuminen ei itsessään mitätöi jo toimivaa pienempää vaihtoehtoa.

### 7.10 BESS ja loppuvaiheen menettely

BESS pois -valinta sulkee kyseisen akkuosan omat tulevat kortit ja avoimet tehtävät. Yhteisiin rakenteisiin tai muuhun hankkeeseen edelleen liittyvää todellista vaikutusta ei saa poistaa mukana. Selvitä, onko osan erottaminen teknisesti ja menettelyllisesti mahdollista.

`EV-BESS-VERKKO` → rajattu teho: `BESS-P4-RAJAUS`; odotus: `BESS-P4-04`. Laitetietojen puute → `EV-BESS-TURVA` → tarvittava kohdennettu kortti. Samaa puuttuvaa esitettä ei odoteta loputtomasti uudestaan.

Lupien lopussa `EV-KUNTA`, `adoption` ja `EV-HYVAKSYNTA` eivät muodosta kolmea samaa hyväksymisilmoitusta. Valitus käsitellään vain, jos se todella tehtiin. Kumoamista korjaava kortti tulee vasta kumoamisen jälkeen, ei pelkästä valituksen jättämisestä. `EV-LUVAT`, `ready` ja `LOPPU-VOITTO` eivät anna kolmea voittoa tai ohita puuttuvia lupia.

## 8. Määrät, kustannukset ja pisteet

Pidä erillään voimaloiden lukumäärä, kokonaiskorkeus, nimellisteho, energiantuotto, paneeliala ja aurinkotehot. BESSissä latausteho, purkuteho ja energiakapasiteetti ovat eri muuttujia. Akun purkutehoa ei lasketa uutena tuotettuna uusiutuvana energiana. Hiljainen käyttötila voi vähentää energiaa muuttamatta voimalan nimellistehoa.

Kaikki poistot ja palautukset tehdään samoille pysyville kohdetunnisteille. Melun ja luonnon vuoksi poistettava sama voimala vähentyy kerran. Alueelle palaaminen ei palauta muiden esteiden vuoksi poistettua paikkaa. Tiivistys kuvaa sijoittelun muutosta; se ei yksin ole automaattinen kapasiteetin menetys tai vanhan moottorin 15 pisteen sakko.

Kustannus täytyy erottaa tyypin mukaan: tämänhetkinen konsultti-/kehityskulu, maan hankintakulu ja tuleva sopimusvastuu eivät ole sama maksu samalla hetkellä. Valintojen taloudellisen eron on silti oltava pelissä todellinen ja esitettävissä. Määrittele mahdollinen resurssi-indeksi ja sen suhde euroihin ennen pisteiden laskentaa; älä esitä abstrakteja pisteitä euroina.

V5 määrää pisteluokat: **laajuus 400, aika 200, laatu 250, resurssit 150, yhteensä 1000**. Se ei määritä kaikkia osapisteiden laskentakaavoja. Toteuta puuttuvat kaavat dokumentoituina kalibrointiratkaisuina. Lukitse pelikerran lähtötavoite ja painot ennen tulosta. Hankeosien kesken vertailukelvottomia MW-/MWh-/ha-lukuja ei summata samaan laajuusmittaan sellaisinaan.

Laatupisteitä ei anneta ”oikealta kuulostavasta” valintatekstistä, vaan todellisista selvityksen, aineiston ja menettelyn tuloksista. Aikapisteet perustuvat todelliseen lisäaikaan. Resurssipisteet eivät palauta hukkaan menneen työn hintaa jälkikäteen. BESS voidaan huomioida vain suhteessa dokumentoituun tavoiteasetukseen; sen vapaaehtoinen poisjättäminen ei saa luoda keksittyä lupavirhettä.

Kaikki pisteet ovat deterministisiä, rajattuja ja perusteltavissa päätöshistoriasta. Pyöristä osat ja summa yhden määritellyn säännön mukaan. Älä vähennä samaa kapasiteettimenetystä sekä voimalamäärästä että MW:stä toistamiseen. V5-pisteytys korvaa vanhan vähennyskaavan; älä aja molempia yhtä aikaa.

## 9. Tappioluokitus ja kolmasosatavoite

Tavoite noin kolmasosa ulkoisia tappioita, kolmasosa valintaperäisiä tappioita ja kolmasosa voittoja on **testattava tasapainotavoite**, ei valmiiksi todettu jakauma tai todellisten hankkeiden tilasto.

Ulkoisessa lopussa pelaajalle tarjolla ollut realistinen vaihtoehto ei olisi estänyt loppua. Valintaperäinen tappio edellyttää todellista aiempaa vaihtoehtoa, joka olisi voinut välttää esteen. Sopimusajan loppuminen voi olla yhdistelmä: ulkoinen maakuntakaavaviive ja pelaajan aiemmat vältettävissä olleet viiveet. Päätöshistoria säilyttää molemmat syyt, vaikka aggregaattiraportti käyttäisi yhtä ensisijaista luokkaa.

Älä arvo kortin napsautuksen jälkeen irrallista pakollista häviötä saadaksesi prosentit täsmäämään. Älä muuta havaintoa tai viranomaisen johtopäätöstä siksi, että pelaaja teki mielestäsi liian hyvän valinnan. Ennalta siemenöityjen vaihtoehdottomien tilanteiden käyttö on sallittu v5:n mukaisesti, mutta niidenkin syyt ja kelpoisuus on todennettava.

**Toteutusehdotus kalibrointiin:** nimeä ennen säätöä vertailupelaaja, joka valitsee tarjolla olevista kanonisista A/B-vaihtoehdoista siemenellisellä 50/50-strategialla. Se ei saa nähdä piilotettuja tietoja. Aja lisäksi varovainen, kustannuksia säästävä ja laajuutta painottava strategia, joiden määritelmät julkaistaan raportissa. Asiantuntevan strategian pitää voida pärjätä vertailupelaajaa paremmin.

Aja ensin vähintään 3 000 siementä kehityskierroksessa; lopuksi mielellään 10 000 riippumatonta validointisiementä samalla julkaisuversiolla. Ehdotettu ensisijaisen vertailustrategian tavoiteväli on noin 30–37 % per pääluokka; tämä väli on tämän ohjeen testiehdotus, ei käyttäjän aiemmin määräämä tarkka hyväksymisraja. Näytä toteutunut tulos, älä vain ”tasapainotettu”. Epärealistista sisältöä ei muuteta tavoiteprosentin vuoksi.

Raportoi myös pelin alkuun arvotun ulkoisen riskin osuus erikseen **todellisista päättyneistä ulkoisista tappioista**. Aiempi valintatappio voi ehtiä ennen myöhempää ulkoista estettä; sitä ei saa nimetä jälkikäteen ulkoiseksi vain koska siemenessä oli sellainen.

## 10. Käyttöliittymä ja korttikuvat

Säilytä käyttäjän hyväksymä violetti/vaalea mobiili-ilme, pyyhkäisy, hiiri- ja näppäimistökäyttö sekä nykyinen tunnelma. Älä tee tämän työn sivussa kokonaan uutta käyttöliittymää.

Päivitä kuvitus **merkityksen**, ei vanhan ID:n nimen mukaan. Allekirjoitettu etusivu, sopimusriita, johtoliityntä, määräajan uhka, kosteikko ja akkuvarasto eivät saa jäädä väärän aiheen vanhaan kuvaan. Lajit erotetaan: sääksi ei ole maakotka, metsäpeura ei ole poronhoitokortin yleiskuva, eikä linnustoasia näytä viitasammakkoa.

Tarkistetun repon taidelinja on alkuperäinen SVG-kuvitus. Säilytä toimiva tyyli ja käytä ensin kuuden kuvan edustavaa koe-erää: `land-map-versions`, `land-area-explained`, `UUSI-P1-04`, `UUSI-P3-KOSTEIKKO`, `UUSI-P4-VUOKRAJATKO`, `BESS-P4-RAJAUS`. Vertaa pelin normaalissa korttikoossa nykyisiin hyviin kuviin ennen loppuerää. Jos työvälineet eivät mahdollista kuvan katsomista, merkitse visuaalinen hyväksyntä todentamattomaksi; SVG:n syntaksitesti ei todista laatua.

Kaikille 248 osiolle ei tarvitse tehdä omaa kuvaa. Jaettua kuvitusta saa käyttää, kun aihe, laji ja tapahtuma vastaavat toisiaan. Tee ID → artKey → tiedosto -kartta, joka kattaa myös ehdolliset erikoistilanteet. Älä käytä tekijänoikeudellisesti kopioituja Reigns-kuvia, oikeita hankekarttoja tai maksullista lisäpalvelua. Teksti piirretään UI:ssa, ei rasteroida kuvaan. Lähde-SVG:t ja ajonaikaiset polut säilyvät projektissa.

Pidempää v5-korttia ei katkaista `.slice()`-kutsulla tai muuteta niin pieneksi, ettei sitä voi lukea. Tarkista otsikko, kysymys, vaihtoehdot ja tulos todellisella mobiilileveydellä. Toteuta tarvittaessa hallittu vieritys tai erillinen tulosnäkymä, joka ei tee vahinkopyyhkäisyä. Näytä vain valittu vastaus ja pidä tuleva tulos piilossa.

Lisää kehittäjälle sisältöesikatselu: ID, pelitila, siemen, lähdepäätös ja jokaisen haaran pakotettu esikatselu. Tämä toimii myös suljettujen erillispelitilojen sisällön tarkistuksessa. Pakotetut haarat ovat testityökalu, eivät tuotantopelin satunnaisuus. Esikatselu ei kirjoita käyttäjän tallennusta.

## 11. Tallennukset, päivitys ja julkaisu

Kasvata sisältö- ja sääntöversiota tarvittaessa. Vanhat indeksipohjaiset kohtaamiset eivät saa tarkoittaa uusien listojen eri kortteja. Tee joko testattu migraatio tai näytä yhteensopimattomuus, säilytä alkuperäinen tallenne vientiä varten ja anna käyttäjän aloittaa uusi pelikerta. Älä hävitä tallenteita hiljaisesti.

Varmista keskeneräisen tuloksen, sopimusmääräajan, käynnissä olevan työn, palautuskortin ja loppuruudun tallennus/palautus. Uudelleenlataus ei vaihda puolia hallitsemattomasti, arvo uutta tulosta, luo lisälaskua tai palauta poistettua maata.

PWA:n ja offline-välimuistin pitää päivittää sisältö, koodi ja kuvat yhteensopivana kokonaisuutena. Vanha palvelutyöntekijä ei saa tarjota vanhaa JSON:ia uuden logiikan kanssa. Testaa sekä puhdas avaus että päivitys aiemmasta asennuksesta. Älä tyhjennä käyttäjän koko selaintallennusta päivityksen keinona.

Noudata repon ja käyttäjän ajantasaista commit-, push- ja julkaisuvaltuutusta. Älä käytä force-pushia tai luo uutta julkaisu-/Sites-projektia vanhan rinnalle. Älä julkaise tunnetusti rikkonaista välitilaa. Jos julkaisu on valtuutettu, tee se vasta hyväksymistestien jälkeen ja tarkista julkinen avaus ilman kirjautumista. Tässä paketissa ei ole tehty pushia tai julkaisua.

## 12. Työjärjestys, jatkettavuus ja valmistuminen

Toteuta vaiheittain, mutta älä pysähdy pelkkään suunnitelmaan:

**A. Inventointi ja perusta.** Lähtötestit, nykyisen repon kartoitus, kaikkien lähde-ID:iden kohdistus, uusi sisällön tuonti sekä työ-/tapaus-/haaramallin välttämättömät muutokset.

**B. Edustavat ketjut.** Tee ensin puutteellinen sopimus, kariutuva yhteisjohto, viiveisiin sidottu vuokrasopimuksen loppu ja märän palstan onnistuva jatko. Näissä on välitön vastaus, ehdollinen tulos, viive, kustannus, maankäyttö ja loppuluokitus. Ne paljastavat arkkitehtuurin puutteet ennen muun sisällön massasiirtoa.

**C. Koko sisältöpankki.** Lisää muut v5-tilanteet, lajikohtaiset tulokset, paluukortit ja BESS. Varmista poistojen sekä tyyppimuutosten toteutuminen. Tee kaikki 248 kohdistusriviä valmiiksi.

**D. Loppu, pisteet ja tallennus.** Erota hyväksyminen, valitus, lainvoima ja luvat. Testaa pisteiden komponentit ja vanhan tallenteen käsittely.

**E. Kuvitus ja käytettävyys.** Kuuden kuvan koe-erä, kohdennettu loppuerä, mobiilirivitys ja kaikki haarat näyttävä kehittäjäesikatselu.

**F. Testaus ja tasapaino.** Aja `02_HYVAKSYNTATESTIT.md`, normaali testisarja, selaintestit, offline-päivitys ja monistrategiasimulaatiot. Korjaa ongelmat syineen, älä poista niitä osoittavia testejä.

Jos työskentelyraja tulee vastaan, säilytä ajettava viimeinen välitila ja päivitä `NEXT_STEPS.md`: toteutettu, kesken, avoimet ongelmat, täsmälliset jatko-ID:t, komennot, testatut siemenet ja mahdolliset julkaisemattomat muutokset. Älä aloita seuraavalla kerralla koko sisältöä alusta tai ilmoita osasuoritusta valmiiksi.

### Valmiin työn toimitusraportti

Raportissa pitää näkyä käytetty lähdetiedosto ja SHA, repon commit/diff, 248 ID:n kohdistuskattavuus, poistot, muuttuneet tyypit, kaikki testitulokset, selainkuvat, simulaatioiden jakaumat ja siemenet, pisteytyskaava, taidepäivitykset sekä avoimet todentamattomat osat. Erota **toteutettu**, **ajettu ja läpäisty**, **epäonnistunut** ja **ei ajettu**.

Sisältötekstin, lähteiden bibliografian tai uusien SVG-tiedostojen olemassaolo ei yksin todista, että peli toimii. Hyväksytty toteutus tarvitsee toimivat seurausketjut ja todellisen pelinäytön.

## 13. Mitä tämä ohjeistus ei väitä

Paketin käsikirjoitus on kopioitu muuttamatta pelitekstejä. Indeksi ja paketin eheys on tarkistettu ohjelmallisesti. Tämän toimituksen yhteydessä ei toteutettu uutta pelilogiikkaa, korttikuvitusta, pelisimulaatiota tai julkaisua.

Lähdeaineistojen oikeudelliset ja ajantasaisuuden rajat säilyvät v5-lähdetiedostossa. Tämä toimeksianto ei tee sen kaikista lähteistä uudelleen tarkistettuja. Mahdollinen välttämätön tekninen tai oikeudellinen tarkistus tehdään asian oikeista ensisijaisista lähteistä ja kirjataan; lainsäädäntöaukkoa ei täytetä uutena mielivaltaisena pelisääntönä. Lähteiden todellisia hankkeita ei siirretä fiktiivisiksi repliikeiksi oikeilla nimillä.

### Repon rajatun tarkistuksen viitteet

Tarkistettu 8.9.2026: `jonivainio/Kaava-vai-kaaos`, `main` = `b032765605de236464042a574700b69fe49475a0`.

- `AGENTS.md`, blob `3fa57f8c5c40a1e27fd5649f3593042c1e7bdd6a`: arkkitehtuuri, violetti/vaalea ilme, SVG-taidelinja, turvallisuus ja vanhat sisältörajat.
- `NEXT_STEPS.md`, blob `6fcabaf43fad13d33157244f69ab0815847a3473`: aktiivinen `src/game`, 18 päätöstä, `swipe-fi-007`, Hybridi-valikko ja julkaisuohjeen tila.
- `package.json`, blob `a0d9479599979cb4084bb75d7efe40ec8d96b3f0`: olemassa olevat käynnistys-, testi- ja build-komennot.

Tämä rajattu tarkistus ei korvaa Codexin tekemää nykyisen työkopion ja koodin tarkastusta.
