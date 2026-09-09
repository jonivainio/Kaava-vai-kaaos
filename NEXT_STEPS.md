# Pelikerran tiivistys ja muutosluvut — 9.9.2026

Aktiivinen sääntöversio on nyt `v5-rules-2`, sisältö edelleen muuttamaton `v5-fi-03ae27238966`. Käyttäjän uuden palautteen mukaan peruskiintiö on 18 (3/5/6/4) aiemman 21:n sijaan. Akulle valitaan enintään kaksi peruspäätöstä, tarpeelliset jatkot käsitellään. Hybridin selostus- ja ehdotusvaiheessa varmistetaan aurinkosisältö. Tuuli on keskimäärin selvästi suurin aihe, aurinko toinen, akku pienin.

Yksi odotuspyyhkäisy käsittelee peräkkäiset hiljaiset valmistumiset kellon järjestyksessä seuraavaan todelliseen tulokseen/päätökseen/siirtymään. Päällekkäisiä odotuksia ei summata eikä tulostapahtumia ohiteta. HUD:n `assetChanges` säilyttää voimalamäärän, korkeusvälin, MW:n ja hehtaarien viimeisimmät toteutuneet muutokset. Preview ei muuta niitä; lataus säilyttää ne.

Varmennettu: 359/359 testiä, tyypitys/build ja täsmällinen sisältötuonti. Chromium 11/11, mukana neljän muuttuneen luvun 360/430 px:n näkymä ja lataus. Offline/päivitys 2/2. Fyysistä puhelinta ei testattu. Vertailu samoilla 1000 siemenellä: voitolliset kierrokset 24,19 → 21,10 päätöstä, akkua sisältävien kierrosten akkupäätökset 3,29 → 2,17, peräkkäiset odotusruudut 9751 → 0. Lopullinen erillinen 3000 satunnaisen valinnan peliä: 1140 voittoa, 985 ulkoista loppua, 842 valintaloppua, 33 laajuusloppua, 0 virhettä.

Raportit: `reports/pacing/QA.md`, `comparison.json`, muutoslukujen kuvat ja julkaisun jälkeen `public-check.json`/`release.json`. Edellisen `v5-rules-1`-tallenteen raakasisältö säilyy vientiin; aloita tätä muutosta kokeillessa uusi peli. Vanhaa päätöshistoriaa ei tulkita uuden pakan mukaan. Säilytä alkuperäisen v5-toimituksen raportit historiallisina.

Seuraava vaihe tässä toimituksessa: julkinen julkaisu samaan osoitteeseen, kirjautumaton tarkistus ja julkaisutietojen tallennus. Seuraava kehitystehtävä: käyttäjän palaute oikealta puhelimelta, erityisesti muutoslukujen luettavuus ja kierroksen rytmi. Älä lisää takaisin peräkkäisiä odotusruutuja tai kasvata akkupakkaa muiden aiheiden kustannuksella.

---
Aiempi v5-toimitus ja sen historia:
# V5 toteutettu ja julkaistu julkiseksi — 9.9.2026

Aktiivinen peli on `src/game/v5` + `content/v5.fi.json`, sisältö `v5-fi-03ae27238966`, säännöt `v5-rules-1`, tallennus `swipe-v5-1`. V5-käsikirjoitus säilyy ensisijaisena muuttamattomana lähteenä. Kaikki 159 päätöstä, 89 tapahtumaa ja 143 tuloshaaraa on kytketty. UI käyttää v5:tä; tarinat ovat pyyhkäistäviä tekstikortteja, vaiheiden vaihdot omia näkymiään. 61 uutta SVG:tä, yhteensä 82. Vain Hybridi avoinna valikossa.

Toteutettu ja testattu: rinnakkainen kriittisen polun kalenteri, nimistä erillinen maailma, paikkojen ja tapausten pysyvät ID:t, viivästetyt käsittelyt, todelliset sopimusmääräajat ja korvaavat paikat, BESSin luvat/tehot/epilogi, lupavoitto ja 400/200/250/150-pistekirjanpito. Tilasopimus `docs/v5/TILASOPIMUS.md`. Sisältö- ja kuvakartta `reports/v5/content-coverage.json`, haaratulokset `reports/v5/result-branch-tests.json`, K01–K60 ja rajaukset `reports/v5/QA_V5.md`.

Viimeiset tarkistukset: 355/355 TS-testiä (02:02), tyypitys ja build, 17 Python-testiä sekä lähdetuonti/vanhat sisältövalidoinnit. Chromium 9/9 (360/390/430/1163 px, kosketus/peruutus, koko peli ja 3 siirtymän lataus), tuotannon offline/päivitys 2/2. Kuvapilotti, kuusi galleriasivua ja käyttöliittymäkuvat katsottu. Fyysinen puhelin, iOS/Safari, Firefox ja asennettu puhelin-PWA eivät ole testattuja.

