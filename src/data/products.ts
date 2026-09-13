import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 'product-soothing-baby-oil',
    slug: 'soothing-baby-massage-oil',
    title: 'Soothing Baby Massage Oil',
    subtitle: 'Cold-Pressed Sweet Almond, Virgin Coconut & Calming Nilgiri Botanicals',
    category: 'baby-massage',
    stages: ['newborn'],
    volume: '200 ml',
    price: 680,
    currency: 'INR',
    rating: 4.95,
    reviewCount: 342,
    isBestseller: true,
    isHerbalHeritage: true,
    shortDescription: 'Specially crafted for newborn and sensitive baby skin. Cold-pressed virgin oils infused with gentle herbs to promote sound sleep, muscular development, and skin barrier protection.',
    fullDescription: 'Crafted according to classical Siddha oil-curing methods (Thailam Pakam), SEY Soothing Baby Massage Oil provides gentle, deep nourishment for delicate infant skin. Free from mineral oils, artificial fragrances, parabens, and silicones. It absorbs cleanly without sticky residue, nurturing skin softness while aiding bone and muscle strength through daily tactile massage.',
    keyBenefits: [
      'Nourishes delicate newborn skin barrier without clogging pores',
      'Promotes longer, deeper sleep cycles when used before bedtime bath',
      'Enriched with natural Vitamin E for dry patches and cradle cap softening',
      '100% edible-grade botanical ingredients — completely safe if baby touches mouth'
    ],
    heroIngredients: [
      {
        name: 'Cold-Pressed Sweet Almond Oil',
        traditionalRole: 'Vata pacifying, rich in Vitamin E & essential fatty acids for muscle tone',
        botanicalName: 'Prunus Amygdalus Dulcis'
      },
      {
        name: 'Virgin Coconut Oil (Chekku Processed)',
        traditionalRole: 'Cooling, naturally antimicrobial and hydrating for sensitive skin',
        botanicalName: 'Cocos Nucifera'
      },
      {
        name: 'Vetiver (Khus Root Extract)',
        traditionalRole: 'Traditional South Indian cooling aromatic root promoting nervous calm',
        botanicalName: 'Chrysopogon Zizanioides'
      },
      {
        name: 'Country Rose Petals (Panneer Rose)',
        traditionalRole: 'Soothes delicate skin inflammation and lends a faint natural floral aroma',
        botanicalName: 'Rosa Damascena'
      }
    ],
    usageRitual: [
      'Pour 1 to 2 tablespoons of oil into your warm palms and rub hands together to gently warm the oil.',
      'Begin with gentle strokes on baby’s chest and abdomen, moving outward in smooth circular patterns.',
      'Massage arms and legs with gentle stroking movements from shoulders to fingers and hips to toes.',
      'Allow oil to absorb for 15–20 minutes before a warm soothing bath with SEY Gentle Bath Powder.'
    ],
    safetyCertifications: [
      'Dermatologically Tested for Sensitive Newborn Skin',
      'AYUSH Certified Traditional Formulation',
      'Zero Mineral Oil, Zero Liquid Paraffin, Zero Synthetic Fragrance',
      'Cruelty-Free & Ethically Sourced'
    ],
    image: '/images/products-hero-banner.png',
    tags: ['Bestseller', 'Newborn Safe (0m+)', 'Ayush Certified', '100% Natural'],
    badge: 'Flagship Bestseller'
  },
  {
    id: 'product-nourishing-baby-oil',
    slug: 'nourishing-baby-massage-oil-traditional-herbal',
    title: 'Nourishing Baby Massage Oil',
    subtitle: 'Medicated Sesame Base Infused with Ashwagandha, Bala & Laksha',
    category: 'baby-massage',
    stages: ['newborn'],
    volume: '200 ml',
    price: 740,
    currency: 'INR',
    rating: 4.9,
    reviewCount: 215,
    isBestseller: false,
    isHerbalHeritage: true,
    shortDescription: 'Classical fortified herbal oil infused with strengthening roots (Bala & Ashwagandha) to support muscle tone, physical stamina, and joint flexibility during growth spurts.',
    fullDescription: 'Formulated for babies from 3 months onwards or low-birth-weight infants seeking traditional bodily tonification. This authentic formulation follows traditional Balashwagandhadi principles, gently strengthening the skeletal and muscular systems of developing babies.',
    keyBenefits: [
      'Fortified with classical herbs that support muscle firmness and motor milestones',
      'Warm sesame base improves microcirculation and natural resistance to chills',
      'Calms hyperactive nervous reflexes, supporting restful naps'
    ],
    heroIngredients: [
      {
        name: 'Bala Root (Country Mallow)',
        traditionalRole: 'Renowned classical herb for physical strength, nerve resilience, and tissue nourishment',
        botanicalName: 'Sida Cordifolia'
      },
      {
        name: 'Ashwagandha (Indian Ginseng)',
        traditionalRole: 'Restores vitality, supports weight gain, and calms fatigue',
        botanicalName: 'Withania Somnifera'
      },
      {
        name: 'Black Sesame Seed Oil (Cold-Pressed)',
        traditionalRole: 'Deep penetrating carrier oil that warms and lubricates joints',
        botanicalName: 'Sesamum Indicum'
      }
    ],
    usageRitual: [
      'Gently warm the oil bottle in a bowl of warm water for 2 minutes before use.',
      'Massage firmly along the spine and major muscle groups using rhythmic downwards strokes.',
      'Follow with 10 minutes of gentle infant stretching and warm water bath.'
    ],
    safetyCertifications: [
      'Pediatrician Approved Formulation',
      'AYUSH GMP Certified',
      'Free from chemical preservatives and synthetic dyes'
    ],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    tags: ['Traditional Herbal', 'Growth & Strength', '3m+ Babies', 'Ayurvedic Formula']
  },
  {
    id: 'product-bath-powder',
    slug: 'gentle-baby-bath-powder-nalangu-maavu',
    title: 'Gentle Baby Bath Powder',
    subtitle: 'Micro-Milled Green Gram, White Turmeric, Rose & Sandalwood',
    category: 'bath-wellness',
    stages: ['newborn'],
    volume: '250 g',
    price: 520,
    currency: 'INR',
    rating: 4.88,
    reviewCount: 198,
    isBestseller: true,
    isHerbalHeritage: true,
    shortDescription: 'The traditional South Indian soap-free bathing powder. Ultra-fine micro-milled herbs that gently cleanse without stripping natural infant moisture or causing eye irritation.',
    fullDescription: 'A grandmother-perfected blend of roasted green gram, Kasturi Manjal (wild non-staining turmeric), Poolankilangu (white turmeric), and sweet-scented rose petals. Handcrafted to remove post-massage oil gently, soothe diaper chafing, and leave baby’s skin petal-soft.',
    keyBenefits: [
      'Soap-free, surfactant-free, and 100% chemical-free bathing alternative',
      'Balances skin pH and gently removes excess massage oil',
      'Naturally antibacterial and anti-chafing for chubby baby skin folds'
    ],
    heroIngredients: [
      {
        name: 'Whole Green Gram (Pasi Payaru)',
        traditionalRole: 'Gentle exfoliating and cleansing base rich in natural saponins',
        botanicalName: 'Vigna Radiata'
      },
      {
        name: 'White Turmeric (Poolankilangu)',
        traditionalRole: 'Cooling, aromatic rhizome that prevents prickly heat and rashes',
        botanicalName: 'Curcuma Zedoaria'
      },
      {
        name: 'Kasturi Turmeric (Wild Turmeric)',
        traditionalRole: 'Natural antibacterial agent that cleanses without yellow skin staining',
        botanicalName: 'Curcuma Aromatica'
      }
    ],
    usageRitual: [
      'Take 1 to 2 tablespoons in a bowl and mix with warm water (or raw milk for dry skin) to make a smooth, runny paste.',
      'Gently apply over baby’s oiled skin during the warm bath, gently gliding with palms.',
      'Rinse away completely with warm water. No commercial soap or wash needed.'
    ],
    safetyCertifications: [
      'Micro-filtered & Safety Tested for Zero Grittiness',
      'Hypoallergenic & Safe for Newborns (0m+)',
      '100% Edible-Grade Botanical Powder'
    ],
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    tags: ['Soap-Free', 'Traditional Nalangu Maavu', 'Zero Chemicals', 'Bestseller']
  },
  {
    id: 'product-tummy-roll-on',
    slug: 'colic-relief-tummy-roll-on',
    title: 'Colic Relief Tummy Roll-On',
    subtitle: 'Pure Hing (Asafoetida), Ajwain, Fennel & Coconut Oil',
    category: 'digestive-relief',
    stages: ['newborn'],
    volume: '40 ml',
    price: 390,
    currency: 'INR',
    rating: 4.92,
    reviewCount: 489,
    isBestseller: true,
    isHerbalHeritage: true,
    shortDescription: 'Instant on-the-go colic, trapped gas, and tummy discomfort relief. Roll around baby’s navel for rapid soothing during fussy crying episodes and evening colic.',
    fullDescription: 'The modern, mess-free evolution of the time-tested Indian grandmother remedy of rubbing hing around the navel. Formulated with carefully calculated, safe dilution ratios of therapeutic Asafoetida, Bishop’s Weed (Ajwain), and Fennel Seed oil in a soothing coconut carrier.',
    keyBenefits: [
      'Eases gas expulsion within 15–20 minutes of application',
      'Convenient roll-on ball prevents messy kitchen mixing and stained clothing',
      'Gentle on sensitive infant skin with zero burning or stinging sensation',
      'Compact size perfect for diaper bags and travel'
    ],
    heroIngredients: [
      {
        name: 'Hing (Pure Asafoetida Extract)',
        traditionalRole: 'The ultimate carminative agent for dissolving trapped intestinal gas',
        botanicalName: 'Ferula Foetida'
      },
      {
        name: 'Ajwain (Bishop’s Weed)',
        traditionalRole: 'Warming antispasmodic seed oil that relaxes abdominal cramps',
        botanicalName: 'Trachyspermum Ammi'
      },
      {
        name: 'Saunf (Sweet Fennel Seed)',
        traditionalRole: 'Sweet soothing digestive herb that calms gastrointestinal distress',
        botanicalName: 'Foeniculum Vulgare'
      }
    ],
    usageRitual: [
      'Gently roll in a clockwise circle around your baby’s belly button (avoid applying directly inside open umbilical stump).',
      'Follow with gentle clockwise palm rubs and gentle bicycle leg movements.',
      'Repeat 2 to 3 times daily or as needed before naps and bedtime.'
    ],
    safetyCertifications: [
      'Paediatrician Tested & Safe for 2w+ Infants',
      'Zero Peppermint / Zero Camphor (100% Baby-Safe formulation)',
      'Free from Artificial Fragrance'
    ],
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
    tags: ['Fast Acting', 'Must Have for Colic', 'Travel Essential', '5-Star Rated'],
    badge: 'Parent Favourite'
  },
  {
    id: 'product-restorative-oil',
    slug: 'restorative-mother-postpartum-massage-oil',
    title: 'Restorative Mother Massage Oil',
    subtitle: 'Fortified Herbal Sesame Oil with 28 Classical Herbs for Postpartum Recovery',
    category: 'mother-postpartum',
    stages: ['pregnancy', 'postpartum'],
    volume: '300 ml',
    price: 890,
    currency: 'INR',
    rating: 4.96,
    reviewCount: 280,
    isBestseller: true,
    isHerbalHeritage: true,
    shortDescription: 'The sacred oil of maternal healing. Deeply warming, restorative botanical oil crafted for mother’s prenatal comfort, postpartum abhyanga, and soothing nursing shoulder ache.',
    fullDescription: 'Prepared using traditional slow-fire reduction over 72 hours, SEY Restorative Mother Massage Oil is enriched with 28 classical medicinal herbs including Bala, Ashwagandha, Dashamoola, and Manjistha. Designed to restore depleted Vata dosha, tone stretched abdominal and pelvic ligaments, and ease the muscular strain of carrying and breastfeeding.',
    keyBenefits: [
      'Accelerates postpartum bodily tissue recovery and uterine involution',
      'Relieves intense lower back stiffness, nursing neck strain, and joint aches',
      'Deeply moisturises stretched skin to enhance elasticity and comfort',
      'Calms postpartum nervous tension and promotes profound restorative sleep'
    ],
    heroIngredients: [
      {
        name: 'Dashamoola (Ten Sacred Roots)',
        traditionalRole: 'Potent classical anti-inflammatory combination that reduces post-birth swelling',
        botanicalName: 'Classical 10 Roots Compound'
      },
      {
        name: 'Manjistha (Indian Madder)',
        traditionalRole: 'Blood purifying and skin toning botanical that promotes healing',
        botanicalName: 'Rubia Cordifolia'
      },
      {
        name: 'Shatavari (Wild Asparagus)',
        traditionalRole: 'Supreme female reproductive tonic that rejuvenates hormonal balance',
        botanicalName: 'Asparagus Racemosus'
      }
    ],
    usageRitual: [
      'Warm 3 to 4 tablespoons of oil by floating the container in a bowl of hot water.',
      'Massage all over body, focusing on lower back, hips, abdomen, shoulders, and legs.',
      'Allow oil to rest for 30 minutes, followed by a hot herbal water bath or steam shower.'
    ],
    safetyCertifications: [
      'Traditional Ayurvedic Pharmacopoeia Grade',
      'Safe for use during pregnancy (2nd & 3rd Trimester) and entire postpartum period',
      'Free from synthetic additives and mineral base'
    ],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    tags: ['Postpartum Essential', '28 Healing Herbs', 'Award-Winning', 'Mother Care'],
    badge: 'Postpartum Gold Standard'
  },
  {
    id: 'product-bath-sachet',
    slug: 'warming-mother-herbal-bath-sachet-vethu-kuli',
    title: 'Warming Mother Herbal Bath Sachet',
    subtitle: 'Steeping Sachets with Eucalyptus Leaves, Turmeric, Neem, Nirgundi & Tamarind Leaf',
    category: 'mother-postpartum',
    stages: ['postpartum'],
    volume: 'Pack of 10 Steeping Sachets',
    price: 650,
    currency: 'INR',
    rating: 4.89,
    reviewCount: 164,
    isBestseller: false,
    isHerbalHeritage: true,
    shortDescription: 'The authentic South Indian Vethu Kuli herbal bath in a clean, mess-free steeping sachet. Soothes perineal soreness, drives away bodily chills, and relieves postpartum fatigue.',
    fullDescription: 'Experience the therapeutic luxury of a traditional herbal hot bath without foraging for leaves. Simply drop one large biodegradable sachet into boiling bath water to release aromatic medicinal volatile oils that relax aching muscles, soothe perineal tissues, and enhance lymphatic circulation.',
    keyBenefits: [
      'Mess-free steeping format — no leaves clogging bath drains',
      'Invigorating herbal steam clears respiratory passages and prevents postnatal chills',
      'Soothes tender perineal and pelvic tissues through natural herbal astringency'
    ],
    heroIngredients: [
      {
        name: 'Nirgundi (Five-Leaved Chaste Tree)',
        traditionalRole: 'Foremost traditional analgesic leaf for relieving joint stiffness and muscular soreness',
        botanicalName: 'Vitex Negundo'
      },
      {
        name: 'Eucalyptus & Tamarind Leaves',
        traditionalRole: 'Warming aromatic leaves that induce comforting perspiration and soothe inflammation',
        botanicalName: 'Eucalyptus Globulus / Tamarindus Indica'
      },
      {
        name: 'Neem & Organic Turmeric',
        traditionalRole: 'Natural antiseptic duo for postpartum perineal hygiene',
        botanicalName: 'Azadirachta Indica / Curcuma Longa'
      }
    ],
    usageRitual: [
      'Boil 1 herbal sachet in 3 litres of water for 10 minutes until deep golden-brown infusion forms.',
      'Pour this aromatic decoction into your warm bath bucket or sitz bath tub, diluting to comfortable temperature.',
      'Bathe slowly, pouring warm herbal water generously over shoulders, back, and hips.'
    ],
    safetyCertifications: [
      '100% Unbleached Biodegradable Cotton Sachets',
      'Pure Farm-Grown Medicinal Leaves with Zero Pesticides',
      'Sitz Bath & Full Bath Approved'
    ],
    image: 'https://images.unsplash.com/photo-1512290900672-1f5be1c6e1dc?auto=format&fit=crop&q=80&w=800',
    tags: ['Vethu Kuli', 'Perineal Comfort', 'Herbal Sitz Bath', 'Confinement Ritual']
  }
];

