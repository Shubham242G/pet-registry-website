import { useState, useEffect } from 'react';
 
export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
   
    const checkDevice = () => {
      const ua = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
      setIsMobile(isMobileDevice);
    };
 
    checkDevice();
 
    // No resize listener needed — device type doesn't change on resize
  }, []);
 
  return isMobile;
}