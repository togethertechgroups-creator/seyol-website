'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ChevronLeft, 
  Award,
  Video,
  Gift,
  BookOpen
} from 'lucide-react';
import { classesData } from '../../../data/classes';
import { useQuickEnquiry } from '../../../context/QuickEnquiryContext';

export default function ClassDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { openEnquiry } = useQuickEnquiry();

  const classItem = classesData.find((c) => c.slug === slug);

  if (!classItem) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="font-serif text-2xl font-bold text-maroon">Workshop Not Found</h2>
        <p className="text-xs text-brown-muted">The requested workshop could not be located.</p>
        <Link href="/classes" className="inline-block px-5 py-2.5 bg-maroon text-cream-light text-xs font-bold rounded-xl">
          Return to Classes Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Breadcrumb */}
      <div className="bg-cream-dark/30 pt-20 sm:pt-24 pb-3 px-4 sm:px-6 lg:px-8 border-b border-cream-border text-xs text-brown-muted">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link href="/classes" className="hover:text-maroon flex items-center space-x-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>All Workshops</span>
          </Link>
          <span>/</span>
          <span className="text-maroon font-bold truncate">{classItem.title}</span>
        </div>
      </div>

      {/* Hero Showcase */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap gap-2">
              {classItem.stages.map((st) => (
                <span
                  key={st}
                  className="bg-maroon-soft text-maroon text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-maroon/20"
                >
                  {st}
                </span>
              ))}
              <span className="bg-gold-soft text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-border">
                {classItem.format}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-tight">
              {classItem.title}
            </h1>

            <p className="text-sm sm:text-base text-maroon font-serif italic">
              "{classItem.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {classItem.summary}
            </p>

            {/* Instructor Bio Snippet */}
            <div className="bg-cream-light p-4 rounded-2xl border border-cream-border flex items-center space-x-4">
              <img
                src={classItem.instructor.avatar}
                alt={classItem.instructor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/40 flex-shrink-0"
              />
              <div className="text-xs space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-gold-dark">Lead Workshop Facilitator</div>
                <div className="font-serif font-bold text-base text-brown">{classItem.instructor.name}</div>
                <div className="text-brown-muted font-medium">{classItem.instructor.credentials}</div>
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="bg-cream-light rounded-3xl p-6 sm:p-8 border border-cream-border space-y-4">
              <h3 className="font-serif text-xl font-bold text-brown">
                Workshop Curriculum & Practical Learning Modules
              </h3>
              <div className="space-y-2.5 text-xs text-brown">
                {classItem.whatYouLearn.map((mod, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-cream p-3 rounded-xl border border-cream-border/70">
                    <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Materials */}
            <div className="bg-cream-light rounded-3xl p-6 sm:p-8 border border-cream-border space-y-3">
              <h3 className="font-serif text-lg font-bold text-brown flex items-center space-x-2">
                <Gift className="w-4 h-4 text-maroon" />
                <span>Materials & Take-Home Resources Included</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brown">
                {classItem.materialsIncluded.map((mat, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Cohort Booking Box (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-cream-light rounded-3xl border-2 border-gold p-6 space-y-5 shadow-warm-lg">
              <div className="space-y-1 pb-4 border-b border-cream-border">
                <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                  Cohort Tuition Fee
                </div>
                <div className="font-serif font-bold text-3xl text-maroon">
                  ₹{classItem.pricing}
                </div>
                <div className="text-[11px] text-gold-dark font-semibold">
                  ✓ Free admission for 1 partner / support person
                </div>
              </div>

              {/* Upcoming Cohorts */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-brown uppercase tracking-wider">
                  Upcoming Cohort Dates:
                </div>
                {classItem.scheduleUpcoming.map((sch, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-cream border border-cream-border space-y-1.5"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-brown">{sch.date}</span>
                      <span className="text-[10px] font-bold text-maroon bg-maroon-soft px-2 py-0.5 rounded-full">
                        {sch.seatsLeft} seats left
                      </span>
                    </div>
                    <div className="text-[11px] text-brown-muted">{sch.time}</div>
                    <div className="text-[11px] text-gold-dark font-medium">{sch.format}</div>
                    <button
                      onClick={() =>
                        openEnquiry({
                          classTitle: `${classItem.title} (${sch.date} - ${sch.time})`,
                        })
                      }
                      className="w-full mt-2 py-2 rounded-lg bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Reserve for this Date</span>
                      <ArrowRight className="w-3 h-3 text-gold-light" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[10px] text-brown-muted text-center leading-relaxed">
                Need a private 1-on-1 session or custom date? <button onClick={() => openEnquiry({ classTitle: `Private ${classItem.title}` })} className="text-maroon underline font-semibold">Request Private Cohort</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
