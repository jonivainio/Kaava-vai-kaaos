import { useEffect, useState } from "react";
export default function Updates() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  useEffect(() => {
    if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
    let cancelled = false;
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .then((reg) => {
        const check = () => {
          if (!cancelled && reg.waiting) setWaiting(reg.waiting);
        };
        check();
        reg.addEventListener("updatefound", () => {
          reg.installing?.addEventListener("statechange", check);
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  if (!waiting) return null;
  return (
    <div className="alert">
      <p>
        Uusi versio on valmis. Päivitä aloitusvalikossa. Tallennus säilyy; jos
        sisältöversio ei enää sovi, sen voi viedä palautettavaksi.
      </p>
      <button
        onClick={() => {
          navigator.serviceWorker.addEventListener(
            "controllerchange",
            () => location.reload(),
            { once: true },
          );
          waiting.postMessage("ACTIVATE_AT_MENU");
        }}
      >
        Päivitä tästä aloitusvalikosta
      </button>
    </div>
  );
}
