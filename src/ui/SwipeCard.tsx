import { useEffect, useRef, useState } from "react";
import type { Side } from "../game/v5";
interface Props {
  token: string;
  art: string;
  speaker: string;
  left: string;
  right: string;
  notes?: Record<Side, string>;
  onChoose: (token: string, side: Side) => void;
  tutorial?: boolean;
  story?: { title: string; body: string; eyebrow: string };
}
export function SwipeCard({
  token,
  art,
  speaker,
  left,
  right,
  notes,
  onChoose,
  tutorial,
  story,
}: Props) {
  const [dx, setDx] = useState(0),
    [exit, setExit] = useState<Side | null>(null);
  const gesture = useRef<{
      x: number;
      y: number;
      id: number;
      cancelled: boolean;
    } | null>(null),
    used = useRef(false),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const commit = (side: Side) => {
    if (used.current) return;
    used.current = true;
    setExit(side);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 180;
    timer.current = setTimeout(() => onChoose(token, side), delay);
  };
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        e.repeat ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        document.querySelector('[role="dialog"]') ||
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
          (e.target as HTMLElement)?.tagName,
        )
      )
        return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        commit(e.key === "ArrowLeft" ? "left" : "right");
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [token]);
  const side = dx < -12 ? "left" : dx > 12 ? "right" : null;
  return (
    <div className={`swipe-area ${story ? "narration-swipe" : ""}`}>
      <div className="card-stack">
        <div
          ref={root}
          className={`swipe-card ${dx ? "dragging" : ""} ${exit ? "exit-" + exit : ""} ${tutorial ? "practice" : ""}`}
          data-testid="swipe-card"
          tabIndex={0}
          role="group"
          aria-roledescription="Pyyhkäistävä kortti"
          aria-label={story ? `${story.title}. Pyyhkäise kumpaan tahansa suuntaan tai käytä nuolinäppäimiä jatkaaksesi.` : `${speaker}. Vasen: ${left}. ${notes?.left ?? ""} Oikea: ${right}. ${notes?.right ?? ""} Voit käyttää myös nuolinäppäimiä.`}
          style={
            !exit
              ? {
                  transform: `translateX(${dx * 0.65}px) rotate(${dx * 0.065}deg)`,
                }
              : undefined
          }
          onPointerDown={(e) => {
            if (e.button !== 0 || used.current) return;
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
            if (!g || g.cancelled || g.id !== e.pointerId) return;
            const x = e.clientX - g.x,
              y = e.clientY - g.y;
            if (Math.abs(y) > 18 && Math.abs(y) > Math.abs(x)) {
              g.cancelled = true;
              setDx(0);
              return;
            }
            setDx(Math.max(-220, Math.min(220, x)));
          }}
          onPointerCancel={() => {
            gesture.current = null;
            setDx(0);
          }}
          onLostPointerCapture={() => {
            gesture.current = null;
            setDx(0);
          }}
          onPointerUp={(e) => {
            const g = gesture.current;
            gesture.current = null;
            if (g && !g.cancelled && g.id === e.pointerId) {
              const x = e.clientX - g.x,
                y = e.clientY - g.y;
              const threshold = Math.max(
                60,
                (root.current?.clientWidth ?? 280) * 0.23,
              );
              if (Math.abs(x) >= threshold && Math.abs(x) > Math.abs(y) * 1.5)
                commit(x < 0 ? "left" : "right");
            }
            setDx(0);
          }}
        >
          {story ? <article className="narration-paper">
            <span className="eyebrow">{story.eyebrow}</span>
            <span className="paper-ornament" aria-hidden="true">✦</span>
            <h1>{story.title}</h1>
            <p>{story.body}</p>
            <span className="paper-rule" aria-hidden="true" />
          </article> : <><img
            src={`${import.meta.env.BASE_URL}art/${art}.svg`}
            alt=""
            draggable={false}
          />
          <div className="speaker-tag">{speaker}</div></>}
          {side && (
            <div className={`swipe-bubble ${side}`} aria-live="polite">
              {side === "left" ? left : right}
              <small>{notes?.[side]}</small>
            </div>
          )}
          {tutorial && !dx && (
            <div className="practice-hand" aria-hidden="true">
              ↔
            </div>
          )}
        </div>
      </div>
      {story ? <p className="story-swipe-hint"><span aria-hidden="true">←</span> Pyyhkäise jatkaaksesi <span aria-hidden="true">→</span></p> : <div className="choice-hints" aria-hidden="true">
        <span>
          <b>←</b>
          {left}
        </span>
        <span>
          {right}
          <b>→</b>
        </span>
      </div>}
      <p className="drag-instruction">
        {story ? "Molemmat suunnat vievät tarinaa eteenpäin" : side
          ? "Päästä irti valitaksesi · vedä takaisin peruuttaaksesi"
          : "Vedä korttia vasemmalle tai oikealle"}
      </p>
    </div>
  );
}
