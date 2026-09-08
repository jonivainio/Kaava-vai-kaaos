# Sisältökattavuuden tarkistuslista — v5

Tämä indeksi on johdettu mukana olevasta käsikirjoituksesta. Se ei lisää tapahtumaketjuja eikä määrää korttien ajoitusta. Kaikkien 248 tunnisteen pitää löytyä toteutuksen kohdistusraportista, mutta kaikkia ei näytetä yhdessä pelikerrassa.

**Käsikirjoitus:** `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md`
**SHA-256:** `03ae272389667c41412e8fef7a86f091db147aa72fbe6907a54b79661d3003f2`

**Lähtötila:** rivejä ei ole vielä tarkistettu pelin toteutusta vasten. Lähdeviittaukset ja nimet ovat navigointia varten, eivät pelaajalle lisättävää tekstiä.

Codex luo erillisen toteutusraportin: sourceId → runtimeId → tila → haarojen testit → kuvitus → näyttö. Tiloja voivat olla INTEGRATED_TESTED, PENDING, BLOCKED, SOURCE_ONLY_MODE_LOCKED tai ALIAS_TESTED. Kumpikaan viimeisestä ei saa peittää pelattavaan hybridiin kuuluvaa puutetta.

## Vaihe 1: Maanvuokraus

| Tunniste | Laji | Otsikko | Käsikirjoituksen rivit |
|---|---|---|---|
| `start` | Tapahtuma | Uusi hanke | 38–56 |
| `land` | Päätös | Kovia vaatimuksia | 62–113 |
| `road` | Päätös | Väärä karttaliite | 117–153 |
| `land-signing` | Päätös | Allekirjoituksesta lisähinta | 157–208 |
| `land-index` | Päätös | Inflaatio on kaikille sama. Indeksi ei olisi. | 212–263 |
| `land-minimum` | Päätös | Heikollakin tuulella on kuukausimaksu. | 267–318 |
| `land-map-versions` | Päätös | Allekirjoitus tuli. Sopimus ei. | 322–362 |
| `land-area-explained` | Päätös | Missä minun voimalani on? | 366–404 |
| `UUSI-P1-MAARIITA` | Päätös | Sopimuksesta ei päästä sopuun | 408–446 |
| `land-meetings` | Päätös | Kaikkia ei saa samaan iltaan | 450–482 |
| `UUSI-P1-01` | Päätös | Yksi vastaus kuudelta omistajalta | 486–520 |
| `UUSI-P1-03` | Päätös | Kuinka kauan odotetaan? | 524–564 |
| `UUSI-P1-04` | Päätös | Yhteinen johto, pienempi lasku | 568–608 |
| `UUSI-P1-05` | Päätös | Tämä maa onkin jo vuokrattu | 612–650 |
| `UUSI-P1-06` | Päätös | Märkä palsta kaupan | 654–694 |
| `UUSI-P1-07` | Päätös | Tie ei ole vielä sovittu | 698–732 |
| `UUSI-P1-08` | Päätös | Maata saa vuokrata. Voimalaa ei saa rakentaa. | 736–772 |
| `UUSI-P1-09` | Päätös | Mihin ensimmäiset selvitysrahat käytetään? | 776–816 |
| `BESS-P1-01` | Päätös | Tuulisopimus ei mainitse akkua. | 820–858 |
| `BESS-P1-02` | Päätös | Akku mahtuu. Huoltotie ei. | 862–894 |
| `BESS-P1-03` | Päätös | Halpa akkutontti tulvii | 898–932 |
| `interludes[0][0]` | Tapahtuma | Sopimuksia saatiin lisää | 938–956 |
| `land-done` | Tapahtuma | Maat vuokrattu | 960–982 |
| `EV-MAA` | Tapahtuma | Vuokraneuvottelun tulos | 986–1019 |
| `EV-SOPIMUSSIVUT` | Tapahtuma | Puuttuvat sopimussivut | 1023–1053 |
| `EV-VOIMALALUPAUS` | Tapahtuma | Maanomistajan vaatimus käsiteltiin | 1057–1093 |
| `external-0` | Tapahtuma | Yhtiö lopettaa hankekehityksen. | 1097–1117 |
| `ext-land-owner` | Tapahtuma | Portfolio supistuu | 1121–1141 |
| `ext-land-use` | Tapahtuma | Kaavoitusmonopolia | 1145–1165 |

