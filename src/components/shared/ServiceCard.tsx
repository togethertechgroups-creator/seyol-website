'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Check, Calendar } from 'lucide-react';
import { Service } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { openEnquiry } = useQuickEnquiry();
  const [selectedNannyPackage, setSelectedNannyPackage] = useState<string>('28 Days');

  const isMotherBabyCombo =
    service.id === 'mother-baby-combo' ||
    service.slug === 'mother-and-baby-combo-packages';

  const isNannyCare =
    service.id === 'confinement-nanny' ||
    service.slug === 'stay-in-confinement-nanny-support';

  const isPostpartumMassage =
    service.id === 'postpartum-massage-wrap' ||
    service.slug === 'postpartum-massage-and-wrap';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full flex group"
    >
      <div className="bg-white rounded-[26px] sm:rounded-[28px] border border-[#ECE5DD] overflow-hidden shadow-[0_10px_32px_rgba(45,20,25,0.06)] hover:shadow-[0_18px_44px_rgba(45,20,25,0.12)] transition-all duration-300 flex flex-col justify-between h-full font-sans w-full relative">
        
        {/* Top Hero Image Header with Vignette & Organic Wave */}
        <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden shrink-0 bg-[#FAF0EB]">
          <img
            src={service.heroImage}
            alt={service.title}
            style={{ objectPosition: service.imagePosition || 'center center' }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Deep Wine / Maroon Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C0711]/90 via-[#2C0711]/35 via-50% to-black/10 pointer-events-none" />

          {/* Format & Title Text Overlay on Image */}
          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10 space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#F3C49F] uppercase tracking-[0.16em] block">
              {service.format || 'HOLISTIC CARE'}
            </span>
            <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-[1.18] drop-shadow-xs">
              {service.shortTitle || service.title}
            </h3>
          </div>

          {/* Organic Wave Cut at the Bottom */}
          <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg 
              viewBox="0 0 1000 100" 
              preserveAspectRatio="none" 
              className="w-full h-[26px] sm:h-[32px] block fill-white"
            >
              <path d="M 0,35 C 280,95 650,-10 1000,45 L 1000,100 L 0,100 Z" />
            </svg>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <p className="text-[13px] sm:text-[13.5px] text-[#4A4543] leading-[1.65] font-normal">
              {service.summary}
            </p>

            {/* Key Benefit Highlight Box */}
            <div className="bg-[#FCF4EE] rounded-2xl p-4 border border-[#F4E4DA]/60">
              <p className="text-[12.5px] sm:text-[13px] leading-[1.6] text-[#524644]">
                <strong className="font-bold text-[#70152B]">Key Benefit: </strong>
                <span>{service.benefit}</span>
              </p>
            </div>

            {/* 3. Nanny Service: Selectable Available Package Durations (No Session Duration) */}
            {isNannyCare && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#70152B] flex items-center justify-between">
                  <span>Available Package Durations:</span>
                  <span className="text-[10px] font-medium text-[#736B66]">Select to inquire</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {['14 Days', '28 Days', '42 Days', '56 Days'].map((pkg) => (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setSelectedNannyPackage(pkg)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                        selectedNannyPackage === pkg
                          ? 'bg-[#70152B] text-white shadow-2xs border border-[#70152B]'
                          : 'bg-[#FAF6EE] text-[#524644] border border-[#EAE1D5] hover:border-[#70152B]/40 hover:bg-white'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Postpartum Massage & Wrap: Differentiated Classic & Premium Sessions */}
            {isPostpartumMassage && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#70152B]">
                  Available Session Durations:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE1D5] text-center">
                    <span className="block text-xs font-heading font-extrabold text-[#70152B]">Classic</span>
                    <span className="text-[11px] text-[#524644] font-medium">60 minutes</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE1D5] text-center">
                    <span className="block text-xs font-heading font-extrabold text-[#70152B]">Premium</span>
                    <span className="text-[11px] text-[#524644] font-medium">80 minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Duration Display (Only if not Nanny and not Mother & Baby Combo) */}
            {!isNannyCare && !isMotherBabyCombo && !isPostpartumMassage && service.duration && (
              <div className="flex items-center gap-2 text-xs text-[#736B66] font-medium pt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#70152B] shrink-0" />
                <span>{service.duration}</span>
              </div>
            )}
          </div>

          {/* Pricing Guide & Action Buttons Footer */}
          <div className="pt-3 border-t border-[#EFE8DF] space-y-3.5">
            <div>
              <div className="text-[10px] tracking-[1.5px] uppercase font-bold text-[#9C9289] mb-1">
                PRICING GUIDE
              </div>
              <div className="font-heading text-[15px] sm:text-base font-bold text-[#70152B] leading-snug">
                {service.pricingGuide}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <Link
                href={`/services/${service.slug}`}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#FAF4ED] hover:bg-[#F2E8DC] text-[#70152B] font-semibold text-xs sm:text-[13px] text-center transition-colors shadow-xs"
              >
                Details
              </Link>

              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    serviceTitle: isNannyCare
                      ? `${service.title} (${selectedNannyPackage} Package)`
                      : service.title,
                  })
                }
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#70152B] hover:bg-[#580F21] text-white font-semibold text-xs sm:text-[13px] transition-all shadow-sm hover:shadow-warm-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enquire</span>
                <span className="text-sm font-bold">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
