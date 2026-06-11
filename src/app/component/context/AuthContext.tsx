"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { apiFetch } from "../../services/api";
import { useRouter, usePathname } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  whatsappNumber?: string;
  name?: string;
  role?: string;
  city?: string;
  pricingTier?: string;
  registrationFee?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, city: string) => Promise<void>;
  logout: (reason?: string) => void;
  validateSession: () => Promise<boolean>;
  sendWhatsAppOTP: (whatsappNumber: string) => Promise<{ success: boolean; error?: string }>;
  verifyWhatsAppOTP: (whatsappNumber: string, otpCode: string) => Promise<{
    success: boolean;
    requiresRegistration?: boolean;
    tempToken?: string;
    error?: string;
  }>;
  completeWhatsAppRegistration: (tempToken: string, name: string, username?: string, city?: string, registrationFee?: number) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Session config
const SESSION_DURATION_MS   = 8 * 60 * 60 * 1000;  // 8 hours
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;      // 30 min inactivity

const setCookie = (name: string, value: string, hours: number = 8) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  for (const cookie of document.cookie.split(';')) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return value || null;
  }
  return null;
};

const removeCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

const clearAllAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("lastActivity");
  removeCookie("token");
  removeCookie("user");
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [token, setToken]     = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router   = useRouter();
  const pathname = usePathname();

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    clearAllAuthStorage();
  }, []);

  const logout = useCallback((reason?: string) => {
    clearSession();
    router.push("/");
  }, [clearSession, router]);

  const validateSession = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token") || getCookie("token");
    if (!storedToken) return false;

    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (!tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
      clearSession();
      return false;
    }

    const lastActivity = localStorage.getItem("lastActivity");
    if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT_MS) {
      clearSession();
      return false;
    }

    try {
      const response = await apiFetch("/auth/verify", "GET", null, storedToken);
      if (response.valid) {
        const storedUser = localStorage.getItem("user");
        setToken(storedToken);
        setUser(response.user || (storedUser ? JSON.parse(storedUser) : null));
        localStorage.setItem("lastActivity", Date.now().toString());
        return true;
      } else {
        clearSession();
        return false;
      }
    } catch {
      clearSession();
      return false;
    }
  }, [clearSession]);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      const storedToken = localStorage.getItem("token") || getCookie("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (!tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
        clearSession();
        setLoading(false);
        return;
      }

      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT_MS) {
        clearSession();
        setLoading(false);
        return;
      }

      await validateSession();
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!token) return;

    let inactivityTimer: NodeJS.Timeout;

    const recordActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout("inactivity");
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach(e => window.addEventListener(e, recordActivity, { passive: true }));

    recordActivity();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(e => window.removeEventListener(e, recordActivity));
    };
  }, [token, logout]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        setToken(null);
        setUser(null);
        router.push("/");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  useEffect(() => {
    const handleNavigation = () => {
      if (!token) return;

      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (!tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
        logout("expired");
        return;
      }

      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT_MS) {
        logout("inactivity");
      }
    };

    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("pageshow", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("pageshow", handleNavigation);
    };
  }, [token, logout]);

  const saveAuthData = (authToken: string, authUser: any) => {
    const expiry = Date.now() + SESSION_DURATION_MS;
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authUser));
    localStorage.setItem("tokenExpiry", expiry.toString());
    localStorage.setItem("loginTime", Date.now().toString());
    localStorage.setItem("lastActivity", Date.now().toString());
    setCookie("token", authToken, 8);
    setCookie("user", JSON.stringify(authUser), 8);
    setToken(authToken);
    setUser(authUser);
  };

  // Email login
  const login = async (email: string, password: string) => {
    const data: any = await apiFetch("/auth/login", "POST", { email, password });
    saveAuthData(data.token, data.user);
    return data;
  };

  // Email register - UPDATED to include city
  const register = async (username: string, email: string, password: string, city: string) => {
    const data: any = await apiFetch("/auth/register", "POST", { username, email, password, city });
    if (data.token) {
      saveAuthData(data.token, data.user);
    }
    return data;
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
      const data = await apiFetch("/whatsapp-auth/verify-otp", "POST", { whatsappNumber, otpCode });
      if (data.success) {
        if (!data.requiresRegistration) {
          saveAuthData(data.token, data.user);
        }
        return {
          success: true,
          requiresRegistration: data.requiresRegistration,
          tempToken: data.tempToken,
        };
      }
      return { success: false, error: "Verification failed" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // WhatsApp: Complete registration - UPDATED to include registrationFee
  const completeWhatsAppRegistration = async (tempToken: string, name: string, username?: string, city?: string, registrationFee?: number) => {
    try {
      const data = await apiFetch("/whatsapp-auth/complete-registration", "POST", { 
        tempToken, 
        name, 
        username, 
        city, 
        registrationFee 
      });
      if (data.success) {
        saveAuthData(data.token, data.user);
        return { success: true };
      }
      return { success: false, error: "Registration failed" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
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
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);