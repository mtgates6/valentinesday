import photo1 from "../public/photos/IMG_0171.JPG";
import photo2 from "../public/photos/IMG_0329.JPG";
import photo3 from "../public/photos/IMG_0736.JPG";
import photo4 from "../public/photos/IMG_1002.JPG";
import photo5 from "../public/photos/IMG_1116.JPG";
import photo6 from "../public/photos/IMG_1125.JPG";
import photo7 from "../public/photos/IMG_1881.JPG";  
import photo8 from "../public/photos/IMG_1900.JPG";
import photo9 from "../public/photos/IMG_2531.JPG";
import photo10 from "../public/photos/IMG_2632.JPG";
import photo11 from "../public/photos/IMG_2675_Original.JPG";
import photo12 from "../public/photos/IMG_3018.JPG";
import photo13 from "../public/photos/IMG_3500.JPG";
import photo14 from "../public/photos/IMG_3526.JPG";
import photo15 from "../public/photos/IMG_3564.JPG";
import photo16 from "../public/photos/IMG_3945.JPG";
import photo17 from "../public/photos/IMG_4414.JPG";
import photo18 from "../public/photos/IMG_4513.JPG";
import photo19 from "../public/photos/IMG_4843.JPG";
import photo20 from "../public/photos/IMG_4933.JPG";
import photo21 from "../public/photos/IMG_4981.JPG";
import photo22 from "../public/photos/IMG_5065.JPG";
import photo23 from "../public/photos/IMG_5353.JPG";
import photo24 from "../public/photos/IMG_5362.JPG";
import photo25 from "../public/photos/IMG_5383.JPG";
import photo26 from "../public/photos/IMG_5512.JPG";
import photo27 from "../public/photos/IMG_5638.JPG";
import photo28 from "../public/photos/IMG_5699.JPG";
import photo29 from "../public/photos/IMG_5730.JPG";
import photo30 from "../public/photos/IMG_5826.JPG";
import photo31 from "../public/photos/IMG_5852.JPG";
import photo32 from "../public/photos/IMG_5892.JPG";
import photo33 from "../public/photos/IMG_6048.JPG";
import photo34 from "../public/photos/IMG_6107.JPG";
import photo35 from "../public/photos/IMG_6139.JPG";
import photo36 from "../public/photos/IMG_6203.JPG";
import photo37 from "../public/photos/IMG_6323.JPG";
import photo38 from "../public/photos/IMG_6352.JPG";
import photo39 from "../public/photos/IMG_6854.JPG";
import photo40 from "../public/photos/IMG_7062.JPG";
import photo41 from "../public/photos/IMG_8320.JPG";
import photo42 from "../public/photos/IMG_8567.JPG";
import photo43 from "../public/photos/IMG_8595.JPG";
import photo44 from "../public/photos/IMG_9329.JPG";
import photo45 from "../public/photos/IMG_9600.JPG";
import { useState, useEffect, useRef } from 'react'

