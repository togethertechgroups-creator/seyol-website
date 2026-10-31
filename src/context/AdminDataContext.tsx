'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Testimonial, Product, ProductOrder, OrderStatus, PaymentStatus } from '../types';
import { servicesData as defaultServicesData } from '../data/services';
import { testimonialsData as defaultTestimonialsData } from '../data/testimonials';
import { productsData as defaultProductsData } from '../data/products';
import { bookingServicesConfig as defaultBookingServicesConfig } from '../data/bookingServicesData';
import { BookingServiceConfig, BookingServiceId, BookingServicePackage } from '../types/booking';
export type { BookingServiceConfig, BookingServiceId, BookingServicePackage };

const SERVICES_STORAGE_KEY = 'seyol_admin_services_v3';
const SERVICES_SETTINGS_STORAGE_KEY = 'seyol_admin_services_settings_v1';
const PRODUCTS_STORAGE_KEY = 'seyol_admin_products_v2';
const HOME_SETTINGS_STORAGE_KEY = 'seyol_admin_home_settings_v2';
const PRODUCTS_SETTINGS_STORAGE_KEY = 'seyol_admin_products_settings_v2';
const PRODUCT_BANNERS_STORAGE_KEY = 'seyol_admin_product_banners_v2';
const BOOKING_CONFIGS_STORAGE_KEY = 'seyol_admin_booking_configs_v2';
const TESTIMONIALS_STORAGE_KEY = 'seyol_admin_testimonials_v3';
const COMBINED_PACKAGES_STORAGE_KEY = 'seyol_admin_combined_packages_v2';
const ORDERS_STORAGE_KEY = 'seyol_admin_orders_v2';
const STAGE_RESOURCES_STORAGE_KEY = 'seyol_admin_stage_resources_v2';
const GUIDE_LEADS_STORAGE_KEY = 'seyol_admin_guide_leads_v2';
const WHY_TRUST_VIDEOS_STORAGE_KEY = 'seyol_admin_why_trust_videos_v1';

export type JourneyStageKey = 'pregnancy' | 'postpartum' | 'newborn' | 'preconception';

export interface StageResourceGuide {
  id: string;
  stage: JourneyStageKey;
  stageLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  fileName: string;
  fileUrl?: string;
  fileSize?: string;
  pageCount?: string;
  highlights: string[];
  updatedAt: string;
}

export interface GuideLead {
  id: string;
  fullName: string;
  email: string;
  stage: JourneyStageKey | string;
  guideTitle: string;
  downloadedAt: string;
}

export const defaultStageResourceGuides: Record<JourneyStageKey, StageResourceGuide> = {
  pregnancy: {
    id: 'guide-pregnancy',
    stage: 'pregnancy',
    stageLabel: 'Currently Pregnant (2nd/3rd Trimester)',
    badge: 'Complimentary Trimester Guide',
    title: 'Download "Garbhini: South Indian Pregnancy & Labour Preparation Handbook"',
    subtitle: 'Evidence-based traditional dietary practices, womb bonding techniques, and labour breathing rituals curated for 2nd and 3rd trimesters.',
    fileName: 'SEYOL-Garbhini-Pregnancy-Guide.pdf',
    fileSize: '4.2 MB',
    pageCount: '28 Pages',
    highlights: ['Instant PDF Download', 'Prenatal Herbal Diet Chart', 'Hospital Bag Packing List'],
    updatedAt: new Date().toISOString(),
  },
  postpartum: {
    id: 'guide-postpartum',
    stage: 'postpartum',
    stageLabel: 'Newly Postpartum (First 40 Days)',
    badge: 'Complimentary Fourth Trimester Guide',
    title: 'Download "The Sacred 40 Days: South Indian Confinement Wisdom"',
    subtitle: 'Receive our curated 36-page guide on postpartum herbal recovery, maternal nutrition recipes, and infant sleep rituals delivered directly to your inbox.',
    fileName: 'SEYOL-The-Sacred-40-Days-Confinement-Wisdom.pdf',
    fileSize: '5.8 MB',
    pageCount: '36 Pages',
    highlights: ['Instant PDF Download', '40-Day Meal Planner', '100% Free • No Spam'],
    updatedAt: new Date().toISOString(),
  },
  newborn: {
    id: 'guide-newborn',
    stage: 'newborn',
    stageLabel: 'Parent of a Newborn (0–12 Months)',
    badge: 'Complimentary Infant Care Blueprint',
    title: 'Download "Gentle Beginnings: Traditional Baby Bath & Thokkanam Massage"',
    subtitle: 'A pictorial, step-by-step master handbook for traditional infant massage, colic soothing holds, herbal bath timing, and non-toxic nursery care.',
    fileName: 'SEYOL-Traditional-Baby-Massage-Handbook.pdf',
    fileSize: '6.1 MB',
    pageCount: '32 Pages',
    highlights: ['Instant PDF Download', 'Baby Colic & Gas Chart', 'Warm Herbal Bath Guide'],
    updatedAt: new Date().toISOString(),
  },
  preconception: {
    id: 'guide-preconception',
    stage: 'preconception',
    stageLabel: 'Trying to Conceive / Planning Ahead',
    badge: 'Complimentary Womb Wellness Guide',
    title: 'Download "Garbhadhana: Ancestral Womb Nourishment & Fertility Blueprint"',
    subtitle: 'Holistic reproductive health protocols, cycle-syncing nutrition, uterine warmth tonics, and partner vitality practices before conception.',
    fileName: 'SEYOL-Preconception-Womb-Nourishment-Guide.pdf',
    fileSize: '3.8 MB',
    pageCount: '24 Pages',
    highlights: ['Instant PDF Download', 'Cycle Nutrition Checklist', 'Restorative Womb Rituals'],
    updatedAt: new Date().toISOString(),
  },
};

