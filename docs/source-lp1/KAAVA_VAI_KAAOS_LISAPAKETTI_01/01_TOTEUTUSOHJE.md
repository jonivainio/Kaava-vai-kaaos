# Kaava vai kaaos — lisäpaketti 01 / toteutustoimeksianto

**10.9.2026 · toteutussuunnitelma, ei jo tehty pelipäivitys**

## 1. Toimeksianto

Laajenna toimivaa peliä maltillisesti. Avaa päävalikon Tuuli- ja Aurinko-valinnat, lisää kahdeksan uutta itsenäistä aihetta niiden oikeine jatkoineen ja toteuta hybridin mahdollinen pelastaminen aurinkohankkeena pelaajan päätöksellä. Älä uusi peliä, vaihda graafista ilmettä tai kirjoita koko nykyistä käsikirjoitusta uudelleen.

Uutta aineistoa: **13 päätöskorttia, 11 tapahtumaa ja 3 teknisen vaihtoehdon vahvistusta**. Näistä kahdeksan on itsenäisiä aiheita, kolme sidottuja korjauskortteja ja kaksi aurinkojatkon päätöksiä. Vahvistukset ovat oikeita jatkopäätöksiä, eivät taustalla automaattisesti hyväksyttäviä valintoja.

Yhteen pelikertaan ei lisätä kaikkia sisältöjä. Uudet peruskortit osallistuvat nykyisiin valintapoolihin ja korvaavat saman kiintiöpaikan muuta sisältöä. Sidottu jatko tulee vain oman alkutilanteensa seurauksena.

### Tiedostot ja etusija

| Tiedosto | Tehtävä |
|---|---|
| `00_ALOITA_TASTA.txt` | Aloitusprompti |
| `01_TOTEUTUSOHJE.md` | Työn rajaus, nykytilan havainnot ja toteutusjärjestys |
| `02_UUDET_KORTIT_JA_EVENTIT.md` | Uuden lisäsisällön ensisijaiset pelaajatekstit ja tapauskohtaiset vaikutukset |
| `03_PELIMUODOT_JA_AURINKOJATKO.md` | Pelimuotojen sitovat erot ja aurinkojatkon tilamuutos |
| `04_TESTIT.md` | Toteutuksen hyväksyminen ja simulaatioiden raportointi |
| `05_LAHTEET.md` | Julkiset taustalähteet ja fiktioon johtamisen rajat |
| `06_NYKYSISALLON_MOODIAUDITOINTI.md` | Nykyisten 248 sisältötunnisteen käyttö eri tiloissa |
| `data/uusi_sisalto.json` | 02:n rakenteinen rinnakkaismuoto, ei runtime-sääntöpaketti |
| `data/mooditekstit.json` | Nimetyt esitystekstin muutokset nykyiseen sisältöön |
| `data/baseline_index.json` | Tarkastetun v5-lähteen tunniste- ja aiheindeksi, ei palautettava pelipakka |
| `data/hyvaksyntatestit.json` | Testimatriisi, ei väite suoritetuista testeistä |
| `tools/check_package.py` | Tämän toimituspaketin eheystarkistus; ei testaa peliä |

Uusin käyttäjän nimenomainen ohje ja paikallinen käyttäjän muokkaama sisältö ovat ensisijaisia. Tämä paketti ohittaa vanhan ”vain Hybridi avattu” -rajauksen ja automaattisen aurinkojatkon **vain tämän toimeksiannon laajuudessa**. Muut uusimmat sävy-, rytmi-, tallennus- ja julkaisuohjeet säilyvät. 03:n yleiset invarianssit sitovat myös 02:n tilanteita.

Pidä alkuperäinen v5-käsikirjoitus ja sen tarkistussumma muuttamattomina. Uusi lisäsisältö, rajatut pelimuototekstit ja uudet säännöt ovat oma versioitu kerroksensa. Markdownin ja JSONin ristiriidassa älä valitse vanhempaa automaattisesti: muokattu Markdown on pelaajatekstin lähde ja rinnakkais-JSON tuotetaan siitä uudelleen.

