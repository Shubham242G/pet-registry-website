'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from './context/AuthContext';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const DM_SANS = "'DM Sans', sans-serif";

const NAV_LINKS = [
  { label: 'About Us',      href: '/about-us'    },
  { label: 'Why Tailio?',   href: '/why-tailio' },
  { label: 'How it Works',  href: '/how-it-works' },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const menuRef  = useRef<HTMLDivElement>(null);

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [showLogin,    setShowLogin]    = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMounted,    setIsMounted]    = useState(false);
  const [displayName,  setDisplayName]  = useState('');
  const [isMobile,     setIsMobile]     = useState(false);
  const [isHovering,   setIsHovering]   = useState(false);

  const { user, logout, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (user?.username) setDisplayName(user.username);
    else if (user)      setDisplayName('User');
    else                setDisplayName('');
  }, [user]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setTimeout(() => router.push('/'), 100);
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
    setMenuOpen(false);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  // Don't show navbar if user is logged in OR on dashboard page
  if (!isMounted || loading) return null;
  
  // Hide navbar completely when user is authenticated (logged in)
  // This ensures navbar is ONLY visible when user is NOT logged in
  if (isAuthenticated) return null;

  return (
    <>
      <div
        ref={menuRef}
        style={{
          background: '#FFFCF8',
          width: '100%',
          borderBottom: '1px rgba(44,26,14,0.10) solid',
          boxShadow: '0px 1px 3px rgba(44,26,14,0.05)',
          boxSizing: 'border-box',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* MAIN NAV ROW */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}>

          {/* LOGO with subtle animation */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              flexShrink: 0,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div style={{
              position: 'relative',
              display: 'inline-block',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isHovering ? 'scale(1.05) rotate(-2deg)' : 'scale(1) rotate(0deg)',
            }}>
              {/* Glow effect on hover */}
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                background: isHovering ? 'rgba(232,96,10,0.15)' : 'transparent',
                filter: isHovering ? 'blur(12px)' : 'blur(0px)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: 'none',
              }} />
              
              <Image
                src="/images/tailio.png"
                alt="Tailio logo"
                width={800}
                height={880}
                style={{ 
                  width: 'auto', 
                  height: 230, 
                  objectFit: 'contain',
                  position: 'relative',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: isHovering ? 'brightness(1.05) drop-shadow(0 4px 12px rgba(232,96,10,0.2))' : 'brightness(1) drop-shadow(0 0 0 transparent)',
                }}
                priority
              />
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: '#7A5C40',
                    fontSize: 14,
                    fontFamily: DM_SANS,
                    fontWeight: 500,
                    lineHeight: '21px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E8600A';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#7A5C40';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* RIGHT SIDE - Auth Buttons + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {!isMobile && (
              <button
                onClick={() => setShowRegister(true)}
                style={{
                  padding: '9px 18px',
                  background: '#E8600A',
                  boxShadow: '0px 1.5px 0px #C04E06',
                  borderRadius: 9,
                  outline: '1px #C04E06 solid',
                  outlineOffset: -1,
                  color: '#FFFFFF',
                  fontSize: 13.5,
                  fontFamily: DM_SANS,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C06A18';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0px 4px 16px rgba(232,96,10,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#E8600A';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0px 1.5px 0px #C04E06';
                }}
              >
                Register Your Pet
              </button>
            )}

            {/* HAMBURGER — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: isMobile ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                background: 'transparent',
                border: '1.5px solid rgba(44,26,14,0.18)',
                padding: '9px 8px',
                minWidth: 44,
                minHeight: 44,
                borderRadius: 8,
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E8600A';
                e.currentTarget.style.background = 'rgba(232,96,10,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(44,26,14,0.18)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{
                display: 'block', width: 18, height: 2,
                background: menuOpen ? '#E8600A' : '#7A5C40',
                borderRadius: 2,
                transition: 'all 0.22s ease',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', height: 2,
                background: menuOpen ? '#E8600A' : '#7A5C40',
                borderRadius: 2,
                transition: 'all 0.22s ease',
                opacity: menuOpen ? 0 : 1,
                width: menuOpen ? 0 : 18,
              }} />
              <span style={{
                display: 'block', width: 18, height: 2,
                background: menuOpen ? '#E8600A' : '#7A5C40',
                borderRadius: 2,
                transition: 'all 0.22s ease',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'fixed',
            top: 68, left: 0, right: 0, bottom: 0,
            background: '#FFFCF8',
            borderTop: '1px solid rgba(44,26,14,0.10)',
            overflowY: 'auto',
            zIndex: 101,
            paddingBottom: 20,
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '12px 20px 4px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 48,
                      padding: '12px 8px',
                      borderRadius: 8,
                      borderBottom: '1px solid rgba(44,26,14,0.07)',
                      color: '#7A5C40',
                      fontSize: 15,
                      fontFamily: DM_SANS,
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#E8600A';
                      e.currentTarget.style.background = 'rgba(232,96,10,0.05)';
                      e.currentTarget.style.paddingLeft = '16px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#7A5C40';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => { setShowRegister(true); setMenuOpen(false); }}
                style={{
                  width: '100%', padding: '14px 20px',
                  background: '#E8600A',
                  boxShadow: '0px 2px 0px #C04E06',
                  border: '1px solid #C04E06',
                  borderRadius: 9, color: '#FFFFFF',
                  fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C06A18';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#E8600A';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Register Your Pet
              </button>
              <button
                onClick={() => { setShowLogin(true); setMenuOpen(false); }}
                style={{
                  width: '100%', padding: '14px 20px',
                  background: 'transparent',
                  border: '1px solid #E8600A',
                  borderRadius: 9, color: '#E8600A',
                  fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8600A';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#E8600A';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(44,26,14,0.35)',
            zIndex: 99,
            backdropFilter: 'blur(2px)',
            animation: 'fadeIn 0.3s ease',
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* MODALS */}
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