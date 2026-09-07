import { z } from "zod";
import rawPack from "../../content/cards.campaign.fi.json";
import flow from "../../content/campaign_flow.json";
import { createEngine } from "../engine/engine";
import { check, validatePack } from "../engine/content";
import { freeze, hash } from "../engine/scenario";
import type { Mode, RunState, Side } from "../engine/types";

export const campaignPack = freeze(validatePack(rawPack));
export const physical = createEngine(campaignPack);
export const STAGES = [
  "Maanvuokraus",
  "Kaava-aloite",
  "YVA-ohjelma",
  "YVA-selostus ja kaavaluonnos",
  "Kaavaehdotus",
  "Kaavahyväksyntä",
  "RtB · rakentamisvalmius",
] as const;
const tags = [
  "landScope",
  "owners",
  "access",
  "restoration",
  "leaseLong",
  "leaseShort",
  "funding",
  "leases",
  "initiative",
  "regional",
  "gridOrder",
  "technical",
  "engagement",
  "municipality",
  "stageReady",
  "scope",
  "ecologyOrder",
  "windOrder",
  "routeScope",
  "naturaOrder",
  "programme",
  "natureReview",
  "avoidNature",
  "mitigateNature",
  "yield",
  "yieldOptimise",
  "noise",
  "heightResolve",
  "heightLower",
  "draft",
  "draftFeedback",
  "conclusion",
  "regionalFinal",
  "gridBase",
  "gridAlternative",
  "naturaCurrent",
  "naturaCheck",
  "proposal",
  "consultation",
  "leaseRenewed",
  "leaseCheck",
  "finalQa",
  "decisionEvidence",
  "adoption",
  "adoptionRecorded",
  "planFinal",
  "permits",
  "permitDecision",
  "gridContract",
  "routeRights",
  "equipment",
  "commercial",
  "rtbQa",
  "rtb",
  "interlude",
] as const;
const nodeSchema = z.object({
  cardId: z.string(),
  stage: z.number().int().min(0).max(6),
  left: z.enum(tags),
  right: z.enum(tags),
  windOnly: z.boolean(),
  waitFor: z.array(z.string()),
  risk: z.enum(["nature", "grid", "natura", "lease"]).nullable(),
  optional: z.boolean(),
  alternatives: z.array(z.string()).optional(),
});
const nodes = z.array(nodeSchema).parse(flow.nodes);
const worldSchema = z.object({
  fatalStage: z.number().int().min(-1).max(6),
  fatalAt: z.number().int(),
  researchAdverse: z.boolean(),
  species: z.enum(["poron", "metsäpeuran", "suden", "kotkan"]),
  electionMonth: z.number().int(),
  regionalChange: z.boolean(),
});
const recordSchema = z.object({
  cardId: z.string(),
  tag: z.string(),
  stage: z.number().int(),
  month: z.number().int(),
  side: z.enum(["left", "right"]),
});
const outerSchema = z.strictObject({
  version: z.literal("rtb-1"),
  run: z.unknown(),
  stage: z.number().int().min(0).max(6),
  cursor: z.number().int().nonnegative(),
  world: worldSchema,
  records: z.array(recordSchema),
  ending: z.string().nullable(),
  endingDetail: z.string().nullable(),
  facts: z.strictObject({
    municipalityInitiated: z.boolean(),
    assessmentAdequate: z.boolean(),
    planAdopted: z.boolean(),
    planFinal: z.boolean(),
    readyToBuild: z.boolean(),
  }),
  research: z.strictObject({
    invited: z.boolean(),
    dueAt: z.number().int().nullable(),
    published: z.boolean(),
    contributionEUR: z.union([z.literal(0), z.literal(20000)]),
  }),
  notices: z.array(z.string()),
  initial: z.object({
    windCount: z.number(),
    solarHa: z.number(),
    windMWac: z.number(),
    uniqueExternalKm: z.number(),
  }),
});
export type Campaign = Omit<z.infer<typeof outerSchema>, "run"> & {
  run: RunState;
};
function world(seed: string): Campaign["world"] {
  const r = hash(`world:${seed}`);
  return {
    fatalStage: r % 11 === 0 ? (r >>> 8) % 7 : -1,
    fatalAt: 3,
    researchAdverse: hash(`research:${seed}`) % 2 === 0,
    species: (["poron", "metsäpeuran", "suden", "kotkan"] as const)[
      hash(`species:${seed}`) % 4
    ]!,
    electionMonth: 22 + (r % 14),
    regionalChange: (r >>> 4) % 5 === 0,
  };
}
const nodeList = (s: Campaign) =>
  nodes
    .filter((n) => !(n.windOnly && s.run.mode === "solar"))
    .map((n) => ({
      ...n,
      cardId:
        n.alternatives?.[
          hash(s.run.seed + ":interlude:" + n.stage) % n.alternatives.length
        ] ?? n.cardId,
    }));
