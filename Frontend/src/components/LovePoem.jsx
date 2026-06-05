import { useEffect, useState } from "react";

const petals = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 9,
  dur: 8 + Math.random() * 7,
  size: 7 + Math.random() * 10,
  sway: 30 + Math.random() * 40,
}));

const sparkles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() < 0.3 ? 3 : 2,
  dur: 2.5 + Math.random() * 3,
  delay: Math.random() * 6,
}));

const stanzas = [
  {
    lines: [
      { parts: ["I love you in a way that would worry a therapist"], hl: [] },
      { parts: ["and ", "thrill a poet."], hl: [1] },
    ],
  },
  {
    lines: [
      { parts: ["You're the person I want to have a"], hl: [] },
      { parts: ["million adventures", " with —"], hl: [0] },
    ],
  },
  {
    lines: [
      { parts: ["dance in the kitchen with,"], hl: [] },
      { parts: ["kiss in the rain of ", "June,"], hl: [1] },
      { parts: ["make breakfast in bed for even at ", "3 am,"], hl: [1] },
      { parts: ["care for when you're sick,"], hl: [] },
      { parts: ["rush home to have ", "pillow fights", " with,"], hl: [1] },
      { parts: ["chase up the stairs,"], hl: [] },
      { parts: ["laugh with and ", "cry with."], hl: [1] },
    ],
  },
  {
    lines: [
      { parts: ["The ", "fall in love over and over again"], hl: [1] },
      { parts: ["type of relationship."], hl: [] },
    ],
    center: true,
    big: true,
  },
  {
    lines: [
      { parts: ["You're ", "my person."], hl: [1] },
      { parts: ["I love you endlessly and try my best"], hl: [] },
      { parts: ["to be the person ", "you deserve."], hl: [1] },
    ],
    center: true,
  },
];

