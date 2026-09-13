export type JourneyStage = 'all' | 'preconception' | 'pregnancy' | 'birth' | 'postpartum' | 'newborn';

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  stages: JourneyStage[];
  category: 'clinical-tradition' | 'hands-on-care' | 'specialist-support' | 'nanny-confinement';
  summary: string;
  benefit: string;
  bestFor: string;
  recommendedTimeline: string;
  duration: string;
  format: 'In-Home (Chennai / Tamil Nadu)' | 'Virtual & Hybrid' | 'In-Clinic / In-Home' | string;
  pricingGuide: string;
  depositInfo: string;
  heroImage: string;
  benefitImages?: string[];
  processImage?: string;
  features: string[];
  inclusions: string[];
  preparation: string[];
  contraindications: string[];
  faqIds: string[];
  testimonials: string[];
  relatedClassIds?: string[];
  relatedProductIds?: string[];
}

export interface ClassWorkshop {
  id: string;
  slug: string;
  title: string;
  stages: JourneyStage[];
  category: 'practical-skills' | 'birth-prep' | 'feeding-nourishment' | 'family-support';
  tagline: string;
  summary: string;
  whatYouLearn: string[];
  format: string;
  duration: string;
  pricing: number;
  currency: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    credentials: string;
  };
  scheduleUpcoming: {
    date: string; // YYYY-MM-DD
    time: string;
    seatsLeft: number;
    totalSeats: number;
    format: string;
  }[];
  materialsIncluded: string[];
  whoShouldAttend: string;
  videoPreviewUrl?: string;
  relatedServiceIds?: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'baby-massage' | 'mother-postpartum' | 'bath-wellness' | 'digestive-relief' | 'curated-bundle';
  stages: JourneyStage[];
  volume: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isHerbalHeritage?: boolean;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  heroIngredients: {
    name: string;
    traditionalRole: string;
    botanicalName?: string;
  }[];
  usageRitual: string[];
  safetyCertifications: string[];
  image: string;
  tags: string[];
  badge?: string;
}

export interface BundleInclusionItem {
  title: string;
  type?: 'guide' | 'checklist' | 'chart' | 'template' | 'ebook' | 'tracker' | 'poster' | 'routine';
  pages?: string;
  description?: string;
}

export interface ResourceBundle {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stage: JourneyStage;
  price: number; // 0 for free
  originalPrice?: number;
  currency: string;
  isFree?: boolean;
  isCompleteBundle?: boolean;
  coverImage: string;
  badge?: string;
  inclusions: BundleInclusionItem[];
  highlights: string[];
  totalGuides: number;
  format: string;
  downloadSize?: string;
  isFeatured?: boolean;
}

export type ResourceIntendedUser =
  | 'expecting-mother'
  | 'postpartum-mother'
  | 'partner'
  | 'grandparent'
  | 'caregiver'
  | 'family-member'
  | 'gift'
  | 'other';

export interface ResourceAccessFormState {
  // Step 1: Contact Details
  fullName: string;
  email: string;
  phone: string;
  accountOption: 'portal' | 'guest';

  // Step 2: Access Details
  accessMethod: 'instant-download' | 'whatsapp' | 'email' | 'care-portal' | 'all';
  intendedUser: ResourceIntendedUser;
  intendedUserCustom?: string;
  // If gift selected
  isGift: boolean;
  recipientName: string;
  recipientContact: string; // Email or WhatsApp
  giftMessage?: string;

  // Step 3: Consent & Agreements
  disclaimerAgreed: boolean;
  digitalTermsAgreed: boolean;
  privacyAgreed: boolean;
  marketingOptIn: boolean;

  // Step 4: Checkout
  selectedBundleId: string;
  couponCode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'whatsapp' | 'free';
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  type: 'free-guide' | 'digital-workbook' | 'printable-checklist' | 'gated-video-masterclass';
  stage: JourneyStage;
  topic: string;
  description: string;
  pagesOrDuration: string;
  price: number; // 0 for free
  currency: string;
  downloadUrl?: string;
  gatedPlaylistId?: string;
  coverImage: string;
  previewPoints: string[];
  isFeatured?: boolean;
}

