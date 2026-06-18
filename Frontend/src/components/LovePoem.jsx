import { useEffect, useState, useRef } from "react";

const NUM_SPARKS = 18;
const sparks = Array.from({ length: NUM_SPARKS }, (_, i) => ({
  id: i,
  x: 44 + Math.random() * 12,
  startY: 6 + Math.random() * 6,
  dx: (Math.random() - 0.5) * 24,
  speed: 0.018 + Math.random() * 0.022,
  phase: Math.random() * Math.PI * 2,
  size: 1.5 + Math.random() * 1.5,
}));

const stanzas = [
  {
    lines: [
      "No matter where you go —",
      "no matter how far the road carries you —",
    ],
  },
  {
    lines: ["you will always have a place in my heart."],
    accent: true,
  },
  {
    lines: ["That is your home —", "a space carved gently within me."],
  },
  {
    lines: [
      "And I will leave the lights on,",
      "warm and waiting,",
      "for as long as you are away.",
    ],
    big: true,
    center: true,
  },
  {
    lines: [
      "You may wander the world,",
      "explore every horizon,",
      "chase every distant light —",
    ],
    center: true,
  },
  {
    lines: ["but there will always be", "a light burning for you here."],
    final: true,
    center: true,
  },
];

function Spark({ spark, tick }) {
  const t = tick / 1000;
  const cycleTime = 2.4 / spark.speed;
  const elapsed =
    (t * 1000 * spark.speed + spark.phase * cycleTime) % cycleTime;
  const progress = elapsed / cycleTime;
  const y = spark.startY - progress * 14;
  const x = spark.x + spark.dx * progress * 0.04;
  const alpha =
    progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: spark.size,
        height: spark.size,
        borderRadius: "50%",
        background: "rgba(255,190,70,0.9)",
        opacity: alpha * 0.75,
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }}
    />
  );
}

function Candle({ size = "md" }) {
  const isLg = size === "lg";
  const w = isLg ? 26 : 18;
  const h = isLg ? 44 : 32;

  if (isLg) {
    return (
      <svg width={w} height={h} viewBox="0 0 26 44" fill="none">
        <ellipse cx="13" cy="40" rx="7" ry="3" fill="rgba(140,80,20,0.4)" />
        <rect x="9" y="22" width="8" height="20" rx="3" fill="#8B5320" />
        <rect x="10" y="23" width="6" height="18" rx="2.5" fill="#A0622A" />
        <ellipse cx="13" cy="22.5" rx="3" ry="1.5" fill="#6B3A10" />
        <path
          d="M13 21 C11 14 8 11 11 6 C12 3 14 6 14 9 C15 5 17 3 16 0 C19 4 21 11 17 16 C19 13 21 17 18 20 C16 22 14 22.5 13 21Z"
          fill="rgba(255,155,25,0.92)"
          style={{
            animation: "wlFlicker2 2.1s ease-in-out infinite",
            transformOrigin: "13px 21px",
          }}
        />
        <path
          d="M13 20 C12 16 10.5 13 13 10 C14 8 15 11 15 14 C16 11 17 12 16 15 C15 18 14 20 13 20Z"
          fill="rgba(255,225,110,0.88)"
          style={{
            animation: "wlFlicker 1.6s ease-in-out 0.3s infinite",
            transformOrigin: "13px 20px",
          }}
        />
        <circle
          cx="13"
          cy="17"
          r="2"
          fill="rgba(255,240,180,0.7)"
          style={{
            animation: "wlFlicker 1.6s ease-in-out 0.3s infinite",
            transformOrigin: "13px 17px",
          }}
        />
      </svg>
    );
  }

  return (
    <svg width={w} height={h} viewBox="0 0 18 32" fill="none">
      <ellipse cx="9" cy="28.5" rx="5" ry="2.5" fill="rgba(140,80,20,0.4)" />
      <rect x="7" y="16" width="4" height="14" rx="2" fill="#8B5320" />
      <rect x="7.5" y="17" width="3" height="12" rx="1.5" fill="#A0622A" />
      <ellipse cx="9" cy="16.5" rx="1.5" ry="1" fill="#6B3A10" />
      <path
        d="M9 15 C8 11 6 9 8 6 C9 4 10 6 10 8 C11 6 12 4 11 2 C13 4 14 8 12 11 C13 9 14 11 12 13 C11 15 10 15.5 9 15Z"
        fill="rgba(255,160,30,0.9)"
        style={{
          animation: "wlFlicker 1.8s ease-in-out infinite",
          transformOrigin: "9px 15px",
        }}
      />
      <path
        d="M9 14 C8.5 12 7.5 10 9 8 C9.5 7 10 9 10 10 C10.5 8 11 9 10.5 11 C10 13 9.5 14 9 14Z"
        fill="rgba(255,220,100,0.85)"
        style={{
          animation: "wlFlicker 1.8s ease-in-out infinite",
          transformOrigin: "9px 14px",
        }}
      />
    </svg>
  );
}

