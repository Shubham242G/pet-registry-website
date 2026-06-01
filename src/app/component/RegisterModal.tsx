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
  // Removed: register, login (email) — not needed anymore
  const { sendWhatsAppOTP, verifyWhatsAppOTP, completeWhatsAppRegistration } = useAuth();
  const router = useRouter();

  // Removed: authMethod state — always WhatsApp now
  const [step, setStep] = useState<"phone" | "otp" | "register">("phone");

  // Removed: username, email, password, confirmPassword state

  // WhatsApp registration state — all kept exactly as before
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [name, setName] = useState("");
  const [waUsername, setWaUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isOpen) return null;

  // Removed: handleEmailRegister, getPasswordStrength, passwordStrength

  // Send OTP — unchanged
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
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMessage(result.error || "Failed to send OTP");
    }
    setIsLoading(false);
  };

  // Verify OTP — unchanged
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
        router.push("/dashboard");
        onClose();
      }
    } else {
      setErrorMessage(result.error || "Invalid OTP");
    }
    setIsLoading(false);
  };

  // Complete registration — unchanged
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

  // Resend OTP — unchanged
  const resendOTP = async () => {
    if (resendCooldown > 0) return;
    setErrorMessage("");
    setIsLoading(true);
    const result = await sendWhatsAppOTP(whatsappNumber);
    if (result.success) {
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMessage(result.error || "Failed to resend OTP");
    }
    setIsLoading(false);
  };

  const renderContent = () => {
    if (step === "phone") {
      return (
        <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#2C1A0E', marginBottom: 4, letterSpacing: '0.12px' }}>
              WhatsApp Number
            </label>
            <div style={{ display: 'flex', background: '#FAF6EF', overflow: 'hidden', borderRadius: 9, outline: '1px solid rgba(44,26,14,0.18)', outlineOffset: -1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '12px 14px', background: '#F3EDE0', borderRight: '1px solid rgba(44,26,14,0.18)' }}>
                <span style={{ fontSize: 14, fontFamily: 'monospace', color: '#4A2C14' }}>🇮🇳</span>
                <span style={{ fontSize: 13.5, fontFamily: 'monospace', fontWeight: 500, color: '#4A2C14' }}>+91</span>
              </div>
              <input
                style={{ flex: 1, padding: '12px 14px', background: '#FAF6EF', border: 'none', outline: 'none', fontSize: 13.5, color: '#2C1A0E' }}
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#FFF0E4', borderRadius: 9, outline: '1px solid rgba(232,96,10,0.18)', outlineOffset: -1 }}>
            <div style={{ width: 28, height: 28, background: '#E8600A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.5 4.5L5.25 9.75L3.5 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 12.5, color: '#4A2C14' }}>
              We'll send a verification code via WhatsApp — no spam, ever.
            </span>
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '12px 24px', background: '#E8600A', boxShadow: '0px 3px 0px #C04E06', borderRadius: 9, outline: '2px solid #C04E06', outlineOffset: -2, fontWeight: 600, color: '#FFFFFF', fontSize: 15, letterSpacing: '0.15px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.67 12L11.33 5.33" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
              <path d="M4.67 5.33H11.33V12" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
            </svg>
          </button>
        </form>
      );
    }

    if (step === "otp") {
      return (
        <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#2C1A0E', marginBottom: 4, letterSpacing: '0.12px' }}>
              Verification Code
            </label>
            <input
              style={{ width: '100%', padding: '12px 14px', background: '#FAF6EF', borderRadius: 9, textAlign: 'center', fontSize: 24, letterSpacing: '0.2em', outline: '1px solid rgba(44,26,14,0.18)', outlineOffset: -1, border: 'none', color: '#2C1A0E' }}
              type="text"
              placeholder="000000"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength={6}
              disabled={isLoading}
              required
            />
            <p style={{ fontSize: 12, color: '#A68660', marginTop: 4 }}>
              Enter the code sent to +91 {whatsappNumber}
            </p>
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '12px 24px', background: '#E8600A', boxShadow: '0px 3px 0px #C04E06', borderRadius: 9, outline: '2px solid #C04E06', outlineOffset: -2, fontWeight: 600, color: '#FFFFFF', fontSize: 15, letterSpacing: '0.15px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.67 12L11.33 5.33" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
              <path d="M4.67 5.33H11.33V12" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button type="button" onClick={() => setStep("phone")} style={{ fontSize: 13, color: '#A68660', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Change number
            </button>
            <button type="button" onClick={resendOTP} disabled={resendCooldown > 0} style={{ fontSize: 13, color: '#E8600A', background: 'none', border: 'none', cursor: 'pointer' }}>
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      );
    }

    if (step === "register") {
      return (
        <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#2C1A0E', marginBottom: 4, letterSpacing: '0.12px' }}>
              Your Name *
            </label>
            <input
              style={{ width: '100%', padding: '12px 14px', background: '#FAF6EF', borderRadius: 9, fontSize: 13.5, color: '#2C1A0E', outline: '1px solid rgba(44,26,14,0.18)', outlineOffset: -1, border: 'none' }}
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#2C1A0E', marginBottom: 4, letterSpacing: '0.12px' }}>
              Username (Optional)
            </label>
            <input
              style={{ width: '100%', padding: '12px 14px', background: '#FAF6EF', borderRadius: 9, fontSize: 13.5, color: '#2C1A0E', outline: '1px solid rgba(44,26,14,0.18)', outlineOffset: -1, border: 'none' }}
              type="text"
              placeholder="Choose a username"
              value={waUsername}
              onChange={e => setWaUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '12px 24px', background: '#E8600A', boxShadow: '0px 3px 0px #C04E06', borderRadius: 9, outline: '2px solid #C04E06', outlineOffset: -2, fontWeight: 600, color: '#FFFFFF', fontSize: 15, letterSpacing: '0.15px', cursor: 'pointer', border: 'none' }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>
      );
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: 16 }}>
      <div style={{ width: 420, maxWidth: '100%', background: '#FFFCF8', borderRadius: 18, boxShadow: '0px 24px 80px rgba(44,26,14,0.18)', outline: '1px solid rgba(44,26,14,0.10)', outlineOffset: -1, position: 'relative' }}>

        {/* Close Button — unchanged */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, background: '#F3EDE0', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 10 }}
          disabled={isLoading}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M1 11L11 1" stroke="#7A5C40" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Header bar — no tabs, just WhatsApp branding */}
        <div style={{ paddingTop: 14, paddingLeft: 16, paddingRight: 16 }}>
          <div style={{
            padding: '10px 0',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderLeft: '1px solid rgba(44,26,14,0.18)',
            borderTop: '1px solid rgba(44,26,14,0.18)',
            borderRight: '1px solid rgba(44,26,14,0.18)',
            background: '#FFFCF8',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E8600A' }}>
                <span style={{ fontSize: 11 }}>💬</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#E8600A' }}>WhatsApp</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2.5, background: '#E8600A', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(44,26,14,0.18)' }} />

        {/* Content */}
        <div style={{ padding: '20px 28px 28px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ width: 16, height: 1.5, background: '#E8600A', borderRadius: 100 }} />
            <span style={{ fontSize: 8.5, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1.2px', color: '#E8600A' }}>Quick registration</span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 900, lineHeight: '26px', marginBottom: 2 }}>
            <span style={{ color: '#2C1A0E' }}>Register with </span>
            <span style={{ color: '#E8600A', fontStyle: 'italic' }}>Tailio</span>
          </h2>

          <p style={{ fontSize: 12, color: '#7A5C40', lineHeight: '18px', marginBottom: 2 }}>
            We'll send a one-time code to verify your number. Takes 30 seconds.
          </p>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {errorMessage && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#DC2626', padding: '8px 12px', borderRadius: 9, fontSize: 12 }}>
                {errorMessage}
              </div>
            )}

            {renderContent()}

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
              <button
                onClick={onSwitchToLogin}
                style={{ fontSize: 13, color: '#E8600A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                disabled={isLoading}
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}