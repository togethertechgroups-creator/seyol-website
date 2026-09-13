'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Users, 
  Calendar, 
  Video, 
  Award,
  Baby,
  Heart
} from 'lucide-react';
import { classesData } from '../../data/classes';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const PopularClassesShowcase: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();

  // Highlight top 3 flagship masterclasses
  const popularClasses = [
    {
      ...classesData[0], // Baby Massage
      highlightBadge: '★ #1 Most Recommended by Paediatricians',
      accentColor: 'border-gold',
      studentCount: '3,200+ Parents Trained',
      rating: '4.99/5 Rating',
    },
    {
      ...classesData[1], // Newborn Essentials or Birth Prep
      highlightBadge: 'Essential for 3rd Trimester Expectant Couples',
      accentColor: 'border-maroon/40',
      studentCount: '2,800+ Couples Graduated',
      rating: '4.98/5 Rating',
    },
    {
      ...classesData[2], // Lactation / Prep
      highlightBadge: 'Painless Feeding & Golden Hour Success',
      accentColor: 'border-gold/60',
      studentCount: '1,900+ Mothers Supported',
      rating: '4.97/5 Rating',
    }
  ];

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-gold-dark text-gold-dark" />
          <span>Top Rated Workshops</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          Popular Classes Parents Start With
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          These three signature masterclasses have empowered thousands of parents to handle their newborns with total calm and zero panic.
        </p>
      </div>

      {/* Grid of 3 Larger Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {popularClasses.map((cls, idx) => (
          <div
            key={cls.id || idx}
            className="bg-white rounded-3xl sm:rounded-[32px] border-2 border-gold/40 p-6 sm:p-8 flex flex-col justify-between shadow-warm-md hover:shadow-warm-xl hover:-translate-y-1 transition-all duration-300 relative group"
          >
            {/* Top Badge & Rating */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-maroon text-cream-light text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  {cls.highlightBadge}
                </span>
                <div className="flex items-center space-x-1 text-xs font-bold text-maroon">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{cls.rating}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown group-hover:text-maroon transition-colors leading-snug">
                  {cls.title}
                </h3>
                <p className="text-xs text-brown-muted mt-1.5 leading-relaxed line-clamp-2">
                  {cls.tagline || cls.summary}
                </p>
              </div>

              {/* Tuition & Format Box */}
              <div className="p-3.5 rounded-2xl bg-cream border border-cream-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brown-muted block">Couple Tuition</span>
                  <span className="font-serif font-bold text-xl text-maroon">
                    ₹{cls.pricing?.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gold-dark bg-gold/20 px-2 py-0.5 rounded-full inline-block">
                    Partner Free
                  </span>
                  <span className="text-[11px] font-medium text-brown-muted block mt-0.5">{cls.duration}</span>
                </div>
              </div>

              {/* Curriculum Points */}
              <div className="space-y-2 pt-2 text-xs text-brown">
                <div className="font-bold text-[11px] uppercase tracking-wider text-brown-muted">Core Focus Areas:</div>
                {cls.whatYouLearn?.slice(0, 3).map((pt, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Instructor snippet */}
              {cls.instructor && (
                <div className="pt-3 border-t border-cream-border flex items-center space-x-3 text-xs">
                  <img
                    src={cls.instructor.avatar}
                    alt={cls.instructor.name}
                    className="w-9 h-9 rounded-full object-cover border border-gold"
                  />
                  <div>
                    <div className="font-bold text-brown">{cls.instructor.name}</div>
                    <div className="text-[11px] text-brown-muted">{cls.instructor.role}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-cream-border flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => openEnquiry({ serviceTitle: `Masterclass Pass: ${cls.title}` })}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer shimmer-button"
              >
                <span>Reserve Pass</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>

              <Link
                href={`/classes/${cls.slug}`}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-cream hover:bg-cream-dark text-brown text-xs font-bold border border-cream-border text-center transition-all cursor-pointer"
              >
                Syllabus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
