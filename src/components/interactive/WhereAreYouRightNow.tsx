'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { useFifteenMinuteCall } from '../../context/FifteenMinuteCallContext';

export type StageId = 
  | 'planning' 
  | 'pregnant' 
  | 'birth' 
  | 'delivered' 
  | 'caregiver';

interface StageCardData {
  id: StageId;
  stepNumber: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

interface StageItem {
  title: string;
  desc: string;
  href: string;
  ctaText: string;
}

interface RecommendationPath {
  stageName: string;
  headline: string;
  summary: string;
  items: StageItem[];
}

const STAGES: StageCardData[] = [
  {
    id: 'planning',
    stepNumber: '01',
    title: 'Planning for Pregnancy',
    subtitle: 'Preconception tonification & fertility wellness',
    image: '/assets4/preconception-support.jpeg',
    badge: 'Preconception',
  },
  {
    id: 'pregnant',
    stepNumber: '02',
    title: 'Currently Pregnant',
    subtitle: 'Trimester comfort, movement & tension relief',
    image: '/assets4/prenatal-massage.jpg',
    badge: 'Pregnancy',
  },
  {
    id: 'birth',
    stepNumber: '03',
    title: 'Preparing for Birth',
    subtitle: 'Labour advocacy, partner coaching & sanctuary prep',
    image: '/assets4/birth-doula-support.jpg',
    badge: 'Birth Prep',
  },
  {
    id: 'delivered',
    stepNumber: '04',
    title: 'Already Delivered',
    subtitle: 'Sacred 40-day postpartum healing & baby bodywork',
    image: '/assets4/postpartum-massage-wrap.jpg',
    badge: 'Postpartum',
  },
  {
    id: 'caregiver',
    stepNumber: '05',
    title: 'Become a SEYOL Caregiver',
    subtitle: 'Accredited doula training & EA career placement',
    image: '/assets4/careers_training_hero.jpg',
    badge: 'Care Careers',
  },
];

const RECOMMENDATIONS: Record<StageId, RecommendationPath> = {
  planning: {
    stageName: 'Planning for Pregnancy',
    headline: 'Preconception Care & Reproductive Wellness',
    summary: 'A holistic preconception programme combining traditional women’s wellness practices with evidence-based fertility guidance, menstrual cycle awareness, and emotional grounding.',
    items: [
      {
        title: 'Preconception Support',
        desc: 'A holistic preconception programme combining traditional women’s wellness practices with evidence-based fertility guidance, menstrual cycle awareness, and emotional grounding.',
        href: '/services/preconception-support',
        ctaText: 'Explore Preconception Support',
      },
    ],
  },
  pregnant: {
    stageName: 'Currently Pregnant',
    headline: 'Pregnancy Comfort & Maternal Equilibrium',
    summary: 'Alleviate lumbar strain, sciatic ache, and fluid retention while preparing your body and mind for birth through evidence-informed prenatal care.',
    items: [
      {
        title: 'Prenatal Massage',
        desc: 'Gentle, safe, side-lying clinical massage specifically calibrated for second and third trimester postural comfort and fluid drainage.',
        href: '/services/prenatal-massage-therapy',
        ctaText: 'View Prenatal Massage',
      },
      {
        title: 'Newborn Care Essentials',
        desc: 'Comprehensive newborn care class covering soothing, swaddling, bathing, diapering, and essential parenting rhythms.',
        href: '/classes/newborn-care-essentials-for-modern-parents',
        ctaText: 'Explore Class',
      },
      {
        title: 'Traditional Baby Massage & Bath Workshop',
        desc: 'Hands-on training for parents in traditional Indian infant bodywork, colic relief strokes, and safe warm water bathing holds.',
        href: '/classes/traditional-baby-massage-and-bath-workshop',
        ctaText: 'Explore Workshop',
      },
      {
        title: 'Postpartum & Confinement Preparation',
        desc: 'Master sacred fourth-trimester healing, Ayurvedic confinement nutrition, maternal restorative rest, and newborn bonding.',
        href: '/classes/postpartum-and-confinement-preparation',
        ctaText: 'Explore Class',
      },
      {
        title: 'Breastfeeding & Bottle Feeding Basics',
        desc: 'Master pain-free latching, colostrum harvesting, milk supply establishment, and balanced bottle feeding routines.',
        href: '/classes/breastfeeding-and-bottle-feeding-basics',
        ctaText: 'Explore Class',
      },
      {
        title: 'Prenatal Movement & Comfort',
        desc: 'Learn therapeutic pelvic alignment, gentle yoga stretches, and partner counterpressure methods for deep relief.',
        href: '/classes/prenatal-movement-and-pelvic-comfort',
        ctaText: 'Explore Class',
      },
      {
        title: 'Pregnancy to Postpartum Nourishment',
        desc: 'Master ancient healing food preparations, herbal tonics, and uterine strengthening nutrition for pregnancy and recovery.',
        href: '/classes/pregnancy-to-postpartum-traditional-nourishment',
        ctaText: 'Explore Workshop',
      },
      {
        title: 'Partner & Family Preparation',
        desc: 'Empowering partners and grandparents with practical newborn handling, caregiving roles, and family communication rhythms.',
        href: '/classes/partner-and-family-preparation-for-baby',
        ctaText: 'Explore Class',
      },
      {
        title: 'Everyday Baby Care Essentials',
        desc: 'Thoughtful cold-pressed oils, gentle herbal cleansers, and soothing essentials for your baby’s everyday care routine.',
        href: '/products',
        ctaText: 'Shop Baby Essentials',
      },
      {
        title: 'Pregnancy Preparation Guide',
        desc: 'A clinician-vetted downloadable guide with helpful information, hospital prep, and practical guidance for your next chapter.',
        href: '/resources/pregnancy-comfort-and-movement-bundle',
        ctaText: 'Explore Guide',
      },
    ],
  },
  birth: {
    stageName: 'Preparing for Birth',
    headline: 'Physiological Birth & Partner Labour Support',
    summary: 'Enter your birthing room with calmness, physiological mastery, and continuous advocate support tailored to your birth sanctuary.',
    items: [
      {
        title: 'Birth Support',
        desc: 'Dedicated birth companion providing continuous one-on-one labour advocacy, active labour positioning, partner coaching, and physiological birth positions.',
        href: '/services/birth-doula-support',
        ctaText: 'View Doula Support',
      },
      {
        title: 'Preparing for Birth with SEYOL',
        desc: 'Hands-on labour breathing rhythms, hospital procedure clarity, partner coaching, and physiological birth masterclass.',
        href: '/classes/preparing-for-birth-with-seyol',
        ctaText: 'Explore Birth Workshop',
      },
    ],
  },
  delivered: {
    stageName: 'Already Delivered',
    headline: 'Sacred 40-Day Postpartum Healing & Infant Bathing',
    summary: 'Honour the sacred fourth trimester with traditional belly binding (Kattu), hot herbal bath fomentation, and expert infant bodywork.',
    items: [
      {
        title: 'Infant Massage and Bath',
        desc: 'Expert newborn bodywork, rhythmic stroke sequences, and calming traditional bath routines administered by compassionate pediatric nurses.',
        href: '/services/infant-massage-and-bath',
        ctaText: 'View Service',
      },
      {
        title: 'Postpartum Massage and Wrap',
        desc: 'Traditional in-home recovery packages featuring full-body herbal oil massage, uterine tonification, hot herbal Kizhi fomentation, and cotton belly binding.',
        href: '/services/postpartum-massage-and-wrap',
        ctaText: 'View Postpartum Packages',
      },
      {
        title: 'Stay-In Confinement Nanny',
        desc: 'Experienced, vetted confinement nannies providing 24/7 round-the-clock newborn handling, mother recovery support, and confinement meals.',
        href: '/services/stay-in-confinement-nanny-support',
        ctaText: 'View Confinement Nanny',
      },
      {
        title: 'Lactation & Feeding Support',
        desc: 'Personalised one-to-one clinical guidance for pain-free latching, engorgement relief, milk supply optimization, and gentle feeding rhythms.',
        href: '/services/lactation-and-breastfeeding-support',
        ctaText: 'View Lactation Care',
      },
      {
        title: 'Mother and Baby Combo',
        desc: 'Synchronised dual care session providing maternal recovery bodywork alongside soothing newborn massage and traditional bath.',
        href: '/services/mother-and-baby-combo-packages',
        ctaText: 'View Dual Packages',
      },
      {
        title: 'Hourly Newborn Support',
        desc: 'Flexible, book-by-the-hour infant care, hands-on feeding help, calming routines, and restful respite for recovering parents.',
        href: '/services/hourly-newborn-support',
        ctaText: 'View Hourly Care',
      },
      {
        title: 'Traditional Baby Massage & Bath Workshop',
        desc: 'Hands-on training in traditional Indian infant bodywork, colic relief strokes, and safe warm water bathing holds.',
        href: '/classes/traditional-baby-massage-and-bath-workshop',
        ctaText: 'Explore Workshop',
      },
      {
        title: 'Breastfeeding & Bottle Feeding Basics',
        desc: 'Master pain-free latching, colostrum harvesting, milk supply establishment, and balanced bottle feeding routines.',
        href: '/classes/breastfeeding-and-bottle-feeding-basics',
        ctaText: 'Explore Class',
      },
      {
        title: 'Partner & Family Preparation',
        desc: 'Empowering partners and grandparents with practical newborn handling, caregiving roles, and family communication rhythms.',
        href: '/classes/partner-and-family-preparation-for-baby',
        ctaText: 'Explore Class',
      },
      {
        title: 'All Products',
        desc: 'Handcrafted Ayurvedic & Siddha formulations, cold-pressed oils, herbal bath sachets, and curated care bundles.',
        href: '/products',
        ctaText: 'Browse All Products',
      },
      {
        title: 'Newborn Care Checklist',
        desc: 'A practical, clinician-vetted checklist to help prepare for your baby’s first days, feeding routines, and diapering essentials.',
        href: '/resources/essential-indian-hospital-bag-checklist',
        ctaText: 'Download Checklist',
      },
      {
        title: 'Baby Massage Basics',
        desc: 'Step-by-step guidance on gentle newborn massage strokes, colic relief movements, and calming bath-time routines.',
        href: '/resources/traditional-infant-massage-video-library',
        ctaText: 'Explore Guide',
      },
      {
        title: 'Postpartum Self-Care Guide',
        desc: 'A comprehensive recovery guide covering physical healing, emotional wellbeing, warm herbal nutrition, and gentle rest.',
        href: '/resources/the-sacred-40-days-confinement-guide',
        ctaText: 'Download Guide',
      },
      {
        title: 'Newborn Handling Essentials',
        desc: 'Practical techniques for safe head support, ergonomic carrying, burping positions, and calming fussy newborns.',
        href: '/resources/newborn-care-starter-bundle',
        ctaText: 'Explore Guide',
      },
    ],
  },
  caregiver: {
    stageName: 'Become a SEYOL Caregiver',
    headline: 'Accredited Caregiver Training & Employment Agency Standards',
    summary: 'Join Singapore and India’s premier mother & infant care network with licensed Ministry of Manpower (EA) accredited professional pathways.',
    items: [
      {
        title: 'Careers & Training',
        desc: 'Accredited caregiver training pathways, certified doula and confinement nanny certifications, and professional career placement.',
        href: '/careers',
        ctaText: 'Explore Careers & Training',
      },
    ],
  },
};

export const WhereAreYouRightNow: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<StageId>('delivered');
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const { openCallBooking } = useFifteenMinuteCall();

