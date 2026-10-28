'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Model3DViewer = dynamic(
  () => import('@/components/shared/Model3DViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-[#A87C4F]/30 border-t-[#721832] animate-spin" />
      </div>
    ),
  }
);
import { 
  Heart, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Star,
  Award,
  MessageSquareHeart,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Baby,
  Sprout,
  Calendar,
  X
} from 'lucide-react';

// Family story images from assets4
import storiesImage from '../../assets4/stories image.jpg';
import storiesJpeg from '../../assets4/stories.jpeg';
import storyJpeg from '../../assets4/story.jpeg';
import s1Img from '../../assets4/s1.jpg';
import s2Img from '../../assets4/s2.jpg';
import s3Img from '../../assets4/s3.jpg';
import s4Img from '../../assets4/s4.jpeg';
import s5Img from '../../assets4/s5.jpg';
import s6Img from '../../assets4/s6.jpg';

import { useQuickEnquiry } from '../../context/QuickEnquiryContext';
import { Scroll01, Scroll01Item } from '@/components/ui/scroll-01';
import BeamBorder from '@/components/ui/border-beam';

// Founder & Care Team sticky scroll data for Section 01 & 02
const founderCareItems: Scroll01Item[] = [
  {
    title: 'Meet Ms Jemma Francis',
    subtitle: 'Founder & Visionary',
    description:
      'Ms Jemma Francis began SEYOL with a deep desire to support mothers and families during one of the most important phases of their lives. Having seen the gaps in traditional care and the challenges modern families face, she envisioned a platform that brings together trusted care, cultural wisdom and practical support.',
    quote: 'I started SEYOL because every mother deserves to feel supported, and every child deserves the best possible start.',
    author: 'Ms Jemma Francis',
    media: '/images/our-story/founder.png',
    mediaClassName: 'object-cover object-top',
  },
  {
    title: 'Ms Janet Francis',
    subtitle: 'Mother & Daughter Care Team',
    description:
      'Ms Janet Francis, with her lived experience and deep understanding of traditional care, brings warmth, wisdom and hands-on guidance to SEYOL. Together with Ms Jemma, they form a dedicated mother-daughter team, united by a shared purpose — to care for families with heart and integrity.',
    media: '/images/our-story/co-founder.png',
    mediaClassName: 'object-cover object-top',
  },
];

// Milestones timeline data
const milestones = [
  {
    year: '2020',
    title: 'The Idea',
    desc: 'A vision to support families better.',
  },
  {
    year: '2021',
    title: 'The Beginning',
    desc: 'SEYOL was founded with the first services.',
  },
  {
    year: '2022',
    title: 'Growing Support',
    desc: 'Expanded services and reached more families.',
  },
  {
    year: '2023',
    title: 'Wider Impact',
    desc: 'Built a trusted network and community.',
  },
  {
    year: '2024+',
    title: 'Looking Ahead',
    desc: 'More services, more families, greater impact.',
  },
];

