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
  restingPath: string;
  restingEndX: number;
  restingEndY: number;
  extendedPath: string;
  extendedEndX: number;
  extendedEndY: number;
  color: string;
}

// 3 distinct woven threads matching user instructions:
// 1. Cyan/Teal (#2dd4bf): Arches highest under buttons, ending at (430, 472)
// 2. Yellow/Gold (#facc15): Sweeps between Cyan (top) and Purple (bottom), resting at (385, 505)
// 3. Purple (#c084fc): Runs below Yellow, resting at (410, 532)
const THREADS: ThreadDefinition[] = [
  {
    id: 'thread-gold',
    name: 'Yellow',
    // Starts at (0, 475), curves into the middle between Cyan (above) and Purple (below)
    restingPath: 'M 0 475 C 100 475, 200 515, 290 515 C 330 515, 360 510, 385 505',
    restingEndX: 385,
    restingEndY: 505,
    // Maven's signature wide, gentle golden swoop across the open hero area
    extendedPath: 'M 0 475 C 100 475, 200 515, 290 515 C 440 515, 620 480, 820 420 C 920 390, 1000 405, 1060 435',
    extendedEndX: 1060,
    extendedEndY: 435,
    color: '#facc15', // Gold / Yellow
  },
  {
    id: 'thread-cyan',
    name: 'Cyan',
    // Starts at (0, 525), arches UP crossing over purple, resting highest under 2nd button
    restingPath: 'M 0 525 C 100 525, 200 480, 310 470 C 360 465, 400 468, 430 472',
    restingEndX: 430,
    restingEndY: 472,
    extendedPath: 'M 0 525 C 100 525, 200 480, 310 470 C 450 455, 650 480, 850 450 C 950 435, 1010 450, 1060 460',
    extendedEndX: 1060,
    extendedEndY: 460,
    color: '#2dd4bf', // Teal / Cyan
  },
  {
    id: 'thread-purple',
    name: 'Purple',
    // Starts at (0, 500), dips down below yellow, resting below yellow
    restingPath: 'M 0 500 C 90 505, 180 550, 270 545 C 330 540, 380 535, 410 532',
    restingEndX: 410,
    restingEndY: 532,
    extendedPath: 'M 0 500 C 90 505, 180 550, 270 545 C 410 540, 580 530, 760 500 C 880 480, 970 495, 1040 510',
    extendedEndX: 1040,
    extendedEndY: 510,
    color: '#c084fc', // Lilac / Purple
  },
];

export const FlowingHeroThreads: React.FC<FlowingHeroThreadsProps> = ({
  activeSlideIndex = 0,
  className = '',
}) => {
  // Exactly 3 seconds delay after website load before lines appear & start animating
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Before 3 seconds: do not render lines at all
  if (!animationStarted) {
    return null;
  }

  // Slide 0: Yellow thread (idx 0), Slide 1: Cyan (idx 1), Slide 2: Purple (idx 2)
  const activeIdx = activeSlideIndex % THREADS.length;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Render Order: Purple -> Yellow -> Cyan (so they weave and overlap cleanly) */}
        {THREADS.map((thread, idx) => {
          const isExtended = activeIdx === idx;

          return (
            <g key={thread.id} className="maven-thread-group">
              {/* Crisp Solid Vector Line - No Blurs, No Glows */}
              <path
                key={`${thread.id}-${isExtended ? 'ext' : 'rst'}`}
                d={isExtended ? thread.extendedPath : thread.restingPath}
                stroke={thread.color}
                strokeWidth={isExtended ? 1.4 : 1.15}
                strokeLinecap="round"
                strokeOpacity={isExtended ? 0.95 : 0.7}
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
    </div>
  );
};

export default FlowingHeroThreads;
