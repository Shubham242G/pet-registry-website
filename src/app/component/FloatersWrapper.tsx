'use client';
 
import { useDeviceType } from '../hooks/useDeviceType';
import { useAuth } from './context/AuthContext';
import WapbizWidget from './WapbizWidget';
 
export default function FloatersWrapper() {
  const { isAuthenticated, loading } = useAuth();
 
  // Once auth resolves and user is confirmed logged in → hide everything
  if (!loading && isAuthenticated) return null;
 
  return <WapbizWidget />;
}