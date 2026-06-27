'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import RegisterModal from './component/RegisterModal';
import LoginModal from './component/LoginModal';
import Footer from './component/Footer';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

/* ─── Shared Badge Component ─────────────────────────────────────────────── */
function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  // Always use desktop size, no client-side only rendering needed
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

/* ─── FAQ Item Component ─────────────────────────────────────────────────── */
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

/* ─── Main Page Component ────────────────────────────────────────────────── */
export default function HomePage() {
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

  const handleHeroLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(44,26,14,0.06)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };

  const handleHeroLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  // Don't render dynamic content until mounted
  if (!mounted) {
    // Return a minimal placeholder that matches server render
    return (
      <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0, background: '#FAF6EF' }}>
        <div style={{ background: '#FAF6EF', width: '100%', position: 'relative', minHeight: 770, overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>
            {/* Minimal content to maintain structure */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0, background: '#FAF6EF' }}>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <div style={{
  background: '#FAF6EF',
  width: '100%',
  position: 'relative',
  minHeight: isMobile ? 600 : 770,
  overflow: 'hidden'
}}>
  {/* Full Background Image - More faded */}
  <div style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  }}>
    <Image
      src="/images/coffe-bean-print.png"
      alt="Background"
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
          Supreme Court of India has mandated pet registration
        </span>
        <span style={{ color: '#FFDBB8', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '24px' }}>— Comply now</span>
      </div>

      <div style={{ paddingTop: 5.1, textAlign: isMobile ? 'center' : 'left' }}>
        <div style={{
          color: '#2C1A0E',
          fontSize: getResponsiveFontSize(64, 48, 32),
          fontFamily: F.fraunces,
          fontWeight: 900,
          lineHeight: 1.2,
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          Your pet deserves
        </div>
        <div style={{
          fontSize: getResponsiveFontSize(64, 48, 32),
          fontFamily: F.fraunces,
          lineHeight: 1.2,
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          <span style={{ color: '#2C1A0E', fontWeight: 900 }}>an</span>
          <span style={{ color: '#E8600A', fontStyle: 'italic', fontWeight: 700 }}> identity,</span>
        </div>
        <div style={{
          color: '#2C1A0E',
          fontSize: getResponsiveFontSize(64, 48, 32),
          fontFamily: F.fraunces,
          fontWeight: 900,
          lineHeight: 1.2,
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          the law requires.
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
        Register your pet in just 1 minute. Get a government certified registration certificate, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR.
      </p>

      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        paddingTop: 9.1,
        paddingBottom: 25.1,
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
          Register Your Pet →
        </button>
        <a 
          href="#why-register" 
          style={{
            padding: isMobile ? '11px 20px' : '14.25px 20px 15.25px',
            borderRadius: 9,
            outline: '1px rgba(44,26,14,0.18) solid',
            outlineOffset: -1,
            color: '#2C1A0E',
            fontSize: getResponsiveFontSize(14, 13, 12),
            fontFamily: F.dmSans,
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={handleHeroLinkEnter}
          onMouseLeave={handleHeroLinkLeave}
        >
          Why it matters
        </a>
      </div>

      <div style={{
        width: isMobile ? '100%' : 554,
        display: 'flex',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        borderRadius: 13,
        overflow: 'hidden',
        background: 'transparent',
        gap: isMobile ? 8 : 0
      }}>
        {[
          { num: '>90%', label: 'Pets unregistered in Delhi' },
          { num: '₹10K', label: 'Fine for non-compliance' },
          { num: '1 min', label: 'To register on Tailio' },
          { num: '33M+', label: 'Pet dogs in India' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1,
            padding: isMobile ? '12px 8px' : '16px 12px',
            textAlign: 'center',
            background: isMobile ? 'rgba(243, 237, 224, 0.8)' : 'transparent',
            borderRadius: isMobile ? 12 : 0,
            margin: isMobile ? '4px' : 0,
            backdropFilter: isMobile ? 'blur(4px)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <div style={{ color: '#C04E06', fontSize: getResponsiveFontSize(26, 22, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '26px' }}>{s.num}</div>
            <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans, lineHeight: '15.4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {!isMobile && (
      <div style={{ position: 'relative', width: 580, height: 580, flexShrink: 0 }}>
        <Image
          src="/images/homeBanner.png"
          alt="Happy pet with owner"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    )}
  </div>
</div>

      {/* ══════════════════════════════════════
          WHY REGISTER SECTION
      ══════════════════════════════════════ */}
      <div id="why-register" style={{ background: '#FAF6EF', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '45px 40px' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, marginBottom: 40 }}>

            <div style={{ width: isMobile ? '100%' : 548, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 14px',
                background: '#FFF0E4',
                borderRadius: 100,
                outline: '1px #FFCCA0 solid',
                outlineOffset: -1,
                width: 'fit-content'
              }}>
                <span style={{
                  color: '#C04E06',
                  fontSize: getResponsiveFontSize(10, 9, 9),
                  fontFamily: F.dmSans,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  lineHeight: '15px',
                  letterSpacing: '1.20px',
                  whiteSpace: 'nowrap'
                }}>It's the law now</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '41.8px', marginTop: 15, marginBottom: 15 }}>
                Pet registration isn't optional anymore
              </div>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, lineHeight: '23.93px', marginBottom: 20 }}>
                The Supreme Court of India, through the Animal Birth Control (ABC) Rules 2023, has directed all municipal corporations in Delhi NCR to enforce mandatory pet registration.
              </p>

              {[
                { title: 'Mandated by the Supreme Court', desc: "The ABC Rules 2023 and the SC's landmark August 2025 order directed Delhi NCR authorities to enforce registration for all pet animals — not just dogs.", icon: '/images/supreme-court.png' },
                { title: 'India accounts for 36% of global rabies deaths', desc: 'Pet registration ensures vaccination compliance, directly reducing rabies risk in urban areas like Delhi NCR.', icon: '/images/bacteria.png' },
                { title: 'Unregistered pets contribute to stray population', desc: "Abandoned unregistered pets are a leading cause of Delhi's stray dog problem. Registration creates accountability.", icon: '/images/dog-icon.png' },
                { title: 'Legal ID = Full Protection', desc: 'A registered pet has a verified health and vaccination history, making it legally protected at all times.', icon: '/images/smartphone.png' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 16, marginBottom: 20, transition: 'all 0.3s ease', cursor: 'default' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                  <div style={{ width: 40, height: 40, background: '#FFF0E4', borderRadius: 9, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Image src={item.icon} alt={item.title} width={24} height={24} style={{ objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ width: isMobile ? '100%' : 548, display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#2C1A0E', borderRadius: 13, padding: isMobile ? '20px' : '24px 32px', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(44, 36, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '66px' }}>&gt;90%</div>
                <div style={{ width: isMobile ? 0 : 1.5, height: 40, background: 'rgba(255,255,255,0.10)' }} />
                <div>
                  <div style={{ color: '#F4E4CF', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500 }}>Pets Unregistered in Delhi NCR</div>
                  <div style={{ color: 'rgba(244,228,207,0.38)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans }}>Municipal enforcement now active</div>
                </div>
              </div>

              <div style={{ background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', boxShadow: '0px 4px 20px rgba(44,26,14,0.08)', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: isMobile ? '20px' : '24px 24px 20px', flex: 1 }}>
                  <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 16 }}>Why Registration Matters</div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                    {[
                      { title: 'Legal Identity & Protection', desc: 'Legal ID — proof of ownership and legal status.', icon: '/images/document.png' },
                      { title: 'Vaccination Tracking', desc: 'Digital records — always up to date.', icon: '/images/user.png' },
                      { title: 'Lost Pet Recovery', desc: '3× more likely to be returned if lost or stolen.', icon: '/images/search.png' },
                      { title: 'Crucial for Travel', desc: 'Registration certificate is required for traveling with your pet.', icon: '/images/shield.png' },
                    ].map((item) => (
                      <div key={item.title} style={{ padding: 16, background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: 'default' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0px 4px 12px rgba(44,26,14,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <div style={{ width: 32, height: 32, background: '#FFF0E4', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                          <Image src={item.icon} alt={item.title} width={20} height={20} style={{ objectFit: 'contain' }} />
                        </div>
                        <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                        <div style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(11.5, 10, 10), fontFamily: F.dmSans }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#F3EDE0', borderRadius: 18, padding: isMobile ? '20px' : '33px 41px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: isMobile ? 20 : 24 }}>
            {[
              { num: '~913', label: 'Registered dogs in Delhi municipality', sub: 'vs. an estimated few lakhs of pet dogs' },
              { num: '<10%', label: 'Pet owners who have registered', sub: 'Study, East Delhi urban colony' },
              { num: '86%', label: 'Owners unaware of rabies risk', sub: 'PMC / UCMS study, Delhi' },
              { num: '36%', label: 'Global rabies deaths happen in India', sub: 'WHO / Supreme Court records' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                <div style={{ color: '#C04E06', fontSize: getResponsiveFontSize(36, 30, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '54px' }}>{s.num}</div>
                <div style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(13, 12, 11) }}>{s.label}</div>
                <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(10.5, 9, 9), fontStyle: 'italic' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KNOW THE FINES SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding(), textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '5px 14px',
              background: 'rgba(255,140,58,0.12)',
              borderRadius: 100,
              outline: '1px rgba(255,140,58,0.20) solid',
              outlineOffset: -1
            }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.40px' }}>Know the fines</span>
            </div>
          </div>
          <div style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(54, 40, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '57.24px' }}>
            Ignore Registration, Pay the <span style={{ color: '#FF8C3A', fontStyle: 'italic' }}>Penalty</span>
          </div>
          <p style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(15, 13, 12), maxWidth: 962, margin: '20px auto 40px' }}>
            Municipal corporations are actively enforcing registration. These are the current fines across Delhi NCR.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 10 }}>
            {[
              { city: 'Delhi', amount: '₹500+', desc: 'Fee enforcement underway. Fines escalating with each MCD drive.', icon: '/images/delhi.png' },
              { city: 'Gurugram', amount: 'Pending', desc: 'Registration encouraged strongly. Fines to be announced — act now.', icon: '/images/gurugram.png' },
              { city: 'Noida', amount: '₹10,000', desc: 'Highest fine in NCR. Noida authority actively penalising non-compliance.', highlight: true, icon: '/images/noida.png' },
              { city: 'Ghaziabad', amount: '₹5,000', desc: 'Registration fee raised from ₹200 to ₹1,000 in April 2024.', icon: '/images/ghaziabad.png' },
            ].map((c) => (
              <div key={c.city} style={{ padding: '12px 10px', background: 'rgba(255,140,58,0.08)', borderRadius: 13, outline: '1px rgba(255,140,58,0.22) solid', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'rgba(255,140,58,0.15)';
                  e.currentTarget.style.boxShadow = '0px 8px 24px rgba(255,140,58,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,140,58,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(8, 8, 7), fontFamily: F.dmMono, textTransform: 'uppercase', marginBottom: 8 }}>{c.city}</div>
                <div style={{ width: 40, height: 40, background: 'rgba(250,246,239,0.08)', borderRadius: 8, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src={c.icon} alt={c.city} width={28} height={28} style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ color: '#FF8C3A', fontSize: c.amount === 'Pending' ? getResponsiveFontSize(12, 11, 10) : getResponsiveFontSize(20, 18, 16), fontFamily: c.amount === 'Pending' ? F.dmSans : F.fraunces, fontWeight: 900 }}>{c.amount}</div>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, marginTop: 8 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, background: '#FAF6EF', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ width: isMobile ? '100%' : 5, height: isMobile ? 5 : 'auto', background: 'linear-gradient(180deg, #C04E06 0%, #FF8C3A 100%)' }} />
            <div style={{ flex: 1, padding: isMobile ? '24px' : '36px 40px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: '#FFF0E4', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/images/id.png" alt="Warning" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <span style={{ color: '#C04E06', fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Legal Warning</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(30, 24, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '36px', marginBottom: 16 }}>
                Without proper Registration, your pet <span style={{ color: '#E8600A', fontStyle: 'italic' }}>can be seized</span> by municipal authorities — no questions asked.
              </div>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14, 13, 12), lineHeight: '23.1px', marginBottom: 20 }}>
                In disputes or complaints, municipal authorities have the power to seize your pet. An unregistered pet has no legal standing and neither does its owner. Don't wait until it's too late.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {['Pet can be seized', 'No legal proof of ownership', 'Fines up to ₹10,000'].map((tag) => (
                  <div key={tag} style={{ padding: '6px 14px', background: '#FFF0E4', borderRadius: 100, transition: 'all 0.3s ease', cursor: 'default' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = '#FFCCA0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = '#FFF0E4';
                    }}>
                    <span style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(12.5, 11, 10), fontWeight: 500 }}>{tag}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleOpenRegisterModal} 
                style={{
                  display: 'inline-block',
                  padding: isMobile ? '12px 24px' : '14px 28px',
                  background: '#E8600A',
                  borderRadius: 9,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  boxShadow: '0px 2px 0px #C04E06',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0px 6px 20px rgba(232,96,10,0.35)';
                  e.currentTarget.style.background = '#C06A18';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0px 2px 0px #C04E06';
                  e.currentTarget.style.background = '#E8600A';
                }}
              >
                Start Registration →
              </button>
            </div>
            {!isMobile && (
              <div style={{ width: 220, background: '#2C1A0E', padding: '22px 0', textAlign: 'center' }}>
                {[
                  { num: '>90%', label: 'Pets unregistered in Delhi NCR' },
                  { num: '₹10K', label: 'Maximum fine in Noida' },
                  { num: '7', label: 'Days to comply after RWA notice' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '33px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                    <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(40, 36, 32), fontFamily: F.fraunces, fontWeight: 900 }}>{s.num}</div>
                    <div style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(12, 11, 10) }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRICING SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#F3EDE0', width: '100%' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: getResponsivePadding() }}>
          
          <div style={{ 
            background: '#1F1108', 
            borderRadius: 20, 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            transition: 'box-shadow 0.3s ease',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.2)',
          }}>
            
            <div style={{ 
              flex: 1, 
              padding: '48px 44px', 
              borderRight: !isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none',
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease',
            }}>
              <div>
                <div style={{ 
                  paddingLeft: 14, 
                  paddingRight: 14, 
                  paddingTop: 5, 
                  paddingBottom: 5, 
                  borderRadius: 999, 
                  outline: '1px solid rgba(255,255,255,0.25)', 
                  outlineOffset: -1, 
                  display: 'inline-flex',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 10, fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.20px' }}>Simple, Transparent Pricing</span>
                </div>
                
                <div style={{ marginTop: 19.2, flexDirection: 'column', display: 'flex' }}>
                  <span style={{ 
                    color: 'white', 
                    fontSize: getResponsiveFontSize(44, 36, 28), 
                    fontFamily: 'Fraunces', 
                    fontWeight: 900, 
                    lineHeight: '1.2',
                    transition: 'transform 0.3s ease',
                  }}>One price.</span>
                  <span style={{ 
                    color: '#E07B20', 
                    fontSize: getResponsiveFontSize(44, 36, 28), 
                    fontFamily: 'Fraunces', 
                    fontStyle: 'italic', 
                    fontWeight: 900, 
                    lineHeight: '1.2',
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}>Everything<br/>included.</span>
                </div>
                
                <div style={{ marginTop: 19.2 }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'Inter', fontWeight: 400, lineHeight: '20.80px' }}>No hidden charges, no surprise fees. ₹299 covers your complete pet registration filing, certificate, and everything in between. Municipal fees are collected directly by the authority.</span>
                </div>
              </div>
              
              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '/images/office-1.png', title: 'Municipal Filing', desc: 'We handle MCD / Noida Authority / GMC paperwork end to end.' },
                  { icon: '/images/certificate-1.png', title: 'Official Certificate', desc: 'Govt-issued, filed within 24–72 hrs' },
                  { icon: '/images/vaccine.png', title: 'Vaccination Tracker', desc: 'Digital records + auto-reminders so you never miss a booster.' },
                  { icon: '/images/reminder.png', title: 'Renewal Reminders', desc: 'WhatsApp & email alerts before your annual expiry date.' }
                ].map((item, idx) => (
                  <div 
                    key={item.title} 
                    style={{ 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: 12, 
                      padding: '18px 16px', 
                      outline: '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                      transform: 'translateY(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(224,123,32,0.12)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.outline = '1px solid rgba(224,123,32,0.3)';
                      e.currentTarget.style.boxShadow = '0px 8px 24px rgba(224,123,32,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ 
                      width: 48, 
                      height: 48, 
                      background: 'rgba(224,123,32,0.15)', 
                      borderRadius: 10, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginBottom: 14,
                      transition: 'all 0.3s ease',
                    }}>
                      <img src={item.icon} alt={item.title} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                    </div>
                    <div style={{ color: '#E07B20', fontSize: 13, fontFamily: 'Inter', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 11.5, fontFamily: 'Inter', lineHeight: '17.25px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              flex: 1, 
              padding: '48px 44px', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                  <div style={{ 
                    paddingLeft: 14, 
                    paddingRight: 14, 
                    paddingTop: 5, 
                    paddingBottom: 5, 
                    borderRadius: 999, 
                    outline: '1px solid rgba(255,255,255,0.25)', 
                    outlineOffset: -1,
                    transition: 'all 0.3s ease',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 10, fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.20px' }}>All Inclusive</span>
                  </div>
                  <div style={{ 
                    paddingLeft: 12, 
                    paddingRight: 12, 
                    paddingTop: 5, 
                    paddingBottom: 5, 
                    background: '#E8C832', 
                    borderRadius: 999, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 6,
                    transition: 'all 0.3s ease',
                    animation: 'pulse 2s infinite',
                  }}>
                    <div style={{ width: 6, height: 6, background: '#1A0A00', borderRadius: 3 }} />
                    <span style={{ color: '#1A0A00', fontSize: 10, fontFamily: 'Inter', fontWeight: 700, letterSpacing: '0.60px' }}>LAUNCH OFFER — SAVE ₹300</span>
                  </div>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
                    <span style={{ 
                      color: 'rgba(255,255,255,0.60)', 
                      fontSize: getResponsiveFontSize(28, 24, 20), 
                      fontFamily: 'Inter', 
                      fontWeight: 700, 
                      paddingBottom: 14,
                      transition: 'all 0.3s ease',
                    }}>₹</span>
                    <span style={{ 
                      color: 'white', 
                      fontSize: getResponsiveFontSize(88, 70, 50), 
                      fontFamily: "'Fraunces', serif", 
                      fontWeight: 900,
                      fontStyle: 'normal',
                      lineHeight: '1',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      display: 'inline-block',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 30px rgba(224,123,32,0.6)';
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}>
                      299
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: getResponsiveFontSize(60, 48, 36), fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '1', paddingBottom: 6 }}>/—</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: '#E07B20', fontSize: 13, fontFamily: 'Inter', fontWeight: 600 }}>+ Municipal fees (as applicable)</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, fontFamily: 'Inter', textDecoration: 'line-through' }}>Regular price ₹599</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, fontFamily: 'Inter' }}>Applicable GST will be added as per government regulations</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ color: '#E07B20', fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }}>Per pet · Valid for 1 financial year</span>
                  </div>
                </div>
                
                <div style={{ marginTop: 20, marginBottom: 28 }}>
                  {[
                    'Register in under 1 minute, from your phone',
                    'Legally secured Govt issued certificate (filed in 24-72 hrs)',
                    'Vaccination tracker — schedule, record, share with any vet',
                    'Filed in 24–72 hours'
                  ].map((text, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: 12, 
                        marginBottom: 10,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <img src="/images/correct.png" alt="check" style={{ width: 18, height: 18, marginTop: 2 }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'Inter', lineHeight: '18.20px' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <button 
                  onClick={handleOpenRegisterModal}
                  style={{ 
                    width: '100%', 
                    background: '#E07B20', 
                    border: 'none', 
                    borderRadius: 10, 
                    padding: '17px 24px', 
                    color: 'white', 
                    fontSize: 15, 
                    fontFamily: 'Inter', 
                    fontWeight: 700, 
                    cursor: 'pointer',
                    marginBottom: 14,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#C06A18';
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0px 8px 24px rgba(224,123,32,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#E07B20';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Register Your Pet — ₹299 →
                </button>
                
                <div style={{ display: 'flex', gap: 20, marginBottom: 18, flexWrap: 'wrap' }}>
                  {['Secure payment', 'Legally valid', '24–72 hr filing'].map((badge) => (
                    <span 
                      key={badge} 
                      style={{ 
                        color: 'rgba(255,255,255,0.35)', 
                        fontSize: 11, 
                        fontFamily: 'Inter',
                        transition: 'color 0.3s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div 
                    style={{ 
                      padding: '14px 16px', 
                      background: 'rgba(255,255,255,0.04)', 
                      borderRadius: 10, 
                      outline: '1px solid rgba(255,255,255,0.07)', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 12,
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(224,123,32,0.1)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.outline = '1px solid rgba(224,123,32,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.07)';
                    }}
                  >
                    <img src="/images/shield-2.png" alt="guarantee" style={{ width: 22, height: 22 }} />
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontFamily: 'Inter', fontWeight: 700 }}>100% Refund Guarantee</div>
                      <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 11.5, fontFamily: 'Inter', lineHeight: '17.25px' }}>If we can't file your registration, you get every rupee back. No questions asked.</div>
                    </div>
                  </div>
                  <div 
                    style={{ 
                      padding: '14px 16px', 
                      background: 'rgba(255,255,255,0.04)', 
                      borderRadius: 10, 
                      outline: '1px solid rgba(255,255,255,0.07)', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 12,
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(224,123,32,0.1)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.outline = '1px solid rgba(224,123,32,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.07)';
                    }}
                  >
                    <img src="/images/location.png" alt="location" style={{ width: 22, height: 22 }} />
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontFamily: 'Inter', fontWeight: 700 }}>Available Across India</div>
                      <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 11.5, fontFamily: 'Inter', lineHeight: '17.25px' }}>Delhi, Noida, Gurgaon, Mumbai, Bangalore & 50+ cities covered.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

<style jsx>{`
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.9;
    }
  }
`}</style>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <div style={{ background: '#F3EDE0', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), textAlign: 'center' }}>
          <Badge text="Happy pet parents" />
          <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, marginTop: 16, marginBottom: 16 }}>They did it. So can you.</div>
          <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), marginBottom: 40 }}>Pet parents from Delhi NCR who registered with Tailio.</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 16 }}>
            {[
              { name: 'Priya Sharma', location: 'Dwarka, Delhi', pet: 'Bruno', review: '"I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"' },
              { name: 'Arjun Mehta', location: 'Sector 62, Noida', pet: 'Luna', review: '"I tried the Noida Municipal portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn\'t expect."' },
              { name: 'Sneha Kapoor', location: 'Indirapuram, Ghaziabad', pet: 'Coco', review: '"The vaccination reminder alone is worth it. I used to forget booster dates all the time. Now Tailio pings me on WhatsApp a week before. My vet loves it too."' },
            ].map((t) => (
              <div key={t.name} style={{ background: '#FFFCF8', padding: 24, borderRadius: 18, textAlign: 'left', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0px 8px 24px rgba(44,26,14,0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ color: '#E8600A', fontSize: getResponsiveFontSize(13, 12, 11), letterSpacing: '2px', marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(13.5, 12, 11), lineHeight: '22.28px', marginBottom: 16 }}>{t.review}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ color: '#2C1A0E', fontWeight: 600, fontSize: getResponsiveFontSize(13.5, 12, 11) }}>{t.name}</div>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11.5, 10, 9) }}>{t.location}</div>
                  </div>
                  <div style={{ padding: '4px 12px', background: '#FFF0E4', borderRadius: 100, transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FFCCA0';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFF0E4';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}>
                    <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(12, 11, 10), fontWeight: 600 }}>{t.pet}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: getResponsivePadding(), textAlign: 'center' }}>
          <Badge text="Common questions" />
          <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, marginTop: 16, marginBottom: 16 }}>Everything you want to know</div>
          <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), marginBottom: 40 }}>If it's not here, our support team responds within 60 minutes.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                q: 'Is pet registration really mandatory in Delhi NCR?',
                a: 'Yes, the Supreme Court of India has mandated pet registration across Delhi NCR through the Animal Birth Control (ABC) Rules 2023. All pet owners in Delhi, Noida, Ghaziabad, and Gurugram are required to register their pets with the respective municipal corporations.'
              },
              {
                q: 'Is Tailio\'s registration legally valid?',
                a: 'Absolutely. We file directly with MCD, Noida Authority, and GMC. The certificate you receive is the official government-issued document — not a Tailio proxy. Your registration is legally valid across India.'
              },
              {
                q: 'What documents do I need to register?',
                a: 'You need 4 documents: (1) Anti-Rabies Vaccination Certificate, (2) Applicant ID Proof (Aadhaar, PAN, Passport, or Voter ID), (3) Address Proof (Aadhaar, electricity/water bill, rental agreement, or bank statement), and (4) A clear photo with your pet.'
              },
              {
                q: 'How much does registration cost on Tailio?',
                a: 'Registration costs ₹999 all-inclusive (launch offer, regular price ₹1,999). This covers municipal filing, digital certificate, vaccination tracker, and renewal reminders. No hidden charges.'
              },
              {
                q: 'Can I register cats and other pets — not just dogs?',
                a: 'Currently, we support dog registration across Delhi NCR. Support for cats and other pets is coming soon. Stay tuned!'
              },
              {
                q: 'What happens if I don\'t register?',
                a: 'Municipal authorities can seize unregistered pets during disputes or complaints. You may also face fines up to ₹10,000. Unregistered pets have no legal standing, leaving both you and your pet unprotected.'
              },
            ].map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(163deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '34px 40px', textAlign: 'center' }}>
          <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 60 : 78, margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={isMobile ? 40 : 52} height={isMobile ? 60 : 78} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="65" rx="22" ry="18" fill="#FFFFFF" />
              <ellipse cx="28" cy="38" rx="11" ry="13" fill="#FFFFFF" transform="rotate(-15, 28, 38)" />
              <ellipse cx="50" cy="32" rx="11" ry="13" fill="#FFFFFF" />
              <ellipse cx="72" cy="38" rx="11" ry="13" fill="#FFFFFF" transform="rotate(15, 72, 38)" />
            </svg>
          </div>

          <div style={{ color: '#FFFFFF', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '58.24px', marginBottom: 16 }}>
            One Form<br />One Minute<br />One Year of Security
          </div>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: getResponsiveFontSize(15, 13, 12), maxWidth: 520, margin: '0 auto 20px' }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad &amp; Gurugram who are already compliant.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleOpenRegisterModal} 
              style={{
                padding: isMobile ? '12px 24px' : '14px 32px',
                background: '#FFFFFF',
                borderRadius: 9,
                color: '#C04E06',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0px 2px 0px #C04E06',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0px 6px 24px rgba(255,255,255,0.3)';
                e.currentTarget.style.background = '#F5E6D0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0px 2px 0px #C04E06';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              Register Now
            </button>
            <a 
              href="#why-register" 
              style={{
                padding: isMobile ? '12px 24px' : '14px 32px',
                borderRadius: 9,
                outline: '1px solid rgba(255,255,255,0.40)',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.40)';
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <Footer/>

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
  );
}