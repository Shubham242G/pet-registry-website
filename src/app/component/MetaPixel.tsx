'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';

// ✅ Add this type declaration
declare global {
  interface Window {
    fbq: any;
  }
}

const FB_PIXEL_ID = '1718086156187230';

function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        id="fb-sdk"
      />
      <Script
        id="fb-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.fbq) {
              window.fbq = function() {
                (window.fbq.queue = window.fbq.queue || []).push(arguments);
              };
              window.fbq.queue = [];
            }
            window.fbq('init', '${FB_PIXEL_ID}');
            window.fbq('track', 'PageView');
          `,
        }}
      />
      <Suspense fallback={null}>
        <PixelTracker />
      </Suspense>
    </>
  );
}