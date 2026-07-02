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
  { name: "OpenCode", icon: "code" },
  { name: "ChatGPT / Claude", icon: "chat" },
  { name: "Spec-Driven Development (SDD)", icon: "spec" },
  { name: "VS Code", icon: "vscode" },
];

function ToolIcon({ name }: { name: string }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#6E80FF",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "copilot":
      return (
        <svg {...props}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "spec":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "vscode":
      return (
        <svg {...props}>
          <polygon points="16 3 21 7 21 17 16 21 8 17 8 7 16 3" />
          <polygon points="16 3 16 21 8 17 8 7 16 3" />
          <line x1="8" y1="12" x2="16" y2="12" />
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
              {/* Orbiting rings */}
              <div
                className="absolute rounded-full border"
                style={{
                  width: "100%",
                  height: "100%",
                  borderColor: "rgba(110,128,255,0.15)",
                  animation: "slowRotate 20s linear infinite",
                }}
              />
              <div
                className="absolute rounded-full border"
                style={{
                  width: "80%",
                  height: "80%",
                  borderColor: "rgba(110,128,255,0.1)",
                  borderStyle: "dashed",
                  animation: "slowRotate 15s linear infinite reverse",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: "60%",
                  height: "60%",
                  background: "radial-gradient(circle at 50% 50%, rgba(78,125,255,0.2), transparent 70%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Brain shape - simplified SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-[60%] h-[60%] relative z-10"
                style={{ filter: "drop-shadow(0 0 15px rgba(78,125,255,0.3))" }}
              >
                <path
                  d="M50 10 C30 10 15 25 15 45 C15 55 20 63 28 68 C28 68 25 75 25 80 C25 85 30 90 35 88 C38 87 40 84 42 80 C44 84 46 88 50 90 C54 88 56 84 58 80 C60 84 62 87 65 88 C70 90 75 85 75 80 C75 75 72 68 72 68 C80 63 85 55 85 45 C85 25 70 10 50 10Z"
                  fill="rgba(78,125,255,0.15)"
                  stroke="rgba(110,128,255,0.4)"
                  strokeWidth="1"
                />
                {/* Neural lines */}
                <path d="M35 40 Q50 30 65 40" stroke="rgba(110,128,255,0.25)" strokeWidth="0.5" fill="none" />
                <path d="M30 50 Q50 45 70 50" stroke="rgba(110,128,255,0.2)" strokeWidth="0.5" fill="none" />
                <path d="M38 55 Q50 50 62 55" stroke="rgba(110,128,255,0.15)" strokeWidth="0.5" fill="none" />
                <circle cx="42" cy="38" r="2" fill="rgba(110,128,255,0.4)" />
                <circle cx="58" cy="38" r="2" fill="rgba(110,128,255,0.4)" />
                <circle cx="50" cy="45" r="1.5" fill="rgba(110,128,255,0.3)" />
                <circle cx="35" cy="48" r="1" fill="rgba(200,150,255,0.3)" />
                <circle cx="65" cy="48" r="1" fill="rgba(200,150,255,0.3)" />
              </svg>
              {/* Glow dots */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-[4px] h-[4px] rounded-full"
                  style={{
                    backgroundColor: "rgba(110,128,255,0.5)",
                    boxShadow: "0 0 6px rgba(110,128,255,0.6)",
                    transform: `rotate(${deg}deg) translateX(110px)`,
                    transformOrigin: "center",
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
