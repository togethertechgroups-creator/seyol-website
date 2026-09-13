'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  Sparkles, 
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
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Entry Points for First-Time Visitors</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          Most Parents Start Here
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          If you feel overwhelmed by choices, these four flagship programmes represent the most trusted starting points for over 4,500+ SEYOL families.
        </p>
      </div>

      {/* Grid of Starter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {STARTER_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-3xl bg-white border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm hover:shadow-warm-lg ${
              pkg.isPopular
                ? 'border-gold ring-2 ring-gold/40'
                : 'border-cream-border hover:border-maroon/40'
            }`}
          >
            {/* Top Pill & Stage */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>
                <span className="text-xs font-bold text-brown-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{pkg.duration}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown hover:text-maroon transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-brown-muted mt-1 leading-relaxed">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Price Row */}
              <div className="p-3.5 rounded-xl bg-cream border border-cream-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brown-muted block">Pricing Guide</span>
                  <span className="font-serif font-bold text-lg text-maroon">{pkg.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brown-muted block">Recommended Stage</span>
                  <span className="text-xs font-bold text-brown">{pkg.stage}</span>
                </div>
              </div>

              {/* Best For Box */}
              <div className="text-xs bg-cream-light p-3 rounded-xl border border-cream-border text-brown leading-relaxed">
                <strong className="text-maroon font-bold">Best For: </strong>
                <span>{pkg.bestFor}</span>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2 pt-2 text-xs text-brown">
                <div className="font-bold text-brown text-[11px] uppercase tracking-wider">What’s Included:</div>
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-cream-border/80 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => openEnquiry({ serviceTitle: pkg.title })}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all shadow-warm-sm flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Book This Programme</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>

              {pkg.serviceSlug && (
                <Link
                  href={`/services#${pkg.serviceSlug}`}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-cream hover:bg-cream-dark text-brown text-xs font-bold transition-all border border-cream-border text-center"
                >
                  View Details
                </Link>
              )}

              {pkg.classSlug && (
                <Link
                  href={`/classes#${pkg.classSlug}`}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-cream hover:bg-cream-dark text-brown text-xs font-bold transition-all border border-cream-border text-center"
                >
                  Class Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