## Vaihe 2: Kaava-aloite ja YVA-ohjelma

| Tunniste | Laji | Otsikko | Käsikirjoituksen rivit |
|---|---|---|---|
| `transition-1` | Tapahtuma | Kaava-aloite ja YVA-ohjelma | 1176–1196 |
| `defence` | Päätös | Puolustusvoimien lausunto | 1202–1240 |
| `surveys` | Päätös | Halvempi tarjous sisältää uuden kevään. | 1244–1284 |
| `research` | Päätös | Rahoitetaanko seurantaa? | 1288–1326 |
| `initiative-rumour` | Päätös | Kylällä kiertää väärä kartta | 1330–1364 |
| `initiative-council` | Päätös | Uusi valtuusto haluaa uuden esittelyn | 1368–1402 |
| `initiative-cottage` | Päätös | Mökkiläiset tulevat vasta kesällä | 1406–1440 |
| `surveys-spring` | Päätös | YVA-konsultti on valittava. | 1444–1484 |
| `surveys-access` | Päätös | Kilpailutus toi kaksi aikataulua. | 1488–1528 |
| `surveys-team` | Päätös | Vapaa tiimi maksaa enemmän. | 1532–1572 |
| `research-gps` | Päätös | Lisää paikannusaineistoa | 1576–1614 |
| `research-cumulative` | Päätös | Yhteistutkimus hankkeiden vaikutuksista | 1618–1656 |
| `research-seasons` | Päätös | Seuranta tarvitsee yhden kauden lisää | 1660–1698 |
| `programme-birds` | Päätös | Lintuyhdistyksellä on lisähavaintoja | 1702–1736 |
| `programme-range` | Päätös | Seurantaa pyydetään hankealueen ulkopuolelta | 1740–1774 |
| `herding-programme` | Päätös | Paliskunnan aineisto puuttuu | 1778–1812 |
| `programme-cumulative` | Päätös | Yhteisvaikutuksiin tuli kolme hanketta lisää | 1816–1850 |
| `UUSI-P2-01` | Päätös | Yhdeksän voimalaa ei riitä kevennykseksi | 1854–1886 |
| `UUSI-P2-02` | Päätös | Kolme vaihtoehtoa, samat ongelmapaikat | 1890–1924 |
| `UUSI-P2-03` | Päätös | Hanke odottaa maakuntakaavaa | 1928–1966 |
| `UUSI-P2-04` | Päätös | Mihin hanke liitetään? | 1970–2010 |
| `UUSI-P2-05` | Päätös | Puolustusvoimien huomio koskeekin johtoa | 2014–2048 |
| `UUSI-P2-06` | Päätös | Kaavaluonnos valmistellaan vasta päätelmän jälkeen | 2052–2084 |
| `UUSI-P2-07` | Päätös | Metsäpeurat liikkuvat Natura-alueiden välillä | 2088–2122 |
| `UUSI-P2-08` | Päätös | Korkeampi voimala tarvitsee uuden tarkistuksen | 2126–2160 |
| `UUSI-P2-09` | Päätös | Sammakkokäynti osui liian kylmään iltaan | 2164–2198 |
| `UUSI-P2-10` | Päätös | Pesäkarttaa ei voi laittaa yleisön nähtäville | 2202–2234 |
| `UUSI-P2-11` | Päätös | Naapurihanke julkistettiin viikkoa myöhemmin | 2238–2272 |
| `UUSI-P2-12` | Päätös | Työohjelmasta päästiin sopuun | 2276–2308 |
| `BESS-P2-01` | Päätös | Akku tarvitsee sähköä myös sisäänpäin | 2312–2346 |
| `BESS-P2-02` | Päätös | Sama megawatti, eri määrä energiaa | 2350–2382 |
| `BESS-P2-03` | Päätös | Toimittajan mukaan kyse on vain kontista | 2386–2418 |
| `BESS-P2-04` | Päätös | Lisätään tähän vielä akku | 2422–2454 |
| `BESS-P2-05` | Päätös | Verkkovaatimusten aineisto puuttuu tarjouksesta | 2458–2492 |
| `interludes[1][0]` | Tapahtuma | Hanke esiteltiin kunnalle | 2498–2516 |
| `interludes[1][1]` | Tapahtuma | YVA-ohjelmaa viimeistellään | 2520–2538 |
| `interludes[1][2]` | Tapahtuma | Selvityksiä on käynnissä | 2542–2560 |
| `interludes[1][3]` | Tapahtuma | Ohjelmavaiheen yleisötilaisuus pidettiin | 2564–2582 |
| `surveys-wait` | Tapahtuma | Maastoselvitykset käynnistyvät | 2586–2604 |
| `surveys-wait::no-yva` | Tapahtuma | Vaikutukset selvitetään silti. | 2608–2626 |
| `EV-MAARIITA` | Tapahtuma | Vuokrasopimuksen riitaan ratkaisu | 2630–2658 |
| `EV-ETUSIJA` | Tapahtuma | Etusijasta saatiin vastaus | 2662–2692 |
| `EV-SELVITYSJARJESTYS` | Tapahtuma | Ensimmäinen selvityserä valmistui | 2696–2732 |
| `EV-MAASTOKAUSI` | Tapahtuma | Uuden maastokäynnin tulos | 2736–2767 |
| `EV-PV` | Tapahtuma | Puolustusvoimilta tuli vastaus | 2771–2807 |
| `EV-VTT-TULOS` | Tapahtuma | Tutkavaikutusselvityksestä lopullinen kanta | 2811–2844 |
| `external-1` | Tapahtuma | Kunta sanoi ei. | 2848–2866 |
| `ext-initiative-priority` | Tapahtuma | Kaavoitus ei käynnisty. | 2870–2888 |
| `ext-initiative-owner` | Tapahtuma | Omistajan strategia vaihtui. | 2892–2910 |

