'use client';

import React, { useState } from "react";
import { BookOpen } from "lucide-react";

const MAROON = "#651F32";
const CREAM = "#FAF5ED";

const curriculum = [
  {
    title: "Module 1: The First 30 Days of Mother & Baby",
    topics: [
      "Understanding physical postpartum recovery (uterus involution, lochia, scar care)",
      "Newborn sensory cues, sleep intervals, and hunger benchmarks",
      "Hygiene and cross-contamination prevention in family homes",
    ],
  },
  {
    title: "Module 2: Essential Newborn Handling & Safe Bathing",
    topics: [
      "Umbilical cord hygiene, sponge bathing, and seated leg-stretch bath ergonomics",
      "Hip-healthy swaddling techniques and startle reflex management",
      "Diapering, diaper rash soothing, and temperature monitoring",
    ],
  },
  {
    title: "Module 3: Introduction to Confinement Nourishment",
    topics: [
      "Principles of warm, easily digestible confinement meals",
      "Hydration, herbal broths, and foods that promote gentle recovery",
      "Kitchen hygiene and dietary preference management for modern mothers",
    ],
  },
  {
    title: "Module 4: Client Communication & Household Professionalism",
    topics: [
      "Respecting family boundaries and privacy in nuclear homes",
      "Active listening, empathy, and calming parental anxiety",
      "Emergency escalation protocols and pediatrician referral guidelines",
    ],
  },
];

const faqs = [
  {
    question: "Who can apply for this training?",
    answer:
      "This foundation pathway is designed for people interested in maternal and newborn care. Final eligibility requirements must be confirmed by SEYOL.",
  },
  {
    question: "Do I need previous experience?",
    answer:
      "This page presents the programme as a foundation-level pathway. Any mandatory prerequisites should be confirmed with SEYOL.",
  },
  {
    question: "How long is the course?",
    answer:
      "Course duration has not been provided. Please contact SEYOL for the confirmed schedule.",
  },
  {
    question: "What is the course fee?",
    answer:
      "Fees have not been specified and are intentionally not displayed on this page.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificate availability, assessment thresholds and completion requirements must be confirmed by SEYOL.",
  },
  {
    question: "How do I apply?",
    answer:
      "Select Apply Now to open the application form for Foundation Confinement Care Training — Pathway 1.",
  },
];

