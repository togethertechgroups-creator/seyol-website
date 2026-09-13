'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Calendar } from 'lucide-react';
import Link from 'next/link';

export interface AnnouncementTickerProps {
  announcements?: {
    id: string;
    text: string;
    badge?: string;
    linkUrl?: string;
    linkText?: string;
  }[];
}

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: '1',
    badge: 'NEW COHORT',
    text: 'Chennai Live Infant Massage & Postnatal Bath Masterclass — Saturday Batch Open!',
    linkUrl: '/classes',
    linkText: 'Reserve Seat',
  },
  {
    id: '2',
    badge: 'HERITAGE CARE',
    text: '28 & 40-Day Postpartum Confinement Nanny Slots Booking for Q3 & Q4 2026',
    linkUrl: '/services#confinement-nanny',
    linkText: 'Enquire Availability',
  },
  {
    id: '3',
    badge: 'BOTANICAL RELEASE',
    text: '100% Pure Dhanwantharam & Nalangu Maavu Herbal Sets — Free Delivery Across Tamil Nadu',
    linkUrl: '/products',
    linkText: 'Shop Rituals',
  },
];

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({
  announcements = DEFAULT_ANNOUNCEMENTS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="w-full bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark text-cream-light py-2 px-4 text-xs font-sans border-b border-gold/30 relative z-50 overflow-hidden shadow-warm-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Ticker Label & Content */}
        <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
          {current.badge && (
            <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold-light text-[10px] font-bold tracking-wider uppercase border border-gold/40 shrink-0">
              {current.badge}
            </span>
          )}
          <span className="text-cream-light/90 font-medium truncate">
            {current.text}
          </span>
        </div>

        {/* Right CTA & Controls */}
        <div className="flex items-center space-x-4 shrink-0">
          {current.linkUrl && (
            <Link
              href={current.linkUrl}
              className="hidden sm:inline-flex items-center space-x-1 text-gold-light hover:text-white font-semibold underline underline-offset-2 transition-colors"
            >
              <span>{current.linkText || 'Learn More'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          )}

          {announcements.length > 1 && (
            <button
              onClick={handleNext}
              className="text-gold-light/70 hover:text-white text-[11px] font-medium transition-colors"
              title="Next update"
            >
              ({currentIndex + 1}/{announcements.length}) Next
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 rounded-full text-gold/60 hover:text-white hover:bg-maroon-dark/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
