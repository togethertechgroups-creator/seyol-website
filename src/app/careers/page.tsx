'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Globe,
  DollarSign,
  Star,
  Check
} from 'lucide-react';
import { caregiverPathwaysList, inTrainingCoursesData } from '../../data/careers';
import { SeyolCareerPathwayId } from '../../types';
import { CaregiverApplicationWizard } from '../../components/interactive/CaregiverApplicationWizard';
import CareerGrowthExpectations from '../../components/interactive/CareerGrowthExpectations';
import WhatSEYOLLooksFor from '../../components/interactive/WhatSEYOLLooksFor';
import StayConnectedResources from '../../components/interactive/StayConnectedResources';

export default function CareersPage() {
  const [selectedPathwayId, setSelectedPathwayId] = useState<SeyolCareerPathwayId>('pathway-1-foundation');
  const [expandedCourseId, setExpandedCourseId] = useState<string>('course-foundation');
  const applySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pathway = params.get('pathway');
      if (pathway === 'practical-confinement-care' || pathway === 'pathway-2-practical') {
        setSelectedPathwayId('pathway-2-practical');
        if (window.location.hash === '#apply-wizard' && applySectionRef.current) {
          setTimeout(() => {
            applySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else if (pathway === 'foundation' || pathway === 'pathway-1-foundation') {
        setSelectedPathwayId('pathway-1-foundation');
      } else if (pathway === 'experienced' || pathway === 'pathway-3-experienced') {
        setSelectedPathwayId('pathway-3-experienced');
      } else if (pathway === 'certified' || pathway === 'pathway-4-certified') {
        setSelectedPathwayId('pathway-4-professional');
      }
    }
  }, []);

  const handleSelectPathway = (pathwayId: SeyolCareerPathwayId) => {
    setSelectedPathwayId(pathwayId);
    if (applySectionRef.current) {
      applySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* 1. Hero Header - Learn with SEYOL. Grow with SEYOL. */}
      <section className="relative overflow-hidden bg-[#5A1224] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#3D0A17]">
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8A253D]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#3D0A17]/50 blur-3xl pointer-events-none" />

        <div className="max-w-[96%] xl:max-w-[94%] 2xl:max-w-[1700px] mx-auto relative z-10 space-y-12 sm:space-y-14">
          
          {/* Main 2-Column Hero: Content on Left, Training Photo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              <span className="inline-block text-[11px] sm:text-xs font-medium uppercase tracking-[2.5px] text-[#ECCEC6]">
                CAREERS &amp; TRAINING AT SEYOL
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-white tracking-tight leading-[1.18]">
                Learn with SEYOL. Grow with SEYOL.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#F2E2DD] leading-relaxed max-w-xl font-light">
                Learn the art of traditional Indian mother and baby care. Build practical skills, grow your confidence, and discover opportunities to build a meaningful career with SEYOL.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <a
                  href="#training-courses"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FAF0EB] hover:bg-white text-[#5A1224] font-semibold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Training</span>
                  <ArrowRight className="w-4 h-4 text-[#5A1224]" />
                </a>

                <a
                  href="#choose-path"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/60 hover:border-white transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Careers</span>
                </a>
              </div>
            </div>

            {/* Right Column: Training Session Photo */}
            <div className="lg:col-span-5 relative w-full max-w-sm sm:max-w-md lg:max-w-[420px] mx-auto">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)] aspect-[4/3.6] sm:aspect-[4/3.8] lg:aspect-[4/3.7] max-h-[400px] bg-[#3D0A17]">
                <img
                  src="/assets4/career_hero_section.jpg"
                  alt="SEYOL practical mother and newborn care hands-on assessment training"
                  className="w-full h-full object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A1224]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Quick Pillars Strip - Continuous Infinite Scrolling */}
          <div className="relative w-full overflow-hidden pt-4 border-t border-white/15 select-none">
            {/* Edge fade gradients */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#5A1224] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#5A1224] to-transparent z-10" />

            <div className="flex w-max group">
              {[0, 1].map((setIdx) => (
                <div
                  key={setIdx}
                  aria-hidden={setIdx === 1 ? true : undefined}
                  className="flex shrink-0 gap-3.5 pr-3.5 animate-pillars-scroll group-hover:[animation-play-state:paused]"
                >
                  {[
                    { title: '4 Flexible Pathways', desc: 'From complete beginners to certified pros', icon: <Briefcase className="w-4 h-4 text-[#FAF0EB]" /> },
                    { title: 'Accredited In-Training', desc: 'Foundation & Practical hands-on tracks', icon: <Award className="w-4 h-4 text-[#E8C07A]" /> },
                    { title: 'Cross-Border Placements', desc: 'Singapore, Malaysia & India assignments', icon: <Globe className="w-4 h-4 text-[#FAF0EB]" /> },
                    { title: 'Respect & Fair Wages', desc: 'High earning potential & welfare coverage', icon: <ShieldCheck className="w-4 h-4 text-[#E8C07A]" /> },
                    { title: '4 Flexible Pathways', desc: 'From complete beginners to certified pros', icon: <Briefcase className="w-4 h-4 text-[#FAF0EB]" /> },
                    { title: 'Accredited In-Training', desc: 'Foundation & Practical hands-on tracks', icon: <Award className="w-4 h-4 text-[#E8C07A]" /> },
                    { title: 'Cross-Border Placements', desc: 'Singapore, Malaysia & India assignments', icon: <Globe className="w-4 h-4 text-[#FAF0EB]" /> },
                    { title: 'Respect & Fair Wages', desc: 'High earning potential & welfare coverage', icon: <ShieldCheck className="w-4 h-4 text-[#E8C07A]" /> },
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="w-[280px] sm:w-[310px] shrink-0 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 shadow-xs flex items-start space-x-3 text-left transition-colors hover:bg-white/15"
                    >
                      <div className="p-2 rounded-xl bg-white/15 border border-white/10 shrink-0 mt-0.5">
                        {pillar.icon}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs text-white">{pillar.title}</div>
                        <div className="text-[11px] text-[#EAD7D0] leading-snug mt-0.5 whitespace-normal">{pillar.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <style>{`
              @keyframes pillarsScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
              .animate-pillars-scroll {
                animation: pillarsScroll 28s linear infinite;
              }
            `}</style>
          </div>

        </div>
      </section>

      {/* 2. Choose Your Path Section */}
      <section id="choose-path" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
            Find the Pathway Matched to Your Experience
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted">
            Select your starting point below to view training curricula, requirements, and apply directly.
          </p>
        </div>

        {/* 4 Pathway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {caregiverPathwaysList.map((path) => {
            const isSelected = selectedPathwayId === path.id;
            return (
              <div
                key={path.id}
                onClick={() => handleSelectPathway(path.id)}
                className={`bg-cream-light rounded-3xl border p-6 flex flex-col justify-between shadow-warm-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-maroon ring-2 ring-maroon/20 shadow-warm-md bg-gradient-to-b from-cream-light to-maroon-soft/30'
                    : 'border-cream-border hover:border-gold/80'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{path.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected ? 'bg-maroon text-cream-light' : 'bg-gold/20 text-maroon'
                    }`}>
                      {path.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-brown leading-snug">
                      {path.title}
                    </h3>
                    <div className="text-xs font-semibold text-maroon mt-0.5">
                      {path.subtitle}
                    </div>
                  </div>

                  <p className="text-xs text-brown-muted leading-relaxed">
                    {path.targetAudience}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-1.5 pt-3 border-t border-cream-border text-xs text-brown">
                    {path.keyBenefits.slice(0, 2).map((ben, i) => (
                      <div key={i} className="flex items-start space-x-1.5 text-brown-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                        <span className="line-clamp-2 text-[11px]">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-cream-border mt-4">
                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors ${
                      isSelected
                        ? 'bg-maroon text-cream-light shadow-sm'
                        : 'bg-cream text-brown border border-cream-border hover:bg-cream-dark'
                    }`}
                  >
                    <span>{isSelected ? 'Selected Track' : 'Select Track & Apply'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LEARN WITH SEYOL - Explore SEYOL In-House Training (Pathway 1 & Pathway 2) */}
      <section id="training-courses" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 border-y border-cream-border">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              LEARN WITH SEYOL
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
              Explore SEYOL In-House Training
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Build your knowledge, strengthen your practical skills and discover the right learning pathway for your journey in confinement care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {inTrainingCoursesData.map((course) => {
              const isFoundation = course.id === 'course-foundation';
              return (
                <div
                  key={course.id}
                  className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 shadow-warm-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-gold text-maroon-dark text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        {isFoundation ? 'Foundation Course (Pathway 1)' : 'Practical Practicum (Pathway 2)'}
                      </span>
                      <span className="text-xs text-brown-muted font-bold flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-maroon" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                        {course.title}
                      </h3>
                      <div className="text-xs text-maroon font-semibold mt-0.5">{course.subtitle}</div>
                      <p className="text-xs sm:text-sm text-brown-muted mt-2 leading-relaxed">
                        {course.summary}
                      </p>
                    </div>

                    {/* Mode & Prerequisites */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-cream p-4 rounded-2xl border border-cream-border">
                      <div>
                        <div className="text-[10px] font-bold uppercase text-brown-muted">Training Mode</div>
                        <div className="font-semibold text-brown mt-0.5">{course.mode}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-brown-muted">Qualification Earned</div>
                        <div className="font-bold text-maroon mt-0.5">{course.qualification}</div>
                      </div>
                    </div>

                  </div>

                  {/* Prerequisite & Action Button */}
                  <div className="pt-4 border-t border-cream-border space-y-3.5">
                    <div className="text-xs text-brown-muted leading-relaxed">
                      <strong className="text-brown font-semibold">Prerequisite:</strong> {course.prerequisites}
                    </div>

                    <div>
                      {isFoundation ? (
                        <Link
                          href="/careers/foundation-confinement-care"
                          className="w-full py-3 px-6 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-sm transition-all flex items-center justify-center space-x-2 text-center group cursor-pointer"
                        >
                          <span>View Foundation Training</span>
                          <ArrowRight className="w-4 h-4 text-cream-light group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <Link
                          href="/careers/practical-confinement-care"
                          className="w-full py-3 px-6 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-sm transition-all flex items-center justify-center space-x-2 text-center group cursor-pointer"
                        >
                          <span>View Practical Course</span>
                          <ArrowRight className="w-4 h-4 text-cream-light group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Not Sure Where to Start? Callout Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-[#651F32] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-warm-md space-y-5">
          <div className="space-y-2">
            <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#EAD7D0] leading-relaxed max-w-3xl">
              Choose a pathway based on your existing certification and hands-on experience. SEYOL can review your background and guide you towards a suitable next step.
            </p>
          </div>

          <div>
            <a
              href="#choose-path"
              className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#ECECEC] hover:bg-white text-[#333333] font-medium text-xs sm:text-sm md:text-base flex items-center justify-center space-x-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Find Your Pathway</span>
              <ArrowRight className="w-4 h-4 text-[#333333]" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Career Growth & Expectations Section */}
      <CareerGrowthExpectations />

      {/* 6. What SEYOL Looks For Section */}
      <WhatSEYOLLooksFor />

      {/* 6. Interactive Caregiver Application Wizard Section */}
      <section ref={applySectionRef} id="apply-wizard" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
            Start Your SEYOL Caregiver Application
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted max-w-xl mx-auto">
            Fill out your details, verify your pathway, and submit for evaluation. Our admissions matrons review submissions within 48 hours.
          </p>
        </div>

        <CaregiverApplicationWizard
          initialPathwayId={selectedPathwayId}
        />
      </section>

      {/* 7. Caregiver Benefits & Remuneration */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 border-t border-cream-border">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">Why Practice with SEYOL</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
              Professional Respect, Fair Remuneration & Growth
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              We treat our confinement specialists and matrons with the highest dignity and industry-leading compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Industry-Leading Pay',
                desc: 'Earn SGD $3,200 – $4,800+ / MYR RM8,500 – RM14,000+ / INR ₹60,000 – ₹1,00,000+ per assignment.',
                icon: <DollarSign className="w-5 h-5 text-gold-dark" />
              },
              {
                title: 'Welfare & Insurance',
                desc: 'Full medical, personal accident, and professional liability protection provided on all assignments.',
                icon: <ShieldCheck className="w-5 h-5 text-maroon" />
              },
              {
                title: 'Respectful Families',
                desc: 'Pre-screened client homes with private accommodations and fair working hour agreements.',
                icon: <Heart className="w-5 h-5 text-gold-dark" />
              },
              {
                title: 'Senior Matron Mentorship',
                desc: '24/7 on-call clinical escalation support from Ms Jemma and Ms Janet Francis during assignments.',
                icon: <Users className="w-5 h-5 text-maroon" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-cream-light p-6 rounded-3xl border border-cream-border space-y-3 shadow-warm-sm">
                <div className="w-10 h-10 rounded-2xl bg-cream border border-cream-border flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-serif font-bold text-base text-brown">{item.title}</h4>
                <p className="text-xs text-brown-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions for Caregivers */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream border-t border-cream-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">Admissions FAQ</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Common questions on training cohorts, work passes, and interview protocols.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is the difference between Pathway 1 and Pathway 2?',
                a: 'Pathway 1 (Foundation) is tailored for individuals with zero prior confinement background who wish to learn from scratch. Pathway 2 (Practical) is for individuals who already have a nursing or childcare certificate and want hands-on practical baby massage, bath hold, and confinement cookery training.'
              },
              {
                q: 'How does SEYOL arrange work permits for Singapore and Malaysia?',
                a: 'For international assignments, SEYOL handles all regulatory work permit filings (e.g. Confinement Nanny Work Permits in Singapore / Malaysian pass extensions) and travel clearances with approved family hosts.'
              },
              {
                q: 'Why is attending an interview mandatory in the application form?',
                a: 'Caregiving in private homes involves deep trust and infant vulnerability. We conduct friendly 30-minute video or in-person screening interviews to evaluate hygiene understanding, empathy, and communication skills before admitting any candidate.'
              },
              {
                q: 'How soon will I be placed with families after completing training?',
                a: 'Graduates of SEYOL In-House Training with passing evaluations are immediately added to our active roster and typically receive their first client assignment match within 2 to 4 weeks.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-cream-light rounded-2xl p-5 border border-cream-border space-y-2 shadow-warm-sm">
                <h4 className="font-serif font-bold text-sm sm:text-base text-brown">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Stay Connected with SEYOL & Resources */}
      <StayConnectedResources />
    </div>
  );
}
