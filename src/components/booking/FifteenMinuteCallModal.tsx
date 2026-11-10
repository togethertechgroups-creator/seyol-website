'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, CheckCircle2, AlertCircle, Phone, Mail, Globe, User, MessageSquare } from 'lucide-react';
import { useFifteenMinuteCall } from '../../context/FifteenMinuteCallContext';
import { CallPreferredTime, CallStage, FifteenMinuteCallAppointment } from '../../types/appointment';

const preferredTimeOptions: CallPreferredTime[] = ['Morning', 'Afternoon', 'Evening', 'Flexible'];

const stageOptions: CallStage[] = [
  'Planning Before Pregnancy',
  'Currently Pregnant',
  'Preparing for Birth',
  'Already Delivered',
  'Baby Already Born',
  'Others',
];

export const FifteenMinuteCallModal: React.FC = () => {
  const { isOpen, closeCallBooking } = useFifteenMinuteCall();

  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<CallPreferredTime | ''>('');
  const [stage, setStage] = useState<CallStage | ''>('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<FifteenMinuteCallAppointment | null>(null);

  // Today's date string in YYYY-MM-DD format for min date
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReset = () => {
    setFullName('');
    setWhatsapp('');
    setEmail('');
    setCountry('India');
    setPreferredDate('');
    setPreferredTime('');
    setStage('');
    setNotes('');
    setError(null);
    setSuccessData(null);
    closeCallBooking();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!whatsapp.trim()) {
      setError('Please provide your WhatsApp number so we can reach you.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!country.trim()) {
      setError('Please specify your country.');
      return;
    }
    if (!preferredDate) {
      setError('Please choose your preferred appointment date.');
      return;
    }
    if (!preferredTime) {
      setError('Please select your preferred time of day.');
      return;
    }
    if (!stage) {
      setError('Please select which stage best describes you now.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appointments/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          whatsapp,
          email,
          country,
          preferredDate,
          preferredTime,
          stage,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking. Please try again.');
      }

      setSuccessData(data.appointment);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#F7F4EF] rounded-2xl sm:rounded-3xl border border-[#E8DFD0] shadow-[0_20px_50px_rgba(58,29,29,0.25)] my-auto overflow-hidden transition-all text-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-[#7B1131]" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-[#7B1131] flex items-center justify-center transition-colors shadow-2xs border border-[#E5DACB] cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          /* ── Success Confirmation Screen ── */
          <div className="p-6 sm:p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#7B1131] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F7] border border-[#E8D7DC] text-[#7B1131] text-xs font-bold font-heading">
                <Clock className="w-3.5 h-3.5" />
                15-Minute Call Confirmed
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7B1131]">
                Booking Request Received!
              </h2>
              <p className="text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-neutral-900">{successData.fullName}</span>. We have scheduled your 15-minute consultation.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD0] text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto shadow-2xs">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="text-neutral-500 font-medium">Reference Code:</span>
                <span className="font-mono font-bold text-[#7B1131]">{successData.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-medium">Preferred Date:</span>
                <span className="font-semibold text-neutral-800">{successData.preferredDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-medium">Preferred Slot:</span>
                <span className="font-semibold text-neutral-800">{successData.preferredTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-medium">Call Duration:</span>
                <span className="font-bold text-[#7B1131]">15 Minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-medium">Your Stage:</span>
                <span className="font-semibold text-neutral-800">{successData.stage}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                <span className="text-neutral-500 font-medium">Contact WhatsApp:</span>
                <span className="font-semibold text-neutral-800">{successData.whatsapp}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              Our care coordinator will connect with you via WhatsApp or Email within a few hours to confirm the exact call time.
            </p>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Booking Form ── */
          <div className="p-5 sm:p-7 max-h-[88vh] overflow-y-auto">
            {/* Header info */}
            <div className="text-left space-y-1.5 pb-4 border-b border-[#E8DFD0]">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5F7] border border-[#E8D7DC] text-[#7B1131] text-[11px] font-bold font-heading">
                <Clock className="w-3 h-3 text-[#7B1131]" />
                15-Minute Dedicated Call
              </div>
              <h2 id="modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7B1131] tracking-tight">
                Book a 15-Minute Call
              </h2>
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                Connect directly with a SEYOL Maternal &amp; Newborn Care Specialist. We will discuss your current stage and answer your care questions.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-5 text-left text-neutral-800">
              
              {/* Section 1: About You */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7B1131] uppercase tracking-wider font-heading">
                  <User className="w-3.5 h-3.5" />
                  <span>About You</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Sundaram"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      WhatsApp Number <span className="text-[#7B1131]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+91 98400 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Country <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. India, Singapore, UAE"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Preferred Date */}
              <div className="space-y-1.5 pt-1 border-t border-[#E8DFD0]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7B1131] uppercase tracking-wider font-heading pt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Preferred Date <span className="text-[#7B1131]">*</span></span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Select your desired appointment date for the 15-minute call.
                </p>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all cursor-pointer"
                />
              </div>

              {/* Section 3: Preferred Time */}
              <div className="space-y-2 pt-1 border-t border-[#E8DFD0]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7B1131] uppercase tracking-wider font-heading pt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Preferred Time <span className="text-[#7B1131]">*</span></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {preferredTimeOptions.map((timeOption) => {
                    const isSelected = preferredTime === timeOption;
                    return (
                      <button
                        type="button"
                        key={timeOption}
                        onClick={() => setPreferredTime(timeOption)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#7B1131] text-white border-[#7B1131] shadow-2xs'
                            : 'bg-white text-neutral-700 border-[#DCD3C4] hover:border-[#7B1131]/60 hover:bg-[#FAF6EE]'
                        }`}
                      >
                        {timeOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Which best describes your stage now? */}
              <div className="space-y-2 pt-1 border-t border-[#E8DFD0]">
                <div className="flex items-center justify-between pt-2">
                  <label className="text-xs font-bold text-[#7B1131] uppercase tracking-wider font-heading">
                    Which best describes your stage now? <span className="text-[#7B1131]">*</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stageOptions.map((stageOption) => {
                    const isSelected = stage === stageOption;
                    return (
                      <button
                        type="button"
                        key={stageOption}
                        onClick={() => setStage(stageOption)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#7B1131] text-white border-[#7B1131] shadow-2xs font-bold'
                            : 'bg-white text-neutral-800 border-[#DCD3C4] hover:border-[#7B1131]/60 hover:bg-[#FAF6EE]'
                        }`}
                      >
                        <span>{stageOption}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Anything Specific You'd Like to Discuss? */}
              <div className="space-y-1.5 pt-1 border-t border-[#E8DFD0]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7B1131] uppercase tracking-wider font-heading pt-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Anything Specific You&apos;d Like to Discuss?</span>
                </div>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe any specific questions, postpartum concerns, or topics you would like to discuss during the 15-minute call (optional)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C4] focus:border-[#7B1131] focus:ring-1 focus:ring-[#7B1131] text-xs sm:text-sm outline-none transition-all resize-none"
                />
              </div>

              {/* Callout Notice */}
              <div className="p-3 rounded-xl bg-[#FAF5F7] border border-[#E8D7DC] text-[11px] text-neutral-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7B1131] shrink-0" />
                <span>
                  <strong>Consultation Duration: 15 Minutes.</strong> You will receive a WhatsApp and email confirmation with your specialist details.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Scheduling 15-Min Call...</span>
                    </>
                  ) : (
                    <span>Book a 15-Minute Call</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
