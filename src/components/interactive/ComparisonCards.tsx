'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, BookOpen, Heart, Clock, MessageSquare } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

interface ComparisonRow {
  criterion: string;
  isQuote?: boolean;
  services: string;
  classes: string;
  nanny: string;
  hourly: string;
  consultation: string;
}

const comparisonData: ComparisonRow[] = [
  {
    criterion: 'Best if you...',
    services: 'Want SEYOL to provide the care',
    classes: 'Want to learn how to do it yourself',
    nanny: 'Need ongoing support after birth',
    hourly: 'Need help for a few hours',
    consultation: 'Need personalised guidance',
  },
  {
    criterion: 'How support works',
    services: 'Scheduled care sessions',
    classes: 'Guided learning and demonstrations',
    nanny: 'Live-in daily support',
    hourly: 'Flexible hourly care',
    consultation: 'One-to-one discussion',
  },
  {
    criterion: 'Time commitment',
    services: 'Single or package sessions',
    classes: 'One or multiple classes',
    nanny: '28 days or longer',
    hourly: 'Book by the hour',
    consultation: '30–60 minutes',
  },
  {
    criterion: 'Where',
    services: 'Mainly at home',
    classes: 'Online or in-person, depending on class',
    nanny: 'Your home',
    hourly: 'Your home',
    consultation: 'Online / consultation format',
  },
  {
    criterion: 'Best suited for',
    services: 'Pregnancy, postpartum, mother & baby care',
    classes: 'Preparing before or after baby arrives',
    nanny: 'Early postpartum period',
    hourly: 'Families needing extra newborn help',
    consultation: 'When you are unsure what support you need',
  },
  {
    criterion: 'Choose this when...',
    isQuote: true,
    services: '“I want someone experienced to care for me or my baby.”',
    classes: '“I want to learn and feel confident doing it myself.”',
    nanny: '“I need someone with us every day.”',
    hourly: '“I only need extra help at certain times.”',
    consultation: '“I need help deciding what comes next.”',
  },
];

