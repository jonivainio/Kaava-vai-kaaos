import { z } from "zod";
import { createEngine } from "../engine/engine";
import { check, validatePack } from "../engine/content";
import { freeze, hash } from "../engine/scenario";
import { getDerivedStats } from "../engine/rules";
import type { Card, CardPack, Effect, NamePool } from "../engine/types";
import { CONTENT_VERSION, DECISIONS, EXTERNAL } from "./content";
import { VARIANTS, SOLAR_VARIANTS, EXTRA_EXTERNAL } from "./variants";
export { VARIANTS, SOLAR_VARIANTS, EXTRA_EXTERNAL } from "./variants";
import type {
  Action,
  CurrentDecision,
  Game,
  Mode,
  RestoreResult,
  Side,
  Stage,
  Story,
} from "./types";
export { getDerivedStats, DECISIONS, CONTENT_VERSION };
export { getScore } from "./score";
export { STAGES } from "./content";
export type * from "./types";

const actions = [
  "special",
  "uniform",
  "oldRoad",
  "newRoad",
  "smaller",
  "explain",
  "now",
  "nextSeason",
  "fund",
  "observe",
  "avoid",
  "relocate",
  "moveNoise",
  "quietNights",
  "lower",
  "moveHeight",
  "removeEdge",
  "answer",
  "updateNatura",
  "keepNatura",
  "renew",
  "keepLease",
  "trim",
  "defend",
  "commission",
  "rework",
  "workshop",
  "written",
  "solarAvoid",
  "solarStudy",
  "wetland",
  "waterStudy",
  "illustrate",
  "respond",
  "supplement",
  "justify",
] as const;
const optionSchema = z.strictObject({
  label: z.string().min(2).max(60),
  action: z.enum(actions),
  note: z.string().min(4).max(150),
});
const sceneSchema = z.strictObject({
  title: z.string().min(1).max(70),
  question: z.string().min(10).max(250),
  art: z.string(),
  speaker: z.string(),
  options: z.tuple([optionSchema, optionSchema]),
});
export function validateGameContent(
  decisions: unknown = DECISIONS,
  variants: unknown = VARIANTS,
  solar: unknown = SOLAR_VARIANTS,
) {
  const decisionSchema = z.strictObject({
    id: z.string().min(1),
    stage: z.number().int().min(0).max(3),
    base: sceneSchema,
    solar: sceneSchema.optional(),
    critical: sceneSchema.partial().optional(),
  });
  const variantSchema = z.strictObject({
    id: z.string().min(1),
    title: z.string().min(1).max(70),
    question: z.string().min(10).max(250),
    labels: z
      .tuple([z.string().min(2).max(60), z.string().min(2).max(60)])
      .optional(),
    notes: z
      .tuple([z.string().min(4).max(150), z.string().min(4).max(150)])
      .optional(),
    art: z
      .string()
      .regex(/^[a-z-]+$/)
      .optional(),
    component: z.literal("solar").optional(),
    failure: z.string().optional(),
    results: z.partialRecord(z.enum(actions), z.string().min(1)).optional(),
  });
  const ds = z.array(decisionSchema).parse(decisions),
    vs = z.record(z.string(), z.array(variantSchema)).parse(variants),
    ss = z.record(z.string(), z.array(variantSchema)).parse(solar);
  const ids = new Set(ds.map((d) => d.id));
  check(ids.size === ds.length, "Päätöksen ID toistuu");
  const seen = new Set<string>();
  for (const [key, list] of [...Object.entries(vs), ...Object.entries(ss)]) {
    check(ids.has(key), `Tuntematon päätösryhmä: ${key}`);
    for (const v of list) {
      check(!seen.has(v.id), `Tilanteen ID toistuu: ${v.id}`);
      seen.add(v.id);
    }
  }
  check(
    ds.every((d) => vs[d.id]),
    "Päätöksen varianttiryhmä puuttuu",
  );
}
validateGameContent();
for (const d of DECISIONS) {
  sceneSchema.parse(d.base);
  if (d.solar) sceneSchema.parse(d.solar);
  for (const mode of ["wind", "solar"] as const) {
    const base = mode === "solar" && d.solar ? d.solar : d.base;
    for (const v of (mode === "solar" ? SOLAR_VARIANTS[d.id] : undefined) ??
      VARIANTS[d.id]) {
      sceneSchema.parse({
        ...base,
        title: v.title,
        question: v.question,
        options: base.options.map((o, i) => ({
          ...o,
          label: v.labels?.[i] ?? o.label,
          note: v.notes?.[i] ?? o.note,
        })),
      });
      for (const action of Object.keys(v.results ?? {}))
        check(
          base.options.some((o) => o.action === action),
          `Tuntematon tulostekstin toiminto: ${v.id}/${action}`,
        );
    }
  }
}
check(
  JSON.stringify(
    [0, 1, 2, 3].map(
      (stage) => DECISIONS.filter((d) => d.stage === stage).length,
    ),
  ) === "[2,5,7,4]",
  "Vaiheiden päätösmäärä on väärä",
);

