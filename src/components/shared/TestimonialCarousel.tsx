'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  X,
  Sparkles,
  Heart
} from 'lucide-react';
import { useAdminData, extractYouTubeId } from '../../context/AdminDataContext';
import { Testimonial } from '../../types';

interface ActiveVideo {
  url: string;
  author: string;
}

interface TestimonialCarouselProps {
  filterStage?: string;
  heading?: string;
  subtitle?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  filterStage = 'all',
  heading = 'Trusted by Families at Every Stage',
  subtitle = 'Real experiences from families who have welcomed SEYOL into their motherhood and parenting journey.'
}) => {
  const { testimonials } = useAdminData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter if specific stage requested
  const displayedTestimonials =
    filterStage && filterStage !== 'all'
      ? testimonials.filter((t) => t.stage === filterStage)
      : testimonials;
  const list = displayedTestimonials.length > 0 ? displayedTestimonials : testimonials;

  // Fallback approved images if a testimonial doesn't have a thumbnail
  const fallbackThumbnails = [
    'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
  ];

  // Helper to determine if direct video file
  const isDirectVideo = (url?: string) => {
    if (!url) return false;
    return (
      url.startsWith('data:video') ||
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.includes('/video_project_')
    );
  };

  // Check scroll position to toggle navigation arrow states
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Smooth scroll handler
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('[data-testimonial-card]')?.offsetWidth || 340;
    const scrollAmount = cardWidth + 24; // Card width + gap
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Automatic carousel rotation with pause on hover & reduced-motion respect
  useEffect(() => {
    if (isHovered || activeVideo) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 20) {
        // Loop back to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.querySelector<HTMLElement>('[data-testimonial-card]')?.offsetWidth || 340;
        el.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, activeVideo]);

  return (
    <section
      id="trusted-by-families"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 site-container mx-auto w-full font-sans relative overflow-hidden border-b border-cream-border/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Centered Heading and Subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
        <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-4 py-1.5 rounded-full inline-block">
          Parent &amp; Family Voices
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.18]">
          {heading}
        </h2>
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#55403D] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Navigation Arrows for Desktop & Tablet */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous testimonials"
            className={`w-11 h-11 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer ${
              canScrollLeft
                ? 'bg-white hover:bg-[#7B1131] text-[#7B1131] hover:text-white border-[#EAE1D5] hover:scale-105 shadow-warm-sm'
                : 'bg-white/50 text-[#C8A45D]/40 border-transparent cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next testimonials"
            className={`w-11 h-11 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer ${
              canScrollRight
                ? 'bg-white hover:bg-[#7B1131] text-[#7B1131] hover:text-white border-[#EAE1D5] hover:scale-105 shadow-warm-sm'
                : 'bg-white/50 text-[#C8A45D]/40 border-transparent cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Peeking Edges */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {list.map((testimonial, idx) => {
            const vidId = extractYouTubeId(testimonial.youtubeUrl);
            const hasVideo = Boolean(vidId || isDirectVideo(testimonial.youtubeUrl));
            const cardStyleIndex = idx % 3;

            // Thumbnail selection
            const imageSrc =
              testimonial.thumbnailImage ||
              (vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : fallbackThumbnails[idx % fallbackThumbnails.length]);

            // Alternating Brand Card Themes (Cream, Maroon, White)
            let cardClasses = '';
            let textClasses = '';
            let quoteClasses = '';
            let roleClasses = '';
            let iconContainerClasses = '';

            if (cardStyleIndex === 0) {
              // Style 0: Soft Warm Cream
              cardClasses = 'bg-[#FAF6EE] border-[#EAE1D5] shadow-warm-md hover:shadow-warm-xl';
              textClasses = 'text-[#3A1D1D]';
              quoteClasses = 'text-[#7B1131]';
              roleClasses = 'text-[#6E5652]';
              iconContainerClasses = 'bg-white/80 text-[#7B1131] border-[#EAE1D5]';
            } else if (cardStyleIndex === 1) {
              // Style 1: Rich Imperial Maroon
              cardClasses = 'bg-[#7B1131] border-[#5A0C24] text-white shadow-warm-xl';
              textClasses = 'text-white';
              quoteClasses = 'text-white';
              roleClasses = 'text-[#E8C574]';
              iconContainerClasses = 'bg-[#5A0C24] text-[#E8C574] border-white/20';
            } else {
              // Style 2: Crisp Editorial White
              cardClasses = 'bg-white border-[#EAE1D5] shadow-warm-md hover:shadow-warm-xl';
              textClasses = 'text-[#3A1D1D]';
              quoteClasses = 'text-[#3A1D1D]';
              roleClasses = 'text-[#6E5652]';
              iconContainerClasses = 'bg-[#FAF0EB] text-[#7B1131] border-[#EAC8D2]';
            }

            return (
              <div
                key={testimonial.id || idx}
                data-testimonial-card
                className={`snap-start w-[295px] sm:w-[335px] md:w-[355px] min-h-[490px] sm:min-h-[510px] rounded-3xl p-6 sm:p-7 border flex flex-col justify-between flex-shrink-0 transition-all duration-300 group hover:-translate-y-1.5 relative overflow-hidden ${cardClasses}`}
              >
                {/* Subtle Decorative Arch / Watermark in Background */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-5 pointer-events-none select-none bg-current" />

                {/* 1. Parent Photo / Video Thumbnail with Arch Top Inspired by Maasi */}
                <div className="space-y-4">
                  <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-neutral-900 shadow-sm border border-black/5 group/photo">
                    <img
                      src={imageSrc}
                      alt={testimonial.author}
                      className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Video Play Button (Only displayed when video content is available) */}
                    {hasVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVideo({
                            url: testimonial.youtubeUrl!,
                            author: testimonial.author,
                          });
                        }}
                        aria-label={`Watch video story of ${testimonial.author}`}
                        className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 cursor-pointer ring-4 ring-white/50 group/play z-10"
                      >
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5 group-hover/play:scale-110 transition-transform" />
                      </button>
                    )}

                    {/* Video Duration / Badge */}
                    {hasVideo && (
                      <span className="absolute top-3 right-3 bg-black/65 backdrop-blur-md text-white text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
                        <Video className="w-3 h-3 text-[#E8C574]" />
                        <span>Video Story</span>
                      </span>
                    )}

                    {/* Verified Parent Pill Badge */}
                    {testimonial.verifiedParent && (
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#7B1131] text-[10px] font-heading font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 fill-[#7B1131]" />
                        <span>Verified Family</span>
                      </span>
                    )}
                  </div>

                  {/* 2. Rating & Quote Accent */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C8A45D] text-[#C8A45D]" />
                      ))}
                    </div>
                    <Quote className={`w-5 h-5 opacity-40 shrink-0 ${cardStyleIndex === 1 ? 'text-[#E8C574]' : 'text-[#7B1131]'}`} />
                  </div>

                  {/* 3. Short Testimonial Quote */}
                  <blockquote className="space-y-1.5">
                    <p className={`font-serif italic text-sm sm:text-[15px] leading-relaxed line-clamp-4 ${quoteClasses}`}>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* 4. Author Name & Relevant Role / Family Description */}
                <div className="pt-4 border-t border-current/15 mt-4 space-y-1">
                  <h4 className={`font-heading font-extrabold text-sm sm:text-base leading-snug tracking-tight ${textClasses}`}>
                    {testimonial.author}
                  </h4>
                  <p className={`text-xs font-sans leading-normal line-clamp-1 ${roleClasses}`}>
                    {testimonial.location}
                    {testimonial.serviceOrProduct ? ` • ${testimonial.serviceOrProduct}` : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-neutral-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#7B1131] text-white flex items-center justify-center transition-all cursor-pointer ring-2 ring-white/20"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Embed / Direct Video */}
            {isDirectVideo(activeVideo.url) ? (
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(activeVideo.url)}?autoplay=1&rel=0`}
                title={activeVideo.author}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialCarousel;