  const handleSelectStage = (id: StageId) => {
    setSelectedStage(id);

    // Smoothly scroll down to the recommendations container
    setTimeout(() => {
      recommendationsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 60);
  };

  const activeRecommendation = RECOMMENDATIONS[selectedStage];

  return (
    <section id="where-are-you" className="w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-heading font-bold tracking-widest uppercase">
          Where Are You Right Now?
        </span>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          Select Your Current Stage
        </h2>

        <p className="text-sm sm:text-base text-cream-light/90 font-sans max-w-2xl mx-auto leading-relaxed">
          Tap any of the five stages below to instantly reveal tailored clinical services, workshops, and traditional care paths designed specifically for you.
        </p>
      </div>

      {/* ── 5 Stage Image-Based Cards Grid (Uniform Dimensions & Baseline Alignment) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
        {STAGES.map((stage) => {
          const isSelected = selectedStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => handleSelectStage(stage.id)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] min-h-[300px] sm:min-h-[330px] lg:min-h-[350px] w-full text-left transition-all duration-200 flex flex-col justify-end p-4 sm:p-5 cursor-pointer shadow-warm-lg ${
                isSelected
                  ? 'border-2 border-white ring-2 ring-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.45)] z-10'
                  : 'border-2 border-white/20 hover:border-white/60 opacity-90 hover:opacity-100 z-0'
              }`}
            >
              {/* Background High-Quality Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Multi-stop High-Contrast Gradient Overlay for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 z-[1]" />
              </div>

              {/* Selected Badge (Text only, absolutely positioned so it never affects layout) */}
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#7B1131] text-white text-[10.5px] font-heading font-bold border border-white/40 shadow-xs">
                    Selected
                  </span>
                </div>
              )}

