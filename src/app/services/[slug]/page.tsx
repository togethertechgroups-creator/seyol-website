'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Flower2, 
  Baby, 
  MessageCircle, 
  ExternalLink,
  Users,
  Compass,
  Smile,
  Zap,
  Star,
  Play
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BookingServiceId } from '../../../types/booking';
import { productsData } from '../../../data/products';
import { classesData } from '../../../data/classes';
import { TestimonialCarousel } from '../../../components/shared/TestimonialCarousel';
import { useQuickEnquiry } from '../../../context/QuickEnquiryContext';
import { useBookingModal } from '../../../context/BookingModalContext';
import benefitImg1 from '../../../assets4/ChatGPT Image Aug 19, 2026, 07_28_27 PM.png';
import benefitImg2 from '../../../assets4/ChatGPT Image Aug 19, 2026, 07_42_32 PM.png';
import lactationCareImg from '../../../assets4/lactation-care.jpg';
import clientReviewImg from '../../../assets4/ChatGPT Image Aug 19, 2026, 08_05_50 PM.png';

const combinedPackages = [
  {
    id: 'package-1',
    num: '01',
    name: 'SEYOL Package 1',
    badge: 'Starter Care',
    infantSessions: '15 Sessions of Infant Massage & Bath',
    postpartumSessions: '10 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/fzumx8',
  },
  {
    id: 'package-2',
    num: '02',
    name: 'SEYOL Package 2',
    badge: 'Extended Healing',
    infantSessions: '30 Sessions of Infant Massage & Bath',
    postpartumSessions: '15 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/1ux56m',
  },
  {
    id: 'package-3',
    num: '03',
    name: 'SEYOL Package 3',
    badge: 'Most Popular',
    popular: true,
    infantSessions: '40 Sessions of Infant Massage & Bath',
    postpartumSessions: '20 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/zi9nsk',
  },
  {
    id: 'package-4',
    num: '04',
    name: 'SEYOL Package 4',
    badge: 'Complete Recovery',
    infantSessions: '60 Sessions of Infant Massage & Bath',
    postpartumSessions: '30 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/txyz6m',
  },
  {
    id: 'package-5',
    num: '05',
    name: 'SEYOL Package 5',
    badge: 'Deep Sanctuary',
    infantSessions: '90 Sessions of Infant Massage & Bath',
    postpartumSessions: '40 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/stusd8',
  },
  {
    id: 'package-6',
    num: '06',
    name: 'SEYOL Package 6',
    badge: 'Master Confinement',
    infantSessions: '120 Sessions of Infant Massage & Bath',
    postpartumSessions: '60 Sessions of Postpartum Massage & Wrap',
    waLink: 'https://wa.link/cxpviv',
  },
];

const postpartumFaqs = [
  {
    q: 'Will I get a discount if I book together with Infant Massage & Bath?',
    a: 'In most cases, yes. Please submit our Price Quote Form, and we will provide you with a suitable package that will include discounts for booking multiple services together.',
  },
  {
    q: 'What is the recommended frequency for this service?',
    a: 'We recommend daily postpartum massage and wrap sessions for the first month after childbirth, followed by sessions every other day for continued support and recovery..',
  },
  {
    q: 'How far in advance should I book?',
    a: "You can book your postpartum massage and wrap sessions as soon as you know you're pregnant to secure your SEYOL slots. Early booking is advisable to ensure availability.",
  },
  {
    q: 'What is the payment process?',
    a: 'For bookings under $10,000, a 20% advance payment is required to confirm your booking. For bookings over $10,000, a 10% advance is necessary. Depending on the number of sessions you take, payments are typically made every 15 days.',
  },
  {
    q: 'What if I give birth before or after my Estimated Due Date (EDD)?',
    a: 'We always allocate your slots 2 weeks before and after your EDD to accommodate potential variations in your delivery date.',
  },
  {
    q: 'What if I have a caesarean section?',
    a: "If you've had or will have a caesarean section, we can typically start the postpartum massage 5-7 days after delivery, depending on how your body is recovering. During the first few sessions, we will avoid touching your abdomen. The timing may vary based on your doctor's advice or depending on your individual circumstances.",
  },
];

