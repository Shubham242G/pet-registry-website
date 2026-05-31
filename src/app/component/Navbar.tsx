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
//   { label: 'Why Register?', href: '/why-register' },
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

  const isDashboardPage = pathname?.startsWith('/dashboard');
  if (!isMounted || loading) return null;
  if (isDashboardPage)       return null;

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
          gap: 150,
        }}>

          {/* LOGO - Original size, moved left */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, marginRight: 'auto' }}>
            <Image
              src="/images/tailio.png"
              alt="Tailio logo"
              width={800}
              height={780}
              style={{ width: 'auto', height: 230, objectFit: 'contain', marginRight:'40px'}}
              priority
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={undefined}
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
                    marginRight:'30px'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isAuthenticated ? (
              <>
                {!isMobile && (
                  <>
                    <span style={{ color: '#7A5C40', fontSize: 14, fontFamily: DM_SANS }}>
                      Welcome, {displayName}
                    </span>
                    <button
                      onClick={handleDashboardClick}
                      style={{
                        padding: '9px 18px',
                        background: '#E8600A',
                        boxShadow: '0px 1.5px 0px #C04E06',
                        borderRadius: 9,
                        outline: '1px #C04E06 solid',
                        outlineOffset: -1,
                        color: 'white',
                        fontSize: 13.5,
                        fontFamily: DM_SANS,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        border: 'none',
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      style={{
                        padding: '9px 18px',
                        background: '#2C1A0E',
                        borderRadius: 9,
                        color: 'white',
                        fontSize: 13.5,
                        fontFamily: DM_SANS,
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            ) : (
              !isMobile && (
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    padding: '9px 18px',
                    background: '#E8600A',
                    boxShadow: '0px 1.5px 0px #C04E06',
                    borderRadius: 9,
                    outline: '1px #C04E06 solid',
                    outlineOffset: -1,
                    color: 'white',
                    fontSize: 13.5,
                    fontFamily: DM_SANS,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Register Your Pet
                </button>
              )
            )}

            {/* HAMBURGER — mobile only */}
            {isMobile && (
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  display: 'flex',
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
                }}
              >
                <span style={{
                  display: 'block', width: 18, height: 2,
                  background: '#2C1A0E', borderRadius: 2,
                  transition: 'transform 0.22s ease, opacity 0.22s ease',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }} />
                <span style={{
                  display: 'block', height: 2,
                  background: '#2C1A0E', borderRadius: 2,
                  transition: 'opacity 0.22s ease, width 0.22s ease',
                  opacity: menuOpen ? 0 : 1,
                  width: menuOpen ? 0 : 18,
                }} />
                <span style={{
                  display: 'block', width: 18, height: 2,
                  background: '#2C1A0E', borderRadius: 2,
                  transition: 'transform 0.22s ease, opacity 0.22s ease',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }} />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute',
            top: 68, left: 0, right: 0,
            background: '#FFFCF8',
            borderTop: '1px solid rgba(44,26,14,0.10)',
            maxHeight: 'calc(100vh - 68px)',
            overflowY: 'auto',
            zIndex: 101,
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
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {isAuthenticated ? (
                <>
                  <p style={{ margin: 0, color: '#7A5C40', fontSize: 14, fontFamily: DM_SANS, padding: '4px 8px' }}>
                    Welcome, {displayName}
                  </p>
                  <button
                    onClick={handleDashboardClick}
                    style={{
                      width: '100%', padding: '14px 20px',
                      background: '#E8600A',
                      boxShadow: '0px 2px 0px #C04E06',
                      border: '1px solid #C04E06',
                      borderRadius: 9, color: 'white',
                      fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%', padding: '14px 20px',
                      background: '#ef4444',
                      border: '1px solid #dc2626',
                      borderRadius: 9, color: 'white',
                      fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setShowRegister(true); setMenuOpen(false); }}
                    style={{
                      width: '100%', padding: '14px 20px',
                      background: '#E8600A',
                      boxShadow: '0px 2px 0px #C04E06',
                      border: '1px solid #C04E06',
                      borderRadius: 9, color: 'white',
                      fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, cursor: 'pointer',
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
                    }}
                  >
                    Login
                  </button>
                </>
              )}
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
          }}
        />
      )}

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