"use client";
import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Head from "next/head";
import Link from "next/link";

export default function TermsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getResponsivePadding = () => {
    if (isMobile) return '40px 20px';
    return '60px 40px';
  };

  const getHeadingFontSize = () => {
    if (isMobile) return '32px';
    return '48px';
  };

  const getContainerMaxWidth = () => {
    if (isMobile) return '100%';
    return '820px';
  };

  return (
    <>
      <Head>
        <title>Terms and Conditions | Tailio Pet Registration</title>
        <meta 
          name="description" 
          content="Terms and Conditions for Tailio pet registration platform. Learn about our terms, user agreement, and pet registration policies." 
        />
        <link rel="canonical" href="https://tailio.com/terms" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tailio.com/terms" />
        <meta property="og:title" content="Terms and Conditions | Tailio Pet Registration" />
        <meta property="og:description" content="Terms and Conditions for Tailio pet registration platform." />
        <meta property="og:site_name" content="Tailio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms and Conditions | Tailio Pet Registration" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms and Conditions",
              "description": "Terms and Conditions for Tailio pet registration platform",
              "url": "https://tailio.com/terms",
              "about": {
                "@type": "Thing",
                "name": "Legal Terms and Conditions"
              }
            })
          }}
        />
      </Head>

      <div style={{ width: '100%', background: '#FAF6EF', minHeight: '100vh' }}>
        <div style={{
          width: '100%',
          background: '#F5F0E8',
          overflow: 'hidden',
          outline: '1px solid rgba(0,0,0,0.20)',
          outlineOffset: -1
        }}>

          {/* Hero Section - Centered */}
          <div style={{ width: '100%', padding: getResponsivePadding(), background: '#F5F0E8' }}>
            <div style={{ 
              maxWidth: getContainerMaxWidth(), 
              margin: '0 auto',
              textAlign: isMobile ? 'left' : 'center'
            }}>
              <div style={{ 
                paddingBottom: 24,
                display: 'flex',
                justifyContent: isMobile ? 'flex-start' : 'center'
              }}>
                <div style={{
                  padding: '6px 16px',
                  background: 'rgba(212, 82, 26, 0.10)',
                  borderRadius: 100,
                  display: 'inline-flex'
                }}>
                  <span style={{ color: '#D4521A', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                    Legal
                  </span>
                </div>
              </div>

              <div>
                <h1 style={{
                  color: '#2B1F14',
                  fontSize: getHeadingFontSize(),
                  fontFamily: 'Fraunces',
                  fontWeight: 900,
                  lineHeight: isMobile ? '1.2' : '1.1',
                  wordWrap: 'break-word',
                  marginBottom: 16
                }}>
                  Terms and Conditions
                </h1>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? 4 : 16,
                  flexWrap: 'wrap'
                }}>
                  <p style={{
                    color: '#7A6858',
                    fontSize: 16,
                    fontFamily: 'DM Sans',
                    lineHeight: '27px'
                  }}>
                    Last updated: <strong>July 29, 2026</strong>
                  </p>
                  <span style={{ 
                    color: '#7A6858', 
                    fontSize: 16,
                    display: isMobile ? 'none' : 'inline' 
                  }}>•</span>
                  <p style={{
                    color: '#7A6858',
                    fontSize: 16,
                    fontFamily: 'DM Sans',
                    lineHeight: '27px'
                  }}>
                    By using Tailio, you agree to these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Content - Improved Layout */}
          <div style={{ width: '100%', padding: getResponsivePadding(), background: '#FFFCF8' }}>
            <div style={{ 
              maxWidth: getContainerMaxWidth(), 
              margin: '0 auto',
              padding: isMobile ? '0' : '0 20px'
            }}>

              {/* Introduction - Better spacing */}
              <div style={{ 
                marginBottom: 48,
                padding: isMobile ? '0' : '0 20px'
              }}>
                <p style={{ 
                  color: '#3D2A1A', 
                  fontSize: isMobile ? 15 : 16, 
                  fontFamily: 'DM Sans', 
                  lineHeight: '28px',
                  marginBottom: 16
                }}>
                  Welcome to <strong>Tailio</strong> ("we," "us," "our"), a pet registration platform operated by 
                  Tailio Technologies. These Terms and Conditions ("Terms") govern your use of our website, 
                  mobile application, and services (collectively, the "Platform").
                </p>
                <div style={{
                  background: '#F5F0E8',
                  borderRadius: 12,
                  padding: '16px 20px',
                  borderLeft: '4px solid #D4521A'
                }}>
                  <p style={{ 
                    color: '#2B1F14', 
                    fontSize: isMobile ? 14 : 15, 
                    fontFamily: 'DM Sans', 
                    lineHeight: '24px', 
                    margin: 0 
                  }}>
                    <strong>📌 Quick Summary:</strong> By accessing or using the Platform, you agree to be bound by these Terms. 
                    If you do not agree, please do not use the Platform.
                  </p>
                </div>
              </div>

              {/* Section Container - Consistent styling */}
              <div style={{ padding: isMobile ? '0' : '0 20px' }}>
                {[
                  {
                    id: 1,
                    title: "Definitions",
                    items: [
                      { term: '"User" / "You" / "Your"', desc: "Any person who accesses or uses the Platform." },
                      { term: '"Pet Owner"', desc: "A User who registers a pet through the Platform." },
                      { term: '"Registration"', desc: "The submission of pet and owner information to Tailio for the purpose of filing with a municipal authority." },
                      { term: '"Municipal Authority"', desc: "The local government body responsible for pet registration (e.g., MCD, Noida Authority, GMC, etc.)." }
                    ]
                  },
                  {
                    id: 2,
                    title: "Eligibility and Account",
                    items: [
                      { term: null, desc: "You must be at least <strong>18 years old</strong> to use the Platform." },
                      { term: null, desc: "You represent that you are the legal owner of the pet(s) you register, or you have explicit authorization from the owner." },
                      { term: null, desc: "You are responsible for maintaining the confidentiality of your account credentials." },
                      { term: null, desc: "You will notify us immediately of any unauthorized use of your account." }
                    ]
                  },
                  {
                    id: 3,
                    title: "Services Provided",
                    items: [
                      { term: null, desc: "Register their pets with the appropriate municipal authority." },
                      { term: null, desc: "Upload and store required documents (vaccination certificates, ID proofs, etc.)." },
                      { term: null, desc: "Receive reminders for vaccination renewals and other compliance requirements." },
                      { term: null, desc: "Access their pet's registration certificate and legal pet profile." }
                    ],
                    hasNote: true
                  },
                  {
                    id: 4,
                    title: "User Responsibilities",
                    items: [
                      { term: null, desc: "Provide <strong>accurate, complete, and current information</strong> during registration." },
                      { term: null, desc: "Ensure that all uploaded documents are <strong>genuine and valid</strong>." },
                      { term: null, desc: "Keep your pet's <strong>vaccination records up-to-date</strong>." },
                      { term: null, desc: "<strong>Not misuse the Platform</strong> for any unlawful or unauthorized purpose." }
                    ]
                  },
                  {
                    id: 5,
                    title: "Payment and Fees",
                    items: [
                      { term: null, desc: "Registration fees are <strong>clearly displayed</strong> on the Platform before payment." },
                      { term: null, desc: "All payments are processed through <strong>secure third-party payment gateways</strong>." },
                      { term: null, desc: "Fees are <strong>non-refundable</strong> once the registration has been filed with the municipal authority." },
                      { term: null, desc: "<strong>GST and municipal fees</strong> are not included in the platform fee unless explicitly stated." }
                    ]
                  },
                  {
                    id: 6,
                    title: "Intellectual Property",
                    items: [
                      { term: null, desc: "All content on the Platform, including text, graphics, logos, and software, is the <strong>property of Tailio</strong>." },
                      { term: null, desc: "You may <strong>not reproduce, distribute, or create derivative works</strong> from our content without explicit permission." },
                      { term: null, desc: "The Tailio name, logo, and brand elements are <strong>trademarks</strong> of Tailio Technologies." }
                    ]
                  },
                  {
                    id: 7,
                    title: "Privacy and Data Protection",
                    items: [
                      { term: null, desc: 'Your use of the Platform is governed by our <Link href="/privacy" style={{ color: "#E8600A", textDecoration: "none" }}>Privacy Policy</Link>.' },
                      { term: null, desc: "We collect and process personal data in accordance with applicable data protection laws." },
                      { term: null, desc: "You have the right to <strong>access, modify, or delete</strong> your personal data as described in our Privacy Policy." }
                    ]
                  },
                  {
                    id: 8,
                    title: "Disclaimer of Warranties",
                    items: [
                      { term: null, desc: "We do not warrant that the Platform will be <strong>uninterrupted, secure, or error-free</strong>." },
                      { term: null, desc: "We are not responsible for <strong>delays or rejections</strong> caused by municipal authorities." },
                      { term: null, desc: "We do not guarantee that <strong>registration will be approved</strong> by the municipal authority." }
                    ],
                    isWarning: true
                  },
                  {
                    id: 9,
                    title: "Limitation of Liability",
                    items: [
                      { term: null, desc: "Tailio's liability is limited to the <strong>total fees paid by you</strong> for the specific registration." },
                      { term: null, desc: "We are <strong>not liable for indirect, incidental, or consequential damages</strong>." },
                      { term: null, desc: "We are <strong>not responsible</strong> for fines, penalties, or legal consequences resulting from your failure to comply with local pet registration laws." }
                    ]
                  },
                  {
                    id: 10,
                    title: "Termination",
                    items: [
                      { term: null, desc: "We reserve the right to <strong>suspend or terminate</strong> your account at any time, with or without notice." },
                      { term: null, desc: "Termination may occur if you <strong>violate these Terms</strong> or engage in fraudulent activity." },
                      { term: null, desc: "Upon termination, your right to use the Platform <strong>immediately ceases</strong>." }
                    ]
                  },
                  {
                    id: 11,
                    title: "Governing Law",
                    items: [
                      { term: null, desc: "These Terms are governed by the laws of <strong>India</strong>." },
                      { term: null, desc: "Any disputes shall be subject to the <strong>exclusive jurisdiction</strong> of the courts in Delhi, India." },
                      { term: null, desc: "If any provision of these Terms is found to be unenforceable, the remaining provisions shall <strong>remain in full force and effect</strong>." }
                    ]
                  },
                  {
                    id: 12,
                    title: "Changes to Terms",
                    items: [
                      { term: null, desc: "We may <strong>update these Terms</strong> from time to time." },
                      { term: null, desc: "We will notify you of significant changes by <strong>email or through the Platform</strong>." },
                      { term: null, desc: "Your continued use of the Platform after changes constitutes <strong>acceptance of the updated Terms</strong>." }
                    ]
                  }
                ].map((section) => (
                  <div key={section.id} style={{ marginBottom: 40 }}>
                    <h2 style={{
                      color: '#2B1F14',
                      fontSize: isMobile ? 20 : 24,
                      fontFamily: 'Fraunces',
                      fontWeight: 700,
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: '2px solid #F5F0E8'
                    }}>
                      {section.id}. {section.title}
                    </h2>

                    {section.hasNote && (
                      <div style={{
                        background: '#FFF4E4',
                        borderLeft: '4px solid #D4521A',
                        padding: '14px 18px',
                        borderRadius: 8,
                        marginBottom: 16
                      }}>
                        <p style={{ color: '#B85C00', fontSize: isMobile ? 13 : 14, fontFamily: 'DM Sans', lineHeight: '24px', margin: 0 }}>
                          <strong>📌 Important:</strong> Tailio helps you file with the appropriate municipal authority, 
                          but it is your responsibility to understand and comply with local pet registration laws. 
                          Registration requirements vary by city and municipality.
                        </p>
                      </div>
                    )}

                    {section.isWarning && (
                      <div style={{
                        background: '#FDECEA',
                        borderLeft: '4px solid #A0251E',
                        padding: '14px 18px',
                        borderRadius: 8,
                        marginBottom: 16
                      }}>
                        <p style={{ color: '#A0251E', fontSize: isMobile ? 13 : 14, fontFamily: 'DM Sans', lineHeight: '24px', margin: 0 }}>
                          <strong>⚠️ Disclaimer:</strong> The Platform is provided on an <strong>"as is" and "as available"</strong> basis. 
                          To the fullest extent permitted by law, we make no warranties.
                        </p>
                      </div>
                    )}

                    <ul style={{ 
                      paddingLeft: isMobile ? 20 : 24, 
                      marginBottom: 0,
                      listStyle: 'none'
                    }}>
                      {section.items.map((item, index) => (
                        <li key={index} style={{
                          color: '#3D2A1A',
                          fontSize: isMobile ? 14 : 15,
                          fontFamily: 'DM Sans',
                          lineHeight: '26px',
                          marginBottom: 10,
                          paddingLeft: 8,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12
                        }}>
                          <span style={{
                            color: '#D4521A',
                            fontSize: isMobile ? 16 : 18,
                            lineHeight: '26px',
                            flexShrink: 0,
                            marginTop: 2
                          }}>•</span>
                          <span dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}