# KAAVA VAI KAAOS — v5:n muutoskooste ja siirto-ohje

**8.9.2026 · koskee tiedostoa `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md` · ei pelin koodimuutos**

## 1. Oikea lähtötiedosto ja suorat muutokset

Työn lähtöaineisto on käyttäjän lähettämä, muokattu `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v4.md`, ei aiempi samanniminen generoitu versio. Lähtötiedostoa ei muutettu.

- Lähetetyn tiedoston koko: 247776 tavua.
- SHA-256: `eda104fbba4be2758cbbf6d50c4ff7675d3830968ef73c6033a4b5c13b9b9c3c`.
- Vertailu tehtiin erikseen säilytettyyn alkuperäiseen v4-versioon.
- Suoria tekstimuutoksia löytyi **9 sisällöstä, 16 tekstikentästä**. Ne ovat mukana v5:ssä. Ainoa suorasti muokatun kentän kielikorjaus on `[land]`: ”Kiinteistöillä suunnitellaan rakentamista” → ”Kiinteistöille suunnitellaan rakentamista”.
- **16 erillistä MUUTOS-merkintää** on käsitelty. Ne eivät jää pelaajatekstiin eivätkä keskeneräisiksi kommenttikentiksi.

Suoraan muokatut sisällöt: `land`, `land-index`, `land-minimum`, `BESS-P1-01`, `external-0`, `ext-land-owner`, `ext-land-use`, `defence` ja `surveys`. Esimerkiksi ”Kovia vaatimuksia”, ”Suostutaan sopimusmuutoksiin”, ”Portfolio supistuu” ja ”Kaavoitusmonopolia” ovat käyttäjän tekstiä, eivät palautettuja vanhoja versioita.

## 2. Mitä palautteesta pääteltiin ja sovellettiin muualla

Tämä osio erottaa käyttäjän suorat pyynnöt niitä laajentavista toimituksellisista ratkaisuista.

**Tilanteen täytyy olla ymmärrettävä ilman tulkitsijaa.** Korvasin yleisiä ”oikeudet”, ”maanhallinta”, ”herkkä reuna” ja ”haitta” -ilmauksia asiayhteyden mukaan vuokrasopimuksella, nimetyllä kiinteistöllä, metsäpeuran kulkuyhteydellä, sääksen lentoreitillä, paneelikuivatuksella tai puuttuvalla laitetiedolla. Yksi yhteinen tulos ei enää sekoita maakotkaa, metsäpeuraa, poronhoitoa ja viitasammakkoa.

**Huumori syntyy tapahtuneesta, ei päälle liimatusta loppulauseesta.** Allekirjoitettu etusivu, omaa voimalaa odottanut maanomistaja, samaan alueeseen kohdistuvat vuokrat tai kariutuva yhteisliityntä saavat kantaa tilanteen itse. Poistin luontoa, kalenteria, karttoja ja raportteja inhimillistäviä toistuvia loppuvitsejä. Kaikki kortit eivät silti ole vitsejä.

**Valinnoissa on eri tavoite ja seuraus.** Lisäsin ajoituksen, rahan, laajuuden, sopimusten ja suunnittelujouston eroja. Esimerkiksi lisäselvitys voi säästää paikkoja tai osoittautua turhaksi kuluksi; valmis pienempi vaihtoehto voi olla aikataulun kannalta parempi. Kaikkea ei ratkaista toisella ilmaisella kierroksella, mutta perustellun selvityksen tilaaminen ei yksin tee maailmasta huonompaa.

**Välitön vastaus ei ole kaikkien mahdollisuuksien selitys.** Tilauksen jälkeen kerrotaan, mitä tilattiin. Todellinen tulos tulee nimetyssä jatkotapahtumassa. Haarat kirjoitetaan erikseen, ja valinnan tai aiemman tilanteen ulkopuolinen haara on suljettava pois.

**Pelaajalle ei näytetä pelimoottorin ohjeita.** Poistin varsinaisesta pelitekstistä riskikorttien aktivoinnin, skenaarion portit, automaattiset pistemenetykset, loppuluokituksen laskentaohjeet ja muut toteutusohjeet. Pisteytysruudun varsinaiset pisteluvut säilyvät tarkoituksella.

