# Kaava vai kaaos — lisäpaketti 01: uudet kortit ja tapahtumat

10.9.2026 · Toimitettava lisäsisältö, ei peliin jo integroitu päivitys.

## Lukeminen ja tulkinta

Tässä on **13 päätöskorttia**, **11 tulos-/siirtymä-/lopputapahtumaa** sekä **kolme lyhyttä teknisen vaihtoehdon vahvistusta**. Uusia itsenäisiä aiheita on kahdeksan; muu sisältö on niiden tai aurinkojatkon sidottuja jatkoja. Vahvistukset ovat pelaajan oikeita päätöksiä, eivät automaattisia taustamuutoksia tai satunnaisia peruskortteja.

Pelaajalle näytetään vain otsikon, korttitekstin, pyyhkäisytekstin ja toteutuneen vastauksen sisältö. Kenttien nimet, haarojen nimet ja ehdot eivät näy. A/B ovat pysyvät valintatunnukset; fyysinen puoli saa vaihtua siemenellisesti. Myöhemmän työn tulos ei näy heti tilattaessa.

Kaikki tämän lisäpaketin eurot, kestot, riskit ja teknisten vaihtoehtojen luvut ovat **kalibroitavia fiktiivisiä peliasetuksia**, eivät todellisia hintoja, lupamääräaikoja tai onnistumistilastoja. Toteuttaja lisää ennen valinnan vahvistusta nykyisen UI:n ennakkotietoon tämän valinnan tunnetun kustannuksen, tilauksen keston ja mahdollisen laajuusmenetyksen. Kokonaisviive lasketaan työjonosta, ei kaikkien kuukausien summasta.

Välttämätön epäselvyyden korjaus ei saa jäädä tulosfraasiksi: tilaa työ, tallenna valmistuminen ja avaa nimetty jatkopäätös. Haarat ovat toisensa poissulkevia samalle tuloskerralle. Käytä nimeä, älä haaran indeksiä, uusien tulosten valintaan.

Lähdeavaimet LPAxx avautuvat tiedostossa `05_LAHTEET.md`. Tosihankkeet eivät ole pelin nimet tai kuvitus.

---

## 1. Uudet itsenäiset päätöskortit

### [LP1-T01]

#### PELAAJALLE

**Kortin otsikko:** Melu alittuu, välke ei

**Korttiteksti:** Yhteismelu on kunnossa. Välkemallinnus osoittaa kuitenkin kahden voimalan lapavarjojen osuvan saman talon ikkunoihin kevätiltaisin. Näihin hetkiin voidaan suunnitella pysäytysohjaus tai voimalapaikat jättää pois.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan kohdennettu pysäytysohjaus

**Valinnan jälkeen näytetään:** Välkeajat ja ohjaus suunnitellaan näille kahdelle voimalalle. Samalla lasketaan, kuinka paljon sähköntuotantoa rajoitus vähentäisi.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään nämä kaksi voimalapaikkaa pois

**Valinnan jälkeen näytetään:** Kaksi välkettä aiheuttavaa voimalapaikkaa poistetaan suunnitelmasta. Jäljelle jäävä sijoittelu mallinnetaan uudelleen.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-T01`

**Päävaihe:** 3 · **Kontekstit:** Tuuli, Hybridi

**Aiheketju / rooli:** `lp1_shadow` / `base`

**Ehdot:** Aktiivinen tuuliosa; vähintään kaksi tähän tapaukseen sidottavaa aktiivista voimalaa; nimetty asuinrakennus; yhteismelu tämän sijoittelun osalta ratkaistu. Skenaarion välkehaitan aiheuttavat juuri nämä paikat, ja ohjaus sekä niiden poisto ovat kumpikin tutkittavissa olevia ratkaisuja.

**Valinta A — toteutettava vaikutus:** Tilaa shadowDesign: 2 kk / 8 000 €, baseline 2 kk, normaali selvitystyö. Ei paikkapoistoa. Kohdekohtainen ohjaus on tässä skenaariossa teknisesti toteuttamiskelpoinen; tuotantovaikutus ei vielä ole tiedossa.

**Valinta B — toteutettava vaikutus:** Poista vain sidotut kaksi aktiivista windSite-ID:tä, niiden tarpeettomat tiehaarat ja teho. Tilaa verification: 1 kk / 5 000 €, baseline 1 kk. Ei samalla muuta solar- tai BESS-arvoja.

**Kytketyt tunnisteet:** `LP1-E-T01`

**Kuvitus:** Kaksi voimalan varjoa osuu talon ikkunoihin; pieni aurinko matalalla. Ei heijastavaa paneelikenttää.

**Tausta:** LPA01 LPA02

**Rajaus:** Erota välke, valon heijastus ja melu. Ei Suomen yleistä 8 h / 30 h -lakirajaa. Ohjauksen tuotantorajoitus koskee vuosienergiaa, ei koneen nimellistehoa. Rajoitus kirjataan omana syykohtaisena vaikutuksena, ei tuplasti muun rajoituksen päälle.

---

### [LP1-T02]

#### PELAAJALLE

**Kortin otsikko:** Televisiokuva pätkii jo nyt

**Korttiteksti:** Asukas kertoo television pätkivän ja vastustaa hanketta. Yhtään voimalaa ei ole rakennettu. Verkkoasiantuntijan mukaan tuulipuiston mahdollinen lisävaikutus pitää silti erottaa nykyisestä vastaanotto-ongelmasta.

##### Valinta A

**Pyyhkäisyteksti:** Mitataan vastaanoton nykytila

**Valinnan jälkeen näytetään:** Lähialueen antennivastaanoton lähtötilanne mitataan. Mittaustiedot liitetään suunnitellun tuulipuiston häiriöarvioon.

##### Valinta B

**Pyyhkäisyteksti:** Aloitetaan laskennallisesta häiriöarviosta

**Valinnan jälkeen näytetään:** Asiantuntija arvioi suunniteltujen voimaloiden vaikutusta lähetysreittiin. Paikan päällä tehtäviä mittauksia ei vielä tilata.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-T02`

**Päävaihe:** 2 · **Kontekstit:** Tuuli, Hybridi

**Aiheketju / rooli:** `lp1_tv` / `base`

**Ehdot:** Aktiivinen tuuliosa ja skenaarion alueella antenni-tv:n vastaanottoa. Olemassa oleva huono vastaanotto sidottu maailmaan ennen pelaajan valintaa. Ei väitetä rakentamattomien voimaloiden jo aiheuttavan häiriötä.

**Valinta A — toteutettava vaikutus:** Tilaa baselineAndModel: 2 kk / 6 000 €, baseline 2 kk. Tallennetaan nykyinen vastaanottotilanne ja vaikutusmalli. Ei rakenneta antennia eikä taajuuslupaa myönnetä.

**Valinta B — toteutettava vaikutus:** Tilaa deskModel: 1 kk / 3 000 €, baseline 1 kk. Jos ennalta sidottu aineisto ei riitä, lisämittaus 1 kk / 4 000 €; tämä jatkotyö ei luo uutta häiriötä.

**Kytketyt tunnisteet:** `LP1-E-T02`

**Kuvitus:** Asukas katsoo pätkivää televisiota; pöydällä suunnittelukartta ja antennimittaaja. Voimalat näkyvät vain kartalla.

**Tausta:** LPA03

**Rajaus:** Ei yleistä oletusta, että kaikki radio- tai mobiilihäiriöt ovat tuulivoiman aiheuttamia. Mahdollisten korjausten toteutusvastuu ja kustannus selvitetään tapauskohtaisesti; rahoitusta ei muuteta automaattiseksi lupaehtomaksuksi.

---

### [LP1-T03]

#### PELAAJALLE

**Kortin otsikko:** Lyhin reitti päättyy painorajaan

**Korttiteksti:** Tuulivoimaloiden alustava kuljetusreitti ylittää painorajoitetun sillan. Toinen reitti on pidempi mutta välttää sillan. Kuljetusasiantuntija pyytää valitsemaan, kumpaa selvitetään ensin.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään sillan ylityksen toteutettavuus

**Valinnan jälkeen näytetään:** Sillan ja suunniteltujen kuljetusten tiedot toimitetaan tarkasteltaviksi. Lyhyttä reittiä ei vielä vahvisteta käyttökelpoiseksi.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan sillan kiertävä reitti

