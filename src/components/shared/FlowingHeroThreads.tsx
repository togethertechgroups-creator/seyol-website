'use client';

import React, { useState, useEffect, useRef } from 'react';
import './FlowingHeroThreads.css';

export interface FlowingHeroThreadsProps {
  activeSlideIndex?: number;
  className?: string;
}

interface ThreadDefinition {
  id: string;
  name: string;
  label: string;
  color: string;
  restingPath: string;
  restingEndX: number;
  restingEndY: number;
  extendedPath: string;
  extendedEndX: number;
  extendedEndY: number;
}

// 4 distinct flowing threads matching the 4 hero slides with high-curvature, organic Maven Clinic wave design:
// Slide 0: Certified Doulas (Teal / Cyan)
// Slide 1: Licensed Employment Agency (Gold / Honey)
// Slide 2: Registered Company (Lilac / Purple)
// Slide 3: Years of Hands-On Care Experience (Coral / Rose)
const THREADS: ThreadDefinition[] = [
  {
    id: 'thread-doulas',
    name: 'Teal',
    label: 'Certified Doulas',
    color: '#2dd4bf', // Crisp Teal / Cyan
    restingPath: 'M 0 460 C 120 520, 240 420, 360 465 C 390 475, 410 470, 425 460',
    restingEndX: 425,
    restingEndY: 460,
    extendedPath: 'M 0 460 C 180 540, 340 400, 520 465 C 680 520, 840 380, 1020 425',
    extendedEndX: 1020,
    extendedEndY: 425,
  },
  {
    id: 'thread-agency',
    name: 'Gold',
    label: 'Licensed Employment Agency',
    color: '#facc15', // Vibrant Gold
    restingPath: 'M 0 490 C 130 420, 260 540, 390 485 C 420 475, 435 480, 450 490',
    restingEndX: 450,
    restingEndY: 490,
    extendedPath: 'M 0 490 C 200 410, 380 560, 580 475 C 740 410, 900 540, 1060 470',
    extendedEndX: 1060,
    extendedEndY: 470,
  },
  {
    id: 'thread-company',
    name: 'Purple',
    label: 'Registered Company',
    color: '#c084fc', // Lilac / Purple
    restingPath: 'M 0 525 C 130 580, 270 460, 400 520 C 425 530, 440 525, 455 520',
    restingEndX: 455,
    restingEndY: 520,
    extendedPath: 'M 0 525 C 190 590, 380 440, 570 525 C 750 595, 910 450, 1040 510',
    extendedEndX: 1040,
    extendedEndY: 510,
  },
  {
    id: 'thread-experience',
    name: 'Coral',
    label: 'Years of Hands-On Care Experience',
    color: '#fb7185', // Warm Coral / Rose
    restingPath: 'M 0 555 C 120 490, 250 590, 370 545 C 400 535, 415 540, 430 550',
    restingEndX: 430,
    restingEndY: 550,
    extendedPath: 'M 0 555 C 180 480, 360 610, 550 535 C 720 470, 890 585, 1025 545',
    extendedEndX: 1025,
    extendedEndY: 545,
  },
];

export const FlowingHeroThreads: React.FC<FlowingHeroThreadsProps> = ({
  activeSlideIndex = 0,
  className = '',
}) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [threadPhase, setThreadPhase] = useState<'extending' | 'holding' | 'retracting'>('extending');
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // When activeSlideIndex changes (each slide lasts ~6000ms):
  // 1. Immediately extend the thread (0ms to 1200ms)
  // 2. Hold at peak with text visible (1200ms to 4200ms)
  // 3. Smoothly retract back into resting position (4200ms to 5800ms)
  useEffect(() => {
    if (!animationStarted) return;

    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }

    // Phase 1: Extending
    setThreadPhase('extending');

    // Phase 2: Holding after 1.2s
    const holdTimer = setTimeout(() => {
      setThreadPhase('holding');
    }, 1200);

    // Phase 3: Retracting after 4.2s (smoothly recoils back into position)
    const retractTimer = setTimeout(() => {
      setThreadPhase('retracting');
    }, 4200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(retractTimer);
    };
  }, [activeSlideIndex, animationStarted]);

  if (!animationStarted) {
    return null;
  }

  const activeIdx = activeSlideIndex % THREADS.length;
  const activeThread = THREADS[activeIdx];
  const isRetracting = threadPhase === 'retracting';

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {THREADS.map((thread, idx) => {
          const isActive = activeIdx === idx;
          const isExtended = isActive && !isRetracting;

          return (
            <g key={thread.id} className="maven-thread-group">
              {/* Resting Base Path (Always subtly anchored) */}
              <path
                d={thread.restingPath}
                stroke={thread.color}
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeOpacity={isActive ? 0.35 : 0.6}
                className="maven-line-static"
              />

              {/* Extended Dynamic Path with smooth extending & retracting animation */}
              {isActive && (
                <path
                  key={`${thread.id}-active-${threadPhase}-${activeIdx}`}
                  d={thread.extendedPath}
                  stroke={thread.color}
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  className={
                    threadPhase === 'retracting'
                      ? 'maven-line-retracting'
                      : 'maven-line-extending'
                  }
                />
              )}

              {/* Terminal Resting Dot */}
              {!isActive && (
                <circle
                  cx={thread.restingEndX}
                  cy={thread.restingEndY}
                  r="2.5"
                  fill={thread.color}
                  className="maven-dot-static"
                />
              )}

              {/* Active Terminal Dot */}
              {isActive && (
                <circle
                  cx={threadPhase === 'retracting' ? thread.restingEndX : thread.extendedEndX}
                  cy={threadPhase === 'retracting' ? thread.restingEndY : thread.extendedEndY}
                  r="3.5"
                  fill={thread.color}
                  className={
                    threadPhase === 'retracting'
                      ? 'maven-dot-retracting'
                      : 'maven-dot-active'
                  }
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Text label beside the terminal dot with semi-transparent background for readability */}
      {activeThread && (
        <div
          key={`text-${activeThread.id}-${activeIdx}-${threadPhase}`}
          className={`maven-text-container absolute flex items-center pointer-events-none transition-all duration-500 ${
            threadPhase === 'retracting'
              ? 'opacity-0 scale-95 translate-x-[-10px]'
              : 'opacity-100 scale-100 translate-x-0 maven-text-reveal'
          }`}
          style={{
            left: `${(activeThread.extendedEndX / 1440) * 100}%`,
            top: `${(activeThread.extendedEndY / 650) * 100}%`,
            transform: 'translate(12px, -50%)',
          }}
        >
          {/* Subtle semi-transparent white background badge to maximize readability */}
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-heading font-extrabold text-[10.5px] sm:text-xs md:text-[13px] tracking-wider uppercase whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
            {activeThread.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default FlowingHeroThreads;