export interface GatedVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  instructor: string;
  thumbnail: string;
  youtubeId: string;
  description: string;
  keyTakeaways: string[];
}

export type SeyolCareerPathwayId =
  | 'pathway-1-foundation'
  | 'pathway-2-practical'
  | 'pathway-3-experienced'
  | 'pathway-4-professional';

export interface CaregiverPathwayItem {
  id: SeyolCareerPathwayId;
  title: string;
  subtitle: string;
  tagline: string;
  targetAudience: string;
  badge: string;
  hasCertification: boolean;
  hasExperience: boolean;
  courseId?: 'course-foundation' | 'course-practical';
  icon: string;
  summary: string;
  keyBenefits: string[];
}

export interface CaregiverInTrainingCourse {
  id: 'course-foundation' | 'course-practical';
  pathwayId: SeyolCareerPathwayId;
  title: string;
  subtitle: string;
  duration: string;
  mode: string;
  qualification: string;
  summary: string;
  prerequisites: string;
  curriculum: {
    title: string;
    topics: string[];
  }[];
  outcomes: string[];
}

export interface CaregiverApplicationState {
  // Chosen Pathway
  chosenPathwayId: SeyolCareerPathwayId;

  // Step 1: About You
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  age: number | null;
  whatsappNumber: string;
  emailAddress: string;
  countryOfResidence: 'Singapore' | 'Malaysia' | 'India' | 'Other' | string;
  residencyStatus: string;

  // Step 2: Find Your SEYOL Pathway
  hasConfinementCertification: boolean | null;
  hasConfinementExperience: boolean | null;

  // Step 3: Experience & Background (Dynamic per pathway)
  // Pathway 1:
  p1LearningInterests: string[];

  // Pathway 2:
  p2CompletedCourse: string;
  p2CertificateFile: string | null;
  p2NeedPracticeAreas: string[];

  // Pathway 3:
  p3YearsExperience: string;
  p3WorkedCountries: string[];
  p3FamiliesSupported: string;
  p3CareTypesProvided: string[];
  p3OtherCareType?: string;

  // Pathway 4:
  p4YearsExperience: string;
  p4WorkedCountries: string[];
  p4CompletedCourse: string;
  p4CertificateFile: string | null;

  // Step 4: Work Interest
  preferredWorkCountry: 'Singapore' | 'Malaysia' | 'Both Singapore and Malaysia' | 'Open to discuss' | string;
  workTypeInterest: 'Stay-in confinement nanny' | 'Daytime confinement caregiver' | 'Both / Flexible' | string;
  availabilityStart: 'Immediately' | 'Within 1 month' | 'Within 3 months' | 'Other' | string;

  // Step 5: Motivation & Interview
  motivationStatement: string;
  willingToAttendInterview: boolean | null;
  preferredInterviewTiming: 'Weekday morning' | 'Weekday afternoon' | 'Weekday evening' | 'Weekend' | 'Flexible' | string;

  // Step 6: Consent
  applicationAcknowledgement: boolean;
  trainingReviewAcknowledgement: boolean;
  privacyConsent: boolean;
}

export interface CareerPathway {
  id: string;
  title: string;
  qualification: string;
  commitment: string;
  mode: string;
  summary: string;
  whoItIsFor: string;
  modules: {
    title: string;
    topics: string[];
  }[];
  careerOpportunities: string[];
  certificationBadge: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  stage: JourneyStage;
  serviceOrProduct: string;
  quote: string;
  detailedStory: string;
  rating: number;
  verifiedParent: boolean;
  babyAgeOrWeek?: string;
  youtubeUrl?: string;
  thumbnailImage?: string;
  videoDuration?: string;
}

export interface FAQItem {
  id: string;
  category: 'services' | 'products' | 'classes' | 'traditions' | 'booking-policies';
  question: string;
  answer: string;
}

