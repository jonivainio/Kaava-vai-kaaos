# Kaava vai kaaos — v5-integraation hyväksymistestit

**Testisuunnitelma, ei väite läpäistyistä pelitesteistä.** Tässä tiedostossa kaikki K-testit ovat Codexin toteutettavia ja ajettavia. Paketin mukana oleva Python-tarkistin tarkistaa vain toimitusaineiston eheyttä ja indeksiä.

Käytä testissä kontrolloitua siementä ja määriteltyä alkutilaa. Positiivinen ketjutesti ei riitä: testaa myös, ettei tapahtuma tule puuttuvalla edellytyksellä. Jokaiselle v5-tuloshaaralle tarvitaan sitä toteuttava testitapaus ja todiste siitä, että saman lähdetapauksen väärät haarat jäävät pois. Sisältö-ID:n tavoittaminen yksin ei ole haarakattavuus.

## A. Aineisto ja tekstien näyttö

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K01 | Käsikirjoituksen tuonti ja kohdistus | 159 päätöstä ja 89 tapahtumaa tunnistetaan; kaikki 248 lähde-ID:tä on kohdistettu. Pelitila-/aliasrajaukset perustellaan erikseen. Ei hiljaista sisällön katoamista. |
| K02 | Käyttäjän tekstin säilyminen | Esimerkiksi `land` säilyttää otsikon ”Kovia vaatimuksia” ja A:n ”Suostutaan sopimusmuutoksiin”. Tuotu pelaajateksti vastaa valittua lähdettä; erot raportoidaan ID:ittäin. |
| K03 | Viisi poistoa | `UUSI-P1-02`, `UUSI-P1-10`, `BESS-P1-04`, `initiative` ja `programme` eivät tule aktiiviseen peliin. Aloite ja ohjelma säilyvät prosessin vaiheina; jäljelle jääneet variantit toimivat itsenäisesti. |
| K04 | Tyyppi- ja merkitysmuutokset | `P3-SOPIMUS` vaatii valinnan. `EV-YHTEISASEMA` kertoo johtoliitynnästä, ei yhteisasemasta. 13 interlude-ID:tä ovat kokonaisia ja yksikäsitteisiä. |
| K05 | Metatieto ei näy | Pelaajalle ei tulostu `[id]`, `Haara —`, branch-ehto, `CODEX`, `Kytketyt tunnisteet`, lähdeavaimia tai muuta toteutusohjetta. Varsinainen otsikko näkyy. |
| K06 | Välitön vastaus vastaan viivästetty tulos | Tilaus ei näytä vielä lopullista lausuntoa. Haaroista näytetään vain yksi; tulostapahtumassa yhteinen teksti yhdistyy oikeaan haaraan. |
| K07 | Suomenkieliset muuttujat | Testaa lukumäärät 1, 2 ja useita, eri lajit, tuhaterotin, eurot ja loppusyyt. Ei `{count}`-jäämiä, ”1 voimalaa” tai tyhjiä selityksiä. Älä anna samaa muuttujaa eri ketjun paikkamääräksi. |

