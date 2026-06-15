// components/NoidaLanding.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '../component/Footer';
import RegisterModal from '../component/RegisterModal';
import LoginModal from '../component/LoginModal';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

export default function NoidaLanding() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
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

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
  {
    question: "Is pet registration really mandatory in Noida?",
    answer: "Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed Noida Authority to enforce mandatory pet registration across Noida. Noida Authority has the most aggressive enforcement in NCR. Active fines of ₹10,000 have been issued and pet seizures reported across sectors since the Supreme Court's August 2025 order."
  },
  {
    question: "Is Tailio's registration legally valid in Noida?",
    answer: "Yes, Tailio is authorized to submit registrations directly to Noida Authority. Your certificate is officially recognized and legally valid across all sectors of Noida. The registration is compliant with Noida Authority's pet registration requirements."
  },
  {
    question: "What is the fine for not registering in Noida?",
    answer: "The fine for non-compliance is ₹10,000, which is the highest in all of NCR. Noida Authority actively enforces this at society gates, parks, and RWA drives. Fines escalate with each enforcement drive, and repeat offenders may face higher penalties."
  },
  {
    question: "What documents do I need to register?",
    answer: "You need four documents: 1) Anti-Rabies Certificate from a registered vet, 2) Applicant ID Proof (Aadhaar/PAN/Passport/Voter ID), 3) Address Proof (Aadhaar/electricity bill/water bill/rental agreement/bank statement), and 4) A recent photo with your pet (both faces clearly visible)."
  },
  {
    question: "How much does registration cost on Tailio?",
    answer: "Registration costs ₹299 + municipal fees (launch offer, regular price ₹599 + municipal fees). This includes municipal filing, digital certificate, vaccination tracker, and renewal reminders. No hidden charges."
  },
  {
    question: "How long does it take to get the certificate?",
    answer: "Your official digital certificate is delivered within 24–72 hours after submission. No office visit required. You'll receive the certificate via email, and it will also be stored in your Tailio profile for easy access."
  }
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
      background: "#FAF6EF",
      fontFamily: F.dmSans,
      overflowX: "hidden",
    }}>

      {/* Hero Section */}
      <div style={{
        width: "100%",
        minHeight: "1080px",
        paddingTop: "100px",
        paddingBottom: "258px",
        paddingLeft: "52px",
        paddingRight: "52px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        background: "#FAF6EF",
      }}>
        {/* Background gradient */}
        <div style={{
          width: "1468.50px",
          height: "776.25px",
          position: "absolute",
          right: "-500px",
          top: "271px",
          background: "radial-gradient(ellipse 94.14% 77.70% at -67.18% -4.60%, rgba(232, 96, 10, 0.07) 0%, rgba(232, 96, 10, 0) 68%)",
          pointerEvents: "none",
        }} />

        {/* Main content */}
        <div style={{ textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px 6px 9px", background: "#FFF0E4", borderRadius: "100px", outline: "1px #FFCCA0 solid", outlineOffset: "-1px", marginBottom: "26px" }}>
            <div style={{ width: "7px", height: "7px", background: "#E8600A", borderRadius: "3.50px" }} />
            <span style={{ fontSize: "12.50px", fontFamily: F.dmSans, fontWeight: 500, color: "#C04E06" }}>Noida Authority · UP · Registration Live</span>
          </div>

          <h1 style={{ margin: 0, fontSize: "84px", fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: "84px" }}>Pet registration</h1>
          <h1 style={{ margin: 0, fontSize: "84px", fontFamily: F.fraunces, fontStyle: "italic", fontWeight: 700, color: "#E8600A", lineHeight: "84px" }}>in Noida.</h1>
          <h1 style={{ margin: 0, fontSize: "84px", fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: "84px" }}>₹10,000 fine.<br />60-second escape.</h1>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 22px", background: "#2C1A0E", borderRadius: "100px", marginTop: "18px" }}>
            <span style={{ fontSize: "13px", fontFamily: F.dmSans, fontWeight: 500, color: "rgba(244, 228, 207, 0.65)" }}>Non-compliance fine  · </span>
            <span style={{ fontSize: "18px", fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A" }}>₹10,000</span>
          </div>

          <p style={{ maxWidth: "580px", margin: "22px auto 0", fontSize: "16.50px", fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "27.72px" }}>
            Noida has the steepest fine in all of Delhi NCR — ₹10,000. The Noida
            Authority is actively penalising pet owners at society gates and RWA drives.
            Register before the next drive hits your sector.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "38px" }}>
            {["₹299 + municipal fees", "Noida Authority accepted", "Certificate in 24–72 hrs", "No office visit needed"].map((text) => (
              <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 14px", background: "#FFFCF8", borderRadius: "100px", outline: "1px solid rgba(44, 26, 14, 0.18)", outlineOffset: "-1px" }}>
                <div style={{ width: "6px", height: "6px", background: "#E8600A", borderRadius: "3px" }} />
                <span style={{ fontSize: "13px", fontFamily: F.dmSans, fontWeight: 500, color: "#2C1A0E" }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "38px" }}>
            <button 
              onClick={handleOpenRegisterModal}
              style={{
                padding: "14px 28px",
                background: "#E8600A",
                boxShadow: "0px 2px 0px #C04E06",
                borderRadius: "9px",
                outline: "2px #C04E06 solid",
                outlineOffset: "-2px",
                border: "none",
                cursor: "pointer",
                fontSize: "15.50px",
                fontFamily: F.dmSans,
                fontWeight: 600,
                color: "white",
              }}>
              Register Your Pet — ₹299 + fees →
            </button>
            <button 
              onClick={() => {
                document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: "12px 20px",
                borderRadius: "9px",
                outline: "1px solid rgba(44, 26, 14, 0.18)",
                outlineOffset: "-1px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: F.dmSans,
                fontWeight: 500,
                color: "#2C1A0E",
              }}>
              See how it works
            </button>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div style={{
        width: "100%",
        background: "#2C1A0E",
        display: "flex",
        flexWrap: "wrap",
      }}>
        {[
          { value: "₹10K", label: "Maximum fine — highest in all NCR", sublabel: "Noida Authority · UP" },
          { value: "7 days", label: "To comply after RWA notice", sublabel: "Noida Authority · UP" },
          { value: "Active", label: "Noida Authority enforcement status", sublabel: "India · WHO data" },
          { value: "60s", label: "Time to register on Tailio", sublabel: "From any phone" },
        ].map((stat, idx) => (
          <div key={idx} style={{
            flex: 1,
            minWidth: "200px",
            padding: "34px 30px",
            background: "#2C1A0E",
            borderRight: idx < 3 ? "1px solid rgba(255, 255, 255, 0.07)" : "none",
          }}>
            <div style={{ fontSize: "34px", fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A", lineHeight: "51px" }}>{stat.value}</div>
            <div style={{ width: "1.5px", height: "37px", background: "rgba(255, 255, 255, 0.10)", margin: "8px 0" }} />
            <div style={{ fontSize: "13.5px", fontFamily: F.dmSans, fontWeight: 500, color: "#F4E4CF" }}>{stat.label}</div>
            <div style={{ fontSize: "11.5px", fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.38)", marginTop: "3px" }}>{stat.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Law Section */}
      <div style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "80px 40px",
        display: "flex",
        flexWrap: "wrap",
        gap: "48px",
        background: "#FAF6EF",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px #FFCCA0 solid",
            outlineOffset: -1,
            marginBottom: "12px",
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#C04E06" }}>The Law · Noida</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2, color: "#2C1A0E" }}>
            Pet registration isn't optional<br />in <span style={{ fontStyle: "italic", color: "#E8600A" }}>Noida</span>.
          </h2>
          <p style={{ fontSize: 16.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "27.72px", marginTop: 16 }}>
            Noida Authority has the most aggressive enforcement in NCR. Active
            fines of ₹10,000 have been issued and pet seizures reported across
            sectors since the Supreme Court's August 2025 order.
          </p>
          <div style={{ display: "inline-flex", gap: 12, padding: "14px 16px", background: "#FFFCF8", borderRadius: 13, border: "1px solid rgba(44, 26, 14, 0.10)", marginTop: 20 }}>
            <div style={{ width: 20, height: 21, background: "#FDECEA", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 9, fontFamily: F.dmSans, fontWeight: 600, color: "#A0251E" }}>!</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>Noida — key fact</div>
              <div style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", maxWidth: 414 }}>
                Noida Authority is the most active enforcer in NCR. Fines have been
                issued at society gates, parks and RWA drives — with pet seizures on record.
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, background: "#2C1A0E", borderRadius: 18, padding: 40, position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 10, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: 1.4, color: "rgba(244, 228, 207, 0.32)" }}>
            Non-compliance fine · Noida Authority
          </div>
          <div style={{ fontSize: 80, fontFamily: F.fraunces, fontWeight: 900, color: "#FF8C3A", lineHeight: "80px", marginTop: 5 }}>₹10,000</div>
          <div style={{ fontSize: 13, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.42)", marginTop: 5 }}>
            Highest fine in all of NCR — Noida Authority actively penalising
          </div>
          <div style={{ marginTop: 17 }}>
            {[
              { text: "Pet can be seized by municipal authorities", icon: "/images/shield-2.png", alt: "Pet seizure" },
              { text: "No legal proof of ownership without registration", icon: "/images/registration.png", alt: "No document" },
              { text: "Noida Authority portal fee ₹100–500 · 2–3 weeks wait", icon: "/images/target.png", alt: "Clock" },
            ].map((item, idx) => (
              <div key={idx} style={{ height: 51, borderBottom: idx < 2 ? "1px solid rgba(255, 255, 255, 0.06)" : "none", display: "flex", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, background: "rgba(232, 96, 10, 0.16)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Image 
                    src={item.icon}
                    alt={item.alt}
                    width={29}
                    height={29}
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
        <div style={{ maxWidth: "1120px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px #FFCCA0 solid",
            outlineOffset: -1,
            marginBottom: "12px",
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#C04E06" }}>Why Register</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, color: "#2C1A0E", lineHeight: 1.2, marginBottom: 48 }}>Four reasons every Noida pet owner needs this.</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
            {[
              { title: "Legal Identity & Protection", desc: "Unique Noida Authority ID — proof of ownership and full legal status. Legally protected at all times.", icon: "/images/shield-2.png" },
              { title: "Vaccination Tracking", desc: "Digital vaccination records always up to date. WhatsApp & email reminders before every booster.", icon: "/images/vaccine-tracker-color.png" },
              { title: "Lost Pet Recovery", desc: "3× more likely to be returned if lost or stolen. QR tag links to your pet's verified profile.", icon: "/images/target.png" },
              { title: "Travel Certificate", desc: "Registration certificate required for travelling with your pet on flights, trains and intercity transport.", icon: "/images/certif-icate.png" },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: "20px", background: "#FFFCF8", borderRadius: 13, border: "1px solid rgba(44, 26, 14, 0.10)", textAlign: "left" }}>
                <div style={{ width: 36, height: 36, background: "#FFF0E4", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
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
        <div style={{ maxWidth: "1120px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "rgba(232, 96, 10, 0.15)",
            borderRadius: 100,
            outline: "1px solid rgba(232, 96, 10, 0.3)",
            outlineOffset: -1,
            marginBottom: "12px",
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#E8600A" }}>What You'll Need</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            <span style={{ color: "#F4E4CF" }}>Four documents.<br /></span>
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>That's all.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 48px", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.44)", lineHeight: "25.5px" }}>
            Upload digitally on Tailio — no photocopies, no office visits. We handle the Noida Authority filing for you.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
            {[
              { id: 1, name: "Anti-Rabies Certificate", desc: "Issued by a registered vet confirming your pet received their anti-rabies vaccine.", details: ["Pet's name, gender & age", "Vaccination date & due date", "Vet's signature & hospital stamp"], icon: "/images/certif-icate.png" },
              { id: 2, name: "Applicant ID Proof", desc: "Any government-issued photo ID of the pet owner. Must be valid and clearly legible.", details: ["Aadhaar Card", "PAN Card", "Passport or Voter ID"], icon: "/images/id.png" },
              { id: 3, name: "Address Proof", desc: "Proof you reside in Noida. Must show your current address clearly.", details: ["Aadhaar Card (serves as both)", "Electricity or water bill", "Rental agreement or bank statement"], icon: "/images/location.png" },
              { id: 4, name: "Photo with Your Pet", desc: "A clear, recent photo of you with your pet dog. Both faces must be clearly visible.", details: ["Good natural lighting", "Both owner & pet clearly visible", "Taken within last 3 months"], icon: "/images/photograph.png" },
            ].map((doc) => (
              <div key={doc.id} style={{ padding: 28, background: "rgba(255, 255, 255, 0.04)", borderRadius: 18, border: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, background: "rgba(232, 96, 10, 0.14)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image 
                      src={doc.icon}
                      alt={doc.name}
                      width={29}
                      height={29}
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
      <div id="process-section" style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 40px", background: "#FAF6EF" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px #FFCCA0 solid",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#C04E06" }}>The Process</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            Three screens. <span style={{ fontStyle: "italic", color: "#E8600A" }}>Sixty seconds.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 0", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "25.5px" }}>
            No PDFs, no notarised forms, no office visits. Works on any phone, anywhere in Noida.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 52, width: 1.5, height: "calc(100% - 100px)", background: "linear-gradient(180deg, #E8600A 0%, rgba(232, 96, 10, 0.10) 100%)" }} />

          {[
            { number: 1, title: "Register & add your pet's details", desc: "Fill in your pet's name, breed, age and your contact details. Under 60 seconds, works on any phone. No PDFs to download, no notarised forms.", tags: ["Pet name & breed", "Age & gender", "Under 60 seconds"], icon: "/images/registration.png" },
            { number: 2, title: "Upload your 4 documents", desc: "Upload digitally — JPG, PNG or PDF. No photocopies, no office visit. We handle the Noida Authority filing on your behalf.", tags: ["Anti-Rabies Cert", "ID + Address Proof", "Photo with pet"], icon: "/images/photograph.png" },
            { number: 3, title: "We file with Noida Authority. You get your certificate.", desc: "Tailio submits directly to Noida Authority. Your official digital certificate arrives by email within 24–72 hours. No office visit. Ever.", showCard: true, icon: "/images/certif-icate.png" },
          ].map((step) => (
            <div key={step.number} style={{ marginBottom: 48, marginLeft: 100, position: "relative" }}>
              <div style={{ background: "#FFFCF8", borderRadius: 18, border: "1px solid rgba(44, 26, 14, 0.10)", padding: 32 }}>
                <div style={{ width: 36, height: 36, background: "#FFF0E4", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                  <Image 
                    src={step.icon}
                    alt={step.title}
                    width={29}
                    height={28}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 style={{ fontSize: 19, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E", marginTop: 5 }}>{step.title}</h3>
                <p style={{ fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "23.93px", marginTop: 7 }}>{step.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 9 }}>
                  {step.tags?.map((tag) => (
                    <span key={tag} style={{ padding: "3px 9px", background: "#E6F6ED", borderRadius: 100, border: "1px solid #A8DDB8", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, color: "#1A6B3A" }}>{tag}</span>
                  ))}
                </div>

                {step.showCard && (
                  <div style={{ marginTop: 33, padding: "22px 26px", background: "#2C1A0E", borderRadius: 13, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                    <div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: "rgba(232, 96, 10, 0.20)", borderRadius: 100 }}>
                        <div style={{ width: 5, height: 5, background: "#F4A56A", borderRadius: 2.5 }} />
                        <span style={{ fontSize: 9.5, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: 0.76, color: "#F4A56A" }}>Certificate issued</span>
                      </div>
                      <div style={{ fontSize: 22, fontFamily: F.fraunces, fontWeight: 700, color: "#F4E4CF", marginTop: 5 }}>Bruno</div>
                      <div style={{ fontSize: 10.5, fontFamily: F.dmMono, fontWeight: 400, letterSpacing: 0.84, color: "rgba(244, 228, 207, 0.35)" }}>TL-NO-2025-71294</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 7 }}>
                        {["Registered in Noida", "No office visit", "Verified"].map((badge) => (
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
<div style={{
  alignSelf: 'stretch',
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
              padding: '8px 12px 8px 8px',  // Reduced right padding, minimal left
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
                gap: 6,  // Reduced gap between logo and text
                margin: 0
              }}>
                {/* Tailio Brand Symbol */}
                <img 
                  src="/images/tailio.png"  // Replace with your actual logo path
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

      {/* Coverage Section */}
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 40px", textAlign: "center", background: "#FAF6EF" }}>
        <div style={{
          display: "inline-flex",
          padding: "5px 14px",
          background: "#FFF0E4",
          borderRadius: 100,
          outline: "1px #FFCCA0 solid",
          outlineOffset: -1,
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#C04E06" }}>Coverage · Noida</span>
        </div>
        <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
          We're live across <span style={{ fontStyle: "italic", color: "#E8600A" }}>Noida.</span>
        </h2>
        <p style={{ maxWidth: 460, margin: "12px auto 32px", fontSize: 14.5, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", lineHeight: "23.93px" }}>
          Tailio accepts registrations from all areas under Noida Authority.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {["Sector 18", "Sector 50", "Sector 62", "Sector 137", "Sector 93", "Sector 44", "Noida Extension", "Sector 76", "Sector 100", "Sector 110"].map((sector) => (
            <span key={sector} style={{ padding: "7px 14px", background: "#FFFCF8", borderRadius: 100, border: "1px solid rgba(44, 26, 14, 0.18)", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, color: "#2C1A0E" }}>{sector}</span>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div style={{ width: "100%", background: "#F3EDE0", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ fontSize: 18, letterSpacing: 3, color: "#E8600A", marginBottom: 18 }}>★★★★★</div>
          <blockquote style={{ fontSize: 24, fontFamily: F.fraunces, fontStyle: "italic", fontWeight: 700, color: "#2C1A0E", lineHeight: "35px", margin: 0 }}>
            "I tried the Noida Authority portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn't expect."
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 }}>
            <div style={{ width: 40, height: 40, background: "#E8600A", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16, fontFamily: F.dmSans, fontWeight: 700, color: "white" }}>A</span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <span style={{ fontSize: 14, fontFamily: F.dmSans, fontWeight: 600, color: "#2C1A0E" }}>Arjun Mehta</span>
                <span style={{ padding: "3px 9px", background: "#FFF0E4", borderRadius: 100, border: "1px solid #FFCCA0", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, color: "#C04E06" }}>🐾 Luna</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, color: "#7A5C40", marginTop: 4 }}>Sector 62, Noida</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - New Integrated Box */}
      <div style={{ width: "100%", background: "#2C1A0E", padding: "88px 40px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "rgba(232, 96, 10, 0.15)",
            borderRadius: 100,
            outline: "1px solid rgba(232, 96, 10, 0.3)",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#E8600A" }}>One Price. Everything Included.</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            <span style={{ color: "#F4E4CF" }}>Done. You're at the<br /></span>
            <span style={{ fontStyle: "italic", color: "#E8600A" }}>end of the path.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "12px auto 48px", fontSize: 15, fontFamily: F.dmSans, fontWeight: 400, color: "rgba(244, 228, 207, 0.44)", lineHeight: "25.5px" }}>
            Sixty seconds from here to legally issued. Certificate valid with Noida Authority.
          </p>

          {/* Centered Pricing Box */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: 24,
              padding: "50px 46px 40px",
              outline: "1px solid rgba(212, 82, 26, 0.28)",
              position: "relative",
              maxWidth: 560,
              width: "100%"
            }}>
              <div style={{ position: "absolute", top: -1, left: -1, right: -1, bottom: -1, borderRadius: 23, pointerEvents: "none" }} />
              
              {/* Badge row - centered */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 5, paddingBottom: 5, borderRadius: 999, outline: "1px solid rgba(255,255,255,0.25)", outlineOffset: -1 }}>
                  <span style={{ color: "rgba(255,255,255,0.70)", fontSize: 10, fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.20px" }}>All Inclusive</span>
                </div>
                <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: "#E8C832", borderRadius: 999, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, background: "#1A0A00", borderRadius: 3 }} />
                  <span style={{ color: "#1A0A00", fontSize: 10, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.60px" }}>LAUNCH OFFER — SAVE ₹300</span>
                </div>
              </div>
              
              {/* Price Section - centered */}
              <div style={{ marginBottom: 20, textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                  <span style={{ color: "rgba(255,255,255,0.60)", fontSize: 28, fontFamily: "Inter", fontWeight: 700, paddingBottom: 14 }}>₹</span>
                  <span style={{ color: "white", fontSize: 88, fontFamily: "Playfair Display", fontWeight: 900, lineHeight: "1" }}>299</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 60, fontFamily: "Playfair Display", fontWeight: 900, lineHeight: "1", paddingBottom: 6 }}>/—</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: "#E07B20", fontSize: 13, fontFamily: "Inter", fontWeight: 600 }}>+ Municipal fees (as applicable)</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ color: "rgba(255,255,255,0.40)", fontSize: 12, fontFamily: "Inter", textDecoration: "line-through" }}>Regular price ₹599</span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.40)", fontSize: 12, fontFamily: "Inter" }}>Applicable GST will be added as per government regulations</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ color: "#E07B20", fontSize: 12, fontFamily: "Inter", fontWeight: 600 }}>Per pet · Valid for 1 financial year · Noida Authority accepted</span>
                </div>
              </div>
              
              {/* Checklist - left aligned for readability */}
              <div style={{ marginTop: 24, marginBottom: 32, textAlign: "left" }}>
                {[
                  "Noida Authority Municipal Filing — all paperwork end to end",
                  "Official Govt Certificate — delivered within 24–72 hrs",
                  "Vaccination Tracker — digital records + auto-reminders",
                  "Renewal Reminders — WhatsApp & email before expiry",
                  "Legal Pet Profile — proof of ownership always on record",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 20, height: 20, background: "rgba(224, 123, 32, 0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L4.5 8.5L10 3" stroke="#E07B20" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Inter", lineHeight: "18.20px" }}>{item}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={handleOpenRegisterModal}
                style={{ 
                  width: "100%", 
                  background: "#D4521A",
                  boxShadow: "0px 6px 0px #A83E10",
                  border: "none", 
                  borderRadius: 100, 
                  padding: "18px 20px", 
                  color: "white", 
                  fontSize: 17, 
                  fontFamily: "DM Sans", 
                  fontWeight: 700, 
                  cursor: "pointer",
                  marginBottom: 20,
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#C06A18"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#D4521A"}
              >
                Register Your Pet — ₹299 + municipal fees →
              </button>
              
              {/* Footer badges */}
              <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                {["Secure payment", "Legally valid with Noida Authority", "24–72 hr approval"].map((text) => (
                  <span key={text} style={{ color: "rgba(255,255,255,0.30)", fontSize: 12, fontFamily: "DM Sans" }}>{text}</span>
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
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: 716, margin: "0 auto", padding: "80px 40px", background: "#FAF6EF" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex",
            padding: "5px 14px",
            background: "#FFF0E4",
            borderRadius: 100,
            outline: "1px #FFCCA0 solid",
            outlineOffset: -1,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "#C04E06" }}>Common Questions</span>
          </div>
          <h2 style={{ fontSize: 38, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.2 }}>
            Everything about Noida<br />
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
                    <div style={{ width: 36, height: 16, background: "#FFF0E4", borderRadius: 13, border: "1px solid rgba(232, 96, 10, 0.30)", transform: "rotate(45deg)" }} />
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

      <Footer/>

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
  );
}