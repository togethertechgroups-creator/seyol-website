'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { classesData } from '../../data/classes';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ClassCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<'August 2026' | 'September 2026'>('August 2026');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const { openEnquiry } = useQuickEnquiry();

  // Flatten all schedules with class reference
  const allSchedules = classesData.flatMap((cls) =>
    cls.scheduleUpcoming.map((sch) => ({
      ...sch,
      classId: cls.id,
      classTitle: cls.title,
      classSlug: cls.slug,
      instructor: cls.instructor.name,
      pricing: cls.pricing,
      category: cls.category,
    }))
  );

  const filteredByMonth = allSchedules.filter((sch) => {
    if (selectedMonth === 'August 2026') return sch.date.startsWith('2026-08');
    return sch.date.startsWith('2026-09');
  });

  const activeSchedules = selectedDateFilter
    ? filteredByMonth.filter((s) => s.date === selectedDateFilter)
    : filteredByMonth;

  // Format date helper (e.g. 2026-08-22 -> Saturday, 22 August)
  const formatReadableDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-10 shadow-warm-md font-sans">
      {/* Header & Month Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-border mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Interactive Live Cohort Schedule</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brown">
            Upcoming Masterclasses & Workshops
          </h3>
          <p className="text-xs text-brown-muted mt-1">
            Every registration includes free admission for 1 partner/support person & lifelong video recording access.
          </p>
        </div>

        {/* Month Selector Toggle */}
        <div className="flex items-center space-x-2 bg-cream p-1 rounded-2xl border border-cream-border self-start md:self-auto">
          <button
            onClick={() => {
              setSelectedMonth('August 2026');
              setSelectedDateFilter(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedMonth === 'August 2026'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon'
            }`}
          >
            August 2026
          </button>
          <button
            onClick={() => {
              setSelectedMonth('September 2026');
              setSelectedDateFilter(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedMonth === 'September 2026'
                ? 'bg-maroon text-cream-light shadow-sm'
                : 'text-brown hover:text-maroon'
            }`}
          >
            September 2026
          </button>
        </div>
      </div>

      {/* Date Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-cream-border">
        <button
          onClick={() => setSelectedDateFilter(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            selectedDateFilter === null
              ? 'bg-gold text-maroon-dark border-gold font-bold'
              : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
          }`}
        >
          All Cohort Dates ({filteredByMonth.length})
        </button>
        {Array.from(new Set(filteredByMonth.map((s) => s.date))).map((dStr) => (
          <button
            key={dStr}
            onClick={() => setSelectedDateFilter(dStr)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              selectedDateFilter === dStr
                ? 'bg-maroon text-cream-light border-maroon font-bold'
                : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
            }`}
          >
            {formatReadableDate(dStr)}
          </button>
        ))}
      </div>

      {/* Cohort Schedule Cards */}
      <div className="space-y-4">
        {activeSchedules.length === 0 ? (
          <div className="py-12 text-center text-xs text-brown-muted">
            No live cohorts scheduled for this filter. Please view another date or contact us for private 1-on-1 bookings.
          </div>
        ) : (
          activeSchedules.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream rounded-2xl border border-cream-border p-5 hover:border-gold/60 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Date & Title */}
              <div className="flex items-start space-x-4">
                <div className="bg-cream-light border border-cream-border rounded-xl p-3 text-center min-w-[75px] flex-shrink-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short' })}
                  </div>
                  <div className="font-serif font-bold text-2xl text-brown">
                    {new Date(item.date + 'T00:00:00').getDate()}
                  </div>
                  <div className="text-[10px] text-brown-muted">
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short' })}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-maroon-soft text-maroon">
                      {item.format}
                    </span>
                    <span className="text-xs text-brown-muted">
                      Lead Instructor: <strong className="text-brown">{item.instructor}</strong>
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-brown">
                    {item.classTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-brown-muted pt-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-maroon" />
                      <span className="font-medium text-maroon">
                        Only {item.seatsLeft} of {item.totalSeats} seats remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between lg:justify-end space-x-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-cream-border">
                <div className="text-left lg:text-right">
                  <div className="text-[10px] text-brown-muted uppercase tracking-wider">
                    Admits Mother + Partner
                  </div>
                  <div className="font-serif font-bold text-lg text-maroon">
                    ₹{item.pricing}
                  </div>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      classTitle: `${item.classTitle} (${formatReadableDate(item.date)} - ${item.time})`,
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all duration-200 shadow-sm flex items-center space-x-1.5"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
