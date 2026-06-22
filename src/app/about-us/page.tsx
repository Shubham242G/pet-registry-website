'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Footer from '../component/Footer';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

function FounderSilhouette({ variant, hideNumber = false }: { variant: number; hideNumber?: boolean }) {
  const gradients: Record<number, string> = {
    1: 'linear-gradient(163deg, #EBE1CE 0%, #DDD0B8 100%)',
    2: 'linear-gradient(163deg, #E5D8C5 0%, #D6C7AD 100%)',
    3: 'linear-gradient(163deg, #EAD9C0 0%, #DBCAAA 100%)',
    4: 'linear-gradient(163deg, #E0D0B5 0%, #CEBFA0 100%)',
  };
  return (
    <div style={{ 
      height: 220, 
      position: 'relative', 
      background: gradients[variant], 
      overflow: 'hidden', 
      flexShrink: 0,
      border: 'none',
      outline: 'none',
      borderRadius: '18px 18px 0 0',
    }}>
      {/* Number badge - hidden when hideNumber is true */}
      {!hideNumber && (
        <div style={{ 
          width: 28, height: 28, left: 14, top: 14, position: 'absolute', 
          zIndex: 1, background: '#2C1A0E', borderRadius: 14, 
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <span style={{ color: '#FFDBB8', fontSize: 11, fontFamily: F.dmMono, fontWeight: 500 }}>0{variant}</span>
        </div>
      )}
      {/* Founder photo */}
      <Image
        src={founderImages[variant]}
        alt={`Founder ${variant}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        style={{ 
          objectFit: 'cover', 
          objectPosition: 'top center',
          border: 'none',
          outline: 'none',
        }}
      />
    </div>
  );
}

/* ─── Shared: Badge ─────────────────────────────────────────────────────── */
function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '5px 14px',
      background: dark ? 'rgba(255,140,58,0.12)' : '#FFF0E4',
      borderRadius: 100,
      outline: dark ? '1px rgba(255,140,58,0.20) solid' : '1px #FFCCA0 solid',
      outlineOffset: -1,
      alignSelf: 'flex-start',
    }}>
      <span style={{
        color: dark ? '#FF8C3A' : '#C04E06',
        fontSize: 10, fontFamily: F.dmSans, fontWeight: 500,
        textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.2px',
      }}>{text}</span>
    </div>
  );
}

/* ─── Founder photo ──────────────────────────────────────────────────────── */
const founderImages: Record<number, string> = {
  1: '/images/founder1.jpeg',
  2: '/images/founder2.jpeg',
  3: '/images/founder3.jpeg',
  4: '/images/founder4.jpeg',
};



/* ─── Timeline icon ──────────────────────────────────────────────────────── */
function TimelineIcon({ variant }: { variant: number }) {
  return (
    <div style={{ width: 36, height: 36, flexShrink: 0, background: '#FFF0E4', borderRadius: 18, outline: '2px #FFCCA0 solid', outlineOffset: -2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 16, height: 16, position: 'relative', overflow: 'hidden' }}>
        {variant === 1 && <div style={{ width: 9.25, height: 13.33, left: 3.38, top: 1.33, position: 'absolute', outline: '1.2px #C04E06 solid', outlineOffset: -0.6 }} />}
        {variant === 2 && <><div style={{ width: 4, height: 8, left: 10.67, top: 4, position: 'absolute', outline: '1.2px #C04E06 solid', outlineOffset: -0.6 }} /><div style={{ width: 4, height: 8, left: 1.33, top: 4, position: 'absolute', outline: '1.2px #C04E06 solid', outlineOffset: -0.6 }} /></>}
        {variant === 3 && <><div style={{ width: 12, height: 14.67, left: 2, top: 0.67, position: 'absolute', outline: '1.2px #C04E06 solid', outlineOffset: -0.6 }} /><div style={{ width: 4, height: 4, left: 6, top: 4.67, position: 'absolute', outline: '1.2px #C04E06 solid', outlineOffset: -0.6 }} /></>}
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function AboutPage() {
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
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0 }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background: '#FAF6EF', width: '100%', borderBottom: '1px rgba(44,26,14,0.10) solid', boxSizing: 'border-box' }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: getResponsivePadding(),
          boxSizing: 'border-box', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', 
          gap: isMobile ? 40 : 64 
        }}>
          {/* Left */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Badge text="Our Story" />
            <div style={{ lineHeight: isMobile ? '1.2' : '63.6px' }}>
              <span style={{ 
                color: '#2C1A0E', 
                fontSize: getResponsiveFontSize(60, 48, 36),
                fontFamily: F.fraunces, 
                fontWeight: 900, 
                lineHeight: 1.2, 
                display: 'block' 
              }}>Responsible</span>
              <span style={{ 
                color: '#C04E06', 
                fontSize: getResponsiveFontSize(60, 48, 36),
                fontFamily: F.fraunces, 
                fontStyle: 'italic', 
                fontWeight: 700, 
                lineHeight: 1.2, 
                display: 'block' 
              }}>pet ownership</span>
              <span style={{ 
                color: '#2C1A0E', 
                fontSize: getResponsiveFontSize(60, 48, 36),
                fontFamily: F.fraunces, 
                fontWeight: 900, 
                lineHeight: 1.2, 
                display: 'block' 
              }}>made simple</span>
            </div>
            <p style={{ margin: 0, maxWidth: isMobile ? '100%' : 500, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px' }}>
              The four co-founders got tired of watching pet owners struggle with confusing government portals, lost paperwork, and missed deadlines. So they built Tailio — the simplest way to register your pet and stay legally compliant, from your phone, in under a minute.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
              <a href="#founders" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 26px', background: '#E8600A', boxShadow: '0px 2px 0px #C04E06', borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2, color: 'white', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '22.5px', textDecoration: 'none' }}>
                Meet the Founders
              </a>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 20px', borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '21px', textDecoration: 'none' }}>
                Back to Home
              </Link>
            </div>
          </div>
          {/* Right — image */}
          {!isMobile && (
  <div style={{ flexShrink: 0, width: 460, height: 460, position: 'relative' }}>
    <Image
      src="/images/about-us-banner.jpeg"
      alt="Tailio founders illustration"
      fill
      style={{ objectFit: 'cover', borderRadius: '20px' }}
    />
  </div>
)}
          
        </div>
      </div>

      {/* ── STORY + JOURNEY ───────────────────────────────────────────────── */}
      <div style={{ background: '#FFFCF8', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: getResponsivePadding(),
          boxSizing: 'border-box', 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: isMobile ? 48 : 80, 
          alignItems: 'flex-start' 
        }}>

          {/* Left — story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Badge text="How it started" />
            <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
              A problem we lived through ourselves
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                "It started with two dogs named Mylo and Felix. Co-founder Kaavya got a notice from her RWA saying her pets weren't registered and she had 7 days to comply or face eviction complaints. She spent three days navigating the MCD portal - broken links, confusing forms, and two office visits later, she gave up.",
                "That frustration became Tailio. We asked one question: why should pet registration feel harder than filing taxes? It shouldn't. And with the Supreme Court of India now mandating registration across Delhi NCR, the urgency had never been greater.",
                "We built Tailio in 2025 with one goal — make legal compliance invisible for pet parents. No queues, no confusion, no follow-ups. Just upload, submit, and done.",
              ].map((text, i) => (
                <p key={i} style={{ margin: 0, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '25.38px' }}>{text}</p>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Badge text="Our journey" />
            <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(27, 24, 22), fontFamily: F.fraunces, fontWeight: 700, lineHeight: 1.3 }}>
              From idea to India's first digital pet registration platform
            </div>
            <div style={{ paddingTop: 8 }}>
              {[
                { period: 'Early 2025', title: 'The problem identified', desc: "After the Supreme Court's ABC Rules 2023 directive, we saw thousands of pet parents scrambling with no clear path to compliance.", v: 1 },
                { period: 'Mid 2025', title: 'Team formed & built', desc: 'Four co-founders — combining expertise in technology, legal compliance, design, and operations — came together to build Tailio, under Truzo Infotech Private Limited.', v: 2 },
                { period: 'Early 2026', title: 'Launched across Delhi NCR', desc: 'Went live in Delhi, Noida, Ghaziabad, and Gurugram — filing directly with each municipal corporation on behalf of pet parents.', v: 3 },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingBottom: i < arr.length - 1 ? 28 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                    <TimelineIcon variant={item.v} />
                    {i < arr.length - 1 && (
                      <div style={{ width: 1.5, flex: 1, minHeight: 24, background: 'rgba(44,26,14,0.18)', marginTop: 6 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(10, 10, 9), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '15px', letterSpacing: '0.8px' }}>{item.period}</span>
                    <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '21px' }}>{item.title}</span>
                    <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '20.15px' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
<div style={{ background: '#F3EDE0', width: '100%', boxSizing: 'border-box' }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Badge text="What we stand for" />
      </div>
      <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, textAlign: 'center' }}>Our values</div>
      <div style={{ maxWidth: 480, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px', textAlign: 'center' }}>
        Every decision we make at Tailio comes back to these fundamentals.
      </div>
    </div>
  

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), 
      gap: 24,
      alignItems: 'stretch'
    }}>
      {[
        { 
          title: 'Pet parents first', 
          desc: 'Every feature, every word, every decision is made from the perspective of someone trying to do right by their pet. Complexity stays on our side.',
          icon: '/images/certificate-1.png'
        },
        { 
          title: 'Radical simplicity', 
          desc: "If it takes more than a minute, we've failed. We obsess over reducing friction — in our product, our communication, and our process.",
          icon: '/images/id.png'
        },
        { 
          title: 'Trust through transparency', 
          desc: "No hidden fees, no confusing terms. We tell you exactly what we do, how much it costs, and what you'll get — before you pay a single rupee.",
          icon: '/images/target.png'
        },
        { 
          title: 'We love animals too', 
          desc: "This isn't just a compliance tool. We genuinely care about animal welfare — every registered pet is a safer, healthier, more protected companion.",
          icon: '/images/correct.png'
        },
        { 
          title: 'Building for scale', 
          desc: "India has over 33 million pet dogs. We're not building for Delhi NCR — we're building the infrastructure for pet registration across the entire country.",
          icon: '/images/location.png'
        },
        { 
          title: 'Community accountability', 
          desc: 'Registered pets mean accountable owners. We believe a safer city for animals is a safer city for everyone — and registration is where it starts.',
          icon: '/images/something.png'
        },
      ].map((v) => (
        <div 
          key={v.title} 
          style={{ 
            padding: '28px 24px', 
            background: '#FFFCF8', 
            borderRadius: 18, 
            outline: '1px rgba(44,26,14,0.10) solid', 
            outlineOffset: -1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 12,
            height: '100%',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          {/* Icon Box with Image */}
          <div style={{ 
            width: 48, 
            height: 48, 
            background: '#FFF0E4', 
            borderRadius: 12, 
            outline: '1px #FFCCA0 solid', 
            outlineOffset: -1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            marginBottom: 4
          }}>
            <Image 
              src={v.icon}
              alt={v.title}
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          
          {/* Title */}
          <div style={{ 
            color: '#2C1A0E', 
            fontSize: getResponsiveFontSize(16, 15, 14), 
            fontFamily: F.dmSans, 
            fontWeight: 700, 
            lineHeight: 1.4,
            marginTop: 4
          }}>
            {v.title}
          </div>
          
          {/* Description */}
          <div style={{ 
            color: '#7A5C40', 
            fontSize: getResponsiveFontSize(13.5, 13, 12), 
            fontFamily: F.dmSans, 
            fontWeight: 400, 
            lineHeight: 1.5,
            opacity: 0.85
          }}>
            {v.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* ── FOUNDERS ──────────────────────────────────────────────────────── */}
<div id="founders" style={{ background: '#FAF6EF', width: '100%', boxSizing: 'border-box', paddingTop: 80, paddingBottom: 80 }}>
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>

    {/* ── Top accent line ── */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <div style={{ width: 32, height: 2.5, background: '#E8600A', borderRadius: 2 }} />
    </div>

    {/* ── Badge ── */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '5px 14px',
        borderRadius: 100,
        border: '1px solid rgba(44,26,14,0.22)',
        background: 'transparent',
      }}>
        <span style={{
          color: '#2C1A0E',
          fontSize: 10,
          fontFamily: F.dmMono,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.4px',
        }}>The Founder</span>
      </div>
    </div>

    {/* ── Headline ── */}
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <div style={{
        color: '#2C1A0E',
        fontSize: isMobile ? 28 : 38,
        fontFamily: F.fraunces,
        fontWeight: 900,
        lineHeight: 1.15,
        marginBottom: 4,
      }}>
        The person who said
      </div>
      <div style={{
        color: '#E8600A',
        fontSize: isMobile ? 28 : 38,
        fontFamily: F.fraunces,
        fontWeight: 700,
        fontStyle: 'italic',
        lineHeight: 1.15,
      }}>
        "there has to be a better way."
      </div>
    </div>

    {/* ── Subtext ── */}
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div style={{ color: '#7A5C40', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22px' }}>
        One afternoon at an MCD portal. One frustrated pet parent.
      </div>
      <div style={{ color: '#7A5C40', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '22px' }}>
        One platform that changed how Delhi NCR registers its pets.
      </div>
    </div>

    {/* ── Dark Card ── */}
    <div style={{
      background: '#231008',
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: isMobile ? 'auto' : 380,
    }}>

      {/* LEFT: Photo column - Image fills entire section */}
      <div style={{
        width: isMobile ? '100%' : '38%',
        flexShrink: 0,
        position: 'relative',
        background: '#1A0A02',
        minHeight: isMobile ? 320 : 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        
        {/* Founder Image - shifted to the left */}
        <img 
          src="/images/founder1.jpeg" 
          alt="Kaavya Chhabra - Founder" 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            objectPosition: '30% center',
            position: 'absolute',
            top: 0,
            left: 0,
          }} 
        />
        
        {/* "Parent of Mylo & Felix" pill - positioned at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 6,
          padding: '6px 16px',
          background: 'rgba(44,26,14,0.85)',
          borderRadius: 100,
          border: '1px solid rgba(232,96,10,0.3)',
          zIndex: 2,
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ 
            color: '#E8600A', 
            fontSize: 11, 
            fontFamily: F.dmSans, 
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}>
            Parent of Mylo &amp; Felix
          </span>
        </div>
      </div>

      {/* Divider line */}
      {!isMobile && (
        <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
      )}
      {isMobile && (
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      )}

      {/* RIGHT: Info column */}
      <div style={{
        flex: 1,
        padding: isMobile ? '28px 24px' : '36px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        {/* FOUNDER label with orange dash */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{
            color: '#E8600A',
            fontSize: 9.5,
            fontFamily: F.dmMono,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '1.4px',
          }}>Founder</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)', maxWidth: 60 }} />
        </div>

        {/* Name */}
        <div style={{
          color: '#FFFFFF',
          fontSize: isMobile ? 36 : 48,
          fontFamily: F.fraunces,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Kaavya<br />Chhabra
        </div>

        {/* Quote block with orange left border */}
        <div style={{
          borderLeft: '3px solid #E8600A',
          paddingLeft: 16,
          marginBottom: 28,
        }}>
          <span style={{
            color: '#E8600A',
            fontSize: isMobile ? 15 : 17,
            fontFamily: F.fraunces,
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.4,
          }}>
            "Compliance shouldn't feel like punishment."
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />

        {/* THE STORY label */}
        <div style={{
          color: 'rgba(255,255,255,0.28)',
          fontSize: 9,
          fontFamily: F.dmMono,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.6px',
          marginBottom: 12,
        }}>
          The Story
        </div>

        {/* Story paragraph */}
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 13,
          fontFamily: F.dmSans,
          fontWeight: 400,
          lineHeight: '20px',
          margin: 0,
          marginBottom: 24,
        }}>
          Kaavya is a teacher with two dogs —{' '}
          <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Mylo and Felix</span>,
          {' '}and zero idea that they needed municipal registration. When her housing society sent a notice, she spent{' '}
          <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>three hours on the MCD portal</span>
          {' '}and gave up. She built Tailio so no pet parent ever has to have that afternoon. What started as frustration became a platform trusted by thousands of families across Delhi NCR.
        </p>

        {/* Pills row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Pet parent of 2', 'Teacher turned founder', 'Delhi NCR'].map((tag) => (
            <div key={tag} style={{
              padding: '5px 14px',
              borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 11.5,
                fontFamily: F.dmSans,
                fontWeight: 400,
              }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Belief banner ── */}
    <div style={{
      marginTop: 24,
      padding: '18px 22px',
      background: '#FFFCF8',
      borderRadius: 14,
      border: '1px solid rgba(44,26,14,0.09)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      <div style={{
        width: 36,
        height: 36,
        background: '#E8600A',
        borderRadius: 9,
        flexShrink: 0,
      }} />
      <p style={{
        margin: 0,
        color: '#2C1A0E',
        fontSize: 13.5,
        fontFamily: F.dmSans,
        fontWeight: 400,
        lineHeight: '20px',
      }}>
        One belief —{' '}
        <span style={{ color: '#E8600A', fontWeight: 600 }}>every pet deserves a legal identity</span>
        , and every owner deserves a{' '}
        <span style={{ color: '#E8600A', fontWeight: 600 }}>simple way</span>
        {' '}to provide one.
      </p>
    </div>

    {/* ── Bottom accent line ── */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
      <div style={{ width: 32, height: 2.5, background: '#E8600A', borderRadius: 2 }} />
    </div>

  </div>
</div>

      {/* ── WHAT WE'RE BUILDING ───────────────────────────────────────────── */}
      <div style={{ background: '#2C1A0E', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Badge text="What we're building" dark />
            <div>
              <span style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>Tailio is just </span>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: 1.2 }}>getting started.</span>
            </div>
            <p style={{ margin: 0, color: 'rgba(250,246,239,0.55)', fontSize: getResponsiveFontSize(14.5, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px' }}>
              Pet registration is live today. Three more services are in active development — built around everything a pet parent needs.
            </p>
          </div>

          <div style={{ 
  display: 'grid', 
  gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), 
  gap: 16 
}}>
  {[
    { 
      badge: { text: 'Live now', bg: '#E6F6ED', outline: '#A8DDB8', color: '#1A6B3A' }, 
      title: 'Pet Registration', 
      desc: 'Delhi, Noida, Ghaziabad & Gurugram — official municipal filing in under 1 minute. Legally valid certificate delivered in 24–72 hours.',
      icon: '/images/certificate-1.png'
    },
    { 
      badge: { text: 'Coming soon', bg: 'rgba(255,140,58,0.12)', outline: 'rgba(255,140,58,0.20)', color: '#FF8C3A' }, 
      title: 'Vaccination at Doorstep', 
      desc: 'Book a certified vet to vaccinate your pet at home. No clinic visits, no stress. All records logged automatically to your Tailio profile.',
      icon: '/images/vaccine.png'
    },
    { 
      badge: { text: 'Coming soon', bg: 'rgba(255,140,58,0.12)', outline: 'rgba(255,140,58,0.20)', color: '#FF8C3A' }, 
      title: 'Pet Ecommerce', 
      desc: "A curated shop for vet-approved food, accessories, and grooming products — personalised to your pet's breed, age, and health profile.",
      icon: '/images/widget.png'
    },
  ].map((s) => (
    <div 
      key={s.title} 
      style={{ 
        padding: '25px', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: 18, 
        outline: '1px rgba(255,255,255,0.08) solid', 
        outlineOffset: -1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 16, 
        minHeight: isMobile ? 'auto' : 234, 
        boxSizing: 'border-box',
        transition: 'transform 0.2s ease'
      }}
    >
      {/* Icon with Image */}
      <div style={{ 
        width: 44, 
        height: 44, 
        background: 'rgba(255,140,58,0.10)', 
        borderRadius: 9, 
        outline: '1px rgba(255,140,58,0.20) solid', 
        outlineOffset: -1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Image 
          src={s.icon}
          alt={s.title}
          width={24}
          height={24}
          style={{ objectFit: 'contain' }}
        />
      </div>
      
      {/* Badge - Consistent styling for both Live now and Coming soon */}
      <div style={{ 
        display: 'inline-flex', 
        alignSelf: 'flex-start', 
        padding: '4px 12px', 
        background: s.badge.bg, 
        borderRadius: 100, 
        outline: `1px ${s.badge.outline} solid`, 
        outlineOffset: -1 
      }}>
        <span style={{ 
          color: s.badge.color, 
          fontSize: getResponsiveFontSize(10, 9, 8), 
          fontFamily: F.dmMono, 
          fontWeight: 500, 
          textTransform: 'uppercase', 
          lineHeight: '14px', 
          letterSpacing: '0.9px' 
        }}>
          {s.badge.text}
        </span>
      </div>
      
      {/* Title */}
      <div style={{ 
        color: '#FAF6EF', 
        fontSize: getResponsiveFontSize(16, 15, 14), 
        fontFamily: F.dmSans, 
        fontWeight: 600, 
        lineHeight: '22.5px' 
      }}>
        {s.title}
      </div>
      
      {/* Description */}
      <div style={{ 
        color: 'rgba(250,246,239,0.45)', 
        fontSize: getResponsiveFontSize(12.5, 12, 11), 
        fontFamily: F.dmSans, 
        fontWeight: 400, 
        lineHeight: '20px' 
      }}>
        {s.desc}
      </div>
    </div>
  ))}
</div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(166deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
{/* White Paw SVG - 3 fingers/toes */}
    <div style={{ 
      width: isMobile ? 40 : 52, 
      height: isMobile ? 60 : 78, 
      margin: '0 auto 15px', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg 
        width={isMobile ? 40 : 52} 
        height={isMobile ? 60 : 78} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main paw pad (center) */}
        <ellipse cx="50" cy="65" rx="22" ry="18" fill="white" />
        
        {/* Left toe pad */}
        <ellipse cx="28" cy="38" rx="11" ry="13" fill="white" transform="rotate(-15, 28, 38)" />
        
        {/* Center toe pad */}
        <ellipse cx="50" cy="32" rx="11" ry="13" fill="white" />
        
        {/* Right toe pad */}
        <ellipse cx="72" cy="38" rx="11" ry="13" fill="white" transform="rotate(15, 72, 38)" />
      </svg>
    </div>          <div style={{ textAlign: 'center' }}>
            <span style={{ color: 'white', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>Your pet is loved, now </span>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: 1.2 }}>make it legal</span>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>.</span>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24.75px', textAlign: 'center' }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad & Gurugram who are already legally compliant. Register in under 1 minute.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 8 }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 26px', background: 'white', boxShadow: '0px 2px 0px rgba(0,0,0,0.08)', borderRadius: 9, outline: '2px rgba(255,255,255,0.40) solid', outlineOffset: -2, color: '#C04E06', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '21px', textDecoration: 'none' }}>
              Register Your Pet — ₹299
            </Link>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 24px', background: 'rgba(255,255,255,0.12)', borderRadius: 9, outline: '1px rgba(255,255,255,0.30) solid', outlineOffset: -1, color: 'white', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '21px', textDecoration: 'none' }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <Footer/>

    </div>
  );
}