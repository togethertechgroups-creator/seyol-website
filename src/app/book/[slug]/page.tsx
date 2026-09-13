'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BookingServiceId } from '@/types/booking';
import { bookingServicesConfig } from '@/data/bookingServicesData';
import { ServiceBookingWizard } from '@/components/booking/ServiceBookingWizard';
import { TrustBadges } from '@/components/shared/TrustBadges';

const resolveSlugToServiceId = (slug?: string): BookingServiceId => {
  const clean = (slug || '').toLowerCase().trim();
  if (clean.includes('preconception')) return 'preconception-support';
  if (clean.includes('prenatal')) return 'prenatal-massage';
  if (clean.includes('doula')) return 'birth-doula-support';
  if (clean.includes('combo') || clean.includes('mother-and-baby')) return 'mother-baby-combo';
  if (clean.includes('infant') || clean.includes('baby') || clean.includes('bath')) return 'infant-massage-bath';
  if (clean.includes('nanny') || clean.includes('confinement')) return 'confinement-nanny';
  if (clean.includes('hourly') || clean.includes('respite')) return 'hourly-newborn-support';
  if (clean.includes('lactation') || clean.includes('breastfeeding') || clean.includes('feeding')) return 'lactation-support';
  if (clean.includes('consultation') || clean.includes('general') || clean.includes('guidance')) return 'general-consultation';
  if (clean.includes('postpartum') || clean.includes('postnatal') || clean.includes('wrap')) return 'postpartum-massage-wrap';

  if (clean in bookingServicesConfig) {
    return clean as BookingServiceId;
  }
  return 'postpartum-massage-wrap';
};

function DynamicBookContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawSlug = (params?.slug as string) || 'postpartum-massage-wrap';
  const resolvedServiceId = resolveSlugToServiceId(rawSlug);
  const config = bookingServicesConfig[resolvedServiceId] || bookingServicesConfig['postpartum-massage-wrap'];
  const packageParam = searchParams?.get('package') || null;

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown min-h-screen">
      {/* Hero Header */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-maroon via-[#6d132c] to-[#4a0b1c] text-white border-b border-cream-border relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-3 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs font-bold text-gold-light hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </Link>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 text-gold-light border border-white/20">
              {config.badge}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Book {config.title}
            </h1>
            <p className="text-xs sm:text-sm text-cream-light max-w-xl">
              {config.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Wizard */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <ServiceBookingWizard
          key={resolvedServiceId}
          initialServiceId={resolvedServiceId}
          preselectedPackageId={packageParam}
        />
      </section>

      <div className="border-t border-cream-border">
        <TrustBadges variant="compact" />
      </div>
    </div>
  );
}

export default function DynamicBookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center font-serif text-maroon">Loading Care Sanctuary...</div>}>
      <DynamicBookContent />
    </Suspense>
  );
}