## B. Pakan muodostaminen ja tilan säilyminen

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K08 | Neljä vaihetta | Näkyvä 1–4 ja mahdollinen sisäinen 0–3 vastaavat toisiaan. Vaihesiirtymä tapahtuu oikeilla ehdoilla, ei vain kiintiön täyttyessä. |
| K09 | Vaihtoehtoiset aiheketjut | Samojen omistajien neljä vuokraehtovarianttia eivät toistu samalla kierroksella. Oman ketjun jatko ei esty alkukortin one-shot-merkintään. |
| K10 | Sisältöpankin rajaus | Yksi pelikerta ei lue koko 248 sisältöä. Jatkot tulevat vain oikeista lähteistä. Lyhyen kierroksen tavoite ei ohita pakollista päätöstä tai lupaa. |
| K11 | Alue, laji ja hankeosa | Poronhoito tarvitsee oikean alue-ehdon. Metsäpeuraselvitys ei palauta maakotkan haaraa. Aurinko- ja BESS-tekstejä ei näytetä puuttuvasta hankeosasta. |
| K12 | Kanoninen valinta | Sama A-valinta toteuttaa saman vaikutuksen riippumatta siitä, oliko se vasemmalla vai oikealla. Näppäin, hiiri ja kosketus ovat yhtäpitäviä. |
| K13 | Esikatselu ja peruutus | Kortin katsominen tai keskelle palautettu pyyhkäisy ei kuluta rahaa, aikaa tai satunnaisuutta. |
| K14 | Kaksoisvahvistus | Kaksi nopeaa tapahtumaa samalla tokenilla vahvistaa valinnan vain kerran. Ei tuplapoistoa, uutta työtä tai kaksoislaskua. |
| K15 | Palautus tallenteesta | Keskeneräinen työ, haara, sopimusmääräaika, lähdepäätös ja suunnitelmaversio säilyvät. Sama seed ja historia tuottavat saman jatkon. |
| K16 | Ehdolliset paluukortit | Verkkokortti voi palata myöhemmässä vaiheessa määritellystä ketjusta. Jo tehtyä työtä ei makseta uudelleen, mutta aidosti eri suunnitelmaversio voidaan arvioida. Koko vaihetta ei resetoida. |
| K17 | Ei ikuista silmukkaa | Saman melutakuun, BESS-esitteen tai täydennyksen odotus ei ala loputtomasti uudestaan. Kussakin paluussa on uusi vaihtoehto tai selvä loppuratkaisu. |

## C. Sopimukset, viiveet ja uudet pääketjut

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K18 | `land`-perheen B:n kolme haaraa | Hyväksyntä, tuulipalstojen menetys ja aurinkopalstojen menetys erotetaan. Tuulimäärä säilyy alkuvaiheessa v5:n mukaan; siirtovara muuttuu. Aurinkohaarassa ei menetetä myös voimaloita. |
| K19 | Allekirjoitettu etusivu | A → `EV-SOPIMUSSIVUT`: sekä vahvistus että tavoittamattomuus testataan. B jatkaa ilman kiinteistöä eikä saa A:n myönteistä vastausta. Mikään haara ei julista kaikkia vuokria mitättömiksi. |
| K20 | Odotettu oma voimala | Testaa omistajan oletus, ristiriitainen lupaus, sovittu päättäminen ja jatkoriita. `UUSI-P1-MAARIITA` tulee vain asiaankuuluvasta tuloksesta. Päättämispyyntö yksin ei poista sopimusta. |
| K21 | Poikkeusehtojen paluu | Ilman alkuperäistä poikkeusta tai tiedon leviämistä ei callbackia. Sen jälkeen `P3-SOPIMUS` on valinta. B ei pura voimassa olevia sopimuksia eikä A laskuta samaa korotusta uudelleen. |
| K22 | Yhteisen johtoliitynnän kariutuminen | A:n jälkeen todettu epäonnistuminen johtaa omaan verkkoratkaisuun. B ei saa yhteisjohdon laskua/viivettä. Tämä ehdotus ei onnistu satunnaisesti, eikä tulos kiellä yleisesti kaikkia yhteisjohtoja. |
| K23 | Aiempaan vuokraan liittyvä etusija | Suostumuksen ja kielteisen vastauksen haarat toimivat. Ristiriidan pitää koskea juuri hankkeen tarvitsemaa aluetta/käyttöä. Laajuusloppu vasta korvaavan sijoittelun tarkistamisen jälkeen. |
| K24 | 60/84 kuukauden valmisteluaika | Valinta, teksti ja sopimuskohtainen deadline täsmäävät. A ei tarkoita koko puiston käyttöajan vuokraa. Tekstiä ja sääntöarvoa ei kalibroida erilleen. |
| K25 | Viiveketjun puuttuvat ehdot | Testaa yksi kerrallaan: alle 24 kk:n vältettävä lisäviive; ei maakuntakaavariippuvuutta; ei lykkäystä; sopimus ei pääty; jatko saadaan; korvaava maa löytyy; voitto jo saatu. Mikään näistä ei saa laukaista `LOPPU-VUOKRA-AIKA`:a. |
| K26 | Määräajan ennakointi ja todellinen loppu | Kaikki ketjun ehdot täyttyvät. Ensin varoitus ja `UUSI-P4-VUOKRAJATKO`, sitten `EV-OPTIO`; vasta todellinen sopimuskatko ja vaihtoehtojen loppuminen sallivat lopun. Ennuste ei yksin poista maata. |
| K27 | Jatkoneuvottelun haarat | Testaa jatko, osittainen jatko korvaavin paikoin ja riittämätön jatko. Korotettu korvaus ei takaa kaikkia nimiä; nykyinen korvaus ei ole aina väärä valinta. |
| K28 | Märän palstan ostamatta jättäminen | Samalla maailmansiemenellä B ei luo uutta laji-/vesiongelmaa eikä rangaistusta. Perussuunnitelma pysyy aluksi samana. Piilotettu ostamatta jättämisen Game Over on kielletty. |
| K29 | Kosteikon myönteinen ketju | Osto + oikea valuma-alue + itsenäinen kuivatusongelma + kelvollinen perusväistö → `UUSI-P3-KOSTEIKKO/A` → `EV-KOSTEIKKO`. Säilytä nykyisen lisääntymispaikan vedensaanti; sama paneeliala ei palaudu kahdesti. |
| K30 | Kosteikon väärä käyttötapa estyy | Eri valuma-alue, puuttuva ostos tai väärä luontokysymys ei avaa hyötyä. Uusi kosteikko ei automaattisesti poista Natura-estettä tai oikeuta vanhan lisääntymispaikan hävittämiseen. |
| K31 | Selvitysten järjestys | Kaikki `EV-SELVITYSJARJESTYS`-haarat: luonto ensin / verkko ehtii, luonto ensin / verkko viivästyy, verkko ensin / kausi avoin, verkko ensin / kausi ohi. Myöhempi tarjous ei tilaa jo maksettua kokonaisuutta uudelleen. |
| K32 | Rinnakkaiset työt | Testiluvut: 4 kk + 6 kk samanaikaisina = 6 kk, ei 10 kk. Jälkimmäisen piteneminen 8 kuukauteen lisää tässä 2 kk. Progress-klikkaus lisää 0 kk. Käytä oikeaa riippuvuusgraafia. |
| K33 | Viiveiden syy | Yhteinen odotusaika ei kerry useaan rangaistukseen. Ulkoinen maakuntakaavaviive erotetaan pelaajan vältettävästä viiveestä. Menetetty maastokausi perustuu oikeaan kalenteriin, ei valinnan B nimeen. |

