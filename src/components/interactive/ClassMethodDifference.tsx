'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Flower2, 
  Award, 
  HeartHandshake, 
  Check, 
  X,
  MessageCircle,
  Video
} from 'lucide-react';

export const ClassMethodDifference: React.FC = () => {
  return (
    <div className="w-full space-y-10 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>The SEYOL Teaching Standard</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          What Makes SEYOL Classes Different
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          Unlike pre-recorded internet videos or medical-heavy clinical lectures, SEYOL workshops provide active hands-on coaching rooted in warmth and tradition.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            stepNum: '01',
            title: 'Sacred Heritage + Modern Science',
            desc: 'We combine traditional South Indian Thokkanam massage, Kizhi, and herbal bath wisdom with up-to-date paediatric safe-sleep guidelines.',
            icon: Flower2,
          },
          {
            stepNum: '02',
            title: 'Real Doll Practice & Live Correction',
            desc: 'You do not just listen to slides. You hold a doll or pillow, perform the strokes on camera, and receive direct live feedback from your instructor.',
            icon: Award,
          },
          {
            stepNum: '03',
            title: 'Birth Partner Admitted Free',
            desc: 'Every ticket is a full Couple Pass. We believe birth and newborn care are team journeys — partners learn active counterpressure and bathing hold.',
            icon: Users,
          },
          {
            stepNum: '04',
            title: 'Direct WhatsApp Follow-Up Access',
            desc: 'You are never abandoned after the Zoom call. Join our private alumni group where senior doulas answer real-life questions when your baby arrives.',
            icon: MessageCircle,
          },
        ].map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.stepNum}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-border shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-2xl text-maroon bg-maroon-soft px-3 py-1 rounded-xl">
                  {pillar.stepNum}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-cream border border-cream-border flex items-center justify-center text-maroon group-hover:scale-110 group-hover:bg-gold/20 group-hover:border-gold transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-lg text-brown group-hover:text-maroon transition-colors leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-xs text-brown-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table: SEYOL Classes vs Generic Online Courses */}
      <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 shadow-warm-sm overflow-hidden">
        <div className="text-center max-w-lg mx-auto mb-6">
          <h3 className="font-serif text-xl font-bold text-brown">
            SEYOL Interactive Classes vs Generic Online Advice
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEYOL Approach */}
          <div className="bg-white rounded-2xl p-5 border-2 border-gold/60 space-y-3">
            <div className="font-serif font-bold text-maroon text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold/20 text-maroon flex items-center justify-center text-xs">✓</span>
              <span>The SEYOL Live Workshop Experience</span>
            </div>
            <div className="space-y-2 text-xs text-brown">
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>Small cohorts (12-15 couples max) for personal attention</span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>Live video interaction with doll posture correction</span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>Both partners attend on 1 pass with hands-on practice</span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>Traditional Indian bath & postpartum oils delivered home</span>
              </div>
            </div>
          </div>

          {/* Generic Online Videos */}
          <div className="bg-cream rounded-2xl p-5 border border-cream-border space-y-3 opacity-80">
            <div className="font-serif font-bold text-brown-muted text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cream-border text-brown-muted flex items-center justify-center text-xs">✕</span>
              <span>Generic Pre-Recorded Videos / Internet Tips</span>
            </div>
            <div className="space-y-2 text-xs text-brown-muted">
              <div className="flex items-start space-x-2">
                <X className="w-4 h-4 text-brown-muted/60 shrink-0 mt-0.5" />
                <span>One-way pre-recorded videos with zero feedback on your form</span>
              </div>
              <div className="flex items-start space-x-2">
                <X className="w-4 h-4 text-brown-muted/60 shrink-0 mt-0.5" />
                <span>Western-centric advice ignoring Indian confinement rituals</span>
              </div>
              <div className="flex items-start space-x-2">
                <X className="w-4 h-4 text-brown-muted/60 shrink-0 mt-0.5" />
                <span>Overwhelming, conflicting social media opinions</span>
              </div>
              <div className="flex items-start space-x-2">
                <X className="w-4 h-4 text-brown-muted/60 shrink-0 mt-0.5" />
                <span>No direct access to ask a doula when newborn arrives</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
