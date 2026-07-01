"use client";
import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import RegisterModal from "../component/RegisterModal";
import LoginModal from "../component/LoginModal";
import Head from "next/head";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const getResponsivePadding = () => {
    if (isMobile) return '40px 20px';
    return '60px 40px';
  };

  const getHeadingFontSize = () => {
    if (isMobile) return '40px';
    return '96px';
  };

  const getSubheadingFontSize = () => {
    if (isMobile) return '32px';
    return '60px';
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>How it works | India's #1 Digital Pet Registration Platform</title>
        <meta 
          name="description" 
          content="Register your pet in under 60 seconds. Official municipal pet registration for Delhi, Noida, Ghaziabad & Gurugram. Get your pet's legal certificate filed in 24-72 hours. Starting at ₹299." 
        />
        <meta 
          name="keywords" 
          content="pet registration India, pet registration Delhi NCR, pet registration MCD, pet registration Noida, pet registration Ghaziabad, pet registration Gurugram, pet certificate, pet compliance, legal pet ownership India, pet registration online, dog registration India, pet vaccination certificate" 
        />
        <link rel="canonical" href="https://tailio.com" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tailio.com" />
        <meta property="og:title" content="Tailio | India's #1 Digital Pet Registration Platform" />
        <meta 
          property="og:description" 
          content="Register your pet in under 60 seconds. Official municipal pet registration for Delhi, Noida, Ghaziabad & Gurugram. Get your pet's legal certificate filed in 24-72 hours. Starting at ₹299." 
        />
        <meta property="og:image" content="https://tailio.com/images/og-home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Tailio" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://tailio.com" />
        <meta name="twitter:title" content="Tailio | India's #1 Digital Pet Registration Platform" />
        <meta 
          name="twitter:description" 
          content="Register your pet in under 60 seconds. Official municipal pet registration for Delhi, Noida, Ghaziabad & Gurugram. Get your pet's legal certificate filed in 24-72 hours." 
        />
        <meta name="twitter:image" content="https://tailio.com/images/og-home.jpg" />
        
        {/* Additional SEO */}
        <meta name="author" content="Tailio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* Schema.org structured data for homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tailio",
              "description": "India's #1 digital pet registration platform. Register your pet legally in under 60 seconds.",
              "url": "https://tailio.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tailio.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Schema.org for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Tailio",
              "description": "Digital pet registration platform serving Delhi NCR",
              "url": "https://tailio.com",
              "telephone": "+91-8796440840",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi NCR",
                "addressCountry": "IN"
              },
              "areaServed": ["Delhi", "Noida", "Ghaziabad", "Gurugram"],
              "priceRange": "₹1000+",
              "openingHours": "Mo-Su 09:00-21:00"
            })
          }}
        />
        
        {/* FAQ Schema - CHANGED: certificate delivery to filing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does pet registration take on Tailio?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pet registration on Tailio takes under 60 seconds to complete. Your certificate is filed within 24-72 hours after submission."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What documents do I need for pet registration?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You need 4 documents: Anti-Rabies Vaccination Certificate, Applicant ID Proof (Aadhaar, PAN, Passport or Voter ID), Address Proof for Delhi NCR, and a recent photo with your pet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does Tailio pet registration cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tailio pet registration costs ₹299 + municipal fees. This includes full filing and processing, with your certificate filed within 24-72 hours."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div style={{ width: '100%', background: 'white' }}>
        <div style={{
          width: '100%',
          background: '#F5F0E8',
          overflow: 'hidden',
          outline: '1px solid rgba(0,0,0,0.20)',
          outlineOffset: -1
        }}>

          {/* Hero Section */}
          <div style={{ width: '100%', padding: getResponsivePadding(), background: '#F5F0E8' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ paddingBottom: 24 }}>
                <div style={{
                  padding: '6px 16px',
                  background: 'rgba(212, 82, 26, 0.10)',
                  borderRadius: 100,
                  display: 'inline-flex'
                }}>
                  <span style={{ color: '#D4521A', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                    How It Works
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <span style={{ color: '#2B1F14', fontSize: getHeadingFontSize(), fontFamily: 'Fraunces', fontWeight: 900, lineHeight: isMobile ? '1.2' : '80px', wordWrap: 'break-word' }}>
                    Two screens.<br />
                  </span>
                  <span style={{ color: '#D4521A', fontSize: getHeadingFontSize(), fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 700, lineHeight: isMobile ? '1.2' : '80px', wordWrap: 'break-word' }}>
                    Sixty seconds.
                  </span>
                </div>
              </div>

              <div style={{ maxWidth: 500, paddingTop: 20 }}>
                <span style={{ color: '#7A6858', fontSize: 18, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '27px' }}>
                  We're going to register your pet. It takes sixty seconds, costs ₹299 + municipal fees, and ends with a legally valid ID. Follow the paws.
                </span>
              </div>

              <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['₹299 + municipal fees', 'MCD, Noida & GMC accepted', 'Filed in 24–72 hrs', 'No office visit needed'].map((text) => (
                    <div key={text} style={{
                      padding: '6px 14px',
                      background: '#FDFAF5',
                      borderRadius: 100,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      outline: '1px solid rgba(43, 31, 20, 0.10)'
                    }}>
                      <div style={{ width: 6, height: 6, background: '#D4521A', borderRadius: 3 }} />
                      <span style={{ color: '#2B1F14', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleOpenRegisterModal}
                style={{
                  padding: '14px 40px',
                  background: '#D4521A',
                  boxShadow: '0px 6px 0px #A83E10',
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C06A18'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#D4521A'}
                aria-label="Start pet registration process"
              >
                <span style={{ color: 'white', fontSize: 17, fontFamily: 'DM Sans', fontWeight: 700 }}>Start walking →</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{
            width: '100%',
            background: '#2B1F14',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { value: '<913', label: 'Pets registered in\nDelhi municipality today' },
              { value: '₹10K', label: 'Minimum fine for\nnon-compliance in Noida' },
              { value: '60s', label: 'Time to register\non Tailio' },
              { value: '33M+', label: 'Pet dogs across\nIndia' }
            ].map((stat, index) => (
              <div key={index} style={{
                width: 240,
                padding: '36px 32px',
                borderRight: index < 3 ? '1px solid rgba(255, 255, 255, 0.07)' : 'none',
                textAlign: 'center'
              }}>
                <div style={{ color: '#D4521A', fontSize: 38, fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '38px' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(245, 240, 232, 0.50)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '19.50px', marginTop: 6, whiteSpace: 'pre-line' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div id="how-it-works" style={{ width: '100%', padding: getResponsivePadding(), background: '#F5F0E8' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(212, 82, 26, 0.10)', borderRadius: 100, marginBottom: 20 }}>
                  <span style={{ color: '#D4521A', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.20px' }}>The Process</span>
                </div>
                <div>
                  <span style={{ color: '#2B1F14', fontSize: getSubheadingFontSize(), fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '63px' }}>Follow the </span>
                  <span style={{ color: '#D4521A', fontSize: getSubheadingFontSize(), fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 700, lineHeight: '63px' }}>paws.</span>
                </div>
                <div style={{ maxWidth: 460, margin: '20px auto 0' }}>
                  <span style={{ color: '#7A6858', fontSize: 16, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '27.20px' }}>
                    Just 4 documents. No PDFs, no notarised forms, no Sunday lost to paperwork.
                  </span>
                </div>
              </div>

              {/* Process Step 1 */}
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  background: '#FDFAF5',
                  borderRadius: 20,
                  padding: '32px 44px',
                  outline: '1px solid rgba(43, 31, 20, 0.08)'
                }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    background: 'rgba(212, 82, 26, 0.08)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20
                  }}>
                    <img
                      src='/images/registration.png'
                      alt="Pet registration icon"
                      style={{ width: 70, height: 70, objectFit: 'contain' }}
                    />
                  </div>
                  <h3 style={{ color: '#2B1F14', fontSize: 26, fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '31.20px', marginBottom: 12 }}>
                    Register & add your pet's details
                  </h3>
                  <p style={{ color: '#7A6858', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '25.50px', marginBottom: 20 }}>
                    Fill in a handful of fields — your pet's name, breed, and age. Works on any phone. No PDFs to download, no notarised forms, no Sunday lost to paperwork.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {["Pet's name & breed", "Age & gender", "Under 60 seconds"].map((tag) => (
                      <div key={tag} style={{
                        padding: '6px 14px',
                        background: '#F5F0E8',
                        borderRadius: 100,
                        outline: '1px solid rgba(43, 31, 20, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7
                      }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M7.28 4.57L2.85 4.57" stroke="#D4521A" strokeWidth="1.5" />
                        </svg>
                        <span style={{ color: '#6B4C35', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 500 }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <div style={{
                    width: 58,
                    height: 58,
                    background: '#D4521A',
                    borderRadius: 29,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: 22, fontFamily: 'Fraunces', fontWeight: 900 }}>1</span>
                  </div>
                </div>
              </div>

              {/* Process Step 2 */}
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  background: '#FDFAF5',
                  borderRadius: 20,
                  padding: '32px 44px',
                  outline: '1px solid rgba(43, 31, 20, 0.08)'
                }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    background: 'rgba(212, 82, 26, 0.08)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20
                  }}>
                    <img
                      src='/images/total-doc.png'
                      alt="Documents icon"
                      style={{ width: 70, height: 70, objectFit: 'contain' }}
                    />
                  </div>
                  <h3 style={{ color: '#2B1F14', fontSize: 26, fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '31.20px', marginBottom: 12 }}>
                    Upload your 4 documents
                  </h3>
                  <p style={{ color: '#7A6858', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '25.50px', marginBottom: 20 }}>
                    Upload them digitally — no photocopies, no office visits. JPG, PNG or PDF accepted. We handle the municipal filing on your behalf.
                  </p>
                  <div style={{ marginTop: 20 }}>
                    {[
                      { name: "Anti-Rabies Vaccination Certificate", desc: "From registered vet, with signature & stamp", number: 1 },
                      { name: "Applicant ID Proof", desc: "Aadhaar, PAN, Passport or Voter ID", number: 2 },
                      { name: "Address Proof", desc: "Delhi, Noida, Ghaziabad or Gurugram", number: 3 },
                      { name: "Photo with Your Pet", desc: "Both faces visible, within 3 months", number: 4 }
                    ].map((doc) => (
                      <div key={doc.number} style={{
                        background: '#F5F0E8',
                        borderRadius: 14,
                        padding: '12px 18px',
                        marginBottom: 10,
                        position: 'relative',
                        outline: '1px solid rgba(43, 31, 20, 0.08)'
                      }}>
                        <div style={{ marginBottom: 4 }}>
                          <span style={{ color: '#2B1F14', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 700 }}>{doc.name}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ color: '#7A6858', fontSize: 11, fontFamily: 'DM Sans', fontWeight: 400 }}>{doc.desc}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 5 }}>
                          {['JPG', 'PNG', 'PDF'].map((format) => (
                            <div key={format} style={{ padding: '2px 7px', background: 'rgba(43, 31, 20, 0.06)', borderRadius: 4 }}>
                              <span style={{ color: '#6B4C35', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 700 }}>{format}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          position: 'absolute',
                          right: 18,
                          top: 12,
                          width: 22,
                          height: 22,
                          background: '#2B1F14',
                          borderRadius: 11,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: '#F5F0E8', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 700 }}>{doc.number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <div style={{
                    width: 58,
                    height: 58,
                    background: '#D4521A',
                    borderRadius: 29,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: 22, fontFamily: 'Fraunces', fontWeight: 900 }}>2</span>
                  </div>
                </div>
              </div>

              {/* Process Step 3 */}
              <div>
                <div style={{
                  background: '#FDFAF5',
                  borderRadius: 20,
                  padding: '32px 44px',
                  outline: '1px solid rgba(43, 31, 20, 0.08)'
                }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    background: 'rgba(212, 82, 26, 0.08)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20
                  }}>
                    <img
                      src='/images/certif-icate.png'
                      alt="Certificate icon"
                      style={{ width: 70, height: 70, objectFit: 'contain' }}
                    />
                  </div>
                  <h3 style={{ color: '#2B1F14', fontSize: 26, fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '31.20px', marginBottom: 12 }}>
                    We file. You get your certificate.
                  </h3>
                  <p style={{ color: '#7A6858', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '25.50px', marginBottom: 20 }}>
                    We submit directly to your municipality — MCD, Noida Authority, or GMC. Your certificate is filed within 24–72 hours. No office visit. Ever.
                  </p>
                  <div style={{
                    background: 'linear-gradient(178deg, #2B1F14 0%, #3D2B1A 100%)',
                    borderRadius: 16,
                    padding: '30px 40px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 30,
                    flexWrap: 'wrap',
                    overflow: 'visible'
                  }}>
                    <div style={{ flex: 1, minWidth: 200, zIndex: 2 }}>
                      <div style={{
                        display: 'inline-flex',
                        padding: '4px 12px',
                        background: 'rgba(212, 82, 26, 0.22)',
                        borderRadius: 100,
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 6
                      }}>
                        <div style={{ width: 6, height: 6, background: '#F4A56A', borderRadius: 3 }} />
                        <span style={{ color: '#F4A56A', fontSize: 11, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase' }}>Certificate filed</span>
                      </div>
                      <div style={{ marginTop: 6, marginBottom: 1 }}>
                        <span style={{ color: '#F5F0E8', fontSize: 26, fontFamily: 'Fraunces', fontWeight: 700 }}>Bruno</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ color: 'rgba(245, 240, 232, 0.40)', fontSize: 11, fontFamily: 'DM Sans', fontWeight: 700, letterSpacing: '1.10px' }}>TL-DL-2025-88471</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Legally registered in Delhi NCR', 'No office visit'].map((text) => (
                          <div key={text} style={{
                            padding: '5px 12px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            borderRadius: 100,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M6.17 3.87L2.41 3.87" stroke="rgba(245, 240, 232, 0.65)" strokeWidth="1.5" />
                            </svg>
                            <span style={{ color: 'rgba(245, 240, 232, 0.65)', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 400 }}>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: -20,
                      marginBottom: -20,
                      zIndex: 1
                    }}>
                      <img
                        src='/images/dog-png.png'
                        alt="Happy dog with certificate"
                        style={{
                          width: 500,
                          height: 500,
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <div style={{
                    width: 58,
                    height: 58,
                    background: '#D4521A',
                    borderRadius: 29,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: 22, fontFamily: 'Fraunces', fontWeight: 900 }}>3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Needed Section */}
          <div style={{ width: '100%', background: '#2B1F14', padding: getResponsivePadding() }}>
            <div style={{ maxWidth: 1140, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(212, 82, 26, 0.22)', borderRadius: 100, marginBottom: 20 }}>
                  <span style={{ color: '#F4A56A', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.20px' }}>What You'll Need</span>
                </div>
                <div>
                  <span style={{ color: '#F5F0E8', fontSize: getSubheadingFontSize(), fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '63px' }}>Four documents.<br /></span>
                  <span style={{ color: '#D4521A', fontSize: getSubheadingFontSize(), fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '63px' }}>That's all.</span>
                </div>
                <div style={{ maxWidth: 460, margin: '20px auto 0' }}>
                  <span style={{ color: 'rgba(245, 240, 232, 0.45)', fontSize: 16, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '27.20px' }}>
                    Upload digitally — no delays, no broken websites. We handle the municipal filing.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
                {[
                  {
                    title: "Anti-Rabies Vaccination Certificate",
                    desc: "Issued by a registered vet confirming your pet received their anti-rabies vaccine.",
                    items: ["Pet's name, gender & age", "Vaccination date & due date", "Vet's signature & hospital stamp"],
                    number: 1,
                    icon: "/images/vaccine.png"
                  },
                  {
                    title: "Applicant ID Proof",
                    desc: "Any government-issued photo ID of the pet owner. Must be valid and clearly legible.",
                    items: ["Aadhaar Card", "PAN Card", "Passport or Voter ID"],
                    number: 2,
                    icon: "/images/id-proof.png"
                  },
                  {
                    title: "Applicant Address Proof",
                    desc: "Proof you reside in Delhi, Noida, Ghaziabad or Gurugram. Must show your current address.",
                    items: ["Aadhaar Card (serves as both)", "Electricity or water bill", "Rental agreement or bank statement"],
                    number: 3,
                    icon: "/images/location-2.png"
                  },
                  {
                    title: "Photograph with Your Pet Dog",
                    desc: "A clear, recent photo of you with your pet. Both faces must be visible. Natural lighting.",
                    items: ["Good natural lighting", "Both owner & pet clearly visible", "Taken within last 3 months"],
                    number: 4,
                    icon: "/images/photo-graph.png"
                  }
                ].map((doc) => (
                  <div key={doc.number} style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: 20,
                    padding: '28px',
                    outline: '1px solid rgba(255, 255, 255, 0.07)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div style={{
                        width: 46,
                        height: 46,
                        background: 'rgba(212, 82, 26, 0.14)',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={doc.icon}
                          alt={`${doc.title} icon`}
                          style={{ width: 24, height: 24, objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{
                        width: 26,
                        height: 26,
                        background: '#D4521A',
                        borderRadius: 13,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: 'white', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700 }}>{doc.number}</span>
                      </div>
                    </div>
                    <h4 style={{ color: '#F5F0E8', fontSize: 18, fontFamily: 'Fraunces', fontWeight: 900, marginBottom: 12 }}>{doc.title}</h4>
                    <p style={{ color: 'rgba(245, 240, 232, 0.42)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '20.80px', marginBottom: 20 }}>{doc.desc}</p>
                    <div>
                      {doc.items.map((item) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                          <div style={{ width: 5, height: 5, background: '#D4521A', borderRadius: 2.5 }} />
                          <span style={{ color: 'rgba(245, 240, 232, 0.58)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
                      {['JPG', 'PNG', 'PDF'].map((format) => (
                        <div key={format} style={{ padding: '2px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 4 }}>
                          <span style={{ color: 'rgba(245, 240, 232, 0.35)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 700 }}>{format}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div style={{
            alignSelf: 'stretch',
            padding: isMobile ? '40px 20px' : '80px 40px',
            background: '#F3EDE0'
          }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 30 }}>
                <div style={{
                  display: 'inline-flex',
                  padding: '5px 14px',
                  background: '#FFF0E4',
                  borderRadius: 100,
                  outline: '1px solid #FFCCA0',
                  marginBottom: 20
                }}>
                  <span style={{ color: '#C04E06', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                    Tailio vs Municipal Portal
                  </span>
                </div>
                <h2 style={{
                  color: '#2C1A0E',
                  fontSize: isMobile ? 28 : 40,
                  fontFamily: 'Fraunces',
                  fontWeight: 900,
                  lineHeight: '44px',
                  marginBottom: 15
                }}>
                  Or spend your <span style={{ color: '#E8600A', fontStyle: 'italic' }}>weekend</span> on the MCD portal.
                </h2>
                <p style={{ color: '#7A5C40', fontSize: 14.5, fontFamily: 'DM Sans', maxWidth: 540 }}>
                  The municipal portal works. Eventually. Probably. Here's the difference in numbers.
                </p>
              </div>

              {/* Comparison Table */}
              <div style={{
                background: '#FFFCF8',
                borderRadius: 18,
                overflowX: 'auto',
                boxShadow: '0px 4px 20px rgba(44, 26, 14, 0.08)',
                outline: '1px solid rgba(44, 26, 14, 0.10)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 24px', borderBottom: '1px solid rgba(44, 26, 14, 0.10)', color: '#A68660', fontSize: 13, fontWeight: 500, textTransform: 'uppercase' }}>What you get</th>
                      <th style={{ 
                        textAlign: 'center', 
                        padding: '8px 12px 8px 8px',
                        borderBottom: '1px solid rgba(44, 26, 14, 0.10)', 
                        color: '#A68660', 
                        fontSize: 13, 
                        fontWeight: 500, 
                        textTransform: 'uppercase',
                        lineHeight: 1
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: 6,
                          margin: 0
                        }}>
                          <img 
                            src="/images/tailio.png"
                            alt="Tailio" 
                            style={{ 
                              width: 130, 
                              height: 130,
                              display: 'block',
                              flexShrink: 0
                            }} 
                          />
                        </div>
                      </th>
                      <th style={{ textAlign: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(44, 26, 14, 0.10)', color: '#A68660', fontSize: 13, fontWeight: 500, textTransform: 'uppercase' }}>Municipal Portal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Time to register", sub: "From start to submission", tailio: "Under 1 minute", portal: "2–4 weeks" },
                      { label: "Works on your phone", sub: "No opening laptops for filing the form", tailio: "✓", portal: "✗" },
                      { label: "Digital certificate", sub: "Always accessible on profile", tailio: "✓", portal: "✗" },
                      { label: "Renewal reminders", sub: "WhatsApp, SMS & email", tailio: "✓", portal: "✗" },
                      { label: "Vaccination tracker", sub: "Schedule, record, share with vets", tailio: "✓", portal: "✗" },
                      { label: "Legal pet profile", sub: "Proof of ownership on record", tailio: "✓", portal: "✗" },
                      { label: "Registration cost", sub: "No surprises", tailio: "₹299", portal: "₹100–500 + effort" },
                      { label: "If you wait, the fine is…", sub: "Municipal enforcement active now", tailio: "None", portal: "₹10,000+" }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < 7 ? '1px solid rgba(44, 26, 14, 0.10)' : 'none' }}>
                        <td style={{ padding: '18px 24px' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: '#2C1A0E', fontSize: '13.5px' }}>{row.label}</div>
                            <div style={{ color: '#A68660', fontSize: 11 }}>{row.sub}</div>
                          </div>
                        </td>
                        <td style={{
                          padding: '18px 24px',
                          textAlign: 'center',
                          background: idx % 2 === 0 ? 'rgba(232, 96, 10, 0.04)' : 'transparent',
                          fontWeight: 700,
                          color: '#2C1A0E'
                        }}>
                          {row.tailio === '✓' ? (
                            <div style={{ width: 28, height: 28, background: '#2C1A0E', borderRadius: 14, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                                <path d="M1.5 5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                          ) : row.tailio}
                        </td>
                        <td style={{
                          padding: '18px 24px',
                          textAlign: 'center',
                          color: row.portal === '₹10,000+' ? '#C04E06' : '#A68660',
                          fontWeight: row.portal === '₹10,000+' ? 700 : 400,
                          fontStyle: row.portal === '₹10,000+' ? 'italic' : 'normal'
                        }}>
                          {row.portal === '✗' ? (
                            <div style={{ width: 28, height: 28, border: '1px solid rgba(44, 26, 14, 0.18)', borderRadius: 14, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M1 1L10 10M10 1L1 10" stroke="#A68660" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          ) : row.portal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          

          {/* Final CTA Section */}
          <div style={{
            width: '100%',
            background: 'linear-gradient(176deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)',
            padding: getResponsivePadding(),
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 24
              }}>
                <img 
                  src='/images/paw-2.png' 
                  alt="Paw print icon" 
                  style={{ width: 90, height: 90, objectFit: 'contain' }}
                />
              </div>
              <h2 style={{ color: 'white', fontSize: isMobile ? '36px' : '58px', fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '62.64px', marginBottom: 20 }}>
                Upload-Free,<br />Delay-Free,<br />Always.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: 16, fontFamily: 'DM Sans', maxWidth: 520, margin: '0 auto 30px', lineHeight: '26.40px' }}>
                Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad & Gurugram who are already compliant.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <button 
                  onClick={handleOpenRegisterModal}
                  style={{
                    padding: '18px 32px',
                    background: 'white',
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
                    outline: '2px solid rgba(255, 255, 255, 0.30)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F5E6D0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  aria-label="Register your pet now"
                >
                  <span style={{ color: '#C04E06', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 700 }}>Register Your Pet — ₹299 →</span>
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '18px 28px',
                    background: 'transparent',
                    borderRadius: 9,
                    border: '1px solid rgba(255, 255, 255, 0.40)',
                    cursor: 'pointer'
                  }}
                  aria-label="Scroll to how it works"
                >
                  <span style={{ color: 'white', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 500 }}>See how it works</span>
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>

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
    </>
  );
}






// {/* Pricing Section - CHANGED: Processed → Filed */}
//           <div style={{ width: '100%', background: '#2B1F14', padding: getResponsivePadding() }}>
//             <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
//               <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(212, 82, 26, 0.22)', borderRadius: 100, marginBottom: 24 }}>
//                 <span style={{ color: '#F4A56A', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.20px' }}>One Price. Everything Included.</span>
//               </div>
//               <h2 style={{ color: '#F5F0E8', fontSize: getSubheadingFontSize(), fontFamily: 'Fraunces', fontWeight: 900, lineHeight: '63px', marginBottom: 20 }}>
//                 Done.<br />
//                 <span style={{ color: '#D4521A', fontStyle: 'italic' }}>You're at the end of the path.</span>
//               </h2>
//               <p style={{ color: 'rgba(245, 240, 232, 0.42)', fontSize: 16, fontFamily: 'DM Sans', maxWidth: 460, margin: '0 auto 40px', lineHeight: '27.20px' }}>
//                 Sixty seconds from here to legally issued. Your certificate is filed within 24–72 hours — valid PAN India.
//               </p>

//               {/* Centered Pricing Box */}
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '100%'
//               }}>
//                 <div style={{
//                   background: 'rgba(255, 255, 255, 0.04)',
//                   borderRadius: 24,
//                   padding: '50px 46px 40px',
//                   outline: '1px solid rgba(212, 82, 26, 0.28)',
//                   position: 'relative',
//                   maxWidth: 520,
//                   width: '100%'
//                 }}>
//                   <div style={{ position: 'absolute', top: -1, left: -1, right: -1, bottom: -1, borderRadius: 23, pointerEvents: 'none' }} />
                  
//                   {/* Badge row - centered */}
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
//                     <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 5, paddingBottom: 5, borderRadius: 999, outline: '1px solid rgba(255,255,255,0.25)', outlineOffset: -1 }}>
//                       <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 10, fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.20px' }}>All Inclusive</span>
//                     </div>
//                     <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: '#E8C832', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6 }}>
//                       <div style={{ width: 6, height: 6, background: '#1A0A00', borderRadius: 3 }} />
//                       <span style={{ color: '#1A0A00', fontSize: 10, fontFamily: 'Inter', fontWeight: 700, letterSpacing: '0.60px' }}>LAUNCH OFFER — SAVE ₹300</span>
//                     </div>
//                   </div>
                  
//                   {/* Price Section - centered */}
//                   <div style={{ marginBottom: 20, textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
//                       <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 28, fontFamily: 'Inter', fontWeight: 700, paddingBottom: 14 }}>₹</span>
//                       <span style={{ color: 'white', fontSize: 88, fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '1' }}>299</span>
//                       <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 60, fontFamily: 'Playfair Display', fontWeight: 900, lineHeight: '1', paddingBottom: 6 }}>/—</span>
//                     </div>
//                     <div style={{ marginTop: 8 }}>
//                       <span style={{ color: '#E07B20', fontSize: 13, fontFamily: 'Inter', fontWeight: 600 }}>+ Municipal fees (as applicable)</span>
//                     </div>
//                     <div style={{ marginTop: 4 }}>
//                       <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, fontFamily: 'Inter', textDecoration: 'line-through' }}>Regular price ₹599</span>
//                     </div>
//                     <div>
//                       <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, fontFamily: 'Inter' }}>Applicable GST will be added as per government regulations</span>
//                     </div>
//                     <div style={{ marginTop: 4 }}>
//                       <span style={{ color: '#E07B20', fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }}>Per pet · Valid for 1 financial year</span>
//                     </div>
//                   </div>
                  
//                   {/* Checklist - left aligned for readability - CHANGED: Processed → Filed */}
//                   <div style={{ marginTop: 24, marginBottom: 32, textAlign: 'left' }}>
//                     {[
//                       'Register in under 1 minute, from your phone',
//                       'Legally secured Govt issued certificate',
//                       'Vaccination tracker — schedule, record, share with any vet',
//                       'Filed in 24–72 hours'
//                     ].map((text, idx) => (
//                       <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
//                         <img src="/images/correct.png" alt="check mark" style={{ width: 18, height: 18, marginTop: 2 }} />
//                         <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'Inter', lineHeight: '18.20px' }}>{text}</span>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* CTA Button */}
//                   <button 
//                     onClick={handleOpenRegisterModal}
//                     style={{ 
//                       width: '100%', 
//                       background: '#D4521A',
//                       boxShadow: '0px 6px 0px #A83E10',
//                       border: 'none', 
//                       borderRadius: 100, 
//                       padding: '18px 20px', 
//                       color: 'white', 
//                       fontSize: 17, 
//                       fontFamily: 'DM Sans', 
//                       fontWeight: 700, 
//                       cursor: 'pointer',
//                       marginBottom: 20,
//                       transition: 'all 0.2s ease'
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = '#C06A18'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = '#D4521A'}
//                     aria-label="Register your pet now"
//                   >
//                     Register Your Pet — ₹299 →
//                   </button>
                  
//                   {/* Footer badges - CHANGED: approval → filing */}
//                   <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
//                     {['Secure payment', 'Legally valid', '24–72 hr filing'].map((text) => (
//                       <span key={text} style={{ color: 'rgba(255,255,255,0.30)', fontSize: 12, fontFamily: 'DM Sans' }}>{text}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>