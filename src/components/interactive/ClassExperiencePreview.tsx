'use client';

import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, Video, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

interface HighlightMoment {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
}

const CLASS_MOMENTS: HighlightMoment[] = [
  {
    id: 'doll-simulation',
    title: 'Weighted Doll Practice & Head Support',
    category: 'Hands-on Technique',
    description: 'Parents practice the exact head-supporting, non-slip arm hold and clockwise colic soothing strokes on calibrated infant simulation models.',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
    duration: '03:45 Preview',
  },
  {
    id: 'partner-coaching',
    title: 'Partner Labor Counterpressure & Breathing',
    category: 'Active Coaching',
    description: 'Dads and birth partners learn sacral hip squeezes, slow rhythmic breathing synchronization, and hospital advocacy cues.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    duration: '02:30 Preview',
  },
  {
    id: 'safe-bath-demo',
    title: 'Warm Water Bucket Bath (Vethu Thanni)',
    category: 'Traditional Bathing',
    description: 'Step-by-step guidance on testing water temperature, ear water protection, and gentle herbal bathing without harsh chemicals.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    duration: '04:15 Preview',
  },
  {
    id: 'interactive-qa',
    title: 'Live 1-on-1 Post-Session Q&A',
    category: 'Personalized Attention',
    description: 'Every session finishes with an unhurried live question-and-answer period where instructors review your technique on camera.',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
    duration: '03:00 Preview',
  }
];

export const ClassExperiencePreview: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState<HighlightMoment>(CLASS_MOMENTS[0]);
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Video className="w-3.5 h-3.5" />
          <span>Inside SEYOL Live Cohorts</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          Preview the SEYOL Learning Experience
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          See what happens inside our live workshops: doll simulations, partner coaching, clear anatomical slides, and supportive small-group interaction.
        </p>
      </div>

      {/* Main Spotlight & Video Thumbnail Grid */}
      <div className="bg-white rounded-3xl sm:rounded-[36px] border border-cream-border p-6 sm:p-10 shadow-warm-md space-y-8">
        
        {/* Main Active Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video bg-brown shadow-warm-md group border border-cream-border">
            <img
              src={activeMoment.image}
              alt={activeMoment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            
            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cream-light/90 text-maroon flex items-center justify-center shadow-warm-lg group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-maroon ml-1" />
              </div>
            </div>

            {/* Bottom info on video */}
            <div className="absolute bottom-4 left-4 right-4 text-cream-light flex items-center justify-between">
              <span className="text-xs font-bold bg-maroon/90 px-3 py-1 rounded-full backdrop-blur-xs">
                {activeMoment.category}
              </span>
              <span className="text-xs font-medium text-white/90 bg-black/50 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                {activeMoment.duration}
              </span>
            </div>
          </div>

          {/* Spotlight Description */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-gold-dark">
              Workshop Highlight
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown tracking-tight leading-snug">
              {activeMoment.title}
            </h3>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {activeMoment.description}
            </p>

            <div className="space-y-2 pt-2 text-xs text-brown">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                <span>Small cohorts capped at 12–15 couples</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                <span>Camera-on interactive feedback & live doll checks</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                <span>Lifetime recorded video access after session</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => openEnquiry({ serviceTitle: `Class Experience: ${activeMoment.title}` })}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold shadow-warm-sm transition-all cursor-pointer"
              >
                Join Next Live Cohort
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cream-border/80">
          {CLASS_MOMENTS.map((moment) => {
            const isSelected = activeMoment.id === moment.id;
            return (
              <button
                key={moment.id}
                onClick={() => setActiveMoment(moment)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col space-y-2 ${
                  isSelected
                    ? 'bg-maroon-soft border-maroon ring-2 ring-maroon/20'
                    : 'bg-cream border-cream-border hover:bg-cream-dark'
                }`}
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-brown">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-maroon/30 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-cream-light bg-maroon px-2 py-0.5 rounded">Active</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-maroon block">
                    {moment.category}
                  </span>
                  <span className="font-serif font-bold text-xs text-brown line-clamp-1">
                    {moment.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