export const defaultGuideLeads: GuideLead[] = [
  {
    id: 'lead-1',
    fullName: 'Priya Sundaram',
    email: 'priya.sundaram@gmail.com',
    stage: 'postpartum',
    guideTitle: 'Download "The Sacred 40 Days: South Indian Confinement Wisdom"',
    downloadedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'lead-2',
    fullName: 'Deepika Ramanathan',
    email: 'deepika.r@outlook.com',
    stage: 'pregnancy',
    guideTitle: 'Download "Garbhini: South Indian Pregnancy & Labour Preparation Handbook"',
    downloadedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

export interface HomeSettings {
  founderStoryImage: string;
  founderName: string;
  founderTitle: string;
  founderSubtitle: string;
  mothersSupported: string;
  familiesSupported: string;
  homeVideoUrl: string;
  homeVideoTitle?: string;
  homeVideoAuthor?: string;
  // Hero Carousel Images for Start Here / Homepage
  heroSlide1Image?: string;
  heroSlide2Image?: string;
  heroSlide3Image?: string;
  heroSlide4Image?: string;
  // Shop by Routine Images for Start Here / Homepage
  routineBathImage?: string;
  routineMassageImage?: string;
  routineSleepImage?: string;
  routineMomCareImage?: string;
}

export const defaultHomeSettings: HomeSettings = {
  founderStoryImage: '/images/founder-jemma-francis.jpg',
  founderName: 'Mrs. Jemma Francis',
  founderTitle: 'Founder & Childbirth Educator',
  founderSubtitle: 'Certified Birth & Postpartum Doula • Singapore & India',
  mothersSupported: '2,400+',
  familiesSupported: '1,800+',
  homeVideoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  homeVideoTitle: 'Natural Postpartum Healing & Doula Care',
  homeVideoAuthor: 'Deepika & Karthik',
  heroSlide1Image: '',
  heroSlide2Image: '',
  heroSlide3Image: '',
  heroSlide4Image: '',
  routineBathImage: '',
  routineMassageImage: '',
  routineSleepImage: '',
  routineMomCareImage: '',
};

export interface ProductBannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  productNames?: string;
  ctaText?: string;
  categoryTarget?: string;
  isLight?: boolean;
  bgGradient?: string;
}

export const defaultProductBannerSlides: ProductBannerSlide[] = [
  {
    id: 'slide-1',
    badge: 'OFFICIAL SEYOL BOTANICAL FORMULATION',
    subtitle: 'Nourishing, gentle, pure care for newborn baby massage & sweet sleep.',
    title: 'Soothing Baby Massage Oil',
    productNames: 'Cold-Pressed Sweet Almond, Virgin Coconut & Calming Nilgiri Botanicals (200 ml)',
    ctaText: 'Shop Baby Oil >',
    categoryTarget: 'baby-massage',
    bgGradient: 'from-[#EFE7DB]/95 via-[#EFE7DB]/85 md:via-[#EFE7DB]/40 to-transparent',
    isLight: true,
    image: '/images/products-hero-banner.png',
  },
  {
    id: 'slide-2',
    badge: 'SACRED 40-DAY CONFINEMENT',
    subtitle: 'Deep tissue rejuvenation, uterine recovery, and restorative herbal baths.',
    title: 'The Ultimate Mother Postpartum Healing Set',
    productNames: 'Restorative Mother Massage Oil + Warming Vethu Kuli Sachet',
    ctaText: 'Explore Mother Care >',
    categoryTarget: 'mother-postpartum',
    bgGradient: 'from-[#4a0e1c]/95 via-[#7B1131]/85 md:via-[#7B1131]/60 to-transparent',
    isLight: false,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'slide-3',
    badge: 'INSTANT DIGESTIVE COMFORT',
    subtitle: 'Mess-free Hing, Ajwain & Sweet Fennel roll-on for rapid tummy relief.',
    title: 'Doctor-Formulated Colic & Gas Relief',
    productNames: '100% Baby-Safe Tummy Roll-On with Pure Hing Extract',
    ctaText: 'Get Colic Relief >',
    categoryTarget: 'digestive-relief',
    bgGradient: 'from-[#3a2016]/95 via-[#5c3324]/85 md:via-[#5c3324]/60 to-transparent',
    isLight: false,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1200',
  },
];

export interface ServicesSettings {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  searchPlaceholder: string;
}

export const defaultServicesSettings: ServicesSettings = {
  sectionBadge: 'YOUR JOURNEY, YOUR WAY',
  sectionTitle: 'Popular Ways Families Begin',
  sectionSubtitle: "Choose what feels right for you. We'll help you find the right care.",
  searchPlaceholder: 'Search by need: massage, belly binding, nanny, doula...',
};

export interface ProductsSettings {
  heroImage: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
}

export const defaultProductsSettings: ProductsSettings = {
  heroImage: '/images/products-hero-banner.png',
  heroBadge: 'OFFICIAL SEYOL BOTANICAL FORMULATION',
  heroTitle: 'Soothing Baby Massage Oil',
  heroSubtitle: 'Nourishing, gentle, pure care for newborn baby massage & sweet sleep.',
};

// Helper to extract YouTube video ID from various URL formats
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const clean = url.trim();
  // Standard watch?v=...
  const matchWatch = clean.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
  if (matchWatch && matchWatch[1]) {
    return matchWatch[1];
  }
  // Direct 11 char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }
  return null;
}

