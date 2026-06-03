'use client';

import { useDeviceType } from '../hooks/useDeviceType';
import { useAuth } from './context/AuthContext';
import FloatingRegisterButton from './FloatingRegisterButton';
import WapbizWidget from './WapbizWidget';

export default function FloatersWrapper() {
  const isMobile = useDeviceType();
  const { isAuthenticated, loading } = useAuth();


  if (isAuthenticated) return null;

  return (
    <>
      {/* Mobile only: paw registration button */}
      {isMobile && <FloatingRegisterButton />}

      {/* Desktop only: WhatsApp widget */}
      {/* {!isMobile && <WapbizWidget />} */}
    </>
  );
}