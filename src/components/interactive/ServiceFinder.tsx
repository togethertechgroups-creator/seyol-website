'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../shared/ServiceCard';
import { Service } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ServiceFinder: React.FC = () => {
  const { services, servicesSettings } = useAdminData();
  const { openEnquiry } = useQuickEnquiry();
  const allServices: Service[] = (services && services.length > 0) ? services : servicesData;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = allServices.filter((service) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      service.title.toLowerCase().includes(query) ||
      service.summary.toLowerCase().includes(query) ||
      service.benefit.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="text-[#70152B] text-xs font-bold tracking-[2.5px] uppercase">
          {servicesSettings?.sectionBadge || 'YOUR JOURNEY, YOUR WAY'}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A1D1D] tracking-tight">
          {servicesSettings?.sectionTitle || 'Popular Ways Families Begin'}
        </h2>
        <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed">
          {servicesSettings?.sectionSubtitle || "Choose what feels right for you. We'll help you find the right care."}
        </p>
      </div>

      {/* Search Bar Only (Filtered categories and stage filters removed per request) */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-brown-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={servicesSettings?.searchPlaceholder || 'Search by need: massage, belly binding, nanny, doula...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-14 py-3.5 rounded-2xl bg-white border border-cream-border text-sm text-brown focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon placeholder-brown-muted/70 shadow-warm-xs transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-brown-muted hover:text-maroon font-semibold cursor-pointer px-2.5 py-1 rounded-lg bg-cream hover:bg-cream-dark transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Services Display */}
      {filteredServices.length === 0 ? (
        <div className="py-16 text-center bg-cream-light rounded-2xl border border-cream-border space-y-3">
          <p className="text-sm text-brown-muted">
            No services matched &ldquo;{searchQuery}&rdquo;. Try searching for a broader term.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-maroon text-cream-light text-xs font-bold cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};