## D. Luonto, luvat, tulokset ja BESS

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K34 | Sama paikkatunniste useassa esteessä | Sama voimala poistetaan kerran. Kun yksi este ratkeaa, paikka ei palaudu, jos toinen este tai puuttuva maaoikeus estää sen edelleen. |
| K35 | Tutkimus ei muuta maailmaa | Rahoitusvalinta, esikatselu tai uudelleenlataus ei vaihda lajin esiintymistä eikä yleisen tutkimuksen tulosta. Suunnitelman muutos voi kuitenkin muuttaa hankkeen vaikutusta. |
| K36 | Kielteinen luontotulos | Oikean lajin haara johtaa korjausvalintaan vain, kun toteuttamiskelpoinen pienempi vaihtoehto on olemassa. Vaihtoehdotonta estettä ei luokitella automaattisesti huonoksi selvityspäätökseksi. |
| K37 | Kahden paikan palautus | Metsäpeuratieto → `UUSI-P3-14`; maakotkatieto → `UUSI-P4-KOTKAPAIKAT`. Vain kaksi aiemmin kyseisestä syystä poistettua paikkaa voivat tulla arvioitavaksi. Epäonnistunut palautus ei pilaa toimivaa pienempää vaihtoehtoa. |
| K38 | Puolustusvoimien käsittely | Suora kanta ei tilaa/laskuta VTT-työtä. VTT:n tulos ja Puolustusvoimien kanta erotetaan. Korkeamman muutoksen kielteinen vastaus ei automaattisesti hylkää vanhaa soveltuvaa vaihtoehtoa. |
| K39 | Menettelyn järjestys | YVA-ohjelmalausunto, perusteltu päätelmä, Natura-lausunto, kaavapäätös ja erillinen lupa eivät ole sama tila. Pelkkä selvityksen valmistuminen ei aseta kaavaa tai lupia valmiiksi. |
| K40 | Melu ja energiantuotto | Hiljainen käyttötila ei automaattisesti pienennä nimellistehoa. Takuuaineiston puute koskee juuri valittua käyttötilaa, eikä kaikkia malleja vaihdeta perusteetta 8 MW:n koneiksi. |
| K41 | BESS pois ja riippuvuudet | BESSin poisjättäminen sulkee vain sen omat tarpeettomat työt/ketjut. Tuulen luvat ja teho eivät katoa. Yhteinen tarpeellinen vesienhallinta tai muu vaikutus ei kuitenkaan poistu. |
| K42 | BESSin rajattu teho | `EV-BESS-VERKKO` → `BESS-P4-RAJAUS`: lataus- ja purkuteho muuttuvat erikseen; MWh vain laitemuutoksen perusteella. BESSin supistus ei vähennä samalla aurinkohehtaareja. |
| K43 | BESS-turvallisuuden eri aiheet | Laitetiedot, tulvariski ja häiriövesien hallinta valitsevat omat haaransa. Puuttuvasta esitteestä ei päätellä tulvaolosuhdetta. Sama työ ei palaudu rajatta. |
| K44 | Verkko ja lupatila | Verkkokartan väri ei tee liittymissopimusta. Liittymismenettelyn lupaehtoja ei käännetä rakentamisluvan ehdoksi. Valmis luvitus ei muutu tappioksi reservi- tai investointiodotuksesta. |
| K45 | Valitus ja korjaus | Pelkkä valitus ei vielä tarjoa kaavan kumoamisen korjauskorttia. Menettelykumoaminen ja selvitysten puutteesta johtuva kumoaminen saavat oikeat jatkot. KHO-haara edellyttää sitä vastaavaa prosessivaihetta. |
| K46 | Alias-/vaihtoehtoiset ilmoitukset | `adoption`/`EV-HYVAKSYNTA` eivät näy kahtena samana hyväksyntänä. `EV-LUVAT`/`ready`/`LOPPU-VOITTO` eivät ohita toisiaan väärin eivätkä pisteytä monta kertaa. |

