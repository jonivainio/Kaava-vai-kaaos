# Pelisuunnitelma: Kaava vai kaaos

**Versio 2.0 / 7.9.2026.** Työnimi. Kaikki tässä esitetyt peliluvut, mallitaulukot, todennäköisyydet ja peliaikatavoitteet ovat ehdotuksia, eivät hankekehityksen tosielämän yleissääntöjä.

## 1. Millainen peli tehdään?

Pelaaja on kuvitteellisen kehitysyhtiön hankepäällikkö. Hän yrittää säilyttää riittävän suuren ja uskottavan hankkeen samalla, kun maanomistus, kaavoitus, luonto, sähköverkko, aikataulu ja omistajan odotukset vetävät eri suuntiin. Tavoitteena ei ole maksimoida jokaista mittaria eikä tunnistaa oppikirjan aina-oikeaa vastausta.

Reigns tarjoaa vertailukohdan yhdelle kortille, kahdelle valinnalle ja nopeasti näkyville seurauksille. Tähän peliin sovelletaan samaa periaatetta, mutta nykyajan hankekehityksen omalla sisällöllä ja omalla visuaalisella identiteetillä.

Tavoiteltu yhden täyden pelikerran pituus on 55–80 päätöstä ja noin 15–25 minuuttia. Nämä mitataan myöhemmin, ei luvata etukäteen toteutuneiksi. Pelin voi sulkea kesken kortin ja jatkaa samasta tilanteesta. Ensimmäinen toteutus on huomattavasti lyhyempi esiselvitysprologi.

**Sävy on surkuhupaisa, ei ensisijaisesti kouluttava.** Virkakielinen kohtuuttomuus, yllättävät lajihavainnot, selvitys selvitystarpeesta ja keskenään ristiriitaiset ohjeet ovat pelin keskeistä sisältöä. Myös oma organisaatio ja konsultti voivat synnyttää koomisen tilanteen. Tarkka sävy, kevennykset ja vitsien rytmi on määritelty tiedostossa `SAVY_JA_HUUMORI.md`; älä muuta niitä pelkäksi neutraaliksi riskisimulaatioksi.

Kaikki hankkeet ja puhujat ovat fiktiivisiä. Uusi kierros arpoo yhden 80 nimestä, ja nimi pysyy koko kierroksen. Ei oikeita paikkakuntia, tapauksia tai hankelinkkejä. Yhteinen nimilista, erillinen kosmeettinen satunnaisuus ja tallennus on kuvattu tiedostossa `NIMET_JA_FIKTIO.md`.

## 2. Pelimuodot ja alkuarvot

| Asetus | Tuuli | Aurinko | Hybridi |
|---|---:|---:|---:|
| Tuulivoimalat alussa | 12–24 kpl | – | 12–20 kpl |
| Yksikköteho alussa | 10 MW | – | 10 MW |
| Enimmäiskokonaiskorkeus | 300 m | – | 300 m |
| Nettokenttäala | – | 80–220 ha | 60–160 ha |
| Ulkoinen liittymä alussa | 5–20 km | 2–12 km | 5–20 km, yhteinen |
| Budjetti | 100 pistettä | 100 pistettä | 100 pistettä |
| Luottamus / selvitysvalmius / kärsivällisyys | 50 / 15 / 75 | 50 / 15 / 75 | 50 / 15 / 75 |

Arvonta ei valitse toisistaan täysin irrallisia numeroita. Skenaario sisältää rajatun määrän uskottavia paikkoja, lohkoja, yhteyksiä ja riskitekijöitä. Sama siemen tuottaa saman alueen. Alussa kaikkia olosuhteita ei tiedetä. Tavallinen vaikeus ei aloita todistetusti mahdottomasta tilanteesta ilman, että pelaaja voi tehdä jotain muuta mielekästä.

