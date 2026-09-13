'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import AccordionGallery, { AccordionGalleryItem } from '../shared/AccordionGallery';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

const SIGNATURE_SERVICES: AccordionGalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    label: 'Fertility & Family Building',
    subtitle: 'Free, covered by employer or health plan',
    dotColor: '#2dd4bf',
    link: '/services/preconception-support'
  },
  {
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200',
    label: 'Maternity & Newborn Care',
    subtitle: 'Free, covered by employer or health plan',
    dotColor: '#10b981',
    link: '/services/prenatal-massage-therapy'
  },
  {
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    label: 'Parenting & Pediatrics',
    subtitle: 'Free, covered by employer or health plan',
    dotColor: '#a855f7',
    link: '/services/infant-bath-ritual'
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    label: 'Sacred Postpartum & Kizhi',
    subtitle: 'Free, covered by employer or health plan',
    dotColor: '#ec4899',
    link: '/services/postpartum-care'
  },
  {
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200',
    label: 'Menopause & Midlife Health',
    subtitle: 'Free, covered by employer or health plan',
    dotColor: '#facc15',
    link: '/services/postpartum-care'
  }
];

export default function HorizontalServicesScroll() {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <section id="signature-services" className="scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[98%] xl:max-w-[96%] 2xl:max-w-[1780px] mx-auto w-full">
      <div className="space-y-8 sm:space-y-10">
        
        {/* Section Header matching the reference */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
            Signature <span className="font-garet font-black italic tracking-wide">SEYOL</span> Care Services
          </h2>
        </div>

        {/* Accordion Gallery (Exactly 5 cards with ideal spacing and proportions) */}
        <div className="w-full">
          <AccordionGallery
            items={SIGNATURE_SERVICES}
            defaultIndex={null}
            expandRatio={0.42}
            height={500}
            gap={14}
            radius={20}
            trigger="hover"
            grayscale={false}
            tilt={5}
            parallax={0.35}
            accentColor="#c8a45d"
            overlayColor="#18060d"
            textColor="#ffffff"
            showLabels={true}
          />
        </div>

        {/* Bottom Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-cream-border/70">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-brown-muted">
            <ShieldCheck className="w-4 h-4 text-gold-dark" />
            <span>Certified Traditional Doulas &amp; In-Home Postnatal Practitioners</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openEnquiry({ serviceTitle: 'Signature Care Consultation' })}
              className="px-6 py-2.5 rounded-full bg-[#7B1131] text-white hover:bg-[#5e0c24] font-bold text-xs sm:text-sm tracking-wide shadow-warm-sm hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Consult a Care Matron
            </button>

            <Link
              href="/services"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-cream-dark text-maroon font-bold text-xs sm:text-sm border border-neutral-300 transition-all duration-200"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
