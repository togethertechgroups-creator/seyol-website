/**
 * Utility to generate and download authentic SEYOL guides.
 * If a custom file was uploaded by the admin (data URL or http URL), it downloads that file directly.
 * If not, it builds a valid, formatted PDF document containing SEYOL brand styling, personalized
 * recipient info, chapter guidance, and instructions.
 */

export interface DownloadGuideOptions {
  title: string;
  subtitle: string;
  stageLabel: string;
  badge: string;
  fileName: string;
  fileUrl?: string;
  userName: string;
  userEmail: string;
  highlights?: string[];
}

export function downloadGuideFile(options: DownloadGuideOptions): void {
  const { title, subtitle, stageLabel, badge, fileName, fileUrl, userName, userEmail, highlights } = options;

  // 1. If admin uploaded a file (Data URL or external link)
  if (fileUrl && fileUrl.trim().length > 0) {
    if (fileUrl.startsWith('data:') || fileUrl.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName || 'SEYOL-Guide.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    } else {
      // External URL
      const a = document.createElement('a');
      a.href = fileUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = fileName || 'SEYOL-Guide.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
  }

  // 2. Generate a valid, high-fidelity PDF Blob for the selected stage guide
  const cleanTitle = title.replace(/^Download\s*"/i, '').replace(/"$/i, '');
  const pdfBlob = createSeyolGuidePdf({
    title: cleanTitle,
    subtitle,
    stageLabel,
    badge,
    userName,
    userEmail,
    highlights: highlights || ['Instant PDF Download', '40-Day Meal Planner', '100% Free • No Spam'],
  });

  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || `${cleanTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Generates a clean, valid PDF 1.4 binary blob without any external dependencies.
 */
function createSeyolGuidePdf(data: {
  title: string;
  subtitle: string;
  stageLabel: string;
  badge: string;
  userName: string;
  userEmail: string;
  highlights: string[];
}): Blob {
  const escapePdfText = (str: string) => {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Build stream content using PDF text and drawing operators
  const streamLines: string[] = [
    // Header Banner / Border top
    '0.482 0.067 0.192 rg', // Maroon fill (#7B1131)
    '0 740 595 102 re', // top header rect
    'f',
    // Header text
    '1 1 1 rg', // White text
    'BT',
    '/F2 20 Tf',
    '40 805 Td',
    '(SEYOL - MATERNAL & INFANT CARE SANCTUARY) Tj',
    'ET',
    'BT',
    '/F1 10 Tf',
    '40 788 Td',
    '(TRADITIONAL SOUTH INDIAN CONFINEMENT & POSTPARTUM WISDOM) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '40 765 Td',
    `(${escapePdfText('Issued to: ' + data.userName + ' <' + data.userEmail + '>  |  ' + currentDate)}) Tj`,
    'ET',

    // Gold accent divider
    '0.831 0.686 0.216 rg', // Gold fill (#D4AF37)
    '0 735 595 5 re',
    'f',

    // Badge Pill
    '0.95 0.93 0.88 rg', // Soft cream
    '40 695 240 24 re',
    'f',
    '0.482 0.067 0.192 rg',
    'BT',
    '/F2 9 Tf',
    '50 703 Td',
    `(${escapePdfText(data.badge.toUpperCase())}) Tj`,
    'ET',

    // Title
    '0.2 0.1 0.05 rg', // Deep brown text
    'BT',
    '/F2 16 Tf',
    '40 660 Td',
    `(${escapePdfText(data.title)}) Tj`,
    'ET',

    // Stage Label
    '0.482 0.067 0.192 rg', // Maroon
    'BT',
    '/F2 11 Tf',
    '40 638 Td',
    `(${escapePdfText('Target Stage: ' + data.stageLabel)}) Tj`,
    'ET',

    // Subtitle / Description
    '0.3 0.25 0.2 rg',
    'BT',
    '/F1 10 Tf',
    '40 610 Td',
    `(${escapePdfText(data.subtitle.substring(0, 100))}) Tj`,
    'ET',
    'BT',
    '/F1 10 Tf',
    '40 595 Td',
    `(${escapePdfText(data.subtitle.substring(100, 200))}) Tj`,
    'ET',

    // Key Highlights Section Box
    '0.97 0.96 0.94 rg',
    '40 480 515 95 re',
    'f',
    '0.831 0.686 0.216 rg',
    '40 480 5 95 re',
    'f',
    '0.482 0.067 0.192 rg',
    'BT',
    '/F2 11 Tf',
    '55 555 Td',
    '(KEY CURATED TOOLKITS IN THIS EDITION:) Tj',
    'ET',
  ];

  let yOffset = 535;
  data.highlights.forEach((h) => {
    streamLines.push(
      '0.2 0.2 0.2 rg',
      'BT',
      '/F1 10 Tf',
      `55 ${yOffset} Td`,
      `([*]  ${escapePdfText(h)}) Tj`,
      'ET'
    );
    yOffset -= 18;
  });

  // Chapter Overview
  streamLines.push(
    '0.482 0.067 0.192 rg',
    'BT',
    '/F2 13 Tf',
    '40 440 Td',
    '(HANDBOOK CONTENTS & ACTION CHECKLIST) Tj',
    'ET',
    '0.85 0.85 0.85 rg',
    '40 432 515 1 re',
    'f',
    '0.2 0.2 0.2 rg',
    'BT',
    '/F2 10 Tf',
    '40 410 Td',
    '(Chapter 1: The Sacred Mandalam Recovery Window) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '40 395 Td',
    '(The physiological principles of South Indian 40-day postpartum recuperation, pelvic warmth, and uterine involution.) Tj',
    'ET',

    'BT',
    '/F2 10 Tf',
    '40 370 Td',
    '(Chapter 2: Restorative Botanical Nutrition & Warm Dietetics) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '40 355 Td',
    '(Traditional confinement menu blueprint, lactation broths, warming cumin-pepper concoctions, and digestion-preserving spices.) Tj',
    'ET',

    'BT',
    '/F2 10 Tf',
    '40 330 Td',
    '(Chapter 3: Herbal Steam Fomentation (Kizhi) & Vethu Kuli) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '40 315 Td',
    '(Therapeutic protocol for herbal steam compresses, soothing back strain, relieving stiffness, and restoring joint strength.) Tj',
    'ET',

    'BT',
    '/F2 10 Tf',
    '40 290 Td',
    '(Chapter 4: Traditional Infant Thokkanam Massage & Soothing Baths) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '40 275 Td',
    '(Gentle daily baby strokes, colic gas release holds, safe water temperature checks, and comforting bedtime bonding.) Tj',
    'ET',

    // Founder Seal & Verification
    '0.96 0.94 0.90 rg',
    '40 180 515 70 re',
    'f',
    '0.482 0.067 0.192 rg',
    'BT',
    '/F2 10 Tf',
    '55 230 Td',
    '(OFFICIAL SEYOL CONFINEMENT SANCTUARY ENDORSEMENT) Tj',
    'ET',
    'BT',
    '/F1 9 Tf',
    '55 212 Td',
    '(Curated under the guidance of Mrs. Jemma Francis - Founder, Certified Childbirth Educator & Doula (Singapore & India).) Tj',
    'ET',
    'BT',
    '/F1 8.5 Tf',
    '55 195 Td',
    '(For personalized in-home visits, confinement nanny bookings, or masterclasses: visit https://seyol.com or call our care desk.) Tj',
    'ET',

    // Footer
    '0.482 0.067 0.192 rg',
    '0 0 595 40 re',
    'f',
    '1 1 1 rg',
    'BT',
    '/F1 8.5 Tf',
    '40 16 Td',
    '(Confidential • Distributed exclusively for registered SEYOL families • Chennai | Coimbatore | Bangalore | Singapore) Tj',
    'ET'
  );

  const streamContent = streamLines.join('\n');
  const streamLength = streamContent.length;

  // Build PDF Objects
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 =
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> >>\nendobj\n';
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`;

  const header = '%PDF-1.4\n';

  // Calculate byte offsets for xref
  const offset0 = 0;
  const offset1 = header.length;
  const offset2 = offset1 + obj1.length;
  const offset3 = offset2 + obj2.length;
  const offset4 = offset3 + obj3.length;
  const xrefOffset = offset4 + obj4.length;

  const pad10 = (n: number) => n.toString().padStart(10, '0');

  const xref =
    `xref\n` +
    `0 5\n` +
    `0000000000 65535 f \n` +
    `${pad10(offset1)} 00000 n \n` +
    `${pad10(offset2)} 00000 n \n` +
    `${pad10(offset3)} 00000 n \n` +
    `${pad10(offset4)} 00000 n \n`;

  const trailer =
    `trailer\n` +
    `<< /Size 5 /Root 1 0 R >>\n` +
    `startxref\n` +
    `${xrefOffset}\n` +
    `%%EOF\n`;

  const fullPdf = header + obj1 + obj2 + obj3 + obj4 + xref + trailer;

  return new Blob([fullPdf], { type: 'application/pdf' });
}