export interface WhyTrustVideoStory {
  id: string;
  youtubeIdOrUrl: string;
  title: string;
  tag: string;
  family: string;
}

export const defaultWhyTrustVideoStories: WhyTrustVideoStory[] = [
  {
    id: 'story-1',
    youtubeIdOrUrl: '2CUZML1oP6c',
    title: '50 Infant Massage & Bath + 35 Postpartum Sessions',
    tag: 'Care Journey',
    family: 'Daisy Lodge Condominium',
  },
  {
    id: 'story-2',
    youtubeIdOrUrl: '2bmZwC4BS8I',
    title: '30 Infant Massage & Bath + 15 Postpartum Sessions',
    tag: 'Repeat Journey',
    family: '2nd-Time Indian Singaporean Mum',
  },
  {
    id: 'story-3',
    youtubeIdOrUrl: 'yWk4VLjkuUA',
    title: 'Life-Changing Postnatal & Postpartum Services',
    tag: 'Client Feedback',
    family: 'Client Interview',
  },
];

export interface CombinedPackageItem {
  id: string;
  num: string;
  name: string;
  badge: string;
  popular?: boolean;
  infantSessions: string;
  postpartumSessions: string;
  price?: number;
  priceDisplay?: string;
  waLink: string;
  description?: string;
}

export const defaultCombinedPackages: CombinedPackageItem[] = [
  {
    id: 'package-1',
    num: '01',
    name: 'SEYOL Package 1',
    badge: 'Starter Care',
    infantSessions: '15 Sessions of Infant Massage & Bath',
    postpartumSessions: '10 Sessions of Postpartum Massage & Wrap',
    price: 32000,
    priceDisplay: '₹32,000 / Package',
    waLink: 'https://wa.link/7y762c',
    description: 'Essential mother and newborn starter therapy for first 2 weeks after birth.',
  },
  {
    id: 'package-2',
    num: '02',
    name: 'SEYOL Package 2',
    badge: 'Extended Healing',
    infantSessions: '30 Sessions of Infant Massage & Bath',
    postpartumSessions: '15 Sessions of Postpartum Massage & Wrap',
    price: 48000,
    priceDisplay: '₹48,000 / Package',
    waLink: 'https://wa.link/1ux56m',
    description: 'Comprehensive 1-month traditional postpartum rejuvenation and newborn massage.',
  },
  {
    id: 'package-3',
    num: '03',
    name: 'SEYOL Package 3',
    badge: 'Most Popular',
    popular: true,
    infantSessions: '40 Sessions of Infant Massage & Bath',
    postpartumSessions: '20 Sessions of Postpartum Massage & Wrap',
    price: 64000,
    priceDisplay: '₹64,000 / Package',
    waLink: 'https://wa.link/zi9nsk',
    description: 'Sacred Mandalam care including pelvic realignment, belly wrap, and daily baby bath.',
  },
  {
    id: 'package-4',
    num: '04',
    name: 'SEYOL Package 4',
    badge: 'Complete Recovery',
    infantSessions: '60 Sessions of Infant Massage & Bath',
    postpartumSessions: '30 Sessions of Postpartum Massage & Wrap',
    price: 92000,
    priceDisplay: '₹92,000 / Package',
    waLink: 'https://wa.link/txyz6m',
    description: 'Full 60-day deep recuperation with herbal compression and sleep support.',
  },
  {
    id: 'package-5',
    num: '05',
    name: 'SEYOL Package 5',
    badge: 'Deep Sanctuary',
    infantSessions: '90 Sessions of Infant Massage & Bath',
    postpartumSessions: '40 Sessions of Postpartum Massage & Wrap',
    price: 125000,
    priceDisplay: '₹1,25,000 / Package',
    waLink: 'https://wa.link/stusd8',
    description: 'Extended three-month dual mother and baby nurturing by certified matrons.',
  },
  {
    id: 'package-6',
    num: '06',
    name: 'SEYOL Package 6',
    badge: 'Supreme Mandalam',
    infantSessions: '120 Sessions of Infant Massage & Bath',
    postpartumSessions: '50 Sessions of Postpartum Massage & Wrap',
    price: 160000,
    priceDisplay: '₹1,60,000 / Package',
    waLink: 'https://wa.link/e6l52p',
    description: 'Ultimate four-month restorative journey with lactation counseling and holistic nutrition.',
  },
];

