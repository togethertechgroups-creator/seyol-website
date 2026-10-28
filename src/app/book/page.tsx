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
  const [showAllServices, setShowAllServices] = useState<boolean>(false);

  useEffect(() => {
    if (serviceParam) {
      const paramLower = serviceParam.toLowerCase();
      const match = serviceList.find(
        (s) =>
          s.id.toLowerCase() === paramLower ||
          s.id.toLowerCase().includes(paramLower) ||
          paramLower.includes(s.id.toLowerCase()) ||
          s.category.toLowerCase() === paramLower ||
          s.category.toLowerCase().includes(paramLower) ||
          s.title.toLowerCase().includes(paramLower)
      );
      if (match) {
        setSelectedService(match.id);
      }
    }
  }, [serviceParam]);

  const activeSvc = serviceList.find((s) => s.id === selectedService) || serviceList[0];
  const config = bookingServicesConfig[selectedService];

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown min-h-screen">
      
      {/* Header Banner */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-maroon via-[#6d132c] to-[#4a0b1c] text-white border-b border-cream-border relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-2 relative z-10">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Book Your SEYOL Care Journey
          </h1>

          <p className="text-xs sm:text-sm text-cream-light max-w-xl mx-auto leading-relaxed">
            Personalize your multi-step schedule, care preferences, and matron consultations.
          </p>
        </div>
      </section>

      {/* Prominent Selected Service Header (Hides other 9 services, aligned with wizard) */}
      {!showAllServices ? (
        <section className="pt-4 pb-1 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-fadeIn">
          <div className="bg-white border border-[#EAE1D5] rounded-2xl py-4 px-6 sm:py-5 sm:px-8 shadow-warm-xs text-center relative overflow-hidden">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#70152B] tracking-tight leading-tight mb-1.5">
              {activeSvc.title}
            </h2>

            {config?.subtitle && (
              <p className="text-xs sm:text-sm text-[#6E5652] max-w-xl mx-auto leading-relaxed mb-2.5">
                {config.subtitle}
              </p>
            )}

            <div className="flex items-center justify-center gap-3 text-xs font-semibold">
              <Link
                href="/services"
                className="text-[#6E5652] hover:text-[#70152B] transition-colors"
              >
                ← Back to Services
              </Link>
              <span className="text-[#D9B8B2]">•</span>
              <button
                type="button"
                onClick={() => setShowAllServices(true)}
                className="text-[#70152B] hover:text-[#580F21] underline cursor-pointer"
              >
                Choose another service
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* Optional Expanded Service Selector Tabs Grid */
        <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-fadeIn">
          <div className="flex items-center justify-between pb-3 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted">
              Choose One of Our 10 Dedicated Care Services
            </span>
            <button
              type="button"
              onClick={() => setShowAllServices(false)}
              className="text-xs font-bold text-[#70152B] hover:underline cursor-pointer"
            >
              Hide other services ↑
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {serviceList.map((svc) => {
              const Icon = svc.icon;
              const isSelected = selectedService === svc.id;

              return (
                <button
                  key={svc.id}
                  onClick={() => {
                    setSelectedService(svc.id);
                    setShowAllServices(false);
                  }}
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
      )}

      {/* Main Multi-Step Booking Form */}
      <section className="pt-2 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
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
