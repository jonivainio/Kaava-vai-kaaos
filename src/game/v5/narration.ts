import { entry } from "./content";
import type { Scene } from "./types";

/** Editorial overlay authorised 10 September. Original v5 source stays intact.
 * Exact IDs/branches only: prose, sentiment and randomness never decide routing.
 * Unknown results remain standalone. A missing headline is not a silent event.
 */
export const PROGRESS_LIMIT = 3;
export const SILENT_PROGRESS = new Set([
  "interludes[0][0]", "land-done", "surveys-wait",
  "interludes[1][0]", "interludes[1][1]", "interludes[1][2]", "interludes[1][3]",
  "interludes[2][0]", "interludes[2][1]", "interludes[2][2]", "interludes[2][3]", "progress-12",
  "interludes[3][0]", "interludes[3][1]", "interludes[3][2]", "interludes[3][3]", "proposal-review",
  // The actual permit goal and finality are still checked before the win screen.
  "EV-LUVAT", "ready",
]);

// Routine confirmations share the next visible scene, with the subject retained.
// Positive research findings and restored/reduced assets intentionally stay cards.
export const INLINE_RESULTS: Record<string, Record<string, string>> = {
  "EV-MAA": { "b-a9a851bde444": "Vuokrasopimus liitteineen hyväksyttiin. Kiinteistö pysyy mukana." },
  "EV-VOIMALALUPAUS": { "b-915a04e1d174": "Maanomistaja hyväksyy, ettei sopimus takaa voimalapaikkaa." },
  "EV-SELVITYSJARJESTYS": {
    "b-67a9b9fbfce2": "Maastoaineisto valmistui. Verkkoselvitys alkaa ajoissa.",
    "b-30b8bc484946": "Liityntävaihtoehto löytyi. Maastokäynnit ehditään tehdä tällä kaudella.",
  },
  "EV-MAASTOKAUSI": { "b-0b3409b88c41": "Uudelta maastokäynniltä saatiin riittävä havaintoaineisto." },
  "EV-VERKKO": { "b-27973548b00a": "Ensisijainen liityntä soveltuu jatkosuunnitteluun verkkoyhtiön ehdoilla." },
  "EV-NAAPURITIETO": { "b-59a9660da17a": "Naapurin uusi sijoittelu saatiin mukaan yhteisarvioon ajoissa." },
  "EV-ILMAILU": { "b-808e711fdd84": "Ilmailun esiselvitys tukee paikkoja. Lentoesteluvat haetaan vielä erikseen." },
  "EV-LUONTO": {
    "b-68918709f52a": "Siirto väistää sääksen lentoreitin. Arvio tukee uusia paikkoja.",
    "b-5efc2c49dc54": "Siirto ratkaisee vasomisalueen häiriön. Jatketaan tällä sijoittelulla.",
    "b-cdff35bbc13e": "Uusi sijoittelu säilyttää eläinten kulkuyhteyden. Väistöalue jätetään rakentamatta.",
    "b-de743eda2d5a": "Uudet tie- ja kaapelilinjat säilyttävät lisääntymispaikan puustoisen yhteyden.",
    "b-4fcf688a10dd": "Uusi sijoittelu säilyttää lintujen tärkeät alueet ja lentoyhteydet.",
  },
  "EV-PORO": { "b-2eb132beed3b": "Uusi sijoittelu säilyttää laidunkierron. Ratkaisu kirjataan kaavaan." },
  "EV-PALAUTE": {
    "b-b0803c3b4bc4": "Puuttuva havainnekuva valmistui. Vastine voidaan viimeistellä.",
    "b-59c477710293": "Lajihavainto on jo selvityksessä. Se yksilöidään vastineessa.",
    "b-19d217b85ab9": "Yhteismeluliite vastaa palautteen kysymykseen. Laskentatilanne kirjataan vastineeseen.",
  },
  "EV-BESS-TEKNIIKKA": { "": "Akun toimittaja toimittaa sovitut mallit ja testiaineistot. Liittymän valmistelu jatkuu." },
  "EV-BESS-VERKKO": { "b-19d187eaeedd": "Akun suunnittelu jatkuu ilmoitetuilla tehoilla verkkoyhtiön ehdoilla." },
  "EV-AJANTASAISUUS": {
    "b-3800eebef961": "Muutos sisältyy aiempaan arvioon. Uutta selvityskierrosta ei tarvita.",
    "b-ac1ba471530d": "Päivitetty arvio kattaa nykyisen sijoittelun. Aineisto viedään päätöskäsittelyyn.",
  },
  "EV-BESS-TURVA": {
    "b-7f63a4aa86ce": "Akun tekniset tiedot riittävät turvallisuusratkaisuun. Toteutusehdot kirjataan.",
    "b-a4ee46f41180": "Akun vesienhallinta on riittävä. Sen tarvitsema tila säilytetään.",
    "b-864dfc7343ab": "Akun korotus ja vesien johtaminen ratkaisevat tulvariskin. Naapurivaikutukset tarkistettiin.",
  },
};
export function inlineResult(scene: Scene): string | undefined {
  if (scene.kind !== "event") return undefined;
  return INLINE_RESULTS[scene.id]?.[scene.branchId ?? ""];
}

