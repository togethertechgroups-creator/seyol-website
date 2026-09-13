'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Flower2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Postpartum Confinement Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { openEnquiry } = useQuickEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const getWhatsAppLink = () => {
    const text = `Hello SEYOL Care Team!%0A%0AName: ${name || 'Parent'}%0ASubject: ${subject}%0ANotes: ${message || 'Please assist me with care availability.'}`;
    return `https://wa.me/919840000000?text=${text}`;
  };

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Hero Header */}
      <section className="bg-cream-dark/40 py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-cream-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider">
            <Flower2 className="w-4 h-4 text-maroon" />
            <span>Connect with SEYOL</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
            We Are Here to Walk Beside You
          </h1>

          <p className="text-sm sm:text-base text-brown-muted max-w-2xl mx-auto leading-relaxed">
            Have questions about booking care dates, customizing confinement packages, or ordering SEY botanical products? Reach out to our senior care coordinators.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream-light p-6 sm:p-8 rounded-3xl border border-cream-border space-y-6 shadow-warm-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Direct Care Helplines
              </h2>

              <div className="space-y-4 text-xs text-brown">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-brown">General Enquiries & Bookings</div>
                    <a
                      href="mailto:hello@seyolpregnancycare.com"
                      className="text-maroon font-semibold hover:underline"
                    >
                      hello@seyolpregnancycare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-brown">WhatsApp Care Coordinator</div>
                    <a
                      href="https://wa.me/919840000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a8e45] font-semibold hover:underline"
                    >
                      Chat on WhatsApp (+91 98400 00000)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-brown">Studio & Academy Location</div>
                    <div className="text-brown-muted">
                      Alwarpet, Chennai, Tamil Nadu, India 600018
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-brown">Care Desk Hours</div>
                    <div className="text-brown-muted">
                      Monday to Saturday: 9:00 AM – 7:00 PM IST <br />
                      (24/7 On-Call Support for Active Birth Doula Clients)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="bg-maroon p-6 rounded-3xl text-cream-light space-y-3 shadow-warm-md">
              <div className="font-serif font-bold text-lg text-gold-light">
                Need a Personalized Care Roadmap?
              </div>
              <p className="text-xs text-cream-light/80 leading-relaxed">
                Book a 45-minute 1-on-1 virtual video session with our senior care advisor to map out your confinement and newborn timeline.
              </p>
              <button
                onClick={() => openEnquiry({ serviceTitle: 'Care Guidance Roadmap Consultation' })}
                className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs transition-colors shadow-sm"
              >
                Schedule Video Consultation (₹950 Credited)
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-md">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 text-gold-dark mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-maroon">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-brown-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your enquiry has been received at <code>hello@seyolpregnancycare.com</code>. Our senior care team will respond within 2 to 4 business hours.
                </p>
                <div className="pt-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-warm-sm hover:bg-[#1EBE5D] transition-colors"
                  >
                    <span>Follow Up on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-brown">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-brown-muted">
                    Fill in your details and requirements below, and we will get back to you promptly.
                  </p>
                </div>

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
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