export default function FoundationConfinementCare() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const applyNow = () => {
    window.location.href =
      "/careers/apply?pathway=foundation-confinement-care";
  };

  return (
    <main className="foundation-page">
      <style>{`
        .foundation-page {
          --maroon: ${MAROON};
          --cream: ${CREAM};
          --ink: #35282B;
          --muted: #76696B;
          --line: #E7DAD1;
          background: var(--cream);
          color: var(--ink);
          font-family: Inter, Arial, sans-serif;
        }

        .foundation-page * { box-sizing: border-box; }

        .foundation-container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .foundation-header {
          padding: 20px 0;
          background: var(--maroon);
          color: var(--cream);
        }

        .foundation-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .foundation-logo {
          font-family: Georgia, serif;
          font-size: 27px;
          letter-spacing: 2px;
        }

        .foundation-header small {
          color: #EAD9DC;
          letter-spacing: 1.4px;
          font-size: 10px;
        }

        .foundation-breadcrumb {
          padding: 22px 0;
          color: var(--muted);
          font-size: 13px;
        }

        .foundation-breadcrumb a {
          color: var(--maroon);
          text-decoration: none;
        }

        .foundation-hero {
          padding: 64px 0 72px;
          background: #F1E5D9;
        }

        .foundation-hero-content {
          max-width: 760px;
        }

        .foundation-eyebrow {
          color: var(--maroon);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .foundation-page h1,
        .foundation-page h2,
        .foundation-page h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
        }

        .foundation-page h1 {
          margin: 18px 0;
          color: var(--maroon);
          font-size: clamp(38px, 5vw, 60px);
          line-height: 1.12;
        }

        .foundation-page p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .foundation-hero p { max-width: 590px; }

        .foundation-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .foundation-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 48px;
          padding: 13px 23px;
          border: 1px solid var(--maroon);
          border-radius: 3px;
          background: var(--maroon);
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity .2s, transform .2s;
        }

        .foundation-button:hover {
          opacity: .9;
          transform: translateY(-2px);
        }

        .foundation-button-outline {
          background: transparent;
          color: var(--maroon);
        }



        .foundation-section { padding: 76px 0; }
        .foundation-section-white { background: #FFFCF8; }

        .foundation-heading {
          max-width: 720px;
          margin-bottom: 34px;
        }

        .foundation-heading h2 {
          margin: 12px 0;
          color: var(--maroon);
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.2;
        }

        .foundation-two-col {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .foundation-card {
          padding: 28px;
          border: 1px solid var(--line);
          background: #FFFCF8;
        }

        .foundation-card h3 {
          margin: 0 0 14px;
          color: var(--maroon);
          font-size: 24px;
        }

        .foundation-card ul {
          padding-left: 20px;
          margin: 0;
        }

        .foundation-card li {
          padding: 5px 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .foundation-curriculum-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #721832;
          font-family: Georgia, serif;
          font-size: 16px;
          font-weight: 700;
        }

        .foundation-book-icon {
          color: #A87C4F;
          flex-shrink: 0;
        }

        .foundation-curriculum-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .foundation-curriculum-card {
          padding: 22px 28px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: #FAF5ED;
          box-shadow: 0 1px 3px rgba(101, 31, 50, 0.03);
          transition: border-color .2s, box-shadow .2s;
        }

        .foundation-curriculum-card:hover {
          border-color: #D6C2B4;
          box-shadow: 0 4px 14px rgba(101, 31, 50, 0.05);
        }

        .foundation-module-title {
          margin: 0 0 12px;
          color: var(--maroon);
          font-family: Inter, Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .foundation-module-topics {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .foundation-module-topics li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #5A484C;
          font-size: 14px;
          line-height: 1.6;
        }

        .foundation-bullet {
          color: #A87C4F;
          font-size: 16px;
          font-weight: bold;
          line-height: 1.3;
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .foundation-curriculum-card {
            padding: 18px 20px;
            border-radius: 14px;
          }

          .foundation-module-title {
            font-size: 15px;
          }

          .foundation-module-topics li {
            font-size: 13px;
          }
        }

        .foundation-modules {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .foundation-module {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 24px;
          border: 1px solid var(--line);
          background: #FFFCF8;
        }

        .foundation-number {
          flex: 0 0 40px;
          color: #B18B79;
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .foundation-module h3 {
          margin: 0 0 8px;
          color: var(--maroon);
          font-size: 20px;
        }

        .foundation-module p {
          margin: 0;
          font-size: 13px;
        }

        .foundation-steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .foundation-step {
          padding: 25px;
          border-top: 3px solid var(--maroon);
          background: #F1E5D9;
        }

        .foundation-step h3 {
          color: var(--maroon);
          font-size: 23px;
        }

        .foundation-step p { font-size: 14px; }

        .foundation-notice {
          margin-top: 20px;
          padding: 20px;
          border-left: 3px solid var(--maroon);
          background: #F1E5D9;
        }

        .foundation-faq-section {
          max-width: 850px;
          margin: 0 auto;
        }

        .foundation-faq-heading {
          text-align: center;
          margin: 0 auto 36px;
        }

        .foundation-faq-heading h2 {
          margin: 12px 0 0;
          color: var(--maroon);
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.2;
        }

        .foundation-faq-list {
          max-width: 850px;
          margin: 0 auto;
        }

        .foundation-faq {
          border-bottom: 1px solid var(--line);
        }

        .foundation-faq button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          width: 100%;
          padding: 21px 0;
          border: 0;
          background: transparent;
          color: var(--maroon);
          cursor: pointer;
          text-align: left;
          font-size: 15px;
          font-weight: 600;
        }

        .foundation-faq-answer {
          padding: 0 25px 20px 0;
        }

        .foundation-cta {
          padding: 55px 25px;
          background: var(--maroon);
          color: var(--cream);
          text-align: center;
        }

        .foundation-cta h2 {
          max-width: 650px;
          margin: 0 auto 14px;
          color: var(--cream);
          font-size: clamp(30px, 4vw, 42px);
        }

        .foundation-cta p {
          max-width: 620px;
          margin: 0 auto;
          color: #EAD9DC;
        }

        .foundation-cta .foundation-button {
          margin-top: 25px;
          border-color: var(--cream);
          background: var(--cream);
          color: var(--maroon);
        }

        @media (max-width: 760px) {
          .foundation-container {
            width: calc(100% - 32px);
          }

          .foundation-hero { padding: 42px 0; }

                    .foundation-two-col,
          .foundation-modules,
          .foundation-steps {
            grid-template-columns: 1fr;
          }

                    
          .foundation-section { padding: 52px 0; }
          .foundation-card { padding: 22px; }
          .foundation-module { padding: 20px; }
          .foundation-header small { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .foundation-button { transition: none; }
        }
      `}</style>

      <header className="foundation-header">
        <div className="foundation-container foundation-header-inner">
          <div>
            <div className="foundation-logo">SEYOL</div>
            <small>MATERNAL &amp; NEWBORN CARE</small>
          </div>
          <span>Careers &amp; Training</span>
        </div>
      </header>

      <div className="foundation-container">
        <nav className="foundation-breadcrumb" aria-label="Breadcrumb">
          <a href="/careers">Careers &amp; Training</a>
          {" / "}
          <a href="/careers/training">In-House Training</a>
          {" / Foundation Confinement Care"}
        </nav>
      </div>

      <section className="foundation-hero">
        <div className="foundation-container">
          <div className="foundation-hero-content">
            <span className="foundation-eyebrow">
              Pathway 1 · Foundation Level
            </span>

            <h1>Foundation Confinement Care Training</h1>

            <p>
              Build a foundation in traditional Indian maternal and
              newborn care through structured learning, responsible
              caregiving principles and compassionate family support.
            </p>

            <div className="foundation-actions">
              <button className="foundation-button" onClick={applyNow}>
                Apply Now →
              </button>
              <a
                className="foundation-button foundation-button-outline"
                href="#curriculum"
              >
                Explore Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="foundation-section">
        <div className="foundation-container">
          <div className="foundation-heading">
            <span className="foundation-eyebrow">01 · Overview</span>
            <h2>Start your learning journey with SEYOL</h2>
            <p>
              This foundation-level pathway introduces maternal
              recovery, newborn care essentials, traditional care
              practices and safe caregiving responsibilities.
            </p>
          </div>

          <div className="foundation-two-col">
            <article className="foundation-card">
              <h3>Who is this for?</h3>
              <ul>
                <li>Beginners interested in maternal and newborn care.</li>
                <li>Aspiring confinement care practitioners.</li>
                <li>Learners interested in traditional Indian care.</li>
                <li>Individuals seeking foundational caregiving knowledge.</li>
              </ul>
            </article>

            <article className="foundation-card">
              <h3>Learning outcomes</h3>
              <ul>
                <li>Understand postpartum recovery and wellbeing.</li>
                <li>Recognise newborn hygiene and safe handling basics.</li>
                <li>Understand respectful communication and privacy.</li>
                <li>Recognise when qualified medical support is needed.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section
        id="curriculum"
        className="foundation-section foundation-section-white"
      >
        <div className="foundation-container">
          <div className="foundation-heading">
            <span className="foundation-eyebrow">02 · Curriculum</span>
            <h2>A structured foundation curriculum</h2>
            <p>
              A structured, beginner-friendly immersion into the fundamentals of fourth-trimester maternal care, newborn biology, soothing crying babies, traditional warmth preservation, and compassionate communication.
            </p>
          </div>

          <div className="foundation-curriculum-header">
            <BookOpen className="foundation-book-icon" size={18} />
            <span>Curriculum Modules:</span>
          </div>

          <div className="foundation-curriculum-list">
            {curriculum.map((module, index) => (
              <article className="foundation-curriculum-card" key={index}>
                <h3 className="foundation-module-title">{module.title}</h3>
                <ul className="foundation-module-topics">
                  {module.topics.map((topic, tIdx) => (
                    <li key={tIdx}>
                      <span className="foundation-bullet">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="foundation-section">
        <div className="foundation-container">
          <div className="foundation-heading">
            <span className="foundation-eyebrow">03 · Delivery format</span>
            <h2>Learn, understand and review</h2>
          </div>

          <div className="foundation-steps">
            <article className="foundation-step">
              <span className="foundation-eyebrow">Step 01</span>
              <h3>Learn</h3>
              <p>
                Explore core concepts using educational resources and
                trainer-led learning, where provided.
              </p>
            </article>

            <article className="foundation-step">
              <span className="foundation-eyebrow">Step 02</span>
              <h3>Explore</h3>
              <p>
                Participate in discussions, demonstrations or practical
                activities if included in the approved programme.
              </p>
            </article>

            <article className="foundation-step">
              <span className="foundation-eyebrow">Step 03</span>
              <h3>Review</h3>
              <p>
                Complete the knowledge checks and other assessment
                activities required by SEYOL.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="foundation-section foundation-section-white">
        <div className="foundation-container">
          <div className="foundation-heading">
            <span className="foundation-eyebrow">04 · Eligibility</span>
            <h2>Before you apply</h2>
            <p>
              Review SEYOL's official admission requirements before
              submitting your application.
            </p>
          </div>

          <div className="foundation-two-col">
            <article className="foundation-card">
              <h3>Application checklist</h3>
              <ul>
                <li>Read the published entry requirements.</li>
                <li>Provide accurate applicant and contact information.</li>
                <li>Submit supporting documents if requested.</li>
                <li>Confirm attendance and participation requirements.</li>
              </ul>
            </article>

            <article className="foundation-card">
              <h3>Assessment &amp; certification</h3>
              <ul>
                <li>Knowledge checks, if specified by SEYOL.</li>
                <li>Learning activity review, if applicable.</li>
                <li>Practical assessment, if part of the programme.</li>
                <li>Completion and certificate criteria confirmed by SEYOL.</li>
              </ul>
            </article>
          </div>

          <div className="foundation-notice">
            <strong>Important programme information</strong>
            <p>
              Course fees, duration, entry qualifications, delivery
              schedule and certificate rules have not been provided.
              Confirm these details with SEYOL before enrolment.
            </p>
          </div>
        </div>
      </section>

      <section className="foundation-section">
        <div className="foundation-container">
          <div className="foundation-faq-section">
            <div className="foundation-faq-heading">
              <span className="foundation-eyebrow">Frequently asked questions</span>
              <h2>Questions before you begin?</h2>
            </div>

            <div className="foundation-faq-list">
              {faqs.map((faq, index) => (
                <div className="foundation-faq" key={faq.question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <span>{faq.question}</span>
                  <span>{openFaq === index ? "−" : "+"}</span>
                </button>

                {openFaq === index && (
                  <div className="foundation-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="foundation-container">
        <div className="foundation-cta">
          <span className="foundation-eyebrow" style={{ color: "#EAD9DC" }}>
            YOUR JOURNEY STARTS HERE
          </span>
          <h2>Begin with the foundations of care</h2>
          <p>
            Explore Pathway 1 and take the next step towards learning
            about maternal and newborn care.
          </p>
          <button className="foundation-button" onClick={applyNow}>
            Apply for Foundation Training →
          </button>
        </div>
      </section>

      <div style={{ height: 60 }} />
    </main>
  );
}

