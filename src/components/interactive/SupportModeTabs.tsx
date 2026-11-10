'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { 
  Flower2, 
  GraduationCap, 
  Clock, 
  Award, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  PhoneCall,
  MessageSquare,
  ArrowDownCircle,
  ExternalLink
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

// Import authentic images from assets
import infantMassageImg from '../../assets4/baby massage.JPG';
import babyMassageCopyImg from '../../assets4/baby massage copy.JPG';
import postpartumWrapImg from '../../assets4/Postpartum Massage & Wrap.JPG';
import birthDoulaImg from '../../assets4/Birth Doula Support.JPG';
import motherBabyImg from '../../assets4/mother and baby.jpg';
import birthPrepImg from '../../assets4/preganancy care .jpg';
import newbornCareImg from '../../assets4/new born baby care.jpg';
import confinementPrepImg from '../../assets4/Parenting Classes.JPEG';
import careerHeroImg from '../../assets4/career hero section.JPG';
import locationImg from '../../assets4/location.JPEG';
import storiesImg from '../../assets4/stories image.jpg';
import coFounderImg from '../../assets4/co founder.png';
import consultationImg from '../../assets4/Care Guidance Consultation.JPG';
import wellnessProductImg from '../../assets4/wellness product page.jpg';
import postpartumProductImg from '../../assets4/postpartum product page.jpg';
import babyCareProductImg from '../../assets4/baby care product page.png';

export type SupportTabId = 'care' | 'teach' | 'routine' | 'train' | 'guide';

interface CardItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  keyDetail: string;
  imgSrc: StaticImageData | string;
  linkHref: string;
  actionText: string;
  actionType?: 'link' | 'scroll' | 'enquiry';
  enquiryService?: string;
}