**Mukana on myös helpotuksia.** Lisäselvitys voi palauttaa kaksi paikkaa, sopimusriita voi ratketa ja varalle ostettu palsta voi auttaa myöhemmin. Märän palstan ostamatta jättämisestä ei luoda piilorangaistusta.

## 3. Kaikki 16 MUUTOS-kohtaa

| # | Alkuperäinen tunniste | Käsittely | Toteutettu sisältö |
|---:|---|---|---|
| 1 | `land-map-versions` | Uudelleenkirjoitettu | Allekirjoitettu etusivu, puuttuvat ehdot ja kartta, tavoittamaton omistaja. A täydentää paketin, B jatkaa ilman aluetta. EV-SOPIMUSSIVUT näyttää tavoittamisen tuloksen. Sopimuksen mitättömyyttä tai jokaisen sivun allekirjoituspakkoa ei oleteta. |
| 2 | `land-area-explained` | Uudelleenkirjoitettu | Voimalan odottanut maanomistaja vaatii sopimuksen päättämistä. EV-VOIMALALUPAUS erottaa väärinkäsityksen, annetun ristiriitaisen lupauksen ja sovitun päättämisen. UUSI-P1-MAARIITA / EV-MAARIITA käsittelevät jatkoriidan. |
| 3 | `UUSI-P1-02` | Poistettu | Ilmatila-/roottorin ulottumakortti poistettu. ID:tä ei käytetä uudelle aiheelle. |
| 4 | `UUSI-P1-03` | Uudelleenkirjoitettu ja jatkettu | Valmisteluajan valinta johtaa mahdolliseen loppuvaiheen määräaikaketjuun. Merkittävä toteutunut viive, tarvittavan maakuntakaavan lykkäys, sopimusten päättyminen, kielteiset jatkovastaukset ja vaihtoehtojen puute tarvitaan yhdessä. |
| 5 | `UUSI-P1-04` | Uudelleenkirjoitettu | Naapurihanke ehdottaa yhteistä johtoliityntää. Valinnan A jälkeen tämä tekninen ehdotus todetaan myöhemmin toteuttamiskelvottomaksi. EV-YHTEISASEMA säilyy vanhana ID:nä, mutta sen aihe on nyt yhteisjohtoliityntä. |
| 6 | `UUSI-P1-05` | Korvattu uudella tilanteella | Keskeisellä alueella on aiempi kilpaileva vuokraoikeus. Etusijaa ja päällekkäistä maankäyttöä neuvotellaan tai suunnitellaan ilman kiinteistöä. EV-ETUSIJA antaa suostumuksen tai kielteisen vastauksen. |
| 7 | `UUSI-P1-06` | Uudelleenkirjoitettu ja jatkettu | Vapaaehtoinen märän palstan ostos, jota ei perustella pelaajalle valmiiksi. Sopivassa vesitaloustilanteessa UUSI-P3-KOSTEIKKO → EV-KOSTEIKKO tekee siitä myönteisen yllätyksen. Ilman ostoa perussuunnitelma ei heikkene ostamatta jättämisen vuoksi. |
| 8 | `UUSI-P1-09` | Uudelleenkirjoitettu | Rajallinen ensimmäinen selvitysbudjetti: luontotyöt tai verkkotyöt ensin. EV-SELVITYSJARJESTYS huomioi tilausjärjestyksen, havaintokauden, työn valmistumisen ja jäljelle jäävän todellisen viiveen. Molemmille järjestyksille on myös toimiva tulos. |
| 9 | `UUSI-P1-10` | Poistettu | Maanomistajan parempaa reittiä koskenut kortti poistettu. |
| 10 | `BESS-P1-01` | Pelaajateksti korjattu; sääntö laajennettu | B vastaa nyt vain, että akku jätetään tästä vaiheesta pois ja muu hanke jatkuu. Riskikorttien aktivoituminen ja muut vastaavat toteutusohjeet poistettu pelaajateksteistä koko dokumentissa. |
| 11 | `BESS-P1-04` | Poistettu | Akun rajanaapurin yleinen tiedotuskortti poistettu. |
| 12 | `start` | Selkeytetty | Tehtävä: kehittää energiantuotantohanke luvitetuksi. Ensin maa-alueet, sitten kaavoitus, ympäristöselvitykset ja tarvittavat luvat. |
| 13 | `land-done` | Selkeytetty | ”Maat vuokrattu”: nykyiseen suunnitelmaan tarvittavat alueet on saatu vuokrattua ja kaava-aloitteeseen voidaan siirtyä. |
| 14 | `EV-MAA` | Selkeytetty ja haaroitettu | ”Vuokraneuvottelun tulos”: allekirjoitus, korvaaville maille siirtyminen tai todellinen hankkeen pienentyminen. Ei abstraktia maanhallinnan vastausta. |
| 15 | `initiative` | Poistettu | Yleinen kyläilta ennen/jälkeen -runkokortti poistettu. Erilliset huhu-, uusi valtuusto- ja mökkiläistilanteet on kirjoitettu omiksi konkreettisiksi tilanteikseen, eivätkä ne peri poistettua tekstiä. |
| 16 | `programme` | Poistettu; yleinen huumorikorjaus tehty | Karttatyöpaja-runkokortti ja huomauttamasi luontopersonointi poistettu. Vastaavat irtovitsit siivottu myös muun muassa eläin-, vesi-, aikataulu-, lupa- ja välitapahtumista. Säilyneillä programme-varianteilla on nyt omat aidot tiedontarpeensa. |

