# KAAVA VAI KAAOS — SISÄLLÖN TARKISTUSDOKUMENTTI

**Versio 5 · 8.9.2026 · käsikirjoitus, ei vielä integroitu peliin**

Pohjana on tähän keskusteluun liittämäsi muokattu v4-tiedosto. Sen suorat muutokset ja kaikki 16 muutosmerkintää on käsitelty. Samalla muiden korttien tilanteita, valintoja ja vastauksia on kirjoitettu uudelleen niiden osoittamaan suuntaan. Poistettaviksi pyydetyt viisi korttia eivät ole tässä sisältöpankissa.

## Näin muokkaat

Muokkaa otsikoita, korttitekstejä, valintoja ja vastauksia suoraan. Säilytä mukaan jäävän kortin tai tapahtuman tunniste. Voit poistaa kokonaisen osion tai kirjoittaa sen alle uuden muutostoiveen. Tallenna oma versiosi uudella nimellä ja palauta se liitteenä.

**PELAAJALLE**-osiossa pelissä näkyviä ovat nimettyjen tekstikenttien sisällöt. Kenttien nimet, A/B-tunnukset ja haarojen ehdot, kuten ”jos maanomistajat hyväksyvät”, ovat käsikirjoituksen lukuohjeita — niitä ei näytetä sellaisinaan pelaajalle. Pelaaja näkee valintansa jälkeen vain toteutuneen vastauksen. **CODEX / PELILOGIIKKA** sisältää ehdot, seurausten kytkennät ja lähdekoodit; se ei ole pelitekstiä.

**Kortin otsikko** on pelaajalle näkyvä otsikko. **Pyyhkäisyteksti** on pelaajan valinta; A ja B eivät tarkoita pysyvästi vasenta ja oikeaa. **Valinnan jälkeen näytetään** on välitön vastaus. Myöhemmin valmistuva selvitys tai uusi käänne näkyy erillisenä, nimettynä tapahtumana.

Muuttujat kuten `{count}`, `{species}` ja `{cost}` korvataan pelissä kyseisen hankkeen tiedoilla. Samassa ketjussa määrä, laji ja paikat pysyvät samoina. Kiinteätkin hinnat, ajat ja määrät ovat tämän käsikirjoituksen fiktiivisiä tilanteita, eivät alan hinnastoja tai oikeudellisia yleissääntöjä.

Tässä on **159 päätöskorttia tai varianttia ja 89 tapahtuma-, tulos- tai lopputekstiä**. Ne muodostavat sisältöpankin, eivät yhden pelikerran pakkaa. Saman ongelman vaihtoehtoisista versioista valitaan yksi; jatkotapahtuma tulee vain sitä edeltävän valinnan tai selvityksen perusteella.

| Vaihe | Päätöskortit / variantit | Tapahtumat / lopputekstit |
|---|---:|---:|
| 1. Maanvuokraus | 20 | 9 |
| 2. Kaava-aloite ja YVA-ohjelma | 33 | 16 |
| 3. YVA-selostus ja kaavaluonnos | 67 | 28 |
| 4. Kaavaehdotus ja kaavan hyväksyntä | 39 | 36 |

Läpimeno tarkoittaa tarvittavien lupien saamista ja käsikirjoituksessa edellytettyä lainvoimaa. Kaavan hyväksyminen, lainvoima ja muut luvat erotetaan toisistaan. Toteutus, investointipäätös ja reservimarkkinakäyttö eivät valmistu samalla ilmoituksella.

Lähdekoodit avautuvat tiedostossa `KAAVA_VAI_KAAOS_v5_LAHTEET.md`. Suorien muutosten, poistojen ja uusien seurausketjujen yhteenveto on tiedostossa `KAAVA_VAI_KAAOS_v5_MUUTOSSELOSTE.md`. Päädokumentin lukeminen tai muokkaaminen ei vaadi liitteiden läpikäyntiä.

---

## VAIHE 1: Maanvuokraus

Kortit ja tapahtumat on koottu tähän pääasiallisen esiintymisvaiheen mukaan. Nimetty jatko voi palata aiempaan päätökseen; tarkka ajoitus määräytyy kunkin osion ehdoista.

**Vaiheen aloitus**

### [start]

#### PELAAJALLE

**Tapahtuman otsikko:** Uusi hanke

**Tapahtumateksti:** Tehtäväsi on kehittää energiantuotantohanke luvitetuksi. Ensin tarvitset riittävät maa-alueet. Sen jälkeen edessä ovat kaavoitus, ympäristöselvitykset ja tarvittavat luvat.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `start`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Pelikerran ensimmäinen näkymä ennen ensimmäistä päätöstä.

**Tausta:** L01

---

**Päätöskortit ja niiden variantit**

### [land]

#### PELAAJALLE

**Kortin otsikko:** Kovia vaatimuksia

**Korttiteksti:** Kaksi viimeistä maanomistajaa pyytää muita parempia vuokraehtoja. Kiinteistöille suunnitellaan rakentamista. Naapurin sopimus ei ole julkinen, mutta ovatko maanomistajat tietoisia toistensa sopimuksista?

##### Valinta A

**Pyyhkäisyteksti:** Suostutaan sopimusmuutoksiin

**Valinnan jälkeen näytetään:** Sopimukset syntyvät. Myöhempi tasapuolisuuskeskustelu jää mahdolliseksi.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään yhteiset ehdot

**Valinnan jälkeen näytetään yksi näistä:**

**Haara — maanomistajat hyväksyvät yhteiset ehdot:**
Viimeinen neuvottelu tuottaa tuloksen. Molemmat hyväksyvät samat ehdot kuin muutkin.

**Haara — maanomistajat kieltäytyvät – palstat tarvitaan tuulivoimaloiden sijoitteluun:**
Nimiä ei tule. Voimalamäärä mahtuu vielä muiden palstoille, mutta sijoittelu tiivistyy. Myöhempiin melu- ja luontoväistöihin jää vähemmän tilaa.

**Haara — maanomistajat kieltäytyvät – palstoilla on hybridihankkeen aurinkoaluetta:**
Nimiä ei tule. Näille kiinteistöille suunniteltu aurinkoalue rajataan pois.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokraus. Kaksi rakentamiseen tarvittavaa kiinteistöä on vielä ilman sopimusta. Tuulipaikoille on alustavasti tilaa muualla; aurinkolohkon voi rajata pois. Valitse vain yksi tämän vuokraneuvottelun neljästä versiosta.

**Vaihtoehtoinen aiheketju:** `vuokraehdot` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa poikkeusehtojen kustannus ja osapuolet. Käynnistä P3-SOPIMUS vasta, kun muiden maanomistajien on todettu saaneen tiedon ehdoista.

**Valinta B — vaikutus:** Omistajien vastaus määräytyy ennalta. Kielteisessä haarassa muuta vain kyseisten kiinteistöjen käytettävyyttä; tuulipaikat eivät vielä vähene, mutta siirtovara voi pienentyä.

**Myöhempi tapahtuma / jatko:** A → contract-callback → P3-SOPIMUS. B:n kielteinen tuulihaara vaikuttaa myöhempään melu- tai luontosiirtoon; aurinkohaara vähentää vain kyseistä paneelilohkoa.

**Kytketyt tunnisteet:** `contract-callback`, `P3-SOPIMUS`

**Toteutuksen rajaus:** Maanomistajan suostumus, kartalle merkitty paikka ja rakentamislupa ovat eri asioita. Älä peri kustannusta tai poista samaa aluetta uudestaan jatkokortissa.

**Tausta:** L10 L01

---

### [road]

#### PELAAJALLE

**Kortin otsikko:** Väärä karttaliite

**Korttiteksti:** Maanomistaja huomaa allekirjoitetun sopimuksen kartassa vanhan kiinteistörajan. Suunniteltu voimala mahtuu oikeallekin alueelle. Sama karttapohja on ollut käytössä muissakin sopimuksissa.

##### Valinta A

**Pyyhkäisyteksti:** Korjataan tämän sopimuksen liite

**Valinnan jälkeen näytetään:** Osapuolet hyväksyvät korjatun kartan. Voimalapaikka säilyy.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan samalla muut sopimuskartat

**Valinnan jälkeen näytetään:** Kartat verrataan nykyisiin kiinteistörajoihin. Löytyneet versioerot korjataan ennen seuraavia sopimuksia.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `road`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokraus: väärä kiinteistöraja on havaittu sopimuksen karttaliitteessä. Oikea rakentamisalue mahtuu vuokrattavalle kiinteistölle.

**Valinta A — vaikutus:** Korjaa yksi sopimuskartta.

**Valinta B — vaikutus:** Korjaa yhteisen karttapohjan tunnetut virheet yhdellä tarkistuksella.

**Myöhempi tapahtuma / jatko:** Ei erillistä arvottua tappiota. Laajempi tarkistus maksaa työaikaa; suppea korjaus ei tarkoita muiden tunnettujen virheiden hyväksymistä.

**Tausta:** L10 L01

---

### [land-signing]

#### PELAAJALLE

**Kortin otsikko:** Allekirjoituksesta lisähinta

**Korttiteksti:** Kaksi viimeistä maanomistajaa pyytää vuokran lisäksi allekirjoituskorvausta. Muut ovat jo allekirjoittaneet ilman sitä. Näille kahdelle kiinteistölle on suunniteltu rakentamista.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan erillinen kertakorvaus

**Valinnan jälkeen näytetään:** Kertakorvaus sovitaan ja molemmat allekirjoittavat. Muut maanomistajat eivät vielä tiedä lisäkorvauksesta.

##### Valinta B

**Pyyhkäisyteksti:** Tarjotaan sama sopimus kuin muille

**Valinnan jälkeen näytetään yksi näistä:**

**Haara — maanomistajat hyväksyvät yhteiset ehdot:**
Viimeinen neuvottelu tuottaa tuloksen. Molemmat hyväksyvät samat ehdot kuin muutkin.

**Haara — maanomistajat kieltäytyvät – palstat tarvitaan tuulivoimaloiden sijoitteluun:**
Nimiä ei tule. Voimalamäärä mahtuu vielä muiden palstoille, mutta sijoittelu tiivistyy. Myöhempiin melu- ja luontoväistöihin jää vähemmän tilaa.

**Haara — maanomistajat kieltäytyvät – palstoilla on hybridihankkeen aurinkoaluetta:**
Nimiä ei tule. Näille kiinteistöille suunniteltu aurinkoalue rajataan pois.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-signing`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokraus. Kaksi rakentamiseen tarvittavaa kiinteistöä on vielä ilman sopimusta. Tuulipaikoille on alustavasti tilaa muualla; aurinkolohkon voi rajata pois. Valitse vain yksi tämän vuokraneuvottelun neljästä versiosta.

**Vaihtoehtoinen aiheketju:** `vuokraehdot` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa poikkeusehtojen kustannus ja osapuolet. Käynnistä P3-SOPIMUS vasta, kun muiden maanomistajien on todettu saaneen tiedon ehdoista.

**Valinta B — vaikutus:** Omistajien vastaus määräytyy ennalta. Kielteisessä haarassa muuta vain kyseisten kiinteistöjen käytettävyyttä; tuulipaikat eivät vielä vähene, mutta siirtovara voi pienentyä.

**Myöhempi tapahtuma / jatko:** A → contract-callback → P3-SOPIMUS. B:n kielteinen tuulihaara vaikuttaa myöhempään melu- tai luontosiirtoon; aurinkohaara vähentää vain kyseistä paneelilohkoa.

**Kytketyt tunnisteet:** `contract-callback`, `P3-SOPIMUS`

**Toteutuksen rajaus:** Maanomistajan suostumus, kartalle merkitty paikka ja rakentamislupa ovat eri asioita. Älä peri kustannusta tai poista samaa aluetta uudestaan jatkokortissa.

**Tausta:** L10 L01

---

### [land-index]

#### PELAAJALLE

**Kortin otsikko:** Inflaatio on kaikille sama. Indeksi ei olisi.

**Korttiteksti:** Kaksi omistajaa vaatii muita parempaa vuokran vuosikorotusta. Kiinteistöille suunnitellaan rakentamista. Tarjotaanko perusteltu poikkeus vai pidetäänkö yhteinen indeksi?

##### Valinta A

**Pyyhkäisyteksti:** Hyväksytään perusteltu indeksipoikkeus

**Valinnan jälkeen näytetään:** Korotusehto sovitaan ja molemmat allekirjoittavat. Näiden kiinteistöjen vuokrat nousevat jatkossa muita nopeammin.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään yhteinen indeksiehto

**Valinnan jälkeen näytetään yksi näistä:**

**Haara — maanomistajat hyväksyvät yhteiset ehdot:**
Viimeinen neuvottelu tuottaa tuloksen. Molemmat hyväksyvät samat ehdot kuin muutkin.

**Haara — maanomistajat kieltäytyvät – palstat tarvitaan tuulivoimaloiden sijoitteluun:**
Nimiä ei tule. Voimalamäärä mahtuu vielä muiden palstoille, mutta sijoittelu tiivistyy. Myöhempiin melu- ja luontoväistöihin jää vähemmän tilaa.

**Haara — maanomistajat kieltäytyvät – palstoilla on hybridihankkeen aurinkoaluetta:**
Nimiä ei tule. Näille kiinteistöille suunniteltu aurinkoalue rajataan pois.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-index`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokraus. Kaksi rakentamiseen tarvittavaa kiinteistöä on vielä ilman sopimusta. Tuulipaikoille on alustavasti tilaa muualla; aurinkolohkon voi rajata pois. Valitse vain yksi tämän vuokraneuvottelun neljästä versiosta.

**Vaihtoehtoinen aiheketju:** `vuokraehdot` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa poikkeusehtojen kustannus ja osapuolet. Käynnistä P3-SOPIMUS vasta, kun muiden maanomistajien on todettu saaneen tiedon ehdoista.

**Valinta B — vaikutus:** Omistajien vastaus määräytyy ennalta. Kielteisessä haarassa muuta vain kyseisten kiinteistöjen käytettävyyttä; tuulipaikat eivät vielä vähene, mutta siirtovara voi pienentyä.

**Myöhempi tapahtuma / jatko:** A → contract-callback → P3-SOPIMUS. B:n kielteinen tuulihaara vaikuttaa myöhempään melu- tai luontosiirtoon; aurinkohaara vähentää vain kyseistä paneelilohkoa.

**Kytketyt tunnisteet:** `contract-callback`, `P3-SOPIMUS`

**Toteutuksen rajaus:** Maanomistajan suostumus, kartalle merkitty paikka ja rakentamislupa ovat eri asioita. Älä peri kustannusta tai poista samaa aluetta uudestaan jatkokortissa.

**Tausta:** L10 L01

---

### [land-minimum]

#### PELAAJALLE

**Kortin otsikko:** Heikollakin tuulella on kuukausimaksu.

**Korttiteksti:** Viimeiset omistajat pyytävät muita korkeampaa vähimmäisvuokraa. Yhtiö maksaisi sen myös heikkona tuotantovuonna. Allekirjoitus auttaisi maanhallintaa.

##### Valinta A

**Pyyhkäisyteksti:** Korotetaan vähimmäisvuokraa

**Valinnan jälkeen näytetään:** Sopimukset syntyvät. Myöhempi tasapuolisuuskeskustelu jää mahdolliseksi.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään samat vuokraehdot

**Valinnan jälkeen näytetään yksi näistä:**

**Haara — maanomistajat hyväksyvät yhteiset ehdot:**
Viimeinen neuvottelu tuottaa tuloksen. Molemmat hyväksyvät samat ehdot kuin muutkin.

**Haara — maanomistajat kieltäytyvät – palstat tarvitaan tuulivoimaloiden sijoitteluun:**
Nimiä ei tule. Voimalamäärä mahtuu vielä muiden palstoille, mutta sijoittelu tiivistyy. Myöhempiin melu- ja luontoväistöihin jää vähemmän tilaa.

**Haara — maanomistajat kieltäytyvät – palstoilla on hybridihankkeen aurinkoaluetta:**
Nimiä ei tule. Näille kiinteistöille suunniteltu aurinkoalue rajataan pois.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-minimum`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokraus. Kaksi rakentamiseen tarvittavaa kiinteistöä on vielä ilman sopimusta. Tuulipaikoille on alustavasti tilaa muualla; aurinkolohkon voi rajata pois. Valitse vain yksi tämän vuokraneuvottelun neljästä versiosta.

**Vaihtoehtoinen aiheketju:** `vuokraehdot` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa poikkeusehtojen kustannus ja osapuolet. Käynnistä P3-SOPIMUS vasta, kun muiden maanomistajien on todettu saaneen tiedon ehdoista.

**Valinta B — vaikutus:** Omistajien vastaus määräytyy ennalta. Kielteisessä haarassa muuta vain kyseisten kiinteistöjen käytettävyyttä; tuulipaikat eivät vielä vähene, mutta siirtovara voi pienentyä.

**Myöhempi tapahtuma / jatko:** A → contract-callback → P3-SOPIMUS. B:n kielteinen tuulihaara vaikuttaa myöhempään melu- tai luontosiirtoon; aurinkohaara vähentää vain kyseistä paneelilohkoa.

**Kytketyt tunnisteet:** `contract-callback`, `P3-SOPIMUS`

**Toteutuksen rajaus:** Maanomistajan suostumus, kartalle merkitty paikka ja rakentamislupa ovat eri asioita. Älä peri kustannusta tai poista samaa aluetta uudestaan jatkokortissa.

**Tausta:** L10 L01

---

### [land-map-versions]

#### PELAAJALLE

**Kortin otsikko:** Allekirjoitus tuli. Sopimus ei.

**Korttiteksti:** Maanomistaja palauttaa vuokrasopimuksesta vain allekirjoitetun etusivun. Sopimusehdot ja karttaliite puuttuvat. Puhelimeen hän ei enää vastaa.

##### Valinta A

**Pyyhkäisyteksti:** Lähetetään koko sopimus uudelleen

**Valinnan jälkeen näytetään:** Lähetät koko sopimuksen liitteineen ja pyydät vahvistamaan sen sisällön. Muita maanomistajia tavoitellaan sillä aikaa.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan toistaiseksi ilman kiinteistöä

**Valinnan jälkeen näytetään:** Kiinteistö jätetään pois tämänhetkisestä sijoittelusta. Sovittujen alueiden suunnittelu jatkuu, mutta yhden voimalapaikan sijoitus täytyy tarkistaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-map-versions`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Allekirjoitettu etusivu ei yksilöi varmasti hyväksyttyjä ehtoja tai karttaliitettä. Kiinteistöä ei ole vielä laskettu sopimuksella varmistetuksi.

**Valinta A — vaikutus:** Avaa sopimuksen täydennyspyyntö. Älä jäädytä koko hanketta. Tulos EV-SOPIMUSSIVUT samassa tai seuraavassa vaiheessa.

**Valinta B — vaikutus:** Merkitse tämä kiinteistö sivuun jätetyksi. Älä poista voimalapaikkaa ennen siirtotilan tarkistusta.

**Myöhempi tapahtuma / jatko:** A → EV-SOPIMUSSIVUT. B → EV-MAA valitun kiinteistön korvaavaa sijoittelua koskevana haarana.

**Kytketyt tunnisteet:** `EV-SOPIMUSSIVUT`, `EV-MAA`

**Toteutuksen rajaus:** Vain etusivun palauttaminen ei ole yleinen todistus sopimuksen mitättömyydestä. Tässä tilanteessa hyväksytyn kokonaisuuden sisältö on aidosti epäselvä. Älä keksi vaatimusta jokaisen sivun erillisestä allekirjoituksesta.

**Tausta:** L10 V5-L1

---

### [land-area-explained]

#### PELAAJALLE

**Kortin otsikko:** Missä minun voimalani on?

**Korttiteksti:** Maanomistaja näkee uuden sijoittelukartan. Hänen kiinteistölleen ei tulekaan voimalaa. Hän kertoo allekirjoittaneensa, koska luuli sopimuksen takaavan oman voimalan, ja vaatii sopimuksen purkamista.

##### Valinta A

**Pyyhkäisyteksti:** Käydään sopimus ja käydyt neuvottelut läpi

**Valinnan jälkeen näytetään:** Käyt maanomistajan kanssa läpi, mitä sijoittelusta on sovittu ja millä perusteella vuokraa maksetaan. Hän lupaa harkita kantaansa.

##### Valinta B

**Pyyhkäisyteksti:** Neuvotellaan sopimuksen päättämisestä

**Valinnan jälkeen näytetään:** Aloitat neuvottelun sopimuksen päättämisestä yhteisellä sopimuksella. Suunnittelija selvittää samalla, mitä kiinteistön menettäminen muuttaisi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-area-explained`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Vuokrasopimus on allekirjoitettu. Kiinteistön alueelle ei uusimmassa vaihtoehdossa sijoitu voimalaa, mutta aluetta tarvitaan suunnittelujoustoon tai muihin sopimuksessa sallittuihin rakenteisiin.

**Valinta A — vaikutus:** Selvitä myös, onko edustaja tosiasiassa luvannut voimalapaikan. Älä oleta maanomistajan tulkintaa vääräksi tai sopimusta yksipuolisesti purettavaksi.

**Valinta B — vaikutus:** Kiinteistö poistuu vasta, kun päättämisestä sovitaan tai siihen on todettu oikeudellinen peruste. Arvioi korvaavat alueet ensin.

**Myöhempi tapahtuma / jatko:** EV-VOIMALALUPAUS näyttää keskustelun tai päättämisneuvottelun tuloksen. Mahdollinen siirtovaran menetys vaikuttaa myöhempään sijoitteluun.

**Kytketyt tunnisteet:** `EV-VOIMALALUPAUS`

**Tausta:** L10 V5-L1

---

### [UUSI-P1-MAARIITA]

#### PELAAJALLE

**Kortin otsikko:** Sopimuksesta ei päästä sopuun

**Korttiteksti:** Maanomistajan vaatimus sopimuksen päättämisestä on yhä ratkaisematta. Juristi suosittelee neuvottelemaan sovinnon ennen rakentamista. Sijoittelua voisi muuttaa myös ilman tätä kiinteistöä.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan päättäminen ja suunnitellaan uudelleen

**Valinnan jälkeen näytetään:** Osapuolet sopivat vuokrasopimuksen päättämisestä. Riita päättyy ja suunnittelija siirtää rakentamisen pois kiinteistöltä.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan juristin kanssa neuvottelua

**Valinnan jälkeen näytetään:** Sopimuksesta ei luovuta. Juristi jatkaa sovintoneuvottelua ja selvittää yhtiön vaihtoehdot; muut alueet etenevät samalla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-MAARIITA`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI JATKOKORTTI

**Ehto / sijoitus:** Vain EV-VOIMALALUPAUS:n avoimen riidan tai ristiriitaisen lupauksen jälkeen; vaihtoehtoinen sijoittelu on tutkittu mahdolliseksi. Sopimuksen oikeudellista sitovuutta ei oleteta samaksi eri taustoissa.

**Valinta A — vaikutus:** Poista sovitun kiinteistön käyttö, kirjaa korvaavan sijoittelun työ ja mahdollinen laajuusmuutos.

**Valinta B — vaikutus:** Siirrä riitaisen alueen toteutus myöhemmäksi. Avaa EV-MAARIITA kerran; älä pyöritä loputonta neuvottelusilmukkaa.

**Myöhempi tapahtuma / jatko:** B → EV-MAARIITA. A jatkaa muutetulla sijoittelulla.

**Kytketyt tunnisteet:** `EV-MAARIITA`

**Tausta:** L10 V5-L1

---

### [land-meetings]

#### PELAAJALLE

**Kortin otsikko:** Kaikkia ei saa samaan iltaan

**Korttiteksti:** Maanomistajat haluavat kuulla hankkeen seuraavista vaiheista. Yhteiseen iltaan sopiva aika löytyy vasta kuukauden päähän. Puhelimella heidät saisi tavoitettua jo tällä viikolla.

##### Valinta A

**Pyyhkäisyteksti:** Pidetään yhteinen maanomistajailta

**Valinnan jälkeen näytetään:** Tilaisuus varataan kuukauden päähän. Sopimusneuvottelut jatkuvat sillä aikaa niiden kanssa, jotka ovat valmiita etenemään.

##### Valinta B

**Pyyhkäisyteksti:** Käydään asiat läpi puhelimitse

**Valinnan jälkeen näytetään:** Soittokierros vie useamman työpäivän. Maanomistajien kysymykset selviävät ennen seuraavaa suunnittelupalaveria.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `land-meetings`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Useita maanomistajia on mukana neuvotteluissa ja seuraavista vaiheista tulee toistuvia kysymyksiä. Ei tarjota samasta neuvottelusta useita lähes samanlaisia tiedotuskortteja.

**Myöhempi tapahtuma / jatko:** Neutraali käytännön valinta. Yhteinen ilta ei lisää koko hankkeen kalenteriin kuukautta, jos muut työt etenevät rinnalla.

**Tausta:** L10 L01

---

### [UUSI-P1-01]

#### PELAAJALLE

**Kortin otsikko:** Yksi vastaus kuudelta omistajalta

**Korttiteksti:** Yhteisomistetun tilan yhteyshenkilö ilmoittaa, että kaikki kuusi omistajaa ovat mukana. Vuokrasopimukseen hän tarjoaa vain omaa allekirjoitustaan. Valtakirjoja ei ole.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään allekirjoitukset tai valtakirjat

**Valinnan jälkeen näytetään:** Lähetät sopimuksen muille omistajille ja selvität yhteyshenkilön valtuudet. Tilaa ei vielä lasketa vuokratuksi.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan muiden kiinteistöjen kanssa

**Valinnan jälkeen näytetään:** Tämä tila jää odottamaan omistajien yhteistä vastausta. Muu alue etenee, mutta tilalle suunniteltua rakentamista ei vielä vahvisteta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-01`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Rakentamiseen tarvittava kiinteistö on yhteisomistuksessa. Yhteyshenkilön valtuutusta muiden omistajien puolesta ei ole varmistettu.

**Myöhempi tapahtuma / jatko:** EV-MAA kokoaa kyseisen yhteisomistustilan sopimusvastauksen. Vastaus voi olla myönteinen tai kielteinen; ratkaisu ei koske muita kiinteistöjä.

**Kytketyt tunnisteet:** `EV-MAA`

**Tausta:** L10 V5-L1

---

### [UUSI-P1-03]

#### PELAAJALLE

**Kortin otsikko:** Kuinka kauan odotetaan?

**Korttiteksti:** Maanomistajat hyväksyvät hankekehitykselle viiden vuoden määräajan. Sen jälkeen sopimuksia pitää jatkaa erikseen, ellei rakentaminen ole alkanut. Seitsemän vuoden määräajan saisi korkeammalla korvauksella.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan seitsemän vuoden valmisteluaika

**Valinnan jälkeen näytetään:** Pidempi määräaika kirjataan sopimuksiin. Korvaus kasvaa, mutta luvitukselle jää kaksi lisävuotta.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään viiden vuoden määräaika

**Valinnan jälkeen näytetään:** Sopimukset tehdään edullisemmilla ehdoilla. Jos valmistelu venyy yli viiden vuoden, tarvitset maanomistajilta jatkosopimukset.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-03`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Maanvuokrauksen ehtoja sovitaan. Kortti määrittää rakentamisen aloittamista tai hankekehitysvaihetta koskevan määräajan, ei tuulipuiston koko käyttöajan vuokraa.

**Valinta A — vaikutus:** developmentDeadline=84 kk alusta. Sovi pidemmän ajan kustannus. Määräaika näkyy aikataulunäkymässä.

**Valinta B — vaikutus:** developmentDeadline=60 kk alusta. Edullisemmat sopimusehdot. Sama deadline koskee vain tässä neuvoteltuja, jatkon kannalta keskeisiä sopimuksia.

**Myöhempi tapahtuma / jatko:** Vähintään 24 kk valinnoista johtuvaa toteutunutta lisäviivettä + riippuvuus viivästyneestä maakuntakaavasta voi johtaa ketjuun EV-MAAKUNTAODOTUS → UUSI-P4-VUOKRAJATKO → EV-OPTIO. Pelkkä tämän B:n valinta ei tapa hanketta.

**Kytketyt tunnisteet:** `EV-MAAKUNTAODOTUS`, `UUSI-P4-VUOKRAJATKO`, `EV-OPTIO`

**Toteutuksen rajaus:** 60/84 kk ja 24 kk ovat fiktiivisiä peliasetuksia, eivät lain määräaikoja. Laske todellinen kriittisen polun viive: rinnakkaiset työt eivät kerrytä samoja kuukausia moneen kertaan. Anna määräajasta ennakkovaroitus. Luvitus on tämän pelin maali: määräaikaketju pysäytetään heti, jos luvitusvoitto on jo saavutettu, vaikka todellinen rakentamisen aloitus kuuluisi vasta toteutusvaiheeseen.

**Tausta:** L10 L01 V5-L1

---

### [UUSI-P1-04]

#### PELAAJALLE

**Kortin otsikko:** Yhteinen johto, pienempi lasku

**Korttiteksti:** Naapurihanke ehdottaa yhteistä johtoliityntää. Sama voimajohto voisi palvella molempia ja säästää huomattavasti rahaa. Kustannusten jako näyttää jo hyvältä; verkkoyhtiön kantaa ei ole vielä kysytty.

##### Valinta A

**Pyyhkäisyteksti:** Lähdetään suunnittelemaan yhteisliityntää

**Valinnan jälkeen näytetään:** Sovit naapurihankkeen kanssa yhteisen esiselvityksen. Oman erillisen johtoreitin jatkosuunnittelu jää odottamaan tulosta.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan omalla johtoliitynnällä

**Valinnan jälkeen näytetään:** Omaa reittiä suunnitellaan eteenpäin. Yhteisjohdon mahdollinen kustannussäästö jää käyttämättä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-04`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kaksi eri hanketta ja yhteisliitynnän todellinen esiselvitys. Naapurihanke ei ole sama kuin oma BESS-hankeosa. Mahdollinen johto-osuuden jakaminen ei ole valmiiksi hyväksytty ratkaisu.

**Valinta A — vaikutus:** Käynnistä sharedConnectionStudy. Tässä kirjoitetussa skenaariossa selvitys osoittaa esitetyn yhteisliitynnän toteuttamiskelvottomaksi. Menetetään suunnittelukulu ja vain toteutunut kriittisen polun aika.

**Valinta B — vaikutus:** Jatka omaa reittiä; ei tämän yhteisliityntätarinan epäonnistumisviivettä.

**Myöhempi tapahtuma / jatko:** A → EV-YHTEISASEMA: yhteisen johtoliitynnän torjuva tulos → UUSI-P2-04 oman ja varaliitynnän arvioon.

**Kytketyt tunnisteet:** `EV-YHTEISASEMA`, `UUSI-P2-04`

**Toteutuksen rajaus:** Säilytetty vanha ID yhdistämistä varten. Kirjoitettu epäonnistuminen koskee tätä teknistä ehdotusta, ei väitettä kaikkien yhteisten liittymisjohtojen mahdottomuudesta tai niiden tilastollisesta harvinaisuudesta.

**Tausta:** B01 B02

---

### [UUSI-P1-05]

#### PELAAJALLE

**Kortin otsikko:** Tämä maa onkin jo vuokrattu

**Korttiteksti:** Keskeisen kiinteistön vuokraoikeutta kirjattaessa selviää, että samalle alueelle on aiemmin kirjattu toisen hankkeen vuokraoikeus. Oman hankkeen sopimukselle ei saada tavoiteltua etusijaa. Maanomistaja piti hankkeita eri asioina.

##### Valinta A

**Pyyhkäisyteksti:** Neuvotellaan aiemman vuokralaisen kanssa

**Valinnan jälkeen näytetään:** Pyydät aiemman sopimuksen tiedot ja ehdotat vuokra-alueiden tai etusijan järjestämistä. Voimalapaikkaa ei vielä lukita tälle kiinteistölle.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään sijoittelu ilman kiinteistöä

**Valinnan jälkeen näytetään:** Suunnittelija etsii korvaavat paikat ja tieyhteydet. Jos niitä ei löydy, hankkeen kokoa on pienennettävä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-05`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Aiempi kirjattu käyttö on ristiriidassa juuri tarvittavan rakennusalueen kanssa. Etusijan parantaminen on hankkeen sopimus-/rahoitusvaatimus, ei jokaisen vuokran automaattinen lakiehto.

**Valinta A — vaikutus:** Varmista aiempi vuokra-alue, käyttö ja etusija. Muutos edellyttää asianosaisten suostumuksia; omistajan uusi allekirjoitus ei syrjäytä aiempaa oikeutta.

**Valinta B — vaikutus:** Arvioi nimettyjen paikkojen ja reittien korvaaminen. Älä hävitä koko hanketta yhden rekisterimerkinnän vuoksi.

**Myöhempi tapahtuma / jatko:** A → EV-ETUSIJA. B → EV-MAA:n korvaavan sijoittelun haara. Olennaisen kiinteistön puuttuminen voi johtaa LOPPU-LAAJUUS-tilaan vasta, kun korvaavat alueet eivät riitä.

**Kytketyt tunnisteet:** `EV-ETUSIJA`, `EV-MAA`, `LOPPU-LAAJUUS`

**Tausta:** L10 V5-L2

---

### [UUSI-P1-06]

#### PELAAJALLE

**Kortin otsikko:** Märkä palsta kaupan

**Korttiteksti:** Hankealueen alapuolelta tarjotaan edullista, vettynyttä palstaa ostettavaksi. Sille ei ole suunniteltu voimalaa eikä paneeleita. Maanomistajalle palsta on tarpeeton.

##### Valinta A

**Pyyhkäisyteksti:** Ostetaan palsta varalle

**Valinnan jälkeen näytetään:** Kaupat tehdään. Hankkeelle tuli lisää maata, jolle ei tällä hetkellä ole käyttöä.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään palsta ostamatta

**Valinnan jälkeen näytetään:** Et osta palstaa. Voimalapaikat, paneelialueet ja nykyinen suunnitelma pysyvät ennallaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-06`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Palsta on vapaaehtoinen lisähankinta, ei nykyisen rakentamisen edellytys. Sijainti mahdollistaa myöhemmin veden viivytyksen ennen nykyistä viitasammakon lisääntymispaikkaa.

**Valinta A — vaikutus:** wetlandReserveOwned=true; kirjaa vain kauppahinta. Tälle ostokselle ei arvota uutta pakollista maanrakennus-, kuivatus- tai luontohaittaa.

**Valinta B — vaikutus:** wetlandReserveOwned=false; ei negatiivista muutosta perussuunnitelmaan eikä lisärangaistusta myöhemmin pelkän ostamatta jättämisen vuoksi.

**Myöhempi tapahtuma / jatko:** Vain ostoksen jälkeen ja sopivan vesitalousongelman yhteydessä UUSI-P3-KOSTEIKKO avaa myönteisen lisäratkaisun. Ilman ostosta sama itsenäisesti syntynyt luontoasia ratkaistaan tavanomaisella kentän rajauksella.

**Kytketyt tunnisteet:** `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Palstan ostaminen ei anna lupaa heikentää viitasammakon lisääntymispaikkaa. Hyöty toteutetaan nykyisen paikan vesitalouden turvaamisena ja mahdollisena lisäelinympäristönä, ei vapaasti ostettavana Natura-/lajikompensaationa.

**Tausta:** L04 L07 V5-L3 V5-L4

---

### [UUSI-P1-07]

#### PELAAJALLE

**Kortin otsikko:** Tie ei ole vielä sovittu

**Korttiteksti:** Suunnitellulle rakennusalueelle johtaa yksityistie. Tien käyttö hankkeen kuljetuksiin ja mahdollinen leventäminen ovat vielä sopimatta. Vaihtoehtoinen sisääntulo kiertäisi kauempaa.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään nykyisen tien käyttö ja parantaminen

**Valinnan jälkeen näytetään:** Tieasiantuntija selvittää tarvittavat käyttöjärjestelyt ja parannukset. Neuvottelut tien osakkaiden ja maanomistajien kanssa aloitetaan.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan vaihtoehtoinen sisääntulo

**Valinnan jälkeen näytetään:** Pidempi reitti otetaan tarkasteluun. Sen maanomistajilta pyydetään suostumukset ja maastokohdat tutkitaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-07`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Suunniteltu raskaan hankeliikenteen sisääntulo käyttää olemassa olevaa tietä. Tien käyttöoikeus tai soveltuvuus ei ole vielä selvillä.

**Myöhempi tapahtuma / jatko:** Valitun reitin valmistuttua kirjaa sovitut alueet ja kustannus. Jos sopimusta ei synny, toinen reitti säilyy mahdollisena mutta sen selvitys vie lisäaikaa.

**Kytketyt tunnisteet:** `EV-MAA`

**Tausta:** L10 L01

---

### [UUSI-P1-08]

#### PELAAJALLE

**Kortin otsikko:** Maata saa vuokrata. Voimalaa ei saa rakentaa.

**Korttiteksti:** Kaksi maanomistajaa tarjoaa kiinteistöjään hankkeelle, mutta kieltää voimaloiden rakentamisen. Tie ja kaapeli sopisivat erikseen sovittaville kohdille. Se voisi helpottaa muiden voimalapaikkojen suunnittelua.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan tie- ja kaapelialueista

**Valinnan jälkeen näytetään:** Sallitut käytöt ja alueet kirjataan karttaliitteeseen. Korvaus kasvaa, mutta hanke saa toisen mahdollisen reitin.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan nykyisten reittien varassa

**Valinnan jälkeen näytetään:** Lisäsopimuksia ei tehdä. Nykyiset voimalapaikat säilyvät, mutta näiden kiinteistöjen kautta ei voi suunnitella oikaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-08`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Omistajat eivät hyväksy voimalaa omalle kiinteistölleen, mutta ovat valmiita sopimaan tie- ja kaapelireitistä. Tästä reittijoustosta voi olla hyötyä muiden voimaloiden sijoittelulle; se ei anna oikeutta rakentaa tornia näille maille.

**Valinta A — vaikutus:** routeReserve=true nimetyillä alueilla.

**Valinta B — vaikutus:** Ei muutosta tämänhetkiseen toteutukseen; varareittiä ei hankita.

**Myöhempi tapahtuma / jatko:** Vain todellinen tie- tai kaapelivaihtoehto voi helpottaa myöhempää siirtoa. Älä sijoita voimalaa alueelle, jolla sopimus sen kieltää.

**Tausta:** L10

---

### [UUSI-P1-09]

#### PELAAJALLE

**Kortin otsikko:** Mihin ensimmäiset selvitysrahat käytetään?

**Korttiteksti:** Hankkeen verkkoon pääsy ja luontovaikutukset ovat vielä epäselviä. Omistaja ei halua tilata kaikkea heti. Tämän kevään maastotiimin voi varata nyt; myös verkkokonsultilla on vapaa työjakso.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan luontoselvitykset ensin

**Valinnan jälkeen näytetään:** Maastotiimi varataan tälle kaudelle. Tarkempi liityntäselvitys ja sähkönsiirtosuunnittelu tilataan seuraavasta rahoituserästä.

##### Valinta B

**Pyyhkäisyteksti:** Tilataan verkkoselvitys ensin

**Valinnan jälkeen näytetään:** Liityntäselvitys ja alustava johtoreitti tilataan. Luontoselvitysten laajuus päätetään verkkotuloksen jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P1-09`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Ensimmäisen selvityserän budjetti riittää yhteen kahdesta kokonaisuudesta. Vuodenajan ja konsulttien ilmoitettujen saatavuuksien on oltava näkyvissä.

**Valinta A — vaikutus:** Varaa ecologySlotNow; jätä detailedGridOrder odottamaan. Luontoselvitysten tulos ei muutu valinnasta, mutta verkkotyö voi jäädä kriittiselle polulle.

**Valinta B — vaikutus:** Tilaa gridFirst; tarkista paluuhetken maastokausi. Jos havaintoikkuna on yhä avoin, ei lisävuotta; jos se meni ohi, tarvittava kausityö siirtyy.

**Myöhempi tapahtuma / jatko:** EV-SELVITYSJARJESTYS erottaa onnistuneen ajoituksen, myöhemmän verkkoviiveen ja menetetyn maastokauden. Hankkeen jo keskeytyessä vältettyjä tilaamattomia töitä ei laskuteta.

**Kytketyt tunnisteet:** `EV-SELVITYSJARJESTYS`

**Toteutuksen rajaus:** Molemmat järkeviä priorisointeja lähtötiedon perusteella. Ei aina väärää B:tä eikä laatueron arvontaa työn hinnasta. Surveys-perheen tarjoukset koskevat vain vielä tilaamatonta työtä.

**Tausta:** L01 B01

---

### [BESS-P1-01]

#### PELAAJALLE

**Kortin otsikko:** Tuulisopimus ei mainitse akkua.

**Korttiteksti:** Sähköaseman viereen suunnitellaan akkuvarastoa. Vuokrasopimus puhuu tuulivoimasta ja siihen liittyvistä rakenteista. Kukaan ei ole tarkistanut, mitä uusi käyttötarkoitus kattaa.

##### Valinta A

**Pyyhkäisyteksti:** Neuvotellaan akkualueen vuokrasopimus

**Valinnan jälkeen näytetään:** Akkualue, kulku ja laitteiden tarvitsema tila lisätään sopimusneuvotteluun. Toimittajan asemapiirros täsmennetään sovittuun alueeseen.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään BESS tässä vaiheessa pois

**Valinnan jälkeen näytetään:** Akkuvarasto jätetään pois tästä hankevaiheesta. Tuuli- ja mahdollinen aurinkohanke etenevät ilman sitä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P1-01`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** BESSiä harkitaan ensimmäistä kertaa ja maankäyttö on vielä sovittavissa. Kortti tarjotaan ennen oletusta, että akku olisi jo varmasti mukana.

**Valinta A — vaikutus:** Avaa BESSin maanhankintapolku. Lopullinen mukanaolo edellyttää sopimusta; käytä EV-MAA:ta tarvittaessa.

**Valinta B — vaikutus:** Poista BESS valitusta vaiheesta sekä peru sen vielä aloittamattomat työt. Muiden hankeosien aiemmat tilaukset ja velvoitteet säilyvät.

**Myöhempi tapahtuma / jatko:** Muut BESS-kortit vain akkuosan mukana ollessa. Tätä sääntöä ei näytetä pelaajalle.

**Kytketyt tunnisteet:** `EV-MAA`

**Tausta:** L10 B03

---

### [BESS-P1-02]

#### PELAAJALLE

**Kortin otsikko:** Akku mahtuu. Huoltotie ei.

**Korttiteksti:** Akustokontit sopivat varatulle tontille. Toimittajan asemapiirrokseen lisätään muuntajat, jäähdytys ja kulkuväylät, ja alue loppuu kesken.

##### Valinta A

**Pyyhkäisyteksti:** Neuvotellaan suuremmasta tontista

**Valinnan jälkeen näytetään:** Tarvitset lisää maa-aluetta. Toimittaja piirtää laitteet ja kulkuyhteydet väljemmin.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan pienempi akkuvarasto

**Valinnan jälkeen näytetään:** Toimittaja vähentää akustoyksiköitä ja laskee uuden tehon sekä energiakapasiteetin. Tontille jää tilaa myös laitteiden huoltoon.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P1-02`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana valmistelussa. Toimittajan todellisen laitekokonaisuuden huolto- ja kulkutila ei mahdu alustavasti varatulle tontille.

**Myöhempi tapahtuma / jatko:** Tarkista laitteiden yhteissijoittelu sekä turvallisuuden osoittaminen. Uusi laitekokonaisuus voi muuttaa MW:tä ja MWh:ta eri suhteessa; ei automaattista aurinkohehtaarien vähennystä.

**Tausta:** B03 B04 B07

---

### [BESS-P1-03]

#### PELAAJALLE

**Kortin otsikko:** Halpa akkutontti tulvii

**Korttiteksti:** Akun paikka olisi aivan sähköaseman vieressä, joten kaapeli jäisi lyhyeksi. Hulevesitarkastelu osoittaa kuitenkin sadevesien kertyvän juuri samalle alueelle.

##### Valinta A

**Pyyhkäisyteksti:** Siirretään akku korkeammalle

**Valinnan jälkeen näytetään:** Uutta paikkaa ryhdytään tutkimaan. Kaapeli pitenee, mutta tunnettu tulvakohta jää laitealueen ulkopuolelle.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään tontin korotus ja vesienhallinta

**Valinnan jälkeen näytetään:** Suunnittelija laskee tarvittavan korkeusaseman ja veden johtamisen. Alueen käyttö odottaa tulosta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P1-03`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana valmistelussa. Suunnitellulla tontilla on hulevesitarkastelussa todettu tulvakohta; ei liity vapaaehtoiseen kosteikkopalstan ostoon.

**Myöhempi tapahtuma / jatko:** B → EV-BESS-TURVA tulvariskin suunnitteluhaarassa. A:n uudelle paikalle tarkistetaan muut vaikutukset. Sammutusvesien hallinta on eri kysymys kuin tontin tavallinen tulvariski.

**Kytketyt tunnisteet:** `EV-BESS-TURVA`

**Tausta:** B03 L07

---

**Tulokset, välitapahtumat ja vaiheen mahdolliset loput**

### [interludes[0][0]]

#### PELAAJALLE

**Tapahtuman otsikko:** Sopimuksia saatiin lisää

**Tapahtumateksti:** Muutama puuttuva vuokrasopimus palautui allekirjoitettuna. Karttaliitteet tarkistetaan ja suunnitellut rakentamisalueet päivitetään.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[0][0]`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Lisää sopimuksia on oikeasti varmistunut. Ei puuttuvia etusivusopimuksia valmiiksi tällä välitarinalla.

**Tausta:** L01

---

### [land-done]

#### PELAAJALLE

**Tapahtuman otsikko:** Maat vuokrattu

**Tapahtumateksti:** Hankkeen tämänhetkiseen suunnitelmaan tarvittavat maa-alueet on saatu vuokrattua. Voit jättää kunnalle kaava-aloitteen ja aloittaa YVA-ohjelman valmistelun.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `land-done`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Tämänhetkisen jatkovaihtoehdon kaikki välttämättömät kiinteistöt on varmistettu. Keskeneräinen lisäalue ei estä etenemistä, jos sitä ei lasketa tähän suunnitelmaan.

**Myöhempi tapahtuma / jatko:** transition-1

**Kytketyt tunnisteet:** `transition-1`

**Tausta:** L01

---

### [EV-MAA]

#### PELAAJALLE

**Tapahtuman otsikko:** Vuokraneuvottelun tulos

**Tapahtumateksti:** Maanomistajien vastaus suunnitellun rakennusalueen vuokraamiseen on saatu.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Tarvittavat omistajat allekirjoittavat:**
Vuokrasopimus ja sen karttaliite on hyväksytty. Voit jatkaa suunnittelua tällä kiinteistöllä.

**Haara — Sopimusta ei synny, mutta korvaava sijoittelu löytyy:**
Kiinteistö jää hankkeesta pois. Rakentaminen voidaan sijoittaa muille vuokratuille alueille; suunnitelma päivitetään.

**Haara — Sopimusta ei synny eikä kaikkia paikkoja voida korvata:**
Kiinteistö jää pois, eikä kaikelle sille suunnitellulle rakentamiselle löydy korvaavaa paikkaa. Hankkeen kokoa joudutaan pienentämään.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MAA`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Avoin vuokraneuvottelu tai yhteisomistajien valtuuksien selvittäminen on päättynyt. Näytä tulos vain sitä koskevan kiinteistön kohdalla.

**Myöhempi tapahtuma / jatko:** Hyväksytty sopimus jatkaa menettelyä; pienentyminen tarkistaa laajuuden. Etusijan ristiriita käyttää EV-ETUSIJA:ta, ei tätä yleistä vastausta.

**Kytketyt tunnisteet:** `EV-ETUSIJA`, `LOPPU-LAAJUUS`

**Tausta:** L10

---

### [EV-SOPIMUSSIVUT]

#### PELAAJALLE

**Tapahtuman otsikko:** Puuttuvat sopimussivut

**Tapahtumateksti:** Maanomistajalle lähetettyä uutta sopimuspakettia on yritetty selvittää.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Koko sopimus vahvistetaan:**
Maanomistaja löytyy mökiltä. Hän oli luullut, että vain ensimmäinen sivu piti palauttaa. Koko sopimus liitteineen saadaan nyt vahvistettua.

**Haara — Vastausta ei saada määräajassa:**
Maanomistajaan ei saada yhteyttä eikä hyväksytyn sopimuksen sisältöä varmistettua. Suunnittelua jatketaan ilman tätä kiinteistöä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-SOPIMUSSIVUT`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** land-map-versions/A:n täydennyspyyntö ja kohtuullinen tavoitteluaika päättyneet.

**Myöhempi tapahtuma / jatko:** Myönteinen → maanhankinta jatkuu. Kielteinen → tarkista korvaavat paikat; tarvittaessa EV-MAA:n kielteinen sijoitteluhaara.

**Kytketyt tunnisteet:** `land-map-versions`, `EV-MAA`

**Tausta:** L10 V5-L1

---

### [EV-VOIMALALUPAUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Maanomistajan vaatimus käsiteltiin

**Tapahtumateksti:** Vuokrasopimus ja voimalan sijoittelusta käyty keskustelu on selvitetty.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — A: sopimus ei takaa voimalaa ja omistaja hyväksyy selvityksen:**
Maanomistaja hyväksyy, ettei vuokrasopimus takaa voimalapaikkaa. Sopimus jää voimaan sovituilla ehdoilla.

**Haara — A: neuvotteluissa on annettu ristiriitainen lupaus:**
Vanhoista viesteistä löytyy lupaus, jota nykyinen suunnitelma ei toteuta. Asian korjaamiseksi tarvitaan vielä sopimus maanomistajan kanssa.

**Haara — B: sopimuksen päättämisestä sovitaan:**
Vuokrasopimus päätetään yhteisesti. Kiinteistö poistuu käytettävistä alueista, ja muutoksen vaatima uusi sijoittelu käynnistyy.

**Haara — A: omistaja kiistää tulkinnan edelleen:**
Maanomistaja ei hyväksy selvitystä. Neuvottelua jatketaan juristin avulla; tämän kiinteistön käyttöä ei voi pitää vielä riidattomana.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VOIMALALUPAUS`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** land-area-explained tehty. Valitse ensin valinnan A/B mukainen haara, sitten tarkistetun sopimus- ja neuvotteluaineiston tulos.

**Myöhempi tapahtuma / jatko:** Jatkoriita tai ristiriitaisen lupauksen selvittäminen → UUSI-P1-MAARIITA. Sovittu päättäminen muuttaa käytettävää maata vasta toteutuessaan. Korvaavan alueen tarve käsitellään kerran.

**Kytketyt tunnisteet:** `land-area-explained`, `UUSI-P1-MAARIITA`

**Tausta:** L10 V5-L1

---

### [external-0]

#### PELAAJALLE

**Tapahtuman otsikko:** Yhtiö lopettaa hankekehityksen.

**Tapahtumateksti:** Hankeyhtiön omistaja vetäytyy uusien hankkeiden kehittämisestä. Yhtiö aikoo keskittyä muihin liiketoimintoihin tulevaisuudessa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-0`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Toteutuksen rajaus:** Käyttäjän suoraan muokkaama otsikko ja tapahtumateksti säilytetty. Ulkoinen loppu ei laukea enää saavutetun luvitusvoiton jälkeen.

**Tausta:** L01

---

### [ext-land-owner]

#### PELAAJALLE

**Tapahtuman otsikko:** Portfolio supistuu

**Tapahtumateksti:** Hankkeen omistaja keskeyttää uusien hankkeiden kehityksen ja karsii portfoliotaan. Tämä hanke on yksi lopetettavista.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-land-owner`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Toteutuksen rajaus:** Käyttäjän suoraan muokkaama otsikko ja tapahtumateksti säilytetty. Ulkoinen loppu ei laukea enää saavutetun luvitusvoiton jälkeen.

**Tausta:** L01

---

### [ext-land-use]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavoitusmonopolia

**Tapahtumateksti:** Kunta ratkaisee alueen maankäytön muun toiminnan hyväksi. Tässä paikassa hanketta ei voida enää jatkaa, vaikka alueen omistajat olisivat mukana.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-land-use`

**Vaihe:** 1 — Maanvuokraus

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Toteutuksen rajaus:** Käyttäjän suoraan muokkaama otsikko ja tapahtumateksti säilytetty. Ulkoinen loppu ei laukea enää saavutetun luvitusvoiton jälkeen.

**Tausta:** L01

---


## VAIHE 2: Kaava-aloite ja YVA-ohjelma

Kortit ja tapahtumat on koottu tähän pääasiallisen esiintymisvaiheen mukaan. Nimetty jatko voi palata aiempaan päätökseen; tarkka ajoitus määräytyy kunkin osion ehdoista.

**Vaiheen aloitus**

### [transition-1]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaava-aloite ja YVA-ohjelma

**Tapahtumateksti:** Riittävät maa-alueet on saatu vuokrattua. Nyt jätetään kaava-aloite kunnalle ja valmistellaan YVA-ohjelma: mitä vaihtoehtoja tutkitaan ja mitä vaikutuksia selvitetään.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `transition-1`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** vaihesiirtymä · PÄIVITETTY

**Laukaisuehto:** land-done käsitelty. Vaihe 1:n välttämättömät sopimukset valmiit.

**Kytketyt tunnisteet:** `land-done`

**Tausta:** L01

---

**Päätöskortit ja niiden variantit**

### [defence]

#### PELAAJALLE

**Kortin otsikko:** Puolustusvoimien lausunto

**Korttiteksti:** Puolustusvoimien lausuntoa varten tarvitaan paikat ja enimmäiskorkeus. Kaikki kannattavat puhdasta energiaa; se ei vielä ratkaise tutkavaikutusta.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään lausunto nykyisestä sijoittelusta

**Valinnan jälkeen näytetään:** Lausuntopyyntö lähetetään voimalapaikkoineen ja enimmäiskorkeuksineen. Muu valmistelu jatkuu vastausta odotettaessa.

##### Valinta B

**Pyyhkäisyteksti:** Tehdään ensin myös pienempi vaihtoehto

**Valinnan jälkeen näytetään:** Suunnittelija laatii suppeamman vaihtoehdon. Molemmat sijoittelut toimitetaan Puolustusvoimille.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `defence`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuuliosa mukana. Lausuntoa ei ole vielä pyydetty tälle sijoittelulle ja enimmäiskorkeudelle.

**Valinta A — vaikutus:** Pyydä kanta nykyvaihtoehtoon.

**Valinta B — vaikutus:** Varaa suppean vaihtoehdon suunnitteluaika; se voi myöhemmin välttää yhden paluukierroksen, mutta ei muuta Puolustusvoimien teknisiä rajoitteita.

**Myöhempi tapahtuma / jatko:** EV-PV sisältää suoran lausunnon ja erillisen VTT-selvitystarpeen. VTT-työtä ei laskuteta eikä odoteta ilman selvityspyyntöä.

**Kytketyt tunnisteet:** `EV-PV`

**Tausta:** L06 S05

---

### [surveys]

#### PELAAJALLE

**Kortin otsikko:** Halvempi tarjous sisältää uuden kevään.

**Korttiteksti:** Sama sovittu selvityskokonaisuus maksaa 55 000 € tänä maastokautena tai 38 000 € ensi kaudella. Eiköhän työn laatu molemmilla konsulteilla ole sama.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan 55 000 €:n työ tälle kaudelle

**Valinnan jälkeen näytetään:** 55 000 €:n tarjous hyväksytään ja maastotiimi varataan tälle kaudelle. Sovitut selvitykset käynnistyvät.

##### Valinta B

**Pyyhkäisyteksti:** Tilataan 38 000 €:n työ ensi kaudelle

**Valinnan jälkeen näytetään:** 38 000 €:n tarjous hyväksytään. Maastotyöt siirtyvät ensi kaudelle; verkko- ja kaavavalmistelua voidaan jatkaa odotusaikana.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `surveys`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Sovittu luontoselvityspaketti on vielä tilaamatta. Näytä vain yksi tarjousvariantti. Jos UUSI-P1-09:ssa sama työ jo tilattiin, tätä tilausta ei tehdä toiseen kertaan.

**Vaihtoehtoinen aiheketju:** `konsulttitarjous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa hinnan mukainen kustannus ja tämän havaintokauden varaus.

**Valinta B — vaikutus:** Kirjaa halvempi hinta ja seuraavan havaintokauden valmistumisaika. Lisäviive syntyy vain, jos juuri tämä työ siirtää hankkeen seuraavaa vaihetta.

**Myöhempi tapahtuma / jatko:** Selvitysten valmistuminen → surveys-wait. Todellinen olosuhdeongelma käsitellään erikseen, ei automaattisena kalliimman tarjouksen rangaistuksena.

**Kytketyt tunnisteet:** `surveys-wait`

**Tausta:** L01

---

### [research]

#### PELAAJALLE

**Kortin otsikko:** Rahoitetaanko seurantaa?

**Korttiteksti:** Tutkimusryhmä pyytää {cost} € osuutta julkiseen {species} seurantaan. Tuloksista voisi olla hyötyä hankkeen arvioinnissa. Ne julkaistaan myös niille, jotka eivät osallistu rahoitukseen.

##### Valinta A

**Pyyhkäisyteksti:** Osallistutaan tutkimuksen rahoitukseen

**Valinnan jälkeen näytetään:** Rahoitusosuus sovitaan. Tutkimus jatkuu omassa aikataulussaan, ja hankkeen omat selvitykset etenevät rinnalla.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan julkisia tutkimustuloksia

**Valinnan jälkeen näytetään:** Rahoitusosuuteen ei käytetä hankkeen rahaa. Julkaistut tulokset käydään läpi niiden valmistuttua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `research`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Julkinen tutkimus koskee hankealueella todellisuudessa esiintyvää lajia tai alueen poronhoitoa. Rahoituspäätöstä ei ole vielä tehty. Valitse vain yksi tutkimusrahoituksen korteista samaan tutkimukseen.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_rahoitus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS: tutkimustulos ja julkaisuajankohta ovat samoja rahoitusvalinnasta riippumatta. Rahoittamisella ei osteta myönteistä lausuntoa. Mahdollinen moraalinen/maineellinen hyöty ei ole automaattinen lupahyöty.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`

**Toteutuksen rajaus:** Käytä {species}-arvossa oikeaa genetiiviä (metsäpeuran, maakotkan, poron tai suden). Metsäpeura ja poro edellyttävät omia alueprofiilejaan. Yleisen tutkimuksen raha ja julkaisuaika eivät osta suotuisaa havaintoa.

**Tausta:** S13

---

### [initiative-rumour]

#### PELAAJALLE

**Kortin otsikko:** Kylällä kiertää väärä kartta

**Korttiteksti:** Asukkaiden jakamassa kartassa on kaksinkertainen määrä voimaloita nykyiseen suunnitelmaan verrattuna. Kartta on peräisin hankkeen alustavasta tarkastelusta. Kunta käsittelee aloitetta ensi viikolla.

##### Valinta A

**Pyyhkäisyteksti:** Oikaistaan kartta ennen aloitteen käsittelyä

**Valinnan jälkeen näytetään:** Nykyinen sijoittelu julkaistaan ja karttojen ero selitetään. Kunnan aineistoon toimitetaan sama versio.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään oikea kartta aloitteen mukana

**Valinnan jälkeen näytetään:** Kunta saa oikean sijoittelun. Vanha kuva kiertää vielä, joten sen ero nykyiseen suunnitelmaan pitää selvittää yleisötilaisuudessa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `initiative-rumour`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Kaava-aloitetta valmistellaan ja julkisuuteen on päätynyt nykyisestä suunnitelmasta poikkeava kartta. Käytä vain tämän todellisen karttavirheen kertomusta.

**Myöhempi tapahtuma / jatko:** B voi vaatia ylimääräistä viestintätyötä, jos vanha kartta jäi yleiseen käyttöön. Kunta ei hylkää aloitetta automaattisesti huhun vuoksi.

**Toteutuksen rajaus:**  Poistettu initiative-runkokortti ei palaudu periytyvänä tekstinä. Tämä variantti käyttää omaa A/B-tekstiä ja toimintoja.

**Tausta:** L01

---

### [initiative-council]

#### PELAAJALLE

**Kortin otsikko:** Uusi valtuusto haluaa uuden esittelyn

**Korttiteksti:** Hankkeesta keskusteltiin myönteisesti edellisen valtuuston aikana. Uudet luottamushenkilöt haluavat nähdä suunnitelman ennen aloitteen käsittelyä. Ensimmäinen yhteinen aika löytyisi kuukauden päästä.

##### Valinta A

**Pyyhkäisyteksti:** Pidetään esittely ennen käsittelyä

**Valinnan jälkeen näytetään:** Esittely järjestetään ja aloitteen käsittely siirtyy seuraavaan kokoukseen. Kysymyksiin ehditään vastata ennen päätöstä.

##### Valinta B

**Pyyhkäisyteksti:** Toimitetaan aineisto tämän kokouksen esityslistalle

**Valinnan jälkeen näytetään:** Aloite toimitetaan käsittelyyn ja kysymyksiin vastataan kirjallisesti. Jos päättäjät tarvitsevat lisää tietoa, asia voi palautua seuraavaan kokoukseen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `initiative-council`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Uusi valtuusto ja kaava-aloite käsittelemättä. Ei yleistä korttia joka hankkeeseen.

**Myöhempi tapahtuma / jatko:** A:n odotus on näkyvä. B voi edetä nopeammin tai palautua samoihin lisäkysymyksiin; ratkaisu sidotaan aineiston riittävyyteen ja kokousaikaan.

**Toteutuksen rajaus:**  Poistettu initiative-runkokortti ei palaudu periytyvänä tekstinä. Tämä variantti käyttää omaa A/B-tekstiä ja toimintoja.

**Tausta:** L01

---

### [initiative-cottage]

#### PELAAJALLE

**Kortin otsikko:** Mökkiläiset tulevat vasta kesällä

**Korttiteksti:** Mökkiläisyhdistys haluaa osallistua hankkeen esittelyyn, mutta yhteinen tapaaminen onnistuisi vasta kesällä. Kaava-aloite on valmis nyt.

##### Valinta A

**Pyyhkäisyteksti:** Odotetaan yhteistä tapaamista

**Valinnan jälkeen näytetään:** Aloitteen jättämistä siirretään tapaamisen jälkeiseen aikaan. Suunnitelmaa esitellään paikalla myös mökkiläisille.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään aloite ja tarjotaan etäesittely

**Valinnan jälkeen näytetään:** Aloite jätetään kunnalle. Mökkiläiset kutsutaan etäesittelyyn, ja kesälle sovitaan lisäksi tapaaminen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `initiative-cottage`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Kaava-aloite on valmis, mutta mökkiläisyhdistyksen oma kokous on vasta kesällä. Vaihtoehtoinen tiedonsaanti voidaan järjestää ennen sitä.

**Myöhempi tapahtuma / jatko:** Valinta koskee vapaaehtoisen esittelyn ajankohtaa. Älä siirrä lakisääteistä kuulemista tai oleta etäosallistumisen olevan automaattisesti huonompi ratkaisu.

**Toteutuksen rajaus:**  Poistettu initiative-runkokortti ei palaudu periytyvänä tekstinä. Tämä variantti käyttää omaa A/B-tekstiä ja toimintoja.

**Tausta:** L01

---

### [surveys-spring]

#### PELAAJALLE

**Kortin otsikko:** YVA-konsultti on valittava.

**Korttiteksti:** YVA-konsulttien tarjoukset samasta selvitystyöstä: 55 000 € ja maastokäynnit tällä kaudella, tai 38 000 € ja käynnit ensi kaudella. Halvemman tarjouksen maastotulokset saadaan noin vuotta myöhemmin.

##### Valinta A

**Pyyhkäisyteksti:** 55 000 €: tämän kauden työ

**Valinnan jälkeen näytetään:** 55 000 €:n tarjous hyväksytään ja maastotiimi varataan tälle kaudelle. Sovitut selvitykset käynnistyvät.

##### Valinta B

**Pyyhkäisyteksti:** 38 000 €: ensi kauden työ

**Valinnan jälkeen näytetään:** 38 000 €:n tarjous hyväksytään. Maastotyöt siirtyvät ensi kaudelle; verkko- ja kaavavalmistelua voidaan jatkaa odotusaikana.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `surveys-spring`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Sovittu luontoselvityspaketti on vielä tilaamatta. Näytä vain yksi tarjousvariantti. Jos UUSI-P1-09:ssa sama työ jo tilattiin, tätä tilausta ei tehdä toiseen kertaan.

**Vaihtoehtoinen aiheketju:** `konsulttitarjous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa hinnan mukainen kustannus ja tämän havaintokauden varaus.

**Valinta B — vaikutus:** Kirjaa halvempi hinta ja seuraavan havaintokauden valmistumisaika. Lisäviive syntyy vain, jos juuri tämä työ siirtää hankkeen seuraavaa vaihetta.

**Myöhempi tapahtuma / jatko:** Selvitysten valmistuminen → surveys-wait. Todellinen olosuhdeongelma käsitellään erikseen, ei automaattisena kalliimman tarjouksen rangaistuksena.

**Kytketyt tunnisteet:** `surveys-wait`

**Tausta:** L01

---

### [surveys-access]

#### PELAAJALLE

**Kortin otsikko:** Kilpailutus toi kaksi aikataulua.

**Korttiteksti:** Konsultti A aloittaa sovitut selvitykset tällä maastokaudella 72 000 eurolla. Konsultti B tekee saman työn ensi kaudella 49 000 eurolla. Varataanko tämän kauden työ vai säästetäänkö ja odotetaan seuraavaa?

##### Valinta A

**Pyyhkäisyteksti:** 72 000 €: tämän kauden työ

**Valinnan jälkeen näytetään:** 72 000 €:n tarjous hyväksytään ja maastotiimi varataan tälle kaudelle. Sovitut selvitykset käynnistyvät.

##### Valinta B

**Pyyhkäisyteksti:** 49 000 €: ensi kauden työ

**Valinnan jälkeen näytetään:** 49 000 €:n tarjous hyväksytään. Maastotyöt siirtyvät ensi kaudelle; verkko- ja kaavavalmistelua voidaan jatkaa odotusaikana.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `surveys-access`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Sovittu luontoselvityspaketti on vielä tilaamatta. Näytä vain yksi tarjousvariantti. Jos UUSI-P1-09:ssa sama työ jo tilattiin, tätä tilausta ei tehdä toiseen kertaan.

**Vaihtoehtoinen aiheketju:** `konsulttitarjous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa hinnan mukainen kustannus ja tämän havaintokauden varaus.

**Valinta B — vaikutus:** Kirjaa halvempi hinta ja seuraavan havaintokauden valmistumisaika. Lisäviive syntyy vain, jos juuri tämä työ siirtää hankkeen seuraavaa vaihetta.

**Myöhempi tapahtuma / jatko:** Selvitysten valmistuminen → surveys-wait. Todellinen olosuhdeongelma käsitellään erikseen, ei automaattisena kalliimman tarjouksen rangaistuksena.

**Kytketyt tunnisteet:** `surveys-wait`

**Tausta:** L01

---

### [surveys-team]

#### PELAAJALLE

**Kortin otsikko:** Vapaa tiimi maksaa enemmän.

**Korttiteksti:** YVA-konsultti tarjoaa lisätiimin tälle kaudelle 64 000 eurolla. Kilpailijan 43 000 € tarjous alkaa ensi kaudella. Työn sisältö ja laatuvaatimus ovat samat, valmistumisvuosi eri.

##### Valinta A

**Pyyhkäisyteksti:** 64 000 €: lisätiimi tälle kaudelle

**Valinnan jälkeen näytetään:** 64 000 €:n tarjous hyväksytään ja maastotiimi varataan tälle kaudelle. Sovitut selvitykset käynnistyvät.

##### Valinta B

**Pyyhkäisyteksti:** 43 000 €: ensi kauden tiimi

**Valinnan jälkeen näytetään:** 43 000 €:n tarjous hyväksytään. Maastotyöt siirtyvät ensi kaudelle; verkko- ja kaavavalmistelua voidaan jatkaa odotusaikana.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `surveys-team`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Sovittu luontoselvityspaketti on vielä tilaamatta. Näytä vain yksi tarjousvariantti. Jos UUSI-P1-09:ssa sama työ jo tilattiin, tätä tilausta ei tehdä toiseen kertaan.

**Vaihtoehtoinen aiheketju:** `konsulttitarjous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Kirjaa hinnan mukainen kustannus ja tämän havaintokauden varaus.

**Valinta B — vaikutus:** Kirjaa halvempi hinta ja seuraavan havaintokauden valmistumisaika. Lisäviive syntyy vain, jos juuri tämä työ siirtää hankkeen seuraavaa vaihetta.

**Myöhempi tapahtuma / jatko:** Selvitysten valmistuminen → surveys-wait. Todellinen olosuhdeongelma käsitellään erikseen, ei automaattisena kalliimman tarjouksen rangaistuksena.

**Kytketyt tunnisteet:** `surveys-wait`

**Tausta:** L01

---

### [research-gps]

#### PELAAJALLE

**Kortin otsikko:** Lisää paikannusaineistoa

**Korttiteksti:** Tutkimusryhmä kerää GPS-paikannuksia {species} alueenkäytöstä. Hanke voi osallistua {cost} € osuudella. Julkiset tulokset ovat luvassa vasta kaavaehdotuksen valmistelun aikaan.

##### Valinta A

**Pyyhkäisyteksti:** Osallistutaan tutkimuksen rahoitukseen

**Valinnan jälkeen näytetään:** Rahoitusosuus sovitaan. Tutkimus jatkuu omassa aikataulussaan, ja hankkeen omat selvitykset etenevät rinnalla.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan julkisia tutkimustuloksia

**Valinnan jälkeen näytetään:** Rahoitusosuuteen ei käytetä hankkeen rahaa. Julkaistut tulokset käydään läpi niiden valmistuttua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `research-gps`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Julkinen tutkimus koskee hankealueella todellisuudessa esiintyvää lajia tai alueen poronhoitoa. Rahoituspäätöstä ei ole vielä tehty. Valitse vain yksi tutkimusrahoituksen korteista samaan tutkimukseen.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_rahoitus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS: tutkimustulos ja julkaisuajankohta ovat samoja rahoitusvalinnasta riippumatta. Rahoittamisella ei osteta myönteistä lausuntoa. Mahdollinen moraalinen/maineellinen hyöty ei ole automaattinen lupahyöty.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`

**Toteutuksen rajaus:** Käytä {species}-arvossa oikeaa genetiiviä (metsäpeuran, maakotkan, poron tai suden). Metsäpeura ja poro edellyttävät omia alueprofiilejaan. Yleisen tutkimuksen raha ja julkaisuaika eivät osta suotuisaa havaintoa.

**Tausta:** S13

---

### [research-cumulative]

#### PELAAJALLE

**Kortin otsikko:** Yhteistutkimus hankkeiden vaikutuksista

**Korttiteksti:** Tutkimuksessa selvitetään, miten useat maankäyttöhankkeet vaikuttavat {species} liikkumiseen. Omistajilta kerätään rahoitusta; tämän hankkeen osuudeksi pyydetään {cost} €.

##### Valinta A

**Pyyhkäisyteksti:** Osallistutaan tutkimuksen rahoitukseen

**Valinnan jälkeen näytetään:** Rahoitusosuus sovitaan. Tutkimus jatkuu omassa aikataulussaan, ja hankkeen omat selvitykset etenevät rinnalla.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan julkisia tutkimustuloksia

**Valinnan jälkeen näytetään:** Rahoitusosuuteen ei käytetä hankkeen rahaa. Julkaistut tulokset käydään läpi niiden valmistuttua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `research-cumulative`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Julkinen tutkimus koskee hankealueella todellisuudessa esiintyvää lajia tai alueen poronhoitoa. Rahoituspäätöstä ei ole vielä tehty. Valitse vain yksi tutkimusrahoituksen korteista samaan tutkimukseen.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_rahoitus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS: tutkimustulos ja julkaisuajankohta ovat samoja rahoitusvalinnasta riippumatta. Rahoittamisella ei osteta myönteistä lausuntoa. Mahdollinen moraalinen/maineellinen hyöty ei ole automaattinen lupahyöty.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`

**Toteutuksen rajaus:** Käytä {species}-arvossa oikeaa genetiiviä (metsäpeuran, maakotkan, poron tai suden). Metsäpeura ja poro edellyttävät omia alueprofiilejaan. Yleisen tutkimuksen raha ja julkaisuaika eivät osta suotuisaa havaintoa.

**Tausta:** S13

---

### [research-seasons]

#### PELAAJALLE

**Kortin otsikko:** Seuranta tarvitsee yhden kauden lisää

**Korttiteksti:** Tutkimusryhmä jatkaa {species} seurantaa vielä yhden havaintokauden. Hanke voi osallistua {cost} € osuudella. Julkaisu valmistuu myöhemmin kuin aiemmin arvioitiin.

##### Valinta A

**Pyyhkäisyteksti:** Osallistutaan tutkimuksen rahoitukseen

**Valinnan jälkeen näytetään:** Rahoitusosuus sovitaan. Tutkimus jatkuu omassa aikataulussaan, ja hankkeen omat selvitykset etenevät rinnalla.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan julkisia tutkimustuloksia

**Valinnan jälkeen näytetään:** Rahoitusosuuteen ei käytetä hankkeen rahaa. Julkaistut tulokset käydään läpi niiden valmistuttua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `research-seasons`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Julkinen tutkimus koskee hankealueella todellisuudessa esiintyvää lajia tai alueen poronhoitoa. Rahoituspäätöstä ei ole vielä tehty. Valitse vain yksi tutkimusrahoituksen korteista samaan tutkimukseen.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_rahoitus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS: tutkimustulos ja julkaisuajankohta ovat samoja rahoitusvalinnasta riippumatta. Rahoittamisella ei osteta myönteistä lausuntoa. Mahdollinen moraalinen/maineellinen hyöty ei ole automaattinen lupahyöty.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`

**Toteutuksen rajaus:** Käytä {species}-arvossa oikeaa genetiiviä (metsäpeuran, maakotkan, poron tai suden). Metsäpeura ja poro edellyttävät omia alueprofiilejaan. Yleisen tutkimuksen raha ja julkaisuaika eivät osta suotuisaa havaintoa.

**Tausta:** S13

---

### [programme-birds]

#### PELAAJALLE

**Kortin otsikko:** Lintuyhdistyksellä on lisähavaintoja

**Korttiteksti:** Paikallinen lintuyhdistys kertoo sääksen lentävän säännöllisesti hankealueen läpi. Tätä reittiä ei ole maastotöiden suunnitelmassa. Kartoitukset on tarkoitus aloittaa ensi kuussa.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään havainnot ja muutetaan seurantaa

**Valinnan jälkeen näytetään:** Havaintojen sijainti ja ajankohdat tarkistetaan. Seurantapisteitä siirretään kattamaan myös ilmoitettu lentoreitti.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan seurantaa ja tarkistetaan havainnot rinnalla

**Valinnan jälkeen näytetään:** Maastotyöt aloitetaan sovituista pisteistä. Yhdistyksen aineiston perusteella arvioidaan, tarvitaanko lisäksi uusi havaintopaikka.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `programme-birds`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Todellinen, alustavasti tarkistettava sääksen lentoreittihavainto puuttuu seurantasuunnitelmasta. Maastotyö on vasta alkamassa.

**Myöhempi tapahtuma / jatko:** Jos ilmoitettu reitti jää B:n havaintopaikkojen ulkopuolelle, tarvitaan lisäseuranta. Ei automaattista havaintojen sivuuttamista; A maksaa laajemman työn etupainotteisesti.

**Toteutuksen rajaus:**  Poistettu programme-runkokortti ei palaudu. Vaihtoehdot ovat tässä itsenäisesti kirjoitettuja, eivät poistetun työpajakortin tekstiperintöä.

**Tausta:** L01 S04 S05

---

### [programme-range]

#### PELAAJALLE

**Kortin otsikko:** Seurantaa pyydetään hankealueen ulkopuolelta

**Korttiteksti:** Ohjelmalausunnossa pyydetään selvittämään myös metsäpeurojen kulkuyhteys hankealueen pohjoispuolella. Nykyinen tarjous kattaa vain voimalapaikkojen ympäristön.

##### Valinta A

**Pyyhkäisyteksti:** Laajennetaan maastotyötä nyt

**Valinnan jälkeen näytetään:** Tarjous täydennetään pohjoisen kulkuyhteydelle. Maastotiimi saa uuden rajauksen ennen töiden aloittamista.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan ensin olemassa oleva seuranta-aineisto

**Valinnan jälkeen näytetään:** Konsultti pyytää paikannus- ja havaintoaineiston. Sen perusteella päätetään, mitä lisäkäyntejä tarvitaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `programme-range`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran esiintymisalue ja hankkeen vaikutukseen liittyvä kulkuyhteys; ei yleisesti kaikkiin maakuntiin.

**Myöhempi tapahtuma / jatko:** B voi säästää päällekkäistä työtä, jos aineisto kattaa kysymyksen. Jos aineisto ei riitä ja havaintokausi sulkeutuu odottaessa, lisätyö voi viivästyä.

**Toteutuksen rajaus:**  Poistettu programme-runkokortti ei palaudu. Vaihtoehdot ovat tässä itsenäisesti kirjoitettuja, eivät poistetun työpajakortin tekstiperintöä.

**Tausta:** L01 S04 S05

---

### [herding-programme]

#### PELAAJALLE

**Kortin otsikko:** Paliskunnan aineisto puuttuu

**Korttiteksti:** Poronhoitoselvityksen lähtöaineistossa on laidunalueet, mutta ei porojen kokoamispaikkoja eikä kulkua niiden välillä. Paliskunta tarjoaa tietoja ja yhteistä maastokäyntiä.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan maastokäynti paliskunnan kanssa

**Valinnan jälkeen näytetään:** Kulkureitit ja kokoamispaikat käydään läpi paikan päällä. Tiedot siirretään suunnitteluun sovitulla tarkkuudella.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään tiedot ensin kartalle

**Valinnan jälkeen näytetään:** Paliskunnan karttatiedot toimitetaan konsultille. Epäselvät reittikohdat merkitään myöhemmin tarkistettaviksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `herding-programme`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Hanke poronhoitoalueella ja merkityksellinen yhteys laidunkiertoon.

**Myöhempi tapahtuma / jatko:** Koko laidunkierto huomioidaan kummassakin haarassa. B:n epäselviä kohtia ei saa tulkita tyhjiksi; jos ne osuvat rakentamiseen, tarkistus tehdään ennen lopullista sijoittelua.

**Toteutuksen rajaus:**  Poistettu programme-runkokortti ei palaudu. Vaihtoehdot ovat tässä itsenäisesti kirjoitettuja, eivät poistetun työpajakortin tekstiperintöä.

**Tausta:** L09 S06 S13

---

### [programme-cumulative]

#### PELAAJALLE

**Kortin otsikko:** Yhteisvaikutuksiin tuli kolme hanketta lisää

**Korttiteksti:** YVA-ohjelman jälkeen lähialueella julkaistaan kolme uutta tuulihanketta. Niiden voimalapaikat ovat vielä alustavia, mutta yhteismelu ja linnustovaikutukset pitää ottaa mukaan arviointiin.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan yhteinen lähtötietojen vaihto

**Valinnan jälkeen näytetään:** Naapurihankkeilta pyydetään nykyiset suunnitelmat ja seuraavat päivitysajankohdat. Yhteisvaikutusarvion lähtötietotaulukko päivitetään.

##### Valinta B

**Pyyhkäisyteksti:** Arvioidaan nykyinen tieto ja varaudutaan päivitykseen

**Valinnan jälkeen näytetään:** Arvio aloitetaan julkisista suunnitelmista. Epävarmat paikat erotetaan, ja uusi laskenta varataan sijoittelujen tarkentumiseen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `programme-cumulative`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tunnetut uudet naapurihankkeet vaikuttavat samaan melu- tai luontokohteeseen.

**Myöhempi tapahtuma / jatko:** Naapurin myöhempi muutos voi aiheuttaa uuden laskennan molemmissa haaroissa. A vähentää tiedonkulkuriskiä, B ei saa keksiä naapurin lopullisia paikkoja.

**Toteutuksen rajaus:**  Poistettu programme-runkokortti ei palaudu. Vaihtoehdot ovat tässä itsenäisesti kirjoitettuja, eivät poistetun työpajakortin tekstiperintöä.

**Tausta:** L01 S04 S05

---

### [UUSI-P2-01]

#### PELAAJALLE

**Kortin otsikko:** Yhdeksän voimalaa ei riitä kevennykseksi

**Korttiteksti:** Tiimi pienentää suunnitelman yhdeksään voimalaan ja toivoo välttyvänsä YVA-menettelyltä. Kokonaisteho ylittää kuitenkin hankeluettelon tehorajan.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan YVA-menettelyllä

**Valinnan jälkeen näytetään:** Vaikutusten arviointi valmistellaan suunnitellulle kokonaisteholle. Yhdeksän voimalan vaihtoehto voi jäädä mukaan vertailuun.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan selvästi pienempi hanke

**Valinnan jälkeen näytetään:** Suunnittelija laatii pienemmän vaihtoehdon. Sen YVA-tarve selvitetään erikseen ennen menettelyn muuttamista.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-01`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman alustava kokoluokka ja yhdeksään voimalaan pienentämisen vaihtoehto ovat esillä ennen YVA-menettelyn käynnistymistä. Jo aloitettua YVAa ei poisteta tällä kortilla.

**Myöhempi tapahtuma / jatko:** Käytä lain ajantasaista hankeluetteloa integraatiossa. Tapauskohtaisen YVA:n mahdollisuus säilyy; lukumäärän lasku ei yksin muuta yvaRequired-lippua.

**Tausta:** L01

---

### [UUSI-P2-02]

#### PELAAJALLE

**Kortin otsikko:** Kolme vaihtoehtoa, samat ongelmapaikat

**Korttiteksti:** YVA-ohjelmassa on 20, 19 ja 18 voimalan vaihtoehdot. Kaikissa säilyvät samat kolme paikkaa sääksen pesän ja kalavesien välisellä reitillä. Lausunnossa pyydetään vaihtoehtoa, jossa tätä haittaa vältetään.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään vaihtoehto ilman kolmea riskipaikkaa

**Valinnan jälkeen näytetään:** Vertailuun lisätään pienempi sijoittelu. Voimalat ja tarpeettomat tiehaarat poistetaan sääksen lentoreitiltä.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan kolmen paikan siirtämistä

**Valinnan jälkeen näytetään:** Suunnittelija etsii korvaavia paikkoja hankealueen toiselta laidalta. Sääksen lentoreitti arvioidaan myös uuden sijoittelun kohdalla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-02`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Sääksen säännöllinen lentoreitti on tunnistettu. Kolme nimenomaista paikkaa esiintyy kaikissa vertailtavissa vaihtoehdoissa.

**Myöhempi tapahtuma / jatko:** B → EV-VAIHTOEHDOT. A arvioidaan pienempänä todellisena vaihtoehtona; älä vain vaihda voimalamäärää pitäen riskipaikkoja samoina.

**Kytketyt tunnisteet:** `EV-VAIHTOEHDOT`

**Tausta:** S09 S03

---

### [UUSI-P2-03]

#### PELAAJALLE

**Kortin otsikko:** Hanke odottaa maakuntakaavaa

**Korttiteksti:** Hanke ulottuu maakuntakaavan tuulivoima-alueen ulkopuolelle. Maakuntaliiton ja kunnan kanssa käydyssä tarkastelussa laajan vaihtoehdon eteneminen edellyttäisi maakuntakaavan muutosta.

##### Valinta A

**Pyyhkäisyteksti:** Pidetään laaja vaihtoehto ja odotetaan kaavamuutosta

**Valinnan jälkeen näytetään:** Laaja vaihtoehto jää tavoitteeksi. Oman kaavan aikataulu sidotaan tarvittavan maakuntakaavan etenemiseen.

##### Valinta B

**Pyyhkäisyteksti:** Rajataan hanke nykyiseen kaavaratkaisuun sopivaksi

**Valinnan jälkeen näytetään:** Osa voimalapaikoista jätetään pois. Kunta ja konsultti tarkistavat, voidaanko pienemmän vaihtoehdon valmistelua jatkaa nykyisen maakuntakaavan perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-03`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Tässä skenaariossa seudullinen laajuus ja maakuntakaavan ohjausvaikutus on selvitetty; muutostarve koskee laajaa vaihtoehtoa.

**Valinta A — vaikutus:** regionalPlanDependency=true; kirjaa maakuntaliiton tavoiteaika, ei oletettua lopullista valmistumista.

**Valinta B — vaikutus:** Siirry arvioituun pienempään vaihtoehtoon. regionalPlanDependency poistuu vasta todetun yhteensopivuuden jälkeen.

**Myöhempi tapahtuma / jatko:** A:n todellinen maakuntakaavan viive → EV-MAAKUNTAODOTUS. Pienennetyn vaihtoehdon vaikutukset päivitetään. Pelkkä tv-alueen rajaviivan ylitys ei ole kaikissa hankkeissa ehdoton este.

**Kytketyt tunnisteet:** `EV-MAAKUNTAODOTUS`

**Tausta:** S05 S12 L01

---

### [UUSI-P2-04]

#### PELAAJALLE

**Kortin otsikko:** Mihin hanke liitetään?

**Korttiteksti:** Lähin sähköasema näyttää alustavasti sopivalta. Verkkoyhtiö tarvitsee tarkemmat tiedot tehosta ja aikataulusta. Toinen mahdollinen asema olisi kauempana, ja sen johtoreitin selvittäminen maksaisi lisää.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään ensisijainen ja varaliityntä

**Valinnan jälkeen näytetään:** Molemmista vaihtoehdoista pyydetään verkkotarkastelu. Kahden johtoreitin alustava suunnittelu käynnistyy.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään vain lähin asema

**Valinnan jälkeen näytetään:** Työ keskitetään lähimpään asemaan. Kauempana olevan vaihtoehdon reittiä ei vielä tutkita.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-04`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Liittymisvaihtoehtoja ei ole ratkaistu tai EV-YHTEISASEMA on hylännyt yhteisjohdon. Älä tilaa jo tehtyä selvitystä uudelleen.

**Valinta A — vaikutus:** reserveGridStudied=true vasta varaselvityksen valmistuttua; kirjaa toisen selvityksen lisäkulu.

**Valinta B — vaikutus:** Ensisijainen selvitys vain. Varavaihtoehdon myöhempi aloitus voi aiheuttaa lisäaikaa.

**Myöhempi tapahtuma / jatko:** EV-VERKKO. Aiempi yhteisjohdon epäonnistuminen ei katoa, mutta samaa omaa reittityötä ei veloiteta toiseen kertaan.

**Kytketyt tunnisteet:** `EV-VERKKO`

**Toteutuksen rajaus:** Jos UUSI-P1-04/A:ssa päätettiin odottaa yhteisjohtoselvitystä, älä tarjoa oman erillisen johdon tilausta pakollisena ennen EV-YHTEISASEMA:n tulosta. Paluukortti käyttää jo tehtyjä verkkokyselyjä eikä väitä niiden puuttuvan.

**Tausta:** B01 B02

---

### [UUSI-P2-05]

#### PELAAJALLE

**Kortin otsikko:** Puolustusvoimien huomio koskeekin johtoa

**Korttiteksti:** Voimalapaikoille on saatu alustavasti myönteinen kanta. Suunniteltu voimajohto kulkee kuitenkin puolustuksen käyttämän alueen kautta. Johdon reitti pitää selvittää erikseen.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan alueen kiertävä johtoreitti

**Valinnan jälkeen näytetään:** Suunnittelija aloittaa kiertoreitin vertailun. Uuden reitin pituus, maa-alueet ja luontovaikutukset selvitetään.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään nykyreitin rajoitteet tarkasti

**Valinnan jälkeen näytetään:** Puolustusvoimilta pyydetään reittiä koskevat rajoitteet. Niiden perusteella tutkitaan, voiko johto säilyä tai siirtyä lähistöllä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-05`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Oma sähkönsiirtoreitti sijoittuu puolustuksen käytön kannalta ongelmalliseen kohtaan. Ei sama ongelma kuin voimaloiden tutkavaikutus.

**Myöhempi tapahtuma / jatko:** Jos nykyreitin yhteensovitus ei onnistu, siirry UUSI-P2-04:n reittivertailuun. VTT ei toimi voimajohdon yleisenä lupaviranomaisena.

**Kytketyt tunnisteet:** `UUSI-P2-04`

**Tausta:** S05 L06

---

### [UUSI-P2-06]

#### PELAAJALLE

**Kortin otsikko:** Kaavaluonnos valmistellaan vasta päätelmän jälkeen

**Korttiteksti:** Kunta haluaa odottaa YVA:n perusteltua päätelmää ennen kaavaluonnoksen nähtäville asettamista. Suunniteltu yhtäaikainen kuuleminen ei toteudu.

##### Valinta A

**Pyyhkäisyteksti:** Muutetaan kaavan aikataulu kunnan esityksen mukaan

**Valinnan jälkeen näytetään:** YVA jatkuu ja kaavaluonnoksen kuuleminen siirtyy myöhemmäksi. Luonnokseen voidaan ottaa päätelmän havainnot jo valmiiksi.

##### Valinta B

**Pyyhkäisyteksti:** Ehdotetaan luonnoksen valmistelua rinnalla

**Valinnan jälkeen näytetään:** Kunnalle ehdotetaan, että luonnosta valmistellaan jo nyt mutta nähtävilläolosta päätetään erikseen. Kunta ratkaisee aikataulun.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-06`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kunta on pyytänyt muuttamaan kaavaluonnoksen ajoitusta suhteessa YVAan. Molemmat valmistelutyöt ovat käynnissä ja niiden järjestys on vielä sovitettavissa.

**Myöhempi tapahtuma / jatko:** Ei oikotietä kunnan päätöksen ohi. B voi lyhentää myöhempää valmistelua vain, jos rinnakkainen työ on mahdollista; muussa tapauksessa sama odotus kuin A:ssa.

**Tausta:** S20 L01

---

### [UUSI-P2-07]

#### PELAAJALLE

**Kortin otsikko:** Metsäpeurat liikkuvat Natura-alueiden välillä

**Korttiteksti:** Hankealueen ulkopuolisilla Natura-alueilla metsäpeura on suojeluperuste. Paikannusaineisto osoittaa eläinten liikkuvan hankealueen kautta alueelta toiselle.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään kulkuyhteys Natura-arviossa

**Valinnan jälkeen näytetään:** Konsultti tarkastelee voimaloiden, teiden ja muiden hankkeiden vaikutusta kulkuyhteyteen.

##### Valinta B

**Pyyhkäisyteksti:** Tehdään samalla kulkuyhteyttä väistävä vaihtoehto

**Valinnan jälkeen näytetään:** Suunnittelija rajaa rakentamista pois eläinten käyttämältä reitiltä. Muutettua vaihtoehtoa arvioidaan Natura-arviossa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-07`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran suojeluperuste ja hankkeen vaikutusyhteys todettu. Ei yleistä kilometrirajaa.

**Myöhempi tapahtuma / jatko:** EV-NATURA. Ennakolta tutkittu pienempi vaihtoehto voi vähentää myöhempää uudelleensuunnittelua.

**Kytketyt tunnisteet:** `EV-NATURA`

**Tausta:** L02 S03 S21

---

### [UUSI-P2-08]

#### PELAAJALLE

**Kortin otsikko:** Korkeampi voimala tarvitsee uuden tarkistuksen

**Korttiteksti:** Tekninen tiimi ehdottaa korkeampaa voimalamallia. Puolustusvoimien aiempi lausunto koskee nykyistä matalampaa suunnitelmaa, eikä muutoksen soveltuvuutta ole tarkistettu.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään lausunto korkeammasta vaihtoehdosta

**Valinnan jälkeen näytetään:** Uusi enimmäiskorkeus ja sijoittelu toimitetaan tarkistettaviksi. Vanha vaihtoehto säilytetään varalla.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään aiemman lausunnon mukainen korkeus

**Valinnan jälkeen näytetään:** Korkeampi malli jätetään pois. Suunnittelua jatketaan aiemman lausunnon mukaisella ratkaisulla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-08`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoimaloille on jo saatu Puolustusvoimien kanta aiemmalla enimmäiskorkeudella. Nyt harkitaan sitä ylittävää mallia; samaa muutosta ei käsitellä kahdesti.

**Myöhempi tapahtuma / jatko:** EV-PV:n muutoshaara. Kielteinen kanta korkeampaan ei automaattisesti kaada vanhan lausunnon mukaista, edelleen toteuttamiskelpoista vaihtoehtoa.

**Kytketyt tunnisteet:** `EV-PV`

**Tausta:** L06

---

### [UUSI-P2-09]

#### PELAAJALLE

**Kortin otsikko:** Sammakkokäynti osui liian kylmään iltaan

**Korttiteksti:** Viitasammakkoselvityksessä käytiin epäillyllä lisääntymislammikolla kylmän sään aikana. Lajia ei havaittu, mutta konsultti ei pidä käyntiä riittävänä. Sopivia havaintoiltoja voi olla vielä tällä keväällä.

##### Valinta A

**Pyyhkäisyteksti:** Varataan uusi käynti sopivalle säälle

**Valinnan jälkeen näytetään:** Konsultti seuraa olosuhteita ja varaa uuden käynnin. Tulosta odotettaessa muuta suunnittelua jatketaan.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään lammikko ja sen valuma-alue pois rakentamisesta

**Valinnan jälkeen näytetään:** Lammikon ympärille jätetään rakentamaton alue ja kuivatus suunnitellaan sen ohi. Konsultti tarkistaa, riittääkö tämä rajaus ilman lisäkäyntiä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-09`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Epäilty paikka, ei epäonnistuneen käynnin perusteella varmistettu lajin puuttuminen. B:n rajauksen täytyy säilyttää nykyinen vesitalous.

**Myöhempi tapahtuma / jatko:** A → EV-MAASTOKAUSI. B voi välttää aikatauluviiveen vain, jos tiedot riittävät haitan välttämisen osoittamiseen; muutoin lisäkäynti tarvitaan.

**Kytketyt tunnisteet:** `EV-MAASTOKAUSI`

**Tausta:** L04 L07

---

### [UUSI-P2-10]

#### PELAAJALLE

**Kortin otsikko:** Pesäkarttaa ei voi laittaa yleisön nähtäville

**Korttiteksti:** Konsultti saa salassa pidettäviä petolintujen pesäpaikkatietoja. Niitä tarvitaan arviointiin, mutta sama kartta ei sovi julkisen YVA-selostuksen liitteeksi.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään julkinen kartta ja erillinen salainen liite

**Valinnan jälkeen näytetään:** Julkisessa kartassa paikat esitetään riittävän yleisellä tasolla. Tarkka aineisto toimitetaan vain siihen oikeutetuille.

##### Valinta B

**Pyyhkäisyteksti:** Sovitaan esitystapa ensin viranomaisen kanssa

**Valinnan jälkeen näytetään:** Aineiston käsittelystä pyydetään rajattu tarkennus. Julkinen yhteenveto tehdään sovitulla tavalla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-10`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Hankkeen selvittäjä on saanut suojattavaa petolintuaineistoa, jonka tarkkoja pesäsijainteja ei voi julkaista sellaisenaan.

**Myöhempi tapahtuma / jatko:** Neutraali tiedonkäsittelykortti. Tarkat pesäpaikat eivät tule peliin tai julkiseen liitteeseen; salassapito ei oikeuta arvioinnin sivuuttamiseen.

**Tausta:** L08 S03

---

### [UUSI-P2-11]

#### PELAAJALLE

**Kortin otsikko:** Naapurihanke julkistettiin viikkoa myöhemmin

**Korttiteksti:** YVA-ohjelma on juuri toimitettu, kun lähialueelta julkistetaan uusi tuulihanke. Sen paikat ovat vielä alustavia. Konsultti kysyy, otetaanko naapurin tarkentuvia tietoja odottava työ mukaan nyt.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan naapurin kanssa tietojen päivitysaikataulu

**Valinnan jälkeen näytetään:** Naapurilta pyydetään nykyinen sijoittelu ja ajankohta seuraavalle versiolle. Arvioinnin päivitys sovitetaan siihen.

##### Valinta B

**Pyyhkäisyteksti:** Aloitetaan yhteisarvio nykyisillä tiedoilla

**Valinnan jälkeen näytetään:** Julkiset suunnitelmat otetaan arvioon ja epävarmuudet kuvataan. Tarkentuva sijoittelu voi myöhemmin vaatia uuden laskennan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-11`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Lähialueella on julkistettu uusi hanke, josta ei vielä saada lopullista sijoittelua. Yhteisvaikutuksiin tarvittavat lähtötiedot ovat aidosti puutteelliset.

**Myöhempi tapahtuma / jatko:** EV-NAAPURITIETO valmistuu ennen selostuksen viimeistelyä. Tiedonvaihto voi säästää uuden laskennan, mutta ei estä naapurihankkeen suunnitelmamuutoksia.

**Kytketyt tunnisteet:** `EV-NAAPURITIETO`

**Tausta:** S07 S22 L01

---

### [UUSI-P2-12]

#### PELAAJALLE

**Kortin otsikko:** Työohjelmasta päästiin sopuun

**Korttiteksti:** Ennakkoneuvottelussa sovittiin tarvittavat selvitykset ja niiden vastuut. Tarjoukset voidaan nyt pyytää samalla sisällöllä.

##### Valinta A

**Pyyhkäisyteksti:** Lähetetään tarjouspyynnöt

**Valinnan jälkeen näytetään:** Tarjouspyynnöt lähtevät. Konsultit voivat hinnoitella saman työmäärän.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään ensin tarjoukset kriittisistä selvityksistä

**Valinnan jälkeen näytetään:** Ensimmäiset tarjouspyynnöt koskevat aikataulun kannalta tärkeimpiä töitä. Muu työ kilpailutetaan seuraavassa erässä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P2-12`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Arvioinnin työohjelma ja tehtävänjako on saatu sovittua ennakkoneuvottelussa. Neutraali etenemistilanne, ei keksitty lisäselvityspakko.

**Myöhempi tapahtuma / jatko:** Neutraali etenemiskortti. Jos kriittiset kausityöt tilataan ajoissa, vaiheittainen tarjouspyyntö ei synnytä ylimääräistä viivettä.

**Tausta:** L01

---

### [BESS-P2-01]

#### PELAAJALLE

**Kortin otsikko:** Akku tarvitsee sähköä myös sisäänpäin

**Korttiteksti:** Akun verkkotarkasteluun on ilmoitettu vain purkuteho. Verkkoyhtiö kysyy nyt, paljonko akku ottaisi verkosta ladatessaan. Tuulipuiston tuotantoliittymä ei vielä vastaa tähän.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään tarkastelu molemmille tehosuunnille

**Valinnan jälkeen näytetään:** Lataus- ja purkutehot toimitetaan verkkoyhtiölle. Myös tuulen, auringon ja akun yhtäaikainen käyttö kuvataan.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan lataamista omalla tuotannolla

**Valinnan jälkeen näytetään:** Suunnittelija selvittää, voitaisiinko akku ladata vain hankkeen omalla tuotannolla ja rajata verkosta ottoa. Verkkoyhtiö arvioi tämän käyttötavan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P2-01`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana. Alustava verkkotarkastelu ei kata tavoiteltua lataus- ja purkutehoa kokonaisuutena.

**Myöhempi tapahtuma / jatko:** EV-BESS-VERKKO: B edellyttää hyväksyttävää tehonhallintaa ja toimintarajoja. Säästö verkon ottotehossa voi rajoittaa akun käyttöä.

**Kytketyt tunnisteet:** `EV-BESS-VERKKO`

**Tausta:** B01 B02 B06

---

### [BESS-P2-02]

#### PELAAJALLE

**Kortin otsikko:** Sama megawatti, eri määrä energiaa

**Korttiteksti:** Kahdessa akkutarjouksessa teho on 100 MW. Toisessa energiakapasiteetti on 100 MWh ja toisessa 200 MWh. Halvempi tarjous ei siis kata samaa käyttöaikaa.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään tarjoukset 200 MWh:n kapasiteetille

**Valinnan jälkeen näytetään:** Toimittajat hinnoittelevat saman tavoitekapasiteetin. Myös käytettävä energia ja takuut otetaan vertailuun.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan 100 MWh:n akku

**Valinnan jälkeen näytetään:** Suunnittelua jatketaan pienemmällä energiakapasiteetilla. Sama purkuteho on käytettävissä lyhyemmän ajan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P2-02`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akusta on kaksi tarjousta: sama 100 MW:n teho mutta eri energiakapasiteetti. Laitevalintaa tai investointia ei ole vielä tehty.

**Myöhempi tapahtuma / jatko:** Kirjaa BESSin MW ja MWh erikseen. 100 MWh / 100 MW on ihanteellisesti tunti; käytettävä kapasiteetti ja häviöt täsmennetään laitetiedoissa.

**Tausta:** B07

---

### [BESS-P2-03]

#### PELAAJALLE

**Kortin otsikko:** Toimittajan mukaan kyse on vain kontista

**Korttiteksti:** Akkuvarastoa tarjotaan siirrettävänä konttiratkaisuna. Rakennusvalvonta pyytää kuitenkin asemapiirroksen ja tiedot pysyvästä käytöstä sekä laitteista.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään tämän paikan lupamenettely

**Valinnan jälkeen näytetään:** Rakennusvalvonnalle toimitetaan laite- ja sijoitustiedot. Tarvittava kaava- ja lupamenettely täsmennetään.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan valmista teollisuustonttia

**Valinnan jälkeen näytetään:** Akulle etsitään vaihtoehtoista paikkaa laitosalueelta. Sen käyttötarkoitus ja luvat tarkistetaan ennen valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P2-03`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana valmistelussa. Sen paikan ja käyttötavan kaava- ja lupatarvetta ei ole vielä sovittu rakennusvalvonnan kanssa.

**Myöhempi tapahtuma / jatko:** B muuttaa liityntäetäisyyttä ja maanhankintaa. Konttirakenne ei itsessään osoita luvantarvetta tai vapautusta siitä.

**Tausta:** B03 L12

---

### [BESS-P2-04]

#### PELAAJALLE

**Kortin otsikko:** Lisätään tähän vielä akku

**Korttiteksti:** Tuuli- ja aurinkohankkeen YVA-ohjelma on viimeisteltävänä. Omistaja haluaa lisätä sähköaseman yhteyteen akkuvaraston. Konsultti tarvitsee sen tiedot ennen aineiston valmistumista.

##### Valinta A

**Pyyhkäisyteksti:** Lisätään akku tähän arviointiin

**Valinnan jälkeen näytetään:** Akkuvaraston sijoitus, laitteet ja vaikutukset lisätään ohjelmaan. Aineiston viimeistely odottaa tarvittavia lähtötietoja.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään akku seuraavaan hankevaiheeseen

**Valinnan jälkeen näytetään:** Nykyinen suunnitelma etenee ilman akkua. Mahdollinen myöhempi akkuhanke valmistellaan erikseen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P2-04`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on uusi harkittava lisäosa, ei jo jätetty pois tai valmiiksi arvioitu.

**Myöhempi tapahtuma / jatko:** A aktivoi akkuosan vasta tiedon ja maanhallinnan mukaan. B poistaa tämän vaiheen akkuosan mutta ei peitä jo tiedossa olevia yhteisvaikutuksia.

**Tausta:** L01 B03 S11

---

### [BESS-P2-05]

#### PELAAJALLE

**Kortin otsikko:** Verkkovaatimusten aineisto puuttuu tarjouksesta

**Korttiteksti:** Akkutoimittajan tarjouksessa on laitteet ja asennus. Verkkoyhtiön tarvitsemia simulointimalleja ja järjestelmäteknisten vaatimusten osoittamista ei ole nimetty kenenkään vastuulle.

##### Valinta A

**Pyyhkäisyteksti:** Lisätään mallit ja osoittaminen toimitussisältöön

**Valinnan jälkeen näytetään:** Toimittajalta pyydetään hinta ja aikataulu tarvittaville malleille ja testiaineistoille. Tarjous täydennetään ennen päätöstä.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään tarjous toiselta toimittajalta

**Valinnan jälkeen näytetään:** Vertailuun pyydetään kokonaisuus, jossa verkkovaatimusten aineisto kuuluu toimitukseen. Valinta odottaa uutta tarjousta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P2-05`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana ja toimittajan tarjous ei sisällä sovellettavien verkkovaatimusten osoittamiseen tarvittavia malleja tai toimituksia.

**Myöhempi tapahtuma / jatko:** EV-BESS-TEKNIIKKA. Ei oleteta kaikkien malliversioiden tai grid-forming-ominaisuuksien olevan automaattisesti pakollisia; sovelletaan liittymän vaatimuksia.

**Kytketyt tunnisteet:** `EV-BESS-TEKNIIKKA`

**Tausta:** B06

---

**Tulokset, välitapahtumat ja vaiheen mahdolliset loput**

### [interludes[1][0]]

#### PELAAJALLE

**Tapahtuman otsikko:** Hanke esiteltiin kunnalle

**Tapahtumateksti:** Esittelit hankkeen kunnan luottamushenkilöille. Kysymykset koskivat etäisyyksiä, maisemaa ja kunnan hyötyjä. Kaava-aloitteen käsittely jatkuu erikseen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[1][0]`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Hankkeen lähtökohtia on esitelty kunnassa; ei vielä hyväksymispäätöstä. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[1][1]]

#### PELAAJALLE

**Tapahtuman otsikko:** YVA-ohjelmaa viimeistellään

**Tapahtumateksti:** Konsultti kokoaa hankevaihtoehdot ja selvityssuunnitelmat YVA-ohjelmaan. Sähkönsiirron reittivaihtoehdot lisätään samaan arviointikokonaisuuteen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[1][1]`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** YVA-ohjelmaa laaditaan käynnissä olevassa menettelyssä. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[1][2]]

#### PELAAJALLE

**Tapahtuman otsikko:** Selvityksiä on käynnissä

**Tapahtumateksti:** Maastotöitä, verkkotarkastelua ja kaava-aineistoa valmistellaan rinnakkain. Hankeryhmä käy läpi, mikä tulos tarvitaan seuraavaksi.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[1][2]`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Vähintään kaksi todellista valmistelutyötä etenee rinnakkain. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[1][3]]

#### PELAAJALLE

**Tapahtuman otsikko:** Ohjelmavaiheen yleisötilaisuus pidettiin

**Tapahtumateksti:** Yleisötilaisuudessa kysyttiin muun muassa melun, lajien ja sähkönsiirron selvittämisestä. Kysymykset toimitetaan konsultille ja yhteysviranomaiselle.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[1][3]`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** YVA-ohjelmavaiheen yleisötilaisuus on pidetty ja palaute kootaan. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [surveys-wait]

#### PELAAJALLE

**Tapahtuman otsikko:** Maastoselvitykset käynnistyvät

**Tapahtumateksti:** Tilatut maastoselvitykset aloitetaan. Havainnot kootaan YVA-selostusta ja kaavan valmistelua varten. Verkkoratkaisua ja sijoittelua tarkennetaan samalla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `surveys-wait`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Tarvittavat työt tilattu ja oikea havaintoaika alkanut. Älä käytä tätä viestiä väittämään kaikkia töitä jo valmiiksi.

**Tausta:** L01

---

### [surveys-wait::no-yva]

#### PELAAJALLE

**Tapahtuman otsikko:** Vaikutukset selvitetään silti.

**Tapahtumateksti:** Viranomainen on ratkaissut, ettei tämä hanke tarvitse erillistä YVA-menettelyä. Kaavoitusta ja lupia varten tilatut luonto- ja muut vaikutusselvitykset tehdään silti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `surveys-wait::no-yva`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Vain todettu yvaRequired=false ja kirjattu asiaa koskeva menettelyratkaisu.

**Tausta:** L01

---

### [EV-MAARIITA]

#### PELAAJALLE

**Tapahtuman otsikko:** Vuokrasopimuksen riitaan ratkaisu

**Tapahtumateksti:** Juristin jatkoneuvottelun tulos on saatu.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Sovinto syntyy:**
Maanomistaja hyväksyy täsmennetyn sopimuksen. Kiinteistö säilyy hankkeessa; neuvottelu- ja juristikulut jäävät maksettaviksi.

**Haara — Sovintoa ei synny valmisteluaikana:**
Sovintoa ei saada hankkeen aikataulussa. Yhtiö ei jatka riitaisen alueen rakentamissuunnitelmaa, vaan ottaa käyttöön korvaavan sijoittelun.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MAARIITA`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** UUSI-P1-MAARIITA/B; ratkaisun määräaika on täyttynyt.

**Myöhempi tapahtuma / jatko:** Sulje riita hankkeen sijoittelun kannalta. Tunnista vain toteutunut lisäviive ja kulu; ei samaa kiinteistön menetystä kahdesti.

**Tausta:** L10 V5-L1

---

### [EV-ETUSIJA]

#### PELAAJALLE

**Tapahtuman otsikko:** Etusijasta saatiin vastaus

**Tapahtumateksti:** Aiemman vuokraoikeuden haltija on vastannut ehdotukseen alueiden ja etusijan järjestämisestä.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Sopimusjärjestely hyväksytään:**
Aiempi vuokralainen suostuu rajaamaan omaa aluettaan ja tarvittava etusijajärjestely sovitaan. Hankkeen rakennusalue saadaan käyttöön sovitulla korvauksella.

**Haara — Aiempaa sopimusta ei muuteta:**
Aiempi vuokralainen ei luovu alueesta eikä suostu ehdotettuun järjestelyyn. Omalle rakentamiselle pitää löytää toinen paikka.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-ETUSIJA`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** UUSI-P1-05/A. Aiemman oikeuden sisältö ja ristiriita on oikeasti selvitetty.

**Myöhempi tapahtuma / jatko:** Kielteinen → korvaavan sijoittelun arvio EV-MAA:ssa. Ei automaattista etusijan parantumista lisämaksulla.

**Kytketyt tunnisteet:** `EV-MAA`

**Tausta:** L10 V5-L2

---

### [EV-SELVITYSJARJESTYS]

#### PELAAJALLE

**Tapahtuman otsikko:** Ensimmäinen selvityserä valmistui

**Tapahtumateksti:** Ensimmäisenä tilatun työn tulos on saatu. Seuraavan työerän aikataulu tarkentuu.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Luonto ensin: verkkotyö ehtii muiden töiden rinnalla:**
Maastoaineisto on koossa. Verkkokonsultti pääsee aloittamaan ajoissa, eikä tilausten järjestys pidennä koko hankkeen aikataulua.

**Haara — Luonto ensin: verkkoratkaisu vaatii uuden reitin:**
Luontoselvitykset valmistuvat, mutta myöhemmin aloitettu verkkoselvitys ohjaa uudelle johtoreitille. Sen suunnittelu jää nyt odotettavaksi työksi.

**Haara — Verkko ensin: maastokausi on vielä avoinna:**
Liitynnälle löytyy sopiva vaihtoehto. Maastotiimi ehtii tarvittaville käynneille samalla kaudella.

**Haara — Verkko ensin: maastokausi meni ohi:**
Liitynnän selvitys valmistuu vasta kevään havaintoajan jälkeen. Tarvittava kausiselvitys tehdään ensi vuonna; muita töitä jatketaan sillä aikaa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-SELVITYSJARJESTYS`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** UUSI-P1-09:n ensimmäinen tilaus valmis. Haaran perusteet: valittu työ, sen kesto, havaintoikkuna, seuraavan tiimin saatavuus ja todellinen verkkotulos.

**Myöhempi tapahtuma / jatko:** Kirjaa vain aikataulua todella pidentävä erotus. Menetetty maastokausi voi myöhemmin vaikuttaa vuokrasopimusten määräaikaan.

**Kytketyt tunnisteet:** `EV-MAAKUNTAODOTUS`

**Tausta:** L01 B01

---

### [EV-MAASTOKAUSI]

#### PELAAJALLE

**Tapahtuman otsikko:** Uuden maastokäynnin tulos

**Tapahtumateksti:** Konsultti on tarkistanut, riittävätkö havainnot vaikutusten arviointiin.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Käynti onnistuu:**
Uusi käynti osui sopiviin olosuhteisiin. Tältä kaudelta saatiin arviointiin riittävä havaintoaineisto.

**Haara — Täydennys ehtii samalle kaudelle:**
Aineistoon tarvitaan vielä yksi käynti. Konsultti ehtii tehdä sen tämän havaintokauden aikana.

**Haara — Sopiva havaintoaika meni ohi:**
Tälle kaudelle ei saatu riittävää aineistoa. Tarvittava täydentävä käynti siirtyy seuraavaan sopivaan havaintokauteen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MAASTOKAUSI`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** UUSI-P2-09/A tai muu yksilöity uusintakäynti. Ajankohta ja työn valmistuminen ratkaisevat viiveen.

**Myöhempi tapahtuma / jatko:** Kirjaa lisätyö ja vain todellinen lisäviive. Kielteinen/positiivinen lajihavainto ei ole sama asia kuin työn menetelmällinen onnistuminen.

**Tausta:** L04 L01

---

### [EV-PV]

#### PELAAJALLE

**Tapahtuman otsikko:** Puolustusvoimilta tuli vastaus

**Tapahtumateksti:** Puolustusvoimat on käsitellyt toimitetun sijoittelun ja enimmäiskorkeuden.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Suora puoltava kanta:**
Puolustusvoimat ei vastusta esitettyä hanketta. Voit jatkaa tällä sijoittelulla muiden selvitysten osalta.

**Haara — Tarvitaan VTT:n tutkavaikutusselvitys:**
Puolustusvoimat edellyttää VTT:n tutkavaikutusselvitystä ennen lopullista kantaansa. Selvitys tilataan, ja tulosta odotetaan.

**Haara — Korkeampi muutos ei sovi, vanha vaihtoehto säilyy:**
Puolustusvoimat ei puolla korkeampaa vaihtoehtoa. Aiemman lausunnon mukaisella korkeudella voidaan edelleen jatkaa.

**Haara — Vastustus koskee kaikkia selvitettyjä vaihtoehtoja:**
Puolustusvoimat vastustaa hanketta myös tutkituilla pienemmillä vaihtoehdoilla. Tuuliosan jatkamiselle ei löydy toteuttamiskelpoista ratkaisua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-PV`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Lausuntopyyntö käsitelty. VTT-vaatimus ei tarkoita vielä kielteistä lopputulosta.

**Myöhempi tapahtuma / jatko:** VTT-haara → EV-VTT-TULOS. Vanhan vaihtoehdon haara palauttaa lausunnon mukaisen mallin. Kaikkia koskeva este tarkistaa ensin mahdollisen aidosti itsenäisen aurinko-osan.

**Kytketyt tunnisteet:** `EV-VTT-TULOS`, `LOPPU-ULKOINEN`

**Tausta:** L06 S05

---

### [EV-VTT-TULOS]

#### PELAAJALLE

**Tapahtuman otsikko:** Tutkavaikutusselvityksestä lopullinen kanta

**Tapahtumateksti:** VTT:n tutkavaikutusselvitys valmistui. Puolustusvoimat on antanut sen perusteella uuden lausunnon.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Nykyinen vaihtoehto soveltuu:**
Puolustusvoimat ei vastusta selvitettyä sijoittelua. Voimalapaikat ja enimmäiskorkeus säilyvät.

**Haara — Vain suppeampi vaihtoehto soveltuu:**
Puolustusvoimat ei vastusta selvityksessä tarkasteltua suppeampaa vaihtoehtoa. Lausunnossa yksilöidyt voimalapaikat jätetään pois.

**Haara — Mikään tarkasteltu vaihtoehto ei sovellu:**
Tutkavalvonnan haitta jää liian suureksi myös suppeassa vaihtoehdossa. Puolustusvoimat vastustaa hanketta.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VTT-TULOS`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** EV-PV:n vaatima VTT-työ on tilattu ja valmis; lopullinen lausunto on saatu.

**Myöhempi tapahtuma / jatko:** Pienennys tarkistaa jäljellä olevien hankeosien jatkoedellytykset. Ulkoinen loppu vain aidon vaihtoehdottomuuden tapauksessa.

**Kytketyt tunnisteet:** `LOPPU-LAAJUUS`, `LOPPU-ULKOINEN`

**Tausta:** L06

---

### [external-1]

#### PELAAJALLE

**Tapahtuman otsikko:** Kunta sanoi ei.

**Tapahtumateksti:** Kunta päättää olla aloittamatta alueen kaavoitusta. Myöskään esitetty pienempi vaihtoehto ei saa tukea. Hankkeen kehitys päättyy tähän.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-1`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** L01

---

### [ext-initiative-priority]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavoitus ei käynnisty.

**Tapahtumateksti:** Kunta haluaa varata alueen muuhun maankäyttöön eikä käynnistä hankkeen kaavoitusta. Rajauksen muuttamista on selvitetty, mutta se ei muuta kunnan kantaa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-initiative-priority`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** L01

---

### [ext-initiative-owner]

#### PELAAJALLE

**Tapahtuman otsikko:** Omistajan strategia vaihtui.

**Tapahtumateksti:** Omistaja lopettaa tämän alueen hankekehityksen. Hankkeelle etsitään ostajaa, mutta siirto ei onnistu. Työ keskeytetään lopullisesti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-initiative-owner`

**Vaihe:** 2 — Kaava-aloite ja YVA-ohjelma

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** L01

---


## VAIHE 3: YVA-selostus ja kaavaluonnos

Kortit ja tapahtumat on koottu tähän pääasiallisen esiintymisvaiheen mukaan. Nimetty jatko voi palata aiempaan päätökseen; tarkka ajoitus määräytyy kunkin osion ehdoista.

**Vaiheen aloitus**

### [transition-2]

#### PELAAJALLE

**Tapahtuman otsikko:** YVA-selostus ja kaavaluonnos

**Tapahtumateksti:** Maastoselvitysten ja lähtötietojen perusteella laaditaan YVA-selostus ja kaavaluonnos. Nyt vertaillaan vaihtoehtojen vaikutuksia. Aineistot asetetaan kuultaviksi sovitun aikataulun mukaisesti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `transition-2`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** vaihesiirtymä · PÄIVITETTY

**Laukaisuehto:** Riittävä aineisto selostuksen ja kaavaluonnoksen valmisteluun. Kaikkien rinnakkaisten töiden ei tarvitse olla päättyneitä.

**Tausta:** L01

---

**Päätöskortit ja niiden variantit**

### [nature]

#### PELAAJALLE

**Kortin otsikko:** Sääksi lentää voimalapaikkojen kautta

**Korttiteksti:** Sääksi lentää pesältä kalavesille suoraan {count} suunnitellun voimalapaikan läpi. Lentoreitti toistuu maastoseurannassa. Pelkkä etäisyys pesään ei riitä ratkaisemaan sijoittelua.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan reitille osuvat voimalapaikat

**Valinnan jälkeen näytetään:** Lentoreitille osuvat paikat ja niiden tarpeettomat tiehaarat jätetään pois. Pienemmän sijoittelun vaikutukset tarkistetaan.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään reitin väistävä sijoittelu

**Valinnan jälkeen näytetään:** Voimaloille etsitään paikat lentoreitin ulkopuolelta. Lentohavaintoja verrataan uuteen sijoitteluun.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Säännöllinen sääksen lentoreitti on osoitettu. Samalle reitille ei tarjota toista saman vaiheen riskikorttia.

**Valinta A — vaikutus:** Poista vain tunnistetut affectedPlaceIds. Tarkista jäljellä olevan hankkeen koko.

**Valinta B — vaikutus:** Avaa vaihtoehdon arviointi. Paikkojen säilymistä ei vielä luvata.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n sääksihaarat. Jos siirto ei riitä ja pienempi toteuttamiskelpoinen vaihtoehto jää, UUSI-P4-01 avaa korjausvalinnan.

**Kytketyt tunnisteet:** `EV-LUONTO`, `UUSI-P4-01`

**Tausta:** S02 S03 S08

---

### [solarNature]

#### PELAAJALLE

**Kortin otsikko:** Viitasammakot löytyivät vanhasta altaasta

**Korttiteksti:** Entisen turvetuotantoalueen laskeutusaltaassa lisääntyy viitasammakko. Paneelisuunnitelmassa allas olisi kuivattu ja otettu rakennusalueeksi.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solarNature`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · aurinko / hybridi

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** S03 L04

---

### [UUSI-P3-KOSTEIKKO]

#### PELAAJALLE

**Kortin otsikko:** Märälle palstalle löytyi käyttöä

**Korttiteksti:** Aiemmin ostamallesi vettyneelle palstalle voisi tehdä kosteikon, joka tasaisi paneelikentän vesivirtaamia ja turvaisi nykyisen viitasammakon lisääntymispaikan vedensaannin. Suunnittelija esittää tätä kentän pienennyksen vaihtoehdoksi.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan kosteikko ja selvitetään sen toimivuus

**Valinnan jälkeen näytetään:** Kosteikon mitoitus, veden ohjaus ja toteutusaikataulu suunnitellaan. Luontokonsultti arvioi, säilyykö lisääntymispaikka toimivana.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään pienennetty paneelivaihtoehto

**Valinnan jälkeen näytetään:** Kosteikkoa ei liitetä tämän hankkeen ratkaisuun. Paneelikenttää pienennetään jo tutkittua vaihtoehtoa noudattaen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-KOSTEIKKO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI JATKOKORTTI

**Ehto / sijoitus:** wetlandReserveOwned=true; palsta samassa toimivassa valuma-alueessa; nykyinen lisääntymispaikka säilytettävissä; itsenäisesti syntyneen kuivatusongelman pienennetty perusvaihtoehto on jo hyväksyttävissä.

**Valinta A — vaikutus:** Avaa EV-KOSTEIKKO. Kosteikon on oltava toimiva ennen hankkeen vedensaantia muuttavia töitä. Tutki myös palstan nykyiset luontoarvot ja tarvittavat muut luvat.

**Valinta B — vaikutus:** Jatka tavallisella pienennysratkaisulla. Ei uutta haittaa vain ostetun palstan vuoksi.

**Myöhempi tapahtuma / jatko:** A → EV-KOSTEIKKO. Myönteisessä ketjussa LVV pitää vesitalouden turvaamista riittävästi osoitettuna ja paneeleita voidaan säilyttää enemmän.

**Kytketyt tunnisteet:** `EV-KOSTEIKKO`

**Toteutuksen rajaus:** Tämä ei tuhoa vanhaa lisääntymispaikkaa uuden kustannuksella eikä korvaa Natura-haittaa yleisellä luontohyvityksellä. Ilman ostosta korttia ei näytetä eikä ostamatta jättämisestä synny lisärangaistusta.

**Tausta:** L04 L07 V5-L3 V5-L4

---

### [noise]

#### PELAAJALLE

**Kortin otsikko:** Yhteismelu ylittää ohjearvon

**Korttiteksti:** Oman ja naapurihankkeen yhteismelulaskenta ylittää yöajan 40 dB:n ohjearvon asuin- ja lomarakennusten kohdalla. {countCap} omaa voimalaa vaikuttaa tulokseen eniten.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan näiden voimaloiden siirtoa

**Valinnan jälkeen näytetään:** Voimaloille etsitään kauempana sijaitsevat paikat ja niille tehdään uusi yhteismelulaskenta.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan hiljaisempi melumoodi

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään hiljaisemman käyttötilan takuuarvot. Melu ja menetettävä energiantuotanto lasketaan niiden perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `noise`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman yhteismelussa todettu yöajan ohjearvon ylitys; kohteet ja käyttötilanne on nimetty. Yksi saman ylityksen pääkortti.

**Vaihtoehtoinen aiheketju:** `tuulen_yhteismelu` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Arvioi käytettävissä olevat korvaavat kiinteistöt. Maankäyttöä ei saa olettaa vapaaksi aiemmasta kieltäytymisestä huolimatta.

**Valinta B — vaikutus:** Tuotantoarvio muuttuu vain mallinnetun käyttörajoituksen mukaan. MW-nimellisteho säilyy, ellei mallia vaihdeta.

**Myöhempi tapahtuma / jatko:** EV-MELU:ssa erilliset siirron ja käyttötilan tulokset. Takuuaineiston puute voi avata UUSI-P4-02:n.

**Kytketyt tunnisteet:** `EV-MELU`, `UUSI-P4-02`

**Tausta:** L03 S07

---

### [height]

#### PELAAJALLE

**Kortin otsikko:** Maanpinnan korkeus unohtui

**Korttiteksti:** Voimaloiden kokonaiskorkeuteen lisätään paikkojen maanpinnan korkeus. {countCap} voimalan lavankärki ylittää tämän jälkeen lentoaseman lentoesterajapinnan.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään nykyisten paikkojen kelpoisuus

**Valinnan jälkeen näytetään:** Lentoesteen esiselvitys tilataan. Nämä paikat jätetään avoimiksi selvityksen tulokseen asti.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan korvaavat paikat alempana

**Valinnan jälkeen näytetään:** Suunnittelija etsii alempana sijaitsevat paikat. Niiden ilmailu-, melu- ja luontovaikutukset sekä tuotantoarvio tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `height`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Alustavien voimalapaikkojen kokonaiskorkeus ja maanpinnan korkeus ylittävät tämän lentopaikan tarkastelupinnan. Sijaintikohtainen esiselvitys puuttuu.

**Vaihtoehtoinen aiheketju:** `lentoeste` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-ILMAILU. Selvitys voi sallia paikat, edellyttää paikkakohtaista muutosta tai sulkea ne pois. Ei samaa madallusta koko hankkeelle.

**Kytketyt tunnisteet:** `EV-ILMAILU`

**Tausta:** L05

---

### [solarWater]

#### PELAAJALLE

**Kortin otsikko:** Vesienkäsittely ei päättynyt turvetuotannon mukana

**Korttiteksti:** Turvetuotanto on päättynyt, mutta alueen vesienkäsittely ja tarkkailu jatkuvat lupaehtojen mukaan. Aurinkosuunnitelman paneelit peittäisivät vielä tarvittavat käsittelyrakenteet.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään vesienkäsittelyalue paneelien ulkopuolelle

**Valinnan jälkeen näytetään:** Altaat ja muut tarvittavat käsittelyrakenteet säilytetään. Paneelialue rajataan niiden ympäriltä pienemmäksi.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään korvaava vesienkäsittely

**Valinnan jälkeen näytetään:** Vesiasiantuntija tutkii vaihtoehtoisen käsittelyratkaisun. Mahdollinen lupamuutos valmistellaan ennen vanhojen rakenteiden muuttamista.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solarWater`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · aurinko / hybridi

**Ehto / sijoitus:** Aurinkoalue sijoittuu entiselle turvetuotantoalueelle, jonka voimassa olevat jälkihoito- ja vesienkäsittelyvelvoitteet kohdistuvat paneelien alustavaan paikkaan.

**Vaihtoehtoinen aiheketju:** `vanhan_turvealueen_jalkihoito` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n jälkihoitohaara. Aiemman toiminnan velvoitteet säilyvät, kunnes oikea menettely muuttaa niitä.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S02

---

### [opinions]

#### PELAAJALLE

**Kortin otsikko:** Havainnekuva puuttuu kylätieltä

**Korttiteksti:** Luonnospalautteessa pyydetään havainnekuvaa kylätieltä, jota asukkaat käyttävät päivittäin. Konsultin kuvasarjassa näkymää ei ole.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan kuva ja käydään se läpi asukkaiden kanssa

**Valinnan jälkeen näytetään:** Kuva tilataan ja sille sovitaan esittely. Asukkaiden huomiot otetaan maisema-arvion täydennykseen.

##### Valinta B

**Pyyhkäisyteksti:** Tilataan kuva ja liitetään se kirjallisiin vastauksiin

**Valinnan jälkeen näytetään:** Puuttuva kuva ja sen maisema-arvio lisätään vastineaineistoon. Kysymyksiin vastataan samassa koosteessa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `opinions`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Kaavaluonnoksen tai YVA-selostuksen kuulemisessa on tullut palautetta samasta paikallisesta vaikutuksesta. Mukana on hankkeen arvioinnista puuttuva näkymä.

**Myöhempi tapahtuma / jatko:** EV-PALAUTE näyttää tämän nimenomaisen havaintopuutteen käsittelyn tuloksen. Pelkkä mielipiteiden määrä tai tapaamistapa ei määrää kaavan lopputulosta.

**Kytketyt tunnisteet:** `EV-PALAUTE`

**Tausta:** L01

---

### [golden-known]

#### PELAAJALLE

**Kortin otsikko:** Maakotkan säännöllinen lentoreitti

**Korttiteksti:** Maakotkan lentoseurannassa {count} voimalapaikkaa erottuu törmäysriskiltään muista. Tunnetulla reviirillä on myös naapurihankkeita, joten oman sijoittelun muutos pitää tarkastella niiden kanssa.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan riskialttiit voimalapaikat

**Valinnan jälkeen näytetään:** Tunnistetut paikat jätetään pois. Maakotkan törmäysriski ja elinympäristövaikutukset arvioidaan pienemmälle sijoittelulle.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan lentoaineistolla toiset paikat

**Valinnan jälkeen näytetään:** Korvaavaa sijoittelua verrataan maakotkan lentoaineistoon ja naapurihankkeiden vaikutuksiin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `golden-known`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maakotkareviiri tai toistuva havainto liittyy näihin voimalapaikkoihin. Yksi maakotkan päätilanne pelikerrassa; jatkot vain sen tuloksina.

**Vaihtoehtoinen aiheketju:** `maakotkan_reviiri` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Poista määrätyt riskipaikat kerran.

**Valinta B — vaikutus:** Tilaa lajikohtainen vaihtoehtoarvio; golden-unknown tarvitsee myös riittävän pesä-/lentotiedon ennen johtopäätöstä.

**Myöhempi tapahtuma / jatko:** EV-KOTKA näyttää yhteisarvion tuloksen. Jos korjattavaa jää, UUSI-P4-01 käsittelee pienempää vaihtoehtoa.

**Kytketyt tunnisteet:** `EV-KOTKA`, `UUSI-P4-01`

**Tausta:** L08 S08 S03

---

### [golden-unknown]

#### PELAAJALLE

**Kortin otsikko:** Kotka näkyy, pesää ei löydy

**Korttiteksti:** Maakotka havaitaan hankealueella toistuvasti. Pesää ei tunneta ja lentoaineisto on vielä vajaa. Alustava arvio nostaa {count} voimalapaikkaa jatkoselvitykseen.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan riskialttiit voimalapaikat

**Valinnan jälkeen näytetään:** Tunnistetut paikat jätetään pois. Maakotkan törmäysriski ja elinympäristövaikutukset arvioidaan pienemmälle sijoittelulle.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan lentoaineistolla toiset paikat

**Valinnan jälkeen näytetään:** Korvaavaa sijoittelua verrataan maakotkan lentoaineistoon ja naapurihankkeiden vaikutuksiin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `golden-unknown`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maakotkareviiri tai toistuva havainto liittyy näihin voimalapaikkoihin. Yksi maakotkan päätilanne pelikerrassa; jatkot vain sen tuloksina.

**Vaihtoehtoinen aiheketju:** `maakotkan_reviiri` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Poista määrätyt riskipaikat kerran.

**Valinta B — vaikutus:** Tilaa lajikohtainen vaihtoehtoarvio; golden-unknown tarvitsee myös riittävän pesä-/lentotiedon ennen johtopäätöstä.

**Myöhempi tapahtuma / jatko:** EV-KOTKA näyttää yhteisarvion tuloksen. Jos korjattavaa jää, UUSI-P4-01 käsittelee pienempää vaihtoehtoa.

**Kytketyt tunnisteet:** `EV-KOTKA`, `UUSI-P4-01`

**Tausta:** L08 S08 S03

---

### [golden-shared]

#### PELAAJALLE

**Kortin otsikko:** Naapurin kotka olikin sama kotka

**Korttiteksti:** Naapurin selvityksen ja oman seurannan maakotka käyttää samaa reviiriä. Hankkeet ovat arvioineet vaikutuksia erikseen. Yhteistarkastelu nostaa {count} omaa paikkaa ongelmallisiksi.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan riskialttiit voimalapaikat

**Valinnan jälkeen näytetään:** Tunnistetut paikat jätetään pois. Maakotkan törmäysriski ja elinympäristövaikutukset arvioidaan pienemmälle sijoittelulle.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan lentoaineistolla toiset paikat

**Valinnan jälkeen näytetään:** Korvaavaa sijoittelua verrataan maakotkan lentoaineistoon ja naapurihankkeiden vaikutuksiin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `golden-shared`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maakotkareviiri tai toistuva havainto liittyy näihin voimalapaikkoihin. Yksi maakotkan päätilanne pelikerrassa; jatkot vain sen tuloksina.

**Vaihtoehtoinen aiheketju:** `maakotkan_reviiri` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Poista määrätyt riskipaikat kerran.

**Valinta B — vaikutus:** Tilaa lajikohtainen vaihtoehtoarvio; golden-unknown tarvitsee myös riittävän pesä-/lentotiedon ennen johtopäätöstä.

**Myöhempi tapahtuma / jatko:** EV-KOTKA näyttää yhteisarvion tuloksen. Jos korjattavaa jää, UUSI-P4-01 käsittelee pienempää vaihtoehtoa.

**Kytketyt tunnisteet:** `EV-KOTKA`, `UUSI-P4-01`

**Tausta:** L08 S08 S03

---

### [nature-reindeer-calving]

#### PELAAJALLE

**Kortin otsikko:** Metsäpeuran vasomisalue löytyi sijoittelusta

**Korttiteksti:** Metsäpeurojen vasomisajan havainnot keskittyvät {count} voimalapaikan ja niiden teiden ympäristöön. Rakentamisen ajoittaminen eri vuodenaikaan auttaisi työmaahäiriöön, mutta ei poistaisi pysyvän sijoittelun vaikutuksia.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään vasomisalueen paikat pois

**Valinnan jälkeen näytetään:** Voimalapaikat ja niiden tiehaarat poistetaan vasomisalueelta. Jäljelle jäävien paikkojen häiriövaikutus tarkistetaan.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään paikkojen siirtoa kauemmas

**Valinnan jälkeen näytetään:** Suunnittelija etsii korvaavat paikat. Metsäpeuraselvityksessä arvioidaan, jääkö vasomisalueelle edelleen häiriötä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature-reindeer-calving`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran todellinen esiintymis-/vaikutusalue; ei poronhoitokortin vastineena kaikkialle Lappiin.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n metsäpeuran vasomisaluehaara. Ei yleistä kaikille alueille samaa suojavyöhykemittaa.

**Kytketyt tunnisteet:** `EV-LUONTO`, `UUSI-P4-01`

**Tausta:** S03 S13 L02

---

### [nature-reindeer-route]

#### PELAAJALLE

**Kortin otsikko:** Voimalat katkaisisivat metsäpeuran kulkuyhteyden

**Korttiteksti:** Paikannukset osoittavat metsäpeurojen kulkevan Natura-alueiden ja kesälaidunten välillä hankealueen läpi. {countCap} voimalapaikkaa tiehaaroineen kaventaisi juuri tätä yhteyttä.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään kulkuyhteydelle osuvat paikat pois

**Valinnan jälkeen näytetään:** Voimalat ja tarpeettomat tiet rajataan pois todetulta kulkuyhteydeltä. Muutetun sijoittelun vaikutus arvioidaan.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kulkuyhteyttä kiertävä sijoittelu

**Valinnan jälkeen näytetään:** Paikkoja ja teitä siirretään vaihtoehtoon, jonka toimivuus tarkistetaan metsäpeuran seuranta-aineistolla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature-reindeer-route`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran todellinen esiintymis-/vaikutusalue; ei poronhoitokortin vastineena kaikkialle Lappiin.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n kulkuyhteyshaara; Natura-vaikutuksen ollessa todettu lisäksi EV-NATURA, mutta samoja poistoja ei lasketa kahdesti.

**Kytketyt tunnisteet:** `EV-LUONTO`, `EV-NATURA`, `UUSI-P4-01`

**Tausta:** S03 S13 L02

---

### [nature-squirrel]

#### PELAAJALLE

**Kortin otsikko:** Pesäpuu säästyy. Kulkuyhteys ei.

**Korttiteksti:** Liito-oravan pesäpuu on jätetty rakentamisen ulkopuolelle. {countCap} voimalapaikan huoltotiet kuitenkin katkaisisivat puustoisen yhteyden pesäpuulta ruokailumetsään.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään yhteyden katkaisevat paikat pois

**Valinnan jälkeen näytetään:** Kyseiset voimalapaikat ja niiden tiehaarat poistetaan. Pesäpuun ja ruokailumetsän välinen puusto voidaan säilyttää.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan tiehaarat uudelleen

**Valinnan jälkeen näytetään:** Teille etsitään linjaukset, jotka eivät katkaise kulkuyhteyttä. Konsultti tarkistaa puuston riittävyyden uuden suunnitelman jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature-squirrel`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Liito-oravan lisääntymispaikka ja sen puustoinen kulkuyhteys on todettu. Nimettyjen voimaloiden tiet katkaisisivat tämän yhteyden.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n liito-oravahaara. Tieongelma ei muutu automaattisesti törmäysriskiksi eikä yksittäinen pesäpuu kuvaa koko toimivaa paikkaa.

**Kytketyt tunnisteet:** `EV-LUONTO`, `UUSI-P4-01`

**Tausta:** L04 S02

---

### [nature-bird-area]

#### PELAAJALLE

**Kortin otsikko:** Pelto osoittautui tärkeäksi levähdysalueeksi

**Korttiteksti:** Muutonseuranta osoittaa peltoalueen keräävän säännöllisesti suuria lintumääriä. {countCap} voimalaa sijoittuisi niiden tärkeimmän levähdys- ja ruokailualueen kohdalle.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan keskeiselle levähdysalueelle osuvat paikat

**Valinnan jälkeen näytetään:** Linnuille tärkeimmät alueet jätetään voimaloiden ulkopuolelle. Pienemmän hankkeen linnustovaikutukset päivitetään.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään sijoittelua peltoalueen ulkopuolella

**Valinnan jälkeen näytetään:** Vaihtoehtoiset paikat viedään linnustoarvioon. Myös lintujen lentoreitit peltojen ja yöpymisalueiden välillä tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature-bird-area`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maastohavainnot osoittavat lintujen käyttämän levähdys- tai ruokailualueen. Nimetyt voimalapaikat sijoittuvat sen keskeiseen osaan.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n levähdysaluehaara. Linnustollinen arvo ja oikeudellinen suojaperuste yksilöidään; pelkkä lintujen näkyminen ei ole yleinen rakentamiskielto.

**Kytketyt tunnisteet:** `EV-LUONTO`, `UUSI-P4-01`

**Tausta:** S02 S03 S08

---

### [herding-pasture]

#### PELAAJALLE

**Kortin otsikko:** Laidunten välinen kulku kapenee

**Korttiteksti:** Paliskunnan mukaan {count} voimalapaikkaa ja niiden tiet osuvat porojen käyttämälle laidunten väliselle reitille. Naapurihanke kaventaa samaa yhteyttä toiselta puolelta.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään reitille osuvat voimalapaikat pois

**Valinnan jälkeen näytetään:** Oman hankkeen paikkoja ja tiehaaroja poistetaan kulkureitiltä. Paliskunnan tiedot otetaan pienemmän vaihtoehdon arvioon.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan paikat laidunreitin ulkopuolelle

**Valinnan jälkeen näytetään:** Korvaavat paikat ja tiet käydään läpi paliskunnan kanssa. Laidunkierron toimivuus arvioidaan myös naapurihanke huomioiden.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `herding-pasture`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi; vain poronhoitoalue

**Ehto / sijoitus:** Poronhoitoalue ja paliskunnan osoittama kulkuyhteys; ei metsäpeuran korvaava yleiskortti.

**Myöhempi tapahtuma / jatko:** EV-PORO. Paliskunnan aineisto on arvioinnin lähtötietoa, ei yksin lupapäätös.

**Kytketyt tunnisteet:** `EV-PORO`, `UUSI-P4-01`

**Tausta:** L09 S06 S13

---

### [noise-neighbour-model]

#### PELAAJALLE

**Kortin otsikko:** Naapuri vaihtoi voimalamallia

**Korttiteksti:** Naapurihanke ottaa suunnitteluun uuden voimalamallin. Päivitetty yhteismelulaskenta ylittää yöajan 40 dB:n ohjearvon lähimmillä asuin- ja lomarakennuksilla. {countCap} omaa voimalaa vaikuttaa eniten.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan näiden voimaloiden siirtoa

**Valinnan jälkeen näytetään:** Voimaloille etsitään kauempana sijaitsevat paikat ja niille tehdään uusi yhteismelulaskenta.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan hiljaisempi melumoodi

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään hiljaisemman käyttötilan takuuarvot. Melu ja menetettävä energiantuotanto lasketaan niiden perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `noise-neighbour-model`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman yhteismelussa todettu yöajan ohjearvon ylitys; kohteet ja käyttötilanne on nimetty. Yksi saman ylityksen pääkortti.

**Vaihtoehtoinen aiheketju:** `tuulen_yhteismelu` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Arvioi käytettävissä olevat korvaavat kiinteistöt. Maankäyttöä ei saa olettaa vapaaksi aiemmasta kieltäytymisestä huolimatta.

**Valinta B — vaikutus:** Tuotantoarvio muuttuu vain mallinnetun käyttörajoituksen mukaan. MW-nimellisteho säilyy, ellei mallia vaihdeta.

**Myöhempi tapahtuma / jatko:** EV-MELU:ssa erilliset siirron ja käyttötilan tulokset. Takuuaineiston puute voi avata UUSI-P4-02:n.

**Kytketyt tunnisteet:** `EV-MELU`, `UUSI-P4-02`

**Tausta:** L03 S07

---

### [noise-neighbour-layout]

#### PELAAJALLE

**Kortin otsikko:** Naapuri siirsi voimalansa lähemmäs

**Korttiteksti:** Naapurihankkeen voimaloita siirretään lähemmäs yhteistä lähintä loma-asuntoa. Uusi yhteismelulaskenta ylittää siellä yöajan 40 dB:n ohjearvon. Omasta hankkeesta {count} paikkaa on tarkasteltava uudelleen.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan näiden voimaloiden siirtoa

**Valinnan jälkeen näytetään:** Voimaloille etsitään kauempana sijaitsevat paikat ja niille tehdään uusi yhteismelulaskenta.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan hiljaisempi melumoodi

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään hiljaisemman käyttötilan takuuarvot. Melu ja menetettävä energiantuotanto lasketaan niiden perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `noise-neighbour-layout`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman yhteismelussa todettu yöajan ohjearvon ylitys; kohteet ja käyttötilanne on nimetty. Yksi saman ylityksen pääkortti.

**Vaihtoehtoinen aiheketju:** `tuulen_yhteismelu` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Arvioi käytettävissä olevat korvaavat kiinteistöt. Maankäyttöä ei saa olettaa vapaaksi aiemmasta kieltäytymisestä huolimatta.

**Valinta B — vaikutus:** Tuotantoarvio muuttuu vain mallinnetun käyttörajoituksen mukaan. MW-nimellisteho säilyy, ellei mallia vaihdeta.

**Myöhempi tapahtuma / jatko:** EV-MELU:ssa erilliset siirron ja käyttötilan tulokset. Takuuaineiston puute voi avata UUSI-P4-02:n.

**Kytketyt tunnisteet:** `EV-MELU`, `UUSI-P4-02`

**Tausta:** L03 S07

---

### [noise-joint]

#### PELAAJALLE

**Kortin otsikko:** Erilliset melukartat eivät riittäneet

**Korttiteksti:** Oman ja naapurihankkeen erilliset melukartat alittavat ohjearvot. Yhteislaskennassa yöajan 40 dB:n ohjearvo kuitenkin ylittyy lähimmillä asuin- ja lomarakennuksilla. Tarkasteluun nousee {count} omaa voimalaa.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan näiden voimaloiden siirtoa

**Valinnan jälkeen näytetään:** Voimaloille etsitään kauempana sijaitsevat paikat ja niille tehdään uusi yhteismelulaskenta.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan hiljaisempi melumoodi

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään hiljaisemman käyttötilan takuuarvot. Melu ja menetettävä energiantuotanto lasketaan niiden perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `noise-joint`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman yhteismelussa todettu yöajan ohjearvon ylitys; kohteet ja käyttötilanne on nimetty. Yksi saman ylityksen pääkortti.

**Vaihtoehtoinen aiheketju:** `tuulen_yhteismelu` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Arvioi käytettävissä olevat korvaavat kiinteistöt. Maankäyttöä ei saa olettaa vapaaksi aiemmasta kieltäytymisestä huolimatta.

**Valinta B — vaikutus:** Tuotantoarvio muuttuu vain mallinnetun käyttörajoituksen mukaan. MW-nimellisteho säilyy, ellei mallia vaihdeta.

**Myöhempi tapahtuma / jatko:** EV-MELU:ssa erilliset siirron ja käyttötilan tulokset. Takuuaineiston puute voi avata UUSI-P4-02:n.

**Kytketyt tunnisteet:** `EV-MELU`, `UUSI-P4-02`

**Tausta:** L03 S07

---

### [height-ground]

#### PELAAJALLE

**Kortin otsikko:** Korkeusmalli muutti tulosta

**Korttiteksti:** Tarkempi maanpinnan korkeusmalli nostaa {count} voimalapaikan lavankärjen lentoesterajapinnan yläpuolelle. Alustava tarkastelu oli tehty karkeammalla maastotiedolla.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään nykyisten paikkojen kelpoisuus

**Valinnan jälkeen näytetään:** Lentoesteen esiselvitys tilataan. Nämä paikat jätetään avoimiksi selvityksen tulokseen asti.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan korvaavat paikat alempana

**Valinnan jälkeen näytetään:** Suunnittelija etsii alempana sijaitsevat paikat. Niiden ilmailu-, melu- ja luontovaikutukset sekä tuotantoarvio tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `height-ground`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Uusi korkeusmalli muuttaa nimettyjen voimalapaikkojen korkeusasemaa ilmailutarkastelussa. Maaston ja esteen korkeudet on erotettu.

**Vaihtoehtoinen aiheketju:** `lentoeste` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-ILMAILU. Selvitys voi sallia paikat, edellyttää paikkakohtaista muutosta tai sulkea ne pois. Ei samaa madallusta koko hankkeelle.

**Kytketyt tunnisteet:** `EV-ILMAILU`

**Tausta:** L05

---

### [height-approach]

#### PELAAJALLE

**Kortin otsikko:** Voimalapaikat osuvat lähestymissuuntaan

**Korttiteksti:** Lentoaseman tarkastelussa {count} voimalaa sijoittuu lähestymisen kannalta hankalaan kohtaan. Nykyisten paikkojen kelpoisuus tarvitsee tarkemman selvityksen.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään nykyisten paikkojen kelpoisuus

**Valinnan jälkeen näytetään:** Lentoesteen esiselvitys tilataan. Nämä paikat jätetään avoimiksi selvityksen tulokseen asti.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan korvaavat paikat alempana

**Valinnan jälkeen näytetään:** Suunnittelija etsii alempana sijaitsevat paikat. Niiden ilmailu-, melu- ja luontovaikutukset sekä tuotantoarvio tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `height-approach`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Nimettyjen voimalapaikkojen ilmailuvaikutus kohdistuu lentoaseman lähestymiseen. Selvitystä tarvitaan juuri näille paikoille.

**Vaihtoehtoinen aiheketju:** `lentoeste` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-ILMAILU. Selvitys voi sallia paikat, edellyttää paikkakohtaista muutosta tai sulkea ne pois. Ei samaa madallusta koko hankkeelle.

**Kytketyt tunnisteet:** `EV-ILMAILU`

**Tausta:** L05

---

### [height-ridge]

#### PELAAJALLE

**Kortin otsikko:** Tuulisin harjanne on ilmailulle hankalin

**Korttiteksti:** Tuotantoarvion parhaat {count} voimalapaikkaa ovat harjanteella, jolla lentoesterajapinta ylittyy. Alempana olisi vaihtoehtoisia paikkoja, mutta tuuliolosuhteet ovat heikommat.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään nykyisten paikkojen kelpoisuus

**Valinnan jälkeen näytetään:** Lentoesteen esiselvitys tilataan. Nämä paikat jätetään avoimiksi selvityksen tulokseen asti.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan korvaavat paikat alempana

**Valinnan jälkeen näytetään:** Suunnittelija etsii alempana sijaitsevat paikat. Niiden ilmailu-, melu- ja luontovaikutukset sekä tuotantoarvio tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `height-ridge`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tuotannon kannalta tavoiteltu harjanne nostaa nimettyjen voimalapaikkojen ilmailuriskin. Alempia vaihtoehtoja on vielä mahdollista tutkia.

**Vaihtoehtoinen aiheketju:** `lentoeste` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-ILMAILU. Selvitys voi sallia paikat, edellyttää paikkakohtaista muutosta tai sulkea ne pois. Ei samaa madallusta koko hankkeelle.

**Kytketyt tunnisteet:** `EV-ILMAILU`

**Tausta:** L05

---

### [solar-nest-water]

#### PELAAJALLE

**Kortin otsikko:** Turvetuotanto loppui, linnut tulivat

**Korttiteksti:** Entisen turvetuotantoalueen vettynyt osa on kehittynyt tärkeäksi lintujen levähdysalueeksi. Aurinkosuunnitelmassa samalle kohdalle on piirretty paneelikenttä.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään tärkein levähdysalue paneeleitta

**Valinnan jälkeen näytetään:** Lintujen käyttämä ydinalue jää rakentamatta. Paneelikenttää pienennetään ja linnustovaikutukset päivitetään.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan toisenlaista kenttärajausta

**Valinnan jälkeen näytetään:** Paneelilohkoja sovitetaan lintujen käyttämän alueen ympärille. Konsultti arvioi, jääkö levähdys- ja ruokailualue toimivaksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-nest-water`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · aurinko / hybridi

**Ehto / sijoitus:** Entisen turvetuotantoalueen märällä osalla on osoitettu lintujen levähdys- tai ruokailuarvo. Tämä ei ole viitasammakon poikkeuslupakortti.

**Vaihtoehtoinen aiheketju:** `paneelien_linnusto` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n linnustohaara. Kyse ei ole viitasammakon poikkeusluvasta; varmista linnuston todellinen merkitys ja sovellettava suojeluperuste.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`

**Tausta:** S02 S03

---

### [solar-frog-basin]

#### PELAAJALLE

**Kortin otsikko:** Allas piti kuivata. Siellä lisääntyy viitasammakko.

**Korttiteksti:** Kuivatettavaksi suunniteltu vanha laskeutusallas osoittautuu viitasammakon lisääntymispaikaksi. Kentän kuivatus vaikuttaisi myös veden säilymiseen altaassa.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-frog-basin`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · aurinko / hybridi

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** S03 L04

---

### [solar-required-wetland]

#### PELAAJALLE

**Kortin otsikko:** Vesienhallinta vie paneelialaa

**Korttiteksti:** Vesienhallintasuunnitelma tarvitsee suuren viivytysalueen keskeltä paneelikenttää. Tiiviimpi allasratkaisu voisi jättää enemmän tilaa paneeleille, mutta se vaatisi tarkempaa suunnittelua.

##### Valinta A

**Pyyhkäisyteksti:** Varataan tila laajalle viivytysalueelle

**Valinnan jälkeen näytetään:** Paneelirivejä poistetaan ja niiden paikalle varataan viivytysalue. Ratkaisu viedään kaava-aineistoon.

##### Valinta B

**Pyyhkäisyteksti:** Mitoitetaan tiiviimpi allasratkaisu

**Valinnan jälkeen näytetään:** Suunnittelija laskee tiiviimmän ratkaisun mitoituksen ja kustannukset. Paneeliala pysyy toistaiseksi suunnittelussa mukana.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-required-wetland`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · aurinko / hybridi

**Ehto / sijoitus:** Paneelikentän valumien hallinta edellyttää laskelman mukaan viivytystilaa. Kyse ei välttämättä ole turvetuotannon vanhasta lupavelvoitteesta.

**Myöhempi tapahtuma / jatko:** EV-VESI:n uuden käsittelyratkaisun haara. Tämän kortin kohde ei ole automaattisesti turvetuotannon jälkihoitoallas.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S02

---

### [solar-postcare]

#### PELAAJALLE

**Kortin otsikko:** Jälkihoito tarvitsee edelleen altaat

**Korttiteksti:** Entisen turvealueen paneelikenttää pitäisi laajentaa laskeutusaltaiden kohdalle. Altaiden ja tarkkailun poistamiseen ei ole vielä viranomaisen ratkaisua.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään vesienkäsittelyalue paneelien ulkopuolelle

**Valinnan jälkeen näytetään:** Altaat ja muut tarvittavat käsittelyrakenteet säilytetään. Paneelialue rajataan niiden ympäriltä pienemmäksi.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään korvaava vesienkäsittely

**Valinnan jälkeen näytetään:** Vesiasiantuntija tutkii vaihtoehtoisen käsittelyratkaisun. Mahdollinen lupamuutos valmistellaan ennen vanhojen rakenteiden muuttamista.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-postcare`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · aurinko / hybridi

**Ehto / sijoitus:** Paneeleita suunnitellaan entisen turvetuotantoalueen edelleen käytössä olevien vesienkäsittelyrakenteiden paikalle. Jälkihoidon päättymistä ei ole vahvistettu.

**Vaihtoehtoinen aiheketju:** `vanhan_turvealueen_jalkihoito` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n jälkihoitohaara. Aiemman toiminnan velvoitteet säilyvät, kunnes oikea menettely muuttaa niitä.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S02

---

### [opinions-photo]

#### PELAAJALLE

**Kortin otsikko:** Asukkaan piha ei näy havainnekuvissa

**Korttiteksti:** Asukas toimittaa kuvan omalta pihaltaan. Hänen mukaansa juuri tähän suuntaan sijoittuisi näkyvin voimalaryhmä. Aiemmat kuvat on otettu toisilta teiltä.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään kuva pyydetystä näkymästä

**Valinnan jälkeen näytetään:** Konsultti tarkistaa katselupaikan ja laatii täydentävän havainnekuvan. Maisemavaikutus voidaan arvioida myös tältä suunnalta.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan ensin edustavat kuvauspaikat

**Valinnan jälkeen näytetään:** Konsultti käy läpi, kattaako nykyinen kuvasarja saman näkymän. Tarvittaessa uusi kuva tilataan, mutta pienellä lisäviiveellä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `opinions-photo`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Asukas on yksilöinyt havainnekuvasarjasta puuttuvan, todellista maisemavaikutusta kuvaavan katselupaikan.

**Myöhempi tapahtuma / jatko:** EV-PALAUTE näyttää tämän nimenomaisen havaintopuutteen käsittelyn tuloksen. Pelkkä mielipiteiden määrä tai tapaamistapa ei määrää kaavan lopputulosta.

**Kytketyt tunnisteet:** `EV-PALAUTE`

**Tausta:** L01

---

### [opinions-club]

#### PELAAJALLE

**Kortin otsikko:** Yhdistyksen kartassa on uusi lajipiste

**Korttiteksti:** Paikallinen yhdistys toimittaa luontohavaintokartan. Yksi havainto on lähellä suunniteltua tietä eikä näy hankkeen selvityksissä. Havaintoaika ja laji pitää varmistaa.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään tarkat tiedot ja tarkistetaan maastossa

**Valinnan jälkeen näytetään:** Havaitsijalta pyydetään lisätiedot ja tarvittava maastokäynti tilataan. Tielinjaus pidetään tältä kohdalta avoimena.

##### Valinta B

**Pyyhkäisyteksti:** Verrataan havaintoa ensin nykyiseen aineistoon

**Valinnan jälkeen näytetään:** Luontokonsultti tarkistaa, onko havainto jo huomioitu toisessa aineistossa. Uusi käynti tilataan, jos olennainen tieto puuttuu.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `opinions-club`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Paikallinen yhdistys toimittaa uuden mahdollisesti olennaisen luontohavainnon. Havainnon paikka, aika ja luotettavuus on selvitettävä.

**Myöhempi tapahtuma / jatko:** EV-PALAUTE näyttää tämän nimenomaisen havaintopuutteen käsittelyn tuloksen. Pelkkä mielipiteiden määrä tai tapaamistapa ei määrää kaavan lopputulosta.

**Kytketyt tunnisteet:** `EV-PALAUTE`

**Tausta:** L01

---

### [opinions-noise]

#### PELAAJALLE

**Kortin otsikko:** Sama melukysymys sadassa viestissä

**Korttiteksti:** Asukkaat kysyvät, onko naapurin tuulihanke mukana melulaskennassa. Viesteissä toistuu sama huoli. Raportin yhteismelukartta löytyy liitteestä, jota ei ollut hankesivulla.

##### Valinta A

**Pyyhkäisyteksti:** Julkaistaan liite ja pidetään esittely

**Valinnan jälkeen näytetään:** Yhteismelukartta lisätään sivulle ja tulokset käydään läpi yleisötilaisuudessa. Puuttuva liite on nyt kaikkien saatavilla.

##### Valinta B

**Pyyhkäisyteksti:** Julkaistaan liite ja kirjallinen selitys

**Valinnan jälkeen näytetään:** Liite ja yhteismelulaskennan selitys julkaistaan. Asukkaiden kysymyksiin kootaan vastaukset ilman uutta tilaisuutta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `opinions-noise`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Asukkaiden palautteessa on toistuva yhteismelua koskeva kysymys. Tähän tilanteeseen on käytettävissä ajantasainen laskenta tai sen täsmällinen täydennystarve.

**Myöhempi tapahtuma / jatko:** EV-PALAUTE näyttää tämän nimenomaisen havaintopuutteen käsittelyn tuloksen. Pelkkä mielipiteiden määrä tai tapaamistapa ei määrää kaavan lopputulosta.

**Kytketyt tunnisteet:** `EV-PALAUTE`

**Tausta:** L01

---

### [herding-opinions]

#### PELAAJALLE

**Kortin otsikko:** Paneeliaita osuu laidunreitille

**Korttiteksti:** Paliskunta osoittaa kaavaluonnoksesta kohdan, jossa paneeliaita kaventaisi porojen siirtymistä laitumelta toiselle. Tätä reittiä ei käsitelty nykyisessä poronhoitoarviossa.

##### Valinta A

**Pyyhkäisyteksti:** Käydään aitalinjaus läpi paliskunnan kanssa

**Valinnan jälkeen näytetään:** Aitalinjaus ja porojen reitti käydään läpi samalta kartalta. Konsultti täydentää arvion ehdotetulla muutoksella.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään reittitiedot ja suunnitellaan uusi linjaus

**Valinnan jälkeen näytetään:** Paliskunnan reittitiedot toimitetaan suunnittelijalle. Uusi aitalinjaus viedään poronhoitoarvioon.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `herding-opinions`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Hanke sijoittuu poronhoitoalueelle. Paliskunta on yksilöinyt aidan, tien tai voimaloiden vaikutuksen laidunkiertoon; ei käytetä metsäpeurakortin korvikkeena muualla.

**Myöhempi tapahtuma / jatko:** EV-PALAUTE näyttää tämän nimenomaisen havaintopuutteen käsittelyn tuloksen. Pelkkä mielipiteiden määrä tai tapaamistapa ei määrää kaavan lopputulosta.

**Kytketyt tunnisteet:** `EV-PALAUTE`

**Tausta:** L09 S06 S13

---

### [solar-pond]

#### PELAAJALLE

**Kortin otsikko:** Kevät paljasti viitasammakon lisääntymispaikan

**Korttiteksti:** Keväällä täyttyvä painanne osoittautuu viitasammakon lisääntymispaikaksi. Paneelikentän salaojitus laskisi sen vedenpintaa.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-pond`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** L04 S02 S03

---

### [solar-ditch]

#### PELAAJALLE

**Kortin otsikko:** Oja tuo veden lisääntymislammikkoon

**Korttiteksti:** Hankealueen oja tuo vettä viitasammakon lisääntymispaikalle. Paneelikentän kuivatussuunnitelma siirtäisi tämän veden toiseen purkusuuntaan.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-ditch`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** L04 S02 S03

---

### [solar-water]

#### PELAAJALLE

**Kortin otsikko:** Kuivatus ulottuu lisääntymispaikalle

**Korttiteksti:** Paneelikentän kuivatus voisi laskea läheisen viitasammakkolammikon vedenpintaa, vaikka itse lammikko on rakentamisalueen ulkopuolella.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-water`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** L04 S02 S03

---

### [solar-squirrel]

#### PELAAJALLE

**Kortin otsikko:** Paneelialue katkaisisi liito-oravan yhteyden

**Korttiteksti:** Paneelikentän raivaus katkaisisi puustoisen yhteyden liito-oravan lisääntymispaikalta ruokailumetsään. Nykyisessä kuvassa koko metsäkaistale on paneelialuetta.

##### Valinta A

**Pyyhkäisyteksti:** Säilytetään puustoinen yhteys

**Valinnan jälkeen näytetään:** Metsäkaistale jätetään raivaamatta ja paneelirivejä vähennetään sen verran. Lisääntymispaikan yhteys ruokailumetsään säilytetään.

##### Valinta B

**Pyyhkäisyteksti:** Siirretään paneelilohkoja

**Valinnan jälkeen näytetään:** Lohkojakoa muutetaan niin, että puustoinen yhteys voisi jäädä niiden väliin. Luontokonsultti tarkistaa uuden ratkaisun.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-squirrel`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Paneeliraivaus katkaisisi todetun liito-oravan lisääntymispaikan puustoisen yhteyden. Metsäalue ja paneelilohko ovat vielä rajattavissa.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n liito-oravahaara. Viitasammakon vesitalous- tai poikkeuslupahaaraa ei käytetä.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`

**Tausta:** L04 S02 S03

---

### [solar-bird-area]

#### PELAAJALLE

**Kortin otsikko:** Paneelit osuvat muuttolintujen levähdysalueelle

**Korttiteksti:** Muuttolintuselvitys osoittaa pellon keskiosan säännöllisesti käytetyksi levähdys- ja ruokailualueeksi. Paneelikenttä peittäisi tämän alueen.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään tärkein levähdysalue paneeleitta

**Valinnan jälkeen näytetään:** Lintujen käyttämä ydinalue jää rakentamatta. Paneelikenttää pienennetään ja linnustovaikutukset päivitetään.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan toisenlaista kenttärajausta

**Valinnan jälkeen näytetään:** Paneelilohkoja sovitetaan lintujen käyttämän alueen ympärille. Konsultti arvioi, jääkö levähdys- ja ruokailualue toimivaksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-bird-area`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Paneelikentälle suunnitellulla pellolla on todettu lintujen säännöllinen levähdys- ja ruokailualue.

**Vaihtoehtoinen aiheketju:** `paneelien_linnusto` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n linnustohaara. Kyse ei ole viitasammakon poikkeusluvasta; varmista linnuston todellinen merkitys ja sovellettava suojeluperuste.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`

**Tausta:** L04 S02 S03

---

### [solar-view-road]

#### PELAAJALLE

**Kortin otsikko:** Paneelit näkyisivät suoraan naapurin olohuoneeseen

**Korttiteksti:** Naapurin olohuoneesta näkyisi paneelikenttä puuston poiston jälkeen. Jätätkö riittävän alueen puustolle vai siirrätkö paneelit maaston alempaan kohtaan?

##### Valinta A

**Pyyhkäisyteksti:** Jätetään puustoinen suojakaista

**Valinnan jälkeen näytetään:** Osa suunnitellusta paneelialasta jätetään puustolle. Sen säilyttämisestä sovitaan ja näkyvyys tarkistetaan myös ilman lehtiä.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan paneelien sijoittamista alemmas

**Valinnan jälkeen näytetään:** Paneeliriveille etsitään alemmat paikat. Maaperä ja veden kertyminen tarkistetaan ennen uuden sijoittelun valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-view-road`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Naapurin näkymää muuttava paneeliraivaus on todettu havainnekuvassa. Suojapuusto tai alemman maaston sijoittelu ovat mahdollisia tutkittavia ratkaisuja.

**Vaihtoehtoinen aiheketju:** `paneelien_maisema` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** B:n alempaan sijoitteluun liittyvä todettu vesitalousongelma → UUSI-P3-06. A:n suojapuuston säilyminen varmistetaan sopimuksella tai muulla toteuttamiskelpoisella keinolla.

**Kytketyt tunnisteet:** `UUSI-P3-06`

**Tausta:** S02 L01

---

### [solar-view-winter]

#### PELAAJALLE

**Kortin otsikko:** Talvikuva näytti enemmän.

**Korttiteksti:** Lehdettömän ajan havainnekuva paljastaa paneelit naapurin ikkunasta. Reunaan voi jättää puustoa tai kentän siirtää alemmas maastoon.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään puustoinen suojakaista

**Valinnan jälkeen näytetään:** Osa suunnitellusta paneelialasta jätetään puustolle. Sen säilyttämisestä sovitaan ja näkyvyys tarkistetaan myös ilman lehtiä.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan paneelien sijoittamista alemmas

**Valinnan jälkeen näytetään:** Paneeliriveille etsitään alemmat paikat. Maaperä ja veden kertyminen tarkistetaan ennen uuden sijoittelun valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-view-winter`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Paneelikentän lehdettömän ajan näkyvyys on jäänyt aiemmassa havainnekuvassa selvittämättä tai poikkeaa kesäkuvasta.

**Vaihtoehtoinen aiheketju:** `paneelien_maisema` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** B:n alempaan sijoitteluun liittyvä todettu vesitalousongelma → UUSI-P3-06. A:n suojapuuston säilyminen varmistetaan sopimuksella tai muulla toteuttamiskelpoisella keinolla.

**Kytketyt tunnisteet:** `UUSI-P3-06`

**Tausta:** S02 L01

---

### [solar-view-edge]

#### PELAAJALLE

**Kortin otsikko:** Puusto oli luvattu kuvassa.

**Korttiteksti:** Naapuri huomaa, että havainnekuvan suojapuusto olisikin raivattavalla alueella. Varataanko sille riittävä alue vai sijoitetaanko paneelit alemmas?

##### Valinta A

**Pyyhkäisyteksti:** Jätetään puustoinen suojakaista

**Valinnan jälkeen näytetään:** Osa suunnitellusta paneelialasta jätetään puustolle. Sen säilyttämisestä sovitaan ja näkyvyys tarkistetaan myös ilman lehtiä.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan paneelien sijoittamista alemmas

**Valinnan jälkeen näytetään:** Paneeliriveille etsitään alemmat paikat. Maaperä ja veden kertyminen tarkistetaan ennen uuden sijoittelun valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-view-edge`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Havainnekuvan suojapuusto on ristiriidassa todellisen raivaussuunnitelman kanssa. Tilanne on korjattava yhteen suunnitelmaversioon.

**Vaihtoehtoinen aiheketju:** `paneelien_maisema` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** B:n alempaan sijoitteluun liittyvä todettu vesitalousongelma → UUSI-P3-06. A:n suojapuuston säilyminen varmistetaan sopimuksella tai muulla toteuttamiskelpoisella keinolla.

**Kytketyt tunnisteet:** `UUSI-P3-06`

**Tausta:** S02 L01

---

### [solar-rain]

#### PELAAJALLE

**Kortin otsikko:** Sadevesi valuu naapurin pellolle

**Korttiteksti:** Paneelikentän vesilaskelma osoittaa, että rankkasade kasvattaisi virtaamahuippua naapurin pellolla. Vesi pitää viivyttää ennen purkua.

##### Valinta A

**Pyyhkäisyteksti:** Varataan kentältä tilaa veden viivyttämiseen

**Valinnan jälkeen näytetään:** Paneelirivejä vähennetään ja alueelle varataan viivytystilaa. Suunnitelma mitoitetaan nykyiselle purku-uomalle.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan toinen vesienhallintaratkaisu

**Valinnan jälkeen näytetään:** Vesiasiantuntija vertaa allas- ja purkuvaihtoehtoja. Niiden vaatimat maa-alueet ja vaikutukset selvitetään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-rain`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Virtaamalaskelma osoittaa paneelikentältä tulevan tulvahuipun kasvavan naapuripellolla. Vastaanottava uoma on yksilöity.

**Vaihtoehtoinen aiheketju:** `paneelien_hulevesi` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n viivytyshaara. Puuttuva purkuoikeus tai riittämätön mitoitus ei ratkea pelkällä salaojalla.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S04

---

### [solar-drain]

#### PELAAJALLE

**Kortin otsikko:** Alapuolinen oja on jo täynnä

**Korttiteksti:** Paneelikentän vedet olisi tarkoitus johtaa ojaan, jonka välityskyky ei riitä uusille virtaamille. Suunnitelmaan tarvitaan viivytystä tai toinen purkuratkaisu.

##### Valinta A

**Pyyhkäisyteksti:** Varataan kentältä tilaa veden viivyttämiseen

**Valinnan jälkeen näytetään:** Paneelirivejä vähennetään ja alueelle varataan viivytystilaa. Suunnitelma mitoitetaan nykyiselle purku-uomalle.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan toinen vesienhallintaratkaisu

**Valinnan jälkeen näytetään:** Vesiasiantuntija vertaa allas- ja purkuvaihtoehtoja. Niiden vaatimat maa-alueet ja vaikutukset selvitetään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-drain`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Paneelialueen purkuojan kapasiteetti ei riitä laskettuun lisävirtaamaan. Vaihtoehdot liittyvät tähän samaan vesitalousongelmaan.

**Vaihtoehtoinen aiheketju:** `paneelien_hulevesi` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n viivytyshaara. Puuttuva purkuoikeus tai riittämätön mitoitus ei ratkea pelkällä salaojalla.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S04

---

### [solar-snow]

#### PELAAJALLE

**Kortin otsikko:** Sulamisvesi kerääntyy paneelikentälle

**Korttiteksti:** Kevään sulamisvesien laskelma osoittaa suuren vesimäärän kertyvän paneelikentän alareunaan. Paneeleille varattu alue tarvitsee osittain toisen käyttötarkoituksen.

##### Valinta A

**Pyyhkäisyteksti:** Varataan kentältä tilaa veden viivyttämiseen

**Valinnan jälkeen näytetään:** Paneelirivejä vähennetään ja alueelle varataan viivytystilaa. Suunnitelma mitoitetaan nykyiselle purku-uomalle.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan toinen vesienhallintaratkaisu

**Valinnan jälkeen näytetään:** Vesiasiantuntija vertaa allas- ja purkuvaihtoehtoja. Niiden vaatimat maa-alueet ja vaikutukset selvitetään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solar-snow`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKOVARIANTTI · vain aurinkopelin vaihtoehtoteksti; hybridiin erikseen valittuna

**Ehto / sijoitus:** Paneelikentän suunnittelussa on todettu sulamisvesien kasaantuminen alareunaan. Mitoitettava vesimäärä ja purkusuunta ovat tiedossa.

**Vaihtoehtoinen aiheketju:** `paneelien_hulevesi` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n viivytyshaara. Puuttuva purkuoikeus tai riittämätön mitoitus ei ratkea pelkällä salaojalla.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S04

---

### [nature::solar-base]

#### PELAAJALLE

**Kortin otsikko:** Kevät paljasti viitasammakon lisääntymispaikan

**Korttiteksti:** Keväällä täyttyvä painanne osoittautuu viitasammakon lisääntymispaikaksi. Paneelikentän salaojitus laskisi sen vedenpintaa.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään paikka vesitalouksineen rakentamatta

**Valinnan jälkeen näytetään:** Paneelit ja kuivatus rajataan pois lisääntymispaikan toimintaan vaikuttavalta alueelta. Kentän pinta-ala pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan kuivatus uudelleen

**Valinnan jälkeen näytetään:** Vesiasiantuntija ja luontokonsultti tutkivat, voidaanko paneeleita säilyttää muuttamalla kuivatusratkaisua.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `nature::solar-base`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKORUNKO · vain aurinkopelin runkovaihtoehto

**Ehto / sijoitus:** Viitasammakon lisääntymispaikka ja hankkeen vesitaloudellinen vaikutus on todettu. Vain yksi tätä samaa paikkaa koskeva alkukortti.

**Vaihtoehtoinen aiheketju:** `viitasammakon_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Säilytä lisääntymispaikka ja sen vedensaanti. Rajaushehtaarit tulevat tämän paikan todellisesta pinta-alasta.

**Valinta B — vaikutus:** Tilaa haitan välttävän kuivatusratkaisun arvio. Oikeus heikentää paikkaa ei synny toimeksiannolla.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n viitasammakkohaarat. Jos wetlandReserveOwned=true ja hydrologinen yhteys sopii, UUSI-P3-KOSTEIKKO voidaan tarjota lisäratkaisuna.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-KOSTEIKKO`

**Toteutuksen rajaus:** Ei lajien siirtämistä omatoimisesti eikä kuvitteellista automaattista poikkeuslupaa. LVV:n myönteinen kanta koskee erikseen osoitettua vesitalouden säilymistä.

**Tausta:** L04 S02 S03

---

### [noise::solar-base]

#### PELAAJALLE

**Kortin otsikko:** Paneelit näkyisivät suoraan naapurin olohuoneeseen

**Korttiteksti:** Naapurin olohuoneesta näkyisi paneelikenttä puuston poiston jälkeen. Jätätkö riittävän alueen puustolle vai siirrätkö paneelit maaston alempaan kohtaan?

##### Valinta A

**Pyyhkäisyteksti:** Jätetään puustoinen suojakaista

**Valinnan jälkeen näytetään:** Osa suunnitellusta paneelialasta jätetään puustolle. Sen säilyttämisestä sovitaan ja näkyvyys tarkistetaan myös ilman lehtiä.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan paneelien sijoittamista alemmas

**Valinnan jälkeen näytetään:** Paneeliriveille etsitään alemmat paikat. Maaperä ja veden kertyminen tarkistetaan ennen uuden sijoittelun valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `noise::solar-base`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKORUNKO · vain aurinkopelin runkovaihtoehto

**Ehto / sijoitus:** Naapurin näkymää muuttava paneeliraivaus on todettu havainnekuvassa. Suojapuusto tai alemman maaston sijoittelu ovat mahdollisia tutkittavia ratkaisuja.

**Vaihtoehtoinen aiheketju:** `paneelien_maisema` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** B:n alempaan sijoitteluun liittyvä todettu vesitalousongelma → UUSI-P3-06. A:n suojapuuston säilyminen varmistetaan sopimuksella tai muulla toteuttamiskelpoisella keinolla.

**Kytketyt tunnisteet:** `UUSI-P3-06`

**Tausta:** S02 L01

---

### [height::solar-base]

#### PELAAJALLE

**Kortin otsikko:** Sadevesi valuu naapurin pellolle

**Korttiteksti:** Paneelikentän vesilaskelma osoittaa, että rankkasade kasvattaisi virtaamahuippua naapurin pellolla. Vesi pitää viivyttää ennen purkua.

##### Valinta A

**Pyyhkäisyteksti:** Varataan kentältä tilaa veden viivyttämiseen

**Valinnan jälkeen näytetään:** Paneelirivejä vähennetään ja alueelle varataan viivytystilaa. Suunnitelma mitoitetaan nykyiselle purku-uomalle.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan toinen vesienhallintaratkaisu

**Valinnan jälkeen näytetään:** Vesiasiantuntija vertaa allas- ja purkuvaihtoehtoja. Niiden vaatimat maa-alueet ja vaikutukset selvitetään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `height::solar-base`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AURINKORUNKO · vain aurinkopelin runkovaihtoehto

**Ehto / sijoitus:** Virtaamalaskelma osoittaa paneelikentältä tulevan tulvahuipun kasvavan naapuripellolla. Vastaanottava uoma on yksilöity.

**Vaihtoehtoinen aiheketju:** `paneelien_hulevesi` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-VESI:n viivytyshaara. Puuttuva purkuoikeus tai riittämätön mitoitus ei ratkea pelkällä salaojalla.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S04

---

### [solarNature::wind]

#### PELAAJALLE

**Kortin otsikko:** Voimalan siirto ei siirtänyt huoltotietä

**Korttiteksti:** Voimala siirrettiin liito-oravan puustoisen yhteyden ulkopuolelle. Vanha huoltotie ja kaapelilinja kulkisivat silti sen läpi. Ne jäivät muutoksessa päivittämättä.

##### Valinta A

**Pyyhkäisyteksti:** Siirretään myös tie ja kaapeli

**Valinnan jälkeen näytetään:** Tie, kaapeli ja nostopaikka suunnitellaan uudelleen. Luontokonsultti arvioi koko rakentamisalueen uuden rajauksen.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään tämä voimalapaikka pois

**Valinnan jälkeen näytetään:** Voimala ja sen tarpeettomat tie- ja kaapelihaarat poistetaan suunnitelmasta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solarNature::wind`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AJONAIKAINEN ERIKOISTILANNE · vain tuulipelin korvaava paikka; ei pakkoaktivointia lukitulle pelitilalle

**Ehto / sijoitus:** Tuulivoimalan paikka on aikaisemmassa päätöksessä siirretty luontosyyllä, mutta tie- tai kaapelireitti kulkee edelleen vältettävän kohteen kautta.

**Vaihtoehtoinen aiheketju:** `infrastruktuurin_siirto` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n liito-oravahaara; sama paikka poistetaan enintään kerran.

**Kytketyt tunnisteet:** `EV-LUONTO`

**Tausta:** L01 L04 S04

---

### [solarWater::wind]

#### PELAAJALLE

**Kortin otsikko:** Voimajohdon rakentaminen voi kuivattaa Natura-suota

**Korttiteksti:** Voimajohto kiertää Natura-alueen, mutta sen rakentaminen muuttaisi suolle tulevien vesien reittiä. Suon vesitalous pitää turvata myös rajauksen ulkopuolella tehtävissä töissä.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään valuma-alueen kiertävä johtoreitti

**Valinnan jälkeen näytetään:** Johdolle etsitään reittiä, joka ei muuta suon vedensaantia. Uuden reitin maastotyöt ja maankäyttö selvitetään.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan vesitalouden säilyttävä rakentamistapa

**Valinnan jälkeen näytetään:** Vesiasiantuntija tutkii perustusten, työteiden ja kuivatusjärjestelyjen toteutusta. Ratkaisun vaikutus viedään Natura-arvioon.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `solarWater::wind`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY AJONAIKAINEN ERIKOISTILANNE · vain tuulipelin korvaava paikka; ei pakkoaktivointia lukitulle pelitilalle

**Ehto / sijoitus:** Sähkönsiirtoreitin rakentaminen voi muuttaa nimetyn Natura-suokohteen vesitaloutta, vaikka johto ei sijoitu suojelualueelle.

**Vaihtoehtoinen aiheketju:** `johdon_natura_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-NATURA:n suon vesitaloushaara. Hyödyn on oltava haittaa ehkäisevä, ei toisen alueen yleinen kompensaatio.

**Kytketyt tunnisteet:** `EV-NATURA`

**Tausta:** L02 S04 S21

---

### [UUSI-P3-01]

#### PELAAJALLE

**Kortin otsikko:** Selostus sai kiitosta. Hanke ei.

**Korttiteksti:** Perustellussa päätelmässä YVA-selostusta pidetään hyvin laadittuna. Samassa päätelmässä nykyisen sijoittelun metsäpeura- ja maisemavaikutukset arvioidaan liian suuriksi. Hanke tarvitsee muutoksia.

##### Valinta A

**Pyyhkäisyteksti:** Valmistellaan pienempi hankevaihtoehto

**Valinnan jälkeen näytetään:** Vaikutuksiltaan vaikeimmat voimalapaikat jätetään jatkosuunnittelun ulkopuolelle. Pienemmän vaihtoehdon arviointi tilataan.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään, riittävätkö siirrot ja lievennykset

**Valinnan jälkeen näytetään:** Konsultti tutkii vaihtoehdon, jossa useampia voimaloita säilyisi. Kaavaehdotusta ei vielä viimeistellä tämän sijoittelun mukaisena.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-01`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** YVA:n perusteltu päätelmä on jo saatu. Ei saa esiintyä ennen draft-done-tapahtumaa.

**Myöhempi tapahtuma / jatko:** EV-KORJAUS näyttää arvioidun muutoksen tuloksen. Kunnalle toimitetaan konkreettinen muutos tai selvitetty lievennys, ei vain selitys selostuksen laadusta.

**Kytketyt tunnisteet:** `EV-KORJAUS`

**Tausta:** S03 S08 S09 L01

---

### [UUSI-P3-02]

#### PELAAJALLE

**Kortin otsikko:** Kesähavainnot muuttivat metsäpeurakuvaa

**Korttiteksti:** Kevään käynneillä havaintoja oli vähän. Kesällä alueelta löytyy useita vasallisia metsäpeuroja, eikä nykyinen aineisto vielä rajaa vasomisalueen käyttöä riittävästi.

##### Valinta A

**Pyyhkäisyteksti:** Täydennetään vasomisajan seuranta

**Valinnan jälkeen näytetään:** Vasomisalueen laajuutta ja kulkua selvitetään lisää. Sijoittelun ratkaisu odottaa näitä tietoja.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään havaitut vasomisalueet rakentamatta

**Valinnan jälkeen näytetään:** Voimalat ja tiet rajataan pois nykyisten havaintojen osoittamalta alueelta. Konsultti tarkistaa, riittääkö tämä väistö.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-02`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran esiintymisalue ja uusi vasomiseen liittyvä havainto. Ei sattumanvarainen laji mihin tahansa maakuntaan.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n metsäpeurahaara; laajentunut tieto ei ole tutkimuksen rangaistus vaan saman maastotilanteen paljastuminen.

**Kytketyt tunnisteet:** `EV-LUONTO`

**Tausta:** S03 S13

---

### [UUSI-P3-03]

#### PELAAJALLE

**Kortin otsikko:** Vanha turvekenttä on muuttunut kosteikoksi

**Korttiteksti:** Ilmakuvassa alue on vielä kuiva turvetuotantokenttä. Maastossa samassa kohdassa on vettä ja suuri lintujen levähdysalue. Aurinkosuunnitelma perustui vanhaan kuvaan.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään vettynyt lintujen käyttöalue pois

**Valinnan jälkeen näytetään:** Paneelikenttää rajataan nykyisten lintuhavaintojen perusteella. Käyttöön jäävien osien arvio päivitetään.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään alueen käyttö tarkemmin

**Valinnan jälkeen näytetään:** Linnuston levähdystä ja ruokailua seurataan. Kentän lopullinen rajaus ratkaistaan havaintojen perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-03`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Aurinkoalueen lähtökuva ei kuvaa turvetuotannon jälkeistä vettymistä ja lintujen nykyistä alueenkäyttöä.

**Vaihtoehtoinen aiheketju:** `paneelien_linnusto` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-AURINKOLUONTO:n linnustohaara. UUSI-P3-14 voi seurata vain oikeasti tarkentuneen, pienemmän luontorajauksen perusteella.

**Kytketyt tunnisteet:** `EV-AURINKOLUONTO`, `UUSI-P3-14`

**Tausta:** S02 L07

---

### [UUSI-P3-04]

#### PELAAJALLE

**Kortin otsikko:** Maakotkan reviirillä on jo kolme hanketta

**Korttiteksti:** Maakotkaselvitys yhdistää oman ja kahden naapurihankkeen törmäys- ja elinympäristövaikutukset. Oma hanke näyttää yksin pieneltä, mutta reviirin kokonaisvaikutus jää ongelmalliseksi.

##### Valinta A

**Pyyhkäisyteksti:** Poistetaan eniten yhteisriskiä lisäävät paikat

**Valinnan jälkeen näytetään:** Riskipaikat poistetaan ja koko reviirin arvio päivitetään jäljelle jäävälle sijoittelulle.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan uusi sijoittelu

**Valinnan jälkeen näytetään:** Paikkoja siirretään pois vilkkaimmista lentokohdista. Uusi riski lasketaan samalle reviirille naapurihankkeiden kanssa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-04`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Sama maakotkareviiri on oman ja naapurihankkeiden vaikutusalueella. Yhteisvaikutuksen arvio nostaa nimetyt paikat riskialttiiksi.

**Vaihtoehtoinen aiheketju:** `maakotkan_reviiri` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-KOTKA. Sama päätilanne kuin golden-perhe: älä tarjoa toista maakotkan alkukorttia samaan reviiririskiin.

**Kytketyt tunnisteet:** `EV-KOTKA`

**Tausta:** L08 S08

---

### [UUSI-P3-05]

#### PELAAJALLE

**Kortin otsikko:** Voimalan siirto ei siirtänyt huoltotietä

**Korttiteksti:** Voimala siirrettiin liito-oravan puustoisen yhteyden ulkopuolelle. Vanha huoltotie ja kaapelilinja kulkisivat silti sen läpi. Ne jäivät muutoksessa päivittämättä.

##### Valinta A

**Pyyhkäisyteksti:** Siirretään myös tie ja kaapeli

**Valinnan jälkeen näytetään:** Tie, kaapeli ja nostopaikka suunnitellaan uudelleen. Luontokonsultti arvioi koko rakentamisalueen uuden rajauksen.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään tämä voimalapaikka pois

**Valinnan jälkeen näytetään:** Voimala ja sen tarpeettomat tie- ja kaapelihaarat poistetaan suunnitelmasta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-05`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Aiempi voimalan siirto ja aidosti päivittämättä jäänyt tie/kaapeli; samaa ei näytetä lisäksi solarNature::wind-versiona.

**Vaihtoehtoinen aiheketju:** `infrastruktuurin_siirto` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n liito-oravahaara; sama paikka poistetaan enintään kerran.

**Kytketyt tunnisteet:** `EV-LUONTO`

**Tausta:** L01 L04 S04

---

### [UUSI-P3-06]

#### PELAAJALLE

**Kortin otsikko:** Alempi paneelipaikka kerää sadevedet

**Korttiteksti:** Maisemasyistä alemmas siirretylle paneelikentälle kertyisi hulevesilaskelman mukaan vettä. Naapurin näkymä parani, mutta uuden paikan kuivatus ei vielä toimi.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan kuivatus ja viivytys uudelle paikalle

**Valinnan jälkeen näytetään:** Uuden paikan vesienhallinta mitoitetaan. Selvitys kertoo, paljonko tilaa paneeleille jää sen jälkeen.

##### Valinta B

**Pyyhkäisyteksti:** Palataan ylemmälle paikalle ja jätetään suojapuusto

**Valinnan jälkeen näytetään:** Paneelikenttä palautetaan ylemmäs. Näkymää lievennetään jättämällä sovittu puustokaista sen ja naapurin väliin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-06`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Vain maisemasyistä toteutettu siirtopäätös ja todettu veden kertyminen. Ei UUSI-P1-06:n vapaaehtoisen kosteikkopalstan ostamisesta.

**Myöhempi tapahtuma / jatko:** A → EV-VESI. B pienentää paneelialaa suojapuuston verran ja edellyttää säilyttämisen toteutettavuutta.

**Kytketyt tunnisteet:** `EV-VESI`

**Tausta:** L07 S04

---

### [UUSI-P3-07]

#### PELAAJALLE

**Kortin otsikko:** Huoltotien kohdalta löytyi tervahauta

**Korttiteksti:** Arkeologinen inventointi tunnistaa huoltotien kohdalta suojeltavan tervahaudan. Tielinjaus pitää tarkistaa ennen kaavaehdotusta.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan kohteen kiertävä tie

**Valinnan jälkeen näytetään:** Tie siirretään kiertämään inventoitu kohde. Uuden reitin maasto ja tarvittava maa-alue tarkistetaan.

##### Valinta B

**Pyyhkäisyteksti:** Tarkennetaan kohteen rajaus maastossa

**Valinnan jälkeen näytetään:** Asiantuntija rajaa tervahaudan ja siihen liittyvät säilytettävät rakenteet. Tielinjaus sovitetaan tarkennetun rajauksen ulkopuolelle.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-07`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Suunnitellun tien kohdalta on inventoitu tervahauta, jonka suojeluasema tai tarvittava rajaus on selvitetty toimivaltaisen tahon kanssa.

**Myöhempi tapahtuma / jatko:** Väistö tai tarkentava inventointi ratkaisee tämän reitin. Arkeologinen havainto ei ole automaattinen koko hankkeen loppu.

**Tausta:** L11 S10

---

### [UUSI-P3-08]

#### PELAAJALLE

**Kortin otsikko:** Lepakkohavainnot keskittyvät loppukesän öihin

**Korttiteksti:** Lepakkoseurannassa aktiivisuus kasvaa lämpiminä, vähätuulisina loppukesän öinä. Kahdelle voimalapaikalle ehdotetaan näihin oloihin kohdistuvaa pysäytystä.

##### Valinta A

**Pyyhkäisyteksti:** Arvioidaan kohdennettu pysäytys

**Valinnan jälkeen näytetään:** Konsultti arvioi pysäytysten vaikutuksen lepakoihin ja vuosituotantoon. Käyttöehdot täsmennetään havaittuihin olosuhteisiin.

##### Valinta B

**Pyyhkäisyteksti:** Etsitään näille voimaloille toiset paikat

**Valinnan jälkeen näytetään:** Korvaavat paikat tutkitaan lepakkoaineiston ja muiden vaikutusten perusteella. Nykyiset paikat jäävät odottamaan tulosta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-08`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Hankkeen lepakkoaineistossa on osoitettu nimetyille paikoille ajoittuvaa aktiivisuutta tietyissä sääoloissa. Käyttörajoitus on vaihtoehto siirrolle.

**Myöhempi tapahtuma / jatko:** A rajoittaa vain osoitettuja käyttötilanteita eikä pienennä MW-nimellistehoa. B tarvitsee todelliset korvaavat alueet; tulos EV-LUONTO:n lepakkohaarassa.

**Kytketyt tunnisteet:** `EV-LUONTO`

**Tausta:** L04 L01

---

### [UUSI-P3-09]

#### PELAAJALLE

**Kortin otsikko:** Talvella voimalat näkyvät enemmän

**Korttiteksti:** Maisema-arvion kuvat on otettu lehtipuiden ollessa lehdessä. Lehdettömän ajan tarkistus näyttää reunimmaisen voimalaryhmän huomattavasti selvemmin kylälle.

##### Valinta A

**Pyyhkäisyteksti:** Täydennetään maisema-arvio talvinäkymillä

**Valinnan jälkeen näytetään:** Lehdettömän ajan havainnekuvat lisätään arvioon. Niiden perusteella ratkaistaan, tarvitaanko sijoitteluun muutos.

##### Valinta B

**Pyyhkäisyteksti:** Poistetaan näkyvin reunapaikka

**Valinnan jälkeen näytetään:** Hallitsevin voimalapaikka jätetään pois. Jäljelle jäävän ryhmän talvinäkymä tarkistetaan uusilla kuvilla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-09`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Voimaloiden kesäkuvat eivät kata lehdettömän ajan näkymää nimetyltä katselupaikalta.

**Myöhempi tapahtuma / jatko:** Sama maisemavaikutus saa vain yhden korjausketjun. Uusi kuva voi tukea hanketta tai osoittaa pienennyksen tarpeen.

**Tausta:** S14 S07 L01

---

### [UUSI-P3-10]

#### PELAAJALLE

**Kortin otsikko:** Yömelu puuttui vertailusta

**Korttiteksti:** Meluraportin koosteessa on käytetty vain päiväajan tilannetta. Hankkeen voimalat toimisivat myös öisin, jolloin asuin- ja lomarakennuksille sovelletaan tiukempaa ohjearvoa.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään yö- ja yhteismelulaskenta

**Valinnan jälkeen näytetään:** Mallintaja laskee yöllisen käyttötilanteen naapurihankkeineen. Sijoittelun ratkaisu odottaa tulosta.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan suoraan hiljaisempi yöajo

**Valinnan jälkeen näytetään:** Valmistajalta pyydetään yöajolle hiljaisemman käyttötilan lähtötiedot. Mallintaja laskee sen melun ja tuotantomenetyksen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-10`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Tuulivoiman vastaanottajakohtaisen melun koosteesta puuttuu yötilanne tai sen yhteisvaikutus. Ei tarjota, jos sama laskenta on jo korjattu.

**Vaihtoehtoinen aiheketju:** `tuulen_yhteismelu` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MELU. A voi osoittaa nykyajonkin riittäväksi; B ei automaattisesti ole tarpeellinen. Päivä- ja yöohjearvot eivät tarkoita kaikkien koneiden samaa käyttöä.

**Kytketyt tunnisteet:** `EV-MELU`

**Tausta:** L03 S07

---

### [UUSI-P3-11]

#### PELAAJALLE

**Kortin otsikko:** Kuulemiseen tuli myös Ruotsi

**Korttiteksti:** Rajaseudun hankkeen voimalat näkyisivät myös Ruotsiin. Kansainvälisessä kuulemisessa pyydetään lisää havainnekuvia ja arvioita vastarannan asutukselle.

##### Valinta A

**Pyyhkäisyteksti:** Täydennetään arvio pyydetyistä näkymistä

**Valinnan jälkeen näytetään:** Ruotsin puolen tarkastelupaikat otetaan kuvasarjaan. Aineisto toimitetaan kansainväliseen kuulemiseen.

##### Valinta B

**Pyyhkäisyteksti:** Selvitetään rajanpuoleisten paikkojen pienennystä

**Valinnan jälkeen näytetään:** Näkyvintä voimalaryhmää pienennetään vertailuvaihtoehdossa. Myös sen vaikutukset arvioidaan rajan molemmin puolin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-11`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Vain todellisia rajat ylittäviä vaikutuksia aiheuttava rajaseudun skenaario.

**Myöhempi tapahtuma / jatko:** Näytettävä lisätyö ja mahdollinen kuulemisaika kirjataan. Ulkomaisen osapuolen näkemys ei ole automaattinen veto.

**Tausta:** S04 L01

---

### [UUSI-P3-12]

#### PELAAJALLE

**Kortin otsikko:** Porojen talvilaitumelle ei enää päästä

**Korttiteksti:** Selvityksessä on huomioitu talvilaidun, mutta kulkuyhteys sille jää oman ja naapurihankkeen väliin. Paliskunta pyytää tarkastelemaan koko laidunkiertoa.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään yhteistarkastelu paliskunnan kanssa

**Valinnan jälkeen näytetään:** Laidunten väliset reitit ja molemmat hankkeet viedään samaan arvioon. Puuttuva kulkuyhteys tutkitaan.

##### Valinta B

**Pyyhkäisyteksti:** Poistetaan oman hankkeen reittiä kaventavat paikat

**Valinnan jälkeen näytetään:** Oman hankkeen voimaloita ja tiehaaroja rajataan pois reitiltä. Jäljelle jäävän yhteyden toimivuus tarkistetaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-12`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Poronhoitoalue ja tunnistettu laidunten välinen yhteys. Ei toista alkukorttia jo käsiteltyyn herding-pasture-tilanteeseen.

**Myöhempi tapahtuma / jatko:** EV-PORO. Pienennys tarvitsee kokonaisarvion; paliskunnan osallistuminen ei yksin todista toimivuutta.

**Kytketyt tunnisteet:** `EV-PORO`

**Tausta:** L09 S06

---

### [UUSI-P3-13]

#### PELAAJALLE

**Kortin otsikko:** Voimajohdon rakentaminen voi kuivattaa Natura-suota

**Korttiteksti:** Voimajohto kiertää Natura-alueen, mutta sen rakentaminen muuttaisi suolle tulevien vesien reittiä. Suon vesitalous pitää turvata myös rajauksen ulkopuolella tehtävissä töissä.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään valuma-alueen kiertävä johtoreitti

**Valinnan jälkeen näytetään:** Johdolle etsitään reittiä, joka ei muuta suon vedensaantia. Uuden reitin maastotyöt ja maankäyttö selvitetään.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan vesitalouden säilyttävä rakentamistapa

**Valinnan jälkeen näytetään:** Vesiasiantuntija tutkii perustusten, työteiden ja kuivatusjärjestelyjen toteutusta. Ratkaisun vaikutus viedään Natura-arvioon.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-13`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Natura-suon vesitalouteen vaikuttava johtoreitti. Sama tarina kuin solarWater::wind; vain yksi versio pelikertaan.

**Vaihtoehtoinen aiheketju:** `johdon_natura_vesitalous` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-NATURA:n suon vesitaloushaara. Hyödyn on oltava haittaa ehkäisevä, ei toisen alueen yleinen kompensaatio.

**Kytketyt tunnisteet:** `EV-NATURA`

**Tausta:** L02 S04 S21

---

### [UUSI-P3-14]

#### PELAAJALLE

**Kortin otsikko:** Lisäselvitys vapautti kaksi voimalapaikkaa

**Korttiteksti:** Tarkempi metsäpeuraseuranta rajaa vasomisalueen aiempaa suppeammaksi. Kaksi varmuuden vuoksi pois jätettyä voimalapaikkaa voisi sittenkin sopia alueelle. Muu pienempi vaihtoehto on jo pitkällä.

##### Valinta A

**Pyyhkäisyteksti:** Tutkitaan kahden paikan palauttamista

**Valinnan jälkeen näytetään:** Paikat palautetaan vertailuun ja niiden melu-, luonto- sekä tievaikutukset tarkistetaan. Ehdotuksen valmistelu saa uuden työvaiheen.

##### Valinta B

**Pyyhkäisyteksti:** Jatketaan valmiimmalla pienemmällä vaihtoehdolla

**Valinnan jälkeen näytetään:** Kahta paikkaa ei palauteta. Ehdotus voi edetä ilman niiden vaatimaa uutta sijoittelutyötä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P3-14`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kaksi täsmällistä aiemmin poistettua paikkaa ja myönteisesti tarkentunut metsäpeura-aineisto; ei kapasiteettia tyhjästä.

**Myöhempi tapahtuma / jatko:** A → EV-LUONTO:n metsäpeuran palautuskohtaiset tulokset. B jatkaa olemassa olevalla pienemmällä vaihtoehdolla. Paikkojen mahdollinen palautus huomioidaan vain kerran.

**Kytketyt tunnisteet:** `EV-LUONTO`

**Toteutuksen rajaus:** Sallittu myös vaiheen 4 paluukorttina, mutta vain EV-TUTKIMUS:n vastaavalle kahden vasomispaikan tulokselle. Palautettujen paikkojen tarkistus ei saa arpoa uutta haittaa, joka olisi ollut ristiriidassa jo varmistettujen tietojen kanssa.

**Tausta:** S02 L01

---

### [P3-SOPIMUS]

#### PELAAJALLE

**Kortin otsikko:** Poikkeuksesta halutaan yhteinen käytäntö

**Korttiteksti:** Kolme muuta maanomistajaa vaatii samoja parempia vuokraehtoja kuin hankkeen viimeisille allekirjoittajille sovittiin. Heidän sopimuksensa ovat jo voimassa, mutta seuraavista aluevarauksista neuvotellaan vielä.

##### Valinta A

**Pyyhkäisyteksti:** Tarjotaan sama korotus myös heille

**Valinnan jälkeen näytetään:** Korotus sovitaan ja keskustelu rauhoittuu. Hankkeen vuokrakulut kasvavat useamman kiinteistön osalta.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään nykyiset sopimukset ennallaan

**Valinnan jälkeen näytetään:** Perustelet, miksi aiemmin sovitut ehdot pysyvät voimassa. Osa omistajista on tyytymätön ja suhtautuu uusiin aluevarauksiin aiempaa varauksellisemmin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `P3-SOPIMUS`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** PÄIVITETTY JATKOKORTTI

**Ehto / sijoitus:** contract-callback on esitetty. Poikkeusehtoja ei palauteta peliin tavallisena satunnaistapahtumana.

**Valinta A — vaikutus:** Kirjaa lisävuokrakulu vain niille kiinteistöille, joille lisäetu todella sovitaan.

**Valinta B — vaikutus:** Voimassa olevat sopimukset säilyvät. Mahdollisten uusien sopimusneuvottelujen vaikeutuminen edellyttää niiden tarvetta ja oikeaa maanomistajaa.

**Myöhempi tapahtuma / jatko:** Ei nykyisten sopimusten automaattista purkua tai samojen korotusten ketjuttamista rajatta.

**Tausta:** L10 V5-L1

---

### [BESS-P3-01]

#### PELAAJALLE

**Kortin otsikko:** Jäähdytys kuuluu naapuriin

**Korttiteksti:** Akun melutiedot koskevat osakuormaa. Lämpimän illan täydellä kuormalla jäähdytys olisi voimakkaampi, mutta tätä tilannetta ei vielä ole meluarviossa.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan arvio täydelle kuormalle

**Valinnan jälkeen näytetään:** Toimittajalta pyydetään oikean käyttötilanteen äänitiedot. Meluarvio päivitetään jäähdytykselle, muuntajille ja muille olennaisille lähteille.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan laitteet kauemmas naapurista

**Valinnan jälkeen näytetään:** Laitteita siirretään asemapiirroksessa. Uusi sijoittelu mallinnetaan samoilla täyden kuorman äänitiedoilla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-01`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana ja valitun laitteiston jäähdytys- ja muuntajaääniä ei ole arvioitu olennaisessa käyttötilanteessa.

**Myöhempi tapahtuma / jatko:** Todettu laitemelu ratkaistaan meluntorjunnalla, sijainnilla tai käyttöehdoilla. Pelkkä tuulivoimaloiden 40 dB -asetus ei ole erillisen BESSin yleinen arviointisääntö.

**Tausta:** B05 L12

---

### [BESS-P3-02]

#### PELAAJALLE

**Kortin otsikko:** Paloturvallisuutta ei voi arvioida myyntiesitteestä

**Korttiteksti:** Turvallisuussuunnittelija pyytää tiedot akkujen suojauksista ja häiriötilanteista. Toimittaja lähettää saman myyntiesitteen, joka oli jo tarjousliitteenä.

##### Valinta A

**Pyyhkäisyteksti:** Pyydetään tarvittavat tekniset tiedot

**Valinnan jälkeen näytetään:** Toimittajalle annetaan yksilöity aineistolista ja toimitusaika. Turvallisuussuunnittelun tämä osa jää odottamaan tietoja.

##### Valinta B

**Pyyhkäisyteksti:** Vaihdetaan paremmin dokumentoituun vaihtoehtoon

**Valinnan jälkeen näytetään:** Toinen laiteratkaisu otetaan suunnitteluun. Sen turvallisuusaineisto ja asemapiirros tarkistetaan ennen valintaa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-02`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana. Pätevä turvallisuussuunnittelija on yksilöinyt puuttuvat laite- tai häiriötilannetiedot, eikä toimittajan yleisesite vastaa niihin.

**Myöhempi tapahtuma / jatko:** EV-BESS-TURVA. Saman puuttuvan tiedon lähettämistä ei lasketa valmistumiseksi. Laitevaihto voi vaatia melu- ja verkkotietojen päivityksen.

**Kytketyt tunnisteet:** `EV-BESS-TURVA`

**Tausta:** B03 B04

---

### [BESS-P3-03]

#### PELAAJALLE

**Kortin otsikko:** Häiriötilanteen vedet pääsisivät ojaan

**Korttiteksti:** Turvallisuustarkastelussa löytyy laitealueelta suora virtausreitti alapuoliseen ojaan. Nykyinen hulevesisuunnitelma ei käsittele onnettomuustilanteessa mahdollisesti pilaantuneita vesiä.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan erillinen vesien hallinta

**Valinnan jälkeen näytetään:** Pätevä suunnittelija täydentää häiriötilanteen vesien talteenoton ja hallinnan. Tarvittava tila lisätään asemapiirrokseen.

##### Valinta B

**Pyyhkäisyteksti:** Tutkitaan akun toista paikkaa

**Valinnan jälkeen näytetään:** Akulle etsitään paikkaa, jossa mahdollisen vuodon seuraukset olisi helpompi hallita. Myös uuden paikan turvallisuussuunnittelu tehdään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-03`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana. Häiriötilanteen mahdollisesti pilaantuneille vesille on todettu reitti alapuoliseen ojaan; kohderiskiä ei ole katettu tavallisella hulevesisuunnitelmalla.

**Myöhempi tapahtuma / jatko:** EV-BESS-TURVA:n häiriövesihaara. Ei pelastustoiminnan yksityiskohtaisia sammutusohjeita eikä yleistä lakisääteistä metrilukua.

**Kytketyt tunnisteet:** `EV-BESS-TURVA`

**Tausta:** B04 L07

---

### [BESS-P3-04]

#### PELAAJALLE

**Kortin otsikko:** Laiterivi tukki kulun

**Korttiteksti:** Akkualueen pinta-alaa pienennettiin siirtämällä yksi laiterivi huolto- ja pelastuskulun kohdalle. Turvallisuussuunnittelija palauttaa asemapiirroksen korjattavaksi.

##### Valinta A

**Pyyhkäisyteksti:** Järjestetään laitteet ja kulku uudelleen

**Valinnan jälkeen näytetään:** Asemapiirros avataan uudelleen. Kulkureitit säilytetään ja laitteille etsitään toimiva järjestys.

##### Valinta B

**Pyyhkäisyteksti:** Vähennetään akustoyksiköitä

**Valinnan jälkeen näytetään:** Osa akustoyksiköistä jätetään pois, jotta kulku mahtuu alueelle. Toimittaja päivittää tehon ja energiakapasiteetin.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-04`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana. Tiivistetyn asemapiirroksen laiterivi estää tarvittavan kulun; todelliset tila- ja pääsyvaatimukset on yksilöity.

**Myöhempi tapahtuma / jatko:** Poistuvat laitteet muuttavat BESSin kokoa. Muut hankeosat eivät pienene, elleivät käytä samaa menetettyä aluetta.

**Tausta:** B03 B04

---

### [BESS-P3-05]

#### PELAAJALLE

**Kortin otsikko:** Yhteinen liittymä ei kata molempien huipputehoa

**Korttiteksti:** Tuulipuiston ja akun yhtäaikainen purku ylittäisi yhteisen liittymän siirtorajan. Akun tarjouksessa on oletettu, että koko purkuteho olisi aina käytettävissä.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan yhteinen tehonrajoitus

**Valinnan jälkeen näytetään:** Suunnittelija laatii ohjauksen, joka pitää kokonaistehon liittymän rajoissa. Verkkoyhtiö arvioi ratkaisun, ja sen vaikutus tuottoihin lasketaan.

##### Valinta B

**Pyyhkäisyteksti:** Haetaan suurempaa siirtotehoa

**Valinnan jälkeen näytetään:** Verkkoyhtiöltä pyydetään tarkastelu suuremmalle liittymälle. Sen saatavuus, kustannus ja aikataulu jäävät vielä avoimiksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-05`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Tuuli ja akku käyttävät samaa liittymää. Yhteinen enimmäissyöttö ylittää selvitetyn siirtorajan ilman käyttörajoituksia.

**Myöhempi tapahtuma / jatko:** EV-BESS-VERKKO. B on yksi selvä valinta, ei vaihtoehdot sekoittava ”suurempi liittymä tai pienempi akku”. Jos lisätehoa ei saa, BESS-P4-04 käsittelee erottamista tai odottamista.

**Kytketyt tunnisteet:** `EV-BESS-VERKKO`, `BESS-P4-04`

**Tausta:** B01 B06

---

### [BESS-P3-06]

#### PELAAJALLE

**Kortin otsikko:** Reservitulo on laskelmassa joka vuosi sama

**Korttiteksti:** Akun kannattavuuslaskelma olettaa nykyisen reservituoton jatkuvan koko tarkastelujakson. Omistaja pyytää näyttämään myös heikomman markkinatilanteen ennen seuraavaa rahoituserää.

##### Valinta A

**Pyyhkäisyteksti:** Tehdään herkkyyslaskelmat nyt

**Valinnan jälkeen näytetään:** Tuotot lasketaan useammalla markkinaoletuksella. Omistaja saa uuden vertailun ennen jatkopäätöstä.

##### Valinta B

**Pyyhkäisyteksti:** Siirretään akun investointivalmistelu myöhemmäksi

**Valinnan jälkeen näytetään:** Akun investointipäätöstä ei kiirehditä. Muiden hankeosien luvitus jatkuu, ja akun kannattavuuteen palataan erikseen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-06`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana ja omistajan kannattavuusarvio perustuu liian kapeaan reservitulooletukseen. Investointipäätös on vielä avoin.

**Myöhempi tapahtuma / jatko:** Taloudellinen vertailu ei itsessään ole lupaehto. Älä näytä pelaajalle korttipakan aktivointia tai voittoehtojen sisäistä toimintaa.

**Tausta:** B06 B08

---

### [BESS-P3-07]

#### PELAAJALLE

**Kortin otsikko:** Uusi akku tarvitsee eri asemapiirroksen

**Korttiteksti:** Korvaava akkutoimittaja tarjoaa samaa tehoa, mutta kontteja ja jäähdytyslaitteita on eri määrä. Vanha asemapiirros ja meluliite eivät vastaa tarjousta.

##### Valinta A

**Pyyhkäisyteksti:** Päivitetään suunnitelma uuden toimittajan tiedoilla

**Valinnan jälkeen näytetään:** Asemapiirros, laitemelu ja turvallisuusaineisto päivitetään. Myös verkkotietojen muutostarve tarkistetaan.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään aiemmin selvitetty laiteratkaisu

**Valinnan jälkeen näytetään:** Uutta tarjousta ei valita. Suunnittelua jatketaan sillä laitekokonaisuudella, jota nykyiset selvitykset koskevat.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P3-07`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana ja laiteratkaisua vaihdetaan aikaisemman vaikutus- tai turvallisuusarvion jälkeen. Laitemäärä tai äänilähteet muuttuvat.

**Myöhempi tapahtuma / jatko:** EV-BESS-TURVA tarvittaessa. Älä käynnistä koko YVAa uudelleen automaattisesti samantehoisen laitevaihdon vuoksi, mutta muuttuneet vaikutukset pitää käsitellä.

**Kytketyt tunnisteet:** `EV-BESS-TURVA`

**Tausta:** B03 B05 B06

---

**Tulokset, välitapahtumat ja vaiheen mahdolliset loput**

### [interludes[2][0]]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavaluonnos valmistuu

**Tapahtumateksti:** Kaavoittaja kokoaa voimalapaikat, tiet ja suojeltavat alueet kaavaluonnokseen. Konsultit tarkistavat, että kartta vastaa selvityksissä tutkittua sijoittelua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[2][0]`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Sijoittelukartan ja liitteiden versiot on tarkistettu ennen valmisteluaineiston kuulemista. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[2][1]]

#### PELAAJALLE

**Tapahtuman otsikko:** YVA-selostusta kirjoitetaan

**Tapahtumateksti:** Luonto-, melu-, maisema- ja muut vaikutusarviot kootaan selostukseen. Hankevaihtoehtojen erot ja vielä puuttuvat tiedot kirjataan näkyviin.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[2][1]`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** YVA-selostuksen vaikutusarviot ovat valmistumassa; avoimet selvitykset ovat yhä avoimina. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[2][2]]

#### PELAAJALLE

**Tapahtuman otsikko:** Tavallinen työpäivä

**Tapahtumateksti:** Sovitut selvitykset etenevät ja kaava-aineisto valmistuu. Tällä viikolla ei tullut uusia lisäselvityspyyntöjä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[2][2]`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Sovitut selvitystyöt etenevät eikä saman hetken jonossa ole uutta havaittua estettä. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[2][3]]

#### PELAAJALLE

**Tapahtuman otsikko:** Havainnekuvat valmistuivat

**Tapahtumateksti:** Havainnekuvat valmistuivat sovituista kuvauspaikoista. Konsultti liittää ne maisema-arvioon ja tarkistaa näkyvimmät voimalaryhmät.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[2][3]`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Sijoittelua vastaava havainnekuvasarja on valmistunut sovituista katselupaikoista. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [progress-12]

#### PELAAJALLE

**Tapahtuman otsikko:** Yleisötilaisuudessa riitti kysymyksiä

**Tapahtumateksti:** Selostuksen ja kaavaluonnoksen yleisötilaisuus on pidetty. Kysymykset koskivat erityisesti melua, maisemaa ja eläinten kulkureittejä. Palaute kootaan vastineiden ja jatkosuunnittelun pohjaksi.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `progress-12`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** YVA-selostuksen ja kaavan valmisteluaineiston oikeat kuulemiset käynnissä tai päättyneet. Yhteinen tilaisuus vain, jos menettelyt on sovitettu yhteen.

**Tausta:** L01

---

### [contract-callback]

#### PELAAJALLE

**Tapahtuman otsikko:** Muut maanomistajat kuulivat poikkeusehdoista

**Tapahtumateksti:** Maanomistajat ovat saaneet tietää kahdelle omistajalle myönnetyistä paremmista ehdoista. Nyt myös muut pyytävät vuokrasopimuksiinsa samaa etua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `contract-callback`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Vuokraneuvottelussa hyväksyttiin poikkeusehtoja ja tieto on välittynyt muille. Ei samaa vaatimusta ilman poikkeusehtovalintaa.

**Myöhempi tapahtuma / jatko:** P3-SOPIMUS antaa vastauksen valinnan.

**Kytketyt tunnisteet:** `P3-SOPIMUS`

**Tausta:** L01

---

### [draft-done]

#### PELAAJALLE

**Tapahtuman otsikko:** Perusteltu päätelmä saapui

**Tapahtumateksti:** LVV on antanut YVA-selostuksesta perustellun päätelmän. Siinä esitetyt vaikutukset ja jatkosuunnittelun tarpeet käydään läpi ennen kaavaehdotuksen viimeistelyä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `draft-done`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** YVA-selostus ja sen kuuleminen on käsitelty; kyse on viranomaisen päätelmästä, ei kaavan hyväksymisestä.

**Myöhempi tapahtuma / jatko:** Tämän jälkeen voidaan tarjota päätelmän havaintoihin sidottuja korjauskortteja, kuten UUSI-P3-01, ja siirtyä ehdotusvaiheeseen.

**Kytketyt tunnisteet:** `UUSI-P3-01`, `transition-3`

**Tausta:** L01

---

### [draft-done::no-yva]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavaluonnoksen palaute saapui

**Tapahtumateksti:** Kaavaluonnoksen lausunnot ja mielipiteet on koottu. Konsultti ja kunta valmistelevat niiden perusteella vastineet ja kaavaehdotuksen muutokset.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `draft-done::no-yva`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** yvaRequired=false. Vastaavat kaavan selvitykset ja kuuleminen tehty; ei YVA-päätelmää tähän haaraan.

**Tausta:** L01

---

### [noise-statement]

#### PELAAJALLE

**Tapahtuman otsikko:** Melumoodin takuutieto ei riittänyt

**Tapahtumateksti:** LVV pyytää tarkempaa valmistajan takuuta ehdotetun melumoodin lähtötiedoista. Nykyisellä aineistolla käyttötilan melupäästöä ei voida varmistaa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `noise-statement`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Hiljainen käyttötila valittu ja juuri sen takuuaineisto todettu puutteelliseksi.

**Myöhempi tapahtuma / jatko:** UUSI-P4-02 tai feedback::noise, ei molempia samaan puutteeseen.

**Kytketyt tunnisteet:** `UUSI-P4-02`, `feedback::noise`

**Tausta:** L01

---

### [EV-YHTEISASEMA]

#### PELAAJALLE

**Tapahtuman otsikko:** Yhteisliityntä ei onnistukaan

**Tapahtumateksti:** Verkkoyhtiön ja suunnittelijan tarkastelu osoittaa, ettei ehdotettu yhteinen johtoliityntä toimi hankkeiden tehoilla ja suojausratkaisulla. Myöhemmin mahdollinen yhteisvaihtoehto ei sovi molempien aikatauluihin. Hanke jatkaa oman liittymän suunnittelulla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-YHTEISASEMA`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Vain UUSI-P1-04/A:n yhteisjohtoselvitys valmis. Tässä fiktiivisessä tilanteessa yhteisratkaisu on ennalta toteuttamiskelvoton; tieto paljastuu vasta työn valmistuttua.

**Myöhempi tapahtuma / jatko:** UUSI-P2-04 tarjotaan vaiheessa 3 palaavana liityntäpäätöksenä, ellei oma vastaava selvitys ole jo tehty. Jo käytetty selvityskulu ja todellinen viive jäävät hankkeelle.

**Kytketyt tunnisteet:** `UUSI-P2-04`

**Toteutuksen rajaus:** ID EV-YHTEISASEMA säilyy siirtokarttaa varten, mutta aihe on nyt yhteinen johtoliityntä, ei yhteisasema. Ei väitettä, että yhteinen sähköinfrastruktuuri olisi yleisesti mahdotonta.

**Tausta:** B01

---

### [EV-VERKKO]

#### PELAAJALLE

**Tapahtuman otsikko:** Liityntäselvitys valmistui

**Tapahtumateksti:** Verkkoyhtiö on arvioinut hankkeen ensisijaisen liityntävaihtoehdon.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Ensisijainen liityntä soveltuu:**
Hankkeen liityntää voidaan suunnitella ensisijaiselle asemalle ilmoitetuilla reunaehdoilla. Johtoreitin valmistelu jatkuu.

**Haara — Ensisijainen ei sovellu, varavaihtoehto on jo selvitetty:**
Lähimmän aseman ratkaisu ei sovellu. Aiemmin tutkittu varaliityntä antaa jatkopohjan; johtoreitti on pidempi mutta valmistelua ei tarvitse aloittaa alusta.

**Haara — Ensisijainen ei sovellu eikä varavaihtoehtoa tutkittu:**
Lähimmän aseman ratkaisu ei sovellu. Toisen aseman ja johtoreitin selvitys on aloitettava nyt, joten hankkeen aikataulu pitenee.

**Haara — Mikään tutkittu vaihtoehto ei sovellu:**
Tutkituilla asemilla tai johtoreiteillä ei ole toteuttamiskelpoista liityntäratkaisua hankkeen tavoiteaikaan. Omistaja arvioi, jatketaanko hankkeen valmistelua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VERKKO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Todellinen verkkoselvitys valmis. Varavaihtoehdon haara määräytyy pelaajan tilauksesta, ei vasta tuloksessa arvotusta edusta.

**Myöhempi tapahtuma / jatko:** Avoin varaliityntä tilataan erikseen; vaihtoehdottomuus voi johtaa external-2:een vain, kun järkevät jatkot on käsitelty.

**Kytketyt tunnisteet:** `UUSI-P2-04`, `external-2`

**Tausta:** B01 B02

---

### [EV-NAAPURITIETO]

#### PELAAJALLE

**Tapahtuman otsikko:** Naapurihankkeen sijoittelu tarkentui

**Tapahtumateksti:** Naapurihankkeelta saatiin uusi voimalapaikkakartta.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Tiedot ehtivät sovittuun arvioon:**
Uusi sijoittelu saadaan mukaan ennen yhteismelun ja linnustovaikutusten laskennan viimeistelyä. Erillistä uutta kierrosta ei tarvita.

**Haara — Laskenta oli jo tehty aiemmalla sijoittelulla:**
Naapurin muutos osuu samaan vaikutuskohteeseen kuin oma hanke. Valmis yhteisarvio joudutaan päivittämään uusilla paikoilla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-NAAPURITIETO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** UUSI-P2-11 tai programme-cumulative; uusi olennainen tieto saadaan ennen päätöstä.

**Myöhempi tapahtuma / jatko:** Ajoituksesta riippuva rajattu lisätyö. Sama naapurimuutos ei kerrytä viivettä usealla eri kortti-ID:llä.

**Tausta:** S22 L01

---

### [EV-VAIHTOEHDOT]

#### PELAAJALLE

**Tapahtuman otsikko:** Sääksen lentoreitti tarkistettiin uudelle sijoittelulle

**Tapahtumateksti:** Uusi sijoittelu on verrattu havaittuun sääksen lentoreittiin.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Siirretyt paikat väistävät reitin:**
Uudet paikat jäävät säännöllisen lentoreitin ulkopuolelle. Määrä voidaan säilyttää, kun myös siirtojen muut vaikutukset on tarkistettu.

**Haara — Siirto ei väistä lentoreittiä:**
Sääksi käyttää myös uusien paikkojen kautta kulkevaa reittiä. Kolmen riskipaikan pois jättävä vaihtoehto on otettava jatkosuunnitteluun.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VAIHTOEHDOT`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** UUSI-P2-02/B ja riittävä lentoreittiaineisto.

**Myöhempi tapahtuma / jatko:** Kielteinen → UUSI-P4-01 (tai saman sisällön korjauspäätös jo tässä vaiheessa) ennen ehdotuksen hyväksymistä.

**Kytketyt tunnisteet:** `UUSI-P4-01`

**Tausta:** S09 S03

---

### [EV-ILMAILU]

#### PELAAJALLE

**Tapahtuman otsikko:** Lentoesteen esiselvitys valmistui

**Tapahtumateksti:** Ilmailuvaikutuksia koskeva tarkastelu on valmistunut suunnitelluille paikoille.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Nykyiset paikat soveltuvat jatkokäsittelyyn:**
Esiselvitys tukee nykyisten paikkojen säilyttämistä. Lentoestelupahakemukset valmistellaan tarvittavien ehtojen mukaisiksi.

**Haara — Korvaavat paikat soveltuvat:**
Alempana sijaitsevat paikat soveltuvat ilmailun tarkasteluun. Niiden muut vaikutukset ja maanvuokrasopimukset tarkistetaan ennen lopullista sijoittelua.

**Haara — Paikkakohtainen muutos tarvitaan:**
Osa paikoista vaatii sijainnin tai enimmäiskorkeuden muutoksen. Näille voimaloille tehdään korjattu suunnitelma.

**Haara — Paikkoja ei voida korvata:**
Selvitys ei tue näitä paikkoja eikä tutkituilta korvaavilta alueilta löydy sopivaa ratkaisua. Kyseiset voimalapaikat jäävät pois.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-ILMAILU`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Valittu nykyisen tai korvaavan sijoittelun ilmailuselvitys valmis. Näytä vain tutkittua vaihtoehtoa vastaava haara.

**Myöhempi tapahtuma / jatko:** Tarvittaessa LOPPU-LAAJUUS vasta toteuttamiskelpoisen koon tarkistuksen jälkeen. Esiselvitystä ei merkitä Traficomin myöntämäksi luvaksi.

**Kytketyt tunnisteet:** `LOPPU-LAAJUUS`

**Tausta:** L05

---

### [EV-LUONTO]

#### PELAAJALLE

**Tapahtuman otsikko:** Uuden sijoittelun luontoarvio valmistui

**Tapahtumateksti:** Konsultti on arvioinut muutetun sijoittelun ja siihen liittyvät tiet.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Sääksi: reitti väistetään:**
Uudet voimalapaikat väistävät sääksen toistuvan lentoreitin. Arvio tukee tämän sijoittelun jatkosuunnittelua.

**Haara — Sääksi: siirto ei riitä:**
Sääksen säännöllinen reitti kulkee yhä voimalapaikkojen läpi. Nämä paikat on jätettävä pois tai suunniteltava aidosti toisin.

**Haara — Metsäpeuran vasomisalue: siirto riittää:**
Siirretyt voimalat ja tiet eivät arvion mukaan enää aiheuta vasomisalueelle hyväksymisen estävää häiriötä. Jatkosuunnitelma perustuu tähän sijoitteluun.

**Haara — Metsäpeuran vasomisalue: häiriö jää:**
Siirto ei vie voimaloita ja teitä riittävän kauas todetusta vasomisalueen käytöstä. Pienempi vaihtoehto tarvitaan arvioitavaksi.

**Haara — Metsäpeuran kulkuyhteys: yhteys säilyy:**
Uusi sijoittelu säilyttää seurannassa todetun kulkuyhteyden. Tarvittavat rakentamattomat alueet merkitään suunnitelmaan.

**Haara — Metsäpeuran kulkuyhteys: yhteys jää liian kapeaksi:**
Uusi sijoittelu kaventaa edelleen eläinten käyttämää reittiä yhdessä naapurihankkeiden kanssa. Voimalapaikkoja tai tiehaaroja on vähennettävä lisää.

**Haara — Liito-orava: puustoinen yhteys säilyy:**
Uudet tie- ja kaapelilinjaukset jättävät lisääntymispaikan puustoisen yhteyden toimivaksi. Raivattava alue rajataan tämän suunnitelman mukaan.

**Haara — Liito-orava: uusi tiekin katkaisee yhteyden:**
Tie tarvitsee edelleen niin laajan raivauksen, että lisääntymispaikan puustoinen yhteys katkeaisi. Nykyinen siirto ei ratkaise asiaa.

**Haara — Lintujen levähdysalue: väistö riittää:**
Muuttunut sijoittelu säilyttää tärkeän levähdys- ja ruokailualueen sekä olennaiset lentoyhteydet. Arvio tukee jatkoa.

**Haara — Lintujen levähdysalue: haitta jää:**
Uudetkin paikat aiheuttaisivat olennaista haittaa todetulle levähdysalueelle. Tarvitaan pienempi sijoittelu.

**Haara — Lepakot: korvaavat paikat soveltuvat:**
Korvaavilla paikoilla havaittu lepakkoriski jää selvästi pienemmäksi. Siirron muut vaikutukset tarkistetaan ennen paikkojen valintaa.

**Haara — Lepakot: siirto ei poista riskiä:**
Lepakoiden käyttämä alue ulottuu myös korvaaville paikoille. Kohdennettu käyttörajoitus tai paikkojen pois jättäminen tarvitaan edelleen.

**Haara — Metsäpeura: kahden aiemmin poistetun paikan palautus soveltuu:**
Paikkojen tarkennetut vaikutukset voidaan sovittaa hankkeeseen. Kaksi aiemmin poistettua voimalaa palautetaan suunnitelmaan ja muuttuneen aineiston käsittely tarkistetaan.

**Haara — Metsäpeura: palautusta ei voida toteuttaa:**
Vaikka metsäpeuran käyttöalue tarkentui, kahden paikan muu sijoittelutarkastelu ei mahdollista niiden palautusta. Hanke jatkaa aiemmalla pienemmällä vaihtoehdolla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-LUONTO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Tuloksen lähdekortti yksilöi lajin ja vaikutuksen. Näytä vain sen kaksi mahdollista haaraa; ratkaisu perustuu saman kysymyksen havaintoihin ja valittuun sijoitteluun.

**Myöhempi tapahtuma / jatko:** Korjattava → UUSI-P4-01 vain, jos toteuttamiskelpoinen korjausvaihtoehto on jäljellä. Kaikkien vaihtoehtojen este → lajiin sopiva ulkoinen loppu erillisen tarkistuksen jälkeen.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `ext-nature-network`

**Toteutuksen rajaus:** Maakotka käyttää EV-KOTKA:ta ja poronhoito EV-PORO:a. Älä anna metsäpeuralle törmäysmallitekstiä tai liito-oravalle sammakon vesitaloustulosta. Palautushaarat vain UUSI-P3-14/A:n ja kahden aiemmin poistetun paikan jälkeen. Kielteinen palautustulos ei itsessään poista jo selvitetyn pienemmän vaihtoehdon kelpoisuutta.

**Tausta:** L01 L02 L04 S03

---

### [EV-KOTKA]

#### PELAAJALLE

**Tapahtuman otsikko:** Maakotkan yhteisvaikutusarvio valmistui

**Tapahtumateksti:** Oman ja naapurihankkeiden vaikutukset maakotkan reviiriin on tarkasteltu yhdessä.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Muutettu sijoittelu riittää:**
Paikkojen poisto tai siirto vähentää törmäys- ja elinympäristövaikutukset arvion mukaan hyväksyttävälle tasolle. Jatkosuunnittelussa säilytetään tämä ratkaisu.

**Haara — Yhteisvaikutus on edelleen liian suuri:**
Muutoksista huolimatta maakotkan yhteisriski tai elinympäristöhaitta jää liian suureksi. Nykyistä sijoittelua ei voida viedä sellaisenaan hyväksyttäväksi.

**Haara — Kahden paikan palautusvaihtoehto soveltuu:**
Päivitetty arvio tukee kahden aiemmin poistetun paikan palauttamista. Paikat otetaan mukaan ehdotukseen ja muuttuneen aineiston käsittely tarkistetaan.

**Haara — Kahden paikan palautusvaihtoehto ei sovellu:**
Uusi tarkastelu ei tue paikkojen palauttamista reviirin yhteisvaikutusten vuoksi. Pienempi ehdotus säilyy jatkovaihtoehtona; lisäselvitykseen kulunut aika ja raha jäivät käytetyiksi.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-KOTKA`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Maakotka-arvio valmis juuri valitulle muutokselle. Palautushaarat vain UUSI-P4-KOTKAPAIKAT/A:n jälkeen; muiden lähdekorttien ratkaisu ei lisää paikkoja.

**Myöhempi tapahtuma / jatko:** Kielteinen → UUSI-P4-01, jos korjaus on todettu mahdolliseksi. Muutoin external-golden-full vaihtoehtojen puuttuessa.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `external-golden-full`

**Toteutuksen rajaus:** UUSI-P4-KOTKAPAIKAT/A:n kielteinen palautustulos ei muutu koko hankkeen tappioksi, jos jo kelvollinen pienempi vaihtoehto on edelleen käytössä.

**Tausta:** L08 S08

---

### [EV-PORO]

#### PELAAJALLE

**Tapahtuman otsikko:** Poronhoidon yhteisvaikutukset arvioitiin

**Tapahtumateksti:** Paliskunnan tiedot, oma hanke ja muu maankäyttö on koottu laidunkierron tarkasteluun.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Laidunyhteys säilyy muutetulla sijoittelulla:**
Uudet paikat, tiet ja aidat jättävät laidunten välisen kulun toimivaksi. Toteutettava sijoittelu kirjataan kaava-aineistoon.

**Haara — Laidunyhteys ei säily riittävänä:**
Muuttunutkin kokonaisuus vaikeuttaisi laidunkiertoa liikaa. Oman hankkeen paikkoja tai muita rakenteita on vähennettävä lisää.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-PORO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Poronhoitoalueella toteutettu, tähän laidunyhteyteen kohdistuva yhteisarvio.

**Myöhempi tapahtuma / jatko:** Korjausvaihtoehto → UUSI-P4-01. Kaikki realistiset vaihtoehdot estyvät → external-herding.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `external-herding`

**Tausta:** L09 S06

---

### [EV-VESI]

#### PELAAJALLE

**Tapahtuman otsikko:** Vesienhallinnan laskelmat valmistuivat

**Tapahtumateksti:** Vesiasiantuntija on arvioinut ehdotetun ratkaisun virtaamat, purkureitin ja tilantarpeen.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Uusi allas- tai viivytysratkaisu toimii:**
Mitoitettu ratkaisu pitää virtaamat hallinnassa. Tarvittava tila varataan ja suunnitelma viedään päätösaineistoon.

**Haara — Tiiviimpi ratkaisu ei riitä:**
Esitetty allas tai viivytysalue jää liian pieneksi. Paneelialaa on varattava enemmän vesienhallinnalle.

**Haara — Jälkihoito: korvaava käsittely voidaan toteuttaa:**
Korvaava vesienkäsittely on selvityksen mukaan mahdollinen. Vanhaa järjestelmää voidaan muuttaa vasta tarvittavien viranomaisratkaisujen ja korvaavan toteutuksen jälkeen.

**Haara — Jälkihoito: nykyisiä rakenteita tarvitaan edelleen:**
Tarkkailu ja vesienkäsittelyn vaatimukset edellyttävät nykyisten rakenteiden säilyttämistä. Niiden alue jää paneelikentän ulkopuolelle.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VESI`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Vesitalouden selvitys tai jälkihoidon tarkkailu valmis. Haarapari valitaan todellisen tehtävän perusteella.

**Myöhempi tapahtuma / jatko:** Kirjaa toteutunut tilavaraus vain kerran. Viitasammakon lisääntymispaikan turvaaminen arvioidaan lisäksi omassa luontohaarassaan.

**Tausta:** L07 S04

---

### [EV-KOSTEIKKO]

#### PELAAJALLE

**Tapahtuman otsikko:** Varapalsta osoittautui hyödylliseksi

**Tapahtumateksti:** Kosteikkosuunnitelma ja vaikutusarvio osoittavat, että nykyisen viitasammakon lisääntymispaikan vedensaanti säilyy. LVV pitää ratkaisua perusteltuna. Paneelikenttää ei tarvitse pienentää niin paljon kuin alkuperäisessä väistövaihtoehdossa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-KOSTEIKKO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** UUSI-P3-KOSTEIKKO/A:n tutkimus vahvistaa valuma-alueen toimivuuden, ajoituksen ja lisääntymispaikan säilymisen. Käsikirjoituksen myönteinen jatko on tarkoituksellinen, ei yleinen viranomaislupaus.

**Myöhempi tapahtuma / jatko:** Toteutusehdot ja tarvittavat lupa-asiat mukaan päätösaineistoon. Hyöty on säilyvää paneelialaa suhteessa jo tutkittuun pienennykseen; ei rajatonta piste- tai hehtaaribonusta.

**Tausta:** L04 L07 V5-L3 V5-L4

---

### [EV-PALAUTE]

#### PELAAJALLE

**Tapahtuman otsikko:** Palaute ja vastineet käytiin läpi

**Tapahtumateksti:** Kunta ja konsultti ovat tarkistaneet palautteessa esiin nostetut puutteet.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Puuttuva havainnekuva ja maisema-arvio riittävät:**
Täydentävä havainnekuva kattaa palautteessa mainitun näkymän. Vastine voidaan viimeistellä tämän aineiston perusteella.

**Haara — Havainnekuva osoittaa sijoittelun muutostarpeen:**
Uusi kuva näyttää aiemmin aliarvioidun maisemavaikutuksen. Näkyvimpien paikkojen rajausta on tarkasteltava ennen ehdotusta.

**Haara — Lajihavainto sisältyi jo selvitykseen:**
Toimitettu havainto on jo mukana luontokonsultin aineistossa. Se yksilöidään vastineessa; uutta maastotyötä ei tarvita.

**Haara — Lajihavainto vaatii täydennyksen:**
Havainto koskee aiemmin tutkimatonta kohtaa suunnitellulla tiealueella. Tarvittava maastotarkistus tilataan ennen lopullista linjausta.

**Haara — Yhteismelutieto oli valmiina:**
Julkaistu yhteismeluliite vastaa esitettyyn kysymykseen. Vastineessa osoitetaan käytetyt hankkeet ja laskentatilanne.

**Haara — Porojen reitti vaatii aitalinjauksen muutosta:**
Paliskunnan reittitieto vahvistaa kulkuesteen. Aitalinjausta muutetaan ja poronhoitoarvio päivitetään.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-PALAUTE`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Lähdekortin palautekysymys on käsitelty. Valitse haara kysymyksen ja selvitystuloksen mukaan; ei irrallista palauteprosenttia.

**Myöhempi tapahtuma / jatko:** Maiseman muutos → proposal-perheen sopiva kortti. Luontotäydennys → kohteeseen sopiva luontoselvitys. Poronhoito → feedback::herding.

**Kytketyt tunnisteet:** `proposal`, `feedback::herding`

**Tausta:** L01 S07

---

### [EV-BESS-VERKKO]

#### PELAAJALLE

**Tapahtuman otsikko:** Akkuvaraston verkkotarkastelu valmistui

**Tapahtumateksti:** Verkkoyhtiö on tarkastellut akun latausta, purkua ja muiden hankeosien samanaikaista käyttöä.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Tavoitellut tehot soveltuvat jatkoon:**
Akun suunnittelua voidaan jatkaa ilmoitetuilla lataus- ja purkutehoilla sekä verkkoyhtiön reunaehdoilla.

**Haara — Tarvitaan pienempi teho tai käyttörajoitus:**
Akkua ei voida liittää tavoitelluilla käyttöarvoilla. Tarjolla on pienempi teho tai rajoitettu lataus- ja purkutapa.

**Haara — Liittäminen odottaa verkon vahvistusta:**
Tavoiteltu akkuliityntä edellyttää myöhemmin valmistuvaa verkon vahvistusta. Akun aikataulu siirtyy, ellei käyttöä rajata tai hankeosaa vaiheisteta.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-BESS-VERKKO`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** BESS mukana ja juuri valittu verkkotarkastelu valmis.

**Myöhempi tapahtuma / jatko:** Rajoitus → BESS-P4-RAJAUS. Odotus → BESS-P4-04. Molemmat ovat harkittavia jatkoja, eivät automaattisia tuulihankkeen tappioita.

**Kytketyt tunnisteet:** `BESS-P4-RAJAUS`, `BESS-P4-04`

**Tausta:** B01 B02 B06

---

### [EV-BESS-TEKNIIKKA]

#### PELAAJALLE

**Tapahtuman otsikko:** Verkkovaatimusten vastuut saatiin sovittua

**Tapahtumateksti:** Toimittaja toimittaa tarvittavat simulointimallit ja testiaineistot sovitussa aikataulussa. Suunnittelija voi jatkaa niiden perusteella liittymän teknistä valmistelua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-BESS-TEKNIIKKA`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Toimittajan toimitussisältö ja vastuut oikeasti sovittu. Tämä ei merkitse käyttöönottotestien jo onnistuneen.

**Tausta:** B06

---

### [external-2]

#### PELAAJALLE

**Tapahtuman otsikko:** Verkkoon ei löydy toteuttamiskelpoista liittymää

**Tapahtumateksti:** Verkkoselvitys sulkee myös tutkitun varaliitynnän. Hankkeen tavoiteaikaan ei löydy toteuttamiskelpoista vaihtoehtoa. Omistaja päättää lopettaa kehityksen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-2`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** B01 B02 S21

---

### [ext-grid-station]

#### PELAAJALLE

**Tapahtuman otsikko:** Verkon vahvistus siirtyi liian kauas

**Tapahtumateksti:** Hankkeen tarvitsema verkon vahvistus siirtyy useita vuosia. Muita toteuttamiskelpoisia liityntöjä ei löytynyt. Omistaja ei jatka valmistelua näin pitkällä odotuksella.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-grid-station`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** B01 B02 S21

---

### [ext-nature-network]

#### PELAAJALLE

**Tapahtuman otsikko:** Metsäpeuran kulkuyhteyttä ei voida väistää

**Tapahtumateksti:** Laajempi arvio osoittaa hankealueen välttämättömäksi metsäpeuran kulkuyhteydeksi. Myös pienemmät sijoittelut ja reittimuutokset heikentäisivät sitä liikaa. Toteuttamiskelpoista hankevaihtoehtoa ei jää.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-nature-network`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Metsäpeuran esiintymis- ja vaikutusalue, asianmukainen suojelu-/kaavoitusperuste, kaikki aidosti toteuttamiskelpoiset vaihtoehdot tutkittu. Ei pelaajan aiemmin itse poistamaa korjauspolkua ulkoiseksi tappioksi.

**Tausta:** L02 S03

---

### [external-golden-full]

#### PELAAJALLE

**Tapahtuman otsikko:** Maakotkan reviirille ei mahdu tätä hanketta

**Tapahtumateksti:** Reviirin yhteisvaikutusarvio osoittaa, että myös pienimmät toteuttamiskelpoiset vaihtoehdot aiheuttaisivat maakotkalle liian suuren haitan. Lisäsiirroilla ei löydy hyväksyttävää sijoittelua. Hanke lopetetaan.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-golden-full`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** L08 S08

---

### [external-herding]

#### PELAAJALLE

**Tapahtuman otsikko:** Laidunkokonaisuus ei kestä lisähaittaa.

**Tapahtumateksti:** Kaikki toteuttamiskelpoiset vaihtoehdot katkaisisivat poronhoidolle välttämättömän laidunyhteyden. Paliskunnan tiedot ja yhteisvaikutusten arvio eivät tue esitettyjä lievennyksiä. Hankkeelle ei löydy jatkamiskelpoista sijoittelua.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-herding`

**Vaihe:** 3 — YVA-selostus ja kaavaluonnos

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt. Hanke sijoittuu poronhoitoalueelle.

**Tausta:** L09 S06

---


## VAIHE 4: Kaavaehdotus ja kaavan hyväksyntä

Kortit ja tapahtumat on koottu tähän pääasiallisen esiintymisvaiheen mukaan. Nimetty jatko voi palata aiempaan päätökseen; tarkka ajoitus määräytyy kunkin osion ehdoista.

**Vaiheen aloitus**

### [transition-3]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavaehdotus ja hyväksyntä

**Tapahtumateksti:** Perusteltu päätelmä ja kaavaluonnoksen palaute on saatu. Nyt korjataan havaittuja puutteita ja valmistellaan kaavaehdotus. Tämän jälkeen edessä ovat hyväksymiskäsittely ja hankkeen tarvitsemat luvat.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `transition-3`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** vaihesiirtymä · PÄIVITETTY

**Laukaisuehto:** YVA-hankkeessa perusteltu päätelmä ja luonnospalaute saatu. Ei-YVA-haarassa poista maininta päätelmästä ja käytä vain vaikutusselvityksiä ja luonnospalautetta.

**Tausta:** L01

---

**Päätöskortit ja niiden variantit**

### [feedback]

#### PELAAJALLE

**Kortin otsikko:** Paneeliaita katkaisee metsäpeuran reitin

**Korttiteksti:** Kaavaehdotuksen aitaus sulkisi metsäpeurojen käyttämän kulkuyhteyden tuulialueen ja paneelilohkojen väliltä. Luontoarviossa yhteys on todettu tärkeäksi.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään kulkuyhteydelle rakentamaton käytävä

**Valinnan jälkeen näytetään:** Paneelirivejä poistetaan ja aitaus vedetään sivuun kulkuyhteydeltä. Uusi rajaus viedään vaikutusarvioon.

##### Valinta B

**Pyyhkäisyteksti:** Järjestetään paneelilohkot reitin ympärille

**Valinnan jälkeen näytetään:** Lohkojakoa muutetaan. Suunnittelija tarkistaa, paljonko paneeleita mahtuu niin, että metsäpeurojen reitti jää toimivaksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `feedback`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · aurinko / hybridi

**Ehto / sijoitus:** Metsäpeuran todettu kulkuyhteys ja siihen vaikuttava oma paneeliaita. Ei samaan kohtaan kahta pääkorttia.

**Myöhempi tapahtuma / jatko:** EV-LUONTO:n metsäpeuran kulkuyhteyshaara. Paneelitehon säilymistä ei luvata ennen lohkojaon tarkistusta.

**Kytketyt tunnisteet:** `EV-LUONTO`, `UUSI-P4-01`

**Tausta:** S03 S06

---

### [natura]

#### PELAAJALLE

**Kortin otsikko:** Odotetaanko metsäpeuratutkimusta?

**Korttiteksti:** Oman selvityksen perusteella kolme voimalaa pitäisi jättää pois metsäpeuran kulkuyhteydeltä. Uusi julkinen tutkimus voisi tarkentaa häiriövaikutuksen arviointia, mutta sen julkaisu on vielä kesken.

##### Valinta A

**Pyyhkäisyteksti:** Edetään ilman kolmea voimalapaikkaa

**Valinnan jälkeen näytetään:** Kolme paikkaa jätetään pois ja pienempi vaihtoehto valmistellaan ehdotukseen. Mahdollinen uusi tutkimustieto tarkistetaan vielä ennen päätöstä.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan tutkimusta ennen rajauspäätöstä

**Valinnan jälkeen näytetään:** Näiden paikkojen ratkaisu jää odottamaan julkaisua. Tutkimus käydään valmistuttuaan läpi hankkeen omien havaintojen kanssa.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `natura`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran vaikutusyhteys ja kolme yksilöityä poistettavaksi esitettyä paikkaa. Tutkimus koskee metsäpeuraa ja on vielä julkaisematta.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_odotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Siirry jo arvioituun pienempään vaihtoehtoon.

**Valinta B — vaikutus:** Odota vain julkaisun ja sen paikallisen arvioinnin vaatima aika; kirjaa kriittinen viive.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS:n metsäpeurahaara. Kielteinen lisätieto voi vaatia korjauspäätöksen, ei muuttaa jo olemassa olevaa luontoa valinnan takia.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`, `UUSI-P4-01`

**Tausta:** L02 S03 S13

---

### [leases]

#### PELAAJALLE

**Kortin otsikko:** Arvioitu sijoittelu ei ole enää nykyinen

**Korttiteksti:** Kaavaehdotuksessa kolme voimalaa on eri paikassa kuin YVA-selostuksessa. Kunta pyytää selvittämään, kattavatko aiemmat melu- ja luontoarviot muutetun sijoittelun.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan muuttuneiden vaikutusten päivitys

**Valinnan jälkeen näytetään:** Konsultti päivittää muutosta koskevat laskelmat ja luontoarviot. Tarvittavat lausunnot pyydetään päivitetystä aineistosta.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan ensin vanhan arvion kattavuus

**Valinnan jälkeen näytetään:** Konsultti vertaa muutoksia aiemmin arvioituihin vaihtoehtoihin. Jos ne jäävät niiden ulkopuolelle, varsinainen päivitys tilataan tämän tarkistuksen jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `leases`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Todellinen muutos sijoittelussa, naapurihankkeessa tai vaikutusreitissä. Näytä oikeaan muutokseen sopiva variantti.

**Vaihtoehtoinen aiheketju:** `muuttunut_arvio` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Tilaa rajattu täydennys suoraan; voi olla laajempi kuin välttämätön.

**Valinta B — vaikutus:** Tilaa suppeampi vastaavuustarkistus. Riittävä vanha aineisto säästää työtä; olennaisen muutoksen tapauksessa tarkistus ja myöhempi täydennys vievät enemmän aikaa.

**Myöhempi tapahtuma / jatko:** EV-AJANTASAISUUS. Kummastakaan valinnasta ei tehdä automaattisesti väärää; tunnetun puutteen jättäminen korjaamatta edellyttäisi erillistä valintaa.

**Kytketyt tunnisteet:** `EV-AJANTASAISUUS`

**Tausta:** L01 L02

---

### [hearing]

#### PELAAJALLE

**Kortin otsikko:** Kuka säilyttää puuston?

**Korttiteksti:** Kaava-aineistossa luvataan säilyttää paneelialueen ja kylän välinen suojapuusto. Sen omistaja ja säilyttämisen toteutustapa eivät kuitenkaan käy asiakirjoista ilmi.

##### Valinta A

**Pyyhkäisyteksti:** Sovitaan puuston säilyttämisestä

**Valinnan jälkeen näytetään:** Maanomistajan kanssa neuvotellaan säilytettävä alue ja vastuut. Sovittu järjestely viedään kaava- ja sopimusaineistoon.

##### Valinta B

**Pyyhkäisyteksti:** Arvioidaan näkymä ilman puustoa

**Valinnan jälkeen näytetään:** Maisema-arvio täydennetään tilanteeseen, jossa puusto poistuu. Paneelirajausta muutetaan, jos vaikutus sitä edellyttää.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `hearing`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Hankkeen maisemaratkaisu tukeutuu suojapuustoon, jonka säilyttämisestä ei ole sitovaa sopimusta tai muuta toimivaa järjestelyä.

**Vaihtoehtoinen aiheketju:** `suojapuuston_sopimus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-LIEVENNYS tarvittavan säilyttämisjärjestelyn valmistuessa. B:n maisematulos voi vaatia pienennystä, ei automaattista lupauksen täyttymistä.

**Kytketyt tunnisteet:** `EV-LIEVENNYS`

**Tausta:** L02 S04

---

### [proposal]

#### PELAAJALLE

**Kortin otsikko:** Maisema-arviosta puuttuu kylän tärkein näkymä

**Korttiteksti:** Kaavaehdotuksesta tehty muistutus koskee kylän yhteistä näkymää, jota havainnekuvissa ei ole. Yksi reunimmainen voimala näkyisi tästä suunnasta muita selvemmin.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään näkyvin reunavoimala pois

**Valinnan jälkeen näytetään:** Reunimmainen paikka poistetaan ehdotuksesta. Uusi näkymä kuvataan ja muutoksen vaikutus arvioidaan.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään näkymän havainnekuva ja arvio

**Valinnan jälkeen näytetään:** Puuttuva kuva ja maisema-arvio tilataan nykyiselle sijoittelulle. Niiden perusteella kunta arvioi ehdotuksen hyväksyttävyyttä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `proposal`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY RUNKOKORTTI · tuuli / hybridi

**Ehto / sijoitus:** Kaavaehdotuksen palautteessa on yksilöity arvioimatta jäänyt maisemanäkymä ja siinä hallitseva voimalapaikka.

**Vaihtoehtoinen aiheketju:** `maisemaehdotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MAISEMA näyttää jäljelle jäävän maisemavaikutuksen. Kuvan tilaaminen voi osoittaa paikan sopivan tai johtaa myöhempään pienennykseen.

**Kytketyt tunnisteet:** `EV-MAISEMA`

**Tausta:** S14 L12 L01

---

### [natura-review]

#### PELAAJALLE

**Kortin otsikko:** Maakotkatutkimus on vielä vertaisarvioinnissa

**Korttiteksti:** Maakotkatutkimuksen julkaisu voisi tarkentaa hankkeen riskimallin oletuksia. Nykyinen arvio puoltaa kahden paikan poistamista. Tutkimusryhmä ei pysty vahvistamaan julkaisupäivää.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan ilman kahta riskipaikkaa

**Valinnan jälkeen näytetään:** Kaksi paikkaa rajataan pois. Ehdotus valmistellaan nykyiseen aineistoon perustuvalla pienemmällä vaihtoehdolla.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan julkaisua

**Valinnan jälkeen näytetään:** Paikkaratkaisu jää odottamaan. Konsultti arvioi julkaisun valmistuttua, muuttaako se juuri tämän reviirin johtopäätöstä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `natura-review`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Maakotkareviiri ja julkaisematon maakotkatutkimus, joka voi vaikuttaa kyseiseen mallioletukseen.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_odotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS:n maakotkahaara. Julkaisu ei itsessään ohita paikallista lentoaineistoa tai naapurihankkeiden vaikutuksia.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`

**Tausta:** L02 S03 S13

---

### [UUSI-P4-KOTKAPAIKAT]

#### PELAAJALLE

**Kortin otsikko:** Kaksi paikkaa takaisin tarkasteluun?

**Korttiteksti:** Maakotkatutkimuksen paikallinen tarkastelu antaa aihetta arvioida kaksi pois jätettyä voimalapaikkaa uudelleen. Pienempi ehdotus olisi jo valmis; paikkojen palautus edellyttäisi uutta reviirin yhteisarviota.

##### Valinta A

**Pyyhkäisyteksti:** Lasketaan kahden paikan palautusvaihtoehto

**Valinnan jälkeen näytetään:** Kaksi aiemmin poistettua paikkaa otetaan uudelleen tutkittavaksi. Reviirin kokonaisriski, elinympäristövaikutukset ja muut sijoittelun vaikutukset arvioidaan ennen palauttamista.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään pienempi, valmis ehdotus

**Valinnan jälkeen näytetään:** Kaksi paikkaa jää pois. Nykyinen ehdotus jatkaa ilman niiden uutta arviointikierrosta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-KOTKAPAIKAT`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOKORTTI

**Ehto / sijoitus:** EV-TUTKIMUS:n myönteisesti tarkentunut maakotkahaara; kaksi yksilöityä aiemmin poistettua paikkaa ja muuten käyttökelpoinen pienempi ehdotus. Ei oletusta, että paikat kelpaavat ennen tarkastelua.

**Valinta A — vaikutus:** Avaa EV-KOTKA palautusvaihtoehdolle; paikkoja ei vielä lisätä lopulliseen lukumäärään. Pienempi vaihtoehto säilyy varalla.

**Valinta B — vaikutus:** Pidä nykyinen pienempi sijoittelu. Ei lisäkustannusta tai uutta lajiriskiä palautuksesta luopumisen vuoksi.

**Myöhempi tapahtuma / jatko:** A → EV-KOTKA:n palautuskohtaiset tulokset; hyvä tulos palauttaa vain nämä aiemmin poistetut paikat, kielteinen pitää pienemmän vaihtoehdon.

**Kytketyt tunnisteet:** `EV-KOTKA`

**Toteutuksen rajaus:** Sama hanke ei saa kahden paikan bonusta ilman aiempaa todellista poistoa. Tämä on metsäpeurakortista erillinen maakotkan jatko.

**Tausta:** L08 S13

---

### [natura-season]

#### PELAAJALLE

**Kortin otsikko:** Tutkimus tarvitsee vielä yhden vuoden

**Korttiteksti:** Tutkimusryhmä ilmoittaa jatkavansa metsäpeuran seurantaa vielä yhden havaintokauden. Hanke voisi edetä nykyisellä aineistolla ilman kahta vasomisalueen läheistä voimalapaikkaa.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan pienemmällä sijoittelulla

**Valinnan jälkeen näytetään:** Kaksi paikkaa jää pois ja ehdotusta jatketaan nykyisen arvion pohjalta.

##### Valinta B

**Pyyhkäisyteksti:** Odotetaan seuraavan kauden tutkimustuloksia

**Valinnan jälkeen näytetään:** Ehdotuksen ratkaisu siirtyy tutkimuksen valmistumiseen. Seuraavan kauden tulokset voivat tukea paikkojen säilyttämistä tai vahvistaa pienennyksen tarpeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `natura-season`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Metsäpeuran tutkimuksen lisäkausi vahvistettu. Pienempi vaihtoehto on tutkittu toteuttamiskelpoiseksi; pelaajalle näkyy odotuksen vähimmäispituus.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_odotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS ja todellisen odotuksen kerryttämä sopimusaikariski. Ei pakotettua pahaa tulosta sen takia, että pelaaja odotti.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`, `EV-MAAKUNTAODOTUS`

**Tausta:** L02 S03 S13

---

### [natura-applicable]

#### PELAAJALLE

**Kortin otsikko:** Hyvä tutkimustulos, eri ympäristö

**Korttiteksti:** Julkaistu metsäpeuratutkimus näyttää hankkeen kannalta lupaavalta. Tutkimusalue poikkeaa kuitenkin omasta alueesta, eikä konsultti pidä sen johtopäätöstä sellaisenaan sovellettavana.

##### Valinta A

**Pyyhkäisyteksti:** Pidetään omaan aineistoon perustuva pienennys

**Valinnan jälkeen näytetään:** Ehdotus jatkuu jo tutkitulla pienemmällä sijoittelulla. Tutkimuksen soveltuvuuden rajoitukset kuvataan arviossa.

##### Valinta B

**Pyyhkäisyteksti:** Tilataan paikallinen soveltuvuustarkastelu

**Valinnan jälkeen näytetään:** Konsultti vertaa tutkimuksen olosuhteita hankkeen havaintoihin. Voimalapaikkojen mahdollinen palauttaminen ratkaistaan tarkastelun jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `natura-applicable`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Tutkimus on jo julkaistu. Älä käytä julkaisun odotusajastinta tässä variantissa. Tässä variantissa jo tehty pienennys koskee kahta metsäpeuran vasomisalueen läheistä paikkaa, jos myönteistä palautushaaraa käytetään.

**Vaihtoehtoinen aiheketju:** `tutkimuksen_odotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-TUTKIMUS:n paikallista soveltuvuutta koskevat tulokset. Myönteinen tulos voi avata UUSI-P3-14:n kaltaisen laajuus–aika-valinnan.

**Kytketyt tunnisteet:** `EV-TUTKIMUS`, `UUSI-P3-14`

**Tausta:** L02 S03 S13

---

### [evidence-joint]

#### PELAAJALLE

**Kortin otsikko:** Naapurin uusi sijoittelu muuttaa yhteisvaikutuksia

**Korttiteksti:** Naapuri siirtää voimaloita ennen oman kaavaehdotuksen hyväksymistä. Muutos voi vaikuttaa samaan melukohteeseen ja maakotkareviiriin kuin oma hanke.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan muuttuneiden vaikutusten päivitys

**Valinnan jälkeen näytetään:** Konsultti päivittää muutosta koskevat laskelmat ja luontoarviot. Tarvittavat lausunnot pyydetään päivitetystä aineistosta.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan ensin vanhan arvion kattavuus

**Valinnan jälkeen näytetään:** Konsultti vertaa muutoksia aiemmin arvioituihin vaihtoehtoihin. Jos ne jäävät niiden ulkopuolelle, varsinainen päivitys tilataan tämän tarkistuksen jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `evidence-joint`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Todellinen muutos sijoittelussa, naapurihankkeessa tai vaikutusreitissä. Näytä oikeaan muutokseen sopiva variantti.

**Vaihtoehtoinen aiheketju:** `muuttunut_arvio` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Tilaa rajattu täydennys suoraan; voi olla laajempi kuin välttämätön.

**Valinta B — vaikutus:** Tilaa suppeampi vastaavuustarkistus. Riittävä vanha aineisto säästää työtä; olennaisen muutoksen tapauksessa tarkistus ja myöhempi täydennys vievät enemmän aikaa.

**Myöhempi tapahtuma / jatko:** EV-AJANTASAISUUS. Kummastakaan valinnasta ei tehdä automaattisesti väärää; tunnetun puutteen jättäminen korjaamatta edellyttäisi erillistä valintaa.

**Kytketyt tunnisteet:** `EV-AJANTASAISUUS`

**Tausta:** L01 L02

---

### [evidence-natura]

#### PELAAJALLE

**Kortin otsikko:** Natura-arviossa on vanha tieverkko

**Korttiteksti:** Kaavaehdotuksen uusi tieverkko poikkeaa Natura-arvioinnin vaihtoehdosta. Osa teistä on siirtynyt lähemmäs metsäpeuran kulkuyhteyttä.

##### Valinta A

**Pyyhkäisyteksti:** Tilataan muuttuneiden vaikutusten päivitys

**Valinnan jälkeen näytetään:** Konsultti päivittää muutosta koskevat laskelmat ja luontoarviot. Tarvittavat lausunnot pyydetään päivitetystä aineistosta.

##### Valinta B

**Pyyhkäisyteksti:** Tarkistetaan ensin vanhan arvion kattavuus

**Valinnan jälkeen näytetään:** Konsultti vertaa muutoksia aiemmin arvioituihin vaihtoehtoihin. Jos ne jäävät niiden ulkopuolelle, varsinainen päivitys tilataan tämän tarkistuksen jälkeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `evidence-natura`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Todellinen muutos sijoittelussa, naapurihankkeessa tai vaikutusreitissä. Näytä oikeaan muutokseen sopiva variantti.

**Vaihtoehtoinen aiheketju:** `muuttunut_arvio` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Valinta A — vaikutus:** Tilaa rajattu täydennys suoraan; voi olla laajempi kuin välttämätön.

**Valinta B — vaikutus:** Tilaa suppeampi vastaavuustarkistus. Riittävä vanha aineisto säästää työtä; olennaisen muutoksen tapauksessa tarkistus ja myöhempi täydennys vievät enemmän aikaa.

**Myöhempi tapahtuma / jatko:** EV-AJANTASAISUUS. Kummastakaan valinnasta ei tehdä automaattisesti väärää; tunnetun puutteen jättäminen korjaamatta edellyttäisi erillistä valintaa.

**Kytketyt tunnisteet:** `EV-AJANTASAISUUS`

**Tausta:** L01 L02

---

### [proposal-lake]

#### PELAAJALLE

**Kortin otsikko:** Vastarannalta näkyy enemmän

**Korttiteksti:** Järven vastarannan asukkaat pyytävät kuvaa omalta rannaltaan. Aiemmassa kuvasarjassa tätä suuntaa ei ole. Yksi voimalapaikka erottuu sieltä näkyvimmän ryhmän edessä.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään näkyvin reunavoimala pois

**Valinnan jälkeen näytetään:** Reunimmainen paikka poistetaan ehdotuksesta. Uusi näkymä kuvataan ja muutoksen vaikutus arvioidaan.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään näkymän havainnekuva ja arvio

**Valinnan jälkeen näytetään:** Puuttuva kuva ja maisema-arvio tilataan nykyiselle sijoittelulle. Niiden perusteella kunta arvioi ehdotuksen hyväksyttävyyttä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `proposal-lake`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Järven vastarannan havainnekuva puuttuu kaavaehdotuksen maisema-arviosta. Tarkasteltava voimalapaikka näkyisi nimenomaan tähän suuntaan.

**Vaihtoehtoinen aiheketju:** `maisemaehdotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MAISEMA näyttää jäljelle jäävän maisemavaikutuksen. Kuvan tilaaminen voi osoittaa paikan sopivan tai johtaa myöhempään pienennykseen.

**Kytketyt tunnisteet:** `EV-MAISEMA`

**Tausta:** S14 L12 L01

---

### [proposal-village]

#### PELAAJALLE

**Kortin otsikko:** Voimala näkyisi kulttuurimaiseman taustalla

**Korttiteksti:** Kyläyhdistys muistuttaa avoimen kulttuurimaiseman arvoista. Ehdotuksen reunimmainen voimalapaikka nousee keskeiseksi kysymykseksi näkymässä.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään näkyvin reunavoimala pois

**Valinnan jälkeen näytetään:** Reunimmainen paikka poistetaan ehdotuksesta. Uusi näkymä kuvataan ja muutoksen vaikutus arvioidaan.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään näkymän havainnekuva ja arvio

**Valinnan jälkeen näytetään:** Puuttuva kuva ja maisema-arvio tilataan nykyiselle sijoittelulle. Niiden perusteella kunta arvioi ehdotuksen hyväksyttävyyttä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `proposal-village`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Kaavaehdotuksen reunapaikka vaikuttaa tunnistettuun arvokkaaseen kulttuurimaisemaan. Maiseman ominaispiirteet ja paikka on yksilöity.

**Vaihtoehtoinen aiheketju:** `maisemaehdotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MAISEMA näyttää jäljelle jäävän maisemavaikutuksen. Kuvan tilaaminen voi osoittaa paikan sopivan tai johtaa myöhempään pienennykseen.

**Kytketyt tunnisteet:** `EV-MAISEMA`

**Tausta:** S14 L12 L01

---

### [proposal-photo]

#### PELAAJALLE

**Kortin otsikko:** Havainnekuva on otettu puiden takaa

**Korttiteksti:** Muistutuksessa osoitetaan, että näköalapaikan havainnekuva on tehty puiden takaa. Vieressä olevalta avoimelta paikalta reunimmainen voimala näkyisi paljon selvemmin.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään näkyvin reunavoimala pois

**Valinnan jälkeen näytetään:** Reunimmainen paikka poistetaan ehdotuksesta. Uusi näkymä kuvataan ja muutoksen vaikutus arvioidaan.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään näkymän havainnekuva ja arvio

**Valinnan jälkeen näytetään:** Puuttuva kuva ja maisema-arvio tilataan nykyiselle sijoittelulle. Niiden perusteella kunta arvioi ehdotuksen hyväksyttävyyttä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `proposal-photo`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Ehdotusvaiheen palautteessa osoitetaan, ettei aiempi havainnekuva edusta tavallista näkymää suositulta katselupaikalta.

**Vaihtoehtoinen aiheketju:** `maisemaehdotus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MAISEMA näyttää jäljelle jäävän maisemavaikutuksen. Kuvan tilaaminen voi osoittaa paikan sopivan tai johtaa myöhempään pienennykseen.

**Kytketyt tunnisteet:** `EV-MAISEMA`

**Tausta:** S14 L12 L01

---

### [hearing-mitigation]

#### PELAAJALLE

**Kortin otsikko:** Pelkkä seuranta ei riitä tähän päätökseen

**Korttiteksti:** Natura-arviossa metsäpeuran kulkuhaitan hallinta on jätetty käytönaikaisen seurannan varaan. LVV pyytää osoittamaan ennen päätöstä, millä sijoittelulla kulkuyhteys säilyy.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan kulkuyhteyden säilyttävä rajaus

**Valinnan jälkeen näytetään:** Rakentamista vähennetään todetulta kulkureitiltä. Ratkaisun toimivuus arvioidaan ennen ehdotuksen hyväksymistä.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään nykyisen lievennyksen näyttöä

**Valinnan jälkeen näytetään:** Konsultti selvittää, voidaanko nykyisen suunnitelman toimivuus osoittaa olemassa olevalla ja täydentävällä aineistolla.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `hearing-mitigation`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Natura-vaikutusyhteys ja yksilöity metsäpeuran kulkuhaitta; seuranta yksin ei osoita haitan ehkäisemistä.

**Myöhempi tapahtuma / jatko:** EV-NATURA. Jos nykyisen ratkaisun näyttö ei riitä, tarvitaan rajausmuutos. Ei hyväksyntää pelkän seurantalupauksen perusteella.

**Kytketyt tunnisteet:** `EV-NATURA`, `UUSI-P4-01`

**Tausta:** L02 S04

---

### [hearing-condition]

#### PELAAJALLE

**Kortin otsikko:** Naapurin suojapuusto on menossa hakkuuseen

**Korttiteksti:** Paneelikentän maisema-arvio olettaa naapurin metsän säilyvän. Maanomistaja kertoo nyt suunnittelevansa hakkuuta. Yhtiö ei ole sopinut puiden säilyttämisestä.

##### Valinta A

**Pyyhkäisyteksti:** Neuvotellaan säilyttämisestä korvausta vastaan

**Valinnan jälkeen näytetään:** Maanomistajalle tehdään tarjous puuston säilyttämisestä. Maisemaratkaisu jää odottamaan hänen vastaustaan.

##### Valinta B

**Pyyhkäisyteksti:** Päivitetään suunnitelma ilman naapurin puita

**Valinnan jälkeen näytetään:** Näkyvyys arvioidaan hakatulla metsällä. Oman paneelikentän rajaa tai omaa suojapuustoa suunnitellaan sen perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `hearing-condition`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY VARIANTTI · tuuli / hybridi

**Ehto / sijoitus:** Toteutettava maisemalievennys riippuu puustosta, jonka säilyttämistä nykyiset sopimukset tai määräykset eivät varmista.

**Vaihtoehtoinen aiheketju:** `suojapuuston_sopimus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-LIEVENNYS:n säilyttämisjärjestely vain hyväksytyn sopimuksen jälkeen. Sopimuksen puuttuessa ei lupauksen kirjaamista varmaksi.

**Kytketyt tunnisteet:** `EV-LIEVENNYS`

**Tausta:** L02 S04

---

### [proposal::solar-base]

#### PELAAJALLE

**Kortin otsikko:** Paneelikenttä muuttaisi avoimen peltomaiseman

**Korttiteksti:** Kaavaehdotuksen muistutus koskee kylälle avautuvaa peltomaisemaa. Näkyvin paneelilohko ulottuu pellon keskelle eikä sitä ole havainnollistettu tästä suunnasta.

##### Valinta A

**Pyyhkäisyteksti:** Jätetään näkyvin lohkon osa pois

**Valinnan jälkeen näytetään:** Paneelikenttää rajataan ja uuden ratkaisun näkyvyys tarkistetaan. Kentän laajuus pienenee.

##### Valinta B

**Pyyhkäisyteksti:** Täydennetään nykyisen kentän maisema-arvio

**Valinnan jälkeen näytetään:** Havainnekuva ja maisema-arvio laaditaan nykyiselle kentälle. Mahdollinen pienennys ratkaistaan niiden perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `proposal::solar-base`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY AURINKORUNKO · vain aurinkopelin runkovaihtoehto

**Ehto / sijoitus:** Aurinkohankkeen ehdotuksen maisema-arviosta puuttuu avoimeen peltomaisemaan kohdistuva näkymä. Paneelialuetta voidaan yhä rajata.

**Myöhempi tapahtuma / jatko:** EV-MAISEMA:n aurinkohaara. Sama maisemapienennys vähentää paneelialaa vain kerran.

**Kytketyt tunnisteet:** `EV-MAISEMA`

**Tausta:** S14 L12 L01

---

### [feedback::noise]

#### PELAAJALLE

**Kortin otsikko:** Hiljaisesta ajotavasta puuttuu takuu

**Korttiteksti:** Meluarvioon ehdotetun käyttötilan valmistajan takuu ei kata tarvittavia lähtötietoja. Toimittaja lupaa selvittää asian, mutta aineistolle ei ole varmaa toimituspäivää.

##### Valinta A

**Pyyhkäisyteksti:** Odotetaan puuttuvaa takuuaineistoa

**Valinnan jälkeen näytetään:** Toimittajalle annetaan tarvittava aineistolista. Tämän käyttötilan hyväksyttävyyttä ei voida vielä ratkaista.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan jo dokumentoitu hiljaisempi käyttötila

**Valinnan jälkeen näytetään:** Arvio päivitetään käyttötilaan, josta tarvittavat tiedot ovat saatavilla. Sen tuotantorajoitus voi olla suurempi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `feedback::noise`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY AJONAIKAINEN ERIKOISTILANNE · tuuli / hybridi

**Ehto / sijoitus:** Hiljainen ajotapa on aiemmin valittu ja takuuaineiston nimenomainen puute todettu. feedback::noise ja UUSI-P4-02 ovat saman jatkopäätöksen vaihtoehtoisia esityksiä.

**Vaihtoehtoinen aiheketju:** `melutakuun_jatko` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MELU:n takuuaineistohaara. A voi säästää vuosituotantoa ajan kustannuksella; B voi olla nopeampi mutta rajoittaa enemmän. Sama puute käsitellään enintään yhdessä jatkokierroksessa.

**Kytketyt tunnisteet:** `EV-MELU`

**Tausta:** L03 S07

---

### [feedback::herding]

#### PELAAJALLE

**Kortin otsikko:** Aidan aukko on väärässä kohdassa

**Korttiteksti:** Paliskunta osoittaa, että kaavaehdotuksen paneeliaidan aukko on sivussa porojen todellisesta kulkureitistä. Nykyinen aitalinjaus vaikeuttaisi laidunkiertoa.

##### Valinta A

**Pyyhkäisyteksti:** Siirretään aita reitin ulkopuolelle

**Valinnan jälkeen näytetään:** Paneelialuetta pienennetään ja aita siirretään pois kulkureitiltä. Uusi ratkaisu tarkistetaan poronhoitoarviossa.

##### Valinta B

**Pyyhkäisyteksti:** Jaetaan paneelit reitin molemmin puolin

**Valinnan jälkeen näytetään:** Paneelikenttä jaetaan erillisiin lohkoihin. Suunnittelija tarkistaa, mahtuvatko paneelit ja toimiva kulkuyhteys samaan kokonaisuuteen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `feedback::herding`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** PÄIVITETTY AJONAIKAINEN ERIKOISTILANNE · aurinko / hybridi

**Ehto / sijoitus:** Poronhoitoalue ja paneeliaidan yhteys laidunkiertoon; ei melujatkokortin päälle.

**Myöhempi tapahtuma / jatko:** EV-PORO. Vain poronhoitoalueelle ja oikeaan kulkureittiin; metsäpeuran tulostekstiä ei käytetä.

**Kytketyt tunnisteet:** `EV-PORO`

**Tausta:** S03 S06

---

### [UUSI-P4-01]

#### PELAAJALLE

**Kortin otsikko:** Lisäselvityksen tulos on kielteinen

**Korttiteksti:** Täydentävä arvio osoittaa, ettei valittu siirto ratkaise tunnistettua luontohaittaa. Konsultti esittää pienempää vaihtoehtoa, jolla hanketta voisi jatkaa. Nykyinen koko säilyisi vain jättämällä tämä johtopäätös ratkaisematta.

##### Valinta A

**Pyyhkäisyteksti:** Jatketaan pienemmällä vaihtoehdolla

**Valinnan jälkeen näytetään:** Kyseiset paikat ja tarpeeton infrastruktuuri poistetaan. Pienemmän hankkeen aineisto viimeistellään päätöksentekoa varten.

##### Valinta B

**Pyyhkäisyteksti:** Viedään nykyinen sijoittelu päätettäväksi

**Valinnan jälkeen näytetään:** Hanketta ei pienennetä. Päätösaineistoon jää ratkaisematon luontohaitta ja konsultin kielteinen johtopäätös.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-01`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kielteinen nimenomaista lajia/vaikutusta koskeva tulos ja vähintään yksi todellisuudessa mahdollinen pienempi vaihtoehto. Varsinaisessa pelissä body täsmennetään lähteen ongelmaan; ei geneeristä haittaa ilman edeltävää tulosta.

**Valinta A — vaikutus:** Toteuta tarjottu pienempi vaihtoehto, päivitä aineisto ja tarkista jäljelle jäävä koko.

**Valinta B — vaikutus:** Kirjaa tietoinen hyväksymisedellytyksen avoimeksi jättäminen. Päätöksessä asia voi johtaa hylkäykseen tai korjausvaatimukseen, ei automaattiseen hyväksyntään.

**Myöhempi tapahtuma / jatko:** A → EV-KORJAUS. B → LOPPU-VALINTA vasta, kun puute estää jatkon ja jätetty vaihtoehto olisi aidosti ollut käytettävissä.

**Kytketyt tunnisteet:** `EV-KORJAUS`, `LOPPU-VALINTA`

**Tausta:** L01 L02 S03

---

### [UUSI-P4-02]

#### PELAAJALLE

**Kortin otsikko:** Hiljaisesta ajotavasta puuttuu takuu

**Korttiteksti:** Meluarvioon ehdotetun käyttötilan valmistajan takuu ei kata tarvittavia lähtötietoja. Toimittaja lupaa selvittää asian, mutta aineistolle ei ole varmaa toimituspäivää.

##### Valinta A

**Pyyhkäisyteksti:** Odotetaan puuttuvaa takuuaineistoa

**Valinnan jälkeen näytetään:** Toimittajalle annetaan tarvittava aineistolista. Tämän käyttötilan hyväksyttävyyttä ei voida vielä ratkaista.

##### Valinta B

**Pyyhkäisyteksti:** Mallinnetaan jo dokumentoitu hiljaisempi käyttötila

**Valinnan jälkeen näytetään:** Arvio päivitetään käyttötilaan, josta tarvittavat tiedot ovat saatavilla. Sen tuotantorajoitus voi olla suurempi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-02`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Hiljainen ajotapa on aiemmin valittu ja takuuaineiston nimenomainen puute todettu. feedback::noise ja UUSI-P4-02 ovat saman jatkopäätöksen vaihtoehtoisia esityksiä.

**Vaihtoehtoinen aiheketju:** `melutakuun_jatko` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-MELU:n takuuaineistohaara. A voi säästää vuosituotantoa ajan kustannuksella; B voi olla nopeampi mutta rajoittaa enemmän. Sama puute käsitellään enintään yhdessä jatkokierroksessa.

**Kytketyt tunnisteet:** `EV-MELU`

**Tausta:** L03 S07

---

### [UUSI-P4-03]

#### PELAAJALLE

**Kortin otsikko:** Meluraportissa ovat vanhat koordinaatit

**Korttiteksti:** Kaavaehdotuksen kartalla on uusi sijoittelu, mutta melulaskennan lähtökoordinaatit ovat edellisestä versiosta. Raportin tiedostonimi oli jo päivitetty.

##### Valinta A

**Pyyhkäisyteksti:** Lasketaan melu nykyisillä paikoilla

**Valinnan jälkeen näytetään:** Uusi laskenta tilataan oikeilla koordinaateilla. Tämän aineiston valmistumista odotetaan ennen hyväksymiskäsittelyä.

##### Valinta B

**Pyyhkäisyteksti:** Palataan meluarvion mukaiseen sijoitteluun

**Valinnan jälkeen näytetään:** Kaavaehdotukseen palautetaan aiemmin arvioidut paikat. Samalla tarkistetaan, ettei paluu kumoa muita tehtyjä luonto- tai maankäyttöratkaisuja.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-03`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Ehdotuksen koordinaatit ja melumallin lähtökoordinaatit poikkeavat toisistaan; kysymys on todetusta sisältövirheestä, ei pelkästä tiedoston nimestä.

**Myöhempi tapahtuma / jatko:** EV-AJANTASAISUUS. B ei voi palauttaa jo luvallisesti mahdottomaksi todettua paikkaa vain välttääkseen uuden laskennan.

**Kytketyt tunnisteet:** `EV-AJANTASAISUUS`

**Tausta:** L01 L03

---

### [UUSI-P4-04]

#### PELAAJALLE

**Kortin otsikko:** Asiantuntijan pitäisi poistua kokouksesta

**Korttiteksti:** Olet vastannut hankkeen kysymyksiin suljetussa kunnanhallituksen kokouksessa. Puheenjohtaja aloittaa päätöksenteon. Hallintosäännön mukaan asiantuntijan läsnäolo päättyy tähän.

##### Valinta A

**Pyyhkäisyteksti:** Poistutaan ennen päätöksentekoa

**Valinnan jälkeen näytetään:** Poistut kokouksesta ja poistuminen merkitään pöytäkirjaan. Käsittely jatkuu ilman hankkeen edustajaa.

##### Valinta B

**Pyyhkäisyteksti:** Jäädään kuuntelemaan hiljaa

**Valinnan jälkeen näytetään:** Jäät kokoukseen päätöksenteon ajaksi. Läsnäolo on vastoin tämän kokouksen hallintosääntöä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-04`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Suljettu kokous, asiantuntija ilman muuta läsnäolo-oikeutta ja tätä nimenomaisesti rajoittava hallintosääntö.

**Myöhempi tapahtuma / jatko:** B → EV-MENETTELY. Kumoaminen vasta tuomioistuimen ratkaisun jälkeen, ei pelkän virhehavainnon hetkellä.

**Kytketyt tunnisteet:** `EV-MENETTELY`

**Tausta:** S01

---

### [UUSI-P4-05]

#### PELAAJALLE

**Kortin otsikko:** Kaava kumottiin menettelyvirheen vuoksi

**Korttiteksti:** Tuomioistuin kumoaa kaavan hyväksymispäätöksen valmistelun menettelyvirheen takia. Voimalapaikkojen sopivuutta ei tällä ratkaisulla hylätty, mutta käsittelyä pitää tehdä uudelleen.

##### Valinta A

**Pyyhkäisyteksti:** Korjataan menettely ja jatketaan valmistelua

**Valinnan jälkeen näytetään:** Kunta käynnistää tarvittavan uuden käsittelyn. Konsultti tarkistaa samalla aineiston ajantasaisuuden.

##### Valinta B

**Pyyhkäisyteksti:** Lopetetaan hankkeen jatkovalmistelu

**Valinnan jälkeen näytetään:** Omistaja päättää olla rahoittamatta uutta käsittelykierrosta. Hankkeen kehitys päättyy.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-05`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kaavan hyväksymispäätös on oikeasti kumottu menettelyvirheen vuoksi. Ei pelkän valituksen tai virheilmoituksen perusteella.

**Valinta A — vaikutus:** Kirjaa korjauskierroksen todellinen kriittinen viive. Se voi kasvattaa sopimusten määräaikariskiä.

**Valinta B — vaikutus:** Omistajan lopetus; luokittelu säilyttää alkuperäisen syyn eikä muuta omaa menettelyvirhettä ulkoiseksi häviöksi.

**Myöhempi tapahtuma / jatko:** A → asianmukainen uusi hyväksymiskäsittely. B → LOPPU-OMISTAJA.

**Kytketyt tunnisteet:** `EV-KUNTA`, `LOPPU-OMISTAJA`

**Tausta:** S01 L01

---

### [UUSI-P4-06]

#### PELAAJALLE

**Kortin otsikko:** Naapurin suojapuusto on menossa hakkuuseen

**Korttiteksti:** Paneelikentän maisema-arvio olettaa naapurin metsän säilyvän. Maanomistaja kertoo nyt suunnittelevansa hakkuuta. Yhtiö ei ole sopinut puiden säilyttämisestä.

##### Valinta A

**Pyyhkäisyteksti:** Neuvotellaan säilyttämisestä korvausta vastaan

**Valinnan jälkeen näytetään:** Maanomistajalle tehdään tarjous puuston säilyttämisestä. Maisemaratkaisu jää odottamaan hänen vastaustaan.

##### Valinta B

**Pyyhkäisyteksti:** Päivitetään suunnitelma ilman naapurin puita

**Valinnan jälkeen näytetään:** Näkyvyys arvioidaan hakatulla metsällä. Oman paneelikentän rajaa tai omaa suojapuustoa suunnitellaan sen perusteella.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-06`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Sama suojapuuston ongelma kuin hearing-condition; vain yksi esitys pelikertaan.

**Vaihtoehtoinen aiheketju:** `suojapuuston_sopimus` — yksi alkutilanne samasta ongelmasta; tämän jälkeen vain sen omat jatkot.

**Myöhempi tapahtuma / jatko:** EV-LIEVENNYS:n säilyttämisjärjestely vain hyväksytyn sopimuksen jälkeen. Sopimuksen puuttuessa ei lupauksen kirjaamista varmaksi.

**Kytketyt tunnisteet:** `EV-LIEVENNYS`

**Tausta:** L02 S02 L10

---

### [UUSI-P4-07]

#### PELAAJALLE

**Kortin otsikko:** Ennallistaminen ei poista tämän suon kuivumista

**Korttiteksti:** Voimajohdon vesitalousvaikutus uhkaa Natura-suota. Yhtiö tarjoaa toiselle alueelle ennallistamista, mutta LVV huomauttaa, ettei se estä tämän suon heikkenemistä.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään erillisen poikkeusmenettelyn edellytykset

**Valinnan jälkeen näytetään:** Konsultti ja juristi selvittävät, onko poikkeusmenettelylle tässä hankkeessa edellytyksiä. Ennallistamissuunnitelma ei vielä mahdollista nykyistä reittiä.

##### Valinta B

**Pyyhkäisyteksti:** Suunnitellaan suon vesitalouden turvaava reitti

**Valinnan jälkeen näytetään:** Johdolle etsitään reittiä, joka ei muuta suon vedensaantia. Natura-arvio päivitetään uuden vaihtoehdon mukaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-07`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Todellinen merkittävän Natura-heikennyksen riski ja toiselle alueelle esitetty korvaava toimi. Kyse ei ole UUSI-P1-06:n nykyistä lisääntymispaikkaa turvaavasta kosteikkoratkaisusta.

**Myöhempi tapahtuma / jatko:** EV-NATURA: A ei ole ostettava yleinen varalupa. B voi säästää menettelyaikaa, mutta tarvitsee toimivan reitin.

**Kytketyt tunnisteet:** `EV-NATURA`

**Tausta:** L02 S21 V5-L3 V5-L4

---

### [UUSI-P4-08]

#### PELAAJALLE

**Kortin otsikko:** Natura-arvion lähtötiedot muuttuvat

**Korttiteksti:** Viranomainen valmistelee metsäpeuran lisäämistä läheisen Natura-alueen suojeluperusteisiin. Uusi aineisto osoittaa eläinten käyttävän myös hankealueen kautta kulkevaa reittiä.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään muutoksen tila ja päivitetään vaikutusarvio

**Valinnan jälkeen näytetään:** Konsultti tarkistaa viranomaiselta, missä vaiheessa suojeluperusteen muutos on. Uusi havaintoaineisto otetaan hankkeen arvioon.

##### Valinta B

**Pyyhkäisyteksti:** Valmistellaan kulkureittiä väistävä vaihtoehto

**Valinnan jälkeen näytetään:** Hankkeen paikkoja ja teitä suunnitellaan pois todetulta reitiltä. Muuttuneen vaihtoehdon vaikutukset arvioidaan.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-08`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Vahvistettu valmistelutieto, ei huhu; muutoksen oikeudellinen vaihe on kirjattava. Metsäpeuran esiintymisalue.

**Myöhempi tapahtuma / jatko:** EV-NATURA. Suojeluperusteen valmistelu, vahvistettu muutos ja uusi olennainen luontotieto erotetaan toisistaan.

**Kytketyt tunnisteet:** `EV-NATURA`

**Tausta:** L02 S13

---

### [UUSI-P4-09]

#### PELAAJALLE

**Kortin otsikko:** Pienempi hanke tuli lähemmäs toista naapuria

**Korttiteksti:** Ehdotuksen pienennyksessä yksi voimala siirrettiin lähemmäs uutta naapuria. Voimalamäärä väheni, mutta hänen kohdallaan melu- ja maisemavaikutus kasvaisi.

##### Valinta A

**Pyyhkäisyteksti:** Viedään muutos kunnan kuulemistarpeen arvioon

**Valinnan jälkeen näytetään:** Kunta tarkistaa, miten muuttunut ehdotus on kuultava. Uuden paikan vaikutukset toimitetaan samaan käsittelyyn.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään siirretty voimala pois

**Valinnan jälkeen näytetään:** Uusi, naapuria lähestyvä paikka poistetaan. Hankkeen koko pienenee lisää, ja kunta tarkistaa jäljelle jäävän muutoksen käsittelytarpeen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-09`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Nähtävillä olleen ehdotuksen voimalaa on siirretty lähemmäs toista naapuria. Siirron muuttuneet vaikutukset ja kuulemisen tarve on ratkaistava.

**Myöhempi tapahtuma / jatko:** EV-KUULEMINEN. B ei automaattisesti vapauta kaikkia muita ehdotuksen muutoksia kuulemisesta.

**Kytketyt tunnisteet:** `EV-KUULEMINEN`

**Tausta:** L12 L01

---

### [UUSI-P4-10]

#### PELAAJALLE

**Kortin otsikko:** Uusi valtuusto suhtautuu hankkeeseen varauksella

**Korttiteksti:** Kaavaehdotus tulee uuden valtuuston käsittelyyn. Ratkaiseva ryhmä haluaa rajata asutuksen puoleista voimalaryhmää aiempaa enemmän.

##### Valinta A

**Pyyhkäisyteksti:** Perustellaan nykyinen arvioitu sijoittelu

**Valinnan jälkeen näytetään:** Kunnalle toimitetaan nykyisen sijoittelun vaikutusarvio ja vastaukset esitettyihin kysymyksiin. Ehdotuksen kokoa ei muuteta.

##### Valinta B

**Pyyhkäisyteksti:** Valmistellaan pienennetty vaihtoehto

**Valinnan jälkeen näytetään:** Asutuksen puoleisia paikkoja rajataan pois. Muutettu aineisto arvioidaan ja käsittelyaikataulu päivitetään.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-10`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kunnan poliittinen tilanne on muuttunut ja esitetty huoli on yksilöity. Pelkkä valtuuston vaihtuminen ei takaa kielteistä kantaa.

**Myöhempi tapahtuma / jatko:** EV-KUNTA. A voi säilyttää koon tai jäädä ilman tukea; B voi auttaa vain, jos huoli ratkeaa ja vaihtoehto on asianmukaisesti valmisteltu.

**Kytketyt tunnisteet:** `EV-KUNTA`

**Tausta:** L12 L01

---

### [UUSI-P4-VUOKRAJATKO]

#### PELAAJALLE

**Kortin otsikko:** Maanomistajilta tarvitaan jatkoa

**Korttiteksti:** Hankkeeseen kertynyt viive ja maakuntakaavan lykkääntyminen uhkaavat ylittää vuokrasopimusten valmisteluajan. Keskeisten kiinteistöjen omistajille pitää tehdä jatkoesitys nyt.

##### Valinta A

**Pyyhkäisyteksti:** Tarjotaan jatkoa korkeammalla korvauksella

**Valinnan jälkeen näytetään:** Lähetät jatkosopimukset ja korotetun korvausesityksen. Jatkamisesta pyydetään vastaukset ennen nykyisten määräaikojen päättymistä.

##### Valinta B

**Pyyhkäisyteksti:** Pyydetään jatkoa nykyisillä korvauksilla

**Valinnan jälkeen näytetään:** Lähetät jatkoesityksen nykyisillä ehdoilla. Osa maanomistajista on jo kertonut harkitsevansa muuta käyttöä, jos odotus jatkuu.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-VUOKRAJATKO`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOKORTTI

**Ehto / sijoitus:** EV-MAAKUNTAODOTUS käsitelty; avoidableCriticalDelayMonths >=24; regionalPlanDependency=true; ennustettu odotus ylittää oikeasti sovitut määräajat. Tarjoa vain kerran ja ennen päättymistä.

**Valinta A — vaikutus:** Lisäkustannus voi mahdollistaa suostumuksen osalta omistajista. Ei automaattista kaikkien allekirjoitusta lisämaksulla.

**Valinta B — vaikutus:** Säilytä nykyinen tarjouskorvaus. Omistajien jatkohalukkuus on aiemmin määritelty suhteessa odotukseen ja tarjottuihin ehtoihin.

**Myöhempi tapahtuma / jatko:** EV-OPTIO antaa täsmällisen jatkotuloksen. Jos määräaika päättyy, tärkeät kiinteistöt jäävät ilman sopimusta eikä korvaava sijoittelu riitä, LOPPU-VUOKRA-AIKA päättää hankkeen.

**Kytketyt tunnisteet:** `EV-OPTIO`, `LOPPU-VUOKRA-AIKA`

**Toteutuksen rajaus:** Myönteinen jatko mahdollinen; ei pakollista tappiota kaikille. Kielteinen vastaus ei pura muita voimassa olevia sopimuksia. Valintaperäinen luokitus vaatii todellisen, aiemmilla valinnoilla vältettävissä olleen kokonaisviiveen.

**Tausta:** L10 V5-L1

---

### [UUSI-P4-11]

#### PELAAJALLE

**Kortin otsikko:** Haetaanko muutosta hallinto-oikeuden ratkaisuun?

**Korttiteksti:** Hallinto-oikeus kumoaa kaavan selvitysten riittävyyden vuoksi. Juristin mukaan ratkaisussa on peruste hakea valituslupaa korkeimmalta hallinto-oikeudelta. Uusi kaavavalmistelu olisi toinen vaihtoehto.

##### Valinta A

**Pyyhkäisyteksti:** Haetaan valituslupaa KHO:lta

**Valinnan jälkeen näytetään:** Valituslupahakemus ja valitus laaditaan. KHO ratkaisee, otetaanko asia käsiteltäväksi ja muutetaanko aiempaa ratkaisua.

##### Valinta B

**Pyyhkäisyteksti:** Korjataan aineisto ja valmistellaan kaava uudelleen

**Valinnan jälkeen näytetään:** Kunta ja konsultti aloittavat uuden valmistelun. Puuttuva aineisto täydennetään ennen seuraavaa hyväksymiskäsittelyä.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-11`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Hallinto-oikeuden kumoaminen ja juridisesti perusteltu valitusmahdollisuus; ei vaiheeseen arvottava peruskortti.

**Myöhempi tapahtuma / jatko:** A → EV-VALITUS:n KHO-vaihe. B → uusi EV-KUNTA vasta valmistelun jälkeen.

**Kytketyt tunnisteet:** `EV-VALITUS`, `EV-KUNTA`

**Tausta:** S02 L12

---

### [UUSI-P4-12]

#### PELAAJALLE

**Kortin otsikko:** Kaava hyväksyttiin, lupa-asiat ovat vielä kesken

**Korttiteksti:** Valtuusto on hyväksynyt kaavan. Rakentamislupien ja muiden tarvittavien lupien valmistelu jatkuu vielä. Mahdollisen akkuosan selvitykset ovat ydinhanketta jäljessä.

##### Valinta A

**Pyyhkäisyteksti:** Viedään koko hankkeen luvat valmiiksi

**Valinnan jälkeen näytetään:** Lupahakemusten puuttuvat tiedot täydennetään. Tavoitteena on saada kaikki mukana olevat hankeosat luvitetuiksi.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään erillinen akkuosa myöhempään

**Valinnan jälkeen näytetään:** Ydinhankkeen luvat viimeistellään ilman akkuosaa. Akun myöhempi toteutus valmistellaan erikseen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `UUSI-P4-12`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · tuuli / hybridi

**Ehto / sijoitus:** Kaava hyväksytty; BESS aidosti erotettavissa ja sen lupavalmistelu ainoa lisäosan viive. Jos akkua ei ole, tämä on etenemistapahtuma eikä valinta tyhjästä.

**Myöhempi tapahtuma / jatko:** EV-LAINVOIMA ja EV-LUVAT. Välttämättömiä ydinhankkeen lupia ei ohiteta hankeosia rajaamalla.

**Kytketyt tunnisteet:** `EV-LAINVOIMA`, `EV-LUVAT`

**Tausta:** L01 L12 B03

---

### [BESS-P4-01]

#### PELAAJALLE

**Kortin otsikko:** Alustava verkkovastaus ei ollut liittymissopimus

**Korttiteksti:** Akun jakeluverkkoliitynnän alustava tarkastelu oli myönteinen. Sopimuksen tekemiseen tarvittava Fingridin hyväksyntä ja hakemuksen lupaedellytykset pitää kuitenkin vielä varmistaa.

##### Valinta A

**Pyyhkäisyteksti:** Valmistellaan liittymissopimushakemus

**Valinnan jälkeen näytetään:** Lupapäätökset ja muut hakemuksen lähtötiedot kootaan. Hakemus toimitetaan, kun sen edellytykset täyttyvät.

##### Valinta B

**Pyyhkäisyteksti:** Luvitetaan akku ja siirretään liittäminen myöhemmäksi

**Valinnan jälkeen näytetään:** Lupatyötä jatketaan, mutta akun rakentamista ja liittämistä ei vielä aikatauluteta sitovasti.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-01`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** BESSin suunniteltu liityntä kuuluu sovellettavaan hakemusmenettelyyn; liittymissopimusta ei vielä ole.

**Myöhempi tapahtuma / jatko:** Valmis lupakokonaisuus arvioidaan erikseen. Liittymismenettelyn lupaedellytyksiä ei käännetä niin, että rakentamisluvan saaminen vaatisi jo tätä liittymissopimusta.

**Tausta:** B01 B02 V5-G1

---

### [BESS-P4-02]

#### PELAAJALLE

**Kortin otsikko:** Hyväksynnän määräaika lähestyy

**Korttiteksti:** Fingridin liittymissopimusta koskevan hyväksynnän voimassaoloaika on päättymässä. Yhtiön sisäinen päätös puuttuu. Vastuuhenkilön seuraava vapaa kokousaika olisi vasta määräajan jälkeen.

##### Valinta A

**Pyyhkäisyteksti:** Järjestetään päätöskokous ennen määräaikaa

**Valinnan jälkeen näytetään:** Sisäinen päätös käsitellään ajoissa. Sopimus voidaan tehdä määräajan kuluessa, jos ehdot hyväksytään.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään sopimus myöhempään käsittelyyn

**Valinnan jälkeen näytetään:** Hyväksynnän määräaika umpeutuu ennen sopimuksen tekemistä. Liittymissopimusasia on haettava uudelleen käsiteltäväksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-02`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Todellinen Fingridin voimassa oleva hyväksyntä ja näkyvä määräpäivä; pelaajalla vielä mahdollisuus järjestää päätös.

**Myöhempi tapahtuma / jatko:** B avaa uuden liittymiskäsittelyn eikä kumoa rakentamislupaa. A:n kokouskulua ei tehdä automaattiseksi lupahyväksynnäksi.

**Tausta:** B01 V5-G1

---

### [BESS-P4-03]

#### PELAAJALLE

**Kortin otsikko:** Akun luvat saatiin, reservikäyttö selvitetään myöhemmin

**Korttiteksti:** Akkuvaraston tarvittavat luvat ovat valmiit. Toteutusvaiheeseen jäävät vielä rakentaminen, käyttöönottotestit ja reservituotteiden hyväksynnät.

##### Valinta A

**Pyyhkäisyteksti:** Luovutetaan luvitettu akkuosa toteutusvalmisteluun

**Valinnan jälkeen näytetään:** Lupapäätökset ja jatkotehtävät toimitetaan toteutuksesta vastaavalle tiimille.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään investointi odottamaan teknistä varmistusta

**Valinnan jälkeen näytetään:** Omistaja siirtää investointipäätöstä. Akun valmiit luvat jäävät hankkeen käyttöön.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-03`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akkuosan luvat valmiit. Jos koko hankkeen luvitusmaali on jo saavutettu, tämä on vapaaehtoinen epilogi, ei uusi voiton estävä päätös.

**Myöhempi tapahtuma / jatko:** Molemmat tunnustavat valmistuneen luvituksen. Käyttöönoton viivettä ei lisätä jo päättyneen lupapelin aikarangaistukseksi.

**Tausta:** B06 L12

---

### [BESS-P4-04]

#### PELAAJALLE

**Kortin otsikko:** Akku odottaa verkkoa, tuulipuisto voisi jatkaa

**Korttiteksti:** Akkuvaraston tavoiteltu liityntä odottaa verkon vahvistusta. Tuulipuistolla on erillinen toteuttamiskelpoinen verkkoratkaisu. Osat voidaan selvityksen mukaan erottaa.

##### Valinta A

**Pyyhkäisyteksti:** Siirretään akku seuraavaan vaiheeseen

**Valinnan jälkeen näytetään:** Tuulipuiston valmistelu jatkuu ilman akkuosan odotusta. Akulle jätetään oma myöhempi toteutusvaihe.

##### Valinta B

**Pyyhkäisyteksti:** Pidetään hankeosat samassa aikataulussa

**Valinnan jälkeen näytetään:** Yhteinen toteutusajankohta siirtyy akun verkkoratkaisun mukaan. Omistaja hyväksyy pidemmän odotuksen.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-04`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** BESSin viive on todettu ja ydinhanke voidaan oikeasti erottaa siitä. Ei vaihtoehtoa, jos erottaminen rikkoo ydinhankkeen verkkoratkaisun.

**Myöhempi tapahtuma / jatko:** Jos koko luvitus on jo valmis, ei enää uutta tappiota tästä toteutusaikataulun valinnasta. Jos lisäodotus tosiasiassa estää kesken olevaa valmistelua, vain se osa kirjataan.

**Tausta:** B01 B02

---

### [BESS-P4-RAJAUS]

#### PELAAJALLE

**Kortin otsikko:** Akulle tarjotaan vain rajattua tehoa

**Korttiteksti:** Verkkoselvityksen mukaan akku voisi jatkaa pienemmällä lataus- ja purkuteholla. Alkuperäistä tehoa ei ole saatavilla tavoiteaikaan.

##### Valinta A

**Pyyhkäisyteksti:** Suunnitellaan akku tarjotulle teholle

**Valinnan jälkeen näytetään:** Akun käyttö ja laitemitoitus päivitetään verkkoyhtiön tarjoamalle teholle. Kannattavuusarvio lasketaan uudelleen.

##### Valinta B

**Pyyhkäisyteksti:** Jätetään akku pois tästä hankevaiheesta

**Valinnan jälkeen näytetään:** Akkuvarasto siirretään jatkoharkintaan. Muu hanke etenee ilman sen verkkorajoitetta.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-RAJAUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOKORTTI

**Ehto / sijoitus:** EV-BESS-VERKKO:n rajattu tulos, tarjotut tehot tiedossa ja BESS erotettavissa ydinhankkeesta.

**Valinta A — vaikutus:** Päivitä chargeMW/dischargeMW erikseen. Energiakapasiteetti MWh muuttuu vain valitun laitemitoituksen mukaan.

**Valinta B — vaikutus:** bessIncluded=false tässä luvitettavassa vaiheessa. Älä jätä jatkoon akkuun yksin sidottuja odottavia tehtäviä.

**Myöhempi tapahtuma / jatko:** Uusi laite- ja käyttöratkaisu tarkistetaan ennen tarvittavaa lupapäätöstä.

**Tausta:** B01 B06

---

### [BESS-P4-05]

#### PELAAJALLE

**Kortin otsikko:** Turvallisuustarkastelussa pyydetään toista ratkaisua

**Korttiteksti:** Akkualueen turvallisuusarviossa viitataan ulkomaiseen standardiin ja pyydetään lisää tilaa laitteiden ympärille. Suunnittelija haluaa tarkistaa, mitä tässä kohteessa pitää osoittaa.

##### Valinta A

**Pyyhkäisyteksti:** Selvitetään vaatimuksen peruste ja osoittamistapa

**Valinnan jälkeen näytetään:** Suunnittelija käy perusteen läpi toimivaltaisten tahojen kanssa ja täydentää turvallisuusarvion sovitulla tavalla.

##### Valinta B

**Pyyhkäisyteksti:** Laaditaan väljempi asemapiirros vertailuun

**Valinnan jälkeen näytetään:** Laitteille ja kulkureiteille varataan enemmän tilaa. Uusi piirros viedään turvallisuusarvioon.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-05`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Akku on mukana. Turvallisuussuunnittelun vertailussa on ulkomainen standardi tai ohje, jonka asema ja soveltuvuus tähän kohteeseen on vielä selvitettävä.

**Myöhempi tapahtuma / jatko:** Toisen maan standardi ei sellaisenaan ole Suomen yleinen lakisääteinen etäisyys. Suunnittelija voi käyttää sitä perusteltuna osoittamiskeinona; rajoitteen oikea asema selvitetään.

**Tausta:** B03 B04

---

### [BESS-P4-06]

#### PELAAJALLE

**Kortin otsikko:** Akkuosa on luvitettu

**Korttiteksti:** Akkualueen sopimukset, sijoittelu ja lupa-aineisto vastaavat samaa suunnitelmaa. Tarvittavat luvat on saatu ja niiden tila tarkistettu.

##### Valinta A

**Pyyhkäisyteksti:** Viimeistellään lupa-aineiston luovutus

**Valinnan jälkeen näytetään:** Lupapäätökset, ehdot ja hyväksytyt piirustukset kootaan toteutusta varten.

##### Valinta B

**Pyyhkäisyteksti:** Käydään jatkotehtävät toteutustiimin kanssa

**Valinnan jälkeen näytetään:** Rakentamis- ja käyttöönottovaiheen tehtävät käydään läpi. Akkuosan luvitus kirjataan valmiiksi.

#### CODEX / PELILOGIIKKA

**Kortti-ID:** `BESS-P4-06`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI · BESS / valinnainen hybridiakku

**Ehto / sijoitus:** Vain todellisuudessa luvitetun akkuosan myönteinen epilogi. Ei uusi riskikortti tai maksu ennen jo saavutettua voittoa.

**Myöhempi tapahtuma / jatko:** BESSin luvitus voidaan huomioida pisteissä, jos se kuului pelikerran tavoitteeseen. Tulevaa reservituottoa ei kirjata varmaksi.

**Tausta:** B03 B06 B07

---

**Tulokset, välitapahtumat ja vaiheen mahdolliset loput**

### [EV-OPTIO]

#### PELAAJALLE

**Tapahtuman otsikko:** Vuokrasopimusten jatkosta vastattiin

**Tapahtumateksti:** Keskeisten kiinteistöjen maanomistajat ovat vastanneet jatkoesityksiin.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Riittävät jatkosopimukset saadaan:**
Jatkosopimukset saadaan hankkeen tarvitsemille alueille. Maakuntakaavan odottamista voidaan jatkaa uusilla määräajoilla.

**Haara — Osa kieltäytyy, mutta hanke voidaan sijoittaa muualle:**
Osa maanomistajista ei jatka sopimusta. Muut alueet ja korvaava sijoittelu riittävät pienempään hankkeeseen; muutoksen arviointi aloitetaan.

**Haara — Riittävän moni ei suostu jatkoon eikä korvaavaa aluetta ole:**
Riittävän moni keskeinen maanomistaja ei jatka sopimusta. Nykyiset määräajat eivät riitä kaavan odotukseen, eikä rakentamista voida siirtää muille alueille.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-OPTIO`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** UUSI-P4-VUOKRAJATKO tehty. Sopimuskohtaiset vastaukset, määräajat ja korvaavien alueiden tarkistus valmiit.

**Myöhempi tapahtuma / jatko:** Viimeinen haara → LOPPU-VUOKRA-AIKA vasta toteutuneen sopimuskatkon ja vaihtoehtojen loppumisen jälkeen. Muut haarat jatkavat hanketta.

**Kytketyt tunnisteet:** `LOPPU-VUOKRA-AIKA`

**Tausta:** L10 V5-L1

---

### [EV-MAAKUNTAODOTUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Maakuntakaava viivästyy taas

**Tapahtumateksti:** Maakuntaliitto ilmoittaa tarvittavan kaavaratkaisun siirtyvän. Hankkeen aiemmat viiveet ovat jo kuluttaneet vuokrasopimusten valmisteluaikaa. Nykyiset määräajat eivät riitä uuteen aikatauluun.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MAAKUNTAODOTUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** Vaihe 4; merkittävä valintojen aiheuttama lisäviive (lähtöarvo >=24 kk), todellinen riippuvuus viivästyneestä maakuntakaavasta ja usean olennaisen sopimuksen ennustettu määräajan ylitys. Pelkkä ulkoinen odotus ei avaa tätä yhdistelmäansaa.

**Myöhempi tapahtuma / jatko:** UUSI-P4-VUOKRAJATKO ennen määräaikojen päättymistä. Muussa tapauksessa tavallinen maakuntakaavaodotus ei yksin synnytä tätä sopimusten loppua.

**Kytketyt tunnisteet:** `UUSI-P4-VUOKRAJATKO`

**Tausta:** L10 L01 V5-L1

---

### [interludes[3][0]]

#### PELAAJALLE

**Tapahtuman otsikko:** Vastineet valmistuvat

**Tapahtumateksti:** Konsultti ja kunta käyvät ehdotuksen muistutukset ja lausunnot läpi. Vastineisiin kirjataan tarvittavat suunnitelmamuutokset ja perustelut.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[3][0]`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Kaavaehdotuksen muistutukset ja lausunnot on saatu vastineiden valmisteluun. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[3][1]]

#### PELAAJALLE

**Tapahtuman otsikko:** Muutettu hanke esiteltiin kunnalle

**Tapahtumateksti:** Esittelit pienennetyn sijoittelun ja selvitysten johtopäätökset luottamushenkilöille. Kaavaehdotuksen varsinainen hyväksymiskäsittely on vielä edessä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[3][1]`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Muutettu suunnitelma on esitelty kunnassa ennen varsinaista hyväksymiskäsittelyä. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[3][2]]

#### PELAAJALLE

**Tapahtuman otsikko:** Ehdotuksen asiakirjat tarkistettiin

**Tapahtumateksti:** Kaavakartta, määräykset ja vaikutusarviot vastaavat nyt samaa sijoittelua. Aineisto valmistellaan hyväksymiskäsittelyyn.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[3][2]`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Ehdotuksen kartta, määräykset ja vaikutusliitteet on tarkistettu samaan sijoitteluun. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [interludes[3][3]]

#### PELAAJALLE

**Tapahtuman otsikko:** Viimeiset täydennykset valmistuvat

**Tapahtumateksti:** Lausuntojen vaatimia täydennyksiä viimeistellään. Kunta kokoaa päätösesitystä, ja lupahakemusten valmistelu jatkuu rinnalla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `interludes[3][3]`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY VÄLITARINA

**Laukaisuehto:** Ehdotusvaiheen nimetyt täydennykset etenevät; kaikki pakolliset puutteet eivät vielä välttämättä ole ratkaistut. Etenemishetki ei lisää aikaa tai muuta selvitystulosta itsestään.

**Tausta:** L01

---

### [proposal-review]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavaehdotus valmistellaan päätettäväksi

**Tapahtumateksti:** Ehdotuksen lausunnot ja muistutukset on käsitelty. Kunta tarkistaa vastineet, päivitetyt selvitykset ja kaavamääräykset ennen hyväksymisesitystä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `proposal-review`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Oikea ehdotuskuuleminen päättynyt ja sen vastineet sekä tarpeelliset täydennykset valmiit.

**Tausta:** L01

---

### [adoption]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaava hyväksyttiin.

**Tapahtumateksti:** Valtuusto hyväksyi kaavan. Mahdollinen muutoksenhaku käsitellään seuraavaksi. Rakentamis- ja muiden tarvittavien lupien valmistelu jatkuu.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `adoption`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Kunnan toimivaltainen hyväksymispäätös on tehty; ei vielä planFinal=true.

**Myöhempi tapahtuma / jatko:** EV-LAINVOIMA suoraan vasta lainvoiman varmistuttua; valitettu asia ensin EV-VALITUS.

**Kytketyt tunnisteet:** `EV-LAINVOIMA`, `EV-VALITUS`

**Tausta:** L01

---

### [ready]

#### PELAAJALLE

**Tapahtuman otsikko:** Hankkeen luvat ovat valmiit

**Tapahtumateksti:** Kaava ja hankkeen tarvitsemat luvat ovat lainvoimaisia. Lopullinen suunnitelma vastaa käsiteltyjä asiakirjoja, eikä luvituksessa ole enää avoimia esteitä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ready`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · PÄIVITETTY MOOTTORITEKSTI

**Laukaisuehto:** Kaikki kyseisen hankkeen vaaditut lupa- ja lainvoimaehdot täyttyvät, ei vain yksittäinen kaavahyväksyntä.

**Myöhempi tapahtuma / jatko:** LOPPU-VOITTO. Tämän jälkeen ei enää ulkoista epäonnistumista ennen pisteitä.

**Kytketyt tunnisteet:** `LOPPU-VOITTO`

**Tausta:** L01

---

### [EV-AURINKOLUONTO]

#### PELAAJALLE

**Tapahtuman otsikko:** Paneelikentän luontoarvio valmistui

**Tapahtumateksti:** Konsultti on arvioinut muutetun paneelikentän ja siihen liittyvät työt.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Viitasammakko: nykyinen lisääntymispaikka säilyy:**
Uusi kuivatus ja kenttärajaus säilyttävät lisääntymispaikan vedensaannin ja toiminnan. Paneelialaa voidaan pitää mukana enemmän kuin alkuperäisessä poisrajauksessa.

**Haara — Viitasammakko: kuivatusratkaisu ei riitä:**
Ehdotettu kuivatus heikentäisi edelleen lisääntymispaikkaa. Paneelikenttä rajataan laajemmin pois sen vesitalouteen vaikuttavalta alueelta.

**Haara — Liito-orava: puustoinen yhteys säilyy:**
Uusi lohkojako jättää lisääntymispaikan ja ruokailumetsän välille toimivan puustoisen yhteyden. Säilytettävä alue merkitään suunnitelmaan.

**Haara — Liito-orava: puustoinen yhteys jää riittämättömäksi:**
Uudessa lohkojaossa puustoinen yhteys jää liian kapeaksi. Paneelikenttää on pienennettävä, jotta yhteys säilyy.

**Haara — Linnusto: levähdysalue säilyy toimivana:**
Uusi kenttärajaus jättää lintujen tärkeimmän levähdys- ja ruokailualueen käyttöön. Arvio tukee tämän rajauksen jatkoa.

**Haara — Linnusto: kenttärajaus on edelleen liian laaja:**
Paneelikenttä veisi edelleen liikaa lintujen käyttämästä alueesta. Havaintojen ydinosan kohdalle suunnitellut paneelit jätetään pois.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-AURINKOLUONTO`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Valitse vain alkuperäistä lajia/vaikutusta ja valittua vaihtoehtoa vastaava haarapari. Arvio ja tarvittava lausuntokäsittely valmiit.

**Myöhempi tapahtuma / jatko:** Viitasammakon myönteinen kosteikkoratkaisu näytetään EV-KOSTEIKKO:ssa, ei tuplahyötynä tässä. Erillinen lajipoikkeus käsitellään vain omilla laissa määrätyillä edellytyksillään.

**Kytketyt tunnisteet:** `EV-KOSTEIKKO`

**Toteutuksen rajaus:** Poikkeuslupaa ei arvota kaikkien luontohavaintojen yhteisenä myönteisenä tuloksena.

**Tausta:** L04 L02 S02

---

### [EV-MELU]

#### PELAAJALLE

**Tapahtuman otsikko:** Päivitetty meluarvio valmistui

**Tapahtumateksti:** Valittu sijoittelu tai käyttötila on laskettu oikeilla lähtötiedoilla ja tarvittavilla yhteisvaikutuksilla.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Siirto: paikat löytyivät ja laskenta alittaa ohjearvon:**
Korvaava sijoittelu alittaa tarkasteltavan yöajan ohjearvon. Voimalamäärä säilyy, ja uusien paikkojen muut vaikutukset tarkistetaan.

**Haara — Siirto: vuokratuille alueille ei mahdu riittävää väistöä:**
Maanvuokrauksessa menetetyt kiinteistöt jättivät sijoittelun liian tiiviiksi. Yhteismelua ei saada riittävästi alas pelkillä siirroilla; osa näistä paikoista on jätettävä pois.

**Haara — Siirto: muut vaikutukset estävät korvaavat paikat:**
Tutkituilta korvaavilta paikoilta ei löydy muiden luonto- tai ilmailuvaikutusten kannalta soveltuvaa sijoittelua. Näiden voimaloiden määrä tai käyttö pitää ratkaista toisin.

**Haara — Melumoodi: takuuarvot ja laskenta riittävät:**
Valmistajan tiedot kattavat valitun käyttötilan. Laskenta alittaa tarkastellun yöajan ohjearvon tällä ajotavalla, mutta vuosituotanto pienenee.

**Haara — Melumoodi: takuuaineisto jää puutteelliseksi:**
Valmistajan tiedot eivät riitä osoittamaan tämän käyttötilan melupäästöä. Puuttuva aineisto tai toinen dokumentoitu ratkaisu tarvitaan ennen hyväksymistä.

**Haara — Takuuaineiston jatkotyö onnistuu:**
Valmistaja toimitti pyydetyt takuuarvot. Päivitetty laskenta tukee valittua käyttötilaa.

**Haara — Dokumentoitu hiljaisempi tila toimii:**
Jo dokumentoidun käyttötilan laskenta alittaa ohjearvon. Vuosituotantoon jää tämän ajotavan edellyttämä suurempi rajoitus.

**Haara — Takuuaineiston jatkotyö ei tuota tarvittavaa tietoa:**
Toimittaja ei pysty toimittamaan tarvittavaa takuuaineistoa. Tätä käyttötilaa ei käytetä ratkaisuna; hankkeelle valitaan dokumentoitu ajotapa tai pienempi sijoittelu.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MELU`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Lähdekortti ja valittu ratkaisu määräävät haararyhmän. Siirtotilan puute saa viitata aiempaan maa-aluemenetykseen vain, jos se oikeasti tapahtui.

**Myöhempi tapahtuma / jatko:** Ensimmäinen takuupuute → UUSI-P4-02 tai feedback::noise. Jatkotyön jälkeen ei samaa odotusta uudelleen: tunnettu dokumentoitu vaihtoehto valitaan tai hanketta pienennetään.

**Kytketyt tunnisteet:** `UUSI-P4-02`, `feedback::noise`

**Toteutuksen rajaus:** Sama arvio ei saa toistaa samoja kuukausia tai paikkapoistoja. Toteutuksessa nimeä kyseiset kohteet, älä keksi yleistä tietyn MW-luokan pakkovaihtoa.

**Tausta:** L03 S07

---

### [EV-MAISEMA]

#### PELAAJALLE

**Tapahtuman otsikko:** Täydentävä maisema-arvio valmistui

**Tapahtumateksti:** Puuttuva näkymä on havainnollistettu ja vaikutus arvioitu.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Tuuli: nykyinen sijoittelu voidaan perustella:**
Uusi aineisto ei osoita tähän näkymään sellaista haittaa, joka edellyttäisi esitettyä voimalapoistoa. Ehdotus voi jatkaa nykyisellä sijoittelulla.

**Haara — Tuuli: reunapaikan poisto tarvitaan:**
Täydentävä kuva osoittaa reunapaikan hallitsevan tärkeää näkymää. Kunta pyytää sen poistamista ennen ehdotuksen jatkokäsittelyä.

**Haara — Aurinko: nykyinen kenttä voidaan perustella:**
Paneelikentän maisemavaikutus on arvioitu ja tarvittavat toteutuskeinot voidaan osoittaa. Ehdotus voi jatkaa.

**Haara — Aurinko: näkyvintä lohkoa pitää pienentää:**
Maisema-arvio osoittaa näkyvimmän paneelilohkon rajauksen liian laajaksi. Ehdotusta pienennetään ennen jatkokäsittelyä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MAISEMA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** Proposal-perheen tai muun nimetyn maisemakortin täydentävä arvio valmis. Valitse hankeosan mukainen haarapari.

**Myöhempi tapahtuma / jatko:** Todettu muutos viedään käsittelyyn. Jos sama paikka on jo poistettu, arvioi jäljelle jäävä näkymä äläkä poista sitä uudelleen.

**Tausta:** L01 S14

---

### [EV-TUTKIMUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Tutkimustiedon vaikutus hankkeeseen selvisi

**Tapahtumateksti:** Konsultti on verrannut uutta tutkimustietoa hankkeen omiin havaintoihin.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Metsäpeura: aiempi pienennys riittää:**
Tutkimus ja paikalliset havainnot tukevat jo tehtyä metsäpeuran kulkuyhteyden tai vasomisalueen väistöä. Uusia poistoja ei tarvita tämän kysymyksen vuoksi.

**Haara — Metsäpeura: kaksi vasomisalueen vuoksi poistettua paikkaa voisi säilyä:**
Uuden tiedon paikallinen tarkastelu tukee kahden vasomisalueen vuoksi pois rajatun paikan tutkimista uudelleen. Palauttaminen vaatisi vielä niiden muiden vaikutusten arvioinnin.

**Haara — Metsäpeura: rakentamista pitää rajata lisää:**
Uusi tutkimus ja hankkeen omat havainnot osoittavat metsäpeuran käyttöalueen aiemmin arvioitua laajemmaksi. Nykyinen sijoittelu vaatii lisäväistöä.

**Haara — Maakotka: nykyinen rajaus saa tukea:**
Tutkimuksen soveltaminen tähän reviiriin tukee jo valittua pienempää sijoittelua. Arvion johtopäätös säilyy.

**Haara — Maakotka: kaksi poistettua paikkaa voidaan tutkia uudelleen:**
Uusi tieto tarkentaa riskimallin oletusta. Kaksi aiemmin poistettua paikkaa voidaan ottaa uudelleen vertailuun, kun koko reviirin yhteisvaikutus lasketaan.

**Haara — Maakotka: yhteisarvio vaatii edelleen pienennystä:**
Tutkimus ei poista oman ja naapurihankkeiden yhteistä haittaa tällä reviirillä. Paikkojen vähentämistä tarvitaan edelleen.

**Haara — Poronhoito: reittiväistö saa tukea:**
Tutkimustieto ja paliskunnan paikallinen aineisto tukevat laidunreitin ulkopuolelle siirrettyä sijoittelua.

**Haara — Poronhoito: laidunkierron haitta on arvioitua laajempi:**
Tutkimuksen ja paikallisten tietojen perusteella pelkkä nykyinen aukko aidassa ei säilytä laidunkiertoa. Rakenteita täytyy rajata lisää.

**Haara — Susi: tarkastelu tukee nykyistä sijoittelua:**
Tutkimuksen ja paikallisten havaintojen vertailu ei tuo tähän hankkeeseen uutta sijoittelun muutostarvetta.

**Haara — Susi: paikallista käyttöä pitää selvittää lisää:**
Uusi tieto nostaa esiin aiemmin puutteellisesti tunnetun lisääntymis- ja alueenkäyttökysymyksen. Paikallinen selvitys täydennetään ennen johtopäätöstä.

**Haara — Susi: tarvittu paikallinen täydennys valmistui:**
Täydentävä selvitys kattaa hankkeen vaikutuksen suden paikalliseen alueenkäyttöön. Konsultti vie todetut tulokset vaikutusarvioon ja tarvittavat jatkotoimet päätösaineistoon.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-TUTKIMUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Vain pelin kyseisen tutkimuksen laji ja todellinen julkaisuaika. Sama tulos kaikkien rahoitusvalintojen jälkeen. Paikallinen soveltuvuustarkastelu on tehty; pelkkä otsikko ei määrää sijoittelua.

**Myöhempi tapahtuma / jatko:** Metsäpeuran vasomisalueen takia poistettujen kahden paikan myönteinen tulos → UUSI-P3-14 tarvittaessa vaiheen 4 paluukorttina. Maakotkan kahden poistetun paikan myönteinen tulos → UUSI-P4-KOTKAPAIKAT. Muutostarpeen tarkentunut pienennys → UUSI-P4-01, kun aidosti mahdollinen korjaus on yksilöity. Tutkittu nykyinen vaihtoehto jatkaa ilman uutta korttia, jos muutostarvetta ei ole.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `UUSI-P3-14`, `UUSI-P4-KOTKAPAIKAT`

**Toteutuksen rajaus:** Näytä vain tämän tutkimuksen lajiin ja aiempiin päätöksiin kuuluva haara. Rahoitusvalinta ei määrää tuloksen suuntaa. Myönteinen palautushaara edellyttää todellisia aiemmin poistettuja paikkoja ja vastaavaa nimettyä jatkokorttia. Metsäpeuran vasomispaikkojen palautusta ei käytetä kulkuyhteyspaikkoihin tai maakotkaan. Susituloksessa uusi, paikallisesti merkityksellinen tiedontarve johtaa saman asian rajattuun täydennykseen; se ei yksin myönnä tai estä lupaa. Suden täydennyksen tulos ei saa jäädä epämääräiseksi: mahdollinen hankkeen muutos edellyttää yksilöityä havaintoa, vaikutusta ja oikeudellista perustetta; tätä yleistä tutkimusketjua ei käytetä satunnaiseen susiperusteiseen tappioon.

**Tausta:** S13 L01 L02

---

### [EV-NATURA]

#### PELAAJALLE

**Tapahtuman otsikko:** Natura-arviosta saatiin lausunto

**Tapahtumateksti:** LVV on käsitellyt päivitetyn Natura-arvioinnin.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Metsäpeura: vaikutus suojeluperusteeseen voidaan sulkea pois:**
Arvio ja esitetyt toteutuskeinot osoittavat, ettei muutettu hanke merkittävästi heikennä Natura-alueen metsäpeuran suojeluarvoja. Kulkuyhteyden säilyttäminen viedään päätösaineistoon.

**Haara — Metsäpeura: merkittävää heikentymistä ei voida sulkea pois:**
Nykyisen sijoittelun ja muiden hankkeiden yhteisvaikutuksesta jää merkittävä riski metsäpeuran suojeluarvoille. Tässä muodossa hanke tarvitsee uuden vaihtoehdon.

**Haara — Suon vesitalous: haitta vältetään:**
Uusi johtoreitti tai toteutustapa turvaa Natura-suon vedensaannin. Arvio tukee jatkoa tällä ratkaisulla.

**Haara — Suon vesitalous: haitta jää:**
Esitetty rakentamistapa muuttaisi edelleen Natura-suon vesitaloutta. Nykyistä reittiä ei voida perustella tavanomaisessa hyväksymismenettelyssä.

**Haara — Poikkeusedellytysten selvitys: peruste puuttuu:**
Selvityksessä ei löydy perustetta viedä tätä ratkaisua Natura-poikkeusmenettelyyn. Hankkeelle on etsittävä haitan välttävä vaihtoehto.

**Haara — Poikkeusedellytysten selvitys: hakemusta voidaan valmistella:**
Erillisen poikkeuksen edellytyksiä on perusteltua selvittää hakemuksessa. Päätöstä ei vielä ole, ja hakemuksen valmistelu vie lisää aikaa.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-NATURA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Natura-suojeluperuste, vaikutusyhteys ja arvioitu hanke yksilöity. Poikkeushaarat vain, jos UUSI-P4-07/A:ssa tilattu edellytysten selvitys on valmistunut.

**Myöhempi tapahtuma / jatko:** Korjattava → UUSI-P4-01. Poikkeushakemuksen valmistelu ei aseta hyväksymislippua: tarvitaan erillinen oikea ratkaisu. Oikeasti vaihtoehdoton hanke voi päättyä.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `UUSI-P4-07`

**Toteutuksen rajaus:** Pelkkää haittojen korvaamista toisella alueella ei merkitä tässä haitan poissulkemiseksi. Aluekohtaiset suojeluperusteet ja luvanhakijan rooli säilytettävä.

**Tausta:** L02 S03 S21

---

### [EV-AJANTASAISUUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Aiemman arvioinnin kattavuus tarkistettiin

**Tapahtumateksti:** Konsultin vertailu ja tarvittava viranomaistarkistus ovat valmistuneet.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Vanha aineisto kattaa muutoksen:**
Muutos sisältyy jo arvioituihin vaihtoehtoihin eikä lähtötiedossa ole olennaista puutetta. Uutta laajaa selvityskierrosta ei tarvita tämän muutoksen vuoksi.

**Haara — Muutos tarvitsee täydennyksen:**
Uudet paikat tai vaikutukset jäävät aiemman arvion ulkopuolelle. Melu- tai luontoarvion puuttuva osa on päivitettävä ennen päätöstä.

**Haara — Tilattu täydennys on riittävä:**
Päivitetty arvio kattaa nykyisen sijoittelun. Muutettu aineisto voidaan viedä oikeaan päätöskäsittelyyn.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-AJANTASAISUUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · PÄIVITETTY TULOSKETJU

**Laukaisuehto:** Todellinen muutosten vertailu tai jo tilatun täydennyksen tarkistus valmis. Viimeinen haara ei ole uusi arvonta täydennystarpeen päälle.

**Myöhempi tapahtuma / jatko:** Jos täydennys vielä tarvitaan, tilaa se ja odota oikeaan vaiheeseen. Pelkkä YVA-päätelmän ikä ei ole automaattinen vanhenemisehto.

**Tausta:** L01 L02

---

### [EV-LIEVENNYS]

#### PELAAJALLE

**Tapahtuman otsikko:** Suojapuuston säilyttämisestä sovittiin

**Tapahtumateksti:** Maanomistajan kanssa on sovittu säilytettävä puustoalue, vastuut ja korvaus. Kaava-aineisto ja maisema-arvio päivitetään tähän järjestelyyn.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-LIEVENNYS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Nimenomainen puuston säilyttämisjärjestely on oikeasti syntynyt. Pelkkä tarjous tai kirjaamaton lupaus ei riitä.

**Myöhempi tapahtuma / jatko:** Jos omistaja ei suostu, tätä myönteistä tapahtumaa ei näytetä: hankkeen maisema arvioidaan ilman puustoa ja tarvittava rajausmuutos tehdään.

**Tausta:** L02 S02

---

### [EV-KORJAUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Korjatun vaihtoehdon arvio valmistui

**Tapahtumateksti:** Suunnitelman muutokset on arvioitu ja aiempi ongelmakohta tarkistettu.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Korjaus ratkaisee tunnistetun haitan:**
Pienempi tai muutettu sijoittelu ratkaisee arvioinnissa todetun ongelman. Hanke voi jatkaa tällä vaihtoehdolla.

**Haara — Korjaus ei riitä mutta lisäväistöä on mahdollista tehdä:**
Muutos vähentää haittaa, mutta ei riittävästi. Konsultti yksilöi vielä pois jätettävät paikat ja niihin liittyvät rakenteet.

**Haara — Toteuttamiskelpoista korjausta ei ole:**
Myös tarkistettu pienempi vaihtoehto jättää hyväksymisen estävän haitan. Muut toteuttamiskelpoiset sijoittelut on jo tutkittu.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-KORJAUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Nimenomainen korjaus tehty. Ratkaisu liittyy samaan puutteeseen; ei satunnaista uutta estettä korjatun asian tilalle.

**Myöhempi tapahtuma / jatko:** Rajaa jatkokierrokset hankkeen aitoihin vaihtoehtoihin. Mahdoton vaihtoehto ei muutu valintavirheeksi, jos pelaajalla ei ollut toimivaa keinoa.

**Kytketyt tunnisteet:** `UUSI-P4-01`, `LOPPU-ULKOINEN`

**Toteutuksen rajaus:** UUSI-P4-01/A:ssa tarjotun, saman haitan ratkaisevaksi jo osoitetun vaihtoehdon tulos ei saa vaihtua uudeksi hylkäykseksi. Kielteiset haarat ovat vain vielä tutkimattomille korjausvaihtoehdoille; lähde-ID ja vaihtoehdon tila erottavat ne.

**Tausta:** L01 L02

---

### [EV-MENETTELY]

#### PELAAJALLE

**Tapahtuman otsikko:** Asiantuntijan läsnäolosta tehtiin valitus

**Tapahtumateksti:** Kaavapäätöksestä tehdyssä valituksessa vedotaan asiantuntijan läsnäoloon suljetun kokouksen päätöksenteossa. Kunta toimittaa asiakirjat hallinto-oikeudelle.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-MENETTELY`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** UUSI-P4-04/B tai muu vahvistettu vastaava menettelyvirhe, kaavan hyväksymispäätös tehty ja valitus tosiasiassa vireillä.

**Myöhempi tapahtuma / jatko:** EV-VALITUS käsittelee asian. UUSI-P4-05 vasta, jos hyväksymispäätös kumotaan.

**Kytketyt tunnisteet:** `EV-VALITUS`, `UUSI-P4-05`

**Tausta:** S01 L12

---

### [EV-KUULEMINEN]

#### PELAAJALLE

**Tapahtuman otsikko:** Ehdotuksen muutos tarvitsee lisäkuulemisen

**Tapahtumateksti:** Kunta katsoo muutoksen vaikuttavan uudella tavalla naapurikiinteistöihin. Muutetusta aineistosta järjestetään tarvittava kuuleminen ennen hyväksymiskäsittelyä.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-KUULEMINEN`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Kunnan ratkaisu lisäkuulemisen tarpeesta on tehty. Jos muutos ei edellytä lisäkuulemista, tätä viestiä tai viivettä ei esitetä.

**Myöhempi tapahtuma / jatko:** Tarvittava uudelleen nähtävilläolo tai kohdennettu kuuleminen toteutetaan muutoksen sisällön mukaisesti.

**Tausta:** L12

---

### [EV-KUNTA]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavaehdotus oli valtuuston käsittelyssä

**Tapahtumateksti:** Valtuusto on käsitellyt kaavaehdotuksen ja sen päätösaineiston.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Valtuusto hyväksyy ehdotuksen:**
Kaavaehdotus hyväksytään. Seuraavaksi odotetaan mahdollinen muutoksenhaku ja varmistetaan päätöksen lainvoima.

**Haara — Valtuusto palauttaa ehdotuksen jatkovalmisteluun:**
Valtuusto palauttaa asian valmisteluun. Se edellyttää asutuksen puoleisen voimalaryhmän pienentämisen tarkastelua.

**Haara — Valtuusto hylkää ehdotuksen:**
Valtuusto ei hyväksy ehdotusta. Myöskään tutkittu pienempi vaihtoehto ei saa riittävää tukea, ja omistaja päättää lopettaa hankkeen kehityksen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-KUNTA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Asianmukaisesti valmisteltu hyväksymiskäsittely. Palautusperuste sidotaan todelliseen kysymykseen; käytä tässä kortin asutusryhmää vain, jos se oli käsittelyssä.

**Myöhempi tapahtuma / jatko:** Hyväksyntä → adoption tai EV-HYVAKSYNTA (vain yksi ilmoitus) → EV-LAINVOIMA. Palautus → kohdennettu muutos. Hylkäys luokitellaan todellisen syyn mukaan.

**Kytketyt tunnisteet:** `adoption`, `EV-HYVAKSYNTA`, `EV-LAINVOIMA`

**Tausta:** L12

---

### [EV-HYVAKSYNTA]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaava on hyväksytty

**Tapahtumateksti:** Kaava hyväksyttiin. Ennen luvitusvaiheen valmistumista tarkistetaan päätöksen lainvoima ja viimeistellään hankkeen tarvitsemat lupahakemukset.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-HYVAKSYNTA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Sama hyväksymisviesti kuin adoption: valitse yksi, älä näytä molempia peräkkäin.

**Myöhempi tapahtuma / jatko:** EV-LAINVOIMA tai valituksen tapauksessa EV-VALITUS.

**Kytketyt tunnisteet:** `EV-LAINVOIMA`, `EV-VALITUS`

**Tausta:** L01 L12

---

### [EV-VALITUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaavasta tehty valitus ratkaistiin

**Tapahtumateksti:** Tuomioistuin on antanut ratkaisunsa kaava-asiassa.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Hallinto-oikeus: valitus hylätään:**
Hallinto-oikeus hylkää valituksen. Kunnan hyväksymispäätös jää voimaan; mahdollinen jatkomuutoksenhaku selvitetään.

**Haara — Hallinto-oikeus: päätös kumotaan menettelyvirheen vuoksi:**
Kaavan hyväksymispäätös kumotaan virheellisen valmistelumenettelyn vuoksi. Kunnan on korjattava menettely ennen uutta ratkaisua.

**Haara — Hallinto-oikeus: päätös kumotaan selvitysten riittämättömyyden vuoksi:**
Tuomioistuin katsoo, etteivät selvitykset riitä kaavan ratkaisuun. Hyväksymispäätös kumotaan.

**Haara — KHO: valituslupaa ei myönnetä:**
KHO ei myönnä valituslupaa. Hallinto-oikeuden ratkaisu jää voimaan.

**Haara — KHO: aiempi kumoamisratkaisu kumotaan:**
KHO kumoaa hallinto-oikeuden ratkaisun ja jättää kunnan kaavapäätöksen voimaan.

**Haara — KHO: kaavan kumoaminen jää voimaan:**
KHO ei muuta hallinto-oikeuden lopputulosta. Kaavan hyväksymispäätös pysyy kumottuna.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-VALITUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Oikea muutoksenhakuvaihe on käynnissä ja kyseinen tuomioistuin antanut ratkaisun. Älä sekoita hallinto-oikeuden ja KHO:n haaroja samaan arvontaan.

**Myöhempi tapahtuma / jatko:** Menettelykumoaminen → UUSI-P4-05. Selvityskumoaminen → UUSI-P4-11. Lopullisesti voimaan jäävä hyväksyntä → EV-LAINVOIMA.

**Kytketyt tunnisteet:** `UUSI-P4-05`, `UUSI-P4-11`, `EV-LAINVOIMA`

**Tausta:** S01 S02 L12

---

### [EV-LAINVOIMA]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaava on lainvoimainen

**Tapahtumateksti:** Kaavan muutoksenhakutilanne on päättynyt ja päätös on lainvoimainen. Tarvittavien rakentamis- ja muiden lupien tila tarkistetaan vielä erikseen.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-LAINVOIMA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Ei avointa kaavan muutoksenhakua tai valitusajan määräaikaa. Varmista todellinen lainvoima.

**Myöhempi tapahtuma / jatko:** EV-LUVAT vaadittujen lupien valmistuessa.

**Kytketyt tunnisteet:** `EV-LUVAT`

**Tausta:** L12 L01

---

### [EV-LUVAT]

#### PELAAJALLE

**Tapahtuman otsikko:** Hankkeen kaikki tarvittavat luvat on saatu

**Tapahtumateksti:** Hankkeen tarvittavat luvat ovat valmiit ja lainvoimaiset. Lupaehtoja ja lopullista suunnitelmaa on verrattu toisiinsa, eikä avoimia ristiriitoja jää.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-LUVAT`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** eteneminen · UUSI

**Laukaisuehto:** Kaikki kyseisen skenaarion requiredPermits ja lainvoimaehdot täyttyvät. Vaatimukset vaihtelevat hankeosien ja paikan mukaan.

**Myöhempi tapahtuma / jatko:** LOPPU-VOITTO tai ready, ei kahta samaa loppuporttia peräkkäin.

**Kytketyt tunnisteet:** `LOPPU-VOITTO`, `ready`

**Tausta:** L01 L05 L12 B03

---

### [EV-BESS-TURVA]

#### PELAAJALLE

**Tapahtuman otsikko:** Akkualueen turvallisuussuunnitelma tarkistettiin

**Tapahtumateksti:** Suunnittelija ja asian käsittelyyn osallistuvat viranomaiset ovat käyneet tarvittavan aineiston läpi.

**Yhteisen tapahtumatekstin jälkeen näytetään vain toteutunut tulos:**

**Haara — Laitetiedot riittävät:**
Toimittajan tekniset tiedot riittävät tämän suunnitteluvaiheen turvallisuusratkaisun osoittamiseen. Toteutusehdot kirjataan.

**Haara — Laitetietoihin jää puute:**
Toimittajalta puuttuu edelleen nimetty suojaus- tai häiriötilannetieto. Suunnitelma tarvitsee täydennyksen tai toisen laiteratkaisun.

**Haara — Häiriövesien hallinta toimii:**
Suunniteltu talteenotto ja kohteen vesien hallinta on osoitettu riittäväksi. Niille tarvittava tila säilytetään asemapiirroksessa.

**Haara — Häiriövesien hallinta tarvitsee lisää tilaa:**
Nykyinen tila ei riitä osoitettuun vesien hallintaan. Akkualueen järjestelyä tai kokoa muutetaan.

**Haara — Tulvapaikan tekninen ratkaisu soveltuu:**
Tarkennettu korkeusasema ja vesien johtaminen vähentävät tulvariskin hyväksyttävästi. Naapurialueiden vaikutukset on tarkistettu.

**Haara — Tulvapaikan ratkaisu ei sovellu:**
Korotus ja veden johtaminen eivät ratkaise paikan tulvariskiä hyväksyttävästi. Akulle tarvitaan kuivempi sijainti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `EV-BESS-TURVA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** tulos · UUSI

**Laukaisuehto:** Valitse haarapari alkuperäisen tehtävän perusteella. Turvallisuuskatselmus ei ole automaattisesti rakennusvalvonnan lupapäätös.

**Myöhempi tapahtuma / jatko:** Puuttuvat laitetiedot → BESS-P3-02 kerran. Tilantarve → BESS-P3-04. Tulva → BESS-P1-03:n uusi paikka myöhäisempänä paluukorttina.

**Kytketyt tunnisteet:** `BESS-P3-02`, `BESS-P3-04`, `BESS-P1-03`

**Tausta:** B03 B04

---

### [external-3]

#### PELAAJALLE

**Tapahtuman otsikko:** Rahoittaja vetäytyi.

**Tapahtumateksti:** Rahoittaja lopettaa uusien hankkeiden kehitysrahoituksen muuttuneen markkinatilanteen vuoksi. Korvaavaa rahoittajaa ei löydy, eikä omistaja rahoita valmistelua itse. Hanke keskeytetään lopullisesti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `external-3`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** L01

---

### [ext-buyer]

#### PELAAJALLE

**Tapahtuman otsikko:** Sähkön ostaja vetäytyi

**Tapahtumateksti:** Hankkeen jatkokehitys on sidottu suuren sähkönostajan sitoumukseen. Ostaja vetäytyy, eikä omistaja löydä korvaavaa toteutusmallia. Hankkeen valmistelu lopetetaan.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-buyer`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Omistajan riippuvuus tästä ostajasta on ollut todellinen ja ennen luvitusvoittoa vaikuttava kehityspäätös. Sähkönostosopimus ei ole yleinen kaavan lakiehto.

**Tausta:** L01

---

### [ext-grid-delivery]

#### PELAAJALLE

**Tapahtuman otsikko:** Liittyminen siirtyy liian kauas.

**Tapahtumateksti:** Verkon rakentamisen aikataulu siirtyy olennaisesti. Hankkeen omistaja ei jatka näin pitkää odotusta, eikä toteuttamiskelpoista korvaavaa liityntää löydy. Kehitystyö lopetetaan.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `ext-grid-delivery`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** ulkoinen loppu · PÄIVITETTY ULKOINEN LOPPU

**Laukaisuehto:** Ulkoinen skenaariotila on arvottu alussa; mikään pelaajalle tarjottu realistinen vaihtoehto ei olisi välttänyt juuri tätä estettä. Pelin luvitusmaali ei ole jo täyttynyt.

**Tausta:** B01 B02 S21

---

### [LOPPU-VUOKRA-AIKA]

#### PELAAJALLE

**Tapahtuman otsikko:** Kaava jäi odottamaan. Sopimukset eivät riittäneet.

**Tapahtumateksti:** Hanke joutui odottamaan lykkääntynyttä maakuntakaavaa. Aiemmat viivästykset olivat jo kuluttaneet vuokrasopimusten valmisteluajan, eikä riittävän moni maanomistaja suostunut jatkoon. Tarvittavat alueet menetettiin eikä korvaavaa sijoittelua löytynyt. Hanke päättyy.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-VUOKRA-AIKA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** UUSI JATKOTAPAHTUMA

**Laukaisuehto:** Kaikki ehdot: merkittävä aiempi vältettävissä ollut kriittinen viive; todellinen maakuntakaavaodotus; sopimusaika päättynyt; riittämätön jatkosuostumus; ei toteuttamiskelpoista korvaavaa maa-aluetta; luvitusvoitto ei jo saavutettu.

**Myöhempi tapahtuma / jatko:** Luokittele yhdistelmäsyy näkyvästi päätöshistoriassa. Tämä ei ole uusi riippumaton ulkoinen arvonta tai pelkän lyhyen sopimusvalinnan automaattinen tappio.

**Tausta:** L10 L01 V5-L1

---

### [LOPPU-VOITTO]

#### PELAAJALLE

**Tapahtuman otsikko:** Hanke on luvitettu

**Tapahtumateksti:** Kaava ja hankkeen tarvitsemat luvat ovat lainvoimaisia. Hankekehitys saatiin maaliin. Seuraavaksi katsotaan, paljonko hankkeesta säilyi ja millä ajalla sekä kustannuksilla.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-VOITTO`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** voitto · UUSI

**Laukaisuehto:** Kaikki hankekohtaiset lupaehdot ja vaadittu lainvoima täyttyvät. Ei valmiita lupia kumoavaa uutta yllätyskorttia tämän jälkeen.

**Myöhempi tapahtuma / jatko:** PISTEET

**Kytketyt tunnisteet:** `PISTEET`

**Tausta:** L01 L12

---

### [LOPPU-VALINTA]

#### PELAAJALLE

**Tapahtuman otsikko:** Ratkaisematon ongelma pysäytti hankkeen

**Tapahtumateksti:** {decisionLabel}. Tämän jälkeen {blockingIssue} jäi ratkaisematta, eikä hankkeen hyväksymiselle saatu edellytyksiä. Vaihtoehtona olisi ollut {availableAlternative}.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-VALINTA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** valintaperäinen loppu · UUSI

**Laukaisuehto:** Estävä puute, siihen liittyvä valinta ja aidosti toteuttamiskelpoinen aiempi vaihtoehto on kirjattu. Näytä konkreettiset täytetyt lauseet, ei muuttujien nimiä.

**Myöhempi tapahtuma / jatko:** Päätöshistoria kertoo oikean syyn. Älä nimeä kaikkea lisäselvityksen kielteistä tulosta valintavirheeksi.

**Tausta:** L01

---

### [LOPPU-LAAJUUS]

#### PELAAJALLE

**Tapahtuman otsikko:** Jäljelle jäi liian pieni hanke

**Tapahtumateksti:** Paikkojen ja alueiden menetyksen jälkeen hanke jäi pienemmäksi kuin omistajan alussa ilmoittama jatkoraja. Korvaavaa sijoittelua ei löytynyt. Kehitystyö päättyy.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-LAAJUUS`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** laajuusperäinen loppu · UUSI

**Laukaisuehto:** Skenaarion alussa ilmoitettu jatkoraja alittuu ja vaihtoehtoiset toteutukset käsitelty. MW:tä, hehtaareja ja MWh:ta ei summata samaksi laajuudeksi.

**Tausta:** L01

---

### [LOPPU-ULKOINEN]

#### PELAAJALLE

**Tapahtuman otsikko:** Hankkeelle ei löytynyt jatkomahdollisuutta

**Tapahtumateksti:** {externalReason} Myös toteuttamiskelpoiset pienemmät vaihtoehdot ja muut ratkaisut on selvitetty. Hankkeen kehitys päättyy.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-ULKOINEN`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** ulkoinen loppu · UUSI

**Laukaisuehto:** Ulkoinen ennalta määrätty este, jota mikään pelaajan realistinen valinta ei olisi poistanut. externalReason kirjoitetaan todellisena tapahtumalauseena.

**Tausta:** L01

---

### [LOPPU-OMISTAJA]

#### PELAAJALLE

**Tapahtuman otsikko:** Omistaja lopettaa hankkeen kehityksen

**Tapahtumateksti:** Omistaja on tehnyt lopullisen päätöksen hankkeen kehityksen lopettamisesta. Valmistelua ei enää rahoiteta, ja käynnissä olevat työt päätetään sovitusti.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `LOPPU-OMISTAJA`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** omistajan lopetus · UUSI

**Laukaisuehto:** Omistajan todellinen lopetuspäätös ennen saavutettua luvitusmaalia. Pelkkä tauko tai myöhemmän investoinnin lykkäys ei riitä.

**Tausta:** L01

---

### [PISTEET]

#### PELAAJALLE

**Tapahtuman otsikko:** Mitä hankkeesta jäi käteen?

**Tapahtumateksti:** Hankkeen säilynyt laajuus: {scopeScore}/400. Aikataulu: {timeScore}/200. Selvitysten ja menettelyn laatu: {qualityScore}/250. Kehitysrahojen käyttö: {resourceScore}/150. Yhteensä {totalScore}/1000.

#### CODEX / PELILOGIIKKA

**Tapahtuma-ID:** `PISTEET`

**Vaihe:** 4 — Kaavaehdotus ja kaavan hyväksyntä

**Sisältötyyppi:** pisteytys · UUSI

**Laukaisuehto:** Vain luvitusvoiton jälkeen. Laske erät perusteltavista tapahtumista, ei valitun tekstin sävystä.

**Myöhempi tapahtuma / jatko:** Näytä pisteiden yhteydessä merkittävät muutokset: toteutunut laajuus, lisäaika, suurimmat ylimääräiset työt ja korjatut menettelypuutteet.

**Tausta:** L01

---
