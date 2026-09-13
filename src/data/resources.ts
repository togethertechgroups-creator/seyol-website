import { ResourceItem, GatedVideo, ResourceBundle } from '../types';

export const resourceBundlesData: ResourceBundle[] = [
  {
    id: 'bundle-free-starter-pack',
    slug: 'free-new-parent-starter-pack',
    title: 'Free New Parent Starter Pack',
    tagline: 'Zero-Cost Essential Toolkits for First-Time Parents',
    description: 'Essential printable checklists, logs, and meal guides to bring immediate clarity and calm to the early days with your baby.',
    stage: 'newborn',
    price: 0,
    originalPrice: 499,
    currency: 'INR',
    isFree: true,
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
    badge: '100% Free Download',
    totalGuides: 5,
    format: 'Printable PDF & Digital Notion/Fillable Format',
    downloadSize: '12.4 MB',
    isFeatured: true,
    highlights: [
      '5 Instant printable tools',
      'Zero-fluff South Indian hospital packing list',
      'Daily feeding & wet nappy tracking sheets',
      'Colic soothing quick chart'
    ],
    inclusions: [
      {
        title: 'Hospital Bag Checklist',
        type: 'checklist',
        pages: '4 Pages',
        description: 'Categorised checklist for labour ward, postpartum stay, and baby discharge.'
      },
      {
        title: 'Newborn Feeding & Sleep Log',
        type: 'tracker',
        pages: '8 Pages',
        description: 'Clean daily tracker for breast/bottle feeds, sleep windows, and wet/dirty nappies.'
      },
      {
        title: 'Bath Time Essentials Checklist',
        type: 'checklist',
        pages: '2 Pages',
        description: 'Pre-bath prep, safety checkpoints, and traditional bathing item essentials.'
      },
      {
        title: 'Confinement Meal Planner Template',
        type: 'template',
        pages: '6 Pages',
        description: 'Fillable weekly meal rotation template to plan warm, easy-to-digest healing meals.'
      },
      {
        title: 'Baby Cry & Soothing Quick Chart',
        type: 'chart',
        pages: '2 Pages',
        description: 'Visual reference identifying hunger vs fatigue vs gas cues and calming steps.'
      }
    ]
  },
  {
    id: 'bundle-newborn-care-starter',
    slug: 'newborn-care-starter-bundle',
    title: 'Newborn Care Starter Bundle',
    tagline: 'Confidence and Traditional Gentle Care for the First 30 Days',
    description: 'A complete handbook and illustrated sheets covering gentle swaddling, cord care, diaper hygiene, and soothing techniques.',
    stage: 'newborn',
    price: 399,
    originalPrice: 999,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    badge: 'Most Popular for Newborns',
    totalGuides: 5,
    format: 'High-Res PDF Guides & Illustrated Step Sheets',
    downloadSize: '24.8 MB',
    highlights: [
      '30-day chronological newborn milestones',
      'Umbilical cord hygiene step-by-step',
      'Hip-healthy swaddling techniques',
      'Cry interpretation decoder'
    ],
    inclusions: [
      {
        title: 'Newborn Care Guide: The First 30 Days',
        type: 'guide',
        pages: '32 Pages',
        description: 'Comprehensive day-by-day care breakdown covering skin, sleep, feeding, and temperature regulation.'
      },
      {
        title: 'Diaper Changing & Umbilical Cord Care Guide',
        type: 'guide',
        pages: '6 Pages',
        description: 'Gentle sanitisation, cord stump drying protocols, and preventing nappy rash naturally.'
      },
      {
        title: 'Safe Swaddling Step-by-Step Sheet',
        type: 'routine',
        pages: '4 Pages',
        description: 'Illustrated folds for breathable cotton swaddling preserving hip mobility and preventing startle awake.'
      },
      {
        title: 'Baby Cry & Soothing Techniques Chart',
        type: 'chart',
        pages: '4 Pages',
        description: 'The 5 S soothing sequence, rhythmic movement, and South Indian cradle techniques.'
      },
      {
        title: 'Newborn Feeding & Sleep Log',
        type: 'tracker',
        pages: '8 Pages',
        description: 'Printable tracking sheets with paediatric hydration benchmarks.'
      }
    ]
  },
  {
    id: 'bundle-baby-massage-bath',
    slug: 'baby-massage-and-bath-bundle',
    title: 'Baby Massage & Bath Bundle',
    tagline: 'Traditional Indian Baby Massage & Safe Bathing Rituals',
    description: 'Step-by-step illustrated stroke sequences, safe oil formulations, temperature guides, and joyful bathing protocols passed down through generations.',
    stage: 'newborn',
    price: 399,
    originalPrice: 999,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    badge: 'Herbal Heritage Favourite',
    totalGuides: 6,
    format: 'Illustrated PDF Guides & Visual Quick References',
    downloadSize: '28.1 MB',
    isFeatured: true,
    highlights: [
      'Traditional Thokkanam stroke sequence',
      'Cold-pressed oil selection guidelines',
      'Indian seated bath hold ergonomics',
      'Colic relief tummy routines'
    ],
    inclusions: [
      {
        title: 'Traditional Indian Baby Massage Step-by-Step Guide',
        type: 'guide',
        pages: '24 Pages',
        description: 'Detailed stroke directions from head to toe, pressure levels, and calming communication.'
      },
      {
        title: 'Daily Baby Massage Routine Chart',
        type: 'routine',
        pages: '4 Pages',
        description: 'Wall-printable routine chart with morning and evening stroke reminders.'
      },
      {
        title: 'Baby Massage Oils: What’s Safe for Baby Guide',
        type: 'guide',
        pages: '10 Pages',
        description: 'Deep dive into cold-pressed sesame, coconut, almond, and infused herbs by skin type and climate.'
      },
      {
        title: 'Safe Baby Bathing Step-by-Step Guide',
        type: 'guide',
        pages: '12 Pages',
        description: 'Master the traditional seated leg-stretch hold, herbal ubtan application, and gentle rinsing.'
      },
      {
        title: 'Water Temperature & Bath Safety Quick Reference',
        type: 'chart',
        pages: '2 Pages',
        description: 'Water temperature ranges, room prep, and slip prevention checklist.'
      },
      {
        title: 'Bath Time Essentials Checklist',
        type: 'checklist',
        pages: '2 Pages',
        description: 'Everything you need ready within arm’s reach before bath time starts.'
      }
    ]
  },
  {
    id: 'bundle-breastfeeding-bottle-feeding',
    slug: 'breastfeeding-and-bottle-feeding-bundle',
    title: 'Breastfeeding & Bottle Feeding Bundle',
    tagline: 'Deep Latch Support, Positions, Pumping & Supply Guidance',
    description: 'Practical, stigma-free feeding support. Clear latch illustrations, nursing positions, breastmilk storage charts, and troubleshooting mastitis or low supply.',
    stage: 'postpartum',
    price: 399,
    originalPrice: 999,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    badge: 'Lactation Consultant Verified',
    totalGuides: 5,
    format: 'Illustrated PDF Guides & Printable Wall Posters',
    downloadSize: '19.6 MB',
    highlights: [
      'Painless latch anatomy breakdown',
      '5 ergonomic feeding postures',
      'Safe milk freezing & thawing rules',
      'Nipple healing & engorgement protocols'
    ],
    inclusions: [
      {
        title: 'Latching Techniques Illustrated Guide',
        type: 'guide',
        pages: '18 Pages',
        description: 'Asymmetric latch method, nipple alignment, and audible swallowing indicators.'
      },
      {
        title: 'Breastfeeding Positions Poster',
        type: 'poster',
        pages: '2 Pages',
        description: 'Cradle, cross-cradle, football hold, side-lying, and laid-back nursing postures.'
      },
      {
        title: 'Bottle Feeding & Sterilisation Checklist',
        type: 'checklist',
        pages: '4 Pages',
        description: 'Paced bottle feeding steps, boiling/steam sterilisation schedules, and teats selection.'
      },
      {
        title: 'Pumping & Milk Storage Guide',
        type: 'guide',
        pages: '8 Pages',
        description: 'Flange sizing guide, power pumping schedules, and room temp / fridge / freezer duration tables.'
      },
      {
        title: 'Breastfeeding Troubleshooting Guide',
        type: 'guide',
        pages: '16 Pages',
        description: 'Action plans for sore nipples, plugged ducts, thrush, oversupply, and cluster feeding.'
      }
    ]
  },
  {
    id: 'bundle-birth-preparation-toolkit',
    slug: 'birth-preparation-toolkit',
    title: 'Birth Preparation Toolkit',
    tagline: 'Calm Labour Readiness, Birth Plans & Partner Support',
    description: 'Empower yourself and your birth partner. Demystify stages of labour, practice upright birthing positions, and master comforting acupressure points.',
    stage: 'pregnancy',
    price: 449,
    originalPrice: 1199,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
    badge: 'Essential for Expecting Parents',
    totalGuides: 6,
    format: 'Fillable PDF Workbooks & Visual Labour Sheets',
    downloadSize: '22.3 MB',
    highlights: [
      'Customizable Birth Preferences document',
      'Labour partner hands-on comfort guide',
      'Illustrated pelvic-opening positions',
      'Acupressure map for labour pain relief'
    ],
    inclusions: [
      {
        title: 'Hospital Bag Checklist',
        type: 'checklist',
        pages: '4 Pages',
        description: 'Ultimate hospital packing list tailored for Indian hospital maternity protocols.'
      },
      {
        title: 'Birth Plan Template',
        type: 'template',
        pages: '6 Pages',
        description: 'Interactive, modular template to communicate desires with your obstetrician and nursing team.'
      },
      {
        title: 'Stages of Labour Explained Guide',
        type: 'guide',
        pages: '20 Pages',
        description: 'Latent phase, active labour, transition, pushing stage, and delivery of the placenta.'
      },
      {
        title: 'Birthing Positions Illustrated Sheet',
        type: 'routine',
        pages: '4 Pages',
        description: 'Gravity-friendly upright positions, asymmetrical lunges, and hands-and-knees poses.'
      },
      {
        title: 'Partner’s Guide to Labour Support',
        type: 'guide',
        pages: '14 Pages',
        description: 'Counterpressure techniques, verbal affirmations, hip squeezes, and timing contractions.'
      },
      {
        title: 'Acupressure Points for Labour Comfort Chart',
        type: 'chart',
        pages: '4 Pages',
        description: 'Exact pressure points (LI4, SP6, BL32) with safety guidelines for labour.'
      }
    ]
  },
  {
    id: 'bundle-pregnancy-comfort-movement',
    slug: 'pregnancy-comfort-and-movement-bundle',
    title: 'Pregnancy Comfort & Movement Bundle',
    tagline: 'Prenatal Mobility, Partner Massage & Trimester Exercise Routines',
    description: 'Relieve back pain, sciatica, and pelvic girdle discomfort while preparing your body for birth with safe movement and gentle touch.',
    stage: 'pregnancy',
    price: 449,
    originalPrice: 1199,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    badge: 'Physio & Yoga Approved',
    totalGuides: 7,
    format: 'Trimester Movement Guides & Partner Routines',
    downloadSize: '31.2 MB',
    highlights: [
      'Trimester-by-trimester safe exercise plans',
      'Partner massage scripts for back & legs',
      'Acupressure points to strictly avoid during pregnancy',
      'Birth ball pelvic mobility routine'
    ],
    inclusions: [
      {
        title: 'Prenatal Massage Safety Guide',
        type: 'guide',
        pages: '12 Pages',
        description: 'Safe side-lying positioning, safe pressure levels, and contraindications by trimester.'
      },
      {
        title: 'Partner Massage Techniques for Pregnancy Discomfort',
        type: 'routine',
        pages: '16 Pages',
        description: 'Step-by-step instructions for lower back release, shoulder tension, and swollen foot massage.'
      },
      {
        title: 'Pressure Points to Avoid During Pregnancy Chart',
        type: 'chart',
        pages: '2 Pages',
        description: 'Crucial visual chart detailing uterine-stimulating points to completely avoid before week 37.'
      },
      {
        title: 'Pregnancy-Safe Exercise Guide by Trimester',
        type: 'guide',
        pages: '22 Pages',
        description: 'Gentle strength, cardiovascular, and stretching routines modified for each 12-week block.'
      },
      {
        title: 'Breathing & Relaxation Techniques for Birth',
        type: 'routine',
        pages: '8 Pages',
        description: 'Diaphragmatic breathing, golden thread breath, and progressive muscular relaxation scripts.'
      },
      {
        title: 'Birth Ball Exercises Guide',
        type: 'routine',
        pages: '10 Pages',
        description: 'Pelvic tilts, figure 8s, and hip circling on the exercise ball for optimal baby positioning.'
      },
      {
        title: 'Pelvic Floor Exercise Routine',
        type: 'routine',
        pages: '6 Pages',
        description: 'Proper Kegel engagement, pelvic floor release, and avoiding hypertonic tightness.'
      }
    ]
  },
  {
    id: 'bundle-postpartum-recovery-confinement',
    slug: 'postpartum-recovery-and-confinement-bundle',
    title: 'Postpartum Recovery & Confinement Bundle',
    tagline: 'Sacred 40-Day Healing, Confinement Recipes & Traditional Care',
    description: 'The definitive handbook to maternal restoration. Week-by-week physiological recovery, traditional medicinal recipes, belly binding, and nourishing lactation diets.',
    stage: 'postpartum',
    price: 499,
    originalPrice: 1299,
    currency: 'INR',
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    badge: 'Bestseller Confinement Handbook',
    totalGuides: 8,
    format: 'Full-Colour Recipe eBook & Confinement Care Guides',
    downloadSize: '38.5 MB',
    isFeatured: true,
    highlights: [
      'Day 1 to 40 complete physical healing timeline',
      '50 traditional South Indian pathiya samayal recipes',
      'Cotton belly binding (Kattu) step-by-step',
      'Lactogenic herbal teas & legiyam formulas'
    ],
    inclusions: [
      {
        title: 'Postpartum Recovery Timeline',
        type: 'guide',
        pages: '16 Pages',
        description: 'Lochia progression, uterine involution, perineal/C-section healing, and emotional wellness milestones.'
      },
      {
        title: 'Benefits of Postpartum Massage e-Booklet',
        type: 'ebook',
        pages: '20 Pages',
        description: 'The science and tradition of postnatal herbal oil massage (Abhyanga) for lymphatic drainage and pain relief.'
      },
      {
        title: 'Self-Massage Techniques for Back, Neck & Shoulders',
        type: 'routine',
        pages: '8 Pages',
        description: '10-minute daily self-care strokes relieving nursing hunch and upper back aches.'
      },
      {
        title: 'Abdominal Binding Guide',
        type: 'guide',
        pages: '10 Pages',
        description: 'Correct application of traditional cotton wraps (kattu) to support core and pelvic alignment.'
      },
      {
        title: 'Confinement Meal Planner',
        type: 'template',
        pages: '12 Pages',
        description: '6-week structured revolving meal planner with weekly grocery shopping lists.'
      },
      {
        title: 'Traditional Confinement Recipes e-Book',
        type: 'ebook',
        pages: '78 Pages',
        description: '50 authentic South Indian healing soups, legiyams, garlic curries, kootus, and rasams.'
      },
      {
        title: 'Foods to Eat & Avoid During Confinement Chart',
        type: 'chart',
        pages: '4 Pages',
        description: 'Warm, Vata-pacifying foods to embrace vs cold, gas-inducing foods to restrict.'
      },
      {
        title: 'Nutrition Guide for Breastfeeding Mothers',
        type: 'guide',
        pages: '14 Pages',
        description: 'Nutritional density, iron & calcium replenishment, and galactagogue ingredients.'
      }
    ]
  },
  {
    id: 'bundle-seyol-complete-master',
    slug: 'seyol-complete-pregnancy-to-newborn-resource-bundle',
    title: 'SEYOL Complete Pregnancy to Newborn Resource Bundle',
    tagline: 'The Ultimate All-in-One Digital Library (All 6 Paid Bundles Included)',
    description: 'Get instant lifetime access to the entire SEYOL digital library. Includes all 6 paid bundles (37 guides, workbooks, recipe e-books, checklists, and routine charts) covering your entire journey from early pregnancy through birth, confinement, and newborn care.',
    stage: 'all',
    price: 1299,
    originalPrice: 5694,
    currency: 'INR',
    isFree: false,
    isCompleteBundle: true,
    coverImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000',
    badge: 'Best Value • Save 77%',
    totalGuides: 37,
    format: 'Complete Digital Vault • 37 PDF Guides & Recipe Books',
    downloadSize: '155 MB',
    isFeatured: true,
    highlights: [
      'Includes ALL 6 comprehensive paid bundles',
      '37 high-resolution printable & digital guides',
      '50-recipe Confinement Cookery e-Book included',
      'Lifetime updates & permanent Care Portal access'
    ],
    inclusions: [
      {
        title: 'Newborn Care Starter Bundle (5 Guides)',
        type: 'ebook',
        pages: '56 Pages',
        description: 'First 30 days care, cord care, diaper hygiene, gentle swaddling, and cry soothing.'
      },
      {
        title: 'Baby Massage & Bath Bundle (6 Guides)',
        type: 'ebook',
        pages: '54 Pages',
        description: 'Traditional Indian baby massage, oil guide, bath routines, and water safety references.'
      },
      {
        title: 'Breastfeeding & Bottle Feeding Bundle (5 Guides)',
        type: 'ebook',
        pages: '48 Pages',
        description: 'Latching illustrated guide, nursing positions, pumping guide, and troubleshooting.'
      },
      {
        title: 'Birth Preparation Toolkit (6 Guides)',
        type: 'ebook',
        pages: '52 Pages',
        description: 'Hospital bag, birth plan template, labour stages, partner support, and acupressure points.'
      },
      {
        title: 'Pregnancy Comfort & Movement Bundle (7 Guides)',
        type: 'ebook',
        pages: '76 Pages',
        description: 'Prenatal massage, partner massage, trimester exercise, birth ball, and pelvic floor routines.'
      },
      {
        title: 'Postpartum Recovery & Confinement Bundle (8 Guides)',
        type: 'ebook',
        pages: '152 Pages',
        description: 'Sacred 40-day recovery timeline, 50-recipe e-book, belly binding, and lactation nutrition.'
      }
    ]
  }
];

