import { lazy, Suspense, useRef, useState } from "react";
import {
  createCampaign,
  currentCampaignCard,
  applyCampaignChoice,
  previewCampaignChoice,
  waitCampaign,
  waitingMonths,
  physical,
  STAGES,
  serializeCampaign,
  restoreCampaign,
  campaignPack,
} from "../campaign";
import type { Campaign } from "../campaign";
import type { Mode, RunState, Side } from "../engine";
import { Art, CardView } from "./CardView";
import Updates from "./Updates";
import { downloadText, readGame, readRecovery, saveGame } from "./storage";
const Devtools = import.meta.env.DEV ? lazy(() => import("./Devtools")) : null;
const fmt = (n: number) =>
  n.toLocaleString("fi-FI", { maximumFractionDigits: 1 });
const MODE_NAMES = { wind: "Tuuli", solar: "Aurinko", hybrid: "Hybridi" };
const JOB_NAMES: Record<string, string> = {
  grid_initial: "Liittymän esiselvitys",
  ecology_surveys: "Hankkeen luontoselvitykset",
  groundwater_study: "Vesitalouden vaikutusselvitys",
  wind_measurement: "Tuulimittaus",
  municipality_decision: "Kunnan valmistelupäätös",
  rtb_permits: "Rakentamisvaiheen lupakäsittely",
};
const stageLabel = (game: Campaign, stage: number) =>
  !game.run.site.yvaRequired && stage === 2
    ? "Vaikutusselvitysten ohjelma"
    : !game.run.site.yvaRequired && stage === 3
      ? "Vaikutusselvitykset ja kaavaluonnos"
      : STAGES[stage];