Maantieteelliset skenaariot ovat kuvitteellisia. Esimerkiksi sisämaan metsäalue, entinen tuotantoalue, peltojen ja mökkijärven reunamaasto sekä rannikon metsä-/peltoalue voivat käyttää eri riskipainoja. Alueen nimi ei perustu oikeaan työnantajan hankkeeseen eikä lajien salaisiin sijaintitietoihin.

Alkuvalikossa riittää valinta Tuuli / Aurinko / Hybridi ja Uusi hanke / Jatka. Vaikeustasot, haastekoodit ja saavutukset lisätään vasta toimivan ydinkokemuksen jälkeen.

## 3. Näkyvät luvut ja niiden merkitys

### Hankkeen koko
Tuulirivi näyttää aktiiviset suunnitellut voimalat, kaavassa tavoitellun tai myöhemmin mahdollisen enimmäiskokonaiskorkeuden ja niiden nimellistehojen summan. Voimaloita ei ole vielä rakennettu. Termiksi sopii ”Suunnitelma”, ei ”Tuotannossa”.

Korkeus tarkoittaa maanpinnasta lavan ylimpään kärkeen ulottuvaa kokonaiskorkeutta. Pelin moottori ei käytä sitä napakorkeutena. Korkeuden madaltaminen ei vähennä tehoa suhteessa metreihin. Käytetään selvästi fiktiivisiä laitemalleja:

| Fiktiivinen malli | Nimellisteho | Sallittu pelimallin kokonaiskorkeus |
|---|---:|---:|
| F10 | 10 MW | 280–300 m |
| F8 | 8 MW | 250–280 m |
| F6 | 6 MW | 220–250 m |

Taulukko ei kuvaa todellisia saatavilla olevia turbiineja. Se tarjoaa yksinkertaisen tavan tehdä erillinen mallinvaihtopäätös. Jos raja laskee 300:sta 280 metriin, F10 voi edelleen säilyä. Jos raja laskee 260 metriin, nykyinen F10-suunnitelma on yhteensovittamatta ja tarvitsee uuden ratkaisun. Pelin luvut merkitään keskeneräisiksi siihen asti.

Aurinkorivi näyttää nettokenttäalan: aurinkotuotantoon varattavat toteutuslohkot, joiden sisällä ovat myös suunnitellut paneelirivivälit. Se ei ole kaikkien vuokrattujen kiinteistöjen pinta-ala eikä paneelien lasipinta-ala. Alkuvaiheessa alan toteutettavuus on alustava; selvitykset voivat poistaa lohkoja.

Sisäisessä pelilaskennassa käytetään oletusta 0,65 MWp/ha ja DC/AC-suhdetta 1,25. Näin 100 ha tarkoittaa tässä pelissä 65 MWp DC ja 52 MWac invertterikapasiteettia. Todelliset arvot riippuvat suunnittelusta. Kerro oletus lisätietonäkymässä, älä markkinoi sitä yleisenä muuntokertoimena.

Tuulivoiman MWac + aurinkoinvertterien MWac voidaan muodostaa pelin AC-nimellistehosummaksi. Tämä ei ole taattu samanaikainen tuotanto eikä verkkovienti. Liittymän sallittu vientiteho esitetään erikseen. Vuosituotanto ja tuotantohäviöt kuuluvat lisätietoon, eivät korvaa nimellistehoa.

### Sähköliittymä
UI näyttää kummankin komponentin reitin pituuden, mutta yhteisen osuuden tunniste kertoo, että sama johto ei ole kaksi eri investointia. Myöhemmässä tarkassa mallissa reitti muodostuu tunnisteellisista osista. Esimerkiksi tuulen 2 km sisäinen haara, auringon 1 km haara ja yhteinen 14 km ulkoinen yhteys eivät ole 16+15 km ulkoista johtoa.

