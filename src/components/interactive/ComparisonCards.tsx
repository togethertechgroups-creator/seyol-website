'use client';

import React, { useState } from 'react';
import { Check, X, Sparkles, Shield, Clock, Heart, ArrowRight, GraduationCap, Flower2, Users } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type ComparisonTab = 'postpartum' | 'nanny' | 'education';

export const ComparisonCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ComparisonTab>('postpartum');
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full font-sans space-y-8">
      {/* Selector Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-cream border border-cream-border gap-1.5">
          <button
            onClick={() => setActiveTab('postpartum')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'postpartum'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Postpartum Massage vs Combo
          </button>
          <button
            onClick={() => setActiveTab('nanny')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'nanny'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Stay-In Nanny vs Hourly Respite
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            In-Home Care vs Masterclasses
          </button>
        </div>
      </div>

      {activeTab === 'postpartum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card 1: Postpartum Massage & Wrap */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm hover:border-gold/60 transition-all">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted">
                Focused Maternal Recovery
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Traditional Postpartum Massage & Wrap
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Daily 90-minute in-home maternal bodywork, herbal steam fomentation (Kizhi), and traditional South Indian cotton belly binding.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                ₹24,000 <span className="text-xs font-sans font-normal text-brown-muted">/ 10-Day Care</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Full mother body massage & uterine involution strokes</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Daily hot herbal bath (Vethu Kuli) preparation</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Firm cotton belly binding (Kattu) for core support</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Baby massage and bathing (Mother only)</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Confinement cooking or night support</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Postpartum Massage & Wrap (10-28 Days)' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Enquire for Mother Care
              </button>
            </div>
          </div>

          {/* Card 2: Mother & Baby Combo (Popular) */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Most Popular Choice
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                Synchronised Dual Confinement Care
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Complete Mother & Baby Combo
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Coordinated 2.5-hour daily dual session. Mother receives full recovery bodywork and binding, while baby receives traditional infant massage and soothing bath.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                ₹36,000 <span className="text-xs font-sans font-normal text-brown-muted">/ 10-Day Complete Dual Care</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Full mother postpartum massage, Kizhi & belly binding</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Full baby Thokkanam massage, colic relief & herbal bath</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Synchronised routine allowing mother & baby to nap together</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Complimentary SEY Botanical Care Gift Box (Worth ₹2,800)</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Weekly clinical lactation & recovery supervision check-ins</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Complete Mother & Baby Postpartum Combo' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Dual Care Package</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nanny' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card 1: 24/7 Stay-In Confinement Nanny */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Complete Peace of Mind
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                24/7 Round-the-Clock Residence
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Stay-In Confinement Nanny
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                A background-verified, hospital-trained confinement nanny lives with your family to oversee newborn night feeds, mother’s confinement meals, and nursery sanitation.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                ₹85,000 <span className="text-xs font-sans font-normal text-brown-muted">/ 28-Day Stay-In</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>24/7 night-time baby burping, soothing, and diapering</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Nutritious traditional confinement cooking for mother</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Baby laundry, bottle boiling, and nursery hygiene</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Guaranteed continuous night sleep for new parents</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: '24/7 Stay-In Confinement Nanny' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Stay-In Care</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>

          {/* Card 2: Hourly Support */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm hover:border-gold/60 transition-all">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted">
                Flexible Respite Care
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Hourly Newborn Support
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Targeted daytime or overnight blocks (4 to 8 hours) by certified newborn aides to give parents essential rest or manage specific colic hours.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                ₹650 <span className="text-xs font-sans font-normal text-brown-muted">/ hour (Min 4h block)</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Targeted soothing during evening fussy / colic hours</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Assistance while parents nap, shower, or attend meetings</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Sterilisation of pump parts and bottle feeding</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Full household confinement cooking</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Hourly Newborn Respite Support' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Enquire for Hourly Blocks
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card 1: In-Home Hands-On Care */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm hover:border-gold/60 transition-all">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted">
                Done-For-You Home Visits
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                In-Home Hands-On Sanctuary Care
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                A certified care matron arrives at your doorstep daily to personally perform all massages, baths, Kizhi, and belly wrapping for you.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                From ₹15,400 <span className="text-xs font-sans font-normal text-brown-muted">/ Multi-Day Service</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Zero effort required from exhausted parents</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Traditional herbal materials & oils brought to your home</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Immediate physical relief and structural core recovery</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'In-Home Care Services' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Book In-Home Visits
              </button>
            </div>
          </div>

          {/* Card 2: Live Masterclasses & Education */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Empowerment for Couples
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                Self-Directed Learning
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Live Interactive Masterclasses
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Learn directly from certified educators so both mother and father gain lifelong skills in bathing, soothing, massage, and labor coaching.
              </p>

              <div className="font-serif font-bold text-xl text-maroon pt-2">
                ₹2,999 - ₹4,999 <span className="text-xs font-sans font-normal text-brown-muted">/ Couple Workshop</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Equips partners with hands-on calming and massage confidence</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Includes lifetime replay access and printable guide blueprints</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Accessible anywhere in Singapore, India, or globally</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Masterclass Workshops' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Masterclass Pass</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