**Valinnan jälkeen näytetään:** Kiertoreitin sopivuus ja sen edellyttämät järjestelyt selvitetään. Hanke varautuu pidempään kuljetusmatkaan.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-T03`

**Päävaihe:** 2 · **Kontekstit:** Tuuli

**Aiheketju / rooli:** `lp1_transport` / `base`

**Ehdot:** Erikoiskortti vain suoraan Tuuli-pelimuodosta aloitetulle hankkeelle; vaihe 2, ei rakennusvaihe. Kiertoreitti on alustavasti käytettävissä eikä silta ole ainoa fyysinen pääsy alueelle. Katalogista on myös yksilöity yhteensopiva, kevyemmin kuljetettava mallivaihtoehto LP1-T04:n vertailua varten.

**Valinta A — toteutettava vaikutus:** Tilaa bridgeAssessment: 2 kk / 7 000 €, baseline 2 kk. Preseed bridgeSuitable. Ei kuljetusluvan automaattista myöntämistä eikä työkoneiden ajamista sillalle.

**Valinta B — toteutettava vaikutus:** Tilaa bypassDesign: 3 kk / 10 000 €, baseline 2 kk. Kiertoreitin periaatteellinen soveltuvuus on tämän kortin ennakkotieto; huoltotien tai sähkönsiirron km ei kasva kuljetusmatkan takia.

**Kytketyt tunnisteet:** `LP1-E-T03`

**Kuvitus:** Tuulivoimalan raskas komponentti kuljetussuunnitelmassa, sillan painorajoitus ja kartan kiertoreitti.

**Tausta:** LPA04

**Rajaus:** Tämä on teknis-taloudellinen ennakkoselvitys, ei lupamaalin jälkeen toteutuva kuljetus. Ei keksittyä alkuvaiheen kuolemanloukkua. Tuleva kuljetusinvestointi ei kokonaan vähene kehitysbudjetista, vain selvitys- ja suunnittelukulut.

---

### [LP1-A01]

#### PELAAJALLE

**Kortin otsikko:** Paneelit heijastavat lähestymissuuntaan

**Korttiteksti:** Häikäisyselvitys osoittaa paneelikentän yhden lohkon heijastuksen lentopaikan lähestymissuuntaan. Toimittajan mukaan paneelipinta voidaan vaihtaa vähemmän heijastavaksi. Sen riittävyys täytyy vielä osoittaa.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään toinen paneelipinta

**Valinnan jälkeen näytetään:** Toisesta paneelipinnasta pyydetään tekniset tiedot ja uusi häikäisylaskenta. Lohko säilyy toistaiseksi suunnitelmassa.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään heijastuksen aiheuttava lohko pois

**Valinnan jälkeen näytetään:** Heijastuksen aiheuttava paneelilohko jätetään pois. Muu kenttä tarkistetaan samalla laskentatavalla.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A01`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_glare` / `base`

**Ehdot:** Aktiivinen aurinko-osa; lentopaikan vaikutusyhteys ja nimetty heijastuslohko. Lohkon poisrajaus on tässä skenaariossa toimiva vararatkaisu. Skenaarioon sidotaan myös pienempi, häikäisyn välttävä lohkoasettelu LP1-A05:n myöhempää vertailua varten. Ei jokaiselle aurinkopuistolle tuleva perusriski.

**Valinta A — toteutettava vaikutus:** Tilaa glareSurface: 2 kk / 7 000 €, baseline 2 kk. World.surfaceMitigates määritelty ennen valintaa. Ei globaalia häikäisyvahinkoa tai tulevien lentojen peruuttamista vielä rakentamattomasta kentästä.

**Valinta B — toteutettava vaikutus:** Poista sidotun solarBlock-ID:n paneeliala ja sen oikea MWp/MWac-osuus. Tilaa check: 1 kk / 4 000 €. Ohita sama jo poistettu lohko; älä vähennä tuulipaikkoja.

**Kytketyt tunnisteet:** `LP1-E-A01`

**Kuvitus:** Paneelilohkon heijastusviuhka kohti pienkoneen lähestymislinjaa; ei voimalan lapavarjoa.

**Tausta:** LPA05 LPA06

**Rajaus:** Schipholin tapaus on ilmiöesimerkki ulkomailta, ei Suomen lupakäytäntö tai kohteen tositarina. Pinnoite tai paneelinvaihto ei ole automaattisesti riittävä. Ei laskennan yhteydessä lentoturvallisuusohjeita pelaajalle.

---

### [LP1-A02]

#### PELAAJALLE

**Kortin otsikko:** Kuiva pelto, syvällä toinen tilanne

**Korttiteksti:** Paneelialueen kaapeli- ja kuivatussuunnitelma ulottuu maakerrokseen, jossa epäillään sulfidipitoista maata. Jos kerros pääsee hapettumaan, valumavedet voivat happamoitua. Epäily koskee vain yhtä kentän osaa.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan maakerros ja muokataan kaivusuunnitelmaa

**Valinnan jälkeen näytetään:** Maaperänäytteet ja kaivusyvyyksien tarkistus tilataan. Epäiltyä kentän osaa ei vielä jätetä pois.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään epäilty kentän osa pois

**Valinnan jälkeen näytetään:** Suunnittelua jatketaan ilman epäiltyä lohkoa. Sen osalta ei tarvita samaa syvää kaivua tai kuivatusta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A02`

**Päävaihe:** 2 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_sulfate` / `base`

**Ehdot:** Aurinko-osa ja paikalliseen maaperään perustuva sulfaattimaaepäily: rannikon/alavan kerrostumisympäristön tieto tai näyte. Ei kaikille sisämaan paikoille pelkän alueprofiilin perusteella. Tähän rajattuun skenaarioon kuuluu matalampi, riskikerrosta muuttamaton suunnitteluvaihtoehto, joka tutkitaan samalla aineistolla mahdollista LP1-A06-jatkoa varten.

**Valinta A — toteutettava vaikutus:** Tilaa sulfateSurvey: 2 kk / 9 000 €, baseline 2 kk. Maan ominaisuus preseed; kaivusyvyys ja vedenpinnan muutos eivät synny pelaajan tutkimuspäätöksestä.

**Valinta B — toteutettava vaikutus:** Poista sidottu lohko, check boundary hydrology 1 kk / 3 000 €. Tarjottavan rajauksen tulee aidosti välttää tämä maakerrokseen ulottuva vaikutus, ei vain siirtää ojaa naapuriin.

**Kytketyt tunnisteet:** `LP1-E-A02`

**Kuvitus:** Maaperän poikkileikkaus, matala kaapelikaivanto ja syvemmällä näytekerros. Ei mustaa saastepilveä.

**Tausta:** LPA07 LPA08

**Rajaus:** Kohdekohtainen näyte on eri asia kuin yleiskartan todennäköisyys. Ei kemiallisten käsittelyannosten ohjeita. Maan rakentamiskelpoisuus ja muu luontoarvo ovat eri ominaisuuksia.

---

### [LP1-A03]

#### PELAAJALLE

**Kortin otsikko:** Lampuri ehdottaa yhteistyötä

**Korttiteksti:** Paikallinen lampuri tarjoaisi laidunnusta aurinkokentän kasvillisuuden hoitoon. Hän tarvitsee toimivan portin ja turvalliset kulkureitit. Paneelien alla ei vielä laidunna kukaan: toteutus pitää suunnitella ja sopia.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan laidunnus osaksi kenttää

**Valinnan jälkeen näytetään:** Lampurin kanssa sovitaan eläinten hoidosta, kulusta ja aitaamisesta. Laite- ja kaapeliturvallisuus tarkistetaan suunnittelussa.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kasvillisuuden hoito niittämällä

**Valinnan jälkeen näytetään:** Kentän kasvillisuuden hoito suunnitellaan koneellisesti. Lampurin ehdotuksesta ei tehdä sopimusta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A03`

