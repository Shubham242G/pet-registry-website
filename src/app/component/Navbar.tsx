'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from './context/AuthContext';
import RegisterModal from './RegisterModal';

const DM_SANS = "'DM Sans', sans-serif";

const NAV_LINKS = [
  { label: 'About Us',      href: '/about-us'    },
  { label: 'Why Register?', href: '/why-register' },
  { label: 'Why Tailio?',   href: '/#whyTailio', scrollId: 'whyTailio' },
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

  const { user, logout, isAuthenticated, loading } = useAuth();

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (user?.username) setDisplayName(user.username);
    else if (user)      setDisplayName('User');
    else                setDisplayName('');
  }, [user]);

  /* close on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setTimeout(() => router.push('/'), 100);
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

  const isDashboardPage = pathname?.startsWith('/pages/dashboard');
  if (!isMounted || loading) return null;
  if (isDashboardPage)       return null;

  return (
    <>
      {/* ══════════════════════════════════════
          NAVBAR WRAPPER
      ══════════════════════════════════════ */}
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
        {/* ── MAIN NAV ROW ── */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          gap: 16,
        }}>

          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, height: '100%' }}>
            <Image
              src="/images/tailio.png"
              alt="Tailio logo"
              width={800}
              height={880}
              style={{ width: 'auto', height: 'auto', maxHeight: '300%', objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* DESKTOP NAV LINKS — hidden below 768px */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.scrollId ? (e) => handleScrollToSection(e as any, link.scrollId!) : undefined}
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
                  height: '100%',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Auth — desktop only */}
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-sm mr-1" style={{ color: '#7A5C40', fontFamily: DM_SANS }}>
                  Welcome, {displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                  style={{ background: '#ef4444', border: 'none', cursor: 'pointer', fontFamily: DM_SANS, whiteSpace: 'nowrap' }}
                >
                  Logout
                </button>
              </>
            ) : (
              /* Register Your Pet CTA — desktop only */
              <button
                onClick={() => setShowRegister(true)}
                className="hidden md:inline-flex items-center justify-center"
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
            )}

            {/* ── HAMBURGER — mobile only ── */}
            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex md:hidden flex-col justify-center items-center gap-[5px] cursor-pointer rounded-lg"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(44,26,14,0.18)',
                padding: '9px 8px',
                minWidth: 44,
                minHeight: 44,
                borderRadius: 8,
              }}
            >
              {/* Bar 1 */}
              <span style={{
                display: 'block', width: 18, height: 2,
                background: '#2C1A0E', borderRadius: 2,
                transformOrigin: 'center',
                transition: 'transform 0.22s ease, opacity 0.22s ease',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }} />
              {/* Bar 2 */}
              <span style={{
                display: 'block', height: 2,
                background: '#2C1A0E', borderRadius: 2,
                transition: 'opacity 0.22s ease, width 0.22s ease',
                opacity: menuOpen ? 0 : 1,
                width: menuOpen ? 0 : 18,
              }} />
              {/* Bar 3 */}
              <span style={{
                display: 'block', width: 18, height: 2,
                background: '#2C1A0E', borderRadius: 2,
                transformOrigin: 'center',
                transition: 'transform 0.22s ease, opacity 0.22s ease',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          aria-hidden={!menuOpen}
          style={{
            background: '#FFFCF8',
            borderTop: menuOpen ? '1px rgba(44,26,14,0.10) solid' : 'none',
            maxHeight: menuOpen ? 480 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
            opacity: menuOpen ? 1 : 0,
            paddingBottom: menuOpen ? 'env(safe-area-inset-bottom)' : 0,
          }}
        >
          {/* Nav links */}
          <ul style={{ listStyle: 'none', margin: 0, padding: '12px 20px 4px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.scrollId
                    ? (e) => handleScrollToSection(e as any, link.scrollId!)
                    : () => setMenuOpen(false)}
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

          {/* Mobile auth section */}
          <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {isAuthenticated ? (
              <>
                <p style={{ margin: 0, color: '#7A5C40', fontSize: 14, fontFamily: DM_SANS, padding: '4px 8px' }}>
                  Welcome, {displayName}
                </p>
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
              /* Register button — full width in mobile menu */
              <button
                onClick={() => { setShowRegister(true); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#E8600A',
                  boxShadow: '0px 2px 0px #C04E06',
                  border: '1px solid #C04E06',
                  borderRadius: 9,
                  color: 'white',
                  fontSize: 15,
                  fontFamily: DM_SANS,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Register Your Pet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
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
    </>
  );
}