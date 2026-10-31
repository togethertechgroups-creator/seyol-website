'use client';

import React, { useState } from "react";
import Link from "next/link";
import "./YourStageNextStep.css";

type StageId = "pregnancy" | "newborn" | "postpartum" | "parenting";

interface StageOption {
  id: StageId;
  title: string;
  icon: string;
}

interface RecommendationItem {
  type: string;
  title: string;
  description: string;
  link: string;
}

const stageOptions: StageOption[] = [
  { id: "pregnancy", title: "I'm Pregnant", icon: "♡" },
  { id: "newborn", title: "Newborn Care", icon: "♧" },
  { id: "postpartum", title: "Postpartum", icon: "✿" },
  { id: "parenting", title: "Everyday Parenting", icon: "⌂" },
];

const recommendations: Record<StageId, RecommendationItem[]> = {
  pregnancy: [
    {
      type: "CARE & SERVICES",
      title: "Pregnancy Care Support",
      description: "Explore thoughtful care for your pregnancy journey.",
      link: "/services/prenatal-massage-therapy",
    },
    {
      type: "CLASSES",
      title: "Preparing for Baby",
      description: "Learn the essentials before welcoming your little one.",
      link: "/classes",
    },
    {
      type: "RESOURCES",
      title: "Pregnancy Guide",
      description: "Helpful information for every stage of pregnancy.",
      link: "/resources",
    },
  ],
  newborn: [
    {
      type: "CARE & SERVICES",
      title: "Newborn Care Support",
      description: "Discover gentle support for your baby's early days.",
      link: "/services/infant-massage-and-bath",
    },
    {
      type: "CLASSES",
      title: "Baby Care Learning",
      description: "Build confidence in everyday newborn care.",
      link: "/classes",
    },
    {
      type: "RESOURCES",
      title: "Newborn Essentials Checklist",
      description: "A useful checklist for your baby's needs.",
      link: "/resources",
    },
  ],
  postpartum: [
    {
      type: "CARE & SERVICES",
      title: "Postpartum Care",
      description: "Explore support for your recovery and wellbeing.",
      link: "/services/postpartum-healing-bodywork-herbal-wrap",
    },
    {
      type: "CLASSES",
      title: "Mother & Baby Care",
      description: "Learn about caring for yourself and your baby.",
      link: "/classes",
    },
    {
      type: "RESOURCES",
      title: "Postpartum Guide",
      description: "Helpful resources for your postpartum journey.",
      link: "/resources",
    },
  ],
  parenting: [
    {
      type: "CARE & SERVICES",
      title: "Everyday Family Care",
      description: "Find support for your growing family's needs.",
      link: "/services",
    },
    {
      type: "RESOURCES",
      title: "Parenting Resources",
      description: "Explore practical guides and helpful information.",
      link: "/resources",
    },
    {
      type: "SHOP",
      title: "Care Essentials",
      description: "Discover products for your family's daily routine.",
      link: "/products",
    },
  ],
};

export function YourStageNextStep() {
  const [stage, setStage] = useState<StageId>("pregnancy");
  const [week, setWeek] = useState<string>("24");
  const [edd, setEdd] = useState<string>("");
  const [babyAge, setBabyAge] = useState<string>("0–3 months");
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleStageChange = (newStage: StageId) => {
    setStage(newStage);
    setShowResults(false);
  };

  const handleFindSupport = () => {
    setShowResults(true);
  };

  const getStageDescription = () => {
    if (stage === "pregnancy") {
      return `Pregnancy · ${week} weeks`;
    }
    if (stage === "newborn") {
      return `Newborn · ${babyAge}`;
    }
    if (stage === "postpartum") {
      return `Postpartum · ${babyAge}`;
    }
    return "Everyday Parenting";
  };

  return (
    <section className="seyol-stage-section">
      <div className="seyol-stage-container">

        {/* Section Heading */}
        <div className="seyol-stage-heading">
          <span className="seyol-eyebrow">
            PERSONALIZED CARE FINDER
          </span>

          <h2>Your Stage, Your Next Step</h2>

          <p>
            Every journey is different. Tell us where you are,
            and discover the right support for your family.
          </p>
        </div>

        <div className="seyol-stage-layout">

          {/* Left Image */}
          <div className="seyol-stage-image">
            <img
              src="/images/seyol-mother-baby.jpg"
              alt="Mother holding her newborn baby"
            />

            <div className="seyol-image-caption">
              <span>CARE FOR EVERY CHAPTER</span>
              <h3>Every little step deserves thoughtful care.</h3>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="seyol-stage-form">

            <h3>Where are you in your journey?</h3>

            <div className="seyol-stage-options">
              {stageOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`seyol-stage-option ${
                    stage === item.id ? "active" : ""
                  }`}
                  onClick={() => handleStageChange(item.id)}
                >
                  <span className="stage-icon">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {/* Pregnancy Fields */}
            {stage === "pregnancy" && (
              <div className="seyol-stage-fields">
                <label>Expected Due Date (Optional)</label>

                <input
                  type="date"
                  value={edd}
                  onChange={(e) => setEdd(e.target.value)}
                />

                <div className="seyol-or">
                  <span>OR</span>
                </div>

                <label>How many weeks pregnant are you?</label>

                <select
                  value={week}
                  onChange={(e) => {
                    setWeek(e.target.value);
                    setShowResults(false);
                  }}
                >
                  <option value="8">1–12 weeks</option>
                  <option value="16">13–20 weeks</option>
                  <option value="24">21–27 weeks</option>
                  <option value="30">28–32 weeks</option>
                  <option value="34">33–36 weeks</option>
                  <option value="38">37–40+ weeks</option>
                </select>
              </div>
            )}

            {/* Baby Age Fields */}
            {(stage === "newborn" || stage === "postpartum") && (
              <div className="seyol-stage-fields">
                <label>How old is your baby?</label>

                <select
                  value={babyAge}
                  onChange={(e) => {
                    setBabyAge(e.target.value);
                    setShowResults(false);
                  }}
                >
                  <option>0–3 months</option>
                  <option>3–6 months</option>
                  <option>6–9 months</option>
                  <option>9–12 months</option>
                  <option>12+ months</option>
                </select>
              </div>
            )}

            {stage === "parenting" && (
              <div className="seyol-parenting-note">
                <p>
                  Let&apos;s discover helpful resources, family care
                  services and everyday essentials for you.
                </p>
              </div>
            )}

            <button
              type="button"
              className="seyol-find-button"
              onClick={handleFindSupport}
            >
              Find My SEYOL Support
              <span>→</span>
            </button>

          </div>
        </div>

        {/* Recommendation Results */}
        {showResults && (
          <div className="seyol-results">
            <div className="seyol-results-heading">
              <span>YOUR PERSONAL GUIDE</span>
              <h3>A next step for your journey</h3>
              <p>{getStageDescription()}</p>
            </div>

            <div className="seyol-recommendation-grid">
              {recommendations[stage].map((item, index) => (
                <Link
                  href={item.link}
                  className="seyol-recommendation-card"
                  key={index}
                >
                  <span className="seyol-card-type">{item.type}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span className="seyol-card-link">
                    Explore More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="seyol-stage-footer">
          <span>♡</span>
          Thoughtful care for every stage of your journey.
        </div>

      </div>
    </section>
  );
}

export default YourStageNextStep;
