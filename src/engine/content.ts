import Ajv2020 from 'ajv/dist/2020';
import schema from '../../schemas/cards.schema.json';
import manifest from '../../content/pilot_manifest.json';
import rawPack from '../../content/cards.pilot.fi.json';
import type { CardPack, Effect } from './types';

export { manifest };
export class ValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'ValidationError'; }
}
export function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new ValidationError(message);
}
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile<CardPack>(schema);
const effectValidator = ajv.compile<Effect>({ $ref: '#/$defs/effect', $defs: schema.$defs });
export function validateEffect(effect: unknown): asserts effect is Effect {
  check(effectValidator(effect), `Virheellinen effect-käsky: ${ajv.errorsText(effectValidator.errors)}`);
  if (effect.op === 'track') {
    check((manifest.allowedTracks[effect.key] as string[]).includes(effect.value), `Tuntematon polkuarvo: ${effect.key}.${effect.value}`);
  }
}
export function validatePack(value: unknown): CardPack {
  check(validate(value), `Korttiskeema: ${ajv.errorsText(validate.errors)}`);
  const ids = new Set(value.cards.map(c => c.id));
  check(ids.size === value.cards.length, 'Kortin ID toistuu');
  for (const card of value.cards) {
    for (const c of card.requiresAll) {
      const numeric = manifest.adjustableFields.includes(c.field) || manifest.derivedConditionFields.includes(c.field);
      const expected = numeric ? 'number' : c.field.startsWith('flags.') || (c.field.startsWith('site.') && c.field !== 'site.windClass') ? 'boolean' : 'string';
      check(typeof c.value === expected, `Ehdon väärä tyyppi: ${card.id} ${c.field}`);
      check(['eq', 'neq'].includes(c.operator) || numeric, 'Numeerinen vertailu vaatii numerokentän');
      if (c.field === 'site.windClass') check(['weak', 'good'].includes(String(c.value)), 'Virheellinen tuuliluokka');
      if (c.field.startsWith('tracks.')) {
        const key = c.field.slice(7) as keyof typeof manifest.allowedTracks;
        check((manifest.allowedTracks[key] as string[]).includes(String(c.value)), 'Virheellinen polkuehto');
      }
    }
    for (const choice of Object.values(card.choices)) {
      for (const e of [...choice.effects, ...choice.delayed.flatMap(j => j.effects)]) {
        validateEffect(e);
        if (e.op === 'queueCard') check(ids.has(e.cardId), `Puuttuva jonokortti: ${e.cardId}`);
        if (e.op === 'windRemove') check(!card.modes.includes('solar'), 'Tuulipoisto aurinkotilassa');
        if (e.op === 'solarRemove') check(!card.modes.includes('wind'), 'Aurinkopoisto tuulitilassa');
        if (e.op === 'pivot') check(card.modes.length === 1 && card.modes[0] === 'hybrid', 'Pivot vain hybridille');
      }
    }
  }
  return structuredClone(value);
}
export const pilotPack = validatePack(rawPack);
