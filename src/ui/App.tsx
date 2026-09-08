import { useRef, useState } from "react";
import {
  createGame,
  currentDecision,
  choose,
  continueStory,
  token,
  serializeGame,
  restoreGame,
  STAGES,
} from "../game";
import type { Game, Mode, Side } from "../game";
import { SwipeCard } from "./SwipeCard";
import { Score } from "./Score";
import { AssetHud, AssetIcon } from "./AssetHud";
import {
  readSaved,
  saveCurrent,
  recovery,
  tutorialDone,
  markTutorialDone,
  exportText,
  requestGameFullscreen,
} from "./gameStorage";
import Updates from "./Updates";
const modeNames = { wind: "Tuuli", solar: "Aurinko", hybrid: "Hybridi" };
export default function App() {
  const [saved, setSaved] = useState(readSaved),
    [game, setGame] = useState<Game | null>(null),
    [screen, setScreen] = useState<"menu" | "play" | "tutorial">("menu"),
    [mode] = useState<Mode>("hybrid"),
    [seed, setSeed] = useState(""),
    [error, setError] = useState(""),
    [settings, setSettings] = useState(false),
    [info, setInfo] = useState(false),
    [backup, setBackup] = useState(recovery);
  const current = useRef<Game | null>(null);
  const put = (s: Game) => {
    current.current = s;
    setGame(s);
    setSaved({ ok: true, state: s });
    try {
      saveCurrent(s);
      setBackup(recovery());
      setError("");
    } catch {
      setError(
        "Tallennus ei onnistunut. Voit viedä pelikerran talteen valikosta.",
      );
    }
  };
  const start = () => {
    requestGameFullscreen();
    const value =
      seed.trim() ||
      Array.from(crypto.getRandomValues(new Uint32Array(2)), (n) =>
        n.toString(36),
      ).join("-");
    put(
      createGame(
        value,
        mode,
        saved?.ok ? saved.state.run.projectIdentity.nameId : undefined,
      ),
    );
    setScreen(tutorialDone() ? "play" : "tutorial");
    setSettings(false);
  };
  const decide = (expected: string, side: Side) => {
    const s = current.current;
    if (!s || token(s) !== expected) return;
    try {
      put(choose(s, expected, side));
    } catch (e) {
      setError(String(e));
    }
  };
  const next = () => {
    const s = current.current;
    if (!s) return;
    try {
      put(continueStory(s, token(s)));
    } catch (e) {
      setError(String(e));
    }
  };
  const c = game ? currentDecision(game) : null,
    story = game?.stories[0];
  const ios =
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod/.test(navigator.userAgent) &&
    !window.matchMedia("(display-mode: standalone)").matches;
  return (
    <div className="world">
      <div className={`phone-shell ${screen === "menu" ? "at-menu" : ""}`}>
        <header className="game-header">
          <button
            className="brand"
            aria-label="Avaa aloitusvalikko"
            onClick={() => setScreen("menu")}
          >
            kaava <i>vai</i> kaaos<span className="brand-dot">✦</span>
          </button>
          <button
            className="menu-dot"
            aria-label="Avaa pelivalikko"
            onClick={() => setSettings(true)}
          >
            •••
          </button>
        </header>
        {screen === "menu" ? (
          <main className="start-screen">
            <div className="start-art" aria-hidden="true">
              <img
                src={`${import.meta.env.BASE_URL}art/hybridscape.svg`}
                alt=""
              />
            </div>
            <div className="game-title">
              <span>KAAVA</span>
              <em>vai</em>
              <span>
                KAAOS<span className="title-star">✦</span>
              </span>
            </div>
            <p className="start-copy">
              Yksi hanke. Kaksi vaihtoehtoa.
              <br />
              Harvoin helppoja päätöksiä.
            </p>
            <div
              className="mode-tabs"
              role="group"
              aria-label="Valitse hankemuoto"
            >
              {(["wind", "solar", "hybrid"] as const).map((m) => (
                <button
                  key={m}
                  aria-pressed={mode === m}
                  disabled={m !== "hybrid"}
                >
                  {m === "wind" ? "↟" : m === "solar" ? "☀" : "↟☀"}
                  <span>{modeNames[m]}</span>
                  {m !== "hybrid" && <small>Ei vielä valittavissa</small>}
                </button>
              ))}
            </div>
            <button className="primary" onClick={start}>
              Aloita hanke <span>↗</span>
            </button>
            {saved?.ok && (
              <button
                className="continue-button"
                onClick={() => {
                  requestGameFullscreen();
                  current.current = saved.state;
                  setGame(saved.state);
                  setScreen(tutorialDone() ? "play" : "tutorial");
                }}
              >
                Jatka · {saved.state.run.projectIdentity.displayName}
              </button>
            )}
            {saved && !saved.ok && (
              <div className="error" role="alert">
                Vanha tai vioittunut tallennus on turvassa.
                <button
                  onClick={() =>
                    exportText(saved.recoverableRaw, "kaava-palautettava.json")
                  }
                >
                  Vie tallennus
                </button>
              </div>
            )}
            <Updates />
            <p className="fiction-note">
              Fiktiivistä hankekehitystä. Ei tositapauksia.
            </p>
            {ios && (
              <p className="install-note">
                Koko ruutu iPhonella: Jaa → Lisää Koti-valikkoon.
              </p>
            )}
          </main>
        ) : (
          game && (
            <>
              <AssetHud game={game} onInfo={() => setInfo(true)} />
              <div className="chapter">
                <span>
                  {screen === "tutorial"
                    ? "PIENI HARJOITUS"
                    : STAGES[game.stage]}
                </span>
                <div aria-label={`Vaihe ${game.stage + 1} / 4`}>
                  {STAGES.map((s, i) => (
                    <i key={s} className={i <= game.stage ? "filled" : ""} />
                  ))}
                </div>
              </div>
              <main
                className={`play-screen ${game.ending ? "end-screen" : ""}`}
              >
                {screen === "tutorial" ? (
                  <>
                    <section className="narrative">
                      <span className="eyebrow">
                        TÄMÄ EI VIELÄ RATKAISE MITÄÄN
                      </span>
                      <h1>Kokeile vetää.</h1>
                      <p>
                        Vedä korttia sivulle. Näet vaihtoehdon.
                        <br />
                        Päästä irti valitaksesi — tai vedä takaisin.
                      </p>
                    </section>
                    <SwipeCard
                      key="tutorial"
                      token="tutorial"
                      art="planner"
                      speaker="Kokeilu on ilmainen"
                      left="Kokeile vasemmalle"
                      right="Kokeile oikealle"
                      tutorial
                      onChoose={() => {
                        markTutorialDone();
                        setScreen("play");
                      }}
                    />
                  </>
                ) : game.ending ? (
                  <>
                    <div className={`ending-stamp ${game.ending}`}>
                      <span>{game.ending === "ready" ? "✦" : "×"}</span>
                      {game.ending === "ready"
                        ? "RAKENTAMISVALMIS"
                        : game.ending === "external"
                          ? "ULKOINEN ESTE"
                          : "RATKAISUN SEURAUS"}
                    </div>
                    <h1>
                      {game.ending === "ready" ? (
                        <>
                          Kaavasta
                          <br />
                          <em>käytäntöön.</em>
                        </>
                      ) : (
                        <>
                          Tähän päättyi
                          <br />
                          <em>tämä hanke.</em>
                        </>
                      )}
                    </h1>
                    <p className="end-reason">{game.endingReason}</p>
                    <Score game={game} />
                    {game.ending === "ready" ? (
                      <div className="rtb-badge">
                        RtB <span>Ready to build</span>
                      </div>
                    ) : (
                      <p className="end-caption">
                        {game.ending === "external"
                          ? "Tätä estettä eivät valintasi olisi poistaneet."
                          : "Tässä hankkeessa toinen ratkaisu olisi voinut auttaa."}
                      </p>
                    )}
                    <button
                      className="primary"
                      onClick={() => setScreen("menu")}
                    >
                      Uusi mahdollisuus <span>↗</span>
                    </button>
                  </>
                ) : story ? (
                  <>
                    <section
                      className="narrative story-narrative"
                      aria-live="polite"
                    >
                      <span className="eyebrow">
                        {story.kind === "transition"
                          ? "SEURAAVA VAIHE"
                          : story.kind === "finding"
                            ? "ARVIOINNIN TULOS"
                            : story.kind === "research"
                              ? "TUTKIMUKSEN TULOS"
                              : "SILLÄ VÄLIN"}
                      </span>
                      <h1>{story.title}</h1>
                      <p>{story.body}</p>
                    </section>
                    <button
                      className="story-card"
                      onClick={next}
                      aria-label="Jatka tarinaa"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}art/${story.art}.svg`}
                        alt=""
                      />
                      <span>
                        {story.kind === "transition"
                          ? "Siirry vaiheeseen"
                          : "Jatka"}{" "}
                        <b>→</b>
                      </span>
                    </button>
                  </>
                ) : c ? (
                  <>
                    <section className="narrative" aria-live="polite">
                      <p
                        className="previous-result"
                        data-testid="previous-result"
                      >
                        {game.lastOutcome}
                      </p>
                      <h1>{c.title}</h1>
                      <p className="question">{c.question}</p>
                    </section>
                    <SwipeCard
                      key={c.token}
                      token={c.token}
                      art={c.art}
                      speaker={c.speaker}
                      left={c.choices.left.label}
                      right={c.choices.right.label}
                      notes={{
                        left: c.choices.left.note,
                        right: c.choices.right.note,
                      }}
                      onChoose={decide}
                    />
                  </>
                ) : null}
              </main>
              <footer className="project-footer">
                <span>{game.run.projectIdentity.displayName}</span>
                <small>{modeNames[game.run.mode]}hanke</small>
              </footer>
            </>
          )
        )}
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {info && (
          <div className="modal-backdrop" onClick={() => setInfo(false)}>
            <section
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="numbers-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                autoFocus
                className="close"
                onClick={() => setInfo(false)}
                aria-label="Sulje lukujen selitykset"
              >
                ×
              </button>
              <h2 id="numbers-title">Mitä luvut kertovat?</h2>
              <p>
                <b>Kokonaiskorkeus</b> on yhden voimalan korkeus maasta lavan
                ylimpään kärkeen.
              </p>
              <p>
                <b>Yhteisteho</b> on jäljellä olevien voimaloiden
                nimellistehojen summa. Esimerkiksi 20 × 10 MW = 200 MW. Se ei
                ole jatkuva tuotanto.
              </p>
              <p>
                <b>Hehtaarit</b> ovat aurinkopaneeleille varattua pinta-alaa.
              </p>
              <p>
                Kuvake tyhjenee, kun tuulivoiman yhteisteho tai aurinkoalue
                pienenee alun suunnitelmasta.
              </p>
            </section>
          </div>
        )}
        {settings && (
          <div className="modal-backdrop" onClick={() => setSettings(false)}>
            <section
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                autoFocus
                className="close"
                onClick={() => setSettings(false)}
                aria-label="Sulje pelivalikko"
              >
                ×
              </button>
              <h2 id="menu-title">Pieni hengähdys.</h2>
              <button
                className="secondary"
                onClick={() => {
                  setScreen("menu");
                  setSettings(false);
                }}
              >
                Aloitusvalikko
              </button>
              <label className="seed-label">
                Seuraavan pelin siemen
                <input
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  maxLength={100}
                  placeholder="Arvotaan, jos jätät tyhjäksi"
                />
              </label>
              <p className="menu-help">
                Sama siemen toistaa hankkeen. Nuolinäppäimillä voi myös valita.
              </p>
              {saved?.ok && (
                <button
                  className="secondary"
                  onClick={() => exportText(serializeGame(saved.state))}
                >
                  Vie pelikerta
                </button>
              )}
              {backup && (
                <button
                  className="secondary"
                  onClick={() =>
                    exportText(backup, "kaava-aiempi-tallennus.json")
                  }
                >
                  Vie aiempi tallennus
                </button>
              )}
              <label className="import-label">
                Tuo pelikerta
                <input
                  type="file"
                  accept="application/json,.json"
                  aria-label="Tuo pelikerta"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const raw = await f.text(),
                      r = restoreGame(raw);
                    if (r.ok) {
                      put(r.state);
                      setScreen("play");
                      setSettings(false);
                    } else {
                      setError(
                        "Tätä tallennusta ei voi avata uudessa pelissä. Alkuperäinen tiedosto säilyy.",
                      );
                      setBackup(raw);
                    }
                  }}
                />
              </label>
              {game && (
                <button
                  className="secondary"
                  onClick={() => {
                    setScreen("tutorial");
                    setSettings(false);
                  }}
                >
                  Kokeile ohjausta uudelleen
                </button>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
