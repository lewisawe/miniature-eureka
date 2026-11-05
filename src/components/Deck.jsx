import { useEffect, useRef, useState } from "react";
import { playPad, playBoot } from "../lib/audio.js";
import "./Deck.css";

const PADS = [
  { n: 1, label: "ABOUT", target: "about", color: "var(--pad-1)" },
  { n: 2, label: "THE RIG", target: "rig", color: "var(--pad-2)" },
  { n: 3, label: "SET LIST", target: "setlist", color: "var(--pad-3)" },
  { n: 4, label: "ACHIEVEMENTS", target: "achievements", color: "var(--pad-4)" },
  { n: 5, label: "TRANSMISSION", target: "contact", color: "var(--pad-5)" },
];

// Rotating LED ticker messages.
const TICKER = [
  "ASPIRING SPACE DJ",
  "CLOUD BUILDER",
  "NOW SPINNING ON AWS",
  "HIT A PAD TO BEGIN",
];

export default function Deck({ onHit }) {
  const [active, setActive] = useState(null);
  const [tickerText, setTickerText] = useState("");
  const [tickerIdx, setTickerIdx] = useState(0);
  const booted = useRef(false);

  function hit(pad) {
    // First interaction powers on the deck audio with a boot chord.
    if (!booted.current) {
      booted.current = true;
      playBoot();
    } else {
      playPad(pad.n);
    }
    setActive(pad.n);
    setTimeout(() => setActive(null), 220);
    if (typeof onHit === "function") onHit();

    const el = document.getElementById(pad.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Keyboard 1-5 jumps to sections and fires the pad.
  useEffect(() => {
    function onKey(e) {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        const pad = PADS.find((p) => p.n === num);
        if (pad) hit(pad);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typewriter LED ticker effect.
  useEffect(() => {
    const full = TICKER[tickerIdx];
    let i = 0;
    let typing = true;
    const interval = setInterval(() => {
      if (typing) {
        setTickerText(full.slice(0, i + 1));
        i += 1;
        if (i >= full.length) {
          typing = false;
        }
      }
    }, 90);
    const hold = setTimeout(() => {
      setTickerIdx((idx) => (idx + 1) % TICKER.length);
    }, full.length * 90 + 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(hold);
    };
  }, [tickerIdx]);

  return (
    <div className="deck" aria-label="Interactive navigation deck">
      {/* LED display */}
      <div className="deck__screen">
        <span className="deck__live">
          <span className="deck__dot" /> LIVE
        </span>
        <span className="deck__ticker">
          {tickerText}
          <span className="deck__caret">▮</span>
        </span>
      </div>

      {/* The pads */}
      <div className="deck__pads" role="group" aria-label="Section pads">
        {PADS.map((pad) => (
          <button
            key={pad.n}
            className={`pad ${active === pad.n ? "pad--hit" : ""}`}
            style={{ "--pad-color": pad.color }}
            onClick={() => hit(pad)}
            aria-label={`Jump to ${pad.label} section`}
          >
            <span className="pad__num">{pad.n}</span>
            <span className="pad__label">{pad.label}</span>
          </button>
        ))}
      </div>

      {/* The visible hint — required by the challenge */}
      <p className="deck__hint">
        Hit a pad or press <kbd>1</kbd>–<kbd>5</kbd>. Each one drops a sound and
        cues up that section.
      </p>
    </div>
  );
}
