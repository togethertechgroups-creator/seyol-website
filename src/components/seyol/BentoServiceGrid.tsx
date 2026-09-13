'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { servicesData } from '../../data/services';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const BentoServiceGrid: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();
  const featured = servicesData[0]; // Postpartum Massage
  const secondary = servicesData.slice(1, 4);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Featured Hero Bento Card */}
        {featured && (
          <div className="lg:col-span-7 bg-maroon text-cream-light p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-warm-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship 40-Day Care Package</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                {featured.title}
              </h3>

              <p className="text-xs sm:text-sm text-cream-light/85 leading-relaxed max-w-xl">
                {featured.summary}
              </p>

              <ul className="space-y-2 text-xs text-cream-light/90 pt-2">
                {featured.inclusions.slice(0, 3).map((inc, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4 relative z-10">
              <button
                onClick={() => openEnquiry({ serviceTitle: featured.title })}
                className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-warm-sm transition-all flex items-center space-x-2"
              >
                <span>Book Flagship Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href={`/services#${featured.slug}`}
                className="px-5 py-3 rounded-xl bg-cream-light/10 hover:bg-cream-light/20 text-cream-light font-bold text-xs transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        )}

        {/* Asymmetric Side Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-6">
          {secondary.map((service) => (
            <div
              key={service.id}
              className="bg-cream-light p-6 rounded-3xl border border-cream-border shadow-warm-sm hover:border-gold/60 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    {service.format}
                  </span>
                  <span className="text-xs font-bold text-maroon">
                    {service.duration}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-brown group-hover:text-maroon transition-colors">
                  {service.title}
                </h4>
                <p className="text-xs text-brown-muted line-clamp-2 leading-relaxed">
                  {service.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-brown">
                  {service.pricingGuide}
                </span>
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-maroon hover:underline"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
