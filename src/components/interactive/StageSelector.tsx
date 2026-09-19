'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower2, 
  Heart, 
  Baby, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  ShoppingBag 
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export interface StageSelectorProps {
  initialStage?: string;
  className?: string;
}

export const StageSelector: React.FC<StageSelectorProps> = ({
  initialStage = 'just_given_birth',
  className = ''
}) => {
  const [selectedStage, setSelectedStage] = useState<string>(initialStage);
  const { openEnquiry } = useQuickEnquiry();

  const stages = [
    {
      id: 'trying_to_conceive',
      title: 'Trying to Conceive',
      subtitle: 'Planning ahead',
      icon: Flower2,
    },
    {
      id: 'pregnant',
      title: 'Pregnant',
      subtitle: 'Expecting now',
      icon: Heart,
    },
    {
      id: 'just_given_birth',
      title: 'Just Given Birth',
      subtitle: '0–6 weeks',
      icon: Baby,
    },
    {
      id: 'postpartum',
      title: 'Postpartum & Beyond',
      subtitle: '6 weeks – 12 months',
      icon: ShieldCheck,
    },
    {
      id: 'growing_family',
      title: 'Growing Family',
      subtitle: 'Beyond the first year',
      icon: Users,
    },
  ];

  const carePaths: Record<
    string,
    {
      stageName: string;
      service: { badge: string; title: string; desc: string; href: string };
      classItem: { badge: string; title: string; desc: string; href: string };
      product: { badge: string; title: string; desc: string; href: string };
    }
  > = {
    trying_to_conceive: {
      stageName: 'Preconception & Fertility Preparation',
      service: {
        badge: 'SERVICE',
        title: 'Preconception Support & Uterine Wellness',
        desc: 'Pelvic basin tonification, Siddha herbal oil therapy, and gentle fertility preparation rituals.',
        href: '/services/preconception-support',
      },
      classItem: {
        badge: 'CLASS',
        title: 'Holistic Conception & Cycle Masterclass',
        desc: 'Pelvic alignment, menstrual cycle balance, and traditional Ayurvedic pre-pregnancy nutrition.',
        href: '/classes',
      },
      product: {
        badge: 'PRODUCT',
        title: 'Restorative Mother Massage Oil',
        desc: 'Warming herbal oil blend formulated with traditional Siddha botanicals for uterine vitality.',
        href: '/products',
      },
    },
    pregnant: {
      stageName: 'Pregnancy & Birth Preparation',
      service: {
        badge: 'SERVICE',
        title: 'Prenatal Massage Therapy',
        desc: 'Relieves lower back strain, sciatic ache, reduces swelling, and promotes deep restorative sleep.',
        href: '/services/prenatal-massage-therapy',
      },
      classItem: {
        badge: 'CLASS',
        title: 'Antenatal & Physiological Birth Prep',
        desc: 'Active labor positions, partner counterpressure, and physiological breathing masterclass.',
        href: '/classes',
      },
      product: {
        badge: 'PRODUCT',
        title: 'Maternal Body Comfort Oil',
        desc: 'Ultra-hydrating cold-pressed sesame and botanical oil to nourish stretching skin.',
        href: '/products',
      },
    },
    just_given_birth: {
      stageName: 'Immediate Postpartum & Newborn Arrival',
      service: {
        badge: 'SERVICE',
        title: 'Stay-in Confinement Nanny Support',
        desc: 'Daily hands-on care for you and your newborn, traditional herbal meals, and infant bath rituals.',
        href: '/services/stay-in-confinement-nanny-support',
      },
      classItem: {
        badge: 'CLASS',
        title: 'Newborn Care Essentials',
        desc: 'Practical advice and guided holds for the first crucial weeks of parenthood.',
        href: '/classes',
      },
      product: {
        badge: 'PRODUCT',
        title: 'Soothing Baby Massage Oil',
        desc: 'Pure AYUSH-certified cold-pressed virgin coconut and sweet almond oil for delicate newborn skin.',
        href: '/products',
      },
    },
    postpartum: {
      stageName: 'Postpartum Restoration & 40-Day Confinement',
      service: {
        badge: 'SERVICE',
        title: 'Postpartum Massage & Bengkung Wrap',
        desc: 'Sacred 40-day Mandalam recovery, hot herbal Kizhi fomentation, and traditional cotton belly binding.',
        href: '/services/postpartum-massage-and-wrap',
      },
      classItem: {
        badge: 'CLASS',
        title: 'Pelvic Floor & Core Restoration',
        desc: 'Diastasis recti rehabilitation, pelvic tone alignment, and safe functional maternal vitality.',
        href: '/classes',
      },
      product: {
        badge: 'PRODUCT',
        title: 'Vethu Kuli Herbal Bath Sachets',
        desc: 'Traditional South Indian herbal bath pouches for deep muscle relaxation and joint comfort.',
        href: '/products',
      },
    },
    growing_family: {
      stageName: 'Growing Family & Ongoing Routine',
      service: {
        badge: 'SERVICE',
        title: 'Hourly Newborn & Infant Respite Care',
        desc: 'Certified infant care practitioners supporting daytime and nighttime routines for parents.',
        href: '/services/hourly-newborn-support',
      },
      classItem: {
        badge: 'CLASS',
        title: 'Infant Sleep & Routine Masterclass',
        desc: 'Gentle routines, sensory stimulation, and confident milestones beyond the first year.',
        href: '/classes',
      },
      product: {
        badge: 'PRODUCT',
        title: 'Nalangu Maavu Herbal Bath Powder',
        desc: 'Soap-free herbal cleanser formulated with green gram, fragrant rose petals, and wild turmeric.',
        href: '/products',
      },
    },
  };

  const activePath = carePaths[selectedStage] || carePaths.just_given_birth;

  return (
    <div className={`w-full space-y-8 font-sans ${className}`}>
      
      {/* ── 5 Stage Selector Cards Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {stages.map((st) => {
          const Icon = st.icon;
          const isSelected = selectedStage === st.id;

          return (
            <button
              key={st.id}
              onClick={() => setSelectedStage(st.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#7B1131] shadow-[0_16px_36px_rgba(0,0,0,0.25)] scale-[1.04] border-2 border-gold ring-4 ring-gold/20 z-10'
                  : 'bg-white/10 hover:bg-white/20 text-cream-light border border-white/20 backdrop-blur-md hover:scale-[1.02] hover:-translate-y-0.5'
              }`}
            >
              {/* Top active indicator pin */}
              {isSelected && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-gold rounded-full shadow-[0_0_12px_rgba(200,164,93,0.9)] animate-pulse" />
              )}

              {/* Icon Container */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-110 ${
                  isSelected
                    ? 'bg-[#7B1131]/10 text-[#7B1131] ring-1 ring-[#7B1131]/20 shadow-xs'
                    : 'bg-white/15 text-gold-light border border-white/20'
                }`}
              >
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>

              {/* Stage Title */}
              <div
                className={`font-serif font-bold text-xs sm:text-[13px] leading-tight mb-1 transition-colors ${
                  isSelected ? 'text-[#7B1131]' : 'text-white'
                }`}
              >
                {st.title}
              </div>

              {/* Subtitle */}
              <div
                className={`text-[10px] sm:text-[11px] font-medium leading-tight ${
                  isSelected ? 'text-[#7B1131]/80' : 'text-cream-light/75'
                }`}
              >
                {st.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── "Your Suggested Care Path" Dynamic Result Container ── */}
      <div className="mt-8 pt-4 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-b from-[#FAF6EE] via-[#FCF9F2] to-[#F5EFEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-6 border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.18)] space-y-4 overflow-hidden">
          
          {/* Ambient Glow Accents inside container */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-border/80 relative z-10">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-brown tracking-tight">
                Your Suggested Care Path
              </h3>
            </div>

            <button
              onClick={() => openEnquiry({ serviceTitle: activePath.stageName })}
              className="px-4 py-2 rounded-full bg-[#7B1131] hover:bg-[#600E26] text-white text-xs sm:text-[12.5px] font-extrabold tracking-wide transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:scale-105 cursor-pointer self-start sm:self-auto border border-gold/30 flex items-center space-x-1.5 shimmer-button"
            >
              <span>Consult Matron</span>
              <ArrowRight className="w-3 h-3 text-gold-light" />
            </button>
          </div>

          {/* 3 Care Path Cards (Service, Class, Product) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 relative z-10"
            >
              {/* Card 1: SERVICE */}
              <div className="relative rounded-2xl p-4 sm:p-5 bg-white border border-neutral-200/90 hover:border-gold/80 shadow-[0_4px_18px_rgba(58,29,29,0.06)] hover:shadow-[0_16px_36px_rgba(123,17,49,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                {/* Ambient Top Glow Watermark */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/40 via-gold/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                <div className="space-y-2.5 relative z-10">
                  {/* Top Meta Row: Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1.5 text-[9.5px] font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#fcedeb] border border-[#f5d0cb] px-2.5 py-0.5 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7B1131] animate-pulse" />
                      <span>{activePath.service.badge}</span>
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#fcedeb] text-[#7B1131] border border-[#f5d0cb] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                      <Flower2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-[15px] sm:text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug tracking-tight">
                    {activePath.service.title}
                  </h4>

                  {/* Accent hairline */}
                  <div className="w-8 h-[2px] bg-[#7B1131]/25 group-hover:w-14 group-hover:bg-[#7B1131] transition-all duration-300 rounded-full" />

                  {/* Description */}
                  <p className="text-xs text-brown-muted leading-relaxed font-normal line-clamp-2">
                    {activePath.service.desc}
                  </p>

                  {/* Trust Highlight Pill */}
                  <div className="pt-0.5 flex items-center space-x-1.5 text-[10.5px] font-semibold text-neutral-600">
                    <CheckCircle2 className="w-3 h-3 text-gold-dark shrink-0" />
                    <span>Certified Doula &bull; In-Home</span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-3 mt-3 border-t border-neutral-100 relative z-10">
                  <Link
                    href={activePath.service.href}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#7B1131] hover:text-white border border-[#EADBCC] hover:border-[#7B1131] font-bold text-xs flex items-center justify-between transition-all duration-200 group/btn shadow-2xs cursor-pointer"
                  >
                    <span>Explore Service</span>
                    <div className="w-5 h-5 rounded-md bg-white/80 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Card 2: CLASS */}
              <div className="relative rounded-2xl p-4 sm:p-5 bg-white border border-neutral-200/90 hover:border-gold/80 shadow-[0_4px_18px_rgba(58,29,29,0.06)] hover:shadow-[0_16px_36px_rgba(200,164,93,0.16)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                {/* Ambient Top Glow Watermark */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/40 via-gold/15 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                <div className="space-y-2.5 relative z-10">
                  {/* Top Meta Row: Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1.5 text-[9.5px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                      <span>{activePath.classItem.badge}</span>
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-[15px] sm:text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug tracking-tight">
                    {activePath.classItem.title}
                  </h4>

                  {/* Accent hairline */}
                  <div className="w-8 h-[2px] bg-gold/40 group-hover:w-14 group-hover:bg-gold transition-all duration-300 rounded-full" />

                  {/* Description */}
                  <p className="text-xs text-brown-muted leading-relaxed font-normal line-clamp-2">
                    {activePath.classItem.desc}
                  </p>

                  {/* Trust Highlight Pill */}
                  <div className="pt-0.5 flex items-center space-x-1.5 text-[10.5px] font-semibold text-neutral-600">
                    <CheckCircle2 className="w-3 h-3 text-gold-dark shrink-0" />
                    <span>Interactive Workshop &bull; Certified</span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-3 mt-3 border-t border-neutral-100 relative z-10">
                  <Link
                    href={activePath.classItem.href}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-amber-900 hover:text-white border border-[#EADBCC] hover:border-[#7B1131] font-bold text-xs flex items-center justify-between transition-all duration-200 group/btn shadow-2xs cursor-pointer"
                  >
                    <span>View Masterclass</span>
                    <div className="w-5 h-5 rounded-md bg-white/80 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Card 3: PRODUCT */}
              <div className="relative rounded-2xl p-4 sm:p-5 bg-white border border-neutral-200/90 hover:border-gold/80 shadow-[0_4px_18px_rgba(58,29,29,0.06)] hover:shadow-[0_16px_36px_rgba(58,29,29,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                {/* Ambient Top Glow Watermark */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/40 via-gold/15 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                <div className="space-y-2.5 relative z-10">
                  {/* Top Meta Row: Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1.5 text-[9.5px] font-extrabold uppercase tracking-widest text-[#2D5A3E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3E] animate-pulse" />
                      <span>{activePath.product.badge}</span>
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2D5A3E] border border-emerald-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#7B1131] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-[15px] sm:text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug tracking-tight">
                    {activePath.product.title}
                  </h4>

                  {/* Accent hairline */}
                  <div className="w-8 h-[2px] bg-emerald-600/30 group-hover:w-14 group-hover:bg-[#2D5A3E] transition-all duration-300 rounded-full" />

                  {/* Description */}
                  <p className="text-xs text-brown-muted leading-relaxed font-normal line-clamp-2">
                    {activePath.product.desc}
                  </p>

                  {/* Trust Highlight Pill */}
                  <div className="pt-0.5 flex items-center space-x-1.5 text-[10.5px] font-semibold text-neutral-600">
                    <CheckCircle2 className="w-3 h-3 text-gold-dark shrink-0" />
                    <span>100% Herbal &bull; AYUSH Certified</span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-3 mt-3 border-t border-neutral-100 relative z-10">
                  <Link
                    href={activePath.product.href}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#2D5A3E] hover:text-white border border-[#EADBCC] hover:border-[#7B1131] font-bold text-xs flex items-center justify-between transition-all duration-200 group/btn shadow-2xs cursor-pointer"
                  >
                    <span>Shop Formulation</span>
                    <div className="w-5 h-5 rounded-md bg-white/80 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

export default StageSelector;
