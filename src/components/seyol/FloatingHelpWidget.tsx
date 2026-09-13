'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Compass, Phone, Calendar, Sparkles } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const FloatingHelpWidget: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { openEnquiry } = useQuickEnquiry();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-maroon text-cream-light hover:bg-maroon-dark shadow-warm-lg border border-gold/40 transition-all hover:scale-105 flex items-center space-x-2 group"
        >
          <MessageCircle className="w-5 h-5 text-gold-light group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-bold text-xs">Need Care Guidance?</span>
        </button>
      )}

      {/* Expanded Quick Help Popup */}
      {isOpen && (
        <div className="w-80 bg-cream-light rounded-2xl border-2 border-gold/40 shadow-warm-lg p-5 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center space-x-2 text-maroon font-serif font-bold text-sm">
              <Sparkles className="w-4 h-4 text-gold-dark" />
              <span>SEYOL Care Advisor</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-brown-muted hover:text-maroon rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brown-muted leading-relaxed">
            Not sure which confinement package or massage duration is right for your recovery? We are here to guide you.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                openEnquiry({ serviceTitle: '1-on-1 Care Consultation' });
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-sm flex items-center justify-center space-x-2 hover:bg-maroon-dark transition-colors"
            >
              <Calendar className="w-4 h-4 text-gold-light" />
              <span>Book 15-Min Guidance Session</span>
            </button>

            <a
              href="mailto:hello@seyolpregnancycare.com"
              className="block w-full text-center py-2 px-3 rounded-xl bg-cream border border-cream-border text-brown font-bold text-xs hover:bg-cream-dark transition-colors"
            >
              Direct Email Helpline
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
