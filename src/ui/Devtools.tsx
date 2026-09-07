import { useState, useRef } from "react";
import { createEngine, pilotPack } from "../engine";
import type { Card, RunState, Side } from "../engine";
import { manifest } from "../engine/content";
import { Art, ART_KEYS, CardView } from "./CardView";
import { Stats } from "./App";
const e = createEngine();
type Demo = { run: RunState; index: number; finished: boolean };
function prepare(s: Demo): Demo {
  if (s.index >= manifest.demo.demoFlow.length) return { ...s, finished: true };
  const step = manifest.demo.demoFlow[s.index]!;
  let run = e.setDemoPhase(s.run, step.phase as RunState["phase"]);
  if (!run.offeredCard) {
    if (step.cardId === "P005") run = e.offerDemoMilestone(run);
    else if (step.cardId) run = e.offerCard(run, step.cardId);
  }
  return { ...s, run };
}
function fixture(card: Card): RunState {
  let s = structuredClone(
    e.createRun({ seed: `viewer-${card.id}`, mode: card.modes[0]! }),
  );
  s.phase = card.phases[0]!;
  for (const c of card.requiresAll) {
    const [root, key] = c.field.split(".");
    if (root === "flags" && key) s.flags[key] = c.value as boolean;
    if (root === "site" && key)
      s.site[key] = c.value as boolean | "weak" | "good";
    if (root === "tracks" && key) s.tracks[key] = c.value as string;
  }
  const seq = s.nextSequence++;
  if (card.trigger === "followup") {
    s.pendingEvents.push({
      id: `viewer-event-${seq}`,
      cardId: card.id,
      dueAt: 0,
      sequence: seq,
      source: "developer:explicit-fixture",
      status: "offered",
    });
    s.offeredCard = {
      cardId: card.id,
      eventId: `viewer-event-${seq}`,
      token: `viewer-${s.nextSequence++}`,
    };
  } else if (card.trigger === "ambient")
    s.offeredCard = {
      cardId: card.id,
      eventId: null,
      token: `viewer-${s.nextSequence++}`,
    };
  else
    throw new Error(
      "Tämä kortti tarvitsee menettely- tai päätöstapahtuman. Suojattua porttia ei avata katselimessa.",
    );
  const restored = e.restoreRun(JSON.stringify(s));
  if (!restored.ok)
    throw new Error(
      "Nimetty fixture ei sovi perustan suojattuihin portteihin: " +
        restored.error,
    );
  return restored.state;
}
export default function Devtools({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"viewer" | "demo" | "art">("viewer"),
    [id, setId] = useState("H001"),
    [mode, setMode] = useState("all"),
    [phase, setPhase] = useState("all"),
    [tone, setTone] = useState("all"),
    [message, setMessage] = useState("");
  const [demo, setDemo] = useState<Demo | null>(() => {
    try {
      const raw = localStorage.getItem("kaava:demo");
      if (!raw) return null;
      const d = JSON.parse(raw);
      const r = e.restoreRun(JSON.stringify(d.run));
      return r.ok && Number.isInteger(d.index) && d.index >= 0 && d.index <= 12
        ? { ...d, run: r.state }
        : null;
    } catch {
      return null;
    }
  });
  const ref = useRef(demo);
  function install(s: Demo) {
    ref.current = s;
    setDemo(s);
    localStorage.setItem("kaava:demo", JSON.stringify(s));
  }
  const selected = pilotPack.cards.find((c) => c.id === id)!;
  const visible = pilotPack.cards.filter(
    (c) =>
      (mode === "all" || c.modes.includes(mode as never)) &&
      (phase === "all" || c.phases.includes(phase as never)) &&
      (tone === "all" || c.tone === tone),
  );
  let view: RunState | null = null,
    fixtureError = "";
  try {
    view = fixture(selected);
  } catch (err) {
    fixtureError = err instanceof Error ? err.message : String(err);
  }
  const dc = demo
    ? pilotPack.cards.find((c) => c.id === demo.run.offeredCard?.cardId)
    : null;
  return (
    <div className="devtools">
      <header className="dev-header">
        <button onClick={onClose}>← Peliin</button>
        <button onClick={() => setTab("viewer")}>Korttikatselin · 64</button>
        <button onClick={() => setTab("demo")}>Prologi · 12 päätöstä</button>
        <button onClick={() => setTab("art")}>Kuvien kontaktikartta</button>
      </header>
      <p className="dev-badge">
        KEHITTÄJÄN TESTITILAT · Ei todiste korttien luonnollisesta
        saavutettavuudesta. Ei sisälly tuotantokäyttöliittymään.
      </p>
      {tab === "art" ? (
        <div className="art-grid">
          {ART_KEYS.map((key) => (
            <label key={key}>
              <Art artKey={key} />
              {key}
            </label>
          ))}
        </div>
      ) : tab === "demo" ? (
        <div className="demo-container">
          <div className="dev-header">
            <button
              onClick={() => {
                install(
                  prepare({
                    run: e.createRun({
                      seed: "demo-02",
                      mode: "hybrid",
                      demoFixture: true,
                    }),
                    index: 0,
                    finished: false,
                  }),
                );
                setMessage("");
              }}
            >
              Uusi prologi
            </button>
            {demo && <span>{demo.index} / 12 päätöstä</span>}
          </div>
          <p className="small">
            Käsikirjoitetut vaihe-fixturet. Kunnan aloituspäätös on nimetty
            testitapahtuma.
          </p>
          {demo && (
            <>
              <h2>{demo.run.projectIdentity.displayName}</h2>
              <p className="small">
                Vaihe {demo.run.phase} · {demo.run.elapsedMonths} kk
              </p>
              <div className="demo-stats">
                <Stats run={demo.run} />
              </div>
              {demo.finished ? (
                <>
                  <h1>Ensimmäinen selvityskierros valmis</h1>
                  <p>Kaavavoittoa ei ole ratkaistu.</p>
                  {demo.run.jobs
                    .filter((j) => j.status === "active")
                    .map((j) => (
                      <p key={j.id}>
                        {j.jobId} · valmistuu kk {j.dueAt}
                      </p>
                    ))}
                </>
              ) : dc ? (
                <CardView
                  card={dc}
                  token={demo.run.offeredCard!.token}
                  onChoose={(token, side) => {
                    const s = ref.current;
                    if (!s || s.run.offeredCard?.token !== token) return;
                    try {
                      install(
                        prepare({
                          ...s,
                          run: e.applyChoice(s.run, token, side),
                          index: s.index + 1,
                        }),
                      );
                    } catch (err) {
                      setMessage(String(err));
                    }
                  }}
                  preview={(side) => {
                    const p = e.previewChoice(
                      demo.run,
                      demo.run.offeredCard!.token,
                      side,
                    );
                    return {
                      budget: p.resources.budget - demo.run.resources.budget,
                      months: p.elapsedMonths - demo.run.elapsedMonths,
                      fatal: !!p.ending,
                    };
                  }}
                />
              ) : (
                <button
                  className="primary"
                  onClick={() => {
                    const due = Math.min(
                      ...demo.run.pendingEvents
                        .filter((v) => v.status === "pending")
                        .map((v) => v.dueAt),
                    );
                    install(
                      prepare({
                        ...demo,
                        run: e.advanceTime(
                          demo.run,
                          Math.max(0, due - demo.run.elapsedMonths),
                        ),
                      }),
                    );
                  }}
                >
                  Odota jonotettua seurausta
                </button>
              )}
            </>
          )}
          {message && <p className="alert">{message}</p>}
        </div>
      ) : (
        <>
          <div className="dev-filters">
            <select
              aria-label="Hankemuoto"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              {["all", "wind", "solar", "hybrid"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <select
              aria-label="Vaihe"
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
            >
              {["all", "01", "02", "03", "04", "05", "06", "07", "08"].map(
                (v) => (
                  <option key={v}>{v}</option>
                ),
              )}
            </select>
            <select
              aria-label="Sävy"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {["all", "positive", "work", "mixed", "challenge"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <span>{visible.length} / 64</span>
          </div>
          <div className="dev-grid">
            <div className="dev-cards">
              {visible.map((c) => (
                <button key={c.id} onClick={() => setId(c.id)}>
                  {c.id} · {c.title}
                </button>
              ))}
            </div>
            <div>
              <p className="small">
                Nimetty testifixture: viewer-{selected.id}
              </p>
              {view ? (
                <CardView
                  card={selected}
                  token={view.offeredCard!.token}
                  onChoose={(_token, side) => {
                    try {
                      const result = e.applyChoice(
                        view!,
                        view!.offeredCard!.token,
                        side,
                      );
                      setMessage(
                        `${selected.choices[side].outcomeText} Budjetti ${result.resources.budget}, aika ${result.elapsedMonths} kk.`,
                      );
                    } catch (err) {
                      setMessage(String(err));
                    }
                  }}
                  preview={(side) => {
                    try {
                      const p = e.previewChoice(
                        view!,
                        view!.offeredCard!.token,
                        side,
                      );
                      return {
                        budget: p.resources.budget - view!.resources.budget,
                        months: p.elapsedMonths - view!.elapsedMonths,
                        fatal: !!p.ending,
                      };
                    } catch {
                      return {
                        budget: 0,
                        months: 0,
                        fatal: false,
                        detail: "Vaatii menettelyratkaisun",
                      };
                    }
                  }}
                />
              ) : (
                <>
                  <Art artKey={selected.artKey} />
                  <h2>{selected.title}</h2>
                  <p>{selected.body}</p>
                  <p className="alert">{fixtureError}</p>
                  {Object.entries(selected.choices).map(([side, c]) => (
                    <p key={side}>
                      <b>{c.label}</b>
                      <br />
                      {c.outcomeText}
                    </p>
                  ))}
                </>
              )}
              {message && <p className="alert">{message}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