const PHOTOS = [
    { src: photo1, caption: "Go Irish! 🍀"}, 
    { src: photo2, caption: "Roadtrip!"}, 
    { src: photo3, caption: "22!"}, 
    { src: photo4, caption: "Broadway baby!"},
    { src: photo5, caption: "Valentines in Denver!"},
    { src: photo6, caption: "The fair!"},
    { src: photo7, caption: "Porch time with Penny"},
    { src: photo8, caption: "Sox Game"},
    { src: photo9, caption: "After work Dinner Date!"},
    { src: photo10, caption: "Chinatown strolls and boba runs!"},
    { src: photo11, caption: "You graduated! So proud of you."},
    { src: photo12, caption: "Disnyland!" },
    { src: photo13, caption: "Go Padres!" },
    { src: photo14, caption: "Happy Easter!" },
    { src: photo15, caption: "Go Padres pt2!" },
    { src: photo16, caption: "Let us cook" },
    { src: photo17, caption: "Go Irish pt2!" },
    { src: photo18, caption: "Hometown bar crawl" },
    { src: photo19, caption: "Luke Combs!" },
    { src: photo20, caption: "My fav golfer" },
    { src: photo21, caption: "Halloween" },
    { src: photo22, caption: "Julian pie and cider" },
    { src: photo23, caption: "Marquês de Pombal" },
    { src: photo24, caption: "Praça do Comércio" },
    { src: photo25, caption: "Jerónimos Monastery" },
    { src: photo26, caption: "Cristo Rei" },
    { src: photo27, caption: "Miraduro" },
    { src: photo28, caption: "Castelo de São Jorge" },
    { src: photo29, caption: "Cabo de Roca" },
    { src: photo30, caption: "Palácio  da Pena" },
    { src: photo31, caption: "Drinkin" },
    { src: photo32, caption: "Walkin" },
    { src: photo33, caption: "Plaza de España" },
    { src: photo34, caption: "Oracle Park" },
    { src: photo35, caption: "Rooftop Sunset" },
    { src: photo36, caption: "Impromptu Sunset" },
    { src: photo37, caption: "Boca de Inferno" },
    { src: photo38, caption: "Last One. Best One." },
    { src: photo39, caption: "First time in Chicago" },
    { src: photo40, caption: "The Bean" },
    { src: photo41, caption: "Summer in SD" },
    { src: photo42, caption: "Wrigley!" },
    { src: photo43, caption: "Go Irish pt 3!" },
    { src: photo44, caption: "Ocean Beach" },
    { src: photo45, caption: "Range Session" },
];

const TOTAL = PHOTOS.length;
const CLOSING_IDX = TOTAL;

function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);
  const dragX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    dragX.current = 0;
  }

  function onTouchMove(e) {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // only hijack horizontal swipes
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      dragX.current = dx;
      setDragOffset(dx);
    }
  }

  function onTouchEnd() {
    isDragging.current = false;
    const threshold = 60;
    if (dragX.current < -threshold) onSwipeLeft();
    else if (dragX.current > threshold) onSwipeRight();
    setDragOffset(0);
    dragX.current = 0;
  }

  return { onTouchStart, onTouchMove, onTouchEnd, dragOffset };
}

