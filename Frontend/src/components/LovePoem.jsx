import { useEffect, useState, useRef } from "react";

const stars = Array.from({ length: 160 }, () => ({
  id: Math.random(),
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() < 0.3 ? 1.2 : 0.65,
  alpha: 0.2 + Math.random() * 0.6,
  speed: 0.003 + Math.random() * 0.008,
  phase: Math.random() * Math.PI * 2,
}));

const stanzas = [
  {
    lines: [
      { parts: ["Let me tell you how in a"], hl: [] },
      { parts: ["sky crowded with stars,"], hl: [] },
      { parts: ["you remain ", "the only moon", " I see."], hl: [1] },
    ],
  },
  {
    lines: [
      {
        parts: ["How among ", "billions of faces", " in this world,"],
        hl: [1],
      },
      { parts: ["it is only ", "your eyes"], hl: [1] },
      { parts: ["I ever search for."], hl: [] },
    ],
  },
  {
    lines: [
      { parts: ["Let me tell you how"], hl: [] },
      { parts: ["you are ", "the fire"], hl: [1] },
      {
        parts: ["I would reach for ", "without fear of being burned —"],
        hl: [],
      },
      { parts: ["the warmth I would choose"], hl: [] },
      { parts: ["even knowing ", "the cost."], hl: [1] },
    ],
  },
  {
    lines: [
      { parts: ["Please allow me to ", "love you aloud,"], hl: [1] },
      { parts: ["to love you in ways"], hl: [] },
      { parts: ["you have ", "never heard"], hl: [1] },
      { parts: ["and perhaps ", "never felt."], hl: [1] },
    ],
    center: true,
    big: true,
  },
  {
    lines: [{ parts: ["Please give me ", "a chance."], hl: [1] }],
    center: true,
  },
];

function ShootingStar({ x, y, onDone }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: 120,
        height: 1.5,
        background:
          "linear-gradient(90deg, rgba(180,200,255,0.9), rgba(180,200,255,0))",
        borderRadius: 2,
        transform: "rotate(20deg)",
        animation: "ss-fly 1.1s ease-out forwards",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export default function StarlightPoem() {
  const [visibleStanzas, setVisibleStanzas] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [tick, setTick] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    stanzas.forEach((_, i) => {
      setTimeout(() => setVisibleStanzas((v) => [...v, i]), 400 + i * 750);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      setShootingStars((prev) => [
        ...prev,
        { id, x: Math.random() * 65, y: Math.random() * 40 },
      ]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1200);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const t = tick / 1000;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@1,300;1,400;1,500&family=Cormorant+Upright:wght@300;400;500&display=swap');

        .sp-root {
          min-height: 100vh;
          background: #05080f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }

        @keyframes ss-fly {
          0%   { opacity: 1; transform: rotate(20deg) translateX(0); }
          100% { opacity: 0; transform: rotate(20deg) translateX(160px); }
        }

        .sp-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 580px;
          box-sizing: border-box;
          padding: 3rem 2.8rem;
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(140,160,255,0.18);
          border-radius: 20px;
        }

        @media (max-width: 480px) {
          .sp-card { padding: 2rem 1.5rem; }
        }

        .sp-header {
          text-align: center;
          margin-bottom: 2.4rem;
        }

        .sp-moon {
          font-size: 2.2rem;
          display: inline-block;
          animation: sp-float 5s ease-in-out infinite;
          filter: drop-shadow(0 0 14px rgba(200,210,255,0.5));
        }

        @keyframes sp-float {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-9px) rotate(4deg); }
        }

        .sp-rule {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin-top: 1rem;
        }

        .sp-rule-line {
          height: 0.5px;
          width: 70px;
          background: linear-gradient(90deg, transparent, rgba(140,160,255,0.45), transparent);
        }

        .sp-rule-gem {
          width: 5px;
          height: 5px;
          background: rgba(140,160,255,0.55);
          transform: rotate(45deg);
        }

        .sp-stanzas {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .sp-stanza {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .sp-stanza.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .sp-stanza.center { text-align: center; }

        .sp-line {
          display: block;
          font-family: 'Cormorant', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1rem, 3.5vw, 1.22rem);
          color: rgba(210,220,255,0.82);
          line-height: 1.9;
          letter-spacing: 0.025em;
        }

        .sp-stanza.big .sp-line {
          font-size: clamp(1.12rem, 4.5vw, 1.48rem);
          font-weight: 400;
          color: rgba(215,225,255,0.92);
          line-height: 1.75;
        }

        .sp-hl {
          color: #aab8ff;
          font-weight: 500;
        }

        .sp-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin: 0.2rem 0;
        }

        .sp-div-line {
          height: 0.5px;
          width: 38px;
          background: linear-gradient(90deg, transparent, rgba(140,160,255,0.3), transparent);
        }

        .sp-div-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(140,160,255,0.35);
        }

        .sp-footer {
          text-align: center;
          margin-top: 2.2rem;
        }

        .sp-footer-label {
          font-family: 'Cormorant Upright', serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: rgba(160,175,255,0.4);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.7rem;
        }

        .sp-dot-row {
          display: flex;
          justify-content: center;
          gap: 5px;
        }

        .sp-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(140,160,255,0.4);
        }
      `}</style>

      <div className="sp-root">
        {/* Star field */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {stars.map((s) => {
            const a =
              s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase));
            return (
              <div
                key={s.id}
                style={{
                  position: "absolute",
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.r * 2,
                  height: s.r * 2,
                  borderRadius: "50%",
                  background: `rgba(200,210,255,${a.toFixed(3)})`,
                  transform: "translate(-50%,-50%)",
                }}
              />
            );
          })}
        </div>

        {/* Shooting stars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {shootingStars.map((ss) => (
            <ShootingStar key={ss.id} x={ss.x} y={ss.y} />
          ))}
        </div>

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -100,
            width: 420,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(80,100,200,0.1), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(60,80,180,0.08), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="sp-card">
          {/* Header */}
          <div className="sp-header">
            <span className="sp-moon">🌙</span>
            <div className="sp-rule">
              <div className="sp-rule-line" />
              <div className="sp-rule-gem" />
              <div className="sp-rule-line" />
            </div>
          </div>

          {/* Poem */}
          <div className="sp-stanzas">
            {stanzas.map((stanza, si) => (
              <>
                {si === 2 && (
                  <div key={`vb-${si}`} className="sp-divider">
                    <div className="sp-div-line" />
                    <div className="sp-div-dot" />
                    <div className="sp-div-line" />
                  </div>
                )}
                <div
                  key={si}
                  className={[
                    "sp-stanza",
                    visibleStanzas.includes(si) ? "visible" : "",
                    stanza.center ? "center" : "",
                    stanza.big ? "big" : "",
                  ].join(" ")}
                >
                  {stanza.lines.map((line, li) => (
                    <span key={li} className="sp-line">
                      {line.parts.map((part, pi) =>
                        line.hl.includes(pi) ? (
                          <span key={pi} className="sp-hl">
                            {part}
                          </span>
                        ) : (
                          <span key={pi}>{part}</span>
                        ),
                      )}
                    </span>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
