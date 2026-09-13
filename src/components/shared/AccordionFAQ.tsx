'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { faqsData } from '../../data/faqs';
import { FAQItem } from '../../types';

export const AccordionFAQ: React.FC<{ defaultCategory?: string }> = ({
  defaultCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [openIds, setOpenIds] = useState<string[]>([faqsData[0].id]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqsData.filter(
    (faq) => selectedCategory === 'all' || faq.category === selectedCategory
  );

  return (
    <div className="w-full font-sans">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'services', label: 'Confinement & Massage' },
          { id: 'products', label: 'SEY Herbal Formulations' },
          { id: 'classes', label: 'Workshops & Cohorts' },
          { id: 'booking-policies', label: 'Booking & Due Dates' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
              selectedCategory === cat.id
                ? 'bg-maroon text-cream-light border-maroon shadow-sm'
                : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-cream-light rounded-2xl border border-cream-border overflow-hidden transition-all duration-200 shadow-warm-sm"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-gold-dark flex-shrink-0" />
                  <span className="font-serif font-bold text-sm sm:text-base text-brown group-hover:text-maroon transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full bg-cream flex items-center justify-center text-brown-muted transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-maroon text-cream-light' : ''
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brown-muted leading-relaxed border-t border-cream-border/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
