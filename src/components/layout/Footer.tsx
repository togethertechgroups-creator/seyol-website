'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import wordmarkWhiteSrc from '../../assets4/Wordmark - White.png';
import { 
  Heart, 
  Mail, 
  MapPin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) {
    return null;
  }

  return (
    <footer className="bg-[#7B1131] text-cream-light font-sans pt-16 pb-10 border-t border-maroon/40 shadow-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream-light/15">
          {/* Col 1: Brand Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group py-1">
              <div className="relative w-[150px] sm:w-[180px] h-[45px] sm:h-[55px] shrink-0">
                <Image
                  src={wordmarkWhiteSrc}
                  alt="SEYOL Mother & Baby Care"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-left group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            <p className="text-sm text-cream-light/80 leading-relaxed pr-4">
              Honouring traditional Indian mother and newborn care through evidence-informed postnatal therapies, certified birth doulas, nourishing herbal formulations, and compassionate home confinement care.
            </p>
            <div className="flex flex-col space-y-2 text-xs text-cream-light/70 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold-light" />
                <span>Serving Chennai, Tamil Nadu & Global Virtual Cohorts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-light" />
                <a href="mailto:hello@seyolpregnancycare.com" className="text-gold-light hover:underline">
                  hello@seyolpregnancycare.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-gold-light">Care Services</h4>
            <ul className="space-y-2 text-xs text-cream-light/80">
              <li>
                <Link href="/services#postpartum-massage" className="hover:text-gold-light transition-colors">
                  Postpartum Massage & Wrap
                </Link>
              </li>
              <li>
                <Link href="/services#mother-baby-combo" className="hover:text-gold-light transition-colors">
                  Mother & Baby Combo
                </Link>
              </li>
              <li>
                <Link href="/services#infant-massage" className="hover:text-gold-light transition-colors">
                  Infant Massage & Bath
                </Link>
              </li>
              <li>
                <Link href="/services#confinement-nanny" className="hover:text-gold-light transition-colors">
                  24/7 Confinement Nannies
                </Link>
              </li>
              <li>
                <Link href="/services#birth-doula" className="hover:text-gold-light transition-colors">
                  Birth Doula Support
                </Link>
              </li>
              <li>
                <Link href="/services#lactation" className="hover:text-gold-light transition-colors">
                  Lactation Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Education & Products */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-gold-light">Masterclasses & SEY</h4>
            <ul className="space-y-2 text-xs text-cream-light/80">
              <li>
                <Link href="/classes" className="hover:text-gold-light transition-colors">
                  Baby Massage Masterclass
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-gold-light transition-colors">
                  Newborn Care Essentials
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-gold-light transition-colors">
                  Postpartum Confinement Class
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-light transition-colors">
                  SEY Soothing Baby Oil
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-light transition-colors">
                  SEY Colic Relief Tummy Roll-On
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-light transition-colors">
                  Vethu Kuli Herbal Bath Sachets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional & Careers */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-gold-light">Institution & Trust</h4>
            <ul className="space-y-2 text-xs text-cream-light/80">
              <li>
                <Link href="/our-story" className="hover:text-gold-light transition-colors">
                  Founders Story (Ms Jemma & Ms Janet)
                </Link>
              </li>
              <li>
                <Link href="/our-story#method" className="hover:text-gold-light transition-colors">
                  The SEYOL Method
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gold-light transition-colors">
                  Careers & Training Academy
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-gold-light transition-colors">
                  Gated Video Masterclass Library
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-light transition-colors">
                  Care Guidance Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream-light/60 gap-4">
          <div>
            &copy; {new Date().getFullYear()} SEYOL Mother & Baby Care. All rights reserved. Registered trademark.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/legal/privacy-policy" className="hover:text-gold-light transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/legal/terms-and-conditions" className="hover:text-gold-light transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/legal/service-booking-cancellation-policy" className="hover:text-gold-light transition-colors">
              Booking Policy
            </Link>
            <span>•</span>
            <Link href="/legal/product-safety-disclaimer" className="hover:text-gold-light transition-colors">
              Herbal Safety Disclaimer
            </Link>
            <span>•</span>
            <Link href="/legal/caregiver-code-of-conduct" className="hover:text-gold-light transition-colors">
              Caregiver Code of Conduct
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-gold-light font-bold text-gold/80 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
