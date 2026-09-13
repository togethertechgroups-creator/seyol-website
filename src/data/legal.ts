import { LegalPolicy } from '../types';

export const legalPoliciesData: Record<string, LegalPolicy> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: '15 August 2026',
    summary: 'How SEYOL collects, uses, protects, and honours your personal, maternal health, and payment information in strict accordance with the Digital Personal Data Protection Act and international standards.',
    sections: [
      {
        id: 'collection',
        heading: '1. Information We Collect',
        content: 'When you enquire about our care services, register for a masterclass, or purchase SEY botanical products, SEYOL collects relevant personal identification details (name, email address, telephone number, residential address, estimated due date, gestation week, and relevant health history disclosures voluntarily shared for safe care planning).'
      },
      {
        id: 'use-of-data',
        heading: '2. Purpose and Use of Personal Information',
        content: 'Your confidential information is utilised strictly to coordinate personalised in-home care, match you with certified caregivers, process secure order fulfillments, send booking confirmations and class schedules, and provide care updates. We never sell, trade, or rent your personal or health data to third-party marketing entities.'
      },
      {
        id: 'health-confidentiality',
        heading: '3. Maternal & Infant Health Confidentiality',
        content: 'Health disclosures shared during consultations or service bookings are held under strict professional confidentiality. They are accessible exclusively by your assigned care providers and clinical supervisors solely for clinical safety monitoring.'
      },
      {
        id: 'data-security',
        heading: '4. Data Storage and Security Safeguards',
        content: 'All electronic transmissions and database storage are encrypted using industry-standard SSL/TLS protocols. Access is restricted to authorised personnel through multi-factor authentication.'
      },
      {
        id: 'your-rights',
        heading: '5. Your Rights & Access Requests',
        content: 'You retain the right to review, rectify, or request the deletion of your personal records from our active operational systems at any time by contacting hello@seyolpregnancycare.com.'
      }
    ]
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    lastUpdated: '15 August 2026',
    summary: 'The terms governing the use of the SEYOL website, service enquiries, digital assets, and e-commerce store.',
    sections: [
      {
        id: 'agreement',
        heading: '1. Acceptance of Terms',
        content: 'By accessing or utilizing the SEYOL digital platform (seyolpregnancycare.com) and associated mobile services, you agree to be bound by these Terms and Conditions and our associated policies.'
      },
      {
        id: 'intellectual-property',
        heading: '2. Intellectual Property & Copyright',
        content: 'All educational masterclass materials, downloadable guides, custom stroke sequences, visual diagrams, and written editorial content are the exclusive intellectual property of SEYOL Mother & Baby Care. Unauthorised reproduction, commercial distribution, or resale is strictly prohibited.'
      },
      {
        id: 'service-modifications',
        heading: '3. Service Pricing & Availability',
        content: 'SEYOL reserves the right to modify service fees, workshop schedules, and product availability with prior notice. Confirmed bookings with deposits paid will be honoured at the agreed tariff.'
      }
    ]
  },
  'service-booking-cancellation-policy': {
    slug: 'service-booking-cancellation-policy',
    title: 'Service Booking & Cancellation Policy',
    lastUpdated: '15 August 2026',
    summary: 'Clear, compassionate guidelines regarding reservation deposits, delivery date adjustments, cancellations, and package refunds.',
    sections: [
      {
        id: 'reservation-window',
        heading: '1. Due Date Reservation & Grace Window',
        content: 'Upon receipt of your booking deposit, SEYOL reserves a dedicated care window of 14 days before and 14 days after your Estimated Due Date (EDD) to guarantee matron availability regardless of when labour commences.'
      },
      {
        id: 'rescheduling',
        heading: '2. Birth Date Rescheduling & Notification',
        content: 'Clients are kindly requested to notify the SEYOL Care Coordinator within 24 hours of delivery. Your care package start date will be scheduled in consultation with your discharging physician.'
      },
      {
        id: 'cancellations',
        heading: '3. Cancellation and Refund Schedule',
        content: 'Cancellations made 30 or more days prior to the EDD will receive a 80% refund of the deposit (20% administrative retainer retained). Cancellations within 14 days of EDD or after package commencement are non-refundable, except in documented cases of emergency medical contraindications certified by an obstetrician.'
      }
    ]
  },
  'class-workshop-terms': {
    slug: 'class-workshop-terms',
    title: 'Class & Workshop Registration Terms',
    lastUpdated: '15 August 2026',
    summary: 'Guidelines for attending in-person and virtual SEYOL masterclasses, seat transfers, and recording access.',
    sections: [
      {
        id: 'partner-admission',
        heading: '1. Partner & Support Person Admission',
        content: 'Every single-ticket class registration admits the mother/primary registrant and one accompanying partner or primary caregiver (e.g., spouse or grandparent) without extra surcharge.'
      },
      {
        id: 'virtual-recording',
        heading: '2. Virtual Class Recording Access',
        content: 'For online masterclasses, access to the HD video recording and downloadable course workbook will remain active in your student dashboard for 12 months following the session date.'
      },
      {
        id: 'rescheduling-classes',
        heading: '3. Class Rescheduling',
        content: 'If you are unable to attend your scheduled live cohort due to early labour or medical appointments, you may transfer your seat to any subsequent cohort within 90 days at zero penalty by giving 24 hours notice.'
      }
    ]
  },
  'product-safety-disclaimer': {
    slug: 'product-safety-disclaimer',
    title: 'Product Safety & Herbal Care Disclaimer',
    lastUpdated: '15 August 2026',
    summary: 'Important guidance on natural Ayurvedic & Siddha formulations, patch tests, and non-medical advisory distinctions.',
    sections: [
      {
        id: 'traditional-heritage',
        heading: '1. Traditional Ayurvedic & Siddha Formulations',
        content: 'SEY by SEYOL products are prepared in accordance with traditional Ayurvedic and Siddha pharmacopoeia guidelines using 100% pure botanical and cold-pressed oils. They are designed for general maternal wellness, relaxation, and infant touch routines.'
      },
      {
        id: 'medical-distinction',
        heading: '2. Non-Medical Advisory Notice',
        content: 'Products and workshops provided by SEYOL do not replace professional medical diagnosis, paediatric interventions, or emergency obstetric care. Always consult your qualified healthcare practitioner regarding persistent medical concerns, fevers, or severe infant distress.'
      },
      {
        id: 'patch-testing',
        heading: '3. Patch Testing Recommendation',
        content: 'While all our products are hypoallergenic and dermatologically reviewed, individual botanical sensitivities can occur. We recommend applying a coin-sized amount of any topical product to the inner arm 24 hours prior to regular use.'
      }
    ]
  },
  'shipping-and-returns': {
    slug: 'shipping-and-returns',
    title: 'Shipping, Delivery & Returns Policy',
    lastUpdated: '15 August 2026',
    summary: 'Domestic and international shipping timelines, packaging integrity, and return conditions for SEY products.',
    sections: [
      {
        id: 'shipping-timeline',
        heading: '1. Dispatch & Delivery Timelines',
        content: 'Physical orders are hand-packed in eco-friendly protective packaging and dispatched within 24 to 48 business hours from Chennai. Standard metro delivery takes 2 to 4 working days, and rest of India takes 4 to 7 working days.'
      },
      {
        id: 'hygiene-returns',
        heading: '2. Hygiene and Returns Policy',
        content: 'Due to strict maternal and neonatal hygiene regulations, opened or unsealed bottles of massage oils, roll-ons, and bath powders cannot be returned once delivered. Unopened items in original tamper-evident packaging may be returned within 7 days of delivery for a replacement or store credit.'
      },
      {
        id: 'damaged-shipments',
        heading: '3. Damaged or Leaking Items',
        content: 'In the rare event of transit damage or leakage, please email a photograph of the parcel to hello@seyolpregnancycare.com within 48 hours of receipt for immediate complimentary expedited replacement.'
      }
    ]
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie & Tracking Policy',
    lastUpdated: '15 August 2026',
    summary: 'Information on how cookies are used on seyolpregnancycare.com to remember your cart, preferences, and improve performance.',
    sections: [
      {
        id: 'cookie-usage',
        heading: '1. What Are Cookies?',
        content: 'Cookies are small text files stored on your browser to enhance your browsing experience, remember items in your shopping cart, and maintain your gated video library access session.'
      },
      {
        id: 'cookie-categories',
        heading: '2. Categories of Cookies We Utilise',
        content: 'We use strictly essential cookies (for cart and secure checkout functionality), analytics cookies (anonymised traffic measurement to improve our site speed), and functional cookies (remembering your selected journey stage filter).'
      }
    ]
  },
  'caregiver-code-of-conduct': {
    slug: 'caregiver-code-of-conduct',
    title: 'Caregiver Professional Standards & Safety Code',
    lastUpdated: '15 August 2026',
    summary: 'The stringent hygiene, professional ethics, safety, and background-check standards upheld by all SEYOL care matrons and doulas.',
    sections: [
      {
        id: 'hygiene-sanitation',
        heading: '1. Clinical Hygiene & Sanitisation Protocols',
        content: 'Every SEYOL care provider follows rigorous infection control protocols: scrubbing hands and forearms prior to each baby interaction, using sanitised linen, maintaining trimmed unpolished nails, and wearing clean professional attire.'
      },
      {
        id: 'health-screenings',
        heading: '2. Health Checks & Background Verification',
        content: 'All personnel undergo mandatory annual medical fitness evaluations, infectious disease screenings, and comprehensive police criminal background checks before being rostered for in-home client care.'
      },
      {
        id: 'respectful-care',
        heading: '3. Respectful & Gentle Care Ethos',
        content: 'SEYOL caregivers are trained to uphold a calm, supportive, non-intrusive presence in your home, respecting family traditions, privacy, and personal parenting preferences at all times.'
      }
    ]
  }
};
