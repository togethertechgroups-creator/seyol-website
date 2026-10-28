'use client';

import React, { useState } from 'react';
import { Check, X, Sparkles, Shield, Clock, Heart, ArrowRight, GraduationCap, Flower2, Users } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

type ComparisonTab = 'postpartum' | 'nanny' | 'infant-hourly';

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
            Nanny vs Hourly Support
          </button>
          <button
            onClick={() => setActiveTab('infant-hourly')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'infant-hourly'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon hover:bg-white/60'
            }`}
          >
            Infant Bath Service vs Hourly Newborn Support
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
                  <span>Complimentary SEY Botanical Care Gift Box</span>
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

      {activeTab === 'infant-hourly' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card 1: Infant Bath Service & Baby Massage */}
          <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-8 flex flex-col justify-between shadow-warm-sm hover:border-gold/60 transition-all">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted">
                Focused Daily Baby Care
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                Infant Bath Service & Massage
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                A specialised 45 to 60-minute daily in-home ritual focusing on traditional Thokkanam infant massage, herbal warm bath, and delicate newborn hygiene.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Full traditional baby massage (Thokkanam) for bone & muscle tone</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Gentle herbal warm bath (Vethu Kuli) tailored for newborn skin</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Umbilical cord hygiene, scalp cradle care & colic gas-relief strokes</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Hands-on coaching so parents gain lifelong holding & bathing confidence</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Mother postpartum bodywork or belly binding</span>
                </div>
                <div className="flex items-center space-x-2 text-brown-muted">
                  <X className="w-4 h-4 text-brown-muted/50 shrink-0" />
                  <span className="line-through">Extended day/night respite hours or cooking</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Infant Bath & Massage Service' })}
                className="w-full py-3 rounded-xl bg-cream border border-cream-border hover:bg-maroon hover:text-cream-light font-bold text-xs transition-colors cursor-pointer"
              >
                Enquire for Infant Bath
              </button>
            </div>
          </div>

          {/* Card 2: Hourly Newborn Support */}
          <div className="bg-cream-light rounded-3xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-warm-md relative">
            <div className="absolute -top-3 right-6 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Flexible Respite Choice
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                On-Demand Day &amp; Night Respite
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Hourly Newborn Support
              </h3>
              <p className="text-xs text-brown-muted leading-relaxed">
                Targeted 4 to 8-hour blocks by certified newborn aides to give exhausted parents restorative sleep, manage fussy colic hours, and assist with feeds.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs">
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Flexible daytime or overnight shift blocks (4, 6, or 8 hours)</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Night-time feeds, paced bottle feeding, soothing & diaper changes</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Expert evening colic relief, burping & safe sleep settling</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Sterilising pump parts, baby bottles & nursery hygiene maintenance</span>
                </div>
                <div className="flex items-center space-x-2 text-brown">
                  <Check className="w-4 h-4 text-maroon shrink-0" />
                  <span>Guaranteed uninterrupted rest and recovery for parents</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border">
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Hourly Newborn Respite Support' })}
                className="w-full py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shimmer-button"
              >
                <span>Reserve Hourly Newborn Care</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
