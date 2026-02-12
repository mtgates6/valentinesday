import { useState, useEffect, useRef } from 'react'
import './App.css'
import PhotoCarousel from './PhotoCarousel';
import EnvelopeIntro from './EnvelopeIntro';

const CONNECTIONS_DATA = {
  categories: [
    {
      label: "Things I love about you",
      color: "#7C3AED",
      textColor: "#fff",
      items: ["Your smile", "Your humor", "Your ambition", "Your kisses"],
    },
    {
      label: "Our Favourite Shows",
      color: "#A855F7",
      textColor: "#fff",
      items: ["Love is Blind", "Anything in a kitchen", "Traitors", "Family Guy"],
    },
    {
      label: "Best places we've visted so far",
      color: "#C084FC",
      textColor: "#3b0764",
      items: ["Nashville", "Lisbon x Seville", "Hilton Head", "Vegas Baby"],
    },
    {
      label: "Delicous dates",
      color: "#E9D5FF",
      textColor: "#3b0764",
      items: ["Santa Barbara Burger 🍔", "Prime and Provisions Steak 🥩", "Benjardim Frango 🍗", "Best Birria Ever!🌮"],
    },
  ],
};


function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allItems = CONNECTIONS_DATA.categories.flatMap((cat) =>
  cat.items.map((item) => ({ text: item, category: cat.label }))
);

function Heart({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map((i) => (
        <Heart
          key={i}
          style={{
            position: "absolute",
            color: `rgba(${167 + (i % 3) * 20}, ${139 + (i % 2) * 20}, 250, ${0.06 + (i % 4) * 0.03})`,
            width: `${24 + (i % 5) * 18}px`,
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 9.1) % 110}%`,
            animation: `floatHeart ${7 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

function Message() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section style={{ margin: "0 auto 80px", maxWidth: 680, textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#e9d5ff", marginBottom: 28, letterSpacing: "0.02em" }}>
        I love you!
      </h2>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(109,40,217,0.2), rgba(126,34,206,0.15))",
          border: "1px solid rgba(192,132,252,0.3)",
          borderRadius: 20,
          padding: "40px 36px",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.07 }}>
          <Heart style={{ width: 140, color: "#c084fc" }} />
        </div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.15rem)", lineHeight: 1.9, color: "#e9d5ff", fontStyle: "italic", position: "relative", zIndex: 1, marginBottom: 20 }}>
          I love making memories with you. Between our trips, our shows, our eats, our games, and everything elsein between. Thank you for sticking by me through this past year. I really appreciate you.
        </p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            style={{
              marginTop: 8,
              background: "linear-gradient(135deg, #7c3aed, #a21caf)",
              color: "#f3e8ff",
              border: "none",
              borderRadius: 50,
              padding: "12px 30px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              letterSpacing: "0.05em",
              transition: "all 0.3s",
              boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
            }}
          >
            Read more ♡
          </button>
        ) : (
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.15rem)", lineHeight: 1.9, color: "#e9d5ff", fontStyle: "italic", animation: "fadeIn 0.8s ease" }}>
            I love who I am when I'm with you. You push me to be the best version of myself day in and day out. <br/> Happy Valentine's Day, lover!
          </p>
        )}
      </div>
    </section>
  );
}

