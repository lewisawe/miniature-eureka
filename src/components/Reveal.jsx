import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children into view once, when scrolled near.
 * Respects prefers-reduced-motion (renders visible immediately).
 */
export default function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  // Initialize from reduced-motion during render — avoids setState-in-effect.
  const [shown, setShown] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (shown) return; // already visible (reduced motion) — nothing to observe
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal--in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
