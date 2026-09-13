'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  ShieldCheck, 
  FileText, 
  Gift, 
  Lock, 
  Heart, 
  Check, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  CreditCard,
  QrCode,
  Smartphone,
  Send,
  BookOpen,
  X
} from 'lucide-react';
import { ResourceBundle, ResourceIntendedUser, ResourceAccessFormState } from '../../types';
import { resourceBundlesData } from '../../data/resources';
import { useAuth } from '../../context/AuthContext';

interface ResourceAccessWizardProps {
  initialBundleId?: string;
  isModal?: boolean;
  onClose?: () => void;
  onSuccess?: (bundle: ResourceBundle) => void;
}

const INTENDED_USER_OPTIONS: { id: ResourceIntendedUser; label: string; icon: string; desc: string }[] = [
  { id: 'expecting-mother', label: 'Expecting Mother', icon: '🤰', desc: 'Preparing for birth & newborn' },
  { id: 'postpartum-mother', label: 'Postpartum Mother', icon: '🤱', desc: 'Confinement & recovery care' },
  { id: 'partner', label: 'Partner / Husband', icon: '🤝', desc: 'Labour & baby support toolkit' },
  { id: 'grandparent', label: 'Grandparent', icon: '👵', desc: 'Bridging traditions & gentle care' },
  { id: 'caregiver', label: 'Helper / Caregiver', icon: '🤲', desc: 'Newborn routine & bathing guide' },
  { id: 'family-member', label: 'Family Member', icon: '🏡', desc: 'Supporting the household' },
  { id: 'gift', label: 'Buying as a Gift', icon: '🎁', desc: 'Sending access to loved ones' },
  { id: 'other', label: 'Other', icon: '✨', desc: 'Custom wellness pursuit' }
];

