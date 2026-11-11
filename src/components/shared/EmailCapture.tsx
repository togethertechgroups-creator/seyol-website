'use client';

import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Sparkles,
  BookOpen,
  FileText,
  Check,
  Loader2,
  Calendar,
  Heart,
  Baby,
  ShieldCheck,
  AlertCircle,
  Clock,
  Utensils,
  Moon,
  Bath
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { downloadGuideFile } from '../../utils/guidePdfGenerator';

const STARTER_PACK_RESOURCES = [
  {
    number: '01',
    title: 'Hospital Bag Checklist',
    desc: 'Essential packing guide for labour, birth, and your hospital sanctuary stay.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Newborn Feeding & Sleep Log',
    desc: 'Daily printable tracker for nursing, wet nappies, and infant sleep rhythms.',
    icon: Moon,
  },
  {
    number: '03',
    title: 'Bath Time Essentials Checklist',
    desc: 'Traditional warm bath setup, safe water temps, and soothing herbal powders.',
    icon: Bath,
  },
  {
    number: '04',
    title: 'Confinement Meal Planner Template',
    desc: '40-day warming Indian postpartum recipes, recovery broths, and digestion teas.',
    icon: Utensils,
  },
  {
    number: '05',
    title: 'Baby Cry & Soothing Quick Chart',
    desc: 'Decode newborn cues, tummy wind remedies, and calming swaddle holds.',
    icon: Baby,
  },
];

const JOURNEY_STAGES = [
  'Planning for pregnancy',
  'Currently pregnant',
  'Preparing for birth',
  'Baby already born',
  'Supporting a parent or family',
] as const;

