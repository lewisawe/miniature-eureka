import { useEffect } from "react";

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Calls `onUnlock` when the Konami code is entered.
 */
export function useKonami(onUnlock) {
  useEffect(() => {
    let pos = 0;
    function onKey(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[pos]) {
        pos += 1;
        if (pos === SEQUENCE.length) {
          pos = 0;
          onUnlock();
        }
      } else {
        // allow a restart if the wrong key is actually the first key
        pos = key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
