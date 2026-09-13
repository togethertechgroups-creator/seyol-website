'use client';

import React, { useState } from 'react';
import { ChevronDown, Award, HelpCircle } from 'lucide-react';
import { faqsData } from '../../data/faqs';
import { FAQItem } from '../../types';

export const SmartFAQAccordion: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'products' | 'classes' | 'traditions' | 'booking-policies'>('all');
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'services', label: 'Confinement & Massage' },
    { id: 'classes', label: 'Classes & Cohorts' },
    { id: 'products', label: 'Herbal Oils & Products' },
    { id: 'traditions', label: 'Traditions & Safety' },
    { id: 'booking-policies', label: 'Booking & Deposit' },
  ];

  const filtered = activeCategory === 'all'
    ? faqsData
    : faqsData.filter((f: FAQItem) => f.category === activeCategory);

  return (
    <div className="w-full space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeCategory === cat.id
                ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm'
                : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filtered.map((item: FAQItem) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-cream-light rounded-2xl border border-cream-border overflow-hidden transition-all shadow-warm-sm"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-brown hover:text-maroon transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{item.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-maroon shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brown-muted leading-relaxed border-t border-cream-border/60 bg-cream/30">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