const cache = new Map<Mode, ReturnType<typeof createEngine>>();
function physical(mode: Mode) {
  let engine = cache.get(mode);
  if (engine) return engine;
  const cards: Card[] = DECISIONS.map((d, i) => {
    const scene = mode === "solar" && d.solar ? d.solar : d.base;
    const makeChoice = (j: number): Card["choices"]["left"] => ({
      label: scene.options[j]!.label.slice(0, 42),
      outcomeText: "Päätös tehty.",
      timeMonths: 1,
      effects: [],
      delayed:
        d.id === "defence"
          ? [
              {
                jobId: "defence_review",
                afterMonths: 6,
                completionText: "Tutkavaikutusten selvitys valmistui.",
                effects: [],
              },
            ]
          : d.id === "solarNature" && j === 1
            ? [
                {
                  jobId: "solar_permit",
                  afterMonths: 6,
                  completionText: "Aurinkoalueen luontoratkaisu valmistui.",
                  effects: [],
                },
              ]
            : d.id === "solarWater" && j === 1
              ? [
                  {
                    jobId: "solar_water",
                    afterMonths: 6,
                    completionText:
                      "Aurinkoalueen vesitalouden ratkaisu valmistui.",
                    effects: [],
                  },
                ]
              : d.id === "surveys"
                ? [
                    {
                      jobId: "ecology_surveys",
                      afterMonths: j === 0 ? 4 : 16,
                      completionText: "Luontoselvitykset valmistuivat.",
                      effects: [],
                    },
                    {
                      jobId: "groundwater_study",
                      afterMonths: j === 0 ? 4 : 16,
                      completionText: "Vesitalouden selvitys valmistui.",
                      effects: [],
                    },
                    {
                      jobId: "grid_initial",
                      afterMonths: 4,
                      completionText: "Verkon esiselvitys valmistui.",
                      effects: [],
                    },
                    ...(mode !== "solar"
                      ? [
                          {
                            jobId: "wind_measurement",
                            afterMonths: 12,
                            completionText: "Tuulimittaus valmistui.",
                            effects: [],
                          },
                        ]
                      : []),
                  ]
                : d.id === "height" && mode !== "solar" && j === 0
                  ? [
                      {
                        jobId: "aviation_review",
                        afterMonths: 3,
                        completionText: "Lentoesteen esiselvitys valmistui.",
                        effects: [],
                      },
                    ]
                  : d.id === "proposal"
                    ? [
                        {
                          jobId: "build_permits",
                          afterMonths: 6,
                          completionText:
                            "Lupapäätökset ja toteutuksen ehdot varmistuivat.",
                          effects: [],
                        },
                      ]
                    : [],
    });
    const choices = { left: makeChoice(0), right: makeChoice(1) };
    return {
      id: `C${201 + i}`,
      version: 1,
      title: scene.title,
      body: scene.question,
      speakerId: "consultant",
      artKey: scene.art,
      phases: ["01"],
      modes: [mode],
      tone: "mixed",
      trigger: "ambient",
      weight: 1,
      maxPerRun: 1,
      requiresAll: [],
      choices,
      sourceIds: [],
      authorNote:
        "Uuden lyhyen menettelyn fyysinen päätös. Näyttöteksti on erillistä dataa.",
    };
  });
  // An immediate statement does not commission a VTT study.
  const statement = structuredClone(cards[DECISIONS.findIndex(d=>d.id === "defence")]!);
  statement.id = "Z980";
  statement.choices.left.delayed = [];
  statement.choices.right.delayed = [];
  cards.push(statement);
  // Bind affected locations once. Repeat effects address the same locations.
  const groups: [string, number, number][] = [
    ["lease_edge", 4, 12],
    ["nature_edge", 4, 8],
    ["screen_edge", 0, 4],
    ["water_edge", 0, 4],
    ["view_edge", 1, 4],
    ["research_edge", 3, 8],
    ["aviation_edge", 3, 0],
    ["noise_edge", 4, 0],
    ["defence_edge", 6, 0],
  ];
  groups.forEach(([reason, count, hectares], i) => {
    if (mode !== "solar" && count === 0) return;
    if (mode === "solar" && hectares === 0) return;
    const c = structuredClone(cards[0]!);
    c.id = `Z${901 + i}`;
    c.trigger = "milestone";
    c.choices.left.effects =
      mode === "solar"
        ? [{ op: "solarRemove", hectares, reason }]
        : [{ op: "windRemove", count, reason }];
    // Hybrid nature affects the wind component; its solar fields are kept separate.
    cards.push(c);
  });
  if (mode !== "wind")
    for (const [i, reason, hectares] of [
      [0, "solar_lease", 12],
      [1, "solar_nature", 8],
      [2, "solar_water", 10],
      [3, "solar_connection", 6],
    ] as const) {
      const c = structuredClone(cards[0]!);
      c.id = `Z${950 + i}`;
      c.trigger = "milestone";
      c.choices.left.effects = [{ op: "solarRemove", hectares, reason }];
      cards.push(c);
    }
  const pack: CardPack = {
    schemaVersion: "1.0",
    packId: `${CONTENT_VERSION}-${mode}`,
    locale: "fi-FI",
    status: "contentPrototype",
    cards,
  };
  engine = createEngine(validatePack(pack));
  cache.set(mode, engine);
  return engine;
}
export function randomUnit(seed: string, label: string) {
  let x = hash(`${label}:${seed}`);
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}
function world(seed: string): Game["world"] {
  return {
    externalStage:
      randomUnit(seed, "external") < 1 / 3
        ? (Math.floor(randomUnit(seed, "external-stage") * 4) as Stage)
        : null,
    criticalIssue: (["nature", "natura", "leases"] as const)[
      Math.floor(randomUnit(seed, "critical") * 3)
    ]!,
    ownersAgree: randomUnit(seed, "owners") < 0.5,
    researchAdverse: randomUnit(seed, "research") < 0.5,
    researchCost: [10000, 15000, 25000, 40000, 60000][
      Math.floor(randomUnit(seed, "research-cost") * 5)
    ]!,
    aviationAccepted: randomUnit(seed, "aviation") < 0.5,
    goldenNeighborRiskMilli:
      Math.floor(randomUnit(seed, "critical") * 3) === 0 ? 45 : 20,
    landComponent: randomUnit(seed, "land-component") < 0.5 ? "wind" : "solar",
    tightLayoutProblem: randomUnit(seed, "tight-layout") < 0.5,
    affected: {
      nature: 2 + Math.floor(randomUnit(seed, "affected-nature") * 3),
      noise: 1 + Math.floor(randomUnit(seed, "affected-noise") * 4),
      height: 1 + Math.floor(randomUnit(seed, "affected-height") * 3),
      natura: 1 + Math.floor(randomUnit(seed, "affected-research") * 3),
      defence: 3 + Math.floor(randomUnit(seed, "affected-defence") * 4),
    },
    defence:
      randomUnit(seed, "external") < 1 / 3 &&
      Math.floor(randomUnit(seed, "external-stage") * 4) === 1 &&
      randomUnit(seed, "defence-fatal") < 0.5
        ? randomUnit(seed, "defence-reject") < 0.5
          ? "oppose"
          : "studyReject"
        : (["clear", "study", "reduce"] as const)[
            Math.floor(randomUnit(seed, "defence") * 3)
          ]!,
    solarPermit: randomUnit(seed, "solar-permit") < 0.5,
    solarWaterUseful: randomUnit(seed, "solar-water") < 0.5,
    species: ["poron", "metsäpeuran", "suden", "kotkan"][
      Math.floor(randomUnit(seed, "species") * 4)
    ]!,
  };
}
export function createGame(
  seed: string,
  mode: Mode,
  previousNameId?: string,
  namePool?: NamePool,
): Game {
  const run = physical(mode).createRun({
      seed,
      mode,
      previousNameId,
      namePool,
    }),
    d = getDerivedStats(run);
  return freeze({
    version: "swipe-2",
    contentVersion: CONTENT_VERSION,
    run,
    cursor: 0,
    revision: 0,
    stage: 0,
    delays: [],
    compactions: [],
    layoutTightened: false,
    encounters: DECISIONS.map((d) =>
      Math.floor(
        randomUnit(seed, `encounter-${d.id}`) *
          ((
            (mode === "solar" ? SOLAR_VARIANTS[d.id] : undefined) ??
            VARIANTS[d.id]
          ).length +
            1),
      ),
    ),
    world: world(seed),
    decisions: [],
    stories: [],
    lastOutcome: "Uusi hanke. Ensimmäisenä tarvitaan maa.",
    facts: {
      land: false,
      initiated: false,
      assessed: false,
      planAdopted: false,
      planFinal: false,
      permits: false,
      grid: false,
      ready: false,
    },
    unresolved: null,
    ending: null,
    endingReason: null,
    research: { funded: null, dueAt: null, published: false, waited: false },
    initial: { windCount: d.windCount, solarHa: d.solarHa, windMW: d.windMWac },
  });
}
export const token = (s: Game) => `${s.run.runId}:${s.revision}`;
function encounter(s: Game, index = s.cursor) {
  const d = DECISIONS[index]!;
  const pool =
    (s.run.mode === "solar" ? SOLAR_VARIANTS[d.id] : undefined) ??
    VARIANTS[d.id];
  return pool[s.encounters[index]! - 1];
}
export function currentDecision(s: Game): CurrentDecision | null {
  if (s.ending || s.stories.length) return null;
  const d = DECISIONS[s.cursor];
  if (!d) return null;
  const scene = structuredClone(
    s.run.mode === "solar" && d.solar ? d.solar : d.base,
  );
  const variant = encounter(s);
  if (variant) {
    scene.art = variant.art ?? scene.art;
    scene.title = variant.title;
    scene.question = variant.question;
    if (variant.labels)
      scene.options.forEach((o, i) => {
        o.label = variant.labels![i]!;
      });
    if (variant.notes)
      scene.options.forEach((o, i) => {
        o.note = variant.notes![i]!;
      });
    if (variant.id.startsWith("golden-")) {
      scene.question = scene.question.replaceAll(
        "{neighbor}",
        (s.world.goldenNeighborRiskMilli / 1000).toLocaleString("fi-FI", {
          minimumFractionDigits: 3,
        }),
      );
    }
  }
  if (d.id === "research") {
    const amount = s.world.researchCost.toLocaleString("fi-FI");
    scene.question =
      variant?.question
        .replaceAll("{species}", s.world.species)
        .replaceAll("{cost}", amount) ??
      `Valtakunnallinen ${s.world.species} seuranta etsii rahoittajia: osuus on ${amount} €. Tulokset tulevat vasta ehdotusvaiheessa, kaikille julkisina. Omat hankeselvitykset tarvitaan silti.`;
    scene.options[0].label = `Osallistutaan ${amount} eurolla`;
    scene.art =
      s.world.species === "kotkan"
        ? "eagle"
        : s.world.species === "suden"
          ? "ecologist"
          : "reindeer";
  }
  if (d.id === "natura") {
    scene.question = (variant?.question ?? d.base.question).replaceAll(
      "{species}",
      s.world.species,
    );
    scene.options[0].note =
      s.run.mode === "solar"
        ? "8 ha jää pois. Vaikutukset arvioidaan nykyisellä tiedolla."
        : "{countCap} voimalaa rajataan pois. Vaikutukset arvioidaan nykyisellä tiedolla.";
  }
  if (d.id === "land") {
    const solar =
      s.run.mode === "solar" ||
      (s.run.mode === "hybrid" && s.world.landComponent === "solar");
    scene.question += solar
      ? " Palstoilla on 12 ha aurinkoaluetta."
      : " Palstat ovat tuulialueella; ilman niitä sijoittelua pitää tiivistää.";
    scene.options[1].note = solar
      ? "Kieltäytyminen vähentää aurinkoaluetta 12 ha; tuulivoimalat säilyvät."
      : "Kieltäytyminen tiivistää sijoittelua. Myöhempiin siirtoihin jää vähemmän tilaa.";
  }
  if (d.id === "solarNature" && variant?.id === "solar-nest-water") {
    scene.options[1].label = "Selvitetään pienempi luontorajaus";
    scene.options[1].note =
      "Arvio kestää 6 kk. Pinta-ala voi säilyä tai 8 ha joudutaan jättämään pois.";
  }
  if (d.id === "solarWater" && variant?.id === "solar-required-wetland") {
    scene.options[1].label = "Tutkitaan tiiviimpi vesienkäsittely";
  }
  if (d.id === "feedback" && noiseFollowup(s)) {
    scene.title = "Melumoodi ei kelpaa tähän arvioon.";
    scene.speaker = "Ympäristöviranomainen";
    scene.art = "authority";
    scene.question =
      "Viranomainen ei hyväksy ehdotettua melumoodia: sen melupäästölle ei ole riittävää valmistajan takuuta. Siirrätkö {count} voimalaa vai vaihdatko koko hankkeen pienempään, mallinnettuun voimalatyyppiin?";
    scene.options = [
      {
        action: "removeEdge",
        label: "Siirretään {count} voimalaa",
        note: "Uudet paikat mallinnetaan. Määrä ja 10 MW:n malli säilyvät.",
      },
      {
        action: "answer",
        label: "Vaihdetaan koko hanke 8 MW:n malliin",
        note: "Määrä säilyy. Jokainen voimala on 8 MW / 280 m; teho pienenee.",
      },
    ];
  }
  if (s.run.mode === "wind" && ["solarNature", "solarWater"].includes(d.id)) {
    scene.title = "Selvitysten kartat tarkistetaan.";
    scene.question =
      "Eri asiantuntijoiden rajaukset sovitetaan yhteen. Tehdäänkö tarkistus heti vai odotetaanko täydentävää aineistoa?";
    scene.art = "map";
    scene.options[0].label = "Tarkistetaan nykyinen aineisto";
    scene.options[1].label = "Odotetaan täydentävä aineisto";
  }
  const countId = d.id === "feedback" ? "noise" : d.id;
  const n = s.world.affected[countId as keyof Game["world"]["affected"]] ?? 2;
  const render = (text: string) => renderCount(text, n);
  scene.title = render(scene.title);
  scene.question = render(scene.question);
  scene.options.forEach((o) => {
    o.label = render(o.label);
    o.note = render(o.note);
  });
  if (
    (d.id === "noise" || (d.id === "feedback" && noiseFollowup(s))) &&
    s.layoutTightened
  ) {
    scene.options.find(
      (o) => o.action === "moveNoise" || o.action === "removeEdge",
    )!.note =
      "Tiiviissä sijoittelussa siirto voi vaatia riskipaikkojen poistamista. Selvitys ratkaisee.";
  }
  const swap = randomUnit(s.run.seed, `sides-${d.id}`) < 0.5;
  return freeze({
    ...scene,
    id: d.id,
    token: token(s),
    choices: {
      left: scene.options[swap ? 1 : 0],
      right: scene.options[swap ? 0 : 1],
    },
  });
}
function renderCount(text: string, n: number) {
  return text
    .replaceAll("{count}", String(n))
    .replaceAll("{countCap}", String(n))
    .replaceAll("{gen}", `${n}:n`)
    .replaceAll("{genCap}", `${n}:n`)
    .replaceAll("{part}", String(n))
    .replaceAll("{ill}", `${n}:een`)
    .replaceAll("{all}", `${n}:lle`)
    .replaceAll("1 voimalaa", "1 voimala")
    .replaceAll("1 paikkaa", "1 paikka")
    .replaceAll("Siirrätkö 1 voimala", "Siirrätkö yhden voimalan");
}
function solarRemove(s: Game, reason: string, hectares: number) {
  if (s.run.mode !== "wind")
    applyEffects(s, [{ op: "solarRemove", hectares, reason }]);
}
function delay(s: Game, reason: string, months: number) {
  if (months > 0) {
    s.delays.push({ reason, months });
    s.run = physical(s.run.mode).advanceTime(s.run, months);
  }
}
function noiseMove(s: Game) {
  if (s.layoutTightened && s.world.tightLayoutProblem) {
    remove(s, "noise_edge", s.world.affected.noise, 0);
    return `${s.world.affected.noise} riskipaikkaa poistetaan: maanvuokrauksessa tiivistetty sijoittelu ei jätä tilaa riittäville siirroille. Uusi yhteismelulaskenta täyttää tarkastelun 40 dB:n tason.`;
  }
  return `${s.world.affected.noise} voimalaa siirretään. Uusi yhteismelulaskenta jää alle 40 dB:n asuin- ja lomarakennusten kohdalla. Määrä ja nimellisteho säilyvät.`;
}
function noiseFollowup(s: Game) {
  return (
    s.run.mode !== "solar" &&
    s.decisions.some((d) => d.id === "noise" && d.action === "quietNights")
  );
}
export function previewDecision(s: Game, side: Side) {
  const c = currentDecision(s);
  check(c, "Ei valittavaa korttia");
  // Only player-visible information. Never execute a hidden result for a preview.
  return freeze({ label: c.choices[side].label, note: c.choices[side].note });
}
function applyEffects(s: Game, effects: Effect[]) {
  s.run = physical(s.run.mode).applyProcedureEffects(s.run, effects);
}
function remove(s: Game, reason: string, wind: number, ha: number) {
  applyEffects(
    s,
    s.run.mode === "solar"
      ? [{ op: "solarRemove", hectares: ha, reason }]
      : [{ op: "windRemove", count: wind, reason }],
  );
}
function story(
  s: Game,
  id: string,
  title: string,
  body: string,
  art: string,
  kind: Story["kind"] = "bridge",
) {
  s.stories.push({ id, title, body, art, kind });
}
function queueResearch(s: Game) {
  check(
    s.stage === 3 && s.research.dueAt !== null,
    "Tutkimustulos ei kuulu tähän vaiheeseen",
  );
  s.run = physical(s.run.mode).advanceTime(
    s.run,
    Math.max(0, s.research.dueAt - s.run.elapsedMonths),
  );
  const prefix = s.research.funded ? "Rahoittamasi" : "Julkisen";
  const consequence = s.research.waited
    ? s.world.researchAdverse
      ? "Omat selvitykset ja uusi tutkimustieto osoittavat herkän alueen ulottuvan koko valittuun sijoitteluun. Jäljellä oleva vaihtoehto ei vältä merkittävää haittaa."
      : "Omat maastotiedot ja päivitetty luontovaikutusten arvio tukevat reunan säilyttämistä. Tutkimusta odottamalla säästyit tältä pienennykseltä."
    : s.world.researchAdverse
      ? "Oman alueen tarkastelu vahvistaa, että pois rajattu reuna tarvittiin lajin kulkuyhteydeksi. Pienennys riittää tämän haitan välttämiseen."
      : "Oman alueen arvio osoittaa, että reuna olisi voinut säilyä. Ehdotus on kuitenkin jo tehty pienempänä; paikkojen palauttaminen vaatisi uuden kierroksen.";
  story(
    s,
    "research-result",
    s.world.researchAdverse
      ? "Tutkimus toi lisää ehtoja."
      : "Tutkimuksesta on apua.",
    `${prefix} ${s.world.species} seurannan tulokset valmistuvat. ${consequence}`,
    s.world.species === "kotkan" ? "eagle" : "ecologist",
    "research",
  );
}
function endStage(s: Game, stage: Stage) {
  if (s.world.externalStage === stage) {
    const options = [EXTERNAL[stage]!, ...EXTRA_EXTERNAL[stage]!];
    if (stage === 2 && s.run.mode !== "solar")
      options.push({
        id: "external-golden-full",
        kind: "external",
        title: "Reviirin riski oli jo liian suuri.",
        art: "eagle",
        body: "Naapurihankkeiden maakotkan törmäysriskiksi arvioitiin 0,070 vuodessa tällä reviirillä. Arvioinnin vertailutaso on 0,06. Oman hankkeen pieninkään toteuttamiskelpoinen rajaus ei vältä lisähaittaa. Sijoittelulla tätä ei saada ratkaistua.",
      });
    s.stories.push(
      structuredClone(
        options[
          Math.floor(randomUnit(s.run.seed, "external-story") * options.length)
        ]!,
      ),
    );
    return;
  }
  if (stage === 0) {
    s.facts.land = true;
    story(
      s,
      "land-done",
      "Kartalla on nyt hanke.",
      "Sopimukset kattavat jäljelle jääneen suunnitelman. Kaava-aloite ja arviointiohjelma voidaan valmistella.",
      "map",
    );
  }
  if (stage === 1) {
    s.facts.initiated = true;
    story(
      s,
      "surveys-wait",
      "Maastotiimi lähti matkaan.",
      s.run.site.yvaRequired
        ? "Kunta aloittaa kaavoituksen. Arviointiohjelmasta saatu palaute on mukana maastotöissä. Nyt odotetaan oikeaa havaintokautta ja tuloksia."
        : "Kunta aloittaa kaavoituksen. Tässä aurinkohankkeessa ei tarvita YVA-menettelyä, mutta vaikutukset selvitetään kaavoitusta varten.",
      "ecologist",
    );
  }
  if (stage === 2) {
    s.facts.assessed = s.unresolved === null;
    if (s.decisions.some((d) => d.action === "special"))
      story(
        s,
        "contract-callback",
        "Poikkeusehdoista tuli puheenaihe.",
        "Muut maanomistajat kuulivat erillisistä ehdoista ja kysyvät samaa korvausta. Voimassa olevat sopimukset eivät purkaudu: asia käsitellään neuvotteluissa.",
        "landowner",
      );
    story(
      s,
      "draft-done",
      "Lausunnot saapuivat.",
      s.run.site.yvaRequired
        ? "Yhteysviranomainen antaa selostuksesta perustellun päätelmän. Lausunnot ja mielipiteet käsitellään kaavaluonnoksen vastineissa. Kunta kokoaa ehdotusta; YVA ei ole hankkeen hyväksymispäätös."
        : "Vaikutusselvitykset ja kaavaluonnos on käsitelty. Kunta kokoaa ehdotusta. Selvitysten tulokset seuraavat mukana — myös ne hankalat.",
      "documents",
    );
  }
  if (stage === 3) {
    if (!s.research.published) {
      queueResearch(s);
      return;
    }
    if (s.unresolved)
      story(
        s,
        "decision-no",
        "Tämä ratkaisu ei riitä.",
        s.unresolved,
        "authority",
        "decision",
      );
    else {
      check(
        s.facts.land && s.facts.initiated && s.facts.assessed,
        "Hyväksymisen edellytys puuttuu",
      );
      story(
        s,
        "adoption",
        "Kaava hyväksyttiin.",
        "Valtuusto hyväksyy kaavan. Muutoksenhaun jälkeen päätös jää voimaan. Toteutuksen luvat ja sopimukset viimeistellään vielä ennen rakentamisvalmiutta.",
        "celebration",
        "adoption",
      );
    }
  }
}
export function choose(s0: Game, expectedToken: string, side: Side): Game {
  check(side === "left" || side === "right", "Tuntematon valintasuunta");
  const c = currentDecision(s0);
  check(
    c && expectedToken === token(s0),
    "Päätös on vanhentunut tai jo käsitelty",
  );
  const s = structuredClone(s0),
    action = c.choices[side].action,
    definition = DECISIONS[s.cursor]!;
  const base =
    s.run.mode === "solar" && definition.solar
      ? definition.solar
      : definition.base;
  const engine = physical(s.run.mode),
    physicalSide = base.options[0].action === action ? "left" : "right";
  const immediateStatement = c.id === "defence" && (s.run.mode === "solar" || s.world.defence === "clear" || s.world.defence === "oppose");
  s.run = engine.offerCard(s.run, immediateStatement ? "Z980" : `C${201 + s.cursor}`);
  s.run = engine.applyChoice(s.run, s.run.offeredCard!.token, physicalSide);
  let result = "";
  switch (action) {
    case "special":
      result =
        "Molemmat allekirjoittavat. Eri ehdot jäävät sopimuksiin — ja ihmisten mieleen.";
      break;
    case "uniform":
      if (s.world.ownersAgree)
        result =
          "Viimeinen neuvottelu auttaa. Molemmat hyväksyvät samat ehdot kuin muutkin.";
      else {
        const solar =
          s.run.mode === "solar" ||
          (s.run.mode === "hybrid" && s.world.landComponent === "solar");
        if (solar) {
          solarRemove(s, "solar_lease", 12);
          result =
            "Omistajat kieltäytyvät. Heidän mailleen suunnitellut 12 ha jäävät pois aurinkoalueesta; tuulivoimalat säilyvät.";
        } else {
          s.layoutTightened = true;
          s.compactions.push(
            "Maanvuokrauksen puuttuvat tuulipalstat tiivistivät sijoittelua",
          );
          result =
            "Omistajat kieltäytyvät. Voimalamäärä säilyy, mutta sijoittelu tiivistyy muille palstoille. Melu- ja luontohaittojen väistämiseen jää vähemmän tilaa.";
        }
      }
      break;
    case "oldRoad":
      result =
        "Karttaliite korjataan oikeaan rajaan ja molemmat osapuolet hyväksyvät sen. Suunnitellut tuotantopaikat säilyvät.";
      break;
    case "newRoad":
      result =
        "Kaikki karttaliitteet tarkistetaan. Kahdessa muussakin oli vanha rajaviiva. Liitteet korjataan; tuotantopaikkoja ei tarvitse muuttaa.";
      break;
    case "smaller":
      result =
        "Kyläillan kysymykset päätyvät aloitteeseen. Kahvi loppui ennen kysymyksiä.";
      break;
    case "explain":
      result =
        "Aloite jätetään kunnalle. Asukkaille kerrotaan aikataulu ja varataan yhteinen tilaisuus.";
      break;
    case "now":
      result =
        "Kalliimpi YVA-konsultin tarjous hyväksytään. Maastotyöt alkavat tällä kaudella, ja verkon sekä vesitalouden selvitykset etenevät rinnalla. Hanke pääsee aiemmin eteenpäin.";
      break;
    case "nextSeason":
      s.delays.push({
        reason: "YVA-konsultin aloitus seuraavalla maastokaudella",
        months: 12,
      });
      result =
        "Halvempi YVA-konsultin tarjous hyväksytään. Sama työ tehdään seuraavalla maastokaudella. Palkkiossa säästetään, mutta YVA ja kaavavalmistelu valmistuvat noin vuotta myöhemmin.";
      break;
    case "fund":
      s.research.funded = true;
      s.research.dueAt = Math.max(...s.run.jobs.map((j) => j.dueAt)) + 10;
      result = `${s.world.researchCost.toLocaleString("fi-FI")} € yleiseen tutkimukseen. Julkaisu on luvassa vasta ehdotusvaiheessa. Rahoitus ei takaa suotuisaa tulosta.`;
      break;
    case "observe":
      s.research.funded = false;
      s.research.dueAt = Math.max(...s.run.jobs.map((j) => j.dueAt)) + 10;
      result =
        "Rahoitukseen ei osallistuta. Julkiset tulokset otetaan silti huomioon omassa hankkeessa.";
      break;
    case "avoid":
      remove(s, "nature_edge", s.world.affected.nature, 8);
      result =
        s.run.mode === "solar"
          ? "Kahdeksan hehtaaria rajataan pois. Luontoasiantuntija vahvistaa vesitalouden säilyvän."
          : "{countCap} voimalaa poistetaan. Luontoasiantuntija vahvistaa sääksen lentoreitin jäävän vapaaksi.";
      break;
    case "relocate":
      result =
        s.run.mode === "solar"
          ? "Ojituksen uusi ratkaisu viedään arviointiin. Pinta-ala pysyy toistaiseksi ennallaan."
          : "Voimalat siirretään reunalle. Koko lentoreitin tarkastelu ratkaisee, riittääkö siirto.";
      if (s.world.criticalIssue === "nature")
        s.unresolved =
          s.run.mode === "solar"
            ? "Ojituksen muuttaminen ei turvannut viitasammakon lisääntymisalueen vesitaloutta. Herkkä reuna päätettiin säilyttää paneelikentässä. Tätä ratkaisua ei voida hyväksyä."
            : "Voimaloiden siirtäminen reunalle ei väistänyt sääksen käyttämää lentoreittiä. Paikat päätettiin säilyttää, mutta koko reitin arviointi osoitti haitan liian suureksi. Tätä sijoittelua ei hyväksytä.";
      if (s.world.criticalIssue === "nature" && encounter(s)?.failure)
        s.unresolved = encounter(s)!.failure!;
      if (encounter(s)?.id.startsWith("golden-")) {
        const total = (s.world.goldenNeighborRiskMilli + 30) / 1000;
        result = `Siirron jälkeinen oma riski on 0,030 ja yhteisriski ${total.toLocaleString("fi-FI", { minimumFractionDigits: 3 })} törmäystä vuodessa reviirillä. ${total > 0.06 ? "Arvioinnin 0,06:n vertailutaso ylittyy edelleen. Nykyistä sijoittelua ei voi viedä hyväksymiseen." : "Yhteisriski jää alle arvioinnin 0,06:n vertailutason. Myös elinympäristövaikutukset tarkistetaan."}`;
        if (total > 0.06)
          s.unresolved =
            "Maakotkan yhteinen törmäysriski jäi siirron jälkeen tasolle 0,075 vuodessa reviirillä. Naapurihankkeiden vaikutus oli mukana. Valittu sijoittelu ei vältä merkittävää haittaa, eikä sitä hyväksytä.";
      }
      break;
    case "moveNoise":
      if (s.run.mode === "solar") {
        remove(s, "screen_edge", 0, 4);
        result =
          "Neljä hehtaaria jää puustolle. Paneelikenttä pienenee ja näkymä suojataan.";
      } else result = noiseMove(s);
      break;
    case "quietNights":
      if (s.run.mode !== "solar")
        applyEffects(s, [{ op: "adjust", field: "windYieldIndex", value: -8 }]);
      result =
        s.run.mode === "solar"
          ? "Paneelit siirretään alemmas. Kuivatus suunnitellaan uusille paikoille; pinta-ala säilyy."
          : "Hiljaisempi ajotapa viedään arvioitavaksi. Tuotantoarvio pienenee, nimellisteho säilyy. Valmistajan melutakuun riittävyys on vielä auki.";
      break;
    case "lower":
      if (s.run.mode === "solar") {
        remove(s, "water_edge", 0, 4);
        result =
          "Neljä hehtaaria varataan vesien viivyttämiseen. Paneelialue pienenee.";
      } else {
        result =
          "Lentoesteen esiselvitys tilataan. Finavia arvioi lentoaseman rajapintoja ja tarvittavat lennonvarmistuksen vaikutukset selvitetään. Luvan ratkaisee Traficom.";
        story(
          s,
          "aviation-wait",
          "{countCap} paikkaa on vielä auki.",
          "Lentoesteen esiselvitys on käynnissä. Muiden voimaloiden koko säilyy. Odotetaan, sopivatko nämä {count} nykyisille paikoilleen.",
          "radar",
          "aviation",
        );
      }
      break;
    case "moveHeight":
      result =
        s.run.mode === "solar"
          ? "Salaojat ja tasausallas mitoitetaan virtaamalaskelmalla. Paneelialue saadaan säilytettyä."
          : "{countCap} voimalaa siirretään rajapinnan alittaville paikoille. Uudet tiet ja vaikutukset selvitetään. Voimalamäärä sekä 300 m / 10 MW koko säilyvät.";
      break;
    case "removeEdge":
      if (noiseFollowup(s)) {
        applyEffects(s, [{ op: "adjust", field: "windYieldIndex", value: 8 }]);
        result = noiseMove(s);
        break;
      }
      result =
        "Paneelialueesta varataan 6 ha kulkuyhteydelle. Tuulivoimalamäärä säilyy; yhteys arvioidaan osana kokonaisuutta.";
      solarRemove(s, "solar_connection", 6);
      break;
    case "answer":
      if (noiseFollowup(s)) {
        applyEffects(s, [
          { op: "adjust", field: "windYieldIndex", value: 8 },
          { op: "heightCap", metres: 280 },
        ]);
        s.run = engine.selectProcedureModel(s.run, "F8");
        result =
          "Kaikki voimalat vaihdetaan 8 MW:n ja 280 metrin malliin. Tämän mallin takuuarvoilla yhteismelulaskenta jää alle 40 dB:n. Voimalamäärä säilyy, nimellisteho pienenee.";
        break;
      }
      result =
        "Paneelit tiivistetään erillisiin lohkoihin. Välien kulkuyhteydet säilyvät; kokonaisala pysyy ennallaan.";
      if (s.run.mode !== "wind")
        s.compactions.push(
          "Paneelien tiivistäminen kulkuyhteyksien säilyttämiseksi",
        );
      break;
    case "updateNatura":
      remove(s, "research_edge", s.world.affected.natura, 8);
      result =
        s.run.mode === "solar"
          ? "Kahdeksan hehtaaria rajataan pois. Päivitetty luontovaikutusten arvio valmistuu omien selvitysten pohjalta. Julkinen tutkimus tarkistetaan vielä ennen hyväksymistä."
          : "{countCap} voimalaa rajataan pois. Päivitetty luontovaikutusten arvio valmistuu omien selvitysten pohjalta. Julkinen tutkimus tarkistetaan vielä ennen hyväksymistä.";
      break;
    case "keepNatura":
      s.research.waited = true;
      if (s.research.dueAt !== null && s.research.dueAt > s.run.elapsedMonths)
        s.delays.push({
          reason: "Julkisen tutkimuksen odottaminen",
          months: s.research.dueAt - s.run.elapsedMonths,
        });
      result =
        "Päätösvalmistelu odottaa julkaisua. Tutkimuksen soveltuvuus tarkistetaan omilla maastotiedoilla; yleinen tulos ei yksin riitä.";
      queueResearch(s);
      break;
    case "renew":
      delay(s, "Muuttuneen suunnitelman vaikutusarvioiden päivitys", 2);
      result =
        "Muuttuneiden osien melu- ja luontovaikutukset päivitetään. Viranomainen toteaa päätelmän ajantasaiseksi; tarvittava Natura-täydennys liitetään aineistoon.";
      break;
    case "keepLease":
      result =
        "Konsultti perustelee aiemman arvion soveltuvuuden muuttuneeseen suunnitelmaan. Viranomainen tarkistaa, ovatko johtopäätökset edelleen käyttökelpoisia.";
      if (s.world.criticalIssue === "leases")
        s.unresolved =
          "Viranomainen totesi muutokset olennaisiksi. Täydennystä ei tehty, eikä vanha vaikutusarvio osoita valitun sijoittelun hyväksyttävyyttä. Ehdotusta ei hyväksytä puutteellisella aineistolla.";
      break;
    case "commission":
    case "rework":
      if (s.run.mode === "solar") {
        result =
          "Erillinen aurinkohanke ei tarvitse tuulivoimaloiden tutkavaikutusselvitystä. Viranomaisneuvottelussa täsmennetään aurinkoalueen selvitystarpeet.";
        break;
      }
      if (action === "rework")
        delay(s, "Puolustusvoimien lausunnon suppeampi vertailuvaihtoehto", 1);
      if (s.world.defence === "clear")
        result =
          "Puolustusvoimat ei vastusta esitettyä hanketta. Lausunto koskee toimitettuja paikkoja ja enimmäiskorkeutta; muutokset tarkistetaan myöhemmin.";
      else if (s.world.defence === "oppose")
        story(
          s,
          "defence-no",
          "Puolustusvoimat vastustaa.",
          "Tutkavalvonnan haittaa ei saada hyväksyttäväksi alueen toteuttamiskelpoisilla vaihtoehdoilla. Tuulipohjaiselle hybridihankkeelle ei löydy jatkajaa pelkkänä aurinkohankkeena.",
          "radar",
          "external",
        );
      else {
        result =
          "Puolustusvoimat edellyttää VTT:n tutkavaikutusselvitystä. 15 000 €:n työ tilataan. Tulos voi tukea hanketta, vaatia reiluja poistoja tai johtaa kielteiseen lausuntoon.";
        story(
          s,
          "defence-wait",
          "Tutkavaikutukset lasketaan.",
          result,
          "radar",
          "defence",
        );
      }
      break;
    case "workshop":
      result =
        "Asiantuntijat sopivat tarkastelualueet ja yhteisvaikutusten arvioinnin. Ohjelmalausunnon huomiot viedään työsuunnitelmaan.";
      break;
    case "written":
      result =
        "Aineistopyynnöt kootaan kirjallisesti. Konsultti yhdistää vastaukset, jotta sähkönsiirto ja tuotantoalueet arvioidaan samassa kokonaisuudessa.";
      break;
    case "solarAvoid":
      solarRemove(s, "solar_nature", 8);
      result =
        "8 ha jätetään paneelien ulkopuolelle. Oman luontoselvityksen mukaan rajaus ja säilyvä vesitalous turvaavat havaitut luontoarvot.";
      break;
    case "solarStudy":
      result =
        "Alueen vaihtoehdot ja tarvittavan luvan edellytykset selvitetään. Myönteistä ratkaisua ei voi ostaa.";
      story(
        s,
        "solar-nature-wait",
        "Odotetaan luontoratkaisua.",
        result,
        "frog",
        "solar",
      );
      break;
    case "wetland":
      solarRemove(s, "solar_water", 10);
      result =
        "10 ha varataan vesitalouden tarpeisiin paneelialueen ulkopuolelle. Vesiensuojelu ja jälkihoitovelvoitteet huomioidaan.";
      break;
    case "waterStudy":
      result =
        "Vesienkäsittelyn vaihtoehdot ja tarkkailutiedot arvioidaan. Aluetta ei kuivateta kesken asian käsittelyn.";
      story(
        s,
        "solar-water-wait",
        "Vesi ei odota aikataulua.",
        result,
        "wetland",
        "solar",
      );
      break;
    case "illustrate":
      delay(
        s,
        "Asukkaiden pienryhmät ja paikallisten havaintojen käsittely",
        1,
      );
      result =
        "Huolten syyt käydään läpi kasvokkain ja vastineet täsmennetään. Kaikki eivät muuta kantaansa, mutta paikalliset havainnot saadaan arvioitaviksi.";
      break;
    case "respond":
      result =
        "Kuvat ja vastaukset julkaistaan. Mielipiteiden määrä ei ratkaise kaavaa; perustellut vaikutushuolet on silti käsiteltävä.";
      if (randomUnit(s.run.seed, "public-concern") < 0.5) {
        delay(s, "Kielteisen palautteen vaatima lisäkäsittely", 2);
        result +=
          " Kunta pyytää vielä yhteisen keskustelun. Valmistelu viivästyy kaksi kuukautta.";
      }
      break;
    case "supplement":
      result =
        "Lievennystoimille kirjataan toteutustapa, vastuut ja seuranta. Toimivuus perustellaan ennen kaavapäätöstä.";
      break;
    case "justify":
      delay(s, "Lievennystoimien viranomaisneuvottelu", 1);
      result =
        "Neuvottelussa sovitaan täydennykset. Toteutusvastuut ja lievennysten toimivuus saadaan päätösaineistoon.";
      break;
    case "trim":
      remove(s, "view_edge", 1, 4);
      result =
        s.run.mode === "solar"
          ? "Neljä hehtaaria reunasta jätetään pois. Muutettu ehdotus ja vastineet toimitetaan päätettäväksi."
          : "Yksi reunimmainen voimala jätetään pois. Muutettu ehdotus ja vastineet toimitetaan päätettäväksi.";
      break;
    case "defend":
      result =
        "Havainnekuvat ja perustelut toimitetaan päätösaineistoon. Kunta ratkaisee, riittävätkö ne.";
      break;
    default: {
      const never: never = action;
      throw new Error(`Tuntematon menettelytoiminto: ${never}`);
    }
  }
  if (!(c.id === "feedback" && noiseFollowup(s)))
    result = encounter(s)?.results?.[action] ?? result;
  if (action === "avoid" && encounter(s)?.id.startsWith("golden-"))
    result = `{countCap} riskialtteinta voimalaa poistetaan. Oma törmäysriski pienenee tasolle 0,010 ja reviirin yhteisriski tasolle ${((s.world.goldenNeighborRiskMilli + 10) / 1000).toLocaleString("fi-FI", { minimumFractionDigits: 3 })} vuodessa. Myös elinympäristöhaitat arvioidaan.`;
  const n =
    s.world.affected[
      (c.id === "feedback" ? "noise" : c.id) as keyof Game["world"]["affected"]
    ] ?? 2;
  result = renderCount(result, n);
  s.stories.forEach((st) => {
    st.title = renderCount(st.title, n);
    st.body = renderCount(st.body, n);
  });
  s.lastOutcome = result;
  s.decisions.push({ id: c.id, action, side, result });
  s.cursor++;
  s.revision++;
  if (s.run.ending) {
    s.ending = "choices";
    s.endingReason =
      "Valittu rajaus pienensi hankkeen alle toteuttamiskelpoisen koon.";
    return freeze(s);
  }
  if (DECISIONS[s.cursor]?.stage !== s.stage) endStage(s, s.stage);
  return freeze(s);
}
export function continueStory(s0: Game, expectedToken: string): Game {
  check(
    !s0.ending && s0.stories.length && expectedToken === token(s0),
    "Tapahtuma on jo käsitelty",
  );
  const s = structuredClone(s0),
    current = s.stories.shift()!;
  s.revision++;
  s.lastOutcome = current.body;
  if (current.kind === "external") {
    s.ending = "external";
    s.endingReason = current.body;
  }
  if (current.kind === "decision") {
    s.ending = "choices";
    s.endingReason = current.body;
  }
  if (current.id === "surveys-wait") {
    const due = Math.max(...s.run.jobs.map((j) => j.dueAt));
    s.run = physical(s.run.mode).advanceTime(
      s.run,
      Math.max(0, due - s.run.elapsedMonths),
    );
    check(
      s.run.jobs.every((j) => j.status === "completed"),
      "Maastotyö on kesken",
    );
  }
  if (current.kind === "research") {
    s.research.published = true;
    if (s.research.waited && s.world.researchAdverse)
      s.unresolved =
        "Tutkimus ja omat selvitykset osoittavat merkittävää haittaa koko säilytetyssä sijoittelussa. Herkkä osa päätettiin pitää mukana. Tämän vaihtoehdon hyväksymisedellytykset eivät täyty.";
    if (s.cursor === DECISIONS.length) endStage(s, 3);
  }
  if (current.kind === "defence") {
    const job = s.run.jobs.find((j) => j.jobId === "defence_review")!;
    delay(
      s,
      "VTT:n tutkavaikutusselvityksen odotus",
      Math.max(0, job.dueAt - s.run.elapsedMonths),
    );
    if (s.world.defence === "studyReject") {
      s.ending = "external";
      s.endingReason =
        "VTT:n laskenta osoittaa tutkavalvonnan haitan. Puolustusvoimat vastustaa hanketta myös suppeana. Tämän hybridihankkeen kehitys päättyy.";
    } else if (s.world.defence === "reduce") {
      const count =
        s.world.affected.defence -
        (s.decisions.some((d) => d.action === "rework") ? 1 : 0);
      remove(s, "defence_edge", count, 0);
      s.lastOutcome = `Puolustusvoimat ei vastusta VTT:n selvityksen pohjalta tehtyä suppeaa vaihtoehtoa. ${count} riskipaikkaa jätetään pois. Myös muutetun sijoittelun ympäristövaikutukset arvioidaan.`;
    } else
      s.lastOutcome =
        "VTT:n selvitys valmistuu. Puolustusvoimat ei vastusta esitettyä hanketta. Paikat, korkeus ja nimellisteho säilyvät.";
  }
  if (current.kind === "solar") {
    const nature = current.id === "solar-nature-wait",
      job = s.run.jobs.find(
        (j) => j.jobId === (nature ? "solar_permit" : "solar_water"),
      )!;
    delay(
      s,
      nature
        ? "Aurinkoalueen luontoratkaisun selvitys ja käsittely"
        : "Aurinkoalueen vesitalouden tarkkailu ja käsittely",
      Math.max(0, job.dueAt - s.run.elapsedMonths),
    );
    const accepted = nature ? s.world.solarPermit : s.world.solarWaterUseful;
    if (!accepted)
      solarRemove(s, nature ? "solar_nature" : "solar_water", nature ? 8 : 10);
    const variant = encounter(s, s.cursor - 1);
    s.lastOutcome = accepted
      ? nature
        ? variant?.id === "solar-nest-water"
          ? "Tarkempi selvitys tukee pienempää luontorajausta. Paneeliala säilyy; toimivuus varmistetaan toteutuksessa."
          : "Vaihtoehdot on tutkittu, poikkeamisen edellytykset täyttyvät ja lupa myönnetään sitovin ehdoin. Paneeliala säilyy tässä tapauksessa."
        : "Viranomainen hyväksyy tarkennetun vesienkäsittelyratkaisun. Paneeliala säilyy; jälkihoito ja tarkkailu jatkuvat päätösten mukaisesti."
      : nature
        ? "Selvitys ei tue suunniteltua käyttöä. Linnustollisesti merkittävää osaa ei voida käyttää; viitasammakkotapauksessa poikkeusluvan edellytykset eivät täyty. 8 ha rajataan paneelien ulkopuolelle."
        : "Vesienkäsittely pitää säilyttää laajana. Märkä osa on myös linnustolle tärkeä. 10 ha jätetään paneelialueen ulkopuolelle.";
  }
  if (current.kind === "aviation") {
    const job = s.run.jobs.find((j) => j.jobId === "aviation_review");
    check(job, "Lentoesteen selvitystä ei ole tilattu");
    if (job.dueAt > s.run.elapsedMonths)
      s.delays.push({
        reason: "Nykyisten lentoestepaikkojen lisäselvitys",
        months: job.dueAt - s.run.elapsedMonths,
      });
    s.run = physical(s.run.mode).advanceTime(
      s.run,
      Math.max(0, job.dueAt - s.run.elapsedMonths),
    );
    if (!s.world.aviationAccepted)
      remove(s, "aviation_edge", s.world.affected.height, 0);
    s.lastOutcome = s.world.aviationAccepted
      ? `Esiselvitys tukee ${s.world.affected.height} paikan säilyttämistä. Traficomin lupakäsittelyä jatketaan tältä pohjalta. Voimalamäärä, korkeus ja nimellisteho säilyvät.`
      : `Esiselvitys ei tue näitä ${s.world.affected.height} paikkaa. Niille ei löydy enää korvaavaa sijaintia, joten ne poistetaan. Muiden voimaloiden korkeus ja malli säilyvät.`;
    if (s.run.ending) {
      s.ending = `choices`;
      s.endingReason = `${s.world.affected.height} paikan menetyksen jälkeen hanke jäi alle toteuttamiskelpoisen koon.`;
    }
  }
  if (current.kind === "adoption") {
    check(
      !s.unresolved && s.facts.assessed && s.facts.land && s.facts.initiated,
      "Hyväksymisen edellytys puuttuu",
    );
    s.facts.planAdopted = true;
    s.facts.planFinal = true;
    const due = Math.max(
      ...s.run.jobs.filter((j) => j.status === "active").map((j) => j.dueAt),
      s.run.elapsedMonths,
    );
    s.run = physical(s.run.mode).advanceTime(s.run, due - s.run.elapsedMonths);
    check(
      s.run.jobs.some(
        (j) => j.jobId === "build_permits" && j.status === "completed",
      ),
      "Lupatyö ei ole valmis",
    );
    s.run = physical(s.run.mode).confirmProcedureGrid(
      s.run,
      getDerivedStats(s.run).combinedNameplateMWac,
    );
    s.facts.permits = true;
    s.facts.grid = true;
    story(
      s,
      "ready",
      "Viimeisetkin ehdot täyttyvät.",
      "Kaava on lainvoimainen. Toteutuksen luvat, maa- ja reittioikeudet, verkkosopimus ja rahoitus on varmistettu. Puolustusvoimien kanta on tarkistettu lopulliselle sijoittelulle. Hanke on rakentamisvalmis.",
      "celebration",
      "ready",
    );
  }
  if (current.kind === "ready") {
    check(
      Object.values(s.facts).slice(0, -1).every(Boolean) && !s.unresolved,
      "Rakentamisvalmiuden edellytys puuttuu",
    );
    s.facts.ready = true;
    s.ending = "ready";
    s.endingReason = "Hanke saavutti rakentamisvalmiuden.";
  }
  if (!s.ending && !s.stories.length) s.stage = DECISIONS[s.cursor]?.stage ?? 3;
  return freeze(s);
}

