'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  GraduationCap, 
  Clock, 
  Award, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Flower2, 
  Users, 
  ShieldCheck, 
  Calendar,
  Check,
  Baby
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type SupportTabId = 'care' | 'teach' | 'routine' | 'train' | 'guide';

interface SupportTabConfig {
  id: SupportTabId;
  label: string;
  sublabel: string;
  icon: any;
  heroTitle: string;
  heroDesc: string;
  features: string[];
  cards: {
    title: string;
    tag: string;
    desc: string;
    price: string;
    linkUrl: string;
    linkText: string;
    ctaAction?: string;
  }[];
}

const SUPPORT_TABS: SupportTabConfig[] = [
  {
    id: 'care',
    label: 'Care for me',
    sublabel: 'In-home maternal & newborn sanctuary',
    icon: Flower2,
    heroTitle: 'Hands-On In-Home Sanctuary & Postpartum Care',
    heroDesc: 'Experience the healing touch of certified South Indian care matrons in the privacy and serenity of your own bedroom.',
    features: [
      'Daily in-home maternal massage & uterine involution strokes',
      'Traditional warm Kizhi herbal poultice fomentation',
      'Custom cotton belly binding (Kattu) for diastasis recti support',
      'Gentle traditional infant mustard/almond oil massage & bath'
    ],
    cards: [
      {
        title: 'Postpartum Massage & Belly Binding',
        tag: 'Maternal Focus',
        desc: 'Daily 90-min in-home maternal bodywork, herbal kizhi steam fomentation, and cotton belly binding.',
        price: 'From ₹24,000 / 10 Days',
        linkUrl: '/services#postpartum-massage-wrap',
        linkText: 'Explore Service',
        ctaAction: 'Postpartum Massage & Belly Binding'
      },
      {
        title: 'Mother & Baby 10-Day Care Combo',
        tag: 'Dual Sanctuary',
        desc: 'Complete dual care covering 90-min mother recovery plus baby daily bath and massage ritual.',
        price: '₹36,000 / 10 Days',
        linkUrl: '/services#mother-and-baby-care-combo',
        linkText: 'Explore Service',
        ctaAction: 'Mother & Baby Care Combo'
      },
      {
        title: 'Stay-In 24/7 Confinement Nanny',
        tag: 'Round-the-Clock',
        desc: 'Vetted, certified confinement specialist living with you for 28 to 40 days of continuous maternal & infant care.',
        price: 'From ₹85,000 / 28 Days',
        linkUrl: '/services#confinement-nanny',
        linkText: 'Explore Service',
        ctaAction: 'Confinement Nanny'
      }
    ]
  },
  {
    id: 'teach',
    label: 'Teach me',
    sublabel: 'Childbirth classes & masterclasses',
    icon: GraduationCap,
    heroTitle: 'Certified Childbirth & Newborn Masterclasses',
    heroDesc: 'Evidence-based prenatal and postnatal education that replaces fear and medical anxiety with calm, joyful confidence.',
    features: [
      'Physiological birth mechanics & natural pain coping strategies',
      'Partner hands-on coaching, counterpressure & advocacy tools',
      'Hands-on newborn bath, burping, swaddling & soothing practice',
      'Interactive small batches with live Q&A by senior doulas'
    ],
    cards: [
      {
        title: 'Childbirth Preparation Masterclass',
        tag: 'Live Virtual / In-Person',
        desc: 'Comprehensive 2-part weekend series covering labor stages, breathing, partner support, and birth planning.',
        price: '₹4,999 / Couple Pass',
        linkUrl: '/classes#childbirth-preparation-masterclass',
        linkText: 'Reserve Couple Seat',
        ctaAction: 'Childbirth Masterclass'
      },
      {
        title: 'Newborn Care & Soothing Masterclass',
        tag: 'Hands-on Infant Prep',
        desc: 'Master safe bathing, cord care, diapering, gas relief techniques, and creating peaceful infant sleep routines.',
        price: '₹2,999 / Couple Pass',
        linkUrl: '/classes#newborn-care-masterclass',
        linkText: 'Reserve Seat',
        ctaAction: 'Newborn Care Masterclass'
      },
      {
        title: 'Prenatal Yoga & Pelvic Floor Mobility',
        tag: 'Weekly Practice',
        desc: 'Gentle trimester-safe movement, pelvic opening postures, and breathwork led by certified prenatal instructors.',
        price: '₹3,500 / 4-Week Series',
        linkUrl: '/classes#prenatal-yoga-classes',
        linkText: 'Join Class',
        ctaAction: 'Prenatal Yoga'
      }
    ]
  },
  {
    id: 'routine',
    label: 'Support my routine',
    sublabel: 'Hourly respite & daily routines',
    icon: Clock,
    heroTitle: 'Flexible Respite & Daily Routine Assistance',
    heroDesc: 'When you need a helping hand for a few hours during the day or a restful night of unbroken sleep, our care team steps in.',
    features: [
      'Flexible hourly blocks tailored to your family schedule',
      'Expert newborn soothing, colic relief & feeding assistance',
      'Postpartum mother bath preparation & lactation support visits',
      'Peace of mind while parents rest, shower, or work'
    ],
    cards: [
      {
        title: 'Hourly Newborn Respite & Care',
        tag: 'Flexible Hourly Blocks',
        desc: 'Dedicated infant care support by certified practitioners for feeding, burping, and soothing while you rest.',
        price: '₹650 / Hour (Min 4 hrs)',
        linkUrl: '/services#hourly-newborn-support',
        linkText: 'Book Hourly Respite',
        ctaAction: 'Hourly Newborn Respite'
      },
      {
        title: 'Overnight Sleep Sanctuary Support',
        tag: 'Night Respite',
        desc: 'Certified night caregiver manages infant night feeds, diaper changes, and burping so mother heals uninterrupted.',
        price: '₹3,800 / Night Shift',
        linkUrl: '/services#hourly-newborn-support',
        linkText: 'Book Night Care',
        ctaAction: 'Night Sanctuary Support'
      },
      {
        title: 'In-Home Lactation & Latch Guidance',
        tag: 'Clinical Support',
        desc: 'Specialized 1-on-1 home visit by certified lactation consultant for painless latch, engorgement relief, and milk supply.',
        price: '₹3,500 / Home Visit',
        linkUrl: '/services#lactation-support',
        linkText: 'Book Lactation Visit',
        ctaAction: 'Lactation Consultation'
      }
    ]
  },
  {
    id: 'train',
    label: 'Train me',
    sublabel: 'Vocational doula & caregiver academy',
    icon: Award,
    heroTitle: 'SEYOL Care Academy & Professional Certifications',
    heroDesc: 'Empowering aspiring doulas, infant care nurses, and confinement specialists with gold-standard traditional and clinical skills.',
    features: [
      'Comprehensive curriculum bridging AYUSH traditions and modern obstetrics',
      'Clinical shadowing, hands-on mannequin practice, and live case mentoring',
      'Certification recognized in Singapore, India, and Southeast Asia',
      'Direct career placement opportunities within the SEYOL network'
    ],
    cards: [
      {
        title: 'Certified Postpartum Doula Programme',
        tag: 'Vocational Certification',
        desc: 'Master ancient 40-day care, Kizhi preparation, Bengkung binding, and evidence-based postpartum recovery.',
        price: 'Enrollment Open',
        linkUrl: '/careers',
        linkText: 'View Academy Details',
        ctaAction: 'Doula Training Academy'
      },
      {
        title: 'Infant Bath & Care Specialist Course',
        tag: 'Short Certification',
        desc: 'Professional training in neonatal handling, traditional Ayurvedic oil therapy, safe water immersion, and colic alleviation.',
        price: 'Weekend Intensive',
        linkUrl: '/careers',
        linkText: 'Learn More',
        ctaAction: 'Infant Care Training'
      },
      {
        title: 'Birth Doula & Labour Support Training',
        tag: 'Professional Track',
        desc: 'Comprehensive birth advocacy, physiological labor support, comfort measures, and hospital protocol navigation.',
        price: 'Certification Track',
        linkUrl: '/careers',
        linkText: 'Apply to Academy',
        ctaAction: 'Birth Doula Certification'
      }
    ]
  },
  {
    id: 'guide',
    label: 'Guide me',
    sublabel: '1-on-1 concierge & care consultation',
    icon: Compass,
    heroTitle: 'Personalized Concierge & 1-on-1 Doula Triage',
    heroDesc: 'Unsure where to start? Speak directly with Mrs. Jemma Francis or our senior care matrons for a bespoke care roadmap.',
    features: [
      '30-minute deep dive into your due date, birth plan, or postpartum needs',
      'Personalized comparison between live-in nanny vs daily visits vs family support',
      'Customized dietary, herbal, and botanical product recommendations',
      'Direct WhatsApp concierge access throughout your journey'
    ],
    cards: [
      {
        title: 'Virtual Postpartum Care Planning Session',
        tag: '1-on-1 Consultation',
        desc: 'Design your complete 40-day recovery blueprint, meal planning, and family boundary setup with a Senior Doula.',
        price: '₹1,500 / 45-Min Call',
        linkUrl: '/contact',
        linkText: 'Book Strategy Call',
        ctaAction: 'Postpartum Care Planning'
      },
      {
        title: 'Birth Plan & Hospital Triage Review',
        tag: 'Doula Triage',
        desc: 'Review your hospital birth preferences, pain relief options, and discuss labor advocacy strategies with an educator.',
        price: '₹1,500 / 45-Min Call',
        linkUrl: '/contact',
        linkText: 'Schedule Review',
        ctaAction: 'Birth Plan Review'
      },
      {
        title: 'Free 15-Min Care Matron Discovery Call',
        tag: 'Complimentary',
        desc: 'A quick, zero-obligation chat to understand which SEYOL service or package fits your family’s budget and location.',
        price: '₹0 Free Discovery',
        linkUrl: '/contact',
        linkText: 'Request Free Call',
        ctaAction: 'Free Discovery Call'
      }
    ]
  }
];

