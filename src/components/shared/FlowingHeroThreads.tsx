'use client';

import React, { useState, useEffect } from 'react';
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

// 4 distinct flowing threads matching the 4 hero slides:
// Slide 0: Certified Doulas (Teal / Turquoise)
// Slide 1: Licensed Employment Agency (Gold / Honey)
// Slide 2: Registered Company (Lilac / Purple)
// Slide 3: Years of Hands-On Care Experience (Coral / Rose)
const THREADS: ThreadDefinition[] = [
  {
    id: 'thread-doulas',
    name: 'Teal',
    label: 'Certified Doulas',
    color: '#2dd4bf', // Teal / Cyan
    restingPath: 'M 0 470 C 100 470, 200 495, 290 490 C 330 485, 360 475, 385 465',
    restingEndX: 385,
    restingEndY: 465,
    extendedPath: 'M 0 470 C 120 470, 220 500, 320 495 C 460 490, 620 445, 800 405 C 890 385, 960 395, 1020 415',
    extendedEndX: 1020,
    extendedEndY: 415,
  },
  {
    id: 'thread-agency',
    name: 'Gold',
    label: 'Licensed Employment Agency',
    color: '#facc15', // Gold / Honey
    restingPath: 'M 0 495 C 100 495, 190 470, 290 480 C 340 485, 380 495, 410 495',
    restingEndX: 410,
    restingEndY: 495,
    extendedPath: 'M 0 495 C 110 495, 220 465, 330 475 C 470 490, 660 515, 840 470 C 920 445, 990 450, 1040 455',
    extendedEndX: 1040,
    extendedEndY: 455,
  },
  {
    id: 'thread-company',
    name: 'Purple',
    label: 'Registered Company',
    color: '#c084fc', // Lilac / Purple
    restingPath: 'M 0 520 C 90 520, 180 545, 270 540 C 330 535, 380 525, 420 520',
    restingEndX: 420,
    restingEndY: 520,
    extendedPath: 'M 0 520 C 100 520, 200 550, 310 540 C 440 525, 620 510, 790 520 C 880 525, 960 510, 1020 495',
    extendedEndX: 1020,
    extendedEndY: 495,
  },
  {
    id: 'thread-experience',
    name: 'Coral',
    label: 'Years of Hands-On Care Experience',
    color: '#fb7185', // Warm Coral / Rose
    restingPath: 'M 0 550 C 90 550, 180 530, 260 535 C 310 540, 345 545, 375 550',
    restingEndX: 375,
    restingEndY: 550,
    extendedPath: 'M 0 550 C 110 550, 210 525, 310 535 C 450 550, 630 565, 810 540 C 900 525, 960 535, 1000 535',
    extendedEndX: 1000,
    extendedEndY: 535,
  },
];

export const FlowingHeroThreads: React.FC<FlowingHeroThreadsProps> = ({
  activeSlideIndex = 0,
  className = '',
}) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Immediate, crisp initialization
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!animationStarted) {
    return null;
  }

  // Active thread advances with the hero slideshow (4 slides total)
  const activeIdx = activeSlideIndex % THREADS.length;
  const activeThread = THREADS[activeIdx];

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
          const isExtended = activeIdx === idx;

          return (
            <g key={thread.id} className="maven-thread-group">
              {/* Crisp Solid Vector Line */}
              <path
                key={`${thread.id}-${isExtended ? 'ext' : 'rst'}`}
                d={isExtended ? thread.extendedPath : thread.restingPath}
                stroke={thread.color}
                strokeWidth={isExtended ? 1.6 : 1.15}
                strokeLinecap="round"
                strokeOpacity={isExtended ? 0.95 : 0.6}
                className={isExtended ? 'maven-line-active' : 'maven-line-static'}
              />

              {/* Resting Terminal Dot */}
              {!isExtended && (
                <circle
                  cx={thread.restingEndX}
                  cy={thread.restingEndY}
                  r="2.5"
                  fill={thread.color}
                  className="maven-dot-static"
                />
              )}

              {/* Active Terminal Dot */}
              {isExtended && (
                <circle
                  cx={thread.extendedEndX}
                  cy={thread.extendedEndY}
                  r="3.5"
                  fill={thread.color}
                  className="maven-dot-active"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Pure text label beside the terminal dot (No box / No tag container) */}
      {activeThread && (
        <div
          key={`text-${activeThread.id}-${activeIdx}`}
          className="maven-text-container absolute flex items-center pointer-events-none maven-text-reveal"
          style={{
            left: `${(activeThread.extendedEndX / 1440) * 100}%`,
            top: `${(activeThread.extendedEndY / 650) * 100}%`,
            transform: 'translate(10px, -50%)',
          }}
        >
          <span className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-widest uppercase whitespace-nowrap text-white font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {activeThread.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default FlowingHeroThreads;