function has(s: Campaign, ...choices: string[]) {
  return choices.some((tag) => s.records.some((r) => r.tag === tag));
}
const jobDone = (s: Campaign, id: string) =>
  s.run.jobs.some((j) => j.jobId === id && j.status === "completed");
const err = (s: Campaign, code: string, detail: string) => {
  s.ending = code;
  s.endingDetail = detail;
};
function protect(s: Campaign) {
  check(s.version === "rtb-1", "Tuntematon kampanjaversio");
  if (s.run.ending)
    err(
      s,
      s.run.ending,
      "Yhtiön hankekoko-, aika-, liittymä- tai resurssiraja tuli vastaan. Päätöshistoria näyttää siihen johtaneet ratkaisut.",
    );
}
function gates(s: Campaign, gate: "adoption" | "rtb") {
  const missing: string[] = [];
  if (!has(s, "leases") || !has(s, "leaseRenewed", "leaseCheck"))
    missing.push("voimassa oleva maanhallinta");
  if (!s.facts.municipalityInitiated) missing.push("kunnan valmistelupäätös");
  if (!s.facts.assessmentAdequate) missing.push("vaikutusaineiston riittävyys");
  if (!has(s, "naturaCurrent", "naturaCheck"))
    missing.push("ajantasainen Natura-tarkastelu");
  if (!has(s, "regionalFinal")) missing.push("maakuntakaavan yhteensopivuus");
  if (!has(s, "consultation") || !has(s, "finalQa"))
    missing.push("kuuleminen ja päätösaineisto");
  if (!physical.getDerivedStats(s.run).windCompatible)
    missing.push("mallin ja korkeusrajan yhteensopivuus");
  if (gate === "rtb") {
    if (!jobDone(s, "rtb_permits") || !has(s, "permitDecision"))
      missing.push("ratkaistut lupapäätökset");
    if (!s.facts.planAdopted || !s.facts.planFinal)
      missing.push("lainvoimainen kaava");
    for (const [tag, label] of [
      ["permits", "luvat"],
      ["gridContract", "verkkoratkaisu"],
      ["routeRights", "reittioikeudet"],
      ["equipment", "laitemalli"],
      ["commercial", "kaupalliset edellytykset"],
      ["rtbQa", "valmiustarkastus"],
    ])
      if (!has(s, tag!)) missing.push(label!);
  }
  return missing;
}
function prepare(s: Campaign): Campaign {
  protect(s);
  if (s.ending || s.run.offeredCard) return freeze(s);
  const list = nodeList(s),
    node = list[s.cursor];
  if (!node) {
    check(s.facts.readyToBuild, "Kampanja päättyi ilman RtB-ratkaisua");
    return freeze(s);
  }
  s.stage = node.stage;
  if (
    s.run.elapsedMonths >= s.world.electionMonth &&
    !s.notices.some((n) => n.startsWith("Vaalikausi"))
  ) {
    s.notices.push(
      "Vaalikausi vaihtui. Uusille päättäjille toimitetaan sama ajantasainen päätösaineisto.",
    );
  }
  if (
    node.stage === s.world.fatalStage &&
    node.left ===
      [
        "leases",
        "municipality",
        "programme",
        "avoidNature",
        "regionalFinal",
        "adoption",
        "rtb",
      ][node.stage]
  ) {
    s.run = physical.offerCard(s.run, `X00${node.stage + 1}`);
    return freeze(s);
  }
  if (s.stage >= 2 && !s.research.invited) {
    s.run = physical.offerCard(s.run, "R001");
    return freeze(s);
  }
  if (
    s.research.dueAt !== null &&
    !s.research.published &&
    s.run.elapsedMonths >= s.research.dueAt
  ) {
    s.run = physical.offerCard(
      s.run,
      s.world.researchAdverse ? "R003" : "R002",
    );
    return freeze(s);
  }
  const required = node.waitFor.filter(
    (id) => !(id === "wind_measurement" && s.run.mode === "solar"),
  );
  const waiting = required.filter((id) => !jobDone(s, id));
  if (waiting.length) {
    check(
      waiting.every((id) => s.run.jobs.some((j) => j.jobId === id)),
      "Pakollista selvitystä ei ole tilattu",
    );
    return freeze(s);
  }
  s.run = physical.offerCard(s.run, node.cardId);
  return freeze(s);
}
export function createCampaign(
  seed: string,
  mode: Mode,
  previousNameId?: string,
): Campaign {
  const run = physical.createRun({ seed, mode, previousNameId }),
    stats = physical.getDerivedStats(run);
  return prepare({
    version: "rtb-1",
    run,
    stage: 0,
    cursor: 0,
    world: world(seed),
    records: [],
    ending: null,
    endingDetail: null,
    facts: {
      municipalityInitiated: false,
      assessmentAdequate: false,
      planAdopted: false,
      planFinal: false,
      readyToBuild: false,
    },
    research: {
      invited: false,
      dueAt: null,
      published: false,
      contributionEUR: 0,
    },
    notices: [],
    initial: {
      windCount: stats.windCount,
      solarHa: stats.solarHa,
      windMWac: stats.windMWac,
      uniqueExternalKm: stats.uniqueExternalKm,
    },
  });
}
export function currentCampaignCard(s: Campaign) {
  const card = campaignPack.cards.find(
    (c) => c.id === s.run.offeredCard?.cardId,
  );
  if (!card) return null;
  const c = structuredClone(card),
    node = nodeList(s)[s.cursor];
  if (c.id.startsWith("R"))
    c.artKey =
      s.world.species === "kotkan"
        ? "eagle"
        : s.world.species === "suden"
          ? "map"
          : "reindeer";
  if (node?.cardId === c.id) {
    if (node.risk === "natura" && s.run.site.waterRisk)
      c.body =
        "Muuttunut hankeversio vaikuttaa selvitettyyn vesitalouden vaikutusreittiin. Natura-tarkastelu tarvitsee päivityksen. Aiemman arvion vahvistaminen sellaisenaan ei riitä päätösaineistoksi.";
    if (node.risk === "lease" && has(s, "leaseShort"))
      c.body =
        "Alussa valittu lyhyt optio on päättymässä ennen jatkovaihetta. Tarvittavat jatkosopimukset on vielä tehtävä. Nykyiset ehdot eivät kata jäljellä olevaa kehitystyötä.";
    if (node.left === "heightResolve" && s.run.site.aviationConflict)
      c.body =
        "Lausunnon korkeusraja on 260 metriä. Nykyinen F10-malli ei mahdu siihen. Fiktiivinen F8-malli sopii rajaan, mutta nimellisteho pienenee mallinvaihdossa erikseen.";
    if (node.left === "conclusion" && !s.run.site.yvaRequired) {
      c.title = "Vaikutusaineiston riittävyys";
      c.body =
        "Tämä skenaario ei edellytä YVA-menettelyä. Kaavoitusta varten tehdyn vaikutusaineiston riittävyys ja ajantasaisuus tarkistetaan silti ennen ehdotusta.";
    }
  }
  return freeze(c);
}
export function waitingMonths(s: Campaign) {
  const n = nodeList(s)[s.cursor];
  const due = s.run.jobs
    .filter((j) => j.status === "active" && n?.waitFor.includes(j.jobId))
    .map((j) => j.dueAt);
  // Stop at the next completion/publication. Parallel work stays parallel.
  if (
    s.research.dueAt !== null &&
    !s.research.published &&
    s.research.dueAt > s.run.elapsedMonths
  )
    due.push(s.research.dueAt);
  return due.length ? Math.max(0, Math.min(...due) - s.run.elapsedMonths) : 0;
}
export function waitCampaign(state: Campaign) {
  check(!state.run.offeredCard && !state.ending, "Ratkaise kortti ensin");
  const s = structuredClone(state),
    months = waitingMonths(s);
  check(months > 0, "Kampanja ei odota ajastettua työtä");
  s.run = physical.advanceTime(s.run, months);
  return prepare(s);
}
export function applyCampaignChoice(
  state: Campaign,
  token: string,
  side: Side,
): Campaign {
  check(
    !state.ending && state.run.offeredCard?.token === token,
    "Päätös on vanhentunut tai jo käsitelty",
  );
  const s = structuredClone(state),
    id = s.run.offeredCard!.cardId;
  s.run = physical.applyChoice(s.run, token, side);
  if (id.startsWith("X")) {
    s.records.push({
      cardId: id,
      tag: "externalStop",
      stage: s.stage,
      month: s.run.elapsedMonths,
      side,
    });
    err(
      s,
      "externalObstacle",
      campaignPack.cards.find((c) => c.id === id)!.body,
    );
    return freeze(s);
  }
  if (id === "R001") {
    s.research.invited = true;
    s.research.dueAt = s.run.elapsedMonths + 5;
    s.research.contributionEUR = side === "left" ? 20000 : 0;
  } else if (id === "R002" || id === "R003") {
    s.research.published = true;
    s.notices.push(
      `${s.world.species[0]!.toUpperCase()}${s.world.species.slice(1)} yleisen seurannan tulos ${id === "R003" ? "edellytti täydennyksiä" : "tuki arviointia"}. Rahoitusosuus ${s.research.contributionEUR.toLocaleString("fi-FI")} €.`,
    );
  } else {
    const node = nodeList(s)[s.cursor];
    check(
      node?.cardId === id,
      "Kortti ei vastaa menettelyn nykyistä tapahtumaa",
    );
    const tag = node[side];
    s.records.push({
      cardId: id,
      tag,
      stage: s.stage,
      month: s.run.elapsedMonths,
      side,
    });
    if (!s.run.ending) {
      if (tag === "municipality") {
        check(jobDone(s, "municipality_decision"), "Kunnan päätöstä odotetaan");
        s.facts.municipalityInitiated = true;
      }
      if (tag === "gridContract")
        s.run = physical.confirmProcedureGrid(
          s.run,
          physical.getDerivedStats(s.run).combinedNameplateMWac *
            (s.run.site.gridConstraint ? 0.85 : 1),
        );
      if (
        tag === "avoidNature" &&
        (s.run.site.frogConflict || s.run.site.goldenEagleConflict)
      ) {
        s.run = physical.applyProcedureEffects(
          s.run,
          s.run.mode === "wind"
            ? [{ op: "windRemove", count: 2, reason: "campaign_nature" }]
            : [{ op: "solarRemove", hectares: 12, reason: "campaign_nature" }],
        );
      }
      if (tag === "yield" || tag === "yieldOptimise") {
        check(jobDone(s, "wind_measurement"), "Mittaus ei ole valmistunut");
        const delta =
          s.run.site.windClass === "weak"
            ? tag === "yieldOptimise"
              ? -10
              : -18
            : 8;
        s.run = physical.applyProcedureEffects(s.run, [
          { op: "adjust", field: "windYieldIndex", value: delta },
          { op: "adjust", field: "economicsIndex", value: delta < 0 ? -8 : 4 },
        ]);
      }
      if (tag === "heightResolve" || tag === "heightLower") {
        const cap = s.run.site.aviationConflict
          ? 260
          : tag === "heightLower"
            ? 280
            : 300;
        s.run = physical.applyProcedureEffects(s.run, [
          { op: "heightCap", metres: cap },
        ]);
        s.run = physical.selectProcedureModel(s.run, cap < 280 ? "F8" : "F10");
      }
      if (tag === "gridAlternative")
        s.run = physical.applyProcedureEffects(s.run, [
          { op: "gridDistance", deltaKm: 4 },
        ]);
      if (tag === "gridBase" && s.run.site.gridConstraint) {
        s.notices.push("Verkon perusreitti vaati lisäsuunnittelun.");
        s.run = physical.applyProcedureEffects(s.run, [
          { op: "adjust", field: "budget", value: -4 },
        ]);
      }
      if (tag === "naturaCheck" && s.run.site.waterRisk) {
        err(
          s,
          "outdatedAssessment",
          "Muuttunut hanke olisi tarvinnut Natura-tarkastelun päivityksen. Päätösaineisto ei vastaa vaikutuksia. Tämä tunnettu puute oli nähtävissä ennen valintaa.",
        );
      }
      if (tag === "leaseCheck" && has(s, "leaseShort"))
        err(
          s,
          "leaseExpired",
          "Lyhyt optio ei kattanut jatkoa. Tarvittavaa jatkosopimusta ei vahvistettu ennen sen päättymistä.",
        );
      if (tag === "regionalFinal" && s.world.regionalChange) {
        s.notices.push(
          "Maakuntakaavan muuttunut rajaus vaati yhteensovittamisen.",
        );
        s.run = physical.applyProcedureEffects(s.run, [
          { op: "adjust", field: "budget", value: -2 },
        ]);
      }
      if (tag === "conclusion") {
        check(
          jobDone(s, "ecology_surveys") &&
            jobDone(s, "groundwater_study") &&
            has(s, "programme", "scope") &&
            has(s, "draftFeedback"),
          "Vaikutusaineisto ei ole valmis riittävyyden ratkaisemiseen",
        );
        s.facts.assessmentAdequate = true;
      }
      if (tag === "adoption") {
        const missing = gates(s, "adoption");
        if (missing.length)
          err(
            s,
            "gatesMissing",
            `Päätösaineistosta puuttuu: ${missing.join(", ")}.`,
          );
        else s.facts.planAdopted = true;
      }
      if (tag === "planFinal") {
        check(s.facts.planAdopted, "Kaavaa ei ole hyväksytty");
        s.facts.planFinal = true;
      }
      if (tag === "rtb") {
        const missing = gates(s, "rtb");
        if (missing.length)
          err(
            s,
            "rtbMissing",
            `Rakentamisvalmiudesta puuttuu: ${missing.join(", ")}.`,
          );
        else {
          s.facts.readyToBuild = true;
          s.ending = "readyToBuild";
          s.endingDetail =
            "Skenaarion luvat, kaava, oikeudet, verkkoratkaisu ja kaupalliset edellytykset on varmistettu. Hanke on valmis rakentamisen aloituspäätökseen.";
        }
      }
    }
    s.cursor++;
  }
  if (id.startsWith("R"))
    s.records.push({
      cardId: id,
      tag: id,
      stage: s.stage,
      month: s.run.elapsedMonths,
      side,
    });
  return prepare(s);
}
export function previewCampaignChoice(s: Campaign, side: Side) {
  const projected = applyCampaignChoice(s, s.run.offeredCard!.token, side);
  return {
    stats: physical.getDerivedStats(projected.run),
    resources: projected.run.resources,
    months: projected.run.elapsedMonths - s.run.elapsedMonths,
    ending: projected.ending,
    detail: projected.endingDetail,
    researchContributionEUR: projected.research.contributionEUR,
  };
}
export function serializeCampaign(s: Campaign) {
  return JSON.stringify(s);
}
export function restoreCampaign(
  raw: string,
):
  | { ok: true; state: Campaign }
  | { ok: false; error: string; recoverableRaw: string } {
  try {
    const v = outerSchema.parse(JSON.parse(raw));
    const r = physical.restoreRun(JSON.stringify(v.run));
    check(r.ok, r.ok ? "" : r.error);
    const s: Campaign = { ...v, run: r.state };
    check(
      JSON.stringify(s.world) === JSON.stringify(world(s.run.seed)),
      "Maailmantapahtumat eivät vastaa siementä",
    );
    check(
      s.records.length === s.run.decisionLog.length &&
        s.records.every(
          (r, i) =>
            r.cardId === s.run.decisionLog[i]?.cardId &&
            r.side === s.run.decisionLog[i]?.side,
        ),
      "Kampanjan päätöshistoria on ristiriidassa",
    );
    check(
      s.cursor === s.records.filter((r) => r.cardId.startsWith("C")).length,
      "Menettelykohdan ristiriita",
    );
    const list = nodeList(s),
      core = s.records.filter((r) => r.cardId.startsWith("C"));
    // Resource exhaustion may prevent the current procedure decision resolving.
    const factMatches = (fact: boolean, tag: string) =>
      fact === has(s, tag) || (!!s.run.ending && !fact);
    check(
      core.every(
        (r, i) =>
          list[i]?.cardId === r.cardId &&
          list[i]?.[r.side] === r.tag &&
          list[i]?.stage === r.stage,
      ),
      "Menettelyhistoria ei vastaa tarjottuja valintoja",
    );
    check(
      factMatches(s.facts.municipalityInitiated, "municipality") &&
        (!s.facts.municipalityInitiated || jobDone(s, "municipality_decision")),
      "Kunnan päätöksen ristiriita",
    );
    check(
      factMatches(s.facts.assessmentAdequate, "conclusion") &&
        (!s.facts.assessmentAdequate ||
          (jobDone(s, "ecology_surveys") && jobDone(s, "groundwater_study"))),
      "Riittävyysratkaisun ristiriita",
    );
    check(
      factMatches(s.facts.planFinal, "planFinal"),
      "Lainvoimaisuuden ristiriita",
    );
    const offer = s.run.offeredCard?.cardId;
    if (offer?.startsWith("C"))
      check(
        list[s.cursor]?.cardId === offer,
        "Tarjottu kortti ohittaa menettelykohdan",
      );
    if (offer === "R001")
      check(!s.research.invited, "Tutkimusrahoitus on jo käsitelty");
    if (offer === "R002" || offer === "R003")
      check(
        s.research.invited &&
          !s.research.published &&
          s.research.dueAt !== null &&
          s.run.elapsedMonths >= s.research.dueAt &&
          offer === (s.world.researchAdverse ? "R003" : "R002"),
        "Tutkimustulos ei ole vielä julkaistu",
      );
    check(
      !s.facts.planAdopted ||
        (has(s, "adoption") && !gates(s, "adoption").length),
      "Hyväksynnältä puuttuu päätös tai sen edellytys",
    );
    check(
      (s.ending === "readyToBuild") === s.facts.readyToBuild,
      "Lopputulos ei vastaa rakentamisvalmiutta",
    );
    check(
      !s.facts.readyToBuild ||
        (has(s, "rtb") &&
          !gates(s, "rtb").length &&
          s.ending === "readyToBuild"),
      "RtB-portti on ristiriidassa",
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
