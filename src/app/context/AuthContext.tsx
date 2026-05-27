// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { apiFetch } from "../services/api";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }

//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const data: any = await apiFetch("/auth/login", "POST", { email, password });

//     setToken(data.token);
//     setUser(data.user);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//   };

//   const register = async (username: string, email: string, password: string) => {
//     await apiFetch("/auth/register", "POST", { username, email, password });
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         isAuthenticated: !!token,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

interface User {
  _id: string;
  username: string;
  email: string;
  whatsappNumber?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          // Verify token with backend
          const response = await apiFetch("/auth/verify", "GET", null, storedToken);
          if (response.valid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Email login
  const login = async (email: string, password: string) => {
    const data: any = await apiFetch("/auth/login", "POST", { email, password });

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    return data;
  };

  // Email register
  const register = async (username: string, email: string, password: string) => {
    await apiFetch("/auth/register", "POST", { username, email, password });
  };

  // WhatsApp: Send OTP
  const sendWhatsAppOTP = async (whatsappNumber: string) => {
    try {
      const response = await apiFetch("/whatsapp-auth/send-otp", "POST", { whatsappNumber });
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
          // User exists - login successful
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
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

  // WhatsApp: Complete registration for new users
  const completeWhatsAppRegistration = async (tempToken: string, name: string, username?: string) => {
    try {
      const data = await apiFetch("/whatsapp-auth/complete-registration", "POST", {
        tempToken,
        name,
        username
      });
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: "Registration failed" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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