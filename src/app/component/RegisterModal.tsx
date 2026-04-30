"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: any) {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/pages/dashboard');
      onClose();
    }
  }, [isAuthenticated, router, onClose]);

  if (!isOpen) return null;

  const handleRegister = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await register(username, email, password);
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
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

        <h2 className="text-xl font-bold text-gray-800">Create an Account</h2>
        
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        {/* Username Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Username</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
            placeholder="Choose a username" 
            value={username}
            onChange={e => setUsername(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
            type="email"
            placeholder="Enter your email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
            type="password" 
            placeholder="Create a password" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        <button 
          onClick={handleRegister} 
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
        
        <button 
          onClick={onSwitchToLogin} 
          className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
          disabled={isLoading}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}