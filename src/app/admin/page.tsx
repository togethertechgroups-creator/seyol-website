'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  Layers,
  ShoppingBag,
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  X, 
  ArrowLeft, 
  Search, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  Eye,
  Camera,
  Heart,
  Tag,
  Package,
  Users,
  ShieldCheck,
  AlertTriangle,
  Play,
  ShoppingCart,
  Truck,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calendar,
  MessageCircle,
  Clock,
  CheckCheck,
  Ban,
  FileText
} from 'lucide-react';
import { useAdminData, extractYouTubeId, CombinedPackageItem, ProductBannerSlide } from '../../context/AdminDataContext';
import { Service, Product, Testimonial, JourneyStage, ProductOrder, OrderStatus, PaymentStatus } from '../../types';
import { SeyolCarePortal } from '../../components/portal/SeyolCarePortal';

export default function AdminPage() {
  const {
    services,
    products,
    orders,
    homeSettings,
    productsSettings,
    testimonials,
    combinedPackages,
    productBannerSlides,
    updateHomeSettings,
    updateProductsSettings,
    addProductBannerSlide,
    updateProductBannerSlide,
    deleteProductBannerSlide,
    addOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    addService,
    updateService,
    deleteService,
    addProduct,
    updateProduct,
    deleteProduct,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addCombinedPackage,
    updateCombinedPackage,
    deleteCombinedPackage,
    resetAllToDefaults,
  } = useAdminData();

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Main 5-Tab Navigation: Home, Services, Products, Orders, Care Portal
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'products' | 'orders' | 'care_portal'>('home');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search & Filter States
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'>('all');

  // Selected Order for Full Detail / Invoice View
  const [selectedOrderForView, setSelectedOrderForView] = useState<ProductOrder | null>(null);

  // Home Page Form State
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
  });

  // Products Page Hero Form State
  const [productHeroForm, setProductHeroForm] = useState({
    heroImage: productsSettings?.heroImage || '/images/products-hero-banner.png',
    heroBadge: productsSettings?.heroBadge || 'OFFICIAL SEYOL BOTANICAL FORMULATION',
    heroTitle: productsSettings?.heroTitle || 'Soothing Baby Massage Oil',
    heroSubtitle: productsSettings?.heroSubtitle || 'Nourishing, gentle, pure care for newborn baby massage & sweet sleep.',
  });

  // Sync state with Context on load
  React.useEffect(() => {
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
      });
    }
    if (productsSettings) {
      setProductHeroForm({
        heroImage: productsSettings.heroImage || '/images/products-hero-banner.png',
        heroBadge: productsSettings.heroBadge || 'OFFICIAL SEYOL BOTANICAL FORMULATION',
        heroTitle: productsSettings.heroTitle || 'Soothing Baby Massage Oil',
        heroSubtitle: productsSettings.heroSubtitle || 'Nourishing, gentle, pure care for newborn baby massage & sweet sleep.',
      });
    }
  }, [homeSettings, productsSettings]);

  // Service Modal States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceImageFile, setServiceImageFile] = useState('');

  // Product Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImageFile, setProductImageFile] = useState('');

  // Product Banner Slide Modal States
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<ProductBannerSlide | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState('');

  // Video Testimonial Modal States
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  // Combined Packages Modal States
  const [isCombinedPackageModalOpen, setIsCombinedPackageModalOpen] = useState(false);
  const [editingCombinedPackage, setEditingCombinedPackage] = useState<CombinedPackageItem | null>(null);

  // Delete Confirmation Modal State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: 'service' | 'product' | 'testimonial' | 'combinedPackage' | 'banner' | 'order';
    id: string;
    name: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Image upload with canvas optimization
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
          showToast('Image uploaded and optimized successfully!');
        } else {
          onResult(event.target?.result as string);
          showToast('Image uploaded successfully!');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Filter Services
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.summary.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory =
      serviceCategoryFilter === 'all' || s.stages.includes(serviceCategoryFilter as JourneyStage);
    return matchesSearch && matchesCategory;
  });

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.volume?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory =
      productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#7B1131] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#7B1131] tracking-widest uppercase">Loading SEYOL Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#3a1d1d] font-sans flex">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#7B1131] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-gold/40 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-gold-light" />
          <span className="text-xs font-bold">{successMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                Confirm Deletion
              </h3>
              <p className="text-xs text-neutral-600">
                Are you sure you want to delete this {deleteConfirmation.type}: <strong className="text-red-700 font-bold">{deleteConfirmation.name}</strong>?
              </p>
              <p className="text-[11px] text-neutral-400">
                This action will immediately remove it from the live website.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmation.type === 'service') {
                    deleteService(deleteConfirmation.id);
                    showToast(`Deleted service: ${deleteConfirmation.name}`);
                  } else if (deleteConfirmation.type === 'product') {
                    deleteProduct(deleteConfirmation.id);
                    showToast(`Deleted product: ${deleteConfirmation.name}`);
                  } else if (deleteConfirmation.type === 'testimonial') {
                    deleteTestimonial(deleteConfirmation.id);
                    showToast(`Deleted video review: ${deleteConfirmation.name}`);
                  } else if (deleteConfirmation.type === 'combinedPackage') {
                    deleteCombinedPackage(deleteConfirmation.id);
                    showToast(`Deleted combined package: ${deleteConfirmation.name}`);
                  } else if (deleteConfirmation.type === 'banner') {
                    deleteProductBannerSlide(deleteConfirmation.id);
                    showToast(`Deleted hero banner: ${deleteConfirmation.name}`);
                  } else if (deleteConfirmation.type === 'order') {
                    deleteOrder(deleteConfirmation.id);
                    showToast(`Deleted order: ${deleteConfirmation.name}`);
                  }
                  setDeleteConfirmation(null);
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FIXED LEFT SIDEBAR NAVIGATION WITH ROUNDED CORNERS                      */}
      {/* ========================================================================= */}
      <aside className="w-64 sm:w-72 bg-[#2D0813] text-white flex flex-col justify-between fixed top-3 left-3 bottom-3 z-40 rounded-[32px] border border-[#4A1020] shadow-2xl overflow-hidden">
        <div className="p-6 space-y-7">
          
          {/* SEYOL Admin Brand Logo - Centered */}
          <div className="flex flex-col items-center justify-center text-center space-y-1.5 pb-3 border-b border-white/10">
            <Link href="/" className="inline-block group">
              <div className="font-serif text-2xl sm:text-3xl font-black tracking-widest text-[#E9C377] group-hover:text-white transition-colors">
                SEYOL
              </div>
            </Link>
            <div className="flex items-center justify-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/70">
                Control Management
              </span>
            </div>
          </div>

          {/* Clean 4 Navigation Links: Home, Services, Products, Orders */}
          <nav className="space-y-2.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-xs flex items-center space-x-3 transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#7B1131] text-white shadow-lg border border-gold/30 font-extrabold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-gold-light' : 'text-white/60'}`} />
              <span className="text-sm">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#7B1131] text-white shadow-lg border border-gold/30 font-extrabold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Layers className={`w-4 h-4 ${activeTab === 'services' ? 'text-gold-light' : 'text-white/60'}`} />
                <span className="text-sm">Services</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#7B1131] text-white shadow-lg border border-gold/30 font-extrabold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className={`w-4 h-4 ${activeTab === 'products' ? 'text-gold-light' : 'text-white/60'}`} />
                <span className="text-sm">Products</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#7B1131] text-white shadow-lg border border-gold/30 font-extrabold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className={`w-4 h-4 ${activeTab === 'orders' ? 'text-gold-light' : 'text-white/60'}`} />
                <span className="text-sm">Orders</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {orders.some((o) => o.orderStatus === 'pending') && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                  {orders.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('care_portal')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'care_portal'
                  ? 'bg-[#7B1131] text-white shadow-lg border border-gold/30 font-extrabold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className={`w-4 h-4 ${activeTab === 'care_portal' ? 'text-gold-light' : 'text-white/60'}`} />
                <span className="text-sm">My SEYOL Care Portal</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/20 text-gold-light">
                10 Modules
              </span>
            </button>
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span>View Live Website</span>
            </div>
            <ExternalLink className="w-3 h-3 text-white/40" />
          </Link>

          <button
            onClick={() => {
              if (confirm('Reset all content, services, and products to default SEYOL configuration?')) {
                resetAllToDefaults();
                showToast('Reset all data to defaults.');
              }
            }}
            className="w-full py-2 px-3 rounded-xl text-white/40 hover:text-white/70 text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Offset by sidebar width)                           */}
      {/* ========================================================================= */}
      <main className="flex-1 ml-72 sm:ml-80 p-6 sm:p-10 max-w-7xl">
        
        {/* ======================================================================= */}
        {/* SECTION 0: MY SEYOL CARE PORTAL (ADMIN & CLIENT MANAGEMENT)             */}
        {/* ======================================================================= */}
        {activeTab === 'care_portal' && (
          <div className="space-y-6 animate-fadeIn">
            <SeyolCarePortal isAdminView={true} />
          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 1: HOME PAGE CONTENT MANAGEMENT                                 */}
        {/* ======================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Page Management</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
                  Home Page Content &amp; Media
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Manage the Founder story image, live parent statistics, and video section on the main Home Page.
                </p>
              </div>

              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-white border border-neutral-200 hover:border-maroon text-[#7B1131] text-xs font-bold flex items-center space-x-2 shadow-xs transition-colors shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live Home Page</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </Link>
            </div>

            {/* A. Our Story – Founder & Childbirth Educator */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-xl bg-[#FAF2F4] text-[#7B1131] flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#3a1d1d]">
                    Our Story – Founder &amp; Childbirth Educator
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Update the high-resolution photo and details of Mrs. Jemma Francis shown in the Our Story section.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Current Image Preview */}
                <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-cream-border shadow-warm-md bg-brown">
                    <img
                      src={homeForm.founderStoryImage || 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800'}
                      alt="Founder Preview"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] text-white text-center font-bold">
                      Current Preview
                    </div>
                  </div>
                </div>

                {/* Upload & Replace Options */}
                <div className="lg:col-span-8 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center justify-center p-3.5 rounded-2xl border border-dashed border-[#7B1131]/40 hover:border-maroon bg-[#FAF7F2] text-xs font-bold text-neutral-700 cursor-pointer hover:bg-neutral-50 transition-all space-x-2 shadow-2xs">
                      <Upload className="w-4 h-4 text-[#7B1131]" />
                      <span>Upload New Image from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (b64) => setHomeForm({ ...homeForm, founderStoryImage: b64 }))
                        }
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete custom founder image and reset to default?')) {
                          setHomeForm({
                            ...homeForm,
                            founderStoryImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
                          });
                          showToast('Reset image to default.');
                        }
                      }}
                      className="flex items-center justify-center p-3.5 rounded-2xl border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-600 text-xs font-bold transition-all cursor-pointer space-x-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete / Reset Image</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">Founder Name</label>
                      <input
                        type="text"
                        value={homeForm.founderName}
                        onChange={(e) => setHomeForm({ ...homeForm, founderName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">Badge Title</label>
                      <input
                        type="text"
                        value={homeForm.founderTitle}
                        onChange={(e) => setHomeForm({ ...homeForm, founderTitle: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Mothers Supported & Families Supported Statistics */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#3a1d1d]">
                    Mothers Supported &amp; Families Supported Statistics
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Live counters displayed in the Our Story and trust sections of the website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {/* Stat 1: Mothers Supported */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Statistic 1</span>
                    <Heart className="w-4 h-4 text-maroon" />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1 text-xs">
                      Mothers Supported Number *
                    </label>
                    <input
                      type="text"
                      value={homeForm.mothersSupported}
                      onChange={(e) => setHomeForm({ ...homeForm, mothersSupported: e.target.value })}
                      placeholder="e.g. 2,400+"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 font-serif font-black text-xl text-maroon focus:outline-none focus:ring-2 focus:ring-maroon"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Displays on live site as: <strong>{homeForm.mothersSupported} Mothers Supported</strong>
                  </p>
                </div>

                {/* Stat 2: Families Supported */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-dark">Statistic 2</span>
                    <ShieldCheck className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1 text-xs">
                      Families Supported Number *
                    </label>
                    <input
                      type="text"
                      value={homeForm.familiesSupported}
                      onChange={(e) => setHomeForm({ ...homeForm, familiesSupported: e.target.value })}
                      placeholder="e.g. 1,800+"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 font-serif font-black text-xl text-gold-dark focus:outline-none focus:ring-2 focus:ring-maroon"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Displays on live site as: <strong>{homeForm.familiesSupported} Families Supported</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* C. Trusted by Families at Every Stage (Multiple Video Management) */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#3a1d1d]">
                      Trusted by Families at Every Stage (Video Management)
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Add, edit, or delete multiple YouTube client video reviews &amp; parent stories shown in the Home Page video carousel.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setVideoUrlInput('https://www.youtube.com/watch?v=ScMzIvxBSi4');
                    setIsTestimonialModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer transition-all shrink-0 hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video Review</span>
                </button>
              </div>

              {/* Multiple Video Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((t) => {
                  const yid = extractYouTubeId(t.youtubeUrl);
                  return (
                    <div
                      key={t.id}
                      className="bg-[#FAF7F2] rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between space-y-3 hover:shadow-warm-sm transition-all"
                    >
                      {/* Video Player Preview / Thumbnail */}
                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative border border-neutral-300 shadow-xs">
                        {yid ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${yid}`}
                            title={t.author}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/50 text-xs">
                            <Video className="w-6 h-6 mb-1" />
                            <span>No video URL</span>
                          </div>
                        )}
                      </div>

                      {/* Video Story Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131] font-extrabold text-[9px] uppercase tracking-wider">
                            {t.stage}
                          </span>
                          <div className="flex items-center space-x-0.5">
                            {Array.from({ length: t.rating || 5 }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                            ))}
                          </div>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#3a1d1d] truncate">
                          {t.author}
                        </h4>
                        
                        <p className="text-[11px] text-neutral-600 font-medium line-clamp-1">
                          {t.serviceOrProduct} {t.location ? `• ${t.location}` : ''}
                        </p>

                        <p className="text-[11px] text-neutral-500 italic line-clamp-2 pt-0.5">
                          "{t.quote}"
                        </p>
                      </div>

                      {/* Card Action Buttons: Edit / Delete */}
                      <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400 font-medium">
                          {t.babyAgeOrWeek || 'Verified Parent'}
                        </span>
                        
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTestimonial(t);
                              setVideoUrlInput(t.youtubeUrl || '');
                              setIsTestimonialModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white hover:bg-amber-50 text-amber-700 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                            title="Edit Video Review"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setDeleteConfirmation({
                                isOpen: true,
                                type: 'testimonial',
                                id: t.id,
                                name: t.author,
                              });
                            }}
                            className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                            title="Delete Video Review"
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

            {/* Save All Home Changes Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  updateHomeSettings(homeForm);
                  showToast('Home page content & statistics updated live successfully!');
                }}
                className="px-8 py-3.5 rounded-2xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-sm shadow-warm-md hover:scale-102 transition-all cursor-pointer flex items-center space-x-2"
              >
                <Check className="w-4 h-4 text-gold-light" />
                <span>Save &amp; Update Live Home Page</span>
              </button>
            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 2: SERVICES MANAGEMENT                                          */}
        {/* ======================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Care Catalog</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
                  Services Management
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Add, edit, update, or remove SEYOL care services. All updates reflect instantly on live site.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceImageFile('');
                  setIsServiceModalOpen(true);
                }}
                className="px-6 py-3 rounded-2xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-warm-md flex items-center space-x-2 cursor-pointer transition-all hover:scale-102 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search services by title, stage, or summary..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
                {['all', 'preconception', 'pregnancy', 'postpartum', 'newborn'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setServiceCategoryFilter(stage)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer shrink-0 ${
                      serviceCategoryFilter === stage
                        ? 'bg-[#7B1131] text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Services List Table */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-neutral-200 text-[#7B1131] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Category / Stage</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Price Guide</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredServices.map((svc) => (
                      <tr key={svc.id} className="hover:bg-neutral-50/70 transition-colors">
                        {/* Service Thumbnail & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                              <img src={svc.heroImage} alt={svc.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-neutral-800 text-xs">{svc.title}</h4>
                              <p className="text-[11px] text-neutral-400 truncate max-w-xs">{svc.tagline || svc.summary}</p>
                            </div>
                          </div>
                        </td>

                        {/* Stage */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#FAF2F4] text-[#7B1131] font-bold text-[10px] uppercase tracking-wider">
                            {svc.stages[0] || svc.category}
                          </span>
                        </td>

                        {/* Duration */}
                        <td className="py-3 px-4 font-medium text-neutral-600">
                          {svc.duration || 'Session Based'}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-bold text-[#7B1131]">
                          {svc.pricingGuide || 'Custom Tier'}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Active
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/services/${svc.slug}`}
                              target="_blank"
                              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                              title="View Live Page"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => {
                                setEditingService(svc);
                                setServiceImageFile(svc.heroImage);
                                setIsServiceModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                              title="Edit Service"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                setDeleteConfirmation({
                                  isOpen: true,
                                  type: 'service',
                                  id: svc.id,
                                  name: svc.title,
                                });
                              }}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =================================================================== */}
            {/* B. COMBINED PACKAGES MANAGEMENT (Package 1 to 6 & Custom Packages) */}
            {/* =================================================================== */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#3a1d1d]">
                      Combined Mother &amp; Baby Packages (Package 1 – 6)
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Add, update, or remove multi-tier combined confinement care packages. Syncs live to service comparison tables and booking workflows.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCombinedPackage(null);
                    setIsCombinedPackageModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer transition-all shrink-0 hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Combined Package</span>
                </button>
              </div>

              {/* Combined Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {combinedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all relative ${
                      pkg.popular
                        ? 'bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F2] border-[#7B1131]/40 shadow-warm-sm ring-1 ring-[#7B1131]/20'
                        : 'bg-[#FAF7F2] border-neutral-200 hover:shadow-warm-xs'
                    }`}
                  >
                    {/* Header: Num + Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-lg bg-[#7B1131] text-white font-mono font-black text-xs flex items-center justify-center">
                          {pkg.num}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          {pkg.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[9px] uppercase tracking-wider">
                              Popular
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131] font-bold text-[10px]">
                            {pkg.badge}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif font-black text-base text-[#3a1d1d]">
                        {pkg.name}
                      </h4>

                      <div className="font-serif font-black text-xl text-[#7B1131] mt-1">
                        {pkg.priceDisplay || `₹${(pkg.price || 0).toLocaleString('en-IN')}`}
                      </div>
                    </div>

                    {/* Session Breakdown Details */}
                    <div className="space-y-2 text-xs bg-white p-3.5 rounded-xl border border-neutral-200/80">
                      <div className="flex items-start space-x-2">
                        <span className="text-[#7B1131] font-bold">👶</span>
                        <span className="text-neutral-700 font-semibold leading-snug">
                          {pkg.infantSessions}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-gold-dark font-bold">🤱</span>
                        <span className="text-neutral-700 font-semibold leading-snug">
                          {pkg.postpartumSessions}
                        </span>
                      </div>
                    </div>

                    {pkg.description && (
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    )}

                    {/* Actions: Edit / Delete */}
                    <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 font-mono truncate max-w-[120px]">
                        {pkg.id}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCombinedPackage(pkg);
                            setIsCombinedPackageModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-amber-50 text-amber-800 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Edit Package"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirmation({
                              isOpen: true,
                              type: 'combinedPackage',
                              id: pkg.id,
                              name: pkg.name,
                            });
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 3: PRODUCTS MANAGEMENT & HERO BANNER                            */}
        {/* ======================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Apothecary Catalog</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
                  Products Management
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Manage the Product page Hero Banner and catalog items. Updates sync live to the storefront.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductImageFile('');
                  setIsProductModalOpen(true);
                }}
                className="px-6 py-3 rounded-2xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-warm-md flex items-center space-x-2 cursor-pointer transition-all hover:scale-102 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* A. Product Hero Banner Slides & Images Section */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#3a1d1d]">
                      Product Hero Banner Slides &amp; Images
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Add, update, replace, or delete hero banner images and promotional slides shown in the `/products` top carousel.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingBanner(null);
                    setBannerImageFile('');
                    setIsBannerModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer transition-all shrink-0 hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Banner Image</span>
                </button>
              </div>

              {/* Banner Slides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {productBannerSlides.map((slide, idx) => (
                  <div
                    key={slide.id || idx}
                    className="rounded-2xl border border-neutral-200 bg-[#FAF7F2] p-4 flex flex-col justify-between space-y-4 hover:shadow-warm-xs transition-all relative group"
                  >
                    {/* Banner Image Preview */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300/80 relative">
                      <img
                        src={slide.image || '/images/products-hero-banner.png'}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products-hero-banner.png';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono font-bold">
                        Slide {idx + 1}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="space-y-2">
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131] font-bold text-[10px] uppercase tracking-wider">
                        {slide.badge || 'PROMOTIONAL BANNER'}
                      </div>

                      <h4 className="font-serif font-black text-base text-[#3a1d1d] line-clamp-1">
                        {slide.title}
                      </h4>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      {slide.ctaText && (
                        <div className="text-[11px] font-bold text-[#7B1131] flex items-center space-x-1 pt-1">
                          <span>Button:</span>
                          <span className="bg-white px-2 py-0.5 rounded-md border border-neutral-200">{slide.ctaText}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions: Edit / Delete */}
                    <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Target: {slide.categoryTarget || 'all'}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBanner(slide);
                            setBannerImageFile(slide.image || '');
                            setIsBannerModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-amber-50 text-amber-800 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Edit / Replace Image"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirmation({
                              isOpen: true,
                              type: 'banner',
                              id: slide.id,
                              name: slide.title,
                            });
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Delete Banner Slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Product Catalog CRUD */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search products by name, volume, or description..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon"
                  />
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'baby-massage', label: 'Baby Massage' },
                    { id: 'mother-postpartum', label: 'Mother Care' },
                    { id: 'bath-wellness', label: 'Bath & Ubtan' },
                    { id: 'digestive-relief', label: 'Colic & Gas' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setProductCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                        productCategoryFilter === cat.id
                          ? 'bg-[#7B1131] text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Catalog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-gold/60 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Product Thumbnail & Badges */}
                      <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        <img
                          src={prod.image || '/images/products-hero-banner.png'}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/products-hero-banner.png';
                          }}
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#7B1131]">
                          {prod.volume}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-extrabold flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5 fill-black" />
                          <span>{prod.rating || 4.9}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                          {prod.category.replace(/-/g, ' ')}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#3a1d1d] mt-0.5">
                          {prod.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                          {prod.shortDescription || prod.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">Price</span>
                        <span className="font-serif font-extrabold text-base text-[#7B1131]">
                          ₹{prod.price?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href="/products"
                          target="_blank"
                          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                          title="View on Products Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setProductImageFile(prod.image || '');
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteConfirmation({
                              isOpen: true,
                              type: 'product',
                              id: prod.id,
                              name: prod.title,
                            });
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 4: ORDERS MANAGEMENT                                            */}
        {/* ======================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Store Fulfillment</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
                  Customer Orders Management
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Live customer product orders, delivery addresses, payment confirmations, and dispatch tracking.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center space-x-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Live Sync</span>
                </span>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* Metric 1: Total Revenue */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Total Sales</span>
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-[#3a1d1d]">
                  ₹{orders.filter((o) => o.orderStatus !== 'cancelled').reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1">From {orders.length} orders</span>
              </div>

              {/* Metric 2: Total Orders */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">All Orders</span>
                  <ShoppingCart className="w-4 h-4 text-maroon" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-[#7B1131]">
                  {orders.length}
                </div>
                <span className="text-[10px] text-neutral-500 font-semibold mt-1">Customer checkouts</span>
              </div>

              {/* Metric 3: Pending Verification */}
              <div className="bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-amber-800 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-amber-900">
                  {orders.filter((o) => o.orderStatus === 'pending').length}
                </div>
                <span className="text-[10px] text-amber-700 font-semibold mt-1">Needs verification</span>
              </div>

              {/* Metric 4: Shipped / In Transit */}
              <div className="bg-purple-50/60 p-4 sm:p-5 rounded-2xl border border-purple-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-purple-800 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Shipped</span>
                  <Truck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-purple-900">
                  {orders.filter((o) => o.orderStatus === 'shipped' || o.orderStatus === 'confirmed').length}
                </div>
                <span className="text-[10px] text-purple-700 font-semibold mt-1">In fulfillment/transit</span>
              </div>

              {/* Metric 5: Delivered */}
              <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between text-emerald-800 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Delivered</span>
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-emerald-900">
                  {orders.filter((o) => o.orderStatus === 'delivered').length}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1">Completed delivery</span>
              </div>
            </div>

            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, email, order #, or city..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:ring-1 focus:ring-maroon"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: `All (${orders.length})` },
                  { id: 'pending', label: `Pending (${orders.filter((o) => o.orderStatus === 'pending').length})` },
                  { id: 'confirmed', label: `Confirmed (${orders.filter((o) => o.orderStatus === 'confirmed').length})` },
                  { id: 'shipped', label: `Shipped (${orders.filter((o) => o.orderStatus === 'shipped').length})` },
                  { id: 'delivered', label: `Delivered (${orders.filter((o) => o.orderStatus === 'delivered').length})` },
                  { id: 'cancelled', label: `Cancelled (${orders.filter((o) => o.orderStatus === 'cancelled').length})` },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                      orderStatusFilter === st.id
                        ? 'bg-[#7B1131] text-white shadow-2xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table / Cards */}
            <div className="space-y-4">
              {orders
                .filter((ord) => {
                  if (orderStatusFilter !== 'all' && ord.orderStatus !== orderStatusFilter) {
                    return false;
                  }
                  if (!orderSearch.trim()) return true;
                  const q = orderSearch.toLowerCase();
                  return (
                    ord.orderNumber.toLowerCase().includes(q) ||
                    ord.customerName.toLowerCase().includes(q) ||
                    ord.customerPhone.toLowerCase().includes(q) ||
                    ord.customerEmail.toLowerCase().includes(q) ||
                    ord.shippingAddress.city.toLowerCase().includes(q) ||
                    ord.shippingAddress.street.toLowerCase().includes(q)
                  );
                })
                .map((ord) => {
                  const statusColors = {
                    pending: 'bg-amber-100 text-amber-800 border-amber-300',
                    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
                    shipped: 'bg-purple-100 text-purple-800 border-purple-300',
                    delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    cancelled: 'bg-red-100 text-red-800 border-red-300',
                  };

                  const cleanPhone = ord.customerPhone.replace(/[^0-9]/g, '');
                  const waCustomerMessage = encodeURIComponent(
                    `Hello ${ord.customerName}! Greetings from SEYOL Care Team.%0A%0ARegarding your Order *#${ord.orderNumber}* (Total: ₹${ord.totalAmount}):%0AOrder Status: *${ord.orderStatus.toUpperCase()}*%0A%0APlease feel free to reply here if you have any questions regarding dispatch or delivery!`
                  );

                  return (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-5 sm:p-6 space-y-4 hover:shadow-warm-xs transition-all"
                    >
                      {/* Top Row: Order Number, Date, Status, Total */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-2xl bg-gold/20 text-maroon flex items-center justify-center font-bold font-mono text-sm shrink-0">
                            📦
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-mono font-black text-sm text-[#7B1131]">
                                #{ord.orderNumber}
                              </h3>
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider border ${statusColors[ord.orderStatus]}`}>
                                {ord.orderStatus}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] text-neutral-400 block font-semibold">Total Amount</span>
                            <span className="font-serif font-black text-lg text-[#3a1d1d]">
                              ₹{ord.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Quick Status Updater Dropdown */}
                          <div className="flex items-center space-x-2">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => {
                                updateOrderStatus(ord.id, e.target.value as OrderStatus);
                                showToast(`Order #${ord.orderNumber} updated to ${e.target.value}`);
                              }}
                              className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 font-bold text-xs cursor-pointer focus:ring-1 focus:ring-maroon"
                            >
                              <option value="pending">🟡 Pending</option>
                              <option value="confirmed">🔵 Confirmed</option>
                              <option value="shipped">🟣 Shipped</option>
                              <option value="delivered">🟢 Delivered</option>
                              <option value="cancelled">🔴 Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Middle Row: Customer Info, Shipping Address, Items Ordered */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* 1. Customer Details */}
                        <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
                          <span className="font-bold text-[#7B1131] uppercase tracking-wider text-[10px] block">
                            Customer Details
                          </span>
                          <div className="font-bold text-[#3a1d1d] text-sm">
                            {ord.customerName}
                          </div>
                          <div className="space-y-1 text-neutral-600">
                            <div className="flex items-center space-x-1.5">
                              <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <a href={`tel:${ord.customerPhone}`} className="hover:underline font-mono">
                                {ord.customerPhone}
                              </a>
                            </div>
                            {ord.customerEmail && (
                              <div className="flex items-center space-x-1.5">
                                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                <span className="truncate">{ord.customerEmail}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1.5 pt-1">
                              <span className="font-bold text-[10px] uppercase text-neutral-500">Payment:</span>
                              <span className="font-bold text-maroon bg-white px-2 py-0.5 rounded border border-neutral-200 uppercase">
                                {ord.paymentMethod} ({ord.paymentStatus})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Shipping Address */}
                        <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
                          <span className="font-bold text-[#7B1131] uppercase tracking-wider text-[10px] block">
                            Shipping Address
                          </span>
                          <div className="flex items-start space-x-1.5 text-neutral-700 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                            <div className="leading-snug">
                              <p className="font-semibold text-[#3a1d1d]">{ord.shippingAddress.street}</p>
                              <p>{ord.shippingAddress.city}, {ord.shippingAddress.state} - <strong className="font-mono">{ord.shippingAddress.pincode}</strong></p>
                            </div>
                          </div>
                          {ord.notes && (
                            <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                              <strong>Note:</strong> {ord.notes}
                            </div>
                          )}
                        </div>

                        {/* 3. Items Summary */}
                        <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
                          <span className="font-bold text-[#7B1131] uppercase tracking-wider text-[10px] block">
                            Items ({ord.items.reduce((acc, i) => acc + i.quantity, 0)} Total)
                          </span>
                          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2.5 bg-white p-2 rounded-xl border border-neutral-200/70">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-9 h-9 rounded-lg object-cover shrink-0 border border-neutral-200"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-serif font-bold text-[11px] text-[#3a1d1d] truncate">
                                    {item.title}
                                  </h5>
                                  <div className="flex justify-between text-[10px] text-neutral-500">
                                    <span>{item.volumeOrType} × {item.quantity}</span>
                                    <span className="font-bold text-[#7B1131]">₹{item.price * item.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-[11px] text-neutral-400 font-mono">
                          ID: {ord.id}
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* WhatsApp Customer Button */}
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${waCustomerMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#15803d] font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Customer</span>
                          </a>

                          {/* View Full Order Details */}
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForView(ord)}
                            className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Invoice</span>
                          </button>

                          {/* Delete / Cancel Order */}
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteConfirmation({
                                isOpen: true,
                                type: 'order',
                                id: ord.id,
                                name: `Order #${ord.orderNumber} (${ord.customerName})`,
                              });
                            }}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {orders.length === 0 && (
                <div className="bg-white p-12 rounded-3xl border border-neutral-200 text-center space-y-3">
                  <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto" />
                  <h3 className="font-serif font-bold text-lg text-neutral-700">No Orders Yet</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When customers place orders via the storefront cart, all customer and order details will appear here in real-time.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 3. ADD / EDIT SERVICE MODAL                                               */}
      {/* ========================================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                  {editingService ? 'Edit Existing Service' : 'Add New Service'}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                  {editingService ? editingService.title : 'Create New Service'}
                </h3>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
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
                  showToast(`Updated service: ${updatedData.title}`);
                } else {
                  addService(updatedData);
                  showToast(`Created new service: ${updatedData.title}`);
                }

                setIsServiceModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* Image Preview & Direct Upload */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Service Image *</span>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-neutral-300 shrink-0">
                    <img
                      src={serviceImageFile || editingService?.heroImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'}
                      alt="Service"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors space-x-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Image from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (b64) => setServiceImageFile(b64))}
                      />
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Upload JPEG, PNG or WebP image. Automatically optimized for web.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Service Name *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingService?.title || ''}
                    placeholder="e.g. Prenatal Massage & Body Alignment"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Short Nav Title</label>
                  <input
                    name="shortTitle"
                    defaultValue={editingService?.shortTitle || ''}
                    placeholder="e.g. Prenatal Massage"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Milestone Stage *</label>
                  <select
                    name="stage"
                    defaultValue={editingService?.stages[0] || 'postpartum'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  >
                    <option value="preconception">Preconception</option>
                    <option value="pregnancy">Pregnancy</option>
                    <option value="postpartum">Postpartum</option>
                    <option value="newborn">Newborn</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Category Name</label>
                  <input
                    name="category"
                    defaultValue={editingService?.category || 'Clinical Postnatal Care'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Session Duration</label>
                  <input
                    name="duration"
                    defaultValue={editingService?.duration || '90-120 Mins / Session'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Price Guide *</label>
                  <input
                    name="pricingGuide"
                    required
                    defaultValue={editingService?.pricingGuide || 'From ₹4,500'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-bold text-[#7B1131]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Tagline Quote</label>
                  <input
                    name="tagline"
                    defaultValue={editingService?.tagline || ''}
                    placeholder="Short emotional quote..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 italic"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Full Description / Summary *</label>
                  <textarea
                    name="summary"
                    rows={3}
                    required
                    defaultValue={editingService?.summary || ''}
                    placeholder="Detailed explanation of the care rituals and safety precautions..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="serviceActive" defaultChecked className="rounded border-neutral-300 text-maroon" />
                <label htmlFor="serviceActive" className="font-bold text-neutral-700 text-xs">Active on live website</label>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ADD / EDIT PRODUCT MODAL                                               */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                  {editingProduct ? 'Edit Existing Product' : 'Add New Herbal Product'}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                  {editingProduct ? editingProduct.title : 'Create New Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || 'New Product';
                const slug = editingProduct?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                const updatedProd: Product = {
                  id: editingProduct?.id || `product-${Date.now()}`,
                  slug: slug,
                  title: title,
                  subtitle: (formData.get('subtitle') as string) || '',
                  category: (formData.get('category') as any) || 'baby-massage',
                  stages: ['newborn', 'postpartum'],
                  volume: (formData.get('volume') as string) || '200 ml',
                  price: Number(formData.get('price')) || 680,
                  currency: 'INR',
                  rating: Number(formData.get('rating')) || 4.95,
                  reviewCount: Number(formData.get('reviewCount')) || 120,
                  badge: (formData.get('badge') as string) || '100% Botanical',
                  isBestseller: formData.get('isBestseller') === 'on',
                  isHerbalHeritage: true,
                  image: productImageFile || (formData.get('imageUrl') as string) || '/images/products-hero-banner.png',
                  shortDescription: (formData.get('shortDescription') as string) || '',
                  fullDescription: (formData.get('fullDescription') as string) || '',
                  keyBenefits: editingProduct?.keyBenefits || [
                    'Nourishes delicate skin barrier naturally',
                    'Promotes deep restful sleep for baby',
                  ],
                  heroIngredients: editingProduct?.heroIngredients || [],
                  usageRitual: editingProduct?.usageRitual || [],
                  safetyCertifications: ['AYUSH Certified', 'Dermatologically Tested'],
                  tags: ((formData.get('tags') as string) || 'Bestseller').split(',').map((t) => t.trim()),
                };

                if (editingProduct) {
                  updateProduct(editingProduct.id, updatedProd);
                  showToast(`Updated product: ${updatedProd.title}`);
                } else {
                  addProduct(updatedProd);
                  showToast(`Created new product: ${updatedProd.title}`);
                }

                setIsProductModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* Product Image Preview & Direct Upload */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">Product Image *</span>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-neutral-300 shrink-0">
                    <img
                      src={productImageFile || editingProduct?.image || '/images/products-hero-banner.png'}
                      alt="Product"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products-hero-banner.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors space-x-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Product Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (b64) => setProductImageFile(b64))}
                      />
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Upload JPEG, PNG or WebP image. Automatically optimized for web.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Product Name *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingProduct?.title || ''}
                    placeholder="e.g. Soothing Baby Massage Oil"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Category *</label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category || 'baby-massage'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  >
                    <option value="baby-massage">Baby Massage Oil</option>
                    <option value="mother-postpartum">Mother Postpartum Oil</option>
                    <option value="bath-wellness">Bath Powders &amp; Ubtans</option>
                    <option value="digestive-relief">Colic &amp; Digestive Roll-Ons</option>
                    <option value="curated-bundle">Curated Combo Sets</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Botanical Infusion Subtitle</label>
                  <input
                    name="subtitle"
                    defaultValue={editingProduct?.subtitle || ''}
                    placeholder="e.g. Cold-Pressed Sweet Almond & Calming Nilgiri Botanicals"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Volume / Pack Size *</label>
                  <input
                    name="volume"
                    required
                    defaultValue={editingProduct?.volume || '200 ml'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Price (INR ₹) *</label>
                  <input
                    name="price"
                    type="number"
                    required
                    defaultValue={editingProduct?.price || 680}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-black text-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Promotional Badge</label>
                  <input
                    name="badge"
                    defaultValue={editingProduct?.badge || 'Flagship Bestseller'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Tags (Comma Separated)</label>
                  <input
                    name="tags"
                    defaultValue={editingProduct?.tags?.join(', ') || 'Bestseller, Newborn Safe (0m+)'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Short Description (Cards) *</label>
                  <textarea
                    name="shortDescription"
                    rows={2}
                    required
                    defaultValue={editingProduct?.shortDescription || ''}
                    placeholder="Summary for product card..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Full Heritage Description</label>
                  <textarea
                    name="fullDescription"
                    rows={3}
                    defaultValue={editingProduct?.fullDescription || ''}
                    placeholder="Classical formulation and Ayurvedic curing details..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 font-bold text-neutral-700 text-xs cursor-pointer">
                  <input type="checkbox" name="isBestseller" defaultChecked={editingProduct?.isBestseller !== false} className="rounded border-neutral-300 text-maroon" />
                  <span>Flagship Bestseller</span>
                </label>

                <label className="flex items-center space-x-2 font-bold text-neutral-700 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-maroon" />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center space-x-2 font-bold text-neutral-700 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-maroon" />
                  <span>Active on Live Site</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ADD / EDIT VIDEO REVIEW MODAL                                          */}
      {/* ========================================================================= */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                  {editingTestimonial ? 'Edit Video Review' : 'Add New Video Review'}
                </h3>
              </div>
              <button
                onClick={() => setIsTestimonialModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const author = (formData.get('author') as string) || 'Client Story';
                const youtubeUrl = (formData.get('youtubeUrl') as string) || videoUrlInput;
                const yid = extractYouTubeId(youtubeUrl);

                const updatedTestimonial: Testimonial = {
                  id: editingTestimonial?.id || `testimonial-${Date.now()}`,
                  author: author,
                  location: (formData.get('location') as string) || 'Singapore',
                  stage: (formData.get('stage') as JourneyStage) || 'postpartum',
                  serviceOrProduct: (formData.get('serviceOrProduct') as string) || 'Mother & Baby Postpartum Care',
                  babyAgeOrWeek: (formData.get('babyAgeOrWeek') as string) || 'Baby Advait (Now 4 months)',
                  quote: (formData.get('quote') as string) || 'SEYOL provided authentic maternal comfort and healing.',
                  detailedStory: (formData.get('detailedStory') as string) || '',
                  rating: Number(formData.get('rating')) || 5,
                  verifiedParent: true,
                  youtubeUrl: youtubeUrl,
                  thumbnailImage: yid ? `https://img.youtube.com/vi/${yid}/hqdefault.jpg` : '',
                  videoDuration: '3:45',
                };

                if (editingTestimonial) {
                  updateTestimonial(editingTestimonial.id, updatedTestimonial);
                  showToast(`Updated video review: ${author}`);
                } else {
                  addTestimonial(updatedTestimonial);
                  showToast(`Added new video review: ${author}`);
                }

                setIsTestimonialModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* YouTube Video URL with Live Player Preview */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                  YouTube Video Link *
                </span>
                
                <div>
                  <input
                    name="youtubeUrl"
                    type="text"
                    required
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-maroon"
                  />
                </div>

                {/* Instant Live Player Preview */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative border border-neutral-300 shadow-xs mt-2">
                  {extractYouTubeId(videoUrlInput) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrlInput)}`}
                      title="Live Video Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/50 text-xs space-y-1.5">
                      <Video className="w-6 h-6" />
                      <span>Paste valid YouTube URL above to preview video</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Parent / Client Name *</label>
                  <input
                    name="author"
                    required
                    defaultValue={editingTestimonial?.author || ''}
                    placeholder="e.g. Deepika & Karthik Sundaram"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Location *</label>
                  <input
                    name="location"
                    required
                    defaultValue={editingTestimonial?.location || 'Singapore'}
                    placeholder="e.g. Singapore / Chennai, India"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Service / Product Received *</label>
                  <input
                    name="serviceOrProduct"
                    required
                    defaultValue={editingTestimonial?.serviceOrProduct || 'Mother & Baby Postpartum Package'}
                    placeholder="e.g. 28-Day Postpartum Care & Bath"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Baby Milestone / Age</label>
                  <input
                    name="babyAgeOrWeek"
                    defaultValue={editingTestimonial?.babyAgeOrWeek || 'Baby Advait (Now 4 months)'}
                    placeholder="e.g. Baby Tara (Now 6 months)"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Journey Stage *</label>
                  <select
                    name="stage"
                    defaultValue={editingTestimonial?.stage || 'postpartum'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  >
                    <option value="preconception">Preconception & Fertility</option>
                    <option value="pregnancy">Pregnancy & Doula</option>
                    <option value="postpartum">Postpartum Confinement & Massage</option>
                    <option value="newborn">Infant Bath & Colic</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Rating *</label>
                  <select
                    name="rating"
                    defaultValue={editingTestimonial?.rating || 5}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-bold text-amber-700"
                  >
                    <option value="5">★★★★★ 5 Stars (Exceptional)</option>
                    <option value="4">★★★★☆ 4 Stars (Very Good)</option>
                    <option value="3">★★★☆☆ 3 Stars (Good)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Headline Quote *</label>
                  <input
                    name="quote"
                    required
                    defaultValue={editingTestimonial?.quote || ''}
                    placeholder="e.g. SEYOL was like having a loving grandmother and certified nurse in one."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-serif font-bold text-maroon"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Full Detailed Story / Review</label>
                  <textarea
                    name="detailedStory"
                    rows={3}
                    defaultValue={editingTestimonial?.detailedStory || ''}
                    placeholder="Share the full experience and recovery details..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingTestimonial ? 'Update Video Review' : 'Save Video Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ADD / EDIT COMBINED PACKAGE MODAL                                      */}
      {/* ========================================================================= */}
      {isCombinedPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                  {editingCombinedPackage ? 'Edit Combined Package' : 'Add New Combined Package'}
                </h3>
              </div>
              <button
                onClick={() => setIsCombinedPackageModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = (formData.get('name') as string) || 'SEYOL Package';
                const num = (formData.get('num') as string) || '01';
                const price = Number(formData.get('price')) || 35000;
                const priceDisplay = (formData.get('priceDisplay') as string) || `₹${price.toLocaleString('en-IN')} / Package`;

                const updatedPackage: CombinedPackageItem = {
                  id: editingCombinedPackage?.id || `package-${Date.now()}`,
                  num: num,
                  name: name,
                  badge: (formData.get('badge') as string) || 'Essential Postpartum',
                  popular: formData.get('popular') === 'on',
                  infantSessions: (formData.get('infantSessions') as string) || '15 Sessions of Infant Massage & Bath',
                  postpartumSessions: (formData.get('postpartumSessions') as string) || '10 Sessions of Postpartum Massage & Wrap',
                  price: price,
                  priceDisplay: priceDisplay,
                  waLink: (formData.get('waLink') as string) || 'https://wa.link/zi9nsk',
                  description: (formData.get('description') as string) || '',
                };

                if (editingCombinedPackage) {
                  updateCombinedPackage(editingCombinedPackage.id, updatedPackage);
                  showToast(`Updated package: ${name}`);
                } else {
                  addCombinedPackage(updatedPackage);
                  showToast(`Created new package: ${name}`);
                }

                setIsCombinedPackageModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Package Number *</label>
                  <input
                    name="num"
                    required
                    defaultValue={editingCombinedPackage?.num || '01'}
                    placeholder="e.g. 01, 02, 07"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-mono font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Package Title *</label>
                  <input
                    name="name"
                    required
                    defaultValue={editingCombinedPackage?.name || ''}
                    placeholder="e.g. SEYOL Package 1 or Royal Mandalam"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Package Badge</label>
                  <input
                    name="badge"
                    defaultValue={editingCombinedPackage?.badge || 'Essential Postpartum'}
                    placeholder="e.g. Sacred Mandalam, Complete Care"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Price in INR (₹) *</label>
                  <input
                    name="price"
                    type="number"
                    required
                    defaultValue={editingCombinedPackage?.price || 35000}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-bold text-[#7B1131]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Display Price Format</label>
                  <input
                    name="priceDisplay"
                    defaultValue={editingCombinedPackage?.priceDisplay || '₹35,000 / Package'}
                    placeholder="e.g. ₹35,000 / Package"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Infant Care Sessions Breakdown *</label>
                  <input
                    name="infantSessions"
                    required
                    defaultValue={editingCombinedPackage?.infantSessions || '15 Sessions of Infant Massage & Bath'}
                    placeholder="e.g. 15 Sessions of Infant Massage & Bath"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Postpartum Mother Sessions Breakdown *</label>
                  <input
                    name="postpartumSessions"
                    required
                    defaultValue={editingCombinedPackage?.postpartumSessions || '10 Sessions of Postpartum Massage & Wrap'}
                    placeholder="e.g. 10 Sessions of Postpartum Massage & Wrap"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Package Description</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={editingCombinedPackage?.description || ''}
                    placeholder="Care details and included benefits..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">WhatsApp Booking Link</label>
                  <input
                    name="waLink"
                    defaultValue={editingCombinedPackage?.waLink || 'https://wa.link/zi9nsk'}
                    placeholder="https://wa.link/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 font-bold text-neutral-700 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    name="popular"
                    defaultChecked={editingCombinedPackage?.popular}
                    className="rounded border-neutral-300 text-maroon"
                  />
                  <span>Mark as "Most Popular / Recommended" Package</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCombinedPackageModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingCombinedPackage ? 'Update Package' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ADD / EDIT PRODUCT HERO BANNER MODAL                                   */}
      {/* ========================================================================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                  {editingBanner ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}
                </h3>
              </div>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || 'Hero Banner';

                const updatedSlide: ProductBannerSlide = {
                  id: editingBanner?.id || `banner-${Date.now()}`,
                  image: bannerImageFile || editingBanner?.image || '/images/products-hero-banner.png',
                  badge: (formData.get('badge') as string) || 'OFFICIAL SEYOL BOTANICAL FORMULATION',
                  title: title,
                  subtitle: (formData.get('subtitle') as string) || '',
                  productNames: (formData.get('productNames') as string) || '',
                  ctaText: (formData.get('ctaText') as string) || 'Shop Baby Oil >',
                  categoryTarget: (formData.get('categoryTarget') as string) || 'all',
                  isLight: formData.get('isLight') === 'on',
                  bgGradient: 'from-[#EFE7DB]/95 via-[#EFE7DB]/85 md:via-[#EFE7DB]/40 to-transparent',
                };

                if (editingBanner) {
                  updateProductBannerSlide(editingBanner.id, updatedSlide);
                  showToast(`Updated banner: ${title}`);
                } else {
                  addProductBannerSlide(updatedSlide);
                  showToast(`Added new banner: ${title}`);
                }

                setIsBannerModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* Banner Image Upload & Live Preview */}
              <div className="space-y-2">
                <label className="font-bold text-neutral-700 block">Banner Image *</label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <div className="w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 relative shrink-0">
                    <img
                      src={bannerImageFile || editingBanner?.image || '/images/products-hero-banner.png'}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products-hero-banner.png';
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center justify-center p-3 rounded-xl border border-dashed border-[#7B1131]/40 hover:border-maroon bg-white text-xs font-bold text-neutral-700 cursor-pointer hover:bg-neutral-50 transition-all space-x-2 shadow-2xs">
                      <Upload className="w-4 h-4 text-[#7B1131]" />
                      <span>{bannerImageFile ? 'Change / Upload New Image' : 'Upload Banner Image from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (b64) => setBannerImageFile(b64))}
                      />
                    </label>

                    {bannerImageFile && (
                      <button
                        type="button"
                        onClick={() => setBannerImageFile('')}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-[11px] hover:bg-red-100 transition-colors"
                      >
                        Reset to original image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Banner Title / Headline *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingBanner?.title || ''}
                    placeholder="e.g. Soothing Baby Massage Oil"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-serif font-bold text-sm text-[#3a1d1d]"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Badge Tag</label>
                  <input
                    name="badge"
                    defaultValue={editingBanner?.badge || 'OFFICIAL SEYOL BOTANICAL FORMULATION'}
                    placeholder="e.g. SACRED 40-DAY CONFINEMENT"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Target Category Filter</label>
                  <select
                    name="categoryTarget"
                    defaultValue={editingBanner?.categoryTarget || 'all'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-semibold"
                  >
                    <option value="all">All Products</option>
                    <option value="baby-massage">Baby Massage Oils</option>
                    <option value="mother-postpartum">Mother Postpartum Oils</option>
                    <option value="bath-wellness">Bath Powders &amp; Ubtan</option>
                    <option value="digestive-relief">Colic &amp; Gas Relief</option>
                    <option value="bundles">Curated Combos</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Subtitle / Highlight Text</label>
                  <input
                    name="subtitle"
                    defaultValue={editingBanner?.subtitle || ''}
                    placeholder="e.g. Nourishing, gentle, pure care for newborn baby massage & sweet sleep."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Included Product Names / Key Botanicals</label>
                  <input
                    name="productNames"
                    defaultValue={editingBanner?.productNames || ''}
                    placeholder="e.g. Cold-Pressed Sweet Almond, Virgin Coconut & Calming Nilgiri Botanicals (200 ml)"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Action Button (CTA) Text</label>
                  <input
                    name="ctaText"
                    defaultValue={editingBanner?.ctaText || 'Shop Baby Oil >'}
                    placeholder="e.g. Shop Baby Oil >"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 font-bold"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 font-bold text-neutral-700 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      name="isLight"
                      defaultChecked={editingBanner ? editingBanner.isLight : true}
                      className="rounded border-neutral-300 text-maroon"
                    />
                    <span>Light Background Theme</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 font-bold text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingBanner ? 'Update Banner' : 'Save Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. ORDER DETAILS & INVOICE BREAKDOWN MODAL                                */}
      {/* ========================================================================= */}
      {selectedOrderForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-neutral-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold/20 text-maroon flex items-center justify-center font-bold text-sm">
                  📦
                </div>
                <div>
                  <h3 className="font-mono font-black text-lg text-[#7B1131]">
                    Order #{selectedOrderForView.orderNumber}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Placed on {new Date(selectedOrderForView.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrderForView(null)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-neutral-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#7B1131] tracking-wider block">Customer Contact</span>
                <div className="font-bold text-sm text-[#3a1d1d]">{selectedOrderForView.customerName}</div>
                <div className="text-neutral-600 space-y-1">
                  <div>📞 {selectedOrderForView.customerPhone}</div>
                  <div>✉️ {selectedOrderForView.customerEmail}</div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-neutral-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#7B1131] tracking-wider block">Delivery Destination</span>
                <div className="text-neutral-700 font-medium leading-relaxed">
                  <p className="font-semibold text-[#3a1d1d]">{selectedOrderForView.shippingAddress.street}</p>
                  <p>{selectedOrderForView.shippingAddress.city}, {selectedOrderForView.shippingAddress.state}</p>
                  <p className="font-mono font-bold">PIN: {selectedOrderForView.shippingAddress.pincode}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-neutral-700 block">Ordered Products</span>
              <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {selectedOrderForView.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 flex items-center space-x-2.5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-200"
                          />
                          <div>
                            <div className="font-serif font-bold text-neutral-800">{item.title}</div>
                            <div className="text-[10px] text-neutral-400">{item.volumeOrType}</div>
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-neutral-700">{item.quantity}</td>
                        <td className="p-3 text-right font-mono">₹{item.price}</td>
                        <td className="p-3 text-right font-mono font-bold text-[#7B1131]">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{selectedOrderForView.subtotal}</span>
              </div>
              {selectedOrderForView.discount > 0 && (
                <div className="flex justify-between text-maroon font-semibold">
                  <span>Routine &amp; Bundle Savings:</span>
                  <span className="font-mono">-₹{selectedOrderForView.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping:</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#7B1131] pt-2 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span>₹{selectedOrderForView.totalAmount}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500 pt-1">
                <span>Payment Mode:</span>
                <span className="uppercase font-bold text-neutral-700">{selectedOrderForView.paymentMethod} ({selectedOrderForView.paymentStatus})</span>
              </div>
            </div>

            {/* Change Status & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-neutral-600">Update Status:</span>
                <select
                  value={selectedOrderForView.orderStatus}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrderForView.id, e.target.value as OrderStatus);
                    setSelectedOrderForView({
                      ...selectedOrderForView,
                      orderStatus: e.target.value as OrderStatus,
                    });
                    showToast(`Order #${selectedOrderForView.orderNumber} updated!`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-300 font-bold text-xs cursor-pointer"
                >
                  <option value="pending">🟡 Pending</option>
                  <option value="confirmed">🔵 Confirmed</option>
                  <option value="shipped">🟣 Shipped</option>
                  <option value="delivered">🟢 Delivered</option>
                  <option value="cancelled">🔴 Cancelled</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderForView(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Close Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