## 2. Mihin nykytilaan tämä on sovitettu?

GitHubista luettu `jonivainio/Kaava-vai-kaaos`, commit **`e123ec68de0c94a40f05230a3d50a49752ff9bec`**. Tämä ei määrää palauttamaan työpuuta siihen. Tarkista paikallisen haaran erot ennen toteutusta.

Aktiiviset säännöt ovat `src/game/v5`, tekstit `content/v5.fi.json`, sisältöversio `v5-fi-03ae27238966`, sääntöversio `v5-rules-3`. Lähteen SHA-256 on `03ae272389667c41412e8fef7a86f091db147aa72fbe6907a54b79661d3003f2`. Mukana olevan 248 tunnisteen indeksin lähtö on tätä hashia vastaava käsikirjoitus. Nykyisen `narration.ts`:n tiivistelmät ja reaktiot ovat erillisiä ja uudempia kuin lähdeteksti.

### Tarkastetut toteutuskohdat ja vaadittu muutos

| Tiedosto / havainto | Tee näin |
|---|---|
| `src/ui/App.tsx`: `[mode] = useState("hybrid")`, muut painikkeet disabled eikä valintakäsittelijää | Lisää tilan vaihtaminen, selkeä valinnan kuvaus ja oikean tilan alustus. Jatka-painike avaa tallennetun tilan, ei valikossa juuri valittua uutta tilaa. |
| `state.ts`: `newProcedure(mode !== "solar")` | Älä päättele kaikkien aurinkohankkeiden YVA-tarvetta pelimuodon nimestä. Toteuta 03:n selvästi määrätyt aurinkoprofiilit. |
| `state.ts`: akku on kaikkien tilojen alussa undecided ja sillä on nimellisarvot | Puhtaiden tilojen akku on excluded, eikä sille synny tehtäviä, lupia, pistepainoa tai tarjouskortteja. |
| `director.ts`: vaiheessa 2 ehdotetaan BESS-P2-04:ää; peruspakassa ei keskitettyä moodisopimusta | Yksi yhteinen kelpoisuustarkistus kaikille valintareiteille, myös pakollisille ja käsin jonotetuille jatkoille. Pelkkä satunnaispakan suodatus ei riitä. |
| `rules/programme.ts`: `defenceStopsWind` voi poistaa tuulen automaattisesti, kun independentSolar ja riittävä ala täyttyvät | Korvaa tällä kohdalla vanha automaatio pelaajalle tarjottavalla LP1-H01:llä. Älä jätä kahta kilpailevaa jatkojärjestelmää. |
| `endings.ts`: `finish()` tyhjentää päätöksiä ja peruu tulevia tuloksia | Ratkaise aurinkojatkon mahdollisuus ennen lopullista finishiä. Älä yritä palauttaa tuhottuja jonoja tyhjentämällä ending-kenttää jälkeenpäin. |
| `index.ts`: restore toistaa initialRunin moodista ja koko toimintahistoriasta | Lisää moodimuutos / jatkopäätös toistettavaan historiaan. Säilytä alkuperäinen pelimuoto ja hankkeen identiteetti. |
| `AssetHud.tsx`: näytettävät hankeosat valitaan run.mode:n perusteella | Käytä aktiivisia hankeosia ja turvallisia suhdelukuja. Vaihto aurinkojatkoon näkyy heti, ilman nollalla jakoa tai haamuvoimaloita. |
| `content.ts`: sisältöversio perustuu vain v5-lähdehashiin | Uuden kokonaisuuden sisältöhash kattaa myös lisäpaketin ja pelimuotoesitykset. Vanhan sääntöversion tallennetta ei toisteta uusilla säännöillä huomaamatta. |
| `score.ts`: scopeRatio sekä vanhat alkuarvot | Erota suorat pelimuodot ja hybridistä jatkanut aurinko. Älä palauta jäljellä olevan aurinkoalan suhdetta 100 prosenttiin konversiohetkellä. |

Repoa luettiin GitHub-työkaluilla. Tässä toimituksessa ei ajettu paikallista peliä tai sen testejä. Repositorion omien raporttien testimäärät ovat sen tekijän raportoimia, eivät tämän paketin testituloksia.

