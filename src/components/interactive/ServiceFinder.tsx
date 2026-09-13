'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Sparkles, Check, ArrowRight, LayoutGrid, List, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../shared/ServiceCard';
import { JourneyStage, Service } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ServiceFinder: React.FC = () => {
  const { services } = useAdminData();
  const { openEnquiry } = useQuickEnquiry();
  const allServices: Service[] = (services && services.length > 0) ? services : servicesData;

  const [selectedStage, setSelectedStage] = useState<JourneyStage>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredServices = allServices.filter((service) => {
    const matchesStage = selectedStage === 'all' || service.stages.includes(selectedStage);
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Search & Filter Bar */}
      <div className="bg-cream-light p-5 sm:p-7 rounded-3xl border border-cream-border shadow-warm-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-brown-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by need: massage, belly binding, nanny, doula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:ring-1 focus:ring-maroon placeholder-brown-muted/70 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brown-muted hover:text-maroon font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'hands-on-care', label: 'Massage & Bodywork' },
              { id: 'nanny-confinement', label: 'Stay-In Nanny' },
              { id: 'specialist-support', label: 'Doula & Lactation' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-maroon text-cream-light border-maroon shadow-xs'
                    : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Filter Chips & View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cream-border/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted mr-1">
              Filter by Stage:
            </span>
            {[
              { id: 'all', label: 'All Stages' },
              { id: 'preconception', label: 'Preconception' },
              { id: 'pregnancy', label: 'Pregnancy' },
              { id: 'postpartum', label: 'Postpartum' },
              { id: 'newborn', label: 'Newborn' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStage(st.id as JourneyStage)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors border cursor-pointer ${
                  selectedStage === st.id
                    ? 'bg-gold text-maroon-dark font-bold border-gold shadow-xs'
                    : 'bg-cream text-brown-muted border-cream-border hover:text-maroon hover:border-maroon/30'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-brown-muted whitespace-nowrap hidden sm:inline">
              Showing <span className="font-bold text-maroon">{filteredServices.length}</span> of {allServices.length} offerings
            </span>

            {/* View Mode Toggle: Grid vs List */}
            <div className="inline-flex p-1 rounded-xl bg-cream border border-cream-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-maroon text-cream-light' : 'text-brown hover:text-maroon'
                }`}
                aria-label="Grid View"
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-maroon text-cream-light' : 'text-brown hover:text-maroon'
                }`}
                aria-label="List View"
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Display */}
      {filteredServices.length === 0 ? (
        <div className="py-16 text-center bg-cream-light rounded-2xl border border-cream-border space-y-3">
          <p className="text-sm text-brown-muted">
            No services matched your query. Try searching for a broader term or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStage('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-maroon text-cream-light text-xs font-bold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-cream-border p-5 sm:p-6 shadow-warm-sm hover:shadow-warm-md hover:border-gold/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-cream shrink-0 border border-cream-border">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {service.stages.map((st) => (
                      <span
                        key={st}
                        className="bg-maroon-soft text-maroon text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      >
                        {st}
                      </span>
                    ))}
                    <span className="text-[11px] text-brown-muted font-medium">• {service.format}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brown hover:text-maroon transition-colors">
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-brown-muted line-clamp-2">
                    {service.summary}
                  </p>
                  <div className="text-xs text-maroon font-bold pt-0.5">
                    {service.pricingGuide}
                  </div>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-cream-border">
                <Link
                  href={`/services/${service.slug}`}
                  className="px-4 py-2.5 rounded-xl bg-cream border border-cream-border text-brown hover:bg-cream-dark text-xs font-semibold transition-all"
                >
                  View Details
                </Link>
                <button
                  onClick={() => openEnquiry({ serviceTitle: service.title })}
                  className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shimmer-button"
                >
                  <span>Book Care</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
