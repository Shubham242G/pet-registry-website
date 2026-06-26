'use client';

import Footer from "../component/Footer";
import Head from "next/head";

export default function DelhiPage() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Delhi Pet Registration | MCD Pet Registration Online | Tailio</title>
        <meta 
          name="description" 
          content="Register your pet with MCD Delhi in under 60 seconds. Tailio files directly with Municipal Corporation of Delhi. Get your official pet registration certificate in 24-72 hours. Starting at ₹999." 
        />
        <meta 
          name="keywords" 
          content="Delhi pet registration, MCD pet registration, MCD dog registration, pet registration Delhi, dog registration Delhi, municipal corporation Delhi pet registration, pet registration MCD online, pet certificate Delhi, pet compliance Delhi, pet registration law Delhi, ABC rules Delhi, Supreme Court pet registration Delhi" 
        />
        <link rel="canonical" href="https://tailio.com/delhi" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tailio.com/delhi" />
        <meta property="og:title" content="Delhi Pet Registration | MCD Pet Registration Online | Tailio" />
        <meta 
          property="og:description" 
          content="Register your pet with MCD Delhi in under 60 seconds. Tailio files directly with Municipal Corporation of Delhi. Get your official pet registration certificate in 24-72 hours." 
        />
        <meta property="og:image" content="https://tailio.com/images/og-delhi.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Tailio" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://tailio.com/delhi" />
        <meta name="twitter:title" content="Delhi Pet Registration | MCD Pet Registration Online | Tailio" />
        <meta 
          name="twitter:description" 
          content="Register your pet with MCD Delhi in under 60 seconds. Get your official pet registration certificate in 24-72 hours. Starting at ₹999." 
        />
        <meta name="twitter:image" content="https://tailio.com/images/og-delhi.jpg" />
        
        {/* Additional SEO */}
        <meta name="author" content="Tailio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* Schema.org structured data for Delhi page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Delhi Pet Registration with MCD",
              "description": "Complete guide to pet registration in Delhi. Register your pet with MCD through Tailio in under 60 seconds.",
              "url": "https://tailio.com/delhi",
              "mainEntity": {
                "@type": "LocalBusiness",
                "name": "Tailio - Delhi Pet Registration",
                "description": "Digital pet registration service for Delhi residents. File directly with MCD.",
                "url": "https://tailio.com/delhi",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Delhi",
                  "addressCountry": "IN"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Delhi"
                },
                "priceRange": "₹999",
                "openingHours": "Mo-Su 09:00-21:00",
                "serviceType": "Pet Registration",
                "availableService": [
                  {
                    "@type": "Service",
                    "name": "MCD Pet Registration",
                    "description": "File pet registration with Municipal Corporation of Delhi",
                    "serviceType": "Government Service Filing",
                    "provider": {
                      "@type": "Organization",
                      "name": "Tailio"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* FAQ Schema for Delhi-specific FAQs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is pet registration really mandatory in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCD to enforce mandatory pet registration across Delhi. Fines start at ₹500 and escalate with every enforcement drive."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Tailio's registration legally valid in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Tailio is an authorized platform that files directly with MCD. Your certificate is officially issued by the municipal corporation and is fully valid."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the fine for not registering in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The fine for non-compliance starts at ₹500 and escalates with every MCD enforcement drive. Pet owners can also face pet seizure by municipal authorities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What documents do I need to register my pet in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You need four documents: Anti-Rabies Vaccination Certificate, Applicant ID Proof (Aadhaar, PAN, Passport or Voter ID), Address Proof for Delhi, and a recent photo with your pet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does pet registration cost in Delhi on Tailio?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Registration costs ₹999 one-time, all-inclusive. This includes the MCD filing fee and your official digital certificate. Regular price is ₹1,999."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to get the MCD certificate in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your official digital certificate arrives by email within 24–72 hours after submission through Tailio."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://tailio.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Delhi Pet Registration",
                  "item": "https://tailio.com/delhi"
                }
              ]
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FAF6EF]">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E8600A]/[0.07] to-transparent" />
          <div className="absolute left-8 top-20 opacity-[0.06] text-[#E8600A] text-6xl rotate-[-16deg]">✦</div>
          <div className="absolute right-8 top-40 opacity-[0.06] text-[#E8600A] text-4xl rotate-[14deg]">✦</div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#FFF0E4] rounded-full px-3 py-1.5 border border-[#FFCCA0] mb-6">
              <div className="w-1.5 h-1.5 bg-[#E8600A] rounded-full" />
              <span className="text-[#C04E06] text-sm font-medium">MCD · Delhi · Registration Live</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#2C1A0E] leading-tight mb-4">
              Pet registration
              <span className="text-[#E8600A] italic block sm:inline"> in Delhi.</span>
            </h1>

            <p className="text-[#7A5C40] text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              The MCD portal exists. But it takes 2–4 weeks, requires an office visit, and most applications go nowhere. Tailio files directly with MCD on your behalf — done in 60 seconds from your phone.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Certificate in 24–72 hrs', '₹999 one-time, all-inclusive', 'MCD accepted', 'No office visit needed'].map((text) => (
                <div key={text} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#2C1A0E]/20">
                  <div className="w-1.5 h-1.5 bg-[#E8600A] rounded-full" />
                  <span className="text-[#2C1A0E] text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            <button 
              className="bg-[#E8600A] hover:bg-[#d45408] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-[0_2px_0_#C04E06] border-2 border-[#C04E06] transition-colors inline-flex items-center gap-2"
              aria-label="Register your pet with MCD Delhi now"
            >
              Register Your Pet — ₹999
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#2C1A0E] py-8 px-4" aria-label="Delhi pet registration statistics">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '~913', label: 'Dogs registered in Delhi today', sub: 'MCD · Delhi' },
              { value: '<10%', label: 'Pet owners who have registered', sub: 'MCD · Delhi' },
              { value: '36%', label: 'Global rabies deaths in India', sub: 'India · WHO data' },
              { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' },
            ].map((stat, i) => (
              <div key={i} className={`text-center md:text-left px-4 py-4 ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <div className="text-[#FF8C3A] text-3xl md:text-4xl font-black">{stat.value}</div>
                <div className="h-px w-6 bg-white/10 my-2" />
                <div className="text-[#F4E4CF] text-sm font-medium">{stat.label}</div>
                <div className="text-[#F4E4CF]/40 text-xs mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Law Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest mb-2">The Law · Delhi</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mb-4">
                Pet registration isn't optional<br/>in <span className="text-[#E8600A] italic">Delhi.</span>
              </h2>
              <p className="text-[#7A5C40] text-base leading-relaxed mb-6">
                The Supreme Court of India's August 2025 order directed MCD to enforce mandatory registration for all pet animals across Delhi. Fines start at ₹500 and escalate with every enforcement drive.
              </p>
              <div className="bg-white rounded-xl p-4 border-l-4 border-[#2C1A0E]/10 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#FFF4E4] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#B85C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#2C1A0E] text-sm font-semibold">Delhi — key fact</div>
                    <div className="text-[#7A5C40] text-xs leading-relaxed">Delhi has the lowest registration rate in NCR — less than 913 pets registered against an estimated few lakhs of pet dogs.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2C1A0E] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E8600A]/20 rounded-full blur-3xl" />
              <div className="relative">
                <div className="text-[#F4E4CF]/30 text-xs font-mono uppercase tracking-wider mb-1">Non-compliance fine · MCD</div>
                <div className="text-6xl md:text-7xl font-black text-[#FF8C3A]">₹500+</div>
                <div className="text-[#F4E4CF]/40 text-sm mt-1">Fines escalating with each MCD enforcement drive</div>
                <div className="mt-6 space-y-3">
                  {[
                    { icon: 'alert', text: 'Pet can be seized by municipal authorities' },
                    { icon: 'id', text: 'No legal proof of ownership without registration' },
                    { icon: 'clock', text: 'MCD portal fee ₹100–500 · 2–4 weeks wait' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                      <div className="w-7 h-7 bg-[#E8600A]/20 rounded flex items-center justify-center flex-shrink-0">
                        {item.icon === 'alert' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        )}
                        {item.icon === 'id' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="M14 14h4M14 10h4M6 14h4" />
                          </svg>
                        )}
                        {item.icon === 'clock' && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[#F4E4CF]/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Register */}
        <section className="py-20 px-4 bg-[#F3EDE0]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">Why Register</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">Four reasons every Delhi pet owner needs this.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Legal Identity & Protection', desc: 'Unique MCD ID — proof of ownership and full legal status. Legally protected at all times.', icon: 'shield' },
                { title: 'Vaccination Tracking', desc: 'Digital vaccination records always up to date. WhatsApp & email reminders before every booster.', icon: 'vaccine' },
                { title: 'Lost Pet Recovery', desc: '3× more likely to be returned if lost or stolen. QR tag links to your pet\'s verified profile.', icon: 'search' },
                { title: 'Travel Certificate', desc: 'Registration certificate required for travelling with your pet on flights, trains and intercity transport.', icon: 'travel' },
              ].map((reason, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-[#2C1A0E]/10">
                  <div className="w-9 h-9 bg-[#FFF0E4] rounded-lg flex items-center justify-center">
                    {reason.icon === 'shield' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                    {reason.icon === 'vaccine' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 3l-4 4M12 6l-3 3M18 9l-3 3M9 2l-3 3M4 7l3 3M7 4l3 3" />
                        <path d="M9 14l-3 3M13 10l-3 3M16 7l-3 3" />
                        <path d="M14 18l-2 2M10 14l-2 2M7 17l-2 2" />
                      </svg>
                    )}
                    {reason.icon === 'search' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <path d="M11 8v3M11 14h.01" />
                      </svg>
                    )}
                    {reason.icon === 'travel' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-[#2C1A0E] font-semibold mt-4 text-sm">{reason.title}</h3>
                  <p className="text-[#7A5C40] text-xs mt-1 leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Needed */}
        <section className="py-20 px-4 bg-[#2C1A0E]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-[#E8600A]/75 text-xs font-medium uppercase tracking-widest">What You'll Need</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#F4E4CF] leading-tight mt-2">
                Four documents.
                <span className="text-[#E8600A] italic block">That's all.</span>
              </h2>
              <p className="text-[#F4E4CF]/40 text-sm max-w-lg mx-auto mt-3">Upload digitally on Tailio — no photocopies, no office visits. We handle the MCD filing for you.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Anti-Rabies Certificate', desc: 'Issued by a registered vet confirming your pet received their anti-rabies vaccine.', details: ["Pet's name, gender & age", 'Vaccination date & due date', "Vet's signature & hospital stamp"], icon: 'certificate' },
                { title: 'Applicant ID Proof', desc: 'Any government-issued photo ID of the pet owner. Must be valid and clearly legible.', details: ['Aadhaar Card', 'PAN Card', 'Passport or Voter ID'], icon: 'id' },
                { title: 'Address Proof', desc: 'Proof you reside in Delhi. Must show your current address clearly.', details: ['Aadhaar Card (serves as both)', 'Electricity or water bill', 'Rental agreement or bank statement'], icon: 'address' },
                { title: 'Photo with Your Pet', desc: 'A clear, recent photo of you with your pet dog. Both faces must be clearly visible.', details: ['Good natural lighting', 'Both owner & pet clearly visible', 'Taken within last 3 months'], icon: 'photo' },
              ].map((doc, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 bg-[#E8600A]/20 rounded-lg flex items-center justify-center">
                      {doc.icon === 'certificate' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4v16h16V4H4z" />
                          <path d="M8 8h8M8 12h6M8 16h4" />
                          <path d="M16 8v8" />
                        </svg>
                      )}
                      {doc.icon === 'id' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="M14 14h4M14 10h4M6 14h4" />
                        </svg>
                      )}
                      {doc.icon === 'address' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {doc.icon === 'photo' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FF8C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      )}
                    </div>
                    <div className="w-6 h-6 bg-[#E8600A] rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                  </div>
                  <h3 className="text-[#F4E4CF] text-lg font-medium mt-4">{doc.title}</h3>
                  <p className="text-[#F4E4CF]/40 text-sm mt-2 leading-relaxed">{doc.desc}</p>
                  <div className="mt-4 space-y-2">
                    {doc.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-[#F4E4CF]/50 text-xs">
                        <div className="w-1 h-1 bg-[#E8600A] rounded-full" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {['JPG', 'PNG', 'PDF'].map((type) => (
                      <span key={type} className="px-2 py-0.5 bg-white/5 rounded text-[#F4E4CF]/30 text-[10px] font-bold">{type}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 bg-[#F3EDE0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">Tailio vs MCD Portal</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
                Or spend a weekend at the
                <span className="text-[#E8600A] italic block">MCD office.</span>
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#2C1A0E] grid grid-cols-3">
                <div className="px-6 py-6"><span className="text-[#F4E4CF]/20 text-[10px] font-mono uppercase tracking-wider">What you get</span></div>
                <div className="px-6 py-5 bg-[#E8600A] text-center"><span className="text-white text-xl font-light italic">Tailio.</span></div>
                <div className="px-6 py-6 text-center"><span className="text-[#F4E4CF]/35 text-[10px] font-mono uppercase tracking-wider">MCD Portal</span></div>
              </div>
              {[
                { label: 'Time to register', sub: 'From start to submission', tailio: 'Under 1 minute', portal: '2–4 weeks' },
                { label: 'Works on your phone', sub: 'No office visit needed', tailio: true, portal: false },
                { label: 'Digital certificate', sub: 'Stored on your profile', tailio: true, portal: false },
                { label: 'Vaccination reminders', sub: 'WhatsApp, SMS & email', tailio: true, portal: false },
                { label: 'Registration cost', sub: 'One-time, all-inclusive', tailio: '₹999', portal: '₹100–500' },
                { label: 'If you wait, the fine is…', sub: 'MCD enforcement active', tailio: 'None', portal: '₹500+' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-[#2C1A0E]/10 last:border-0 bg-[#FFFCF8]">
                  <div className="px-6 py-4">
                    <div className="text-[#2C1A0E] text-sm font-semibold">{row.label}</div>
                    <div className="text-[#7A5C40] text-xs">{row.sub}</div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    {typeof row.tailio === 'string' ? (
                      <span className="text-[#2C1A0E] text-sm font-bold">{row.tailio}</span>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    {typeof row.portal === 'string' ? (
                      <span className={`text-sm ${row.portal === '₹500+' ? 'text-[#A0251E] font-bold' : 'text-[#2C1A0E]'}`}>{row.portal}</span>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">The Process</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
              Three screens.
              <span className="text-[#E8600A] italic"> Sixty seconds.</span>
            </h2>
            <p className="text-[#7A5C40] text-sm max-w-lg mx-auto mt-3">No PDFs, no notarised forms, no office visits. Works on any phone, anywhere in Delhi.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[52px] top-12 bottom-12 w-px bg-gradient-to-b from-[#E8600A] to-[#E8600A]/10" />
            {[
              { num: 1, title: "Register & add your pet's details", desc: "Fill in your pet's name, breed, age and your contact details. Under 60 seconds, works on any phone. No PDFs to download, no notarised forms.", tags: ['Pet name & breed', 'Age & gender', 'Under 60 seconds'] },
              { num: 2, title: 'Upload your 4 documents', desc: 'Upload digitally — JPG, PNG or PDF. No photocopies, no office visit. We handle the MCD filing on your behalf.', tags: ['Anti-Rabies Cert', 'ID + Address Proof', 'Photo with pet'] },
              { num: 3, title: 'We file with MCD. You get your certificate.', desc: 'Tailio submits directly to MCD (Municipal Corporation of Delhi). Your official digital certificate arrives by email within 24–72 hours. No office visit. Ever.', tags: ['Registered in Delhi', 'No office visit', 'Verified'] },
            ].map((step, i) => (
              <div key={i} className="relative pl-0 md:pl-24 mb-8 last:mb-0">
                <div className="hidden md:flex absolute left-0 top-8 w-12 h-12 bg-[#E8600A] rounded-full items-center justify-center shadow-[0_0_0_10px_rgba(232,96,10,0.15),0_0_0_8px_#FAF6EF]">
                  <span className="text-white text-2xl font-black">{step.num}</span>
                </div>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2C1A0E]/10">
                  <div className="flex items-start gap-4">
                    <div className="md:hidden w-8 h-8 bg-[#E8600A] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">{step.num}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#2C1A0E] text-xl font-semibold">{step.title}</h3>
                      <p className="text-[#7A5C40] text-sm mt-2 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {step.tags.map((tag, j) => (
                          <span key={j} className={`px-3 py-1 rounded-full text-xs font-semibold border ${step.num === 1 ? 'bg-[#E6F6ED] text-[#1A6B3A] border-[#A8DDB8]' : step.num === 2 && j === 0 ? 'bg-[#EEF4FF] text-[#2653A0] border-[#B3CEFF]' : 'bg-[#F3EDE0] text-[#7A5C40] border-[#2C1A0E]/20'}`}>{tag}</span>
                        ))}
                      </div>
                      {step.num === 3 && (
                        <div className="mt-6 bg-[#2C1A0E] rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 bg-[#E8600A]/20 rounded-full px-3 py-1">
                              <div className="w-1.5 h-1.5 bg-[#F4A56A] rounded-full" />
                              <span className="text-[#F4A56A] text-[10px] font-mono uppercase tracking-wider">Certificate issued</span>
                            </div>
                            <div className="text-[#F4E4CF] text-2xl font-bold mt-2">Bruno</div>
                            <div className="text-[#F4E4CF]/35 text-[10px] font-mono tracking-wider">TL-DL-2025-88471</div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {['Registered in Delhi', 'No office visit', 'Verified'].map((tag) => (
                                <span key={tag} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-[#F4E4CF]/60 text-xs">
                                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="w-14 h-14 bg-[#FAF6EF] rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <rect x="7" y="7" width="3" height="3" rx="0.5" />
                              <rect x="14" y="7" width="3" height="3" rx="0.5" />
                              <rect x="7" y="14" width="3" height="3" rx="0.5" />
                              <rect x="14" y="14" width="3" height="3" rx="0.5" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-4 max-w-2xl mx-auto text-center">
          <div className="text-[#E8600A] text-lg tracking-[3px] mb-4">★★★★★</div>
          <blockquote className="text-[#2C1A0E] text-2xl font-bold italic leading-relaxed">
            "I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"
          </blockquote>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-10 h-10 bg-[#E8600A] rounded-full flex items-center justify-center text-white font-bold">P</div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[#2C1A0E] font-semibold">Priya Sharma</span>
                <span className="px-2 py-0.5 bg-[#FFF0E4] rounded-full text-[#C04E06] text-xs font-semibold border border-[#FFCCA0]">🐾 Bruno</span>
              </div>
              <div className="text-[#7A5C40] text-xs">Dwarka, Delhi</div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 bg-[#2C1A0E]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-[#E8600A]/75 text-xs font-medium uppercase tracking-widest mb-2">One Price. Everything Included.</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#F4E4CF] leading-tight">
              Done. You're at the
              <span className="text-[#E8600A] italic block">end of the path.</span>
            </h2>
            <p className="text-[#F4E4CF]/40 text-sm mt-3 max-w-lg mx-auto">Sixty seconds from here to legally issued. Certificate valid with MCD.</p>
            <div className="mt-12 bg-white/5 rounded-2xl p-8 md:p-10 border border-[#E8600A]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8600A]/20 rounded-full blur-3xl" />
              <div className="inline-flex items-center gap-2 bg-[#FFF4E4] rounded-full px-3 py-1 border border-[#FFCCA0] relative z-10">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#B85C00" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span className="text-[#B85C00] text-xs font-semibold">Launch Offer — Save ₹1,000</span>
              </div>
              <div className="relative z-10 mt-6">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[#E8600A] text-4xl font-black">₹</span>
                  <span className="text-[#E8600A] text-6xl font-black">999</span>
                </div>
                <div className="text-[#F4E4CF]/30 text-sm line-through">Regular price ₹1,999</div>
                <div className="text-[#F4E4CF]/40 text-xs mt-1">Per pet · Valid 1 year · All taxes inclusive · MCD accepted</div>
              </div>
              <div className="mt-8 space-y-3 text-left relative z-10">
                {[
                  'MCD Municipal Filing — all paperwork end to end',
                  'Official Govt Certificate — delivered within 24–72 hrs',
                  'Vaccination Tracker — digital records + auto-reminders',
                  'Renewal Reminders — WhatsApp & email before expiry',
                  'Legal Pet Profile — proof of ownership always on record'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <div className="w-6 h-6 bg-[#E8600A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#F4A56A" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#F4E4CF]/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                className="w-full mt-8 bg-[#E8600A] hover:bg-[#d45408] text-white py-4 rounded-full text-lg font-bold shadow-[0_4px_0_#C04E06] border-2 border-[#C04E06] transition-colors relative z-10"
                aria-label="Register your pet with MCD Delhi now for ₹999"
              >
                Register Your Pet — ₹999 →
              </button>
              <div className="flex flex-wrap justify-center gap-6 mt-4 relative z-10">
                {['Secure payment', 'Legally valid', '24–72 hr approval'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#F4E4CF/30" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    <span className="text-[#F4E4CF]/30 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#E8600A] text-xs font-medium uppercase tracking-widest">Common Questions</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#2C1A0E] leading-tight mt-2">
              Everything about Delhi
              <span className="text-[#E8600A] italic block">registration.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Is pet registration really mandatory in Delhi?', a: "Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCD (Municipal Corporation of Delhi) to enforce mandatory pet registration across Delhi. The Supreme Court of India's August 2025 order directed MCD to enforce mandatory registration for all pet animals across Delhi. Fines start at ₹500 and escalate with every enforcement drive." },
              { q: "Is Tailio's registration legally valid in Delhi?", a: 'Yes, Tailio is an authorized platform that files directly with MCD. Your certificate is officially issued by the municipal corporation and is fully valid.' },
              { q: 'What is the fine for not registering in Delhi?', a: 'The fine for non-compliance starts at ₹500 and escalates with every MCD enforcement drive. Pet owners can also face pet seizure by municipal authorities.' },
              { q: 'What documents do I need to register?', a: 'You need four documents: Anti-Rabies Certificate, Applicant ID Proof, Address Proof, and a Photo with Your Pet.' },
              { q: 'How much does registration cost on Tailio?', a: 'Registration costs ₹999 one-time, all-inclusive. This includes the MCD filing fee and your official digital certificate.' },
              { q: 'How long does it take to get the certificate?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#2C1A0E]/20 overflow-hidden">
                <div className="px-5 py-4 flex justify-between items-center">
                  <span className="text-[#2C1A0E] font-semibold text-sm md:text-base">{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 bg-[#F3EDE0] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer/>
      </main>
    </>
  );
}