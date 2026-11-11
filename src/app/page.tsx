'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import heroBg1 from '../assets4/ChatGPT Image Aug 25, 2026, 09_09_24 AM.png';
import heroBg2 from '../assets4/ChatGPT Image Aug 25, 2026, 09_12_27 AM.png';
import heroBg3 from '../assets4/ChatGPT Image Aug 25, 2026, 08_26_15 AM.png';
import motherBabyMethodImg from '../assets4/mother and baby.jpg';
import ScrollExpand from '../components/shared/ScrollExpand';
import WordReveal from '../components/shared/WordReveal';
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
import { WhereAreYouRightNow } from '../components/interactive/WhereAreYouRightNow';
import Timeline from '../components/interactive/Timeline';
import { YourStageNextStep } from '../components/interactive/YourStageNextStep';
import { MostParentsStartHere } from '../components/interactive/MostParentsStartHere';
import { SupportModeTabs } from '../components/interactive/SupportModeTabs';
import { ShopByRoutine } from '../components/interactive/ShopByRoutine';
import { ComparisonCards } from '../components/interactive/ComparisonCards';
import { WhyFamiliesBeginWithSeyol } from '../components/shared/WhyFamiliesBeginWithSeyol';
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
      image: homeSettings?.heroSlide1Image || heroBg3,
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
      image: homeSettings?.heroSlide2Image || heroBg1,
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
      image: homeSettings?.heroSlide3Image || heroBg2,
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
      image: homeSettings?.heroSlide4Image || heroBg3,
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
    <div className="w-full font-sans bg-cream text-brown">

      {/* ── Upper Maroon Background Region (Edge-to-Edge Solid Maroon) ── */}
      <div className="w-full bg-[#7B1131] text-cream-light border-b border-[#991840]/40 shadow-warm-xl">

        {/* ========================================================================= */}
        {/* SECTION 1: START HERE / BEGIN YOUR SEYOL CARE JOURNEY (Hero Slideshow)     */}
        {/* ========================================================================= */}
        <section 
          className="relative w-full px-1.5 sm:px-3 lg:px-4 pt-3.5 sm:pt-4 pb-6 sm:pb-8"
          style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        >
          <div
            className="relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden hero-viewport-height border border-gold/30 shadow-warm-lg bg-brown flex items-center justify-start"
            style={{ marginTop: '5.5mm', position: 'relative', overflow: 'hidden' }}
          >

            {/* Background Media with Smooth Auto Cross-Fade */}
            <div 
              className="absolute inset-0 z-0 overflow-hidden"
              style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
            >
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-x-0 -top-16 -bottom-16 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    style={{
                      transform: 'translateY(12mm)',
                      position: 'absolute',
                      inset: 0,
                    }}
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
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${currentSlideIndex === idx
                        ? 'w-8 bg-gold shadow-gold-glow'
                        : 'w-2 bg-white/40 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Left-Aligned Slide Content */}
            <div className="relative z-10 max-w-xl lg:max-w-2xl xl:max-w-3xl px-5 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-6 sm:pb-8 text-left text-cream-light space-y-2.5 sm:space-y-3.5 w-full">

              {/* Slide Heading in Primary Garet font */}
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                {activeSlide.headingSans}{' '}
                <span className="text-gold-light font-extrabold">
                  {activeSlide.headingSerif}
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base md:text-lg text-cream-light/95 max-w-xl font-normal leading-relaxed drop-shadow font-sans">
                {activeSlide.subtext}
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pt-2 sm:pt-3 w-full sm:w-auto">
                {/* Button 1: Solid clean maroon CTA with white text, no gold border */}
                <button
                  onClick={activeSlide.ctaPrimaryAction}
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-warm-lg transition-all duration-200 hover:scale-[1.02] border-0 cursor-pointer"
                >
                  {activeSlide.ctaPrimaryText}
                </button>

                {/* Button 2: Completely transparent background, crisp readable white text */}
                <button
                  onClick={activeSlide.ctaSecondaryAction}
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white border-2 border-white/80 hover:border-white font-heading font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  {activeSlide.ctaSecondaryText}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: WHERE ARE YOU RIGHT NOW? (5 Interactive Image-Based Stages)     */}
        {/* ========================================================================= */}
        <div id="care-path">
          <WhereAreYouRightNow />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: YOUR STAGE, YOUR NEXT STEP                                       */}
      {/* ========================================================================= */}
      <YourStageNextStep />

      {/* ========================================================================= */}
      {/* SECTION: MOST PARENTS START HERE (Your Journey, Our Care)                 */}
      {/* ========================================================================= */}
      <MostParentsStartHere />

      {/* ========================================================================= */}
      {/* SECTION: HOW WOULD YOU LIKE SEYOL TO SUPPORT YOU? (5-Way Tabs)            */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <SupportModeTabs />
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
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            Every New Beginning Deserves the Right Support
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-cream-light/95 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Support for pregnancy, birth, postpartum and your baby’s first days, rooted in traditional Indian care and adapted for modern family life
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-3.5 rounded-full bg-cream-light text-maroon hover:bg-white font-bold text-xs sm:text-sm tracking-wide shadow-warm-xl hover:scale-105 transition-all duration-200 cursor-pointer shimmer-button inline-flex items-center justify-center"
            >
              Explore Services
            </Link>

            <a
              href="#your-stage-next-step"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('your-stage-next-step');
                if (target) {
                  const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                } else {
                  window.location.hash = 'your-stage-next-step';
                }
              }}
              className="px-8 py-3.5 rounded-full bg-[#160307]/75 hover:bg-[#160307]/95 text-cream-light border border-gold/50 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all duration-200 shadow-warm-lg inline-flex items-center justify-center cursor-pointer"
            >
              Find Your Next Step
            </a>
          </div>
        </div>
      </ScrollExpand>

      {/* ========================================================================= */}
      {/* SECTION: SHOP BY ROUTINE (Everyday Rituals by SEYOL)                       */}
      {/* ========================================================================= */}
      <ShopByRoutine />





      {/* ========================================================================= */}
      {/* SECTION 8: THE SEYOL METHOD (Section Explaining Philosophy in 4 Pillars)  */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* SECTION 8: THE SEYOL METHOD (Bento Grid Inspired by Maven Clinic)         */}
      {/* ========================================================================= */}
      <section id="seyol-method" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] relative overflow-hidden font-sans border-b border-[#EAE1D5]/60">
        <div className="site-container mx-auto space-y-12 sm:space-y-16 relative z-10 max-w-[1360px]">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-4 py-1.5 rounded-full inline-block">
              Our Care Philosophy
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.14]">
              The SEYOL Method
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#55403D] max-w-xl mx-auto leading-relaxed">
              Rooted in ancestral tradition, professionally delivered, and thoughtfully shaped for modern family life.
            </p>
          </div>

          {/* 6-Card Bento Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch">

            {/* Card 1: Traditional Care at the Core (Slot 1, Top-Left - Photo Card) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#EAE1D5]/70 bg-cream-card">
              <Image
                src={heroBg3}
                alt="Traditional Care at the Core"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A0308]/90 via-[#1A0308]/45 to-[#1A0308]/20 pointer-events-none" />

              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2 max-w-sm">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-sm">
                  Traditional Care at the Core
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-sm">
                  Rooted in familiar Indian mother and baby care practices passed through generations.
                </p>
              </div>
            </div>

            {/* Card 2: Professionally Delivered (Slot 2, Top-Center - 3D Stacked Pills Card) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#7B1131]/30 bg-gradient-to-br from-[#8C1B3C] via-[#7B1131] to-[#550A1F] text-white">
              {/* Ambient radial glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                  Professionally Delivered
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed max-w-xs">
                  Certified Doulas, Licensed Employment Agency, ACRA-Registered Company.
                </p>
              </div>

              {/* 3D Stacked Floating Pills Graphic */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center pt-6 pb-2 space-y-2.5">
                {/* Pill 1: Certified Doulas */}
                <div className="w-[88%] max-w-[270px] bg-[#4E081B]/85 border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-md flex items-center gap-3 backdrop-blur-sm -mb-1 transform scale-[0.93] transition-transform duration-300 group-hover:scale-95">
                  <div className="w-7 h-7 rounded-full bg-[#7B1131] border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Flower2 className="w-3.5 h-3.5 text-cream-light" />
                  </div>
                  <span className="text-xs font-heading font-bold text-white tracking-wide truncate">
                    Certified Doulas
                  </span>
                </div>

                {/* Pill 2: Licensed Employment Agency (Featured White Pill in Front) */}
                <div className="w-[98%] max-w-[290px] bg-white text-[#3A1D1D] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 border border-white/90 z-20 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-[13px] font-heading font-extrabold text-[#7B1131] tracking-wide truncate">
                      Licensed Employment Agency
                    </span>
                    <span className="text-[10px] font-sans text-[#7B1131]/70 leading-none">
                      MOM Licensed &amp; Verified
                    </span>
                  </div>
                </div>

                {/* Pill 3: ACRA-Registered Company */}
                <div className="w-[90%] max-w-[275px] bg-gradient-to-r from-[#FAF6EE] to-[#EFE5D8] text-[#3A1D1D] border border-white/60 rounded-2xl px-3.5 py-2.5 shadow-md flex items-center gap-3 -mt-1 z-10 transform scale-[0.95] transition-transform duration-300 group-hover:scale-100">
                  <div className="w-7 h-7 rounded-full bg-[#C8A45D]/25 text-[#7B1131] flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-heading font-bold text-[#3A1D1D] tracking-wide truncate">
                    ACRA-Registered Company
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Adapted for Modern Families (Slot 3, Top-Right - Concentric Radar Arcs Card) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#E2D8CF] bg-gradient-to-b from-[#F7F2EC] via-[#EFE7DE] to-[#E5DCD2] text-[#3A1D1D]">
              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#3A1D1D] tracking-tight leading-snug">
                  Adapted for Modern Families
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed max-w-xs">
                  Care shaped around today’s homes, schedules, routines and family needs.
                </p>
              </div>

              {/* Concentric Radar Rings & Sweeping Beam in Maroon/Gold */}
              <div className="relative w-full h-40 sm:h-44 overflow-hidden mt-4">
                {/* Concentric Circular Arcs */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border border-[#7B1131]/15" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border border-[#7B1131]/20" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border border-[#7B1131]/25" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border border-[#C8A45D]/40" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-[#C8A45D]/60 bg-[#7B1131]/15" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#7B1131] shadow-[0_0_10px_rgba(123,17,49,0.5)]" />

                {/* Radar Sweeping Beam */}
                <div
                  className="absolute -bottom-10 left-1/2 origin-bottom -translate-x-1/2 w-56 h-56 pointer-events-none transition-transform duration-1000 ease-out group-hover:rotate-45"
                  style={{
                    background: 'conic-gradient(from 180deg at 50% 100%, rgba(200,164,93,0.35) 0deg, rgba(123,17,49,0.15) 25deg, transparent 55deg)',
                    borderRadius: '50% 50% 0 0'
                  }}
                />

                {/* Radar Scanner Line with Glowing Node */}
                <div className="absolute -bottom-10 left-1/2 origin-bottom w-[1.5px] h-36 bg-gradient-to-t from-[#7B1131] via-[#C8A45D]/60 to-transparent rotate-[32deg] group-hover:rotate-[65deg] transition-transform duration-1000 ease-out">
                  <div className="absolute top-5 -left-1 w-2.5 h-2.5 rounded-full bg-[#C8A45D] shadow-[0_0_8px_#C8A45D]" />
                </div>
              </div>
            </div>

            {/* Card 4: Care Through Every Stage (Slot 4, Bottom-Left - Wireframe 3D Sphere Card) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#3A0715] bg-gradient-to-b from-[#380715] via-[#2A040F] to-[#1A0208] text-white">
              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                  Care Through Every Stage
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-xs">
                  Support that can continue from preconception and pregnancy through birth, postpartum recovery and the early months with baby.
                </p>
              </div>

              {/* 3D Wireframe Globe with Floating Stage Tags */}
              <div className="relative w-full h-44 sm:h-48 flex items-center justify-center pt-2">
                <svg
                  className="w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-700 ease-out group-hover:rotate-12"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  {/* Outer border sphere */}
                  <circle cx="100" cy="100" r="85" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                  {/* Latitudes */}
                  <ellipse cx="100" cy="100" rx="85" ry="55" stroke="#C8A45D" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                  <ellipse cx="100" cy="100" rx="85" ry="24" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  {/* Equator / Central Horizon */}
                  <line x1="15" y1="100" x2="185" y2="100" stroke="#C8A45D" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                  {/* Longitudes */}
                  <ellipse cx="100" cy="100" rx="55" ry="85" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <ellipse cx="100" cy="100" rx="24" ry="85" stroke="#C8A45D" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                  <line x1="100" y1="15" x2="100" y2="185" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                </svg>

                {/* Floating Stage Tags Anchored on the Sphere */}
                <div className="absolute top-[32%] left-[8%] bg-[#500C1F]/90 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-[10px] font-heading font-bold text-white shadow-md flex items-center gap-1 group-hover:-translate-y-1 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                  Preconception
                </div>

                <div className="absolute top-[48%] right-[6%] bg-[#500C1F]/90 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-[10px] font-heading font-bold text-white shadow-md flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C574]" />
                  Pregnancy &amp; Birth
                </div>

                <div className="absolute bottom-[8%] left-[26%] bg-[#7B1131] text-white border border-[#C8A45D]/60 rounded-full px-3 py-1 text-[10px] font-heading font-bold shadow-lg flex items-center gap-1 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3 h-3 text-[#E8C574]" />
                  Postpartum &amp; Early Months
                </div>
              </div>
            </div>

            {/* Card 5: Care That Works in Real Life (Slot 5, Bottom-Center - Floating Chat Bubbles with Heart) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#E2D8CF] bg-gradient-to-b from-[#F7F2EC] via-[#EFE7DE] to-[#E3D7CC] text-[#3A1D1D]">
              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#3A1D1D] tracking-tight leading-snug">
                  Care That Works in Real Life
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed max-w-xs">
                  Care designed to be easy to understand, follow and use at home.
                </p>
              </div>

              {/* 3D-Styled Floating Chat Bubbles with Heart */}
              <div className="relative w-full h-40 sm:h-44 flex items-center justify-center">
                {/* Back Dark Maroon Bubble */}
                <div className="w-16 h-12 sm:w-18 sm:h-14 bg-[#7B1131] rounded-2xl rounded-bl-sm shadow-md absolute bottom-14 right-16 sm:right-20 transform -rotate-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-3 flex items-center justify-center">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>
                </div>

                {/* Front White Bubble with Heart */}
                <div className="w-24 h-20 sm:w-28 sm:h-24 bg-white rounded-3xl rounded-bl-md shadow-2xl border border-[#EAE1D5] flex items-center justify-center absolute bottom-4 right-6 sm:right-8 z-10 transform transition-all duration-300 group-hover:scale-105">
                  <div className="relative">
                    <Heart className="w-9 h-9 sm:w-11 sm:h-11 text-[#7B1131] fill-[#7B1131] drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A45D] absolute -top-1 -right-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6: Mother & Baby Considered Together (Slot 6, Bottom-Right - Photo Card) */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-warm-md hover:shadow-warm-xl transition-all duration-300 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 border border-[#EAE1D5]/70 bg-cream-card">
              <Image
                src={motherBabyMethodImg}
                alt="Mother & Baby Considered Together"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A0308]/90 via-[#1A0308]/45 to-[#1A0308]/20 pointer-events-none" />

              {/* Text Content at Top */}
              <div className="relative z-10 space-y-2 max-w-sm">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-sm">
                  Mother &amp; Baby Considered Together
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-sm">
                  Care that considers the mother’s recovery alongside baby’s everyday needs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: NOT SURE WHICH OPTION FITS? (Responsive Comparison Table)      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-4 py-1.5 rounded-full inline-block">
              Support Comparison
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.18]">
              Not Sure Which Option Fits?
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#55403D] max-w-xl mx-auto leading-relaxed">
              Compare our services, classes, nanny support, hourly care, and consultations side-by-side to choose the right fit for your family.
            </p>
          </div>

          <ComparisonCards />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: WHY FAMILIES BEGIN WITH SEYOL (Merged Community & Heritage)    */}
      {/* ========================================================================= */}
      <WhyFamiliesBeginWithSeyol />

      {/* ========================================================================= */}
      {/* SECTION 11: TRUSTED BY FAMILIES AT EVERY STAGE (Maasi-Style Testimonials) */}
      {/* ========================================================================= */}
      <TestimonialCarousel />

      {/* ========================================================================= */}
      {/* SECTION 12: YOUR FIRST SEYOL RESOURCE (Free E-Books & Checklists)         */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-[1.18]">
              Your First SEYOL Resource
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-brown-muted max-w-xl mx-auto leading-relaxed">
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-brown tracking-tight leading-[1.18]">
              Still Unsure? We’ll Guide You.
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-brown-muted max-w-xl mx-auto leading-relaxed">
              Share your due date, confinement preferences, or product questions with our senior care matrons.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

    </div>
  );
}
