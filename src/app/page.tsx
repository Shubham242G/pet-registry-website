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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

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
          fontSize: isMobile ? 8 : 9.5,
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
        fontSize: isMobile ? 9 : 10,
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
      overflow: 'hidden'
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
          gap: 16
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
          flexShrink: 0
        }}>
          <span style={{ color: '#C04E06', fontSize: 16, fontFamily: F.dmSans, fontWeight: 700 }}>{open ? '−' : '+'}</span>
        </div>
      </button>

      {/* Answer section - only visible when open */}
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
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
        {/* Full Background Image */}
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
          background: 'rgba(250, 246, 239, 0.85)',
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
          {/* Left Column - Text Content */}
          <div style={{
            width: isMobile ? '100%' : 652,
            display: 'flex',
            flexDirection: 'column',
            gap: 14.9,
            textAlign: isMobile ? 'center' : 'left',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}>
            {/* Compliance Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '7px 16px',
              background: '#2C1A0E',
              borderRadius: 100,
              gap: 8,
              alignSelf: isMobile ? 'center' : 'flex-start',
              flexWrap: 'wrap'
            }}>
              <span style={{ color: 'rgba(255,243,224,0.75)', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.25px' }}>
                Supreme Court of India has mandated pet registration
              </span>
              <span style={{ color: '#FFDBB8', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24px' }}>— Comply now</span>
            </div>

            {/* Headline - Explicit colors set */}
            <div style={{ paddingTop: 5.1, textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{
                color: '#2C1A0E',
                fontSize: getResponsiveFontSize(64, 48, 32),
                fontFamily: F.fraunces,
                fontWeight: 900,
                lineHeight: 1.2,
                whiteSpace: 'nowrap'
              }}>
                Your pet deserves
              </div>
              <div style={{
                fontSize: getResponsiveFontSize(64, 48, 32),
                fontFamily: F.fraunces,
                lineHeight: 1.2,
                whiteSpace: 'nowrap'
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
                whiteSpace: 'nowrap'
              }}>
                the law requires.
              </div>
            </div>

            {/* Description */}
            <p style={{
              maxWidth: isMobile ? '100%' : 480,
              color: '#7A5C40',
              fontSize: getResponsiveFontSize(14.5, 13, 12),
              fontFamily: F.dmSans,
              lineHeight: '23.93px',
              margin: 0,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              Register your pet in just 1 minute. Get a verified digital ID, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              paddingTop: 9.1,
              paddingBottom: 25.1,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <button onClick={handleOpenRegisterModal} style={{
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
                border: 'none'
              }}>
                Register Your Pet →
              </button>
              <a href="#why-register" style={{
                padding: isMobile ? '11px 20px' : '14.25px 20px 15.25px',
                borderRadius: 9,
                outline: '1px rgba(44,26,14,0.18) solid',
                outlineOffset: -1,
                color: '#2C1A0E',
                fontSize: getResponsiveFontSize(14, 13, 12),
                fontFamily: F.dmSans,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Why it matters
              </a>
            </div>

            {/* Stats Strip */}
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
                  background: isMobile ? '#F3EDE0' : 'transparent',
                  borderRadius: isMobile ? 12 : 0,
                  margin: isMobile ? '4px' : 0
                }}>
                  <div style={{ color: '#C04E06', fontSize: getResponsiveFontSize(26, 22, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '26px' }}>{s.num}</div>
                  <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans, lineHeight: '15.4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
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

            {/* Left Column */}
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

              {/* Feature List */}
              {[
                { title: 'Mandated by the Supreme Court', desc: "The ABC Rules 2023 and the SC's landmark August 2025 order directed Delhi NCR authorities to enforce registration for all pet animals — not just dogs.", icon: '/images/supreme-court.png' },
                { title: 'India accounts for 36% of global rabies deaths', desc: 'Pet registration ensures vaccination compliance, directly reducing rabies risk in urban areas like Delhi NCR.', icon: '/images/bacteria.png' },
                { title: 'Unregistered pets contribute to stray population', desc: "Abandoned unregistered pets are a leading cause of Delhi's stray dog problem. Registration creates accountability.", icon: '/images/dog-icon.png' },
                { title: 'Legal ID = Full Protection', desc: 'A registered pet has a verified health and vaccination history, making it legally protected at all times.', icon: '/images/smartphone.png' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
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

            {/* Right Column */}
            <div style={{ width: isMobile ? '100%' : 548, display: 'flex', flexDirection: 'column' }}>
              {/* Stat Card */}
              <div style={{ background: '#2C1A0E', borderRadius: 13, padding: isMobile ? '20px' : '24px 32px', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(44, 36, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '66px' }}>&gt;90%</div>
                <div style={{ width: isMobile ? 0 : 1.5, height: 40, background: 'rgba(255,255,255,0.10)' }} />
                <div>
                  <div style={{ color: '#F4E4CF', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500 }}>Pets Unregistered in Delhi NCR</div>
                  <div style={{ color: 'rgba(244,228,207,0.38)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans }}>Municipal enforcement now active</div>
                </div>
              </div>

              {/* Why Registration Matters Card */}
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
                      <div key={item.title} style={{ padding: 16, background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', display: 'flex', flexDirection: 'column' }}>
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

          {/* Bottom Stats Strip */}
          <div style={{ background: '#F3EDE0', borderRadius: 18, padding: isMobile ? '20px' : '33px 41px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: isMobile ? 20 : 24 }}>
            {[
              { num: '~913', label: 'Registered dogs in Delhi municipality', sub: 'vs. an estimated few lakhs of pet dogs' },
              { num: '<10%', label: 'Pet owners who have registered', sub: 'Study, East Delhi urban colony' },
              { num: '86%', label: 'Owners unaware of rabies risk', sub: 'PMC / UCMS study, Delhi' },
              { num: '36%', label: 'Global rabies deaths happen in India', sub: 'WHO / Supreme Court records' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
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

          {/* City Fine Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 10 }}>
            {[
              { city: 'Delhi', amount: '₹500+', desc: 'Fee enforcement underway. Fines escalating with each MCD drive.', icon: '/images/delhi.png' },
              { city: 'Gurugram', amount: 'Pending', desc: 'Registration encouraged strongly. Fines to be announced — act now.', icon: '/images/gurugram.png' },
              { city: 'Noida', amount: '₹10,000', desc: 'Highest fine in NCR. Noida authority actively penalising non-compliance.', highlight: true, icon: '/images/noida.png' },
              { city: 'Ghaziabad', amount: '₹5,000', desc: 'Registration fee raised from ₹200 to ₹1,000 in April 2024.', icon: '/images/ghaziabad.png' },
            ].map((c) => (
              <div key={c.city} style={{ padding: '12px 10px', background: 'rgba(255,140,58,0.08)', borderRadius: 13, outline: '1px rgba(255,140,58,0.22) solid', textAlign: 'center' }}>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(8, 8, 7), fontFamily: F.dmMono, textTransform: 'uppercase', marginBottom: 8 }}>{c.city}</div>
                <div style={{ width: 40, height: 40, background: 'rgba(250,246,239,0.08)', borderRadius: 8, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src={c.icon} alt={c.city} width={28} height={28} style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ color: '#FF8C3A', fontSize: c.amount === 'Pending' ? getResponsiveFontSize(12, 11, 10) : getResponsiveFontSize(20, 18, 16), fontFamily: c.amount === 'Pending' ? F.dmSans : F.fraunces, fontWeight: 900 }}>{c.amount}</div>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, marginTop: 8 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Legal Warning Card */}
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
                  <div key={tag} style={{ padding: '6px 14px', background: '#FFF0E4', borderRadius: 100 }}>
                    <span style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(12.5, 11, 10), fontWeight: 500 }}>{tag}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleOpenRegisterModal} style={{ display: 'inline-block', padding: isMobile ? '12px 24px' : '14px 28px', background: '#E8600A', borderRadius: 9, color: '#FFFFFF', textDecoration: 'none', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
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
          TAILIO vs MUNICIPAL PORTAL
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding() }}>
          <div style={{ marginBottom: 52 }}>
            <Badge text="Tailio vs Municipal Portal" />
            <div style={{ marginTop: 20 }}>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900 }}>Or, you could spend a </span>
              <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900 }}>weekend</span>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900 }}> at the MCD office.</span>
            </div>
            <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(15, 13, 12), maxWidth: 360, marginTop: 20 }}>The municipal portal works. Eventually. Probably. Here's the difference in numbers.</p>
          </div>

          {/* Comparison Table */}
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: isMobile ? 600 : '100%', background: '#FFFFFF', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(44,26,14,0.10)' }}>
                <div style={{ padding: '18px 28px', borderRight: '1px solid rgba(44,26,14,0.10)' }}><span style={{ color: '#A68660', fontSize: getResponsiveFontSize(9.5, 8, 8), fontFamily: F.dmMono, textTransform: 'uppercase' }}>What you get</span></div>
                <div style={{ padding: '18px 28px', background: '#E8600A', textAlign: 'center' }}><span style={{ color: '#401B01', fontSize: getResponsiveFontSize(22, 18, 16), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>Tailio</span></div>
                <div style={{ padding: '18px 28px', textAlign: 'center' }}><span style={{ color: '#A68660', fontSize: getResponsiveFontSize(9.5, 8, 8), fontFamily: F.dmMono, textTransform: 'uppercase' }}>Municipal Portal</span></div>
              </div>

              {[
                { label: 'Time to register', sub: 'From start to submission', tailio: 'Under 1 minute', portal: '2-3 hrs' },
                { label: 'Works on your phone', sub: 'No office visit needed', tailio: '✓', portal: '✗' },
                { label: 'Digital certificate', sub: 'Stored on your profile', tailio: '✓', portal: '✗' },
                { label: 'Vaccination reminders', sub: 'WhatsApp, SMS & email', tailio: '✓', portal: '✗' },
                { label: 'Automatic Renewal Reminders', sub: "Never miss a date", tailio: '✓', portal: '✗' },
                { label: 'If you wait, the fine is…', sub: 'Municipal enforcement active', tailio: 'None', portal: '₹10,000+' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 5 ? '1px solid rgba(44,26,14,0.10)' : 'none' }}>
                  <div style={{ padding: '20px 28px', borderRight: '1px solid rgba(44,26,14,0.10)' }}>
                    <div style={{ color: '#2C1A0E', fontWeight: 500, fontSize: getResponsiveFontSize(14, 13, 12) }}>{row.label}</div>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(12, 11, 10) }}>{row.sub}</div>
                  </div>
                  <div style={{ padding: '20px 28px', background: 'rgba(232,96,10,0.04)', textAlign: 'center', fontWeight: 600, fontSize: getResponsiveFontSize(14, 13, 12), color: '#2C1A0E' }}>{row.tailio}</div>
                  <div style={{ padding: '20px 28px', textAlign: 'center', fontSize: getResponsiveFontSize(14, 13, 12) }}>
                    <span style={{ color: row.portal === '✗' ? '#A68660' : '#C04E06' }}>{row.portal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HOW IT WORKS SECTION
      ══════════════════════════════════════ */}
      {/* ══════════════════════════════════════
          HOW IT WORKS SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#F3EDE0', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding() }}>
          <div style={{ marginBottom: 60 }}>
            <Badge text="HOW IT WORKS" />
            <div style={{ marginTop: 18, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 20 : 0 }}>
              <div>
                <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '64.48px' }}>Two screens.</div>
                <div style={{ color: '#E8600A', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '64.48px' }}>One minute.</div>
              </div>
              <button onClick={handleOpenRegisterModal} style={{ padding: isMobile ? '12px 24px' : '14px 28px', background: '#E8600A', borderRadius: 9, color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                Start Registration →
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'start' }}>
            {/* Step 1 */}
            <div
              style={{
                background: '#FFFCF8',
                borderRadius: 20,
                padding: isMobile ? '20px' : '24px 28px',
                transition: 'all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transition = 'all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>1</span>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 13), fontWeight: 600 }}>Register & add your pet's details</span>
              </div>
              <div style={{ background: '#FAF6EF', borderRadius: 13, padding: 20, marginBottom: 16 }}>
                {[
                  { label: "Pet's Name", value: 'Bruno', active: true },
                  { label: 'Breed', value: 'Shih Tzu', active: false },
                  { label: 'Age', value: '3 years', active: false },
                ].map((field) => (
                  <div key={field.label} style={{ marginBottom: 12 }}>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(9, 8, 8), fontFamily: F.dmMono, marginBottom: 5 }}>{field.label}</div>
                    <div style={{ padding: '10px 14px', background: '#FFFCF8', borderRadius: 9, outline: field.active ? '1px #E8600A solid' : '1px rgba(44,26,14,0.18) solid', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12) }}>{field.value}</span>
                      {field.active && <div style={{ width: 1.5, height: 16, background: '#E8600A' }} />}
                    </div>
                  </div>
                ))}
                <div style={{ padding: '14px 20px', background: '#2C1A0E', borderRadius: 9, textAlign: 'center', color: '#FFFFFF', fontWeight: 600 }}>Continue</div>
              </div>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(13.5, 12, 11), margin: 0 }}>
                A handful of fields. No PDFs to download, no notarised forms, no Sunday lost to paperwork.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                background: '#FFFCF8',
                borderRadius: 20,
                padding: isMobile ? '20px' : '24px 28px',
                transition: 'all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transition = 'all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>2</span>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 13), fontWeight: 600 }}>Upload your 4 documents</span>
              </div>
              {[
                { label: 'Anti-Rabies Vaccination Certificate', file: 'vax-record-bruno.pdf', done: true, icon: '/images/vaccine.png' },
                { label: 'Applicant ID Proof', file: 'aadhaar-card.pdf', done: true, icon: '/images/certificate-1.png' },
                { label: 'Address Proof', file: 'electricity-bill.pdf', done: true, icon: '/images/target.png' },
                { label: 'Photo with Your Pet', file: 'Tap to upload →', done: true, icon: '/images/photograph.png' },
              ].map((doc) => (
                <div key={doc.label} style={{ padding: 14, background: '#FAF6EF', borderRadius: 13, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: '#FFF0E4', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Image src={doc.icon} alt={doc.label} width={24} height={24} style={{ objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#2C1A0E', fontWeight: 600, fontSize: getResponsiveFontSize(13, 12, 11) }}>{doc.label}</div>
                    <div style={{ color: doc.done ? '#A68660' : '#C04E06', fontSize: getResponsiveFontSize(11, 10, 9) }}>{doc.file}</div>
                  </div>
                  <div style={{
                    width: 22,
                    height: 22,
                    background: doc.done ? '#E6F6ED' : '#F3EDE0',
                    borderRadius: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {doc.done && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.5L4.5 8L11 1" stroke="#1A6B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ padding: '12px 20px', background: '#2C1A0E', borderRadius: 9, textAlign: 'center', color: '#FFFFFF', fontWeight: 600, marginBottom: 16 }}>Submit Documents</div>
              <div style={{ padding: '11px 14px', background: '#E6F6ED', borderRadius: 9, marginBottom: 16 }}>
                <span style={{ color: '#1A6B3A', fontSize: getResponsiveFontSize(11.5, 10, 10), fontWeight: 700 }}>Certificate in 24–72 hrs.</span>
                <span style={{ color: '#1A6B3A', fontSize: getResponsiveFontSize(11.5, 10, 10), fontWeight: 500 }}> We handle the municipal filing — you'll receive your official digital certificate by email once approved.</span>
              </div>
              <p style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(20, 18, 16), fontWeight: 700, margin: '0 0 8px' }}>Upload, we'll do the rest.</p>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(13.5, 12, 11), margin: 0 }}>No broken websites, no photocopies. We file directly with your municipality on your behalf.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRICING SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: getResponsivePadding() }}>
          
          {/* Inner darker box container */}
          <div style={{ 
            background: '#1F1108', 
            borderRadius: 20, 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            
            {/* Left Column */}
            <div style={{ 
              flex: 1, 
              padding: '48px 44px', 
              borderRight: !isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none',
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 5, paddingBottom: 5, borderRadius: 999, outline: '1px solid rgba(255,255,255,0.25)', outlineOffset: -1, display: 'inline-flex' }}>
                  <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 10, fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.20px' }}>Simple, Transparent Pricing</span>
                </div>
                
                <div style={{ marginTop: 19.2, flexDirection: 'column', display: 'flex' }}>
                  <span style={{ color: 'white', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '1.2' }}>One price.</span>
                  <span style={{ color: '#E07B20', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 900, lineHeight: '1.2' }}>Everything<br/>included.</span>
                </div>
                
                <div style={{ marginTop: 19.2 }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'Inter', fontWeight: 400, lineHeight: '20.80px' }}>No hidden charges, no surprise fees. ₹299 covers your complete pet registration filing, certificate, and everything in between. Municipal fees are collected directly by the authority.</span>
                </div>
              </div>
              
              {/* Features Grid */}
              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '/images/office-1.png', title: 'Municipal Filing', desc: 'We handle MCD / Noida Authority / GMC paperwork end to end.' },
                  { icon: '/images/certificate-1.png', title: 'Official Certificate', desc: 'Govt-issued, delivered within 24–72 hrs.' },
                  { icon: '/images/vaccine.png', title: 'Vaccination Tracker', desc: 'Digital records + auto-reminders so you never miss a booster.' },
                  { icon: '/images/reminder.png', title: 'Renewal Reminders', desc: 'WhatsApp & email alerts before your annual expiry date.' }
                ].map((item) => (
                  <div key={item.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '18px 16px', outline: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(224,123,32,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      <img src={item.icon} alt={item.title} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                    </div>
                    <div style={{ color: '#E07B20', fontSize: 13, fontFamily: 'Inter', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 11.5, fontFamily: 'Inter', lineHeight: '17.25px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column */}
            <div style={{ 
              flex: 1, 
              padding: '48px 44px', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Badge row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                  <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 5, paddingBottom: 5, borderRadius: 999, outline: '1px solid rgba(255,255,255,0.25)', outlineOffset: -1 }}>
                    <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 10, fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.20px' }}>All Inclusive</span>
                  </div>
                  <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: '#E8C832', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, background: '#1A0A00', borderRadius: 3 }} />
                    <span style={{ color: '#1A0A00', fontSize: 10, fontFamily: 'Inter', fontWeight: 700, letterSpacing: '0.60px' }}>LAUNCH OFFER — SAVE ₹300</span>
                  </div>
                </div>
                
                {/* Price Section */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
                    <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: getResponsiveFontSize(28, 24, 20), fontFamily: 'Inter', fontWeight: 700, paddingBottom: 14 }}>₹</span>
                    <span style={{ color: 'white', fontSize: getResponsiveFontSize(88, 70, 50), fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '1' }}>299</span>
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
                
                {/* Checklist */}
                <div style={{ marginTop: 20, marginBottom: 28 }}>
                  {[
                    'Register in under 1 minute, from your phone',
                    'Legally secured Govt issued certificate',
                    'Vaccination tracker — schedule, record, share with any vet',
                    'Processed in 24–72 hours'
                  ].map((text, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                      <img src="/images/correct.png" alt="check" style={{ width: 18, height: 18, marginTop: 2 }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'Inter', lineHeight: '18.20px' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                {/* CTA Button */}
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
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#C06A18'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#E07B20'}
                >
                  Register Your Pet — ₹299 →
                </button>
                
                {/* Footer badges */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 18, flexWrap: 'wrap' }}>
                  {['Secure payment', 'Legally valid', '24–72 hr approval'].map((badge) => (
                    <span key={badge} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter' }}>{badge}</span>
                  ))}
                </div>
                
                {/* Guarantee Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, outline: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <img src="/images/shield-2.png" alt="guarantee" style={{ width: 22, height: 22 }} />
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontFamily: 'Inter', fontWeight: 700 }}>100% Refund Guarantee</div>
                      <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 11.5, fontFamily: 'Inter', lineHeight: '17.25px' }}>If we can't file your registration, you get every rupee back. No questions asked.</div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, outline: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
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
              <div key={t.name} style={{ background: '#FFFCF8', padding: 24, borderRadius: 18, textAlign: 'left' }}>
                <div style={{ color: '#E8600A', fontSize: getResponsiveFontSize(13, 12, 11), letterSpacing: '2px', marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(13.5, 12, 11), lineHeight: '22.28px', marginBottom: 16 }}>{t.review}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ color: '#2C1A0E', fontWeight: 600, fontSize: getResponsiveFontSize(13.5, 12, 11) }}>{t.name}</div>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11.5, 10, 9) }}>{t.location}</div>
                  </div>
                  <div style={{ padding: '4px 12px', background: '#FFF0E4', borderRadius: 100 }}>
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
          {/* White Paw SVG */}
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
            <button onClick={handleOpenRegisterModal} style={{ padding: isMobile ? '12px 24px' : '14px 32px', background: '#FFFFFF', borderRadius: 9, color: '#C04E06', fontWeight: 600, textDecoration: 'none', cursor: 'pointer', border: 'none' }}>
              Register Now
            </button>
            <a href="#why-register" style={{ padding: isMobile ? '12px 24px' : '14px 32px', borderRadius: 9, outline: '1px solid rgba(255,255,255,0.40)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-block' }}>
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