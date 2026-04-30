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

  // Redirect when authentication is successful
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
      setLoginSuccess(true); // This triggers the redirect
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800">Login</h2>
        
        {/* Email Input with Label */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
            type="email"
            placeholder="Enter your email" 
            onChange={e => setEmail(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        {/* Password Input with Label */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
            type="password" 
            placeholder="Enter your password" 
            onChange={e => setPassword(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        <button 
          onClick={handleLogin} 
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <button 
          onClick={onSwitchToRegister} 
          className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
          disabled={isLoading}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}