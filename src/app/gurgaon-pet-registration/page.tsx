'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../component/Footer';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

export default function GurugramLanding() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const getResponsiveFontSize = (desktop: number, tablet: number, mobile: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const faqs = [
    {
      question: "Is pet registration really mandatory in Gurugram?",
      answer: "Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCG (Municipal Corporation of Gurugram) to enforce mandatory pet registration across Gurugram. The Supreme Court's August 2025 order applies to Gurugram. MCG is preparing its enforcement framework. Registration is mandatory now — fines are expected to be among the highest in NCR once announced."
    },
    {
      question: "Is Tailio's registration legally valid in Gurugram?",
      answer: "Yes, Tailio is authorized to submit registrations directly to MCG (Municipal Corporation of Gurugram). Your certificate is officially recognized and legally valid across all zones of Gurugram."
    },
    {
      question: "What is the fine for not registering in Gurugram?",
      answer: "MCG fine announcement is expected soon. Register now before enforcement — fines are expected to be among the highest in NCR once announced."
    },
    {
      question: "What documents do I need to register?",
      answer: "You need four documents: Anti-Rabies Certificate, Applicant ID Proof (Aadhaar/PAN/Passport), Address Proof (Aadhaar/electricity bill/rental agreement), and a recent photo with your pet."
    },
    {
      question: "How much does registration cost on Tailio?",
      answer: "Registration costs ₹999 for a limited time (regular price ₹1,999). This is a one-time, all-inclusive fee with no hidden charges."
    },
    {
      question: "How long does it take to get the certificate?",
      answer: "Your official digital certificate is delivered within 24–72 hours after submission. No office visit required."
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
        paddingTop: 100,
        paddingBottom: 258,
        paddingLeft: 52,
        paddingRight: 52,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}>
        {/* Decorative paw prints */}
        <div style={{ position: "absolute", left: 30, top: 96, opacity: 0.06, pointerEvents: "none" }}>
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
            <path d="M25.13 34.83L30.73 27.74L16.37 32.44L40.64 24.56L20.48 23.28L34.27 18.82" stroke="#E8600A" strokeWidth="2"/>
          </svg>
        </div>

        <div style={{ textAlign: "center", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 26,
          }}>
            <div style={{ width: 7, height: 7, background: "#E8600A", borderRadius: 3.5 }} />
            <span style={{ fontSize: 12.5, fontFamily: F.dmSans, fontWeight: 500, color: "#C04E06" }}>MCG · Gurugram · Registration Live</span>
          </div>

          <h1 style={{ margin: 0, fontSize: getResponsiveFontSize(84, 64, 40), fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: 1.2 }}>
            Pet registration
          </h1>
          <h1 style={{ margin: 0, fontSize: getResponsiveFontSize(84, 64, 40), fontFamily: F.fraunces, fontStyle: "italic", fontWeight: 700, color: "#E8600A", lineHeight: 1.2 }}>
            in Gurugram.
          </h1>
          <h1 style={{ margin: 0, fontSize: getResponsiveFontSize(84, 64, 40), fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: 1.2 }}>
            MCG mandate,<br />register before fines drop.
          </h1>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 22px",
            background: "#2C1A0E",
            borderRadius: 100,
            marginTop: 18,
          }}>
            <span style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, color: "rgba(244, 228, 207, 0.65)" }}>Non-compliance fine  · </span>
            <span style={{ fontSize: 18, fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A" }}>Pending</span>
          </div>

          <p style={{ maxWidth: 580, margin: "22px auto 0", fontSize: 16.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: 1.68 }}>
            MCG is preparing its enforcement framework. Register now while it's still straightforward — before fines are formally set and before your society RWA issues notices. Tailio files directly with MCG in 60 seconds.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 38 }}>
            {["₹999 one-time, all-inclusive", "MCG accepted", "Certificate in 24–72 hrs", "No office visit needed"].map((text) => (
              <div key={text} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                background: "#FFFCF8",
                borderRadius: 100,
                outline: "1px solid rgba(44, 26, 14, 0.18)",
                outlineOffset: -1,
              }}>
                <div style={{ width: 6, height: 6, background: "#E8600A", borderRadius: 3 }} />
                <span style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, color: "#2C1A0E" }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 38 }}>
            <button style={{
              padding: "14px 28px",
              background: "#E8600A",
              boxShadow: "0px 2px 0px #C04E06",
              borderRadius: 9,
              outline: "2px solid #C04E06",
              outlineOffset: -2,
              border: "none",
              cursor: "pointer",
              fontSize: 15.5,
              fontFamily: F.dmSans,
              fontWeight: 600,
              color: "white",
            }}>
              Register Your Pet — ₹999
            </button>
            <button style={{
              padding: "12px 20px",
              borderRadius: 9,
              outline: "1px solid rgba(44, 26, 14, 0.18)",
              outlineOffset: -1,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: F.dmSans,
              fontWeight: 500,
              color: "#2C1A0E",
            }}>
              See how it works
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        width: "100%",
        background: "#2C1A0E",
        display: "flex",
        flexWrap: "wrap",
      }}>
        {[
          { value: "Pending", label: "MCG fine — announcement expected soon", sublabel: "MCG · Gurugram" },
          { value: "Now", label: "Best time to register before fines drop", sublabel: "MCG · Gurugram" },
          { value: "Live", label: "Tailio accepting Gurugram registrations", sublabel: "MCG · Gurugram" },
          { value: "60s", label: "Time to register on Tailio", sublabel: "From any phone" },
        ].map((stat, idx) => (
          <div key={idx} style={{
            flex: 1,
            minWidth: 200,
            padding: "34px 30px",
            background: "#2C1A0E",
            borderRight: idx < 3 ? "1px solid rgba(255, 255, 255, 0.07)" : "none",
          }}>
            <div style={{ fontSize: 34, fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A", lineHeight: "51px" }}>{stat.value}</div>
            <div style={{ width: 1.5, height: 37, background: "rgba(255, 255, 255, 0.10)", margin: "8px 0" }} />
            <div style={{ fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 500, color: "#F4E4CF" }}>{stat.label}</div>
            <div style={{ fontSize: 11.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.38)", marginTop: 3 }}>{stat.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Law Section */}
      <div style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "80px 40px",
        display: "flex",
        flexWrap: "wrap",
        gap: 48,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>The Law · Gurugram</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, color: "#2C1A0E" }}>
            Pet registration isn't optional<br />in <span style={{ fontStyle: "italic", color: "#E8600A" }}>Gurugram</span>.
          </h2>
          <p style={{ fontSize: 16.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: 1.68, marginTop: 16 }}>
            The Supreme Court's August 2025 order applies to Gurugram. MCG is preparing its enforcement framework. Registration is mandatory now — fines are expected to be among the highest in NCR once announced.
          </p>
          <div style={{
            display: "inline-flex",
            gap: 12,
            padding: "14px 16px",
            background: "#FFFCF8",
            borderRadius: 13,
            borderLeft: "3px solid #2653A0",
            borderTop: "1px solid #2653A0",
            borderRight: "1px solid #2653A0",
            borderBottom: "1px solid #2653A0",
            marginTop: 20,
          }}>
            <div style={{ width: 20, height: 20, background: "#EEF4FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, fontFamily: F.dmMono, fontWeight: 500, color: "#2653A0" }}>i</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>Gurugram — key fact</div>
              <div style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", maxWidth: 414 }}>
                Gurugram is the only NCR city where fines are yet to be formally set — registration is mandatory under the Supreme Court order right now. Act early while it's still simple.
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, background: "#2C1A0E", borderRadius: 18, padding: 40, position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 10, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: 1.4, color: "rgba(244, 228, 207, 0.32)" }}>
            Non-compliance fine · MCG
          </div>
          <div style={{ fontSize: 80, fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A", lineHeight: "80px", marginTop: 5 }}>Coming</div>
          <div style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.42)", marginTop: 5 }}>
            MCG fine announcement expected — register now before enforcement
          </div>
          <div style={{ marginTop: 17 }}>
            {[
              { text: "Pet can be seized by municipal authorities", icon: "/images/lock.png" },
              { text: "No legal proof of ownership without registration", icon: "/images/certificate-1.png" },
              { text: "MCG portal fee ₹100–500 · 2–3 weeks wait", icon: "/images/timer.png" },
            ].map((item, idx) => (
              <div key={idx} style={{ height: 51, borderBottom: idx < 2 ? "1px solid rgba(255, 255, 255, 0.06)" : "none", display: "flex", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, background: "rgba(232, 96, 10, 0.16)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Image 
                    src={item.icon}
                    alt={item.text}
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span style={{ fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.58)" }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{
            position: "absolute",
            width: 180,
            height: 180,
            right: -50,
            top: -50,
            background: "radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(232, 96, 10, 0.22) 0%, rgba(232, 96, 10, 0) 70%)",
            borderRadius: "50%",
          }} />
        </div>
      </div>

      {/* Why Register Section */}
      <div style={{ width: "100%", background: "#F3EDE0", padding: "80px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>Why Register</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: 1.2, marginBottom: 48 }}>
            Four reasons every Gurugram pet owner needs this.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { title: "Legal Identity & Protection", desc: "Unique MCG ID — proof of ownership and full legal status. Legally protected at all times.", icon: "/images/shield-2.png" },
              { title: "Vaccination Tracking", desc: "Digital vaccination records always up to date. WhatsApp & email reminders before every booster.", icon: "/images/vaccine.png" },
              { title: "Lost Pet Recovery", desc: "3× more likely to be returned if lost or stolen. QR tag links to your pet's verified profile.", icon: "/images/widget.png" },
              { title: "Travel Certificate", desc: "Registration certificate required for travelling with your pet on flights, trains and intercity transport.", icon: "/images/certif-icate.png" },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: "20px", background: "#FFFCF8", borderRadius: 13, border: "1px solid rgba(44, 26, 14, 0.10)", textAlign: "left" }}>
                <div style={{ width: 36, height: 36, background: "#FFF0E4", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div style={{ fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E", marginTop: 5 }}>{item.title}</div>
                <div style={{ fontSize: 12.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "20px", marginTop: 6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div style={{ width: "100%", background: "#2C1A0E", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "rgba(232, 96, 10, 0.15)",
            borderRadius: 100,
            outline: "1px solid rgba(232, 96, 10, 0.3)",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#E8600A" }}>What You'll Need</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            <span style={{ color: "#F4E4CF" }}>Four documents.<br /></span>
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>That's all.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 48px", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.44)", lineHeight: "25.5px" }}>
            Upload digitally on Tailio — no photocopies, no office visits. We handle the MCG filing for you.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
            {[
              { id: 1, name: "Anti-Rabies Certificate", desc: "Issued by a registered vet confirming your pet received their anti-rabies vaccine.", details: ["Pet's name, gender & age", "Vaccination date & due date", "Vet's signature & hospital stamp"], icon: "/images/certif-icate.png" },
              { id: 2, name: "Applicant ID Proof", desc: "Any government-issued photo ID of the pet owner. Must be valid and clearly legible.", details: ["Aadhaar Card", "PAN Card", "Passport or Voter ID"], icon: "/images/id.png" },
              { id: 3, name: "Address Proof", desc: "Proof you reside in Gurugram. Must show your current address clearly.", details: ["Aadhaar Card (serves as both)", "Electricity or water bill", "Rental agreement or bank statement"], icon: "/images/location.png" },
              { id: 4, name: "Photo with Your Pet", desc: "A clear, recent photo of you with your pet dog. Both faces must be clearly visible.", details: ["Good natural lighting", "Both owner & pet clearly visible", "Taken within last 3 months"], icon: "/images/photograph.png" },
            ].map((doc) => (
              <div key={doc.id} style={{ padding: 28, background: "rgba(255, 255, 255, 0.04)", borderRadius: 18, border: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, background: "rgba(232, 96, 10, 0.14)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image 
                      src={doc.icon}
                      alt={doc.name}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ width: 24, height: 24, background: "#E8600A", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 700, color: "white" }}>{doc.id}</span>
                  </div>
                </div>
                <div style={{ fontSize: 17, fontFamily: F.fraunces, fontWeight: 400, color: "#F4E4CF", marginTop: 8 }}>{doc.name}</div>
                <div style={{ fontSize: 12.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.40)", marginTop: 5 }}>{doc.desc}</div>
                <div style={{ marginTop: 9 }}>
                  {doc.details.map((detail, idx) => (
                    <div key={idx} style={{ height: 26, borderBottom: idx < 2 ? "1px solid rgba(255, 255, 255, 0.04)" : "none", display: "flex", alignItems: "center" }}>
                      <div style={{ width: 4, height: 4, background: "#E8600A", borderRadius: 2, marginRight: 7 }} />
                      <span style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.52)" }}>{detail}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                  {["JPG", "PNG", "PDF"].map((format) => (
                    <span key={format} style={{ padding: "2px 7px", background: "rgba(255, 255, 255, 0.05)", borderRadius: 4, fontSize: 10, fontFamily: F.dmSans, fontWeight: 700, letterSpacing: 0.4, color: "rgba(244, 228, 207, 0.30)" }}>{format}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>The Process</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            Three screens. <span style={{ fontStyle: "italic", color: "#E8600A" }}>Sixty seconds.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 0", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "25.5px" }}>
            No PDFs, no notarised forms, no office visits. Works on any phone, anywhere in Gurugram.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 52, width: 1.5, height: "calc(100% - 100px)", background: "linear-gradient(180deg, #E8600A 0%, rgba(232, 96, 10, 0.10) 100%)" }} />

          {[
            { number: 1, title: "Register & add your pet's details", desc: "Fill in your pet's name, breed, age and your contact details. Under 60 seconds, works on any phone. No PDFs to download, no notarised forms.", tags: ["Pet name & breed", "Age & gender", "Under 60 seconds"], icon: "/images/registration.png" },
            { number: 2, title: "Upload your 4 documents", desc: "Upload digitally — JPG, PNG or PDF. No photocopies, no office visit. We handle the MCG filing on your behalf.", tags: ["Anti-Rabies Cert", "ID + Address Proof", "Photo with pet"], icon: "/images/id.png" },
            { number: 3, title: "We file with MCG. You get your certificate.", desc: "Tailio submits directly to MCG (Municipal Corporation of Gurugram). Your official digital certificate arrives by email within 24–72 hours. No office visit. Ever.", showCard: true, icon: "/images/certif-icate.png" },
          ].map((step) => (
            <div key={step.number} style={{ marginBottom: 48, marginLeft: 100, position: "relative" }}>
              <div style={{ background: "#FFFCF8", borderRadius: 18, border: "1px solid rgba(44, 26, 14, 0.10)", padding: 32 }}>
                <div style={{ width: 36, height: 36, background: "#FFF0E4", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                  <Image 
                    src={step.icon}
                    alt={step.title}
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: 19, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E", marginTop: 5 }}>{step.title}</h3>
                <p style={{ fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "23.93px", marginTop: 7 }}>{step.desc}</p>
                {step.tags && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 9 }}>
                    {step.tags.map((tag) => (
                      <span key={tag} style={{ padding: "3px 9px", background: tag === "Anti-Rabies Cert" ? "#EEF4FF" : "#E6F6ED", borderRadius: 100, border: tag === "Anti-Rabies Cert" ? "1px solid #B3CEFF" : "1px solid #A8DDB8", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, color: tag === "Anti-Rabies Cert" ? "#2653A0" : "#1A6B3A" }}>{tag}</span>
                    ))}
                  </div>
                )}

                {step.showCard && (
                  <div style={{ marginTop: 33, padding: "22px 26px", background: "#2C1A0E", borderRadius: 13, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                    <div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: "rgba(232, 96, 10, 0.20)", borderRadius: 100 }}>
                        <div style={{ width: 5, height: 5, background: "#F4A56A", borderRadius: 2.5 }} />
                        <span style={{ fontSize: 9.5, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: 0.76, color: "#F4A56A" }}>Certificate issued</span>
                      </div>
                      <div style={{ fontSize: 22, fontFamily: F.fraunces, fontWeight: 700, color: "#F4E4CF", marginTop: 5 }}>Bruno</div>
                      <div style={{ fontSize: 10.5, fontFamily: F.dmMono, fontWeight: 400, letterSpacing: 0.84, color: "rgba(244, 228, 207, 0.35)" }}>TL-GG-2025-54038</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 7 }}>
                        {["Registered in Gurugram", "No office visit", "Verified"].map((badge) => (
                          <span key={badge} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(255, 255, 255, 0.05)", borderRadius: 100 }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M1.67 5L3.33 6.67L8.33 1.67" stroke="#FF8C3A" strokeWidth="1" strokeLinecap="round"/>
                            </svg>
                            <span style={{ fontSize: 11.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.58)" }}>{badge}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ width: 60, height: 60, background: "#FAF6EF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 36, height: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, padding: 3 }}>
                        {[...Array(9)].map((_, i) => (
                          <div key={i} style={{ background: "#2C1A0E" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{
                position: "absolute",
                left: -76,
                top: "50%",
                transform: "translateY(-50%)",
                width: 52,
                height: 52,
                background: "#E8600A",
                borderRadius: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 0px 0px 10px rgba(232, 96, 10, 0.15), 0px 0px 0px 8px #FAF6EF",
              }}>
                <span style={{ fontSize: 21, fontFamily: F.fraunces, fontWeight: 900, color: "white" }}>{step.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div style={{ width: "100%", background: "#F3EDE0", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>Tailio vs MCG Portal</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, marginBottom: 48 }}>
            Or spend a weekend at the<br />
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>MCG office.</span>
          </h2>

          <div style={{ background: "#FFFCF8", borderRadius: 18, overflow: "hidden", boxShadow: "0px 12px 48px rgba(44, 26, 14, 0.12)" }}>
            <div style={{ display: "flex", background: "#2C1A0E", flexWrap: "wrap" }}>
              <div style={{ flex: 2, padding: "28px 26px", textAlign: "left" }}>
                <span style={{ fontSize: 10, fontFamily: F.dmMono, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, color: "rgba(244, 228, 207, 0.20)" }}>What you get</span>
              </div>
              <div style={{ width: 280, padding: "22px 26px", background: "#E8600A", textAlign: "center" }}>
                <span style={{ fontSize: 20, fontFamily: F.fraunces, fontStyle: "italic", color: "white" }}>Tailio.</span>
              </div>
              <div style={{ flex: 1.5, padding: "28px 26px", textAlign: "center" }}>
                <span style={{ fontSize: 10, fontFamily: F.dmMono, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, color: "rgba(244, 228, 207, 0.35)" }}>MCG Portal</span>
              </div>
            </div>

            {[
              { feature: "Time to register", sub: "From start to submission", tailio: "Under 1 minute", portal: "2–3 weeks" },
              { feature: "Works on your phone", sub: "No office visit needed", tailio: "✓", portal: "✗", isIcon: true },
              { feature: "Digital certificate", sub: "Stored on your profile", tailio: "✓", portal: "✗", isIcon: true },
              { feature: "Vaccination reminders", sub: "WhatsApp, SMS & email", tailio: "✓", portal: "✗", isIcon: true },
              { feature: "Registration cost", sub: "One-time, all-inclusive", tailio: "₹999", portal: "₹100–500" },
              { feature: "If you wait, the fine is…", sub: "MCG enforcement active", tailio: "None", portal: "Pending", isWarning: true },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", background: "#FFFCF8", borderBottom: idx < 5 ? "1px solid rgba(44, 26, 14, 0.10)" : "none", flexWrap: "wrap" }}>
                <div style={{ flex: 2, padding: "17px 26px", textAlign: "left" }}>
                  <div style={{ fontSize: 14, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>{item.feature}</div>
                  <div style={{ fontSize: 11.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40" }}>{item.sub}</div>
                </div>
                <div style={{ width: 280, padding: "25px 26px", textAlign: "center" }}>
                  {item.isIcon ? (
                    <span style={{ fontSize: 18, color: "#2C1A0E" }}>{item.tailio}</span>
                  ) : (
                    <span style={{ fontSize: 14, fontFamily: F.dmSans, fontWeight: item.tailio === "₹999" ? 700 : 400, color: "#2C1A0E" }}>{item.tailio}</span>
                  )}
                </div>
                <div style={{ flex: 1.5, padding: "25px 26px", textAlign: "center" }}>
                  {item.isIcon ? (
                    <span style={{ fontSize: 18, color: "#2C1A0E" }}>{item.portal}</span>
                  ) : (
                    <span style={{ fontSize: 14, fontFamily: F.dmSans, fontWeight: 400, color: item.isWarning ? "#A0251E" : "#2C1A0E" }}>{item.portal}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 40px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex",
          padding: "5px 14px",
          background: "#FFF0E4",
          borderRadius: 100,
          outline: "1px solid #FFCCA0",
          outlineOffset: -1,
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>Coverage · Gurugram</span>
        </div>
        <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
          We're live across <span style={{ fontStyle: "italic", color: "#E8600A" }}>Gurugram.</span>
        </h2>
        <p style={{ maxWidth: 460, margin: "12px auto 32px", fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "23.93px" }}>
          Tailio accepts registrations from all areas under MCG (Municipal Corporation of Gurugram).
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {["DLF Phase 1", "DLF Phase 4", "Sushant Lok", "Sector 56", "Golf Course Road", "Palam Vihar", "Sector 14", "South City", "MG Road", "Sector 57"].map((area) => (
            <span key={area} style={{ padding: "7px 14px", background: "#FFFCF8", borderRadius: 100, border: "1px solid rgba(44, 26, 14, 0.18)", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, color: "#2C1A0E" }}>{area}</span>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div style={{ width: "100%", background: "#F3EDE0", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ fontSize: 18, letterSpacing: 3, color: "#E8600A", marginBottom: 18 }}>★★★★★</div>
          <blockquote style={{ fontSize: 24, fontFamily: F.fraunces, fontStyle: "italic", fontWeight: 700, color: "#2C1A0E", lineHeight: "35px", margin: 0 }}>
            "My RWA sent a circular about Gurugram registration being imminent. I didn't want to scramble later — Tailio made it a 5-minute job. Certificate came in 48 hours."
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 }}>
            <div style={{ width: 40, height: 40, background: "#E8600A", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16, fontFamily: F.dmSans, fontWeight: 700, color: "white" }}>R</span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <span style={{ fontSize: 14, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>Radhika Nair</span>
                <span style={{ padding: "3px 9px", background: "#FFF0E4", borderRadius: 100, border: "1px solid #FFCCA0", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, color: "#C04E06" }}>
                  <Image 
                    src="/images/paw-2.png"
                    alt="Paw"
                    width={12}
                    height={12}
                    style={{ display: "inline", marginRight: 4 }}
                  />
                  Mochi
                </span>
              </div>
              <div style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", marginTop: 4 }}>DLF Phase 4, Gurugram</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div style={{ width: "100%", background: "#2C1A0E", padding: "88px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "rgba(232, 96, 10, 0.15)",
            borderRadius: 100,
            outline: "1px solid rgba(232, 96, 10, 0.3)",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#E8600A" }}>One Price. Everything Included.</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            <span style={{ color: "#F4E4CF" }}>Done. You're at the<br /></span>
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>end of the path.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 48px", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.44)", lineHeight: "25.5px" }}>
            Sixty seconds from here to legally issued. Certificate valid with MCG.
          </p>

          <div style={{ padding: 44, background: "rgba(255, 255, 255, 0.04)", borderRadius: 18, border: "1px solid rgba(232, 96, 10, 0.28)", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", background: "#FFF4E4", borderRadius: 100, border: "1px solid #FFCCA0", marginBottom: 20 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M0.83 0.83L9.17 9.17M0.83 9.17L9.17 0.83" stroke="#B85C00" strokeWidth="1"/>
              </svg>
              <span style={{ fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, color: "#B85C00" }}>Launch Offer — Save ₹1,000</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
              <span style={{ fontSize: 36, fontFamily: F.fraunces, fontWeight: 900, color: "#E8600A" }}>₹</span>
              <span style={{ fontSize: 72, fontFamily: F.fraunces, fontWeight: 900, color: "#F4E4CF", lineHeight: 1 }}>999</span>
            </div>
            <div style={{ fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, textDecoration: "line-through", color: "rgba(244, 228, 207, 0.28)" }}>Regular price ₹1,999</div>
            <div style={{ fontSize: 12.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.36)", marginTop: 4 }}>Per pet · Valid 1 year · All taxes inclusive · MCG accepted</div>

            <div style={{ marginTop: 28, textAlign: "left" }}>
              {[
                "MCG Municipal Filing — all paperwork end to end",
                "Official Govt Certificate — delivered within 24–72 hrs",
                "Vaccination Tracker — digital records + auto-reminders",
                "Renewal Reminders — WhatsApp & email before expiry",
                "Legal Pet Profile — proof of ownership always on record",
              ].map((item, idx) => (
                <div key={idx} style={{ height: 43, borderBottom: idx < 4 ? "1px solid rgba(255, 255, 255, 0.05)" : "none", display: "flex", alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, background: "rgba(232, 96, 10, 0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L4.5 8.5L10 3" stroke="#F4A56A" strokeWidth="1.25" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.60)" }}>{item}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%",
              marginTop: 24,
              padding: "17px",
              background: "#E8600A",
              boxShadow: "0px 4px 0px #C04E06",
              borderRadius: 100,
              border: "2px solid #C04E06",
              fontSize: 16.5,
              fontFamily: F.dmSans,
              fontWeight: 700,
              letterSpacing: "0.17px",
              color: "white",
              cursor: "pointer",
            }}>
              Register Your Pet — ₹999 →
            </button>

            <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", marginTop: 12 }}>
              {["Secure payment", "Legally valid", "24–72 hr approval"].map((text) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 12, height: 12, border: "1px solid rgba(244, 228, 207, 0.30)", borderRadius: 2 }} />
                  <span style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.30)" }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{
              position: "absolute",
              width: 200,
              height: 200,
              right: -59,
              top: -59,
              background: "radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(232, 96, 10, 0.16) 0%, rgba(232, 96, 10, 0) 70%)",
              borderRadius: "50%",
            }} />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: 716, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px solid #FFCCA0",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1.2, color: "#C04E06" }}>Common Questions</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            Everything about Gurugram<br />
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>registration.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ background: "#FFFCF8", borderRadius: 13, border: "1px solid rgba(44, 26, 14, 0.18)", overflow: "hidden" }}>
              <div 
                style={{ 
                  padding: "18px 20px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onClick={() => toggleFaq(idx)}
              >
                <span style={{ fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>{faq.question}</span>
                <div style={{ 
                  width: openFaq === idx ? 36 : 26, 
                  height: openFaq === idx ? 16 : 26, 
                  background: openFaq === idx ? "#FFF0E4" : "#F3EDE0", 
                  borderRadius: 13, 
                  border: "1px solid rgba(44, 26, 14, 0.18)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  transition: "all 0.2s ease"
                }}>
                  {openFaq === idx ? (
                    <div style={{ width: 16, height: 2, background: "#E8600A", borderRadius: 1 }} />
                  ) : (
                    <span style={{ fontSize: 18, color: "#E8600A", fontWeight: 500 }}>+</span>
                  )}
                </div>
              </div>
              
              {openFaq === idx && (
                <div style={{ padding: "14px 20px 18px", borderTop: "1px solid rgba(44, 26, 14, 0.10)" }}>
                  <p style={{ margin: 0, fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "22.95px" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}