import { writeFileSync } from "node:fs";
const adjust = (field, value) => ({ op: "adjust", field, value });
const opt = (label, budget, time = 0, tag = "", extra = []) => ({
  label,
  budget,
  time,
  tag,
  extra,
});
const rows = [];
function add(stage, title, body, left, right, art = "planner", extra = {}) {
  rows.push({ stage, title, body, left, right, art, ...extra });
}
// Authored fictional situations. Explicit tags are interpreted by the procedure module;
// neither this compiler nor the runtime extracts mechanics from the Finnish prose.
add(
  0,
  "Ensimmäinen rajaus",
  "Kartalle mahtuu hanke. Kiinteistörajat eivät aivan noudata kartalle piirrettyä ajatusta. Aloitetaan yhteydenotoista.",
  opt("Neuvotellaan koko alueesta", -2, 1, "landScope"),
  opt("Aloitetaan ydinalueesta", -1, 2, "landScope"),
  "landowner",
);
add(
  0,
  "Sama pelto, kolme omistajaa",
  "Yksi omistajista on jo vastannut. Kaksi muuta eivät ole vielä nähneet sopimusluonnosta. Allekirjoituksille jätetty tila on optimistinen.",
  opt("Kootaan yhteinen neuvottelu", -2, 1, "owners"),
  opt("Käydään ehdot yksitellen", -1, 2, "owners"),
  "landowner",
);
add(
  0,
  "Tie ei kuulu kauppaan",
  "Vuokrattavalle alueelle pääsee tietä pitkin. Tieoikeuksien selvitys ei vielä vahvista, että sama koskee hankkeen liikennettä.",
  opt("Sovitaan kulkuoikeuksista nyt", -3, 1, "access"),
  opt("Suunnitellaan toinen sisääntulo", -2, 2, "access"),
  "consultant",
);
add(
  0,
  "Sopimuksen pieni liite",
  "Korvausperusteet on sovittu. Maanomistaja pyytää vielä liitettä alueen ennallistamisesta. Kukaan ei pidä pyyntöä huonona, vain myöhäisenä.",
  opt("Täsmennetään vastuut liitteeseen", -2, 0, "restoration"),
  opt("Käydään ehdot yhdessä läpi", -1, 1, "restoration"),
  "landowner",
);
add(
  0,
  "Määräaika löytyy lopusta",
  "Optio kattaa suunnitellun valmistelun. Jatkosta tarvitaan erillinen sopimus, jos selvityskalenteri venyy.",
  opt("Sovitaan jatkoehdot valmiiksi", -3, 0, "leaseLong"),
  opt("Pidetään lyhyempi optio", 0, 0, "leaseShort"),
  "landowner",
);
add(
  0,
  "Ensimmäinen budjettipäätös",
  "Omistaja hyväksyy seuraavan kehityserän. Hän haluaa tilannekuvan, jonka liikennevalot eivät kaikki perustu samaan oletukseen.",
  opt("Raportoidaan avoimet riskit", 16, 1, "funding"),
  opt("Sovitaan tiheämmät tarkistukset", 14, 0, "funding"),
  "authority",
);
add(
  0,
  "Maanhallinta pöydälle",
  "Alue, osapuolet ja tarvittavat oikeudet kootaan samaan karttaan. Tiedostonimessä ei vielä käytetä sanaa lopullinen.",
  opt("Varmistetaan allekirjoitukset", -2, 1, "leases"),
  opt("Suljetaan puutteet juristin kanssa", -3, 0, "leases"),
  "landowner",
);

