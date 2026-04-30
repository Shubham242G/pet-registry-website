"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { validateSession, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const validateRoute = async () => {
      // Skip validation on home page and public routes
      const publicRoutes = ['/', '/pages/blogs', '/pages/contact'];
      const isPublicRoute = publicRoutes.includes(pathname || '');
      
      if (!isPublicRoute && !loading) {
        const isValid = await validateSession();
        if (!isValid) {
          router.push('/');
        }
      }
    };
    
    validateRoute();
  }, [pathname, validateSession, router, loading]);

  return <>{children}</>;
}