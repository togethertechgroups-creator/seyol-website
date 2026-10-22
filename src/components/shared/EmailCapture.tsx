'use client';

import React, { useState } from 'react';
import { 
  Download, CheckCircle2, Sparkles, BookOpen, 
  ShieldCheck, FileText, Check, Loader2 
} from 'lucide-react';
import { 
  useAdminData, 
  JourneyStageKey, 
  defaultStageResourceGuides 
} from '../../context/AdminDataContext';
import { downloadGuideFile } from '../../utils/guidePdfGenerator';

interface EmailCaptureProps {
  title?: string;
  subtitle?: string;
  guideTitle?: string;
  buttonText?: string;
  variant?: 'card' | 'inline' | 'hero';
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  title: propTitle,
  subtitle: propSubtitle,
  guideTitle: propGuideTitle,
  buttonText = 'Receive Free Guide',
  variant = 'card',
}) => {
  const { stageResourceGuides, addGuideLead } = useAdminData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<JourneyStageKey>('pregnancy');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active guide configured by admin in CMS for the selected stage
  const activeGuide =
    (stageResourceGuides && stageResourceGuides[stage]) ||
    defaultStageResourceGuides[stage] ||
    defaultStageResourceGuides.pregnancy;

  // Resolved copy with CMS priority, allowing optional manual props
  const currentBadge = propGuideTitle || activeGuide.badge;
  const currentTitle = propTitle || activeGuide.title;
  const currentSubtitle = propSubtitle || activeGuide.subtitle;
  const currentHighlights = activeGuide.highlights || [
    'Instant PDF Download',
    '40-Day Meal Planner',
    '100% Free • No Spam',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    // 1. Verification of name
    if (cleanName.length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsVerifying(true);

    // Simulate verified handshake and prepare file download
    setTimeout(() => {
      // Record lead in CMS admin panel
      if (addGuideLead) {
        addGuideLead({
          fullName: cleanName,
          email: cleanEmail,
          stage,
          guideTitle: currentTitle,
        });
      }

      // Automatically trigger client download of the exact uploaded/generated document
      downloadGuideFile({
        title: currentTitle,
        subtitle: currentSubtitle,
        stageLabel: activeGuide.stageLabel,
        badge: currentBadge,
        fileName: activeGuide.fileName,
        fileUrl: activeGuide.fileUrl,
        userName: cleanName,
        userEmail: cleanEmail,
        highlights: currentHighlights,
      });

      setIsVerifying(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleManualRedownload = () => {
    downloadGuideFile({
      title: currentTitle,
      subtitle: currentSubtitle,
      stageLabel: activeGuide.stageLabel,
      badge: currentBadge,
      fileName: activeGuide.fileName,
      fileUrl: activeGuide.fileUrl,
      userName: name.trim() || 'Valued Parent',
      userEmail: email.trim() || 'care@seyol.com',
      highlights: currentHighlights,
    });
  };

  if (variant === 'inline') {
    return (
      <div className="w-full font-sans">
        {isSubmitted ? (
          <div className="bg-gold-soft border border-gold-border rounded-xl p-3 flex items-center justify-between text-maroon text-xs font-semibold">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
              <span>Guide verified &amp; downloaded for {email}!</span>
            </div>
            <button
              onClick={handleManualRedownload}
              className="text-[11px] underline text-maroon hover:text-maroon-dark font-bold"
            >
              Re-download PDF
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder="Your Full Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 text-xs border border-cream-border focus:outline-none focus:ring-2 focus:ring-maroon"
            />
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 text-xs border border-cream-border focus:outline-none focus:ring-2 focus:ring-maroon"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer disabled:opacity-70"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-gold-light" />
                  <span>{buttonText}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#7B1131] text-cream-light rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-warm-lg font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Live dynamic guide information based on selected stage */}
        <div className="space-y-3.5 lg:col-span-7">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-cream-light leading-snug">
            {currentTitle}
          </h3>

          <p className="font-playfair text-xs sm:text-sm text-cream-light/85 leading-relaxed">
            {currentSubtitle}
          </p>

          {/* Highlights & Document Specs */}
          <div className="flex flex-wrap gap-3.5 text-xs text-gold-light/95 pt-1.5">
            {currentHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 bg-black/15 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span className="font-playfair">{hl}</span>
              </div>
            ))}
          </div>

          {activeGuide.fileName && (
            <div className="flex items-center space-x-2 text-[11px] text-cream-light/70 pt-1">
              <FileText className="w-3.5 h-3.5 text-gold-light" />
              <span>
                Document: <strong className="text-white font-mono">{activeGuide.fileName}</strong>
                {activeGuide.fileSize && ` (${activeGuide.fileSize})`}
                {activeGuide.pageCount && ` • ${activeGuide.pageCount}`}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Verification & Download Form / Success State */}
        <div className="lg:col-span-5 bg-[#520B20]/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-gold/35 shadow-inner">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <div className="font-serif font-bold text-xl text-gold-light">
                  Email Verified &amp; Guide Ready!
                </div>
                <p className="text-xs text-cream-light/85 max-w-xs mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>! Your guide has been prepared and dispatched.
                </p>
                <p className="text-[11px] text-gold-light/75 font-mono">
                  {email}
                </p>
              </div>

              {/* Direct Re-download Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleManualRedownload}
                  className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-maroon-dark" />
                  <span>Download {activeGuide.fileName || 'Guide PDF'}</span>
                </button>

                <p className="text-[10px] text-cream-light/60">
                  If the download didn&apos;t start automatically, click the button above.
                </p>
              </div>

              <div className="pt-2 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                  }}
                  className="text-xs text-gold-light hover:text-white underline cursor-pointer"
                >
                  Download another stage guide
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block font-playfair font-semibold text-cream-light mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 focus:outline-none focus:ring-2 focus:ring-gold text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-cream-light mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 focus:outline-none focus:ring-2 focus:ring-gold text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-semibold text-cream-light">
                    Your Stage *
                  </label>
                  <span className="text-[10px] text-gold-light/80 italic">
                    Select to view your stage guide
                  </span>
                </div>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as JourneyStageKey)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown focus:outline-none focus:ring-2 focus:ring-gold text-xs cursor-pointer font-medium"
                >
                  <option value="pregnancy">Currently Pregnant (2nd/3rd Trimester)</option>
                  <option value="postpartum">Newly Postpartum (First 40 Days)</option>
                  <option value="newborn">Parent of a Newborn (0–12 Months)</option>
                  <option value="preconception">Trying to Conceive / Planning Ahead</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3.5 px-4 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-maroon-dark" />
                      <span>Verifying &amp; Preparing Guide...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-maroon-dark" />
                      <span>{buttonText}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-cream-light/70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-light" />
                <span>Instant verification. Strictly private • No spam.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