Perus-UI:n pituus tarkoittaa **ulkoista liittymisreittiä hankealueen sähköasemalta liittymispisteeseen**, ei jokaisen voimalan sisäistä kaapelia. Sisäverkon kustannus on erillinen. Pituus ei yksin kuvaa kapasiteettia, jännitetasoa, maaperää, vesistöylityksiä tai verkon valmistumista; nämä voivat näkyä korteissa ja talousindeksissä.

### Neljä pelimittaria
Budjetti on käytettävissä oleva kehitysraha pisteinä. Paikallinen luottamus on suhtautumisen ja vuorovaikutuksen karkea pelillinen mittari, ei kunnan virallinen kanta. Selvitysvalmius kuvaa kokonaiskuvaa, mutta ei korvaa yksittäisen pakollisen selvityksen tilaa. Omistajan kärsivällisyys kuvaa jatkamishalua, ei pelaajan terveydentilaa.

Korkea arvo ei tapa hanketta. Selvitysvalmius 100 ei oikeuta sivuuttamaan puuttuvaa Natura-arviointia. Luottamus 0 ei automaattisesti tarkoita kaavan lainvastaisuutta. Budjetin ja kärsivällisyyden loppuminen voi kuitenkin päättää yhtiön osallistumisen.

Talousindeksi on lisätiedossa oleva 0–100 pelillinen arvio, ei laskettu IRR. Aluksi 65. Siihen voivat vaikuttaa mitattu tuulisuus, rakentamisen vaikeus, verkkoratkaisu, sähkösopimus ja tuet. Indeksin heikkous tarjoaa rahoitus-/supistus-/luopumisvalintoja. Sitä ei esitetä oikean investointipäätöksen perustana.

## 4. Eteneminen: kahdeksan päävaihetta

| Vaihe | Pelaajan keskeinen työ | Portti eteenpäin |
|---|---|---|
| 1. Alue ja maanvuokraus | Oikeudet, maanomistajaryhmät, alkuperäinen rajaus, karkea verkko | Riittävät alustavat oikeudet ja dokumentoitu skenaario |
| 2. Esiselvitykset ja kunta | Kaavoitusaloite, puolustus-/ilmailuselvityksen käynnistys, maankäyttöristiriidat | Kunnan päätös aloittaa ja alustava menettelypolku |
| 3. Arvioinnin suunnittelu | YVA-tarve, ohjelma, OAS, selvitysten hankinta ja aikataulu | Sovittu tutkimusohjelma ja kaavoituksen osallistumisjärjestely |
| 4. Maasto ja suunnittelu | Luonto, tuuli, maaperä, vesi, melu, välke, maisema ja reittivaihtoehdot | Tarvittava näyttö saatavissa; hankeversio tarkentunut |
| 5. YVA-selostus ja kaavaluonnos | Vaihtoehtojen arviointi, kuuleminen, asiakirjaversiot | Palaute ja selvitysten riittävyyden tarkastus |
| 6. Päätelmä ja korjaukset | Perusteltu päätelmä, tarvittavat täydennykset, yhteisvaikutukset | Selvitykset ja vaikutuksia välttävä ratkaisu vastaavat hanketta |
| 7. Kaavaehdotus | Tarkat rajaukset, vastineet, verkko, kaupalliset edellytykset | Tarvittavat menettelyt ja aineisto päätöksentekoa varten |
| 8. Hyväksyminen | Päätöksentekomenettely, valtuuston ratkaisu, raportointi | Hyväksytty kaava ja erikseen ilmoitettu kehitystulos |

Tämä on käyttöliittymän dramaturginen järjestys, ei väite kaikkien hankkeiden identtisestä juridisesta aikataulusta. YVA ja kaavoitus voivat kulkea eri tahtia ja rinnakkain. Aurinkoskenaario voi olla ilman YVA-menettelyä, jolloin sen kortit ja portit jäävät pois mutta tarvittavat vaikutusselvitykset säilyvät. Kampanja käyttää fiktiivistä, skenaariokohtaista menettelymallia; se ei ole ajantasainen oikeudellinen neuvontaohje.