## 4. Merkittävimmät seurausketjut

### Puutteellinen vuokrasopimus

`land-map-versions` → `EV-SOPIMUSSIVUT` → tarvittaessa `EV-MAA`.

Etusivua ei lasketa varmasti hyväksytyksi koko sopimukseksi, kun ehdot ja karttaliite jäävät aidosti epäselviksi. Tavoittaminen voi onnistua tai epäonnistua. Muu hanketyö jatkuu; koko projekti ei odota yhden puhelun vastausta. Tämä ei väitä, että jokaisen sopimussivun pitäisi aina olla erikseen allekirjoitettu. Tausta: V5-L1.

### ”Minulle luvattiin voimala”

`land-area-explained` → `EV-VOIMALALUPAUS` → tarvittaessa `UUSI-P1-MAARIITA` → `EV-MAARIITA`.

Erota maanomistajan oma oletus aidosti annetusta lupauksesta. Sopimuksen päättämisvaatimus ei automaattisesti päätä vuokrasopimusta. Riita tai yhteinen päättämissopimus voi kuitenkin vaikuttaa hankkeen käytettävissä olevaan maahan. Tausta: V5-L1.

### Yhteinen johtoliityntä kariutuu

`UUSI-P1-04/A` → `EV-YHTEISASEMA` → `UUSI-P2-04` tarvittaessa myöhemmän vaiheen paluukorttina → `EV-VERKKO`.

Tässä käyttäjän toivomassa fiktiivisessä tilanteessa ehdotus epäonnistuu teknisen ja aikataulullisen tarkastelun jälkeen. Rahaa ja aikaa on kulunut, ja lykätty oma reitti on tutkittava. Epäonnistuminen ei tarkoita, että yhteiset johdot olisivat yleisesti kiellettyjä. Tällä kierroksella ei selvitetty niiden tilastollista onnistumisastetta. Vanha `EV-YHTEISASEMA`-tunniste säilytettiin vain kohdistamisen helpottamiseksi; otsikko ja sisältö tarkoittavat yhteisjohtoa.

### Viivästykset syövät sopimusajan

`UUSI-P1-03` + toteutunut merkittävä lisäviive + `UUSI-P2-03/A`:n todellinen maakuntakaavariippuvuus → `EV-MAAKUNTAODOTUS` → `UUSI-P4-VUOKRAJATKO` → `EV-OPTIO` → tarvittaessa `LOPPU-VUOKRA-AIKA`.

