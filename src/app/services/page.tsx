'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { ServiceFinder } from '../../components/interactive/ServiceFinder';
import { FindYourCare } from '../../components/interactive/FindYourCare';
import { ExploreSeyolServices } from '../../components/interactive/ExploreSeyolServices';
import { HowToStartWithSeyol } from '../../components/interactive/HowToStartWithSeyol';
import { SeyolDifferenceSection } from '../../components/seyol/SeyolDifferenceSection';
import { WhyFamiliesTrustSeyol } from '../../components/seyol/WhyFamiliesTrustSeyol';
import { ComparisonCards } from '../../components/interactive/ComparisonCards';
import { AccordionFAQ } from '../../components/shared/AccordionFAQ';
import { NeedHelpChoosingSection } from '../../components/seyol/NeedHelpChoosingSection';
import { TrustBadges } from '../../components/shared/TrustBadges';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';
import heroServiceImg from '../../assets4/Tender Motherhood Banner.png';

export default function ServicesPage() {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Hero Header with Full-Bleed Mother & Baby Sanctuary Background */}
      <section className="relative overflow-hidden bg-[#FAF0EB] text-brown border-b border-[#F0DCD5] min-h-[260px] sm:min-h-[290px] md:min-h-[320px] lg:min-h-[340px] flex items-center pt-20 sm:pt-22 lg:pt-24 pb-6 sm:pb-7 px-4 sm:px-6 lg:px-8">
        {/* Full-Bleed Ambient Hero Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <Image
            src={heroServiceImg}
            alt="Tender Motherhood Banner"
            fill
            priority
            unoptimized
            className="object-cover object-right md:object-center"
          />
          {/* Subtle mobile-only soft blush tint so text is legible on narrow phone screens, hidden on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF0EB]/95 via-[#FAF0EB]/70 to-transparent/20 lg:hidden pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
          <div className="max-w-xl md:max-w-2xl lg:max-w-[620px] xl:max-w-[680px] pl-2 sm:pl-6 md:pl-10 lg:pl-14 xl:pl-16 space-y-2.5 sm:space-y-3 text-left">
            


            {/* Two-Tone Distinctive H1 Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-black tracking-tight leading-[1.12]">
              <span className="block text-[#70152B]">Traditional Postpartum,</span>
              <span className="block text-[#9E6947]">Doula &amp; Infant Care Services</span>
            </h1>

            {/* Subtitle with Heart Doodle */}
            <div className="relative max-w-lg">
              <p className="text-xs sm:text-sm text-[#4A2626] leading-relaxed font-medium">
                From preconception preparation and prenatal massage to sacred 40-day postpartum confinement, 24/7 stay-in nannies, and gentle newborn bathing.
              </p>
              {/* Whimsical Heart Doodle from mockup */}
              <div className="hidden sm:block absolute -right-10 top-0 pointer-events-none select-none">
                <svg className="w-7 h-7 text-[#C98B82] opacity-85" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 28 C15 32, 9 30, 7 24 C4 16, 14 11, 19 16 C20 17, 21 17, 22 16 C27 11, 37 16, 34 24 C32 30, 26 32, 22 28" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <Link
                href="/book"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#70152B] hover:bg-[#580F21] text-white font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Care Journey Online</span>
                <ArrowRight className="w-4 h-4 text-white/90" />
              </Link>
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Free Price Quotation' })}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white hover:bg-[#FAF4F2] text-[#70152B] font-bold text-xs sm:text-sm border border-[#D9B8B2] hover:border-[#70152B] shadow-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <Tag className="w-4 h-4 text-[#70152B]" />
                <span>Quick Price Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Care: Choose by Stage & Interactive Service Finder */}
      <FindYourCare />

      {/* Explore SEYOL Services Section */}
      <ExploreSeyolServices />

      {/* Interactive Service Finder Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
        <ServiceFinder />
      </section>

      {/* Package Comparison Section: Not Sure Which Support Fits? */}
      <section id="packages" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream-light border-y border-cream-border max-w-full scroll-mt-20">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
              Not Sure Which Support Fits?
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Review inclusions, daily hours, and care scope to find the right match for your family.
            </p>
          </div>

          <ComparisonCards />
        </div>
      </section>

      {/* How to Start with SEYOL Section */}
      <HowToStartWithSeyol />

      {/* What Makes SEYOL Support Different (The SEYOL Difference) */}
      <SeyolDifferenceSection />

      {/* Why Families Trust SEYOL (Promise & Client Video Stories) */}
      <WhyFamiliesTrustSeyol />

      {/* Caregiver Assurance & Credentials */}
      <TrustBadges variant="compact" />

      {/* Services FAQ */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
            Quick Answers Before You Begin
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted">
            Got questions about care start dates, caesarean healing, or caregiver vetting?
          </p>
        </div>

        <AccordionFAQ defaultCategory="services" />
      </section>

      {/* Need Help Choosing? SEYOL Will Guide You Section */}
      <NeedHelpChoosingSection />
    </div>
  );
}
