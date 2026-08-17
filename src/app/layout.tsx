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
  // ... your metadata (keep as is)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="D8i1leGlpnjS5AigMfVS9SveUXmAxlEehoiBRtevFUE" />
        
        {/* ✅ META PIXEL - Direct script in head */}
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
              fbq('init', '1718086156187230');
              fbq('track', 'PageView');
            `
          }}
        />
        
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1718086156187230&ev=PageView&noscript=1"
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