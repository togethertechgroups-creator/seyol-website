'use client';

import React from 'react';
import { Star, ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';

const TRUST_ITEMS = [
  { text: '4,500+ Mother & Baby Families Supported', icon: Heart },
  { text: '100% Police Verified & Health Screened Care Matrons', icon: ShieldCheck },
  { text: '4.98 / 5 Rating Across 1,200+ Verified Reviews', icon: Star },
  { text: '18+ Years South Indian Confinement Heritage', icon: Award },
  { text: 'Ayush-Certified Cold-Pressed Botanical Oils', icon: Sparkles },
  { text: 'Certified Birth & Postnatal Doula Supervision', icon: ShieldCheck },
];

export const TrustMarquee: React.FC = () => {
  return (
    <div className="w-full bg-cream-dark/40 border-y border-cream-border py-3 overflow-hidden select-none">
      <div className="flex space-x-8 animate-marquee whitespace-nowrap">
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-brown shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-gold/20 text-maroon flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-gold-dark" />
              </div>
              <span>{item.text}</span>
              <span className="text-gold/60 ml-4">•</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
