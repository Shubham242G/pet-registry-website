"use client";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import CitySelector from "./CitySelector";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { sendWhatsAppOTP, verifyWhatsAppOTP, completeWhatsAppRegistration } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [name, setName] = useState("");
  const [waUsername, setWaUsername] = useState("");
  const [city, setCity] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isOpen) return null;

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

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!city) {
      setErrorMessage("Please select your city");
      return;
    }
    
    setIsLoading(true);
    const result = await completeWhatsAppRegistration(tempToken, name, waUsername, city);
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
        <form onSubmit={handleSendOTP} style={{ width: '100%' }}>
          {/* WhatsApp Number Label */}
          <div style={{ marginBottom: '5px' }}>
            <div style={{ 
              color: '#2C1A0E', 
              fontSize: '12px', 
              fontFamily: 'DM Sans', 
              fontWeight: 600, 
              letterSpacing: '0.12px' 
            }}>
              WhatsApp Number
            </div>
          </div>

          {/* Phone Input */}
          <div style={{ 
            display: 'flex', 
            background: '#FAF6EF', 
            overflow: 'hidden', 
            borderRadius: '9px', 
            outline: '1px solid rgba(44, 26, 14, 0.18)', 
            outlineOffset: '-1px',
            marginBottom: '18.91px'
          }}>
            <div style={{ 
              padding: '11px 12px 11px 14px', 
              background: '#F3EDE0', 
              borderRight: '1px solid rgba(44, 26, 14, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{ 
                minWidth: '24.78px', 
                fontSize: '14px', 
                fontFamily: 'DM Mono', 
                fontWeight: 500, 
                color: '#4A2C14' 
              }}>🇮🇳</span>
              <span style={{ 
                fontSize: '13.5px', 
                fontFamily: 'DM Mono', 
                fontWeight: 500, 
                color: '#4A2C14' 
              }}>+91</span>
            </div>
            <input
              style={{ 
                flex: 1, 
                padding: '12px 14px 11px 14px', 
                background: '#FAF6EF', 
                border: 'none', 
                outline: 'none', 
                fontSize: '13.5px', 
                fontFamily: 'DM Sans',
                fontWeight: 400,
                color: '#2C1A0E'
              }}
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={whatsappNumber}
              onChange={e => setWhatsappNumber(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Info Box */}
          <div style={{ 
            marginBottom: '22px',
            padding: '10px 14px', 
            background: '#FFF0E4', 
            borderRadius: '9px', 
            outline: '1px solid rgba(232, 96, 10, 0.18)', 
            outlineOffset: '-1px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ 
              width: '28px', 
              height: '28px', 
              background: '#E8600A', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.75" y="1.75" width="10.5" height="10.5" rx="1.5" stroke="white" strokeWidth="1.28"/>
                <path d="M4.67 7L6.33 8.67L9.33 5.33" stroke="white" strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ 
              fontSize: '12.5px', 
              fontFamily: 'DM Sans', 
              fontWeight: 400, 
              color: '#4A2C14',
              lineHeight: '18.13px'
            }}>
              We'll send a verification code via WhatsApp — no spam, ever.
            </div>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            style={{ 
              width: '100%', 
              padding: '13px 24px', 
              background: '#E8600A', 
              boxShadow: '0px 3px 0px #C04E06', 
              borderRadius: '9px', 
              outline: '2px solid #C04E06', 
              outlineOffset: '-2px',
              fontWeight: 600, 
              color: '#FFFFFF', 
              fontSize: '15px', 
              fontFamily: 'DM Sans',
              letterSpacing: '0.15px', 
              cursor: 'pointer', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px'
            }}
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
        <form onSubmit={handleVerifyOTP} style={{ width: '100%' }}>
          <div style={{ marginBottom: '5px' }}>
            <div style={{ 
              color: '#2C1A0E', 
              fontSize: '12px', 
              fontFamily: 'DM Sans', 
              fontWeight: 600, 
              letterSpacing: '0.12px' 
            }}>
              Verification Code
            </div>
          </div>
          <input
            style={{ 
              width: '100%', 
              padding: '12px 14px', 
              background: '#FAF6EF', 
              borderRadius: '9px', 
              textAlign: 'center', 
              fontSize: '24px', 
              letterSpacing: '0.2em', 
              outline: '1px solid rgba(44, 26, 14, 0.18)', 
              outlineOffset: '-1px', 
              border: 'none', 
              color: '#2C1A0E',
              fontFamily: 'DM Mono',
              marginBottom: '18.91px'
            }}
            type="text"
            placeholder="000000"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength={6}
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            style={{ 
              width: '100%', 
              padding: '13px 24px', 
              background: '#E8600A', 
              boxShadow: '0px 3px 0px #C04E06', 
              borderRadius: '9px', 
              outline: '2px solid #C04E06', 
              outlineOffset: '-2px',
              fontWeight: 600, 
              color: '#FFFFFF', 
              fontSize: '15px', 
              fontFamily: 'DM Sans',
              letterSpacing: '0.15px', 
              cursor: 'pointer', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginBottom: '18px'
            }}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.67 12L11.33 5.33" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
              <path d="M4.67 5.33H11.33V12" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={() => setStep("phone")} 
              style={{ 
                fontSize: '13px', 
                fontFamily: 'DM Sans',
                fontWeight: 400,
                color: '#7A5C40', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              ← Change number
            </button>
            <button 
              type="button" 
              onClick={resendOTP} 
              disabled={resendCooldown > 0} 
              style={{ 
                fontSize: '13px', 
                fontFamily: 'DM Sans',
                fontWeight: 600,
                color: '#E8600A', 
                background: 'none', 
                border: 'none', 
                cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                opacity: resendCooldown > 0 ? 0.6 : 1
              }}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      );
    }

    if (step === "register") {
      return (
        <form onSubmit={handleCompleteRegistration} style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '5px' }}>
              <div style={{ color: '#2C1A0E', fontSize: '12px', fontFamily: 'DM Sans', fontWeight: 600, letterSpacing: '0.12px' }}>
                Your Name *
              </div>
            </div>
            <input
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                background: '#FAF6EF', 
                borderRadius: '9px', 
                fontSize: '13.5px', 
                fontFamily: 'DM Sans',
                color: '#2C1A0E', 
                outline: '1px solid rgba(44, 26, 14, 0.18)', 
                outlineOffset: '-1px', 
                border: 'none' 
              }}
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '5px' }}>
              <div style={{ color: '#2C1A0E', fontSize: '12px', fontFamily: 'DM Sans', fontWeight: 600, letterSpacing: '0.12px' }}>
                Username (Optional)
              </div>
            </div>
            <input
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                background: '#FAF6EF', 
                borderRadius: '9px', 
                fontSize: '13.5px', 
                fontFamily: 'DM Sans',
                color: '#2C1A0E', 
                outline: '1px solid rgba(44, 26, 14, 0.18)', 
                outlineOffset: '-1px', 
                border: 'none' 
              }}
              type="text"
              placeholder="Choose a username"
              value={waUsername}
              onChange={e => setWaUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* City Selector Component */}
          <CitySelector 
            selectedCity={city}
            onChange={setCity}
            error={errorMessage}
          />

          <button
            type="submit"
            style={{ 
              width: '100%', 
              padding: '13px 24px', 
              background: '#E8600A', 
              boxShadow: '0px 3px 0px #C04E06', 
              borderRadius: '9px', 
              outline: '2px solid #C04E06', 
              outlineOffset: '-2px',
              fontWeight: 600, 
              color: '#FFFFFF', 
              fontSize: '15px', 
              fontFamily: 'DM Sans',
              letterSpacing: '0.15px', 
              cursor: 'pointer', 
              border: 'none',
              marginTop: '8px'
            }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>
      );
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      zIndex: 9999, 
      padding: 16 
    }}>
      <div style={{ 
        width: 420, 
        minHeight: 480,
        position: 'relative',
        background: '#FFFCF8', 
        boxShadow: '0px 24px 80px rgba(44, 26, 14, 0.18)', 
        borderRadius: '18px', 
        outline: '1px solid rgba(44, 26, 14, 0.10)', 
        outlineOffset: '-1px'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            top: 14, 
            right: 16, 
            width: 'auto',
            height: 'auto',
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer', 
            zIndex: 10,
            padding: 0
          }}
          disabled={isLoading}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="#7A5C40" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Content */}
        <div style={{ 
          paddingTop: 28, 
          paddingBottom: 32, 
          paddingLeft: 28, 
          paddingRight: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 5.1
        }}>
          {/* QUICK REGISTRATION header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 7
          }}>
            <div style={{ 
              width: 18, 
              height: 1.5, 
              background: '#E8600A', 
              borderRadius: 100 
            }} />
            <div style={{ 
              color: '#E8600A', 
              fontSize: '9.5px', 
              fontFamily: 'DM Sans', 
              fontWeight: 400, 
              textTransform: 'uppercase', 
              letterSpacing: '1.33px' 
            }}>
              QUICK REGISTRATION
            </div>
          </div>

          {/* Title */}
          <div style={{ paddingTop: 0.9 }}>
            <div style={{ 
              color: '#2C1A0E', 
              fontSize: 26, 
              fontFamily: 'Fraunces', 
              fontWeight: 900, 
              lineHeight: '28.60px' 
            }}>
              Register with{' '}
              <span style={{ color: '#E8600A', fontStyle: 'italic', fontWeight: 700 }}>WhatsApp</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ 
            color: '#7A5C40', 
            fontSize: 13, 
            fontFamily: 'DM Sans', 
            fontWeight: 400, 
            lineHeight: '20.15px' 
          }}>
            We'll send a one-time code to verify your number. Takes 30 seconds.
          </div>

          {/* Form Area */}
          <div style={{ position: 'relative' }}>
            {errorMessage && !errorMessage.includes("city") && (
              <div style={{ 
                background: '#FEF2F2', 
                border: '1px solid #FEE2E2', 
                color: '#DC2626', 
                padding: '8px 12px', 
                borderRadius: 9, 
                fontSize: 12,
                marginBottom: 16,
                fontFamily: 'DM Sans'
              }}>
                {errorMessage}
              </div>
            )}

            {renderContent()}

            {/* Sign in link */}
            <div style={{ 
              height: 29.9,
              position: 'relative',
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <span style={{ 
                color: '#7A5C40', 
                fontSize: 13, 
                fontFamily: 'DM Sans', 
                fontWeight: 400 
              }}>
                Already have an account?{' '}
              </span>
              <button
                onClick={onSwitchToLogin}
                style={{ 
                  color: '#E8600A', 
                  fontSize: 13, 
                  fontFamily: 'DM Sans', 
                  fontWeight: 600, 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: 0
                }}
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}