"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiFetch } from "../../services/api";
import { useRouter, usePathname } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  whatsappNumber?: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
  // WhatsApp Auth Methods
  sendWhatsAppOTP: (whatsappNumber: string) => Promise<{ success: boolean; error?: string }>;
  verifyWhatsAppOTP: (whatsappNumber: string, otpCode: string) => Promise<{ 
    success: boolean; 
    requiresRegistration?: boolean; 
    tempToken?: string; 
    error?: string;
  }>;
  completeWhatsAppRegistration: (tempToken: string, name: string, username?: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return value;
  }
  return null;
};

const removeCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Validate session with backend
  const validateSession = useCallback(async (): Promise<boolean> => {
    // Try to get token from localStorage first, then cookie
    let storedToken = localStorage.getItem("token");
    
    if (!storedToken) {
      storedToken = getCookie("token");
    }
    
    const storedUser = localStorage.getItem("user");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (!storedToken) {
      return false;
    }

    // Client-side expiry check
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      console.log("Token expired");
      logout();
      return false;
    }

    try {
      const response = await apiFetch("/auth/verify", "GET", null, storedToken);
      
      if (response.valid) {
        // Refresh token expiry (7 days from now)
        const expiry = (Date.now() + 7 * 24 * 60 * 60 * 1000).toString();
        localStorage.setItem("tokenExpiry", expiry);
        setToken(storedToken);
        setUser(response.user || JSON.parse(storedUser || "{}"));
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error("Session validation error:", error);
      return false;
    }
  }, []);

useEffect(() => {
  let inactivityTimer: NodeJS.Timeout;
  
  const resetTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    // Set timeout for 30 minutes of inactivity
    inactivityTimer = setTimeout(() => {
      if (token) {
        console.log('Session timeout due to inactivity');
        logout();
      }
    }, 30 * 60 * 1000); // 30 minutes
  };
  
  // Reset timer on user activity
  const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  events.forEach(event => {
    window.addEventListener(event, resetTimer);
  });
  
  resetTimer();
  
  return () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    events.forEach(event => {
      window.removeEventListener(event, resetTimer);
    });
  };
}, [token]);

  // Initialize auth from localStorage with validation
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const isValid = await validateSession();
      if (!isValid) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiry");
        removeCookie("token");
        setToken(null);
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, [validateSession]);

  // Listen for route changes (back/forward buttons)
  useEffect(() => {
    const handleRouteChange = () => {
      if (token) {
        validateSession();
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pageshow", handleRouteChange);
    
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pageshow", handleRouteChange);
    };
  }, [token, validateSession]);

  // Listen for storage events (cross-tab logout)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        removeCookie("token");
        setToken(null);
        setUser(null);
        router.push("/");
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  // Email login
  const login = async (email: string, password: string) => {
    const data: any = await apiFetch("/auth/login", "POST", { email, password });

    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    
    // Store in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("tokenExpiry", expiry.toString());
    localStorage.setItem("loginTime", Date.now().toString());
    
    // Store in cookie for middleware
    setCookie("token", data.token, 7);
    setCookie("user", JSON.stringify(data.user), 7);
    
    setToken(data.token);
    setUser(data.user);
    
    return data;
  };

  // Email register
  const register = async (username: string, email: string, password: string) => {
    await apiFetch("/auth/register", "POST", { username, email, password });
  };

  // WhatsApp: Send OTP
  const sendWhatsAppOTP = async (whatsappNumber: string) => {
    try {
      await apiFetch("/whatsapp-auth/send-otp", "POST", { whatsappNumber });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // WhatsApp: Verify OTP
  const verifyWhatsAppOTP = async (whatsappNumber: string, otpCode: string) => {
    try {
      const data = await apiFetch("/whatsapp-auth/verify-otp", "POST", { 
        whatsappNumber, 
        otpCode 
      });
      
      if (data.success) {
        if (!data.requiresRegistration) {
          const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("tokenExpiry", expiry.toString());
          setCookie("token", data.token, 7);
          setCookie("user", JSON.stringify(data.user), 7);
          setToken(data.token);
          setUser(data.user);
        }
        return { 
          success: true, 
          requiresRegistration: data.requiresRegistration,
          tempToken: data.tempToken 
        };
      }
      return { success: false, error: "Verification failed" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // WhatsApp: Complete registration
  const completeWhatsAppRegistration = async (tempToken: string, name: string, username?: string) => {
    try {
      const data = await apiFetch("/whatsapp-auth/complete-registration", "POST", {
        tempToken,
        name,
        username
      });
      
      if (data.success) {
        const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("tokenExpiry", expiry.toString());
        setCookie("token", data.token, 7);
        setCookie("user", JSON.stringify(data.user), 7);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: "Registration failed" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Logout - clears everything
  const logout = () => {
    setToken(null);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("loginTime");
    
    // Clear cookies
    removeCookie("token");
    removeCookie("user");
    
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        validateSession,
        sendWhatsAppOTP,
        verifyWhatsAppOTP,
        completeWhatsAppRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);