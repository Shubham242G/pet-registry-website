"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronDown,
  Info,
} from "lucide-react";
import { useAuth } from "./context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user, isAuthenticated } = useAuth();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Documents", icon: FileText, href: "/documents" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) return null;

  const displayName = user?.username || user?.name || "User";
  const displayEmail = user?.email || "";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: "#2C1A0E", borderTop: "1px solid rgba(232,96,10,0.3)" }}>
        <div className="flex justify-around items-center px-4 py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
                style={{ backgroundColor: isActive ? "#E8600A" : "transparent", color: isActive ? "white" : "#E8600A" }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
            style={{ color: "#E8600A" }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 flex-col overflow-y-auto hidden md:flex" style={{ background: "#2C1A0E" }}>

        {/* User card */}
        <div className="px-4 mt-6 mb-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{userInitial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                {displayEmail && <p className="text-xs text-orange-400 truncate">{displayEmail}</p>}
              </div>
              <ChevronDown className="w-4 h-4 text-orange-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", backgroundColor: isActive ? "#E8600A" : "transparent", color: isActive ? "white" : "#E8600A", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "rgba(232,96,10,0.2)"; e.currentTarget.style.color = "#F4803A"; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E8600A"; } }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Important Information */}
        <div className="px-3 py-3">
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(232,96,10,0.15)", border: "1px solid rgba(232,96,10,0.4)" }}>
            <div className="flex items-start space-x-2 mb-3">
              <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold tracking-wide" style={{ color: "#F97316" }}>IMPORTANT INFORMATION</span>
            </div>
            <ul className="space-y-2">
              {[
                "All 4 documents are required to complete the registration process",
                "Documents can be uploaded in any order and replaced before submission",
                "Once registration is submitted, documents cannot be modified",
                "Payment includes municipal fee + service charge + GST",
                "You can pay anytime after uploading all documents",
              ].map((text, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: "#F97316" }}>
                  <span>•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", width: "100%", borderRadius: "8px", color: "#E8600A", backgroundColor: "transparent", transition: "all 0.2s ease", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.2)"; e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E8600A"; }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <style jsx global>{`
        @media (max-width: 768px) {
          main { padding-bottom: 70px !important; }
        }
      `}</style>
    </>
  );
}