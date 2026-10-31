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
  defaultStageResourceGuides,
  WhyTrustVideoStory
} from '../../context/AdminDataContext';
import { Service, Testimonial, JourneyStage } from '../../types';
import { downloadGuideFile } from '../../utils/guidePdfGenerator';
import babyBathImg from '../../assets4/baby bath.jpg';
import babyMassageImg from '../../assets4/baby massage.JPG';
import babySleepImg from '../../assets4/baby sleep.JPG';
import motherCareImg from '../../assets4/mother care.jpg';
import heroBg1 from '../../assets4/ChatGPT Image Aug 25, 2026, 09_09_24 AM.png';
import heroBg2 from '../../assets4/ChatGPT Image Aug 25, 2026, 09_12_27 AM.png';
import heroBg3 from '../../assets4/ChatGPT Image Aug 25, 2026, 08_26_15 AM.png';

interface AdminWebsiteManagerProps {
  onNotify?: (msg: string) => void;
}

export const AdminWebsiteManager: React.FC<AdminWebsiteManagerProps> = ({ onNotify }) => {
  const {
    services,
    servicesSettings,
    updateServicesSettings,
    resetServicesSettings,
    resetServicesToDefault,
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
    resetTestimonials,
    addProductBannerSlide,
    updateProductBannerSlide,
    deleteProductBannerSlide,
    whyTrustVideos,
    addWhyTrustVideo,
    updateWhyTrustVideo,
    deleteWhyTrustVideo,
    resetWhyTrustVideos,
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

  // ─── Services Header Settings Form State ───────────────────────────────
  const [servicesHeaderForm, setServicesHeaderForm] = useState({
    sectionBadge: servicesSettings?.sectionBadge || 'YOUR JOURNEY, YOUR WAY',
    sectionTitle: servicesSettings?.sectionTitle || 'Tell Us What You Need Help With',
    sectionSubtitle: servicesSettings?.sectionSubtitle || "Choose what feels right for you. We'll help you find the right care.",
    searchPlaceholder: servicesSettings?.searchPlaceholder || 'Search by need: massage, belly binding, nanny, doula...',
  });

  useEffect(() => {
    if (servicesSettings) {
      setServicesHeaderForm({
        sectionBadge: servicesSettings.sectionBadge || 'YOUR JOURNEY, YOUR WAY',
        sectionTitle: servicesSettings.sectionTitle || 'Tell Us What You Need Help With',
        sectionSubtitle: servicesSettings.sectionSubtitle || "Choose what feels right for you. We'll help you find the right care.",
        searchPlaceholder: servicesSettings.searchPlaceholder || 'Search by need: massage, belly binding, nanny, doula...',
      });
    }
  }, [servicesSettings]);

  const handleSaveServicesSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateServicesSettings(servicesHeaderForm);
    notify('Services section header updated successfully');
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
    heroSlide1Image: homeSettings?.heroSlide1Image || '',
    heroSlide2Image: homeSettings?.heroSlide2Image || '',
    heroSlide3Image: homeSettings?.heroSlide3Image || '',
    heroSlide4Image: homeSettings?.heroSlide4Image || '',
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
        heroSlide1Image: homeSettings.heroSlide1Image || '',
        heroSlide2Image: homeSettings.heroSlide2Image || '',
        heroSlide3Image: homeSettings.heroSlide3Image || '',
        heroSlide4Image: homeSettings.heroSlide4Image || '',
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
  const [serviceFormatInput, setServiceFormatInput] = useState('');
  const [serviceStagesInput, setServiceStagesInput] = useState<JourneyStage[]>(['postpartum']);
  const [serviceImagePositionInput, setServiceImagePositionInput] = useState('center 35%');

  const handleOpenServiceModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceImageFile(service.heroImage || '');
      setServiceFormatInput(service.format || 'In-Home (Chennai / Tamil Nadu)');
      setServiceStagesInput(service.stages && service.stages.length > 0 ? service.stages : ['postpartum']);
      setServiceImagePositionInput(service.imagePosition || 'center 35%');
    } else {
      setEditingService(null);
      setServiceImageFile('');
      setServiceFormatInput('In-Home (Chennai / Tamil Nadu)');
      setServiceStagesInput(['postpartum']);
      setServiceImagePositionInput('center 35%');
    }
    setIsServiceModalOpen(true);
  };

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<ProductBannerSlide | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState('');

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const [isRealStoryModalOpen, setIsRealStoryModalOpen] = useState(false);
  const [editingRealStory, setEditingRealStory] = useState<Testimonial | null>(null);
  const [realStoryVideoUrlInput, setRealStoryVideoUrlInput] = useState('');
  const [realStoryThumbnailInput, setRealStoryThumbnailInput] = useState('');

  const handleOpenRealStoryModal = (story?: Testimonial) => {
    if (story) {
      setEditingRealStory(story);
      setRealStoryVideoUrlInput(story.youtubeUrl || '');
      setRealStoryThumbnailInput(story.thumbnailImage || '');
    } else {
      setEditingRealStory(null);
      setRealStoryVideoUrlInput('');
      setRealStoryThumbnailInput('');
    }
    setIsRealStoryModalOpen(true);
  };

  const [isWhyTrustModalOpen, setIsWhyTrustModalOpen] = useState(false);
  const [editingWhyTrustVideo, setEditingWhyTrustVideo] = useState<WhyTrustVideoStory | null>(null);
  const [whyTrustVideoUrlInput, setWhyTrustVideoUrlInput] = useState('');

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'service' | 'testimonial' | 'banner' | 'whyTrustVideo';
    id: string;
    name: string;
  } | null>(null);

  const handleVideoFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('Video file exceeds 25MB. For high-definition videos, we recommend pasting a YouTube video URL for smoother loading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onResult(reader.result as string);
      notify('Video file loaded successfully');
    };
    reader.readAsDataURL(file);
  };

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
          {/* Start Here Hero Carousel Images Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Start Here Hero Carousel Images
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update and customize the rotating background images for the 4 hero slides on the Start Here homepage.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#7B1131]/10 text-[#7B1131] w-fit">
                  4 Hero Slides
                </span>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-[#7B1131] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Preview Page</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  key: 'heroSlide1Image' as const,
                  label: 'Slide 1: Care Journey',
                  badge: 'Main Brand Hero',
                  description: 'Sacred South Indian Postnatal Heritage',
                  defaultImg: heroBg3.src,
                },
                {
                  key: 'heroSlide2Image' as const,
                  label: 'Slide 2: Masterclasses',
                  badge: 'Classes & Education',
                  description: 'Parent education & confident care',
                  defaultImg: heroBg1.src,
                },
                {
                  key: 'heroSlide3Image' as const,
                  label: 'Slide 3: Products & Herbs',
                  badge: 'Botanical Essentials',
                  description: 'Sacred 100% Herbal Essentials',
                  defaultImg: heroBg2.src,
                },
                {
                  key: 'heroSlide4Image' as const,
                  label: 'Slide 4: Resources',
                  badge: 'Guides & Handbooks',
                  description: 'Evidence-based guidance & checklists',
                  defaultImg: heroBg3.src,
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
                    <div className="w-full aspect-16/10 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 relative group">
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

          {/* Real Stories, Healing Touch & Video Journeys Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131] text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Video className="w-3 h-3" />
                  <span>Start Here Homepage Carousel</span>
                </div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Real Stories, Healing Touch &amp; Video Journeys
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage the authentic client video stories and reflections displayed in the video carousel on the Start Here homepage.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#7B1131]/10 text-[#7B1131]">
                  {testimonials.length} Video Stories
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenRealStoryModal()}
                  className="px-3 py-1.5 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Video Story</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all video stories in the carousel to the default authentic client videos?')) {
                      resetTestimonials();
                      notify('Restored default client video stories');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Reset to original 6 client video stories"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-[#7B1131] transition-colors ml-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Preview Page</span>
                </Link>
              </div>
            </div>

            {/* Video Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((story, idx) => {
                const vId = extractYouTubeId(story.youtubeUrl);
                const thumb =
                  story.thumbnailImage ||
                  (vId
                    ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg`
                    : 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800');

                // Map stage to clean badge colors & labels
                const stageConfig: Record<string, { label: string; cls: string }> = {
                  newborn: { label: 'Infant Bath & Colic', cls: 'bg-sky-50 text-sky-700 border-sky-200' },
                  postpartum: { label: 'Confinement & Massage', cls: 'bg-[#7B1131]/10 text-[#7B1131] border-[#7B1131]/20' },
                  pregnancy: { label: 'Pregnancy & Doula', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
                  preconception: { label: 'Preconception', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                };
                const stg = stageConfig[story.stage || 'postpartum'] || {
                  label: story.stage || 'Care Story',
                  cls: 'bg-stone-100 text-stone-700 border-stone-200',
                };

                return (
                  <div
                    key={story.id || idx}
                    className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3.5 hover:shadow-xs transition-shadow"
                  >
                    <div className="space-y-3">
                      {/* Video Thumbnail Preview */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-stone-200 group">
                        <img
                          src={thumb}
                          alt={story.author}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-md pl-0.5 group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white" />
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs ${stg.cls}`}>
                            {stg.label}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-black/70 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                            {story.videoDuration || 'Video'}
                          </span>
                        </div>
                      </div>

                      {/* Author & Info */}
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-serif font-bold text-stone-900 text-sm leading-tight">
                            {story.author}
                          </h3>
                          <div className="flex items-center text-amber-500 shrink-0">
                            {[...Array(story.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {story.location || 'Singapore'} • <span className="font-medium text-[#7B1131]">{story.serviceOrProduct}</span>
                        </p>
                      </div>

                      {/* Quote */}
                      <p className="text-xs text-stone-600 italic line-clamp-2 leading-relaxed">
                        &ldquo;{story.quote}&rdquo;
                      </p>

                      {/* YouTube Link */}
                      {story.youtubeUrl && (
                        <div className="pt-1">
                          <a
                            href={story.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-[#7B1131] hover:underline font-medium truncate max-w-full"
                          >
                            <Play className="w-3 h-3 fill-[#7B1131] shrink-0" />
                            <span className="truncate">{story.youtubeUrl}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-stone-400 font-mono">
                        #{idx + 1} Carousel Slide
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenRealStoryModal(story)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#7B1131] hover:border-[#7B1131]/30 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Video</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmation({
                            type: 'testimonial',
                            id: story.id,
                            name: story.author,
                          })}
                          className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Story"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
        <div className="space-y-6">
          {/* ── Why Families Trust SEYOL Video Management Card ── */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#7B1131]/10 text-[#7B1131]">
                    Services Page Carousel
                  </span>
                  <span className="text-xs text-stone-300">•</span>
                  <span className="text-xs text-stone-500 font-medium">
                    {whyTrustVideos.length} {whyTrustVideos.length === 1 ? 'Video Story' : 'Video Stories'}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-stone-900 mt-1">
                  Why Families Trust SEYOL — Video Carousel
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage, replace, and upload the care journey videos shown in the &ldquo;Why Families Trust SEYOL&rdquo; section on the Services page.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    resetWhyTrustVideos();
                    notify('Reset video carousel to default 3 care stories');
                  }}
                  className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Restore original 3 video stories"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingWhyTrustVideo(null);
                    setWhyTrustVideoUrlInput('');
                    setIsWhyTrustModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Video Story</span>
                </button>
              </div>
            </div>

            {/* Video Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyTrustVideos.map((story, idx) => {
                const ytId = extractYouTubeId(story.youtubeIdOrUrl);
                const thumbUrl = ytId
                  ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                  : null;

                return (
                  <div
                    key={story.id}
                    className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3.5 shadow-xs hover:border-[#7B1131]/30 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Header row: Index & Tag badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                          Video #{idx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-[#7B1131] uppercase tracking-wider bg-[#7B1131]/10 px-2.5 py-0.5 rounded-full border border-[#7B1131]/20">
                          {story.tag}
                        </span>
                      </div>

                      {/* Video Preview Frame */}
                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-stone-900 border border-stone-200 relative group/video">
                        {ytId ? (
                          thumbUrl ? (
                            <div className="w-full h-full relative">
                              <img
                                src={thumbUrl}
                                alt={story.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/90 text-[#7B1131] flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                                </div>
                              </div>
                              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                                YouTube
                              </span>
                            </div>
                          ) : (
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                              title={story.title}
                              className="w-full h-full border-0 pointer-events-none"
                            />
                          )
                        ) : (
                          <div className="w-full h-full relative flex items-center justify-center bg-stone-950">
                            <video
                              src={story.youtubeIdOrUrl}
                              className="w-full h-full object-cover"
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-white/90 text-[#7B1131] flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                              Uploaded File
                            </span>
                          </div>
                        )}

                        {/* Hover Overlay with Quick Replace & Edit */}
                        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover/video:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          <label className="px-3 py-1.5 rounded-lg bg-white text-stone-900 font-semibold text-xs cursor-pointer shadow-md flex items-center space-x-1.5 hover:bg-stone-50 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-[#7B1131]" />
                            <span>Upload Video File</span>
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={(e) =>
                                handleVideoFileUpload(e, (dataUrl) =>
                                  updateWhyTrustVideo(story.id, { youtubeIdOrUrl: dataUrl })
                                )
                              }
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingWhyTrustVideo(story);
                              setWhyTrustVideoUrlInput(story.youtubeIdOrUrl);
                              setIsWhyTrustModalOpen(true);
                            }}
                            className="px-3 py-1 rounded-md bg-stone-800 text-stone-200 text-[11px] font-medium hover:bg-stone-700 transition-colors cursor-pointer"
                          >
                            Edit URL / Details
                          </button>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="truncate">{story.family}</span>
                        </p>
                        <p className="text-[11px] text-stone-400 font-mono truncate pt-0.5">
                          {story.youtubeIdOrUrl.startsWith('data:')
                            ? 'Uploaded Video File'
                            : story.youtubeIdOrUrl}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/80">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWhyTrustVideo(story);
                          setWhyTrustVideoUrlInput(story.youtubeIdOrUrl);
                          setIsWhyTrustModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-stone-700 hover:text-[#7B1131] hover:bg-stone-200/50 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Story</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'whyTrustVideo',
                            id: story.id,
                            name: story.title,
                          })
                        }
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove from Carousel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {whyTrustVideos.length === 0 && (
              <div className="text-center py-8 bg-stone-50 rounded-xl border border-dashed border-stone-200 p-6 space-y-2">
                <Video className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs font-semibold text-stone-700">No care journey videos currently in carousel</p>
                <p className="text-[11px] text-stone-400">Click &ldquo;Add Video Story&rdquo; or &ldquo;Reset Defaults&rdquo; to populate the carousel.</p>
              </div>
            )}
          </div>

          {/* ── Section Header Settings Card for "Tell Us What You Need Help With" ── */}
          <form onSubmit={handleSaveServicesSettings} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#7B1131]/10 text-[#7B1131]">
                    Services Page Section
                  </span>
                  <span className="text-xs text-stone-300">•</span>
                  <span className="text-xs text-stone-500 font-medium">Header &amp; Search Content</span>
                </div>
                <h2 className="font-serif text-lg font-bold text-stone-900 mt-1">
                  &ldquo;Tell Us What You Need Help With&rdquo; Section Settings
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Customize the section eyebrow badge, main headline title, descriptive subtitle, and search placeholder displayed on the Services page.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset the section headline and copy back to defaults?')) {
                      resetServicesSettings();
                      notify('Reset section header to defaults');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Restore original text"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reset Copy</span>
                </button>
                <Link
                  href="/services"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-[#7B1131] transition-colors ml-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View on Website</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Eyebrow / Badge Text
                </label>
                <input
                  type="text"
                  value={servicesHeaderForm.sectionBadge}
                  onChange={(e) => setServicesHeaderForm({ ...servicesHeaderForm, sectionBadge: e.target.value })}
                  placeholder="e.g., EXPLORE OUR CARE SERVICES"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  required
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Main Section Heading *
                </label>
                <input
                  type="text"
                  value={servicesHeaderForm.sectionTitle}
                  onChange={(e) => setServicesHeaderForm({ ...servicesHeaderForm, sectionTitle: e.target.value })}
                  placeholder="e.g., Tell Us What You Need Help With"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Search Placeholder Text
                </label>
                <input
                  type="text"
                  value={servicesHeaderForm.searchPlaceholder}
                  onChange={(e) => setServicesHeaderForm({ ...servicesHeaderForm, searchPlaceholder: e.target.value })}
                  placeholder="e.g., Search by need: massage, belly binding..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={servicesHeaderForm.sectionSubtitle}
                onChange={(e) => setServicesHeaderForm({ ...servicesHeaderForm, sectionSubtitle: e.target.value })}
                placeholder="Search or explore our complete catalog of certified in-home maternal, newborn, and postpartum care."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
              />
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Section Header</span>
              </button>
            </div>
          </form>

          {/* Care Services Catalog Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Care Services Catalog &amp; Pricing Details
              </h3>
              <p className="text-xs text-stone-500">
                Manage all clinical offerings, delivery formats, images, key benefits, and pricing guides displayed in this section.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all care services to the default 10 authentic SEYOL clinical programs?')) {
                    resetServicesToDefault();
                    notify('Reset services catalog to defaults');
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Restore 10 default services"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                <span>Reset All Services</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenServiceModal()}
                className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Service</span>
              </button>
            </div>
          </div>

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
                <option value="preconception">Preconception</option>
                <option value="pregnancy">Pregnancy</option>
                <option value="birth">Labor &amp; Birth</option>
                <option value="postpartum">Postpartum</option>
                <option value="newborn">Newborn</option>
              </select>
            </div>

            <span className="text-xs text-stone-500 font-medium self-center">
              Showing {filteredServices.length} of {services.length} services
            </span>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#7B1131]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full relative bg-stone-100 overflow-hidden group">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: service.imagePosition || 'center 35%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

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

                    <div className="absolute bottom-2.5 left-3 right-3 text-white space-y-0.5">
                      <span className="text-[10px] font-bold text-[#F3C49F] uppercase tracking-wider block">
                        {service.format || 'HOLISTIC CARE'}
                      </span>
                      <h4 className="font-serif font-bold text-base text-white leading-tight drop-shadow-xs">
                        {service.shortTitle || service.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#70152B] bg-[#70152B]/10 px-2.5 py-1 rounded-md">
                        {service.pricingGuide}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {service.duration}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Key Benefit Highlight Box matching Website */}
                    {service.benefit && (
                      <div className="bg-[#FCF4EE] rounded-xl p-2.5 border border-[#F4E4DA]/60">
                        <p className="text-[11px] text-[#524644] leading-relaxed line-clamp-2">
                          <strong className="font-bold text-[#70152B]">Key Benefit: </strong>
                          <span>{service.benefit}</span>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                      <span className="truncate max-w-[150px]">{service.recommendedTimeline}</span>
                      <span className="font-mono text-[10px] text-stone-400">/{service.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-stone-500 truncate max-w-[180px]">
                    {service.format || 'In-Home Care'}
                  </span>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenServiceModal(service)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#7B1131] hover:border-[#7B1131]/30 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'service',
                        id: service.id,
                        name: service.title,
                      })}
                      className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-3xl w-full shadow-2xl border border-stone-200 space-y-5 my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                  Services Catalog • &ldquo;Tell Us What You Need Help With&rdquo;
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingService ? `Edit Service: ${editingService.shortTitle || editingService.title}` : 'Create New Clinical Care Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || 'New Service';
                const shortTitle = (formData.get('shortTitle') as string) || title;
                const slug = editingService?.slug || (formData.get('slug') as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const format = (formData.get('format') as string) || serviceFormatInput || 'In-Home (Chennai / Tamil Nadu)';
                const pricingGuide = (formData.get('pricingGuide') as string) || 'From ₹4,500';
                const duration = (formData.get('duration') as string) || '2 Hours';
                const benefit = (formData.get('benefit') as string) || 'Holistic postnatal recuperation and balance.';
                const summary = (formData.get('summary') as string) || '';
                const tagline = (formData.get('tagline') as string) || '';
                const bestFor = (formData.get('bestFor') as string) || 'New mothers and infants.';
                const recommendedTimeline = (formData.get('recommendedTimeline') as string) || 'From Day 7';
                const depositInfo = (formData.get('depositInfo') as string) || '20% deposit required upon confirmation.';
                const category = (formData.get('category') as any) || 'hands-on-care';
                const heroImageUrl = (formData.get('heroImageUrl') as string) || '';
                const heroImage = serviceImageFile || heroImageUrl || editingService?.heroImage || '/assets4/preconception-support.jpeg';
                const imagePosition = (formData.get('imagePosition') as string) || serviceImagePositionInput || 'center 35%';

                const updatedData: Service = {
                  id: editingService?.id || `service-${Date.now()}`,
                  slug,
                  title,
                  shortTitle,
                  tagline,
                  summary,
                  category,
                  stages: serviceStagesInput.length > 0 ? serviceStagesInput : ['postpartum'],
                  duration,
                  pricingGuide,
                  heroImage,
                  imagePosition,
                  processImage: editingService?.processImage || heroImage,
                  benefitImages: editingService?.benefitImages || [heroImage],
                  benefit,
                  bestFor,
                  recommendedTimeline,
                  format,
                  depositInfo,
                  features: editingService?.features || [benefit],
                  inclusions: editingService?.inclusions || [duration],
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
              {/* Photo Upload & Preview */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Service Card Hero Image *
                </span>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-28 h-20 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0 relative group">
                    <img
                      src={serviceImageFile || editingService?.heroImage || '/assets4/preconception-support.jpeg'}
                      alt="Service preview"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: serviceImagePositionInput }}
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-[11px] cursor-pointer shadow-xs space-x-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (b64) => setServiceImageFile(b64))}
                        />
                      </label>
                      <input
                        type="text"
                        name="heroImageUrl"
                        value={serviceImageFile}
                        onChange={(e) => setServiceImageFile(e.target.value)}
                        placeholder="Or paste public image URL / path (e.g. /assets4/...)"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Focal Position:</label>
                      <select
                        name="imagePosition"
                        value={serviceImagePositionInput}
                        onChange={(e) => setServiceImagePositionInput(e.target.value)}
                        className="px-2 py-1 text-xs rounded-md bg-white border border-stone-200 text-stone-700"
                      >
                        <option value="center 35%">center 35% (Optimal for Portraits)</option>
                        <option value="center center">center center</option>
                        <option value="center top">center top</option>
                        <option value="center bottom">center bottom</option>
                        <option value="85% bottom">85% bottom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Short Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Service Full Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingService?.title}
                    placeholder="e.g., Preconception Nurturing &amp; Preparation"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Short Title (Header on Card Image) *
                  </label>
                  <input
                    type="text"
                    name="shortTitle"
                    defaultValue={editingService?.shortTitle || editingService?.title}
                    placeholder="e.g., Preconception Support"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Delivery Format Badge */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Delivery Format / Mode Badge (Card Top Header) *
                </label>
                <input
                  type="text"
                  name="format"
                  value={serviceFormatInput}
                  onChange={(e) => setServiceFormatInput(e.target.value)}
                  placeholder="e.g., Virtual &amp; Hybrid, In-Home (Chennai / Tamil Nadu), In-Clinic / In-Home"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="text-[10px] text-stone-400 self-center">Quick Presets:</span>
                  {['Virtual & Hybrid', 'In-Home (Chennai / Tamil Nadu)', 'In-Clinic / In-Home', 'In-Home (Singapore & Chennai)'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setServiceFormatInput(fmt)}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium cursor-pointer"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Guide & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pricing Guide * (Displayed in Bold Maroon)
                  </label>
                  <input
                    type="text"
                    name="pricingGuide"
                    defaultValue={editingService?.pricingGuide || 'From ₹4,500'}
                    placeholder="e.g., From ₹4,500 for Comprehensive Consultation &amp; Protocol"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Duration / Inclusions *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingService?.duration || '1 Hour per session'}
                    placeholder="e.g., 60-minute Initial Consultation + 4-Week Custom Protocol"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Key Benefit (Highlight Box on Card) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Key Benefit * (Displayed in Peach Highlight Box on Service Card)
                </label>
                <textarea
                  name="benefit"
                  rows={2}
                  defaultValue={editingService?.benefit}
                  placeholder="e.g., Prepares the pelvic basin, balances vital doshas, and nurtures vitality prior to conception."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              {/* Service Summary */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Clinical Overview &amp; Summary Paragraph *
                </label>
                <textarea
                  name="summary"
                  rows={3}
                  defaultValue={editingService?.summary}
                  placeholder="A holistic preconception programme blending traditional Siddha and Ayurvedic..."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              {/* Stages Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Associated Care Stage(s)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'preconception' as JourneyStage, label: 'Preconception' },
                    { id: 'pregnancy' as JourneyStage, label: 'Pregnancy' },
                    { id: 'birth' as JourneyStage, label: 'Labor & Birth' },
                    { id: 'postpartum' as JourneyStage, label: 'Postpartum' },
                    { id: 'newborn' as JourneyStage, label: 'Newborn' },
                  ].map((stg) => {
                    const isChecked = serviceStagesInput.includes(stg.id);
                    return (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            if (serviceStagesInput.length > 1) {
                              setServiceStagesInput(serviceStagesInput.filter((s) => s !== stg.id));
                            }
                          } else {
                            setServiceStagesInput([...serviceStagesInput, stg.id]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#7B1131] border-[#7B1131] text-white shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {isChecked ? '✓ ' : ''}{stg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extra Clinical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Care Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingService?.category || 'hands-on-care'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value="hands-on-care">Hands-On Care</option>
                    <option value="clinical-tradition">Clinical Tradition</option>
                    <option value="specialist-support">Specialist Support</option>
                    <option value="nanny-confinement">Nanny Confinement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Recommended Timeline
                  </label>
                  <input
                    type="text"
                    name="recommendedTimeline"
                    defaultValue={editingService?.recommendedTimeline || '3 to 6 months prior'}
                    placeholder="e.g., 3 to 6 months prior to planned conception"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Target Audience / Best For
                  </label>
                  <input
                    type="text"
                    name="bestFor"
                    defaultValue={editingService?.bestFor || 'Couples & expectant mothers'}
                    placeholder="e.g., Couples planning conception..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Tagline & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Tagline / Sub-Headline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    defaultValue={editingService?.tagline}
                    placeholder="E.g., Cultivating bodily harmony and uterine readiness"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingService?.slug}
                    placeholder="e.g., preconception-support"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingService ? 'Save Service Changes' : 'Create Care Service'}</span>
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

      {/* ─── MODAL: ADD / EDIT REAL STORY VIDEO (START HERE CAROUSEL) ────── */}
      {isRealStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                  Start Here • Real Stories &amp; Video Journeys
                </span>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {editingRealStory ? 'Edit Client Video Story' : 'Add New Client Video Story'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRealStoryModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const author = (formData.get('author') as string) || 'Verified SEYOL Family';
                const location = (formData.get('location') as string) || 'Singapore';
                const stage = (formData.get('stage') as JourneyStage) || 'postpartum';
                const serviceOrProduct = (formData.get('serviceOrProduct') as string) || 'Postpartum Doula Care';
                const babyAgeOrWeek = (formData.get('babyAgeOrWeek') as string) || 'Care Journey';
                const quote = (formData.get('quote') as string) || '';
                const detailedStory = (formData.get('detailedStory') as string) || quote;
                const rating = Number(formData.get('rating')) || 5;
                const videoDuration = (formData.get('videoDuration') as string) || '06:30';
                const youtubeUrl = realStoryVideoUrlInput.trim();
                const vId = extractYouTubeId(youtubeUrl);
                const thumbnailImage =
                  realStoryThumbnailInput.trim() ||
                  (vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : undefined);

                const updatedStory: Testimonial = {
                  id: editingRealStory?.id || `testimonial-video-${Date.now()}`,
                  author,
                  location,
                  stage,
                  serviceOrProduct,
                  babyAgeOrWeek,
                  quote,
                  detailedStory,
                  rating,
                  verifiedParent: true,
                  youtubeUrl,
                  thumbnailImage,
                  videoDuration,
                };

                if (editingRealStory) {
                  updateTestimonial(editingRealStory.id, updatedStory);
                  notify('Video story updated successfully');
                } else {
                  addTestimonial(updatedStory);
                  notify('New video story added to Start Here carousel');
                }
                setIsRealStoryModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* YouTube Video URL with Live Preview */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  YouTube Video URL or Direct Video *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={realStoryVideoUrlInput}
                    onChange={(e) => setRealStoryVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                    required
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                  <label className="px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold cursor-pointer shrink-0 flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#7B1131]" />
                    <span>Video File</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        handleVideoFileUpload(e, (dataUrl) => setRealStoryVideoUrlInput(dataUrl))
                      }
                    />
                  </label>
                </div>

                {/* Instant Video / Thumbnail Preview */}
                {realStoryVideoUrlInput && (
                  <div className="mt-2 aspect-video w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-xs flex items-center justify-center">
                    {extractYouTubeId(realStoryVideoUrlInput) ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(realStoryVideoUrlInput)}`}
                        title="Video preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : realStoryVideoUrlInput.startsWith('data:video') || realStoryVideoUrlInput.includes('.mp4') ? (
                      <video
                        src={realStoryVideoUrlInput}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-3 text-stone-400">
                        <Play className="w-6 h-6 mx-auto mb-1 text-stone-500" />
                        <span className="text-[11px]">Preview will appear once valid video URL is entered</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Family / Client Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={editingRealStory?.author || ''}
                    placeholder="e.g., First-Time Parents, Deepika & Karthik"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Location / Condominium *
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingRealStory?.location || 'Singapore'}
                    placeholder="e.g., Singapore, Spring Grove, Chennai"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Stage & Service Attribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Care Journey Stage *
                  </label>
                  <select
                    name="stage"
                    defaultValue={editingRealStory?.stage || 'postpartum'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value="newborn">Infant Bath &amp; Colic (Newborn)</option>
                    <option value="postpartum">Confinement &amp; Massage (Postpartum)</option>
                    <option value="pregnancy">Pregnancy &amp; Doula (Pregnancy)</option>
                    <option value="preconception">Preconception</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Care Service / Program *
                  </label>
                  <input
                    type="text"
                    name="serviceOrProduct"
                    defaultValue={editingRealStory?.serviceOrProduct || 'Newborn Babysitting & Care Support'}
                    placeholder="e.g., 90 Infant Massage & Bath Sessions"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Journey Tag, Video Duration & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Journey Tag
                  </label>
                  <input
                    type="text"
                    name="babyAgeOrWeek"
                    defaultValue={editingRealStory?.babyAgeOrWeek || 'Care Journey'}
                    placeholder="e.g., 90-Day Infant Care Journey"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    name="videoDuration"
                    defaultValue={editingRealStory?.videoDuration || '06:40'}
                    placeholder="e.g., 06:40"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Star Rating
                  </label>
                  <select
                    name="rating"
                    defaultValue={editingRealStory?.rating || 5}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
              </div>

              {/* Featured Quote */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Featured Client Quote (Prominent Headline) *
                </label>
                <textarea
                  name="quote"
                  rows={2}
                  defaultValue={editingRealStory?.quote || ''}
                  placeholder="e.g., We originally considered daycare, but SEYOL's dedicated in-home newborn care gave our baby the gentlest start in life."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              {/* Detailed Story Reflection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Full Story Reflection (Detailed Experience)
                </label>
                <textarea
                  name="detailedStory"
                  rows={3}
                  defaultValue={editingRealStory?.detailedStory || ''}
                  placeholder="Detailed reflections on the healing touch, doula presence, hygiene, or traditional postnatal care..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              {/* Custom Thumbnail (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Custom Video Thumbnail (Optional – defaults to YouTube preview)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={realStoryThumbnailInput}
                    onChange={(e) => setRealStoryThumbnailInput(e.target.value)}
                    placeholder="https://... image URL (or leave blank for YouTube HQ thumb)"
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                  <label className="px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold cursor-pointer shrink-0 flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#7B1131]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (b64) => setRealStoryThumbnailInput(b64))
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsRealStoryModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingRealStory ? 'Save Changes' : 'Add Video Story'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT WHY TRUST VIDEO STORY ────────────────────── */}
      {isWhyTrustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                  Services Trust Carousel
                </span>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {editingWhyTrustVideo ? 'Edit Care Video Story' : 'Add Care Video Story'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWhyTrustModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || '';
                const tag = (formData.get('tag') as string) || 'Care Journey';
                const family = (formData.get('family') as string) || '';
                const videoSource = whyTrustVideoUrlInput.trim() || (formData.get('youtubeUrl') as string) || '';

                if (!videoSource) {
                  alert('Please enter a YouTube video URL/ID or upload a video file.');
                  return;
                }

                if (editingWhyTrustVideo) {
                  updateWhyTrustVideo(editingWhyTrustVideo.id, {
                    title,
                    tag,
                    family,
                    youtubeIdOrUrl: videoSource,
                  });
                  notify('Video story updated successfully');
                } else {
                  addWhyTrustVideo({
                    id: `story-${Date.now()}`,
                    title,
                    tag,
                    family,
                    youtubeIdOrUrl: videoSource,
                  });
                  notify('Video story added to carousel');
                }
                setIsWhyTrustModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Story Title *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingWhyTrustVideo?.title || ''}
                  placeholder="e.g., 50 Infant Massage & Bath + 35 Postpartum Sessions"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Care Journey Tag / Badge *
                  </label>
                  <input
                    type="text"
                    name="tag"
                    defaultValue={editingWhyTrustVideo?.tag || 'Care Journey'}
                    placeholder="e.g., Care Journey, Repeat Journey"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['Care Journey', 'Repeat Journey', 'Client Feedback', 'Infant Care'].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={(e) => {
                          const input = (e.currentTarget.closest('div')?.querySelector('input') as HTMLInputElement);
                          if (input) input.value = suggestion;
                        }}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Family / Location Attribution *
                  </label>
                  <input
                    type="text"
                    name="family"
                    defaultValue={editingWhyTrustVideo?.family || ''}
                    placeholder="e.g., Daisy Lodge Condominium"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              {/* Video Source Selection */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Video URL (YouTube or Direct Video) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="youtubeUrl"
                    value={whyTrustVideoUrlInput}
                    onChange={(e) => setWhyTrustVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or 11-char ID"
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                  <label className="px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold cursor-pointer shrink-0 flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#7B1131]" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        handleVideoFileUpload(e, (dataUrl) => setWhyTrustVideoUrlInput(dataUrl))
                      }
                    />
                  </label>
                </div>
                <p className="text-[10px] text-stone-400">
                  Enter a YouTube link or upload an MP4/video file directly.
                </p>
              </div>

              {/* Live Preview Frame */}
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-600">
                  Video Preview
                </span>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-xs flex items-center justify-center">
                  {extractYouTubeId(whyTrustVideoUrlInput) ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(whyTrustVideoUrlInput)}`}
                      title="Video preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : whyTrustVideoUrlInput ? (
                    <video
                      src={whyTrustVideoUrlInput}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-stone-400">
                      <Play className="w-6 h-6 mx-auto mb-1 text-stone-500" />
                      <span className="text-[11px]">Enter a YouTube URL or upload a file to preview</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsWhyTrustModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold shadow-xs cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingWhyTrustVideo ? 'Save Changes' : 'Add to Carousel'}</span>
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