export const resourcesData: ResourceItem[] = [
  {
    id: 'res-postpartum-confinement-guide',
    slug: 'the-sacred-40-days-confinement-guide',
    title: 'The Sacred 40 Days: Traditional South Indian Confinement Guide',
    type: 'free-guide',
    stage: 'postpartum',
    topic: 'Postpartum Recovery & Confinement Wisdom',
    description: 'A comprehensive, warm handbook breaking down week-by-week maternal recovery, healing herbal decoctions, emotional wellness, and setting restful boundaries.',
    pagesOrDuration: '36 Pages (PDF Download)',
    price: 0,
    currency: 'INR',
    downloadUrl: '#download-guide',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      'Day 1 to 40 step-by-step physical recovery timeline',
      'The 7 golden rules of traditional maternal warmth & Vata pacification',
      'Essential perineal & Caesarean scar care checklists',
      'Nutritious grocery list for your postpartum pantry'
    ],
    isFeatured: true
  },
  {
    id: 'res-hospital-bag-checklist',
    slug: 'essential-indian-hospital-bag-checklist',
    title: 'The Essential Indian Birth & Hospital Bag Checklist',
    type: 'printable-checklist',
    stage: 'pregnancy',
    topic: 'Birth Preparation',
    description: 'The ultimate zero-fluff packing list tailored for Indian hospital births — including traditional swaddles, mother care essentials, documentation, and partner comfort items.',
    pagesOrDuration: '4 Pages (Printable PDF)',
    price: 0,
    currency: 'INR',
    downloadUrl: '#download-checklist',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      'Categorised checklists for Labour Room, Postnatal Ward, and Baby Discharge',
      'Traditional items standard Western lists omit (cotton dhotis, herbal washables)',
      'Partner emergency essentials & snack toolkit'
    ],
    isFeatured: true
  },
  {
    id: 'res-newborn-sleep-feeding-log',
    slug: 'newborn-sleep-burping-feeding-tracker',
    title: 'First 100 Days: Daily Newborn Feeding, Diaper & Sleep Log',
    type: 'printable-checklist',
    stage: 'newborn',
    topic: 'Newborn Care & Routines',
    description: 'Clean, printable daily tracking sheets to help you observe feeding intervals, wet nappies, bowel movements, and wake windows without app-induced screen fatigue.',
    pagesOrDuration: '8 Pages (Printable PDF)',
    price: 0,
    currency: 'INR',
    downloadUrl: '#download-tracker',
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      'Clear wet/dirty nappy count indicator to monitor adequate hydration',
      'Breastfeeding side & pump volume logging sections',
      'Simple bedtime routine checklist'
    ]
  },
  {
    id: 'res-confinement-recipes-book',
    slug: 'traditional-confinement-recipe-handbook',
    title: 'Pathiya Samayal: 50 Traditional Healing Confinement Recipes',
    type: 'digital-workbook',
    stage: 'postpartum',
    topic: 'Nutrition & Milk Supply',
    description: 'Authentic South Indian medicinal recipes passed down across generations. Features delicious, easy-to-digest soups, legiyams, thogayals, and kootus crafted to stimulate lactation and calm digestion.',
    pagesOrDuration: '78 Pages (Full Colour eBook)',
    price: 499,
    currency: 'INR',
    downloadUrl: '#buy-ebook',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      '50 step-by-step traditional recipes with ingredient substitutes',
      'Garlic legiyam (Poondu Legiyam) preparation protocol',
      'Daily 7-day revolving meal planner for the 6-week confinement period',
      'Nutritional breakdowns verified by Ayurvedic nutritionists'
    ],
    isFeatured: true
  },
  {
    id: 'res-infant-massage-video-masterclass',
    slug: 'traditional-infant-massage-video-library',
    title: 'Traditional Infant Massage & Bath Video Masterclass Series',
    type: 'gated-video-masterclass',
    stage: 'newborn',
    topic: 'Practical Skills & Video Demos',
    description: 'Unlock our curated 6-part video library demonstration led by Ms Jemma Francis. Watch real-time high-definition stroke techniques, colic relief routines, and safe bathing steps.',
    pagesOrDuration: '6 HD Video Modules (75 Mins Total)',
    price: 0, // Gated via free email unlock
    currency: 'INR',
    gatedPlaylistId: 'playlist-infant-massage',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      'Chest, belly, back, and limb stroke sequences filmed in 4K',
      "Colic 'I Love U' and bicycle stroke demonstrations on baby",
      'Bathing hold ergonomics in traditional Indian seated posture',
      'Instant access upon entering your name and email'
    ],
    isFeatured: true
  },
  {
    id: 'res-gentle-birth-prep-workbook',
    slug: 'gentle-birth-preferences-and-labour-workbook',
    title: 'The Calm Birth Companion & Preferences Workbook',
    type: 'digital-workbook',
    stage: 'pregnancy',
    topic: 'Labour & Birth Planning',
    description: 'An interactive fillable PDF guiding you and your partner to articulate birth preferences, practice labour breathing scripts, and communicate confidently with obstetricians.',
    pagesOrDuration: '28 Pages (Fillable PDF Workbook)',
    price: 299,
    currency: 'INR',
    downloadUrl: '#buy-birth-workbook',
    coverImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600',
    previewPoints: [
      'Interactive modular Birth Preferences generator template',
      'Labour partner cheat-sheet with contraction timing prompts',
      'Vocal toning and diaphragmatic breathwork scripts'
    ]
  }
];

