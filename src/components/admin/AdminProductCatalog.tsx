'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Search, Plus, Trash2, Edit3, 
  Upload, Tag, Package, Star, AlertTriangle, 
  X, Check, CheckCircle2, Sparkles, ExternalLink
} from 'lucide-react';
import { useAdminData, CombinedPackageItem } from '../../context/AdminDataContext';
import { Product } from '../../types';

interface AdminProductCatalogProps {
  onNotify?: (msg: string) => void;
}

export const AdminProductCatalog: React.FC<AdminProductCatalogProps> = ({ onNotify }) => {
  const {
    products,
    combinedPackages,
    addProduct,
    updateProduct,
    deleteProduct,
    addCombinedPackage,
    updateCombinedPackage,
    deleteCombinedPackage,
  } = useAdminData();

  const [productSubTab, setProductSubTab] = useState<'catalog' | 'bundles'>('catalog');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const notify = (msg: string) => {
    if (onNotify) onNotify(msg);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Filter products
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

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImageFile, setProductImageFile] = useState('');

  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<CombinedPackageItem | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'product' | 'bundle';
    id: string;
    name: string;
  } | null>(null);

  // Canvas Image Compression
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
          notify('Product image optimized');
        } else {
          onResult(event.target?.result as string);
          notify('Product image loaded');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
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
            Apothecary &amp; Formulations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
            Botanical Product Catalog
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Cold-pressed oils, sacred bath herbs, digestive roll-ons, and combined confinement care bundles.
          </p>
        </div>

        <Link
          href="/products"
          target="_blank"
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:border-[#7B1131] hover:text-[#7B1131] transition-colors shrink-0 shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#C89D4B]" />
          <span>View Public Store</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </Link>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 w-fit max-w-full overflow-x-auto">
        <button
          type="button"
          onClick={() => setProductSubTab('catalog')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            productSubTab === 'catalog'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Botanical Products</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {products.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setProductSubTab('bundles')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
            productSubTab === 'bundles'
              ? 'bg-white text-[#7B1131] shadow-xs border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Combined Care Bundles</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-200 text-stone-700">
            {combinedPackages.length}
          </span>
        </button>
      </div>

      {/* ─── TAB 1: PRODUCT CATALOG ───────────────────────────────────────── */}
      {productSubTab === 'catalog' && (
        <div className="space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search botanical products by title, herb or volume..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131] text-stone-700 font-medium"
              >
                <option value="all">All Formulas</option>
                <option value="baby-massage">Baby Massage Oils</option>
                <option value="mother-postpartum">Mother Postpartum Care</option>
                <option value="digestive-relief">Digestive &amp; Colic</option>
                <option value="bath-wellness">Bath &amp; Herbal Sachets</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setProductImageFile('');
                setIsProductModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Botanical Product</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#7B1131]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative bg-stone-100 overflow-hidden p-3 flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      {prod.isBestseller && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#7B1131] text-white shadow-xs">
                          Bestseller
                        </span>
                      )}
                      {prod.isHerbalHeritage && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          Heritage
                        </span>
                      )}
                    </div>
                    {prod.volume && (
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-stone-900/80 text-white">
                        {prod.volume}
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                          {prod.category}
                        </span>
                        <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                          {prod.title}
                        </h3>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-stone-900">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {prod.subtitle || prod.shortDescription}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-amber-500 pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-stone-800">{prod.rating || 5.0}</span>
                      <span className="text-[11px] text-stone-400">({prod.reviewCount || 40} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-mono truncate max-w-[140px]">
                    ID: {prod.id}
                  </span>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(prod);
                        setProductImageFile(prod.image);
                        setIsProductModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-[#7B1131] hover:bg-white"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'product',
                        id: prod.id,
                        name: prod.title,
                      })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-white"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-2">
              <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs font-semibold text-stone-700">No products match your search or category</p>
              <p className="text-[11px] text-stone-400">Adjust your keywords or select All Formulas.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: COMBINED CARE BUNDLES ─────────────────────────────────── */}
      {productSubTab === 'bundles' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Combined Care &amp; Confinement Packages
              </h2>
              <p className="text-xs text-stone-500">
                Specialized postpartum packages combining doula sessions with traditional botanical oils.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingBundle(null);
                setIsBundleModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combinedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#7B1131]/10 text-[#7B1131]">
                      {pkg.badge || pkg.num || 'PACKAGE'}
                    </span>
                    <div className="text-right">
                      <div className="text-base font-serif font-bold text-stone-900">
                        {pkg.priceDisplay || (pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : 'Enquire')}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    {pkg.name}
                  </h3>
                  {pkg.description && (
                    <p className="text-xs text-stone-500">
                      {pkg.description}
                    </p>
                  )}

                  <div className="space-y-1 pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Postpartum Visits:</span>
                      <strong className="text-stone-700">{pkg.postpartumSessions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Infant Care:</span>
                      <strong className="text-stone-700">{pkg.infantSessions}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold truncate max-w-[140px]">
                    {pkg.waLink ? 'WhatsApp Booking' : 'Active'}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBundle(pkg);
                        setIsBundleModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-[#7B1131] hover:bg-stone-50"
                      title="Edit Package"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation({
                        type: 'bundle',
                        id: pkg.id,
                        name: pkg.name,
                      })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-50"
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
      )}

      {/* ─── MODAL: ADD / EDIT PRODUCT ────────────────────────────────────── */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B1131]">
                  {editingProduct ? 'Edit Botanical Formula' : 'New Product'}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingProduct ? editingProduct.title : 'Create Botanical Product'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = (formData.get('title') as string) || 'New Botanical Formula';
                const slug = editingProduct?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const price = Number(formData.get('price')) || 680;

                const updatedData: Product = {
                  id: editingProduct?.id || `product-${Date.now()}`,
                  slug: slug,
                  title: title,
                  subtitle: (formData.get('subtitle') as string) || '',
                  category: (formData.get('category') as any) || 'baby-massage',
                  stages: editingProduct?.stages || ['newborn'],
                  volume: (formData.get('volume') as string) || '200 ml',
                  price: price,
                  currency: 'INR',
                  rating: Number(formData.get('rating')) || 4.9,
                  reviewCount: Number(formData.get('reviewCount')) || 40,
                  isBestseller: formData.get('isBestseller') === 'true',
                  isHerbalHeritage: true,
                  badge: (formData.get('badge') as string) || 'OFFICIAL SEYOL BOTANICAL FORMULATION',
                  shortDescription: (formData.get('shortDescription') as string) || '',
                  fullDescription: editingProduct?.fullDescription || (formData.get('shortDescription') as string) || '',
                  image: productImageFile || (formData.get('imageUrl') as string) || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
                  keyBenefits: editingProduct?.keyBenefits || ['Nourishes delicate newborn skin', '100% pure traditional formulation'],
                  heroIngredients: editingProduct?.heroIngredients || [
                    { name: 'Cold-Pressed Sweet Almond', traditionalRole: 'Vitamin E & skin nourishment' }
                  ],
                  usageRitual: editingProduct?.usageRitual || ['Warm oil between palms', 'Gently massage with circular strokes'],
                  safetyCertifications: editingProduct?.safetyCertifications || ['Dermatologically Tested', 'AYUSH Certified'],
                  tags: editingProduct?.tags || ['baby', 'massage', 'oil'],
                };

                if (editingProduct) {
                  updateProduct(editingProduct.id, updatedData);
                  notify(`Updated product: ${updatedData.title}`);
                } else {
                  addProduct(updatedData);
                  notify(`Created product: ${updatedData.title}`);
                }
                setIsProductModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              {/* Image Preview & Upload */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center space-x-3.5">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-200 shrink-0 p-1 flex items-center justify-center">
                  <img
                    src={productImageFile || editingProduct?.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'}
                    alt="Product preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-[11px] cursor-pointer shadow-xs space-x-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload Product Bottle Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (b64) => setProductImageFile(b64))}
                    />
                  </label>
                  <p className="text-[10px] text-stone-400">High-resolution bottle photo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProduct?.title}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Category Formulation
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category || 'baby-massage'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value="baby-massage">Baby Massage Oil</option>
                    <option value="mother-postpartum">Mother Postpartum Care</option>
                    <option value="digestive-relief">Digestive &amp; Colic Relief</option>
                    <option value="bath-wellness">Bath &amp; Herbal Sachets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Selling Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingProduct?.price || 680}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Volume / Net Quantity
                  </label>
                  <input
                    type="text"
                    name="volume"
                    defaultValue={editingProduct?.volume || '200 ml'}
                    placeholder="E.g., 200 ml or 100g"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Bestseller Tag
                  </label>
                  <select
                    name="isBestseller"
                    defaultValue={editingProduct?.isBestseller ? 'true' : 'false'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  >
                    <option value="true">Yes, Highlight as Bestseller</option>
                    <option value="false">Standard Catalog Item</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={editingProduct?.subtitle}
                  placeholder="E.g., Cold-Pressed Sweet Almond, Virgin Coconut &amp; Calming Nilgiri Botanicals"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  rows={2}
                  defaultValue={editingProduct?.shortDescription}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold text-xs shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT BUNDLE ─────────────────────────────────────── */}
      {isBundleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900">
                {editingBundle ? 'Edit Care Package' : 'Create Care Package'}
              </h3>
              <button
                type="button"
                onClick={() => setIsBundleModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = (formData.get('name') as string) || 'Care Package';
                const price = Number(formData.get('price')) || 7500;

                const updatedData: CombinedPackageItem = {
                  id: editingBundle?.id || `bundle-${Date.now()}`,
                  num: editingBundle?.num || '01',
                  name: name,
                  badge: (formData.get('badge') as string) || 'CONFINEMENT CARE',
                  popular: formData.get('popular') === 'true',
                  infantSessions: (formData.get('infantSessions') as string) || 'Daily Infant Bath & Gentle Massage',
                  postpartumSessions: (formData.get('postpartumSessions') as string) || 'Traditional Abdominal Belly Binding',
                  price: price,
                  priceDisplay: `₹${price.toLocaleString('en-IN')}`,
                  waLink: editingBundle?.waLink || 'https://wa.me/919840199887',
                  description: (formData.get('description') as string) || '',
                };

                if (editingBundle) {
                  updateCombinedPackage(editingBundle.id, updatedData);
                  notify('Package updated');
                } else {
                  addCombinedPackage(updatedData);
                  notify('Package created');
                }
                setIsBundleModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingBundle?.name}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingBundle?.price || 7500}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    name="badge"
                    defaultValue={editingBundle?.badge || 'CONFINEMENT CARE'}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Postpartum Care Inclusions
                </label>
                <input
                  type="text"
                  name="postpartumSessions"
                  defaultValue={editingBundle?.postpartumSessions || 'Traditional Abdominal Belly Binding & Herbal Oil'}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Infant Care Inclusions
                </label>
                <input
                  type="text"
                  name="infantSessions"
                  defaultValue={editingBundle?.infantSessions || 'Daily Infant Bath & Gentle Massage'}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Description / Overview
                </label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingBundle?.description || ''}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1131]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsBundleModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7B1131] hover:bg-[#5E0C24] text-white font-semibold shadow-xs"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: DELETE CONFIRMATION ──────────────────────────────────── */}
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
                Are you sure you want to remove <strong className="text-stone-800">{deleteConfirmation.name}</strong>? This immediately unlists it from the live catalog.
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
                  if (deleteConfirmation.type === 'product') {
                    deleteProduct(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'bundle') {
                    deleteCombinedPackage(deleteConfirmation.id);
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
