import { useEffect, useRef, useState } from "react";
import type { Card, Side } from "../engine";
import { manifest } from "../engine/content";
export const ART_KEYS = manifest.artKeys;
export function Art({
  artKey,
  className = "",
}: {
  artKey: string;
  className?: string;
}) {
  const exists = ART_KEYS.includes(artKey);
  return (
    <div className={`art ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}art/${exists ? artKey : "consultant"}.svg`}
        alt=""
        draggable={false}
      />
      {!exists && <span className="art-note">Kuvitusluonnos</span>}
    </div>
  );
}
export interface ChoicePreview {
  budget: number;
  months: number;
  fatal: boolean;
  detail?: string | null;
  changes?: string[];
}
export function CardView({
  card,
  token,
  onChoose,
  preview,
  subtitle,
}: {
  card: Card;
  token: string;
  onChoose: (token: string, side: Side) => void;
  preview: (side: Side) => ChoicePreview;
  subtitle?: string;
}) {
  const [drag, setDrag] = useState(0),
    [hover, setHover] = useState<Side | null>(null);
  const gesture = useRef<{
      x: number;
      y: number;
      id: number;
      cancelled: boolean;
    } | null>(null),
    used = useRef("");
  const choose = (side: Side) => {
    if (used.current === token) return;
    used.current = token;
    setDrag(0);
    setHover(null);
    onChoose(token, side);
  };
  useEffect(() => {
    setDrag(0);
    setHover(null);
    gesture.current = null;
  }, [token]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        e.repeat ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(
          (e.target as HTMLElement)?.tagName,
        )
      )
        return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        choose(e.key === "ArrowLeft" ? "left" : "right");
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [token]);
  const side = drag < -12 ? "left" : drag > 12 ? "right" : hover;
  const p = side ? preview(side) : null;
  return (
    <section className="card-area" aria-label="Päätöskortti">
      <div
        className={`decision-card ${drag ? "dragging" : ""}`}
        data-testid="decision-card"
        style={{
          transform: `translateX(${drag * 0.25}px) rotate(${drag * 0.025}deg)`,
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          gesture.current = {
            x: e.clientX,
            y: e.clientY,
            id: e.pointerId,
            cancelled: false,
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const g = gesture.current;
          if (!g || g.id !== e.pointerId || g.cancelled) return;
          const dx = e.clientX - g.x,
            dy = e.clientY - g.y;
          if (Math.abs(dy) > 20 && Math.abs(dy) > Math.abs(dx)) {
            g.cancelled = true;
            setDrag(0);
            return;
          }
          setDrag(Math.max(-140, Math.min(140, dx)));
        }}
        onPointerCancel={() => {
          gesture.current = null;
          setDrag(0);
        }}
        onPointerUp={(e) => {
          const g = gesture.current;
          gesture.current = null;
          setDrag(0);
          if (!g || g.cancelled) return;
          const dx = e.clientX - g.x,
            dy = e.clientY - g.y;
          if (Math.abs(dx) > 85 && Math.abs(dx) > Math.abs(dy) * 1.5)
            choose(dx < 0 ? "left" : "right");
        }}
      >
        <div className="card-topline">
          <span>
            {(manifest.roles as Record<string, string>)[card.speakerId] ??
              "Asiantuntija"}
          </span>
          <span className="folio">{card.id}</span>
        </div>
        <Art artKey={card.artKey} />
        <div className="card-copy">
          {subtitle && <p className="eyebrow">{subtitle}</p>}
          <h2>{card.title}</h2>
          <p>{card.body}</p>
        </div>
        {side && (
          <div className={`swipe-label ${side}`}>
            {card.choices[side].label}
          </div>
        )}
      </div>
      <div
        className={`preview-line ${p?.fatal ? "danger" : ""}`}
        aria-live="polite"
      >
        {p ? (
          <>
            <strong>{p.fatal ? "Hanke päättyy · " : ""}</strong>
            {p.budget === 0
              ? "Ei budjettimuutosta"
              : `Budjetti ${p.budget > 0 ? "+" : ""}${p.budget}`}{" "}
            · {p.months} kk {p.changes?.join(" · ")}
            {p.fatal && p.detail && <small>{p.detail}</small>}
          </>
        ) : (
          <span>
            Pyyhkäise tai valitse. Molemmilla ratkaisuilla on hintansa.
          </span>
        )}
      </div>
      <div className="choices">
        {(["left", "right"] as const).map((s) => {
          const v = preview(s);
          return (
            <button
              key={s}
              className={`choice ${v.fatal ? "fatal" : ""}`}
              data-testid={`choice-${s}`}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(s)}
              onBlur={() => setHover(null)}
              onClick={() => choose(s)}
            >
              <span className="choice-arrow">{s === "left" ? "←" : "→"}</span>
              <span>
                {card.choices[s].label}
                {v.fatal && <small>Hanke päättyy tähän</small>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