export interface LegalPolicy {
  slug: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: {
    id: string;
    heading: string;
    content: string;
  }[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  volumeOrType: string;
  image: string;
  quantity: number;
  isDigital?: boolean;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'cod';

export interface OrderItem {
  productId: string;
  title: string;
  volumeOrType: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'whatsapp';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
}

// ==========================================
// MY SEYOL CARE PORTAL TYPES (10 MODULES)
// ==========================================

export type PortalMessageType =
  | 'booking_confirmed'
  | 'appointment_changed'
  | 'payment_reminder'
  | 'receipt_sent'
  | 'item_list_sent'
  | 'scn_checkin_reminder'
  | 'class_access_link'
  | 'resource_access_granted';

export interface PortalMessage {
  id: string;
  type: PortalMessageType;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionUrl?: string;
  categoryTag: string;
}

export type CalendarEventType =
  | 'confirmed_appointment'
  | 'pending_request'
  | 'class_date'
  | 'package_session'
  | 'payment_due'
  | 'scn_duration'
  | 'time_to_avoid';

export interface CareCalendarEvent {
  id: string;
  type: CalendarEventType;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  duration?: string;
  status?: 'confirmed' | 'pending' | 'due' | 'rest_window';
  location?: string;
  matronName?: string;
  notes?: string;
}

export interface CareAppointment {
  id: string;
  serviceTitle: string;
  packageTitle: string;
  sessionNumber: number;
  totalSessions: number;
  date: string;
  time: string;
  format: 'In-Home' | 'Virtual' | 'In-Clinic';
  assignedMatron: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
  };
  status: 'confirmed' | 'completed' | 'rescheduled' | 'in-progress';
  prepSummary: string;
}

export interface CareInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  packageTitle: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: 'paid' | 'pending_milestone' | 'overdue';
  receiptUrl?: string;
  receiptNumber?: string;
  paymentMethodUsed?: string;
}

export interface PreparationItem {
  id: string;
  category: 'mother_comfort' | 'newborn_essentials' | 'confinement_room' | 'traditional_herbs';
  title: string;
  description: string;
  isCompleted: boolean;
  essentialLevel: 'mandatory' | 'recommended' | 'optional';
}

export interface SCNWeeklyCheckIn {
  id: string;
  weekNumber: number;
  dateSubmitted: string;
  babyFeedingFrequency: string; // e.g. 8-10 feeds/day
  babySleepAverage: string; // e.g. 14-16 hours
  babyWeightMilestone?: string;
  diaperCountDaily: string;
  cordHealingStatus: 'healing_well' | 'separated_clean' | 'mild_redness' | 'requires_matron_check';
  motherRecoveryScore: number; // 1-10
  motherEnergyLevel: 'low' | 'moderate' | 'energetic';
  lochiaBleedingStatus: 'minimal' | 'moderate' | 'heavy' | 'ceased';
  abdominalPainScore: number; // 1-10
  nannyCareRating: number; // 1-5
  mealsFeedback: string;
  nannyPunctuality: 'excellent' | 'good' | 'needs_attention';
  dietaryAdjustments: string;
  specialRequestsOrNotes: string;
  matronReviewed: boolean;
  matronReviewNote?: string;
}

export interface PortalDocument {
  id: string;
  title: string;
  category: 'medical_disclaimer' | 'confinement_agreement' | 'nanny_safety_protocol' | 'digital_license';
  signedDate: string;
  status: 'active' | 'signed' | 'acknowledged';
  downloadUrl: string;
}

export interface ClientPortalProfile {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  stage: JourneyStage;
  babyNameOrEdd: string;
  location: string;
  avatar: string;
  activePackage: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    status: 'in-progress' | 'confirmed' | 'completed';
    totalSessions: number;
    completedSessions: number;
    nextSessionDate: string;
    assignedMatron: {
      name: string;
      role: string;
      avatar: string;
      phone: string;
    };
  };
  upcomingAppointment: CareAppointment;
  latestSessionUpdate: {
    date: string;
    matronName: string;
    sessionNumber: number;
    notes: string;
    recoveryProgress: string;
    recommendation: string;
  };
  nextStepFromSeyol: {
    currentMilestone: string;
    nextMilestoneTitle: string;
    targetTimeline: string;
    description: string;
  };
  invoices: CareInvoice[];
  calendarEvents: CareCalendarEvent[];
  preparationItems: PreparationItem[];
  scnCheckIns: SCNWeeklyCheckIn[];
  messages: PortalMessage[];
  documents: PortalDocument[];
}