add(
  1,
  "Kaava-aloitteen luonnos",
  "Kunnan kanssa sovitaan aloitteen sisällöstä. Tiivistelmä on valmis. Taustaliitteet tarvitsevat vielä oman tiivistelmänsä.",
  opt("Viimeistellään aineisto yhdessä", -2, 1, "initiative"),
  opt("Toimitetaan tiivis aloite liitteineen", -3, 0, "initiative"),
);
add(
  1,
  "Maakuntakaavan mittakaava",
  "Hanke sopii kartalle, mutta sen suhde maakuntakaavaan pitää selvittää. Mittakaavan vaihtaminen ei ratkaise asiaa.",
  opt("Tilataan yhteensopivuustarkastelu", -3, 1, "regional"),
  opt("Verrataan suppeampaa vaihtoehtoa", -2, 2, "regional"),
  "consultant",
);
add(
  1,
  "Liityntäkysely lähtee",
  "Verkkoyhtiö tarvitsee tehon, aikataulun ja vaihtoehdot. Aikataulun perään lisätään sana alustava.",
  opt("Tilataan tekninen tarkastelu", -3, 0, "gridOrder", [
    { jobId: "grid_initial", afterMonths: 3, flag: "gridResponseReady" },
  ]),
  opt("Rajataan kaksi liityntäpistettä", -2, 1, "gridOrder", [
    { jobId: "grid_initial", afterMonths: 4, flag: "gridResponseReady" },
  ]),
  "substation",
);
add(
  1,
  "Puolustus ja ilmailu",
  "Korkeiden rakenteiden soveltuvuus pyydetään arvioitavaksi. Kartan korkeuslukema tarvitsee lausunnon, ei lisää desimaaleja.",
  opt("Selvitetään koko suunnitelma", -3, 1, "technical"),
  opt("Tutkitaan samalla matalampi vaihtoehto", -4, 0, "technical"),
  "authority",
  { windOnly: true },
);
add(
  1,
  "Kyläilta kalenteriin",
  "Ensimmäinen yleisötilaisuus on tulossa. Useimmat kysymykset koskevat näkymiä, liikennettä ja sitä, mitä tässä vaiheessa oikeasti tiedetään.",
  opt("Esitellään myös epävarmuudet", -2, 1, "engagement"),
  opt("Kootaan kysymykset ennakkoon", -1, 1, "engagement"),
  "planner",
);
add(
  1,
  "Kunnan aloituspäätös",
  "Aloite tulee käsittelyyn. Kehittäjä voi täydentää aineistoa, mutta kunta ratkaisee, aloitetaanko valmistelu.",
  opt("Toimitetaan päätösaineisto", -1, 1, "municipality", [
    { jobId: "municipality_decision", afterMonths: 1, flag: null },
  ]),
  opt("Täsmennetään rajaus ennen käsittelyä", -2, 2, "municipality", [
    { jobId: "municipality_decision", afterMonths: 2, flag: null },
  ]),
  "authority",
);
add(
  1,
  "Valmistelu saa työohjelman",
  "Kunta on päättänyt aloittaa valmistelun. Rakentamisesta ei ole päätetty. Tämä ero mahtuu juuri yhteen kalvoon.",
  opt("Sovitaan yhteinen työohjelma", -1, 0, "stageReady"),
  opt("Kootaan vastuut kirjallisesti", -2, 0, "stageReady"),
);

add(
  2,
  "Arvioinnin laajuus",
  "Arvioitavat vaihtoehdot ja vaikutukset kootaan ohjelmaan. Nollavaihtoehto ei tarkoita tyhjää sivua.",
  opt("Verrataan kahta toteutusvaihtoehtoa", -3, 1, "scope"),
  opt("Syvennetään rajattua vaihtoehtoa", -2, 2, "scope"),
  "consultant",
);
add(
  2,
  "Selvityskausi ei siirry",
  "Maastotyön ajankohta riippuu selvityksen kohteesta. Hankintapäätös on seuraavassa kokouksessa, sopiva kausi alkaa jo ennen sitä.",
  opt("Varmistetaan tekijä ajoissa", -5, 0, "ecologyOrder", [
    { jobId: "ecology_surveys", afterMonths: 4, flag: "ecologyReady" },
  ]),
  opt("Varataan seuraava sopiva kausi", -2, 0, "ecologyOrder", [
    { jobId: "ecology_surveys", afterMonths: 8, flag: "ecologyReady" },
  ]),
  "consultant",
);
add(
  2,
  "Tuulen oma kalenteri",
  "Mittaus kannattaa käynnistää muiden selvitysten rinnalla. Tuloksia ei voi aikaistaa siirtämällä raportin palautuspäivää.",
  opt("Aloitetaan mittaus nyt", -5, 0, "windOrder", [
    { jobId: "wind_measurement", afterMonths: 12, flag: "windMeasured" },
  ]),
  opt("Hyödynnetään olemassa oleva mittaus", -7, 0, "windOrder", [
    { jobId: "wind_measurement", afterMonths: 6, flag: "windMeasured" },
  ]),
  "consultant",
  { windOnly: true },
);
add(
  2,
  "Myös johto arvioidaan",
  "Arvioinnin kartassa on tuotantoalue ja sähkönsiirron reitti. Jälkimmäisen vaikutukset eivät jää nuolen kärkeen.",
  opt("Täydennetään reittivaihtoehdot", -3, 1, "routeScope"),
  opt("Sovitaan tarkastelun rajaus", -2, 2, "routeScope"),
  "substation",
);
add(
  2,
  "Natura-alue tarkastelussa",
  "Lähialueen suojeluarvoihin kohdistuvat vaikutukset pitää selvittää. Etäisyys kartalla ei yksin ratkaise arvioinnin tarvetta.",
  opt("Tilataan arviointitarpeen tarkastelu", -3, 0, "naturaOrder", [
    {
      jobId: "groundwater_study",
      afterMonths: 3,
      flag: "groundwaterStudyReady",
    },
  ]),
  opt("Tarkennetaan ensin vaikutusreitit", -2, 1, "naturaOrder", [
    {
      jobId: "groundwater_study",
      afterMonths: 4,
      flag: "groundwaterStudyReady",
    },
  ]),
  "consultant",
);
add(
  2,
  "Ohjelmasta saatu palaute",
  "Lausunto pyytää täsmentämään yhteisvaikutuksia. Sama kappale oli kyllä mukana, mutta se vastasi hieman eri kysymykseen.",
  opt("Täydennetään tarkastelun sisältö", -2, 1, "programme"),
  opt("Pidetään rajauspalaveri", -1, 2, "programme"),
  "authority",
);
add(
  2,
  "Selvitysbudjetin tarkistus",
  "Tutkimusohjelma on nyt rajattu. Omistaja vapauttaa seuraavan erän toteutuneen työohjelman perusteella.",
  opt("Hyväksytään koko työpaketti", 20, 0, "funding"),
  opt("Jaetaan hankinta kahteen erään", 17, 0, "funding"),
  "authority",
);

