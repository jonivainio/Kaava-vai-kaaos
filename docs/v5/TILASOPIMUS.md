# V5:n tila- ja sääntösopimus

Ensisijainen pelaajasisältö: `docs/source-v5/KAAVA_VAI_KAAOS_CODEX_v5/KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md`, SHA-256 `03ae272389667c41412e8fef7a86f091db147aa72fbe6907a54b79661d3003f2`. `tools/import_v5.py --check` tarkistaa kaikki 248 ID:tä, 318 valintaa ja 143 tuloshaaraa. Lähdettä ei muokata. Vain sallitut muuttujat ja lukusanaan liittyvä kieliopillinen taivutus täytetään näytössä.

## Julkinen rajapinta

`src/game/v5/index.ts` tarjoaa `createGame`, `currentDecision`, `currentStory`, `previewChoice`, `choose`, `continueStory`, `token`, `getDerivedStats`, `serializeGame`, `restoreGame`, `getScore`, `openEpilogue` ja näkymämuotoilut. Fyysinen perusta ja sen `createRun`/`applyChoice`-rajapinta jäävät `src/engine`:en. React ei kirjoita hankkeen mekaanista tilaa suoraan.

`GameV5` on serialisoitava tietue. Tunnisteet: tallennus `swipe-v5-1`, sisältö `v5-fi-03ae27238966`, säännöt `v5-rules-1`. Se sisältää lähtötilan, nykyiset fyysiset paikat, piilotetun maailmaprofiilin, neljä kehitysvaihetta, työkalenterin, tapaukset, tulosjonon, sopimukset, BESSin, lupatilat, kustannukset, laatuhavainnot, päätöshistorian ja käyttöliittymälle tarkoitetut kohtaukset.

Jokainen vahvistus palauttaa uuden tilan. Vanhalla tokenilla tehty toisto palauttaa alkuperäisen tilan eikä laskuta mitään. Vasemman/oikean esitysjärjestys johdetaan vakaasta avaimesta; sääntö saa aina kanonisen A/B-valinnan. Esikatselu ei suorita sääntöä tai kuluta satunnaisuutta. Maailma, nimi ja kuvituksen valinta käyttävät erillisiä avaimia. Nimi, sen ID, pooliversio ja nimi-RNG säilyvät tallenteessa.

## Tapaus ja fyysiset kohteet

`CaseRecord` yksilöi aiheen, lajin, vaikutusmekanismin, hankeosan, alkuperäisen lähdekortin ja pysyvät voimala-/paneelipaikat. Saman aiheen variantit eivät luo joka kerta uutta poissulkua. Yhdellä paikalla voi olla monta estettä. Paikka poistuu laajuudesta kerran, eikä yhden esteen ratkaiseminen poista toista estettä.

Palautuskortti koskee täsmälleen kahta aiemmin saman tapauksen vuoksi poistettua paikkaa. Vastaus ei luo uusia paikkoja. Jos muu este estää palautuksen arvioinnin aikana, näytetään kielteinen palautushaara ja aiempi pienempi vaihtoehto säilyy.

Voimalamäärä, merenpinnasta erillinen kokonaiskorkeus, mallin nimellisteho ja energiantuotto säilyvät erillisinä. Korkeutta muutetaan vain yhteensopivan mallin rajoissa. Käyttötila alentaa tuottoa, ei nimellistehoa. Johto on yksi yhteinen segmentti; reittihistoria ja suunnitelmaversio muuttuvat todellisesta reittimuutoksesta. Aurinko säilyttää ha-, MWp- ja MWac-arvot. BESSissä ovat erikseen lataus-MW, purku-MW ja MWh.

## Aika, selvitykset ja tulokset

`WorkOrder` tallentaa tilaus-, alku-, valmistumis- ja vertailuajat, riippuvuudet, havaintokauden, lähteen, suunnitelmaversion, kustannustunnisteen ja alussa kiinnitetyn havainnon. `PendingOutcome` tallentaa oikean lähdepäätöksen, tapauksen, työtilauksen, käsittelyvaiheen ja vakaan järjestysnumeron. Valmistunut työ ei vielä tarkoita näkyvää viranomaisratkaisua: myös ohjelma-, YVA-, ehdotus- tai hyväksymisvaiheen on oltava avoin.

Yksi yhteinen kello odottaa seuraavaa valmistuvaa työtä. Rinnakkaiset kestot eivät summaudu. Vertailukalenteri kuvaa samoja tarpeellisia töitä ilman kyseistä vältettävää lisäviivettä. Pisteytettävä lisäaika on toteutuneen ja vertailukellon erotus. Myöhempi yhteinen ulkoinen odotus voi imeä aiempaa lisäviivettä. Vuokra-ajan varoitus säilyttää lisäksi varoitushetken todennetun vältettävän viiveen, jotta myöhempi ulkoinen odotus ei pyyhi tapahtunutta sopimusketjua historiasta.

Tavallinen tarinapyyhkäisy lisää 0 kuukautta. Työn odotuskortti etenee oikeaan valmistumishetkeen. Vaihesiirtymä vahvistetaan erikseen. Kuulemis- ja asiakirjatarinoilla on toteutuneeseen valmisteluun liittyvät ehdot; ne eivät myönnä lupia tai korjaa puuttuvia selvityksiä.

Tutkimusrahoitus ei muuta julkista tulosta. Rahoitus on toteutunut kehityskulu, julkaisu on itsenäinen tapahtuma. Päätös odottaa voi siirtää kriittistä polkua; pienemmällä selvitettyllä vaihtoehdolla jatkava hanke voi edetä tutkimuksen ollessa taustalla.

## Luvat, BESS ja loppu

