import { useEffect, useRef } from "react";

/**
 * Animated starfield canvas. Sits fixed behind all content.
 * Respects prefers-reduced-motion (renders a static field, no animation loop).
 */
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = { width: window.innerWidth, height: window.innerHeight };
    canvas.width = size.width;
    canvas.height = size.height;
    const raf = { id: 0 };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const STAR_COUNT = Math.min(
      220,
      Math.floor((size.width * size.height) / 9000)
    );

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * size.width,
      y: Math.random() * size.height,
      r: Math.random() * 1.4 + 0.2,
      tw: Math.random() * Math.PI * 2, // twinkle phase
      sp: Math.random() * 0.015 + 0.004, // twinkle speed
      hue: Math.random() > 0.85 ? "accent" : "white",
    }));

    function draw(t) {
      ctx.clearRect(0, 0, size.width, size.height);
      for (const s of stars) {
        const twinkle = reduceMotion
          ? 0.7
          : 0.4 + Math.abs(Math.sin(s.tw + t * s.sp)) * 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.hue === "accent") {
          ctx.fillStyle = `rgba(255, 211, 78, ${twinkle})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        }
        ctx.fill();
      }
      if (!reduceMotion) {
        raf.id = requestAnimationFrame(draw);
      }
    }

    draw(0);

    function handleResize() {
      size.width = canvas.width = window.innerWidth;
      size.height = canvas.height = window.innerHeight;
      if (reduceMotion) draw(0);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf.id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
