'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image: string;
  label: string;
  subtitle?: string;
  dotColor?: string;
  link?: string;
  alt?: string;
  tag?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number | null;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  tilt?: number;
  parallax?: number;
  className?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    label: 'Fertility & Family Building',
    subtitle: 'Free, covered by employer or health plan',
    link: '/services/preconception-support'
  },
  {
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200',
    label: 'Maternity & Newborn Care',
    subtitle: 'Free, covered by employer or health plan',
    link: '/services/prenatal-massage-therapy'
  },
  {
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    label: 'Parenting & Pediatrics',
    subtitle: 'Free, covered by employer or health plan',
    link: '/services/infant-bath-ritual'
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    label: 'Sacred Postpartum & Kizhi',
    subtitle: 'Free, covered by employer or health plan',
    link: '/services/postpartum-care'
  },
  {
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200',
    label: 'Menopause & Midlife Health',
    subtitle: 'Free, covered by employer or health plan',
    link: '/services/postpartum-care'
  }
];

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items = DEFAULT_ITEMS,
  defaultIndex = null,
  accentColor = '#c8a45d',
  overlayColor = '#18060d',
  textColor = '#ffffff',
  height = 480,
  gap = 16,
  radius = 20,
  expandRatio = 0.42,
  orientation = 'horizontal',
  duration = 0.55,
  ease = 'power3.out',
  trigger = 'hover',
  showLabels = true,
  className = ''
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState<number | null>(
    defaultIndex !== null && defaultIndex !== undefined && defaultIndex >= 0 && defaultIndex < count
      ? defaultIndex
      : null
  );

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isHovered = active !== null;
        const isActive = active === i;

        // Balanced 1:1:1:1:1 when idle; expand active card when hovered
        const flexVal = isHovered ? (isActive ? grow : 1) : 1;

        tl.to(panel, { flexGrow: flexVal, duration: dur, ease }, 0);
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, prefersReduced]
  );

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setActive(null);
    }
  };

  const handleClick = (i: number, e: React.MouseEvent) => {
    if (active !== i) {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <div
      ref={rootRef}
      onMouseLeave={handleMouseLeave}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      } as React.CSSProperties}
      role="list"
      aria-label="SEYOL Signature Services Accordion Gallery"
    >
      {items.map((item, i) => {
        const isActive = active === i;
        const Tag = item.link ? Link : 'div';
        const linkProps = item.link ? { href: item.link } : {};

        return (
          // @ts-ignore
          <Tag
            key={i}
            ref={(el: any) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            {...linkProps}
            onClick={(e: any) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              {/* Media Image Edge-to-Edge */}
              <span className="ag-panel__media">
                <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {/* Bottom Captions (Always 100% visible) */}
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__header">
                  <span className="ag-panel__bar" />
                  <span className="ag-panel__text">{item.label}</span>
                </span>
                {item.subtitle && <span className="ag-panel__subtitle">{item.subtitle}</span>}
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