function ConnectionsGame() {
  const [tiles] = useState(() => shuffle(allItems));
  const [selected, setSelected] = useState([]);
  const [solved, setSolved] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");

  const maxMistakes = 4;
  const solvedLabels = solved.map((s) => s.label);
  const remainingTiles = tiles.filter(
    (t) => !solvedLabels.includes(t.category) &&
      !solved.some((s) => s.items.includes(t.text))
  );
  const remaining = tiles.filter(
    (t) => !solved.flatMap((s) => s.items).includes(t.text)
  );

  function toggleTile(text) {
    if (won || shake) return;
    if (selected.includes(text)) {
      setSelected(selected.filter((s) => s !== text));
    } else if (selected.length < 4) {
      setSelected([...selected, text]);
    }
  }

  function submitGuess() {
    if (selected.length !== 4 || won) return;
    const cat = CONNECTIONS_DATA.categories.find((c) =>
      selected.every((s) => c.items.includes(s))
    );
    if (cat && !solvedLabels.includes(cat.label)) {
      const newSolved = [...solved, cat];
      setSolved(newSolved);
      setSelected([]);
      setMessage("✨ Yes! You know us so well!");
      setTimeout(() => setMessage(""), 2000);
      if (newSolved.length === CONNECTIONS_DATA.categories.length) {
        setTimeout(() => setWon(true), 400);
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setShake(true);
      setMessage(newMistakes >= maxMistakes ? "No more tries — but I still love you 💜" : `Not quite… ${maxMistakes - newMistakes} mistake${maxMistakes - newMistakes !== 1 ? "s" : ""} left`);
      setTimeout(() => {
        setShake(false);
        setSelected([]);
      }, 600);
      setTimeout(() => setMessage(""), 2500);
    }
  }


  const getCatForItem = (text) =>
    CONNECTIONS_DATA.categories.find((c) => c.items.includes(text));

  return (
    <section style={{ margin: "0 auto 80px", maxWidth: 600 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#e9d5ff", textAlign: "center", marginBottom: 6, letterSpacing: "0.02em" }}>
        <br/>
        Our Connections
      </h2>
      <p style={{ textAlign: "center", color: "rgba(196,181,253,0.7)", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.9rem", marginBottom: 28 }}>
        
      </p>

      {/* Solved rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
        {solved.map((cat) => (
          <div key={cat.label} style={{
            background: cat.color,
            borderRadius: 12,
            padding: "14px 16px",
            textAlign: "center",
            animation: "fadeIn 0.5s ease",
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.85rem", color: cat.textColor, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {cat.label}
            </div>
            <div style={{ color: cat.textColor, fontSize: "0.9rem", fontFamily: "Georgia, serif", opacity: 0.9 }}>
              {cat.items.join(" · ")}
            </div>
          </div>
        ))}
      </div>

      {/* Tile grid */}
      {!won && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          {remaining.map((tile) => {
            const isSel = selected.includes(tile.text);
            return (
              <button
                key={tile.text}
                onClick={() => toggleTile(tile.text)}
                style={{
                  background: isSel
                    ? "linear-gradient(135deg, #7c3aed, #9333ea)"
                    : "rgba(109,40,217,0.22)",
                  border: isSel ? "2px solid #c084fc" : "2px solid rgba(192,132,252,0.2)",
                  borderRadius: 10,
                  padding: "14px 6px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.82rem)",
                  color: isSel ? "#f3e8ff" : "#ddd6fe",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  transform: isSel ? "scale(1.05)" : "scale(1)",
                  boxShadow: isSel ? "0 4px 16px rgba(124,58,237,0.5)" : "none",
                  animation: shake && isSel ? "shake 0.5s ease" : "none",
                  lineHeight: 1.3,
                  minHeight: 64,
                }}
              >
                {tile.text}
              </button>
            );
          })}
        </div>
      )}

      {won && (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          animation: "fadeIn 0.8s ease",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>💜</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#e9d5ff", marginBottom: 8 }}>
            You know us so well.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "rgba(196,181,253,0.8)", fontSize: "1rem" }}>
            Happy Valentine's Day, lover!
          </p>
        </div>
      )}

      {message && (
        <p style={{ textAlign: "center", color: "#c084fc", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", marginBottom: 12, animation: "fadeIn 0.3s ease" }}>
          {message}
        </p>
      )}

      {!won && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Array.from({ length: maxMistakes }).map((_, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: "50%",
                background: i < mistakes ? "#7c3aed" : "rgba(192,132,252,0.25)",
                border: "2px solid rgba(192,132,252,0.4)",
                transition: "background 0.3s",
              }} />
            ))}
            <span style={{ color: "rgba(196,181,253,0.6)", fontSize: "0.8rem", fontFamily: "Georgia, serif", marginLeft: 4 }}>mistakes</span>
          </div>
          <button
            onClick={submitGuess}
            disabled={selected.length !== 4}
            style={{
              background: selected.length === 4
                ? "linear-gradient(135deg, #7c3aed, #a21caf)"
                : "rgba(109,40,217,0.15)",
              color: selected.length === 4 ? "#f3e8ff" : "rgba(196,181,253,0.4)",
              border: "2px solid " + (selected.length === 4 ? "rgba(192,132,252,0.6)" : "rgba(192,132,252,0.15)"),
              borderRadius: 50,
              padding: "10px 28px",
              cursor: selected.length === 4 ? "pointer" : "default",
              fontFamily: "Georgia, serif",
              fontSize: "0.9rem",
              transition: "all 0.3s",
              boxShadow: selected.length === 4 ? "0 4px 16px rgba(124,58,237,0.4)" : "none",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </section>
  );
}

export default function ValentinesDay() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);
  const [introComplete, setIntroComplete] = useState(false);

  if (!introComplete) {
    return <EnvelopeIntro onComplete={() => setIntroComplete(true)} />;
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #13092a;
          min-height: 100vh;
          max-width: 100%;
        }

        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1.05); }
          20%, 60% { transform: translateX(-6px) scale(1.05); }
          40%, 80% { transform: translateX(6px) scale(1.05); }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>

      <FloatingHearts />

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 0%, rgba(109,40,217,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(162,28,175,0.2) 0%, transparent 60%), #0d0117",
        color: "#e9d5ff",
        fontFamily: "Georgia, serif",
        position: "relative",
        zIndex: 1,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>

          {/* Hero */}
          <header style={{ textAlign: "center", padding: "80px 0 60px", animation: "heroReveal 1s ease 0.1s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(192,132,252,0.25)", borderRadius: 50, padding: "8px 20px", marginBottom: 28 }}>
              <span style={{ fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c084fc" }}>February 14</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #f3e8ff 0%, #c084fc 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 20,
            }}>
              Happy Valentine's Day
            </h1>
            <Heart style={{
              width: 36,
              color: "#a855f7",
              animation: "pulseHeart 2s ease-in-out infinite",
              display: "inline-block",
              margin: "0 auto",
            }} />
          </header>

          {/* Message */}
          <div style={{ animation: "heroReveal 1s ease 0.3s both" }}>
            <Message />
          </div>

          {/* Photos */}
          <div style={{ animation: "heroReveal 1s ease 0.5s both" }}>
            <PhotoCarousel />
          </div>

          {/* Connections Game */}
          <div style={{ animation: "heroReveal 1s ease 0.7s both" }}>
            <ConnectionsGame />
          </div>

          {/* Footer */}
          <footer style={{ textAlign: "center", padding: "40px 0 60px", borderTop: "1px solid rgba(192,132,252,0.1)" }}>
            <Heart style={{ width: 20, color: "#7c3aed", display: "inline-block", marginBottom: 10 }} />
            <p style={{ color: "rgba(196,181,253,0.4)", fontSize: "1.2rem", fontStyle: "italic" }}>
              I love you!
              <br/>
              Can't wait to have the best day!
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}
