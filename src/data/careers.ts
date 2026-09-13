import { CareerPathway, CaregiverPathwayItem, CaregiverInTrainingCourse } from '../types';

export const caregiverPathwaysList: CaregiverPathwayItem[] = [
  {
    id: 'pathway-1-foundation',
    title: 'I’m New to Confinement Care',
    subtitle: 'Foundation Care Training Pathway',
    tagline: 'Start learning traditional maternal & newborn care from the ground up',
    targetAudience: 'For applicants who are new to confinement care and want to start learning from the basics.',
    badge: 'Foundation Training Track',
    hasCertification: false,
    hasExperience: false,
    courseId: 'course-foundation',
    icon: '🌱',
    summary: 'A supportive, foundational curriculum that introduces you to neonatal handling, gentle hygiene, traditional maternal nourishment, and the emotional transitions of fourth-trimester families.',
    keyBenefits: [
      'Learn core newborn handling & safe sleep routines',
      'Understand postpartum warmth & healing nutrition basics',
      'Mentorship from senior matrons with over 20 years experience',
      'Pathway to guaranteed SEYOL trainee placements upon course completion'
    ]
  },
  {
    id: 'pathway-2-practical',
    title: 'I Have Certification but Need Experience',
    subtitle: 'Practical Care Training Pathway',
    tagline: 'Bridging classroom knowledge into confident household hands-on practice',
    targetAudience: 'For applicants who have completed a course or certification related to confinement care and want to build more hands-on practice.',
    badge: 'Practicum & Hands-On Track',
    hasCertification: true,
    hasExperience: false,
    courseId: 'course-practical',
    icon: '🩺',
    summary: 'Designed for certified nurses, mid-career graduates, and course-certified nannies who need supervised family practicum hours, traditional herbal bath practice, and client dynamic coaching.',
    keyBenefits: [
      'Supervised clinical dummy & real-home observation hours',
      'Advanced baby massage (Thokkanam) & belly binding (Kattu) mastery',
      'Lactation trouble-shooting & night support routine management',
      'Priority onboarding to active SEYOL client assignments in Singapore & Malaysia'
    ]
  },
  {
    id: 'pathway-3-experienced',
    title: 'I Have Experience but No Certification',
    subtitle: 'Experienced Care Provider Pathway',
    tagline: 'Validate your rich years of practical caregiving with accredited credentials',
    targetAudience: 'For applicants who already have hands-on care experience but do not have formal certification.',
    badge: 'Prior Experience Fast-Track',
    hasCertification: false,
    hasExperience: true,
    icon: '👩‍👧',
    summary: 'Tailored for experienced home confinement nannies, family matrons, and self-taught postnatal caregivers. We recognize your practical wisdom and provide fast-track assessment to certify your credentials.',
    keyBenefits: [
      'Fast-track skills verification and competency assessment',
      'Standardized modern hygiene & neonatal emergency updates',
      'Official SEYOL Care Provider credential recognized in Singapore & Malaysia',
      'Higher client matching rates and verified professional insurance'
    ]
  },
  {
    id: 'pathway-4-professional',
    title: 'I Have Experience and Certification',
    subtitle: 'Professional Care Provider Pathway',
    tagline: 'Direct evaluation and onboarding for elite confinement assignments',
    targetAudience: 'For experienced and certified care providers who are ready to be assessed for possible SEYOL care opportunities.',
    badge: 'Direct Assessment & Placement',
    hasCertification: true,
    hasExperience: true,
    icon: '🏆',
    summary: 'Direct onboarding for seasoned postnatal professionals, doulas, and certified confinement matrons ready to take on premium stay-in and daytime care assignments across Singapore, Malaysia, and India.',
    keyBenefits: [
      'Expedited 48-hour interview screening and background onboarding',
      'Top-tier remuneration packages (SGD $3,200 – $4,800+ / MYR RM8,500 – RM14,000+ / INR ₹60,000 – ₹1,00,000+)',
      'Dedicated concierge support, travel clearance, and respectful household matching',
      'Full coverage under SEYOL caregiver welfare & insurance protection'
    ]
  }
];

