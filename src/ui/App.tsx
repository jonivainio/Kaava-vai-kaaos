import { useEffect, useRef, useState } from "react";
import {
  createGame,
  currentDecision,
  currentStory,
  endingView,
  canOpenEpilogue,
  openEpilogue,
  choose,
  continueStory,
  token,
  serializeGame,
  restoreGame,
  STAGES,
} from "../game/v5";
import type { Game, Mode, Side } from "../game/v5";
import { SwipeCard } from "./SwipeCard";
import { Score } from "./Score";
import { AssetHud } from "./AssetHud";
import { MomentArt } from "./MomentArt";
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
  const playArea = useRef<HTMLElement | null>(null);
  useEffect(() => { playArea.current?.scrollTo({ top: 0 }); }, [game?.revision, screen]);
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
  const next = (expected: string) => {
    const s = current.current;
    if (!s || token(s) !== expected) return;
    try {
      put(continueStory(s, token(s)));
    } catch (e) {
      setError(String(e));
    }
  };
  const c = game ? currentDecision(game) : null,
    story = game ? currentStory(game) : null,
    ending = game ? endingView(game) : null,
    wait = game?.scenes[0]?.kind === "wait",
    ended = game?.ending && !game.scenes.length;
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
              {game.battery.status === "included" && <div className="battery-strip" aria-label="Akkuvarasto">
                <b>Akku</b><span>Lataus {game.battery.chargeMW.toLocaleString("fi-FI")} MW</span>
                <span>Purku {game.battery.dischargeMW.toLocaleString("fi-FI")} MW</span>
                <span>{game.battery.energyMWh.toLocaleString("fi-FI")} MWh</span>
              </div>}
              <div className="chapter">
                <span>
                  {screen === "tutorial"
                    ? "PIENI HARJOITUS"
                    : STAGES[game.stage - 1]}
                </span>
                <div aria-label={`Vaihe ${game.stage} / 4`}>
                  {STAGES.map((s, i) => (
                    <i key={s} className={i < game.stage ? "filled" : ""} />
                  ))}
                </div>
              </div>
              <main
                ref={playArea}
                className={`play-screen ${ended ? "end-screen" : ""} ${story?.kind === "transition" ? "transition-screen" : ""}`}
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
                      <p className="tutorial-story-note">Tarinahetket ovat tekstikortteja. Niissä molemmat suunnat jatkavat tarinaa.</p>
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
                ) : ended && game.ending && ending ? (
                  <>
                    <MomentArt kind={game.ending.kind === "win" ? "win" : "loss"} />
                    <h1>{ending.title}</h1>
                    <p className="end-reason">{ending.body}</p>
                    <Score game={game} />
                    {canOpenEpilogue(game) && <button className="secondary" onClick={() => put(openEpilogue(game, token(game)))}>Vapaaehtoinen jälkitarina · akkuosan luovutus</button>}
                    <button
                      className="primary"
                      onClick={() => setScreen("menu")}
                    >
                      Uusi mahdollisuus <span>↗</span>
                    </button>
                  </>
                ) : story?.kind === "transition" ? (
                  <>
                    <MomentArt kind="transition" stage={story.stage ?? game.stage} />
                    <section
                      className="narrative story-narrative"
                      aria-live="polite"
                    >
                      <span className="eyebrow">
                        SEURAAVA VAIHE
                      </span>
                      <h1>{story.title}</h1>
                      {!!story.updates.length && <p className="narration-updates">{story.updates.join("\n\n")}</p>}
                      <p>{story.body}</p>
                    </section>
                    <button
                      className="primary transition-next"
                      onClick={() => next(token(game))}
                      aria-label="Siirry seuraavaan vaiheeseen"
                    >
                      Siirry vaiheeseen <span>→</span>
                    </button>
                  </>
                ) : story || wait ? (
                  <><SwipeCard key={token(game)} token={token(game)} art="" speaker="" left="Jatka tarinaa" right="Jatka tarinaa"
                    story={story ? { title: story.title, body: story.body, reaction: story.reaction, updates: story.updates, eyebrow: story.result ? "ARVIOINNIN TULOS" : "TARINA JATKUU" }
                      : { title: "Työt etenevät", body: "Selvitykset ja valmistelu jatkuvat. Siirrytään seuraavaan tulokseen.", updates: [game.lastOutcome, ...game.narration.updates].filter(Boolean), eyebrow: "AIKA ETENEE" }}
                    onChoose={expected => next(expected)} />
                    {story?.id === "start" && <details className="owner-goals"><summary>Omistajan lähtötavoite ja jatkoraja</summary>
                      <p>{game.initial.windCount} voimalaa / {game.initial.windMW} MW, {game.initial.solarHa} ha aurinkoaluetta. Valmistelussa harkitaan lisäksi 100 MW lataus- ja purkutehon, 200 MWh:n akkua.</p>
                      <p>Jatkoon tarvitaan vähintään {game.initial.minimumWindMW} MW tuulta tai {game.initial.minimumSolarHa} ha aurinkoaluetta sekä {100 * game.initial.minimumScopeRatio} % alkuperäisestä painotetusta laajuustavoitteesta. Tuuli painaa 60 %, aurinko 30 % ja akku 10 %.</p>
                    </details>}</>
                ) : c ? (
                  <>
                    <section className="narrative" aria-live="polite">
                      {c.summary && <p
                        className="previous-result"
                        data-testid="previous-result"
                      >
                        {c.summary}
                      </p>}
                      {c.reaction && <p className="scene-reaction">{c.reaction}</p>}
                      <h1>{c.title}</h1>
                      <p className="question">{c.question}</p>
                      {c.id === "BESS-P4-02" && game.battery.connectionApprovalExpires !== null && <p className="deadline-note">Hyväksyntä voimassa vielä {(game.battery.connectionApprovalExpires - game.calendar.now).toLocaleString("fi-FI")} kk.</p>}
                    </section>
                    <SwipeCard
                      key={token(game)}
                      token={token(game)}
                      art={c.art}
                      speaker={c.speaker}
                      left={c.options[0].label}
                      right={c.options[1].label}
                      notes={{
                        left: c.options[0].note,
                        right: c.options[1].note,
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
              <p><b>Akku</b>: latausteho ja purkuteho ilmoitetaan megawatteina (MW), varastoitava energia megawattitunteina (MWh). Akun purku ei lisää tuulivoimaloiden nimellistehoa.</p>
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
