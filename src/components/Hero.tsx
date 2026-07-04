"use client";

import { motion } from "framer-motion";
import Stars from "./Stars";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: 930,
        background: [
          "linear-gradient(180deg, #03030A 0%, #050512 25%, #050511 100%)",
        ].join(", "),
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: "url(/juandelsoldato.github.io/firewatch.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Nebulas overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            background: [
              "radial-gradient(circle at 25% 15%, rgba(70,60,255,0.18), transparent 60%)",
              "radial-gradient(circle at 75% 10%, rgba(180,70,255,0.15), transparent 65%)",
              "radial-gradient(circle at 60% 35%, rgba(255,90,180,0.08), transparent 55%)",
            ].join(", "),
            filter: "blur(200px)",
          }}
        />
      </div>

      {/* Stars */}
      <div style={{ zIndex: 2, position: "relative" }}>
        <Stars />
      </div>

      {/* Content wrapper */}
      <div
        className="relative flex flex-col items-center w-full"
        style={{ zIndex: 10, marginTop: 84 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-[55px]"
        >
          <span
            className="text-[13px] font-medium uppercase tracking-[3px]"
            style={{ color: "#8E78FF" }}
          >
            &lt; SOFTWARE ENGINEER /&gt;
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center font-extrabold leading-[0.95] mx-auto px-4"
          style={{
            width: "100%",
            maxWidth: 760,
            fontSize: "clamp(42px, 4.4vw, 84px)",
            fontWeight: 800,
            background: "linear-gradient(90deg, #5D8FFF 0%, #7A62FF 30%, #A85EFF 65%, #FF6DA9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Providing the best
          <br />
          project experience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6 leading-relaxed max-w-[700px] px-4"
          style={{
            fontSize: "clamp(18px, 1.35vw, 26px)",
            fontWeight: 400,
            color: "#D5D8E5",
          }}
        >
          <span style={{ color: "#000000" }}>
            I build scalable, reliable and high-performance software solutions
            with modern technologies and{" "}
          </span>
          <span
            style={{
              background: "linear-gradient(90deg, #5D8FFF 0%, #7A62FF 30%, #A85EFF 65%, #FF6DA9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI-assisted development
          </span>
          .
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center gap-6 mt-10 flex-wrap"
        >
          {/* Primary button */}
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-[10px] rounded-full text-white font-medium no-underline transition-all duration-250 hover:scale-[1.03]"
            style={{
              height: 60,
              width: 210,
              background: "linear-gradient(180deg, #557EFF 0%, #7B5DFF 50%, #C44FFF 100%)",
              boxShadow: "0 0 35px rgba(120,90,255,0.50)",
              fontSize: 16,
            }}
          >
            View my work
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Secondary button */}
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full text-white font-medium no-underline transition-all duration-250 hover:bg-[rgba(255,255,255,0.05)]"
            style={{
              height: 60,
              width: 210,
              border: "1px solid rgba(255,255,255,0.20)",
              fontSize: 16,
            }}
          >
            Download CV
          </a>
        </motion.div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col items-center mt-24 mb-10"
        >
          <span
            className="text-[11px] uppercase tracking-[2px] mb-4"
            style={{ color: "#777C96" }}
          >
            SCROLL DOWN
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: 180,
          zIndex: 20,
          background: "linear-gradient(to bottom, transparent 0%, rgba(3,3,10,0.3) 30%, #03030A 70%)",
        }}
      />
    </section>
  );
}
