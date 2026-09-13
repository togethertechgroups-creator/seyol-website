'use client';

import React, { useState, useRef } from 'react';
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

export default function CareersPage() {
  const [selectedPathwayId, setSelectedPathwayId] = useState<SeyolCareerPathwayId>('pathway-1-foundation');
  const [expandedCourseId, setExpandedCourseId] = useState<string>('course-foundation');
  const applySectionRef = useRef<HTMLDivElement>(null);

  const handleSelectPathway = (pathwayId: SeyolCareerPathwayId) => {
    setSelectedPathwayId(pathwayId);
    if (applySectionRef.current) {
      applySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark/60 via-cream-light to-cream py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        {/* Subtle decorative blurs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-maroon/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider shadow-warm-sm">
            <GraduationCap className="w-4 h-4 text-gold-dark" />
            <span>SEYOL Academy of Maternal & Infant Care</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-brown tracking-tight leading-tight">
            Elevate Your Vocation in <br />
            <span className="text-maroon">Traditional & Modern Confinement Care</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brown-muted max-w-3xl mx-auto leading-relaxed">
            Whether you are stepping into infant care for the first time, have course credentials, or bring decades of rich practical wisdom, SEYOL provides tailored pathways, accredited in-training courses, and placements across Singapore, Malaysia, and India.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl mx-auto text-left">
            {[
              { title: '4 Flexible Pathways', desc: 'From complete beginners to certified pros', icon: <Briefcase className="w-4 h-4 text-maroon" /> },
              { title: 'Accredited In-Training', desc: 'Foundation & Practical hands-on tracks', icon: <Award className="w-4 h-4 text-gold-dark" /> },
              { title: 'Cross-Border Placements', desc: 'Singapore, Malaysia & India assignments', icon: <Globe className="w-4 h-4 text-maroon" /> },
              { title: 'Respect & Fair Wages', desc: 'High earning potential & welfare coverage', icon: <ShieldCheck className="w-4 h-4 text-gold-dark" /> }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-cream-light/90 p-3.5 rounded-2xl border border-cream-border shadow-warm-sm flex items-start space-x-2.5">
                <div className="p-2 rounded-xl bg-cream border border-cream-border shrink-0 mt-0.5">
                  {pillar.icon}
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-brown">{pillar.title}</div>
                  <div className="text-[11px] text-brown-muted leading-tight mt-0.5">{pillar.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#choose-path"
              className="px-7 py-3.5 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <span>Explore the 4 Pathways</span>
              <ArrowRight className="w-4 h-4 text-gold-light" />
            </a>

            <a
              href="#training-courses"
              className="px-7 py-3.5 rounded-2xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>View In-Training Courses</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Choose Your Path Section */}
      <section id="choose-path" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Choose Your Entry Route</span>
          </div>
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

      {/* 3. SEYOL In-Training Courses Showcase (Pathway 1 & Pathway 2) */}
      <section id="training-courses" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 border-y border-cream-border">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-maroon" />
              <span>Certified Curriculum</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown">
              SEYOL In-Training Courses
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Explore our structured academy programs designed to build safe clinical habits and authentic South Indian maternal wellness expertise.
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

                    {/* Curriculum Modules */}
                    <div className="space-y-3 pt-2">
                      <div className="font-serif font-bold text-sm text-brown flex items-center space-x-1.5">
                        <BookOpen className="w-4 h-4 text-gold-dark" />
                        <span>Curriculum Modules:</span>
                      </div>

                      <div className="space-y-2.5">
                        {course.curriculum.map((mod, idx) => (
                          <div key={idx} className="bg-cream p-3 rounded-xl border border-cream-border text-xs space-y-1">
                            <div className="font-bold text-maroon">{mod.title}</div>
                            <div className="space-y-0.5 text-brown-muted text-[11px]">
                              {mod.topics.map((top, tIdx) => (
                                <div key={tIdx} className="flex items-start space-x-1.5">
                                  <span className="text-gold-dark font-bold">•</span>
                                  <span>{top}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-cream-border flex items-center justify-between">
                    <div className="text-xs text-brown-muted">
                      <strong>Prerequisite:</strong> {course.prerequisites}
                    </div>

                    <button
                      onClick={() => handleSelectPathway(course.pathwayId)}
                      className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shrink-0 shadow-sm transition-all"
                    >
                      Apply for {isFoundation ? 'Pathway 1' : 'Pathway 2'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Caregiver Application Wizard Section */}
      <section ref={applySectionRef} id="apply-wizard" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-gold-dark" />
            <span>Online Application Portal</span>
          </div>
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

      {/* 5. Caregiver Benefits & Remuneration */}
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

      {/* 6. Frequently Asked Questions for Caregivers */}
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
                a: 'Graduates of SEYOL In-Training Courses with passing evaluations are immediately added to our active roster and typically receive their first client assignment match within 2 to 4 weeks.'
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
    </div>
  );
}
