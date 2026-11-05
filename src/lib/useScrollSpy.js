import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view.
 * Uses IntersectionObserver — no scroll listeners, cheap.
 * @param {string[]} ids - section element ids to watch
 */
export function useScrollSpy(ids, { rootMargin = "-45% 0px -50% 0px" } = {}) {
  const [activeId, setActiveId] = useState(ids[0] || null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin, threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
