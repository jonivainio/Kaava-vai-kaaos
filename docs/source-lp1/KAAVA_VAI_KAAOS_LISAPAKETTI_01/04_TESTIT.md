# Hyväksymistestit ja luovutuksen näyttö

Tässä on **60 nimettyä hyväksymistapausta** ja **33 tapahtumahaaran** kattavuusvaatimus. Tilat ovat tarkoituksella `not_run`: tämä toimitus ei muuta tai suorita peliä. Paketin oma Python-tarkistus varmistaa vain tiedostorakenteen.

## Testausjärjestys

1. Paketin eheys: `python tools/check_package.py` paketinhakemistossa.
2. Paikallisen pelin nykyiset testit, tyypitys ja build ennen muutoksia ja niiden jälkeen.
3. Uudet mode-/case-/konversiokohtaiset yksikkö- ja tilasiirtymätestit.
4. Selaimen E2E-koe kaikille moodeille sekä yhdelle onnistuneelle ja yhdelle epäonnistuneelle aurinkojatkolle.
5. Talletus/replay/PWA-kokeet ja simulaatiot vasta uuden buildin jälkeen.

Nykyisessä package.json:ssa tarkastetut komennot ovat `pnpm test`, `pnpm typecheck`, `pnpm build`, `pnpm test:e2e`, `pnpm test:offline` ja `pnpm simulate`. Viimeinen käyttää `tools/simulate-v5.mjs 3000` -skriptiä. **Älä oleta sen osaavan uusia mode- tai continuation-lippuja**: toteuta tarvittava ohjaus ja dokumentoi todelliset komennot. Tarkista asennetut riippuvuudet ennen asennuksia; älä päivitä koko työkalupinoa sivutyönä.

## Simulaation raportointisopimus

Tee ensin 100 siemenen savukoe jokaiseen aloitusmuotoon. Varsinainen vertailu: 3 000 siementä / aloitusmuoto ennalta nimetyllä vertailupelaajalla, lisäksi 1 000 / moodi kahdella erilaisella politiikalla (esimerkiksi varovainen ja laajuutta tavoitteleva). Yhteensä 15 000 ajoa. Käytä vakaita siemeniä ja samaa maailmaa strategioiden vertailussa, älä päättele hyviä vastauksia piilotetuista tuloksista vertailustrategialle.

Raportoi työn lähdecommit, content/rulesversion, siemenjoukko ja strategian sääntökoodi. Peruskiintiöt, pakolliset jatkot, kysymysdialogit ja näkyvät ajankulkunäkymät lasketaan erikseen. Näytä p50/p90/maksimi päätöksistä, aika-, raha- ja laajuustuloksista sekä loppumattomat/virheelliset ajot (tavoite 0). Yli 200 toiminnon run on selvitystä vaativa watchdog-havainto, ei automaattisesti hyväksytty ”pitkä pelitilanne”.

Kolmasosat ovat pelitasapainon lähtötavoite. Älä pakota niitä kaikille politiikoille tai muodosta tuloksia suoraan siemenjakaumaa nimeämällä. Esitä lukumäärät ja osuudet, mielellään binomisen osuuden epävarmuusväli. Konversioiden jälkeen lopullinen voittosuhde saa muuttua. Säilytä 03:n alkuperäisen hybriditavoitteen ja lopullisen aurinkojatkon erilliset tilastot.

Yhden toimivan demon siemen ei korvaa negatiivisia testejä. Jos jotakin uutta alkutilannetta ei simulaation aineistossa esiinny, rakenna sille deterministinen kelpoisuusfikstuuri; älä poista haastavaa haaraa sisällöstä kattaaksesi testin.

## Hyväksymistapaukset

### LP1-QA-001 — Valikkovalinta toimii

**Lähtö:** Nykyinen päävalikko; ei avointa tallennetta

**Toiminta:** Valitse vuorotellen Tuuli, Aurinko ja Hybridi; aloita kukin

**Odotettu:** Valinta, kuvaus ja uuden pelin originMode vastaavat valintaa; ei oletushybridiä kaikkien nappien takana.

