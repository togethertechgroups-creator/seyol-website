import { ClientPortalProfile } from '../types';

export const mockClientPortals: Record<string, ClientPortalProfile> = {
  'usr_seyol_8819': {
    id: 'portal_ananya_8819',
    clientId: 'usr_seyol_8819',
    clientName: 'Ananya Ramachandran',
    clientEmail: 'ananya.r@example.com',
    clientPhone: '+91 98400 12345',
    stage: 'postpartum',
    babyNameOrEdd: 'Baby Aarav (4 Weeks Old)',
    location: 'Nungambakkam, Chennai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    
    // 1. Dashboard Active Package
    activePackage: {
      id: 'pkg-postpartum-28day',
      title: '28-Day Sacred Postpartum Confinement & Kattu Package',
      startDate: '2026-08-04',
      endDate: '2026-09-01',
      status: 'in-progress',
      totalSessions: 28,
      completedSessions: 18,
      nextSessionDate: '2026-08-31T09:30:00+05:30',
      assignedMatron: {
        name: 'Mrs. Lakshmi Sundaram',
        role: 'Senior Postpartum Matron & Thokkanam Specialist (18+ Yrs Exp)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        phone: '+91 98401 99887'
      }
    },

    // 1. Dashboard Upcoming Appointment
    upcomingAppointment: {
      id: 'appt-today-session19',
      serviceTitle: 'Daily In-Home Postnatal Herbal Bodywork & Cotton Kattu Binding',
      packageTitle: '28-Day Sacred Postpartum Confinement Care',
      sessionNumber: 19,
      totalSessions: 28,
      date: '2026-08-31',
      time: '09:30 AM – 12:30 PM (IST)',
      format: 'In-Home',
      assignedMatron: {
        name: 'Mrs. Lakshmi Sundaram',
        role: 'Senior Postpartum Matron',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        phone: '+91 98401 99887'
      },
      status: 'confirmed',
      prepSummary: 'Please have 2 dry cotton towels ready and boil water for hot herbal bath fomentation.'
    },

    // 1. Dashboard Latest Session Update
    latestSessionUpdate: {
      date: 'Yesterday, 10:45 AM',
      matronName: 'Mrs. Lakshmi Sundaram',
      sessionNumber: 18,
      notes: 'Session 18 completed smoothly. Uterine involution on track; fundus is now well below pelvic brim. Diastasis recti gap decreased from 2.5 to 1.5 finger-width. Kattu wrap reapplied with warm Dhanwantharam herbal fomentation.',
      recoveryProgress: 'Lochia has transitioned to serosa (light pale). Mother reporting deeper 4-hour sleep blocks and reduced lower back stiffness.',
      recommendation: 'Continue warm jeera-ajwain water infusion throughout the day. Baby Aarav passed meconium cleanly and skin barrier looks calm.'
    },

    // 1. Dashboard Next Step from SEYOL
    nextStepFromSeyol: {
      currentMilestone: 'Week 4 Involution & Belly Binding (Sessions 15–21)',
      nextMilestoneTitle: 'Week 5 Pelvic Floor Toning & Traditional Herbal Steam Transition',
      targetTimeline: 'Starting September 2, 2026',
      description: 'Gradual transition from passive belly wrapping to gentle pelvic floor engagement and therapeutic Vethu Kuli herbal steam baths.'
    },

    // 2. My Care Calendar
    calendarEvents: [
      {
        id: 'cal-1',
        type: 'confirmed_appointment',
        title: 'Session 19: Herbal Bodywork & Kattu',
        date: '2026-08-31',
        time: '09:30 AM',
        duration: '3 Hours',
        status: 'confirmed',
        location: 'In-Home (Nungambakkam)',
        matronName: 'Mrs. Lakshmi S.',
        notes: 'Full-body massage, hot compress, abdominal binding.'
      },
      {
        id: 'cal-2',
        type: 'confirmed_appointment',
        title: 'Session 20: Herbal Bodywork & Baby Massage',
        date: '2026-09-01',
        time: '09:30 AM',
        duration: '3 Hours',
        status: 'confirmed',
        location: 'In-Home (Nungambakkam)',
        matronName: 'Mrs. Lakshmi S.'
      },
      {
        id: 'cal-3',
        type: 'package_session',
        title: 'Session 21: Milestone Assessment & Wrap Adjust',
        date: '2026-09-02',
        time: '09:30 AM',
        status: 'confirmed',
        location: 'In-Home'
      },
      {
        id: 'cal-4',
        type: 'pending_request',
        title: 'Lactation Consultant Home Follow-up Request',
        date: '2026-09-03',
        time: '02:00 PM',
        status: 'pending',
        notes: 'Requested review for gentle bottle weaning & power pumping.'
      },
      {
        id: 'cal-5',
        type: 'class_date',
        title: 'Live Workshop: Traditional Infant Massage Mastery (Zoom)',
        date: '2026-09-05',
        time: '04:00 PM – 05:30 PM',
        status: 'confirmed',
        location: 'Zoom Virtual Room',
        matronName: 'Ms. Jemma Francis'
      },
      {
        id: 'cal-6',
        type: 'payment_due',
        title: 'Final Milestone Invoice Due (₹18,000)',
        date: '2026-09-07',
        status: 'due',
        notes: 'Milestone 2 final balance payment.'
      },
      {
        id: 'cal-7',
        type: 'scn_duration',
        title: 'Stay-in Confinement Support Duration',
        date: '2026-08-04 to 2026-09-01',
        status: 'confirmed',
        notes: 'Continuous 28-day mother & baby stay-in support.'
      },
      {
        id: 'cal-8',
        type: 'time_to_avoid',
        title: 'Mother Rest Window (Do Not Schedule)',
        date: '2026-08-31',
        time: '01:30 PM – 04:00 PM',
        status: 'rest_window',
        notes: 'Protected quiet rest & baby nap window.'
      }
    ],

    // 3. Invoices, Receipts & Payment Reminders
    invoices: [
      {
        id: 'inv-seyol-1049',
        invoiceNumber: 'INV-2026-0881',
        date: '2026-08-01',
        dueDate: '2026-08-03',
        packageTitle: '28-Day Sacred Confinement Package (Booking Deposit & Milestone 1)',
        totalAmount: 65000,
        paidAmount: 65000,
        balanceDue: 0,
        status: 'paid',
        receiptNumber: 'RCPT-2026-0881',
        paymentMethodUsed: 'UPI (GPay)',
        receiptUrl: '#download-receipt-1'
      },
      {
        id: 'inv-seyol-1050',
        invoiceNumber: 'INV-2026-0914',
        date: '2026-08-28',
        dueDate: '2026-09-07',
        packageTitle: '28-Day Sacred Confinement Package (Milestone 2 Final Balance)',
        totalAmount: 18000,
        paidAmount: 0,
        balanceDue: 18000,
        status: 'pending_milestone'
      },
      {
        id: 'inv-seyol-1051',
        invoiceNumber: 'INV-2026-0732',
        date: '2026-07-15',
        dueDate: '2026-07-15',
        packageTitle: 'Digital Resource Master Vault (37 Guides)',
        totalAmount: 1299,
        paidAmount: 1299,
        balanceDue: 0,
        status: 'paid',
        receiptNumber: 'RCPT-2026-0732',
        paymentMethodUsed: 'Credit Card (Visa)',
        receiptUrl: '#download-receipt-digital'
      }
    ],

    // 4. Preparation Item List
    preparationItems: [
      {
        id: 'prep-1',
        category: 'mother_comfort',
        title: 'Loose breathable cotton dhotis or front-open nighties',
        description: 'Enables comfortable massage access and easy nursing.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-2',
        category: 'mother_comfort',
        title: 'Abdominal cotton binding cloth (Kattu cloth)',
        description: 'Supplied in your SEYOL Welcome Kit — keep washed and air-dried.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-3',
        category: 'mother_comfort',
        title: 'Hot water flask & thermal kettle ready in room',
        description: 'Required for warm herbal fomentations and ginger-ajwain tea.',
        isCompleted: true,
        essentialLevel: 'recommended'
      },
      {
        id: 'prep-4',
        category: 'newborn_essentials',
        title: 'Pre-washed soft cotton langots / cloth nappies (6-8 pieces)',
        description: 'Keep near changing station with organic diaper balm.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-5',
        category: 'newborn_essentials',
        title: 'SEYOL Cold-Pressed Sweet Almond & Sesame Baby Oil bottle',
        description: 'Place in warm water bowl 10 minutes before matron arrival.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-6',
        category: 'newborn_essentials',
        title: 'Digital baby bath thermometer & 2 soft hooded towels',
        description: 'Ensures water is between 37°C to 38°C prior to bath.',
        isCompleted: false,
        essentialLevel: 'recommended'
      },
      {
        id: 'prep-7',
        category: 'confinement_room',
        title: 'Draft-free warm room setup with windows closed during massage',
        description: 'Prevents post-massage cold chill and Vata aggravation.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-8',
        category: 'confinement_room',
        title: 'Floor mat / firm mattress protected with washable waterproof sheet',
        description: 'Allows matron to deliver ergonomic traditional floor bodywork.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-9',
        category: 'traditional_herbs',
        title: 'Poondu Legiyam (Garlic herbal paste) jar in pantry',
        description: 'Take 1 tsp morning and evening after warm breakfast.',
        isCompleted: true,
        essentialLevel: 'recommended'
      },
      {
        id: 'prep-10',
        category: 'traditional_herbs',
        title: 'Vethu Kuli herbal bath sachet for evening soak',
        description: 'Boil sachet in 5 liters water for 15 minutes before bath.',
        isCompleted: false,
        essentialLevel: 'optional'
      }
    ],

    // 5. SCN Weekly Check-In Form Submissions & Active Form
    scnCheckIns: [
      {
        id: 'scn-checkin-wk1',
        weekNumber: 1,
        dateSubmitted: '2026-08-11',
        babyFeedingFrequency: '8–10 feeds daily (every 2.5 hours)',
        babySleepAverage: '15–16 hours total',
        babyWeightMilestone: 'Regained birth weight (3.2 kg)',
        diaperCountDaily: '7 wet nappies, 4 yellow soft stools',
        cordHealingStatus: 'healing_well',
        motherRecoveryScore: 6,
        motherEnergyLevel: 'moderate',
        lochiaBleedingStatus: 'moderate',
        abdominalPainScore: 4,
        nannyCareRating: 5,
        mealsFeedback: 'Pathiya soup and garlic rice are delicious and soothing.',
        nannyPunctuality: 'excellent',
        dietaryAdjustments: 'Requested less black pepper in evening rasam.',
        specialRequestsOrNotes: 'Nanny Lakshmi handled night burping exceptionally well.',
        matronReviewed: true,
        matronReviewNote: 'Reviewed by Ms Jemma Francis. Mother recovery progressing normally.'
      },
      {
        id: 'scn-checkin-wk2',
        weekNumber: 2,
        dateSubmitted: '2026-08-18',
        babyFeedingFrequency: '8 feeds daily, deeper latch',
        babySleepAverage: '14–15 hours',
        babyWeightMilestone: '3.5 kg (+300g)',
        diaperCountDaily: '8 wet nappies',
        cordHealingStatus: 'separated_clean',
        motherRecoveryScore: 8,
        motherEnergyLevel: 'moderate',
        lochiaBleedingStatus: 'minimal',
        abdominalPainScore: 2,
        nannyCareRating: 5,
        mealsFeedback: 'Lactation soup and fenugreek porridge boosting milk supply.',
        nannyPunctuality: 'excellent',
        dietaryAdjustments: 'Added drumstick leaves soup on alternate days.',
        specialRequestsOrNotes: 'Umbilical cord separated cleanly on Day 10.',
        matronReviewed: true,
        matronReviewNote: 'Excellent progress. Cord stump clear.'
      },
      {
        id: 'scn-checkin-wk3',
        weekNumber: 3,
        dateSubmitted: '2026-08-25',
        babyFeedingFrequency: '7–8 feeds daily, feeding intervals stretching',
        babySleepAverage: '14 hours with 3.5h night stretches',
        babyWeightMilestone: '3.85 kg',
        diaperCountDaily: '8 wet nappies',
        cordHealingStatus: 'separated_clean',
        motherRecoveryScore: 9,
        motherEnergyLevel: 'energetic',
        lochiaBleedingStatus: 'minimal',
        abdominalPainScore: 1,
        nannyCareRating: 5,
        mealsFeedback: 'Enjoying traditional herbal legiyams and vegetable kootus.',
        nannyPunctuality: 'excellent',
        dietaryAdjustments: 'Continuing current meal schedule.',
        specialRequestsOrNotes: 'Kattu belly wrap is very comfortable and supportive.',
        matronReviewed: true,
        matronReviewNote: 'Diastasis recti narrowing confirmed. Keep up daily wrap.'
      }
    ],

    // 6. Messages & Important Updates (All 8 Message Types)
    messages: [
      {
        id: 'msg-1',
        type: 'booking_confirmed',
        title: 'Booking Confirmed: 28-Day Sacred Confinement Care',
        body: 'Your booking (#BK-8819) for the 28-Day In-Home Confinement Care Package has been confirmed with Senior Matron Mrs. Lakshmi Sundaram. First home visit starts Aug 4 at 9:30 AM.',
        timestamp: 'Aug 01, 2026 • 10:30 AM',
        isRead: true,
        categoryTag: 'Booking Confirmation',
        actionLabel: 'View Active Booking',
        actionUrl: '#package'
      },
      {
        id: 'msg-2',
        type: 'appointment_changed',
        title: 'Appointment Time Updated: Session 19',
        body: 'Your in-home care visit for Monday Aug 31 has been confirmed for 9:30 AM – 12:30 PM with Matron Lakshmi.',
        timestamp: 'Aug 30, 2026 • 06:15 PM',
        isRead: false,
        categoryTag: 'Schedule Change',
        actionLabel: 'View Calendar',
        actionUrl: '#calendar'
      },
      {
        id: 'msg-3',
        type: 'payment_reminder',
        title: 'Milestone Payment Due in 7 Days',
        body: 'Your final milestone balance invoice INV-2026-0914 for ₹18,000 is due on Sep 7, 2026. Secure online payment via UPI, Cards, or NetBanking is available.',
        timestamp: 'Aug 28, 2026 • 09:00 AM',
        isRead: false,
        categoryTag: 'Payment Reminder',
        actionLabel: 'Pay Balance Online',
        actionUrl: '#invoices'
      },
      {
        id: 'msg-4',
        type: 'receipt_sent',
        title: 'Official Tax Invoice & Receipt Sent (#RCPT-2026-0881)',
        body: 'Your official GST receipt for payment of ₹65,000 has been generated and is ready for download in your portal ledger.',
        timestamp: 'Aug 03, 2026 • 02:45 PM',
        isRead: true,
        categoryTag: 'Receipt Dispatched',
        actionLabel: 'Download Receipt PDF',
        actionUrl: '#invoices'
      },
      {
        id: 'msg-5',
        type: 'item_list_sent',
        title: 'Preparation Item List Dispatched for Week 4',
        body: 'Matron Lakshmi has updated your Home Preparation Checklist with hot water fomentation and Vethu Kuli herb recommendations.',
        timestamp: 'Aug 27, 2026 • 04:20 PM',
        isRead: true,
        categoryTag: 'Item List Updated',
        actionLabel: 'View Checklist',
        actionUrl: '#preparation'
      },
      {
        id: 'msg-6',
        type: 'scn_checkin_reminder',
        title: 'Weekly SCN Check-In Reminder (Week 4)',
        body: 'Please complete your quick 2-minute weekly check-in form for Week 4 to help our clinical matrons track your recovery and baby Aarav’s growth.',
        timestamp: 'Today, 08:00 AM',
        isRead: false,
        categoryTag: 'Weekly Check-In',
        actionLabel: 'Fill Check-In Form',
        actionUrl: '#scn-checkin'
      },
      {
        id: 'msg-7',
        type: 'class_access_link',
        title: 'Zoom Live Access: Infant Massage Workshop with Ms Jemma Francis',
        body: 'Your private Zoom access room for the Infant Massage & Bath Masterclass on Saturday Sep 5 at 4:00 PM IST is now active.',
        timestamp: 'Aug 29, 2026 • 11:30 AM',
        isRead: false,
        categoryTag: 'Class Access',
        actionLabel: 'Join Live Class',
        actionUrl: '#classes'
      },
      {
        id: 'msg-8',
        type: 'resource_access_granted',
        title: 'Digital Resource Library Unlocked: 37 Guides & Recipe Vault',
        body: 'You have full lifetime access to the complete SEYOL digital guides, feeding logs, and the 50 Traditional Confinement Recipes e-Book in your resource locker.',
        timestamp: 'Jul 15, 2026 • 03:00 PM',
        isRead: true,
        categoryTag: 'Digital Resources',
        actionLabel: 'Open Resource Vault',
        actionUrl: '#resources'
      }
    ],

    // 9. Documents & Consent
    documents: [
      {
        id: 'doc-1',
        title: 'SEYOL In-Home Postpartum Confinement Care Agreement',
        category: 'confinement_agreement',
        signedDate: '2026-08-01',
        status: 'signed',
        downloadUrl: '#download-agreement'
      },
      {
        id: 'doc-2',
        title: 'Maternal Traditional Bodywork & Medical Health Disclaimer',
        category: 'medical_disclaimer',
        signedDate: '2026-08-01',
        status: 'acknowledged',
        downloadUrl: '#download-disclaimer'
      },
      {
        id: 'doc-3',
        title: 'Caregiver Household Privacy & Infant Safety Protocols',
        category: 'nanny_safety_protocol',
        signedDate: '2026-08-01',
        status: 'active',
        downloadUrl: '#download-protocol'
      },
      {
        id: 'doc-4',
        title: 'Digital Masterclass & Content Single-Household License',
        category: 'digital_license',
        signedDate: '2026-07-15',
        status: 'active',
        downloadUrl: '#download-license'
      }
    ]
  },

  'usr_seyol_9921': {
    id: 'portal_priya_9921',
    clientId: 'usr_seyol_9921',
    clientName: 'Priya Sharma',
    clientEmail: 'priya.sharma@example.com',
    clientPhone: '+65 9123 4567',
    stage: 'pregnancy',
    babyNameOrEdd: 'EDD: October 14, 2026 (Week 34)',
    location: 'River Valley, Singapore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    
    activePackage: {
      id: 'pkg-prenatal-massage-6session',
      title: 'Prenatal Restorative Massage & Birth Preparation Package',
      startDate: '2026-08-10',
      endDate: '2026-09-28',
      status: 'in-progress',
      totalSessions: 6,
      completedSessions: 4,
      nextSessionDate: '2026-09-03T14:00:00+08:00',
      assignedMatron: {
        name: 'Ms. Janet Francis',
        role: 'Certified Birth Doula & Prenatal Massage Specialist',
        avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=200',
        phone: '+65 8234 5678'
      }
    },

    upcomingAppointment: {
      id: 'appt-priya-session5',
      serviceTitle: 'Prenatal Pelvic Relief & Side-Lying Massage',
      packageTitle: 'Prenatal Restorative Massage Package',
      sessionNumber: 5,
      totalSessions: 6,
      date: '2026-09-03',
      time: '02:00 PM – 03:30 PM (SGT)',
      format: 'In-Home',
      assignedMatron: {
        name: 'Ms. Janet Francis',
        role: 'Prenatal Specialist',
        avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=200',
        phone: '+65 8234 5678'
      },
      status: 'confirmed',
      prepSummary: 'Have 2 pillows ready for side-lying knee and tummy support.'
    },

    latestSessionUpdate: {
      date: 'Aug 24, 03:30 PM',
      matronName: 'Ms. Janet Francis',
      sessionNumber: 4,
      notes: 'Session 4 focused on sacroiliac joint pressure release and gentle lymphatic ankle drainage. Sacral rocking brought noticeable relief from lower back fatigue.',
      recoveryProgress: 'Priya reported better sleep quality and reduced leg cramp frequency.',
      recommendation: 'Continue daily pelvic rocking on birth ball for 15 minutes each evening.'
    },

    nextStepFromSeyol: {
      currentMilestone: 'Week 34 Prenatal Mobility & Pelvic Alignment',
      nextMilestoneTitle: 'Week 36 Labour Partner Massage & Acupressure Coaching Session',
      targetTimeline: 'Mid-September 2026',
      description: 'Hands-on session with birth partner practicing counterpressure and diaphragmatic labour breathing.'
    },

    calendarEvents: [
      {
        id: 'cal-p1',
        type: 'confirmed_appointment',
        title: 'Session 5: Prenatal Pelvic Relief Massage',
        date: '2026-09-03',
        time: '02:00 PM',
        status: 'confirmed',
        location: 'In-Home (River Valley)'
      },
      {
        id: 'cal-p2',
        type: 'package_session',
        title: 'Session 6: Birth Readiness & Partner Support',
        date: '2026-09-17',
        time: '02:00 PM',
        status: 'confirmed'
      },
      {
        id: 'cal-p3',
        type: 'class_date',
        title: 'Live Workshop: Gentle Birth Partner Crash Course',
        date: '2026-09-12',
        time: '10:00 AM SGT',
        status: 'confirmed'
      }
    ],

    invoices: [
      {
        id: 'inv-sg-501',
        invoiceNumber: 'INV-SG-2026-012',
        date: '2026-08-08',
        dueDate: '2026-08-08',
        packageTitle: 'Prenatal Massage 6-Session Package (Singapore)',
        totalAmount: 900,
        paidAmount: 900,
        balanceDue: 0,
        status: 'paid',
        receiptNumber: 'RCPT-SG-012',
        paymentMethodUsed: 'PayNow (Singapore)',
        receiptUrl: '#download-receipt-sg'
      }
    ],

    preparationItems: [
      {
        id: 'prep-p1',
        category: 'mother_comfort',
        title: '3 comfortable pillows & light blanket',
        description: 'For side-lying pregnancy support.',
        isCompleted: true,
        essentialLevel: 'mandatory'
      },
      {
        id: 'prep-p2',
        category: 'confinement_room',
        title: 'Hospital Birth Bag packed with Indian packing checklist',
        description: 'Ready by week 36.',
        isCompleted: true,
        essentialLevel: 'recommended'
      }
    ],

    scnCheckIns: [],

    messages: [
      {
        id: 'msg-p1',
        type: 'booking_confirmed',
        title: 'Prenatal Massage Package Confirmed with Ms Janet Francis',
        body: 'Your 6-session home prenatal series is active. Next visit on Sep 3.',
        timestamp: 'Aug 08, 2026 • 11:00 AM',
        isRead: true,
        categoryTag: 'Booking Confirmation'
      }
    ],

    documents: [
      {
        id: 'doc-p1',
        title: 'Prenatal Massage Health Screening & Consent',
        category: 'medical_disclaimer',
        signedDate: '2026-08-08',
        status: 'signed',
        downloadUrl: '#download-consent-sg'
      }
    ]
  }
};
