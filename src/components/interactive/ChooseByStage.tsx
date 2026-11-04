'use client';

import React from "react";
import "./ChooseByStage.css";

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
