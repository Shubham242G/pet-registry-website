"use client";
import { usePathname } from "next/navigation";
import LiveJoinStrip from "./LiveJoiningStrip";

export default function StripWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/dashboard");
  
  // Don't show strip on dashboard pages
  if (isDashboard) {
    return null;
  }
  
  return <LiveJoinStrip />;
}