## E. Loppu, pisteet ja tasapaino

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K47 | Voiton vaatimat luvat | Kaavan hyväksyminen yksin ei voita. Vaadittu lainvoima ja hankekohtaiset luvat tarkistetaan. BESSin tarpeeton tai pois jätetyn lisäosan lupa ei estä valmiin ydinhankkeen voittoa. |
| K48 | Voiton pysyvyys | Voittotilan jälkeen myöhässä valmistuva ulkoinen tapahtuma tai verkkotyö ei peru voittoa eikä aloita uutta tappiota. Pisteet syntyvät kerran. |
| K49 | Loppusyyn todennettavuus | Valintatappiolla on todellinen aiempi päätös ja vaihtoehto. Ulkoisella lopulla ei ole tarjolla ollutta toimivaa väistöä. Yhdistelmäsyyt säilyvät historiassa; luokkaa ei vaihdeta tavoiteprosentin vuoksi. |
| K50 | Pisteiden kirjanpito | Laajuus ≤400, aika ≤200, laatu ≤250, resurssit ≤150, summa ≤1000. Esitetyt vähennykset/tulokset täsmäävät historiaan. Ei vanhaa vähennysmallia uuden päälle. |
| K51 | Eri yksiköiden käsittely | Tuuli-MW, aurinko-MWp/MWac/ha ja BESS-MW/MWh eivät summaudu yhteiseksi näennäiseksi tuotantoluvuksi. Painotus lukitaan suhteessa lähtötavoitteeseen. |
| K52 | Useat päätösstrategiat | Nimetty vertailustrategia ja muut strategiat raportoidaan samalla validointisiemenjoukolla. Tavoiteltu noin kolmasosajakauma arvioidaan todellisista lopuista. Sama jako ei pakotu kaikkiin strategioihin. |
| K53 | Ulkoisen riskin ja lopun ero | Raportti erottaa alussa arvotun ulkoisen esteen osuuden toteutuneista ulkoisista lopuista. Aiempi todellinen valintatappio ei muutu jälkikäteen ulkoiseksi. |
| K54 | Jumi ja suoritusraja | Simulaatio raportoi deadlockit, yli pitkät ketjut ja suorituskatot virheinä, ei voittoina tai poistettuina otoksina. Kaikki mukaan otetut siemenet näkyvät nimittäjässä tai eritellyssä virheluokassa. |

