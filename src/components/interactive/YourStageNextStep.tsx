'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import "./YourStageNextStep.css";

interface RecommendationItem {
  type: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const recommendations: Record<string, RecommendationItem[]> = {
  early: [
    {
      type: "service",
      title: "Pregnancy Care",
      description:
        "Explore personalised support throughout your pregnancy journey.",
      icon: "♡",
      link: "/services/pregnancy-care",
    },
    {
      type: "class",
      title: "Pregnancy Preparation Class",
      description:
        "Prepare yourself for the arrival of your little one.",
      icon: "✿",
      link: "/classes/pregnancy-preparation",
    },
    {
      type: "resource",
      title: "Pregnancy Preparation Guide",
      description:
        "Helpful information and checklists for your pregnancy journey.",
      icon: "▤",
      link: "/resources/pregnancy-guide",
    },
  ],

  upcoming: [
    {
      type: "service",
      title: "Newborn Baby Care",
      description:
        "Discover newborn care support for your baby's first days.",
      icon: "♡",
      link: "/services/newborn-care",
    },
    {
      type: "class",
      title: "New Parent Preparation",
      description:
        "Learn essential skills before welcoming your baby.",
      icon: "✿",
      link: "/classes/new-parent",
    },
    {
      type: "resource",
      title: "Hospital Bag Checklist",
      description:
        "A practical checklist to prepare for delivery day.",
      icon: "▤",
      link: "/resources/hospital-bag",
    },
    {
      type: "product",
      title: "SEY Baby Care Essentials",
      description:
        "Explore products for your baby's early care routine.",
      icon: "◇",
      link: "/products",
    },
  ],

  newborn: [
    {
      type: "service",
      title: "Newborn Baby Care",
      description:
        "Explore support for newborn care and everyday routines.",
      icon: "♡",
      link: "/services/newborn-care",
    },
    {
      type: "class",
      title: "Newborn Care Learning",
      description:
        "Build confidence in newborn care essentials.",
      icon: "✿",
      link: "/classes/newborn-care",
    },
    {
      type: "resource",
      title: "Newborn Care Checklist",
      description:
        "Explore helpful newborn care information.",
      icon: "▤",
      link: "/resources/newborn-checklist",
    },
  ],

  baby: [
    {
      type: "service",
      title: "Infant Massage & Bath",
      description:
        "Discover age-appropriate infant care support.",
      icon: "♡",
      link: "/services/infant-massage",
    },
    {
      type: "class",
      title: "Baby Care Learning Class",
      description:
        "Learn practical baby care techniques and routines.",
      icon: "✿",
      link: "/classes/baby-care",
    },
    {
      type: "resource",
      title: "Baby Care Guide",
      description:
        "Explore everyday baby care tips and guidance.",
      icon: "▤",
      link: "/resources/baby-care",
    },
    {
      type: "product",
      title: "SEY Baby Care Collection",
      description:
        "Discover products for your baby's daily routine.",
      icon: "◇",
      link: "/products",
    },
  ],
};

function getPregnancyWeek(edd: string): number | null {
  if (!edd) return null;

  const dueDate = new Date(`${edd}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const pregnancyDays = 280 - daysUntilDue;

  if (pregnancyDays < 0 || pregnancyDays > 294) {
    return null;
  }

  return Math.floor(pregnancyDays / 7);
}

function getBabyAgeInDays(age: string | number, unit: string): number | null {
  const value = Number(age);

  if (!Number.isFinite(value) || value < 0) return null;

  const multipliers: Record<string, number> = {
    days: 1,
    weeks: 7,
    months: 30.4375,
    years: 365.25,
  };

  return value * (multipliers[unit] ?? 1);
}

function getStage(
  type: string,
  values: { edd: string; week: string; age: string; unit: string }
) {
  if (type === "edd") {
    const week = getPregnancyWeek(values.edd);

    if (week === null || week < 0 || week > 42) {
      return null;
    }

    return {
      title: "Your Pregnancy Journey",
      subtitle: `Approximately week ${week} of pregnancy`,
      items: week >= 28
        ? recommendations.upcoming
        : recommendations.early,
    };
  }

  if (type === "week") {
    const week = Number(values.week);

    return {
      title: "Your Pregnancy Journey",
      subtitle: `Week ${week} of pregnancy`,
      items: week >= 28
        ? recommendations.upcoming
        : recommendations.early,
    };
  }

  const days = getBabyAgeInDays(values.age, values.unit);

  if (days === null || days > 3650) return null;

  if (days <= 90) {
    return {
      title: "Your Newborn Journey",
      subtitle: `Your baby is approximately ${Math.round(days)} days old`,
      items: recommendations.newborn,
    };
  }

  return {
    title: "Your Baby's Growing Journey",
    subtitle: `Your baby is approximately ${Math.round(days)} days old`,
    items: recommendations.baby,
  };
}

export function YourStageNextStep() {
  const [mode, setMode] = useState<string>("edd");
  const [edd, setEdd] = useState<string>("");
  const [week, setWeek] = useState<string>("28");
  const [age, setAge] = useState<string>("2");
  const [unit, setUnit] = useState<string>("months");
  const [filter, setFilter] = useState<string>("all");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const stage = useMemo(() => {
    if (!showResults) return null;

    return getStage(mode, { edd, week, age, unit });
  }, [showResults, mode, edd, week, age, unit]);

  const visibleItems = stage?.items.filter(
    (item) => filter === "all" || item.type === filter
  );

  const handleModeChange = (value: string) => {
    setMode(value);
    setShowResults(false);
    setError("");
    setFilter("all");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "edd") {
      if (!edd) {
        setError("Please select your expected due date.");
        return;
      }

      if (getPregnancyWeek(edd) === null) {
        setError("Please enter a valid expected due date.");
        return;
      }
    }

    if (mode === "week") {
      if (!week || Number(week) < 1 || Number(week) > 42) {
        setError("Please select a valid pregnancy week.");
        return;
      }
    }

    if (mode === "baby") {
      const days = getBabyAgeInDays(age, unit);

      if (days === null || days > 3650) {
        setError("Please enter a valid baby age.");
        return;
      }
    }

    setFilter("all");
    setShowResults(true);
  };

  return (
    <section className="stage-section">
      <div className="stage-container">

        {/* Header */}
        <div className="stage-heading">
          <h2>
            Your Stage, <span>Your Next Step.</span>
          </h2>

          <p>
            Every stage deserves the right support.
            Tell us where you are in your journey and
            discover the SEYOL support that suits you.
          </p>
        </div>

        {/* Main Tool */}
        <div className="stage-tool">

          <div className="stage-visual">
            <div className="stage-visual-content">
              <span>CARE FOR EVERY LITTLE MOMENT</span>

              <h3>
                Growing together,
                <br />
                every step of the way.
              </h3>

              <p>
                From pregnancy to your baby&apos;s early years,
                discover thoughtful support for your family.
              </p>
            </div>
          </div>

          <div className="stage-form-area">
            <h3>Where are you right now?</h3>

            <p className="stage-form-subtitle">
              Choose an option to discover your next step.
            </p>

            {/* Selection Tabs */}
            <div className="stage-tabs">
              <button
                type="button"
                className={mode === "edd" ? "active" : ""}
                onClick={() => handleModeChange("edd")}
              >
                I&apos;m Expecting
              </button>

              <button
                type="button"
                className={mode === "week" ? "active" : ""}
                onClick={() => handleModeChange("week")}
              >
                Pregnancy Week
              </button>

              <button
                type="button"
                className={mode === "baby" ? "active" : ""}
                onClick={() => handleModeChange("baby")}
              >
                Baby&apos;s Age
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              {mode === "edd" && (
                <div className="stage-field">
                  <label>Expected Due Date (EDD)</label>

                  <input
                    type="date"
                    value={edd}
                    onChange={(e) => {
                      setEdd(e.target.value);
                      setShowResults(false);
                    }}
                    required
                  />

                  <small>
                    Select your expected delivery date.
                  </small>
                </div>
              )}

              {mode === "week" && (
                <div className="stage-field">
                  <label>How many weeks pregnant are you?</label>

                  <select
                    value={week}
                    onChange={(e) => {
                      setWeek(e.target.value);
                      setShowResults(false);
                    }}
                  >
                    {Array.from({ length: 42 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Week {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {mode === "baby" && (
                <div className="stage-field">
                  <label>How old is your baby?</label>

                  <div className="baby-age-input">
                    <input
                      type="number"
                      min="0"
                      max="3650"
                      step="any"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                        setShowResults(false);
                      }}
                      placeholder="Enter age"
                      required
                    />

                    <select
                      value={unit}
                      onChange={(e) => {
                        setUnit(e.target.value);
                        setShowResults(false);
                      }}
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              )}

              {error && (
                <p className="stage-error" role="alert">
                  {error}
                </p>
              )}

              <button className="stage-submit" type="submit">
                Find My Next Step <span>→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Recommendations */}
        {showResults && stage && (
          <div className="stage-results" aria-live="polite">
            <div className="stage-results-heading">
              <div>
                <h3>{stage.title}</h3>

                <p>{stage.subtitle}</p>
              </div>

              <button
                className="stage-reset"
                onClick={() => setShowResults(false)}
              >
                ↻ Change details
              </button>
            </div>

            {/* Filters */}
            <div className="stage-filters">
              {[
                ["all", "All"],
                ["service", "Services"],
                ["class", "Classes"],
                ["resource", "Resources"],
                ["product", "Products"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={filter === value ? "selected" : ""}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="stage-cards">
              {visibleItems && visibleItems.map((item) => (
                <article className="stage-card" key={item.title}>
                  <span className="stage-card-type">
                    {item.type}
                  </span>

                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                  <Link href={item.link}>
                    Explore More <span>↗</span>
                  </Link>
                </article>
              ))}

              {visibleItems && visibleItems.length === 0 && (
                <p className="stage-empty">
                  No recommendations in this category yet.
                </p>
              )}
            </div>

            <p className="stage-disclaimer">
              Recommendations are general suggestions based on
              the information provided. Please check individual
              service and product suitability before booking or purchase.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="stage-bottom">
          <div>
            <span>NEED A LITTLE GUIDANCE?</span>
            <h3>Not sure what support is right for you?</h3>
            <p>Our team is here to help you find your next step.</p>
          </div>

          <Link href="/book" className="stage-contact">
            Talk to SEYOL <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default YourStageNextStep;
