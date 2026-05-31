'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const F = {
  playfair: "'Playfair Display', Georgia, serif",
  dmSans: "'DM Sans', sans-serif",
  fraunces: "'Fraunces', Georgia, serif",
  dmSerif: "'DM Serif Display', serif",
  dmMono: "'DM Mono', monospace",
};

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

export default function HowItWorksPage() {
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
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&display=swap';
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

  const fs = (d: number, t: number, m: number) => isMobile ? m : isTablet ? t : d;

  return (
    <div style={{ fontFamily: F.dmSans, background: '#F5F0E8', width: '100%', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#F5F0E8', width: '100%', paddingTop: isMobile ? 30 : 60 }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px 30px' : '0 40px 40px', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>

    <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, background: 'rgba(212,82,26,0.10)', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 16 : 24 }}>
      <span style={{ color: '#D4521A', fontSize: 12, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>How It Works</span>
    </div>

    <div style={{ marginBottom: 0, textAlign: isMobile ? 'center' : 'left' }}>
      <span style={{ 
        display: 'block', 
        color: '#2B1F14', 
        fontSize: fs(96, 72, 36), 
        fontFamily: F.playfair, 
        fontWeight: 900, 
        lineHeight: isMobile ? 1.1 : 1.2,
        marginBottom: isMobile ? 4 : 0
      }}>Two screens.</span>
      <span style={{ 
        display: 'block', 
        color: '#D4521A', 
        fontSize: fs(96, 72, 36), 
        fontFamily: F.playfair, 
        fontStyle: 'italic', 
        fontWeight: 900, 
        lineHeight: isMobile ? 1.1 : 1.2,
        marginTop: isMobile ? -8 : 0
      }}>Sixty seconds.</span>
    </div>

    <div style={{ maxWidth: isMobile ? '100%' : 500, marginTop: isMobile ? 16 : 20, textAlign: isMobile ? 'center' : 'left' }}>
      <p style={{ color: '#7A6858', fontSize: fs(18, 16, 14), fontFamily: F.dmSans, fontWeight: 400, lineHeight: isMobile ? 1.4 : 1.5, margin: 0 }}>
        We're going to register your pet. It takes sixty seconds, costs ₹999, and ends with a legally valid ID. Follow the paws.
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap', marginTop: isMobile ? 16 : 24, marginBottom: isMobile ? 20 : 24 }}>
      {['₹999 one-time, all-inclusive', 'MCD, Noida & GMC accepted', 'Certificate in 24–72 hrs', 'No office visit needed'].map(pill => (
        <div key={pill} style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6, background: '#FDFAF5', borderRadius: 100, outline: '1px rgba(43,31,20,0.10) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, background: '#D4521A', borderRadius: 3 }} />
          <span style={{ color: '#2B1F14', fontSize: 12, fontFamily: F.dmSans, fontWeight: 500 }}>{pill}</span>
        </div>
      ))}
    </div>

    <button style={{ 
      alignSelf: isMobile ? 'center' : 'flex-start', 
      paddingLeft: isMobile ? 28 : 40, 
      paddingRight: isMobile ? 28 : 40, 
      paddingTop: isMobile ? 12 : 14, 
      paddingBottom: isMobile ? 12 : 14, 
      background: '#D4521A', 
      boxShadow: '0px 6px 0px #A83E10', 
      borderRadius: 100, 
      border: 'none', 
      cursor: 'pointer', 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 8 
    }}>
      <span style={{ color: 'white', fontSize: fs(17, 16, 14), fontFamily: F.dmSans, fontWeight: 600 }}>Start walking</span>
      <div style={{ width: 16, height: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: 4.5, height: 9, left: 8, top: 3.5, position: 'absolute', outline: '1.7px white solid', outlineOffset: -0.85 }} />
      </div>
    </button>
  </div>
</div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR - Mobile friendly wrap
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#2B1F14', width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { value: '<913', label: 'Pets registered in\nDelhi municipality today' },
          { value: '₹10K', label: 'Minimum fine for\nnon-compliance in Noida' },
          { value: '60s', label: 'Time to register\non Tailio' },
          { value: '33M+', label: 'Pet dogs across\nIndia' },
        ].map((s, i) => (
          <div key={i} style={{
            width: isMobile ? '50%' : 240,
            alignSelf: 'stretch',
            maxWidth: 240,
            paddingLeft: isMobile ? 16 : 32,
            paddingRight: isMobile ? 16 : 32,
            paddingTop: isMobile ? 24 : 36,
            paddingBottom: isMobile ? 24 : 36,
            borderRight: (!isMobile && i < 3) ? '1px solid rgba(255,255,255,0.07)' : 'none',
            borderBottom: isMobile && i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 6,
            boxSizing: 'border-box',
          }}>
            <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ textAlign: 'center', color: '#D4521A', fontSize: fs(38, 32, 28), fontFamily: F.playfair, fontWeight: 900, lineHeight: '38px' }}>{s.value}</span>
            </div>
            <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ textAlign: 'center', color: 'rgba(245,240,232,0.50)', fontSize: fs(13, 12, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', whiteSpace: 'pre-line' }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — THE PROCESS (3 steps) - FULLY RESPONSIVE
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#F5F0E8', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '50px 20px' : '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: isMobile ? 30 : 50 }}>

          {/* Section header */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, background: 'rgba(212,82,26,0.10)', borderRadius: 100, display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ color: '#D4521A', fontSize: 12, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>The Process</span>
            </div>
            <div style={{ paddingTop: 4, textAlign: 'center' }}>
              <span style={{ color: '#2B1F14', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontWeight: 900, lineHeight: '63px' }}>Follow the </span>
              <span style={{ color: '#D4521A', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontStyle: 'italic', fontWeight: 900, lineHeight: '63px' }}>paws.</span>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{ textAlign: 'center', color: '#7A6858', fontSize: fs(16, 15, 14), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '27.2px', margin: 0 }}>
                Just 4 documents. No PDFs, no notarised forms, no Sunday lost to paperwork.
              </p>
            </div>
          </div>

          {/* STEP 1 */}
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: isMobile ? 0 : 24 }}>
              <div style={{ 
                alignSelf: 'stretch', 
                paddingLeft: isMobile ? 20 : 44, 
                paddingRight: isMobile ? 20 : 44, 
                paddingTop: isMobile ? 24 : 32, 
                paddingBottom: isMobile ? 24 : 32, 
                background: '#FDFAF5', 
                borderRadius: 20, 
                outline: '1px rgba(43,31,20,0.08) solid', 
                outlineOffset: -1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 8 
              }}>
                <div style={{ width: 46, height: 46, background: 'rgba(212,82,26,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 22, height: 22, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: 14.67, height: 5.5, left: 3.67, top: 13.75, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                    <div style={{ width: 7.33, height: 7.33, left: 7.33, top: 2.75, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                  </div>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ color: '#2B1F14', fontSize: fs(26, 22, 20), fontFamily: F.playfair, fontWeight: 700, lineHeight: '31.2px' }}>Register & add your pet's details</span>
                </div>
                <div style={{ paddingBottom: 0.5 }}>
                  <p style={{ color: '#7A6858', fontSize: fs(15, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '25.5px', margin: 0 }}>
                    Fill in a handful of fields — your pet's name, breed, and age. Works on any phone. No PDFs to download, no notarised forms, no Sunday lost to paperwork.
                  </p>
                </div>
                <div style={{ paddingTop: 10, display: 'flex', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                  {["Pet's name & breed", 'Age & gender', 'Under 60 seconds'].map(tag => (
                    <div key={tag} style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6, background: '#F5F0E8', borderRadius: 100, outline: '1px rgba(43,31,20,0.08) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 13, height: 13, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: 8.67, height: 5.96, left: 2.17, top: 3.25, position: 'absolute', outline: '1.35px #D4521A solid', outlineOffset: -0.68 }} />
                      </div>
                      <span style={{ color: '#6B4C35', fontSize: fs(13, 12, 11), fontFamily: F.dmSans, fontWeight: 500 }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ alignSelf: 'stretch', paddingTop: 6, paddingBottom: isMobile ? 20 : 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 58, height: 58, position: 'relative', background: '#D4521A', borderRadius: 29, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 58, height: 58, left: 0, top: 0, position: 'absolute', boxShadow: '0px 0px 0px 10px rgba(212,82,26,0.20), 0px 0px 0px 8px #F5F0E8', borderRadius: 29 }} />
                <span style={{ textAlign: 'center', color: 'white', fontSize: 22, fontFamily: F.playfair, fontWeight: 900 }}>1</span>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: isMobile ? 0 : 24 }}>
              <div style={{ 
                alignSelf: 'stretch', 
                paddingLeft: isMobile ? 20 : 44, 
                paddingRight: isMobile ? 20 : 44, 
                paddingTop: isMobile ? 24 : 32, 
                paddingBottom: isMobile ? 24 : 32, 
                background: '#FDFAF5', 
                borderRadius: 20, 
                outline: '1px rgba(43,31,20,0.08) solid', 
                outlineOffset: -1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 8 
              }}>
                <div style={{ width: 46, height: 46, background: 'rgba(212,82,26,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 22, height: 22, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: 16.5, height: 5.5, left: 2.75, top: 13.75, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                    <div style={{ width: 9.17, height: 4.58, left: 6.42, top: 2.75, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                  </div>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ color: '#2B1F14', fontSize: fs(26, 22, 20), fontFamily: F.playfair, fontWeight: 700, lineHeight: '31.2px' }}>Upload your 4 documents</span>
                </div>
                <div style={{ paddingBottom: 0.5 }}>
                  <p style={{ color: '#7A6858', fontSize: fs(15, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '25.5px', margin: 0 }}>
                    Upload them digitally — no photocopies, no office visits. JPG, PNG or PDF accepted. We handle the municipal filing on your behalf.
                  </p>
                </div>
                <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { label: 'Anti-Rabies Vaccination Certificate', desc: 'From registered vet, with signature & stamp', n: 1 },
                    { label: 'Applicant ID Proof', desc: 'Aadhaar, PAN, Passport or Voter ID', n: 2 },
                    { label: 'Address Proof', desc: 'Delhi, Noida, Ghaziabad or Gurugram', n: 3 },
                    { label: 'Photo with Your Pet', desc: 'Both faces visible, within 3 months', n: 4 },
                  ].map(doc => (
                    <div key={doc.n} style={{ position: 'relative', paddingLeft: isMobile ? 12 : 18, paddingRight: isMobile ? 12 : 18, paddingTop: 12, paddingBottom: 12, background: '#F5F0E8', borderRadius: 14, outline: '1px rgba(43,31,20,0.08) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 2, marginTop: doc.n > 1 ? 6 : 0 }}>
                      <div style={{ paddingRight: isMobile ? 20 : 28 }}>
                        <span style={{ color: '#2B1F14', fontSize: fs(13, 12, 11), fontFamily: F.dmSans, fontWeight: 600 }}>{doc.label}</span>
                      </div>
                      <span style={{ color: '#7A6858', fontSize: fs(11, 10, 10), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '15.4px' }}>{doc.desc}</span>
                      <div style={{ display: 'flex', gap: 5, paddingTop: 5 }}>
                        {['JPG', 'PNG', 'PDF'].map(f => (
                          <div key={f} style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 2, paddingBottom: 2, background: 'rgba(43,31,20,0.06)', borderRadius: 4 }}>
                            <span style={{ color: '#6B4C35', fontSize: fs(10, 9, 9), fontFamily: F.dmSans, fontWeight: 700, letterSpacing: '0.4px' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ width: 22, height: 22, right: isMobile ? 10 : 18, top: 13, position: 'absolute', background: '#2B1F14', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#F5F0E8', fontSize: 10, fontFamily: F.dmSans, fontWeight: 700 }}>{doc.n}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ alignSelf: 'stretch', paddingTop: 6, paddingBottom: isMobile ? 20 : 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 58, height: 58, position: 'relative', background: '#D4521A', borderRadius: 29, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 58, height: 58, left: 0, top: 0, position: 'absolute', boxShadow: '0px 0px 0px 10px rgba(212,82,26,0.20), 0px 0px 0px 8px #F5F0E8', borderRadius: 29 }} />
                <span style={{ textAlign: 'center', color: 'white', fontSize: 22, fontFamily: F.playfair, fontWeight: 900 }}>2</span>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: isMobile ? 0 : 24 }}>
              <div style={{ 
                alignSelf: 'stretch', 
                paddingLeft: isMobile ? 20 : 44, 
                paddingRight: isMobile ? 20 : 44, 
                paddingTop: isMobile ? 24 : 32, 
                paddingBottom: isMobile ? 24 : 32, 
                background: '#FDFAF5', 
                borderRadius: 20, 
                outline: '1px rgba(43,31,20,0.08) solid', 
                outlineOffset: -1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 8 
              }}>
                <div style={{ width: 46, height: 46, background: 'rgba(212,82,26,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 22, height: 22, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: 14.67, height: 18.33, left: 3.67, top: 1.83, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                    <div style={{ width: 5.5, height: 5.5, left: 12.83, top: 1.83, position: 'absolute', outline: '1.83px #D4521A solid', outlineOffset: -0.92 }} />
                  </div>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ color: '#2B1F14', fontSize: fs(26, 22, 20), fontFamily: F.playfair, fontWeight: 700, lineHeight: '31.2px' }}>We file. You get your certificate.</span>
                </div>
                <div style={{ paddingBottom: 0.5 }}>
                  <p style={{ color: '#7A6858', fontSize: fs(15, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '25.5px', margin: 0 }}>
                    We submit directly to your municipality — MCD, Noida Authority, or GMC. Your official digital certificate arrives by email within 24–72 hours. No office visit. Ever.
                  </p>
                </div>
                <div style={{ paddingTop: isMobile ? 20 : 30, paddingBottom: isMobile ? 15 : 20, paddingLeft: isMobile ? 16 : 32, paddingRight: isMobile ? 16 : 32, background: 'linear-gradient(167deg, #2B1F14 0%, #3D2B1A 100%)', borderRadius: 16, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ minWidth: isMobile ? '100%' : 334.67, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'inline-flex', alignSelf: 'flex-start', paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, background: 'rgba(212,82,26,0.22)', borderRadius: 100, alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, background: '#F4A56A', borderRadius: 3 }} />
                      <span style={{ color: '#F4A56A', fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.88px' }}>Certificate issued</span>
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <span style={{ color: '#F5F0E8', fontSize: fs(26, 22, 20), fontFamily: F.playfair, fontWeight: 700 }}>Bruno</span>
                    </div>
                    <span style={{ color: 'rgba(245,240,232,0.40)', fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, letterSpacing: '1.1px' }}>TL-DL-2025-88471</span>
                    <div style={{ paddingTop: 10, display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                      {['Legally registered in Delhi NCR', 'No office visit'].map(b => (
                        <div key={b} style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: 7.33, height: 5.04, left: 1.83, top: 2.75, position: 'absolute', outline: '1.15px rgba(245,240,232,0.65) solid', outlineOffset: -0.57 }} />
                          </div>
                          <span style={{ color: 'rgba(245,240,232,0.65)', fontSize: fs(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: isMobile ? 60 : 68, height: isMobile ? 60 : 68, background: '#F5F0E8', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: isMobile ? 30 : 38, height: isMobile ? 30 : 38, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: isMobile ? 8 : 11.4, height: isMobile ? 8 : 11.4, left: 3, top: 3, position: 'absolute', outline: `1.9px #2B1F14 solid`, outlineOffset: -0.95 }} />
                      <div style={{ width: isMobile ? 5 : 7.6, height: isMobile ? 5 : 7.6, left: 4.5, top: 4.5, position: 'absolute', background: '#2B1F14' }} />
                      <div style={{ width: isMobile ? 8 : 11.4, height: isMobile ? 8 : 11.4, left: 18, top: 3, position: 'absolute', outline: `1.9px #2B1F14 solid`, outlineOffset: -0.95 }} />
                      <div style={{ width: isMobile ? 5 : 7.6, height: isMobile ? 5 : 7.6, left: 19.5, top: 4.5, position: 'absolute', background: '#2B1F14' }} />
                      <div style={{ width: isMobile ? 8 : 11.4, height: isMobile ? 8 : 11.4, left: 3, top: 18, position: 'absolute', outline: `1.9px #2B1F14 solid`, outlineOffset: -0.95 }} />
                      <div style={{ width: isMobile ? 5 : 7.6, height: isMobile ? 5 : 7.6, left: 4.5, top: 19.5, position: 'absolute', background: '#2B1F14' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ alignSelf: 'stretch', paddingTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 58, height: 58, position: 'relative', background: '#D4521A', borderRadius: 29, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 58, height: 58, left: 0, top: 0, position: 'absolute', boxShadow: '0px 0px 0px 10px rgba(212,82,26,0.20), 0px 0px 0px 8px #F5F0E8', borderRadius: 29 }} />
                <span style={{ textAlign: 'center', color: 'white', fontSize: 22, fontFamily: F.playfair, fontWeight: 900 }}>3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — FOUR DOCUMENTS (dark bg) - FULLY RESPONSIVE
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#2B1F14', width: '100%' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: isMobile ? '60px 20px' : '100px 40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: isMobile ? 40 : 60 }}>
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, background: 'rgba(212,82,26,0.22)', borderRadius: 100, display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ color: '#F4A56A', fontSize: 12, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>What You'll Need</span>
            </div>
            <div style={{ paddingTop: 4, textAlign: 'center' }}>
              <span style={{ color: '#F5F0E8', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontWeight: 900, lineHeight: '63px' }}>Four documents.<br /></span>
              <span style={{ color: '#D4521A', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontStyle: 'italic', fontWeight: 900, lineHeight: '63px' }}>That's all.</span>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.45)', fontSize: fs(16, 15, 14), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '27.2px', margin: 0 }}>
                Upload digitally — no delays, no broken websites. We handle the municipal filing.
              </p>
            </div>
          </div>

          <div style={{ alignSelf: 'stretch', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: isMobile ? 16 : 20 }}>
            {[
              {
                title: 'Anti-Rabies Vaccination Certificate',
                desc: 'Issued by a registered vet confirming your pet received their anti-rabies vaccine.',
                points: ["Pet's name, gender & age", 'Vaccination date & due date', "Vet's signature & hospital stamp"],
                n: 1,
              },
              {
                title: 'Applicant ID Proof',
                desc: 'Any government-issued photo ID of the pet owner. Must be valid and clearly legible.',
                points: ['Aadhaar Card', 'PAN Card', 'Passport or Voter ID'],
                n: 2,
              },
              {
                title: 'Applicant Address Proof',
                desc: 'Proof you reside in Delhi, Noida, Ghaziabad or Gurugram. Must show your current address.',
                points: ['Aadhaar Card (serves as both)', 'Electricity or water bill', 'Rental agreement or bank statement'],
                n: 3,
              },
              {
                title: 'Photograph with Your Pet Dog',
                desc: 'A clear, recent photo of you with your pet. Both faces must be visible. Natural lighting.',
                points: ['Good natural lighting', 'Both owner & pet clearly visible', 'Taken within last 3 months'],
                n: 4,
              },
            ].map(doc => (
              <div key={doc.n} style={{ padding: isMobile ? 20 : 28, background: 'rgba(255,255,255,0.04)', borderRadius: 20, outline: '1px rgba(255,255,255,0.07) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 46, height: 46, background: 'rgba(212,82,26,0.14)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 20, height: 20, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: 13.33, height: 16.67, left: 3.33, top: 1.67, position: 'absolute', outline: '1.67px #D4521A solid', outlineOffset: -0.83 }} />
                      <div style={{ width: 5, height: 5, left: 11.67, top: 1.67, position: 'absolute', outline: '1.67px #D4521A solid', outlineOffset: -0.83 }} />
                    </div>
                  </div>
                  <div style={{ width: 26, height: 26, background: '#D4521A', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: 12, fontFamily: F.dmSans, fontWeight: 700 }}>{doc.n}</span>
                  </div>
                </div>
                <div style={{ paddingTop: 10 }}>
                  <span style={{ color: '#F5F0E8', fontSize: fs(18, 16, 14), fontFamily: F.dmSerif, fontWeight: 400, lineHeight: '22.5px' }}>{doc.title}</span>
                </div>
                <div style={{ paddingBottom: 0.5 }}>
                  <p style={{ color: 'rgba(245,240,232,0.42)', fontSize: fs(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '20.8px', margin: 0 }}>{doc.desc}</p>
                </div>
                <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column' }}>
                  {doc.points.map((pt, i, arr) => (
                    <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 9, paddingTop: 4, paddingBottom: 4, borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ width: 5, height: 5, background: '#D4521A', borderRadius: 2.5, flexShrink: 0 }} />
                      <span style={{ color: 'rgba(245,240,232,0.58)', fontSize: fs(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400 }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: 10, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  {['JPG', 'PNG', 'PDF'].map(f => (
                    <div key={f} style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
                      <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: fs(10, 9, 8), fontFamily: F.dmSans, fontWeight: 700, letterSpacing: '0.4px' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 4: TAILIO vs PORTAL - FULLY RESPONSIVE */}
      <div id="comparison" style={{ background: '#F3EDE0', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding() }}>
          <div style={{ marginBottom: isMobile ? 32 : 52 }}>
            <Badge text="Tailio vs Municipal Portal" />
            <div style={{ marginTop: 20 }}>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900 }}>Or, you could spend a </span>
              <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900 }}>weekend</span>
              <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(52, 40, 28), fontFamily: F.fraunces, fontWeight: 900 }}> at the MCD office.</span>
            </div>
            <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(15, 13, 12), maxWidth: isMobile ? '100%' : 360, marginTop: 20 }}>The municipal portal works. Eventually. Probably. Here's the difference in numbers.</p>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: isMobile ? 600 : '100%', background: '#FFFFFF', borderRadius: 18, overflow: 'hidden' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(44,26,14,0.10)' }}>
                <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', borderRight: '1px solid rgba(44,26,14,0.10)' }}>
                  <span style={{ color: '#A68660', fontSize: isMobile ? 8 : 9.5, fontFamily: F.dmMono, textTransform: 'uppercase', letterSpacing: '1.33px' }}>What you get</span>
                </div>
                <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', background: '#E8600A', textAlign: 'center' }}>
                  <span style={{ color: '#4A2C14', fontSize: isMobile ? 16 : 20, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900 }}>Tailio.</span>
                </div>
                <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', textAlign: 'center' }}>
                  <span style={{ color: '#A68660', fontSize: isMobile ? 8 : 9.5, fontFamily: F.dmMono, textTransform: 'uppercase', letterSpacing: '1.33px' }}>Municipal Portal</span>
                </div>
              </div>
              
              {/* Table Rows */}
              {[
                { label: 'Time to register', sub: 'From start to submission', tailio: 'Under 1 minute', portal: '2–4 weeks' },
                { label: 'Works on your phone', sub: 'No opening laptops for filing the form', tailio: '✓', portal: '✗' },
                { label: 'Digital certificate', sub: 'Always accessible on profile', tailio: '✓', portal: '✗' },
                { label: 'Renewal reminders', sub: 'WhatsApp, SMS & email', tailio: '✓', portal: '✗' },
                { label: 'Vaccination tracker', sub: 'Schedule, record, share with vets', tailio: '✓', portal: '✗' },
                { label: 'Legal pet profile', sub: 'Proof of ownership on record', tailio: '✓', portal: '✗' },
                { label: 'Registration cost', sub: 'All-inclusive, no surprises', tailio: '₹999', portal: '₹100–500 + effort' },
                { label: 'If you wait, the fine is…', sub: 'Municipal enforcement active now', tailio: 'None', portal: '₹10,000+' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 7 ? '1px solid rgba(44,26,14,0.10)' : 'none' }}>
                  <div style={{ padding: isMobile ? '12px 16px' : '18px 24px', borderRight: '1px solid rgba(44,26,14,0.10)' }}>
                    <div style={{ fontWeight: 600, fontSize: getResponsiveFontSize(13.5, 12, 11), color: '#2C1A0E' }}>{row.label}</div>
                    <div style={{ color: '#A68660', fontSize: getResponsiveFontSize(11, 10, 9), marginTop: 4 }}>{row.sub}</div>
                  </div>
                  <div style={{ padding: isMobile ? '12px 16px' : '18px 24px', background: 'rgba(232,96,10,0.04)', textAlign: 'center', borderRight: '1px solid rgba(232,96,10,0.12)' }}>
                    {row.tailio === '✓' ? (
                      <div style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, background: '#2C1A0E', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width={isMobile ? 11 : 13} height={isMobile ? 8 : 10} viewBox="0 0 13 10" fill="none">
                          <path d="M1.5 5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    ) : row.tailio === 'None' ? (
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(16, 14, 12), fontFamily: F.fraunces, fontWeight: 900 }}>{row.tailio}</span>
                    ) : (
                      <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 12, 11), fontFamily: F.dmSans, fontWeight: 700 }}>{row.tailio}</span>
                    )}
                  </div>
                  <div style={{ padding: isMobile ? '12px 16px' : '18px 24px', textAlign: 'center' }}>
                    {row.portal === '✗' ? (
                      <div style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, borderRadius: 14, border: '1px solid rgba(44,26,14,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width={isMobile ? 9 : 11} height={isMobile ? 9 : 11} viewBox="0 0 11 11" fill="none">
                          <path d="M1 1L10 10M1 10L10 1" stroke="#A68660" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    ) : row.portal === '₹10,000+' ? (
                      <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(16, 14, 12), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700 }}>{row.portal}</span>
                    ) : (
                      <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(14, 12, 11), fontFamily: F.dmSans, fontWeight: 400 }}>{row.portal}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — PRICING - FULLY RESPONSIVE
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#2B1F14', width: '100%' }}>
        <div style={{ maxWidth: 660, margin: '0 auto', padding: isMobile ? '60px 20px' : '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, background: 'rgba(212,82,26,0.22)', borderRadius: 100, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#F4A56A', fontSize: fs(12, 11, 10), fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>One Price. Everything Included.</span>
          </div>
          <div style={{ paddingTop: isMobile ? 16 : 24, textAlign: 'center' }}>
            <span style={{ color: '#F5F0E8', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontWeight: 900, lineHeight: '63px' }}>Done.<br /></span>
            <span style={{ color: '#D4521A', fontSize: fs(60, 48, 32), fontFamily: F.playfair, fontStyle: 'italic', fontWeight: 900, lineHeight: '63px' }}>You're at the end<br />of the path.</span>
          </div>
          <div style={{ maxWidth: 460 }}>
            <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.42)', fontSize: fs(16, 15, 14), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '27.2px', margin: 0 }}>
              Sixty seconds from here to legally issued. Your certificate lands in your inbox — valid PAN India.
            </p>
          </div>
          <div style={{ alignSelf: 'stretch', paddingTop: isMobile ? 40 : 60, paddingBottom: isMobile ? 30 : 40, paddingLeft: isMobile ? 20 : 46, paddingRight: isMobile ? 20 : 46, position: 'relative', background: 'rgba(255,255,255,0.04)', overflow: 'hidden', borderRadius: 24, outline: '1px rgba(212,82,26,0.28) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 200, height: 200, right: -20, top: -19.01, position: 'absolute', background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(212,82,26,0.14) 0%, rgba(212,82,26,0) 70%)', pointerEvents: 'none' }} />
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, background: 'rgba(212,82,26,0.18)', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: 9.17, height: 8.72, left: 0.92, top: 0.92, position: 'absolute', outline: '1.15px #F4A56A solid', outlineOffset: -0.57 }} />
              </div>
              <span style={{ color: '#F4A56A', fontSize: fs(12, 11, 10), fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.96px' }}>Launch Offer — Save ₹1,000</span>
            </div>
            <div style={{ alignSelf: 'stretch', height: isMobile ? 80 : 98, position: 'relative' }}>
              <span style={{ left: isMobile ? 170 : 205, top: isMobile ? 24 : 29.5, position: 'absolute', color: '#D4521A', fontSize: fs(38, 32, 28), fontFamily: F.playfair, fontWeight: 900, lineHeight: '38px' }}>₹</span>
              <span style={{ left: isMobile ? 188 : 225, top: isMobile ? 16 : 20, position: 'absolute', color: '#F5F0E8', fontSize: fs(78, 60, 48), fontFamily: F.playfair, fontWeight: 900, lineHeight: '78px' }}>999</span>
            </div>
            <div style={{ alignSelf: 'stretch', paddingTop: 2, textAlign: 'center' }}>
              <span style={{ color: 'rgba(245,240,232,0.28)', fontSize: fs(15, 14, 12), fontFamily: F.dmSans, fontWeight: 400, textDecoration: 'line-through' }}>Regular price ₹1,999</span>
            </div>
            <div style={{ alignSelf: 'stretch', textAlign: 'center' }}>
              <span style={{ color: 'rgba(245,240,232,0.38)', fontSize: fs(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400 }}>Per pet · Valid for 1 year · Inclusive of all taxes &amp; GST</span>
            </div>
            <div style={{ alignSelf: 'stretch', paddingTop: 28, paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
              {[
                'Municipal Filing — We handle MCD / Noida Authority / GMC paperwork end to end',
                'Official Certificate — Govt issued, delivered within 24–72 hrs',
                'Vaccination Tracker — Digital records + auto-reminders for every booster',
                'Renewal Reminders — WhatsApp & email alerts before your annual expiry',
                'Legal Pet Profile — Proof of ownership, stored and accessible anytime',
              ].map((item, idx, arr) => (
                <div key={idx} style={{ alignSelf: 'stretch', paddingTop: 10, paddingBottom: 10, borderBottom: idx < arr.length - 1 ? '1px rgba(255,255,255,0.04) solid' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, background: 'rgba(212,82,26,0.14)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 13, height: 13, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: 8.67, height: 5.96, left: 2.17, top: 3.25, position: 'absolute', outline: '1.35px #F4A56A solid', outlineOffset: -0.68 }} />
                    </div>
                  </div>
                  <span style={{ color: 'rgba(245,240,232,0.62)', fontSize: fs(14, 13, 11), fontFamily: F.dmSans, fontWeight: 400 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ alignSelf: 'stretch', padding: isMobile ? 16 : 20, background: '#D4521A', boxShadow: '0px 6px 0px #A83E10', borderRadius: 100, border: 'none', cursor: 'pointer' }}>
              <span style={{ textAlign: 'center', color: 'white', fontSize: fs(18, 16, 14), fontFamily: F.dmSans, fontWeight: 700 }}>Register Your Pet — ₹999 →</span>
            </button>
            <div style={{ alignSelf: 'stretch', paddingTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: isMobile ? 16 : 24, flexWrap: 'wrap' }}>
              {['Secure payment', 'Legally valid', '24–72 hr approval'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'rgba(245,240,232,0.30)', fontSize: fs(12, 11, 10), fontFamily: F.dmSans, fontWeight: 400 }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA - FULLY RESPONSIVE
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(164deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '60px 20px' : '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ alignSelf: 'stretch', paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ textAlign: 'center', color: 'white', fontSize: fs(58, 44, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '62.64px' }}>
              Upload-Free, <br />Delay-Free, <br />Always.
            </span>
          </div>
          <div style={{ maxWidth: 520, paddingBottom: 0.5 }}>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.82)', fontSize: fs(16, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '26.4px', margin: 0 }}>
              Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad &amp; Gurugram who are already compliant.
            </p>
          </div>
          <div style={{ alignSelf: 'stretch', paddingTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <button style={{ height: isMobile ? 48 : 55, paddingLeft: isMobile ? 24 : 32, paddingRight: isMobile ? 24 : 32, paddingTop: isMobile ? 12 : 14, paddingBottom: isMobile ? 12 : 14, background: 'white', boxShadow: '0px 4px 16px rgba(0,0,0,0.15)', borderRadius: 9, outline: '2px rgba(255,255,255,0.30) solid', outlineOffset: -2, border: 'none', cursor: 'pointer' }}>
              <span style={{ color: '#C04E06', fontSize: fs(15, 14, 13), fontFamily: F.dmSans, fontWeight: 700, lineHeight: '22.5px' }}>Register Your Pet — ₹999 →</span>
            </button>
            <button style={{ height: isMobile ? 48 : 55, paddingLeft: isMobile ? 24 : 28, paddingRight: isMobile ? 24 : 28, paddingTop: isMobile ? 12 : 14, paddingBottom: isMobile ? 12 : 14, background: 'transparent', borderRadius: 9, outline: '1px solid rgba(255,255,255,0.40)', outlineOffset: -1, border: 'none', cursor: 'pointer' }}>
              <span style={{ color: 'white', fontSize: fs(15, 14, 13), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '22.5px' }}>See how it works</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER - FULLY RESPONSIVE
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#1C0F07', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '32px 20px 0' : '40px 40px 0' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), 
            gap: isMobile ? 28 : 32, 
            paddingBottom: 20, 
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            alignItems: 'flex-start'
          }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <Image src="/images/tailio.png" alt="Tailio" width={isMobile ? 140 : 180} height={isMobile ? 42 : 54} style={{ objectFit: 'contain' }} />
              </div>
            </div>
            <div>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(11, 10, 10), textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 500 }}>Platform</span>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Pet Registration', 'Digital Pet ID', 'Vaccination Tracker', 'Lost Pet QR'].map((item) => (
                  <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), cursor: 'pointer' }}>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(11, 10, 10), textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 500 }}>Cities</span>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'].map((item) => (
                  <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), cursor: 'pointer' }}>{item}</div>
                ))}
              </div>
            </div>
            <div>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(11, 10, 10), textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 500 }}>Company</span>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['About Tailio', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                  <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), cursor: 'pointer' }}>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
            <span style={{ color: 'rgba(250,246,239,0.25)', fontSize: getResponsiveFontSize(12, 11, 10) }}>
              © 2026 Tailio. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}