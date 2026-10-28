'use client';

import React from "react";

const qualities = [
  {
    number: "01",
    icon: "♡",
    title: "Compassion & Empathy",
    description:
      "Treat every mother, baby and family with kindness, patience and respect.",
  },
  {
    number: "02",
    icon: "♢",
    title: "Safety First",
    description:
      "Follow hygiene standards, safe care practices and professional boundaries.",
  },
  {
    number: "03",
    icon: "✧",
    title: "Willingness to Learn",
    description:
      "Stay open to training, constructive feedback and continuous improvement.",
  },
  {
    number: "04",
    icon: "☏",
    title: "Communication",
    description:
      "Listen carefully, communicate clearly and respect family privacy.",
  },
];

const expectations = [
  "Demonstrate reliability and a responsible attitude.",
  "Respect cultural differences and individual family preferences.",
  "Follow instructions and seek guidance when unsure.",
  "Recognise when qualified medical support is needed.",
];

export default function WhatSEYOLLooksFor() {
  const handleExploreTraining = () => {
    const el = document.getElementById("choose-path") || document.getElementById("training-courses");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/careers/training";
    }
  };

  return (
    <section className="seyol-expectations">
      <style>{`
        .seyol-expectations {
          --seyol-maroon: #651F32;
          --seyol-cream: #FAF5ED;
          --seyol-ink: #392B2E;
          --seyol-muted: #756567;
          --seyol-border: #E8DCD3;
          padding: 80px 0;
          background: var(--seyol-cream);
          color: var(--seyol-ink);
          font-family: Inter, Arial, sans-serif;
        }

        .seyol-expectations * {
          box-sizing: border-box;
        }

        .seyol-expectations-container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .seyol-expectations-heading {
          max-width: 760px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .seyol-expectations-eyebrow {
          color: var(--seyol-maroon);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .seyol-expectations-heading h2 {
          margin: 14px 0;
          color: var(--seyol-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 4vw, 46px);
          font-weight: 500;
          line-height: 1.2;
        }

        .seyol-expectations-heading p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--seyol-muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .seyol-quality-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .seyol-quality-card {
          padding: 25px 22px;
          border: 1px solid var(--seyol-border);
          border-radius: 16px;
          background: #FFFCF8;
          transition: transform .2s, box-shadow .2s;
        }

        .seyol-quality-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(101, 31, 50, .08);
        }

        .seyol-quality-icon {
          display: grid;
          width: 48px;
          height: 48px;
          margin-bottom: 20px;
          place-items: center;
          border: 1px solid var(--seyol-border);
          border-radius: 14px;
          background: #F7F0E8;
          color: var(--seyol-maroon);
          font-family: Georgia, serif;
          font-size: 28px;
        }

        .seyol-quality-card h3 {
          margin: 0 0 12px;
          color: var(--seyol-maroon);
          font-family: Georgia, serif;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.35;
        }

        .seyol-quality-card p {
          margin: 0;
          color: var(--seyol-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .seyol-expectations-panel {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 42px;
          margin-top: 38px;
          padding: 36px;
          border-radius: 16px;
          background: #F0E5DA;
        }

        .seyol-expectations-panel h3 {
          margin: 12px 0;
          color: var(--seyol-maroon);
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.3;
        }

        .seyol-expectations-panel > div:first-child p {
          color: var(--seyol-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .seyol-expectations-list {
          display: grid;
          gap: 20px;
          align-content: center;
        }

        .seyol-expectation-item {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .seyol-expectation-check {
          display: grid;
          flex: 0 0 27px;
          width: 27px;
          height: 27px;
          place-items: center;
          border-radius: 50%;
          background: var(--seyol-maroon);
          color: white;
          font-size: 14px;
        }

        .seyol-expectation-item p {
          margin: 2px 0 0;
          color: var(--seyol-ink);
          font-size: 14px;
          line-height: 1.7;
        }

        .seyol-expectations-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 24px;
          padding: 30px;
          border-radius: 12px;
          background: var(--seyol-maroon);
          color: var(--seyol-cream);
        }

        .seyol-expectations-cta h3 {
          margin: 0 0 9px;
          font-family: Georgia, serif;
          font-size: 27px;
          font-weight: 500;
        }

        .seyol-expectations-cta p {
          margin: 0;
          color: #EAD9DC;
          font-size: 13px;
          line-height: 1.8;
        }

        .seyol-expectations-button {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 49px;
          padding: 13px 22px;
          border: 1px solid var(--seyol-cream);
          border-radius: 4px;
          background: var(--seyol-cream);
          color: var(--seyol-maroon);
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        .seyol-expectations-button:hover {
          opacity: .88;
        }

        @media (max-width: 1000px) {
          .seyol-quality-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .seyol-expectations-panel {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .seyol-expectations {
            padding: 54px 0;
          }

          .seyol-expectations-container {
            width: calc(100% - 32px);
          }

          .seyol-expectations-heading {
            margin-bottom: 28px;
          }

          .seyol-quality-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .seyol-quality-card {
            padding: 22px;
          }

          .seyol-quality-icon {
            margin-bottom: 14px;
          }

          .seyol-expectations-panel {
            padding: 25px 20px;
          }

          .seyol-expectations-cta {
            flex-direction: column;
            align-items: stretch;
            padding: 25px 20px;
          }

          .seyol-expectations-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .seyol-quality-card {
            transition: none;
          }
        }
      `}</style>

      <div className="seyol-expectations-container">
        <header className="seyol-expectations-heading">
          <span className="seyol-expectations-eyebrow">
            Your Journey With SEYOL
          </span>

          <h2>What SEYOL Looks For</h2>

          <p>
            We value compassionate caregivers who are committed to
            safe practices, continuous learning and respectful
            support for mothers and babies.
          </p>
        </header>

        <div className="seyol-quality-grid">
          {qualities.map((quality) => (
            <article
              className="seyol-quality-card"
              key={quality.number}
            >
              <div className="seyol-quality-icon" aria-hidden="true">
                {quality.icon}
              </div>

              <h3>{quality.title}</h3>
              <p>{quality.description}</p>
            </article>
          ))}
        </div>

        <div className="seyol-expectations-panel">
          <div>
            <span className="seyol-expectations-eyebrow">
              Our Expectations
            </span>

            <h3>
              Care begins with compassion and responsibility.
            </h3>

            <p>
              A professional caregiving journey is built on empathy,
              continuous learning, safe practices and respect for
              every family.
            </p>
          </div>

          <div className="seyol-expectations-list">
            {expectations.map((expectation) => (
              <div
                className="seyol-expectation-item"
                key={expectation}
              >
                <span
                  className="seyol-expectation-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <p>{expectation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="seyol-expectations-cta">
          <div>
            <h3>Do these values resonate with you?</h3>
            <p>
              Explore SEYOL's training pathways and discover your
              next learning step.
            </p>
          </div>

          <button
            type="button"
            className="seyol-expectations-button"
            onClick={handleExploreTraining}
          >
            Explore Training Pathways <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

