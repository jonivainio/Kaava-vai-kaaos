import { getScore } from "../game";
import type { Game } from "../game";
export function Score({ game }: { game: Game }) {
  const score = getScore(game);
  if (!score) return null;
  return (
    <section className="score" aria-label="Pelikerran pisteet">
      <strong className="score-total">
        {score.total}
        <small> / {score.maximum} pistettä</small>
      </strong>
      <p>Hanke maaliin. Näin suunnitelma muuttui:</p>
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
