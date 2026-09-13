'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Video,
  LayoutGrid,
  List,
  CheckCircle2
} from 'lucide-react';
import { classesData } from '../../data/classes';
import { JourneyStage, ClassWorkshop } from '../../types';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

interface ClassFinderProps {
  externalStageFilter?: JourneyStage;
  onBookClass?: (cls: ClassWorkshop) => void;
}

export const ClassFinder: React.FC<ClassFinderProps> = ({ externalStageFilter = 'all', onBookClass }) => {
  const [selectedStage, setSelectedStage] = useState<JourneyStage>(externalStageFilter);
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { openEnquiry } = useQuickEnquiry();

  useEffect(() => {
    if (externalStageFilter) {
      setSelectedStage(externalStageFilter);
    }
  }, [externalStageFilter]);

  const filteredClasses = classesData.filter((cls) => {
    const matchesStage = selectedStage === 'all' || cls.stages.includes(selectedStage);
    const matchesFormat =
      selectedFormat === 'all' ||
      (selectedFormat === 'online' && cls.format.toLowerCase().includes('online')) ||
      (selectedFormat === 'in-person' && cls.format.toLowerCase().includes('in-person'));
    const matchesSearch =
      searchQuery === '' ||
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesFormat && matchesSearch;
  });

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Search & Filter Bar */}
      <div className="bg-cream-light p-6 rounded-3xl border border-cream-border shadow-warm-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-brown-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search classes: baby massage, birth prep, breastfeeding..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:ring-1 focus:ring-maroon placeholder-brown-muted/70"
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

          {/* Format Selector */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            {[
              { id: 'all', label: 'All Formats' },
              { id: 'online', label: 'Live Online (Zoom HD)' },
              { id: 'in-person', label: 'In-Person Studio (Chennai)' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border cursor-pointer ${
                  selectedFormat === fmt.id
                    ? 'bg-maroon text-cream-light border-maroon shadow-xs'
                    : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Filter Chips & View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-cream-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brown-muted mr-1">
              Learning Stage:
            </span>
            {[
              { id: 'all', label: 'All Stages' },
              { id: 'pregnancy', label: 'Pregnancy & Birth' },
              { id: 'postpartum', label: 'Postpartum Prep' },
              { id: 'newborn', label: 'Infant Care & Bath' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStage(st.id as JourneyStage)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                  selectedStage === st.id
                    ? 'bg-gold text-maroon-dark font-bold border-gold shadow-xs'
                    : 'bg-cream text-brown-muted border-cream-border hover:text-maroon'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-brown-muted">
              {filteredClasses.length} workshops available
            </span>

            {/* View Mode Toggle */}
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

      {/* Classes Display */}
      {filteredClasses.length === 0 ? (
        <div className="py-16 text-center bg-cream-light rounded-2xl border border-cream-border space-y-3">
          <p className="text-sm text-brown-muted">
            No workshops matched your filter. Try adjusting your search or stage selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStage('all');
              setSelectedFormat('all');
            }}
            className="px-4 py-2 rounded-xl bg-maroon text-cream-light text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-cream-light rounded-2xl border border-cream-border p-6 shadow-warm-sm hover:shadow-warm-md hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cls.stages.map((st) => (
                      <span
                        key={st}
                        className="bg-cream text-maroon border border-cream-border text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-gold-dark">
                    {cls.format}
                  </span>
                </div>

                {/* Title & Tagline */}
                <Link href={`/classes/${cls.slug}`} className="block group">
                  <h3 className="font-serif text-lg font-bold text-brown group-hover:text-maroon transition-colors leading-snug mb-1.5">
                    {cls.title}
                  </h3>
                </Link>
                <p className="text-xs text-brown-muted leading-relaxed mb-4">
                  {cls.summary}
                </p>

                {/* What You Learn Bullet Points */}
                <div className="bg-cream p-3.5 rounded-xl border border-cream-border/70 mb-4 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-maroon mb-1">
                    Key Practical Skills Taught:
                  </div>
                  {cls.whatYouLearn.slice(0, 3).map((pt, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-brown">
                      <span className="text-gold-dark font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Instructor snippet */}
                <div className="flex items-center space-x-3 mb-4 text-xs">
                  <img
                    src={cls.instructor.avatar}
                    alt={cls.instructor.name}
                    className="w-9 h-9 rounded-full object-cover border border-gold/40"
                  />
                  <div>
                    <div className="font-bold text-brown">{cls.instructor.name}</div>
                    <div className="text-[11px] text-brown-muted line-clamp-1">
                      {cls.instructor.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Booking Action */}
              <div className="pt-4 border-t border-cream-border flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-brown-muted uppercase tracking-wider">
                    Tuition Fee (Admits 2)
                  </div>
                  <div className="font-serif font-bold text-base text-maroon">
                    ₹{cls.pricing.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/classes/${cls.slug}`}
                    className="px-3.5 py-2 rounded-xl bg-cream border border-cream-border text-brown hover:bg-cream-dark text-xs font-semibold cursor-pointer transition-all"
                  >
                    Curriculum
                  </Link>
                  <button
                    onClick={() => {
                      if (onBookClass) {
                        onBookClass(cls);
                      } else {
                        openEnquiry({ classTitle: cls.title });
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Book Seat</span>
                    <ArrowRight className="w-3 h-3 text-gold-light" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-cream-light rounded-2xl border border-cream-border p-5 sm:p-6 shadow-warm-sm hover:shadow-warm-md hover:border-gold/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {cls.stages.map((st) => (
                    <span
                      key={st}
                      className="bg-maroon-soft text-maroon text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    >
                      {st}
                    </span>
                  ))}
                  <span className="text-[11px] text-brown-muted font-medium">• {cls.format} • {cls.duration}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-brown hover:text-maroon transition-colors">
                  <Link href={`/classes/${cls.slug}`}>
                    {cls.title}
                  </Link>
                </h3>
                <p className="text-xs text-brown-muted line-clamp-2">
                  {cls.summary}
                </p>
                <div className="text-xs text-maroon font-bold pt-0.5">
                  ₹{cls.pricing.toLocaleString()} / Couple Pass
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-cream-border">
                <Link
                  href={`/classes/${cls.slug}`}
                  className="px-4 py-2.5 rounded-xl bg-cream border border-cream-border text-brown hover:bg-cream-dark text-xs font-semibold cursor-pointer transition-all"
                >
                  Curriculum
                </Link>
                <button
                  onClick={() => {
                    if (onBookClass) {
                      onBookClass(cls);
                    } else {
                      openEnquiry({ classTitle: cls.title });
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shimmer-button"
                >
                  <span>Book Seat</span>
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
