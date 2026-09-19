'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const setupObserver = () => {
      // 1. Automatically identify all cards, headings, grids, and content sections across the page
      const autoTargets = document.querySelectorAll<HTMLElement>(
        'section h2, section h3, section > div > p, .grid > div, [data-reveal], [data-aos], .scroll-reveal, article, .rounded-3xl, .rounded-2xl, .accordion-item, .card-hover'
      );

      // Stagger grouped items (like product grids, service grids, class grids)
      const grids = document.querySelectorAll<HTMLElement>('.grid, [data-reveal-stagger]');
      grids.forEach((grid) => {
        const children = Array.from(grid.children) as HTMLElement[];
        children.forEach((child, idx) => {
          if (!child.getAttribute('data-reveal')) {
            child.setAttribute('data-reveal', 'fade-up');
            // Stagger cards in rows (0ms, 120ms, 240ms, 360ms)
            child.style.transitionDelay = `${(idx % 4) * 0.1}s`;
          }
        });
      });

      // 2. Prepare intersection observer
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add('is-revealed');
              target.classList.add('aos-animate');
              // Unobserve once revealed for peak performance
              observer?.unobserve(target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      // 3. Mark elements ready and observe
      autoTargets.forEach((el) => {
        // Skip header, nav, sticky pinned horizontal scroll & sections with no-scroll-reveal
        if (
          el.closest('header') ||
          el.closest('nav') ||
          el.closest('.sticky') || 
          el.classList.contains('sticky') || 
          el.closest('.no-scroll-reveal') || 
          el.classList.contains('no-scroll-reveal') ||
          el.id === 'booking-process'
        ) {
          return;
        }

        if (!el.hasAttribute('data-reveal') && !el.hasAttribute('data-aos')) {
          el.setAttribute('data-reveal', 'fade-up');
        }

        el.classList.add('reveal-ready');
        el.classList.add('aos-init');

        const rect = el.getBoundingClientRect();
        // Immediately reveal elements already in the top viewport on first load
        if (rect.top < window.innerHeight - 80 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          el.classList.add('aos-animate');
        } else {
          observer?.observe(el);
        }
      });
    };

    // Run setup after brief render tick
    const timer = setTimeout(setupObserver, 80);

    // Watch for dynamic DOM changes (e.g. tabs, filters, pagination)
    mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