interface SupportCategoryConfig {
  id: SupportTabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  heroTitle: string;
  heroDesc: string;
  features: string[];
  cards: CardItem[];
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

const SUPPORT_CATEGORIES: SupportCategoryConfig[] = [
  // =========================================================================
  // 1. CARE FOR ME
  // =========================================================================
  {
    id: 'care',
    label: 'Care for me',
    sublabel: 'IN-HOME MATERNAL & NEWBORN SANCTUARY',
    icon: Flower2,
    heroTitle: 'Hands-On In-Home Sanctuary & Postpartum Care',
    heroDesc: 'Experience the healing touch of certified South Indian care matrons in the privacy and serenity of your own bedroom.',
    features: [
      'Daily in-home maternal massage & uterine involution strokes',
      'Traditional warm Kizhi herbal poultice fomentation',
      'Custom cotton belly binding (Kattu) for diastasis recti support',
      'Gentle traditional infant mustard/almond oil massage & bath'
    ],
    primaryCta: {
      text: 'Explore All Services',
      href: '/services'
    },
    cards: [
      {
        id: 'postpartum-massage-wrap',
        title: 'Postpartum Massage & Wrap',
        tag: 'Maternal Healing',
        desc: 'Sacred 40-day Mandalam recovery, hot herbal Kizhi fomentation, uterine tonification, and traditional Bengkung belly binding.',
        keyDetail: 'In-Home • 10 to 40 Days',
        imgSrc: postpartumWrapImg,
        linkHref: '/services/postpartum-massage-and-wrap',
        actionText: 'Explore Service',
        actionType: 'link',
        enquiryService: 'Postpartum Massage & Wrap'
      },
      {
        id: 'signature-infant-massage-bath',
        title: 'Signature Infant Massage & Bath',
        tag: 'Newborn Ritual',
        desc: 'Traditional Indian newborn bodywork with safe head-holding, gentle colic relief strokes, and calming warm bath rituals.',
        keyDetail: 'In-Home • From Day 7+',
        imgSrc: infantMassageImg,
        linkHref: '/services/infant-massage-and-bath',
        actionText: 'Explore Service',
        actionType: 'link',
        enquiryService: 'Signature Infant Massage & Bath'
      },
      {
        id: 'birth-doula-support',
        title: 'Birth Doula Support',
        tag: 'Continuous Advocacy',
        desc: 'Dedicated prenatal preparation, 24/7 on-call labor advocacy, physiological comfort measures, and hospital sanctuary care.',
        keyDetail: 'Virtual & Hospital Support',
        imgSrc: birthDoulaImg,
        linkHref: '/services/birth-doula-support',
        actionText: 'Explore Service',
        actionType: 'link',
        enquiryService: 'Birth Doula Support'
      },
      {
        id: 'mother-baby-combo-packages',
        title: 'Mother & Baby Combo Packages',
        tag: 'Dual Sanctuary',
        desc: 'Harmonious combined daily sessions providing restorative mother bodywork alongside soothing newborn massage and bath.',
        keyDetail: 'Complete Dual Care • 10-30 Days',
        imgSrc: motherBabyImg,
        linkHref: '/services/mother-and-baby-combo-packages',
        actionText: 'Explore Service',
        actionType: 'link',
        enquiryService: 'Mother & Baby Combo Packages'
      }
    ]
  },

  // =========================================================================
  // 2. TEACH ME
  // =========================================================================
  {
    id: 'teach',
    label: 'Teach me',
    sublabel: 'CERTIFIED CHILDBIRTH & PARENTING WORKSHOPS',
    icon: GraduationCap,
    heroTitle: 'Certified Childbirth & Newborn Masterclasses',
    heroDesc: 'Evidence-based prenatal and postnatal education that replaces fear and medical anxiety with calm, joyful confidence.',
    features: [
      'Physiological birth mechanics & natural pain coping strategies',
      'Partner hands-on coaching, counterpressure & advocacy tools',
      'Hands-on newborn bath, burping, swaddling & soothing practice',
      'Interactive small batches with live Q&A by senior doulas'
    ],
    primaryCta: {
      text: 'Explore All Classes',
      href: '/classes'
    },
    cards: [
      {
        id: 'birth-preparation-class',
        title: 'Birth Preparation Class',
        tag: 'Labour & Birth',
        desc: 'Evidence-informed labour physiology, partner counterpressure comfort techniques, breathing rhythms, and hospital sanctuary prep.',
        keyDetail: 'Couples Workshop • 3.5 Hours',
        imgSrc: birthPrepImg,
        linkHref: '/classes/preparing-for-birth-with-seyol',
        actionText: 'Explore Class',
        actionType: 'link'
      },
      {
        id: 'newborn-care-class',
        title: 'Newborn Care Class for New Parents',
        tag: 'First 100 Days',
        desc: 'Master safe handling, umbilical cord hygiene, diapering, temperature regulation, and soothing routines before baby arrives.',
        keyDetail: 'Hands-on Masterclass • 3 Hours',
        imgSrc: newbornCareImg,
        linkHref: '/classes/newborn-care-essentials-for-modern-parents',
        actionText: 'Explore Class',
        actionType: 'link'
      },
      {
        id: 'traditional-baby-massage-class',
        title: 'Traditional Baby Massage & Bath Class',
        tag: 'Hands-on Touch',
        desc: 'Learn authentic South Indian strokes (Thokkanam), oil selection, colic relief pressure points, and gentle tub bathing rituals.',
        keyDetail: 'Practical Coaching • 2.5 Hours',
        imgSrc: babyMassageCopyImg,
        linkHref: '/classes/traditional-baby-massage-and-bath-workshop',
        actionText: 'Explore Class',
        actionType: 'link'
      },
      {
        id: 'postpartum-confinement-class',
        title: 'Postpartum & Confinement Preparation Class',
        tag: 'Sacred 40 Days',
        desc: 'Prepare your home, family boundaries, nutrition (Pathiya Samayal), mental health, and physical healing roadmap for postpartum.',
        keyDetail: 'Prenatal Planning • 3 Hours',
        imgSrc: confinementPrepImg,
        linkHref: '/classes/postpartum-and-confinement-preparation',
        actionText: 'Explore Class',
        actionType: 'link'
      }
    ]
  },

  // =========================================================================
  // 3. SUPPORT MY ROUTINE
  // =========================================================================
  {
    id: 'routine',
    label: 'Support my routine',
    sublabel: 'SACRED BOTANICALS & DAILY RITUALS',
    icon: Clock,
    heroTitle: 'Sacred Herbal Bundles & Daily Routine Essentials',
    heroDesc: 'Handcrafted botanical oils, traditional bath powders, and digital vaults designed to ground your daily mother-infant wellness routine.',
    features: [
      '100% natural, AYUSH-certified cold-pressed oils & medicated botanicals',
      'Cruelty-free, chemical-free, and clinically safe for sensitive newborn skin',
      'Complete home routine bundles with step-by-step guidance manuals',
      'Formulated for mother’s uterine recovery and infant colic comfort'
    ],
    primaryCta: {
      text: 'Explore All Resources',
      href: '/resources'
    },
    secondaryCta: {
      text: 'Explore All Products',
      href: '/products'
    },
    cards: [
      {
        id: 'baby-massage-tummy-care-bundle',
        title: 'Baby Massage & Tummy Care Essentials Bundle',
        tag: 'Colic & Digestion',
        desc: 'Cold-Pressed Soothing Baby Oil paired with pure Hing & Ajwain Colic Roll-On for peaceful digestion and calm sleep.',
        keyDetail: 'Baby Oil + Tummy Roll-On',
        imgSrc: wellnessProductImg,
        linkHref: '/products/colic-relief-tummy-roll-on',
        actionText: 'Explore Bundle',
        actionType: 'link'
      },
      {
        id: 'mothers-postpartum-comfort-bundle',
        title: "Mother's Postpartum Comfort Bundle",
        tag: 'Maternal Healing',
        desc: 'Restorative Mother Massage Oil formulated with 28 classical herbs and Vethu Kuli herbal bath steeping sachets.',
        keyDetail: 'Restorative Oil + Herbal Bath Sachets',
        imgSrc: postpartumProductImg,
        linkHref: '/products/restorative-mother-postpartum-massage-oil',
        actionText: 'Explore Bundle',
        actionType: 'link'
      },
      {
        id: 'newborn-care-starter-bundle',
        title: 'Newborn Care Starter Bundle',
        tag: 'Digital Care Vault',
        desc: 'Comprehensive digital guide vault covering the first 30 days, diapering, umbilical cord hygiene, feeding logs, and crying cues.',
        keyDetail: '5 Printable & Digital Guides',
        imgSrc: babyCareProductImg,
        linkHref: '/resources#bundle-newborn-starter',
        actionText: 'Explore Bundle',
        actionType: 'link'
      },
      {
        id: 'baby-massage-bath-bundle',
        title: 'Baby Massage & Bath Bundle',
        tag: 'Bathing Ritual',
        desc: 'Traditional Nalangu Maavu micro-milled bath powder, Soothing Baby Massage Oil, and step-by-step routine guides.',
        keyDetail: 'Bath Powder + Oil + Routine Guides',
        imgSrc: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
        linkHref: '/resources#bundle-baby-massage-bath',
        actionText: 'Explore Bundle',
        actionType: 'link'
      }
    ]
  },

  // =========================================================================
  // 4. TRAIN ME
  // =========================================================================
  {
    id: 'train',
    label: 'Train me',
    sublabel: 'VOCATIONAL DOULA & CAREGIVER ACADEMY',
    icon: Award,
    heroTitle: 'SEYOL Care Academy & Professional Certifications',
    heroDesc: 'Empowering women and aspiring caregivers with gold-standard traditional South Indian postpartum techniques and modern clinical safety.',
    features: [
      'Comprehensive curriculum bridging AYUSH traditions and modern obstetrics',
      'Clinical shadowing, hands-on mannequin practice, and live case mentoring',
      'Certification recognized in Singapore, India, and Southeast Asia',
      'Direct career placement opportunities within the SEYOL network'
    ],
    primaryCta: {
      text: 'Apply Now',
      href: '/careers/apply'
    },
    secondaryCta: {
      text: 'View Career Pathways',
      href: '/careers'
    },
    cards: [
      {
        id: 'foundation-care-pathway',
        title: 'Foundation Care Training Pathway',
        tag: 'New to Care (Pathway 1)',
        desc: 'Designed for beginners entering maternal & newborn care. 6-week hybrid curriculum covering postpartum fundamentals and newborn handling.',
        keyDetail: '6 Weeks • Theory + Studio Practicum',
        imgSrc: careerHeroImg,
        linkHref: '/careers/foundation-confinement-care',
        actionText: 'Explore Pathway',
        actionType: 'link'
      },
      {
        id: 'practical-care-pathway',
        title: 'Practical Care Training Pathway',
        tag: 'Practicum (Pathway 2)',
        desc: 'For certified learners needing hands-on clinical confidence. Intensive studio bodywork, Kizhi preparation, and supervised case shadowing.',
        keyDetail: '4 Weeks • Intensive Practicum',
        imgSrc: locationImg,
        linkHref: '/careers/practical-confinement-care',
        actionText: 'Explore Pathway',
        actionType: 'link'
      },
      {
        id: 'experienced-care-pathway',
        title: 'Experienced Care Provider Pathway',
        tag: 'Fast-Track (Pathway 3)',
        desc: 'For seasoned traditional care matrons and ayahs looking to formalize expertise with clinical certification and standard safety protocols.',
        keyDetail: 'Experience Assessment & Fast-Track',
        imgSrc: storiesImg,
        linkHref: '/careers#training-pathways',
        actionText: 'Explore Pathway',
        actionType: 'link'
      },
      {
        id: 'professional-care-pathway',
        title: 'Professional Care Provider Pathway',
        tag: 'Advanced (Pathway 4)',
        desc: 'Advanced certification for certified practitioners seeking senior doula designation, high-needs maternal care, and leadership roles.',
        keyDetail: 'Advanced Mentorship & Placement',
        imgSrc: coFounderImg,
        linkHref: '/careers#training-pathways',
        actionText: 'Explore Pathway',
        actionType: 'link'
      }
    ]
  },

  // =========================================================================
  // 5. GUIDE ME
  // =========================================================================
  {
    id: 'guide',
    label: 'Guide me',
    sublabel: 'CONCIERGE CARE GUIDANCE & TRIAGE',
    icon: Compass,
    heroTitle: 'Personalized Concierge & 1-on-1 Care Guidance',
    heroDesc: 'Unsure which support format matches your timeline? Speak directly with Mrs. Jemma Francis or our senior care coordinators for a bespoke care roadmap.',
    features: [
      '30-minute deep dive into your due date, birth plan, or postpartum needs',
      'Personalized comparison between live-in nanny vs daily visits vs family support',
      'Customized dietary, herbal, and botanical product recommendations',
      'Direct WhatsApp concierge access throughout your family’s journey'
    ],
    cards: [
      {
        id: 'book-15-min-call',
        title: 'Book a 15-Minute Call',
        tag: 'Complimentary Discovery',
        desc: 'Schedule a zero-obligation 1-on-1 call with our senior care coordinator to discuss your dates, location, and ideal care plan.',
        keyDetail: '15 Minutes • Phone or Video • Free',
        imgSrc: consultationImg,
        linkHref: '/book',
        actionText: 'Book a 15-Minute Call',
        actionType: 'link'
      },
      {
        id: 'general-consultation',
        title: 'General Consultation',
        tag: 'Bespoke Care Planning',
        desc: 'Connect directly with our clinical care team for comprehensive maternal wellness consultation, hospital triage, and confinement guidance.',
        keyDetail: 'Personalized Triage & Roadmap',
        imgSrc: birthDoulaImg,
        linkHref: '/services/holistic-care-guidance-consultation',
        actionText: 'General Consultation',
        actionType: 'link',
        enquiryService: 'General Care Guidance Consultation'
      },
      {
        id: 'find-my-next-step',
        title: 'Find My Next Step',
        tag: 'Interactive Stage Finder',
        desc: 'Enter your estimated due date, pregnancy week, or baby’s age to reveal tailored clinical services and workshops curated specifically for you.',
        keyDetail: 'Instant Timeline Recommendations',
        imgSrc: infantMassageImg,
        linkHref: '#your-stage-next-step',
        actionText: 'Find My Next Step',
        actionType: 'scroll'
      }
    ]
  }
];

export const SupportModeTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<SupportTabId>('care');
  const { openEnquiry } = useQuickEnquiry();

