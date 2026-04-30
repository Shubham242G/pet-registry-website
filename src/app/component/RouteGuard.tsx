"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
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

  return <>{children}</>;
}