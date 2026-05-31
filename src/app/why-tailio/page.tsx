'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import RegisterModal from '../component/RegisterModal';
import LoginModal from '../component/LoginModal';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};





function Badge({ text, dark = false }: { text: string; dark?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth <= 768); }, []);
  if (dark) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: 100, outline: '1px rgba(255,255,255,0.10) solid', outlineOffset: -1 }}>
        <span style={{ color: 'rgba(250,246,239,0.55)', fontSize: isMobile ? 8 : 9.5, fontFamily: F.dmMono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.24px' }}>{text}</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', background: '#FFF0E4', borderRadius: 100, outline: '1px #FFCCA0 solid', outlineOffset: -1 }}>
      <span style={{ color: '#C04E06', fontSize: isMobile ? 9 : 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '1.20px' }}>{text}</span>
    </div>
  );
}

function FeatureItem({ icon, title, description, highlight }: { icon: React.ReactNode; title: string; description: string; highlight?: string }) {
  return (
    <div style={{ padding: '26px 24px', background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 7.4 }}>
      <div style={{ width: 44, height: 44, background: '#FFF0E4', borderRadius: 9, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ color: '#2C1A0E', fontSize: 16, fontFamily: F.dmSans, fontWeight: 700, lineHeight: '20.8px', paddingTop: 7.6 }}>{title}</div>
      <div style={{ color: '#7A5C40', fontSize: 13, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '21.45px' }}>{description}</div>
      {highlight && <div style={{ color: '#C04E06', fontSize: 22, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: '33px', marginTop: 8 }}>{highlight}</div>}
    </div>
  );
}

function Testimonial({ name, location, pet, review }: { name: string; location: string; pet: string; review: string }) {
  return (
    <div style={{ padding: '24px 22px', background: '#FFFCF8', borderRadius: 18, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ color: '#E8600A', fontSize: 13, letterSpacing: '2px', marginBottom: 14 }}>★★★★★</div>
      <div style={{ color: '#4A2C14', fontSize: 15, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 400, lineHeight: '24px', marginBottom: 20 }}>{review}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#2C1A0E', fontSize: 13.5, fontWeight: 700 }}>{name}</div>
          <div style={{ color: '#A68660', fontSize: 11.5 }}>{location}</div>
        </div>
        <div style={{ padding: '4px 12px', background: '#FFF0E4', borderRadius: 100, outline: '1px #FFCCA0 solid', outlineOffset: -1 }}>
          <span style={{ color: '#C04E06', fontSize: 12, fontWeight: 600 }}>{pet}</span>
        </div>
      </div>
    </div>
  );
}

