"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
  const { login, sendWhatsAppOTP, verifyWhatsAppOTP, completeWhatsAppRegistration } = useAuth();
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"email" | "whatsapp">("whatsapp");
  const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
  
  // Email login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // WhatsApp login state
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isOpen) return null;

  // Handle Email Login
  const handleEmailLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/pages/dashboard");
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email or password");
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

  // Verify OTP and complete login/registration
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
        router.push("/pages/dashboard");
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
    
    const result = await completeWhatsAppRegistration(tempToken, name, username);
    
    if (result.success) {
      router.push("/pages/dashboard");
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

  // Render WhatsApp Auth Flow
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
            {isLoading ? "Verifying..." : "Verify & Login →"}
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
              value={username}
              onChange={e => setUsername(e.target.value)} 
              disabled={isLoading}
            />
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
          {authMethod === "whatsapp" ? "Login with WhatsApp" : "Login with Email"}
        </h2>
        
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        {authMethod === "email" ? (
          // Email Login Form
          <>
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

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input 
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={e => setPassword(e.target.value)} 
                disabled={isLoading}
              />
            </div>

            <button 
              onClick={handleEmailLogin} 
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </>
        ) : (
          renderWhatsAppAuth()
        )}
        
        <button 
          onClick={onSwitchToRegister} 
          className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200 w-full text-center"
          disabled={isLoading}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}