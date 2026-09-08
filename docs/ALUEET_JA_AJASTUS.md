# Alueet ja seurausten ajankohdat — 8.9.2026

Sisältöversio swipe-fi-007. Käyttäjän pyytämä nelijako on piilotettu fiktiivinen skenaarioprofiili, ei todellisen hankkeen sijainti tai riskitilasto. Nimi ei sisällä aluevihjettä. Maailmantiedot, alue ja kohtaamisindeksit tallennetaan; nimiarvonta on erillinen.

## Lähteistä pelisäännöiksi

- **Länsi:** maakotkan reviirit ja metsäpeura ovat mahdollisia etenkin Suomenselän ympäristössä. Pelissä painottuvat lisäksi naapurihankkeiden yhteisvaikutukset ja entisten turvealueiden jälkihoito. Länsi ei tarkoita, että jokainen paikka olisi kotkareviiri tai turvekenttä. Yhteisvaikutusten ja jälkihoidon aiheiden tausta on aiemmassa [sisältöauditoinnissa](SISALTOAUDITOINTI_2026-09-08.md).
- **Keski:** metsäpeura Suomenselän ympäristössä, liito-oravan yhteydet, järvimaiseman ja asutuksen vaikutukset. Ympäristöhallinto kuvaa liito-oravan ja viitasammakon esiintyvän Keski-Suomessa verrattain yleisinä; esiintyminen pitää silti selvittää paikkakohtaisesti. [Luonnon monimuotoisuus – Keski-Suomi](https://www.ymparisto.fi/fi/luonto-vesistot-ja-meri/luonnon-monimuotoisuus/luonnon-monimuotoisuus-keski-suomi).
- **Itä:** Puolustusvoimien aluevalvonnan yhteensovitus painottuu. Se ei tarkoita automaattista kielteistä lausuntoa: ministeriöiden 8.4.2026 tiedote käsittelee myös jo hyväksyttyjä hankkeita. Metsäpeuran skenaariot edustavat Kainuun ympäristöä, järvimaisemat muita itäisiä ympäristöjä. [Ministeriöiden tiedote](https://valtioneuvosto.fi/-/236553176/itaisen-suomen-tuulivoimarakentamista-edistetaan-turvallisuus-huomioiden), [Luken metsäpeuraseuranta](https://www.luke.fi/fi/luonnonvaratieto/tiedetta-ja-tietoa/metsapeuran-kantaarvio-ja-seuranta).
- **Lappi:** poronhoidon laidunkierto, yhteydet ja kumuloituvat maankäyttöhaitat sekä maakotka. Pelin aurinkohankkeet kuvaavat metsäisen Lapin mahdollisia ympäristöjä, eivät tunturiylänköjä. Metsäpeura- ja liito-oravakortit eivät kuulu tähän profiiliin. Poronhoidon todellinen alue ulottuu myös Pohjois-Pohjanmaalle ja Kainuuseen eikä kata Kemi–Tornion aluetta; pelin nelijako on tätä karkeampi. [Poronhoitoalue](https://paliskunnat.fi/poro/poronhoito/), [maankäytön vaikutukset](https://paliskunnat.fi/py/neuvonta/maankaytto/).

Maakotkaa ei rajata vain länteen. Metsähallituksen ajantasaisen kuvauksen mukaan 82 % tunnetuista reviireistä on poronhoitoalueella. Pelissä maakotkakohtaamiset painottuvat lännen Suomenselkä-tyyppiseen ympäristöön ja Lappiin, mutta niitä voi esiintyä myös muissa profiileissa. [Metsähallitus: maakotka](https://www.metsa.fi/suojelu-ja-hoito/lajien-suojelu/maakotka/).

Painot src/game/regions.ts: poronhoitokortti 5 Lapissa ja 0 muualla; metsäpeura 3 lännessä/keskellä, 2 idässä ja 0 Lapissa; maakotka 4 lännessä/Lapissa ja 1 muualla. Nämä ovat toimituksellisia pelipainoja. Puolustusvoimien suoran myönteisen haaran pelitodennäköisyys on länsi 70 %, keski 55 %, Lappi 40 %, itä 15 % ennen erikseen arvottua ulkoista estettä. Ulkoisen esteen kokonaisarvonta säilyy 1/3:ssa; alue muuttaa syiden jakaumaa, ei määrää hanketta automaattisesti häviämään.

## Vaihejärjestys

Ympäristöhallinnon yhteismenettelykuvaus erottaa ohjelman, selostuksen ja valmisteluaineiston kuulemisen, yhteysviranomaisen perustellun päätelmän sekä näihin pohjautuvan kaavaehdotuksen. Pelissä rytmi seuraa tätä järjestystä; lakisääteisiä määräaikoja ei simuloida kokonaisuudessaan. [YVA ja kaavoitus yhteismenettelynä](https://www.ymparisto.fi/fi/rakennettu-ymparisto/kaavoitus-ja-alueidenkaytto/yva-ja-kaavoitus-yhteismenettelyna).

| Valinta tai tieto | Milloin näkyy |
|---|---|
| Maanomistajan vastaus, sovittu rajaus, konsultin tilaus | Heti päätöksen jälkeen |
| VTT:n työ ja lentoesteen esiselvitys | Työn valmistuttua; eivät ole kaavahyväksyntöjä |
| Luontosijoittelun riittävyys, vesitalouden arvio, paikallisen palautteen lisäkäsittely | Selostuksen kuulemisen ja perustellun päätelmän yhteydessä |
| Melumoodin takuuaineiston puute | Päätelmän yhteydessä; ratkaisukortti vasta ehdotusvaiheessa |
| Aurinkoalueen luontoratkaisu / viitasammakon poikkeuslupa | Ehdotusvaiheen käsittelyssä ennen kaavapäätöstä |
| Natura-täydennyksen ja muuttuneen vaikutusarvion riittävyys | Ehdotuksen päätösaineiston tarkistuksessa |
| Yleinen tutkimus | Ehdotusvaiheessa odotettaessa tai viimeistään ennen hyväksymistä |

Natura-täydennyksen tarpeen konkreettinen tausta on aiemman auditoinnin YVA-päätelmä- ja Natura-lausuntoaineistossa. YVA ei myönnä poikkeuslupaa eikä hyväksy kaavaa. Linnustoarvion täydennys ja viitasammakon poikkeuslupa saavat eri tulostekstit.

Päätöksiä on 2 / 5 / 6 / 5. Melumoodin tai ekologisen yhteyden lausuntoon vastaava kortti siirtyi selostusvaiheen lopusta ehdotusvaiheen alkuun. Kuusi lyhyttä etenemishetkeä (yksi kuulemishetki) ja kolme erikseen klikattavaa vaihesiirtymää rytmittävät täyttä pelikertaa. Etenemishetket eivät itsessään aiheuta lisäviivettä tai pistevähennystä.

## Tilasopimuksen täydennys

`Region`, `Milestone`, `Finding` ja `Story` ovat julkisia tyyppejä. `world.region` on siemenestä johdettu ja tallennettu profiili. `findings` sisältää lähdepäätöksen, paljastusvaiheen, ennalta määrätyn tuloksen, estävyyden ja tilan pending → queued → revealed. Sisällön teksti ei suorita vaikutuksia; tyypitetty lähde valitsee sallitun menettelytoiminnon.

Työjono ja tuloksen julkaisu ovat erillisiä: dueAt voi mennä ohi muiden päätösten aikana, mutta tieto pysyy piilossa määrättyyn käsittelyvaiheeseen. `milestones` kertoo YVA-päätelmän saapumisesta ja ehdotuksen päätösaineiston tarkistuksen avaamisesta, ei hyväksynnästä. Hyväksyntä vaatii edelleen ratkaistut haitat ja menettelyn portit. `nextStage` vaihtaa vaiheen vain siirtymätarinan jatkamisesta. Preview ja etenemistarina eivät kuluta satunnaislukuvirtaa.

Vanha swipe-fi-006-tallennus jää palautettavaksi vientiin; sitä ei tulkita uusilla alue- ja ajastussäännöillä. Päällekkäisten rajausten riskialat voivat olla samat kuin aiemmin poistetuissa osissa. HUD ja pisteet laskevat samat kohteet vain kerran.
