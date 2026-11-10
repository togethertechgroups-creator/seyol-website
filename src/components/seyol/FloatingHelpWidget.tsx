'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Calendar } from 'lucide-react';

export const FloatingHelpWidget: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Hide on admin or portal routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) {
    return null;
  }

  // Official SEYOL WhatsApp Link
  const whatsappUrl = 'https://wa.me/919840012345?text=Hello%20SEYOL%20Care%20Team%2C%20I%20would%20like%20guidance%20with%20your%20services.';

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Dropdown Options Popup */}
      <div
        className={`mb-3 w-[300px] max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl border border-[#E8E0D2] shadow-[0_12px_36px_rgba(58,29,29,0.16)] p-4 transition-all duration-200 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none select-none'
        }`}
        role="dialog"
        aria-label="Care assistance options"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]/80">
          <div className="text-left">
            <h3 className="font-heading font-bold text-sm text-[#7B1131] leading-tight">
              Need Help?
            </h3>
            <p className="text-[11px] text-[#7A6363] font-sans mt-0.5">
              Connect directly with our care advisors
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full bg-[#F7F4EF] hover:bg-[#EDE7DC] text-[#7B1131] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Exactly Two Options */}
        <div className="pt-3 space-y-2.5">
          {/* Option 1: WhatsApp Us */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F4EF] hover:bg-[#FAF6EE] text-[#3A1D1D] hover:text-[#7B1131] border border-[#E8E0D2] transition-all duration-200 group text-left cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <div className="w-10 h-10 rounded-full bg-[#7B1131] text-white flex items-center justify-center shrink-0 group-hover:bg-[#5A0C24] transition-colors">
              {/* WhatsApp Icon */}
              <svg
                className="w-5 h-5 fill-current text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-sm text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-tight">
                WhatsApp Us
              </div>
              <div className="text-[11px] text-[#7A6363] font-sans leading-tight mt-0.5">
                Chat with our official care team
              </div>
            </div>
          </a>

          {/* Option 2: Book a 15-Minute Call */}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F4EF] hover:bg-[#FAF6EE] text-[#3A1D1D] hover:text-[#7B1131] border border-[#E8E0D2] transition-all duration-200 group text-left cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <div className="w-10 h-10 rounded-full bg-[#7B1131] text-white flex items-center justify-center shrink-0 group-hover:bg-[#5A0C24] transition-colors">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-sm text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-tight">
                Book a 15-Minute Call
              </div>
              <div className="text-[11px] text-[#7A6363] font-sans leading-tight mt-0.5">
                Schedule your appointment online
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Floating Button (Solid Maroon, Clean, No Gold Border) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close help options' : 'Need Help?'}
        aria-expanded={isOpen}
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-sm shadow-[0_8px_25px_rgba(123,17,49,0.35)] hover:shadow-[0_12px_32px_rgba(123,17,49,0.45)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-0 outline-none select-none"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 text-white shrink-0" />
            <span className="tracking-wide">Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-4 h-4 text-white shrink-0" />
            <span className="tracking-wide">Need Help?</span>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingHelpWidget;
