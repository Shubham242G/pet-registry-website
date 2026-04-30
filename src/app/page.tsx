"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from "./component/ContactForm";
import Image from 'next/image';

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

// Extended testimonials with the names from your image
const testimonials = [
  { id: 1, name: "Lambo", image: "/images/image6.jpeg" },
  { id: 2, name: "Cheenu", image: "/images/image7.jpeg" },
  { id: 3, name: "Snowy", image: "/images/image8.jpeg" },
  { id: 4, name: "Buddy & Penny", image: "/images/image9.jpeg" },
  { id: 5, name: "Milo", image: "/images/image10.jpeg" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'Tailio' | 'Government'>('Tailio');
  const [sliderIndex, setSliderIndex] = useState(0);
const visibleCount = 3; // shows 3 cards at a time on desktop

  const governmentPoints = [
    'Long queues and wait times',
    'Complicated forms and documentation',
    'Multiple visits required',
    'No digital record or ID',
    'Weeks of processing time',
    'No confirmation tracking',
  ];

  const tailioPoints = [
    'Register in under 2 minutes',
    'We handle all government paperwork',
    'Digital pet ID on your phone',
    'Multi-pet support under one account',
    'No queues, no confusion',
    'Instant confirmation & certificate',
  ];

  return (
    <main className="bg-white text-gray-900 font-sans">

      {/* ================= BANNER ================= */}
      <section className="relative h-[65vh] px-8 md:px-16 flex items-center justify-center">
        <div className="w-[85vw] max-w-7xl mt-10 h-full relative border-2 border-black overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-center"
            style={{ backgroundImage: "url(/images/Banner.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </div>
      </section>

      {/* ================= JOIN TAILIO ================= */}
      <Section>
        <div className="max-w-5xl mt-10 mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-stretch">
            <div className="flex flex-col justify-between h-[420px] p-4 sm:p-6">
              <div className="flex-1 flex flex-col items-start justify-center">
                <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  <span className="text-black">Love them,</span><br />
                  <span className="text-[#f88013] italic">Register them!</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-md">
                  Love means never losing them. Register your pet and give yourself peace of mind.
                </p>
              </div>
              <div className="w-full max-w-sm h-48 sm:h-56 lg:h-64 flex-shrink-0">
                <img src="/images/image1.png" alt="Pet registration" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 max-w-md mx-auto md:ml-auto h-[420px] flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Join Tailio</h2>
                  <p className="text-sm text-gray-600">Create account in seconds</p>
                </div>
                <div className="space-y-4">
                  <input type="email" placeholder="Email address" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f88013] focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm" />
                  <input type="password" placeholder="Password" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f88013] focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm" />
                  <button className="w-full bg-gradient-to-r from-[#f88013] to-[#ff9a44] text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:from-[#e06a0a] hover:to-[#f88013] hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
                    Sign Up Free
                  </button>
                </div>
              </div>
              <div className="text-center space-y-2 pt-6 border-t border-gray-100">
                <p className="text-xs text-[#f88013] font-medium">
                  Already registered? <span className="underline hover:text-[#e06a0a] cursor-pointer">Login</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= HOW IT WORKS ================= */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
            Didn't Register Your Pet?
          </h2>
          <p className="mt-4 text-xl md:text-2xl font-black text-gray-900 leading-tight tracking-tight">
            Here's the Not-So-Fun Part
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 md:gap-6 justify-center items-center">
            {["/images/image3.png", "/images/image4.png", "/images/image5.png", "/images/image12.png"].map((image, i) => (
              <div key={i} className="group relative w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 flex-shrink-0">
                <img
                  src={image}
                  alt="Pet"
                  className="w-full h-full object-contain rounded-full transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_0_6px_#f88013]"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= SUPREME COURT - REDUCED GAP ================= */}
      <section className="py-8 px-4 md:px-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="w-full md:w-[50%] flex justify-center">
              <img
                src="/images/image11.png"
                alt="Dog registration mandated"
                className="w-full max-w-4xl md:max-w-5xl object-contain"
              />
            </div>
            <div className="w-full md:w-[50%] flex items-center justify-center md:justify-start">
              <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-gray-900">
                Supreme Court Mandates Dog Registration Across All Municipal Limits
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFICIAL RECORDS SLIDER ================= */}
<section className="py-20 px-4 md:px-12 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-4">
      <span className="bg-[#d9e7e3] text-[#3c6f68] text-xs px-4 py-1 rounded-full font-semibold tracking-wide">
        OUR COMMUNITY
      </span>
    </div>

    <div className="text-center mb-14">
      <h2 className="text-5xl md:text-6xl font-black text-[#2d2a26] leading-tight tracking-tight">
        Official records.
      </h2>
      <h3 className="text-4xl md:text-5xl font-black text-[#f88013] italic leading-tight tracking-tight mt-2">
        Unofficial cuddles.
      </h3>
    </div>

    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="relative w-[220px] md:w-[260px] h-[300px] mx-3 rounded-2xl overflow-hidden shadow-md bg-white flex-shrink-0"
          >
            <Image
              src={t.image}
              alt={t.name}
              fill
              priority
              sizes="260px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* ================= ONE FORM FOR YOU SECTION ================= */}
      <section id="whyTailio" className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Heading - Orange text with italic font */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              <span className="text-[#2d2a26]">One form for you.</span>
              <br />
              <span className="text-[#2d2a26]">Everything else? </span>
              <span className="text-[#f88013] italic">On us.</span>
            </h2>
            <p className="text-gray-500 mt-6 text-base max-w-2xl mx-auto">
              See why thousands of pet owners choose Tailio over the government queue.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Tailio Card */}
            <div className="relative bg-white rounded-2xl border border-orange-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="absolute top-0 right-0 bg-[#f88013] text-white text-xs px-4 py-1 rounded-bl-xl font-semibold">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold text-[#2d2a26] mb-2">
                Tailio
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                The smart way to register your pet
              </p>
              <ul className="space-y-4">
                {tailioPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Government Card */}
            <div className="bg-[#f3f1ed] rounded-2xl border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Government Facilities
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                The old-fashioned way
              </p>
              <ul className="space-y-4">
                {governmentPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-500 text-xs font-bold">
                      ✗
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="/register" 
              className="inline-flex items-center gap-2 bg-[#f88013] hover:bg-[#e06a0a] text-white font-bold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Get Started Today</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-xs text-gray-400 mt-4">
              Join thousands of happy pet owners
            </p>
          </div>
        </div>
      </section>

      {/* ================= FUR BABIES CTA ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col lg:flex-row items-center gap-6 lg:gap-10 max-w-3xl mx-auto">
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
            <img src="/images/image2.png" className="w-full h-full object-cover rounded-xl" alt="Fur babies" />
          </div>
          <div className="w-full flex-1 flex flex-col items-center lg:items-start justify-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black text-center lg:text-left leading-tight">
              Do You Have Many Fur Babies?
            </h3>
            <p className="text-sm sm:text-base text-black font-medium text-center lg:text-left mt-2">
              Don't Worry, We got you covered!
            </p>
            <a href="/contact" className="text-[#f88013] font-bold text-base sm:text-lg hover:text-[#e06a0a] transition-colors inline-flex items-center self-center lg:self-start mt-3">
              Contact us →
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <ContactForm />
      </div>

      
    </main>
  );
}