"use client";

import { useEffect, useRef } from "react";

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      time = timestamp / 2000;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h * 0.45;
      const sz = Math.min(w, h);

      ctx.clearRect(0, 0, w, h);

      // === Outer atmospheric glow ===
      const outerGrad = ctx.createRadialGradient(cx, cy, sz * 0.05, cx, cy, sz * 0.5);
      outerGrad.addColorStop(0, "rgba(90,80,255,0.03)");
      outerGrad.addColorStop(0.3, "rgba(140,90,255,0.02)");
      outerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, w, h);

      // === Event horizon glow layers ===
      for (let i = 3; i >= 0; i--) {
        const r = sz * (0.168 + i * 0.015);
        const alpha = [0.08, 0.05, 0.03, 0.01][i];
        const grad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r);
        grad.addColorStop(0, `rgba(167,140,255,${alpha})`);
        grad.addColorStop(0.6, `rgba(94,86,255,${alpha * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // === Accretion disk - back half (behind black hole) ===
      // The disk is drawn as layered elliptical bands
      const diskCx = cx;
      const diskCy = cy;
      const bandCount = 40;
      const innerR = sz * 0.175;
      const outerR = sz * 0.48;

      const colors = [
        [255, 255, 255],    // white
        [200, 180, 255],    // lavender
        [93, 143, 255],     // electric blue
        [122, 98, 255],     // violet
        [217, 79, 255],     // magenta
        [255, 114, 169],    // pink
        [255, 180, 130],    // soft orange
      ];

      // Draw back half (y above center in the original orientation)
      // In our coordinate system, we compress Y to create perspective
      for (let pass = 0; pass < 2; pass++) {
        const isBack = pass === 0;
        ctx.save();

        for (let b = 0; b < bandCount; b++) {
          const t = b / bandCount;
          const radius = innerR + t * (outerR - innerR);
          const bandWidth = (outerR - innerR) / bandCount * 1.8;

          // Color interpolation
          const ci = t * (colors.length - 1);
          const cIdx = Math.floor(ci);
          const cMix = ci - cIdx;
          const c1 = colors[Math.min(cIdx, colors.length - 1)];
          const c2 = colors[Math.min(cIdx + 1, colors.length - 1)];

          const r = Math.round(c1[0] + (c2[0] - c1[0]) * cMix);
          const g = Math.round(c1[1] + (c2[1] - c1[1]) * cMix);
          const bl = Math.round(c1[2] + (c2[2] - c1[2]) * cMix);

          // Brightness falls off toward outer edge and peaks at inner
          const brightness = 1 - t * 0.4;
          const innerGlow = Math.max(0, 1 - t * 2) * 0.5;

          // Turbulence displacement
          const turbX = Math.sin(time * (0.3 + t * 0.5) + b * 0.5) * 3;
          const turbY = Math.cos(time * (0.2 + t * 0.3) + b * 0.7) * 2;

          // Y compression for perspective
          const yScale = 0.28 + t * 0.15 + 0.03 * Math.sin(time + b);

          // Draw the band as a partial ellipse (front or back half)
          ctx.beginPath();

          const segments = 60;
          const startAngle = isBack ? 0 : Math.PI;
          const endAngle = isBack ? Math.PI : Math.PI * 2;

          for (let s = 0; s <= segments; s++) {
            const angle = startAngle + (endAngle - startAngle) * (s / segments);
            const px = diskCx + (radius + turbX) * Math.cos(angle);
            const py = diskCy + (radius * yScale + turbY) * Math.sin(angle);

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const alpha = (0.15 + t * 0.4) * brightness * (isBack ? 0.35 : 0.85) + innerGlow;
          const r2 = Math.min(255, r + 50 * innerGlow);
          const g2 = Math.min(255, g + 30 * innerGlow);
          const bl2 = Math.min(255, bl + 30 * innerGlow);

          ctx.fillStyle = `rgba(${r2},${g2},${bl2},${alpha})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // === Bright accretion ring (just outside event horizon) ===
      const ringR = sz * 0.175;
      const ringGrad = ctx.createRadialGradient(cx, cy, ringR - 3, cx, cy, ringR + 12);
      ringGrad.addColorStop(0, "rgba(255,255,255,0)");
      ringGrad.addColorStop(0.3, "rgba(200,180,255,0.1)");
      ringGrad.addColorStop(0.5, "rgba(167,140,255,0.18)");
      ringGrad.addColorStop(0.7, "rgba(255,255,255,0.22)");
      ringGrad.addColorStop(0.85, "rgba(167,140,255,0.1)");
      ringGrad.addColorStop(1, "rgba(167,140,255,0)");
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR + 12, 0, Math.PI * 2);
      ctx.fill();

      // === Event horizon (black circle) ===
      const horR = sz * 0.168;
      const horGrad = ctx.createRadialGradient(cx - horR * 0.2, cy - horR * 0.2, 0, cx, cy, horR);
      horGrad.addColorStop(0, "#000000");
      horGrad.addColorStop(0.8, "#000000");
      horGrad.addColorStop(0.92, "#030308");
      horGrad.addColorStop(0.97, "#080818");
      horGrad.addColorStop(1, "#000000");
      ctx.fillStyle = horGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, horR, 0, Math.PI * 2);
      ctx.fill();

      // === Sharp event horizon edge ring ===
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, horR, 0, Math.PI * 2);
      ctx.stroke();

      // === Bottom overlay (front disk covers bottom of black hole) ===
      const overlayGrad = ctx.createRadialGradient(cx, cy + sz * 0.02, sz * 0.1, cx, cy + sz * 0.02, sz * 0.28);
      overlayGrad.addColorStop(0, "rgba(4,4,11,0)");
      overlayGrad.addColorStop(0.3, "rgba(4,4,11,0.1)");
      overlayGrad.addColorStop(0.6, "rgba(4,4,11,0.4)");
      overlayGrad.addColorStop(0.85, "rgba(4,4,11,0.7)");
      overlayGrad.addColorStop(1, "rgba(4,4,11,0.95)");
      ctx.fillStyle = overlayGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy + sz * 0.015, sz * 0.25, sz * 0.07, 0, 0, Math.PI);
      ctx.fill();

      // === Gas filaments (left, leading) ===
      ctx.save();
      for (let i = 0; i < 25; i++) {
        const baseAngle = Math.PI + (Math.random() - 0.5) * 0.8;
        const len = 0.2 + Math.random() * 0.6;
        const width = 1.5 + Math.random() * 5;
        const wobble = Math.sin(time * 0.4 + i * 0.7) * 0.15 + Math.sin(time * 0.7 + i * 1.1) * 0.08;

        const alpha = 0.05 + Math.random() * 0.1;
        const col = i % 3 === 0 ? `rgba(93,143,255,${alpha})` :
                    i % 3 === 1 ? `rgba(122,98,255,${alpha})` :
                                  `rgba(217,79,255,${alpha * 0.7})`;

        ctx.strokeStyle = col;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();

        const startR = sz * 0.16 + Math.random() * sz * 0.04;
        const startAngle = baseAngle + wobble * 0.5;
        const cpR = startR + len * sz * 0.25;
        const endR = startR + len * sz * 0.45;
        const endAngle = baseAngle + wobble;

        const sx = cx + Math.cos(startAngle) * startR;
        const sy = cy + Math.sin(startAngle) * startR * 0.35;
        const cpx = cx + Math.cos(baseAngle - 0.1 + wobble) * cpR;
        const cpy = cy + Math.sin(baseAngle - 0.1 + wobble) * cpR * 0.35;
        const ex = cx + Math.cos(endAngle) * endR;
        const ey = cy + Math.sin(endAngle) * endR * 0.35;

        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(cpx, cpy, ex, ey);
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
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
