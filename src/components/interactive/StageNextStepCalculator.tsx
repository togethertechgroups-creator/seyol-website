'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar, Heart, Baby } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type TabType = 'due_date' | 'pregnancy_week' | 'baby_age';

export const StageNextStepCalculator: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();
  const [activeTab, setActiveTab] = useState<TabType>('baby_age');
  const [inputValue, setInputValue] = useState<string>('2 months');

  const recommendationsByTab: Record<
    TabType,
    {
      label: string;
      placeholder: string;
      defaultValue: string;
      recommendLabel: string;
      items: { name: string; type: 'service' | 'class' | 'product'; href: string }[];
    }
  > = {
    due_date: {
      label: 'Due date',
      placeholder: 'Select due date (e.g. Nov 15, 2026)',
      defaultValue: '2026-11-15',
      recommendLabel: 'Based on your due date, we recommend:',
      items: [
        { name: 'Prenatal Massage', type: 'service', href: '/services/prenatal-massage-therapy' },
        { name: 'Preparing for Birth with SEYOL', type: 'class', href: '/classes' },
        { name: 'Restorative Mother Massage Oil', type: 'product', href: '/products' },
      ],
    },
    pregnancy_week: {
      label: 'Pregnancy week',
      placeholder: 'Enter pregnancy week (e.g. 26 weeks)',
      defaultValue: '26 weeks',
      recommendLabel: 'Based on your pregnancy week, we recommend:',
      items: [
        { name: 'Second & Third Trimester Massage', type: 'service', href: '/services/prenatal-massage-therapy' },
        { name: 'Physiological Birth & Breathing Workshop', type: 'class', href: '/classes' },
        { name: 'Maternal Belly Comfort Oil', type: 'product', href: '/products' },
      ],
    },
    baby_age: {
      label: "Baby's age",
      placeholder: "Baby's age (e.g. 2 months)",
      defaultValue: '2 months',
      recommendLabel: "Based on your baby's age, we recommend:",
      items: [
        { name: 'Signature Infant Massage & Bath Ritual', type: 'service', href: '/services/infant-massage-and-bath' },
        { name: 'Newborn Colic & Soothing Masterclass', type: 'class', href: '/classes' },
        { name: 'SEY Baby Cold-Pressed Massage Oil', type: 'product', href: '/products' },
      ],
    },
  };

  const currentConfig = recommendationsByTab[activeTab];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setInputValue(recommendationsByTab[tab].defaultValue);
  };

  const handlePillClick = (item: { name: string; type: string; href: string }) => {
    openEnquiry({ serviceTitle: item.name });
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      {/* ── Deep Maroon SEYOL Brand Container ── */}
      <div className="bg-[#5C1D24] text-cream-light rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#8C2836]/60 shadow-[0_15px_40px_rgba(0,0,0,0.25)] space-y-6 sm:space-y-7">
        
        {/* Top Tag & Headings */}
        <div className="space-y-2">
          <div className="text-gold text-xs sm:text-sm font-bold tracking-wider uppercase">
            Your Stage, Your Next Step
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Tell us a little more, we&apos;ll do the rest
          </h2>
          
          <p className="text-cream-light/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
            Enter your due date, pregnancy week or your baby&apos;s age &mdash; we&apos;ll match you to the right service, class or product.
          </p>
        </div>

        {/* 3 Pill Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
          {(['due_date', 'pregnancy_week', 'baby_age'] as TabType[]).map((tabKey) => {
            const isSelected = activeTab === tabKey;
            const tabData = recommendationsByTab[tabKey];

            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => handleTabChange(tabKey)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF6EE] text-[#5C1D24] shadow-warm-xs scale-[1.02]'
                    : 'bg-[#431218] text-cream-light/80 hover:text-white hover:bg-[#4E161D] border border-white/10'
                }`}
              >
                {tabData.label}
              </button>
            );
          })}
        </div>

        {/* Input Field + Button Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentConfig.placeholder}
              className="w-full px-4 sm:px-5 py-3 rounded-2xl bg-[#431218] border border-white/20 text-white placeholder-cream-light/50 text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => openEnquiry({ serviceTitle: `Pathfinder for ${currentConfig.label}: ${inputValue}` })}
            className="px-5 sm:px-6 py-3 rounded-full bg-[#E5C378] hover:bg-[#DFC075] text-[#5C1D24] font-extrabold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] shadow-warm-xs flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <span>Show My Path</span>
            <ArrowRight className="w-4 h-4 text-[#5C1D24]" />
          </button>
        </div>

        {/* Dynamic Recommendations Pill Row */}
        <div className="pt-2 sm:pt-4 border-t border-white/15 space-y-3">
          <div className="text-xs sm:text-sm text-cream-light/90 font-medium">
            {currentConfig.recommendLabel}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {currentConfig.items.map((recItem) => (
              <button
                key={recItem.name}
                type="button"
                onClick={() => handlePillClick(recItem)}
                className="px-4 py-2 rounded-full bg-[#431218] hover:bg-[#4E161D] text-cream-light hover:text-white border border-white/20 text-xs sm:text-xs font-semibold transition-all duration-200 hover:scale-[1.02] shadow-2xs flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{recItem.name}</span>
                <ArrowRight className="w-3 h-3 text-gold opacity-75" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StageNextStepCalculator;