export function Stats({ run }: { run: RunState }) {
  const d = physical.getDerivedStats(run);
  return (
    <>
      <div className="assets">
        {run.mode !== "solar" && (
          <div>
            <span className="asset-label">Tuuli</span>
            <strong>
              {d.windCount}
              <small> kpl</small>
              <i> / </i>
              {d.windHeightCapM}
              <small> m</small>
              <i> / </i>
              {d.windCompatible ? fmt(d.windMWac) : "Avoin"}
              <small> MW</small>
            </strong>
            <span>
              {fmt(d.windExternalKm)} km liittymä{" "}
              {run.mode === "hybrid" ? "· yhteinen" : ""}
            </span>
          </div>
        )}
        {run.mode !== "wind" && (
          <div>
            <span className="asset-label">Aurinko</span>
            <strong>
              {fmt(d.solarHa)}
              <small> ha</small>
            </strong>
            <span>
              {fmt(d.solarExternalKm)} km liittymä{" "}
              {run.mode === "hybrid" ? "· yhteinen" : ""}
            </span>
          </div>
        )}
      </div>
      <div className="meters">
        {(
          [
            ["budget", "Budjetti"],
            ["trust", "Luottamus"],
            ["quality", "Selvitysvalmius"],
            ["patience", "Kärsivällisyys"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className={run.resources[key] < 20 ? "low" : ""}>
            <div>
              <span>{label}</span>
              <b>{run.resources[key]}</b>
            </div>
            <div
              className="meter"
              role="meter"
              aria-label={label}
              aria-valuenow={run.resources[key]}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <i style={{ width: `${run.resources[key]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Report({ game }: { game: Campaign }) {
  const d = physical.getDerivedStats(game.run);
  return (
    <div className="report">
      <span className="eyebrow">Hankkeen kehitystulos</span>
      <h1>
        {game.ending === "readyToBuild"
          ? "Valmis seuraavaan vaiheeseen."
          : "Hanke päättyi tähän."}
      </h1>
      <p>{game.endingDetail}</p>
      <dl>
        <div>
          <dt>Kaava hyväksytty</dt>
          <dd>{game.facts.planAdopted ? "Kyllä" : "Ei"}</dd>
        </div>
        <div>
          <dt>Rakentamisvalmius</dt>
          <dd>{game.facts.readyToBuild ? "RtB" : "Ei saavutettu"}</dd>
        </div>
        <div>
          <dt>Tuulivoimalat</dt>
          <dd>
            {game.initial.windCount} → {d.windCount} kpl
          </dd>
        </div>
        <div>
          <dt>Aurinkoalue</dt>
          <dd>
            {game.initial.solarHa} → {fmt(d.solarHa)} ha
          </dd>
        </div>
        <div>
          <dt>Liittymä</dt>
          <dd>
            {game.initial.uniqueExternalKm} → {fmt(d.uniqueExternalKm)} km
          </dd>
        </div>
        <div>
          <dt>Aika / päätökset</dt>
          <dd>
            {game.run.elapsedMonths} kk / {game.records.length}
          </dd>
        </div>
        <div>
          <dt>Yleisen tutkimuksen rahoitus</dt>
          <dd>{fmt(game.research.contributionEUR)} €</dd>
        </div>
      </dl>
      <blockquote>
        {game.ending === "readyToBuild"
          ? "Hanke valmistui kehityksestä. Kansiorakenne kestää vielä yhden vaiheen."
          : "Kaikki hankkeet eivät valmistu. Päätöshistoria sentään valmistui."}
      </blockquote>
      <p className="small">
        RtB tarkoittaa tämän fiktiivisen skenaarion rakentamisvalmiutta.
        Rakentamista ei ole aloitettu.
      </p>
    </div>
  );
}
export default function App() {
  const [saved, setSaved] = useState(readGame),
    [recovery, setRecovery] = useState(readRecovery),
    [game, setGame] = useState<Campaign | null>(null),
    [mode, setMode] = useState<Mode>("hybrid"),
    [screen, setScreen] = useState<"menu" | "play" | "details" | "dev">("menu"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [seed, setSeed] = useState("");
  const current = useRef<Campaign | null>(null);
  function install(s: Campaign) {
    current.current = s;
    setGame(s);
    try {
      saveGame(s);
      setSaved({ ok: true, state: s });
      setRecovery(readRecovery());
      setError("");
    } catch {
      setError(
        "Tallennus ei onnistunut. Vie pelikerta talteen ennen sulkemista.",
      );
    }
  }
  function start() {
    const generated =
      seed.trim() ||
      Array.from(crypto.getRandomValues(new Uint32Array(2)), (n) =>
        n.toString(36),
      ).join("-");
    install(
      createCampaign(
        generated,
        mode,
        saved?.ok ? saved.state.run.projectIdentity.nameId : undefined,
      ),
    );
    setScreen("play");
    setNotice("");
  }
  function decide(token: string, side: Side) {
    try {
      const s = current.current;
      if (!s || s.run.offeredCard?.token !== token) return;
      const card = currentCampaignCard(s);
      const next = applyCampaignChoice(s, token, side);
      install(next);
      setNotice(
        card
          ? `${card.choices[side].label}. ${next.run.offeredOutcomeState?.text ?? ""}`
          : "",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }
  const card = game ? currentCampaignCard(game) : null;
  if (screen === "dev" && Devtools)
    return (
      <Suspense fallback={<p>Ladataan työpöytää…</p>}>
        <Devtools onClose={() => setScreen("menu")} />
      </Suspense>
    );
  return (
    <div className={`app ${screen === "menu" ? "menu-app" : ""}`}>
      <header className="masthead">
        <button className="wordmark" onClick={() => setScreen("menu")}>
          KAAVA <em>vai</em> KAAOS<span>Hankekehitystä kortti kerrallaan</span>
        </button>
        <span className="edition">KENTTÄPAINOS / 01</span>
      </header>
      {screen === "menu" ? (
        <main className="menu">
          <div className="menu-illustration">
            <Art artKey="substation" />
            <span className="stamp">
              MAANVUOKRAUKSESTA
              <br />
              RAKENTAMISVALMIUTEEN
            </span>
          </div>
          <section className="intro">
            <Updates />
            <p className="eyebrow">Yksi hanke. Kaksi ratkaisua.</p>
            <h1>
              Hyvä suunnitelma.
              <br />
              <em>Muuttuvat olosuhteet.</em>
            </h1>
            <p>
              Neuvottele maa, sovita vaikutukset ja vie hanke päätöksentekoon.
              Kaavahyväksynnän jälkeen edessä on vielä rakentamisvalmius.
            </p>
            <div className="mode-picker" role="group" aria-label="Hankemuoto">
              {(["wind", "solar", "hybrid"] as const).map((m) => (
                <button
                  aria-pressed={mode === m}
                  className={mode === m ? "selected" : ""}
                  onClick={() => setMode(m)}
                  key={m}
                >
                  {MODE_NAMES[m]}
                </button>
              ))}
            </div>
            <button className="primary" onClick={start}>
              Uusi hanke <span>↗</span>
            </button>
            <button
              className="secondary"
              disabled={!saved?.ok}
              onClick={() => {
                if (saved?.ok) {
                  current.current = saved.state;
                  setGame(saved.state);
                  setScreen("play");
                }
              }}
            >
              Jatka hanketta
              {saved?.ok && (
                <small>
                  {saved.state.run.projectIdentity.displayName} ·{" "}
                  {saved.state.run.elapsedMonths} kk
                </small>
              )}
            </button>
            <details className="seed-option">
              <summary>Pelikerran siemen</summary>
              <label>
                Toistettava siemen
                <input
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  maxLength={100}
                  placeholder="Arvotaan uuden hankkeen alussa"
                />
              </label>
            </details>
            <details className="seed-option">
              <summary>Tuo tallennettu pelikerta</summary>
              <input
                type="file"
                accept="application/json,.json"
                aria-label="Tuo pelikerta"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const raw = await file.text();
                  const restored = restoreCampaign(raw);
                  if (restored.ok) {
                    install(restored.state);
                    setScreen("play");
                  } else setError("Tiedostoa ei voi avata: " + restored.error);
                }}
              />
            </details>
            {error && (
              <p className="alert" role="alert">
                {error}
              </p>
            )}
            <p className="fiction">
              Fiktiivistä hankekehityssatiiria. Ei yhteyttä todellisiin
              hankkeisiin tai henkilöihin.
            </p>
            {saved && !saved.ok && (
              <div className="alert" role="alert">
                <b>Tallennusta ei voi avata tällä versiolla.</b>
                <p>Alkuperäinen tallennus on säilytetty.</p>
                <button
                  onClick={() =>
                    downloadText(
                      saved.recoverableRaw,
                      "kaava-palautettava.json",
                    )
                  }
                >
                  Vie alkuperäinen tallennus
                </button>
              </div>
            )}
            {Devtools && (
              <button className="text-button" onClick={() => setScreen("dev")}>
                Kehittäjän työpöytä · prologi ja korttipilotti
              </button>
            )}
            {recovery && (
              <button
                className="text-button"
                onClick={() =>
                  downloadText(recovery, "kaava-aiempi-palautettava.json")
                }
              >
                Vie aiempi palautettava tallennus
              </button>
            )}
          </section>
        </main>
      ) : (
        game && (
          <main className="game-layout">
            <aside className="project-panel">
              <div className="project-heading">
                <span className="eyebrow">
                  {MODE_NAMES[game.run.mode]}hanke
                </span>
                <h1>{game.run.projectIdentity.displayName}</h1>
                <span className="month">
                  {game.run.elapsedMonths}
                  <small> hankekuukautta</small>
                </span>
              </div>
              <div className="phase">
                <b>0{game.stage + 1} / 07</b>
                <span>{stageLabel(game, game.stage)}</span>
              </div>
              <Stats run={game.run} />
              <nav className="stage-list" aria-label="Hankkeen vaiheet">
                {STAGES.map((stage, i) => (
                  <div
                    key={stage}
                    className={
                      i === game.stage
                        ? "active"
                        : i < game.stage
                          ? "complete"
                          : ""
                    }
                  >
                    <span>{i < game.stage ? "✓" : `0${i + 1}`}</span>
                    {stageLabel(game, i)}
                  </div>
                ))}
              </nav>
              <button
                className="text-button"
                onClick={() =>
                  setScreen(screen === "details" ? "play" : "details")
                }
              >
                {screen === "details"
                  ? "Takaisin korttiin"
                  : "Hankekansio · selvitykset ja päätökset"}{" "}
                ↗
              </button>
              <button
                className="text-button"
                onClick={() =>
                  downloadText(serializeCampaign(game), "kaava-hanke.json")
                }
              >
                Vie pelikerta
              </button>
            </aside>
            <section className="play-panel">
              {error && (
                <div role="alert" className="alert">
                  {error}
                </div>
              )}
              {game.ending && screen !== "details" ? (
                <>
                  <Report game={game} />
                  <button className="primary" onClick={() => setScreen("menu")}>
                    Takaisin aloitukseen →
                  </button>
                  <button
                    className="text-button"
                    onClick={() => setScreen("details")}
                  >
                    Avaa päätöshistoria
                  </button>
                </>
              ) : screen === "details" ? (
                <section className="details">
                  <h2>Hankekansio</h2>
                  <p className="small">
                    Siemen: {game.run.seed} · Vaalikausi vaihtuu kuussa{" "}
                    {game.world.electionMonth}. Budjetti on kehitysrahan
                    peli-indeksi, ei eurotili. Tutkimuspanos ilmoitetaan
                    erikseen euroina.
                  </p>
                  <h3>Suunnitelman luvut</h3>
                  <p>
                    Tuuli{" "}
                    {fmt(physical.getDerivedStats(game.run).windPlannedMWac)} MW
                    · tuottoindeksi {game.run.windYieldIndex}. Aurinko{" "}
                    {fmt(physical.getDerivedStats(game.run).solarMWp)} MWp /{" "}
                    {fmt(physical.getDerivedStats(game.run).solarMWac)} MWac.
                    Vientiraja{" "}
                    {game.run.grid.exportLimitMWac === null
                      ? "selvitettävä"
                      : `${game.run.grid.exportLimitMWac} MWac`}
                    .
                  </p>
                  <p className="small">
                    Pelin aurinkooletus on 0,65 MWp/ha ja DC/AC-suhde 1,25.
                    Nimellisteho ei tarkoita samanaikaista tuotantoa.
                  </p>
                  <h3>Työt</h3>
                  {game.run.jobs.map((j) => (
                    <div className="job" key={j.id}>
                      <b>{JOB_NAMES[j.jobId] ?? "Hankkeen selvitystyö"}</b>
                      <span>
                        {j.status === "completed"
                          ? `Valmis · kk ${j.completedAt}`
                          : `Käynnissä · valmis kk ${j.dueAt}`}
                      </span>
                    </div>
                  ))}
                  <h3>Yleinen tutkimus</h3>
                  <p>
                    {game.world.species} lajiseuranta · rahoitusosuus{" "}
                    {fmt(game.research.contributionEUR)} €.{" "}
                    {game.research.published
                      ? "Tulokset julkaistu."
                      : game.research.dueAt
                        ? `Julkaisu odotettavissa kuussa ${game.research.dueAt}.`
                        : "Rahoituspäätöstä ei ole vielä tehty."}
                  </p>
                  <h3>Tilanneviestit</h3>
                  {game.notices.map((n, i) => (
                    <p key={i}>{n}</p>
                  ))}
                  <h3>Päätöshistoria</h3>
                  {game.records.map((r, i) => (
                    <div className="history-row" key={`${r.cardId}-${i}`}>
                      <span>{r.month} kk</span>
                      <span>
                        <b>
                          {
                            campaignPack.cards.find((c) => c.id === r.cardId)
                              ?.title
                          }
                        </b>
                        <br />
                        {
                          campaignPack.cards.find((c) => c.id === r.cardId)
                            ?.choices[r.side].label
                        }
                      </span>
                    </div>
                  ))}
                </section>
              ) : card ? (
                <>
                  <div className="turn-caption">
                    <span>
                      PÄÄTÖS {String(game.records.length + 1).padStart(2, "0")}
                    </span>
                    <span>← kaksi tapaa edetä →</span>
                  </div>
                  <CardView
                    card={card}
                    token={game.run.offeredCard!.token}
                    onChoose={decide}
                    preview={(side) => {
                      const p = previewCampaignChoice(game, side);
                      const before = physical.getDerivedStats(game.run),
                        changes: string[] = [];
                      if (p.stats.windCount !== before.windCount)
                        changes.push(
                          `Tuuli ${p.stats.windCount - before.windCount} kpl`,
                        );
                      if (p.stats.solarHa !== before.solarHa)
                        changes.push(
                          `Aurinko ${fmt(p.stats.solarHa - before.solarHa)} ha`,
                        );
                      if (p.stats.windMWac !== before.windMWac)
                        changes.push(`Tuuli ${fmt(p.stats.windMWac)} MW`);
                      if (p.stats.windHeightCapM !== before.windHeightCapM)
                        changes.push(`Korkeus ${p.stats.windHeightCapM} m`);
                      if (p.stats.uniqueExternalKm !== before.uniqueExternalKm)
                        changes.push(
                          `Liittymä ${fmt(p.stats.uniqueExternalKm)} km`,
                        );
                      return {
                        budget: p.resources.budget - game.run.resources.budget,
                        months: p.months,
                        fatal: !!p.ending && p.ending !== "readyToBuild",
                        detail: p.detail,
                        changes,
                      };
                    }}
                    subtitle={
                      card.id.startsWith("R")
                        ? `Yleinen ${game.world.species} tutkimus · erillään hankeselvityksistä`
                        : undefined
                    }
                  />
                  {notice && (
                    <p className="outcome" role="status">
                      {notice}
                    </p>
                  )}
                </>
              ) : (
                <div className="waiting">
                  <Art artKey="consultant" />
                  <p className="eyebrow">Työt etenevät rinnakkain</p>
                  <h2>Maastolla on oma kalenterinsa.</h2>
                  <p>
                    Seuraava vaihe tarvitsee tilatun selvityksen tuloksen.
                    Odotetaan {waitingMonths(game)} kuukautta seuraavaan
                    valmistumiseen tai julkaisuun.
                  </p>
                  <button
                    className="primary"
                    onClick={() => {
                      try {
                        install(waitCampaign(game));
                      } catch (e) {
                        setError(String(e));
                      }
                    }}
                  >
                    Odota {waitingMonths(game)} kk →
                  </button>
                </div>
              )}
            </section>
          </main>
        )
      )}
      <footer>
        <span>KAAVA VAI KAAOS</span>
        <span>Paikallinen yksinpeli · tallentuu tällä laitteella</span>
      </footer>
    </div>
  );
}