add(
  3,
  "Maastotieto saapuu",
  "Tilatut luontoselvitykset valmistuvat. Havaintojen merkitys arvioidaan ennen kuin sijoittelua kutsutaan valmiiksi.",
  opt("Käydään tulokset suunnittelijan kanssa", -2, 1, "natureReview"),
  opt("Pyydetään koottu vaikutusarvio", -3, 0, "natureReview"),
  "consultant",
  { waitFor: ["ecology_surveys", "groundwater_study"] },
);
add(
  3,
  "Sijoittelu tarkentuu",
  "Selvitysten perusteella osa reunasta kannattaa jättää suunnitelman ulkopuolelle. Rajaus näkyy nyt myös hankeluvuissa.",
  opt("Vältetään tunnistettu alue", -2, 1, "avoidNature"),
  opt("Tutkitaan lieventävä sijoittelu", -4, 2, "mitigateNature"),
  "planner",
  { risk: "nature" },
);
add(
  3,
  "Mittauksesta talousmalliin",
  "Tuotantoarvio päivitetään mittauksen perusteella. Generaattorin nimellisteho ei muutu sillä, että tuuli jäi arviosta.",
  opt("Päivitetään talousmalli", -1, 1, "yield"),
  opt("Optimoidaan sijoittelu tuloksen mukaan", -3, 2, "yieldOptimise"),
  "consultant",
  { windOnly: true, waitFor: ["wind_measurement"] },
);
add(
  3,
  "Melumallin versio",
  "Yksi voimala siirtyi, ja mallinnus pitää päivittää. Kuvassa muutos näyttää pieneltä. Laskennassa se on silti uusi lähtötieto.",
  opt("Päivitetään koko mallinnus", -3, 1, "noise"),
  opt("Varmistetaan muutosalueen vaikutus", -2, 2, "noise"),
  "consultant",
);
add(
  3,
  "Korkeuslausunnon reunaehto",
  "Lausunto ja sijoittelu sovitetaan yhteen. Jos korkeusraja muuttuu, myös laitemallin soveltuvuus pitää tarkistaa erikseen.",
  opt("Pidetään yhteensopiva suunnitelma", -2, 1, "heightResolve"),
  opt("Tutkitaan matalampi malli", -3, 2, "heightLower"),
  "authority",
  { windOnly: true },
);
add(
  3,
  "Selostus ja kaavaluonnos",
  "Arviointiselostus ja kaavaluonnos perustuvat nyt samaan hankeversioon. Tämä mainitaan kokouksessa erikseen.",
  opt("Toimitetaan aineisto kuulemiseen", -2, 1, "draft"),
  opt("Tehdään vielä yhteinen laaduntarkistus", -3, 1, "draft"),
  "planner",
);
add(
  3,
  "Luonnosvaiheen palaute",
  "Palautteessa korostuvat maisema ja rakentamisen liikenne. Osa toivoo pienempää hanketta, osa tarkempia vastauksia.",
  opt("Tarkennetaan ratkaisuja ja vastineita", -3, 2, "draftFeedback"),
  opt("Käydään vaihtoehdot pienryhmissä", -2, 3, "draftFeedback"),
  "planner",
);

