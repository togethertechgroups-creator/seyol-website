'use client';

import React from "react";

const stages = [
  {
    title: "Pregnancy",
    description: "Preparation, comfort & movement",
    filter: "pregnancy",
  },
  {
    title: "Birth Preparation",
    description: "Plans, checklists & labour support",
    filter: "birth",
  },
  {
    title: "Newborn Care",
    description: "Everyday baby care essentials",
    filter: "newborn",
  },
  {
    title: "Feeding",
    description: "Breastfeeding & bottle feeding",
    filter: "feeding",
  },
  {
    title: "Baby Massage & Bath",
    description: "Hygiene, massage & bath safety",
    filter: "massage",
  },
  {
    title: "Postpartum",
    description: "Recovery, meals & confinement",
    filter: "postpartum",
  },
];

type ChooseByStageProps = {
  onBrowseResources?: (stage: string) => void;
};

export default function ChooseByStage({
  onBrowseResources,
}: ChooseByStageProps) {
  return (
    <section className="choose-stage">
      <style>{`
        .choose-stage {
          --cs-maroon: #651F32;
          --cs-cream: #FAF5ED;
          --cs-text: #392B2E;
          --cs-muted: #756567;
          --cs-border: #E8DCD3;
          padding: 60px 0 68px;
          background: var(--cs-cream);
          color: var(--cs-text);
          font-family: Inter, Arial, sans-serif;
          border-bottom: 1px solid var(--cs-border);
        }

        .choose-stage * {
          box-sizing: border-box;
        }

        .stage-container {
          width: min(1360px, calc(100% - 32px));
          margin: 0 auto;
        }

        .stage-heading {
          max-width: 760px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .stage-heading h2 {
          margin: 0 0 10px;
          color: var(--cs-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 500;
          line-height: 1.25;
        }

        .stage-heading p {
          margin: 0;
          color: var(--cs-muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .stage-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(175px, 1fr));
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 10px;
          scrollbar-width: thin;
          scrollbar-color: #E8DCD3 transparent;
          -webkit-overflow-scrolling: touch;
        }

        .stage-grid::-webkit-scrollbar {
          height: 6px;
        }

        .stage-grid::-webkit-scrollbar-track {
          background: transparent;
        }

        .stage-grid::-webkit-scrollbar-thumb {
          background-color: #E8DCD3;
          border-radius: 10px;
        }

        @media (min-width: 1240px) {
          .stage-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            overflow-x: visible;
            padding-bottom: 0;
          }
        }

        .stage-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          min-width: 175px;
          padding: 22px 18px;
          border: 1px solid var(--cs-border);
          border-radius: 16px;
          background: #FFFCF8;
          text-align: left;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          font: inherit;
        }

        .stage-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(101, 31, 50, .08);
          border-color: #B88B96;
        }

        .stage-card h3 {
          margin: 0 0 6px;
          color: var(--cs-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.3;
        }

        .stage-card p {
          margin: 0 0 16px;
          color: var(--cs-muted);
          font-size: 12px;
          line-height: 1.6;
          flex-grow: 1;
        }

        .stage-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: auto;
          color: var(--cs-maroon);
          font-size: 12px;
          font-weight: 700;
          transition: gap .2s ease;
          white-space: nowrap;
        }

        .stage-card:hover .stage-link {
          gap: 8px;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .choose-stage {
            padding: 44px 0 48px;
          }

          .stage-heading {
            margin-bottom: 24px;
          }

          .stage-card {
            padding: 20px 16px;
            min-width: 165px;
          }
        }
      `}</style>

      <div className="stage-container">
        <div className="stage-heading">
          <h2>Choose by Stage</h2>
          <p>
            Find resources that match where you are in your
            parenthood journey.
          </p>
        </div>

        <div className="stage-grid">
          {stages.map((stage) => (
            <button
              type="button"
              className="stage-card"
              key={stage.filter}
              onClick={() => onBrowseResources?.(stage.filter)}
              aria-label={`Browse ${stage.title} resources`}
            >
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>

              <span className="stage-link">
                Browse resources <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