export default function LovePoem() {
  const [visibleStanzas, setVisibleStanzas] = useState([]);

  useEffect(() => {
    stanzas.forEach((_, i) => {
      setTimeout(() => setVisibleStanzas((v) => [...v, i]), 500 + i * 700);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@1,300;1,400;1,500;1,600&family=Cormorant+Upright:wght@300;400;500&display=swap');

        .lp-root {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #130609;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .lp-petal {
          position: absolute;
          top: -20px;
          pointer-events: none;
          border-radius: 50% 10% 50% 10%;
          background: rgba(180, 55, 75, 0.28);
          animation: lp-fall linear infinite;
          z-index: 0;
        }
        @keyframes lp-fall {
          0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.7; }
          50%  { transform: translateY(50vh) rotate(270deg) translateX(var(--sway)); opacity: 0.4; }
          100% { transform: translateY(105%) rotate(540deg) translateX(0); opacity: 0; }
        }

        .lp-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
        }
        .lp-glow-1 {
          width: 420px; height: 300px;
          top: -80px; right: -100px;
          background: radial-gradient(circle, rgba(180,45,65,0.16), transparent 70%);
        }
        .lp-glow-2 {
          width: 300px; height: 300px;
          bottom: -60px; left: -80px;
          background: radial-gradient(circle, rgba(140,30,55,0.13), transparent 70%);
        }
        .lp-glow-3 {
          width: 200px; height: 200px;
          top: 40%; left: 50%;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(160,40,60,0.07), transparent 70%);
        }

        .lp-sparkle {
          position: absolute;
          border-radius: 50%;
          background: #ffc8d0;
          animation: lp-twinkle var(--dur) ease-in-out infinite var(--delay);
          pointer-events: none;
          z-index: 0;
        }
        @keyframes lp-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 0.45; transform: scale(1); }
        }

        .lp-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 560px;
          box-sizing: border-box;
          padding: 3rem 2.5rem;
          background: rgba(255,255,255,0.025);
          border: 0.5px solid rgba(200,80,100,0.18);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        @media (max-width: 480px) {
          .lp-card { padding: 2.2rem 1.5rem; }
        }

        /* header */
        .lp-header {
          text-align: center;
          margin-bottom: 2.2rem;
        }
        .lp-rose {
          font-size: 2rem;
          display: inline-block;
          animation: lp-bob 4s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(200,60,80,0.5));
        }
        @keyframes lp-bob {
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-7px) rotate(5deg); }
        }
        .lp-title-rule {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0.9rem 0 0;
          justify-content: center;
        }
        .lp-rule-line {
          height: 0.5px;
          width: 70px;
          background: linear-gradient(90deg, transparent, rgba(200,80,100,0.55), transparent);
        }
        .lp-rule-gem {
          width: 5px; height: 5px;
          background: rgba(200,80,100,0.6);
          transform: rotate(45deg);
        }

        /* stanzas */
        .lp-stanzas { display: flex; flex-direction: column; gap: 1.6rem; }

        .lp-stanza {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .lp-stanza.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .lp-stanza.center { text-align: center; }

        .lp-line {
          display: block;
          font-family: 'Cormorant', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1rem, 3.5vw, 1.25rem);
          color: rgba(255, 215, 220, 0.82);
          line-height: 1.85;
          letter-spacing: 0.02em;
        }
        .lp-stanza.big .lp-line {
          font-size: clamp(1.15rem, 4.5vw, 1.5rem);
          font-weight: 400;
          color: rgba(255,215,220,0.92);
          line-height: 1.7;
        }

        .lp-hl { color: #f07080; font-weight: 500; }

        /* divider between stanzas 2 & 3 */
        .lp-verse-break {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin: 0.4rem 0;
        }
        .lp-vb-line {
          height: 0.5px;
          width: 40px;
          background: linear-gradient(90deg, transparent, rgba(200,80,100,0.3), transparent);
        }
        .lp-vb-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(200,80,100,0.35);
        }

        /* footer */
        .lp-footer {
          text-align: center;
          margin-top: 2.2rem;
        }
        .lp-footer-rule {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin-bottom: 0.9rem;
        }
        .lp-footer-label {
          font-family: 'Cormorant Upright', serif;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          color: rgba(200,130,140,0.45);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.6rem;
        }
        .lp-dot-row {
          display: flex;
          justify-content: center;
          gap: 5px;
        }
        .lp-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(200,90,110,0.45);
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-glow lp-glow-1" />
        <div className="lp-glow lp-glow-2" />
        <div className="lp-glow lp-glow-3" />

        {petals.map((p) => (
          <div
            key={p.id}
            className="lp-petal"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.65,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              "--sway": `${p.sway}px`,
            }}
          />
        ))}

        {sparkles.map((s) => (
          <div
            key={s.id}
            className="lp-sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            }}
          />
        ))}

        <div className="lp-card">
          <div className="lp-header">
            <span className="lp-rose">🌹</span>
            <div className="lp-title-rule">
              <div className="lp-rule-line" />
              <div className="lp-rule-gem" />
              <div className="lp-rule-line" />
            </div>
          </div>

          <div className="lp-stanzas">
            {stanzas.map((stanza, si) => (
              <>
                {si === 2 && (
                  <div key={`vb-${si}`} className="lp-verse-break">
                    <div className="lp-vb-line" />
                    <div className="lp-vb-dot" />
                    <div className="lp-vb-line" />
                  </div>
                )}
                <div
                  key={si}
                  className={`lp-stanza ${visibleStanzas.includes(si) ? "visible" : ""} ${stanza.center ? "center" : ""} ${stanza.big ? "big" : ""}`}
                >
                  {stanza.lines.map((line, li) => (
                    <span key={li} className="lp-line">
                      {line.parts.map((part, pi) =>
                        line.hl.includes(pi) ? (
                          <span key={pi} className="lp-hl">
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

          {/* <div className="lp-footer">
            <div className="lp-footer-rule">
              <div className="lp-rule-line" />
              <div className="lp-rule-gem" />
              <div className="lp-rule-line" />
            </div>
            <span className="lp-footer-label">With love, always</span>
            <div className="lp-dot-row">
              <div className="lp-dot" />
              <div className="lp-dot" />
              <div className="lp-dot" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
