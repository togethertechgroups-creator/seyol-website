'use client';

import React, { useState } from "react";
import { BookOpen } from "lucide-react";

const curriculum = [
  {
    title: "Module 1: Advanced Infant Bodywork & Traditional Bath Rituals",
    topics: [
      "Full-body infant massage (Thokkanam) stroke rhythms and pressure modulation",
      "Colic, trapped gas, and reflux release sequences (I-Love-U & bicycle strokes)",
      "Traditional herbal ubtan (Nalangu Maavu) application and safe head washing",
    ],
  },
  {
    title: "Module 2: Maternal Herbal Care & Traditional Belly Binding",
    topics: [
      "Postpartum herbal oil massage techniques for back, neck, and leg tension",
      "Traditional breathable cotton belly binding (Kattu) from pelvic bone to ribs",
      "Herbal compress (Kizhi) and warm fomentation safety protocols",
    ],
  },
  {
    title: "Module 3: Complex Feeding Support & Night Care Ergonomics",
    topics: [
      "Hands-on latch positioning assistance and paced bottle feeding",
      "Pumping schedules, safe breastmilk storage, and sterilisation workflows",
      "Organising restful night care routines so parents achieve restorative sleep",
    ],
  },
  {
    title: "Module 4: Traditional Medicinal Confinement Cookery",
    topics: [
      "Preparing authentic healing soups, garlic legiyams, thogayals, and kootus",
      "Customising menus for maternal dietary restrictions, vegetarian, and C-section healing",
      "Pantry organisation and efficient meal batching protocols",
    ],
  },
];

const faqs = [
  {
    question: "Who can join this training?",
    answer:
      "People interested in maternal and newborn care may apply. Check the current eligibility requirements before submitting your application.",
  },
  {
    question: "Is practical training included?",
    answer:
      "The programme is designed around practical learning. Exact sessions, supervision arrangements and training hours will be confirmed by SEYOL.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificate eligibility depends on the programme requirements, attendance and assessment. Please confirm certification details with SEYOL.",
  },
  {
    question: "How can I apply?",
    answer:
      "Click Apply Now to open the application form. Practical Care Training will be selected automatically.",
  },
];