  const activeCategory = SUPPORT_CATEGORIES.find(cat => cat.id === activeTabId) || SUPPORT_CATEGORIES[0];

  const handleAction = (card: CardItem, e: React.MouseEvent) => {
    if (card.actionType === 'scroll' || card.linkHref === '#your-stage-next-step') {
      e.preventDefault();
      const target = document.getElementById('your-stage-next-step');
      if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.location.hash = 'your-stage-next-step';
      }
    }
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10 font-heading">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-4">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.18]">
          How Would You <span className="italic text-[#7B1131]">Like SEYOL</span> to Support You?
        </h2>
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#7A6363] max-w-2xl mx-auto leading-relaxed">
          From hands-on maternal healing and live-in nannies to empowering classes and professional doula training — choose the support format that fits your life.
        </p>
      </div>

      {/* 5-Way Interactive Tab Switcher (Touch friendly & responsive) */}
      <div className="w-full max-w-4xl mx-auto px-2">
        <div 
          role="tablist"
          aria-label="SEYOL Support Categories"
          className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 p-2 bg-[#F7F4EF] rounded-2xl sm:rounded-full border border-[#E8E0D2] overflow-x-auto scrollbar-none shadow-warm-xs"
        >
          {SUPPORT_CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-heading font-bold transition-all duration-300 flex items-center space-x-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B1131] ${
                  isActive
                    ? 'bg-[#7B1131] text-white shadow-warm-md scale-[1.02]'
                    : 'text-[#3A1D1D] hover:text-[#7B1131] hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#E4CF9E]' : 'text-[#A6833D]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Panel (Smooth Fade In) */}
      <div 
        key={activeCategory.id}
        role="tabpanel"
        className="bg-white rounded-3xl sm:rounded-[36px] border border-[#E8E0D2] p-6 sm:p-8 lg:p-10 shadow-warm-md space-y-8 sm:space-y-10 animate-fadeIn"
      >
        {/* Top Feature Narrative Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center border-b border-[#E8E0D2]/80 pb-8">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-widest text-[#A6833D]">
              {activeCategory.sublabel}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3A1D1D] tracking-tight leading-snug">
              {activeCategory.heroTitle}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#7A6363] leading-relaxed max-w-xl">
              {activeCategory.heroDesc}
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="lg:col-span-5 bg-[#FCFBFA] p-5 sm:p-6 rounded-2xl border border-[#E8E0D2] space-y-2.5">
            {activeCategory.features.map((feat, i) => (
              <div key={i} className="flex items-start space-x-2.5 text-xs font-sans text-[#3A1D1D]">
                <CheckCircle2 className="w-4 h-4 text-[#7B1131] shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Display Items Grid */}
        {activeCategory.id === 'guide' ? (
          // Category 5 (Guide Me): 3 Distinct Clear Action Cards
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {activeCategory.cards.map((card) => {
              const isScroll = card.actionType === 'scroll';
              return (
                <div
                  key={card.id}
                  className="group relative flex flex-col justify-between bg-[#FCFBFA] rounded-2xl sm:rounded-3xl border border-[#E8E0D2] overflow-hidden p-6 sm:p-7 hover:border-[#7B1131]/40 hover:bg-white hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Visual Image / Header */}
                    <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-cream border border-[#E8E0D2]/60">
                      <Image
                        src={card.imgSrc}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div>
                      <h4 className="font-heading font-extrabold text-lg sm:text-xl text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug min-h-[32px] flex items-center">
                        {card.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-[13px] text-[#7A6363] leading-relaxed mt-2 min-h-[48px]">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-6 border-t border-[#E8E0D2]/80 mt-6 space-y-2">
                    {isScroll ? (
                      <button
                        onClick={(e) => handleAction(card, e)}
                        className="w-full py-3 px-4 rounded-xl bg-[#7B1131] hover:bg-[#5A0C24] text-white text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 shadow-warm-sm hover:shadow-warm-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{card.actionText}</span>
                        <ArrowDownCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        href={card.linkHref}
                        onClick={(e) => handleAction(card, e)}
                        className="w-full py-3 px-4 rounded-xl bg-[#7B1131] hover:bg-[#5A0C24] text-white text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 shadow-warm-sm hover:shadow-warm-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{card.actionText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}

                    {card.enquiryService && (
                      <button
                        onClick={() => openEnquiry({ serviceTitle: card.enquiryService })}
                        className="w-full py-2 px-3 text-[11px] font-heading font-semibold text-[#7B1131] hover:text-[#5A0C24] hover:bg-[#FBF0F3] rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Or Send Direct Enquiry →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Categories 1 to 4: 4-Item Responsive Cards Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {activeCategory.cards.map((card) => (
              <article
                key={card.id}
                className="group relative flex flex-col justify-between bg-[#FCFBFA] rounded-2xl sm:rounded-3xl border border-[#E8E0D2] overflow-hidden p-5 sm:p-6 hover:border-[#7B1131]/40 hover:bg-white hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-cream border border-[#E8E0D2]/60">
                    <Image
                      src={card.imgSrc}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug line-clamp-2 min-h-[48px] flex items-center">
                      {card.title}
                    </h4>
                    <p className="font-sans text-xs text-[#7A6363] leading-relaxed mt-2 line-clamp-3 min-h-[54px]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-[#E8E0D2]/80 mt-5 space-y-2">
                  <Link
                    href={card.linkHref}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-[#7B1131] text-[#7B1131] hover:text-white border border-[#7B1131]/30 hover:border-[#7B1131] text-xs font-heading font-bold transition-all duration-200 shadow-warm-xs flex items-center justify-center gap-1.5 group-hover:bg-[#7B1131] group-hover:text-white"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {card.enquiryService && (
                    <button
                      onClick={() => openEnquiry({ serviceTitle: card.enquiryService })}
                      className="w-full py-1.5 text-[11px] font-heading font-semibold text-[#7A6363] hover:text-[#7B1131] transition-colors cursor-pointer text-center block"
                    >
                      Quick Enquiry
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Section Footer: Primary & Secondary CTAs */}
        {(activeCategory.primaryCta || activeCategory.secondaryCta) && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            {activeCategory.primaryCta && (
              <Link
                href={activeCategory.primaryCta.href}
                className="inline-flex items-center gap-2 bg-[#7B1131] hover:bg-[#5A0C24] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:scale-[1.02] cursor-pointer"
              >
                <span>{activeCategory.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {activeCategory.secondaryCta && (
              <Link
                href={activeCategory.secondaryCta.href}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-[#FAF0EB] text-[#7B1131] border border-[#7B1131]/40 hover:border-[#7B1131] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 cursor-pointer"
              >
                <span>{activeCategory.secondaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default SupportModeTabs;
