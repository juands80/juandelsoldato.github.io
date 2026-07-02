"use client";

import { motion } from "framer-motion";

const stats = [
  {
    icon: "calendar",
    number: "15+",
    text: "Years of\nExperience",
  },
  {
    icon: "code",
    number: "100+",
    text: "Projects\nDelivered",
  },
  {
    icon: "rocket",
    number: "Enterprise",
    text: "Enterprise\nSolutions",
  },
  {
    icon: "people",
    number: "Satisfied",
    text: "Satisfied\nClients",
  },
];

const valueList = [
  {
    icon: "cube",
    title: "Clean Architecture",
    desc: "Scalable, maintainable and testable code.",
  },
  {
    icon: "shield",
    title: "Performance & Reliability",
    desc: "High-performance systems you can count on.",
  },
  {
    icon: "link",
    title: "Integration Expertise",
    desc: "Visa, Mastercard, Prisma, Fiserv",
  },
  {
    icon: "brain",
    title: "AI-Augmented Developer",
    desc: "Using AI tools to accelerate development without compromising quality.",
  },
];

function StatIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#6E7DFF",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "people":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

function ValueIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#6E80FF",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "cube":
      return (
        <svg {...props}>
          <polyline points="21 16 12 21 3 16 3 8 12 3 21 8 21 12" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="3" y1="8" x2="12" y2="12" />
          <line x1="21" y1="8" x2="12" y2="12" />
          <line x1="3" y1="16" x2="3" y2="8" />
          <line x1="21" y1="16" x2="21" y2="8" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "link":
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2C8 2 4 4 4 8c0 2.5 1.5 4.5 3 5.5V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-6.5c1.5-1 3-3 3-5.5 0-4-4-6-8-6z" />
          <path d="M12 2v20" />
          <path d="M16 8c-1.5 1.5-3 2-4 2s-2.5-.5-4-2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full"
      style={{ backgroundColor: "#03030A", paddingTop: 60, paddingBottom: 80 }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px]">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span
            className="text-[13px] font-semibold uppercase tracking-[2.5px]"
            style={{ color: "#8A5DFF" }}
          >
            // ABOUT ME
          </span>
        </motion.div>

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row gap-[70px]">
          {/* Left column */}
          <div className="flex-1">
            {/* Avatar + Name row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 mb-8"
            >
              {/* Avatar */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: 180,
                  height: 180,
                  background: "#0A0A16",
                  border: "3px solid transparent",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  backgroundImage:
                    "linear-gradient(#0A0A16, #0A0A16), linear-gradient(90deg, #4F8CFF, #965EFF, #D650FF)",
                  boxShadow: "0 0 40px rgba(120,90,255,0.40)",
                }}
              >
                <span
                  className="text-[72px] font-bold select-none"
                  style={{ color: "#F2F4FF" }}
                >
                  jD
                </span>
              </div>

              {/* Name */}
              <div>
                <p className="text-2xl font-medium text-white">Hi, I&apos;m</p>
                <h2
                  className="text-[54px] font-bold leading-tight"
                  style={{
                    background: "linear-gradient(90deg, #5B8CFF, #D750FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  juan D.S.
                </h2>
                <p className="text-[54px] font-bold leading-tight text-white" style={{ marginTop: -4 }}>
                  Senior Full-Stack .NET Developer
                </p>
              </div>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[21px] leading-[1.7] max-w-[580px] mb-12"
              style={{ color: "#B7BED6" }}
            >
              With more than 15 years of experience, I help organizations
              design, build and deliver robust software systems that
              solve real business problems.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <div key={stat.icon} className="flex flex-col items-start gap-2">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 54,
                      height: 54,
                      backgroundColor: "rgba(90,70,255,0.10)",
                      border: "1px solid rgba(110,90,255,0.20)",
                    }}
                  >
                    <StatIcon name={stat.icon} />
                  </div>
                  <span className="text-[38px] font-bold text-white leading-none mt-2">{stat.number}</span>
                  <span
                    className="text-[16px] leading-tight whitespace-pre-line"
                    style={{ color: "#AEB6D2" }}
                  >
                    {stat.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0"
            style={{
              width: "100%",
              maxWidth: 540,
            }}
          >
            <div
              className="rounded-[24px] p-[42px]"
              style={{
                backgroundColor: "rgba(16,17,32,0.70)",
                backdropFilter: "blur(25px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
            >
              <span
                className="text-[13px] font-semibold uppercase tracking-[2px]"
                style={{ color: "#8E73FF" }}
              >
                FOCUSED ON DELIVERING VALUE
              </span>

              <div className="flex flex-col gap-[34px] mt-8">
                {valueList.map((item) => (
                  <div key={item.icon} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: 40, height: 40, marginTop: 2 }}
                    >
                      <ValueIcon name={item.icon} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-base">{item.title}</p>
                      <p className="text-base leading-relaxed" style={{ color: "#AEB5CF" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
