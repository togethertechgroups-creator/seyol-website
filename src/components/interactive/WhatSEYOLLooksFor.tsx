'use client';

import React from "react";
import "./WhatSEYOLLooksFor.css";

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