**Päävaihe:** 2 · **Kontekstit:** Aurinko, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_grazing` / `base`

**Ehdot:** Aktiivinen solar-konteksti, myös hybridistä jatkanut aurinko; paikallinen lampuri, soveltuva kenttä ja kasvillisuuden hoitosuunnitelma avoinna. Ei pakollinen lupavaihe.

**Valinta A — toteutettava vaikutus:** Tilaa grazingPlan: 1 kk / 3 000 €, baseline 1 kk. Ei luvan ostamista tai automaattista luontokompensaatiota; pienellä suunnittelukululla voi syntyä toimiva myöhempi hoitosopimus.

**Valinta B — toteutettava vaikutus:** Kirjaa mowingPlan: 1 kk / 1 000 €. Ei rangaistusta laidunnuksesta kieltäytymisestä. Huoltokulku turvataan myös tässä.

**Kytketyt tunnisteet:** `LP1-E-A03`

**Kuvitus:** Lampuri ja suunnittelija paneelialueen porttikartalla; pieni lammas siluettina tulevaa käyttöä havainnollistamassa.

**Tausta:** LPA09

**Rajaus:** Erityisesti Aurinko-pelimuodon myönteinen erikoistilanne. Luonnon monimuotoisuushyötyä ei pisteytetä ilman laadittua kohdekohtaista perustaa. Lampaita ei toteuteta rakennustyömaan eläinsimulaatioksi.

---

### [LP1-A04]

#### PELAAJALLE

**Kortin otsikko:** Kaksi tarjousta, sama liittymäteho

**Korttiteksti:** Liittymän suunnitteluraja on {solarAcMW} MW. Toinen vaihtoehto sisältää {dcLowMWp} MWp paneeleita, toinen {dcHighMWp} MWp. Isompi kenttä voi tuottaa enemmän vuodessa, mutta huippuhetkien tehoa ei saada kokonaan verkkoon.

##### Valinta A

**Pyyhkäisyteksti:** Mallinnetaan suuremman paneelimäärän hyöty

**Valinnan jälkeen näytetään:** Suuremmalle paneelimäärälle lasketaan vuosituotanto, tehorajoituksen menetys ja tarvittava kenttätila. Liittymäteho ei kasva.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään pienempi paneelivaihtoehto

**Valinnan jälkeen näytetään:** Jatkosuunnittelu käyttää pienempää paneelimäärää ja sen kustannusarviota. Suurempaa vaihtoehtoa ei oteta mukaan ilman lisävertailua.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A04`

**Päävaihe:** 2 · **Kontekstit:** Aurinko, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_dcac` / `base`

**Ehdot:** Vain Aurinko-konteksti; sama AC-liittymärajausehto tunnetaan, molemmat DC-vaihtoehdot mahtuvat jo hallittuun suunnittelualueeseen. dcHighMWp > dcLowMWp > 0. Ei tule akkuinvestoinnin tarjoukseksi.

**Valinta A — toteutettava vaikutus:** Tilaa dcAcStudy: 1 kk / 4 000 €, baseline 1 kk. Skenaariossa valmiiksi varattu ja selvitetty lisäpaneelitila: ei ulkopuolelta syntyviä hehtaareja. Raportti ei itsessään rakenna tai lisää paneeleita; tekninen valintavahvistus vaaditaan.

**Valinta B — toteutettava vaikutus:** Kirjaa aiemmin perusteltu pienempi layout ja capacitydc/AC. Ei väitetä suuremman MWp:n olleen yksin virhe. Sama AC-raja pysyy molemmille.

**Kytketyt tunnisteet:** `LP1-E-A04`

**Kuvitus:** Kaksi paneelitarjousta yhdelle sähköasemalle; eri paneelimäärä mutta sama liittymä.

**Tausta:** LPA10 LPA11

**Rajaus:** MWp/DC, invertterin MWac ja liittymän vientiraja ovat kolme eri arvoa. Älä arvioi clippingiä vain paneelitehon ja liittymätehon erotuksena; vuosienergia tarvitsee tuotantoprofiilin. Käytä validoitua fiktiivistä tuotantoprofiilia, ei ajonaikaista nettilaskentaa.

---

### [LP1-Y01]

#### PELAAJALLE

**Kortin otsikko:** Yksi hanke, kaksi valtuustoa

**Korttiteksti:** Tuotantoalue ulottuu kahteen kuntaan, joissa laaditaan omat osayleiskaavat. Ensimmäinen kunta hyväksyy ratkaisunsa. Toinen palauttaa pienen reuna-alueen uudelleen valmisteltavaksi. Muu kokonaisuus voisi toimia ilman sitä.

##### Valinta A

**Pyyhkäisyteksti:** Odotetaan toisen kunnan tarkistettua ratkaisua

**Valinnan jälkeen näytetään:** Toisen kunnan esiin nostamat vaikutukset täydennetään. Hankkeen nykyinen kokonaisuus pysyy toistaiseksi suunnitelmassa.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan ilman palautettua reuna-aluetta

**Valinnan jälkeen näytetään:** Toisen kunnan puolella oleva tuotantoalue jätetään tästä hankevaiheesta pois. Jäljelle jäävän kokonaisuuden kaava- ja lupatarpeet tarkistetaan.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-Y01`

**Päävaihe:** 4 · **Kontekstit:** Tuuli, Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_municipal` / `base`

**Ehdot:** Kaksi kuntaa laatii kumpikin oman tuotanto-osan kaavansa, ensimmäisen päätös tehty; toinen palautettu. Ei kahden kunnan yhteistä yleiskaavaa. Puuttuva reuna ei sisällä ainoaa sähköasemaa, johtoyhteyttä tai välttämätöntä luontolievennystä. Liitteen 03 mukainen regionParts-rakenne nimeää toisen kunnan kohteet ja näyttää tunnetun kpl/ha-menetyksen valinnan yhteydessä; itse kortti sopii jokaiseen tuotantomuotoon.

**Valinta A — toteutettava vaikutus:** Tilaa municipalAmendment: 4 kk / 9 000 €, baseline 2 kk; hallinnollinen käsittelyaika erikseen ulkoinen. Preseed conclusion. Älä muuta ensimmäisen kunnan päätöstä toisen kunnan päätökseksi.

**Valinta B — toteutettava vaikutus:** Poista vain municipalParcelIds:n aktiiviset kyseisen moodin kohteet; ei puuttuvan hankeosan poistoa. Tilaa separabilityCheck: 2 kk / 6 000 €. Säilytä jäljelle jäävän alueen yhteinen johto ja oikeudet, jos ne todistetusti riittävät.

**Kytketyt tunnisteet:** `LP1-E-Y01`

**Kuvitus:** Kaksi kunnan päätöspöytää ja niiden välissä tuotantoalueen kuntaraja. Kuvassa vain nykyisen pelimuodon tuotantolaitteet.

**Tausta:** LPA12 LPA13

**Rajaus:** Uusi aihe on eriaikainen kunnallinen ratkaisu, ei sama kuin nykyinen maakuntakaavan odotus tai uusi valtuusto. Kaavan hyväksyntä/lainvoima ovat kuntakohtaisia. Ensimmäinen myönteinen päätös ei myönnä toisen kunnan hyväksyntää.

---

## 2. Sidotut korjaus- ja jatkokortit

### [LP1-T04]

#### PELAAJALLE

**Kortin otsikko:** Sillan kautta ei päästä

**Korttiteksti:** Selvitys sulki lyhyen kuljetusreitin pois. Pidempi reitti on edelleen mahdollinen, mutta suunnittelu ja kustannusarvio puuttuvat. Pitäydytkö nykyisessä voimalassa vai tutkitko kevyemmin kuljetettavaa mallia?

##### Valinta A

**Pyyhkäisyteksti:** Tehdään nykyiselle mallille kiertoreittisuunnitelma

**Valinnan jälkeen näytetään:** Kiertoreitin selvitys tilataan nykyiselle voimalamallille. Siltavaihtoehtoon käytetyt rahat eivät palaudu.

##### Valinta B

**Pyyhkäisyteksti:** Verrataan toista voimalamallia

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään kuljetustiedot ja tuotantoarvio toiselle mallille. Nykyistä voimalatyyppiä ei vaihdeta ennen vertailun tulosta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-T04`

**Päävaihe:** 3 · **Kontekstit:** Tuuli

**Aiheketju / rooli:** `lp1_transport` / `followup`

**Ehdot:** Vain LP1-T03/A:n kielteisen bridgeAssessmentin jälkeen. Yksi jatkopäätös; ei tavalliseen pakkaan. Mallihaara tarjotaan vain, jos skenaariossa on yhteensopiva vaihtoehtoinen laite. Tämä tarkistetaan jo LP1-T03:n kelpoisuudessa.

**Valinta A — toteutettava vaikutus:** Tilaa bypassDesign kerran: 3 kk / 10 000 €. Säilytä bridgeAssessment-kulu ja siihen jo kulunut todellinen aika.

**Valinta B — toteutettava vaikutus:** Tilaa modelComparison: 2 kk / 6 000 €. Tämän korttiketjun skenaarioon kuuluu nykyisen tyyppikatalogin teknisesti yhteensopiva ja kevyemmin kuljetettava vaihtoehto. Vertailu täsmentää kustannuksen, tuotannon ja muut selvitystarpeet; se ei vielä vaihda mallia.

