'use client';

import React from 'react';
import { Sparkles, ArrowRight, Flower2, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import { useVisitorJourney } from '../../context/VisitorJourneyContext';
import { servicesData } from '../../data/services';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const PersonalisedCareCard: React.FC = () => {
  const { stage, primaryConcern } = useVisitorJourney();
  const { openEnquiry } = useQuickEnquiry();

  const getStageHeader = () => {
    switch (stage) {
      case 'pregnancy':
        return {
          title: 'Your Pregnancy & Prenatal Wellness Protocol',
          desc: 'Herbal prenatal oil relaxation, birth doula support, and physiological breathing preparation.',
          serviceId: 'prenatal-massage',
        };
      case 'postpartum':
        return {
          title: 'Your 40-Day Postpartum Mandalam Recovery',
          desc: 'Restorative Dhanwantharam oil massages, uterine involution, hot Kizhi, and cotton belly binding (Kattu).',
          serviceId: 'postpartum-massage-kattu',
        };
      case 'newborn':
        return {
          title: 'Your Infant Bodywork & Nalangu Bath Care',
          desc: 'Traditional Thokkanam massage, soap-free herbal Nalangu Maavu bath, and colic belly roll-on ritual.',
          serviceId: 'infant-massage-bath',
        };
      default:
        return {
          title: 'Personalised Traditional Indian Mother & Baby Care',
          desc: 'Time-honoured South Indian postpartum routines combined with evidence-based clinical safety.',
          serviceId: 'postpartum-massage-kattu',
        };
    }
  };

  const info = getStageHeader();
  const matchedService = servicesData.find((s) => s.id === info.serviceId) || servicesData[0];

  return (
    <div className="w-full bg-gradient-to-br from-maroon via-maroon-dark to-brown text-cream-light p-6 sm:p-8 rounded-3xl border border-gold/40 shadow-warm-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Recommended For Stage: {stage.toUpperCase()}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
          {info.title}
        </h3>

        <p className="text-xs sm:text-sm text-cream-light/85 leading-relaxed">
          {info.desc}
        </p>

        {primaryConcern && (
          <div className="p-3 rounded-xl bg-maroon-dark/60 border border-gold/30 text-xs text-gold-light flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Targeting concern: <strong>{primaryConcern}</strong></span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => openEnquiry({ serviceTitle: matchedService.title })}
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-2"
          >
            <Flower2 className="w-4 h-4" />
            <span>Book {matchedService.shortTitle} Guidance</span>
          </button>
          <Link
            href={`/services#${matchedService.slug}`}
            className="px-6 py-3 rounded-xl bg-cream-light/10 hover:bg-cream-light/20 border border-cream-light/30 text-cream-light font-bold text-xs text-center transition-colors"
          >
            Explore Service Details
          </Link>
        </div>
      </div>
    </div>
  );
};