export const ComparisonCards: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full font-sans">
      {/* Mobile Swipe Hint */}
      <div className="flex md:hidden items-center justify-end px-2 pb-2 text-[11px] font-sans text-brown-muted gap-1.5">
        <span>Swipe horizontally to compare</span>
        <ArrowRight className="w-3 h-3 text-maroon animate-pulse" />
      </div>

      {/* Main Comparison Table Card in Rich SEYOL Maroon */}
      <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#4A0A1C] via-[#3E0716] to-[#2B0510] text-[#F7F4EF] border border-[#7B1131]/60 shadow-warm-xl relative">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#7B1131]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Responsive Horizontal Scroll Wrapper */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <table className="w-full min-w-[880px] text-left border-collapse">
            {/* Table Header: 5 Support Columns + 1 Criteria Column */}
            <thead>
              <tr className="border-b border-white/15 bg-[#300511]/90 backdrop-blur-sm">
                {/* Column 1: Comparison Criteria Heading */}
                <th
                  scope="col"
                  className="sticky left-0 z-30 bg-[#300511] px-5 sm:px-6 py-5 sm:py-6 w-[200px] min-w-[190px] border-r border-white/15 shadow-[3px_0_10px_rgba(0,0,0,0.35)]"
                >
                  <span className="text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-widest text-[#E8C574]">
                    Comparison
                  </span>
                  <div className="text-white font-heading font-bold text-sm sm:text-base mt-1">
                    Support Features
                  </div>
                </th>

                {/* Column 2: Services */}
                <th scope="col" className="px-4 sm:px-6 py-5 sm:py-6 w-[18%] min-w-[160px] align-top">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#E8C574]/80">
                      In-Home Care
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      Services
                    </h3>
                  </div>
                </th>

                {/* Column 3: Classes */}
                <th scope="col" className="px-4 sm:px-6 py-5 sm:py-6 w-[18%] min-w-[160px] align-top">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#E8C574]/80">
                      Guided Learning
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      Classes
                    </h3>
                  </div>
                </th>

                {/* Column 4: Confinement Nanny */}
                <th scope="col" className="px-4 sm:px-6 py-5 sm:py-6 w-[18%] min-w-[165px] align-top">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#E8C574]/80">
                      28+ Days Daily
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      Confinement Nanny
                    </h3>
                  </div>
                </th>

                {/* Column 5: Hourly Newborn Support */}
                <th scope="col" className="px-4 sm:px-6 py-5 sm:py-6 w-[18%] min-w-[170px] align-top">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#E8C574]/80">
                      Flexible Hours
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      Hourly Newborn Support
                    </h3>
                  </div>
                </th>

                {/* Column 6: Consultation */}
                <th scope="col" className="px-4 sm:px-6 py-5 sm:py-6 w-[18%] min-w-[160px] align-top">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#E8C574]/80">
                      Personal Guidance
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      Consultation
                    </h3>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body: 6 Comparison Criteria Rows */}
            <tbody className="divide-y divide-white/10 font-sans">
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`group transition-colors duration-150 ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                  } hover:bg-white/[0.05]`}
                >
                  {/* Sticky First Column: Comparison Criterion */}
                  <th
                    scope="row"
                    className={`sticky left-0 z-20 px-5 sm:px-6 py-4 sm:py-5 border-r border-white/15 shadow-[3px_0_10px_rgba(0,0,0,0.35)] font-heading font-bold text-xs sm:text-[13px] tracking-wide text-white ${
                      idx % 2 === 0 ? 'bg-[#360513]' : 'bg-[#320411]'
                    } group-hover:bg-[#400717] transition-colors`}
                  >
                    {row.criterion}
                  </th>

                  {/* Services Column */}
                  <td
                    className={`px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-[13px] leading-relaxed ${
                      row.isQuote
                        ? 'italic font-heading text-[#FAF0EB] text-[13px] sm:text-sm'
                        : 'text-[#F7F4EF]/90'
                    }`}
                  >
                    {row.services}
                  </td>

                  {/* Classes Column */}
                  <td
                    className={`px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-[13px] leading-relaxed ${
                      row.isQuote
                        ? 'italic font-heading text-[#FAF0EB] text-[13px] sm:text-sm'
                        : 'text-[#F7F4EF]/90'
                    }`}
                  >
                    {row.classes}
                  </td>

                  {/* Confinement Nanny Column */}
                  <td
                    className={`px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-[13px] leading-relaxed ${
                      row.isQuote
                        ? 'italic font-heading text-[#FAF0EB] text-[13px] sm:text-sm'
                        : 'text-[#F7F4EF]/90'
                    }`}
                  >
                    {row.nanny}
                  </td>

                  {/* Hourly Newborn Support Column */}
                  <td
                    className={`px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-[13px] leading-relaxed ${
                      row.isQuote
                        ? 'italic font-heading text-[#FAF0EB] text-[13px] sm:text-sm'
                        : 'text-[#F7F4EF]/90'
                    }`}
                  >
                    {row.hourly}
                  </td>

                  {/* Consultation Column */}
                  <td
                    className={`px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-[13px] leading-relaxed ${
                      row.isQuote
                        ? 'italic font-heading text-[#FAF0EB] text-[13px] sm:text-sm'
                        : 'text-[#F7F4EF]/90'
                    }`}
                  >
                    {row.consultation}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer: Actionable CTA Buttons for Each Column */}
            <tfoot>
              <tr className="border-t border-white/20 bg-[#2B040E]">
                <th
                  scope="row"
                  className="sticky left-0 z-20 bg-[#2B040E] px-5 sm:px-6 py-5 border-r border-white/15 shadow-[3px_0_10px_rgba(0,0,0,0.35)]"
                >
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-white/80">
                    Next Step
                  </span>
                </th>

                {/* Services CTA */}
                <td className="px-4 sm:px-6 py-5">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#E8C574] hover:text-white transition-colors group"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>

                {/* Classes CTA */}
                <td className="px-4 sm:px-6 py-5">
                  <Link
                    href="/classes"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#E8C574] hover:text-white transition-colors group"
                  >
                    <span>Explore Classes</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>

                {/* Confinement Nanny CTA */}
                <td className="px-4 sm:px-6 py-5">
                  <button
                    onClick={() => openEnquiry({ serviceTitle: 'Stay-In Confinement Nanny Support' })}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#E8C574] hover:text-white transition-colors group cursor-pointer text-left"
                  >
                    <span>Enquire Nanny</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </td>

                {/* Hourly Newborn Support CTA */}
                <td className="px-4 sm:px-6 py-5">
                  <button
                    onClick={() => openEnquiry({ serviceTitle: 'Hourly Newborn Support' })}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#E8C574] hover:text-white transition-colors group cursor-pointer text-left"
                  >
                    <span>Book Hourly Care</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </td>

                {/* Consultation CTA */}
                <td className="px-4 sm:px-6 py-5">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#E8C574] hover:text-white transition-colors group"
                  >
                    <span>Book a Call</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ComparisonCards;
