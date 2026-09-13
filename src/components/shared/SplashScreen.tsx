"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoSrc from "../../assets4/Logo - Transparent Logo.png";

// ─── Keyframe Animations ───────────────────────────────────────────────────

const SPLASH_STYLES = `
  @keyframes seyol-logo-bloom {
    0% {
      opacity: 0;
      transform: scale(0.65) rotate(-6deg);
      filter: blur(14px);
    }
    65% {
      opacity: 1;
      transform: scale(1.03) rotate(0.8deg);
      filter: blur(0px);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      filter: blur(0px);
    }
  }

  @keyframes seyol-slogan-phrase-1 {
    0% {
      opacity: 0;
      filter: blur(16px);
      transform: translate(-50%, -50%) scale(0.88);
    }
    20%, 75% {
      opacity: 1;
      filter: blur(0px);
      transform: translate(-50%, -50%) scale(1);
    }
    95%, 100% {
      opacity: 0;
      filter: blur(16px);
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @keyframes seyol-slogan-phrase-2 {
    0% {
      opacity: 0;
      filter: blur(16px);
      transform: translate(-50%, -50%) scale(0.88);
    }
    25%, 100% {
      opacity: 1;
      filter: blur(0px);
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes seyol-fade-up {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes seyol-ring-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes seyol-ring-rev {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(-360deg); }
  }

  @keyframes seyol-pulse-dot {
    0%, 100% { transform: scale(0.75); opacity: 0.35; }
    50%      { transform: scale(1.3);  opacity: 1; }
  }

  @keyframes seyol-splash-exit {
    0% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px);
    }
    100% {
      opacity: 0;
      transform: scale(1.05);
      filter: blur(8px);
    }
  }
`;

// ─── SplashScreen Component ────────────────────────────────────────────────

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Check if splash has already been shown in this session
    try {
      const alreadyShown = sessionStorage.getItem("seyol_splash_shown");
      if (alreadyShown) {
        setHidden(true);
        onComplete?.();
        return;
      }
    } catch (e) {
      // ignore
    }

    setHidden(false);
    document.body.style.overflow = "hidden";

    // Begin exit transition at 1.4s
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1400);

    // Unmount completely at 1.9s
    const hideTimer = setTimeout(() => {
      dismissSplash();
    }, 1900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const dismissSplash = () => {
    try {
      sessionStorage.setItem("seyol_splash_shown", "true");
    } catch (e) {}
    setHidden(true);
    document.body.style.overflow = "";
    onComplete?.();
  };

  if (hidden) return null;

  return (
    <div
      id="seyol-splash-overlay"
      onClick={dismissSplash}
      className="cursor-pointer"
      title="Click anywhere to skip"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 35%, #7b1131 0%, #5a0c24 55%, #2d0512 100%)",
        animation: exiting ? "seyol-splash-exit 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Keyframes Style Block ── */}
      <style>{SPLASH_STYLES}</style>

      {/* ── Skip Button Top-Right ── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissSplash();
        }}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 10,
          background: "rgba(200, 164, 93, 0.15)",
          border: "1px solid rgba(200, 164, 93, 0.35)",
          color: "#e4cf9e",
          padding: "0.4rem 0.9rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
          transition: "all 0.2s ease",
        }}
      >
        Skip &rarr;
      </button>

      {/* ── SVG Goo Filter ── */}
      <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="seyol-slogan-goo">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Background Ambient Rings & Glows ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-15%", left: "-15%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,164,93,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-15%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,164,93,0.08) 0%, transparent 70%)",
        }} />

        {/* Decorative Spinning Gold Rings */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: "min(88vw, 620px)", height: "min(88vw, 620px)",
          borderRadius: "50%",
          border: "1px solid rgba(200,164,93,0.2)",
          animation: "seyol-ring-spin 24s linear infinite",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: "min(75vw, 500px)", height: "min(75vw, 500px)",
          borderRadius: "50%",
          border: "1px dashed rgba(200,164,93,0.12)",
          animation: "seyol-ring-rev 16s linear infinite",
        }} />
      </div>

      {/* ── Main Center Content Card ── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(1.4rem, 4vw, 2.2rem)",
        padding: "1.5rem",
        textAlign: "center",
        width: "95vw",
        maxWidth: "850px",
        margin: "0 auto",
      }}>
        {/* Transparent Logo with Golden Bloom Glow */}
        <div style={{
          animation: "seyol-logo-bloom 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both",
          filter: "drop-shadow(0 0 45px rgba(200,164,93,0.45)) drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Image
            src={logoSrc}
            alt="SEYOL Mother & Baby Care"
            width={220}
            height={220}
            priority
            unoptimized
            style={{
              width: "clamp(130px, 20vw, 190px)",
              height: "auto",
              borderRadius: "50%",
              display: "block",
            }}
          />
        </div>

        {/* Gold Divider Line */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          width: "clamp(180px, 45vw, 360px)",
          margin: "0 auto",
          animation: "seyol-fade-up 0.8s ease-out 0.4s both",
        }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,164,93,0.6))" }} />
          <span style={{ color: "#c8a45d", fontSize: "0.95rem" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(200,164,93,0.6))" }} />
        </div>

        {/* Perfectly Centered Slogan Animation Container */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "3.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontFamily: '"Playfair Display", "Cinzel", Georgia, serif',
          filter: "url(#seyol-slogan-goo)",
          margin: "0 auto",
        }}>
          {/* Phrase 1: TRADITIONAL CARE */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              whiteSpace: "nowrap",
              fontSize: "clamp(1.2rem, 4.2vw, 2.3rem)",
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, #a6833d 0%, #c8a45d 50%, #e4cf9e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "seyol-slogan-phrase-1 1.0s cubic-bezier(0.4, 0, 0.2, 1) 0.4s 1 forwards",
              opacity: 0,
            }}
          >
            TRADITIONAL CARE
          </span>

          {/* Phrase 2: FOR MODERN PARENTHOOD */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              whiteSpace: "nowrap",
              fontSize: "clamp(1rem, 3.4vw, 1.85rem)",
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #a6833d 0%, #c8a45d 50%, #e4cf9e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "seyol-slogan-phrase-2 1.0s cubic-bezier(0.4, 0, 0.2, 1) 1.4s 1 forwards",
              opacity: 0,
            }}
          >
            FOR MODERN PARENTHOOD
          </span>
        </div>

        {/* Subtitle */}
        <p style={{
          color: "#e4cf9e",
          fontFamily: '"Playfair Display", "Cinzel", Georgia, serif',
          fontSize: "clamp(0.72rem, 1.8vw, 0.9rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin: "0 auto",
          opacity: 0.85,
          animation: "seyol-fade-up 0.8s ease-out 0.5s both",
          textAlign: "center",
        }}>
          SEYOL MOTHER & BABY CARE
        </p>

        {/* Staggered Gold Dots */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          marginTop: "0.2rem",
          animation: "seyol-fade-up 0.6s ease-out 0.8s both",
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#c8a45d",
                animation: `seyol-pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
