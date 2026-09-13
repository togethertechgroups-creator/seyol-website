'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WordRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  stagger?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  as: Component = 'div',
  className = '',
  delay = 0,
  stagger = 0.08,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordSpans = container.querySelectorAll('.reveal-word-item');
    if (!wordSpans.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-[0.1em] ${className}`.trim()}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-word-item inline-block">
          {word}
        </span>
      ))}
    </Component>
  );
};

export default WordReveal;