### LP1-QA-002 — Jatka ei vaihda moodia

**Lähtö:** Tallennettu Aurinko; valikossa valittu Tuuli uudelle pelille

**Toiminta:** Paina Jatka

**Odotettu:** Sama Aurinko-hanke avautuu; ei uutta maailmaa eikä tuotantomuodon muutosta.

### LP1-QA-003 — Tuulen fyysiset invarianssit

**Lähtö:** Uusi wind; kaikki sen lailliset tapahtumareitit

**Toiminta:** Aja valmistumis-/häviöpolut ja jokainen siemenellinen vaihe

**Odotettu:** SolarHa/MWp/MWac=0, ei aktiivisia solarBlockeja, akku excluded; ei niiden maksuja tai vaadittuja lupia.

### LP1-QA-004 — Auringon fyysiset invarianssit

**Lähtö:** Uusi solar

**Toiminta:** Aja valmistumis-/häviöpolut ja kaikki edellytysten mukaiset jatkot

**Odotettu:** WindCount/MW=0, ei aktiivisia windSiteja tai wind-permittejä; ei BESSiä.

### LP1-QA-005 — Jonotuksen ohitus estetään

**Lähtö:** Puhtaaseen aurinkopeliin yritetään jonottaa defence ja tuulipeliin solarNature

**Toiminta:** Kutsu samaa jonotus- ja julkaisupolkua kuin pakolliset jatkot

**Odotettu:** Soveltumaton sisältö estetään ennen pelaajalle näyttöä ja sen vaikutusta; ei hiljaista tilan korruptiota.

### LP1-QA-006 — Shared ei ole kaikille salliva

**Lähtö:** Yhteiseksi merkitty omaa tuulta edellyttävä melu-/tutkimuscase

**Toiminta:** Testaa aurinkomoodin modeAllows sekä resolver

**Odotettu:** Ilman oikeaa omaa lähdettä case ei kelpaa; ei paneelille kirjoitettua törmäysriskiä.

### LP1-QA-007 — Maanomistajan oikea haara

**Lähtö:** land-perhe; kielteinen B, omat aurinkolohkot tai tuulipaikat

**Toiminta:** Aja molemmat puhtaat muodot samoilla owner-faktoilla

**Odotettu:** Aurinko menettää vain sidotun lohkon; Tuuli käyttää tuulimaan vaikutusta; ei väärää vastausta.

### LP1-QA-008 — Esityskerroksen oikea tekniikka

**Lähtö:** Kaikki 248 vanhaa ID:tä ja uudet ID:t sopivissa fikstuureissa

**Toiminta:** Renderöi otsikko, body, reaktio, lyhyt tulos, puhuja ja art

**Odotettu:** Ei oman puuttuvan tekniikan toimintaa tai lupaa. Kaikki havaitut osumat tarkistetaan sisällöllisesti, ei pelkällä sanakiellolla.

### LP1-QA-009 — Aurinkopeli ilman YVAa

**Lähtö:** Alkuperusteinen profiili, yvaDetermined ja notRequired

**Toiminta:** Aja kaikki neljä vaihetta

**Odotettu:** Ei yvaConclusions-tapahtumaa tai YVA-selostuksen tilausta; vaikutusselvitykset, kaava ja luvat eivät ohitu.

### LP1-QA-010 — Aurinkopeli YVAlla

**Lähtö:** Profiilin vaikutukset edellyttävät YVAa

**Toiminta:** Aja samoista alkutiedoista molemmat A/B-strategiat

**Odotettu:** Ohjelma, selostus, kuuleminen ja päätelmä vaaditaan; raha ei osta no-YVA-vapautusta.

### LP1-QA-011 — Tuntematon menettelytarve

**Lähtö:** Aurinko, YVA-tarve vielä selvittämättä

**Toiminta:** Yritä siirtyä lupavoittoon tai käyttää no-YVA-otsikkoa

**Odotettu:** Tuntematonta ei tulkita päätökseksi ettei menettelyä tarvita.

### LP1-QA-012 — BESSin pakotettu kortti puhtaassa tilassa