// Initial enriched testimonials with authentic client video stories
export const initialEnrichedTestimonials: Testimonial[] = defaultTestimonialsData.map((t) => {
  const vidId = extractYouTubeId(t.youtubeUrl || '');
  return {
    ...t,
    youtubeUrl: t.youtubeUrl,
    thumbnailImage: t.thumbnailImage || (vidId ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg` : undefined),
    videoDuration: t.videoDuration || '6:30',
  };
});

export const defaultProductOrders: ProductOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SEY-84920',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    customerName: 'Ananya Sundaram',
    customerPhone: '+91 98401 23456',
    customerEmail: 'ananya.s@gmail.com',
    shippingAddress: {
      street: 'Flat 3B, Skyview Towers, Gandhi Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600020',
    },
    items: [
      {
        productId: 'soothing-baby-massage-oil',
        title: 'Traditional Baby Massage Oil',
        volumeOrType: '200 ml',
        price: 650,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
      },
      {
        productId: 'traditional-nalangu-maavu-baby-bath',
        title: 'Nalangu Maavu Herbal Baby Bath Powder',
        volumeOrType: '250 g',
        price: 520,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
      },
    ],
    subtotal: 1820,
    discount: 182,
    shippingFee: 0,
    totalAmount: 1638,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    notes: 'Please dispatch with organic cloth bag packaging. Newborn baby in home.',
  },
  {
    id: 'ord-1002',
    orderNumber: 'SEY-84921',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    customerName: 'Karthik & Deepa Rajan',
    customerPhone: '+91 94440 98765',
    customerEmail: 'deepa.rajan@outlook.com',
    shippingAddress: {
      street: '12/4, 4th Cross Street, Anna Nagar West',
      city: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625020',
    },
    items: [
      {
        productId: 'postpartum-healing-body-massage-oil',
        title: 'Postpartum Mother Restorative Oil',
        volumeOrType: '200 ml',
        price: 850,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
      },
      {
        productId: 'ayurvedic-colic-tummy-roll-on',
        title: 'Doctor Formulated Colic & Gas Roll-On',
        volumeOrType: '50 ml',
        price: 420,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600',
      },
    ],
    subtotal: 2120,
    discount: 212,
    shippingFee: 0,
    totalAmount: 1908,
    paymentMethod: 'cod',
    paymentStatus: 'cod',
    orderStatus: 'pending',
    notes: 'Cash on delivery requested.',
  },
  {
    id: 'ord-1003',
    orderNumber: 'SEY-84922',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    customerName: 'Meera Nambiar',
    customerPhone: '+65 9123 4567',
    customerEmail: 'meera.sg@gmail.com',
    shippingAddress: {
      street: 'Blk 248 Bishan Street 22, #12-304',
      city: 'Singapore',
      state: 'Singapore',
      pincode: '570248',
    },
    items: [
      {
        productId: 'complete-fourth-trimester-care-bundle',
        title: 'Sacred Confinement Mother & Baby Routine Set',
        volumeOrType: 'Complete Box (4 Formulations)',
        price: 2650,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512290900672-1f486d34cb01?auto=format&fit=crop&q=80&w=600',
      },
    ],
    subtotal: 2650,
    discount: 397,
    shippingFee: 0,
    totalAmount: 2253,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    notes: 'Dispatched via Express Courier. Tracking ID: SEY-SG-9481.',
  },
];

export interface AdminDataContextType {
  services: Service[];
  products: Product[];
  orders: ProductOrder[];
  homeSettings: HomeSettings;
  productsSettings: ProductsSettings;
  productBannerSlides: ProductBannerSlide[];
  bookingConfigs: Record<BookingServiceId, BookingServiceConfig>;
  testimonials: Testimonial[];
  combinedPackages: CombinedPackageItem[];
  // Stage Resource Guides (E-Books)
  stageResourceGuides: Record<JourneyStageKey, StageResourceGuide>;
  updateStageResourceGuide: (stage: JourneyStageKey, updates: Partial<StageResourceGuide>) => void;
  guideLeads: GuideLead[];
  addGuideLead: (lead: Omit<GuideLead, 'id' | 'downloadedAt'>) => GuideLead;
  deleteGuideLead: (id: string) => void;
  clearGuideLeads: () => void;
  // Home Settings
  updateHomeSettings: (updates: Partial<HomeSettings>) => void;
  // Products Settings
  updateProductsSettings: (updates: Partial<ProductsSettings>) => void;
  // Product Banner Slides CRUD
  addProductBannerSlide: (slide: ProductBannerSlide) => void;
  updateProductBannerSlide: (id: string, updates: Partial<ProductBannerSlide>) => void;
  deleteProductBannerSlide: (id: string) => void;
  // Orders CRUD
  addOrder: (order: ProductOrder) => void;
  updateOrderStatus: (
    orderId: string, 
    status: OrderStatus, 
    notes?: string,
    extraMeta?: {
      rejectReason?: string;
      courierPartner?: string;
      trackingNumber?: string;
    }
  ) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  deleteOrder: (orderId: string) => void;
  // Service CRUD & Settings
  servicesSettings: ServicesSettings;
  updateServicesSettings: (updates: Partial<ServicesSettings>) => void;
  resetServicesSettings: () => void;
  resetServicesToDefault: () => void;
  getService: (idOrSlug: string) => Service | undefined;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  updateServiceImages: (
    id: string,
    images: { heroImage?: string; benefitImages?: string[]; processImage?: string }
  ) => void;
  // Product CRUD
  getProduct: (idOrSlug: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Service Booking Package CRUD
  addPackage: (serviceId: BookingServiceId, pkg: BookingServicePackage) => void;
  updatePackage: (serviceId: BookingServiceId, packageId: string, updates: Partial<BookingServicePackage>) => void;
  deletePackage: (serviceId: BookingServiceId, packageId: string) => void;
  // Combined Packages CRUD
  addCombinedPackage: (pkg: CombinedPackageItem) => void;
  updateCombinedPackage: (id: string, updates: Partial<CombinedPackageItem>) => void;
  deleteCombinedPackage: (id: string) => void;
  // Testimonial CRUD
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  resetTestimonials: () => void;
  // Why Families Trust SEYOL Videos (Services page)
  whyTrustVideos: WhyTrustVideoStory[];
  addWhyTrustVideo: (story: WhyTrustVideoStory) => void;
  updateWhyTrustVideo: (id: string, updates: Partial<WhyTrustVideoStory>) => void;
  deleteWhyTrustVideo: (id: string) => void;
  resetWhyTrustVideos: () => void;
  // Reset
  resetAllToDefaults: () => void;
  isHydrated: boolean;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(defaultServicesData);
  const [servicesSettings, setServicesSettings] = useState<ServicesSettings>(defaultServicesSettings);
  const [products, setProducts] = useState<Product[]>(defaultProductsData);
  const [orders, setOrders] = useState<ProductOrder[]>(defaultProductOrders);
  const [homeSettings, setHomeSettings] = useState<HomeSettings>(defaultHomeSettings);
  const [productsSettings, setProductsSettings] = useState<ProductsSettings>(defaultProductsSettings);
  const [productBannerSlides, setProductBannerSlides] = useState<ProductBannerSlide[]>(defaultProductBannerSlides);
  const [bookingConfigs, setBookingConfigs] = useState<Record<BookingServiceId, BookingServiceConfig>>(defaultBookingServicesConfig);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialEnrichedTestimonials);
  const [combinedPackages, setCombinedPackages] = useState<CombinedPackageItem[]>(defaultCombinedPackages);
  const [stageResourceGuides, setStageResourceGuides] = useState<Record<JourneyStageKey, StageResourceGuide>>(defaultStageResourceGuides);
  const [guideLeads, setGuideLeads] = useState<GuideLead[]>(defaultGuideLeads);
  const [whyTrustVideos, setWhyTrustVideos] = useState<WhyTrustVideoStory[]>(defaultWhyTrustVideoStories);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const savedServicesSettings = localStorage.getItem(SERVICES_SETTINGS_STORAGE_KEY);
      if (savedServicesSettings) {
        try {
          const parsed = JSON.parse(savedServicesSettings);
          // If title was still the previous default "Tell Us What You Need Help With", update to "Popular Ways Families Begin"
          if (parsed && (parsed.sectionTitle === 'Tell Us What You Need Help With' || !parsed.sectionTitle)) {
            parsed.sectionTitle = 'Popular Ways Families Begin';
          }
          setServicesSettings({ ...defaultServicesSettings, ...parsed });
        } catch {
          setServicesSettings(defaultServicesSettings);
        }
      }

      const savedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (savedServices) {
        try {
          const parsed = JSON.parse(savedServices) as Service[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            const merged = defaultServicesData.map((def) => {
              const found = parsed.find((s) => s.id === def.id);
              if (!found) return def;
              return { ...def, ...found };
            });
            const customServices = parsed.filter((p) => !defaultServicesData.some((def) => def.id === p.id));
            setServices([...merged, ...customServices]);
          }
        } catch (e) {
          console.error('Error hydrating services', e);
        }
      }

      const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      const savedHomeSettings = localStorage.getItem(HOME_SETTINGS_STORAGE_KEY);
      if (savedHomeSettings) {
        try {
          const parsed = JSON.parse(savedHomeSettings);
          setHomeSettings({ ...defaultHomeSettings, ...parsed });
        } catch {
          setHomeSettings(defaultHomeSettings);
        }
      }

      const savedProductsSettings = localStorage.getItem(PRODUCTS_SETTINGS_STORAGE_KEY);
      if (savedProductsSettings) {
        setProductsSettings(JSON.parse(savedProductsSettings));
      }

      const savedConfigs = localStorage.getItem(BOOKING_CONFIGS_STORAGE_KEY);
      if (savedConfigs) {
        setBookingConfigs(JSON.parse(savedConfigs));
      }

      const savedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      if (savedTestimonials) {
        setTestimonials(JSON.parse(savedTestimonials));
      }

      const savedCombinedPackages = localStorage.getItem(COMBINED_PACKAGES_STORAGE_KEY);
      if (savedCombinedPackages) {
        setCombinedPackages(JSON.parse(savedCombinedPackages));
      }

      const savedBanners = localStorage.getItem(PRODUCT_BANNERS_STORAGE_KEY);
      if (savedBanners) {
        setProductBannerSlides(JSON.parse(savedBanners));
      }

      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      const savedStageResources = localStorage.getItem(STAGE_RESOURCES_STORAGE_KEY);
      if (savedStageResources) {
        setStageResourceGuides(JSON.parse(savedStageResources));
      }

      const savedGuideLeads = localStorage.getItem(GUIDE_LEADS_STORAGE_KEY);
      if (savedGuideLeads) {
        setGuideLeads(JSON.parse(savedGuideLeads));
      }

      const savedWhyTrustVideos = localStorage.getItem(WHY_TRUST_VIDEOS_STORAGE_KEY);
      if (savedWhyTrustVideos) {
        try {
          const parsed = JSON.parse(savedWhyTrustVideos);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWhyTrustVideos(parsed);
          }
        } catch {
          setWhyTrustVideos(defaultWhyTrustVideoStories);
        }
      }
    } catch (err) {
      console.warn('Could not load SEYOL admin storage data:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  const saveServicesSettings = (newSettings: ServicesSettings) => {
    setServicesSettings(newSettings);
    try {
      localStorage.setItem(SERVICES_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save services settings to localStorage', e);
    }
  };

  const updateServicesSettings = (updates: Partial<ServicesSettings>) => {
    const next = { ...servicesSettings, ...updates };
    saveServicesSettings(next);
  };

  const resetServicesSettings = () => {
    saveServicesSettings(defaultServicesSettings);
  };

  const resetServicesToDefault = () => {
    saveServices(defaultServicesData);
  };

  const saveServices = (newServices: Service[]) => {
    setServices(newServices);
    try {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(newServices));
    } catch (e) {
      console.error('Failed to save services to localStorage', e);
    }
  };

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  };

  const saveHomeSettings = (newSettings: HomeSettings) => {
    setHomeSettings(newSettings);
    try {
      localStorage.setItem(HOME_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save home settings to localStorage', e);
    }
  };

  const saveProductsSettings = (newSettings: ProductsSettings) => {
    setProductsSettings(newSettings);
    try {
      localStorage.setItem(PRODUCTS_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save products settings to localStorage', e);
    }
  };

  const updateHomeSettings = (updates: Partial<HomeSettings>) => {
    const updated = { ...homeSettings, ...updates };
    saveHomeSettings(updated);
  };

  const updateProductsSettings = (updates: Partial<ProductsSettings>) => {
    const updated = { ...productsSettings, ...updates };
    saveProductsSettings(updated);
  };

  const saveBookingConfigs = (newConfigs: Record<BookingServiceId, BookingServiceConfig>) => {
    setBookingConfigs(newConfigs);
    try {
      localStorage.setItem(BOOKING_CONFIGS_STORAGE_KEY, JSON.stringify(newConfigs));
    } catch (e) {
      console.error('Failed to save booking configs to localStorage', e);
    }
  };

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    try {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(newTestimonials));
    } catch (e) {
      console.error('Failed to save testimonials to localStorage', e);
    }
  };

  const saveCombinedPackages = (newPackages: CombinedPackageItem[]) => {
    setCombinedPackages(newPackages);
    try {
      localStorage.setItem(COMBINED_PACKAGES_STORAGE_KEY, JSON.stringify(newPackages));
    } catch (e) {
      console.error('Failed to save combined packages to localStorage', e);
    }
  };

  // Service CRUD
  const getService = (idOrSlug: string): Service | undefined => {
    const clean = idOrSlug.toLowerCase().trim();
    return (
      services.find(
        (s) =>
          s.id.toLowerCase() === clean ||
          s.slug.toLowerCase() === clean ||
          s.slug.includes(clean) ||
          clean.includes(s.slug)
      ) || services[0]
    );
  };

  const addService = (service: Service) => {
    const updated = [service, ...services];
    saveServices(updated);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
  };

  const updateServiceImages = (
    id: string,
    images: { heroImage?: string; benefitImages?: string[]; processImage?: string }
  ) => {
    const updated = services.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          heroImage: images.heroImage !== undefined ? images.heroImage : s.heroImage,
          benefitImages: images.benefitImages !== undefined ? images.benefitImages : s.benefitImages,
          processImage: images.processImage !== undefined ? images.processImage : s.processImage,
        };
      }
      return s;
    });
    saveServices(updated);
  };

  // Product CRUD
  const getProduct = (idOrSlug: string): Product | undefined => {
    const clean = idOrSlug.toLowerCase().trim();
    return (
      products.find(
        (p) =>
          p.id.toLowerCase() === clean ||
          p.slug.toLowerCase() === clean ||
          p.title.toLowerCase().replace(/\s+/g, '-').includes(clean)
      ) || products[0]
    );
  };

  const addProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    saveProducts(updated);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // Booking Service Package CRUD
  const addPackage = (serviceId: BookingServiceId, pkg: BookingServicePackage) => {
    const current = bookingConfigs[serviceId];
    if (!current) return;

    const newPackageOption = {
      id: pkg.id,
      name: pkg.name,
      badge: pkg.badge || `${pkg.sessions || 10} Sessions`,
      sessions: `${pkg.sessions || 10} Sessions`,
      details: pkg.description || pkg.details || '',
      priceNote: pkg.price ? `₹${pkg.price.toLocaleString()}` : (pkg.priceNote || 'Custom Quote'),
      isPopular: pkg.isPopular,
    };

    const currentPkgs = current.packages || {};
    const updatedConfig: BookingServiceConfig = {
      ...current,
      packages: {
        ...currentPkgs,
        standard: [...(currentPkgs.standard || []), newPackageOption],
      },
    };

    const updatedConfigs = {
      ...bookingConfigs,
      [serviceId]: updatedConfig,
    };
    saveBookingConfigs(updatedConfigs);
  };

  const updatePackage = (
    serviceId: BookingServiceId,
    packageId: string,
    updates: Partial<BookingServicePackage>
  ) => {
    const current = bookingConfigs[serviceId];
    if (!current) return;

    const currentPkgs = current.packages || {};

    const updateOptionList = (list?: any[]) => {
      if (!list) return [];
      return list.map((item) => {
        if (item.id === packageId) {
          return {
            ...item,
            name: updates.name !== undefined ? updates.name : item.name,
            sessions: updates.sessions !== undefined ? `${updates.sessions} Sessions` : item.sessions,
            details: updates.description !== undefined ? updates.description : item.details,
            priceNote: updates.price ? `₹${updates.price.toLocaleString()}` : (updates.priceNote || item.priceNote),
            isPopular: updates.isPopular !== undefined ? updates.isPopular : item.isPopular,
          };
        }
        return item;
      });
    };

    const updatedConfig: BookingServiceConfig = {
      ...current,
      packages: {
        flat: updateOptionList(currentPkgs.flat),
        standard: updateOptionList(currentPkgs.standard),
        premium: updateOptionList(currentPkgs.premium),
      },
    };

    const updatedConfigs = {
      ...bookingConfigs,
      [serviceId]: updatedConfig,
    };
    saveBookingConfigs(updatedConfigs);
  };

  const deletePackage = (serviceId: BookingServiceId, packageId: string) => {
    const current = bookingConfigs[serviceId];
    if (!current) return;

    const currentPkgs = current.packages || {};

    const filterOptionList = (list?: any[]) => {
      if (!list) return [];
      return list.filter((item) => item.id !== packageId);
    };

    const updatedConfig: BookingServiceConfig = {
      ...current,
      packages: {
        flat: filterOptionList(currentPkgs.flat),
        standard: filterOptionList(currentPkgs.standard),
        premium: filterOptionList(currentPkgs.premium),
      },
    };

    const updatedConfigs = {
      ...bookingConfigs,
      [serviceId]: updatedConfig,
    };
    saveBookingConfigs(updatedConfigs);
  };

  // Combined Packages CRUD
  const addCombinedPackage = (pkg: CombinedPackageItem) => {
    const updated = [...combinedPackages, pkg];
    saveCombinedPackages(updated);
  };

  const updateCombinedPackage = (id: string, updates: Partial<CombinedPackageItem>) => {
    const updated = combinedPackages.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveCombinedPackages(updated);
  };

  const deleteCombinedPackage = (id: string) => {
    const updated = combinedPackages.filter((p) => p.id !== id);
    saveCombinedPackages(updated);
  };

  // Testimonial CRUD
  const addTestimonial = (testimonial: Testimonial) => {
    const updated = [testimonial, ...testimonials];
    saveTestimonials(updated);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveTestimonials(updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    saveTestimonials(updated);
  };

  const resetTestimonials = () => {
    saveTestimonials(initialEnrichedTestimonials);
  };

  // Product Banner Slides CRUD
  const saveProductBannerSlides = (newSlides: ProductBannerSlide[]) => {
    setProductBannerSlides(newSlides);
    try {
      localStorage.setItem(PRODUCT_BANNERS_STORAGE_KEY, JSON.stringify(newSlides));
    } catch (e) {
      console.error('Failed to save product banners to localStorage', e);
    }
  };

  const addProductBannerSlide = (slide: ProductBannerSlide) => {
    const updated = [...productBannerSlides, slide];
    saveProductBannerSlides(updated);
  };

  const updateProductBannerSlide = (id: string, updates: Partial<ProductBannerSlide>) => {
    const updated = productBannerSlides.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveProductBannerSlides(updated);
  };

  const deleteProductBannerSlide = (id: string) => {
    const updated = productBannerSlides.filter((s) => s.id !== id);
    saveProductBannerSlides(updated);
  };

  // Orders CRUD with robust functional state updaters
  const saveOrders = (updater: ProductOrder[] | ((prev: ProductOrder[]) => ProductOrder[])) => {
    setOrders((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save orders to localStorage', e);
      }
      return next;
    });
  };

  const addOrder = (order: ProductOrder) => {
    saveOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    notes?: string,
    extraMeta?: {
      rejectReason?: string;
      courierPartner?: string;
      trackingNumber?: string;
      paymentStatus?: PaymentStatus;
    }
  ) => {
    saveOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id !== orderId) return o;
        const currentTimeline = o.timeline || [
          {
            status: o.orderStatus,
            timestamp: o.createdAt || new Date().toISOString(),
            note: 'Order placed by customer',
            actor: 'Customer'
          }
        ];
        const newEvent = {
          status,
          timestamp: new Date().toISOString(),
          note: notes || (extraMeta?.rejectReason ? `Reason: ${extraMeta.rejectReason}` : undefined),
          actor: 'Admin'
        };

        // Auto-mark COD orders as paid when delivered
        const nextPaymentStatus = extraMeta?.paymentStatus 
          ? extraMeta.paymentStatus 
          : (status === 'delivered' && o.paymentMethod === 'cod' ? 'paid' : o.paymentStatus);

        return {
          ...o,
          orderStatus: status,
          paymentStatus: nextPaymentStatus,
          ...(notes !== undefined ? { notes } : {}),
          ...(extraMeta?.rejectReason ? { rejectReason: extraMeta.rejectReason } : {}),
          ...(extraMeta?.courierPartner ? { courierPartner: extraMeta.courierPartner } : {}),
          ...(extraMeta?.trackingNumber ? { trackingNumber: extraMeta.trackingNumber } : {}),
          timeline: [...currentTimeline, newEvent]
        };
      })
    );
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    saveOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    saveOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
  };

  // Stage Resource Guides (E-Books) CRUD
  const saveStageResourceGuides = (newGuides: Record<JourneyStageKey, StageResourceGuide>) => {
    setStageResourceGuides(newGuides);
    try {
      localStorage.setItem(STAGE_RESOURCES_STORAGE_KEY, JSON.stringify(newGuides));
    } catch (e) {
      console.error('Failed to save stage resource guides to localStorage', e);
    }
  };

  const updateStageResourceGuide = (stage: JourneyStageKey, updates: Partial<StageResourceGuide>) => {
    const existing = stageResourceGuides[stage] || defaultStageResourceGuides[stage];
    const updated = {
      ...stageResourceGuides,
      [stage]: {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    };
    saveStageResourceGuides(updated);
  };

  // Guide Leads CRUD
  const saveGuideLeads = (newLeads: GuideLead[]) => {
    setGuideLeads(newLeads);
    try {
      localStorage.setItem(GUIDE_LEADS_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Failed to save guide leads to localStorage', e);
    }
  };

  const addGuideLead = (lead: Omit<GuideLead, 'id' | 'downloadedAt'>): GuideLead => {
    const newLead: GuideLead = {
      ...lead,
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      downloadedAt: new Date().toISOString(),
    };
    const updated = [newLead, ...guideLeads];
    saveGuideLeads(updated);
    return newLead;
  };

  const deleteGuideLead = (id: string) => {
    const updated = guideLeads.filter((l) => l.id !== id);
    saveGuideLeads(updated);
  };

  const clearGuideLeads = () => {
    saveGuideLeads([]);
  };

  // Why Families Trust SEYOL Videos (Services page)
  const saveWhyTrustVideos = (newVideos: WhyTrustVideoStory[]) => {
    setWhyTrustVideos(newVideos);
    try {
      localStorage.setItem(WHY_TRUST_VIDEOS_STORAGE_KEY, JSON.stringify(newVideos));
    } catch (e) {
      console.error('Failed to save Why Trust videos to localStorage', e);
    }
  };

  const addWhyTrustVideo = (story: WhyTrustVideoStory) => {
    const updated = [...whyTrustVideos, story];
    saveWhyTrustVideos(updated);
  };

  const updateWhyTrustVideo = (id: string, updates: Partial<WhyTrustVideoStory>) => {
    const updated = whyTrustVideos.map((v) => (v.id === id ? { ...v, ...updates } : v));
    saveWhyTrustVideos(updated);
  };

  const deleteWhyTrustVideo = (id: string) => {
    const updated = whyTrustVideos.filter((v) => v.id !== id);
    saveWhyTrustVideos(updated);
  };

  const resetWhyTrustVideos = () => {
    saveWhyTrustVideos(defaultWhyTrustVideoStories);
  };
  // Reset
  const resetAllToDefaults = () => {
    try {
      localStorage.removeItem(SERVICES_STORAGE_KEY);
      localStorage.removeItem(SERVICES_SETTINGS_STORAGE_KEY);
      localStorage.removeItem(PRODUCTS_STORAGE_KEY);
      localStorage.removeItem(HOME_SETTINGS_STORAGE_KEY);
      localStorage.removeItem(PRODUCTS_SETTINGS_STORAGE_KEY);
      localStorage.removeItem(PRODUCT_BANNERS_STORAGE_KEY);
      localStorage.removeItem(BOOKING_CONFIGS_STORAGE_KEY);
      localStorage.removeItem(TESTIMONIALS_STORAGE_KEY);
      localStorage.removeItem(COMBINED_PACKAGES_STORAGE_KEY);
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      localStorage.removeItem(STAGE_RESOURCES_STORAGE_KEY);
      localStorage.removeItem(GUIDE_LEADS_STORAGE_KEY);
      localStorage.removeItem(WHY_TRUST_VIDEOS_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing admin localStorage', e);
    }
    setServices(defaultServicesData);
    setProducts(defaultProductsData);
    setOrders(defaultProductOrders);
    setHomeSettings(defaultHomeSettings);
    setProductsSettings(defaultProductsSettings);
    setProductBannerSlides(defaultProductBannerSlides);
    setBookingConfigs(defaultBookingServicesConfig);
    setTestimonials(initialEnrichedTestimonials);
    setCombinedPackages(defaultCombinedPackages);
    setStageResourceGuides(defaultStageResourceGuides);
    setGuideLeads(defaultGuideLeads);
    setWhyTrustVideos(defaultWhyTrustVideoStories);
  };

  return (
    <AdminDataContext.Provider
      value={{
        services,
        servicesSettings,
        updateServicesSettings,
        resetServicesSettings,
        resetServicesToDefault,
        products,
        orders,
        homeSettings,
        productsSettings,
        productBannerSlides,
        bookingConfigs,
        testimonials,
        combinedPackages,
        stageResourceGuides,
        updateStageResourceGuide,
        guideLeads,
        addGuideLead,
        deleteGuideLead,
        clearGuideLeads,
        updateHomeSettings,
        updateProductsSettings,
        addProductBannerSlide,
        updateProductBannerSlide,
        deleteProductBannerSlide,
        addOrder,
        updateOrderStatus,
        updatePaymentStatus,
        deleteOrder,
        getService,
        addService,
        updateService,
        deleteService,
        updateServiceImages,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        addPackage,
        updatePackage,
        deletePackage,
        addCombinedPackage,
        updateCombinedPackage,
        deleteCombinedPackage,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        resetTestimonials,
        whyTrustVideos,
        addWhyTrustVideo,
        updateWhyTrustVideo,
        deleteWhyTrustVideo,
        resetWhyTrustVideos,
        resetAllToDefaults,
        isHydrated,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