add(
  4,
  "Perusteltu päätelmä",
  "Arvioinnin riittävyys ja suunnittelussa huomioon otettavat asiat kootaan. Yleinen selvitysvalmius ei korvaa puuttuvaa tarkastelua.",
  opt("Varmistetaan täydennysten riittävyys", -3, 2, "conclusion"),
  opt("Täydennetään aineisto kerralla", -4, 1, "conclusion"),
  "authority",
);
add(
  4,
  "Maakuntakaava etenee",
  "Maakuntakaavan valmistelu on edennyt muun työn rinnalla. Nyt tarkistetaan, että hankkeen ratkaisu edelleen sopii kokonaisuuteen.",
  opt("Varmistetaan ajantasainen yhteensopivuus", -2, 1, "regionalFinal"),
  opt("Sovitetaan rajaus uuteen aineistoon", -3, 2, "regionalFinal"),
  "planner",
);
add(
  4,
  "Reittivaihtoehto täsmentyy",
  "Verkkoselvityksen tulos on käytettävissä. Lyhyin karttareitti ei välttämättä ole helpoin toteuttaa.",
  opt("Valitaan selvitetty perusreitti", -2, 1, "gridBase"),
  opt("Käytetään pidempää varareittiä", -4, 2, "gridAlternative"),
  "substation",
  { waitFor: ["grid_initial"], risk: "grid" },
);
add(
  4,
  "Natura-arvion ajantasaisuus",
  "Hankeversio ja vaikutusarvion lähtötiedot verrataan. Jos muuttunut ratkaisu vaikuttaa arvioon, päivitys tarvitaan ennen päätösaineistoa.",
  opt("Päivitetään muuttuneet tarkastelut", -3, 2, "naturaCurrent"),
  opt("Varmistetaan arvioinnin vastaavuus", -2, 1, "naturaCheck"),
  "consultant",
  { risk: "natura" },
);
add(
  4,
  "Ehdotuksen kartta ja määräykset",
  "Kartta, määräykset ja selostus käydään rinnakkain läpi. Kolmen tiedoston olisi tarkoitus kuvata samaa hanketta.",
  opt("Tehdään yhteinen versiolukitus", -2, 1, "proposal"),
  opt("Käydään ristiriidat työpalaverissa", -1, 2, "proposal"),
  "planner",
);
add(
  4,
  "Muistutukset ja vastineet",
  "Kaavaehdotuksesta on saatu muistutuksia. Vastineessa tarvitaan perustelu, ei pelkkä viittaus aiempaan vastaukseen.",
  opt("Perustellaan ratkaisut kohteittain", -3, 1, "consultation"),
  opt("Täsmennetään vielä ehdotusta", -2, 2, "consultation"),
  "authority",
);
add(
  4,
  "Päätösvaiheen rahoitus",
  "Omistaja jatkaa kehitysrahoitusta, kun avoimet asiat ja seuraavat päätökset ovat näkyvissä. Ennusteessa on tällä kertaa myös vaihteluväli.",
  opt("Vahvistetaan päätösvaiheen budjetti", 20, 0, "funding"),
  opt("Sovitaan rajattu lisäerä", 17, 0, "funding"),
  "authority",
);

add(
  5,
  "Sopimus ehtii ensin",
  "Kaavan aikataulu on tarkentunut. Maanvuokrasopimusten ja optioiden voimassaolo tarkistetaan sitä vasten.",
  opt("Jatketaan tarvittavat sopimukset", -3, 1, "leaseRenewed"),
  opt("Vahvistetaan nykyisten ehtojen riittävyys", -1, 0, "leaseCheck"),
  "landowner",
  { risk: "lease" },
);
add(
  5,
  "Päätösaineiston tarkastus",
  "Kaavaselostus, vastineet ja selvitykset kootaan päätöksentekoon. Viimeisin versio löytyy tällä kertaa yhdestä paikasta.",
  opt("Tarkistetaan koko aineistoketju", -2, 1, "finalQa"),
  opt("Tarkistetaan kriittiset riippuvuudet", -1, 2, "finalQa"),
  "consultant",
);
add(
  5,
  "Yksi tarkentava kysymys",
  "Valmistelija pyytää perustelun reittiratkaisulle. Vastaus on jo raportissa, mutta eri otsikon alla kuin kukaan etsi.",
  opt("Nostetaan perustelu päätösaineistoon", -1, 0, "decisionEvidence"),
  opt("Käydään ratkaisu valmistelijan kanssa", -2, 1, "decisionEvidence"),
  "planner",
);
add(
  5,
  "Valtuuston kokous",
  "Kaava on päätöksenteossa. Valmistelun laatu auttaa päätöksentekoa, mutta kehittäjä ei päätä äänestyksen tulosta.",
  opt("Seurataan päätöksentekoa", 0, 1, "adoption"),
  opt("Ollaan käytettävissä lisäkysymyksiin", -1, 1, "adoption"),
  "authority",
);
add(
  5,
  "Kaava on hyväksytty",
  "Valtuusto hyväksyi kaavan. Hanke etenee, mutta rakentamisvalmius edellyttää vielä omat ratkaisunsa.",
  opt("Kootaan päätöksen ehdot", -1, 0, "adoptionRecorded"),
  opt("Päivitetään jatkotyön vastuut", -1, 0, "adoptionRecorded"),
  "planner",
);
add(
  5,
  "Päätöksen lainvoimaisuus",
  "Muutoksenhaun tilanne tarkistetaan ennen seuraavien sitoumusten tekemistä. Kalenterimerkintä ei yksin vahvista lainvoimaa.",
  opt("Varmistetaan päätöksen tila", -2, 2, "planFinal"),
  opt("Valmistellaan jatkoa tarkistuksen rinnalla", -3, 1, "planFinal"),
  "authority",
);
add(
  5,
  "Kohti rakentamisvalmiutta",
  "Omistaja vapauttaa viimeistelyvaiheen kehitysrahan. Kaavavoittoa ei kirjata vielä rakentamisen aloituspäätökseksi.",
  opt("Sovitaan RtB-työpaketti", 18, 0, "funding"),
  opt("Priorisoidaan kriittiset sopimukset", 16, 0, "funding"),
  "consultant",
);

