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

export default function ResourcesPage() {
  const [selectedStage, setSelectedStage] = useState<JourneyStage>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalBundleId, setActiveModalBundleId] = useState<string | null>(null);
  const [expandedBundleIds, setExpandedBundleIds] = useState<Record<string, boolean>>({});
  const wizardAnchorRef = useRef<HTMLDivElement>(null);

  // Filter bundles based on stage and search query
  const filteredBundles = resourceBundlesData.filter((bundle) => {
    const matchesStage =
      selectedStage === 'all' ||
      (bundle.stage as string) === (selectedStage as string) ||
      Boolean(bundle.isCompleteBundle);
    const matchesSearch =
      searchQuery.trim() === '' ||
      bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.inclusions.some((inc) => inc.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  const toggleBundleExpand = (id: string) => {
    setExpandedBundleIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenWizard = (bundleId: string) => {
    setActiveModalBundleId(bundleId);
  };

  const freeStarterPack = resourceBundlesData.find((b) => b.id === 'bundle-free-starter-pack') || resourceBundlesData[0];
  const masterBundle = resourceBundlesData.find((b) => b.id === 'bundle-seyol-complete-master') || resourceBundlesData[7];

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark/60 via-cream-light to-cream pt-24 sm:pt-28 pb-14 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        {/* Subtle Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-maroon/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider shadow-warm-sm">
            <BookOpen className="w-4 h-4 text-gold-dark" />
            <span>Digital Library • Evidence-Grounded Maternal Wisdom</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-brown tracking-tight leading-tight">
            Curated Mother & Baby <br />
            <span className="text-maroon">Digital Resource Toolkits</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brown-muted max-w-3xl mx-auto leading-relaxed">
            From the first positive test to the sacred 40 days of postpartum confinement and newborn routines. Access high-resolution printable checklists, traditional recipe workbooks, massage step sheets, and fillable trackers.
          </p>

          {/* Quick Value Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl mx-auto text-left">
            {[
              { title: '37+ Printable Tools', desc: 'Checklists, logs & recipe sheets', icon: <FileText className="w-4 h-4 text-maroon" /> },
              { title: '100% Free Starter Kit', desc: 'Zero-cost essential downloads', icon: <Gift className="w-4 h-4 text-gold-dark" /> },
              { title: 'WhatsApp & Email Dispatch', desc: 'Instant access across all devices', icon: <Smartphone className="w-4 h-4 text-maroon" /> },
              { title: 'Permanent Care Portal', desc: 'Lifetime re-downloads & updates', icon: <ShieldCheck className="w-4 h-4 text-gold-dark" /> }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-cream-light/90 p-3.5 rounded-2xl border border-cream-border shadow-warm-sm flex items-start space-x-2.5">
                <div className="p-2 rounded-xl bg-cream border border-cream-border shrink-0 mt-0.5">
                  {pillar.icon}
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-brown">{pillar.title}</div>
                  <div className="text-[11px] text-brown-muted leading-tight mt-0.5">{pillar.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenWizard('bundle-free-starter-pack')}
              className="px-7 py-3.5 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-gold-light" />
              <span>Get Free Starter Pack (₹0)</span>
            </button>

            <button
              onClick={() => handleOpenWizard('bundle-seyol-complete-master')}
              className="px-7 py-3.5 rounded-2xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock Master Bundle (All 6 Paid)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured Spotlight: Free New Parent Starter Pack Banner */}
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

      {/* 3. Search & Stage Filter Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-cream-light p-4 rounded-2xl border border-cream-border shadow-warm-sm">
          {/* Stage Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brown-muted mr-1">
              Stage:
            </span>
            {[
              { id: 'all', label: 'All Bundles (8)' },
              { id: 'pregnancy', label: 'Pregnancy & Birth' },
              { id: 'postpartum', label: 'Confinement & Recovery' },
              { id: 'newborn', label: 'Newborn Care' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStage(st.id as JourneyStage)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedStage === st.id
                    ? 'bg-maroon text-cream-light border-maroon shadow-sm'
                    : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-brown-muted" />
            <input
              type="text"
              placeholder="Search guides, swaddles, logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>
      </section>

      {/* 4. Complete Master Bundle Spotlight Banner (if viewing All or Pregnancy/Postpartum) */}
      {(selectedStage === 'all' || selectedStage === 'pregnancy' || selectedStage === 'postpartum') && (
        <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-gradient-to-br from-brown via-maroon-dark to-brown rounded-3xl p-6 sm:p-8 text-cream-light relative overflow-hidden shadow-warm-lg">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold text-maroon-dark text-[10px] font-extrabold uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-maroon-dark" />
                  <span>Ultimate Digital Library • 37 Guides Across 6 Bundles</span>
                </div>

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
                  <Sparkles className="w-4 h-4" />
                  <span>Get Complete Master Bundle</span>
                </button>

                <p className="text-[10px] text-cream-muted">
                  Includes lifetime Care Portal locker updates & instant ZIP download
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. All Resource Bundles Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-2 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
            Specialized Care Bundles & Toolkits
          </h2>
          <p className="text-xs sm:text-sm text-brown-muted">
            Explore focused guide collections or unlock full step-by-step master kits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map((bundle) => {
            const isExpanded = !!expandedBundleIds[bundle.id];
            const isMaster = bundle.isCompleteBundle;

            return (
              <div
                key={bundle.id}
                className={`bg-cream-light rounded-3xl border overflow-hidden p-6 shadow-warm-sm flex flex-col justify-between hover:border-gold/80 transition-all space-y-4 ${
                  isMaster ? 'border-gold bg-gradient-to-b from-cream-light to-gold-soft/30 ring-1 ring-gold/40' : 'border-cream-border'
                }`}
              >
                <div className="space-y-3.5">
                  {/* Image & Badges */}
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-brown">
                    <img
                      src={bundle.coverImage}
                      alt={bundle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-maroon text-cream-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {bundle.stage.toUpperCase()}
                      </span>
                      <span className="bg-brown/80 text-cream-light text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm">
                        {bundle.totalGuides} Guides
                      </span>
                    </div>

                    {bundle.isFree ? (
                      <span className="absolute top-3 right-3 bg-gold text-maroon-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Free Download
                      </span>
                    ) : bundle.badge ? (
                      <span className="absolute top-3 right-3 bg-maroon-soft border border-maroon/20 text-maroon text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {bundle.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brown leading-tight">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-brown-muted mt-1 leading-relaxed">
                      {bundle.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1 pt-2 border-t border-cream-border text-xs text-brown">
                    {bundle.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-brown-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Inclusions Checklist */}
                  <div className="pt-2 border-t border-cream-border">
                    <button
                      type="button"
                      onClick={() => toggleBundleExpand(bundle.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-maroon hover:text-maroon-dark transition-colors"
                    >
                      <span>Included Guides ({bundle.inclusions.length})</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {bundle.inclusions.map((inc, i) => (
                          <div key={i} className="bg-cream p-2 rounded-xl border border-cream-border text-[11px]">
                            <div className="font-bold text-brown flex justify-between items-center">
                              <span className="truncate">{inc.title}</span>
                              {inc.pages && <span className="text-[10px] text-brown-muted font-normal shrink-0 ml-1">{inc.pages}</span>}
                            </div>
                            {inc.description && (
                              <p className="text-[10px] text-brown-muted mt-0.5 line-clamp-1">{inc.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing & CTA Button */}
                <div className="pt-4 border-t border-cream-border flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-brown-muted uppercase tracking-wider">Price</div>
                    <div className="flex items-baseline space-x-1.5">
                      {bundle.isFree ? (
                        <span className="font-serif font-extrabold text-base text-maroon">FREE</span>
                      ) : (
                        <>
                          <span className="font-serif font-extrabold text-base text-maroon">₹{bundle.price}</span>
                          {bundle.originalPrice && (
                            <span className="text-xs text-brown-muted line-through">₹{bundle.originalPrice}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenWizard(bundle.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5 hover:scale-[1.02] ${
                      bundle.isFree
                        ? 'bg-maroon hover:bg-maroon-dark text-cream-light'
                        : 'bg-gold hover:bg-gold-light text-maroon-dark'
                    }`}
                  >
                    {bundle.isFree ? (
                      <>
                        <Download className="w-3.5 h-3.5 text-gold-light" />
                        <span>Download (₹0)</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Get Bundle (₹{bundle.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
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

      {/* 7. Gated Video Masterclass Library */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream border-t border-cream-border">
        <div className="max-w-7xl mx-auto">
          <GatedVideoPlayer />
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