export const bundlesData = [
  {
    id: 'bundle-newborn-welcome',
    title: 'The Sacred Newborn Welcome Routine',
    subtitle: 'Everything needed for your baby’s first 100 days of traditional massage, bath, and tummy comfort.',
    productIds: ['product-soothing-baby-oil', 'product-bath-powder', 'product-tummy-roll-on'],
    bundlePrice: 1350,
    originalPrice: 1590,
    savings: 240,
    savingsPercent: 15,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
    badge: 'Most Popular for Newborns'
  },
  {
    id: 'bundle-mother-postpartum',
    title: 'The 40-Day Mother Confinement Sanctuary',
    subtitle: 'Comprehensive physical restoration for mother’s bodywork, herbal steam bath, and relaxation.',
    productIds: ['product-restorative-oil', 'product-bath-sachet'],
    bundlePrice: 1320,
    originalPrice: 1540,
    savings: 220,
    savingsPercent: 14,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    badge: 'Mother Healing Essential'
  },
  {
    id: 'bundle-complete-harmony',
    title: 'Royal Mother & Baby Grand Confinement Suite',
    subtitle: 'The complete SEY by SEYOL collection for mother and newborn paired with a complimentary wooden baby massage comb.',
    productIds: [
      'product-soothing-baby-oil',
      'product-bath-powder',
      'product-tummy-roll-on',
      'product-restorative-oil',
      'product-bath-sachet'
    ],
    bundlePrice: 2490,
    originalPrice: 3130,
    savings: 640,
    savingsPercent: 20,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
    badge: 'Ultimate Care Gift Box'
  }
];