add(
  6,
  "Lupapaketti",
  "Skenaarion tarvitsemat rakentamisen ja muun toteutuksen luvat kootaan. Kaavakarttaa ei käytetä niiden sijaisena.",
  opt("Viimeistellään lupahakemukset", -4, 2, "permits", [
    { jobId: "rtb_permits", afterMonths: 5, flag: null },
  ]),
  opt("Käsitellään hakemukset rinnakkain", -6, 1, "permits", [
    { jobId: "rtb_permits", afterMonths: 3, flag: null },
  ]),
  "authority",
);
add(
  6,
  "Liittymän ehdot",
  "Tekninen verkkoratkaisu tarkentuu sopimusehdoiksi ja aikatauluksi. Nimellistehosumma ei ole sama kuin sallittu vientiteho.",
  opt("Vahvistetaan liittymisratkaisu", -4, 1, "gridContract"),
  opt("Sovitaan vaiheistettu liittyminen", -3, 2, "gridContract"),
  "substation",
);
add(
  6,
  "Johdon tarvitsema maa",
  "Tuotantoalueen oikeudet ovat kunnossa. Myös sähkönsiirron ja kulkuyhteyksien oikeuksien pitää kattaa lopullinen ratkaisu.",
  opt("Varmistetaan kaikki reittioikeudet", -3, 1, "routeRights"),
  opt("Täsmennetään reitti sopimusten mukaan", -2, 2, "routeRights"),
  "landowner",
);
add(
  6,
  "Lupapäätökset saapuvat",
  "Skenaarion lupaviranomaiset ovat ratkaisseet hakemukset. Ehdot verrataan toteutussuunnitelmaan ennen rakentamisvalmiuden kirjaamista.",
  opt("Varmistetaan ehtojen täyttäminen", -2, 1, "permitDecision"),
  opt("Sovitetaan suunnitelma lupaehtoihin", -3, 1, "permitDecision"),
  "authority",
  { waitFor: ["rtb_permits"] },
);
add(
  6,
  "Laitemalli lukitaan",
  "Toimittajan ratkaisu sovitetaan lupiin, korkeusrajaan ja melumalliin. Mallitunnus on lyhyt; tarkistuslista pidempi.",
  opt("Vahvistetaan yhteensopiva malli", -2, 1, "equipment"),
  opt("Verrataan kahta sallittua ratkaisua", -3, 2, "equipment"),
  "consultant",
);
add(
  6,
  "Tuotannon kaupalliset ehdot",
  "Kaupallinen suunnitelma päivitetään nykyisellä tuotantoarviolla. Aiemman version optimistisin solu ei siirry mukana.",
  opt("Varmistetaan rahoituskelpoinen perusmalli", -3, 1, "commercial"),
  opt("Sovitaan vaiheistettu toteutusmalli", -2, 2, "commercial"),
  "consultant",
);
add(
  6,
  "Vielä yksi ajantasaisuuskierros",
  "Suunnitelma, luvat, selvitykset ja sopimukset tarkistetaan samaa hankeversiota vasten. Nyt sana viimeinen kirjoitetaan varovasti.",
  opt("Suljetaan avoimet toteutusehdot", -3, 1, "rtbQa"),
  opt("Tehdään riippumaton valmiustarkastus", -4, 1, "rtbQa"),
  "authority",
);
add(
  6,
  "RtB-katselmus",
  "Hanke on rakentamisvalmiuden tarkastuksessa. Päätös perustuu todettuihin lupiin, oikeuksiin, verkkoon ja kaupallisiin edellytyksiin.",
  opt("Vahvistetaan rakentamisvalmius", 0, 0, "rtb"),
  opt("Käydään valmius läpi omistajan kanssa", -1, 0, "rtb"),
  "planner",
);