**Lähtö:** Vaihe2 ja vanha battery-undecided-promootio

**Toiminta:** Aja director/candidate

**Odotettu:** BESS-P2-04 ei ohita modeAllows-tarkistusta; puhdas tila ei jää odottamaan akkua.

### LP1-QA-013 — Poolin kattavuus

**Lähtö:** Puhtaat moodit ja kaikki sallitut päävaiheet

**Toiminta:** Laske soveltuvat alkutilanteet ja aja realistinen pelikerta

**Odotettu:** Tarpeelliset vaiheet valmistuvat. Ei täytekortteja toisesta moodista, endlesstilaa tai pakollista mahdotonta casea.

### LP1-QA-014 — Hybridin regressio

**Lähtö:** Nykyiset v5-siemenet ja julkaistut peruspolut

**Toiminta:** Aja ennen/jälkeen samalla hybridiprofiililla

**Odotettu:** Vanha sisältö ja akkupolku säilyvät lukuun ottamatta nimenomaisia uusia valintoja; ei v5-tekstien palautusta vanhemmiksi.

### LP1-QA-015 — Puolustuksesta tarjous eikä automaatio

**Lähtö:** Hybrid; independentSolar1; kaikki kelpoisuusehdot; lopullinen kielteinen EV-PV

**Toiminta:** Ratkaise puolustuksen havainto

**Odotettu:** Tuuliesteteksti ja LP1-H01 näkyvät. Tuuliosaa ei poisteta ennen A:ta, ending null, ei automaattista defenceStopsWind-jatkoa.

### LP1-QA-016 — VTT:n kielteinen loppukanta

**Lähtö:** Sama jatkokelpoinen hybrid VTT-työn kautta

**Toiminta:** Julkaise EV-VTT-TULOS

**Odotettu:** Sama yhtenäinen tarjousportti; ei toinen rinnakkainen tarjous tai ennenaikainen finish.

### LP1-QA-017 — Kieltäytyminen

**Lähtö:** LP1-H01 offered

**Toiminta:** Valitse B

**Odotettu:** Alkuperäinen failure finalize, ei jatkotarkistuksen laskua tai wind/solar-resettiä, ei kieltäytymisestä uutta väärän valinnan luokkaa.

### LP1-QA-018 — Hyväksyminen atomisena

**Lähtö:** LP1-H01 offered; tunnetut kustannukset/aika/paikat

**Toiminta:** Valitse A

**Odotettu:** originMode hybrid, activeMode solar, route hybrid_solar, sama identiteetti/seed/historia/aika/raha; ei lisäaurinkoalaa.

### LP1-QA-019 — Ei puhtaista moodeista

**Lähtö:** wind tai solar; sama failure kuin hybridissä

**Toiminta:** Aja failure-portti

**Odotettu:** Ei LP1-H01:tä eikä aurinkoalaa lisätä wind-runille.

### LP1-QA-020 — Ei yhteisestä esteestä

**Lähtö:** Hybrid, kunnan kielto kaikille vaihtoehdoille tai ei toimivaa yhteistä verkkoa

**Toiminta:** Aja failure-portti

**Odotettu:** Ei aurinkojatkotarjousta vaikka independentSolar-lippu olisi1.

### LP1-QA-021 — Ei kaikkialta vetäytyvän omistajan jatkoa

**Lähtö:** Omistaja lopettaa kaiken kehityksen; ei jatkajaa

**Toiminta:** Julkaise ulkoinen omistajatapahtuma

**Odotettu:** Tarjous ei ilmesty ristiriidassa ilmoitetun vetäytymisen kanssa.

### LP1-QA-022 — Luontohaitta koskee myös paneeleja

**Lähtö:** Tuuliosa epäonnistuu, mutta sama yhteys katkeaa aurinkoaidoista/tiestä

**Toiminta:** Aja kelpoisuus

**Odotettu:** Pelkkä wind-komponenttileima ei vapauta aurinkoa; yhteinen tunnettu este estää tarjouksen.

### LP1-QA-023 — Aurinkolaajuus ei riitä

