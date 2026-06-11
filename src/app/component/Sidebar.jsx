"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  PawPrint, 
  LayoutDashboard, 
  FileText, 
  LogOut,
  ChevronDown,
  Info,
  Building2,
  Receipt,
  Calculator
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

  // Get price breakdown based on user's city
  const getPriceBreakdown = () => {
    if (!user?.city) return null;
    
    const isGhaziabad = user.city.toLowerCase() === 'ghaziabad';
    const municipalFee = isGhaziabad ? 1000 : 500;
    const serviceFee = 299;
    const subtotal = municipalFee + serviceFee;
    const cgst = subtotal * 0.08;
    const sgst = subtotal * 0.08;
    const total = subtotal + cgst + sgst;
    
    return { municipalFee, serviceFee, subtotal, cgst, sgst, total, isGhaziabad };
  };

  const priceBreakdown = getPriceBreakdown();

  // Don't render sidebar if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Get user display info
  const displayName = user?.username || user?.name || "User";
  const displayEmail = user?.email || "";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* Mobile Bottom Navigation Bar - Only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: '#2C1A0E', borderTop: '1px solid rgba(232,96,10,0.3)' }}>
        <div className="flex justify-around items-center px-4 py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
                style={{
                  backgroundColor: isActive ? '#E8600A' : 'transparent',
                  color: isActive ? 'white' : '#E8600A',
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
            style={{ color: '#E8600A' }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside 
        className="fixed left-0 top-0 h-full w-64 flex-col overflow-y-auto hidden md:flex" 
        style={{ background: '#2C1A0E' }}
      >

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

        {/* Price Breakdown Section */}
        {priceBreakdown && (
          <div className="px-3 py-3">
            <div 
              className="rounded-xl p-4" 
              style={{ 
                backgroundColor: 'rgba(232,96,10,0.12)', 
                border: '1px solid rgba(232,96,10,0.3)'
              }}
            >
              <div className="flex items-start space-x-2 mb-3">
                <Calculator className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wide" style={{ color: '#F97316' }}>PRICE BREAKDOWN</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: '#F97316' }}>Municipal Fee:</span>
                  <span style={{ color: '#F97316' }}>₹{priceBreakdown.municipalFee}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: '#F97316' }}>Tailio Service:</span>
                  <span style={{ color: '#F97316' }}>₹{priceBreakdown.serviceFee}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: '#F97316' }}>Subtotal:</span>
                  <span style={{ color: '#F97316' }}>₹{priceBreakdown.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: '#F97316' }}>CGST (8%):</span>
                  <span style={{ color: '#F97316' }}>₹{priceBreakdown.cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: '#F97316' }}>SGST (8%):</span>
                  <span style={{ color: '#F97316' }}>₹{priceBreakdown.sgst.toFixed(2)}</span>
                </div>
                <div className="border-t border-orange-500/30 pt-2 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold" style={{ color: '#F97316' }}>Total Amount:</span>
                    <span className="text-sm font-bold" style={{ color: '#FF8C42' }}>₹{priceBreakdown.total.toFixed(2)}</span>
                  </div>
                </div>
                {priceBreakdown.isGhaziabad ? (
                  <p className="text-xs mt-2" style={{ color: '#FDA04E' }}>
                    ℹ️ Ghaziabad: ₹1,000 GMC fee
                  </p>
                ) : (
                  <p className="text-xs mt-2" style={{ color: '#FDA04E' }}>
                    ℹ️ Standard: ₹500 municipal fee
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Important Information Section */}
        <div className="px-3 py-2">
          <div 
            className="rounded-xl p-4" 
            style={{ 
              backgroundColor: 'rgba(232,96,10,0.15)', 
              border: '1px solid rgba(232,96,10,0.4)'
            }}
          >
            <div className="flex items-start space-x-2 mb-3">
              <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#F97316' }}>IMPORTANT INFORMATION</span>
            </div>
            <ul className="space-y-2">
              <li className="text-xs flex items-start gap-1.5" style={{ color: '#F97316' }}>
                <span style={{ color: '#F97316' }}>•</span>
                <span>All 4 documents are required to complete the registration process</span>
              </li>
              <li className="text-xs flex items-start gap-1.5" style={{ color: '#F97316' }}>
                <span style={{ color: '#F97316' }}>•</span>
                <span>Documents can be uploaded in any order and replaced before submission</span>
              </li>
              <li className="text-xs flex items-start gap-1.5" style={{ color: '#F97316' }}>
                <span style={{ color: '#F97316' }}>•</span>
                <span>Once registration is submitted, documents cannot be modified</span>
              </li>
              <li className="text-xs flex items-start gap-1.5" style={{ color: '#F97316' }}>
                <span style={{ color: '#F97316' }}>•</span>
                <span>Payment includes municipal fee + service charge + GST (18%)</span>
              </li>
              <li className="text-xs flex items-start gap-1.5" style={{ color: '#F97316' }}>
                <span style={{ color: '#F97316' }}>•</span>
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

      {/* Add padding to main content on mobile to account for bottom nav */}
      <style jsx global>{`
        @media (max-width: 768px) {
          main {
            padding-bottom: 70px !important;
          }
        }
      `}</style>
    </>
  );
}