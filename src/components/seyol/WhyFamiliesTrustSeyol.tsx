'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { useAdminData, extractYouTubeId, defaultWhyTrustVideoStories } from '../../context/AdminDataContext';

interface VideoStory {
  id: string;
  title: string;
  tag: string;
  family: string;
}

const VIDEO_STORIES: VideoStory[] = [
  {
    id: '2CUZML1oP6c',
    title: '50 Infant Massage & Bath + 35 Postpartum Sessions',
    tag: 'Care Journey',
    family: 'Daisy Lodge Condominium'
  },
  {
    id: '2bmZwC4BS8I',
    title: '30 Infant Massage & Bath + 15 Postpartum Sessions',
    tag: 'Repeat Journey',
    family: '2nd-Time Indian Singaporean Mum'
  },
  {
    id: 'yWk4VLjkuUA',
    title: 'Life-Changing Postnatal & Postpartum Services',
    tag: 'Client Feedback',
    family: 'Client Interview'
  }
];

const TRUST_PILLARS = [
  {
    title: 'Family-first care',
    description: 'Support shaped around individual needs and routines.'
  },
  {
    title: 'Safety-conscious approach',
    description: 'Clear care practices and transparent service information.'
  },
  {
    title: 'Open communication',
    description: 'Space to ask questions and understand your options.'
  },
  {
    title: 'Thoughtful guidance',
    description: 'Practical support for changing family needs.'
  }
];

export const WhyFamiliesTrustSeyol: React.FC = () => {
  const { whyTrustVideos } = useAdminData();
  const videoStories = (whyTrustVideos && whyTrustVideos.length > 0) ? whyTrustVideos : defaultWhyTrustVideoStories;

  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Autoplay video when scrolling into view, and turn off/pause when user scrolls away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (!inView) {
          // Immediately pause/turn off video when scrolled away
          try {
            iframeRef.current?.contentWindow?.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
              '*'
            );
          } catch {
            // Ignore cross-origin warnings if any
          }
          if (videoRef.current) {
            videoRef.current.pause();
          }
        } else {
          // Play video when scrolled back into view
          try {
            iframeRef.current?.contentWindow?.postMessage(
              JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
              '*'
            );
          } catch {
            // Ignore cross-origin warnings if any
          }
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentVideoIdx((prev) => (prev <= 0 ? videoStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentVideoIdx((prev) => (prev >= videoStories.length - 1 ? 0 : prev + 1));
  };

  const safeIdx = currentVideoIdx >= videoStories.length ? 0 : currentVideoIdx;
  const activeVideo = videoStories[safeIdx] || videoStories[0];
  const ytId = extractYouTubeId(activeVideo.youtubeIdOrUrl);

  return (
    <section 
      ref={sectionRef}
      id="why-families-trust-seyol" 
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] font-sans border-t border-[#ECE5DD]"
    >
      <div className="max-w-5xl lg:max-w-[1120px] mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header (Centered) */}
        <header className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[2.5px] text-[#70152B]">
            THE SEYOL PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-bold text-[#3A1D1D] tracking-tight leading-[1.18]">
            Why families trust SEYOL
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed max-w-2xl mx-auto">
            Care that listens, support that respects your choices, and guidance designed around your family.
          </p>
        </header>

        {/* Video Player Area with External Navigation Arrows */}
        <div className="relative w-full">
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 w-full">
            
            {/* Outer Left Navigation Arrow (Outside the Card) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous video story"
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white hover:bg-[#70152B] text-[#70152B] hover:text-white border-2 border-[#EAE1D5] hover:border-[#70152B] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Main Video Frame */}
            <div className="flex-1 max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ECE5DD] shadow-[0_6px_28px_rgba(58,29,29,0.06)] aspect-[16/9] bg-[#1A1412]">
              {ytId ? (
                <iframe
                  ref={iframeRef}
                  key={ytId}
                  src={`https://www.youtube-nocookie.com/embed/${ytId}?enablejsapi=1&autoplay=${isInView ? '1' : '0'}&mute=1&playsinline=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  ref={videoRef}
                  key={activeVideo.youtubeIdOrUrl}
                  src={activeVideo.youtubeIdOrUrl}
                  controls
                  playsInline
                  muted
                  autoPlay={isInView}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Outer Right Navigation Arrow (Outside the Card) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next video story"
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white hover:bg-[#70152B] text-[#70152B] hover:text-white border-2 border-[#EAE1D5] hover:border-[#70152B] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Video Switcher Bar Below Video */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 px-3 sm:px-14 md:px-16 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] sm:text-xs font-bold text-[#70152B] uppercase tracking-wider bg-[#FAF0EB] px-2.5 py-1 rounded-md border border-[#E8D0C5]">
                {activeVideo.tag}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#3A1D1D] truncate max-w-[200px] sm:max-w-md">
                {activeVideo.family}
              </span>
            </div>

            {/* Video Story Dots / Counter */}
            <div className="flex items-center space-x-2">
              {videoStories.map((story, idx) => (
                <button
                  key={story.id || idx}
                  type="button"
                  onClick={() => setCurrentVideoIdx(idx)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === safeIdx
                      ? 'w-6 sm:w-8 bg-[#70152B]'
                      : 'w-2 sm:w-2.5 bg-[#D8C7B8] hover:bg-[#70152B]/60'
                  }`}
                  aria-label={`Go to video story ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] font-bold text-[#6E5652] pl-1.5">
                {safeIdx + 1}/{videoStories.length}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Reduced-Height Feature Cards (Icons Removed) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 w-full">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#ECE5DD] shadow-[0_2px_12px_rgba(58,29,29,0.03)] hover:border-[#70152B]/40 hover:shadow-[0_8px_20px_rgba(112,21,43,0.06)] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-center"
            >
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#3A1D1D] tracking-tight leading-snug mb-1">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-[13px] text-[#6E5652] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Transition / Real Experiences Indicator */}
        <div className="flex flex-col items-center justify-center pt-2 sm:pt-4 select-none">
          <div className="w-8 h-8 rounded-full bg-[#1F1716] text-white flex items-center justify-center shadow-xs mb-2.5">
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#6E5652] italic flex items-center gap-1.5">
            <span className="font-serif text-lg leading-none text-[#70152B] font-bold">&ldquo;</span>
            Real experiences. Meaningful support.
          </p>
        </div>

      </div>
    </section>
  );
};