export const inTrainingCoursesData: CaregiverInTrainingCourse[] = [
  {
    id: 'course-foundation',
    pathwayId: 'pathway-1-foundation',
    title: 'Foundation Confinement Care Training',
    subtitle: 'Pathway 1 Entry Program • 6 Weeks (Hybrid: Virtual Theory + Studio Practicum)',
    duration: '6 Weeks (30 Hours Theory + 20 Hours Simulation Lab)',
    mode: 'Hybrid: Online Interactive Modules + Studio Simulation Practicum',
    qualification: 'SEYOL Foundation Confinement Care Certificate',
    prerequisites: 'Open to all compassionate individuals with enthusiasm to learn maternal-infant care. No prior nursing or medical degree required.',
    summary: 'A structured, beginner-friendly immersion into the fundamentals of fourth-trimester maternal care, newborn biology, soothing crying babies, traditional warmth preservation, and compassionate communication.',
    curriculum: [
      {
        title: 'Module 1: The First 30 Days of Mother & Baby',
        topics: [
          'Understanding physical postpartum recovery (uterus involution, lochia, scar care)',
          'Newborn sensory cues, sleep intervals, and hunger benchmarks',
          'Hygiene and cross-contamination prevention in family homes'
        ]
      },
      {
        title: 'Module 2: Essential Newborn Handling & Safe Bathing',
        topics: [
          'Umbilical cord hygiene, sponge bathing, and seated leg-stretch bath ergonomics',
          'Hip-healthy swaddling techniques and startle reflex management',
          'Diapering, diaper rash soothing, and temperature monitoring'
        ]
      },
      {
        title: 'Module 3: Introduction to Confinement Nourishment',
        topics: [
          'Principles of warm, easily digestible confinement meals',
          'Hydration, herbal broths, and foods that promote gentle recovery',
          'Kitchen hygiene and dietary preference management for modern mothers'
        ]
      },
      {
        title: 'Module 4: Client Communication & Household Professionalism',
        topics: [
          'Respecting family boundaries and privacy in nuclear homes',
          'Active listening, empathy, and calming parental anxiety',
          'Emergency escalation protocols and pediatrician referral guidelines'
        ]
      }
    ],
    outcomes: [
      'Master essential daily newborn routines and safe holding postures',
      'Understand foundational South Indian & Asian confinement care philosophy',
      'Eligibility to proceed to Practical Clinical Training and SEYOL trainee placements'
    ]
  },
  {
    id: 'course-practical',
    pathwayId: 'pathway-2-practical',
    title: 'Practical Confinement Care Training',
    subtitle: 'Pathway 2 Practicum Program • 4 Weeks Intensive Hands-On + Supervised Shadowing',
    duration: '4 Weeks (20 Hours Advanced Labs + 40 Hours Supervised Shadowing)',
    mode: 'In-Person Clinical Lab + Shadow Placement with Senior SEYOL Matrons',
    qualification: 'SEYOL Advanced Practical Confinement Care Certificate (CPCS-Practicum)',
    prerequisites: 'Completion of a relevant nursing course, confinement certification, or SEYOL Foundation Course.',
    summary: 'An intensive, hands-on clinical and household practicum designed to refine your stroke techniques, troubleshoot complex feeding issues, manage demanding night routines, and master traditional herbal preparations.',
    curriculum: [
      {
        title: 'Module 1: Advanced Infant Bodywork & Traditional Bath Rituals',
        topics: [
          'Full-body infant massage (Thokkanam) stroke rhythms and pressure modulation',
          'Colic, trapped gas, and reflux release sequences (I-Love-U & bicycle strokes)',
          'Traditional herbal ubtan (Nalangu Maavu) application and safe head washing'
        ]
      },
      {
        title: 'Module 2: Maternal Herbal Care & Traditional Belly Binding',
        topics: [
          'Postpartum herbal oil massage techniques for back, neck, and leg tension',
          'Traditional breathable cotton belly binding (Kattu) from pelvic bone to ribs',
          'Herbal compress (Kizhi) and warm fomentation safety protocols'
        ]
      },
      {
        title: 'Module 3: Complex Feeding Support & Night Care Ergonomics',
        topics: [
          'Hands-on latch positioning assistance and paced bottle feeding',
          'Pumping schedules, safe breastmilk storage, and sterilisation workflows',
          'Organising restful night care routines so parents achieve restorative sleep'
        ]
      },
      {
        title: 'Module 4: Traditional Medicinal Confinement Cookery',
        topics: [
          'Preparing authentic healing soups, garlic legiyams, thogayals, and kootus',
          'Customising menus for maternal dietary restrictions, vegetarian, and C-section healing',
          'Pantry organisation and efficient meal batching protocols'
        ]
      }
    ],
    outcomes: [
      'Confidently execute complete daily mother and newborn care protocols',
      'Earn SEYOL Gold-Standard Practicum verification badge',
      'Immediate placement on the active SEYOL Caregiver Roster in Singapore & Malaysia'
    ]
  }
];

