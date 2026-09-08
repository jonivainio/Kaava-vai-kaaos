import { branchId } from "../content";
import { excludeAssets } from "../assets";
import { canWarnLeaseExpiry } from "../procedure";
import { cost, resolveCase, schedule, workOnly } from "../operations";
import { sample } from "../world";
import type { Rule, OutcomeResolver } from "./types";

export const leaseRules: Rule[] = [
  { ids: ["UUSI-P4-VUOKRAJATKO"], role: "followup", art: ["lease-renewal", "owner-plan"],
    spec: () => ({ family: "leaseExtension", component: "wind", mechanism: "land", count: 3 }),
    eligible: game => canWarnLeaseExpiry(game) && game.seenIds.includes("EV-MAAKUNTAODOTUS") && !game.facts.leaseExtensionOffered,
    apply(game, issue, id, choice) {
      if (!canWarnLeaseExpiry(game)) throw new Error("Extension offer requires actual forecast, avoidable delay and live contracts");
      game.facts.leaseExtensionOffered = true;
      for (const lease of game.leases.filter(lease => lease.essential && lease.status === "valid" && game.world.regionalPlanDue > (lease.extensionDeadline ?? lease.developmentDeadline))) {
        lease.forecastWarned = true;
        lease.extensionOffered = choice === "A" ? "higher" : "current";
        lease.response = "pending";
      }
      const remaining = Math.min(...game.leases.filter(lease => lease.response === "pending").map(lease => lease.developmentDeadline - game.calendar.now));
      schedule(game, issue, id, choice, "EV-OPTIO", { duration: Math.min(2, remaining / 2), euros: 2000, key: "ownerExtensionResponses" });
      return null;
    } },
];
export const leaseOutcomes: Record<string, OutcomeResolver> = {
  "EV-OPTIO": (game, issue, outcome) => {
    if (!game.facts.leaseExtensionOffered || outcome.sourceId !== "UUSI-P4-VUOKRAJATKO") throw new Error("Lease response without an extension offer");
    const pending = game.leases.filter(lease => lease.response === "pending");
    if (!pending.length) throw new Error("No pending owner responses");
    let refused = 0;
    for (const lease of pending) {
      const willingness = sample(game.run.seed, `${lease.id}:extensionWillingness`);
      const accepts = willingness < (lease.extensionOffered === "higher" ? 0.8 : 0.4);
      lease.response = accepts ? "accepted" : "declined";
      if (accepts) {
        lease.extensionDeadline = Math.max(lease.developmentDeadline, game.world.regionalPlanDue) + 18;
        if (lease.extensionOffered === "higher") cost(game, issue, outcome.sourceId, `extension:${lease.id}`, 10000, "contractLiability");
      } else refused++;
    }
    const replacement = refused > 0 && sample(game.run.seed, "lease-extension-replacement") < 0.55;
    const branch = refused === 0 ? 0 : replacement || refused < 2 ? 1 : 2;
    if (branch === 1) {
      const unavailable = new Set(pending.filter(lease => lease.response === "declined").flatMap(lease => lease.parcelIds));
      // The smaller alternative concerns the refusing owners' actual holdings,
      // never arbitrary turbines or panels on another owner's retained land.
      issue.placeIds = game.run.assets.windSites.filter(site => unavailable.has(site.id) && !site.exclusions.length).slice(0, 3).map(site => site.id);
      issue.parcelIds = game.run.assets.solarParcels.filter(parcel => unavailable.has(parcel.id) && !parcel.exclusions.length).slice(0, 8).map(parcel => parcel.id);
      excludeAssets(game, issue);
      workOnly(game, issue, outcome.sourceId, "replacementLandAssessment", 5, 13000, 0);
      for (const lease of pending.filter(lease => lease.response === "declined")) lease.essential = false;
    }
    game.facts.leaseNegotiationComplete = true;
    game.facts.noReplacementLand = branch === 2;
    // A refusal does not terminate a contract early. The calendar handles the actual expiry.
    resolveCase(issue); return branchId(outcome.contentId, branch);
  },
};
