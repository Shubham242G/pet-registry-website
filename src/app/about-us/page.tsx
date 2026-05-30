'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

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
      // Remove any border that might be coming from the image
      border: 'none',
      outline: 'none',
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
      {/* Founder photo - with proper styling to remove borders */}
      <Image
        src={founderImages[variant]}
        alt={`Founder ${variant}`}
        fill
        style={{ 
          objectFit: 'cover', 
          objectPosition: 'top',
          border: 'none',
          outline: 'none',
        }}
      />
    </div>
  );
}

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
            <div style={{ flexShrink: 0, width: isMobile ? '100%' : 460, height: isMobile ? 'auto' : 460, minHeight: isMobile ? 300 : 460, borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
              <Image
                src="/images/about-us-banner.png"
                alt="Tailio founders illustration"
                fill={!isMobile}
                width={isMobile ? 460 : undefined}
                height={isMobile ? 460 : undefined}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                { period: 'Mid 2025', title: 'Team formed & built', desc: 'Four co-founders — combining expertise in technology, legal compliance, design, and operations — came together to build Tailio.', v: 2 },
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
      <Badge text="What we stand for" />
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
        { title: 'Pet parents first', desc: 'Every feature, every word, every decision is made from the perspective of someone trying to do right by their pet. Complexity stays on our side.' },
        { title: 'Radical simplicity', desc: "If it takes more than a minute, we've failed. We obsess over reducing friction — in our product, our communication, and our process." },
        { title: 'Trust through transparency', desc: "No hidden fees, no confusing terms. We tell you exactly what we do, how much it costs, and what you'll get — before you pay a single rupee." },
        { title: 'We love animals too', desc: "This isn't just a compliance tool. We genuinely care about animal welfare — every registered pet is a safer, healthier, more protected companion." },
        { title: 'Building for scale', desc: "India has over 33 million pet dogs. We're not building for Delhi NCR — we're building the infrastructure for pet registration across the entire country." },
        { title: 'Community accountability', desc: 'Registered pets mean accountable owners. We believe a safer city for animals is a safer city for everyone — and registration is where it starts.' },
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
          {/* Icon Box - Perfectly centered and consistent size */}
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
            <div style={{ 
              width: 24, 
              height: 24, 
              background: 'rgba(192,78,6,0.12)', 
              borderRadius: 6,
              transition: 'all 0.2s ease'
            }} />
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
      <div id="founders" style={{ background: '#FAF6EF', width: '100%', boxSizing: 'border-box' }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 48 }}>
      <Badge text="The founders" />
      <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(38, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, textAlign: 'center' }}>
        Meet the people behind Tailio
      </div>
      <div style={{ maxWidth: 440, color: '#7A5C40', fontSize: getResponsiveFontSize(14.5, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '23.93px', textAlign: 'center' }}>
        Four people. One shared belief — that every pet deserves a legal identity, and every owner deserves a simple way to provide one.
      </div>
    </div>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), 
      gap: 16 
    }}>
      {[
        { num: 1, name: 'Kaavya Chhabra', quote: '"Compliance shouldn\'t feel like punishment."', bio: 'Teacher by profession and devoted pet parent, inspired by Mylo and Felix to celebrate the joy, chaos, companionship, and unforgettable bond pets bring daily.' },
        { num: 2, name: 'Nitin Verma', quote: '"Responsible pet ownership made simple"', bio: 'Drives partnerships, customer experience, and market expansion, leveraging entrepreneurial expertise across sourcing, automotive detailing, and paint solutions businesses.' },
        { num: 3, name: 'Akshay Verma', quote: '"Design is not how it looks. It\'s how fast it works."', bio: 'Built a scalable automotive aesthetics business, leading operations, luxury refinishing projects, talent development, and systems focused on quality and sustainable growth.' },
        { num: 4, name: 'Anukrit Mahajan', quote: '"If it doesn\'t scale, it doesn\'t count."', bio: 'Engineering graduate from Manipal Institute of Technology and MBA from China Europe International Business School, building scalable ecommerce ventures through innovation, strategy, and deep emerging-market expertise.' },
      ].map((f) => (
        <div key={f.name} style={{ background: '#FFFCF8', overflow: 'hidden', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column' }}>
          <FounderSilhouette variant={f.num} hideNumber={true} />
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <span style={{ color: '#C04E06', fontSize: getResponsiveFontSize(9.5, 9, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', lineHeight: '14.25px', letterSpacing: '1.14px' }}>Co-founder</span>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(18, 16, 15), fontFamily: F.fraunces, fontWeight: 700, lineHeight: '27px' }}>{f.name}</span>
            <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(12.5, 12, 11), fontFamily: F.dmSans, fontStyle: 'italic', fontWeight: 400, lineHeight: '19.38px' }}>{f.quote}</span>
            <div style={{ paddingTop: 16, marginTop: 8, borderTop: '1px rgba(44,26,14,0.10) solid', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ color: '#A68660', fontSize: getResponsiveFontSize(10, 9, 9), fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '0.8px' }}>Background</span>
              <span style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(12.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.38px' }}>{f.bio}</span>
            </div>
          </div>
        </div>
      ))}
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
              { badge: { text: 'Live now', bg: '#E6F6ED', outline: '#A8DDB8', color: '#1A6B3A' }, title: 'Pet Registration', desc: 'Delhi, Noida, Ghaziabad & Gurugram — official municipal filing in under 1 minute. Legally valid certificate delivered in 24–72 hours.' },
              { badge: { text: 'Coming soon', bg: 'rgba(255,140,58,0.12)', outline: 'rgba(255,140,58,0.20)', color: '#FF8C3A' }, title: 'Vaccination at Doorstep', desc: 'Book a certified vet to vaccinate your pet at home. No clinic visits, no stress. All records logged automatically to your Tailio profile.' },
              { badge: { text: 'Coming soon', bg: 'rgba(255,140,58,0.12)', outline: 'rgba(255,140,58,0.20)', color: '#FF8C3A' }, title: 'Pet Ecommerce', desc: "A curated shop for vet-approved food, accessories, and grooming products — personalised to your pet's breed, age, and health profile." },
            ].map((s) => (
              <div key={s.title} style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: 18, outline: '1px rgba(255,255,255,0.08) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 16, minHeight: isMobile ? 'auto' : 234, boxSizing: 'border-box' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(255,140,58,0.10)', borderRadius: 9, outline: '1px rgba(255,140,58,0.20) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 22, height: 22, background: 'rgba(255,140,58,0.3)', borderRadius: 3 }} />
                </div>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '3px 9px', background: s.badge.bg, borderRadius: 100, outline: `1px ${s.badge.outline} solid`, outlineOffset: -1 }}>
                  <span style={{ color: s.badge.color, fontSize: getResponsiveFontSize(9, 9, 8), fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', lineHeight: '13.5px', letterSpacing: '0.9px' }}>{s.badge.text}</span>
                </div>
                <div style={{ color: '#FAF6EF', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '22.5px' }}>{s.title}</div>
                <div style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(12.5, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '20px' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(166deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: getResponsivePadding(), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Image src="/images/about-paw-icon.png" alt="Paw print" width={isMobile ? 50 : 70} height={isMobile ? 50 : 70} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: 'white', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>Your pet is loved, now </span>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: 1.2 }}>make it legal</span>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(44, 36, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>.</span>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', fontSize: getResponsiveFontSize(15, 14, 13), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '24.75px', textAlign: 'center' }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad & Gurugram who are already legally compliant. Register in under 1 minute.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 8 }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 26px', background: 'white', boxShadow: '0px 2px 0px rgba(0,0,0,0.08)', borderRadius: 9, outline: '2px rgba(255,255,255,0.40) solid', outlineOffset: -2, color: '#C04E06', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 600, lineHeight: '21px', textDecoration: 'none' }}>
              Register Your Pet — ₹999
            </Link>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 24px', background: 'rgba(255,255,255,0.12)', borderRadius: 9, outline: '1px rgba(255,255,255,0.30) solid', outlineOffset: -1, color: 'white', fontSize: getResponsiveFontSize(14, 13, 12), fontFamily: F.dmSans, fontWeight: 500, lineHeight: '21px', textDecoration: 'none' }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <div style={{ background: '#1C0F07', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px 0' : '64px 40px 0', boxSizing: 'border-box' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), 
            gap: isMobile ? 32 : 48, 
            paddingBottom: 40, 
            borderBottom: '1px rgba(255,255,255,0.06) solid' 
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Image src="/images/tailio-logo-light.png" alt="Tailio" width={120} height={40} style={{ height: 40, width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }} />
              <p style={{ margin: 0, color: 'rgba(250,246,239,0.38)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '21.45px', maxWidth: 220 }}>
                Making pet registration simple, digital, and stress-free across Delhi NCR.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 10, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Platform</span>
              {['Pet Registration', 'Digital Pet ID', 'Vaccination Tracker', 'Lost Pet QR'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none' }}>{item}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 10, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Cities</span>
              {['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none' }}>{item}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ color: '#FF8C3A', fontSize: getResponsiveFontSize(10, 10, 9), fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.4px' }}>Company</span>
              {['About Tailio', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <Link key={item} href="#" style={{ color: 'rgba(250,246,239,0.45)', fontSize: getResponsiveFontSize(13, 12, 11), fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px', textDecoration: 'none' }}>{item}</Link>
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