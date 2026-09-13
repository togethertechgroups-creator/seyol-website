'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const BeforeAfterRoutineUI: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="w-full bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-lg space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span>Real Ritual Outcomes</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
          Before & After 21-Day SEY Routine
        </h3>
        <p className="text-xs sm:text-sm text-brown-muted">
          Drag the interactive slider to compare dry infant skin & maternal fatigue before vs after cold-pressed oil rituals.
        </p>
      </div>

      {/* Interactive Visual Comparison Container */}
      <div className="relative max-w-3xl mx-auto aspect-16/9 rounded-2xl overflow-hidden shadow-warm-md border-2 border-gold/40 select-none">
        {/* After Image (Full background) */}
        <Image
          src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=1200"
          alt="After SEY Routine - Nourished Skin & Rested Mother"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-maroon text-cream-light text-xs font-bold px-3 py-1 rounded-full shadow-md">
          After: 21 Days SEY Ritual
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden border-r-2 border-gold"
          style={{ width: `${sliderPos}%` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200"
            alt="Before SEY Routine - Dry Skin & Exhaustion"
            fill
            unoptimized
            className="object-cover filter grayscale contrast-125"
          />
          <div className="absolute top-4 left-4 bg-cream-dark text-brown text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Before: Dry / Unsettled
          </div>
        </div>

        {/* Range Slider Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-3xl mx-auto pt-2">
        <div className="bg-cream p-3 rounded-xl border border-cream-border text-xs space-y-1">
          <div className="font-bold text-maroon">98% Moisture Retention</div>
          <div className="text-brown-muted">Sustained skin hydration across 24 hrs</div>
        </div>
        <div className="bg-cream p-3 rounded-xl border border-cream-border text-xs space-y-1">
          <div className="font-bold text-maroon">Colic Soothing in 15 Mins</div>
          <div className="text-brown-muted">Asafoetida & nutmeg digestive oil</div>
        </div>
        <div className="bg-cream p-3 rounded-xl border border-cream-border text-xs space-y-1">
          <div className="font-bold text-maroon">100% Edible Cold-Pressed</div>
          <div className="text-brown-muted">Zero mineral oils or synthetic perfumes</div>
        </div>
      </div>
    </div>
  );
};
