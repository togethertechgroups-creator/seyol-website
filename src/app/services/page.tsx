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
  Flower2
} from 'lucide-react';
import { ServiceFinder } from '../../components/interactive/ServiceFinder';
import { ComparisonCards } from '../../components/interactive/ComparisonCards';
import { AccordionFAQ } from '../../components/shared/AccordionFAQ';
import { TrustBadges } from '../../components/shared/TrustBadges';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';
import heroServiceImg from '../../assets4/ChatGPT Image Aug 19, 2026, 09_54_19 PM.png';

export default function ServicesPage() {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Hero Header with Full-Bleed Mother & Baby Sanctuary Background */}
      <section className="relative overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        {/* Full-Bleed Ambient Hero Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <Image
            src={heroServiceImg}
            alt="Mother & Baby Sanctuary Background"
            fill
            priority
            unoptimized
            className="object-cover object-[85%_32%] md:object-[82%_28%] lg:object-[80%_25%]"
          />
          {/* Subtle soft left gradient scrim strictly behind text to prevent collision with background wall art */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/60 to-transparent max-w-2xl lg:max-w-3xl pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
          <div className="max-w-2xl pl-2 sm:pl-8 md:pl-14 lg:pl-20 space-y-3 sm:space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-maroon-soft/90 backdrop-blur-sm text-maroon text-[11px] font-bold uppercase tracking-wider border border-maroon/20 shadow-xs">
              <Flower2 className="w-3.5 h-3.5 text-maroon" />
              <span>Dedicated In-Home &amp; Clinical Care</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brown tracking-tight leading-tight">
              Traditional Postpartum, Doula &amp; Infant Care Services
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-brown max-w-xl leading-relaxed font-medium">
              From preconception preparation and prenatal massage to sacred 40-day postpartum confinement, 24/7 stay-in nannies, and gentle newborn bathing.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md hover:scale-105 transition-all duration-200 cursor-pointer flex items-center space-x-2"
              >
                <span>Book Care Journey Online</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </Link>
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Free Price Quotation' })}
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-cream-dark text-brown font-bold text-xs sm:text-sm border border-cream-border shadow-xs transition-all cursor-pointer"
              >
                <span>Quick Price Quote</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2.5 border-t border-cream-border/90 text-xs max-w-xl">
              <div>
                <div className="font-serif font-bold text-maroon text-xs sm:text-sm">100% Verified</div>
                <div className="text-[10px] sm:text-[11px] text-brown font-medium">Siddha &amp; Ayush Trained</div>
              </div>
              <div>
                <div className="font-serif font-bold text-maroon text-xs sm:text-sm">1-on-1 Sanctuary</div>
                <div className="text-[10px] sm:text-[11px] text-brown font-medium">At-Home Comfort</div>
              </div>
              <div>
                <div className="font-serif font-bold text-maroon text-xs sm:text-sm">40-Day Rituals</div>
                <div className="text-[10px] sm:text-[11px] text-brown font-medium">Sacred Postnatal Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Finder Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
        <ServiceFinder />
      </section>

      {/* Package Comparison Section */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream-light border-y border-cream-border max-w-full">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider border border-gold/40">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Side-by-Side Comparison</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
              Compare Our Care Packages
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Review inclusions, daily hours, and pricing to find the right match for your family.
            </p>
          </div>

          <ComparisonCards />
        </div>
      </section>

      {/* Caregiver Assurance & Credentials */}
      <TrustBadges variant="compact" />

      {/* Services FAQ */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
            Frequently Asked Questions on SEYOL Services
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted">
            Got questions about care start dates, caesarean healing, or caregiver vetting?
          </p>
        </div>

        <AccordionFAQ defaultCategory="services" />
      </section>
    </div>
  );
}
