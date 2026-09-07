// Historical pilot viewer only; not imported by the current player UI.
import {getDerivedStats} from '../engine/rules';
import type {RunState} from '../engine';
export function Stats({run}:{run:RunState}) {const d=getDerivedStats(run);return <p>{d.windCount} kpl · {d.windHeightCapM} m · {d.windMWac} MW · {d.solarHa} ha · {d.uniqueExternalKm} km</p>;}
