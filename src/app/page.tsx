'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import heroBg1 from '../assets4/ChatGPT Image Aug 25, 2026, 09_09_24 AM.png';
import heroBg2 from '../assets4/ChatGPT Image Aug 25, 2026, 09_12_27 AM.png';
import heroBg3 from '../assets4/ChatGPT Image Aug 25, 2026, 08_26_15 AM.png';
import ScrollExpand from '../components/shared/ScrollExpand';
import WordReveal from '../components/shared/WordReveal';
import HorizontalWords from '../components/shared/HorizontalWords';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, 
  Baby, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Award, 
  Flower2, 
  ShoppingBag, 
  Users, 
  Compass,
  Clock, 
  BookOpen, 
  Send, 
  MessageSquare,
  CreditCard,
  BellRing
} from 'lucide-react';
import { StageSelector } from '../components/interactive/StageSelector';
import { StageNextStepCalculator } from '../components/interactive/StageNextStepCalculator';
import { MostParentsStartHere } from '../components/interactive/MostParentsStartHere';
import { SupportModeTabs } from '../components/interactive/SupportModeTabs';
import { ShopByRoutine } from '../components/interactive/ShopByRoutine';
import { ComparisonCards } from '../components/interactive/ComparisonCards';
import HorizontalServicesScroll from '../components/interactive/HorizontalServicesScroll';
import { TrustBadges } from '../components/shared/TrustBadges';
import { TestimonialCarousel } from '../components/shared/TestimonialCarousel';
import { EmailCapture } from '../components/shared/EmailCapture';
import { ContactForm } from '../components/shared/ContactForm';
import { FlowingHeroThreads } from '../components/shared/FlowingHeroThreads';
import { useQuickEnquiry } from '../context/QuickEnquiryContext';
import { useAdminData } from '../context/AdminDataContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const router = useRouter();
  const { openEnquiry } = useQuickEnquiry();
  const { homeSettings } = useAdminData();
  const milestoneSectionRef = useRef<HTMLElement>(null);

  const heroSlides = [
    {
      id: 'brand',
      badge: 'Sacred South Indian Postnatal Heritage',
      headingSans: 'Traditional Indian Mother & Baby Care for',
      headingSerif: 'Modern Families',
      subtext: 'A Singapore-born care ecosystem supporting families through pregnancy, birth, postpartum recovery, newborn care, education, products and resources.',
      ctaPrimaryText: 'Start Your Care Journey',
      ctaPrimaryAction: () => openEnquiry({ serviceTitle: 'Start Your Care Journey' }),
      ctaSecondaryText: 'Explore Services',
      ctaSecondaryAction: () => router.push('/services'),
      image: heroBg3,
    },
    {
      id: 'classes',
      badge: 'Masterclasses & Parent Education',
      headingSans: 'Traditional Indian Mother & Baby Care for',
      headingSerif: 'Modern Families',
      subtext: 'One-to-one and group classes for confident parenthood and baby care.',
      ctaPrimaryText: 'View Calendar',
      ctaPrimaryAction: () => router.push('/classes'),
      ctaSecondaryText: 'Explore Classes',
      ctaSecondaryAction: () => router.push('/classes'),
      image: heroBg1,
      imagePosition: 'object-center sm:object-[center_bottom] lg:object-[85%_bottom]',
    },
    {
      id: 'products',
      badge: 'Sacred 100% Herbal Essentials',
      headingSans: 'Traditional Indian Mother & Baby Care for',
      headingSerif: 'Modern Families',
      subtext: "Traditional care essentials for mother and baby's daily routine.",
      ctaPrimaryText: 'View bundles',
      ctaPrimaryAction: () => router.push('/products'),
      ctaSecondaryText: 'Shop products',
      ctaSecondaryAction: () => router.push('/products'),
      image: heroBg2,
    },
    {
      id: 'resources',
      badge: 'Evidence-Based Guidance & Handbooks',
      headingSans: 'Traditional Indian Mother & Baby Care for',
      headingSerif: 'Modern Families',
      subtext: 'Guides, checklists and videos to support every stage of care.',
      ctaPrimaryText: 'Find What You Need',
      ctaPrimaryAction: () => router.push('/resources'),
      ctaSecondaryText: 'Browse Resources',
      ctaSecondaryAction: () => router.push('/resources'),
      image: heroBg3,
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-advance hero slides smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[currentSlideIndex];

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">

      {/* ── Upper Maroon Background Region (Edge-to-Edge Solid Maroon) ── */}
      <div className="w-full bg-[#7B1131] text-cream-light border-b border-[#991840]/40 shadow-warm-xl">
        
        {/* ========================================================================= */}
        {/* SECTION 1: START HERE / BEGIN YOUR SEYOL CARE JOURNEY (Hero Slideshow)     */}
        {/* ========================================================================= */}
        <section className="relative w-full px-1.5 sm:px-3 lg:px-4 pt-3.5 sm:pt-4 pb-6 sm:pb-8">
          <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden hero-viewport-height border border-gold/30 shadow-warm-lg bg-brown flex items-center justify-start">
            
            {/* Background Media with Smooth Auto Cross-Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-x-0 -top-10 bottom-0 translate-y-[10mm] transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt="SEYOL Traditional Indian Mother & Baby Care"
                      fill
                      priority={idx === 0}
                      unoptimized
                      className={`object-cover ${slide.imagePosition || 'object-center sm:object-[center_bottom] lg:object-[82%_bottom] xl:object-[85%_bottom]'} transition-transform duration-[6500ms] ease-out`}
                      style={{
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      }}
                    />
                  </div>
                );
              })}
              {/* Left-Focused High-Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E050D]/95 via-[#260A14]/85 md:via-[#260A14]/70 to-transparent sm:to-[#1E050D]/35 z-[1]" />

              {/* Maven-Style Animated Flowing Wave Line from Left to Right */}
              <FlowingHeroThreads activeSlideIndex={currentSlideIndex} />
              
              {/* 4 Slide Switch Indicators */}
              <div className="absolute bottom-5 sm:bottom-6 right-6 sm:right-8 z-20 flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Switch to hero slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      currentSlideIndex === idx
                        ? 'w-8 bg-gold shadow-gold-glow'
                        : 'w-2 bg-white/40 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Left-Aligned Slide Content */}
            <div className="relative z-10 max-w-xl lg:max-w-2xl xl:max-w-3xl px-5 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-6 sm:pb-8 text-left text-cream-light space-y-2.5 sm:space-y-3.5 w-full">
              
              {/* Slide Heading with Font Pairing: Bold Sans + Italic Serif */}
              <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                {activeSlide.headingSans}{' '}
                <span className="font-serif italic font-normal text-gold-light">
                  {activeSlide.headingSerif}
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-xs sm:text-sm md:text-base text-cream-light/95 max-w-xl font-normal leading-relaxed drop-shadow font-sans">
                {activeSlide.subtext}
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pt-2 sm:pt-3 w-full sm:w-auto">
                {/* Button 1: Maroon background with cream text */}
                <button
                  onClick={activeSlide.ctaPrimaryAction}
                  className="px-6 sm:px-7 py-3 rounded-full bg-[#7B1131] hover:bg-[#600E26] text-[#FAF6EE] font-extrabold text-xs sm:text-sm tracking-wide shadow-warm-lg transition-all duration-200 hover:scale-[1.02] border border-gold/40 cursor-pointer"
                >
                  {activeSlide.ctaPrimaryText}
                </button>

                {/* Button 2: Maroon outline and text with transparent background */}
                <button
                  onClick={activeSlide.ctaSecondaryAction}
                  className="px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6EE] border-2 border-[#991840] font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] cursor-pointer backdrop-blur-xs"
                >
                  {activeSlide.ctaSecondaryText}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: WHERE ARE YOU RIGHT NOW? (Interactive Stage Selector)          */}
        {/* ========================================================================= */}
        <section
          ref={milestoneSectionRef}
          id="care-path"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full"
        >
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-gold-light border border-white/25 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-gold-light" />
                <span>Step 1: Your Milestone</span>
              </div>

              {/* Font Combination: Sans-serif + Italic Serif */}
              <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                Where Are You{' '}
                <span className="font-serif italic font-normal text-gold-light">
                  Right Now?
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-cream-light/85 leading-relaxed max-w-xl mx-auto">
                Select your current milestone to explore tailored care routines, masterclasses, and certified Indian postpartum care.
              </p>
            </div>

            {/* 5 Milestone Stages + Dynamic "Your Suggested Care Path" */}
            <StageSelector />
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: YOUR STAGE, YOUR NEXT STEP (Interactive EDD / Age Tool)         */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <StageNextStepCalculator />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MOST PARENTS START HERE (High-Conversion Starter Cards)        */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <MostParentsStartHere />
      </section>

      {/* ========================================================================= */}
      {/* CINEMATIC INTERACTIVE SCROLL EXPAND SANCTUARY SHOWCASE                    */}
      {/* ========================================================================= */}
      <ScrollExpand
        src="/assets4/video_project_8.mp4"
        mediaType="video"
        title="Ancient Traditions. Sacred Maternal Care."
        scrollHint="SCROLL DOWN TO EXPAND SANCTUARY"
      >
        <div className="space-y-5 sm:space-y-6 max-w-3xl text-center text-cream-light px-4">
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#160307]/85 text-gold-light border border-gold/60 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-2xl">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>The SEYOL Sacred Sanctuary</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            Honouring Every Sacred Step of Motherhood
          </h2>

          <p className="font-playfair text-sm sm:text-base md:text-lg text-cream-light/95 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Experience the serenity of traditional herbal oil therapies, certified birth doula guidance, and gentle infant bath rituals in your own home sanctuary.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry({ serviceTitle: 'Sanctuary In-Home Care' })}
              className="px-8 py-3.5 rounded-full bg-cream-light text-maroon hover:bg-white font-bold text-xs sm:text-sm tracking-wide shadow-warm-xl hover:scale-105 transition-all duration-200 cursor-pointer shimmer-button"
            >
              Book In-Home Sanctuary Ritual
            </button>

            <Link
              href="/services"
              className="px-8 py-3.5 rounded-full bg-[#160307]/75 hover:bg-[#160307]/95 text-cream-light border border-gold/50 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all duration-200 shadow-warm-lg"
            >
              Explore All 10 Services
            </Link>
          </div>
        </div>
      </ScrollExpand>

      {/* ========================================================================= */}
      {/* SECTION 6: HOW WOULD YOU LIKE SEYOL TO SUPPORT YOU? (5-Way Tabs)          */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <SupportModeTabs />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: SHOP BY ROUTINE (Product Discovery for SEY by SEYOL)           */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <ShopByRoutine />
      </section>

      {/* ========================================================================= */}
      {/* ALL 10 SEYOL SERVICES HORIZONTAL SCROLL SANCTUARY                         */}
      {/* ========================================================================= */}
      <HorizontalServicesScroll />

      {/* ========================================================================= */}
      {/* KINETIC TYPOGRAPHY: HORIZONTAL PINNED SCROLL WORDS SECTION                 */}
      {/* ========================================================================= */}
      <HorizontalWords />

      {/* ========================================================================= */}
      {/* SECTION 8: THE SEYOL METHOD (Section Explaining Philosophy in 4 Pillars)  */}
      {/* ========================================================================= */}
      
      {/* Top Organic Wave Transition to Deep Maroon - Overlapping directly onto the photo */}
      <div className="w-full overflow-hidden leading-none -mt-16 sm:-mt-24 lg:-mt-32 relative z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-36 text-[#6d132c] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C320,120 420,-15 720,45 C1020,105 1180,5 1440,55 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Main The SEYOL Method Section in Deep Maroon */}
      <section id="seyol-method" className="no-scroll-reveal bg-gradient-to-b from-[#6d132c] via-[#7B1131] to-[#500c20] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Ambient glowing radial effects */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

        <div className="site-container mx-auto space-y-12 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-gold-light text-xs font-bold uppercase tracking-widest border border-gold/30 shadow-xs">
              <Flower2 className="w-3.5 h-3.5 text-gold-light" />
              <span>Our Care Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
              The SEYOL Method
            </h2>
            <p className="font-playfair text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
              Four fundamental pillars that protect maternal mental health, hormonal recovery, and newborn vitality.
            </p>
          </div>

          {/* 4 Pillars Grid in Pinterest Infographic Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1720px] mx-auto">
            {[
              {
                stepNum: '01',
                stepLabel: 'PILLAR ONE',
                title: 'Traditional Postpartum Heritage',
                desc: 'Honouring the sacred 40-day Mandalam, uterine involution strokes, Vethu Kuli herbal baths, and gentle cotton belly binding.',
                icon: Flower2,
                align: 'left'
              },
              {
                stepNum: '02',
                stepLabel: 'PILLAR TWO',
                title: 'Evidence-Based Clinical Safety',
                desc: 'Every technique aligns with modern obstetric and paediatric guidelines. Regular scar checks, safe sleep, and hygienic infection barriers.',
                icon: ShieldCheck,
                align: 'right'
              },
              {
                stepNum: '03',
                stepLabel: 'PILLAR THREE',
                title: 'Certified & Vetted Care Matrons',
                desc: 'Trained through our intensive in-house academy, background-verified, and supported by senior clinical lactation supervisors.',
                icon: Award,
                align: 'left'
              },
              {
                stepNum: '04',
                stepLabel: 'PILLAR FOUR',
                title: 'Continuity & Village Support',
                desc: 'We replace postpartum isolation with compassionate continuity, providing a dedicated care team from second trimester through baby’s first year.',
                icon: Users,
                align: 'right'
              }
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.stepNum}
                  className="bg-white text-brown rounded-3xl p-6 sm:p-7 border border-cream-border shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-4 relative z-10 group h-full text-left"
                >
                  {/* Top Notched Header Row */}
                  <div className={`flex items-center justify-between w-full ${pillar.align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Number Block with bottom triangle notch */}
                    <div className="relative bg-[#7B1131] text-white rounded-2xl px-4 py-2.5 flex flex-col items-center justify-center shadow-md min-w-[72px] group-hover:bg-[#5e0c24] transition-colors duration-300">
                      <span className="font-serif font-black text-2xl sm:text-3xl leading-none text-white">{pillar.stepNum}</span>
                      <span className="text-[8px] font-bold tracking-widest text-gold-light uppercase mt-0.5">SEYOL</span>
                      {/* Triangle Speech Bubble Notch */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#7B1131]" />
                    </div>

                    {/* Icon Block */}
                    <div className="w-12 h-12 rounded-2xl bg-cream-light border border-cream-border flex items-center justify-center text-[#7B1131] shadow-xs group-hover:scale-105 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 pt-2 flex-1 flex flex-col justify-start">
                    {/* Pillar label badge */}
                    <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#7B1131] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span>{pillar.stepLabel}</span>
                    </div>

                    {/* Pillar Title */}
                    <h3 className="font-serif font-bold text-lg text-brown group-hover:text-maroon transition-colors tracking-tight leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-xs sm:text-sm text-brown-muted leading-relaxed font-normal pt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Organic Wave Transition from Maroon back to Cream */}
      <div className="w-full overflow-hidden leading-none -mt-1 relative z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-20 lg:h-28 text-[#500c20] block rotate-180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C320,120 420,-15 720,45 C1020,105 1180,5 1440,55 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 9: NOT SURE WHICH OPTION FITS? (Interactive Comparison Cards)     */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Comparison</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Not Sure Which Option Fits?
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Compare our in-home confinement visits, stay-in nanny care, and live education workshops side-by-side.
            </p>
          </div>

          <ComparisonCards />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: WHY FAMILIES BEGIN WITH SEYOL (Trust Badges & Founder Story)   */}
      {/* ========================================================================= */}
      
      {/* Founder Story Snippet */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-cream-light via-cream to-gold/10 border border-cream-border/90 p-8 sm:p-12 lg:p-16 shadow-warm-md overflow-hidden">
          {/* Watermark */}
          <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none select-none">
            <span className="font-serif text-[180px] font-black text-brown">SEYOL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider border border-maroon/20">
                <Flower2 className="w-4 h-4 text-maroon" />
                <span>Our Heritage & Origin</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-tight">
                Why Families Begin with SEYOL
              </h2>

              <p className="font-playfair text-base sm:text-lg text-brown font-medium leading-relaxed">
                Derived from an <span className="text-maroon font-bold">Ancient Tamil word</span> signifying the <span className="text-maroon font-bold">God of Newborns</span>, our company name <strong className="font-bold text-brown">SEYOL</strong> embodies our commitment to guiding parents starting from conception to childbirth.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-cream-light/90 border border-cream-border/80 shadow-xs space-y-3">
                <p className="text-sm sm:text-base text-brown-muted leading-relaxed">
                  Headquartered in Singapore, <strong className="text-brown">SEYOL</strong> is a family business led by <strong className="text-maroon font-bold">Mrs. Jemma Francis</strong>, a Certified Birth &amp; Postpartum Doula and Childbirth Educator.
                </p>
                
                <p className="font-valentina text-xl sm:text-2xl md:text-3xl text-maroon font-normal leading-relaxed pt-1">
                  &ldquo;Embrace the warmth of Indian tradition coupled with our passion and dedication at SEYOL, your trusted partner in the beautiful journey to parenthood!&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/our-story"
                  className="px-7 py-3.5 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-105 transition-all duration-200 shimmer-button"
                >
                  Read Full Founder Story
                </Link>

                <div className="flex items-center space-x-3 text-xs text-brown-muted font-medium">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                    <span>Singapore HQ</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                    <span>Certified Doula Led</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Founder Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-2 border-cream-border/80 aspect-[4/5] bg-brown hover-card-lift">
                <img
                  src={homeSettings?.founderStoryImage || 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800'}
                  alt="SEYOL Our Story - Traditional Indian Mother & Baby Care"
                  className="parallax w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a0c16]/90 via-[#2a0c16]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-cream-light space-y-1.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/90 text-brown font-bold text-[11px] tracking-wider uppercase">
                    {homeSettings?.founderTitle || 'Founder & Childbirth Educator'}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                    {homeSettings?.founderName || 'Mrs. Jemma Francis'}
                  </h4>
                  <p className="text-xs text-cream-light/80 font-sans">
                    {homeSettings?.founderSubtitle || 'Certified Birth & Postpartum Doula • Singapore & India'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges & Clinical Credentials Grid */}
      <section className="py-6 pb-12 site-container mx-auto w-full">
        <TrustBadges variant="full" />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: TRUSTED BY FAMILIES AT EVERY STAGE (Testimonials Carousel)   */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-gold-dark text-gold-dark" />
              <span>Verified Parent Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Trusted by Families at Every Stage
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted">
              Real experiences from parents, families, and learners who started their care journey with SEYOL.
            </p>
          </div>

          <TestimonialCarousel filterStage="all" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: YOUR FIRST SEYOL RESOURCE (Free E-Books & Checklists)         */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
              <span>Complimentary Knowledge</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brown">
              Your First SEYOL Resource
            </h2>
            <p className="font-playfair text-xs sm:text-sm text-brown-muted">
              Download our expert-crafted checklists, newborn bath guides, and postpartum recovery handbooks.
            </p>
          </div>

          <EmailCapture />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13: STILL UNSURE? WE'LL GUIDE YOU (Personalised Contact Form)      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-gold-dark" />
              <span>Personalised Care Guidance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Still Unsure? We’ll Guide You.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brown-muted">
              Share your due date, confinement preferences, or product questions with our senior care matrons.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

    </div>
  );
}
