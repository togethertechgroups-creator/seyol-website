'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const item = testimonialsData[currentIndex];

  return (
    <div className="w-full bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-10 shadow-warm-md relative">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon">
            <Quote className="w-4 h-4 text-gold-dark" />
            <span>Verified Parent Story ({currentIndex + 1} of {testimonialsData.length})</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-cream hover:bg-cream-dark text-maroon border border-cream-border transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-cream hover:bg-cream-dark text-maroon border border-cream-border transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
          ))}
        </div>

        {/* Quote & Story */}
        <blockquote className="font-serif text-lg sm:text-xl font-bold text-brown leading-relaxed italic">
          "{item.quote}"
        </blockquote>

        <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
          {item.detailedStory}
        </p>

        {/* Author Details */}
        <div className="pt-4 border-t border-cream-border flex items-center justify-between text-xs">
          <div>
            <div className="font-serif font-bold text-sm text-maroon">
              {item.author}
            </div>
            <div className="text-brown-muted">
              {item.location} • {item.serviceOrProduct}
            </div>
          </div>

          {item.verifiedParent && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-[11px] font-semibold border border-maroon/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Family</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