**Kytketyt tunnisteet:** `LP1-E-T03`

**Kuvitus:** Siltareitti yliviivattuna ja vaihtoehtoisen voimalamallin kuljetuspiirros.

**Tausta:** LPA04

**Rajaus:** B:n myönteinen vertailu tuo erillisen hyväksymisvahvistuksen nykyisen teknisen mallinvalinnan kautta; ei mallinvaihtoa pelkän selvityksen tilaamisesta. Vertailu ei arvo jo todettua teknistä yhteensopivuutta uudelleen. Pelaaja hyväksyy muuttuvat malliarvot tai pitäytyy nykyisessä mallissa ja kiertoreitissä. Enintään yksi vertailukierros.

---

### [LP1-A05]

#### PELAAJALLE

**Kortin otsikko:** Uusi paneelipinta ei riitä

**Korttiteksti:** Uusintalaskennan mukaan heijastus osuu edelleen lähestymissuuntaan. Suunnittelija on löytänyt toisen lohkoasettelun, mutta siihen mahtuu vähemmän paneeleja. Toinen vaihtoehto on jättää koko ongelmalohko pois.

##### Valinta A

**Pyyhkäisyteksti:** Valitaan tutkittu pienempi lohkoasettelu

**Valinnan jälkeen näytetään:** Lohkon suuntaus ja paneelimäärä muutetaan tutkitun vaihtoehdon mukaisiksi. Osa kapasiteetista säilyy.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään koko ongelmalohko pois

**Valinnan jälkeen näytetään:** Lohko poistetaan kaava- ja lupapiirustuksista. Muu aurinkohanke jatkuu pienempänä.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A05`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_glare` / `followup`

**Ehdot:** LP1-A01/A epäonnistui ja aidosti tutkittu pienempi asettelu on käytettävissä. Enintään yksi korjaus tähän havaintoon.

**Valinta A — toteutettava vaikutus:** Käytä ennalta selvitettyä viableGlareLayoutia; muokkaa block layout revision ja pienempi MWp/ha, suunnittelu 2 kk / 6 000 €. Ei lisäsatunnaista epäonnistumista todennetulle vaihtoehdolle.

**Valinta B — toteutettava vaikutus:** Poista vain saman casen lohko; check 1 kk / 4 000 €. Jos omistajan aiemmin ilmoitettu jatkoraja alittuu, sovelletaan normaalia laajuustarkistusta, ei uutta arpaa.

**Kytketyt tunnisteet:** `LP1-E-A01`

**Kuvitus:** Sama paneelilohko kahdella tutkitulla rajauksella.

**Tausta:** LPA05 LPA06

---

### [LP1-A06]

#### PELAAJALLE

**Kortin otsikko:** Kaivusuunnitelma menee uusiksi

**Korttiteksti:** Näytteet vahvistavat happamoitumisriskin suunnitellulla kaivusyvyydellä. Asiantuntijan vaihtoehto jättää riskikerroksen rauhaan, mutta kaapelointi pitenee ja vedet täytyy johtaa uudelleen. Toinen ratkaisu on poistaa lohko.

##### Valinta A

**Pyyhkäisyteksti:** Valitaan tutkittu matalampi kaivuratkaisu

**Valinnan jälkeen näytetään:** Kaapelointi ja vesienhallinta suunnitellaan asiantuntijan vaihtoehdon mukaisiksi. Paneelilohko voidaan säilyttää.

##### Valinta B

**Pyyhkäisyteksti:** Poistetaan kyseinen paneelilohko

**Valinnan jälkeen näytetään:** Lohko jää rakentamisen ulkopuolelle. Kaapeli- ja kuivatuspiirustukset päivitetään pienemmälle kentälle.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-A06`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_sulfate` / `followup`

**Ehdot:** Vain LP1-A02/A:n positiivinen riskilöydös; asiantuntijalla aidosti toteuttamiskelpoinen matalampi suunnitelma. Ei luoda tätä vaihtoehtoa jälkikäteen kaikkiin maaperiin.

**Valinta A — toteutettava vaikutus:** 2 kk / 8 000 € suunnittelutyö. Säilytä lohko vain ennakolta viability-flagilla todetussa ratkaisussa, kaikille vaadituille nykyvaikutuksille tarkistus. Kasvata intraSiteCableKm, ei automaattisesti gridConnectionKm.

**Valinta B — toteutettava vaikutus:** Poista kyseinen block-ID ja tarkista 1 kk / 3 000 €. Aiempi tutkimuskulu säilyy; uuden työn kustannus ei korvaa maksettua laskua.

**Kytketyt tunnisteet:** `LP1-E-A02`

**Kuvitus:** Sama maapoikkileikkaus ja matalampi kaapelointi; vaihtoehtona pois rajattu paneelilohko.

**Tausta:** LPA07 LPA08

---

## 3. Hybridin jatkaminen aurinkohankkeena

### [LP1-H01]

#### PELAAJALLE

**Kortin otsikko:** Jatketaanko aurinkovoimahankkeena?

**Korttiteksti:** Tuulivoimaosalle ei löydy toteuttamiskelpoista jatkoa. Hankkeessa on kuitenkin edelleen {solarHa} hehtaaria käyttökelpoista aurinkoaluetta. Omistaja on valmis jatkamaan sen selvittämistä. Pelkästä aurinkohankkeesta tarvitaan päivitetty suunnitelma.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan aurinkovoimahankkeena

**Valinnan jälkeen näytetään:** Tuulivoimaosa jätetään pois ja aurinkohankkeen suunnitelma päivitetään. Tehdyt selvitykset hyödynnetään siltä osin kuin ne vastaavat muuttunutta hanketta.

##### Valinta B

**Pyyhkäisyteksti:** Lopetetaan tämän hankkeen kehitys

**Valinnan jälkeen näytetään:** Hankkeen kehitys päättyy. Aurinkovoiman jatkosuunnitelmaa ei tilata.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-H01`

**Päävaihe:** 3 · **Kontekstit:** Hybridi

**Aiheketju / rooli:** `lp1_solar_continuation` / `recovery`

**Ehdot:** Vain alkujaan hybridinä alkanut peli. Tuuliosaan kohdistuva todellinen lopetusperuste; vähimmäislaajuuden ylittävä olemassa oleva aurinkoalue; omistaja jatkaa; itsenäinen liityntä ja maa alustavasti mahdollisia; ei yhteistä estettä; ei aiempaa tarjousta/konversiota; lupavoittoa ei ole. Tarkat ehdot 03:ssa. Voi tulla vaiheessa 2, 3 tai 4, ei satunnaisena peruskorttina.

**Valinta A — toteutettava vaikutus:** Toteuta 03:n atominen konversio ennen finish():ä. Sama runId/seed/kello/raha/historia. activeMode=solar, route=hybrid_solar, conversion.used=true. Säilytä originalMode=hybrid. Älä lisää maata tai kasvata aurinkoa poistettujen tuulipaikkojen tilalle. BESS pois vain jos erotettavissa.

**Valinta B — toteutettava vaikutus:** Viimeistele alkuperäinen failureAssessment johdetulla loppusyyllä; kieltäytyminen ei ole uusi tyhmä valinta tai oma tappioarpa. Tallenna continuationDeclined, näytä alkuperäinen syyhistoria.

**Kytketyt tunnisteet:** `LP1-E-H01`

**Kuvitus:** Sama hankekartta: tuulivoimalat merkitty pois, jo olemassa oleva paneelikenttä jää; ei uusia paneeleja tyhjästä.

**Tausta:** LPA01 LPA06 LPA13 LPA14

**Rajaus:** body ei näytä failure classification -koodia. Ennen tätä pelaaja näkee tuuliosan todellisen estävän johtopäätöksen ilman väitettä koko hankeyhtiön kaikkien vaihtoehtojen lopettamisesta. existing independentSolar -haara ei saa enää muuttaa hanketta ilman A-valintaa.

---

### [LP1-H02]

#### PELAAJALLE

**Kortin otsikko:** Oma sähköasema tarvitsee tilaa

**Korttiteksti:** Itsenäisen aurinkohankkeen sähköasema ja kulku voidaan sijoittaa omille maille, mutta paneelialasta jäisi pois {lostSolarHa} ha. Jäljelle jäävä {remainingSolarHa} ha ylittää omistajan jatkorajan. Alueen kasvattamiseen ei ole sovittua lisämaata.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan pienemmällä aurinkokentällä

**Valinnan jälkeen näytetään:** Sähköasemalle ja kululle varataan tila. Paneeliala pienenee, ja päivitetty kokonaisuus viedään tarvittavaan kaava- ja lupakäsittelyyn.

##### Valinta B

**Pyyhkäisyteksti:** Ei jatketa pienemmän vaihtoehdon kanssa

**Valinnan jälkeen näytetään:** Omistaja päättää lopettaa kehityksen. Pienempi aurinkohanke jää toteuttamatta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-H02`

