"use client";

export default function Footer() {
  return (
    <footer
      className="relative w-full py-8"
      style={{ backgroundColor: "#03030A", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-[1480px] mx-auto px-[40px] flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm" style={{ color: "#707B9A" }}>
          &copy; {new Date().getFullYear()} juan D.S. All rights reserved.
        </span>
        <span className="text-sm" style={{ color: "#707B9A" }}>
          Built with Next.js & Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
