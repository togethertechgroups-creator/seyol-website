import { ClassWorkshop } from '../types';

export const classesData: ClassWorkshop[] = [
  {
    id: 'class-baby-massage',
    slug: 'traditional-baby-massage-and-bath-workshop',
    title: 'Traditional Baby Massage & Bath Workshop',
    stages: ['newborn', 'postpartum', 'pregnancy'],
    category: 'practical-skills',
    tagline: 'Master the art of Indian newborn bodywork, safe head holding, and soothing warm bath rituals.',
    summary: 'A signature hands-on masterclass where parents learn time-tested Ayurvedic & Siddha infant massage strokes, gas-relieving tummy routines, and safe bathing techniques using real-life simulation dolls.',
    whatYouLearn: [
      'Anatomy of newborn skin & selecting safe cold-pressed oils',
      'Step-by-step 20-minute daily massage sequence to enhance neurological bonding',
      'Specialised colic, gas, and reflux soothing sequences (I Love U & bicycle strokes)',
      'Traditional safe bath hold, water temperature check, and herbal wash powders',
      'Safe nasal clearing, ear moisture management, and cradle cap prevention'
    ],
    format: 'In-Person Studio (Chennai) & Live Interactive (Online)',
    duration: '2.5 Hours (Interactive Workshop with Q&A)',
    pricing: 1800,
    currency: 'INR',
    instructor: {
      name: 'Ms Jemma Francis',
      role: 'Co-Founder & Master Infant Massage Educator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      credentials: 'Certified Infant Massage Instructor (IAIM) & Traditional Postnatal Matron (18+ Years Experience)'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-22',
        time: '10:30 AM - 1:00 PM IST',
        seatsLeft: 4,
        totalSeats: 12,
        format: 'In-Person Studio (Alwarpet, Chennai)'
      },
      {
        date: '2026-08-29',
        time: '3:00 PM - 5:30 PM IST',
        seatsLeft: 6,
        totalSeats: 15,
        format: 'Live Interactive (Zoom HD)'
      },
      {
        date: '2026-09-05',
        time: '10:30 AM - 1:00 PM IST',
        seatsLeft: 8,
        totalSeats: 12,
        format: 'In-Person Studio (Alwarpet, Chennai)'
      }
    ],
    materialsIncluded: [
      'SEY 100ml Cold-Pressed Baby Massage Oil bottle',
      'Step-by-step printed Waterproof Stroke Sequence Guide',
      'Lifetime access to HD review video recordings',
      'Certificate of Completion for parents'
    ],
    whoShouldAttend: 'Expectant parents in their 3rd trimester, or parents with newborns aged 0 to 6 months. Partners are strongly encouraged to attend together for no extra charge.',
    videoPreviewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    relatedServiceIds: ['infant-massage-bath', 'mother-baby-combo']
  },
  {
    id: 'class-newborn-essentials',
    slug: 'newborn-care-essentials-for-modern-parents',
    title: 'Newborn Care Essentials',
    stages: ['pregnancy', 'newborn'],
    category: 'practical-skills',
    tagline: 'Bridging timeless traditional newborn wisdom with evidence-based paediatric sleep, safety, and hygiene.',
    summary: 'Demystify the first 100 days of your baby’s life. Gain rock-solid confidence in swaddling, burping mechanics, decoding newborn cries, diapering, temperature regulation, and safe sleep habits.',
    whatYouLearn: [
      'Decoding the 5 primary newborn hunger and fatigue cues',
      'Effective burping techniques that prevent painful trapped air',
      'Safe swaddling, room temperature monitoring, and SIDS risk reduction',
      'Umbilical cord stump care, nail trimming, and sensitive skin hygiene',
      'Establishing healthy circadian rhythms and gentle day/night conditioning'
    ],
    format: 'Live Interactive (Online)',
    duration: '2 Hours (Interactive Zoom + Live Demo)',
    pricing: 1500,
    currency: 'INR',
    instructor: {
      name: 'Ms Janet Francis',
      role: 'Co-Founder & Clinical Neonatal Care Lead',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
      credentials: 'Registered Midwife & Neonatal Transition Specialist (20+ Years Experience)'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-23',
        time: '4:00 PM - 6:00 PM IST',
        seatsLeft: 3,
        totalSeats: 20,
        format: 'Live Interactive (Zoom HD)'
      },
      {
        date: '2026-09-06',
        time: '11:00 AM - 1:00 PM IST',
        seatsLeft: 11,
        totalSeats: 20,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Comprehensive 32-Page Digital Newborn Survival Handbook',
      'Printable Diaper, Feeding & Sleep Log Template',
      'Immediate Q&A during class with live feedback on holds'
    ],
    whoShouldAttend: 'First-time expectant parents between 26 and 38 weeks of pregnancy, grandparents, and primary caregivers.',
    relatedServiceIds: ['hourly-newborn-support', 'confinement-nanny']
  },
  {
    id: 'class-postpartum-prep',
    slug: 'postpartum-and-confinement-preparation',
    title: 'Postpartum & Confinement Preparation',
    stages: ['pregnancy', 'postpartum'],
    category: 'birth-prep',
    tagline: 'Preparing for the sacred "Fourth Trimester" — bodily recovery, emotional balance, and family support.',
    summary: 'Society prepares for the baby; SEYOL prepares for the mother. Learn the physiological stages of postnatal healing, emotional postpartum blues vs depression, uterine recovery, traditional South Indian diet, and setting healthy boundaries with relatives.',
    whatYouLearn: [
      'Physical recovery milestones after vaginal birth vs Caesarean section',
      'The traditional South Indian 40-day confinement principles (Pathiya Samayal & rest)',
      'Lochia stages, perineal care, and C-section incision protection',
      'Managing postpartum hormonal shifts, sleep fragmentation, and emotional health',
      'Creating an airtight postpartum support plan with your partner and family'
    ],
    format: 'Live Interactive (Online)',
    duration: '2.5 Hours',
    pricing: 1600,
    currency: 'INR',
    instructor: {
      name: 'Ms Jemma Francis',
      role: 'Co-Founder & Postnatal Doula',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      credentials: 'Traditional Confinement Specialist & Women’s Health Advocate'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-30',
        time: '10:00 AM - 12:30 PM IST',
        seatsLeft: 5,
        totalSeats: 18,
        format: 'Live Interactive (Zoom HD)'
      },
      {
        date: '2026-09-13',
        time: '3:00 PM - 5:30 PM IST',
        seatsLeft: 12,
        totalSeats: 18,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Postpartum Recovery Checklist & Hospital Bag Packing Guide',
      'Traditional 40-Day Confinement Meal Plan & Recipe Book (PDF)',
      'Partner Support Guide: Practical ways your partner can protect your rest'
    ],
    whoShouldAttend: 'Expectant mothers and their partners in their 2nd or 3rd trimester.',
    relatedServiceIds: ['postpartum-massage-wrap', 'mother-baby-combo']
  },
  {
    id: 'class-birth-prep',
    slug: 'preparing-for-birth-with-seyol',
    title: 'Preparing for Birth with SEYOL',
    stages: ['pregnancy', 'birth'],
    category: 'birth-prep',
    tagline: 'Replace fear of labour with deep bodily trust, practical pain relief tools, and calm confidence.',
    summary: 'A comprehensive childbirth education workshop designed to equip couples with non-pharmacological comfort techniques, understanding hospital procedures, and working in partnership with your birth team.',
    whatYouLearn: [
      'The 4 stages of labour & how to recognise true labour onset',
      'Breathing techniques that prevent hyperventilation and relax the pelvic floor',
      'Hands-on partner counterpressure, hip squeezes, and Rebozo techniques',
      'Navigating hospital interventions (Inductions, Epidural, Episiotomy, C-sections)',
      'Writing an empowering, flexible Birth Preferences Document'
    ],
    format: 'In-Person Studio (Chennai) & Live Online',
    duration: '3.5 Hours (Deep-Dive Workshop with Hands-On Practice)',
    pricing: 2400,
    currency: 'INR',
    instructor: {
      name: 'Ms Janet Francis',
      role: 'Co-Founder & Senior Doula Educator',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
      credentials: 'Lamaze Certified Childbirth Educator (LCCE) & Experienced Midwife'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-29',
        time: '9:30 AM - 1:00 PM IST',
        seatsLeft: 2,
        totalSeats: 10,
        format: 'In-Person Studio (Alwarpet, Chennai)'
      },
      {
        date: '2026-09-12',
        time: '10:00 AM - 1:30 PM IST',
        seatsLeft: 7,
        totalSeats: 16,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'SEYOL Birth Preferences Canvas Template',
      'Labour Positions & Comfort Measures Flashcard Deck',
      'Audio Guided Hypnobirthing Relaxation Track (MP3)'
    ],
    whoShouldAttend: 'Pregnant mothers between 24 and 36 weeks and their chosen birth support partners.',
    relatedServiceIds: ['birth-doula-support', 'prenatal-massage']
  },
  {
    id: 'class-breastfeeding-basics',
    slug: 'breastfeeding-and-bottle-feeding-basics',
    title: 'Breastfeeding & Bottle Feeding Basics',
    stages: ['pregnancy', 'postpartum', 'newborn'],
    category: 'feeding-nourishment',
    tagline: 'Practical, pain-free latch mechanics, milk establishment, and responsive bottle feeding.',
    summary: 'Breastfeeding is a learned skill for both mother and baby. This class provides practical guidance on achieving deep painless latches, recognizing milk transfer, preventing mastitis, and integrating paced bottle feeding.',
    whatYouLearn: [
      'The mechanics of an optimal deep asymmetrical latch',
      'Feeding positions: Cradle, Cross-Cradle, Football, and Side-Lying nursing',
      'Decoding how much milk baby is actually transferring (swallow vs suckle)',
      'Preventing and treating sore nipples, engorgement, and blocked ducts',
      'Paced bottle feeding guidelines for pumped breast milk or formula'
    ],
    format: 'Live Interactive (Online)',
    duration: '2 Hours',
    pricing: 1400,
    currency: 'INR',
    instructor: {
      name: 'Ms Janet Francis',
      role: 'Co-Founder & Lactation Specialist',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
      credentials: 'IBCLC Certified Lactation Consultant & Midwife'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-26',
        time: '5:00 PM - 7:00 PM IST',
        seatsLeft: 6,
        totalSeats: 20,
        format: 'Live Interactive (Zoom HD)'
      },
      {
        date: '2026-09-09',
        time: '5:00 PM - 7:00 PM IST',
        seatsLeft: 14,
        totalSeats: 20,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Visual Latch Correction Guide & Troubleshooting Cheat Sheet',
      'Milk Storage Guidelines Chart (Fridge, Freezer & Thawing)',
      'Direct access to post-class Q&A group'
    ],
    whoShouldAttend: 'Expectant parents in the 3rd trimester or newly postpartum mothers currently nursing.',
    relatedServiceIds: ['lactation-support']
  },
  {
    id: 'class-prenatal-movement',
    slug: 'prenatal-movement-and-pelvic-comfort',
    title: 'Prenatal Movement & Comfort',
    stages: ['pregnancy'],
    category: 'practical-skills',
    tagline: 'Safe, restorative stretches and pelvic alignment exercises for ease in pregnancy and birth.',
    summary: 'Gentle, breath-led movement sessions designed to open the pelvic inlet and outlet, release tension in the lower back and round ligaments, and prepare muscles for labour endurance.',
    whatYouLearn: [
      'Pelvic floor awareness: learning how to release and yield (not just Kegels)',
      'Stretches for sciatica, pubic symphysis dysfunction, and lower back ache',
      'Birth ball positions to encourage optimal foetal positioning (LOA/LOT)',
      'Breath-led restorative restorative postures for evening relaxation'
    ],
    format: 'Live Interactive (Online)',
    duration: '75 Minutes per Session (Weekly Cohort)',
    pricing: 950,
    currency: 'INR',
    instructor: {
      name: 'Priya Sundaram',
      role: 'Senior Prenatal Yoga & Movement Specialist',
      avatar: 'https://images.unsplash.com/photo-1594824813501-44754593e9ad?auto=format&fit=crop&q=80&w=600',
      credentials: 'RPYT Registered Prenatal Movement Coach & Physiotherapist'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-25',
        time: '7:30 AM - 8:45 AM IST',
        seatsLeft: 8,
        totalSeats: 15,
        format: 'Live Interactive (Zoom HD)'
      },
      {
        date: '2026-09-01',
        time: '7:30 AM - 8:45 AM IST',
        seatsLeft: 10,
        totalSeats: 15,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Daily 15-minute Home Routine Movement PDF',
      'Birth ball size and ergonomics recommendation guide'
    ],
    whoShouldAttend: 'Pregnant women in their 2nd or 3rd trimester with medical clearance for gentle exercise.',
    relatedServiceIds: ['prenatal-massage']
  },
  {
    id: 'class-nourishment',
    slug: 'pregnancy-to-postpartum-traditional-nourishment',
    title: 'Pregnancy to Postpartum Nourishment',
    stages: ['pregnancy', 'postpartum'],
    category: 'feeding-nourishment',
    tagline: 'Harnessing the healing power of traditional herbs, spices, and healing foods for mother and baby.',
    summary: 'Explore traditional dietary wisdom from Siddha and Ayurveda. Discover which spices encourage milk flow (galactagogues), which foods aid digestion without causing colic in baby, and how to cook nourishing confinement meals.',
    whatYouLearn: [
      'The culinary philosophy of warm, unctuous, easy-to-digest post-birth foods',
      'Key healing ingredients: garlic, fenugreek, cumin, dill, pepper, and dried ginger',
      'Traditional postpartum recipes: Angaya Podi, Poondu Legiyam, and Soups',
      'Foods to avoid during the initial 40 days to protect infant digestion'
    ],
    format: 'Live Interactive (Online)',
    duration: '2 Hours',
    pricing: 1200,
    currency: 'INR',
    instructor: {
      name: 'Ms Jemma Francis',
      role: 'Co-Founder & Traditional Nutritionist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      credentials: 'Ayurvedic & Siddha Postpartum Nutrition Practitioner'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-27',
        time: '4:00 PM - 6:00 PM IST',
        seatsLeft: 7,
        totalSeats: 25,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Traditional 40-Day South Indian Postpartum Recipe Book (PDF)',
      'Confinement Grocery Shopping Pantry Checklist'
    ],
    whoShouldAttend: 'Mothers, partners, grandmothers, and family cooks preparing for post-delivery meals.',
    relatedServiceIds: ['confinement-nanny', 'postpartum-massage-wrap']
  },
  {
    id: 'class-partner-prep',
    slug: 'partner-and-family-preparation-for-baby',
    title: 'Partner & Family Preparation',
    stages: ['pregnancy', 'birth', 'postpartum'],
    category: 'family-support',
    tagline: 'Transforming partners from anxious bystanders into confident, skilled caregivers.',
    summary: 'A dedicated session focusing on partners and extended family. Covers practical labour support, managing home logistics, handling postpartum visitors respectfully, and bonding with newborn.',
    whatYouLearn: [
      'Concrete labour support roles: timing contractions, physical counterpressure, hydration',
      'How to soothe a crying baby and master the safe burp/swaddle holds',
      'Protecting mother’s mental health and recognising postpartum mood disorders',
      'Managing well-meaning relatives and setting healthy confinement boundaries'
    ],
    format: 'Live Interactive (Online)',
    duration: '90 Minutes',
    pricing: 1100,
    currency: 'INR',
    instructor: {
      name: 'Ms Janet Francis',
      role: 'Co-Founder & Family Transition Coach',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
      credentials: 'Family Wellness Counselor & Doula Mentor'
    },
    scheduleUpcoming: [
      {
        date: '2026-08-28',
        time: '7:00 PM - 8:30 PM IST',
        seatsLeft: 9,
        totalSeats: 20,
        format: 'Live Interactive (Zoom HD)'
      }
    ],
    materialsIncluded: [
      'Partner Practical Action Cards (Printable)',
      'Hospital & Confinement Checklist for Spouses'
    ],
    whoShouldAttend: 'Spouses, partners, and primary support persons expecting a baby.',
    relatedServiceIds: ['birth-doula-support']
  }
];
