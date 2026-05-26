"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-12 px-4 md:px-12"
  >
    {children}
  </motion.section>
);

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    { question: "Is pet registration really mandatory in Delhi NCR?", answer: "Yes, the Supreme Court of India has mandated pet registration across all municipal limits in Delhi NCR. Non-compliance can result in fines up to ₹10,000." },
    { question: "Is Tailio's registration legally valid?", answer: "Absolutely! Tailio handles the official municipal filing for you. Your registration is processed through the appropriate government authorities and you receive a legally valid certificate." },
    { question: "What documents do I need to register?", answer: "You'll need: 1) Anti-Rabies Vaccination Certificate, 2) Applicant ID Proof (Aadhaar/PAN/Passport), 3) Applicant Address Proof, 4) Photograph with your pet dog." },
    { question: "How much does registration cost on Tailio?", answer: "₹1,999/- all inclusive. This covers your complete pet registration filing, certificate, and everything in between. No hidden charges." },
    { question: "Can I register cats and other pets — not just dogs?", answer: "Currently, we support dog registration as mandated by the Supreme Court. Support for cats and other pets is coming soon!" },
    { question: "What happens if I don't register?", answer: "You risk paying fines up to ₹10,000, your pet may be seized in disputes, and you won't have legal proof of ownership." }
  ];

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden font-['Nunito']">

      {/* Hero Section */}
      <div className="bg-[#FFF3E0] pt-[100px] relative">
        <div className="max-w-[1200px] mx-auto relative flex items-center justify-between px-8">

          {/* Left Content */}
          <div className="flex-1 max-w-[55%]">
            {/* Supreme Court Button */}
            <button className="flex items-center bg-[#2C1A0E] text-left py-2 px-4 mb-4 gap-1 rounded-[999px] border-0 hover:bg-[#3d2a1c] transition-colors">
              <span className="text-[#FFF3E0] text-[12px] font-normal">Supreme Court of India has mandated pet registration</span>
              <span className="text-[#FFDBB8] text-[12px] font-normal">— Comply before it's too late</span>
            </button>

            {/* Hero Title */}
            <h1 className="text-[#2C1A0E] text-[56px] font-black leading-tight mb-4 tracking-[-1px]">
              Your pet deserves<br />an identity.<br />the law requires.
            </h1>

            {/* Hero Description */}
            <p className="text-[#6B3A1F] text-[15px] font-normal mb-6 leading-relaxed">
              Register your pet in just 1 minute - get a verified digital<br />ID, vaccination records, and full legal compliance. Trusted by<br />pet parents across Delhi NCR.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center mb-8 gap-4">
              <button className="bg-[#FF8C42] text-left py-3 px-6 rounded-[14px] border-0 text-white text-[14px] font-bold shadow-[0px_4px_20px_#FF8C4257] hover:bg-[#e07a2e] transition-colors">
                Register Your Pet →
              </button>
              <button className="bg-white text-left py-3 px-6 rounded-[14px] border-2 border-solid border-[#F0D5B8] text-[#6B3A1F] text-[14px] font-bold hover:bg-[#FFF3E0] transition-colors">
                Why it matters
              </button>
            </div>

            {/* Statistics Row */}
            <div className="flex items-start gap-10">
              <div>
                <span className="text-[#D96F28] text-[36px] font-black block leading-none">&gt;90%</span>
                <span className="text-[#A07050] text-[13px] font-normal block mt-1 w-[90px]">Pets in Delhi<br />are unregistered</span>
              </div>
              <div>
                <span className="text-[#D96F28] text-[36px] font-black block leading-none">₹10K</span>
                <span className="text-[#A07050] text-[13px] font-normal block mt-1 w-[90px]">Fine for<br />non-compliance</span>
              </div>
              <div>
                <span className="text-[#D96F28] text-[36px] font-black block leading-none">1 min</span>
                <span className="text-[#A07050] text-[13px] font-normal block mt-1 w-[90px]">To register<br />on Tailio</span>
              </div>
              <div>
                <span className="text-[#D96F28] text-[36px] font-black block leading-none">33M+</span>
                <span className="text-[#A07050] text-[13px] font-normal block mt-1 w-[90px]">Pet dogs<br />in India</span>
              </div>
            </div>
          </div>

          {/* Right Image - Girl with dog */}
          <div className="flex-shrink-0">
            <img
              src="/images/banner.png"
              alt="Girl with dog"
              className="w-[380px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* It's the law now button */}
      <button className="flex flex-col items-start bg-[#FFDBB8] text-left py-1 px-3.5 mb-3.5 ml-[850px] rounded-[999px] border-0 hover:bg-[#f0c896] transition-colors">
        <span className="text-[#D96F28] text-xs font-bold">It's the law now</span>
      </button>

      {/* Main Content Area */}
      <div className="flex items-start max-w-[1213px] mb-[61px] mx-auto gap-[37px]">
        {/* Left Column */}
        <div className="flex-1 flex-col items-start mt-[17px]">

          {/* Why Registration Matters - relative container for the floating badge */}
          <div className="relative pt-8">
            {/* >90% floating badge - top-right, overlapping the card */}
            <div className="absolute -top-6 right-0 z-10">
              <div className="bg-[#FF8C42] py-[15px] px-[19px] rounded-2xl shadow-[0px_8px_32px_#D96F2840]">
                <span className="text-white text-[28px] font-black block leading-none">&gt; 90%</span>
                <span className="text-white text-xs font-normal w-[113px] block mt-1">Pets Unregistered in Delhi NCR.</span>
              </div>
            </div>

            {/* Why Registration Matters Card */}
            <div className="bg-white pt-[35px] pb-[35px] pl-[33px] pr-[33px] rounded-3xl border border-solid border-[#F8EDE0] shadow-[0px_8px_32px_#D96F281F]">
              <div className="text-left mb-[15px]">
                <span className="text-[#A07050] text-[13px] font-bold uppercase tracking-wide">Why Registration Matters</span>
              </div>
              <div className="flex items-start mb-4 gap-3">
                <div className="bg-[#FFFAF4] py-[18px] pl-[17px] pr-[20px] rounded-[14px] border border-solid border-[#F8EDE0] flex-1">
                  <img src="/images/document.png" alt="Legal" className="w-6 h-6 mb-2.5" />
                  <span className="text-[#2C1A0E] text-sm font-bold block mb-[5px]">Legal Identity and Protection</span>
                  <span className="text-[#A07050] text-xs font-normal">Your pet gets a unique ID : Proof of ownership and legal status and helps to protect them.</span>
                </div>
                <div className="bg-[#FFFAF4] py-[18px] px-[17px] rounded-[14px] border border-solid border-[#F8EDE0] flex-1">
                  <img src="/images/vaccine.png" alt="Vaccination" className="w-6 h-6 mb-2.5" />
                  <span className="text-[#2C1A0E] text-sm font-bold block mb-[5px]">Vaccination Tracking</span>
                  <span className="text-[#A07050] text-xs font-normal">Digital health records ensure your pet's vaccines are always up-to-date.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#FFFAF4] pt-[19px] pb-[19px] px-[17px] rounded-[14px] border border-solid border-[#F8EDE0] flex-1">
                  <img src="/images/search.png" alt="Recovery" className="w-6 h-6 mb-2.5" />
                  <span className="text-[#2C1A0E] text-sm font-bold block mb-[5px]">Lost Pet Recovery</span>
                  <span className="text-[#A07050] text-xs font-normal">A registered pet is 3x more likely to be returned if lost or stolen.</span>
                </div>
                <div className="bg-[#FFFAF4] py-[18px] pl-[17px] pr-[17px] rounded-[14px] border border-solid border-[#F8EDE0] flex-1">
                  <img src="/images/shield.png" alt="Travel" className="w-6 h-6 mb-2.5" />
                  <span className="text-[#2C1A0E] text-sm font-bold block mb-[5px]">Crucial for Travel</span>
                  <span className="text-[#A07050] text-xs font-normal">Pet registration certificate is required for traveling with your fur baby</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex-col items-start">
          <div className="mb-[19px]">
            <span className="text-[#2C1A0E] text-4xl font-black">Pet registration isn't optional<br />anymore</span>
          </div>
          <div className="mb-[27px]">
            <span className="text-[#6B3A1F] text-[15px] font-normal leading-relaxed">
              The Supreme Court of India, through the Animal Birth Control (ABC) Rules 2023 and subsequent orders, has directed all municipal corporations in Delhi-NCR to enforce mandatory pet registration. Here's what you need to know:
            </span>
          </div>

          {/* Info Items */}
          <div className="flex items-start mb-4 gap-3.5">
            <div className="bg-[#FFF0E4] rounded-[10px] p-2 flex-shrink-0">
              <img src="/images/supreme-court.png" alt="Court" className="w-9 h-9 rounded-[10px]" />
            </div>
            <div>
              <span className="text-[#2C1A0E] text-[15px] font-bold block">Mandated by the Supreme Court</span>
              <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">The ABC Rules 2023 and the Supreme Court's landmark August 2025 order directed Delhi-NCR authorities to enforce registration for all pet animals — not just dogs.</span>
            </div>
          </div>

          <div className="flex items-start mb-4 gap-3.5">
            <div className="bg-[#FFF0E4] rounded-[10px] p-2 flex-shrink-0">
              <img src="/images/bacteria.png" alt="Rabies" className="w-8 h-8 rounded-[10px]" />
            </div>
            <div>
              <span className="text-[#2C1A0E] text-[15px] font-bold block">India accounts for 36% of global rabies deaths</span>
              <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">Pet registration ensures vaccination compliance, directly reducing the risk of rabies transmission in urban areas like Delhi NCR.</span>
            </div>
          </div>

          <div className="flex items-start mb-4 gap-3.5">
            <div className="bg-[#FFF0E4] rounded-[10px] p-2 flex-shrink-0">
              <img src="/images/dog-icon.png" alt="Stray" className="w-7 h-7 rounded-[10px]" />
            </div>
            <div>
              <span className="text-[#2C1A0E] text-[15px] font-bold block">Unregistered pets contribute to stray population</span>
              <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">Abandoned unregistered pets are a leading cause of Delhi's stray dog problem. Registration creates accountability for every pet owner.</span>
            </div>
          </div>

          {/* Digital ID - moved into right column as per design */}
          <div className="flex items-start gap-3.5">
            <div className="bg-[#FFF0E4] rounded-[10px] p-2 flex-shrink-0">
              <img src="/images/smartphone.png" alt="Digital ID" className="w-[29px] h-[29px] rounded-[10px]" />
            </div>
            <div>
              <span className="text-[#2C1A0E] text-[15px] font-bold block">Digital ID = better care</span>
              <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">A registered pet has a verified health history that any vet can access — making emergency care faster and more accurate.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Banner */}
      <div className="flex items-center bg-[#FFF3E0] max-w-[1430px] py-[37px] px-[168px] mx-auto rounded-xl">
        <div className="flex-1 text-center">
          <span className="text-[#D96F28] text-[40px] font-black">~913</span>
          <p className="text-[#6B3A1F] text-sm font-normal mt-1">Registered dogs in<br />Delhi municipality</p>
          <p className="text-[#A07050] text-[11px] font-normal mt-1">vs. estimated lakhs of pet dogs</p>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[#D96F28] text-[40px] font-black">&lt;10%</span>
          <p className="text-[#6B3A1F] text-sm font-normal mt-1">Pet owners who<br />have registered</p>
          <p className="text-[#A07050] text-[11px] font-normal mt-1">Study, East Delhi urban colony</p>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[#D96F28] text-[40px] font-black">86%</span>
          <p className="text-[#6B3A1F] text-sm font-normal mt-1">Pet owners unaware<br />their pet can spread rabies</p>
          <p className="text-[#A07050] text-[11px] font-normal mt-1">PMC / UCMS study, Delhi</p>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[#D96F28] text-[40px] font-black">36%</span>
          <p className="text-[#6B3A1F] text-sm font-normal mt-1">Global rabies deaths<br />happen in India</p>
          <p className="text-[#A07050] text-[11px] font-normal mt-1">WHO / Supreme Court records</p>
        </div>
      </div>

      {/* Fines Section */}
      <div className="bg-[#2C1A0E] max-w-[1437px] pt-[72px] mb-[241px] mx-auto rounded-2xl">
        <div className="max-w-[1143px] mx-auto">
          <div className="text-center mb-[25px]">
            <button className="bg-[#FF8C4233] py-[5px] px-3.5 rounded-[999px] mb-2">
              <span className="text-[#FFDBB8] text-xs font-bold">Know the fines</span>
            </button>
            <h2 className="text-[#FFF3E0] text-[40px] font-black">Ignore Registration</h2>
            <h2 className="text-[#FFF3E0] text-[40px] font-black mb-[19px]">Pay the Penalty</h2>
            <p className="text-[#C4906A] text-base font-normal mb-[23px]">Municipal corporations are actively enforcing registration. These are the<br />current fines across Delhi NCR.</p>
          </div>

          {/* Fines Grid */}
          <div className="flex gap-[50px] justify-center">
            {[
              { city: "Gurugram", fine: "₹500", desc: "Registration encouraged strongly. Fines to be announced — act now." },
              { city: "Delhi", fine: "₹500+", desc: "Fee enforcement underway. Fines escalating with each MCD drive." },
              { city: "Noida", fine: "₹10,000", desc: "Highest fine in NCR. Noida authority actively penalising non-compliance." },
              { city: "Ghaziabad", fine: "₹5,000", desc: "Registration fee raised from ₹200 to ₹1,000 in April 2024." }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 bg-[#FFFFFF0D] py-[23px] rounded-2xl border border-solid border-[#FFF3E01A] text-center">
                <span className="text-[#FFDBB8] text-xs font-bold">{item.city}</span>
                <img src={`/images/${item.city.toLowerCase()}.png`} className="w-[88px] h-[54px] mx-auto my-2" />
                <span className="text-[#FF8C42] text-xl font-black block">{item.fine}</span>
                <p className="text-[#FFF3E0] text-xs font-normal px-4 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-[#FFDBB8] pt-[19px] px-6 mb-[45px] rounded-[14px] border border-black max-w-4xl mx-auto mt-8">
          <h3 className="text-[#2C1A0E] text-[32px] font-black mb-[11px]">Without proper Registration, <br />Your pet may not be legally protected during disputes.</h3>
          <p className="text-[#6B3A1F] text-base font-normal mb-3.5">In disputes or complaints, municipal authorities may seize your pet.</p>
          <button className="bg-[#D96F28] text-left py-2.5 px-5 rounded-lg mb-3 hover:bg-[#c05a1a] transition-colors">
            <span className="text-[#FFDBB8] text-sm font-bold">Start Registration →</span>
          </button>
        </div>
      </div>

      {/* Tailio vs Municipal Portal */}
      <div className="max-w-[1079px] mx-auto mb-[59px] text-center">
        <button className="bg-[#FFDBB8] py-[5px] px-3.5 mb-3 rounded-[999px]">
          <span className="text-[#D96F28] text-xs font-bold">Tailio vs Municipal Portal</span>
        </button>
        <h2 className="text-[#2C1A0E] text-[40px] font-black mb-4">Why register through Tailio<br />instead of going directly?</h2>
        <p className="text-[#6B3A1F] text-base font-normal">Both paths lead to legal registration. But only one is designed for humans — and their pets.</p>
      </div>

      {/* Comparison Table */}
      <div className="max-w-[1025px] mx-auto mb-[29px]">
        <div className="flex items-stretch">
          <div className="flex-1 text-center border-b border-[#F8EDE0] pb-2">
            <span className="text-[#2C1A0E] text-[17px] font-bold">Municipal Corporation Portal</span>
            <p className="text-[#A07050] text-xs font-normal">Direct government registration</p>
          </div>
          <div className="px-4 flex items-center">
            <span className="text-[#A07050] text-[13px] font-bold">VS</span>
          </div>
          <div className="flex-1 bg-[#FF8C42] py-[22px] pl-[26px] rounded-2xl">
            <span className="text-white text-[17px] font-bold">Tailio Platform</span>
            <p className="text-white text-xs font-normal">Smart, digital-first registration</p>
          </div>
        </div>
      </div>

      {/* Comparison Points */}
      <div className="max-w-4xl mx-auto space-y-4 mb-[115px]">
        {[
          { gov: "Multiple office visits required. Physical forms, queues, and manual submission.", tailio: "100% online. Register from your phone in just 1 minute, from anywhere." },
          { gov: "No digital record. Paper certificate that can be lost, damaged, or misplaced.", tailio: "Digital certificate + QR code stored on your profile, always accessible." },
          { gov: "No reminders. Miss your annual renewal and risk a fine.", tailio: "Automatic renewal reminders via WhatsApp, SMS, and email — never miss a date." },
          { gov: "No vaccination tracking. You manage records manually on your own.", tailio: "Vaccination tracker built-in — schedule, record, and share with any vet." },
          { gov: "Slow processing. Approval can take days to weeks.", tailio: "Approval. Registration processed and confirmed within 24 - 72 hours." },
          { gov: "No pet profile. No searchable ID if your pet goes missing.", tailio: "Lost pet QR system. Anyone who scans your pet's tag can contact you instantly." }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start justify-between gap-8">
            <div className="flex items-start gap-3 w-1/2">
              <img src="/images/wrong.png" className="w-4 h-4 shrink-0 mt-0.5" alt="❌" />
              <span className="text-[#2C1A0E] text-[13px] font-bold leading-relaxed">{item.gov}</span>
            </div>
            <div className="flex items-start gap-3 w-1/2">
              <img src="/images/correct.png" className="w-4 h-4 shrink-0 mt-0.5" alt="✅" />
              <span className="text-[#2C1A0E] text-[13px] font-bold leading-relaxed">{item.tailio}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Steps */}
      <div className="text-center mb-12">
        <button className="bg-[#FFDBB8] py-[5px] px-3.5 rounded-[999px] mb-3">
          <span className="text-[#D96F28] text-xs font-bold">Simple & fast</span>
        </button>
        <h2 className="text-[#2C1A0E] text-[40px] font-black mb-4">Register in 2 easy steps</h2>
        <p className="text-[#6B3A1F] text-base font-normal">We've made government compliance as easy as ordering food online.</p>
      </div>

      <div className="flex justify-center gap-[23px] mb-[73px]">
        <div className="bg-white pt-[29px] px-[21px] rounded-[20px] border border-solid border-[#F8EDE0] text-center w-80">
          <button className="bg-[#FF8C42] py-[9px] px-4 rounded-[22px] mb-1.5 shadow-[0px_4px_12px_#FF8C424D]">
            <span className="text-white text-lg font-bold">1</span>
          </button>
          <img src="/images/user.png" className="w-[30px] h-[30px] mx-auto my-4" />
          <h3 className="text-[#2C1A0E] text-base font-bold mb-2">Create your account</h3>
          <p className="text-[#A07050] text-[13px] font-normal mb-4">Sign up with your mobile number or<br />email. Takes 30 seconds.</p>
          <span className="text-[#D96F28] text-[11px] font-bold">⏱ 30 seconds</span>
        </div>
        <div className="bg-white py-[31px] px-[21px] rounded-[20px] border border-solid border-[#F8EDE0] text-center w-80">
          <button className="bg-[#FF8C42] py-[9px] px-4 rounded-[22px] mb-1.5 shadow-[0px_4px_12px_#FF8C424D]">
            <span className="text-white text-lg font-bold">2</span>
          </button>
          <img src="/images/upload-doc.png" className="w-8 h-[27px] mx-auto my-4" />
          <h3 className="text-[#2C1A0E] text-base font-bold mb-2">Upload documents</h3>
          <p className="text-[#A07050] text-[13px] font-normal mb-4">Vaccination proof + your ID. We<br />handle the municipal filing for you.</p>
          <span className="text-[#D96F28] text-[11px] font-bold">30 Seconds</span>
        </div>
      </div>

      {/* Documents Section */}
      <div className="text-center mb-[47px]">
        <button className="bg-[#FFF0E4] py-1.5 px-3.5 gap-[7px] rounded-[99px] border border-solid border-[#F0D5B8] inline-flex items-center">
          <span className="text-[#D96F28] text-xs font-bold">4 documents needed</span>
        </button>
      </div>

      <div className="text-center mb-[11px]">
        <h2 className="text-[#2C1A0E] text-4xl font-black">Keep these 5 documents ready.<br />That's all we need.</h2>
      </div>
      <div className="text-center mb-[52px]">
        <p className="text-[#A07050] text-[15px] font-normal">Upload them digitally on Tailio — no photocopies, no office visits. We handle the rest with your municipality.</p>
      </div>

      {/* Documents Cards - First Row */}
      <div className="flex gap-4 max-w-[1358px] mx-auto mb-3">
        <div className="flex-1 bg-white pt-[1px] rounded-[18px] border border-solid border-[#F0D5B8]">
          <div className="bg-[#FF8C42] h-[3px] rounded-tl-[18px] rounded-tr-[18px]" />
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <img src="/images/something.png" className="w-[26px] h-[26px]" />
              <button className="bg-[#2C1A0E] py-1 px-2.5 rounded-[14px] text-[#FFDBB8] text-[13px] font-bold">1</button>
            </div>
            <h3 className="text-[#2C1A0E] text-[17px] font-bold mb-2">Anti-Rabies Vaccination Certificate</h3>
            <p className="text-[#A07050] text-sm font-normal mb-4">Issued by a registered veterinary practitioner or hospital, confirming your pet has received their anti-rabies vaccine.</p>
            <p className="text-[#C4906A] text-[11px] font-bold mb-2">Must include</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Pet's name, gender, and Age</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Vaccination date & due date</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Vet's signature & hospital stamp</span></li>
            </ul>
            <div className="flex gap-1.5">
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">JPG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PNG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PDF</button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white pt-[1px] rounded-[18px] border border-solid border-[#F0D5B8]">
          <div className="bg-[#FF8C42] h-[3px] rounded-tl-[18px] rounded-tr-[18px]" />
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <img src="/images/id.png" className="w-[26px] h-[26px]" />
              <button className="bg-[#2C1A0E] py-1 px-2.5 rounded-[14px] text-[#FFDBB8] text-[13px] font-bold">2</button>
            </div>
            <h3 className="text-[#2C1A0E] text-[17px] font-bold mb-2">Applicant ID Proof</h3>
            <p className="text-[#A07050] text-sm font-normal mb-4">Any government-issued photo identity document of the pet owner. Must be valid and clearly legible.</p>
            <p className="text-[#C4906A] text-[11px] font-bold mb-2">Accepted documents</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Aadhaar Card</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">PAN Card</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Passport or Voter ID</span></li>
            </ul>
            <div className="flex gap-1.5">
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">JPG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PNG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Cards - Second Row */}
      <div className="flex gap-4 max-w-[1358px] mx-auto mb-3">
        <div className="flex-1 bg-white pt-[1px] rounded-[18px] border border-solid border-[#F0D5B8]">
          <div className="bg-[#FF8C42] h-[3px] rounded-tl-[18px] rounded-tr-[18px]" />
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <img src="/images/location.png" className="w-[26px] h-[26px]" />
              <button className="bg-[#2C1A0E] py-1 px-2.5 rounded-[14px] text-[#FFDBB8] text-[13px] font-bold">3</button>
            </div>
            <h3 className="text-[#2C1A0E] text-[17px] font-bold mb-2">Applicant Address Proof</h3>
            <p className="text-[#A07050] text-sm font-normal mb-4">Proof that you reside in Delhi, Noida, Ghaziabad or Gurugram. Must show your current address clearly.</p>
            <p className="text-[#C4906A] text-[11px] font-bold mb-2">Accepted documents</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Aadhaar Card (serves as both)</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Electricity or water bill</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Rental agreement or bank statement</span></li>
            </ul>
            <div className="flex gap-1.5">
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">JPG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PNG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PDF</button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white pt-[1px] rounded-[18px] border border-solid border-[#F0D5B8]">
          <div className="bg-[#FF8C42] h-[3px] rounded-tl-[18px] rounded-tr-[18px]" />
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <img src="/images/photograph.png" className="w-[26px] h-[26px]" />
              <button className="bg-[#2C1A0E] py-1 px-2.5 rounded-[14px] text-[#FFDBB8] text-[13px] font-bold">4</button>
            </div>
            <h3 className="text-[#2C1A0E] text-[17px] font-bold mb-2">Photograph with Your Pet Dog</h3>
            <p className="text-[#A07050] text-sm font-normal mb-4">A clear, recent photograph of you (the applicant) together with your pet dog. Both faces must be visible.</p>
            <p className="text-[#C4906A] text-[11px] font-bold mb-2">Photo guidelines</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Good natural lighting</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Both owner & pet clearly visible</span></li>
              <li className="flex items-center gap-2"><div className="bg-[#FF8C42] w-1.5 h-1.5 rounded-[3px]" /><span className="text-[#6B3A1F] text-[13px] font-bold">Recent — taken within last 3 months</span></li>
            </ul>
            <div className="flex gap-1.5">
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">JPG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PNG</button>
              <button className="bg-[#FFF0E4] py-[3px] px-[11px] rounded-[99px] border border-solid border-[#F0D5B8] text-[#D96F28] text-[11px] font-bold">PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* One Form for You Section */}
      <div className="flex gap-6 max-w-[1365px] mx-auto mb-[63px]">
        <div className="flex-1 bg-[#FF8C42] py-[71px] pr-6 rounded-[14px]">
          <h2 className="text-white text-4xl font-black mb-[18px] ml-[22px]">Just One Form for You. <br />Everything else? On Us.</h2>
          <p className="text-white text-[17px] font-bold mb-[23px] ml-6">Register your pet in under 1 minute. Upload everything digitally — no printouts, no queues.</p>
          <button className="bg-white text-left py-2.5 px-[19px] ml-6 rounded-lg text-[#D96F28] text-sm font-bold hover:bg-gray-100 transition-colors">
            Start Registration →
          </button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#2C1A0E] max-w-[1438px] pt-[52px] mx-auto rounded-[20px] shadow-[0px_4px_4px_#FF8D28] mb-[243px]">
        <div className="flex justify-between items-start px-6">
          <div>
            <button className="bg-[#FF8C4226] py-1.5 px-[15px] mb-[43px] rounded-[99px] border border-solid border-[#FF8C4240]">
              <span className="text-[#FFDBB8] text-[10px] font-bold">Simple, transparent pricing</span>
            </button>
            <h2 className="text-[#FF8C42] text-[40px] font-black">One price. <br />Everything included.</h2>
            <p className="text-[#FFF3E0] text-base font-normal mt-4">No hidden charges, no surprise fees. ₹1,999 covers your complete pet registration <br />filing, certificate, and everything in between.</p>
          </div>
          <div className="text-center mt-[55px]">
            <button className="bg-[#FF8C4226] py-1.5 px-[51px] mb-[67px] rounded-[99px] border border-solid border-[#FF8C4240]">
              <span className="text-[#FFDBB8] text-[10px] font-bold">All Inclusive</span>
            </button>
            <span className="text-[#FF8C42] text-9xl font-black">₹1,999/-</span>
          </div>
        </div>

        <div className="flex items-start max-w-[1279px] mx-auto mb-[27px] gap-4">
          <div className="flex-1 text-center bg-[#FFFFFF08] py-[30px] rounded-[14px] border border-solid border-[#FFF3E01A]">
            <h3 className="text-[#FF8C42] text-xl font-bold">Municipal Filing</h3>
            <div className="my-2">
              <img src="/images/office-1.png" className="w-8 h-8 mx-auto" alt="symbol" />
            </div>
            <p className="text-[#FFF3E0] text-sm font-normal mt-2">We handle MCD / Noida Authority / GMC paperwork</p>
          </div>

          <div className="flex-1 text-center bg-[#FFFFFF08] py-8 rounded-[14px] border border-solid border-[#FFF3E01A]">
            <h3 className="text-[#FF8C42] text-xl font-bold">Official certificate</h3>
            <div className="my-2">
              <img src="/images/certificate-1.png" className="w-8 h-8 mx-auto" alt="symbol" />
            </div>
            <p className="text-[#FFF3E0] text-sm font-normal mt-2">Govt-issued, delivered within 24 hrs - 72hrs</p>
          </div>

          <div className="flex-1 text-center bg-[#FFFFFF08] pt-8 rounded-[14px] border border-solid border-[#FFF3E01A]">
            <h3 className="text-[#FF8C42] text-xl font-bold mb-[29px]">Vaccination tracker</h3>
            <div className="my-2">
              <img src="/images/vaccine-1.png" className="w-8 h-8 mx-auto" alt="symbol" />
            </div>
            <p className="text-[#FFF3E0] text-sm font-normal mb-[45px]">Digital records + auto-reminders</p>
          </div>

          <div className="flex-1 text-center bg-[#FFFFFF08] py-[37px] rounded-[14px] border border-solid border-[#FFF3E01A]">
            <h3 className="text-[#FF8C42] text-xl font-bold">Renewal reminders</h3>
            <div className="my-2">
              <img src="/images/reminder.png" className="w-8 h-8 mx-auto" alt="symbol" />
            </div>
            <p className="text-[#FFF3E0] text-sm font-normal mt-2">WhatsApp & email before expiry</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="text-center mb-10">
          <button className="bg-[#FFDBB8] py-[5px] px-[13px] rounded-[999px] mb-4">
            <span className="text-[#D96F28] text-xs font-bold">Common questions</span>
          </button>
          <h2 className="text-[#2C1A0E] text-[40px] font-black">Everything you want to know</h2>
          <p className="text-[#6B3A1F] text-base font-normal mt-2">If it's not here, our support team responds in under 2 hours.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full text-left py-2"
              >
                <span className="text-[#2C1A0E] text-base font-bold">{faq.question}</span>
                <span className="text-[#FF8C42] text-4xl font-bold">{faqOpen === index ? '−' : '+'}</span>
              </button>
              {faqOpen === index && (
                <p className="text-[#6B3A1F] text-sm font-normal mt-2 pl-4 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-[#D96F28] to-[#FF8C42] max-w-[1438px] py-[50px] mx-auto rounded-2xl mb-[21px]">
        <div className="text-center">
          <h2 className="text-white text-[42px] font-black">One Form<br />One Minute<br />One Year of Security !!</h2>
          <p className="text-white text-base font-normal mt-6">Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad & Gurugram who are already compliant.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-[1281px] mx-auto mb-[37px]">
        <div className="flex items-start gap-8">
          <div>
            <img src="/images/tailio.png" className="w-[260px] h-[260px] mb-2" />
            <p className="text-[#D96F28] text-sm font-normal">Making pet registration simple, digital,<br />and stress-free across Delhi NCR.</p>
          </div>
          <div className="flex-1" />
          <div>
            <h4 className="text-[#FF8C42] text-xs font-bold mb-[17px]">Platform</h4>
            <ul className="space-y-3">
              <li className="text-[#FF8C42] text-sm font-normal">Pet Registration</li>
              <li className="text-[#FF8C42] text-sm font-normal">Digital Pet ID</li>
              <li className="text-[#FF8C42] text-sm font-normal">Vaccination Tracker</li>
              <li className="text-[#FF8C42] text-sm font-normal">Lost Pet QR</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#FF8C42] text-xs font-bold mb-[17px]">Cities</h4>
            <ul className="space-y-3">
              <li className="text-[#FF8C42] text-sm font-normal">Delhi</li>
              <li className="text-[#FF8C42] text-sm font-normal">Noida</li>
              <li className="text-[#FF8C42] text-sm font-normal">Ghaziabad</li>
              <li className="text-[#FF8C42] text-sm font-normal">Gurugram</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#FF8C42] text-xs font-bold mb-[17px]">Company</h4>
            <ul className="space-y-3">
              <li className="text-[#FF8C42] text-sm font-normal">About Tailio</li>
              <li className="text-[#FF8C42] text-sm font-normal">Privacy Policy</li>
              <li className="text-[#FF8C42] text-sm font-normal">Terms of Service</li>
              <li className="text-[#FF8C42] text-sm font-normal">Contact Us</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}