// Testimonials data for auto-scrolling rail
const familyStories = [
  {
    id: 1,
    tag: 'Prenatal & Doula Blessing',
    quote: 'From my third trimester until delivery, having SEYOL beside me completely eased my anxieties. The gentle emotional reassurance and traditional wisdom helped me feel calm, prepared, and safe throughout pregnancy.',
    image: storiesImage,
  },
  {
    id: 2,
    tag: 'Sacred Postpartum Confinement',
    quote: 'SEYOL felt like having an experienced elder from our own family at home. The daily herbal recovery baths, soothing body massage, and warm nutritious broths made our first month as new parents deeply peaceful.',
    image: storiesJpeg,
  },
  {
    id: 3,
    tag: 'Newborn Care & Golden Month',
    quote: 'As first-time parents holding our tiny baby, we were anxious about everything from sleep to latching. Our caregiver stepped in with gentle hands, teaching us swaddling, burping, and newborn handling with pure love.',
    image: storyJpeg,
  },
  {
    id: 4,
    tag: 'Intergenerational Harmony',
    quote: 'The harmony between traditional South Indian confinement customs and modern sterile practices won over our entire family. Even my mother and mother-in-law were moved by the utmost respect, hygiene, and tireless care.',
    image: s1Img,
  },
  {
    id: 5,
    tag: 'Holistic Family Support',
    quote: 'Our entire home blossomed with joy during our postpartum month. The daily restorative massages, herbal abdomen wraps, and soothing bath rituals brought deep healing to both mother and baby.',
    image: s2Img,
  },
  {
    id: 6,
    tag: 'Maternal Mental Health & Recovery',
    quote: 'Beyond the physical healing, it was the compassionate listening and emotional grounding during the fragile post-delivery weeks that made the biggest difference. SEYOL is truly a godsend for new mothers.',
    image: s3Img,
  },
  {
    id: 7,
    tag: 'Infant Bath & Colic Soothing',
    quote: 'Our baby struggled with colic and restless evenings. Within days of SEYOL’s gentle tummy massage and rhythmic soothing rituals, our little one was smiling, calm, and sleeping peacefully.',
    image: s4Img,
  },
  {
    id: 8,
    tag: 'Postnatal Healing & Nutrition',
    quote: 'Every single day of our 40-day care was managed with flawless dedication. The warm herbal decoctions, pelvic recovery care, and infant bonding rituals restored my strength and energy completely.',
    image: s5Img,
  },
  {
    id: 9,
    tag: 'Lactation & Nurturing Touch',
    quote: 'Watching how intuitively and tenderly our caregiver comforted and held our baby melted our hearts. Her guidance on lactation, gentle baths, and infant wellness gave us complete peace of mind.',
    image: s6Img,
  },
];

