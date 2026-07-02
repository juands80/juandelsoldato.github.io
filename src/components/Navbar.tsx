"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  "About",
  "Experience",
  "Skills",
  "AI & Tools",
  "Projects",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-[18px]"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(5,5,20,0.35)" }
          : undefined
      }
    >
      <div className="max-w-[1480px] mx-auto px-[48px] h-[84px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 no-underline">
          <span className="text-[31px] font-semibold tracking-tight">
            <span style={{ color: "#9A63FF" }}>/&gt; </span>
            <span style={{ color: "#FFFFFF" }}>juan</span>{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #5B8CFF, #D94FFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              D.S.
            </span>
            <span style={{ color: "#9A63FF" }}> /&gt;</span>
          </span>
        </a>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              className="text-[15px] font-medium no-underline transition-all duration-200 hover:bg-gradient-to-r hover:from-[#5A8EFF] hover:to-[#D94FFF] hover:bg-clip-text hover:text-transparent"
              style={{ color: "#E5E7F5" }}
            >
              {item}
            </a>
          ))}
          {/* Theme button */}
          <div
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: 46,
              height: 46,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
            }}
          >
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
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-[2px] rounded transition-all duration-300"
            style={{ backgroundColor: "#E5E7F5", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}
          />
          <span
            className="block w-6 h-[2px] rounded transition-all duration-300"
            style={{ backgroundColor: "#E5E7F5", opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] rounded transition-all duration-300"
            style={{ backgroundColor: "#E5E7F5", transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
            style={{
              backgroundColor: "rgba(5,5,20,0.95)",
              backdropFilter: "blur(18px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col px-[48px] py-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                  className="text-[15px] font-medium no-underline py-2 transition-colors hover:text-[#5A8EFF]"
                  style={{ color: "#E5E7F5" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