const interludes = [
  [
    "Kartan oikea versio",
    "Maanomistajan kartassa on viime viikon rajaus. Uudessa versiossa tie kulkee eri kohdasta. Molemmissa tiedostonimessä lukee uusi.",
    "Lähetetään muutoskartta",
    "Käydään muutos yhdessä läpi",
  ],
  [
    "Tilaisuus samaan aikaan",
    "Kunnan yleisötilaisuus osuu paikallisen yhdistyksen vuosikokoukseen. Osallistujia ei voida jakaa kahteen saliin.",
    "Siirretään tilaisuutta",
    "Järjestetään toinen osallistumistapa",
  ],
  [
    "Selvityksen lähtötiedot",
    "Konsultti pyytää lähtötiedot yhtenä pakettina. Ne ovat valmiina kolmessa kansiossa ja kahden henkilön sähköpostissa.",
    "Kootaan yksi aineistopaketti",
    "Sovitaan aineistovastaava",
  ],
  [
    "Hyvä uutinen sellaisenaan",
    "Aiempi selvitys on käyttökelpoinen myös nykyiselle rajaukselle. Asia tarkistettiin, ja tällä kertaa tarkistus lyhensi työlistaa.",
    "Hyödynnetään aineisto",
    "Varmistetaan rajaukset vielä yhdessä",
  ],
  [
    "Lausunnon tarkka viite",
    "Lausunto viittaa oikeaan selvitykseen mutta sen vanhaan versioon. Sisältöero on pieni. Vastineessa se pitää silti selittää.",
    "Täsmennetään versioviite",
    "Liitetään lyhyt muutosvertailu",
  ],
  [
    "Arkisto alkaa muistuttaa hanketta",
    "Päätösasiakirjat löytyvät nyt sovituista kansioista. Uusi työntekijä löysi tarvitsemansa kysymättä keneltäkään.",
    "Pidetään käytäntö",
    "Täydennetään luovutusluettelo",
  ],
  [
    "Nimi hankekansiossa",
    "Hankkeen nimi on pysynyt samana alusta asti. Sopimusluettelon pituus ei ole.",
    "Päivitetään luovutuspaketti",
    "Käydään vastuut läpi",
  ],
];
const cards = [];
const nodes = [];
const trust = {
  engagement: 6,
  avoidNature: 4,
  mitigateNature: 3,
  draftFeedback: 5,
  consultation: 3,
  leaseShort: -2,
  owners: 2,
};
const effects = (o) => [
  adjust("budget", o.budget),
  adjust(
    "quality",
    ["noise", "finalQa", "rtbQa", "natureReview"].includes(o.tag) ? 3 : 1,
  ),
  ...(trust[o.tag] ? [adjust("trust", trust[o.tag])] : []),
  ...(o.time > 1 ? [adjust("patience", -1)] : []),
  ...(o.tag === "funding" ? [adjust("patience", 3)] : []),
];
function compile(row, i) {
  const id = `C${String(i + 1).padStart(3, "0")}`;
  const makeChoice = (o) => ({
    label: o.label,
    outcomeText: "Ratkaisu kirjataan hankkeen päätöshistoriaan.",
    timeMonths: o.time,
    effects: effects(o),
    delayed: o.extra.map((j) => ({
      jobId: j.jobId,
      afterMonths: j.afterMonths,
      completionText: j.flag
        ? "Tilattu selvitysaineisto on valmistunut."
        : "Menettelyn päätös on saapunut.",
      effects: j.flag ? [{ op: "flag", key: j.flag, value: true }] : [],
    })),
  });
  cards.push({
    id,
    version: 1,
    title: row.title,
    body: row.body,
    speakerId:
      row.art === "substation"
        ? "gridEngineer"
        : row.art === "landowner"
          ? "landowner"
          : row.art === "authority"
            ? "authority"
            : row.art === "consultant"
              ? "consultant"
              : "planner",
    artKey: row.art,
    phases: ["01"],
    modes: ["wind", "solar", "hybrid"],
    tone: row.left.budget > 0 ? "positive" : "work",
    trigger: "ambient",
    weight: 10,
    maxPerRun: 1,
    requiresAll: [],
    choices: { left: makeChoice(row.left), right: makeChoice(row.right) },
    sourceIds: [],
    authorNote:
      "Fiktiivinen mutta teoriassa mahdollinen tilanne. Pelin menettelymalli on erillinen kortin tekstistä.",
  });
  nodes.push({
    cardId: id,
    stage: row.stage,
    left: row.left.tag,
    right: row.right.tag,
    windOnly: row.windOnly ?? false,
    waitFor: row.waitFor ?? [],
    risk: row.risk ?? null,
    optional: row.optional ?? false,
  });
}
let index = 0;
for (let stage = 0; stage < 7; stage++) {
  const group = rows.filter((r) => r.stage === stage);
  group.forEach((r, n) => {
    compile(r, index++);
    if (n === 3) {
      const [title, body, a, b] = interludes[stage];
      compile(
        {
          stage,
          title,
          body,
          left: opt(a, stage === 3 ? 2 : -1, 0, "interlude"),
          right: opt(b, -1, 1, "interlude"),
          art: "consultant",
          optional: true,
        },
        index++,
      );
    }
  });
}
const fatal = [
  [
    "Kriittinen sopimus jää saamatta",
    "Ratkaisevan alueen omistaja on päättänyt olla luovuttamatta oikeuksia. Käyttökelpoista korvaavaa rajausta ei tämän hankkeen alueella ole.",
  ],
  [
    "Kunta ei aloita valmistelua",
    "Kunta on ratkaissut aloitteen kielteisesti. Käytettävissä olevat vaihtoehdot eivät muuta hankkeen keskeistä ristiriitaa.",
  ],
  [
    "Lausunto sulkee toteutusvaihtoehdot",
    "Skenaarion toimivaltaisen viranomaisen lopullinen arvio estää tämän hankkeen toteutuksen. Myös tutkittu vaihtoehto jää esteen piiriin.",
  ],
  [
    "Vaikutusta ei voida välttää",
    "Valmistunut arvio tunnistaa ratkaisemattoman esteen. Tutkitut sijoittelut ja lieventämiskeinot eivät mahdollista tämän hankkeen jatkoa.",
  ],
  [
    "Kaavaratkaisu ei mahdollista hanketta",
    "Alueellinen suunnitteluratkaisu on muuttunut. Selvitetty vaihtoehto ei ratkaise ristiriitaa, eikä hankkeen jatkamiselle ole hyväksyttävää polkua.",
  ],
  [
    "Kaava palautuu lähtöpisteeseen",
    "Päätöksenteko tai muutoksenhaku päätyy ratkaisuun, jonka vuoksi hankkeen valmistelua ei voida jatkaa tässä muodossa. Omistaja ei rahoita uutta lähtöä.",
  ],
  [
    "Rahoitus vetäytyy",
    "Rahoittaja vetäytyy muuttuneessa markkinatilanteessa. Korvaavaa toteutusmallia ei saada sovittua hankkeen määräajassa. Kaava voi silti jäädä voimaan.",
  ],
];
fatal.forEach(([title, body], stage) => {
  const template = structuredClone(cards[0]);
  template.id = `X00${stage + 1}`;
  template.title = title;
  template.body = body;
  template.artKey = "authority";
  template.speakerId = "authority";
  template.tone = "challenge";
  template.choices = {
    left: {
      label: "Dokumentoidaan päättymisen syy",
      outcomeText:
        "Hankkeen kehitys päättyy. Syyt ja tehdyt selvitykset säilyvät arkistossa.",
      timeMonths: 0,
      effects: [],
      delayed: [],
    },
    right: {
      label: "Käydään päätös osapuolten kanssa",
      outcomeText:
        "Hanke suljetaan hallitusti. Päätös ei ollut tämän valinnan vältettävissä.",
      timeMonths: 0,
      effects: [],
      delayed: [],
    },
  };
  cards.push(template);
});
const special = (id, title, body, left, right) => {
  const c = structuredClone(cards[0]);
  c.id = id;
  c.title = title;
  c.body = body;
  c.artKey = "reindeer";
  c.speakerId = "ecologist";
  c.choices = { left, right };
  cards.push(c);
};
const alternativeStories = [
  [
    "Rajapyykki löytyy maastosta",
    "Maanomistajien kanssa tehty maastokäynti selventää yhden epäselvän kulman. Keskustelu lyheni, kun kartan vieressä oli myös itse paikka.",
  ],
  [
    "Kysymykset ennen kalvoja",
    "Kunnan valmistelija lähettää asukkaiden kysymykset jo ennen tilaisuutta. Esityksen viimeinen kalvo vaihtuu ensimmäiseksi.",
  ],
  [
    "Aineisto löytyi arkistosta",
    "Vanha käyttökelpoinen lähtöaineisto löytyi sovitusta arkistosta. Sen ajantasaisuus pitää vielä varmistaa, mutta koko työtä ei tarvitse aloittaa alusta.",
  ],
  [
    "Maastoryhmät samalle kartalle",
    "Kaksi selvitysryhmää käyttää hieman eri rajausta. Ero huomataan ennen raportointia. Nyt yhteinen kartta säästää yhden korjauskierroksen.",
  ],
  [
    "Vastineen pituus",
    "Yhteen muistutukseen on laadittu pitkä vastaus. Valmistelija pyytää alkuun kahta lausetta siitä, mitä suunnitelmassa oikeasti muuttui.",
  ],
  [
    "Päätösliite on oikea",
    "Päätösaineiston tarkastuksessa kaikki liiteviitteet johtavat oikeisiin versioihin. Tarkastaja kirjaa asian myönteisenä havaintona.",
  ],
  [
    "Luovutuksen tarkistuslista",
    "Toteutustiimi pyytää koottua listaa avoimista ehdoista. Listassa on tällä kertaa myös vastuuhenkilö ja seuraava toimenpide.",
  ],
];
nodes
  .filter((n) => n.optional)
  .forEach((n) => {
    const original = cards.find((c) => c.id === n.cardId),
      c = structuredClone(original);
    c.id = `C10${n.stage}`;
    [c.title, c.body] = alternativeStories[n.stage];
    c.choices.left.label = "Kootaan tieto yhteiseen aineistoon";
    c.choices.right.label = "Käydään asia työryhmän kanssa";
    cards.push(c);
    n.alternatives = [n.cardId, c.id];
  });
