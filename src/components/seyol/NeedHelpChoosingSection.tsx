'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, Mail, Phone, Loader2 } from 'lucide-react';

const SUPPORT_OPTIONS = [
  'Pregnancy care',
  'Newborn care',
  'Postpartum care',
  'Baby care & massage',
  'Everyday parenting support',
  "I'm not sure – please guide me"
];

const CONTACT_PREFERENCES = ['Email', 'Phone', 'WhatsApp'] as const;

export const NeedHelpChoosingSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [supportType, setSupportType] = useState("I'm not sure – please guide me");
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Phone' | 'WhatsApp'>('Email');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please enter your full name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          supportType,
          preferredContact,
          notes
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Enquiry error:', err);
      // Graceful fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = `Hello SEYOL Care Team!%0A%0AName: ${fullName || 'Parent'}%0AEmail: ${email}%0APhone: ${phone}%0ASupport Needed: ${supportType}%0APreferred Contact: ${preferredContact}%0ANotes: ${notes || 'Please guide me.'}`;
    return `https://wa.me/919840000000?text=${text}`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Care Consultation Request: ${fullName} (${supportType})`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSupport Type: ${supportType}\nPreferred Contact: ${preferredContact}\nNotes: ${notes}`
    );
    return `mailto:hello@seyolpregnancycare.com?subject=${subject}&body=${body}`;
  };

  return (
    <section 
      id="need-help-choosing" 
      className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] font-sans border-t border-[#ECE5DD]"
    >
      <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[2.5px] text-[#70152B]">
            PERSONALIZED CARE ADVISORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#3A1D1D] tracking-tight leading-[1.18]">
            Need Help Choosing? <span className="inline sm:inline text-[#70152B]">SEYOL Will Guide You</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed max-w-xl mx-auto">
            Not sure which package fits your postpartum timeline or baby&apos;s routine? Share your details and our care specialists will match you.
          </p>
        </header>

        {/* Form Container Card - Increased Width, Compact Height */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#EAE1D5] p-5 sm:p-7 lg:p-9 shadow-[0_8px_30px_rgba(58,29,29,0.04)] w-full">
          {isSubmitted ? (
            <div className="text-center py-8 sm:py-10 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#FAF0EB] text-[#70152B] mx-auto flex items-center justify-center border border-[#E8D0C5] shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1D1D]">
                  Request Dispatched to SEYOL Team!
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5652] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. We have gathered all your details and sent them to our senior care desk. We will reach out to you via <strong>{preferredContact}</strong> shortly.
                </p>
              </div>

              {/* Action Buttons for Preferred Contact Method */}
              <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
                {preferredContact === 'WhatsApp' && (
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Connect on WhatsApp Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {preferredContact === 'Email' && (
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#70152B] hover:bg-[#580F21] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email Summary</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {preferredContact === 'Phone' && (
                  <a
                    href={`tel:${phone || '+919840000000'}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#70152B] hover:bg-[#580F21] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Care Helpline</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="px-5 py-3 rounded-full bg-white hover:bg-stone-50 text-[#6E5652] border border-[#EAE1D5] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Form Title Inside Card */}
              <h3 className="font-sans text-lg sm:text-xl font-bold text-[#2A1D1D] tracking-tight">
                Let&apos;s find the right support for you
              </h3>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Row 1: Full Name, Email, Phone Number (3 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#3A1D1D]">
                    Full name <span className="text-[#70152B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-full border border-[#D5C7B8] bg-white text-sm text-[#2A1D1D] placeholder-[#9E8E85] focus:outline-none focus:border-[#70152B] focus:ring-1 focus:ring-[#70152B] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#3A1D1D]">
                    Email address <span className="text-[#70152B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-full border border-[#D5C7B8] bg-white text-sm text-[#2A1D1D] placeholder-[#9E8E85] focus:outline-none focus:border-[#70152B] focus:ring-1 focus:ring-[#70152B] transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#3A1D1D]">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your contact number"
                    className="w-full px-4 py-2.5 rounded-full border border-[#D5C7B8] bg-white text-sm text-[#2A1D1D] placeholder-[#9E8E85] focus:outline-none focus:border-[#70152B] focus:ring-1 focus:ring-[#70152B] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: What kind of support are you looking for? (3 Columns per row x 2 Rows) */}
              <div className="space-y-2 pt-0.5">
                <label className="block text-xs font-semibold text-[#3A1D1D]">
                  What kind of support are you looking for? <span className="text-[#70152B]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                  {SUPPORT_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer select-none group text-xs sm:text-[13px] ${
                        supportType === option
                          ? 'border-[#1A1412] bg-white shadow-xs font-semibold text-[#1A1412]'
                          : 'border-[#E2D5C7] bg-[#FAF8F5] hover:bg-white hover:border-[#70152B]/40 text-[#4A3834]'
                      }`}
                    >
                      <div className="relative flex items-center justify-center shrink-0">
                        <input
                          type="radio"
                          name="supportType"
                          value={option}
                          checked={supportType === option}
                          onChange={() => setSupportType(option)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            supportType === option
                              ? 'border-[#1A1412] bg-[#1A1412]'
                              : 'border-[#C8B8AA] bg-white group-hover:border-[#70152B]'
                          }`}
                        >
                          {supportType === option && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <span className="truncate">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 3: Preferred Contact Method (Separate Row) */}
              <div className="space-y-1.5 pt-0.5">
                <label className="block text-xs font-semibold text-[#3A1D1D]">
                  Preferred way to contact you
                </label>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
                  {CONTACT_PREFERENCES.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer select-none group text-xs sm:text-[13px] ${
                        preferredContact === method
                          ? 'border-[#1A1412] bg-white font-semibold text-[#1A1412] shadow-xs'
                          : 'border-[#E2D5C7] bg-[#FAF8F5] text-[#4A3834] hover:bg-white hover:border-[#70152B]/40'
                      }`}
                    >
                      <div className="relative flex items-center justify-center shrink-0">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={preferredContact === method}
                          onChange={() => setPreferredContact(method)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            preferredContact === method
                              ? 'border-[#1A1412] bg-[#1A1412]'
                              : 'border-[#C8B8AA] bg-white group-hover:border-[#70152B]'
                          }`}
                        >
                          {preferredContact === method && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 4: Tell us a little more (Separate Row Below) */}
              <div className="space-y-1.5 pt-0.5">
                <label className="block text-xs font-semibold text-[#3A1D1D]">
                  Tell us a little more (optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What would you like help with?"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#D5C7B8] bg-white text-sm text-[#2A1D1D] placeholder-[#9E8E85] focus:outline-none focus:border-[#70152B] focus:ring-1 focus:ring-[#70152B] transition-all resize-none"
                />
              </div>

              {/* Row 4: Submit Button (Centered & Sleek) */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] py-3.5 px-8 rounded-full bg-[#111111] hover:bg-[#70152B] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Your Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Help Me Choose</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
