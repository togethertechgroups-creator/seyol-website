'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Heart, Play, Video, X } from 'lucide-react';
import { useAdminData, extractYouTubeId } from '../../context/AdminDataContext';
import { JourneyStage } from '../../types';

export const TestimonialCarousel: React.FC<{ filterStage?: JourneyStage }> = ({
  filterStage = 'all',
}) => {
  const { testimonials } = useAdminData();
  const [activeStage, setActiveStage] = useState<JourneyStage>(filterStage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const filtered = testimonials.filter(
    (t) => activeStage === 'all' || t.stage === activeStage
  );

  const activeTestimonials = filtered.length > 0 ? filtered : testimonials;

  const handleNext = () => {
    setIsPlayingVideo(false);
    setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
  };

  const handlePrev = () => {
    setIsPlayingVideo(false);
    setCurrentIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  const current = activeTestimonials[currentIndex % activeTestimonials.length];
  const videoId = extractYouTubeId(current?.youtubeUrl);

  return (
    <section className="bg-cream-light py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-cream-border shadow-warm-sm font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider shadow-xs">
            <Heart className="w-3.5 h-3.5 text-gold-dark" />
            <span>What Our Clients Have To Say About SEYOL?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown tracking-tight">
            Real Stories, Healing Touch &amp; Video Journeys
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted max-w-xl mx-auto">
            Listen directly to mothers, fathers, and families across Singapore and India who experienced sacred traditional postpartum confinement with SEYOL.
          </p>
        </div>

        {/* Stage Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'preconception', label: 'Preconception' },
            { id: 'pregnancy', label: 'Pregnancy & Doula' },
            { id: 'postpartum', label: 'Confinement & Massage' },
            { id: 'newborn', label: 'Infant Bath & Colic' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setActiveStage(st.id as JourneyStage);
                setCurrentIndex(0);
                setIsPlayingVideo(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeStage === st.id
                  ? 'bg-maroon text-cream-light shadow-sm'
                  : 'bg-cream text-brown hover:bg-cream-dark border border-cream-border'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        {current && (
          <div className="relative bg-cream rounded-3xl border border-cream-border p-6 sm:p-8 shadow-warm-md overflow-hidden space-y-6">
            
            {/* Playable YouTube Video Player Section (If Video Exists) */}
            {videoId && (
              <div className="w-full rounded-2xl overflow-hidden shadow-xl border-2 border-gold/40 bg-black aspect-video relative group">
                {isPlayingVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={current.author}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        current.thumbnailImage ||
                        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                      }
                      alt={current.author}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center space-y-3">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        aria-label="Play Client Video Testimonial"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer pl-1 group/btn ring-4 ring-white/30"
                      >
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
                      </button>
                      <div className="text-center text-white px-4">
                        <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-gold-light block">
                          Client Video Story
                        </span>
                        <span className="text-xs sm:text-sm font-serif font-bold drop-shadow">
                          Click to Watch {current.author}'s Journey
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stars & Quote */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: current.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                {videoId && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video Testimonial</span>
                  </span>
                )}
              </div>

              <blockquote className="space-y-2">
                <p className="font-serif text-lg sm:text-xl font-bold text-maroon leading-snug">
                  "{current.quote}"
                </p>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed font-medium">
                  {current.detailedStory}
                </p>
              </blockquote>
            </div>

            {/* Author Details & Carousel Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-cream-border/80">
              <div>
                <div className="font-serif font-bold text-sm text-brown">
                  {current.author}
                </div>
                <div className="text-xs text-brown-muted flex items-center space-x-2 mt-0.5 font-medium">
                  <span>{current.location}</span>
                  <span>•</span>
                  <span className="text-gold-dark font-semibold">{current.serviceOrProduct}</span>
                  {current.babyAgeOrWeek && (
                    <>
                      <span>•</span>
                      <span className="text-neutral-500">{current.babyAgeOrWeek}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-xs text-maroon font-semibold bg-maroon-soft px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified SEYOL Family</span>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous review"
                    className="p-2 rounded-full bg-white hover:bg-gold hover:text-maroon-dark text-brown border border-cream-border transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next review"
                    className="p-2 rounded-full bg-white hover:bg-gold hover:text-maroon-dark text-brown border border-cream-border transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