Käsikirjoituksen ehdotus on 60/84 kuukauden valmisteluaika ja merkittävän viiveen lähtöarvona 24 kuukautta. **Nämä ovat pelin kalibroitavia sopimus- ja aikatauluasetuksia, eivät lain määräaikoja tai alan tyypillisiä sopimusaikoja.** Valmisteluajan ehto ei tarkoita koko voimalapuiston käyttöajan vuokraa.

Lopun pitää vaatia yhtä aikaa: merkittävä aiemmilla valinnoilla syntynyt todellinen kriittisen polun viive; tarvittavan maakuntakaavan lykkääntyminen; olennaisten sopimusten ajan päättyminen; riittämätön jatkosuostumus; ei käyttökelpoista korvaavaa sijoittelua; luvitusvoittoa ei ole vielä saavutettu. Pelaajalle annetaan määräaikavaroitus ja jatkoneuvottelu ennen päättymistä. Pelkkä lyhyen vaihtoehdon valitseminen ei laukaise tappiota. Tausta: V5-L1.

### Märkä varapalsta osoittautuu hyödylliseksi

`UUSI-P1-06/A` + sopiva, ostosta riippumatta syntynyt paneelialueen vesitalouskysymys → `UUSI-P3-KOSTEIKKO` → `EV-KOSTEIKKO`.

Säilytin pyynnön ytimen: ostos näyttää aluksi tarpeettomalta ja voi myöhemmin säästää paneelialaa. Täsmensin mekanismia tarkoituksella: kosteikko auttaa turvaamaan **nykyisen** viitasammakon lisääntymispaikan vedensaannin. LVV:n myönteinen kanta koskee tätä osoitettua ratkaisua. Uuden lammen tekemistä ei tulkita automaattiseksi luvaksi hävittää vanhaa paikkaa tai ostaa Natura-haittaa pois.

Tämä on toimituksellinen muutos suhteessa MUUTOS-kohdan väljään ”kompensaatiotarve”-ajatukseen. Poikkeusluvan ja haitan välttämisen edellytykset eivät ole sama asia; uuden elinympäristön hyöty ei yksin korvaa kaikkien muiden edellytysten tarkastamista. KHO:2017:161 havainnollistaa, ettei esitetty kompensaatio yksin riittänyt poikkeusluvan myöntämiseen kyseisessä vapaa-ajanasumishankkeessa. Se ei ole päätös tästä fiktiivisestä tuuli-/aurinkohankkeesta eikä yleinen kielto käyttää toimivia lievennyksiä. Tausta: V5-L3 ja V5-L4.

### Ensimmäisten selvitysten järjestys

`UUSI-P1-09` → `EV-SELVITYSJARJESTYS`.

Luonto ensin voi säästää maastokauden mutta jättää vaikean verkkoratkaisun myöhemmäksi. Verkko ensin voi välttää turhan maastokulun huonossa hankkeessa tai osua niin myöhään, että havaintokausi on mennyt. Molemmille on myös ajoissa valmistuva haara. Myöhemmät konsulttitarjouskortit koskevat vain vielä tilaamatonta työtä.

### Myönteisen tutkimustuloksen hyödyntäminen

`EV-TUTKIMUS` → metsäpeuralle `UUSI-P3-14`, maakotkalle `UUSI-P4-KOTKAPAIKAT` → oikean lajin arvioinnin tulos.

Uusi tieto voi avata kahden aiemmin poistetun paikan tutkimisen uudelleen. Paikat eivät palaudu suoraan ilman muuta sijoittelu- ja vaikutusarviota. Kielteinen palautustulos ei tee jo selvitetystä pienemmästä vaihtoehdosta kelvotonta. Samat paikat ja poistot kohdistetaan tunnisteisiin, jotta kapasiteettia ei synny tai katoa kahteen kertaan.

## 5. Sisällön ja rakenteen muutokset numeroina

