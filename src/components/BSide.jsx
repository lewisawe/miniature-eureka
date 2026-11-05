import { useEffect } from "react";
import "./BSide.css";

/**
 * The hidden "B-side": a reveal overlay unlocked by the Konami code.
 * Shows a few off-the-record facts with a brief CRT flicker.
 * Esc or the close button dismisses it.
 */
export default function BSide({ open, onClose, facts }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="bside" role="dialog" aria-modal="true" aria-label="Hidden B-side">
      <div className="bside__scan" aria-hidden="true" />
      <div className="bside__panel">
        <p className="bside__kicker">// B-SIDE UNLOCKED</p>
        <h2 className="bside__title">Off the record</h2>
        <ul className="bside__list">
          {facts.map((f, i) => (
            <li key={i} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              {f}
            </li>
          ))}
        </ul>
        <button type="button" className="bside__close" onClick={onClose}>
          Close ✕
        </button>
      </div>
    </div>
  );
}
