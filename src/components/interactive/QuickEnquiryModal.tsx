'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Baby, 
  Flower2, 
  ArrowRight 
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const QuickEnquiryModal: React.FC = () => {
  const { isOpen, serviceTitle, classTitle, closeEnquiry } = useQuickEnquiry();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('pregnancy');
  const [dueDateOrAge, setDueDateOrAge] = useState('');
  const [location, setLocation] = useState('Chennai');
  const [preferredCare, setPreferredCare] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (serviceTitle) {
      setPreferredCare(serviceTitle);
    } else if (classTitle) {
      setPreferredCare(classTitle);
    } else {
      setPreferredCare('Comprehensive Postpartum & Newborn Guidance');
    }
  }, [serviceTitle, classTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    setDueDateOrAge('');
    setMessage('');
    closeEnquiry();
  };

  const getWhatsAppEnquiryLink = () => {
    const text = `Hello SEYOL Care Team!%0A%0AName: ${name || 'Parent'}%0AStage: ${stage}%0ADue Date / Baby Age: ${dueDateOrAge || 'Not specified'}%0ALocation: ${location}%0AInterested Service: ${preferredCare}%0ANotes: ${message || 'Please contact me with availability.'}`;
    return `https://wa.me/919840000000?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-maroon-dark/60 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative bg-cream-light rounded-3xl max-w-xl w-full p-6 sm:p-8 text-left shadow-2xl border border-cream-border overflow-hidden animate-fadeIn">
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            aria-label="Close Modal"
            className="absolute top-5 right-5 p-2 rounded-full text-brown-muted hover:text-maroon hover:bg-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold-dark mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-maroon">
                Your Consultation is Reserved
              </h3>
              <p className="text-sm text-brown max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name || 'valued parent'}</strong>. A dedicated SEYOL Senior Care Advisor will review your notes and reach out within 2–4 hours to coordinate your personalized care roadmap.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppEnquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Connect Instantly on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 rounded-xl bg-cream border border-cream-border text-brown font-semibold text-sm hover:bg-cream-dark transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>Personalised Care Guidance</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown">
                  {serviceTitle || classTitle ? `Enquire for ${serviceTitle || classTitle}` : 'Begin Your Care Consultation'}
                </h3>
                <p className="text-xs text-brown-muted mt-1 leading-relaxed">
                  Every family is unique. Tell us about your journey stage and requirements, and our senior matrons will tailor an optimal care plan.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Stage Selector */}
                <div>
                  <label className="block font-semibold text-brown mb-1.5">
                    Where Are You in Your Journey?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'preconception', label: 'Preconception' },
                      { key: 'pregnancy', label: 'Pregnant' },
                      { key: 'postpartum', label: 'Postpartum' },
                      { key: 'newborn', label: 'Newborn Care' },
                    ].map((st) => (
                      <button
                        key={st.key}
                        type="button"
                        onClick={() => setStage(st.key)}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-colors font-medium ${
                          stage === st.key
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-brown mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brown mb-1">
                      Contact Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98400 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                    />
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-brown mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brown mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adyar, Chennai (or Virtual)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                    />
                  </div>
                </div>

                {/* Due Date or Baby Age */}
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Estimated Due Date (EDD) or Baby's Current Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EDD: 18 October 2026 or 4-week-old baby"
                    value={dueDateOrAge}
                    onChange={(e) => setDueDateOrAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                </div>

                {/* Notes or Questions */}
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Specific Health Needs or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Caesarean delivery planned, looking for 21-day mother and baby care combo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-sm tracking-wide shadow-warm-sm transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Reserving Care Slot...</span>
                    ) : (
                      <>
                        <span>Submit Care Consultation Request</span>
                        <ArrowRight className="w-4 h-4 text-gold-light" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-brown-muted text-center mt-2">
                    Confidential & HIPAA / DPDP compliant. We never spam or disclose your medical history.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