const lactationPillars = [
  {
    title: 'Techniques',
    desc: "Our knowledgeable lactation specialists will demonstrate and teach you effective breastfeeding techniques. You'll learn how to ensure a proper latch, manage milk flow, and make adjustments to enhance your baby's nursing experience.",
    icon: Sparkles,
  },
  {
    title: 'Positions',
    desc: "Explore comfortable breastfeeding positions for you and your baby's needs. We'll guide you to find positions that ease discomfort, ensuring a strong latch and an enjoyable breastfeeding experience for both.",
    icon: Compass,
  },
  {
    title: 'Process',
    desc: 'Understanding the breastfeeding process is essential for building confidence and success. Our team will guide you through the natural stages of breastfeeding, including the initial colostrum feedings and the transition to mature milk.',
    icon: Clock,
  },
  {
    title: 'Latching',
    desc: "Achieving a correct latch is crucial for successful breastfeeding. We'll focus on teaching you how to encourage a deep and secure latch, minimizing discomfort and ensuring your baby receives an adequate milk supply.",
    icon: Heart,
  },
  {
    title: 'Partner Support',
    desc: 'We recognize the importance of partner involvement in the breastfeeding journey. Our service extends support to partners, providing them with valuable insights and practical tips on how they can actively participate and support you during this special time.',
    icon: Users,
  },
];

const lactationFaqs = [
  {
    q: 'Is lactation support necessary?',
    a: 'While breastfeeding is natural, it is also a learned skill. Professional lactation support helps prevent nipple trauma, ensures adequate milk transfer, relieves engorgement, and establishes confidence early on.',
  },
  {
    q: 'What breastfeeding or pumping issues do you help with?',
    a: 'We assist with painful latches, cracked nipples, low or overabundant milk supply, engorgement, blocked ducts, transition from breast to bottle, pumping schedules, and returning-to-work milk plans.',
  },
  {
    q: 'When should I book lactation support sessions?',
    a: 'You can book prenatally during your third trimester to prepare your techniques, or immediately after childbirth within the first few days or weeks when challenges arise.',
  },
  {
    q: 'Do you offer in-person and virtual lactation support sessions?',
    a: 'Yes, we offer both in-home hands-on consultations across Chennai / Tamil Nadu and interactive virtual video consultations worldwide.',
  },
  {
    q: 'Can I contact you in between sessions if I have any doubts or questions?',
    a: 'Absolutely. All our lactation packages include direct WhatsApp chat support so you can send questions and receive quick reassurance between sessions.',
  },
];

