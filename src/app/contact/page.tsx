'use client';

import { useState } from 'react';
import Footer from '../component/Footer';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    petRegistrationId: '',
    message: '',
    subject: '',
  });
  const [selectedSubject, setSelectedSubject] = useState('Certificate issue');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Add resize handler
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const getResponsiveFontSize = (desktop: number, tablet: number, mobile: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const subjects = [
    'Certificate issue',
    'Documents upload',
    'Payment query',
    'Vaccination tracker',
    'Something else',
  ];

  const faqs = [
    { question: 'Is pet registration really mandatory in Delhi NCR?', answer: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCD/MCG to enforce mandatory pet registration across Delhi NCR. Registration is mandatory by law.' },
    { question: 'Is Tailio\'s registration legally valid?', answer: 'Yes, Tailio is authorized to submit registrations directly to MCD/MCG. Your certificate is officially recognized and legally valid across all zones.' },
    { question: 'How long does the certificate take to arrive?', answer: 'Your official digital certificate is delivered within 24–72 hours after submission. No office visit required.' },
    { question: 'What documents do I need?', answer: 'You need four documents: Anti-Rabies Certificate, Applicant ID Proof (Aadhaar/PAN/Passport), Address Proof, and a recent photo with your pet.' },
    { question: 'Can I register cats or other pets — not just dogs?', answer: 'Currently, we support pet dogs. Support for cats and other pets is coming soon.' },
    { question: 'What happens if I don\'t register?', answer: 'Non-compliance can result in fines starting at ₹500+, pet seizure, and legal consequences. Fines escalate with each enforcement drive.' },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setFormData({
      ...formData,
      subject: subject,
    });
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "1920px",
      margin: "0 auto",
      position: "relative",
      background: "linear-gradient(0deg, #FAF6EF 0%, #FAF6EF 100%), white",
      fontFamily: F.dmSans,
      overflowX: "hidden",
    }}>
      
      {/* Hero Section */}
      <div style={{
        width: "100%",
        padding: "72px 40px 80px",
        background: "#2C1A0E",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative paw prints */}
        <div style={{ position: "absolute", left: 76.8, top: 37.69, opacity: 0.05 }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <path d="M21.6 54L46.8 32.4L3.93 42.34L64.08 34.34L16.89 25.07L55.39 21.95" stroke="#FF8C3A" strokeWidth="2"/>
          </svg>
        </div>
        
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 13.3 }}>
            <span style={{ color: "#FF8C3A", fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase" }}>Get in Touch</span>
          </div>
          <div style={{ marginBottom: 17.4 }}>
            <h1 style={{ margin: 0, fontSize: getResponsiveFontSize(76, 56, 36), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.02, color: "#FFFCF8" }}>
              We're here.<br />
              <span style={{ color: "#FF8C3A", fontStyle: "italic" }}>Always.</span>
            </h1>
          </div>
          <div style={{ maxWidth: 460, marginBottom: 17.4 }}>
            <p style={{ color: "rgba(255, 252, 248, 0.55)", fontSize: 16, lineHeight: 1.7 }}>
              Got a question about registration, your certificate, or anything pet-related? Our support team responds within 60 minutes.
            </p>
          </div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: "rgba(232, 96, 10, 0.14)",
            borderRadius: 100,
            outline: "1px solid rgba(232, 96, 10, 0.30)",
            outlineOffset: -1,
          }}>
            <div style={{ width: 7, height: 7, background: "#FF8C3A", borderRadius: 3.5 }} />
            <span style={{ color: "#FF8C3A", fontSize: 12.5, fontWeight: 500, letterSpacing: 0.5 }}>Support responds in under 60 minutes</span>
          </div>
        </div>
      </div>

      {/* Main Content - Form and Contact Info */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "72px 40px",
        display: "flex",
        flexWrap: "wrap",
        gap: 60,
        justifyContent: "center",
      }}>
        
        {/* Contact Form */}
        <div style={{
          flex: 1,
          minWidth: 400,
          background: "#FFFCF8",
          borderRadius: 24,
          outline: "1px solid rgba(44, 26, 14, 0.18)",
          outlineOffset: -1,
          boxShadow: "0px 12px 48px rgba(44, 26, 14, 0.12)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            width: "100%",
            height: 4,
            background: "linear-gradient(90deg, #C04E06 0%, #FF8C3A 100%)",
          }} />
          
          <div style={{ padding: 40 }}>
            <h2 style={{ fontSize: 28, fontFamily: F.fraunces, fontWeight: 700, color: "#2C1A0E", marginBottom: 4 }}>Send us a message</h2>
            <p style={{ fontSize: 14, color: "#7A5C40", marginBottom: 26 }}>We'll get back to you within 60 minutes during support hours.</p>

            {/* Subject Tags */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 10, display: "block" }}>What's this about?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectClick(subject)}
                    style={{
                      padding: "7px 14px",
                      background: selectedSubject === subject ? "#FFF0E4" : "transparent",
                      borderRadius: 100,
                      outline: selectedSubject === subject ? "1px solid #E8600A" : "1px solid rgba(44, 26, 14, 0.18)",
                      outlineOffset: -1,
                      border: "none",
                      cursor: "pointer",
                      color: selectedSubject === subject ? "#C04E06" : "#7A5C40",
                      fontSize: 13,
                      fontWeight: selectedSubject === subject ? 600 : 500,
                      fontFamily: F.dmSans,
                    }}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Fields */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>
                  First name <span style={{ color: "#E8600A" }}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Priya"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#FAF6EF",
                    borderRadius: 9,
                    outline: "1px solid rgba(44, 26, 14, 0.18)",
                    outlineOffset: -1,
                    border: "none",
                    fontSize: 14,
                    fontFamily: F.dmSans,
                    color: "#2C1A0E",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>
                  Last name <span style={{ color: "#E8600A" }}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Sharma"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#FAF6EF",
                    borderRadius: 9,
                    outline: "1px solid rgba(44, 26, 14, 0.18)",
                    outlineOffset: -1,
                    border: "none",
                    fontSize: 14,
                    fontFamily: F.dmSans,
                    color: "#2C1A0E",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>
                Email address <span style={{ color: "#E8600A" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "#FAF6EF",
                  borderRadius: 9,
                  outline: "1px solid rgba(44, 26, 14, 0.18)",
                  outlineOffset: -1,
                  border: "none",
                  fontSize: 14,
                  fontFamily: F.dmSans,
                  color: "#2C1A0E",
                }}
              />
            </div>

            {/* Phone and City */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#FAF6EF",
                    borderRadius: 9,
                    outline: "1px solid rgba(44, 26, 14, 0.18)",
                    outlineOffset: -1,
                    border: "none",
                    fontSize: 14,
                    fontFamily: F.dmSans,
                    color: "#2C1A0E",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>Your city</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#FAF6EF",
                    borderRadius: 9,
                    outline: "1px solid rgba(44, 26, 14, 0.18)",
                    outlineOffset: -1,
                    border: "none",
                    fontSize: 14,
                    fontFamily: F.dmSans,
                    color: "#2C1A0E",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select city</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                </select>
              </div>
            </div>

            {/* Pet Registration ID */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>
                Pet's registration ID <span style={{ fontSize: 11, fontWeight: 400, color: "#A68660" }}>(optional, if already registered)</span>
              </label>
              <input
                type="text"
                name="petRegistrationId"
                value={formData.petRegistrationId}
                onChange={handleInputChange}
                placeholder="TL-DL-2025-XXXXX"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "#FAF6EF",
                  borderRadius: 9,
                  outline: "1px solid rgba(44, 26, 14, 0.18)",
                  outlineOffset: -1,
                  border: "none",
                  fontSize: 14,
                  fontFamily: F.dmSans,
                  color: "#2C1A0E",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.81, color: "#7A5C40", marginBottom: 6, display: "block" }}>
                Your message <span style={{ color: "#E8600A" }}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us what's on your mind — the more detail, the faster we can help."
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  background: "#FAF6EF",
                  borderRadius: 9,
                  outline: "1px solid rgba(44, 26, 14, 0.18)",
                  outlineOffset: -1,
                  border: "none",
                  fontSize: 14,
                  fontFamily: F.dmSans,
                  color: "#2C1A0E",
                  resize: "vertical",
                }}
              />
              <div style={{ textAlign: "right", marginTop: 4 }}>
                <span style={{ fontSize: 11, color: "#A68660", fontFamily: F.dmMono }}>{formData.message.length} / 600</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              style={{
                width: "100%",
                padding: "15px",
                background: "#E8600A",
                boxShadow: "0px 8px 24px rgba(232, 96, 10, 0.25), 0px 4px 0px #C04E06",
                borderRadius: 13,
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: 15.5,
                fontWeight: 700,
                fontFamily: F.dmSans,
                marginBottom: 6,
              }}
            >
              Send message →
            </button>

            {/* Security Note */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 5.5L3 7L7.5 2.5" stroke="#A68660" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 12, color: "#A68660" }}>Your data is secure and never shared with third parties.</span>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div style={{ width: 420 }}>
          {/* WhatsApp Card */}
          <div style={{
            padding: 24,
            background: "#FFFCF8",
            borderRadius: 18,
            outline: "1px solid rgba(44, 26, 14, 0.10)",
            outlineOffset: -1,
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
              <div style={{
                width: 42,
                height: 42,
                background: "#FFF0E4",
                borderRadius: 9,
                outline: "1px solid rgba(232, 96, 10, 0.18)",
                outlineOffset: -1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}>💬</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.1, color: "#A68660" }}>Fastest response</div>
                <div style={{ fontSize: 18, fontFamily: F.fraunces, fontWeight: 700, color: "#2C1A0E" }}>WhatsApp Support</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: "#7A5C40", lineHeight: 1.65, marginBottom: 11 }}>
              Chat with us on WhatsApp for the quickest response. We typically reply within minutes.
            </p>
            <a href="#" style={{ color: "#E8600A", fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
              Open WhatsApp →
            </a>
          </div>

          {/* Email Card */}
          <div style={{
            padding: 24,
            background: "#FFFCF8",
            borderRadius: 18,
            outline: "1px solid rgba(44, 26, 14, 0.10)",
            outlineOffset: -1,
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
              <div style={{
                width: 42,
                height: 42,
                background: "#FFF0E4",
                borderRadius: 9,
                outline: "1px solid rgba(232, 96, 10, 0.18)",
                outlineOffset: -1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}>✉️</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.1, color: "#A68660" }}>Email us</div>
                <div style={{ fontSize: 18, fontFamily: F.fraunces, fontWeight: 700, color: "#2C1A0E" }}>info@tailio.in</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: "#7A5C40", lineHeight: 1.65, marginBottom: 11 }}>
              For certificate queries, billing questions, or anything that needs a paper trail.
            </p>
            <a href="mailto:info@tailio.in" style={{ color: "#E8600A", fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
              Send an email →
            </a>
          </div>

          {/* Company Info Card */}
          <div style={{
            padding: 24,
            background: "#2C1A0E",
            borderRadius: 18,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: 10, fontWeight: 400, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255, 252, 248, 0.35)", marginBottom: 4 }}>Parent Company</div>
            <div style={{ fontSize: 20, fontFamily: F.fraunces, fontWeight: 700, color: "#FFFCF8", marginBottom: 4 }}>Truzo Infotech Pvt. Ltd.</div>
            <div style={{ fontSize: 12, color: "rgba(255, 252, 248, 0.40)", letterSpacing: 0.72, marginBottom: 10 }}>CIN · U62010HR2026PTC144118</div>
            <div style={{ height: 1, background: "rgba(255, 255, 255, 0.08)", marginBottom: 9 }} />
            <p style={{ fontSize: 13, color: "rgba(255, 252, 248, 0.52)", lineHeight: 1.65, marginBottom: 7 }}>
              Tailio is a product of Truzo Infotech Private Limited, a Delhi based tech company building digital-first civic compliance tools for Indian pet owners and urban households.
            </p>
            <p style={{ fontSize: 12.5, color: "rgba(255, 252, 248, 0.38)", lineHeight: 1.7, letterSpacing: 0.25, marginBottom: 6 }}>
              Registered Office - 412, Emaar Colonnade, Sector-66, Golf Course Extension Road, Gurgaon- 122101, Haryana.
            </p>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 4,
              outline: "1px solid rgba(255, 255, 255, 0.08)",
              outlineOffset: -1,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1.25" y="1.25" width="7.5" height="7.5" stroke="rgba(255, 252, 248, 0.28)" strokeWidth="0.83"/>
              </svg>
              <span style={{ fontSize: 10, color: "rgba(255, 252, 248, 0.28)", letterSpacing: 0.6 }}>Legal entity · incorporated in India</span>
            </div>

            {/* Decorative paw print */}
            <div style={{
              position: "absolute",
              right: -30,
              bottom: -30,
              width: 130,
              height: 130,
              opacity: 0.06,
              pointerEvents: "none",
            }}>
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
                <path d="M31.2 78L67.6 46.8L5.67 61.16L92.57 49.6L24.39 36.22L80 31.7" stroke="#FF8C3A" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        width: "100%",
        background: "#F3EDE0",
        padding: "80px 40px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", paddingLeft: 52, paddingRight: 52 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: "#FF8C3A", fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase" }}>Common questions</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: getResponsiveFontSize(48, 40, 28), fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.06 }}>
              Quick answers <span style={{ color: "#E8600A", fontStyle: "italic" }}>first.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 480, marginBottom: 36 }}>
            <p style={{ fontSize: 15, color: "#7A5C40", lineHeight: 1.5 }}>If it's not here, our support team responds within 60 minutes.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFCF8",
                  borderRadius: 18,
                  outline: "1px solid rgba(44, 26, 14, 0.10)",
                  outlineOffset: -1,
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={() => toggleFaq(idx)}
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: "#2C1A0E", fontFamily: F.dmSans }}>
                    {faq.question}
                  </span>
                  <div style={{
                    width: 22,
                    height: 22,
                    background: "#EBE1CE",
                    borderRadius: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.2s ease",
                    transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="#7A5C40" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                {openFaq === idx && (
                  <div style={{
                    padding: "0 24px 20px 24px",
                    borderTop: "1px solid rgba(44, 26, 14, 0.10)",
                  }}>
                    <p style={{ fontSize: 14, color: "#7A5C40", lineHeight: 1.6, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}