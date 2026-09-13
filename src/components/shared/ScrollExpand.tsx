'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollExpand.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollExpand = ({
  src = '/assets4/video_project_8.mp4',
  mediaType = 'video',
  poster = '',
  alt = 'SEYOL Maternal Sanctuary',
  title = 'Ancient Traditions. Sacred Maternal Care.',
  scrollHint = 'SCROLL DOWN TO EXPAND SANCTUARY',
  children,
  className = '',
  style,
}: ScrollExpandProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement & HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    const media = mediaRef.current;
    if (!section || !box || !media) return;

    const isMobile = window.innerWidth < 768;
    const initialWidth = isMobile ? '90vw' : '62vw';
    const initialHeight = isMobile ? '58vh' : '68vh';
    const initialRadius = isMobile ? '20px' : '30px';

    const ctx = gsap.context(() => {
      // Set initial values with exact matching units (vw, vh, px)
      gsap.set(box, {
        width: initialWidth,
        height: initialHeight,
        borderRadius: initialRadius,
      });
      gsap.set(media, {
        scale: 1.35,
      });
      if (scrimRef.current) gsap.set(scrimRef.current, { opacity: 0.2 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, scale: 1, y: 0 });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1, y: 0 });
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0, y: 30, pointerEvents: 'none' });

      // GSAP ScrollTrigger timeline with pin: true and scrub: 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (overlayRef.current) {
              overlayRef.current.style.pointerEvents = self.progress > 0.65 ? 'auto' : 'none';
            }
          },
        },
      });

      // 1. Box expands smoothly: Width -> 100vw, Height -> 100vh, Border radius -> 0px
      tl.to(
        box,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // 2. Video zoom/parallax: scales smoothly from 1.35 down to 1.0 (revealing full wide view)
      tl.to(
        media,
        {
          scale: 1.0,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // 3. Darken scrim for rich readability
      if (scrimRef.current) {
        tl.to(
          scrimRef.current,
          {
            opacity: 0.78,
            ease: 'power1.inOut',
            duration: 1,
          },
          0
        );
      }

      // 4. Initial Title scales slightly and fades out
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            opacity: 0,
            scale: 1.08,
            y: -30,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.05
        );
      }

      // 5. Scroll hint fades out immediately
      if (hintRef.current) {
        tl.to(
          hintRef.current,
          {
            opacity: 0,
            y: 15,
            ease: 'power2.out',
            duration: 0.22,
          },
          0
        );
      }

      // 6. After full expansion (0.70 to 1.0): Sanctuary overlay smoothly reveals with crystal-clear visibility
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.30,
          },
          0.70
        );
      }
    }, section);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const mediaElement =
    mediaType === 'video' ? (
      <video
        ref={mediaRef as React.Ref<HTMLVideoElement>}
        className="scroll-expand-media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef as React.Ref<HTMLImageElement>}
        className="scroll-expand-media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <section
      ref={sectionRef}
      className={`scroll-expand-section ${className}`.trim()}
      style={style}
    >
      <div ref={boxRef} className="scroll-expand-box">
        {mediaElement}
        <div ref={scrimRef} className="scroll-expand-scrim" />
        {children ? (
          <div ref={overlayRef} className="scroll-expand-overlay">
            {children}
          </div>
        ) : null}
        {title ? (
          <div ref={titleRef} className="scroll-expand-title">
            {title}
          </div>
        ) : null}
        {scrollHint ? (
          <div ref={hintRef} className="scroll-expand-hint">
            {scrollHint}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ScrollExpand;