**Päävaihe:** 3 · **Kontekstit:** Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_solar_continuation` / `followup`

**Ehdot:** Vain LP1-E-H02/reduced, olemassa oleva oma maa riittää sekä itsenäinen pienempi vaihtoehto tutkittu. remainingSolarHa=nykyinen solarHa-lostSolarHa; >0 ja vähintään sovittu solarjatkoraja. Ei tarjota jo vähennettyä samaa alaa uudelleen.

**Valinta A — toteutettava vaikutus:** Toteuta vain sidotut lohkomuutokset, solarArea=remainingSolarHa. Tilaa layout/permitDelta 2 kk / 6 000 €. Maksettu valmistelu ja aiemmat poistot pysyvät. Tämä on tutkittu jatko, ei uusi satunnainen mahdollisuuspiste.

**Valinta B — toteutettava vaikutus:** Omistajan tietoinen lopetus; säilytä alkuperäinen hybridin tuuliosan syy ja aurinkojatkon päätös erillään. Ei muualla olevien voimaloiden tai uusien paneelien syntymistä.

**Kytketyt tunnisteet:** Ei uutta nimettyä korttia.

**Kuvitus:** Sähköasema ja kulku vievät osan paneelialueesta; muutama pois jäävä paneelirivi.

**Tausta:** LPA06

**Rajaus:** Jatko A → normaalit uusiin revisioihin sidotut aurinko-/yhteiset lupa-askeleet → LP1-E-H03 vasta oikeassa voitossa. Suunniteltu kertaluonteinen rajaus kirjataan case-faktoihin.

---

## 4. Tulos-, siirtymä- ja lopputapahtumat

### [LP1-E-T01]

#### PELAAJALLE

**Tapahtuman otsikko:** Välkeratkaisu saatiin laskettua

**Näytetään vain toteutunut tuloshaara:**

**Haara `control` — ehto (ei pelaajatekstiä):** Lähde LP1-T01/A; ohjaussuunnitelma valmis

Kohdennettu pysäytysohjaus estää tarkastellun välkkeen. Voimalamäärä säilyy. Arvioitu vuosituotanto pienenee {yieldLossPct} prosenttia.

**Haara `removed` — ehto (ei pelaajatekstiä):** Lähde LP1-T01/B; uusintamallinnus valmis

Uusi välkemallinnus ei osoita samaa haittaa talolle. Kaksi poistettua voimalapaikkaa jäävät pois myös kaavaehdotuksesta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-T01`

**Päävaihe:** 3 · **Kontekstit:** Tuuli, Hybridi

**Aiheketju / rooli:** `lp1_shadow` / `result`

**Ehdot:** Vain tämän tapauksen tilatun työn valmistuttua ja oikealle suunnitelmarevisiolle. Haara seuraa A/B-valintaa, ei uutta arvontaa.

**Tuloksen `control` vaikutus:** Ratkaise vain välketapaus. Kirjaa syykohtainen windYield-muutos yhden kerran. yieldLossPct on koko hankkeen laskettu suhteellinen muutos, ei automaattisesti kahden koneen nimellistehon vähennys.

**Tuloksen `control` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `removed` vaikutus:** Ratkaise välketapaus, pidä aiemmat poisto-ID:t. Älä poista toista kahden voimalan joukkoa tapahtuman vuoksi.

**Tuloksen `removed` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** Ei uutta nimettyä korttia.

**Kuvitus:** Sama talo ja voimalat; ohjauksen ajankohdat tai pois rajattu paikkapari.

**Tausta:** LPA01 LPA02

---

### [LP1-E-T02]

#### PELAAJALLE

**Tapahtuman otsikko:** Vastaanottoarviosta saatiin vastaus

**Näytetään vain toteutunut tuloshaara:**

**Haara `baseline_clear` — ehto (ei pelaajatekstiä):** A tai B:n jälkeen todella valmistunut lisämittaus; lisähäiriön riski pieni

Mittaukset osoittavat vastaanoton pätkivän jo nykytilanteessa. Tuulipuiston suunnitelma ei arvion mukaan aiheuttaisi olennaista lisähäiriötä.

**Haara `mitigation` — ehto (ei pelaajatekstiä):** A tai riittävän aineiston B; hankkeen lisähäiriö todettu mahdolliseksi

Suunniteltu tuulipuisto voisi heikentää osan taloista vastaanottoa. Asiantuntija esittää antenniratkaisua tai täytelähetintä; vastuut ja kustannusarvio lisätään hankesuunnitelmaan.

**Haara `measure_later` — ehto (ei pelaajatekstiä):** B:n ensimmäinen deskModel valmis ja nykytilan tieto puutteellinen; lisämittausta ei vielä ole tehty

Laskenta ei erota heikkoa lähtötilannetta hankkeen mahdollisesta lisävaikutuksesta. Tarvitaan vielä vastaanottomittaukset.

**Haara `desk_clear` — ehto (ei pelaajatekstiä):** B:n ensimmäinen deskModel; malliaineisto riittävä, lisähäiriön riski pieni eikä lisämittausta tarvittu

Lähetysreitin ja maaston tarkastelu ei osoita tuulipuistolle olennaista lisähäiriötä. Erillisiä maastomittauksia ei tarvita tätä arviota varten.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-T02`

**Päävaihe:** 3 · **Kontekstit:** Tuuli, Hybridi

**Aiheketju / rooli:** `lp1_tv` / `result`

**Ehdot:** LP1-T02:n työ valmis; mahdollinen lisämittaus on oma job saman case-ID:n alla. baseline_clear näytetään B:n jälkeen vain jos lisämittaus todella tehtiin.

**Tuloksen `baseline_clear` vaikutus:** Nykyvian ja hankkeen vaikutuksen erottelu valmis; ei muuta tuulimäärää.

**Tuloksen `baseline_clear` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `mitigation` vaikutus:** Kirjaa toteutusvaiheen häiriöntorjuntavelvoite ja suunnittelukustannus, ei valmista rakentamista. Tämän skenaarion ratkaisu on selvitetty toteuttamiskelpoiseksi.

**Tuloksen `mitigation` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `measure_later` vaikutus:** Tilaa rajattu lisämittaus kerran ja pidä tapaus avoinna valmistumiseen. Lisämittauksen valmistuminen julkaisee saman tapahtuman uuden outcome-ID:n haaralla baseline_clear tai mitigation. measure_later on sallittu vain deskModel-vaiheessa, eikä koskaan sen jälkeisen työn tuloksena. B:n ilman lisämittausta riittävä tulos käyttää desk_clear-haaraa.

**Tuloksen `measure_later` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `desk_clear` vaikutus:** Ratkaise tapaus ilman lisämittauslaskua.

**Tuloksen `desk_clear` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** Ei uutta nimettyä korttia.

**Kuvitus:** Antennivastaanoton mittaus ja talon katto; sama kohde kuin alkukortissa.

**Tausta:** LPA03

---

### [LP1-E-T03]

#### PELAAJALLE

**Tapahtuman otsikko:** Kuljetussuunnitelma tarkentui

**Näytetään vain toteutunut tuloshaara:**

**Haara `bridge_ok` — ehto (ei pelaajatekstiä):** LP1-T03/A ja bridgeSuitable

Sillan ylitys on selvityksen perusteella suunniteltavissa määritellyillä järjestelyillä. Lyhyt reitti voidaan pitää hankesuunnitelmassa.

**Haara `bridge_no` — ehto (ei pelaajatekstiä):** LP1-T03/A ja ei bridgeSuitable

Silta ei sovellu suunnitelluille kuljetuksille. Hanketta voidaan jatkaa, mutta kuljetusratkaisu on valittava uudelleen.

**Haara `bypass_ok` — ehto (ei pelaajatekstiä):** LP1-T03/B tai LP1-T04/A ja kiertoreitin suunnittelu valmis

Kiertoreitti soveltuu suunnitelluille kuljetuksille. Matka ja kustannusarvio kasvavat, mutta voimalamalli voidaan säilyttää.

**Haara `model_report` — ehto (ei pelaajatekstiä):** LP1-T04/B ja vertailu valmis

Toisen voimalamallin kuljetusratkaisu on arvioitu. Sen hinta- ja tuotantotiedot tuodaan päätettäväksi yhdessä muuttuvien selvitystarpeiden kanssa.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-T03`

