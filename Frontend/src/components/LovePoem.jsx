import { useEffect, useState, useRef } from "react";

const NUM_PETALS = 38;
const petals = Array.from({ length: NUM_PETALS }, (_, i) => ({
  id: i,
  x: Math.random() * 110 - 5,
  startY: -10 - Math.random() * 40,
  size: 6 + Math.random() * 9,
  speed: 0.04 + Math.random() * 0.07,
  drift: (Math.random() - 0.5) * 2.2,
  swayAmp: 1.5 + Math.random() * 2.5,
  swayFreq: 0.6 + Math.random() * 0.8,
  phase: Math.random() * Math.PI * 2,
  rotSpeed: (Math.random() - 0.5) * 120,
  opacity: 0.55 + Math.random() * 0.45,
  color: ["#f9c6d0", "#f4a7b9", "#fce4ec", "#f8bbd0", "#f48fb1"][
    Math.floor(Math.random() * 5)
  ],
}));

const stanzas = [
  {
    lines: [
      "I have no reason to give up on you —",
      "not even when you show me",
      "the worst part of yourself.",
    ],
  },
  {
    lines: [
      "I'll still be here.",
      "No matter how hard things get,",
      "no matter how dark your mood falls —",
    ],
    accent: true,
  },
  {
    lines: ["I will still choose you.", "Every single time."],
    big: true,
    center: true,
  },
  {
    lines: ["I won't love anyone else.", "It has always been you."],
    center: true,
  },
  {
    lines: ["And it will always,", "always be you."],
    big: true,
    center: true,
    final: true,
  },
];

function Petal({ petal, tick }) {
  const t = tick / 1000;
  const cycleTime = 18 / petal.speed;
  const elapsed = (t + petal.phase * cycleTime) % cycleTime;
  const progress = elapsed / cycleTime;
  const y = petal.startY + progress * 130;
  const sway = Math.sin(t * petal.swayFreq + petal.phase) * petal.swayAmp * 8;
  const x = petal.x + sway;
  const rot = t * petal.rotSpeed;
  const fade =
    progress < 0.08
      ? progress / 0.08
      : progress > 0.85
        ? 1 - (progress - 0.85) / 0.15
        : 1;
  const alpha = petal.opacity * fade;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: petal.size,
        height: petal.size * 0.72,
        borderRadius: "50% 50% 50% 0",
        background: petal.color,
        opacity: alpha,
        transform: `translate(-50%,-50%) rotate(${rot}deg)`,
        pointerEvents: "none",
        boxShadow: `0 0 4px rgba(244,167,185,0.3)`,
      }}
    />
  );
}