**Lähtö:** Aiemmat aurinkopoistot laskeneet alan alle jatkorajan

**Toiminta:** Ratkaise tuulieste

**Odotettu:** Ei tarjousta; alkuperäistä aurinkoalaa ei palauteta.

### LP1-QA-024 — Akku ei ole erotettavissa

**Lähtö:** Solarjatko olisi ilman BESS-erottelua mahdoton

**Toiminta:** Ratkaise tuulieste

**Odotettu:** Ei tarjoilla puhdasta aurinkojatkoa tai poisteta akun yhteisiä velvoitteita.

### LP1-QA-025 — Ei onnistumisen jälkeen

**Lähtö:** permitGoalReached tosi / win valmis

**Toiminta:** Syötä vanhentunut tuuliestetulos

**Odotettu:** Voitto ei muutu tappioksi tai jatkopyynnöksi.

### LP1-QA-026 — Yksi tarjous ja oikea token

**Lähtö:** Sama failure kahdesta järjestelmäkutsusta

**Toiminta:** Aja kahdesti ja tuplaklikkaa A samalla tokenilla

**Odotettu:** Vain yksi tarjous, yksi konversio, yksi tarkistusmaksu.

### LP1-QA-027 — Tulevat wind-tulokset perutaan

**Lähtö:** A:n jälkeen kalenterissa puolustus-, melu- ja solar/shared-työtä

**Toiminta:** Etene seuraaviin valmistumisiin

**Odotettu:** Tarpeettomat wind-case-tulokset eivät näy; solar/shared-työt sekä oikeat yhteisvaikutukset säilyvät.

### LP1-QA-028 — Jo valmistunut havainto säilyy

**Lähtö:** Wind- ja yhteisiä luontohavaintoja historiassa

**Toiminta:** Konvertoi aurinkoon

**Odotettu:** Ei vanhojen faktojen tai kulujen pyyhintää; niiden soveltuvuus arvioidaan eikä kaikki case-status resolved kerralla.

### LP1-QA-029 — Esityssiirtymä

**Lähtö:** Hybridi → Aurinko A

**Toiminta:** Renderöi seuraava toimintakortti, HUD ja valikko

**Odotettu:** Aktiivinen aurinko, selkeä reittinimi, vanha tuuliluku vain historiassa; ei uuden aurinkorunin nimeä.

### LP1-QA-030 — Myöhempi vaihe ei aloita kaikkea alusta

**Lähtö:** Tarjous vaiheessa4; useita käyttökelpoisia aurinkoselvityksiä

**Toiminta:** Hyväksy ja viimeistele delta-review

**Odotettu:** Hyödylliset selvitykset ja toteutuneet vaiheet säilyvät, muuttunut ehdotus/luvat arvioidaan; ei reset 18 korttia tai suora voitto.

### LP1-QA-031 — Tarkistus vähentää paneelialaa

**Lähtö:** LP1-E-H02/reduced ja soveltuva tutkittu layout

**Toiminta:** Valitse H02/A ja toista tulostoiminto

**Odotettu:** Ala vähenee kerran täsmälleen sidotuista lohkoista; remainingSolarHa pitää paikkansa eikä tuulialaa muutu paneeleiksi.

### LP1-QA-032 — Avoin itsenäisyyden kysymys jää kielteiseksi

**Lähtö:** Tarjouksessa aidosti avoin, preseed aurinkokysymys

**Toiminta:** Tarkistus H02/blocked

**Odotettu:** Kirjaa todellinen uusi havainto; ei toista konversiota eikä uusi muodonvaihtorangaistusarpa.

### LP1-QA-033 — Jatkon onnistuminen

**Lähtö:** Aurinkojatkon oikeat luvat, lainvoima ja tarkistukset valmiit

**Toiminta:** Viimeistele

**Odotettu:** Vain yksi win tekstillä LP1-E-H03, route hybrid_solar; ei myös alkuperäisen hybridin win.

### LP1-QA-034 — Tallennus tarjouksen jokaisessa rajapisteessä

**Lähtö:** Ennen syytulosta, tarjouksessa, A:n jälkeen, tarkistuksen odotuksessa, tuloksessa

