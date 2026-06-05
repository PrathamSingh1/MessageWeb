import { useEffect, useState } from "react";

const stars = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() < 0.3 ? 3 : 2,
  dur: 2 + Math.random() * 3,
  delay: Math.random() * 5,
}));

const lines = [
  { text: ["Tum ", "Chand", " Ho Mera"], highlight: 1 },
  { text: ["Tumse Meri ", "Chandni"], highlight: 1 },
  { text: ["Mai Tere Bin Hoon Kya"], highlight: -1 },
  { text: ["Tum Ho ", "Pyaar Aakhri"], highlight: 1 },
];

export default function LovePoem() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), 400 + i * 450);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,600&family=Cormorant+Garamond:ital,wght@1,300;1,500&display=swap');

        .poem-root {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0a14;
          padding: 1.5rem 1rem;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          width: 100%;
          box-sizing: border-box;
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .nebula-1 {
          width: 400px; height: 400px;
          top: -120px; right: -100px;
          background: radial-gradient(circle, rgba(160,100,230,0.18), transparent 70%);
        }
        .nebula-2 {
          width: 300px; height: 300px;
          bottom: -80px; left: -80px;
          background: radial-gradient(circle, rgba(220,140,180,0.13), transparent 70%);
        }

        .star-dot {
          position: absolute;
          border-radius: 50%;
          background: #e8d5ff;
          animation: twinkle var(--dur) ease-in-out infinite var(--delay);
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 0.65; transform: scale(1); }
        }

        .poem-card {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2.5rem 2rem;
          border: 0.5px solid rgba(200, 160, 255, 0.2);
          border-radius: 24px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(8px);
          max-width: 520px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .poem-card { padding: 2rem 1.25rem; }
        }

        .moon {
          font-size: 2.2rem;
          display: block;
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 0 16px rgba(255,220,100,0.45));
          margin-bottom: 0.5rem;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 1rem 0 1.8rem;
        }
        .orn-line {
          height: 0.5px;
          width: 64px;
          background: linear-gradient(90deg, transparent, rgba(196,148,240,0.7), transparent);
        }
        .orn-diamond {
          width: 5px; height: 5px;
          background: rgba(196,148,240,0.7);
          transform: rotate(45deg);
        }

        .poem-line {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 5vw, 2rem);
          font-weight: 300;
          font-style: italic;
          line-height: 2.2;
          color: #e8ddf5;
          letter-spacing: 0.04em;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .poem-line.show {
          opacity: 1;
          transform: translateY(0);
        }

        .hl {
          color: #c47ae0;
          font-weight: 500;
        }

        .footer-label {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          color: rgba(200,170,240,0.5);
          text-transform: uppercase;
          margin-top: 0.5rem;
          display: block;
        }

        .hearts {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 0.6rem;
        }
        .heart-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(210, 130, 180, 0.6);
        }
      `}</style>

      <div className="poem-root">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />

        {stars.map((s) => (
          <div
            key={s.id}
            className="star-dot"
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

        <div className="poem-card">
          <span className="moon">🌙</span>

          <div className="ornament">
            <div className="orn-line" />
            <div className="orn-diamond" />
            <div className="orn-line" />
          </div>

          <p style={{ margin: 0 }}>
            {lines.map((line, i) => (
              <span
                key={i}
                className={`poem-line ${visible.includes(i) ? "show" : ""}`}
              >
                {line.text.map((part, j) =>
                  j === line.highlight ? (
                    <span key={j} className="hl">
                      {part}
                    </span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </span>
            ))}
          </p>

          <div
            className="ornament"
            style={{ marginTop: "1.8rem", marginBottom: "1rem" }}
          >
            <div className="orn-line" />
            <div className="orn-diamond" />
            <div className="orn-line" />
          </div>

          <span className="footer-label">With love, always</span>
          <div className="hearts">
            <div className="heart-dot" />
            <div className="heart-dot" />
            <div className="heart-dot" />
          </div>
        </div>
      </div>
    </>
  );
}
