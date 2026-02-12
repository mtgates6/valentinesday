import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// EnvelopeIntro
// Usage in App.jsx:
//
//   import EnvelopeIntro from "./EnvelopeIntro";
//
//   const [done, setDone] = useState(false);
//   if (!done) return <EnvelopeIntro onComplete={() => setDone(true)} />;
//   return <YourMainPage />;
// ─────────────────────────────────────────────

// ── Heart particle ────────────────────────────
function HeartParticle({ x, y, size, color, vx, vy, spin, delay }) {
  return (
    <div style={{
      position: "fixed",
      left: x, top: y,
      width: size, height: size,
      color,
      animation: `flyHeart 1.4s ease-out ${delay}s both`,
      "--vx": `${vx}px`,
      "--vy": `${vy}px`,
      "--spin": `${spin}deg`,
      pointerEvents: "none",
      zIndex: 100,
    }}>
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%" }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  );
}

// ── Envelope SVG ─────────────────────────────
function Envelope({ isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: "min(280px, 78vw)",
        cursor: isOpen ? "default" : "pointer",
        filter: "drop-shadow(0 20px 48px rgba(124,58,237,0.45))",
        animation: isOpen ? "none" : "envelopeBob 3s ease-in-out infinite",
      }}
    >
      {/* Envelope body */}
      <div style={{perspective: "1000px", position: "relative", zIndex: 2}}>      
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", display: "block" }}>
        
        {/* Body */}
        <rect x="2" y="60" width="276" height="138" rx="12"
          fill="url(#bodyGrad)" stroke="rgba(192,132,252,0.35)" strokeWidth="1.5"/>

        {/* Bottom triangle folds */}
        <path d="M2 198 L140 118 L278 198Z" fill="url(#foldGrad)" opacity="0.6"/>
        <path d="M2 60 L140 118 L278 60Z" fill="url(#foldGrad2)" opacity="0.5"/>
        
            {/* Flap — rotates open */}
            <g style={{
                transformOrigin: "140px 60px",
                transform: !isOpen ? "rotateX(-160deg)" : "rotateX(0deg)",
                transition: "transform 0.7s cubic-bezier(0.34,1.1,0.64,1)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
            }}>
            <path d="M2 60 L140 0 L278 60Z"
                fill="url(#flapGrad)" stroke="rgba(192,132,252,0.35)" strokeWidth="1.5"
                strokeLinejoin="round"/>
            {/* Heart wax seal on flap */}
            <circle cx="140" cy="0" r="16" fill="url(#sealGrad)" opacity="0.9"/>
            <path d="M140 54.5l-1.2-1.1C134.5 49.8 132 47.3 132 44.4 132 42.2 133.8 40.5 136 40.5c1.1 0 2.1.5 2.8 1.3l1.2 1.3 1.2-1.3c.7-.8 1.7-1.3 2.8-1.3 2.2 0 4 1.7 4 4-.1 2.9-2.6 5.4-6.8 9l-1.2 1z"
                fill="rgba(233,213,255,0.9)"  transform={"scale(0.9) translate(16,-45) rotate(180 140 46)"}/>
            </g>

        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="60" x2="280" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e0657"/>
            <stop offset="100%" stopColor="#1a0a2e"/>
          </linearGradient>
          <linearGradient id="foldGrad" x1="140" y1="118" x2="140" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b0764"/>
            <stop offset="100%" stopColor="#1a0a2e"/>
          </linearGradient>
          <linearGradient id="foldGrad2" x1="140" y1="60" x2="140" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4c1d95"/>
            <stop offset="100%" stopColor="#2e0657"/>
          </linearGradient>
          <linearGradient id="flapGrad" x1="2" y1="0" x2="278" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5b21b6"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
          <linearGradient id="sealGrad" x1="124" y1="30" x2="156" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
      {/* Tap hint */}
      {!isOpen && (
        <div style={{
          position: "absolute",
          bottom: -36,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(196,181,253,0.5)",
          fontSize: "0.92rem",
          letterSpacing: "0.18em",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          whiteSpace: "nowrap",
          animation: "softBlink 2s ease-in-out infinite",
        }}>
          tap to open
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────
export default function EnvelopeIntro({ onComplete }) {
  // stages: "idle" | "opening" | "question" | "exploding" | "transitioning"
  const [stage, setStage]       = useState("idle");
  const [particles, setParticles] = useState([]);
  const [noPos, setNoPos]         = useState({ x: 0, y: 0 });
  const noRef = useRef(null);

  function handleEnvelopeClick() {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("question"), 900);
  }

  function handleYes() {
    if (stage !== "question") return;
    setStage("exploding");

    // spawn 60 hearts from center
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const colors = ["#c084fc","#a855f7","#9333ea","#e9d5ff","#f3e8ff","#7c3aed","#d8b4fe"];
    const newParticles = Array.from({ length: 60 }, (_, i) => {
      const angle  = (i / 60) * Math.PI * 2 + Math.random() * 0.4;
      const speed  = 120 + Math.random() * 260;
      return {
        id:    i,
        x:     cx - 10,
        y:     cy - 10,
        size:  10 + Math.random() * 22,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed - 60,
        spin:  (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.15,
      };
    });
    setParticles(newParticles);

    // transition to main page after hearts finish
    setTimeout(() => setStage("transitioning"), 1200);
    setTimeout(() => onComplete(), 1900);
  }

  // "No" button runs away
  function handleNoHover() {
    const margin = 60;
    const nx = margin + Math.random() * (window.innerWidth  - margin * 2);
    const ny = margin + Math.random() * (window.innerHeight - margin * 2);
    setNoPos({ x: nx, y: ny });
  }

  // initialise No button position once question shows
  useEffect(() => {
    if (stage === "question") {
      setNoPos({ x: 0, y: 0 }); // reset — absolute in flow initially
    }
  }, [stage]);

  const isTransitioning = stage === "transitioning";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes envelopeBob {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes softBlink {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.75; }
        }
        @keyframes flyHeart {
          0%   { transform: translate(0,0) rotate(0deg) scale(1);   opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(var(--vx), var(--vy)) rotate(var(--spin)) scale(0.3); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes letterRise {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes pageExit {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.06); }
        }
        @keyframes noPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
      `}</style>

      {/* Heart particles */}
      {particles.map(p => (
        <HeartParticle key={p.id} {...p} />
      ))}

      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(109,40,217,0.32) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(126,34,206,0.24) 0%, transparent 55%), #0a0118",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        zIndex: 50,
        animation: isTransitioning ? "pageExit 0.7s ease forwards" : "none",
        perspective: 1000,
      }}>

        {/* ── IDLE: envelope sitting, waiting ── */}
        {(stage === "idle" || stage === "opening") && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "absolute", zIndex: 0 }}>
            <p style={{
              fontSize: "1.2rem", letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(192,132,252,0.45)", marginBottom: 20,
              animation: "fadeInUp 0.8s ease 0.2s both",

            }}>
              Dear Amy
            </p>
            <div style={{ position: "relative", zIndex: 2 }}>
                <Envelope isOpen={stage === "opening"} onClick={handleEnvelopeClick} />
            </div>
          </div>
        )}

        {/* ── QUESTION: letter rises from envelope ── */}
        {(stage === "question" || stage === "exploding") && (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 32,
            animation: "letterRise 0.6s cubic-bezier(0.34,1.2,0.64,1) both",
          }}>

            {/* Letter card */}
            <div style={{
              width: "min(300px, 82vw)",
              background: "linear-gradient(160deg, #1e0533, #2d1060)",
              border: "1px solid rgba(192,132,252,0.25)",
              borderRadius: 20,
              padding: "40px 28px 36px",
              textAlign: "center",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.1)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* decorative corner lines */}
              <div style={{ position: "absolute", top: 14, left: 14, width: 28, height: 28, borderTop: "1px solid rgba(167,139,250,0.2)", borderLeft: "1px solid rgba(167,139,250,0.2)", borderRadius: "4px 0 0 0" }} />
              <div style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderTop: "1px solid rgba(167,139,250,0.2)", borderRight: "1px solid rgba(167,139,250,0.2)", borderRadius: "0 4px 0 0" }} />
              <div style={{ position: "absolute", bottom: 14, left: 14, width: 28, height: 28, borderBottom: "1px solid rgba(167,139,250,0.2)", borderLeft: "1px solid rgba(167,139,250,0.2)", borderRadius: "0 0 0 4px" }} />
              <div style={{ position: "absolute", bottom: 14, right: 14, width: 28, height: 28, borderBottom: "1px solid rgba(167,139,250,0.2)", borderRight: "1px solid rgba(167,139,250,0.2)", borderRadius: "0 0 4px 0" }} />

              <svg viewBox="0 0 24 24" fill="#9333ea" style={{ width: 32, marginBottom: 20, filter: "drop-shadow(0 0 10px rgba(147,51,234,0.5))" }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>

              <h2 style={{
                fontSize: "clamp(1.6rem,6vw,2.1rem)",
                fontWeight: 400, lineHeight: 1.25,
                color: "#f3e8ff",
                marginBottom: 8,
                letterSpacing: "0.01em",
              }}>
                Will you be my
              </h2>
              <h2 style={{
                fontSize: "clamp(1.6rem,6vw,2.1rem)",
                fontWeight: 600, lineHeight: 1.25,
                background: "linear-gradient(135deg, #e9d5ff, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 0,
                letterSpacing: "0.01em",
              }}>
                Valentine?
              </h2>
            </div>

            {/* Buttons */}
            {stage === "question" && (
              <div style={{
                display: "flex", alignItems: "center",
                gap: 16, position: "relative",
                animation: "fadeInUp 0.5s ease 0.15s both",
              }}>

                {/* YES */}
                <button
                  onClick={handleYes}
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "#f3e8ff",
                    border: "none",
                    borderRadius: 50,
                    padding: "14px 38px",
                    fontSize: "1.05rem",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.55)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={e => { e.target.style.transform = "scale(1.07)"; e.target.style.boxShadow = "0 12px 32px rgba(124,58,237,0.7)"; }}
                  onMouseLeave={e => { e.target.style.transform = "scale(1)";    e.target.style.boxShadow = "0 8px 24px rgba(124,58,237,0.55)"; }}
                >
                  Yes ♡
                </button>

                {/* NO — runs away on hover */}
                <button
                  ref={noRef}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{
                    background: "transparent",
                    color: "rgba(196,181,253,0.4)",
                    border: "1.5px solid rgba(167,139,250,0.2)",
                    borderRadius: 50,
                    padding: "13px 28px",
                    fontSize: "1.05rem",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    position: noPos.x ? "fixed" : "relative",
                    left:   noPos.x ? noPos.x : "auto",
                    top:    noPos.y ? noPos.y : "auto",
                    zIndex: noPos.x ? 200     : "auto",
                    animation: noPos.x ? "noPulse 1s ease-in-out infinite" : "none",
                  }}
                >
                  No
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}