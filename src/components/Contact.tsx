"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", icon: "github", href: "#" },
  { name: "LinkedIn", icon: "linkedin", href: "#" },
  { name: "Email", icon: "email", href: "#" },
];

function SocialIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgba(255,255,255,0.7)",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "github":
      return (
        <svg {...props}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "email":
      return (
        <svg {...props}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full"
      style={{ backgroundColor: "#03030A", paddingBottom: 60 }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[22px] p-8 flex items-center justify-between gap-6 flex-wrap"
          style={{
            height: 120,
            backgroundColor: "rgba(18,20,38,0.65)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Icon */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "linear-gradient(180deg, #5A82FF, #C74EFF)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-[32px] font-bold text-white leading-tight">
              Let&apos;s build something amazing together
            </h3>
            <p className="text-base" style={{ color: "#B9C0D8" }}>
              I&apos;m always open to discussing new opportunities and challenging projects.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_0_20px_rgba(90,130,255,0.3)]"
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                aria-label={link.name}
              >
                <SocialIcon name={link.icon} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
