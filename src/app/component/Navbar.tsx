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

const CITY_LINKS = [
  { name: 'Delhi', href: '/pet-registration-in-delhi' },
  { name: 'Noida', href: '/pet-registration-in-noida' },
  { name: 'Ghaziabad', href: '/pet-registration-in-ghaziabad' },
  { name: 'Faridabad', href: '/pet-registration-in-faridabad' },
  { name: 'Gurugram', href: '/pet-registration-in-gurugram' },
];

// Mobile Bottom Nav Items
const MOBILE_BOTTOM_NAV = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about-us', icon: 'info' },
  { label: 'How it Works', href: '/how-it-works', icon: 'steps' },
  { label: 'Cities', href: '#cities', icon: 'location', isDropdown: true },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const menuRef  = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [showLogin,    setShowLogin]    = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMounted,    setIsMounted]    = useState(false);
  const [displayName,  setDisplayName]  = useState('');
  const [isMobile,     setIsMobile]     = useState(false);
  const [isHovering,   setIsHovering]   = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileCityDropdownOpen, setMobileCityDropdownOpen] = useState(false);

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

  useEffect(() => { 
    setMenuOpen(false); 
    setMobileCityDropdownOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node))
        setCityDropdownOpen(false);
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

  if (!isMounted || loading) return null;
  if (isAuthenticated) return null;

  return (
    <>
      {/* ── TOP NAVBAR ── */}
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
          justifyContent: isMobile ? 'center' : 'space-between',
          boxSizing: 'border-box',
          position: 'relative',
        }}>

          {/* LOGO - Centered on mobile, left on desktop */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              flexShrink: 0,
              position: isMobile ? 'relative' : 'static',
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
                  height: isMobile ? 140 : 230, 
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

              {/* Cities Dropdown - Desktop */}
              <div 
                ref={cityDropdownRef}
                style={{ position: 'relative' }}
                onMouseEnter={() => setCityDropdownOpen(true)}
                onMouseLeave={() => setCityDropdownOpen(false)}
              >
                <button
                  style={{
                    color: '#7A5C40',
                    fontSize: 14,
                    fontFamily: DM_SANS,
                    fontWeight: 500,
                    lineHeight: '21px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E8600A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#7A5C40';
                  }}
                >
                  Cities
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    style={{
                      transition: 'transform 0.3s ease',
                      transform: cityDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path 
                      d="M2 4L6 8L10 4" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {cityDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: 8,
                    background: '#FFFCF8',
                    borderRadius: 12,
                    boxShadow: '0px 8px 24px rgba(44,26,14,0.15)',
                    border: '1px solid rgba(44,26,14,0.08)',
                    minWidth: 200,
                    padding: '8px 0',
                    zIndex: 102,
                    animation: 'slideDown 0.2s ease',
                  }}>
                    {CITY_LINKS.map((city) => (
                      <Link
                        key={city.name}
                        href={city.href}
                        style={{
                          display: 'block',
                          padding: '10px 20px',
                          color: '#7A5C40',
                          fontSize: 14,
                          fontFamily: DM_SANS,
                          fontWeight: 400,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          borderBottom: '1px solid rgba(44,26,14,0.04)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(232,96,10,0.05)';
                          e.currentTarget.style.color = '#E8600A';
                          e.currentTarget.style.paddingLeft = '24px';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#7A5C40';
                          e.currentTarget.style.paddingLeft = '20px';
                        }}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DESKTOP AUTH BUTTONS */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION BAR ── */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFCF8',
          borderTop: '1px solid rgba(44,26,14,0.10)',
          boxShadow: '0px -2px 10px rgba(44,26,14,0.05)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0 calc(8px + env(safe-area-inset-bottom))', // Safe area for iPhone home bar
          boxSizing: 'border-box',
        }}>
          {MOBILE_BOTTOM_NAV.map((item, index) => {
            const isActive = pathname === item.href;
            
            if (item.isDropdown) {
              return (
                <div key={index} style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => setMobileCityDropdownOpen(!mobileCityDropdownOpen)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      cursor: 'pointer',
                      color: mobileCityDropdownOpen ? '#E8600A' : '#7A5C40',
                      fontFamily: DM_SANS,
                      fontSize: 11,
                      fontWeight: 500,
                      padding: '4px 0',
                      transition: 'color 0.2s ease',
                      width: '100%',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.label}</span>
                  </button>

                  {/* Mobile City Dropdown Menu */}
                  {mobileCityDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 12,
                      background: '#FFFCF8',
                      borderRadius: 12,
                      boxShadow: '0px 4px 20px rgba(44,26,14,0.15)',
                      border: '1px solid rgba(44,26,14,0.08)',
                      minWidth: 200,
                      padding: '8px 0',
                      zIndex: 1001,
                      animation: 'slideUp 0.2s ease',
                    }}>
                      {CITY_LINKS.map((city) => (
                        <Link
                          key={city.name}
                          href={city.href}
                          onClick={() => setMobileCityDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '10px 20px',
                            color: '#7A5C40',
                            fontSize: 14,
                            fontFamily: DM_SANS,
                            fontWeight: 400,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            borderBottom: '1px solid rgba(44,26,14,0.04)',
                          }}
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  textDecoration: 'none',
                  color: isActive ? '#E8600A' : '#7A5C40',
                  fontFamily: DM_SANS,
                  fontSize: 11,
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
              >
                {/* Simple SVG Icons for Bottom Nav */}
                {item.icon === 'home' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                {item.icon === 'info' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                )}
                {item.icon === 'steps' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
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