Tuotantoversiossa portit määritellään ehdollisesti skenaarion menettelytarpeen mukaan. Pelin omistajan hyväksymä kehitysvoitto voi vaatia lisäksi uskottavan verkko- ja taloussuunnitelman; erottele tämä kaavan oikeudellisista hyväksymisedellytyksistä.

## 5. Rinnakkaiset polut — tärkein ero tavalliseen korttiarvontaan

Maakuntakaava: yhteensopiva / ei olennaista muutostarvetta / selvityksessä / luonnoksessa mukana / ehdotuksessa mukana / poistettu / hyväksytty / muutoksenhaku. Vaikutus riippuu hankkeen seudullisuudesta ja kaavan ohjausvaikutuksesta. Maakuntakaavan hyväksyminen ei ole pelaajan ostettavissa oleva suoritus.

Verkko: alustava karttatieto / liityntäkysely / tekninen selvitys / vaihtoehtoinen piste / ehdollinen toteutettavuus / sopimusvaihe / yhteys estynyt. Pelissä ei teeskennellä, että kaavoituksen alussa olisi aina saatavilla sitova liittymissopimus. Riittävä vaihe määräytyy hankkeen tilanteesta. Kartalla näkyvä mahdollisuus ei ole varaus.

Luonto ja vesi: havainto / selvitystarve / tilattu tutkimus / tulos / vältetty vaikutus / vielä epävarma / ratkaisematon este. Yksi ”luonto”-mittari ei yhdistä kaikkia eri oikeudellisia tilanteita.

Maanhallinta: optio/vuokra / tarvittavat kulku- ja johtooikeudet / määräaika / tarkennettu rajaus / jäljellä olevat kriittiset puutteet.

Rahoitus: kehitysbudjetti / tuen valmistelu / ehdollinen tarjous / hakemus / myöntö tai hylkäys / muu toteutusmalli. RENEWFM on kilpailtu rahoitusväylä, ei pakollinen rakennuslupa.

Politiikka ja sidosryhmät: paikallisen keskustelun historia, vaalikalenteri, valtuuston kokoonpano ja riippumaton päätöksenteko. Kunnallisvaalit eivät tapahdu sattumalta joka vuosi. Kuvitteellisen kampanjan tulevat vaalit ajastetaan alussa kalenteriin ja ovat pelaajalle nähtävissä.

Näiden polkujen tapahtumat voivat tulla minkä tahansa muun päävaiheen aikana. Aikataulu on yhteinen: samanaikaisen puolen vuoden selvityksen ja yhdeksän kuukauden verkkoasian käsittely ei automaattisesti vie 15 kuukautta.

## 6. Korttien valinta ja oikeudenmukainen epävarmuus

Korttipakka ei ole satunnaisesti sekoitettu kokoelma. Korttiohjaaja käyttää hankemuotoa, vaihetta, selvityksiä, alueen piileviä ominaisuuksia, aiempia valintoja ja keskeneräisiä seurauksia. Ensisijaisia ovat erääntyneet seuraukset ja pakolliset työn tulokset, sitten vaiheeseen liittyvät tehtävät, lopuksi vaihtelua tuovat arkikortit.

Hyvä kortti tarjoaa kaksi uskottavaa vaihtoehtoa. Aina toinen ei ole oikein ja toinen huolimaton virhe. Esimerkiksi nopeasti aloittava konsultti ja myöhemmin aloittava kokenut asiantuntija voivat kumpikin olla oikeita, riippuen tutkimusikkunasta ja aiemmasta aineistosta. Huolellisuus on yleensä hyödyllistä, mutta loputon lisäselvittäminen ei ole ilmaista tai aina tarpeellista.

