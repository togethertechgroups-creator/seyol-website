'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { legalPoliciesData } from '../../../data/legal';

export default function LegalPolicyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const policy = legalPoliciesData[slug];

  if (!policy) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4 max-w-md mx-auto font-sans px-4">
        <h2 className="font-heading text-2xl font-bold text-maroon">Document Not Found</h2>
        <p className="text-xs text-brown-muted">The requested legal document could not be located.</p>
        <Link href="/" className="inline-block px-5 py-2.5 bg-maroon text-cream-light text-xs font-bold rounded-xl">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown min-h-screen">
      {/* Hero Header with proper fixed navbar clearance */}
      <section className="bg-cream-dark/40 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        <div className="max-w-4xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-xs text-brown-muted">
            <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
            <span>/</span>
            <span>Legal & Institutional Policies</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
            {policy.title}
          </h1>
          <div className="flex items-center space-x-2 text-xs text-brown-muted pt-1">
            <Clock className="w-3.5 h-3.5 text-gold-dark" />
            <span>Effective Last Updated: {policy.lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content without background card */}
      <main className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          {/* Subtle Summary Callout */}
          <div className="p-4 sm:p-5 bg-gold-soft/50 border-l-4 border-maroon rounded-r-2xl text-xs sm:text-sm text-brown leading-relaxed">
            <strong className="text-maroon font-bold">Summary of Policy: </strong>
            <span>{policy.summary}</span>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 text-brown leading-relaxed">
            {policy.sections.map((section) => (
              <div 
                key={section.id} 
                id={section.id} 
                className="space-y-3 pt-6 border-t border-cream-border/70 first:pt-0 first:border-0"
              >
                <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-maroon">
                  {section.heading}
                </h2>
                <p className="text-brown-muted leading-relaxed whitespace-pre-line text-sm sm:text-[15px]">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Footer Navigation */}
          <div className="pt-8 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-brown-muted">
            <div className="text-center sm:text-left">
              <span className="font-medium text-brown">Questions regarding terms? </span>
              <a 
                href="mailto:hello@seyolpregnancycare.com" 
                className="text-maroon underline font-medium hover:text-maroon-dark transition-colors"
              >
                hello@seyolpregnancycare.com
              </a>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center space-x-1.5 text-maroon font-bold hover:underline"
            >
              <span>Return to Home</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
