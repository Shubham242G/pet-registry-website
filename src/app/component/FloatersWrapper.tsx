'use client';
 
import { useDeviceType } from '../hooks/useDeviceType';
import { useAuth } from './context/AuthContext';
import FloatingRegisterButton from './FloatingRegisterButton';
import WapbizWidget from './WapbizWidget';
 
export default function FloatersWrapper() {
  const isMobile = useDeviceType();
  const { isAuthenticated, loading } = useAuth();
 

 
  // Once auth resolves and user is confirmed logged in → hide everything
  if (!loading && isAuthenticated) return null;
 
  return (
    <>
      {/* Phone/tablet: paw registration button */}
      {isMobile && <FloatingRegisterButton />}
 
      {/* Desktop: WhatsApp widget */}
      {!isMobile && <WapbizWidget />}
    </>
  );
}