export const SHORT_STORIES: Record<string, string> = {
  "start": "Kehitä hybridihanke luvitetuksi. Ensin tarvitaan maa, sitten selvitykset, kaava ja luvat.",
  "transition-1": "Maat on vuokrattu. Nyt jätetään kaava-aloite ja suunnitellaan YVA:ssa tutkittavat vaihtoehdot ja vaikutukset.",
  "transition-2": "Maastotuloksista laaditaan YVA-selostus ja kaavaluonnos. Vaihtoehtoja vertaillaan ja aineistot asetetaan kuultaviksi.",
  "transition-3": "Palaute on saatu. Puutteet korjataan kaavaehdotukseen ennen hyväksymistä ja luvitusta.",
  "draft-done": "LVV:n perusteltu päätelmä saapui. Sen ja kuulemisen palaute ohjaa kaavaehdotuksen korjauksia.",
  "draft-done::no-yva": "Kaavaluonnoksen palaute on koottu. Sen perusteella valmistellaan vastineet ja ehdotuksen muutokset.",
  "surveys-wait::no-yva": "Viranomainen ei edellytä erillistä YVA-menettelyä. Kaavan ja lupien vaikutusselvitykset tehdään silti.",
  "EV-YHTEISASEMA": "Yhteisliityntä ei toimi näillä tehoilla ja suojauksilla. Myöhempi ratkaisu ei sovi aikatauluihin. Oman liittymän suunnittelu alkaa.",
  "EV-MAAKUNTAODOTUS": "Maakuntakaava siirtyy taas. Aiemmat viiveet ovat kuluttaneet sopimusaikaa: nykyiset määräajat eivät riitä.",
  "adoption": "Valtuusto hyväksyi kaavan. Muutoksenhaku ja tarvittavat luvat ovat vielä edessä.",
  "EV-HYVAKSYNTA": "Kaava hyväksyttiin. Lainvoima varmistetaan ja tarvittavat lupahakemukset viimeistellään.",
  "EV-LAINVOIMA": "Kaava on lainvoimainen. Hankkeen muut tarvittavat luvat tarkistetaan vielä.",
};