              {/* Card Bottom: Typography & Summary (Consistent Vertical Alignment) */}
              <div className="relative z-10 w-full flex flex-col justify-end">
                <h3 className="font-heading text-lg sm:text-[18px] lg:text-[17px] xl:text-[18px] font-extrabold text-white leading-snug drop-shadow-md min-h-[44px] flex items-end">
                  {stage.title}
                </h3>

                <p className="text-xs text-cream-light/85 leading-snug line-clamp-2 pt-1.5 min-h-[36px]">
                  {stage.subtitle}
                </p>

                <div className="pt-3 text-[11px] font-bold text-white group-hover:text-gold-light transition-colors">
                  <span>View Care Path</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Dynamic Suggested Care Path Recommendations Section ── */}
      <div
        ref={recommendationsRef}
        id="care-path-recommendations"
        className="mt-12 sm:mt-16 scroll-mt-24 animate-fadeIn"
      >
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8DFD0] shadow-warm-xl text-neutral-900 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DFD0]">
            <div className="space-y-1.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF5F7] border border-[#E8D7DC] text-[#7B1131] text-xs font-heading font-extrabold uppercase tracking-wider">
                Suggested Care Path • {activeRecommendation.stageName}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7B1131] tracking-tight">
                {activeRecommendation.headline}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 max-w-2xl leading-relaxed">
                {activeRecommendation.summary}
              </p>
            </div>

            {/* Quick 15-Minute Consultation Trigger */}
            <button
              onClick={() => openCallBooking()}
              className="px-5 py-3 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Clock className="w-4 h-4 text-white" />
              <span>Book a 15-Minute Call</span>
            </button>
          </div>

          {/* Journey Stage Recommendations Grid */}
          <div
            className={`grid grid-cols-1 ${
              activeRecommendation.items.length === 1
                ? 'max-w-md mx-auto sm:max-w-lg'
                : activeRecommendation.items.length === 2
                  ? 'sm:grid-cols-2 max-w-3xl mx-auto'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
            } gap-5`}
          >
            {activeRecommendation.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD0] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="space-y-2.5">
                  <h4 className="font-heading text-lg font-bold text-neutral-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5">
                  <Link
                    href={item.href}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#7B1131] hover:text-white font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Supportive Help Footer Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 border-t border-[#E8DFD0]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7B1131]" />
              <span>Evidence-informed clinical oversight vetted by certified matrons &amp; doulas.</span>
            </div>

            <button
              onClick={() => openCallBooking()}
              className="text-[#7B1131] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Not sure what support is right for you?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default WhereAreYouRightNow;

