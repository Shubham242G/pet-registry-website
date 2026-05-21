// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  PawPrint, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Documents", icon: FileText, href: "/dashboard/documents" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Help", icon: HelpCircle, href: "/dashboard/help" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">Tailio</span>
        </div>
      </div>

      {/* User Section */}
      <div className="px-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.username?.charAt(0).toUpperCase() || "R"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.username || "Rahul Sharma"}</p>
              <p className="text-xs text-gray-500">rahul.sharma@example.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
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
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}