**Toiminta:** serialize→restore→jatka

**Odotettu:** Sama tila ja haara; replay alkaa alkuperäisestä hybridistä; kaikki hash/versiovaatimukset täyttyvät.

### LP1-QA-035 — Teknisen vahvistuksen replay

**Lähtö:** LP1-D-T04 / D-A04 / D-Y01 avoinna

**Toiminta:** Vahvista molemmat haarat erillisissä koeajoissa ja lataa

**Odotettu:** Vahvistus toistuu toimintohistoriasta; ei kliinisen UI:n kirjoitusta suoraan moottoritilaan.

### LP1-QA-036 — Vanhan sääntöversion turvallinen avaus

**Lähtö:** v5-rules-3-tallenne uuden sääntöversion sovelluksessa

**Toiminta:** Avaa vanha tallenne

**Odotettu:** Vain dokumentoitu migraatio/vanhaversioreplay tai säilytys vientiin. Ei toisto uusilla säännöillä tai tietojen hävitys.

### LP1-QA-037 — Keskeytetty pyyhkäisy

**Lähtö:** Mikä tahansa uusi kortti tai H01

**Toiminta:** Vedä ja palauta keskelle

**Odotettu:** Ei uusia töitä, kustannuksia, haaravalintaa tai siemenvirran muutosta.

### LP1-QA-038 — Aurinkojatkon alkuperäinen nimittäjä

**Lähtö:** Alussa100ha, tarjouksessa70ha, lopussa60ha

**Toiminta:** Laske jatkon scope

**Odotettu:** Pinta-alasuhde60/100, ei60/70 tai100%; originalinitial muuttumaton.

### LP1-QA-039 — Koko kustannushistoria mukana

**Lähtö:** Hybridin kehityskulut100k, jatkon8k ja muita asianmukaisia kuluja

**Toiminta:** Laske resurssipisteet

**Odotettu:** Kaikki maksetut kulut mukana; ei konversion hyvitystä tai tulevan investoinnin kokonaiskulua kehityslaskuun.

### LP1-QA-040 — Nollanimittäjät

**Lähtö:** Wind ilman solaria ja solar ilman windiä

**Toiminta:** Laske HUD/arvot/score

**Odotettu:** Ei NaN/Infinity/virheellistä0/0; puuttuville hankeosille ei miinuspisteitä.

### LP1-QA-041 — Viive ei ole työmäärien summa

**Lähtö:** Kaksi päällekkäistä2kktyötä

**Toiminta:** Etene molempien valmistumiseen

**Odotettu:** Kelloon vain todellinen2kkjakso; vältettävä viive määrittyy baseline-laskennasta, ei 4 kk automaattisesti.

### LP1-QA-042 — Varjo ja nimellisteho

**Lähtö:** LP1-T01/A; kaksi aktiivista paikkaa

**Toiminta:** Julkaise control ja myöhemmin poista samat paikat

**Odotettu:** Alkuun vain vuosienergiakerroin; myöhemmässä poistossa ei samoista koneista jää haamurajoitusta muille.

### LP1-QA-043 — Television lisämittaus ei toistu

**Lähtö:** T02/B ja desk-puute

**Toiminta:** Etene measure_later → lisätyö → tulos

**Odotettu:** Mittaus tilataan kerran; seuraava tulos baseline_clear/mitigation, ei uudelleen measure_later.

### LP1-QA-044 — Kuljetusmallia ei vaihdeta tilattaessa

**Lähtö:** T04/B

**Toiminta:** Tilaa vertailu ja vahvista D-T04/B

**Odotettu:** Voimalamalli ennallaan vertailun ajan ja B:n jälkeen; kiertoreitti tilataan kerran; grid-km ei kasva kuljetusmatkasta.

### LP1-QA-045 — Paneelipinta ei automaattisesti ratkaise häikäisyä

**Lähtö:** A01/A ja surfaceMitigatesfalse

**Toiminta:** Etene A05 ja kokeile A/B

