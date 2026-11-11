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

interface RecommendationPath {
  stageName: string;
  headline: string;
  summary: string;
  service: {
    badge: string;
    title: string;
    desc: string;
    href: string;
    ctaText: string;
  };
  classItem: {
    badge: string;
    title: string;
    desc: string;
    href: string;
    ctaText: string;
  };
  product: {
    badge: string;
    title: string;
    desc: string;
    href: string;
    ctaText: string;
  };
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
    headline: 'Preconception Care & Uterine Vitality',
    summary: 'Prepare your womb, harmonize your reproductive cycle, and nourish mind-body alignment with traditional Siddha & Ayurvedic preconception therapies.',
    service: {
      badge: 'CLINICAL SERVICE',
      title: 'Preconception Support & Uterine Wellness',
      desc: 'Pelvic basin tonification, warm herbal Kizhi fomentation, and restorative botanical bodywork for reproductive vitality.',
      href: '/services/preconception-support',
      ctaText: 'View Service Details',
    },
    classItem: {
      badge: 'PARENT EDUCATION',
      title: 'Pregnancy to Postpartum Traditional Nourishment',
      desc: 'Master ancient healing food preparations, herbal tonics, and uterine strengthening nutrition.',
      href: '/classes/pregnancy-to-postpartum-traditional-nourishment',
      ctaText: 'Explore Workshop',
    },
    product: {
      badge: 'HERBAL ESSENTIAL',
      title: 'Restorative Mother Massage Oil',
      desc: 'Cold-pressed sesame, wild turmeric, and traditional herbal infusions to warm and strengthen abdominal tissue.',
      href: '/products',
      ctaText: 'Shop Formulation',
    },
  },
  pregnant: {
    stageName: 'Currently Pregnant',
    headline: 'Pregnancy Comfort & Maternal Equilibrium',
    summary: 'Alleviate lumbar strain, sciatic ache, and fluid retention while strengthening maternal pelvic mobility through evidence-informed prenatal care.',
    service: {
      badge: 'CLINICAL SERVICE',
      title: 'Prenatal Massage Therapy',
      desc: 'Gentle, safe, side-lying clinical massage specifically calibrated for second and third trimester postural comfort.',
      href: '/services/prenatal-massage-therapy',
      ctaText: 'View Prenatal Massage',
    },
    classItem: {
      badge: 'PARENT EDUCATION',
      title: 'Prenatal Movement & Pelvic Comfort',
      desc: 'Learn therapeutic pelvic alignment, gentle yoga stretches, and partner counterpressure methods for deep relief.',
      href: '/classes/prenatal-movement-and-pelvic-comfort',
      ctaText: 'Explore Movement Class',
    },
    product: {
      badge: 'HERBAL ESSENTIAL',
      title: 'Maternal Body Comfort & Belly Oil',
      desc: 'Nourishing botanical blend designed to improve skin elasticity, prevent stretch strain, and soothe tired ligaments.',
      href: '/products',
      ctaText: 'Shop Body Oil',
    },
  },
  birth: {
    stageName: 'Preparing for Birth',
    headline: 'Physiological Birth & Partner Labour Support',
    summary: 'Enter your birthing room with calmness, physiological mastery, and continuous advocate support tailored to your birth sanctuary.',
    service: {
      badge: 'CLINICAL SERVICE',
      title: 'Birth Doula Support',
      desc: 'Continuous one-on-one advocacy, active labour positioning, partner counterpressure, and hospital sanctuary guidance.',
      href: '/services/birth-doula-support',
      ctaText: 'View Doula Support',
    },
    classItem: {
      badge: 'PARENT EDUCATION',
      title: 'Preparing for Birth with SEYOL',
      desc: 'Hands-on labour breathing rhythms, hospital procedure clarity, partner coaching, and physiological birth masterclass.',
      href: '/classes/preparing-for-birth-with-seyol',
      ctaText: 'Explore Birth Workshop',
    },
    product: {
      badge: 'RESOURCE BUNDLE',
      title: 'Hospital Bag & Birth Sanctuary Checklist',
      desc: 'A comprehensive checklist for labour comfort, hospital documentation, and seamless postpartum home return.',
      href: '/resources',
      ctaText: 'Download Checklist',
    },
  },
  delivered: {
    stageName: 'Already Delivered',
    headline: 'Sacred 40-Day Postpartum Healing & Infant Bathing',
    summary: 'Honour the sacred fourth trimester with traditional belly binding (Kattu), hot herbal bath fomentation, and Ayurvedic infant bodywork.',
    service: {
      badge: 'CLINICAL SERVICE',
      title: 'Postpartum Massage & Bengkung Wrap',
      desc: 'Traditional 10-to-60 session recovery packages featuring full-body herbal oil massage, uterine tucking, and tight belly binding.',
      href: '/services/postpartum-massage-and-wrap',
      ctaText: 'View Postpartum Packages',
    },
    classItem: {
      badge: 'PARENT EDUCATION',
      title: 'Traditional Baby Massage & Bath Workshop',
      desc: 'Hands-on training for parents in traditional Indian infant bodywork, colic relief strokes, and safe warm water bathing holds.',
      href: '/classes/traditional-baby-massage-and-bath-workshop',
      ctaText: 'Explore Infant Workshop',
    },
    product: {
      badge: 'HERBAL ESSENTIAL',
      title: 'Traditional Vethu Kuli Bath Sachets & Baby Oil',
      desc: 'Authentic South Indian herbal bath sachets for joint healing alongside pure cold-pressed baby massage oil.',
      href: '/products',
      ctaText: 'Shop Postpartum Care',
    },
  },
  caregiver: {
    stageName: 'Become a SEYOL Caregiver',
    headline: 'Accredited Caregiver Training & Employment Agency Standards',
    summary: 'Join Singapore and India’s premier mother & infant care network with licensed Ministry of Manpower (EA) accredited professional pathways.',
    service: {
      badge: 'CAREER PATHWAY',
      title: 'Certified Doula & Confinement Training',
      desc: 'Comprehensive clinical doula and confinement nanny certification program combining traditional care with safety standards.',
      href: '/careers',
      ctaText: 'Explore Training Pathways',
    },
    classItem: {
      badge: 'PRACTICAL ACCREDITATION',
      title: 'Postpartum Care Specialist Certification',
      desc: 'Master the sacred 40-day care rituals, traditional belly binding, herbal nutrition, and gentle newborn bathing techniques.',
      href: '/careers/practical-confinement-care',
      ctaText: 'View Specialist Course',
    },
    product: {
      badge: 'PROFESSIONAL NETWORK',
      title: 'Join SEYOL Certified Network',
      desc: 'Become a placement-ready caregiver with licensed employment agency support, ethical contracts, and continuous mentoring.',
      href: '/careers/apply',
      ctaText: 'Apply as Caregiver',
    },
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

          {/* 3 Core Pillar Recommendations Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. Clinical Service */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD0] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <h4 className="font-heading text-lg font-bold text-neutral-900 leading-snug">
                  {activeRecommendation.service.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeRecommendation.service.desc}
                </p>
              </div>

              <div className="pt-5">
                <Link
                  href={activeRecommendation.service.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#7B1131] hover:text-white font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>{activeRecommendation.service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Education & Workshop */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD0] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <h4 className="font-heading text-lg font-bold text-neutral-900 leading-snug">
                  {activeRecommendation.classItem.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeRecommendation.classItem.desc}
                </p>
              </div>

              <div className="pt-5">
                <Link
                  href={activeRecommendation.classItem.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#7B1131] hover:text-white font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>{activeRecommendation.classItem.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Herbal Formulation / Resource */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD0] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <h4 className="font-heading text-lg font-bold text-neutral-900 leading-snug">
                  {activeRecommendation.product.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeRecommendation.product.desc}
                </p>
              </div>

              <div className="pt-5">
                <Link
                  href={activeRecommendation.product.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#7B1131] text-[#7B1131] hover:text-white font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>{activeRecommendation.product.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

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

