"use client";

import { motion } from "framer-motion";

const bullets = [
  "Requirements analysis & clarification",
  "Architecture & technical design",
  "Code generation & refactoring",
  "Automated testing & quality",
  "Documentation & knowledge",
  "Human review in every step",
];

const tools = [
  { name: "GitHub Copilot", icon: "copilot" },
  { name: "OpenCode", icon: "opencode" },
  { name: "ChatGPT / Claude", icon: "ai-chat" },
  { name: "Spec-Driven Development (SDD)", icon: "spec" },
  { name: "VS Code", icon: "vscode" },
];

function ToolIcon({ name }: { name: string }) {
  const base = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24" as const,
  };

  switch (name) {
    case "copilot":
      return (
        <svg {...base} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            fill="#6E80FF"
            opacity="0.2"
          />
          <path
            d="M12 6l-4 2v4c0 2.2 1.8 4 4 4s4-1.8 4-4V8l-4-2z"
            stroke="#6E80FF"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M9 11l2 2 4-4" stroke="#6E80FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="5" r="2" fill="#D94FFF" opacity="0.8" />
          <line x1="18" y1="6" x2="16" y2="8" stroke="#6E80FF" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "opencode":
      return (
        <svg {...base} viewBox="0 0 24 24" fill="none">
          <polygon points="12 2 20 8 20 16 12 22 4 16 4 8" stroke="#6E80FF" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <polygon points="12 6 16 8.5 16 13.5 12 16 8 13.5 8 8.5" stroke="#6E80FF" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="1.5" fill="#6E80FF" opacity="0.6" />
        </svg>
      );
    case "ai-chat":
      return (
        <svg {...base} viewBox="0 0 24 24" fill="none">
          {/* ChatGPT sparkle */}
          <path
            d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"
            fill="#6E80FF"
            opacity="0.5"
          />
          {/* Claude triangle */}
          <path
            d="M16 17l-4 4-4-4"
            stroke="#6E80FF"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <line x1="12" y1="13" x2="12" y2="21" stroke="#6E80FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <circle cx="12" cy="15" r="1" fill="#6E80FF" opacity="0.4" />
        </svg>
      );
    case "spec":
      return (
        <svg {...base} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="#6E80FF" strokeWidth="1.5" fill="none" />
          <line x1="8" y1="8" x2="16" y2="8" stroke="#6E80FF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="#6E80FF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="16" x2="12" y2="16" stroke="#6E80FF" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="14" width="4" height="4" rx="0.5" stroke="#6E80FF" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      );
    case "vscode":
      return (
        <svg {...base} viewBox="0 0 24 24" fill="none">
          <path
            d="M17.5 2.5L8.5 10L3 7L1.5 8.5V15.5L3 17L8.5 14L17.5 21.5L22.5 18V6L17.5 2.5Z"
            stroke="#6E80FF"
            strokeWidth="1.3"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 2.5V21.5L8.5 14L3 17L1.5 15.5V8.5L3 7L8.5 10L17.5 2.5Z"
            stroke="#6E80FF"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Workflow() {
  return (
    <section
      id="ai-tools"
      className="relative w-full"
      style={{ backgroundColor: "#03030A", paddingBottom: 110 }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[26px] p-[38px] flex flex-col lg:flex-row items-start gap-10"
          style={{
            backgroundColor: "rgba(18,20,38,0.70)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Holographic brain */}
          <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-[280px] h-[280px]">
            <div className="relative flex items-center justify-center w-[240px] h-[240px]">
              {/* Platform glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "90%",
                  height: "20%",
                  bottom: "5%",
                  background: "radial-gradient(ellipse, rgba(78,125,255,0.15), transparent 70%)",
                  filter: "blur(10px)",
                }}
              />

              {/* Vertical light beam */}
              <div
                className="absolute"
                style={{
                  width: "2px",
                  height: "60%",
                  bottom: "10%",
                  background: "linear-gradient(to top, rgba(78,125,255,0.3), transparent)",
                  filter: "blur(2px)",
                }}
              />

              {/* Concentric orbit rings */}
              <div
                className="absolute rounded-full border"
                style={{
                  width: "100%",
                  height: "100%",
                  borderColor: "rgba(110,128,255,0.12)",
                  animation: "slowRotate 25s linear infinite",
                }}
              />
              <div
                className="absolute rounded-full border"
                style={{
                  width: "85%",
                  height: "85%",
                  borderColor: "rgba(110,128,255,0.08)",
                  borderStyle: "dashed",
                  animation: "slowRotate 18s linear infinite reverse",
                }}
              />
              <div
                className="absolute rounded-full border"
                style={{
                  width: "70%",
                  height: "70%",
                  borderColor: "rgba(110,128,255,0.06)",
                  animation: "slowRotate 22s linear infinite",
                  transform: "rotateX(60deg)",
                }}
              />

              {/* Brain glow aura */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "55%",
                  height: "55%",
                  background: "radial-gradient(circle, rgba(78,125,255,0.15), transparent 70%)",
                  filter: "blur(15px)",
                  animation: "float 4s ease-in-out infinite",
                }}
              />

              {/* Neural brain SVG */}
              <svg
                viewBox="0 0 120 120"
                className="w-[55%] h-[55%] relative z-10"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(78,125,255,0.3))",
                  animation: "float 4s ease-in-out infinite",
                }}
              >
                {/* Brain hemispheres */}
                <path
                  d="M60 15 C40 15 25 28 25 48 C25 58 30 66 36 70 L33 82 C33 88 38 92 42 90 C46 88 48 84 50 80 C52 85 55 89 60 92 C65 89 68 85 70 80 C72 84 74 88 78 90 C82 92 87 88 87 82 L84 70 C90 66 95 58 95 48 C95 28 80 15 60 15Z"
                  fill="rgba(78,125,255,0.12)"
                  stroke="rgba(110,128,255,0.35)"
                  strokeWidth="0.8"
                />
                {/* Central fissure */}
                <path
                  d="M60 18 L60 90"
                  stroke="rgba(110,128,255,0.2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                {/* Neural connections - left hemisphere */}
                <path d="M38 38 Q50 32 58 40" stroke="rgba(110,128,255,0.25)" strokeWidth="0.6" fill="none" />
                <path d="M35 48 Q48 42 58 50" stroke="rgba(110,128,255,0.2)" strokeWidth="0.5" fill="none" />
                <path d="M36 58 Q48 54 58 60" stroke="rgba(110,128,255,0.15" strokeWidth="0.5" fill="none" />
                <path d="M40 68 Q50 64 58 70" stroke="rgba(110,128,255,0.12)" strokeWidth="0.4" fill="none" />
                <path d="M42 30 Q50 28 56 34" stroke="rgba(110,128,255,0.15)" strokeWidth="0.4" fill="none" />
                {/* Neural connections - right hemisphere */}
                <path d="M82 38 Q70 32 62 40" stroke="rgba(110,128,255,0.25)" strokeWidth="0.6" fill="none" />
                <path d="M85 48 Q72 42 62 50" stroke="rgba(110,128,255,0.2)" strokeWidth="0.5" fill="none" />
                <path d="M84 58 Q72 54 62 60" stroke="rgba(110,128,255,0.15)" strokeWidth="0.5" fill="none" />
                <path d="M80 68 Q70 64 62 70" stroke="rgba(110,128,255,0.12)" strokeWidth="0.4" fill="none" />
                <path d="M78 30 Q70 28 64 34" stroke="rgba(110,128,255,0.15)" strokeWidth="0.4" fill="none" />
                {/* Cross connections */}
                <path d="M42 42 Q60 38 78 42" stroke="rgba(110,128,255,0.1)" strokeWidth="0.4" fill="none" strokeDasharray="2 3" />
                <path d="M40 56 Q60 52 80 56" stroke="rgba(110,128,255,0.08)" strokeWidth="0.4" fill="none" strokeDasharray="2 3" />
                {/* Neural nodes */}
                <circle cx="44" cy="36" r="2.5" fill="rgba(110,128,255,0.5)" />
                <circle cx="76" cy="36" r="2.5" fill="rgba(110,128,255,0.5)" />
                <circle cx="50" cy="46" r="1.8" fill="rgba(110,128,255,0.4)" />
                <circle cx="70" cy="46" r="1.8" fill="rgba(110,128,255,0.4)" />
                <circle cx="38" cy="54" r="1.5" fill="rgba(200,150,255,0.3)" />
                <circle cx="82" cy="54" r="1.5" fill="rgba(200,150,255,0.3)" />
                <circle cx="55" cy="60" r="1.2" fill="rgba(110,128,255,0.3)" />
                <circle cx="65" cy="60" r="1.2" fill="rgba(110,128,255,0.3)" />
                <circle cx="46" cy="66" r="1" fill="rgba(200,150,255,0.25)" />
                <circle cx="74" cy="66" r="1" fill="rgba(200,150,255,0.25)" />
                {/* Active node highlights */}
                <circle cx="44" cy="36" r="1" fill="rgba(150,180,255,0.6)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="76" cy="36" r="1" fill="rgba(150,180,255,0.6)">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="50" r="1.2" fill="rgba(150,180,255,0.5)">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Orbiting particles */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div
                  key={deg}
                  className="absolute w-[3px] h-[3px] rounded-full"
                  style={{
                    backgroundColor: "rgba(110,128,255,0.6)",
                    boxShadow: "0 0 6px rgba(110,128,255,0.5)",
                    transform: `rotate(${deg}deg) translateX(${108 + i % 2 * 8}px)`,
                    transformOrigin: "center",
                    animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              {/* Floating particles */}
              {[
                { x: 20, y: 30, s: 2, d: 2.3, t: 0 },
                { x: 210, y: 40, s: 1.5, d: 3.1, t: 0.7 },
                { x: 30, y: 180, s: 2.5, d: 2.8, t: 1.2 },
                { x: 200, y: 170, s: 1.8, d: 3.5, t: 0.4 },
                { x: 150, y: 10, s: 1.2, d: 4.0, t: 1.8 },
                { x: 60, y: 210, s: 2, d: 2.5, t: 2.1 },
              ].map((p, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: p.s * 2,
                    height: p.s * 2,
                    left: p.x,
                    top: p.y,
                    backgroundColor: "rgba(110,128,255,0.4)",
                    boxShadow: "0 0 8px rgba(110,128,255,0.3)",
                    animation: `float ${p.d}s ease-in-out infinite`,
                    animationDelay: `${p.t}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1">
            <h3
              className="text-[44px] font-bold leading-tight text-white mb-6"
              style={{ fontSize: "clamp(28px, 2.3vw, 44px)" }}
            >
              I leverage AI to enhance every stage
              <br />
              of the software development lifecycle.
            </h3>

            <div className="flex flex-col gap-3 mb-8">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 text-lg" style={{ color: "#B9C0D8" }}>
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(93,134,255,0.2)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5D86FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="flex-shrink-0 w-full lg:w-[220px]">
            <span
              className="text-[13px] font-semibold uppercase tracking-[2px]"
              style={{ color: "#8C76FF" }}
            >
              TOOLS I USE DAILY
            </span>
            <div className="flex flex-col gap-[20px] mt-6">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 28, height: 28 }}>
                    <ToolIcon name={tool.icon} />
                  </div>
                  <span className="text-sm" style={{ color: "#CBD3EA" }}>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
