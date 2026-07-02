"use client";

import { motion } from "framer-motion";

const projects = [
  {
    icon: "bank",
    title: "Card Management Platform",
    desc: "Enterprise platform for credit card management with integrations to Visa, Mastercard and Prisma.",
    tags: [".NET", "C#", "SQL Server", "REST API"],
  },
  {
    icon: "cloud",
    title: "Payment Gateway API",
    desc: "High-performance REST API for payment processing and transaction management with Fiserv integration.",
    tags: [".NET Core", "C#", "AWS", "Docker"],
  },
  {
    icon: "chart",
    title: "Data & Reporting Suite",
    desc: "Analytics and reporting solution for business intelligence with large volumes of data and complex queries.",
    tags: ["SQL Server", "C#", "JavaScript", "D3.js"],
  },
];

function ProjectIcon({ name }: { name: string }) {
  const props = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#67A0FF",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "bank":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full"
      style={{ backgroundColor: "#03030A", paddingBottom: 100 }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span
            className="text-[13px] font-semibold uppercase tracking-[2.5px]"
            style={{ color: "#8A5DFF" }}
          >
            FEATURED PROJECTS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group rounded-[24px] p-[34px] flex flex-col transition-all duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(18,20,38,0.68)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, rgba(80,120,255,0.18), rgba(190,70,255,0.12))",
                }}
              >
                <ProjectIcon name={project.icon} />
              </div>

              {/* Title */}
              <h3 className="text-[30px] font-bold text-white mt-[22px] leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[18px] leading-[1.7] mt-3" style={{ color: "#B8C0D8", width: "95%" }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[14px] px-[18px] inline-flex items-center justify-center"
                    style={{
                      height: 30,
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.04)",
                      color: "#CBD3EA",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="mt-5">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[17px] font-semibold no-underline transition-all duration-200 group/link"
                  style={{
                    background: "linear-gradient(90deg, #6E8FFF, #D758FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  View project
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D758FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover/link:translate-x-[5px]"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