export const gatedVideosData: GatedVideo[] = [
  {
    id: 'video-1',
    title: 'Module 1: The Foundations of Traditional Infant Massage (Thokkanam)',
    duration: '14:20',
    category: 'Infant Massage',
    instructor: 'Ms Jemma Francis',
    thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Learn the optimal room temperature, warming cold-pressed SEY oil, establishing eye contact, and beginning gentle introductory strokes on baby’s chest.',
    keyTakeaways: [
      'Never massage a crying or overtired infant',
      'Warm oil between your palms first to avoid cold contact shock',
      'Observe baby’s cues: soft open hands signal calm reception'
    ]
  },
  {
    id: 'video-2',
    title: "Module 2: Colic & Gas Relief — The 'I Love U' Stroke and Bicycle Sequences",
    duration: '18:45',
    category: 'Digestive Comfort',
    instructor: 'Ms Jemma Francis',
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Watch step-by-step techniques to release trapped air in the ascending, transverse, and descending colon using gentle clockwise circular strokes.',
    keyTakeaways: [
      'Always stroke in clockwise motion following the natural digestive path',
      'Combine tummy massage with gentle knee-to-chest holds for 10 seconds',
      'Apply SEY Colic Roll-On around navel prior to massage'
    ]
  },
  {
    id: 'video-3',
    title: 'Module 3: Strengthening Baby’s Back, Spine & Neck Tone',
    duration: '12:10',
    category: 'Muscular Development',
    instructor: 'Ms Jemma Francis',
    thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Safe tummy time bodywork techniques that encourage neck holding, thoracic spine extension, and shoulder stability without straining baby.',
    keyTakeaways: [
      'Gentle sweeping strokes from nape of neck down towards buttocks',
      'Avoid direct pressure on the spinal vertebrae',
      'Use small rolled towel under baby’s chest during early tummy time'
    ]
  },
  {
    id: 'video-4',
    title: 'Module 4: Traditional Indian Newborn Bath (Kuli Ritual & Nalangu Maavu)',
    duration: '16:30',
    category: 'Bathing Rituals',
    instructor: 'Ms Janet Francis',
    thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Demonstrating the traditional seated leg-stretch bath hold, testing water warmth, washing with SEY Nalangu Maavu paste, and safe face rinsing.',
    keyTakeaways: [
      'How to support baby’s neck securely on your outstretched legs or forearm',
      'Washing sensitive skin folds under neck, armpits, and thighs without irritation',
      'Towel-drying and keeping baby warm immediately after bath'
    ]
  },
  {
    id: 'video-5',
    title: 'Module 5: Postpartum Belly Binding (Traditional Cotton Kattu Tutorial)',
    duration: '15:10',
    category: 'Mother Recovery',
    instructor: 'Ms Jemma Francis',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Learn the correct technique for applying traditional breathable cotton belly wraps from pelvic bone up to lower ribs to support diastasis recti recovery.',
    keyTakeaways: [
      'Wrap from bottom to top to encourage upwards pelvic organ support',
      'Binding should feel supportive like a gentle hug, never constrictive',
      'When to begin: 7 days post vaginal birth or 2–3 weeks post C-section'
    ]
  }
];
