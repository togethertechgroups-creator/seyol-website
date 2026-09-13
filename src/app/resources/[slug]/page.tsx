'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Download, 
  CheckCircle2, 
  FileText, 
  ChevronLeft, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  ArrowRight,
  BookOpen,
  Lock,
  Gift,
  ShieldCheck,
  Check
} from 'lucide-react';
import { resourcesData, resourceBundlesData } from '../../../data/resources';
import { useCart } from '../../../context/CartContext';
import { ResourceAccessWizard } from '../../../components/interactive/ResourceAccessWizard';

export default function ResourceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, openCart } = useCart();
  const [downloaded, setDownloaded] = useState(false);
  const [isWizardModalOpen, setIsWizardModalOpen] = useState(false);

  // Match either bundle or individual resource item
  const bundle = resourceBundlesData.find((b) => b.slug === slug);
  const resource = resourcesData.find((r) => r.slug === slug);

  if (!bundle && !resource) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto font-sans bg-cream min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl font-bold text-maroon">Resource Not Found</h2>
        <p className="text-xs text-brown-muted">The requested guide or bundle could not be located in our digital library.</p>
        <Link href="/resources" className="inline-block px-6 py-3 bg-maroon text-cream-light text-xs font-bold rounded-xl shadow-warm-sm">
          Return to Resources Hub
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000);
  };

  // If viewing a bundle
  if (bundle) {
    return (
      <div className="flex flex-col w-full font-sans bg-cream text-brown">
        {/* Breadcrumb */}
        <div className="bg-cream-dark/30 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-cream-border text-xs text-brown-muted">
          <div className="max-w-7xl mx-auto flex items-center space-x-2">
            <Link href="/resources" className="hover:text-maroon flex items-center space-x-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>All Resources & Bundles</span>
            </Link>
            <span>/</span>
            <span className="text-maroon font-bold truncate">{bundle.title}</span>
          </div>
        </div>

        {/* Hero Showcase */}
        <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="bg-maroon-soft text-maroon text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-maroon/20">
                  {bundle.stage.toUpperCase()}
                </span>
                <span className="bg-gold-soft text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-border">
                  {bundle.totalGuides} Guides Included
                </span>
                {bundle.badge && (
                  <span className="bg-maroon text-cream-light text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {bundle.badge}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-tight">
                {bundle.title}
              </h1>

              <p className="text-sm sm:text-base text-brown-muted leading-relaxed">
                {bundle.description}
              </p>

              {/* Inclusions List */}
              <div className="bg-cream-light p-6 rounded-3xl border border-cream-border space-y-4 shadow-warm-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-maroon flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gold-dark" />
                    <span>Included Guides & Checklists ({bundle.inclusions.length})</span>
                  </div>
                  <span className="text-[11px] text-brown-muted">{bundle.format}</span>
                </div>

                <div className="space-y-2.5">
                  {bundle.inclusions.map((item, idx) => (
                    <div key={idx} className="bg-cream p-3.5 rounded-2xl border border-cream-border flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs text-brown flex items-center space-x-2">
                          <span>{item.title}</span>
                          {item.pages && <span className="text-[10px] text-brown-muted font-normal">({item.pages})</span>}
                        </div>
                        {item.description && (
                          <p className="text-xs text-brown-muted mt-0.5 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-cream-light p-5 rounded-2xl border border-cream-border">
                <div>
                  <div className="text-[10px] uppercase font-bold text-brown-muted">Price</div>
                  <div className="flex items-baseline space-x-2">
                    {bundle.isFree ? (
                      <span className="font-serif text-3xl font-black text-maroon">FREE</span>
                    ) : (
                      <>
                        <span className="font-serif text-3xl font-black text-maroon">₹{bundle.price}</span>
                        {bundle.originalPrice && (
                          <span className="text-sm text-brown-muted line-through">₹{bundle.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setIsWizardModalOpen(true)}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-warm-md flex items-center space-x-2 hover:scale-[1.02] transition-all ${
                    bundle.isFree
                      ? 'bg-maroon hover:bg-maroon-dark text-cream-light'
                      : 'bg-gold hover:bg-gold-light text-maroon-dark'
                  }`}
                >
                  {bundle.isFree ? (
                    <>
                      <Download className="w-4 h-4 text-gold-light" />
                      <span>Download Free Starter Pack (₹0)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock Bundle Access (₹{bundle.price})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Cover Art & Value Pillars */}
            <div className="lg:col-span-5 space-y-6">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-warm-lg border border-cream-border relative bg-brown">
                <img
                  src={bundle.coverImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-cream-light p-5 rounded-2xl border border-cream-border space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-brown">
                  What Happens After Completing Access:
                </div>
                <div className="space-y-2 text-xs text-brown-muted">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                    <span>Instant on-screen download links for all included PDFs</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                    <span>Dispatched to your verified email & WhatsApp</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                    <span>Option to save to SEYOL Care Portal for permanent cloud access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Access Wizard */}
        {isWizardModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-[#3a1d1d]/75 backdrop-blur-sm transition-opacity"
              onClick={() => setIsWizardModalOpen(false)}
            />
            <div className="relative w-full max-w-4xl z-10 my-8" onClick={(e) => e.stopPropagation()}>
              <ResourceAccessWizard
                initialBundleId={bundle.id}
                isModal={true}
                onClose={() => setIsWizardModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Individual resource item fallback
  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      <div className="bg-cream-dark/30 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-cream-border text-xs text-brown-muted">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link href="/resources" className="hover:text-maroon flex items-center space-x-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>All Resources</span>
          </Link>
          <span>/</span>
          <span className="text-maroon font-bold truncate">{resource?.title}</span>
        </div>
      </div>

      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="bg-maroon-soft text-maroon text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-maroon/20">
                {resource?.stage}
              </span>
              <span className="bg-gold-soft text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-border">
                {resource?.pagesOrDuration}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight leading-tight">
              {resource?.title}
            </h1>

            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {resource?.description}
            </p>

            <div className="bg-cream-light p-5 rounded-2xl border border-cream-border space-y-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                What is Covered Inside This Guide:
              </div>
              {resource?.previewPoints.map((pt, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-brown">
                  <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/resources#access-wizard"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md hover:scale-[1.02] transition-all"
              >
                <Download className="w-4 h-4 text-gold-light" />
                <span>Access in SEYOL Digital Gateway</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-warm-lg border border-cream-border relative bg-brown">
              <img
                src={resource?.coverImage}
                alt={resource?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