const gameSchema = z.strictObject({
  version: z.literal("swipe-2"),
  contentVersion: z.literal(CONTENT_VERSION),
  run: z.unknown(),
  cursor: z.number().int().min(0).max(DECISIONS.length),
  revision: z.number().int().min(0),
  stage: z.number().int().min(0).max(3),
  encounters: z.array(z.number().int().min(0)).length(DECISIONS.length),
  delays: z
    .array(
      z.strictObject({
        reason: z.string().min(1),
        months: z.number().int().positive(),
      }),
    )
    .max(20),
  compactions: z.array(z.string().min(1)).max(DECISIONS.length),
  layoutTightened: z.boolean(),
  world: z.strictObject({
    externalStage: z.number().int().min(0).max(3).nullable(),
    criticalIssue: z.enum(["nature", "natura", "leases"]),
    ownersAgree: z.boolean(),
    researchAdverse: z.boolean(),
    researchCost: z.number().int().positive(),
    aviationAccepted: z.boolean(),
    goldenNeighborRiskMilli: z.number().int().nonnegative(),
    landComponent: z.enum(["wind", "solar"]),
    tightLayoutProblem: z.boolean(),
    affected: z.strictObject({
      nature: z.number().int().min(2).max(4),
      noise: z.number().int().min(1).max(4),
      height: z.number().int().min(1).max(3),
      natura: z.number().int().min(1).max(3),
      defence: z.number().int().min(3).max(6),
    }),
    defence: z.enum(["clear", "study", "reduce", "oppose", "studyReject"]),
    solarPermit: z.boolean(),
    solarWaterUseful: z.boolean(),
    species: z.enum(["poron", "metsäpeuran", "suden", "kotkan"]),
  }),
  decisions: z
    .array(
      z.strictObject({
        id: z.string(),
        action: z.enum(actions),
        side: z.enum(["left", "right"]),
        result: z.string(),
      }),
    )
    .max(DECISIONS.length),
  stories: z
    .array(
      z.strictObject({
        id: z.string(),
        title: z.string(),
        body: z.string(),
        art: z.string(),
        kind: z.enum([
          "bridge",
          "research",
          "aviation",
          "defence",
          "solar",
          "external",
          "decision",
          "adoption",
          "ready",
        ]),
      }),
    )
    .max(4),
  lastOutcome: z.string(),
  facts: z.strictObject({
    land: z.boolean(),
    initiated: z.boolean(),
    assessed: z.boolean(),
    planAdopted: z.boolean(),
    planFinal: z.boolean(),
    permits: z.boolean(),
    grid: z.boolean(),
    ready: z.boolean(),
  }),
  unresolved: z.string().nullable(),
  ending: z.enum(["external", "choices", "ready"]).nullable(),
  endingReason: z.string().nullable(),
  research: z.strictObject({
    funded: z.boolean().nullable(),
    dueAt: z.number().int().nullable(),
    published: z.boolean(),
    waited: z.boolean(),
  }),
  initial: z.strictObject({
    windCount: z.number().int().nonnegative(),
    solarHa: z.number().nonnegative(),
    windMW: z.number().nonnegative(),
  }),
});
export function serializeGame(s: Game) {
  return JSON.stringify({
    format: "kaava-swipe-2",
    checksum: hash(JSON.stringify(s)).toString(16),
    state: s,
  });
}
export function restoreGame(raw: string): RestoreResult {
  try {
    const envelope = z
      .strictObject({
        format: z.literal("kaava-swipe-2"),
        checksum: z.string(),
        state: z.unknown(),
      })
      .parse(JSON.parse(raw));
    check(
      hash(JSON.stringify(envelope.state)).toString(16) === envelope.checksum,
      "Tallennus on muuttunut tai vioittunut",
    );
    const parsed = gameSchema.parse(envelope.state);
    const mode = (parsed.run as { mode: Mode })?.mode;
    check(["wind", "solar", "hybrid"].includes(mode), "Tuntematon hankemuoto");
    const run = physical(mode).restoreRun(JSON.stringify(parsed.run));
    check(run.ok, run.ok ? "" : run.error);
    const s = { ...parsed, run: run.state } as Game;
    check(
      s.encounters.every((v, i) => {
        const d = DECISIONS[i]!;
        return (
          v ===
          Math.floor(
            randomUnit(s.run.seed, `encounter-${d.id}`) *
              ((
                (mode === "solar" ? SOLAR_VARIANTS[d.id] : undefined) ??
                VARIANTS[d.id]
              ).length +
                1),
          )
        );
      }),
      "Korttivalikoima ei vastaa tallennettua skenaariota",
    );
    check(
      JSON.stringify(s.world) === JSON.stringify(world(s.run.seed)),
      "Maailmantiedot eivät vastaa siementä",
    );
    check(
      s.cursor === s.decisions.length && s.cursor === s.run.decisionLog.length,
      "Päätöshistoria on ristiriidassa",
    );
    check(
      s.decisions.every(
        (d, i) =>
          d.id === DECISIONS[i]?.id &&
          d.action ===
            ((mode === "solar" && DECISIONS[i]?.solar) || DECISIONS[i]?.base)
              ?.options[s.run.decisionLog[i]?.side === "left" ? 0 : 1]?.action,
      ),
      "Tuntematon päätös tai menettelytoiminto",
    );
    check(
      s.revision >= s.cursor && (s.ending === "ready") === s.facts.ready,
      "Pelin lopputulos on ristiriidassa",
    );
    check(
      !s.facts.planAdopted ||
        (s.cursor === DECISIONS.length &&
          s.facts.assessed &&
          s.facts.land &&
          s.facts.initiated &&
          !s.unresolved),
      "Kaavapäätöksen edellytys puuttuu",
    );
    check(
      !s.facts.ready ||
        (Object.values(s.facts).every(Boolean) &&
          s.run.jobs.some(
            (j) => j.jobId === "build_permits" && j.status === "completed",
          ) &&
          s.run.grid.technicalStatus === "confirmed"),
      "RtB:n edellytys puuttuu",
    );
    return { ok: true, state: freeze(s) };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      recoverableRaw: raw,
    };
  }
}
