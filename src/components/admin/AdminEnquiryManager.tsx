'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Globe,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileSpreadsheet,
  AlertCircle,
  User,
  Tag,
  ChevronDown,
  Layers,
  Heart,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { SeyolCareEnquiry, EnquiryStatus, HelpCategoryName } from '../../types/enquiry';

interface AdminEnquiryManagerProps {
  onNotify?: (msg: string) => void;
}

const STATUS_CONFIG: Record<
  EnquiryStatus,
  { label: string; badge: string; border: string; bg: string; text: string }
> = {
  New: {
    label: 'New Enquiry',
    badge: 'bg-[#7B1131] text-white',
    border: 'border-[#7B1131]/30',
    bg: 'bg-[#FAF0EB]',
    text: 'text-[#7B1131]',
  },
  Contacted: {
    label: 'Contacted',
    badge: 'bg-amber-600 text-white',
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
  },
  'In Progress': {
    label: 'In Progress',
    badge: 'bg-indigo-600 text-white',
    border: 'border-indigo-300',
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
  },
  Resolved: {
    label: 'Resolved',
    badge: 'bg-emerald-600 text-white',
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
  },
};

const CATEGORY_CHIP_COLORS: Record<string, string> = {
  Services: 'bg-[#FAF0EB] text-[#7B1131] border-[#EAC8D2]',
  Classes: 'bg-[#FFF8E7] text-[#8C6D1F] border-[#F0DC9D]',
  'SEY By SEYOL Products': 'bg-[#F0F7F2] text-[#2D6A4F] border-[#B7E4C7]',
  'Careers & Training': 'bg-[#F2F0FA] text-[#5B4699] border-[#D4CBE5]',
  Resources: 'bg-[#EBF7F8] text-[#1D6F78] border-[#BCE4E8]',
  'Other Enquiries': 'bg-[#F5F5F5] text-[#4A4A4A] border-[#E0E0E0]',
};

