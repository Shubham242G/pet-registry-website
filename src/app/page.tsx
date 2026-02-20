"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from "./component/ContactForm";

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
    className="py-16 px-4 md:px-12"
  >
    {children}
  </motion.section>
);

const testimonials = [
  { id: 1, name: "Milo",      image: "/images/image6.jpeg" },
  { id: 2, name: "Lambo",     image: "/images/image7.jpeg" },
  { id: 3, name: "Cheenu",    image: "/images/image8.jpeg" },
  { id: 4, name: "White one", image: "/images/image9.jpeg" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'Tailio' | 'Government'>('Tailio');

  const governmentPoints = [
    'Complex registration process',
    'Multiple forms and documents required',
    'Limited guidance and support',
    'Delayed approvals and unclear timelines',
  ];

  return (
    <main className="bg-white text-gray-900">

      {/* ================= BANNER ================= */}
      <section className="relative h-[65vh] px-8 md:px-16 flex items-center justify-center">
        <div className="w-[85vw] max-w-7xl mt-10 h-full relative border-2 border-black">
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-center"
            style={{ backgroundImage: "url(/images/Banner.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 text-right max-w-lg z-10 px-4 md:px-8 py-4 bg-white/90 backdrop-blur-sm rounded-lg" />
        </div>
      </section>

      {/* ================= JOIN TAILIO ================= */}
      <Section>
        <div className="max-w-5xl mt-10 mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-stretch">
            <div className="flex flex-col justify-between h-[420px] p-4 sm:p-6">
              <div className="flex-1 flex flex-col items-start justify-center">
                <h3 className="text-4xl font-black text-black leading-tight tracking-tight mb-4">
                  <span>Love them,</span><br /><span>Register them!</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-md">
                  Love means never losing them. Register your pet and give yourself peace of mind.
                </p>
              </div>
              <div className="w-full max-w-sm h-48 sm:h-56 lg:h-64 flex-shrink-0">
                <img src="/images/image1.png" alt="Pet registration" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 max-w-md mx-auto md:ml-auto h-[420px] flex flex-col justify-between">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Join Tailio</h2>
                  <p className="text-sm text-gray-600">Create account in seconds</p>
                </div>
                <div className="space-y-4">
                  <input type="email" placeholder="Email address" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm" />
                  <input type="password" placeholder="Password" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100/50 transition-all duration-200 hover:border-orange-300 bg-white shadow-sm" />
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
                    Sign Up Free
                  </button>
                </div>
              </div>
              <div className="text-center space-y-2 pt-6 border-t border-gray-100">
                <p className="text-xs text-orange-500 font-medium">
                  Already registered? <span className="underline hover:text-orange-600 cursor-pointer">Login</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= HOW IT WORKS ================= */}
      <Section>
  <div className="text-center">
    <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
      Didn't Register Your Pet?
    </h2>

    <p className="mt-4 text-xl md:text-2xl font-black text-gray-900 leading-tight tracking-tight">
      Here's the Not-So-Fun Part
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex gap-8 md:gap-12 justify-center items-center">
    {["/images/image3.png", "/images/image4.png", "/images/image5.png","/images/image12.png"].map((image, i) => (
      <div key={i} className="group relative w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 flex-shrink-0">
        <img
          src={image}
          alt="Pet"
          className="w-full h-full object-contain rounded-full transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_0_6px_#fb923c]"
        />
      </div>
    ))}
  </div>
</div>


</Section>

      {/* ================= SUPREME COURT ================= */}
<Section>
  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
      
      {/* Image */}
      <div className="w-full md:w-[50%] flex justify-center">
        <img
          src="/images/image11.png"
          alt="Dog registration mandated"
          className="w-full max-w-4xl md:max-w-5xl object-contain"
        />
      </div>

      {/* Text */}
      <div className="w-full md:w-[50%] flex items-center justify-center md:justify-start">
        <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight">
          Supreme Court Mandates Dog Registration ,
          Across All Municipal Limits
        </h2>
      </div>

    </div>
  </div>
</Section>




      {/* ================= TESTIMONIALS SLIDER ================= */}
      {/* 
        IMPORTANT: Add the following to your globals.css for the animation to work:

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      */}
      <section className="py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#ff7200] rounded-3xl py-12 px-4 overflow-hidden">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                Official records. Unofficial cuddles
              </h2>
            </div>

            {/* Slider — pauses on hover via CSS .group + .animate-marquee */}
            <div className="relative overflow-hidden group">
              <div className="flex w-max animate-marquee">
                {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                  <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[260px] md:w-[300px] px-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                        <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edge fades */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#ff7200] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#ff7200] to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY TAILIO ================= */}
      <section id="whyTailio" className="w-full bg-white py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 tracking-wide">
          Why Tailio?
        </h2>
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {(['Tailio', 'Government'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 rounded-t-md ${activeTab === tab ? 'text-white bg-orange-500' : 'text-gray-600 bg-transparent'}`}
            >
              {tab === 'Government' ? 'Government Facilities' : tab}
            </button>
          ))}
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            {activeTab === 'Tailio' ? (
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  One form for you. Everything else? On us.
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Tailio simplifies the entire pet registration process. No complicated forms or government hurdles. Register once and let us handle the rest for you.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {governmentPoints.map((point, index) => (
                  <div key={index} className="text-gray-800 text-lg">
                    <span className="font-bold mr-2">{index + 1}.</span>{point}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-center items-center w-full h-64 md:h-80 lg:h-96">
            <img
              src={activeTab === 'Tailio' ? "/images/happy.png" : "/images/sad.png"}
              alt={activeTab === 'Tailio' ? "Tailio illustration" : "Government facilities illustration"}
              className="object-cover rounded-lg transition-opacity duration-300 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ================= FUR BABIES CTA ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-4 lg:mb-6">
  <div className="p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col lg:flex-row items-center gap-6 lg:gap-10 max-w-3xl mx-auto h-auto lg:h-72">
    <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
      <img src="/images/image2.png" className="w-full h-full object-cover rounded-xl" alt="Fur babies" />
    </div>
    <div className="w-full flex-1 flex flex-col items-center lg:items-start justify-center">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black whitespace-nowrap text-center lg:text-left leading-tight">
        Do You Have Many Fur Babies?
      </h3>
      <p className="text-sm sm:text-base text-black font-medium whitespace-nowrap text-center lg:text-left mt-2">
        Don't Worry, We got you covered!
      </p>
      <a href="/contact" className="text-orange-500 font-bold text-base sm:text-lg hover:text-orange-600 transition-colors whitespace-nowrap inline-flex items-center self-center lg:self-start mt-3">
        Contact us →
      </a>
    </div>
  </div>
</div>


      <div>
        <ContactForm />
      </div>
    </main>
  );
}