import { useId } from "react";
import { getDerivedStats } from "../game";
import type { Game } from "../game";
export function AssetIcon({
  type,
  ratio = 1,
}: {
  type: "wind" | "solar";
  ratio?: number;
}) {
  const id = useId().replaceAll(":", ""),
    fill = Math.max(0, Math.min(1, ratio));
  const path =
    type === "wind"
      ? "M30 32 L34 32 L36 62 L28 62 Z M30 29 L27 7 Q28 2 32 3 L34 26 Z M35 29 L58 37 Q61 39 58 42 L36 34 Z M29 34 L12 51 Q8 53 7 49 L25 31 Z"
      : "M6 28 H58 L63 56 H1 Z M28 57 H36 V62 H28 Z";
  return (
    <svg
      viewBox="0 0 64 66"
      aria-hidden="true"
      className={`asset-icon ${type}`}
    >
      <defs>
        <clipPath id={id}>
          <path d={path} />
          {type === "solar" && <circle cx="32" cy="12" r="9" />}
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="64" height="66" fill="#655589" />
        <rect
          className="asset-fill"
          x="0"
          y={66 * (1 - fill)}
          width="64"
          height={66 * fill}
          fill={type === "wind" ? "#c7f36b" : "#ffce66"}
        />
      </g>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {type === "wind" ? (
        <circle
          cx="32"
          cy="31"
          r="4"
          fill="#f9f2ff"
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : (
        <>
          <circle
            cx="32"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M4 41h56M19 28l-3 28m29-28 3 28M32 28v28M18 10l-4-1m36 1-4-1M24 0l2 4m15-4-2 4"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}
export function AssetHud({ game, onInfo }: { game: Game; onInfo: () => void }) {
  const d = getDerivedStats(game.run),
    f = (n: number) => n.toLocaleString("fi-FI", { maximumFractionDigits: 1 });
  return (
    <section
      className={`asset-hud ${game.run.mode}`}
      aria-label="Hankkeen koko"
    >
      {game.run.mode !== "solar" && (
        <div className="wind-stats">
          <div
            className="count-stat"
            role="meter"
            aria-label="Tuulivoiman tehoa jäljellä"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((d.windMWac / game.initial.windMW) * 100)}
          >
            <AssetIcon type="wind" ratio={d.windMWac / game.initial.windMW} />
            <strong>
              {d.windCount}
              <small> kpl</small>
            </strong>
          </div>
          <div className="number-stat">
            <strong>
              {d.windHeightCapM}
              <small> m</small>
            </strong>
            <span>Kokonaiskorkeus</span>
          </div>
          <div className="number-stat">
            <strong>
              {f(d.windMWac)}
              <small> MW</small>
            </strong>
            <span>Yhteisteho</span>
          </div>
        </div>
      )}
      {game.run.mode !== "wind" && (
        <div
          className="solar-stats"
          role="meter"
          aria-label="Aurinkoalueesta jäljellä"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((d.solarHa / game.initial.solarHa) * 100)}
        >
          <AssetIcon type="solar" ratio={d.solarHa / game.initial.solarHa} />
          <strong>
            {f(d.solarHa)}
            <small> ha</small>
          </strong>
          {game.run.mode === "solar" && <span>Aurinkoalue</span>}
        </div>
      )}
      <button
        className="info-button"
        onClick={onInfo}
        aria-label="Mitä hankkeen luvut tarkoittavat?"
      >
        i
      </button>
    </section>
  );
}
