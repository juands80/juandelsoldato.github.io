"use client";

import { useEffect, useRef } from "react";

// ============================================================
// IMAGE CONSTANTS (2528 x 1686)
// ============================================================
const IMG_W = 2528;
const IMG_H = 1686;

// Chimney
const CHIMNEY_X = 1698;
const CHIMNEY_Y = 617;
const CHIMNEY_RADIUS = 15;

// Windows block
const WIN_LEFT = 1624;
const WIN_RIGHT = 1780;
const WIN_TOP = 652;
const WIN_BOTTOM = 725;

// Platform glow
const PLATFORM_X = 1705;
const PLATFORM_Y = 760;
const PLATFORM_RADIUS = 120;

// Tower body glow
const TOWER_X = 1700;
const TOWER_Y = 930;
const TOWER_RADIUS = 180;

// Pines
const PINE_L_X = 1540;
const PINE_L_Y = 1120;
const PINE_L_H = 450;
const PINE_R_X = 1865;
const PINE_R_Y = 1080;
const PINE_R_H = 470;

// ============================================================
// PERLIN NOISE
// ============================================================
class Perlin {
  private perm: number[];

  constructor() {
    this.perm = [];
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }

  private fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);
    const aa = this.perm[this.perm[X] + Y];
    const ab = this.perm[this.perm[X] + Y + 1];
    const ba = this.perm[this.perm[X + 1] + Y];
    const bb = this.perm[this.perm[X + 1] + Y + 1];
    return this.lerp(
      this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v
    );
  }
}

// ============================================================
// INTERFACES
// ============================================================
interface Star {
  x: number;
  y: number;
  baseBrightness: number;
  animating: boolean;
  phase: number;
  speed: number;
}

interface SmokeParticle {
  imgX: number;
  imgY: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  seed: number;
}

