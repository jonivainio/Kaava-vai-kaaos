# Nykyisen sisällön käyttö eri pelimuodoissa

## Lähde ja tarkistuksen laajuus

Tässä on nykyistä v5-lähdehashia vastaavat 248 sisältötunnistetta. Niiden otsikot ja päätilanteet luettiin päällekkäisyyksien ja aiheiden erotteluun. Lisäksi tarkastettiin aktiivisen v5-moottorin kelpoisuus-, ohjaus-, alustus-, lopetus-, lupa- ja tallennuskohtia GitHubista. Taulukko on **toimituksellinen käyttöpolitiikka**, ei väite, että kaikki yksittäiset resolverit olisi jo ajettu tai että pelimuodot toimisivat.

`data/moodiauditointi.json` sisältää saman 248 ID:n luettelon ja jatkoauditoinnin tehtävät. Kaikkien runtimeAuditStatus on tarkoituksella implementation-required: toteuttaja merkitsee oman raporttinsa läpäistyt kokeet vasta todellisista testeistä. Vanhat tuuli- ja aurinkopilotit eivät korvaa aktiivisen moottorin näitä sääntöjä.

## Uusien aiheiden ero nykyiseen pankkiin

Uudessa pankissa ei toisteta jälleen viitasammakon kosteikkoa, metsäpeuran reittiä, lisäselvityksen tilausta yleisesti tai omistajan yleistä vetäytymistä. Välke on eri vaikutus kuin melu; antennivastaanoton nykytilan mittaus on eri aihe kuin puolustustutka; sulfidimaa on eri riskimekanismi kuin yleinen tulva; paneelihäikäisy on eri ilmiö kuin tuulivoimalan varjo; laidunnus on myönteinen maankäytön käytännön ratkaisu; DC/AC-vertailu ei ole akun MW/MWh-kortti. Kuntakohtaiset hyväksymiset eroavat nykyisestä maakuntakaavariippuvuudesta ja valtuuston vaihtumisesta.

## Lukutapa ja toteutus

- **requires_own_wind:** pidä tässä toimituksessa vain omassa aktiivisessa tuuliosassa. Nykyinen teksti tai lähdeketju on tuulispesifi. Samaa eläinlajia voi esiintyä aurinkohankkeessa, mutta siitä ei seuraa oikeutta käyttää törmäysriskikorttia paneelien kanssa.
- **requires_own_solar:** aurinko- ja hybridikäyttö oikealla lohkolla. Ei puhtaaseen Tuuli-tilaan.
- **hybrid_bess:** vain hybridin oma akku- tai siihen liittyvä epilogipolku.
- **case_scoped:** julkaise vain oikeasta lähdetapauksesta; tarkista jokainen haara. Ei yleistä kaikille lajeille tai hankeosille sopivaa tulosta.
- **mode_presentation:** nimetty esitysversio tai ehdollinen haara tarvitaan. `data/mooditekstit.json` määrää tärkeimmät muutokset.
- **shared_requires_rule_audit:** yhteiseksi sopiva pääaihe; nykyinen spec/eligible/apply ja resolverit tarkistetaan. Tämä luokka ei tarkoita allow-all-sääntöä.

Puhdas Aurinko tarvitsee omat paneelikentän maisema-, sammakko-, linnusto- ja vesikortit, joita pankissa jo on. Niitä ei vaihdeta wind-varianttien toimintoihin. Yhteisessä maanvuokrauskortissa aurinkohaara on omistajien kielteinen vastaus kyseisestä paneelimaasta, ei tuuliosan siirtovarasta. Säilytä saman tapauksen alkuperäiset owner-, parcel- ja branch-tunnisteet.

`narration.ts` on tarkistettava samalla: oikea lähdekortti ei auta, jos vanha tiivistelmä, puhuja, lyhyt reaktio tai kuva kertoo toisesta tekniikasta. Kuvassa saa olla ulkopuolinen toinen hanke vain kun se kuuluu tilanteeseen. Tuulipalautuksia ja vanhoja tuulimoodin reaktioita ei näytetä aurinkojatkon aktiivisina mahdollisuuksina.

`surveys`-overridejen bodyt tuotetaan alkuperäisen kortin tarjousnumeroista, ei korvata kaikkia samaan hintaan. No-YVA-profiilissa `interludes[1][1]`, `interludes[1][3]` ja `interludes[2][1]` eivät tule YVA-vahvistuksina; käytä tarvittaessa olemassa olevaa yleistä etenemistä enintään nykyisellä näkyvyyskiintiöllä. `draft-done::no-yva` korvaa päätelmätilanteen vain oikeassa no-YVA-profiilissa.