**Odotettu:** Oikea tutkittu korjaus tai sama lohko pois; ei lentoturvallisuusluvan automaattista myöntämistä.

### LP1-QA-046 — Sulfaattiepäily ei ole näytetulos

**Lähtö:** A02/B

**Toiminta:** Poista lohko ja renderöi excluded

**Odotettu:** Teksti ei väitä näytteiden todistaneen riskiä; maahan sidottu epäily ei muutu toteutuneeksi pilaantumiseksi.

### LP1-QA-047 — Matalampi kaivu vaatii soveltuvan suunnitelman

**Lähtö:** A02/A riskituloksella

**Toiminta:** Tarjoa A06

**Odotettu:** A-vaihtoehto edellyttää todellista skenaariossa tutkittua vaihtoehtoa; kaikki mielivaltaiset maaperät eivät saa varmaa oikotietä.

### LP1-QA-048 — Laidunnuksesta kieltäytyminen

**Lähtö:** A03/B

**Toiminta:** Julkaise mowing

**Odotettu:** Ei tuulivoimaa, BESSiä, automaattista luontotappiota tai uutta pakollista laidunnuskorttia.

### LP1-QA-049 — DC/AC-vaihtoehto ei lisää verkon tehoa

**Lähtö:** A04/A myönteinen ja D-A04/A

**Toiminta:** Hyväksy suurempiDC

**Odotettu:** Vientiraja ja invertterinAC pysyvät määritellyssä arvossa; suurempiDC vain varatussa tilassa; vuosienergia ei oleDC−ACvähennys.

### LP1-QA-050 — Kaksi kuntaa

**Lähtö:** Y01 ennen kunta 2:n päätöstä; kunta 1 hyväksynyt

**Toiminta:** Tarkista voitto ja seuraavat haarat

**Odotettu:** Ei voittoa kunta 1:n päätöksestä; kuntakohtaiset hyväksyntä/lainvoima ja erottelu huomioidaan; vain todelliset tuotanto-osat poistuvat.

### LP1-QA-051 — Rytmi ei nollaudu jatkossa

**Lähtö:** Ennen konversiota jo2 ajankulkukorttia

**Toiminta:** Etene aurinkojatko loppuun

**Odotettu:** Enintään3 koko istunnossa ja 1 vaihetta kohti; ei peräkkäisiä. Jatkotarjous ja olennainen kielteinen tulos säilyvät näkyvinä.

### LP1-QA-052 — Tuntematon uusi event ei katoa

**Lähtö:** UusiLP1resolver julkaisee olennaisen tuloksen

**Toiminta:** Kutsu compactNarration

**Odotettu:** Ei automaattista silent-progress-luokkaa; uusihaara on explicitdisplaypolicyssä ja metadata ei näy.

### LP1-QA-053 — Mobiiliasettelu ja näppäimistö

**Lähtö:** 360,390,430pxleveydet ja normaalileveädesktop

**Toiminta:** Testaa kaikki uudet otsikot, vaihtopainikkeet, kortit ja vahvistukset

**Odotettu:** Ei leikkautuvaa tekstiä, päällekkäisiä mittareita, piilotettuja valintoja tai lukukelvotonta pientäfonttia; nuolinäppäinpolku toimii.

### LP1-QA-054 — Kuvitus vastaa aktiivista tekniikkaa

**Lähtö:** Kaikkien modeoverridejen art ja LP1sisällöt

**Toiminta:** Visuaalinen katselmus normaalikoossa

**Odotettu:** Ei väärän oman tekniikan proppia. Konversion historiallinen tuuliselitys erotetaan aktiivisesta aurinkokortista.

### LP1-QA-055 — Päivityskokonaisuus offline

**Lähtö:** VanhaPWA, uusiversio ja vanhatallenne

**Toiminta:** Päivitä, katkaiseverkko, jatka/vie

**Odotettu:** Sama content/rules/assetversio; ei mixedcachea eikä tallenteen pyyhintää.

### LP1-QA-056 — Kohtuullinen lisäpituus

**Lähtö:** Kolmen aloitusmuodon nimetty vertailustrategia ja siemenjoukko

