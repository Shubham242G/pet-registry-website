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

  // Define all links for easier maintenance
  const platformLinks = [
    { name: 'Pet Registration', href: '/pet-registration' },
    { name: 'Digital Pet ID', href: '/digital-pet-id' },
    { name: 'Vaccination Tracker', href: '/vaccination-tracker' },
    { name: 'Lost Pet QR', href: '/lost-pet-qr' },
  ];

  const cityLinks = [
    { name: 'Delhi', href: '/delhi-pet-registration' },
    { name: 'Noida', href: '/noida-pet-registration' },
    { name: 'Ghaziabad', href: '/ghaziabad-pet-registration' },
    { name: 'Gurugram', href: '/gurugram-pet-registration' },
  ];

  const companyLinks = [
    { name: 'About Tailio', href: '/about-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Contact Us', href: '/contact' },
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
    <div style={{ background: '#1C0F07', width: '100%' }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: isMobile ? '32px 20px 0' : '40px 40px 0' 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '1.5fr 1fr 1fr 1fr'), 
          gap: isMobile ? 28 : 32, 
          paddingBottom: 20, 
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          alignItems: 'flex-start'
        }}>
          {/* Brand Column - Links to home */}
          <div>
            <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <div style={{ marginBottom: 12 }}>
                <Image 
                  src="/images/tailio.png" 
                  alt="Tailio" 
                  width={180} 
                  height={54} 
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            </Link>
          </div>
          
          {/* Platform Column */}
          <div>
            <span style={{ 
              color: '#FF8C3A', 
              fontSize: getResponsiveFontSize(11, 10, 10), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
            }}>
              Platform
            </span>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {platformLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(13, 12, 11),
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
              fontSize: getResponsiveFontSize(11, 10, 10), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
            }}>
              Cities
            </span>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cityLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(13, 12, 11),
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
          
          {/* Company Column */}
          <div>
            <span style={{ 
              color: '#FF8C3A', 
              fontSize: getResponsiveFontSize(11, 10, 10), 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px', 
              fontWeight: 500,
              fontFamily: F.dmSans,
            }}>
              Company
            </span>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {companyLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                  <div 
                    style={{ 
                      ...linkStyle,
                      fontSize: getResponsiveFontSize(13, 12, 11),
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
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
          <span style={{ 
            color: 'rgba(250,246,239,0.25)', 
            fontSize: getResponsiveFontSize(12, 11, 10),
            fontFamily: F.dmSans,
          }}>
            © 2026 Truzo Infotech Pvt. Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}