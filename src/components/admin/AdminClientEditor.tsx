'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Calendar, CreditCard, Bell, FileCheck, Sparkles,
  Save, RotateCcw, Check, Plus, Trash2, ArrowLeft,
  AlertCircle, CheckCircle2, Send, Edit3, X, Search,
  Lock, Copy, ExternalLink, Key, Shield, UserPlus,
  Clock, MapPin, Phone, Mail, ChevronRight, Filter,
  Activity, Users, Award, Eye
} from 'lucide-react';
import { usePortalData, CustomerCredentials } from '../../context/PortalDataContext';
import { ClientPortalProfile, CareInvoice, JourneyStage } from '../../types';

type ManageTab = 'package' | 'appointment' | 'payments' | 'session_note' | 'next_step' | 'credentials' | 'message';

const MANAGE_TABS: { id: ManageTab; label: string; icon: React.ReactNode }[] = [
  { id: 'package', label: 'Package & Matron', icon: <FileCheck className="w-4 h-4" /> },
  { id: 'appointment', label: 'Appointment', icon: <Calendar className="w-4 h-4" /> },
  { id: 'payments', label: 'Invoices & Billing', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'session_note', label: 'Clinical Updates', icon: <Edit3 className="w-4 h-4" /> },
  { id: 'next_step', label: 'Next Milestone', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'credentials', label: 'Portal Login ID', icon: <Key className="w-4 h-4" /> },
  { id: 'message', label: 'Send Alert', icon: <Bell className="w-4 h-4" /> },
];

const MESSAGE_TYPES = [
  { type: 'booking_confirmed', tag: 'Booking Confirmed' },
  { type: 'appointment_changed', tag: 'Appointment Changed' },
  { type: 'payment_reminder', tag: 'Payment Reminder' },
  { type: 'receipt_sent', tag: 'Receipt Sent' },
  { type: 'item_list_sent', tag: 'Item List Sent' },
  { type: 'scn_checkin_reminder', tag: 'SCN Check-In Reminder' },
  { type: 'class_access_link', tag: 'Class Access Link' },
  { type: 'resource_access_granted', tag: 'Resource Access Granted' },
];

