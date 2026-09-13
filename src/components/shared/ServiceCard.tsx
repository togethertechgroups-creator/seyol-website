'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import { Service } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';
export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { openEnquiry } = useQuickEnquiry();

  // Highlight popular flag
  const isPopular = service.id === 'postpartum-massage-wrap' || service.id === 'mother-baby-combo' || service.id === 'prenatal-massage';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="h-full flex group"
    >
      <div
        className={`bg-white rounded-3xl border ${
          isPopular ? 'border-gold shadow-warm-lg ring-1 ring-gold/40' : 'border-cream-border shadow-warm-md'
        } overflow-hidden hover:shadow-warm-xl hover:border-gold/60 transition-all duration-300 flex flex-col justify-between h-full font-sans p-0 w-full relative`}
      >
        {/* Top Hero Image Section */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-cream shrink-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-maroon-dark/30 to-transparent" />
          
          {/* Top Stage Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {service.stages.map((st) => (
              <span
                key={st}
                className="bg-gold/90 backdrop-blur-xs text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-gold-light/40"
              >
                {st}
              </span>
            ))}
          </div>

          {/* Popular Tag */}
          {isPopular && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-gradient-to-r from-maroon to-maroon-dark text-gold-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/40 shadow-warm-sm flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Most Popular</span>
              </span>
            </div>
          )}

          {/* Title Overlay on Hero Image */}
          <div className="absolute bottom-3 left-4 right-4 text-cream-light z-10 space-y-0.5">
            <span className="text-[10px] font-bold text-gold-light uppercase tracking-widest block">
              {service.format}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-cream-light leading-tight drop-shadow-sm">
              {service.shortTitle}
            </h3>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <p className="text-xs text-brown leading-relaxed line-clamp-2">
              {service.summary}
            </p>

            {/* Key Benefit Highlight Box */}
            <div className="bg-gradient-to-br from-cream via-cream-light to-gold-soft/20 p-3.5 rounded-2xl border border-gold/25 space-y-2 text-xs shadow-xs">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                <div>
                  <strong className="text-maroon font-bold">Key Benefit: </strong>
                  <span className="text-brown-muted">{service.benefit}</span>
                </div>
              </div>
            </div>

            {/* Micro Inclusions / Duration Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-brown-muted pt-1">
              <div className="flex items-center space-x-1.5 bg-cream/80 px-2.5 py-1 rounded-lg border border-cream-border">
                <Clock className="w-3.5 h-3.5 text-gold-dark" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-gold-dark font-semibold">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>AYUSH Protocol</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Action Footer */}
          <div className="pt-4 border-t border-cream-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-brown-muted uppercase tracking-wider font-medium">Pricing Guide</div>
              <div className="font-serif font-bold text-xs sm:text-sm text-maroon">{service.pricingGuide}</div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
              <Link
                href={`/services/${service.slug}`}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-cream border border-cream-border text-brown hover:bg-cream-dark text-xs font-semibold text-center transition-colors shadow-xs"
              >
                Details
              </Link>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => openEnquiry({ serviceTitle: service.title })}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-maroon to-maroon-dark hover:brightness-110 text-cream-light text-xs font-bold text-center transition-all shadow-warm-sm flex items-center justify-center space-x-1.5 cursor-pointer border border-gold/30"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-light group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

