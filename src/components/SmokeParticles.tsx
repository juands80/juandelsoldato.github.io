"use client";

import { useEffect, useRef } from "react";

const IMG_W = 1672;
const IMG_H = 941;
const CHIMNEY_X = 833;
const CHIMNEY_Y = 578;

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  drift: number;
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

    const scaleX = () => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return 1;
      const s = Math.max(rect.width / IMG_W, rect.height / IMG_H);
      return s;
    };

    const origin = () => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      const s = Math.max(rect.width / IMG_W, rect.height / IMG_H);
      const imgW = IMG_W * s;
      const imgH = IMG_H * s;
      const ox = (rect.width - imgW) / 2;
      const oy = (rect.height - imgH) / 2;
      return {
        x: ox + CHIMNEY_X * s,
        y: oy + CHIMNEY_Y * s,
      };
    };

    const particles: Particle[] = [];
    const MAX_PARTICLES = 25;
    let frameId: number;

    const spawn = () => {
      const o = origin();
      const s = scaleX();
      const speedBase = 3 + Math.random() * 4;
      particles.push({
        x: o.x + (Math.random() - 0.5) * 4 * s,
        y: o.y,
        size: (3 + Math.random() * 6) * s,
        opacity: 0.15 + Math.random() * 0.2,
        speedY: -(2 + Math.random() * 5) * s * 0.25,
        speedX: (Math.random() - 0.5) * 2 * s * 0.3,
        drift: (Math.random() - 0.5) * 0.1,
        life: 0,
        maxLife: 150 + Math.random() * 200,
      });
    };

    const draw = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < MAX_PARTICLES && Math.random() < 0.15) {
        spawn();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.y += p.speedY;
        p.speedY *= 0.998;
        p.x += p.speedX;
        p.speedX += p.drift * 0.005;
        p.size *= 1.002;

        const lifeRatio = p.life / p.maxLife;
        const fadeOut = 1 - lifeRatio;
        const alpha = p.opacity * fadeOut * Math.min(lifeRatio * 4, 1);

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = "#F0EDE4";

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalAlpha = alpha * 0.4;
        ctx!.filter = "blur(4px)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
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
