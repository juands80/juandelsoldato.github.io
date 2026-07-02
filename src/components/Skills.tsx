"use client";

import { motion } from "framer-motion";

const technologies = [
  "C#",
  ".NET",
  "ASP.NET MVC",
  "SQL Server",
  "JavaScript",
  "Entity Framework",
  "Git",
  "Azure",
  "TypeScript",
  "React",
  "Next.js",
  "Docker",
  "REST API",
  "AWS",
  "Redis",
  "MongoDB",
  "Node.js",
  "Python",
];

export default function Skills() {
  return (
    <section
      className="relative w-full pb-[90px]"
      style={{ backgroundColor: "#03030A" }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-[13px] font-semibold uppercase tracking-[2.5px]"
            style={{ color: "#8A5DFF" }}
          >
            TECHNOLOGIES & TOOLS
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex items-center gap-[18px] overflow-x-auto pb-2"
          style={{
            height: 88,
            backgroundColor: "rgba(17,18,35,0.65)",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "18px",
          }}
        >
          {technologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 px-[18px] whitespace-nowrap transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                height: 52,
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "#CBD3EA",
                fontSize: 14,
              }}
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
