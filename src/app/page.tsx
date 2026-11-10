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

      {/* Top Organic Wave Transition to Deep Maroon */}
      <div className="w-full overflow-hidden leading-none relative z-20 pointer-events-none bg-[#FAF6EE]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-20 lg:h-28 text-[#6d132c] block -mb-px"
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white tracking-tight drop-shadow-sm leading-[1.14]">
              The SEYOL Method
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
              Rooted in ancestral tradition, professionally delivered, and thoughtfully shaped for modern family life.
            </p>
          </div>

          {/* 6-Card Asymmetric Mosaic Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-[1360px] mx-auto items-stretch">
            
            {/* Card 1: Traditional Care at the Core (Wide, Span 2 Cols on Desktop) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-7 sm:p-9 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    01 • ANCESTRAL HERITAGE
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <Flower2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2 max-w-xl">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Traditional Care at the Core
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#55403D] leading-relaxed">
                    Rooted in familiar Indian mother and baby care practices passed through generations.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[#7B1131]">
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Sacred 40-Day Mandalam</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Traditional Abhyanga</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Gentle Baby Touch</span>
                </div>
              </div>
            </div>

            {/* Card 2: Professionally Delivered (Tall, Span 2 Rows on Desktop) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 bg-[#FCFBFA] text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-7 sm:p-9 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    02 • ACCREDITATION
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Professionally Delivered
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#55403D] leading-relaxed">
                    Certified Doulas, Licensed Employment Agency, ACRA-Registered Company.
                  </p>
                </div>

                {/* Institutional Trust Checkpoints */}
                <div className="pt-4 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs font-sans text-[#3A1D1D] bg-white p-3 rounded-xl border border-[#EAE1D5]">
                    <CheckCircle2 className="w-4 h-4 text-[#7B1131] shrink-0 mt-0.5" />
                    <span>Certified Doulas &amp; Care Matrons</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-sans text-[#3A1D1D] bg-white p-3 rounded-xl border border-[#EAE1D5]">
                    <CheckCircle2 className="w-4 h-4 text-[#7B1131] shrink-0 mt-0.5" />
                    <span>Licensed Employment Agency</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-sans text-[#3A1D1D] bg-white p-3 rounded-xl border border-[#EAE1D5]">
                    <CheckCircle2 className="w-4 h-4 text-[#7B1131] shrink-0 mt-0.5" />
                    <span>ACRA-Registered Singapore Entity</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE1D5]/80 mt-6 relative z-10">
                <span className="text-[11px] font-heading font-semibold text-[#A6833D] uppercase tracking-wider">
                  MOM &amp; ACRA Licensed Clinical Governance
                </span>
              </div>
            </div>

            {/* Card 3: Adapted for Modern Families (Compact, 1 Col) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    03 • FLEXIBILITY
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Adapted for Modern Families
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed">
                    Care shaped around today’s homes, schedules, routines and family needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Mother & Baby Considered Together (Compact, 1 Col) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    04 • DUAL SANCTUARY
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Mother &amp; Baby Considered Together
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed">
                    Care that considers the mother’s recovery alongside baby’s everyday needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Care That Works in Real Life (Compact, 1 Col) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-white text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    05 • PRACTICALITY
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Care That Works in Real Life
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed">
                    Care designed to be easy to understand, follow and use at home.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6: Care Through Every Stage (Wide, Span 2 Cols on Desktop) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white text-[#3A1D1D] rounded-2xl sm:rounded-3xl p-7 sm:p-9 border border-[#EAE1D5] shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full">
                    06 • LIFECYCLE CONTINUITY
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2 max-w-xl">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                    Care Through Every Stage
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#55403D] leading-relaxed">
                    Support that can continue from preconception and pregnancy through birth, postpartum recovery and the early months with baby.
                  </p>
                </div>
              </div>

              {/* Stage Journey Ribbon */}
              <div className="pt-6 relative z-10">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-sans text-[#7B1131]">
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Preconception</span>
                  <span className="text-[#A6833D]">→</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Pregnancy</span>
                  <span className="text-[#A6833D]">→</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Birth</span>
                  <span className="text-[#A6833D]">→</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Postpartum Recovery</span>
                  <span className="text-[#A6833D]">→</span>
                  <span className="bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#EAE1D5]">Early Months</span>
                </div>
              </div>
            </div>

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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-brown tracking-tight leading-[1.18]">
              Not Sure Which Option Fits?
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-brown-muted max-w-xl mx-auto leading-relaxed">
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
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-brown tracking-tight leading-tight">
                Why Families Begin with SEYOL
              </h2>

              <p className="font-sans text-base sm:text-lg md:text-[19px] text-brown leading-relaxed font-normal">
                Derived from an <span className="text-maroon font-bold">Ancient Tamil word</span> signifying the <span className="text-maroon font-bold">God of Newborns</span>, our company name <strong className="font-bold text-brown">SEYOL</strong> embodies our commitment to guiding parents starting from conception to childbirth.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-cream-light/90 border border-cream-border/80 shadow-xs space-y-3">
                <p className="text-sm sm:text-base text-brown-muted leading-relaxed font-sans">
                  Headquartered in Singapore, <strong className="text-brown">SEYOL</strong> is a family business led by <strong className="text-maroon font-bold">Mrs. Jemma Francis</strong>, a Certified Birth &amp; Postpartum Doula and Childbirth Educator.
                </p>

                <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-maroon font-normal leading-relaxed pt-1">
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
                  src={
                    homeSettings?.founderStoryImage && !homeSettings.founderStoryImage.includes('unsplash')
                      ? homeSettings.founderStoryImage
                      : '/images/founder-jemma-francis.jpg'
                  }
                  alt={homeSettings?.founderName || 'Mrs. Jemma Francis - Founder of SEYOL'}
                  className="parallax w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a0c16]/90 via-[#2a0c16]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-cream-light space-y-1.5">
                  <div className="text-[11px] font-bold text-gold-light tracking-wider uppercase">
                    {homeSettings?.founderTitle || 'Founder & Childbirth Educator'}
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-cream-light">
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-brown tracking-tight leading-[1.18]">
              Trusted by Families at Every Stage
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-brown-muted max-w-xl mx-auto leading-relaxed">
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
