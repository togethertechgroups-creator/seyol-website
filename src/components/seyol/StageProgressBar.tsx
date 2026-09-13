'use client';

import React from 'react';
import { JourneyStage } from '../../types';
import { useVisitorJourney } from '../../context/VisitorJourneyContext';
import { Sparkles, Heart, Baby, Flower2, Award } from 'lucide-react';

const STAGE_STEPS = [
  { id: 'preconception' as JourneyStage, label: 'Preconception', icon: Sparkles },
  { id: 'pregnancy' as JourneyStage, label: 'Pregnancy', icon: Heart },
  { id: 'birth' as JourneyStage, label: 'Birth Prep', icon: Award },
  { id: 'postpartum' as JourneyStage, label: 'Postpartum', icon: Flower2 },
  { id: 'newborn' as JourneyStage, label: 'Newborn Care', icon: Baby },
];

export const StageProgressBar: React.FC = () => {
  const { stage, setStage } = useVisitorJourney();

  const activeIndex = STAGE_STEPS.findIndex((s) => s.id === stage);

  return (
    <div className="w-full bg-cream-light p-4 rounded-2xl border border-cream-border shadow-warm-sm">
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-cream-dark -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-4 h-1 bg-maroon -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: `${(activeIndex / (STAGE_STEPS.length - 1)) * 100}%`,
          }}
        />

        {/* Stage Nodes */}
        {STAGE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx <= activeIndex;
          const isCurrent = step.id === stage;

          return (
            <button
              key={step.id}
              onClick={() => setStage(step.id)}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isCurrent
                    ? 'bg-maroon text-gold shadow-warm-md scale-110 ring-4 ring-gold/30'
                    : isActive
                    ? 'bg-maroon text-cream-light'
                    : 'bg-cream border-2 border-cream-border text-brown-muted hover:border-gold'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-2 transition-colors ${
                  isCurrent ? 'text-maroon font-bold' : isActive ? 'text-brown' : 'text-brown-muted/70'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
