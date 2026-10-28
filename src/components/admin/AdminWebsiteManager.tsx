'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, Home, Layers, Video, Image as ImageIcon, 
  Sparkles, Check, Plus, Trash2, Edit3, Upload, 
  Search, ExternalLink, Play, Star, AlertTriangle, X, CheckCircle2,
  BookOpen, FileText, Download, Users, FileCheck, RotateCcw
} from 'lucide-react';
import { 
  useAdminData, 
  extractYouTubeId, 
  ProductBannerSlide,
  JourneyStageKey,
  StageResourceGuide,
  defaultStageResourceGuides
} from '../../context/AdminDataContext';
import { Service, Testimonial, JourneyStage } from '../../types';
import { downloadGuideFile } from '../../utils/guidePdfGenerator';
import babyBathImg from '../../assets4/baby bath.jpg';
import babyMassageImg from '../../assets4/baby massage.JPG';
import babySleepImg from '../../assets4/baby sleep.JPG';
import motherCareImg from '../../assets4/mother care.jpg';

interface AdminWebsiteManagerProps {
  onNotify?: (msg: string) => void;
}

export const AdminWebsiteManager: React.FC<AdminWebsiteManagerProps> = ({ onNotify }) => {
  const {
    services,
    testimonials,
    productBannerSlides,
    homeSettings,
    stageResourceGuides,
    updateStageResourceGuide,
    guideLeads,
    deleteGuideLead,
    clearGuideLeads,
    updateHomeSettings,
    addService,
    updateService,
    deleteService,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addProductBannerSlide,
    updateProductBannerSlide,
    deleteProductBannerSlide,
  } = useAdminData();

  const [websiteSubTab, setWebsiteSubTab] = useState<'home' | 'services' | 'banners' | 'testimonials' | 'resources'>('home');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [selectedResourceStage, setSelectedResourceStage] = useState<JourneyStageKey>('pregnancy');
  const [resourceForm, setResourceForm] = useState<StageResourceGuide>(
    defaultStageResourceGuides.pregnancy
  );

  useEffect(() => {
    if (stageResourceGuides && stageResourceGuides[selectedResourceStage]) {
      setResourceForm(stageResourceGuides[selectedResourceStage]);
    } else if (defaultStageResourceGuides[selectedResourceStage]) {
      setResourceForm(defaultStageResourceGuides[selectedResourceStage]);
    }
  }, [selectedResourceStage, stageResourceGuides]);

  const notify = (msg: string) => {
    if (onNotify) onNotify(msg);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // ─── Home Settings Form State ──────────────────────────────────────────
  const [homeForm, setHomeForm] = useState({
    founderStoryImage: homeSettings?.founderStoryImage || '',
    founderName: homeSettings?.founderName || 'Mrs. Jemma Francis',
    founderTitle: homeSettings?.founderTitle || 'Founder & Childbirth Educator',
    founderSubtitle: homeSettings?.founderSubtitle || 'Certified Birth & Postpartum Doula • Singapore & India',
    mothersSupported: homeSettings?.mothersSupported || '2,400+',
    familiesSupported: homeSettings?.familiesSupported || '1,800+',
    homeVideoUrl: homeSettings?.homeVideoUrl || 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    homeVideoTitle: homeSettings?.homeVideoTitle || 'Natural Postpartum Healing & Doula Care',
    homeVideoAuthor: homeSettings?.homeVideoAuthor || 'Deepika & Karthik',
    routineBathImage: homeSettings?.routineBathImage || '',
    routineMassageImage: homeSettings?.routineMassageImage || '',
    routineSleepImage: homeSettings?.routineSleepImage || '',
    routineMomCareImage: homeSettings?.routineMomCareImage || '',
  });

  useEffect(() => {
    if (homeSettings) {
      setHomeForm({
        founderStoryImage: homeSettings.founderStoryImage || '',
        founderName: homeSettings.founderName || 'Mrs. Jemma Francis',
        founderTitle: homeSettings.founderTitle || 'Founder & Childbirth Educator',
        founderSubtitle: homeSettings.founderSubtitle || 'Certified Birth & Postpartum Doula • Singapore & India',
        mothersSupported: homeSettings.mothersSupported || '2,400+',
        familiesSupported: homeSettings.familiesSupported || '1,800+',
        homeVideoUrl: homeSettings.homeVideoUrl || 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        homeVideoTitle: homeSettings.homeVideoTitle || 'Natural Postpartum Healing & Doula Care',
        homeVideoAuthor: homeSettings.homeVideoAuthor || 'Deepika & Karthik',
        routineBathImage: homeSettings.routineBathImage || '',
        routineMassageImage: homeSettings.routineMassageImage || '',
        routineSleepImage: homeSettings.routineSleepImage || '',
        routineMomCareImage: homeSettings.routineMomCareImage || '',
      });
    }
  }, [homeSettings]);

  // ─── Services Search & Filter ─────────────────────────────────────────
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('all');

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.summary.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory =
      serviceCategoryFilter === 'all' || s.stages.includes(serviceCategoryFilter as JourneyStage);
    return matchesSearch && matchesCategory;
  });

  // ─── Modals State ─────────────────────────────────────────────────────
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceImageFile, setServiceImageFile] = useState('');

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<ProductBannerSlide | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState('');

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'service' | 'testimonial' | 'banner';
    id: string;
    name: string;
  } | null>(null);

  // ─── Image Upload with Canvas Optimization ────────────────────────────
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          onResult(compressed);
          notify('Image optimized and loaded');
        } else {
          onResult(event.target?.result as string);
          notify('Image loaded');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHomeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeSettings(homeForm);
    notify('Homepage content updated successfully');
  };

  // ─── Stage Resources (E-Books & Guides) Handlers ───────────────────────
  const handleStageDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB. Please select a smaller document or specify an external link.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setResourceForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr,
        fileUrl: dataUrl,
      }));
      notify(`Document loaded: ${file.name} (${sizeStr})`);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveStageResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title.trim()) {
      notify('Document title is required');
      return;
    }
    updateStageResourceGuide(selectedResourceStage, resourceForm);
    notify(`Saved guide document for ${resourceForm.stageLabel}!`);
  };

  const handleTestDownload = () => {
    downloadGuideFile({
      title: resourceForm.title,
      subtitle: resourceForm.subtitle,
      stageLabel: resourceForm.stageLabel,
      badge: resourceForm.badge,
      fileName: resourceForm.fileName,
      fileUrl: resourceForm.fileUrl,
      userName: 'Admin Sample Lead',
      userEmail: 'care@seyol.com',
      highlights: resourceForm.highlights,
    });
    notify(`Initiated test download: ${resourceForm.fileName}`);
  };

  const handleExportLeadsCsv = () => {
    if (!guideLeads || guideLeads.length === 0) {
      notify('No customer leads to export yet');
      return;
    }

    const headers = ['Lead ID', 'Customer Full Name', 'Email Address', 'Care Stage', 'Guide Document', 'Downloaded At'];
    const rows = guideLeads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.stage}"`,
      `"${l.guideTitle.replace(/"/g, '""')}"`,
      `"${new Date(l.downloadedAt).toLocaleString('en-IN')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEYOL-Resource-Leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    notify('Exported guide leads to CSV');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-lg border border-[#C89D4B]/30 animate-fadeIn text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B1131]">
            Content Management System
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
            CMS Portal
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Founder narrative, clinical services catalog, promotional hero banners, and verified mother testimonials.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:border-[#7B1131] hover:text-[#7B1131] transition-colors shrink-0 shadow-xs"
        >
          <Globe className="w-3.5 h-3.5 text-[#C89D4B]" />
          <span>View Live Site</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </Link>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 w-fit max-w-full overflow-x-auto">
        <button
          type="button"
          onClick={() => setWebsiteSubTab('home')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            websiteSubTab === 'home'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home Narrative</span>
        </button>

        <button
          type="button"
          onClick={() => setWebsiteSubTab('services')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            websiteSubTab === 'services'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services Catalog</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {services.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setWebsiteSubTab('banners')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            websiteSubTab === 'banners'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hero Banners</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {productBannerSlides.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setWebsiteSubTab('testimonials')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            websiteSubTab === 'testimonials'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Mother Testimonials</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {testimonials.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setWebsiteSubTab('resources')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            websiteSubTab === 'resources'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Stage Resources (E-Books)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {Object.keys(stageResourceGuides || defaultStageResourceGuides).length}
          </span>
        </button>
      </div>

      {/* ─── TAB 1: HOME NARRATIVE ────────────────────────────────────────── */}
      {websiteSubTab === 'home' && (
        <form onSubmit={handleSaveHomeSettings} className="space-y-6">
          {/* Founder Section Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Founder Narrative &amp; Brand Story
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Appears on the homepage and about section with authenticated credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Photo Upload & Preview */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Founder Portrait Photo
                </label>
                <div className="w-full aspect-4/5 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative group">
                  <img
                    src={homeForm.founderStoryImage || 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800'}
                    alt={homeForm.founderName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                    <label className="px-3 py-2 rounded-lg bg-white text-stone-900 font-semibold text-xs cursor-pointer shadow-md flex items-center space-x-1.5 hover:bg-stone-50">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (b64) => setHomeForm({ ...homeForm, founderStoryImage: b64 }))}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={homeForm.founderStoryImage}
                    onChange={(e) => setHomeForm({ ...homeForm, founderStoryImage: e.target.value })}
                    placeholder="Or paste image URL"
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Founder Copy Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Founder Full Name
                    </label>
                    <input
                      type="text"
                      value={homeForm.founderName}
                      onChange={(e) => setHomeForm({ ...homeForm, founderName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Professional Role Title
                    </label>
                    <input
                      type="text"
                      value={homeForm.founderTitle}
                      onChange={(e) => setHomeForm({ ...homeForm, founderTitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Credentials &amp; Regional Accreditation
                  </label>
                  <input
                    type="text"
                    value={homeForm.founderSubtitle}
                    onChange={(e) => setHomeForm({ ...homeForm, founderSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    required
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    E.g., Certified Birth &amp; Postpartum Doula • Singapore &amp; India
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Mothers Supported Counter
                    </label>
                    <input
                      type="text"
                      value={homeForm.mothersSupported}
                      onChange={(e) => setHomeForm({ ...homeForm, mothersSupported: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">Displayed in statistics trust bar</span>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Families Supported Counter
                    </label>
                    <input
                      type="text"
                      value={homeForm.familiesSupported}
                      onChange={(e) => setHomeForm({ ...homeForm, familiesSupported: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">Displayed in homepage hero stats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop by Routine Images Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Shop by Routine Images
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update the photos displayed in the &ldquo;Shop by Routine&rdquo; section on the Start Here homepage.
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#7B1131]/10 text-[#7B1131] w-fit">
                4 Routine Cards
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  key: 'routineBathImage' as const,
                  label: 'Bath Time',
                  badge: 'Card 1',
                  description: 'Baby bath & wash ritual',
                  defaultImg: babyBathImg.src,
                },
                {
                  key: 'routineMassageImage' as const,
                  label: 'Baby Massage',
                  badge: 'Card 2',
                  description: 'Infant massage & oil ritual',
                  defaultImg: babyMassageImg.src,
                },
                {
                  key: 'routineSleepImage' as const,
                  label: 'Bedtime Routine',
                  badge: 'Card 3',
                  description: 'Calming bedtime & sleep ritual',
                  defaultImg: babySleepImg.src,
                },
                {
                  key: 'routineMomCareImage' as const,
                  label: "Mom's Self-Care",
                  badge: 'Card 4',
                  description: 'Postpartum mother care & recovery',
                  defaultImg: motherCareImg.src,
                },
              ].map((cfg) => {
                const currentVal = homeForm[cfg.key];
                const previewSrc = currentVal || cfg.defaultImg;
                const isCustom = Boolean(currentVal);

                return (
                  <div
                    key={cfg.key}
                    className="bg-stone-50/70 border border-stone-200/90 rounded-xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          {cfg.badge}
                        </span>
                        {isCustom ? (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Customized
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                            Default Photo
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-stone-900 text-sm">
                        {cfg.label}
                      </h3>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {cfg.description}
                      </p>
                    </div>

                    {/* Photo Preview & Hover Upload */}
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 relative group">
                      <img
                        src={previewSrc}
                        alt={cfg.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-stone-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <label className="px-3 py-1.5 rounded-lg bg-white text-stone-900 font-semibold text-xs cursor-pointer shadow-md flex items-center space-x-1.5 hover:bg-stone-50 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#7B1131]" />
                          <span>Replace Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (b64) =>
                                setHomeForm((prev) => ({ ...prev, [cfg.key]: b64 }))
                              )
                            }
                          />
                        </label>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() =>
                              setHomeForm((prev) => ({ ...prev, [cfg.key]: '' }))
                            }
                            className="px-2.5 py-1 rounded-md bg-stone-900/90 hover:bg-stone-900 text-stone-200 text-[11px] font-medium flex items-center space-x-1 shadow-xs transition-colors"
                          >
                            <RotateCcw className="w-3 h-3 text-stone-300" />
                            <span>Reset to Default</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* URL Input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        Image URL / Data
                      </label>
                      <input
                        type="text"
                        value={currentVal || ''}
                        onChange={(e) =>
                          setHomeForm((prev) => ({ ...prev, [cfg.key]: e.target.value }))
                        }
                        placeholder="Or paste image URL"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Video Section Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Homepage Featured Clinical &amp; Care Video
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Embedded YouTube video showing real maternal doula care and natural postnatal recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={homeForm.homeVideoUrl}
                    onChange={(e) => setHomeForm({ ...homeForm, homeVideoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Video Heading Title
                    </label>
                    <input
                      type="text"
                      value={homeForm.homeVideoTitle}
                      onChange={(e) => setHomeForm({ ...homeForm, homeVideoTitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Parents / Family Attributed
                    </label>
                    <input
                      type="text"
                      value={homeForm.homeVideoAuthor}
                      onChange={(e) => setHomeForm({ ...homeForm, homeVideoAuthor: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Preview Frame
                </span>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-xs flex items-center justify-center">
                  {extractYouTubeId(homeForm.homeVideoUrl) ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(homeForm.homeVideoUrl)}`}
                      title="Video preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <div className="text-center p-4 text-stone-400">
                      <Play className="w-6 h-6 mx-auto mb-1 text-stone-500" />
                      <span className="text-[11px]">Valid YouTube URL needed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Home Content</span>
            </button>
          </div>
        </form>
      )}

      {/* ─── TAB 2: SERVICES CATALOG ──────────────────────────────────────── */}
      {websiteSubTab === 'services' && (
        <div className="space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Search care services by title or summary..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <select
                value={serviceCategoryFilter}
                onChange={(e) => setServiceCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131] text-stone-700 font-medium"
              >
                <option value="all">All Stages</option>
                <option value="postpartum">Postpartum</option>
                <option value="pregnancy">Pregnancy</option>
                <option value="newborn">Newborn</option>
                <option value="birth">Labor &amp; Birth</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingService(null);
                setServiceImageFile('');
                setIsServiceModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Service</span>
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#7B1131]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative bg-stone-100 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      {service.stages.map((stage) => (
                        <span
                          key={stage}
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#7B1131] shadow-xs"
                        >
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                        {service.title}
                      </h3>
                      <span className="text-xs font-bold text-[#7B1131] shrink-0">
                        {service.pricingGuide}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {service.summary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                      <span>Duration: <strong className="text-stone-700">{service.duration}</strong></span>
                      <span>•</span>
                      <span>{service.recommendedTimeline}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-stone-400 truncate">
                    /{service.slug}
                  </span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(service);
                        setServiceImageFile(service.heroImage);
                        setIsServiceModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-[#7B1131] hover:bg-white transition-colors"
                      title="Edit Service"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'service',
                        id: service.id,
                        name: service.title,
                      })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-white transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-2">
              <Layers className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs font-semibold text-stone-700">No services match your search or filter</p>
              <p className="text-[11px] text-stone-400">Try adjusting your keywords or clearing the stage filter.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: HERO BANNERS ─────────────────────────────────────────── */}
      {websiteSubTab === 'banners' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Hero Announcement &amp; Promotion Slides
              </h2>
              <p className="text-xs text-stone-500">
                Hero banner slides visible across product and store showcases.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingBanner(null);
                setBannerImageFile('');
                setIsBannerModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Banner Slide</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productBannerSlides.map((slide) => (
              <div
                key={slide.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 w-full relative bg-stone-900 overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#7B1131] text-white shadow-xs">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {slide.subtitle}
                    </p>
                    {slide.productNames && (
                      <p className="text-[11px] text-stone-400 italic pt-1 truncate">
                        {slide.productNames}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 font-medium">
                    CTA: <strong className="text-stone-700">{slide.ctaText || 'Learn More'}</strong>
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBanner(slide);
                        setBannerImageFile(slide.image);
                        setIsBannerModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-[#7B1131] hover:bg-white"
                      title="Edit Banner"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'banner',
                        id: slide.id,
                        name: slide.title,
                      })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-white"
                      title="Delete Banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: TESTIMONIALS ─────────────────────────────────────────── */}
      {websiteSubTab === 'testimonials' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Verified Mother Video &amp; Written Stories
              </h2>
              <p className="text-xs text-stone-500">
                Genuine reflections from postpartum mothers and families supported in Chennai and Singapore.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingTestimonial(null);
                setVideoUrlInput('');
                setIsTestimonialModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-stone-900">
                        {test.author}
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        {test.location || 'Mother'} • {test.stage}
                      </p>
                    </div>

                    <div className="flex items-center text-amber-500 space-x-0.5">
                      {[...Array(test.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 italic leading-relaxed line-clamp-3">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  {test.youtubeUrl && (
                    <div className="flex items-center space-x-1.5 text-[11px] text-[#7B1131] font-semibold">
                      <Play className="w-3 h-3" />
                      <span>Has Video Reflection</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">
                    {test.serviceOrProduct || 'Postpartum Doula Care'}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(test);
                        setVideoUrlInput(test.youtubeUrl || '');
                        setIsTestimonialModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-[#7B1131] hover:bg-stone-50"
                      title="Edit Story"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'testimonial',
                        id: test.id,
                        name: test.author,
                      })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-50"
                      title="Delete Story"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 5: STAGE RESOURCES & E-BOOKS (LEAD MAGNET GUIDES) ───────── */}
      {websiteSubTab === 'resources' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131] text-[10px] font-bold uppercase tracking-wider mb-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Free Resource Management</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  Stage Resources &amp; Free E-Book Handbooks
                </h2>
                <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
                  Upload and manage the downloadable handbooks for the <strong>&ldquo;Your First SEYOL Resource&rdquo;</strong> section. 
                  When a customer selects their stage and enters their Full Name and Email, they instantly receive and download this exact document.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={handleExportLeadsCsv}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Leads (CSV)</span>
                </button>
              </div>
            </div>

            {/* Stage Selector Pills */}
            <div className="space-y-2 pt-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Select Stage to Upload &amp; Edit Guide Document:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { key: 'pregnancy' as JourneyStageKey, num: '01', title: 'Currently Pregnant', sub: '2nd / 3rd Trimester' },
                  { key: 'postpartum' as JourneyStageKey, num: '02', title: 'Newly Postpartum', sub: 'First 40 Days' },
                  { key: 'newborn' as JourneyStageKey, num: '03', title: 'Parent of Newborn', sub: '0–12 Months' },
                  { key: 'preconception' as JourneyStageKey, num: '04', title: 'Trying to Conceive', sub: 'Planning Ahead' },
                ].map((stg) => {
                  const isSelected = selectedResourceStage === stg.key;
                  const currentDoc = stageResourceGuides?.[stg.key] || defaultStageResourceGuides[stg.key];
                  return (
                    <button
                      key={stg.key}
                      type="button"
                      onClick={() => setSelectedResourceStage(stg.key)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#7B1131] border-[#7B1131] text-white shadow-sm ring-2 ring-[#7B1131]/20'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${
                          isSelected ? 'text-[#C89D4B]' : 'text-stone-400'
                        }`}>
                          STAGE {stg.num}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C89D4B]" />
                        )}
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm">
                        {stg.title}
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                        {stg.sub}
                      </div>
                      <div className={`text-[10px] truncate mt-2 pt-2 border-t font-mono ${
                        isSelected ? 'border-white/15 text-stone-200' : 'border-stone-200 text-stone-500'
                      }`}>
                        📄 {currentDoc?.fileName || 'Standard PDF'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Document Upload & Edit Form + Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column */}
            <form onSubmit={handleSaveStageResource} className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                    Editing Document for:
                  </span>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {resourceForm.stageLabel}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleTestDownload}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Test download what customer receives"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Test Download</span>
                </button>
              </div>

              {/* Document File Upload Box */}
              <div className="p-4 rounded-xl bg-stone-50 border-2 border-dashed border-stone-300 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#7B1131]/10 text-[#7B1131] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-stone-900 truncate max-w-xs sm:max-w-sm">
                        {resourceForm.fileName || 'No custom file uploaded'}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {resourceForm.fileSize || 'Standard Size'} • {resourceForm.pageCount || 'Multi-Page PDF'}
                        {resourceForm.fileUrl ? (
                          <span className="ml-2 font-bold text-emerald-700">✓ Custom Upload Active</span>
                        ) : (
                          <span className="ml-2 text-stone-400">(Built-in Template)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs space-x-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PDF / Doc</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleStageDocUpload}
                    />
                  </label>
                </div>

                {resourceForm.fileUrl && (
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-200">
                    <span className="text-emerald-700 font-medium">
                      ✓ Ready for immediate download upon customer form submission
                    </span>
                    <button
                      type="button"
                      onClick={() => setResourceForm((prev) => ({ ...prev, fileUrl: undefined }))}
                      className="text-stone-500 hover:text-red-600 underline"
                    >
                      Revert to standard template
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Badge */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Badge Tag (Shown above title)
                  </label>
                  <input
                    type="text"
                    value={resourceForm.badge}
                    onChange={(e) => setResourceForm({ ...resourceForm, badge: e.target.value })}
                    required
                    placeholder="e.g. Complimentary Fourth Trimester Guide"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Guide Title *
                  </label>
                  <input
                    type="text"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                    required
                    placeholder="e.g. Download &ldquo;The Sacred 40 Days: South Indian Confinement Wisdom&rdquo;"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Subtitle / Summary Description
                  </label>
                  <textarea
                    rows={3}
                    value={resourceForm.subtitle}
                    onChange={(e) => setResourceForm({ ...resourceForm, subtitle: e.target.value })}
                    required
                    placeholder="Detailed overview of what is contained in this document..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      File Name
                    </label>
                    <input
                      type="text"
                      value={resourceForm.fileName}
                      onChange={(e) => setResourceForm({ ...resourceForm, fileName: e.target.value })}
                      required
                      placeholder="e.g. SEYOL-Guide.pdf"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Page Count
                    </label>
                    <input
                      type="text"
                      value={resourceForm.pageCount || ''}
                      onChange={(e) => setResourceForm({ ...resourceForm, pageCount: e.target.value })}
                      placeholder="e.g. 36 Pages"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      File Size
                    </label>
                    <input
                      type="text"
                      value={resourceForm.fileSize || ''}
                      onChange={(e) => setResourceForm({ ...resourceForm, fileSize: e.target.value })}
                      placeholder="e.g. 5.8 MB"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                    />
                  </div>
                </div>

                {/* Highlights (3 points) */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                    Key Highlights / Feature Pills (3 Points)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[0, 1, 2].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={resourceForm.highlights?.[idx] || ''}
                        onChange={(e) => {
                          const updated = [...(resourceForm.highlights || ['', '', ''])];
                          updated[idx] = e.target.value;
                          setResourceForm({ ...resourceForm, highlights: updated });
                        }}
                        placeholder={`Point ${idx + 1}`}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Save Button */}
              <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-stone-100">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-2 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Stage Document</span>
                </button>
              </div>
            </form>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Live Customer Card Preview
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Synchronized
                  </span>
                </div>

                {/* Mini replica of the maroon customer card */}
                <div className="bg-[#7B1131] text-[#FAF8F5] rounded-2xl p-5 border border-[#C89D4B]/40 shadow-md space-y-3 font-sans relative overflow-hidden">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#C89D4B]/20 text-[#E6C687] text-[10px] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#C89D4B]" />
                    <span>{resourceForm.badge || 'COMPLIMENTARY GUIDE'}</span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#FAF8F5] leading-snug">
                    {resourceForm.title || 'Guide Title'}
                  </h4>

                  <p className="text-[11px] text-[#FAF8F5]/80 line-clamp-3 leading-relaxed">
                    {resourceForm.subtitle || 'Guide description will appear here...'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 text-[10px] text-[#E6C687] pt-1">
                    {(resourceForm.highlights || []).map((h, i) => (
                      <span key={i} className="bg-black/20 px-2 py-0.5 rounded-md">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#FAF8F5]/70">
                    <span className="truncate max-w-[200px]">📄 {resourceForm.fileName}</span>
                    <span>{resourceForm.fileSize}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-800">Customer Download Flow:</div>
                  <ol className="list-decimal list-inside space-y-0.5 text-[10px]">
                    <li>Customer enters their <strong>Full Name</strong> &amp; <strong>Email Address</strong>.</li>
                    <li>Selects <strong>Your Stage</strong> from the dropdown.</li>
                    <li>Clicks <strong>Receive Free Guide</strong>.</li>
                    <li>The system validates their details and instantly downloads this exact PDF document.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Leads Table */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#7B1131]" />
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Recent Customer Leads &amp; Verified Downloads ({guideLeads?.length || 0})
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                {guideLeads && guideLeads.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all recorded guide leads?')) {
                        clearGuideLeads();
                        notify('Cleared all guide leads');
                      }
                    }}
                    className="text-[11px] text-stone-500 hover:text-red-600 font-medium px-2 py-1"
                  >
                    Clear History
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleExportLeadsCsv}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {guideLeads && guideLeads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Customer Name</th>
                      <th className="py-2.5 px-3">Email Address</th>
                      <th className="py-2.5 px-3">Care Stage</th>
                      <th className="py-2.5 px-3">Downloaded Guide</th>
                      <th className="py-2.5 px-3">Date &amp; Time</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {guideLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-stone-900">
                          {lead.fullName}
                        </td>
                        <td className="py-2.5 px-3 text-stone-600 font-mono text-[11px]">
                          {lead.email}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7B1131]/10 text-[#7B1131] uppercase">
                            {lead.stage}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-stone-700 max-w-xs truncate">
                          {lead.guideTitle}
                        </td>
                        <td className="py-2.5 px-3 text-stone-400 text-[11px]">
                          {new Date(lead.downloadedAt).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              deleteGuideLead(lead.id);
                              notify(`Removed lead: ${lead.fullName}`);
                            }}
                            className="p-1 rounded text-stone-400 hover:text-red-600"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-stone-400 text-xs space-y-1">
                <FileCheck className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p className="font-semibold text-stone-600">No leads recorded yet.</p>
                <p className="text-[11px]">When visitors enter their name &amp; email on the website, they will appear here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT SERVICE ───────────────────────────────────── */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingService ? editingService.title : 'Create Clinical Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || 'New Service';
                const slug = editingService?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                const updatedData: Service = {
                  id: editingService?.id || `service-${Date.now()}`,
                  slug: slug,
                  title: title,
                  shortTitle: (formData.get('shortTitle') as string) || title,
                  tagline: (formData.get('tagline') as string) || '',
                  summary: (formData.get('summary') as string) || '',
                  category: (formData.get('category') as any) || 'hands-on-care',
                  stages: [(formData.get('stage') as JourneyStage) || 'postpartum'],
                  duration: (formData.get('duration') as string) || '2 Hours',
                  pricingGuide: (formData.get('pricingGuide') as string) || 'From ₹4,500',
                  heroImage: serviceImageFile || (formData.get('heroImageUrl') as string) || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
                  processImage: editingService?.processImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
                  benefitImages: editingService?.benefitImages || ['https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800'],
                  benefit: editingService?.benefit || 'Holistic postnatal recuperation and balance.',
                  bestFor: editingService?.bestFor || 'New mothers and infants.',
                  recommendedTimeline: (formData.get('recommendedTimeline') as string) || 'From Day 7',
                  format: editingService?.format || 'In-Home (Chennai / Tamil Nadu)',
                  depositInfo: editingService?.depositInfo || '20% deposit required upon confirmation.',
                  features: editingService?.features || [],
                  inclusions: editingService?.inclusions || [],
                  preparation: editingService?.preparation || [],
                  contraindications: editingService?.contraindications || [],
                  faqIds: editingService?.faqIds || [],
                  testimonials: editingService?.testimonials || [],
                };

                if (editingService) {
                  updateService(editingService.id, updatedData);
                  notify(`Updated service: ${updatedData.title}`);
                } else {
                  addService(updatedData);
                  notify(`Created new service: ${updatedData.title}`);
                }
                setIsServiceModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* Photo Upload Row */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center space-x-3.5">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-200 shrink-0">
                  <img
                    src={serviceImageFile || editingService?.heroImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'}
                    alt="Service preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-[11px] cursor-pointer shadow-xs space-x-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (b64) => setServiceImageFile(b64))}
                    />
                  </label>
                  <p className="text-[10px] text-stone-400">Square or 4:3 high-resolution landscape</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Service Full Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingService?.title}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Short Menu Title
                  </label>
                  <input
                    type="text"
                    name="shortTitle"
                    defaultValue={editingService?.shortTitle}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Care Stage
                  </label>
                  <select
                    name="stage"
                    defaultValue={editingService?.stages[0] || 'postpartum'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value="postpartum">Postpartum</option>
                    <option value="pregnancy">Pregnancy</option>
                    <option value="newborn">Newborn</option>
                    <option value="birth">Labor &amp; Birth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingService?.duration || '2 Hours'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pricing Guide
                  </label>
                  <input
                    type="text"
                    name="pricingGuide"
                    defaultValue={editingService?.pricingGuide || 'From ₹4,500'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Tagline / Essence
                </label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={editingService?.tagline}
                  placeholder="E.g., Sacred Traditional Confinement &amp; Belly Binding"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Clinical Summary &amp; Overview
                </label>
                <textarea
                  name="summary"
                  rows={3}
                  defaultValue={editingService?.summary}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-xs shadow-xs"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT BANNER SLIDE ─────────────────────────────── */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900">
                {editingBanner ? 'Edit Banner Slide' : 'Create Hero Banner'}
              </h3>
              <button
                type="button"
                onClick={() => setIsBannerModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updated: ProductBannerSlide = {
                  id: editingBanner?.id || `banner-${Date.now()}`,
                  title: (formData.get('title') as string) || 'New Banner',
                  subtitle: (formData.get('subtitle') as string) || '',
                  badge: (formData.get('badge') as string) || 'OFFICIAL SEYOL FORMULATION',
                  productNames: (formData.get('productNames') as string) || '',
                  ctaText: (formData.get('ctaText') as string) || 'Explore',
                  image: bannerImageFile || (formData.get('imageUrl') as string) || '/images/products-hero-banner.png',
                };

                if (editingBanner) {
                  updateProductBannerSlide(editingBanner.id, updated);
                  notify('Banner updated');
                } else {
                  addProductBannerSlide(updated);
                  notify('Banner added');
                }
                setIsBannerModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  name="badge"
                  defaultValue={editingBanner?.badge || 'OFFICIAL SEYOL BOTANICAL FORMULATION'}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Headline Title *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingBanner?.title}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Supporting Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={editingBanner?.subtitle}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Product Mentions / Ingredients
                </label>
                <input
                  type="text"
                  name="productNames"
                  defaultValue={editingBanner?.productNames}
                  placeholder="E.g., Sweet Almond & Nilgiri Botanicals"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    name="ctaText"
                    defaultValue={editingBanner?.ctaText || 'Shop Now'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Image File
                  </label>
                  <label className="w-full px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-center cursor-pointer block truncate">
                    <span>{bannerImageFile ? 'Selected (Base64)' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (b64) => setBannerImageFile(b64))}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold shadow-xs"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT TESTIMONIAL ──────────────────────────────── */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900">
                {editingTestimonial ? 'Edit Mother Story' : 'Add Mother Reflection'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTestimonialModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const quoteText = (formData.get('quote') as string) || '';
                const updated: Testimonial = {
                  id: editingTestimonial?.id || `test-${Date.now()}`,
                  author: (formData.get('author') as string) || 'Verified Mother',
                  location: (formData.get('location') as string) || 'Chennai, India',
                  stage: editingTestimonial?.stage || 'postpartum',
                  serviceOrProduct: (formData.get('serviceOrProduct') as string) || 'Sacred Confinement & Matron Care',
                  quote: quoteText,
                  detailedStory: editingTestimonial?.detailedStory || quoteText,
                  rating: Number(formData.get('rating')) || 5,
                  verifiedParent: true,
                  youtubeUrl: videoUrlInput || (formData.get('youtubeUrl') as string) || '',
                };

                if (editingTestimonial) {
                  updateTestimonial(editingTestimonial.id, updated);
                  notify('Testimonial updated');
                } else {
                  addTestimonial(updated);
                  notify('Testimonial created');
                }
                setIsTestimonialModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Mother&#39;s Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={editingTestimonial?.author}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingTestimonial?.location || 'Chennai, Tamil Nadu'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Service Experienced
                </label>
                <input
                  type="text"
                  name="serviceOrProduct"
                  defaultValue={editingTestimonial?.serviceOrProduct || 'Sacred Confinement & Matron Care'}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Mother&#39;s Written Reflection *
                </label>
                <textarea
                  name="quote"
                  rows={3}
                  defaultValue={editingTestimonial?.quote}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Optional YouTube Video URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold shadow-xs"
                >
                  Save Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: SHARED DELETE CONFIRMATION ──────────────────────────── */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Delete {deleteConfirmation.type}?
              </h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove <strong className="text-stone-800">{deleteConfirmation.name}</strong>? This action takes effect immediately.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
              >
                Keep Item
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmation.type === 'service') {
                    deleteService(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'testimonial') {
                    deleteTestimonial(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'banner') {
                    deleteProductBannerSlide(deleteConfirmation.id);
                  }
                  notify(`Deleted ${deleteConfirmation.name}`);
                  setDeleteConfirmation(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