// offset = this card's index minus the currently active index
// positive offset = card is to the right (upcoming)
// negative offset = card is to the left  (already seen)
function cardStyle(offset, dragOffset, isActive) {
  let tx = 0, ty = 0, scale = 1, rotate = 0, zIndex = 0, opacity = 1;

  if (isActive) {
    tx     = dragOffset;
    rotate = dragOffset * 0.04;
    scale  = 1;
    zIndex = 10;
    opacity = 1;
  } else if (offset === -1) {
    // PREV — peek from left, slides in when dragging right
    const reveal = Math.max(0, dragOffset / 4);
    tx      = -36 + reveal;
    ty      = 10;
    rotate  = -3;
    scale   = 0.93;
    zIndex  = 8;
    opacity = 0.8;
  } else if (offset === 1) {
    // NEXT — peek from right, slides in when dragging left
    const peek = Math.max(0, -dragOffset / 4);
    tx      = 36 - peek;
    ty      = 10;
    rotate  = 3;
    scale   = 0.93 + peek * 0.002;
    zIndex  = 8;
    opacity = 0.8;
  } else if (offset === 2) {
    tx = 56; ty = 20; rotate = 6; scale = 0.86; zIndex = 6; opacity = 0.45;
  } else if (offset === -2) {
    tx = -56; ty = 20; rotate = -6; scale = 0.86; zIndex = 6; opacity = 0.45;
  }

  const transition = dragOffset !== 0 && isActive
    ? "none"
    : "transform 0.42s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease";

  return {
    position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden",
    transform: `translateX(${tx}px) translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
    transformOrigin: "center bottom",
    transition, zIndex, opacity, willChange: "transform",
  };
}

// ── Title Card ────────────────────────────────
function TitleCard({ offset, dragOffset }) {
  const isActive  = offset === 0;
  const isVisible = offset >= -2 && offset <= 2;
  if (!isVisible) return null;

  return (
    <div style={{
      ...cardStyle(offset, dragOffset, isActive),
      background: "linear-gradient(145deg, #1a0533 0%, #3b0764 40%, #2e1065 70%, #0d0117 100%)",
      boxShadow: isActive
        ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.12)"
        : "0 12px 32px rgba(0,0,0,0.4)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 20,
    }}>
      {/* decorative rings */}
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.08)" }} />
      <div style={{ position: "absolute", width: 310, height: 310, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.04)" }} />

      <svg viewBox="0 0 24 24" fill="#9333ea" style={{ width: 44, filter: "drop-shadow(0 0 18px rgba(147,51,234,0.6))", animation: "pulseHeart 2.5s ease-in-out infinite", position: "relative" }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>

      <div style={{ textAlign: "center", padding: "0 28px", position: "relative" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.8rem,6vw,2rem)", lineHeight: 1.2, color: "#f3e8ff", marginBottom: 14 }}>
            some of my favorite memories with you
        </h2>
        <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(167,139,250,0.5), transparent)", margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "0.88rem", color: "rgba(196,181,253,0.55)", letterSpacing: "0.04em" }}>
          swipe to begin →
        </p>
      </div>
    </div>
  );
}

// ── Closing Card ──────────────────────────────
function ClosingCard({ offset, dragOffset }) {
  const isActive  = offset === 0;
  const isVisible = offset >= -2 && offset <= 2;
  if (!isVisible) return null;

  return (
    <div style={{
      ...cardStyle(offset, dragOffset, isActive),
      background: "linear-gradient(145deg, #0d0117 0%, #1e0533 40%, #3b0764 80%, #1a0533 100%)",
      boxShadow: isActive
        ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.12)"
        : "0 12px 32px rgba(0,0,0,0.4)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 32px",
    }}>
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.07)" }} />
      <div style={{ position: "absolute", width: 290, height: 290, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.04)" }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(192,132,252,0.5)", marginBottom: 16 }}>
          happy valentine's day
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.45rem,5vw,1.65rem)", lineHeight: 1.4, color: "#f3e8ff", marginBottom: 18 }}>
          Everything is better with you!
        </p>
        <div style={{ height: 1, width: 50, background: "linear-gradient(to right, transparent, rgba(167,139,250,0.5), transparent)", margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "0.88rem", color: "rgba(196,181,253,0.5)", letterSpacing: "0.06em" }}>
         here's to many more!
        </p>
      </div>
    </div>
  );
}

// ── Photo Card ────────────────────────────────
function PhotoCard({ photo, index, currentIndex, dragOffset }) {
  const src     = photo?.src    ?? null;
  const caption = photo?.caption ?? null;
  const offset  = index - currentIndex;

  const isActive  = offset === 0;
  const isVisible = offset >= -2 && offset <= 2;
  if (!isVisible) return null;

  return (
    <div style={{
      ...cardStyle(offset, dragOffset, isActive),
      boxShadow: isActive
        ? "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)"
        : "0 12px 32px rgba(0,0,0,0.4)",
      background: "linear-gradient(135deg, #1e0533, #2d1060, #1a0a2e)",
    }}>
      {src ? (
        <img src={src} alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
          background: `linear-gradient(${135 + index * 11}deg, #2e0657 0%, #5b21b6 50%, #7e22ce 100%)`,
        }}>
          <svg viewBox="0 0 24 24" fill="rgba(233,213,255,0.2)" style={{ width: 48 }}>
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-1.1 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <span style={{ color: "rgba(233,213,255,0.28)", fontSize: "0.73rem", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            photo {index + 1}
          </span>
        </div>
      )}

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.38) 100%)",
        pointerEvents: "none",
      }} />

      {/* Caption — active card only */}
      {caption && isActive && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "52px 22px 22px",
          background: "linear-gradient(to top, rgba(10,1,24,0.88) 0%, transparent 100%)",
          pointerEvents: "none",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic", fontWeight: 300,
            fontSize: "1rem", color: "rgba(233,213,255,0.92)",
            textAlign: "center", letterSpacing: "0.04em", margin: 0,
            animation: "fadeUp 0.4s ease both",
          }}>
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────
export default function PhotoCarousel() {
  // -1 = title, 0..TOTAL-1 = photos, TOTAL = closing
  const [virtualIndex, setVirtualIndex] = useState(-1);
  const [exiting, setExiting]           = useState(false);
  const containerRef                    = useRef(null);

  const atTitle   = virtualIndex === -1;
  const atClosing = virtualIndex === CLOSING_IDX;
  const photoIdx  = virtualIndex; // maps directly to PHOTOS array

  function goNext() {
    if (virtualIndex < CLOSING_IDX && !exiting) {
      setExiting(true);
      setTimeout(() => { setVirtualIndex(v => v + 1); setExiting(false); }, 40);
    }
  }

  function goPrev() {
    if (virtualIndex > -1 && !exiting) {
      setExiting(true);
      setTimeout(() => { setVirtualIndex(v => v - 1); setExiting(false); }, 40);
    }
  }

  const { onTouchStart, onTouchMove, onTouchEnd, dragOffset } = useSwipe(goNext, goPrev);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
  }, []);

  const progress = atClosing ? 100 : atTitle ? 0 : ((photoIdx + 1) / TOTAL) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.18); }
        }
      `}</style>

      <div style={{
        minHeight: "60dvh",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 25% 0%, rgba(109,40,217,0.28) 0%, transparent 55%), radial-gradient(ellipse at 75% 100%, rgba(126,34,206,0.22) 0%, transparent 55%), #16082e",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "28px ",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        userSelect: "none", overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22, animation: "fadeUp 0.8s ease both" }}>
          <p style={{ fontSize: "0.67rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(192,132,252,0.45)" }}>
            {atTitle ? "happy valentine's day" : atClosing ? "More to come" : "the best of us"}
          </p>
        </div>

        {/* Card Stack */}
        <div
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            position: "relative",
            width: "min(320px, 84vw)",
            aspectRatio: "3/4",
            maxHeight: "58vh",
            cursor: "grab",
            animation: "fadeUp 0.8s ease 0.1s both",
            touchAction: "pan-y",
          }}
        >
          {/* Title: its virtual index is -1, so offset = -1 - virtualIndex */}
          <TitleCard offset={-1 - virtualIndex} dragOffset={dragOffset} />

          {/* Photos: offset = i - photoIdx (which equals i - virtualIndex) */}
          {PHOTOS.map((photo, i) => (
            <PhotoCard
              key={i}
              photo={photo}
              index={i}
              currentIndex={photoIdx}
              dragOffset={dragOffset}
            />
          ))}

          {/* Closing: its virtual index is CLOSING_IDX, offset = CLOSING_IDX - virtualIndex */}
          <ClosingCard offset={CLOSING_IDX - virtualIndex} dragOffset={dragOffset} />
        </div>

        {/* Progress bar + dots — hidden on title & closing */}
        {!atTitle && !atClosing && (
          <div style={{
            marginTop: 40,
            width: "min(320px, 84vw)",
            animation: "fadeUp 0.8s ease 0.2s both",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ color: "rgba(167,139,250,0.45)", fontSize: "0.73rem", letterSpacing: "0.08em" }}>
                {String(photoIdx + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "rgba(167,139,250,0.25)", fontSize: "0.73rem", letterSpacing: "0.08em" }}>
                {String(TOTAL).padStart(2, "0")}
              </span>
            </div>

            <div style={{ height: 2, background: "rgba(109,40,217,0.18)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(to right, #7c3aed, #c084fc)",
                borderRadius: 2,
                transition: "width 0.4s cubic-bezier(0.34,1.2,0.64,1)",
              }} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 14 }}>
              {Array.from({ length: Math.min(TOTAL, 7) }, (_, i) => {
                const start  = Math.min(Math.max(photoIdx - 3, 0), Math.max(TOTAL - 7, 0));
                const idx    = start + i;
                const active = idx === photoIdx;
                return (
                  <div key={idx} onClick={() => setVirtualIndex(idx)} style={{
                    width: active ? 18 : 6, height: 6, borderRadius: 3,
                    background: active
                      ? "linear-gradient(to right, #7c3aed, #c084fc)"
                      : "rgba(109,40,217,0.28)",
                    transition: "all 0.3s ease", cursor: "pointer",
                  }} />
                );
              })}
            </div>
          </div>
        )}

      </div>
    </>
  );
}