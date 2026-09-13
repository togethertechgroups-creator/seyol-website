'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Award,
  Baby,
  Heart,
  Flower2,
  BookOpen
} from 'lucide-react';
import { classesData } from '../../data/classes';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

interface LearningNeed {
  id: string;
  label: string;
  icon: any;
  subtext: string;
  matchedClassId: string;
  keyBenefit: string;
}

const LEARNING_NEEDS: LearningNeed[] = [
  {
    id: 'baby-bath-massage',
    label: 'Baby Massage, Bath & Colic Relief',
    icon: Baby,
    subtext: 'Learn traditional Indian infant massage strokes, safe bucket bath & colic soothing.',
    matchedClassId: 'class-baby-massage',
    keyBenefit: 'Master safe neonatal handling and daily sleep-inducing massage routines using simulation dolls.'
  },
  {
    id: 'birth-prep',
    label: 'Labour Breathing & Birth Preparation',
    icon: Heart,
    subtext: 'Understand physiological birth, labour stages, partner counterpressure & breathing.',
    matchedClassId: 'class-birth-prep',
    keyBenefit: 'Replace birth fear with calm confidence and equip your birth partner with practical coaching skills.'
  },
  {
    id: 'breastfeeding-latch',
    label: 'Painless Breastfeeding & Milk Supply',
    icon: Flower2,
    subtext: 'Master deep latch mechanics, burping, engorgement prevention & feeding schedules.',
    matchedClassId: 'class-breastfeeding-latch',
    keyBenefit: 'Achieve a pain-free, comfortable latch from day one with guidance from an IBCLC lactation specialist.'
  },
  {
    id: 'newborn-first-100-days',
    label: 'Newborn Care & First 100 Days Routine',
    icon: Sparkles,
    subtext: 'Swaddling, burping, diapering, decoding infant cries, room temperature & safe sleep.',
    matchedClassId: 'class-newborn-essentials',
    keyBenefit: 'Zero-confusion roadmap for the first 3 months of life without sleep-deprived guesswork.'
  },
  {
    id: 'postpartum-recovery-prep',
    label: 'Postpartum Recovery & Confinement Wisdom',
    icon: Award,
    subtext: 'Plan your 40-day healing, Kizhi fomentation, nutrition, and maternal mental wellness.',
    matchedClassId: 'class-postpartum-prep',
    keyBenefit: 'Prepare your postpartum sanctuary, establish boundaries, and plan traditional healing decoctions.'
  },
  {
    id: 'prenatal-yoga-pelvis',
    label: 'Prenatal Yoga & Pelvic Mobility',
    icon: BookOpen,
    subtext: 'Trimester-safe stretches, pelvic opening postures & breathwork to ease back pain.',
    matchedClassId: 'class-prenatal-yoga',
    keyBenefit: 'Maintain pelvic flexibility and prepare your body biomechanically for an easier vaginal delivery.'
  }
];

export const LearningNeedFinder: React.FC = () => {
  const [activeNeedId, setActiveNeedId] = useState<string>('baby-bath-massage');
  const { openEnquiry } = useQuickEnquiry();

  const currentNeed = LEARNING_NEEDS.find(n => n.id === activeNeedId) || LEARNING_NEEDS[0];
  const matchedClass = classesData.find(c => c.id === currentNeed.matchedClassId) || classesData[0];

  return (
    <div className="w-full bg-cream-light rounded-3xl sm:rounded-[36px] border border-gold/40 shadow-warm-lg p-6 sm:p-10 lg:p-12 space-y-8 font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Class Matcher</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown tracking-tight">
          Tell Us What You Want to Learn
        </h3>
        <p className="text-xs sm:text-sm text-brown-muted">
          Click your primary learning goal below to reveal the tailored SEYOL masterclass and upcoming cohort seats.
        </p>
      </div>

      {/* Grid of Learning Need Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEARNING_NEEDS.map((need) => {
          const Icon = need.icon;
          const isActive = activeNeedId === need.id;
          return (
            <button
              key={need.id}
              onClick={() => setActiveNeedId(need.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between space-y-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-br from-maroon to-[#5a0c24] text-cream-light border-maroon shadow-warm-md scale-[1.02] ring-2 ring-gold/50'
                  : 'bg-white text-brown border-cream-border hover:border-gold/60 hover:bg-cream/40'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/10 text-gold-light' : 'bg-cream text-maroon'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isActive && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Selected</span>
                )}
              </div>
              <div>
                <h4 className={`font-serif font-bold text-sm leading-snug ${isActive ? 'text-cream-light' : 'text-brown'}`}>
                  {need.label}
                </h4>
                <p className={`text-[11px] line-clamp-2 mt-1 ${isActive ? 'text-cream-light/80' : 'text-brown-muted'}`}>
                  {need.subtext}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Matched Class Showcase Box */}
      <div className="bg-white rounded-3xl border border-cream-border p-6 sm:p-8 shadow-warm-sm animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider">
                ✓ Best Matched Workshop
              </span>
              <span className="text-xs font-bold text-brown-muted flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-dark" />
                <span>{matchedClass.duration}</span>
              </span>
              <span className="text-xs font-bold text-brown-muted flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-maroon" />
                <span>{matchedClass.format}</span>
              </span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown tracking-tight">
              {matchedClass.title}
            </h4>

            <p className="text-xs sm:text-sm text-brown leading-relaxed">
              {matchedClass.summary}
            </p>

            <div className="p-3.5 rounded-xl bg-cream-light border border-cream-border text-xs text-brown space-y-1">
              <strong className="text-maroon font-bold">Why This Fits You: </strong>
              <span>{currentNeed.keyBenefit}</span>
            </div>

            {/* Inclusions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted block">
                What You’ll Master in this Session:
              </span>
              {matchedClass.whatYouLearn.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-brown">
                  <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action & Schedule Card */}
          <div className="lg:col-span-5 bg-cream p-6 rounded-2xl border border-cream-border flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-cream-border">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brown-muted block">Tuition / Couple Pass</span>
                  <span className="font-serif font-bold text-2xl text-maroon">
                    ₹{matchedClass.pricing.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gold-dark bg-gold/20 px-2 py-0.5 rounded-full block">
                    Partner Free
                  </span>
                  <span className="text-[11px] text-brown-muted mt-1 block">Live Q&A + Replay</span>
                </div>
              </div>

              {/* Instructor Preview */}
              <div className="flex items-center space-x-3 text-xs pt-1">
                <img
                  src={matchedClass.instructor.avatar}
                  alt={matchedClass.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border border-gold"
                />
                <div>
                  <div className="font-bold text-brown">{matchedClass.instructor.name}</div>
                  <div className="text-brown-muted text-[11px]">{matchedClass.instructor.role}</div>
                </div>
              </div>

              {/* Next upcoming slot */}
              {matchedClass.scheduleUpcoming && matchedClass.scheduleUpcoming[0] && (
                <div className="p-3 rounded-xl bg-white border border-cream-border text-xs space-y-1">
                  <div className="font-bold text-maroon flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Next Cohort: {matchedClass.scheduleUpcoming[0].date}</span>
                  </div>
                  <div className="text-[11px] text-brown-muted">
                    {matchedClass.scheduleUpcoming[0].time} • <strong className="text-red-700">{matchedClass.scheduleUpcoming[0].seatsLeft} seats left</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => openEnquiry({ serviceTitle: `Enrollment: ${matchedClass.title}` })}
                className="w-full py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Couple Pass</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>

              <Link
                href={`/classes/${matchedClass.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-cream-dark text-brown font-bold text-xs border border-cream-border text-center block transition-all"
              >
                View Full Syllabus
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
