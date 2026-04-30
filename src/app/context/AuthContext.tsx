"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiFetch } from "../services/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  name?: string; 
  email?: string;
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
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper function to normalize user data from any source
  const normalizeUser = useCallback((userData: any): User => {
    return {
      id: userData.id || userData._id,
      username: userData.username || userData.name || "User",
      email: userData.email,
      role: userData.role || "user"
    };
  }, []);

  const validateSession = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (!storedToken || !storedUser) {
      setLoading(false);
      return false;
    }

    try {
      // First, try to parse stored user as fallback
      let parsedUser;
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return false;
      }
      
      // Try to validate with server
      try {
        const response = await apiFetch("/auth/verify", "GET", null, storedToken);
        
        if (response.valid && response.user) {
          const normalizedUser = normalizeUser(response.user);
          setToken(storedToken);
          setUser(normalizedUser);
          // Update localStorage with normalized user
          localStorage.setItem("user", JSON.stringify(normalizedUser));
          return true;
        } else {
          // Token invalid, but maybe we can still use stored user as fallback?
          // For security, better to clear
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          return false;
        }
      } catch (verifyError) {
        console.error("Session validation failed:", verifyError);
        // If server validation fails but we have stored user, use it as fallback
        // This handles cases where backend is temporarily unavailable
        const normalizedUser = normalizeUser(parsedUser);
        setToken(storedToken);
        setUser(normalizedUser);
        return true;
      }
    } catch (error) {
      console.error("Session validation error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [normalizeUser]);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      console.log("Initializing auth - stored token:", !!storedToken);
      console.log("Initializing auth - stored user:", storedUser);
      
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const normalizedUser = normalizeUser(parsedUser);
          setToken(storedToken);
          setUser(normalizedUser);
          console.log("User set from storage:", normalizedUser);
          
          // Validate session in background
          await validateSession();
        } catch (error) {
          console.error("Error initializing auth:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    
    initAuth();
  }, [normalizeUser, validateSession]);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email);
      const data = await apiFetch("/auth/login", "POST", { email, password });
      
      console.log("Login response received:", data);
      console.log("User data from login:", data.user);
      console.log("Username from login:", data.user?.username);

      if (data.token && data.user) {
        const normalizedUser = normalizeUser(data.user);
        console.log("Normalized user:", normalizedUser);
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));

        setToken(data.token);
        setUser(normalizedUser);
        
        console.log("Login successful - User set in state:", normalizedUser);
        return data;
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      console.log("Attempting registration with:", { username, email });
      const data = await apiFetch("/auth/register", "POST", { username, email, password });
      
      console.log("Registration response:", data);
      console.log("User data from registration:", data.user);
      console.log("Username from registration:", data.user?.username);
      
      if (data.token && data.user) {
        const normalizedUser = normalizeUser(data.user);
        console.log("Normalized user:", normalizedUser);
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        
        setToken(data.token);
        setUser(normalizedUser);
        
        console.log("Registration successful - User set in state:", normalizedUser);
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out, clearing user data");
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    setUser(null);
    setToken(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        validateSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);