**Päävaihe:** 3 · **Kontekstit:** Tuuli

**Aiheketju / rooli:** `lp1_transport` / `result`

**Ehdot:** Kuljetustapauksen sidottu työ valmis. Mallihaaran hyväksymisdialogi on tekninen jatkovalinta; toteuta ja testaa, älä jätä pelkäksi tekstiksi.

**Tuloksen `bridge_ok` vaikutus:** Ratkaise suunnittelun avoin kysymys. Kuljetusten erilliset luvat ja lopulliset järjestelyt jäävät oikeaan toteutusvaiheeseen.

**Tuloksen `bridge_ok` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `bridge_no` vaikutus:** Pidä tapaus avoinna; tarjoa jatkokortti.

**Tuloksen `bridge_no` jatkot:** `LP1-T04`

**Tuloksen `bypass_ok` vaikutus:** Sulje kuljetustapaus. Kirjaa logisticsKm erikseen gridRouteKm:stä.

**Tuloksen `bypass_ok` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `model_report` vaikutus:** Avaa dokumentoitu mallin hyväksymisvahvistus; näytä todelliset vanha/uusi MW ja korkeus. Tämä tulos ei itsessään hyväksy mallinvaihtoa. Vahvistus ei ole uusi satunnainen peruskortti.

**Tuloksen `model_report` jatkot:** `LP1-D-T04`

**Kytketyt tunnisteet:** `LP1-D-T04`, `LP1-T04`

**Kuvitus:** Reittikartta ja kuljetusasiantuntijan laskelmat.

**Tausta:** LPA04

---

### [LP1-E-A01]

#### PELAAJALLE

**Tapahtuman otsikko:** Häikäisyn tarkistus valmistui

**Näytetään vain toteutunut tuloshaara:**

**Haara `surface_ok` — ehto (ei pelaajatekstiä):** LP1-A01/A ja surfaceMitigates

Uuden paneelipinnan ja sijoittelun laskenta ei osoita aiempaa haitallista heijastusta. Ratkaisu ja käytettävä paneelityyppi kirjataan suunnitelmaan.

**Haara `surface_no` — ehto (ei pelaajatekstiä):** LP1-A01/A ja ei surfaceMitigates

Paneelipinnan vaihtaminen ei poista haitallista heijastusta tästä suunnasta. Kentän asettelua tai laajuutta on muutettava.

**Haara `layout_ok` — ehto (ei pelaajatekstiä):** LP1-A05/A, muuttunut asettelu tarkistettu

Uusi asettelu välttää todetun heijastuksen. Lohkoon jää aiempaa vähemmän paneeleja, mutta sitä ei tarvitse poistaa kokonaan.

**Haara `block_out` — ehto (ei pelaajatekstiä):** LP1-A01/B tai LP1-A05/B

Ongelmalohkon poisto ratkaisee tarkastellun heijastuksen. Muut paneelialueet jäävät jatkosuunnitteluun.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-A01`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_glare` / `result`

**Ehdot:** Valitun vaihtoehdon selvitys valmis. Jos suunnitelma on vaihtunut tämän jälkeen, tulos vanhentunut eikä kuulu hyväksymisen pohjaksi.

**Tuloksen `surface_ok` vaikutus:** Ratkaise glare-case vain tällä equipment/layout-revisiolla. Aineisto viedään tarvittavaan lausunto- ja lupakäsittelyyn.

**Tuloksen `surface_ok` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `surface_no` vaikutus:** Avaa LP1-A05. Sen pienempi vaihtoehto on sidottu tämän skenaarion kelpoisuuteen etukäteen ja tarkistettu uusintalaskennassa; älä keksi ratkaisua mielivaltaiselle toiselle kohteelle.

**Tuloksen `surface_no` jatkot:** `LP1-A05`

**Tuloksen `layout_ok` vaikutus:** Ratkaise case; säilytä toteutettu pienennys eikä uutta poistokertaa.

**Tuloksen `layout_ok` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `block_out` vaikutus:** Ratkaise case, älä poista samoja hehtaareja uudelleen.

**Tuloksen `block_out` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** `LP1-A05`

**Kuvitus:** Heijastusmallin tulos ja sama vastaanottosuunta.

**Tausta:** LPA05 LPA06

---

### [LP1-E-A02]

#### PELAAJALLE

**Tapahtuman otsikko:** Maaperäselvityksen tulos

**Näytetään vain toteutunut tuloshaara:**

**Haara `no_acid` — ehto (ei pelaajatekstiä):** LP1-A02/A; riskikerrosta ei todeta suunnitellulla vaikutussyvyydellä

Näytteet ja kaivusuunnitelma eivät osoita epäiltyä happamoitumisriskiä tässä lohkossa. Paneeliala voidaan säilyttää.

**Haara `risk` — ehto (ei pelaajatekstiä):** LP1-A02/A; riski todettu

Suunniteltu kaivu voisi altistaa sulfidipitoisen kerroksen hapettumiselle. Kaivusyvyyttä ja vesienhallintaa on muutettava tai lohko jätettävä pois.

**Haara `shallower` — ehto (ei pelaajatekstiä):** LP1-A06/A ja suunnitelma tarkistettu

Muuttunut kaivuratkaisu ei ulotu riskikerrokseen eikä muuta sen vesitaloutta haitallisesti. Paneelilohko säilyy, mutta suunnittelu ja kaapelointi maksavat enemmän.

**Haara `excluded` — ehto (ei pelaajatekstiä):** LP1-A02/B tai LP1-A06/B ja vaikutusrajauksen tarkistus valmis

Riskialttiiksi arvioitu lohko on poistettu kaivu- ja kuivatussuunnitelmasta. Muu kenttä jatkaa ilman tämän lohkon kapasiteettia.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-A02`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_sulfate` / `result`

**Ehdot:** Sidottu maaperätyö tai poisrajauksen tarkistus valmis; preseed ja valittu työ määräävät näytettävän haaran.

**Tuloksen `no_acid` vaikutus:** Ratkaise sulfate-case; ei hyvitystä poisjätetylle lohkolle, jota ei tutkittu.

**Tuloksen `no_acid` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `risk` vaikutus:** Jatko LP1-A06. Älä oleta toteutunutta vesistövahinkoa suunnittelupelissä.

**Tuloksen `risk` jatkot:** `LP1-A06`

**Tuloksen `shallower` vaikutus:** Ratkaise kyseinen maaperäriski; mahdolliset erilliset lupa-/vesikysymykset eivät poistu.

**Tuloksen `shallower` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `excluded` vaikutus:** Säilytä poisto kerran. Älä sano näytteiden vahvistaneen riskiä, jos B:ssä niitä ei tilattu.

**Tuloksen `excluded` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** `LP1-A06`

**Kuvitus:** Maaperänäytteet ja kaivukartta.

**Tausta:** LPA07 LPA08

---

### [LP1-E-A03]

#### PELAAJALLE

**Tapahtuman otsikko:** Kasvillisuuden hoidosta sovittiin

**Näytetään vain toteutunut tuloshaara:**

**Haara `grazing` — ehto (ei pelaajatekstiä):** A; laitteisto ja lampurin ehdot yhteensopivat

Laidunnus sopii suunnitelmaan. Portit, turvallisuusjärjestelyt ja hoitovastuut on sovittu. Paikallinen yhteistyö tuo tällä kertaa ratkaisun eikä uutta kiistaa.

**Haara `not_suitable` — ehto (ei pelaajatekstiä):** A; laitteisto tai käytännön hoito ei sovi

Laidunnusta ei saada sovitettua tähän kenttään turvallisesti. Kasvillisuuden hoito suunnitellaan niittämällä; paneeliala säilyy.

**Haara `mowing` — ehto (ei pelaajatekstiä):** B; hoitosuunnitelma valmis

Niittokalustolle on toimivat reitit ja kasvillisuuden hoidosta on suunnitelma. Kentän muu suunnittelu jatkuu.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-A03`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_grazing` / `result`

**Ehdot:** LP1-A03:n tilattu hoitosuunnitelma valmis. Ei luoda laidunnustarjousta jokaiseen aurinkohankkeeseen.

