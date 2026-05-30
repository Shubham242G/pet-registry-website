'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

/* ─── Shared badge ───────────────────────────────────────────────────────── */
function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  
  if (dark) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: 100, outline: '1px rgba(255,255,255,0.10) solid', outlineOffset: -1 }}>
        <span style={{ color: 'rgba(250,246,239,0.55)', fontSize: isMobile ? 8 : 9.5, fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.24px' }}>{text}</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', background: '#FFF0E4', borderRadius: 100, outline: '1px #FFCCA0 solid', outlineOffset: -1 }}>
      <span style={{ color: '#C04E06', fontSize: isMobile ? 9 : 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.2px' }}>{text}</span>
    </div>
  );
}

/* ─── Shared CTA button ──────────────────────────────────────────────────── */
function CtaButton({ text, href = '/register', style }: { text: string; href?: string; style?: React.CSSProperties }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '12px 20px' : '14px 28px',
      background: '#E8600A',
      boxShadow: '0px 6px 20px rgba(232,96,10,0.30), 0px 2px 0px #C04E06',
      borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2,
      color: 'white', fontSize: isMobile ? 13 : 15, fontFamily: F.dmSans, fontWeight: 600,
      textDecoration: 'none', whiteSpace: 'nowrap', gap: 8, ...style,
    }}>
      {text}
    </Link>
  );
}

/* ─── Check icon circle (dark bg) ───────────────────────────────────────── */
function CheckDark() {
  return (
    <div style={{ width: 28, height: 28, background: '#2C1A0E', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 10, height: 8, left: 2, top: 3, outline: '2.2px white solid', outlineOffset: -1.1, position: 'relative' }} />
    </div>
  );
}

/* ─── Cross icon circle (light) ─────────────────────────────────────────── */
function CrossLight() {
  return (
    <div style={{ width: 28, height: 28, borderRadius: 14, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 6, height: 6, outline: '2px #A68660 solid', outlineOffset: -1, position: 'relative' }} />
    </div>
  );
}

