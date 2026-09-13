'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Star, 
  Award, 
  ShieldCheck, 
  Heart,
  Baby,
  Calendar,
  ChevronRight,
  Flower2
} from 'lucide-react';
import { servicesData } from '../../data/services';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type TabCategory = 'postpartum' | 'prenatal' | 'newborn';

export const FlagshipShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabCategory>('postpartum');
  const { openEnquiry } = useQuickEnquiry();

  // Find flagship packages per category
  const mainService = 
    activeTab === 'postpartum'
      ? servicesData.find((s) => s.id === 'postpartum-massage-wrap') || servicesData[3]
      : activeTab === 'prenatal'
      ? servicesData.find((s) => s.id === 'prenatal-massage') || servicesData[1]
      : servicesData.find((s) => s.id === 'infant-massage-bath') || servicesData[4];

  const secondaryServices = 
    activeTab === 'postpartum'
      ? [
          servicesData.find((s) => s.id === 'mother-baby-combo') || servicesData[5],
          servicesData.find((s) => s.id === 'confinement-nanny') || servicesData[6],
        ]
      : activeTab === 'prenatal'
      ? [
          servicesData.find((s) => s.id === 'birth-doula-support') || servicesData[2],
          servicesData.find((s) => s.id === 'preconception-care') || servicesData[0],
        ]
      : [
          servicesData.find((s) => s.id === 'hourly-newborn-support') || servicesData[7],
          servicesData.find((s) => s.id === 'lactation-support') || servicesData[8],
        ];

  return (
    <div className="w-full space-y-10 font-sans">
      {/* Category Tabs Bar */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {[
          { id: 'postpartum', label: 'Postpartum & Confinement Sanctuary', icon: Flower2 },
          { id: 'prenatal', label: 'Prenatal Comfort & Doula Birth Care', icon: Heart },
          { id: 'newborn', label: 'Newborn Bath & Infant Bodywork', icon: Baby },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabCategory)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-gold via-gold-light to-gold text-maroon-dark border-gold shadow-warm-md scale-[1.02] ring-2 ring-gold/40'
                  : 'bg-[#2a060d]/80 text-cream-light/80 border-gold/20 hover:border-gold/50 hover:bg-[#3d0913]/90'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? 'text-maroon-dark' : 'text-gold-light'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Asymmetric Magazine Layout Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Main Hero Spotlight Card (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#3b0b18] via-[#24060e] to-[#150206] border border-gold/40 p-6 sm:p-9 shadow-warm-xl relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon-light/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Badge & Rating Row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-gold to-gold-dark text-maroon-dark text-[11px] font-extrabold uppercase tracking-wider shadow-sm flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 fill-maroon-dark text-maroon-dark" />
                <span>#1 Flagship Package</span>
              </span>

              <div className="flex items-center space-x-2 text-xs text-gold-light/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>AYUSH Certified Practice</span>
              </div>
            </div>

            {/* Middle Spotlight Media & Content */}
            <div className="relative z-10 space-y-5">
              <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-gold/30 shadow-warm-md">
                <img
                  src={mainService.heroImage}
                  alt={mainService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150206] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-cream-light">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">
                    {mainService.format} • {mainService.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-cream-light leading-snug">
                  {mainService.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed">
                  {mainService.summary}
                </p>
              </div>

              {/* Ritual Features Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {mainService.features.slice(0, 4).map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start space-x-2 bg-[#2d0710]/80 backdrop-blur-xs p-2.5 rounded-xl border border-gold/20 text-xs text-cream-light/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Pricing & Primary CTA Row */}
            <div className="relative z-10 pt-7 mt-6 border-t border-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gold-light/70 font-semibold block">
                  Transparent Investment
                </span>
                <span className="font-serif font-extrabold text-base sm:text-lg text-gold">
                  {mainService.pricingGuide}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href={`/services/${mainService.slug}`}
                  className="px-4 py-3 rounded-2xl bg-cream-light/10 hover:bg-cream-light/20 text-cream-light text-xs font-bold transition-colors border border-gold/30 text-center"
                >
                  View Details
                </Link>

                <button
                  onClick={() => openEnquiry({ serviceTitle: mainService.title })}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold hover:brightness-110 text-maroon-dark font-extrabold text-xs uppercase tracking-wider shadow-warm-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-maroon-dark" />
                  <span>Book Guidance</span>
                  <ArrowRight className="w-4 h-4 text-maroon-dark" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Packages Vertical Stack (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="font-serif text-lg font-bold text-cream-light flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Complementary Care Packages</span>
                </h4>
                <span className="text-xs text-gold-light/70">Top Selection</span>
              </div>

              {secondaryServices.map((secService) => {
                if (!secService) return null;
                return (
                  <div
                    key={secService.id}
                    className="rounded-3xl bg-gradient-to-br from-[#2e0711] to-[#1a0308] border border-gold/25 p-5 shadow-warm-md hover:border-gold/60 transition-all duration-300 group flex flex-col justify-between space-y-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gold/30 relative">
                        <img
                          src={secService.heroImage}
                          alt={secService.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                          {secService.shortTitle}
                        </span>
                        <h5 className="font-serif text-base font-bold text-cream-light leading-snug line-clamp-1">
                          {secService.title}
                        </h5>
                        <p className="text-xs text-cream-light/75 leading-relaxed line-clamp-2">
                          {secService.benefit}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-gold">
                        {secService.pricingGuide.split('|')[0]}
                      </span>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/services/${secService.slug}`}
                          className="text-xs font-bold text-gold-light hover:text-gold flex items-center space-x-1"
                        >
                          <span>Explore</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => openEnquiry({ serviceTitle: secService.title })}
                          className="px-3.5 py-1.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold-light font-bold text-xs transition-colors border border-gold/30"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Callout Banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-maroon-dark/90 via-[#3a0815] to-maroon-dark/90 border border-gold/30 text-xs text-cream-light space-y-2">
              <div className="flex items-center space-x-2 font-serif font-bold text-gold text-sm">
                <Award className="w-4 h-4 text-gold" />
                <span>Custom Combined Packages Available</span>
              </div>
              <p className="text-cream-light/80 text-xs leading-relaxed">
                Need a tailored 15, 28, or 40-day custom routine for twin births, Caesarean recovery, or specific family budgets? Our senior matrons will personalize a protocol for you.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
