'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Baby, Sparkles, Flower2, CheckCircle2, ArrowRight } from 'lucide-react';
import { JourneyStage } from '../../types';
import { useVisitorJourney } from '../../context/VisitorJourneyContext';

export interface JourneySelectorProps {
  onSelectStage?: (stage: JourneyStage) => void;
}

const STAGES = [
  {
    id: 'preconception' as JourneyStage,
    title: 'Trying to Conceive',
    weeks: 'Preconception',
    icon: Flower2,
    description: 'Siddha herbal nourishment, fertility doula guidance & uterine tonification.',
    badge: 'Holistic Prep',
  },
  {
    id: 'pregnancy' as JourneyStage,
    title: 'Currently Pregnant',
    weeks: 'Weeks 12 to 40+',
    icon: Heart,
    description: 'Prenatal wellness, physiological birth breathing, birth doula support & confinement planning.',
    badge: '2nd & 3rd Trimester',
  },
  {
    id: 'postpartum' as JourneyStage,
    title: 'Postpartum & Confinement',
    weeks: 'Day 1 to 40 Days',
    icon: Sparkles,
    description: 'Daily Dhanwantharam oil massages, uterine involution, hot herbal Kizhi & cotton belly binding (Kattu).',
    badge: 'Mandalam Healing',
  },
  {
    id: 'newborn' as JourneyStage,
    title: 'Newborn Care & Bath',
    weeks: '0 to 6 Months',
    icon: Baby,
    description: 'Gentle Thokkanam infant bodywork, soap-free Nalangu Maavu baths & colic relief techniques.',
    badge: 'Infant Bodywork',
  },
];

export const JourneySelector: React.FC<JourneySelectorProps> = ({ onSelectStage }) => {
  const { stage, setStage } = useVisitorJourney();

  const handleSelect = (selectedId: JourneyStage) => {
    setStage(selectedId);
    onSelectStage?.(selectedId);
  };

  return (
    <div className="w-full space-y-6">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full items-stretch"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {STAGES.map((s) => {
          const Icon = s.icon;
          const isSelected = stage === s.id;
          return (
            <motion.button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`relative p-6 sm:p-7 rounded-3xl border-2 text-left flex flex-col justify-between overflow-hidden shadow-warm-md transition-shadow duration-300 min-h-[210px] ${
                isSelected
                  ? 'border-maroon shadow-warm-lg ring-4 ring-maroon/15'
                  : 'bg-cream-light border-cream-border hover:border-gold/60 hover:shadow-warm-lg'
              }`}
            >
              {/* Sliding Pill Background Animation */}
              {isSelected && (
                <motion.div
                  layoutId="activeJourneyHighlight"
                  className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-brown rounded-3xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Card Content Layer */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-gold text-maroon-dark shadow-warm-sm scale-110 ring-2 ring-gold/40'
                        : 'bg-cream text-maroon border border-cream-border'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {isSelected ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-light" />
                      <span>Active</span>
                    </motion.div>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/15 px-2.5 py-1 rounded-full border border-gold/30">
                      {s.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-1">
                  <h3
                    className={`font-serif font-bold text-base sm:text-lg leading-snug transition-colors ${
                      isSelected ? 'text-cream-light' : 'text-brown'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <div className={`text-[11px] font-semibold ${isSelected ? 'text-gold-light' : 'text-maroon'}`}>
                    {s.weeks}
                  </div>
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 transition-colors ${
                      isSelected ? 'text-cream-light/85' : 'text-brown-muted'
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-cream-border/30 mt-4 flex items-center justify-between text-xs font-bold">
                <span className={isSelected ? 'text-gold-light' : 'text-maroon'}>
                  {isSelected ? 'Selected Journey Stage' : 'Select Stage'}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-gold-light' : 'text-maroon opacity-60'
                  }`}
                />
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
