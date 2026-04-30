"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading, validateSession } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        // Validate session with server
        const isValid = await validateSession();
        
        if (!isValid) {
          router.push('/');
          return;
        }

        if (allowedRoles && user && !allowedRoles.includes(user.role || 'user')) {
          router.push('/');
          return;
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, loading, router, allowedRoles, user, validateSession]);

  // Show nothing while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}