export default function ServiceDetailPage() {
  const { services, bookingConfigs, combinedPackages } = useAdminData();
  const params = useParams();
  const rawSlug = (params?.slug as string) || '';
  const cleanSlug = decodeURIComponent(rawSlug).toLowerCase().replace(/\s+/g, '-').trim();
  const { openEnquiry } = useQuickEnquiry();
  const { openBooking } = useBookingModal();

  const [openPostpartumFaq, setOpenPostpartumFaq] = useState<number | null>(0);
  const [openLactationFaq, setOpenLactationFaq] = useState<number | null>(0);

  const isPostpartumPage =
    cleanSlug.includes('postnatal') ||
    cleanSlug.includes('postpartum') ||
    cleanSlug.includes('wrap');

  const service = services.find(
    (s) =>
      s.slug === cleanSlug ||
      s.id === cleanSlug ||
      s.slug.includes(cleanSlug) ||
      cleanSlug.includes(s.slug) ||
      s.title.toLowerCase().includes(cleanSlug.replace(/-/g, ' ')) ||
      (cleanSlug.includes('preconception') && s.id === 'preconception-care') ||
      (cleanSlug.includes('prenatal') && s.id === 'prenatal-massage') ||
      (cleanSlug.includes('postnatal') && s.id === 'postpartum-massage-wrap') ||
      (cleanSlug.includes('postpartum') && s.id === 'postpartum-massage-wrap') ||
      (cleanSlug.includes('doula') && s.id === 'birth-doula-support') ||
      (cleanSlug.includes('infant') && s.id === 'infant-massage-bath') ||
      (cleanSlug.includes('combo') && s.id === 'mother-baby-combo') ||
      (cleanSlug.includes('nanny') && s.id === 'confinement-nanny') ||
      (cleanSlug.includes('hourly') && s.id === 'hourly-newborn-support') ||
      (cleanSlug.includes('lactation') && s.id === 'lactation-support') ||
      (cleanSlug.includes('consultation') && s.id === 'general-consultation')
  ) || services[0];

  const getBookingKey = (svc: typeof service): BookingServiceId => {
    const sId = svc.id.toLowerCase();
    const sSlug = svc.slug.toLowerCase();
    if (sId.includes('preconception') || sSlug.includes('preconception')) return 'preconception-support';
    if (sId.includes('prenatal') || sSlug.includes('prenatal')) return 'prenatal-massage';
    if (sId.includes('doula') || sSlug.includes('doula')) return 'birth-doula-support';
    if (sId.includes('postpartum') || sSlug.includes('postpartum') || sId.includes('postnatal')) return 'postpartum-massage-wrap';
    if (sId.includes('infant') || sSlug.includes('infant')) return 'infant-massage-bath';
    if (sId.includes('combo') || sSlug.includes('combo')) return 'mother-baby-combo';
    if (sId.includes('nanny') || sSlug.includes('nanny')) return 'confinement-nanny';
    if (sId.includes('hourly') || sSlug.includes('hourly')) return 'hourly-newborn-support';
    if (sId.includes('lactation') || sSlug.includes('lactation')) return 'lactation-support';
    return 'general-consultation';
  };

  const bookingKey = getBookingKey(service);
  const currentConfig = bookingConfigs[bookingKey];

  const dynamicPackages: any[] = currentConfig?.packages
    ? [
        ...(currentConfig.packages.flat || []),
        ...(currentConfig.packages.standard || []),
        ...(currentConfig.packages.premium || []),
      ]
    : [];

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      
      {/* ========================================================================= */}
      {/* 1. HERO SHOWCASE SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4 pl-2 sm:pl-6 md:pl-10 lg:pl-12">
            <div className="flex flex-wrap gap-2">
              <span className="bg-maroon-soft text-maroon text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-maroon/20">
                {isPostpartumPage ? 'Sacred Postpartum Confinement' : service.stages[0]}
              </span>
              <span className="bg-gold/25 text-brown text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-gold/30">
                Certified Matrons
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-sm sm:text-base text-maroon font-serif italic">
              "{service.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed font-medium">
              {service.summary}
            </p>

            {/* If Postpartum Page, show the Two Core Elements */}
            {isPostpartumPage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-warm-xs space-y-1.5">
                  <div className="font-serif font-bold text-sm text-[#7B1131] flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-gold-dark" />
                    <span>Full-Body Oil Massage</span>
                  </div>
                  <p className="text-[11px] text-brown-muted leading-relaxed">
                    Combines gentle strokes and aromatic oils to ease tension, release muscle knots, and promote whole-body tranquility.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-warm-xs space-y-1.5">
                  <div className="font-serif font-bold text-sm text-[#7B1131] flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-maroon" />
                    <span>Abdominal Wrap</span>
                  </div>
                  <p className="text-[11px] text-brown-muted leading-relaxed">
                    Gentle compression and support to the abdominal area aiding postpartum healing, reducing swelling, and restoring core stability.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Meta Specs */}
            <div className="grid grid-cols-2 gap-3 bg-cream-light p-4 rounded-2xl border border-cream-border text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-brown-muted">Session Duration</div>
                <div className="font-semibold text-brown mt-0.5">{service.duration}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-brown-muted">When Can You Start</div>
                <div className="font-semibold text-brown mt-0.5">{service.recommendedTimeline}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openEnquiry({ serviceTitle: service.title })}
                className="px-7 py-3.5 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md hover:scale-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Get Free Price Quotation</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] max-w-[480px] rounded-3xl overflow-hidden shadow-2xl border border-cream-border/80 group">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 text-xs text-brown font-medium flex items-center justify-between shadow-md">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <span className="font-bold text-xs text-brown">{service.shortTitle}</span>
                </span>
                <span className="font-bold text-maroon text-xs">Certified Postnatal Matrons</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BENEFITS OF SERVICE SECTION (Rose / Maroon Luxury Layout)              */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#872341] via-[#6d132c] to-[#4a0b1c] text-white relative overflow-hidden border-y border-maroon-dark/50">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & 6 Clean Benefit Items with Checkmarks */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-center pl-4 sm:pl-8 lg:pl-[30mm]">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light border border-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                <span>Evidence-Based Maternal Recovery</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Benefits Of Service
              </h2>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 max-w-2xl">
              {service.features.map((feat, idx) => {
                const parts = feat.split(' - ');
                const title = parts[0] || feat;
                const desc = parts[1] || '';

                return (
                  <div key={idx} className="flex items-start space-x-3.5 group">
                    <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-gold group-hover:text-maroon transition-all shadow-xs mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="text-sm sm:text-base leading-relaxed text-white max-w-xl">
                      <span className="font-extrabold text-white group-hover:text-gold-light transition-colors">
                        {title}
                      </span>
                      {desc && (
                        <span className="font-semibold text-white/95">
                          {' '}– {desc}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 2 Stacked Luxury Photo Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 justify-center w-full max-w-[380px] mx-auto lg:ml-auto">
            <div className="relative w-full h-[180px] sm:h-[210px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group bg-neutral-900">
              <img
                src={service.benefitImages?.[0] || benefitImg1.src || (benefitImg1 as any)}
                alt="Therapeutic Bodywork"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs text-white flex items-center justify-between shadow-sm">
                <span className="font-semibold text-xs text-cream-light">Therapeutic Touch</span>
                <span className="text-gold-light text-[10px] uppercase font-bold tracking-wider">Certified Care</span>
              </div>
            </div>

            <div className="relative w-full h-[180px] sm:h-[210px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group bg-neutral-900">
              <img
                src={service.benefitImages?.[1] || benefitImg2.src || (benefitImg2 as any)}
                alt="Restorative Comfort Touch"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs text-white flex items-center justify-between shadow-sm">
                <span className="font-semibold text-xs text-cream-light">Relaxation &amp; Relief</span>
                <span className="text-gold-light text-[10px] uppercase font-bold tracking-wider">Deep Calm</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IS IT DONE? SECTION                                                */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-cream-border">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-7 space-y-7 pl-4 sm:pl-8 lg:pl-[30mm]">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
              How is it done?
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-brown-dark leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B1131] mt-2 shrink-0" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold text-brown">Therapeutic Protocol &amp; Procedure:</strong>{' '}
                  <span className="text-brown/90 font-medium">
                    {service.summary}
                  </span>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B1131] mt-2 shrink-0" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold text-brown">Key Physiological &amp; Emotional Benefits:</strong>{' '}
                  <span className="text-brown/90 font-medium">
                    {service.benefit}
                  </span>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B1131] mt-2 shrink-0" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold text-brown">Duration:</strong>{' '}
                  <span className="text-brown/90 font-medium">
                    {service.duration}
                  </span>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B1131] mt-2 shrink-0" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold text-brown">When Can You Start:</strong>{' '}
                  <span className="text-brown/90 font-medium">
                    {service.recommendedTimeline}
                  </span>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openEnquiry({ serviceTitle: service.title })}
                className="bg-[#7B1131] hover:bg-[#5e0c24] text-white px-9 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Right Column: Image Frame */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[380px] h-[440px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-cream-border/80 group bg-neutral-900">
              <img
                src={service.processImage || benefitImg1.src || (benefitImg1 as any)}
                alt="How is it done"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POSTPARTUM BATH ADD-ON SECTION                                         */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cream/70 border-b border-cream-border">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider border border-maroon/20">
              <Flower2 className="w-3.5 h-3.5 text-maroon" />
              <span>Ayurvedic Herbal Confinement Ritual</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
              Postpartum Bath Add-On
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              We combine our specially curated SEYOL Ayurvedic Herbal Bath Sachets with fresh herbs and essential oils in warm water to create a cocoon of comfort for you to unwind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Postpartum Healing',
                desc: 'Ayurvedic herbs used in the bath aid tissue repair, soothe perineal discomfort, and reduce inflammation after childbirth.',
                icon: Heart,
              },
              {
                title: 'Improved Sleep',
                desc: 'The soothing effects of warm water infused with medicinal herbs prepare new mothers for deep, revitalizing sleep.',
                icon: Clock,
              },
              {
                title: 'Detoxification',
                desc: 'Ayurvedic botanicals support natural perspiration and lymphatic drainage, promoting wholesome bodily cleansing.',
                icon: Sparkles,
              },
              {
                title: 'Uplifts Mood',
                desc: 'Aromatic herbal essences offer mood-enhancing aromatherapy, uplifting your spirits and creating emotional serenity.',
                icon: Smile,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-cream-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-maroon-soft text-maroon flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-brown">{item.title}</h3>
                    <p className="text-xs text-brown-muted leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timing Note Card */}
          <div className="max-w-xl mx-auto bg-white border border-gold/40 rounded-2xl p-5 text-center shadow-warm-xs space-y-1">
            <div className="font-serif font-bold text-sm text-[#7B1131]">
              Total Duration of Postpartum Massage, Bath &amp; Wrap
            </div>
            <p className="text-xs text-brown font-semibold">
              Each session is 1 hour 30 Minutes long.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMBINED PACKAGES SECTION (Ultra-Premium Bento Grid)                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream/40 border-b border-cream-border relative overflow-hidden">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider border border-maroon/20">
              <Sparkles className="w-3.5 h-3.5 text-maroon" />
              <span>Mother &amp; Infant Postnatal Care</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
              Combined Packages
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              Comprehensive mother and infant care journeys curated for complete healing, relaxation, and bonding.
            </p>
          </div>

          {/* Bento Grid for Dynamic SEYOL Combined Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {combinedPackages.map((pkg: any, idx: number) => {
              const isPopularTier = pkg.isPopular || pkg.popular;
              const sessionText = pkg.sessions || (pkg.infantSessions ? `${pkg.infantSessions} • ${pkg.postpartumSessions}` : 'Custom Schedule');
              const priceDisplay = pkg.price ? `₹${Number(pkg.price).toLocaleString()}` : (pkg.priceNote || 'Custom Quote');

              return (
                <div
                  key={pkg.id || idx}
                  className={`bg-white rounded-3xl p-7 sm:p-8 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 relative overflow-hidden ${
                    isPopularTier
                      ? 'border-2 border-[#7B1131] shadow-warm-xl ring-4 ring-[#7B1131]/10'
                      : 'border border-cream-border hover:border-maroon/40 shadow-warm-sm hover:shadow-warm-lg'
                  }`}
                >
                  {isPopularTier && (
                    <div className="absolute top-0 right-0 bg-[#7B1131] text-gold-light text-[10px] font-extrabold uppercase tracking-widest py-1 px-4 rounded-bl-2xl shadow-sm flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-gold-light" />
                      <span>Most Chosen</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center justify-between pt-1">
                      <div className="w-10 h-10 rounded-2xl bg-maroon-soft border border-maroon/20 flex items-center justify-center text-maroon font-serif font-extrabold text-sm shadow-xs group-hover:bg-[#7B1131] group-hover:text-cream-light transition-colors duration-300">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted bg-cream px-3 py-1 rounded-full border border-cream-border">
                        {pkg.badge || 'Care Tier'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown group-hover:text-[#7B1131] transition-colors">
                        {pkg.name}
                      </h3>
                      <div className="text-[11px] font-semibold text-brown-muted uppercase tracking-wider">
                        Care Package Inclusions
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-2xl bg-cream-light/80 border border-cream-border group-hover:border-maroon/20 transition-colors space-y-1.5">
                        <div className="flex items-center space-x-2 text-xs font-bold text-[#7B1131]">
                          <Baby className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                          <span>Included Sessions &amp; Care</span>
                        </div>
                        <div className="text-xs text-brown font-semibold pl-5.5">
                          {sessionText}
                        </div>
                        {(pkg.details || pkg.description) && (
                          <p className="text-xs text-brown-muted pl-5.5 leading-relaxed font-medium">
                            {pkg.details || pkg.description}
                          </p>
                        )}
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF2F4] border border-[#7B1131]/20 flex items-center justify-between">
                        <span className="text-xs text-brown font-medium">Session Rate / Price:</span>
                        <span suppressHydrationWarning className="font-serif font-bold text-sm text-[#7B1131]">
                          {priceDisplay}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-cream-border/80 mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => openBooking({ serviceId: bookingKey, packageId: pkg.id })}
                      className="w-full py-3 px-5 rounded-2xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 group-hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Book Care Package</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-light group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href={pkg.waLink || 'https://wa.me/919940149090'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-2xl bg-cream border border-cream-border text-brown hover:text-maroon hover:bg-cream-dark font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Pricelist</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT OUR CLIENTS HAVE TO SAY ABOUT SEYOL?                              */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
        <div className="bg-[#f5e3df] text-brown rounded-3xl p-8 sm:p-12 shadow-warm-lg border border-cream-border relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text and CTA */}
          <div className="space-y-4 text-left max-w-xl z-10">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7B1131] tracking-tight leading-snug">
              What Our Clients Have To Say About SEYOL?
            </h3>
            <p className="text-xs sm:text-sm text-brown leading-relaxed font-medium">
              Read authentic postpartum stories, reviews, and recovery experiences from mothers across Singapore and India.
            </p>
            <div className="pt-2">
              <a
                href="https://www.facebook.com/seyolsgindiandoula"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-md bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Read Written Reviews</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Right Video / Testimonial Preview Card */}
          <div className="relative w-full max-w-[440px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 group z-10">
            <Image
              src={clientReviewImg}
              alt="SEYOL Client Video Testimonial"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 text-[#7B1131] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
            {/* Tamil Subtitle Bar */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-[11px] text-center font-medium">
              சியோலக் மாஸா அக்கா வந்து மசாஜ் பண்ணி...
            </div>
          </div>

          {/* Decorative Circles on Bottom Right */}
          <div className="w-20 h-20 rounded-full bg-[#d09e9e]/50 absolute -bottom-6 -right-6 pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-[#7B1131]/70 absolute bottom-6 right-14 pointer-events-none" />
          <div className="w-6 h-6 rounded-full bg-white absolute bottom-16 right-4 pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (Postpartum Accordion)                      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-cream-border">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#7B1131] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Clear answers regarding postpartum scheduling, packages, and recovery guidelines.
            </p>
          </div>

          <div className="space-y-3">
            {postpartumFaqs.map((faq, idx) => {
              const isOpen = openPostpartumFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-cream-border overflow-hidden transition-all duration-200 bg-cream-light/60"
                >
                  <button
                    onClick={() => setOpenPostpartumFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-brown flex items-center justify-between gap-4 cursor-pointer hover:text-maroon transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-maroon shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brown-muted shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-brown leading-relaxed font-medium border-t border-cream-border/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. LACTATION SUPPORT SECTION (Overlapping Card Layout)                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] via-cream to-[#FBF8F2] border-b border-cream-border relative overflow-hidden">
        <div className="max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto space-y-16 relative z-10">
          
          {/* Overlapping Hero Layout matching reference design */}
          <div className="relative max-w-5xl mx-auto pb-6 lg:pb-14">
            
            {/* Left Photo Container with Maroon Border */}
            <div className="relative w-full lg:w-[72%] h-[300px] sm:h-[380px] md:h-[430px] border-2 border-[#7B1131] rounded-none sm:rounded-sm overflow-hidden shadow-xl">
              <Image
                src={lactationCareImg}
                alt="Lactation Support Care"
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* Overlapping Dusty Rose Card on Bottom Right */}
            <div className="bg-[#caa0a0] text-[#3d0f19] p-6 sm:p-8 md:p-9 rounded-none sm:rounded-sm shadow-2xl w-full lg:max-w-[460px] lg:absolute lg:bottom-0 lg:right-0 z-20 space-y-4 text-left border border-white/25 mt-4 lg:mt-0">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#7B1131] tracking-tight leading-snug">
                Lactation Support
              </h2>
              
              <p className="text-xs sm:text-sm text-[#4a121f] leading-relaxed font-medium">
                Welcome to our lactation support service, empowering mothers on their breastfeeding journey. Our consultants offer personalized care and expert advice for a successful experience, whether you're a first-time mother or facing challenges. We're committed to helping you achieve your breastfeeding goals and fostering a strong bond with your baby.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => openEnquiry({ serviceTitle: 'Lactation Support Consultation' })}
                  className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-sm transition-colors shadow-sm cursor-pointer"
                >
                  Get Free Price Quotation
                </button>
              </div>
            </div>

          </div>

          {/* 5 Lactation Guidance Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lactationPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-maroon-soft text-[#7B1131] flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-lg text-[#7B1131]">{pillar.title}</h3>
                    <p className="text-xs text-brown-muted leading-relaxed font-medium">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lactation FAQs */}
          <div className="max-w-4xl mx-auto space-y-6 pt-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#7B1131] text-center">
              Lactation Support FAQs
            </h3>

            <div className="space-y-3">
              {lactationFaqs.map((faq, idx) => {
                const isOpen = openLactationFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-cream-border overflow-hidden transition-all duration-200 bg-white shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenLactationFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-brown flex items-center justify-between gap-4 cursor-pointer hover:text-maroon transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-maroon shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-brown-muted shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-brown leading-relaxed font-medium border-t border-cream-border/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHAT OUR CLIENTS HAVE TO SAY ABOUT SEYOL? (YouTube Video Reviews)      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[96%] xl:max-w-[95%] 2xl:max-w-[1720px] mx-auto w-full">
        <TestimonialCarousel filterStage={service.stages[0] || 'all'} />
      </section>

    </div>
  );
}
