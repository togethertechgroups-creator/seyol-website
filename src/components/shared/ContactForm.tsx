'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  X,
  ChevronDown,
  Sparkles,
  Heart,
  Baby,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  BookOpen,
  HelpCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  HELP_CATEGORIES,
  JOURNEY_STAGES,
  COUNTRY_OPTIONS,
  HelpCategoryName,
  SeyolCareEnquiry,
} from '../../types/enquiry';

interface SelectedOptionItem {
  category: HelpCategoryName;
  option: string;
}

interface ContactFormProps {
  className?: string;
  defaultCategory?: string;
}

const CATEGORY_ICONS: Record<HelpCategoryName, React.FC<{ className?: string }>> = {
  Services: Heart,
  Classes: GraduationCap,
  'SEY By SEYOL Products': ShoppingBag,
  'Careers & Training': Briefcase,
  Resources: BookOpen,
  'Other Enquiries': HelpCircle,
};

const CATEGORY_COLORS: Record<HelpCategoryName, { bg: string; text: string; border: string }> = {
  Services: { bg: 'bg-[#FAF0EB]', text: 'text-[#7B1131]', border: 'border-[#EAC8D2]' },
  Classes: { bg: 'bg-[#FFF8E7]', text: 'text-[#8C6D1F]', border: 'border-[#F0DC9D]' },
  'SEY By SEYOL Products': { bg: 'bg-[#F0F7F2]', text: 'text-[#2D6A4F]', border: 'border-[#B7E4C7]' },
  'Careers & Training': { bg: 'bg-[#F2F0FA]', text: 'text-[#5B4699]', border: 'border-[#D4CBE5]' },
  Resources: { bg: 'bg-[#EBF7F8]', text: 'text-[#1D6F78]', border: 'border-[#BCE4E8]' },
  'Other Enquiries': { bg: 'bg-[#F5F5F5]', text: 'text-[#4A4A4A]', border: 'border-[#E0E0E0]' },
};

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('+91');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [journeyStage, setJourneyStage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionItem[]>([]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Dropdown UI states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Submission UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SeyolCareEnquiry | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync country code when country selection changes (if empty or default)
  const handleCountryChange = (selectedCountryName: string) => {
    setCountry(selectedCountryName);
    const found = COUNTRY_OPTIONS.find((c) => c.name === selectedCountryName);
    if (found) {
      setWhatsappCountryCode(found.code);
    }
  };

  // Toggle option in multiple-select
  const toggleOption = (category: HelpCategoryName, option: string) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((item) => item.category === category && item.option === option);
      if (exists) {
        return prev.filter((item) => !(item.category === category && item.option === option));
      } else {
        return [...prev, { category, option }];
      }
    });
  };

  const removeOption = (category: HelpCategoryName, option: string) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => !(item.category === category && item.option === option))
    );
  };

  const clearAllOptions = () => {
    setSelectedOptions([]);
  };

  // Filter options based on search query
  const filteredCategories = HELP_CATEGORIES.map((cat) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return cat;

    const matchesCategoryName = cat.category.toLowerCase().includes(q);
    const matchingOptions = cat.options.filter(
      (opt) => opt.toLowerCase().includes(q) || matchesCategoryName
    );

    return {
      ...cat,
      options: matchingOptions,
    };
  }).filter((cat) => cat.options.length > 0);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Bot honeypot check
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    // 2. Client-side validation
    const cleanName = fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneDigits = whatsappNumber.replace(/[^\d]/g, '');
    if (!phoneDigits || phoneDigits.length < 6) {
      setErrorMessage('Please enter a valid WhatsApp phone number (minimum 6 digits).');
      return;
    }

    if (!country) {
      setErrorMessage('Please select your country of residence.');
      return;
    }

    if (!journeyStage) {
      setErrorMessage('Please select where you are in your journey.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: cleanName,
        email: cleanEmail,
        whatsappCountryCode,
        whatsappNumber: whatsappNumber.trim(),
        country,
        selectedHelpOptions: selectedOptions,
        journeyStage,
        message: message.trim(),
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setSubmittedData(data.enquiry);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Enquiry submission error:', err);
      setErrorMessage(err.message || 'Something went wrong while connecting with SEYOL. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppDirectLink = () => {
    const clientName = fullName.trim() || 'Parent';
    const topics = selectedOptions.map((o) => o.option).join(', ') || 'General Care';
    const text = encodeURIComponent(
      `Hello SEYOL Care Team! My name is ${clientName} (${journeyStage || 'New Parent'}). I just submitted an enquiry regarding: ${topics}. I would love to connect with your care coordinator.`
    );
    return `https://wa.me/919840000000?text=${text}`;
  };

  return (
    <div className={`w-full font-sans ${className}`}>
      <div className="relative rounded-3xl sm:rounded-[36px] bg-[#FAF6EE] border border-[#EAE1D5] shadow-warm-xl overflow-hidden p-6 sm:p-10 lg:p-12">
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#7B1131]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C8A45D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {!isSuccess ? (
            /* ========================================================================= */
            /* ENQUIRY FORM VIEW                                                         */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              
              {/* Form Header */}
              <div className="border-b border-[#EAE1D5]/80 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EB] border border-[#EAC8D2] text-[#7B1131] text-xs font-heading font-extrabold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>Personalised Guidance &amp; Consultation</span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#3A1D1D] tracking-tight">
                    Tell Us What Support You Need
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#55403D]">
                    Our senior care matrons and doulas will review your request and connect you with the appropriate SEYOL team within 2 to 4 business hours.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-[#EAE1D5] text-xs text-[#55403D] font-medium shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#7B1131]" />
                  <span>Confidential &amp; ACRA Registered</span>
                </div>
              </div>

              {/* Error Alert Banner */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-sans leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* Honeypot field (hidden from humans, traps bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_enquiry_website">Leave this empty</label>
                <input
                  id="hp_enquiry_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION A: ABOUT YOU                                              */}
              {/* ----------------------------------------------------------------- */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#7B1131] text-white text-xs font-heading font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D]">
                    About You
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="enquiry_full_name"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Full Name <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      id="enquiry_full_name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Deepika Sundaram"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:border-transparent transition-all shadow-2xs"
                    />
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="enquiry_email"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Email Address <span className="text-[#7B1131]">*</span>
                    </label>
                    <input
                      id="enquiry_email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. deepika@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:border-transparent transition-all shadow-2xs"
                    />
                  </div>

                  {/* Field 3: WhatsApp Number with Country Code */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="enquiry_whatsapp"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      WhatsApp Number <span className="text-[#7B1131]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-32 shrink-0">
                        <select
                          aria-label="WhatsApp Country Dialing Code"
                          value={whatsappCountryCode}
                          onChange={(e) => setWhatsappCountryCode(e.target.value)}
                          className="w-full px-3 py-3 rounded-xl bg-white border border-[#EAE1D5] text-xs sm:text-sm font-semibold text-[#3A1D1D] focus:outline-none focus:ring-2 focus:ring-[#7B1131] appearance-none cursor-pointer shadow-2xs"
                        >
                          {COUNTRY_OPTIONS.map((c) => (
                            <option key={`${c.name}-${c.code}`} value={c.code}>
                              {c.code} ({c.name})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-[#7B1131] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      <input
                        id="enquiry_whatsapp"
                        type="tel"
                        required
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="e.g. 98401 22334"
                        className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:border-transparent transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Field 4: Country of Residence */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="enquiry_country"
                      className="block text-xs font-heading font-bold text-[#3A1D1D]"
                    >
                      Country of Residence <span className="text-[#7B1131]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="enquiry_country"
                        required
                        value={country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#EAE1D5] text-sm text-[#3A1D1D] focus:outline-none focus:ring-2 focus:ring-[#7B1131] appearance-none cursor-pointer shadow-2xs"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7B1131] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION B: WHAT WOULD YOU LIKE HELP WITH? (Searchable Multi-Select) */}
              {/* ----------------------------------------------------------------- */}
              <div className="space-y-4" ref={dropdownRef}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#7B1131] text-white text-xs font-heading font-bold flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D]">
                      What Would You Like Help With?
                    </h4>
                  </div>
                  <span className="text-xs text-[#55403D]/70 font-sans italic">
                    Select one or multiple across services, classes, products, and resources
                  </span>
                </div>

                {/* Dropdown Trigger Box */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full min-h-[50px] p-3 rounded-2xl bg-white border text-left transition-all flex items-center justify-between gap-3 shadow-2xs cursor-pointer ${
                      isDropdownOpen
                        ? 'border-[#7B1131] ring-2 ring-[#7B1131]/20'
                        : 'border-[#EAE1D5] hover:border-[#7B1131]/50'
                    }`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                  >
                    <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
                      {selectedOptions.length === 0 ? (
                        <span className="text-sm text-[#55403D]/60 font-sans px-1">
                          Click to browse and search support topics (Services, Classes, Products, Careers, Resources)...
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-heading font-bold text-[#7B1131] bg-[#FAF0EB] border border-[#EAC8D2] px-2.5 py-1 rounded-full">
                            {selectedOptions.length} option{selectedOptions.length > 1 ? 's' : ''} selected
                          </span>
                          <span className="text-xs text-[#55403D]/70 font-sans hidden sm:inline">
                            (click to modify selection)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedOptions.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearAllOptions();
                          }}
                          className="text-xs text-[#7B1131] hover:underline font-semibold px-2 py-1 rounded-lg hover:bg-[#FAF0EB] transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-[#7B1131] transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Dropdown Panel */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl bg-white border border-[#EAE1D5] shadow-warm-xl overflow-hidden animate-fadeIn">
                      {/* Search Bar & Controls */}
                      <div className="p-3 sm:p-4 bg-[#FAF6EE] border-b border-[#EAE1D5] flex items-center gap-2">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-[#7B1131] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type to filter options (e.g. infant massage, doula, meal planner, bundles)..."
                            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#EAE1D5] text-xs sm:text-sm text-[#3A1D1D] placeholder:text-[#55403D]/50 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                            autoFocus
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#55403D]/60 hover:text-[#3A1D1D]"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {selectedOptions.length > 0 && (
                          <button
                            type="button"
                            onClick={clearAllOptions}
                            className="text-xs font-semibold text-[#7B1131] hover:underline px-2.5 py-2 shrink-0"
                          >
                            Clear ({selectedOptions.length})
                          </button>
                        )}
                      </div>

                      {/* Grouped Options Scrollable Area */}
                      <div className="max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-[#EAE1D5]/60 p-2 sm:p-3 overscroll-contain">
                        {filteredCategories.length === 0 ? (
                          <div className="p-6 text-center text-xs text-[#55403D]">
                            No matching care options found for &ldquo;{searchQuery}&rdquo;.
                          </div>
                        ) : (
                          filteredCategories.map((group) => {
                            const Icon = CATEGORY_ICONS[group.category] || HelpCircle;
                            const colors = CATEGORY_COLORS[group.category];

                            return (
                              <div key={group.category} className="py-3 first:pt-1 last:pb-1">
                                {/* Category Header */}
                                <div className="px-2 pb-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-5 h-5 rounded-md ${colors.bg} ${colors.text} flex items-center justify-center`}
                                    >
                                      <Icon className="w-3 h-3" />
                                    </div>
                                    <span className="font-heading font-extrabold text-xs text-[#3A1D1D] tracking-wide">
                                      {group.category}
                                    </span>
                                  </div>
                                  {group.description && (
                                    <span className="text-[10px] text-[#55403D]/60 hidden md:inline">
                                      {group.description}
                                    </span>
                                  )}
                                </div>

                                {/* Options List */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                                  {group.options.map((opt) => {
                                    const isSelected = selectedOptions.some(
                                      (item) => item.category === group.category && item.option === opt
                                    );

                                    return (
                                      <label
                                        key={opt}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleOption(group.category, opt);
                                        }}
                                        className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer transition-all ${
                                          isSelected
                                            ? `${colors.bg} ${colors.text} font-bold border ${colors.border}`
                                            : 'hover:bg-[#FAF6EE] text-[#3A1D1D] border border-transparent'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => {}} // handled by label click
                                          className="h-3.5 w-3.5 rounded border-[#EAE1D5] text-[#7B1131] focus:ring-[#7B1131]"
                                        />
                                        <span className="leading-snug select-none">{opt}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Dropdown Footer Action */}
                      <div className="p-3 bg-[#FAF6EE] border-t border-[#EAE1D5] flex items-center justify-between">
                        <span className="text-xs text-[#55403D]">
                          {selectedOptions.length === 0
                            ? 'Tip: You can select multiple items across any categories.'
                            : `${selectedOptions.length} item${selectedOptions.length > 1 ? 's' : ''} chosen.`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-4 py-1.5 rounded-full bg-[#7B1131] text-white text-xs font-heading font-bold shadow-2xs hover:bg-[#5A0C24] transition-colors"
                        >
                          Done Selecting
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Display Selected Items as Removable Chips / Tags */}
                {selectedOptions.length > 0 && (
                  <div className="pt-1 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-[11px] font-heading font-bold text-[#7B1131] uppercase tracking-wider">
                      <span>Selected Care Topics ({selectedOptions.length}):</span>
                      <button
                        type="button"
                        onClick={clearAllOptions}
                        className="text-[11px] text-[#55403D]/70 hover:text-[#7B1131] underline cursor-pointer"
                      >
                        Remove all
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedOptions.map((item) => {
                        const colors = CATEGORY_COLORS[item.category];
                        return (
                          <span
                            key={`${item.category}-${item.option}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shadow-2xs transition-all ${colors.bg} ${colors.text} ${colors.border}`}
                          >
                            <span className="text-[10px] font-heading font-extrabold uppercase opacity-80">
                              {item.category}:
                            </span>
                            <span>{item.option}</span>
                            <button
                              type="button"
                              onClick={() => removeOption(item.category, item.option)}
                              className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                              aria-label={`Remove ${item.option}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION C: WHERE ARE YOU IN YOUR JOURNEY?                          */}
              {/* ----------------------------------------------------------------- */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#7B1131] text-white text-xs font-heading font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D]">
                    Where Are You in Your Journey? <span className="text-[#7B1131]">*</span>
                  </h4>
                </div>

                {/* Radio Cards for Stages */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {JOURNEY_STAGES.map((stage) => {
                    const isSelected = journeyStage === stage;
                    return (
                      <label
                        key={stage}
                        onClick={() => setJourneyStage(stage)}
                        className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 shadow-2xs ${
                          isSelected
                            ? 'bg-white border-[#7B1131] ring-2 ring-[#7B1131]/20 text-[#7B1131] font-bold'
                            : 'bg-white/70 border-[#EAE1D5] hover:bg-white text-[#3A1D1D]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="journey_stage"
                          checked={isSelected}
                          onChange={() => setJourneyStage(stage)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center mb-0.5 ${
                            isSelected
                              ? 'border-[#7B1131] bg-[#7B1131]'
                              : 'border-[#C4B2A8]'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs leading-snug select-none">{stage}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION D: HOW CAN WE HELP? (Optional Multiline Textarea)         */}
              {/* ----------------------------------------------------------------- */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#7B1131] text-white text-xs font-heading font-bold flex items-center justify-center">
                      4
                    </span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D]">
                      How Can We Help?
                    </h4>
                  </div>
                  <span className="text-xs text-[#55403D]/60 font-sans italic">Optional</span>
                </div>

                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a little more about what you are looking for or any questions you have."
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#EAE1D5] text-sm text-[#3A1D1D] placeholder:text-[#55403D]/40 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:border-transparent transition-all shadow-2xs leading-relaxed"
                />
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* SUBMIT BUTTON & TRUST FOOTER                                      */}
              {/* ----------------------------------------------------------------- */}
              <div className="pt-2 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-sm sm:text-base tracking-wide shadow-warm-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Connecting You With SEYOL...</span>
                    </>
                  ) : (
                    <>
                      <span>Connect Me With SEYOL</span>
                      <ArrowRight className="w-4 h-4 text-[#E8C574]" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#55403D]/80 text-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#7B1131]" />
                    <span>Directly routed to SEYOL Clinical &amp; Care Coordination Team</span>
                  </span>
                  <span>•</span>
                  <span>Response time: 2–4 business hours</span>
                </div>
              </div>

            </form>
          ) : (
            /* ========================================================================= */
            /* SUCCESS CONFIRMATION VIEW                                                 */
            /* ========================================================================= */
            <div className="text-center py-8 sm:py-12 space-y-6 animate-fadeIn max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#FAF0EB] text-[#7B1131] border-2 border-[#EAC8D2] flex items-center justify-center mx-auto shadow-warm-md">
                <CheckCircle2 className="w-10 h-10 text-[#7B1131]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0EB] border border-[#EAC8D2] text-[#7B1131] text-xs font-heading font-extrabold uppercase tracking-wider">
                  <span>Enquiry Dispatched Successfully</span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#3A1D1D] tracking-tight">
                  Thank You, {fullName.trim() || 'Parent'}!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#55403D] leading-relaxed max-w-lg mx-auto">
                  We have received your enquiry (ID: <strong className="text-[#7B1131] font-mono">{submittedData?.id || 'NEW'}</strong>).
                  Our senior care matrons and education coordinators are reviewing your preferences and will reach out via WhatsApp at{' '}
                  <strong className="text-[#7B1131]">{submittedData?.whatsappFull || whatsappNumber}</strong> and email at{' '}
                  <strong className="text-[#7B1131]">{email}</strong>.
                </p>
              </div>

              {/* Summary of What Was Requested */}
              {selectedOptions.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE1D5] text-left space-y-2">
                  <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#7B1131]">
                    Topics You Requested Assistance With:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOptions.map((item) => (
                      <span
                        key={item.option}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF6EE] text-[#3A1D1D] text-xs border border-[#EAE1D5]"
                      >
                        {item.option}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions: Instant WhatsApp Follow-up & Submit Another */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppDirectLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-xs sm:text-sm shadow-warm-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFullName('');
                    setEmail('');
                    setWhatsappNumber('');
                    setSelectedOptions([]);
                    setMessage('');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-[#EAE1D5] hover:bg-[#FAF6EE] text-[#3A1D1D] font-heading font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
