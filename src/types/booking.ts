export type BookingServiceId =
  | 'preconception-support'
  | 'prenatal-massage'
  | 'birth-doula-support'
  | 'postpartum-massage-wrap'
  | 'infant-massage-bath'
  | 'mother-baby-combo'
  | 'confinement-nanny'
  | 'hourly-newborn-support'
  | 'lactation-support'
  | 'general-consultation';

export type ConsultationMode = 'virtual' | 'in-person' | 'flexible';
export type PreferredTime = 'morning' | 'afternoon' | 'evening' | 'night' | 'flexible';
export type BabyCount = 'one-baby' | 'twins' | 'triplets-or-more';
export type BabyOrder = 'first-baby' | 'second-baby' | 'third-baby' | 'fourth-or-more';
export type BookingRecipient = 'Myself' | 'My partner' | 'My daughter' | 'Family member' | 'Friend' | 'Other';

export interface ServicePackageOption {
  id: string;
  name: string;
  badge?: string;
  sessions?: string;
  details?: string;
  priceNote?: string;
  isPopular?: boolean;
}

export interface BookingServicePackage {
  id: string;
  name: string;
  badge?: string;
  sessions?: number | string;
  durationMinutes?: number;
  price?: number;
  description?: string;
  details?: string;
  priceNote?: string;
  includes?: string[];
  isPopular?: boolean;
}

export interface BookingFormData {
  // Common Step 1: About You
  fullName: string;
  whatsapp: string;
  email: string;
  country: 'Singapore' | 'Other Countries' | string;
  postalCode?: string;
  address?: string;

  // Step 2 / 3: Recipient & Permissions
  bookingFor: BookingRecipient;
  hasPermissionToShare: boolean;

  // Preconception
  preconceptionStage?: string;
  preconceptionHelpWith?: string[];
  preconceptionMainQuestion?: string;

  // Prenatal Massage
  prenatalEdd?: string;
  prenatalBabyCount?: BabyCount;
  prenatalSupportWith?: string[];
  prenatalPackage?: string;
  prenatalPreferredDate?: string;
  prenatalPreferredTime?: PreferredTime;

  // Birth Doula Support
  doulaStage?: string;
  doulaEdd?: string;
  doulaHospital?: string;
  doulaHospitalOther?: string;
  doulaBabyOrder?: BabyOrder;
  doulaPreviousBirth?: string;
  doulaBabyCount?: BabyCount;
  doulaPreparationTopics?: string[];
  doulaPackage?: string;
  doulaPreferredMode?: 'virtual' | 'in-person';

  // Postpartum Massage & Wrap
  postpartumStage?: 'pregnant' | 'delivered';
  postpartumEdd?: string;
  postpartumExpectedDelivery?: string;
  postpartumBabyOrder?: BabyOrder;
  postpartumBabyCount?: BabyCount;
  postpartumStartTiming?: string;
  postpartumBabyDob?: string;
  postpartumActualDelivery?: string;
  postpartumDischargedStatus?: string;
  postpartumDischargeDate?: string;
  postpartumPreferredStartDate?: string;
  postpartumTier?: 'standard' | 'premium';
  postpartumPackage?: string;
  postpartumCustomSessions?: string;
  postpartumPreferredTime?: PreferredTime;

  // Signature Infant Massage & Bath
  infantStage?: 'pregnant' | 'delivered';
  infantEdd?: string;
  infantBabyOrder?: BabyOrder;
  infantBabyCount?: BabyCount;
  infantStartTiming?: string;
  infantBabyDob?: string;
  infantDischargedStatus?: string;
  infantDischargeDate?: string;
  infantPreferredStartDate?: string;
  infantPackage?: string;
  infantCustomSessions?: string;
  infantPreferredTime?: PreferredTime;

  // Mother & Baby Combo Packages
  comboStage?: 'pregnant' | 'delivered';
  comboEdd?: string;
  comboExpectedDelivery?: string;
  comboBabyOrder?: BabyOrder;
  comboBabyCount?: BabyCount;
  comboBabyDob?: string;
  comboActualDelivery?: string;
  comboDischargedStatus?: string;
  comboDischargeDate?: string;
  comboPreferredStartDate?: string;
  comboTier?: 'standard' | 'premium';
  comboPackage?: string;
  comboCustomSessions?: string;
  comboPreferredTime?: PreferredTime;
  comboArrangement?: string;

  // Stay-In Confinement Nanny Support
  nannyStage?: 'pregnant' | 'delivered-urgent';
  nannyEdd?: string;
  nannyBabyOrder?: BabyOrder;
  nannyOtherChildrenAges?: string;
  nannyBabyCount?: BabyCount;
  nannyPreferredStartDate?: string;
  nannySpecificStartDate?: string;
  nannyBabyDob?: string;
  nannyAdultsCount?: number | string;
  nannyHasHelper?: string;
  nannyChildrenAtHome?: string;
  nannyMealPreference?: string;
  nannyAccommodation?: string;
  nannyHasStairs?: 'Yes' | 'No' | '';
  nannyHasPets?: 'Yes' | 'No' | '';
  nannyPetTypes?: string[];
  nannyLanguagePreference?: string;
  nannyPackage?: string;
  nannyDuration?: '28 days' | '56 days' | 'More than 56 days' | string;

  // Hourly Newborn Support
  hourlyStage?: 'pregnant' | 'delivered';
  hourlyEdd?: string;
  hourlyExpectedDelivery?: string;
  hourlyBabyOrder?: BabyOrder;
  hourlyBabyCount?: BabyCount;
  hourlyStartTiming?: string;
  hourlyBabyDob?: string;
  hourlyDischargedStatus?: string;
  hourlyDischargeDate?: string;
  hourlyBabyConcerns?: string[];
  hourlyWhenNeed?: 'Specific date' | 'Urgent' | 'As soon as possible' | 'Regular weekly support' | string;
  hourlySpecificDate?: string;
  hourlyPreferredTime?: PreferredTime;
  hourlyHoursCount?: '2 hours' | '3 hours' | '4 hours' | '5 hours or more' | string;
  hourlyHelpWith?: string[];

  // Lactation & Feeding Support
  lactationStage?: string;
  lactationBabyDob?: string;
  lactationBabyOrder?: BabyOrder;
  lactationBabyCount?: BabyCount;
  lactationDischargedStatus?: string;
  lactationDischargeDate?: string;
  lactationFeedingMethod?: string;
  lactationHelpWith?: string[];
  lactationMainQuestion?: string;
  lactationPreferredMode?: ConsultationMode;
  lactationPreferredTime?: PreferredTime;

  // General Consultation
  generalStage?: string;
  generalGuidanceOn?: string[];
  generalMainQuestion?: string;
  generalPreferredMode?: ConsultationMode;
  generalPreferredTime?: PreferredTime;

  // Common Preferences
  preferredConsultationMode?: ConsultationMode;
  preferredTime?: PreferredTime;

  // Step 4: My SEYOL Care Journey
  createPortalAccount: boolean;
  portalPassword?: string;

  // Step 5: Consent
  acceptedServiceDisclaimer: boolean;
  acceptedPrivacyAndBooking: boolean;
  optInMarketing: boolean;
}

export interface BookingServiceConfig {
  id: BookingServiceId;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  isSingaporeOnly?: boolean;
  supportsInPerson?: boolean;
  stepCount: number;
  stepTitles: string[];
  disclaimer: {
    title: string;
    body: string[];
  };
  packages?: {
    standard?: ServicePackageOption[];
    premium?: ServicePackageOption[];
    flat?: ServicePackageOption[];
  };
}
