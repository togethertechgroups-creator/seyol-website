'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Download, 
  BookOpen, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Lock, 
  Heart,
  Gift,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Printer,
  Smartphone,
  Layers,
  Star,
  Check,
  Zap,
  X
} from 'lucide-react';
import { resourceBundlesData, resourcesData } from '../../data/resources';
import { ResourceBundle, JourneyStage } from '../../types';
import { ResourceAccessWizard } from '../../components/interactive/ResourceAccessWizard';
import { GatedVideoPlayer } from '../../components/interactive/GatedVideoPlayer';
import { EmailCapture } from '../../components/shared/EmailCapture';
import ChooseByStage from '../../components/interactive/ChooseByStage';
import FindWhatYouNeed from '../../components/interactive/FindWhatYouNeed';
import MostPopularResources from '../../components/interactive/MostPopularResources';
import ShopSEYOLResources from '../../components/interactive/ShopSEYOLResources';
import ResourceBundles from '../../components/interactive/ResourceBundles';

export default function ResourcesPage() {
  const [selectedStage, setSelectedStage] = useState<JourneyStage>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalBundleId, setActiveModalBundleId] = useState<string | null>(null);
  const wizardAnchorRef = useRef<HTMLDivElement>(null);

  const handleOpenWizard = (bundleId: string) => {
    setActiveModalBundleId(bundleId);
  };

  const freeStarterPack = resourceBundlesData.find((b) => b.id === 'bundle-free-starter-pack') || resourceBundlesData[0];
  const masterBundle = resourceBundlesData.find((b) => b.id === 'bundle-seyol-complete-master') || resourceBundlesData[7];

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* 1. Hero Header - The SEYOL Parent Resource Hub */}
      <section className="relative overflow-hidden bg-cream pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {/* Eyebrow, Heading, and Description */}
          <div className="space-y-2.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#8C4A5A] block">
              YOUR PARENTHOOD JOURNEY, SUPPORTED
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#651F32] tracking-tight leading-tight">
              The SEYOL Parent Resource Hub
            </h1>

            <p className="text-sm sm:text-base text-[#6E5D61] max-w-2xl leading-relaxed">
              Trusted learning resources for pregnancy, birth preparation, newborn care and postpartum recovery — all in one place.
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-warm-sm border border-[#E8DCD3] bg-cream-light aspect-[16/9] max-h-[460px]">
            <img
              src="/images/resources/parent-resource-hub.jpg"
              alt="The SEYOL Parent Resource Hub"
              className="w-full h-full object-cover object-center"
            />
            {/* Bookmark button in top right */}
            <button
              type="button"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-maroon text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Bookmark this page"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#explore-resources"
              className="px-5 sm:px-6 py-2.5 rounded-full border-2 border-[#651F32] hover:bg-[#651F32] text-[#651F32] hover:text-white font-medium text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-xs"
            >
              <span>Explore Resources</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#video-library"
              className="px-5 sm:px-6 py-2.5 rounded-full border border-gray-300 hover:border-maroon/60 bg-white/70 hover:bg-white text-[#374151] hover:text-maroon font-medium text-xs sm:text-sm transition-all shadow-xs"
            >
              <span>Access Video Library</span>
            </a>

            <a
              href="#explore-resources"
              className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-maroon text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
              aria-label="Scroll to resources"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Choose by Stage Section */}
      <ChooseByStage
        onBrowseResources={(stage) => {
          if (stage === 'pregnancy' || stage === 'birth' || stage === 'newborn' || stage === 'postpartum') {
            setSelectedStage(stage as JourneyStage);
          } else if (stage === 'feeding') {
            setSelectedStage('newborn');
            setSearchQuery('feeding');
          } else if (stage === 'massage') {
            setSelectedStage('newborn');
            setSearchQuery('massage');
          }
          const el = document.getElementById('explore-resources');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. Find What You Need Section */}
      <FindWhatYouNeed
        onSelectResource={(title) => {
          setSearchQuery(title);
          const el = document.getElementById('explore-resources');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 4. Most Popular Resources Section */}
      <MostPopularResources
        onCheckout={() => handleOpenWizard('bundle-seyol-complete-master')}
        onExploreComplete={() => {
          const el = document.getElementById('shop-resources') || document.getElementById('explore-resources');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Complete Master Bundle Spotlight */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-gradient-to-br from-brown via-maroon-dark to-brown rounded-3xl p-6 sm:p-8 text-cream-light relative overflow-hidden shadow-warm-lg">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-cream-light">
                    {masterBundle.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-cream-muted mt-2 leading-relaxed max-w-2xl">
                    {masterBundle.description}
                  </p>
                </div>

                {/* 6 Paid Bundles Included Sub-grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  {[
                    'Newborn Care Starter Bundle',
                    'Baby Massage & Bath Bundle',
                    'Breastfeeding & Bottle Feeding Bundle',
                    'Birth Preparation Toolkit',
                    'Pregnancy Comfort & Movement Bundle',
                    'Postpartum Recovery & Confinement Bundle'
                  ].map((name, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[11px] text-cream-light bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10">
                      <Check className="w-3.5 h-3.5 text-gold-light shrink-0" />
                      <span className="truncate">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gold/30 text-center space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                    Complete Library Price
                  </span>
                  <div className="flex items-baseline justify-center space-x-2 my-1">
                    <span className="font-serif text-4xl font-extrabold text-gold-light">₹1,299</span>
                    <span className="text-sm text-cream-muted line-through">₹5,694</span>
                  </div>
                  <span className="text-xs font-bold text-gold bg-gold/20 px-2.5 py-0.5 rounded-full inline-block">
                    Save ₹4,395 (77% Discount)
                  </span>
                </div>

                <button
                  onClick={() => handleOpenWizard('bundle-seyol-complete-master')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-extrabold text-xs shadow-warm-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Complete Master Bundle</span>
                </button>

                <p className="text-[10px] text-cream-muted">
                  Includes lifetime Care Portal locker updates & instant ZIP download
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* 5. Shop SEYOL Resources Section */}
      <div id="explore-resources">
        <div id="shop-resources">
          <ShopSEYOLResources
            onCheckout={() => handleOpenWizard('bundle-seyol-complete-master')}
          />
        </div>
      </div>

      {/* Access the SEYOL Video Library */}
      <section id="video-library" className="py-16 px-4 sm:px-6 lg:px-8 bg-cream border-t border-cream-border scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <GatedVideoPlayer />
        </div>
      </section>

      {/* 6. Resource Bundles Section */}
      <ResourceBundles
        onAddToCart={() => handleOpenWizard('bundle-seyol-complete-master')}
      />

      {/* 4. Featured Spotlight: Free New Parent Starter Pack Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-6">
        <div className="bg-gradient-to-r from-maroon-soft via-cream-light to-gold-soft rounded-3xl border-2 border-gold/40 p-6 sm:p-8 shadow-warm-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-maroon text-cream-light text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Complimentary Resource Kit
                </span>
                <span className="bg-gold/30 text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  5 Essential Tools Included
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
                  {freeStarterPack.title}
                </h2>
                <p className="text-xs sm:text-sm text-brown-muted mt-1 leading-relaxed">
                  {freeStarterPack.description}
                </p>
              </div>

              {/* 5 Inclusions Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {freeStarterPack.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-brown bg-white/80 px-3 py-2 rounded-xl border border-cream-border shadow-warm-sm">
                    <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                    <span className="font-semibold truncate">{inc.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action & Value */}
            <div className="lg:col-span-4 bg-white/90 rounded-2xl p-5 border border-gold-border text-center space-y-3 shadow-warm-sm">
              <div>
                <div className="text-[10px] uppercase font-bold text-brown-muted">Package Value</div>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="font-serif text-3xl font-black text-maroon">FREE</span>
                  <span className="text-xs text-brown-muted line-through">₹499 Value</span>
                </div>
                <div className="text-[11px] text-brown-muted mt-0.5">Instant delivery via Email & WhatsApp</div>
              </div>

              <button
                onClick={() => handleOpenWizard('bundle-free-starter-pack')}
                className="w-full py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-gold-light" />
                <span>Instant Free Download</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      

      

      {/* 6. Inline Interactive 4-Step Access & Checkout Wizard Section */}
      <section ref={wizardAnchorRef} id="access-wizard" className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark/20 border-t border-cream-border">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Interactive 4-Step Access Gateway
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
              Complete Your Digital Access Setup
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted max-w-xl mx-auto">
              Follow the 4 simple steps below to configure your recipient details, accept terms, and instantly unlock your guides.
            </p>
          </div>

          <ResourceAccessWizard
            initialBundleId="bundle-free-starter-pack"
            isModal={false}
          />
        </div>
      </section>

      {/* 8. Frequently Asked Questions (FAQ) on Digital Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark/30 border-t border-cream-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">Resource FAQs</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-brown-muted">
              Everything you need to know about our digital downloads, printing guidelines, and Care Portal access.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What format do the resources come in?',
                a: 'All SEYOL resources are formatted as high-resolution printable PDFs designed for standard A4 and US Letter printers. Certain trackers and templates also include fillable digital PDF forms that can be edited on iPad, phone, or laptop.'
              },
              {
                q: 'How will I receive my downloads after completing the wizard?',
                a: 'Immediately upon completing Step 4, an instant download locker opens on your screen with 1-click links. You also instantly receive direct download links sent to your verified email address and WhatsApp number.'
              },
              {
                q: 'Can I gift a resource bundle to an expecting friend or family member?',
                a: 'Yes! In Step 2 (Access Details), select "Buying as a Gift". You can enter the recipient’s name, email, WhatsApp, and a personalized gift message. We will dispatch the bundle directly to them with your note.'
              },
              {
                q: 'What is the SEYOL Care Portal account option in Step 1?',
                a: 'Creating a SEYOL Care Portal account is completely free. It securely stores all your purchased and free digital guides in one permanent cloud locker so you can re-download anytime without searching through old emails.'
              },
              {
                q: 'Are the recipes and postpartum routines safe for C-section births?',
                a: 'Yes. Our guides specifically delineate timelines and safety adjustments for both spontaneous vaginal deliveries and Caesarean births, including C-section scar hygiene and delayed abdominal binding protocols.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-cream-light rounded-2xl p-5 border border-cream-border space-y-2 shadow-warm-sm">
                <h4 className="font-serif font-bold text-sm sm:text-base text-brown">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup for Fast Access Wizard */}
      {activeModalBundleId && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#3a1d1d]/75 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModalBundleId(null)}
          />
          <div className="relative w-full max-w-4xl z-10 my-8" onClick={(e) => e.stopPropagation()}>
            <ResourceAccessWizard
              initialBundleId={activeModalBundleId}
              isModal={true}
              onClose={() => setActiveModalBundleId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
