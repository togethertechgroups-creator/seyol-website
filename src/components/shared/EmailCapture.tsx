'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2, Sparkles, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface EmailCaptureProps {
  title?: string;
  subtitle?: string;
  guideTitle?: string;
  buttonText?: string;
  variant?: 'card' | 'inline' | 'hero';
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  title = 'Download "The Sacred 40 Days: South Indian Confinement Wisdom"',
  subtitle = 'Receive our curated 36-page guide on postpartum herbal recovery, maternal nutrition recipes, and infant sleep rituals delivered directly to your inbox.',
  guideTitle = 'Complimentary Fourth Trimester Guide',
  buttonText = 'Receive Free Guide',
  variant = 'card',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('pregnancy');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 800);
    }
  };

  if (variant === 'inline') {
    return (
      <div className="w-full font-sans">
        {isSubmitted ? (
          <div className="bg-gold-soft border border-gold-border rounded-xl p-3 flex items-center space-x-2 text-maroon text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0" />
            <span>Guide dispatched to {email}! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-gold-light" />
              <span>{buttonText}</span>
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-maroon text-cream-light rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-warm-lg font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-playfair tracking-wider">{guideTitle}</span>
          </div>

          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-cream-light leading-snug">
            {title}
          </h3>

          <p className="font-playfair text-xs sm:text-sm text-cream-light/80 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gold-light/90 pt-1">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              <span className="font-playfair">Instant PDF Download</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              <span className="font-playfair">40-Day Meal Planner</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              <span className="font-playfair">100% Free • No Spam</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-maroon-dark/70 p-5 sm:p-6 rounded-2xl border border-gold/30">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 text-gold-light mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="font-serif font-bold text-lg text-gold-light">
                Guide On Its Way!
              </div>
              <p className="text-xs text-cream-light/80 max-w-xs mx-auto">
                We have sent <em>The Sacred 40 Days</em> directly to <strong>{email}</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gold-light underline hover:text-white"
                >
                  Download with another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-playfair font-semibold text-cream-light mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-cream-light mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown placeholder-brown-muted/70 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-cream-light mb-1">
                  Your Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-light text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="pregnancy">Currently Pregnant (2nd/3rd Trimester)</option>
                  <option value="postpartum">Newly Postpartum (First 40 Days)</option>
                  <option value="newborn">Parent of a Newborn (0–12 Months)</option>
                  <option value="preconception">Trying to Conceive / Planning Ahead</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching Guide...' : buttonText}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1 text-[10px] text-cream-light/60 pt-0.5">
                <ShieldCheck className="w-3 h-3 text-gold-light" />
                <span>Strictly private. We never share your data.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
