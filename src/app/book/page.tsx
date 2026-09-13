'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Flower2, 
  Heart, 
  Baby, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  ArrowRight,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { BookingServiceId } from '../../types/booking';
import { bookingServicesConfig } from '../../data/bookingServicesData';
import { ServiceBookingWizard } from '../../components/booking/ServiceBookingWizard';
import { TrustBadges } from '../../components/shared/TrustBadges';

const serviceList: { id: BookingServiceId; title: string; category: string; icon: any }[] = [
  { id: 'preconception-support', title: 'Preconception Support', category: 'Preconception', icon: Flower2 },
  { id: 'prenatal-massage', title: 'Prenatal Massage', category: 'Pregnancy', icon: Sparkles },
  { id: 'birth-doula-support', title: 'Birth Doula Support', category: 'Birth & Labour', icon: Heart },
  { id: 'postpartum-massage-wrap', title: 'Postpartum Massage & Wrap', category: 'Postpartum', icon: Sparkles },
  { id: 'infant-massage-bath', title: 'Infant Massage & Bath', category: 'Newborn', icon: Baby },
  { id: 'mother-baby-combo', title: 'Mother & Baby Combo', category: 'Flagship Dual', icon: Heart },
  { id: 'confinement-nanny', title: 'Stay-In Confinement Nanny', category: '24/7 Residential', icon: ShieldCheck },
  { id: 'hourly-newborn-support', title: 'Hourly Newborn Support', category: 'Flexible Respite', icon: Clock },
  { id: 'lactation-support', title: 'Lactation & Feeding Support', category: 'Clinical & Gentle', icon: Sparkles },
  { id: 'general-consultation', title: 'General Consultation', category: 'Care Roadmap', icon: Calendar },
];

function BookPageContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const packageParam = searchParams.get('package');

  const [selectedService, setSelectedService] = useState<BookingServiceId>('postpartum-massage-wrap');

  useEffect(() => {
    if (serviceParam) {
      const match = serviceList.find(
        (s) => s.id === serviceParam || s.id.includes(serviceParam) || serviceParam.includes(s.id)
      );
      if (match) {
        setSelectedService(match.id);
      }
    }
  }, [serviceParam]);

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown min-h-screen">
      
      {/* Header Banner */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-maroon via-[#6d132c] to-[#4a0b1c] text-white border-b border-cream-border relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-light text-xs font-bold uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span>Dedicated Mother &amp; Newborn Sanctuary</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Book Your SEYOL Care Journey
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-cream-light max-w-2xl mx-auto leading-relaxed">
            Select your desired traditional Indian care service below to personalize your multi-step schedule, care preferences, and matron consultations.
          </p>
        </div>
      </section>

      {/* Service Selector Tabs Grid */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted">
            Choose One of Our 10 Dedicated Care Services
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {serviceList.map((svc) => {
            const Icon = svc.icon;
            const isSelected = selectedService === svc.id;

            return (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-maroon text-cream-light border-maroon shadow-warm-md scale-[1.02] ring-2 ring-gold/40'
                    : 'bg-white text-brown border-cream-border hover:border-maroon/40 hover:bg-cream-light shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-gold-light' : 'bg-maroon-soft text-maroon'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-gold text-maroon' : 'bg-cream text-brown-muted'
                  }`}>
                    {svc.category}
                  </span>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm line-clamp-2">
                  {svc.title}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Multi-Step Booking Form */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <ServiceBookingWizard
          key={selectedService}
          initialServiceId={selectedService}
          preselectedPackageId={packageParam}
        />
      </section>

      {/* Trust Credentials */}
      <div className="border-t border-cream-border">
        <TrustBadges variant="compact" />
      </div>

    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs font-bold text-maroon">Loading SEYOL Booking Sanctuary...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
