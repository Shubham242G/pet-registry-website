'use client';

import { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

export default function FloatingRegisterButton() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted, lastScrollY]);

  // Only guard against SSR — auth/device logic lives in FloatersWrapper
  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setShowRegister(true)}
        style={{
          position: 'fixed',
          bottom: isMobile ? 20 : 24,
          right: isMobile ? 20 : 24,
          zIndex: 1000,
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E8600A 0%, #C04E06 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0px 4px 16px rgba(232,96,10,0.4), 0px 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 1 : 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0px 6px 20px rgba(232,96,10,0.5)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = isVisible ? 'scale(1)' : 'scale(0)';
          e.currentTarget.style.boxShadow = '0px 4px 16px rgba(232,96,10,0.4)';
        }}
      >
        <PawPrint size={isMobile ? 24 : 28} color="white" strokeWidth={1.8} />
      </button>

      {/* Pulse ring */}
      <div
        style={{
          position: 'fixed',
          bottom: isMobile ? 20 : 24,
          right: isMobile ? 20 : 24,
          zIndex: 999,
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
          borderRadius: '50%',
          background: 'transparent',
          pointerEvents: 'none',
          animation: 'tailioFloatPulse 2s infinite',
        }}
      />

      <style jsx>{`
        @keyframes tailioFloatPulse {
          0%   { box-shadow: 0 0 0 0 rgba(232, 96, 10, 0.4); }
          70%  { box-shadow: 0 0 0 15px rgba(232, 96, 10, 0); }
          100% { box-shadow: 0 0 0 0 rgba(232, 96, 10, 0); }
        }
      `}</style>

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
      />
    </>
  );
}