## 3. Säilytettävä pelituntuma

**Rytmi:** hybridin nykyinen tavoite 18 peruspäätöstä, vaihekiintiöt 3/5/6/4. Tarpeelliset jatkot eivät katoa kiintiöön. Uusien aiheiden lisääminen ei korota tätä tavoitetta. Puhtaiden tilojen tavoite on sama, mutta tyhjää paikkaa ei täytetä väärän tekniikan kortilla. Järjestä ensin yhteisen nykyisen sisällön kelpoisuus; raportoi, jos samalle vaiheelle ei ole tarpeeksi oikeita aiheita.

Enintään kolme ajankulkunäkymää, enintään yksi vaihetta kohti, ei peräkkäisiä. Tarpeelliset työkalenterin tapahtumat käsitellään myös tiivistetyssä kerronnassa. Tuntematonta uuden tapahtuman haaraa ei luokitella hiljaiseksi oletuksena. Mielekäs myönteinen yllätys ja aurinkojatkon tarjous säilyvät näkyvinä.

Pidä uusien perusaiheiden kokonaispaino aluksi sellaisena, että tavalliseen kierrokseen tulee yleensä 1–3 uutta alkutilannetta, ei kahdeksaa. Hybridi säilyttää tuulipainotuksen, aurinkoaiheita tulee seuraavaksi ja BESSiä vähiten. Enintään kaksi BESS-peruskorttia; tässä paketissa ei lisätä BESS-aiheita.

**Sävy:** tilanne on ymmärrettävä sellaisenaan. Huumori tulee esimerkiksi jo valmiiksi pätkivästä televisiosta, kahden kunnan eri aikatauluista tai lampurin käyttökelpoisesta ehdotuksesta. Älä lisää jokaiseen korttiin uutta reaktiota, loppuvitsiä tai luontoa ja asiakirjoja inhimillistävää lausetta. Neutraali hyvä uutinen on sallittu.

**Valinnat:** näytä ennen sitovaa valintaa tunnettu suunnittelukulu, työn arvioitu kesto ja tiedossa oleva kpl/ha/tehomuutos nykyiseen UI:hin sopivassa pienessä vaikutustiedossa. Tuntematonta tulosta ei paljasteta. Työn kesto ei ole sama asia kuin koko hankkeen lisäviive. Peruuntunut pyyhkäisy ei muuta mitään.

## 4. Toteutusjärjestys

### A. Inventoi ja lukitse vertailu

Lue uusin AGENTS, NEXT_STEPS, v5-tilasopimus sekä mainittujen tiedostojen nykyversiot. Kirjaa todellinen lähtöcommit ja paikallinen diff. Aja nykyiset perusvalidoinnit ja tallenna rikkinäiset lähtötestit erikseen. Vertaa 248 ID:tä mukana olevaan indeksiin; mahdollisesti myöhemmin lisätyt ID:t kuuluvat myös moodiauditointiin. Älä ota vanhoja `src/campaign`- tai 007-sääntöjä uuden käyttöliittymän pohjaksi.

### B. Toteuta komponentti- ja menettelysopimus ensin

Määritä `originMode`, `activeMode`, reittiluokka, aktiiviset hankeosat sekä yhteinen `modeAllows`-tyyppinen tarkistin. Toteuta puhtaiden tilojen alustus, sisältökelpoisuus ja menettelyprofiilit. Lisää invarianssitesteillä varmistus, ettei väärää hankeosaa synny. Avaa UI-valinnat vasta, kun moottori läpäisee tämän osuuden.

### C. Integroi uudet aiheet pieninä kokonaisuuksina

Tuo tekstit omaan lisäsisältötiedostoon. Nykyisen `ContentEntry`-mallin laajennus tai adapteri sallitaan, mutta vaikutuksia ei arvata tekstistä. Rekisteröi jokaiselle päätökselle spec, eligible ja apply; jokaiselle tulokselle resolver, julkaisuajankohta ja haara. Kolme teknistä vahvistusta toteutetaan samoilla tunnisteilla toistettavina jatkopäätöksinä.

