'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Lenis Smooth Scroll Initialization
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
            infinite: false,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);

        (window as any).__lenis = lenis;

        // Ensure ScrollTrigger refreshes once layout settles
        const timer1 = setTimeout(() => ScrollTrigger.refresh(), 200);
        const timer2 = setTimeout(() => ScrollTrigger.refresh(), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            delete (window as any).__lenis;
        };
    }, []);

    return null;
}
