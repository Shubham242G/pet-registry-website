// app/gurugram/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Footer from "../component/Footer";
import LoginModal from "../component/LoginModal";
import RegisterModal from "../component/RegisterModal";
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const F = {
  fraunces: "'Fraunces', Georgia, serif",
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

// ─── Shared Badge Component ───────────────────────────────────────────────
function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  const fontSize = 10;
  const darkFontSize = 9.5;

  if (dark) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '5px 14px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 100,
        outline: '1px rgba(255,255,255,0.10) solid',
        outlineOffset: -1
      }}>
        <span style={{
          color: 'rgba(250,246,239,0.55)',
          fontSize: darkFontSize,
          fontFamily: F.dmMono,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.24px'
        }}>{text}</span>
      </div>
    );
  }
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '5px 14px',
      background: '#FFF0E4',
      borderRadius: 100,
      outline: '1px #FFCCA0 solid',
      outlineOffset: -1
    }}>
      <span style={{
        color: '#C04E06',
        fontSize: fontSize,
        fontFamily: F.dmSans,
        fontWeight: 500,
        textTransform: 'uppercase',
        lineHeight: '15px',
        letterSpacing: '1.20px'
      }}>{text}</span>
    </div>
  );
}

// ─── FAQ Item Component ───────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: '#FFFCF8',
      borderRadius: 13,
      outline: '1px rgba(44,26,14,0.10) solid',
      outlineOffset: -1,
      overflow: 'hidden',
      transition: 'box-shadow 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0px 4px 16px rgba(44,26,14,0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(44,26,14,0.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
        }}
      >
        <span style={{
          color: '#2C1A0E',
          fontSize: 14.5,
          fontFamily: F.dmSans,
          fontWeight: 600,
          lineHeight: '20.30px'
        }}>{question}</span>
        <div style={{
          width: 26,
          height: 26,
          background: '#FFF0E4',
          borderRadius: 13,
          outline: '1px #FFCCA0 solid',
          outlineOffset: -1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}>
          <span style={{ color: '#C04E06', fontSize: 16, fontFamily: F.dmSans, fontWeight: 700, transition: 'transform 0.3s ease' }}>{open ? '−' : '+'}</span>
        </div>
      </button>

      {open && (
        <div style={{
          padding: '0 20px 20px 20px',
          color: '#7A5C40',
          fontSize: 14,
          fontFamily: F.dmSans,
          lineHeight: '1.6',
          borderTop: '1px solid rgba(44,26,14,0.08)',
          paddingTop: 16
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default function GurugramPage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@500&display=swap';
    document.head.appendChild(link);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsivePadding = () => {
    if (isMobile) return '40px 20px';
    if (isTablet) return '60px 30px';
    return '80px 40px';
  };

  const getResponsiveFontSize = (desktop: number, tablet: number, mobile: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  // ─── Button hover styles ──────────────────────────────────────────────────
  const handleHeroCtaEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#C06A18';
    e.currentTarget.style.transform = 'scale(1.03)';
    e.currentTarget.style.boxShadow = '0px 4px 20px rgba(232,96,10,0.4)';
  };

  const handleHeroCtaLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#E8600A';
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0px 2px 0px #C04E06';
  };

  if (!mounted) {
    return (
      <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0, background: '#FAF6EF' }}>
        <div style={{ background: '#FAF6EF', width: '100%', position: 'relative', minHeight: 770, overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ SEO Metadata - This is what Google crawlers will see */}
      <Head>
        <title>Dog Registration in Gurugram | MCG Pet Registration</title>
        <meta 
          name="description" 
          content="Apply for pet registration online in Gurgaon with Tailio. Secure, fast, and legally compliant dog registration with end-to-end filing assistance." 
        />
        <meta 
          name="keywords" 
          content="Gurugram pet registration, MCG pet registration, MCG dog registration, pet registration Gurugram, dog registration Gurugram, Municipal Corporation Gurugram pet registration, pet registration MCG online, pet certificate Gurugram, pet compliance Gurugram, pet registration law Gurugram, ABC rules Gurugram, Supreme Court pet registration Gurugram, MCG enforcement, Gurugram pet fine" 
        />
        <link rel="canonical" href="https://tailio.com/gurugram" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tailio.com/gurugram" />
        <meta property="og:title" content="Dog Registration in Gurugram | MCG Pet Registration" />
        <meta 
          property="og:description" 
          content="Register your pet with MCG Gurugram in under 60 seconds. Tailio files directly with Municipal Corporation of Gurugram. Get your official pet registration certificate in 24-72 hours. Starting at ₹999." 
        />
        <meta property="og:image" content="https://tailio.com/images/og-gurugram.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Tailio" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://tailio.com/gurugram" />
        <meta name="twitter:title" content="Dog Registration in Gurugram | MCG Pet Registration" />
        <meta 
          name="twitter:description" 
          content="Register your pet with MCG Gurugram in under 60 seconds. Get your official pet registration certificate in 24-72 hours. Starting at ₹999." 
        />
        <meta name="twitter:image" content="https://tailio.com/images/og-gurugram.jpg" />
        
        <meta name="author" content="Tailio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Dog Registration in Gurugram | MCG Pet Registration",
              "description": "Complete guide to pet registration in Gurugram. Register your pet with MCG through Tailio in under 60 seconds.",
              "url": "https://tailio.com/gurugram",
              "mainEntity": {
                "@type": "LocalBusiness",
                "name": "Tailio - Gurugram Pet Registration",
                "description": "Digital pet registration service for Gurugram residents. File directly with MCG.",
                "url": "https://tailio.com/gurugram",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Gurugram",
                  "addressCountry": "IN"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Gurugram"
                },
                "priceRange": "₹999",
                "openingHours": "Mo-Su 09:00-21:00",
                "serviceType": "Pet Registration"
              }
            })
          }}
        />
      </Head>

      <div style={{ fontFamily: F.dmSans, width: '100%', margin: 0, padding: 0, background: '#FAF6EF' }}>

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <div style={{
          background: '#FAF6EF',
          width: '100%',
          position: 'relative',
          minHeight: isMobile ? 500 : 600,
          overflow: 'hidden'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}>
            <Image
              src="/images/coffe-bean-print.png"
              alt="Background pattern"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                imageRendering: 'auto',
                opacity: 0.3,
              }}
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(250, 246, 239, 0.92) 0%, rgba(250, 246, 239, 0.88) 100%)',
            zIndex: 1,
          }} />

          {/* Hero Content */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 1200,
            margin: '0 auto',
            padding: isMobile ? '40px 20px' : '60px 40px 80px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 40 : 77
          }}>
            <div style={{
              width: isMobile ? '100%' : 652,
              display: 'flex',
              flexDirection: 'column',
              gap: 14.9,
              textAlign: isMobile ? 'center' : 'left',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '7px 16px',
                background: '#2C1A0E',
                borderRadius: 100,
                gap: 8,
                alignSelf: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.15)'
              }}>
                <span style={{ color: 'rgba(255,243,224,0.85)', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '17.25px' }}>
                  MCG · Gurugram · Registration Live
                </span>
              </div>

              <div style={{ paddingTop: 5.1, textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  color: '#2C1A0E',
                  fontSize: getResponsiveFontSize(64, 48, 32),
                  fontFamily: F.fraunces,
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}>
                  Pet registration
                </div>
                <div style={{
                  fontSize: getResponsiveFontSize(64, 48, 32),
                  fontFamily: F.fraunces,
                  lineHeight: 1.2,
                }}>
                  <span style={{ color: '#E8600A', fontStyle: 'italic', fontWeight: 700 }}>in Gurugram.</span>
                </div>
              </div>

              <p style={{
                maxWidth: isMobile ? '100%' : 480,
                color: '#7A5C40',
                fontSize: getResponsiveFontSize(14.5, 13, 12),
                fontFamily: F.dmSans,
                lineHeight: '23.93px',
                margin: 0,
                textAlign: isMobile ? 'center' : 'left'
              }}>
                MCG is preparing its enforcement framework. Register now while it's still straightforward — before fines are formally set and before your society RWA issues notices. Tailio files directly with MCG in 60 seconds.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                justifyContent: isMobile ? 'center' : 'flex-start',
                marginTop: 8,
                marginBottom: 16
              }}>
                {['₹999 one-time, all-inclusive', 'Certificate in 24–72 hrs', 'MCG accepted', 'No office visit needed'].map((text) => (
                  <div key={text} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'white',
                    borderRadius: 100,
                    padding: '6px 14px',
                    border: '1px solid rgba(44,26,14,0.12)',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ width: 6, height: 6, background: '#E8600A', borderRadius: 3 }} />
                    <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(11, 10, 9), fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                paddingTop: 9.1,
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                <button 
                  onClick={handleOpenRegisterModal} 
                  style={{
                    padding: isMobile ? '11px 20px' : '13px 26px',
                    background: '#E8600A',
                    boxShadow: '0px 2px 0px #C04E06',
                    borderRadius: 9,
                    outline: '2px #C04E06 solid',
                    outlineOffset: -2,
                    color: '#FFFFFF',
                    fontSize: getResponsiveFontSize(15, 14, 13),
                    fontFamily: F.dmSans,
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={handleHeroCtaEnter}
                  onMouseLeave={handleHeroCtaLeave}
                >
                  Register Your Pet — ₹999 →
                </button>
              </div>
            </div>

            {!isMobile && (
              <div style={{ position: 'relative', width: 580, height: 580, flexShrink: 0 }}>
                <Image
                  src="/images/homeBanner.png"
                  alt="Happy pet owner with their dog - responsible pet registration made simple with Tailio"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <section className="bg-[#2C1A0E] py-8 px-4" aria-label="Gurugram pet registration statistics">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'Pending', label: 'MCG fine — announcement expected soon', sub: 'MCG · Gurugram' },
              { value: 'Now', label: 'Best time to register before fines drop', sub: 'MCG · Gurugram' },
              { value: 'Live', label: 'Tailio accepting Gurugram registrations', sub: 'Tailio · Gurugram' },
              { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' },
            ].map((stat, i) => (
              <div key={i} className={`text-center md:text-left px-4 py-4 ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <div className="text-[#FF8C3A] text-3xl md:text-4xl font-black">{stat.value}</div>
                <div className="h-px w-6 bg-white/10 my-2" />
                <div className="text-[#F4E4CF] text-sm font-medium">{stat.label}</div>
                <div className="text-[#F4E4CF]/40 text-xs mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            LAW SECTION
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest mb-2">The Law · Gurugram</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mb-4">
                Pet registration isn't optional<br/>in <span className="text-[#E8600A] italic">Gurugram.</span>
              </h2>
              <p className="text-[#7A5C40] text-base leading-relaxed mb-6">
                The Supreme Court's August 2025 order applies to Gurugram. MCG is preparing its enforcement framework. Registration is mandatory now — fines are expected to be among the highest in NCR once announced.
              </p>
              <div className="bg-white rounded-xl p-4 border-l-4 border-[#2653A0] shadow-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#EEF4FF] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#2653A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#2C1A0E] text-sm font-semibold">Gurugram — key fact</div>
                    <div className="text-[#7A5C40] text-xs leading-relaxed">Gurugram is the only NCR city where fines are yet to be formally set — registration is mandatory under the Supreme Court order right now. Act early while it's still simple.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2C1A0E] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E8600A]/20 rounded-full blur-3xl" />
              <div className="relative">
                <div className="text-[#F4E4CF]/30 text-xs font-mono uppercase tracking-wider mb-1">Non-compliance fine · MCG</div>
                <div className="text-6xl md:text-7xl font-black text-[#FF8C3A] opacity-70">Coming</div>
                <div className="text-[#F4E4CF]/40 text-sm mt-1">MCG fine announcement expected — register now before enforcement</div>
                <div className="mt-6 space-y-3">
                  {[
                    { icon: 'alert', text: 'Pet can be seized by municipal authorities' },
                    { icon: 'id', text: 'No legal proof of ownership without registration' },
                    { icon: 'clock', text: 'MCG portal fee ₹100–500 · 2–3 weeks wait' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                      <div className="w-7 h-7 bg-[#E8600A]/20 rounded flex items-center justify-center flex-shrink-0">
                        {item.icon === 'alert' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        )}
                        {item.icon === 'id' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="M14 14h4M14 10h4M6 14h4" />
                          </svg>
                        )}
                        {item.icon === 'clock' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[#F4E4CF]/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY REGISTER
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#F3EDE0]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <Badge text="Why Register" />
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">Four reasons every Gurugram pet owner needs this.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Legal Identity & Protection', desc: 'Unique MCG ID — proof of ownership and full legal status. Legally protected at all times.', icon: 'shield' },
                { title: 'Vaccination Tracking', desc: 'Digital vaccination records always up to date. WhatsApp & email reminders before every booster.', icon: 'vaccine' },
                { title: 'Lost Pet Recovery', desc: '3× more likely to be returned if lost or stolen. QR tag links to your pet\'s verified profile.', icon: 'search' },
                { title: 'Travel Certificate', desc: 'Registration certificate required for travelling with your pet on flights, trains and intercity transport.', icon: 'travel' },
              ].map((reason, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-[#2C1A0E]/10 transition-all hover:shadow-md hover:transform hover:-translate-y-1">
                  <div className="w-9 h-9 bg-[#FFF0E4] rounded-lg flex items-center justify-center">
                    {reason.icon === 'shield' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                    {reason.icon === 'vaccine' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 3l-4 4M12 6l-3 3M18 9l-3 3M9 2l-3 3M4 7l3 3M7 4l3 3" />
                        <path d="M9 14l-3 3M13 10l-3 3M16 7l-3 3" />
                        <path d="M14 18l-2 2M10 14l-2 2M7 17l-2 2" />
                      </svg>
                    )}
                    {reason.icon === 'search' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <path d="M11 8v3M11 14h.01" />
                      </svg>
                    )}
                    {reason.icon === 'travel' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-[#2C1A0E] font-semibold mt-4 text-sm">{reason.title}</h3>
                  <p className="text-[#7A5C40] text-xs mt-1 leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            DOCUMENTS NEEDED
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#2C1A0E]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-[#E8600A]/75 text-xs font-medium uppercase tracking-widest">What You'll Need</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#F4E4CF] leading-tight mt-2">
                Four documents.
                <span className="text-[#E8600A] italic block">That's all.</span>
              </h2>
              <p className="text-[#F4E4CF]/40 text-sm max-w-lg mx-auto mt-3">Upload digitally on Tailio — no photocopies, no office visits. We handle the MCG filing for you.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Anti-Rabies Certificate', desc: 'Issued by a registered vet confirming your pet received their anti-rabies vaccine.', details: ["Pet's name, gender & age", 'Vaccination date & due date', "Vet's signature & hospital stamp"], icon: 'certificate' },
                { title: 'Applicant ID Proof', desc: 'Any government-issued photo ID of the pet owner. Must be valid and clearly legible.', details: ['Aadhaar Card', 'PAN Card', 'Passport or Voter ID'], icon: 'id' },
                { title: 'Address Proof', desc: 'Proof you reside in Gurugram. Must show your current address clearly.', details: ['Aadhaar Card (serves as both)', 'Electricity or water bill', 'Rental agreement or bank statement'], icon: 'address' },
                { title: 'Photo with Your Pet', desc: 'A clear, recent photo of you with your pet dog. Both faces must be clearly visible.', details: ['Good natural lighting', 'Both owner & pet clearly visible', 'Taken within last 3 months'], icon: 'photo' },
              ].map((doc, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 bg-[#E8600A]/20 rounded-lg flex items-center justify-center">
                      {doc.icon === 'certificate' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4v16h16V4H4z" />
                          <path d="M8 8h8M8 12h6M8 16h4" />
                          <path d="M16 8v8" />
                        </svg>
                      )}
                      {doc.icon === 'id' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="M14 14h4M14 10h4M6 14h4" />
                        </svg>
                      )}
                      {doc.icon === 'address' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {doc.icon === 'photo' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      )}
                    </div>
                    <div className="w-6 h-6 bg-[#E8600A] rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                  </div>
                  <h3 className="text-[#F4E4CF] text-lg font-medium mt-4">{doc.title}</h3>
                  <p className="text-[#F4E4CF]/40 text-sm mt-2 leading-relaxed">{doc.desc}</p>
                  <div className="mt-4 space-y-2">
                    {doc.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-[#F4E4CF]/50 text-xs">
                        <div className="w-1 h-1 bg-[#E8600A] rounded-full" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {['JPG', 'PNG', 'PDF'].map((type) => (
                      <span key={type} className="px-2 py-0.5 bg-white/5 rounded text-[#F4E4CF]/30 text-[10px] font-bold">{type}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMPARISON TABLE
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#F3EDE0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">Tailio vs MCG Portal</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
                Or spend a weekend at the
                <span className="text-[#E8600A] italic block">MCG office.</span>
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#2C1A0E] grid grid-cols-3">
                <div className="px-6 py-6"><span className="text-[#F4E4CF]/20 text-[10px] font-mono uppercase tracking-wider">What you get</span></div>
                <div className="px-6 py-5 bg-[#E8600A] text-center"><span className="text-white text-xl font-light italic">Tailio.</span></div>
                <div className="px-6 py-6 text-center"><span className="text-[#F4E4CF]/35 text-[10px] font-mono uppercase tracking-wider">MCG Portal</span></div>
              </div>
              {[
                { label: 'Time to register', sub: 'From start to submission', tailio: 'Under 1 minute', portal: '2–3 weeks' },
                { label: 'Works on your phone', sub: 'No office visit needed', tailio: true, portal: false },
                { label: 'Digital certificate', sub: 'Stored on your profile', tailio: true, portal: false },
                { label: 'Vaccination reminders', sub: 'WhatsApp, SMS & email', tailio: true, portal: false },
                { label: 'Registration cost', sub: 'One-time, all-inclusive', tailio: '₹999', portal: '₹100–500' },
                { label: 'If you wait, the fine is…', sub: 'MCG enforcement active', tailio: 'None', portal: 'Pending' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-[#2C1A0E]/10 last:border-0 bg-[#FFFCF8]">
                  <div className="px-6 py-4">
                    <div className="text-[#2C1A0E] text-sm font-semibold">{row.label}</div>
                    <div className="text-[#7A5C40] text-xs">{row.sub}</div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    {typeof row.tailio === 'string' ? (
                      <span className="text-[#2C1A0E] text-sm font-bold">{row.tailio}</span>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    {typeof row.portal === 'string' ? (
                      <span className={`text-sm ${row.portal === 'Pending' ? 'text-[#A0251E] font-bold' : 'text-[#2C1A0E]'}`}>{row.portal}</span>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROCESS STEPS
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">The Process</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
              Three screens.
              <span className="text-[#E8600A] italic"> Sixty seconds.</span>
            </h2>
            <p className="text-[#7A5C40] text-sm max-w-lg mx-auto mt-3">No PDFs, no notarised forms, no office visits. Works on any phone, anywhere in Gurugram.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[52px] top-12 bottom-12 w-px bg-gradient-to-b from-[#E8600A] to-[#E8600A]/10" />
            {[
              { num: 1, title: "Register & add your pet's details", desc: "Fill in your pet's name, breed, age and your contact details. Under 60 seconds, works on any phone. No PDFs to download, no notarised forms.", tags: ['Pet name & breed', 'Age & gender', 'Under 60 seconds'] },
              { num: 2, title: 'Upload your 4 documents', desc: 'Upload digitally — JPG, PNG or PDF. No photocopies, no office visit. We handle the MCG filing on your behalf.', tags: ['Anti-Rabies Cert', 'ID + Address Proof', 'Photo with pet'] },
              { num: 3, title: 'We file with MCG. You get your certificate.', desc: 'Tailio submits directly to MCG (Municipal Corporation of Gurugram). Your official digital certificate arrives by email within 24–72 hours. No office visit. Ever.', tags: ['Registered in Gurugram', 'No office visit', 'Verified'] },
            ].map((step, i) => (
              <div key={i} className="relative pl-0 md:pl-24 mb-8 last:mb-0">
                <div className="hidden md:flex absolute left-0 top-8 w-12 h-12 bg-[#E8600A] rounded-full items-center justify-center shadow-[0_0_0_10px_rgba(232,96,10,0.15),0_0_0_8px_#FAF6EF]">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2C1A0E]/10">
                  <div className="flex items-start gap-4">
                    <div className="md:hidden w-8 h-8 bg-[#E8600A] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">{step.num}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#2C1A0E] text-xl font-semibold">{step.title}</h3>
                      <p className="text-[#7A5C40] text-sm mt-2 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {step.tags.map((tag, j) => (
                          <span key={j} className={`px-3 py-1 rounded-full text-xs font-semibold border ${step.num === 1 ? 'bg-[#E6F6ED] text-[#1A6B3A] border-[#A8DDB8]' : step.num === 2 && j === 0 ? 'bg-[#EEF4FF] text-[#2653A0] border-[#B3CEFF]' : 'bg-[#F3EDE0] text-[#7A5C40] border-[#2C1A0E]/20'}`}>{tag}</span>
                        ))}
                      </div>
                      {step.num === 3 && (
                        <div className="mt-6 bg-[#2C1A0E] rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 bg-[#E8600A]/20 rounded-full px-3 py-1">
                              <div className="w-1.5 h-1.5 bg-[#F4A56A] rounded-full" />
                              <span className="text-[#F4A56A] text-[10px] font-mono uppercase tracking-wider">Certificate issued</span>
                            </div>
                            <div className="text-[#F4E4CF] text-2xl font-bold mt-2">Bruno</div>
                            <div className="text-[#F4E4CF]/35 text-[10px] font-mono tracking-wider">TL-GG-2025-54038</div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {['Registered in Gurugram', 'No office visit', 'Verified'].map((tag) => (
                                <span key={tag} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-[#F4E4CF]/60 text-xs">
                                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="w-14 h-14 bg-[#FAF6EF] rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <rect x="7" y="7" width="3" height="3" rx="0.5" />
                              <rect x="14" y="7" width="3" height="3" rx="0.5" />
                              <rect x="7" y="14" width="3" height="3" rx="0.5" />
                              <rect x="14" y="14" width="3" height="3" rx="0.5" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIAL
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-2xl mx-auto text-center">
          <div className="text-[#E8600A] text-lg tracking-[3px] mb-4">★★★★★</div>
          <blockquote className="text-[#2C1A0E] text-2xl font-bold italic leading-relaxed">
            "My RWA sent a circular about Gurugram registration being imminent. I didn't want to scramble later — Tailio made it a 5-minute job. Certificate came in 48 hours."
          </blockquote>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-10 h-10 bg-[#E8600A] rounded-full flex items-center justify-center text-white font-bold">R</div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[#2C1A0E] font-semibold">Radhika Nair</span>
                <span className="px-2 py-0.5 bg-[#FFF0E4] rounded-full text-[#C04E06] text-xs font-semibold border border-[#FFCCA0]">🐾 Mochi</span>
              </div>
              <div className="text-[#7A5C40] text-xs">DLF Phase 4, Gurugram</div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRICING
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 bg-[#2C1A0E]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-[#E8600A]/75 text-xs font-medium uppercase tracking-widest mb-2">One Price. Everything Included.</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#F4E4CF] leading-tight">
              Done. You're at the
              <span className="text-[#E8600A] italic block">end of the path.</span>
            </h2>
            <p className="text-[#F4E4CF]/40 text-sm mt-3 max-w-lg mx-auto">Sixty seconds from here to legally issued. Certificate valid with MCG.</p>
            <div className="mt-12 bg-white/5 rounded-2xl p-8 md:p-10 border border-[#E8600A]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8600A]/20 rounded-full blur-3xl" />
              <div className="inline-flex items-center gap-2 bg-[#FFF4E4] rounded-full px-3 py-1 border border-[#FFCCA0] relative z-10">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#B85C00" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span className="text-[#B85C00] text-xs font-semibold">Launch Offer — Save ₹1,000</span>
              </div>
              <div className="relative z-10 mt-6">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[#E8600A] text-4xl font-black">₹</span>
                  <span className="text-[#E8600A] text-6xl font-black">999</span>
                </div>
                <div className="text-[#F4E4CF]/30 text-sm line-through">Regular price ₹1,999</div>
                <div className="text-[#F4E4CF]/40 text-xs mt-1">Per pet · Valid 1 year · All taxes inclusive · MCG accepted</div>
              </div>
              <div className="mt-8 space-y-3 text-left relative z-10">
                {[
                  'MCG Municipal Filing — all paperwork end to end',
                  'Official Govt Certificate — delivered within 24–72 hrs',
                  'Vaccination Tracker — digital records + auto-reminders',
                  'Renewal Reminders — WhatsApp & email before expiry',
                  'Legal Pet Profile — proof of ownership always on record'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <div className="w-6 h-6 bg-[#E8600A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#F4A56A" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#F4E4CF]/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleOpenRegisterModal}
                className="w-full mt-8 bg-[#E8600A] hover:bg-[#d45408] text-white py-4 rounded-full text-lg font-bold shadow-[0_4px_0_#C04E06] border-2 border-[#C04E06] transition-colors relative z-10"
                aria-label="Register your pet with MCG Gurugram now for ₹999"
              >
                Register Your Pet — ₹999 →
              </button>
              <div className="flex flex-wrap justify-center gap-6 mt-4 relative z-10">
                {['Secure payment', 'Legally valid', '24–72 hr approval'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#F4E4CF/30" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    <span className="text-[#F4E4CF]/30 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">Common Questions</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
              Everything about Gurugram
              <span className="text-[#E8600A] italic block">registration.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Is pet registration really mandatory in Gurugram?', a: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCG (Municipal Corporation of Gurugram) to enforce mandatory pet registration across Gurugram. The Supreme Court\'s August 2025 order applies to Gurugram. MCG is preparing its enforcement framework. Registration is mandatory now — fines are expected to be among the highest in NCR once announced.' },
              { q: "Is Tailio's registration legally valid in Gurugram?", a: 'Yes, Tailio is an authorized platform that files directly with MCG. Your certificate is officially issued by the municipal corporation and is fully valid.' },
              { q: 'What is the fine for not registering in Gurugram?', a: 'Fines are pending announcement, but are expected to be among the highest in NCR once formally set. Register now to avoid penalties.' },
              { q: 'What documents do I need to register?', a: 'You need four documents: Anti-Rabies Certificate, Applicant ID Proof, Address Proof, and a Photo with Your Pet.' },
              { q: 'How much does registration cost on Tailio?', a: 'Registration costs ₹999 one-time, all-inclusive. This includes the MCG filing fee and your official digital certificate.' },
              { q: 'How long does it take to get the certificate?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission.' },
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        <Footer />

        {/* Modals */}
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={handleCloseRegisterModal}
          onSwitchToLogin={handleSwitchToLogin}
        />

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={handleSwitchToRegister}
        />
      </div>
    </>
  );
}