**Tuloksen `grazing` vaikutus:** Kirjaa hoitosopimus ja planningQuality vain kerran, ei kapasiteetin ilmaista kasvua.

**Tuloksen `grazing` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `not_suitable` vaikutus:** Pidä A-suunnittelukulu; kirjaa niitto ilman uutta rangaistusketjua tai eläinvahinkoa.

**Tuloksen `not_suitable` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `mowing` vaikutus:** Neutraali valmistuminen voidaan yhdistää seuraavaan näkymään; ei pakollista erillistä välitarinaa.

**Tuloksen `mowing` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** Ei uutta nimettyä korttia.

**Kuvitus:** Paneelikentän portti ja sovittu hoitotapa.

**Tausta:** LPA09

---

### [LP1-E-A04]

#### PELAAJALLE

**Tapahtuman otsikko:** Paneelimäärän vertailu valmistui

**Näytetään vain toteutunut tuloshaara:**

**Haara `useful` — ehto (ei pelaajatekstiä):** A; suuremman vaihtoehdon hyöty osoitettu

Suurempi paneelivaihtoehto tuottaisi tässä laskelmassa enemmän käyttökelpoista vuosienergiaa myös tehorajoituksen jälkeen. Lisähinta ja kenttätila esitetään omistajalle päätettäväksi.

**Haara `weak` — ehto (ei pelaajatekstiä):** A; hyöty ei vastaa lisäpanosta

Lisäpaneelien laskettu hyöty jää pieneksi suhteessa lisähintaan ja tehorajoitukseen. Suunnittelua jatketaan pienemmällä vaihtoehdolla.

**Haara `small` — ehto (ei pelaajatekstiä):** B

Pienempi paneelivaihtoehto on jatkosuunnittelun lähtökohta. Sen vuosituotanto ja liittymän vientiraja ovat mukana kustannusarviossa.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-A04`

**Päävaihe:** 3 · **Kontekstit:** Aurinko, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_dcac` / `result`

**Ehdot:** LP1-A04 tehty ja sen valittu vaihtoehto valmistunut. Hyötyprofiili ennalta johdettu; kumpikaan polku ei tuo tuulivoimaloita tai BESSiä.

**Tuloksen `useful` vaikutus:** Avaa teknisen vaihtoehdon vahvistus: suurempi layout tai pysyminen pienemmässä. Säilytä AC-raja. Lopullinen scope arvioidaan sovittuun alkuperäiseen tavoitteeseen, ei resetoi tavoitetta.

**Tuloksen `useful` jatkot:** `LP1-D-A04`

**Tuloksen `weak` vaikutus:** Ei automaattista MWac-menetystä. A-tutkimuskulu säilyy; ei tiedon vuoksi syntyvää uutta fyysistä ongelmaa.

**Tuloksen `weak` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `small` vaikutus:** Tavallinen vahvistus saa olla tiivistetty rivihuomio. Älä väitä lisäpaneelitutkimusta tehdyksi.

**Tuloksen `small` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** `LP1-D-A04`

**Kuvitus:** Tuotantoprofiilin luonnos ja kaksi vaihtoehtoa; ei kWh-lupauksia kuvitukseen.

**Tausta:** LPA10 LPA11

---

### [LP1-E-Y01]

#### PELAAJALLE

**Tapahtuman otsikko:** Toisen kunnan asian käsittely eteni

**Näytetään vain toteutunut tuloshaara:**

**Haara `both` — ehto (ei pelaajatekstiä):** A; toinen kunta hyväksyy käsitellyn ehdotuksen

Myös toinen kunta hyväksyy kaavaratkaisunsa. Koko suunniteltu tuotantoalue säilyy. Molempien päätösten muutoksenhaku ja lainvoima tarkistetaan erikseen.

**Haara `exclude_after_wait` — ehto (ei pelaajatekstiä):** A; toinen kunta ei hyväksy; pienempi vaihtoehto yhä mahdollinen

Toinen kunta ei hyväksy tuotantoalueensa kaavaa. Muu hanke voisi jatkaa ilman tätä osaa, mutta rajaus on päätettävä uudelleen.

**Haara `separated` — ehto (ei pelaajatekstiä):** B tai A:n jälkeen hyväksytty poistovahvistus

Jäljelle jäävä hanke on erotettu palautetusta alueesta. Sen kaava- ja lupa-asiakirjat vastaavat nyt pienempää kokonaisuutta.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-Y01`

**Päävaihe:** 4 · **Kontekstit:** Tuuli, Aurinko, Hybridi, Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_municipal` / `result`

**Ehdot:** Kuntakohtainen käsittely valmistunut tai erottelu tarkistettu. Alkuperäinen puolto ei yksin laukaise loppuvoittoa.

**Tuloksen `both` vaikutus:** Merkitse kunta2 adopted; ei automaattisesti final. Alkuperäinen kunta1-status säilyy.

**Tuloksen `both` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `exclude_after_wait` vaikutus:** Tarjoa samaan municipal-caseen sidottu B:n poistovahvistus tai omistajan tietoinen lopetus. Ei uudelleen A-odotusta loputtomasti. Älä lupaa suoraan uutta kaavaa.

**Tuloksen `exclude_after_wait` jatkot:** `LP1-D-Y01`

**Tuloksen `separated` vaikutus:** Päivitä vain erotetun suunnitelman arvioiden revision kattavuus; jatka aidosti tarvittaviin muutoksiin ja lainvoimaan.

**Tuloksen `separated` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** `LP1-D-Y01`

**Kuvitus:** Kaksi päätöstä; näytä erilliset tilat ilman varsinaista kunnan vaakunaa.

**Tausta:** LPA12 LPA13

---

### [LP1-E-H01]

#### PELAAJALLE

**Tapahtuman otsikko:** Aurinkohankkeen valmistelu jatkuu

**Näytetään vain toteutunut tuloshaara:**

**Haara `converted` — ehto (ei pelaajatekstiä):** LP1-H01/A sitovasti käsitelty

Tuulivoimalat eivät enää kuulu hankkeeseen. Aurinkokenttää on jäljellä {solarHa} ha. Aiempiin selvityksiin kuluneet rahat ja aika jäävät hankkeelle; nyt selvitetään, mitä muuttunut suunnitelma vielä tarvitsee.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-H01`

**Päävaihe:** 3 · **Kontekstit:** Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_solar_continuation` / `result`

**Ehdot:** Konversion tapahtumahistoria tallennettu, komponenttisiivous tehty. Tämä ilmoitus ei hyväksy kaavaa eikä YVA:n riittävyyttä.

**Tuloksen `converted` vaikutus:** Näytä yksi olennainen siirtymä. Tilaa solarContinuationReview: ehdotus 2 kk / 8 000 €, maksu kerran. Ei puhtaan uuden aurinkopelin initialStatea. Tarkistuksen valmistuminen julkaisee LP1-E-H02:n.

**Tuloksen `converted` jatkot:** `LP1-E-H02`

**Kytketyt tunnisteet:** `LP1-E-H02`

**Kuvitus:** Aurinkokentän muuttunut kartta; sama fiktiivinen hankenimi säilyy.

**Tausta:** LPA06 LPA13 LPA14

---

### [LP1-E-H02]

#### PELAAJALLE

**Tapahtuman otsikko:** Aurinkohankkeen täydennystarpeet selvisivät

**Näytetään vain toteutunut tuloshaara:**

**Haara `reuse` — ehto (ei pelaajatekstiä):** Tarkistus valmis, aiempi aineisto kattaa muuttuneen aurinkoratkaisun olennaisilta osiltaan

Aiemmat aurinkoalueen selvitykset voidaan käyttää päivitetyn suunnitelman pohjana. Tuuliosaa koskevat kohdat poistetaan asiakirjoista. Aurinkohankkeen oma kaava- ja lupakäsittely jatkuu.

**Haara `supplement` — ehto (ei pelaajatekstiä):** Tarkistus valmis, rajattu lisätyö tarpeen

Nykyisen johtoreitin mitoitus ja vaikutusarvio pitää päivittää aurinkohankkeelle. Rajattu täydennys tilataan; muut käyttökelpoiset selvitykset säilyvät.

**Haara `reduced` — ehto (ei pelaajatekstiä):** Tarkistus valmis; itsenäinen ratkaisu vaatii paneelialaa

Aurinkohankkeen oma sähköasema ja kulkuyhteys vievät tilaa paneelikentältä. Suunnittelija esittää pienempää kenttää, jolla itsenäinen ratkaisu olisi mahdollinen.

