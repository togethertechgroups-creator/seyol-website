'use client';

import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useFifteenMinuteCall } from "../../context/FifteenMinuteCallContext";
import "./YourStageNextStep.css";

interface RecommendationItem {
  type: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const recommendations: Record<string, RecommendationItem[]> = {
  early_pregnancy: [
    {
      type: "service",
      title: "Prenatal Massage Therapy",
      description:
        "Specialized side-lying clinical massage to relieve early pregnancy fatigue, lumbar tension, and pelvic ache.",
      icon: "♡",
      link: "/services/prenatal-massage-therapy",
    },
    {
      type: "class",
      title: "Prenatal Movement & Pelvic Comfort",
      description:
        "Gentle movement masterclass teaching maternal pelvic alignment, breathing techniques, and posture support.",
      icon: "✿",
      link: "/classes/prenatal-movement-and-pelvic-comfort",
    },
    {
      type: "resource",
      title: "Pregnancy to Postpartum Nourishment Guide",
      description:
        "Traditional Ayurvedic & Siddha nutritional wisdom for vitality across your second and third trimesters.",
      icon: "▤",
      link: "/classes/pregnancy-to-postpartum-traditional-nourishment",
    },
    {
      type: "product",
      title: "Maternal Body Comfort & Belly Oil",
      description:
        "Hydrating herbal belly oil formulated to nourish stretching skin and improve dermal elasticity.",
      icon: "◇",
      link: "/products",
    },
  ],

  birth_prep: [
    {
      type: "service",
      title: "Birth Doula Support",
      description:
        "Dedicated birth companion providing continuous labour advocacy, partner coaching, and physiological birth positions.",
      icon: "♡",
      link: "/services/birth-doula-support",
    },
    {
      type: "class",
      title: "Preparing for Birth with SEYOL",
      description:
        "Comprehensive childbirth workshop covering labor breathing rhythms, birth comfort, and hospital sanctuary prep.",
      icon: "✿",
      link: "/classes/preparing-for-birth-with-seyol",
    },
    {
      type: "service",
      title: "Stay-In Confinement Nanny Consultation",
      description:
        "Advance reservation and matching with vetted, experienced confinement nannies for 24/7 post-birth home care.",
      icon: "♡",
      link: "/services/stay-in-confinement-nanny-support",
    },
    {
      type: "resource",
      title: "Hospital Bag & Birth Sanctuary Checklist",
      description:
        "A practical, clinician-vetted checklist for labour comfort, hospital documentation, and home arrival.",
      icon: "▤",
      link: "/resources",
    },
  ],

  imminent_arrival: [
    {
      type: "service",
      title: "Postpartum & Confinement Advance Reservation",
      description:
        "Lock in your sacred 40-day postpartum confinement dates, herbal wrap package, and doula care schedule.",
      icon: "♡",
      link: "/services/postpartum-massage-and-wrap",
    },
    {
      type: "class",
      title: "Breastfeeding & Bottle Feeding Basics",
      description:
        "Master pain-free latching, colostrum harvesting, milk supply establishment, and feeding setup.",
      icon: "✿",
      link: "/classes/breastfeeding-and-bottle-feeding-basics",
    },
    {
      type: "resource",
      title: "The Sacred 40-Day Confinement Guide",
      description:
        "South Indian postpartum recovery handbook covering Pathiya Samayal healing foods and herbal bathing rituals.",
      icon: "▤",
      link: "/resources",
    },
    {
      type: "product",
      title: "SEY Baby Care Essentials",
      description:
        "Pure cold-pressed virgin coconut massage oil and traditional herbal bath powder for newborn arrival.",
      icon: "◇",
      link: "/products",
    },
  ],

  sacred_confinement: [
    {
      type: "service",
      title: "Postpartum Massage & Bengkung Wrap",
      description:
        "Sacred 40-day Mandalam recovery, hot herbal Kizhi fomentation, uterine tonification, and traditional belly binding.",
      icon: "♡",
      link: "/services/postpartum-massage-and-wrap",
    },
    {
      type: "service",
      title: "Hourly Newborn Support / Night Matron",
      description:
        "Gentle nocturnal infant care, safe bathing, and soothing support allowing mothers to get restorative sleep.",
      icon: "♡",
      link: "/services/hourly-newborn-support",
    },
    {
      type: "class",
      title: "Newborn Care Essentials for Modern Parents",
      description:
        "Pediatric sleep foundations, soothing, swaddling holds, and gentle newborn bathing techniques.",
      icon: "✿",
      link: "/classes/newborn-care-essentials-for-modern-parents",
    },
    {
      type: "product",
      title: "Traditional Vethu Kuli Bath Sachets",
      description:
        "Herbal bath pouches boiled into healing water for deep muscle relief, lochia expulsion, and maternal restoration.",
      icon: "◇",
      link: "/products",
    },
  ],

  early_infant: [
    {
      type: "service",
      title: "Signature Infant Massage & Bath",
      description:
        "Traditional Indian newborn bodywork with safe head-holding, digestion colic strokes, and relaxing warm bath rituals.",
      icon: "♡",
      link: "/services/infant-massage-and-bath",
    },
    {
      type: "class",
      title: "Traditional Baby Massage & Bath Workshop",
      description:
        "Master the physiological strokes, colic relief holds, and warm water bath rituals for your growing baby.",
      icon: "✿",
      link: "/classes/traditional-baby-massage-and-bath-workshop",
    },
    {
      type: "resource",
      title: "Newborn Sleep & Feeding Log Tracker",
      description:
        "Milestone monitoring template to track baby sleep cycles, feeding intervals, and wet diapers.",
      icon: "▤",
      link: "/resources",
    },
    {
      type: "product",
      title: "Nalangu Maavu Herbal Bath Powder",
      description:
        "Gentle, soap-free traditional herbal powder formulated with green gram and rose petals for sensitive infant skin.",
      icon: "◇",
      link: "/products",
    },
  ],

  growing_baby: [
    {
      type: "service",
      title: "Mother & Baby Combo Packages",
      description:
        "Restorative maternal bodywork combined with gentle baby massage routines for joint parent-child relaxation.",
      icon: "♡",
      link: "/services/mother-and-baby-combo-packages",
    },
    {
      type: "class",
      title: "Partner & Family Preparation for Baby",
      description:
        "Hands-on baby care, family communication rhythms, and positive developmental play for growing infants.",
      icon: "✿",
      link: "/classes/partner-and-family-preparation-for-baby",
    },
    {
      type: "resource",
      title: "Baby Weaning & Nourishment Guide",
      description:
        "Traditional, wholesome introduction to first solids, digestion support, and gentle pediatric nutrition.",
      icon: "▤",
      link: "/resources",
    },
    {
      type: "product",
      title: "Restorative Mother Massage Oil",
      description:
        "Cold-pressed sesame, wild turmeric, and traditional herbal infusions to strengthen ongoing maternal recovery.",
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

    if (week < 28) {
      return {
        title: "Your Second Trimester Journey",
        subtitle: `Approximately week ${week} of pregnancy • Maternal Vitality & Pelvic Comfort`,
        items: recommendations.early_pregnancy,
      };
    } else if (week <= 36) {
      return {
        title: "Your Third Trimester Journey",
        subtitle: `Approximately week ${week} of pregnancy • Labour & Birth Preparation`,
        items: recommendations.birth_prep,
      };
    } else {
      return {
        title: "Your Imminent Arrival Journey",
        subtitle: `Approximately week ${week} of pregnancy • Final Countdown & Confinement Setup`,
        items: recommendations.imminent_arrival,
      };
    }
  }

  if (type === "week") {
    const week = Number(values.week);

    if (week < 28) {
      return {
        title: "Your Second Trimester Journey",
        subtitle: `Week ${week} of pregnancy • Maternal Vitality & Pelvic Comfort`,
        items: recommendations.early_pregnancy,
      };
    } else if (week <= 36) {
      return {
        title: "Your Third Trimester Journey",
        subtitle: `Week ${week} of pregnancy • Childbirth & Doula Preparation`,
        items: recommendations.birth_prep,
      };
    } else {
      return {
        title: "Your Imminent Arrival Journey",
        subtitle: `Week ${week} of pregnancy • Final Birth & Confinement Preparation`,
        items: recommendations.imminent_arrival,
      };
    }
  }

  const days = getBabyAgeInDays(values.age, values.unit);

  if (days === null || days > 3650) return null;

  if (days <= 45) {
    return {
      title: "Your Sacred 40-Day Confinement Journey",
      subtitle: `Your baby is ${Math.round(days)} days old • Sacred Fourth Trimester Healing`,
      items: recommendations.sacred_confinement,
    };
  } else if (days <= 180) {
    const months = (days / 30.4375).toFixed(1);
    return {
      title: "Your Early Infant Care Journey",
      subtitle: `Your baby is approximately ${months} months old (${Math.round(days)} days) • Infant Massage & Daily Rituals`,
      items: recommendations.early_infant,
    };
  } else {
    const months = Math.round(days / 30.4375);
    return {
      title: "Your Growing Baby's Journey",
      subtitle: `Your child is approximately ${months} months old • Milestone Support & Family Care`,
      items: recommendations.growing_baby,
    };
  }
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

  const resultsRef = useRef<HTMLDivElement>(null);
  const { openCallBooking } = useFifteenMinuteCall();

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

    setTimeout(() => {
      const targetElement = resultsRef.current || document.getElementById("stage-recommendations");
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Automatically scroll down to the suggested recommendations as soon as results are generated
  useEffect(() => {
    if (showResults && stage) {
      const timer = setTimeout(() => {
        const targetElement = resultsRef.current || document.getElementById("stage-recommendations");
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showResults, stage]);

  return (
    <section className="stage-section" id="your-stage-next-step">
      <div className="stage-container">

        {/* Header - No full stop */}
        <div className="stage-heading">
          <h2>
            Your Stage, <span>Your Next Step</span>
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
                  {/* Pregnancy input label: I'm Expecting – Estimated Due Date */}
                  <label htmlFor="stage-edd-input">I&apos;m Expecting – Estimated Due Date</label>

                  <input
                    id="stage-edd-input"
                    type="date"
                    value={edd}
                    onChange={(e) => {
                      setEdd(e.target.value);
                      setShowResults(false);
                    }}
                    required
                  />

                  <small>
                    Select your expected delivery date to calculate your current trimester recommendations.
                  </small>
                </div>
              )}

              {mode === "week" && (
                <div className="stage-field">
                  <label htmlFor="stage-week-select">How many weeks pregnant are you?</label>

                  <select
                    id="stage-week-select"
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
                  <label htmlFor="stage-age-input">How old is your baby?</label>

                  <div className="baby-age-input">
                    <input
                      id="stage-age-input"
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
                      aria-label="Baby age unit"
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

              <button className="stage-submit cursor-pointer" type="submit">
                Find My Next Step <span>→</span>
              </button>

              {/* Clear Supporting Link with "Not sure what support is right for you?" */}
              <div className="pt-3.5 text-center sm:text-left">
                <button
                  type="button"
                  onClick={() => openCallBooking()}
                  className="text-xs sm:text-sm font-bold text-[#7B1131] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Not sure what support is right for you?</span>
                  <span className="text-[#A6833D] hover:text-[#7B1131]">Book a 15-Minute Call →</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Recommendations Section (Auto-scrolled on submit) */}
        {showResults && stage && (
          <div
            ref={resultsRef}
            id="stage-recommendations"
            className="stage-results scroll-mt-24"
            aria-live="polite"
          >
            <div className="stage-results-heading">
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.subtitle}</p>
              </div>

              <button
                className="stage-reset cursor-pointer"
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
              Recommendations are clinical suggestions based on
              the stage provided. Please consult with our care leads or check individual
              service details before booking.
            </p>
          </div>
        )}

        {/* Bottom CTA with "Not sure what support is right for you?" */}
        <div className="stage-bottom">
          <div>
            <span>CARE GUIDANCE &amp; CONSULTATION</span>
            <h3>Not sure what support is right for you?</h3>
            <p>Our care matrons are here to help match the ideal support, workshop, or herbal routine for your family.</p>
          </div>

          <button
            type="button"
            onClick={() => openCallBooking()}
            className="stage-contact cursor-pointer"
          >
            Book a 15-Minute Call <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

export default YourStageNextStep;
