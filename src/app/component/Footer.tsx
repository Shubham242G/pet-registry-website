'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveFontSize = (desktop: number, tablet: number, mobile: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const platformLinks = [
    { name: 'Pet Registration', href: '/pet-registration' },
    { name: 'Digital Pet ID', href: '/digital-pet-id' },
    { name: 'Vaccination Tracker', href: '/vaccination-tracker' },
    { name: 'Lost Pet QR', href: '/lost-pet-qr' },
  ];

  const cityLinks = [
    { name: 'Delhi', href: '/pet-registration-in-delhi' },
    { name: 'Noida', href: '/pet-registration-in-noida' },
    { name: 'Ghaziabad', href: '/pet-registration-in-ghaziabad' },
    { name: 'Gurugram', href: '/pet-registration-in-gurugram' },
  ];

  const companyLinks = [
    { name: 'About Tailio', href: '/about-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blogs', href: '/blog' },
  ];

  const linkStyle = {
    color: 'rgba(250,246,239,0.45)',
    fontFamily: F.dmSans,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const linkHoverStyle = {
    color: '#FF8C3A',
  };

  return (
    <div style={{ background: '#1C0F07', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: isMobile ? '16px 12px 0' : '28px 40px 0',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr 1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), 
          gap: isMobile ? 8 : 24, 
          paddingBottom: isMobile ? 6 : 12, 
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          alignItems: 'flex-start'
        }}>
          {/* Brand Column - Links to home - full width on mobile */}
          {!isMobile && (
            <div>
              <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <div style={{ marginBottom: 8 }}>
                  <Image 
                    src="/images/tailio.png" 
                    alt="Tailio" 
                    width={200} 
                    height={192} 
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
            </div>
          )}
          
          {/* On mobile, show brand in a separate full-width row */}
          {isMobile && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: 4 }}>
              <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <Image 
                  src="/images/tailio.png" 
                  alt="Tailio" 
                  width={120} 
                  height={115} 
                  style={{ objectFit: 'contain' }} 
                />
              </Link>
            </div>
          )}
          
          {/* Platform Column */}
          <div>
            <span style={{ 
              color: '#FF8C3A', 
              fontSize: getResponsiveFontSize(10, 9.5, 8.5), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
              display: 'block',
              marginBottom: isMobile ? 2 : 6,
            }}>
              Platform
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 4 }}>
              {platformLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(12.5, 11.5, 10),
                      padding: isMobile ? '0px 0' : '2px 0',
                      lineHeight: isMobile ? '1.3' : '1.5',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250,246,239,0.45)'}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Cities Column */}
          <div>
            <span style={{ 
              color: '#FF8C3A', 
              fontSize: getResponsiveFontSize(10, 9.5, 8.5), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
              display: 'block',
              marginBottom: isMobile ? 2 : 6,
            }}>
              Cities
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 4 }}>
              {cityLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(12.5, 11.5, 10),
                      padding: isMobile ? '0px 0' : '2px 0',
                      lineHeight: isMobile ? '1.3' : '1.5',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250,246,239,0.45)'}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Company Column - on mobile, this spans both columns */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <span style={{ 
              color: '#FF8C3A', 
              fontSize: getResponsiveFontSize(10, 9.5, 8.5), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
              display: 'block',
              marginBottom: isMobile ? 2 : 6,
            }}>
              Company
            </span>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'row' : 'column',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: isMobile ? 6 : 4,
            }}>
              {companyLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(12.5, 11.5, 10),
                      padding: isMobile ? '0px 0' : '2px 0',
                      lineHeight: isMobile ? '1.3' : '1.5',
                      whiteSpace: isMobile ? 'nowrap' : 'normal',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(250,246,239,0.45)'}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div style={{ textAlign: 'center', padding: isMobile ? '6px 0 10px' : '12px 0 16px' }}>
          <span style={{ 
            color: 'rgba(250,246,239,0.25)', 
            fontSize: getResponsiveFontSize(11, 10.5, 9),
            fontFamily: F.dmSans,
          }}>
            © 2026 Truzo Infotech Pvt. Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}