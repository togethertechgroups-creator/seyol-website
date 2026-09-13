'use client';

import React from 'react';
import { Calendar, Mail, Package, Video, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ClassRegistrationSteps: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();

  const STEPS = [
    {
      stepNum: '01',
      title: 'Select Class & Date',
      desc: 'Browse our class calendar and choose the workshop date and format (Live Zoom or In-Person Chennai Studio) that matches your timeline.',
      icon: Calendar,
    },
    {
      stepNum: '02',
      title: 'Instant Confirmation',
      desc: 'Receive immediate booking confirmation, calendar invite, and secure Zoom HD link directly on WhatsApp and email.',
      icon: Mail,
    },
    {
      stepNum: '03',
      title: 'Receive Learning Kit',
      desc: 'Get your digital stroke cheat-sheets, printable birth prep workbooks, and optional physical botanical care kit delivered.',
      icon: Package,
    },
    {
      stepNum: '04',
      title: 'Attend Live with Partner',
      desc: 'Join the live interactive workshop with your partner, practice on doll/pillow, and enjoy lifetime recording replay access.',
      icon: Video,
    },
  ];

  return (
    <div className="w-full space-y-10 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple 4-Step Process</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          How Class Registration Works
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          Reserve your seat in under 2 minutes with instant confirmation and complimentary partner attendance.
        </p>
      </div>

      {/* 4 Steps Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.stepNum}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-border shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-maroon text-cream-light font-serif font-black text-xl flex items-center justify-center shadow-sm group-hover:bg-[#5a0c24] transition-colors">
                  {st.stepNum}
                </div>
                <div className="w-10 h-10 rounded-2xl bg-cream border border-cream-border flex items-center justify-center text-maroon">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-lg text-brown group-hover:text-maroon transition-colors leading-snug">
                  {st.title}
                </h4>
                <p className="text-xs text-brown-muted leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gold pointer-events-none">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Action CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => openEnquiry({ serviceTitle: 'Class Registration Assistance' })}
          className="px-8 py-3.5 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-105 transition-all cursor-pointer shimmer-button"
        >
          Register for an Upcoming Class
        </button>
      </div>
    </div>
  );
};
