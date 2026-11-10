'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Trash2, 
  ExternalLink, 
  RefreshCw,
  MessageCircle,
  Calendar,
  UserCheck
} from 'lucide-react';
import { FifteenMinuteCallAppointment, CallAppointmentStatus } from '../../types/appointment';

interface AdminCallAppointmentsProps {
  onNotify?: (msg: string) => void;
}

export const AdminCallAppointments: React.FC<AdminCallAppointmentsProps> = ({ onNotify }) => {
  const [appointments, setAppointments] = useState<FifteenMinuteCallAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CallAppointmentStatus>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/appointments/book-call');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch appointments');
      }
      setAppointments(data.appointments || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CallAppointmentStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/appointments/book-call', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (onNotify) onNotify(`Call ${id} status updated to ${newStatus}`);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete call request ${id}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/appointments/book-call?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete call request');
      }
      setAppointments((prev) => prev.filter((app) => app.id !== id));
      if (onNotify) onNotify(`Appointment ${id} removed`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete appointment');
    }
  };

  // Filter & Search
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.whatsapp.toLowerCase().includes(term) ||
      app.country.toLowerCase().includes(term) ||
      app.stage.toLowerCase().includes(term) ||
      app.id.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const totalCalls = appointments.length;
  const pendingCalls = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCalls = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCalls = appointments.filter((a) => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#7B1131] tracking-tight">
            15-Minute Consultation Calls
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage incoming 15-minute introductory care calls, client stages, and schedules.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-[#7B1131] hover:border-[#7B1131] text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Total Bookings</div>
          <div className="text-2xl font-bold text-stone-900 mt-1">{totalCalls}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">15-minute consultations</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-amber-700 font-semibold">Needs Follow-Up</div>
          <div className="text-2xl font-bold text-amber-800 mt-1">{pendingCalls}</div>
          <div className="text-[11px] text-amber-600/80 mt-0.5">Pending confirmation</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-emerald-700 font-semibold">Confirmed</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">{confirmedCalls}</div>
          <div className="text-[11px] text-emerald-600/80 mt-0.5">Scheduled on calendar</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Completed</div>
          <div className="text-2xl font-bold text-stone-700 mt-1">{completedCalls}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">Successfully consulted</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, email, stage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:bg-white focus:border-[#7B1131] outline-none transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#7B1131] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="w-7 h-7 border-2 border-[#7B1131] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-stone-500">Loading appointment requests...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center text-xs text-red-700">
          <AlertCircle className="w-5 h-5 mx-auto mb-1.5 text-red-600" />
          <p>{error}</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <Clock className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h3 className="font-heading font-bold text-stone-700 text-sm">No Appointments Found</h3>
          <p className="text-xs text-stone-500 mt-1">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters or search keywords.'
              : 'New 15-minute call requests will appear here once booked by parents.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map((app) => {
            const cleanPhone = app.whatsapp.replace(/[^0-9]/g, '');
            const whatsappChatUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
              app.fullName
            )}%2C%20this%20is%20SEYOL%20Care%20Team%20regarding%20your%2015-minute%20call%20request%20(${app.id}).`;

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                {/* Left: Client Info & Stage */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#7B1131] bg-[#FAF5F7] px-2 py-0.5 rounded-md border border-[#E8D7DC]">
                      {app.id}
                    </span>
                    <span className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                      {app.fullName}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FAF6EE] text-[#7B1131] border border-[#E8DFD0]">
                      {app.stage}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ({app.durationMinutes} Mins Call)
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                    <div className="flex items-center gap-1 font-semibold text-stone-800">
                      <Calendar className="w-3.5 h-3.5 text-[#7B1131]" />
                      <span>{app.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Slot: <strong>{app.preferredTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-stone-400" />
                      <span>{app.country}</span>
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <a
                      href={whatsappChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                      title="Open WhatsApp chat with client"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{app.whatsapp}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                    </a>

                    <a
                      href={`mailto:${app.email}`}
                      className="inline-flex items-center gap-1 text-stone-600 hover:text-[#7B1131]"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{app.email}</span>
                    </a>
                  </div>

                  {/* Discussion Notes if any */}
                  {app.notes && (
                    <div className="mt-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700">
                      <span className="font-semibold text-stone-900">Client Note: </span>
                      <span className="italic">&ldquo;{app.notes}&rdquo;</span>
                    </div>
                  )}
                </div>

                {/* Right: Status Dropdown & Actions */}
                <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-stone-500">Status:</span>
                    <select
                      value={app.status}
                      disabled={updatingId === app.id}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value as CallAppointmentStatus)
                      }
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                        app.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : app.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : app.status === 'completed'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                    title="Delete appointment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