// ============================================================
// COMPONENT
// ============================================================
export default function AmbientEffects() {
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

    // ==========================================================
    // IMAGE COORDINATE MAPPING (cover + center)
    // ==========================================================
    const toScreen = (imgX: number, imgY: number) => {
      const rect = mount.parentElement?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0, s: 1 };
      const s = Math.max(rect.width / IMG_W, rect.height / IMG_H);
      return {
        x: (rect.width - IMG_W * s) / 2 + imgX * s,
        y: (rect.height - IMG_H * s) / 2 + imgY * s,
        s,
      };
    };

    const perlin = new Perlin();

    // ==========================================================
    // STARS
    // ==========================================================
    const stars: Star[] = [];
    for (let i = 0; i < 140; i++) {
      const s = toScreen(0, 0).s;
      const skyTop = toScreen(0, 0).y;
      const skyBottom = toScreen(0, IMG_H * 0.45).y;
      stars.push({
        x: Math.random() * canvas.width,
        y: skyTop + Math.random() * (skyBottom - skyTop),
        baseBrightness: 0.3 + Math.random() * 0.7,
        animating: Math.random() < 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      });
    }

    // ==========================================================
    // SMOKE PARTICLES
    // ==========================================================
    const smoke: SmokeParticle[] = [];

    const spawnSmoke = () => {
      const o = toScreen(CHIMNEY_X, CHIMNEY_Y);
      const spread = CHIMNEY_RADIUS * o.s;
      smoke.push({
        imgX: CHIMNEY_X + (Math.random() - 0.5) * 6,
        imgY: CHIMNEY_Y + (Math.random() - 0.5) * 4,
        size: 2 + Math.random() * 3,
        opacity: 0.15 + Math.random() * 0.2,
        life: 0,
        maxLife: 400 + Math.random() * 300,
        seed: Math.random() * 1000,
      });
    };

    // ==========================================================
    // LAMP INTENSITY (shared by windows, glow, shadows)
    // ==========================================================
    const getLampIntensity = (time: number, phase: number) => {
      const n1 = perlin.noise(time * 0.08 + phase, 0) * 0.5;
      const n2 = perlin.noise(time * 0.12 + phase + 5, 0.5) * 0.3;
      const sin1 = Math.sin(time * 0.004 + phase) * 0.3;
      const sin2 = Math.sin(time * 0.009 + phase * 1.3) * 0.2;
      return 0.92 + (n1 + n2 + sin1 + sin2) * 0.08;
    };

    // ==========================================================
    // AMBIENT BREATHING
    // ==========================================================
    const getBreathing = (time: number) => {
      const cycle = 20000;
      const t = (time % cycle) / cycle;
      const smooth = Math.sin(t * Math.PI * 2);
      return 1 + smooth * 0.005;
    };

    // ==========================================================
    // CLOUDS (very subtle drifting overlays)
    // ==========================================================
    const clouds = [
      { x: 0.72, y: 0.08, w: 0.15, h: 0.06, speed: 0.3 },
      { x: 0.78, y: 0.15, w: 0.12, h: 0.04, speed: 0.2 },
      { x: 0.6, y: 0.55, w: 0.2, h: 0.05, speed: 0.25 },
    ];

    // ==========================================================
    // RENDER
    // ==========================================================
    let frameId: number;
    let lastTime = 0;

    const draw = (now: number) => {
      const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
      lastTime = now;

      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      const time = now;
      const lampIntensity = getLampIntensity(time, 0);

      // ---- LAMP INTENSITY ----
      const lamp = getLampIntensity(time, 0);
      const lampL = getLampIntensity(time, 1.5);
      const lampR = getLampIntensity(time, 3.0);

      // ---- STARS ----
      for (const star of stars) {
        if (!star.animating) {
          ctx!.globalAlpha = star.baseBrightness * 0.5;
        } else {
          const twinkle = Math.sin(time / 1000 * star.speed + star.phase);
          const mappedTwinkle = 0.8 + twinkle * 0.35;
          ctx!.globalAlpha = star.baseBrightness * Math.min(mappedTwinkle, 1.15);
        }
        ctx!.fillStyle = "#FFFFFF";
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx!.fill();
      }

      // ---- WINDOW GLOW ----
      const winCenterX = (WIN_LEFT + WIN_RIGHT) / 2;
      const winCenterY = (WIN_TOP + WIN_BOTTOM) / 2;

      // Windows left side glow
      const wl = toScreen(WIN_LEFT, winCenterY);
      const wr = toScreen(WIN_RIGHT, winCenterY);
      const wt = toScreen(winCenterX, WIN_TOP);
      const wb = toScreen(winCenterX, WIN_BOTTOM);
      const winScreenS = wr.x - wl.x;
      const winScreenR = winScreenS * 0.8;

      // Main window glow (all windows)
      const winGlow = toScreen(winCenterX, winCenterY);
      const gradWin = ctx!.createRadialGradient(
        winGlow.x, winGlow.y, 0,
        winGlow.x, winGlow.y, winScreenR
      );
      const warmAlpha = 0.12 * lamp;
      gradWin.addColorStop(0, `rgba(255,200,120,${warmAlpha})`);
      gradWin.addColorStop(0.4, `rgba(255,180,100,${warmAlpha * 0.6})`);
      gradWin.addColorStop(1, "rgba(255,180,100,0)");
      ctx!.fillStyle = gradWin;
      ctx!.fillRect(
        winGlow.x - winScreenR,
        winGlow.y - winScreenR,
        winScreenR * 2,
        winScreenR * 2
      );

      // Window rects (warm fill)
      const cellW = (WIN_RIGHT - WIN_LEFT) / 4;
      const cellH = (WIN_BOTTOM - WIN_TOP) / 3;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          const phase = (row * 4 + col) * 0.5;
          const intensity = getLampIntensity(time, phase);
          const cx = toScreen(WIN_LEFT + cellW * (col + 0.5), WIN_TOP + cellH * (row + 0.5));
          const cw = (toScreen(WIN_LEFT + cellW * col, 0).x - toScreen(0, 0).x) * 2;
          const ch = (toScreen(0, WIN_TOP + cellH * row).y - toScreen(0, 0).y) * 2;
          const rectW = Math.abs(toScreen(WIN_LEFT + cellW * (col + 1), 0).x - toScreen(WIN_LEFT + cellW * col, 0).x) * 0.8;
          const rectH = Math.abs(toScreen(0, WIN_TOP + cellH * (row + 1)).y - toScreen(0, WIN_TOP + cellH * row).y) * 0.8;

          ctx!.globalAlpha = 0.15 * intensity;
          ctx!.fillStyle = "#FFD9A0";
          ctx!.fillRect(cx.x - rectW / 2, cx.y - rectH / 2, rectW, rectH);

          ctx!.globalAlpha = 0.08 * intensity;
          ctx!.fillStyle = "#FFE8C0";
          ctx!.fillRect(cx.x - rectW / 3, cx.y - rectH / 3, rectW * 0.66, rectH * 0.66);
        }
      }

      // ---- PLATFORM GLOW ----
      const plat = toScreen(PLATFORM_X, PLATFORM_Y);
      const platR = PLATFORM_RADIUS * plat.s;
      const gradPlat = ctx!.createRadialGradient(
        plat.x, plat.y, 0,
        plat.x, plat.y, platR
      );
      const platAlpha = 0.06 * lamp;
      gradPlat.addColorStop(0, `rgba(255,200,150,${platAlpha})`);
      gradPlat.addColorStop(0.5, `rgba(255,180,130,${platAlpha * 0.5})`);
      gradPlat.addColorStop(1, "rgba(255,180,130,0)");
      ctx!.fillStyle = gradPlat;
      ctx!.fillRect(plat.x - platR, plat.y - platR, platR * 2, platR * 2);

      // ---- TOWER BODY GLOW ----
      const tower = toScreen(TOWER_X, TOWER_Y);
      const towerR = TOWER_RADIUS * tower.s;
      const gradTower = ctx!.createRadialGradient(
        tower.x, tower.y, 0,
        tower.x, tower.y, towerR
      );
      const towerAlpha = 0.04 * lamp;
      gradTower.addColorStop(0, `rgba(255,190,130,${towerAlpha})`);
      gradTower.addColorStop(0.6, `rgba(255,180,120,${towerAlpha * 0.4})`);
      gradTower.addColorStop(1, "rgba(255,180,120,0)");
      ctx!.fillStyle = gradTower;
      ctx!.fillRect(tower.x - towerR, tower.y - towerR, towerR * 2, towerR * 2);

      // ---- PINE ILLUMINATION ----
      const pineGlow = (x: number, y: number, h: number, intensity: number) => {
        const p = toScreen(x, y);
        const pH = h * p.s;
        const pR = pH * 0.5;
        const gradPine = ctx!.createRadialGradient(
          p.x, p.y - pH * 0.3, 0,
          p.x, p.y - pH * 0.3, pR
        );
        const pineAlpha = 0.025 * intensity;
        gradPine.addColorStop(0, `rgba(220,190,140,${pineAlpha})`);
        gradPine.addColorStop(1, "rgba(220,190,140,0)");
        ctx!.fillStyle = gradPine;
        ctx!.fillRect(p.x - pR, p.y - pH - pR, pR * 2, pH * 0.8 + pR * 2);
      };
      pineGlow(PINE_L_X, PINE_L_Y, PINE_L_H, lamp);
      pineGlow(PINE_R_X, PINE_R_Y, PINE_R_H, lamp);

      // ---- DYNAMIC SHADOW (tower wood) ----
      const shadowVal = (1 - lamp) * 0.015;
      ctx!.globalAlpha = shadowVal;
      ctx!.fillStyle = "#000000";

      const tw = toScreen(TOWER_X, TOWER_Y);
      const twH = 200 * tw.s;
      const twW = 60 * tw.s;
      ctx!.fillRect(tw.x - twW / 2, tw.y - twH / 2, twW, twH);

      // ---- SMOKE ----
      if (smoke.length < 18 && Math.random() < 0.15) {
        spawnSmoke();
      }

      ctx!.globalAlpha = 1;

      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i];
        p.life++;
        if (p.life > p.maxLife) {
          smoke.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;

        // Perlin-driven path
        const n1 = perlin.noise(p.seed + time * 0.0003, p.life * 0.005);
        const n2 = perlin.noise(p.seed + 500 + time * 0.0002, p.life * 0.004);

        // Image-space position
        const driftX = n1 * 8 + lifeRatio * 3;
        const driftY = n2 * 4;
        const rise = lifeRatio * 120;

        const screenP = toScreen(p.imgX + driftX, p.imgY - rise + driftY);
        const s = (p.size + lifeRatio * 10) * screenP.s;

        const fadeOut = 1 - lifeRatio * lifeRatio;
        const fadeIn = Math.min(lifeRatio * 3, 1);
        const alpha = p.opacity * fadeOut * fadeIn;

        ctx!.globalAlpha = alpha * 0.6;
        ctx!.fillStyle = "#EDE8DE";

        ctx!.beginPath();
        ctx!.arc(screenP.x, screenP.y, s, 0, Math.PI * 2);
        ctx!.fill();

        // Soft glow
        ctx!.globalAlpha = alpha * 0.15;

        const gradSmoke = ctx!.createRadialGradient(
          screenP.x, screenP.y, 0,
          screenP.x, screenP.y, s * 2.5
        );
        gradSmoke.addColorStop(0, "rgba(237,232,222,0.3)");
        gradSmoke.addColorStop(1, "rgba(237,232,222,0)");
        ctx!.fillStyle = gradSmoke;
        ctx!.fillRect(screenP.x - s * 2.5, screenP.y - s * 2.5, s * 5, s * 5);
      }

      // ---- CLOUDS ----
      for (const cloud of clouds) {
        const offset = ((time / 1000) * cloud.speed * cloud.speed) % 1;
        const cx = cloud.x + offset;
        const cy = cloud.y;
        const cw = cloud.w;
        const ch = cloud.h;

        const cScreenX = cx * canvas.width;
        const cScreenY = cy * canvas.height;
        const cScreenW = cw * canvas.width;
        const cScreenH = ch * canvas.height;

        ctx!.globalAlpha = 0.02;
        ctx!.fillStyle = "#FFFFFF";
        ctx!.beginPath();
        ctx!.ellipse(
          cScreenX - cScreenW * 2,
          cScreenY,
          cScreenW * 3,
          cScreenH,
          0, 0, Math.PI * 2
        );
        ctx!.fill();
      }

      // ---- AMBIENT BREATHING ----
      const breath = getBreathing(time);
      if (breath !== 1) {
        ctx!.globalAlpha = (breath - 1) * 0.5;
        ctx!.fillStyle = breath > 1 ? "#FFFFFF" : "#000000";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx!.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

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
      style={{ zIndex: 2 }}
    />
  );
}
