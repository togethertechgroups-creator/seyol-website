'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Heart, 
  Users, 
  Star, 
  Baby,
  Sparkles
} from 'lucide-react';
import StatsCounter from '../ui/StatsCounter';
import communityBgSrc from '../../assets4/community-bg.png';
import { useAdminData } from '../../context/AdminDataContext';

export const TrustBadges: React.FC<{ variant?: 'full' | 'compact' }> = ({ variant = 'full' }) => {
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
      desc: 'Delivering trusted care and support to mothers and families.',
      icon: Users,
      watermarkIcon: Heart,
    },
    {
      numericValue: mothers.val,
      suffix: mothers.suf,
      label: 'Mothers Supported',
      desc: 'Guided and supported through every step of motherhood.',
      icon: Heart,
      watermarkIcon: Baby,
    },
    {
      numericValue: families.val,
      suffix: families.suf,
      label: 'Families Supported',
      desc: 'Creating a positive impact in families and communities.',
      icon: Star,
      watermarkIcon: Users,
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-[#7B1131] text-white py-6 px-4 sm:px-6 lg:px-8 border-y border-cream-border relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {communityStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center justify-center space-y-1 px-4 py-2 text-center group">
                <Icon className="w-6 h-6 text-gold-light group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <div className="font-serif font-bold text-xl tracking-tight text-white">
                    <StatsCounter value={stat.numericValue} suffix={stat.suffix} duration={1.5} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-light/90">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-[98%] xl:max-w-[96%] 2xl:max-w-[1780px] mx-auto w-full font-sans">
      {/* Outer Banner Card Matching Reference Design */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-[#fbf9f6] border border-cream-border shadow-warm-lg overflow-hidden pt-10 sm:pt-14 pb-10 px-5 sm:px-10 lg:px-14">
        
        {/* Background Image Artwork Layer (Mother & Baby + Line Art) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src={communityBgSrc}
            alt="Our Community Background"
            fill
            priority
            unoptimized
            className="object-cover object-left-top sm:object-center opacity-90"
          />
          {/* Subtle soft gradient scrim to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf9f6]/40 to-[#fbf9f6]/30" />
        </div>

        {/* Bottom Curved Maroon Wave Fill */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-24 sm:h-36 lg:h-44 text-[#7B1131] block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,110 C360,180 620,40 940,110 C1220,170 1360,110 1440,60 L1440,220 L0,220 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 space-y-8 sm:space-y-12">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#fcedeb] border border-[#f5d0cb] text-[#7B1131] text-[11px] font-bold uppercase tracking-widest shadow-2xs">
              <Users className="w-3.5 h-3.5" />
              <span>STRONGER TOGETHER</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
              Our Community
            </h2>

            {/* Subtitle */}
            <p className="font-playfair text-xs sm:text-sm text-brown font-medium leading-relaxed max-w-lg mx-auto">
              Thousands of mothers and families trust us every day.
              <br />
              Be a part of our growing community.
            </p>
          </div>

          {/* 3 White Floating Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch pt-2">
            {communityStats.map((stat, i) => {
              const Icon = stat.icon;
              const Watermark = stat.watermarkIcon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-cream-border/80 transition-all duration-300 flex flex-col justify-between space-y-3 group hover:-translate-y-1.5 relative overflow-hidden text-left"
                >
                  {/* Top Header Row: Stat Number + Circular Icon */}
                  <div className="flex items-center justify-between w-full">
                    {/* Stat Number with Count-Up Animation */}
                    <div className="font-serif font-black text-4xl sm:text-5xl text-[#7B1131] tracking-tight">
                      <StatsCounter
                        value={stat.numericValue}
                        suffix={stat.suffix}
                        duration={1.8}
                      />
                    </div>

                    {/* Circular Icon in Soft Pink Tone */}
                    <div className="w-12 h-12 rounded-full bg-[#fcedeb] text-[#7B1131] flex items-center justify-center border border-[#f5d0cb] shadow-2xs group-hover:scale-105 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stat Title */}
                  <h3 className="font-bold text-sm sm:text-base text-neutral-800 tracking-tight pt-1">
                    {stat.label}
                  </h3>

                  {/* Decorative Mini Timeline Line with Dot */}
                  <div className="w-14 h-[2px] bg-[#7B1131] relative my-1">
                    <div className="w-2 h-2 rounded-full bg-[#7B1131] absolute -top-[3px] right-0 ring-2 ring-white" />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-500 leading-relaxed font-normal pt-1 pr-6">
                    {stat.desc}
                  </p>

                  {/* Faint Watermark Icon on Bottom-Right */}
                  <Watermark className="w-12 h-12 text-rose-100/60 absolute bottom-2 right-2 pointer-events-none select-none transition-transform group-hover:scale-110 duration-300" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
