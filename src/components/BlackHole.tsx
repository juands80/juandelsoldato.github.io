"use client";

export default function BlackHole() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: "70vw",
          maxWidth: 900,
          aspectRatio: "1.4 / 1",
        }}
      >
        {/* Outer glow layers */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          {/* Halo exterior - very soft pink */}
          <div
            className="absolute rounded-full"
            style={{
              width: "65%",
              paddingBottom: "65%",
              background: "radial-gradient(circle, rgba(243,184,255,0.06) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Secondary halo */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "50%",
              paddingBottom: "50%",
              boxShadow: "0 0 35px rgba(139,115,255,0.12)",
              filter: "blur(20px)",
              border: "20px solid rgba(139,115,255,0.08)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Event horizon glow */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 3 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "38%",
              paddingBottom: "38%",
              boxShadow: [
                "0 0 35px rgba(94,86,255,0.5)",
                "0 0 90px rgba(155,91,255,0.4)",
                "0 0 140px rgba(200,120,255,0.25)",
              ].join(", "),
            }}
          />
        </div>

        {/* Event horizon ring */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 4 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "36%",
              paddingBottom: "36%",
              border: "5px solid rgba(255,255,255,0.9)",
              boxShadow: "0 0 20px rgba(167,140,255,0.6), inset 0 0 20px rgba(167,140,255,0.3)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Core - absolute black */}
        <div
          className="absolute flex items-center justify-center"
          style={{ zIndex: 6 }}
        >
          <div
            className="rounded-full"
            style={{
              width: "clamp(200px, 34vw, 430px)",
              height: "clamp(200px, 34vw, 430px)",
              backgroundColor: "#000000",
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
            }}
          />
        </div>

        {/* Accretion disk - front layer */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 5 }}
        >
          {/* Outer band */}
          <svg
            viewBox="0 0 800 400"
            className="absolute"
            style={{
              width: "85%",
              top: "30%",
              filter: "blur(3px)",
            }}
          >
            <defs>
              <linearGradient id="accretionOuter" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6DA9" stopOpacity="0.15" />
                <stop offset="25%" stopColor="#D94FFF" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#7A62FF" stopOpacity="0.35" />
                <stop offset="75%" stopColor="#5D8FFF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FF6DA9" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="accretionMid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D94FFF" stopOpacity="0.3" />
                <stop offset="20%" stopColor="#7A62FF" stopOpacity="0.5" />
                <stop offset="45%" stopColor="#5D8FFF" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#865EFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D94FFF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="accretionInner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="15%" stopColor="#A78CFF" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#5D8FFF" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#865EFF" stopOpacity="0.7" />
                <stop offset="85%" stopColor="#D94FFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
              <filter id="turbulence">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" />
                <feDisplacementMap in="SourceGraphic" scale="12" />
              </filter>
              <filter id="motionBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4 0" />
              </filter>
            </defs>

            {/* Outer band */}
            <ellipse
              cx="400"
              cy="200"
              rx="380"
              ry="95"
              fill="none"
              stroke="url(#accretionOuter)"
              strokeWidth="28"
              filter="url(#turbulence)"
              opacity="0.7"
            />
            {/* Mid band */}
            <ellipse
              cx="400"
              cy="200"
              rx="340"
              ry="85"
              fill="none"
              stroke="url(#accretionMid)"
              strokeWidth="22"
              filter="url(#motionBlur)"
              opacity="0.85"
            />
            {/* Inner band */}
            <ellipse
              cx="400"
              cy="200"
              rx="300"
              ry="72"
              fill="none"
              stroke="url(#accretionInner)"
              strokeWidth="18"
              filter="url(#motionBlur)"
              opacity="0.9"
            />

            {/* Bright core ring */}
            <ellipse
              cx="400"
              cy="200"
              rx="270"
              ry="63"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="6"
              filter="url(#motionBlur)"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Gas filaments / jets */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 4 }}
        >
          {/* Left jet */}
          <svg
            viewBox="0 0 1000 400"
            className="absolute"
            style={{
              width: "120%",
              top: "28%",
              filter: "blur(6px)",
              opacity: 0.3,
            }}
          >
            <defs>
              <linearGradient id="jetLeft" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#5D8FFF" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#865EFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D94FFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="jetRight" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#5D8FFF" stopOpacity="0.15" />
                <stop offset="40%" stopColor="#865EFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#D94FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Left filament */}
            <path
              d="M 500 200 Q 350 160 200 180 Q 100 195 30 170"
              fill="none"
              stroke="url(#jetLeft)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 500 200 Q 380 220 250 200 Q 150 185 50 210"
              fill="none"
              stroke="url(#jetLeft)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Right filament */}
            <path
              d="M 500 200 Q 650 180 800 195 Q 900 205 970 190"
              fill="none"
              stroke="url(#jetRight)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Accretion disk overlay - bottom half blocking the core */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 7 }}
        >
          <div
            className="absolute"
            style={{
              width: "38%",
              paddingBottom: "10%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(4,4,11,0.3) 30%, rgba(4,4,11,0.8) 100%)",
              bottom: "28%",
              borderRadius: "50%",
              filter: "blur(8px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
