'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  Heart,
  Briefcase,
  Globe,
  Building,
  Check,
  X,
  FileCheck,
  AlertTriangle,
  Send
} from 'lucide-react';
import { SeyolCareerPathwayId, CaregiverApplicationState } from '../../types';
import { caregiverPathwaysList, inTrainingCoursesData } from '../../data/careers';

interface CaregiverApplicationWizardProps {
  initialPathwayId?: SeyolCareerPathwayId;
  onSuccess?: () => void;
}

export const CaregiverApplicationWizard: React.FC<CaregiverApplicationWizardProps> = ({
  initialPathwayId = 'pathway-1-foundation',
  onSuccess
}) => {
  // Step state (1: About You, 2: Find Pathway, 3: Experience, 4: Work Interest, 5: Motivation & Interview, 6: Consent, 7: Done)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState<CaregiverApplicationState>({
    chosenPathwayId: initialPathwayId,
    fullName: '',
    dateOfBirth: '',
    age: null,
    whatsappNumber: '',
    emailAddress: '',
    countryOfResidence: 'Singapore',
    residencyStatus: 'Singapore Citizen / PR',
    hasConfinementCertification: null,
    hasConfinementExperience: null,
    p1LearningInterests: ['Newborn care and handling', 'Newborn massage and bath'],
    p2CompletedCourse: '',
    p2CertificateFile: null,
    p2NeedPracticeAreas: ['Newborn handling', 'Baby massage and bath'],
    p3YearsExperience: '1–3 years',
    p3WorkedCountries: ['Yes, in Singapore'],
    p3FamiliesSupported: '5–10 families',
    p3CareTypesProvided: ['Stay-in confinement nanny', 'Newborn care', 'Baby bath'],
    p3OtherCareType: '',
    p4YearsExperience: '3–5 years',
    p4WorkedCountries: ['Singapore', 'Malaysia'],
    p4CompletedCourse: '',
    p4CertificateFile: null,
    preferredWorkCountry: 'Singapore',
    workTypeInterest: 'Stay-in confinement nanny',
    availabilityStart: 'Immediately',
    motivationStatement: '',
    willingToAttendInterview: null,
    preferredInterviewTiming: 'Weekday morning',
    applicationAcknowledgement: true,
    trainingReviewAcknowledgement: true,
    privacyConsent: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialPathwayId) {
      setFormData((prev) => ({
        ...prev,
        chosenPathwayId: initialPathwayId,
        hasConfinementCertification: initialPathwayId === 'pathway-2-practical' || initialPathwayId === 'pathway-4-professional',
        hasConfinementExperience: initialPathwayId === 'pathway-3-experienced' || initialPathwayId === 'pathway-4-professional'
      }));
    }
  }, [initialPathwayId]);

  // Calculate age from date of birth
  const handleDobChange = (dobString: string) => {
    let calculatedAge: number | null = null;
    if (dobString) {
      const birthDate = new Date(dobString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age > 0 && age < 100) {
        calculatedAge = age;
      }
    }
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dobString,
      age: calculatedAge
    }));
    if (errors.dateOfBirth) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.dateOfBirth;
        return next;
      });
    }
  };

  const handleInputChange = (field: keyof CaregiverApplicationState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleArrayItem = (field: 'p1LearningInterests' | 'p2NeedPracticeAreas' | 'p3WorkedCountries' | 'p3CareTypesProvided' | 'p4WorkedCountries', item: string) => {
    setFormData((prev) => {
      const currentList = prev[field] as string[];
      const exists = currentList.includes(item);
      const updated = exists ? currentList.filter((i) => i !== item) : [...currentList, item];
      return { ...prev, [field]: updated };
    });
  };

  // Mock certificate file upload
  const handleFileUpload = (field: 'p2CertificateFile' | 'p4CertificateFile', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, [field]: `${file.name} (${(file.size / 1024).toFixed(1)} KB)` }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full legal name';
    if (!formData.dateOfBirth) {
      errs.dateOfBirth = 'Please enter your date of birth';
    } else if (!formData.age || formData.age < 18) {
      errs.dateOfBirth = 'Applicants must be at least 18 years of age';
    }
    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'Please enter your WhatsApp contact number';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 8) {
      errs.whatsappNumber = 'Please enter a valid phone number';
    }
    if (!formData.emailAddress.trim()) {
      errs.emailAddress = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errs.emailAddress = 'Please enter a valid email address';
    }
    if (!formData.residencyStatus.trim()) errs.residencyStatus = 'Please specify your residency / pass status';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.hasConfinementCertification === null) {
      errs.hasConfinementCertification = 'Please answer the certification question';
    }
    if (formData.hasConfinementExperience === null) {
      errs.hasConfinementExperience = 'Please answer the experience question';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    const pathway = formData.chosenPathwayId;

    if (pathway === 'pathway-1-foundation') {
      if (formData.p1LearningInterests.length === 0) {
        errs.p1LearningInterests = 'Please select at least one area you wish to learn';
      }
    } else if (pathway === 'pathway-2-practical') {
      if (!formData.p2CompletedCourse.trim()) {
        errs.p2CompletedCourse = 'Please state what course or certification you completed';
      }
      if (formData.p2NeedPracticeAreas.length === 0) {
        errs.p2NeedPracticeAreas = 'Please select at least one area you need practice in';
      }
    } else if (pathway === 'pathway-3-experienced') {
      if (formData.p3WorkedCountries.length === 0) {
        errs.p3WorkedCountries = 'Please select where you have worked as a caregiver';
      }
      if (formData.p3CareTypesProvided.length === 0) {
        errs.p3CareTypesProvided = 'Please select care types you have provided';
      }
    } else if (pathway === 'pathway-4-professional') {
      if (formData.p4WorkedCountries.length === 0) {
        errs.p4WorkedCountries = 'Please select where you have worked before';
      }
      if (!formData.p4CompletedCourse.trim()) {
        errs.p4CompletedCourse = 'Please specify your certification or qualification';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 4 Validation
  const validateStep4 = () => {
    return true;
  };

  // Step 5 Validation (Motivation & Interview)
  const validateStep5 = () => {
    const errs: Record<string, string> = {};
    if (!formData.motivationStatement.trim()) {
      errs.motivationStatement = 'Please share why you are interested in joining SEYOL';
    }
    if (formData.willingToAttendInterview === null) {
      errs.willingToAttendInterview = 'Please indicate if you are willing to attend an interview';
    } else if (formData.willingToAttendInterview === false) {
      errs.willingToAttendInterview = 'Unable to continue with form. An interview is required for all SEYOL pathways.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 6 Validation (Consent)
  const validateStep6 = () => {
    const errs: Record<string, string> = {};
    if (!formData.applicationAcknowledgement) errs.applicationAcknowledgement = 'You must acknowledge the application accuracy';
    if (!formData.trainingReviewAcknowledgement) errs.trainingReviewAcknowledgement = 'You must accept the training & review policy';
    if (!formData.privacyConsent) errs.privacyConsent = 'You must consent to the privacy policy';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep === 4 && !validateStep4()) return;
    if (currentStep === 5 && !validateStep5()) return;
    if (currentStep === 6 && !validateStep6()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Auto-sync pathway based on Step 2 matrix
  const handleMatrixChange = (hasCert: boolean, hasExp: boolean) => {
    let matchedId: SeyolCareerPathwayId = 'pathway-1-foundation';
    if (!hasCert && !hasExp) matchedId = 'pathway-1-foundation';
    else if (hasCert && !hasExp) matchedId = 'pathway-2-practical';
    else if (!hasCert && hasExp) matchedId = 'pathway-3-experienced';
    else if (hasCert && hasExp) matchedId = 'pathway-4-professional';

    setFormData((prev) => ({
      ...prev,
      hasConfinementCertification: hasCert,
      hasConfinementExperience: hasExp,
      chosenPathwayId: matchedId
    }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep6()) return;

    setIsSubmitting(true);
    const generatedId = `SEYOL-CARE-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const activePathway = caregiverPathwaysList.find((p) => p.id === formData.chosenPathwayId) || caregiverPathwaysList[0];

  const stepsList = [
    { num: 1, label: 'About You', desc: 'Personal Info' },
    { num: 2, label: 'Pathway', desc: 'Find Match' },
    { num: 3, label: 'Experience', desc: 'Background' },
    { num: 4, label: 'Work Interest', desc: 'Preferences' },
    { num: 5, label: 'Interview', desc: 'Motivation' },
    { num: 6, label: 'Consent', desc: 'Agreements' }
  ];

  return (
    <div className="w-full bg-cream-light border border-cream-border rounded-3xl shadow-warm-lg overflow-hidden font-sans text-brown">
      {/* Top Banner & Pathway Selector */}
      <div className="bg-cream-dark/60 p-6 border-b border-cream-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-border/60">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5 text-gold-dark" />
              <span>SEYOL Caregiver Academy & Recruitment</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">
              {isSuccess ? 'Application Submitted' : 'Caregiver Pathway Application'}
            </h2>
          </div>

          {!isSuccess && (
            <div className="bg-cream px-3.5 py-1.5 rounded-xl border border-cream-border text-xs flex items-center space-x-2 self-start sm:self-auto">
              <span className="text-base">{activePathway.icon}</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-brown-muted">Current Pathway:</div>
                <div className="font-bold text-maroon truncate max-w-[180px]">{activePathway.title}</div>
              </div>
            </div>
          )}
        </div>

        {/* Stepper Tabs */}
        {!isSuccess && (
          <div className="grid grid-cols-6 gap-1 sm:gap-2 pt-4">
            {stepsList.map((st) => {
              const isActive = currentStep === st.num;
              const isPast = currentStep > st.num;
              return (
                <div key={st.num} className="flex flex-col items-center text-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-maroon text-cream-light'
                        : isActive
                        ? 'bg-gold text-maroon-dark ring-4 ring-gold/20 font-extrabold'
                        : 'bg-cream text-brown-muted border border-cream-border'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <span className={`text-[10px] mt-1 font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-maroon' : 'text-brown-muted'}`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* ================= STEP 1: ABOUT YOU ================= */}
          {currentStep === 1 && !isSuccess && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 1 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">About You</h3>
                <p className="text-xs text-brown-muted">
                  Please provide your personal details so our admissions team can verify your application.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    Full Legal Name (as per ID / Passport) <span className="text-maroon">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                    <input
                      type="text"
                      placeholder="e.g. Kamala Devi / Tan Siew Mei"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.fullName ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-maroon mt-1">{errors.fullName}</p>}
                </div>

                {/* Date of Birth & Auto-Calculated Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Date of Birth <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleDobChange(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.dateOfBirth ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-xs text-maroon mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Calculated Age
                    </label>
                    <div className="h-[46px] px-4 rounded-xl bg-cream border border-cream-border flex items-center justify-between">
                      <span className="text-xs font-medium text-brown">
                        {formData.age ? `${formData.age} Years Old` : 'Enter DOB to calculate'}
                      </span>
                      {formData.age && (
                        <span className="text-[10px] bg-gold/20 text-maroon font-bold px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      WhatsApp Number <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                      <input
                        type="tel"
                        placeholder="e.g. +65 9123 4567 / +60 12 345 6789"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.whatsappNumber ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                        }`}
                      />
                    </div>
                    {errors.whatsappNumber && <p className="text-xs text-maroon mt-1">{errors.whatsappNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Email Address <span className="text-maroon">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                      <input
                        type="email"
                        placeholder="e.g. caregiver@example.com"
                        value={formData.emailAddress}
                        onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.emailAddress ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                        }`}
                      />
                    </div>
                    {errors.emailAddress && <p className="text-xs text-maroon mt-1">{errors.emailAddress}</p>}
                  </div>
                </div>

                {/* Country of Residence & Residency / Work-Pass Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Current Country of Residence <span className="text-maroon">*</span>
                    </label>
                    <select
                      value={formData.countryOfResidence}
                      onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-cream border border-cream-border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="India">India</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Residency / Work-Pass Status <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Citizen, PR, Work Permit, LTVP, etc."
                      value={formData.residencyStatus}
                      onChange={(e) => handleInputChange('residencyStatus', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-cream border text-sm font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.residencyStatus ? 'border-maroon bg-maroon/5' : 'border-cream-border'
                      }`}
                    />
                    {errors.residencyStatus && <p className="text-xs text-maroon mt-1">{errors.residencyStatus}</p>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Pathway Match</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: FIND YOUR SEYOL PATHWAY ================= */}
          {currentStep === 2 && !isSuccess && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 2 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Find Your SEYOL Pathway</h3>
                <p className="text-xs text-brown-muted">
                  Answer the two quick qualification questions below to confirm or refine your ideal caregiver track.
                </p>
              </div>

              {/* 2 Questions */}
              <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                {/* Question 1: Certification */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    1. Do you have any certification or formal course related to confinement or nursing care? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: true, label: 'Yes, I have certification / course' },
                      { val: false, label: 'No formal certification yet' }
                    ].map((item) => (
                      <button
                        key={String(item.val)}
                        type="button"
                        onClick={() => handleMatrixChange(item.val, formData.hasConfinementExperience ?? false)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.hasConfinementCertification === item.val
                            ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                            : 'border-cream-border bg-cream-light hover:bg-cream-dark/30 text-brown'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  {errors.hasConfinementCertification && (
                    <p className="text-xs text-maroon mt-1">{errors.hasConfinementCertification}</p>
                  )}
                </div>

                {/* Question 2: Experience */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    2. Do you have hands-on experience in confinement or mother/baby care? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: true, label: 'Yes, I have practical experience' },
                      { val: false, label: 'No hands-on experience yet' }
                    ].map((item) => (
                      <button
                        key={String(item.val)}
                        type="button"
                        onClick={() => handleMatrixChange(formData.hasConfinementCertification ?? false, item.val)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.hasConfinementExperience === item.val
                            ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                            : 'border-cream-border bg-cream-light hover:bg-cream-dark/30 text-brown'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  {errors.hasConfinementExperience && (
                    <p className="text-xs text-maroon mt-1">{errors.hasConfinementExperience}</p>
                  )}
                </div>
              </div>

              {/* Matched Pathway Spotlight Card */}
              <div className="bg-gradient-to-r from-gold-soft via-cream-light to-maroon-soft p-5 rounded-2xl border-2 border-gold/40 shadow-warm-sm space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-maroon">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Auto-Matched SEYOL Pathway</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-brown flex items-center space-x-2">
                      <span>{activePathway.icon}</span>
                      <span>{activePathway.title}</span>
                    </h4>
                    <div className="text-xs font-semibold text-maroon mt-0.5">{activePathway.subtitle}</div>
                    <p className="text-xs text-brown-muted mt-1 leading-relaxed">{activePathway.summary}</p>
                  </div>

                  <span className="text-[10px] bg-maroon text-cream-light font-bold px-2.5 py-1 rounded-full shrink-0">
                    {activePathway.badge}
                  </span>
                </div>

                {/* Pathway Course info if Pathway 1 or 2 */}
                {activePathway.courseId && (
                  <div className="bg-white/80 p-3 rounded-xl border border-gold-border text-xs space-y-1">
                    <strong className="text-maroon">Integrated In-Training Course: </strong>
                    <span className="text-brown">
                      {activePathway.courseId === 'course-foundation'
                        ? 'Foundation Confinement Care Training (Pathway 1)'
                        : 'Practical Confinement Care Training (Pathway 2)'}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
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
                  <span>Continue to Experience & Background</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: EXPERIENCE & BACKGROUND ================= */}
          {currentStep === 3 && !isSuccess && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 3 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Experience & Background</h3>
                <p className="text-xs text-brown-muted">
                  Details specific to <strong className="text-maroon">{activePathway.subtitle}</strong>.
                </p>
              </div>

              {/* Dynamic Form Content by Pathway */}
              {formData.chosenPathwayId === 'pathway-1-foundation' && (
                <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-brown">
                    What area are you most interested in learning? <span className="text-maroon">*</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Newborn care and handling',
                      'Newborn massage and bath',
                      'Confinement Nutrition',
                      'Breastfeeding and lactation',
                      'Postpartum massage, bath and wrap'
                    ].map((interest) => {
                      const isSelected = formData.p1LearningInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleArrayItem('p1LearningInterests', interest)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center space-x-2 transition-all ${
                            isSelected
                              ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20 font-bold'
                              : 'border-cream-border bg-cream-light hover:bg-cream-dark/30 text-brown'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-maroon text-cream-light border-maroon' : 'border-cream-border bg-white'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.p1LearningInterests && (
                    <p className="text-xs text-maroon">{errors.p1LearningInterests}</p>
                  )}
                </div>
              )}

              {formData.chosenPathwayId === 'pathway-2-practical' && (
                <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      What certification or course have you completed? <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. WSQ Postnatal Care Certificate / Nursing Diploma / St John Ambulance First Aid"
                      value={formData.p2CompletedCourse}
                      onChange={(e) => handleInputChange('p2CompletedCourse', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.p2CompletedCourse ? 'border-maroon' : 'border-cream-border'
                      }`}
                    />
                    {errors.p2CompletedCourse && <p className="text-xs text-maroon mt-1">{errors.p2CompletedCourse}</p>}
                  </div>

                  {/* Certificate Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Upload Your Certificate (PDF, PNG, JPG)
                    </label>
                    <div className="border-2 border-dashed border-gold-border rounded-xl p-4 text-center bg-white/70">
                      {formData.p2CertificateFile ? (
                        <div className="flex items-center justify-between bg-gold-soft p-2.5 rounded-lg border border-gold-border text-xs">
                          <div className="flex items-center space-x-2 text-maroon font-bold">
                            <FileCheck className="w-4 h-4" />
                            <span>{formData.p2CertificateFile}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInputChange('p2CertificateFile', null)}
                            className="text-brown-muted hover:text-maroon"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="w-6 h-6 text-gold-dark mx-auto mb-1" />
                          <span className="text-xs font-bold text-maroon">Click to select certificate file</span>
                          <p className="text-[10px] text-brown-muted mt-0.5">Maximum file size: 10MB</p>
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileUpload('p2CertificateFile', e)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      What area do you need more practice in? <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Newborn handling',
                        'Baby massage and bath',
                        'Confinement routine',
                        'Mother care',
                        'Night support',
                        'Cooking / meal preparation',
                        'Communication with families'
                      ].map((area) => {
                        const isSelected = formData.p2NeedPracticeAreas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleArrayItem('p2NeedPracticeAreas', area)}
                            className={`p-2.5 rounded-xl border text-xs text-left flex items-center space-x-2 transition-all ${
                              isSelected
                                ? 'border-maroon bg-maroon-soft text-maroon font-bold ring-1 ring-maroon/20'
                                : 'border-cream-border bg-white text-brown'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-maroon text-cream-light border-maroon' : 'border-cream-border'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="text-[11px] truncate">{area}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.p2NeedPracticeAreas && <p className="text-xs text-maroon mt-1">{errors.p2NeedPracticeAreas}</p>}
                  </div>
                </div>
              )}

              {formData.chosenPathwayId === 'pathway-3-experienced' && (
                <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                  {/* Years of Experience */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      Years of experience in confinement care <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Less than 1 year', '1–3 years', '3–5 years', 'More than 5 years'].map((yrs) => (
                        <button
                          key={yrs}
                          type="button"
                          onClick={() => handleInputChange('p3YearsExperience', yrs)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            formData.p3YearsExperience === yrs
                              ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                              : 'border-cream-border bg-white text-brown'
                          }`}
                        >
                          {yrs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Worked Countries */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      Have you worked as a confinement caregiver before? (Select all that apply) <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Yes, in Singapore', 'Yes, in Malaysia', 'Yes, in India', 'Yes, in another country'].map((c) => {
                        const isSelected = formData.p3WorkedCountries.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleArrayItem('p3WorkedCountries', c)}
                            className={`p-2.5 rounded-xl border text-xs text-left flex items-center space-x-2 transition-all ${
                              isSelected
                                ? 'border-maroon bg-maroon-soft text-maroon font-bold ring-1 ring-maroon/20'
                                : 'border-cream-border bg-white text-brown'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-maroon text-cream-light border-maroon' : 'border-cream-border'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span>{c}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.p3WorkedCountries && <p className="text-xs text-maroon mt-1">{errors.p3WorkedCountries}</p>}
                  </div>

                  {/* Number of families supported */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Number of families supported
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8 families, 15+ mothers"
                      value={formData.p3FamiliesSupported}
                      onChange={(e) => handleInputChange('p3FamiliesSupported', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  {/* Care Types Provided */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      What type of care have you provided? <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Stay-in confinement nanny',
                        'Daytime confinement care',
                        'Newborn care',
                        'Baby bath',
                        'Baby massage',
                        'Mother care',
                        'Cooking / confinement meals',
                        'Night support',
                        'Other'
                      ].map((type) => {
                        const isSelected = formData.p3CareTypesProvided.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleArrayItem('p3CareTypesProvided', type)}
                            className={`p-2 rounded-xl border text-xs text-left flex items-center space-x-2 transition-all ${
                              isSelected
                                ? 'border-maroon bg-maroon-soft text-maroon font-bold ring-1 ring-maroon/20'
                                : 'border-cream-border bg-white text-brown'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-maroon text-cream-light border-maroon' : 'border-cream-border'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="text-[11px] truncate">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.p3CareTypesProvided && <p className="text-xs text-maroon mt-1">{errors.p3CareTypesProvided}</p>}
                  </div>
                </div>
              )}

              {formData.chosenPathwayId === 'pathway-4-professional' && (
                <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                  {/* Years of Experience */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      Years of experience in confinement care <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Less than 1 year', '1–3 years', '3–5 years', 'More than 5 years'].map((yrs) => (
                        <button
                          key={yrs}
                          type="button"
                          onClick={() => handleInputChange('p4YearsExperience', yrs)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            formData.p4YearsExperience === yrs
                              ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                              : 'border-cream-border bg-white text-brown'
                          }`}
                        >
                          {yrs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Worked Countries */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      Where have you worked before? <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Singapore', 'Malaysia', 'India', 'Other'].map((country) => {
                        const isSelected = formData.p4WorkedCountries.includes(country);
                        return (
                          <button
                            key={country}
                            type="button"
                            onClick={() => toggleArrayItem('p4WorkedCountries', country)}
                            className={`p-2.5 rounded-xl border text-xs text-left flex items-center space-x-2 transition-all ${
                              isSelected
                                ? 'border-maroon bg-maroon-soft text-maroon font-bold ring-1 ring-maroon/20'
                                : 'border-cream-border bg-white text-brown'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-maroon text-cream-light border-maroon' : 'border-cream-border'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span>{country}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.p4WorkedCountries && <p className="text-xs text-maroon mt-1">{errors.p4WorkedCountries}</p>}
                  </div>

                  {/* Certification Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      What certification or course have you completed? <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Certified Postnatal Matron, Registered Nurse, Certified Doula"
                      value={formData.p4CompletedCourse}
                      onChange={(e) => handleInputChange('p4CompletedCourse', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.p4CompletedCourse ? 'border-maroon' : 'border-cream-border'
                      }`}
                    />
                    {errors.p4CompletedCourse && <p className="text-xs text-maroon mt-1">{errors.p4CompletedCourse}</p>}
                  </div>

                  {/* Upload Certificate */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                      Upload Your Certificate (PDF, PNG, JPG)
                    </label>
                    <div className="border-2 border-dashed border-gold-border rounded-xl p-4 text-center bg-white/70">
                      {formData.p4CertificateFile ? (
                        <div className="flex items-center justify-between bg-gold-soft p-2.5 rounded-lg border border-gold-border text-xs">
                          <div className="flex items-center space-x-2 text-maroon font-bold">
                            <FileCheck className="w-4 h-4" />
                            <span>{formData.p4CertificateFile}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInputChange('p4CertificateFile', null)}
                            className="text-brown-muted hover:text-maroon"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="w-6 h-6 text-gold-dark mx-auto mb-1" />
                          <span className="text-xs font-bold text-maroon">Click to select credential file</span>
                          <p className="text-[10px] text-brown-muted mt-0.5">Maximum file size: 10MB</p>
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileUpload('p4CertificateFile', e)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
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
                  <span>Continue to Work Interest</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 4: WORK INTEREST ================= */}
          {currentStep === 4 && !isSuccess && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 4 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Work Interest & Availability</h3>
                <p className="text-xs text-brown-muted">
                  Let us know your geographic preferences and assignment availability.
                </p>
              </div>

              <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                {/* Preferred Work Country */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    Which country would you prefer to work in? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Singapore', 'Malaysia', 'Both Singapore and Malaysia', 'Open to discuss'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleInputChange('preferredWorkCountry', c)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.preferredWorkCountry === c
                            ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                            : 'border-cream-border bg-white text-brown'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type of Work */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    What type of work are you interested in? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'Stay-in confinement nanny', title: 'Stay-in Confinement Nanny', desc: 'Full-time 24h household stay-in care during 28 or 40-day confinement period.' },
                      { id: 'Daytime confinement caregiver', title: 'Daytime Confinement Caregiver', desc: 'Scheduled daytime shifts (e.g. 8am to 6pm) supporting mother & baby.' }
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => handleInputChange('workTypeInterest', w.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          formData.workTypeInterest === w.id
                            ? 'border-gold bg-gold-soft ring-2 ring-gold/30 text-brown shadow-warm-sm'
                            : 'border-cream-border bg-white text-brown'
                        }`}
                      >
                        <div className="font-bold text-xs text-maroon">{w.title}</div>
                        <div className="text-[11px] text-brown-muted mt-0.5">{w.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability to Start */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    When are you available to start? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Immediately', 'Within 1 month', 'Within 3 months'].map((avail) => (
                      <button
                        key={avail}
                        type="button"
                        onClick={() => handleInputChange('availabilityStart', avail)}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          formData.availabilityStart === avail
                            ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                            : 'border-cream-border bg-white text-brown'
                        }`}
                      >
                        {avail}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                  <span>Continue to Motivation & Interview</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 5: MOTIVATION & INTERVIEW ================= */}
          {currentStep === 5 && !isSuccess && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 5 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Motivation & Interview</h3>
                <p className="text-xs text-brown-muted">
                  Share your passion for mother and baby care and indicate your interview availability.
                </p>
              </div>

              <div className="space-y-4 bg-cream p-5 rounded-2xl border border-cream-border">
                {/* Motivation Statement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                    Why are you interested in joining SEYOL? <span className="text-maroon">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what inspires you to care for postpartum mothers and infants, and what values you bring..."
                    value={formData.motivationStatement}
                    onChange={(e) => handleInputChange('motivationStatement', e.target.value)}
                    className={`w-full p-3.5 rounded-xl bg-white border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold ${
                      errors.motivationStatement ? 'border-maroon' : 'border-cream-border'
                    }`}
                  />
                  {errors.motivationStatement && <p className="text-xs text-maroon mt-1">{errors.motivationStatement}</p>}
                </div>

                {/* Interview Willingness */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                    Are you willing to attend an interview with SEYOL? <span className="text-maroon">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('willingToAttendInterview', true)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        formData.willingToAttendInterview === true
                          ? 'border-maroon bg-maroon-soft text-maroon ring-2 ring-maroon/20'
                          : 'border-cream-border bg-white text-brown'
                      }`}
                    >
                      Yes, I am willing to attend an interview
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('willingToAttendInterview', false)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        formData.willingToAttendInterview === false
                          ? 'border-maroon bg-maroon/10 text-maroon ring-2 ring-maroon/40'
                          : 'border-cream-border bg-white text-brown'
                      }`}
                    >
                      No
                    </button>
                  </div>

                  {/* Conditional Block Warning if "No" selected */}
                  {formData.willingToAttendInterview === false && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3.5 rounded-xl bg-maroon-soft border border-maroon/30 text-maroon text-xs flex items-start space-x-2"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-maroon" />
                      <div>
                        <strong>Unable to continue with form.</strong>
                        <p className="text-[11px] text-maroon-dark mt-0.5 leading-relaxed">
                          An interview is mandatory for all SEYOL caregiver pathways to verify care ethics, neonatal safety standards, and communication skills. Please select "Yes" if you wish to proceed.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {errors.willingToAttendInterview && (
                    <p className="text-xs text-maroon mt-1">{errors.willingToAttendInterview}</p>
                  )}
                </div>

                {/* Preferred Interview Timing (Only shown if Yes) */}
                {formData.willingToAttendInterview === true && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-2">
                      Preferred interview timing
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        'Weekday morning',
                        'Weekday afternoon',
                        'Weekday evening',
                        'Weekend',
                        'Flexible'
                      ].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleInputChange('preferredInterviewTiming', time)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.preferredInterviewTiming === time
                              ? 'border-gold bg-gold-soft text-maroon-dark ring-1 ring-gold font-bold'
                              : 'border-cream-border bg-white text-brown'
                          }`}
                        >
                          <span className="text-[11px]">{time}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Actions */}
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
                  disabled={formData.willingToAttendInterview === false}
                  className={`px-6 py-3 rounded-xl font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all ${
                    formData.willingToAttendInterview === false
                      ? 'bg-brown-muted/40 text-brown-muted cursor-not-allowed'
                      : 'bg-maroon hover:bg-maroon-dark text-cream-light hover:scale-[1.02]'
                  }`}
                >
                  <span>Continue to Consent</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 6: CONSENT ================= */}
          {currentStep === 6 && !isSuccess && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-maroon mb-1">Step 6 of 6</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brown">Review & Declarations</h3>
                <p className="text-xs text-brown-muted">
                  Please review and accept our caregiver recruitment and training acknowledgements.
                </p>
              </div>

              {/* Summary of Application */}
              <div className="bg-cream rounded-2xl p-4 border border-cream-border space-y-2 text-xs">
                <div className="font-serif font-bold text-brown pb-2 border-b border-cream-border">
                  Application Summary
                </div>
                <div className="grid grid-cols-2 gap-2 text-brown-muted">
                  <div><strong>Applicant:</strong> {formData.fullName} ({formData.age} yrs)</div>
                  <div><strong>WhatsApp:</strong> {formData.whatsappNumber}</div>
                  <div><strong>Country:</strong> {formData.countryOfResidence} ({formData.residencyStatus})</div>
                  <div><strong>Pathway:</strong> {activePathway.title}</div>
                </div>
              </div>

              {/* 3 Consent Checkboxes */}
              <div className="space-y-3">
                {/* 1. Application Acknowledgement */}
                <div className="p-4 rounded-2xl border border-cream-border bg-cream">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.applicationAcknowledgement}
                      onChange={(e) => handleInputChange('applicationAcknowledgement', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-brown">Application Acknowledgement *</div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I declare that all information submitted in this form is accurate, complete, and truthful. I understand that falsification of records may result in disqualification.
                      </p>
                    </div>
                  </label>
                  {errors.applicationAcknowledgement && (
                    <p className="text-[10px] text-maroon mt-1 ml-7">{errors.applicationAcknowledgement}</p>
                  )}
                </div>

                {/* 2. Training & Review Acknowledgement */}
                <div className="p-4 rounded-2xl border border-cream-border bg-cream">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.trainingReviewAcknowledgement}
                      onChange={(e) => handleInputChange('trainingReviewAcknowledgement', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-brown">Training & Review Acknowledgement *</div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I understand that admission to SEYOL assignments or training programs involves background screening, skills assessment, and adherence to SEYOL infant safety protocols.
                      </p>
                    </div>
                  </label>
                  {errors.trainingReviewAcknowledgement && (
                    <p className="text-[10px] text-maroon mt-1 ml-7">{errors.trainingReviewAcknowledgement}</p>
                  )}
                </div>

                {/* 3. Privacy Consent */}
                <div className="p-4 rounded-2xl border border-cream-border bg-cream">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-maroon rounded"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-brown">Privacy Consent *</div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">
                        I consent to SEYOL collecting, storing, and processing my personal data for recruitment, placement matching, and training coordination under Personal Data Protection guidelines.
                      </p>
                    </div>
                  </label>
                  {errors.privacyConsent && (
                    <p className="text-[10px] text-maroon mt-1 ml-7">{errors.privacyConsent}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
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
                  className="px-8 py-3.5 rounded-2xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream-light border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-light" />
                      <span>Submit SEYOL Application</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= SUCCESS CELEBRATION SCREEN ================= */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 text-maroon flex items-center justify-center mx-auto ring-8 ring-gold/10">
                <CheckCircle2 className="w-8 h-8 text-gold-dark" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-maroon bg-maroon-soft px-3 py-1 rounded-full border border-maroon/20">
                  Application Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown">
                  Welcome to SEYOL Academy, {formData.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
                  Your application for the <strong className="text-maroon">{activePathway.title} ({activePathway.subtitle})</strong> has been successfully submitted under Reference Code:
                </p>
                <div className="font-mono text-base font-extrabold text-maroon bg-cream px-4 py-2 rounded-xl border border-cream-border inline-block">
                  {appId}
                </div>
              </div>

              {/* Next Steps Box */}
              <div className="bg-cream rounded-3xl p-6 border border-cream-border max-w-xl mx-auto shadow-warm-md text-left space-y-3">
                <div className="font-serif font-bold text-sm text-brown">Next Steps in Your Journey:</div>
                <div className="space-y-2 text-xs text-brown-muted">
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span><strong>Admissions Review:</strong> Our academic team will evaluate your background within 48 hours.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span><strong>Interview Invitation:</strong> We will send a WhatsApp calendar link to schedule your preferred slot ({formData.preferredInterviewTiming}).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span><strong>Onboarding & Training Pack:</strong> Successful applicants will receive the SEYOL Caregiver Handbook and cohort timetable.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-cream-border bg-cream text-brown font-bold text-xs hover:bg-cream-dark transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