Lopullinen 30 000 pelin validointi: kolme politiikkaa samoilla 10 000 uusilla siemenillä, ei suoritusvirheitä. Satunnainen vertailu: voitto 36,47 %, ulkoinen loppu 33,12 %, valintaloppu 28,71 %, laajuusloppu 1,70 %. Varovainen voitti 65,24 %, talouspainotteinen 61,83 %. Alussa arvottu ulkoinen este 33,90 %, ei sama kuin toteutunut loppuluokka. SHA:t ja todelliset nimittäjät simulaatioraporteissa. Vanhojen kehitysajojen löydetyt virheet on korjattu ja säilytetty historiaan.

Julkaistu samaan Sites-projektiin `appgprj_6a9f15554f248191b0170ac9b997e896`, versio 4, toteutuscommit `937bf50c69689eef2ad5eae4008ede29c6b2e744`. GitHubin main päivitetty. Access-mode public. `tools/check-public-v5.mjs` läpäisi koko 25 päätöksen pelin puhtaassa kirjautumattomassa selaimessa: HTTP 200, oikea bundlehash, 3 siirtymää ladattu uudelleen, 699 pisteen lupavoitto, ei selainvirheitä. Tulos `reports/v5/public-check.json`, julkaisutunnisteet `release.json`. Jaettava linkki: https://kaava-vai-kaaos.joni-vainio.chatgpt.site/ . Ei kirjautumista eikä ohitustunnuksia. Dokumentaation myöhempi commit vain kirjaa tämän kokeen.

Seuraava varsinainen kehitystyö: käyttäjän mobiilikoe ja v5:n toimituksellinen palaute yksittäisten ID:iden avulla. Aloita uusi v5-peli; yhteensopimaton 007-tallenne säilyy vientiin eikä sen vanhaa kortti-indeksiä muunnettu. Työkalut: `/?review-v5` vain kehityksessä, `tools/trace-v5.mjs` ja `tools/simulate-v5.mjs`. Älä tuo vanhoja pelaajatekstejä tai RtB-maalitilaa takaisin v5:n päälle. Erillisten Tuuli-/Aurinko-tilojen avaaminen on jatkotehtävä.

---
Alla säilytetty historia kuvaa aiempia välitiloja, ei nykyistä työjonoa.
## Aiempi inventointimerkintä (tilanne ennen yllä kuvattua toteutusta)

Aktiivinen toimeksianto: käyttäjän v5-paketti, ensisijaisena muuttamaton käsikirjoitus hakemistossa `docs/source-v5/KAAVA_VAI_KAAOS_CODEX_v5/`. Aloitusohje, toteutusohje, koko käsikirjoitus, muutoskooste, lähdedokumentti ja K01–K60 on luettu. Paketin eheystarkistus läpäisty. Lähtötilanne puhdas commit `b032765605de236464042a574700b69fe49475a0`; työhaara `codex/v5-content-logic`. Inventointi: `docs/v5/INVENTOINTI.md`.

**Ei vielä valmis eikä julkaistu:** nykyinen UI käyttää edelleen 007-peliä. V5:n 248 tekstisisältöä on tuotu täsmällisesti `tools/import_v5.py`:llä (toistoajo `--check`). Erillinen `docs/v5/SOURCE_AUDIT.json` säilyttää ehdot ja tekstikenttien vastaavuuden. Julkiset v5-tyypit, rinnakkainen työkalenteri, omaisuusmuutokset, maailmasiemenet, menettelyporttien apurit ja uusi pisteytys ovat hakemistossa `src/game/v5`. Koko peliohjaaja, kaikkien 159 päätöksen säännöt ja 89 tapahtuman ehdot, UI-kytkentä, täysi tallennusvalidointi ja kattavuusraportti ovat vielä tehtävinä. Pelkkä tekstituonti ei ole toteutettu ketju.

Varmennettu tässä työssä: lähtöversion 82 testiä, tyypitys/build; v5:n 11 sisältö- ja kalenteritestiä sekä tyypitys ensimmäisten moduulien jälkeen. Myöhemmin lisättyjä world/assets/score/procedure-moduuleja ei vielä testattu. Käyttäytymistestit, 3 000 kehitys-/10 000 erillistä loppusimulaatiosiementä, Pythonin aiemmat sisältötestit ja uudet tuontitestit, 360/390/430 px + desktop, offline/päivitys ja lopullinen build ovat vielä tehtäviä.

Kuusi alkuperäistä SVG-koekuvaa on tehty ja oikeasti katsottu yhdessä 390 px korttileveydellä (`reports/v5/art/pilot-six.png`, `tools/render-v5-art-pilot.mjs`). Kuvat: contract-pages, owner-plan, shared-line, reserve-wetland, lease-renewal, battery-limits. Vaihtelevat lähikuvat, henkilö, maisema, ilmakuva ja laitteisto; jatka tästä monipuolisella aihekohtaisella kuvituksella. Tämä on kuvituksen koe, ei pelin selainhyväksyntä. Sovelluksen kuvituskytkentä ja loput kuvat puuttuvat.

