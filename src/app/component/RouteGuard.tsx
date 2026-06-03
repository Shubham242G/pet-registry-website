"use client";
 
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
 
export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
 
  useEffect(() => {
    const protectedRoutes = ["/pages/dashboard", "/pages/pets"];
    const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
 
    if (!loading && isProtectedRoute && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, pathname, router]);
 
 
  const protectedRoutes = ["/pages/dashboard", "/pages/pets"];
  const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
 
  if (loading && isProtectedRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
 
  return <>{children}</>;
}