- Lähtö: 158 päätöskorttia/varianttia ja 79 tapahtumaa, yhteensä 237 sisältöosiota.
- Poistettu pyynnöstä 5 päätöskorttia.
- `P3-SOPIMUS` muutettu epämääräisestä välitapahtumasta oikeaksi päätöskortiksi samalla tunnisteella.
- Lisätty 5 uutta päätöskorttia: `UUSI-P1-MAARIITA`, `UUSI-P3-KOSTEIKKO`, `UUSI-P4-VUOKRAJATKO`, `BESS-P4-RAJAUS`, `UUSI-P4-KOTKAPAIKAT`.
- Lisätty 11 uutta tapahtumaa tai lopputekstiä.
- Lopputulos: **159 päätöskorttia/varianttia ja 89 tapahtumaa, yhteensä 248 osiota**.

Kaikki 232 säilytettyä alkuperäistä sisältöosiota käytiin läpi; osa muuttui voimakkaasti ja joissakin käyttäjän jo muokkaama teksti säilytettiin sekä täsmennettiin sen kytkennät. Määrä ei kuvaa yhden pelikerran pituutta.

Aiemmista muunnoksista oli kadonnut kolme varsinaista vaiheotsikkoa. Palautin nelijaon alkuperäisen sisällön vaihemetadatan perusteella. Palautin myös 13 katkennutta `interludes[a][b]`-tunnistetta: esimerkiksi otsikkoon päätynyt `[0]]` ei enää näy pelaajan otsikossa. Työ ei palauta aiemmissa vaiheissa arkistoon jääneitä pilotin tai pitkän kampanjan kortteja tähän aktiivisen sisällön käsikirjoitukseen.

## 6. Codexille, kun käyttäjä on muokannut käsikirjoituksen valmiiksi

**Käyttäjän palauttama uusin Markdown on pelitekstien ensisijainen aineisto.** Älä tuo takaisin tämän työn lähdeversiota tai välimuistissa olevaa JSON-snapshotia sen päälle. Lue myös kaikki myöhemmin lisätyt käyttäjän kommentit ennen integrointia.

1. Vertaa ID:itä nykyiseen peliin. Poista viisi nimettyä sisältöä myös valintapoolista, älä ainoastaan piilota niiden tekstiä. `initiative`- ja `programme`-runkokorttien poisto ei poista hankkeen kaava-aloitetta tai YVA-ohjelmaa prosessista. Säilytetyt variantit tarvitsevat omat toteutetut valintansa, eivät poistettujen peruskorttien periytyviä toimintoja.
2. Toteuta muutetut tyypit ja tilat. `P3-SOPIMUS` on nyt päätös; sen käsittely ei voi jäädä automaattiseksi välitarinaksi. Vanhat lukumääräoletukset, kiinteät 18 päätöstä tai vaihekohtaiset kiintiöt eivät sellaisinaan kata tätä sisältöpankkia.
3. Käytä päätöskohtaista tapahtumalähdettä. Selvitys, suunnitelma, valittu vaihtoehto, laji, nimetyt paikat ja tuloksen julkaisuajankohta on säilytettävä. Näytä vain niihin kuuluva tulos; pelkkä tapahtuman otsikko ei oikeuta sattumanvaraista eri lajin haaraa.
4. Erottele tilaus, valmistuminen, kuuleminen ja viranomaisratkaisu. Työ voi valmistua muiden tehtävien rinnalla. Tulosta ei kuitenkaan julkaista ennen kuin sen lähde ja oikea käsittelyvaihe ovat olemassa.
5. Rajaa paluukortit. Jo tehtyä selvitystä ei tilata tai makseta uutena vain, koska sama yleinen jatko tarjoutuu uudelleen. Vanhempaan vaiheeseen merkittyä korttia voi käyttää myöhemmin vain dokumentoidussa paluuketjussa. Käytä omaa lähdeavainta, ei pysyvää one-shot-kieltoa, joka estää aidosti muuttuneen vaihtoehdon käsittelyn.
6. Erota teho, energia, pinta-ala ja raha. BESSin MW ei ole sen MWh, hiljainen tuulikoneen käyttötila ei automaattisesti muuta nimellistehoa, eikä akkuosan supistuminen vähennä myös paneelihehtaareja. Samoja kiinteistöjä tai voimalapoistoja ei veloiteta kahdesti.
7. Tarkista pisteiden ja seurausten vastaavuus. Jos vaihtoehdon etu on pienempi konsulttikulu, sen pitää näkyä kehitysresurssissa. Jos varautumisesta maksetaan mutta viive vältetään, rahaa ei palauteta perusteetta. Vapaaehtoiselle kosteikkopalstalle ei lisätä uutta rangaistusta vain ostoksen vuoksi.
8. Tarkista pakolliset lupa- ja maalitilat hankekohtaisesti. Fingridin liittymissopimushakemuksen vuoden 2026 menettelyä ei käännetä rakentamisluvan ennakkoehdoksi. Maaliksi jo kirjattu luvitettu hanke ei muutu tappioksi myöhemmän investoinnin tai reservimarkkinan takia. Tausta: V5-G1.

