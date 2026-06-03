"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  PawPrint, 
  LayoutDashboard, 
  FileText, 
  LogOut,
  ChevronDown,
  Info
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

  // Don't render sidebar if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Get user display info
  const displayName = user?.username || user?.name || "User";
  const displayEmail = user?.email || "";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col overflow-y-auto" style={{ background: '#2C1A0E' }}>

      {/* Logo Section */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">Tailio</span>
        </div>
      </div>

      {/* User Section */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userInitial}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {displayName}
              </p>
              {displayEmail && (
                <p className="text-xs text-orange-400 truncate">
                  {displayEmail}
                </p>
              )}
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#E8600A' : 'transparent',
                  color: isActive ? 'white' : '#E8600A',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(232,96,10,0.2)';
                    e.currentTarget.style.color = '#F4803A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#E8600A';
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Important Information Section */}
      <div className="px-3 py-4 mt-auto">
        <div 
          className="rounded-xl p-4" 
          style={{ 
            backgroundColor: 'rgba(232,96,10,0.1)', 
            border: '1px solid rgba(232,96,10,0.3)'
          }}
        >
          <div className="flex items-start space-x-2 mb-3">
            <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-semibold text-orange-500">Important Information</span>
          </div>
          <ul className="space-y-2">
            <li className="text-xs text-orange-400 flex items-start gap-1.5">
              <span className="text-orange-500">•</span>
              <span>All 4 documents are required to complete the registration process</span>
            </li>
            <li className="text-xs text-orange-400 flex items-start gap-1.5">
              <span className="text-orange-500">•</span>
              <span>Documents can be uploaded in any order and replaced before submission</span>
            </li>
            <li className="text-xs text-orange-400 flex items-start gap-1.5">
              <span className="text-orange-500">•</span>
              <span>Once registration is submitted, documents cannot be modified</span>
            </li>
            <li className="text-xs text-orange-400 flex items-start gap-1.5">
              <span className="text-orange-500">•</span>
              <span>Payment of ₹999 is required to complete registration</span>
            </li>
            <li className="text-xs text-orange-400 flex items-start gap-1.5">
              <span className="text-orange-500">•</span>
              <span>You can pay anytime after uploading all documents</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            width: '100%',
            borderRadius: '8px',
            color: '#E8600A',
            backgroundColor: 'transparent',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.2)';
            e.currentTarget.style.color = '#EF4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#E8600A';
          }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}