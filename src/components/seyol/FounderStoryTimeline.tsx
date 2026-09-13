'use client';

import React from 'react';
import { Award, Heart, ShieldCheck, Sparkles, Flower2 } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    year: '2008',
    title: 'Heritage Roots & Traditional Matron Apprenticeship',
    description: 'Ms Jemma Francis & Ms Janet Francis begin documenting South Indian maternal oil-curing formulations and traditional postpartum confinement techniques passed down through generations.',
    icon: Flower2,
  },
  {
    year: '2014',
    title: 'SEYOL Academy & Verification Standards',
    description: 'Formalizing clinical hygiene protocols, scar safety checks, and background screening. Over 100 postnatal matrons trained under obstetric supervision.',
    icon: ShieldCheck,
  },
  {
    year: '2020',
    title: 'Launch of SEY Botanical Formulations',
    description: 'Developing cold-pressed Dhanwantharam massage oils, soap-free Nalangu Maavu bath powders, and colic belly roll-ons without synthetic additives.',
    icon: Sparkles,
  },
  {
    year: '2026',
    title: '4,500+ Families Served & Modern Virtual Expansion',
    description: 'Delivering hands-on home confinement across Tamil Nadu while hosting live interactive masterclasses for modern parents globally.',
    icon: Heart,
  },
];

export const FounderStoryTimeline: React.FC = () => {
  return (
    <div className="w-full bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-lg space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-gold-dark" />
          <span>Our Heritage Journey</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
          18+ Years of Sacred Postnatal Heritage
        </h3>
      </div>

      <div className="relative max-w-3xl mx-auto space-y-8 before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gold/30">
        {TIMELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`relative flex items-center justify-between gap-8 ${
                isEven ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full sm:w-[45%] bg-cream p-5 rounded-2xl border border-cream-border shadow-warm-sm space-y-2">
                <span className="font-serif font-bold text-lg text-maroon">{step.year}</span>
                <h4 className="font-serif font-bold text-sm text-brown">{step.title}</h4>
                <p className="text-xs text-brown-muted leading-relaxed">{step.description}</p>
              </div>

              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-maroon text-gold flex items-center justify-center border-2 border-gold shadow-warm-sm z-10">
                <Icon className="w-4 h-4" />
              </div>

              <div className="hidden sm:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
