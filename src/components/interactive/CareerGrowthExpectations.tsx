'use client';

import React from "react";
import "./CareerGrowthExpectations.css";

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

