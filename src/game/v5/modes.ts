import lp1 from '../../../content/lp1.fi.json';
import type { CaseRecord, Component, GameV5, RouteCategory } from './types';

const policy = new Map(lp1.policy.map(x => [x.id, x]));
const added = new Map(lp1.newPolicy.map(x => [x.id, x]));
export function activeComponents(game: GameV5): Component[] {
  const parts: Component[] = ['shared'];
  if (game.activeMode !== 'solar' && game.run.assets.windSites.some(x => !x.exclusions.length)) parts.push('wind');
  if (game.activeMode !== 'wind' && game.run.assets.solarParcels.some(x => !x.exclusions.length)) parts.push('solar');
  if (game.activeMode === 'hybrid' && game.battery.status !== 'excluded') parts.push('bess');
  return parts;
}
/** Explicit source policy AND actual case/asset permission. Unknown IDs are denied. */
export function modeAllows(game: GameV5, id: string, issue?: Pick<CaseRecord,'component'|'family'> | null): boolean {
  const components = activeComponents(game);
  // An already ordered exclusion verification can finish after its last target
  // was removed; it cannot reintroduce that technology into a converted mode.
  if(id.startsWith('EV-')||id.startsWith('LP1-E-')) {
    if(game.activeMode!=='solar'&&!components.includes('wind'))components.push('wind');
    if(game.activeMode!=='wind'&&!components.includes('solar'))components.push('solar');
  }
  if (issue && !components.includes(issue.component)) return false;
  const extra = added.get(id);
  if (extra) return extra.contexts.includes(game.routeCategory);
  const row = policy.get(id);
  if (!row || !row.contexts.includes(game.routeCategory)) return false;
  switch (row.classification) {
    case 'requires_own_wind': return components.includes('wind');
    case 'requires_own_solar': return components.includes('solar');
    case 'hybrid_bess': return game.routeCategory === 'hybrid' && components.includes('bess');
    case 'case_scoped':
      if (issue) return components.includes(issue.component);
      if (id === 'external-golden-full') return components.includes('wind') && game.world.species === 'golden';
      if (id === 'external-herding') return game.world.herdingArea;
      if (id === 'ext-nature-network') return game.world.forestDeerArea;
      return !id.startsWith('EV-'); // An unbound case result is never a candidate.
    case 'mode_presentation':
      if (['interludes[1][1]','interludes[1][3]','interludes[2][1]','draft-done'].includes(id)) return game.procedure.yvaRequired && game.procedure.yvaDetermined;
      if (id.endsWith('::no-yva')) return game.procedure.yvaDetermined && !game.procedure.yvaRequired;
      return true;
    case 'shared_requires_rule_audit':
      if (['leases','evidence-joint'].includes(id)) return components.includes('wind');
      if (id === 'UUSI-P4-12') return game.battery.status === 'included';
      if (id === 'EV-MELU') return Boolean(issue && (issue.component === 'wind' || issue.component === 'bess'));
      return true;
    default: return false;
  }
}
export function modeLabel(route: RouteCategory): string {
  return {wind:'Tuulihanke',solar:'Aurinkohanke',hybrid:'Hybridihanke',hybrid_solar:'Hybridistä aurinkohankkeeksi'}[route];
}
export function stageLabels(game: GameV5): string[] {
  if (!game.procedure.yvaDetermined) return ['Maanvuokraus','Kaava-aloite ja menettelytarve','Selvitykset ja kaavaluonnos','Kaavaehdotus ja luvitus'];
  return game.procedure.yvaRequired ? ['Maanvuokraus','Kaava-aloite ja YVA-ohjelma','YVA-selostus ja kaavaluonnos','Kaavaehdotus ja luvitus'] :
    ['Maanvuokraus','Kaava-aloite ja selvityssuunnitelma','Vaikutusselvitykset ja kaavaluonnos','Kaavaehdotus ja luvitus'];
}