**Haara `blocked` — ehto (ei pelaajatekstiä):** Tarkistuksessa ilmenee ennen konversiota avoin aurinko-/yhteinen toteutuseste eikä korvaavaa ratkaisua

Aurinko-osalle ei löydy toimivaa itsenäistä ratkaisua tutkituilla vaihtoehdoilla. Myös tämän jatkohankkeen kehitys päättyy.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-H02`

**Päävaihe:** 3 · **Kontekstit:** Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_solar_continuation` / `result`

**Ehdot:** A-tarjouksen hyväksymisen jälkeen tilattu tarkistus valmis. Aiemmin tuntematon tulos määräytyy sidotuista teknisistä/maankäyttötiedoista, ei pelimuodon vaihtamisen rangaistusarvasta.

**Tuloksen `reuse` vaikutus:** Säilytä vain perustellusti kattavat readiness-evidence-rivit; päivitä asiakirjat/kuulemistarve. Ei suoraa voittoa tai lupaleimaa.

**Tuloksen `reuse` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `supplement` vaikutus:** Tämän haaran yksilöity lisätyö on olemassa olevan sähkönsiirtoreitin päivitetty vaikutus- ja mitoitustarkistus aurinkoratkaisulle: 2 kk / 5 000 €, sama johto ja samat maat. Ei uutta reittisummaa eikä koko YVAa tyhjästä. Kirjaa readiness-evidence; jos aiempi tieto jo kattaa tarkistuksen, tätä haaraa ei tarjota. Muut puutteet käsitellään omissa nykyisissä tapauksissaan.

**Tuloksen `supplement` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Tuloksen `reduced` vaikutus:** Tarjoa LP1-H02 ja sido ehdotetut block/parcelIDt. Vielä ei poistoa.

**Tuloksen `reduced` jatkot:** `LP1-H02`

**Tuloksen `blocked` vaikutus:** Kirjaa uusi todennettu solar/shared-este ja viimeistele loppu. Ei toista konversiota. Ei käytetä jo ennen tarjousta tiedossa olleeseen globaaliin esteeseen.

**Tuloksen `blocked` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** `LP1-H02`

**Kuvitus:** Aurinkokenttä ja sen oma sähköasema. Tarkastetut ja täydennettävät hankeosat.

**Tausta:** LPA06 LPA13 LPA14

---

### [LP1-E-H03]

#### PELAAJALLE

**Tapahtuman otsikko:** Aurinkohanke on luvitettu

**Näytetään vain toteutunut tuloshaara:**

**Haara `rescued_win` — ehto (ei pelaajatekstiä):** Hybridistä jatkunut aurinkohanke täyttää kaikki omat lupa- ja lainvoimaehdot

Tuulivoimaosa jäi pois, mutta aurinkohankkeen tarvittavat luvat on saatu. Jäljellä on {solarHa} hehtaarin aurinkokenttä. Hankkeeseen käytetty aika ja raha ovat mukana loppupisteissä.

#### CODEX / PELILOGIIKKA

**Tunniste:** `LP1-E-H03`

**Päävaihe:** 4 · **Kontekstit:** Hybridi → Aurinko

**Aiheketju / rooli:** `lp1_solar_continuation` / `result`

**Ehdot:** Ei tarjota tavallisena eventtinä: ainoastaan todennettu permitGoalReached aktiiviselle aurinkoprofiilille, ei vain hyväksytty kaava. Tavallinen LOPPU-VOITTO-teksti ei tule päälle toisena voittona.

**Tuloksen `rescued_win` vaikutus:** Ending.kind=win, routeCategory=hybrid_solar. Näytä jatkovoitto erillään alkuperäisen hybriditavoitteen täyttämisestä. Pisteytys 03:n mukaisesti.

**Tuloksen `rescued_win` jatkot:** Ei uutta nimettyä korttia; jatka auki olevia velvoitteita.

**Kytketyt tunnisteet:** Ei uutta nimettyä korttia.

**Kuvitus:** Luvitettu paneelikenttä. Alkuperäinen tuuliosan päättyminen näkyy historiassa, ei uusina voimaloina kuvassa.

**Tausta:** LPA06 LPA13 LPA14

---

## 5. Tekniset vahvistusvalinnat

Nämä näytetään vain edeltävästä selvityksestä. Ne eivät kuluta uutta satunnaista peruskorttipaikkaa; ne lasketaan raportissa jatkopäätöksiksi. Kaikki kustannus- ja kapasiteettivaikutukset kulkevat samoista reducer-/sääntötoiminnoista ja replay-historiasta kuin pyyhkäisykortit.

### [LP1-D-T04]

**Lähde ja ehto:** `LP1-T04` — Mallivertailu valmis ja tutkittu vaihtoehtoinen malli yhteensopiva

#### PELAAJALLE

**Otsikko:** Valitaanko toinen voimalamalli?

**Teksti:** Tutkittu vaihtoehto muuttaa hankkeen yhteistehoa {oldWindMW} → {newWindMW} MW ja kokonaiskorkeutta {oldHeightM} → {newHeightM} m. Uuden mallin vaikutusarviot on päivitettävä.

**A:** Valitaan tutkittu voimalamalli

**A:n jälkeen:** Hankkeen voimalamalli vaihdetaan. Muuttuvat vaikutusarviot ja lausunnot päivitetään.

**B:** Pidetään nykyinen malli ja kiertoreitti

**B:n jälkeen:** Nykyinen voimalamalli säilyy. Kiertoreitin suunnittelu käynnistyy.

#### CODEX / PELILOGIIKKA

A vaatii catalogue compatibility, päivittää named sites kerran; B tilaa bypassDesign vain jos ei jo tehty. Nykyisen mallin uudelleenvalinta ei nollaa kuluhistoriaa. A tilaa mallin muuttamien melu-/välke-/lausuntotietojen päivityksen 2 kk / 7 000 € ja mitätöi vain muutoksen kattamattoman aineiston; B bypassDesign 3 kk / 10 000 €. Nämä kustannukset näkyvät vahvistuksessa. Kuljetuspaikan pituus ei ole liitynnän pituus.

---

### [LP1-D-A04]

**Lähde ja ehto:** `LP1-A04` — DC/AC-vertailu valmis ja suurempi vaihtoehto teknisesti mahdollinen

#### PELAAJALLE

**Otsikko:** Valitaanko suurempi paneelivaihtoehto?

**Teksti:** Paneeliteho olisi {dcHighMWp} MWp, mutta liittymän vientiraja pysyy {solarAcMW} MW:ssa. Vertailu osoittaa lisää käyttökelpoista vuosienergiaa. Lisäpaneelien kustannusarvio kuuluu vaihtoehtoon.

**A:** Valitaan suurempi paneelivaihtoehto

**A:n jälkeen:** Suurempi paneelivaihtoehto valitaan jatkosuunnitteluun. Liittymän vientiraja ei muutu.

**B:** Pidetään pienempi paneelivaihtoehto

**B:n jälkeen:** Jatketaan pienemmällä paneelivaihtoehdolla.

#### CODEX / PELILOGIIKKA

Sama hallittu maa; ei uutta aluetta tai wind/bess-osaa; A päivittää DC-layoutin, ei AC-liittymää; B säilyttää tutkimuskulun. A tilaa valitun DC-layoutin asiakirjapäivityksen 1 kk / 2 000 €; lisälaitteiston tuleva investointi kirjataan kustannusarvioksi, ei jo maksetuksi kehityskuluksi.

---

### [LP1-D-Y01]

**Lähde ja ehto:** `LP1-Y01` — Toinen kunta on hylännyt A-odotuksen jälkeen; pienempi erotettu kokonaisuus yhä mahdollinen

#### PELAAJALLE

**Otsikko:** Jatketaanko ilman toisen kunnan aluetta?

**Teksti:** Toisen kunnan tuotantoaluetta ei saada mukaan. Jäljelle jäävä hanke voidaan käsitellä omana pienempänä kokonaisuutenaan.

**A:** Jatketaan pienemmällä alueella

**A:n jälkeen:** Toisen kunnan alue jätetään pois. Jäljelle jäävän suunnitelman asiakirjat päivitetään.

**B:** Lopetetaan hankkeen kehitys

**B:n jälkeen:** Omistaja päättää lopettaa hankkeen kehityksen.

#### CODEX / PELILOGIIKKA

A sama vaikutus kuin LP1-Y01/B vain kerran; B owner ending syyhistoria säilyy. Ei uudelleen 4kk odotusta.

---