Seuraava toteutus: v5:n case-/work-/outcome-sääntökytkennät täsmällisten ID:iden perusteella, ensin maanvuokrauksen uudet ketjut ja viivästetty tulos, sitten vaiheet 2–4, BESS, määräajat ja lopullinen lupaportti. Älä käytä viiteluetteloa automaattisena jonona. Kaikki lähteen 143 tuloshaaraa tarvitsevat oikeat ehtonsa ja negatiiviset kelpoisuustestit. Sääntökello ei saa käyttää perustan 96 kk lopetusrajaa tai lisätä joka kortista kuukautta. Säilytä nimisiemen ja fyysisten kohteiden pysyvät ID:t. UI siirretään v5:een vasta toimivan kokonaisuuden jälkeen. Julkaise samaan julkiseen Sites-projektiin vasta hyväksytystä lopputuloksesta; käyttäjä on valtuuttanut GitHub-pushin ja julkisen julkaisun.

Alla aiemman julkaistun version vertailutila (ei v5:n ohje):

Aktiivinen peli on src/game, sisältöversio **swipe-fi-007**. Säilytä käyttäjän hyväksymä violetti/vaalea mobiili-ilme. Valikossa vain Hybridi; erilliset Tuuli ja Aurinko odottavat omaa sisältökokeilua. Vanha src/campaign, 64 kortin pilotti ja 80 nimen pankki ovat säilytettyä vertailuaineistoa.

18 päätöstä: 2 maanvuokrausta, 5 aloitetta/ohjelmaa, 6 selostusta/luonnosta ja 5 ehdotusta/hyväksyntää. Melumoodin tai kulkuyhteyden lausuntoon vastaava kortti kuuluu nyt ehdotusvaiheen alkuun. Pankissa on 69 hybridikohtaamista ja 11 erillistä aurinkovarianttia. Kuusi etenemishetkeä (yksi selostuksen yleisötilaisuus), kolme klikattavaa vaihesiirtymää ja tapauskohtaiset tulostarinat eivät vie päätöspaikkoja.

Uutta: tallennettu piilotettu alueprofiili west/central/lapland/east, aluepainotettu lajisto ja Puolustusvoimien haarat. Poronhoitokortit vain Lapissa, metsäpeura ja liito-orava sen ulkopuolella. Maakotka painottuu länteen ja pohjoiseen, mutta ei ole yksinomaan läntinen riski. Nimi, sen vaihtuminen tai lataus eivät muuta aluetta, lähtökokoa tai mekaanista satunnaisuutta. Lähteet, rajaukset ja painot: docs/ALUEET_JA_AJASTUS.md.

Työjono ja tuloksen julkaisu on erotettu: findings tallentaa lähteen, käsittelyvaiheen ja pending/queued/revealed-tilan. Luontosijoittelun arvio, vesitalous ja palautteen lisäkäsittely tulevat YVA-päätelmän yhteydessä. Aurinkoalueen luontoratkaisu ja Natura-/vaikutusarvioiden riittävyys käsitellään ehdotusvaiheessa ennen hyväksyntää. VTT ja lentoesteen esiselvitys voivat valmistua aiemmin. Progress- ja transition-tarina eivät muuta kelloa; vaihe vaihtuu vasta siirtymää klikattaessa. Ks. docs/TILASOPIMUS_SWIPE.md.

Alueet ovat karkeita fiktiivisiä ympäristöprofiileja, eivät maakuntakohtaisia lajikarttoja tai mitattuja riskiprosentteja. Poronhoidon todellinen alue ulottuu myös Lapin ulkopuolelle. Pelin kestot, hinnat ja todennäköisyydet ovat pelisääntöjä. YVA-päätelmä ei myönnä kaavahyväksyntää tai poikkeuslupaa. Säilytä tämä erottelu uusissa teksteissä.

Varmennus: 82 TypeScript-testiä, tyypitys/build, 17 Python-testiä sekä kaikki kolme sisältövalidointia; 9 Chromium-selaintestiä ja 2 offline/päivitystestiä. Vaihesiirtymä myös ladattiin uudelleen ja klikattiin selaintestissä. Tulokset ja simulaatioiden lähdeversiot: reports/QA_REGIONS_2026-09-08.md. Fyysistä puhelinta, iOS/Safaria, Firefoxia tai ruudunlukijaa ei ole testattu.

Käyttäjä on valtuuttanut GitHub-pushin ja julkaisun **kaikille ilman kirjautumista**. Sama Sites-projekti .openai/hosting.json:ssa, älä luo uutta. Osoite on https://kaava-vai-kaaos.joni-vainio.chatgpt.site. Julkaisun lopullinen tila ja kirjautumattoman selaimen tarkistus kirjataan QA-raporttiin. GitHub origin: jonivainio/Kaava-vai-kaaos.

Seuraava työ: käyttäjän puhelinkoe ja alueiden sekä viivästettyjen seurausten toimituksellinen palaute. Aloita uusi hanke; 006-tallennusta ei tulkita 007-säännöillä, vaan se jää palautettavaksi vientiin. Siemen uusi-1 toimii nykyisessä varovaisen etenemisen selainkokeessa. Korttien vasen/oikea vaihtuu, käytä valintojen sisältöä. Uusia alue- tai lajikortteja lisätessä tarkista aluekelpoisuus, käsittelyvaihe, kuvitus ja mahdollinen viivästetty tulos. Älä lisää sattumanvaraista viranomaisratkaisua tavalliseen etenemistarinaan.
