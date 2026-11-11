export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Resolved';

export type JourneyStage =
  | 'Planning for pregnancy'
  | 'Currently pregnant'
  | 'Preparing for birth'
  | 'Baby already born'
  | 'Supporting a parent or family';

export type HelpCategoryName =
  | 'Services'
  | 'Classes'
  | 'SEY By SEYOL Products'
  | 'Careers & Training'
  | 'Resources'
  | 'Other Enquiries';

export interface HelpOptionItem {
  id: string;
  name: string;
  category: HelpCategoryName;
}

export interface HelpCategoryGroup {
  category: HelpCategoryName;
  description?: string;
  options: string[];
}

export interface SeyolCareEnquiry {
  id: string;
  fullName: string;
  email: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  whatsappFull: string;
  country: string;
  selectedHelpOptions: {
    category: HelpCategoryName | string;
    option: string;
  }[];
  journeyStage: JourneyStage | string;
  message?: string;
  createdAt: string;
  status: EnquiryStatus;
  adminNotes?: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  'Planning for pregnancy',
  'Currently pregnant',
  'Preparing for birth',
  'Baby already born',
  'Supporting a parent or family',
];

export const HELP_CATEGORIES: HelpCategoryGroup[] = [
  {
    category: 'Services',
    description: 'In-home traditional care, doulas & postpartum support',
    options: [
      'Preconception Support',
      'Prenatal Massage',
      'Birth Doula Support',
      'Postpartum Massage & Wrap',
      'Signature Infant Massage & Bath',
      'Mother & Baby Combo Packages',
      'Stay-In Confinement Nanny Support',
      'Hourly Newborn Support',
      'Lactation & Feeding Support',
    ],
  },
  {
    category: 'Classes',
    description: 'Practical live & in-person baby care education',
    options: [
      'Traditional Baby Massage & Bath Class',
      'Newborn Care Class for New Parents',
      'Postpartum & Confinement Preparation Class',
      'Birth Preparation Class',
      'Breastfeeding & Bottle Feeding Class',
      'Prenatal Movement & Comfort Class',
      'Pregnancy & Postpartum Nutrition Class',
      'Family & Helper Newborn Care Class',
      'Birth, Newborn Care & Postpartum Preparation Package',
      'Premium Birth, Newborn Care & Postpartum Nutrition Package',
      'Newborn Care, Massage, Bath & Feeding Class Package',
    ],
  },
  {
    category: 'SEY By SEYOL Products',
    description: 'Sacred botanical oils, herbal broths & infant care sets',
    options: [
      'Soothing Baby Massage Oil',
      'Nourishing Baby Massage Oil',
      'Tummy Comfort Roll-On',
      'Traditional Prasava Legiyam',
      'Ayurvedic Baby Kajal',
      'Rejuvenating Herbal Bath Sachet',
      'Restorative Mother Massage Oil',
      'Traditional Sambirani Care Set',
      'Baby Massage & Tummy Care Essentials Bundle',
      'Mother’s Postpartum Comfort Bundle',
      'Mother & Baby Complete Care Bundle',
    ],
  },
  {
    category: 'Careers & Training',
    description: 'Accredited maternity doula & confinement matron pathways',
    options: [
      'Foundation Care Training Pathway',
      'Practical Care Training Pathway',
      'Experienced Care Provider Pathway',
      'Professional Care Provider Pathway',
    ],
  },
  {
    category: 'Resources',
    description: 'Curated digital guides, checklists & feeding trackers',
    options: [
      'Free New Parent Starter Pack',
      'Newborn Care Starter Bundle',
      'Baby Massage & Bath Bundle',
      'Breastfeeding & Bottle Feeding Bundle',
      'Birth Preparation Toolkit',
      'Pregnancy Comfort & Movement Bundle',
      'Postpartum Recovery & Confinement Bundle',
      'SEYOL Complete Pregnancy to Newborn Resource Bundle',
    ],
  },
  {
    category: 'Other Enquiries',
    description: 'Custom collaborations, partnerships & general questions',
    options: [
      'Partnerships & Business Enquiries',
      'Something Else',
      'I’m Not Sure Yet',
    ],
  },
];

export interface CountryCodeItem {
  name: string;
  code: string; // e.g. "+91"
  flag?: string;
}

export const COUNTRY_OPTIONS: CountryCodeItem[] = [
  { name: 'India', code: '+91' },
  { name: 'Singapore', code: '+65' },
  { name: 'Malaysia', code: '+60' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Germany', code: '+49' },
  { name: 'Qatar', code: '+974' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Oman', code: '+968' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Switzerland', code: '+41' },
  { name: 'France', code: '+33' },
  { name: 'Netherlands', code: '+31' },
  { name: 'Ireland', code: '+353' },
  { name: 'South Africa', code: '+27' },
  { name: 'Hong Kong', code: '+852' },
  { name: 'Japan', code: '+81' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Thailand', code: '+66' },
  { name: 'Other Country', code: '+1' },
];

