"use client";

export default function Planets() {
  return (
    <>
      {/* Left planet - magenta */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 130,
          height: 130,
          left: "20%",
          top: "38%",
          zIndex: 2,
          background: "radial-gradient(circle at 35% 35%, #B35CFF, #8A2FFF 60%, #5A1FCC)",
          boxShadow: "0 0 60px rgba(220,80,255,0.45), inset 0 0 30px rgba(255,255,255,0.1)",
          border: "1px solid rgba(215,109,255,0.3)",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      {/* Superior left planet - small */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 40,
          height: 40,
          left: "12%",
          top: "18%",
          zIndex: 2,
          background: "radial-gradient(circle at 35% 35%, #7B5EFF, #5A43FF 60%, #3A2BCC)",
          boxShadow: "0 0 30px rgba(90,67,255,0.3)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      {/* Right planet - blue gas giant */}
      <div
        className="absolute rounded-full pointer-events-none overflow-hidden"
        style={{
          width: 180,
          height: 180,
          right: "8%",
          top: "22%",
          zIndex: 2,
          background: "radial-gradient(circle at 40% 30%, #6B9FFF, #3358FF 50%, #1A2FCC)",
          boxShadow: "0 0 80px rgba(51,88,255,0.35)",
          animation: "float 7s ease-in-out infinite",
        }}
      >
        {/* Gas bands */}
        <div
          className="absolute w-full h-[8px] top-[25%] opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            transform: "rotate(-5deg)",
          }}
        />
        <div
          className="absolute w-full h-[6px] top-[45%] opacity-15"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "rotate(3deg)",
          }}
        />
        <div
          className="absolute w-full h-[7px] top-[62%] opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            transform: "rotate(-2deg)",
          }}
        />
      </div>

      {/* Inferior right planet - very dark */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 90,
          height: 90,
          right: "15%",
          bottom: "10%",
          zIndex: 1,
          background: "radial-gradient(circle at 30% 30%, #2A2A50, #0A0A20)",
          boxShadow: "0 0 40px rgba(50,40,100,0.15)",
          opacity: 0.4,
        }}
      />
    </>
  );
}
