// app/components/FAQ.tsx
'use client';

import { useState } from 'react';

const faqs = [
  { question: "Is pet registration really mandatory in Delhi NCR?", answer: "Yes, the Supreme Court of India has mandated pet registration across all municipal limits in Delhi NCR. Non-compliance can result in fines up to ₹10,000." },
  { question: "Is Tailio's registration legally valid?", answer: "Absolutely! Tailio handles the official municipal filing for you. Your registration is processed through the appropriate government authorities and you receive a legally valid certificate." },
  { question: "What documents do I need to register?", answer: "You'll need: 1) Anti-Rabies Vaccination Certificate, 2) Applicant ID Proof (Aadhaar/PAN/Passport), 3) Applicant Address Proof, 4) Photograph with your pet dog." },
  { question: "How much does registration cost on Tailio?", answer: "₹999/- all inclusive. This covers your complete pet registration filing, certificate, and everything in between. No hidden charges." },
  { question: "Can I register cats and other pets — not just dogs?", answer: "Currently, we support dog registration as mandated by the Supreme Court. Support for cats and other pets is coming soon!" },
  { question: "What happens if I don't register?", answer: "You risk paying fines up to ₹10,000, your pet may be seized in disputes, and you won't have legal proof of ownership." }
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