export const EmailCapture: React.FC = () => {
  const { addGuideLead } = useAdminData();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [journeyStage, setJourneyStage] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleDownloadPack = () => {
    downloadGuideFile({
      title: 'Free New Parent Starter Pack',
      subtitle:
        '5-in-1 Complete Care Bundle: Hospital Bag, Feeding & Sleep Log, Bath Checklist, Confinement Meal Planner & Soothing Chart',
      stageLabel: journeyStage || 'New Parent',
      badge: 'Free Starter Pack',
      fileName: 'SEYOL-Free-New-Parent-Starter-Pack.pdf',
      userName: name.trim() || 'Parent',
      userEmail: submittedEmail || email.trim(),
      highlights: [
        'Hospital Bag Checklist',
        'Newborn Feeding & Sleep Log',
        'Bath Time Essentials Checklist',
        'Confinement Meal Planner Template',
        'Baby Cry & Soothing Quick Chart',
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Bot honeypot trap
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    // 2. Client-side field validations
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!journeyStage) {
      setErrorMessage('Please select where you are in your journey.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Post to API backend
      const res = await fetch('/api/free-resource-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          journeyStage,
          resource: 'Free New Parent Starter Pack',
          marketingConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // 4. Record lead in CMS Admin panel
      if (addGuideLead) {
        addGuideLead({
          fullName: cleanName,
          email: cleanEmail,
          stage: journeyStage,
          guideTitle: 'Free New Parent Starter Pack',
          marketingConsent,
        });
      }

      setSubmittedEmail(cleanEmail);
      setIsSuccess(true);

      // 5. Automatically trigger download
      setTimeout(() => {
        handleDownloadPack();
      }, 600);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMessage(err.message || 'Unable to submit your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-sans">
      {/* Main Two-Column Bento Card */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-[#FAF6EE] border border-[#EAE1D5] shadow-warm-xl overflow-hidden p-6 sm:p-10 lg:p-12">
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#7B1131]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: VISUAL PACK MOCKUP & 5 DOWNLOADABLE RESOURCES (7 COLS)      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EAC8D2] text-[#7B1131] text-xs font-heading font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>5-in-1 Complete Digital Pack • 100% Free</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3A1D1D] tracking-tight leading-tight">
                Free New Parent Starter Pack
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#55403D] leading-relaxed">
                Receive our complete bundle of essential checklists, recovery logs, and soothing charts crafted by certified doulas and postpartum matrons.
              </p>

              {/* Visual 3D-Styled Pack Mockup Card */}
              <div className="pt-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#7B1131] via-[#630E27] to-[#48081A] p-5 sm:p-6 text-white shadow-warm-lg border border-[#9A1E43]/40 relative overflow-hidden group">
                  {/* Subtle Background Glow & Pattern */}
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#C8A45D]/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-[#E8C574]">
                        Official SEYOL Care Kit
                      </div>
                      <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                        Complete New Parent Digital Bundle
                      </h4>
                      <p className="text-xs text-white/80 font-sans">
                        Instant printable PDF • Yours to keep forever
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-xs font-heading font-bold text-[#E8C574] shrink-0 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E8C574]" />
                      <span>All 5 Included Free</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* List of the 5 Downloadable Resources */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#7B1131]">
                  What&apos;s Included in Your Starter Pack:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STARTER_PACK_RESOURCES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.number}
                        className="bg-white/80 border border-[#EAE1D5] rounded-xl p-3 shadow-2xs hover:bg-white hover:border-[#7B1131]/30 transition-all flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] text-[#7B1131] flex items-center justify-center shrink-0 border border-[#EAC8D2] group-hover:scale-105 group-hover:bg-[#7B1131] group-hover:text-white transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-heading font-bold text-[#3A1D1D] leading-snug truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-heading font-semibold text-[#7B1131] shrink-0">
                              FREE
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6E5652] leading-tight line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#55403D] font-medium border-t border-[#EAE1D5]/80">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7B1131]" />
                <span>100% Free Forever</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7B1131]" />
                <span>No Credit Card Required</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7B1131]" />
                <span>Direct PDF Access</span>
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: REGISTRATION FORM (5 COLS)                                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#EAE1D5] shadow-warm-md flex flex-col justify-between h-full">
              
              {!isSuccess ? (
                /* Registration Form View */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-[#3A1D1D] tracking-tight">
                      Get Your Free Starter Pack
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#55403D]">
                      Fill in your details below and we&apos;ll immediately email your downloadable pack.
                    </p>
                  </div>

                  {/* Error Alert Banner */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fadeIn"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from humans, catches bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_website">Leave this empty</label>
                    <input
                      id="hp_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="starter_pack_name"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Name <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      id="starter_pack_name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sundaram"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE]/50 border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="starter_pack_email"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Email Address <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      id="starter_pack_email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE]/50 border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Field 3: Where are you in your journey? */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="starter_pack_stage"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Where are you in your journey? <span className="text-[#7B1131]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="starter_pack_stage"
                        required
                        value={journeyStage}
                        onChange={(e) => setJourneyStage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE]/50 border border-[#EAE1D5] text-sm text-[#3A1D1D] focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select your stage...
                        </option>
                        {JOURNEY_STAGES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#7B1131]">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Optional Marketing Consent Checkbox (unchecked by default) */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[#EAE1D5] text-[#7B1131] focus:ring-[#7B1131] cursor-pointer"
                      />
                      <span className="text-xs text-[#55403D] leading-relaxed">
                        Keep me updated with SEYOL resources, classes and occasional offers.
                        <span className="block text-[11px] text-[#6E5652]/70 mt-0.5">
                          (Optional. You will still receive your free pack if unchecked.)
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Your Pack...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#E8C574]" />
                        <span>Receive Your Free Starter Pack</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#6E5652] leading-tight">
                    🔒 Zero spam guarantee. We respect your privacy and will never share your email.
                  </p>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="space-y-6 text-center py-4 my-auto animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0EB] text-[#7B1131] border border-[#EAC8D2] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-[#7B1131]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-3.5 py-1 rounded-full inline-block">
                      Registration Successful
                    </span>
                    <h4 className="font-heading font-extrabold text-2xl text-[#3A1D1D] tracking-tight">
                      Your Starter Pack is Ready!
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed max-w-sm mx-auto">
                      We have sent your complete 5-in-1 pack to <strong className="text-[#7B1131]">{submittedEmail}</strong>.
                      Your instant PDF download has also started.
                    </p>
                  </div>

                  {/* Manual Re-download Button */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={handleDownloadPack}
                      className="w-full py-3.5 px-6 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-warm-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#E8C574]" />
                      <span>Download Starter Pack Now (PDF)</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setEmail('');
                        setJourneyStage('');
                        setMarketingConsent(false);
                      }}
                      className="text-xs font-sans text-[#7B1131] hover:underline cursor-pointer block mx-auto"
                    >
                      Register with another email
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
