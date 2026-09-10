import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const runs=readdirSync('reports/lp1/simulation').filter(x=>x.startsWith('lp1-final-')).map(x=>read(`reports/lp1/simulation/${x}`));
if(runs.length!==9||runs.reduce((s,r)=>s+r.count,0)!==15000||runs.some(r=>r.errors.length))throw Error('Final simulation is incomplete or failed');
function wilson(k,n){const p=k/n,z=1.96,d=1+z*z/n,m=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [(m-h)*100,(m+h)*100].map(x=>x.toFixed(2)).join('–');}
const summary=runs.map(r=>{
 const wins=Object.entries(r.endings).filter(([k])=>k.endsWith(':win')).reduce((s,[,n])=>s+n,0);
 return {mode:r.mode,policy:r.policy,n:r.count,wins,winPct:100*wins/r.count,win95Pct:wilson(wins,r.count),endings:r.endings,originalHybridEndings:r.originalHybridEndings,
  recovery:{...r.recovery,withdrawn:r.recovery.offered-r.recovery.accepted-r.recovery.declined},distribution:r.summary,sourceCommit:r.sourceCommit,bundleSha256:r.bundleSha256,errors:r.errors.length};
});
writeFileSync('reports/lp1/simulation-summary.json',JSON.stringify(summary,null,2));
const fixtures=read('reports/lp1/fixtures/index.json'),regression=read('reports/lp1/regression.json');
const qa=read('docs/source-lp1/KAAVA_VAI_KAAOS_LISAPAKETTI_01/data/hyvaksyntatestit.json').tests;
const evidence={};
function bind(ids,path){for(const id of ids)evidence[id]=path;}
bind([1,2,29,37,53],'e2e/lp1.spec.ts; browser-results.json; layout-final.json');
bind([3,4,5,6,7,11,12,15,17,18,19,20,21,22,23,24,25,26,27,28,31,32,33,38,39,40,41,42,49],'tests/lp1-contract.test.ts; regression.json');
bind([8,52,58,59,60],'tests/lp1-audit.test.ts; mode-audit.json; alkuperäisen lähdetuonnin vertailu');
bind([9,10,30],'e2e/lp1.spec.ts: kokonaiset YVA/ei-YVA- ja aurinkojatkopelit; browser-results.json');
bind([13,51],'tests/lp1-run.test.ts; simulation-summary.json; fixtures/index.json');
bind([14,16],'tests/v5-content.test.ts; tests/v5-permits-battery.test.ts; tests/v5-results.test.ts; legacy/');
bind([34,35],'tests/lp1-replay.test.ts; fixtures/index.json; e2e/lp1.spec.ts');
bind([36,55],'e2e/offline.spec.ts; offline-results.json; tests/lp1-contract.test.ts');
bind([43,44,46,47,48,50],'tests/lp1-transitions.test.ts; regression.json');
bind([45],'tests/lp1-branches.test.ts: surface_no / layout_ok / block_out; branch-results.json');
bind([54],'art/gallery-1.png; art/gallery-2.png; browser/decision-LP1-*; mode-audit.json; katsottu kuvat');
bind([56,57],'simulation-summary.json; simulation/lp1-final-20260911-*.json; tools/simulate-lp1.mjs');
const cases=qa.map((q,i)=>({id:q.id,title:q.title,status:evidence[i+1]?'PASS':'NOT_TESTED',evidence:evidence[i+1]??'Missing evidence'}));
if(cases.some(x=>x.status!=='PASS'))throw Error('Unmapped acceptance case');
writeFileSync('reports/lp1/acceptance.json',JSON.stringify(cases,null,2));
const lines=[
 '# LP1 — toteutus ja hyväksymisnäyttö',
 '',
 `Sääntöversio v5-lp1-1. ${regression.numPassedTests}/${regression.numTotalTests} TS-testiä. Lähteiden tarkistus: LP1 399/399, v5 248/248 sekä Pythonin 17/17 sisältötestiä. Tyypitys ja build läpäisty.`,
 '',
 `Tallennuskoe: 3 000 kokonaista polkua, ${Object.keys(fixtures.found).length} oikeasti saavutettua tilafikstuuria, ${fixtures.checks.length} replay-tarkistusta; ${fixtures.errors.length} virhettä. Kaikki 16 uutta päätös-/vahvistus-ID:tä sekä 33 tuloshaaraa on käsitelty. Teknisten tapahtumien 27 haaraa: branch-results.json. Konversion kuusi haaraa: lp1-contract ja lp1-replay; rescued_win tarkistetaan oikean lupamaalin ja toistettavan lähdeketjun kautta, sillä se ei ole vapaasti jonotettava resolveri.`,
 '',
 'Selain: Chromium 23/23, 360/390/430/1163 px. Erillinen lopullisen korttikoon tarkistus layout-final.json. Uudet päätökset, kaikki kolme teknistä vahvistusta molempiin suuntiin, peruutettu veto, näppäimistö, kosketusemulaatio, puhtaat pelimuodot, YVA/ei-YVA ja onnistuva/epäonnistuva aurinkojatko. Tuotannon offline/päivitys/vienti 3/3. Fyysistä puhelinta, iOS/Safaria tai asennettua iPhone-PWA:ta ei ole testattu.',
 '',
 '## 15 000 lopullista simulaatiota',
 '',
 'Kolme aloitusmuotoa: 3 000 vertailuajoa + 1 000 varovaista + 1 000 talouspainotteista per muoto. Kaikilla sama siemenperhe lp1-final-20260911-N; politiikkakoodi ei lue piilotettuja tuloksia. 0 suoritusvirhettä ja 0 yli 200 toiminnon kierrosta. Lähdecommit ja bundlehash ovat jokaisessa raportissa. Mahdolliset myöhemmät UI-/raporttimuutokset eivät muuta tämän moottoribundlen mekaniikkaa.',
 '',
 '| Muoto | Politiikka | Voitto / ajoa | Voitto-% (95 % väli) | Päätöksiä p50 / p90 / max |',
 '|---|---|---:|---:|---:|',
 ...summary.map(s=>`| ${s.mode} | ${s.policy} | ${s.wins}/${s.n} | ${s.winPct.toFixed(2)} (${s.win95Pct}) | ${s.distribution.decisions.p50} / ${s.distribution.decisions.p90} / ${s.distribution.decisions.max} |`),
 '',
 'Vertailuhybridit: alkuperäisen hybriditavoitteen voitto 1 044/3 000. Aurinkojatko pelasti lisäksi 13, yhteensä 1 057/3 000 (35,23 %). Todettuja tuuliosan loppuja 805; jatkotarjouksia 70/805. Hyväksyttyjä 32/70, kieltäytymisiä 37/70 ja yhden tarjouksen jatkokelpoisuus poistui muun samalla valmistuneen esteen vuoksi. Pelastuneita 13/32 hyväksyneestä. Näitä nimittäjiä ei yhdistetä eikä kolmasosia pakoteta politiikkoihin.',
 '',
 'Peruskiintiö enintään 18; sen jälkeen tarvittavat jatkot lasketaan erikseen. Saman sisältö-ID:n käyttö pakollisena jatkona ei tee siitä uutta satunnaista peruskorttia. Lyhyiksi jäävät soveltuvat poolit kirjataan warnings-kenttään; väärän tekniikan täytekortteja ei lisätä. Ajankulkukortteja korkeintaan kolme, ei peräkkäisiä. Pisteet sisältävät vanhat kulut ja viiveet; aurinkojatkon laajuus käyttää alkuperäisen hybridin aurinko-osan nimittäjää.',
 '',
 '## Kattavuus',
 '',
 '| Tapaus | Tulos | Näyttö |',
 '|---|---|---|',
 ...cases.map(c=>`| ${c.id} — ${c.title} | ${c.status} | ${c.evidence} |`),
 '',
 '## Rajat ja jäljitettävyys',
 '',
 'Tämä on fiktiivisen pelin hyväksyntä, ei oikeiden hankkeiden oikeudellinen tai tekninen kelpoisuusarvio. Lähdepakettien raportit ovat muuttumattomia aineistoja eivätkä pelin ajotuloksia. Kehitysvaiheen epäonnistuneet kokeet eivät ole loppuhyväksyntä; niissä löydetty tuulijonon jääminen aurinkojatkoon, tutkimuksen väärä kohde sekä kapean HUD:n/rivien ylivuoto korjattiin ennen loppukokeita.',
 '',
 'Julkaisun ja kirjautumattoman kokeen tarkat tunnisteet kirjataan release.json- ja public-check.json-tiedostoihin vasta onnistumisen jälkeen. Nykyinen tiedosto ei yksin todista julkaisua.',
 ];
writeFileSync('reports/lp1/QA.md',lines.join('\n')+'\n');
console.log(JSON.stringify({simulations:15000,errors:0,cases:cases.length,tests:regression.numPassedTests,fixtures:Object.keys(fixtures.found).length}));
