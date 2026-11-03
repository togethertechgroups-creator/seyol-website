'use client';

import React, { useState } from "react";
import "./SeyolCareersTraining.css";

const benefits = [
  {
    title: "Care-Led Approach",
    description:
      "A people-centred approach to learning and supporting families.",
  },
  {
    title: "Practical Learning",
    description:
      "Explore knowledge and practical skills relevant to maternal and baby care.",
  },
  {
    title: "Family-Focused Values",
    description:
      "Understand the needs of parents, babies and families.",
  },
  {
    title: "Growth Opportunities",
    description:
      "Explore professional development and suitable career pathways.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Submit Your Application",
    description:
      "Share your personal details, interests, background and career goals with SEYOL.",
    icon: "✉",
  },
  {
    number: "02",
    title: "Application Review",
    description:
      "Our team reviews your application and contacts you about suitable next steps.",
    icon: "⌕",
  },
  {
    number: "03",
    title: "Training & Learning",
    description:
      "Explore relevant learning opportunities and practical training where available.",
    icon: "▤",
  },
  {
    number: "04",
    title: "Assessment",
    description:
      "Complete the applicable learning activities and assessments for your programme.",
    icon: "✓",
  },
  {
    number: "05",
    title: "Career Opportunities",
    description:
      "Explore relevant career opportunities subject to eligibility and availability.",
    icon: "↗",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  interest: "Training Programme",
  experience: "",
  message: "",
  consent: false,
};

export function SeyolCareersTraining() {
  const [form, setForm] = useState(initialForm);
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState("idle");

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.consent) {
      setStatus("consent-error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Application submission failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const step = processSteps[activeStep];

  return (
    <div className="seyol-careers">

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-content">
          <span className="ct-eyebrow">
            CAREERS & TRAINING
          </span>

          <h1>
            Grow with Care.
            <br />
            <span>Build Your Future with SEYOL.</span>
          </h1>

          <p>
            Discover learning opportunities, develop your
            skills and explore ways to become part of the
            SEYOL journey.
          </p>

          <a href="#ct-application" className="ct-primary-btn">
            Explore Opportunities <span>→</span>
          </a>
        </div>

        <div className="ct-hero-image">
          <img
            src="/images/seyol-careers-hero.jpg"
            alt="Maternal and baby care professional"
          />
        </div>
      </section>

      {/* SECTION 1: APPLICATION FORM */}
      <section className="ct-application" id="ct-application">
        <div className="ct-application-intro">
          <h2>
            Apply to <span>Join SEYOL</span>
          </h2>

          <p>
            Interested in working with SEYOL or exploring
            our training programmes? Tell us a little about
            yourself and what you are looking for.
          </p>

          <div className="ct-contact-note">
            <span>♡</span>
            <div>
              <strong>Every journey begins with a step.</strong>
              <p>
                Share your interests and our team will
                review your enquiry.
              </p>
            </div>
          </div>
        </div>

        <div className="ct-form-card">
          <div className="ct-form-heading">
            <h3>Your Application</h3>
            <p>Fields marked with * are required.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="ct-form-grid">

              <div className="ct-field ct-full">
                <label htmlFor="ct-name">Full Name *</label>
                <input
                  id="ct-name"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={updateField}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-email">Email Address *</label>
                <input
                  id="ct-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-phone">Contact Number *</label>
                <input
                  id="ct-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="ct-field ct-full">
                <label htmlFor="ct-interest">
                  I&apos;m interested in *
                </label>

                <select
                  id="ct-interest"
                  name="interest"
                  value={form.interest}
                  onChange={updateField}
                >
                  <option>Training Programme</option>
                  <option>Career Opportunities</option>
                  <option>Working with SEYOL</option>
                  <option>Partnership Opportunities</option>
                </select>
              </div>

              <div className="ct-field ct-full">
                <label htmlFor="ct-experience">
                  Relevant Experience
                </label>

                <select
                  id="ct-experience"
                  name="experience"
                  value={form.experience}
                  onChange={updateField}
                >
                  <option value="">Select your experience</option>
                  <option value="No experience">
                    No previous experience
                  </option>
                  <option value="Less than 1 year">
                    Less than 1 year
                  </option>
                  <option value="1-3 years">1–3 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="More than 5 years">
                    More than 5 years
                  </option>
                </select>
              </div>

              <div className="ct-field ct-full">
                <label htmlFor="ct-message">
                  Tell Us About Yourself *
                </label>

                <textarea
                  id="ct-message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  placeholder="Share your background, interests and goals..."
                  rows={5}
                  required
                />
              </div>

              <div className="ct-field ct-full">
                <label className="ct-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={updateField}
                  />

                  <span>
                    I agree that SEYOL may use my information
                    to respond to this application in accordance
                    with its Privacy Policy.
                  </span>
                </label>
              </div>
            </div>

            {status === "consent-error" && (
              <p className="ct-message error" role="alert">
                Please accept the privacy consent before submitting.
              </p>
            )}

            {status === "success" && (
              <p className="ct-message success" role="status">
                Your application has been submitted successfully.
              </p>
            )}

            {status === "error" && (
              <p className="ct-message error" role="alert">
                Unable to submit your application. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="ct-submit-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Submitting..."
                : "Submit Application →"}
            </button>

            <p className="ct-form-note">
              Your information will be handled according
              to SEYOL&apos;s Privacy Policy.
            </p>
          </form>
        </div>
      </section>

      {/* SECTION 2: WHY SEYOL */}
      <section className="ct-different">
        <div className="ct-section-heading">
          <span className="ct-eyebrow">
            02 — THE SEYOL APPROACH
          </span>

          <h2>
            What Makes SEYOL
            <br />
            <span>Careers & Training Different?</span>
          </h2>

          <p>
            A learning experience centred around care,
            knowledge and professional growth.
          </p>
        </div>

        <div className="ct-benefits-grid">
          {benefits.map((item) => (
            <article className="ct-benefit-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: PROCESS */}
      <section className="ct-process">
        <div className="ct-section-heading">
          <span className="ct-eyebrow">
            03 — YOUR JOURNEY
          </span>

          <h2>
            How the <span>Process Works</span>
          </h2>

          <p>
            From your first application to exploring
            potential career opportunities.
          </p>
        </div>

        <div className="ct-process-layout">

          <div className="ct-step-list">
            {processSteps.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={`ct-step-item ${
                  activeStep === index ? "active" : ""
                }`}
                onClick={() => setActiveStep(index)}
                aria-pressed={activeStep === index}
              >
                <span className="ct-step-number">
                  {item.number}
                </span>

                <span className="ct-step-icon">
                  {item.icon}
                </span>

                <span className="ct-step-title">
                  {item.title}
                </span>

                <span className="ct-step-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="ct-step-detail">
            <span className="ct-eyebrow">
              STEP {step.number} / 05
            </span>

            <div className="ct-step-detail-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

            <div className="ct-step-navigation">
              <button
                type="button"
                onClick={() =>
                  setActiveStep((prev) => Math.max(0, prev - 1))
                }
                disabled={activeStep === 0}
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveStep((prev) =>
                    Math.min(processSteps.length - 1, prev + 1)
                  )
                }
                disabled={activeStep === processSteps.length - 1}
              >
                Next Step →
              </button>
            </div>

            <div className="ct-progress">
              <div
                className="ct-progress-fill"
                style={{
                  width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="ct-bottom">
        <div>
          <span className="ct-eyebrow">YOUR NEXT CHAPTER</span>

          <h2>
            Your Journey Could
            <br />
            Start Here.
          </h2>

          <p>
            Take the first step towards exploring SEYOL
            training and career opportunities.
          </p>
        </div>

        <a href="#ct-application" className="ct-bottom-btn">
          Apply to Join SEYOL →
        </a>
      </section>

    </div>
  );
}

export default SeyolCareersTraining;
