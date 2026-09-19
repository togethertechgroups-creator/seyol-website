'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Users, 
  Heart,
  Flower2,
  Calendar,
  Baby
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

interface StarterPackage {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  stage: string;
  duration: string;
  price: string;
  image: string;
  bestFor: string;
  features: string[];
  serviceSlug?: string;
  classSlug?: string;
  isPopular?: boolean;
}

const STARTER_PACKAGES: StarterPackage[] = [
  {
    id: 'starter-postpartum-combo',
    badge: '★ #1 Most Booked by First-Time Mothers',
    badgeColor: 'bg-gold text-maroon-dark',
    title: 'Mother & Baby 10-Day Sanctuary Combo',
    subtitle: 'Full maternal recovery massage, cotton belly binding, herbal Kizhi, plus daily infant massage & bathing.',
    stage: 'Postpartum & Newborn (Days 1–40)',
    duration: '2.5 Hours Daily (10 Sessions)',
    price: '₹36,000 / 10-Day Care',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
    bestFor: 'New mothers wanting complete dual care for both their body recovery and baby’s daily hygienic bath routine.',
    features: [
      'Daily 90-min full-body maternal massage & uterine involution strokes',
      'Daily warm herbal Kizhi fomentation & firm cotton belly binding',
      'Daily traditional infant mustard/almond oil massage & warm water bath',
      'Lactation positioning & colic burping guidance'
    ],
    serviceSlug: 'mother-and-baby-care-combo',
    isPopular: true,
  },
  {
    id: 'starter-newborn-bath',
    badge: 'Gentlest Start for Little Ones',
    badgeColor: 'bg-maroon text-cream-light',
    title: 'Infant Bath & Gentle Bodywork Care',
    subtitle: 'Nurturing, hygienic newborn bathing, traditional baby massage strokes, and umbilical cord care.',
    stage: 'Newborn (0–6 Months)',
    duration: '60 Mins Daily (7 or 14 Sessions)',
    price: 'From ₹15,400 / 7 Sessions',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    bestFor: 'Parents nervous about handling slippery newborns or needing expert daily routine support for gas and sleep.',
    features: [
      'AYUSH herbal almond oil massage to improve circulation & sleep',
      'Traditional warm water bucket bath (Vethu Thanni)',
      'Hygienic cord healing & skin fold rash prevention',
      'Hands-on coaching so parents master safe bathing techniques'
    ],
    serviceSlug: 'infant-massage-and-bath',
    isPopular: false,
  },
  {
    id: 'starter-prenatal-doula',
    badge: 'Empowered, Fearless Birth',
    badgeColor: 'bg-[#2a060d] text-gold-light',
    title: 'Birth Doula & Labour Preparation',
    subtitle: 'Continuous physical and emotional birth companionship from 28 weeks through hospital delivery.',
    stage: 'Pregnancy (Trimester 2 & 3)',
    duration: '3 Prenatal Visits + Continuous Labour Support',
    price: '₹35,000 Complete Care',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    bestFor: 'Couples wanting a certified advocate for physiological birth, breathing coaching, and partner alignment.',
    features: [
      '2x in-person prenatal birth planning & biomechanics sessions',
      '24/7 on-call birth support starting from 37 weeks',
      'Continuous hands-on labour massage, counterpressure & breathing cues',
      'Immediate golden hour & breastfeeding latch assistance'
    ],
    serviceSlug: 'birth-doula-support',
    isPopular: false,
  },
  {
    id: 'starter-childbirth-class',
    badge: 'Weekend Masterclass Series',
    badgeColor: 'bg-maroon-soft text-maroon',
    title: 'Comprehensive Childbirth & Newborn Prep',
    subtitle: 'Evidence-based live masterclass taught by certified childbirth educators and senior doulas.',
    stage: 'Pregnancy (Weeks 20–34)',
    duration: '2x 3-Hour Interactive Live Sessions',
    price: '₹4,999 / Couple Pass',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
    bestFor: 'First-time expectant parents who want clear, interactive knowledge without hospital medical jargon.',
    features: [
      'Stages of labour, natural pain coping & epidural understanding',
      'Hands-on partner massage techniques & pelvic opening positions',
      'Newborn burping, swaddling & first 48-hour care roadmap',
      'Includes printable checklists & video library access'
    ],
    classSlug: 'childbirth-preparation-masterclass',
    isPopular: false,
  },
];

export const MostParentsStartHere: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          Most Parents{' '}
          <span className="font-serif italic font-normal text-maroon">
            Start Here
          </span>
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          If you feel overwhelmed by choices, these four flagship programmes represent the most trusted starting points for over 4,500+ SEYOL families.
        </p>
      </div>

      {/* Grid of Starter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
        {STARTER_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`group relative rounded-3xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_6px_25px_rgba(58,29,29,0.06)] hover:shadow-[0_20px_45px_rgba(123,17,49,0.13)] hover:-translate-y-1 ${
              pkg.isPopular
                ? 'border-gold ring-2 ring-gold/40'
                : 'border-cream-border/90 hover:border-gold/60'
            }`}
          >
            {/* Top Image Banner with Floating Badges */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#2D0B12]">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

              {/* Floating Badge (Only #1 First Card) */}
              {pkg.isPopular && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-gold text-maroon-dark shadow-md">
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Floating Duration with Glassmorphism */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 text-gold-light" />
                  <span>{pkg.duration}</span>
                </span>
              </div>

              {/* Floating Recommended Stage */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10.5px] font-bold tracking-wide text-cream-light bg-[#5C1D24]/85 backdrop-blur-md border border-white/15 shadow-sm">
                  {pkg.stage}
                </span>
              </div>
            </div>

            {/* Compact Card Content Body */}
            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-brown group-hover:text-maroon transition-colors line-clamp-1">
                  {pkg.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-brown-muted line-clamp-2 leading-relaxed">
                  {pkg.subtitle}
                </p>

                {/* Curated Highlights (2 essential features) */}
                <div className="space-y-1.5 pt-1 text-xs text-neutral-700">
                  {pkg.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span className="truncate leading-tight font-medium text-brown/90">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 mt-1 border-t border-neutral-100 flex items-center gap-2.5">
                <button
                  onClick={() => openEnquiry({ serviceTitle: pkg.title })}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all shadow-warm-xs flex items-center justify-center space-x-1.5 cursor-pointer shimmer-button"
                >
                  <span>Book This Programme</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                </button>

                {pkg.serviceSlug && (
                  <Link
                    href={`/services#${pkg.serviceSlug}`}
                    className="py-2.5 px-4 rounded-xl bg-cream hover:bg-cream-dark text-brown text-xs font-bold transition-all border border-cream-border text-center shrink-0 hover:border-maroon/30"
                  >
                    View Details
                  </Link>
                )}

                {pkg.classSlug && (
                  <Link
                    href={`/classes#${pkg.classSlug}`}
                    className="py-2.5 px-4 rounded-xl bg-cream hover:bg-cream-dark text-brown text-xs font-bold transition-all border border-cream-border text-center shrink-0 hover:border-maroon/30"
                  >
                    Class Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
