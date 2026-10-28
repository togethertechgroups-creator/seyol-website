'use client';

import React from "react";

const careerStages = [
  {
    number: "01",
    title: "Foundation Skills",
    description:
      "Build essential knowledge of maternal wellbeing, newborn care and professional caregiving.",
    icon: "📘",
  },
  {
    number: "02",
    title: "Practical Experience",
    description:
      "Develop practical skills through approved training activities and supervised learning.",
    icon: "🤱",
  },
  {
    number: "03",
    title: "Professional Development",
    description:
      "Strengthen communication, safety awareness, confidence and professional responsibilities.",
    icon: "🌱",
  },
  {
    number: "04",
    title: "Career Opportunities",
    description:
      "Explore relevant caregiving opportunities based on your skills, experience and qualifications.",
    icon: "✦",
  },
];

const expectations = [
  "Show compassion and respect for mothers and babies.",
  "Remain committed to learning and professional development.",
  "Communicate clearly and respect client confidentiality.",
  "Follow hygiene, safety and professional boundaries.",
];

export default function CareerGrowthExpectations() {
  const exploreTraining = () => {
    const el = document.getElementById('training-courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "/careers#training-courses";
    }
  };

  return (
    <section className="career-growth">
      <style>{`
        .career-growth {
          --cg-maroon: #651F32;
          --cg-cream: #FAF5ED;
          --cg-text: #403336;
          --cg-muted: #76696B;
          --cg-border: #E7DAD1;
          padding: 80px 0;
          background: var(--cg-cream);
          color: var(--cg-text);
          font-family: Inter, Arial, sans-serif;
        }

        .career-growth * {
          box-sizing: border-box;
        }

        .cg-container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .cg-heading {
          max-width: 760px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .cg-eyebrow {
          color: var(--cg-maroon);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .cg-heading h2 {
          margin: 15px 0;
          color: var(--cg-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          line-height: 1.2;
        }

        .cg-heading p {
          max-width: 660px;
          margin: 0 auto;
          color: var(--cg-muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .cg-banner {
          position: relative;
          display: flex;
          min-height: 280px;
          align-items: flex-end;
          overflow: hidden;
          margin-bottom: 56px;
          padding: 32px;
          border-radius: 8px;
          background:
            linear-gradient(
              90deg,
              rgba(55, 19, 32, .85),
              rgba(55, 19, 32, .15)
            ),
            url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85")
            center 42% / cover;
        }

        .cg-banner-content {
          max-width: 520px;
          color: white;
        }

        .cg-banner-content span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .cg-banner-content h3 {
          margin: 12px 0 0;
          font-family: Georgia, serif;
          font-size: clamp(27px, 3vw, 38px);
          font-weight: 500;
          line-height: 1.3;
        }

        .cg-stages {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 64px;
        }

        .cg-stage {
          padding: 24px 20px;
          border: 1px solid var(--cg-border);
          border-radius: 6px;
          background: #FFFCF8;
          transition: transform .2s, box-shadow .2s;
        }

        .cg-stage:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 26px rgba(101, 31, 50, .08);
        }

        .cg-stage-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 24px;
        }

        .cg-stage-number {
          color: #B18B79;
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .cg-stage-icon {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border-radius: 50%;
          background: #F1E5D9;
          font-size: 21px;
        }

        .cg-stage h3 {
          margin: 0 0 10px;
          color: var(--cg-maroon);
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.35;
        }

        .cg-stage p {
          margin: 0;
          color: var(--cg-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .cg-expectations {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 48px;
          align-items: start;
          padding: 40px;
          border-radius: 8px;
          background: #F1E5D9;
        }

        .cg-expectations h3 {
          margin: 12px 0;
          color: var(--cg-maroon);
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: 500;
          line-height: 1.25;
        }

        .cg-expectations-intro {
          color: var(--cg-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .cg-expectations-list {
          display: grid;
          gap: 20px;
        }

        .cg-expectation {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .cg-check {
          display: grid;
          flex: 0 0 27px;
          width: 27px;
          height: 27px;
          place-items: center;
          border-radius: 50%;
          background: var(--cg-maroon);
          color: white;
          font-size: 13px;
        }

        .cg-expectation p {
          margin: 2px 0 0;
          color: var(--cg-text);
          font-size: 14px;
          line-height: 1.7;
        }

        .cg-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 32px;
          padding: 30px;
          border-radius: 8px;
          background: var(--cg-maroon);
          color: var(--cg-cream);
        }

        .cg-cta h3 {
          margin: 0 0 8px;
          font-family: Georgia, serif;
          font-size: 26px;
          font-weight: 500;
        }

        .cg-cta p {
          margin: 0;
          color: #EAD9DC;
          font-size: 13px;
          line-height: 1.8;
        }

        .cg-cta-button {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 48px;
          padding: 13px 22px;
          border: 1px solid var(--cg-cream);
          border-radius: 3px;
          background: var(--cg-cream);
          color: var(--cg-maroon);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: opacity .2s;
        }

        .cg-cta-button:hover {
          opacity: .88;
        }

        @media (max-width: 960px) {
          .cg-stages {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .cg-expectations {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 600px) {
          .career-growth {
            padding: 54px 0;
          }

          .cg-container {
            width: calc(100% - 32px);
          }

          .cg-heading {
            margin-bottom: 28px;
          }

          .cg-banner {
            min-height: 240px;
            margin-bottom: 36px;
            padding: 22px;
            background-position: center;
          }

          .cg-stages {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 38px;
          }

          .cg-stage {
            padding: 22px;
          }

          .cg-stage-top {
            margin-bottom: 14px;
          }

          .cg-expectations {
            padding: 25px 20px;
          }

          .cg-cta {
            flex-direction: column;
            align-items: stretch;
            padding: 25px 20px;
          }

          .cg-cta-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cg-stage,
          .cg-cta-button {
            transition: none;
          }
        }
      `}</style>

      <div className="cg-container">
        <header className="cg-heading">
          <h2>Learn with SEYOL. Grow with SEYOL.</h2>

          <p>
            Build your skills, grow your confidence, and explore
            opportunities in maternal and newborn care.
          </p>
        </header>

        <div className="cg-banner">
          <div className="cg-banner-content">
            <span>Your journey with SEYOL</span>
            <h3>
              Learn with purpose.
              <br />
              Grow with confidence.
            </h3>
          </div>
        </div>

        <div className="cg-heading">
          <span className="cg-eyebrow">Your growth journey</span>
          <h2>From learning to professional growth</h2>
          <p>
            Develop the knowledge, practical skills and professional
            values needed for responsible caregiving.
          </p>
        </div>

        <div className="cg-stages">
          {careerStages.map((stage) => (
            <article className="cg-stage" key={stage.number}>
              <div className="cg-stage-top">
                <span className="cg-stage-number">
                  {stage.number}
                </span>
                <span className="cg-stage-icon" aria-hidden="true">
                  {stage.icon}
                </span>
              </div>

              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>

        <div className="cg-expectations">
          <div>
            <span className="cg-eyebrow">Our expectations</span>
            <h3>Care begins with compassion and responsibility.</h3>
            <p className="cg-expectations-intro">
              A professional caregiving journey is built on
              empathy, continuous learning, safe practices and
              respect for every family.
            </p>
          </div>

          <div className="cg-expectations-list">
            {expectations.map((expectation) => (
              <div className="cg-expectation" key={expectation}>
                <span className="cg-check" aria-hidden="true">
                  ✓
                </span>
                <p>{expectation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cg-cta">
          <div>
            <h3>Ready to take your next step?</h3>
            <p>
              Explore SEYOL training pathways and find the right
              learning journey for you.
            </p>
          </div>

          <button
            type="button"
            className="cg-cta-button"
            onClick={exploreTraining}
          >
            Explore Training Pathways <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

