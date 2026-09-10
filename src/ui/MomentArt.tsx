import type { CSSProperties } from "react";

/** Decorative, finite motion. No random values, timers, or game-state effects. */
export function MomentArt({ kind, stage = 4, mode='hybrid' }: { kind: "transition" | "win" | "loss"; stage?: number; mode?: 'wind'|'solar'|'hybrid' }) {
  return <div className={`moment-art moment-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 320 210">
      <circle className="moment-sun" cx="246" cy="52" r="30" fill="#ffce66" />
      <path d="M0 161 79 92 159 154 231 101 320 164V210H0Z" fill="#afa2c8" />
      <path d="M0 188 91 158 192 182 320 140V210H0Z" fill="#557564" />
      {mode!=='solar' && <g className="moment-turbine">
        <path d="M87 84h6l5 108H82Z" fill="#f7f1df" />
        <g className="moment-blades">
          <path d="M87 81 84 26 92 21 94 81 144 105 143 112 91 90 49 129 43 125 85 85Z" fill="#f7f1df" />
          <circle cx="90" cy="86" r="6" fill="#d2b38b" />
        </g>
      </g>}
      {mode!=='wind' && <g><path d="M179 145h88l12 41H167Z" fill="#35264e" />
      <path d="m198 145-4 41m24-41v41m20-41 5 41m-68-20h97" stroke="#ffce66" strokeWidth="2" /></g>}
      {kind === "transition" && <g className="moment-pages" transform="rotate(9 187 112)">
        <path d="M160 42h68v100h-68z" fill="#eadfc4" /><path d="M148 48h67v99h-67z" fill="#f7f1df" />
        <path d="M160 69h39m-39 14h32m-32 14h39m-39 14h28" stroke="#557564" strokeWidth="4" />
        <text x="180" y="136" textAnchor="middle" fill="#786589" fontSize="18">{stage} / 4</text>
      </g>}
      {kind === "win" && <g className="moment-toast">
        <path d="M133 99h20v23q-10 18-20 0ZM163 95h20v23q-10 18-20 0Z" fill="#f7f1df" />
        <path d="M135 111h16v11q-8 14-16 0ZM165 107h16v11q-8 14-16 0Z" fill="#ffce66" />
        <path d="M143 133v22m-9 0h18m21-26v22m-9 0h18" stroke="#f7f1df" strokeWidth="3" />
      </g>}
      {kind === "loss" && <path className="moment-cloud" d="M118 43h89l30 23 36 2 26 24H115L90 72Z" fill="#786589" />}
    </svg>
    {kind === "win" && <div className="celebration">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ "--x": `${(i * 47) % 101}%`, "--delay": `${(i % 7) * 0.07}s`, "--turn": `${i * 67}deg`, "--fall": `${100 + (i % 4) * 25}px`, background: ["#ffce66", "#c7f36b", "#afa2c8", "#f49fc1"][i % 4] } as CSSProperties} />)}</div>}
  </div>;
}
