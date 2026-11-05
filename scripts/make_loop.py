#!/usr/bin/env python3
"""
Generate original, seamless synthwave loops for the portfolio.
Pure synthesis (numpy) -> WAV -> ffmpeg to MP3.
Every track is 100% original, royalty-free, owned by the site author.

Run from the portfolio/ dir:  python3 scripts/make_loop.py
Writes:
  public/track-orbit.mp3        (mid-tempo synthwave)
  public/track-deepspace.mp3    (slow, dark, chill)
  public/track-afterburner.mp3  (faster, driving)
"""
import numpy as np
import subprocess
import os
import wave

SR = 44100


def env(length, a=0.005, d=0.12):
    """Attack/decay percussive envelope, `length` seconds."""
    n = int(SR * length)
    e = np.ones(n)
    ai = int(SR * a)
    di = int(SR * d)
    if ai > 0:
        e[:ai] = np.linspace(0, 1, ai)
    if di > 0 and di < n:
        e[-di:] = np.linspace(1, 0, di)
    return e


def saw(f, length, harmonics=9):
    n = int(SR * length)
    tt = np.linspace(0, length, n, endpoint=False)
    s = np.zeros(n)
    for h in range(1, harmonics):
        s += (1.0 / h) * np.sin(2 * np.pi * f * h * tt)
    return s


def sine_stack(freqs, length):
    n = int(SR * length)
    tt = np.linspace(0, length, n, endpoint=False)
    s = np.zeros(n)
    for f in freqs:
        s += np.sin(2 * np.pi * f * tt)
    return s


def build(bpm, bars, roots, chords, *, bass_gain, pad_gain, kick_gain,
          hat_gain, hats=True, hat_subdiv=(0.5,), kick_lo=45, kick_hi=120):
    """Assemble one loop and return a mono float array in [-1, 1]."""
    beat = 60.0 / bpm
    beats = bars * 4
    dur = beats * beat
    mix = np.zeros(int(SR * dur))

    def add(signal, start_sec):
        i = int(SR * start_sec)
        n = len(signal)
        if i + n <= len(mix):
            mix[i : i + n] += signal

    # Bassline — one note per beat
    for bar in range(bars):
        f = roots[bar % len(roots)]
        for b in range(4):
            start = (bar * 4 + b) * beat
            length = beat * 0.9
            sig = saw(f, length) * env(length, a=0.004, d=0.25) * bass_gain
            add(sig, start)

    # Pad chord — sustained per bar with a slow swell
    for bar in range(bars):
        start = bar * 4 * beat
        length = 4 * beat
        n = int(SR * length)
        tt = np.linspace(0, length, n, endpoint=False)
        pad = sine_stack(chords[bar % len(chords)], length)
        swell = np.clip(np.sin(np.pi * tt / length), 0, 1)
        pad *= swell * pad_gain
        add(pad, start)

    # Kick — on each beat
    for b in range(beats):
        start = b * beat
        length = 0.18
        n = int(SR * length)
        tt = np.linspace(0, length, n, endpoint=False)
        freq = np.linspace(kick_hi, kick_lo, n)
        kick = np.sin(2 * np.pi * freq * tt) * env(length, a=0.001, d=0.16) * kick_gain
        add(kick, start)

    # Hats — filtered noise on chosen subdivisions
    if hats:
        for b in range(beats):
            for off in hat_subdiv:
                start = (b + off) * beat
                if start >= dur:
                    continue
                length = 0.05
                n = int(SR * length)
                noise = np.random.uniform(-1, 1, n)
                noise = np.diff(noise, prepend=0)  # crude high-pass
                noise *= env(length, a=0.001, d=0.045) * hat_gain
                add(noise, start)

    # Normalize + gentle soft clip
    mix = mix / (np.max(np.abs(mix)) + 1e-9)
    mix = np.tanh(mix * 1.3) * 0.9

    # Crossfade the seam so it loops cleanly
    xf = int(SR * 0.05)
    if xf > 0:
        fade = np.linspace(0, 1, xf)
        mix[:xf] = mix[:xf] * fade + mix[-xf:] * (1 - fade)
        mix = mix[:-xf]
    return mix, dur


# ---- Track definitions ----
TRACKS = {
    # Mid-tempo synthwave (Am - F - C - G)
    "orbit": dict(
        bpm=84, bars=4,
        roots=[110.00, 87.31, 130.81, 98.00],
        chords=[
            [220.00, 261.63, 329.63],  # Am
            [174.61, 220.00, 261.63],  # F
            [261.63, 329.63, 392.00],  # C
            [196.00, 246.94, 293.66],  # G
        ],
        bass_gain=0.18, pad_gain=0.05, kick_gain=0.5, hat_gain=0.12,
    ),
    # Slow, dark, chill (Dm - Bb, deep roots, no hats, softer kick)
    "deepspace": dict(
        bpm=64, bars=4,
        roots=[73.42, 73.42, 58.27, 58.27],  # D2, Bb1
        chords=[
            [146.83, 174.61, 220.00],  # Dm
            [146.83, 174.61, 220.00],
            [116.54, 146.83, 174.61],  # Bb
            [116.54, 146.83, 174.61],
        ],
        bass_gain=0.20, pad_gain=0.08, kick_gain=0.38, hat_gain=0.0,
        hats=False, kick_lo=40, kick_hi=100,
    ),
    # Faster, driving (Am - G - F - E, 16th hats)
    "afterburner": dict(
        bpm=110, bars=4,
        roots=[110.00, 98.00, 87.31, 82.41],  # A2 G2 F2 E2
        chords=[
            [220.00, 329.63, 440.00],  # Am
            [196.00, 293.66, 392.00],  # G
            [174.61, 261.63, 349.23],  # F
            [164.81, 246.94, 329.63],  # E
        ],
        bass_gain=0.17, pad_gain=0.04, kick_gain=0.5, hat_gain=0.10,
        hat_subdiv=(0.25, 0.5, 0.75),
    ),
}


def write_mp3(mix, out_path):
    tmp = "public/_loop_tmp.wav"
    data = (mix * 32767).astype(np.int16)
    with wave.open(tmp, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())
    subprocess.run(
        ["ffmpeg", "-y", "-i", tmp, "-codec:a", "libmp3lame", "-b:a", "128k", out_path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    os.remove(tmp)


def main():
    os.makedirs("public", exist_ok=True)
    np.random.seed(7)  # deterministic hats so re-runs are identical
    for name, cfg in TRACKS.items():
        mix, dur = build(**cfg)
        out = f"public/track-{name}.mp3"
        write_mp3(mix, out)
        print(f"wrote {out} ({os.path.getsize(out)} bytes, {dur:.1f}s loop)")


if __name__ == "__main__":
    main()
