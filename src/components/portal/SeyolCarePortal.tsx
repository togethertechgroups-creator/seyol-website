'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  CheckSquare,
  FileSpreadsheet,
  Bell,
  GraduationCap,
  BookOpen,
  FileText,
  HelpCircle,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Heart,
  Send,
  Plus,
  Trash2,
  Check,
  X,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  DollarSign,
  Video,
  Star,
  RefreshCw,
  Mail,
  LogOut,
  Lock
} from 'lucide-react';
import { mockClientPortals } from '../../data/portalData';
import { usePortalData } from '../../context/PortalDataContext';
import { useAuth, PRECONFIGURED_CLIENTS } from '../../context/AuthContext';
import { 
  ClientPortalProfile, 
  CareAppointment, 
  CareInvoice, 
  PreparationItem, 
  SCNWeeklyCheckIn, 
  PortalMessage, 
  PortalMessageType,
  CalendarEventType
} from '../../types';

interface SeyolCarePortalProps {
  initialClientId?: string;
  isAdminView?: boolean;
}

export const SeyolCarePortal: React.FC<SeyolCarePortalProps> = ({
  initialClientId = 'usr_seyol_8819',
  isAdminView = false
}) => {
  const { isAuthenticated, user, login, loginAsClient, logout } = useAuth();
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Live Clock
  const [currentTime, setCurrentTime] = useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(
    !isAdminView && user?.id ? user.id : initialClientId
  );
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'calendar'
    | 'invoices'
    | 'preparation'
    | 'scn_checkin'
    | 'messages'
    | 'classes'
    | 'resources'
    | 'documents'
    | 'support'
  >('dashboard');

  const { allClientData, updateClientData: persistClientUpdate } = usePortalData();

  const [clientData, setClientData] = useState<ClientPortalProfile>(
    allClientData[selectedClientId] || mockClientPortals['usr_seyol_8819']
  );

  // Sync clientData from shared context whenever selectedClientId or allClientData changes
  React.useEffect(() => {
    const fresh = allClientData[selectedClientId];
    if (fresh) setClientData(fresh);
  }, [selectedClientId, allClientData]);

  // Sync with auth user on mount/update
  React.useEffect(() => {
    if (!isAdminView && user?.id) {
      setSelectedClientId(user.id);
    }
  }, [user, isAdminView]);

  // Switch client
  const handleClientChange = (newId: string) => {
    setSelectedClientId(newId);
    if (!isAdminView) {
      loginAsClient(newId);
    }
  };

  // Calendar Category Filter
  const [calendarFilter, setCalendarFilter] = useState<string>('all');

  // Preparation Item Toggle
  const togglePrepItem = (itemId: string) => {
    setClientData((prev) => ({
      ...prev,
      preparationItems: prev.preparationItems.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    }));
  };

  // Add Custom Preparation Item
  const [newPrepText, setNewPrepText] = useState('');
  const handleAddPrepItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrepText.trim()) return;
    const newItem: PreparationItem = {
      id: `prep-custom-${Date.now()}`,
      category: 'mother_comfort',
      title: newPrepText.trim(),
      description: 'Custom preparation note added by family.',
      isCompleted: false,
      essentialLevel: 'recommended'
    };
    setClientData((prev) => ({
      ...prev,
      preparationItems: [...prev.preparationItems, newItem]
    }));
    setNewPrepText('');
  };

  // SCN Weekly Check-In Form State
  const [scnForm, setScnForm] = useState<Partial<SCNWeeklyCheckIn>>({
    weekNumber: 4,
    babyFeedingFrequency: '8–9 feeds daily',
    babySleepAverage: '14–15 hours',
    babyWeightMilestone: '4.1 kg',
    diaperCountDaily: '8 wet nappies',
    cordHealingStatus: 'separated_clean',
    motherRecoveryScore: 9,
    motherEnergyLevel: 'energetic',
    lochiaBleedingStatus: 'minimal',
    abdominalPainScore: 1,
    nannyCareRating: 5,
    mealsFeedback: 'Traditional pathiya soups and herbal legiyams are highly restorative.',
    nannyPunctuality: 'excellent',
    dietaryAdjustments: 'Adding more drumstick leaf kootu and warm cumin water.',
    specialRequestsOrNotes: 'Kattu belly wrap feels light and very supportive.'
  });
  const [scnSubmittedSuccess, setScnSubmittedSuccess] = useState(false);

  const handleScnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCheckIn: SCNWeeklyCheckIn = {
      id: `scn-checkin-wk${scnForm.weekNumber || 4}-${Date.now()}`,
      weekNumber: scnForm.weekNumber || 4,
      dateSubmitted: new Date().toISOString().split('T')[0],
      babyFeedingFrequency: scnForm.babyFeedingFrequency || '8 feeds/day',
      babySleepAverage: scnForm.babySleepAverage || '14 hours',
      babyWeightMilestone: scnForm.babyWeightMilestone || '4.1 kg',
      diaperCountDaily: scnForm.diaperCountDaily || '8 wet nappies',
      cordHealingStatus: scnForm.cordHealingStatus as any || 'separated_clean',
      motherRecoveryScore: scnForm.motherRecoveryScore || 9,
      motherEnergyLevel: scnForm.motherEnergyLevel as any || 'energetic',
      lochiaBleedingStatus: scnForm.lochiaBleedingStatus as any || 'minimal',
      abdominalPainScore: scnForm.abdominalPainScore || 1,
      nannyCareRating: scnForm.nannyCareRating || 5,
      mealsFeedback: scnForm.mealsFeedback || 'Excellent nourishment',
      nannyPunctuality: scnForm.nannyPunctuality as any || 'excellent',
      dietaryAdjustments: scnForm.dietaryAdjustments || '',
      specialRequestsOrNotes: scnForm.specialRequestsOrNotes || '',
      matronReviewed: false
    };

    setClientData((prev) => ({
      ...prev,
      scnCheckIns: [newCheckIn, ...prev.scnCheckIns]
    }));
    setScnSubmittedSuccess(true);
    setTimeout(() => setScnSubmittedSuccess(false), 5000);
  };

  // Messages Filter & Read Toggle
  const [messageFilter, setMessageFilter] = useState<string>('all');
  const toggleMessageRead = (msgId: string) => {
    setClientData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === msgId ? { ...m, isRead: true } : m))
    }));
  };

  // Online Pay Balance Modal Simulation
  const [payingInvoice, setPayingInvoice] = useState<CareInvoice | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);

  const handlePayInvoice = () => {
    if (!payingInvoice) return;
    setClientData((prev) => ({
      ...prev,
      invoices: prev.invoices.map((inv) =>
        inv.id === payingInvoice.id
          ? {
              ...inv,
              paidAmount: inv.totalAmount,
              balanceDue: 0,
              status: 'paid',
              receiptNumber: `RCPT-${Math.floor(100000 + Math.random() * 900000)}`
            }
          : inv
      )
    }));
    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
      setPayingInvoice(null);
    }, 2000);
  };

  // Completed items count in preparation list
  const completedPrepCount = clientData.preparationItems.filter((i) => i.isCompleted).length;
  const totalPrepCount = clientData.preparationItems.length;
  const prepPercentage = Math.round((completedPrepCount / (totalPrepCount || 1)) * 100);

  const unreadMessageCount = clientData.messages.filter((m) => !m.isRead).length;

  const navModules = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'calendar', label: 'My Care Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices & Payments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'preparation', label: 'Preparation List', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'scn_checkin', label: 'SCN Weekly Check-In', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { 
      id: 'messages', 
      label: 'Messages & Updates', 
      icon: <Bell className="w-4 h-4" />,
      badge: unreadMessageCount > 0 ? unreadMessageCount : undefined 
    },
    { id: 'classes', label: 'My Classes', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'resources', label: 'My Resources', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents & Consent', icon: <FileText className="w-4 h-4" /> },
    { id: 'support', label: 'Support', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // If customer is logged out, show dedicated Care Portal Login Screen
  if (!isAdminView && (!isAuthenticated || !user)) {
    return (
      <div className="w-full min-h-screen bg-[#F5EFE8] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn border border-cream-border">

          {/* Left Panel — Brand */}
          <div className="bg-[#7B1131] flex flex-col items-center justify-center p-10 sm:p-14 text-center relative overflow-hidden">
            {/* Background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Logo */}
            <div className="relative z-10 w-28 h-28 mb-6 drop-shadow-xl">
              <Image
                src="/assets4/Logo - Transparent Logo copy.png"
                alt="SEYOL Logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>

            <div className="relative z-10 space-y-3">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream-light leading-snug">
                My SEYOL<br />Care Portal
              </h1>
              <p className="text-xs text-cream-light/70 leading-relaxed max-w-xs mx-auto">
                Your personal space for appointments, care updates, invoices, and your postpartum journey.
              </p>
            </div>

            {/* Bottom features list */}
            <div className="relative z-10 mt-8 space-y-2 text-left w-full max-w-xs">
              {[
                'Upcoming Appointments & Sessions',
                'Active Package & Care Progress',
                'Invoices, Receipts & Payments',
                'Messages & SEYOL Updates',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2.5 text-xs text-cream-light/80">
                  <div className="w-4 h-4 rounded-full bg-gold/30 border border-gold/40 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-gold-light" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel — Login Form */}
          <div className="bg-white flex flex-col justify-center p-8 sm:p-12">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-brown">Welcome back</h2>
              <p className="text-xs text-brown-muted mt-1">Sign in to access your care journey</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!loginIdentifier.trim()) {
                  setLoginError('Please enter your email address or WhatsApp number');
                  return;
                }
                login(loginIdentifier, loginPassword);
              }}
              className="space-y-5"
            >
              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brown-muted mb-2">
                  Registered Email or Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                  <input
                    type="text"
                    placeholder="ananya.r@example.com / +91 98400..."
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-cream-border text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brown-muted">
                    Password
                  </label>
                  <span className="text-[10px] text-maroon font-semibold cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                  <input
                    type="password"
                    placeholder="Enter your passcode"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-cream-border text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7B1131] hover:bg-maroon-dark text-cream-light font-bold text-sm shadow-warm-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] mt-2"
              >
                <span>Sign In to My Portal</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>

              <p className="text-center text-[11px] text-brown-muted pt-2">
                Having trouble signing in?{' '}
                <a href="https://wa.me/919840012345" className="text-maroon font-bold hover:underline" target="_blank" rel="noopener noreferrer">
                  WhatsApp SEYOL
                </a>
              </p>
            </form>

            {/* Powered by */}
            <div className="mt-8 pt-5 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 tracking-wide">
                Powered by{' '}
                <a
                  href="https://togethertechgroups.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 font-semibold hover:text-maroon transition-colors hover:underline"
                >
                  Together Tech Groups
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className={
        isAdminView
          ? 'w-full bg-cream-light border border-cream-border rounded-3xl shadow-warm-lg font-sans text-brown relative'
          : 'w-full h-screen overflow-hidden bg-cream-light font-sans text-brown relative flex flex-col'
      }
    >
      {/* Top Header Bar */}
      <div
        className={`bg-white ${
          isAdminView
            ? 'p-3 sm:p-4 rounded-t-[23px] border-b border-cream-border'
            : 'shrink-0 px-4 sm:px-8 py-2 sm:py-2.5 border-b border-cream-border shadow-sm z-30'
        } flex flex-col md:flex-row md:items-center justify-between gap-3`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/assets4/Logo - Transparent Logo copy.png"
              alt="SEYOL Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              {isAdminView && (
                <span className="text-[10px] font-bold uppercase bg-maroon/10 text-maroon px-2 py-0.5 rounded-full border border-maroon/20">
                  Admin Management View
                </span>
              )}
            </div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-brown leading-tight">
              My SEYOL Care Portal
            </h1>
          </div>
        </div>

        {/* Client Profile / Log Out */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          {/* Date & Time — right side */}
          <div className="hidden md:flex flex-col items-end pr-2 border-r border-cream-border">
            <div className="text-sm font-bold text-brown tabular-nums tracking-tight leading-none">
              {formattedTime}
            </div>
            <div className="text-[10px] text-brown-muted font-medium mt-0.5">
              {formattedDate} • IST
            </div>
          </div>
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold shrink-0">
            <Image
              src={clientData.avatar}
              alt={clientData.clientName}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Admin switcher only */}
          {isAdminView && (
            <select
              value={selectedClientId}
              onChange={(e) => handleClientChange(e.target.value)}
              className="bg-white text-brown text-[11px] font-semibold py-1 px-2 rounded-lg border border-cream-border focus:outline-none cursor-pointer"
              title="Switch Client Portal Profile"
            >
              <option value="usr_seyol_8819">Ananya R. (Postpartum)</option>
              <option value="usr_seyol_9921">Priya S. (Prenatal SG)</option>
            </select>
          )}

          {!isAdminView && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg bg-cream-dark hover:bg-cream-border text-brown text-[11px] font-bold transition-colors border border-cream-border"
              title="Log Out of Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Sticky Sidebar Tabs + Module Content */}
      <div
        className={
          isAdminView
            ? 'grid grid-cols-1 lg:grid-cols-12 min-h-[680px] items-start w-full'
            : 'flex-1 flex flex-col lg:flex-row overflow-hidden w-full'
        }
      >
        {/* Sidebar Nav */}
        <div
          className={
            isAdminView
              ? 'lg:col-span-3 bg-[#FAF7F2] p-4 border-b lg:border-b-0 lg:border-r border-cream-border space-y-1.5 flex lg:flex-col gap-1 lg:gap-1.5 overflow-x-auto lg:overflow-visible lg:sticky lg:top-20 lg:rounded-bl-[23px] self-start z-20'
              : 'w-full lg:w-64 xl:w-72 shrink-0 bg-[#FAF7F2] p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-cream-border space-y-1.5 flex lg:flex-col gap-1 lg:gap-1.5 overflow-x-auto lg:overflow-y-auto h-auto lg:h-full z-20 select-none'
          }
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-brown-muted px-3 py-1 hidden lg:block">
            Portal Navigation
          </div>

          {navModules.map((mod) => {
            const isActive = activeTab === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink text-left ${
                  isActive
                    ? 'bg-maroon text-cream-light shadow-warm-sm font-extrabold'
                    : 'text-brown hover:bg-cream-dark/50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={isActive ? 'text-gold-light' : 'text-maroon'}>{mod.icon}</span>
                  <span className="whitespace-nowrap">{mod.label}</span>
                </div>
                {mod.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-gold text-maroon-dark' : 'bg-maroon text-cream-light'
                    }`}
                  >
                    {mod.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-cream-border hidden lg:block text-[11px] text-brown-muted px-3">
            <div className="font-bold text-maroon">SEYOL Care Concierge</div>
            <div className="mt-0.5">24/7 Matron Hotline</div>
            <a
              href="https://wa.me/919840012345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-green-700 font-bold mt-2 hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Matron Desk</span>
            </a>
          </div>
        </div>

        {/* Module Content Area */}
        <div
          className={
            isAdminView
              ? 'lg:col-span-9 p-6 sm:p-8 bg-cream-light lg:rounded-br-[23px]'
              : 'flex-1 h-full overflow-y-auto p-5 sm:p-8 lg:p-10 bg-cream-light w-full scroll-smooth'
          }
        >
          {/* ========================================================
              MODULE 1: DASHBOARD
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Client Greeting & Stage Banner */}
              <div className="bg-gradient-to-r from-cream to-maroon-soft p-5 rounded-3xl border border-cream-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-maroon">
                    Active Care Journey
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-brown mt-0.5">
                    Welcome back, {clientData.clientName.split(' ')[0]}
                  </h2>
                  <p className="text-xs text-brown-muted mt-1">
                    {clientData.babyNameOrEdd} • {clientData.location}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gold/20 text-maroon font-bold px-3 py-1.5 rounded-full border border-gold-border">
                    {clientData.activePackage.status === 'in-progress' ? 'Care in Progress' : 'Confirmed'}
                  </span>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="px-3.5 py-1.5 bg-maroon text-cream-light text-xs font-bold rounded-full hover:bg-maroon-dark transition-colors flex items-center space-x-1"
                  >
                    <span>View Calendar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2-Column Core Stats: Upcoming Appointment & Active Package */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Upcoming Appointment Card */}
                <div className="bg-cream p-6 rounded-3xl border border-cream-border space-y-4 shadow-warm-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-maroon bg-maroon-soft px-2.5 py-0.5 rounded-full">
                        Upcoming Appointment
                      </span>
                      <span className="text-xs font-bold text-green-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-brown leading-snug">
                      {clientData.upcomingAppointment.serviceTitle}
                    </h3>

                    <div className="space-y-1.5 text-xs text-brown-muted pt-1">
                      <div className="flex items-center space-x-2 text-brown font-semibold">
                        <Clock className="w-3.5 h-3.5 text-maroon shrink-0" />
                        <span>{clientData.upcomingAppointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                        <span>{clientData.upcomingAppointment.date} (Session {clientData.upcomingAppointment.sessionNumber} of {clientData.upcomingAppointment.totalSessions})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-maroon shrink-0" />
                        <span>{clientData.upcomingAppointment.format} Format • {clientData.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Matron */}
                  <div className="pt-3 border-t border-cream-border flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold">
                        <Image
                          src={clientData.upcomingAppointment.assignedMatron.avatar}
                          alt={clientData.upcomingAppointment.assignedMatron.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-brown">{clientData.upcomingAppointment.assignedMatron.name}</div>
                        <div className="text-[10px] text-brown-muted">{clientData.upcomingAppointment.assignedMatron.role}</div>
                      </div>
                    </div>

                    <a
                      href={`tel:${clientData.upcomingAppointment.assignedMatron.phone}`}
                      className="p-2 rounded-xl bg-gold-soft text-maroon hover:bg-gold transition-colors"
                      title="Call Matron"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Active Package & Sessions Completed / Remaining */}
                <div className="bg-cream p-6 rounded-3xl border border-cream-border space-y-4 shadow-warm-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-maroon bg-gold/20 px-2.5 py-0.5 rounded-full">
                        Active Care Package
                      </span>
                      <span className="text-xs font-bold text-maroon">
                        {clientData.activePackage.completedSessions} / {clientData.activePackage.totalSessions} Sessions
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-brown">
                      {clientData.activePackage.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-cream-border h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-maroon h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(clientData.activePackage.completedSessions / clientData.activePackage.totalSessions) * 100}%`
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-brown-muted">
                        <span>{clientData.activePackage.completedSessions} Sessions Completed</span>
                        <span>
                          {clientData.activePackage.totalSessions - clientData.activePackage.completedSessions} Remaining
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Status Quick Card */}
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-cream-border flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-brown-muted">Pending Balance</div>
                      <div className="font-serif font-bold text-maroon text-sm">
                        {clientData.invoices.find((i) => i.status === 'pending_milestone')
                          ? `₹${clientData.invoices.find((i) => i.status === 'pending_milestone')?.balanceDue.toLocaleString()}`
                          : '₹0 (All Settled)'}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="px-3 py-1.5 rounded-xl bg-gold text-maroon-dark font-bold text-[11px] hover:bg-gold-light transition-colors"
                    >
                      View Invoices
                    </button>
                  </div>
                </div>
              </div>

              {/* Latest Session Update from Matron & Preparation Status */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Latest Session Update (8 cols) */}
                <div className="md:col-span-7 bg-cream p-6 rounded-3xl border border-cream-border space-y-3 shadow-warm-sm">
                  <div className="flex items-center justify-between border-b border-cream-border pb-3">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-maroon" />
                      <span className="font-serif font-bold text-sm text-brown">Latest Session Update from Matron</span>
                    </div>
                    <span className="text-[10px] text-brown-muted font-semibold">{clientData.latestSessionUpdate.date}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-brown font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-cream-border">
                      "{clientData.latestSessionUpdate.notes}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="bg-gold-soft p-2.5 rounded-xl border border-gold-border">
                        <strong className="text-maroon">Recovery Progress: </strong>
                        <span className="text-brown">{clientData.latestSessionUpdate.recoveryProgress}</span>
                      </div>
                      <div className="bg-maroon-soft p-2.5 rounded-xl border border-maroon/20">
                        <strong className="text-maroon">Recommendation: </strong>
                        <span className="text-brown">{clientData.latestSessionUpdate.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preparation Item List Glance (5 cols) */}
                <div className="md:col-span-5 bg-cream p-6 rounded-3xl border border-cream-border space-y-3 shadow-warm-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-brown flex items-center space-x-1.5">
                        <CheckSquare className="w-4 h-4 text-gold-dark" />
                        <span>Preparation Checklist</span>
                      </span>
                      <span className="text-xs font-bold text-maroon">{prepPercentage}% Ready</span>
                    </div>

                    <p className="text-[11px] text-brown-muted">
                      {completedPrepCount} of {totalPrepCount} items ready for today's session.
                    </p>

                    {/* Mini Check items */}
                    <div className="space-y-1.5 pt-1">
                      {clientData.preparationItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => togglePrepItem(item.id)}
                          className="flex items-center space-x-2 text-xs cursor-pointer p-1.5 rounded-lg hover:bg-white/60 transition-colors"
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              item.isCompleted
                                ? 'bg-maroon text-cream-light border-maroon'
                                : 'border-cream-border bg-white'
                            }`}
                          >
                            {item.isCompleted && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`text-[11px] truncate ${item.isCompleted ? 'line-through text-brown-muted' : 'text-brown font-medium'}`}>
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('preparation')}
                    className="w-full py-2 bg-cream-dark text-brown font-bold text-xs rounded-xl hover:bg-cream-border transition-colors text-center"
                  >
                    Open Full Checklist ({totalPrepCount} items)
                  </button>
                </div>
              </div>

              {/* Next Step from SEYOL Roadmap Banner */}
              <div className="bg-gradient-to-r from-gold-soft via-cream to-maroon-soft p-5 rounded-3xl border border-gold-border flex items-start space-x-3.5 shadow-warm-sm">
                <div className="w-9 h-9 rounded-2xl bg-gold/20 border border-gold flex items-center justify-center text-maroon shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                    Next Step from SEYOL • {clientData.nextStepFromSeyol.targetTimeline}
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-brown">
                    {clientData.nextStepFromSeyol.nextMilestoneTitle}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed">
                    {clientData.nextStepFromSeyol.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 2: MY CARE CALENDAR
             ======================================================== */}
          {activeTab === 'calendar' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-border pb-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">My Care Calendar</h2>
                  <p className="text-xs text-brown-muted">
                    Track all confirmed appointments, pending requests, class dates, payment due dates, and rest windows.
                  </p>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Events' },
                    { id: 'confirmed_appointment', label: 'Confirmed Appointments' },
                    { id: 'pending_request', label: 'Pending Requests' },
                    { id: 'class_date', label: 'Class Dates' },
                    { id: 'package_session', label: 'Package Session Dates' },
                    { id: 'payment_due', label: 'Payment Due Dates' },
                    { id: 'scn_duration', label: 'SCN Stay-In Period' },
                    { id: 'time_to_avoid', label: 'Times to Avoid' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCalendarFilter(f.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                        calendarFilter === f.id
                          ? 'bg-maroon text-cream-light border-maroon shadow-sm font-bold'
                          : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Timeline Cards */}
              <div className="space-y-3">
                {clientData.calendarEvents
                  .filter((e) => calendarFilter === 'all' || e.type === calendarFilter)
                  .map((ev) => {
                    let badgeColor = 'bg-green-100 text-green-800 border-green-200';
                    let typeLabel = 'Confirmed Appointment';
                    if (ev.type === 'pending_request') {
                      badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                      typeLabel = 'Pending Appointment Request';
                    } else if (ev.type === 'class_date') {
                      badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
                      typeLabel = 'Class Date';
                    } else if (ev.type === 'package_session') {
                      badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                      typeLabel = 'Package Session Date';
                    } else if (ev.type === 'payment_due') {
                      badgeColor = 'bg-red-100 text-red-800 border-red-200';
                      typeLabel = 'Payment Due Date';
                    } else if (ev.type === 'scn_duration') {
                      badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
                      typeLabel = 'SCN Stay-In Support Period';
                    } else if (ev.type === 'time_to_avoid') {
                      badgeColor = 'bg-neutral-200 text-neutral-800 border-neutral-300';
                      typeLabel = 'Time to Avoid';
                    }

                    return (
                      <div
                        key={ev.id}
                        className="bg-cream p-4 sm:p-5 rounded-2xl border border-cream-border hover:border-gold transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-sm"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center space-x-2">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                              {typeLabel}
                            </span>
                            <span className="text-xs font-bold text-brown flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5 text-maroon" />
                              <span>{ev.date}</span>
                            </span>
                            {ev.time && (
                              <span className="text-xs text-brown-muted flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{ev.time}</span>
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif font-bold text-sm sm:text-base text-brown">{ev.title}</h4>

                          {ev.notes && <p className="text-xs text-brown-muted">{ev.notes}</p>}
                        </div>

                        {ev.location && (
                          <div className="text-xs text-brown-muted sm:text-right shrink-0 bg-white/70 px-3 py-1.5 rounded-xl border border-cream-border">
                            <div className="font-semibold text-brown">{ev.location}</div>
                            {ev.matronName && <div className="text-[11px] text-maroon font-bold">{ev.matronName}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 3: INVOICES, RECEIPTS & PAYMENT REMINDERS
             ======================================================== */}
          {activeTab === 'invoices' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">Invoices, Receipts & Payments</h2>
                <p className="text-xs text-brown-muted">
                  View itemized receipts, download tax documentation, and pay milestone balances securely online.
                </p>
              </div>

              {/* Invoices Table / Cards */}
              <div className="space-y-4">
                {clientData.invoices.map((inv) => {
                  const isPaid = inv.status === 'paid';
                  return (
                    <div
                      key={inv.id}
                      className={`p-5 rounded-3xl border transition-all ${
                        isPaid
                          ? 'bg-cream border-cream-border'
                          : 'bg-gradient-to-r from-cream to-maroon-soft border-maroon/30 shadow-warm-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-border">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-maroon">{inv.invoiceNumber}</span>
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isPaid ? 'Paid in Full' : 'Payment Due'}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-brown mt-1">
                            {inv.packageTitle}
                          </h4>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-serif font-extrabold text-brown">
                            ₹{inv.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-brown-muted">
                            {isPaid ? `Paid via ${inv.paymentMethodUsed}` : `Due by ${inv.dueDate}`}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="text-brown-muted">
                          <strong>Issued:</strong> {inv.date} {inv.receiptNumber && `• Receipt #: ${inv.receiptNumber}`}
                        </div>

                        <div className="flex items-center space-x-2">
                          {isPaid ? (
                            <button
                              onClick={() => alert(`Downloading Official GST Receipt: ${inv.receiptNumber}.pdf`)}
                              className="px-4 py-2 rounded-xl bg-cream border border-cream-border text-brown hover:bg-cream-dark font-bold text-xs flex items-center space-x-1.5 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5 text-maroon" />
                              <span>Download GST Receipt (PDF)</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => setPayingInvoice(inv)}
                              className="px-5 py-2 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm flex items-center space-x-1.5 transition-all"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-gold-light" />
                              <span>Pay Milestone Balance (₹{inv.balanceDue.toLocaleString()})</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pay Online Modal */}
              {payingInvoice && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-cream-light p-6 sm:p-8 rounded-3xl border border-cream-border shadow-warm-lg max-w-md w-full space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-cream-border pb-3">
                      <h3 className="font-serif font-bold text-lg text-brown">Pay Balance Online</h3>
                      <button
                        onClick={() => setPayingInvoice(null)}
                        className="text-brown-muted hover:text-maroon"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-cream-border space-y-2 text-xs">
                      <div><strong>Invoice:</strong> {payingInvoice.invoiceNumber}</div>
                      <div><strong>Package:</strong> {payingInvoice.packageTitle}</div>
                      <div className="text-base font-serif font-extrabold text-maroon pt-1">
                        Amount Payable: ₹{payingInvoice.balanceDue.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase text-brown">Select Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['UPI / GPay / PhonePe', 'Credit / Debit Card', 'NetBanking', 'WhatsApp Pay'].map((m) => (
                          <div
                            key={m}
                            className="p-3 rounded-xl border border-cream-border bg-white text-xs font-semibold text-brown cursor-pointer hover:border-maroon"
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePayInvoice}
                      disabled={paySuccess}
                      className="w-full py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-md hover:bg-maroon-dark transition-all flex items-center justify-center space-x-2"
                    >
                      {paySuccess ? (
                        <>
                          <Check className="w-4 h-4 text-gold-light" />
                          <span>Payment Successful! Updating Ledger...</span>
                        </>
                      ) : (
                        <span>Confirm & Complete Payment</span>
                      )}
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================
              MODULE 4: PREPARATION ITEM LIST
             ======================================================== */}
          {activeTab === 'preparation' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-border pb-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">Preparation Item List</h2>
                  <p className="text-xs text-brown-muted">
                    Mother and infant preparation checklist before matron visit and confinement care.
                  </p>
                </div>

                <div className="text-right bg-cream px-4 py-2 rounded-2xl border border-cream-border">
                  <div className="text-xs font-bold text-maroon">{prepPercentage}% Completed</div>
                  <div className="text-[10px] text-brown-muted">{completedPrepCount} of {totalPrepCount} Items Checked</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-cream-border h-2 rounded-full overflow-hidden">
                <div
                  className="bg-maroon h-full rounded-full transition-all duration-300"
                  style={{ width: `${prepPercentage}%` }}
                />
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {clientData.preparationItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePrepItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                      item.isCompleted
                        ? 'bg-cream/60 border-cream-border opacity-70'
                        : 'bg-cream border-cream-border hover:border-gold shadow-warm-sm'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border shrink-0 mt-0.5 ${
                        item.isCompleted
                          ? 'bg-maroon text-cream-light border-maroon'
                          : 'border-cream-border bg-white'
                      }`}
                    >
                      {item.isCompleted && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${item.isCompleted ? 'line-through text-brown-muted' : 'text-brown'}`}>
                          {item.title}
                        </span>
                        <span className="text-[9px] uppercase font-extrabold px-2 py-0.2 rounded-full bg-gold/20 text-maroon">
                          {item.essentialLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-brown-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Item */}
              <form onSubmit={handleAddPrepItem} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a custom family preparation item (e.g. Wash soft muslin cloths)..."
                  value={newPrepText}
                  onChange={(e) => setNewPrepText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-maroon text-cream-light font-bold text-xs rounded-xl hover:bg-maroon-dark transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 5: SCN WEEKLY CHECK-IN FORM
             ======================================================== */}
          {activeTab === 'scn_checkin' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Stay-In Confinement Nanny Weekly Review</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">SCN Weekly Check-In Form</h2>
                <p className="text-xs text-brown-muted">
                  Submit weekly updates on baby milestones, mother recovery status, and nanny feedback so SEYOL senior matrons can optimize your care plan.
                </p>
              </div>

              {scnSubmittedSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Your Week {scnForm.weekNumber} SCN Check-In has been recorded! Senior Matron Ms Jemma Francis will review your updates within 24 hours.</span>
                </motion.div>
              )}

              {/* The Form */}
              <form onSubmit={handleScnSubmit} className="bg-cream p-6 rounded-3xl border border-cream-border space-y-5 shadow-warm-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Week Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-brown mb-1">Check-in Week *</label>
                    <select
                      value={scnForm.weekNumber}
                      onChange={(e) => setScnForm((prev) => ({ ...prev, weekNumber: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value={1}>Week 1 (Days 1–7)</option>
                      <option value={2}>Week 2 (Days 8–14)</option>
                      <option value={3}>Week 3 (Days 15–21)</option>
                      <option value={4}>Week 4 (Days 22–28)</option>
                    </select>
                  </div>

                  {/* Baby Weight / Growth */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-brown mb-1">Baby Weight Milestone</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.9 kg (+400g gain)"
                      value={scnForm.babyWeightMilestone}
                      onChange={(e) => setScnForm((prev) => ({ ...prev, babyWeightMilestone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                {/* Baby Health Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-brown mb-1">Daily Feeding Count</label>
                    <input
                      type="text"
                      value={scnForm.babyFeedingFrequency}
                      onChange={(e) => setScnForm((prev) => ({ ...prev, babyFeedingFrequency: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-brown mb-1">Daily Sleep Average</label>
                    <input
                      type="text"
                      value={scnForm.babySleepAverage}
                      onChange={(e) => setScnForm((prev) => ({ ...prev, babySleepAverage: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-brown mb-1">Cord Healing Status</label>
                    <select
                      value={scnForm.cordHealingStatus}
                      onChange={(e) => setScnForm((prev) => ({ ...prev, cordHealingStatus: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="separated_clean">Separated Cleanly</option>
                      <option value="healing_well">Healing Well & Dry</option>
                      <option value="mild_redness">Mild Redness</option>
                      <option value="requires_matron_check">Requires Matron Review</option>
                    </select>
                  </div>
                </div>

                {/* Mother Recovery Scores */}
                <div className="p-4 rounded-2xl bg-white/70 border border-cream-border space-y-3">
                  <div className="font-serif font-bold text-xs text-brown">Mother Recovery Ratings</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-brown mb-1">
                        <span>Overall Recovery Score:</span>
                        <span className="text-maroon font-bold">{scnForm.motherRecoveryScore} / 10</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={scnForm.motherRecoveryScore}
                        onChange={(e) => setScnForm((prev) => ({ ...prev, motherRecoveryScore: Number(e.target.value) }))}
                        className="w-full accent-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-brown mb-1">Lochia Bleeding Status</label>
                      <select
                        value={scnForm.lochiaBleedingStatus}
                        onChange={(e) => setScnForm((prev) => ({ ...prev, lochiaBleedingStatus: e.target.value as any }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-cream-border text-xs text-brown"
                      >
                        <option value="minimal">Minimal / Light spotting</option>
                        <option value="moderate">Moderate</option>
                        <option value="ceased">Ceased completely</option>
                        <option value="heavy">Heavy (Requires review)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Nanny Care & Meals Feedback */}
                <div>
                  <label className="block text-xs font-bold uppercase text-brown mb-1">
                    Confinement Meals & Nanny Feedback
                  </label>
                  <textarea
                    rows={2}
                    value={scnForm.mealsFeedback}
                    onChange={(e) => setScnForm((prev) => ({ ...prev, mealsFeedback: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {/* Dietary Adjustments & Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase text-brown mb-1">
                    Dietary Adjustments or Special Requests for Next Week
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. More garlic rasam, change herbal oil scent..."
                    value={scnForm.dietaryAdjustments}
                    onChange={(e) => setScnForm((prev) => ({ ...prev, dietaryAdjustments: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-cream-border text-xs text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center space-x-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-gold-light" />
                    <span>Submit SCN Weekly Check-In</span>
                  </button>
                </div>
              </form>

              {/* Past Check-Ins Log */}
              <div className="space-y-3 pt-4 border-t border-cream-border">
                <h4 className="font-serif font-bold text-sm text-brown">Previous Weekly Check-In History</h4>
                {clientData.scnCheckIns.map((ci) => (
                  <div key={ci.id} className="bg-cream p-4 rounded-2xl border border-cream-border text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-maroon text-sm">Week {ci.weekNumber} Review</span>
                      <span className="text-[10px] text-brown-muted">Submitted on {ci.dateSubmitted}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-brown-muted">
                      <div><strong>Recovery:</strong> {ci.motherRecoveryScore}/10</div>
                      <div><strong>Feeding:</strong> {ci.babyFeedingFrequency}</div>
                      <div><strong>Sleep:</strong> {ci.babySleepAverage}</div>
                      <div><strong>Cord:</strong> {ci.cordHealingStatus.replace('_', ' ')}</div>
                    </div>
                    {ci.matronReviewNote && (
                      <div className="bg-gold-soft p-2 rounded-lg border border-gold-border text-[11px] text-brown">
                        <strong className="text-maroon">Matron Note: </strong>
                        <span>{ci.matronReviewNote}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 6: MESSAGES & IMPORTANT UPDATES
             ======================================================== */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-border pb-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">Messages & Important Updates</h2>
                  <p className="text-xs text-brown-muted">
                    Official dispatch alerts, booking updates, receipts, and clinical notifications.
                  </p>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-3.5 h-3.5 text-brown-muted" />
                  <select
                    value={messageFilter}
                    onChange={(e) => setMessageFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-cream border border-cream-border text-xs font-semibold text-brown focus:outline-none"
                  >
                    <option value="all">All Updates ({clientData.messages.length})</option>
                    <option value="booking_confirmed">Booking Confirmed</option>
                    <option value="appointment_changed">Appointment Changed</option>
                    <option value="payment_reminder">Payment Reminder</option>
                    <option value="receipt_sent">Receipt Sent</option>
                    <option value="item_list_sent">Item List Sent</option>
                    <option value="scn_checkin_reminder">SCN Check-In Reminder</option>
                    <option value="class_access_link">Class Access Link</option>
                    <option value="resource_access_granted">Resource Access Granted</option>
                  </select>
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                {clientData.messages
                  .filter((m) => messageFilter === 'all' || m.type === messageFilter)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => toggleMessageRead(msg.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        msg.isRead
                          ? 'bg-cream border-cream-border'
                          : 'bg-gradient-to-r from-cream-light to-gold-soft border-gold shadow-warm-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-maroon-soft text-maroon border border-maroon/20">
                              {msg.categoryTag}
                            </span>
                            {!msg.isRead && (
                              <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
                            )}
                            <span className="text-[10px] text-brown-muted">{msg.timestamp}</span>
                          </div>

                          <h4 className="font-serif font-bold text-sm sm:text-base text-brown pt-1">
                            {msg.title}
                          </h4>

                          <p className="text-xs text-brown-muted leading-relaxed">{msg.body}</p>
                        </div>

                        {msg.actionLabel && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (msg.actionUrl === '#invoices') setActiveTab('invoices');
                              else if (msg.actionUrl === '#calendar') setActiveTab('calendar');
                              else if (msg.actionUrl === '#preparation') setActiveTab('preparation');
                              else if (msg.actionUrl === '#scn-checkin') setActiveTab('scn_checkin');
                              else if (msg.actionUrl === '#classes') setActiveTab('classes');
                              else if (msg.actionUrl === '#resources') setActiveTab('resources');
                              else setActiveTab('dashboard');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-maroon text-cream-light text-[11px] font-bold hover:bg-maroon-dark transition-colors shrink-0 flex items-center space-x-1"
                          >
                            <span>{msg.actionLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 7: MY CLASSES
             ======================================================== */}
          {activeTab === 'classes' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">My Classes & Masterclasses</h2>
                <p className="text-xs text-brown-muted">
                  Enrolled live workshops, virtual classroom links, and class study recordings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Traditional Infant Massage & Bath Masterclass',
                    instructor: 'Ms. Jemma Francis (Founder)',
                    dateTime: 'Saturday, Sep 5, 2026 • 4:00 PM IST',
                    duration: '90 Mins',
                    status: 'Live Zoom Access Active',
                    link: 'https://zoom.us/j/seyol-infant-massage',
                    materials: 'Infant Stroke Diagram & Nalangu Bath Guide (PDF)'
                  },
                  {
                    title: 'Sacred 40-Day Postpartum Nutrition & Confinement Cookery',
                    instructor: 'Matron Mrs. Lakshmi Sundaram',
                    dateTime: 'On-Demand Video Masterclass',
                    duration: '120 Mins',
                    status: 'Available On-Demand',
                    link: 'https://youtube.com/seyol-postpartum-nutrition',
                    materials: '50 Traditional Confinement Recipes e-Book'
                  }
                ].map((cls, idx) => (
                  <div key={idx} className="bg-cream p-5 rounded-3xl border border-cream-border space-y-3 shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-gold/20 text-maroon">
                        {cls.status}
                      </span>
                      <h3 className="font-serif font-bold text-base text-brown">{cls.title}</h3>
                      <div className="text-xs text-brown-muted">
                        <div><strong>Instructor:</strong> {cls.instructor}</div>
                        <div><strong>Schedule:</strong> {cls.dateTime} ({cls.duration})</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-cream-border flex items-center justify-between">
                      <span className="text-[11px] text-maroon font-semibold">{cls.materials}</span>
                      <a
                        href={cls.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-maroon text-cream-light font-bold text-xs hover:bg-maroon-dark transition-colors flex items-center space-x-1"
                      >
                        <Video className="w-3.5 h-3.5 text-gold-light" />
                        <span>Join Room</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 8: MY RESOURCES
             ======================================================== */}
          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">My Digital Resource Locker</h2>
                <p className="text-xs text-brown-muted">
                  Permanent cloud access to your unlocked SEYOL workbooks, checklists, and diet templates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Newborn Feeding & Sleep Log Template',
                    format: 'Printable A4 PDF',
                    size: '1.2 MB'
                  },
                  {
                    title: 'Essential Hospital Bag Checklist',
                    format: 'Digital Checklist',
                    size: '850 KB'
                  },
                  {
                    title: '50 Traditional Confinement Recipes & Herbal Broths',
                    format: 'Master e-Book (64 Pages)',
                    size: '8.4 MB'
                  },
                  {
                    title: 'Baby Cry & Soothing Quick Reference Chart',
                    format: 'Laminated Fridge Guide PDF',
                    size: '1.1 MB'
                  },
                  {
                    title: 'Traditional Indian Baby Massage (Thokkanam) Step-by-Step',
                    format: 'Illustrated Protocol Guide',
                    size: '3.6 MB'
                  }
                ].map((res, idx) => (
                  <div key={idx} className="bg-cream p-4 rounded-2xl border border-cream-border space-y-3 shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-maroon mb-1">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif font-bold text-xs text-brown">{res.title}</h4>
                      <div className="text-[10px] text-brown-muted">{res.format} • {res.size}</div>
                    </div>

                    <button
                      onClick={() => alert(`Downloading high-resolution copy: ${res.title}.pdf`)}
                      className="w-full py-1.5 rounded-xl bg-cream-light border border-cream-border text-brown hover:text-maroon font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 9: DOCUMENTS & CONSENT
             ======================================================== */}
          {activeTab === 'documents' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">Documents & Signed Consents</h2>
                <p className="text-xs text-brown-muted">
                  Legal agreements, medical safety disclaimers, and household caregiver privacy policies.
                </p>
              </div>

              <div className="space-y-3">
                {clientData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-cream p-4 sm:p-5 rounded-2xl border border-cream-border flex items-center justify-between gap-3 shadow-warm-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-green-100 text-green-800 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-brown">{doc.title}</h4>
                        <div className="text-[10px] text-brown-muted">
                          Signed / Acknowledged on {doc.signedDate} • Status: <span className="text-green-700 font-bold">Active</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Viewing copy of signed document: ${doc.title}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-cream-light border border-cream-border text-brown hover:bg-cream-dark text-xs font-bold shrink-0 transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-maroon" />
                      <span>View Signed Copy</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              MODULE 10: SUPPORT & CONCIERGE
             ======================================================== */}
          {activeTab === 'support' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown">Support & Matron Concierge</h2>
                <p className="text-xs text-brown-muted">
                  Reach our dedicated clinical team, request an urgent callback, or access emergency hospital hotlines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Direct WhatsApp Matron */}
                <div className="bg-cream p-6 rounded-3xl border border-cream-border space-y-4 shadow-warm-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-brown">WhatsApp Matron Concierge</h3>
                    <p className="text-xs text-brown-muted leading-relaxed">
                      Instant messaging with our duty postpartum matron for routine feeding questions, baby hiccups, or dietary guidance.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/919840012345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Urgent Clinical Escalation */}
                <div className="bg-cream p-6 rounded-3xl border border-cream-border space-y-4 shadow-warm-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-maroon-soft text-maroon flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-brown">Senior Matron Callback</h3>
                    <p className="text-xs text-brown-muted leading-relaxed">
                      Request a 1-on-1 urgent callback with Ms Jemma Francis for clinical concerns or lactation difficulties.
                    </p>
                  </div>

                  <button
                    onClick={() => alert('Callback request submitted! Senior Matron will call you within 30 minutes.')}
                    className="w-full py-2.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <span>Request Urgent Callback</span>
                    <Phone className="w-3.5 h-3.5 text-gold-light" />
                  </button>
                </div>
              </div>

              {/* Partner Hospital Emergency Helplines */}
              <div className="bg-cream-dark/40 p-5 rounded-3xl border border-cream-border space-y-2 text-xs">
                <div className="font-serif font-bold text-brown flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-maroon" />
                  <span>Clinical Emergency Helplines (24/7)</span>
                </div>
                <p className="text-brown-muted text-[11px]">
                  For medical emergencies such as neonatal fever, uncontrolled postpartum bleeding, or severe pain, please immediately contact your primary hospital:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-cream-border">
                    <strong>Apollo Cradle (Chennai):</strong> +91 44 2829 0200
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-cream-border">
                    <strong>Cloudnine Hospital:</strong> +91 99728 99728
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-cream-border">
                    <strong>KK Women's & Children's (SG):</strong> +65 6225 5554
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