## F. Näyttö, kuvitus, tallennuspäivitys ja lopputoimitus

| ID | Testattava asia | Hyväksyttävä tulos |
|---|---|---|
| K55 | Kortin luettavuus | Tarkista esimerkiksi 360, 390 ja 430 CSS-pikselin leveydet sekä työpöytä. Pisin todellinen otsikko, korttiteksti, valinta ja tulos ovat luettavia. Ei tekstin hävittävää katkaisua. |
| K56 | Kuvitus ja aiheen vastaavuus | Kuuden kuvan koe-erä ja muuttuneet aiheet katsotaan pelin normaalissa koossa. Oikeat lajit, johtoliityntä, sopimus ja akku tunnistuvat. Ei metatekstiä kuvassa, ei rikkoutunutta tiedostopolkua. |
| K57 | Haarojen kehittäjäesikatselu | Kaikki sisältö-ID:t ja tuloshaarat löytyvät paikallisesta katselmuksesta. Pakotettu testitila ei kirjoita tavallisen pelin tallennusta tai muuta sen RNG:tä. |
| K58 | Vanhan tallennuksen migraatio | Testattu migraatio säilyttää merkityksen, tai yhteensopimaton raw-tallenne säilyy vientiin. Vanha encounter-indeksi ei osoita uuden pakan eri korttiin. |
| K59 | Offline ja päivitys | Puhdas offline-avaus ja vanhasta PWA-versiosta päivitys toimivat. Ei vanhan JSON:n ja uuden moottorin yhdistelmää. Käyttäjän tallenne säilyy vientikelpoisena. |
| K60 | Lopullinen kattavuusraportti | Kaikilla 248 ID:llä on tila, runtime-kohdistus, relevantit haaratestit ja artKey. Käynnistämättömiä testejä ei ilmoiteta läpäistyiksi; estyneet ja suljetun pelitilan aineistot eritelty. |

## G. Nykyisessä tarkistetussa repossa olevat komennot

Alla olevat npm-skriptit löytyivät 8.9.2026 luetusta `package.json`:sta. Tarkista oman työkopion versio ennen ajamista. `pnpm install --frozen-lockfile` kuuluu tarpeelliseen riippuvuuksien asennukseen, ei jokaisen testin alkuun.

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm test:e2e
pnpm test:offline
pnpm simulate
```

Tarkistetun `simulate`-skriptin nykyinen koko on 3 000 siementä. V5 vaatii sen päätösstrategioiden, uusien haarojen, terminoinnin ja tulosluokkien päivittämistä. Vanhan buildin tulokset eivät todista uuden lähdekoodin tasapainoa. Laajemman validointiajon komentoliittymä on toteutettava ja dokumentoitava; sitä ei väitetä jo olemassa olevaksi.

Aja lisäksi projektissa edelleen relevantit Python-sisältövalidoinnit. Vanhat pilotin tai kampanjan tarkistukset eivät korvaa aktiivisen v5-pelin testejä. Tarvittavat selainbinäärit/riippuvuudet asennetaan ympäristön sallimalla tavalla; rajoitteet raportoidaan.

## H. Tulosten dokumentointi

Kirjaa jokaiselle ajolle commit ja paikallisen diffin tunniste, sisältö- ja sääntöversio, tarkistettu lähdehash, komento, käyttöympäristö ja tulos. Ketjutestissä lisäksi siemen/fixture, lähdekortti, kanoninen A/B, caseId, odotettu branchId, näyttöhetki ja vaikutus.

Sisältörivi ei ole ”valmis”, jos ainoastaan tekstikenttä on tuotu. Tilassa INTEGRATED_TESTED on toteutettu kelpoisuus, valinnat, haarat, ajastus, vaikutukset, tallennus ja relevantti näkyvä sisältö. Muut tilat ovat keskeneräisyyden tai rajauksen raportointia, eivät vaihtoehtoinen tapa täyttää tätä vaatimusta.