### Käsikirjoituksen täydentämisessä säilytettävät rajat

Tekstimuuttujat pitää täyttää oikein suomeksi; `count=1` ei saa tuottaa ”1 voimalaa”. Tutkimuksen `{species}` on genetiivimuotoinen. Voitto- ja tappioruuduissa syy ja aiempi vaihtoehto täytetään todellisesta päätöshistoriasta, ei tyhjästä mallifraasista.

Jokainen budjetti-, määräaika- ja todennäköisyysarvo on vielä kalibroitava pelissä. Tässä määritelty 24 kuukauden lisäviiveraja on aloitusehdotus, ei käyttäjän aiemmin hyväksymä sitova numero. Näytölle tarkoitetut tekstit ovat korkeintaan 60 merkkiä pyyhkäisyvalintaa kohti tässä versiossa; pidempien korttitekstien todellinen mobiilirivitys on tarkistettava toteutuksessa.

Laki- ja lähdeviitteet ovat tarinoiden taustaa. Ne eivät todista fiktiivisten henkilöiden sanoneen näitä repliikkejä tai osoita esimerkkihankkeen nykyistä tilaa. V5-tarkistus kohdistui uusiin sopimus-, kosteikko- ja verkkomenettelykysymyksiin; alkuperäistä 44 lähteen tutkimusta ei tässä vaiheessa toistettu kokonaan.

## 7. Tasapaino ja tehdyn tarkistuksen rajat

Käyttäjän tavoite — noin kolmasosa riippumattomia ulkoisia tappioita, kolmasosa valinnoista seuraavia tappioita ja kolmasosa voittoja — säilyy **kalibrointitavoitteena**. Se ei ole havaittu tulos tästä käsikirjoituksesta. Uusilla korttimäärillä jakaumaa ei voi olettaa vanhan moottorin perusteella.

Kalibroi jakauma nimetyllä vertailupelaajalla ja erikseen useilla päätösstrategioilla. Pelaajan valinnat todella muuttavat selviytymistä: samaa kolmasosaa ei pakoteta kaikille strategioille jälkikäteen. Ulkoinen loppu on sellainen, jota tarjottu realistinen vaihtoehto ei olisi estänyt. Sopimusaikaketjun kaltainen yhdistelmäsyy merkitään päätöshistoriassa rehellisesti eikä ulkoista maakuntakaavaviivettä väitetä käyttäjän itsensä aiheuttamaksi.

**Tehdyt tarkistukset:** oikea lähdetiedosto ja SHA; kaikkien 16 muutosmerkinnän käsittely; käyttäjän 16 suoran tekstikentän vertailu; ID:iden yksikäsitteisyys; neljä vaihetta; A/B-vastausten olemassaolo; nimettyjen jatkotunnisteiden olemassaolo; poistettujen korttien poissaolo; vanhojen katkenneiden interlude-ID:iden korjaus; pelaajatekstin metakielen siivous; valintatekstien pituudet.

**Ei tehty:** pelin koodin muutosta, korttigrafiikkaa, selaimessa pelitestausta, maastollista tai hankekohtaista oikeudellista arviota, pelimoottorin suoritustestejä tai voittoprosentin simulaatiota. Kytkennät ovat toteutusohjeita, eivät itsestään suoritettavaa pelilogiikkaa. Näitä ei ole merkitty tehdyiksi.