export const ResourceAccessWizard: React.FC<ResourceAccessWizardProps> = ({
  initialBundleId = 'bundle-free-starter-pack',
  isModal = false,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();

  // Selected bundle state
  const [selectedBundleId, setSelectedBundleId] = useState<string>(initialBundleId);
  const selectedBundle = resourceBundlesData.find((b) => b.id === selectedBundleId) || resourceBundlesData[0];

  // Wizard Step State (1: Contact, 2: Access, 3: Consent, 4: Review & Checkout, 5: Unlocked Locker)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showInclusionsDetail, setShowInclusionsDetail] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<ResourceAccessFormState>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    accountOption: 'portal',
    accessMethod: 'all',
    intendedUser: 'expecting-mother',
    intendedUserCustom: '',
    isGift: false,
    recipientName: '',
    recipientContact: '',
    giftMessage: '',
    disclaimerAgreed: true,
    digitalTermsAgreed: true,
    privacyAgreed: true,
    marketingOptIn: true,
    selectedBundleId: initialBundleId,
    couponCode: '',
    paymentMethod: 'upi'
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialBundleId) {
      setSelectedBundleId(initialBundleId);
      setFormData((prev) => ({ ...prev, selectedBundleId: initialBundleId }));
    }
  }, [initialBundleId]);

  // Handle Input Changes
  const handleInputChange = (field: keyof ResourceAccessFormState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your WhatsApp number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit WhatsApp number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.intendedUser === 'gift') {
      if (!formData.recipientName.trim()) newErrors.recipientName = 'Please enter recipient name';
      if (!formData.recipientContact.trim()) newErrors.recipientContact = 'Please enter recipient email or WhatsApp';
    }
    if (formData.intendedUser === 'other' && !formData.intendedUserCustom?.trim()) {
      newErrors.intendedUserCustom = 'Please specify who will use this resource';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.disclaimerAgreed) newErrors.disclaimerAgreed = 'You must accept the resource medical disclaimer';
    if (!formData.digitalTermsAgreed) newErrors.digitalTermsAgreed = 'You must accept the digital access terms';
    if (!formData.privacyAgreed) newErrors.privacyAgreed = 'You must consent to the privacy and order policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step Navigation
  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Apply Coupon
  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'SEYOL10' || code === 'WELCOME10') {
      setAppliedCoupon({ code, percent: 10 });
    } else if (code === 'MOTHERHOOD' || code === 'FIRSTCARE') {
      setAppliedCoupon({ code, percent: 15 });
    } else {
      setCouponError('Invalid coupon code. Try SEYOL10 or MOTHERHOOD');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  };

  // Calculate Pricing
  const isFreeBundle = selectedBundle.price === 0;
  const originalPrice = selectedBundle.originalPrice || selectedBundle.price;
  const basePrice = selectedBundle.price;
  const bundleDiscount = originalPrice - basePrice;
  const couponDiscount = appliedCoupon ? Math.round((basePrice * appliedCoupon.percent) / 100) : 0;
  const finalPrice = Math.max(0, basePrice - couponDiscount);

  // Submit Final Order / Download Trigger
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      if (onSuccess) {
        onSuccess(selectedBundle);
      }
    }, 1200);
  };

  const handleCopyPortalLink = () => {
    navigator.clipboard.writeText(`https://seyolcare.com/portal/access/${selectedBundle.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const steps = [
    { num: 1, label: 'Contact', desc: 'Your Details' },
    { num: 2, label: 'Access', desc: 'Recipient & Mode' },
    { num: 3, label: 'Consent', desc: 'Terms & Privacy' },
    { num: 4, label: 'Checkout', desc: 'Review & Unlock' }
  ];

  return (
    <div className={`w-full bg-cream-light border border-cream-border rounded-3xl shadow-warm-lg overflow-hidden font-sans text-brown ${isModal ? 'max-w-4xl mx-auto' : ''}`}>
      {/* Top Header & Progress Stepper */}
      <div className="bg-cream-dark/50 p-6 border-b border-cream-border relative">
        {isModal && onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream border border-cream-border flex items-center justify-center text-brown hover:text-maroon transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Digital Resource Access Gateway</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">
              {isComplete ? 'Resource Locker Unlocked' : 'Access Your SEYOL Guide Kit'}
            </h2>
          </div>

          {!isComplete && (
            <div className="text-xs text-brown-muted bg-cream px-3.5 py-1.5 rounded-xl border border-cream-border inline-flex items-center space-x-2 self-start sm:self-auto">
              <BookOpen className="w-3.5 h-3.5 text-maroon" />
              <span className="font-medium">Selected:</span>
              <strong className="text-maroon truncate max-w-[180px]">{selectedBundle.title}</strong>
            </div>
          )}
        </div>

        {/* Stepper Indicator */}
        {!isComplete && (
          <div className="grid grid-cols-4 gap-2 pt-6">
            {steps.map((st) => {
              const isActive = currentStep === st.num;
              const isPast = currentStep > st.num;
              return (
                <div key={st.num} className="relative flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isPast
                        ? 'bg-maroon text-cream-light shadow-sm'
                        : isActive
                        ? 'bg-gold text-maroon-dark ring-4 ring-gold/20 font-extrabold'
                        : 'bg-cream text-brown-muted border border-cream-border'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-[11px] mt-1.5 font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-maroon' : 'text-brown-muted'}`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* ================= STEP 1: CONTACT DETAILS ================= */}
          {currentStep === 1 && !isComplete && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 1 of 4</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Your Contact Details</h3>
                <p className="text-xs text-brown-muted">
                  We will deliver your high-resolution download kit, receipts, and Care Portal access to these channels.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    Full Name <span className="text-maroon">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                    <input
                      type="text"
                      placeholder="e.g. Ananya Ramachandran"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                        errors.fullName ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-maroon font-medium mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    Email Address <span className="text-maroon">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                    <input
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                        errors.email ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-maroon font-medium mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    WhatsApp Number <span className="text-maroon">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                        errors.phone ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-brown-muted mt-1">
                    Your printable PDF links and quick charts will be dispatched via WhatsApp instant message.
                  </p>
                  {errors.phone && (
                    <p className="text-xs text-maroon font-medium mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Account / Portal Option */}
                <div className="pt-3 border-t border-cream-border">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2.5">
                    Care Portal Access Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => handleInputChange('accountOption', 'portal')}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        formData.accountOption === 'portal'
                          ? 'border-gold bg-gold-soft ring-2 ring-gold/20'
                          : 'border-cream-border bg-cream hover:bg-cream-dark/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountOption"
                        checked={formData.accountOption === 'portal'}
                        onChange={() => {}}
                        className="mt-1 accent-maroon"
                      />
                      <div>
                        <div className="font-bold text-xs text-brown flex items-center space-x-1.5">
                          <span>Create My SEYOL Care Portal</span>
                          <span className="text-[9px] bg-maroon text-cream-light px-1.5 py-0.5 rounded-full font-bold uppercase">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-brown-muted mt-0.5 leading-relaxed">
                          Save downloads to your digital locker, unlock future updates, and re-download anytime.
                        </p>
                      </div>
                    </label>

                    <label
                      onClick={() => handleInputChange('accountOption', 'guest')}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        formData.accountOption === 'guest'
                          ? 'border-gold bg-gold-soft ring-2 ring-gold/20'
                          : 'border-cream-border bg-cream hover:bg-cream-dark/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountOption"
                        checked={formData.accountOption === 'guest'}
                        onChange={() => {}}
                        className="mt-1 accent-maroon"
                      />
                      <div>
                        <div className="font-bold text-xs text-brown">Guest Checkout</div>
                        <p className="text-[11px] text-brown-muted mt-0.5 leading-relaxed">
                          Direct one-time email & WhatsApp links without creating a permanent portal account.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Access Details</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: ACCESS DETAILS ================= */}
          {currentStep === 2 && !isComplete && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 2 of 4</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Access & Recipient Details</h3>
                <p className="text-xs text-brown-muted">
                  Personalise the delivery format and specify who will be using this resource.
                </p>
              </div>

              {/* Access Delivery Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                  Access Delivery Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'all', label: 'All Channels', sub: 'Instant Download + WhatsApp + Email' },
                    { id: 'instant-download', label: 'Direct Download', sub: 'Instant high-res PDF on screen' },
                    { id: 'whatsapp', label: 'WhatsApp Dispatch', sub: 'Receive PDF bundle on WhatsApp' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleInputChange('accessMethod', m.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.accessMethod === m.id
                          ? 'border-maroon bg-maroon-soft ring-2 ring-maroon/20 text-maroon'
                          : 'border-cream-border bg-cream hover:bg-cream-dark/30 text-brown'
                      }`}
                    >
                      <div className="font-bold text-xs">{m.label}</div>
                      <div className="text-[10px] text-brown-muted mt-0.5">{m.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Who will use this resource? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2.5">
                  Who will use this resource? <span className="text-maroon">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {INTENDED_USER_OPTIONS.map((opt) => {
                    const isSelected = formData.intendedUser === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          handleInputChange('intendedUser', opt.id);
                          handleInputChange('isGift', opt.id === 'gift');
                        }}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'border-gold bg-gold-soft ring-2 ring-gold/30 shadow-warm-sm'
                            : 'border-cream-border bg-cream hover:bg-cream-dark/30'
                        }`}
                      >
                        <div className="text-xl mb-1.5">{opt.icon}</div>
                        <div>
                          <div className={`font-bold text-xs leading-tight ${isSelected ? 'text-maroon' : 'text-brown'}`}>
                            {opt.label}
                          </div>
                          <div className="text-[10px] text-brown-muted line-clamp-1 mt-0.5">
                            {opt.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional "Other" input */}
              {formData.intendedUser === 'other' && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    Please specify <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Doula, Midwife in training, Nursing student"
                    value={formData.intendedUserCustom || ''}
                    onChange={(e) => handleInputChange('intendedUserCustom', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  {errors.intendedUserCustom && (
                    <p className="text-xs text-maroon font-medium mt-1">{errors.intendedUserCustom}</p>
                  )}
                </motion.div>
              )}

              {/* Conditional Gift Recipient Section */}
              {formData.intendedUser === 'gift' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gold-soft border border-gold-border rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center space-x-2 text-maroon font-bold text-xs uppercase tracking-wider">
                    <Gift className="w-4 h-4 text-gold-dark" />
                    <span>Gift Recipient Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-brown mb-1">
                        Recipient Name <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya & Karthik"
                        value={formData.recipientName}
                        onChange={(e) => handleInputChange('recipientName', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.recipientName ? 'border-maroon' : 'border-gold-border'
                        }`}
                      />
                      {errors.recipientName && (
                        <p className="text-[10px] text-maroon mt-1">{errors.recipientName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-brown mb-1">
                        Recipient Email / WhatsApp <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. priya@example.com or +91 98400..."
                        value={formData.recipientContact}
                        onChange={(e) => handleInputChange('recipientContact', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.recipientContact ? 'border-maroon' : 'border-gold-border'
                        }`}
                      />
                      {errors.recipientContact && (
                        <p className="text-[10px] text-maroon mt-1">{errors.recipientContact}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brown mb-1">
                      Personal Loving Note / Gift Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Wishing you both immense peace and joy as you welcome your little one! With love from Meera."
                      value={formData.giftMessage || ''}
                      onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-cream-border text-brown hover:bg-cream font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Consent</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: CONSENT & AGREEMENTS ================= */}
          {currentStep === 3 && !isComplete && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 3 of 4</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Consent & Digital Terms</h3>
                <p className="text-xs text-brown-muted">
                  Please review the health guidance disclaimers and digital access terms before completing access.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* 1. Resource Disclaimer */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    formData.disclaimerAgreed
                      ? 'border-cream-border bg-cream'
                      : 'border-maroon/40 bg-maroon/5'
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.disclaimerAgreed}
                      onChange={(e) => handleInputChange('disclaimerAgreed', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-brown flex items-center space-x-1.5">
                        <span>Resource & Medical Guidance Disclaimer</span>
                        <span className="text-[10px] text-maroon font-bold">*Required</span>
                      </div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I acknowledge that SEYOL digital resources, checklists, and massage guides provide educational and traditional postpartum wellness support. They are not intended as clinical diagnostic advice or a substitute for medical consultation with my obstetrician or paediatrician.
                      </p>
                    </div>
                  </label>
                  {errors.disclaimerAgreed && (
                    <p className="text-[10px] text-maroon mt-1.5 ml-7 font-semibold">{errors.disclaimerAgreed}</p>
                  )}
                </div>

                {/* 2. Digital Access Terms */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    formData.digitalTermsAgreed
                      ? 'border-cream-border bg-cream'
                      : 'border-maroon/40 bg-maroon/5'
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.digitalTermsAgreed}
                      onChange={(e) => handleInputChange('digitalTermsAgreed', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-brown flex items-center space-x-1.5">
                        <span>Digital Access Terms & Single Household License</span>
                        <span className="text-[10px] text-maroon font-bold">*Required</span>
                      </div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I understand that digital materials include lifetime access and unlimited personal household printing. Redistribution, commercial resale, or unauthorized sharing of files is strictly prohibited under SEYOL copyright terms.
                      </p>
                    </div>
                  </label>
                  {errors.digitalTermsAgreed && (
                    <p className="text-[10px] text-maroon mt-1.5 ml-7 font-semibold">{errors.digitalTermsAgreed}</p>
                  )}
                </div>

                {/* 3. Privacy & Order Consent */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    formData.privacyAgreed
                      ? 'border-cream-border bg-cream'
                      : 'border-maroon/40 bg-maroon/5'
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyAgreed}
                      onChange={(e) => handleInputChange('privacyAgreed', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-brown flex items-center space-x-1.5">
                        <span>Privacy & Order Processing Consent</span>
                        <span className="text-[10px] text-maroon font-bold">*Required</span>
                      </div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I consent to SEYOL storing and processing my contact details solely to deliver digital assets, dispatch order confirmations, and grant Care Portal access in accordance with SEYOL’s Privacy Policy.
                      </p>
                    </div>
                  </label>
                  {errors.privacyAgreed && (
                    <p className="text-[10px] text-maroon mt-1.5 ml-7 font-semibold">{errors.privacyAgreed}</p>
                  )}
                </div>

                {/* 4. Marketing Updates (Optional) */}
                <div className="p-4 rounded-2xl border border-cream-border bg-cream-light">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingOptIn}
                      onChange={(e) => handleInputChange('marketingOptIn', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-brown flex items-center space-x-1.5">
                        <span>Curated Maternal Wellness & Workshop Updates</span>
                        <span className="text-[10px] text-gold-dark font-medium">(Optional)</span>
                      </div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        Receive occasional trimester-specific nutrition tips, South Indian herbal wisdom, and priority notifications for free live expert Q&A masterclasses.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-cream-border text-brown hover:bg-cream font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Review & Checkout</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 4: REVIEW & CHECKOUT ================= */}
          {currentStep === 4 && !isComplete && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 4 of 4</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Review & Complete Order</h3>
                <p className="text-xs text-brown-muted">
                  Verify your chosen bundle, check inclusions, and unlock instant lifetime access.
                </p>
              </div>

              {/* Selected Bundle Showcase Card */}
              <div className="bg-cream rounded-2xl p-5 border border-cream-border shadow-warm-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-border">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-maroon">
                        {selectedBundle.stage.toUpperCase()}
                      </span>
                      {selectedBundle.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-maroon text-cream-light">
                          {selectedBundle.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-brown">{selectedBundle.title}</h4>
                    <p className="text-xs text-brown-muted">{selectedBundle.tagline}</p>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-[10px] uppercase font-bold text-brown-muted">Total Price</div>
                    <div className="flex items-baseline space-x-1.5 sm:justify-end">
                      {isFreeBundle ? (
                        <span className="font-serif text-2xl font-black text-maroon">FREE</span>
                      ) : (
                        <>
                          <span className="font-serif text-2xl font-black text-maroon">₹{selectedBundle.price}</span>
                          {selectedBundle.originalPrice && (
                            <span className="text-xs text-brown-muted line-through">₹{selectedBundle.originalPrice}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inclusions Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowInclusionsDetail(!showInclusionsDetail)}
                    className="w-full flex items-center justify-between text-xs font-bold text-maroon hover:text-maroon-dark py-1"
                  >
                    <span className="flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-gold-dark" />
                      <span>What's Inside ({selectedBundle.inclusions.length} PDF Guides & Checklists)</span>
                    </span>
                    {showInclusionsDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {showInclusionsDetail && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 space-y-2 pt-3 border-t border-cream-border"
                      >
                        {selectedBundle.inclusions.map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-2.5 text-xs text-brown bg-cream-light p-2.5 rounded-xl border border-cream-border">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold flex items-center space-x-2">
                                <span>{item.title}</span>
                                {item.pages && (
                                  <span className="text-[10px] text-brown-muted font-normal">({item.pages})</span>
                                )}
                              </div>
                              {item.description && (
                                <div className="text-[11px] text-brown-muted mt-0.5">{item.description}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Master Bundle Upgrade Upsell (if not already selecting complete master bundle) */}
              {selectedBundle.id !== 'bundle-seyol-complete-master' && (
                <div className="bg-gradient-to-r from-maroon-soft via-gold-soft to-cream-light border border-gold-border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-maroon">
                      <Sparkles className="w-3 h-3 text-gold-dark" />
                      <span>Upgrade to All-in-One Master Vault</span>
                    </div>
                    <div className="font-bold text-xs text-brown">
                      Get All 6 Paid Bundles (37 Guides) for just ₹1,299
                    </div>
                    <div className="text-[11px] text-brown-muted">
                      Save ₹4,395 with complete pregnancy to newborn digital library.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBundleId('bundle-seyol-complete-master');
                      setFormData((prev) => ({ ...prev, selectedBundleId: 'bundle-seyol-complete-master' }));
                    }}
                    className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shrink-0 transition-all shadow-sm"
                  >
                    Upgrade & Save 77%
                  </button>
                </div>
              )}

              {/* Summary of Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-cream p-4 rounded-2xl border border-cream-border">
                <div>
                  <div className="text-[10px] uppercase font-bold text-brown-muted">Primary Recipient</div>
                  <div className="font-bold text-brown">{formData.fullName}</div>
                  <div className="text-brown-muted">{formData.email} • {formData.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-brown-muted">User Context</div>
                  <div className="font-bold text-brown capitalize">
                    {formData.intendedUser.replace('-', ' ')}
                  </div>
                  <div className="text-brown-muted">
                    {formData.accountOption === 'portal' ? 'SEYOL Care Portal Account' : 'Guest Checkout'}
                  </div>
                </div>
              </div>

              {/* Coupon Code Section (Only for paid bundles) */}
              {!isFreeBundle && (
                <div className="bg-cream-light p-4 rounded-2xl border border-cream-border space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brown">
                    Discount Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-2.5 text-brown-muted" />
                      <input
                        type="text"
                        placeholder="e.g. SEYOL10 or MOTHERHOOD"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        disabled={!!appliedCoupon}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-cream border border-cream-border text-xs font-semibold uppercase text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="px-4 py-2 rounded-xl bg-maroon-soft text-maroon font-bold text-xs hover:bg-maroon/20 transition-colors"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 rounded-xl bg-maroon text-cream-light font-bold text-xs hover:bg-maroon-dark transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <p className="text-[11px] text-green-700 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Coupon {appliedCoupon.code} applied ({appliedCoupon.percent}% OFF)!</span>
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-maroon font-medium">{couponError}</p>
                  )}
                </div>
              )}

              {/* Pricing Breakdown & Payment Selector */}
              <div className="bg-cream p-5 rounded-2xl border border-cream-border space-y-3">
                <div className="space-y-1.5 text-xs text-brown">
                  <div className="flex justify-between">
                    <span className="text-brown-muted">Original Resource Value:</span>
                    <span className="line-through text-brown-muted">₹{originalPrice}</span>
                  </div>
                  <div className="flex justify-between text-maroon font-semibold">
                    <span>Bundle Discount:</span>
                    <span>-₹{bundleDiscount}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Coupon Discount ({appliedCoupon.code}):</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brown-muted">Digital Access & GST (18% included):</span>
                    <span>₹0</span>
                  </div>
                  <div className="pt-2 border-t border-cream-border flex justify-between items-baseline">
                    <span className="font-bold text-sm text-brown">Total Payable:</span>
                    <span className="font-serif text-2xl font-extrabold text-maroon">
                      {isFreeBundle || finalPrice === 0 ? '₹0 (Free)' : `₹${finalPrice}`}
                    </span>
                  </div>
                </div>

                {/* Payment Option Selector (if not free) */}
                {!isFreeBundle && finalPrice > 0 && (
                  <div className="pt-3 border-t border-cream-border">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brown mb-2">
                      Select Payment Mode
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'upi', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                        { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-4 h-4" /> },
                        { id: 'netbanking', label: 'Net Banking', icon: <Smartphone className="w-4 h-4" /> },
                        { id: 'whatsapp', label: 'WhatsApp Pay', icon: <Send className="w-4 h-4" /> }
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => handleInputChange('paymentMethod', pm.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all ${
                            formData.paymentMethod === pm.id
                              ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                              : 'border-cream-border bg-cream hover:bg-cream-dark/30 text-brown'
                          }`}
                        >
                          {pm.icon}
                          <span className="text-[11px]">{pm.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-xl border border-cream-border text-brown hover:bg-cream font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02] ${
                    isSubmitting
                      ? 'bg-brown-muted text-cream-light cursor-not-allowed'
                      : isFreeBundle
                      ? 'bg-maroon hover:bg-maroon-dark text-cream-light'
                      : 'bg-gold hover:bg-gold-light text-maroon-dark'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream-light border-t-transparent rounded-full animate-spin" />
                      <span>Unlocking Your Resource Kit...</span>
                    </>
                  ) : isFreeBundle ? (
                    <>
                      <Download className="w-4 h-4 text-gold-light" />
                      <span>Get Free Instant Access (₹0)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay & Unlock Lifetime Access (₹{finalPrice})</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= SUCCESS / DIGITAL LOCKER SCREEN ================= */}
          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              {/* Celebration Icon */}
              <div className="w-16 h-16 rounded-full bg-gold/20 text-maroon flex items-center justify-center mx-auto ring-8 ring-gold/10">
                <CheckCircle2 className="w-8 h-8 text-gold-dark" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-maroon bg-maroon-soft px-3 py-1 rounded-full border border-maroon/20">
                  Access Successfully Granted
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
                  Welcome to Your SEYOL Resource Vault!
                </h3>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
                  Thank you, <strong className="text-brown">{formData.fullName}</strong>. Your copy of{' '}
                  <strong className="text-maroon">{selectedBundle.title}</strong> is ready for instant download and has been dispatched to{' '}
                  <strong className="text-brown">{formData.email}</strong> and your WhatsApp{' '}
                  <strong className="text-brown">{formData.phone}</strong>.
                </p>
              </div>

              {/* Master Download Action Banner */}
              <div className="bg-cream rounded-3xl p-6 border border-cream-border max-w-2xl mx-auto shadow-warm-md text-left space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-border">
                  <div>
                    <div className="font-serif font-bold text-lg text-brown">{selectedBundle.title}</div>
                    <div className="text-xs text-brown-muted">
                      {selectedBundle.inclusions.length} High-Resolution Printable PDF Guides • {selectedBundle.downloadSize || 'Full Vault'}
                    </div>
                  </div>

                  <a
                    href="#download-all"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading all ${selectedBundle.inclusions.length} PDF guides for ${selectedBundle.title}`);
                    }}
                    className="px-5 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm flex items-center space-x-2 transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 text-gold-light" />
                    <span>Download All Files (.ZIP)</span>
                  </a>
                </div>

                {/* Individual Guide Download List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted">
                    Individual Downloadable PDFs & Logs:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {selectedBundle.inclusions.map((inc, i) => (
                      <div
                        key={i}
                        className="bg-cream-light p-3 rounded-xl border border-cream-border flex items-center justify-between space-x-2"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-brown truncate">{inc.title}</div>
                          <div className="text-[10px] text-brown-muted">{inc.pages || 'Printable PDF'}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`Starting download for: ${inc.title}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-gold/20 hover:bg-gold/40 text-maroon font-bold text-[11px] flex items-center space-x-1 shrink-0 transition-colors"
                        >
                          <Download className="w-3 h-3 text-gold-dark" />
                          <span>PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Care Portal Link & Sharing */}
                <div className="pt-3 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-brown-muted text-[11px]">
                    Access code: <span className="font-mono font-bold text-maroon">SEYOL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleCopyPortalLink}
                      className="px-3 py-1.5 rounded-lg border border-cream-border bg-cream hover:bg-cream-dark/30 text-brown font-semibold text-[11px] flex items-center space-x-1 transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Portal Link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Close or Explore More */}
              <div className="pt-2 flex items-center justify-center space-x-4">
                {isModal && onClose ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-maroon text-cream-light font-bold text-xs hover:bg-maroon-dark transition-colors"
                  >
                    Done & Return to Resources
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsComplete(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 rounded-xl border border-cream-border bg-cream text-brown font-bold text-xs hover:bg-cream-dark transition-colors"
                  >
                    Access Another Bundle
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
