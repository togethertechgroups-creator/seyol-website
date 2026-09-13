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
  Sparkles,
  ChevronRight,
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
              className={`group relative p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#7B1131] shadow-[0_12px_32px_rgba(0,0,0,0.22)] scale-[1.03] border-2 border-gold ring-2 ring-gold/40 z-10'
                  : 'bg-white/10 hover:bg-white/20 text-cream-light border border-white/20 backdrop-blur-md hover:scale-[1.01]'
              }`}
            >
              {/* Top active indicator pin */}
              {isSelected && (
                <div className="absolute -top-1.5 w-3 h-3 bg-gold rounded-full shadow-gold-glow animate-pulse" />
              )}

              {/* Icon Container */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-110 ${
                  isSelected
                    ? 'bg-[#7B1131]/10 text-[#7B1131]'
                    : 'bg-white/15 text-gold-light'
                }`}
              >
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>

              {/* Stage Title */}
              <div
                className={`font-bold text-xs sm:text-[13px] leading-tight mb-1 ${
                  isSelected ? 'text-[#7B1131]' : 'text-white'
                }`}
              >
                {st.title}
              </div>

              {/* Subtitle */}
              <div
                className={`text-[10px] sm:text-[11px] font-medium leading-tight ${
                  isSelected ? 'text-[#7B1131]/75' : 'text-cream-light/70'
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
        <div className="bg-[#FAF6EE] rounded-3xl sm:rounded-[36px] p-5 sm:p-8 border border-gold/30 shadow-warm-xl space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-border/60">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#7B1131] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>Tailored Pathway for {activePath.stageName}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-brown">
                Your Suggested Care Path
              </h3>
            </div>

            <button
              onClick={() => openEnquiry({ serviceTitle: activePath.stageName })}
              className="px-4 py-2 rounded-full bg-[#7B1131] hover:bg-[#650E28] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              Consult Matron &rarr;
            </button>
          </div>

          {/* 3 Care Path Cards (Service, Class, Product) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
            >
              {/* Card 1: SERVICE */}
              <div className="bg-white rounded-2xl p-5 border border-cream-border hover:border-gold/60 shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#7B1131] bg-[#7B1131]/10 px-2.5 py-0.5 rounded-full">
                    {activePath.service.badge}
                  </span>
                  <h4 className="font-serif text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug">
                    {activePath.service.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed">
                    {activePath.service.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <Link
                    href={activePath.service.href}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#7B1131] hover:text-[#650E28] transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Card 2: CLASS */}
              <div className="bg-white rounded-2xl p-5 border border-cream-border hover:border-gold/60 shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-gold-dark bg-gold/20 px-2.5 py-0.5 rounded-full">
                    {activePath.classItem.badge}
                  </span>
                  <h4 className="font-serif text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug">
                    {activePath.classItem.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed">
                    {activePath.classItem.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <Link
                    href={activePath.classItem.href}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#7B1131] hover:text-[#650E28] transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Card 3: PRODUCT */}
              <div className="bg-white rounded-2xl p-5 border border-cream-border hover:border-gold/60 shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brown bg-brown/10 px-2.5 py-0.5 rounded-full">
                    {activePath.product.badge}
                  </span>
                  <h4 className="font-serif text-base font-bold text-brown group-hover:text-[#7B1131] transition-colors leading-snug">
                    {activePath.product.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed">
                    {activePath.product.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <Link
                    href={activePath.product.href}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#7B1131] hover:text-[#650E28] transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
