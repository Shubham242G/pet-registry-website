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
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: (reason?: string) => void;
  validateSession: () => Promise<boolean>;
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

// ── Session config ────────────────────────────────────────────────────────────
const SESSION_DURATION_MS   = 8 * 60 * 60 * 1000;  // 8 hours — token lifetime
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;       // 30 min inactivity → logout
// ─────────────────────────────────────────────────────────────────────────────

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

  // ── Internal logout (no router.push — called from effects) ───────────────
  // The public `logout` below calls this then redirects.
  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    clearAllAuthStorage();
  }, []);

  // ── Public logout ─────────────────────────────────────────────────────────
  const logout = useCallback((reason?: string) => {
    clearSession();
    router.push("/");
  }, [clearSession, router]);

  // ── Validate session: checks BOTH expiry AND backend ─────────────────────
  const validateSession = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token") || getCookie("token");
    if (!storedToken) return false;

    // ── Hard expiry check — no network call needed ────────────────────────
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (!tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
      // Token is expired or missing expiry — clear immediately, don't verify
      clearSession();
      return false;
    }

    // ── Inactivity check — if user was idle > 30 min, clear session ───────
    const lastActivity = localStorage.getItem("lastActivity");
    if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT_MS) {
      clearSession();
      return false;
    }

    // ── Backend verification ──────────────────────────────────────────────
    try {
      const response = await apiFetch("/auth/verify", "GET", null, storedToken);
      if (response.valid) {
        const storedUser = localStorage.getItem("user");
        setToken(storedToken);
        setUser(response.user || (storedUser ? JSON.parse(storedUser) : null));
        // Update last activity on successful verify
        localStorage.setItem("lastActivity", Date.now().toString());
        return true;
      } else {
        // Backend says token is invalid — clear everything
        clearSession();
        return false;
      }
    } catch {
      // Network error — do NOT keep the session alive.
      // If we can't verify, we clear. This is stricter but safer.
      clearSession();
      return false;
    }
  }, [clearSession]);

  // ── Init: run once on mount ───────────────────────────────────────────────
  // This is the ONLY place that reads from storage on page load.
  // If validation fails for any reason, storage is cleared and user
  // starts as logged out — no silent persistence across closed tabs.
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      // Fast path: if no token at all, skip the network call
      const storedToken = localStorage.getItem("token") || getCookie("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      // Hard expiry check before making any network call
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (!tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
        clearSession();
        setLoading(false);
        return;
      }

      // Inactivity check on page load
      // If the user closed the tab > 30 min ago, last activity will be old
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_TIMEOUT_MS) {
        clearSession();
        setLoading(false);
        return;
      }

      // Full backend validation
      await validateSession();
      setLoading(false);
    };

    initAuth();
  }, []); // empty dep array — runs once on mount only

  // ── Inactivity timer ──────────────────────────────────────────────────────
  // Tracks user activity. On each activity event, updates localStorage
  // with current timestamp. If 30 min passes with no event, logs out.
  useEffect(() => {
    if (!token) return; // only run when logged in

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

    // Start the timer immediately
    recordActivity();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(e => window.removeEventListener(e, recordActivity));
    };
  }, [token, logout]);

  // ── Cross-tab logout ──────────────────────────────────────────────────────
  // If token is removed in another tab (logout), this tab clears too.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        // Another tab cleared the token — sync this tab
        setToken(null);
        setUser(null);
        router.push("/");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  // ── Route change revalidation ─────────────────────────────────────────────
  // On back/forward navigation, recheck if session is still valid.
  // Does NOT call backend — only checks local expiry and inactivity.
  // This prevents a logged-out user from navigating back to a protected page.
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

  // ── Helper: save auth data after login ───────────────────────────────────
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

  // ── Email login ───────────────────────────────────────────────────────────
  const login = async (email: string, password: string) => {
    const data: any = await apiFetch("/auth/login", "POST", { email, password });
    saveAuthData(data.token, data.user);
    return data;
  };

  // ── Email register ────────────────────────────────────────────────────────
  const register = async (username: string, email: string, password: string) => {
    await apiFetch("/auth/register", "POST", { username, email, password });
  };

  // ── WhatsApp: Send OTP ────────────────────────────────────────────────────
  const sendWhatsAppOTP = async (whatsappNumber: string) => {
    try {
      await apiFetch("/whatsapp-auth/send-otp", "POST", { whatsappNumber });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // ── WhatsApp: Verify OTP ──────────────────────────────────────────────────
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

  // ── WhatsApp: Complete registration ──────────────────────────────────────
  const completeWhatsAppRegistration = async (tempToken: string, name: string, username?: string) => {
    try {
      const data = await apiFetch("/whatsapp-auth/complete-registration", "POST", { tempToken, name, username });
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