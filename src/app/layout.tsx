import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';
import './globals.css';
import Navbar from './component/Navbar';
import Providers from './providers';
import RouteGuard from './component/RouteGuard';
import FloatersWrapper from './component/FloatersWrapper';

const archive = Archivo_Black({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-archive' 
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tailio.in'),
  title: {
    default: 'Tailio - Pet Registration in Delhi NCR | Supreme Court Mandated',
    template: '%s | Tailio'
  },
  description: 'Register your pet in 1 minute. Get verified digital ID, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR. Supreme Court mandated registration.',
  keywords: 'pet registration Delhi, dog license Delhi NCR, pet registration India, Supreme Court pet registration, pet ID card, pet vaccination tracker, register pet online, municipal pet registration, Noida pet registration, Gurugram pet registration, Ghaziabad pet registration',
  authors: [{ name: 'Tailio', url: 'https://www.tailio.in' }],
  creator: 'Tailio',
  publisher: 'Tailio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Tailio - Legal Pet Registration in Delhi NCR',
    description: 'Register your pet in 1 minute - get verified digital ID, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR.',
    url: 'https://www.tailio.in',
    siteName: 'Tailio',
    images: [
      {
        url: 'https://www.tailio.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tailio - Pet Registration Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailio - Pet Registration in Delhi NCR',
    description: 'Register your pet in 1 minute - get verified digital ID and legal compliance',
    images: ['https://www.tailio.in/og-image.jpg'],
    site: '@tailio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.tailio.in',
  },
  category: 'pet-services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archive.variable} font-sans`}>
        <Providers>
            <Navbar />
            <main>{children}</main>
            {/* ── Floaters: WhatsApp on desktop, Register button on mobile ── */}
            <FloatersWrapper />
        </Providers>
      </body>
    </html>
  );
}