export default function PracticalConfinementCare() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const applyNow = () => {
    window.location.href =
      "/careers/apply?pathway=practical-confinement-care";
  };

  return (
    <main className="seyol-page">
      <style>{`
        .seyol-page {
          --maroon: #651F32;
          --cream: #FAF5ED;
          --ink: #33272A;
          --muted: #766A6B;
          --line: #E8DCD3;
          background: var(--cream);
          color: var(--ink);
          font-family: Inter, Arial, sans-serif;
        }

        .seyol-page * { box-sizing: border-box; }

        .seyol-container {
          width: min(1160px, calc(100% - 40px));
          margin: 0 auto;
        }

        .seyol-breadcrumb {
          padding: 24px 0;
          color: var(--muted);
          font-size: 13px;
        }

        .seyol-breadcrumb a {
          color: var(--maroon);
          text-decoration: none;
        }

        .seyol-hero {
          padding: 64px 0 72px;
          background: #F1E5D9;
        }

        .seyol-hero-content {
          max-width: 760px;
        }

        .seyol-eyebrow {
          color: var(--maroon);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .seyol-hero h1 {
          max-width: 700px;
          margin: 18px 0;
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 500;
          line-height: 1.1;
        }

        .seyol-hero p {
          max-width: 610px;
          color: #66575A;
          font-size: 16px;
          line-height: 1.9;
        }

        .seyol-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .seyol-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border: 1px solid var(--maroon);
          border-radius: 3px;
          background: var(--maroon);
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity .2s, transform .2s;
        }

        .seyol-button:hover {
          opacity: .9;
          transform: translateY(-2px);
        }

        .seyol-button-outline {
          background: transparent;
          color: var(--maroon);
        }



        .seyol-section {
          padding: 76px 0;
        }

        .seyol-section-white { background: #FFFCF8; }

        .seyol-section-heading {
          max-width: 720px;
          margin-bottom: 36px;
        }

        .seyol-section-heading h2 {
          margin: 12px 0;
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 500;
          line-height: 1.2;
        }

        .seyol-section-heading p {
          color: var(--muted);
          line-height: 1.8;
        }

        .seyol-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .seyol-info-card {
          padding: 28px;
          border: 1px solid var(--line);
          background: #FFFCF8;
        }

        .seyol-info-card h3 {
          margin: 0 0 12px;
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: 23px;
          font-weight: 500;
        }

        .seyol-info-card p,
        .seyol-info-card li {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .seyol-info-card ul {
          padding-left: 20px;
          margin-bottom: 0;
        }

        .seyol-curriculum-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #721832;
          font-family: Georgia, serif;
          font-size: 16px;
          font-weight: 700;
        }

        .seyol-book-icon {
          color: #A87C4F;
          flex-shrink: 0;
        }

        .seyol-curriculum-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .seyol-curriculum-card {
          padding: 22px 28px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: #FAF5ED;
          box-shadow: 0 1px 3px rgba(101, 31, 50, 0.03);
          transition: border-color .2s, box-shadow .2s;
        }

        .seyol-curriculum-card:hover {
          border-color: #D6C2B4;
          box-shadow: 0 4px 14px rgba(101, 31, 50, 0.05);
        }

        .seyol-module-title {
          margin: 0 0 12px;
          color: var(--maroon);
          font-family: Inter, Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .seyol-module-topics {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .seyol-module-topics li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #5A484C;
          font-size: 14px;
          line-height: 1.6;
        }

        .seyol-bullet {
          color: #A87C4F;
          font-size: 16px;
          font-weight: bold;
          line-height: 1.3;
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .seyol-curriculum-card {
            padding: 18px 20px;
            border-radius: 14px;
          }

          .seyol-module-title {
            font-size: 15px;
          }

          .seyol-module-topics li {
            font-size: 13px;
          }
        }

        .seyol-curriculum {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .seyol-module {
          display: flex;
          gap: 20px;
          padding: 25px;
          border: 1px solid var(--line);
          background: #FFFCF8;
        }

        .seyol-module-number {
          flex: 0 0 42px;
          color: #B18B79;
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .seyol-module h3 {
          margin: 2px 0 10px;
          color: var(--maroon);
          font-size: 17px;
        }

        .seyol-module p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .seyol-steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .seyol-step {
          padding: 26px;
          border-top: 3px solid var(--maroon);
          background: #F4EBE2;
        }

        .seyol-step h3 {
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 500;
        }

        .seyol-step p {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .seyol-faq-section {
          max-width: 850px;
          margin: 0 auto;
        }

        .seyol-faq-heading {
          text-align: center;
          margin: 0 auto 36px;
        }

        .seyol-faq-heading h2 {
          margin: 12px 0 0;
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 500;
          line-height: 1.2;
        }

        .seyol-faq-list {
          max-width: 850px;
          margin: 0 auto;
        }

        .seyol-faq {
          border-bottom: 1px solid var(--line);
        }

        .seyol-faq button {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
          padding: 22px 0;
          border: 0;
          background: transparent;
          color: var(--maroon);
          cursor: pointer;
          text-align: left;
          font-size: 16px;
          font-weight: 600;
        }

        .seyol-faq-answer {
          padding: 0 30px 22px 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .seyol-cta {
          padding: 58px 32px;
          background: var(--maroon);
          color: white;
          text-align: center;
        }

        .seyol-cta h2 {
          margin: 0 auto 14px;
          max-width: 680px;
          font-family: Georgia, serif;
          font-size: clamp(30px, 4vw, 43px);
          font-weight: 500;
        }

        .seyol-cta p {
          max-width: 620px;
          margin: 0 auto;
          color: #F0DDE0;
          line-height: 1.8;
        }

        .seyol-cta .seyol-button {
          margin-top: 26px;
          border-color: var(--cream);
          background: var(--cream);
          color: var(--maroon);
        }

        @media (max-width: 760px) {
          .seyol-container {
            width: min(100% - 32px, 600px);
          }

          .seyol-hero { padding: 35px 0 45px; }

                    .seyol-two-col,
          .seyol-curriculum,
          .seyol-steps {
            grid-template-columns: 1fr;
          }

                              .seyol-section { padding: 52px 0; }
          .seyol-info-card { padding: 23px; }
          .seyol-module { padding: 20px; gap: 14px; }
          .seyol-cta { padding: 44px 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .seyol-button { transition: none; }
        }
      `}</style>

      <div className="seyol-container">
        <nav className="seyol-breadcrumb" aria-label="Breadcrumb">
          <a href="/careers">Careers &amp; Training</a>
          {" / "}
          <a href="/careers#training-courses">In-House Training</a>
          {" / "}
          <span>Practical Confinement Care</span>
        </nav>
      </div>

      <section className="seyol-hero">
        <div className="seyol-container">
          <div className="seyol-hero-content">
            <span className="seyol-eyebrow">
              SEYOL In-House Training · Pathway 2
            </span>

            <h1>
              Practical Confinement Care Training
            </h1>

            <p>
              Build practical knowledge of traditional Indian maternal
              and newborn care through guided learning, demonstrations
              and professional caregiving principles.
            </p>

            <div className="seyol-actions">
              <button className="seyol-button" onClick={applyNow}>
                Apply Now
              </button>

              <a
                className="seyol-button seyol-button-outline"
                href="#curriculum"
              >
                Explore Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="seyol-section">
        <div className="seyol-container">
          <div className="seyol-section-heading">
            <span className="seyol-eyebrow">About the programme</span>
            <h2>Learn care through guided practical training</h2>
            <p>
              This pathway introduces learners to postpartum care,
              newborn care fundamentals and responsible caregiving.
              Training schedules, eligibility and practical placements
              should be confirmed with the SEYOL training team.
            </p>
          </div>

          <div className="seyol-two-col">
            <article className="seyol-info-card">
              <h3>Who is this for?</h3>
              <ul>
                <li>People interested in maternal and newborn care.</li>
                <li>Aspiring professional caregivers.</li>
                <li>Learners interested in traditional Indian care practices.</li>
                <li>People looking to develop practical caregiving skills.</li>
              </ul>
            </article>

            <article className="seyol-info-card">
              <h3>What will you learn?</h3>
              <ul>
                <li>Understand postpartum recovery and emotional wellbeing.</li>
                <li>Learn newborn hygiene and safe handling fundamentals.</li>
                <li>Practise respectful, family-centred communication.</li>
                <li>Recognise when medical advice or urgent care is needed.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="curriculum" className="seyol-section seyol-section-white">
        <div className="seyol-container">
          <div className="seyol-section-heading">
            <span className="seyol-eyebrow">Training curriculum</span>
            <h2>A structured learning journey</h2>
            <p>
              An intensive, hands-on clinical and household practicum designed to refine your stroke techniques, troubleshoot complex feeding issues, manage demanding night routines, and master traditional herbal preparations.
            </p>
          </div>

          <div className="seyol-curriculum-header">
            <BookOpen className="seyol-book-icon" size={18} />
            <span>Curriculum Modules:</span>
          </div>

          <div className="seyol-curriculum-list">
            {curriculum.map((module, index) => (
              <article className="seyol-curriculum-card" key={index}>
                <h3 className="seyol-module-title">{module.title}</h3>
                <ul className="seyol-module-topics">
                  {module.topics.map((topic, tIdx) => (
                    <li key={tIdx}>
                      <span className="seyol-bullet">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seyol-section">
        <div className="seyol-container">
          <div className="seyol-section-heading">
            <span className="seyol-eyebrow">Training experience</span>
            <h2>From learning to practical assessment</h2>
          </div>

          <div className="seyol-steps">
            <article className="seyol-step">
              <span className="seyol-eyebrow">Step 01</span>
              <h3>Learn</h3>
              <p>
                Understand care principles through trainer-led lessons
                and demonstrations.
              </p>
            </article>

            <article className="seyol-step">
              <span className="seyol-eyebrow">Step 02</span>
              <h3>Practise</h3>
              <p>
                Build skills through supervised practice using
                appropriate training methods and safety protocols.
              </p>
            </article>

            <article className="seyol-step">
              <span className="seyol-eyebrow">Step 03</span>
              <h3>Get assessed</h3>
              <p>
                Complete the required assessment and attendance
                criteria defined by the training provider.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="seyol-section seyol-section-white">
        <div className="seyol-container">
          <div className="seyol-section-heading">
            <span className="seyol-eyebrow">Programme details</span>
            <h2>What to know before applying</h2>
          </div>

          <div className="seyol-two-col">
            <article className="seyol-info-card">
              <h3>Training format</h3>
              <p>
                The programme may include theory sessions, demonstrations
                and supervised practical activities. Confirm the exact
                location, duration, schedule and fees with SEYOL before
                enrolment.
              </p>
            </article>

            <article className="seyol-info-card">
              <h3>Assessment and certificate</h3>
              <p>
                Applicants should follow SEYOL's approved attendance,
                assessment and documentation requirements. Do not treat
                course completion as a medical qualification or a
                substitute for professional clinical training.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="seyol-section">
        <div className="seyol-container">
          <div className="seyol-faq-section">
            <div className="seyol-faq-heading">
              <span className="seyol-eyebrow">Frequently asked questions</span>
              <h2>Questions before you begin?</h2>
            </div>

            <div className="seyol-faq-list">
            {faqs.map((faq, index) => (
              <div className="seyol-faq" key={faq.question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="seyol-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seyol-container">
        <div className="seyol-cta">
          <h2>Ready to begin your SEYOL training journey?</h2>
          <p>
            Submit your application to learn more about the Practical
            Confinement Care Training pathway and its requirements.
          </p>
          <button className="seyol-button" onClick={applyNow}>
            Apply for Practical Training
          </button>
        </div>
      </section>

      <div style={{ height: 60 }} />
    </main>
  );
}