export default function OurStoryPage() {
  const { openEnquiry } = useQuickEnquiry();
  const [activeEcosystemIdx, setActiveEcosystemIdx] = useState<number>(4);
  const [selectedStory, setSelectedStory] = useState<(typeof familyStories)[number] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.8;

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF6F0] text-[#3A1D1D] antialiased selection:bg-[#721832] selection:text-white">

      {/* ========================================================================= */}
      {/* HERO SECTION — WITH INTERACTIVE 3D BABY MODEL */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#FAF5EE] text-[#3A1D1D] min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex items-center pt-24 pb-12 sm:pt-26 sm:pb-14 lg:pt-28 lg:pb-16 border-b border-[#EAE1D5]">
        
        {/* Soft Ambient Background Elements */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#EADCCB]/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#FAF0E4]/60 blur-3xl" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading & Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left max-w-xl">
              {/* Badge / Kicker */}
              <div className="inline-flex items-center space-x-3">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8C6D4F] uppercase">
                  OUR STORY
                </span>
                <span className="w-14 sm:w-20 h-[1.5px] bg-[#A87C4F]/60" />
              </div>

              {/* Two-Tone Distinctive Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.12]">
                <span className="block text-[#721832]">Rooted in Tradition.</span>
                <span className="block font-serif italic text-[#A87C4F] font-normal mt-1">
                  Designed for Today&apos;s
                </span>
                <span className="block font-serif italic text-[#A87C4F] font-normal">
                  Families.
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#5C4541] leading-relaxed max-w-md pt-1">
                SEYOL was born from a simple belief — every mother and child deserves gentle, informed and consistent care. We bring together traditional wisdom and modern support to help families through every stage of their journey.
              </p>

              {/* Action Button */}
              <div className="pt-3">
                <a
                  href="#meet-jemma"
                  className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#721832] hover:bg-[#5a0c24] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive 3D Baby Model */}
            <div className="lg:col-span-5 flex items-center justify-center relative w-full">
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#A87C4F]/15 via-[#E8C5A5]/25 to-transparent blur-3xl pointer-events-none" />
              <Model3DViewer
                modelUrl="/models/tiny_wonder.glb?v=3"
                className="w-full h-[440px] sm:h-[500px] lg:h-[540px]"
              />
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 01 & 02 — MEET MS JEMMA FRANCIS & A MOTHER-DAUGHTER CARE TEAM (SCROLL-01) */}
      {/* ========================================================================= */}
      <section id="meet-jemma" className="py-14 sm:py-18 lg:py-20 border-b border-[#EAE1D5] scroll-mt-16 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Scroll01 items={founderCareItems} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — WHY SEYOL EXISTS */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-b border-[#EAE1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Photo of Mother Leaning Over Baby */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#F2EAE0] relative">
                <Image
                  src="/images/our-story/why-seyol-care.jpg"
                  alt="Mother gently embracing and comforting sleeping newborn baby"
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 320px"
                  priority
                />
              </div>
            </div>

            {/* Right Story */}
            <div className="md:col-span-8 space-y-5 text-left">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#721832] tracking-tight">
                  Why SEYOL Exists
                </h2>
                <div className="font-serif italic text-xs sm:text-sm text-[#A87C4F] font-medium">
                  The gap we saw. The support we provide.
                </div>
              </div>

              <div className="space-y-2.5 font-sans text-xs sm:text-sm md:text-base text-[#5C4541] leading-relaxed">
                <p>
                  When a mother is preparing for birth or caring for a new baby, having the right support around her can make all the difference. For families who value traditional Indian mother and baby care, finding that kind of trusted and professional support is not always easy.
                </p>
                <p>
                  SEYOL was created to give families a place they can confidently turn to, dependable and centred around their needs during pregnancy, birth and the early months with baby.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — THE SEYOL METHOD */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-b border-[#EAE1D5] bg-[#F7F1E7]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

          {/* Section Header */}
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#721832] tracking-tight">
              The SEYOL Method
            </h2>
            <div className="font-serif italic text-sm sm:text-base text-[#A87C4F] font-medium">
              Care with Intention. Rooted in Tradition.
            </div>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#5C4541] leading-relaxed pt-1">
              We bring the wisdom of traditional Indian mother and baby care together with the needs of modern families — thoughtful, reassuring, and rooted in three guiding principles:
            </p>
          </div>

          {/* 3 Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Card 1: Personalised Care */}
            <BeamBorder
              size="md"
              colorVariant="maroon"
              theme="light"
              borderRadius={24}
              beamWidth={2}
              strength={1.5}
              duration={4.2}
              style={{ '--rim-inner-opacity': 0.12 } as React.CSSProperties}
              className="h-full rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-[#FAF5ED] rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] text-center space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full border border-[#721832]/30 flex items-center justify-center text-[#721832] bg-white/70 shadow-xs">
                    <Heart className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#721832]">
                      Personalised Care
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#6E5551] leading-relaxed">
                      Every family&apos;s journey is unique. We take the time to understand individual needs and provide support that feels personal, thoughtful, and relevant to each family.
                    </p>
                  </div>
                </div>
              </div>
            </BeamBorder>

            {/* Card 2: Tradition Meets Modern Life */}
            <BeamBorder
              size="md"
              colorVariant="maroon"
              theme="light"
              borderRadius={24}
              beamWidth={2}
              strength={1.5}
              duration={4.8}
              style={{ '--rim-inner-opacity': 0.12 } as React.CSSProperties}
              className="h-full rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-[#FAF5ED] rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] text-center space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full border border-[#721832]/30 flex items-center justify-center text-[#721832] bg-white/70 shadow-xs">
                    <Leaf className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#721832]">
                      Tradition Meets Modern Life
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#6E5551] leading-relaxed">
                      We value the knowledge and practices passed down through generations, adapting traditional care to fit the realities of today&apos;s families and lifestyles.
                    </p>
                  </div>
                </div>
              </div>
            </BeamBorder>

            {/* Card 3: Family-Centred Support */}
            <BeamBorder
              size="md"
              colorVariant="maroon"
              theme="light"
              borderRadius={24}
              beamWidth={2}
              strength={1.5}
              duration={5.4}
              style={{ '--rim-inner-opacity': 0.12 } as React.CSSProperties}
              className="h-full rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-[#FAF5ED] rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] text-center space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full border border-[#721832]/30 flex items-center justify-center text-[#721832] bg-white/70 shadow-xs">
                    <Users className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#721832]">
                      Family-Centred Support
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#6E5551] leading-relaxed">
                      Care goes beyond the mother and baby. We recognise the importance of family, emotional reassurance, and creating a supportive environment throughout the journey.
                    </p>
                  </div>
                </div>
              </div>
            </BeamBorder>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — FROM SERVICES TO A CARE ECOSYSTEM */}
      {/* ========================================================================= */}
      <section id="ecosystem" className="py-14 sm:py-18 lg:py-22 border-b border-[#EAE1D5] bg-[#FBF7F0]/60 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
          
          {/* Centered Section Header */}
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#721832] tracking-tight leading-[1.15]">
              From Services to a Care Ecosystem
            </h2>
            <div className="font-serif italic text-base sm:text-lg text-[#A87C4F] font-medium">
              More than one service. A complete circle of care.
            </div>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#5C4541] leading-relaxed pt-1">
              What began as a single service has grown into a holistic care ecosystem — supporting families at every stage with thoughtful, continuous care.
            </p>
          </div>

          {/* Bottom Row: 5 Connected Service Cards */}
          <div className="relative pt-2">
            {/* Continuous Connecting Track Line (Desktop) */}
            <div 
              className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[8%] right-[8%] h-[2px] bg-[#D4BA9E] z-0 pointer-events-none" 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8 relative z-10">
              {[
                {
                  id: 'mother-baby',
                  title: 'Mother &\nBaby Care',
                  image: '/images/our-story/ecosystem-mother-baby.png?v=thin-2',
                },
                {
                  id: 'consultation',
                  title: 'Consultation &\nGuidance',
                  image: '/images/our-story/ecosystem-consultation.png?v=thin-2',
                },
                {
                  id: 'family-support',
                  title: 'Family Support\nServices',
                  image: '/images/our-story/ecosystem-family-support.png?v=thin-2',
                },
                {
                  id: 'wellness-recovery',
                  title: 'Wellness &\nRecovery',
                  image: '/images/our-story/ecosystem-wellness.png?v=thin-2',
                },
                {
                  id: 'postpartum-support',
                  title: 'Postpartum\nSupport',
                  image: '/images/our-story/ecosystem-postpartum.png?v=thin-2',
                },
              ].map((service, idx) => {
                const isActive = activeEcosystemIdx === idx;
                return (
                  <div
                    key={service.id}
                    onClick={() => setActiveEcosystemIdx(idx)}
                    className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-between h-[225px] select-none ${
                      isActive
                        ? 'bg-[#721832] text-white shadow-xl ring-2 ring-[#A87C4F]/70'
                        : 'bg-[#FAF5ED] text-[#721832] border border-[#E6D9C8] hover:shadow-md hover:border-[#A87C4F]/50'
                    }`}
                  >
                    {/* Inter-card Connector line and dot to next card (Desktop) */}
                    {idx < 4 && (
                      <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-6 lg:w-8 items-center justify-center pointer-events-none z-20">
                        <div className="w-full h-[2px] bg-[#D4BA9E]" />
                        <span className="absolute w-2.5 h-2.5 rounded-full bg-[#A87C4F] ring-2 ring-[#FAF5ED] shadow-xs" />
                      </div>
                    )}

                    {/* Circular Logo/Icon Container */}
                    <div
                      className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center p-3 transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-md border-2 border-[#A87C4F]'
                          : 'bg-[#FBF1EA] border border-[#F0DFD0] shadow-2xs'
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title.replace('\n', ' ')}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain brightness-0"
                      />
                    </div>

                    {/* Service Title */}
                    <h3 className={`font-serif font-bold text-sm sm:text-[15px] leading-snug whitespace-pre-line text-center my-auto transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-[#721832]'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Small Accent Line at Bottom */}
                    <div
                      className="w-7 h-[2px] rounded-full mx-auto mt-2 transition-colors duration-300"
                      style={{ backgroundColor: isActive ? '#E8C5A5' : '#C29B72' }}
                    />
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — OUR JOURNEY SO FAR */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-b border-[#EAE1D5] bg-[#F7F1E7]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          {/* Section Header */}
          <div className="space-y-1 text-left">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#721832] tracking-tight">
              Our Journey So Far
            </h2>
            <div className="font-serif italic text-xs sm:text-sm text-[#A87C4F] font-medium">
              Small steps. Big milestones.
            </div>
          </div>

          {/* Milestone Timeline */}
          <div className="relative">
            {/* Desktop View (md: and up) — Alternating Top & Bottom with Continuous Forward Arrow */}
            <div className="hidden md:block relative">
              {/* Baseline running through all dots with arrow at the end */}
              <div className="flex items-center absolute top-[124px] left-3.5 right-0 -translate-y-1/2 z-0 pointer-events-none">
                {/* Solid burgundy line */}
                <div className="h-[2px] bg-[#721832]/25 flex-1" />
                {/* Arrowhead indicating continuous journey into the future */}
                <svg 
                  className="w-4 h-4 text-[#721832] -ml-1 flex-shrink-0" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="4,2 14,8 4,14" />
                </svg>
              </div>

              {/* 5-Column Alternating Grid */}
              <div className="grid grid-cols-5 gap-4 lg:gap-6 relative z-10">
                {milestones.map((milestone, idx) => {
                  const isTop = idx % 2 === 1; // Odd indices (1, 3: 2021, 2023) -> Top; Even (0, 2, 4: 2020, 2022, 2024+) -> Bottom
                  const isCurrent = idx === 4; // 2024+ Looking Ahead

                  return (
                    <div key={idx} className="group flex flex-col text-left select-none">
                      {/* Top Slot (h-[110px]) */}
                      {isTop ? (
                        <div className="h-[110px] flex flex-col justify-end pb-3 space-y-1">
                          <div className="font-serif font-black text-sm lg:text-base text-[#721832] group-hover:text-[#A87C4F] transition-colors duration-200">
                            {milestone.year}
                          </div>
                          <div className="font-sans font-bold text-xs sm:text-sm text-[#4A3531]">
                            {milestone.title}
                          </div>
                          <p className="font-sans text-[11px] sm:text-xs text-[#6E5551] leading-relaxed">
                            {milestone.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="h-[110px]" />
                      )}

                      {/* Middle Dot Slot (h-7 = 28px) */}
                      <div className="h-7 flex items-center justify-start">
                        <div
                          className={`w-7 h-7 rounded-full border-2 border-[#721832] flex items-center justify-center shadow-xs transition-all duration-300 z-10 ${
                            isCurrent
                              ? 'bg-[#721832] text-white ring-4 ring-[#721832]/20 scale-105'
                              : 'bg-[#FAF5ED] text-[#721832] group-hover:scale-115 group-hover:bg-[#721832] group-hover:text-white'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                        </div>
                      </div>

                      {/* Bottom Slot (h-[110px]) */}
                      {!isTop ? (
                        <div className="h-[110px] pt-3 space-y-1">
                          <div className="font-serif font-black text-sm lg:text-base text-[#721832] group-hover:text-[#A87C4F] transition-colors duration-200">
                            {milestone.year}
                          </div>
                          <div className="font-sans font-bold text-xs sm:text-sm text-[#4A3531]">
                            {milestone.title}
                          </div>
                          <p className="font-sans text-[11px] sm:text-xs text-[#6E5551] leading-relaxed">
                            {milestone.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="h-[110px]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile View (< md) — Clean Vertical Connected Timeline with Forward Arrow at Bottom */}
            <div className="md:hidden space-y-6 relative border-l-2 border-[#721832]/30 ml-3.5 pl-6 pt-1 pb-4">
              {milestones.map((milestone, idx) => {
                const isCurrent = idx === 4;
                return (
                  <div key={idx} className="relative space-y-1 text-left">
                    {/* Dot anchored to vertical line */}
                    <div
                      className={`absolute -left-[35px] top-0.5 w-5 h-5 rounded-full border-2 border-[#721832] flex items-center justify-center ${
                        isCurrent ? 'bg-[#721832] text-white' : 'bg-[#FAF5ED] text-[#721832]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>
                    <div className="font-serif font-black text-sm text-[#721832]">
                      {milestone.year}
                    </div>
                    <div className="font-sans font-bold text-xs text-[#4A3531]">
                      {milestone.title}
                    </div>
                    <p className="font-sans text-[11px] text-[#6E5551] leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                );
              })}

              {/* Mobile vertical line downward arrow */}
              <div className="absolute -left-[5px] bottom-0 translate-y-full pt-0.5">
                <svg className="w-2.5 h-2.5 text-[#721832]" viewBox="0 0 16 16" fill="currentColor">
                  <polygon points="2,4 8,14 14,4" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — RECOGNITION & TRUST */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#EAE1D5] bg-[#FAF6F0] relative overflow-hidden">
        
        {/* Soft Warm Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-[#FAF0E4]/70 blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#EADCCB]/50 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">

          {/* Top Story & Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Narrative, Typography & Media Prestige */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Kicker */}
              <div className="inline-flex items-center space-x-3">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8C6D4F] uppercase">
                  RECOGNITION &amp; TRUST
                </span>
                <span className="w-16 sm:w-24 h-[1.5px] bg-[#A87C4F]/60" />
              </div>

              {/* Two-Tone Master Headline (Website Brand Colors: Maroon & Gold) */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight leading-[1.14]">
                <span className="block text-[#721832]">Care You Can Trust.</span>
                <span className="block font-serif italic text-[#A87C4F] font-normal mt-1">
                  A Tradition You Can Believe In.
                </span>
              </h2>

              {/* Narrative Paragraph */}
              <p className="font-sans text-sm sm:text-[15px] md:text-base text-[#5C4541] leading-relaxed max-w-xl">
                At SEYOL, trust is built through thoughtful care, transparency, and a deep respect for traditional Indian mother and baby care practices. We are committed to creating meaningful experiences for mothers and babies through quality, compassion, and a family-first approach.
              </p>

            </div>

            {/* Right: Portrait Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] sm:max-w-[370px] group">
                
                {/* Decorative Subtle Maroon/Gold Halo Backdrop */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#721832]/15 via-[#A87C4F]/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Portrait Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F2EAE0]">
                  <Image
                    src="/images/our-story/hero-mother-baby-portrait.jpg"
                    alt="Seyol traditional maternal and baby care"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 340px, 370px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

          </div>

          {/* Bottom: Dynamic Full-Width Stats Strip (Website Warm Cream & Maroon Theme) */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FAF5ED] via-[#FFFDF9] to-[#FAF5ED] border border-[#E8DFD3] p-5 sm:p-7 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#E8DFD3]">
              
              {/* Stat 1: 10,000+ Happy Families */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:px-5 lg:px-7 group">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#721832] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#721832] tracking-tight leading-none">
                    10,000+
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#5C4541] font-sans font-medium mt-1.5">
                    Happy Families
                  </div>
                </div>
              </div>

              {/* Stat 2: 50+ Traditional Care Products */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:px-5 lg:px-7 group">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF0E4] border border-[#E8DFD3] flex items-center justify-center text-[#721832] shadow-2xs group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.7]" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#721832] tracking-tight leading-none">
                    50+
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#5C4541] font-sans font-medium mt-1.5">
                    Traditional Care Products
                  </div>
                </div>
              </div>

              {/* Stat 3: 4.8/5 Customer Rating */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:px-5 lg:px-7 group">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#721832] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#721832] tracking-tight leading-none">
                    4.8/5
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#5C4541] font-sans font-medium mt-1.5">
                    Customer Rating
                  </div>
                </div>
              </div>

              {/* Stat 4: 100% Mother & Baby Focused */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:px-5 lg:px-7 group">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#721832] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Sprout className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#721832] tracking-tight leading-none">
                    100%
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#5C4541] font-sans font-medium mt-1.5">
                    Mother &amp; Baby Focused
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — FAMILIES WE HAVE WALKED WITH */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20 border-b border-[#EAE1D5] bg-[#F7F1E7]/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Section Header (Centered) */}
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#721832] tracking-tight">
              Families We Have Walked With
            </h2>
            <div className="font-serif italic text-xs sm:text-sm text-[#A87C4F] font-medium">
              Real stories. Lasting bonds.
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#5C4541] leading-relaxed pt-1">
              Every family&apos;s journey is unique, and we&apos;re honoured to be a part of it. Here are genuine experiences from the families who trusted SEYOL.
            </p>
          </div>
        </div>

        {/* Auto-scrolling Rail */}
        <div className="relative mt-8">
          {/* Subtle Gradient Edge Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent z-10" />

          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-4 sm:px-8 select-none cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...familyStories, ...familyStories].map((story, idx) => (
              <div
                key={`${story.id}-${idx}`}
                onClick={() => setSelectedStory(story)}
                className="w-[290px] sm:w-[340px] md:w-[370px] shrink-0 bg-[#FAF5ED] rounded-3xl p-5 sm:p-6 border border-[#E8DFD3] shadow-xs hover:shadow-md hover:border-[#A87C4F]/50 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Clean Image */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F2EAE0] border border-white/60 shadow-xs mb-4">
                  <Image
                    src={story.image}
                    alt="SEYOL Family Story"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 290px, 370px"
                  />
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-xs sm:text-[14px] text-[#4A3531] leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* View More Stories Button (Below the cards) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 flex items-center justify-center text-center">
          <button
            type="button"
            onClick={() => openEnquiry({ serviceTitle: 'Families We Have Walked With - Story Consultation' })}
            className="group inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-[#721832] hover:bg-[#5a0c24] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <span>View More Stories</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Optional Story Detail Modal / Lightbox */}
        {selectedStory && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className="bg-[#FAF5ED] rounded-3xl max-w-lg w-full overflow-hidden border border-[#E8DFD3] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-64 sm:h-72 bg-[#F2EAE0]">
                <Image
                  src={selectedStory.image}
                  alt="SEYOL Family Story"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-6 space-y-4">
                <p className="font-serif italic text-sm sm:text-base text-[#4A3531] leading-relaxed">
                  &ldquo;{selectedStory.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-[#EAE1D5] flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStory(null);
                      openEnquiry({ serviceTitle: 'Story Consultation' });
                    }}
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#721832] text-white text-xs font-semibold hover:bg-[#5a0c24] transition-colors"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 09 — BEGIN YOUR SEYOL JOURNEY (HERITAGE BOTTOM CTA BANNER) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl overflow-hidden border border-[#EAE1D5] shadow-sm bg-[#FAF6F0] min-h-[440px] sm:min-h-[480px] flex items-center">
            
            {/* Background Image: Mother & Baby in warm maroon and cream palette */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <Image
                src="/images/our-story/begin-seyol-journey-clean.jpg"
                alt="Mother and sleeping newborn baby"
                fill
                priority
                unoptimized
                className="object-cover object-right md:object-[right_center]"
              />
              {/* Soft progressive fade gradient so text remains ultra legible across all screen sizes */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/95 sm:via-[#FAF6F0]/85 md:via-[#FAF6F0]/30 to-transparent w-full md:w-[68%]" />
            </div>

            {/* Foreground Content Container (constrained width so it never overlaps the mother's shoulder) */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14 max-w-xl md:max-w-2xl lg:max-w-[620px] w-full text-left space-y-4 sm:space-y-5">
              
              {/* Top Botanical Emblem (Gold & Maroon) */}
              <div className="inline-flex items-center space-x-3">
                <span className="w-12 sm:w-16 h-[1.5px] bg-[#A87C4F]/60" />
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#721832]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 23 C16 16, 11 9, 16 4 C21 9, 16 16, 16 23 Z" />
                  <path d="M16 23 C11 21, 6 15, 7 9 C13 9, 15 16, 16 23 Z" />
                  <path d="M16 23 C21 21, 26 15, 25 9 C19 9, 17 16, 16 23 Z" />
                </svg>
                <span className="w-12 sm:w-16 h-[1.5px] bg-[#A87C4F]/60" />
              </div>

              {/* Two-Tone Master Headline (Website Brand Colors: Maroon & Gold) */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight leading-[1.14]">
                <span className="block text-[#721832]">Begin Your</span>
                <span className="block mt-1">
                  <span className="text-[#721832]">SEYOL</span>{' '}
                  <span className="font-serif italic text-[#A87C4F] font-normal">Journey</span>
                </span>
              </h2>

              {/* Narrative Description (Brand Text Color) */}
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#5C4541] leading-relaxed max-w-md sm:max-w-lg">
                Every mother deserves gentle care and support. Let us guide you through your postnatal recovery and newborn care journey with personalised care at home.
              </p>

              {/* 3 Action Buttons (Maroon, Cream & Gold brand palette) */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 max-w-lg">
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#721832] hover:bg-[#5a0c24] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/services#packages"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white hover:bg-[#FAF5ED] text-[#721832] border border-[#721832]/35 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-2xs group"
                >
                  <span>View Our Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#721832]/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>

                <button
                  type="button"
                  onClick={() => openEnquiry({ serviceTitle: 'Free Consultation' })}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#A87C4F] hover:bg-[#92693D] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white shrink-0" />
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
