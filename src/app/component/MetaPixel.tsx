'use client';

import Script from 'next/script';

export default function MetaPixel() {
  const PIXEL_ID = '1718086156187230';

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
            }
            window.fbq('init', '${PIXEL_ID}');
            window.fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}