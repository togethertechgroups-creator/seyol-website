'use client';

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'BOOK A\nCONSULTATION',
    description: "Schedule a complimentary consultation to share what's bringing you to SEYOL and what support you're looking for."
  },
  {
    step: 2,
    title: 'SPEAK WITH\nOUR TEAM',
    description: 'Connect with a compassionate doula or care specialist who will take time to understand your needs, goals, preferences, and concerns.'
  },
  {
    step: 3,
    title: 'GET MATCHED\nTHOUGHTFULLY',
    description: 'We carefully match you with a caregiver or practitioner whose approach, background, and specialties align with your unique journey.'
  },
  {
    step: 4,
    title: 'COMPLETE INTAKE\n& ELIGIBILITY',
    description: 'Finalize intake paperwork, care preferences, and scheduling so everything is set up seamlessly for your sacred care.'
  },
  {
    step: 5,
    title: 'BEGIN YOUR\nSESSIONS',
    description: 'Start your sessions in a supportive, trauma-informed space designed to help you heal, grow, and cherish every step.'
  }
];

export const HowToStartWithSeyol: React.FC = () => {
  return (
    <section 
      id="how-to-start" 
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF6EE] text-[#3A1D1D] overflow-hidden border-t border-[#EAE1D5]"
    >
      <div className="relative z-10 max-w-[96%] xl:max-w-[94%] 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#70152B] tracking-tight leading-[1.15] mb-4">
            How to Start with SEYOL
          </h2>

          {/* Centered Botanical Olive Branch Divider in Maroon & Gold */}
          <div className="flex items-center justify-center gap-3 my-3 select-none">
            <span className="w-14 sm:w-20 h-[1.5px] bg-[#D9B2BC]" />
            <svg width="44" height="20" viewBox="0 0 44 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#70152B]">
              <path d="M22,10 C18,7 13,7 10,10 C14,11 18,12 22,10 Z" fill="currentColor" />
              <path d="M22,10 C26,7 31,7 34,10 C30,11 26,12 22,10 Z" fill="currentColor" />
              <path d="M22,10 C21,5 18,2 14,3 C17,7 20,8 22,10 Z" fill="currentColor" />
              <path d="M22,10 C23,5 26,2 30,3 C27,7 24,8 22,10 Z" fill="currentColor" />
              <circle cx="22" cy="10" r="2" fill="#C8A45D" />
            </svg>
            <span className="w-14 sm:w-20 h-[1.5px] bg-[#D9B2BC]" />
          </div>

          <p className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#8C4F5A] uppercase mt-3">
            A Simple, Supportive Process Designed with You in Mind
          </p>
        </header>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 xl:gap-6 items-stretch relative">
          {PROCESS_STEPS.map((stepItem, idx) => {
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <div key={stepItem.step} className="relative group flex flex-col h-full">
                <div className="h-full w-full bg-white rounded-[24px] border border-[#EAE1D5] shadow-[0_6px_22px_rgba(112,21,43,0.04)] hover:shadow-[0_16px_38px_rgba(112,21,43,0.12)] hover:border-[#70152B]/40 hover:-translate-y-1.5 transition-all duration-300 p-5 sm:p-6 pt-9 pb-8 flex flex-col items-center text-center justify-start relative">
                  
                  {/* Top Floating Number Badge (Maroon) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#70152B] text-[#FAF6EE] font-serif font-bold text-sm flex items-center justify-center shadow-sm border-2 border-[#FAF6EE]">
                    {stepItem.step}
                  </div>

                  {/* Title & Heart (At Top, Bold) */}
                  <div className="space-y-2 mb-3.5 w-full">
                    <h3 className="font-sans font-extrabold text-[15px] sm:text-[16px] text-[#3A1D1D] tracking-wide uppercase leading-snug group-hover:text-[#70152B] transition-colors whitespace-pre-line">
                      {stepItem.title}
                    </h3>
                    <div className="flex justify-center text-[#70152B] pt-0.5">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>

                  {/* Description Text */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#6E5652] leading-[1.7] font-normal">
                    {stepItem.description}
                  </p>
                </div>

                {/* Connecting Arrow between steps (Desktop) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 w-4 xl:w-6 items-center justify-center pointer-events-none z-20">
                    <div className="w-6 h-6 rounded-full bg-[#FAF6EE] border border-[#D9B2BC] flex items-center justify-center text-[#70152B] shadow-xs group-hover:scale-110 group-hover:bg-[#70152B] group-hover:text-[#FAF6EE] transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Warm Reassurance Pill Banner (Maroon & Cream) */}
        <div className="mt-12 sm:mt-14 max-w-2xl mx-auto">
          <div className="bg-[#FAF0EB] border border-[#E8D8CC] rounded-full px-6 sm:px-8 py-3.5 shadow-xs flex flex-wrap items-center justify-center gap-2 text-center">
            <Heart className="w-3.5 h-3.5 text-[#70152B] fill-[#70152B] shrink-0" />
            <span className="font-sans text-xs sm:text-[13px] font-medium text-[#3A1D1D]">
              You don&apos;t have to do this alone.
            </span>
            <span className="font-serif italic text-xs sm:text-[13px] text-[#70152B] font-semibold">
              We&apos;re here to walk alongside you every step of the way.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