export const AdminClientEditor: React.FC = () => {
  const {
    allClientData,
    customerCredentials,
    addCustomer,
    deleteCustomer,
    updateCustomerCredentials,
    updateActivePackage,
    updateAppointment,
    addInvoice,
    updateInvoice,
    updateLatestSessionNote,
    updateNextStep,
    updateClientData,
    sendMessageToClient,
    resetClientToDefault,
  } = usePortalData();

  // Navigation State: null = All Customers directory; string = Managing specific customer
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ManageTab>('package');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | 'postpartum' | 'pregnancy' | 'newborn'>('all');

  // Feedback Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Add Customer Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedCredsId, setCopiedCredsId] = useState<string | null>(null);

  // ─── Active Customer Data ───────────────────────────────────────────────────
  const activeCustomer = activeCustomerId ? allClientData[activeCustomerId] : null;
  const activeCreds = activeCustomerId ? customerCredentials[activeCustomerId] : null;

  // ─── Form States for Active Customer ─────────────────────────────────────────
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgTotal, setPkgTotal] = useState(28);
  const [pkgCompleted, setPkgCompleted] = useState(0);
  const [pkgStatus, setPkgStatus] = useState<'in-progress' | 'confirmed' | 'completed'>('in-progress');
  const [pkgMatronName, setPkgMatronName] = useState('');
  const [pkgMatronRole, setPkgMatronRole] = useState('');
  const [pkgMatronPhone, setPkgMatronPhone] = useState('');

  const [apptTitle, setApptTitle] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');
  const [apptSession, setApptSession] = useState(1);
  const [apptFormat, setApptFormat] = useState<'In-Home' | 'Virtual' | 'In-Clinic'>('In-Home');
  const [apptStatus, setApptStatus] = useState<'confirmed' | 'completed' | 'rescheduled' | 'in-progress'>('confirmed');

  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionRec, setSessionRec] = useState('');

  const [nextTitle, setNextTitle] = useState('');
  const [nextDesc, setNextDesc] = useState('');
  const [nextTimeline, setNextTimeline] = useState('');

  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const [invTitle, setInvTitle] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invDue, setInvDue] = useState('');

  const [msgType, setMsgType] = useState(MESSAGE_TYPES[0].type);
  const [msgTitle, setMsgTitle] = useState('');
  const [msgBody, setMsgBody] = useState('');

  // Sync Form States when active customer changes
  useEffect(() => {
    if (!activeCustomer) return;
    setPkgTitle(activeCustomer.activePackage.title);
    setPkgTotal(activeCustomer.activePackage.totalSessions);
    setPkgCompleted(activeCustomer.activePackage.completedSessions);
    setPkgStatus(activeCustomer.activePackage.status);
    setPkgMatronName(activeCustomer.activePackage.assignedMatron.name);
    setPkgMatronRole(activeCustomer.activePackage.assignedMatron.role);
    setPkgMatronPhone(activeCustomer.activePackage.assignedMatron.phone || '+91 98400 12345');

    setApptTitle(activeCustomer.upcomingAppointment.serviceTitle);
    setApptDate(activeCustomer.upcomingAppointment.date);
    setApptTime(activeCustomer.upcomingAppointment.time);
    setApptSession(activeCustomer.upcomingAppointment.sessionNumber);
    setApptFormat(activeCustomer.upcomingAppointment.format);
    setApptStatus(activeCustomer.upcomingAppointment.status);

    setSessionNotes(activeCustomer.latestSessionUpdate.notes);
    setSessionRec(activeCustomer.latestSessionUpdate.recommendation);

    setNextTitle(activeCustomer.nextStepFromSeyol.nextMilestoneTitle);
    setNextDesc(activeCustomer.nextStepFromSeyol.description);
    setNextTimeline(activeCustomer.nextStepFromSeyol.targetTimeline);

    const creds = customerCredentials[activeCustomer.clientId];
    setEditUsername(creds?.username || activeCustomer.clientEmail);
    setEditPassword(creds?.password || 'seyol123');
  }, [activeCustomerId, allClientData, customerCredentials]);

  // ─── Add Customer Form State ────────────────────────────────────────────────
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustLocation, setNewCustLocation] = useState('Chennai, TN');
  const [newCustStage, setNewCustStage] = useState<JourneyStage>('postpartum');
  const [newCustEdd, setNewCustEdd] = useState('Baby (2 Weeks Old)');
  const [newCustPkgTitle, setNewCustPkgTitle] = useState('28-Day Sacred Postpartum Confinement Care');
  const [newCustTotalSessions, setNewCustTotalSessions] = useState(28);
  const [newCustMatronName, setNewCustMatronName] = useState('Mrs. Lakshmi Sundaram');
  const [newCustMatronRole, setNewCustMatronRole] = useState('Senior Postpartum Matron (18+ Yrs Exp)');
  const [newCustUsername, setNewCustUsername] = useState('');
  const [newCustPassword, setNewCustPassword] = useState('Seyol@2026');

  // Auto-generate username when name changes
  const handleNewNameChange = (val: string) => {
    setNewCustName(val);
    const cleaned = val.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleaned) {
      setNewCustUsername(`${cleaned}@seyol`);
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustUsername.trim() || !newCustPassword.trim()) {
      alert('Please fill in Customer Name, Login Username, and Password.');
      return;
    }

    const newId = `usr_seyol_${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newProfile: ClientPortalProfile = {
      id: `portal_${newId}`,
      clientId: newId,
      clientName: newCustName.trim(),
      clientEmail: newCustEmail.trim() || `${newCustUsername.trim()}@client.seyol.com`,
      clientPhone: newCustPhone.trim() || '+91 98400 00000',
      stage: newCustStage,
      babyNameOrEdd: newCustEdd.trim(),
      location: newCustLocation.trim(),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      activePackage: {
        id: `pkg-${Date.now()}`,
        title: newCustPkgTitle.trim(),
        startDate: today,
        endDate: today,
        status: 'in-progress',
        totalSessions: Number(newCustTotalSessions) || 28,
        completedSessions: 0,
        nextSessionDate: `${today}T09:30:00+05:30`,
        assignedMatron: {
          name: newCustMatronName.trim(),
          role: newCustMatronRole.trim(),
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          phone: '+91 98401 99887',
        },
      },
      upcomingAppointment: {
        id: `appt-${Date.now()}`,
        serviceTitle: newCustPkgTitle.trim(),
        packageTitle: newCustPkgTitle.trim(),
        sessionNumber: 1,
        totalSessions: Number(newCustTotalSessions) || 28,
        date: today,
        time: '09:30 AM – 12:30 PM (IST)',
        format: 'In-Home',
        assignedMatron: {
          name: newCustMatronName.trim(),
          role: newCustMatronRole.trim(),
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          phone: '+91 98401 99887',
        },
        status: 'confirmed',
        prepSummary: 'Initial onboarding and home consultation with your assigned matron.',
      },
      latestSessionUpdate: {
        date: 'Welcome to SEYOL Care',
        matronName: newCustMatronName.trim(),
        sessionNumber: 0,
        notes: 'Welcome to your tailored care pathway. Your dedicated care team has initiated your file.',
        recoveryProgress: 'Onboarding phase initialized.',
        recommendation: 'Rest well and stay hydrated with warm water.',
      },
      nextStepFromSeyol: {
        currentMilestone: 'Orientation & First Home Assessment',
        nextMilestoneTitle: 'First In-Home Herbal Session',
        targetTimeline: 'Upcoming',
        description: 'Your assigned matron will conduct the initial assessment and bodywork setup.',
      },
      calendarEvents: [],
      invoices: [
        {
          id: `inv-${Date.now()}`,
          invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          date: today,
          dueDate: today,
          packageTitle: newCustPkgTitle.trim(),
          totalAmount: 48000,
          paidAmount: 24000,
          balanceDue: 24000,
          status: 'pending_milestone',
        },
      ],
      preparationItems: [
        {
          id: `prep-1-${Date.now()}`,
          category: 'mother_comfort',
          title: 'Prepare 2 clean cotton towels',
          description: 'Used for herbal oil bath fomentation.',
          isCompleted: false,
          essentialLevel: 'mandatory',
        },
      ],
      scnCheckIns: [],
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          type: 'booking_confirmed',
          categoryTag: 'Welcome',
          title: 'Welcome to SEYOL Mother & Baby Care Portal',
          body: `Dear ${newCustName}, your care portal is now active. Your dedicated matron is ${newCustMatronName}.`,
          timestamp: 'Just now',
          isRead: false,
        },
      ],
      documents: [],
    };

    addCustomer(newProfile, {
      username: newCustUsername.trim(),
      password: newCustPassword.trim(),
    });

    setIsAddModalOpen(false);
    setActiveCustomerId(newId);
    showToast(`Customer "${newCustName}" created successfully with login credentials!`);

    // Reset Add Form
    setNewCustName('');
    setNewCustEmail('');
    setNewCustPhone('');
    setNewCustUsername('');
  };

  // Copy credentials helper
  const handleCopyCredentials = (clientId: string) => {
    const creds = customerCredentials[clientId];
    const cust = allClientData[clientId];
    if (!creds || !cust) return;

    const text = `🌟 SEYOL Client Portal Login Credentials 🌟\n\nClient Name: ${cust.clientName}\nPortal URL: https://seyol.com/portal\nUsername / Login ID: ${creds.username}\nPassword: ${creds.password}\n\nPlease keep your credentials safe.`;
    navigator.clipboard.writeText(text);
    setCopiedCredsId(clientId);
    showToast('Login credentials copied to clipboard!');
    setTimeout(() => setCopiedCredsId(null), 2500);
  };

  // ─── Filtered Customer Directory List ───────────────────────────────────────
  const customerList = useMemo(() => {
    return Object.values(allClientData).filter((c) => {
      const creds = customerCredentials[c.clientId];
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.clientName.toLowerCase().includes(q) ||
        c.clientEmail.toLowerCase().includes(q) ||
        c.clientPhone.includes(q) ||
        c.location.toLowerCase().includes(q) ||
        creds?.username.toLowerCase().includes(q);

      const matchesStage = stageFilter === 'all' || c.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [allClientData, customerCredentials, searchQuery, stageFilter]);

  // Aggregate Metrics for Header
  const totalClients = Object.keys(allClientData).length;
  const activePackagesCount = Object.values(allClientData).filter((c) => c.activePackage.status === 'in-progress').length;
  const totalPendingInvoices = Object.values(allClientData).reduce(
    (acc, c) => acc + c.invoices.filter((inv) => inv.status !== 'paid').length,
    0
  );

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all';
  const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5';

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gold/40 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP WEB APPLICATION METRICS & STATS CARDS                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Enrolled Clients</div>
            <div className="text-2xl font-serif font-black text-[#7B1131] mt-1">{totalClients}</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Client Portals Active</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#7B1131]/10 text-[#7B1131] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">In-Home Packages</div>
            <div className="text-2xl font-serif font-black text-neutral-800 mt-1">{activePackagesCount}</div>
            <div className="text-[11px] text-neutral-500 font-semibold mt-1">Sacred Confinement Active</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Next Scheduled Visit</div>
            <div className="text-sm font-bold text-neutral-800 mt-1">09:30 AM (In-Home)</div>
            <div className="text-[11px] text-neutral-500 font-semibold mt-1">Mrs. Lakshmi Sundaram</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Invoices Pending</div>
            <div className="text-2xl font-serif font-black text-rose-700 mt-1">{totalPendingInvoices}</div>
            <div className="text-[11px] text-neutral-500 font-semibold mt-1">Milestone installments</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN DIRECTORY VIEW OR DETAIL MANAGEMENT VIEW                           */}
      {/* ========================================================================= */}

      {/* VIEW A: ALL CUSTOMERS DIRECTORY (When activeCustomerId is null) */}
      {!activeCustomerId ? (
        <div className="bg-white border border-neutral-200 rounded-3xl shadow-xs overflow-hidden">
          {/* Directory Header Bar */}
          <div className="p-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-900">All Registered Customers</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Click any customer to edit their services, packages, appointments, invoices &amp; matron assignments.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, email, login ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:bg-white transition-all"
                />
              </div>

              {/* Stage Filter */}
              <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs">
                {(['all', 'postpartum', 'pregnancy'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStageFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                      stageFilter === st
                        ? 'bg-white text-[#7B1131] shadow-2xs font-extrabold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {st === 'all' ? 'All Stages' : st}
                  </button>
                ))}
              </div>

              {/* Add Customer Button */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Add Customer</span>
              </button>
            </div>
          </div>

          {/* Directory Cards / Table */}
          <div className="divide-y divide-neutral-100">
            {customerList.length === 0 ? (
              <div className="p-12 text-center text-neutral-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-neutral-300" />
                <div className="text-sm font-bold text-neutral-600">No customers found</div>
                <div className="text-xs">Try adjusting your search criteria or click "+ Add Customer".</div>
              </div>
            ) : (
              customerList.map((cust) => {
                const creds = customerCredentials[cust.clientId];
                const progressPct = Math.round(
                  (cust.activePackage.completedSessions / (cust.activePackage.totalSessions || 1)) * 100
                );
                const unpaidInvoices = cust.invoices.filter((i) => i.status !== 'paid');

                return (
                  <div
                    key={cust.clientId}
                    className="p-5 sm:p-6 hover:bg-neutral-50/70 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group cursor-pointer"
                    onClick={() => setActiveCustomerId(cust.clientId)}
                  >
                    {/* Left: Customer Info */}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B1131] to-[#4A0A1D] text-white font-serif font-black text-base flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                        {cust.clientName[0]}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-[#7B1131] transition-colors">
                            {cust.clientName}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                            {cust.stage}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                            {cust.clientId}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-neutral-500 flex-wrap gap-y-1">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{cust.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{cust.clientPhone}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Mail className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{cust.clientEmail}</span>
                          </span>
                        </div>

                        {/* Login Credentials Pill */}
                        <div className="pt-1 flex items-center space-x-2">
                          <div className="flex items-center space-x-1.5 bg-neutral-100 px-2.5 py-1 rounded-lg text-[11px] font-mono text-neutral-700 border border-neutral-200">
                            <Key className="w-3 h-3 text-[#7B1131]" />
                            <span className="font-bold">ID:</span>
                            <span className="text-[#7B1131] font-bold">{creds?.username || cust.clientEmail}</span>
                            <span className="text-neutral-300">|</span>
                            <span className="font-bold">Pass:</span>
                            <span className="text-neutral-600">{creds?.password || '••••••'}</span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCredentials(cust.clientId);
                            }}
                            className="p-1 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors"
                            title="Copy Credentials to WhatsApp"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Active Service & Matron */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-neutral-50/80 p-3.5 rounded-2xl border border-neutral-200/80 lg:w-96">
                      <div>
                        <div className="text-[10px] font-bold uppercase text-neutral-400">Assigned Package</div>
                        <div className="font-bold text-neutral-800 line-clamp-1 mt-0.5">{cust.activePackage.title}</div>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <div className="w-24 h-2 rounded-full bg-neutral-200 overflow-hidden">
                            <div className="h-full bg-[#7B1131] rounded-full" style={{ width: `${progressPct}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-neutral-500">
                            {cust.activePackage.completedSessions}/{cust.activePackage.totalSessions} sess
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase text-neutral-400">Assigned Matron</div>
                        <div className="font-bold text-neutral-800 mt-0.5">{cust.activePackage.assignedMatron.name}</div>
                        <div className="text-[10px] text-neutral-500 mt-1">
                          {unpaidInvoices.length > 0 ? (
                            <span className="text-rose-600 font-bold">
                              ₹{unpaidInvoices[0].balanceDue.toLocaleString()} Balance Due
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-bold">Fully Paid</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2 shrink-0 justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCustomerId(cust.clientId);
                        }}
                        className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#7B1131] hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center space-x-1.5 group-hover:bg-[#7B1131] group-hover:text-white"
                      >
                        <span>Manage Customer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (

        /* VIEW B: DETAIL CUSTOMER MANAGEMENT CONSOLE (When a customer is clicked) */
        activeCustomer && (
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-xs overflow-hidden animate-fadeIn">
            {/* Top Return Banner */}
            <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-neutral-50 via-white to-neutral-50">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveCustomerId(null)}
                  className="p-2.5 rounded-2xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer flex items-center space-x-1.5 text-xs font-bold shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4 text-[#7B1131]" />
                  <span>All Customers</span>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#7B1131] text-white font-serif font-black text-base flex items-center justify-center shadow-sm">
                    {activeCustomer.clientName[0]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-serif font-bold text-lg text-neutral-900">{activeCustomer.clientName}</h2>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {activeCustomer.stage}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">{activeCustomer.clientId} · {activeCustomer.location}</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleCopyCredentials(activeCustomer.clientId)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#7B1131]" />
                  <span>Copy Login ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Reset ${activeCustomer.clientName}'s portal data to defaults?`)) {
                      resetClientToDefault(activeCustomer.clientId);
                      showToast('Customer data reset to default.');
                    }
                  }}
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Reset to default"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Layout with Subtabs */}
            <div className="flex flex-col lg:flex-row">
              {/* Tab Navigation Menu */}
              <div className="lg:w-60 shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-200 p-4 space-y-1.5 bg-neutral-50/50">
                {MANAGE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#7B1131] text-white shadow-md font-extrabold'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                  >
                    <span className={activeTab === tab.id ? 'text-amber-300' : 'text-[#7B1131]'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-neutral-200 mt-4 space-y-2">
                  <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                    <div className="font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Live Client Sync</span>
                    </div>
                    <p className="text-[10px] text-amber-800 leading-relaxed">
                      Any edits saved here will instantly display when {activeCustomer.clientName} logs into their portal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Content Form Panel */}
              <div className="flex-1 p-6 sm:p-8 space-y-6">

                {/* ── 1. PACKAGE & MATRON TAB ── */}
                {activeTab === 'package' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Active Care Package &amp; Matron Assignment</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Assign the primary confinement/doula package and dedicated caregiver.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Package Title</label>
                      <input className={inputCls} value={pkgTitle} onChange={(e) => setPkgTitle(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Total Sessions Contracted</label>
                        <input
                          type="number"
                          className={inputCls}
                          value={pkgTotal}
                          onChange={(e) => setPkgTotal(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Completed Sessions</label>
                        <input
                          type="number"
                          className={inputCls}
                          value={pkgCompleted}
                          onChange={(e) => setPkgCompleted(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Package Status</label>
                      <select
                        className={inputCls}
                        value={pkgStatus}
                        onChange={(e) => setPkgStatus(e.target.value as 'in-progress' | 'confirmed' | 'completed')}
                      >
                        <option value="in-progress">In Progress (Active Care)</option>
                        <option value="confirmed">Confirmed (Scheduled)</option>
                        <option value="completed">Completed (Discharged)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                      <div className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-[#7B1131]" />
                        <span>Dedicated Matron / Specialist Assignment</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Matron Full Name</label>
                          <input className={inputCls} value={pkgMatronName} onChange={(e) => setPkgMatronName(e.target.value)} />
                        </div>
                        <div>
                          <label className={labelCls}>Matron Phone / WhatsApp</label>
                          <input className={inputCls} value={pkgMatronPhone} onChange={(e) => setPkgMatronPhone(e.target.value)} />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Matron Designation / Specialty</label>
                        <input className={inputCls} value={pkgMatronRole} onChange={(e) => setPkgMatronRole(e.target.value)} />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateActivePackage(activeCustomer.clientId, {
                          title: pkgTitle,
                          totalSessions: pkgTotal,
                          completedSessions: pkgCompleted,
                          status: pkgStatus,
                          assignedMatron: {
                            ...activeCustomer.activePackage.assignedMatron,
                            name: pkgMatronName,
                            role: pkgMatronRole,
                            phone: pkgMatronPhone,
                          },
                        });
                        showToast('Package and Matron assignments saved & synced!');
                      }}
                      className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Package &amp; Assignment Changes</span>
                    </button>
                  </div>
                )}

                {/* ── 2. APPOINTMENT TAB ── */}
                {activeTab === 'appointment' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Upcoming Care Visit / Appointment</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Control next scheduled session, arrival time, and consultation format.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Service Title</label>
                      <input className={inputCls} value={apptTitle} onChange={(e) => setApptTitle(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Appointment Date</label>
                        <input type="date" className={inputCls} value={apptDate} onChange={(e) => setApptDate(e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Time Slot</label>
                        <input className={inputCls} value={apptTime} onChange={(e) => setApptTime(e.target.value)} placeholder="09:30 AM – 12:30 PM (IST)" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Session Number</label>
                        <input
                          type="number"
                          className={inputCls}
                          value={apptSession}
                          onChange={(e) => setApptSession(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Care Format</label>
                        <select
                          className={inputCls}
                          value={apptFormat}
                          onChange={(e) => setApptFormat(e.target.value as 'In-Home' | 'Virtual' | 'In-Clinic')}
                        >
                          <option value="In-Home">In-Home Care</option>
                          <option value="Virtual">Virtual Consultation</option>
                          <option value="In-Clinic">In-Clinic Visit</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Visit Status</label>
                        <select
                          className={inputCls}
                          value={apptStatus}
                          onChange={(e) => setApptStatus(e.target.value as 'confirmed' | 'completed' | 'rescheduled' | 'in-progress')}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In-Progress</option>
                          <option value="rescheduled">Rescheduled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateAppointment(activeCustomer.clientId, {
                          serviceTitle: apptTitle,
                          date: apptDate,
                          time: apptTime,
                          sessionNumber: apptSession,
                          format: apptFormat,
                          status: apptStatus,
                        });
                        showToast('Appointment details updated and sent to portal!');
                      }}
                      className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Appointment Changes</span>
                    </button>
                  </div>
                )}

                {/* ── 3. PAYMENTS & INVOICES TAB ── */}
                {activeTab === 'payments' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Invoices &amp; Payment Records</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Manage milestone payments, invoices, and instant paid/unpaid status toggles.</p>
                    </div>

                    {/* Invoices List */}
                    <div className="space-y-3">
                      {activeCustomer.invoices.map((inv) => (
                        <div key={inv.id} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-serif font-bold text-sm text-neutral-900">{inv.packageTitle}</span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {inv.status === 'paid' ? 'Paid' : 'Payment Pending'}
                              </span>
                            </div>
                            <div className="text-xs text-neutral-500 font-mono mt-1">
                              {inv.invoiceNumber} · Due: {inv.dueDate}
                            </div>
                            <div className="text-xs font-bold text-neutral-700 mt-1">
                              Total: ₹{inv.totalAmount.toLocaleString()} · Paid: ₹{inv.paidAmount.toLocaleString()} · Balance: ₹{inv.balanceDue.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {inv.status !== 'paid' ? (
                              <button
                                type="button"
                                onClick={() => {
                                  updateInvoice(activeCustomer.clientId, inv.id, {
                                    status: 'paid',
                                    paidAmount: inv.totalAmount,
                                    balanceDue: 0,
                                    receiptNumber: `RCPT-${Date.now().toString().slice(-6)}`,
                                  });
                                  showToast(`Invoice ${inv.invoiceNumber} marked as Paid!`);
                                }}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                              >
                                Mark as Paid
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  updateInvoice(activeCustomer.clientId, inv.id, {
                                    status: 'pending_milestone',
                                    paidAmount: 0,
                                    balanceDue: inv.totalAmount,
                                  });
                                  showToast(`Invoice ${inv.invoiceNumber} marked as Pending.`);
                                }}
                                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-xs rounded-xl transition-colors"
                              >
                                Mark as Pending
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Invoice Box */}
                    <div className="bg-neutral-50 p-5 rounded-2xl border border-dashed border-neutral-300 space-y-4">
                      <div className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
                        <Plus className="w-4 h-4 text-[#7B1131]" />
                        <span>Issue New Milestone Invoice</span>
                      </div>

                      <input
                        className={inputCls}
                        placeholder="Invoice Description (e.g. 2nd Milestone 14-Day Payment)"
                        value={invTitle}
                        onChange={(e) => setInvTitle(e.target.value)}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="number"
                          className={inputCls}
                          placeholder="Amount in INR (₹)"
                          value={invAmount}
                          onChange={(e) => setInvAmount(e.target.value)}
                        />
                        <input
                          type="date"
                          className={inputCls}
                          value={invDue}
                          onChange={(e) => setInvDue(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!invTitle || !invAmount) return;
                          const newInv: CareInvoice = {
                            id: `inv-${Date.now()}`,
                            invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                            date: new Date().toISOString().split('T')[0],
                            dueDate: invDue || new Date().toISOString().split('T')[0],
                            packageTitle: invTitle,
                            totalAmount: Number(invAmount),
                            paidAmount: 0,
                            balanceDue: Number(invAmount),
                            status: 'pending_milestone',
                          };
                          addInvoice(activeCustomer.clientId, newInv);
                          setInvTitle('');
                          setInvAmount('');
                          setInvDue('');
                          showToast('New invoice issued and added to client billing!');
                        }}
                        className="px-5 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl transition-colors"
                      >
                        + Generate &amp; Add Invoice
                      </button>
                    </div>
                  </div>
                )}

                {/* ── 4. CLINICAL UPDATE TAB ── */}
                {activeTab === 'session_note' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Matron Session Observation &amp; Care Recommendations</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Post clinical progress updates for the mother to read in her care portal.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Matron Clinical Notes</label>
                      <textarea
                        rows={4}
                        className={inputCls}
                        value={sessionNotes}
                        onChange={(e) => setSessionNotes(e.target.value)}
                        placeholder="Observations on healing, belly wrap status, infant latch, maternal rest..."
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Personalized Recommendations for Mother</label>
                      <textarea
                        rows={3}
                        className={inputCls}
                        value={sessionRec}
                        onChange={(e) => setSessionRec(e.target.value)}
                        placeholder="Herbal tea instructions, warm compress regimen, sleep timing..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateLatestSessionNote(activeCustomer.clientId, sessionNotes, sessionRec);
                        showToast('Session update published to client portal!');
                      }}
                      className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Post Clinical Note to Client</span>
                    </button>
                  </div>
                )}

                {/* ── 5. NEXT STEP TAB ── */}
                {activeTab === 'next_step' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Next Milestone from SEYOL</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Let the mother know what milestone phase comes next in her recovery.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Next Milestone Title</label>
                      <input className={inputCls} value={nextTitle} onChange={(e) => setNextTitle(e.target.value)} />
                    </div>

                    <div>
                      <label className={labelCls}>Target Timeline / Date</label>
                      <input className={inputCls} value={nextTimeline} onChange={(e) => setNextTimeline(e.target.value)} placeholder="e.g. Starting September 15, 2026" />
                    </div>

                    <div>
                      <label className={labelCls}>Detailed Description</label>
                      <textarea
                        rows={3}
                        className={inputCls}
                        value={nextDesc}
                        onChange={(e) => setNextDesc(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateNextStep(activeCustomer.clientId, {
                          nextMilestoneTitle: nextTitle,
                          description: nextDesc,
                          targetTimeline: nextTimeline,
                        });
                        showToast('Next milestone saved!');
                      }}
                      className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Next Milestone</span>
                    </button>
                  </div>
                )}

                {/* ── 6. CREDENTIALS & SECURITY TAB ── */}
                {activeTab === 'credentials' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Portal Login ID &amp; Credentials</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Manage the client's username/passcode used to log into the portal at <span className="font-mono text-[#7B1131]">/portal</span>.</p>
                    </div>

                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                      <div>
                        <label className={labelCls}>Login ID / Username</label>
                        <input
                          className={inputCls}
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          placeholder="e.g. ananya@seyol or phone number"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1">The customer can use this username, their email, or phone number to sign in.</p>
                      </div>

                      <div>
                        <label className={labelCls}>Portal Password / Passcode</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          placeholder="e.g. Seyol@2026"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!editUsername.trim() || !editPassword.trim()) return;
                            updateCustomerCredentials(activeCustomer.clientId, editUsername.trim(), editPassword.trim());
                            showToast('Login credentials updated successfully!');
                          }}
                          className="px-5 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Login Credentials</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyCredentials(activeCustomer.clientId)}
                          className="px-4 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
                        >
                          <Copy className="w-4 h-4 text-[#7B1131]" />
                          <span>Copy WhatsApp Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 7. SEND NOTIFICATION MESSAGE TAB ── */}
                {activeTab === 'message' && (
                  <div className="space-y-5 max-w-2xl">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">Send Direct Notification / Message</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Pushes a real-time message to {activeCustomer.clientName}'s Care Portal inbox.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Category Tag / Message Type</label>
                      <select className={inputCls} value={msgType} onChange={(e) => setMsgType(e.target.value)}>
                        {MESSAGE_TYPES.map((m) => (
                          <option key={m.type} value={m.type}>{m.tag}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Headline / Subject</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Your session schedule has been updated"
                        value={msgTitle}
                        onChange={(e) => setMsgTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Message Content</label>
                      <textarea
                        rows={4}
                        className={inputCls}
                        placeholder="Write the message that will display directly inside the client portal..."
                        value={msgBody}
                        onChange={(e) => setMsgBody(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!msgTitle || !msgBody) return;
                        const tag = MESSAGE_TYPES.find((m) => m.type === msgType)?.tag || 'Alert';
                        sendMessageToClient(activeCustomer.clientId, {
                          title: msgTitle,
                          body: msgBody,
                          categoryTag: tag,
                          type: msgType,
                        });
                        setMsgTitle('');
                        setMsgBody('');
                        showToast('Message sent to client portal!');
                      }}
                      className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send to Client Inbox</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* 3. ADD NEW CUSTOMER MODAL / DRAWER                                        */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7B1131]/10 text-[#7B1131] flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-neutral-900">Add New Customer</h3>
                  <p className="text-xs text-neutral-500">Create client profile, assign care package, and set up login credentials.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-5 text-xs">
              {/* Personal Details */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131] block">1. Customer Contact</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input
                      required
                      placeholder="e.g. Kavitha Meenakshi"
                      className={inputCls}
                      value={newCustName}
                      onChange={(e) => handleNewNameChange(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Location / City</label>
                    <input
                      placeholder="e.g. Anna Nagar, Chennai"
                      className={inputCls}
                      value={newCustLocation}
                      onChange={(e) => setNewCustLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                      type="email"
                      placeholder="kavitha@example.com"
                      className={inputCls}
                      value={newCustEmail}
                      onChange={(e) => setNewCustEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Phone / WhatsApp Number</label>
                    <input
                      placeholder="+91 98400 12345"
                      className={inputCls}
                      value={newCustPhone}
                      onChange={(e) => setNewCustPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Journey & Package */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131] block">2. Care Journey &amp; Assignment</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Care Stage</label>
                    <select
                      className={inputCls}
                      value={newCustStage}
                      onChange={(e) => setNewCustStage(e.target.value as any)}
                    >
                      <option value="postpartum">Postpartum Confinement</option>
                      <option value="pregnancy">Pregnancy / Prenatal Doula</option>
                      <option value="newborn">Newborn &amp; Infant Care</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Baby Details / EDD</label>
                    <input
                      placeholder="e.g. Baby Rithvik (3 Weeks Old) or EDD Nov 2026"
                      className={inputCls}
                      value={newCustEdd}
                      onChange={(e) => setNewCustEdd(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>Care Package Name</label>
                    <input
                      className={inputCls}
                      value={newCustPkgTitle}
                      onChange={(e) => setNewCustPkgTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Total Contracted Sessions</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={newCustTotalSessions}
                      onChange={(e) => setNewCustTotalSessions(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Assigned Matron Name</label>
                    <input
                      className={inputCls}
                      value={newCustMatronName}
                      onChange={(e) => setNewCustMatronName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Portal Login Credentials */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131] block">3. Portal Login Credentials (Give to Client)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Username / Login ID *</label>
                    <input
                      required
                      placeholder="e.g. kavitha@seyol"
                      className={inputCls}
                      value={newCustUsername}
                      onChange={(e) => setNewCustUsername(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Passcode / Password *</label>
                    <input
                      required
                      placeholder="e.g. Seyol@2026"
                      className={inputCls}
                      value={newCustPassword}
                      onChange={(e) => setNewCustPassword(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-neutral-500">
                  The client can sign in at <span className="font-mono text-[#7B1131]">/portal</span> using this Username and Password.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md transition-colors"
                >
                  Create Customer &amp; Enable Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
