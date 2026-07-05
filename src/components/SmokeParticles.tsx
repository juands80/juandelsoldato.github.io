"use client";

import { useEffect, useRef } from "react";

const IMG_W = 1672;
const IMG_H = 941;
const CHIMNEY_X = 785;
const CHIMNEY_Y = 602;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  windDrift: number;
  life: number;
  maxLife: number;
}

export default function SmokeParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    mount.appendChild(canvas);

    // Pre-rendered smoke bubble texture (avoids blur filter per frame)
    const texSize = 64;
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texSize;
    texCanvas.height = texSize;
    const texCtx = texCanvas.getContext("2d")!;
    const grad = texCtx.createRadialGradient(
      texSize / 2, texSize / 2, 0,
      texSize / 2, texSize / 2, texSize / 2
    );
    grad.addColorStop(0, "rgba(237,232,222,1)");
    grad.addColorStop(0.15, "rgba(237,232,222,0.5)");
    grad.addColorStop(0.4, "rgba(237,232,222,0.15)");
    grad.addColorStop(1, "rgba(237,232,222,0)");
    texCtx.fillStyle = grad;
    texCtx.fillRect(0, 0, texSize, texSize);

    const origin = () => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0, s: 1 };
      const s = Math.max(rect.width / IMG_W, rect.height / IMG_H);
      const imgW = IMG_W * s;
      const imgH = IMG_H * s;
      return {
        x: (rect.width - imgW) / 2 + CHIMNEY_X * s,
        y: (rect.height - imgH) / 2 + CHIMNEY_Y * s,
      };
    };

    const particles: Particle[] = [];
    const MAX_PARTICLES = 80;
    let frameId: number;

    const spawn = () => {
      if (particles.length >= MAX_PARTICLES) return;
      const o = origin();
      particles.push({
        x: o.x + (Math.random() - 0.5) * 2,
        y: o.y,
        size: 0.75 + Math.random() * 1,
        speedY: -(0.375 + Math.random() * 0.3),
        speedX: (Math.random() - 0.5) * 0.1,
        windDrift: 0.03 + Math.random() * 0.04,
        life: 0,
        maxLife: 525 + Math.random() * 450,
      });
    };

    const draw = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.5) spawn();

      const halfTex = texSize / 2;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;

        p.y += p.speedY;
        p.speedY *= 0.999;
        p.x += p.speedX + p.windDrift * lifeRatio;
        p.size += 0.003;

        const fadeOut = 1 - lifeRatio;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const alpha = fadeOut * fadeIn;

        if (alpha < 0.01) continue;

        ctx!.globalAlpha = alpha;
        const s = p.size * 3;

        if (s > 1) {
          ctx!.drawImage(texCanvas, p.x - s, p.y - s, s * 2, s * 2);
        }
      }

      ctx!.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      if (mount.contains(canvas)) {
        mount.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