export const SupportModeTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<SupportTabId>('care');
  const { openEnquiry } = useQuickEnquiry();

  const activeTab = SUPPORT_TABS.find(t => t.id === activeTabId) || SUPPORT_TABS[0];

  return (
    <div className="w-full space-y-8 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          <span>Flexible Care Modes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          How Would You Like SEYOL to Support You?
        </h2>
        <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
          From hands-on maternal healing and live-in nannies to empowering classes and professional doula training — choose the support format that fits your life.
        </p>
      </div>

      {/* 5-Way Interactive Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 bg-cream rounded-2xl sm:rounded-full border border-cream-border max-w-4xl mx-auto">
        {SUPPORT_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                isActive
                  ? 'bg-[#7B1131] text-cream-light shadow-warm-md scale-[1.02]'
                  : 'text-brown hover:text-maroon hover:bg-white/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-gold-light' : 'text-gold-dark'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-3xl sm:rounded-[36px] border border-cream-border p-6 sm:p-10 lg:p-12 shadow-warm-md space-y-8 animate-fadeIn">
        
        {/* Top Feature Narrative Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-cream-border/80 pb-8">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-gold-dark">
              {activeTab.sublabel}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown tracking-tight">
              {activeTab.heroTitle}
            </h3>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {activeTab.heroDesc}
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="lg:col-span-5 bg-cream-light p-5 rounded-2xl border border-cream-border space-y-2.5">
            {activeTab.features.map((feat, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-brown">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Interactive Cards for Selected Mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-cream/40 rounded-2xl p-6 border border-cream-border flex flex-col justify-between space-y-4 hover:border-maroon/40 hover:bg-cream/70 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-maroon bg-maroon-soft px-2.5 py-1 rounded-full">
                    {card.tag}
                  </span>
                  <span className="font-serif font-bold text-xs text-brown">{card.price}</span>
                </div>

                <h4 className="font-serif font-bold text-lg text-brown group-hover:text-maroon transition-colors leading-snug">
                  {card.title}
                </h4>

                <p className="text-xs text-brown-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-border/80 flex items-center gap-2">
                <button
                  onClick={() => openEnquiry({ serviceTitle: card.ctaAction || card.title })}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Quick Book
                </button>

                <Link
                  href={card.linkUrl}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream-dark text-brown text-xs font-bold border border-cream-border text-center transition-all"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
