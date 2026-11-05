import { useCallback, useEffect, useState } from "react";

export const THEMES = ["deepspace", "nebula", "sunset"];
const KEY = "space-dj-theme";

/**
 * Theme state synced to <html data-theme> and localStorage.
 * Returns [theme, setTheme, cycleTheme].
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "deepspace";
    const saved = window.localStorage.getItem(KEY);
    return THEMES.includes(saved) ? saved : "deepspace";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* ignore storage errors (private mode) */
    }
  }, [theme]);

  const setTheme = useCallback((t) => {
    if (THEMES.includes(t)) setThemeState(t);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((cur) => {
      const i = THEMES.indexOf(cur);
      return THEMES[(i + 1) % THEMES.length];
    });
  }, []);

  return [theme, setTheme, cycleTheme];
}
