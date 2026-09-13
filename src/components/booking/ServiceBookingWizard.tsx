'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  AlertTriangle,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Baby,
  Flower2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Lock,
  FileText,
  CheckCircle2,
  Users,
  Home,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import {
  BookingServiceId,
  BookingFormData,
  ConsultationMode,
  PreferredTime,
  BabyCount,
  BabyOrder,
  BookingRecipient,
  ServicePackageOption
} from '../../types/booking';
import {
  bookingServicesConfig,
  hospitalsSingapore,
  bookingRecipients,
  initialBookingFormData
} from '../../data/bookingServicesData';

interface ServiceBookingWizardProps {
  initialServiceId?: BookingServiceId;
  preselectedPackageId?: string | null;
  initialData?: Partial<BookingFormData> | null;
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const ServiceBookingWizard: React.FC<ServiceBookingWizardProps> = ({
  initialServiceId = 'postpartum-massage-wrap',
  preselectedPackageId = null,
  initialData = null,
  onSuccess,
  onClose,
  isModal = false
}) => {
  const [activeServiceId, setActiveServiceId] = useState<BookingServiceId>(initialServiceId);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    ...initialBookingFormData,
    ...initialData
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const serviceConfig = useMemo(() => bookingServicesConfig[activeServiceId] || bookingServicesConfig['postpartum-massage-wrap'], [activeServiceId]);

  // Sync initial service & package props
  useEffect(() => {
    if (initialServiceId) {
      setActiveServiceId(initialServiceId);
      setCurrentStep(1);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (preselectedPackageId) {
      if (activeServiceId === 'prenatal-massage') {
        setFormData((prev) => ({ ...prev, prenatalPackage: preselectedPackageId }));
      } else if (activeServiceId === 'birth-doula-support') {
        setFormData((prev) => ({ ...prev, doulaPackage: preselectedPackageId }));
      } else if (activeServiceId === 'postpartum-massage-wrap') {
        setFormData((prev) => ({ ...prev, postpartumPackage: preselectedPackageId }));
      } else if (activeServiceId === 'infant-massage-bath') {
        setFormData((prev) => ({ ...prev, infantPackage: preselectedPackageId }));
      } else if (activeServiceId === 'mother-baby-combo') {
        setFormData((prev) => ({ ...prev, comboPackage: preselectedPackageId }));
      } else if (activeServiceId === 'confinement-nanny') {
        setFormData((prev) => ({ ...prev, nannyPackage: preselectedPackageId }));
      }
    }
  }, [preselectedPackageId, activeServiceId]);

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setValidationError(null);
  };

  const handleChipToggle = (
    field: keyof BookingFormData,
    value: string,
    maxLimit?: number
  ) => {
    const currentArray = (formData[field] as string[]) || [];
    if (currentArray.includes(value)) {
      updateFormData({ [field]: currentArray.filter((item) => item !== value) } as Partial<BookingFormData>);
    } else {
      if (maxLimit && currentArray.length >= maxLimit) {
        setValidationError(`You can select a maximum of ${maxLimit} items.`);
        return;
      }
      updateFormData({ [field]: [...currentArray, value] } as Partial<BookingFormData>);
    }
  };

  // Step Validation before going forward
  const validateCurrentStep = (): boolean => {
    setValidationError(null);

    // Step 1 validation: About You
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!formData.whatsapp.trim()) {
        setValidationError('Please enter your WhatsApp phone number.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setValidationError('Please enter a valid email address.');
        return false;
      }
      if (serviceConfig.isSingaporeOnly && formData.country !== 'Singapore') {
        setValidationError('This service is exclusively available for home visits in Singapore. Please see alternative recommendations below.');
        return false;
      }
      return true;
    }

    // Step 2 & 3: Recipient & Permission check
    if (formData.bookingFor !== 'Myself' && !formData.hasPermissionToShare) {
      setValidationError('Please confirm that you have permission to share these details with SEYOL.');
      return false;
    }

    // Consent Step validation (Step count - 1)
    const consentStepIndex = serviceConfig.stepCount - 1;
    if (currentStep === consentStepIndex) {
      if (!formData.acceptedServiceDisclaimer) {
        setValidationError('Please review and accept the Service Care Disclaimer.');
        return false;
      }
      if (!formData.acceptedPrivacyAndBooking) {
        setValidationError('Please accept the SEYOL Privacy Policy and Booking Terms.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < serviceConfig.stepCount) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateCurrentStep()) return;

    const randomId = 'SEY-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(randomId);
    setIsSubmitted(true);
    onSuccess?.();
  };

  // Generate pre-filled WhatsApp message
  const getWhatsAppMessageUrl = () => {
    const lines = [
      `*🌟 SEYOL Booking Request [${bookingRefId || 'NEW'}]*`,
      `*Service:* ${serviceConfig.title}`,
      `*Name:* ${formData.fullName}`,
      `*WhatsApp:* ${formData.whatsapp}`,
      `*Email:* ${formData.email}`,
      `*Location / Country:* ${formData.country} ${formData.postalCode ? `(${formData.postalCode})` : ''}`,
      `*Booking For:* ${formData.bookingFor}`,
      `*Preferred Mode/Time:* ${formData.preferredConsultationMode || formData.doulaPreferredMode || 'Flexible'} | ${formData.preferredTime || formData.postpartumPreferredTime || 'Flexible'}`
    ];

    if (formData.postpartumPackage || formData.prenatalPackage || formData.comboPackage || formData.doulaPackage || formData.infantPackage || formData.nannyPackage) {
      lines.push(`*Package:* ${formData.postpartumPackage || formData.prenatalPackage || formData.comboPackage || formData.doulaPackage || formData.infantPackage || formData.nannyPackage}`);
    }

    if (formData.prenatalEdd || formData.postpartumEdd || formData.doulaEdd || formData.infantEdd || formData.comboEdd || formData.nannyEdd) {
      lines.push(`*EDD:* ${formData.prenatalEdd || formData.postpartumEdd || formData.doulaEdd || formData.infantEdd || formData.comboEdd || formData.nannyEdd}`);
    }

    if (formData.postpartumBabyDob || formData.infantBabyDob || formData.comboBabyDob || formData.lactationBabyDob || formData.nannyBabyDob) {
      lines.push(`*Baby DOB:* ${formData.postpartumBabyDob || formData.infantBabyDob || formData.comboBabyDob || formData.lactationBabyDob || formData.nannyBabyDob}`);
    }

    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/6589258040?text=${text}`;
  };

  // Helper for current selected package display
  const getActivePackageSummary = (): ServicePackageOption | null => {
    const pkgs = serviceConfig.packages;
    if (!pkgs) return null;

    let targetId = '';
    if (activeServiceId === 'prenatal-massage') targetId = formData.prenatalPackage || '';
    else if (activeServiceId === 'birth-doula-support') targetId = formData.doulaPackage || '';
    else if (activeServiceId === 'postpartum-massage-wrap') targetId = formData.postpartumPackage || '';
    else if (activeServiceId === 'infant-massage-bath') targetId = formData.infantPackage || '';
    else if (activeServiceId === 'mother-baby-combo') targetId = formData.comboPackage || '';
    else if (activeServiceId === 'confinement-nanny') targetId = formData.nannyPackage || '';

    const allList = [
      ...(pkgs.flat || []),
      ...(pkgs.standard || []),
      ...(pkgs.premium || [])
    ];
    return allList.find((p) => p.id === targetId) || allList[0] || null;
  };

  /* ========================================================================= */
  /* SUCCESS CONFIRMATION VIEW                                                 */
  /* ========================================================================= */
  if (isSubmitted) {
    return (
      <div className="bg-cream-light rounded-3xl p-6 sm:p-10 border border-gold/40 text-center shadow-warm-lg space-y-6 animate-fadeIn max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold/20 text-maroon flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-maroon" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-maroon bg-maroon-soft px-3.5 py-1 rounded-full border border-maroon/20">
            Booking Reference: {bookingRefId}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
            Your SEYOL Care Journey Begins!
          </h2>
          <p className="text-xs sm:text-sm text-brown max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{formData.fullName}</strong>. Your consultation request for <strong>{serviceConfig.title}</strong> has been received by our senior care matrons.
          </p>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-2xl p-5 border border-cream-border text-left space-y-3 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-maroon flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>What Happens Next?</span>
          </div>
          <ul className="text-xs text-brown-muted space-y-2">
            <li className="flex items-start space-x-2">
              <Check className="w-3.5 h-3.5 text-maroon mt-0.5 shrink-0" />
              <span><strong>Care Advisor Review:</strong> Our senior coordinator will review your dates, due dates, and preferences within 2–4 business hours.</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-3.5 h-3.5 text-maroon mt-0.5 shrink-0" />
              <span><strong>WhatsApp Confirmation:</strong> We will connect with you at <strong>{formData.whatsapp}</strong> to confirm your matron schedule and answer questions.</span>
            </li>
            {formData.createPortalAccount && (
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-maroon mt-0.5 shrink-0" />
                <span><strong>My SEYOL Care Portal:</strong> Login details sent to <strong>{formData.email}</strong> to access your digital guides and visit records.</span>
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-warm-md hover:scale-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp for Instant Confirmation</span>
          </a>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl bg-cream border border-cream-border text-brown font-semibold text-xs sm:text-sm hover:bg-cream-dark transition-colors"
            >
              Close Window
            </button>
          )}

          {!isModal && (
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-2xl bg-cream border border-cream-border text-brown font-semibold text-xs sm:text-sm hover:bg-cream-dark transition-colors inline-flex items-center justify-center"
            >
              Return to Services
            </Link>
          )}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* MAIN MULTI-STEP WIZARD RENDERER                                           */
  /* ========================================================================= */
  return (
    <div className="bg-cream-light rounded-3xl border border-cream-border shadow-warm-lg overflow-hidden font-sans text-brown max-w-4xl mx-auto w-full">
      
      {/* 1. Header Bar with Service Title & Badge */}
      <div className="bg-gradient-to-r from-maroon via-[#6d132c] to-[#4a0b1c] text-white p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-white/15 text-gold-light text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
              <Sparkles className="w-3 h-3 text-gold-light" />
              <span>{serviceConfig.badge}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {serviceConfig.title}
            </h2>
            <p className="text-xs text-cream-light/90 max-w-xl line-clamp-1">
              {serviceConfig.subtitle}
            </p>
          </div>

          {/* Quick Service Switcher (Dropdown / Badge) */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] uppercase font-bold text-cream-light/70 hidden md:inline">
              Step {currentStep} of {serviceConfig.stepCount}
            </span>
          </div>
        </div>

        {/* 2. Progress Bar & Step Tabs */}
        <div className="mt-6 pt-4 border-t border-white/15">
          <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
            {serviceConfig.stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (stepNum < currentStep) setCurrentStep(stepNum);
                  }}
                  disabled={stepNum > currentStep}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gold text-maroon shadow-md scale-105'
                      : isCompleted
                      ? 'bg-white/20 text-cream-light hover:bg-white/30 cursor-pointer'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold ${
                    isActive ? 'bg-maroon text-gold' : isCompleted ? 'bg-gold text-maroon' : 'bg-white/20 text-white'
                  }`}>
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : stepNum}
                  </span>
                  <span className="hidden sm:inline">{title}</span>
                </button>
              );
            })}
          </div>

          {/* Linear Progress Indicator */}
          <div className="w-full bg-white/20 h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gold h-full transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / serviceConfig.stepCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Form Content Container with Smooth Animation */}
      <div className="p-6 sm:p-8 md:p-10 space-y-6">
        
        {/* Validation Error Banner */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 shadow-xs"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="font-semibold">{validationError}</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeServiceId}-step-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            
            {/* ========================================================================= */}
            {/* STEP 1: ABOUT YOU (Common to All Services)                                */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    Step 1 of {serviceConfig.stepCount}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                    About You
                  </h3>
                  <p className="text-xs text-brown-muted">
                    Please provide your contact details so our care coordinators can assist you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-xs font-bold text-brown">
                      Full Name <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-brown-muted absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateFormData({ fullName: e.target.value })}
                        placeholder="e.g. Priyadharshini Sundaram"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium focus:outline-none focus:border-maroon focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">
                      WhatsApp Number <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-brown-muted absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => updateFormData({ whatsapp: e.target.value })}
                        placeholder="+65 8123 4567 / +91 98400..."
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium focus:outline-none focus:border-maroon focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">
                      Email Address <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-brown-muted absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="priya@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium focus:outline-none focus:border-maroon focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-brown">
                      Country <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Singapore', 'Other Countries'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => updateFormData({ country: c })}
                          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                            formData.country === c
                              ? 'bg-maroon text-cream-light border-maroon shadow-warm-xs'
                              : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Singapore-Only Service Notice for Overseas Users */}
                  {serviceConfig.isSingaporeOnly && formData.country !== 'Singapore' && (
                    <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-brown space-y-3 animate-fadeIn">
                      <div className="flex items-start space-x-2.5">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-xs sm:text-sm">
                          <span className="font-bold text-amber-900">
                            Service Available Exclusively in Singapore
                          </span>
                          <p className="text-amber-800/90 leading-relaxed font-medium">
                            Our hands-on {serviceConfig.title} requires in-home visits by our certified Singapore matrons. For clients residing in other countries, we warmly offer our virtual guidance and classes:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveServiceId('general-consultation');
                            setCurrentStep(1);
                          }}
                          className="p-3 rounded-xl bg-white border border-amber-300 text-maroon font-bold text-xs text-center hover:bg-amber-100/60 transition-colors shadow-2xs"
                        >
                          Book General Consultation
                        </button>
                        <Link
                          href="/classes"
                          className="p-3 rounded-xl bg-white border border-amber-300 text-brown font-bold text-xs text-center hover:bg-amber-100/60 transition-colors shadow-2xs inline-flex items-center justify-center"
                        >
                          View Workshops &amp; Classes
                        </Link>
                        <Link
                          href="/resources"
                          className="p-3 rounded-xl bg-white border border-amber-300 text-brown font-bold text-xs text-center hover:bg-amber-100/60 transition-colors shadow-2xs inline-flex items-center justify-center"
                        >
                          Explore SEYOL Resources
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Address or Postal Code for In-Person / Singapore Services */}
                  {(serviceConfig.supportsInPerson && formData.country === 'Singapore') && (
                    <div className="sm:col-span-2 space-y-1 pt-1">
                      <label className="block text-xs font-bold text-brown">
                        Residential Address / Postal Code (Singapore) <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address || formData.postalCode || ''}
                        onChange={(e) => updateFormData({ address: e.target.value, postalCode: e.target.value })}
                        placeholder="e.g. 128 Tanjong Pagar Road, #04-02, Singapore 088535"
                        className="w-full px-4 py-3 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium focus:outline-none focus:border-maroon focus:bg-white transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2 / 3: PRECONCEPTION SUPPORT WORKFLOW                                */}
            {/* ========================================================================= */}
            {activeServiceId === 'preconception-support' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your preparation timeline and fertility goals.</p>
                </div>

                {/* Who are you booking for? */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>

                  {formData.bookingFor !== 'Myself' && (
                    <label className="flex items-start space-x-2.5 pt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasPermissionToShare}
                        onChange={(e) => updateFormData({ hasPermissionToShare: e.target.checked })}
                        className="mt-0.5 rounded text-maroon focus:ring-maroon"
                      />
                      <span className="text-xs text-brown font-semibold">
                        I confirm that I have permission to share these details with SEYOL.
                      </span>
                    </label>
                  )}
                </div>

                {/* Stage Description */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes you now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Planning to try soon',
                      'Currently trying',
                      'Preparing after a previous pregnancy',
                      'Preparing after a difficult pregnancy or birth',
                      'I may already be pregnant'
                    ].map((stg) => (
                      <button
                        key={stg}
                        type="button"
                        onClick={() => updateFormData({ preconceptionStage: stg })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                          formData.preconceptionStage === stg
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {stg}
                      </button>
                    ))}
                  </div>

                  {/* Conditional banner if "I may already be pregnant" */}
                  {formData.preconceptionStage === 'I may already be pregnant' && (
                    <div className="p-4 rounded-2xl bg-gold/15 border border-gold/40 text-brown space-y-2 animate-fadeIn">
                      <div className="flex items-center space-x-2 text-xs font-bold text-maroon">
                        <Sparkles className="w-4 h-4 text-gold-dark" />
                        <span>Congratulations on this exciting moment!</span>
                      </div>
                      <p className="text-xs text-brown leading-relaxed">
                        If you may already be pregnant, our prenatal services and care consultations are ideal for your next trimester steps:
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveServiceId('general-consultation');
                            setCurrentStep(1);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-maroon text-cream-light text-xs font-bold"
                        >
                          Book General Consultation
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveServiceId('prenatal-massage');
                            setCurrentStep(1);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-maroon/30 text-maroon text-xs font-bold"
                        >
                          View Prenatal Massage
                        </button>
                        <Link
                          href="/classes"
                          className="px-3 py-1.5 rounded-lg bg-white border border-cream-border text-brown text-xs font-bold inline-flex items-center"
                        >
                          View Birth Preparation Class
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Help Areas (Limit: choose up to 3) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-brown">What would you like help with? (Choose up to 3)</label>
                    <span className="text-[10px] font-bold text-maroon bg-maroon-soft px-2 py-0.5 rounded-full">
                      {(formData.preconceptionHelpWith?.length || 0)} / 3 selected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Preparing before pregnancy',
                      'Traditional Indian care guidance',
                      'Food and lifestyle preparation',
                      'Partner / family preparation',
                      'Planning postpartum support early'
                    ].map((item) => {
                      const isSelected = formData.preconceptionHelpWith?.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleChipToggle('preconceptionHelpWith', item, 3)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-maroon text-cream-light border-maroon'
                              : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main Question */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-brown">What is your main question for SEYOL?</label>
                  <textarea
                    rows={3}
                    value={formData.preconceptionMainQuestion || ''}
                    onChange={(e) => updateFormData({ preconceptionMainQuestion: e.target.value })}
                    placeholder="Share any specific fertility concerns, previous birth stories, or traditional care preferences..."
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown focus:outline-none focus:border-maroon focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: PRECONCEPTION APPOINTMENT PREFERENCE                              */}
            {/* ========================================================================= */}
            {activeServiceId === 'preconception-support' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Appointment Preference</h3>
                  <p className="text-xs text-brown-muted">Select how and when you would like to connect with your SEYOL care advisor.</p>
                </div>

                {/* Consultation Mode */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Preferred Consultation Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(formData.country === 'Singapore'
                      ? ['Virtual', 'In-person', 'Flexible']
                      : ['Virtual']
                    ).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => updateFormData({ preferredConsultationMode: mode.toLowerCase() as ConsultationMode })}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all ${
                          formData.preferredConsultationMode === mode.toLowerCase()
                            ? 'bg-maroon text-cream-light border-maroon shadow-warm-xs'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Preferred Time of Day</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Morning', 'Afternoon', 'Evening', 'Flexible'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updateFormData({ preferredTime: t.toLowerCase() as PreferredTime })}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          formData.preferredTime === t.toLowerCase()
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PRENATAL MASSAGE WORKFLOW                                                 */}
            {/* ========================================================================= */}
            {activeServiceId === 'prenatal-massage' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Pregnancy Details</h3>
                  <p className="text-xs text-brown-muted">Ensuring optimal safety and tailored ergonomic cushioning.</p>
                </div>

                {/* Estimated Due Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Estimated Due Date (EDD) *</label>
                  <input
                    type="date"
                    value={formData.prenatalEdd || ''}
                    onChange={(e) => updateFormData({ prenatalEdd: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown focus:outline-none focus:border-maroon focus:bg-white"
                  />
                  <div className="p-3.5 rounded-xl bg-gold/15 border border-gold/30 text-xs text-brown flex items-start space-x-2">
                    <Info className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                    <span>Prenatal massage is safely recommended from <strong>16 weeks of gestation onward</strong>. If you are currently under 16 weeks, we will pre-reserve your slots starting from your 16th week!</span>
                  </div>
                </div>

                {/* Singleton or Twins */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Singleton or Twins?</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'one-baby', label: 'One Baby' },
                      { id: 'twins', label: 'Twins' },
                      { id: 'triplets-or-more', label: 'Triplets or more' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateFormData({ prenatalBabyCount: opt.id as BabyCount })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                          formData.prenatalBabyCount === opt.id
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeServiceId === 'prenatal-massage' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">What areas of discomfort would you like our therapist to focus on? (Limit: choose up to 3)</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brown">Support Focus Areas</span>
                  <span className="text-[10px] font-bold text-maroon bg-maroon-soft px-2 py-0.5 rounded-full">
                    {(formData.prenatalSupportWith?.length || 0)} / 3 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Back discomfort',
                    'Shoulder / neck discomfort',
                    'Leg discomfort',
                    'General tiredness',
                    'Relaxation',
                    'Sleep discomfort',
                    'Pregnancy body comfort'
                  ].map((item) => {
                    const isSelected = formData.prenatalSupportWith?.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleChipToggle('prenatalSupportWith', item, 3)}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeServiceId === 'prenatal-massage' && currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 4 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Appointment Preference</h3>
                  <p className="text-xs text-brown-muted">Select your package, preferred date, and session timing.</p>
                </div>

                {/* Package selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-brown">Preferred Package</label>
                    <button
                      type="button"
                      onClick={() => setShowPackageModal(true)}
                      className="text-xs text-maroon underline font-semibold cursor-pointer"
                    >
                      Change Package
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {serviceConfig.packages?.flat?.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => updateFormData({ prenatalPackage: pkg.id })}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                          formData.prenatalPackage === pkg.id
                            ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        <div className="space-y-1">
                          {pkg.badge && (
                            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                              {pkg.badge}
                            </span>
                          )}
                          <div className="font-serif font-bold text-sm">{pkg.name}</div>
                          <div className="text-[11px] opacity-80">{pkg.sessions}</div>
                        </div>
                        {pkg.priceNote && (
                          <div className="font-extrabold text-xs text-gold-light pt-1">
                            {pkg.priceNote}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Preferred Start Date</label>
                    <input
                      type="date"
                      value={formData.prenatalPreferredDate || ''}
                      onChange={(e) => updateFormData({ prenatalPreferredDate: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Preferred Time</label>
                    <select
                      value={formData.prenatalPreferredTime || 'flexible'}
                      onChange={(e) => updateFormData({ prenatalPreferredTime: e.target.value as PreferredTime })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium"
                    >
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (1pm - 5pm)</option>
                      <option value="evening">Evening (6pm - 8pm)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* BIRTH DOULA SUPPORT WORKFLOW                                              */}
            {/* ========================================================================= */}
            {activeServiceId === 'birth-doula-support' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Your Birth Support Needs</h3>
                  <p className="text-xs text-brown-muted">Helping us tailor your birth preference plan and labour advocacy.</p>
                </div>

                {/* Recipient */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>

                  {formData.bookingFor !== 'Myself' && (
                    <label className="flex items-start space-x-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasPermissionToShare}
                        onChange={(e) => updateFormData({ hasPermissionToShare: e.target.checked })}
                        className="mt-0.5 rounded text-maroon"
                      />
                      <span className="text-xs text-brown font-semibold">
                        I confirm that I have permission to share these details with SEYOL.
                      </span>
                    </label>
                  )}
                </div>

                {/* Stage */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes your stage now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Planning for birth',
                      'Currently pregnant',
                      'Close to due date',
                      'Already experiencing early labour signs'
                    ].map((stg) => (
                      <button
                        key={stg}
                        type="button"
                        onClick={() => updateFormData({ doulaStage: stg })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left ${
                          formData.doulaStage === stg
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {stg}
                      </button>
                    ))}
                  </div>

                  {/* Early Labour Warning */}
                  {formData.doulaStage === 'Already experiencing early labour signs' && (
                    <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-900 space-y-2 animate-fadeIn">
                      <div className="flex items-center space-x-2 font-bold text-xs text-red-800">
                        <AlertTriangle className="w-4 h-4 text-red-700" />
                        <span>URGENT CLINICAL NOTICE: Early Labour Signs</span>
                      </div>
                      <p className="text-xs text-red-800 leading-relaxed font-medium">
                        If your waters have broken or you have regular intense contractions, please contact your maternity hospital triage immediately. For emergency doula on-call standby, call our urgent line at <strong>+65 8925 8040</strong>.
                      </p>
                    </div>
                  )}
                </div>

                {/* EDD & Hospital */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Estimated Due Date *</label>
                    <input
                      type="date"
                      value={formData.doulaEdd || ''}
                      onChange={(e) => updateFormData({ doulaEdd: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Planned Delivery Hospital</label>
                    <select
                      value={formData.doulaHospital || 'Thomson Medical'}
                      onChange={(e) => updateFormData({ doulaHospital: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs sm:text-sm text-brown font-medium"
                    >
                      {hospitalsSingapore.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  {formData.doulaHospital === 'Others' && (
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <strong>Hospital Doula Policy:</strong> Please verify with your hospital if outside birth doulas are permitted in the delivery suite. Our doulas are fully certified.
                    </div>
                  )}
                </div>

                {/* Which baby & Previous Birth Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Which baby is this for you?</label>
                    <select
                      value={formData.doulaBabyOrder || 'first-baby'}
                      onChange={(e) => updateFormData({ doulaBabyOrder: e.target.value as BabyOrder })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="first-baby">First baby</option>
                      <option value="second-baby">Second baby</option>
                      <option value="third-baby">Third baby</option>
                      <option value="fourth-or-more">Fourth baby or more</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Previous Birth Experience (if any)</label>
                    <select
                      value={formData.doulaPreviousBirth || 'Not applicable'}
                      onChange={(e) => updateFormData({ doulaPreviousBirth: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="Not applicable">Not applicable (First baby)</option>
                      <option value="Vaginal birth">Vaginal birth</option>
                      <option value="C-section">C-section</option>
                      <option value="Assisted birth">Assisted birth (Vacuum/Forceps)</option>
                      <option value="Previous difficult birth experience">Previous difficult birth experience</option>
                      <option value="Pregnancy loss">Pregnancy loss</option>
                    </select>
                  </div>
                </div>

                {/* Preparation topics (Limit 3) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-brown">What would you like SEYOL to help you prepare for? (Limit: 3)</label>
                    <span className="text-[10px] font-bold text-maroon bg-maroon-soft px-2 py-0.5 rounded-full">
                      {(formData.doulaPreparationTopics?.length || 0)} / 3 selected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Understanding labour stages',
                      'Knowing when to go to the hospital',
                      'Preparing your birth preferences',
                      'Partner’s role during labour',
                      'Comfort techniques during labour',
                      'Breathing and relaxation support',
                      'Preparing for induction or medical interventions',
                      'Preparing for possible C-section',
                      'Asking questions confidently at the hospital',
                      'Feeling emotionally supported before birth',
                      'Planning the first few days after birth'
                    ].map((topic) => {
                      const isSelected = formData.doulaPreparationTopics?.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleChipToggle('doulaPreparationTopics', topic, 3)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-maroon text-cream-light border-maroon'
                              : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                          }`}
                        >
                          <span className="line-clamp-1">{topic}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeServiceId === 'birth-doula-support' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Select your doula tier and preferred consultation mode.</p>
                </div>

                {/* Packages */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {serviceConfig.packages?.flat?.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => updateFormData({ doulaPackage: pkg.id })}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        formData.doulaPackage === pkg.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="font-serif font-bold text-sm">{pkg.name}</div>
                        <div className="text-[11px] opacity-80">{pkg.sessions}</div>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-90">{pkg.details}</p>
                    </button>
                  ))}
                </div>

                {/* Mode */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-brown">Preferred Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Virtual', 'In-Person'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => updateFormData({ doulaPreferredMode: m.toLowerCase() as 'virtual' | 'in-person' })}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all ${
                          formData.doulaPreferredMode === m.toLowerCase()
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {m} Support
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* POSTPARTUM MASSAGE & WRAP WORKFLOW                                        */}
            {/* ========================================================================= */}
            {activeServiceId === 'postpartum-massage-wrap' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your delivery stage so we can coordinate your start window.</p>
                </div>

                {/* Recipient */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>

                  {formData.bookingFor !== 'Myself' && (
                    <label className="flex items-start space-x-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasPermissionToShare}
                        onChange={(e) => updateFormData({ hasPermissionToShare: e.target.checked })}
                        className="mt-0.5 rounded text-maroon"
                      />
                      <span className="text-xs text-brown font-semibold">
                        I confirm that I have permission to share these details with SEYOL.
                      </span>
                    </label>
                  )}
                </div>

                {/* Stage Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes your stage now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'pregnant', label: 'I am pregnant and booking in advance' },
                      { id: 'delivered', label: 'I have already delivered' }
                    ].map((stg) => (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => updateFormData({ postpartumStage: stg.id as 'pregnant' | 'delivered' })}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-left transition-all ${
                          formData.postpartumStage === stg.id
                            ? 'bg-maroon text-cream-light border-maroon shadow-warm-xs'
                            : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregnant in advance subform */}
                {formData.postpartumStage === 'pregnant' && (
                  <div className="space-y-4 p-5 rounded-3xl bg-cream border border-cream-border animate-fadeIn">
                    <div className="font-serif font-bold text-sm text-maroon">Pregnancy &amp; Delivery Expectations</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Estimated Due Date (EDD) *</label>
                        <input
                          type="date"
                          value={formData.postpartumEdd || ''}
                          onChange={(e) => updateFormData({ postpartumEdd: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs sm:text-sm text-brown"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Expected Delivery Type</label>
                        <select
                          value={formData.postpartumExpectedDelivery || 'Vaginal birth expected'}
                          onChange={(e) => updateFormData({ postpartumExpectedDelivery: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                        >
                          <option value="Vaginal birth expected">Vaginal birth expected</option>
                          <option value="Planned C-section">Planned C-section</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Which baby is this for you?</label>
                        <select
                          value={formData.postpartumBabyOrder || 'first-baby'}
                          onChange={(e) => updateFormData({ postpartumBabyOrder: e.target.value as BabyOrder })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                        >
                          <option value="first-baby">First baby</option>
                          <option value="second-baby">Second baby</option>
                          <option value="third-baby">Third baby</option>
                          <option value="fourth-or-more">Fourth baby or more</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Singleton or Twins?</label>
                        <select
                          value={formData.postpartumBabyCount || 'one-baby'}
                          onChange={(e) => updateFormData({ postpartumBabyCount: e.target.value as BabyCount })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                        >
                          <option value="one-baby">One baby</option>
                          <option value="twins">Twins</option>
                          <option value="triplets-or-more">Triplets or more</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="block text-xs font-bold text-brown">When would you like SEYOL to start after birth?</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['After hospital discharge', 'After doctor clearance', 'Others'].map((timing) => (
                            <button
                              key={timing}
                              type="button"
                              onClick={() => updateFormData({ postpartumStartTiming: timing })}
                              className={`p-3 rounded-xl border text-xs font-bold text-center ${
                                formData.postpartumStartTiming === timing
                                  ? 'bg-maroon text-cream-light border-maroon'
                                  : 'bg-white text-brown border-cream-border'
                              }`}
                            >
                              {timing}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Already delivered subform */}
                {formData.postpartumStage === 'delivered' && (
                  <div className="space-y-4 p-5 rounded-3xl bg-cream border border-cream-border animate-fadeIn">
                    <div className="font-serif font-bold text-sm text-maroon">Postnatal Recovery Details</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Baby's Date of Birth *</label>
                        <input
                          type="date"
                          value={formData.postpartumBabyDob || ''}
                          onChange={(e) => updateFormData({ postpartumBabyDob: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs sm:text-sm text-brown"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Delivery Type</label>
                        <select
                          value={formData.postpartumActualDelivery || 'Vaginal birth'}
                          onChange={(e) => updateFormData({ postpartumActualDelivery: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                        >
                          <option value="Vaginal birth">Vaginal birth</option>
                          <option value="C-section">C-section</option>
                          <option value="Assisted birth">Assisted birth</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Have you been discharged from hospital?</label>
                        <select
                          value={formData.postpartumDischargedStatus || 'Yes'}
                          onChange={(e) => updateFormData({ postpartumDischargedStatus: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                        >
                          <option value="Yes">Yes, discharged home</option>
                          <option value="No">No, still in hospital</option>
                          <option value="Will be discharged on date">Will be discharged on specific date</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brown">Preferred Start Date</label>
                        <input
                          type="date"
                          value={formData.postpartumPreferredStartDate || ''}
                          onChange={(e) => updateFormData({ postpartumPreferredStartDate: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs sm:text-sm text-brown"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeServiceId === 'postpartum-massage-wrap' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Select between SEYOL Standard Postpartum (SSP) and Premium Postpartum (SPP).</p>
                </div>

                {/* Tier Switcher */}
                <div className="flex rounded-2xl p-1 bg-cream border border-cream-border max-w-md">
                  <button
                    type="button"
                    onClick={() => updateFormData({ postpartumTier: 'standard', postpartumPackage: 'ssp-pkg-2' })}
                    className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all ${
                      formData.postpartumTier === 'standard'
                        ? 'bg-maroon text-cream-light shadow-xs'
                        : 'text-brown hover:text-maroon'
                    }`}
                  >
                    Standard (SSP)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFormData({ postpartumTier: 'premium', postpartumPackage: 'spp-pkg-2' })}
                    className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all ${
                      formData.postpartumTier === 'premium'
                        ? 'bg-maroon text-cream-light shadow-xs'
                        : 'text-brown hover:text-maroon'
                    }`}
                  >
                    Premium Herbal Bath (SPP)
                  </button>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(formData.postpartumTier === 'premium'
                    ? serviceConfig.packages?.premium
                    : serviceConfig.packages?.standard
                  )?.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => updateFormData({ postpartumPackage: pkg.id })}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        formData.postpartumPackage === pkg.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="font-serif font-bold text-sm">{pkg.name}</div>
                        <div className="text-[11px] opacity-80">{pkg.sessions}</div>
                      </div>
                      <p className="text-[11px] opacity-90 line-clamp-2">{pkg.details}</p>
                    </button>
                  ))}
                </div>

                {/* Preferred Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Preferred Daily Visit Time</label>
                    <select
                      value={formData.postpartumPreferredTime || 'flexible'}
                      onChange={(e) => updateFormData({ postpartumPreferredTime: e.target.value as PreferredTime })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM - 4:30 PM)</option>
                      <option value="evening">Evening (5:00 PM - 7:30 PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Need a different number of sessions?</label>
                    <input
                      type="text"
                      value={formData.postpartumCustomSessions || ''}
                      onChange={(e) => updateFormData({ postpartumCustomSessions: e.target.value })}
                      placeholder="e.g. 7 sessions / alternate days"
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SIGNATURE INFANT MASSAGE & BATH WORKFLOW                                  */}
            {/* ========================================================================= */}
            {activeServiceId === 'infant-massage-bath' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your baby’s birth stage for customized massage strokes.</p>
                </div>

                {/* Recipient */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes your stage now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'pregnant', label: 'I am pregnant and booking in advance' },
                      { id: 'delivered', label: 'My baby has already been born' }
                    ].map((stg) => (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => updateFormData({ infantStage: stg.id as 'pregnant' | 'delivered' })}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-left ${
                          formData.infantStage === stg.id
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.infantStage === 'pregnant' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-cream border border-cream-border">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Estimated Due Date *</label>
                      <input
                        type="date"
                        value={formData.infantEdd || ''}
                        onChange={(e) => updateFormData({ infantEdd: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Which baby is this for you?</label>
                      <select
                        value={formData.infantBabyOrder || 'first-baby'}
                        onChange={(e) => updateFormData({ infantBabyOrder: e.target.value as BabyOrder })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      >
                        <option value="first-baby">First baby</option>
                        <option value="second-baby">Second baby</option>
                        <option value="third-baby">Third baby</option>
                        <option value="fourth-or-more">Fourth baby or more</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-cream border border-cream-border">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Baby's Date of Birth *</label>
                      <input
                        type="date"
                        value={formData.infantBabyDob || ''}
                        onChange={(e) => updateFormData({ infantBabyDob: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Has baby been discharged from hospital?</label>
                      <select
                        value={formData.infantDischargedStatus || 'Yes'}
                        onChange={(e) => updateFormData({ infantDischargedStatus: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      >
                        <option value="Yes">Yes, baby is home</option>
                        <option value="No">No, still in hospital</option>
                        <option value="Will be discharged on date">Discharge pending</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeServiceId === 'infant-massage-bath' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Select your baby massage &amp; bath package.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {serviceConfig.packages?.flat?.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => updateFormData({ infantPackage: pkg.id })}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        formData.infantPackage === pkg.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="font-serif font-bold text-sm">{pkg.name}</div>
                        <div className="text-[11px] opacity-80">{pkg.sessions}</div>
                      </div>
                      <p className="text-[11px] opacity-90">{pkg.details}</p>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Preferred Daily Visit Time</label>
                    <select
                      value={formData.infantPreferredTime || 'flexible'}
                      onChange={(e) => updateFormData({ infantPreferredTime: e.target.value as PreferredTime })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM - 4:30 PM)</option>
                      <option value="evening">Evening (5:00 PM - 7:30 PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Need a different number of sessions?</label>
                    <input
                      type="text"
                      value={formData.infantCustomSessions || ''}
                      onChange={(e) => updateFormData({ infantCustomSessions: e.target.value })}
                      placeholder="e.g. 5 sessions / trial"
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MOTHER & BABY COMBO PACKAGES WORKFLOW                                     */}
            {/* ========================================================================= */}
            {activeServiceId === 'mother-baby-combo' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your delivery timeline for synchronized dual care.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes your stage now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'pregnant', label: 'I am pregnant and booking in advance' },
                      { id: 'delivered', label: 'I have already delivered' }
                    ].map((stg) => (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => updateFormData({ comboStage: stg.id as 'pregnant' | 'delivered' })}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-left ${
                          formData.comboStage === stg.id
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.comboStage === 'pregnant' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-cream border border-cream-border">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Estimated Due Date (EDD) *</label>
                      <input
                        type="date"
                        value={formData.comboEdd || ''}
                        onChange={(e) => updateFormData({ comboEdd: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Expected Delivery Type</label>
                      <select
                        value={formData.comboExpectedDelivery || 'Vaginal birth expected'}
                        onChange={(e) => updateFormData({ comboExpectedDelivery: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      >
                        <option value="Vaginal birth expected">Vaginal birth expected</option>
                        <option value="Planned C-section">Planned C-section</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-cream border border-cream-border">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Baby's Date of Birth *</label>
                      <input
                        type="date"
                        value={formData.comboBabyDob || ''}
                        onChange={(e) => updateFormData({ comboBabyDob: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brown">Preferred Start Date</label>
                      <input
                        type="date"
                        value={formData.comboPreferredStartDate || ''}
                        onChange={(e) => updateFormData({ comboPreferredStartDate: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeServiceId === 'mother-baby-combo' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Select your Standard Combo (SSC 1–7) or Premium Herbal Combo (SPC 1–7).</p>
                </div>

                {/* Tier Switcher */}
                <div className="flex rounded-2xl p-1 bg-cream border border-cream-border max-w-md">
                  <button
                    type="button"
                    onClick={() => updateFormData({ comboTier: 'standard', comboPackage: 'ssc-pkg-3' })}
                    className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all ${
                      formData.comboTier === 'standard'
                        ? 'bg-maroon text-cream-light shadow-xs'
                        : 'text-brown hover:text-maroon'
                    }`}
                  >
                    Standard Combo (SSC)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFormData({ comboTier: 'premium', comboPackage: 'spc-pkg-3' })}
                    className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all ${
                      formData.comboTier === 'premium'
                        ? 'bg-maroon text-cream-light shadow-xs'
                        : 'text-brown hover:text-maroon'
                    }`}
                  >
                    Premium Combo (SPC)
                  </button>
                </div>

                {/* Packages List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(formData.comboTier === 'premium'
                    ? serviceConfig.packages?.premium
                    : serviceConfig.packages?.standard
                  )?.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => updateFormData({ comboPackage: pkg.id })}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        formData.comboPackage === pkg.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="font-serif font-bold text-sm">{pkg.name}</div>
                      </div>
                      <div className="text-[11px] font-medium leading-relaxed opacity-95">
                        {pkg.sessions}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Preferred Arrangement */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-brown">Preferred Arrangement</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Start mother and baby care together',
                      'Start baby care first, mother care later',
                      'Start mother care first, baby care later',
                      'I’m not sure, SEYOL can guide me'
                    ].map((arr) => (
                      <button
                        key={arr}
                        type="button"
                        onClick={() => updateFormData({ comboArrangement: arr })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left ${
                          formData.comboArrangement === arr
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {arr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STAY-IN CONFINEMENT NANNY SUPPORT WORKFLOW                                */}
            {/* ========================================================================= */}
            {activeServiceId === 'confinement-nanny' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Personal Details</h3>
                  <p className="text-xs text-brown-muted">Helping us tailor your residential confinement care placement.</p>
                </div>

                {/* Stage */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes your stage now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'pregnant', label: 'I am pregnant and booking in advance' },
                      { id: 'delivered', label: 'I have already delivered' },
                      { id: 'urgent', label: 'I need urgent confinement nanny support' }
                    ].map((stg) => (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => updateFormData({ nannyStage: stg.id as 'pregnant' | 'delivered-urgent' })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left ${
                          formData.nannyStage === stg.id
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">
                      {formData.nannyStage === 'pregnant' ? 'Estimated Due Date (EDD) *' : "Baby's Date of Birth *"}
                    </label>
                    <input
                      type="date"
                      value={formData.nannyEdd || formData.nannyBabyDob || ''}
                      onChange={(e) => updateFormData({ nannyEdd: e.target.value, nannyBabyDob: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Which baby is this for you?</label>
                    <select
                      value={formData.nannyBabyOrder || 'first-baby'}
                      onChange={(e) => updateFormData({ nannyBabyOrder: e.target.value as BabyOrder })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="first-baby">First baby</option>
                      <option value="second-baby">Second baby</option>
                      <option value="third-baby">Third baby</option>
                      <option value="fourth-or-more">Fourth baby or more</option>
                    </select>
                  </div>

                  {formData.nannyBabyOrder !== 'first-baby' && (
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs font-bold text-brown">What are your other children's ages?</label>
                      <input
                        type="text"
                        value={formData.nannyOtherChildrenAges || ''}
                        onChange={(e) => updateFormData({ nannyOtherChildrenAges: e.target.value })}
                        placeholder="e.g. 3 years old, 6 years old"
                        className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeServiceId === 'confinement-nanny' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Household Basics</h3>
                  <p className="text-xs text-brown-muted">Matching the ideal stay-in nanny for your home environment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">How many adults live in the household?</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.nannyAdultsCount || 2}
                      onChange={(e) => updateFormData({ nannyAdultsCount: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Do you have a domestic helper?</label>
                    <select
                      value={formData.nannyHasHelper || 'No'}
                      onChange={(e) => updateFormData({ nannyHasHelper: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Will have one by then">Will have one by then</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Meal Preferences</label>
                    <select
                      value={formData.nannyMealPreference || 'Vegetarian'}
                      onChange={(e) => updateFormData({ nannyMealPreference: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-vegetarian">Non-vegetarian</option>
                      <option value="Lacto-ovo vegetarian">Lacto-ovo vegetarian</option>
                      <option value="Mixed: vegetarian and non-vegetarian">Mixed (Vegetarian &amp; Non-veg)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Accommodation for SCN</label>
                    <select
                      value={formData.nannyAccommodation || 'Separate room'}
                      onChange={(e) => updateFormData({ nannyAccommodation: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="Separate room">Separate private room</option>
                      <option value="Baby’s or mother’s bedroom with no other family member">Baby's or Mother's bedroom (no other family member)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Stairs inside household?</label>
                    <select
                      value={formData.nannyHasStairs || 'No'}
                      onChange={(e) => updateFormData({ nannyHasStairs: e.target.value as 'Yes' | 'No' })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="No">No (Single-level apartment)</option>
                      <option value="Yes">Yes (Multi-story landed/maisonette)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Do you have any pets?</label>
                    <select
                      value={formData.nannyHasPets || 'No'}
                      onChange={(e) => updateFormData({ nannyHasPets: e.target.value as 'Yes' | 'No' })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="No">No pets</option>
                      <option value="Yes">Yes, have pets</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-xs font-bold text-brown">Language Preference</label>
                    <select
                      value={formData.nannyLanguagePreference || 'Tamil / Malay / English is fine'}
                      onChange={(e) => updateFormData({ nannyLanguagePreference: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    >
                      <option value="Tamil / Malay / English is fine">Tamil / Malay / English is fine</option>
                      <option value="Mandarin preferred, if available">Mandarin preferred, if available</option>
                      <option value="Hindi preferred, if available">Hindi preferred, if available</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeServiceId === 'confinement-nanny' && currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 4 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Select your confinement nanny package and stay duration.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceConfig.packages?.flat?.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => updateFormData({ nannyPackage: pkg.id })}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        formData.nannyPackage === pkg.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-warm-md'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-maroon">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="font-serif font-bold text-sm">{pkg.name}</div>
                      </div>
                      <p className="text-[11px] opacity-90">{pkg.details}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-brown">Preferred Duration</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['28 days', '56 days', 'More than 56 days'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => updateFormData({ nannyDuration: dur })}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-center ${
                          formData.nannyDuration === dur
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* HOURLY NEWBORN SUPPORT WORKFLOW                                           */}
            {/* ========================================================================= */}
            {activeServiceId === 'hourly-newborn-support' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your baby’s stage and specific health requirements.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Who are you booking for?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bookingRecipients.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => updateFormData({ bookingFor: rec as BookingRecipient })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left ${
                          formData.bookingFor === rec
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Baby Health Concerns (if any)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'No major concerns',
                      'Jaundice',
                      'Premature baby',
                      'Low birth weight',
                      'Skin sensitivity / rashes',
                      'Doctor restrictions',
                      'Other concern'
                    ].map((concern) => {
                      const isSelected = formData.hourlyBabyConcerns?.includes(concern);
                      return (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => handleChipToggle('hourlyBabyConcerns', concern)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-maroon text-cream-light border-maroon'
                              : 'bg-cream text-brown border-cream-border'
                          }`}
                        >
                          <span>{concern}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeServiceId === 'hourly-newborn-support' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Choose Your Support</h3>
                  <p className="text-xs text-brown-muted">Choose your hours, timing, and required respite assistance.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">When do you need support?</label>
                    <select
                      value={formData.hourlyWhenNeed || 'As soon as possible'}
                      onChange={(e) => updateFormData({ hourlyWhenNeed: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown font-medium"
                    >
                      <option value="Specific date">Specific date</option>
                      <option value="Urgent">Urgent (Today / Tomorrow)</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Regular weekly support">Regular weekly support</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">How many hours do you need?</label>
                    <select
                      value={formData.hourlyHoursCount || '3 hours'}
                      onChange={(e) => updateFormData({ hourlyHoursCount: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown font-medium"
                    >
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="4 hours">4 hours</option>
                      <option value="5 hours or more">5 hours or more</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-brown">What would you like help with?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Baby carrying / settling',
                      'Feeding support',
                      'Burping',
                      'Diaper changing',
                      'Bath preparation support',
                      'Baby routine support',
                      'Family needs rest'
                    ].map((duty) => {
                      const isSelected = formData.hourlyHelpWith?.includes(duty);
                      return (
                        <button
                          key={duty}
                          type="button"
                          onClick={() => handleChipToggle('hourlyHelpWith', duty)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-maroon text-cream-light border-maroon'
                              : 'bg-cream text-brown border-cream-border'
                          }`}
                        >
                          <span className="line-clamp-1">{duty}</span>
                          {isSelected && <Check className="w-3 h-3 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* LACTATION & FEEDING SUPPORT WORKFLOW                                      */}
            {/* ========================================================================= */}
            {activeServiceId === 'lactation-support' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us about your baby’s age and current feeding methods.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brown">Which best describes you now?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'I am pregnant and preparing for feeding',
                      'My baby has already been born',
                      'I am returning to work / planning pumping'
                    ].map((stg) => (
                      <button
                        key={stg}
                        type="button"
                        onClick={() => updateFormData({ lactationStage: stg })}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-left ${
                          formData.lactationStage === stg
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        {stg}
                      </button>
                    ))}
                  </div>

                  {formData.lactationStage === 'I am pregnant and preparing for feeding' && (
                    <div className="p-3.5 rounded-xl bg-gold/15 border border-gold/30 text-xs text-brown flex items-center justify-between">
                      <span>Preparing prenatally? Explore our interactive masterclass:</span>
                      <Link href="/classes" className="font-bold text-maroon underline">
                        View Lactation &amp; Breastfeeding Class
                      </Link>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">Baby's Date of Birth (or EDD)</label>
                    <input
                      type="date"
                      value={formData.lactationBabyDob || ''}
                      onChange={(e) => updateFormData({ lactationBabyDob: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-brown">How is baby currently feeding?</label>
                    <select
                      value={formData.lactationFeedingMethod || 'Breastfeeding'}
                      onChange={(e) => updateFormData({ lactationFeedingMethod: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown font-medium"
                    >
                      <option value="Breastfeeding">Breastfeeding directly</option>
                      <option value="Bottle feeding">Bottle feeding</option>
                      <option value="Mixed feeding">Mixed feeding (Breast &amp; Formula)</option>
                      <option value="Pumping / expressed milk">Exclusively pumping / expressed milk</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeServiceId === 'lactation-support' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Do You Need Support With?</h3>
                  <p className="text-xs text-brown-muted">Select all lactation areas you’d like guidance on.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Preparing for breastfeeding before birth',
                    'Latching and positioning',
                    'Breastfeeding comfort',
                    'Milk supply concerns',
                    'Bottle feeding guidance',
                    'Mixed feeding guidance',
                    'Pumping guidance',
                    'Milk storage basics',
                    'Burping and feeding routine',
                    'Returning to work feeding plan',
                    'Baby not settling after feeds'
                  ].map((topic) => {
                    const isSelected = formData.lactationHelpWith?.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleChipToggle('lactationHelpWith', topic)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        <span>{topic}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="block text-xs font-bold text-brown">What is your main question for SEYOL?</label>
                  <textarea
                    rows={3}
                    value={formData.lactationMainQuestion || ''}
                    onChange={(e) => updateFormData({ lactationMainQuestion: e.target.value })}
                    placeholder="Describe any latch pain, nipple soreness, or pump output questions..."
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>
            )}

            {activeServiceId === 'lactation-support' && currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 4 of 7</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Appointment Preference</h3>
                  <p className="text-xs text-brown-muted">Choose your preferred mode and session time.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(formData.country === 'Singapore' ? ['Virtual', 'In-Person', 'Flexible'] : ['Virtual']).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => updateFormData({ lactationPreferredMode: m.toLowerCase() as ConsultationMode })}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-center ${
                        formData.lactationPreferredMode === m.toLowerCase()
                          ? 'bg-maroon text-cream-light border-maroon'
                          : 'bg-cream text-brown border-cream-border'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="block text-xs font-bold text-brown">Preferred Time</label>
                  <select
                    value={formData.lactationPreferredTime || 'flexible'}
                    onChange={(e) => updateFormData({ lactationPreferredTime: e.target.value as PreferredTime })}
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                  >
                    <option value="morning">Morning (Around planned feed)</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* GENERAL CONSULTATION WORKFLOW                                             */}
            {/* ========================================================================= */}
            {activeServiceId === 'general-consultation' && currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 2 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Brings You Here?</h3>
                  <p className="text-xs text-brown-muted">Tell us which maternal stage best describes your current journey.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Planning before pregnancy',
                    'Currently pregnant',
                    'Preparing for birth',
                    'Already delivered',
                    'Baby already born',
                    'Others'
                  ].map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => updateFormData({ generalStage: stg })}
                      className={`p-3.5 rounded-2xl border text-xs font-bold text-left ${
                        formData.generalStage === stg
                          ? 'bg-maroon text-cream-light border-maroon'
                          : 'bg-cream text-brown border-cream-border'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeServiceId === 'general-consultation' && currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 3 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">What Do You Need Support With?</h3>
                  <p className="text-xs text-brown-muted">Select the guidance topics for your 45-minute roadmap session.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Pregnancy support',
                    'Birth preparation',
                    'Postpartum care',
                    'Baby massage & bath',
                    'Newborn care',
                    'Lactation / feeding'
                  ].map((topic) => {
                    const isSelected = formData.generalGuidanceOn?.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleChipToggle('generalGuidanceOn', topic)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-maroon text-cream-light border-maroon'
                            : 'bg-cream text-brown border-cream-border'
                        }`}
                      >
                        <span>{topic}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="block text-xs font-bold text-brown">What is your main question for SEYOL?</label>
                  <textarea
                    rows={3}
                    value={formData.generalMainQuestion || ''}
                    onChange={(e) => updateFormData({ generalMainQuestion: e.target.value })}
                    placeholder="Tell us what you would like clarified during your roadmap session..."
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>
            )}

            {activeServiceId === 'general-consultation' && currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Step 4 of 6</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Appointment Preference</h3>
                  <p className="text-xs text-brown-muted">Choose your preferred consultation format and timing.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(formData.country === 'Singapore' ? ['Virtual', 'In-Person', 'Flexible'] : ['Virtual']).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => updateFormData({ generalPreferredMode: m.toLowerCase() as ConsultationMode })}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold text-center ${
                        formData.generalPreferredMode === m.toLowerCase()
                          ? 'bg-maroon text-cream-light border-maroon'
                          : 'bg-cream text-brown border-cream-border'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="space-y-1 pt-2">
                  <label className="block text-xs font-bold text-brown">Preferred Time</label>
                  <select
                    value={formData.generalPreferredTime || 'flexible'}
                    onChange={(e) => updateFormData({ generalPreferredTime: e.target.value as PreferredTime })}
                    className="w-full p-3.5 rounded-2xl bg-cream border border-cream-border text-xs text-brown"
                  >
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (1pm - 5pm)</option>
                    <option value="evening">Evening (6pm - 8pm)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP: MY SEYOL CARE JOURNEY (Portal Setup)                                */}
            {/* ========================================================================= */}
            {currentStep === (serviceConfig.stepCount - 2) && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    Step {serviceConfig.stepCount - 2} of {serviceConfig.stepCount}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                    My SEYOL Care Journey
                  </h3>
                  <p className="text-xs text-brown-muted">
                    Create your client sanctuary portal to track your care roadmap, matron visit records, and herbal recipes.
                  </p>
                </div>

                {/* Portal Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-xs space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-soft text-maroon flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="font-serif font-bold text-xs text-brown">Care Schedule</div>
                    <p className="text-[11px] text-brown-muted leading-relaxed">
                      View confirmed matron dates, track session countdown, and manage appointments.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-xs space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-soft text-maroon flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="font-serif font-bold text-xs text-brown">Daily Matron Notes</div>
                    <p className="text-[11px] text-brown-muted leading-relaxed">
                      Postnatal recovery logs, belly wrap progress, and newborn feeding observations.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-xs space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-soft text-maroon flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="font-serif font-bold text-xs text-brown">Resource Locker</div>
                    <p className="text-[11px] text-brown-muted leading-relaxed">
                      Instant access to Ayurvedic bath guides, lullabies, and postpartum meal planners.
                    </p>
                  </div>
                </div>

                {/* Portal Account Creation Card */}
                <div className="p-5 rounded-3xl bg-cream border border-cream-border space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.createPortalAccount}
                      onChange={(e) => updateFormData({ createPortalAccount: e.target.checked })}
                      className="w-4 h-4 rounded text-maroon focus:ring-maroon"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs sm:text-sm text-brown">
                        Activate My SEYOL Care Portal
                      </span>
                      <p className="text-[11px] text-brown-muted">
                        Securely link this booking with email <strong>{formData.email || 'your email'}</strong>.
                      </p>
                    </div>
                  </label>

                  {formData.createPortalAccount && (
                    <div className="pt-2 max-w-md space-y-1">
                      <label className="block text-xs font-bold text-brown">Create Account Password (Optional)</label>
                      <input
                        type="password"
                        value={formData.portalPassword || ''}
                        onChange={(e) => updateFormData({ portalPassword: e.target.value })}
                        placeholder="Choose a password or leave blank for magic login link"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-cream-border text-xs text-brown"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP: CONSENT & DISCLAIMERS                                               */}
            {/* ========================================================================= */}
            {currentStep === (serviceConfig.stepCount - 1) && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    Step {serviceConfig.stepCount - 1} of {serviceConfig.stepCount}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                    Consent &amp; Booking Terms
                  </h3>
                  <p className="text-xs text-brown-muted">
                    Please review our holistic care policies and clinical safety disclaimers.
                  </p>
                </div>

                {/* Service-Specific Disclaimer Box */}
                <div className="p-5 rounded-3xl bg-white border border-cream-border shadow-xs space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-maroon">
                    <ShieldCheck className="w-4 h-4 text-maroon" />
                    <span>{serviceConfig.disclaimer.title}</span>
                  </div>
                  <div className="text-xs text-brown-muted space-y-2 max-h-48 overflow-y-auto pr-2 leading-relaxed">
                    {serviceConfig.disclaimer.body.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start space-x-3 p-3.5 rounded-2xl bg-cream border border-cream-border cursor-pointer hover:bg-cream-dark/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.acceptedServiceDisclaimer}
                      onChange={(e) => updateFormData({ acceptedServiceDisclaimer: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-maroon focus:ring-maroon"
                    />
                    <span className="text-xs text-brown font-semibold leading-relaxed">
                      I have read, understood, and accept the <strong>{serviceConfig.disclaimer.title}</strong>. <span className="text-maroon">*</span>
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 p-3.5 rounded-2xl bg-cream border border-cream-border cursor-pointer hover:bg-cream-dark/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.acceptedPrivacyAndBooking}
                      onChange={(e) => updateFormData({ acceptedPrivacyAndBooking: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-maroon focus:ring-maroon"
                    />
                    <span className="text-xs text-brown font-semibold leading-relaxed">
                      I accept the SEYOL <strong>Privacy Policy &amp; Booking Terms</strong> for scheduling and care communication. <span className="text-maroon">*</span>
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 p-3.5 rounded-2xl bg-cream/60 border border-cream-border cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.optInMarketing}
                      onChange={(e) => updateFormData({ optInMarketing: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-maroon focus:ring-maroon"
                    />
                    <span className="text-xs text-brown-muted leading-relaxed">
                      Send me occasional traditional postpartum wellness guides, herbal recipes, and workshop invitations.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* FINAL STEP: REVIEW & CHECKOUT / REVIEW                                    */}
            {/* ========================================================================= */}
            {currentStep === serviceConfig.stepCount && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    Final Step {serviceConfig.stepCount} of {serviceConfig.stepCount}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">
                    Review Your Care Summary
                  </h3>
                  <p className="text-xs text-brown-muted">
                    Confirm your details before our care matrons finalize your schedule.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-3xl p-6 border border-gold/40 shadow-warm-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cream-border">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-bold text-maroon tracking-wider">Service Selected</div>
                      <div className="font-serif font-bold text-lg text-brown">{serviceConfig.title}</div>
                    </div>
                    <span className="bg-maroon-soft text-maroon font-bold text-xs px-3 py-1 rounded-full border border-maroon/20">
                      {serviceConfig.badge}
                    </span>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-brown-muted font-semibold block">Client Name</span>
                      <strong className="text-brown">{formData.fullName || 'Not provided'}</strong>
                    </div>

                    <div>
                      <span className="text-brown-muted font-semibold block">WhatsApp &amp; Email</span>
                      <strong className="text-brown">{formData.whatsapp} | {formData.email}</strong>
                    </div>

                    <div>
                      <span className="text-brown-muted font-semibold block">Location</span>
                      <strong className="text-brown">{formData.country} {formData.address ? `(${formData.address})` : ''}</strong>
                    </div>

                    <div>
                      <span className="text-brown-muted font-semibold block">Booking For</span>
                      <strong className="text-brown">{formData.bookingFor}</strong>
                    </div>

                    {getActivePackageSummary() && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-cream border border-cream-border">
                        <span className="text-[10px] font-bold uppercase text-maroon block">Selected Package</span>
                        <div className="font-serif font-bold text-brown text-sm">{getActivePackageSummary()?.name}</div>
                        <div className="text-[11px] text-brown-muted mt-0.5">{getActivePackageSummary()?.sessions}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instant Action CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleFinalSubmit()}
                    className="flex-1 py-4 px-6 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Submit &amp; Coordinate with SEYOL</span>
                    <ArrowRight className="w-4 h-4 text-gold-light" />
                  </button>

                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-warm-sm hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Review</span>
                  </a>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* 4. Wizard Footer Navigation */}
        <div className="pt-6 border-t border-cream-border flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-cream-border text-brown hover:bg-cream font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < serviceConfig.stepCount && (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-7 py-3 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs sm:text-sm shadow-warm-md flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 text-gold-light" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