Tietoa voi puuttua. Silloin näytä mitä tiedetään ja mitä ei tiedetä. Tunnettu varma hankkeen lopettava seuraus ei saa piiloutua harmittomaan tekstivalintaan. Tappion jälkeen pelaaja näkee tapahtumaketjun: alkuperäinen valinta → myöhempi seuraus → loppuehto. Älä väitä, että kaikki todelliset hankeriskit olisivat aina pelaajan omien virheiden syytä.

Kortti `Tilaa luontoselvitys` ei arvo luonto-ongelmaa tyhjästä. Se aloittaa työn, jonka tulos paljastaa alussa asetetun riskin. Välttämistoimenpiteet kohdistuvat tiettyihin kohteisiin. Jos sama suoalue on jo jätetty pois viitasammakon vuoksi, se ei häviä uudelleen paineellisen pohjaveden kortissa.

Positiiviset kortit ovat yhtä konkreettisia: vaihtoehtoinen reitti lyhenee; käyttökelpoinen aiempi aineisto säästää tutkimustyötä; kunta hyväksyy aloitteen; maanomistajien yhteinen neuvottelu ratkaisee kriittiset rajat; dokumentoitu lieventäminen säilyttää muuten poistettavan voimalan; rahoittaja hyväksyy vaiheistetun hankkeen.

## 7. Häviöehdot ja loput

Alustavat normaalitason pelirajat, asetustiedostoon:

| Ehto | Peliraja | Mitä raja tarkoittaa |
|---|---:|---|
| Tuulen AC-nimellisteho | alle 50 MW | Kuvitteellinen yhtiö ei jatka näin pientä tuulihanketta |
| Auringon AC-kapasiteetti | alle 20,8 MWac | Vastaa 40 ha nykyisellä fiktiivisellä kertoimella |
| Hybridin AC-nimellistehosumma | alle 80 MWac | Tarjotaan yksi laillinen suunnanvaihto, jos mahdollinen; muuten loppu |
| Ulkoinen liittymä | tuuli/hybridi yli 40 km; aurinko yli 20 km | Yhtiön pelillinen riskiraja, ei tekninen tai lain raja |
| Budjetti tai kärsivällisyys | 0 | Kehitystä ei enää rahoiteta |
| Hankeaika | yli 96 kk normaalitilassa | Yhtiön fiktiivinen aikaraja |
| Ratkaisematon kova este | tapauskohtainen | Hanketta ei voida jatkaa valitulla tavalla |

Taso ”harjoittelu” voi jättää taloudelliset lopetukset varoituksiksi, mutta se merkitään erilliseksi harjoitteluksi. Se ei saa vääristää oikeudellisia esteitä. ”Vaikea” muuttaa resursseja ja yllätyspainoja, ei luonnonsuojelun tai kaavoituksen sisältöä.

Hybridin luopuminen yhdestä komponentista on erillinen kortti. Tuulen poistaminen asettaa tuulikomponentin kohteet pois käytöstä ja vaihtaa pelimuodon auringoksi. Alkuinvestoinnit ja yhteiset kustannukset eivät katoa. Uusi aurinkotila joutuu aurinkopelin rajoihin. Peli ei avaa tällaista pelastusta jokaisen tappion kohdalla.

Lopputulokset voivat olla ”Kaava hyväksytty — täysi hybridi”, ”Kaava hyväksytty — pienempi mutta toimiva tuulihanke”, ”Aurinko pelasti kehitystyön”, ”Kunta päätti lopettaa valmistelun”, ”Verkkopolku katkesi”, ”Selvityskulut ylittivät omistajan hyväksynnän” tai ”Luontoarvoja säilyttäen luovuttiin toteutuksesta”. Lopputulos kerrotaan kuivalla, surkuhupaisalla jälkikommentilla: ”Kaava jäi saamatta. Arkisto valmistui etuajassa.” Älä peitä todellista häviösyytä vitsin alle.