## Vaihe 3: YVA-selostus ja kaavaluonnos

| Tunniste | Laji | Otsikko | Käsikirjoituksen rivit |
|---|---|---|---|
| `transition-2` | Tapahtuma | YVA-selostus ja kaavaluonnos | 2921–2939 |
| `nature` | Päätös | Sääksi lentää voimalapaikkojen kautta | 2945–2983 |
| `solarNature` | Päätös | Viitasammakot löytyivät vanhasta altaasta | 2987–3029 |
| `UUSI-P3-KOSTEIKKO` | Päätös | Märälle palstalle löytyi käyttöä | 3033–3073 |
| `noise` | Päätös | Yhteismelu ylittää ohjearvon | 3077–3117 |
| `height` | Päätös | Maanpinnan korkeus unohtui | 3121–3157 |
| `solarWater` | Päätös | Vesienkäsittely ei päättynyt turvetuotannon mukana | 3161–3197 |
| `opinions` | Päätös | Havainnekuva puuttuu kylätieltä | 3201–3235 |
| `golden-known` | Päätös | Maakotkan säännöllinen lentoreitti | 3239–3279 |
| `golden-unknown` | Päätös | Kotka näkyy, pesää ei löydy | 3283–3323 |
| `golden-shared` | Päätös | Naapurin kotka olikin sama kotka | 3327–3367 |
| `nature-reindeer-calving` | Päätös | Metsäpeuran vasomisalue löytyi sijoittelusta | 3371–3405 |
| `nature-reindeer-route` | Päätös | Voimalat katkaisisivat metsäpeuran kulkuyhteyden | 3409–3443 |
| `nature-squirrel` | Päätös | Pesäpuu säästyy. Kulkuyhteys ei. | 3447–3481 |
| `nature-bird-area` | Päätös | Pelto osoittautui tärkeäksi levähdysalueeksi | 3485–3519 |
| `herding-pasture` | Päätös | Laidunten välinen kulku kapenee | 3523–3557 |
| `noise-neighbour-model` | Päätös | Naapuri vaihtoi voimalamallia | 3561–3601 |
| `noise-neighbour-layout` | Päätös | Naapuri siirsi voimalansa lähemmäs | 3605–3645 |
| `noise-joint` | Päätös | Erilliset melukartat eivät riittäneet | 3649–3689 |
| `height-ground` | Päätös | Korkeusmalli muutti tulosta | 3693–3729 |
| `height-approach` | Päätös | Voimalapaikat osuvat lähestymissuuntaan | 3733–3769 |
| `height-ridge` | Päätös | Tuulisin harjanne on ilmailulle hankalin | 3773–3809 |
| `solar-nest-water` | Päätös | Turvetuotanto loppui, linnut tulivat | 3813–3849 |
| `solar-frog-basin` | Päätös | Allas piti kuivata. Siellä lisääntyy viitasammakko. | 3853–3895 |
| `solar-required-wetland` | Päätös | Vesienhallinta vie paneelialaa | 3899–3933 |
| `solar-postcare` | Päätös | Jälkihoito tarvitsee edelleen altaat | 3937–3973 |
| `opinions-photo` | Päätös | Asukkaan piha ei näy havainnekuvissa | 3977–4011 |
| `opinions-club` | Päätös | Yhdistyksen kartassa on uusi lajipiste | 4015–4049 |
| `opinions-noise` | Päätös | Sama melukysymys sadassa viestissä | 4053–4087 |
| `herding-opinions` | Päätös | Paneeliaita osuu laidunreitille | 4091–4125 |
| `solar-pond` | Päätös | Kevät paljasti viitasammakon lisääntymispaikan | 4129–4171 |
| `solar-ditch` | Päätös | Oja tuo veden lisääntymislammikkoon | 4175–4217 |
| `solar-water` | Päätös | Kuivatus ulottuu lisääntymispaikalle | 4221–4263 |
| `solar-squirrel` | Päätös | Paneelialue katkaisisi liito-oravan yhteyden | 4267–4301 |
| `solar-bird-area` | Päätös | Paneelit osuvat muuttolintujen levähdysalueelle | 4305–4341 |
| `solar-view-road` | Päätös | Paneelit näkyisivät suoraan naapurin olohuoneeseen | 4345–4381 |
| `solar-view-winter` | Päätös | Talvikuva näytti enemmän. | 4385–4421 |
| `solar-view-edge` | Päätös | Puusto oli luvattu kuvassa. | 4425–4461 |
| `solar-rain` | Päätös | Sadevesi valuu naapurin pellolle | 4465–4501 |
| `solar-drain` | Päätös | Alapuolinen oja on jo täynnä | 4505–4541 |
| `solar-snow` | Päätös | Sulamisvesi kerääntyy paneelikentälle | 4545–4581 |
| `nature::solar-base` | Päätös | Kevät paljasti viitasammakon lisääntymispaikan | 4585–4627 |
| `noise::solar-base` | Päätös | Paneelit näkyisivät suoraan naapurin olohuoneeseen | 4631–4667 |
| `height::solar-base` | Päätös | Sadevesi valuu naapurin pellolle | 4671–4707 |
| `solarNature::wind` | Päätös | Voimalan siirto ei siirtänyt huoltotietä | 4711–4747 |
| `solarWater::wind` | Päätös | Voimajohdon rakentaminen voi kuivattaa Natura-suota | 4751–4787 |
| `UUSI-P3-01` | Päätös | Selostus sai kiitosta. Hanke ei. | 4791–4825 |
| `UUSI-P3-02` | Päätös | Kesähavainnot muuttivat metsäpeurakuvaa | 4829–4863 |
| `UUSI-P3-03` | Päätös | Vanha turvekenttä on muuttunut kosteikoksi | 4867–4903 |
| `UUSI-P3-04` | Päätös | Maakotkan reviirillä on jo kolme hanketta | 4907–4943 |
| `UUSI-P3-05` | Päätös | Voimalan siirto ei siirtänyt huoltotietä | 4947–4983 |
| `UUSI-P3-06` | Päätös | Alempi paneelipaikka kerää sadevedet | 4987–5021 |
| `UUSI-P3-07` | Päätös | Huoltotien kohdalta löytyi tervahauta | 5025–5057 |
| `UUSI-P3-08` | Päätös | Lepakkohavainnot keskittyvät loppukesän öihin | 5061–5095 |
| `UUSI-P3-09` | Päätös | Talvella voimalat näkyvät enemmän | 5099–5131 |
| `UUSI-P3-10` | Päätös | Yömelu puuttui vertailusta | 5135–5171 |
| `UUSI-P3-11` | Päätös | Kuulemiseen tuli myös Ruotsi | 5175–5207 |
| `UUSI-P3-12` | Päätös | Porojen talvilaitumelle ei enää päästä | 5211–5245 |
| `UUSI-P3-13` | Päätös | Voimajohdon rakentaminen voi kuivattaa Natura-suota | 5249–5285 |
| `UUSI-P3-14` | Päätös | Lisäselvitys vapautti kaksi voimalapaikkaa | 5289–5325 |
| `P3-SOPIMUS` | Päätös | Poikkeuksesta halutaan yhteinen käytäntö | 5329–5365 |
| `BESS-P3-01` | Päätös | Jäähdytys kuuluu naapuriin | 5369–5401 |
| `BESS-P3-02` | Päätös | Paloturvallisuutta ei voi arvioida myyntiesitteestä | 5405–5439 |
| `BESS-P3-03` | Päätös | Häiriötilanteen vedet pääsisivät ojaan | 5443–5477 |
| `BESS-P3-04` | Päätös | Laiterivi tukki kulun | 5481–5513 |
| `BESS-P3-05` | Päätös | Yhteinen liittymä ei kata molempien huipputehoa | 5517–5551 |
| `BESS-P3-06` | Päätös | Reservitulo on laskelmassa joka vuosi sama | 5555–5587 |
| `BESS-P3-07` | Päätös | Uusi akku tarvitsee eri asemapiirroksen | 5591–5625 |
| `interludes[2][0]` | Tapahtuma | Kaavaluonnos valmistuu | 5631–5649 |
| `interludes[2][1]` | Tapahtuma | YVA-selostusta kirjoitetaan | 5653–5671 |
| `interludes[2][2]` | Tapahtuma | Tavallinen työpäivä | 5675–5693 |
| `interludes[2][3]` | Tapahtuma | Havainnekuvat valmistuivat | 5697–5715 |
| `progress-12` | Tapahtuma | Yleisötilaisuudessa riitti kysymyksiä | 5719–5737 |
| `contract-callback` | Tapahtuma | Muut maanomistajat kuulivat poikkeusehdoista | 5741–5763 |
| `draft-done` | Tapahtuma | Perusteltu päätelmä saapui | 5767–5789 |
| `draft-done::no-yva` | Tapahtuma | Kaavaluonnoksen palaute saapui | 5793–5811 |
| `noise-statement` | Tapahtuma | Melumoodin takuutieto ei riittänyt | 5815–5837 |
| `EV-YHTEISASEMA` | Tapahtuma | Yhteisliityntä ei onnistukaan | 5841–5865 |
| `EV-VERKKO` | Tapahtuma | Liityntäselvitys valmistui | 5869–5905 |
| `EV-NAAPURITIETO` | Tapahtuma | Naapurihankkeen sijoittelu tarkentui | 5909–5937 |
| `EV-VAIHTOEHDOT` | Tapahtuma | Sääksen lentoreitti tarkistettiin uudelle sijoittelulle | 5941–5971 |
| `EV-ILMAILU` | Tapahtuma | Lentoesteen esiselvitys valmistui | 5975–6011 |
| `EV-LUONTO` | Tapahtuma | Uuden sijoittelun luontoarvio valmistui | 6015–6083 |
| `EV-KOTKA` | Tapahtuma | Maakotkan yhteisvaikutusarvio valmistui | 6087–6125 |
| `EV-PORO` | Tapahtuma | Poronhoidon yhteisvaikutukset arvioitiin | 6129–6159 |
| `EV-VESI` | Tapahtuma | Vesienhallinnan laskelmat valmistuivat | 6163–6197 |
| `EV-KOSTEIKKO` | Tapahtuma | Varapalsta osoittautui hyödylliseksi | 6201–6221 |
| `EV-PALAUTE` | Tapahtuma | Palaute ja vastineet käytiin läpi | 6225–6267 |
| `EV-BESS-VERKKO` | Tapahtuma | Akkuvaraston verkkotarkastelu valmistui | 6271–6304 |
| `EV-BESS-TEKNIIKKA` | Tapahtuma | Verkkovaatimusten vastuut saatiin sovittua | 6308–6326 |
| `external-2` | Tapahtuma | Verkkoon ei löydy toteuttamiskelpoista liittymää | 6330–6348 |
| `ext-grid-station` | Tapahtuma | Verkon vahvistus siirtyi liian kauas | 6352–6370 |
| `ext-nature-network` | Tapahtuma | Metsäpeuran kulkuyhteyttä ei voida väistää | 6374–6392 |
| `external-golden-full` | Tapahtuma | Maakotkan reviirille ei mahdu tätä hanketta | 6396–6414 |
| `external-herding` | Tapahtuma | Laidunkokonaisuus ei kestä lisähaittaa. | 6418–6436 |

