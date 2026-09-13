'use client';

import React, { useState } from 'react';
import './StrokeText.css';

export interface StrokeTextProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: string;
}

const StrokeText: React.FC<StrokeTextProps> = ({
  text = 'SEYOL',
  className = '',
  style = {},
  fontSize = 'clamp(2.4rem, 7.5vw, 6.2rem)'
}) => {
  const [animKey, setAnimKey] = useState(0);
  const chars = Array.from(text);

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      key={animKey}
      onMouseEnter={handleReplay}
      className={`relative inline-flex items-center select-none py-0.5 ${className}`.trim()}
      style={style}
    >
      <h1 className="flex items-center font-serif font-black tracking-tight leading-none uppercase text-cream-light drop-shadow-xl">
        {chars.map((char, i) => (
          <span
            key={i}
            className="stroke-char-animate font-serif font-black"
            style={{
              fontSize,
              animationDelay: `${i * 0.05}s`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default StrokeText;
