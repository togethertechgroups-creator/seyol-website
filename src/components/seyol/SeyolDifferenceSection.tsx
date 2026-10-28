'use client';

import React from 'react';
import { HeartHandshake, ShieldCheck, ArrowDown } from 'lucide-react';

export const SeyolDifferenceSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] font-sans border-t border-[#ECE5DD]" id="seyol-difference">
      <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[#70152B]">
            THE SEYOL DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] lg:text-5xl font-bold text-[#3A1D1D] tracking-tight leading-[1.18]">
            What Makes SEYOL Support Different
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed max-w-2xl mx-auto">
            Thoughtful support for mothers and babies, guided by individual needs, clear communication and care with intention.
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ECE5DD] shadow-[0_6px_28px_rgba(58,29,29,0.06)] aspect-[16/9] sm:aspect-[16/10] bg-[#FAF0EB]">
          <img
            src="/assets4/seyol_difference_family.jpg"
            alt="SEYOL caregiver and parents joyful with baby in home care"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Two Structured Benefit Blocks */}
        <div className="space-y-6 pt-2">
          
          {/* Block 1: The SEYOL Method */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EAE8E3] text-[#303830] flex items-center justify-center shrink-0 border border-[#DDD5CA]">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#70152B]" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A1D1D]">
                The SEYOL Method
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed">
                Mother- and baby-centred support that respects each family&apos;s needs, routines, preferences and cultural values.
              </p>
              <div className="text-[11px] sm:text-xs font-bold text-[#70152B] tracking-wider uppercase pt-1">
                PERSONALISED &bull; RESPECTFUL &bull; SUPPORTIVE
              </div>
            </div>
          </div>

          <hr className="border-[#ECE5DD]" />

          {/* Block 2: Safety & Standards */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EAE8E3] text-[#303830] flex items-center justify-center shrink-0 border border-[#DDD5CA]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#70152B]" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A1D1D]">
                Safety &amp; Standards
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed">
                Clear hygiene expectations, appropriate caregiver preparation, safe handling practices and defined service boundaries.
              </p>
              <div className="text-[11px] sm:text-xs font-bold text-[#70152B] tracking-wider uppercase pt-1">
                HYGIENE &bull; PREPARATION &bull; ACCOUNTABILITY
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner Card */}
        <div className="bg-[#EFE9DF] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#E5DAD0] flex items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#3A1D1D]">
              Trust begins with transparency.
            </h4>
            <p className="text-xs sm:text-sm text-[#6E5652]">
              Learn about our care approach, team qualifications and the practices followed for each service.
            </p>
          </div>

          <a
            href="#packages"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#70152B] transition-colors shadow-sm shrink-0 cursor-pointer"
            aria-label="Scroll down to care packages and details"
          >
            <ArrowDown className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SeyolDifferenceSection;