### Keskustelussa käsiteltyjen poistojen säilyminen

Älä palauta tunnisteita `UUSI-P1-02`, `UUSI-P1-10`, `BESS-P1-04`, `initiative`, `programme` peruskorteiksi. Säilyneet variantit ovat omia tilanteitaan, eivät poistettujen runkotekstien periytyviä kopioita. Uusi LP1-T03 ei palauta poistettua roottorin ilmatilasopimuskorttia eikä tee sillasta hankkeen automaattista loppua.

### Esitysmuutosten yhdistäminen

`data/mooditekstit.json`:n `when` ja `implementation` ovat ihmisen luettavaa toimeksiantoa, eivät evalilla suoritettavia ehtoja. Kirjoita niille tyypitetyt, testatut ehdot. Useampi rivi voi koskea samaa ID:tä: esimerkiksi land-minimumin aurinkohaaran rajaus ja aurinko-otsikko täydentävät toisiaan. Yhdistä toisistaan riippumattomat kenttämuutokset hallitussa järjestyksessä ja hylkää ristiriitaiset saman kentän korvaukset. Älä käytä ensimmäiseen osumaan päättyvää resolveria, joka vahingossa pudottaa tarkemman esitystekstin.

## Tunnistekohtainen tarkistuslista

Taulukon kandidaattikontekstit ovat yläraja; 03:n ehdot ja toteutettu sääntö kaventavat sitä. Hybridi → Aurinko tarkoittaa aktiiviselta sisällöltään aurinkoa.

