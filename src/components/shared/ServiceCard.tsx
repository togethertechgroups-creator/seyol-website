'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Service } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { openEnquiry } = useQuickEnquiry();

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
            <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-[1.18] drop-shadow-xs">
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

            {/* Duration / Inclusions Text */}
            {service.duration && (
              <p className="text-xs text-[#736B66] font-medium leading-relaxed pt-0.5">
                {service.duration}
              </p>
            )}
          </div>

          {/* Pricing Guide & Action Buttons Footer */}
          <div className="pt-3 border-t border-[#EFE8DF] space-y-3.5">
            <div>
              <div className="text-[10px] tracking-[1.5px] uppercase font-bold text-[#9C9289] mb-1">
                PRICING GUIDE
              </div>
              <div className="font-serif text-[15px] sm:text-base font-bold text-[#70152B] leading-snug">
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
                onClick={() => openEnquiry({ serviceTitle: service.title })}
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
