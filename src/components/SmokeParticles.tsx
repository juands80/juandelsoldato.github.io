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
  opacity: number;
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

    const origin = () => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0, s: 1 };
      const s = Math.max(rect.width / IMG_W, rect.height / IMG_H);
      const imgW = IMG_W * s;
      const imgH = IMG_H * s;
      return {
        x: (rect.width - imgW) / 2 + CHIMNEY_X * s,
        y: (rect.height - imgH) / 2 + CHIMNEY_Y * s,
        s,
      };
    };

    const particles: Particle[] = [];
    const MAX_PARTICLES = 70;
    let frameId: number;

    const spawn = () => {
      if (particles.length >= MAX_PARTICLES) return;
      const o = origin();
      particles.push({
        x: o.x + (Math.random() - 0.5) * 2,
        y: o.y,
        size: 1.5 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.25,
        speedY: -(0.25 + Math.random() * 0.2),
        speedX: (Math.random() - 0.5) * 0.1,
        windDrift: 0.03 + Math.random() * 0.04,
        life: 0,
        maxLife: 350 + Math.random() * 300,
      });
    };

    const draw = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.5) spawn();

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
        p.        size += 0.006;

        const fadeOut = 1 - lifeRatio;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const alpha = p.opacity * fadeOut * fadeIn;

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = "#EDE8DE";

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalAlpha = alpha * 0.3;
        ctx!.filter = "blur(6px)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.filter = "none";
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
