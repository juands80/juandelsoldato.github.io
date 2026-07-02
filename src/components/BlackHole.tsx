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
        {/* Outer glow layers - z:1 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
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

        {/* Secondary halo - z:2 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
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

        {/* BACK accretion disk (behind black hole) - z:3 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <svg
            viewBox="0 0 800 400"
            className="absolute"
            style={{
              width: "85%",
              top: "28%",
              filter: "blur(2px)",
              animation: "slowRotate 240s linear infinite",
            }}
          >
            <defs>
              <linearGradient id="diskBackOuter" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6DA9" stopOpacity="0.08" />
                <stop offset="25%" stopColor="#D94FFF" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#7A62FF" stopOpacity="0.18" />
                <stop offset="75%" stopColor="#5D8FFF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FF6DA9" stopOpacity="0.06" />
              </linearGradient>
              <filter id="turbSlow">
                <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="18" />
              </filter>
            </defs>
            <ellipse
              cx="400"
              cy="200"
              rx="380"
              ry="110"
              fill="none"
              stroke="url(#diskBackOuter)"
              strokeWidth="30"
              filter="url(#turbSlow)"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Event horizon outer glow - z:4 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 4 }}
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

        {/* Bright event horizon ring - z:5 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "36%",
              paddingBottom: "36%",
              border: "3px solid rgba(255,255,255,0.95)",
              boxShadow: [
                "0 0 8px rgba(255,255,255,0.8)",
                "0 0 25px rgba(167,140,255,0.7)",
                "0 0 50px rgba(167,140,255,0.3)",
                "inset 0 0 15px rgba(167,140,255,0.4)",
              ].join(", "),
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Core - absolute black #000000 - z:6 */}
        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ zIndex: 6 }}
        >
          <div
            className="rounded-full"
            style={{
              width: "clamp(200px, 34vw, 430px)",
              height: "clamp(200px, 34vw, 430px)",
              backgroundColor: "#000000",
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.9)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
            }}
          />
        </div>

        {/* FRONT accretion disk (passes IN FRONT of black hole) - z:7 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 7 }}
        >
          {/* Disk container with slow rotation */}
          <div
            className="absolute"
            style={{
              width: "85%",
              top: "24%",
              animation: "slowRotate 240s linear infinite",
            }}
          >
            <svg
              viewBox="0 0 800 400"
              className="w-full"
              style={{ filter: "blur(1px)" }}
            >
              <defs>
                <linearGradient id="bandOuter" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6DA9" stopOpacity="0.2" />
                  <stop offset="20%" stopColor="#D94FFF" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="#865EFF" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#5D8FFF" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#865EFF" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#D94FFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF6DA9" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="bandMid" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D94FFF" stopOpacity="0.25" />
                  <stop offset="15%" stopColor="#A85EFF" stopOpacity="0.45" />
                  <stop offset="35%" stopColor="#7A62FF" stopOpacity="0.65" />
                  <stop offset="50%" stopColor="#5D8FFF" stopOpacity="0.75" />
                  <stop offset="65%" stopColor="#7A62FF" stopOpacity="0.65" />
                  <stop offset="80%" stopColor="#A85EFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D94FFF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="bandInner" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A78CFF" stopOpacity="0.15" />
                  <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#5D8FFF" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#7A62FF" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#5D8FFF" stopOpacity="0.7" />
                  <stop offset="85%" stopColor="#A78CFF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D94FFF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="bandCore" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="40%" stopColor="#A78CFF" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#5D8FFF" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#7A62FF" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#D94FFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <filter id="turbOuter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="7" />
                  <feDisplacementMap in="SourceGraphic" scale="14" />
                </filter>
                <filter id="turbMid">
                  <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="12" />
                  <feDisplacementMap in="SourceGraphic" scale="10" />
                </filter>
                <filter id="turbInner">
                  <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="4" />
                  <feDisplacementMap in="SourceGraphic" scale="8" />
                </filter>
                <filter id="motionBlurH">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5 1" />
                </filter>
                <filter id="motionBlurV">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1 3" />
                </filter>
              </defs>

              {/* Outer turbulent band - slowest */}
              <ellipse
                cx="400"
                cy="200"
                rx="380"
                ry="95"
                fill="none"
                stroke="url(#bandOuter)"
                strokeWidth="26"
                filter="url(#turbOuter)"
                opacity="0.65"
              />
              {/* Mid-outer band */}
              <ellipse
                cx="400"
                cy="200"
                rx="350"
                ry="86"
                fill="none"
                stroke="url(#bandMid)"
                strokeWidth="20"
                filter="url(#turbMid)"
                opacity="0.75"
              />
              {/* Inner band - brightest, most turbulent */}
              <ellipse
                cx="400"
                cy="200"
                rx="310"
                ry="74"
                fill="none"
                stroke="url(#bandInner)"
                strokeWidth="16"
                filter="url(#turbInner)"
                opacity="0.85"
              />
              {/* Core plasma ring - hottest */}
              <ellipse
                cx="400"
                cy="200"
                rx="275"
                ry="64"
                fill="none"
                stroke="url(#bandCore)"
                strokeWidth="10"
                filter="url(#motionBlurH)"
                opacity="0.7"
              />
              {/* Bright inner edge */}
              <ellipse
                cx="400"
                cy="200"
                rx="260"
                ry="59"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="4"
                filter="url(#motionBlurV)"
                opacity="0.5"
              />

              {/* Turbulence streaks - density variations */}
              {[0.3, 0.5, 0.7, 0.9].map((offset, i) => (
                <ellipse
                  key={`streak-${i}`}
                  cx="400"
                  cy="200"
                  rx={380 - i * 40}
                  ry={95 - i * 8}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={2 + i * 0.5}
                  strokeDasharray={`${8 + i * 4} ${12 + i * 6}`}
                  opacity={0.3 - i * 0.05}
                  filter="url(#motionBlurH)"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Accretion disk overlay - bottom half blocking core - z:8 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 8 }}
        >
          <div
            className="absolute"
            style={{
              width: "38%",
              paddingBottom: "10%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(4,4,11,0.2) 20%, rgba(4,4,11,0.7) 50%, rgba(4,4,11,0.95) 100%)",
              bottom: "26%",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
        </div>

        {/* Gas filaments / jets - z:4 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 4 }}
        >
          <svg
            viewBox="0 0 1000 400"
            className="absolute"
            style={{
              width: "120%",
              top: "26%",
              filter: "blur(5px)",
              opacity: 0.25,
            }}
          >
            <defs>
              <linearGradient id="jetLeft" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#5D8FFF" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#865EFF" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#D94FFF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FF6DA9" stopOpacity="0" />
              </linearGradient>
              <filter id="filamentWobble">
                <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="9" />
                <feDisplacementMap in="SourceGraphic" scale="25" />
              </filter>
            </defs>

            {/* Left filaments - major jets */}
            <path
              d="M 550 200 Q 400 150 250 170 Q 150 185 60 160 Q 20 150 10 140"
              fill="none"
              stroke="url(#jetLeft)"
              strokeWidth="16"
              strokeLinecap="round"
              filter="url(#filamentWobble)"
            />
            <path
              d="M 520 210 Q 380 230 220 210 Q 130 195 50 220 Q 20 230 5 225"
              fill="none"
              stroke="url(#jetLeft)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#filamentWobble)"
              opacity="0.6"
            />
            <path
              d="M 540 195 Q 420 170 280 190 Q 180 205 80 180 Q 30 170 0 165"
              fill="none"
              stroke="url(#jetLeft)"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Right filaments - fainter */}
            <path
              d="M 500 200 Q 650 185 780 200 Q 880 210 950 195"
              fill="none"
              stroke="#5D8FFF"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.12"
            />
            <path
              d="M 510 205 Q 630 220 760 205 Q 860 195 940 210"
              fill="none"
              stroke="#865EFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.08"
            />

            {/* Small density ripples */}
            <path
              d="M 520 190 Q 460 185 400 195 Q 340 205 280 195"
              fill="none"
              stroke="rgba(167,140,255,0.15)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