Kaavavoiton yhteenvedossa näytetään alku → loppu: kpl, korkeus, MW, ha, liittymä, aika ja merkittävimmät ratkaisut. Mahdollinen epävarma rahoitus, keskeneräinen verkkosopimus ja muut luvat ilmoitetaan erikseen. Valitusvaiheeseen siirtyminen on jatkopelin valinta, ei pakollinen yllätys heti voiton jälkeen.

## 8. Visuaalinen toteutus

Kortissa on vakioitu kuvitusalue, rooli ja lyhyt teksti. Puhujat palaavat: maanomistaja, kunnan kaavoittaja, luontokonsultti, verkkosuunnittelija, alueellinen asiantuntija, naapuri, lakiasiantuntija ja omistajan edustaja. Eläin- ja maisemakuvia käytetään tilanteissa, joissa henkilö ei ole luonteva.

Tavoite koko pakalle on noin 20 hahmokuvaa + 16 tilannekuvaa ja vähäiset variaatiot. Kuva-avaimet eivät ole korttikohtaisia tiedostonimiä. Tällä 420 tekstikorttia ei vaadi 420 kuvitusta. M1 käyttää kuutta alkuperäistä SVG:tä ja selkeästi merkittyä puuttuvan kuvan varakuvaa.

Liike on hillitty: kortin kallistus, seuraavan kortin paljastuminen, luvun lyhyt muutospalaute ja vaihetaustan hienovarainen vaihtuminen. Ei raskaita 3D-elementtejä tai jatkuvaa liikettä. Äänet ovat myöhempi lisä: lyhyt paperiääni, napautus ja hillitty onnistumispalaute, aina mykistettävissä. Musiikkia ei tarvita ensimmäiseen versioon.

## 9. Laadun mittaaminen

Pelimoottorin testit tarkistavat toistettavuuden, ehdot, ajastimet, rinnakkaisuuden, fyysisten kohteiden poistot, kaksoisvahvistuksen, tallennuksen sekä lukujen yksiköt. Sisältötestit tarkistavat ID:t, roolit, kuvaviitteet, tekstipituudet ja molemmat vaihtoehdot.

Myöhemmin tehdään vähintään 10 000 simuloitua pelikertaa pelimuotoa kohti usealla ei-kaikkitietävällä strategialla. Satunnainen agentti ei yksin mittaa reiluutta. Raportoidaan jumittumiset, vaihepeitto, yleisimmät tappiot, toistot ja erot strategioiden välillä. Voittoprosentti asetetaan vasta pilotin jälkeen; 420 korttia ei itsessään todista uudelleenpelattavuutta.

Oikeat puhelinpelitestit tarkistavat peukalotuntuman, tekstin luettavuuden, värit, sivueleet, loppujen ymmärrettävyyden ja sen, muistetaanko toisen pelikerran jälkeen jokin eri tarina. Työtoverit tarkistavat erityisesti, että peli tunnistaa ammatillisen työn eikä palkitse väärää käsitystä lupamenettelystä.

## 10. V2:n lisätiedostot ja demorajaus

64 kortin pakka sisältää 48 aiemman kortin uudistetut tekstit sekä 16 uutta satiirikorttia. Korttisääntöjen formaatti säilyy 1.0:ssa. `content/editorial.fi.json` lisää erillisen rytmitystiedon ilman uusia vaikutuskäskyjä. `content/pilot_manifest.json` sisältää 12 päätöksen demopolun, jonka H001-haara valitsee H002:n tai H003:n, ei molempia. Demo siirtyy käsikirjoitettujen opetustilojen välillä näkyvästi eikä väitä toteuttavansa täyden kampanjan porttimallia. Kaikki muu pakka on sisältökatselimessa.

Ensimmäinen toteutus jaetaan erillisiin tehtäviin: moottori (01), mobiilidemo (02), kuvituksen kuusi tyyppikuvaa (03). Koko M0–M1-monoliittia ei enää anneta yhtenä raskaana toimeksiantona. `CODEX_AIHEET_JA_MALLIT.txt` on ajantasainen tehtäväjärjestys.