// Deliberately sparse and hand-selected. Terminal reactions describe the specific
// setback without blaming the player for an external event (user 10 September).
export const DECISION_REACTIONS: Record<string, string> = {
  "road": "Hups!", "land-map-versions": "Jaa että sellaista.", "UUSI-P1-05": "Oho.",
  "initiative-rumour": "Mitä nyt taas?", "programme-cumulative": "No huhhuh…",
  "UUSI-P2-05": "Jaa että sellaista.", "UUSI-P2-09": "Voi ei!", "UUSI-P2-11": "Jaaha…",
  "height": "Hups!", "height-ground": "Oho.", "golden-shared": "Jaa että sellaista.",
  "nature-bird-area": "Jaaha, mitä nyt taas?", "solar-bird-area": "Oho.",
  "solar-nest-water": "Jaa että sellaista.", "solar-frog-basin": "Jaaha…",
  "noise-neighbour-model": "Mitä nyt taas?", "noise-neighbour-layout": "Jaaha, mitä nyt taas?",
  "solar-view-winter": "Oho.", "opinions-noise": "No huhhuh…", "UUSI-P3-07": "Oho.",
  "UUSI-P3-01": "Jaa että sellaista.", "P3-SOPIMUS": "Jaaha, mitä nyt taas?",
  "UUSI-P4-03": "Hups!", "proposal-photo": "Jaaha…", "hearing-condition": "Voi ei!",
  "UUSI-P4-06": "Voi ei!", "BESS-P2-03": "Jaa että sellaista.",
  "BESS-P3-07": "Jaaha…", "BESS-P4-01": "Jaa että sellaista.",
};
export const EVENT_REACTIONS: Record<string, Record<string, string>> = {
  'external-0': {'':'Jaaha. Suunta vaihtui.'},
  'ext-land-owner': {'':'Meidän hanke osui listalle.'},
  'ext-land-use': {'':'Tälle kartalle oli toinen suunnitelma.'},
  'external-1': {'':'Se oli sitten siinä.'},
  'ext-initiative-priority': {'':'Ovi jäi kiinni.'},
  'ext-initiative-owner': {'':'Strategia ehti ensin.'},
  'external-2': {'':'Sähköä olisi. Reittiä ei.'},
  'ext-grid-station': {'':'Kalenteri loppui kesken.'},
  'ext-nature-network': {'':'Tämä reitti oli jo käytössä.'},
  'external-golden-full': {'':'Reviirillä tuli raja vastaan.'},
  'external-herding': {'':'Tästä ei löytynyt kiertotietä.'},
  'external-3': {'':'No niin. Se siitä rahoituksesta.'},
  'ext-buyer': {'':'Kaupat jäivät tekemättä.'},
  'ext-grid-delivery': {'':'Liian kauas tulevaisuuteen.'},
  'LOPPU-LAAJUUS': {'':'Vähän kerrallaan. Lopulta liian vähän.'},
  'LOPPU-VUOKRA-AIKA': {'':'Aika ajoi ohi.'},
  'LP1-E-T03': {bridge_no:'Ei tämän sillan yli.'},
  'LP1-E-A01': {surface_no:'Vieläkin häikäisee.'},
  'LP1-E-A02': {risk:'Pinnan alta löytyi lisää mietittävää.'},
  'LP1-E-Y01': {exclude_after_wait:'Toinen kyllä ei riittänyt.'},
  'LP1-E-H02': {blocked:'Tämäkin vaihtoehto käytiin loppuun.'},
  "EV-YHTEISASEMA": { "": "Voi ei!" }, "EV-MAAKUNTAODOTUS": { "": "Mitä nyt taas?" },
  "EV-SOPIMUSSIVUT": { "b-85eec8a52400": "Jaa että sellaista." },
  "EV-VOIMALALUPAUS": { "b-dd5b71df865f": "Jaaha…" },
  "EV-MAASTOKAUSI": { "b-540cb956df24": "Voi ei!" },
  "EV-NAAPURITIETO": { "b-6382d72d9a62": "Mitä nyt taas?" },
  "EV-VAIHTOEHDOT": { "b-4c977e50f220": "Jaaha…" },
  "EV-KOTKA": { "b-b0ed9a155239": "No huhhuh…" },
  "EV-MELU": { "b-ce33c95285d0": "Voi ei!", "b-ae43d2ca2475": "Jaaha…" },
  "EV-PALAUTE": { "b-6078d68cf223": "Oho." },
  "EV-KORJAUS": { "b-605b9eb6912e": "Jaaha, mitä nyt taas?" },
};
export function reactionFor(scene: Scene): string | undefined {
  if (scene.kind === "decision") return DECISION_REACTIONS[scene.id];
  if (scene.kind === "event") return EVENT_REACTIONS[scene.id]?.[scene.branchId ?? ""];
  return undefined;
}

/** Fail visibly if an editorial mapping drifts away from the authored content. */
for (const id of [...SILENT_PROGRESS, ...Object.keys(SHORT_STORIES), ...Object.keys(DECISION_REACTIONS)]) entry(id);
for (const table of [INLINE_RESULTS, EVENT_REACTIONS]) for (const [id, branches] of Object.entries(table)) {
  const item = entry(id);
  for (const branch of Object.keys(branches)) {
    if (branch ? !item.branches.some(candidate => candidate.id === branch) : item.branches.length > 0)
      throw new Error(`Unknown narration branch: ${id}/${branch}`);
  }
}
