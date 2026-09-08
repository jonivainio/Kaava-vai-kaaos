import { useState } from "react";
import { content } from "../game/v5/content";
import { initialState } from "../game/v5/state";
import { currentDecision, playerText } from "../game/v5";
import { openCase } from "../game/v5/operations";
import { ruleFor } from "../game/v5/rules";
import { SwipeCard } from "./SwipeCard";
import type { Mode } from "../game/v5/types";

/** Local source inspection only: no storage, reducer or ordinary run is accessed. */
export default function V5Review() {
  const [index, setIndex] = useState(0), [variant, setVariant] = useState("question");
  const [seed, setSeed] = useState("v5-source-review"), [mode, setMode] = useState<Mode>("hybrid");
  const [sourceId, setSourceId] = useState("");
  const item = content[index]!;
  const fixture = initialState(seed || "v5-source-review", mode);
  const caseSource = item.kind === "decision" ? item.id : sourceId;
  const issue = caseSource ? openCase(fixture, caseSource, ruleFor(caseSource).spec(fixture, caseSource)) : null;
  fixture.scenes = [{ id: item.id, caseId: issue?.id ?? null, kind: item.kind, branchId: null, outcomeId: null, nextStage: null }];
  const decision = currentDecision(fixture);
  const presentations = [{ id: "question", label: item.kind === "decision" ? "Päätöskortti" : "Yhteinen teksti", text: item.body },
    ...item.branches.map(branch => ({ id: branch.id, label: `Tulos ${branch.id}`, text: `${item.body}\n\n${branch.text}` })),
    ...(["A", "B"] as const).flatMap(choice => item.choices[choice] ? [
      { id: choice, label: `Valinnan ${choice} tulos`, text: item.choices[choice]!.result },
      ...item.choices[choice]!.branches.map(branch => ({ id: `${choice}:${branch.id}`, label: `${choice} / ${branch.id}`, text: `${item.choices[choice]!.result}\n\n${branch.text}` })),
    ] : [])];
  const selected = presentations.find(presentation => presentation.id === variant) ?? presentations[0]!;
  const examples = { decisionLabel: "[lähdepäätöksen valinta]", blockingIssue: "[aiempi avoin asia]", availableAlternative: "[tarjottu vaihtoehto]", externalReason: "[toteutuneen ulkoisen esteen selitys]" };
  const showQuestion = selected.id === "question" && decision;
  const change = (next: number) => { setIndex((next + content.length) % content.length); setVariant("question"); };
  return <div className="world"><div className="phone-shell review-shell">
    <header className="review-toolbar">
      <strong>Paikallinen v5-katselmus · {index + 1}/{content.length}</strong>
      <label>Sisältö<select aria-label="Sisältö-ID" value={item.id} onChange={event => change(content.findIndex(entry => entry.id === event.target.value))}>
        {content.map(entry => <option key={entry.id} value={entry.id}>{entry.id} · {entry.title}</option>)}
      </select></label>
      <label>Haara<select aria-label="Tuloshaara" value={selected.id} onChange={event => setVariant(event.target.value)}>
        {presentations.map(presentation => <option key={presentation.id} value={presentation.id}>{presentation.label}</option>)}
      </select></label>
      <details><summary>Katselmuksen lähtötilanne</summary>
        <label>Siemen<input aria-label="Katselmuksen siemen" value={seed} onChange={event => setSeed(event.target.value)} /></label>
        <label>Pelitila<select aria-label="Katselmuksen pelitila" value={mode} onChange={event => setMode(event.target.value as Mode)}>
          <option value="hybrid">Hybridi</option><option value="wind">Tuuli (suljettu pelitila)</option><option value="solar">Aurinko (suljettu pelitila)</option>
        </select></label>
        <label>Tuloksen lähdepäätös<select aria-label="Katselmuksen lähdepäätös" value={sourceId} onChange={event => setSourceId(event.target.value)}>
          <option value="">Ei pakotettua lähdepäätöstä</option>
          {content.filter(entry => entry.kind === "decision").map(entry => <option key={entry.id} value={entry.id}>{entry.id}</option>)}
        </select></label>
        <small>{issue ? `${issue.id} · ${issue.placeIds.length} voimalapaikkaa · ${issue.parcelIds.length} aurinkopalstaa` : "Ei tapausta"}</small>
      </details>
      <small>Vain lähteen katselmus. Ehdot eivät ole tässä pelissä voimassa. Ei tavallista tallennusta.</small>
    </header>
    <main className="play-screen">
      {showQuestion ? <><section className="narrative"><h1>{decision.title}</h1><p className="question">{decision.question}</p></section>
        <SwipeCard key={`${index}:${variant}`} token="review" art={decision.art} speaker={decision.speaker} left={decision.options[0].label} right={decision.options[1].label} onChoose={(_, side) => change(index + (side === "left" ? -1 : 1))} /></>
        : <SwipeCard key={`${index}:${variant}`} token="review" art="" speaker="" left="Edellinen" right="Seuraava" story={{ title: playerText(fixture, item.title, issue), body: playerText(fixture, selected.text, issue, examples), eyebrow: "LÄHDETEKSTIN KATSELMUS" }} onChoose={(_, side) => change(index + (side === "left" ? -1 : 1))} />}
    </main>
  </div></div>;
}
