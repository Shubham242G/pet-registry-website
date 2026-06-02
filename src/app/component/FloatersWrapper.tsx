'use client';

import { useDeviceType } from '../hooks/useDeviceType';
import { useAuth } from './context/AuthContext'; // Adjust path as needed
import FloatingRegisterButton from './FloatingRegisterButton';
import WapbizWidget from './WapbizWidget';

export default function FloatersWrapper() {
  const isMobile = useDeviceType();
  const { isAuthenticated } = useAuth(); // Use your auth context
  const isLoggedIn = isAuthenticated;

  return (
    <>
      {/* Registration floater - ONLY on mobile and when NOT logged in */}
      {isMobile && !isLoggedIn && <FloatingRegisterButton />}
      
      {/* WhatsApp floater - ONLY when NOT logged in (visible on both mobile & desktop) */}
      {!isLoggedIn && <WapbizWidget />}
    </>
  );
}