| ID | Käyttöluokka | Kandidaattikontekstit | Nykyinen otsikko |
|---|---|---|---|
| `start` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Uusi hanke |
| `land` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kovia vaatimuksia |
| `road` | mode_presentation | wind, solar, hybrid, hybrid_solar | Väärä karttaliite |
| `land-signing` | mode_presentation | wind, solar, hybrid, hybrid_solar | Allekirjoituksesta lisähinta |
| `land-index` | mode_presentation | wind, solar, hybrid, hybrid_solar | Inflaatio on kaikille sama. Indeksi ei olisi. |
| `land-minimum` | mode_presentation | wind, solar, hybrid, hybrid_solar | Heikollakin tuulella on kuukausimaksu. |
| `land-map-versions` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Allekirjoitus tuli. Sopimus ei. |
| `land-area-explained` | requires_own_wind | wind, hybrid | Missä minun voimalani on? |
| `UUSI-P1-MAARIITA` | requires_own_wind | wind, hybrid | Sopimuksesta ei päästä sopuun |
| `land-meetings` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaikkia ei saa samaan iltaan |
| `UUSI-P1-01` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Yksi vastaus kuudelta omistajalta |
| `UUSI-P1-03` | requires_own_wind | wind, hybrid | Kuinka kauan odotetaan? |
| `UUSI-P1-04` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Yhteinen johto, pienempi lasku |
| `UUSI-P1-05` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Tämä maa onkin jo vuokrattu |
| `UUSI-P1-06` | requires_own_solar | solar, hybrid, hybrid_solar | Märkä palsta kaupan |
| `UUSI-P1-07` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Tie ei ole vielä sovittu |
| `UUSI-P1-08` | requires_own_wind | wind, hybrid | Maata saa vuokrata. Voimalaa ei saa rakentaa. |
| `UUSI-P1-09` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Mihin ensimmäiset selvitysrahat käytetään? |
| `BESS-P1-01` | hybrid_bess | hybrid | Tuulisopimus ei mainitse akkua. |
| `BESS-P1-02` | hybrid_bess | hybrid | Akku mahtuu. Huoltotie ei. |
| `BESS-P1-03` | hybrid_bess | hybrid | Halpa akkutontti tulvii |
| `interludes[0][0]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Sopimuksia saatiin lisää |
| `land-done` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Maat vuokrattu |
| `EV-MAA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Vuokraneuvottelun tulos |
| `EV-SOPIMUSSIVUT` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Puuttuvat sopimussivut |
| `EV-VOIMALALUPAUS` | requires_own_wind | wind, hybrid | Maanomistajan vaatimus käsiteltiin |
| `external-0` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Yhtiö lopettaa hankekehityksen. |
| `ext-land-owner` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Portfolio supistuu |
| `ext-land-use` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavoitusmonopolia |
| `transition-1` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kaava-aloite ja YVA-ohjelma |
| `defence` | requires_own_wind | wind, hybrid | Puolustusvoimien lausunto |
| `surveys` | mode_presentation | wind, solar, hybrid, hybrid_solar | Halvempi tarjous sisältää uuden kevään. |
| `research` | case_scoped | wind, solar, hybrid, hybrid_solar | Rahoitetaanko seurantaa? |
| `initiative-rumour` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kylällä kiertää väärä kartta |
| `initiative-council` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Uusi valtuusto haluaa uuden esittelyn |
| `initiative-cottage` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Mökkiläiset tulevat vasta kesällä |
| `surveys-spring` | mode_presentation | wind, solar, hybrid, hybrid_solar | YVA-konsultti on valittava. |
| `surveys-access` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kilpailutus toi kaksi aikataulua. |
| `surveys-team` | mode_presentation | wind, solar, hybrid, hybrid_solar | Vapaa tiimi maksaa enemmän. |
| `research-gps` | case_scoped | wind, solar, hybrid, hybrid_solar | Lisää paikannusaineistoa |
| `research-cumulative` | case_scoped | wind, solar, hybrid, hybrid_solar | Yhteistutkimus hankkeiden vaikutuksista |
| `research-seasons` | case_scoped | wind, solar, hybrid, hybrid_solar | Seuranta tarvitsee yhden kauden lisää |
| `programme-birds` | requires_own_wind | wind, hybrid | Lintuyhdistyksellä on lisähavaintoja |
| `programme-range` | requires_own_wind | wind, hybrid | Seurantaa pyydetään hankealueen ulkopuolelta |
| `herding-programme` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Paliskunnan aineisto puuttuu |
| `programme-cumulative` | requires_own_wind | wind, hybrid | Yhteisvaikutuksiin tuli kolme hanketta lisää |
| `UUSI-P2-01` | requires_own_wind | wind, hybrid | Yhdeksän voimalaa ei riitä kevennykseksi |
| `UUSI-P2-02` | requires_own_wind | wind, hybrid | Kolme vaihtoehtoa, samat ongelmapaikat |
| `UUSI-P2-03` | requires_own_wind | wind, hybrid | Hanke odottaa maakuntakaavaa |
| `UUSI-P2-04` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Mihin hanke liitetään? |
| `UUSI-P2-05` | requires_own_wind | wind, hybrid | Puolustusvoimien huomio koskeekin johtoa |
| `UUSI-P2-06` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavaluonnos valmistellaan vasta päätelmän jälkeen |
| `UUSI-P2-07` | requires_own_wind | wind, hybrid | Metsäpeurat liikkuvat Natura-alueiden välillä |
| `UUSI-P2-08` | requires_own_wind | wind, hybrid | Korkeampi voimala tarvitsee uuden tarkistuksen |
| `UUSI-P2-09` | requires_own_solar | solar, hybrid, hybrid_solar | Sammakkokäynti osui liian kylmään iltaan |
| `UUSI-P2-10` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Pesäkarttaa ei voi laittaa yleisön nähtäville |
| `UUSI-P2-11` | requires_own_wind | wind, hybrid | Naapurihanke julkistettiin viikkoa myöhemmin |
| `UUSI-P2-12` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Työohjelmasta päästiin sopuun |
| `BESS-P2-01` | hybrid_bess | hybrid | Akku tarvitsee sähköä myös sisäänpäin |
| `BESS-P2-02` | hybrid_bess | hybrid | Sama megawatti, eri määrä energiaa |
| `BESS-P2-03` | hybrid_bess | hybrid | Toimittajan mukaan kyse on vain kontista |
| `BESS-P2-04` | hybrid_bess | hybrid | Lisätään tähän vielä akku |
| `BESS-P2-05` | hybrid_bess | hybrid | Verkkovaatimusten aineisto puuttuu tarjouksesta |
| `interludes[1][0]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Hanke esiteltiin kunnalle |
| `interludes[1][1]` | mode_presentation | wind, solar, hybrid, hybrid_solar | YVA-ohjelmaa viimeistellään |
| `interludes[1][2]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Selvityksiä on käynnissä |
| `interludes[1][3]` | mode_presentation | wind, solar, hybrid, hybrid_solar | Ohjelmavaiheen yleisötilaisuus pidettiin |
| `surveys-wait` | mode_presentation | wind, solar, hybrid, hybrid_solar | Maastoselvitykset käynnistyvät |
| `surveys-wait::no-yva` | mode_presentation | wind, solar, hybrid, hybrid_solar | Vaikutukset selvitetään silti. |
| `EV-MAARIITA` | requires_own_wind | wind, hybrid | Vuokrasopimuksen riitaan ratkaisu |
| `EV-ETUSIJA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Etusijasta saatiin vastaus |
| `EV-SELVITYSJARJESTYS` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Ensimmäinen selvityserä valmistui |
| `EV-MAASTOKAUSI` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Uuden maastokäynnin tulos |
| `EV-PV` | requires_own_wind | wind, hybrid | Puolustusvoimilta tuli vastaus |
| `EV-VTT-TULOS` | requires_own_wind | wind, hybrid | Tutkavaikutusselvityksestä lopullinen kanta |
| `external-1` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kunta sanoi ei. |
| `ext-initiative-priority` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavoitus ei käynnisty. |
| `ext-initiative-owner` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Omistajan strategia vaihtui. |
| `transition-2` | mode_presentation | wind, solar, hybrid, hybrid_solar | YVA-selostus ja kaavaluonnos |
| `nature` | requires_own_wind | wind, hybrid | Sääksi lentää voimalapaikkojen kautta |
| `solarNature` | requires_own_solar | solar, hybrid, hybrid_solar | Viitasammakot löytyivät vanhasta altaasta |
| `UUSI-P3-KOSTEIKKO` | requires_own_solar | solar, hybrid, hybrid_solar | Märälle palstalle löytyi käyttöä |
| `noise` | requires_own_wind | wind, hybrid | Yhteismelu ylittää ohjearvon |
| `height` | requires_own_wind | wind, hybrid | Maanpinnan korkeus unohtui |
| `solarWater` | requires_own_solar | solar, hybrid, hybrid_solar | Vesienkäsittely ei päättynyt turvetuotannon mukana |
| `opinions` | mode_presentation | wind, solar, hybrid, hybrid_solar | Havainnekuva puuttuu kylätieltä |
| `golden-known` | requires_own_wind | wind, hybrid | Maakotkan säännöllinen lentoreitti |
| `golden-unknown` | requires_own_wind | wind, hybrid | Kotka näkyy, pesää ei löydy |
| `golden-shared` | requires_own_wind | wind, hybrid | Naapurin kotka olikin sama kotka |
| `nature-reindeer-calving` | requires_own_wind | wind, hybrid | Metsäpeuran vasomisalue löytyi sijoittelusta |
| `nature-reindeer-route` | requires_own_wind | wind, hybrid | Voimalat katkaisisivat metsäpeuran kulkuyhteyden |
| `nature-squirrel` | requires_own_wind | wind, hybrid | Pesäpuu säästyy. Kulkuyhteys ei. |
| `nature-bird-area` | requires_own_wind | wind, hybrid | Pelto osoittautui tärkeäksi levähdysalueeksi |
| `herding-pasture` | requires_own_wind | wind, hybrid | Laidunten välinen kulku kapenee |
| `noise-neighbour-model` | requires_own_wind | wind, hybrid | Naapuri vaihtoi voimalamallia |
| `noise-neighbour-layout` | requires_own_wind | wind, hybrid | Naapuri siirsi voimalansa lähemmäs |
| `noise-joint` | requires_own_wind | wind, hybrid | Erilliset melukartat eivät riittäneet |
| `height-ground` | requires_own_wind | wind, hybrid | Korkeusmalli muutti tulosta |
| `height-approach` | requires_own_wind | wind, hybrid | Voimalapaikat osuvat lähestymissuuntaan |
| `height-ridge` | requires_own_wind | wind, hybrid | Tuulisin harjanne on ilmailulle hankalin |
| `solar-nest-water` | requires_own_solar | solar, hybrid, hybrid_solar | Turvetuotanto loppui, linnut tulivat |
| `solar-frog-basin` | requires_own_solar | solar, hybrid, hybrid_solar | Allas piti kuivata. Siellä lisääntyy viitasammakko. |
| `solar-required-wetland` | requires_own_solar | solar, hybrid, hybrid_solar | Vesienhallinta vie paneelialaa |
| `solar-postcare` | requires_own_solar | solar, hybrid, hybrid_solar | Jälkihoito tarvitsee edelleen altaat |
| `opinions-photo` | mode_presentation | wind, solar, hybrid, hybrid_solar | Asukkaan piha ei näy havainnekuvissa |
| `opinions-club` | mode_presentation | wind, solar, hybrid, hybrid_solar | Yhdistyksen kartassa on uusi lajipiste |
| `opinions-noise` | requires_own_wind | wind, hybrid | Sama melukysymys sadassa viestissä |
| `herding-opinions` | requires_own_solar | solar, hybrid, hybrid_solar | Paneeliaita osuu laidunreitille |
| `solar-pond` | requires_own_solar | solar, hybrid, hybrid_solar | Kevät paljasti viitasammakon lisääntymispaikan |
| `solar-ditch` | requires_own_solar | solar, hybrid, hybrid_solar | Oja tuo veden lisääntymislammikkoon |
| `solar-water` | requires_own_solar | solar, hybrid, hybrid_solar | Kuivatus ulottuu lisääntymispaikalle |
| `solar-squirrel` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelialue katkaisisi liito-oravan yhteyden |
| `solar-bird-area` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelit osuvat muuttolintujen levähdysalueelle |
| `solar-view-road` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelit näkyisivät suoraan naapurin olohuoneeseen |
| `solar-view-winter` | requires_own_solar | solar, hybrid, hybrid_solar | Talvikuva näytti enemmän. |
| `solar-view-edge` | requires_own_solar | solar, hybrid, hybrid_solar | Puusto oli luvattu kuvassa. |
| `solar-rain` | requires_own_solar | solar, hybrid, hybrid_solar | Sadevesi valuu naapurin pellolle |
| `solar-drain` | requires_own_solar | solar, hybrid, hybrid_solar | Alapuolinen oja on jo täynnä |
| `solar-snow` | requires_own_solar | solar, hybrid, hybrid_solar | Sulamisvesi kerääntyy paneelikentälle |
| `nature::solar-base` | requires_own_solar | solar, hybrid, hybrid_solar | Kevät paljasti viitasammakon lisääntymispaikan |
| `noise::solar-base` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelit näkyisivät suoraan naapurin olohuoneeseen |
| `height::solar-base` | requires_own_solar | solar, hybrid, hybrid_solar | Sadevesi valuu naapurin pellolle |
| `solarNature::wind` | requires_own_wind | wind, hybrid | Voimalan siirto ei siirtänyt huoltotietä |
| `solarWater::wind` | requires_own_wind | wind, hybrid | Voimajohdon rakentaminen voi kuivattaa Natura-suota |
| `UUSI-P3-01` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Selostus sai kiitosta. Hanke ei. |
| `UUSI-P3-02` | requires_own_wind | wind, hybrid | Kesähavainnot muuttivat metsäpeurakuvaa |
| `UUSI-P3-03` | requires_own_solar | solar, hybrid, hybrid_solar | Vanha turvekenttä on muuttunut kosteikoksi |
| `UUSI-P3-04` | requires_own_wind | wind, hybrid | Maakotkan reviirillä on jo kolme hanketta |
| `UUSI-P3-05` | requires_own_wind | wind, hybrid | Voimalan siirto ei siirtänyt huoltotietä |
| `UUSI-P3-06` | requires_own_solar | solar, hybrid, hybrid_solar | Alempi paneelipaikka kerää sadevedet |
| `UUSI-P3-07` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Huoltotien kohdalta löytyi tervahauta |
| `UUSI-P3-08` | requires_own_wind | wind, hybrid | Lepakkohavainnot keskittyvät loppukesän öihin |
| `UUSI-P3-09` | requires_own_wind | wind, hybrid | Talvella voimalat näkyvät enemmän |
| `UUSI-P3-10` | requires_own_wind | wind, hybrid | Yömelu puuttui vertailusta |
| `UUSI-P3-11` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kuulemiseen tuli myös Ruotsi |
| `UUSI-P3-12` | case_scoped | wind, solar, hybrid, hybrid_solar | Porojen talvilaitumelle ei enää päästä |
| `UUSI-P3-13` | case_scoped | wind, solar, hybrid, hybrid_solar | Voimajohdon rakentaminen voi kuivattaa Natura-suota |
| `UUSI-P3-14` | requires_own_wind | wind, hybrid | Lisäselvitys vapautti kaksi voimalapaikkaa |
| `P3-SOPIMUS` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Poikkeuksesta halutaan yhteinen käytäntö |
| `BESS-P3-01` | hybrid_bess | hybrid | Jäähdytys kuuluu naapuriin |
| `BESS-P3-02` | hybrid_bess | hybrid | Paloturvallisuutta ei voi arvioida myyntiesitteestä |
| `BESS-P3-03` | hybrid_bess | hybrid | Häiriötilanteen vedet pääsisivät ojaan |
| `BESS-P3-04` | hybrid_bess | hybrid | Laiterivi tukki kulun |
| `BESS-P3-05` | hybrid_bess | hybrid | Yhteinen liittymä ei kata molempien huipputehoa |
| `BESS-P3-06` | hybrid_bess | hybrid | Reservitulo on laskelmassa joka vuosi sama |
| `BESS-P3-07` | hybrid_bess | hybrid | Uusi akku tarvitsee eri asemapiirroksen |
| `interludes[2][0]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavaluonnos valmistuu |
| `interludes[2][1]` | mode_presentation | wind, solar, hybrid, hybrid_solar | YVA-selostusta kirjoitetaan |
| `interludes[2][2]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Tavallinen työpäivä |
| `interludes[2][3]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Havainnekuvat valmistuivat |
| `progress-12` | mode_presentation | wind, solar, hybrid, hybrid_solar | Yleisötilaisuudessa riitti kysymyksiä |
| `contract-callback` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Muut maanomistajat kuulivat poikkeusehdoista |
| `draft-done` | mode_presentation | wind, solar, hybrid, hybrid_solar | Perusteltu päätelmä saapui |
| `draft-done::no-yva` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kaavaluonnoksen palaute saapui |
| `noise-statement` | requires_own_wind | wind, hybrid | Melumoodin takuutieto ei riittänyt |
| `EV-YHTEISASEMA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Yhteisliityntä ei onnistukaan |
| `EV-VERKKO` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Liityntäselvitys valmistui |
| `EV-NAAPURITIETO` | requires_own_wind | wind, hybrid | Naapurihankkeen sijoittelu tarkentui |
| `EV-VAIHTOEHDOT` | requires_own_wind | wind, hybrid | Sääksen lentoreitti tarkistettiin uudelle sijoittelulle |
| `EV-ILMAILU` | requires_own_wind | wind, hybrid | Lentoesteen esiselvitys valmistui |
| `EV-LUONTO` | case_scoped | wind, solar, hybrid, hybrid_solar | Uuden sijoittelun luontoarvio valmistui |
| `EV-KOTKA` | requires_own_wind | wind, hybrid | Maakotkan yhteisvaikutusarvio valmistui |
| `EV-PORO` | case_scoped | wind, solar, hybrid, hybrid_solar | Poronhoidon yhteisvaikutukset arvioitiin |
| `EV-VESI` | case_scoped | wind, solar, hybrid, hybrid_solar | Vesienhallinnan laskelmat valmistuivat |
| `EV-KOSTEIKKO` | requires_own_solar | solar, hybrid, hybrid_solar | Varapalsta osoittautui hyödylliseksi |
| `EV-PALAUTE` | case_scoped | wind, solar, hybrid, hybrid_solar | Palaute ja vastineet käytiin läpi |
| `EV-BESS-VERKKO` | hybrid_bess | hybrid | Akkuvaraston verkkotarkastelu valmistui |
| `EV-BESS-TEKNIIKKA` | hybrid_bess | hybrid | Verkkovaatimusten vastuut saatiin sovittua |
| `external-2` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Verkkoon ei löydy toteuttamiskelpoista liittymää |
| `ext-grid-station` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Verkon vahvistus siirtyi liian kauas |
| `ext-nature-network` | case_scoped | wind, solar, hybrid, hybrid_solar | Metsäpeuran kulkuyhteyttä ei voida väistää |
| `external-golden-full` | case_scoped | wind, solar, hybrid, hybrid_solar | Maakotkan reviirille ei mahdu tätä hanketta |
| `external-herding` | case_scoped | wind, solar, hybrid, hybrid_solar | Laidunkokonaisuus ei kestä lisähaittaa. |
| `transition-3` | mode_presentation | wind, solar, hybrid, hybrid_solar | Kaavaehdotus ja hyväksyntä |
| `feedback` | requires_own_solar | solar, hybrid, hybrid_solar | Paneeliaita katkaisee metsäpeuran reitin |
| `natura` | requires_own_wind | wind, hybrid | Odotetaanko metsäpeuratutkimusta? |
| `leases` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Arvioitu sijoittelu ei ole enää nykyinen |
| `hearing` | case_scoped | wind, solar, hybrid, hybrid_solar | Kuka säilyttää puuston? |
| `proposal` | requires_own_wind | wind, hybrid | Maisema-arviosta puuttuu kylän tärkein näkymä |
| `natura-review` | requires_own_wind | wind, hybrid | Maakotkatutkimus on vielä vertaisarvioinnissa |
| `UUSI-P4-KOTKAPAIKAT` | requires_own_wind | wind, hybrid | Kaksi paikkaa takaisin tarkasteluun? |
| `natura-season` | requires_own_wind | wind, hybrid | Tutkimus tarvitsee vielä yhden vuoden |
| `natura-applicable` | requires_own_wind | wind, hybrid | Hyvä tutkimustulos, eri ympäristö |
| `evidence-joint` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Naapurin uusi sijoittelu muuttaa yhteisvaikutuksia |
| `evidence-natura` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Natura-arviossa on vanha tieverkko |
| `proposal-lake` | requires_own_wind | wind, hybrid | Vastarannalta näkyy enemmän |
| `proposal-village` | requires_own_wind | wind, hybrid | Voimala näkyisi kulttuurimaiseman taustalla |
| `proposal-photo` | requires_own_wind | wind, hybrid | Havainnekuva on otettu puiden takaa |
| `hearing-mitigation` | case_scoped | wind, solar, hybrid, hybrid_solar | Pelkkä seuranta ei riitä tähän päätökseen |
| `hearing-condition` | case_scoped | wind, solar, hybrid, hybrid_solar | Naapurin suojapuusto on menossa hakkuuseen |
| `proposal::solar-base` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelikenttä muuttaisi avoimen peltomaiseman |
| `feedback::noise` | requires_own_wind | wind, hybrid | Hiljaisesta ajotavasta puuttuu takuu |
| `feedback::herding` | requires_own_solar | solar, hybrid, hybrid_solar | Aidan aukko on väärässä kohdassa |
| `UUSI-P4-01` | case_scoped | wind, solar, hybrid, hybrid_solar | Lisäselvityksen tulos on kielteinen |
| `UUSI-P4-02` | requires_own_wind | wind, hybrid | Hiljaisesta ajotavasta puuttuu takuu |
| `UUSI-P4-03` | requires_own_wind | wind, hybrid | Meluraportissa ovat vanhat koordinaatit |
| `UUSI-P4-04` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Asiantuntijan pitäisi poistua kokouksesta |
| `UUSI-P4-05` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaava kumottiin menettelyvirheen vuoksi |
| `UUSI-P4-06` | case_scoped | wind, solar, hybrid, hybrid_solar | Naapurin suojapuusto on menossa hakkuuseen |
| `UUSI-P4-07` | case_scoped | wind, solar, hybrid, hybrid_solar | Ennallistaminen ei poista tämän suon kuivumista |
| `UUSI-P4-08` | case_scoped | wind, solar, hybrid, hybrid_solar | Natura-arvion lähtötiedot muuttuvat |
| `UUSI-P4-09` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Pienempi hanke tuli lähemmäs toista naapuria |
| `UUSI-P4-10` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Uusi valtuusto suhtautuu hankkeeseen varauksella |
| `UUSI-P4-VUOKRAJATKO` | requires_own_wind | wind, hybrid | Maanomistajilta tarvitaan jatkoa |
| `UUSI-P4-11` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Haetaanko muutosta hallinto-oikeuden ratkaisuun? |
| `UUSI-P4-12` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaava hyväksyttiin, lupa-asiat ovat vielä kesken |
| `BESS-P4-01` | hybrid_bess | hybrid | Alustava verkkovastaus ei ollut liittymissopimus |
| `BESS-P4-02` | hybrid_bess | hybrid | Hyväksynnän määräaika lähestyy |
| `BESS-P4-03` | hybrid_bess | hybrid | Akun luvat saatiin, reservikäyttö selvitetään myöhemmin |
| `BESS-P4-04` | hybrid_bess | hybrid | Akku odottaa verkkoa, tuulipuisto voisi jatkaa |
| `BESS-P4-RAJAUS` | hybrid_bess | hybrid | Akulle tarjotaan vain rajattua tehoa |
| `BESS-P4-05` | hybrid_bess | hybrid | Turvallisuustarkastelussa pyydetään toista ratkaisua |
| `BESS-P4-06` | hybrid_bess | hybrid | Akkuosa on luvitettu |
| `EV-OPTIO` | requires_own_wind | wind, hybrid | Vuokrasopimusten jatkosta vastattiin |
| `EV-MAAKUNTAODOTUS` | requires_own_wind | wind, hybrid | Maakuntakaava viivästyy taas |
| `interludes[3][0]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Vastineet valmistuvat |
| `interludes[3][1]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Muutettu hanke esiteltiin kunnalle |
| `interludes[3][2]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Ehdotuksen asiakirjat tarkistettiin |
| `interludes[3][3]` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Viimeiset täydennykset valmistuvat |
| `proposal-review` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavaehdotus valmistellaan päätettäväksi |
| `adoption` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaava hyväksyttiin. |
| `ready` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Hankkeen luvat ovat valmiit |
| `EV-AURINKOLUONTO` | requires_own_solar | solar, hybrid, hybrid_solar | Paneelikentän luontoarvio valmistui |
| `EV-MELU` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Päivitetty meluarvio valmistui |
| `EV-MAISEMA` | case_scoped | wind, solar, hybrid, hybrid_solar | Täydentävä maisema-arvio valmistui |
| `EV-TUTKIMUS` | case_scoped | wind, solar, hybrid, hybrid_solar | Tutkimustiedon vaikutus hankkeeseen selvisi |
| `EV-NATURA` | case_scoped | wind, solar, hybrid, hybrid_solar | Natura-arviosta saatiin lausunto |
| `EV-AJANTASAISUUS` | case_scoped | wind, solar, hybrid, hybrid_solar | Aiemman arvioinnin kattavuus tarkistettiin |
| `EV-LIEVENNYS` | case_scoped | wind, solar, hybrid, hybrid_solar | Suojapuuston säilyttämisestä sovittiin |
| `EV-KORJAUS` | case_scoped | wind, solar, hybrid, hybrid_solar | Korjatun vaihtoehdon arvio valmistui |
| `EV-MENETTELY` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Asiantuntijan läsnäolosta tehtiin valitus |
| `EV-KUULEMINEN` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Ehdotuksen muutos tarvitsee lisäkuulemisen |
| `EV-KUNTA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavaehdotus oli valtuuston käsittelyssä |
| `EV-HYVAKSYNTA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaava on hyväksytty |
| `EV-VALITUS` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaavasta tehty valitus ratkaistiin |
| `EV-LAINVOIMA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Kaava on lainvoimainen |
| `EV-LUVAT` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Hankkeen kaikki tarvittavat luvat on saatu |
| `EV-BESS-TURVA` | hybrid_bess | hybrid | Akkualueen turvallisuussuunnitelma tarkistettiin |
| `external-3` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Rahoittaja vetäytyi. |
| `ext-buyer` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Sähkön ostaja vetäytyi |
| `ext-grid-delivery` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Liittyminen siirtyy liian kauas. |
| `LOPPU-VUOKRA-AIKA` | requires_own_wind | wind, hybrid | Kaava jäi odottamaan. Sopimukset eivät riittäneet. |
| `LOPPU-VOITTO` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Hanke on luvitettu |
| `LOPPU-VALINTA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Ratkaisematon ongelma pysäytti hankkeen |
| `LOPPU-LAAJUUS` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Jäljelle jäi liian pieni hanke |
| `LOPPU-ULKOINEN` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Hankkeelle ei löytynyt jatkomahdollisuutta |
| `LOPPU-OMISTAJA` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Omistaja lopettaa hankkeen kehityksen |
| `PISTEET` | shared_requires_rule_audit | wind, solar, hybrid, hybrid_solar | Mitä hankkeesta jäi käteen? |

## Luovutettava runtime-auditointiraportti

Tee jokaisesta ID:stä jokaiselle kandidaatille tieto: sallittu/estetty ja syy, tekstiversio, rule/spec, lähteen hankeosa, kaikki mahdolliset tuloshaarat, kuvitus sekä positiivinen ja negatiivinen testitunniste. `unknown` ei saa oletuksena sallia korttia. Jos tarkoituksella estetty vanha aihe aiheuttaa tyhjän jatkon, korjaa alkukortin kelpoisuus tai kirjoitettu lähdesidonnainen vaihtoehto; älä avaa väärän moodin tapahtumaa täytteeksi. Lisää myös tämän paketin jälkeen paikallisesti syntyneet ID:t auditointiin.
