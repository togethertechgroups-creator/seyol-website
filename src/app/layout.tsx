import type { Metadata } from 'next';
import { Playfair_Display, Lato, Cinzel } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { QuickEnquiryModal } from '../components/interactive/QuickEnquiryModal';
import { CartProvider } from '../context/CartContext';
import { VideoAuthProvider } from '../context/VideoAuthContext';
import { BookingModalProvider } from '../context/BookingModalContext';
import { QuickEnquiryProvider } from '../context/QuickEnquiryContext';
import { VisitorJourneyProvider } from '../context/VisitorJourneyContext';
import { AuthProvider } from '../context/AuthContext';
import { AdminDataProvider } from '../context/AdminDataContext';
import { PortalDataProvider } from '../context/PortalDataContext';
import { AnnouncementTicker, StickyJourneyCTA, FloatingHelpWidget } from '../components/seyol';
import { BookingWizardModal } from '../components/booking/BookingWizardModal';
import { PortalAuthModal } from '../components/auth/PortalAuthModal';
import { ScrollObserver } from '../components/shared/ScrollObserver';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const garet = localFont({
  src: '../../public/fonts/Garet-Medium.otf',
  variable: '--font-garet',
  display: 'swap',
});

const josephSophia = localFont({
  src: '../../public/fonts/josephsophia.otf',
  variable: '--font-josephsophia',
  display: 'swap',
});

const helloValentina = localFont({
  src: '../../public/fonts/hello-valentina.ttf',
  variable: '--font-valentina',
  display: 'swap',
});

const rusticDelight = localFont({
  src: '../../public/fonts/rustic-delight.ttf',
  variable: '--font-rustic-delight',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SEYOL | Traditional Indian Mother & Baby Care',
  description:
    'Dedicated traditional Indian mother and newborn care serving modern families across pregnancy, birth, postpartum confinement, and infant bodywork.',
  keywords: [
    'postpartum massage Chennai',
    'confinement care Tamil Nadu',
    'infant massage classes',
    'traditional belly binding kattu',
    'birth doula Chennai',
    'SEY baby massage oil',
    'nalangu maavu bath powder',
  ],
  authors: [{ name: 'SEYOL Mother & Baby Care' }],
  openGraph: {
    title: 'SEYOL | Traditional Indian Mother & Baby Care',
    description:
      'Harmonising time-honoured postpartum traditions with evidence-informed clinical safety for mother and newborn.',
    url: 'https://seyolpregnancycare.com',
    siteName: 'SEYOL',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${garet.variable} ${playfair.variable} ${lato.variable} ${cinzel.variable} ${josephSophia.variable} ${helloValentina.variable} ${rusticDelight.variable}`}>
      <body className="bg-cream text-brown min-h-screen flex flex-col antialiased selection:bg-maroon selection:text-cream-light">
        <AuthProvider>
          <VisitorJourneyProvider>
            <CartProvider>
              <VideoAuthProvider>
                <AdminDataProvider>
                  <PortalDataProvider>
                  <BookingModalProvider>
                    <QuickEnquiryProvider>
                      <Header />
                      <ScrollObserver />
                      <main className="flex-1 w-full">{children}</main>
                      <Footer />
                      <CartDrawer />
                      <QuickEnquiryModal />
                      <BookingWizardModal />
                      <PortalAuthModal />
                      <StickyJourneyCTA />
                      <FloatingHelpWidget />
                    </QuickEnquiryProvider>
                  </BookingModalProvider>
                  </PortalDataProvider>
                </AdminDataProvider>
              </VideoAuthProvider>
            </CartProvider>
          </VisitorJourneyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
