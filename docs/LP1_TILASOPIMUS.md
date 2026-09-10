# Lisäpaketti 01 — tilasopimus

Lisäpaketin muuttamaton lähde on `docs/source-lp1/KAAVA_VAI_KAAOS_LISAPAKETTI_01/`. `tools/import-lp1.mjs --check` vertaa runtime-tekstejä rakenteiseen rinnakkaislähteeseen. V5:n alkuperäinen 248 ID:n lähde säilyy muuttumattomana. Uudet 27 ID:tä, moodiesitykset ja käyttöpolitiikka osallistuvat yhteiseen sisältötunnisteeseen. Sääntöversio on `v5-lp1-1`.

`originMode`, `initialRun` ja `initial` säilyvät. `activeMode` ja `routeCategory` kuvaavat nykyistä hanketta. Konversio on tavallinen tallennettu `LP1-H01/A`-päätös samassa replay-historiassa. `modeAllows` rajaa kandidaatit, jonottamisen, tuloksen julkaisun, suorittamisen ja esikatselun. Erilliset Tuuli/Aurinko eivät saa BESSiä; valikon valinta vaikuttaa vain seuraavaan uuteen peliin.

Aurinkoprofiilin YVA-tarve perustuu alussa sidottuun fiktiiviseen vaikutusprofiiliin. Ei-YVA-hankkeella on omat vaihetekstit ja kaavan vaikutusselvitykset; tuntematon menettelytarve ei riitä lupamaaliin. Tämä peli rajautuu kaavoitettaviin aurinkohankkeisiin eikä kuvaa kaikkia mahdollisia lupareittejä.

`solarDesign` erottaa DC-paneelitehon, invertterin AC-tehon, liittymän vientirajan ja vuosienergiavertailun. Toteutettu DC-valinta kirjataan samoille palsta-ID:ille; se ei luo hehtaareja. Vuosienergia on 8760 fiktiivisen tunnin leikatun tehon summa, ei kohdekohtainen tuotantoennuste. Kuljetusmatka ja alueen sisäinen kaapelointi ovat eri arvoja kuin yhteisen liityntäjohdon pituus.

Työn `binding` sitoo lähdepäätöksen, valinnan ja tulostapahtuman. LP1-resolveri vaatii valmistuneen työn, oikean tapauksen ja suunnitelmarevision. Muuttunut suunnitelma edellyttää erillistä ajantasaisuustarkistusta; alkuperäinen havainto säilyy. Preview ei tilaa, maksa tai arvo mitään. Päätöstunniste estää kaksoisvahvistuksen.

Kaikki lopetukset kulkevat yhteisen arvioinnin kautta ennen jonojen peruuttamista. Aurinkojatko vaatii todellisen loppuun tutkitun tuuliosan esteen, hallitun vähimmäisaurinkoalan ja -tehon, itsenäisen liittymän/kulun, omistajan jatkorahoituksen sekä yhteisten esteiden puuttumisen. Tarjous on kertaluonteinen. Kielto säilyttää alkuperäisen loppuluokan eikä tilaa jatkotyötä.

Hyväksyminen poistaa tuuliosan nimetyllä syyllä, säilyttää identiteetin, historian, laskut ja kellon, peruu tarpeettomat tulevat tuulityöt ja säilyttää yhteiset velvoitteet. `recovery.evidence`, `previousPermits` ja `cancellations` kirjaavat kattavuuden ja muutoksen syyt. Ehdotusvaiheessa tarvitaan muuttuneen aurinkosuunnitelman käsittely; konversio ei aloita uutta peliä eikä hyväksy kaavaa tai lupia.

`municipalities` säilyttää kuntakohtaisten tuotantoalueiden rajauksen, hyväksymisen ja lainvoiman. Yksi hyväksyntä ei riitä kahden mukaan jäävän kunnan hankkeeseen. Aurinkojatkon voitto on `LP1-E-H03`, luokka `hybrid_solar`: laajuus suhteutetaan alkuperäisen hybridin aurinkotavoitteeseen, aikaisemmat kulut ja viiveet säilyvät pisteissä.

Tallennus tarkistetaan toistamalla koko toimintahistoria. Vanha rules-3-tallenne palautuu virheen yhteydessä muuttumattomana vientiä varten, eikä sitä tulkita salaa uusilla säännöillä. Ajankulkukorttien enimmäismäärä kolme ei nollaudu konversiossa.

Testien ja julkaisun tila kirjataan erikseen `NEXT_STEPS.md`:hen ja `reports/lp1/`:een. Tämä sopimus ei itsessään ole hyväksymisraportti.
