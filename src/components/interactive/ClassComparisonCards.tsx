'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, ArrowRight, Clock, Video, GraduationCap, Users } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type ComparisonOption = 'newborn-vs-massage' | 'birth-vs-yoga' | 'single-vs-bundle';

export const ClassComparisonCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ComparisonOption>('newborn-vs-massage');
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full font-sans space-y-8">
      {/* Selector Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-cream border border-cream-border gap-1.5">
          <button
            onClick={() => setActiveTab('newborn-vs-massage')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'newborn-vs-massage'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Baby Massage vs Newborn Essentials
          </button>
          <button
            onClick={() => setActiveTab('birth-vs-yoga')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'birth-vs-yoga'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Childbirth Prep vs Prenatal Yoga
          </button>
          <button
            onClick={() => setActiveTab('single-vs-bundle')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'single-vs-bundle'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Individual Class vs Master Bundle
          </button>
        </div>
      </div>

      {/* Comparison 1: Baby Massage vs Newborn Essentials */}
      {activeTab === 'newborn-vs-massage' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card A */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brown-muted block">
                Hands-On Infant Touch & Bath
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Traditional Baby Massage & Bath Workshop
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Focused practical training on oil selection, head shaping strokes, colic relief sequences, and safe bucket bathing techniques.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹1,800 <span className="text-xs font-sans font-normal text-brown-muted">/ Couple Pass</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>2.5 Hours Interactive Doll Simulation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Includes free SEY 100ml Cold-Pressed Baby Oil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>In-Person Studio (Chennai) or Zoom Live</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Labour preparation or birth breathing</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Class Pass: Traditional Baby Massage & Bath Workshop' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Reserve Baby Massage Pass
              </button>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Broadest 0-100 Days Coverage
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-maroon block">
                Complete First 3 Months Guide
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Newborn Care Essentials Masterclass
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Covers everything from decoding crying cues, burping, swaddling, room temperature, safe sleep, and nursery setup to diaper rash care.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹1,500 <span className="text-xs font-sans font-normal text-brown-muted">/ Couple Pass</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>2 Hours Comprehensive Clinical Guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Includes printable first 100-day diaper & sleep log</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Interactive Q&A with Neonatal Clinical Nurse</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Lifetime HD Recording Access</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Class Pass: Newborn Care Essentials Masterclass' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Newborn Care Pass</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison 2: Childbirth Prep vs Prenatal Yoga */}
      {activeTab === 'birth-vs-yoga' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card A */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Couples’ Favourite
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-maroon block">
                Labour & Delivery Mastery
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Childbirth Preparation Masterclass
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                2-part weekend masterclass teaching labour stages, natural pain management, epidural facts, and partner hands-on counterpressure.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹4,999 <span className="text-xs font-sans font-normal text-brown-muted">/ Couple Pass (2 Sessions)</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>2x 3-Hour live cohorts with senior doulas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Includes Hospital Bag Checklist & Birth Plan template</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Partner learns active hip squeeze & breathing cues</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Class Pass: Childbirth Preparation Masterclass' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Childbirth Prep Pass</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brown-muted block">
                Ongoing Physical Movement
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Prenatal Yoga & Pelvic Mobility (4-Week Series)
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Weekly movement classes designed to alleviate sciatica, open pelvic joints, and build stamina for birth through gentle Asanas.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹3,500 <span className="text-xs font-sans font-normal text-brown-muted">/ 4-Week Series</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>4x 60-Minute live guided yoga classes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Pelvic floor toning & diaphragmatic breathwork</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Trimester-safe posture adaptations</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Series Pass: Prenatal Yoga & Pelvic Mobility' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Join 4-Week Yoga Series
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison 3: Individual Class vs Master Bundle */}
      {activeTab === 'single-vs-bundle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card A */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brown-muted block">
                Targeted Single Topic
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Single Workshop Pass
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Choose any specific masterclass (e.g. only Baby Massage, or only Lactation Guidance) to resolve your immediate care query.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹1,500 - ₹2,000 <span className="text-xs font-sans font-normal text-brown-muted">/ Workshop</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Full access to 1 chosen live workshop cohort</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Partner attends free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Lifetime replay of that session</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Single Workshop Pass' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Select 1 Workshop
              </button>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Save 35% • All-Access Pass
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-maroon block">
                Ultimate Parenthood Preparation
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                All-Access Parenthood Master Bundle
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Includes all 4 flagship masterclasses (Childbirth Prep, Newborn Care, Baby Massage & Bath, Lactation & Latch) + SEY Baby Care Starter Kit.
              </p>
              <div className="font-serif font-bold text-xl text-maroon pt-1">
                ₹6,999 <span className="text-xs font-sans line-through text-brown-muted">₹10,500</span> <span className="text-xs font-bold text-green-700 font-sans">(35% OFF)</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-brown">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>All 4 live masterclasses with senior educators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Free SEY Botanical Baby Oil & Care Kit delivered home</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Direct WhatsApp group access for instructor Q&A</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Printable workbook library and lifetime video vault</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'All-Access Parenthood Master Bundle' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Unlock All-Access Bundle</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
