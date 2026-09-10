import { getScore, scoreView } from "../game/v5";
import type { Game } from "../game/v5";
export function Score({ game }: { game: Game }) {
  const score = getScore(game);
  if (!score) return null;
  return (
    <section className="score" aria-label="Pelikerran pisteet">
      {game.routeCategory==='hybrid_solar' && <p className="recovery-summary">Aurinkojatkon tulos. Alkuperäisen hybridin tuuliosa jäi pois. Aurinkoalaa verrataan alkuperäiseen {game.initial.solarHa} ha:n tavoitteeseen; koko hankkeen kulut ja viiveet ovat mukana.</p>}
      <strong className="score-total">
        {score.total}
        <small> / {score.maximum} pistettä</small>
      </strong>
      <h2>{scoreView(game).title}</h2>
      <p>{scoreView(game).body}</p>
      {score.deductions.length ? (
        <ul>
          {score.deductions.map((line, i) => (
            <li key={i}>
              <span>{line.reason}</span>
              <b>−{line.points}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ei vähennyksiä — koko säilyi ilman ylimääräisiä viiveitä.</p>
      )}
    </section>
  );
}