export default function WarmLightPoem() {
  const [visibleStanzas, setVisibleStanzas] = useState([]);
  const [tick, setTick] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    stanzas.forEach((_, i) => {
      setTimeout(() => setVisibleStanzas((v) => [...v, i]), 400 + i * 850);
    });
  }, []);

  useEffect(() => {
    let frame;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600;1,700&family=EB+Garamond:ital,wght@1,400;1,500&display=swap');

        @keyframes wlFlicker {
          0%,100% { transform: scaleX(1) scaleY(1) rotate(-1deg); opacity: 0.9; }
          25%      { transform: scaleX(0.92) scaleY(1.04) rotate(1deg); opacity: 1; }
          50%      { transform: scaleX(1.04) scaleY(0.97) rotate(-0.5deg); opacity: 0.88; }
          75%      { transform: scaleX(0.96) scaleY(1.03) rotate(1.5deg); opacity: 0.95; }
        }

        @keyframes wlFlicker2 {
          0%,100% { transform: scaleX(1) scaleY(1) rotate(1deg); opacity: 0.8; }
          30%      { transform: scaleX(1.05) scaleY(0.95) rotate(-1deg); opacity: 0.95; }
          60%      { transform: scaleX(0.94) scaleY(1.06) rotate(0.5deg); opacity: 0.85; }
        }

        .wl-root {
          min-height: 100vh;
          background: #0e0a06;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }

        .wl-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .wl-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          box-sizing: border-box;
          padding: 2.4rem 2rem 2rem;
          background: rgba(20, 12, 4, 0.88);
          border: 0.5px solid rgba(200, 130, 50, 0.18);
          border-top: 2px solid rgba(210, 140, 55, 0.45);
          border-radius: 4px;
        }

        @media (max-width: 400px) {
          .wl-card { padding: 1.8rem 1.2rem 1.6rem; }
        }

        .wl-flame-row {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 18px;
          margin-bottom: 1.4rem;
        }

        .wl-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,130,50,0.35), rgba(230,165,80,0.6), rgba(200,130,50,0.35), transparent);
          margin-bottom: 1.8rem;
          position: relative;
        }

        .wl-rule::after {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(220,150,65,0.7);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .wl-stanzas {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        .wl-stanza {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 1.4s ease, transform 1.4s ease;
        }

        .wl-stanza.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .wl-stanza.center { text-align: center; }

        .wl-line {
          display: block;
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 3.5vw, 1.18rem);
          color: rgba(230, 185, 120, 0.78);
          line-height: 2;
          letter-spacing: 0.025em;
        }

        .wl-stanza.big .wl-line {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 5vw, 1.6rem);
          font-weight: 700;
          font-style: italic;
          color: rgba(245, 205, 140, 0.96);
          line-height: 1.65;
        }

        .wl-stanza.accent .wl-line {
          color: rgba(235, 165, 75, 0.9);
          font-weight: 500;
        }

        .wl-stanza.final .wl-line {
          color: #e8b96a;
          font-size: clamp(1.2rem, 5vw, 1.6rem);
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
        }

        .wl-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin: 0.15rem 0;
        }

        .wl-div-line {
          height: 1px;
          width: 36px;
          background: linear-gradient(90deg, transparent, rgba(200,130,50,0.35), transparent);
        }

        .wl-div-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(210,140,55,0.5);
        }

        .wl-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 0.5px solid rgba(180, 100, 30, 0.15);
        }

        .wl-footer-text {
          font-family: 'EB Garamond', serif;
          font-style: italic;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(190, 120, 45, 0.38);
        }
      `}</style>

      <div className="wl-root">
        {/* Sparks */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {sparks.map((s) => (
            <Spark key={s.id} spark={s} tick={tick} />
          ))}
        </div>

        {/* Glows */}
        <div
          className="wl-glow"
          style={{
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 380,
            height: 380,
            background:
              "radial-gradient(ellipse, rgba(220,140,50,0.09) 0%, rgba(180,90,20,0.05) 40%, transparent 72%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="wl-glow"
          style={{
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: 300,
            height: 200,
            background:
              "radial-gradient(ellipse, rgba(200,110,30,0.07) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        <div className="wl-card">
          {/* Candle header */}
          <div className="wl-flame-row">
            <Candle size="sm" />
            <Candle size="lg" />
            <Candle size="sm" />
          </div>

          <div className="wl-rule" />

          {/* Poem */}
          <div className="wl-stanzas">
            {stanzas.map((stanza, si) => (
              <div key={si}>
                {si === 3 && (
                  <div className="wl-divider">
                    <div className="wl-div-line" />
                    <div className="wl-div-dot" />
                    <div className="wl-div-line" />
                  </div>
                )}
                <div
                  className={[
                    "wl-stanza",
                    visibleStanzas.includes(si) ? "vis" : "",
                    stanza.center ? "center" : "",
                    stanza.big ? "big" : "",
                    stanza.accent ? "accent" : "",
                    stanza.final ? "final" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {stanza.lines.map((line, li) => (
                    <span key={li} className="wl-line">
                      {line}
                    </span>
                  ))}
                </div>
                {si === 4 && (
                  <div className="wl-divider" style={{ marginTop: "0.6rem" }}>
                    <div className="wl-div-line" />
                    <div className="wl-div-dot" />
                    <div className="wl-div-line" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