export const careerPathwaysData: CareerPathway[] = [
  {
    id: 'career-confinement-specialist',
    title: 'Certified Postnatal Confinement Care Specialist (CPCS)',
    qualification: 'SEYOL Certified Confinement Matron & Postnatal Specialist',
    commitment: '8 Weeks (Hybrid: 40h Theory + 60h Hands-On Clinical Practicum)',
    mode: 'In-Person Practicum (Chennai) with Virtual Theory Modules',
    summary: 'Our flagship professional training program preparing compassionate women to deliver gold-standard traditional Indian postnatal care, maternal nutrition, and newborn handling in modern family households.',
    whoItIsFor: 'Nurses, mid-career caregivers, traditional birth workers, and women passionate about professionalising traditional postpartum care with certified hygiene and neonatal safety standards.',
    modules: [
      {
        title: 'Module 1: Maternal Physiological Postpartum Recovery',
        topics: [
          'Uterine involution, lochia stages, and pelvic floor anatomy',
          'Vaginal tear healing & Caesarean wound hygiene protocols',
          'Postpartum red flags: detecting infection, haemorrhage, and DVT'
        ]
      },
      {
        title: 'Module 2: Traditional Postnatal Bodywork & Belly Binding',
        topics: [
          'Full-body maternal massage strokes using Dhanwantharam herbal oils',
          'Uterine abdominal massage techniques & hot herbal fomentation (Kizhi)',
          'Traditional cotton bengkung & South Indian Kattu belly binding methods'
        ]
      },
      {
        title: 'Module 3: Traditional Confinement Nutrition & Cooking',
        topics: [
          'Principles of Pathiya Samayal (herbal, easy-to-digest confinement diet)',
          'Preparing therapeutic decoctions (Kashayam), herbal teas, and legiyams',
          'Nutritional support for lactation enhancement and infant colic prevention'
        ]
      },
      {
        title: 'Module 4: Newborn Care, Hygiene & Infant Massage',
        topics: [
          'Traditional infant massage strokes (Thokkanam) and safe bath hold (Kuli)',
          'Umbilical cord hygiene, diaper rash prevention, and cradle cap care',
          'Safe sleep guidelines, burping mechanics, and colic soothing'
        ]
      },
      {
        title: 'Module 5: Household Integration & Professional Ethics',
        topics: [
          'Respectful communication in modern nuclear family dynamics',
          'Client confidentiality, personal hygiene, and emotional boundary management',
          'Emergency escalation protocols'
        ]
      }
    ],
    careerOpportunities: [
      'Guaranteed placement on the SEYOL Stay-In & In-Home Confinement Roster (Earning ₹45,000 to ₹80,000+ per month)',
      'Independent practice as a Certified Postnatal Confinement Specialist in India or overseas',
      'Continuous mentorship and ongoing professional insurance coverage through SEYOL'
    ],
    certificationBadge: 'SEYOL Certified Confinement Matron (CPCS)'
  },
  {
    id: 'career-postpartum-doula',
    title: 'Certified Postpartum Doula & Maternal Wellness Educator (CPD)',
    qualification: 'SEYOL Certified Postpartum Doula',
    commitment: '6 Weeks (Virtual Masterclasses + 3 Supervised Family Placements)',
    mode: 'Live Interactive Online + Local Mentorship Practicum',
    summary: 'Equipping doulas with emotional coaching skills, evidence-based lactation guidance, maternal mental health screening, and family transition mentorship.',
    whoItIsFor: 'Birth doulas, yoga teachers, childbirth educators, and healthcare professionals wanting to expand into dedicated fourth-trimester postpartum support.',
    modules: [
      {
        title: 'Module 1: Emotional Transitions & Postpartum Mental Health',
        topics: [
          'Distinguishing "Baby Blues" from Postpartum Depression, Anxiety & OCD',
          'Edinburgh Postnatal Depression Scale (EPDS) administration',
          'Trauma-informed birth debriefing and listening modalities'
        ]
      },
      {
        title: 'Module 2: Evidence-Based Lactation & Infant Feeding',
        topics: [
          'Assessing latch depth, milk transfer, and infant oral tethering',
          'Troubleshooting sore nipples, engorgement, vasospasm, and mastitis',
          'Supporting combo-feeding, pumping logistics, and milk storage'
        ]
      },
      {
        title: 'Module 3: Family Systems & Partner Empowerment',
        topics: [
          'Coaching partners to actively support mother’s recovery',
          'Managing extended family expectations with cultural sensitivity',
          'Nurturing mother-baby attachment and co-regulation'
        ]
      }
    ],
    careerOpportunities: [
      'Join SEYOL’s elite Doula Network for private client referrals',
      'Provide private 1-on-1 virtual and in-home postpartum doula packages',
      'Host community parent support circles and postpartum workshops'
    ],
    certificationBadge: 'SEYOL Certified Postpartum Doula (CPD)'
  },
  {
    id: 'career-infant-massage-instructor',
    title: 'Certified Infant Massage & Touch Educator (CIME)',
    qualification: 'SEYOL Infant Massage Instructor & Touch Specialist',
    commitment: '4 Weeks (20h Interactive Theory + 10h Parent Practicum Teaching)',
    mode: 'Hybrid (Interactive Live Online + Video Exam Assessment)',
    summary: 'Learn to teach parents the sacred art of infant massage, neurological stimulation, and digestive comfort through structured workshops and private clinics.',
    whoItIsFor: 'Paediatric nurses, occupational therapists, early childhood educators, and mothers wanting a flexible, fulfilling career teaching infant massage.',
    modules: [
      {
        title: 'Module 1: Infant Sensory & Neurological Development',
        topics: [
          'The vital role of skin-to-skin touch and tactile stimulation',
          'Neurological reflexes, tone assessment, and infant behavioural cues',
          'Safe oil selection, skin barrier science, and patch testing'
        ]
      },
      {
        title: 'Module 2: Stroke Choreography & Therapeutic Routines',
        topics: [
          'Mastering the full-body Indian Thokkanam massage sequence',
          'Specialised colic, constipation, and reflux relief routines',
          'Adapting massage for premature infants and children with special needs'
        ]
      },
      {
        title: 'Module 3: Group Facilitation & Workshop Pedagogy',
        topics: [
          'Teaching adult learners using demonstration dolls (doll-to-doll method)',
          'Setting up a calm, sensory-friendly workshop environment',
          'Building your private infant massage studio and class marketing'
        ]
      }
    ],
    careerOpportunities: [
      'Certified to host SEYOL-affiliated Baby Massage Workshops in your city',
      'Offer private in-home parent coaching sessions',
      'Collaborate with maternity hospitals, paediatric clinics, and wellness centres'
    ],
    certificationBadge: 'SEYOL Certified Infant Massage Instructor (CIME)'
  }
];