Maanvuokraus → aloite/ohjelma → selostus/luonnos → ehdotus/luvitus. Hyväksyminen, valitus, lainvoima ja erilliset luvat ovat eri tiloja. Voitto vaatii nykyisen suunnitelman asiakirjat, ratkaistut esteet, kaavan vaaditun lainvoiman ja jokaisen tarpeellisen luvan lainvoiman. BESSin puuttuvat maa-, laite-, turvallisuus- ja melutiedot valmistellaan todellisina töinä.

BESSin erottaminen sulkee sen omat tulevat työt ja tarpeettomat luvat. Maksetut laskut, yhteiset velvoitteet ja tuulihankkeen luvat säilyvät. Verkkotarkastelu ei tee liittymissopimusta. Lupavoiton jälkeinen vapaaehtoinen akku-epilogi voi käsitellä liittymisen määräaikaa tai luovutusta; lopputulos ja pisteet on jo lukittu eikä sitä voi muuttaa tappioksi.

Valintatappiolla on päätöshistoriassa todellinen ratkaisematta jätetty este ja tarjottu toimiva vaihtoehto. Ulkoisessa lopussa vaihtoehto puuttuu. Omistajan lopettaminen säilyttää taustasyyn erikseen. Laajuusrajat näkyvät aloituksessa: tuuliosan 50 MW tai aurinkopuolen 40 ha sekä vähintään 25 % lukitusta painotetusta tavoitteesta. Lajiriskin poisto ei automaattisesti ratkaise muuta esteiden kokonaisuutta.

## Pistekalibrointi

Vain luvitusvoitto pisteytetään, enintään 1 000 pistettä. Tämän toteutuksen kalibrointi on pelisääntö, ei hanketaloudellinen laskentamalli.

- Laajuus 400. Hybridin lähtöpainot ovat tuuli 0,6, aurinko 0,3 ja BESS 0,1. Tuulen MW-suhdetta kerrotaan tekijällä `0,8 + 0,1 × korkeussuhde + 0,1 × tuottosuhde`. Voimalamäärästä ei vähennetä MW-menetyksen päälle toista sakkoa. Aurinkosuhde on ha- ja MWac-suhteen keskiarvo; akkusuhde lataus-MW-, purku-MW- ja MWh-suhteen keskiarvo. Eri yksiköitä ei summata tuotannoksi.
- Aika 200: 5 pistettä toteutunutta vältettävää kriittistä lisäkuukautta kohden. Päällekkäiset odotukset eivät laskuta samoja kuukausia uudelleen.
- Laatu 250: kirjattu menettelypuute vähentää pisteitä (esimerkiksi asiaton jääminen päätöksentekoon 50). Todetun esteen ohittaminen kirjautuu 80 pisteen laatupuutteena, mutta voi johtaa valintatappioon. Halvempi konsultti ei itsessään huononna laatua.
- Resurssit 150: yksi piste vastaa 2 500 euroa maksettuja kehitys- ja maanhankintakuluja. Tulevat vuokravastuut pidetään erillisinä eikä niitä esitetä jo maksettuina. Pyöristys tehdään kategoriasta kerran. Vähennysten summa vastaa täsmälleen erotusta 1 000 pisteestä.

Yhteisen tehonhallinnan arvio voi rajata akun käyttöä muuttamatta asennettua MW/MWh-kokoa. Sen taloudellinen käyttökerroin ja mahdollinen verkosta oton 0 MW:n raja säilyvät erillisinä tietoina; niitä ei esitetä tuulivoiman tuotantona.

## Tasapainon vertailu

Vertailupelaaja valitsee kanonisen A/B:n erillisellä 50/50-siemenellä. Lisästrategiat `cautious`, `economy` ja `scope` käyttävät julkista kortti-ID-kohtaista valintataulukkoa; `canonical-a`/`canonical-b` ovat äärivertailuja. Yksikään ei lue piilotettua havaintoa. Määritelmät tallennetaan simulaation JSON-raporttiin.

Ensimmäinen 10 000 siemenen vertailu antoi 41,50 % voittoja, 32,74 % ulkoisia loppuja, 23,94 % valintaperäisiä loppuja ja 1,82 % laajuusloppuja. Kehityskalibrointi laski uuden luontosijoittelun soveltuvuuden kynnystä 0,65 → 0,40 ja maakotkan uuden sijoittelun 0,55 → 0,40. Havainnot määräytyvät edelleen ennen päätöstä samoilla avaimilla. Tunnettua kelvollista pienempää vaihtoehtoa tai palautuksen oman arvioinnin sääntöä ei muutettu. Lopullinen jakauma kirjataan QA-raporttiin; loppuluokkia ei nimetä uudelleen tavoiteosuuksien saamiseksi.

## Tallennus ja käyttöönotto

Palautus validoi fyysisen lähtötilan ja toistaa tallennetut toiminnot samalla siemenellä. Koko lopputilan on täsmättävä; tuntematon toiminto, haara tai ristiriitainen tila on virhe. Epäkelpo alkuperäinen JSON palautetaan `recoverableRaw`-kentässä. Vanha 007-tallenne ei muutu v5-kortti-indeksiksi: se säilyy vientiin ja uusi peli aloitetaan erikseen.

PWA välimuistittaa yhteensopivan koodin, sisällön, fontit ja kuvat yhtenä sisältöhashilla nimettynä kokonaisuutena. Uusi palvelutyöntekijä odottaa valikkoa. Pelitallenteita ei tyhjennetä päivityksessä. Fyysisten puhelinten selainkohtainen toimivuus ja käyttäjäpalaute erotetaan Chromiumin emuloiduista kokeista.
