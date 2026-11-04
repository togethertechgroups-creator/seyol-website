'use client';

import React, { useMemo, useState } from "react";
import "./FindWhatYouNeed.css";

const topics = [
  { label: "All topics", value: "all" },
  { label: "Newborn care", value: "newborn" },
  { label: "Baby massage", value: "massage" },
  { label: "Feeding", value: "feeding" },
  { label: "Pregnancy", value: "pregnancy" },
  { label: "Postpartum", value: "postpartum" },
  { label: "Complete bundle", value: "complete" },
];

const resources = [
  {
    title: "Newborn Care Starter Bundle",
    category: "newborn",
    description: "Everyday newborn care guides and checklists.",
    keywords: "newborn baby diaper swaddling soothing sleep",
  },
  {
    title: "Baby Massage & Bath Bundle",
    category: "massage",
    description: "Massage routines, bathing guidance and safety charts.",
    keywords: "baby massage bath bathing oils hygiene water",
  },
  {
    title: "Breastfeeding & Bottle Feeding Bundle",
    category: "feeding",
    description: "Feeding, latching, pumping and milk storage guides.",
    keywords: "newborn feeding breastfeeding bottle latching milk",
  },
  {
    title: "Birth Preparation Toolkit",
    category: "pregnancy",
    description: "Birth plans, hospital checklists and labour support.",
    keywords: "birth plan hospital labour pregnancy preparation",
  },
  {
    title: "Pregnancy Comfort & Movement Bundle",
    category: "pregnancy",
    description: "Pregnancy comfort, movement and relaxation resources.",
    keywords: "pregnancy exercise massage breathing movement",
  },
  {
    title: "Postpartum Recovery & Confinement Bundle",
    category: "postpartum",
    description: "Recovery, confinement meals and maternal nutrition.",
    keywords: "postpartum recovery confinement meals nutrition",
  },
  {
    title: "SEYOL Complete Pregnancy to Newborn Resource Bundle",
    category: "complete",
    description: "The complete collection of all six specialist bundles.",
    keywords: "complete everything all bundles pregnancy newborn",
  },
];

type FindWhatYouNeedProps = {
  onSelectResource?: (title: string) => void;
};

export default function FindWhatYouNeed({
  onSelectResource,
}: FindWhatYouNeedProps) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");

  const filteredResources = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesTopic =
        activeTopic === "all" ||
        resource.category === activeTopic;

      const searchableText = [
        resource.title,
        resource.description,
        resource.keywords,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchTerm || searchableText.includes(searchTerm);

      return matchesTopic && matchesSearch;
    });
  }, [query, activeTopic]);

  return (
    <section className="find-resources">
      <div className="find-container">
        <div className="find-heading">
          <h2>Find What You Need</h2>
          <p>
            Search for a topic or choose a category to discover
            relevant resources.
          </p>
        </div>

        <div className="resource-search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try newborn feeding, birth plan, massage..."
            aria-label="Search resources"
          />
        </div>

        <div className="topic-section">
          <h3>Choose a topic</h3>

          <div className="topic-chips">
            {topics.map((topic) => (
              <button
                key={topic.value}
                type="button"
                className={`topic-chip ${
                  activeTopic === topic.value ? "active" : ""
                }`}
                aria-pressed={activeTopic === topic.value}
                onClick={() => setActiveTopic(topic.value)}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {query.trim() || activeTopic !== "all" ? (
          <div className="resource-results" aria-live="polite">
            <div className="results-heading">
              <h3>Matching resources</h3>
              <span>{filteredResources.length} found</span>
            </div>

            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <button
                  key={resource.title}
                  type="button"
                  className="resource-result"
                  onClick={() => onSelectResource?.(resource.title)}
                >
                  <span>
                    <strong>{resource.title}</strong>
                    <small>{resource.description}</small>
                  </span>
                  <span className="result-arrow">→</span>
                </button>
              ))
            ) : (
              <p className="empty-results">
                No resources found. Try another search term
                or select All topics.
              </p>
            )}
          </div>
        ) : (
          <div className="suggested-panel">
            <h3>Suggested for you</h3>
            <p>
              Choose your stage above to personalise suggestions.
            </p>
            <p>
              Discover paid guides, bundles, free resources and
              video learning as they become available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

