"use client";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register, login, sendWhatsAppOTP, verifyWhatsAppOTP, completeWhatsAppRegistration } = useAuth();
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"email" | "whatsapp">("whatsapp");
  const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
  
  // Email registration state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // WhatsApp registration state
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [name, setName] = useState("");
  const [waUsername, setWaUsername] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isOpen) return null;

  // Handle Email Registration
  const handleEmailRegister = async () => {
    setErrorMessage("");
    
    if (!username || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setIsLoading(true);

    try {
      await register(username, email, password);
      await login(email, password);
      router.push("/dashboard");
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
      setIsLoading(false);
    }
  };

  // Send WhatsApp OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    const result = await sendWhatsAppOTP(whatsappNumber);
    
    if (result.success) {
      setStep("otp");
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMessage(result.error || "Failed to send OTP");
    }
    setIsLoading(false);
  };

  // Verify OTP and complete registration
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    const result = await verifyWhatsAppOTP(whatsappNumber, otp);
    
    if (result.success) {
      if (result.requiresRegistration) {
        setTempToken(result.tempToken!);
        setStep("register");
      } else {
        // User already exists, just login
        router.push("/dashboard");
        onClose();
      }
    } else {
      setErrorMessage(result.error || "Invalid OTP");
    }
    setIsLoading(false);
  };

  // Complete registration for new users
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    const result = await completeWhatsAppRegistration(tempToken, name, waUsername);
    
    if (result.success) {
      router.push("/dashboard");
      onClose();
    } else {
      setErrorMessage(result.error || "Registration failed");
    }
    setIsLoading(false);
  };

  const resendOTP = async () => {
    if (resendCooldown > 0) return;
    setErrorMessage("");
    setIsLoading(true);
    
    const result = await sendWhatsAppOTP(whatsappNumber);
    
    if (result.success) {
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMessage(result.error || "Failed to resend OTP");
    }
    setIsLoading(false);
  };

  // Render WhatsApp Registration Flow
  const renderWhatsAppAuth = () => {
    if (step === "phone") {
      return (
        <form onSubmit={handleSendOTP}>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              WhatsApp Number
            </label>
            <input 
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
              type="tel"
              placeholder="Enter 10-digit mobile number" 
              value={whatsappNumber}
              onChange={e => setWhatsappNumber(e.target.value)} 
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send a verification code via WhatsApp
            </p>
          </div>
          
          <button 
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP →"}
          </button>
        </form>
      );
    }
    
    if (step === "otp") {
      return (
        <form onSubmit={handleVerifyOTP}>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              Verification Code
            </label>
            <input 
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white text-center text-2xl tracking-widest"
              type="text"
              placeholder="000000" 
              value={otp}
              onChange={e => setOtp(e.target.value)} 
              maxLength={6}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the code sent to {whatsappNumber}
            </p>
          </div>
          
          <button 
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue →"}
          </button>
          
          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Change number
            </button>
            <button
              type="button"
              onClick={resendOTP}
              disabled={resendCooldown > 0}
              className="text-sm text-orange-500 hover:text-orange-600 disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      );
    }
    
    if (step === "register") {
      return (
        <form onSubmit={handleCompleteRegistration}>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              Your Name *
            </label>
            <input 
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
              type="text"
              placeholder="Enter your full name" 
              value={name}
              onChange={e => setName(e.target.value)} 
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-1 mt-4">
            <label className="block text-sm font-semibold text-gray-700">
              Username (Optional)
            </label>
            <input 
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
              type="text"
              placeholder="Choose a username" 
              value={waUsername}
              onChange={e => setWaUsername(e.target.value)} 
              disabled={isLoading}
            />
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mt-4">
            <p className="text-xs text-blue-700">
              📱 You'll use your WhatsApp number to login next time. Email/Password are optional.
            </p>
          </div>
          
          <button 
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Complete Registration →"}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4 relative shadow-xl max-h-[90vh] overflow-y-auto">
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

        {/* Auth Method Toggle */}
        <div className="flex gap-2 border-b pb-2">
          <button
            onClick={() => {
              setAuthMethod("whatsapp");
              setStep("phone");
              setErrorMessage("");
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              authMethod === "whatsapp"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📱 WhatsApp
          </button>
          <button
            onClick={() => {
              setAuthMethod("email");
              setErrorMessage("");
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              authMethod === "email"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ✉️ Email
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center">
          {authMethod === "whatsapp" ? "Register with WhatsApp" : "Create Account"}
        </h2>
        
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        {authMethod === "email" ? (
          // Email Registration Form
          <>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <input 
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                type="text"
                placeholder="Choose a username" 
                value={username}
                onChange={e => setUsername(e.target.value)} 
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input 
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={e => setEmail(e.target.value)} 
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input 
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={e => setPassword(e.target.value)} 
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input 
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white" 
                type="password" 
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} 
                disabled={isLoading}
              />
            </div>

            <button 
              onClick={handleEmailRegister} 
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </>
        ) : (
          renderWhatsAppAuth()
        )}
        
        {/* THIS IS THE BUTTON THAT OPENS LOGIN MODAL - MAKE SURE onSwitchToLogin IS PASSED CORRECTLY */}
        <button 
          onClick={() => {
            console.log("Switch to login clicked"); // Add this to debug
            onSwitchToLogin();
          }} 
          className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200 w-full text-center"
          disabled={isLoading}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}