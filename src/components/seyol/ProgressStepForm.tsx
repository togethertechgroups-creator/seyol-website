'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Calendar, User, Phone, MapPin, Sparkles } from 'lucide-react';

export interface ProgressStepFormProps {
  title?: string;
  onSuccess?: () => void;
}

export const ProgressStepForm: React.FC<ProgressStepFormProps> = ({
  title = 'SEYOL Care Service & Class Booking',
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    stage: 'postpartum',
    preferredDate: '',
    location: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="bg-cream-light p-8 rounded-3xl border border-gold/40 text-center space-y-4 shadow-warm-md">
        <div className="w-12 h-12 rounded-full bg-gold/20 text-maroon flex items-center justify-center mx-auto">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brown">Booking Request Received!</h3>
        <p className="text-xs sm:text-sm text-brown-muted max-w-md mx-auto">
          Thank you, {formData.name || 'parent'}. Our senior SEYOL care matron will contact you at {formData.phone || 'your phone number'} within 2 to 4 business hours to finalize your schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-lg space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Multi-Step Booking</span>
        <h3 className="font-serif text-2xl font-bold text-brown">{title}</h3>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between text-xs font-bold border-b border-cream-border pb-4">
        <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-maroon text-cream-light' : 'bg-cream text-brown-muted'}`}>
          1. Contact Info
        </span>
        <span>&rarr;</span>
        <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-maroon text-cream-light' : 'bg-cream text-brown-muted'}`}>
          2. Care Timeline
        </span>
        <span>&rarr;</span>
        <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-maroon text-cream-light' : 'bg-cream text-brown-muted'}`}>
          3. Confirm
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-brown mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priyadharshini Sundaram"
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brown mb-1">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98400 00000"
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brown mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="priya@example.com"
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-sm flex items-center space-x-2"
              >
                <span>Next: Care Details</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-brown mb-1">Current Journey Milestone</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              >
                <option value="pregnancy">Currently Pregnant (2nd/3rd Trimester)</option>
                <option value="postpartum">Postpartum Recovery (Day 1 to 40 Days)</option>
                <option value="newborn">Newborn & Infant (0 to 6 Months)</option>
                <option value="preconception">Preconception & Planning</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brown mb-1">Preferred Start Date / Due Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brown mb-1">City / Residential Area</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Adyar, Chennai"
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-sm flex items-center space-x-2"
              >
                <span>Next: Review Request</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-cream p-4 rounded-xl border border-cream-border space-y-2 text-xs">
              <div className="font-bold text-maroon uppercase">Summary Confirmation</div>
              <div><strong>Name:</strong> {formData.name || 'Not specified'}</div>
              <div><strong>Phone:</strong> {formData.phone || 'Not specified'}</div>
              <div><strong>Stage:</strong> {formData.stage}</div>
              <div><strong>Location:</strong> {formData.location || 'Chennai'}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1">Additional Care Notes / Special Instructions</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any specific scar sensitivity, twin birth, or preferred matron timings..."
                className="w-full p-3 rounded-xl bg-cream border border-cream-border text-xs focus:outline-none focus:border-maroon"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-sm hover:bg-maroon-dark flex items-center space-x-2"
              >
                <span>Submit Care Request</span>
                <Check className="w-4 h-4 text-gold-light" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