## Vaihe 4: Kaavaehdotus ja kaavan hyväksyntä

| Tunniste | Laji | Otsikko | Käsikirjoituksen rivit |
|---|---|---|---|
| `transition-3` | Tapahtuma | Kaavaehdotus ja hyväksyntä | 6447–6465 |
| `feedback` | Päätös | Paneeliaita katkaisee metsäpeuran reitin | 6471–6505 |
| `natura` | Päätös | Odotetaanko metsäpeuratutkimusta? | 6509–6549 |
| `leases` | Päätös | Arvioitu sijoittelu ei ole enää nykyinen | 6553–6593 |
| `hearing` | Päätös | Kuka säilyttää puuston? | 6597–6633 |
| `proposal` | Päätös | Maisema-arviosta puuttuu kylän tärkein näkymä | 6637–6673 |
| `natura-review` | Päätös | Maakotkatutkimus on vielä vertaisarvioinnissa | 6677–6713 |
| `UUSI-P4-KOTKAPAIKAT` | Päätös | Kaksi paikkaa takaisin tarkasteluun? | 6717–6757 |
| `natura-season` | Päätös | Tutkimus tarvitsee vielä yhden vuoden | 6761–6797 |
| `natura-applicable` | Päätös | Hyvä tutkimustulos, eri ympäristö | 6801–6837 |
| `evidence-joint` | Päätös | Naapurin uusi sijoittelu muuttaa yhteisvaikutuksia | 6841–6881 |
| `evidence-natura` | Päätös | Natura-arviossa on vanha tieverkko | 6885–6925 |
| `proposal-lake` | Päätös | Vastarannalta näkyy enemmän | 6929–6965 |
| `proposal-village` | Päätös | Voimala näkyisi kulttuurimaiseman taustalla | 6969–7005 |
| `proposal-photo` | Päätös | Havainnekuva on otettu puiden takaa | 7009–7045 |
| `hearing-mitigation` | Päätös | Pelkkä seuranta ei riitä tähän päätökseen | 7049–7083 |
| `hearing-condition` | Päätös | Naapurin suojapuusto on menossa hakkuuseen | 7087–7123 |
| `proposal::solar-base` | Päätös | Paneelikenttä muuttaisi avoimen peltomaiseman | 7127–7161 |
| `feedback::noise` | Päätös | Hiljaisesta ajotavasta puuttuu takuu | 7165–7201 |
| `feedback::herding` | Päätös | Aidan aukko on väärässä kohdassa | 7205–7239 |
| `UUSI-P4-01` | Päätös | Lisäselvityksen tulos on kielteinen | 7243–7281 |
| `UUSI-P4-02` | Päätös | Hiljaisesta ajotavasta puuttuu takuu | 7285–7321 |
| `UUSI-P4-03` | Päätös | Meluraportissa ovat vanhat koordinaatit | 7325–7359 |
| `UUSI-P4-04` | Päätös | Asiantuntijan pitäisi poistua kokouksesta | 7363–7397 |
| `UUSI-P4-05` | Päätös | Kaava kumottiin menettelyvirheen vuoksi | 7401–7439 |
| `UUSI-P4-06` | Päätös | Naapurin suojapuusto on menossa hakkuuseen | 7443–7479 |
| `UUSI-P4-07` | Päätös | Ennallistaminen ei poista tämän suon kuivumista | 7483–7517 |
| `UUSI-P4-08` | Päätös | Natura-arvion lähtötiedot muuttuvat | 7521–7555 |
| `UUSI-P4-09` | Päätös | Pienempi hanke tuli lähemmäs toista naapuria | 7559–7593 |
| `UUSI-P4-10` | Päätös | Uusi valtuusto suhtautuu hankkeeseen varauksella | 7597–7631 |
| `UUSI-P4-VUOKRAJATKO` | Päätös | Maanomistajilta tarvitaan jatkoa | 7635–7675 |
| `UUSI-P4-11` | Päätös | Haetaanko muutosta hallinto-oikeuden ratkaisuun? | 7679–7713 |
| `UUSI-P4-12` | Päätös | Kaava hyväksyttiin, lupa-asiat ovat vielä kesken | 7717–7751 |
| `BESS-P4-01` | Päätös | Alustava verkkovastaus ei ollut liittymissopimus | 7755–7787 |
| `BESS-P4-02` | Päätös | Hyväksynnän määräaika lähestyy | 7791–7823 |
| `BESS-P4-03` | Päätös | Akun luvat saatiin, reservikäyttö selvitetään myöhemmin | 7827–7859 |
| `BESS-P4-04` | Päätös | Akku odottaa verkkoa, tuulipuisto voisi jatkaa | 7863–7895 |
| `BESS-P4-RAJAUS` | Päätös | Akulle tarjotaan vain rajattua tehoa | 7899–7935 |
| `BESS-P4-05` | Päätös | Turvallisuustarkastelussa pyydetään toista ratkaisua | 7939–7971 |
| `BESS-P4-06` | Päätös | Akkuosa on luvitettu | 7975–8007 |
| `EV-OPTIO` | Tapahtuma | Vuokrasopimusten jatkosta vastattiin | 8013–8046 |
| `EV-MAAKUNTAODOTUS` | Tapahtuma | Maakuntakaava viivästyy taas | 8050–8072 |
| `interludes[3][0]` | Tapahtuma | Vastineet valmistuvat | 8076–8094 |
| `interludes[3][1]` | Tapahtuma | Muutettu hanke esiteltiin kunnalle | 8098–8116 |
| `interludes[3][2]` | Tapahtuma | Ehdotuksen asiakirjat tarkistettiin | 8120–8138 |
| `interludes[3][3]` | Tapahtuma | Viimeiset täydennykset valmistuvat | 8142–8160 |
| `proposal-review` | Tapahtuma | Kaavaehdotus valmistellaan päätettäväksi | 8164–8182 |
| `adoption` | Tapahtuma | Kaava hyväksyttiin. | 8186–8208 |
| `ready` | Tapahtuma | Hankkeen luvat ovat valmiit | 8212–8234 |
| `EV-AURINKOLUONTO` | Tapahtuma | Paneelikentän luontoarvio valmistui | 8238–8282 |
| `EV-MELU` | Tapahtuma | Päivitetty meluarvio valmistui | 8286–8336 |
| `EV-MAISEMA` | Tapahtuma | Täydentävä maisema-arvio valmistui | 8340–8374 |
| `EV-TUTKIMUS` | Tapahtuma | Tutkimustiedon vaikutus hankkeeseen selvisi | 8378–8437 |
| `EV-NATURA` | Tapahtuma | Natura-arviosta saatiin lausunto | 8441–8485 |
| `EV-AJANTASAISUUS` | Tapahtuma | Aiemman arvioinnin kattavuus tarkistettiin | 8489–8520 |
| `EV-LIEVENNYS` | Tapahtuma | Suojapuuston säilyttämisestä sovittiin | 8524–8544 |
| `EV-KORJAUS` | Tapahtuma | Korjatun vaihtoehdon arvio valmistui | 8548–8583 |
| `EV-MENETTELY` | Tapahtuma | Asiantuntijan läsnäolosta tehtiin valitus | 8587–8609 |
| `EV-KUULEMINEN` | Tapahtuma | Ehdotuksen muutos tarvitsee lisäkuulemisen | 8613–8633 |
| `EV-KUNTA` | Tapahtuma | Kaavaehdotus oli valtuuston käsittelyssä | 8637–8670 |
| `EV-HYVAKSYNTA` | Tapahtuma | Kaava on hyväksytty | 8674–8696 |
| `EV-VALITUS` | Tapahtuma | Kaavasta tehty valitus ratkaistiin | 8700–8742 |
| `EV-LAINVOIMA` | Tapahtuma | Kaava on lainvoimainen | 8746–8768 |
| `EV-LUVAT` | Tapahtuma | Hankkeen kaikki tarvittavat luvat on saatu | 8772–8794 |
| `EV-BESS-TURVA` | Tapahtuma | Akkualueen turvallisuussuunnitelma tarkistettiin | 8798–8840 |
| `external-3` | Tapahtuma | Rahoittaja vetäytyi. | 8844–8862 |
| `ext-buyer` | Tapahtuma | Sähkön ostaja vetäytyi | 8866–8884 |
| `ext-grid-delivery` | Tapahtuma | Liittyminen siirtyy liian kauas. | 8888–8906 |
| `LOPPU-VUOKRA-AIKA` | Tapahtuma | Kaava jäi odottamaan. Sopimukset eivät riittäneet. | 8910–8930 |
| `LOPPU-VOITTO` | Tapahtuma | Hanke on luvitettu | 8934–8956 |
| `LOPPU-VALINTA` | Tapahtuma | Ratkaisematon ongelma pysäytti hankkeen | 8960–8980 |
| `LOPPU-LAAJUUS` | Tapahtuma | Jäljelle jäi liian pieni hanke | 8984–9002 |
| `LOPPU-ULKOINEN` | Tapahtuma | Hankkeelle ei löytynyt jatkomahdollisuutta | 9006–9024 |
| `LOPPU-OMISTAJA` | Tapahtuma | Omistaja lopettaa hankkeen kehityksen | 9028–9046 |
| `PISTEET` | Tapahtuma | Mitä hankkeesta jäi käteen? | 9050–9070 |

## Poistetut aktiiviset sisällöt

`UUSI-P1-02`, `UUSI-P1-10`, `BESS-P1-04`, `initiative`, `programme`

Poisto tarkoittaa näiden sisältöjen poistamista aktiivisista valintapooleista ja vanhoista pakotetuista askelista. Kaava-aloite ja YVA-ohjelma jäävät menettelyvaiheiksi. Vanhat pilotit ja käyttäjän varmuuskopiot säilytetään.