export const AdminEnquiryManager: React.FC<AdminEnquiryManagerProps> = ({ onNotify }) => {
  const [enquiries, setEnquiries] = useState<SeyolCareEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Updating and note editing
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/enquiry');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch care enquiries');
      }
      setEnquiries(data.enquiries || []);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
      setError(err.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      onNotify?.(`Enquiry ${id} status marked as ${newStatus}`);
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, adminNotes: tempNote }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save admin note');
      }

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, adminNotes: tempNote } : e))
      );
      setEditingNotesId(null);
      onNotify?.('Internal care note saved.');
    } catch (err: any) {
      alert(err.message || 'Failed to save note');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteEnquiry = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete enquiry from ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/enquiry?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete');
      }
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      onNotify?.(`Enquiry from ${name} deleted.`);
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleExportCsv = () => {
    if (enquiries.length === 0) {
      alert('No enquiries available to export.');
      return;
    }

    const headers = [
      'Enquiry ID',
      'Submission Date',
      'Full Name',
      'Email',
      'WhatsApp',
      'Country',
      'Journey Stage',
      'Status',
      'Selected Topics',
      'Message',
      'Admin Notes',
    ];

    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toLocaleString('en-IN')}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.whatsappFull}"`,
      `"${e.country}"`,
      `"${e.journeyStage}"`,
      `"${e.status}"`,
      `"${(e.selectedHelpOptions || []).map((o) => `[${o.category}] ${o.option}`).join('; ').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SEYOL-Care-Enquiries-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify?.('Enquiries exported to CSV');
  };

  // Filtered list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        const hasCategory = (item.selectedHelpOptions || []).some(
          (opt) => opt.category === categoryFilter
        );
        if (!hasCategory) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.fullName.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesPhone = item.whatsappFull.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesStage = item.journeyStage.toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesTopics = (item.selectedHelpOptions || []).some(
          (o) => o.option.toLowerCase().includes(q) || o.category.toLowerCase().includes(q)
        );
        const matchesMsg = (item.message || '').toLowerCase().includes(q);

        return (
          matchesName ||
          matchesEmail ||
          matchesPhone ||
          matchesCountry ||
          matchesStage ||
          matchesId ||
          matchesTopics ||
          matchesMsg
        );
      }

      return true;
    });
  }, [enquiries, statusFilter, categoryFilter, searchTerm]);

  // Counts
  const counts = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === 'New').length,
      contacted: enquiries.filter((e) => e.status === 'Contacted').length,
      inProgress: enquiries.filter((e) => e.status === 'In Progress').length,
      resolved: enquiries.filter((e) => e.status === 'Resolved').length,
    };
  }, [enquiries]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Total Enquiries
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{counts.total}</div>
        </div>

        <div className="bg-[#FAF0EB] rounded-2xl p-4 border border-[#EAC8D2] shadow-2xs">
          <div className="text-[11px] font-bold text-[#7B1131] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7B1131] animate-pulse" />
            <span>New Enquiries</span>
          </div>
          <div className="text-2xl font-black text-[#7B1131] mt-1">{counts.new}</div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-2xs">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            Contacted
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1">{counts.contacted}</div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 shadow-2xs">
          <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            In Progress
          </div>
          <div className="text-2xl font-black text-indigo-900 mt-1">{counts.inProgress}</div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            Resolved
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-1">{counts.resolved}</div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by parent name, WhatsApp, email, stage, country, topic..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7B1131] focus:bg-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Enquiries"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#7B1131]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#E8C574]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Chips: Status and Categories */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-100">
          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
              Status:
            </span>
            {(['all', 'New', 'Contacted', 'In Progress', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#7B1131] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#7B1131] cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Services">Services</option>
              <option value="Classes">Classes</option>
              <option value="SEY By SEYOL Products">Products</option>
              <option value="Careers & Training">Careers & Training</option>
              <option value="Resources">Resources</option>
              <option value="Other Enquiries">Other Enquiries</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main List of Enquiries */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-stone-200">
          <div className="w-8 h-8 border-3 border-[#7B1131] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">
            Loading care enquiries...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-red-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchEnquiries}
            className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 font-bold"
          >
            Retry
          </button>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-stone-200">
          <HelpCircle className="w-10 h-10 text-stone-300 mx-auto" />
          <h4 className="font-heading font-extrabold text-base text-stone-700">
            No matching enquiries found
          </h4>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search query, status filter, or category selector.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-stone-500">
            Showing {filteredEnquiries.length} of {enquiries.length} enquiry records
          </div>

          {filteredEnquiries.map((enq) => {
            const statusCfg = STATUS_CONFIG[enq.status] || STATUS_CONFIG.New;
            const waClean = (enq.whatsappFull || '').replace(/[^\d]/g, '');
            const waLink = `https://wa.me/${waClean}?text=${encodeURIComponent(
              `Hello ${enq.fullName}! Thank you for contacting SEYOL Sacred Mother & Baby Care. We received your enquiry and would love to help you with your care plans.`
            )}`;

            return (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-all p-5 space-y-4"
              >
                {/* Header: ID, Status, Timestamp */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {enq.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${statusCfg.badge}`}
                    >
                      {statusCfg.label}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(enq.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}</span>
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-stone-400 uppercase">Change Status:</span>
                    <select
                      value={enq.status}
                      disabled={updatingId === enq.id}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#7B1131] cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Details Grid: Contact, Stage, Country */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column: Parent Identity & Contact */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Parent / Caregiver Details
                    </div>
                    <div className="font-heading font-extrabold text-stone-900 text-base">
                      {enq.fullName}
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <a
                          href={`mailto:${enq.email}`}
                          className="text-[#7B1131] hover:underline truncate"
                        >
                          {enq.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>{enq.whatsappFull}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Residence: <strong>{enq.country}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Journey Stage & Care Topics Requested */}
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Journey Stage &amp; Requested Topics
                      </div>
                      <span className="text-xs font-bold text-[#7B1131] bg-[#FAF0EB] px-2.5 py-0.5 rounded-full border border-[#EAC8D2]">
                        {enq.journeyStage}
                      </span>
                    </div>

                    {/* Selected Options Chips */}
                    {enq.selectedHelpOptions && enq.selectedHelpOptions.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {enq.selectedHelpOptions.map((item, idx) => {
                          const chipStyle =
                            CATEGORY_CHIP_COLORS[item.category] ||
                            'bg-stone-100 text-stone-700 border-stone-200';
                          return (
                            <span
                              key={idx}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${chipStyle}`}
                            >
                              <span className="text-[9.5px] uppercase font-black opacity-75">
                                {item.category}:
                              </span>
                              <span>{item.option}</span>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-stone-400 italic">
                        No specific topics pre-selected (General care enquiry)
                      </div>
                    )}

                    {/* Parent's Message */}
                    {enq.message && (
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed mt-2">
                        <div className="font-bold text-stone-500 text-[10px] uppercase mb-1">
                          Parent&apos;s Message:
                        </div>
                        {enq.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Admin Notes & Delete */}
                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  {/* Internal Admin Note */}
                  <div className="flex-1 w-full sm:w-auto">
                    {editingNotesId === enq.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add internal care note (e.g. Doula assigned, called parent)..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                        />
                        <button
                          onClick={() => handleSaveNotes(enq.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#7B1131] text-white font-bold hover:bg-[#5A0C24]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1.5 text-stone-500 hover:text-stone-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-500">Internal Note:</span>
                        <span className="text-stone-700 italic">
                          {enq.adminNotes || 'No notes yet.'}
                        </span>
                        <button
                          onClick={() => {
                            setEditingNotesId(enq.id);
                            setTempNote(enq.adminNotes || '');
                          }}
                          className="text-[#7B1131] hover:underline text-[11px] font-bold"
                        >
                          {enq.adminNotes ? 'Edit' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Quick Link & Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp Parent</span>
                    </a>

                    <button
                      onClick={() => handleDeleteEnquiry(enq.id, enq.fullName)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Enquiry Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiryManager;