**Toiminta:** Aja15 000 toistettavaa koetta04:n mukaisesti

**Odotettu:** Peruspäätökset/jatkot/odotukset erikseen; pituusjakauma ja saavutettavuus raportoitu; ei vain keskiarvo tai piilotettu haarojen poistaminen.

### LP1-QA-057 — Jatko ei vääristä tilastoa

**Lähtö:** HybridifailjaLP1-H01tarjoukset

**Toiminta:** Raportoi esijatko- ja lopputulokset

**Odotettu:** Tarjottu/hyväksytty/pelastunut eri nimittäjillä; hybridvoitot ja hybrid_solarvoitot eivät sama luokka.

### LP1-QA-058 — Uusien sisältöjen kattavuus

**Lähtö:** Kaikki 13 + 11 + 3 lähdetunnistetta

**Toiminta:** Vertaa runtime rekisteriin ja testikuviin

**Odotettu:** Jokainen on toteutettu tai täsmällisesti avoin; ei prose-onlyhaaraa tai nimeämätöntä fallbackia.

### LP1-QA-059 — Vanhat poistetut kortit eivät palaudu

**Lähtö:** Nykyinen 248 ID:n pankki ja poistettujenlista

**Toiminta:** Generoi uudetpakatsave

**Odotettu:** initiative, programme, UUSI-P1-02, UUSI-P1-10, BESS-P1-04 eivät palaudu poistettuina runkokortteina.

### LP1-QA-060 — Lähteet eivät muutu tositarinaksi

**Lähtö:** Kaikki uudet pelaajatekstit

**Toiminta:** Tarkista tekstit ja kuvat

**Odotettu:** Ei oikeita hankkeita, kuntanimiä, yrityksiä, lähdekoodeja tai pitkiä tekniikkaohjeita; lähteet dokumentaatiossa.

## Tapahtumahaarojen kattavuus

Kaikki alla olevat haarat saavat oman positiivisen testin ja saman casen väärän lähteen/valinnan/revision negatiivisen testin. Näitä ei saa korvata yhdellä `branch exists` -testillä. Tarkat ehdot ja vaikutukset ovat data/hyvaksyntatestit.json:ssa ja 02:ssa.

- `LP1-E-T01/control`
- `LP1-E-T01/removed`
- `LP1-E-T02/baseline_clear`
- `LP1-E-T02/mitigation`
- `LP1-E-T02/measure_later`
- `LP1-E-T02/desk_clear`
- `LP1-E-T03/bridge_ok`
- `LP1-E-T03/bridge_no`
- `LP1-E-T03/bypass_ok`
- `LP1-E-T03/model_report`
- `LP1-E-A01/surface_ok`
- `LP1-E-A01/surface_no`
- `LP1-E-A01/layout_ok`
- `LP1-E-A01/block_out`
- `LP1-E-A02/no_acid`
- `LP1-E-A02/risk`
- `LP1-E-A02/shallower`
- `LP1-E-A02/excluded`
- `LP1-E-A03/grazing`
- `LP1-E-A03/not_suitable`
- `LP1-E-A03/mowing`
- `LP1-E-A04/useful`
- `LP1-E-A04/weak`
- `LP1-E-A04/small`
- `LP1-E-Y01/both`
- `LP1-E-Y01/exclude_after_wait`
- `LP1-E-Y01/separated`
- `LP1-E-H01/converted`
- `LP1-E-H02/reuse`
- `LP1-E-H02/supplement`
- `LP1-E-H02/reduced`
- `LP1-E-H02/blocked`
- `LP1-E-H03/rescued_win`

## Luovutuksen hyväksyminen

PASS edellyttää testin oikeaa havaintoa. Ilmoita BLOCKED/NOT TESTED ja syy, jos ympäristö ei tue koetta. Älä väitä fyysistä iPhonea testatuksi Chromiumin mobiiliemulaatiolla. Visuaaliset kuvat arvioidaan katsomalla, eivät vain assetin olemassaololla. Julkaisu sallitaan vain projektin valtuutuksen ja onnistuneen tuotantopaketin tarkistusten perusteella.
