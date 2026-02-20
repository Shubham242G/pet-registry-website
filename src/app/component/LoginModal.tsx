"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Redirect when authentication state changes
  useEffect(() => {
    if (loginSuccess && isAuthenticated) {
      router.push('/pages/dashboard');
      onClose();
      setLoginSuccess(false);
    }
  }, [loginSuccess, isAuthenticated, router, onClose]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
      setLoginSuccess(true); // This triggers the useEffect
      // REMOVE the router.push from here
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input 
          className="border p-2 w-full" 
          placeholder="Email" 
          onChange={e => setEmail(e.target.value)} 
          disabled={isLoading}
        />
        <input 
          className="border p-2 w-full" 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          disabled={isLoading}
        />
        <button 
          onClick={handleLogin} 
          className="bg-orange-500 text-white w-full py-2 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <button 
          onClick={onSwitchToRegister} 
          className="text-sm text-orange-500"
          disabled={isLoading}
        >
          Switch to Register
        </button>
      </div>
    </div>
  );
}