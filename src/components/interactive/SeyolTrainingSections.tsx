'use client';

import React, { useState } from "react";
import "./SeyolTrainingSections.css";

const pathwaySteps = [
  {
    number: "01",
    title: "Discover Your Training",
    subtitle: "Start Your Journey",
    description:
      "Explore available training programs, course options and learning requirements.",
    detail:
      "Find a training pathway that matches your interests and career goals.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Learn Practical Skills",
    subtitle: "Build Your Knowledge",
    description:
      "Learn through guided lessons, demonstrations and practical learning activities.",
    detail:
      "Develop your understanding of mother and baby care through structured learning.",
    icon: "♡",
  },
  {
    number: "03",
    title: "Complete Your Assessment",
    subtitle: "Demonstrate Your Skills",
    description:
      "Show your understanding and practical abilities through the relevant assessments.",
    detail:
      "Receive feedback on your learning progress and assessment performance.",
    icon: "✓",
  },
  {
    number: "04",
    title: "Explore Career Opportunities",
    subtitle: "Take Your Next Step",
    description:
      "Explore relevant SEYOL career opportunities based on your skills and eligibility.",
    detail:
      "Discover potential opportunities subject to available roles and requirements.",
    icon: "↗",
  },
];

const learningSkills = [
  {
    id: 1,
    title: "Newborn Care",
    description:
      "Understand newborn handling, everyday care and essential routines.",
    image: "/images/training-newborn-care.jpg",
    number: "01",
  },
  {
    id: 2,
    title: "Infant Massage",
    description:
      "Explore gentle massage techniques through practical demonstrations.",
    image: "/images/training-infant-massage.jpg",
    number: "02",
  },
  {
    id: 3,
    title: "Maternity Support",
    description:
      "Understand maternal needs and supportive care practices.",
    image: "/images/training-maternity-support.jpg",
    number: "03",
  },
  {
    id: 4,
    title: "Baby Bathing",
    description:
      "Learn bath preparation, hygiene and appropriate handling techniques.",
    image: "/images/training-baby-bathing.jpg",
    number: "04",
  },
  {
    id: 5,
    title: "Baby Dressing & Swaddling",
    description:
      "Explore practical dressing and wrapping techniques for babies.",
    image: "/images/training-baby-dressing.jpg",
    number: "05",
  },
  {
    id: 6,
    title: "Family Communication",
    description:
      "Build communication skills and understand family support needs.",
    image: "/images/training-family-communication.jpg",
    number: "06",
  },
];

function TrainingPathway() {
  const [activeStep, setActiveStep] = useState(0);

  const step = pathwaySteps[activeStep];

  return (
    <section className="sey-training-pathway">
      <div className="sey-training-container">

        <div className="sey-training-heading">
          <span className="sey-training-eyebrow">
            YOUR JOURNEY STARTS HERE
          </span>

          <h2>
            The SEYOL <span>Training Pathway</span>
          </h2>

          <p>
            From learning essential skills to exploring opportunities
            with SEYOL, discover the steps along your journey.
          </p>
        </div>

        <div className="sey-pathway-layout">

          {/* Left visual */}
          <div className="sey-pathway-visual">
            <img
              src="/images/seyol-training-pathway.jpg"
              alt="SEYOL practical training"
            />

            <div className="sey-pathway-image-overlay">
              <span>LEARN · PRACTICE · GROW</span>
              <h3>
                Every new skill
                <br />
                opens a new possibility.
              </h3>
            </div>
          </div>

          {/* Right pathway */}
          <div className="sey-pathway-content">
            <div className="sey-pathway-timeline">
              {pathwaySteps.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  className={`sey-pathway-step ${
                    activeStep === index ? "active" : ""
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="sey-pathway-number">
                    {item.number}
                  </span>

                  <span className="sey-pathway-step-text">
                    <small>{item.subtitle}</small>
                    <strong>{item.title}</strong>
                  </span>

                  <span className="sey-pathway-arrow">
                    {activeStep === index ? "−" : "+"}
                  </span>
                </button>
              ))}
            </div>

            <div className="sey-pathway-detail">
              <span className="sey-pathway-detail-icon">
                {step.icon}
              </span>

              <div>
                <span className="sey-pathway-detail-label">
                  STEP {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <small>{step.detail}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="sey-pathway-cta">
          <div>
            <span>YOUR NEXT CHAPTER BEGINS HERE</span>
            <h3>Ready to begin your learning journey?</h3>
            <p>
              Explore training options and discover where
              your skills can take you.
            </p>
          </div>

          <a href="#in-house-training">
            Explore SEYOL Training <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatYouCanLearn() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <section className="sey-learn-skills">
      <div className="sey-training-container">

        <div className="sey-training-heading">
          <span className="sey-training-eyebrow">
            BUILD PRACTICAL KNOWLEDGE
          </span>

          <h2>
            What You Can <span>Learn</span>
          </h2>

          <p>
            Explore practical learning areas designed around
            mother and baby care.
          </p>
        </div>

        <div className="sey-skills-grid">
          {learningSkills.map((skill) => (
            <article
              className={`sey-skill-card ${
                selectedSkill === skill.id ? "selected" : ""
              }`}
              key={skill.id}
              onMouseEnter={() => setSelectedSkill(skill.id)}
              onMouseLeave={() => setSelectedSkill(null)}
            >
              <div className="sey-skill-image">
                <img src={skill.image} alt={skill.title} />

                <span className="sey-skill-number">
                  {skill.number}
                </span>

                <span className="sey-skill-image-arrow">↗</span>
              </div>

              <div className="sey-skill-content">
                <h3>{skill.title}</h3>

                <p>{skill.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="sey-skills-bottom">
          <div>
            <span>LEARNING WITH PURPOSE</span>
            <h3>Turn knowledge into practical skills.</h3>
            <p>
              Discover the training options available at SEYOL.
            </p>
          </div>

          <a href="#in-house-training">
            Explore Training Programs <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default function SeyolTrainingSections() {
  return (
    <>
      <TrainingPathway />
      <WhatYouCanLearn />
    </>
  );
}
