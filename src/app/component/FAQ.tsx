// app/components/FAQ.tsx
'use client';

import { useState } from 'react';

const faqs = [
  { question: "Is pet registration really mandatory in Delhi NCR?", answer: "Yes. The Supreme Court of India, through the Animal Birth Control (ABC) Rules 2023 and a landmark order in August 2025, directed all municipal corporations across Delhi NCR to enforce mandatory pet registration for all pet animals — not just dogs." },
  { question: "Is Tailio's registration legally valid?", answer: "Yes. Tailio files directly with your municipality — MCD (Delhi), Noida Authority, GMC (Ghaziabad), or Gurugram — on your behalf. The certificate you receive is an official government-issued document, valid across all Delhi NCR municipalities." },
  { question: "What documents do I need to register?", answer: "Four documents: (1) Anti-Rabies Vaccination Certificate issued by a registered vet, (2) Applicant ID proof — Aadhaar, PAN, Passport or Voter ID, (3) Address proof showing you reside in Delhi, Noida, Ghaziabad or Gurugram, and (4) A recent photograph of you with your pet dog where both faces are clearly visible." },
  { question: "How much does registration cost on Tailio?", answer: "₹999 one-time, all-inclusive. This covers municipal filing, the official certificate, vaccination tracker, and renewal reminders. No hidden charges. GST included. Currently available at a launch offer — regular price is ₹1,999." },
  { question: "Can I register cats and other pets — not just dogs?", answer: "Currently Tailio is built for dog registration in compliance with Delhi NCR municipal requirements. Registration for cats and other pets is coming soon as municipal rules expand." },
  { question: "What happens if I don't register?", answer: "Fines start at ₹500 in Delhi, ₹5,000 in Ghaziabad, and go up to ₹10,000 in Noida — with enforcement actively underway. Municipal authorities also have the power to seize an unregistered pet with no legal recourse for the owner since an unregistered pet has no legal standing" }
];

export default function FAQ() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-20 px-4">
      <div className="text-center mb-10">
        <button className="bg-[#FFDBB8] py-[5px] px-[13px] rounded-[999px] mb-4">
          <span className="text-[#D96F28] text-xs font-bold">Common questions</span>
        </button>
        <h2 className="text-[#2C1A0E] text-[28px] md:text-[40px] font-black">Everything you want to know</h2>
        <p className="text-[#6B3A1F] text-base font-normal mt-2">If it's not here, our support team responds in under 2 hours.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFaq(index)}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <span className="text-[#2C1A0E] text-sm md:text-base font-bold pr-4">{faq.question}</span>
              <span className="text-[#FF8C42] text-3xl md:text-4xl font-bold flex-shrink-0">
                {faqOpen === index ? '−' : '+'}
              </span>
            </button>
            {faqOpen === index && (
              <p className="text-[#6B3A1F] text-sm font-normal mt-2 pl-4 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}