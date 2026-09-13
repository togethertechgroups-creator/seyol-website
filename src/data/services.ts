import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'preconception-care',
    slug: 'preconception-support',
    title: 'Preconception Nurturing & Preparation',
    shortTitle: 'Preconception Support',
    tagline: 'Cultivating bodily harmony, uterine nourishment, and emotional readiness for conception.',
    stages: ['preconception'],
    category: 'clinical-tradition',
    summary: 'A holistic preconception programme blending traditional Siddha and Ayurvedic uterine tonification with evidence-based fertility guidance, cycle awareness, and emotional grounding.',
    benefit: 'Prepares the pelvic basin, balances vital doshas, and nurtures vitality prior to conception.',
    bestFor: 'Couples planning to conceive naturally or preparing for assisted reproductive journeys (IUI/IVF) wanting holistic bodily preparation.',
    recommendedTimeline: '3 to 6 months prior to planned conception.',
    duration: '60-minute Initial Consultation + 4-Week Custom Protocol',
    format: 'Virtual & Hybrid',
    pricingGuide: 'From ₹4,500 for Comprehensive Consultation & Protocol',
    depositInfo: '₹1,500 advance booking confirmation.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Comprehensive reproductive vitality assessment',
      'Traditional uterine warming herbal recommendations',
      'Customised fertility nutrition and lifestyle roadmap',
      'Pelvic floor gentle restorative guidance & stress reduction',
      'Partner alignment & complementary male vitality guidance'
    ],
    inclusions: [
      '1x 75-min deep-dive consultation with senior SEYOL practitioner',
      'Personalised 4-week nutritional & traditional lifestyle plan',
      'Digital fertility journal & basal temperature tracking guide',
      'Direct WhatsApp check-in access for 30 days'
    ],
    preparation: [
      'Complete the confidential health questionnaire 24 hours prior',
      'Have any recent blood work or medical fertility reports ready for review',
      'Choose a quiet, comfortable space for your virtual or in-clinic session'
    ],
    contraindications: [
      'Acute reproductive infections currently under active antibiotic treatment',
      'Uninvestigated severe pelvic pain requiring urgent medical ultrasound'
    ],
    faqIds: ['faq-preconception-1', 'faq-preconception-2'],
    testimonials: ['testimonial-preconception-1'],
    relatedClassIds: ['class-postpartum-prep', 'class-birth-prep'],
    relatedProductIds: ['product-restorative-oil']
  },
  {
    id: 'prenatal-massage',
    slug: 'prenatal-massage-therapy',
    title: 'Prenatal Massage',
    shortTitle: 'Prenatal Massage',
    tagline: 'Indulge in our exceptional prenatal massage for unparalleled relaxation and holistic nurturing.',
    stages: ['pregnancy'],
    category: 'hands-on-care',
    summary: 'Indulge in our exceptional prenatal massage for unparalleled relaxation and holistic nurturing. As you journey through pregnancy, we create a tranquil oasis prioritizing your comfort. Through expert touch and understanding of the pregnant body, find respite for tension and a celebration of the intimate bond with your unborn child.',
    benefit: 'Alleviates pregnancy stress, boosts circulation, enhances labor outcomes, eases depression, and increases flexibility.',
    bestFor: 'Expectant mothers after 14–16 weeks looking for holistic tension relief, improved sleep, and bodily comfort.',
    recommendedTimeline: 'You can typically start after around 14-16 weeks.',
    duration: '1 Hour per session',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: '₹2,800 per session | Package options available',
    depositInfo: 'Full payment upon booking confirmation.',
    heroImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Alleviating Pregnancy Stress - Amidst hormonal shifts, morning discomforts, and bodily strains, our massages provide a serene relief, addressing both mind and body stress',
      'Boosted Circulation - Prenatal massage eases blood flow, aiding the removal of pooled blood and lactic acid build-up, enhancing muscle oxygenation during pregnancy',
      'Enhanced Labor - Prenatal massage mitigates stress impact on outcomes by balancing hormones, reducing depression, and promoting relaxation, ultimately improving labor experiences',
      'Alleviate Depression - Prenatal massage stimulates muscles and nerves, increasing dopamine and serotonin levels to reduce depression symptoms',
      'Increased Flexibility - Massage can increase flexibility and range of motion by loosening tight hip muscles, offering comfort and the ability to assume diverse birthing positions'
    ],
    inclusions: [
      'Full-Body Oil Massage: A harmonious blend of skilled techniques and carefully chosen oils to provide a deeply rejuvenating experience',
      'Complete muscle tension release, circulation enhancement, and deep mental unwinding',
      'Ergonomic bolster cushioning tailored for side-lying comfort and maternal safety',
      'All authentic organic botanical pregnancy oils and sanitised linens'
    ],
    preparation: [
      'You can typically start after around 14-16 weeks of gestation',
      'Eat a light meal 1 hour prior to your session',
      'Ensure a peaceful, warm room with space for our treatment setup'
    ],
    contraindications: [
      'First trimester (weeks 1–13) without explicit obstetrician clearance',
      'Uncontrolled gestational hypertension or active spotting'
    ],
    faqIds: ['faq-prenatal-1', 'faq-prenatal-2'],
    testimonials: ['testimonial-prenatal-1'],
    relatedClassIds: ['class-prenatal-movement', 'class-birth-prep'],
    relatedProductIds: ['product-restorative-oil', 'product-bath-sachet']
  },
  {
    id: 'birth-doula-support',
    slug: 'birth-doula-support',
    title: 'Compassionate Birth Doula & Labour Support',
    shortTitle: 'Birth Doula Support',
    tagline: 'Continuous emotional, physical, and informational presence throughout labour and delivery.',
    stages: ['pregnancy', 'birth'],
    category: 'specialist-support',
    summary: 'Dedicated continuous support from certified birth doulas. We stand beside you and your birth partner, offering counter-pressure, breath coaching, posture positioning, and advocacy for an empowered birth experience.',
    benefit: 'Reduces anxiety, decreases the likelihood of unnecessary interventions, and empowers partners with confident support tools.',
    bestFor: 'Couples planning for normal physiological birth, VBAC (Vaginal Birth After Caesarean), or seeking calm advocacy in hospital settings.',
    recommendedTimeline: 'Book early during the second trimester (between 16 and 28 weeks).',
    duration: '2 Prenatal Visits + On-Call 24/7 from 37 Weeks + Labour Support + 2 Postpartum Visits',
    format: 'In-Clinic / In-Home',
    pricingGuide: 'Comprehensive Doula Package: ₹35,000',
    depositInfo: '50% retainer upon contract signing; balance due at 37 weeks.',
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    features: [
      '2 detailed in-home prenatal birth mapping and comfort sessions',
      'Dedicated on-call availability 24/7 starting from 37 weeks of pregnancy',
      'Continuous bedside support from active labour through golden hour bonding',
      'Non-pharmacological pain management: Rebozo techniques, acupressure points, and positioning',
      'In-home postpartum debrief and newborn feeding support visit'
    ],
    inclusions: [
      'Personalised Birth Preference Document creation',
      'Partner labour coaching toolkit',
      'Unlimited phone, text, and email guidance from booking date',
      'Golden hour breastfeeding establishment assistance'
    ],
    preparation: [
      'Schedule your initial chemistry consultation with our doula team',
      'Confirm hospital visitor and doula entry guidelines with your obstetrician'
    ],
    contraindications: [
      'High-risk emergency obstetric conditions where hospital mandates only surgical team access'
    ],
    faqIds: ['faq-doula-1', 'faq-doula-2'],
    testimonials: ['testimonial-doula-1'],
    relatedClassIds: ['class-birth-prep', 'class-partner-prep'],
    relatedProductIds: ['product-restorative-oil']
  },
  {
    id: 'postpartum-massage-wrap',
    slug: 'postpartum-massage-and-wrap',
    title: 'Postpartum Massage & Wrap',
    shortTitle: 'Postpartum Massage & Wrap',
    tagline: 'Experience ultimate relaxation and support in motherhood with our expertly crafted services.',
    stages: ['postpartum'],
    category: 'hands-on-care',
    summary: 'Experience ultimate relaxation and support in motherhood with our expertly crafted services. Skilled practitioners offer soothing touch and specialized wraps for enhanced physical recovery, emotional well-being, and overall vitality. Let us support you during this precious time, embracing the joys of motherhood with renewed energy and serenity.',
    benefit: 'Alleviates swelling, enhances milk supply, balances hormones, relieves anxiety & depression, enhances sleep quality, and provides abdominal healing.',
    bestFor: 'Mothers seeking authentic traditional postpartum healing, full-body rejuvenation, abdominal support, and lactation alignment.',
    recommendedTimeline: 'You can typically start 4-5 days after normal delivery or 5-7 days after caesarean section.',
    duration: '1 Hour (or 1 Hour 30 Mins with Bath Add-On)',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: 'Available in 10, 15, 20, 30, 40, and 60 session packages',
    depositInfo: '20% advance booking deposit.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Alleviate Swelling - Postpartum massage aids in redistributing body fluids, promoting drainage, and enhancing circulation, effectively reducing post-labor swelling.',
      'Enhanced Milk Supply - Massage boosts circulation and hormone production, aiding nursing mothers in achieving increased breast milk production.',
      'Balancing Hormones - Postpartum massage with herbal oils helps stabilize fluctuating hormones, promoting a positive mood and hormonal equilibrium.',
      'Relief from Anxiety and Depression - Massage alleviates stress, reducing feelings of anxiety and postpartum depression commonly experienced by new mothers.',
      'Enhanced Sleep Quality - Massage facilitates relaxation, preparing new mothers for rejuvenating, deep sleep essential for their recovery.',
      'Postpartum Abdominal Binding - Supports healing from pelvic separation, eases muscle tension, reduces fluid retention, and eliminates the post-childbirth "emptiness."'
    ],
    inclusions: [
      'Full-Body Oil Massage: Soothing touch with aromatic herbal oils from head to toe',
      'Specialized Abdominal Wrap: Gentle compression and support to the abdominal area aiding healing and core stability',
      'Daily holistic recovery check-in and maternal emotional reassurance',
      'Authentic herbal formulations tailored for postnatal vitality'
    ],
    preparation: [
      'You can typically start 4-5 days after normal delivery or 5-7 days after caesarean section',
      'Ensure a warm, comfortable room with access to warm water',
      'Feed the baby just prior to session start so mother can relax fully'
    ],
    contraindications: [
      'Active fever or acute postpartum pelvic infection',
      'Unhealed surgical wound with active dehiscence or unmonitored severe bleeding'
    ],
    faqIds: ['faq-postpartum-1', 'faq-postpartum-2'],
    testimonials: ['testimonial-postpartum-1', 'testimonial-postpartum-2'],
    relatedClassIds: ['class-postpartum-prep', 'class-nourishment'],
    relatedProductIds: ['product-restorative-oil', 'product-bath-sachet']
  },
  {
    id: 'infant-massage-bath',
    slug: 'infant-massage-and-bath',
    title: 'Gentle Infant Massage & Traditional Bath (Thokkanam & Kuli)',
    shortTitle: 'Infant Massage & Bath',
    tagline: 'Expert newborn bodywork, rhythmic stroke sequences, and calming traditional bath routines.',
    stages: ['newborn', 'postpartum'],
    category: 'hands-on-care',
    summary: 'Administered by compassionate, gentle baby care specialists. Includes traditional Indian infant massage (Thokkanam) using cold-pressed almond and sesame oils, followed by gentle limb stretching and soothing warm bath.',
    benefit: 'Improves baby sleep patterns, aids weight gain, alleviates colic and trapped wind, and promotes neurological sensory development.',
    bestFor: 'Newborns from 2 weeks of age through their first year.',
    recommendedTimeline: 'Daily for the first 3 to 6 months of life.',
    duration: '45 minutes per session (Daily or Custom Packages)',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: '15-Day Package: ₹12,000 | 30-Day Package: ₹22,000',
    depositInfo: '₹3,000 reservation deposit.',
    heroImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Slow, rhythmic therapeutic strokes that calm the nervous system',
      "Gentle abdominal 'I Love U' and bicycle strokes for colic and gas release",
      'Upper and lower limb gentle range-of-motion flexibility routines',
      'Traditional safe head and body bath using hypoallergenic herbal green gram powder',
      'Parent co-learning: we teach parents how to massage their baby with confidence'
    ],
    inclusions: [
      'Certified infant care specialist with verified background and health checks',
      'SEY cold-pressed organic baby massage oils and gentle herbal bath powder',
      'Umbilical cord hygiene monitoring and cradle cap care guidance'
    ],
    preparation: [
      'Ensure baby was fed 30–45 minutes prior (never immediately after a full feed)',
      'Prepare warm water and a clean, soft cotton towel',
      'Keep the room warm and quiet'
    ],
    contraindications: [
      'Active fever or immediate 48-hour window following routine vaccinations',
      'Acute skin rashes or weeping eczema requiring dermatological prescription',
      'Open umbilical granuloma before proper healing'
    ],
    faqIds: ['faq-baby-1', 'faq-baby-2'],
    testimonials: ['testimonial-baby-1'],
    relatedClassIds: ['class-baby-massage', 'class-newborn-essentials'],
    relatedProductIds: ['product-soothing-baby-oil', 'product-bath-powder', 'product-tummy-roll-on']
  },
  {
    id: 'mother-baby-combo',
    slug: 'mother-and-baby-combo-packages',
    title: 'Complete Mother & Baby Postpartum Combo',
    shortTitle: 'Mother & Baby Combo',
    tagline: 'Our flagship integrated confinement care — nurturing mother and baby side by side in harmony.',
    stages: ['postpartum', 'newborn'],
    category: 'hands-on-care',
    summary: 'The ultimate signature SEYOL experience. A coordinated dual session where mother receives full restorative bodywork, uterine massage, herbal bath, and belly binding, while baby receives gentle infant massage and warm bath.',
    benefit: 'Saves time, synchronises mother-baby sleep schedules, and provides total peace of mind for the entire household.',
    bestFor: 'Families wanting all-inclusive daily hands-on care for both mother and newborn without managing multiple providers.',
    recommendedTimeline: 'Book prior to birth for 15, 21, 28, or 40 days starting from week 1 or 2.',
    duration: '2 to 2.5 Hours Daily (Coordinated Care)',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: '21-Day Complete Dual Care: ₹58,000 | 30-Day Royal Care: ₹78,000',
    depositInfo: '₹8,000 advance booking fee to lock preferred care matrons.',
    heroImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Two dedicated care specialists or one senior dual-certified SEYOL matron',
      'Simultaneous or sequential mother and baby traditional routines',
      'Lactation latch check and feeding positioning guidance every session',
      'Complete supply of all SEY postpartum and newborn herbal oils',
      'Weekly progress review by SEYOL clinical supervisor'
    ],
    inclusions: [
      'Full mother postpartum recovery treatment & belly binding daily',
      'Full newborn massage, bath, and tummy relief sequence daily',
      'Complimentary SEY Postpartum Care Gift Box (worth ₹3,800)',
      'Direct line to SEYOL senior lactation and recovery consultants'
    ],
    preparation: [
      'Discuss delivery date with our care coordinator upon booking',
      'Set aside clean towels, bathing buckets, and a warm quiet room'
    ],
    contraindications: [
      'Standard clinical contraindications apply to mother or baby as noted individually'
    ],
    faqIds: ['faq-combo-1', 'faq-postpartum-1'],
    testimonials: ['testimonial-combo-1', 'testimonial-postpartum-2'],
    relatedClassIds: ['class-postpartum-prep', 'class-baby-massage', 'class-breastfeeding-basics'],
    relatedProductIds: ['product-soothing-baby-oil', 'product-restorative-oil', 'product-bath-powder']
  },
  {
    id: 'confinement-nanny',
    slug: 'stay-in-confinement-nanny-support',
    title: '24/7 Stay-In Confinement Nanny Care',
    shortTitle: 'Stay-In Confinement Nanny',
    tagline: 'Expert, compassionate round-the-clock postpartum and newborn guidance in the comfort of your home.',
    stages: ['postpartum', 'newborn'],
    category: 'nanny-confinement',
    summary: 'Our trained, background-verified confinement nannies reside with your family to oversee newborn night feeds, mother’s nutritious confinement meal preparation, hygiene routines, and peaceful household flow.',
    benefit: 'Allows new parents to achieve restorative night sleep while ensuring the highest hygiene and traditional confinement care.',
    bestFor: 'Nuclear families, first-time parents, or mothers recovering without local family assistance.',
    recommendedTimeline: 'Reserve 3 to 5 months before due date (limited monthly intakes).',
    duration: '28 Days or 40 Days (24/7 Stay-In with scheduled rest breaks)',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: '28-Day Stay-In: ₹75,000 | 40-Day Traditional Mandalam: ₹105,000',
    depositInfo: '20% deposit required upon confirmation.',
    heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Strictly vetted, police-verified, and health-screened SEYOL trained nannies',
      'Night-time baby burping, soothing, and diapering to ensure mother sleeps',
      'Nutritious traditional confinement cooking supporting digestion and milk supply',
      'Baby laundry, bottle sterilisation, and nursery sanitation',
      'Respectful, non-intrusive family integration'
    ],
    inclusions: [
      'Dedicated stay-in care provider',
      'Daily record keeping of baby feeding, sleeping, and wet/dirty nappies',
      'Ongoing weekly quality check-ins from SEYOL management'
    ],
    preparation: [
      'Provide private sleeping quarters and meals for the stay-in nanny',
      'Pre-placement video call with the prospective nanny 2 weeks prior'
    ],
    contraindications: [
      'Homes where safety protocols or reasonable rest periods cannot be provided'
    ],
    faqIds: ['faq-nanny-1', 'faq-nanny-2'],
    testimonials: ['testimonial-nanny-1'],
    relatedClassIds: ['class-newborn-essentials', 'class-nourishment'],
    relatedProductIds: ['product-tummy-roll-on', 'product-nourishing-baby-oil']
  },
  {
    id: 'hourly-newborn-support',
    slug: 'hourly-newborn-support',
    title: 'Flexible Hourly Newborn & Respite Support',
    shortTitle: 'Hourly Newborn Support',
    tagline: 'Flexible day or night blocks by trained neonatal care aides to give parents essential rest.',
    stages: ['newborn', 'postpartum'],
    category: 'specialist-support',
    summary: 'On-demand daytime or overnight blocks (4 to 8 hours) providing experienced hands to soothe, feed, and care for baby while parents rest, shower, or manage work commitments.',
    benefit: 'Targeted support without the commitment of a full stay-in arrangement.',
    bestFor: 'Parents needing occasional night sleep relief, weekend assistance, or structured daytime nursery support.',
    recommendedTimeline: 'Available on-demand or pre-scheduled blocks across the first 6 months.',
    duration: '4-Hour, 6-Hour, or 8-Hour Blocks (Day or Night)',
    format: 'In-Home (Chennai / Tamil Nadu)',
    pricingGuide: '₹550 / hour (minimum 4-hour booking) | 50-Hour Flexi Pass: ₹24,500',
    depositInfo: 'Advance booking of 48 hours required.',
    heroImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Gentle soothing, burping, swaddling, and wake window management',
      'Expressed milk or formula feeding according to parent guidelines',
      'Sterilisation of pump parts, bottles, and nursery tidying',
      "Assistance during fussy evening colic hours (the 'witching hour')",
    ],
    inclusions: [
      'Trained and certified newborn care specialist',
      'Digital shift summary log of feedings, sleep, and diaper counts'
    ],
    preparation: [
      'Provide instructions on preferred soothing methods and feed supplies',
      'Ensure baby supplies are readily accessible'
    ],
    contraindications: [
      'Medical emergencies or unmonitored complex clinical conditions'
    ],
    faqIds: ['faq-hourly-1'],
    testimonials: ['testimonial-hourly-1'],
    relatedClassIds: ['class-newborn-essentials'],
    relatedProductIds: ['product-tummy-roll-on']
  },
  {
    id: 'lactation-support',
    slug: 'lactation-and-breastfeeding-support',
    title: 'Clinical & Gentle Lactation Consultation',
    shortTitle: 'Lactation Support',
    tagline: 'Empathetic, evidence-informed guidance for comfortable latches, milk supply, and feeding confidence.',
    stages: ['postpartum', 'newborn'],
    category: 'specialist-support',
    summary: 'One-on-one consultations led by certified lactation educators. We evaluate oral anatomy, tongue tie concerns, latch mechanics, breast engorgement, mastitis prevention, and low or over-supply management.',
    benefit: 'Resolves nipple pain quickly, boosts maternal confidence, and ensures optimal infant weight gain.',
    bestFor: 'Mothers experiencing painful latches, cracked nipples, low milk supply, engorgement, or transitioning back to work.',
    recommendedTimeline: 'Within the first 48 hours of arriving home, or whenever feeding challenges arise.',
    duration: '90-minute Initial In-Home / Clinic Visit + 7 Days WhatsApp Support',
    format: 'In-Clinic / In-Home',
    pricingGuide: 'Initial Comprehensive Consultation: ₹3,200 | Follow-up: ₹1,800',
    depositInfo: '₹1,000 deposit upon booking.',
    heroImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Comprehensive pre- and post-feed weighted assessment where appropriate',
      'Deep assessment of latch asymmetry, positioning, and suck rhythm',
      'Hands-on guidance for biological nurturing and laid-back nursing positions',
      'Therapeutic lymphatic breast massage for engorgement and blocked ducts',
      'Personalised pumping schedule and return-to-work milk storage plan'
    ],
    inclusions: [
      'Written custom feeding plan delivered within 12 hours',
      'Video demonstration links for hand expression and breast massage',
      '7 days of daily WhatsApp check-in and feeding photo/video reviews'
    ],
    preparation: [
      'Schedule session around a planned feeding time so baby is hungry upon arrival',
      'Have your breast pump or nipple shields ready if currently in use'
    ],
    contraindications: [
      'Severe systemic mastitis with high fever requiring emergency medical prescription'
    ],
    faqIds: ['faq-lactation-1', 'faq-lactation-2'],
    testimonials: ['testimonial-lactation-1'],
    relatedClassIds: ['class-breastfeeding-basics'],
    relatedProductIds: ['product-restorative-oil']
  },
  {
    id: 'general-consultation',
    slug: 'holistic-care-guidance-consultation',
    title: 'Holistic SEYOL Care Guidance Consultation',
    shortTitle: 'Care Guidance Consultation',
    tagline: 'A bespoke 45-minute roadmap session with a senior SEYOL care advisor to tailor your journey.',
    stages: ['preconception', 'pregnancy', 'postpartum', 'newborn'],
    category: 'clinical-tradition',
    summary: 'Not sure which care pathway or package is right for your unique family structure, budget, or medical history? Speak directly with our senior care advisors to map out an optimal timeline from pregnancy through postpartum.',
    benefit: 'Clarity, reassurance, and a personalised care plan aligned with your budget and medical circumstances.',
    bestFor: 'Expectant parents seeking honest, non-judgmental guidance on care selection, confinement planning, and budget allocation.',
    recommendedTimeline: 'Anytime during pregnancy or early postpartum.',
    duration: '45 Minutes (Virtual Video Consultation)',
    format: 'Virtual & Hybrid',
    pricingGuide: '₹950 (100% credited towards any service package booked within 14 days)',
    depositInfo: 'Full payment upon booking.',
    heroImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Review of your family expectations, confinement traditions, and practical needs',
      'Custom budget and timeline breakdown across services, classes, and products',
      'Direct guidance from experienced mother care matrons',
      'Full credit of consultation fee towards your future service bookings'
    ],
    inclusions: [
      '45-minute 1-on-1 private video consultation',
      'Personalised SEYOL Care Roadmap PDF document',
      'Exclusive 10% voucher code for SEY product purchases'
    ],
    preparation: [
      'Gather your questions regarding due dates, hospital plans, and home setup'
    ],
    contraindications: [],
    faqIds: ['faq-booking-1'],
    testimonials: ['testimonial-consult-1'],
    relatedClassIds: ['class-postpartum-prep', 'class-newborn-essentials'],
    relatedProductIds: ['product-soothing-baby-oil', 'product-restorative-oil']
  }
];
