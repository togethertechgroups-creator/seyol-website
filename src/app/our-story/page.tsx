'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Flower2, 
  Heart, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Users,
  ArrowRight,
  ChevronDown,
  Quote,
  User,
  Star,
  Check,
  Crown
} from 'lucide-react';
import { TrustBadges } from '../../components/shared/TrustBadges';

import { Model3DViewer } from '../../components/shared/Model3DViewer';

export default function OurStoryPage() {
  const [activeFounder, setActiveFounder] = useState<'jemma' | 'janet'>('jemma');
  const [activeSubTab, setActiveSubTab] = useState<'story' | 'mission' | 'credentials'>('story');

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Hero Section */}
      <section className="bg-cream-dark/40 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        <div className="max-w-4xl mx-auto text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
            <Flower2 className="w-3.5 h-3.5 text-gold-dark" />
            <span>The Heart of SEYOL</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brown tracking-tight leading-tight">
            Rooted in Tradition. <br />
            <span className="text-maroon">Refined by Clinical Excellence.</span>
          </h1>

          <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-2xl mx-auto leading-relaxed">
            Founded with a singular, sacred conviction: that the mother who gives birth deserves the exact same reverence, continuous physical nurturing, and tenderness as the newborn in her arms.
          </p>
        </div>
      </section>

      {/* The SEYOL Origin Story & The Sacred Meaning */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Our Sacred Origin</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown leading-tight">
                Welcome to <span className="text-maroon">SEYOL</span>
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-gold-dark uppercase tracking-wider">
                Pregnancy Care Services • Where Life&apos;s Journey is Celebrated
              </div>
            </div>

            <p className="font-playfair text-sm sm:text-base text-brown leading-relaxed font-medium">
              Born in Singapore, our family-owned sanctuary is fueled by a passion for exceptional pregnancy care, woven with unconditional love, ancestral traditions, and clinical excellence.
            </p>

            {/* Key Highlights Grid */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-cream-light border border-cream-border/80">
                <div className="w-8 h-8 rounded-xl bg-gold/20 text-maroon flex items-center justify-center shrink-0 mt-0.5">
                  <Flower2 className="w-4 h-4 text-maroon" />
                </div>
                <div className="text-xs text-brown leading-relaxed">
                  <strong className="text-maroon font-bold">God of Newborns: </strong>
                  Derived from an Ancient Tamil word signifying divine protection and guidance for infants from conception to childbirth.
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-cream-light border border-cream-border/80">
                <div className="w-8 h-8 rounded-xl bg-maroon-soft text-maroon flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-maroon" />
                </div>
                <div className="text-xs text-brown leading-relaxed">
                  <strong className="text-maroon font-bold">Holistic Family Care: </strong>
                  Founded by certified birth doulas and educators to walk beside mothers throughout every sacred milestone of motherhood.
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-maroon font-serif italic bg-gold/10 p-4 rounded-2xl border border-gold/30 shadow-2xs">
              &ldquo;Embrace the warmth of Indian tradition coupled with our passion and dedication at SEYOL, your trusted partner in the beautiful journey to parenthood!&rdquo;
            </p>
          </div>

          <div className="md:col-span-6">
            <Model3DViewer
              modelUrl="/models/cradled_in_love.glb"
              className="w-full h-[560px] sm:h-[620px]"
            />
          </div>
        </div>
      </section>

      {/* Our History, Growth & Milestones Story Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 border-t border-cream-border">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Our Evolutionary Path</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brown">
              The Journey of SEYOL
            </h2>
            <p className="font-playfair text-xs sm:text-sm text-brown-muted">
              From Singapore origins to empowering thousands of mothers globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Our History */}
            <div className="bg-cream-light rounded-3xl p-7 sm:p-8 border border-cream-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 text-maroon flex items-center justify-center border border-gold/40 shadow-xs">
                  <Clock className="w-6 h-6 text-maroon" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                  Est. 2017
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                  Our History
                </h3>
                <p className="font-playfair text-xs sm:text-sm text-brown-muted leading-relaxed">
                  In 2017, Mrs. Jemma Francis, our founder, envisioned SEYOL as a Traditional Indian haven for expectant mothers. Mrs. Francis, having experienced four cesarean deliveries herself, was dedicated to improving traditional maternal well-being globally. This dedication laid the foundation for SEYOL, which has since become synonymous with exceptional care, unwavering support, and excellence in pregnancy services.
                </p>
              </div>
            </div>

            {/* Our Growth */}
            <div className="bg-cream-light rounded-3xl p-7 sm:p-8 border border-cream-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-maroon-soft text-maroon flex items-center justify-center border border-maroon/20 shadow-xs">
                  <Users className="w-6 h-6 text-maroon" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon">
                  Evolution &amp; Trust
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                  Our Growth
                </h3>
                <p className="font-playfair text-xs sm:text-sm text-brown-muted leading-relaxed">
                  From our modest beginnings, we grew alongside the families we served. As the demand for personalized pregnancy care increased, so did our commitment to providing comprehensive services that cater to the diverse needs of expectant parents. This evolution saw us expanding our team of skilled professionals and embracing innovative approaches to enhance the pregnancy journey.
                </p>
              </div>
            </div>

            {/* Our Milestones */}
            <div className="bg-cream-light rounded-3xl p-7 sm:p-8 border border-cream-border shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 text-maroon flex items-center justify-center border border-gold/40 shadow-xs">
                  <Award className="w-6 h-6 text-maroon" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                  Celebrated Achievements
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                  Our Milestones
                </h3>
                <p className="font-playfair text-xs sm:text-sm text-brown-muted leading-relaxed">
                  Over the years, SEYOL has celebrated numerous milestones, each marked by the joyous moments shared with our clients. Whether it&apos;s the launching of a new website or being interviewed by newspapers and media, every achievement is a testament to our unwavering dedication to advancing maternal health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profiles: Interactive Tabbed Layout (Full Screen & Balanced Height) */}
      <section id="founders" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream/40 border-y border-cream-border relative overflow-hidden scroll-mt-20">
        {/* Elegant Botanical Floral & Lotus Blossom Accents */}
        <div className="absolute -top-4 -left-4 w-72 h-72 sm:w-88 sm:h-88 opacity-30 pointer-events-none text-maroon select-none">
          <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Center Sacred Lotus Blossom */}
            <path d="M120 70 C105 100 100 135 120 155 C140 135 135 100 120 70 Z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 155 C90 145 75 115 85 90 C100 115 112 135 120 155 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 155 C150 145 165 115 155 90 C140 115 128 135 120 155 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 155 C70 155 55 130 60 110 C80 128 102 145 120 155 Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 155 C170 155 185 130 180 110 C160 128 138 145 120 155 Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Lotus Base / Calyx */}
            <path d="M95 158 C108 166 132 166 145 158 C135 170 105 170 95 158 Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.06" strokeLinecap="round" strokeLinejoin="round" />
            {/* Elegant Stem & Leaves */}
            <path d="M120 168 C118 195 105 215 85 230" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M112 188 C90 182 72 190 68 200 C80 206 100 200 110 193" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M116 205 C130 208 148 200 152 190 C138 185 122 195 116 205" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
            {/* Floral Buds & Tendrils */}
            <path d="M102 115 C85 95 70 90 62 96 C62 108 80 118 98 122" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="60" cy="94" r="4.5" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
            <circle cx="180" cy="94" r="4.5" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
            <path d="M138 115 C155 95 170 90 178 96 C178 108 160 118 142 122" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute -top-4 -right-4 w-76 h-76 sm:w-92 sm:h-92 opacity-30 pointer-events-none text-maroon select-none">
          <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Sacred Flower Blossom (Right) */}
            <g transform="translate(130, 90) scale(0.95)">
              {/* Petals */}
              <path d="M0 -45 C-12 -25 -10 0 0 0 C10 0 12 -25 0 -45 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
              <path d="M40 -20 C22 -12 8 -2 0 0 C8 8 28 8 40 -20 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
              <path d="M30 32 C18 16 6 4 0 0 C-4 8 -6 28 30 32 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
              <path d="M-30 32 C-18 16 -6 4 0 0 C4 8 6 28 -30 32 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
              <path d="M-40 -20 C-22 -12 -8 -2 0 0 C-8 8 -28 8 -40 -20 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
              {/* Center pistil */}
              <circle cx="0" cy="0" r="7" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12" />
              <circle cx="0" cy="0" r="2.5" fill="currentColor" />
            </g>
            {/* Blooming Secondary Flower Bud */}
            <g transform="translate(65, 140) scale(0.65) rotate(-35)">
              <path d="M0 -40 C-10 -20 -8 0 0 0 C8 0 10 -20 0 -40 Z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.06" />
              <path d="M25 -15 C12 -8 5 -2 0 0 C5 5 18 5 25 -15 Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M-25 -15 C-12 -8 -5 -2 0 0 C-5 5 -18 5 -25 -15 Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            </g>
            {/* Connecting Vine and Botanical Leaves */}
            <path d="M130 90 C100 115 80 135 65 140 C45 150 25 185 20 215" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M98 116 C85 96 68 95 60 102 C68 115 84 122 96 118" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 155 C35 148 20 155 18 165 C30 170 45 166 52 155" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 185 C55 182 70 190 72 200 C58 205 44 198 38 185" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.04" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="max-w-[1400px] w-full mx-auto space-y-7 sm:space-y-9 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 px-4 py-1 rounded-full bg-white/90 text-maroon text-[11px] font-semibold uppercase tracking-wider border border-cream-border shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-maroon fill-maroon/10" />
              <span className="font-bold tracking-widest text-brown">OUR STORY</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown tracking-tight leading-tight">
              Meet Ms Jemma Francis &amp;{' '}
              <span className="relative inline-block">
                Ms Janet Francis
                {/* Hand-drawn pink brush underline effect */}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#f2b8c6] -z-10" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M2 5.5C50 2 150 2 198 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="font-playfair text-xs sm:text-sm text-brown-muted max-w-xl mx-auto leading-relaxed">
              Pioneering compassionate maternal advocacy and traditional infant touch across South India for over 18 years.
            </p>
          </div>

          {/* Toggle Switcher: Ms Jemma Francis / Ms Janet Francis */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 bg-[#f4efe6]/90 backdrop-blur-xs rounded-full border border-cream-border shadow-2xs gap-1">
              <button
                type="button"
                onClick={() => setActiveFounder('jemma')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFounder === 'jemma'
                    ? 'bg-[#7b1131] text-white shadow-md'
                    : 'text-brown hover:text-maroon'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Ms Jemma Francis</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFounder('janet')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFounder === 'janet'
                    ? 'bg-[#7b1131] text-white shadow-md'
                    : 'text-brown hover:text-maroon'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Ms Janet Francis</span>
              </button>
            </div>
          </div>

          {/* Main Full-Width 2-Column Profile & Story Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full">
            {/* Left Column: Portrait Card (lg:col-span-4) */}
            <div className="lg:col-span-4 flex justify-center w-full">
              {activeFounder === 'jemma' ? (
                <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-warm-md border border-cream-border/90 flex flex-col justify-between w-full transition-all duration-300">
                  <div className="space-y-4">
                    {/* Balanced Height Portrait Image with Orange Crown Badge */}
                    <div className="rounded-2xl overflow-hidden h-56 sm:h-60 w-full bg-cream-dark relative shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                        alt="Mrs. Jemma Francis"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#f69d3c] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center space-x-1.5">
                        <Crown className="w-3.5 h-3.5 text-white fill-white" />
                        <span>FOUNDER</span>
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center space-x-1.5">
                        <h3 className="font-bold text-xl text-neutral-900 tracking-tight leading-snug">
                          Mrs. Jemma Francis
                        </h3>
                        <svg
                          style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }}
                          className="text-amber-500 fill-amber-500 shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">
                        BIRTH &amp; POSTPARTUM DOULA • CHILDBIRTH EDUCATOR
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm font-bold text-neutral-900">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          <span>32K+</span>
                        </div>
                        <div className="text-[10px] text-neutral-500 font-medium">Families Supported</div>
                      </div>
                      <div className="text-center border-l border-neutral-100">
                        <div className="flex items-center justify-center space-x-1 text-sm font-bold text-neutral-900">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>7+</span>
                        </div>
                        <div className="text-[10px] text-neutral-500 font-medium">Years Experience</div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href="/contact"
                    className="mt-4 w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#faeee4] hover:bg-[#f5e2d3] text-maroon text-xs font-bold transition-all duration-200"
                  >
                    <span>View Care Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-maroon" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-warm-md border border-cream-border/90 flex flex-col justify-between w-full transition-all duration-300">
                  <div className="space-y-4">
                    {/* Balanced Height Portrait Image with Orange Crown Badge */}
                    <div className="rounded-2xl overflow-hidden h-56 sm:h-60 w-full bg-cream-dark relative shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800"
                        alt="Ms. Janet Francis"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#f69d3c] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center space-x-1.5">
                        <Crown className="w-3.5 h-3.5 text-white fill-white" />
                        <span>CO-FOUNDER</span>
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center space-x-1.5">
                        <h3 className="font-bold text-xl text-neutral-900 tracking-tight leading-snug">
                          Ms. Janet Francis
                        </h3>
                        <svg
                          style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }}
                          className="text-amber-500 fill-amber-500 shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">
                        CERTIFIED BIRTH &amp; POSTPARTUM DOULA
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm font-bold text-neutral-900">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          <span>28K+</span>
                        </div>
                        <div className="text-[10px] text-neutral-500 font-medium">Families Supported</div>
                      </div>
                      <div className="text-center border-l border-neutral-100">
                        <div className="flex items-center justify-center space-x-1 text-sm font-bold text-neutral-900">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>10+</span>
                        </div>
                        <div className="text-[10px] text-neutral-500 font-medium">Years Experience</div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href="/contact"
                    className="mt-4 w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#faeee4] hover:bg-[#f5e2d3] text-maroon text-xs font-bold transition-all duration-200"
                  >
                    <span>View Care Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-maroon" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: Detailed Story Card with Sub-tabs and Aside (lg:col-span-8) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-warm-md border border-cream-border/90 h-full flex flex-col justify-between space-y-5">
                {/* Sub-tabs header */}
                <div className="flex items-center space-x-6 sm:space-x-8 border-b border-neutral-100 pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('story')}
                    className={`text-xs sm:text-sm font-bold pb-2 -mb-3 transition-colors cursor-pointer ${
                      activeSubTab === 'story'
                        ? 'text-[#7b1131] border-b-2 border-[#7b1131]'
                        : 'text-brown-muted hover:text-brown'
                    }`}
                  >
                    Her Story
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('mission')}
                    className={`text-xs sm:text-sm font-bold pb-2 -mb-3 transition-colors cursor-pointer ${
                      activeSubTab === 'mission'
                        ? 'text-[#7b1131] border-b-2 border-[#7b1131]'
                        : 'text-brown-muted hover:text-brown'
                    }`}
                  >
                    Mission &amp; Vision
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('credentials')}
                    className={`text-xs sm:text-sm font-bold pb-2 -mb-3 transition-colors cursor-pointer ${
                      activeSubTab === 'credentials'
                        ? 'text-[#7b1131] border-b-2 border-[#7b1131]'
                        : 'text-brown-muted hover:text-brown'
                    }`}
                  >
                    Credentials
                  </button>
                </div>

                {/* Content Area split into Story (left) and Aside Card (right) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left side of story card: Story text */}
                  <div className="md:col-span-7 space-y-3">
                    {activeSubTab === 'story' && (
                      activeFounder === 'jemma' ? (
                        <>
                          <div className="text-3xl text-maroon font-serif leading-none font-black">““</div>
                          <p className="font-serif italic font-bold text-xs sm:text-sm text-brown leading-relaxed">
                            &ldquo;Greetings, I&apos;m Jemma Francis – a dedicated Birth and Postpartum Doula, as well as a Childbirth Educator.
                          </p>
                          <p className="font-playfair text-xs sm:text-sm text-brown-muted leading-relaxed">
                            It brings me immense joy to reflect on the journey of the company I established seven years ago. Over this time, I&apos;ve had the privilege of supporting numerous families worldwide in embracing and cherishing the joys of parenthood.
                          </p>
                          <p className="font-semibold text-maroon text-xs sm:text-sm pt-0.5">
                            I am here to extend my support to you as well.&rdquo;
                          </p>

                          <div className="pt-2">
                            <Link
                              href="/contact"
                              className="inline-flex items-center space-x-2 text-xs font-bold text-maroon hover:text-maroon-dark transition-colors"
                            >
                              <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                                <Flower2 className="w-3 h-3 text-gold-dark" />
                              </span>
                              <span className="underline decoration-gold/60 underline-offset-4">SEYOL Founder&apos;s Vision →</span>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-3xl text-maroon font-serif leading-none font-black">““</div>
                          <p className="font-serif italic font-bold text-xs sm:text-sm text-brown leading-relaxed">
                            &ldquo;Hello, I&apos;m Janet Francis - a Certified Birth and Postpartum Doula.
                          </p>
                          <p className="font-playfair text-xs sm:text-sm text-brown-muted leading-relaxed">
                            My involvement in this meaningful work began at the age of 16 when I eagerly started assisting my mother. Learning from her wealth of experience, I&apos;ve acquired valuable insights, allowing me to independently support many families on their parenthood journeys.
                          </p>
                          <p className="font-semibold text-maroon text-xs sm:text-sm pt-0.5">
                            I take great pride in dedicating myself to making a positive impact on the significant aspect of family lives of others.&rdquo;
                          </p>

                          <div className="pt-2">
                            <Link
                              href="/contact"
                              className="inline-flex items-center space-x-2 text-xs font-bold text-maroon hover:text-maroon-dark transition-colors"
                            >
                              <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                                <Flower2 className="w-3 h-3 text-gold-dark" />
                              </span>
                              <span className="underline decoration-gold/60 underline-offset-4">Next-Gen Maternal Care →</span>
                            </Link>
                          </div>
                        </>
                      )
                    )}

                    {activeSubTab === 'mission' && (
                      <div className="space-y-2.5 font-playfair text-xs sm:text-sm text-brown leading-relaxed">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-maroon">Our Sacred Mission</h4>
                        <p>
                          To restore revered traditional postpartum healing to modern families worldwide with clinical safety, unconditional tenderness, and dedicated doula bedside advocacy.
                        </p>
                        <p className="text-brown-muted">
                          Every mother deserves sacred confinement care that honors her physical recovery, emotional sanctity, and lifelong bond with her infant.
                        </p>
                      </div>
                    )}

                    {activeSubTab === 'credentials' && (
                      <div className="space-y-2.5 text-xs sm:text-sm text-brown leading-relaxed">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-maroon">Certified Professional Standing</h4>
                        <ul className="space-y-2 text-brown-muted">
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Certified Birth &amp; Postpartum Doula (DONA / CAPPA Standards)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Childbirth Educator &amp; Lactation Specialist</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Infant CPR, First Aid &amp; SCAR Recovery Certified</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right side of story card: Aside About Card */}
                  <div className="md:col-span-5 bg-[#fbf9f5] rounded-2xl p-4 sm:p-5 border border-cream-border/70 space-y-3.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-maroon">
                        <User className="w-3.5 h-3.5 text-maroon" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900">
                        About {activeFounder === 'jemma' ? 'Jemma' : 'Janet'}
                      </h4>
                    </div>

                    <ul className="space-y-2 text-[11px] sm:text-xs text-neutral-700 font-medium leading-snug">
                      {activeFounder === 'jemma' ? (
                        <>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Certified Birth &amp; Postpartum Doula</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Childbirth Educator</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Specialized in holistic maternal care</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Passionate about empowering mothers</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Advocate for natural &amp; informed birth</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Certified Birth &amp; Postpartum Doula</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>10+ Years Dedicated Experience</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Mentored by Master Postnatal Practitioners</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Personalized Family Confinement Specialist</span>
                          </li>
                          <li className="flex items-start space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                            <span>Infant Bodywork &amp; Lactation Guidance</span>
                          </li>
                        </>
                      )}
                    </ul>

                    <div className="pt-2 border-t border-cream-border/60 flex items-center justify-between">
                      <div className="text-[10px] font-medium text-neutral-500">
                        Years of Compassionate Care:
                      </div>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-cream-border text-maroon text-[11px] font-bold shadow-2xs">
                        <Heart className="w-3 h-3 text-maroon fill-maroon/20" />
                        <span>{activeFounder === 'jemma' ? '7+ Years' : '10+ Years'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-cream-border/80 shadow-2xs w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-maroon shrink-0">
                <Heart className="w-4.5 h-4.5 text-maroon" />
              </div>
              <div className="text-xs font-bold text-brown leading-tight">
                18+ Years of <br />
                <span className="text-brown-muted font-normal text-[11px]">Compassionate Care</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-maroon shrink-0">
                <Users className="w-4.5 h-4.5 text-maroon" />
              </div>
              <div className="text-xs font-bold text-brown leading-tight">
                Trusted by Thousands <br />
                <span className="text-brown-muted font-normal text-[11px]">of Families</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-maroon shrink-0">
                <Award className="w-4.5 h-4.5 text-maroon" />
              </div>
              <div className="text-xs font-bold text-brown leading-tight">
                Certified Doulas &amp; <br />
                <span className="text-brown-muted font-normal text-[11px]">Educators</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center text-maroon shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-maroon" />
              </div>
              <div className="text-xs font-bold text-brown leading-tight">
                Holistic Support for <br />
                <span className="text-brown-muted font-normal text-[11px]">Every Stage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The SEYOL Care Ecosystem Timeline */}
      <section id="method" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-gold-dark" />
            <span>The Care Journey</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
            How We Walk Beside You
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted">
            From the second trimester through baby’s first year milestones.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              phase: 'Weeks 16 – 28 of Pregnancy',
              title: 'Prenatal Nurturing & Birth Education',
              desc: 'Side-lying prenatal massage to release sciatic tension, coupled with interactive childbirth classes and birth preference mapping.',
            },
            {
              phase: 'Weeks 37 – Delivery',
              title: 'On-Call Doula & Labour Advocacy',
              desc: 'Continuous bedside physical counterpressure, breathing coaching, and golden-hour bonding assistance in hospital.',
            },
            {
              phase: 'Day 1 – 40 Postpartum',
              title: 'The Sacred Confinement Mandalam',
              desc: 'Daily in-home maternal bodywork, Vethu Kuli herbal baths, belly binding, lactation latch checks, and gentle infant massage.',
            },
            {
              phase: 'Month 2 – 12',
              title: 'Newborn Milestone Bodywork & Respite',
              desc: 'Infant growth massage (Bala Ashwagandha oils), sleep routine establishment, and on-demand hourly respite support.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-cream-light p-6 rounded-2xl border border-cream-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-warm-sm"
            >
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                  {item.phase}
                </div>
                <h3 className="font-serif font-bold text-base text-brown">{item.title}</h3>
                <p className="text-xs text-brown-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges variant="full" />
    </div>
  );
}
