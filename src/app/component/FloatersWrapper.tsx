'use client';
 
import { useAuth } from './context/AuthContext';
import WapbizWidget from './WapbizWidget';
 
export default function FloatersWrapper() {
  const { isAuthenticated, loading } = useAuth();
 
  // Don't show anything while auth is loading
  if (loading) return null;
 
  // Show widget only when user is NOT authenticated
  return !isAuthenticated ? <WapbizWidget /> : null;
}