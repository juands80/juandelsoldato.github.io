"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  radius: number;
  size: number;
  speed: number;
  opacity: number;
  color: { r: number; g: number; b: number };
  turbulence: number;
  turbSpeed: number;
  turbOffset: number;
}

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const particles: Particle[] = [];
    const particleCount = 800;

    const colors = [
      { r: 255, g: 255, b: 255 },   // white
      { r: 200, g: 180, b: 255 },   // lavender
      { r: 93, g: 143, b: 255 },    // electric blue
      { r: 122, g: 98, b: 255 },    // violet
      { r: 217, g: 79, b: 255 },    // magenta
      { r: 255, g: 114, b: 169 },   // pink
      { r: 255, g: 180, b: 130 },   // soft orange
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const colorIdx = Math.floor(t * colors.length);
        const nextIdx = Math.min(colorIdx + 1, colors.length - 1);
        const mix = (t * (colors.length - 1)) % 1;

        const c1 = colors[colorIdx];
        const c2 = colors[nextIdx];

        particles.push({
          angle: Math.random() * Math.PI * 2,
          radius: 0.28 + Math.random() * 0.35,
          size: 1 + Math.random() * 3,
          speed: 0.3 + Math.random() * 0.7,
          opacity: 0.3 + Math.random() * 0.7,
          color: {
            r: Math.round(c1.r + (c2.r - c1.r) * mix),
            g: Math.round(c1.g + (c2.g - c1.g) * mix),
            b: Math.round(c1.b + (c2.b - c1.b) * mix),
          },
          turbulence: 0.002 + Math.random() * 0.008,
          turbSpeed: 0.2 + Math.random() * 0.5,
          turbOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    initParticles();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const draw = (timestamp: number) => {
      time = timestamp / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const size = Math.min(w, h);
      const diskScale = size * 0.42;

      ctx.clearRect(0, 0, w, h);

      // === Outer glow ===
      const outerGrad = ctx.createRadialGradient(cx, cy, size * 0.12, cx, cy, size * 0.45);
      outerGrad.addColorStop(0, "rgba(139,115,255,0.04)");
      outerGrad.addColorStop(0.5, "rgba(200,120,255,0.02)");
      outerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, w, h);

      // === Event horizon outer glow ===
      const glowGrad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.22);
      glowGrad.addColorStop(0, "rgba(94,86,255,0.15)");
      glowGrad.addColorStop(0.5, "rgba(155,91,255,0.08)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // === Accretion disk (particle-based) ===
      // Draw back half first
      for (let pass = 0; pass < 2; pass++) {
        for (const p of particles) {
          const turbX = Math.sin(time * p.turbSpeed + p.turbOffset) * p.turbulence;
          const turbY = Math.cos(time * p.turbSpeed * 0.7 + p.turbOffset * 1.3) * p.turbulence * 0.7;

          const angle = p.angle + time * p.speed * 0.15 + turbX;

          // Y-axis compression for perspective (front half visible, back half behind)
          const perspectiveY = Math.sin(angle) * (0.55 + 0.05 * Math.sin(time * 0.3 + p.turbOffset));

          // Determine if this particle is in front or back
          const isFront = Math.sin(angle) >= 0;

          if ((pass === 0 && isFront) || (pass === 1 && !isFront)) continue;

          const r = p.radius * diskScale + turbY * diskScale * 0.1;
          const x = cx + Math.cos(angle) * r;
          const y = cy + perspectiveY * r;

          // Motion blur effect - stretch horizontally
          const stretch = 1 + (1 - Math.abs(Math.cos(angle))) * 3;

          // Brightness based on proximity to event horizon
          const proximity = 1 - (p.radius - 0.28) / 0.35;
          const brightness = 0.5 + proximity * 0.5;

          ctx.save();
          ctx.globalAlpha = p.opacity * brightness * (pass === 0 ? 0.9 : 0.35);
          ctx.translate(x, y);
          ctx.scale(stretch, 1);

          const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grd.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},1)`);
          grd.addColorStop(0.4, `rgba(${p.color.r},${p.color.g},${p.color.b},0.6)`);
          grd.addColorStop(1, `rgba(${p.color.r},${p.color.g},${p.color.b},0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      // === Bright inner ring (event horizon edge) ===
      const ringR = size * 0.175;
      const ringGrad = ctx.createRadialGradient(cx, cy, ringR - 4, cx, cy, ringR + 8);
      ringGrad.addColorStop(0, "rgba(255,255,255,0)");
      ringGrad.addColorStop(0.4, "rgba(200,180,255,0.15)");
      ringGrad.addColorStop(0.6, "rgba(167,140,255,0.25)");
      ringGrad.addColorStop(0.8, "rgba(255,255,255,0.3)");
      ringGrad.addColorStop(1, "rgba(167,140,255,0)");
      ctx.fillStyle = ringGrad;

      ctx.beginPath();
      ctx.arc(cx, cy, ringR + 8, 0, Math.PI * 2);
      ctx.fill();

      // === Event horizon (black circle) ===
      const horizonR = size * 0.168;
      const horizonGrad = ctx.createRadialGradient(cx - horizonR * 0.3, cy - horizonR * 0.3, 0, cx, cy, horizonR);
      horizonGrad.addColorStop(0, "#000000");
      horizonGrad.addColorStop(0.7, "#000000");
      horizonGrad.addColorStop(0.85, "#050510");
      horizonGrad.addColorStop(0.95, "#0A0A1A");
      horizonGrad.addColorStop(1, "#000000");
      ctx.fillStyle = horizonGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
      ctx.fill();

      // === Sharp event horizon ring ===
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
      ctx.stroke();

      // === Accretion disk overlay (bottom half blocking) ===
      const overlayGrad = ctx.createRadialGradient(cx, cy, size * 0.12, cx, cy, size * 0.25);
      overlayGrad.addColorStop(0, "rgba(4,4,11,0)");
      overlayGrad.addColorStop(0.5, "rgba(4,4,11,0.15)");
      overlayGrad.addColorStop(0.8, "rgba(4,4,11,0.5)");
      overlayGrad.addColorStop(1, "rgba(4,4,11,0.9)");
      ctx.fillStyle = overlayGrad;

      ctx.beginPath();
      ctx.ellipse(cx, cy + size * 0.02, size * 0.22, size * 0.06, 0, 0, Math.PI);
      ctx.fill();

      // === Gas filaments (left side jets) ===
      ctx.save();
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < 20; i++) {
        const baseAngle = Math.PI + (Math.random() - 0.5) * 0.5;
        const len = 0.3 + Math.random() * 0.5;
        const width = 2 + Math.random() * 6;
        const wobble = Math.sin(time * 0.5 + i) * 0.1;

        ctx.strokeStyle = i % 3 === 0 ? "rgba(93,143,255,0.3)" :
                         i % 3 === 1 ? "rgba(122,98,255,0.2)" :
                                       "rgba(217,79,255,0.15)";
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const endAngle = baseAngle + wobble;
        const endR = size * (0.18 + len * 0.35);
        const cpR = size * (0.18 + len * 0.2);
        const cpAngle = baseAngle - 0.15 + wobble;
        ctx.quadraticCurveTo(
          cx + Math.cos(cpAngle) * cpR,
          cy + Math.sin(cpAngle) * cpR * 0.4,
          cx + Math.cos(endAngle) * endR,
          cy + Math.sin(endAngle) * endR * 0.4
        );
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full">
      <div
        className="relative"
        style={{
          width: "70vw",
          maxWidth: 900,
          aspectRatio: "1.4 / 1",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
