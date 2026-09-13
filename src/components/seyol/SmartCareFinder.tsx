'use client';

import React, { useState } from 'react';
import { Compass, ArrowRight, Sparkles, Check, Flower2, ShoppingBag, Calendar } from 'lucide-react';
import { JourneyStage } from '../../types';
import { useVisitorJourney } from '../../context/VisitorJourneyContext';
import { servicesData } from '../../data/services';
import { classesData } from '../../data/classes';
import { productsData } from '../../data/products';
import Link from 'next/link';

export const SmartCareFinder: React.FC = () => {
  const { stage, setStage, setPrimaryConcern, recommendedServiceIds, recommendedClassIds, recommendedProductIds } = useVisitorJourney();
  const [step, setStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('Postpartum Restorative Recovery & Bath');
  const [eddOrAge, setEddOrAge] = useState('');

  const CONCERNS = [
    'Postpartum Restorative Recovery & Bath',
    'Colic Relief & Daily Infant Massage',
    'Birth Breathing & Physiological Preparation',
    'Stay-In 24/7 Confinement Nanny',
    'Breastfeeding & Lactation Guidance',
    'Ayush Cold-Pressed Oils & Skincare',
  ];

  const handleFinish = () => {
    setPrimaryConcern(selectedConcern);
    setStep(3); // Show results
  };

  const matchedServices = servicesData.filter((s) => recommendedServiceIds.includes(s.id));
  const matchedClasses = classesData.filter((c) => recommendedClassIds.includes(c.id));
  const matchedProducts = productsData.filter((p) => recommendedProductIds.includes(p.id));

  return (
    <div className="w-full bg-cream-light rounded-3xl border border-gold/40 shadow-warm-lg p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-border pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-gold-dark" />
            <span>Interactive Care Finder</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brown">
            Smart Care & Routine Finder
          </h3>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2 text-xs font-bold text-brown-muted">
          <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-maroon text-cream-light' : 'bg-cream'}`}>1. Stage</span>
          <span>&rarr;</span>
          <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-maroon text-cream-light' : 'bg-cream'}`}>2. Priority</span>
          <span>&rarr;</span>
          <span className={`px-2.5 py-1 rounded-full ${step === 3 ? 'bg-maroon text-cream-light' : 'bg-cream'}`}>3. Routine</span>
        </div>
      </div>

      {/* Step 1: Stage Confirmation */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-brown-muted">
            Confirm your current journey stage to personalize recommendations:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'pregnancy', label: 'Pregnancy' },
              { id: 'birth', label: 'Birth Prep' },
              { id: 'postpartum', label: 'Postpartum' },
              { id: 'newborn', label: 'Newborn Care' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStage(st.id as JourneyStage)}
                className={`p-3.5 rounded-xl text-xs font-bold transition-all border ${
                  stage === st.id
                    ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm'
                    : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs tracking-wide shadow-warm-sm hover:bg-maroon-dark transition-all flex items-center space-x-2"
            >
              <span>Next: Primary Concern</span>
              <ArrowRight className="w-4 h-4 text-gold-light" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Primary Concern & EDD */}
      {step === 2 && (
        <div className="space-y-5">
          <p className="text-xs sm:text-sm text-brown-muted">
            What is your primary care focus right now?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONCERNS.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedConcern(c)}
                className={`text-left p-3.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedConcern === c
                    ? 'bg-maroon-soft text-maroon border-maroon font-bold'
                    : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-brown">Estimated Due Date or Baby's Age (Optional)</label>
            <input
              type="text"
              value={eddOrAge}
              onChange={(e) => setEddOrAge(e.target.value)}
              placeholder="e.g. October 2026 or 3 Weeks Old"
              className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
            />
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl bg-cream text-brown font-bold text-xs border border-cream-border"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs tracking-wide shadow-warm-sm hover:bg-maroon-dark transition-all flex items-center space-x-2"
            >
              <span>Generate My Personalised Plan</span>
              <Sparkles className="w-4 h-4 text-gold-light" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results Display */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-maroon text-cream-light p-4 rounded-2xl border border-gold/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold-light">Recommended Stack</div>
              <div className="font-serif font-bold text-sm sm:text-base">
                For {stage.toUpperCase()} • {selectedConcern}
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-gold-light hover:underline font-semibold"
            >
              Change Options
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Service */}
            {matchedServices[0] && (
              <div className="bg-cream p-4 rounded-xl border border-cream-border space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon">
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>Top Care Service</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-brown">{matchedServices[0].title}</h4>
                <p className="text-xs text-brown-muted line-clamp-2">{matchedServices[0].summary}</p>
                <Link
                  href={`/services#${matchedServices[0].slug}`}
                  className="block text-center py-2 px-3 rounded-lg bg-maroon text-cream-light text-xs font-bold hover:bg-maroon-dark"
                >
                  View Service
                </Link>
              </div>
            )}

            {/* Class */}
            {matchedClasses[0] && (
              <div className="bg-cream p-4 rounded-xl border border-cream-border space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Recommended Masterclass</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-brown">{matchedClasses[0].title}</h4>
                <p className="text-xs text-brown-muted line-clamp-2">{matchedClasses[0].summary}</p>
                <Link
                  href={`/classes#${matchedClasses[0].slug}`}
                  className="block text-center py-2 px-3 rounded-lg bg-maroon text-cream-light text-xs font-bold hover:bg-maroon-dark"
                >
                  Reserve Seat
                </Link>
              </div>
            )}

            {/* Product */}
            {matchedProducts[0] && (
              <div className="bg-cream p-4 rounded-xl border border-cream-border space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Botanical Ritual</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-brown">{matchedProducts[0].title}</h4>
                <p className="text-xs text-brown-muted line-clamp-2">{matchedProducts[0].shortDescription}</p>
                <Link
                  href={`/products#${matchedProducts[0].slug}`}
                  className="block text-center py-2 px-3 rounded-lg bg-maroon text-cream-light text-xs font-bold hover:bg-maroon-dark"
                >
                  Shop Formulation
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
