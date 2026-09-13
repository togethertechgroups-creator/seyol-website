import { BookingServiceConfig, BookingServiceId } from '../types/booking';

export const bookingServicesConfig: Record<BookingServiceId, BookingServiceConfig> = {
  'preconception-support': {
    id: 'preconception-support',
    slug: 'preconception-support',
    title: 'Preconception Support',
    subtitle: 'Nurturing bodily harmony, uterine nourishment, and emotional readiness for conception.',
    badge: 'Holistic Fertility Prep',
    isSingaporeOnly: false,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'Appointment Preference',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Preconception Support Disclaimer',
      body: [
        'SEYOL Preconception Support is a holistic educational, nutritional, and traditional wellness advisory service grounded in time-honoured Ayurvedic and Siddha traditions.',
        'Our consultations and protocols do not substitute for formal medical, obstetric, or reproductive endocrinology diagnoses, treatments, or clinical medications.',
        'If you have underlying reproductive health conditions or are currently undergoing medical fertility procedures (IUI, IVF), please continue to consult your primary reproductive physician.',
        'All information shared during your consultation is strictly confidential and protected under our healthcare privacy guidelines.'
      ]
    }
  },

  'prenatal-massage': {
    id: 'prenatal-massage',
    slug: 'prenatal-massage-therapy',
    title: 'Prenatal Massage',
    subtitle: 'Exceptional maternal bodywork for muscular tension relief, circulation, and tranquil relaxation.',
    badge: 'Maternal Wellness',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 7,
    stepTitles: [
      'About You',
      'Pregnancy Details',
      'What Brings You Here?',
      'Appointment Preference',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Prenatal Massage Disclaimer',
      body: [
        'Prenatal massage is safe and therapeutic when performed by certified maternity therapists from the second trimester (16 weeks onward).',
        'If you are experiencing complications such as unexplained vaginal bleeding, uncontrolled high blood pressure, preeclampsia, or severe gestational diabetes, you must obtain written medical clearance from your obstetrician prior to receiving massage therapy.',
        'Our therapists utilize safe ergonomic side-lying positioning and authentic maternal-safe organic botanical oils.'
      ]
    },
    packages: {
      flat: [
        {
          id: 'single-session',
          name: 'Single Session Prenatal Massage Package',
          sessions: '1 Session (75 Mins)',
          details: 'Full-body restorative prenatal oil massage with ergonomic bolstering and hip tension release.',
          priceNote: 'SGD $160'
        },
        {
          id: '5-session',
          name: '5-Session Prenatal Massage Package',
          badge: 'Most Popular',
          sessions: '5 Sessions (75 Mins each)',
          details: 'Continuous bi-weekly support across the 2nd & 3rd trimesters for consistent muscular comfort and deep sleep.',
          priceNote: 'SGD $750 (Save $50)',
          isPopular: true
        },
        {
          id: '10-session',
          name: '10-Session Prenatal Massage Package',
          badge: 'Best Value',
          sessions: '10 Sessions (75 Mins each)',
          details: 'Complete end-to-end pregnancy relaxation program leading right up to your birth month.',
          priceNote: 'SGD $1,400 (Save $200)'
        }
      ]
    }
  },

  'birth-doula-support': {
    id: 'birth-doula-support',
    slug: 'birth-doula-support',
    title: 'Birth Doula Support',
    subtitle: 'Continuous emotional, physical, and informational guidance for an empowered labour and delivery.',
    badge: 'Continuous Labour Support',
    isSingaporeOnly: false,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'Your Birth Support Needs',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Birth Doula Support Disclaimer',
      body: [
        'A Birth Doula provides continuous physical, emotional, and informational comfort and advocacy. Doulas do not perform clinical tasks (e.g. vaginal exams, fetal heart monitoring, medical diagnoses, or delivering babies).',
        'Your doula works alongside your medical team (obstetrician and hospital midwives) to enhance your birth experience and partner confidence.',
        'In the event of an emergency surgical delivery, doula hospital room access remains subject to hospital operating theatre regulations.'
      ]
    },
    packages: {
      flat: [
        {
          id: 'early-labour-postpartum',
          name: 'Pregnancy, Early Labour & Postpartum Support',
          sessions: '2 Prenatal + Early Labour On-Call + 1 Postpartum Visit',
          details: 'Comprehensive prenatal education, phone on-call support during early labour at home, and recovery visit.',
          priceNote: 'SGD $1,800'
        },
        {
          id: 'pregnancy-birth',
          name: 'Pregnancy & Birth Support',
          badge: 'Most Popular',
          sessions: '2 Prenatal + 24/7 Active Labour Support + 1 Postpartum Visit',
          details: 'In-person bedside labour support at your hospital from active labour through golden hour bonding.',
          priceNote: 'SGD $2,600',
          isPopular: true
        },
        {
          id: 'complete-doula',
          name: 'Complete Birth Doula Support',
          badge: 'All-Inclusive',
          sessions: '3 Prenatal + 24/7 Hospital Labour + 2 In-Home Postnatal Debriefs',
          details: 'Full spectrum doula guidance including partner coaching, birth mapping, and early breastfeeding establishment.',
          priceNote: 'SGD $3,200'
        }
      ]
    }
  },

  'postpartum-massage-wrap': {
    id: 'postpartum-massage-wrap',
    slug: 'postpartum-massage-and-wrap',
    title: 'Postpartum Massage & Wrap',
    subtitle: 'Traditional full-body healing, belly binding (Kattu), and herbal confinement rejuvenation.',
    badge: 'Traditional Confinement Care',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Postpartum Massage & Wrap Disclaimer',
      body: [
        'Postpartum massage can commence 4–5 days following an uncomplicated vaginal birth or 5–7 days following a caesarean section, provided there are no surgical wound complications or active infections.',
        'For caesarean births, abdominal massage will be customized with extreme care, avoiding direct scar contact until full medical wound healing is confirmed.',
        'Please inform your therapist immediately of any sudden postpartum bleeding, dizziness, or calf pain.'
      ]
    },
    packages: {
      standard: [
        {
          id: 'ssp-1-session',
          name: '1 Session Trial Postpartum Massage & Wrap',
          sessions: '1 Session (60 Mins)',
          details: 'Full-body herbal oil massage, uterine alignment, and traditional cotton abdominal binding wrap.'
        },
        {
          id: 'ssp-pkg-1',
          name: 'SSP Package 1 - 10 Sessions',
          sessions: '10 Daily / Alternate Sessions',
          details: 'Essential recovery package for initial uterine involution, swelling reduction, and sleep restoration.'
        },
        {
          id: 'ssp-pkg-2',
          name: 'SSP Package 2 - 15 Sessions',
          badge: 'Most Popular',
          sessions: '15 Daily Sessions',
          details: 'Comprehensive confinement care supporting abdominal muscle realignment and sustained lactation stimulation.',
          isPopular: true
        },
        {
          id: 'ssp-pkg-3',
          name: 'SSP Package 3 - 20 Sessions',
          sessions: '20 Sessions',
          details: 'Extended traditional postpartum healing for deeper pelvic floor support and vitality restoration.'
        },
        {
          id: 'ssp-pkg-4',
          name: 'SSP Package 4 - 30 Sessions',
          badge: 'Traditional Month',
          sessions: '30 Daily Sessions (1 Month)',
          details: 'The complete 30-day confinement sanctuary for transformative maternal rejuvenation.'
        }
      ],
      premium: [
        {
          id: 'spp-1-session',
          name: '1 Session Premium Postpartum Massage & Herbal Bath',
          sessions: '1 Session (90 Mins)',
          details: 'Full-body massage, customized herbal bath infusion (Nalangu / Thailam), and specialized multi-layer wrap.'
        },
        {
          id: 'spp-pkg-1',
          name: 'SPP Package 1 - 10 Sessions',
          sessions: '10 Premium Sessions (90 Mins each)',
          details: 'Includes luxury herbal bath decoctions and concentrated herbal abdominal poultices daily.'
        },
        {
          id: 'spp-pkg-2',
          name: 'SPP Package 2 - 15 Sessions',
          badge: 'Luxury Healing',
          sessions: '15 Premium Sessions (90 Mins each)',
          details: 'Holistic confinement rituals with organic Siddha oils, warm herbal compress, and postpartum wrap.',
          isPopular: true
        },
        {
          id: 'spp-pkg-3',
          name: 'SPP Package 3 - 20 Sessions',
          sessions: '20 Premium Sessions (90 Mins each)',
          details: 'Complete 20-day royal postpartum sanctuary including lactation herbal chest massage.'
        },
        {
          id: 'spp-pkg-4',
          name: 'SPP Package 4 - 30 Sessions',
          badge: 'Royal Sanctuary',
          sessions: '30 Premium Sessions (90 Mins each)',
          details: 'Full month of daily restorative bodywork, bespoke herbal bath preparations, and wrap adjustments.'
        }
      ]
    }
  },

  'infant-massage-bath': {
    id: 'infant-massage-bath',
    slug: 'infant-massage-and-bath',
    title: 'Signature Infant Massage & Bath',
    subtitle: 'Gentle Ayurvedic baby bodywork, colic relief strokes, and calming traditional bath routines.',
    badge: 'Gentle Baby Care',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Signature Infant Massage & Bath Disclaimer',
      body: [
        'Infant massage and traditional bathing are safe, calming practices for healthy full-term and cleared preterm infants from 2 weeks of age.',
        'We require that sessions be scheduled at least 30–45 minutes after feeding to prevent regurgitation.',
        'If baby has an active fever, unexplained skin rash, or received routine vaccinations within the last 48 hours, sessions will be rescheduled.'
      ]
    },
    packages: {
      flat: [
        {
          id: 'simb-1-session',
          name: '1 Session Infant Massage & Bath',
          sessions: '1 Session (45 Mins)',
          details: 'Traditional baby massage (Thokkanam) with organic virgin cold-pressed oil & soothing herbal bath.'
        },
        {
          id: 'simb-pkg-1',
          name: 'SIMB Package 1 - 10 Sessions',
          sessions: '10 Daily / Scheduled Sessions',
          details: 'Ideal starter routine for colic relief, gentle tummy strokes, and establishing peaceful sleep cues.'
        },
        {
          id: 'simb-pkg-2',
          name: 'SIMB Package 2 - 15 Sessions',
          badge: 'Popular',
          sessions: '15 Sessions',
          details: 'Sustained daily baby bodywork aiding digestion, motor flexibility, and parent co-learning.',
          isPopular: true
        },
        {
          id: 'simb-pkg-3',
          name: 'SIMB Package 3 - 20 Sessions',
          sessions: '20 Sessions',
          details: 'Comprehensive 3-week infant care sequence supporting regular digestion and healthy weight gain.'
        },
        {
          id: 'simb-pkg-4',
          name: 'SIMB Package 4 - 30 Sessions',
          badge: 'Full Month',
          sessions: '30 Daily Sessions',
          details: 'Complete 1-month daily newborn bathing and bodywork sanctuary right at your home.'
        },
        {
          id: 'simb-pkg-5',
          name: 'SIMB Package 5 - 40 Sessions',
          badge: 'Traditional Mandalam',
          sessions: '40 Daily Sessions',
          details: 'Full 40-day traditional mandalam baby care program for complete sensory and neurological development.'
        }
      ]
    }
  },

  'mother-baby-combo': {
    id: 'mother-baby-combo',
    slug: 'mother-and-baby-combo-packages',
    title: 'Mother & Baby Combo Packages',
    subtitle: 'Flagship integrated postpartum care — harmoniously nurturing mother and baby side by side.',
    badge: 'Flagship Dual Care',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Mother & Baby Combo Packages Disclaimer',
      body: [
        'Combined care provides sequential or synchronized daily care by our experienced senior care matrons.',
        'Care protocols for mother and baby follow individual safety guidelines regarding postpartum healing and baby feeding schedules.',
        'Session dates can be adjusted seamlessly if your actual delivery date occurs before or after your Estimated Due Date (EDD).'
      ]
    },
    packages: {
      standard: [
        {
          id: 'ssc-pkg-1',
          name: 'SSC Package 1',
          sessions: '15 Infant Massage & Bath + 10 Postpartum Massage & Wrap',
          details: '15 Sessions of Infant Massage & Bath + 10 Sessions of Postpartum Massage & Wrap.'
        },
        {
          id: 'ssc-pkg-2',
          name: 'SSC Package 2',
          sessions: '15 Infant Massage & Bath + 15 Postpartum Massage & Wrap',
          details: '15 Sessions of Infant Massage & Bath + 15 Sessions of Postpartum Massage & Wrap.'
        },
        {
          id: 'ssc-pkg-3',
          name: 'SSC Package 3',
          badge: 'Most Chosen',
          sessions: '20 Infant Massage & Bath + 20 Postpartum Massage & Wrap',
          details: '20 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap.',
          isPopular: true
        },
        {
          id: 'ssc-pkg-4',
          name: 'SSC Package 4',
          sessions: '30 Infant Massage & Bath + 15 Postpartum Massage & Wrap',
          details: '30 Sessions of Infant Massage & Bath + 15 Sessions of Postpartum Massage & Wrap.'
        },
        {
          id: 'ssc-pkg-5',
          name: 'SSC Package 5',
          sessions: '30 Infant Massage & Bath + 20 Postpartum Massage & Wrap',
          details: '30 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap.'
        },
        {
          id: 'ssc-pkg-6',
          name: 'SSC Package 6',
          sessions: '40 Infant Massage & Bath + 20 Postpartum Massage & Wrap',
          details: '40 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap.'
        },
        {
          id: 'ssc-pkg-7',
          name: 'SSC Package 7',
          badge: 'Complete Confinement',
          sessions: '30 Infant Massage & Bath + 30 Postpartum Massage & Wrap',
          details: '30 Sessions of Infant Massage & Bath + 30 Sessions of Postpartum Massage & Wrap.'
        }
      ],
      premium: [
        {
          id: 'spc-pkg-1',
          name: 'SPC Package 1',
          sessions: '15 Infant Massage & Bath + 10 Postpartum Massage & Wrap (Premium Herbal)',
          details: '15 Sessions of Infant Massage & Bath + 10 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        },
        {
          id: 'spc-pkg-2',
          name: 'SPC Package 2',
          sessions: '15 Infant Massage & Bath + 15 Postpartum Massage & Wrap (Premium Herbal)',
          details: '15 Sessions of Infant Massage & Bath + 15 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        },
        {
          id: 'spc-pkg-3',
          name: 'SPC Package 3',
          badge: 'Luxury Dual Care',
          sessions: '20 Infant Massage & Bath + 20 Postpartum Massage & Wrap (Premium Herbal)',
          details: '20 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap with Herbal Bath.',
          isPopular: true
        },
        {
          id: 'spc-pkg-4',
          name: 'SPC Package 4',
          sessions: '30 Infant Massage & Bath + 15 Postpartum Massage & Wrap (Premium Herbal)',
          details: '30 Sessions of Infant Massage & Bath + 15 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        },
        {
          id: 'spc-pkg-5',
          name: 'SPC Package 5',
          sessions: '30 Infant Massage & Bath + 20 Postpartum Massage & Wrap (Premium Herbal)',
          details: '30 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        },
        {
          id: 'spc-pkg-6',
          name: 'SPC Package 6',
          sessions: '40 Infant Massage & Bath + 20 Postpartum Massage & Wrap (Premium Herbal)',
          details: '40 Sessions of Infant Massage & Bath + 20 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        },
        {
          id: 'spc-pkg-7',
          name: 'SPC Package 7',
          badge: 'Royal Dual Sanctuary',
          sessions: '30 Infant Massage & Bath + 30 Postpartum Massage & Wrap (Premium Herbal)',
          details: '30 Sessions of Infant Massage & Bath + 30 Sessions of Postpartum Massage & Wrap with Herbal Bath.'
        }
      ]
    }
  },

  'confinement-nanny': {
    id: 'confinement-nanny',
    slug: 'stay-in-confinement-nanny-support',
    title: 'Stay-In Confinement Nanny Support',
    subtitle: 'Vetted, compassionate round-the-clock newborn night care, confinement cooking, and maternal rest.',
    badge: '24/7 Residential Care',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 7,
    stepTitles: [
      'About You',
      'Personal Details',
      'Household Basics',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review'
    ],
    disclaimer: {
      title: 'Stay-In Confinement Nanny Disclaimer',
      body: [
        'All SEYOL Stay-In Confinement Nannies (SCN) are rigorously background-checked, health-screened, and certified in traditional maternal and newborn care.',
        'Families are expected to provide suitable private accommodation, daily meals, and standard daily rest periods for the nanny.',
        'Nannies provide non-medical newborn and mother care. Any acute medical emergencies require immediate contact with your attending pediatrician or hospital emergency.'
      ]
    },
    packages: {
      flat: [
        {
          id: 'scn-pkg-1',
          name: 'SCN Package 1: Infant Care',
          details: '24/7 dedicated newborn care, night feeds, soothing, diapering, baby laundry, and nursery sanitation.'
        },
        {
          id: 'scn-pkg-2',
          name: 'SCN Package 2: Infant Care + 1 Confinement Meal',
          badge: 'Popular',
          details: '24/7 newborn care plus 1 freshly prepared authentic Ayurvedic/traditional confinement lunch or dinner daily.',
          isPopular: true
        },
        {
          id: 'scn-pkg-3',
          name: 'SCN Package 3: Infant Care + 2 Confinement Meals',
          details: '24/7 newborn care plus full daily lunch and dinner confinement cooking with customized herbal soups & tonics.'
        },
        {
          id: 'scn-pkg-4',
          name: 'SCN Package 4: Infant Care + Postpartum Massage & Wrap',
          badge: 'All-In-One',
          details: '24/7 newborn care + daily postpartum massage and herbal belly binding by dual-certified matron.'
        },
        {
          id: 'scn-pkg-5',
          name: 'SCN Package 5: Infant Twin Care',
          badge: 'Twins Specialist',
          details: 'Specialized 24/7 twin newborn care, synchronized feeding schedules, and double nursery management.'
        }
      ]
    }
  },

  'hourly-newborn-support': {
    id: 'hourly-newborn-support',
    slug: 'hourly-newborn-support',
    title: 'Hourly Newborn Support',
    subtitle: 'Flexible day or night blocks by trained neonatal care aides to give parents essential rest.',
    badge: 'Flexible Respite',
    isSingaporeOnly: true,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'Choose Your Support',
      'My SEYOL Care Journey',
      'Consent',
      'Review'
    ],
    disclaimer: {
      title: 'Hourly Newborn Support Disclaimer',
      body: [
        'Hourly newborn support aides assist parents with bottle/expressed milk feeding, soothing, burping, swaddling, and diapering.',
        'Aides follow parental guidelines and standard newborn hygiene protocols. They do not perform invasive medical procedures or administer unprescribed medications.',
        'Minimum booking block is 2 hours. Advance reservation is recommended to ensure matching with your preferred schedule.'
      ]
    }
  },

  'lactation-support': {
    id: 'lactation-support',
    slug: 'lactation-and-breastfeeding-support',
    title: 'Lactation & Feeding Support',
    subtitle: 'Empathetic guidance for comfortable latches, milk supply, pumping schedules, and feeding confidence.',
    badge: 'Clinical & Gentle',
    isSingaporeOnly: false,
    supportsInPerson: true,
    stepCount: 7,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'What Do You Need Support With?',
      'Appointment Preference',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'Lactation & Feeding Disclaimer',
      body: [
        'Lactation support is provided by certified lactation educators and senior maternal care consultants.',
        'We provide latch evaluations, positioning adjustments, therapeutic breast massage for engorgement, and customized pumping schedules.',
        'If you experience systemic fever, red streaking, or suspected severe clinical mastitis, we recommend prompt medical consultation alongside our feeding support.'
      ]
    }
  },

  'general-consultation': {
    id: 'general-consultation',
    slug: 'holistic-care-guidance-consultation',
    title: 'General Consultation',
    subtitle: 'A bespoke roadmap session with a senior SEYOL care advisor to tailor your maternal journey.',
    badge: 'Care Roadmap',
    isSingaporeOnly: false,
    supportsInPerson: true,
    stepCount: 6,
    stepTitles: [
      'About You',
      'What Brings You Here?',
      'What Do You Need Support With?',
      'Appointment Preference',
      'My SEYOL Care Journey',
      'Consent',
      'Review & Checkout'
    ],
    disclaimer: {
      title: 'General Consultation Disclaimer',
      body: [
        'A 45-minute private guidance session designed to map out your care timeline, answer confinement questions, and tailor service packages.',
        '100% of your consultation fee is credited towards any service package booked with SEYOL within 14 days of your consultation.',
        'All discussions are private and tailored to your family structure and health history.'
      ]
    }
  }
};

export const hospitalsSingapore = [
  'Mount Elizabeth Hospital',
  'Raffles Hospital',
  "KK Women's and Children's Hospital",
  'Thomson Medical',
  'Thomson Medical Centre',
  'Not decided yet',
  'Others'
];

export const bookingRecipients = [
  'Myself',
  'My partner',
  'My daughter',
  'Family member',
  'Friend',
  'Other'
];

export const initialBookingFormData: import('../types/booking').BookingFormData = {
  fullName: '',
  whatsapp: '',
  email: '',
  country: 'Singapore',
  postalCode: '',
  address: '',

  bookingFor: 'Myself',
  hasPermissionToShare: false,

  // Preconception
  preconceptionStage: 'Planning to try soon',
  preconceptionHelpWith: [],
  preconceptionMainQuestion: '',

  // Prenatal
  prenatalEdd: '',
  prenatalBabyCount: 'one-baby',
  prenatalSupportWith: [],
  prenatalPackage: '5-session',
  prenatalPreferredDate: '',
  prenatalPreferredTime: 'flexible',

  // Doula
  doulaStage: 'Currently pregnant',
  doulaEdd: '',
  doulaHospital: 'Thomson Medical',
  doulaHospitalOther: '',
  doulaBabyOrder: 'first-baby',
  doulaPreviousBirth: 'Not applicable',
  doulaBabyCount: 'one-baby',
  doulaPreparationTopics: [],
  doulaPackage: 'pregnancy-birth',
  doulaPreferredMode: 'in-person',

  // Postpartum
  postpartumStage: 'pregnant',
  postpartumEdd: '',
  postpartumExpectedDelivery: 'Vaginal birth expected',
  postpartumBabyOrder: 'first-baby',
  postpartumBabyCount: 'one-baby',
  postpartumStartTiming: 'After hospital discharge',
  postpartumBabyDob: '',
  postpartumActualDelivery: 'Vaginal birth',
  postpartumDischargedStatus: 'Yes',
  postpartumDischargeDate: '',
  postpartumPreferredStartDate: '',
  postpartumTier: 'standard',
  postpartumPackage: 'ssp-pkg-2',
  postpartumCustomSessions: '',
  postpartumPreferredTime: 'flexible',

  // Infant
  infantStage: 'pregnant',
  infantEdd: '',
  infantBabyOrder: 'first-baby',
  infantBabyCount: 'one-baby',
  infantStartTiming: 'After hospital discharge',
  infantBabyDob: '',
  infantDischargedStatus: 'Yes',
  infantDischargeDate: '',
  infantPreferredStartDate: '',
  infantPackage: 'simb-pkg-2',
  infantCustomSessions: '',
  infantPreferredTime: 'flexible',

  // Combo
  comboStage: 'pregnant',
  comboEdd: '',
  comboExpectedDelivery: 'Vaginal birth expected',
  comboBabyOrder: 'first-baby',
  comboBabyCount: 'one-baby',
  comboBabyDob: '',
  comboActualDelivery: 'Vaginal birth',
  comboDischargedStatus: 'Yes',
  comboDischargeDate: '',
  comboPreferredStartDate: '',
  comboTier: 'standard',
  comboPackage: 'ssc-pkg-3',
  comboCustomSessions: '',
  comboPreferredTime: 'flexible',
  comboArrangement: 'Start mother and baby care together',

  // Nanny
  nannyStage: 'pregnant',
  nannyEdd: '',
  nannyBabyOrder: 'first-baby',
  nannyOtherChildrenAges: '',
  nannyBabyCount: 'one-baby',
  nannyPreferredStartDate: 'After hospital discharge',
  nannySpecificStartDate: '',
  nannyBabyDob: '',
  nannyAdultsCount: 2,
  nannyHasHelper: 'No',
  nannyChildrenAtHome: '',
  nannyMealPreference: 'Vegetarian',
  nannyAccommodation: 'Separate room',
  nannyHasStairs: 'No',
  nannyHasPets: 'No',
  nannyPetTypes: [],
  nannyLanguagePreference: 'Tamil / Malay / English is fine',
  nannyPackage: 'scn-pkg-2',
  nannyDuration: '28 days',

  // Hourly
  hourlyStage: 'pregnant',
  hourlyEdd: '',
  hourlyExpectedDelivery: 'Vaginal birth expected',
  hourlyBabyOrder: 'first-baby',
  hourlyBabyCount: 'one-baby',
  hourlyStartTiming: 'After hospital discharge',
  hourlyBabyDob: '',
  hourlyDischargedStatus: 'Yes',
  hourlyDischargeDate: '',
  hourlyBabyConcerns: ['No major concerns'],
  hourlyWhenNeed: 'As soon as possible',
  hourlySpecificDate: '',
  hourlyPreferredTime: 'flexible',
  hourlyHoursCount: '3 hours',
  hourlyHelpWith: ['Feeding support', 'Burping', 'Baby routine support'],

  // Lactation
  lactationStage: 'I am returning to work / planning pumping',
  lactationBabyDob: '',
  lactationBabyOrder: 'first-baby',
  lactationBabyCount: 'one-baby',
  lactationDischargedStatus: 'Yes',
  lactationDischargeDate: '',
  lactationFeedingMethod: 'Breastfeeding',
  lactationHelpWith: ['Latching and positioning', 'Milk supply concerns'],
  lactationMainQuestion: '',
  lactationPreferredMode: 'virtual',
  lactationPreferredTime: 'flexible',

  // General
  generalStage: 'Planning before pregnancy',
  generalGuidanceOn: ['Postpartum care', 'Lactation / feeding'],
  generalMainQuestion: '',
  generalPreferredMode: 'virtual',
  generalPreferredTime: 'flexible',

  // Common Preferences
  preferredConsultationMode: 'virtual',
  preferredTime: 'flexible',

  // Step: Care Portal
  createPortalAccount: true,
  portalPassword: '',

  // Step: Consent
  acceptedServiceDisclaimer: false,
  acceptedPrivacyAndBooking: false,
  optInMarketing: true
};
