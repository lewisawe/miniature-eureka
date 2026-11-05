import { useRef, useState } from "react";
import "./DJBooth.css";

/**
 * Original SVG DJ booth with:
 *  - two spinning vinyl decks + a mixer (all hand-drawn SVG, no stock art)
 *  - three original, self-generated loops you can switch between
 *  - a pad-hit reaction driven by a keyed CSS animation (no setState-in-effect)
 *
 * `pulse` is a counter bumped by the parent on every pad hit.
 */

const TRACKS = [
  { id: "orbit", label: "Orbit", src: "/track-orbit.mp3" },
  { id: "deepspace", label: "Deep Space", src: "/track-deepspace.mp3" },
  { id: "afterburner", label: "Afterburner", src: "/track-afterburner.mp3" },
];

export default function DJBooth({ pulse = 0 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  const track = TRACKS[trackIdx];

  function play() {
    const a = audioRef.current;
    if (!a) return;
    a.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  }

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      play();
    }
  }

  function selectTrack(i) {
    const a = audioRef.current;
    const wasPlaying = playing;
    setTrackIdx(i);
    if (a) {
      // Swap the source, then resume if we were already playing.
      a.pause();
      a.src = TRACKS[i].src;
      a.load();
      if (wasPlaying) {
        a.play().then(
          () => setPlaying(true),
          () => setPlaying(false)
        );
      }
    }
  }

  return (
    <div className="booth">
      {pulse > 0 && (
        <span key={pulse} className="booth__pulse" aria-hidden="true" />
      )}

      <div className={`booth__stage ${playing ? "booth--live" : ""}`}>
        <svg
          viewBox="0 0 520 240"
          className="booth__svg"
          role="img"
          aria-label="Illustrated DJ booth with two turntables and a mixer"
        >
          <defs>
            <radialGradient id="vinyl" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="55%" stopColor="#0c0c16" />
              <stop offset="100%" stopColor="#050509" />
            </radialGradient>
            <linearGradient id="deckbody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17172a" />
              <stop offset="100%" stopColor="#0b0b16" />
            </linearGradient>
            <linearGradient id="mixer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d1d33" />
              <stop offset="100%" stopColor="#101021" />
            </linearGradient>
          </defs>

          {/* ---- Left turntable (sits slightly forward) ---- */}
          <g className="booth__deck booth__deck--front">
            <rect x="8" y="30" width="170" height="180" rx="14" fill="url(#deckbody)" stroke="rgba(255,255,255,.08)" />
            <g className="booth__platter booth__platter--l" style={{ transformOrigin: "93px 120px" }}>
              <circle cx="93" cy="120" r="70" fill="url(#vinyl)" />
              <circle cx="93" cy="120" r="70" fill="none" stroke="rgba(124,108,255,.25)" strokeWidth="1" />
              <circle cx="93" cy="120" r="55" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
              <circle cx="93" cy="120" r="40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
              <circle cx="93" cy="120" r="24" fill="#ffd34e" />
              <circle cx="93" cy="120" r="4" fill="#0a0a12" />
              <rect x="91" y="56" width="4" height="30" rx="2" fill="rgba(255,255,255,.35)" />
            </g>
            <circle cx="158" cy="60" r="7" fill="#2a2a44" stroke="rgba(255,255,255,.1)" />
            <rect className="booth__arm booth__arm--l" x="155" y="60" width="4" height="62" rx="2" fill="#c9c9e0" style={{ transformOrigin: "158px 60px" }} />
          </g>

          {/* ---- Mixer (center, deepest plane) ---- */}
          <g className="booth__mixer">
            <rect x="188" y="30" width="144" height="180" rx="12" fill="url(#mixer)" stroke="rgba(255,255,255,.08)" />
            <g className="booth__fader booth__fader--a">
              <rect x="214" y="58" width="6" height="86" rx="3" fill="#0a0a12" />
              <rect x="208" y="92" width="18" height="12" rx="3" fill="#5b7cff" />
            </g>
            <g className="booth__fader booth__fader--b">
              <rect x="300" y="58" width="6" height="86" rx="3" fill="#0a0a12" />
              <rect x="294" y="78" width="18" height="12" rx="3" fill="#ff5e7e" />
            </g>
            {[232, 260, 288].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="52" r="8" fill="#15152a" stroke="rgba(255,255,255,.12)" />
                <rect x={cx - 1} y="46" width="2" height="7" rx="1" fill="#ffd34e" />
              </g>
            ))}
            <rect x="212" y="166" width="96" height="8" rx="4" fill="#0a0a12" />
            <rect className="booth__xfader" x="250" y="162" width="20" height="16" rx="3" fill="#35d49b" style={{ transformOrigin: "260px 170px" }} />
            <g className="booth__vu">
              {Array.from({ length: 6 }).map((_, i) => (
                <rect
                  key={i}
                  x={200 + i * 5}
                  y={190}
                  width="3"
                  height="10"
                  rx="1"
                  fill={i < 4 ? "#35d49b" : i < 5 ? "#ffd34e" : "#ff5e7e"}
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </g>
          </g>

          {/* ---- Right turntable (sits slightly forward) ---- */}
          <g className="booth__deck booth__deck--front">
            <rect x="342" y="30" width="170" height="180" rx="14" fill="url(#deckbody)" stroke="rgba(255,255,255,.08)" />
            <g className="booth__platter booth__platter--r" style={{ transformOrigin: "427px 120px" }}>
              <circle cx="427" cy="120" r="70" fill="url(#vinyl)" />
              <circle cx="427" cy="120" r="70" fill="none" stroke="rgba(124,108,255,.25)" strokeWidth="1" />
              <circle cx="427" cy="120" r="55" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
              <circle cx="427" cy="120" r="40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
              <circle cx="427" cy="120" r="24" fill="#5b7cff" />
              <circle cx="427" cy="120" r="4" fill="#0a0a12" />
              <rect x="425" y="56" width="4" height="30" rx="2" fill="rgba(255,255,255,.35)" />
            </g>
            <circle cx="362" cy="60" r="7" fill="#2a2a44" stroke="rgba(255,255,255,.1)" />
            <rect className="booth__arm booth__arm--r" x="361" y="60" width="4" height="62" rx="2" fill="#c9c9e0" style={{ transformOrigin: "362px 60px" }} />
          </g>
        </svg>
      </div>

      {/* Controls: play/pause + track selector */}
      <div className="booth__controls">
        <button
          className="booth__play"
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause the track" : "Play the track"}
        >
          <span className="booth__playicon">{playing ? "❚❚" : "▶"}</span>
          {playing ? "Now spinning" : "Drop the track"}
        </button>

        <div className="booth__tracks" role="group" aria-label="Choose a track">
          {TRACKS.map((tk, i) => (
            <button
              key={tk.id}
              type="button"
              className={`booth__trackbtn ${i === trackIdx ? "is-active" : ""}`}
              onClick={() => selectTrack(i)}
              aria-pressed={i === trackIdx}
            >
              {tk.label}
            </button>
          ))}
        </div>
      </div>

      <p className="booth__meta">
        “{track.label}” · original loop, generated in code
      </p>

      <audio ref={audioRef} src={track.src} loop preload="none" />
    </div>
  );
}