export default function WhyTailioPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getResponsivePadding = () => {
    if (isMobile) return '40px 20px';
    if (isTablet) return '60px 30px';
    return '80px 40px';
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };
  const getResponsiveFontSize = (desktop: number, tablet: number, mobile: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

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

  const gp = () => isMobile ? '60px 20px' : isTablet ? '80px 30px' : '80px 40px';
  const fs = (d: number, t: number, m: number) => isMobile ? m : isTablet ? t : d;

  return (
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', background: '#FAF6EF' }}>

      {/* ══ SECTION 1: WHY TAILIO ══ */}
      <div style={{ background: '#FAF6EF', width: '100%', overflow: 'hidden', position: 'relative' }}>
  <div style={{ position: 'absolute', width: 500, height: 500, right: 0, top: -80, background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(232,96,10,0.08) 0%, rgba(232,96,10,0) 65%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 1100, margin: '0 auto', padding: getResponsivePadding() }}>
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 40, alignItems: 'flex-start' }}>

      {/* LEFT COLUMN */}
      <div style={{ flex: 1 }}>
        <Badge text="Why Tailio?" />
        
        {/* Heading — exactly 3 lines as in picture */}
        <div style={{ marginTop: 17 }}>
          <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.15, whiteSpace: 'nowrap' }}>Both paths lead to</div>
          <div style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.15, whiteSpace: 'nowrap' }}>registration.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#2C1A0E', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.15 }}>Only one is built with </span>
            <span style={{ color: '#E8600A', fontSize: getResponsiveFontSize(62, 48, 32), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: 1.15 }}>love.</span>
          </div>
        </div>
        
        <p style={{ color: '#7A5C40', fontSize: getResponsiveFontSize(15, 14, 13), lineHeight: '25.5px', marginTop: 20, maxWidth: 558 }}>
          The municipal portal works. Eventually. Probably. Tailio gets you legally registered in 60 seconds — from your phone, with no broken forms, no waiting weeks for a PDF.
        </p>
        
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 15 }}>
          <button onClick={handleOpenRegisterModal} style={{ 
            padding: isMobile ? '12px 24px' : '13px 26px', 
            background: '#E8600A', 
            boxShadow: '0px 4px 16px rgba(232,96,10,0.28), 0px 2px 0px #C04E06', 
            borderRadius: 9, 
            outline: '2px #C04E06 solid', 
            outlineOffset: -2, 
            color: '#FFFFFF', 
            fontSize: getResponsiveFontSize(15, 14, 13), 
            fontFamily: F.dmSans, 
            fontWeight: 600, 
            cursor: 'pointer', 
            border: 'none', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 7 
          }}>
            Register Your Pet — ₹999 <span style={{ fontFamily: F.fraunces, fontStyle: 'italic', fontSize: 17.3 }}>→</span>
          </button>
          <a href="#comparison" style={{ 
            padding: isMobile ? '12px 24px' : '13px 22px', 
            borderRadius: 9, 
            outline: '1px solid rgba(44,26,14,0.18)', 
            outlineOffset: -1, 
            color: '#2C1A0E', 
            fontSize: getResponsiveFontSize(15, 14, 13), 
            fontFamily: F.dmSans, 
            fontWeight: 500, 
            textDecoration: 'none', 
            display: 'inline-block' 
          }}>
            See the difference
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN — Stats Card with 24-72h forced to 1 line */}
      <div style={{ 
        flex: 1, 
        background: '#2C1A0E', 
        borderRadius: 18, 
        padding: '32px', 
        position: 'relative', 
        overflow: 'hidden' ,
        width: 600, 
      }}>
        <div style={{ 
          position: 'absolute', 
          width: 180, 
          height: 180, 
          right: -40, 
          top: -40, 
          background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(232,96,10,0.18) 0%, rgba(232,96,10,0) 65%)', 
          pointerEvents: 'none' 
        }} />
        
        <div style={{ 
          color: 'rgba(250,246,239,0.40)', 
          fontSize: 9.5, 
          textTransform: 'uppercase', 
          letterSpacing: '1.33px', 
          marginBottom: 15, 
          fontFamily: F.dmMono 
        }}>
          The numbers don't lie
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: '60s', desc: 'Average registration time on Tailio vs 2–4 weeks on the municipal portal' },
            { label: '₹999', desc: 'Launch offer — all-inclusive. Municipal portal charges ₹100–500 and still sends you to the office' },
            { label: '24–72h', desc: 'Certificate delivery after submission. No follow-ups needed — we handle everything' },
            { label: '0', desc: 'Zero buffering. Zero endless forms. Zero broken links.' },
          ].map((item, i) => (
            <div key={i} style={{ 
              paddingBottom: i < 3 ? 14 : 0, 
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Fixed width container to prevent "24-72h" from wrapping */}
                <div style={{ minWidth: 90, flexShrink: 0 }}>
                  <span style={{ 
                    color: '#FF8C3A', 
                    fontSize: 32, 
                    fontFamily: F.fraunces, 
                    fontStyle: 'italic', 
                    fontWeight: 900, 
                    lineHeight: '32px', 
                    whiteSpace: 'nowrap' 
                  }}>
                    {item.label}
                  </span>
                </div>
                <div style={{ 
                  color: 'rgba(250,246,239,0.60)', 
                  fontSize: 13, 
                  lineHeight: '18.85px', 
                  fontFamily: F.dmSans 
                }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* ══ SECTION 2: COMPARISON BANNER ══ */}
      <div style={{ background: '#2C1A0E', width: '100%', padding: '64px 0' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[
              { icon: <Image src="/images/correct.png" alt="Legal" width={32} height={32} />, text: 'Legally valid registration' },
              { icon: <Image src="/images/something.png" alt="Phone" width={32} height={32} />, text: '100% online, from your phone' },
              { icon: <Image src="/images/timer.png" alt="Clock" width={32} height={32} />, text: 'Done in under 60 seconds' },
              { icon: <Image src="/images/target.png" alt="Support" width={32} height={32} />, text: 'Support in under 2 hours' },
              { icon: <Image src="/images/reminder.png" alt="WhatsApp" width={32} height={32} />, text: 'WhatsApp & email reminders' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <span style={{ color: 'rgba(250,246,239,0.65)', fontSize: 14, fontFamily: F.dmSans, fontWeight: 500 }}>{item.text}</span>
                {i < 4 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.10)', marginLeft: 12 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 3: TAILIO vs PORTAL ══ */}
      <div id="comparison" style={{ background: '#F3EDE0', width: '100%' }}>
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
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: isMobile ? 800 : '100%', background: '#FFFFFF', borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(44,26,14,0.10)' }}>
          <div style={{ padding: '16px 24px', borderRight: '1px solid rgba(44,26,14,0.10)' }}>
            <span style={{ color: '#A68660', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase' }}>What you get</span>
          </div>
          <div style={{ padding: '16px 24px', background: '#E8600A', textAlign: 'center' }}>
            <span style={{ color: '#4A2C14', fontSize: 20, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900 }}>Tailio.</span>
          </div>
          <div style={{ padding: '16px 24px', textAlign: 'center' }}>
            <span style={{ color: '#A68660', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase' }}>Municipal Portal</span>
          </div>
        </div>
        
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
            {/* Left Column - Label */}
            <div style={{ padding: '18px 24px', borderRight: '1px solid rgba(44,26,14,0.10)' }}>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: '#2C1A0E' }}>{row.label}</div>
              <div style={{ color: '#A68660', fontSize: 11, marginTop: 4 }}>{row.sub}</div>
            </div>
            
            {/* Middle Column - Tailio Value */}
            <div style={{ padding: '18px 24px', background: 'rgba(232,96,10,0.04)', textAlign: 'center' }}>
              {row.tailio === '✓' ? (
                <div style={{ width: 28, height: 28, background: '#2C1A0E', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <div style={{ width: 13, height: 9, borderBottom: '2px solid #FFFFFF', borderLeft: '2px solid #FFFFFF', transform: 'rotate(-45deg)', marginTop: -2 }} />
                </div>
              ) : (
                <span style={{ 
                  fontSize: row.tailio === 'None' ? 16 : 14, 
                  fontFamily: row.tailio === 'None' ? F.fraunces : F.dmSans, 
                  fontWeight: row.tailio === 'None' ? 900 : 700, 
                  color: '#2C1A0E' 
                }}>{row.tailio}</span>
              )}
            </div>
            
            {/* Right Column - Portal Value */}
            <div style={{ padding: '18px 24px', textAlign: 'center' }}>
              {row.portal === '✗' ? (
                <div style={{ width: 28, height: 28, borderRadius: 14, border: '1px solid rgba(44,26,14,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <div style={{ width: 11, height: 11, border: '1px solid #A68660', transform: 'rotate(45deg)' }} />
                </div>
              ) : (
                <span style={{ 
                  color: row.portal === '₹10,000+' ? '#C04E06' : '#A68660', 
                  fontSize: row.portal === '₹10,000+' ? 16 : 14, 
                  fontFamily: row.portal === '₹10,000+' ? F.fraunces : F.dmSans, 
                  fontStyle: row.portal === '₹10,000+' ? 'italic' : 'normal', 
                  fontWeight: row.portal === '₹10,000+' ? 700 : 400 
                }}>{row.portal}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* ══ SECTION 4: SIX REASONS ══ */}
      <div style={{ background: '#FAF6EF', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: gp() }}>
          <div style={{ marginBottom: 31 }}>
            <Badge text="What you actually get" />
            <div style={{ marginTop: 20 }}>
              <span style={{ color: '#2C1A0E', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '44px' }}>Six reasons pet parents </span>
              <span style={{ color: '#E8600A', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: '44px' }}>choose Tailio.</span>
            </div>
            <p style={{ color: '#7A5C40', fontSize: 14.5, maxWidth: 742, marginTop: 16 }}>Every feature was built because a pet parent needed it — not because it looked good in a pitch deck.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 16 }}>
            {[
              { icon: <Image src="/images/timer.png" alt="Fast" width={28} height={28} />, title: 'Done in 60 seconds flat', desc: "Three fields, four uploads, one click. We've timed it. The average pet parent is done before their chai goes cold.", highlight: '60s' },
              { icon: <Image src="/images/correct.png" alt="Legal" width={28} height={28} />, title: 'Legally valid. Always.', desc: 'We file directly with MCD, Noida Authority, and GMC. The certificate you receive is the official government-issued document — not a Tailio proxy.', highlight: '100%' },
              { icon: <Image src="/images/reminder.png" alt="Reminder" width={28} height={28} />, title: 'Never miss a renewal', desc: "WhatsApp, SMS, and email reminders before your annual expiry. We ping you a week out, three days out, and the day of — you can't forget." },
              { icon: <Image src="/images/vaccine.png" alt="Vaccine" width={28} height={28} />, title: 'Vaccination tracker built in', desc: "Log every shot, set reminders, and share your pet's health record with any vet — digitally. No paper booklets that get lost in a move." },
              { icon: <Image src="/images/certificate-1.png" alt="Certificate" width={28} height={28} />, title: 'Digital certificate', desc: 'Your certificate lives on your Tailio profile — always accessible, never losable. Share it with your RWA, building society, or vet in two taps.' },
              { icon: <Image src="/images/id.png" alt="Support" width={28} height={28} />, title: 'Support that actually responds', desc: "Our team responds in under 2 hours — not 2 weeks. Real humans, not automated replies. We're pet parents too.", highlight: '<2hr' },
            ].map((f, i) => <FeatureItem key={i} icon={f.icon} title={f.title} description={f.desc} highlight={f.highlight} />)}
          </div>
        </div>
      </div>

      {/* ══ SECTION 5: KNOW THE FINES ══ */}
      <div style={{ background: '#2C1A0E', width: '100%', borderRadius: '24px 24px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: gp(), textAlign: 'center' }}>
          <Badge text="Know the fines" dark />
          <div style={{ marginTop: 20 }}>
            <span style={{ color: '#FAF6EF', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: '44px' }}>Ignore Registration, Pay the </span>
            <span style={{ color: '#FF8C3A', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900, lineHeight: '44px' }}>Penalty</span>
          </div>
          <p style={{ color: 'rgba(250,246,239,0.55)', fontSize: 14.5, maxWidth: 540, margin: '16px auto 28px' }}>Municipal corporations are actively enforcing registration. These are the current fines across Delhi NCR.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: 16, marginBottom: 40 }}>
            {[
              { city: 'Gurugram',   amount: 'Pending',  desc: 'Registration strongly encouraged. Fines to be announced — act now.',         icon: '/images/gurugram.png' },
              { city: 'Delhi',      amount: '₹500+',    desc: 'Fee enforcement underway. Fines escalating with each MCD drive.',            icon: '/images/delhi.png' },
              { city: 'Noida',      amount: '₹10,000',  desc: 'Highest fine in NCR. Noida authority actively penalising non-compliance.',   icon: '/images/noida.png' },
              { city: 'Ghaziabad',  amount: '₹5,000',   desc: 'Registration fee raised from ₹200 to ₹1,000 in April 2024.',               icon: '/images/ghaziabad.png' },
            ].map(c => (
              <div key={c.city} style={{ padding: '21px 18px', background: 'rgba(255,140,58,0.08)', borderRadius: 18, outline: '1px rgba(255,140,58,0.22) solid', textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,140,58,0.60)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '1.26px', marginBottom: 6, fontFamily: F.dmMono }}>{c.city}</div>
                <div style={{ width: 40, height: 46, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src={c.icon} alt={c.city} width={38} height={38} style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ color: c.amount === 'Pending' ? 'rgba(250,246,239,0.28)' : '#FF8C3A', fontSize: c.amount === 'Pending' ? 15 : 26, fontFamily: c.amount === 'Pending' ? F.dmSans : F.fraunces, fontWeight: c.amount === 'Pending' ? 500 : 900, marginTop: 6 }}>{c.amount}</div>
                <div style={{ color: 'rgba(250,246,239,0.38)', fontSize: 11, marginTop: 8 }}>{c.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#FAF6EF', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ width: isMobile ? '100%' : 4, height: isMobile ? 4 : 'auto', background: 'linear-gradient(180deg, #E8600A 0%, #C04E06 100%)' }} />
            <div style={{ flex: 1, padding: isMobile ? '24px' : '30px 36px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: '#FFF0E4', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/images/id.png" alt="Warning" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <span style={{ color: '#C04E06', fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.2px', fontFamily: F.dmSans, fontWeight: 500 }}>Legal Warning</span>
              </div>
              <div style={{ color: '#2C1A0E', fontSize: fs(24, 20, 18), fontFamily: F.fraunces, fontWeight: 700, lineHeight: '30px', marginBottom: 7 }}>
                Without proper <span style={{ color: '#C04E06', fontStyle: 'italic' }}>Registration,</span> your pet may not be legally protected during disputes.
              </div>
              <p style={{ color: '#7A5C40', fontSize: 13.5, lineHeight: '22.28px', marginBottom: 13 }}>In disputes or complaints, municipal authorities may seize your pet. An unregistered pet has no legal standing and neither does its owner. Don't wait until it's too late.</p>
              <button onClick={() => setShowRegisterModal(true)} style={{ display: 'inline-block', padding: '13px 26px', background: '#E8600A', boxShadow: '0px 4px 16px rgba(232,96,10,0.28), 0px 2px 0px #C04E06', borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2, color: 'white', fontWeight: 600, cursor: 'pointer', border: 'none' }}>Register Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 6: TESTIMONIALS ══ */}
      <div style={{ background: '#F3EDE0', width: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: gp() }}>
          <Badge text="Happy pet parents" />
          <div style={{ marginTop: 16 }}>
            <span style={{ color: '#2C1A0E', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontWeight: 900 }}>They did it. </span>
            <span style={{ color: '#E8600A', fontSize: fs(40, 32, 28), fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 900 }}>So can you.</span>
          </div>
          <p style={{ color: '#7A5C40', fontSize: 14.5, marginTop: 16, marginBottom: 31 }}>Pet parents from Delhi NCR who registered with Tailio.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 16 }}>
            {[
              { name: 'Priya Sharma', location: 'Dwarka, Delhi', pet: 'Bruno', review: '"I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"' },
              { name: 'Arjun Mehta', location: 'Sector 62, Noida', pet: 'Luna', review: '"I tried the Noida Municipal portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn\'t expect."' },
              { name: 'Sneha Kapoor', location: 'Indirapuram, Ghaziabad', pet: 'Coco', review: '"The vaccination reminder alone is worth it. I used to forget booster dates all the time. Now Tailio pings me on WhatsApp a week before. My vet loves it too."' },
            ].map(t => <Testimonial key={t.name} {...t} />)}
          </div>
        </div>
      </div>

      {/* ══ SECTION 7: FINAL CTA ══ */}
      <div style={{ background: 'linear-gradient(164deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '60px 20px' : '100px 40px', textAlign: 'center' }}>
          <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 60 : 78, margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={isMobile ? 40 : 52} height={isMobile ? 60 : 78} viewBox="0 0 100 100" fill="none">
              <ellipse cx="50" cy="65" rx="22" ry="18" fill="white" />
              <ellipse cx="28" cy="38" rx="11" ry="13" fill="white" transform="rotate(-15, 28, 38)" />
              <ellipse cx="50" cy="32" rx="11" ry="13" fill="white" />
              <ellipse cx="72" cy="38" rx="11" ry="13" fill="white" transform="rotate(15, 72, 38)" />
            </svg>
          </div>
          <div style={{ color: 'white', fontSize: fs(58, 44, 32), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, marginBottom: 13 }}>Upload Less. <br />Move Faster.</div>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: fs(16, 14, 13), maxWidth: 520, margin: '0 auto 27px' }}>Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad &amp; Gurugram who are already compliant.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowRegisterModal(true)} style={{ padding: isMobile ? '12px 28px' : '14px 32px', background: 'white', borderRadius: 9, outline: '2px solid rgba(255,255,255,0.30)', outlineOffset: -2, color: '#C04E06', fontWeight: 700, cursor: 'pointer', border: 'none' }}>Register Your Pet — ₹999 →</button>
            <a href="#comparison" style={{ padding: isMobile ? '12px 28px' : '14px 28px', borderRadius: 9, outline: '1px solid rgba(255,255,255,0.40)', outlineOffset: -1, color: 'white', fontWeight: 500, textDecoration: 'none' }}>See the difference</a>
          </div>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div style={{ background: '#1C0F07', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '32px 20px 0' : '40px 40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), gap: isMobile ? 28 : 32, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'flex-start' }}>
            <div><Image src="/images/tailio.png" alt="Tailio" width={180} height={54} style={{ objectFit: 'contain' }} /></div>
            {[
              { title: 'Platform', links: ['Pet Registration', 'Digital Pet ID', 'Vaccination Tracker', 'Lost Pet QR'] },
              { title: 'Cities',   links: ['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'] },
              { title: 'Company',  links: ['About Tailio', 'Privacy Policy', 'Terms of Service', 'Contact Us'] },
            ].map(col => (
              <div key={col.title}>
                <span style={{ color: '#FF8C3A', fontSize: fs(11, 10, 10), textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 500 }}>{col.title}</span>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {col.links.map(item => <div key={item} style={{ color: 'rgba(250,246,239,0.45)', fontSize: fs(13, 12, 11), cursor: 'pointer' }}>{item}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
            <span style={{ color: 'rgba(250,246,239,0.25)', fontSize: fs(12, 11, 10) }}>© 2026 Tailio. All rights reserved.</span>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} onSwitchToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true); }} />
      <LoginModal    isOpen={showLoginModal}    onClose={() => setShowLoginModal(false)}    onSwitchToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true); }} />
    </div>
  );
}