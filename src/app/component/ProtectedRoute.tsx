// "use client";

// import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function ProtectedRoute({ children }: any) {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push("/");
//     }
//   }, [isAuthenticated, loading, router]);

//   if (loading) return null;

//   return isAuthenticated ? children : null;
// }