export default function CherryBlossomPoem() {
  const [visibleStanzas, setVisibleStanzas] = useState([]);
  const [tick, setTick] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    stanzas.forEach((_, i) => {
      setTimeout(() => setVisibleStanzas((v) => [...v, i]), 300 + i * 900);
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,500;1,700&family=Lora:ital,wght@1,400;1,500;1,600&display=swap');

        .cb-root {
          min-height: 100vh;
          background: #1a0d12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.2rem;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }

        .cb-bg-top {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(180,60,100,0.14) 0%, rgba(140,30,70,0.07) 45%, transparent 72%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
        }

        .cb-bg-bottom {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(220,100,140,0.1) 0%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 0;
        }

        .cb-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 560px;
          box-sizing: border-box;
          padding: 3.2rem 3rem 2.6rem;
          background: rgba(30, 10, 18, 0.80);
          border: 0.5px solid rgba(230, 140, 170, 0.22);
          border-top: 2.5px solid rgba(230, 120, 160, 0.5);
          border-radius: 4px;
        }

        @media (max-width: 480px) {
          .cb-card { padding: 2.2rem 1.6rem 2rem; }
        }

        .cb-header {
          text-align: center;
          margin-bottom: 1.8rem;
        }

        .cb-blossom-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          margin-bottom: 1.4rem;
        }

        .cb-blossom-svg {
          animation: cb-sway 4s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(240,150,180,0.5));
        }

        .cb-blossom-svg:nth-child(2) {
          animation-delay: 0.6s;
          animation-duration: 3.4s;
          transform-origin: center;
        }

        .cb-blossom-svg:nth-child(3) {
          animation-delay: 1.1s;
          animation-duration: 4.5s;
        }

        @keyframes cb-sway {
          0%,100% { transform: rotate(-6deg) scale(1); }
          50%      { transform: rotate(6deg) scale(1.06); }
        }

        .cb-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,120,155,0.4), rgba(245,165,190,0.65), rgba(220,120,155,0.4), transparent);
          margin-bottom: 2.2rem;
          position: relative;
        }

        .cb-rule::after {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(235,145,175,0.75);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .cb-stanzas {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cb-stanza {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }

        .cb-stanza.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cb-stanza.center { text-align: center; }

        .cb-line {
          display: block;
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 3.5vw, 1.18rem);
          color: rgba(245, 200, 215, 0.80);
          line-height: 2;
          letter-spacing: 0.025em;
        }

        .cb-stanza.big .cb-line {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 5vw, 1.6rem);
          font-weight: 700;
          color: rgba(255, 215, 228, 0.96);
          line-height: 1.65;
          letter-spacing: 0.01em;
        }

        .cb-stanza.accent .cb-line {
          color: rgba(245, 165, 190, 0.88);
          font-weight: 500;
        }

        .cb-stanza.final .cb-line {
          color: #f9a8c2;
          text-shadow: 0 0 20px rgba(235, 100, 145, 0.38);
        }

        .cb-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin: 0.4rem 0;
        }

        .cb-div-line {
          height: 1px;
          width: 44px;
          background: linear-gradient(90deg, transparent, rgba(220,120,160,0.4), transparent);
        }

        .cb-div-petal {
          width: 7px;
          height: 5px;
          background: rgba(235,140,170,0.55);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-20deg);
        }

        .cb-footer {
          text-align: center;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 0.5px solid rgba(200, 100, 135, 0.15);
        }

        .cb-footer-text {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          color: rgba(210, 130, 160, 0.42);
        }
      `}</style>

      <div className="cb-root">
        {/* Falling petals */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {petals.map((p) => (
            <Petal key={p.id} petal={p} tick={tick} />
          ))}
        </div>

        {/* BG glows */}
        <div className="cb-bg-top" />
        <div className="cb-bg-bottom" />

        <div className="cb-card">
          {/* SVG blossom header */}
          <div className="cb-header">
            <div className="cb-blossom-row">
              {[0, 1, 2].map((idx) => (
                <svg
                  key={idx}
                  className="cb-blossom-svg"
                  width={idx === 1 ? 42 : 30}
                  height={idx === 1 ? 42 : 30}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {[0, 72, 144, 216, 288].map((angle, pi) => {
                    const rad = (angle * Math.PI) / 180;
                    const cx = 20 + Math.cos(rad) * 9;
                    const cy = 20 + Math.sin(rad) * 9;
                    return (
                      <ellipse
                        key={pi}
                        cx={cx}
                        cy={cy}
                        rx="6"
                        ry="4"
                        fill={idx === 1 ? "#f06292" : "#f48fb1"}
                        opacity={idx === 1 ? "0.88" : "0.72"}
                        transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
                      />
                    );
                  })}
                  <circle
                    cx="20"
                    cy="20"
                    r="4"
                    fill={idx === 1 ? "#fce4ec" : "#f8bbd0"}
                    opacity="0.95"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="2"
                    fill={idx === 1 ? "#f9a8c0" : "#f48fb1"}
                    opacity="0.8"
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="cb-rule" />

          {/* Poem */}
          <div className="cb-stanzas">
            {stanzas.map((stanza, si) => (
              <div key={si}>
                {si === 2 && (
                  <div className="cb-divider">
                    <div className="cb-div-line" />
                    <div className="cb-div-petal" />
                    <div className="cb-div-line" />
                  </div>
                )}
                <div
                  className={[
                    "cb-stanza",
                    visibleStanzas.includes(si) ? "visible" : "",
                    stanza.center ? "center" : "",
                    stanza.big ? "big" : "",
                    stanza.accent ? "accent" : "",
                    stanza.final ? "final" : "",
                  ].join(" ")}
                >
                  {stanza.lines.map((line, li) => (
                    <span key={li} className="cb-line">
                      {line}
                    </span>
                  ))}
                </div>
                {si === 3 && (
                  <div className="cb-divider" style={{ marginTop: "0.8rem" }}>
                    <div className="cb-div-line" />
                    <div className="cb-div-petal" />
                    <div className="cb-div-line" />
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
