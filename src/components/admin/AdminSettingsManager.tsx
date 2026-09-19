'use client';

import React, { useState } from 'react';
import { 
  Settings, Key, Shield, Save, RotateCcw, 
  Download, CheckCircle2, Phone, Mail, MapPin, 
  Globe, AlertTriangle
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { usePortalData } from '../../context/PortalDataContext';

export const AdminSettingsManager: React.FC = () => {
  const { resetAllToDefaults, services, products, orders } = useAdminData();
  const { allClientData } = usePortalData();

  // Admin Credentials State
  const [adminEmail, setAdminEmail] = useState('admin@seyol.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Clinic Profile State
  const [clinicName, setClinicName] = useState('SEYOL Sacred Mother & Baby Care Pvt Ltd');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98401 99887');
  const [officialWhatsapp, setOfficialWhatsapp] = useState('+91 98400 12345');
  const [clinicAddress, setClinicAddress] = useState('Nungambakkam, Chennai, Tamil Nadu & River Valley, Singapore');
  const [currency, setCurrency] = useState('INR');

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      alert('Please enter a new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    localStorage.setItem('seyol_custom_admin_password', newPassword.trim());
    setNewPassword('');
    setConfirmPassword('');
    showToast('Master Admin Password updated successfully!');
  };

  const handleDownloadBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      services,
      products,
      orders,
      clientPortals: allClientData,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `SEYOL_Master_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Complete system backup downloaded successfully!');
  };

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all';
  const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5';

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gold/40 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
          System &amp; Workspace Configuration
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
          Platform Settings
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Master administrative credentials, clinic contact configurations, currency preferences, and database management.
        </p>
      </div>

      {/* Section 1: Security & Credentials */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-neutral-100">
          <div className="w-9 h-9 rounded-xl bg-[#7B1131]/10 text-[#7B1131] flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-neutral-900">Admin Authentication &amp; Password</h3>
            <p className="text-xs text-neutral-500">Update the login password required to access the Admin Console.</p>
          </div>
        </div>

        <form onSubmit={handleSavePassword} className="space-y-4 text-xs">
          <div>
            <label className={labelCls}>Administrator Email / Login ID</label>
            <input
              className={inputCls}
              value={adminEmail}
              disabled
              title="Fixed admin identifier"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">Primary authorized administrative identifier.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>New Master Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className={inputCls}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-type new password"
                className={inputCls}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Admin Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Clinic & Helpline Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-neutral-100">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-neutral-900">Clinic Profile &amp; Emergency Helplines</h3>
            <p className="text-xs text-neutral-500">Contact coordinates displayed across patient portal headers and website footer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className={labelCls}>Entity Name / Legal Practice</label>
            <input
              className={inputCls}
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Official WhatsApp Support Helpline</label>
            <input
              className={inputCls}
              value={officialWhatsapp}
              onChange={(e) => setOfficialWhatsapp(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>24/7 Doula Emergency Hotline</label>
            <input
              className={inputCls}
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Clinic Registered Centers</label>
            <input
              className={inputCls}
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => showToast('Clinic coordinates and emergency numbers updated!')}
            className="px-6 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Clinic Coordinates</span>
          </button>
        </div>
      </div>

      {/* Section 3: Data Backup & System Maintenance */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-neutral-100">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-neutral-900">Database Backup &amp; Safe Reset</h3>
            <p className="text-xs text-neutral-500">Download complete snapshot of customer files, products, orders, and content.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Backup (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('CRITICAL: Reset all services, products, and content to default SEYOL configuration?')) {
                resetAllToDefaults();
                showToast('All data reset to SEYOL defaults.');
              }
            }}
            className="w-full sm:w-auto px-6 py-3 border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Entire System to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