Tee ensin yksi tuuli- ja yksi aurinkoketju päästä päähän sekä niiden kuvitus. Laajenna vasta toimivan mallin jälkeen loppuihin aiheisiin. Paluukortti voi tulla myöhemmässä päävaiheessa kuin sen dokumentin nimellisvaihe, mutta vain nimetyn tapauksen jatkona. Menettelyehtoja ei ohiteta palaamalla indeksissä taaksepäin.

### D. Toteuta aurinkojatko yhtenä atomisena päätöksenä

Noudata 03:n tilasopimusta. Tee ennen kaikkea kielteiset kelpoisuustestit ja tallennuksen toisto. Testaa nykyisen puolustushaaran lisäksi tuuliosan laajuus-, sijoittelu- ja meluesteistä johdetut soveltuvat lähteet. Älä yleistä kaikkia ulkoisia loppuja aurinkojatkon tarjoukseksi.

### E. UI, kuvitus ja esityskerros

Säilytä violetti/vaalea mobiili-ilme. Tee uudet alkuperäiset SVG:t 02:n kuvausaiheista tai käytä todella sopivaa olemassa olevaa kuvaa. Tavallisia puhtaan aurinkopelin kuvia ei täytetä voimaloilla tai akkujen konteilla. Hybridin epäonnistumista kuvaavassa jatkotarjouksessa saa näkyä poistuva tuuliosa historiallisena kontekstina; konversion jälkeiset toimintakortit kuvaavat aurinkohanketta.

Kenttien nimet, lähdeavaimet, haarojen ehdot, ID:t, aiheperheet ja tekniset tapahtumavaikutukset eivät näy pelaajalle. Säilytä lähdeteksti ja käytä täsmällistä mode/context-overlayta 06:n mukaan, älä koko sanaston haku–korvausta. Pitkä otsikko saa rivittyä. Älä pienennä fonttia lukukelvottomaksi. Tarkista pyyhkäisytekstit ja 360/390/430 px:n näkymät.

### F. Testit, jatkettavuus ja luovutus

Aja 04, tallenna simulaatioraportteihin commitit, siemenjoukot, strategiat ja todelliset nimittäjät. Kirjaa `reports/lp1/content-coverage.json`:ään jokainen uusi ja muokattu ID, säännöt, kuvitus ja testit. Päivitä NEXT_STEPS. Osatyön keskeytyessä jätä seuraava täsmällinen työvaihe ja keskeneräiset ID:t, ei ”jatka parantamista”.

## 5. Versionhallinta ja julkaisu

Älä poista arkistopakkaa tai lähdekäsikirjoitusta. Säilytä käyttäjän paikalliset muutokset; tee rajattu työhaara soveltuvin valtuuksin. Tämä aineisto on toimeksianto pelin kehittämiseen, ei käsky vaihtaa julkaisupalvelua tai luoda toista Sites-projektia. Käytä nykyistä julkaisutapaa vain voimassa olevan valtuutuksen perusteella ja läpäistyjen tarkistusten jälkeen. Älä tee force-pushia.

PWA-koodi, tekstit ja grafiikat päivittyvät yhteensopivana hashattuna kokonaisuutena. Vanha peli voi säilyä omaan sääntöversioonsa sidottuna tai viedään talteen palautettavana raakajsonina. Älä pyyhi tallennuksia versionvaihdossa. Julkinen linkki ei ole todistettu toimivaksi ennen kirjautumattoman selaimen koetta.

## 6. Valmiin työn raportti

Raportoi a) lisätyt sisällöt ja molemmat pelimuodot, b) aurinkojatkon todelliset laukaisutilanteet ja rajaukset, c) pure-mode-vuotojen negatiiviset testit, d) jatkon eri loppuvaihtoehdot, e) pelipituus ja jakaumat ennen/jälkeen, f) tallennus- ja päivityskokeet, g) kuvat ja mobiilihavainnot, h) testatut ja testaamatta jääneet selaimet. Tämän paketin eheystarkistusta ei saa merkitä pelin hyväksymistestien läpäisyksi.
