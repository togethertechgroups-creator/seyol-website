'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Video,
  Award,
  Star,
  Flower2,
  Heart,
  Baby,
  ShieldCheck,
  Compass,
  MessageCircle
} from 'lucide-react';
import { LearningNeedFinder } from '../../components/interactive/LearningNeedFinder';
import { ClassFinder } from '../../components/interactive/ClassFinder';
import { PopularClassesShowcase } from '../../components/interactive/PopularClassesShowcase';
import { ClassComparisonCards } from '../../components/interactive/ClassComparisonCards';
import { ClassExperiencePreview } from '../../components/interactive/ClassExperiencePreview';
import { ClassCalendar } from '../../components/interactive/ClassCalendar';
import { ClassMethodDifference } from '../../components/interactive/ClassMethodDifference';
import { ClassRegistrationSteps } from '../../components/interactive/ClassRegistrationSteps';
import { AccordionFAQ } from '../../components/shared/AccordionFAQ';
import { TestimonialCarousel } from '../../components/shared/TestimonialCarousel';
import { ContactForm } from '../../components/shared/ContactForm';
import { EmailCapture } from '../../components/shared/EmailCapture';
import { JourneyStage } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export default function ClassesPage() {
  const { openEnquiry } = useQuickEnquiry();
  const [activeStageFilter, setActiveStageFilter] = useState<JourneyStage>('all');

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#2a0c16] via-[#3b0f20] to-[#220710] text-cream-light py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-gold/30 overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-maroon-light/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cream-light/10 backdrop-blur-md text-gold-light text-xs font-bold uppercase tracking-widest border border-gold/40 shadow-warm-sm">
            <BookOpen className="w-4 h-4 text-gold-light" />
            <span>Empowering Hands-On Parenthood Workshops</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Master the Sacred Art of <br className="hidden sm:inline" />
            <span className="text-gold-light">Newborn Care &amp; Birth Wisdom</span>
          </h1>

          <p className="font-playfair text-sm sm:text-base md:text-lg text-cream-light/90 max-w-2xl mx-auto leading-relaxed">
            Replace fear and sleepless anxiety with joyful confidence. Learn traditional infant bodywork, colic soothing, physiological birth mechanics, and breastfeeding latches in live interactive cohorts.
          </p>

          {/* Value Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-cream-light font-medium pt-2">
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Partner Admitted Free with Every Pass</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Weighted Doll Simulation &amp; Live Form Check</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Lifetime HD Recording &amp; Printable Blueprints</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#calendar"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-maroon-dark font-extrabold text-xs sm:text-sm tracking-wide shadow-warm-lg hover:scale-105 transition-all cursor-pointer"
            >
              Browse Upcoming Calendar
            </a>

            <button
              onClick={() => openEnquiry({ serviceTitle: 'Masterclass Consultation' })}
              className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-cream-light border border-gold/50 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
            >
              Consult an Educator
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CHOOSE BY LEARNING STAGE                                       */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Stage-Based Learning</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Choose by Learning Stage
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Select where you are in your parenthood timeline to view classes tailored to your exact milestone.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { id: 'all', label: 'All Learning Stages', icon: Sparkles, desc: 'Complete course catalog' },
              { id: 'pregnancy', label: 'Pregnancy & Birth Prep', icon: Heart, desc: 'Trimester 2 & 3 cohorts' },
              { id: 'newborn', label: 'Newborn Bath & Care', icon: Baby, desc: '0–6 months infant skills' },
              { id: 'postpartum', label: 'Postpartum Healing', icon: Flower2, desc: 'Sacred 40-day recovery' },
            ].map((st) => {
              const Icon = st.icon;
              const isActive = activeStageFilter === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setActiveStageFilter(st.id as JourneyStage);
                    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between space-y-2 cursor-pointer ${
                    isActive
                      ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm scale-[1.02]'
                      : 'bg-cream-light text-brown border-cream-border hover:bg-cream-dark'
                  }`}
                >
                  <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-white/10 text-gold-light' : 'bg-cream text-maroon'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm leading-snug">{st.label}</h3>
                    <p className={`text-[10px] mt-0.5 ${isActive ? 'text-cream-light/80' : 'text-brown-muted'}`}>
                      {st.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TELL US WHAT YOU WANT TO LEARN (Interactive Need Matcher)       */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <LearningNeedFinder />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: EXPLORE SEYOL CLASSES (Main Directory with Clean Cards)         */}
      {/* ========================================================================= */}
      <section id="directory" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Workshop Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Explore SEYOL Classes
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Search by keyword, filter by live online format or in-person Chennai studio cohorts.
            </p>
          </div>

          <ClassFinder externalStageFilter={activeStageFilter} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: POPULAR CLASSES PARENTS START WITH (High-Conversion Cards)     */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <PopularClassesShowcase />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: NOT SURE WHICH CLASS FITS? (Interactive Comparison Cards)      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Side-by-Side Comparison</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Not Sure Which Class Fits?
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Compare our practical workshops and bundle passes to pick the best path for your family.
            </p>
          </div>

          <ClassComparisonCards />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: PREVIEW THE SEYOL LEARNING EXPERIENCE (Video & Moments)        */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <ClassExperiencePreview />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: CLASS CALENDAR & ONLINE REGISTRATION (Interactive Schedule)    */}
      {/* ========================================================================= */}
      <section id="calendar" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cream-light/60 border-b border-cream-border">
        <div className="site-container mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Scheduled Cohorts</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Class Calendar &amp; Online Registration
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Select your preferred date, view remaining seat availability, and lock in your couple pass instantly.
            </p>
          </div>

          <ClassCalendar />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: WHAT MAKES SEYOL CLASSES DIFFERENT (Teaching Philosophy)       */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <ClassMethodDifference />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: HOW CLASS REGISTRATION WORKS (Visual 4-Step Process)          */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <ClassRegistrationSteps />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: TRUSTED BY PARENTS AND LEARNERS (Facilitators & Reviews)      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60 space-y-12">
        
        {/* Facilitators Spotlight */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Master Facilitators</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Trusted by Parents and Learners
            </h2>
            <p className="font-playfair text-xs sm:text-sm md:text-base text-brown-muted max-w-xl mx-auto">
              Learn directly from certified childbirth educators, registered midwives, and master infant touch specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Instructor 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border flex space-x-4 items-start shadow-warm-sm hover:border-gold/60 transition-all">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                alt="Ms Jemma Francis"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-gold/40 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <h3 className="font-serif text-lg font-bold text-maroon">Ms. Jemma Francis</h3>
                <div className="font-semibold text-brown">Co-Founder &amp; Master Infant Touch Educator</div>
                <div className="text-gold-dark font-medium">Certified IAIM Educator • 18+ Years Experience</div>
                <p className="text-brown-muted pt-1 leading-relaxed">
                  Pioneer in modernising traditional Indian infant touch and postnatal confinement bodywork. Has trained over 3,000+ parents and certified 200+ confinement matrons.
                </p>
              </div>
            </div>

            {/* Instructor 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border flex space-x-4 items-start shadow-warm-sm hover:border-gold/60 transition-all">
              <img
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=300"
                alt="Ms Janet Francis"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-gold/40 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <h3 className="font-serif text-lg font-bold text-maroon">Ms. Janet Francis</h3>
                <div className="font-semibold text-brown">Co-Founder &amp; Clinical Midwife Specialist</div>
                <div className="text-gold-dark font-medium">Registered Midwife &amp; IBCLC Lactation Consultant</div>
                <p className="text-brown-muted pt-1 leading-relaxed">
                  Over two decades of clinical labour ward experience in India and abroad, championing calm physiological birth, partner coaching, and gentle lactation mechanics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="pt-6">
          <TestimonialCarousel filterStage="all" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: QUICK ANSWERS BEFORE YOU REGISTER (Accordion FAQ)              */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brown tracking-tight">
              Quick Answers Before You Register
            </h2>
            <p className="font-playfair text-xs sm:text-sm text-brown-muted">
              Everything you need to know regarding ticket passes, replay access, simulation materials, and partner attendance.
            </p>
          </div>

          <AccordionFAQ defaultCategory="classes" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13: NEED HELP CHOOSING A CLASS? SEYOL WILL GUIDE YOU (Contact)     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full border-b border-cream-border/60 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-gold-dark" />
              <span>Personalized Class Concierge</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
              Need Help Choosing a Class? SEYOL Will Guide You.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brown-muted">
              Tell us your due date, baby age, or topics of interest, and our education coordinators will guide you to the ideal cohort.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14: YOUR FIRST SEYOL RESOURCE (Free E-Books & Checklists)         */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
              <span>Complimentary Knowledge</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brown">
              Your First SEYOL Resource
            </h2>
            <p className="font-playfair text-xs sm:text-sm text-brown-muted">
              Download our expert-crafted checklists, newborn bath guides, and postpartum recovery handbooks.
            </p>
          </div>

          <EmailCapture />
        </div>
      </section>

    </div>
  );
}
