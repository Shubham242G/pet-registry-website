"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        // FIX: Only try to parse if storedUser exists and is not "undefined"
        try {
          setUser(JSON.parse(storedUser));
        } catch (parseError) {
          console.error("Failed to parse stored user:", parseError);
          // Clear invalid data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const data = await apiFetch("/auth/login", "POST", { email, password });

    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Set state
      setToken(data.token);
      setUser(data.user);
      
      // Return the data so we can await it
      return data;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


  const register = async (username: string, email: string, password: string) => {
    try {
      await apiFetch("/auth/register", "POST", { username, email, password });
      await login(email, password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);