'use client';

import React, { useMemo, useState } from "react";

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
      <style>{`
        .find-resources {
          --fwn-maroon: #651F32;
          --fwn-cream: #FAF5ED;
          --fwn-text: #392B2E;
          --fwn-muted: #756567;
          --fwn-border: #E8DCD3;
          padding: 64px 0 72px;
          background: var(--fwn-cream);
          color: var(--fwn-text);
          font-family: Inter, Arial, sans-serif;
          border-bottom: 1px solid var(--fwn-border);
        }

        .find-resources * {
          box-sizing: border-box;
        }

        .find-container {
          width: min(960px, calc(100% - 40px));
          margin: 0 auto;
        }

        .find-heading {
          max-width: 680px;
          margin: 0 auto 32px;
          text-align: center;
        }

        .find-heading h2 {
          margin: 0 0 10px;
          color: var(--fwn-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 500;
          line-height: 1.25;
        }

        .find-heading p {
          margin: 0;
          color: var(--fwn-muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .resource-search {
          max-width: 640px;
          margin: 0 auto 30px;
        }

        .resource-search input {
          width: 100%;
          height: 52px;
          padding: 0 22px;
          border: 1.5px solid var(--fwn-border);
          border-radius: 50px;
          background: #FFFFFF;
          color: var(--fwn-text);
          font: inherit;
          font-size: 14px;
          outline: none;
          box-shadow: 0 2px 8px rgba(101, 31, 50, .03);
          transition: border-color .2s ease, box-shadow .2s ease;
        }

        .resource-search input:focus {
          border-color: var(--fwn-maroon);
          box-shadow: 0 0 0 3px rgba(101, 31, 50, .12);
        }

        .topic-section {
          margin-bottom: 34px;
          text-align: center;
        }

        .topic-section h3 {
          margin: 0 0 14px;
          color: var(--fwn-maroon);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .topic-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .topic-chip {
          padding: 8px 18px;
          border: 1px solid var(--fwn-border);
          border-radius: 40px;
          background: #FFFCF8;
          color: #4A3E40;
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all .2s ease;
        }

        .topic-chip:hover {
          border-color: #B88B96;
          color: var(--fwn-maroon);
        }

        .topic-chip.active {
          background: var(--fwn-maroon);
          color: var(--fwn-cream);
          border-color: var(--fwn-maroon);
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(101, 31, 50, .18);
        }

        .resource-results {
          max-width: 680px;
          margin: 0 auto;
          display: grid;
          gap: 12px;
        }

        .results-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          margin-bottom: 4px;
        }

        .results-heading h3 {
          margin: 0;
          color: var(--fwn-maroon);
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: 600;
        }

        .results-heading span {
          color: var(--fwn-muted);
          font-size: 12px;
          font-weight: 500;
        }

        .resource-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          padding: 16px 20px;
          border: 1px solid var(--fwn-border);
          border-radius: 14px;
          background: #FFFCF8;
          text-align: left;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          font: inherit;
        }

        .resource-result:hover {
          transform: translateY(-2px);
          border-color: #B88B96;
          box-shadow: 0 6px 18px rgba(101, 31, 50, .08);
        }

        .resource-result strong {
          display: block;
          color: var(--fwn-maroon);
          font-family: Georgia, serif;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
        }

        .resource-result small {
          display: block;
          margin-top: 4px;
          color: var(--fwn-muted);
          font-size: 12.5px;
          line-height: 1.6;
        }

        .result-arrow {
          flex-shrink: 0;
          color: var(--fwn-maroon);
          font-size: 18px;
          font-weight: bold;
          transition: transform .2s ease;
        }

        .resource-result:hover .result-arrow {
          transform: translateX(3px);
        }

        .empty-results {
          padding: 30px 20px;
          text-align: center;
          color: var(--fwn-muted);
          font-size: 14px;
          background: #FFFCF8;
          border: 1px dashed var(--fwn-border);
          border-radius: 12px;
          margin: 0;
        }

        .suggested-panel {
          max-width: 640px;
          margin: 0 auto;
          padding: 24px 28px;
          border-radius: 16px;
          background: #F3E8DE;
          border: 1px solid #E5D5C8;
          text-align: center;
        }

        .suggested-panel h3 {
          margin: 0 0 8px;
          color: var(--fwn-maroon);
          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 600;
        }

        .suggested-panel p {
          margin: 4px 0;
          color: #6E5F61;
          font-size: 13.5px;
          line-height: 1.65;
        }

        @media (max-width: 600px) {
          .find-resources {
            padding: 48px 0 54px;
          }

          .find-container {
            width: calc(100% - 32px);
          }

          .find-heading {
            margin-bottom: 24px;
          }

          .resource-search {
            margin-bottom: 24px;
          }

          .resource-search input {
            height: 48px;
            padding: 0 18px;
            font-size: 13.5px;
          }

          .topic-chips {
            gap: 8px;
          }

          .topic-chip {
            padding: 7px 14px;
            font-size: 12px;
          }

          .suggested-panel {
            padding: 20px;
          }
        }
      `}</style>

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

