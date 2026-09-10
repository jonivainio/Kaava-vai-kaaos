import lp1 from '../../../content/lp1.fi.json';
import { entry } from './content';
import type { ContentEntry, GameV5 } from './types';

/** Merge independent authored fields, never stop at the first matching overlay. */
export function presentedEntry(game:GameV5,id:string):ContentEntry {
 const item=structuredClone(entry(id));
 const applied=new Map<string,string>();
 for(const row of lp1.overlays){
  if(row.sourceId!==id||!row.contexts.includes(game.routeCategory))continue;
  if(row.when==='procedureProfile.yvaRequired=false'&&(game.procedure.yvaRequired||!game.procedure.yvaDetermined))continue;
  for(const [key,value] of Object.entries(row.fields)){
   if(typeof value!=='string')continue;
   if(applied.has(key)&&applied.get(key)!==value)throw new Error(`Conflicting mode field: ${id}/${key}`);
   applied.set(key,value);
   if(key==='title'||key==='body')item[key]=value;
   else if(/^[AB]\.(label|result)$/.test(key)){const [choice,field]=key.split('.') as ['A'|'B','label'|'result'];item.choices[choice]![field]=value;}
  }
 }
 if(game.activeMode==='solar'&&game.procedure.yvaDetermined&&!game.procedure.yvaRequired){
  if(id==='surveys-spring')item.body='Luontoselvitysten tarjoukset samasta työstä: 55 000 € ja maastokäynnit tällä kaudella, tai 38 000 € ja käynnit ensi kaudella. Halvemman tarjouksen maastotulokset saadaan noin vuotta myöhemmin.';
  if(id==='surveys-team')item.body='Luontokonsultti tarjoaa lisätiimin tälle kaudelle 64 000 eurolla. Kilpailijan 43 000 € tarjous alkaa ensi kaudella. Työn sisältö ja laatuvaatimus ovat samat, valmistumisvuosi eri.';
 }
 if(game.activeMode==='solar'&&id==='UUSI-P4-05')item.body=item.body.replace('Voimalapaikkojen','Paneelialueiden');
 return item;
}
export function modeArt(game:GameV5,id:string,art:string[]):string[]{
 if(game.activeMode==='solar'){
  if(['opinions','opinions-photo'].includes(id))return ['solar-window','winter-screen'];
  // Technology-neutral alternatives for common people/maps; no own wind/BESS.
  const windArt=new Set(['windscape','owner-plan','shared-power','ridge-turbines','noise-contours','noise-guarantee','aviation-section','eagle','osprey','eagle-territory','landscape-photo','village-meeting','winter-view','border-river','neighbour-map','village-view','hybridscape']);
  return art.map(key=>windArt.has(key)?'lp1-solar-plan':key);
 }
 return game.activeMode==='wind' ? art.map(key=>key==='lp1-boundary'?'lp1-councils':key==='shared-power'?'shared-line':key) : art;
}
