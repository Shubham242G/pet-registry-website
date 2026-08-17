import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';
import './globals.css';
import Navbar from './component/Navbar';
import Providers from './providers';
import FloatersWrapper from './component/FloatersWrapper';
import Script from 'next/script';

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
    google: 'D8i1leGlpnjS5AigMfVS9SveUXmAxlEehoiBRtevFUE',
  },
  alternates: {
    canonical: 'https://www.tailio.in',
  },
  category: 'pet-services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="D8i1leGlpnjS5AigMfVS9SveUXmAxlEehoiBRtevFUE" />
        
        {/* ✅ META PIXEL - CORRECT ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3260552794191537');
              fbq('track', 'PageView');
            `
          }}
        />
        
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3260552794191537&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${archive.variable} font-sans`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PD6GYVXKZJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PD6GYVXKZJ');
            `,
          }}
        />
        
        <Providers>
          <Navbar />
          <main>{children}</main>
          <FloatersWrapper />
        </Providers>
      </body>
    </html>
  );
}