/* ─── FAQ item ───────────────────────────────────────────────────────────── */
function FaqItem({ question }: { question: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <span style={{ color: '#2C1A0E', fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '20.3px' }}>{question}</span>
        <div style={{ width: 26, height: 26, background: '#FFF0E4', borderRadius: 13, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#C04E06', fontSize: 16, fontFamily: F.dmSans, fontWeight: 700, lineHeight: 1 }}>{open ? '−' : '+'}</span>
        </div>
      </button>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
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
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', background: '#FAF6EF' }}>

      {/* ══════════════════════════════════════
          ALERT BAR
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%', padding: isMobile ? '8px 16px' : '10px 32px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
        <span style={{ color: '#FFDBB8', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans, fontWeight: 700, lineHeight: '18.75px', textAlign: 'center' }}>
          Jager just got registered.
        </span>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%', position: 'relative', minHeight: isMobile ? 600 : 770, overflow: 'hidden', boxSizing: 'border-box' }}>

        {/* Background images - hide on mobile */}
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

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 40 : 77 }}>

          {/* Left text block */}
          <div style={{ width: isMobile ? '100%' : 652, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14.9 }}>

            {/* Compliance pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 16px', background: '#2C1A0E', borderRadius: 100, gap: 8, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,243,224,0.75)', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.25px' }}>
                Supreme Court of India has mandated pet registration
              </span>
              <span style={{ color: '#FFDBB8', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24px' }}>— Comply now</span>
            </div>

            {/* Headline */}
            <div style={{ paddingTop: 5.1 }}>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>Your pet deserves</div>
              <div style={{ fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, lineHeight: 1.2 }}>
                <span style={{ color: '#2C1A0E', fontWeight: 900 }}>an</span>
                <span style={{ color: '#E8600A', fontStyle: 'italic', fontWeight: 700 }}> identity,</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(64, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>the law requires.</div>
            </div>

            {/* Subtext */}
            <div style={{ maxWidth: isMobile ? '100%' : 480, paddingBottom: 0.85 }}>
              <p style={{ margin: 0, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px' }}>
                Register your pet in just 1 minute. Get a verified digital ID, vaccination records, and full legal compliance. Trusted by pet parents across Delhi NCR.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ paddingTop: 9.1, paddingBottom: 25.1, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/register" style={{
                padding: isMobile ? '11px 20px' : '13px 26px',
                background: '#E8600A', boxShadow: '0px 2px 0px #C04E06',
                borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2,
                display: 'inline-flex', alignItems: 'center',
                color: 'white', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 600,
                lineHeight: '22.5px', textDecoration: 'none',
              }}>Register Your Pet →</Link>
              <Link href="#why-register" style={{
                padding: isMobile ? '11px 20px' : '14.25px 20px 15.25px',
                borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1,
                display: 'inline-flex', alignItems: 'center',
                color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500,
                lineHeight: '21px', textDecoration: 'none',
              }}>Why it matters</Link>
            </div>

            {/* Stats strip */}
            <div style={{ width: isMobile ? '100%' : 554, borderRadius: 13, overflow: 'hidden', display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              {[
                { num: '>90%', label: 'Pets unregistered in Delhi' },
                { num: '₹10K', label: 'Fine for non-compliance' },
                { num: '1 min', label: 'To register on Tailio' },
                { num: '33M+', label: 'Pet dogs in India' },
              ].map((s, i) => (
                <div key={i} style={{ 
                  flex: 1, 
                  padding: isMobile ? '12px 8px' : '16px 12px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: 3, 
                  borderRight: i < 3 && !isMobile ? '1px solid rgba(44,26,14,0.08)' : 'none',
                  borderBottom: isMobile && i < 3 ? '1px solid rgba(44,26,14,0.08)' : 'none',
                  minWidth: isMobile ? '50%' : 'auto'
                }}>
                  <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(26, 22, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '26px', textAlign: 'center' }}>{s.num}</span>
                  <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '15.4px', textAlign: 'center' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero illustration */}
          {!isMobile && (
            <div style={{ position: 'relative', width: isMobile ? '100%' : 580, height: isMobile ? 300 : 580, flexShrink: 0 }}>
              <Image src="/images/hero-illustration.png" alt="Happy pet with owner" fill style={{ objectFit: 'contain' }} priority />
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          WHY REGISTER — two column
      ══════════════════════════════════════ */}
      <div id="why-register" style={{ background: '#FAF6EF', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Top: two columns */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: isMobile ? 'flex-start' : 'flex-end' }}>

            {/* Left column */}
            <div style={{ width: isMobile ? '100%' : 548, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14.9 }}>
              <Badge text="It's the law now" />
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '41.8px' }}>
                Pet registration isn't optional anymore
              </div>
              <p style={{ margin: 0, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px' }}>
                The Supreme Court of India, through the Animal Birth Control (ABC) Rules 2023, has directed all municipal corporations in Delhi NCR to enforce mandatory pet registration.
              </p>

              {/* Feature rows */}
              <div style={{ paddingTop: 9.09, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    title: 'Mandated by the Supreme Court',
                    desc: "The ABC Rules 2023 and the SC's landmark August 2025 order directed Delhi NCR authorities to enforce registration for all pet animals — not just dogs.",
                    img: '/images/icons/supreme-court.png',
                  },
                  {
                    title: 'India accounts for 36% of global rabies deaths',
                    desc: 'Pet registration ensures vaccination compliance, directly reducing rabies risk in urban areas like Delhi NCR.',
                    img: '/images/icons/rabies.png',
                  },
                  {
                    title: 'Unregistered pets contribute to stray population',
                    desc: "Abandoned unregistered pets are a leading cause of Delhi's stray dog problem. Registration creates accountability.",
                    img: '/images/icons/stray.png',
                  },
                  {
                    title: 'Legal ID = Full Protection',
                    desc: 'A registered pet has a verified health and vaccination history, making it legally protected at all times.',
                    img: '/images/icons/legal-id.png',
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, background: '#FFF0E4', borderRadius: 9, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                      <Image src={item.img} alt="" width={27} height={27} style={{ objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2.19 }}>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '21px' }}>{item.title}</span>
                      <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.38px' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={{ width: isMobile ? '100%' : 548, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* >90% stat card */}
              <div style={{ background: '#2C1A0E', borderRadius: 13, padding: isMobile ? '20px' : '24px 32px', display: 'flex', alignItems: 'center', gap: 20, height: 'auto', boxSizing: 'border-box', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(44, 36, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '66px', flexShrink: 0 }}>&gt;90%</span>
                <div style={{ width: isMobile ? 0 : 1.5, height: 40, background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ color: '#F4E4CF', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '19.6px' }}>Pets Unregistered in Delhi NCR</span>
                  <span style={{ color: 'rgba(244,228,207,0.38)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '18px' }}>Municipal enforcement now active</span>
                </div>
              </div>

              {/* Why Registration Matters card */}
              <div style={{ background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, boxShadow: '0px 4px 20px rgba(44,26,14,0.08)', overflow: 'hidden' }}>
                <div style={{ padding: isMobile ? '20px' : '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.2px' }}>Why Registration Matters</span>

                  {[
                    { title: 'Legal Identity & Protection', desc: 'Legal ID — proof of ownership and legal status.' },
                    { title: 'Vaccination Tracking', desc: 'Digital records — always up to date.' },
                    { title: 'Lost Pet Recovery', desc: '3× more likely to be returned if lost or stolen.' },
                    { title: 'Crucial for Travel', desc: 'Registration certificate is required for traveling with your pet.' },
                  ].map((item) => (
                    <div key={item.title} style={{ padding: 16, background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 3.4 }}>
                      <div style={{ width: 32, height: 32, background: '#FFF0E4', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 14, height: 22, outline: '2px #2C1A0E solid', outlineOffset: -1 }} />
                      </div>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '19.5px', paddingTop: 8.6 }}>{item.title}</span>
                      <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.83px' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip — 4 columns */}
          <div style={{ background: '#F3EDE0', borderRadius: 18, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, padding: isMobile ? '20px' : '33px 41px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 24 }}>
            {[
              { num: '~913', label: 'Registered dogs in Delhi municipality', sub: 'vs. an estimated few lakhs of pet dogs' },
              { num: '<10%', label: 'Pet owners who have registered', sub: 'Study, East Delhi urban colony' },
              { num: '86%', label: 'Owners unaware of rabies risk', sub: 'PMC / UCMS study, Delhi' },
              { num: '36%', label: 'Global rabies deaths happen in India', sub: 'WHO / Supreme Court records' },
            ].map((s, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 3, 
                borderRight: i < 3 && !isMobile && !isTablet ? '1px solid rgba(44,26,14,0.10)' : 'none',
                paddingRight: i < 3 && !isMobile && !isTablet ? 24 : 0,
                borderBottom: isMobile && i < 3 ? '1px solid rgba(44,26,14,0.10)' : 'none',
                paddingBottom: isMobile && i < 3 ? 24 : 0
              }}>
                <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(36, 30, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '54px', textAlign: 'center' }}>{s.num}</span>
                <span style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '18.2px', textAlign: 'center' }}>{s.label}</span>
                <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(10.5, 9, 9), fontFamily: F.dmSans, fontStyle: 'italic', fontWeight: 400, lineHeight: '15.75px', textAlign: 'center' }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KNOW THE FINES — dark section
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', position: 'relative' }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 0 }}>
            <Badge text="Know the fines" dark />
            <div style={{ textAlign: 'center', marginTop: 0, paddingTop: 45 }}>
              <span style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(54, 40, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '57.24px' }}>Ignore Registration, Pay the </span>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(54, 40, 32), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: '57.24px' }}>Penalty</span>
            </div>
            <p style={{ maxWidth: 962, margin: '10px auto 0', color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(15, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24px', textAlign: 'center' }}>
              Municipal corporations are actively enforcing registration. These are the current fines across Delhi NCR.
            </p>
          </div>

          {/* City fine cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 10, marginTop: isMobile ? 40 : 218 }}>
            {[
              { city: 'Delhi', amount: '₹500+', desc: 'Fee enforcement underway. Fines escalating with each MCD drive.', highlight: false },
              { city: 'Gurugram', amount: 'Pending', desc: 'Registration encouraged strongly. Fines to be announced — act now.', highlight: false },
              { city: 'Noida', amount: '₹10,000', desc: 'Highest fine in NCR. Noida authority actively penalising non-compliance.', highlight: true },
              { city: 'Ghaziabad', amount: '₹5,000', desc: 'Registration fee raised from ₹200 to ₹1,000 in April 2024.', highlight: false },
            ].map((c) => (
              <div key={c.city} style={{
                padding: '12px 10px 10px', background: 'rgba(255,140,58,0.08)',
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', borderRadius: 13,
                outline: '1px rgba(255,140,58,0.22) solid', outlineOffset: -1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5.3,
              }}>
                <span style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(8, 8, 7), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.12px' }}>{c.city}</span>
                <div style={{ width: 24, height: 24, background: 'rgba(250,246,239,0.08)', borderRadius: 4 }} />
                <span style={{ color: c.highlight ? '#FF8C3A' : c.amount === 'Pending' ? 'rgba(250,246,239,0.28)' : '#FF8C3A', fontSize: c.amount === 'Pending' ? getResponsiveFontSize(12, 11, 10) : getResponsiveFontSize(20, 18, 16), fontFamily: c.amount === 'Pending' ? F.dmSans : F.fraunces, fontWeight: 900, lineHeight: '20px', textAlign: 'center' }}>{c.amount}</span>
                <span style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '14.5px', textAlign: 'center', padding: '0 10px' }}>{c.desc}</span>
              </div>
            ))}
          </div>

          {/* Legal warning card */}
          <div style={{ marginTop: 10, background: '#FAF6EF', borderRadius: 20, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ width: isMobile ? '100%' : 5, height: isMobile ? 5 : 'auto', background: 'linear-gradient(180deg, #C04E06 0%, #FF8C3A 100%)', borderRadius: isMobile ? '20px 20px 0 0' : '20px 0 0 20px', flexShrink: 0 }} />

            <div style={{ flex: 1, padding: isMobile ? '24px' : '36px 40px 36px 48px', display: 'flex', flexDirection: 'column', gap: 11.1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#FFF0E4', borderRadius: 13, outline: '1px rgba(232,96,10,0.20) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, position: 'relative' }}>
                    <div style={{ width: 14, height: 14, left: 8, top: 2, position: 'absolute', outline: '1.7px #C04E06 solid', outlineOffset: -0.85 }} />
                    <div style={{ width: 9, height: 9, left: 2, top: 9, position: 'absolute', outline: '1.7px #C04E06 solid', outlineOffset: -0.85 }} />
                  </div>
                </div>
                <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Legal Warning</span>
              </div>

              <div style={{ paddingTop: 4.9 }}>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(30, 24, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '36px' }}>Without proper Registration, your pet </span>
                <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(30, 24, 20), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '36px' }}>can be seized</span>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(30, 24, 20), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '36px' }}> by municipal authorities — no questions asked.</span>
              </div>

              <p style={{ margin: 0, maxWidth: 520, color: '#7A5C40', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.1px' }}>
                In disputes or complaints, municipal authorities have the power to seize your pet. An unregistered pet has no legal standing and neither does its owner. Don't wait until it's too late.
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12.91, paddingBottom: 16.9 }}>
                {['Pet can be seized', 'No legal proof of ownership', 'Fines up to ₹10,000'].map((tag) => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', background: '#FFF0E4', borderRadius: 100, outline: '1px rgba(232,96,10,0.15) solid', outlineOffset: -1 }}>
                    <div style={{ width: 11, height: 11, outline: '2px #C04E06 solid', outlineOffset: -1 }} />
                    <span style={{ color: '#4A2C14', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans, fontWeight: 500 }}>{tag}</span>
                  </div>
                ))}
              </div>

              <CtaButton text="Start Registration" style={{ alignSelf: 'flex-start' }} />
            </div>

            {!isMobile && (
              <div style={{ width: 220, background: '#2C1A0E', borderRadius: '0 20px 20px 0', padding: '22px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: 160, height: 160, top: -40, right: -20, background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(255,140,58,0.12) 0%, rgba(255,140,58,0) 65%)' }} />
                {[
                  { num: '>90%', label: 'Pets unregistered\nin Delhi NCR' },
                  { num: '₹10K', label: 'Maximum fine\nin Noida' },
                  { num: '7', label: 'Days to comply\nafter RWA notice' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5.2, padding: '33px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none', width: '100%', boxSizing: 'border-box', paddingLeft: 10, paddingRight: 10 }}>
                    <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(40, 36, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '40px', textAlign: 'center' }}>{s.num}</span>
                    <span style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.4px', textAlign: 'center', whiteSpace: 'pre-line' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAILIO vs MUNICIPAL PORTAL — comparison table
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 52 }}>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 20 }}>
            <div>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '54px' }}>Or, you could spend a </span>
              <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: '54px' }}>weekend</span>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '54px' }}> at the MCD office.</span>
            </div>
            <p style={{ maxWidth: 360, margin: 0, color: '#7A5C40', fontSize: getResponsiveFontSize(15, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24.75px' }}>
              The municipal portal works. Eventually. Probably. Here's the difference in numbers.
            </p>
          </div>

          {/* Comparison table - make scrollable on mobile */}
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: isMobile ? 600 : '100%', background: 'white', borderRadius: 18, outline: '1px rgba(44,26,14,0.09) solid', outlineOffset: -1, boxShadow: '0px 2px 12px rgba(44,26,14,0.06)', overflow: 'hidden' }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px rgba(44,26,14,0.10) solid' }}>
                <div style={{ padding: '18px 28px', borderRight: '1px rgba(44,26,14,0.10) solid' }}>
                  <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(9.5, 8, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.33px' }}>What you get</span>
                </div>
                <div style={{ padding: '18px 28px', background: '#E8600A', borderRight: '1px rgba(255,255,255,0.08) solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#401B01', fontSize: getResponsiveFontSize(22, 18, 16), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>Tailio</span>
                </div>
                <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px rgba(44,26,14,0.10) solid' }}>
                  <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(9.5, 8, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.33px' }}>Municipal Portal</span>
                </div>
              </div>

              {/* Data rows */}
              {[
                { label: 'Time to register', sub: 'From start to submission', tailio: 'Under 1 minute', portal: '2-3 hrs', tailioType: 'text' },
                { label: 'Works on your phone', sub: 'No office visit needed', tailio: 'check', portal: 'cross', tailioType: 'check' },
                { label: 'Digital certificate', sub: 'Stored on your profile', tailio: 'check', portal: 'cross', tailioType: 'check' },
                { label: 'Vaccination reminders', sub: 'WhatsApp, SMS & email', tailio: 'check', portal: 'cross', tailioType: 'check' },
                { label: 'Automatic Renewal Reminders', sub: "Never miss a date that matters to your pet.", tailio: 'check', portal: 'cross', tailioType: 'check' },
                { label: 'If you wait, the fine is…', sub: 'Municipal enforcement active', tailio: 'None', portal: '₹10,000+', tailioType: 'special' },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < arr.length - 1 ? '1px rgba(44,26,14,0.10) solid' : 'none', minHeight: 77 }}>
                  <div style={{ padding: '20px 28px', borderRight: '1px rgba(44,26,14,0.10) solid', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: '#F3EDE0', borderRadius: 9, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '18.9px' }}>{row.label}</span>
                      <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400 }}>{row.sub}</span>
                    </div>
                  </div>
                  <div style={{ padding: '20px 28px', background: 'rgba(232,96,10,0.04)', borderRight: '1px rgba(232,96,10,0.12) solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {row.tailioType === 'check' ? <CheckDark /> :
                      row.tailioType === 'special' ? <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 12), fontFamily: F.fraunces, fontWeight: 900 }}>{row.tailio}</span> :
                        <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600 }}>{row.tailio}</span>}
                  </div>
                  <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {row.portal === 'cross' ? <CrossLight /> :
                      row.portal === '₹10,000+' ? <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(16, 14, 12), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>{row.portal}</span> :
                        <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 400 }}>{row.portal}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HOW IT WORKS — 3 steps
      ══════════════════════════════════════ */}
      <div style={{ background: '#F3EDE0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 60 }}>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '64.48px' }}>Three screens.</div>
              <div style={{ color: '#E8600A', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '64.48px' }}>Sixty seconds.</div>
            </div>
            <CtaButton text="Start Registration" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Step 1 */}
            <div style={{ background: '#FFFCF8', borderRadius: 20, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, boxShadow: '0px 4px 20px rgba(44,26,14,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ alignSelf: 'stretch', paddingTop: 24, paddingLeft: 28, paddingRight: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '40px' }}>1</span>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 13), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '20.8px' }}>Register & add your pet's details</span>
              </div>
              <div style={{ width: isMobile ? 'calc(100% - 40px)' : 514, padding: '20px', background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: "Pet's Name", value: 'Bruno', active: true },
                  { label: 'Breed', value: 'Shih Tzu', active: false },
                  { label: 'Age', value: '3 years', active: false },
                ].map((field) => (
                  <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(9, 8, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.08px' }}>{field.label}</span>
                    <div style={{ padding: '10px 14px', background: '#FFFCF8', borderRadius: 9, outline: field.active ? '1px #E8600A solid' : '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: field.active ? '0 0 0 3px rgba(232,96,10,0.12)' : 'none' }}>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 400 }}>{field.value}</span>
                      {field.active && <div style={{ width: 1.5, height: 16, background: '#E8600A' }} />}
                    </div>
                  </div>
                ))}
                <div style={{ padding: '14px 20px 12px', background: '#2C1A0E', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ color: '#FFFCF8', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600 }}>Continue</span>
                </div>
              </div>
              <div style={{ alignSelf: 'stretch', padding: '18px 28px 26px', display: 'flex', flexDirection: 'column', gap: 5.13 }}>
                <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(13.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22.28px' }}>A handful of fields. No PDFs to download, no notarised forms, no Sunday lost to paperwork.</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <div style={{ width: 2, height: 24, background: '#A68660' }} />
            </div>

            {/* Step 2 */}
            <div style={{ background: '#FFFCF8', borderRadius: 20, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, boxShadow: '0px 4px 20px rgba(44,26,14,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ alignSelf: 'stretch', paddingTop: 24, paddingLeft: 28, paddingRight: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '40px' }}>2</span>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 13), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '20.8px' }}>Upload your 4 documents</span>
              </div>
              <div style={{ width: isMobile ? 'calc(100% - 40px)' : 514, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Anti-Rabies Vaccination Certificate', file: 'vax-record-bruno.pdf', done: true },
                  { label: 'Applicant ID Proof', file: 'aadhaar-card.pdf', done: true },
                  { label: 'Address Proof', file: 'electricity-bill.pdf', done: true },
                  { label: 'Photo with Your Pet', file: 'Tap to upload →', done: false },
                ].map((doc) => (
                  <div key={doc.label} style={{ padding: '14px 16px', background: '#FAF6EF', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, background: '#FFF0E4', borderRadius: 9, outline: '1px rgba(232,96,10,0.15) solid', outlineOffset: -1, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 600 }}>{doc.label}</span>
                      <span style={{ color: doc.done ? '#A68660' : '#C04E06', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans, fontWeight: doc.done ? 400 : 500 }}>{doc.file}</span>
                    </div>
                    {doc.done ? (
                      <div style={{ width: 22, height: 22, background: '#E6F6ED', borderRadius: 11, outline: '1px #A8DDB8 solid', outlineOffset: -1, flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 22, height: 22, background: '#F3EDE0', borderRadius: 11, border: '1px rgba(44,26,14,0.18) solid', flexShrink: 0 }} />
                    )}
                  </div>
                ))}
                <div style={{ padding: '12px 20px', background: '#2C1A0E', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ color: '#FFFCF8', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600 }}>Submit Documents</span>
                </div>
              </div>
              <div style={{ width: isMobile ? 'calc(100% - 40px)' : 514, padding: '11px 14px', background: '#E6F6ED', borderRadius: 9, outline: '1px #A8DDB8 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 14, height: 14, background: '#A8DDB8', borderRadius: 7, flexShrink: 0 }} />
                <span style={{ color: '#1A6B3A', fontSize: getResponsiveFontSize(11.5, 10, 10), fontFamily: F.dmSans, lineHeight: '16.68px' }}>
                  <strong>Certificate in 24–72 hrs.</strong> We handle the municipal filing — you'll receive your official digital certificate by email once approved.
                </span>
              </div>
              <div style={{ alignSelf: 'stretch', padding: '24px 28px 26px', display: 'flex', flexDirection: 'column', gap: 5.14 }}>
                <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(20, 18, 16), fontFamily: F.fraunces, fontWeight: 700, lineHeight: '24px' }}>Upload, we'll do the rest.</span>
                <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(13.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22.28px' }}>No office visits, no photocopies. We file directly with your municipality on your behalf.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRICING — dark card
      ══════════════════════════════════════ */}
      <div style={{ background: '#2C1A0E', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 1080, maxWidth: '100%', background: '#3A1F0A', borderRadius: 24, outline: '1px rgba(255,255,255,0.07) solid', outlineOffset: -1, boxShadow: '0px 32px 80px rgba(0,0,0,0.50)', overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', position: 'relative' }}>

            <div style={{ padding: isMobile ? '32px' : '44px 44px 40px', borderRight: isMobile ? 'none' : '1px rgba(255,255,255,0.07) solid', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Badge text="Simple, transparent pricing" dark />
              <div style={{ paddingTop: 22 }}>
                <div style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '43.2px' }}>One price.</div>
                <div style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '43.2px' }}>Everything included.</div>
              </div>
              <p style={{ margin: '5px 0 0', maxWidth: 360, color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22.28px' }}>
                No hidden charges, no surprise fees. ₹999 covers your complete pet registration filing, certificate, and everything in between.
              </p>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { title: 'Municipal Filing', desc: 'We handle MCD / Noida Authority / GMC paperwork end to end.' },
                  { title: 'Official Certificate', desc: 'Govt-issued, delivered within 24–72 hrs.' },
                  { title: 'Vaccination Tracker', desc: 'Digital records + auto-reminders so you never miss a booster.' },
                  { title: 'Renewal Reminders', desc: 'WhatsApp & email alerts before your annual expiry date.' },
                ].map((item) => (
                  <div key={item.title} style={{ padding: '16px 16px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 13, outline: '1px rgba(255,255,255,0.07) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 0 }}>
                    <div style={{ width: 32, height: 32, background: 'rgba(255,140,58,0.10)', borderRadius: 9, outline: '1px rgba(255,140,58,0.15) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 16, height: 16, background: 'rgba(255,140,58,0.3)', borderRadius: 3 }} />
                    </div>
                    <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(12.5, 11, 10), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '16.25px', paddingTop: 6 }}>{item.title}</span>
                    <span style={{ color: 'rgba(250,246,239,0.38)', fontSize: getResponsiveFontSize(11, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '16.5px' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: isMobile ? '32px' : '44px 44px 40px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <Badge text="All Inclusive" dark />

              <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: '#FFE600', borderRadius: 100, alignSelf: 'flex-start' }}>
                <div style={{ width: 6, height: 6, background: '#C04E06', borderRadius: 3 }} />
                <span style={{ color: '#1A0A00', fontSize: getResponsiveFontSize(9.5, 8, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.95px' }}>Launch Offer — Save ₹1,000</span>
              </div>

              <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
                <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(22, 18, 16), fontFamily: F.dmSans, fontWeight: 700, lineHeight: '22px', paddingBottom: 14 }}>₹</span>
                <span style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(90, 70, 50), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '81px' }}>999</span>
                <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(56, 44, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '50.4px', paddingBottom: 4 }}>/-</span>
              </div>

              <div style={{ marginTop: 3 }}>
                <span style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400 }}>Regular price </span>
                <span style={{ color: 'rgba(250,246,239,0.35)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400, textDecoration: 'line-through' }}>₹1,999</span>
              </div>
              <div><span style={{ color: 'rgba(250,246,239,0.38)', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400 }}>Inclusive of all taxes & GST</span></div>
              <div><span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 600 }}>Per pet · Valid for 1 year</span></div>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Register in under 1 minute, from your phone',
                  'Legally secured Govt issued certificate',
                  'Vaccination tracker — schedule, record, share with any vet',
                  'Processed in 24–72 hours',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, background: 'rgba(232,96,10,0.18)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 7, height: 5, outline: '2.2px #FF8C3A solid', outlineOffset: -1.1 }} />
                    </div>
                    <span style={{ color: 'rgba(250,246,239,0.70)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" style={{
                marginTop: 24, padding: isMobile ? '12px 20px' : '15px 20px',
                background: '#E8600A',
                boxShadow: '0px 6px 24px rgba(232,96,10,0.35), 0px 2px 0px #C04E06',
                borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.15px',
              }}>
                Register Your Pet — ₹999 →
              </Link>

              <div style={{ marginTop: 18, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Secure payment', 'Legally valid', '24–72 hr approval'].map((badge) => (
                  <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 13, height: 13, background: 'rgba(250,246,239,0.10)', borderRadius: 2 }} />
                    <span style={{ color: 'rgba(250,246,239,0.38)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 500 }}>{badge}</span>
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
      <div style={{ background: '#F3EDE0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
            <Badge text="Happy pet parents" />
            <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '41.8px', textAlign: 'center', paddingTop: 5 }}>They did it. So can you.</div>
            <p style={{ margin: 0, maxWidth: 440, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px', textAlign: 'center' }}>
              Pet parents from Delhi NCR who registered with Tailio.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 16, justifyContent: 'center' }}>
            {[
              {
                review: '"I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"',
                name: 'Priya Sharma', location: 'Dwarka, Delhi', pet: 'Bruno',
              },
              {
                review: '"I tried the Noida Municipal portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn\'t expect."',
                name: 'Arjun Mehta', location: 'Sector 62, Noida', pet: 'Luna',
              },
              {
                review: '"The vaccination reminder alone is worth it. I used to forget booster dates all the time. Now Tailio pings me on WhatsApp a week before. My vet loves it too."',
                name: 'Sneha Kapoor', location: 'Indirapuram, Ghaziabad', pet: 'Coco',
              },
            ].map((t) => (
              <div key={t.name} style={{ padding: 24, background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ paddingBottom: 16 }}>
                  <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', letterSpacing: '2px' }}>★★★★★</span>
                </div>
                <p style={{ margin: '0 0 16px', color: '#7A5C40', fontSize: getResponsiveFontSize(13.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22.28px' }}>{t.review}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(13.5, 12, 11), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '20.25px' }}>{t.name}</div>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11.5, 10, 9), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.25px' }}>{t.location}</div>
                  </div>
                  <div style={{ padding: '4px 12px', background: '#FFF0E4', borderRadius: 100, outline: '1px #FFCCA0 solid', outlineOffset: -1 }}>
                    <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '18px' }}>{t.pet}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <div style={{ background: '#FAF6EF', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
            <Badge text="Common questions" />
            <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '41.8px', textAlign: 'center', paddingTop: 5 }}>Everything you want to know</div>
            <p style={{ margin: 0, maxWidth: 440, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px', textAlign: 'center' }}>
              If it's not here, our support team responds within 60 minutes.
            </p>
          </div>
          <div style={{ width: isMobile ? '100%' : 800, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
      <div style={{ background: 'linear-gradient(163deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '34px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
          <div style={{ position: 'relative', width: isMobile ? 40 : 52, height: isMobile ? 60 : 78 }}>
            <Image src="/images/cta-paw.png" alt="Paw" fill style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ textAlign: 'center', paddingTop: 0.6 }}>
            <div style={{ color: 'white', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '58.24px' }}>
              One Form<br />One Minute<br />One Year of Security
            </div>
          </div>
          <p style={{ margin: 0, maxWidth: 520, color: 'rgba(255,255,255,0.82)', fontSize: getResponsiveFontSize(15, 13, 12), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24.75px', textAlign: 'center' }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad &amp; Gurugram who are already compliant.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 16.6 }}>
            <Link href="/register" style={{
              padding: isMobile ? '12px 24px' : '14px 32px',
              background: 'white', boxShadow: '0px 4px 16px rgba(0,0,0,0.15)',
              borderRadius: 9, outline: '2px rgba(255,255,255,0.30) solid', outlineOffset: -2,
              color: '#C04E06', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 600,
              lineHeight: '22.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            }}>Register Now</Link>
            <Link href="#why-register" style={{
              padding: isMobile ? '12px 24px' : '14px 32px',
              borderRadius: 9, outline: '1px rgba(255,255,255,0.40) solid', outlineOffset: -1,
              color: 'rgba(255,255,255,0.85)', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 500,
              lineHeight: '22.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            }}>Learn More</Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <div style={{ background: '#1C0F07', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px 0' : '64px 40px 0', boxSizing: 'border-box' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), 
            gap: isMobile ? 32 : 48, 
            paddingBottom: 40, 
            borderBottom: '1px rgba(255,255,255,0.06) solid' 
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ position: 'relative', height: 53, width: 160 }}>
                <Image src="/images/tailio-logo-light.png" alt="Tailio" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <p style={{ margin: 0, color: 'rgba(250,246,239,0.38)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '21.45px', maxWidth: 220 }}>
                Making pet registration simple, digital, and stress-free across Delhi NCR.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Platform</span>
              {['Pet Registration', 'Digital Pet ID', 'Vaccination Tracker', 'Lost Pet QR'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none', paddingTop: 4 }}>{item}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Cities</span>
              {['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none', paddingTop: 4 }}>{item}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Company</span>
              {['About Tailio', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none', paddingTop: 4 }}>{item}</Link>
              ))}
            </div>
          </div>
          <div style={{ padding: '24px 0 32px', display: 'flex', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(250,246,239,0.20)', fontSize: getResponsiveFontSize(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '18px' }}>© 2026 Tailio. All rights reserved.</span>
          </div>
        </div>
      </div>

    </div>
  );
}