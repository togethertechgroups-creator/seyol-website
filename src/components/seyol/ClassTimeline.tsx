'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { classesData } from '../../data/classes';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const ClassTimeline: React.FC = () => {
  const { openEnquiry } = useQuickEnquiry();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-border pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Live Cohort Schedule</span>
          <h3 className="font-serif text-2xl font-bold text-brown">Upcoming Masterclasses</h3>
        </div>
        <span className="text-xs text-brown-muted font-medium">Chennai Studio & Live Interactive Online</span>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classesData.map((cls) => {
          const firstSession = cls.scheduleUpcoming[0];
          return (
            <div
              key={cls.id}
              className="bg-cream-light p-5 rounded-2xl border border-cream-border shadow-warm-sm hover:border-gold/60 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-gold/20 text-maroon text-[10px] font-bold uppercase tracking-wider">
                    {cls.format}
                  </span>
                  <span className="text-xs font-bold text-maroon">₹{cls.pricing}</span>
                </div>

                <h4 className="font-serif font-bold text-base text-brown leading-snug">{cls.title}</h4>

                {firstSession && (
                  <div className="space-y-1.5 text-xs text-brown-muted border-t border-cream-border/60 pt-2">
                    <div className="flex items-center space-x-1.5 font-semibold text-brown">
                      <Calendar className="w-3.5 h-3.5 text-maroon shrink-0" />
                      <span>{firstSession.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span>{firstSession.time}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-maroon font-bold">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{firstSession.seatsLeft} of {firstSession.totalSeats} Seats Remaining</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => openEnquiry({ serviceTitle: `Class: ${cls.title}` })}
                className="w-full py-2.5 px-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-warm-sm"
              >
                <span>Reserve Ticket</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
