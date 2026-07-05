"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  hasGlow: boolean;
  twinkleSpeed: number;
  twinkleDelay: number;
}

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = [];
    const count = 500;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.58,
        size: Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3,
        opacity: [0.2, 0.4, 0.6, 0.8, 1.0][Math.floor(Math.random() * 5)],
        hasGlow: Math.random() < 0.1,
        twinkleSpeed: 2 + Math.random() * 6,
        twinkleDelay: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    const startTime = performance.now();

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle =
          star.opacity *
          (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time / 1000 * star.twinkleSpeed + star.twinkleDelay)));

        ctx.globalAlpha = twinkle;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.hasGlow) {
          ctx.shadowColor = "#7B6EFF";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