const simple = (label, budget, time = 0) => ({
  label,
  outcomeText:
    "Ratkaisu kirjataan. Tutkimustulos ei riipu rahoituspäätöksestä.",
  timeMonths: time,
  effects: [adjust("budget", budget)],
  delayed: [],
});
special(
  "R001",
  "Yhteinen lajiseuranta",
  "Fiktiivinen valtakunnallinen tutkimusryhmä hakee rahoitusta lajien ja energiantuotannon yhteisvaikutusten seurantaan. Osallistuminen maksaa 20 000 euroa. Hankkeen omat selvitykset tarvitaan silti.",
  simple("Osallistutaan 20 000 eurolla", -4),
  simple("Seurataan julkaistavia tuloksia", 0),
);
special(
  "R002",
  "Tutkimuksesta käyttökelpoista tietoa",
  "Yleisen lajiseurannan tulokset tarkentavat vaikutusten arviointia ja tukevat tutkittua lieventämiskeinoa. Tuloksia voi hyödyntää myös ilman rahoitusosuutta. Oman alueen soveltuvuus on silti osoitettava.",
  simple("Sovitetaan tieto omaan arviointiin", -1, 1),
  simple("Varmistetaan soveltuvuus asiantuntijalta", -2),
);
special(
  "R003",
  "Tutkimus tarkentaa huolta",
  "Yleinen lajiseuranta tunnistaa aiemmin arvioitua suuremman yhteisvaikutusriskin. Tieto koskee myös rahoittajia. Hankkeen arviota ja lieventämistä pitää täydentää oman alueen tietojen avulla.",
  simple("Täydennetään vaikutusarvio", -3, 2),
  simple("Tutkitaan varovaisempi suunnitelma", -4, 1),
);
// Bound physical groups for the procedure model. These reference cards are never drawn.
for (const [id, effect, modes] of [
  [
    "Z001",
    { op: "windRemove", count: 2, reason: "campaign_nature" },
    ["wind", "hybrid"],
  ],
  [
    "Z002",
    { op: "solarRemove", hectares: 12, reason: "campaign_nature" },
    ["solar", "hybrid"],
  ],
]) {
  const c = structuredClone(cards[0]);
  c.id = id;
  c.title = "Menettelymallin rajausviite";
  c.modes = modes;
  c.trigger = "milestone";
  c.choices.left.effects = [effect];
  c.choices.right.effects = [];
  cards.push(c);
}
writeFileSync(
  new URL("../content/cards.campaign.fi.json", import.meta.url),
  JSON.stringify(
    {
      schemaVersion: "1.0",
      packId: "campaign-fi-001",
      locale: "fi-FI",
      status: "contentPrototype",
      cards,
    },
    null,
    2,
  ) + "\n",
);
writeFileSync(
  new URL("../content/campaign_flow.json", import.meta.url),
  JSON.stringify({ version: "rtb-1", nodes }, null, 2) + "\n",
);
console.log(
  `Wrote ${cards.length} campaign cards / ${nodes.length} procedure nodes.`,
);
