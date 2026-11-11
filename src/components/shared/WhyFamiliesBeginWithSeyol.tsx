'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Users,
  Star,
  Baby,
  ShieldCheck,
  Award,
  Flower2,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import StatsCounter from '../ui/StatsCounter';
import communityBgSrc from '../../assets4/community-bg.png';
import { useAdminData } from '../../context/AdminDataContext';

export const WhyFamiliesBeginWithSeyol: React.FC = () => {
  const { homeSettings } = useAdminData();

  // Helper to parse numeric string like "2,400+" or "300+"
  const parseStat = (str?: string, defaultVal: number = 300) => {
    if (!str) return { val: defaultVal, suf: '+' };
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
    const suf = str.includes('+') ? '+' : (str.match(/[^0-9, ]+$/)?.[0] || '+');
    return { val: isNaN(num) ? defaultVal : num, suf: suf || '+' };
  };

  const mothers = parseStat(homeSettings?.mothersSupported, 2400);
  const families = parseStat(homeSettings?.familiesSupported, 1800);

  const communityStats = [
    {
      numericValue: 9,
      suffix: '+',
      label: 'Years of Experience',
      desc: 'Delivering trusted, heritage-rooted care to mothers and families.',
      icon: Users,
    },
    {
      numericValue: mothers.val,
      suffix: mothers.suf,
      label: 'Mothers Supported',
      desc: 'Guided and nurtured through every sacred step of motherhood.',
      icon: Heart,
    },
    {
      numericValue: families.val,
      suffix: families.suf,
      label: 'Families Supported',
      desc: 'Creating lasting, generational peace of mind across homes.',
      icon: Star,
    },
  ];

  const keyStrengths = [
    {
      icon: Flower2,
      title: 'Ancestral Care Heritage',
      description:
        'Rooted in authentic Tamil Siddha and Ayurvedic recovery traditions, sacred Kizhi herbal fomentation, and gentle baby bath rituals.',
    },
    {
      icon: ShieldCheck,
      title: 'Certified Clinical Safety',
      description:
        'Doula-led protocols, in-house academy training, rigorous background verification, and clinical lactation supervision.',
    },
    {
      icon: Heart,
      title: 'Mother & Baby Considered Together',
      description:
        'Synchronised dual confinement routines that nurture maternal core healing and infant calm simultaneously.',
    },
    {
      icon: Award,
      title: 'MOM & ACRA Regulated',
      description:
        'ACRA-registered company and Licensed Employment Agency governed by Singapore MOM standards for complete transparency.',
    },
  ];

  return (
    <section id="why-families-begin" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full space-y-16 sm:space-y-20 border-b border-cream-border/60 font-sans">
      
      {/* 1. Master Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-4 py-1.5 rounded-full inline-block">
          Rooted in Heritage • Proven in Care
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.14]">
          Why Families Begin with SEYOL
        </h2>
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#55403D] max-w-2xl mx-auto leading-relaxed">
          Where sacred ancestral traditions, professional doula oversight, and a thriving community of modern families come together.
        </p>
      </div>

      {/* 2. Founder Story & Sacred Origin Banner */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FCFAF7] via-[#FAF6EE] to-[#F1E8DC]/60 border border-[#EAE1D5] p-7 sm:p-10 lg:p-14 shadow-warm-md overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -right-16 -bottom-16 opacity-[0.03] pointer-events-none select-none">
          <span className="font-serif text-[180px] font-black text-[#7B1131]">SEYOL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full inline-block">
                Our Sacred Origin
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#3A1D1D] tracking-tight leading-snug">
                Guiding New Beginnings with Ancestral Devotion
              </h3>
              <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#55403D] leading-relaxed">
                Derived from an <span className="text-[#7B1131] font-bold">Ancient Tamil word</span> signifying the <span className="text-[#7B1131] font-bold">God of Newborns</span>, our company name <strong className="font-bold text-[#3A1D1D]">SEYOL</strong> embodies our commitment to guiding parents starting from conception to childbirth.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 border border-[#EAE1D5] shadow-xs space-y-3 backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-[#55403D] leading-relaxed font-sans">
                Headquartered in Singapore, <strong className="text-[#3A1D1D]">SEYOL</strong> is a family business led by <strong className="text-[#7B1131] font-bold">Mrs. Jemma Francis</strong>, a Certified Birth &amp; Postpartum Doula and Childbirth Educator.
              </p>

              <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#7B1131] font-normal leading-relaxed pt-1">
                &ldquo;Embrace the warmth of Indian tradition coupled with our passion and dedication at SEYOL, your trusted partner in the beautiful journey to parenthood!&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/our-story"
                className="px-7 py-3 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-105 transition-all duration-200"
              >
                Read Full Founder Story
              </Link>

              <div className="flex items-center space-x-3 text-xs text-[#55403D] font-medium">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7B1131]" />
                  <span>Singapore HQ</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7B1131]" />
                  <span>Certified Doula Led</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7B1131]" />
                  <span>MOM Licensed</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Founder Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-2 border-[#EAE1D5] aspect-[4/5] bg-[#3A1D1D] group">
              <img
                src={
                  homeSettings?.founderStoryImage && !homeSettings.founderStoryImage.includes('unsplash')
                    ? homeSettings.founderStoryImage
                    : '/images/founder-jemma-francis.jpg'
                }
                alt={homeSettings?.founderName || 'Mrs. Jemma Francis - Founder of SEYOL'}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a0c16]/90 via-[#2a0c16]/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <div className="text-[11px] font-heading font-bold text-[#E8C574] tracking-wider uppercase">
                  {homeSettings?.founderTitle || 'Founder & Childbirth Educator'}
                </div>
                <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {homeSettings?.founderName || 'Mrs. Jemma Francis'}
                </h4>
                <p className="text-xs text-white/80 font-sans">
                  {homeSettings?.founderSubtitle || 'Certified Birth & Postpartum Doula • Singapore & India'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Community Impact & Trust Metrics (Merged from Our Community) */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-[#FAF6EE] border border-[#EAE1D5] shadow-warm-md overflow-hidden pt-10 sm:pt-12 pb-10 px-5 sm:px-10 lg:px-12">
        {/* Background Artwork Layer (Mother & Baby Line Art) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-35">
          <Image
            src={communityBgSrc}
            alt="SEYOL Community"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF6EE]/50 to-[#FAF6EE]/40" />
        </div>

        {/* Bottom Curved Maroon Wave Fill */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-20 sm:h-28 lg:h-36 text-[#7B1131] block opacity-95"
            preserveAspectRatio="none"
          >
            <path
              d="M0,110 C360,180 620,40 940,110 C1220,170 1360,110 1440,60 L1440,220 L0,220 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 space-y-8 sm:space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full inline-block">
              Our Growing Family Community
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7B1131]">
              Trusted by Thousands of Mothers &amp; Families
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#55403D] font-medium leading-relaxed">
              Every milestone represents real families guided with devotion, comfort, and clinical safety.
            </p>
          </div>

          {/* 3 Floating Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {communityStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] border border-[#EAE1D5] transition-all duration-300 flex flex-col justify-between space-y-3 group hover:-translate-y-1.5 relative overflow-hidden text-left"
                >
                  {/* Top Header Row: Stat Number + Circular Icon */}
                  <div className="flex items-center justify-between w-full">
                    <div className="font-heading font-black text-4xl sm:text-5xl text-[#7B1131] tracking-tight">
                      <StatsCounter
                        value={stat.numericValue}
                        suffix={stat.suffix}
                        duration={1.8}
                      />
                    </div>

                    <div className="w-12 h-12 rounded-full bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center border border-[#EAC8D2] shadow-2xs group-hover:scale-105 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stat Title */}
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#3A1D1D] tracking-tight pt-1">
                    {stat.label}
                  </h4>

                  {/* Decorative Mini Line with Dot */}
                  <div className="w-12 h-[2px] bg-[#7B1131] relative my-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#7B1131] absolute -top-[3px] right-0 ring-2 ring-white" />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#6E5652] leading-relaxed font-normal pt-1">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Key Strengths: 4 Pillars of Excellence */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full inline-block">
            Our Core Strengths
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3A1D1D] tracking-tight">
            What Sets SEYOL Apart
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#55403D]">
            Crafted for modern homes, supported by clinical expertise, and steeped in cultural warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {keyStrengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EAE1D5] shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center border border-[#EAC8D2] group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#3A1D1D] leading-snug">
                    {strength.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#55403D] leading-relaxed font-sans">
                    {strength.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default WhyFamiliesBeginWithSeyol;

