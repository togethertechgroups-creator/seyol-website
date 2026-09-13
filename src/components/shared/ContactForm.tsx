'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactFormProps {
  defaultSubject?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultSubject = 'Postpartum Confinement Enquiry',
  className = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const getWhatsAppLink = () => {
    const text = `Hello SEYOL Care Team!%0A%0AName: ${name || 'Parent'}%0ASubject: ${subject}%0ANotes: ${message || 'Please assist me with care availability.'}`;
    return `https://wa.me/919840000000?text=${text}`;
  };

  return (
    <div className={`bg-cream-light rounded-3xl p-6 sm:p-8 border border-cream-border shadow-warm-md font-sans ${className}`}>
      {isSuccess ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold-dark mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-maroon">
            Message Dispatched Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-brown-muted max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{name}</strong>. Your enquiry has been received at <code>hello@seyolpregnancycare.com</code>. Our senior care team will respond within 2 to 4 business hours.
          </p>
          <div className="pt-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-warm-sm hover:bg-[#1EBE5D] transition-colors"
            >
              <span>Instant WhatsApp Follow-up</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-brown mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Deepika Sundaram"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-brown mb-1">
                Contact Phone / WhatsApp *
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

          <div>
            <label className="block font-semibold text-brown mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. deepika@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-brown mb-1">
              Subject / Care Requirement *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
            >
              <option value="Postpartum Confinement & Massage Enquiry">
                Postpartum Confinement & Massage Enquiry
              </option>
              <option value="Stay-In Confinement Nanny Booking">
                Stay-In Confinement Nanny Booking
              </option>
              <option value="Birth Doula & Childbirth Class">
                Birth Doula & Childbirth Class
              </option>
              <option value="Infant Massage & Bath Session">
                Infant Massage & Bath Session
              </option>
              <option value="SEY Products & Order Enquiry">
                SEY Products & Order Enquiry
              </option>
              <option value="Academy Careers & Training">
                Academy Careers & Training
              </option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-brown mb-1">
              Message & Due Date / Baby Age Details *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Share your estimated due date, location in Chennai or Tamil Nadu, or specific care questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Dispatched to hello@seyolpregnancycare.com...</span>
              ) : (
                <>
                  <span>Submit Care Guidance Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center space-x-1 text-[10px] text-brown-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>Directly routed to hello@seyolpregnancycare.com</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
