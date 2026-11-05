/**
 * Tiny Web Audio synth for the Space DJ deck.
 * No audio files needed — each pad plays a short synthesized "drop".
 * The AudioContext is created lazily on first user gesture (browser policy).
 */

let ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  // Resume if the browser suspended it before a user gesture.
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

// Each pad has its own little voice: a base frequency and a flavor.
const PADS = {
  1: { freq: 523.25, type: "triangle", sweep: 1.5 }, // C5, soft
  2: { freq: 392.0, type: "sawtooth", sweep: 1.2 }, // G4, bright
  3: { freq: 659.25, type: "square", sweep: 2.0 }, // E5, punchy
  4: { freq: 329.63, type: "sine", sweep: 0.8 }, // E4, round
  5: { freq: 440.0, type: "triangle", sweep: 1.7 }, // A4
};

/**
 * Play the sound for a given pad number (1-5).
 * Safe to call repeatedly; silently no-ops if Web Audio is unavailable.
 */
export function playPad(n) {
  const audio = getCtx();
  if (!audio) return;
  const cfg = PADS[n] || PADS[1];
  const now = audio.currentTime;

  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = cfg.type;
  osc.frequency.setValueAtTime(cfg.freq, now);
  // Quick downward pitch sweep for a satisfying "drop".
  osc.frequency.exponentialRampToValueAtTime(
    cfg.freq / cfg.sweep,
    now + 0.18
  );

  // Fast attack, short decay envelope.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

/**
 * A soft confirmation blip, used when the deck powers on.
 */
export function playBoot() {
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;
  [440, 660, 880].forEach((f, i) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    const t = now + i * 0.08;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  });
}
