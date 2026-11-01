'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  ChevronRight, 
  Mail, 
  ArrowLeft 
} from 'lucide-react';
import { legalPoliciesData } from '../../../data/legal';

export default function LegalPolicyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const policy = legalPoliciesData[slug];

  if (!policy) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto font-sans">
        <h2 className="font-serif text-2xl font-bold text-maroon">Document Not Found</h2>
        <p className="text-xs text-brown-muted">The requested legal document could not be located.</p>
        <Link href="/" className="inline-block px-5 py-2.5 bg-maroon text-cream-light text-xs font-bold rounded-xl">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Hero Header */}
      <section className="bg-cream-dark/40 py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs text-brown-muted">
            <Link href="/" className="hover:text-maroon">Home</Link>
            <span>/</span>
            <span>Legal & Institutional Policies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brown">
            {policy.title}
          </h1>
          <div className="flex items-center space-x-2 text-xs text-brown-muted pt-1">
            <Clock className="w-3.5 h-3.5 text-gold-dark" />
            <span>Effective Last Updated: {policy.lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-cream-light p-6 sm:p-10 md:p-12 rounded-3xl border border-cream-border shadow-warm-sm space-y-8">
          <div className="p-4 bg-gold-soft border border-gold-border rounded-2xl text-xs sm:text-sm text-brown leading-relaxed">
            <strong className="text-maroon font-bold">Summary of Policy: </strong>
            <span>{policy.summary}</span>
          </div>

          <div className="space-y-8 text-xs sm:text-sm text-brown leading-relaxed">
            {policy.sections.map((section) => (
              <div key={section.id} id={section.id} className="space-y-3 pt-6 border-t border-cream-border/60 first:pt-0 first:border-0">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-maroon">
                  {section.heading}
                </h2>
                <p className="text-brown-muted leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown-muted">
            <div className="text-center sm:text-left">
              <span className="font-medium text-brown">Questions regarding terms? </span>
              <a href="mailto:hello@seyolpregnancycare.com" className="text-maroon underline font-medium hover:text-maroon-dark">
                hello@seyolpregnancycare.com
              </a>
            </div>
            <Link href="/" className="text-maroon font-bold hover:underline flex items-center space-x-1">
              <span>Return to Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
