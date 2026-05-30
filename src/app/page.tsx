'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
function FaqItem({ question, answer }: { question: string; answer?: string }) {
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
          <span style={{ 
            color: '#C04E06', 
            fontSize: 16, 
            fontFamily: F.dmSans, 
            fontWeight: 700, 
            lineHeight: 1 
          }}>{open ? '−' : '+'}</span>
        </div>
      </button>
      {open && answer && (
        <div style={{ padding: '0 20px 20px 20px', color: '#7A5C40', fontSize: 14, fontFamily: F.dmSans }}>
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

  return (
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0, background: '#FAF6EF' }}>

      {/* ══════════════════════════════════════
          ALERT BAR
      ══════════════════════════════════════ */}
      <div style={{ 
        background: '#2C1A0E', 
        width: '100%', 
        padding: isMobile ? '8px 16px' : '10px 32px', 
        boxSizing: 'border-box', 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <span style={{ 
          color: '#FFDBB8', 
          fontSize: getResponsiveFontSize(12.5, 11, 10), 
          fontFamily: F.dmSans, 
          fontWeight: 700, 
          lineHeight: '18.75px', 
          textAlign: 'center' 
        }}>
          Jager just got registered.
        </span>
      </div>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <div style={{ 
        background: '#FFFCF8', 
        width: '100%', 
        boxShadow: '0px 1px 3px rgba(44,26,14,0.05)', 
        borderBottom: '1px rgba(44,26,14,0.10) solid', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '0 32px', 
          height: 68, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          boxSizing: 'border-box' 
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image src="/images/tailio.png" alt="Tailio logo" width={128} height={128} style={{ width: 'auto', height: 60, objectFit: 'contain' }} priority />
          </Link>

          <nav style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 32 }}>
            {['About Us', 'Why Register?', 'Why Tailio?', 'How it Works'].map((item) => (
              <Link key={item} href="#" style={{ color: '#7A5C40', fontSize: 14, fontFamily: F.dmSans, fontWeight: 500, lineHeight: '21px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {item}
              </Link>
            ))}
          </nav>

          <Link href="/register" style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
            padding: '9px 18px', background: '#E8600A', boxShadow: '0px 1.5px 0px #C04E06', 
            borderRadius: 9, outline: '1px #C04E06 solid', outlineOffset: -1, 
            color: 'white', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 600, 
            textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 
          }}>
            Register Your Pet
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%', position: 'relative', minHeight: isMobile ? 600 : 770, overflow: 'hidden' }}>
        {/* Background Images */}
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}>
              <Image src="/images/hero-bg-left.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }}>
              <Image src="/images/hero-bg-right.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
            </div>
          </>
        )}

        {/* Hero Content */}
        <div style={{ 
          position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', 
          padding: getResponsivePadding(), display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 77 
        }}>
          <div style={{ width: isMobile ? '100%' : 652, display: 'flex', flexDirection: 'column', gap: 14.9 }}>
            {/* Compliance Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 16px', background: '#2C1A0E', borderRadius: 100, gap: 8, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,243,224,0.75)', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400 }}>
                Supreme Court of India has mandated pet registration
              </span>
              <span style={{ color: '#FFDBB8', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400 }}>— Comply now</span>
            </div>

            {/* Headline */}
            <div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>Your pet deserves</div>
              <div style={{ fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, lineHeight: 1.2 }}>
                <span style={{ color: '#2C1A0E', fontWeight: 900 }}>an</span>
                <span style={{ color: '#E8600A', fontStyle: 'italic', fontWeight: 700 }}> identity,</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>the law requires.</div>
            </div>

            {/* Description */}
            <p style={{ maxWidth: 480, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, lineHeight: '23.93px', margin: 0 }}>
              Register your pet in just 1 minute. Get a verified digital ID, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 9, paddingBottom: 25 }}>
              <Link href="/register" style={{ 
                padding: isMobile ? '11px 20px' : '13px 26px', background: '#E8600A', 
                boxShadow: '0px 2px 0px #C04E06', borderRadius: 9, outline: '2px #C04E06 solid', 
                outlineOffset: -2, color: 'white', fontSize: getResponsiveFontSize(15, 14, 13), 
                fontFamily: F.dmSans, fontWeight: 600, textDecoration: 'none' 
              }}>
                Register Your Pet →
              </Link>
              <Link href="#why-register" style={{ 
                padding: isMobile ? '11px 20px' : '14px 20px', borderRadius: 9, 
                outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, 
                color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), 
                fontFamily: F.dmSans, fontWeight: 500, textDecoration: 'none' 
              }}>
                Why it matters
              </Link>
            </div>

            {/* Stats Strip */}
            <div style={{ width: isMobile ? '100%' : 554, display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', borderRadius: 13, overflow: 'hidden' }}>
              {[
                { num: '>90%', label: 'Pets unregistered in Delhi' },
                { num: '₹10K', label: 'Fine for non-compliance' },
                { num: '1 min', label: 'To register on Tailio' },
                { num: '33M+', label: 'Pet dogs in India' },
              ].map((s, i) => (
                <div key={i} style={{ 
                  flex: 1, padding: isMobile ? '12px 8px' : '16px 12px', textAlign: 'center',
                  borderRight: i < 3 && !isMobile ? '1px solid rgba(44,26,14,0.08)' : 'none',
                  borderBottom: isMobile && i < 3 ? '1px solid rgba(44,26,14,0.08)' : 'none'
                }}>
                  <div style={{ color: '#C04E06', fontSize: getResponsiveFontSize(26, 22, 20), fontFamily: F.fraunces, fontWeight: 900 }}>{s.num}</div>
                  <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          {!isMobile && (
            <div style={{ position: 'relative', width: 580, height: 580, flexShrink: 0 }}>
              <Image src="/images/hero-illustration.png" alt="Happy pet with owner" fill style={{ objectFit: 'contain' }} priority />
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          WHY REGISTER SECTION
      ══════════════════════════════════════ */}
      <div id="why-register" style={{ background: '#FAF6EF', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding() }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, marginBottom: 40 }}>
            
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              <Badge text="It's the law now" />
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '41.8px', marginTop: 15, marginBottom: 15 }}>
                Pet registration isn't optional anymore
              </div>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, lineHeight: '23.93px', marginBottom: 20 }}>
                The Supreme Court of India, through the Animal Birth Control (ABC) Rules 2023, has directed all municipal corporations in Delhi NCR to enforce mandatory pet registration.
              </p>
              
              {/* Feature List */}
              {[
                { title: 'Mandated by the Supreme Court', desc: "The ABC Rules 2023 and the SC's landmark August 2025 order directed Delhi NCR authorities to enforce registration for all pet animals — not just dogs." },
                { title: 'India accounts for 36% of global rabies deaths', desc: 'Pet registration ensures vaccination compliance, directly reducing rabies risk in urban areas like Delhi NCR.' },
                { title: 'Unregistered pets contribute to stray population', desc: "Abandoned unregistered pets are a leading cause of Delhi's stray dog problem. Registration creates accountability." },
                { title: 'Legal ID = Full Protection', desc: 'A registered pet has a verified health and vaccination history, making it legally protected at all times.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, background: '#FFF0E4', borderRadius: 9, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#2C1A0E', fontSize: 14, fontFamily: F.dmSans, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div style={{ flex: 1 }}>
              {/* Stat Card */}
              <div style={{ background: '#2C1A0E', borderRadius: 13, padding: isMobile ? '20px' : '24px 32px', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(44, 36, 32), fontFamily: F.fraunces, fontWeight: 900 }}>&gt;90%</div>
                <div style={{ width: 1.5, height: 40, background: 'rgba(255,255,255,0.10)' }} />
                <div>
                  <div style={{ color: '#F4E4CF', fontSize: 14, fontFamily: F.dmSans, fontWeight: 500 }}>Pets Unregistered in Delhi NCR</div>
                  <div style={{ color: 'rgba(244,228,207,0.38)', fontSize: 12, fontFamily: F.dmSans }}>Municipal enforcement now active</div>
                </div>
              </div>

              {/* Why Registration Matters Card */}
              <div style={{ background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', boxShadow: '0px 4px 20px rgba(44,26,14,0.08)', overflow: 'hidden' }}>
                <div style={{ padding: isMobile ? '20px' : '24px' }}>
                  <div style={{ color: '#A68660', fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 16 }}>Why Registration Matters</div>
                  {[
                    { title: 'Legal Identity & Protection', desc: 'Legal ID — proof of ownership and legal status.' },
                    { title: 'Vaccination Tracking', desc: 'Digital records — always up to date.' },
                    { title: 'Lost Pet Recovery', desc: '3× more likely to be returned if lost or stolen.' },
                    { title: 'Crucial for Travel', desc: 'Registration certificate is required for traveling with your pet.' },
                  ].map((item) => (
                    <div key={item.title} style={{ padding: 16, background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', marginBottom: 12 }}>
                      <div style={{ width: 32, height: 32, background: '#FFF0E4', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }} />
                      <div style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ color: '#7A5C40', fontSize: 11.5, fontFamily: F.dmSans }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Strip */}
          <div style={{ background: '#F3EDE0', borderRadius: 18, padding: isMobile ? '20px' : '33px 41px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 24 }}>
            {[
              { num: '~913', label: 'Registered dogs in Delhi municipality', sub: 'vs. an estimated few lakhs of pet dogs' },
              { num: '<10%', label: 'Pet owners who have registered', sub: 'Study, East Delhi urban colony' },
              { num: '86%', label: 'Owners unaware of rabies risk', sub: 'PMC / UCMS study, Delhi' },
              { num: '36%', label: 'Global rabies deaths happen in India', sub: 'WHO / Supreme Court records' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: '#C04E06', fontSize: getResponsiveFontSize(36, 30, 28), fontFamily: F.fraunces, fontWeight: 900 }}>{s.num}</div>
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
            <Badge text="Know the fines" dark />
          </div>
          <div style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(54, 40, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            Ignore Registration, Pay the <span style={{ color: '#FF8C3A', fontStyle: 'italic' }}>Penalty</span>
          </div>
          <p style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(15, 13, 12), maxWidth: 962, margin: '20px auto 40px' }}>
            Municipal corporations are actively enforcing registration. These are the current fines across Delhi NCR.
          </p>

          {/* City Fine Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 10 }}>
            {[
              { city: 'Delhi', amount: '₹500+', desc: 'Fee enforcement underway. Fines escalating with each MCD drive.' },
              { city: 'Gurugram', amount: 'Pending', desc: 'Registration encouraged strongly. Fines to be announced — act now.' },
              { city: 'Noida', amount: '₹10,000', desc: 'Highest fine in NCR. Noida authority actively penalising non-compliance.', highlight: true },
              { city: 'Ghaziabad', amount: '₹5,000', desc: 'Registration fee raised from ₹200 to ₹1,000 in April 2024.' },
            ].map((c) => (
              <div key={c.city} style={{ padding: '12px 10px', background: 'rgba(255,140,58,0.08)', borderRadius: 13, outline: '1px rgba(255,140,58,0.22) solid', textAlign: 'center' }}>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: 8, fontFamily: F.dmMono, textTransform: 'uppercase', marginBottom: 8 }}>{c.city}</div>
                <div style={{ width: 24, height: 24, background: 'rgba(250,246,239,0.08)', borderRadius: 4, margin: '0 auto 8px' }} />
                <div style={{ color: c.highlight ? '#FF8C3A' : '#FF8C3A', fontSize: c.amount === 'Pending' ? 12 : 20, fontFamily: c.amount === 'Pending' ? F.dmSans : F.fraunces, fontWeight: 900 }}>{c.amount}</div>
                <div style={{ color: 'rgba(250,246,239,0.35)', fontSize: 10, fontFamily: F.dmSans, marginTop: 8 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Legal Warning Card */}
          <div style={{ marginTop: 40, background: '#FAF6EF', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ width: isMobile ? '100%' : 5, height: isMobile ? 5 : 'auto', background: 'linear-gradient(180deg, #C04E06 0%, #FF8C3A 100%)' }} />
            <div style={{ flex: 1, padding: isMobile ? '24px' : '36px 40px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: '#FFF0E4', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                <span style={{ color: '#C04E06', fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase' }}>Legal Warning</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(30, 24, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>
                Without proper Registration, your pet <span style={{ color: '#E8600A', fontStyle: 'italic' }}>can be seized</span> by municipal authorities — no questions asked.
              </div>
              <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(14, 13, 12), marginBottom: 20 }}>
                In disputes or complaints, municipal authorities have the power to seize your pet. An unregistered pet has no legal standing and neither does its owner. Don't wait until it's too late.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {['Pet can be seized', 'No legal proof of ownership', 'Fines up to ₹10,000'].map((tag) => (
                  <div key={tag} style={{ padding: '6px 14px', background: '#FFF0E4', borderRadius: 100, fontSize: 12.5 }}>
                    {tag}
                  </div>
                ))}
              </div>
              <Link href="/register" style={{ display: 'inline-block', padding: '14px 28px', background: '#E8600A', borderRadius: 9, color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                Start Registration →
              </Link>
            </div>
            {!isMobile && (
              <div style={{ width: 220, background: '#2C1A0E', padding: '22px 0', textAlign: 'center' }}>
                {[
                  { num: '>90%', label: 'Pets unregistered in Delhi NCR' },
                  { num: '₹10K', label: 'Maximum fine in Noida' },
                  { num: '7', label: 'Days to comply after RWA notice' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '33px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                    <div style={{ color: '#FF8C3A', fontSize: 40, fontFamily: F.fraunces, fontWeight: 900 }}>{s.num}</div>
                    <div style={{ color: 'rgba(250,246,239,0.45)', fontSize: 12 }}>{s.label}</div>
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
          </div>

          {/* Comparison Table */}
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: isMobile ? 600 : '100%', background: 'white', borderRadius: 18, overflow: 'hidden' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(44,26,14,0.10)' }}>
                <div style={{ padding: '18px 28px', borderRight: '1px solid rgba(44,26,14,0.10)' }}><span style={{ color: '#A68660', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase' }}>What you get</span></div>
                <div style={{ padding: '18px 28px', background: '#E8600A', textAlign: 'center' }}><span style={{ color: '#401B01', fontSize: 22, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>Tailio</span></div>
                <div style={{ padding: '18px 28px', textAlign: 'center' }}><span style={{ color: '#A68660', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase' }}>Municipal Portal</span></div>
              </div>

              {/* Table Rows */}
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
                    <div style={{ fontWeight: 500 }}>{row.label}</div>
                    <div style={{ color: '#A68660', fontSize: 12 }}>{row.sub}</div>
                  </div>
                  <div style={{ padding: '20px 28px', background: 'rgba(232,96,10,0.04)', textAlign: 'center', fontWeight: 600 }}>{row.tailio === '✓' ? '✓' : row.tailio}</div>
                  <div style={{ padding: '20px 28px', textAlign: 'center', color: row.portal === '✗' ? '#A68660' : '#C04E06' }}>{row.portal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRICING SECTION
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: getResponsivePadding() }}>
          <div style={{ background: '#3A1F0A', borderRadius: 24, overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            {/* Left Column - Features */}
            <div style={{ padding: isMobile ? '32px' : '44px', borderRight: !isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <Badge text="Simple, transparent pricing" dark />
              <div style={{ marginTop: 22 }}>
                <div style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900 }}>One price.</div>
                <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>Everything included.</div>
              </div>
              <p style={{ color: 'rgba(250,246,239,0.45)', fontSize: 13.5, marginTop: 16 }}>
                No hidden charges, no surprise fees. ₹999 covers your complete pet registration filing, certificate, and everything in between.
              </p>
              {[
                { title: 'Municipal Filing', desc: 'We handle MCD / Noida Authority / GMC paperwork end to end.' },
                { title: 'Official Certificate', desc: 'Govt-issued, delivered within 24–72 hrs.' },
                { title: 'Vaccination Tracker', desc: 'Digital records + auto-reminders so you never miss a booster.' },
                { title: 'Renewal Reminders', desc: 'WhatsApp & email alerts before your annual expiry date.' },
              ].map((item) => (
                <div key={item.title} style={{ padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 13, marginTop: 16 }}>
                  <div style={{ width: 32, height: 32, background: 'rgba(255,140,58,0.10)', borderRadius: 9, marginBottom: 8 }} />
                  <div style={{ color: '#FF8C3A', fontSize: 12.5, fontWeight: 600 }}>{item.title}</div>
                  <div style={{ color: 'rgba(250,246,239,0.38)', fontSize: 11 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Right Column - Pricing */}
            <div style={{ padding: isMobile ? '32px' : '44px' }}>
              <Badge text="All Inclusive" dark />
              <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: '#FFE600', borderRadius: 100 }}>
                <div style={{ width: 6, height: 6, background: '#C04E06', borderRadius: 3 }} />
                <span style={{ color: '#1A0A00', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase' }}>Launch Offer — Save ₹1,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginTop: 14 }}>
                <span style={{ color: '#FF8C3A', fontSize: 22, paddingBottom: 14 }}>₹</span>
                <span style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(90, 70, 50), fontFamily: F.fraunces, fontWeight: 900 }}>999</span>
                <span style={{ color: '#FF8C3A', fontSize: 56, paddingBottom: 4 }}>/-</span>
              </div>
              <div><span style={{ color: 'rgba(250,246,239,0.35)', fontSize: 12 }}>Regular price </span><span style={{ textDecoration: 'line-through', color: 'rgba(250,246,239,0.35)', fontSize: 12 }}>₹1,999</span></div>
              <div><span style={{ color: 'rgba(250,246,239,0.38)', fontSize: 11.5 }}>Inclusive of all taxes & GST</span></div>
              <div><span style={{ color: '#FF8C3A', fontSize: 12, fontWeight: 600 }}>Per pet · Valid for 1 year</span></div>

              <div style={{ marginTop: 16 }}>
                {['Register in under 1 minute, from your phone', 'Legally secured Govt issued certificate', 'Vaccination tracker — schedule, record, share with any vet', 'Processed in 24–72 hours'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 18, background: 'rgba(232,96,10,0.18)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                    <span style={{ color: 'rgba(250,246,239,0.70)', fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" style={{ display: 'block', textAlign: 'center', padding: '15px 20px', background: '#E8600A', borderRadius: 9, color: 'white', textDecoration: 'none', fontWeight: 600, marginTop: 24 }}>
                Register Your Pet — ₹999 →
              </Link>

              <div style={{ display: 'flex', gap: 20, marginTop: 18, flexWrap: 'wrap' }}>
                {['Secure payment', 'Legally valid', '24–72 hr approval'].map((badge) => (
                  <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 13, height: 13, background: 'rgba(250,246,239,0.10)', borderRadius: 2 }} />
                    <span style={{ color: 'rgba(250,246,239,0.38)', fontSize: 12 }}>{badge}</span>
                  </div>
                ))}
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
          <p style={{ color: '#7A5C40', fontSize: 14.5, marginBottom: 40 }}>Pet parents from Delhi NCR who registered with Tailio.</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 16 }}>
            {[
              { name: 'Priya Sharma', location: 'Dwarka, Delhi', pet: 'Bruno', review: '"I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"' },
              { name: 'Arjun Mehta', location: 'Sector 62, Noida', pet: 'Luna', review: '"I tried the Noida Municipal portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn\'t expect."' },
              { name: 'Sneha Kapoor', location: 'Indirapuram, Ghaziabad', pet: 'Coco', review: '"The vaccination reminder alone is worth it. I used to forget booster dates all the time. Now Tailio pings me on WhatsApp a week before. My vet loves it too."' },
            ].map((t) => (
              <div key={t.name} style={{ background: '#FFFCF8', padding: 24, borderRadius: 18, textAlign: 'left' }}>
                <div style={{ color: '#E8600A', fontSize: 13, letterSpacing: '2px', marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: '#7A5C40', fontSize: 13.5, lineHeight: '22.28px', marginBottom: 16 }}>{t.review}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#2C1A0E', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: '#A68660', fontSize: 11.5 }}>{t.location}</div>
                  </div>
                  <div style={{ padding: '4px 12px', background: '#FFF0E4', borderRadius: 100 }}>
                    <span style={{ color: '#C04E06', fontSize: 12, fontWeight: 600 }}>{t.pet}</span>
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
          <p style={{ color: '#7A5C40', fontSize: 14.5, marginBottom: 40 }}>If it's not here, our support team responds within 60 minutes.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Is pet registration really mandatory in Delhi NCR?',
              'Is Tailio\'s registration legally valid?',
              'What documents do I need to register?',
              'How much does registration cost on Tailio?',
              'Can I register cats and other pets — not just dogs?',
              'What happens if I don\'t register?',
            ].map((q) => <FaqItem key={q} question={q} />)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(163deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '34px 40px', textAlign: 'center' }}>
          <div style={{ width: 52, height: 78, margin: '0 auto 15px', position: 'relative' }}>
            <Image src="/images/cta-paw.png" alt="Paw" fill style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ color: 'white', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>
            One Form<br />One Minute<br />One Year of Security
          </div>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, maxWidth: 520, margin: '0 auto 20px' }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad &amp; Gurugram who are already compliant.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{ padding: '14px 32px', background: 'white', borderRadius: 9, color: '#C04E06', fontWeight: 600, textDecoration: 'none' }}>
              Register Now
            </Link>
            <Link href="#why-register" style={{ padding: '14px 32px', borderRadius: 9, outline: '1px solid rgba(255,255,255,0.40)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <div style={{ background: '#1C0F07', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px 0' : '64px 40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), gap: isMobile ? 32 : 48, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ position: 'relative', height: 53, width: 160, marginBottom: 12 }}>
                <Image src="/images/tailio-logo-light.png" alt="Tailio" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <p style={{ color: 'rgba(250,246,239,0.38)', fontSize: 13, maxWidth: 220 }}>Making pet registration simple, digital, and stress-free across Delhi NCR.</p>
            </div>
            <div><span style={{ color: '#FF8C3A', fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.4px' }}>Platform</span>
              {['Pet Registration', 'Digital Pet ID', 'Vaccination Tracker', 'Lost Pet QR'].map((item) => <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: 13, marginTop: 12 }}>{item}</div>)}
            </div>
            <div><span style={{ color: '#FF8C3A', fontSize: 10, textTransform: 'uppercase' }}>Cities</span>
              {['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'].map((item) => <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: 13, marginTop: 12 }}>{item}</div>)}
            </div>
            <div><span style={{ color: '#FF8C3A', fontSize: 10, textTransform: 'uppercase' }}>Company</span>
              {['About Tailio', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: 13, marginTop: 12 }}>{item}</div>)}
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
            <span style={{ color: 'rgba(250,246,239,0.20)', fontSize: 12 }}>© 2026 Tailio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}